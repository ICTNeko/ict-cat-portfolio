# コンテンツ更新仕様

## 正本

すべての表示コンテンツの正本は `/home/ubuntu/ict-cat-portfolio/shared/const.ts` です。`Home.tsx` に書籍名やサービス文言を直接ハードコードするのではなく、まずこの定数ファイルを更新します。

## データ一覧

| 定数 | 用途 | 主な項目 |
|---|---|---|
| `SITE_CONFIG` | サイト名・紹介文・外部リンク・主要画像 | `title`, `description`, `author`, `links`, `assets` |
| `BOOKS` | ICTのねこの自著 | `title`, `subtitle`, `description`, `url`, `image`, `year`, `category` |
| `COLLABORATIVE_BOOKS` | KindEd・教員まなびの本屋の共著 | `title`, `authors`, `description`, `url`, `image`, `year`, `category` |
| `YOUTUBE_VIDEOS` | YouTubeの代表動画 | `id`, `title`, `thumbnail` |
| `SERVICES` | 依頼メニュー | `title`, `description`, `price`, `link`, `category` |
| `PORTFOLIO_ITEMS` | 表紙・デザイン実績 | `title`, `category`, `description`, `image` |
| `PROFILE_TIMELINE` | 出版・KindEd活動の歩み（静的表示） | `year`, `title`, `description`, `category` |
| `KINDED_EVENTS` | KindEdのイベント・出店情報 | `title`, `date`, `venue`, `booth`, `link`, `upcoming` |

## 書籍の追加・変更

書籍を追加するときは、正式なタイトル、著者表記、紹介文、販売ページURL、表紙画像URL、発行年、分類をそろえます。自著は `BOOKS`、KindEdまたは合作本は `COLLABORATIVE_BOOKS` に追加します。表紙画像は、Amazon商品ページ、著者・出版社の公式ページ、またはユーザーが提供した正規画像と照合できるものを使用します。

確認できない表紙画像を、別の書籍画像や生成画像で代用してはいけません。情報が不足している場合は、画像を空欄にしてUIで未掲載を明示するか、ユーザーへ確認を依頼します。共著の全冊数を見せることを優先して、未確認のタイトル・ASIN・画像を推測しないでください。

## YouTube動画の追加

YouTube動画は動画IDを正本とします。`id` からサムネイルを作る場合も、公開ページでタイトルと動画内容が一致することを確認します。チャンネルURLは `SITE_CONFIG.links.youtube` に保持し、個別動画カードのURLは `https://www.youtube.com/watch?v={id}` 形式にします。

## サービスと問い合わせ

KindEdの講座・研修依頼は `SERVICES` の `link` を `#contact-form` とし、フォームの選択肢にも同じ名称を追加します。ココナラへ送るサービスは `SITE_CONFIG.links.coconala` を使用します。問い合わせ先メールアドレスを変更する場合は、フォーム送信処理と `SITE_CONFIG.links.email` を同時に更新します。

## 画像の運用

Web公開用の画像や音声は、プロジェクト内へ直接大量に保存しません。生成画像は `/home/ubuntu/webdev-static-assets/` に保管し、WebDev用の永続URLを `shared/const.ts` に記録します。外部画像を使う場合は、リンク切れ、著作権、画像の内容とタイトルの一致を確認します。

画像には必ず内容に即した日本語または英語の `alt` テキストを与えます。書籍表紙は書籍タイトル、実績は実績名、動画は動画タイトルを基本にします。

## 更新後の確認

更新後は、TypeScriptとビルドを確認します。

```bash
cd /home/ubuntu/ict-cat-portfolio
pnpm check
pnpm build
```

そのうえで、デスクトップ幅と375px前後のスマートフォン幅で、画像の比率、リンク、文字のはみ出し、タップ領域を確認します。変更概要、確認内容、チェックポイントIDは `handoff/UPDATE_LOG.md` に記録します。
