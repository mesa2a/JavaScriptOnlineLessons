---
title: "Lesson 020: 関数を呼ぶ"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 020: 関数を呼ぶ

---

## 今回の学習

### 前回の復習

前回は、`onclick`属性を使ってボタンをクリックしたときに反応する方法を学びました。`<button onclick="alert('こんにちは')">ボタン</button>`のように、HTML要素に直接JavaScriptコードを書くことで、ユーザーの操作に応じた動作を実装できるようになりました。

### 今回の目標

1. 関数の概念を理解する
2. 関数を定義できるようになる
3. `onclick`から関数を呼び出せるようになる

---

## 関数とは

### 関数の概念

関数とは、**処理をまとめて名前を付けたもの**です。料理のレシピのようなものだと考えると分かりやすいです。

例えば、「カレーを作る」という処理は、以下の複数のステップからなります。

1. 野菜を切る
2. 肉を炒める
3. 水を入れて煮る
4. カレールーを入れる

これらの処理を「カレーを作る」という1つの名前でまとめたのが、関数の考え方です。

JavaScriptでも、複数の処理を1つの名前でまとめることができます。

### なぜ関数が必要なのか

前回のレッスンで、`onclick`に長いコードを書くと読みにくくなることを学びました。

```html
<!-- 読みにくい -->
<button onclick="document.getElementById('text').style.color = 'red'; document.getElementById('text').style.fontSize = '30px'; document.getElementById('text').textContent = '変わった！'">ボタン</button>
```

関数を使うと、このような長いコードを整理できます。

```html
<!-- 読みやすい -->
<button onclick="changeText()">ボタン</button>
```

---

## 関数の定義

### 基本的な書き方

関数を定義するには、`function`キーワードを使います。

```javascript
function 関数名() {
  // 実行する処理
}
```

- `function`: 関数を定義するキーワード
- `関数名`: 関数の名前（自分で決める）
- `()`: 括弧（今回は空のまま）
- `{}`: 波括弧の中に実行する処理を書く

### 具体例

```javascript
function showMessage() {
  alert("Hello");
}
```

この関数は、`showMessage`という名前で、`alert("Hello")`という処理を実行します。

---

## 関数を呼ぶ

### 関数の呼び出し方

定義した関数を実行することを「関数を呼ぶ」または「関数を呼び出す」と言います。

```javascript
関数名();
```

括弧（`()`）を付けることで、関数が実行されます。

### 具体例

```javascript
// 関数を定義
function showMessage() {
  alert("Hello");
}

// 関数を呼ぶ
showMessage();
```

`showMessage()`と書くと、`alert("Hello")`が実行されます。

---

## onclickから関数を呼ぶ

### HTMLとJavaScriptの組み合わせ

関数を`onclick`から呼び出すことで、コードを整理できます。

**HTML:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 020</title>
</head>
<body>
    <button onclick="showMessage()">クリック</button>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript (script.js):**

```javascript
function showMessage() {
  alert("ボタンがクリックされました！");
}
```

このボタンをクリックすると、`showMessage()`関数が呼ばれ、アラートが表示されます。

---

## 複数の処理をまとめる

### 関数の利点

関数を使うと、複数の処理を1つにまとめられます。

```javascript
function changeText() {
  let elem = document.getElementById("text");
  elem.textContent = "変わった！";
  elem.style.color = "red";
  elem.style.fontSize = "30px";
}
```

この関数を`onclick`から呼び出すと、3つの処理が一度に実行されます。

```html
<p id="text">最初の文字</p>
<button onclick="changeText()">変更</button>
```

---

## 実践：複数のボタンと関数を作る

### 3つのボタン、3つの関数

それぞれのボタンに対応する関数を作ってみましょう。

**HTML:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 020</title>
</head>
<body>
    <button onclick="showMessage1()">ボタン1</button>
    <button onclick="showMessage2()">ボタン2</button>
    <button onclick="showMessage3()">ボタン3</button>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript (script.js):**

```javascript
function showMessage1() {
  alert("1つ目のボタンがクリックされました");
}

function showMessage2() {
  alert("2つ目のボタンがクリックされました");
}

function showMessage3() {
  alert("3つ目のボタンがクリックされました");
}
```

それぞれのボタンをクリックすると、対応する関数が呼ばれ、違うメッセージが表示されます。

---

## 関数の命名規則

### 分かりやすい名前を付ける

関数名は、その関数が何をするのかが分かる名前にします。

**良い例:**

```javascript
function showMessage() { ... }
function changeColor() { ... }
function hideElement() { ... }
```

**悪い例:**

```javascript
function aaa() { ... }
function doSomething() { ... }  // 何をするのか不明
function x() { ... }
```

### 命名のルール

- **小文字で始める**: `showMessage`（先頭は小文字）
- **複数の単語はキャメルケース**: `showMessage`、`changeColor`
- **動詞で始める**: `show`、`change`、`hide`など

