---
title: "最初の関数"
lesson: 110
date: "2025-11-26"
description: "関数の基本概念を学び、関数を定義して呼び出す方法を理解します"
objectives:
  - "関数とは何かを理解できる"
  - "関数を定義できる"
  - "関数を呼び出せる"
  - "処理の再利用と抽象化を理解できる"
duration: 30
---

# レッスン110: 最初の関数

## このレッスンで学ぶこと

### 前回の復習

レッスン102-109では、**配列とオブジェクト**を使って、TODOアプリを作成しました：

```javascript
let tasks = [
  {id: 1, text: "買い物", completed: false}
];

function showTasks() {
  // タスクを表示する処理
}

function addTask() {
  // タスクを追加する処理
}
```

実は、すでに多くの**関数**を使ってきました！

### よくある場面

プログラミングでこんな場面はありませんか？

**同じ処理を何度も書いている**
```javascript
console.log("こんにちは！");
console.log("良い一日を！");
console.log("--------");

console.log("こんにちは！");
console.log("良い一日を！");
console.log("--------");

console.log("こんにちは！");
console.log("良い一日を！");
console.log("--------");

// 同じコードを何度も書くのは大変...
```

**長いコードが読みにくい**
```javascript
// 100行以上のコードが1つのまとまりになっている
// どこで何をしているのか分からない...
// 修正したい箇所がすぐに見つからない...
```

これらの問題を解決するのが**関数**です。

### 学習目標

今回のレッスンでは、以下のことを学びます：

1. **関数とは何か**
   - 処理をまとめて名前を付けたもの
   - 「レシピ」や「道具箱の道具」のようなもの

2. **関数の定義方法**
   - `function`キーワードの使い方
   - 関数名の付け方のルール

3. **関数の呼び出し方**
   - 関数を実行する方法
   - 何度でも呼び出せる仕組み

4. **関数の利点**
   - 処理の再利用
   - コードの整理
   - 抽象化による理解のしやすさ

---

## 1. 関数とは何か

### 日常生活での「関数」

関数は、日常生活の「レシピ」や「マニュアル」に似ています。

**カレーライスのレシピ**
```
【カレーライスを作る】という手順:
1. 野菜を切る
2. 肉を炒める
3. 水を加えて煮込む
4. カレールーを溶かす
5. ご飯に盛り付ける

→「カレーライスを作る」と言えば、
  この5つの手順を実行する
```

プログラミングの関数も同じです：

```javascript
function makeCurry() {
  // 野菜を切る処理
  // 肉を炒める処理
  // 水を加えて煮込む処理
  // カレールーを溶かす処理
  // ご飯に盛り付ける処理
}

// 「カレーライスを作る」を実行
makeCurry();
```

### 関数を使わない場合の問題

同じ処理を3回実行したい場合：

```javascript
// 1回目
console.log("こんにちは！");
console.log("今日も良い一日を！");
console.log("--------");

// 2回目
console.log("こんにちは！");
console.log("今日も良い一日を！");
console.log("--------");

// 3回目
console.log("こんにちは！");
console.log("今日も良い一日を！");
console.log("--------");
```

**問題点：**
- 同じコードを3回書くのは面倒
- 修正したいときに3箇所変更が必要
- コードが長くなって読みにくい

### 関数を使う場合の改善

```javascript
// 関数を定義（1回だけ）
function sayHello() {
  console.log("こんにちは！");
  console.log("今日も良い一日を！");
  console.log("--------");
}

// 関数を呼び出す（何度でも）
sayHello();  // 1回目
sayHello();  // 2回目
sayHello();  // 3回目
```

**改善点：**
- コードを1回書くだけでOK
- 修正は1箇所だけでOK
- コードが短く読みやすい

**視覚化：関数の仕組み**
```
[関数の定義] - レシピを作る
┌────────────────────────┐
│ function sayHello() {  │
│   console.log("こんにちは！");
│   console.log("今日も良い一日を！");
│   console.log("--------");
│ }                      │
└────────────────────────┘
         ↓
    レシピ完成！
         ↓
[関数の呼び出し] - レシピを使う
┌────────────────────────┐
│ sayHello(); ───→ 実行  │
│ sayHello(); ───→ 実行  │
│ sayHello(); ───→ 実行  │
└────────────────────────┘
```

