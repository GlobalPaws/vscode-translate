# Change Log

All notable changes to the "ai-multi-translate" extension will be documented in this file.

## [0.1.4] - 2026-09-18

### Changed
- Enhanced API key persistence across extension updates with automatic dual-storage migration (SecretStorage + globalState fallback).
- Streamlined settings button access in the panel title bar.

## [0.1.3] - 2026-09-18

### Changed
- Changed extension package name to `ai-multi-translate` for Marketplace uniqueness.
- Panel header now displays clean single title `AI Multi-Translate Panel`.
- Moved settings gear icon to the panel title bar (`view/title`).
- Fixed engine selection label wrapping on narrow sidebar views.
- Removed redundant language suffix `(English)` in dropdown lists.
- Added fallback for unlocalized language codes (e.g., `kri` -> `Krio`).

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
