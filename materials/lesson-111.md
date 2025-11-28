---
title: "引数を受け取る"
lesson: 111
date: "2025-11-26"
description: "関数に引数を渡して、より柔軟な処理を実現する方法を学びます"
objectives:
  - "引数とは何かを理解できる"
  - "関数に引数を渡せる"
  - "複数の引数を使える"
  - "パラメータと引数の違いを理解できる"
duration: 30
---

# レッスン111: 引数を受け取る

## このレッスンで学ぶこと

### 前回の復習

レッスン110では、**関数の基本**を学びました：

```javascript
// 関数を定義
function sayHello() {
  console.log("こんにちは！");
}

// 関数を呼び出す
sayHello();  // "こんにちは！"
```

しかし、この関数には問題があります...

### よくある場面

日常生活でこんな場面はありませんか？

**同じような処理だけど、少しだけ違う**
```
「太郎さんにこんにちは」と言いたい
「花子さんにこんにちは」と言いたい
「次郎さんにこんにちは」と言いたい

それぞれに関数を作るの？
→ 面倒だし、無駄が多い...
```

**料理のレシピの例**
```
カレーライスを作る:
  材料: にんじん、じゃがいも、肉
  → カレーができる

材料を変えれば:
  材料: 豆腐、きのこ、野菜
  → ベジタリアンカレーができる

「材料」が変わると結果も変わる
```

プログラミングでも同じです。関数に**材料**を渡して、異なる結果を得たい！

この「材料」が**引数（ひきすう）**です。

### 学習目標

今回のレッスンでは、以下のことを学びます：

1. **引数とは何か**
   - 関数に渡す値
   - 関数を柔軟にする仕組み

2. **引数の使い方**
   - 引数を定義する方法
   - 引数を呼び出し時に渡す方法

3. **複数の引数**
   - 2つ以上の値を渡す
   - 順序の重要性

4. **パラメータと引数の違い**
   - 定義時の名前（パラメータ）
   - 呼び出し時の値（引数）

---

## 1. 引数とは何か

### 引数なしの問題

前回作った関数は、いつも同じことしかできませんでした：

```javascript
function sayHello() {
  console.log("こんにちは！");
}

sayHello();  // "こんにちは！"
sayHello();  // "こんにちは！"
sayHello();  // "こんにちは！"

// いつも同じメッセージ...
```

**問題点：**
- 違う人に挨拶できない
- 「太郎さん」「花子さん」それぞれに関数を作る？
- 効率が悪い

### 引数を使った改善

```javascript
function greet(name) {  // nameは引数
  console.log("こんにちは、" + name + "さん！");
}

greet("太郎");  // "こんにちは、太郎さん！"
greet("花子");  // "こんにちは、花子さん！"
greet("次郎");  // "こんにちは、次郎さん！"
```

**改善点：**
- 1つの関数で様々な人に挨拶できる
- 関数を呼び出すたびに違う値を渡せる
- コードが効率的

**視覚化：引数の仕組み**
```
[引数なし]
┌──────────────────┐
│ function sayHello() {
│   console.log("こんにちは！");
│ }
└──────────────────┘
    ↓
sayHello() → いつも同じ
sayHello() → いつも同じ
sayHello() → いつも同じ

[引数あり]
┌──────────────────┐
│ function greet(name) {
│   console.log("こんにちは、" + name + "さん！");
│ }
└──────────────────┘
    ↓
greet("太郎") → "こんにちは、太郎さん！"
greet("花子") → "こんにちは、花子さん！"
greet("次郎") → "こんにちは、次郎さん！"
        ↑
    引数を渡す
```

### 引数の正式な定義

**引数（ひきすう / argument）**
- 関数に渡す値のこと
- 関数を柔軟にするための仕組み
- 関数の「材料」のようなもの

**パラメータ（parameter）**
- 関数を定義するときに書く「仮の名前」
- 引数を受け取るための変数

