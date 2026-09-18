import * as vscode from 'vscode';

export class SecretService {
  // Current storage keys
  private static readonly DEEPL_KEY = 'vscodeTranslate.apiKey.deepl';
  private static readonly GEMINI_KEY = 'vscodeTranslate.apiKey.gemini';

  // Alternative / Legacy keys for migration across updates and name changes
  private static readonly LEGACY_DEEPL_KEYS = [
    'vscodeTranslate.apiKey.deepl',
    'vscode-translate.apiKey.deepl',
    'ai-multi-translate.apiKey.deepl',
    'deepl.apiKey',
  ];

  private static readonly LEGACY_GEMINI_KEYS = [
    'vscodeTranslate.apiKey.gemini',
    'vscode-translate.apiKey.gemini',
    'ai-multi-translate.apiKey.gemini',
    'gemini.apiKey',
  ];

  constructor(
    private readonly secrets: vscode.SecretStorage,
    private readonly globalState?: vscode.Memento
  ) {}

  /**
   * Retrieves the API key for the specified provider.
   * Employs a multi-tier fallback mechanism:
   * 1. SecretStorage (primary encrypted OS keychain)
   * 2. globalState (persistent memento surviving version upgrades / force reinstalls)
   * 3. Legacy SecretStorage / globalState keys (migration from earlier versions)
   * 4. VS Code settings.json configuration fallback
   */
  public async getApiKey(provider: string): Promise<string | undefined> {
    const isDeepl = provider === 'deepl';
    const isGemini = provider === 'gemini';
    if (!isDeepl && !isGemini) {
      return undefined;
    }

    const primaryKey = isDeepl ? SecretService.DEEPL_KEY : SecretService.GEMINI_KEY;
    const legacyKeys = isDeepl ? SecretService.LEGACY_DEEPL_KEYS : SecretService.LEGACY_GEMINI_KEYS;

    // 1. Check primary SecretStorage
    let key = await this.secrets.get(primaryKey);
    if (key && key.trim()) {
      // Keep globalState backup in sync
      if (this.globalState) {
        await this.globalState.update(primaryKey, key.trim());
      }
      return key.trim();
    }

    // 2. Check globalState backup (persists reliably across extension updates)
    if (this.globalState) {
      for (const k of legacyKeys) {
        const backupVal = this.globalState.get<string>(k);
        if (backupVal && backupVal.trim()) {
          key = backupVal.trim();
          // Restore to primary SecretStorage
          await this.secrets.store(primaryKey, key);
          return key;
        }
      }
    }

    // 3. Check legacy SecretStorage keys
    for (const k of legacyKeys) {
      const legacyVal = await this.secrets.get(k);
      if (legacyVal && legacyVal.trim()) {
        key = legacyVal.trim();
        // Migrate to primary key and backup
        await this.setApiKey(provider, key);
        return key;
      }
    }

    // 4. Check workspace / user configuration (settings.json)
    try {
      const config = vscode.workspace.getConfiguration('vscodeTranslate');
      const configKey = isDeepl
        ? config.get<string>('deeplApiKey')
        : config.get<string>('geminiApiKey');
      if (configKey && configKey.trim()) {
        key = configKey.trim();
        await this.setApiKey(provider, key);
        return key;
      }
    } catch {
      // Ignore config read failures in headless/test environments
    }

    return undefined;
  }

  /**
   * Stores the API key in both SecretStorage and globalState for maximum persistence.
   */
  public async setApiKey(provider: string, key: string): Promise<void> {
    const trimmed = key.trim();
    const primaryKey = provider === 'deepl' ? SecretService.DEEPL_KEY : SecretService.GEMINI_KEY;

    // Store in primary SecretStorage
    await this.secrets.store(primaryKey, trimmed);

    // Also store in globalState backup to survive extension upgrades
    if (this.globalState) {
      await this.globalState.update(primaryKey, trimmed);
    }
  }

  /**
   * Clears the API key from both SecretStorage and globalState.
   */
  public async deleteApiKey(provider: string): Promise<void> {
    const isDeepl = provider === 'deepl';
    const primaryKey = isDeepl ? SecretService.DEEPL_KEY : SecretService.GEMINI_KEY;
    const legacyKeys = isDeepl ? SecretService.LEGACY_DEEPL_KEYS : SecretService.LEGACY_GEMINI_KEYS;

    // Delete from SecretStorage
    await this.secrets.delete(primaryKey);
    for (const k of legacyKeys) {
      await this.secrets.delete(k);
    }

    // Delete from globalState
    if (this.globalState) {
      await this.globalState.update(primaryKey, undefined);
      for (const k of legacyKeys) {
        await this.globalState.update(k, undefined);
      }
    }
  }
}
