import { ITranslator, TranslationOptions, TranslationResult } from '../domain/translator';

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message?: string;
    code?: number;
  };
}

interface ModelInfo {
  name: string;
  supportedGenerationMethods?: string[];
}

interface ListModelsResponse {
  models?: ModelInfo[];
  error?: {
    message?: string;
    code?: number;
  };
}

export class GeminiTranslator implements ITranslator {
  public readonly id = 'gemini';
  public readonly name = 'Google Gemini AI';

  private static cachedModel: string | null = null;
  private static cachedApiVersion = 'v1beta';

  constructor(private readonly apiKey: string) {}

  public async translate(text: string, options: TranslationOptions): Promise<TranslationResult> {
    if (!text.trim()) {
      return { text: '', provider: this.name };
    }
    if (!this.apiKey) {
      throw new Error('Gemini API key is missing. Please run "AI Multi-Translate: Set API Key".');
    }

    const fallbackCandidates = [
      'gemini-2.0-flash',
      'gemini-1.5-flash-latest',
      'gemini-1.5-flash',
      'gemini-2.0-flash-exp',
      'gemini-1.5-pro',
    ];

    const modelsToTry: string[] = [];
    if (GeminiTranslator.cachedModel) {
      modelsToTry.push(GeminiTranslator.cachedModel);
    }

    try {
      const discoveredModels = await this.discoverAvailableModels();
      for (const m of discoveredModels) {
        if (!modelsToTry.includes(m)) {
          modelsToTry.push(m);
        }
      }
    } catch {
      // Fallback to static list
    }

    for (const fb of fallbackCandidates) {
      if (!modelsToTry.includes(fb)) {
        modelsToTry.push(fb);
      }
    }

    const sourceLangNote =
      options.from && options.from !== 'auto' ? `from ${options.from} ` : '';
    const systemPrompt =
      'You are a professional translator specializing in software development, technical documentation, and code comments. ' +
      `Translate the provided text ${sourceLangNote}into target language "${options.to}". ` +
      'Rules:\n' +
      '1. Preserve programming syntax, identifiers, markdown tags, and formatting.\n' +
      '2. Output ONLY the translated text without introductory or concluding remarks.';

    const requestBody = {
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: [
        {
          parts: [{ text: text }],
        },
      ],
      generationConfig: {
        temperature: 0.2,
      },
    };

    let lastError: Error | null = null;
    const apiVersions =
      GeminiTranslator.cachedApiVersion === 'v1' ? ['v1', 'v1beta'] : ['v1beta', 'v1'];

    for (const model of modelsToTry) {
      for (const apiVer of apiVersions) {
        const cleanModel = model.startsWith('models/') ? model.replace('models/', '') : model;
        const endpoint = `https://generativelanguage.googleapis.com/${apiVer}/models/${cleanModel}:generateContent?key=${encodeURIComponent(
          this.apiKey
        )}`;

        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });

          if (response.status === 404) {
            continue;
          }

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gemini API error (${response.status}): ${errorText || response.statusText}`);
          }

          const data = (await response.json()) as GeminiResponse;
          if (data.error) {
            throw new Error(`Gemini error: ${data.error.message || 'Unknown error'}`);
          }

          const translated = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (translated === undefined) {
            throw new Error('Gemini returned an empty translation response.');
          }

          GeminiTranslator.cachedModel = cleanModel;
          GeminiTranslator.cachedApiVersion = apiVer;

          return {
            text: translated.trim(),
            provider: this.name,
          };
        } catch (err: unknown) {
          lastError = err instanceof Error ? err : new Error(String(err));
        }
      }
    }

    throw lastError || new Error('Failed to generate translation with available Gemini models.');
  }

  private async discoverAvailableModels(): Promise<string[]> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(
      this.apiKey
    )}`;
    const res = await fetch(url);
    if (!res.ok) {
      return [];
    }
    const data = (await res.json()) as ListModelsResponse;
    if (!data.models) {
      return [];
    }

    const supported = data.models
      .filter((m) => m.supportedGenerationMethods?.includes('generateContent'))
      .map((m) => (m.name.startsWith('models/') ? m.name.replace('models/', '') : m.name));

    supported.sort((a, b) => {
      const aFlash = a.includes('flash') ? 1 : 0;
      const bFlash = b.includes('flash') ? 1 : 0;
      return bFlash - aFlash;
    });

    return supported;
  }
}
