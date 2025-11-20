---
title: "Lesson 014: 文字を変更する"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 014: 文字を変更する

---

## 今回の学習

### 前回の復習

前回は、DOM（Document Object Model）という概念を学び、`document.getElementById()`を使ってHTML要素を取得する方法を学習しました。変数に要素を保存し、コンソールで確認することができるようになりました。

### 今回の目標

1. 取得した要素の文字を変更できるようになる
2. `textContent`プロパティの使い方を理解する
3. 画面に表示されている文字を動的に変更できるようになる

---

## プロパティとは

### プロパティの概念

プロパティとは、オブジェクト（ここでは要素）が持っている「特性」や「属性」のことです。箱に例えると、箱の中に入っている情報や設定値のようなものです。

例えば、人に例えると以下のようなプロパティがあります。

- `name`プロパティ: 名前（"山田太郎"）
- `age`プロパティ: 年齢（25）
- `height`プロパティ: 身長（170）

HTML要素も同じように、様々なプロパティを持っています。

- `textContent`プロパティ: 要素の中のテキスト
- `style`プロパティ: 要素の見た目（色、サイズなど）
- `id`プロパティ: 要素のID

今回学ぶ`textContent`は、要素の中に表示されているテキストを表すプロパティです。

### プロパティへのアクセス方法

プロパティにアクセスするには、ドット（`.`）を使います。

```javascript
要素.プロパティ名
```

この形で、要素が持っているプロパティの値を取得したり、変更したりできます。

---

## textContentプロパティ

### textContentとは

`textContent`は、HTML要素の中に表示されているテキスト（文字）を表すプロパティです。このプロパティを使うことで、以下の2つのことができます。

1. **読み取り**: 今表示されている文字を取得する
2. **変更**: 表示されている文字を変更する

### textContentで文字を読み取る

まず、要素の中の文字を読み取ってみましょう。

HTMLファイルに以下の要素があるとします。

```html
<p id="text">Hello</p>
```

この要素の文字を取得するコードは以下のようになります。

```javascript
// 要素を取得
let elem = document.getElementById("text");

// textContentで文字を取得
console.log(elem.textContent);  // "Hello" と表示される
```

`elem.textContent`で、要素の中の文字（"Hello"）を取得できます。

### textContentで文字を変更する

次に、要素の中の文字を変更してみましょう。

```javascript
// 要素を取得
let elem = document.getElementById("text");

// textContentで文字を変更
elem.textContent = "変わった！";
```

このコードを実行すると、画面上の文字が"Hello"から"変わった！"に変わります。

重要なポイントは、**ブラウザの画面がリアルタイムで変わる**ということです。ファイルを保存してリロードする必要はありません。JavaScriptが実行された瞬間に、画面の表示が変わります。

---

## 実践：文字を変更してみよう

### 手順1：HTMLファイルを用意する

まず、HTML要素を用意します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 014</title>
</head>
<body>
    <p id="text">Hello</p>

    <script src="script.js"></script>
</body>
</html>
```

この段階では、画面には"Hello"と表示されています。

### 手順2：要素を取得する

JavaScriptファイル（`script.js`）で、要素を取得します。

```javascript
// id="text"の要素を取得
let elem = document.getElementById("text");
```

前回学んだ`getElementById()`を使って、id属性が"text"の要素を取得し、変数`elem`に保存します。

### 手順3：文字を変更する

取得した要素の`textContent`プロパティを変更します。

```javascript
// id="text"の要素を取得
let elem = document.getElementById("text");

// 文字を変更
elem.textContent = "変わった！";
```

このコードを実行すると、画面の"Hello"が"変わった！"に変わります。

### 手順4：何度も変更する

一度変更したら、また別の文字に変更することもできます。

```javascript
// id="text"の要素を取得
let elem = document.getElementById("text");

// 1回目の変更
elem.textContent = "変わった！";

// 2回目の変更
elem.textContent = "また変わった！";

