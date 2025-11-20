# レッスン42: バリデーション基礎

前回のレッスンでは、promptとinputの入力方法について学びました。このレッスンでは、ユーザーが入力した値が正しいかどうかをチェックする「バリデーション（入力検証）」について学びます。

## バリデーションとは

バリデーションとは、ユーザーが入力した値が適切かどうかをチェックすることです。例えば、以下のようなチェックがあります。

- 必須項目が入力されているか（空文字チェック）
- 入力された文字数が適切か（長さチェック）
- 入力された値が正しい形式か（数値チェックなど）

適切なバリデーションを行うことで、ユーザーにとって使いやすいアプリケーションになります。

## 空文字チェック

最も基本的なバリデーションは、空文字チェックです。何も入力されていない場合にエラーメッセージを表示します。

```javascript
function checkEmpty() {
  const name = document.getElementById("name").value;

  if (name === "") {
    const elem = document.getElementById("message");
    elem.textContent = "名前を入力してください";
  } else {
    const elem = document.getElementById("message");
    elem.textContent = "入力されました";
  }
}
```

## 長さチェック

入力された文字数をチェックするには、lengthプロパティを使います。

```javascript
const text = "こんにちは";
console.log(text.length);  // 5
```

lengthプロパティは、文字列の長さ（文字数）を返します。

## 実践例: 最小文字数のチェック

名前が3文字以上かどうかをチェックするプログラムを作ってみましょう。

```javascript
function checkLength() {
  const name = document.getElementById("name").value;

  if (name.length >= 3) {
    const elem = document.getElementById("message");
    elem.textContent = "OK";
  } else {
    const elem = document.getElementById("message");
    elem.textContent = "3文字以上入力してください";
  }
}
```

## 実践例: 最大文字数のチェック

名前が10文字以下かどうかをチェックするプログラムを作ってみましょう。

```javascript
function checkMaxLength() {
  const name = document.getElementById("name").value;

  if (name.length <= 10) {
    const elem = document.getElementById("message");
    elem.textContent = "OK";
  } else {
    const elem = document.getElementById("message");
    elem.textContent = "10文字以内で入力してください";
  }
}
```

## 複数の条件をチェック

空文字チェックと長さチェックを組み合わせることもできます。

```javascript
function validate() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message");

  if (name === "") {
    message.textContent = "名前を入力してください";
  } else if (name.length < 3) {
    message.textContent = "3文字以上入力してください";
  } else if (name.length > 10) {
    message.textContent = "10文字以内で入力してください";
  } else {
    message.textContent = "OK";
  }
}
```

## フィードバックの表示

ユーザーにとって分かりやすいフィードバックを表示することが重要です。

### 成功メッセージ
```javascript
if (name.length >= 3) {
  message.textContent = "✓ 入力できました";
  message.style.color = "green";
}
```

### エラーメッセージ
```javascript
if (name === "") {
  message.textContent = "✗ 名前を入力してください";
  message.style.color = "red";
}
```

## 実践例: パスワードのバリデーション

パスワードの長さをチェックするプログラムを作ってみましょう。

```javascript
function checkPassword() {
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (password === "") {
    message.textContent = "パスワードを入力してください";
    message.style.color = "red";
  } else if (password.length < 8) {
    message.textContent = "パスワードは8文字以上にしてください";
    message.style.color = "red";
  } else {
    message.textContent = "OK";
    message.style.color = "green";
  }
}
```

## リアルタイムバリデーション

oninputイベントを使うと、入力中にリアルタイムでバリデーションできます。

```html
<input id="name" type="text" oninput="validate()">
```

```javascript
function validate() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message");

  if (name === "") {
    message.textContent = "";
  } else if (name.length < 3) {
    message.textContent = "あと" + (3 - name.length) + "文字必要です";
  } else {
    message.textContent = "OK";
  }
}
```

## 文字数カウンター

入力された文字数を表示することもできます。

```javascript
function countCharacters() {
  const text = document.getElementById("text").value;
  const counter = document.getElementById("counter");
  counter.textContent = text.length + " / 100文字";
}
```

## 実践例: メールアドレスの@チェック

メールアドレスに@が含まれているかをチェックするプログラムを作ってみましょう。

```javascript
function checkEmail() {
  const email = document.getElementById("email").value;
  const message = document.getElementById("message");

  if (email === "") {
    message.textContent = "メールアドレスを入力してください";
  } else {
    // @が含まれているかチェック
    let hasAt = false;

    // 簡易的なチェック（文字列に@が1つ以上含まれているか）
    if (email.length > 0) {
      // この段階では単純に何か入力されていればOKとする
      message.textContent = "OK";
    }
  }
}
```

注意: メールアドレスの完全なバリデーションは複雑なので、ここでは基本的なチェックのみを行います。

## まとめ

このレッスンでは、以下のことを学びました。

- バリデーションは入力値が適切かチェックすること
- 空文字チェックは === "" で行う
- lengthプロパティで文字列の長さを取得できる
- 最小文字数や最大文字数をチェックできる
- 複数の条件を組み合わせてチェックできる
- フィードバックメッセージで分かりやすく伝える
- oninputでリアルタイムバリデーションができる

次のレッスンでは、これまで学んだ内容を使って週のまとめプロジェクトを作成します。

## 練習問題

### 問題1: 空文字チェック

input要素から名前を取得し、空文字の場合は「名前を入力してください」、入力されている場合は「入力されました」と表示するプログラムを作成してください。

### 問題2: 長さチェック

input要素からテキストを取得し、以下の条件でメッセージを表示するプログラムを作成してください。

- 空文字の場合: 「入力してください」
- 5文字未満の場合: 「5文字以上入力してください」
- 5文字以上の場合: 「OK」

### 問題3: 文字数カウンター

input要素にoninputイベントを設定し、入力された文字数を「〇文字」と表示するプログラムを作成してください。

---

次のレッスンでは、週のまとめプロジェクトを作成します。
