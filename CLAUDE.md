# CLAUDE.md

日本大学習志野高等学校の紹介サイト。模擬講義中に、生徒の声を聞きながらその場で書き換える。

## 構成

- ビルド不要の静的サイト。`index.html` をブラウザで開くだけ。
- `index.html` は空の器。見出しも本文も `script.js` が流し込む。
- 文面・色・ゲームの内容はすべて `script.js` 冒頭の `siteData` にある。**内容の変更は `siteData` だけを編集する。** その下のレンダリング関数、SVG生成、ゲームのロジックは触らない。
- `styles.css` は編集的なタイポグラフィ設計。明朝（Shippori Mincho B1）が見出し、ゴシック（Zen Kaku Gothic New）が本文、等幅（DM Mono）がラベル。色は `--ink` `--paper` `--brand` `--accent` の4系統。
- `siteData.theme.brand` と `accent` は JS から CSS 変数に反映される。色を変えるならここ。

## 書き方

- 生徒名や個人が特定できる情報は書かない。生徒の声は「1年生」名義にする。
- 公式サイトから分かる事実は `notes/nichidai-narashino-research.md` にある。分からないことは推測で書かず、そのまま聞く。
- 日本語で、短く、高校生が読んで楽しい文にする。見出しは体言止めか短い言い切り。
- 生徒の声を入れるときは、その `voices` 項目の `placeholder: true` を消す（枠が点線から実線になる）。
- 編集後は `node --check script.js` で構文だけ確認する。
