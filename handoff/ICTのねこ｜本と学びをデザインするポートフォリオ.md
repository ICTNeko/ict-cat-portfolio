# ICTのねこ｜本と学びをデザインするポートフォリオ

現役中学校教員・Kindle作家・教育未来創造研究会KindEd代表・書籍表紙デザイナー「ICTのねこ（結月汐音）」の本屋さん型ポートフォリオです。自著、KindEd共著本、YouTube、出版サポート、表紙デザイン実績、KindEd講座・イベントへの導線を、React/Viteで一体的に紹介しています。

## AIエージェントへ引き継ぐ場合

Codex、Claude Code、その他のAIエージェントで更新する場合は、最初に [`AGENTS.md`](AGENTS.md)、[`CLAUDE.md`](CLAUDE.md)、[`docs/AI_HANDOFF.md`](docs/AI_HANDOFF.md)を読んでください。`AGENTS.md`は短い必須規約、`CLAUDE.md`はClaude Code用の入口、`docs/AI_HANDOFF.md`はプロジェクト背景・データ分類・外部リンク・画像・検証手順をまとめた詳細ガイドです。実際に別エージェントへ貼り付ける指示文は [`docs/HANDOFF_PROMPT.md`](docs/HANDOFF_PROMPT.md) にまとめています。

更新時は、まず`todo.md`へ未完了項目を追加し、公開コンテンツの主データを`shared/const.ts`で編集します。外部情報や画像を使う場合は、URL・確認日・利用目的を`research/`へ記録します。レビューや評価は創作せず、AmazonのASINは照合済みの場合だけ直リンクにします。

## 技術構成

| 項目 | 内容 |
|---|---|
| フロントエンド | React 19、TypeScript、Vite |
| UI | Tailwind CSS 4、Framer Motion、Lucide React |
| サーバー | Express、tRPC 11 |
| DB | Drizzle ORM、MySQL互換DB |
| テスト | Vitest |
| ビルド | Vite + esbuild |

## 主要ファイル

| 役割 | ファイル |
|---|---|
| 書籍・サービス・リンク・動画・イベント | `shared/const.ts` |
| LPのページ構造 | `client/src/pages/Home.tsx` |
| 色、余白、装飾、レスポンシブ | `client/src/index.css` |
| ルートとプロバイダー | `client/src/App.tsx`, `client/src/main.tsx` |
| サーバーAPI・DB処理 | `server/routers.ts`, `server/db.ts` |
| DBスキーマ | `drizzle/schema.ts` |
| テスト | `server/*.test.ts` |
| タスク履歴 | `todo.md` |

## 開発コマンド

```bash
pnpm install
pnpm check
pnpm test
pnpm build
pnpm check:links
pnpm dev
```

`pnpm check:links`は`shared/const.ts`、`Home.tsx`、`index.html`からURLとページ内アンカーを検出し、外部URLのHTTP応答、相対アセット、アンカーの存在を検証します。外部サイトの403はアクセス制限の可能性があるため警告扱いです。厳密に失敗扱いにする場合は`pnpm check:links -- --strict-remote`を使います。相対URLを公開サーバーで確認する場合は`LINK_CHECK_BASE_URL=https://example.com pnpm check:links`を使います。UI変更では、デスクトップ幅と375px前後のスマートフォン幅を確認します。ブラウザコンソールに警告がないこと、画像alt、キーボードフォーカス、`prefers-reduced-motion`、`<a>`の入れ子がないことを確認してください。

## 公開コンテンツの編集ルール

自著は`BOOKS`、KindEd共著は`COLLABORATIVE_BOOKS`、提供済みデザイン作品は`PROVIDED_COVER_ITEMS`、相談商品は`SERVICES`、YouTubeは`YOUTUBE_VIDEOS`、イベントは`KINDED_EVENTS`、公式リンクと表紙制作動画は`SITE_CONFIG`を編集します。各作品は表紙上で確認できる作品名・カテゴリ・Amazon検索または確認済み商品リンクを1件ずつ登録し、通常表示と「全てのデザイン作品を見る」ポップアップの両方へ反映されます。アイコン・重複画像・仮のファイル名は公開カタログへ登録しません。現在YouTubeは4本表示です。KindEd公式サイトは [kindedhome-my4uh3wg.manus.space](https://kindedhome-my4uh3wg.manus.space)、イベントは [kinded.peatix.com](https://kinded.peatix.com)、YouTubeは [ICTのねこ公式チャンネル](https://www.youtube.com/@ict_cat)、ココナラは [ICTのねこプロフィール](https://coconala.com/users/3694718)、問い合わせ先は`neyrateacher@gmail.com`です。

問い合わせフォームは標準構成では`mailto:`方式で、訪問者のメールアプリを開きます。外部メールAPIキーをソースコードへ書き込まないでください。DBや自動通知を再導入する場合は、秘密情報、データ保持、テストを先に設計します。

## 画像と外部アセット

大きな画像・動画は`client/public/`や`client/src/assets/`へ置きません。元ファイルは`/home/ubuntu/webdev-static-assets/`に保管し、永続ストレージURLを参照します。提供された猫アイコンはヘッダーやプロフィールなど意味のあるブランド用途を優先し、本文途中へ無関係に配置しません。

## Manusから別環境へ移行する場合

React/Vite、Express、tRPC、Drizzle、MySQL互換DBという一般的な構成として移行できます。Manus固有の認証・通知・ストレージを置き換える場合は、`client/src/lib/trpc.ts`、`server/_core/notification.ts`、`server/_core/storageProxy.ts`、画像URLのストレージアダプターを移行先へ差し替えます。秘密情報は`.env`などの環境変数管理へ移し、リポジトリへコミットしません。

「Made with Manus」の右下表示は、サイトコードや公開HTMLのコンテンツではなく、プレビュー／編集環境側のウォーターマークとして確認されています。アプリ側のCSSやJavaScriptで無理に削除せず、公開ドメインでも表示される場合は管理画面側のブランド設定を確認してください。
