import * as vscode from 'vscode';
import { ITranslator } from '../domain/translator';
import { GoogleFreeTranslator } from './googleFreeTranslator';
import { DeepLTranslator } from './deeplTranslator';
import { GeminiTranslator } from './geminiTranslator';
import { SecretService } from './secretStorage';

export class TranslatorFactory {
  constructor(private readonly secretService: SecretService) {}

  public async getTranslator(overrideProvider?: string): Promise<ITranslator> {
    const config = vscode.workspace.getConfiguration('vscodeTranslate');
    const provider = overrideProvider || config.get<string>('provider', 'google-free');

    if (provider === 'deepl') {
      let apiKey = await this.secretService.getApiKey('deepl');
      if (!apiKey) {
        apiKey = await this.promptForApiKey('DeepL');
        if (apiKey) {
          await this.secretService.setApiKey('deepl', apiKey);
        } else {
          throw new Error('DeepL API key was not provided.');
        }
      }
      return new DeepLTranslator(apiKey);
    }

    if (provider === 'gemini') {
      let apiKey = await this.secretService.getApiKey('gemini');
      if (!apiKey) {
        apiKey = await this.promptForApiKey('Google Gemini');
        if (apiKey) {
          await this.secretService.setApiKey('gemini', apiKey);
        } else {
          throw new Error('Gemini API key was not provided.');
        }
      }
      return new GeminiTranslator(apiKey);
    }

    // Default to free Google Translate
    return new GoogleFreeTranslator();
  }

  private async promptForApiKey(providerName: string): Promise<string | undefined> {
    return await vscode.window.showInputBox({
      title: `${providerName} API Key`,
      prompt: `Please enter your ${providerName} API Key to continue translation:`,
      password: true,
      ignoreFocusOut: true,
    });
  }
}
