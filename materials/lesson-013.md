---
title: "Lesson 013: 要素を取得する"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 013: 要素を取得する

---

## 今回の学習

### 前回の復習

前回は、第1章の総復習を行いました。console.log、alert、変数（let/const）、文字列連結、計算など、これまで学んだすべての内容を振り返り、自己紹介ページを作成しました。

### 今回の目標

1. DOMとは何かを理解する
2. HTMLに要素を追加できる
3. document.getElementByIdで要素を取得できる
4. 取得した要素を変数に保存できる

---

## 第2章の概要

### 新しい章の始まり

第2章では、「ブラウザを操作する」ことを学びます。

第1章では、結果をコンソールやalertで表示していました。これはデバッグには便利ですが、ユーザーに見せるには適していません。

第2章では、Webページの中に直接結果を表示したり、ボタンをクリックしたときに処理を実行したりする方法を学びます。

### 第2章で学ぶこと

- HTMLの要素を取得する（今回）
- 要素の内容を変更する
- ボタンをクリックしたときに処理を実行する
- ユーザーから入力を受け取る

これらを学ぶと、インタラクティブなWebページを作れるようになります。

---

## DOMとは

### Document Object Model

DOMは「Document Object Model」の略で、HTMLの構造をJavaScriptから操作するための仕組みです。

ブラウザがHTMLファイルを読み込むと、その内容を「オブジェクト」として扱えるようにします。このオブジェクトの構造がDOMです。

### DOMのイメージ

HTMLは以下のような構造を持っています。

```html
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>見出し</h1>
    <p>本文</p>
  </body>
</html>
```

DOMでは、これが木（ツリー）のような構造として表現されます。

```
html
├── head
│   └── title
└── body
    ├── h1
    └── p
```

JavaScriptを使うと、このツリーの中の要素を取得したり、変更したりできます。

### なぜDOMが必要なのか

DOMがあることで、JavaScriptから以下のことができます。

- ページの内容を取得する
- ページの内容を変更する
- 新しい要素を追加する
- 要素を削除する
- ユーザーの操作に反応する

今回は、最初のステップとして「ページの要素を取得する」方法を学びます。

---

## HTMLに要素を追加する

### 今までのHTMLファイル

これまで作成してきたHTMLファイルは、scriptタグだけでした。

```html
<script>
console.log("Hello");
</script>
```

### 要素を追加する

今回から、scriptタグの前にHTML要素を追加します。

```html
<p id="text">Hello</p>

<script>
console.log("JavaScript is running");
</script>
```

このコードでは、`<p>` タグを追加しています。

### pタグとは

`<p>` タグは「paragraph（段落）」を表すタグです。テキストを表示するために使います。

```html
<p>これは段落です</p>
```

ブラウザでこのHTMLファイルを開くと、「これは段落です」という文字が画面に表示されます。

### id属性とは

`id="text"` の部分は「id属性」と呼ばれます。

```html
<p id="text">Hello</p>
```

idは、要素に名前をつけるためのものです。この名前を使って、JavaScriptから要素を特定します。

idには以下のルールがあります。

- 同じページ内で同じidは使えない（一意である必要がある）
- 英字で始める
- 英字、数字、ハイフン、アンダースコアが使える

---

## 要素を取得する

### document.getElementById

JavaScriptから HTML要素を取得するには、`document.getElementById()` を使います。

```javascript
document.getElementById("text");
```

このコードは、「idが"text"である要素を取得する」という意味です。

### 実際に試してみよう

以下のコードをHTMLファイルに入力してください。

```html
<p id="text">Hello</p>

<script>
console.log(document.getElementById("text"));
</script>
```

ブラウザで開いて、コンソールを確認してください。

コンソールには、以下のような表示があります。

```
<p id="text">Hello</p>
```

これは、`<p id="text">Hello</p>` という要素が取得できたことを示しています。

### documentとは

`document` は、現在のWebページ全体を表すオブジェクトです。

`document.getElementById()` は、「document（ページ全体）の中から、指定したidを持つ要素を取得する」という意味になります。

---

## 取得した要素を変数に保存する

### なぜ変数に保存するのか

取得した要素を変数に保存すると、後で何度も使えます。

```javascript
let element = document.getElementById("text");
console.log(element);
```

この例では、取得した要素を `element` という変数に保存しています。

### constを使う

取得した要素は通常変更しないので、`const` を使うのが一般的です。

```javascript
const element = document.getElementById("text");
console.log(element);
```

### 変数名の付け方

要素を保存する変数には、わかりやすい名前をつけましょう。

```javascript
const textElement = document.getElementById("text");
const titleElement = document.getElementById("title");
const messageElement = document.getElementById("message");
```

要素の役割がわかる名前をつけると、コードが読みやすくなります。

---

## 複数の要素を取得する

### 複数のidを持つHTML

HTMLに複数の要素を追加して、それぞれを取得してみましょう。

```html
<h1 id="title">ページタイトル</h1>
<p id="message">メッセージ</p>
<p id="footer">フッター</p>

<script>
const titleElement = document.getElementById("title");
const messageElement = document.getElementById("message");
const footerElement = document.getElementById("footer");

console.log(titleElement);
console.log(messageElement);
console.log(footerElement);
</script>
```