---

## 2. 関数の定義

### 基本的な構文

関数を定義するには`function`キーワードを使います。

```javascript
function 関数名() {
  // ここに実行したい処理を書く
}
```

**構成要素：**
1. **`function`**: 「これから関数を作りますよ」という宣言
2. **関数名**: 関数に付ける名前（好きな名前でOK）
3. **`()`**: 括弧（今は空っぽ、次のレッスンで使います）
4. **`{}`**: 中括弧の中に実際の処理を書く

### 例1：挨拶関数

```javascript
function sayHello() {
  console.log("こんにちは！");
}
```

**実行の流れ**
```
ステップ1: function sayHello() を読む
  → 「sayHello」という名前の関数を作る

ステップ2: { } の中を読む
  → この関数が実行されたら
    console.log("こんにちは！"); を実行する

ステップ3: 関数の定義が完了
  → まだ実行はされていない
  → メモリに「sayHello」という名前で保存される
```

**視覚化：関数の定義**
```
コード:
┌─────────────────────────┐
│ function sayHello() {   │
│   console.log("こんにちは！");
│ }                       │
└─────────────────────────┘
         ↓
メモリに保存:
┌─────────────────────────┐
│ 関数名: sayHello        │
│ 処理: console.log("こんにちは！")
│ 状態: 定義済み（未実行） │
└─────────────────────────┘
```

### 例2：複数の処理をまとめた関数

```javascript
function greet() {
  console.log("========");
  console.log("ようこそ！");
  console.log("========");
}
```

**実行の流れ**
```
定義時:
  function greet() {
    処理1: console.log("========");
    処理2: console.log("ようこそ！");
    処理3: console.log("========");
  }

呼び出し時:
  greet(); を実行すると
  → 処理1、処理2、処理3が順番に実行される
```

### 例3：計算する関数

```javascript
function showSum() {
  let a = 10;
  let b = 20;
  let result = a + b;
  console.log("合計: " + result);
}
```

**実行の流れ**
```
showSum(); を実行すると:

ステップ1: let a = 10; を実行
  a = 10

ステップ2: let b = 20; を実行
  b = 20

ステップ3: let result = a + b; を実行
  result = 10 + 20 = 30

ステップ4: console.log("合計: " + result); を実行
  コンソールに「合計: 30」と表示

結果: コンソール
  → 合計: 30
```

---

## 3. 関数の呼び出し

### 呼び出しの基本

定義した関数を実行するには、**関数名の後に`()`を付けます**。

```javascript
// 関数を定義
function sayHello() {
  console.log("こんにちは！");
}

// 関数を呼び出す
sayHello();  // ← これで実行される
```

**重要：`()`を忘れずに！**

```javascript
// ❌ 間違い: ()がない
sayHello;  // 関数は実行されない

// ✅ 正しい: ()がある
sayHello();  // 関数が実行される
```

### 何度でも呼び出せる

同じ関数を何度でも呼び出すことができます。

```javascript
function sayHello() {
  console.log("こんにちは！");
}

sayHello();  // 1回目: "こんにちは！"
sayHello();  // 2回目: "こんにちは！"
sayHello();  // 3回目: "こんにちは！"
```

**実行の流れ（詳細）**
```
メモリ:
┌─────────────────────────┐
│ 関数 sayHello           │
│ 処理: console.log("こんにちは！")
└─────────────────────────┘

コード実行:
sayHello(); ← 1回目の呼び出し
  ↓
メモリから関数を取り出す
  ↓
console.log("こんにちは！"); を実行
  ↓
コンソール: こんにちは！

sayHello(); ← 2回目の呼び出し
  ↓
メモリから関数を取り出す
  ↓
console.log("こんにちは！"); を実行
  ↓
コンソール: こんにちは！

sayHello(); ← 3回目の呼び出し
  ↓
（同じ処理を繰り返す）
```

### 別の関数から呼び出す

関数の中から別の関数を呼び出すこともできます。

```javascript
function printStar() {
  console.log("*****");
}

function printMessage() {
  printStar();           // 関数を呼び出す
  console.log("こんにちは！");
  printStar();           // 関数を呼び出す
}

printMessage();
```

**出力結果：**
```
*****
こんにちは！
*****
```

