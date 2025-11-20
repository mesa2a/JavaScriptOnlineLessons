# Lesson 031: 足し算計算機

このレッスンでは、2つの数値を入力して足し算をする計算機を作ります。

## 足し算計算機とは

ユーザーが2つの数値を入力し、ボタンをクリックすると合計が表示されるプログラムです。

## 基本的な構造

足し算計算機には次の要素が必要です。

1. 1つ目の数値を入力するinput要素
2. 2つ目の数値を入力するinput要素
3. 足し算を実行するボタン
4. 結果を表示する要素

## 実装の流れ

足し算計算機は次の手順で作ります。

1. 2つのinput要素から値を取得する
2. 文字列を数値に変換する
3. 2つの数値を足し算する
4. 結果を画面に表示する

## コード例

HTML:

```html
<input id="num1" type="text" placeholder="数値1">
<input id="num2" type="text" placeholder="数値2">
<button onclick="calculate()">計算</button>
<p id="result"></p>
```

JavaScript:

```javascript
function calculate() {
  const input1 = document.getElementById("num1");
  const input2 = document.getElementById("num2");

  const value1 = input1.value;
  const value2 = input2.value;

  const num1 = Number(value1);
  const num2 = Number(value2);

  const sum = num1 + num2;

  const result = document.getElementById("result");
  result.textContent = "答え: " + sum;
}
```

## 処理の詳細

### 1. 値を取得する

```javascript
const input1 = document.getElementById("num1");
const input2 = document.getElementById("num2");

const value1 = input1.value;
const value2 = input2.value;
```

2つのinput要素から値を取得します。この時点では、値は文字列です。

### 2. 数値に変換する

```javascript
const num1 = Number(value1);
const num2 = Number(value2);
```

`Number`関数で文字列を数値に変換します。これを忘れると、文字列として連結されてしまいます。

### 3. 計算する

```javascript
const sum = num1 + num2;
```

数値に変換した後に足し算をします。

### 4. 結果を表示する

```javascript
const result = document.getElementById("result");
result.textContent = "答え: " + sum;
```

計算結果を画面に表示します。

## Number変換を忘れた場合

Number変換を忘れると、文字列として連結されてしまいます。

```javascript
// 悪い例
const value1 = "10";
const value2 = "20";
const sum = value1 + value2;
console.log(sum);  // "1020"（文字列として連結される）
```

```javascript
// 良い例
const value1 = "10";
const value2 = "20";
const num1 = Number(value1);
const num2 = Number(value2);
const sum = num1 + num2;
console.log(sum);  // 30（数値として計算される）
```

## より簡潔な書き方

変数の宣言を減らして、より簡潔に書くこともできます。

```javascript
function calculate() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const sum = num1 + num2;

  const result = document.getElementById("result");
  result.textContent = "答え: " + sum;
}
```

## リアルタイム計算

`oninput`イベントを使えば、入力するたびに計算できます。

HTML:

```html
<input id="num1" type="text" oninput="calculate()" placeholder="数値1">
<input id="num2" type="text" oninput="calculate()" placeholder="数値2">
<p id="result"></p>
```

JavaScript:

```javascript
function calculate() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const sum = num1 + num2;

  const result = document.getElementById("result");
  result.textContent = "答え: " + sum;
}
```

どちらのinput要素でも、入力するたびに計算結果が更新されます。

## 空の入力への対応

ユーザーが何も入力していない場合、`Number("")`は0になります。

```javascript
const num = Number("");
console.log(num);  // 0
```

このため、何も入力されていないときは0として計算されます。

## 練習問題

次の要件を満たす足し算計算機を作成してください。

1. id="num1"のinput要素を用意する
2. id="num2"のinput要素を用意する
3. id="result"の要素を用意する
4. calculateAdd関数を定義し、次の処理を行う
   - id="num1"の値を取得し、Number関数で数値に変換する
   - id="num2"の値を取得し、Number関数で数値に変換する
   - 2つの数値を足し算する
   - id="result"の要素のtextContentに「答え: 」+合計値を設定する
5. ボタンを作成し、クリックするとcalculateAdd関数が実行されるようにする

## ポイント

- input要素から取得した値は文字列です
- `Number`関数で数値に変換してから計算します
- 数値変換を忘れると文字列として連結されます
- `oninput`を使えばリアルタイムに計算できます
- 空の文字列をNumber変換すると0になります

## まとめ

このレッスンでは、足し算計算機を作成しました。

- 2つのinput要素から値を取得します
- `Number`関数で文字列を数値に変換します
- 数値を足し算して結果を表示します
- リアルタイム計算も可能です

これにより、ユーザーの入力を使った計算プログラムを作ることができます。
