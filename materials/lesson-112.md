# Lesson 112: 戻り値

> **レッスン日**: 2025-11-26

## このレッスンで学ぶこと

### 前回の復習
レッスン111では、**引数を受け取る関数**を学びました。引数を使うことで、関数に異なる値を渡して、同じ処理を柔軟に実行できるようになりました。

```javascript
function greet(name) {  // nameはパラメータ
  console.log("こんにちは、" + name + "さん");
}

greet("太郎");  // "太郎"は引数
greet("花子");  // "花子"は引数
```

### よくある場面
「関数で計算した結果を、他の計算に使いたい」「関数の処理結果を変数に保存したい」という場面はよくあります。

たとえば、消費税計算をする関数を作った場合：
```javascript
// ❌ この関数は計算結果を表示するだけ
function showTaxIncluded(price) {
  const total = price * 1.1;
  alert("税込: " + total);
}

showTaxIncluded(1000);  // 表示されるだけで、計算結果を使えない
```

この関数は計算結果を表示するだけで、**計算結果を他の場所で使うことができません**。

今回学ぶ**戻り値**を使えば、このような問題を解決できます：
```javascript
// ✅ この関数は計算結果を返す
function getTaxIncluded(price) {
  const total = price * 1.1;
  return total;  // 計算結果を返す
}

const price1 = getTaxIncluded(1000);  // 1100
const price2 = getTaxIncluded(500);   // 550
const totalPrice = price1 + price2;   // 計算結果を使って、さらに計算できる
```

### 学習目標
このレッスンでは、次のことができるようになります：
1. **return文**を使って、関数から値を返せるようになる
2. 返された値を変数に保存して、他の処理で使えるようになる
3. 関数の戻り値を組み合わせて、より複雑な計算ができるようになる

---

## 1. 戻り値とは？

### 日常生活のアナロジー: 自動販売機

戻り値の概念を、自動販売機で考えてみましょう：

```
┌─────────────────────────────────────┐
│  自動販売機（関数）                     │
│                                     │
│  [お金を入れる] ← 引数（入力）          │
│  [ボタンを押す]                        │
│        ↓                            │
│   内部で処理                          │
│        ↓                            │
│  [商品が出てくる] ← 戻り値（出力）      │
└─────────────────────────────────────┘

お金を入れる = 引数
商品が出てくる = 戻り値
```

**重要なポイント**:
- **引数**: 関数に渡す情報（お金）
- **処理**: 関数内部で行われる計算や動作（商品を選ぶ）
- **戻り値**: 関数から返される結果（商品）

### プログラミングでの戻り値

```javascript
// 自動販売機のような関数
function buyDrink(money) {      // お金を受け取る（引数）
  const drink = "コーラ";        // 内部で処理
  return drink;                 // 商品を返す（戻り値）
}

const result = buyDrink(120);   // "コーラ"が変数resultに入る
console.log(result);            // "コーラ"
```

### 実行フロー
```
ステップ1: 関数を呼び出す
  buyDrink(120)
  └─ 引数: money = 120

ステップ2: 関数内部で処理
  const drink = "コーラ"
  └─ 変数drink: "コーラ"

ステップ3: returnで値を返す
  return drink
  └─ "コーラ"を呼び出し元に返す

ステップ4: 戻り値を変数に保存
  const result = buyDrink(120)
  └─ result: "コーラ"
```

---

## 2. return文の基本

### 構文

```javascript
function 関数名(引数) {
  // 処理
  return 返したい値;
}

// 使い方
const 結果 = 関数名(引数);
```

### 基本的な例

```javascript
function getSum() {
  const result = 5 + 3;
  return result;      // 計算結果8を返す
}

const answer = getSum();  // 8が変数answerに入る
console.log(answer);      // 8
```

### 実行フロー図解
```
呼び出し: getSum()
  ↓
関数内部:
  ┌─────────────────────┐
  │ const result = 5 + 3 │
  │ result = 8          │
  └─────────────────────┘
  ↓
  return result
  ↓
  8を返す
  ↓
変数に保存:
  const answer = 8
```

---

## 3. returnの重要なルール

### ルール1: returnの後の処理は実行されない

