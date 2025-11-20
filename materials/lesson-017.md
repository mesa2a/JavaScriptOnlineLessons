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

---

## 単位（px）とは

### pxの意味

Webページでサイズを指定するときは、「単位」を付ける必要があります。最もよく使われる単位が「px（ピクセル）」です。

pxは「pixel（ピクセル）」の略で、画面を構成する最小の点のことです。例えば、「30px」と指定すると、「30個のピクセル分の大きさ」という意味になります。

### なぜ単位が必要なのか

数字だけでは、何の単位なのか分かりません。

```javascript
elem.style.fontSize = "30";  // 30って何？ 30cm？ 30mm？
```

単位を付けることで、明確に大きさを指定できます。

```javascript
elem.style.fontSize = "30px";  // 30ピクセルの大きさ
```

### 他の単位

pxの他にも、いくつかの単位があります。

- **px（ピクセル）**: 固定の大きさ
- **%（パーセント）**: 親要素に対する割合
- **em**: 現在の文字サイズに対する倍率
- **rem**: ルート要素の文字サイズに対する倍率

初心者には、pxが最も分かりやすいです。今回はpxを使います。

---

## 文字の大きさを変える

### fontSizeプロパティ

文字の大きさを変えるには、`style.fontSize`プロパティを使います。

```javascript
// 要素を取得
let elem = document.getElementById("text");

// 文字の大きさを30pxに変更
elem.style.fontSize = "30px";
```

このコードを実行すると、文字が30ピクセルの大きさになります。

### 様々な大きさ

```javascript
elem.style.fontSize = "10px";   // 小さい文字
elem.style.fontSize = "20px";   // 普通の文字（デフォルト）
elem.style.fontSize = "30px";   // 少し大きい文字
elem.style.fontSize = "50px";   // 大きい文字
elem.style.fontSize = "100px";  // とても大きい文字
```

一般的に、Webページの本文は14px～16px程度です。見出しは20px～40px程度が多いです。

### 注意点：引用符で囲む

数値と単位を合わせて、必ず引用符（`""`）で囲みます。

```javascript
elem.style.fontSize = "30px";   // 正しい
elem.style.fontSize = 30px;     // エラー（引用符がない）
elem.style.fontSize = 30;       // 動かない（単位がない）
```

---

## 要素の幅を変える

### widthプロパティ

要素の幅（横の長さ）を変えるには、`style.width`プロパティを使います。

```javascript
// 要素を取得
let elem = document.getElementById("box");

// 幅を200pxに変更
elem.style.width = "200px";
```

このコードを実行すると、要素の幅が200ピクセルになります。

### 幅の変化を見る

幅を変えると、要素がどのように変化するのか見てみましょう。

```html
<p id="box" style="background-color: lightblue;">テキスト</p>
```

```javascript
let elem = document.getElementById("box");

elem.style.width = "100px";   // 狭い
elem.style.width = "300px";   // 普通
elem.style.width = "500px";   // 広い
```

背景色を付けると、幅の変化が分かりやすくなります。

---

## 要素の高さを変える

### heightプロパティ

要素の高さ（縦の長さ）を変えるには、`style.height`プロパティを使います。

```javascript
// 要素を取得
let elem = document.getElementById("box");

// 高さを100pxに変更
elem.style.height = "100px";
```

このコードを実行すると、要素の高さが100ピクセルになります。

### 幅と高さを同時に変更

幅と高さは、それぞれ独立して設定できます。

```javascript
let elem = document.getElementById("box");

// 幅200px、高さ100pxの長方形
elem.style.width = "200px";
elem.style.height = "100px";

// 背景色も付ける
elem.style.backgroundColor = "lightblue";
```

---

## 実践：サイズを自由に変更する

### 3つの要素のサイズを変える

3つの要素を作り、それぞれ異なるサイズに変更してみましょう。

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
let elem1 = document.getElementById("text1");
let elem2 = document.getElementById("text2");
let elem3 = document.getElementById("text3");

// それぞれの文字サイズを変更
elem1.style.fontSize = "10px";   // 小さい
elem2.style.fontSize = "20px";   // 普通
elem3.style.fontSize = "40px";   // 大きい
```

このコードを実行すると、3つの文字が異なる大きさで表示されます。

---

## ボックスを作る

### 幅と高さと背景色を組み合わせる

`width`、`height`、`backgroundColor`を組み合わせると、カラフルなボックスを作れます。

```html
<div id="box">ボックス</div>
```

```javascript
let elem = document.getElementById("box");

