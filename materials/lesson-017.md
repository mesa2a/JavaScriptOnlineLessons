---
title: "Lesson 017: サイズを変える"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 017: サイズを変える

---

## 今回の学習

### 前回の復習

前回は、`style`プロパティを使って要素の色を変更する方法を学びました。`style.color`で文字色、`style.backgroundColor`で背景色を変更できるようになりました。また、CSSプロパティをJavaScriptで使うときは、キャメルケース記法を使うことも学びました。

### 今回の目標

1. `style.fontSize`で文字の大きさを変更できるようになる
2. `style.width`と`style.height`で要素のサイズを変更できるようになる
3. 単位（px）の意味を理解する
4. 大きくしたり小さくしたり、自由にサイズを操作できるようになる

**前回までの振り返り：**
- Lesson 016：要素の「色」を変える方法を学んだ
- Lesson 017：要素の「サイズ」を変える方法を学ぶ ← **今回！**

---

## 単位（px）とは

### pxの意味

Webページでサイズを指定するときは、「単位」を付ける必要があります。最もよく使われる単位が「**px（ピクセル）**」です。

**pxとは：**

pxは「**pixel（ピクセル）**」の略で、画面を構成する最小の点（ドット）のことです。

**身近な例で理解する：**

モザイク画やドット絵をイメージしてください。

- 1つ1つの小さなタイル = 1ピクセル
- タイル30個分の大きさ = 30px
- タイル100個分の大きさ = 100px

例えば、「30px」と指定すると、「30個のピクセル分の大きさ」という意味になります。

**実際の大きさ：**

ピクセルの物理的な大きさは、画面によって異なります。
- 高解像度ディスプレイ：ピクセルが小さい（密度が高い）
- 低解像度ディスプレイ：ピクセルが大きい（密度が低い）

そのため、「30px」は画面によって見た目の大きさが少し変わりますが、Web開発では気にせず使って大丈夫です。

### なぜ単位が必要なのか

数字だけでは、何の単位なのか分かりません。

**単位なしの例（エラー）：**

```javascript
elem.style.fontSize = "30";  // 30って何？ 30cm？ 30mm？ 30インチ？
elem.style.fontSize = 30;    // 数値だけでは動かない
```

単位を付けることで、明確に大きさを指定できます。

**単位ありの例（正しい）：**

```javascript
elem.style.fontSize = "30px";  // 30ピクセルの大きさ
```

**重要：** JavaScriptでサイズを指定するときは、必ず以下の3つが必要です：
1. **引用符**（`""`）で囲む
2. **数値**を書く
3. **単位**（`px`）を付ける

```javascript
// ✅ 正しい：引用符 + 数値 + 単位
elem.style.fontSize = "30px";

// ❌ 間違い：引用符なし
elem.style.fontSize = 30px;

// ❌ 間違い：単位なし
elem.style.fontSize = "30";
elem.style.fontSize = 30;
```

### 他の単位（参考）

pxの他にも、いくつかの単位があります。

| 単位 | 意味 | 使用例 |
|------|------|--------|
| `px` | ピクセル（固定の大きさ） | `"30px"` |
| `%` | パーセント（親要素に対する割合） | `"50%"` |
| `em` | 現在の文字サイズに対する倍率 | `"2em"` |
| `rem` | ルート要素の文字サイズに対する倍率 | `"1.5rem"` |
| `vw` | ビューポート幅に対する割合 | `"50vw"` |
| `vh` | ビューポート高さに対する割合 | `"50vh"` |

**初心者におすすめ：**
- **px（ピクセル）**が最も分かりやすいです
- 今回はpxを使います
- 他の単位は後のレッスンで学びます

---

## 文字の大きさを変える

### fontSizeプロパティ

文字の大きさを変えるには、`style.fontSize`プロパティを使います。

**基本の書き方：**

```javascript
// 要素を取得
const elem = document.getElementById("text");

// 文字の大きさを30pxに変更
elem.style.fontSize = "30px";
```

このコードを実行すると、文字が30ピクセルの大きさになります。

**処理の流れ（3ステップ）：**

