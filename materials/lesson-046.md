# レッスン46: NOT演算（!）

## このレッスンで学ぶこと

これまでにAND演算子(&&)とOR演算子(||)を学びました。今回は、条件を反転させるNOT演算子(!)を学びます。NOT演算子を使うと、「〜でない」という否定の条件を簡潔に表現できます。

## NOT演算子とは

NOT演算子(!)は、真偽値を**反転**させます。真を偽に、偽を真にします。

```javascript
if (!条件) {
  // 条件が偽の時に実行される
}
```

日常生活での例:
- 「雨が降って**いない**なら散歩に行く」
- 「チケットを持って**いない**なら入場できない」
- 「ログインして**いない**ならログイン画面を表示」

## 基本的な使い方

### 例1: 真偽値の反転

```javascript
let isRaining = false;

if (!isRaining) {
  console.log("散歩に行けます");
}
```

`!isRaining` は「雨が降っていない」という意味になります。

### 例2: ログイン状態のチェック

```javascript
let isLoggedIn = false;

if (!isLoggedIn) {
  console.log("ログインしてください");
}
```

`!isLoggedIn` は「ログインしていない」という意味です。

## 真偽値の表

NOT演算子の動作を表で確認しましょう。

| 条件 | !条件 |
|------|-------|
| true | false |
| false | true |

つまり、**true は false に、false は true に反転**します。

## 比較演算子との組み合わせ

### 例1: 不等号との組み合わせ

```javascript
let age = 15;

// 18歳未満
if (!(age >= 18)) {
  console.log("未成年です");
}

// これは以下と同じ意味
if (age < 18) {
  console.log("未成年です");
}
```

ただし、この場合は `age < 18` の方が読みやすいです。

### 例2: 等価演算子との組み合わせ

```javascript
let answer = "東京";
let correctAnswer = "大阪";

if (!(answer === correctAnswer)) {
  console.log("不正解です");
}

// これは以下と同じ意味
if (answer !== correctAnswer) {
  console.log("不正解です");
}
```

この場合も `!==` を使う方が読みやすいです。

## 実用的なNOT演算子の使い方

### 例1: 空文字チェックの反転

```javascript
let name = "太郎";

// 名前が空でない場合
if (!(name === "")) {
  console.log("名前が入力されています");
}

// より読みやすい書き方
if (name !== "") {
  console.log("名前が入力されています");
}
```

### 例2: 複数条件の否定

```javascript
let isWeekend = false;
let isHoliday = false;

// 週末でも祝日でもない場合
if (!(isWeekend || isHoliday)) {
  console.log("平日です");
}
```

この場合、NOT演算子が便利です。括弧内の全体の結果を反転させています。

## 二重否定

NOT演算子を2回使うと、元の値に戻ります。

```javascript
let isRaining = true;

console.log(!isRaining);    // false
console.log(!!isRaining);   // true (元に戻る)
```

二重否定(`!!`)は、値を真偽値に変換する時に使われることがあります。

```javascript
let name = "太郎";
console.log(!!name);  // true (空でない文字列は true)

let emptyName = "";
console.log(!!emptyName);  // false (空文字列は false)
```

## 実用例

### 例1: エラーがない場合の処理

```javascript
function processData() {
  const input = document.getElementById("input").value;
  const error = document.getElementById("error");
  const result = document.getElementById("result");

  error.textContent = "";
  result.textContent = "";

  let hasError = false;

  // エラーチェック
  if (input === "") {
    error.textContent = "入力してください";
    hasError = true;
  }

  // エラーがない場合だけ処理
  if (!hasError) {
    result.textContent = "処理完了: " + input;
  }
}
```

### 例2: 除外条件

```javascript
function checkEntry() {
  const age = 25;
  const isBanned = false;

  // 出禁でない場合
  if (!isBanned) {
    if (age >= 18) {
      console.log("入場できます");
    } else {
      console.log("年齢が足りません");
    }
  } else {
    console.log("入場できません");
  }
}
```

### 例3: フラグの切り替え

```javascript
function toggleSwitch() {
  let isOn = false;

  // 現在の状態を反転
  isOn = !isOn;
  console.log(isOn);  // true

  // もう一度反転
  isOn = !isOn;
  console.log(isOn);  // false
}
```

## 実践問題

以下の要件を満たすプログラムを作成してください。

### 問題: 傘チェック

天気によって傘が必要かを判定するプログラムを作成してください。

**条件:**
- 雨が降っていない場合(isRainingがfalse): "傘は不要です"
- 雨が降っている場合(isRainingがtrue): "傘が必要です"

**HTMLの構成:**
- id="isRaining" の input要素(type="checkbox"、雨が降っているか)
- id="result" の要素(結果表示用)

**動作:**
1. チェックボックスの状態を取得
2. 雨が降っていない(!isRaining)場合: "傘は不要です"
3. 雨が降っている場合: "傘が必要です"

## AND/ORとの組み合わせ

### 例1: 複雑な条件

```javascript
let age = 25;
let hasTicket = true;
let isBanned = false;

// 18歳以上で、チケットを持っていて、出禁でない
if (age >= 18 && hasTicket && !isBanned) {
  console.log("入場できます");
}
```

### 例2: ド・モルガンの法則

```javascript
// 以下の2つは同じ意味
if (!(isWeekend || isHoliday)) {
  console.log("平日です");
}

if (!isWeekend && !isHoliday) {
  console.log("平日です");
}
```

`!(A || B)` は `!A && !B` と同じです。

## NOT演算子を使う時のポイント

### 1. 読みやすさを優先

```javascript
// 読みにくい
if (!(age < 18)) {
  console.log("成人です");
}

// 読みやすい
if (age >= 18) {
  console.log("成人です");
}
```

### 2. 複数条件の否定には便利

```javascript
// NOT演算子が便利
if (!(isWeekend || isHoliday)) {
  console.log("平日です");
}

// これも同じだが長い
if (!isWeekend && !isHoliday) {
  console.log("平日です");
}
```

### 3. 真偽値の変数にはそのまま使う

```javascript
let isLoggedIn = false;

// 良い例
if (!isLoggedIn) {
  console.log("ログインしてください");
}

// 悪い例(冗長)
if (isLoggedIn === false) {
  console.log("ログインしてください");
}
```

## まとめ

- NOT演算子(!)は、真偽値を反転させます
- true は false に、false は true になります
- 真偽値の変数と組み合わせて使うと便利です
- 複数条件の否定にも使えます
- 二重否定(`!!`)で値を真偽値に変換できます
- 読みやすさを優先し、不等号や不等価演算子で書ける場合はそちらを使いましょう

次のレッスンでは、これらの演算子を組み合わせた複雑な条件式を学びます。
