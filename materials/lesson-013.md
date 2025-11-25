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

DOMは「Document Object Model（ドキュメント・オブジェクト・モデル）」の略で、HTMLの構造をJavaScriptから操作するための仕組みです。

ブラウザがHTMLファイルを読み込むと、その内容を「オブジェクト」として扱えるようにします。このオブジェクトの構造がDOMです。

### もっと簡単に言うと

DOMは、「Webページの設計図」のようなものです。

- **HTML**は、「見出しを表示」「段落を表示」といった指示書
- **DOM**は、ブラウザがその指示書を読み込んで作った「実際のページの構造」
- **JavaScript**は、そのDOMを操作して「見出しの文字を変える」「色を変える」といったことができる

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

**ポイント：** この木の構造を「DOMツリー」と呼びます。JavaScriptを使うと、このツリーの中の要素を取得したり、変更したりできます。

### なぜDOMが必要なのか

DOMがあることで、JavaScriptから以下のことができます。

- **ページの内容を取得する** ← 今回学ぶこと！
- ページの内容を変更する（次回以降）
- 新しい要素を追加する（次回以降）
- 要素を削除する（次回以降）
- ユーザーの操作に反応する（次回以降）

今回は、最初のステップとして「ページの要素を取得する」方法を学びます。

### 具体例で理解する

例えば、Webページに「Hello」という文字が表示されているとします。

```html
<p id="text">Hello</p>
```

DOMを使うと、JavaScriptでこの`<p>`タグを見つけて、以下のようなことができます。

- 「Hello」という文字を読み取る
- 「Hello」を「こんにちは」に変更する
- 文字の色を赤にする
- 文字を大きくする

これらすべてが、**ページを開いた後に、JavaScriptで動的に**できるのです！

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

**読み方：** 「ドキュメント・ゲット・エレメント・バイ・アイディー」

**分解して理解する：**

- `document` = 現在のWebページ全体
- `getElementById` = idによって要素を取得する
- `("text")` = idが"text"の要素

つまり、「Webページ全体の中から、idが"text"である要素を見つけてきて」という命令です。

### 実際に試してみよう

以下のコードをHTMLファイルに入力してください。

```html
<p id="text">Hello</p>

<script>
console.log(document.getElementById("text"));
</script>
```

**手順：**

1. このコードをHTMLファイルに書く
2. ファイルを保存する
3. ブラウザで開く
4. F12キーを押してコンソールを開く

コンソールには、以下のような表示があります。

```
<p id="text">Hello</p>
```

これは、`<p id="text">Hello</p>` という要素が**正しく取得できた**ことを示しています。

**重要：** コンソールに表示された要素は、「オブジェクト」として扱われています。この要素を使って、文字を変えたり、色を変えたりできるようになります（次回以降）。

### documentとは

`document` は、現在のWebページ全体を表す**特別なオブジェクト**です。

ブラウザがHTMLファイルを読み込むと、自動的に `document` オブジェクトが作られます。これがDOMの入り口です。

`document.getElementById()` は、「document（ページ全体）の中から、指定したidを持つ要素を取得する」という意味になります。

**イメージ：**

- `document` = 図書館全体
- `getElementById("text")` = 「"text"というラベルが貼られた本を探してきて」という指示

このように、`document` を起点にして、ページ内のあらゆる要素にアクセスできます。

---

## 取得した要素を変数に保存する

### なぜ変数に保存するのか

取得した要素を変数に保存すると、後で何度も使えます。

```javascript
let element = document.getElementById("text");
console.log(element);
```

この例では、取得した要素を `element` という変数に保存しています。

**変数に保存する利点：**

毎回 `document.getElementById("text")` と書くのは大変です。変数に保存すれば、短い名前で何度も使えます。

```javascript
// 変数に保存しない場合（毎回長い）
console.log(document.getElementById("text"));
document.getElementById("text").textContent = "変更";  // 次回学ぶ

// 変数に保存した場合（短くて便利）
const element = document.getElementById("text");
console.log(element);
element.textContent = "変更";  // 次回学ぶ
```

