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