```javascript
function greet(name) {  // ← name はパラメータ
  console.log("こんにちは、" + name + "さん！");
}

greet("太郎");  // ← "太郎" は引数
```

---

## 2. 引数の基本構文

### 定義の仕方

引数を受け取る関数を定義するには、`()`の中にパラメータ名を書きます。

```javascript
function 関数名(パラメータ名) {
  // パラメータを使った処理
}
```

### 呼び出しの仕方

関数を呼び出すときに、`()`の中に具体的な値を書きます。

```javascript
関数名(引数の値);
```

### 例1：名前を受け取る関数

```javascript
// 定義
function showName(name) {
  console.log("名前は " + name + " です");
}

// 呼び出し
showName("太郎");  // "名前は 太郎 です"
showName("花子");  // "名前は 花子 です"
```

**実行の流れ（詳細）**
```
コード:
  showName("太郎");

ステップ1: 関数を呼び出す
  showName("太郎")
    ↓
  引数 "太郎" を渡す

ステップ2: 関数の定義を確認
  function showName(name) {
    ↑ パラメータ name に "太郎" が入る
    name = "太郎" になる

ステップ3: 関数の中身を実行
  console.log("名前は " + name + " です");
    ↓
  console.log("名前は " + "太郎" + " です");
    ↓
  console.log("名前は 太郎 です");

ステップ4: コンソールに出力
  → 名前は 太郎 です
```

**視覚化：値の受け渡し**
```
呼び出し側:
┌────────────────────┐
│ showName("太郎");  │
│          ↓         │
│       引数         │
└────────────────────┘
         ↓
    値を渡す ("太郎")
         ↓
関数側:
┌────────────────────┐
│ function showName(name) {
│                   ↑   │
│              パラメータ│
│   name = "太郎"    │
│   console.log("名前は " + name + " です");
│ }                  │
└────────────────────┘
```

### 例2：数値を受け取る関数

```javascript
function showDouble(number) {
  let result = number * 2;
  console.log(number + " の2倍は " + result + " です");
}

showDouble(5);   // "5 の2倍は 10 です"
showDouble(10);  // "10 の2倍は 20 です"
```

**実行の流れ**
```
showDouble(5); を実行

ステップ1: number = 5 になる

ステップ2: result = number * 2; を実行
  result = 5 * 2 = 10

ステップ3: console.log を実行
  "5 の2倍は 10 です"
```

---

## 3. 複数の引数

### 2つの引数

関数には、複数の値を渡すことができます。

```javascript
function introduce(name, age) {
  console.log("私は" + name + "で、" + age + "歳です");
}

introduce("太郎", 25);  // "私は太郎で、25歳です"
introduce("花子", 30);  // "私は花子で、30歳です"
```

**構文：**
```javascript
// 定義: パラメータをカンマで区切る
function 関数名(パラメータ1, パラメータ2) {
  // 処理
}

// 呼び出し: 引数をカンマで区切る
関数名(引数1, 引数2);
```

**実行の流れ**
```
introduce("太郎", 25); を実行

ステップ1: パラメータに値を代入
  name = "太郎"
  age = 25

ステップ2: 関数の中身を実行
  console.log("私は" + name + "で、" + age + "歳です");
    ↓
  console.log("私は" + "太郎" + "で、" + 25 + "歳です");
    ↓
  console.log("私は太郎で、25歳です");
```

**視覚化：複数の引数**
```
呼び出し:
┌──────────────────────┐
│ introduce("太郎", 25);│
│           ↓     ↓    │
│         引数1  引数2  │
└──────────────────────┘
          ↓      ↓
    値を渡す  値を渡す
          ↓      ↓
関数:
┌──────────────────────┐
│ function introduce(name, age) {
│                    ↑     ↑  │
│              パラメータ1 パラメータ2
│   name = "太郎"         │
│   age = 25              │
└──────────────────────┘
```

### 3つ以上の引数

