# Lesson 032: 四則演算

このレッスンでは、足し算だけでなく、引き算、掛け算、割り算もできる計算機を作ります。

## 四則演算とは

四則演算とは、次の4つの計算のことです。

- 足し算（+）
- 引き算（-）
- 掛け算（*）
- 割り算（/）

## JavaScriptでの四則演算

JavaScriptでは、次の演算子を使います。

```javascript
let a = 10;
let b = 3;

let sum = a + b;      // 13 (足し算)
let diff = a - b;     // 7  (引き算)
let product = a * b;  // 30 (掛け算)
let quotient = a / b; // 3.333... (割り算)
```

## 四則演算計算機の構造

4つのボタンを用意し、それぞれの演算を実行できるようにします。

HTML:

```html
<input id="num1" type="text" placeholder="数値1">
<input id="num2" type="text" placeholder="数値2">
<button onclick="add()">足し算</button>
<button onclick="subtract()">引き算</button>
<button onclick="multiply()">掛け算</button>
<button onclick="divide()">割り算</button>
<p id="result"></p>
```

## 各演算の実装

### 足し算

```javascript
function add() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 + num2;

  const resultElem = document.getElementById("result");
  resultElem.textContent = "答え: " + result;
}
```

### 引き算

```javascript
function subtract() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 - num2;

  const resultElem = document.getElementById("result");
  resultElem.textContent = "答え: " + result;
}
```

### 掛け算

```javascript
function multiply() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 * num2;

  const resultElem = document.getElementById("result");
  resultElem.textContent = "答え: " + result;
}
```

### 割り算

```javascript
function divide() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 / num2;

  const resultElem = document.getElementById("result");
  resultElem.textContent = "答え: " + result;
}
```

## 演算子の優先順位

JavaScriptでは、掛け算と割り算が足し算と引き算より先に計算されます。

```javascript
let result = 2 + 3 * 4;
console.log(result);  // 14 (3 * 4 = 12が先に計算され、2 + 12 = 14)
```

括弧を使えば、順序を変更できます。

```javascript
let result = (2 + 3) * 4;
console.log(result);  // 20 (2 + 3 = 5が先に計算され、5 * 4 = 20)
```

## 割り算の注意点

### 小数の結果

割り算の結果は小数になることがあります。

```javascript
let result = 10 / 3;
console.log(result);  // 3.3333333333333335
```

### 0で割る

0で割ることはできません。JavaScriptでは、0で割ると`Infinity`（無限大）になります。

```javascript
let result = 10 / 0;
console.log(result);  // Infinity
```

注: エラー処理はif文を使いますが、まだ学習していないため、この段階では0で割らないことを前提とします。

## 実践例

### 例: 完全な四則演算計算機

HTML:

```html
<input id="num1" type="text" placeholder="数値1">
<input id="num2" type="text" placeholder="数値2">
<button onclick="add()">+</button>
<button onclick="subtract()">-</button>
<button onclick="multiply()">×</button>
<button onclick="divide()">÷</button>
<p id="result"></p>
```

JavaScript:

```javascript
function add() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 + num2;
  document.getElementById("result").textContent = num1 + " + " + num2 + " = " + result;
}

function subtract() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 - num2;
  document.getElementById("result").textContent = num1 + " - " + num2 + " = " + result;
}

function multiply() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 * num2;
  document.getElementById("result").textContent = num1 + " × " + num2 + " = " + result;
}

function divide() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 / num2;
  document.getElementById("result").textContent = num1 + " ÷ " + num2 + " = " + result;
}
```

## 練習問題

次の要件を満たす四則演算計算機を作成してください。

1. id="num1"のinput要素を用意する
2. id="num2"のinput要素を用意する
3. id="result"の要素を用意する
4. add関数を定義し、2つの数値を足し算して結果を表示する
5. subtract関数を定義し、2つの数値を引き算して結果を表示する
6. multiply関数を定義し、2つの数値を掛け算して結果を表示する
7. divide関数を定義し、2つの数値を割り算して結果を表示する
8. 4つのボタンを作成し、それぞれクリックすると対応する関数が実行されるようにする

すべての関数で、結果は「答え: 」+計算結果の形式で表示してください。

## ポイント

- 四則演算は `+`、`-`、`*`、`/` を使います
- どの演算も、Number関数で数値変換が必要です
- 掛け算と割り算は足し算と引き算より優先されます
- 割り算の結果は小数になることがあります
- 0で割ると`Infinity`になります

## まとめ

このレッスンでは、四則演算ができる計算機を作成しました。

- 足し算（+）、引き算（-）、掛け算（*）、割り算（/）を実装しました
- 各演算ごとに関数を定義しました
- すべての演算で数値変換が必要です
- 複数のボタンで異なる処理を実行できます

これにより、実用的な計算機を作ることができます。
