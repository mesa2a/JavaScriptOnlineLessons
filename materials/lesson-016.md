---
title: "Lesson 016: 色を変える"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 016: 色を変える

---

## 今回の学習

### 前回の復習

前回は、複数のHTML要素を操作する方法を学びました。それぞれの要素に異なるidを付け、`getElementById()`で個別に取得することで、複数の要素の文字を個別に変更できるようになりました。id属性の一意性という重要なルールも学びました。

### 今回の目標

1. `style`プロパティの使い方を理解する
2. 要素の文字色を変更できるようになる
3. 要素の背景色を変更できるようになる

---

## styleプロパティとは

### styleプロパティの役割

`style`プロパティは、HTML要素の見た目（スタイル）を制御するためのプロパティです。これまで学んだ`textContent`が要素の「内容」を変更するのに対し、`style`は要素の「見た目」を変更します。

例えば、以下のようなことができます。

- 文字の色を変える
- 背景色を変える
- 文字の大きさを変える
- 要素のサイズを変える

今回は、色の変更に焦点を当てます。

### CSSとの関係

Web開発では、見た目を制御するために「CSS（Cascading Style Sheets）」という技術を使います。`style`プロパティは、このCSSをJavaScriptから操作するための仕組みです。

通常、CSSでは以下のように書きます。

```css
color: red;
background-color: yellow;
```

JavaScriptでは、これを以下のように書きます。

```javascript
elem.style.color = "red";
elem.style.backgroundColor = "yellow";
```

違いに注目してください。CSSの`background-color`（ハイフンあり）が、JavaScriptでは`backgroundColor`（キャメルケース）になっています。

---

## CSSプロパティのJavaScript記法

### キャメルケースとは

JavaScriptでCSSプロパティを使う場合、ハイフン（`-`）を使わず、ハイフンの後の文字を大文字にする「キャメルケース」という記法を使います。

**CSS記法とJavaScript記法の対応:**

| CSS記法 | JavaScript記法 |
|---------|---------------|
| `color` | `color` |
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `border-radius` | `borderRadius` |

ハイフンの後の文字が大文字になるのは、ラクダ（camel）のこぶのように見えるからです。

### なぜキャメルケースを使うのか

JavaScriptでは、変数名やプロパティ名にハイフン（`-`）を使うと、引き算として認識されてしまいます。

```javascript
// これはエラーになる
elem.style.background-color = "yellow";  // background - color と解釈される
```

そのため、ハイフンを削除して、次の文字を大文字にするキャメルケース記法を使います。

```javascript
// これは正しい
elem.style.backgroundColor = "yellow";
```

---

## 文字色を変える

### colorプロパティ

要素の文字色を変えるには、`style.color`プロパティを使います。

```javascript
// 要素を取得
let elem = document.getElementById("text");

// 文字色を赤に変更
elem.style.color = "red";
```

このコードを実行すると、要素の文字が赤色になります。

### 色の指定方法

色は、以下の方法で指定できます。

**1. 色の名前で指定**

```javascript
elem.style.color = "red";      // 赤
elem.style.color = "blue";     // 青
elem.style.color = "green";    // 緑
elem.style.color = "yellow";   // 黄色
elem.style.color = "orange";   // オレンジ
elem.style.color = "purple";   // 紫
elem.style.color = "pink";     // ピンク
```

**2. RGB値で指定**

```javascript
elem.style.color = "rgb(255, 0, 0)";    // 赤
elem.style.color = "rgb(0, 0, 255)";    // 青
elem.style.color = "rgb(0, 255, 0)";    // 緑
```

**3. 16進数カラーコードで指定**

```javascript
elem.style.color = "#ff0000";  // 赤
elem.style.color = "#0000ff";  // 青
elem.style.color = "#00ff00";  // 緑
```

初心者には、色の名前で指定する方法が分かりやすいです。

---

## 背景色を変える

### backgroundColorプロパティ

要素の背景色を変えるには、`style.backgroundColor`プロパティを使います。