**実行の流れ**
```
printMessage() を呼び出す
  ↓
ステップ1: printStar() を呼び出す
  → console.log("*****") を実行
  → 出力: *****

ステップ2: console.log("こんにちは！") を実行
  → 出力: こんにちは！

ステップ3: printStar() を呼び出す
  → console.log("*****") を実行
  → 出力: *****

最終的な出力:
  *****
  こんにちは！
  *****
```

---

## 4. 関数の命名規則

### 良い関数名の付け方

関数名は**動詞**で始めるのが一般的です。

```javascript
// ✅ 良い関数名（動詞で始まる）
function showMessage() { }      // メッセージを表示する
function calculateSum() { }     // 合計を計算する
function updateDisplay() { }    // 表示を更新する
function checkInput() { }       // 入力をチェックする
function createTask() { }       // タスクを作成する
function deleteTask() { }       // タスクを削除する
```

**よく使う動詞：**
- `show` / `display` / `render` → 表示する
- `get` / `fetch` / `retrieve` → 取得する
- `set` / `update` / `change` → 設定・更新する
- `create` / `add` / `insert` → 作成・追加する
- `delete` / `remove` → 削除する
- `calculate` / `compute` → 計算する
- `check` / `validate` → チェック・検証する
- `is` / `has` / `can` → 真偽を返す（次のレッスンで）

### 悪い関数名の例

```javascript
// ❌ 悪い例1: 何をするか分からない
function doIt() {
  console.log("こんにちは");
}

// ❌ 悪い例2: 名詞で始まっている
function message() {
  console.log("こんにちは");
}

// ❌ 悪い例3: 略語が多すぎる
function prtMsg() {
  console.log("こんにちは");
}

// ✅ 良い例: 何をするか明確
function showGreeting() {
  console.log("こんにちは");
}
```

### キャメルケース（camelCase）

JavaScriptの関数名は**キャメルケース**で書きます。

```javascript
// ✅ キャメルケース: 2語目以降の最初を大文字に
function showMessage() { }
function calculateTotal() { }
function updateUserProfile() { }

// ❌ スネークケース（Pythonで使う）
function show_message() { }

// ❌ 全て小文字
function showmessage() { }
```

**キャメルケースの由来**
```
showMessage
    ↑ ここが大文字でラクダのコブみたい

calculateTotalAmount
        ↑     ↑ コブが2つ
```

---

## 5. DOMを操作する関数

### 関数でDOMを操作する

関数の中でDOM操作ができます。

```javascript
function changeText() {
  let messageDiv = document.getElementById("message");
  messageDiv.textContent = "ボタンが押されました！";
}
```

### ボタンクリックで関数を実行

**HTML**
```html
<button onclick="changeText()">クリック</button>
<div id="message">ここが変わります</div>
```

**JavaScript**
```javascript
function changeText() {
  let messageDiv = document.getElementById("message");
  messageDiv.textContent = "ボタンが押されました！";
}
```

**実行の流れ**
```
[初期状態]
画面:
┌────────────────────────┐
│ [クリック]             │
│ ここが変わります       │
└────────────────────────┘

[ボタンをクリック]
  ↓
onclick="changeText()" が反応
  ↓
changeText() 関数を呼び出す
  ↓
ステップ1: getElementById("message") を実行
  messageDiv = <div id="message">ここが変わります</div>

ステップ2: messageDiv.textContent = "ボタンが押されました！" を実行
  <div id="message">の内容を変更

[結果]
画面:
┌────────────────────────┐
│ [クリック]             │
│ ボタンが押されました！ │
└────────────────────────┘
```

### 複数の要素を操作する関数

```javascript
function changeColors() {
  let heading = document.getElementById("heading");
  let message = document.getElementById("message");

  heading.style.color = "red";
  message.style.backgroundColor = "yellow";
}
```

**HTML**
```html
<button onclick="changeColors()">色を変える</button>
<h1 id="heading">見出し</h1>
<div id="message">メッセージ</div>
```

---

## 6. 実践例：カウンターアプリ

関数を使ってシンプルなカウンターアプリを作ります。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>カウンターアプリ</title>
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.container {
  background-color: white;
  padding: 50px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  text-align: center;
}

h1 {
  margin: 0 0 30px 0;
  color: #333;
  font-size: 32px;
}

