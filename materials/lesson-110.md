---
title: "最初の関数"
lesson: 110
description: "関数の基本概念を学び、関数を定義して呼び出す方法を理解します"
objectives:
  - "関数とは何かを理解できる"
  - "関数を定義できる"
  - "関数を呼び出せる"
duration: 30
---

# 最初の関数

## 今回の学習

**関数**とは、処理をまとめて名前を付けたものです。何度も使う処理を関数にすることで、コードを整理し、再利用できるようになります。

---

## 1. 関数とは

関数は「処理の塊」に名前を付けたものです。

### 関数を使わない場合

```javascript
console.log("こんにちは！");
console.log("今日も良い一日を！");

console.log("こんにちは！");
console.log("今日も良い一日を！");

console.log("こんにちは！");
console.log("今日も良い一日を！");
```

同じ処理を何度も書くのは大変です。

### 関数を使う場合

```javascript
// 関数を定義
function sayHello() {
  console.log("こんにちは！");
  console.log("今日も良い一日を！");
}

// 関数を呼び出す
sayHello();
sayHello();
sayHello();
```

一度定義すれば、何度でも呼び出せます。

---

## 2. 関数の定義

関数を定義するには`function`キーワードを使います。

```javascript
function 関数名() {
  // 実行したい処理
}
```

### 例：挨拶関数

```javascript
function sayHello() {
  console.log("こんにちは！");
}
```

### 構成要素

1. **`function`**: 関数を定義するキーワード
2. **関数名**: 関数の名前（`sayHello`）
3. **`()`**: 括弧（今は空っぽ）
4. **`{}`**: 中括弧の中に処理を書く

---

## 3. 関数の呼び出し

定義した関数を実行するには、関数名の後に`()`を付けます。

```javascript
// 関数を定義
function sayHello() {
  console.log("こんにちは！");
}

// 関数を呼び出す
sayHello();  // "こんにちは！"が表示される
```

### 何度でも呼び出せる

```javascript
sayHello();  // "こんにちは！"
sayHello();  // "こんにちは！"
sayHello();  // "こんにちは！"
```

---

## 4. 関数の中身

関数の中には、どんな処理でも書けます。

### 計算する関数

```javascript
function showSum() {
  let result = 10 + 20;
  console.log("合計: " + result);
}

showSum();  // "合計: 30"
```

### 複数の処理を実行する関数

```javascript
function greet() {
  console.log("========");
  console.log("ようこそ！");
  console.log("========");
}

greet();
// ========
// ようこそ！
// ========
```

---

## 5. 関数の命名規則

関数名は**動詞**で始めるのが一般的です。

### 良い関数名

```javascript
function showMessage() { }   // メッセージを表示する
function calculateSum() { }  // 合計を計算する
function updateDisplay() { } // 表示を更新する
function checkInput() { }    // 入力をチェックする
```

### 注意点

```javascript
// ✅ 良い: 何をするか分かる
function showGreeting() {
  console.log("こんにちは");
}

// ❌ 悪い: 何をするか分からない
function doIt() {
  console.log("こんにちは");
}
```

---

## 6. DOMを操作する関数

関数の中でDOMを操作できます。

```javascript
function changeText() {
  let messageDiv = document.getElementById("message");
  messageDiv.textContent = "ボタンが押されました！";
}
```

### ボタンクリックで関数を呼び出す

```html
<button onclick="changeText()">クリック</button>
<div id="message">ここが変わります</div>
```

```javascript
function changeText() {
  let messageDiv = document.getElementById("message");
  messageDiv.textContent = "ボタンが押されました！";
}
```

---

## 7. 実践例：カウンターアプリ

関数を使ってカウンターを作ります。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>カウンター</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>カウンター</h1>
    <div id="count" class="count">0</div>
    <div class="buttons">
      <button onclick="increment()">+1</button>
      <button onclick="decrement()">-1</button>
      <button onclick="reset()">リセット</button>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### CSS

```css
body {
  font-family: sans-serif;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
}

.container {
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
}

h1 {
  margin: 0 0 20px 0;
  color: #333;
}

.count {
  font-size: 72px;
  font-weight: bold;
  color: #4CAF50;
  margin: 20px 0;
}

.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

button {
  padding: 12px 24px;
  font-size: 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:nth-child(1) {
  background-color: #4CAF50;
  color: white;
}

button:nth-child(1):hover {
  background-color: #45a049;
}

button:nth-child(2) {
  background-color: #f44336;
  color: white;
}

button:nth-child(2):hover {
  background-color: #da190b;
}

button:nth-child(3) {
  background-color: #2196F3;
  color: white;
}

button:nth-child(3):hover {
  background-color: #1976D2;
}
```

### JavaScript

```javascript
let count = 0;

// カウントを増やす関数
function increment() {
  count = count + 1;
  updateDisplay();
}

// カウントを減らす関数
function decrement() {
  count = count - 1;
  updateDisplay();
}

// カウントをリセットする関数
function reset() {
  count = 0;
  updateDisplay();
}

// 表示を更新する関数
function updateDisplay() {
  let countDiv = document.getElementById("count");
  countDiv.textContent = count;
}
```

---

## 8. 練習問題

メッセージ変更アプリを作成してください。

### 要件

1. 3つのボタンがある（「おはよう」「こんにちは」「こんばんは」）
2. 各ボタンをクリックすると、対応するメッセージを表示する
3. それぞれのボタンに対応する関数を作る

### ヒント

```html
<button onclick="showMorning()">おはよう</button>
<button onclick="showAfternoon()">こんにちは</button>
<button onclick="showEvening()">こんばんは</button>
<div id="message"></div>
```

```javascript
function showMorning() {
  let messageDiv = document.getElementById("message");
  messageDiv.textContent = "おはようございます！";
}

function showAfternoon() {
  // ここに処理を書く
}

function showEvening() {
  // ここに処理を書く
}
```

---

## まとめ

### 今回学んだこと

- **関数とは**: 処理をまとめて名前を付けたもの
- **関数の定義**: `function 関数名() { 処理 }`
- **関数の呼び出し**: `関数名()`
- **関数の利点**: コードの再利用、整理、読みやすさの向上

### 重要なポイント

- 関数は`function`キーワードで定義する
- 関数名は動詞で始める
- 関数は何度でも呼び出せる
- 関数の中にはどんな処理でも書ける

### 関数の構文

```javascript
// 定義
function 関数名() {
  // 処理
}

// 呼び出し
関数名();
```

次のレッスンでは、**引数**について学びます。関数に値を渡して、より柔軟な処理ができるようになります。
