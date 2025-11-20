# レッスン37: どちらか（if-else文）

これまでのレッスンでは、if文を使って「条件が満たされた場合」の処理を書いてきました。このレッスンでは、else文を使って「条件が満たされなかった場合」の処理を書く方法を学びます。

## これまでのif文の問題点

これまで、条件が満たされない場合の処理を書くには、2つのif文を使う必要がありました。

```javascript
function checkAge() {
  let age = 15;

  if (age >= 20) {
    const elem = document.getElementById("result");
    elem.textContent = "成人です";
  }

  if (age < 20) {
    const elem = document.getElementById("result");
    elem.textContent = "未成年です";
  }
}
```

この方法でも動作しますが、同じことを2回判定しているため、無駄があります。

## else文とは

else文を使うと、「条件が満たされなかった場合」の処理を簡潔に書けます。

```javascript
if (条件) {
  // 条件が満たされた場合の処理
} else {
  // 条件が満たされなかった場合の処理
}
```

elseは「そうでなければ」という意味です。

## 実践例: 年齢判定

else文を使って、年齢判定を書き直してみましょう。

```javascript
function checkAge() {
  let age = 15;

  if (age >= 20) {
    const elem = document.getElementById("result");
    elem.textContent = "成人です";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "未成年です";
  }
}
```

このプログラムでは、ageが20以上なら「成人です」、そうでなければ「未成年です」と表示されます。

## else文の仕組み

else文は、if文の条件がfalseの場合に実行されます。

```javascript
let age = 25;

if (age >= 20) {
  // age >= 20 は true なので、この部分が実行される
  console.log("成人です");
} else {
  // if文が実行されたので、この部分は実行されない
  console.log("未成年です");
}
```

```javascript
let age = 15;

if (age >= 20) {
  // age >= 20 は false なので、この部分は実行されない
  console.log("成人です");
} else {
  // if文が実行されなかったので、この部分が実行される
  console.log("未成年です");
}
```

## 実践例: 合格判定

点数によって「合格」か「不合格」を判定するプログラムを作ってみましょう。

```javascript
function checkScore() {
  let score = 75;

  if (score >= 60) {
    const elem = document.getElementById("result");
    elem.textContent = "合格です";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "不合格です";
  }
}
```

scoreが60以上なら「合格です」、そうでなければ「不合格です」と表示されます。

## 実践例: ○×判定

答えが正しいか間違っているかを判定するプログラムを作ってみましょう。

```javascript
function checkAnswer() {
  let answer = "Tokyo";
  let correctAnswer = "Tokyo";

  if (answer === correctAnswer) {
    const elem = document.getElementById("result");
    elem.textContent = "○ 正解です";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "× 不正解です";
  }
}
```

answerとcorrectAnswerが等しければ「○ 正解です」、そうでなければ「× 不正解です」と表示されます。

## 実践例: パスワードチェック

パスワードが正しいか間違っているかを判定するプログラムを作ってみましょう。

```javascript
function checkPassword() {
  let password = "abc123";

  if (password === "abc123") {
    const elem = document.getElementById("result");
    elem.textContent = "ログイン成功";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "パスワードが違います";
  }
}
```

## 実践例: 偶数か奇数か

数値が偶数か奇数かを判定するプログラムを作ってみましょう。

```javascript
function checkEvenOdd() {
  let num = 7;

  if (num === 6) {
    const elem = document.getElementById("result");
    elem.textContent = "6です";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "6ではありません";
  }
}
```

## 二択の判定

if-else文は、二択の判定に最適です。

- 成人 or 未成年
- 合格 or 不合格
- 正解 or 不正解
- ログイン成功 or 失敗
- 大きい or 小さい

どちらか一方が必ず実行されるので、すべての場合をカバーできます。

## if文だけの場合との比較

if文だけの場合:
```javascript
if (age >= 20) {
  elem.textContent = "成人です";
}

if (age < 20) {
  elem.textContent = "未成年です";
}
```

if-else文の場合:
```javascript
if (age >= 20) {
  elem.textContent = "成人です";
} else {
  elem.textContent = "未成年です";
}
```

if-else文の方が:
- 短く書ける
- 意図が明確
- 判定が1回で済む

## 変数の値を変えて試す

プログラムを作ったら、変数の値を変えて動作を確認してみましょう。

```javascript
let age = 25;  // 「成人です」と表示される
let age = 15;  // 「未成年です」と表示される
let age = 20;  // 「成人です」と表示される（20以上なので）
```

## まとめ

このレッスンでは、以下のことを学びました。

- else文を使うと「そうでなければ」の処理を書ける
- if-else文は二択の判定に最適
- if文の条件がfalseの場合にelse部分が実行される
- if文だけの場合より短く、意図が明確に書ける
- どちらか一方が必ず実行される

次のレッスンでは、else ifを使って3つ以上の分岐を行う方法を学びます。

## 練習問題

### 問題1: 年齢判定

ボタンをクリックしたときに、年齢が18歳以上なら「大人です」、そうでなければ「子供です」と表示するプログラムを作成してください。

if-else文を使ってください。

### 問題2: 点数判定

ボタンをクリックしたときに、点数が80点以上なら「優秀です」、そうでなければ「もう少しがんばりましょう」と表示するプログラムを作成してください。

### 問題3: パスワード判定

ボタンをクリックしたときに、パスワードが"hello"と等しければ「認証成功」、そうでなければ「認証失敗」と表示するプログラムを作成してください。

---

次のレッスンでは、else ifを使って3つ以上の分岐を行う方法を学びます。
