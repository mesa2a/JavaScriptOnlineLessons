# Lesson 112: 戻り値

## 学習目標
- 関数から値を返す（return）方法を理解する
- 戻り値を使って計算結果を受け取れるようになる
- 戻り値を使った関数の組み合わせができるようになる

## 戻り値とは？

これまでの関数は、画面に何かを表示したり、alertを出したりする**動作**だけを行っていました。

しかし、関数には**計算結果を返す**こともできます。これを**戻り値**（または返り値）と言います。

### 戻り値なしの場合（今まで）

```javascript
function showSum() {
  const result = 5 + 3;
  alert(result);
}

showSum();  // 画面に8と表示される
```

この関数は、計算結果を画面に表示するだけです。計算結果を他の場所で使うことはできません。

### 戻り値ありの場合（新しい方法）

```javascript
function getSum() {
  const result = 5 + 3;
  return result;  // 計算結果を返す
}

const answer = getSum();  // 8が変数answerに入る
alert(answer);  // 8
```

この関数は、計算結果を**返す**ので、変数に保存したり、他の計算に使ったりできます。

## returnの基本

### 構文

```javascript
function 関数名(引数) {
  // 処理
  return 返したい値;
}

// 使い方
const 結果 = 関数名(引数);
```

### 重要なポイント

1. **returnで値を返す**
2. **returnの後の処理は実行されない**
3. **returnがないと、undefinedが返される**

```javascript
function sample() {
  return 100;
  alert('これは実行されない');  // returnの後は実行されない
}

const value = sample();  // 100
```

## 実践例1: 計算関数

```javascript
// 2つの数を足す関数
function add(a, b) {
  return a + b;
}

// 2つの数を掛ける関数
function multiply(a, b) {
  return a * b;
}

// 使い方
const sum = add(5, 3);        // 8
const product = multiply(4, 7);  // 28

// 戻り値を使って、さらに計算もできる
const total = add(10, multiply(2, 5));  // 10 + 10 = 20
alert(total);
```

## 実践例2: 消費税計算

```javascript
// 消費税を含めた金額を計算する関数
function addTax(price) {
  const tax = price * 0.1;  // 10%の税
  return price + tax;
}

// 使い方
const price1 = addTax(1000);  // 1100
const price2 = addTax(500);   // 550

alert('税込価格: ' + price1);
```

## 実践例3: 判定関数

戻り値は、数値だけでなく、真偽値（true/false）や文字列も返せます：

```javascript
// 成人かどうかを判定する関数
function isAdult(age) {
  return age >= 20;
}

// 使い方
if (isAdult(25)) {
  alert('成人です');
}

if (!isAdult(15)) {
  alert('未成年です');
}
```

## returnとalertの使い分け

### ❌ 良くない例（関数内で表示）

```javascript
function calculateTotal(price, quantity) {
  const total = price * quantity;
  // 関数の中で表示してしまう
  alert(total);
}

calculateTotal(100, 5);
```

この関数は、計算結果を**他の用途で使えません**。

### ✅ 良い例（戻り値を使う）

```javascript
function calculateTotal(price, quantity) {
  const total = price * quantity;
  return total;  // 計算結果を返す
}

// 呼び出し側で、好きなように使える
const result = calculateTotal(100, 5);
alert('合計: ' + result);
document.getElementById('output').textContent = result;
```

戻り値を使うと、関数が**再利用しやすく**なります。

## returnの省略記法

簡潔に書くこともできます：

```javascript
// 長い書き方
function add(a, b) {
  const result = a + b;
  return result;
}

// 短い書き方（同じ意味）
function add(a, b) {
  return a + b;
}
```

## 練習問題

### 問題: 計算アプリを作ろう

以下の要件を満たすアプリを作成してください：

1. 2つの数値を入力するフォームがある
2. 「足し算」「引き算」「掛け算」「割り算」のボタンがある
3. ボタンを押すと、計算結果が表示される
4. 以下の関数を使う（すべて戻り値を返す）：
   - `add(a, b)`: 足し算の結果を返す
   - `subtract(a, b)`: 引き算の結果を返す
   - `multiply(a, b)`: 掛け算の結果を返す
   - `divide(a, b)`: 割り算の結果を返す

### ヒント

```javascript
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function calculate(operation) {
  const num1 = Number(document.getElementById('num1').value);
  const num2 = Number(document.getElementById('num2').value);
  let result;

  if (operation === 'add') {
    result = add(num1, num2);
  } else if (operation === 'subtract') {
    result = subtract(num1, num2);
  } else if (operation === 'multiply') {
    result = multiply(num1, num2);
  } else if (operation === 'divide') {
    result = divide(num1, num2);
  }

  document.getElementById('output').textContent = result;
}
```

## 戻り値なしの場合

returnを書かない場合、関数は`undefined`を返します：

```javascript
function noReturn() {
  alert('処理中');
  // returnなし
}

const result = noReturn();  // undefined
```

## まとめ

- **return**を使うと、関数から値を返せる
- 戻り値は、変数に保存したり、他の計算に使ったりできる
- returnの後の処理は実行されない
- returnがないと、undefinedが返される
- 戻り値を使うと、関数が再利用しやすくなる

次のレッスンでは、関数内で**複数の処理**を行う方法を学びます。

## 復習問題

1. 戻り値とは何ですか？
2. returnの後のコードは実行されますか？
3. 2つの数の平均を返す関数`average(a, b)`を書いてください