```javascript
function showInfo(name, age, city) {
  console.log(name + "は" + age + "歳で、" + city + "に住んでいます");
}

showInfo("太郎", 25, "東京");
// "太郎は25歳で、東京に住んでいます"

showInfo("花子", 30, "大阪");
// "花子は30歳で、大阪に住んでいます"
```

### 引数の順序は重要

引数は**順番が決まっています**。順序を間違えると、おかしな結果になります。

```javascript
function introduce(name, age) {
  console.log(name + "は" + age + "歳です");
}

// ✅ 正しい順序
introduce("太郎", 25);  // "太郎は25歳です"

// ❌ 順序が逆
introduce(25, "太郎");  // "25は太郎歳です" ← おかしい！
```

**実行の流れ（順序が逆の場合）**
```
introduce(25, "太郎"); を実行

ステップ1: パラメータに値を代入（順番通り）
  name = 25      ← 本来は名前が入るべき
  age = "太郎"   ← 本来は年齢が入るべき

ステップ2: 関数を実行
  console.log(name + "は" + age + "歳です");
    ↓
  console.log(25 + "は" + "太郎" + "歳です");
    ↓
  console.log("25は太郎歳です");
    ↑ おかしな結果！
```

---

## 4. 引数を使った計算

### 2つの数を足す関数

```javascript
function add(a, b) {
  let result = a + b;
  console.log(a + " + " + b + " = " + result);
}

add(5, 3);    // "5 + 3 = 8"
add(10, 20);  // "10 + 20 = 30"
add(7, 15);   // "7 + 15 = 22"
```

### 2つの数を掛ける関数

```javascript
function multiply(num1, num2) {
  let result = num1 * num2;
  console.log(num1 + " × " + num2 + " = " + result);
}

multiply(3, 4);   // "3 × 4 = 12"
multiply(5, 6);   // "5 × 6 = 30"
multiply(7, 8);   // "7 × 8 = 56"
```

### 四則演算の関数

```javascript
function calculate(operation, a, b) {
  let result;

  if (operation === "add") {
    result = a + b;
  } else if (operation === "subtract") {
    result = a - b;
  } else if (operation === "multiply") {
    result = a * b;
  } else if (operation === "divide") {
    result = a / b;
  }

  console.log("結果: " + result);
}

calculate("add", 10, 5);       // "結果: 15"
calculate("subtract", 10, 5);  // "結果: 5"
calculate("multiply", 10, 5);  // "結果: 50"
calculate("divide", 10, 5);    // "結果: 2"
```

**実行の流れ**
```
calculate("add", 10, 5); を実行

ステップ1: パラメータに値を代入
  operation = "add"
  a = 10
  b = 5

ステップ2: if文で判定
  operation === "add"?
  "add" === "add"? → true

ステップ3: result = a + b; を実行
  result = 10 + 5 = 15

ステップ4: console.log を実行
  "結果: 15"
```

---

## 5. 実践例：時間帯別挨拶アプリ

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>挨拶アプリ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>挨拶アプリ</h1>

    <div class="input-group">
      <label>お名前:</label>
      <input type="text" id="nameInput" placeholder="名前を入力">
    </div>

    <div class="input-group">
      <label>時間帯:</label>
      <select id="timeSelect">
        <option value="morning">朝</option>
        <option value="afternoon">昼</option>
        <option value="evening">夜</option>
      </select>
    </div>

    <button onclick="showGreeting()">挨拶する</button>

    <div id="output" class="output"></div>
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
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.container {
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  max-width: 500px;
  width: 100%;
}

h1 {
  margin: 0 0 30px 0;
  color: #333;
  text-align: center;
  font-size: 28px;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: bold;
  font-size: 14px;
}