.count {
  font-size: 80px;
  font-weight: bold;
  color: #667eea;
  margin: 30px 0;
  min-width: 150px;
}

.buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

button {
  padding: 15px 30px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  color: white;
}

button:nth-child(1) {
  background-color: #4CAF50;
}

button:nth-child(1):hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
}

button:nth-child(2) {
  background-color: #f44336;
}

button:nth-child(2):hover {
  background-color: #da190b;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.4);
}

button:nth-child(3) {
  background-color: #2196F3;
}

button:nth-child(3):hover {
  background-color: #1976D2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
}

button:active {
  transform: translateY(0);
}
```

### JavaScript

```javascript
// カウントの値を保持する変数
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

**実行の流れ（[+1]ボタンをクリック）**
```
初期状態:
  count = 0
  画面: 0

[+1]ボタンをクリック
  ↓
onclick="increment()" が反応
  ↓
increment() 関数を呼び出す
  ↓
ステップ1: count = count + 1; を実行
  count = 0 + 1 = 1

ステップ2: updateDisplay(); を呼び出す
  ↓
  ステップ2-1: getElementById("count") を実行
    countDiv = <div id="count">0</div>

  ステップ2-2: countDiv.textContent = count; を実行
    <div id="count">1</div> に変更

結果:
  count = 1
  画面: 1
```

**視覚化：関数の連携**
```
[+1]ボタン
    ↓
increment() を呼び出す
    ↓
┌──────────────────┐
│ count を +1 する │
└──────────────────┘
    ↓
updateDisplay() を呼び出す
    ↓
┌──────────────────┐
│ 画面に count を  │
│ 表示する         │
└──────────────────┘
    ↓
画面が更新される
```

---

## 7. 関数の利点を理解する

### 利点1：処理の再利用

同じ処理を何度も書かなくてOK。

```javascript
// ❌ 関数なし: 同じコードを3回書く
let countDiv = document.getElementById("count");
countDiv.textContent = count;

// ... 別の場所で ...
let countDiv = document.getElementById("count");
countDiv.textContent = count;

// ... さらに別の場所で ...
let countDiv = document.getElementById("count");
countDiv.textContent = count;

// ✅ 関数あり: 1回定義して3回呼ぶ
function updateDisplay() {
  let countDiv = document.getElementById("count");
  countDiv.textContent = count;
}

updateDisplay();  // 1回目
updateDisplay();  // 2回目
updateDisplay();  // 3回目
```

### 利点2：コードの整理

長いコードを意味のあるまとまりに分けられます。

```javascript
// ❌ 関数なし: 全部1箇所に書くと長い
let count = 0;
let countDiv = document.getElementById("count");
countDiv.textContent = count;

let button1 = document.getElementById("btn1");
button1.addEventListener("click", function() {
  count = count + 1;
  let countDiv = document.getElementById("count");
  countDiv.textContent = count;
});

let button2 = document.getElementById("btn2");
button2.addEventListener("click", function() {
  count = count - 1;
  let countDiv = document.getElementById("count");
  countDiv.textContent = count;
});

// ✅ 関数あり: 意味のある単位に分割
let count = 0;

function increment() {
  count = count + 1;
  updateDisplay();
}

function decrement() {
  count = count - 1;
  updateDisplay();
}

function updateDisplay() {
  let countDiv = document.getElementById("count");
  countDiv.textContent = count;
}

// イベントリスナー（読みやすい！）
document.getElementById("btn1").addEventListener("click", increment);
document.getElementById("btn2").addEventListener("click", decrement);
```

### 利点3：抽象化

詳細を隠して、「何をするか」だけを見せられます。

```javascript
// 抽象化のレベル

// レベル1: 詳細が見える（抽象化なし）
let countDiv = document.getElementById("count");
countDiv.textContent = count;
countDiv.style.color = "red";

// レベル2: 詳細を隠す（抽象化）
updateDisplay();

// 使う側は「表示を更新する」とだけ分かればOK
// 内部でどうやっているかは知らなくてもいい
```

**レシピの例え**
```
抽象化なし:
「フライパンに油を入れて、中火で2分加熱し、
 卵を割り入れて、塩コショウを振り...」
→ 毎回全部の手順を書く

抽象化あり:
「目玉焼きを作る」
→ 詳細は関数の中に隠れている
```

---