```
1. document.getElementById("text")
   → id="text"の要素を探す

2. elem.style.fontSize
   → その要素のfontSizeプロパティにアクセス

3. = "30px"
   → 30ピクセルのサイズに設定する
```

**虫眼鏡で拡大するイメージ：**

新聞の文字を虫眼鏡で拡大するのと同じです。

- 最初：普通のサイズ（16px程度）
- `elem.style.fontSize = "30px"` を実行
- 結果：文字が30pxに拡大される

### 様々な大きさ

文字サイズを変えると、どのように見えるか試してみましょう。

```javascript
// とても小さい文字（注釈などに使用）
elem.style.fontSize = "10px";

// 小さめの文字
elem.style.fontSize = "14px";

// 普通の文字（デフォルト・本文用）
elem.style.fontSize = "16px";

// やや大きい文字（強調したい部分）
elem.style.fontSize = "20px";

// 少し大きい文字（小見出し）
elem.style.fontSize = "24px";

// 大きい文字（中見出し）
elem.style.fontSize = "30px";

// とても大きい文字（大見出し）
elem.style.fontSize = "40px";

// 特大の文字（タイトル）
elem.style.fontSize = "60px";

// 巨大な文字（インパクト用）
elem.style.fontSize = "100px";
```

**一般的な使い分け：**

| サイズ | 用途 | 使用例 |
|--------|------|--------|
| 10px～12px | とても小さい文字 | 注釈、コピーライト |
| 14px～16px | 本文 | 記事、説明文 |
| 18px～20px | 強調文字 | リード文、重要な文 |
| 24px～30px | 中見出し | h3タグ相当 |
| 32px～40px | 大見出し | h2タグ相当 |
| 48px以上 | 特大見出し | h1タグ相当、タイトル |

**ポイント：** 一般的に、Webページの本文は14px～16px程度です。見出しは20px～40px程度が多いです。

### 注意点：引用符で囲む

数値と単位を合わせて、必ず引用符（`""`）で囲みます。

**正しい例：**

```javascript
elem.style.fontSize = "30px";   // ✅ 正しい
```

**間違った例：**

```javascript
elem.style.fontSize = 30px;     // ❌ エラー（引用符がない）
elem.style.fontSize = 30;       // ❌ 動かない（単位がない）
elem.style.fontSize = "30";     // ❌ 動かない（単位がない）
```

**覚え方：**

`"数値 + px"`の形で、引用符で囲むと覚えましょう。

```
"30px"  →  " + 30 + px + "
```

---

## 要素の幅を変える

### widthプロパティ

要素の幅（横の長さ）を変えるには、`style.width`プロパティを使います。

**基本の書き方：**

```javascript
// 要素を取得
const elem = document.getElementById("box");

// 幅を200pxに変更
elem.style.width = "200px";
```

このコードを実行すると、要素の幅が200ピクセルになります。

**処理の流れ：**

```
1. document.getElementById("box")
   → id="box"の要素を探す

2. elem.style.width
   → その要素のwidthプロパティにアクセス

3. = "200px"
   → 200ピクセルの幅に設定する
```

**額縁の幅を変えるイメージ：**

絵画の額縁の幅を変えるのと同じです。

- 最初：デフォルトの幅（テキストの長さに応じて自動）
- `elem.style.width = "200px"` を実行
- 結果：幅が200pxに固定される

### 幅の変化を見る

幅を変えると、要素がどのように変化するのか見てみましょう。

**HTML:**

```html
<p id="box" style="background-color: lightblue;">テキスト</p>
```

**JavaScript:**

```javascript
const elem = document.getElementById("box");

// 様々な幅を試す
elem.style.width = "50px";    // とても狭い
elem.style.width = "100px";   // 狭い
elem.style.width = "200px";   // 普通
elem.style.width = "300px";   // やや広い
elem.style.width = "500px";   // 広い
elem.style.width = "800px";   // とても広い
```

**ポイント：** 背景色を付けると、幅の変化が分かりやすくなります。

**よく使うサイズ：**

