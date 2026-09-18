---
name: update-version
description: このリポジトリ（AI Multi-Translate）のバージョンを更新し、package.json、README.md、CHANGELOG.md を整合させ、新しい .vsix パッケージをビルド・Antigravity IDEに再インストールする。「バージョンを更新して」「新しいVSIXを作成して」「バージョンを上げて」と頼まれたときに使う。
argument-hint: "[patch|minor|major|x.y.z] [変更概要]"
---

# `/update-version [patch|minor|major|x.y.z] [変更概要]`

AI Multi-Translate 拡張機能のバージョン番号を更新し、関連ファイル（`package.json`, `README.md`, `CHANGELOG.md`）の整合性を保った上で、新しい `.vsix` パッケージをビルドし、Antigravity IDE へ即座に反映（再インストール）する。

## 前提と方針

- パッケージマネージャーは **pnpm** を使用する。
- バージョン規則は セマンティックバージョニング（SemVer: `MAJOR.MINOR.PATCH`）に従う。
- ビルド前に必ず Lint・テスト・コンパイルの全検証を行い、エラーゼロを確認してからパッケージングする。
- ユーザーの明示的な指示がない限り、Git コミットおよび push は勝手に行わない（完了後に案内する）。

---

## ワークフロー

### 1. 新しいバージョン番号を決定する

1. 現在のバージョンを `package.json` から取得:
   ```bash
   node -p "require('./package.json').version"
   ```
2. 引数から新しいバージョンを解決:
   - `patch`（デフォルト）: 例 `0.1.3` -> `0.1.4`
   - `minor`: 例 `0.1.3` -> `0.2.0`
   - `major`: 例 `0.1.3` -> `1.0.0`
   - 具体的な番号（例: `0.1.4`）が指定された場合はそれを直接採用

### 2. 各ファイルのバージョン表記を更新

1. **`package.json`**:
   `version` フィールドを新しいバージョンに更新。
   ```bash
   npm pkg set version="<NEW_VERSION>"
   ```
2. **`README.md`**:
   Marketplace バッジのバージョンを置換:
   ```markdown
   <!-- 置換前 -->
   <img src="https://img.shields.io/badge/marketplace-v<OLD_VERSION>-blue.svg" alt="Marketplace" />
   <!-- 置換後 -->
   <img src="https://img.shields.io/badge/marketplace-v<NEW_VERSION>-blue.svg" alt="Marketplace" />
   ```
3. **`CHANGELOG.md`**:
   現在の最上部リリース見出しの直前に新バージョンセクションを追記:
   ```markdown
   ## [<NEW_VERSION>] - <YYYY-MM-DD>

   ### Changed
   - <引数で指定された変更概要、または直近の作業内容に基づく要約>
   ```

### 3. 品質検証を実行する

以下の各コマンドを **1つずつ順に実行** し、全パスを確認する（エラーが出た場合は修正し、パッケージングへ進まない）。

```bash
pnpm run lint
pnpm test
pnpm run compile
```

### 4. VSIX パッケージをビルドする

```bash
pnpm run package:vsix
```

ビルド完了後、ワークスペース直下に生成された `.vsix` ファイル（`ai-multi-translate-<NEW_VERSION>.vsix`）の存在とファイルサイズを確認する。

### 5. Antigravity IDE への即時反映

生成された新しい VSIX を IDE に強制再インストールして検証可能な状態にする:

```bash
"/Applications/Antigravity IDE.app/Contents/Resources/app/bin/antigravity-ide" --install-extension "ai-multi-translate-<NEW_VERSION>.vsix" --force
```

### 6. 旧バージョンの VSIX 整理（任意）

直前の古い `.vsix` ファイル（例: `ai-multi-translate-<OLD_VERSION>.vsix`）が存在する場合、不要であれば削除する。

---

## 完了報告

以下の項目を箇条書きで報告する:
- **バージョン更新**: `<OLD_VERSION>` → `<NEW_VERSION>`
- **更新ファイル**: `package.json`, `README.md`, `CHANGELOG.md`
- **生成パッケージ**: `ai-multi-translate-<NEW_VERSION>.vsix`（ファイルサイズ）
- **IDE 反映**: 再インストール完了の旨
- **Git 状態**: 未コミットの変更状況と、コミット/プッシュ（`/push-main`）の案内
