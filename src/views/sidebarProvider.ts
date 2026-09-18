import * as vscode from 'vscode';
import { TranslatorFactory } from '../services/translatorFactory';
import { SecretService } from '../services/secretStorage';
import { getTranslationHtml } from './translationHtml';

export class SidebarTranslationViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'vscodeTranslate.sidebarView';

  private _view?: vscode.WebviewView;

  constructor(
    private readonly extensionUri: vscode.Uri,
    private readonly translatorFactory: TranslatorFactory,
    private readonly secretService: SecretService
  ) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): void {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri],
    };

    const config = vscode.workspace.getConfiguration('vscodeTranslate');
    const provider = config.get<string>('provider', 'google-free');
    const panelLanguage = config.get<string>('panelLanguage', 'en');
    const target = config.get<string>('targetLanguage', 'vi');
    const source = config.get<string>('sourceLanguage', 'auto');

    const iconUri = webviewView.webview
      .asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'icon.png'))
      .toString();
    const googleIconUri = webviewView.webview
      .asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'google_translate_icon.png'))
      .toString();
    const deeplIconUri = webviewView.webview
      .asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'deepl_icon.webp'))
      .toString();
    const geminiIconUri = webviewView.webview
      .asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'google-gemini-icon.webp'))
      .toString();

    webviewView.webview.html = getTranslationHtml({
      currentProvider: provider,
      panelLanguage: panelLanguage,
      defaultSource: source,
      defaultTarget: target,
      iconUri: iconUri,
      googleIconUri: googleIconUri,
      deeplIconUri: deeplIconUri,
      geminiIconUri: geminiIconUri,
    });

    webviewView.webview.onDidReceiveMessage(
      async (data: {
        command: string;
        text?: string;
        from?: string;
        to?: string;
        provider?: string;
        key?: string;
        value?: unknown;
        enabled?: boolean;
      }) => {
        switch (data.command) {
          case 'getSettings': {
            await this.sendSettingsState();
            break;
          }

          case 'updateConfig': {
            if (data.key) {
              const currentConf = vscode.workspace.getConfiguration('vscodeTranslate');
              await currentConf.update(
                data.key,
                data.value,
                vscode.ConfigurationTarget.Global
              );
            }
            break;
          }

          case 'saveApiKey': {
            if (data.provider && typeof data.key === 'string') {
              await this.secretService.setApiKey(data.provider, data.key);
              const label = data.provider === 'deepl' ? 'DeepL' : 'Gemini';
              vscode.window.showInformationMessage(`${label} API Key saved.`);
              await this.sendSettingsState();
            }
            break;
          }

          case 'deleteApiKey': {
            if (data.provider) {
              await this.secretService.deleteApiKey(data.provider);
              const label = data.provider === 'deepl' ? 'DeepL' : 'Gemini';
              vscode.window.showInformationMessage(`${label} API Key removed.`);
              await this.sendSettingsState();
            }
            break;
          }

          case 'translate': {
            if (data.provider) {
              const currentConf = vscode.workspace.getConfiguration('vscodeTranslate');
              await currentConf.update(
                'provider',
                data.provider,
                vscode.ConfigurationTarget.Global
              );
            }

            if (!data.text || !data.text.trim()) {
              this.sendMessage({ command: 'result', text: '' });
              return;
            }

            try {
              const translator = await this.translatorFactory.getTranslator(data.provider);
              const result = await translator.translate(data.text, {
                from: data.from || 'auto',
                to: data.to || 'vi',
              });

              this.sendMessage({
                command: 'result',
                text: result.text,
                provider: result.provider,
                detectedSourceLanguage: result.detectedSourceLanguage,
              });
            } catch (error: unknown) {
              const message = error instanceof Error ? error.message : String(error);
              this.sendMessage({ command: 'error', message });
            }
            break;
          }

          case 'insertToEditor': {
            const editor = vscode.window.activeTextEditor;
            if (editor && data.text) {
              await editor.edit((editBuilder) => {
                editBuilder.insert(editor.selection.active, data.text || '');
              });
              vscode.window.showInformationMessage('Inserted to editor.');
            } else {
              vscode.window.showInformationMessage('No active editor found.');
            }
            break;
          }

          case 'copy': {
            if (data.text) {
              await vscode.env.clipboard.writeText(data.text);
              vscode.window.showInformationMessage('Copied to clipboard.');
            }
            break;
          }
        }
      }
    );
  }

  private async sendSettingsState(): Promise<void> {
    const config = vscode.workspace.getConfiguration('vscodeTranslate');
    const hasDeepl = !!(await this.secretService.getApiKey('deepl'));
    const hasGemini = !!(await this.secretService.getApiKey('gemini'));
    const hoverEnabled = config.get<boolean>('hoverEnabled', true);
    const panelLanguage = config.get<string>('panelLanguage', 'en');
    const sourceLanguage = config.get<string>('sourceLanguage', 'auto');
    const targetLanguage = config.get<string>('targetLanguage', 'vi');
    const provider = config.get<string>('provider', 'google-free');

    this.sendMessage({
      command: 'settingsState',
      hasDeepl,
      hasGemini,
      hoverEnabled,
      panelLanguage,
      sourceLanguage,
      targetLanguage,
      provider,
    });
  }

  public openSettings(): void {
    this.sendMessage({ command: 'openSettings' });
  }

  public setInitialText(text: string): void {
    this.sendMessage({ command: 'setInitialText', text });
  }

  private sendMessage(message: unknown): void {
    this._view?.webview.postMessage(message);
  }
}
