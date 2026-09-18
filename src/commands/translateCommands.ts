import * as vscode from 'vscode';
import { TranslatorFactory } from '../services/translatorFactory';
import { SecretService } from '../services/secretStorage';

export class TranslateCommands {
  constructor(
    private readonly translatorFactory: TranslatorFactory,
    private readonly secretService: SecretService
  ) {}

  public async translateSelection(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('No active editor found.');
      return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection).trim();
    if (!text) {
      vscode.window.showInformationMessage('Please select some text to translate.');
      return;
    }

    const config = vscode.workspace.getConfiguration('vscodeTranslate');
    const targetLang = config.get<string>('targetLanguage', 'ja');
    const sourceLang = config.get<string>('sourceLanguage', 'auto');

    try {
      const result = await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: 'Translating text...',
          cancellable: false,
        },
        async () => {
          const translator = await this.translatorFactory.getTranslator();
          return await translator.translate(text, { from: sourceLang, to: targetLang });
        }
      );

      const action = await vscode.window.showQuickPick(
        [
          {
            label: '$(replace) Replace Selection',
            description: 'Replace selected text with translation',
            id: 'replace',
          },
          {
            label: '$(insert) Insert Below',
            description: 'Insert translated text as a new line below selection',
            id: 'insert',
          },
          {
            label: '$(clippy) Copy to Clipboard',
            description: 'Copy translated text to clipboard',
            id: 'copy',
          },
        ],
        {
          title: `[${result.provider}] ${result.text}`,
          placeHolder: 'Select what to do with the translation',
        }
      );

      if (action?.id === 'replace') {
        await editor.edit((editBuilder) => {
          editBuilder.replace(selection, result.text);
        });
      } else if (action?.id === 'insert') {
        await editor.edit((editBuilder) => {
          editBuilder.insert(selection.end, `\n${result.text}`);
        });
      } else if (action?.id === 'copy') {
        await vscode.env.clipboard.writeText(result.text);
        vscode.window.showInformationMessage('Translation copied to clipboard.');
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      vscode.window.showErrorMessage(`Translation failed: ${message}`);
    }
  }

  public async replaceSelection(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection).trim();
    if (!text) {
      return;
    }

    const config = vscode.workspace.getConfiguration('vscodeTranslate');
    const targetLang = config.get<string>('targetLanguage', 'ja');
    const sourceLang = config.get<string>('sourceLanguage', 'auto');

    try {
      const result = await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: 'Translating & replacing...',
          cancellable: false,
        },
        async () => {
          const translator = await this.translatorFactory.getTranslator();
          return await translator.translate(text, { from: sourceLang, to: targetLang });
        }
      );

      await editor.edit((editBuilder) => {
        editBuilder.replace(selection, result.text);
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      vscode.window.showErrorMessage(`Translation failed: ${message}`);
    }
  }

  public async insertBelowSelection(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection).trim();
    if (!text) {
      return;
    }

    const config = vscode.workspace.getConfiguration('vscodeTranslate');
    const targetLang = config.get<string>('targetLanguage', 'ja');
    const sourceLang = config.get<string>('sourceLanguage', 'auto');

    try {
      const result = await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: 'Translating & inserting...',
          cancellable: false,
        },
        async () => {
          const translator = await this.translatorFactory.getTranslator();
          return await translator.translate(text, { from: sourceLang, to: targetLang });
        }
      );

      await editor.edit((editBuilder) => {
        editBuilder.insert(selection.end, `\n${result.text}`);
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      vscode.window.showErrorMessage(`Translation failed: ${message}`);
    }
  }

  public async setApiKey(): Promise<void> {
    const providerItem = await vscode.window.showQuickPick(
      [
        { label: 'DeepL API Key', id: 'deepl' },
        { label: 'Google Gemini API Key', id: 'gemini' },
      ],
      { placeHolder: 'Select provider to set API Key' }
    );

    if (!providerItem) {
      return;
    }

    const key = await vscode.window.showInputBox({
      title: `${providerItem.label}`,
      prompt: `Enter API Key for ${providerItem.label}`,
      password: true,
      ignoreFocusOut: true,
    });

    if (key !== undefined && key.trim().length > 0) {
      await this.secretService.setApiKey(providerItem.id, key);
      vscode.window.showInformationMessage(`API Key for ${providerItem.label} has been saved securely.`);
    }
  }

  public async clearApiKey(): Promise<void> {
    const providerItem = await vscode.window.showQuickPick(
      [
        { label: 'DeepL API Key', id: 'deepl' },
        { label: 'Google Gemini API Key', id: 'gemini' },
      ],
      { placeHolder: 'Select API Key to remove' }
    );

    if (!providerItem) {
      return;
    }

    await this.secretService.deleteApiKey(providerItem.id);
    vscode.window.showInformationMessage(`API Key for ${providerItem.label} was removed.`);
  }
}