**さらに重要：** 要素を一度取得して変数に保存すれば、その要素が存在しているか確認してから操作できるので、エラーを防げます。

### constを使う

取得した要素は通常変更しないので、`const` を使うのが一般的です。

```javascript
const element = document.getElementById("text");
console.log(element);
```

**なぜconstを使うのか？**

変数 `element` に保存されるのは、「要素への参照（場所を指し示す情報）」です。この参照自体は変更する必要がないので、`const` を使います。

```javascript
const element = document.getElementById("text");
// element = document.getElementById("other");  // これはエラー（再代入できない）
```

ただし、要素の**内容**（文字や色など）は後で変更できます。これは次回以降学びます。

### 変数名の付け方

要素を保存する変数には、わかりやすい名前をつけましょう。

```javascript
const textElement = document.getElementById("text");
const titleElement = document.getElementById("title");
const messageElement = document.getElementById("message");
```

要素の役割がわかる名前をつけると、コードが読みやすくなります。

**良い命名の例：**

```javascript
// ○ 良い例（役割がわかる）
const greetingElement = document.getElementById("greeting");
const userNameElement = document.getElementById("userName");
const submitButton = document.getElementById("submitBtn");

// △ 悪くはないが、やや曖昧
const elem1 = document.getElementById("greeting");
const elem2 = document.getElementById("userName");

// × 悪い例（何のための変数かわからない）
const a = document.getElementById("greeting");
const x = document.getElementById("userName");
```

**命名のコツ：**

- 要素の役割や内容を表す名前にする
- 複数の単語を組み合わせる場合は、キャメルケース（最初の単語は小文字、2つ目以降の単語の最初は大文字）を使う
- `Element`や`Elem`を末尾につけると、要素であることが明確になる

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

**重要：** 各課題を実行したら、必ずF12キーでコンソールを開いて結果を確認してください。コンソールに要素が表示されていれば成功です！

### 課題1：基本の要素取得

**目標：** 要素を取得してコンソールに表示する基本操作を身につける

以下のHTMLを作成し、要素を取得してコンソールに表示してください。

```html
<p id="greeting">こんにちは</p>
```

**手順：**

1. `<p id="greeting">こんにちは</p>` をHTMLに追加
2. scriptタグの中で `document.getElementById("greeting")` を使って要素を取得
3. `console.log()` でコンソールに表示
4. ブラウザで開いてコンソールを確認

### 課題2：複数の要素取得

**目標：** 複数の要素を取得して、それぞれを変数に保存する

以下の3つの要素を作成し、それぞれを取得してコンソールに表示してください。

- h1タグ（id="title"）：「私のページ」
- pタグ（id="intro"）：「自己紹介です」
- pタグ（id="hobby"）：「趣味は読書です」

**手順：**

1. 3つのHTML要素を作成（それぞれに正しいidをつける）
2. 3つの変数を作成して、それぞれの要素を取得
3. 3つの `console.log()` で表示
4. コンソールで3つの要素が表示されることを確認

**ポイント：** 変数名は要素の役割がわかる名前にしましょう（例：`titleElement`、`introElement`、`hobbyElement`）

### 課題3：存在しないidの確認

**目標：** 存在しないidを指定した場合の挙動を理解する

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

**確認すること：**

- `element1` には何が表示されるか？（存在する要素）
- `element2` には何が表示されるか？（存在しない要素）
- `null` が表示される意味を理解する

**学べること：** 要素が見つからない場合は `null` が返されることを確認できます。これは、後でエラーチェックをする際に重要です。

### 課題4：自己紹介ページの要素

**目標：** 実用的なWebページを作る準備として、複数の要素を扱う

自己紹介ページに使う以下の要素を作成し、取得してください。

- h1タグ：名前
- pタグ：年齢
- pタグ：趣味
- pタグ：一言メッセージ

