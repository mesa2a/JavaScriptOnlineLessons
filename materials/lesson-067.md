# レッスン67：フォームイベント

## このレッスンで学ぶこと

このレッスンでは、フォーム要素で発生するイベントの扱い方を学びます。フォームイベントを使うことで、ユーザーの入力をリアルタイムで検証したり、送信前にデータをチェックしたりできるようになります。

## フォームイベントとは

フォームイベントは、input要素やform要素で発生する特別なイベントです。ユーザーがテキストを入力したり、フォームを送信したりするときに発生します。

### 主なフォームイベント

フォームには主に5つのイベントがあります。

**focus**
- 要素がフォーカスを得たとき（クリックやTabキーで選択されたとき）に発生します
- 入力欄が選択された状態になったときです

**blur**
- 要素がフォーカスを失ったとき（他の場所をクリックしたとき）に発生します
- 入力欄の選択が解除されたときです

**input**
- 入力内容が変更されるたびに発生します
- 1文字入力するたびに発生します（リアルタイムで検出）

**change**
- 入力内容が変更され、フォーカスが外れたときに発生します
- 入力が完了したときです

**submit**
- フォームが送信されるときに発生します
- フォーム送信ボタンがクリックされたときや、入力欄でEnterキーを押したときです

## focus と blur イベント

focusとblurは、入力欄の選択状態を検出するイベントです。

### 基本的な使い方

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>focus/blur イベント</title>
</head>
<body>
    <h1>フォーカスイベントの練習</h1>
    <input type="text" id="nameInput" placeholder="名前を入力">
    <p id="message"></p>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let nameInput = document.getElementById("nameInput");
let message = document.getElementById("message");

nameInput.addEventListener("focus", function() {
  message.textContent = "入力中です";
  nameInput.style.backgroundColor = "lightyellow";
});

nameInput.addEventListener("blur", function() {
  message.textContent = "入力が完了しました";
  nameInput.style.backgroundColor = "white";
});
```

このプログラムでは、入力欄をクリックすると背景色が変わり、他の場所をクリックすると元に戻ります。

## input と change イベント

inputとchangeは、どちらも入力内容の変更を検出しますが、発生するタイミングが異なります。

### inputイベント（リアルタイム検出）

inputイベントは、入力内容が変更されるたびに即座に発生します。

```javascript
let textInput = document.getElementById("textInput");
let counter = document.getElementById("counter");

textInput.addEventListener("input", function() {
  let length = textInput.value.length;
  counter.textContent = "文字数: " + length;
});
```

このプログラムでは、1文字入力するたびに文字数が更新されます。

### changeイベント（完了時に検出）

changeイベントは、入力内容が変更され、フォーカスが外れたときに発生します。

```javascript
let emailInput = document.getElementById("emailInput");
let validation = document.getElementById("validation");

emailInput.addEventListener("change", function() {
  let email = emailInput.value;
  if (email.includes("@")) {
    validation.textContent = "メールアドレスの形式です";
    validation.style.color = "green";
  } else {
    validation.textContent = "@が含まれていません";
    validation.style.color = "red";
  }
});
```

### inputとchangeの使い分け

**inputを使う場面**
- リアルタイムで検証したいとき（文字数カウンター、禁止文字チェックなど）
- 入力中に即座にフィードバックを返したいとき

**changeを使う場面**
- 入力が完了してから検証したいとき（メールアドレス形式、パスワード強度など）
- 処理が重い場合（入力のたびに実行すると遅くなる）

## 実践例：リアルタイムバリデーション

入力内容をリアルタイムで検証するフォームを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>リアルタイムバリデーション</title>
    <style>
        .error {
            color: red;
        }
        .success {
            color: green;
        }
    </style>
</head>
<body>
    <h1>ユーザー登録フォーム</h1>

    <label>ユーザー名（4文字以上）</label><br>
    <input type="text" id="usernameInput">
    <p id="usernameMessage"></p>

    <label>パスワード（6文字以上）</label><br>
    <input type="password" id="passwordInput">
    <p id="passwordMessage"></p>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let usernameInput = document.getElementById("usernameInput");
let usernameMessage = document.getElementById("usernameMessage");
let passwordInput = document.getElementById("passwordInput");
let passwordMessage = document.getElementById("passwordMessage");

usernameInput.addEventListener("input", function() {
  let username = usernameInput.value;
  if (username.length >= 4) {
    usernameMessage.textContent = "OK";
    usernameMessage.className = "success";
  } else {
    usernameMessage.textContent = "4文字以上入力してください";
    usernameMessage.className = "error";
  }
});

passwordInput.addEventListener("input", function() {
  let password = passwordInput.value;
  if (password.length >= 6) {
    passwordMessage.textContent = "OK";
    passwordMessage.className = "success";
  } else {
    passwordMessage.textContent = "6文字以上入力してください";
    passwordMessage.className = "error";
  }
});
```