```javascript
// 要素を取得
let elem = document.getElementById("text");

// 背景色を黄色に変更
elem.style.backgroundColor = "yellow";
```

このコードを実行すると、要素の背景が黄色になります。

### 文字色と背景色を同時に変更

文字色と背景色は、それぞれ独立して設定できます。

```javascript
// 要素を取得
let elem = document.getElementById("text");

// 文字色を白、背景色を黒に変更
elem.style.color = "white";
elem.style.backgroundColor = "black";
```

---

## 実践：カラフルなページを作る

### 虹色の7色を表示する

7つの要素を作り、それぞれ虹色（赤、橙、黄、緑、青、藍、紫）に変更してみましょう。

**HTML:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 016</title>
</head>
<body>
    <p id="color1">虹色1</p>
    <p id="color2">虹色2</p>
    <p id="color3">虹色3</p>
    <p id="color4">虹色4</p>
    <p id="color5">虹色5</p>
    <p id="color6">虹色6</p>
    <p id="color7">虹色7</p>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript:**

```javascript
// 7つの要素を取得
let elem1 = document.getElementById("color1");
let elem2 = document.getElementById("color2");
let elem3 = document.getElementById("color3");
let elem4 = document.getElementById("color4");
let elem5 = document.getElementById("color5");
let elem6 = document.getElementById("color6");
let elem7 = document.getElementById("color7");

// 虹色に変更
elem1.style.color = "red";      // 赤
elem2.style.color = "orange";   // 橙
elem3.style.color = "yellow";   // 黄
elem4.style.color = "green";    // 緑
elem5.style.color = "blue";     // 青
elem6.style.color = "indigo";   // 藍
elem7.style.color = "purple";   // 紫
```

このコードを実行すると、7つの文字がそれぞれ虹色に変わります。

---

## よくある色の組み合わせ

### 読みやすい配色

文字色と背景色の組み合わせによって、読みやすさが大きく変わります。

**読みやすい組み合わせ:**

```javascript
// 黒文字、白背景（標準）
elem.style.color = "black";
elem.style.backgroundColor = "white";

// 白文字、黒背景（反転）
elem.style.color = "white";
elem.style.backgroundColor = "black";

// 白文字、青背景
elem.style.color = "white";
elem.style.backgroundColor = "blue";
```

**読みにくい組み合わせ（避けるべき）:**

```javascript
// 黄色文字、白背景（コントラストが低い）
elem.style.color = "yellow";
elem.style.backgroundColor = "white";

// 赤文字、緑背景（色覚の問題）
elem.style.color = "red";
elem.style.backgroundColor = "green";
```

---

## よくある間違いと注意点

### 間違い1：CSSの記法をそのまま使う

```javascript
// これはエラーになる
elem.style.background-color = "yellow";  // ハイフンは使えない
```

正しくは以下のようになります。

```javascript
elem.style.backgroundColor = "yellow";  // キャメルケース
```

### 間違い2：色名のスペルミス

```javascript
elem.style.color = "yelow";  // スペルミス（正しくはyellow）
```

色名は英語のスペルを正確に書く必要があります。

### 間違い3：引用符を忘れる

```javascript
elem.style.color = red;  // 引用符がない（エラー）
```

正しくは以下のようになります。

```javascript
elem.style.color = "red";  // 引用符で囲む
```

### 間違い4：複数の値を一度に設定しようとする

```javascript
// これは動きません
elem.style = "color: red; background-color: yellow;";
```

正しくは、プロパティごとに個別に設定します。

```javascript
elem.style.color = "red";
elem.style.backgroundColor = "yellow";
```

---

## 練習問題

### 課題：カラフルなページを作る

3つの要素を作成し、それぞれに異なる色を設定してください。

### 保存場所