```javascript
function sample() {
  console.log("1. これは実行される");
  return 100;
  console.log("2. これは実行されない");  // ⚠️ returnの後なので実行されない
  return 200;                           // ⚠️ これも実行されない
}

const value = sample();
console.log(value);  // 100
```

**実行フロー**:
```
sample() を呼び出す
  ↓
console.log("1. これは実行される")  ← 実行される
  ↓
return 100  ← ここで関数終了
  ↓
関数から抜ける（以降の処理は実行されない）
  ↓
value = 100
```

### ルール2: returnがないとundefinedが返される

```javascript
function noReturn() {
  console.log("処理中...");
  // returnがない
}

const result = noReturn();
console.log(result);  // undefined
```

**なぜundefinedなのか？**
- JavaScript では、関数が明示的に値を返さない場合、自動的に`undefined`を返す仕様になっています
- これは「何も返すものがない」ことを意味します

### ルール3: returnは関数をすぐに終了させる

```javascript
function checkAge(age) {
  if (age < 0) {
    return "年齢が不正です";  // ここで関数終了
  }

  if (age < 20) {
    return "未成年です";      // ここで関数終了
  }

  return "成人です";           // ここで関数終了
}

console.log(checkAge(15));   // "未成年です"
console.log(checkAge(25));   // "成人です"
console.log(checkAge(-5));   // "年齢が不正です"
```

**実行フロー（age = 15の場合）**:
```
checkAge(15)
  ↓
if (age < 0)  → false（スキップ）
  ↓
if (age < 20) → true
  ↓
return "未成年です"  ← ここで関数終了
  ↓
残りの処理は実行されない
```

---

## 4. 実践例: 計算関数

### 基本的な計算関数

```javascript
// 2つの数を足す関数
function add(a, b) {
  return a + b;
}

// 2つの数を引く関数
function subtract(a, b) {
  return a - b;
}

// 2つの数を掛ける関数
function multiply(a, b) {
  return a * b;
}

// 2つの数を割る関数
function divide(a, b) {
  return a / b;
}

// 使い方
const sum = add(5, 3);           // 8
const difference = subtract(10, 4);  // 6
const product = multiply(7, 6);      // 42
const quotient = divide(20, 4);      // 5

console.log(sum);        // 8
console.log(difference); // 6
console.log(product);    // 42
console.log(quotient);   // 5
```

### 実行フロー（add関数の場合）
```
呼び出し: add(5, 3)
  ↓
関数内部:
  ┌─────────────────┐
  │ a = 5          │
  │ b = 3          │
  │ return 5 + 3   │
  │ ↓              │
  │ return 8       │
  └─────────────────┘
  ↓
8を返す
  ↓
const sum = 8
```

### 戻り値を組み合わせる

戻り値を使うと、関数の結果を別の関数に渡すことができます：

```javascript
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

// 戻り値を別の関数に渡す
const result1 = add(10, multiply(2, 5));
// multiply(2, 5) → 10
// add(10, 10) → 20

console.log(result1);  // 20

// もっと複雑な計算
const result2 = multiply(add(3, 2), add(4, 1));
// add(3, 2) → 5
// add(4, 1) → 5
// multiply(5, 5) → 25

console.log(result2);  // 25
```

### 実行フロー図解
```
計算: add(10, multiply(2, 5))

ステップ1: 内側の関数から計算
  multiply(2, 5)
  └─ 2 * 5 = 10

ステップ2: 戻り値を使って外側の関数を計算
  add(10, 10)
  └─ 10 + 10 = 20

ステップ3: 最終結果
  result1 = 20
```

---

## 5. 実践例: 消費税計算

### 消費税を含めた金額を計算する

```javascript
// 消費税（10%）を含めた金額を返す関数
function addTax(price) {
  const tax = price * 0.1;    // 10%の税を計算
  const total = price + tax;   // 本体価格 + 税
  return total;
}

// 使い方
const price1 = addTax(1000);  // 1100
const price2 = addTax(500);   // 550
const price3 = addTax(2000);  // 2200

console.log("1000円の税込価格: " + price1);  // 1100
console.log("500円の税込価格: " + price2);   // 550
console.log("2000円の税込価格: " + price3);  // 2200

// 合計金額を計算
const totalPrice = price1 + price2 + price3;
console.log("合計: " + totalPrice);  // 2850
```

