# ICTのねこポートフォリオ：AIエージェント引き継ぎガイド

## 1. プロジェクトの目的

このサイトは、現役中学校教員・Kindle作家・教育未来創造研究会KindEd代表・書籍表紙デザイナーである「ICTのねこ（結月汐音）」の活動を、本屋さんを思わせるLPとして紹介するポートフォリオです。主な導線は、自著の紹介、KindEdの共著本と活動、YouTube、出版サポート、表紙デザイン実績、問い合わせです。

公開URLは `https://ictcatfolio-ipdxgnqt.manus.space` です。編集時は、落ち着いた紙色・濃いブラウン・テラコッタ・淡いグリーン、十分な余白、書籍を主役にした構成を維持してください。

## 2. 技術構成

| 項目 | 採用技術 |
|---|---|
| フロントエンド | React 19、Vite、TypeScript |
| UI | Tailwind CSS 4、Framer Motion、Lucide React、shadcn/ui系コンポーネント |
| サーバー | Express、tRPC 11 |
| データベース | Drizzle ORM、MySQL互換DB |
| 認証 | Manus OAuth基盤 |
| テスト | Vitest |
| ビルド | Vite + esbuild |

ページの中心は `client/src/pages/Home.tsx` です。公開コンテンツは `shared/const.ts` に集約し、配色・共通装飾・レスポンシブ規則は `client/src/index.css` にあります。サーバー機能を変更する場合は `server/routers.ts`、`server/db.ts`、`drizzle/schema.ts`、対応テストを確認してください。

## 3. AIエージェントが最初に読むファイル

最初に次の順序で読みます。

1. `README.md`
2. `AGENTS.md`
3. `docs/AI_HANDOFF.md`
4. `shared/const.ts`
5. `client/src/pages/Home.tsx`
6. `client/src/index.css`
7. `todo.md`
8. 変更内容に対応する `research/*.md`

`AGENTS.md`は短い作業規約、本文書は背景・データ構造・検証方法を記載する詳細版です。Claude Codeでは`CLAUDE.md`から本文書へ案内しています。

## 4. 通常の更新手順

要件を受けたら、まず`todo.md`に未完了項目を追加します。次に、既存のデータ構造と表示位置を確認し、変更範囲を限定して編集します。外部サイトの情報、レビュー、書籍情報、イベント、画像を使う場合は、確認URLと確認日を`research/`に記録します。実装後は型チェック、テスト、ビルド、デスクトップ表示、スマートフォン表示、ブラウザコンソールを確認し、完了項目を`todo.md`で`[x]`にします。

```bash
pnpm install
pnpm check
pnpm test
pnpm build
pnpm check:links
pnpm dev
```

`pnpm check:links`は`shared/const.ts`、`Home.tsx`、`index.html`に記載されたURLとページ内アンカーを検査します。403はアクセス制限の可能性があるため既定では警告扱いで、厳密な外部検査は`pnpm check:links -- --strict-remote`で実行します。相対アセットを公開サーバーで検査する場合は`LINK_CHECK_BASE_URL=https://example.com pnpm check:links`を使います。UI変更では、少なくとも1280px幅と375px幅で確認します。コンソール警告、とくに`<a>`の入れ子、画像alt不足、button内リンク、フォーカス不能を見逃さないでください。

## 5. コンテンツの編集場所

| 内容 | 編集場所 | 注意点 |
|---|---|---|
| 自著 | `shared/const.ts` の`BOOKS` | ICTのねこ／結月汐音の自著だけを掲載する |
| KindEd共著 | `shared/const.ts` の`COLLABORATIVE_BOOKS` | 共著本として自著とサイズ・ラベルを分ける |
| デザイン実績 | `shared/const.ts` の`PORTFOLIO_ITEMS` | 自著・KindEd作品を混ぜない |
| サービス | `shared/const.ts` の`SERVICES` | 出版サポート、表紙デザイン、KindEd講座を区別する |
| YouTube | `shared/const.ts` の`YOUTUBE_VIDEOS` | 現在は先頭4本を表示する |
| KindEdイベント | `shared/const.ts` の`KINDED_EVENTS` | 最新情報と過去情報を区別し、公式リンクを保持する |
| サイト設定 | `shared/const.ts` の`SITE_CONFIG` | 公式URL、SNS、問い合わせ先を一元管理する |

