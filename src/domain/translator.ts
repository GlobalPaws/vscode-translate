export interface TranslationOptions {
  from?: string;
  to: string;
}

export interface TranslationResult {
  text: string;
  detectedSourceLanguage?: string;
  provider: string;
}

export interface ITranslator {
  readonly id: string;
  readonly name: string;
  translate(text: string, options: TranslationOptions): Promise<TranslationResult>;
}
