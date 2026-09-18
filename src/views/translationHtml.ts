export interface TranslationHtmlOptions {
  currentProvider: string;
  panelLanguage?: string;
  defaultSource?: string;
  defaultTarget?: string;
  iconUri?: string;
  googleIconUri?: string;
  deeplIconUri?: string;
  geminiIconUri?: string;
}

export interface LanguageItem {
  code: string;
  name: string;
}

export const ALL_LANGUAGES: LanguageItem[] = [
  { code: 'af', name: 'Afrikaans (アフリカーンス語)' },
  { code: 'sq', name: 'Albanian (アルバニア語)' },
  { code: 'am', name: 'Amharic (アムハラ語)' },
  { code: 'ar', name: 'Arabic (アラビア語)' },
  { code: 'hy', name: 'Armenian (アルメニア語)' },
  { code: 'as', name: 'Assamese (アッサム語)' },
  { code: 'ay', name: 'Aymara (アイマラ語)' },
  { code: 'az', name: 'Azerbaijani (アゼルバイジャン語)' },
  { code: 'bm', name: 'Bambara (バンバラ語)' },
  { code: 'eu', name: 'Basque (バスク語)' },
  { code: 'be', name: 'Belarusian (ベラルーシ語)' },
  { code: 'bn', name: 'Bengali (ベンガル語)' },
  { code: 'bho', name: 'Bhojpuri (ボージュプリー語)' },
  { code: 'bs', name: 'Bosnian (ボスニア語)' },
  { code: 'bg', name: 'Bulgarian (ブルガリア語)' },
  { code: 'ca', name: 'Catalan (カタルーニャ語)' },
  { code: 'ceb', name: 'Cebuano (セブアノ語)' },
  { code: 'zh', name: 'Chinese (Simplified) (中国語 簡体)' },
  { code: 'zh-TW', name: 'Chinese (Traditional) (中国語 繁体)' },
  { code: 'co', name: 'Corsican (コルシカ語)' },
  { code: 'hr', name: 'Croatian (クロアチア語)' },
  { code: 'cs', name: 'Czech (チェコ語)' },
  { code: 'da', name: 'Danish (デンマーク語)' },
  { code: 'dv', name: 'Dhivehi (ディベヒ語)' },
  { code: 'doi', name: 'Dogri (ドグリ語)' },
  { code: 'nl', name: 'Dutch (オランダ語)' },
  { code: 'en', name: 'English (英語)' },
  { code: 'eo', name: 'Esperanto (エスペラント語)' },
  { code: 'et', name: 'Estonian (エストニア語)' },
  { code: 'ee', name: 'Ewe (エウェ語)' },
  { code: 'fil', name: 'Filipino / Tagalog (フィリピン語)' },
  { code: 'fi', name: 'Finnish (フィンランド語)' },
  { code: 'fr', name: 'French (フランス語)' },
  { code: 'fy', name: 'Frisian (フリジア語)' },
  { code: 'gl', name: 'Galician (ガリシア語)' },
  { code: 'ka', name: 'Georgian (ジョージア語)' },
  { code: 'de', name: 'German (ドイツ語)' },
  { code: 'el', name: 'Greek (ギリシャ語)' },
  { code: 'gn', name: 'Guarani (グアラニ語)' },
  { code: 'gu', name: 'Gujarati (グジャラート語)' },
  { code: 'ht', name: 'Haitian Creole (ハイチ語)' },
  { code: 'ha', name: 'Hausa (ハウサ語)' },
  { code: 'haw', name: 'Hawaiian (ハワイ語)' },
  { code: 'he', name: 'Hebrew (ヘブライ語)' },
  { code: 'hi', name: 'Hindi (ヒンディー語)' },
  { code: 'hmn', name: 'Hmong (モン語)' },
  { code: 'hu', name: 'Hungarian (ハンガリー語)' },
  { code: 'is', name: 'Icelandic (アイスランド語)' },
  { code: 'ig', name: 'Igbo (イボ語)' },
  { code: 'ilo', name: 'Ilocano (イロカノ語)' },
  { code: 'id', name: 'Indonesian (インドネシア語)' },
  { code: 'ga', name: 'Irish (アイルランド語)' },
  { code: 'it', name: 'Italian (イタリア語)' },
  { code: 'ja', name: 'Japanese (日本語)' },
  { code: 'jv', name: 'Javanese (ジャワ語)' },
  { code: 'kn', name: 'Kannada (カンナダ語)' },
  { code: 'kk', name: 'Kazakh (カザフ語)' },
  { code: 'km', name: 'Khmer (クメール語)' },
  { code: 'rw', name: 'Kinyarwanda (キニヤルワンダ語)' },
  { code: 'ko', name: 'Korean (韓国語)' },
  { code: 'kri', name: 'Krio (クリオ語)' },
  { code: 'ku', name: 'Kurdish (Kurmanji) (クルド語)' },
  { code: 'ckb', name: 'Kurdish (Sorani) (クルド語ソラニー)' },
  { code: 'ky', name: 'Kyrgyz (キルギス語)' },
  { code: 'lo', name: 'Lao (ラオ語)' },
  { code: 'la', name: 'Latin (ラテン語)' },
  { code: 'lv', name: 'Latvian (ラトビア語)' },
  { code: 'ln', name: 'Lingala (リンガラ語)' },
  { code: 'lt', name: 'Lithuanian (リトアニア語)' },
  { code: 'lg', name: 'Luganda (ルガンダ語)' },
  { code: 'lb', name: 'Luxembourgish (ルクセンブルク語)' },
  { code: 'mk', name: 'Macedonian (マケドニア語)' },
  { code: 'mai', name: 'Maithili (マイティーリー語)' },
  { code: 'mg', name: 'Malagasy (マラガシ語)' },
  { code: 'ms', name: 'Malay (マレー語)' },
  { code: 'ml', name: 'Malayalam (マラヤーラム語)' },
  { code: 'mt', name: 'Maltese (マルタ語)' },
  { code: 'mi', name: 'Maori (マオリ語)' },
  { code: 'mr', name: 'Marathi (マラーティー語)' },
  { code: 'mni-Mtei', name: 'Meiteilon (Manipuri) (マニプリ語)' },
  { code: 'lus', name: 'Mizo (ミゾ語)' },
  { code: 'mn', name: 'Mongolian (モンゴル語)' },
  { code: 'my', name: 'Myanmar (Burmese) (ミャンマー語)' },
  { code: 'ne', name: 'Nepali (ネパール語)' },
  { code: 'no', name: 'Norwegian (ノルウェー語)' },
  { code: 'ny', name: 'Nyanja (Chichewa) (ニャンジャ語)' },
  { code: 'or', name: 'Odia (Oriya) (オディア語)' },
  { code: 'om', name: 'Oromo (オロモ語)' },
  { code: 'ps', name: 'Pashto (パシュトー語)' },
  { code: 'fa', name: 'Persian (ペルシャ語)' },
  { code: 'pl', name: 'Polish (ポーランド語)' },
  { code: 'pt', name: 'Portuguese (ポルトガル語)' },
  { code: 'pa', name: 'Punjabi (パンジャブ語)' },
  { code: 'qu', name: 'Quechua (ケチュア語)' },
  { code: 'ro', name: 'Romanian (ルーマニア語)' },
  { code: 'ru', name: 'Russian (ロシア語)' },
  { code: 'sm', name: 'Samoan (サモア語)' },
  { code: 'sa', name: 'Sanskrit (サンスクリット語)' },
  { code: 'gd', name: 'Scots Gaelic (スコットランド・ゲール語)' },
  { code: 'nso', name: 'Sepedi (セペディ語)' },
  { code: 'sr', name: 'Serbian (セルビア語)' },
  { code: 'st', name: 'Sesotho (セソト語)' },
  { code: 'sn', name: 'Shona (ショナ語)' },
  { code: 'sd', name: 'Sindhi (シンド語)' },
  { code: 'si', name: 'Sinhala (シンハラ語)' },
  { code: 'sk', name: 'Slovak (スロバキア語)' },
  { code: 'sl', name: 'Slovenian (スロベニア語)' },
  { code: 'so', name: 'Somali (ソマリ語)' },
  { code: 'es', name: 'Spanish (スペイン語)' },
  { code: 'su', name: 'Sundanese (スンダ語)' },
  { code: 'sw', name: 'Swahili (スワヒリ語)' },
  { code: 'sv', name: 'Swedish (スウェーデン語)' },
  { code: 'tg', name: 'Tajik (タジク語)' },
  { code: 'ta', name: 'Tamil (タミル語)' },
  { code: 'tt', name: 'Tatar (タタール語)' },
  { code: 'te', name: 'Telugu (テルグ語)' },
  { code: 'th', name: 'Thai (タイ語)' },
  { code: 'ti', name: 'Tigrinya (ティグリニャ語)' },
  { code: 'ts', name: 'Tsonga (ツォンガ語)' },
  { code: 'tr', name: 'Turkish (トルコ語)' },
  { code: 'tk', name: 'Turkmen (トルクメン語)' },
  { code: 'ak', name: 'Twi (Akan) (トウィ語)' },
  { code: 'uk', name: 'Ukrainian (ウクライナ語)' },
  { code: 'ur', name: 'Urdu (ウルドゥー語)' },
  { code: 'ug', name: 'Uyghur (ウイグル語)' },
  { code: 'uz', name: 'Uzbek (ウズベク語)' },
  { code: 'vi', name: 'Vietnamese (ベトナム語)' },
  { code: 'cy', name: 'Welsh (ウェールズ語)' },
  { code: 'xh', name: 'Xhosa (コサ語)' },
  { code: 'yi', name: 'Yiddish (イディッシュ語)' },
  { code: 'yo', name: 'Yoruba (ヨルバ語)' },
  { code: 'zu', name: 'Zulu (ズールー語)' },
];

