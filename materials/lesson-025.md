# Lesson 025: promptの基本

このレッスンでは、ユーザーから入力を受け取る方法を学びます。

## ユーザーと対話する

これまでのレッスンでは、プログラムが一方的に動作していました。しかし、実際のWebアプリケーションでは、ユーザーからの入力を受け取って処理することがよくあります。

JavaScriptには、ユーザーから入力を受け取るための`prompt`という機能があります。

## promptとは

`prompt`は、ユーザーに質問をして、答えを入力してもらうための機能です。

基本的な使い方:

```javascript
let name = prompt("名前は？");
```

このコードを実行すると、ブラウザに入力ボックスが表示されます。ユーザーが入力した内容は、変数`name`に保存されます。

## promptの動作

`prompt`を実行すると、次のようなことが起こります。

1. ブラウザに入力ボックスが表示される
2. ユーザーが文字を入力する
3. OKボタンを押す
4. 入力された文字が変数に保存される

### 例1: 名前を聞く

```javascript
let name = prompt("あなたの名前は？");
console.log(name);
```

ユーザーが「太郎」と入力してOKを押すと、コンソールに「太郎」と表示されます。

### 例2: 入力した内容を使う

```javascript
let name = prompt("名前は？");
alert("こんにちは、" + name + "さん");
```

ユーザーが「花子」と入力すると、「こんにちは、花子さん」というメッセージが表示されます。

## promptの戻り値

`prompt`は、ユーザーが入力した文字列を返します。

```javascript
let answer = prompt("好きな色は？");
console.log(answer);  // ユーザーが入力した色が表示される
```

### キャンセルボタンを押した場合

ユーザーがキャンセルボタンを押すと、`prompt`は`null`を返します。

```javascript
let answer = prompt("質問");
// ユーザーがキャンセルを押すと、answerにはnullが入る
```

## promptとalertの組み合わせ

`prompt`で入力を受け取り、`alert`で結果を表示することができます。

```javascript
let city = prompt("住んでいる都市は？");
alert(city + "に住んでいるんですね");
```

## 複数の質問をする

複数の`prompt`を使って、複数の質問をすることができます。

```javascript
let name = prompt("名前は？");
let age = prompt("年齢は？");
let hobby = prompt("趣味は？");

console.log(name);
console.log(age);
console.log(hobby);
```

## promptとDOM操作の組み合わせ

`prompt`で入力を受け取り、その内容を画面に表示することもできます。

HTML:

```html
<p id="message"></p>
<button onclick="askName()">名前を聞く</button>
```

JavaScript:

```javascript
function askName() {
  let name = prompt("あなたの名前は？");
  const elem = document.getElementById("message");
  elem.textContent = "こんにちは、" + name + "さん";
}
```

ボタンをクリックすると、名前を入力するダイアログが表示され、入力した名前が画面に表示されます。

## 文字列の連結

`+`を使って、文字列を連結できます。

```javascript
let first = "こんにちは";
let second = "世界";
let result = first + second;
console.log(result);  // "こんにちは世界"
```

変数と文字列を組み合わせることもできます。

```javascript
let name = "太郎";
let greeting = "こんにちは、" + name + "さん";
console.log(greeting);  // "こんにちは、太郎さん"
```

## 実践例

### 例1: 挨拶プログラム

```javascript
function greet() {
  let name = prompt("お名前を教えてください");
  alert("ようこそ、" + name + "さん");
}
```

### 例2: 自己紹介プログラム

```javascript
function introduce() {
  let name = prompt("名前は？");
  let age = prompt("年齢は？");
  let hobby = prompt("趣味は？");

  const elem = document.getElementById("profile");
  elem.textContent = name + "さんは" + age + "歳です。趣味は" + hobby + "です。";
}
```

## 練習問題

次の要件を満たすページを作成してください。

1. id="result1"の要素を用意する
2. id="result2"の要素を用意する
3. id="result3"の要素を用意する
4. askQuestion1関数を定義し、次の処理を行う
   - promptで「好きな食べ物は？」と質問する
   - 入力された答えを変数に保存する
   - id="result1"の要素のtextContentに「好きな食べ物: 」+答えを設定する
5. askQuestion2関数を定義し、次の処理を行う
   - promptで「好きな色は？」と質問する
   - 入力された答えを変数に保存する
   - id="result2"の要素のtextContentに「好きな色: 」+答えを設定する
6. askQuestion3関数を定義し、次の処理を行う
   - promptで「好きな動物は？」と質問する
   - 入力された答えを変数に保存する
   - id="result3"の要素のtextContentに「好きな動物: 」+答えを設定する
7. 3つのボタンを作成し、それぞれクリックすると対応する関数が実行されるようにする

## ポイント

- `prompt`でユーザーから入力を受け取ります
- `prompt`の引数には質問文を指定します
- 入力された内容は変数に保存されます
- `+`で文字列を連結できます
- promptとDOM操作を組み合わせることができます

## まとめ

このレッスンでは、ユーザーからの入力を受け取る方法を学びました。

- `prompt`でユーザーに質問できます
- 入力された内容は変数に保存されます
- 文字列の連結には`+`を使います
- promptとDOM操作を組み合わせることで、インタラクティブなページを作れます

これにより、ユーザーとの対話が可能になり、よりダイナミックなWebページを作ることができます。
