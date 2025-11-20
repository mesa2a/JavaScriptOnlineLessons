# レッスン36: 週のまとめプロジェクト

これまでのレッスンで、if文を使った条件分岐について学んできました。このレッスンでは、これまで学んだ内容を組み合わせて、実用的な判定プログラムを作ります。

## これまで学んだこと

### レッスン33: 条件分岐入門
- if文の基本的な使い方
- 比較演算子（>=、<=、>、<）
- 真偽値（true/false）

### レッスン34: 比較演算子
- ===で等しいかどうかを判定
- !==で等しくないかどうかを判定
- 複数のif文を使った条件判定

### レッスン35: 文字列の比較
- 文字列の比較方法
- 大文字と小文字の区別
- パスワードチェックやクイズアプリ

## プロジェクト: 総合判定システム

これまで学んだ内容を組み合わせて、年齢判定、点数判定、カウンター判定を1つのプログラムにまとめます。

## 年齢判定

年齢に応じて、異なるメッセージを表示します。

```javascript
function checkAge() {
  let age = 25;

  if (age >= 20) {
    const elem = document.getElementById("result1");
    elem.textContent = "成人です";
  }

  if (age >= 18) {
    const elem = document.getElementById("result2");
    elem.textContent = "高校卒業年齢です";
  }

  if (age < 18) {
    const elem = document.getElementById("result3");
    elem.textContent = "未成年です";
  }
}
```

この例では、ageが25なので、「成人です」と「高校卒業年齢です」の両方が表示されます。

## 点数判定

テストの点数に応じて、異なる評価を表示します。

```javascript
function checkScore() {
  let score = 85;

  if (score >= 90) {
    const elem = document.getElementById("result1");
    elem.textContent = "優秀です";
  }

  if (score >= 80) {
    const elem = document.getElementById("result2");
    elem.textContent = "良好です";
  }

  if (score >= 60) {
    const elem = document.getElementById("result3");
    elem.textContent = "合格です";
  }

  if (score < 60) {
    const elem = document.getElementById("result4");
    elem.textContent = "不合格です";
  }
}
```

scoreが85の場合、「良好です」と「合格です」が表示されます。

## カウンター判定

カウンターの値に応じて、メッセージを表示します。

```javascript
let count = 0;

function addCount() {
  count++;
  const counter = document.getElementById("counter");
  counter.textContent = count;

  if (count >= 10) {
    const elem = document.getElementById("message1");
    elem.textContent = "10回以上クリックされました";
  }

  if (count >= 5) {
    const elem = document.getElementById("message2");
    elem.textContent = "5回以上クリックされました";
  }

  if (count === 1) {
    const elem = document.getElementById("message3");
    elem.textContent = "初めてのクリックです";
  }
}
```

このプログラムでは、クリック回数に応じて異なるメッセージが表示されます。

## 複数の判定を組み合わせる

HTMLで複数の判定システムを1つのページにまとめることができます。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>総合判定システム</title>
  <script src="script.js"></script>
</head>
<body>
  <h1>総合判定システム</h1>

  <section>
    <h2>年齢判定</h2>
    <button onclick="checkAge()">判定する</button>
    <p id="age-result"></p>
  </section>

  <section>
    <h2>点数判定</h2>
    <button onclick="checkScore()">判定する</button>
    <p id="score-result"></p>
  </section>

  <section>
    <h2>カウンター判定</h2>
    <button onclick="addCount()">クリック</button>
    <p>カウント: <span id="counter">0</span></p>
    <p id="counter-message"></p>
  </section>
</body>
</html>
```

## 実践例: 完全な判定プログラム

年齢、点数、パスワードをすべて判定するプログラムを作ってみましょう。

```javascript
function checkAge() {
  let age = 20;

  if (age >= 20) {
    const elem = document.getElementById("age-result");
    elem.textContent = "成人です";
  }

  if (age < 20) {
    const elem = document.getElementById("age-result");
    elem.textContent = "未成年です";
  }
}

function checkScore() {
  let score = 75;

  if (score >= 80) {
    const elem = document.getElementById("score-result");
    elem.textContent = "優秀です";
  }

  if (score >= 60) {
    const elem = document.getElementById("score-result");
    elem.textContent = "合格です";
  }

  if (score < 60) {
    const elem = document.getElementById("score-result");
    elem.textContent = "不合格です";
  }
}

function checkPassword() {
  let password = "abc123";

  if (password === "abc123") {
    const elem = document.getElementById("password-result");
    elem.textContent = "ログイン成功";
  }

  if (password !== "abc123") {
    const elem = document.getElementById("password-result");
    elem.textContent = "パスワードが違います";
  }
}

let count = 0;

function addCount() {
  count++;
  const counter = document.getElementById("counter");
  counter.textContent = count;

  if (count >= 10) {
    const elem = document.getElementById("counter-message");
    elem.textContent = "たくさんクリックされました";
  }

  if (count === 5) {
    const elem = document.getElementById("counter-message");
    elem.textContent = "ちょうど5回です";
  }
}
```

## 変数の値を変えて試す

プログラムを作ったら、変数の値を変えて動作を確認してみましょう。

```javascript
// 年齢を変えてみる
let age = 15;  // 「未成年です」と表示される
let age = 25;  // 「成人です」と表示される

// 点数を変えてみる
let score = 95;  // 「優秀です」と表示される
let score = 50;  // 「不合格です」と表示される

// パスワードを変えてみる
let password = "abc123";   // 「ログイン成功」と表示される
let password = "wrong";    // 「パスワードが違います」と表示される
```

## まとめ

このレッスンでは、以下のことを実践しました。

- 年齢判定プログラムの作成
- 点数判定プログラムの作成
- カウンター判定プログラムの作成
- 複数の判定を組み合わせる方法
- 変数の値を変えて動作を確認する方法

これまで学んだif文、比較演算子、文字列の比較を組み合わせることで、実用的なプログラムを作ることができました。

次の章では、より高度な条件分岐について学びます。

## 練習問題

### 問題1: 年齢と点数の判定

以下の2つの機能を持つプログラムを作成してください。

1. 年齢が18歳以上の場合に「大人です」と表示するボタン
2. 点数が70点以上の場合に「合格です」と表示するボタン

それぞれ別のボタンと表示エリアを用意してください。

### 問題2: カウンターとメッセージ

カウンターを増やすボタンを作成してください。以下の条件でメッセージを表示してください。

- カウントが3以上の場合: 「3回以上クリックされました」
- カウントが7以上の場合: 「7回以上クリックされました」
- カウントが10とぴったり等しい場合: 「ちょうど10回です」

### 問題3: パスワードと数値の判定

以下の2つの機能を持つプログラムを作成してください。

1. パスワードが"hello"と等しい場合に「認証成功」と表示
2. 数値が100と等しい場合に「満点です」と表示

それぞれ別のボタンを用意してください。

---

お疲れ様でした。次の章では、else文を使った「どちらか」の判定について学びます。