export function getTranslationHtml(options: TranslationHtmlOptions): string {
  const currentProvider = options.currentProvider || 'google-free';
  const panelLanguage = options.panelLanguage || 'en';
  const defaultSource = options.defaultSource || 'auto';
  const defaultTarget = options.defaultTarget || 'vi';

  const languageOptionsHtml = ALL_LANGUAGES.map((lang) => {
    let displayName = lang.name.split(' (')[0];
    try {
      const dnUser = new Intl.DisplayNames([panelLanguage, 'en'], { type: 'language' });
      const loc = dnUser.of(lang.code);
      if (loc && loc.toLowerCase() !== lang.code.toLowerCase()) {
        displayName = loc;
      } else {
        const dnEn = new Intl.DisplayNames(['en'], { type: 'language' });
        const en = dnEn.of(lang.code);
        if (en && en.toLowerCase() !== lang.code.toLowerCase()) {
          displayName = en;
        }
      }
    } catch {
      // fallback
    }
    return `<option value="${lang.code}">${displayName}</option>`;
  }).join('\\n');

  return `<!DOCTYPE html>
<html lang="${panelLanguage}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Multi-Translate</title>
  <style>
    :root {
      --primary-color: #1a73e8;
      --primary-hover: #1557b0;
      --bg-color: var(--vscode-editor-background, #ffffff);
      --card-bg: var(--vscode-sideBar-background, #f8f9fa);
      --text-color: var(--vscode-editor-foreground, #202124);
      --subtext-color: var(--vscode-descriptionForeground, #5f6368);
      --border-color: var(--vscode-widget-border, #dadce0);
      --input-bg: var(--vscode-input-background, #ffffff);
      --active-tab-bg: rgba(26, 115, 232, 0.12);
      --btn-hover: rgba(60, 64, 67, 0.08);
      --modal-bg: var(--vscode-editorWidget-background, #ffffff);
      --badge-success: #1e8e3e;
      --badge-gray: #5f6368;
      --font-family: -apple-system, BlinkMacSystemFont, "Google Sans", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-family);
      background-color: var(--bg-color);
      color: var(--text-color);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding: 16px;
      overflow-x: hidden;
      position: relative;
    }

    /* Top Bar */
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-color);
      margin-bottom: 16px;
      gap: 10px;
    }

    .top-bar-left {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 0;
    }

    .brand-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 6px;
      background: #1a73e8;
      color: #ffffff;
      font-size: 13px;
      font-weight: bold;
      flex-shrink: 0;
    }

    .brand-logo-img {
      width: 26px;
      height: 26px;
      border-radius: 6px;
      object-fit: cover;
      display: block;
      flex-shrink: 0;
    }

    .provider-select-wrapper {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--subtext-color);
      flex: 1;
      min-width: 0;
      white-space: nowrap;
    }

    #txtEngineLabel {
      white-space: nowrap;
      flex-shrink: 0;
      font-weight: 500;
    }

    .custom-provider-select {
      position: relative;
      flex: 1;
      min-width: 0;
      max-width: 280px;
    }

    .provider-current-btn {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--input-bg);
      color: var(--text-color);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 12px;
      outline: none;
      cursor: pointer;
      text-align: left;
      user-select: none;
      box-sizing: border-box;
    }

    .provider-current-btn:hover,
    .provider-current-btn:focus {
      border-color: var(--primary-color);
    }

    .provider-btn-icon {
      width: 16px;
      height: 16px;
      border-radius: 3px;
      object-fit: contain;
      flex-shrink: 0;
    }

    .provider-btn-text {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .provider-btn-arrow {
      font-size: 10px;
      color: var(--subtext-color);
      flex-shrink: 0;
      margin-left: 2px;
    }

    .provider-options-menu {
      display: none;
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      width: 100%;
      min-width: 200px;
      background: var(--modal-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
      z-index: 500;
      overflow: hidden;
    }

    .provider-options-menu.active {
      display: block;
    }

    .provider-option-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      font-size: 12px;
      color: var(--text-color);
      cursor: pointer;
      transition: background 0.12s;
      user-select: none;
    }

    .provider-option-item:hover {
      background: var(--btn-hover);
    }

    .provider-option-item.selected {
      background: var(--active-tab-bg);
      color: var(--primary-color);
      font-weight: 600;
    }

    .provider-option-icon {
      width: 16px;
      height: 16px;
      border-radius: 3px;
      object-fit: contain;
      flex-shrink: 0;
    }

    .setting-section-header-icon {
      width: 18px;
      height: 18px;
      border-radius: 3px;
      object-fit: contain;
      vertical-align: middle;
      display: inline-block;
    }

    /* Translation Main Container */
    .translation-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      flex: 1;
      min-height: 380px;
    }

    @media (max-width: 700px) {
      .translation-container {
        grid-template-columns: 1fr;
      }
    }

    /* Cards (Source / Target) */
    .card {
      background-color: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      position: relative;
    }

    /* Language Toolbars */
    .lang-toolbar {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 8px 12px;
      border-bottom: 1px solid var(--border-color);
      overflow-x: auto;
      white-space: nowrap;
    }

    .lang-chip {
      background: transparent;
      border: none;
      color: var(--subtext-color);
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 500;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .lang-chip:hover {
      background: var(--btn-hover);
      color: var(--text-color);
    }

    .lang-chip.active {
      background: var(--active-tab-bg);
      color: var(--primary-color);
      font-weight: 600;
    }

    .lang-dropdown-wrapper {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
    }

    .lang-dropdown-btn {
      background: transparent;
      border: none;
      color: var(--subtext-color);
      width: 28px;
      height: 28px;
      border-radius: 50%;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .lang-dropdown-btn:hover {
      background: var(--btn-hover);
      color: var(--text-color);
    }

    .swap-btn-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .swap-btn {
      background: transparent;
      border: 1px solid var(--border-color);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--subtext-color);
      transition: all 0.2s;
    }

    .swap-btn:hover {
      background: var(--btn-hover);
      color: var(--primary-color);
      transform: rotate(180deg);
    }

    /* Content Area */
    .content-area {
      flex: 1;
      padding: 12px;
      display: flex;
      flex-direction: column;
    }

    textarea.source-text {
      width: 100%;
      flex: 1;
      min-height: 220px;
      border: none;
      background: transparent;
      color: var(--text-color);
      font-family: inherit;
      font-size: 15px;
      line-height: 1.6;
      resize: none;
      outline: none;
    }

    textarea.source-text::placeholder {
      color: var(--subtext-color);
      opacity: 0.7;
    }

    .target-output {
      flex: 1;
      min-height: 220px;
      font-size: 15px;
      line-height: 1.6;
      white-space: pre-wrap;
      word-break: break-word;
      user-select: text;
      color: var(--text-color);
      position: relative;
    }

    .target-output.placeholder {
      color: var(--subtext-color);
      opacity: 0.6;
    }

    /* Card Footer Bar */
    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      border-top: 1px solid var(--border-color);
      font-size: 12px;
      color: var(--subtext-color);
    }

    #charCount.exceeded {
      color: var(--error-color, #ea4335);
      font-weight: 600;
    }

    .footer-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .icon-btn {
      background: transparent;
      border: none;
      color: var(--subtext-color);
      border-radius: 4px;
      padding: 6px 8px;
      font-size: 13px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s;
    }

    .icon-btn:hover {
      background: var(--btn-hover);
      color: var(--text-color);
    }

    .icon-btn.primary {
      background: var(--primary-color);
      color: #ffffff;
      font-weight: 500;
    }

    .icon-btn.primary:hover {
      background: var(--primary-hover);
    }

    /* Loading indicator */
    .translating-indicator {
      display: none;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--primary-color);
    }

    .spinner {
      width: 14px;
      height: 14px;
      border: 2px solid var(--border-color);
      border-top-color: var(--primary-color);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .error-banner {
      display: none;
      background: rgba(234, 67, 53, 0.1);
      color: #d93025;
      border: 1px solid rgba(234, 67, 53, 0.3);
      padding: 8px 12px;
      border-radius: 6px;
      margin-top: 10px;
      font-size: 13px;
    }

    /* Settings Modal */
    .modal-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.45);
      z-index: 1000;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(2px);
    }

    .modal-overlay.active {
      display: flex;
    }

    .modal-content {
      background: var(--modal-bg);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      width: 90%;
      max-width: 540px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 10px;
    }

    .modal-header h3 {
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-close-modal {
      background: transparent;
      border: none;
      font-size: 18px;
      cursor: pointer;
      color: var(--subtext-color);
      padding: 4px;
      border-radius: 4px;
    }

    .btn-close-modal:hover {
      background: var(--btn-hover);
      color: var(--text-color);
    }

    .setting-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-bottom: 6px;
      border-bottom: 1px solid rgba(128, 128, 128, 0.15);
    }

    .setting-section:last-of-type {
      border-bottom: none;
    }

    .setting-label {
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .status-badge {
      font-size: 11px;
      font-weight: normal;
      padding: 2px 8px;
      border-radius: 12px;
      background: var(--border-color);
      color: var(--subtext-color);
    }

    .status-badge.configured {
      background: rgba(30, 142, 62, 0.15);
      color: var(--badge-success);
      font-weight: 500;
    }

    .input-row {
      display: flex;
      gap: 8px;
    }

    .setting-input, .setting-select {
      flex: 1;
      background: var(--input-bg);
      color: var(--text-color);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 8px 10px;
      font-size: 13px;
      outline: none;
    }

    .setting-input:focus, .setting-select:focus {
      border-color: var(--primary-color);
    }

    .btn-save {
      background: var(--primary-color);
      color: #ffffff;
      border: none;
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
    }

    .btn-save:hover {
      background: var(--primary-hover);
    }

    .btn-delete {
      background: transparent;
      color: #d93025;
      border: 1px solid rgba(217, 48, 37, 0.4);
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
    }

    .btn-delete:hover {
      background: rgba(217, 48, 37, 0.08);
    }

    .setting-hint {
      font-size: 11px;
      color: var(--subtext-color);
      line-height: 1.4;
    }

    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 0;
    }

    /* Language Picker Modal */
    .lang-picker-content {
      width: 92%;
      max-width: 620px;
      height: 70vh;
      max-height: 520px;
      min-height: 280px;
      display: flex;
      flex-direction: column;
      padding: 16px;
      gap: 12px;
      box-sizing: border-box;
    }

    .lang-picker-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 2px;
    }

    .lang-picker-header h3 {
      font-size: 15px;
      font-weight: 600;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .lang-search-box {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
    }

    .lang-search-icon {
      position: absolute;
      left: 10px;
      font-size: 13px;
      color: var(--subtext-color);
      pointer-events: none;
    }

    .lang-search-input {
      width: 100%;
      padding: 8px 30px 8px 32px;
      background: var(--input-bg);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      color: var(--text-color);
      font-size: 13px;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.15s ease;
    }

    .lang-search-input:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 1px var(--primary-color);
    }

    .btn-clear-search {
      position: absolute;
      right: 8px;
      background: transparent;
      border: none;
      color: var(--subtext-color);
      cursor: pointer;
      font-size: 12px;
      padding: 3px 6px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-clear-search:hover {
      color: var(--text-color);
      background: var(--btn-hover);
    }

    .lang-picker-body {
      flex: 1;
      overflow-y: auto;
      min-height: 0;
      padding-right: 4px;
    }

    .lang-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 6px;
    }

    .lang-item-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      padding: 7px 10px;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 6px;
      color: var(--text-color);
      font-size: 12.5px;
      cursor: pointer;
      text-align: left;
      transition: all 0.12s ease;
      user-select: none;
      box-sizing: border-box;
    }

    .lang-item-btn:hover {
      background: var(--btn-hover);
      border-color: var(--border-color);
    }

    .lang-item-btn.selected {
      background: var(--active-tab-bg);
      color: var(--primary-color);
      border-color: var(--primary-color);
      font-weight: 600;
    }

    .lang-item-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }

    .lang-item-check {
      font-size: 12px;
      color: var(--primary-color);
      display: none;
    }

    .lang-item-btn.selected .lang-item-check {
      display: inline-block;
    }

    .lang-no-match {
      grid-column: 1 / -1;
      text-align: center;
      padding: 30px 10px;
      color: var(--subtext-color);
      font-size: 13px;
    }
  </style>
</head>
<body>

  <!-- Top Bar -->
  <div class="top-bar">
    <div class="top-bar-left">
      ${
        options.iconUri
          ? `<img src="${options.iconUri}" alt="AI Multi-Translate Icon" class="brand-logo-img" />`
          : '<div class="brand-logo">AI</div>'
      }
      <div class="provider-select-wrapper">
        <label id="txtEngineLabel">Engine:</label>
        <div class="custom-provider-select" id="providerDropdownWrapper">
          <button class="provider-current-btn" id="providerCurrentBtn" type="button" aria-haspopup="listbox">
            <img id="providerCurrentIcon" class="provider-btn-icon" src="${
              currentProvider === 'deepl'
                ? (options.deeplIconUri || '')
                : currentProvider === 'gemini'
                ? (options.geminiIconUri || '')
                : (options.googleIconUri || '')
            }" alt="" />
            <span class="provider-btn-text" id="providerCurrentLabel">${
              currentProvider === 'deepl'
                ? 'DeepL API'
                : currentProvider === 'gemini'
                ? 'Google Gemini AI'
                : 'Google (Free / Online)'
            }</span>
            <span class="provider-btn-arrow">▾</span>
          </button>
          <div class="provider-options-menu" id="providerOptionsMenu" role="listbox">
            <div class="provider-option-item ${currentProvider === 'google-free' ? 'selected' : ''}" data-value="google-free">
              ${options.googleIconUri ? `<img src="${options.googleIconUri}" class="provider-option-icon" alt="" />` : ''}
              <span>Google (Free / Online)</span>
            </div>
            <div class="provider-option-item ${currentProvider === 'deepl' ? 'selected' : ''}" data-value="deepl">
              ${options.deeplIconUri ? `<img src="${options.deeplIconUri}" class="provider-option-icon" alt="" />` : ''}
              <span>DeepL API</span>
            </div>
            <div class="provider-option-item ${currentProvider === 'gemini' ? 'selected' : ''}" data-value="gemini">
              ${options.geminiIconUri ? `<img src="${options.geminiIconUri}" class="provider-option-icon" alt="" />` : ''}
              <span>Google Gemini AI</span>
            </div>
          </div>
          <select id="providerSelect" style="display: none;">
            <option value="google-free" ${currentProvider === 'google-free' ? 'selected' : ''}>Google (Free / Online)</option>
            <option value="deepl" ${currentProvider === 'deepl' ? 'selected' : ''}>DeepL API</option>
            <option value="gemini" ${currentProvider === 'gemini' ? 'selected' : ''}>Google Gemini AI</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <!-- Translation Main Grid -->
  <div class="translation-container">
    
    <!-- Source Box -->
    <div class="card">
      <div class="lang-toolbar">
        <button class="lang-chip ${defaultSource === 'auto' ? 'active' : ''}" data-source="auto" id="chipSourceAuto">Detect Language</button>
        <button class="lang-chip" data-source-dynamic id="chipSourceSelected" style="display: none;"></button>
        <button class="lang-chip ${defaultSource === 'en' ? 'active' : ''}" data-source="en" id="chipSourceEn">English</button>
        <button class="lang-chip ${defaultSource === 'ja' ? 'active' : ''}" data-source="ja" id="chipSourceJa">Japanese</button>
        <button class="lang-chip ${defaultSource === 'vi' ? 'active' : ''}" data-source="vi" id="chipSourceVi">Vietnamese</button>
        <div class="lang-dropdown-wrapper" title="More languages">
          <button class="lang-dropdown-btn" id="btnSourceMore" aria-label="More languages" title="More languages">▾</button>
        </div>
      </div>

      <div class="content-area">
        <textarea id="sourceText" class="source-text" placeholder="${
          currentProvider === 'google-free'
            ? 'Type or paste text to translate... (Max 500 chars)'
            : 'Type or paste text to translate...'
        }" maxlength="${currentProvider === 'google-free' ? '500' : '5000'}" autofocus></textarea>
      </div>

      <div class="card-footer">
        <div class="footer-actions">
          <button id="btnSourceSpeech" class="icon-btn" title="Listen">🔊</button>
          <button id="btnClearSource" class="icon-btn" title="Clear"><span id="txtBtnClear">✕ Clear</span></button>
        </div>
        <div id="charCount">0 / ${currentProvider === 'google-free' ? '500' : '5,000'}</div>
      </div>
    </div>

    <!-- Target Box -->
    <div class="card">
      <div class="lang-toolbar">
        <div class="swap-btn-container">
          <button id="btnSwap" class="swap-btn" title="Swap languages">⇄</button>
        </div>
        <button class="lang-chip" data-target-dynamic id="chipTargetSelected" style="display: none;"></button>
        <button class="lang-chip ${defaultTarget === 'vi' ? 'active' : ''}" data-target="vi" id="chipTargetVi">Vietnamese</button>
        <button class="lang-chip ${defaultTarget === 'en' ? 'active' : ''}" data-target="en" id="chipTargetEn">English</button>
        <button class="lang-chip ${defaultTarget === 'ja' ? 'active' : ''}" data-target="ja" id="chipTargetJa">Japanese</button>
        <div class="lang-dropdown-wrapper" title="More languages">
          <button class="lang-dropdown-btn" id="btnTargetMore" aria-label="More languages" title="More languages">▾</button>
        </div>
      </div>

      <div class="content-area">
        <div id="targetText" class="target-output placeholder">Translation will appear here in real-time...</div>
      </div>

      <div class="card-footer">
        <div class="footer-actions">
          <button id="btnTargetSpeech" class="icon-btn" title="Listen">🔊</button>
          <button id="btnCopy" class="icon-btn" title="Copy"><span id="txtBtnCopy">📋 Copy</span></button>
          <button id="btnInsert" class="icon-btn primary" title="Insert to Editor"><span id="txtBtnInsert">📝 Insert to Editor</span></button>
        </div>
        <div class="translating-indicator" id="loadingIndicator">
          <div class="spinner"></div>
          <span id="txtTranslating">Translating...</span>
        </div>
      </div>
    </div>

  </div>

  <div class="error-banner" id="errorBanner"></div>

  <!-- Language Picker Modal -->
  <div class="modal-overlay" id="langPickerModal">
    <div class="modal-content lang-picker-content">
      <div class="lang-picker-header">
        <h3 id="langPickerTitle">Select Language</h3>
        <button class="btn-close-modal" id="btnCloseLangPicker" title="Close">✕</button>
      </div>
      <div class="lang-search-box">
        <span class="lang-search-icon">🔍</span>
        <input type="text" id="langSearchInput" class="lang-search-input" placeholder="Search languages..." autocomplete="off" />
        <button id="btnClearLangSearch" class="btn-clear-search" style="display: none;" title="Clear search">✕</button>
      </div>
      <div class="lang-picker-body">
        <div class="lang-grid" id="langGridContainer"></div>
      </div>
    </div>
  </div>

  <!-- Settings Modal Dialog -->
  <div class="modal-overlay" id="settingsModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 id="txtModalTitle">⚙️ Settings & Configuration</h3>
        <button class="btn-close-modal" id="btnCloseModal" title="Close">✕</button>
      </div>

      <!-- Panel UI Language & Default Translation Languages -->
      <div class="setting-section">
        <div class="setting-label">
          <span id="txtPanelLanguageLabel">🌐 Panel UI Language</span>
        </div>
        <div class="input-row">
          <select id="panelLangSelect" class="setting-select">
            <option value="en" ${panelLanguage === 'en' ? 'selected' : ''}>English</option>
            <option value="ja" ${panelLanguage === 'ja' ? 'selected' : ''}>日本語 (Japanese)</option>
            <option value="zh" ${panelLanguage === 'zh' ? 'selected' : ''}>简体中文 (Simplified Chinese)</option>
            <option value="ko" ${panelLanguage === 'ko' ? 'selected' : ''}>한국어 (Korean)</option>
            <option value="vi" ${panelLanguage === 'vi' ? 'selected' : ''}>Tiếng Việt (Vietnamese)</option>
            <option value="de" ${panelLanguage === 'de' ? 'selected' : ''}>Deutsch (German)</option>
            <option value="es" ${panelLanguage === 'es' ? 'selected' : ''}>Español (Spanish)</option>
            <option value="fr" ${panelLanguage === 'fr' ? 'selected' : ''}>Français (French)</option>
            <option value="hi" ${panelLanguage === 'hi' ? 'selected' : ''}>हिन्दी (Hindi)</option>
            <option value="it" ${panelLanguage === 'it' ? 'selected' : ''}>Italiano (Italian)</option>
            <option value="pt" ${panelLanguage === 'pt' ? 'selected' : ''}>Português (Portuguese)</option>
            <option value="ru" ${panelLanguage === 'ru' ? 'selected' : ''}>Русский (Russian)</option>
          </select>
        </div>
        <div class="setting-hint" id="txtPanelLanguageHint">Changes the display language of this translation interface.</div>
      </div>

      <div class="setting-section">
        <div class="setting-label">
          <span id="txtDefaultSourceLabel">🔤 Default Source Language</span>
        </div>
        <div class="input-row">
          <select id="defaultSourceSelect" class="setting-select">
            <option value="auto">Auto Detect (言語を検出)</option>
            ${languageOptionsHtml}
          </select>
        </div>
      </div>

      <div class="setting-section">
        <div class="setting-label">
          <span id="txtDefaultTargetLabel">🎯 Default Target Language</span>
        </div>
        <div class="input-row">
          <select id="defaultTargetSelect" class="setting-select">
            ${languageOptionsHtml}
          </select>
        </div>
      </div>

      <!-- DeepL Setting -->
      <div class="setting-section">
        <div class="setting-label">
          <span style="display: inline-flex; align-items: center; gap: 6px;">
            ${options.deeplIconUri ? `<img src="${options.deeplIconUri}" class="setting-section-header-icon" alt="" />` : '⚡'}
            <span>DeepL API Key</span>
          </span>
          <span class="status-badge" id="deeplBadge">Not Configured</span>
        </div>
        <div class="input-row">
          <input type="password" id="deeplInput" class="setting-input" placeholder="DeepL Auth Key (e.g. ...:fx)" />
          <button class="btn-save" id="btnSaveDeepl">Save</button>
          <button class="btn-delete" id="btnDeleteDeepl">Delete</button>
        </div>
        <div class="setting-hint" id="txtDeeplHint">Free plan available (500,000 chars/month free). Get key at deepl.com/pro-api (ends with :fx).</div>
      </div>

      <!-- Gemini Setting -->
      <div class="setting-section">
        <div class="setting-label">
          <span style="display: inline-flex; align-items: center; gap: 6px;">
            ${options.geminiIconUri ? `<img src="${options.geminiIconUri}" class="setting-section-header-icon" alt="" />` : '🤖'}
            <span>Google Gemini API Key</span>
          </span>
          <span class="status-badge" id="geminiBadge">Not Configured</span>
        </div>
        <div class="input-row">
          <input type="password" id="geminiInput" class="setting-input" placeholder="Google AI Studio API Key" />
          <button class="btn-save" id="btnSaveGemini">Save</button>
          <button class="btn-delete" id="btnDeleteGemini">Delete</button>
        </div>
        <div class="setting-hint" id="txtGeminiHint">Free tier available at Google AI Studio. Get key at aistudio.google.com.</div>
      </div>

      <!-- Hover Setting -->
      <div class="setting-section">
        <div class="toggle-row">
          <span class="setting-label" style="margin: 0;" id="txtHoverLabel">💡 Editor Hover Translation Tooltip</span>
          <input type="checkbox" id="hoverCheckbox" style="cursor: pointer;" />
        </div>
        <div class="setting-hint" id="txtHoverHint">Automatically display a translation preview tooltip when hovering over selected code.</div>
      </div>

      <div style="display: flex; justify-content: flex-end; margin-top: 6px;">
        <button class="btn-save" id="btnDoneModal">Done</button>
      </div>
    </div>
  </div>

  <script>
    const vscode = acquireVsCodeApi();
    let currentPanelLang = '${panelLanguage}';
    let currentSourceLang = '${defaultSource}';
    let currentTargetLang = '${defaultTarget}';
    let currentProvider = '${currentProvider}';
    let activePickerType = null; // 'source' | 'target'
    let debounceTimer = null;
    let lastTranslatedResult = '';

    // i18n Dictionaries
    const I18N = {
      en: {
        brandTitle: "AI Multi-Translate Panel",
        engineLabel: "Engine:",
        btnSettings: "Settings",
        chipAuto: "Detect Language",
        chipEn: "English",
        chipJa: "Japanese",
        chipVi: "Vietnamese",
        optMore: "▼ More",
        sourcePlaceholder: "Type or paste text to translate...",
        sourcePlaceholderFree: "Type or paste text to translate... (Max 500 chars)",
        targetPlaceholder: "Translation will appear here in real-time...",
        btnClear: "✕ Clear",
        btnCopy: "📋 Copy",
        btnInsert: "📝 Insert to Editor",
        translating: "Translating...",
        modalTitle: "⚙️ Settings & Configuration",
        panelLanguageLabel: "🌐 Panel UI Language",
        panelLanguageHint: "Changes the display language of this translation interface.",
        defaultSourceLabel: "🔤 Default Source Language",
        defaultTargetLabel: "🎯 Default Target Language",
        deeplHint: "Free plan available (500,000 chars/month). Get your key at deepl.com/pro-api (ends with :fx).",
        geminiHint: "Free quota available via Google AI Studio. Get your API key at aistudio.google.com.",
        hoverLabel: "💡 Editor Hover Translation Tooltip",
        hoverHint: "Automatically display a translation preview tooltip when hovering over selected code.",
        configured: "✅ Configured",
        notConfigured: "Not Configured",
        done: "Done",
        save: "Save",
        delete: "Delete",
        selectSourceLang: "Select Source Language",
        selectTargetLang: "Select Target Language",
        searchLang: "Search languages...",
        noMatchLang: "No matching languages found"
      },
      ja: {
        brandTitle: "Google 翻訳 (IDE Edition)",
        engineLabel: "エンジン:",
        btnSettings: "設定",
        chipAuto: "言語を検出",
        chipEn: "英語",
        chipJa: "日本語",
        chipVi: "ベトナム語",
        optMore: "▼ その他",
        sourcePlaceholder: "テキストを入力または貼り付け...",
        sourcePlaceholderFree: "テキストを入力または貼り付け...（最大500文字）",
        targetPlaceholder: "翻訳がここにリアルタイムで表示されます...",
        btnClear: "✕ クリア",
        btnCopy: "📋 コピー",
        btnInsert: "📝 エディタに挿入",
        translating: "翻訳中...",
        modalTitle: "⚙️ 設定 & 翻訳構成",
        panelLanguageLabel: "🌐 パネル表示言語",
        panelLanguageHint: "この翻訳パネル自体の表示言語（UI言語）を切り替えます。",
        defaultSourceLabel: "🔤 デフォルト翻訳元言語 (Source)",
        defaultTargetLabel: "🎯 デフォルト翻訳先言語 (Target)",
        deeplHint: "無料プランあり（毎月50万文字まで完全無料）。deepl.com/pro-api のアカウント設定から取得（末尾 :fx）。",
        geminiHint: "Google AI Studio で無料利用可能。aistudio.google.com で「Get API key」よりワンクリックで作成。",
        hoverLabel: "💡 エディタホバー翻訳ツールチップ",
        hoverHint: "エディタ上でテキストを選択してホバーした際に、自動で翻訳プレビューを表示します。",
        configured: "✅ 設定済み",
        notConfigured: "未設定",
        done: "完了",
        save: "保存",
        delete: "削除",
        selectSourceLang: "翻訳元言語を選択",
        selectTargetLang: "翻訳先言語を選択",
        searchLang: "言語を検索...",
        noMatchLang: "一致する言語が見つかりません"
      },
      zh: {
        brandTitle: "Google 翻译 (IDE Edition)",
        engineLabel: "引擎:",
        btnSettings: "设置",
        chipAuto: "检测语言",
        chipEn: "英语",
        chipJa: "日语",
        chipVi: "越南语",
        optMore: "▼ 更多",
        sourcePlaceholder: "输入或粘贴要翻译的文本...",
        sourcePlaceholderFree: "输入或粘贴要翻译的文本...（最多500字）",
        targetPlaceholder: "翻译结果将在此实时显示...",
        btnClear: "✕ 清空",
        btnCopy: "📋 复制",
        btnInsert: "📝 插入到编辑器",
        translating: "翻译中...",
        modalTitle: "⚙️ 设置与配置",
        panelLanguageLabel: "🌐 面板界面语言",
        panelLanguageHint: "更改此翻译面板界面的显示语言。",
        defaultSourceLabel: "🔤 默认源语言",
        defaultTargetLabel: "🎯 默认目标语言",
        deeplHint: "提供免费计划（每月50万字符免费）。在 deepl.com/pro-api 账户设置中获取密钥（以:fx结尾）。",
        geminiHint: "Google AI Studio 提供免费使用配额。在 aistudio.google.com 点击 Get API key 即可创建。",
        hoverLabel: "💡 编辑器悬停翻译提示",
        hoverHint: "悬停在选中的代码上时自动显示翻译预览提示。",
        configured: "✅ 已配置",
        notConfigured: "未配置",
        done: "完成",
        save: "保存",
        delete: "删除",
        selectSourceLang: "选择源语言",
        selectTargetLang: "选择目标语言",
        searchLang: "搜索语言...",
        noMatchLang: "未找到匹配的语言"
      },
      ko: {
        brandTitle: "Google 번역 (IDE Edition)",
        engineLabel: "엔진:",
        btnSettings: "설정",
        chipAuto: "언어 감지",
        chipEn: "영어",
        chipJa: "일본어",
        chipVi: "베트남어",
        optMore: "▼ 더보기",
        sourcePlaceholder: "번역할 텍스트를 입력하거나 붙여넣으세요...",
        sourcePlaceholderFree: "번역할 텍스트를 입력하거나 붙여넣으세요... (최대 500자)",
        targetPlaceholder: "번역 결과가 실시간으로 여기에 표시됩니다...",
        btnClear: "✕ 지우기",
        btnCopy: "📋 복사",
        btnInsert: "📝 에디터에 삽입",
        translating: "번역 중...",
        modalTitle: "⚙️ 설정 및 환경 구성",
        panelLanguageLabel: "🌐 패널 UI 언어",
        panelLanguageHint: "이 번역 패널 인터페이스의 표시 언어를 변경합니다.",
        defaultSourceLabel: "🔤 기본 소스 언어",
        defaultTargetLabel: "🎯 기본 타겟 언어",
        deeplHint: "무료 요금제 제공 (월 50만 자 무료). deepl.com/pro-api 계정 설정에서 키를 발급받으세요 (:fx로 끝남).",
        geminiHint: "Google AI Studio를 통해 무료 이용 가능. aistudio.google.com에서 Get API key로 간편하게 생성.",
        hoverLabel: "💡 에디터 호버 번역 툴팁",
        hoverHint: "선택한 코드 위에 마우스를 올렸을 때 번역 미리보기 툴팁을 자동으로 표시합니다.",
        configured: "✅ 설정됨",
        notConfigured: "미설정",
        done: "완료",
        save: "저장",
        delete: "삭제",
        selectSourceLang: "출발어 선택",
        selectTargetLang: "도착어 선택",
        searchLang: "언어 검색...",
        noMatchLang: "일치하는 언어가 없습니다"
      },
      vi: {
        brandTitle: "Google Dịch (Phiên bản IDE)",
        engineLabel: "Công cụ:",
        btnSettings: "Cài đặt",
        chipAuto: "Phát hiện ngôn ngữ",
        chipEn: "Tiếng Anh",
        chipJa: "Tiếng Nhật",
        chipVi: "Tiếng Việt",
        optMore: "▼ Khác",
        sourcePlaceholder: "Nhập hoặc dán văn bản để dịch...",
        sourcePlaceholderFree: "Nhập hoặc dán văn bản để dịch... (Tối đa 500 ký tự)",
        targetPlaceholder: "Bản dịch sẽ hiển thị ở đây theo thời gian thực...",
        btnClear: "✕ Xóa",
        btnCopy: "📋 Sao chép",
        btnInsert: "📝 Chèn vào Editor",
        translating: "Đang dịch...",
        modalTitle: "⚙️ Cài đặt & Cấu hình",
        panelLanguageLabel: "🌐 Ngôn ngữ giao diện Panel",
        panelLanguageHint: "Thay đổi ngôn ngữ hiển thị của giao diện dịch thuật này.",
        defaultSourceLabel: "🔤 Ngôn ngữ nguồn mặc định",
        defaultTargetLabel: "🎯 Ngôn ngữ đích mặc định",
        deeplHint: "Có gói miễn phí (500.000 ký tự/tháng). Lấy khóa tại deepl.com/pro-api (kết thúc bằng :fx).",
        geminiHint: "Miễn phí qua Google AI Studio. Lấy khóa API tại aistudio.google.com qua nút Get API key.",
        hoverLabel: "💡 Tooltip dịch khi di chuột trong Editor",
        hoverHint: "Tự động hiển thị bản xem trước dịch khi di chuột qua đoạn mã được chọn.",
        configured: "✅ Đã cấu hình",
        notConfigured: "Chưa cấu hình",
        done: "Xong",
        save: "Lưu",
        delete: "Xóa",
        selectSourceLang: "Chọn ngôn ngữ nguồn",
        selectTargetLang: "Chọn ngôn ngữ đích",
        searchLang: "Tìm kiếm ngôn ngữ...",
        noMatchLang: "Không tìm thấy ngôn ngữ phù hợp"
      },
      de: {
        brandTitle: "Google Übersetzer (IDE Edition)",
        engineLabel: "Engine:",
        btnSettings: "Einstellungen",
        chipAuto: "Sprache erkennen",
        chipEn: "Englisch",
        chipJa: "Japanisch",
        chipVi: "Vietnamesisch",
        optMore: "▼ Mehr",
        sourcePlaceholder: "Text zum Übersetzen eingeben oder einfügen...",
        sourcePlaceholderFree: "Text zum Übersetzen eingeben oder einfügen... (Max. 500 Zeichen)",
        targetPlaceholder: "Die Übersetzung erscheint hier in Echtzeit...",
        btnClear: "✕ Löschen",
        btnCopy: "📋 Kopieren",
        btnInsert: "📝 In Editor einfügen",
        translating: "Übersetze...",
        modalTitle: "⚙️ Einstellungen & Konfiguration",
        panelLanguageLabel: "🌐 Panel-UI-Sprache",
        panelLanguageHint: "Ändert die Anzeigesprache dieser Übersetzungsoberfläche.",
        defaultSourceLabel: "🔤 Standard-Ausgangssprache",
        defaultTargetLabel: "🎯 Standard-Zielsprache",
        deeplHint: "Kostenloser Plan verfügbar (500.000 Zeichen/Monat frei). Schlüssel unter deepl.com/pro-api abrufen (endet auf :fx).",
        geminiHint: "Kostenlose Nutzung über Google AI Studio möglich. API-Schlüssel unter aistudio.google.com erstellen.",
        hoverLabel: "💡 Editor-Hover-Übersetzungs-Tooltip",
        hoverHint: "Automatischer Vorschau-Tooltip beim Überfahren von ausgewähltem Code.",
        configured: "✅ Konfiguriert",
        notConfigured: "Nicht konfiguriert",
        done: "Fertig",
        save: "Speichern",
        delete: "Löschen",
        selectSourceLang: "Ausgangssprache auswählen",
        selectTargetLang: "Zielsprache auswählen",
        searchLang: "Sprachen suchen...",
        noMatchLang: "Keine passenden Sprachen gefunden"
      },
      es: {
        brandTitle: "Google Traductor (IDE Edition)",
        engineLabel: "Motor:",
        btnSettings: "Ajustes",
        chipAuto: "Detectar idioma",
        chipEn: "Inglés",
        chipJa: "Japonés",
        chipVi: "Vietnamita",
        optMore: "▼ Más",
        sourcePlaceholder: "Escribe o pega el texto para traducir...",
        sourcePlaceholderFree: "Escribe o pega el texto para traducir... (Máx. 500 caracteres)",
        targetPlaceholder: "La traducción aparecerá aquí en tiempo real...",
        btnClear: "✕ Limpiar",
        btnCopy: "📋 Copiar",
        btnInsert: "📝 Insertar en editor",
        translating: "Traduciendo...",
        modalTitle: "⚙️ Ajustes y Configuración",
        panelLanguageLabel: "🌐 Idioma de la interfaz",
        panelLanguageHint: "Cambia el idioma de visualización de este panel de traducción.",
        defaultSourceLabel: "🔤 Idioma de origen predeterminado",
        defaultTargetLabel: "🎯 Idioma de destino predeterminado",
        deeplHint: "Plan gratuito disponible (500.000 caracteres/mes gratis). Obtén tu clave en deepl.com/pro-api (termina en :fx).",
        geminiHint: "Cuota gratuita disponible en Google AI Studio. Obtén tu clave en aistudio.google.com.",
        hoverLabel: "💡 Información sobre herramientas al pasar el cursor",
        hoverHint: "Muestra automáticamente una vista previa de la traducción al pasar el cursor sobre el código seleccionado.",
        configured: "✅ Configurado",
        notConfigured: "No configurado",
        done: "Listo",
        save: "Guardar",
        delete: "Eliminar",
        selectSourceLang: "Seleccionar idioma de origen",
        selectTargetLang: "Seleccionar idioma de destino",
        searchLang: "Buscar idiomas...",
        noMatchLang: "No se encontraron idiomas coincidentes"
      },
      fr: {
        brandTitle: "Google Traduction (IDE Edition)",
        engineLabel: "Moteur :",
        btnSettings: "Paramètres",
        chipAuto: "Détecter la langue",
        chipEn: "Anglais",
        chipJa: "Japonais",
        chipVi: "Vietnamien",
        optMore: "▼ Plus",
        sourcePlaceholder: "Saisissez ou collez le texte à traduire...",
        sourcePlaceholderFree: "Saisissez ou collez le texte à traduire... (Max 500 caractères)",
        targetPlaceholder: "La traduction apparaîtra ici en temps réel...",
        btnClear: "✕ Effacer",
        btnCopy: "📋 Copier",
        btnInsert: "📝 Insérer dans l'éditeur",
        translating: "Traduction en cours...",
        modalTitle: "⚙️ Paramètres et Configuration",
        panelLanguageLabel: "🌐 Langue de l'interface",
        panelLanguageHint: "Modifie la langue d'affichage de ce panneau de traduction.",
        defaultSourceLabel: "🔤 Langue source par défaut",
        defaultTargetLabel: "🎯 Langue cible par défaut",
        deeplHint: "Forfait gratuit disponible (500 000 caractères/mois gratuits). Obtenez votre clé sur deepl.com/pro-api (finit par :fx).",
        geminiHint: "Quota gratuit disponible via Google AI Studio. Obtenez votre clé sur aistudio.google.com.",
        hoverLabel: "💡 Infobulle de traduction au survol",
        hoverHint: "Affiche automatiquement un aperçu de traduction lors du survol du code sélectionné.",
        configured: "✅ Configuré",
        notConfigured: "Non configuré",
        done: "Terminé",
        save: "Enregistrer",
        delete: "Supprimer",
        selectSourceLang: "Sélectionner la langue source",
        selectTargetLang: "Sélectionner la langue cible",
        searchLang: "Rechercher des langues...",
        noMatchLang: "Aucune langue correspondante trouvée"
      },
      hi: {
        brandTitle: "Google अनुवाद (IDE Edition)",
        engineLabel: "इंजन:",
        btnSettings: "सेTINGS",
        chipAuto: "भाषा पहचानें",
        chipEn: "अंग्रेज़ी",
        chipJa: "जापानी",
        chipVi: "वियतनामी",
        optMore: "▼ और अधिक",
        sourcePlaceholder: "अनुवाद करने के लिए टेक्स्ट टाइप या पेस्ट करें...",
        sourcePlaceholderFree: "अनुवाद करने के लिए टेक्स्ट टाइप या पेस्ट करें... (अधिकतम 500 वर्ण)",
        targetPlaceholder: "अनुवाद यहां वास्तविक समय में दिखाई देगा...",
        btnClear: "✕ साफ़ करें",
        btnCopy: "📋 कॉपी करें",
        btnInsert: "📝 संपादक में डालें",
        translating: "अनुवाद हो रहा है...",
        modalTitle: "⚙️ सेटिंग्स और कॉन्फ़िगरेशन",
        panelLanguageLabel: "🌐 पैनल UI भाषा",
        panelLanguageHint: "इस अनुवाद इंटरफ़ेस की प्रदर्शन भाषा बदलें।",
        defaultSourceLabel: "🔤 डिफ़ॉल्ट स्रोत भाषा",
        defaultTargetLabel: "🎯 डिफ़ॉल्ट लक्ष्य भाषा",
        deeplHint: "मुफ़्त योजना उपलब्ध (500,000 वर्ण/माह मुफ़्त)। deepl.com/pro-api पर अपनी कुंजी प्राप्त करें (:fx पर समाप्त)।",
        geminiHint: "Google AI Studio के माध्यम से मुफ़्त कोटा उपलब्ध। aistudio.google.com पर Get API key से बनाएं।",
        hoverLabel: "💡 संपादक होवर अनुवाद टूलटिप",
        hoverHint: "चयनित कोड पर होवर करने पर स्वचालित रूप से अनुवाद पूर्वावलोकन प्रदर्शित करें।",
        configured: "✅ कॉन्फ़िगर किया गया",
        notConfigured: "कॉन्फ़िगर नहीं किया गया",
        done: "पूर्ण",
        save: "सहेजें",
        delete: "हटाएं",
        selectSourceLang: "स्रोत भाषा चुनें",
        selectTargetLang: "लक्ष्य भाषा चुनें",
        searchLang: "भाषा खोजें...",
        noMatchLang: "कोई मेल खाती भाषा नहीं मिली"
      },
      it: {
        brandTitle: "Google Traduttore (IDE Edition)",
        engineLabel: "Motore:",
        btnSettings: "Impostazioni",
        chipAuto: "Rileva lingua",
        chipEn: "Inglese",
        chipJa: "Giapponese",
        chipVi: "Vietnamita",
        optMore: "▼ Altro",
        sourcePlaceholder: "Digita o incolla il testo da tradurre...",
        sourcePlaceholderFree: "Digita o incolla il testo da tradurre... (Max 500 caratteri)",
        targetPlaceholder: "La traduzione apparirà qui in tempo reale...",
        btnClear: "✕ Cancella",
        btnCopy: "📋 Copia",
        btnInsert: "📝 Inserisci nell'editor",
        translating: "Traduzione in corso...",
        modalTitle: "⚙️ Impostazioni e Configurazione",
        panelLanguageLabel: "🌐 Lingua dell'interfaccia",
        panelLanguageHint: "Modifica la lingua di visualizzazione di questo pannello di traduzione.",
        defaultSourceLabel: "🔤 Lingua di origine predefinita",
        defaultTargetLabel: "🎯 Lingua di destinazione predefinita",
        deeplHint: "Piano gratuito disponibile (500.000 caratteri/mese gratis). Ottieni la chiave su deepl.com/pro-api (termina con :fx).",
        geminiHint: "Quota gratuita disponibile tramite Google AI Studio. Ottieni la chiave su aistudio.google.com.",
        hoverLabel: "💡 Tooltip di traduzione al passaggio del mouse",
        hoverHint: "Mostra automaticamente un'anteprima di traduzione quando passi il mouse sopra il codice selezionato.",
        configured: "✅ Configurato",
        notConfigured: "Non configurato",
        done: "Fatto",
        save: "Salva",
        delete: "Elimina",
        selectSourceLang: "Seleziona lingua di partenza",
        selectTargetLang: "Seleziona lingua di destinazione",
        searchLang: "Cerca lingue...",
        noMatchLang: "Nessuna lingua corrispondente trovata"
      },
      pt: {
        brandTitle: "Google Tradutor (IDE Edition)",
        engineLabel: "Motor:",
        btnSettings: "Configurações",
        chipAuto: "Detectar idioma",
        chipEn: "Inglês",
        chipJa: "Japonês",
        chipVi: "Vietnamita",
        optMore: "▼ Mais",
        sourcePlaceholder: "Digite ou cole o texto para traduzir...",
        sourcePlaceholderFree: "Digite ou cole o texto para traduzir... (Máx. 500 caracteres)",
        targetPlaceholder: "A tradução aparecerá aqui em tempo real...",
        btnClear: "✕ Limpar",
        btnCopy: "📋 Copiar",
        btnInsert: "📝 Inserir no editor",
        translating: "Traduzindo...",
        modalTitle: "⚙️ Configurações & Preferências",
        panelLanguageLabel: "🌐 Idioma da interface",
        panelLanguageHint: "Altera o idioma de exibição deste painel de tradução.",
        defaultSourceLabel: "🔤 Idioma de origem padrão",
        defaultTargetLabel: "🎯 Idioma de destino padrão",
        deeplHint: "Plano gratuito disponível (500.000 caracteres/mês grátis). Obtenha sua chave em deepl.com/pro-api (termina com :fx).",
        geminiHint: "Cota gratuita disponível no Google AI Studio. Obtenha sua chave em aistudio.google.com.",
        hoverLabel: "💡 Dica de tradução ao passar o cursor",
        hoverHint: "Exibe automaticamente uma prévia da tradução ao passar o mouse sobre o código selecionado.",
        configured: "✅ Configurado",
        notConfigured: "Não configurado",
        done: "Concluído",
        save: "Salvar",
        delete: "Excluir",
        selectSourceLang: "Selecionar idioma de origem",
        selectTargetLang: "Selecionar idioma de destino",
        searchLang: "Pesquisar idiomas...",
        noMatchLang: "Nenhum idioma correspondente encontrado"
      },
      ru: {
        brandTitle: "Google Переводчик (IDE Edition)",
        engineLabel: "Движок:",
        btnSettings: "Настройки",
        chipAuto: "Определить язык",
        chipEn: "Английский",
        chipJa: "Японский",
        chipVi: "Вьетнамский",
        optMore: "▼ Еще",
        sourcePlaceholder: "Введите или вставьте текст для перевода...",
        sourcePlaceholderFree: "Введите или вставьте текст для перевода... (макс. 500 символов)",
        targetPlaceholder: "Перевод появится здесь в реальном времени...",
        btnClear: "✕ Очистить",
        btnCopy: "📋 Копировать",
        btnInsert: "📝 Вставить в редактор",
        translating: "Перевод...",
        modalTitle: "⚙️ Настройки и конфигурация",
        panelLanguageLabel: "🌐 Язык интерфейса панели",
        panelLanguageHint: "Изменяет язык интерфейса этой панели перевода.",
        defaultSourceLabel: "🔤 Исходный язык по умолчанию",
        defaultTargetLabel: "🎯 Целевой язык по умолчанию",
        deeplHint: "Доступен бесплатный план (500 000 симв./мес. бесплатно). Получите ключ на deepl.com/pro-api (оканчивается на :fx).",
        geminiHint: "Бесплатный лимит в Google AI Studio. Создайте ключ на aistudio.google.com нажав Get API key.",
        hoverLabel: "💡 Всплывающая подсказка перевода при наведении",
        hoverHint: "Автоматически показывать подсказку с переводом при наведении на выделенный код.",
        configured: "✅ Настроено",
        notConfigured: "Не настроено",
        done: "Готово",
        save: "Сохранить",
        delete: "Удалить",
        selectSourceLang: "Выберите исходный язык",
        selectTargetLang: "Выберите язык перевода",
        searchLang: "Поиск языков...",
        noMatchLang: "Подходящих языков не найдено"
      }
    };

    const ALL_LANGS = ${JSON.stringify(ALL_LANGUAGES)};

    // DOM Elements Cache
    const sourceText = document.getElementById('sourceText');
    const targetText = document.getElementById('targetText');
    const charCount = document.getElementById('charCount');
    const btnSwap = document.getElementById('btnSwap');
    const btnClearSource = document.getElementById('btnClearSource');
    const btnCopy = document.getElementById('btnCopy');
    const btnInsert = document.getElementById('btnInsert');
    const btnSourceSpeech = document.getElementById('btnSourceSpeech');
    const btnTargetSpeech = document.getElementById('btnTargetSpeech');
    const providerSelect = document.getElementById('providerSelect');
    const chipSourceSelected = document.getElementById('chipSourceSelected');
    const chipTargetSelected = document.getElementById('chipTargetSelected');
    const btnSourceMore = document.getElementById('btnSourceMore');
    const btnTargetMore = document.getElementById('btnTargetMore');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorBanner = document.getElementById('errorBanner');

    // Custom Provider Elements
    const providerDropdownWrapper = document.getElementById('providerDropdownWrapper');
    const providerCurrentBtn = document.getElementById('providerCurrentBtn');
    const providerOptionsMenu = document.getElementById('providerOptionsMenu');
    const providerCurrentIcon = document.getElementById('providerCurrentIcon');
    const providerCurrentLabel = document.getElementById('providerCurrentLabel');
    const providerOptionItems = document.querySelectorAll('.provider-option-item');

    const providerIcons = {
      'google-free': '${options.googleIconUri || ''}',
      'deepl': '${options.deeplIconUri || ''}',
      'gemini': '${options.geminiIconUri || ''}'
    };

    const providerLabels = {
      'google-free': 'Google (Free / Online)',
      'deepl': 'DeepL API',
      'gemini': 'Google Gemini AI'
    };

    // Language Picker Modal elements
    const langPickerModal = document.getElementById('langPickerModal');
    const langPickerTitle = document.getElementById('langPickerTitle');
    const btnCloseLangPicker = document.getElementById('btnCloseLangPicker');
    const langSearchInput = document.getElementById('langSearchInput');
    const btnClearLangSearch = document.getElementById('btnClearLangSearch');
    const langGridContainer = document.getElementById('langGridContainer');

    // Settings Modal elements
    const btnCloseModal = document.getElementById('btnCloseModal');
    const btnDoneModal = document.getElementById('btnDoneModal');
    const settingsModal = document.getElementById('settingsModal');
    const panelLangSelect = document.getElementById('panelLangSelect');
    const defaultSourceSelect = document.getElementById('defaultSourceSelect');
    const defaultTargetSelect = document.getElementById('defaultTargetSelect');
    const deeplInput = document.getElementById('deeplInput');
    const btnSaveDeepl = document.getElementById('btnSaveDeepl');
    const btnDeleteDeepl = document.getElementById('btnDeleteDeepl');
    const deeplBadge = document.getElementById('deeplBadge');
    const geminiInput = document.getElementById('geminiInput');
    const btnSaveGemini = document.getElementById('btnSaveGemini');
    const btnDeleteGemini = document.getElementById('btnDeleteGemini');
    const geminiBadge = document.getElementById('geminiBadge');
    const hoverCheckbox = document.getElementById('hoverCheckbox');

    function getShortLanguageName(code) {
      if (code === 'auto') {
        const t = I18N[currentPanelLang] || I18N.en;
        return t.chipAuto || 'Auto';
      }
      try {
        const dn = new Intl.DisplayNames([currentPanelLang, 'en'], { type: 'language' });
        const name = dn.of(code);
        if (name) return name;
      } catch (e) {
        // fallback
      }
      const item = ALL_LANGS.find(l => l.code === code);
      return item ? item.name : code;
    }

    function updateDropdownOptions(lang) {
      let dnUser = null;
      let dnEn = null;
      try {
        dnUser = new Intl.DisplayNames([lang, 'en'], { type: 'language' });
        dnEn = new Intl.DisplayNames(['en'], { type: 'language' });
      } catch (e) {
        // fallback
      }

      const buildOptions = () => {
        return ALL_LANGS.map(item => {
          let label = item.name.split(' (')[0];
          if (dnUser) {
            const loc = dnUser.of(item.code);
            if (loc && loc.toLowerCase() !== item.code.toLowerCase()) {
              label = loc;
            } else if (dnEn) {
              const en = dnEn.of(item.code);
              if (en && en.toLowerCase() !== item.code.toLowerCase()) {
                label = en;
              }
            }
          }
          return '<option value="' + item.code + '">' + label + '</option>';
        }).join('\\n');
      };

      const optionsHtml = buildOptions();
      const defSrc = document.getElementById('defaultSourceSelect');
      const defTgt = document.getElementById('defaultTargetSelect');

      if (defSrc) {
        const curDefSrc = defSrc.value;
        const autoLabel = (I18N[lang] || I18N.en).chipAuto || 'Auto Detect';
        defSrc.innerHTML = '<option value="auto">' + autoLabel + '</option>' + optionsHtml;
        if (curDefSrc) defSrc.value = curDefSrc;
      }

      if (defTgt) {
        const curDefTgt = defTgt.value;
        defTgt.innerHTML = optionsHtml;
        if (curDefTgt) defTgt.value = curDefTgt;
      }

      if (typeof renderLanguageGrid === 'function' && typeof langPickerModal !== 'undefined' && langPickerModal && langPickerModal.classList.contains('active')) {
        renderLanguageGrid(typeof langSearchInput !== 'undefined' && langSearchInput ? langSearchInput.value : '');
      }
    }

    function applyI18n(lang) {
      const t = I18N[lang] || I18N.en;
      const setSafeText = (id, text) => {
        const el = document.getElementById(id);
        if (el && text !== undefined) el.textContent = text;
      };

      setSafeText('txtBrandTitle', t.brandTitle);
      setSafeText('txtEngineLabel', t.engineLabel);
      setSafeText('chipSourceAuto', t.chipAuto);
      setSafeText('chipSourceEn', t.chipEn);
      setSafeText('chipSourceJa', t.chipJa);
      setSafeText('chipSourceVi', t.chipVi);

      setSafeText('chipTargetVi', t.chipVi);
      setSafeText('chipTargetEn', t.chipEn);
      setSafeText('chipTargetJa', t.chipJa);

      const sourceEl = document.getElementById('sourceText');
      if (sourceEl) {
        const isFree = providerSelect ? providerSelect.value === 'google-free' : true;
        sourceEl.placeholder = isFree && t.sourcePlaceholderFree ? t.sourcePlaceholderFree : t.sourcePlaceholder;
      }
      const targetEl = document.getElementById('targetText');
      if (targetEl && targetEl.classList.contains('placeholder')) {
        targetEl.textContent = t.targetPlaceholder;
      }
      setSafeText('txtBtnClear', t.btnClear);
      setSafeText('txtBtnCopy', t.btnCopy);
      setSafeText('txtBtnInsert', t.btnInsert);
      setSafeText('txtTranslating', t.translating);

      setSafeText('txtModalTitle', t.modalTitle);
      setSafeText('txtPanelLanguageLabel', t.panelLanguageLabel);
      setSafeText('txtPanelLanguageHint', t.panelLanguageHint);
      setSafeText('txtDefaultSourceLabel', t.defaultSourceLabel);
      setSafeText('txtDefaultTargetLabel', t.defaultTargetLabel);
      setSafeText('txtDeeplHint', t.deeplHint);
      setSafeText('txtGeminiHint', t.geminiHint);
      setSafeText('txtHoverLabel', t.hoverLabel);
      setSafeText('txtHoverHint', t.hoverHint);
      setSafeText('btnDoneModal', t.done);
      setSafeText('btnSaveDeepl', t.save);
      setSafeText('btnDeleteDeepl', t.delete);
      setSafeText('btnSaveGemini', t.save);
      setSafeText('btnDeleteGemini', t.delete);

      const searchInputEl = document.getElementById('langSearchInput');
      if (searchInputEl) {
        searchInputEl.placeholder = t.searchLang || 'Search languages...';
      }
      if (typeof activePickerType !== 'undefined' && activePickerType) {
        setSafeText('langPickerTitle', activePickerType === 'source' ? t.selectSourceLang : t.selectTargetLang);
      }

      updateDropdownOptions(lang);
    }

    // Settings Modal handlers
    btnCloseModal.addEventListener('click', () => {
      settingsModal.classList.remove('active');
    });

    btnDoneModal.addEventListener('click', () => {
      settingsModal.classList.remove('active');
    });

    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) {
        settingsModal.classList.remove('active');
      }
    });

    panelLangSelect.addEventListener('change', () => {
      currentPanelLang = panelLangSelect.value;
      applyI18n(currentPanelLang);
      updateLangUi(currentSourceLang, true);
      updateLangUi(currentTargetLang, false);
      vscode.postMessage({ command: 'updateConfig', key: 'panelLanguage', value: currentPanelLang });
    });

    defaultSourceSelect.addEventListener('change', () => {
      vscode.postMessage({ command: 'updateConfig', key: 'sourceLanguage', value: defaultSourceSelect.value });
      currentSourceLang = defaultSourceSelect.value;
      updateLangUi(currentSourceLang, true);
      triggerTranslation(true);
    });

    defaultTargetSelect.addEventListener('change', () => {
      vscode.postMessage({ command: 'updateConfig', key: 'targetLanguage', value: defaultTargetSelect.value });
      currentTargetLang = defaultTargetSelect.value;
      updateLangUi(currentTargetLang, false);
      triggerTranslation(true);
    });

    btnSaveDeepl.addEventListener('click', () => {
      const key = deeplInput.value.trim();
      if (!key) return;
      vscode.postMessage({ command: 'saveApiKey', provider: 'deepl', key: key });
      deeplInput.value = '';
    });

    btnDeleteDeepl.addEventListener('click', () => {
      vscode.postMessage({ command: 'deleteApiKey', provider: 'deepl' });
    });

    btnSaveGemini.addEventListener('click', () => {
      const key = geminiInput.value.trim();
      if (!key) return;
      vscode.postMessage({ command: 'saveApiKey', provider: 'gemini', key: key });
      geminiInput.value = '';
    });

    btnDeleteGemini.addEventListener('click', () => {
      vscode.postMessage({ command: 'deleteApiKey', provider: 'gemini' });
    });

    hoverCheckbox.addEventListener('change', () => {
      vscode.postMessage({ command: 'updateConfig', key: 'hoverEnabled', value: hoverCheckbox.checked });
    });

    function updateLangUi(lang, isSource) {
      const dynamicChip = isSource ? chipSourceSelected : chipTargetSelected;
      const fixedSelector = isSource
        ? '.lang-chip[data-source]:not([data-source-dynamic])'
        : '.lang-chip[data-target]:not([data-target-dynamic])';
      const fixedChips = document.querySelectorAll(fixedSelector);

      let matchedFixed = false;
      fixedChips.forEach(b => {
        const chipLang = b.getAttribute(isSource ? 'data-source' : 'data-target');
        if (chipLang === lang) {
          b.classList.add('active');
          matchedFixed = true;
        } else {
          b.classList.remove('active');
        }
      });

      if (matchedFixed) {
        dynamicChip.style.display = 'none';
        dynamicChip.classList.remove('active');
        dynamicChip.removeAttribute(isSource ? 'data-source' : 'data-target');
      } else {
        const label = getShortLanguageName(lang);
        dynamicChip.textContent = label;
        dynamicChip.setAttribute(isSource ? 'data-source' : 'data-target', lang);
        dynamicChip.style.display = 'inline-flex';
        dynamicChip.classList.add('active');
      }
    }

    // Initialize chips
    function setupChips(selector, isSource) {
      document.querySelectorAll(selector).forEach(btn => {
        btn.addEventListener('click', () => {
          const lang = btn.getAttribute(isSource ? 'data-source' : 'data-target');
          if (!lang) return;
          if (isSource) {
            currentSourceLang = lang;
            updateLangUi(lang, true);
          } else {
            currentTargetLang = lang;
            updateLangUi(lang, false);
          }
          triggerTranslation(true);
        });
      });
    }

    setupChips('.lang-chip[data-source]', true);
    setupChips('.lang-chip[data-target]', false);

    // Language Picker Logic
    function getDisplayLanguageList(langCode) {
      let dnUser = null;
      let dnEn = null;
      try {
        dnUser = new Intl.DisplayNames([langCode, 'en'], { type: 'language' });
        dnEn = new Intl.DisplayNames(['en'], { type: 'language' });
      } catch (e) {
        // fallback
      }

      return ALL_LANGS.map(item => {
        let label = item.name.split(' (')[0];
        let enLabel = label;
        if (dnEn) {
          const en = dnEn.of(item.code);
          if (en && en.toLowerCase() !== item.code.toLowerCase()) {
            enLabel = en;
          }
        }
        if (dnUser) {
          const loc = dnUser.of(item.code);
          if (loc && loc.toLowerCase() !== item.code.toLowerCase()) {
            label = loc;
          } else if (enLabel) {
            label = enLabel;
          }
        }
        return {
          code: item.code,
          name: label,
          rawName: item.name,
          enName: enLabel
        };
      });
    }

    function renderLanguageGrid(query = '') {
      if (!langGridContainer) return;
      langGridContainer.innerHTML = '';

      const t = I18N[currentPanelLang] || I18N.en;
      const isSource = activePickerType === 'source';
      const currentLang = isSource ? currentSourceLang : currentTargetLang;
      const list = getDisplayLanguageList(currentPanelLang);

      const itemsToRender = [];
      if (isSource) {
        itemsToRender.push({
          code: 'auto',
          name: t.chipAuto || 'Detect Language',
          rawName: 'Auto Detect',
          enName: 'Detect Language'
        });
      }
      itemsToRender.push(...list);

      const q = query.trim().toLowerCase();
      const filtered = q
        ? itemsToRender.filter(item =>
            item.name.toLowerCase().includes(q) ||
            item.code.toLowerCase().includes(q) ||
            item.rawName.toLowerCase().includes(q) ||
            (item.enName && item.enName.toLowerCase().includes(q))
          )
        : itemsToRender;

      if (filtered.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'lang-no-match';
        emptyDiv.textContent = t.noMatchLang || 'No matching languages found';
        langGridContainer.appendChild(emptyDiv);
        return;
      }

      filtered.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'lang-item-btn';
        btn.type = 'button';
        if (item.code === currentLang) {
          btn.classList.add('selected');
        }

        const nameSpan = document.createElement('span');
        nameSpan.className = 'lang-item-name';
        nameSpan.textContent = item.name;
        btn.appendChild(nameSpan);

        const checkSpan = document.createElement('span');
        checkSpan.className = 'lang-item-check';
        checkSpan.textContent = '✓';
        btn.appendChild(checkSpan);

        btn.addEventListener('click', () => {
          selectPickerLanguage(item.code);
        });

        langGridContainer.appendChild(btn);
      });
    }

    function openLanguagePicker(type) {
      activePickerType = type;
      const t = I18N[currentPanelLang] || I18N.en;
      if (langPickerTitle) {
        langPickerTitle.textContent = type === 'source'
          ? (t.selectSourceLang || 'Select Source Language')
          : (t.selectTargetLang || 'Select Target Language');
      }
      if (langSearchInput) {
        langSearchInput.value = '';
        langSearchInput.placeholder = t.searchLang || 'Search languages...';
      }
      if (btnClearLangSearch) {
        btnClearLangSearch.style.display = 'none';
      }
      renderLanguageGrid('');
      if (langPickerModal) {
        langPickerModal.classList.add('active');
      }
      setTimeout(() => {
        if (langSearchInput) langSearchInput.focus();
      }, 50);
    }

    function closeLanguagePicker() {
      if (langPickerModal) {
        langPickerModal.classList.remove('active');
      }
      activePickerType = null;
    }

    function selectPickerLanguage(code) {
      if (activePickerType === 'source') {
        currentSourceLang = code;
        updateLangUi(currentSourceLang, true);
        triggerTranslation(true);
      } else if (activePickerType === 'target') {
        currentTargetLang = code;
        updateLangUi(currentTargetLang, false);
        triggerTranslation(true);
      }
      closeLanguagePicker();
    }

    if (btnSourceMore) {
      btnSourceMore.addEventListener('click', () => openLanguagePicker('source'));
    }
    if (btnTargetMore) {
      btnTargetMore.addEventListener('click', () => openLanguagePicker('target'));
    }
    if (btnCloseLangPicker) {
      btnCloseLangPicker.addEventListener('click', closeLanguagePicker);
    }
    if (langPickerModal) {
      langPickerModal.addEventListener('click', (e) => {
        if (e.target === langPickerModal) closeLanguagePicker();
      });
    }
    if (btnClearLangSearch && langSearchInput) {
      btnClearLangSearch.addEventListener('click', () => {
        langSearchInput.value = '';
        btnClearLangSearch.style.display = 'none';
        renderLanguageGrid('');
        langSearchInput.focus();
      });
    }
    if (langSearchInput) {
      langSearchInput.addEventListener('input', () => {
        if (btnClearLangSearch) {
          btnClearLangSearch.style.display = langSearchInput.value ? 'flex' : 'none';
        }
        renderLanguageGrid(langSearchInput.value);
      });
      langSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const firstBtn = langGridContainer ? langGridContainer.querySelector('.lang-item-btn') : null;
          if (firstBtn) {
            firstBtn.click();
            e.preventDefault();
          }
        }
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (langPickerModal && langPickerModal.classList.contains('active')) {
          closeLanguagePicker();
          e.preventDefault();
        } else if (settingsModal && settingsModal.classList.contains('active')) {
          settingsModal.classList.remove('active');
          e.preventDefault();
        }
      }
    });

    // Realtime typing & Debounce (350ms)
    sourceText.addEventListener('input', () => {
      updateCharCount();
      if (!sourceText.value.trim()) {
        const t = I18N[currentPanelLang] || I18N.en;
        targetText.textContent = t.targetPlaceholder;
        targetText.classList.add('placeholder');
        lastTranslatedResult = '';
        loadingIndicator.style.display = 'none';
        return;
      }
      triggerTranslation(false);
    });

    function triggerTranslation(immediate = false) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      const delay = immediate ? 0 : 350;
      debounceTimer = setTimeout(() => {
        const text = sourceText.value.trim();
        if (!text) return;

        loadingIndicator.style.display = 'flex';
        errorBanner.style.display = 'none';

        vscode.postMessage({
          command: 'translate',
          text: text,
          from: currentSourceLang,
          to: currentTargetLang,
          provider: providerSelect.value,
        });
      }, delay);
    }

    // Swap Languages
    btnSwap.addEventListener('click', () => {
      if (currentSourceLang === 'auto') {
        currentSourceLang = 'en';
      }
      const tempLang = currentSourceLang;
      currentSourceLang = currentTargetLang;
      currentTargetLang = tempLang;

      // Update chips & dropdowns
      updateLangUi(currentSourceLang, true);
      updateLangUi(currentTargetLang, false);

      // Also swap text if target has result
      if (lastTranslatedResult) {
        sourceText.value = lastTranslatedResult;
        updateCharCount();
      }

      triggerTranslation(true);
    });

    // Initialize initial language UI states
    updateLangUi(currentSourceLang, true);
    updateLangUi(currentTargetLang, false);

    btnClearSource.addEventListener('click', () => {
      const t = I18N[currentPanelLang] || I18N.en;
      sourceText.value = '';
      updateCharCount();
      targetText.textContent = t.targetPlaceholder;
      targetText.classList.add('placeholder');
      lastTranslatedResult = '';
      errorBanner.style.display = 'none';
      sourceText.focus();
    });

    btnCopy.addEventListener('click', () => {
      if (lastTranslatedResult) {
        vscode.postMessage({ command: 'copy', text: lastTranslatedResult });
      }
    });

    btnInsert.addEventListener('click', () => {
      if (lastTranslatedResult) {
        vscode.postMessage({ command: 'insertToEditor', text: lastTranslatedResult });
      }
    });

    // Web Speech API
    btnSourceSpeech.addEventListener('click', () => {
      if ('speechSynthesis' in window && sourceText.value) {
        const u = new SpeechSynthesisUtterance(sourceText.value);
        if (currentSourceLang !== 'auto') u.lang = currentSourceLang;
        window.speechSynthesis.speak(u);
      }
    });

    btnTargetSpeech.addEventListener('click', () => {
      if ('speechSynthesis' in window && lastTranslatedResult) {
        const u = new SpeechSynthesisUtterance(lastTranslatedResult);
        u.lang = currentTargetLang;
        window.speechSynthesis.speak(u);
      }
    });

    function getMaxCharLimit() {
      const val = (providerSelect && providerSelect.value) ? providerSelect.value : currentProvider;
      return val === 'google-free' ? 500 : 5000;
    }

    function updateCharCount() {
      if (!sourceText || !charCount) return;
      const maxLimit = getMaxCharLimit();
      const val = sourceText.value || '';
      const len = val.length;
      charCount.textContent = len.toLocaleString() + ' / ' + maxLimit.toLocaleString();
      if (len > maxLimit) {
        charCount.classList.add('exceeded');
      } else {
        charCount.classList.remove('exceeded');
      }
    }

    function updateProviderInputConstraints(value) {
      if (!sourceText) return;
      currentProvider = value || currentProvider;
      const isFree = currentProvider === 'google-free';
      sourceText.maxLength = isFree ? 500 : 5000;
      const t = I18N[currentPanelLang] || I18N.en;
      sourceText.placeholder = isFree && t.sourcePlaceholderFree ? t.sourcePlaceholderFree : t.sourcePlaceholder;

      if (isFree && sourceText.value && sourceText.value.length > 500) {
        sourceText.value = sourceText.value.substring(0, 500);
      }
      updateCharCount();
    }

    function updateCustomProviderUi(value) {
      if (providerCurrentIcon && providerIcons[value]) {
        providerCurrentIcon.src = providerIcons[value];
      }
      if (providerCurrentLabel && providerLabels[value]) {
        providerCurrentLabel.textContent = providerLabels[value];
      }
      providerOptionItems.forEach(item => {
        if (item.getAttribute('data-value') === value) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      });
      updateProviderInputConstraints(value);
    }

    if (providerCurrentBtn && providerOptionsMenu) {
      providerCurrentBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        providerOptionsMenu.classList.toggle('active');
      });

      providerOptionItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = item.getAttribute('data-value');
          if (val) {
            providerSelect.value = val;
            updateCustomProviderUi(val);
            providerOptionsMenu.classList.remove('active');
            vscode.postMessage({ command: 'updateConfig', key: 'provider', value: val });
            triggerTranslation(true);
          }
        });
      });

      document.addEventListener('click', (e) => {
        if (providerDropdownWrapper && !providerDropdownWrapper.contains(e.target)) {
          providerOptionsMenu.classList.remove('active');
        }
      });
    }

    providerSelect.addEventListener('change', () => {
      updateCustomProviderUi(providerSelect.value);
      vscode.postMessage({ command: 'updateConfig', key: 'provider', value: providerSelect.value });
      triggerTranslation(true);
    });

    // Message handler from Extension Host
    window.addEventListener('message', (event) => {
      const msg = event.data;
      loadingIndicator.style.display = 'none';

      if (msg.command === 'openSettings') {
        vscode.postMessage({ command: 'getSettings' });
        settingsModal.classList.add('active');
        return;
      }

      if (msg.command === 'setInitialText' && msg.text) {
        sourceText.value = msg.text;
        updateCharCount();
        triggerTranslation(true);
        return;
      }

      if (msg.command === 'settingsState') {
        const t = I18N[currentPanelLang] || I18N.en;
        if (msg.hasDeepl) {
          deeplBadge.textContent = t.configured;
          deeplBadge.classList.add('configured');
        } else {
          deeplBadge.textContent = t.notConfigured;
          deeplBadge.classList.remove('configured');
        }

        if (msg.hasGemini) {
          geminiBadge.textContent = t.configured;
          geminiBadge.classList.add('configured');
        } else {
          geminiBadge.textContent = t.notConfigured;
          geminiBadge.classList.remove('configured');
        }

        hoverCheckbox.checked = !!msg.hoverEnabled;

        if (msg.provider) {
          providerSelect.value = msg.provider;
          updateCustomProviderUi(msg.provider);
        }

        if (msg.panelLanguage) {
          panelLangSelect.value = msg.panelLanguage;
          currentPanelLang = msg.panelLanguage;
          applyI18n(currentPanelLang);
        }

        if (msg.sourceLanguage) {
          defaultSourceSelect.value = msg.sourceLanguage;
        }

        if (msg.targetLanguage) {
          defaultTargetSelect.value = msg.targetLanguage;
        }
        return;
      }

      if (msg.command === 'result') {
        lastTranslatedResult = msg.text;
        targetText.textContent = msg.text;
        targetText.classList.remove('placeholder');
        errorBanner.style.display = 'none';

        if (msg.detectedSourceLanguage && currentSourceLang === 'auto') {
          const autoChip = document.getElementById('chipSourceAuto');
          if (autoChip) {
            autoChip.textContent = (I18N[currentPanelLang]?.chipAuto || 'Detect Language') + ' (' + msg.detectedSourceLanguage + ')';
          }
        }
      } else if (msg.command === 'error') {
        errorBanner.textContent = msg.message;
        errorBanner.style.display = 'block';
      }
    });

    // Initial Setup
    try {
      if (providerSelect && !providerSelect.value) {
        providerSelect.value = currentProvider;
      }
      applyI18n(currentPanelLang);
      updateLangUi(currentSourceLang, true);
      updateLangUi(currentTargetLang, false);
      updateCustomProviderUi(currentProvider);
      vscode.postMessage({ command: 'getSettings' });
    } catch (err) {
      console.error('Error during initial UI setup:', err);
    }
  </script>
</body>
</html>`;
}