### 実行フロー（price = 1000の場合）
```
呼び出し: addTax(1000)
  ↓
関数内部:
  ┌──────────────────────────┐
  │ price = 1000            │
  │ ↓                       │
  │ const tax = 1000 * 0.1  │
  │ tax = 100               │
  │ ↓                       │
  │ const total = 1000 + 100 │
  │ total = 1100            │
  │ ↓                       │
  │ return 1100             │
  └──────────────────────────┘
  ↓
1100を返す
  ↓
const price1 = 1100
```

### より実用的な例: 割引と税込計算を組み合わせる

```javascript
// 割引を適用する関数
function applyDiscount(price, discountRate) {
  const discount = price * discountRate;
  return price - discount;
}

// 消費税を含める関数
function addTax(price) {
  return price * 1.1;
}

// 使い方: 20%割引 → 税込
const originalPrice = 10000;
const discountedPrice = applyDiscount(originalPrice, 0.2);  // 8000
const finalPrice = addTax(discountedPrice);                 // 8800

console.log("元の価格: " + originalPrice);       // 10000
console.log("割引後: " + discountedPrice);       // 8000
console.log("税込価格: " + finalPrice);          // 8800

// 1行で書くこともできる
const price = addTax(applyDiscount(10000, 0.2));
console.log(price);  // 8800
```

### 実行フロー図解
```
計算: addTax(applyDiscount(10000, 0.2))

ステップ1: 割引を計算
  applyDiscount(10000, 0.2)
  ├─ discount = 10000 * 0.2 = 2000
  ├─ return 10000 - 2000
  └─ 8000を返す

ステップ2: 税込価格を計算
  addTax(8000)
  ├─ return 8000 * 1.1
  └─ 8800を返す

ステップ3: 最終結果
  price = 8800
```

---

## 6. 実践例: 判定関数（真偽値を返す）

戻り値は数値だけでなく、**真偽値（true/false）**も返せます。

### 年齢判定

```javascript
// 成人かどうかを判定する関数
function isAdult(age) {
  return age >= 20;  // true または false が返される
}

// 使い方
if (isAdult(25)) {
  console.log("成人です");
}

if (!isAdult(15)) {
  console.log("未成年です");
}

// 変数に保存することもできる
const check1 = isAdult(18);  // false
const check2 = isAdult(22);  // true

console.log(check1);  // false
console.log(check2);  // true
```

### 実行フロー
```
呼び出し: isAdult(25)
  ↓
関数内部:
  ┌──────────────────┐
  │ age = 25        │
  │ ↓              │
  │ return 25 >= 20 │
  │ ↓              │
  │ return true     │
  └──────────────────┘
  ↓
trueを返す
  ↓
if (true) {
  console.log("成人です")
}
```

### より複雑な判定

```javascript
// 偶数かどうかを判定する関数
function isEven(number) {
  return number % 2 === 0;
}

// 範囲内かどうかを判定する関数
function isInRange(value, min, max) {
  return value >= min && value <= max;
}

// 使い方
console.log(isEven(4));   // true
console.log(isEven(7));   // false

console.log(isInRange(50, 0, 100));   // true
console.log(isInRange(150, 0, 100));  // false

// if文と組み合わせる
if (isEven(10) && isInRange(10, 1, 20)) {
  console.log("10は偶数で、1〜20の範囲内です");
}
```

---

## 7. returnとalertの使い分け

関数を設計するとき、**表示する処理**と**値を返す処理**を区別することが重要です。

### ❌ 良くない例: 関数内で表示してしまう

```javascript
function calculateTotal(price, quantity) {
  const total = price * quantity;
  alert("合計: " + total);  // ❌ 関数内で表示してしまう
}

calculateTotal(100, 5);  // "合計: 500" と表示される
```

**問題点**:
- 計算結果を他の用途で使えない
- 必ずalertが表示されてしまう
- 関数の再利用性が低い

### ✅ 良い例: 戻り値を使う

```javascript
function calculateTotal(price, quantity) {
  const total = price * quantity;
  return total;  // ✅ 計算結果を返す
}

// 呼び出し側で、好きなように使える
const result = calculateTotal(100, 5);

// 表示したい場合
alert("合計: " + result);

// 画面に表示したい場合
document.getElementById('output').textContent = result;

// さらに計算に使いたい場合
const taxIncluded = result * 1.1;
console.log(taxIncluded);
```

