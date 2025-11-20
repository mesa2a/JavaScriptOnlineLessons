# Lesson 026: 数値の入力

このレッスンでは、ユーザーから数値を入力してもらい、計算に使う方法を学びます。

## promptで入力される値は文字列

前のレッスンで学んだ`prompt`は、ユーザーからの入力を受け取ることができます。しかし、`prompt`で入力された値は、常に文字列として扱われます。

```javascript
let age = prompt("年齢は？");
console.log(age);  // 例: "20"（文字列）
```

ユーザーが「20」と入力しても、それは数値の20ではなく、文字列の"20"になります。

## 文字列と数値の違い

文字列と数値では、演算の結果が異なります。

### 文字列の足し算

```javascript
let a = "10";
let b = "5";
let result = a + b;
console.log(result);  // "105"（文字列として連結される）
```

文字列同士を`+`で足すと、連結されて"105"になります。

### 数値の足し算

```javascript
let a = 10;
let b = 5;
let result = a + b;
console.log(result);  // 15（数値として計算される）
```

数値同士を`+`で足すと、計算されて15になります。

## Number関数で数値に変換する

文字列を数値に変換するには、`Number`関数を使います。

```javascript
let str = "20";
let num = Number(str);
console.log(num);  // 20（数値）
```

`Number`関数は、文字列を数値に変換します。

### promptとNumberの組み合わせ

```javascript
let age = prompt("年齢は？");
let num = Number(age);
console.log(num + 10);  // ユーザーが20と入力すると、30が表示される
```

この例では、次のような流れになります。

1. ユーザーが「20」と入力する
2. `age`には文字列の"20"が入る
3. `Number(age)`で数値の20に変換される
4. `num + 10`で30になる

## 実用例

### 例1: 10年後の年齢を計算する

```javascript
function calculateAge() {
  let age = prompt("現在の年齢は？");
  let num = Number(age);
  let future = num + 10;

  const elem = document.getElementById("result");
  elem.textContent = "10年後は" + future + "歳です";
}
```

### 例2: 2つの数値を足す

```javascript
function addNumbers() {
  let first = prompt("1つ目の数値は？");
  let second = prompt("2つ目の数値は？");

  let num1 = Number(first);
  let num2 = Number(second);
  let sum = num1 + num2;

  const elem = document.getElementById("result");
  elem.textContent = "合計は" + sum + "です";
}
```

## Numberを使わない場合の問題

`Number`を使わないと、意図しない結果になります。

```javascript
let age = prompt("年齢は？");  // ユーザーが"20"と入力
let result = age + 10;
console.log(result);  // "2010"（文字列として連結される）
```

この場合、"20" + 10 は "2010"になってしまいます。

## 数値に変換できない場合

文字列が数値に変換できない場合、`Number`関数は`NaN`（Not a Number）を返します。

```javascript
let str = "abc";
let num = Number(str);
console.log(num);  // NaN
```

`NaN`は「数値ではない」という意味の特殊な値です。

## 計算に使う

数値に変換した後は、様々な計算ができます。

### 足し算

```javascript
let age = Number(prompt("年齢は？"));
let result = age + 5;
```

### 引き算

```javascript
let year = Number(prompt("生まれた年は？"));
let age = 2024 - year;
```

### 掛け算

```javascript
let price = Number(prompt("単価は？"));
let quantity = Number(prompt("個数は？"));
let total = price * quantity;
```

### 割り算

```javascript
let total = Number(prompt("合計金額は？"));
let people = Number(prompt("人数は？"));
let perPerson = total / people;
```

## 実践例

### 例: 簡単な計算機

HTML:

```html
<p id="result"></p>
<button onclick="calculate()">計算する</button>
```

JavaScript:

```javascript
function calculate() {
  let num1 = prompt("1つ目の数値は？");
  let num2 = prompt("2つ目の数値は？");

  let a = Number(num1);
  let b = Number(num2);

  let sum = a + b;
  let diff = a - b;
  let product = a * b;
  let quotient = a / b;

  const elem = document.getElementById("result");
  elem.textContent = "足し算: " + sum + ", 引き算: " + diff +
                     ", 掛け算: " + product + ", 割り算: " + quotient;
}
```

## 練習問題

次の要件を満たすページを作成してください。

1. id="result1"の要素を用意する
2. id="result2"の要素を用意する
3. id="result3"の要素を用意する
4. calculateAge関数を定義し、次の処理を行う
   - promptで「現在の年齢は？」と質問する
   - 入力された値をNumber関数で数値に変換する
   - 数値に10を足す
   - id="result1"の要素のtextContentに「10年後は○○歳です」と表示する
5. calculateDouble関数を定義し、次の処理を行う
   - promptで「数値を入力してください」と質問する
   - 入力された値をNumber関数で数値に変換する
   - 数値を2倍にする
   - id="result2"の要素のtextContentに「2倍は○○です」と表示する
6. calculateSum関数を定義し、次の処理を行う
   - promptで「1つ目の数値は？」と質問する
   - promptで「2つ目の数値は？」と質問する
   - 両方の値をNumber関数で数値に変換する
   - 2つの数値を足す
   - id="result3"の要素のtextContentに「合計は○○です」と表示する
7. 3つのボタンを作成し、それぞれクリックすると対応する関数が実行されるようにする

## ポイント

- `prompt`で入力された値は文字列です
- `Number`関数で文字列を数値に変換できます
- 数値に変換しないと、計算が正しく行われません
- 変換できない文字列は`NaN`になります

## まとめ

このレッスンでは、ユーザーから数値を入力してもらい、計算に使う方法を学びました。

- `prompt`で入力される値は常に文字列です
- `Number`関数で文字列を数値に変換します
- 数値に変換することで、正しく計算ができます
- 変換後は、足し算、引き算、掛け算、割り算などができます

これにより、ユーザーの入力を使った計算プログラムを作ることができます。