`exercises/lesson-016/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. `index.html` に3つの`<p>`要素を追加します
   - 1つ目：`id="text1"`
   - 2つ目：`id="text2"`
   - 3つ目：`id="text3"`
2. `script.js` で3つの要素を取得します
3. それぞれの要素の色を変更します
   - text1: 文字色を赤に
   - text2: 文字色を青に
   - text3: 背景色を黄色に

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-016
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**ヒント1：HTMLの書き方**

3つの`<p>`要素を作り、それぞれに異なるidと適当な文字を入れます。

```html
<p id="text1">赤い文字</p>
<p id="text2">青い文字</p>
<p id="text3">黄色い背景</p>
```

**ヒント2：要素の取得**

3つの変数を用意して、それぞれの要素を取得します。

```javascript
let elem1 = document.getElementById("text1");
let elem2 = document.getElementById("text2");
let elem3 = document.getElementById("text3");
```

**ヒント3：色の変更**

`style.color`で文字色、`style.backgroundColor`で背景色を変更します。

```javascript
elem1.style.color = "red";
elem2.style.color = "blue";
elem3.style.backgroundColor = "yellow";
```

**ヒント4：確認方法**

ブラウザで`index.html`を開いて、以下を確認してください。

- 1つ目の文字が赤色になっている
- 2つ目の文字が青色になっている
- 3つ目の背景が黄色になっている

---

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 016</title>
</head>
<body>
    <p id="text1">赤い文字</p>
    <p id="text2">青い文字</p>
    <p id="text3">黄色い背景</p>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
// 3つの要素を取得
let elem1 = document.getElementById("text1");
let elem2 = document.getElementById("text2");
let elem3 = document.getElementById("text3");

// それぞれの色を変更
elem1.style.color = "red";
elem2.style.color = "blue";
elem3.style.backgroundColor = "yellow";
```

### 解説

**HTMLファイル:**

9行目から11行目で、3つの`<p>`要素を作成しています。それぞれに`text1`、`text2`、`text3`という異なるidを付けています。

要素の中には「赤い文字」「青い文字」「黄色い背景」という説明的な文字を入れていますが、これは任意の文字で構いません。

**JavaScriptファイル:**

2行目から4行目で、3つの要素を取得しています。`getElementById()`を3回使って、それぞれの要素を異なる変数に保存しています。

7行目では、`elem1`の文字色を赤（`"red"`）に設定しています。

8行目では、`elem2`の文字色を青（`"blue"`）に設定しています。

9行目では、`elem3`の背景色を黄色（`"yellow"`）に設定しています。文字色ではなく背景色なので、`backgroundColor`プロパティを使っています。

このコードを実行すると、1つ目の文字が赤、2つ目の文字が青、3つ目の背景が黄色になります。

---

## まとめ

### 今回学んだこと

**キーポイント1：styleプロパティ**

`style`プロパティは、HTML要素の見た目を制御するためのプロパティです。`textContent`が要素の内容を変更するのに対し、`style`は要素の見た目を変更します。色、サイズ、配置など、様々な見た目を制御できます。

**キーポイント2：CSSプロパティのJavaScript記法**

CSSのプロパティ名をJavaScriptで使う場合、ハイフン（`-`）を削除し、ハイフンの後の文字を大文字にする「キャメルケース」記法を使います。例えば、`background-color`は`backgroundColor`になります。

**キーポイント3：色の変更**

文字色は`style.color`、背景色は`style.backgroundColor`で変更できます。色は、色の名前（`"red"`、`"blue"`など）、RGB値、16進数カラーコードで指定できます。初心者には色の名前が分かりやすいです。

**キーポイント4：複数のプロパティ**

1つの要素に対して、複数のスタイルプロパティを設定できます。文字色と背景色を同時に設定することで、様々な配色を作れます。ただし、読みやすさを考慮して配色を選ぶことが大切です。

---

### 次回の学習

次回は、要素のサイズを変える方法を学びます。`style.fontSize`、`style.width`、`style.height`を使って、文字の大きさや要素のサイズを自由に変更できるようになります。楽しみにしていてください。

お疲れ様でした。
