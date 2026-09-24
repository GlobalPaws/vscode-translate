const mockConfigUpdate = jest.fn();
const mockConfigGet = jest.fn((key: string, def?: unknown) => {
  if (key === 'provider') {
    return 'google-free';
  }
  if (key === 'panelLanguage') {
    return 'en';
  }
  if (key === 'targetLanguage') {
    return 'vi';
  }
  if (key === 'sourceLanguage') {
    return 'auto';
  }
  return def;
});

jest.mock(
  'vscode',
  () => ({
    workspace: {
      getConfiguration: jest.fn(() => ({
        get: mockConfigGet,
        update: mockConfigUpdate,
      })),
    },
    Uri: {
      joinPath: jest.fn((base: { toString: () => string }, ...paths: string[]) => ({
        toString: () => `${base.toString()}/${paths.join('/')}`,
      })),
    },
    ConfigurationTarget: {
      Global: 1,
    },
    window: {
      showInformationMessage: jest.fn(),
    },
  }),
  { virtual: true }
);

import { SidebarTranslationViewProvider } from '../views/sidebarProvider';
import { TranslatorFactory } from '../services/translatorFactory';
import { SecretService } from '../services/secretStorage';
import * as vscode from 'vscode';

describe('SidebarTranslationViewProvider', () => {
  let mockGlobalStateMap: Map<string, unknown>;
  let mockGlobalState: vscode.Memento;
  let mockTranslatorFactory: TranslatorFactory;
  let mockSecretService: SecretService;
  let mockWebview: {
    options: Record<string, unknown>;
    html: string;
    asWebviewUri: jest.Mock;
    postMessage: jest.Mock;
    onDidReceiveMessage: jest.Mock;
  };
  let messageCallback: (data: unknown) => Promise<void>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGlobalStateMap = new Map();

    mockGlobalState = {
      get: jest.fn(<T>(key: string, defaultValue?: T): T => {
        return (mockGlobalStateMap.get(key) as T) ?? (defaultValue as T);
      }),
      update: jest.fn(async (key: string, value: unknown) => {
        if (value === undefined) {
          mockGlobalStateMap.delete(key);
        } else {
          mockGlobalStateMap.set(key, value);
        }
      }),
      keys: jest.fn(() => Array.from(mockGlobalStateMap.keys())),
    };

    const mockTranslator = {
      translate: jest.fn(async (text: string) => ({
        text: `Translated: ${text}`,
        provider: 'google-free',
        detectedSourceLanguage: 'en',
      })),
    };

    mockTranslatorFactory = {
      getTranslator: jest.fn().mockResolvedValue(mockTranslator),
    } as unknown as TranslatorFactory;

    mockSecretService = {
      getApiKey: jest.fn().mockResolvedValue(undefined),
      setApiKey: jest.fn().mockResolvedValue(undefined),
      deleteApiKey: jest.fn().mockResolvedValue(undefined),
    } as unknown as SecretService;

    mockWebview = {
      options: {},
      html: '',
      asWebviewUri: jest.fn((uri) => uri.toString()),
      postMessage: jest.fn(),
      onDidReceiveMessage: jest.fn((cb) => {
        messageCallback = cb;
      }),
    };
  });

  it('should initialize webview using globalState values when present', () => {
    mockGlobalStateMap.set('vscodeTranslate.sourceLang', 'ja');
    mockGlobalStateMap.set('vscodeTranslate.targetLang', 'en');
    mockGlobalStateMap.set('vscodeTranslate.sourceTabs', ['ja', 'en', 'vi']);
    mockGlobalStateMap.set('vscodeTranslate.targetTabs', ['en', 'ja', 'vi']);

    const provider = new SidebarTranslationViewProvider(
      { toString: () => 'uri' } as unknown as vscode.Uri,
      mockTranslatorFactory,
      mockSecretService,
      mockGlobalState
    );

    const mockWebviewView = { webview: mockWebview } as unknown as vscode.WebviewView;
    provider.resolveWebviewView(
      mockWebviewView,
      {} as vscode.WebviewViewResolveContext,
      {} as vscode.CancellationToken
    );

    expect(mockWebview.html).toContain('<!DOCTYPE html>');
    expect(mockGlobalState.get).toHaveBeenCalledWith('vscodeTranslate.sourceLang');
    expect(mockGlobalState.get).toHaveBeenCalledWith('vscodeTranslate.targetLang');
    expect(mockGlobalState.get).toHaveBeenCalledWith('vscodeTranslate.sourceTabs');
    expect(mockGlobalState.get).toHaveBeenCalledWith('vscodeTranslate.targetTabs');
  });

  it('should persist language and tab state to globalState when receiving updateLanguageState message', async () => {
    const provider = new SidebarTranslationViewProvider(
      { toString: () => 'uri' } as unknown as vscode.Uri,
      mockTranslatorFactory,
      mockSecretService,
      mockGlobalState
    );

    const mockWebviewView = { webview: mockWebview } as unknown as vscode.WebviewView;
    provider.resolveWebviewView(
      mockWebviewView,
      {} as vscode.WebviewViewResolveContext,
      {} as vscode.CancellationToken
    );

    await messageCallback({
      command: 'updateLanguageState',
      sourceLang: 'fr',
      targetLang: 'es',
      sourceTabs: ['fr', 'en', 'ja'],
      targetTabs: ['es', 'vi', 'en'],
    });

    expect(mockGlobalState.update).toHaveBeenCalledWith('vscodeTranslate.sourceLang', 'fr');
    expect(mockGlobalState.update).toHaveBeenCalledWith('vscodeTranslate.targetLang', 'es');
    expect(mockGlobalState.update).toHaveBeenCalledWith('vscodeTranslate.sourceTabs', [
      'fr',
      'en',
      'ja',
    ]);
    expect(mockGlobalState.update).toHaveBeenCalledWith('vscodeTranslate.targetTabs', [
      'es',
      'vi',
      'en',
    ]);
  });

  it('should return requestId and targetLang with translation result without updating provider config', async () => {
    const provider = new SidebarTranslationViewProvider(
      { toString: () => 'uri' } as unknown as vscode.Uri,
      mockTranslatorFactory,
      mockSecretService,
      mockGlobalState
    );

    const mockWebviewView = { webview: mockWebview } as unknown as vscode.WebviewView;
    provider.resolveWebviewView(
      mockWebviewView,
      {} as vscode.WebviewViewResolveContext,
      {} as vscode.CancellationToken
    );

    await messageCallback({
      command: 'translate',
      requestId: 42,
      targetLang: 'vi',
      text: 'Hello world',
      from: 'en',
      to: 'vi',
      provider: 'google-free',
    });

    // config.update('provider', ...) must NOT be called
    expect(mockConfigUpdate).not.toHaveBeenCalled();

    // Result must include requestId and targetLang
    expect(mockWebview.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        command: 'result',
        type: 'result',
        requestId: 42,
        targetLang: 'vi',
        text: 'Translated: Hello world',
      })
    );
  });

  it('should return requestId and targetLang when translation throws error', async () => {
    (mockTranslatorFactory.getTranslator as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    const provider = new SidebarTranslationViewProvider(
      { toString: () => 'uri' } as unknown as vscode.Uri,
      mockTranslatorFactory,
      mockSecretService,
      mockGlobalState
    );

    const mockWebviewView = { webview: mockWebview } as unknown as vscode.WebviewView;
    provider.resolveWebviewView(
      mockWebviewView,
      {} as vscode.WebviewViewResolveContext,
      {} as vscode.CancellationToken
    );

    await messageCallback({
      command: 'translate',
      requestId: 99,
      targetLang: 'ja',
      text: 'Error test',
      from: 'en',
      to: 'ja',
      provider: 'google-free',
    });

    expect(mockWebview.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        command: 'error',
        type: 'error',
        requestId: 99,
        targetLang: 'ja',
        message: 'Network error',
      })
    );
  });
});
