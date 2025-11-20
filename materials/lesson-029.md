# Lesson 029: リアルタイム取得

このレッスンでは、ユーザーが入力するたびにリアルタイムで値を取得する方法を学びます。

## oninputイベント

前のレッスンでは、ボタンをクリックしたときにinput要素の値を取得しました。しかし、`oninput`イベントを使うと、ユーザーが入力するたびに処理を実行できます。

HTML:

```html
<input id="text" type="text" oninput="showValue()">
<p id="result"></p>
```

JavaScript:

```javascript
function showValue() {
  const input = document.getElementById("text");
  const value = input.value;

  const result = document.getElementById("result");
  result.textContent = "入力: " + value;
}
```

このコードでは、ユーザーが1文字入力するたびに`showValue`関数が実行され、画面に表示されます。

## onclickとoninputの違い

### onclick

- ボタンをクリックしたときに実行される
- 1回クリックで1回実行される

```html
<button onclick="showValue()">表示</button>
```

### oninput

- 入力するたびに実行される
- 1文字入力するたびに実行される

```html
<input oninput="showValue()">
```

## 文字数をカウントする

`oninput`を使って、入力された文字数をカウントできます。

HTML:

```html
<input id="text" type="text" oninput="countChars()">
<p id="count"></p>
```

JavaScript:

```javascript
function countChars() {
  const input = document.getElementById("text");
  const value = input.value;
  const length = value.length;

  const count = document.getElementById("count");
  count.textContent = "文字数: " + length;
}
```

`value.length`で、文字列の長さ（文字数）を取得できます。

## lengthプロパティ

文字列には`length`プロパティがあり、文字数を返します。

```javascript
let text = "こんにちは";
console.log(text.length);  // 5
```

空の文字列の長さは0です。

```javascript
let empty = "";
console.log(empty.length);  // 0
```

## 実践例

### 例1: リアルタイム表示

HTML:

```html
<input id="name" type="text" oninput="showName()" placeholder="名前を入力">
<p id="greeting"></p>
```

JavaScript:

```javascript
function showName() {
  const input = document.getElementById("name");
  const name = input.value;

  const greeting = document.getElementById("greeting");
  greeting.textContent = "こんにちは、" + name + "さん";
}
```

### 例2: 残り文字数を表示

HTML:

```html
<input id="message" type="text" oninput="showRemaining()" maxlength="20">
<p id="remaining"></p>
```

JavaScript:

```javascript
function showRemaining() {
  const input = document.getElementById("message");
  const length = input.value.length;
  const remaining = 20 - length;

  const result = document.getElementById("remaining");
  result.textContent = "残り: " + remaining + "文字";
}
```

### 例3: 複数の情報を表示

HTML:

```html
<input id="text" type="text" oninput="showInfo()">
<p id="value"></p>
<p id="length"></p>
```

JavaScript:

```javascript
function showInfo() {
  const input = document.getElementById("text");
  const value = input.value;
  const length = value.length;

  const valueElem = document.getElementById("value");
  valueElem.textContent = "入力: " + value;

  const lengthElem = document.getElementById("length");
  lengthElem.textContent = "文字数: " + length;
}
```

## リアルタイム処理の注意点

`oninput`イベントは、入力するたびに実行されるため、処理が重いと動作が遅くなることがあります。

しかし、文字数のカウントや簡単な表示程度であれば問題ありません。

## 練習問題

次の要件を満たすページを作成してください。

1. id="input1"のinput要素を用意し、oninput属性でshowInput1関数を実行するようにする
2. id="input2"のinput要素を用意し、oninput属性でcountChars関数を実行するようにする
3. id="input3"のinput要素を用意し、oninput属性でshowBoth関数を実行するようにする
4. id="result1"の要素を用意する
5. id="result2"の要素を用意する
6. id="result3"の要素を用意する
7. showInput1関数を定義し、次の処理を行う
   - id="input1"の要素のvalueを取得する
   - id="result1"の要素のtextContentに「入力: 」+取得した値を設定する
8. countChars関数を定義し、次の処理を行う
   - id="input2"の要素のvalueを取得する
   - 文字数を取得する（value.length）
   - id="result2"の要素のtextContentに「文字数: 」+文字数を設定する
9. showBoth関数を定義し、次の処理を行う
   - id="input3"の要素のvalueを取得する
   - 文字数を取得する
   - id="result3"の要素のtextContentに「入力: 」+値+「 (」+文字数+「文字)」を設定する

## ポイント

- `oninput`イベントで入力するたびに処理を実行できます
- `value.length`で文字列の長さを取得できます
- リアルタイムでユーザーに情報を提供できます
- 入力するたびに関数が実行されます

## まとめ

このレッスンでは、リアルタイムで入力を取得する方法を学びました。

- `oninput`イベントで入力するたびに処理を実行できます
- ボタンをクリックしなくても値を取得できます
- `value.length`で文字数をカウントできます
- ユーザーに即座にフィードバックを提供できます

これにより、より使いやすいフォームを作ることができます。
