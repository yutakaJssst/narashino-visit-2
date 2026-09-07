# AIと作る学校紹介サイト（日本大学習志野高等学校）

日本大学理工学部 応用情報工学科の模擬講義（2026-09-08 学部見学会）で、AIを使ったWebサイト制作をその場で見せるためのGitHub Pages向けサイトです。
ビルド手順は不要で、`index.html` をブラウザで開くだけで動きます。

模擬講義は2回あり、リポジトリを分けています。どちらも同じベースラインから始めます。

| 回 | 時間 | 人数 | リポジトリ | 公開URL |
| --- | --- | --- | --- | --- |
| 1回目 | 14:25〜14:45 | 20名 | `narashino-visit-1` | https://yutakajssst.github.io/narashino-visit-1/ |
| 2回目 | 15:00〜15:20 | 40名 | `narashino-visit-2` | https://yutakajssst.github.io/narashino-visit-2/ |

## ファイル構成

- `index.html`: ページ構造
- `styles.css`: 見た目とレスポンシブ対応
- `script.js`: 冒頭の `siteData` に学校データ。続けて描画とミニゲーム
- `assets/narashino-visit-1-qr.png`: 公開URLのQRコード
- `notes/nichidai-narashino-research.md`: 公式サイトから集めた学校情報と出典
- `notes/session-plan-20260908.md`: 20分の進行案、聞き取り台本、プロンプト、チェックリスト

## 当日の使い方

1. 生徒に学校のいいところ、売店の人気、テーマカラー、通学路の障害物を挙手投票で聞きます。
2. Claude Code に `notes/session-plan-20260908.md` のプロンプト1を、聞いた内容で埋めて渡します。
3. ブラウザを再読み込みして、サイトが変わる様子を見せます。
4. 生徒の指摘をもとにプロンプト2で修正し、ゲームも変えます。
5. `git push` して GitHub Pages に公開し、QRを見せます。

内容の変更は `script.js` 冒頭の `siteData` だけで済みます。AIが止まったときは手で書き換えても動きます。

## 写真について

公式サイトの写真は利用許諾が未確認のため載せていません。当日撮った写真を生徒の了解のもとで `assets/photos/` に置き、AIに写真セクションを追加させることはできます。`styles.css` に `photo-section` `photo-grid` `photo-card` のスタイルが残っています。

## GitHub Pagesで公開

1. GitHubでこのリポジトリを開きます。
2. `Settings` から `Pages` を開きます。
3. `Build and deployment` で `Deploy from a branch` を選びます。
4. Branchを `main`、Folderを `/ (root)` にして保存します。

反映には1〜2分かかります。前日にベースラインを公開しておくと、当日はURLが必ず開きます。
