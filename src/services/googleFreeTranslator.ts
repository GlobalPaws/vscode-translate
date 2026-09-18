import { ITranslator, TranslationOptions, TranslationResult } from '../domain/translator';

interface MyMemoryResponse {
  responseData?: {
    translatedText?: string;
    match?: number;
  };
  responseStatus?: number;
  responseDetails?: string;
}

export class GoogleFreeTranslator implements ITranslator {
  public readonly id = 'google-free';
  public readonly name = 'Free Online Translation (Google / MyMemory)';

  public async translate(text: string, options: TranslationOptions): Promise<TranslationResult> {
    if (!text.trim()) {
      return { text: '', provider: this.name };
    }

    const sl = options.from && options.from !== 'auto' ? options.from : 'auto';
    const tl = options.to;

    // Try Google Free endpoint first
    try {
      const googleResult = await this.translateWithGoogle(text, sl, tl);
      if (googleResult) {
        return {
          text: googleResult.text,
          detectedSourceLanguage: googleResult.detectedLang,
          provider: 'Google Translate',
        };
      }
    } catch {
      // Fallback to MyMemory
    }

    // Fallback: MyMemory Translation API
    const myMemoryResult = await this.translateWithMyMemory(text, sl, tl);
    return {
      text: myMemoryResult.text,
      detectedSourceLanguage: myMemoryResult.detectedLang,
      provider: 'MyMemory Translate',
    };
  }

  private async translateWithGoogle(
    text: string,
    sl: string,
    tl: string
  ): Promise<{ text: string; detectedLang?: string } | null> {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(
      sl
    )}&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(text)}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('json')) {
      // Returned HTML / CAPTCHA
      return null;
    }

    const data = (await response.json()) as unknown;
    if (!Array.isArray(data) || !Array.isArray(data[0])) {
      return null;
    }

    const translatedSegments = (data[0] as unknown[][])
      .map((segment) => (typeof segment[0] === 'string' ? segment[0] : ''))
      .join('');

    const detectedLang = typeof data[2] === 'string' ? data[2] : undefined;

    return {
      text: translatedSegments,
      detectedLang,
    };
  }

  private async translateWithMyMemory(
    text: string,
    sl: string,
    tl: string
  ): Promise<{ text: string; detectedLang?: string }> {
    const fromLang = sl === 'auto' ? 'autodetect' : sl;
    const langpair = `${fromLang}|${tl}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${encodeURIComponent(langpair)}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Free translation service failed with status ${response.status}`);
    }

    const data = (await response.json()) as MyMemoryResponse;
    if (!data.responseData || !data.responseData.translatedText) {
      throw new Error(data.responseDetails || 'No translation received from service');
    }

    return {
      text: data.responseData.translatedText,
      detectedLang: undefined,
    };
  }
}
