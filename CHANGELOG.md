# Change Log

All notable changes to the "vscode-translate" extension will be documented in this file.

## [0.1.0] - 2026-09-18

### Added
- Multi-engine translation support:
  - Free Online Translation (Google Translate + MyMemory fallback) — Works out-of-the-box without an API key.
  - DeepL API (Free / Pro Auth Key).
  - Google Gemini AI (AI context-aware translation).
- In-Editor Actions:
  - Translate Selected Text (`Translate: Translate Selected Text` / `Cmd+Alt+T` or `Ctrl+Alt+T`)
  - Inline Replace Selection (`Translate: Replace Selected Text with Translation` / `Cmd+Alt+R` or `Ctrl+Alt+R`)
  - Insert Below Selection (`Translate: Insert Translation Below Selection`)
- Interactive Sidebar Webview panel for continuous dual-language translation.
- Optional Hover Translation tooltip on selection.
- Secure API key management via VS Code SecretStorage (`setApiKey` / `clearApiKey`).