**メリット**:
- 計算結果を柔軟に使える
- 表示方法を呼び出し側で決められる
- 関数の再利用性が高い

### 比較図解
```
❌ 悪い設計:
  ┌─────────────────────────┐
  │ function calculate()    │
  │   計算                  │
  │   ↓                     │
  │   alert(結果)  ← 表示固定 │
  └─────────────────────────┘
  再利用しにくい

✅ 良い設計:
  ┌─────────────────────────┐
  │ function calculate()    │
  │   計算                  │
  │   ↓                     │
  │   return 結果           │
  └─────────────────────────┘
  ↓
  呼び出し側で自由に使える
  - alert(結果)
  - console.log(結果)
  - さらに計算に使う
```

---

## 8. returnの省略記法

計算結果を一度変数に保存せず、直接returnすることもできます。

### 長い書き方

```javascript
function add(a, b) {
  const result = a + b;
  return result;
}
```

### 短い書き方（同じ意味）

```javascript
function add(a, b) {
  return a + b;  // 直接計算結果を返す
}
```

**どちらを使うべき？**
- **短い書き方**: 単純な計算の場合
- **長い書き方**: 途中の値をデバッグしたい場合、計算が複雑な場合

### 複雑な計算の場合

```javascript
// 短い書き方（少し読みにくい）
function calculateDiscount(price, rate) {
  return price - (price * rate);
}

// 長い書き方（読みやすい）
function calculateDiscount(price, rate) {
  const discount = price * rate;
  const finalPrice = price - discount;
  return finalPrice;
}
```

複雑な計算の場合は、**段階的に変数に保存する方が読みやすい**です。

---

## 9. 完全なアプリ例: 計算機アプリ

