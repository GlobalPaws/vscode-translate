import * as vscode from 'vscode';
import { TranslatorFactory } from '../services/translatorFactory';
import { SecretService } from '../services/secretStorage';
import { getTranslationHtml } from './translationHtml';

export class TranslationTabPanel {
  public static currentPanel: TranslationTabPanel | undefined;
  public static readonly viewType = 'vscodeTranslate.tabPanel';

  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(
    extensionUri: vscode.Uri,
    translatorFactory: TranslatorFactory,
    secretService: SecretService,
    initialText?: string
  ): void {
    const column = vscode.window.activeTextEditor
      ? vscode.ViewColumn.Beside
      : vscode.ViewColumn.One;

    if (TranslationTabPanel.currentPanel) {
      TranslationTabPanel.currentPanel._panel.reveal(column);
      if (initialText) {
        TranslationTabPanel.currentPanel.setInitialText(initialText);
      }
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      TranslationTabPanel.viewType,
      'AI Multi-Translate',
      column,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [extensionUri],
      }
    );

    panel.iconPath = vscode.Uri.joinPath(extensionUri, 'media', 'icon.png');

    TranslationTabPanel.currentPanel = new TranslationTabPanel(
      panel,
      extensionUri,
      translatorFactory,
      secretService,
      initialText
    );
  }

  private constructor(
    panel: vscode.WebviewPanel,
    private readonly extensionUri: vscode.Uri,
    private readonly translatorFactory: TranslatorFactory,
    private readonly secretService: SecretService,
    initialText?: string
  ) {
    this._panel = panel;

    const config = vscode.workspace.getConfiguration('vscodeTranslate');
    const provider = config.get<string>('provider', 'google-free');
    const panelLanguage = config.get<string>('panelLanguage', 'en');
    const target = config.get<string>('targetLanguage', 'vi');
    const source = config.get<string>('sourceLanguage', 'auto');

    const iconUri = this._panel.webview
      .asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'icon.png'))
      .toString();

    this._panel.webview.html = getTranslationHtml({
      currentProvider: provider,
      panelLanguage: panelLanguage,
      defaultSource: source,
      defaultTarget: target,
      iconUri: iconUri,
    });

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    this._panel.webview.onDidReceiveMessage(
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
              this._panel.webview.postMessage({ command: 'result', text: '' });
              return;
            }

            try {
              const translator = await this.translatorFactory.getTranslator(data.provider);
              const result = await translator.translate(data.text, {
                from: data.from || 'auto',
                to: data.to || 'vi',
              });

              this._panel.webview.postMessage({
                command: 'result',
                text: result.text,
                provider: result.provider,
                detectedSourceLanguage: result.detectedSourceLanguage,
              });
            } catch (error: unknown) {
              const message = error instanceof Error ? error.message : String(error);
              this._panel.webview.postMessage({ command: 'error', message });
            }
            break;
          }

          case 'insertToEditor': {
            const editor = vscode.window.visibleTextEditors.find(
              (e) => e.viewColumn !== this._panel.viewColumn
            );
            if (editor && data.text) {
              await editor.edit((editBuilder) => {
                editBuilder.insert(editor.selection.active, data.text || '');
              });
              vscode.window.showInformationMessage('Inserted to editor.');
            } else if (vscode.window.activeTextEditor && data.text) {
              await vscode.window.activeTextEditor.edit((editBuilder) => {
                editBuilder.insert(
                  vscode.window.activeTextEditor!.selection.active,
                  data.text || ''
                );
              });
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
      },
      null,
      this._disposables
    );

    if (initialText) {
      setTimeout(() => this.setInitialText(initialText), 300);
    }
  }

  private async sendSettingsState(): Promise<void> {
    const config = vscode.workspace.getConfiguration('vscodeTranslate');
    const hasDeepl = !!(await this.secretService.getApiKey('deepl'));
    const hasGemini = !!(await this.secretService.getApiKey('gemini'));
    const hoverEnabled = config.get<boolean>('hoverEnabled', false);
    const panelLanguage = config.get<string>('panelLanguage', 'en');
    const sourceLanguage = config.get<string>('sourceLanguage', 'auto');
    const targetLanguage = config.get<string>('targetLanguage', 'vi');
    const provider = config.get<string>('provider', 'google-free');

    this._panel.webview.postMessage({
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

  public setInitialText(text: string): void {
    this._panel.webview.postMessage({ command: 'setInitialText', text });
  }

  public dispose(): void {
    TranslationTabPanel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
