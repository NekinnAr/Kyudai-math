# 九大理系数学の探究

九州大学 前期日程 理系数学（1997〜2026）の過去問を、年代別に解説するための静的サイトです。
ビルド不要の HTML / CSS / JavaScript だけで動くので、GitHub Pages にそのまま置けます。

## フォルダ構成

```
kyudai-math/
├── index.html              トップページ（年代別一覧表・カウントダウン・ブックマーク・更新ログ）
├── pages/
│   ├── about.html          このサイトについて
│   ├── _template.html      記事テンプレート
│   └── 2004_1.html 〜 2026_5.html   解説記事（2004〜2026 年度 全115問）
├── assets/
│   ├── css/style.css       デザイン
│   ├── js/data.js          ★サイトのデータ（ほぼここだけ編集すればOK）
│   ├── js/site.js          共通処理（メニュー・ブックマーク・数式描画・前後リンク）
│   ├── js/fig.js           動く図解用の小さな描画ライブラリ（2D 座標平面・3D・複素数）
│   └── vendor/katex/       数式表示ライブラリ KaTeX（同梱しているのでオフラインでも動作）
└── tools/new_article.py    新しい記事の雛形を作るスクリプト
```

## 記事の追加手順

1. 雛形を作る
   ```bash
   python3 tools/new_article.py 2024 3     # → pages/2024_3.html ができる
   ```
2. `pages/2024_3.html` に問題文・解答・背景・類題を書く
   - 数式は `$...$`（インライン）、`$$...$$`（別行立て）で KaTeX 記法
   - HTML 内で不等号を使うときは `\lt` `\gt`（または `&lt;` `&gt;`）
   - 九大過去問の出典は `<span class="src-kyudai">`（橙）、魔改造は `<span class="src-kai">`（赤）
3. `assets/js/data.js` の `PROBLEMS` に登録して公開
   ```js
   "2024-3": { title: "短いタイトル", topics: ["整数"], diff: "B", published: true },
   ```
   `published: true` を付けた問題だけ一覧表でリンクが有効になり、それ以外は半透明で「準備中」表示になります。

### data.js で設定できるもの

| 項目 | 内容 |
| --- | --- |
| `SITE.title` など | サイト名・説明文・問い合わせ先 |
| `SITE.startYear` / `endYear` | 一覧表に載せる年度の範囲 |
| `SITE.examDate` | カウントダウンの目標日時（**大学の要項で正確な日時を確認して更新してください**） |
| `TOPICS` | 分野タグとその色（一覧表の絞り込みに使われます） |
| `YEARS` | 年度ごとの一言コメント、大問数の例外（`count`）、問題ページへのリンク（`mondai`。どこかの年度に設定すると「問題」列が表示されます） |
| `PROBLEMS` | 各問題のタイトル・分野・難易度・公開状態 |

## ローカルで確認

```bash
cd kyudai-math
python3 -m http.server 8000
# → http://localhost:8000 を開く
```
（`index.html` をダブルクリックで直接開いても動作します）

## GitHub Pages で公開

1. GitHub で新しいリポジトリ（例: `Kyudai_Math`）を作る
2. このフォルダの中身をすべて push
3. リポジトリの **Settings → Pages** で「Branch: main / (root)」を選んで保存
4. 数分後に `https://<ユーザー名>.github.io/Kyudai_Math/` で公開されます

## 注意

- 入試問題の著作権は九州大学に帰属します。問題文の転載範囲には各自ご注意ください。
- 2004〜2026 年度は全 115 問の解説記事が公開済みです。2003年度以前は第4問・第5問が選択問題（各3題）のため、載せ方を検討中です（トップページと about に明記済み）。
- 九大理系は例年 5 問構成として表を作っています。年度によって大問数が異なる場合は `YEARS[年].count` で変更できます。