このコードを実行すると、コンソールに3つの要素が表示されます。

```
<h1 id="title">ページタイトル</h1>
<p id="message">メッセージ</p>
<p id="footer">フッター</p>
```

### h1タグとは

`<h1>` タグは「heading（見出し）」を表すタグです。h1からh6まであり、数字が小さいほど重要な見出しを表します。

```html
<h1>大見出し</h1>
<h2>中見出し</h2>
<h3>小見出し</h3>
```

---

## 存在しないidを指定した場合

### nullが返される

存在しないidを指定すると、`null` が返されます。

```html
<p id="text">Hello</p>

<script>
const element = document.getElementById("nonexistent");
console.log(element);  // null
</script>
```

`null` は「何もない」ことを表す特別な値です。

### よくある間違い

idが見つからない原因として、以下のようなものがあります。

**スペルミス**

```javascript
// HTML: <p id="text">
document.getElementById("texts");  // "text" ではなく "texts"
```

**大文字小文字の間違い**

```javascript
// HTML: <p id="text">
document.getElementById("Text");  // "text" ではなく "Text"
```

idは大文字小文字を区別するので、正確に書く必要があります。

**idの付け忘れ**

```html
<p>Hello</p>  <!-- idがない -->

<script>
document.getElementById("text");  // null
</script>
```

要素を取得するには、必ずidを付ける必要があります。

---

## scriptタグの位置

### なぜ要素の後にscriptを書くのか

今回のコードでは、HTML要素の後にscriptタグを書いています。

```html
<p id="text">Hello</p>

<script>
const element = document.getElementById("text");
</script>
```

これには理由があります。

### ブラウザの読み込み順序

ブラウザはHTMLファイルを上から順番に読み込みます。

もしscriptタグを要素より前に書くと、要素がまだ読み込まれていない状態でJavaScriptが実行されます。

```html
<script>
// この時点では <p id="text"> はまだ存在しない
const element = document.getElementById("text");
console.log(element);  // null
</script>

<p id="text">Hello</p>
```

この場合、`document.getElementById("text")` は `null` を返します。

### 正しい順序

要素を取得するJavaScriptは、要素の後に書きます。

```html
<p id="text">Hello</p>

<script>
// この時点では <p id="text"> は存在する
const element = document.getElementById("text");
console.log(element);  // <p id="text">Hello</p>
</script>
```

これで、正しく要素を取得できます。

---

## 練習問題

### 保存場所

`exercises/lesson-013/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 課題1：基本の要素取得

以下のHTMLを作成し、要素を取得してコンソールに表示してください。

```html
<p id="greeting">こんにちは</p>
```

### 課題2：複数の要素取得

以下の3つの要素を作成し、それぞれを取得してコンソールに表示してください。

- h1タグ（id="title"）：「私のページ」
- pタグ（id="intro"）：「自己紹介です」
- pタグ（id="hobby"）：「趣味は読書です」

### 課題3：存在しないidの確認

以下のコードを実行して、存在しないidを指定した場合の結果を確認してください。

```html
<p id="text">Hello</p>

<script>
const element1 = document.getElementById("text");
const element2 = document.getElementById("message");

console.log("element1:", element1);
console.log("element2:", element2);
</script>
```

### 課題4：自己紹介ページの要素

自己紹介ページに使う以下の要素を作成し、取得してください。

- h1タグ：名前
- pタグ：年齢
- pタグ：趣味
- pタグ：一言メッセージ

---

**解答例（課題1）**

```html
<p id="greeting">こんにちは</p>

<script>
const greetingElement = document.getElementById("greeting");
console.log(greetingElement);
</script>
```

**解答例（課題2）**

```html
<h1 id="title">私のページ</h1>
<p id="intro">自己紹介です</p>
<p id="hobby">趣味は読書です</p>

<script>
const titleElement = document.getElementById("title");
const introElement = document.getElementById("intro");
const hobbyElement = document.getElementById("hobby");

console.log(titleElement);
console.log(introElement);
console.log(hobbyElement);
</script>
```

**解答例（課題4）**

```html
<h1 id="name">山田太郎</h1>
<p id="age">25歳</p>
<p id="hobby">趣味：読書</p>
<p id="message">よろしくお願いします</p>

<script>
const nameElement = document.getElementById("name");
const ageElement = document.getElementById("age");
const hobbyElement = document.getElementById("hobby");
const messageElement = document.getElementById("message");

console.log(nameElement);
console.log(ageElement);
console.log(hobbyElement);
console.log(messageElement);
</script>
```

---

## まとめ

### 今回学んだこと

**キーポイント1：DOMとは**

DOMは、HTMLの構造をJavaScriptから操作するための仕組みです。これにより、ページの内容を取得・変更できます。

**キーポイント2：要素の取得方法**

`document.getElementById("id名")` で、指定したidを持つ要素を取得できます。

**キーポイント3：変数への保存**

取得した要素は変数（通常はconst）に保存して、後で使えるようにします。

**キーポイント4：scriptタグの位置**

要素を取得するJavaScriptは、HTML要素の後に書きます。これは、ブラウザが上から順番に読み込むためです。

---
