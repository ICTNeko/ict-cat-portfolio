# ICTのねこ｜本と学びをデザインするポートフォリオ

React + TypeScript + Viteで作成した静的ポートフォリオサイトです。

## プロジェクト本体

`ict-cat-portfolio-source.zip` に、ソースコードと `handoff/` 引き継ぎ資料一式を収録しています。

このリポジトリをClaude CodeやCodexで利用する場合は、ZIPをダウンロードして解凍し、解凍したフォルダを開いてください。

## 他AIへの引き継ぎ

最初に次のファイルを読んでください。

- `handoff/README_START_HERE.md`
- `handoff/AI_HANDOFF_MASTER.md`
- `handoff/UPDATE_LOG.md`

主な編集箇所：

- コンテンツ：`shared/const.ts`
- ページ構成：`client/src/pages/Home.tsx`
- デザイン・配色：`client/src/index.css`
- テーマ切替：`client/src/contexts/ThemeContext.tsx`

変更後は以下を実行してください。

```bash
pnpm install
pnpm check
pnpm build
```

## サイトの主な機能

- 木漏れ日カフェ風のエディトリアルデザイン
- 夜のカフェ風ダークモード
- Newsセクション
- Profileタイムライン
- 書籍詳細モーダル
- KindEd・デザイン実績・問い合わせ導線
- モバイル対応
