import { GoogleFreeTranslator } from '../services/googleFreeTranslator';
import { DeepLTranslator } from '../services/deeplTranslator';
import { GeminiTranslator } from '../services/geminiTranslator';

describe('GoogleFreeTranslator', () => {
  it('should return empty text when input is empty or whitespace', async () => {
    const translator = new GoogleFreeTranslator();
    const result = await translator.translate('   ', { to: 'ja' });
    expect(result.text).toBe('');
  });

  it('should translate text successfully via online endpoint or fallback', async () => {
    const translator = new GoogleFreeTranslator();
    const result = await translator.translate('Hello', { from: 'en', to: 'ja' });
    expect(result.text).toBeTruthy();
    expect(typeof result.text).toBe('string');
  }, 10000);

  it('should detect MyMemory warning and throw error instead of showing warning as translated text', async () => {
    const originalFetch = global.fetch;
    try {
      global.fetch = jest.fn(async (url: unknown) => {
        const urlStr = String(url);
        if (urlStr.includes('translate.googleapis.com')) {
          // Google endpoint fails (e.g. rate limit)
          return { ok: false, status: 429 } as Response;
        }
        if (urlStr.includes('api.mymemory.translated.net')) {
          // MyMemory returns warning message
          return {
            ok: true,
            status: 200,
            json: async () => ({
              responseData: {
                translatedText: 'MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS TODAY',
                match: 0,
              },
              responseStatus: 403,
            }),
          } as Response;
        }
        return { ok: false, status: 500 } as Response;
      });

      const translator = new GoogleFreeTranslator();
      await expect(translator.translate('Test text', { from: 'en', to: 'ja' })).rejects.toThrow(
        /quota reached/i
      );
    } finally {
      global.fetch = originalFetch;
    }
  });

  it('should detect actual input language when input text is Japanese even if source language is set to English', async () => {
    const translator = new GoogleFreeTranslator();
    const result = await translator.translate('テスト', { from: 'en', to: 'vi' });
    expect(result.detectedSourceLanguage).toBe('ja');
  }, 10000);

  it('should correctly translate Japanese "テスト" to Vietnamese "Bài kiểm tra"', async () => {
    const translator = new GoogleFreeTranslator();
    const result = await translator.translate('テスト', { from: 'ja', to: 'vi' });
    expect(result.text.toLowerCase()).toContain('kiểm tra');
    expect(result.text).not.toBe('Test');
  }, 10000);
});

describe('DeepLTranslator', () => {
  it('should throw error when API key is empty', async () => {
    const translator = new DeepLTranslator('');
    await expect(translator.translate('test', { to: 'ja' })).rejects.toThrow(
      'DeepL API key is missing'
    );
  });
});

describe('GeminiTranslator', () => {
  it('should throw error when API key is empty', async () => {
    const translator = new GeminiTranslator('');
    await expect(translator.translate('test', { to: 'ja' })).rejects.toThrow(
      'Gemini API key is missing'
    );
  });
});