## 8. 実践問題

### 問題1：挨拶メッセージ変更アプリ

3つのボタンで挨拶メッセージを変更するアプリを作成してください。

**要件**
- 「おはよう」ボタン: "おはようございます！良い朝ですね！"
- 「こんにちは」ボタン: "こんにちは！良い天気ですね！"
- 「こんばんは」ボタン: "こんばんは！お疲れ様です！"
- 各ボタンに対応する関数を作成

**HTML**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>挨拶アプリ</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 40px;
      text-align: center;
    }
    button {
      margin: 10px;
      padding: 15px 30px;
      font-size: 18px;
      cursor: pointer;
      border: none;
      border-radius: 8px;
      background-color: #4CAF50;
      color: white;
    }
    button:hover {
      background-color: #45a049;
    }
    #message {
      margin-top: 30px;
      font-size: 24px;
      color: #333;
      min-height: 30px;
    }
  </style>
</head>
<body>
  <h1>挨拶アプリ</h1>
  <button onclick="showMorning()">おはよう</button>
  <button onclick="showAfternoon()">こんにちは</button>
  <button onclick="showEvening()">こんばんは</button>
  <div id="message"></div>

  <script src="script.js"></script>
</body>
</html>
```

**ヒント**
```javascript
function showMorning() {
  let messageDiv = document.getElementById("message");
  messageDiv.textContent = "おはようございます！良い朝ですね！";
}

function showAfternoon() {
  // ここに処理を書く
}

function showEvening() {
  // ここに処理を書く
}
```

**解答例**

```javascript
function showMorning() {
  let messageDiv = document.getElementById("message");
  messageDiv.textContent = "おはようございます！良い朝ですね！";
}

function showAfternoon() {
  let messageDiv = document.getElementById("message");
  messageDiv.textContent = "こんにちは！良い天気ですね！";
}

function showEvening() {
  let messageDiv = document.getElementById("message");
  messageDiv.textContent = "こんばんは！お疲れ様です！";
}
```

---

### 問題2：色変更アプリ

ボタンをクリックすると背景色が変わるアプリを作成してください。

**要件**
- 「赤」ボタン: 背景を赤色に
- 「青」ボタン: 背景を青色に
- 「緑」ボタン: 背景を緑色に
- 「リセット」ボタン: 背景を白色に戻す

**ヒント**
```javascript
function changeToRed() {
  document.body.style.backgroundColor = "red";
}

function changeToBlue() {
  // ここに処理を書く
}

// 残りの関数も同様に作成
```

**解答例**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>色変更アプリ</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 40px;
      text-align: center;
      transition: background-color 0.5s;
    }
    button {
      margin: 10px;
      padding: 15px 30px;
      font-size: 18px;
      cursor: pointer;
      border: 2px solid #333;
      border-radius: 8px;
      background-color: white;
    }
    button:hover {
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <h1>色変更アプリ</h1>
  <button onclick="changeToRed()">赤</button>
  <button onclick="changeToBlue()">青</button>
  <button onclick="changeToGreen()">緑</button>
  <button onclick="reset()">リセット</button>

  <script>
    function changeToRed() {
      document.body.style.backgroundColor = "red";
    }

    function changeToBlue() {
      document.body.style.backgroundColor = "blue";
    }

    function changeToGreen() {
      document.body.style.backgroundColor = "green";
    }

    function reset() {
      document.body.style.backgroundColor = "white";
    }
  </script>
</body>
</html>
```

---

### 問題3：簡易電卓

足し算と引き算ができる簡易電卓を作成してください。

**要件**
- 2つの数値を入力できる
- 「足し算」ボタン: 2つの数を足して結果を表示
- 「引き算」ボタン: 1つ目から2つ目を引いて結果を表示
- 「クリア」ボタン: 入力と結果をクリア

**ヒント**
```javascript
function add() {
  let num1 = document.getElementById("num1").value;
  let num2 = document.getElementById("num2").value;
  let result = Number(num1) + Number(num2);

  let resultDiv = document.getElementById("result");
  resultDiv.textContent = "結果: " + result;
}
```

