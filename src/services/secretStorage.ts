import * as vscode from 'vscode';

export class SecretService {
  private static readonly DEEPL_KEY = 'vscodeTranslate.apiKey.deepl';
  private static readonly GEMINI_KEY = 'vscodeTranslate.apiKey.gemini';

  constructor(private readonly secrets: vscode.SecretStorage) {}

  public async getApiKey(provider: string): Promise<string | undefined> {
    if (provider === 'deepl') {
      return await this.secrets.get(SecretService.DEEPL_KEY);
    }
    if (provider === 'gemini') {
      return await this.secrets.get(SecretService.GEMINI_KEY);
    }
    return undefined;
  }

  public async setApiKey(provider: string, key: string): Promise<void> {
    if (provider === 'deepl') {
      await this.secrets.store(SecretService.DEEPL_KEY, key.trim());
    } else if (provider === 'gemini') {
      await this.secrets.store(SecretService.GEMINI_KEY, key.trim());
    }
  }

  public async deleteApiKey(provider: string): Promise<void> {
    if (provider === 'deepl') {
      await this.secrets.delete(SecretService.DEEPL_KEY);
    } else if (provider === 'gemini') {
      await this.secrets.delete(SecretService.GEMINI_KEY);
    }
  }
}
