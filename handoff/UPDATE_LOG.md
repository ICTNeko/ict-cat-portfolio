# 変更履歴（Update Log）

## 2026-08-27: 木漏れ日カフェ風への刷新と引き継ぎ体制の構築

### 1. デザインの刷新（Komorebi Editorial Cafe）
- **コンセプト**: アンティーク・モダンから、より温かみと開放感のある「木漏れ日の漏れるカフェ」風へ変更。
- **視覚効果**: 背景に揺らぐ木の葉の影（Komorebiアニメーション）と、和紙・リネンの触感的テクスチャを導入。
- **配色**: フォレストグリーン、オークゴールド、生成り色を基調としたナチュラルなエディトリアルスタイル。

### 2. 書籍情報の正確な再現とサイズ調整
- **実画像の適用**: Amazonおよびnoteの公式情報と照合し、共著本を含むすべての書籍に実際の表紙画像を適用。
- **圧の軽減**: デザイナーのポートフォリオとして、書籍表紙とYouTubeサムネイルの表示サイズを縮小し、余白を広げた洗練されたレイアウトへ調整。
- **データ更新**: `shared/const.ts` に最新の共著本（全6冊）、YouTube動画、イベント情報を反映。

### 3. インタラクティブ演出の強化
- **しおりナビ**: 画面右端にスクロール追従する木製のしおりを実装。クリックで各章へスムーズに移動可能。
- **触覚フィードバック**: スマートフォンでのタップ時に微細な振動（Vibration API）を返す演出を追加（しおり、付箋メモ）。
- **ページめくり音**: しおり操作時に控えめな「ページをめくる音」を再生し、没入感を向上。

### 4. AIエージェント引き継ぎフォルダ（handoff）の作成
- **専用フォルダ**: `/home/ubuntu/ict-cat-portfolio/handoff` を作成。
- **資料統合**: 過去の全指示、設計思想、データ構造、ソースのスナップショットを整理・格納。
- **マスターガイド**: 他のAIが迷わず更新できるよう、`AI_HANDOFF_MASTER.md` や `README.md` を作成。

### 検証結果
- **型チェック**: `pnpm check` 成功。
- **ビルド**: `pnpm build` 成功。
- **レスポンシブ**: デスクトップおよびスマートフォン（375px）での表示と操作性を確認済み。

### チェックポイント
- **ID**: `200236a2` (予定)

## 2026-08-28: Visual Bookshelf update

The homepage was refined into a visually expressive bookstore layout while keeping the Komorebi Cafe warmth. The hero now uses a framed selected-catalog shelf made from verified book covers rather than an abstract image. Main book covers were reduced to a quieter, hand-held scale (`w-[56%]` to `w-[70%]` depending on breakpoint) and receive a wooden shelf rail, spine shadow, and restrained hover lift. YouTube thumbnails were reduced to a maximum width of 224px.

Verified cover assets were uploaded to WebDev storage and wired into `shared/const.ts`: Kindle publishing guide, Kahoot guide, teacher time-management, `先生のミライ`, `教師を生きる`, `わかりやすい授業の作り方`, `子育てのQ&A`, and `先生だって失敗する！`. The title `「授業」でこだわっていること` remains text-led because no matching standalone cover was verified; do not reuse another book's image. Research evidence and rejected image matches are recorded in `cover_research_notes.md`.

When updating this visual system, preserve the hierarchy: hero covers are small and angled, archive covers are framed and surrounded by whitespace, and the wooden rail acts as the recurring bookstore motif. Keep image `alt` text in Japanese and maintain the mobile breakpoint rules in `index.css`.

## 2026-09-01: Profile timeline and contrast refinement

- `shared/const.ts` に静的な `PROFILE_TIMELINE` を追加し、出版開始・出版継続・KindEd主催・共著プロジェクト・現在の16冊／ベストセラー実績を管理。
- Profileセクションに、出版とKindEd活動の歩みを視覚化するレスポンシブタイムラインを追加。
- Profile追加に合わせて章番号を `01`〜`07` に整理し、しおりナビゲーションの対象にもProfileを追加。
- 背景に対して薄かった本文・補助テキスト・ナビゲーションのコントラストを改善。配色は木漏れ日カフェの雰囲気を保ちながら、本文色とオーク色を濃く調整。
- サイトは引き続き、共有定数と静的React表示を中心とする無料更新可能な静的HP構成を維持。

## 2026-10-12: News and night cafe mode finalization

- `shared/const.ts` に静的な `NEWS_ITEMS` を追加。出版予定・KindEdイベント・お問い合わせ導線をNewsカードとして管理。
- `Home.tsx` の表示順を `hero(00) → profile(01) → news(02) → books(03) → youtube(04) → kinded(05) → design(06) → services(07) → contact-form(08)` に統一。
- `App.tsx` の `ThemeProvider` に `switchable` を有効化し、ヘッダーにライト／ダーク切替ボタンを追加。
- `index.css` に夜のカフェ配色（深いチャコール、生成りの文字、オークゴールド）と、Profileタイムライン・Newsカード・メモ・棚のダーク表示補正を追加。
- 検証: `pnpm check` 成功、`pnpm build` 成功。デスクトップ全ページ、375pxモバイル、ブラウザ上のダークモード、Profile・News表示を確認。