---

## よくある間違いと注意点

### 間違い1：括弧を忘れる

```javascript
// 関数を定義するとき
function showMessage {  // エラー（括弧がない）
  alert("Hello");
}
```

正しくは以下のようになります。

```javascript
function showMessage() {  // 正しい
  alert("Hello");
}
```

### 間違い2：関数を呼ぶときに括弧を忘れる

```javascript
showMessage;  // 関数は実行されない
```

正しくは以下のようになります。

```javascript
showMessage();  // 関数が実行される
```

### 間違い3：関数名のスペルミス

```javascript
// 定義
function showMessage() {
  alert("Hello");
}

// 呼び出し
showMesage();  // エラー（スペルミス）
```

関数を定義した名前と、呼び出すときの名前は完全に一致している必要があります。

### 間違い4：関数を定義する前に呼ぶ

```html
<button onclick="showMessage()">ボタン</button>

<script src="script.js"></script>
```

ボタンをクリックしたときに関数が存在していれば問題ありません。ページが読み込まれるときに`script.js`が読み込まれ、関数が定義されるためです。

---

## 練習問題

### 課題：3つのボタンと3つの関数を作る

3つのボタンを作成し、それぞれに対応する関数を定義してください。

### 保存場所

`exercises/lesson-020/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. `index.html` に3つの`<button>`要素を追加します
   - 1つ目：`onclick="showMessage1()"`
   - 2つ目：`onclick="showMessage2()"`
   - 3つ目：`onclick="showMessage3()"`
2. `script.js` で3つの関数を定義します
   - `showMessage1()`: 「メッセージ1」とアラート表示
   - `showMessage2()`: 「メッセージ2」とアラート表示
   - `showMessage3()`: 「メッセージ3」とアラート表示

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-020
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**ヒント1：HTMLの書き方**

ボタンに`onclick`属性を付けて、関数名を指定します。

```html
<button onclick="showMessage1()">ボタン1</button>
```

**ヒント2：関数の定義**

`script.js`に関数を定義します。

```javascript
function showMessage1() {
  alert("メッセージ1");
}
```

**ヒント3：確認方法**

ブラウザで`index.html`を開いて、それぞれのボタンをクリックしてください。

- 1つ目のボタンをクリック → 「メッセージ1」と表示
- 2つ目のボタンをクリック → 「メッセージ2」と表示
- 3つ目のボタンをクリック → 「メッセージ3」と表示

---

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 020</title>
</head>
<body>
    <button onclick="showMessage1()">ボタン1</button>
    <button onclick="showMessage2()">ボタン2</button>
    <button onclick="showMessage3()">ボタン3</button>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
function showMessage1() {
  alert("メッセージ1");
}

function showMessage2() {
  alert("メッセージ2");
}

function showMessage3() {
  alert("メッセージ3");
}
```

### 解説

**HTMLファイル:**

9行目から11行目で、3つの`<button>`要素を作成しています。

それぞれのボタンに`onclick`属性を設定し、クリックしたときに呼び出す関数を指定しています。

- 1つ目のボタン：`showMessage1()`を呼ぶ
- 2つ目のボタン：`showMessage2()`を呼ぶ
- 3つ目のボタン：`showMessage3()`を呼ぶ

**JavaScriptファイル:**

1行目から3行目で、`showMessage1()`関数を定義しています。この関数は、「メッセージ1」というアラートを表示します。

5行目から7行目で、`showMessage2()`関数を定義しています。

9行目から11行目で、`showMessage3()`関数を定義しています。

それぞれの関数は、`function`キーワードで始まり、関数名と括弧`()`の後に波括弧`{}`で囲まれた処理を書いています。

ボタンをクリックすると、対応する関数が呼ばれ、アラートが表示されます。

---

## まとめ

### 今回学んだこと

**キーポイント1：関数の概念**

関数とは、処理をまとめて名前を付けたものです。料理のレシピのように、複数のステップを1つの名前でまとめることができます。関数を使うことで、コードを整理し、読みやすくすることができます。

**キーポイント2：関数の定義**

関数を定義するには、`function`キーワードを使います。`function 関数名() { 処理 }`という形式で書きます。波括弧の中に実行したい処理を書きます。

**キーポイント3：関数の呼び出し**

定義した関数を実行するには、関数名に括弧を付けて呼び出します。`関数名()`という形式です。括弧を付けることで、関数が実行されます。

**キーポイント4：onclickと関数の組み合わせ**

`onclick`属性から関数を呼び出すことで、ボタンをクリックしたときに関数を実行できます。HTMLに長いコードを書く代わりに、JavaScriptファイルに関数を定義することで、コードを整理できます。

---

### 次回の学習

次回は、関数と変数を組み合わせて、クリックカウンターを作ります。ボタンをクリックするたびに数字が増えていく、インタラクティブなページを作れるようになります。楽しみにしていてください。

お疲れ様でした。