**解答例**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>簡易電卓</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 40px;
      text-align: center;
      background-color: #f5f5f5;
    }
    .calculator {
      background-color: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      max-width: 400px;
      margin: 0 auto;
    }
    input {
      width: 150px;
      padding: 10px;
      font-size: 18px;
      margin: 10px;
      border: 2px solid #ddd;
      border-radius: 6px;
    }
    button {
      margin: 10px;
      padding: 12px 24px;
      font-size: 16px;
      cursor: pointer;
      border: none;
      border-radius: 6px;
      background-color: #4CAF50;
      color: white;
    }
    button:hover {
      background-color: #45a049;
    }
    .clear {
      background-color: #f44336;
    }
    .clear:hover {
      background-color: #da190b;
    }
    #result {
      margin-top: 20px;
      font-size: 24px;
      font-weight: bold;
      color: #333;
      min-height: 30px;
    }
  </style>
</head>
<body>
  <div class="calculator">
    <h1>簡易電卓</h1>
    <div>
      <input type="number" id="num1" placeholder="数値1">
      <input type="number" id="num2" placeholder="数値2">
    </div>
    <div>
      <button onclick="add()">足し算</button>
      <button onclick="subtract()">引き算</button>
      <button class="clear" onclick="clear()">クリア</button>
    </div>
    <div id="result"></div>
  </div>

  <script>
    function add() {
      let num1 = document.getElementById("num1").value;
      let num2 = document.getElementById("num2").value;
      let result = Number(num1) + Number(num2);

      let resultDiv = document.getElementById("result");
      resultDiv.textContent = "結果: " + result;
    }

    function subtract() {
      let num1 = document.getElementById("num1").value;
      let num2 = document.getElementById("num2").value;
      let result = Number(num1) - Number(num2);

      let resultDiv = document.getElementById("result");
      resultDiv.textContent = "結果: " + result;
    }

    function clear() {
      document.getElementById("num1").value = "";
      document.getElementById("num2").value = "";
      document.getElementById("result").textContent = "";
    }
  </script>
</body>
</html>
```

---

## まとめ

### 今回学んだこと

1. **関数とは何か**
   ```javascript
   // 処理をまとめて名前を付けたもの
   function sayHello() {
     console.log("こんにちは！");
   }
   ```

2. **関数の定義**
   ```javascript
   function 関数名() {
     // 実行したい処理
   }
   ```

3. **関数の呼び出し**
   ```javascript
   関数名();  // ()を付けて実行
   ```

4. **関数の利点**
   - **再利用**: 同じコードを何度も書かなくてOK
   - **整理**: コードを意味のある単位に分割
   - **抽象化**: 詳細を隠して使いやすく

### 重要なポイント

**関数の定義と呼び出し**
```javascript
// 定義（レシピを作る）
function greet() {
  console.log("こんにちは！");
}

// 呼び出し（レシピを使う）
greet();  // "こんにちは！"
greet();  // "こんにちは！"
greet();  // "こんにちは！"
```

**関数名の付け方**
- 動詞で始める（`show`, `get`, `update`など）
- キャメルケースで書く（`showMessage`, `updateDisplay`）
- 何をするか分かる名前にする

**関数を使うべき場面**
- 同じ処理を2回以上書きそうなとき
- コードが長くなって読みにくいとき
- 処理を意味のあるまとまりに分けたいとき

### カリキュラム要件チェック

レッスン110の要件：

✅ **function sayHello() { }**
   - 関数の基本構文を学習
   - functionキーワード、関数名、{}の使い方

✅ **関数を定義**
   - 複数の関数定義例を実装
   - 命名規則とベストプラクティス

✅ **関数を呼び出す**
   - 関数呼び出しの基本（関数名()）
   - 何度でも呼び出せることを確認

✅ **【知識】関数とは、処理の再利用、抽象化**
   - 関数の3つの利点を詳細に解説
   - 日常生活の例え（レシピ）で理解を促進
   - 実践例で具体的な使用場面を提示

### 次のレッスンの予告

次のレッスンでは、**引数**について学びます：

```javascript
// 今回のレッスン: 引数なし
function sayHello() {
  console.log("こんにちは！");
}

// 次のレッスン: 引数あり
function greet(name) {
  console.log("こんにちは、" + name + "さん！");
}

greet("太郎");  // "こんにちは、太郎さん！"
greet("花子");  // "こんにちは、花子さん！"
```

引数を使うと、関数に値を渡して、より柔軟な処理ができるようになります！
