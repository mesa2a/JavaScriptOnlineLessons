# Lesson 116: ローカル変数

## 学習目標
- ローカル変数の概念を理解する
- 関数内で宣言した変数が外から見えないことを理解する
- 名前の衝突を回避する方法を理解する

## ローカル変数とは？

関数の**中**で宣言した変数は、**その関数の中でのみ**使えます。これを**ローカル変数**（局所変数）と言います。

### 基本的な例

```javascript
function test() {
  const message = 'こんにちは';  // ローカル変数
  console.log(message);  // OK
}

test();  // こんにちは
console.log(message);  // エラー！messageは関数の外では使えない
```

## なぜローカル変数が必要なのか？

### 1. 名前の衝突を防ぐ

```javascript
function greetMorning() {
  const message = 'おはよう';
  console.log(message);
}

function greetEvening() {
  const message = 'こんばんは';  // 別のローカル変数（衝突しない）
  console.log(message);
}

greetMorning();  // おはよう
greetEvening();  // こんばんは
```

各関数の`message`は別々のローカル変数なので、衝突しません。

### 2. 一時的な計算に使える

```javascript
function calculateTotal(price, quantity) {
  // これらは全てローカル変数
  const subtotal = price * quantity;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return total;
}

const result = calculateTotal(100, 5);
console.log(result);  // 550

// console.log(subtotal);  // エラー！subtotalは関数の外では使えない
```

## 引数もローカル変数

関数の**引数**も、ローカル変数として扱われます：

```javascript
function greet(name) {  // nameはローカル変数
  console.log('こんにちは、' + name + 'さん');
}

greet('太郎');  // こんにちは、太郎さん
// console.log(name);  // エラー！nameは関数の外では使えない
```

## ブロックスコープ

`if`や`for`などの**ブロック**の中で宣言した変数も、そのブロックの中でのみ使えます：

```javascript
function test() {
  if (true) {
    const message = 'ブロック内';
    console.log(message);  // OK
  }

  // console.log(message);  // エラー！messageはブロックの外では使えない
}
```

## 同じ名前の変数

関数ごとに別々のローカル変数なので、**同じ名前**を使っても問題ありません：

```javascript
function add(a, b) {
  const result = a + b;  // ローカル変数
  return result;
}

function multiply(a, b) {
  const result = a * b;  // 別のローカル変数（衝突しない）
  return result;
}

console.log(add(5, 3));       // 8
console.log(multiply(5, 3));  // 15
```

## 実践例: 温度変換

```javascript
function toFahrenheit(celsius) {
  // ローカル変数（この関数の中でのみ使える）
  const fahrenheit = celsius * 1.8 + 32;
  return fahrenheit;
}

function toKelvin(celsius) {
  // ローカル変数（別の関数なので、同じ名前でもOK）
  const kelvin = celsius + 273.15;
  return kelvin;
}

console.log(toFahrenheit(0));   // 32
console.log(toKelvin(0));       // 273.15

// console.log(fahrenheit);  // エラー！
// console.log(kelvin);      // エラー！
```

## ローカル変数のメリット

### 1. 独立性

関数が独立して動作するので、他の関数の影響を受けません：

```javascript
function calcA() {
  const value = 10;
  return value * 2;
}

function calcB() {
  const value = 20;  // calcAのvalueとは別の変数
  return value * 2;
}

console.log(calcA());  // 20
console.log(calcB());  // 40
```

### 2. 安全性

関数の外から変数を変更できないので、予期しない変更を防げます：

```javascript
function createMessage() {
  const secret = 'パスワード123';  // 外から見えない
  return '処理完了';
}

createMessage();
// console.log(secret);  // エラー！secretにはアクセスできない
```

## 練習問題

### 問題: 割引計算アプリを作ろう

以下の要件を満たすアプリを作成してください：

1. 価格と割引率を入力するフォームがある
2. 「計算」ボタンを押すと、割引後の価格が表示される
3. `calculateDiscount(price, rate)`関数を作成する
4. 関数内でローカル変数を使って計算する：
   - `discount`: 割引額
   - `finalPrice`: 割引後の価格

### ヒント

```javascript
function calculateDiscount(price, rate) {
  // ローカル変数（この関数の中でのみ使える）
  const discount = price * (rate / 100);
  const finalPrice = price - discount;

  return finalPrice;
}

function calculate() {
  const price = Number(document.getElementById('priceInput').value);
  const rate = Number(document.getElementById('rateInput').value);

  const result = calculateDiscount(price, rate);

  document.getElementById('output').textContent = '割引後: ' + result + '円';
}
```

## まとめ

- **ローカル変数**は、関数の中でのみ使える変数
- 関数の外からはアクセスできない
- 引数もローカル変数として扱われる
- ブロック（if、forなど）の中の変数もローカル変数
- 同じ名前の変数を異なる関数で使っても衝突しない
- 関数が独立して動作するので安全

次のレッスンでは、**グローバル変数**について学びます。

## 復習問題

1. ローカル変数とは何ですか？
2. 関数内で宣言した変数は、関数の外から使えますか？
3. ローカル変数を使うメリットは何ですか？