**手順：**

1. 4つのHTML要素を作成（それぞれに適切なidをつける）
2. 4つの変数を作成して、それぞれの要素を取得（`const`を使用）
3. 4つの `console.log()` で表示
4. コンソールで4つの要素が正しく取得できていることを確認

**応用：** 次回以降、この構造を使って実際に自己紹介ページを完成させていきます！

---

## 解答例

### 解答例（課題1）

```html
<p id="greeting">こんにちは</p>

<script>
const greetingElement = document.getElementById("greeting");
console.log(greetingElement);
</script>
```

**解説：**

- `const` を使って要素を変数に保存
- 変数名は `greetingElement` のように、役割がわかる名前に
- コンソールには `<p id="greeting">こんにちは</p>` と表示される

---

### 解答例（課題2）

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

**解説：**

- 3つの要素にそれぞれ異なるidを設定
- それぞれの要素を別々の変数に保存
- 変数名は `titleElement`、`introElement`、`hobbyElement` のように一貫性を持たせる
- コンソールには3つの要素が順番に表示される

**よくある間違い：**

- idのスペルミス：`document.getElementById("titel")` のような誤字
- 同じidを複数の要素に使ってしまう（idは一意でなければならない）

---

### 解答例（課題4）

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

**解説：**

- 4つの要素をそれぞれ取得して変数に保存
- 各要素に意味のあるidをつける（`name`、`age`、`hobby`、`message`）
- 変数名も統一感のある命名規則に従う
- 次回以降、これらの要素の内容を動的に変更する方法を学ぶ

**応用のヒント：**

現時点では要素を取得してコンソールに表示するだけですが、次回からは以下のようなことができるようになります：

- ボタンをクリックしたら名前を変更
- 入力欄に入力した内容を年齢に反映
- 趣味を動的に更新

今回の「要素の取得」は、すべての基礎となる重要なステップです！

---

## まとめ

### 今回学んだこと

**キーポイント1：DOMとは**

DOMは「Document Object Model」の略で、HTMLの構造をJavaScriptから操作するための仕組みです。ブラウザがHTMLを読み込むと、DOMツリーという木構造が作られ、JavaScriptはこのツリーを通じてページの内容を取得・変更できます。

**キーポイント2：要素の取得方法**

`document.getElementById("id名")` で、指定したidを持つ要素を取得できます。

```javascript
const element = document.getElementById("text");
```

- `document` = Webページ全体を表すオブジェクト
- `getElementById()` = idで要素を探すメソッド
- 戻り値 = 見つかった要素（見つからなければ `null`）

**キーポイント3：変数への保存**

取得した要素は変数（通常はconst）に保存して、後で使えるようにします。

```javascript
const textElement = document.getElementById("text");
console.log(textElement);
```

変数名は、要素の役割がわかるように命名することが重要です。

**キーポイント4：scriptタグの位置**

要素を取得するJavaScriptは、HTML要素の後に書きます。これは、ブラウザが上から順番に読み込むためです。

```html
<!-- ○ 正しい順序 -->
<p id="text">Hello</p>
<script>
  const element = document.getElementById("text"); // 要素が存在する
</script>

<!-- × 間違った順序 -->
<script>
  const element = document.getElementById("text"); // まだ要素がない → null
</script>
<p id="text">Hello</p>
```

### 今回の達成事項 ✅

- DOMの概念を理解した
- `document.getElementById()` で要素を取得できるようになった
- 取得した要素を変数に保存できるようになった
- scriptタグの正しい配置場所を理解した

### 次回予告

次回（Lesson 014）では、取得した要素の**内容を変更する**方法を学びます！

- `textContent` プロパティで文字を変更
- ボタンをクリックしたら文字が変わる仕組み
- インタラクティブなWebページの第一歩

今回学んだ「要素の取得」は、次回の「要素の変更」の基礎となります。しっかり復習しておきましょう！

---