| 幅 | 用途 |
|----|------|
| 50px～100px | アイコン、小さなボタン |
| 150px～300px | サイドバー、ナビゲーション |
| 400px～800px | コンテンツエリア、カード |
| 1000px以上 | メインコンテンツ、全幅レイアウト |

---

## 要素の高さを変える

### heightプロパティ

要素の高さ（縦の長さ）を変えるには、`style.height`プロパティを使います。

**基本の書き方：**

```javascript
// 要素を取得
const elem = document.getElementById("box");

// 高さを100pxに変更
elem.style.height = "100px";
```

このコードを実行すると、要素の高さが100ピクセルになります。

**処理の流れ：**

```
1. document.getElementById("box")
   → id="box"の要素を探す

2. elem.style.height
   → その要素のheightプロパティにアクセス

3. = "100px"
   → 100ピクセルの高さに設定する
```

**箱の高さを変えるイメージ：**

積み木の高さを変えるのと同じです。

- 最初：デフォルトの高さ（テキストの量に応じて自動）
- `elem.style.height = "100px"` を実行
- 結果：高さが100pxに固定される

### 幅と高さを同時に変更

幅と高さは、それぞれ独立して設定できます。両方を設定することで、様々な形の要素を作れます。

**長方形を作る：**

```javascript
const elem = document.getElementById("box");

// 幅200px、高さ100pxの横長の長方形
elem.style.width = "200px";
elem.style.height = "100px";

// 背景色も付けると形が分かりやすい
elem.style.backgroundColor = "lightblue";
```

**正方形を作る：**

```javascript
const elem = document.getElementById("box");

// 幅150px、高さ150pxの正方形
elem.style.width = "150px";
elem.style.height = "150px";

// 背景色を付ける
elem.style.backgroundColor = "lightcoral";
```

**縦長の長方形を作る：**

```javascript
const elem = document.getElementById("box");

// 幅80px、高さ200pxの縦長の長方形
elem.style.width = "80px";
elem.style.height = "200px";

// 背景色を付ける
elem.style.backgroundColor = "lightgreen";
```

**実行結果のイメージ：**

```
横長の長方形: ━━━━━━━━
             ━━━━━━━━

正方形:      ━━━━
             ━━━━
             ━━━━

縦長の長方形: ━━
             ━━
             ━━
             ━━
             ━━
```

**ポイント：**
- `width`と`height`を同じ値にすると正方形になる
- 幅を広く、高さを狭くすると横長の長方形になる
- 幅を狭く、高さを広くすると縦長の長方形になる

---

## 実践：サイズを自由に変更する（大きくしたり小さくしたり）

### 3つの要素のサイズを変える

3つの要素を作り、それぞれ異なるサイズに変更してみましょう。文字サイズを大きくしたり小さくしたりして、サイズの違いを体感します。

**HTML:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 017</title>
</head>
<body>
    <p id="text1">小さい文字</p>
    <p id="text2">普通の文字</p>
    <p id="text3">大きい文字</p>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript:**

```javascript
// 3つの要素を取得
const elem1 = document.getElementById("text1");
const elem2 = document.getElementById("text2");
const elem3 = document.getElementById("text3");

// それぞれの文字サイズを変更
elem1.style.fontSize = "10px";   // 小さい
elem2.style.fontSize = "20px";   // 普通
elem3.style.fontSize = "40px";   // 大きい
```

**コードの詳しい説明：**

```javascript
// ステップ1：3つの要素を取得
const elem1 = document.getElementById("text1");  // 1つ目の要素
const elem2 = document.getElementById("text2");  // 2つ目の要素
const elem3 = document.getElementById("text3");  // 3つ目の要素

// ステップ2：それぞれにサイズを設定
elem1.style.fontSize = "10px";   // 1つ目を10pxに（小さい）
elem2.style.fontSize = "20px";   // 2つ目を20pxに（普通）
elem3.style.fontSize = "40px";   // 3つ目を40pxに（大きい）
```

**実行結果：**

このコードを実行すると、ブラウザに以下のように表示されます。

```
小さい文字  （10pxで表示）
普通の文字  （20pxで表示）
大きい文字  （40pxで表示）
```