// サイズと色を設定
elem.style.width = "200px";
elem.style.height = "200px";
elem.style.backgroundColor = "skyblue";
elem.style.color = "white";
elem.style.fontSize = "30px";
```

これで、200px × 200pxの青いボックスに、白い30pxの文字が表示されます。

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

### 課題：3つの要素のサイズを変更する

3つの要素を作成し、それぞれ異なるサイズに変更してください。

### 保存場所

`exercises/lesson-017/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. `index.html` に3つの`<p>`要素を追加します
   - 1つ目：`id="text1"`
   - 2つ目：`id="text2"`
   - 3つ目：`id="box"`
2. `script.js` で3つの要素を取得します
3. それぞれの要素のサイズを変更します
   - text1: 文字サイズを20pxに
   - text2: 文字サイズを40pxに
   - box: 幅を300px、高さを150pxに

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-017
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**ヒント1：HTMLの書き方**

3つの`<p>`要素を作り、それぞれに異なるidと適当な文字を入れます。

```html
<p id="text1">小さい文字</p>
<p id="text2">大きい文字</p>
<p id="box">ボックス</p>
```

**ヒント2：要素の取得**

3つの変数を用意して、それぞれの要素を取得します。

```javascript
let elem1 = document.getElementById("text1");
let elem2 = document.getElementById("text2");
let elem3 = document.getElementById("box");
```

**ヒント3：サイズの変更**

`style.fontSize`で文字サイズ、`style.width`と`style.height`で要素のサイズを変更します。

```javascript
elem1.style.fontSize = "20px";
elem2.style.fontSize = "40px";
elem3.style.width = "300px";
elem3.style.height = "150px";
```

**ヒント4：確認方法**

ブラウザで`index.html`を開いて、以下を確認してください。

- 1つ目の文字が20pxの大きさになっている
- 2つ目の文字が40pxの大きさになっている
- 3つ目の要素に背景色を付けると、サイズの変化が分かりやすい

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
let elem1 = document.getElementById("text1");
let elem2 = document.getElementById("text2");
let elem3 = document.getElementById("box");

// それぞれのサイズを変更
elem1.style.fontSize = "20px";
elem2.style.fontSize = "40px";
elem3.style.width = "300px";
elem3.style.height = "150px";
```

### 解説

**HTMLファイル:**

9行目から11行目で、3つの`<p>`要素を作成しています。それぞれに`text1`、`text2`、`box`という異なるidを付けています。

要素の中には「小さい文字」「大きい文字」「ボックス」という説明的な文字を入れていますが、これは任意の文字で構いません。

**JavaScriptファイル:**

2行目から4行目で、3つの要素を取得しています。`getElementById()`を3回使って、それぞれの要素を異なる変数に保存しています。

7行目では、`elem1`の文字サイズを20px（`"20px"`）に設定しています。

8行目では、`elem2`の文字サイズを40px（`"40px"`）に設定しています。

9行目では、`elem3`の幅を300px（`"300px"`）に設定しています。

10行目では、`elem3`の高さを150px（`"150px"`）に設定しています。

このコードを実行すると、1つ目の文字が20pxの大きさ、2つ目の文字が40pxの大きさになり、3つ目の要素が300px × 150pxのサイズになります。

3つ目の要素に背景色を付けると、サイズの変化がより分かりやすくなります。

```javascript
elem3.style.backgroundColor = "lightblue";
```

---

## まとめ

### 今回学んだこと

**キーポイント1：単位（px）の意味**

Webページでサイズを指定するときは、「px（ピクセル）」という単位を使います。pxは画面を構成する最小の点のことで、数値だけでなく単位も付けることで、明確に大きさを指定できます。

**キーポイント2：文字サイズの変更**

`style.fontSize`プロパティを使って、文字の大きさを変更できます。`elem.style.fontSize = "30px"`のように、数値と単位を引用符で囲んで指定します。一般的な本文は14px～16px程度です。

**キーポイント3：要素サイズの変更**

`style.width`で要素の幅、`style.height`で要素の高さを変更できます。これらも`"200px"`のように、数値と単位を引用符で囲んで指定します。幅と高さは独立して設定できます。

**キーポイント4：複数のスタイルの組み合わせ**

サイズ、色、背景色などの複数のスタイルプロパティを組み合わせることで、様々な見た目の要素を作れます。例えば、幅・高さ・背景色を設定すると、カラフルなボックスを作ることができます。

---

### 次回の学習

次回は、要素の表示・非表示を切り替える方法を学びます。`style.display`プロパティを使って、要素を消したり現したりできるようになります。マジックのような動きを作れるので、楽しみにしていてください。

お疲れ様でした。
