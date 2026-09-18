import * as vscode from 'vscode';
import { TranslatorFactory } from '../services/translatorFactory';

export class TranslationHoverProvider implements vscode.HoverProvider {
  private cache = new Map<string, string>();

  constructor(private readonly translatorFactory: TranslatorFactory) {}

  public async provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Promise<vscode.Hover | undefined> {
    const config = vscode.workspace.getConfiguration('vscodeTranslate');
    const hoverEnabled = config.get<boolean>('hoverEnabled', true);
    if (!hoverEnabled) {
      return undefined;
    }

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return undefined;
    }

    let textToTranslate = '';
    let range: vscode.Range | undefined;

    if (editor.selection && !editor.selection.isEmpty && editor.selection.contains(position)) {
      textToTranslate = document.getText(editor.selection).trim();
      range = editor.selection;
    } else {
      const wordRange = document.getWordRangeAtPosition(position);
      if (wordRange) {
        textToTranslate = document.getText(wordRange).trim();
        range = wordRange;
      }
    }

    if (!textToTranslate || textToTranslate.length > 300) {
      return undefined;
    }

    const targetLang = config.get<string>('targetLanguage', 'ja');
    const sourceLang = config.get<string>('sourceLanguage', 'auto');
    const cacheKey = `${sourceLang}:${targetLang}:${textToTranslate}`;

    let translatedText = this.cache.get(cacheKey);

    if (!translatedText) {
      if (token.isCancellationRequested) {
        return undefined;
      }
      try {
        const translator = await this.translatorFactory.getTranslator();
        const result = await translator.translate(textToTranslate, {
          from: sourceLang,
          to: targetLang,
        });
        translatedText = `**[${result.provider}]**\n\n${result.text}`;
        this.cache.set(cacheKey, translatedText);
      } catch {
        return undefined;
      }
    }

    const markdown = new vscode.MarkdownString(translatedText);
    markdown.isTrusted = true;
    return new vscode.Hover(markdown, range);
  }
}