文字が階段状に大きくなっていくのが分かります！

### サイズを動的に変更する例

同じ要素のサイズを何度も変更することもできます。

```javascript
const elem = document.getElementById("text");

// 最初は小さく
elem.style.fontSize = "12px";

// 少し大きく
elem.style.fontSize = "20px";

// さらに大きく
elem.style.fontSize = "30px";

// 特大に
elem.style.fontSize = "50px";
```

**実行結果：** 最終的に「50px」のサイズが表示されます。

---

## ボックスを作る

### 幅と高さと背景色を組み合わせる

`width`、`height`、`backgroundColor`を組み合わせると、カラフルなボックスを作れます。これまで学んだスタイルプロパティを全て使って、見た目の良い要素を作りましょう。

**HTML:**

```html
<div id="box">ボックス</div>
```

**JavaScript:**

```javascript
const elem = document.getElementById("box");

// サイズと色を設定
elem.style.width = "200px";
elem.style.height = "200px";
elem.style.backgroundColor = "skyblue";
elem.style.color = "white";
elem.style.fontSize = "30px";
```

**実行結果：**

これで、200px × 200pxの青いボックスに、白い30pxの文字が表示されます。

```
┌──────────┐
│ ボックス   │  (200px × 200px)
│          │  (背景：水色、文字：白、30px)
└──────────┘
```

### 様々なボックスを作る

複数のスタイルプロパティを組み合わせて、様々なボックスを作ってみましょう。

**パターン1：赤い正方形ボックス**

```javascript
const elem = document.getElementById("box1");
elem.style.width = "150px";
elem.style.height = "150px";
elem.style.backgroundColor = "red";
elem.style.color = "white";
elem.style.fontSize = "24px";
```

**パターン2：緑の長方形ボックス**

```javascript
const elem = document.getElementById("box2");
elem.style.width = "300px";
elem.style.height = "100px";
elem.style.backgroundColor = "green";
elem.style.color = "yellow";
elem.style.fontSize = "18px";
```

**パターン3：ピンクの縦長ボックス**

```javascript
const elem = document.getElementById("box3");
elem.style.width = "100px";
elem.style.height = "250px";
elem.style.backgroundColor = "pink";
elem.style.color = "black";
elem.style.fontSize = "16px";
```

**応用：** このように、幅・高さ・色・文字サイズを組み合わせることで、無限の組み合わせのデザインを作ることができます！

---

## よくある間違いと注意点

### 間違い1：単位を付けない

```javascript
elem.style.fontSize = 30;        // 動かない（単位がない）
elem.style.width = 200;          // 動かない（単位がない）
```

正しくは以下のようになります。

```javascript
elem.style.fontSize = "30px";    // 正しい
elem.style.width = "200px";      // 正しい
```

### 間違い2：引用符を付けない

```javascript
elem.style.fontSize = 30px;      // エラー（引用符がない）
```

正しくは以下のようになります。

```javascript
elem.style.fontSize = "30px";    // 正しい
```

### 間違い3：単位のスペルミス

```javascript
elem.style.fontSize = "30p";     // 間違い（正しくはpx）
elem.style.fontSize = "30pix";   // 間違い（正しくはpx）
```

正しくは以下のようになります。

```javascript
elem.style.fontSize = "30px";    // 正しい
```

### 間違い4：CSSの記法を使う

```javascript
elem.style.font-size = "30px";   // エラー（ハイフンは使えない）
```

正しくは以下のようになります。

```javascript
elem.style.fontSize = "30px";    // キャメルケース
```

---

## サイズの目安

### 文字サイズの目安

- **10px**: とても小さい（注釈など）
- **14px～16px**: 本文の標準サイズ
- **20px～24px**: 小見出し
- **30px～40px**: 大見出し
- **50px以上**: 特大見出し

### 要素サイズの目安

- **100px × 100px**: アイコンサイズ
- **200px × 150px**: 小さな画像
- **400px × 300px**: 中くらいの画像
- **800px × 600px**: 大きな画像

画面の幅は、一般的に1920px程度（フルHD）です。スマートフォンは375px～414px程度です。