// 3回目の変更
elem.textContent = "何度でも変わる";
```

ただし、このコードでは最後の"何度でも変わる"しか表示されません。なぜなら、JavaScriptは上から順番に実行されるため、最後の値で上書きされるからです。

---

## 文字変更の仕組み

### なぜ画面が変わるのか

JavaScriptがHTML要素の`textContent`を変更すると、ブラウザは自動的に画面を更新します。これは、ブラウザがDOMの変更を監視しているためです。

流れは以下のようになります。

1. JavaScriptで`elem.textContent = "新しい文字"`を実行
2. DOMが更新される（メモリ上のHTML構造が変わる）
3. ブラウザが変更を検知
4. 画面を自動的に再描画
5. 新しい文字が表示される

このように、JavaScriptとブラウザが連携して、動的な変更を実現しています。

### リアルタイム性

重要なのは、この変更が**リアルタイム**で行われることです。

- ファイルを保存する必要はありません
- ブラウザをリロードする必要もありません
- JavaScriptが実行された瞬間に、画面が変わります

これが、Webページを「動的」にする基本的な仕組みです。

---

## よくある間違いと注意点

### 間違い1：要素を取得せずに変更しようとする

```javascript
// これは動きません
textContent = "変わった！";
```

`textContent`は要素のプロパティなので、まず要素を取得してから、その要素の`textContent`を変更する必要があります。

正しくは以下のようになります。

```javascript
let elem = document.getElementById("text");
elem.textContent = "変わった！";
```

### 間違い2：idが間違っている

```javascript
// HTMLには id="text" があるのに、違うidで取得しようとする
let elem = document.getElementById("message");  // 間違い
elem.textContent = "変わった！";  // エラーになる
```

HTMLのid属性と、`getElementById()`で指定するidは完全に一致している必要があります。大文字小文字も区別されます。

### 間違い3：引用符を忘れる

```javascript
let elem = document.getElementById("text");
elem.textContent = 変わった！;  // 引用符がない（エラー）
```

文字列を代入する場合は、必ず引用符（`""`または`''`）で囲む必要があります。

正しくは以下のようになります。

```javascript
elem.textContent = "変わった！";
```

---

## 練習問題

### 課題：画面の文字を5回変更する

HTMLファイルに表示されている文字を、JavaScriptで5回異なる文字に変更してください。

### 保存場所

`exercises/lesson-014/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. `index.html` に `<p id="message">最初の文字</p>` を追加します
2. `script.js` で要素を取得します
3. `textContent` を使って文字を5回変更します
4. ブラウザで開いて、最後の文字が表示されることを確認します

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-014
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**ヒント1：要素の取得**

まず`getElementById()`を使って要素を取得し、変数に保存します。id名は"message"です。

```javascript
let elem = document.getElementById("message");
```

**ヒント2：文字の変更**

`textContent`プロパティに新しい文字列を代入します。

```javascript
elem.textContent = "1回目の変更";
```

**ヒント3：5回変更する**

同じ変数`elem`に対して、5回`textContent`を変更します。最後に代入した値が画面に表示されます。

```javascript
elem.textContent = "1回目";
elem.textContent = "2回目";
elem.textContent = "3回目";
elem.textContent = "4回目";
elem.textContent = "5回目";  // これが表示される
```

**ヒント4：確認方法**

ブラウザで`index.html`を開いて、"5回目"の文字が表示されているか確認してください。

---

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 014</title>
</head>
<body>
    <p id="message">最初の文字</p>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
// 要素を取得
let elem = document.getElementById("message");

// 文字を5回変更
elem.textContent = "1回目の変更";
elem.textContent = "2回目の変更";
elem.textContent = "3回目の変更";
elem.textContent = "4回目の変更";
elem.textContent = "5回目の変更";
```

### 解説

1行目では、`getElementById()`を使って、id属性が"message"の要素を取得し、変数`elem`に保存しています。

3行目から7行目では、`elem.textContent`に異なる文字列を5回代入しています。JavaScriptは上から順番に実行されるため、各行で文字が変わります。

ただし、人間の目には最後の"5回目の変更"しか見えません。なぜなら、JavaScriptの実行速度が非常に速いため、途中の変更は一瞬で終わってしまうからです。

最終的に画面には"5回目の変更"が表示されます。これは、最後に代入した値がDOMに反映されているためです。

---

## まとめ

### 今回学んだこと

**キーポイント1：プロパティとは**

プロパティとは、オブジェクト（要素）が持っている特性や属性のことです。ドット（`.`）を使ってアクセスできます。例えば、`elem.textContent`は、要素`elem`の`textContent`プロパティにアクセスしています。

**キーポイント2：textContentの役割**

`textContent`プロパティは、HTML要素の中に表示されているテキストを表します。このプロパティを読み取ることで現在の文字を取得でき、このプロパティに代入することで文字を変更できます。

**キーポイント3：動的な変更**

JavaScriptで`textContent`を変更すると、ブラウザがリアルタイムで画面を更新します。ファイルの保存やリロードは不要です。これが、Webページを動的にする基本的な仕組みです。

**キーポイント4：変更の順序**

JavaScriptは上から順番に実行されます。同じプロパティに複数回代入すると、最後の値で上書きされます。そのため、5回変更した場合、最後の値だけが画面に表示されます。

---

### 次回の学習

次回は、複数の要素を操作する方法を学びます。1つの要素だけでなく、3つ、4つの要素を同時に操作できるようになります。ページ全体を動的に変更できるようになるので、楽しみにしていてください。

お疲れ様でした。