このプログラムでは、入力するたびに条件を満たしているかチェックし、リアルタイムでフィードバックを表示します。

## submit イベント

submitイベントは、フォームが送信されるときに発生します。このイベントを使うと、送信前にデータを検証したり、送信処理をカスタマイズしたりできます。

### 基本的な使い方

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>submit イベント</title>
</head>
<body>
    <h1>アンケートフォーム</h1>
    <form id="surveyForm">
        <label>名前:</label><br>
        <input type="text" id="nameInput"><br>

        <label>コメント:</label><br>
        <textarea id="commentInput"></textarea><br>

        <button type="submit">送信</button>
    </form>
    <p id="result"></p>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let surveyForm = document.getElementById("surveyForm");
let result = document.getElementById("result");

surveyForm.addEventListener("submit", function(event) {
  event.preventDefault(); // フォーム送信のデフォルト動作をキャンセル

  let name = document.getElementById("nameInput").value;
  let comment = document.getElementById("commentInput").value;

  result.textContent = name + "さん、ご回答ありがとうございます";
});
```

### event.preventDefault()の重要性

`event.preventDefault()`を呼び出すと、フォーム送信のデフォルト動作（ページのリロード）がキャンセルされます。これを使わないと、フォーム送信時にページが再読み込みされてしまいます。

```javascript
surveyForm.addEventListener("submit", function(event) {
  event.preventDefault(); // これがないとページがリロードされる

  // ここで送信処理を行う
});
```

## 実践例：送信前のバリデーション

フォームを送信する前に、すべての入力内容をチェックするプログラムを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>送信前バリデーション</title>
    <style>
        .error-message {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>お問い合わせフォーム</h1>
    <form id="contactForm">
        <label>名前:</label><br>
        <input type="text" id="nameInput"><br>

        <label>メールアドレス:</label><br>
        <input type="text" id="emailInput"><br>

        <label>メッセージ:</label><br>
        <textarea id="messageInput"></textarea><br>

        <button type="submit">送信</button>
    </form>
    <p id="errorMessage" class="error-message"></p>
    <p id="successMessage"></p>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let contactForm = document.getElementById("contactForm");
let errorMessage = document.getElementById("errorMessage");
let successMessage = document.getElementById("successMessage");

contactForm.addEventListener("submit", function(event) {
  event.preventDefault();

  errorMessage.textContent = "";
  successMessage.textContent = "";

  let name = document.getElementById("nameInput").value;
  let email = document.getElementById("emailInput").value;
  let message = document.getElementById("messageInput").value;

  // バリデーションチェック
  if (name === "") {
    errorMessage.textContent = "名前を入力してください";
    return;
  }

  if (email === "") {
    errorMessage.textContent = "メールアドレスを入力してください";
    return;
  }

  if (!email.includes("@")) {
    errorMessage.textContent = "正しいメールアドレスを入力してください";
    return;
  }

  if (message === "") {
    errorMessage.textContent = "メッセージを入力してください";
    return;
  }

  // すべてのチェックをクリアした場合
  successMessage.textContent = "送信しました";
  contactForm.reset(); // フォームをリセット
});
```

このプログラムでは、送信ボタンをクリックしたときに、すべての入力項目をチェックし、問題があればエラーメッセージを表示します。

### form.reset()