---

## 練習問題

### 課題：3つの要素のサイズを変更する（サイズ変更マスター）

**目標：** サイズを大きくしたり小さくしたりして、サイズ変更マスターになる

3つの要素を作成し、それぞれ異なるサイズに変更してください。この課題を通して、`style.fontSize`、`style.width`、`style.height`の使い方をマスターしましょう。

### 課題の目標

**何ができるようになる？**

この課題をクリアすると、以下のことができるようになります。

✅ 文字の大きさを自由に変えられる
✅ 要素の幅を自由に変えられる
✅ 要素の高さを自由に変えられる
✅ 単位（px）を正しく使える

### 保存場所

`exercises/lesson-017/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順（ステップバイステップ）

**ステップ1：HTMLに3つの要素を追加する**

`index.html` のコメント部分に、3つの`<p>`要素を追加します。

```html
<p id="text1">小さい文字</p>
<p id="text2">大きい文字</p>
<p id="box">ボックス</p>
```

**ステップ2：JavaScriptで要素を取得する**

`script.js` に、3つの要素を取得するコードを書きます。

```javascript
const elem1 = document.getElementById("text1");
const elem2 = document.getElementById("text2");
const elem3 = document.getElementById("box");
```

**ステップ3：サイズを設定する**

それぞれの要素にサイズを設定します。

- **text1**: 文字サイズを20pxに
- **text2**: 文字サイズを40pxに
- **box**: 幅を300px、高さを150pxに

```javascript
elem1.style.fontSize = "20px";
elem2.style.fontSize = "40px";
elem3.style.width = "300px";
elem3.style.height = "150px";
```

**完成の確認：**

ブラウザで `index.html` を開いて、以下を確認してください。

- [ ] 1つ目の文字が20pxの大きさになっている
- [ ] 2つ目の文字が40pxの大きさになっている（1つ目より大きい）
- [ ] 3つ目の要素に背景色を付けると、300px × 150pxのサイズが確認できる

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-017
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

課題に詰まったら、以下のヒントを順番に見ていきましょう。

**ヒント1：HTMLの書き方**

3つの`<p>`要素を作り、それぞれに異なるidと適当な文字を入れます。

```html
<!-- index.htmlのbody内に追加 -->
<p id="text1">小さい文字</p>
<p id="text2">大きい文字</p>
<p id="box">ボックス</p>
```

文字の内容は自由に変えても構いません。大事なのはidが正しく設定されていることです。

**ヒント2：要素の取得**

3つの変数を用意して、それぞれの要素を取得します。

```javascript
// script.jsに書く
const elem1 = document.getElementById("text1");
const elem2 = document.getElementById("text2");
const elem3 = document.getElementById("box");
```

変数名は`elem1`、`elem2`、`elem3`でなくても構いませんが、分かりやすい名前にしましょう。

**ヒント3：サイズの変更**

`style.fontSize`で文字サイズ、`style.width`と`style.height`で要素のサイズを変更します。

```javascript
// 文字サイズを変える
elem1.style.fontSize = "20px";
elem2.style.fontSize = "40px";

// 要素のサイズを変える（引用符と単位を忘れずに！）
elem3.style.width = "300px";
elem3.style.height = "150px";
```

**注意ポイント：**

- `fontSize`、`width`、`height`はキャメルケースで書きます
- 数値と単位（`px`）を引用符（`""`）で囲みます
- 単位を忘れると動きません

**ヒント4：確認方法**

ブラウザで`index.html`を開いて、以下のチェックリストを確認してください。

- [ ] 1つ目の文字が20pxの大きさになっている
- [ ] 2つ目の文字が40pxの大きさになっている（1つ目より2倍大きい）
- [ ] 3つ目の要素に背景色を付けると、300px × 150pxのサイズが確認できる

**背景色を付けてサイズを確認する：**

```javascript
elem3.style.backgroundColor = "lightblue";
```

これを追加すると、ボックスのサイズが分かりやすくなります。

**よくある間違い：**

```javascript
// ❌ 間違い1：引用符がない
elem1.style.fontSize = 20px;

