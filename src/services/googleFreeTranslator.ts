import { ITranslator, TranslationOptions, TranslationResult } from '../domain/translator';

interface MyMemoryMatch {
  id?: string;
  segment?: string;
  translation?: string;
  source?: string;
  target?: string;
  quality?: string | number;
  'usage-count'?: number;
  match?: number;
}

interface MyMemoryResponse {
  responseData?: {
    translatedText?: string;
    match?: number;
  };
  responseStatus?: number;
  responseDetails?: string;
  matches?: MyMemoryMatch[];
}

export class GoogleFreeTranslator implements ITranslator {
  public readonly id = 'google-free';
  public readonly name = 'Free Online Translation (Google / MyMemory)';

  public async translate(text: string, options: TranslationOptions): Promise<TranslationResult> {
    const trimmed = text.trim();
    if (!trimmed) {
      return { text: '', provider: this.name };
    }

    const sl = options.from && options.from !== 'auto' ? options.from : 'auto';
    const tl = options.to;

    // 1. Google 翻訳エンドポイント (Primary) を試行
    try {
      const googleResult = await this.translateWithGoogle(trimmed, sl, tl);

      if (googleResult && googleResult.text) {
        return {
          text: googleResult.text,
          detectedSourceLanguage: googleResult.detectedLang,
          sourceTransliteration: googleResult.sourceTransliteration,
          targetTransliteration: googleResult.targetTransliteration,
          provider: 'Google Translate',
        };
      }
    } catch {
      // 次のセカンダリエンドポイントへ
    }

    // 2. Google 翻訳エンドポイント (Secondary: clients5) を試行
    try {
      const clients5Result = await this.translateWithGoogleClients5(trimmed, sl, tl);

      if (clients5Result && clients5Result.text) {
        return {
          text: clients5Result.text,
          detectedSourceLanguage: clients5Result.detectedLang,
          provider: 'Google Translate',
        };
      }
    } catch {
      // MyMemory にフォールバック
    }

    // 3. フォールバック: MyMemory Translation API
    try {
      const myMemoryResult = await this.translateWithMyMemory(trimmed, sl, tl);

      return {
        text: myMemoryResult.text,
        detectedSourceLanguage: myMemoryResult.detectedLang,
        provider: 'MyMemory Translate',
      };
    } catch (fallbackError) {
      const msg = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
      throw new Error(`Free translation failed: ${msg}`);
    }
  }

  private async translateWithGoogle(
    text: string,
    sl: string,
    tl: string
  ): Promise<{
    text: string;
    detectedLang?: string;
    sourceTransliteration?: string;
    targetTransliteration?: string;
  } | null> {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(
      sl
    )}&tl=${encodeURIComponent(tl)}&dt=t&dt=rm&q=${encodeURIComponent(text)}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('json')) {
      // HTML/CAPTCHA が返された場合はフォールバック
      return null;
    }

    const data = (await response.json()) as unknown;
    if (!Array.isArray(data) || !Array.isArray(data[0])) {
      return null;
    }

    let targetTransliteration: string | undefined;
    let sourceTransliteration: string | undefined;

    const translatedParts: string[] = [];
    for (const segment of data[0] as unknown[][]) {
      if (!Array.isArray(segment)) {continue;}
      if (typeof segment[0] === 'string') {
        translatedParts.push(segment[0]);
      } else if (segment[0] === null) {
        if (typeof segment[2] === 'string' && segment[2].trim()) {
          targetTransliteration = segment[2].trim();
        }
        if (typeof segment[3] === 'string' && segment[3].trim()) {
          sourceTransliteration = segment[3].trim();
        }
      }
    }

    const translatedSegments = translatedParts.join('');
    if (!translatedSegments.trim()) {
      return null;
    }

    let detectedLang = typeof data[2] === 'string' ? data[2] : undefined;
    if (
      Array.isArray(data[8]) &&
      Array.isArray(data[8][0]) &&
      typeof data[8][0][0] === 'string'
    ) {
      detectedLang = data[8][0][0];
    }

    return {
      text: translatedSegments,
      detectedLang,
      sourceTransliteration,
      targetTransliteration,
    };
  }

  private async translateWithGoogleClients5(
    text: string,
    sl: string,
    tl: string
  ): Promise<{ text: string; detectedLang?: string } | null> {
    const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${encodeURIComponent(
      sl
    )}&tl=${encodeURIComponent(tl)}&q=${encodeURIComponent(text)}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as unknown;
    if (Array.isArray(data) && typeof data[0] === 'string' && data[0].trim()) {
      return {
        text: data[0].trim(),
        detectedLang: sl !== 'auto' ? sl : undefined,
      };
    }
    return null;
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

    const response = await fetch(url, {
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`MyMemory API returned status ${response.status}`);
    }

    const data = (await response.json()) as MyMemoryResponse;

    let translatedText = data.responseData?.translatedText;
    const details = data.responseDetails || '';

    // MyMemory のクォータ超過警告メッセージを検知
    if (
      (typeof translatedText === 'string' && translatedText.toUpperCase().includes('MYMEMORY WARNING')) ||
      details.toUpperCase().includes('MYMEMORY WARNING') ||
      data.responseStatus === 403
    ) {
      throw new Error('MyMemory daily free quota reached. Please configure DeepL or Gemini in Settings.');
    }

    if (data.responseStatus && data.responseStatus !== 200) {
      throw new Error(details || `MyMemory API error: ${data.responseStatus}`);
    }

    // ターゲットが英語以外（例: vi, ja, ko など）なのに、responseData が純粋な英単語の場合（例: テスト -> Test）:
    // matches 内からターゲット言語に適した信頼度の高い訳語を探索
    if (tl !== 'en' && Array.isArray(data.matches) && data.matches.length > 0) {
      const sortedMatches = [...data.matches].sort((a, b) => {
        const usageA = Number(a['usage-count']) || 0;
        const usageB = Number(b['usage-count']) || 0;
        return usageB - usageA;
      });

      for (const m of sortedMatches) {
        if (m.translation && typeof m.translation === 'string' && m.translation.trim()) {
          const trans = m.translation.trim();
          // 非ASCII（ベトナム語や日本語等の文字）を含む、または usage-count が多い候補を優先
          if (/[^\x20-\x7E\t\r\n]/.test(trans) || (Number(m['usage-count']) || 0) > 2) {
            translatedText = trans;
            break;
          }
        }
      }
    }

    if (!translatedText || typeof translatedText !== 'string') {
      throw new Error(details || 'No translation received from service');
    }

    // 翻訳が見つからず入力テキストがそのまま返されたケースを検知
    const isSameText = translatedText.trim().toLowerCase() === text.trim().toLowerCase();
    const isLowMatch = data.responseData?.match !== undefined && data.responseData.match <= 0;
    if (isSameText && isLowMatch && sl !== tl) {
      throw new Error('No matching translation found in free database.');
    }

    return {
      text: translatedText,
      detectedLang: undefined,
    };
  }
}
