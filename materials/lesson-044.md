# レッスン44: AND演算（&&）

## このレッスンで学ぶこと

これまでは単純な条件分岐を学んできました。今回は、複数の条件を同時にチェックする方法を学びます。AND演算子(&&)を使うと、「AかつB」という複合的な条件を簡潔に表現できます。

## AND演算子とは

AND演算子(&&)は、2つ以上の条件が**すべて**真の時だけ、全体が真になります。

```javascript
if (条件A && 条件B) {
  // 条件Aも条件Bも両方とも真の時だけ実行される
}
```

日常生活での例:
- 「20歳以上**かつ**免許を持っている人だけ運転できる」
- 「雨が降っている**かつ**傘を持っていない時、濡れる」
- 「お金がある**かつ**時間がある時、映画を見に行く」

## 基本的な使い方

### 例1: 年齢と免許のチェック

```javascript
let age = 25;
let hasLicense = true;

if (age >= 18 && hasLicense) {
  console.log("運転できます");
}
```

この条件は以下の場合に真になります:
- age が 18 以上
- **かつ** hasLicense が true

どちらか一方でも満たさない場合、全体が偽になります。

### 例2: パスワードとメールのチェック

```javascript
let password = "abc123";
let email = "test@example.com";

if (password.length >= 6 && email !== "") {
  console.log("登録できます");
}
```

両方の条件を満たす必要があります:
- パスワードが6文字以上
- **かつ** メールアドレスが空でない

## 真偽値の表

AND演算子の動作を表で確認しましょう。

| 条件A | 条件B | A && B |
|-------|-------|---------|
| true  | true  | true    |
| true  | false | false   |
| false | true  | false   |
| false | false | false   |

つまり、**両方とも true の時だけ、結果が true** になります。

## 3つ以上の条件

AND演算子は3つ以上の条件でも使えます。

```javascript
let age = 20;
let hasLicense = true;
let hasCar = true;

if (age >= 18 && hasLicense && hasCar) {
  console.log("ドライブに行けます");
}
```

この場合、**3つすべて**の条件が真の時だけ、全体が真になります。

## AND演算子を使わない書き方との比較

### AND演算子を使わない場合(ネスト)

```javascript
let age = 25;
let hasLicense = true;

if (age >= 18) {
  if (hasLicense) {
    console.log("運転できます");
  }
}
```

### AND演算子を使う場合

```javascript
let age = 25;
let hasLicense = true;

if (age >= 18 && hasLicense) {
  console.log("運転できます");
}
```

AND演算子を使うと、ネストが浅くなり、コードが読みやすくなります。

## 実用例

### 例1: 会員登録フォーム

```javascript
function register() {
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const age = Number(document.getElementById("age").value);
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  error.textContent = "";
  result.textContent = "";

  // すべての条件をチェック
  if (name !== "" && password.length >= 8 && age >= 13) {
    result.textContent = "登録完了しました";
  } else {
    error.textContent = "すべての条件を満たしてください";
  }
}
```

この例では、3つの条件すべてを満たす必要があります:
1. 名前が空でない
2. パスワードが8文字以上
3. 年齢が13歳以上

### 例2: 範囲チェック

```javascript
let score = 75;

if (score >= 60 && score <= 100) {
  console.log("合格です");
}
```

この条件は「60点以上**かつ**100点以下」という範囲を表現しています。

## 実践問題

以下の要件を満たすプログラムを作成してください。

### 問題: 入場チェック

遊園地の入場条件をチェックするプログラムを作成してください。

**条件:**
- 年齢が12歳以上
- かつチケットを持っている(hasTicket が true)

**HTMLの構成:**
- id="age" の input要素(年齢入力用)
- id="hasTicket" の input要素(type="checkbox")
- id="result" の要素(結果表示用)
- id="error" の要素(エラーメッセージ表示用)

**動作:**
1. 年齢とチケットの有無をチェック
2. 両方の条件を満たす場合: "入場できます"
3. どちらかを満たさない場合: "入場できません"
4. 年齢が数値でない場合: エラーメッセージを表示

## AND演算子を使う時のポイント

### 1. 順序に注意

```javascript
// エラーチェックを先に
if (age !== "" && Number(age) >= 18) {
  // 安全
}

// これは危険
if (Number(age) >= 18 && age !== "") {
  // age が空文字の場合、Number("") は 0 になってしまう
}
```

### 2. 短絡評価

JavaScriptのAND演算子は**短絡評価**を行います。つまり、左側の条件が偽の場合、右側の条件は評価されません。

```javascript
let age = 15;
let hasLicense = true;

// age < 18 が false なので、hasLicense はチェックされない
if (age >= 18 && hasLicense) {
  console.log("運転できます");
}
```

これを利用すると、エラーを防ぐことができます。

```javascript
// name が空でない場合だけ、length をチェック
if (name !== "" && name.length >= 3) {
  console.log("OK");
}
```

### 3. 読みやすさ

条件が長くなる場合は、改行して読みやすくしましょう。

```javascript
if (
  age >= 18 &&
  hasLicense &&
  hasCar &&
  hasInsurance
) {
  console.log("ドライブに行けます");
}
```

## まとめ

- AND演算子(&&)は、複数の条件が**すべて真**の時だけ真になります
- ネストよりも簡潔に書けます
- 短絡評価により、左側が偽の場合は右側が評価されません
- 3つ以上の条件でも使えます
- 範囲チェックや、複数の要件を満たすかチェックする時に便利です

次のレッスンでは、「どちらか一方を満たす」OR演算子(||)を学びます。
