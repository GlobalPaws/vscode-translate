# Webview 実装およびスクリプト安全性ルール

VS Code 拡張機能の Webview（`translationHtml.ts` 等）の開発・修正を行う際は、以下のルールを厳格に遵守すること。

---

## 1. Webview インラインスクリプトの実行時安全性

Webview 内の `<script>` はインライン文字列として展開されるため、TypeScript のコンパイルや ESLint による静的解析では実行時エラー（TDZ、未定義参照、DOM取得失敗等）を検知できない。このため、以下の設計パターンを徹底する。

### 1.1 変数・DOM要素の最上部集約宣言（TDZ の根絶）
- スクリプト内で利用するすべてのグローバル状態変数（`currentPanelLang`, `activePickerType` 等）は、**スクリプトの最上部**で必ず宣言する。
- 関数内や初期化呼び出しより後に `let` / `const` で変数を宣言してはならない（JavaScript の Temporal Dead Zone により `ReferenceError` が発生し、以降の全イベントリスナー登録が破綻する）。
- DOM 要素の取得（`getElementById`, `querySelectorAll` 等）も、スクリプト上部で一括してキャッシュする。

### 1.2 スクリプト記述順序の標準化
Webview スクリプトは必ず以下の構造順序で記述すること:
1. **状態変数宣言**（`vscode = acquireVsCodeApi()`, `currentPanelLang`, 状態フラグ等）
2. **定数・辞書データ**（`I18N`, `ALL_LANGS`, アイコンマップ等）
3. **DOM 要素キャッシュ**（ボタン、モーダル、コンテナ要素等）
4. **純粋関数・ヘルパー関数定義**（`getShortLanguageName`, `updateDropdownOptions` 等）
5. **UI操作・更新関数定義**（`applyI18n`, `renderLanguageGrid`, `updateCustomProviderUi` 等）
6. **イベントリスナー登録**（クリック、入力、キーボード、メッセージ受信等）
7. **初期化実行ブロック**（末尾で `applyI18n` や初期状態要求を `try ... catch` で保護して実行）

---

## 2. UI 要素の勝手な追加禁止とネイティブUIとの重複防止

- **勝手なUI要素・ボタンの追加禁止**: ユーザーからの明示的な指示がない限り、推測でWebview内にボタン（設定ボタン⚙、ショートカットボタン等）やUI要素を追加してはならない。
- **VS Code ネイティブUIとの重複防止**: 設定画面（`settingsModal`）のオープン等は、VS Code のネイティブタイトルバーメニュー（`package.json` の `menus.view/title` に定義された `vscode-translate.openSettings`（`$(gear)` アイコン））から実行される設計となっている。Webview 内部（エンジンSelectboxの横やヘッダー部など）に二重で設定ボタンを配置してはならない。
- **不具合調査時の判断**: 「設定ボタンをクリックしても開かない」といった課題が発生した際、Webview内にボタンを新設するのではなく、VS Code ネイティブタイトルバーのギアアイコンから送信されるメッセージ（`msg.command === 'openSettings'`）のハンドラや、既存のイベントフローを調査・修正すること。
- **UIレイアウト変更の事前合意**: 既存のUIレイアウトやボタン配置の変更・追加が必要と判断される場合でも、必ず事前にユーザーへ提案・確認を行い、独断で実装しないこと。

---

## 3. Webview 変更時の自動テスト義務付け

- `translationHtml.ts` や Webview HTML/CSS/JS を修正した際は、必ず `src/__tests__/translationHtml.test.ts` を実行・追従させること。
- テスト内でモック DOM 環境を構築し、生成されたスクリプトが**一切の実行時エラーなく完走すること**、および**主要ボタン（プロバイダー切替、設定モーダル、言語ピッカー等）のクリックイベントが正常に機能すること**を検証すること。
- `pnpm test` がパスしない限り、タスク完了およびパッケージング・コミットを行ってはならない。
