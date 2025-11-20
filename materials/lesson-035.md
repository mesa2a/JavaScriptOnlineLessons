# レッスン35: 文字列の比較

前回のレッスンでは、数値の比較について学びました。このレッスンでは、文字列（テキスト）を使った比較方法を学びます。パスワードチェックや答え合わせなど、実用的なプログラムを作れるようになります。

## 文字列とは

文字列とは、文字の並びのことです。JavaScriptでは、ダブルクォーテーション（"）で囲んで表現します。

```javascript
let name = "太郎";
let answer = "yes";
let password = "secret123";
```

これまで、数値を比較してきましたが、文字列も同じように比較できます。

## 文字列の比較

文字列を比較するには、===演算子を使います。

```javascript
let answer = "yes";

if (answer === "yes") {
  console.log("はいと答えました");
}
```

このプログラムでは、answerが"yes"という文字列と等しい場合に、メッセージが表示されます。

## 実践例: 簡単なパスワードチェック

パスワードが正しいかどうかをチェックするプログラムを作ってみましょう。

```javascript
function checkPassword() {
  let password = "abc123";

  if (password === "abc123") {
    const elem = document.getElementById("result");
    elem.textContent = "パスワードが正しいです";
  }
}
```

passwordが"abc123"と等しい場合に、「パスワードが正しいです」と表示されます。

## 文字列と数値の違い

文字列の"123"と数値の123は、見た目は同じですが、異なるものです。

```javascript
let text = "123";
let num = 123;

console.log(text === num);  // false
```

文字列と数値を比較すると、falseになります。===は型も含めて厳密に比較するからです。

```javascript
let text = "123";

if (text === "123") {
  console.log("文字列の123です");  // これは実行される
}

if (text === 123) {
  console.log("数値の123です");  // これは実行されない
}
```

## 大文字と小文字の区別

JavaScriptでは、文字列の比較で大文字と小文字は区別されます。

```javascript
let answer = "yes";

console.log(answer === "yes");  // true
console.log(answer === "Yes");  // false
console.log(answer === "YES");  // false
```

"yes"と"Yes"と"YES"は、すべて異なる文字列として扱われます。

```javascript
function checkAnswer() {
  let answer = "yes";

  if (answer === "yes") {
    const elem = document.getElementById("result");
    elem.textContent = "小文字のyesです";
  }

  if (answer === "Yes") {
    const elem = document.getElementById("result");
    elem.textContent = "大文字始まりのYesです";
  }
}
```

## 不等価の判定

文字列が等しくないことを判定するには、!==演算子を使います。

```javascript
let answer = "no";

if (answer !== "yes") {
  console.log("yesではありません");
}
```

answerが"yes"でない場合に、メッセージが表示されます。

## 実践例: クイズアプリ

簡単なクイズアプリを作ってみましょう。

```javascript
function checkQuiz() {
  let answer = "Tokyo";

  if (answer === "Tokyo") {
    const elem = document.getElementById("result");
    elem.textContent = "正解です";
  }

  if (answer !== "Tokyo") {
    const elem = document.getElementById("result");
    elem.textContent = "不正解です";
  }
}
```

## 複数の答えをチェック

複数のif文を使って、複数の答えをチェックできます。

```javascript
function checkColor() {
  let color = "red";

  if (color === "red") {
    const elem = document.getElementById("result");
    elem.textContent = "赤が選ばれました";
  }

  if (color === "blue") {
    const elem = document.getElementById("result");
    elem.textContent = "青が選ばれました";
  }

  if (color === "green") {
    const elem = document.getElementById("result");
    elem.textContent = "緑が選ばれました";
  }
}
```

## promptとの組み合わせ

promptで入力された文字列を判定することもできます。

```javascript
function checkInput() {
  let answer = prompt("yesかnoを入力してください");

  if (answer === "yes") {
    const elem = document.getElementById("result");
    elem.textContent = "yesが入力されました";
  }

  if (answer === "no") {
    const elem = document.getElementById("result");
    elem.textContent = "noが入力されました";
  }
}
```

ただし、promptは次回以降のレッスンで詳しく学ぶので、今回は変数に直接文字列を代入する方法を使います。

## 空文字列

何も入力されていない状態を表す特別な文字列を「空文字列」と呼びます。""と書きます。

```javascript
let text = "";

if (text === "") {
  console.log("空文字列です");
}
```

空文字列は、文字が1つもない状態を表します。

## 変数同士の比較

変数同士を比較することもできます。

```javascript
function compare() {
  let userAnswer = "Tokyo";
  let correctAnswer = "Tokyo";

  if (userAnswer === correctAnswer) {
    const elem = document.getElementById("result");
    elem.textContent = "正解です";
  }
}
```

## まとめ

このレッスンでは、以下のことを学びました。

- 文字列は"で囲んで表現する
- ===で文字列が等しいかどうかを判定できる
- !==で文字列が等しくないかどうかを判定できる
- 文字列の"123"と数値の123は異なる
- 大文字と小文字は区別される
- 空文字列は""で表す
- 変数同士を比較できる

次のレッスンでは、条件分岐を使った総合演習を行います。

## 練習問題

### 問題1: パスワードチェック

ボタンをクリックしたときに、パスワードが"hello"と等しい場合に「ログイン成功」と表示するプログラムを作成してください。

### 問題2: 色判定

ボタンをクリックしたときに、色の変数が"red"の場合に「赤です」、"blue"の場合に「青です」と表示するプログラムを作成してください。

2つのif文を使ってください。

### 問題3: クイズ

ボタンをクリックしたときに、答えが"cat"と等しい場合に「正解」、等しくない場合に「不正解」と表示するプログラムを作成してください。

===と!==の両方を使ってください。

---

次のレッスンでは、これまで学んだ条件分岐を使って総合的な演習を行います。
