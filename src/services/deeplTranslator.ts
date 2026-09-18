import { ITranslator, TranslationOptions, TranslationResult } from '../domain/translator';

interface DeepLResponse {
  translations?: Array<{
    detected_source_language?: string;
    text: string;
  }>;
  message?: string;
}

export class DeepLTranslator implements ITranslator {
  public readonly id = 'deepl';
  public readonly name = 'DeepL API';

  constructor(private readonly apiKey: string) {}

  public async translate(text: string, options: TranslationOptions): Promise<TranslationResult> {
    if (!text.trim()) {
      return { text: '', provider: this.name };
    }
    if (!this.apiKey) {
      throw new Error('DeepL API key is missing. Please run "AI Multi-Translate: Set API Key".');
    }

    const endpoint = this.apiKey.endsWith(':fx')
      ? 'https://api-free.deepl.com/v2/translate'
      : 'https://api.deepl.com/v2/translate';

    const payload: { text: string[]; target_lang: string; source_lang?: string } = {
      text: [text],
      target_lang: options.to.toUpperCase(),
    };

    if (options.from && options.from !== 'auto') {
      payload.source_lang = options.from.toUpperCase();
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `DeepL-Auth-Key ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DeepL API error (${response.status}): ${errorText || response.statusText}`);
    }

    const data = (await response.json()) as DeepLResponse;
    if (!data.translations || data.translations.length === 0) {
      throw new Error('DeepL returned no translation results.');
    }

    return {
      text: data.translations[0].text,
      detectedSourceLanguage: data.translations[0].detected_source_language?.toLowerCase(),
      provider: this.name,
    };
  }
}
