# レッスン41: 入力方法の比較

これまでのレッスンでは、変数に直接値を代入したり、input要素を使ってユーザーから値を受け取ったりしてきました。このレッスンでは、promptとinputの2つの入力方法を比較し、それぞれの利点と使い分けについて学びます。

## これまで学んだ入力方法

### 1. 変数に直接代入

```javascript
let age = 20;
let name = "太郎";
```

この方法は簡単ですが、値を変更するにはコードを書き換える必要があります。

### 2. input要素を使う

```html
<input id="name" type="text">
```

```javascript
const name = document.getElementById("name").value;
```

この方法は、ページ上に入力欄が表示され、ユーザーが自由に入力できます。

### 3. promptを使う

```javascript
const name = prompt("名前を入力してください");
```

この方法は、ポップアップウィンドウが表示され、ユーザーが入力します。

## promptとは

promptは、ダイアログボックス（ポップアップウィンドウ）を表示してユーザーに入力を求める関数です。

```javascript
const answer = prompt("質問内容");
```

promptの特徴:
- ポップアップで表示される
- 入力するまで次の処理が実行されない
- OKボタンとキャンセルボタンがある
- 入力された値は文字列として返される

## promptの実践例

```javascript
function greet() {
  const name = prompt("あなたの名前は？");
  const elem = document.getElementById("result");
  elem.textContent = "こんにちは、" + name + "さん";
}
```

このプログラムでは、ボタンをクリックするとポップアップが表示され、名前を入力すると挨拶が表示されます。

## inputとの違い

### promptの場合
```javascript
function usePrompt() {
  const name = prompt("名前を入力してください");
  const elem = document.getElementById("result");
  elem.textContent = "こんにちは、" + name + "さん";
}
```

- ポップアップが表示される
- 入力するまで他の操作ができない
- 入力欄がページに残らない

### inputの場合
```javascript
function useInput() {
  const name = document.getElementById("name").value;
  const elem = document.getElementById("result");
  elem.textContent = "こんにちは、" + name + "さん";
}
```

- ページ上に入力欄がある
- 入力中も他の操作ができる
- 入力欄がページに残る

## promptの利点

1. **シンプル**: HTMLに要素を追加する必要がない
2. **確実な入力**: 入力するまで次に進めない
3. **一時的な入力**: 入力内容を後で見返す必要がない場合に便利

```javascript
function simpleCalculator() {
  const num1 = prompt("1つ目の数値を入力");
  const num2 = prompt("2つ目の数値を入力");
  const result = Number(num1) + Number(num2);
  const elem = document.getElementById("result");
  elem.textContent = "答え: " + result;
}
```

## inputの利点

1. **視覚的に分かりやすい**: 入力欄が常に見える
2. **柔軟**: 入力内容をいつでも確認・修正できる
3. **複数の入力**: 複数の値を同時に入力できる
4. **デザイン**: CSSでスタイルを自由に変更できる

```javascript
function calculator() {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;
  const result = Number(num1) + Number(num2);
  const elem = document.getElementById("result");
  elem.textContent = "答え: " + result;
}
```

## promptのキャンセル

promptでキャンセルボタンを押すと、nullが返されます。

```javascript
function checkInput() {
  const name = prompt("名前を入力してください");

  if (name === null) {
    const elem = document.getElementById("result");
    elem.textContent = "キャンセルされました";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "こんにちは、" + name + "さん";
  }
}
```

## 使い分けの基準

### promptが適している場合
- 簡単なアンケートやクイズ
- 一度だけ入力すれば良い場合
- 入力欄をページに表示したくない場合

### inputが適している場合
- 複数の値を入力する場合
- 入力内容を確認しながら操作したい場合
- デザインを統一したい場合
- 実用的なアプリケーション

## 両方を組み合わせる

状況に応じて、promptとinputを組み合わせることもできます。

```javascript
function combined() {
  // 簡単な確認はpromptで
  const confirmed = prompt("本当に実行しますか？（yes/no）");

  if (confirmed === "yes") {
    // 詳細な入力はinputで
    const name = document.getElementById("name").value;
    const elem = document.getElementById("result");
    elem.textContent = "実行しました: " + name;
  }
}
```

## confirmとの違い

confirmは、はい/いいえの確認に使います。

```javascript
const confirmed = confirm("本当に削除しますか？");

if (confirmed) {
  // 「OK」が押された場合
  console.log("削除しました");
} else {
  // 「キャンセル」が押された場合
  console.log("キャンセルしました");
}
```

promptとconfirmとinputの違い:
- **prompt**: 文字列の入力を受け取る（文字列またはnullを返す）
- **confirm**: はい/いいえの確認（trueまたはfalseを返す）
- **input**: HTML要素からvalueプロパティで取得（常に文字列を返す）

## まとめ

このレッスンでは、以下のことを学びました。

- promptはポップアップで入力を受け取る
- inputはページ上の要素から入力を受け取る
- promptはシンプルで一時的な入力に適している
- inputは複数入力や実用的なアプリに適している
- promptのキャンセルはnullを返す
- 状況に応じて使い分けることが重要

次のレッスンでは、バリデーション（入力検証）について学びます。

## 練習問題

### 問題1: promptを使った挨拶

ボタンをクリックしたときに、promptで名前を入力させ、「こんにちは、〇〇さん」と表示するプログラムを作成してください。

### 問題2: inputとpromptの比較

以下の2つの機能を持つプログラムを作成してください。

1. ボタン1: promptで年齢を入力させ、結果を表示
2. ボタン2: input要素から年齢を取得し、結果を表示

どちらも同じ結果を表示しますが、入力方法が異なります。

### 問題3: promptのキャンセル処理

ボタンをクリックしたときに、promptで名前を入力させるプログラムを作成してください。

- 入力された場合: 「ようこそ、〇〇さん」と表示
- キャンセルされた場合: 「キャンセルされました」と表示

---

次のレッスンでは、バリデーション（入力検証）について学びます。
