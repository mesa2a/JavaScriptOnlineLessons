# レッスン40: エラー処理

これまでのレッスンでは、ユーザーが正しい入力をすることを前提にプログラムを作ってきました。しかし、実際のアプリケーションでは、ユーザーが予想外の入力をすることがあります。このレッスンでは、if文を使ってエラーを検出し、適切に処理する方法を学びます。

## エラー処理とは

エラー処理とは、プログラムが予期しない状況に遭遇したときに、適切に対応する仕組みのことです。例えば、以下のような状況があります。

- 数値を入力してほしいのに、文字を入力された
- 計算に必要な値が入力されていない
- 0で割り算をしようとしている

これらの状況を検出して、ユーザーに分かりやすいメッセージを表示することが重要です。

## NaN（Not a Number）とは

JavaScriptでは、数値でないものをNumber()で変換しようとすると、NaNという特殊な値になります。

```javascript
const text = "こんにちは";
const num = Number(text);
console.log(num);  // NaN
```

NaNは「Not a Number」の略で、「数値ではない」という意味です。

## NaNの判定方法

NaNかどうかを判定するには、isNaN()という関数を使います。

```javascript
const text = "こんにちは";
const num = Number(text);

if (isNaN(num)) {
  console.log("数値ではありません");
} else {
  console.log("数値です");
}
```

isNaN()は、引数がNaNの場合にtrueを返し、数値の場合にfalseを返します。

## 実践例: 数値チェック

入力された値が数値かどうかをチェックするプログラムを作ってみましょう。

```javascript
function checkNumber() {
  let input = "abc";
  let num = Number(input);

  if (isNaN(num)) {
    const elem = document.getElementById("result");
    elem.textContent = "エラー: 数値を入力してください";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "正しい数値です: " + num;
  }
}
```

## 空文字列のチェック

inputの値が空の場合、valueプロパティは空文字列（""）になります。空文字列をNumber()で変換すると、0になります。

```javascript
const value = "";
const num = Number(value);
console.log(num);  // 0
```

0と空文字列を区別するには、Number()で変換する前に空文字列かどうかをチェックします。

```javascript
function checkInput() {
  let value = "";

  if (value === "") {
    const elem = document.getElementById("result");
    elem.textContent = "エラー: 入力されていません";
  } else {
    const num = Number(value);
    const elem = document.getElementById("result");
    elem.textContent = "入力された値: " + num;
  }
}
```

## 0で割り算をした場合

JavaScriptでは、0で割り算をしてもエラーにはなりません。代わりにInfinityという特殊な値になります。

```javascript
const result = 10 / 0;
console.log(result);  // Infinity
```

Infinityは「無限大」を表す値です。マイナスの数を0で割ると、-Infinityになります。

```javascript
const result = -10 / 0;
console.log(result);  // -Infinity
```

0で割り算をしたかどうかは、割る数が0かどうかで判定します。

```javascript
function divide() {
  let num1 = 10;
  let num2 = 0;

  if (num2 === 0) {
    const elem = document.getElementById("result");
    elem.textContent = "エラー: 0で割ることはできません";
  } else {
    const result = num1 / num2;
    const elem = document.getElementById("result");
    elem.textContent = "答え: " + result;
  }
}
```

## エラーメッセージの表示

エラーが発生したときは、ユーザーに分かりやすいメッセージを表示します。HTMLに専用の要素を用意しておくと便利です。

```html
<p id="error" style="color: red;"></p>
```

エラーが発生したときは、この要素にメッセージを表示します。

```javascript
function calculate() {
  const value = "abc";
  const num = Number(value);
  const error = document.getElementById("error");

  if (isNaN(num)) {
    error.textContent = "正しい数値を入力してください";
  } else {
    error.textContent = "";  // エラーメッセージをクリア
    // 正常な処理
  }
}
```

## returnで処理を終了

エラーが発生した場合は、それ以降の処理を実行せずに関数を終了できます。returnを使います。

```javascript
function calculate() {
  const value = "";
  const error = document.getElementById("error");

  if (value === "") {
    error.textContent = "数値を入力してください";
    return;  // ここで関数を終了
  }

  // 以下の処理は、valueが空でない場合のみ実行される
  const num = Number(value);
  console.log(num);
}
```

## 実践例: 安全な割り算計算機

これまで学んだエラー処理を組み合わせて、安全な割り算計算機を作ってみましょう。

```javascript
function safeDivide() {
  const value1 = "10";
  const value2 = "2";
  const error = document.getElementById("error");
  const result = document.getElementById("result");

  // エラーメッセージと結果をクリア
  error.textContent = "";
  result.textContent = "";

  // 空文字列チェック
  if (value1 === "" || value2 === "") {
    error.textContent = "両方の数値を入力してください";
    return;
  }

  // 数値変換
  const num1 = Number(value1);
  const num2 = Number(value2);

  // NaNチェック
  if (isNaN(num1) || isNaN(num2)) {
    error.textContent = "正しい数値を入力してください";
    return;
  }

  // 0で割るチェック
  if (num2 === 0) {
    error.textContent = "0で割ることはできません";
    return;
  }

  // 正常な計算
  const answer = num1 / num2;
  result.textContent = "答え: " + answer;
}
```

## エラーチェックの順序

エラーチェックは、以下の順序で行うのが一般的です。

1. 空文字列チェック（入力されているか）
2. NaNチェック（数値に変換できるか）
3. 0チェック（0で割ろうとしていないか）
4. 正常な処理

この順序で行うことで、すべてのエラーを適切に検出できます。

## まとめ

このレッスンでは、以下のことを学びました。

- NaNは「数値ではない」ことを表す特殊な値
- isNaN()関数で数値かどうかを判定できる
- 空文字列は === "" で判定できる
- 0で割るとInfinityになる
- returnで関数の実行を途中で終了できる
- エラーメッセージ用の要素を用意すると便利
- 複数のエラーチェックを順番に行う

エラー処理を適切に行うことで、ユーザーにとって使いやすいアプリケーションを作ることができます。

## 練習問題

### 問題1: 数値チェック

ボタンをクリックしたときに、変数の値が数値に変換できるかチェックするプログラムを作成してください。

- 数値に変換できる場合: 「正しい数値です」と表示
- 数値に変換できない場合: 「エラー: 数値ではありません」と表示

isNaN()を使ってください。

### 問題2: 空文字列チェック

ボタンをクリックしたときに、変数が空文字列かどうかをチェックするプログラムを作成してください。

- 空文字列の場合: 「エラー: 入力されていません」と表示
- 空文字列でない場合: 「入力された値: 」に続けて値を表示

### 問題3: 安全な割り算

ボタンをクリックしたときに、以下のエラーチェックを行う割り算プログラムを作成してください。

1. 両方の値が入力されているか
2. 両方の値が数値に変換できるか
3. 割る数が0ではないか

すべてのチェックをパスした場合のみ、計算結果を表示してください。

---

次のレッスンでは、入力方法の比較について学びます。