Amazonの直リンクは、表紙・正式タイトル・著者・ASINが一致した場合だけ設定します。未照合の商品に推測でASINを付けず、検索URLを使います。AmazonアソシエイトIDは既存の共有関数を通し、個別に直書きしません。

レビューや評価は創作禁止です。ココナラ等で実際に公開されているレビューだけを商品別に掲載し、引用元URLを付けます。現在レビュー表示の対象は出版サポートと表紙デザインで、他サービスにダミーの感想を追加しません。

## 6. 画像と静的アセット

画像や動画を`client/public/`や`client/src/assets/`、リポジトリ直下へ保存しないでください。元画像は`/home/ubuntu/webdev-static-assets/`に置き、永続ストレージへアップロードしたURLを`shared/const.ts`から参照します。提供された猫アイコンはヘッダー・プロフィールなど意味のあるブランド用途を優先し、本文途中へ無関係に配置しません。装飾として猫のシルエットや足跡を使う場合は、低い不透明度、`aria-hidden`、`pointer-events: none`、`prefers-reduced-motion`を守ります。

## 7. UIとアクセシビリティの注意

外部リンクは必要に応じて`target="_blank" rel="noreferrer"`を使います。ただし、リンクの中へ別のリンクを入れてはいけません。カード全体をリンクにしたい場合でも、レビュー出典リンクや詳細リンクが必要なら、外側を`div`にして独立したCTAリンクを置きます。今回もこのルールで入れ子<a>警告を修正済みです。

書籍要約・レビューはスマートフォンで圧迫感が出ないよう、短い初期表示やdetails/summaryを使います。ボタンには明確なラベルとキーボードフォーカスを付け、画像には内容に対応したaltを付けます。アニメーションは短く、`prefers-reduced-motion: reduce`で抑制します。

## 8. フォームとバックエンド

問い合わせフォームは標準構成では`mailto:`方式です。フォーム内容から宛先・件名・本文を作り、`neyrateacher@gmail.com`のメール作成画面を開きます。外部メールAPIキーをソースコードへ書き込まないでください。DBや自動通知を再導入する場合は、先に必要な秘密情報、データ保持方針、テストを明確にします。

DBスキーマを変更するときは、`drizzle/schema.ts`を更新し、マイグレーションを生成してから管理されたSQL適用手順を使います。既存データを削除するSQLは、利用者の明示的な確認なしに実行しません。

## 9. Manusからの移行

React/Vite、Express、tRPC、Drizzle、MySQL互換DBという一般的な構成として移行できます。Manus固有の認証・通知・ストレージを置き換える場合は、`client/src/lib/trpc.ts`、`server/_core/notification.ts`、`server/_core/storageProxy.ts`、画像URLのストレージアダプターを移行先へ差し替えます。秘密情報は`.env`や環境変数管理へ移し、リポジトリへコミットしません。

## 10. 既知の注意点

「Made with Manus」という右下の表示は、サイトコードや公開HTMLに含まれる文言ではなく、プレビュー／編集環境側のウォーターマークとして確認されています。アプリ内のCSSやReactコードで無理に削除しないでください。公開ドメインでも表示される場合は、サイトコードではなく管理画面側のブランド設定を確認します。

`vite-plugin-manus-runtime`や`server/_core`は基盤コードです。機能要件がない限り変更しません。公開コンテンツの正確性を優先し、確認できない情報をAIの推測で補わないことが最重要です。