// ✅ 正しい：引用符で囲む
elem1.style.fontSize = "20px";

// ❌ 間違い2：単位がない
elem3.style.width = "300";

// ✅ 正しい：単位（px）を付ける
elem3.style.width = "300px";

// ❌ 間違い3：ハイフンを使っている
elem1.style.font-size = "20px";

// ✅ 正しい：キャメルケース
elem1.style.fontSize = "20px";
```

---

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 017</title>
</head>
<body>
    <p id="text1">小さい文字</p>
    <p id="text2">大きい文字</p>
    <p id="box">ボックス</p>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
// 3つの要素を取得
const elem1 = document.getElementById("text1");
const elem2 = document.getElementById("text2");
const elem3 = document.getElementById("box");

// それぞれのサイズを変更
elem1.style.fontSize = "20px";
elem2.style.fontSize = "40px";
elem3.style.width = "300px";
elem3.style.height = "150px";
```

### 解説

**📝 HTMLファイルの構造：**

```html
<p id="text1">小さい文字</p>
<p id="text2">大きい文字</p>
<p id="box">ボックス</p>
```

- **9行目～11行目**：3つの`<p>`要素を作成
  - それぞれに異なるid（`text1`、`text2`、`box`）を付与
  - id は JavaScript から要素を見つけるための「名札」の役割
  - 要素内のテキストは任意（「小さい文字」「大きい文字」「ボックス」）

**💻 JavaScriptファイルの処理の流れ：**

**ステップ1：要素の取得（2行目～4行目）**

```javascript
const elem1 = document.getElementById("text1");
const elem2 = document.getElementById("text2");
const elem3 = document.getElementById("box");
```

- `getElementById()` を3回使って、それぞれの要素を取得
- `const` で変数を宣言（要素の参照先は変わらないため）
- 各要素を別々の変数に保存

**ステップ2：文字サイズの変更（7行目～8行目）**

```javascript
elem1.style.fontSize = "20px";  // 小さめの文字
elem2.style.fontSize = "40px";  // 大きめの文字
```

- `elem1` の文字サイズを20pxに設定（小さい文字）
- `elem2` の文字サイズを40pxに設定（大きい文字）
- 20pxと40pxの差が2倍なので、見た目の違いがはっきり分かる

**ステップ3：要素のサイズ変更（9行目～10行目）**

```javascript
elem3.style.width = "300px";   // 幅300px
elem3.style.height = "150px";  // 高さ150px
```

- `elem3` の幅を300pxに設定（横幅）
- `elem3` の高さを150pxに設定（縦幅）
- これで300px × 150pxの長方形になる

**📊 実行結果のイメージ：**

```
小さい文字        ← 20px
大きい文字        ← 40px (2倍の大きさ)
┌──────────────┐
│ボックス        │  ← 300px × 150px
│                │
└──────────────┘
```

**💡 さらに見やすくする工夫：**

3つ目の要素（`box`）に背景色を付けると、サイズの変化がより分かりやすくなります：

```javascript
elem3.style.backgroundColor = "lightblue";
elem3.style.width = "300px";
elem3.style.height = "150px";
```

実行結果：
```
┌──────────────┐
│ボックス        │  ← 水色の背景で300px × 150pxのサイズが明確に見える
│                │
└──────────────┘
```

**よくある質問（FAQ）**

**Q1：`let` ではなく `const` を使う理由は？**
A：要素の参照先は変わらないため、`const` を使う方が適切です。一度取得した要素（`elem1`など）を別の要素に置き換えることはほとんどないためです。

**Q2：幅と高さを同じ値にすると？**
A：正方形になります。例：`width = "150px"`、`height = "150px"` → 150px × 150pxの正方形

**Q3：文字サイズを変えたのに見た目が変わらない場合は？**
A：単位（`px`）を付け忘れている可能性があります。必ず `"20px"` のように引用符と単位が必要です。

**Q4：サイズを大きくしすぎると？**
A：画面からはみ出してしまうことがあります。画面サイズに合わせて適切な値を選びましょう。

---