input, select {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus, select:focus {
  outline: none;
  border-color: #667eea;
}

button {
  width: 100%;
  padding: 15px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

button:hover {
  background-color: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

button:active {
  transform: translateY(0);
}

.output {
  margin-top: 30px;
  padding: 20px;
  background-color: #f0f4ff;
  border-radius: 8px;
  text-align: center;
  font-size: 20px;
  color: #333;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.output:empty {
  display: none;
}
```

### JavaScript

```javascript
// 挨拶メッセージを作成する関数
function greet(time, name) {
  let message = "";

  if (time === "morning") {
    message = "おはようございます、" + name + "さん！良い朝ですね☀️";
  } else if (time === "afternoon") {
    message = "こんにちは、" + name + "さん！良い午後を🌤️";
  } else if (time === "evening") {
    message = "こんばんは、" + name + "さん！お疲れ様です🌙";
  }

  // メッセージを表示
  let outputDiv = document.getElementById("output");
  outputDiv.textContent = message;
}

// ボタンがクリックされたときに実行される関数
function showGreeting() {
  // 入力された名前を取得
  let nameInput = document.getElementById("nameInput");
  let name = nameInput.value.trim();

  // 選択された時間帯を取得
  let timeSelect = document.getElementById("timeSelect");
  let time = timeSelect.value;

  // 名前が空でないかチェック
  if (name === "") {
    alert("名前を入力してください");
    return;
  }

  // greet関数を呼び出す
  greet(time, name);
}
```

**実行の流れ**
```
[1] ユーザーが入力
  名前: "太郎"
  時間帯: "morning"

[2] [挨拶する]ボタンをクリック
  ↓
showGreeting() が呼ばれる

[3] showGreeting() の処理
  ステップ1: 名前を取得
    name = "太郎"

  ステップ2: 時間帯を取得
    time = "morning"

  ステップ3: 名前が空でないかチェック
    name === ""? → false → OK

  ステップ4: greet(time, name) を呼び出す
    greet("morning", "太郎")

[4] greet("morning", "太郎") の処理
  ステップ1: パラメータに値を代入
    time = "morning"
    name = "太郎"

  ステップ2: if文で判定
    time === "morning"? → true

  ステップ3: メッセージを作成
    message = "おはようございます、太郎さん！良い朝ですね☀️"

  ステップ4: 画面に表示
    outputDiv.textContent = message

[5] 結果
  画面に「おはようございます、太郎さん！良い朝ですね☀️」が表示される
```

---

## 6. 引数がない場合

### undefined になる

引数を渡さずに関数を呼ぶと、パラメータの値は`undefined`になります。

```javascript
function greet(name) {
  console.log("こんにちは、" + name + "さん！");
}

greet("太郎");  // "こんにちは、太郎さん！"
greet();        // "こんにちは、undefinedさん！"
```

**実行の流れ**
```
greet(); を実行（引数なし）

ステップ1: パラメータに値を代入
  name = undefined  ← 値が渡されていない

ステップ2: 関数を実行
  console.log("こんにちは、" + name + "さん！");
    ↓
  console.log("こんにちは、" + undefined + "さん！");
    ↓
  console.log("こんにちは、undefinedさん！");
```

### デフォルト値で対処

引数がない場合のデフォルト値を設定できます（次のレッスンで詳しく学びます）。

```javascript
function greet(name) {
  // 引数がない場合のチェック
  if (name === undefined) {
    name = "ゲスト";
  }

  console.log("こんにちは、" + name + "さん！");
}

greet("太郎");  // "こんにちは、太郎さん！"
greet();        // "こんにちは、ゲストさん！"
```

---

## 7. 引数の命名規則

### 分かりやすい名前を付ける

引数の名前は、何を表すか分かりやすくしましょう。

```javascript
// ❌ 悪い例: 意味が分からない
function calc(x, y) {
  console.log(x * y);
}

// ✅ 良い例: 意味が明確
function multiply(num1, num2) {
  console.log(num1 * num2);
}

// ✅ さらに良い例: より具体的
function calculateArea(width, height) {
  console.log(width * height);
}
```

### よく使う引数名

```javascript
// 名前
function greet(name) { }

// 年齢
function checkAge(age) { }

// 数値
function calculate(number) { }
function add(num1, num2) { }

// テキスト
function showMessage(message) { }
function displayText(text) { }

// 値
function processValue(value) { }

// アイテム
function addItem(item) { }

// データ
function saveData(data) { }
```

---

## 8. 実践問題

### 問題1：BMI計算アプリ

身長と体重からBMIを計算するアプリを作成してください。

**要件**
- 身長（cm）を入力できる
- 体重（kg）を入力できる
- 「計算」ボタンで結果を表示
- `calculateBMI(height, weight)` 関数を使う
- BMI = 体重 ÷ (身長m × 身長m)

**ヒント**
```javascript
function calculateBMI(height, weight) {
  // 身長をcmからmに変換
  let heightM = height / 100;

  // BMIを計算
  let bmi = weight / (heightM * heightM);

  // 小数点第1位まで表示
  bmi = Math.round(bmi * 10) / 10;

  // 結果を表示
  let output = document.getElementById("output");
  output.textContent = "あなたのBMIは " + bmi + " です";
}
```

**解答例**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>BMI計算機</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 40px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 400px;
      margin: 0 auto;
      background-color: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    h1 {
      text-align: center;
      color: #333;
    }
    .input-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input {
      width: 100%;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
    }
    button {
      width: 100%;
      padding: 12px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 18px;
      cursor: pointer;
    }
    button:hover {
      background-color: #45a049;
    }
    #output {
      margin-top: 20px;
      padding: 15px;
      background-color: #e8f5e9;
      border-radius: 6px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>BMI計算機</h1>

    <div class="input-group">
      <label>身長 (cm):</label>
      <input type="number" id="heightInput" placeholder="例: 170">
    </div>

    <div class="input-group">
      <label>体重 (kg):</label>
      <input type="number" id="weightInput" placeholder="例: 60">
    </div>

    <button onclick="calculate()">計算</button>

    <div id="output"></div>
  </div>

  <script>
    function calculateBMI(height, weight) {
      // 身長をcmからmに変換
      let heightM = height / 100;

      // BMIを計算
      let bmi = weight / (heightM * heightM);

      // 小数点第1位まで表示
      bmi = Math.round(bmi * 10) / 10;

      // 判定
      let category = "";
      if (bmi < 18.5) {
        category = "（低体重）";
      } else if (bmi < 25) {
        category = "（普通体重）";
      } else {
        category = "（肥満）";
      }

      // 結果を表示
      let output = document.getElementById("output");
      output.textContent = "BMI: " + bmi + " " + category;
    }

    function calculate() {
      let height = Number(document.getElementById("heightInput").value);
      let weight = Number(document.getElementById("weightInput").value);

      if (height <= 0 || weight <= 0) {
        alert("正しい値を入力してください");
        return;
      }

      calculateBMI(height, weight);
    }
  </script>
</body>
</html>
```

---

### 問題2：割引計算アプリ

商品価格と割引率から、割引後の価格を計算するアプリを作成してください。

**要件**
- 商品価格を入力できる
- 割引率（%）を入力できる
- `calculateDiscount(price, discountRate)` 関数を使う
- 割引額と割引後価格を表示

**解答例**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>割引計算機</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 40px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 400px;
      margin: 0 auto;
      background-color: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    h1 {
      text-align: center;
      color: #333;
    }
    .input-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input {
      width: 100%;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
    }
    button {
      width: 100%;
      padding: 12px;
      background-color: #2196F3;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 18px;
      cursor: pointer;
    }
    button:hover {
      background-color: #1976D2;
    }
    #output {
      margin-top: 20px;
      padding: 15px;
      background-color: #e3f2fd;
      border-radius: 6px;
    }
    .result-item {
      margin: 10px 0;
      font-size: 16px;
    }
    .final-price {
      font-size: 24px;
      font-weight: bold;
      color: #f44336;
      text-align: center;
      margin-top: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>割引計算機</h1>

    <div class="input-group">
      <label>商品価格 (円):</label>
      <input type="number" id="priceInput" placeholder="例: 10000">
    </div>

    <div class="input-group">
      <label>割引率 (%):</label>
      <input type="number" id="discountInput" placeholder="例: 20">
    </div>

    <button onclick="calculate()">計算</button>

    <div id="output"></div>
  </div>

  <script>
    function calculateDiscount(price, discountRate) {
      // 割引額を計算
      let discountAmount = price * (discountRate / 100);

      // 割引後価格を計算
      let finalPrice = price - discountAmount;

      // 結果を表示
      let output = document.getElementById("output");
      output.innerHTML = `
        <div class="result-item">元の価格: ¥${price.toLocaleString()}</div>
        <div class="result-item">割引率: ${discountRate}%</div>
        <div class="result-item">割引額: ¥${discountAmount.toLocaleString()}</div>
        <div class="final-price">割引後: ¥${finalPrice.toLocaleString()}</div>
      `;
    }

    function calculate() {
      let price = Number(document.getElementById("priceInput").value);
      let discountRate = Number(document.getElementById("discountInput").value);

      if (price <= 0 || discountRate < 0 || discountRate > 100) {
        alert("正しい値を入力してください");
        return;
      }

      calculateDiscount(price, discountRate);
    }
  </script>
</body>
</html>
```

---

### 問題3：温度変換アプリ

摂氏と華氏を相互変換するアプリを作成してください。

**要件**
- 温度を入力できる
- 「摂氏→華氏」「華氏→摂氏」ボタンがある
- `celsiusToFahrenheit(celsius)` 関数を使う
- `fahrenheitToCelsius(fahrenheit)` 関数を使う
- 計算式：華氏 = 摂氏 × 9/5 + 32

**ヒント**
```javascript
function celsiusToFahrenheit(celsius) {
  let fahrenheit = celsius * 9 / 5 + 32;
  return fahrenheit;
}

function fahrenheitToCelsius(fahrenheit) {
  let celsius = (fahrenheit - 32) * 5 / 9;
  return celsius;
}
```

---

## まとめ

### 今回学んだこと

1. **引数とは**
   ```javascript
   // 関数に渡す値
   function greet(name) {  // name はパラメータ
     console.log("こんにちは、" + name + "さん");
   }

   greet("太郎");  // "太郎" は引数
   ```

2. **複数の引数**
   ```javascript
   function introduce(name, age) {
     console.log(name + "は" + age + "歳です");
   }

   introduce("太郎", 25);
   ```

3. **引数の順序**
   ```javascript
   // 順序が重要！
   introduce("太郎", 25);  // ✅ 正しい
   introduce(25, "太郎");  // ❌ 間違い
   ```

### 重要なポイント

**パラメータと引数の違い**
```javascript
function greet(name) {  // ← name はパラメータ（定義時）
  console.log("こんにちは、" + name);
}

greet("太郎");  // ← "太郎" は引数（呼び出し時）
```

**引数を使う利点**
- 1つの関数で様々な処理ができる
- コードの再利用性が高まる
- 柔軟なプログラムが書ける

### カリキュラム要件チェック

レッスン111の要件：

✅ **function greet(name) { }**
   - 引数を受け取る関数の基本構文
   - パラメータの定義方法

✅ **引数を使う**
   - 関数呼び出し時に値を渡す
   - パラメータに値が代入される仕組み

✅ **複数の引数**
   - カンマで区切って複数の値を渡す
   - 順序の重要性を理解

✅ **【知識】パラメータと引数、値の受け渡し**
   - パラメータ：関数定義時の仮の名前
   - 引数：関数呼び出し時の実際の値
   - 値の受け渡しの仕組みを詳細に解説

### 次のレッスンの予告

次のレッスンでは、**戻り値（return）**について学びます：

```javascript
// 今回のレッスン: 値を表示するだけ
function add(a, b) {
  let result = a + b;
  console.log(result);
}

// 次のレッスン: 値を返す
function add(a, b) {
  let result = a + b;
  return result;  // 結果を返す
}

let sum = add(5, 3);  // sumに8が代入される
```

戻り値を使うと、関数の結果を他の処理で使えるようになります！
