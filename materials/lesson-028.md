# Lesson 028: inputから取得

このレッスンでは、テキストボックス（input要素）からユーザーの入力を取得する方法を学びます。

## input要素とは

input要素は、ユーザーが文字を入力できるテキストボックスです。

HTML:

```html
<input id="name" type="text">
```

このコードで、テキストボックスが表示されます。

## valueプロパティ

input要素に入力された値を取得するには、`value`プロパティを使います。

```javascript
const elem = document.getElementById("name");
const value = elem.value;
```

`value`プロパティには、ユーザーが入力した文字列が入っています。

## 基本的な使い方

### 例1: 入力された値を表示する

HTML:

```html
<input id="name" type="text">
<button onclick="showValue()">表示</button>
<p id="result"></p>
```

JavaScript:

```javascript
function showValue() {
  const input = document.getElementById("name");
  const value = input.value;

  const result = document.getElementById("result");
  result.textContent = "入力された値: " + value;
}
```

ユーザーがテキストボックスに「太郎」と入力してボタンを押すと、「入力された値: 太郎」と表示されます。

## promptとの違い

これまでに学んだ`prompt`とinput要素の違いを整理しましょう。

### prompt

- ダイアログボックスが表示される
- 入力が完了するまで他の操作ができない
- 入力が終わったら値が返される

```javascript
const name = prompt("名前は？");
```

### input要素

- ページ上にテキストボックスが表示される
- 他の操作もできる
- ボタンをクリックしたときなどに値を取得する

```html
<input id="name" type="text">
```

```javascript
const elem = document.getElementById("name");
const value = elem.value;
```

## 複数のinput要素

複数のinput要素を使うこともできます。

HTML:

```html
<input id="firstName" type="text">
<input id="lastName" type="text">
<button onclick="showFullName()">表示</button>
<p id="result"></p>
```

JavaScript:

```javascript
function showFullName() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;

  const result = document.getElementById("result");
  result.textContent = lastName + " " + firstName;
}
```

## valueの設定

`value`プロパティは、値を取得するだけでなく、設定することもできます。

```javascript
const elem = document.getElementById("name");
elem.value = "初期値";
```

これにより、テキストボックスに「初期値」と表示されます。

## 実践例

### 例1: 挨拶メッセージを作る

HTML:

```html
<input id="name" type="text" placeholder="名前を入力">
<button onclick="greet()">挨拶</button>
<p id="message"></p>
```

JavaScript:

```javascript
function greet() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message");
  message.textContent = "こんにちは、" + name + "さん";
}
```

### 例2: 入力をクリアする

HTML:

```html
<input id="text" type="text">
<button onclick="clearText()">クリア</button>
```

JavaScript:

```javascript
function clearText() {
  const elem = document.getElementById("text");
  elem.value = "";
}
```

### 例3: 数値の計算

HTML:

```html
<input id="num1" type="text">
<input id="num2" type="text">
<button onclick="calculate()">計算</button>
<p id="result"></p>
```

JavaScript:

```javascript
function calculate() {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;

  const a = Number(num1);
  const b = Number(num2);
  const sum = a + b;

  const result = document.getElementById("result");
  result.textContent = "合計: " + sum;
}
```

## placeholderとは

`placeholder`属性は、input要素に薄く表示されるヒントです。

```html
<input id="name" type="text" placeholder="名前を入力してください">
```

ユーザーが何も入力していないとき、「名前を入力してください」という文字が薄く表示されます。入力を始めると消えます。

## 練習問題

次の要件を満たすページを作成してください。

1. id="input1"のinput要素を用意する
2. id="input2"のinput要素を用意する
3. id="input3"のinput要素を用意する
4. id="result1"の要素を用意する
5. id="result2"の要素を用意する
6. id="result3"の要素を用意する
7. showInput1関数を定義し、次の処理を行う
   - id="input1"の要素のvalueを取得する
   - id="result1"の要素のtextContentに「入力1: 」+取得した値を設定する
8. showInput2関数を定義し、次の処理を行う
   - id="input2"の要素のvalueを取得する
   - id="result2"の要素のtextContentに「入力2: 」+取得した値を設定する
9. combineInputs関数を定義し、次の処理を行う
   - id="input1"の要素のvalueを取得する
   - id="input2"の要素のvalueを取得する
   - 2つの値を連結する（間にスペースを入れる）
   - id="result3"の要素のtextContentに「結合: 」+連結した値を設定する
10. 3つのボタンを作成し、それぞれクリックすると対応する関数が実行されるようにする

## ポイント

- input要素はテキストボックスを表示します
- `value`プロパティで入力された値を取得できます
- `value`プロパティで値を設定することもできます
- input要素の値は常に文字列です
- 計算に使う場合は`Number`で変換が必要です
- `placeholder`属性でヒントを表示できます

## まとめ

このレッスンでは、input要素から値を取得する方法を学びました。

- input要素はユーザーが文字を入力できるテキストボックスです
- `value`プロパティで入力された値を取得します
- promptと違い、ページ上に表示され続けます
- 複数のinput要素を組み合わせることができます
- 値の取得だけでなく、設定もできます

これにより、よりインタラクティブなフォームを作ることができます。
