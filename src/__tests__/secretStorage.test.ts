jest.mock(
  'vscode',
  () => ({
    workspace: {
      getConfiguration: jest.fn(() => ({
        get: jest.fn(() => ''),
      })),
    },
  }),
  { virtual: true }
);

import { SecretService } from '../services/secretStorage';
import * as vscode from 'vscode';

describe('SecretService - Update Persistence & Fallback', () => {
  let mockSecretMap: Map<string, string>;
  let mockGlobalStateMap: Map<string, unknown>;
  let mockSecrets: vscode.SecretStorage;
  let mockGlobalState: vscode.Memento;

  beforeEach(() => {
    mockSecretMap = new Map();
    mockGlobalStateMap = new Map();

    mockSecrets = {
      get: jest.fn(async (key: string) => mockSecretMap.get(key)),
      store: jest.fn(async (key: string, value: string) => {
        mockSecretMap.set(key, value);
      }),
      delete: jest.fn(async (key: string) => {
        mockSecretMap.delete(key);
      }),
      onDidChange: jest.fn(),
    };

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
  });

  it('should store key in both SecretStorage and globalState backup', async () => {
    const service = new SecretService(mockSecrets, mockGlobalState);
    await service.setApiKey('deepl', 'test-deepl-key:fx');

    expect(mockSecrets.store).toHaveBeenCalledWith(
      'vscodeTranslate.apiKey.deepl',
      'test-deepl-key:fx'
    );
    expect(mockGlobalState.update).toHaveBeenCalledWith(
      'vscodeTranslate.apiKey.deepl',
      'test-deepl-key:fx'
    );

    const retrieved = await service.getApiKey('deepl');
    expect(retrieved).toBe('test-deepl-key:fx');
  });

  it('should restore key from globalState backup if SecretStorage was wiped after an update', async () => {
    const service = new SecretService(mockSecrets, mockGlobalState);

    // Initial setup: key is in globalState (persisted across updates), but SecretStorage is empty
    mockGlobalStateMap.set('vscodeTranslate.apiKey.gemini', 'persisted-gemini-key');

    const retrieved = await service.getApiKey('gemini');
    expect(retrieved).toBe('persisted-gemini-key');

    // Should have restored back into SecretStorage
    expect(mockSecrets.store).toHaveBeenCalledWith(
      'vscodeTranslate.apiKey.gemini',
      'persisted-gemini-key'
    );
  });

  it('should migrate legacy keys from previous versions', async () => {
    const service = new SecretService(mockSecrets, mockGlobalState);

    // Old version key in SecretStorage
    mockSecretMap.set('vscode-translate.apiKey.deepl', 'legacy-deepl-key:fx');

    const retrieved = await service.getApiKey('deepl');
    expect(retrieved).toBe('legacy-deepl-key:fx');

    // Should migrate to new key
    expect(mockSecrets.store).toHaveBeenCalledWith(
      'vscodeTranslate.apiKey.deepl',
      'legacy-deepl-key:fx'
    );
  });

  it('should delete key from both SecretStorage and globalState', async () => {
    const service = new SecretService(mockSecrets, mockGlobalState);
    await service.setApiKey('deepl', 'to-delete-key');

    await service.deleteApiKey('deepl');

    const result = await service.getApiKey('deepl');
    expect(result).toBeUndefined();
    expect(mockSecretMap.has('vscodeTranslate.apiKey.deepl')).toBe(false);
    expect(mockGlobalStateMap.has('vscodeTranslate.apiKey.deepl')).toBe(false);
  });
});