## まとめ

### 今回学んだこと（5つのキーポイント）

**1️⃣ キーポイント1：単位（px）の意味と重要性**

Webページでサイズを指定するときは、「**px（ピクセル）**」という単位を使います。

- px = 画面を構成する最小の点（ドット）
- 数値だけでなく**単位も必ず付ける**必要がある
- 正しい形式：`"30px"`（引用符 + 数値 + 単位）
- 間違った形式：`30px`（引用符なし）、`"30"`（単位なし）

**イメージ：** モザイクアートの1つ1つの小さなタイルがピクセルです。

---

**2️⃣ キーポイント2：文字サイズの変更（fontSize）**

`style.fontSize` プロパティを使って、文字の大きさを変更できます。

- **基本形式：** `elem.style.fontSize = "30px"`
- 数値と単位（`px`）を引用符で囲む
- 一般的な本文：14px～16px
- 大きな見出し：24px～40px

**例：**
```javascript
const elem = document.getElementById("text");
elem.style.fontSize = "30px";  // 文字が大きくなる
```

---

**3️⃣ キーポイント3：要素の幅の変更（width）**

`style.width` プロパティを使って、要素の横幅を変更できます。

- **基本形式：** `elem.style.width = "200px"`
- 数値と単位（`px`）を引用符で囲む
- 小さなボタン：50px～100px
- コンテンツエリア：400px～800px

**イメージ：** 額縁の横幅を調整するイメージです。

---

**4️⃣ キーポイント4：要素の高さの変更（height）**

`style.height` プロパティを使って、要素の縦幅を変更できます。

- **基本形式：** `elem.style.height = "100px"`
- 数値と単位（`px`）を引用符で囲む
- 幅と高さは独立して設定できる
- 同じ値 → 正方形、異なる値 → 長方形

**例：**
```javascript
const elem = document.getElementById("box");
elem.style.width = "200px";   // 横幅200px
elem.style.height = "100px";  // 縦幅100px
// → 200px × 100pxの長方形
```

---

**5️⃣ キーポイント5：複数のスタイルの組み合わせ**

サイズ、色、背景色などの複数のスタイルプロパティを組み合わせることで、様々な見た目の要素を作れます。

**例：カラフルなボックス**
```javascript
const elem = document.getElementById("box");
elem.style.width = "300px";
elem.style.height = "150px";
elem.style.backgroundColor = "lightblue";
elem.style.color = "darkblue";
elem.style.fontSize = "24px";
```

- サイズ（width、height）
- 色（color、backgroundColor）
- 文字サイズ（fontSize）

これらを自由に組み合わせて、自分だけのデザインを作れます！

---

### 達成度チェックリスト

以下の項目ができるようになっていれば、**サイズ変更マスター**です！

- ✅ 単位（px）の意味を理解できた
- ✅ `style.fontSize` で文字の大きさを変更できる
- ✅ `style.width` で要素の幅を変更できる
- ✅ `style.height` で要素の高さを変更できる
- ✅ 引用符と単位を正しく使える（`"30px"`の形式）
- ✅ 正方形や長方形を自由に作れる
- ✅ サイズを大きくしたり小さくしたりできる
- ✅ 複数のスタイルプロパティを組み合わせて使える

**すべてチェックできましたか？** おめでとうございます！これで要素のサイズを自由に操作できるようになりました。

---

### 次回の学習（Lesson 018）

次回は、要素の**表示・非表示**を切り替える方法を学びます。

**学習内容：**
- `style.display` プロパティの使い方
- 要素を消す方法（`display = "none"`）
- 要素を現す方法（`display = "block"`）
- ボタンをクリックして要素を切り替える

**できるようになること：**
- 要素を消したり現したりする（マジックのような動き！）
- クリックで画像を表示/非表示する
- 秘密のメッセージを表示する仕掛け

要素を自由に消したり現したりできるようになると、インタラクティブなWebページが作れるようになります。楽しみにしていてください！

---

**お疲れ様でした！** 🎉

今回の学習で、要素のサイズを自由に変更できるようになりました。次回も一緒に頑張りましょう！