戻り値を使った実用的なアプリを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>計算機アプリ</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }

    .container {
      background: #f5f5f5;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
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
      color: #555;
    }

    input[type="number"] {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
    }

    .button-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 20px;
    }

    button {
      padding: 15px;
      font-size: 18px;
      font-weight: bold;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover {
      opacity: 0.8;
    }

    .add { background: #4CAF50; color: white; }
    .subtract { background: #FF9800; color: white; }
    .multiply { background: #2196F3; color: white; }
    .divide { background: #f44336; color: white; }

    .result {
      background: white;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #4CAF50;
    }

    .result-text {
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }

    .empty {
      color: #999;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📱 計算機アプリ</h1>

    <div class="input-group">
      <label>数値1:</label>
      <input type="number" id="num1" value="0">
    </div>

    <div class="input-group">
      <label>数値2:</label>
      <input type="number" id="num2" value="0">
    </div>

    <div class="button-group">
      <button class="add" onclick="calculate('add')">➕ 足し算</button>
      <button class="subtract" onclick="calculate('subtract')">➖ 引き算</button>
      <button class="multiply" onclick="calculate('multiply')">✖️ 掛け算</button>
      <button class="divide" onclick="calculate('divide')">➗ 割り算</button>
    </div>

    <div class="result">
      <div id="output" class="result-text empty">計算結果がここに表示されます</div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
// 足し算の結果を返す関数
function add(a, b) {
  return a + b;
}

// 引き算の結果を返す関数
function subtract(a, b) {
  return a - b;
}

// 掛け算の結果を返す関数
function multiply(a, b) {
  return a * b;
}

// 割り算の結果を返す関数
function divide(a, b) {
  // 0で割ろうとした場合はエラーメッセージを返す
  if (b === 0) {
    return "エラー: 0で割れません";
  }
  return a / b;
}

// 計算を実行する関数
function calculate(operation) {
  // 入力値を取得して数値に変換
  const num1 = Number(document.getElementById('num1').value);
  const num2 = Number(document.getElementById('num2').value);

  let result;

  // 操作に応じて適切な関数を呼び出す
  if (operation === 'add') {
    result = add(num1, num2);
  } else if (operation === 'subtract') {
    result = subtract(num1, num2);
  } else if (operation === 'multiply') {
    result = multiply(num1, num2);
  } else if (operation === 'divide') {
    result = divide(num1, num2);
  }

  // 結果を画面に表示
  const output = document.getElementById('output');
  output.textContent = result;
  output.className = 'result-text';  // emptyクラスを削除
}
```

### 実行フロー（足し算ボタンをクリックした場合）
```
ユーザーが「足し算」ボタンをクリック
  ↓
calculate('add') が呼び出される
  ↓
ステップ1: 入力値を取得
  num1 = Number(document.getElementById('num1').value)
  num2 = Number(document.getElementById('num2').value)
  例: num1 = 10, num2 = 5
  ↓
ステップ2: 操作を判定
  if (operation === 'add') → true
  ↓
ステップ3: add関数を呼び出す
  result = add(10, 5)
  ↓
  add関数内部:
    return 10 + 5
    ↓
    return 15
  ↓
  result = 15
  ↓
ステップ4: 結果を表示
  output.textContent = 15
  画面に「15」が表示される
```

---

## 10. 練習問題

### 問題1: 平均を計算する関数

2つの数値の平均を返す関数`average(a, b)`を作成してください。

**ヒント**:
```javascript
function average(a, b) {
  // ここにコードを書く
}

console.log(average(10, 20));  // 15
console.log(average(5, 15));   // 10
```

<details>
<summary>解答例</summary>

```javascript
function average(a, b) {
  return (a + b) / 2;
}

// テスト
console.log(average(10, 20));  // 15
console.log(average(5, 15));   // 10
console.log(average(0, 100));  // 50
```

**実行フロー**:
```
average(10, 20)
  ↓
return (10 + 20) / 2
  ↓
return 30 / 2
  ↓
return 15
```
</details>

---

### 問題2: 温度変換アプリ

摂氏（℃）から華氏（°F）に変換する関数と、その逆の変換をする関数を作成し、完全なアプリを作ってください。

**変換式**:
- 摂氏 → 華氏: `(celsius * 9/5) + 32`
- 華氏 → 摂氏: `(fahrenheit - 32) * 5/9`

**要件**:
1. `celsiusToFahrenheit(celsius)`: 摂氏を華氏に変換して返す
2. `fahrenheitToCelsius(fahrenheit)`: 華氏を摂氏に変換して返す
3. 入力フィールドとボタンを用意する
4. 変換結果を画面に表示する

**HTML骨格**:
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>温度変換アプリ</title>
</head>
<body>
  <h1>温度変換アプリ</h1>

  <div>
    <label>温度を入力:</label>
    <input type="number" id="temperature" value="0">
  </div>

  <button onclick="convertToFahrenheit()">℃ → °F</button>
  <button onclick="convertToCelsius()">°F → ℃</button>

  <div id="output"></div>

  <script>
    // ここに関数を書く
  </script>
</body>
</html>
```

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>温度変換アプリ</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
    }

    .container {
      background: #f0f8ff;
      padding: 30px;
      border-radius: 10px;
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
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
    }

    .button-group {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    button {
      flex: 1;
      padding: 15px;
      font-size: 16px;
      font-weight: bold;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      color: white;
    }

    button:first-child {
      background: #FF5722;
    }

    button:last-child {
      background: #2196F3;
    }

    button:hover {
      opacity: 0.8;
    }

    .result {
      background: white;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      min-height: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🌡️ 温度変換アプリ</h1>

    <div class="input-group">
      <label>温度を入力:</label>
      <input type="number" id="temperature" value="0">
    </div>

    <div class="button-group">
      <button onclick="convertToFahrenheit()">℃ → °F</button>
      <button onclick="convertToCelsius()">°F → ℃</button>
    </div>

    <div class="result" id="output">ボタンを押してください</div>
  </div>

  <script>
    // 摂氏を華氏に変換する関数
    function celsiusToFahrenheit(celsius) {
      return (celsius * 9/5) + 32;
    }

    // 華氏を摂氏に変換する関数
    function fahrenheitToCelsius(fahrenheit) {
      return (fahrenheit - 32) * 5/9;
    }

    // 摂氏→華氏に変換して表示
    function convertToFahrenheit() {
      const temp = Number(document.getElementById('temperature').value);
      const result = celsiusToFahrenheit(temp);
      const rounded = Math.round(result * 10) / 10;  // 小数点第1位まで
      document.getElementById('output').textContent =
        temp + "℃ = " + rounded + "°F";
    }

    // 華氏→摂氏に変換して表示
    function convertToCelsius() {
      const temp = Number(document.getElementById('temperature').value);
      const result = fahrenheitToCelsius(temp);
      const rounded = Math.round(result * 10) / 10;  // 小数点第1位まで
      document.getElementById('output').textContent =
        temp + "°F = " + rounded + "℃";
    }
  </script>
</body>
</html>
```

**実行フロー（25℃を華氏に変換する場合）**:
```
convertToFahrenheit() が呼び出される
  ↓
ステップ1: 入力値を取得
  temp = Number(document.getElementById('temperature').value)
  temp = 25
  ↓
ステップ2: 変換関数を呼び出す
  result = celsiusToFahrenheit(25)
  ↓
  celsiusToFahrenheit関数内部:
    return (25 * 9/5) + 32
    ↓
    return 45 + 32
    ↓
    return 77
  ↓
  result = 77
  ↓
ステップ3: 小数点を丸める
  rounded = Math.round(77 * 10) / 10
  rounded = 77
  ↓
ステップ4: 結果を表示
  output.textContent = "25℃ = 77°F"
```
</details>

---

### 問題3: BMI計算アプリ（応用）

身長（cm）と体重（kg）からBMIを計算し、判定結果も表示するアプリを作成してください。

**BMI計算式**:
```
BMI = 体重(kg) ÷ (身長(m) × 身長(m))
```

**BMI判定**:
- 18.5未満: 低体重
- 18.5以上25未満: 普通体重
- 25以上30未満: 肥満(1度)
- 30以上: 肥満(2度以上)

**要件**:
1. `calculateBMI(weight, height)`: BMIを計算して返す関数
2. `judgeBMI(bmi)`: BMI値から判定結果を返す関数
3. 入力フィールド（体重、身長）を用意
4. 計算ボタンをクリックすると、BMI値と判定結果を表示

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>BMI計算アプリ</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }

    .container {
      background: #f5f5f5;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .input-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }

    input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
    }

    button {
      width: 100%;
      padding: 15px;
      font-size: 18px;
      font-weight: bold;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-bottom: 20px;
    }

    button:hover {
      background: #45a049;
    }

    .result {
      background: white;
      padding: 20px;
      border-radius: 5px;
      border: 2px solid #4CAF50;
    }

    .bmi-value {
      font-size: 32px;
      font-weight: bold;
      text-align: center;
      color: #333;
      margin-bottom: 10px;
    }

    .judgment {
      font-size: 20px;
      text-align: center;
      padding: 10px;
      border-radius: 5px;
      font-weight: bold;
    }

    .low { background: #E3F2FD; color: #1976D2; }
    .normal { background: #E8F5E9; color: #388E3C; }
    .overweight { background: #FFF3E0; color: #F57C00; }
    .obese { background: #FFEBEE; color: #D32F2F; }

    .hidden {
      display: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>⚖️ BMI計算アプリ</h1>

    <div class="input-group">
      <label>体重 (kg):</label>
      <input type="number" id="weight" value="60" step="0.1">
    </div>

    <div class="input-group">
      <label>身長 (cm):</label>
      <input type="number" id="height" value="170" step="0.1">
    </div>

    <button onclick="calculate()">BMIを計算</button>

    <div id="result" class="result hidden">
      <div class="bmi-value" id="bmi-value"></div>
      <div class="judgment" id="judgment"></div>
    </div>
  </div>

  <script>
    // BMIを計算する関数
    function calculateBMI(weight, height) {
      // 身長をcmからmに変換
      const heightInMeters = height / 100;
      // BMI = 体重 ÷ (身長 × 身長)
      const bmi = weight / (heightInMeters * heightInMeters);
      return bmi;
    }

    // BMI値から判定結果を返す関数
    function judgeBMI(bmi) {
      if (bmi < 18.5) {
        return {
          text: "低体重",
          className: "low"
        };
      } else if (bmi < 25) {
        return {
          text: "普通体重",
          className: "normal"
        };
      } else if (bmi < 30) {
        return {
          text: "肥満(1度)",
          className: "overweight"
        };
      } else {
        return {
          text: "肥満(2度以上)",
          className: "obese"
        };
      }
    }

    // 計算を実行する関数
    function calculate() {
      // 入力値を取得
      const weight = Number(document.getElementById('weight').value);
      const height = Number(document.getElementById('height').value);

      // 入力チェック
      if (weight <= 0 || height <= 0) {
        alert("正しい値を入力してください");
        return;
      }

      // BMIを計算
      const bmi = calculateBMI(weight, height);
      const bmiRounded = Math.round(bmi * 10) / 10;  // 小数点第1位まで

      // 判定結果を取得
      const judgment = judgeBMI(bmi);

      // 結果を表示
      document.getElementById('bmi-value').textContent = "BMI: " + bmiRounded;

      const judgmentElement = document.getElementById('judgment');
      judgmentElement.textContent = judgment.text;
      judgmentElement.className = "judgment " + judgment.className;

      // 結果エリアを表示
      document.getElementById('result').classList.remove('hidden');
    }
  </script>
</body>
</html>
```

**実行フロー（体重60kg、身長170cmの場合）**:
```
calculate() が呼び出される
  ↓
ステップ1: 入力値を取得
  weight = 60
  height = 170
  ↓
ステップ2: 入力チェック
  if (60 <= 0 || 170 <= 0) → false（チェックOK）
  ↓
ステップ3: BMIを計算
  bmi = calculateBMI(60, 170)
  ↓
  calculateBMI関数内部:
    heightInMeters = 170 / 100 = 1.7
    bmi = 60 / (1.7 * 1.7)
    bmi = 60 / 2.89
    bmi = 20.76...
    return 20.76
  ↓
  bmi = 20.76
  bmiRounded = 20.8
  ↓
ステップ4: 判定結果を取得
  judgment = judgeBMI(20.76)
  ↓
  judgeBMI関数内部:
    if (20.76 < 18.5) → false
    else if (20.76 < 25) → true
    return {
      text: "普通体重",
      className: "normal"
    }
  ↓
  judgment = { text: "普通体重", className: "normal" }
  ↓
ステップ5: 結果を表示
  bmi-value.textContent = "BMI: 20.8"
  judgment.textContent = "普通体重"
  judgment.className = "judgment normal"
  結果エリアを表示
```
</details>

---

## まとめ

### 重要なポイント

1. **return文の役割**
   - 関数から値を返すために使う
   - returnの後の処理は実行されない
   - returnがない場合は`undefined`が返される

2. **戻り値の利点**
   - 計算結果を変数に保存できる
   - 戻り値を他の関数に渡せる
   - 関数の再利用性が高まる

3. **良い設計**
   - 関数は**値を返す**役割に集中
   - 表示処理は呼び出し側で行う
   - これにより、関数が柔軟に使える

4. **関数の組み合わせ**
   ```javascript
   const result = add(10, multiply(2, 5));
   // 内側の関数から順に実行される
   ```

5. **returnのパターン**
   ```javascript
   // 直接返す
   function add(a, b) {
     return a + b;
   }

   // 変数に保存してから返す
   function add(a, b) {
     const result = a + b;
     return result;
   }
   ```

### カリキュラム要件チェック

このレッスンで学んだ内容を確認しましょう：

✅ **return文**: `return 値;` の構文を理解し、使えるようになりました
✅ **計算結果を返す**: 関数内で計算した結果をreturnで返せるようになりました
✅ **値を受け取る**: 関数の戻り値を変数に保存して使えるようになりました
✅ **【知識】戻り値の概念、関数の出力**: 戻り値とは何か、なぜ必要なのかを理解しました
✅ **成果物：計算関数**: 計算機アプリを作成し、戻り値を活用できるようになりました

---

## 次のレッスンの予告

次回のレッスン113では、**関数内で複数の処理**を行う方法を学びます。

これまでは単純な計算や判定を返す関数でしたが、次回は：
- 複数の変数を使った処理
- 条件分岐と戻り値の組み合わせ
- より複雑なロジックの実装

といった、実践的な関数の書き方を学びます。

---

**🎯 今日の達成目標**
- [x] return文の構文を理解する
- [x] 戻り値を変数に保存できる
- [x] 戻り値を使って関数を組み合わせられる
- [x] 計算機アプリを作成できる

お疲れさまでした！次のレッスンも頑張りましょう！
