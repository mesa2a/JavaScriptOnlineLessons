# レッスン34: 比較演算子

前回のレッスンでは、>=や<=などの比較演算子を使って条件分岐を学びました。このレッスンでは、さまざまな比較演算子を詳しく学び、数値や文字列の比較方法をマスターします。

## 比較演算子とは

比較演算子とは、2つの値を比較して、その結果をtrueまたはfalseで返す演算子のことです。前回のレッスンで使った>=もその1つです。

```javascript
let age = 20;
console.log(age >= 18);  // true
```

この例では、ageが18以上かどうかを比較し、trueという結果が返ってきます。

## 主な比較演算子

JavaScriptには、以下のような比較演算子があります。

### 大小の比較

- `>` : より大きい（左辺が右辺より大きい）
- `<` : より小さい（左辺が右辺より小さい）
- `>=` : 以上（左辺が右辺以上）
- `<=` : 以下（左辺が右辺以下）

```javascript
let score = 75;

console.log(score > 80);   // false（75は80より大きくない）
console.log(score < 80);   // true（75は80より小さい）
console.log(score >= 75);  // true（75は75以上）
console.log(score <= 75);  // true（75は75以下）
```

### 等しいかどうかの比較

- `===` : 等しい（厳密等価）
- `!==` : 等しくない（厳密不等価）

```javascript
let answer = 42;

console.log(answer === 42);  // true（42は42と等しい）
console.log(answer === 50);  // false（42は50と等しくない）
console.log(answer !== 50);  // true（42は50と等しくない）
console.log(answer !== 42);  // false（42は42と等しくないわけではない）
```

## ===と!==の使い方

===は「等しい」、!==は「等しくない」を判定する演算子です。

```javascript
let num = 10;

if (num === 10) {
  console.log("numは10です");
}

if (num !== 5) {
  console.log("numは5ではありません");
}
```

!==の!は「否定」を意味する記号です。!==は「等しくない」という意味になります。

## >と>=の違い

>と>=は似ていますが、重要な違いがあります。

```javascript
let score = 60;

console.log(score > 60);   // false（60は60より大きくない）
console.log(score >= 60);  // true（60は60以上）
```

- `>` : 等しい場合は含まない（より大きい）
- `>=` : 等しい場合も含む（以上）

同様に、<と<=にも違いがあります。

```javascript
let score = 60;

console.log(score < 60);   // false（60は60より小さくない）
console.log(score <= 60);  // true（60は60以下）
```

## 実践例: 合格判定

点数に応じて「合格」または「不合格」を判定するプログラムを作ってみましょう。

```javascript
function checkPass() {
  let score = 75;

  if (score >= 60) {
    const elem = document.getElementById("result");
    elem.textContent = "合格です";
  }
}
```

scoreが60以上の場合に「合格です」と表示されます。

## 実践例: 範囲の判定

ある値が特定の範囲内にあるかどうかを判定することもできます。

```javascript
function checkRange() {
  let temperature = 25;

  if (temperature >= 20) {
    const elem = document.getElementById("result");
    elem.textContent = "暖かいです";
  }

  if (temperature < 10) {
    const elem = document.getElementById("result");
    elem.textContent = "寒いです";
  }
}
```

このプログラムでは、temperatureが20以上なら「暖かいです」、10未満なら「寒いです」と表示されます。

## 実践例: ぴったりの値を探す

===を使って、ぴったりの値を探すこともできます。

```javascript
function checkNumber() {
  let num = 7;

  if (num === 7) {
    const elem = document.getElementById("result");
    elem.textContent = "ラッキーセブン";
  }
}
```

numが7の場合のみ、「ラッキーセブン」と表示されます。

## 実践例: 特定の値を除外する

!==を使って、特定の値を除外することもできます。

```javascript
function checkNotZero() {
  let value = 5;

  if (value !== 0) {
    const elem = document.getElementById("result");
    elem.textContent = "0ではありません";
  }
}
```

valueが0でない場合に、「0ではありません」と表示されます。

## 複数の条件

複数のif文を使うことで、複数の条件を判定できます。

```javascript
function checkScore() {
  let score = 85;

  if (score >= 80) {
    const elem = document.getElementById("result1");
    elem.textContent = "優秀です";
  }

  if (score >= 60) {
    const elem = document.getElementById("result2");
    elem.textContent = "合格です";
  }

  if (score < 60) {
    const elem = document.getElementById("result3");
    elem.textContent = "不合格です";
  }
}
```

このプログラムでは、scoreが85なので、「優秀です」と「合格です」の両方が表示されます。

## 変数同士の比較

変数同士を比較することもできます。

```javascript
function compare() {
  let a = 10;
  let b = 20;

  if (a < b) {
    const elem = document.getElementById("result");
    elem.textContent = "aはbより小さい";
  }

  if (a === b) {
    const elem = document.getElementById("result");
    elem.textContent = "aとbは等しい";
  }
}
```

## まとめ

このレッスンでは、以下のことを学びました。

- 比較演算子は2つの値を比較してtrueまたはfalseを返す
- >、<、>=、<=で大小を比較できる
- ===で等しいかどうかを判定できる
- !==で等しくないかどうかを判定できる
- >と>=、<と<=の違いを理解する
- 複数のif文を使って複数の条件を判定できる

次のレッスンでは、文字列の比較について学びます。

## 練習問題

### 問題1: 大人判定

ボタンをクリックしたときに、年齢が18歳より大きい場合に「大人です」と表示するプログラムを作成してください。

18歳ちょうどの場合は表示しないでください（>を使う）。

### 問題2: ぴったり判定

ボタンをクリックしたときに、数値が100とぴったり等しい場合に「100点満点」と表示するプログラムを作成してください。

===を使ってください。

### 問題3: 範囲判定

ボタンをクリックしたときに、温度が30度以上の場合に「暑いです」、10度以下の場合に「寒いです」と表示するプログラムを作成してください。

2つのif文を使ってください。

---

次のレッスンでは、文字列を使った比較について学びます。