`form.reset()`を使うと、フォームのすべての入力内容をクリアできます。送信が成功した後によく使われます。

## select要素とradio/checkboxのchangeイベント

changeイベントは、テキスト入力だけでなく、select要素（ドロップダウン）やradio/checkboxでも使えます。

### select要素の例

```html
<label>好きな色:</label>
<select id="colorSelect">
    <option value="">選択してください</option>
    <option value="red">赤</option>
    <option value="blue">青</option>
    <option value="green">緑</option>
</select>
<p id="colorMessage"></p>
```

```javascript
let colorSelect = document.getElementById("colorSelect");
let colorMessage = document.getElementById("colorMessage");

colorSelect.addEventListener("change", function() {
  let color = colorSelect.value;
  if (color !== "") {
    colorMessage.textContent = "あなたが選んだ色: " + color;
  }
});
```

### checkbox の例

```html
<label>
    <input type="checkbox" id="agreeCheckbox">
    利用規約に同意する
</label>
<button id="submitButton" disabled>送信</button>
```

```javascript
let agreeCheckbox = document.getElementById("agreeCheckbox");
let submitButton = document.getElementById("submitButton");

agreeCheckbox.addEventListener("change", function() {
  if (agreeCheckbox.checked) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});
```

チェックボックスの状態は、`checked`プロパティで取得できます（`true`または`false`）。

## 実践例：総合フォーム制御

複数のフォームイベントを組み合わせた、実用的なフォームを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>総合フォーム制御</title>
    <style>
        input:focus {
            background-color: lightyellow;
            outline: 2px solid blue;
        }
        .character-count {
            font-size: 12px;
            color: gray;
        }
        .error {
            color: red;
        }
    </style>
</head>
<body>
    <h1>会員登録フォーム</h1>
    <form id="registerForm">
        <label>ユーザー名（4-20文字）:</label><br>
        <input type="text" id="usernameInput" maxlength="20"><br>
        <span id="usernameCount" class="character-count">0/20</span>
        <p id="usernameError" class="error"></p>

        <label>自己紹介（100文字まで）:</label><br>
        <textarea id="bioInput" maxlength="100"></textarea><br>
        <span id="bioCount" class="character-count">0/100</span><br>

        <label>
            <input type="checkbox" id="agreeCheckbox">
            利用規約に同意する
        </label><br>

        <button type="submit" id="submitButton" disabled>登録</button>
    </form>
    <p id="message"></p>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let usernameInput = document.getElementById("usernameInput");
let usernameCount = document.getElementById("usernameCount");
let usernameError = document.getElementById("usernameError");
let bioInput = document.getElementById("bioInput");
let bioCount = document.getElementById("bioCount");
let agreeCheckbox = document.getElementById("agreeCheckbox");
let submitButton = document.getElementById("submitButton");
let registerForm = document.getElementById("registerForm");
let message = document.getElementById("message");

// ユーザー名の文字数カウント
usernameInput.addEventListener("input", function() {
  let length = usernameInput.value.length;
  usernameCount.textContent = length + "/20";

  if (length < 4) {
    usernameError.textContent = "4文字以上入力してください";
  } else {
    usernameError.textContent = "";
  }
});

// 自己紹介の文字数カウント
bioInput.addEventListener("input", function() {
  let length = bioInput.value.length;
  bioCount.textContent = length + "/100";
});

// 利用規約チェックボックス
agreeCheckbox.addEventListener("change", function() {
  let username = usernameInput.value;

  if (agreeCheckbox.checked && username.length >= 4) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});

// ユーザー名が変更されたときも送信ボタンの状態を更新
usernameInput.addEventListener("input", function() {
  let username = usernameInput.value;

  if (agreeCheckbox.checked && username.length >= 4) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});

// フォーム送信
registerForm.addEventListener("submit", function(event) {
  event.preventDefault();

  let username = usernameInput.value;
  let bio = bioInput.value;

  message.textContent = username + "さん、登録が完了しました";
  registerForm.reset();
  submitButton.disabled = true;
  usernameCount.textContent = "0/20";
  bioCount.textContent = "0/100";
});
```

このプログラムでは、複数のフォームイベントを組み合わせて、実用的な会員登録フォームを実装しています。

## よくあるパターン

### パターン1：入力中のヒント表示

```javascript
let passwordInput = document.getElementById("passwordInput");
let hint = document.getElementById("hint");

