# Lesson 027: confirmで確認

このレッスンでは、ユーザーに確認を求める方法を学びます。

## confirmとは

`confirm`は、ユーザーに「はい」か「いいえ」を選んでもらうための機能です。

基本的な使い方:

```javascript
let ok = confirm("準備OK？");
```

このコードを実行すると、ブラウザに確認ダイアログが表示されます。

## confirmの動作

`confirm`を実行すると、次のようなことが起こります。

1. ブラウザに確認ダイアログが表示される
2. 「OK」と「キャンセル」のボタンが表示される
3. ユーザーがどちらかのボタンを押す
4. 結果が変数に保存される

### OKボタンを押した場合

ユーザーが「OK」ボタンを押すと、`confirm`は`true`を返します。

```javascript
let ok = confirm("準備OK？");
// ユーザーがOKを押すと、okにはtrueが入る
```

### キャンセルボタンを押した場合

ユーザーが「キャンセル」ボタンを押すと、`confirm`は`false`を返します。

```javascript
let ok = confirm("準備OK？");
// ユーザーがキャンセルを押すと、okにはfalseが入る
```

## 真偽値（boolean）

`true`と`false`は、JavaScriptの真偽値（boolean）と呼ばれる値です。

- `true`: 真（はい、正しい）
- `false`: 偽（いいえ、間違い）

真偽値は、文字列や数値とは異なる型の値です。

```javascript
let isReady = true;   // 真偽値
let name = "太郎";    // 文字列
let age = 20;         // 数値
```

## confirmの結果を確認する

`confirm`の結果を`console.log`で確認できます。

```javascript
let ok = confirm("準備OK？");
console.log(ok);  // trueまたはfalse
```

## confirmとalertの組み合わせ

`confirm`の結果に応じて、異なるメッセージを表示できます。

```javascript
let ok = confirm("続けますか？");
console.log(ok);

// OKを押した場合はtrue、キャンセルを押した場合はfalse
```

注意: このレッスンではまだif文を学んでいないため、結果に応じて異なる処理を行うことはできません。次の段階で学びます。

## confirmとDOM操作の組み合わせ

`confirm`の結果を画面に表示することができます。

HTML:

```html
<p id="result"></p>
<button onclick="askConfirm()">確認する</button>
```

JavaScript:

```javascript
function askConfirm() {
  let ok = confirm("準備はできていますか？");
  const elem = document.getElementById("result");
  elem.textContent = "結果: " + ok;
}
```

ユーザーがOKを押すと「結果: true」、キャンセルを押すと「結果: false」と表示されます。

## 実践例

### 例1: 削除確認

```javascript
function checkDelete() {
  let ok = confirm("本当に削除しますか？");
  const elem = document.getElementById("message");
  elem.textContent = "確認結果: " + ok;
}
```

### 例2: 送信確認

```javascript
function checkSubmit() {
  let ok = confirm("この内容で送信しますか？");
  const elem = document.getElementById("status");
  elem.textContent = "送信確認: " + ok;
}
```

### 例3: 複数の確認

```javascript
function multipleChecks() {
  let check1 = confirm("最初の確認");
  let check2 = confirm("2番目の確認");
  let check3 = confirm("3番目の確認");

  const elem = document.getElementById("results");
  elem.textContent = "1: " + check1 + ", 2: " + check2 + ", 3: " + check3;
}
```

## promptとconfirmの違い

これまでに学んだ`prompt`と`confirm`の違いを整理しましょう。

### prompt

- ユーザーに文字を入力してもらう
- 入力された文字列を返す
- キャンセルすると`null`を返す

```javascript
let name = prompt("名前は？");  // 文字列が返る
```

### confirm

- ユーザーに「はい」か「いいえ」を選んでもらう
- `true`または`false`を返す
- OKなら`true`、キャンセルなら`false`

```javascript
let ok = confirm("準備OK？");  // trueまたはfalseが返る
```

## 真偽値の表示

真偽値をそのまま表示すると、"true"または"false"という文字列として表示されます。

```javascript
let ok = true;
console.log(ok);  // true
console.log("結果: " + ok);  // "結果: true"
```

真偽値を文字列と連結すると、自動的に文字列に変換されます。

## 練習問題

次の要件を満たすページを作成してください。

1. id="result1"の要素を用意する
2. id="result2"の要素を用意する
3. id="result3"の要素を用意する
4. checkReady関数を定義し、次の処理を行う
   - confirmで「準備はできていますか？」と確認する
   - 結果を変数に保存する
   - id="result1"の要素のtextContentに「準備: 」+結果を設定する
5. checkContinue関数を定義し、次の処理を行う
   - confirmで「続けますか？」と確認する
   - 結果を変数に保存する
   - id="result2"の要素のtextContentに「続行: 」+結果を設定する
6. checkAgree関数を定義し、次の処理を行う
   - confirmで「同意しますか？」と確認する
   - 結果を変数に保存する
   - id="result3"の要素のtextContentに「同意: 」+結果を設定する
7. 3つのボタンを作成し、それぞれクリックすると対応する関数が実行されるようにする

## ポイント

- `confirm`でユーザーに確認を求めます
- OKを押すと`true`、キャンセルを押すと`false`が返ります
- `true`と`false`は真偽値（boolean）と呼ばれます
- 真偽値は文字列や数値とは異なる型です
- 真偽値を文字列と連結すると、自動的に文字列に変換されます

## まとめ

このレッスンでは、ユーザーに確認を求める方法を学びました。

- `confirm`でユーザーに「はい」か「いいえ」を選んでもらえます
- 結果は`true`または`false`で返されます
- `true`と`false`は真偽値（boolean）と呼ばれます
- promptは文字列を返し、confirmは真偽値を返します

これにより、ユーザーの意思確認ができるようになりました。次のレッスンでは、この真偽値を使って処理を分岐する方法を学びます。