passwordInput.addEventListener("focus", function() {
  hint.textContent = "8文字以上、英数字を含めてください";
  hint.style.display = "block";
});

passwordInput.addEventListener("blur", function() {
  hint.style.display = "none";
});
```

### パターン2：確認用入力の一致チェック

```javascript
let passwordInput = document.getElementById("passwordInput");
let confirmInput = document.getElementById("confirmInput");
let matchMessage = document.getElementById("matchMessage");

confirmInput.addEventListener("input", function() {
  if (passwordInput.value === confirmInput.value) {
    matchMessage.textContent = "パスワードが一致しています";
    matchMessage.style.color = "green";
  } else {
    matchMessage.textContent = "パスワードが一致していません";
    matchMessage.style.color = "red";
  }
});
```

### パターン3：フォームの変更検知

```javascript
let form = document.getElementById("myForm");
let isFormChanged = false;

form.addEventListener("input", function() {
  isFormChanged = true;
});

window.addEventListener("beforeunload", function(event) {
  if (isFormChanged) {
    event.preventDefault();
    event.returnValue = ""; // 離脱確認ダイアログを表示
  }
});
```

## 注意点

### 1. イベントの対象

- focusとblurは個別の入力要素に設定します
- submitはform要素に設定します
- inputとchangeは入力要素に設定します

### 2. value の取得

フォーム要素の値は、`element.value`で取得します。`textContent`ではありません。

```javascript
let input = document.getElementById("myInput");
let value = input.value; // 正しい
// let value = input.textContent; // これは使えない
```

### 3. preventDefault()の位置

`event.preventDefault()`は、イベントリスナー関数の中で呼び出します。通常はバリデーションの前に呼び出します。

```javascript
form.addEventListener("submit", function(event) {
  event.preventDefault(); // 最初に呼び出す

  // バリデーション処理
});
```

## 練習問題

次の仕様を満たすフォームを作成してください。

### 仕様

1. HTMLに以下の要素を作成する
   - `id="registerForm"`のform要素
   - `id="emailInput"`のinput要素（type="text"）
   - `id="passwordInput"`のinput要素（type="password"）
   - `id="submitButton"`のbutton要素（type="submit"）
   - `id="emailError"`のp要素
   - `id="passwordError"`のp要素
   - `id="result"`のp要素

2. JavaScriptで以下の機能を実装する
   - メールアドレス入力欄がフォーカスを得たとき、背景色を"lightyellow"にする
   - メールアドレス入力欄がフォーカスを失ったとき、背景色を"white"に戻す
   - パスワード入力欄の値が変更されるたびに、6文字未満の場合は`passwordError`に「6文字以上入力してください」と表示する
   - パスワードが6文字以上の場合は`passwordError`を空にする
   - フォーム送信時、メールアドレスに"@"が含まれていない場合は`emailError`に「正しいメールアドレスを入力してください」と表示して送信を中止する
   - すべてのチェックをクリアした場合、`result`に「登録が完了しました」と表示し、フォームをリセットする

### ヒント

- `event.preventDefault()`でフォーム送信のデフォルト動作をキャンセルします
- `includes()`メソッドで文字列に特定の文字が含まれているかチェックできます
- `form.reset()`でフォームをリセットできます

## まとめ

このレッスンでは、以下のことを学びました。

1. focusとblurイベントでフォーカス状態を検出する方法
2. inputとchangeイベントで入力変更を検出する方法
3. submitイベントでフォーム送信を制御する方法
4. `event.preventDefault()`でデフォルト動作をキャンセルする方法
5. リアルタイムバリデーションと送信前バリデーションの実装

フォームイベントを使うことで、ユーザーフレンドリーで安全な入力フォームを作成できるようになりました。次のレッスンでは、さらに高度なイベント処理について学んでいきます。
