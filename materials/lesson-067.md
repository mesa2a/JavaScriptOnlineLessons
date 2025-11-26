---
title: "Lesson 067: フォームイベント"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン67：フォームイベント

## このレッスンで学ぶこと

このレッスンでは、フォーム要素で発生するイベントの扱い方を学びます。フォームイベントは、ウェブアプリケーションにおける最も重要な機能の1つです。ユーザーの入力をリアルタイムで検証したり、送信前にデータをチェックしたり、使いやすいフォームUIを構築できるようになります。

### 学習目標

- focus/blurイベントで入力欄の選択状態を検出できるようになる
- input/changeイベントの違いを理解し、適切に使い分けられるようになる
- submitイベントでフォーム送信を制御できるようになる
- event.preventDefault()でデフォルト動作をキャンセルできるようになる
- フォームバリデーション（検証）を実装できるようになる

---

## 実世界での活用例

フォームイベントは、多くの有名なウェブサービスで使われています。実際の例を見てみましょう。

### 例1：Google アカウント作成

**使用されている場面**
Googleのアカウント作成フォームでは、パスワード入力欄にフォーカスすると、パスワードの条件（8文字以上、英数字を含むなど）が表示されます。また、入力中にリアルタイムで強度を表示します。

**実装されている機能**
```javascript
let passwordInput = document.getElementById("password");
let passwordStrength = document.getElementById("passwordStrength");
let passwordHint = document.getElementById("passwordHint");

// フォーカス時にヒントを表示
passwordInput.addEventListener("focus", function() {
  passwordHint.style.display = "block";
  passwordHint.innerHTML = `
    <ul>
      <li>8文字以上</li>
      <li>大文字と小文字を含む</li>
      <li>数字を含む</li>
      <li>記号を推奨</li>
    </ul>
  `;
});

// 入力中にリアルタイムで強度を判定
passwordInput.addEventListener("input", function() {
  let password = passwordInput.value;
  let strength = calculatePasswordStrength(password);

  if (strength < 30) {
    passwordStrength.textContent = "弱い";
    passwordStrength.style.color = "red";
  } else if (strength < 70) {
    passwordStrength.textContent = "普通";
    passwordStrength.style.color = "orange";
  } else {
    passwordStrength.textContent = "強い";
    passwordStrength.style.color = "green";
  }
});

// フォーカスが外れたら検証
passwordInput.addEventListener("blur", function() {
  if (passwordInput.value.length < 8) {
    passwordInput.style.borderColor = "red";
    showError("パスワードは8文字以上にしてください");
  } else {
    passwordInput.style.borderColor = "green";
    hideError();
  }
});
```

**なぜ重要なのか**
ユーザーがフォームを送信してからエラーを表示するのではなく、入力中にリアルタイムでフィードバックすることで、ユーザー体験が大幅に向上します。エラーを早期に発見できるため、修正も簡単です。

### 例2：Twitter/X 投稿フォーム

**使用されている場面**
Twitterの投稿フォームでは、テキストエリアに入力すると残り文字数がリアルタイムで表示されます。また、280文字を超えるとボタンが無効になります。

**実装されている機能**
```javascript
let tweetTextarea = document.getElementById("tweetText");
let charCounter = document.getElementById("charCounter");
let tweetButton = document.getElementById("tweetButton");
const MAX_LENGTH = 280;

// 入力中に文字数をカウント
tweetTextarea.addEventListener("input", function() {
  let remaining = MAX_LENGTH - tweetTextarea.value.length;
  charCounter.textContent = remaining;

  // 残り文字数に応じて色を変更
  if (remaining < 0) {
    charCounter.style.color = "red";
    tweetButton.disabled = true;
  } else if (remaining < 20) {
    charCounter.style.color = "orange";
    tweetButton.disabled = false;
  } else {
    charCounter.style.color = "gray";
    tweetButton.disabled = false;
  }
});

// フォーカス時にツールバーを表示
tweetTextarea.addEventListener("focus", function() {
  document.getElementById("tweetToolbar").style.display = "flex";
});

// 送信時の処理
let tweetForm = document.getElementById("tweetForm");
tweetForm.addEventListener("submit", function(event) {
  event.preventDefault(); // デフォルトのフォーム送信を防ぐ

  if (tweetTextarea.value.trim().length === 0) {
    alert("ツイート内容を入力してください");
    return;
  }

  if (tweetTextarea.value.length > MAX_LENGTH) {
    alert("文字数が上限を超えています");
    return;
  }

  // ツイートを送信
  postTweet(tweetTextarea.value);
  tweetTextarea.value = "";
  charCounter.textContent = MAX_LENGTH;
});
```

**なぜ重要なのか**
文字数制限があるサービスでは、リアルタイムフィードバックが必須です。ユーザーは送信前に内容を調整でき、エラーによる送信失敗を防げます。

### 例3：Amazon ログインフォーム

**使用されている場面**
Amazonのログインフォームでは、メールアドレスの形式を入力中にチェックし、不正な形式の場合は警告を表示します。

**実装されている機能**
```javascript
let emailInput = document.getElementById("email");
let emailError = document.getElementById("emailError");

// メールアドレスの形式をチェックする関数
function isValidEmail(email) {
  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// フォーカス時にエラーをクリア
emailInput.addEventListener("focus", function() {
  emailError.style.display = "none";
  emailInput.style.borderColor = "#007bff";
});

// 入力中はリアルタイムでチェックしない（邪魔にならないように）
// ただし、すでにエラーが表示されている場合は即座に消す
emailInput.addEventListener("input", function() {
  if (emailError.style.display === "block" && isValidEmail(emailInput.value)) {
    emailError.style.display = "none";
    emailInput.style.borderColor = "green";
  }
});

// フォーカスが外れたら検証
emailInput.addEventListener("blur", function() {
  let email = emailInput.value.trim();

  if (email.length === 0) {
    emailError.textContent = "メールアドレスを入力してください";
    emailError.style.display = "block";
    emailInput.style.borderColor = "red";
  } else if (!isValidEmail(email)) {
    emailError.textContent = "有効なメールアドレスを入力してください";
    emailError.style.display = "block";
    emailInput.style.borderColor = "red";
  } else {
    emailError.style.display = "none";
    emailInput.style.borderColor = "green";
  }
});

// フォーム送信時の最終検証
let loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // すべてのフィールドを検証
  let email = emailInput.value.trim();
  let password = passwordInput.value;

  if (!isValidEmail(email)) {
    alert("有効なメールアドレスを入力してください");
    emailInput.focus();
    return;
  }

  if (password.length === 0) {
    alert("パスワードを入力してください");
    passwordInput.focus();
    return;
  }

  // ログイン処理
  login(email, password);
});
```

**なぜ重要なのか**
入力中に過度な検証をせず、フォーカスが外れたタイミングで検証することで、ユーザーの入力を邪魔しません。この絶妙なバランスが良いUXを生み出します。

### 例4：GitHub リポジトリ作成フォーム

**使用されている場面**
GitHubのリポジトリ作成フォームでは、リポジトリ名の入力中に利用可能かどうかをリアルタイムでチェックします。

**実装されている機能**
```javascript
let repoNameInput = document.getElementById("repoName");
let availabilityMessage = document.getElementById("availability");
let createButton = document.getElementById("createButton");
let checkTimeout;

// 入力中にリポジトリ名の利用可能性をチェック
repoNameInput.addEventListener("input", function() {
  let repoName = repoNameInput.value.trim();

  // 入力が止まってから500ms後にチェック（連続入力中はチェックしない）
  clearTimeout(checkTimeout);

  if (repoName.length === 0) {
    availabilityMessage.textContent = "";
    createButton.disabled = true;
    return;
  }

  availabilityMessage.textContent = "確認中...";
  availabilityMessage.style.color = "gray";

  checkTimeout = setTimeout(function() {
    // サーバーにリポジトリ名の利用可能性を問い合わせ
    checkRepoNameAvailability(repoName).then(function(isAvailable) {
      if (isAvailable) {
        availabilityMessage.textContent = "✓ " + repoName + " は利用可能です";
        availabilityMessage.style.color = "green";
        createButton.disabled = false;
      } else {
        availabilityMessage.textContent = "✗ " + repoName + " は既に使用されています";
        availabilityMessage.style.color = "red";
        createButton.disabled = true;
      }
    });
  }, 500);
});

// フォーカス時にヘルプテキストを表示
repoNameInput.addEventListener("focus", function() {
  document.getElementById("repoNameHelp").style.display = "block";
});

// フォーカスが外れたらヘルプテキストを非表示
repoNameInput.addEventListener("blur", function() {
  document.getElementById("repoNameHelp").style.display = "none";
});
```

**なぜ重要なのか**
サーバーへの問い合わせが必要な検証でも、適切なタイミング（入力が止まってから）でチェックすることで、サーバー負荷を抑えつつリアルタイムなフィードバックを提供できます。

### 例5：Netflix パスワード表示切り替え

**使用されている場面**
Netflixのログインフォームでは、パスワード入力欄に「表示」ボタンがあり、クリックするとパスワードが見えるようになります。

**実装されている機能**
```javascript
let passwordInput = document.getElementById("password");
let toggleButton = document.getElementById("togglePassword");
let isPasswordVisible = false;

// 表示/非表示の切り替え
toggleButton.addEventListener("click", function() {
  if (isPasswordVisible) {
    passwordInput.type = "password";
    toggleButton.textContent = "表示";
    isPasswordVisible = false;
  } else {
    passwordInput.type = "text";
    toggleButton.textContent = "非表示";
    isPasswordVisible = true;
  }
});

// パスワード入力欄にフォーカスがある時だけ表示ボタンを見せる
passwordInput.addEventListener("focus", function() {
  toggleButton.style.display = "inline-block";
});

passwordInput.addEventListener("blur", function() {
  // 少し遅延させて、ボタンクリックが検出されるようにする
  setTimeout(function() {
    toggleButton.style.display = "none";
  }, 200);
});

// changeイベントでパスワードが入力されたかチェック
passwordInput.addEventListener("change", function() {
  if (passwordInput.value.length > 0) {
    // パスワードが入力されたことを記録（再訪問時の自動入力判定など）
    localStorage.setItem("hasPassword", "true");
  }
});
```

**なぜ重要なのか**
ユーザーがパスワードの入力ミスを確認できるようにすることで、ログインエラーを減らせます。focus/blurを使ったUIの表示/非表示制御は、フォームのユーザビリティを大きく向上させます。

---

## フォームイベントとは

フォームイベントは、input要素やform要素で発生する特別なイベントです。ユーザーがテキストを入力したり、選択肢を選んだり、フォームを送信したりするときに発生します。

### なぜフォームイベントが重要なのか

フォームイベントは、以下の理由で現代のウェブ開発において非常に重要です。

1. **リアルタイムバリデーション**
   - 入力中にエラーをチェックし、即座にフィードバックできます
   - ユーザーは送信前にエラーを修正できます

2. **ユーザー体験の向上**
   - 文字数カウント、入力ヒント、自動補完などを実装できます
   - ユーザーが何をすべきか明確に伝えられます

3. **データの整合性**
   - 不正なデータの送信を防げます
   - サーバー側の負荷を減らせます

4. **アクセシビリティ**
   - スクリーンリーダーと連携してエラーを読み上げられます
   - キーボードだけで操作できるフォームを作れます

### 主なフォームイベント

JavaScriptには主に5つのフォームイベントがあります。

#### 1. focus（フォーカス）

**発生タイミング**
要素がフォーカスを得たとき（クリックやTabキーで選択されたとき）に発生します。

**特徴**
- 入力欄が選択された状態になったときです
- カーソルが点滅し、入力可能な状態です
- バブリングしません（親要素には伝播しない）

**使用例**
```javascript
inputElement.addEventListener("focus", function() {
  console.log("入力欄が選択されました");
});
```

#### 2. blur（ブラー）

**発生タイミング**
要素がフォーカスを失ったとき（他の場所をクリックしたとき）に発生します。

**特徴**
- 入力欄の選択が解除されたときです
- 入力が完了したタイミングと考えられます
- バブリングしません（親要素には伝播しない）

**使用例**
```javascript
inputElement.addEventListener("blur", function() {
  console.log("入力欄の選択が解除されました");
});
```

#### 3. input（インプット）

**発生タイミング**
入力内容が変更されるたびに発生します。

**特徴**
- 1文字入力するたびに発生します（リアルタイム検出）
- キーボード入力、ペースト、音声入力などすべてに反応します
- バブリングします（親要素にも伝播する）

**使用例**
```javascript
inputElement.addEventListener("input", function() {
  console.log("入力内容が変更されました: " + inputElement.value);
});
```

#### 4. change（チェンジ）

**発生タイミング**
入力内容が変更され、フォーカスが外れたときに発生します。

**特徴**
- 入力が完了したときです
- text inputでは、値が変更されてからblurした時
- checkbox/radioでは、選択が変更された瞬間
- selectでは、選択肢が変更された瞬間
- バブリングします（親要素にも伝播する）

**使用例**
```javascript
inputElement.addEventListener("change", function() {
  console.log("入力が完了しました: " + inputElement.value);
});
```

#### 5. submit（サブミット）

**発生タイミング**
フォームが送信されるときに発生します。

**特徴**
- フォーム送信ボタンがクリックされたとき
- 入力欄でEnterキーを押したとき
- form要素に対してのみ発生します
- event.preventDefault()で送信をキャンセルできます
- バブリングします（親要素にも伝播する）

**使用例**
```javascript
formElement.addEventListener("submit", function(event) {
  event.preventDefault(); // デフォルトの送信を防ぐ
  console.log("フォームが送信されました");
});
```

---

## focus と blur イベント

focusとblurは、入力欄の選択状態を検出するイベントです。これらを使うことで、ユーザーがどのフィールドを操作しているかを把握し、適切なフィードバックを提供できます。

### 基本的な使い方

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>focus/blur イベント</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
        }

        input[type="text"],
        input[type="email"] {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            border: 2px solid #ddd;
            border-radius: 5px;
            box-sizing: border-box;
            transition: all 0.3s;
        }

        input:focus {
            outline: none;
            border-color: #2196F3;
            background-color: #f0f8ff;
        }

        .message {
            margin-top: 5px;
            font-size: 14px;
            color: #666;
            min-height: 20px;
        }
    </style>
</head>
<body>
    <h1>フォーカスイベントの練習</h1>

    <div class="form-group">
        <label for="nameInput">名前</label>
        <input type="text" id="nameInput" placeholder="名前を入力してください">
        <div id="nameMessage" class="message"></div>
    </div>

    <div class="form-group">
        <label for="emailInput">メールアドレス</label>
        <input type="email" id="emailInput" placeholder="email@example.com">
        <div id="emailMessage" class="message"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let nameInput = document.getElementById("nameInput");
let nameMessage = document.getElementById("nameMessage");
let emailInput = document.getElementById("emailInput");
let emailMessage = document.getElementById("emailMessage");

// 名前入力欄のfocusイベント
nameInput.addEventListener("focus", function() {
  nameMessage.textContent = "名前を入力してください（2文字以上）";
  nameMessage.style.color = "#2196F3";
});

// 名前入力欄のblurイベント
nameInput.addEventListener("blur", function() {
  let name = nameInput.value.trim();

  if (name.length === 0) {
    nameMessage.textContent = "名前を入力してください";
    nameMessage.style.color = "red";
    nameInput.style.borderColor = "red";
  } else if (name.length < 2) {
    nameMessage.textContent = "名前は2文字以上で入力してください";
    nameMessage.style.color = "red";
    nameInput.style.borderColor = "red";
  } else {
    nameMessage.textContent = "✓ OK";
    nameMessage.style.color = "green";
    nameInput.style.borderColor = "green";
  }
});

// メールアドレス入力欄のfocusイベント
emailInput.addEventListener("focus", function() {
  emailMessage.textContent = "メールアドレスを入力してください";
  emailMessage.style.color = "#2196F3";
});

// メールアドレス入力欄のblurイベント
emailInput.addEventListener("blur", function() {
  let email = emailInput.value.trim();
  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.length === 0) {
    emailMessage.textContent = "メールアドレスを入力してください";
    emailMessage.style.color = "red";
    emailInput.style.borderColor = "red";
  } else if (!pattern.test(email)) {
    emailMessage.textContent = "有効なメールアドレスを入力してください";
    emailMessage.style.color = "red";
    emailInput.style.borderColor = "red";
  } else {
    emailMessage.textContent = "✓ OK";
    emailMessage.style.color = "green";
    emailInput.style.borderColor = "green";
  }
});
```

### コードの詳細説明

#### focusイベントの活用

```javascript
nameInput.addEventListener("focus", function() {
  nameMessage.textContent = "名前を入力してください（2文字以上）";
  nameMessage.style.color = "#2196F3";
});
```

- フォーカス時にヒントを表示します
- ユーザーに何を入力すべきか明確に伝えます
- 青色で表示することで、情報であることを示します

#### blurイベントでの検証

```javascript
nameInput.addEventListener("blur", function() {
  let name = nameInput.value.trim();

  if (name.length === 0) {
    // エラー処理
  } else if (name.length < 2) {
    // エラー処理
  } else {
    // 成功処理
  }
});
```

- `trim()`で前後の空白を削除してから検証します
- 入力が完了したタイミング（blur）で検証します
- エラーの場合は赤色、成功の場合は緑色で表示します

---

## input と change イベント

inputとchangeは、どちらも入力内容の変更を検出しますが、発生するタイミングが異なります。この違いを理解することが重要です。

### inputイベント（リアルタイム検出）

inputイベントは、入力内容が変更されるたびに即座に発生します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>inputイベント</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }

        textarea {
            width: 100%;
            height: 150px;
            padding: 12px;
            font-size: 16px;
            border: 2px solid #ddd;
            border-radius: 5px;
            box-sizing: border-box;
            resize: vertical;
        }

        .counter-container {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .char-counter {
            font-size: 18px;
            font-weight: bold;
        }

        .counter-ok {
            color: #666;
        }

        .counter-warning {
            color: orange;
        }

        .counter-danger {
            color: red;
        }

        .progress-bar {
            width: 100%;
            height: 5px;
            background-color: #e0e0e0;
            border-radius: 3px;
            overflow: hidden;
            margin-top: 5px;
        }

        .progress-fill {
            height: 100%;
            background-color: #2196F3;
            transition: width 0.3s, background-color 0.3s;
        }
    </style>
</head>
<body>
    <h1>文字数カウンター</h1>
    <p>最大280文字まで入力できます</p>

    <textarea id="textArea" placeholder="ここにテキストを入力してください..."></textarea>

    <div class="counter-container">
        <span class="char-counter" id="charCounter">0 / 280</span>
        <span id="remaining"></span>
    </div>

    <div class="progress-bar">
        <div class="progress-fill" id="progressFill"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let textArea = document.getElementById("textArea");
let charCounter = document.getElementById("charCounter");
let remaining = document.getElementById("remaining");
let progressFill = document.getElementById("progressFill");
const MAX_LENGTH = 280;

textArea.addEventListener("input", function() {
  let length = textArea.value.length;
  let remainingChars = MAX_LENGTH - length;

  // 文字数を表示
  charCounter.textContent = length + " / " + MAX_LENGTH;

  // 残り文字数を表示
  if (remainingChars >= 0) {
    remaining.textContent = "残り " + remainingChars + " 文字";
  } else {
    remaining.textContent = Math.abs(remainingChars) + " 文字オーバー";
  }

  // プログレスバーを更新
  let percentage = (length / MAX_LENGTH) * 100;
  if (percentage > 100) percentage = 100;
  progressFill.style.width = percentage + "%";

  // 色を変更
  if (length > MAX_LENGTH) {
    charCounter.className = "char-counter counter-danger";
    progressFill.style.backgroundColor = "red";
    remaining.style.color = "red";
  } else if (remainingChars < 20) {
    charCounter.className = "char-counter counter-warning";
    progressFill.style.backgroundColor = "orange";
    remaining.style.color = "orange";
  } else {
    charCounter.className = "char-counter counter-ok";
    progressFill.style.backgroundColor = "#2196F3";
    remaining.style.color = "#666";
  }
});
```

このプログラムでは、1文字入力するたびに文字数が更新され、視覚的なフィードバックが得られます。

### changeイベント（完了時に検出）

changeイベントは、入力内容が変更され、フォーカスが外れたときに発生します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>changeイベント</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }

        .form-group {
            margin-bottom: 25px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #333;
        }

        select,
        input[type="text"],
        input[type="number"] {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            border: 2px solid #ddd;
            border-radius: 5px;
            box-sizing: border-box;
        }

        input[type="checkbox"],
        input[type="radio"] {
            margin-right: 8px;
        }

        .summary {
            background-color: #f0f8ff;
            padding: 20px;
            border-radius: 5px;
            border-left: 4px solid #2196F3;
            margin-top: 30px;
        }

        .summary h2 {
            margin-top: 0;
            color: #2196F3;
        }

        .summary-item {
            margin: 10px 0;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h1>注文フォーム</h1>

    <div class="form-group">
        <label for="productSelect">商品を選択</label>
        <select id="productSelect">
            <option value="">-- 選択してください --</option>
            <option value="laptop" data-price="120000">ノートパソコン (¥120,000)</option>
            <option value="mouse" data-price="3000">マウス (¥3,000)</option>
            <option value="keyboard" data-price="8000">キーボード (¥8,000)</option>
            <option value="monitor" data-price="35000">モニター (¥35,000)</option>
        </select>
    </div>

    <div class="form-group">
        <label for="quantityInput">数量</label>
        <input type="number" id="quantityInput" value="1" min="1" max="10">
    </div>

    <div class="form-group">
        <label>配送オプション</label>
        <div>
            <input type="radio" id="standard" name="shipping" value="standard" checked>
            <label for="standard" style="display: inline; font-weight: normal;">通常配送（無料）</label>
        </div>
        <div>
            <input type="radio" id="express" name="shipping" value="express">
            <label for="express" style="display: inline; font-weight: normal;">速達配送（+¥1,000）</label>
        </div>
    </div>

    <div class="form-group">
        <input type="checkbox" id="giftWrap">
        <label for="giftWrap" style="display: inline; font-weight: normal;">ギフト包装（+¥500）</label>
    </div>

    <div class="summary">
        <h2>注文概要</h2>
        <div class="summary-item">商品: <span id="summaryProduct">未選択</span></div>
        <div class="summary-item">数量: <span id="summaryQuantity">1</span></div>
        <div class="summary-item">配送: <span id="summaryShipping">通常配送</span></div>
        <div class="summary-item">ギフト包装: <span id="summaryGift">なし</span></div>
        <div class="summary-item" style="font-size: 20px; font-weight: bold; margin-top: 15px;">
            合計: <span id="summaryTotal">¥0</span>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let productSelect = document.getElementById("productSelect");
let quantityInput = document.getElementById("quantityInput");
let standardRadio = document.getElementById("standard");
let expressRadio = document.getElementById("express");
let giftWrapCheckbox = document.getElementById("giftWrap");

let summaryProduct = document.getElementById("summaryProduct");
let summaryQuantity = document.getElementById("summaryQuantity");
let summaryShipping = document.getElementById("summaryShipping");
let summaryGift = document.getElementById("summaryGift");
let summaryTotal = document.getElementById("summaryTotal");

let productPrice = 0;

// 合計金額を計算する関数
function updateSummary() {
  let quantity = parseInt(quantityInput.value) || 1;
  let subtotal = productPrice * quantity;

  // 配送料
  let shippingCost = expressRadio.checked ? 1000 : 0;

  // ギフト包装
  let giftCost = giftWrapCheckbox.checked ? 500 : 0;

  // 合計
  let total = subtotal + shippingCost + giftCost;

  // 表示を更新
  summaryQuantity.textContent = quantity;
  summaryShipping.textContent = expressRadio.checked ? "速達配送 (+¥1,000)" : "通常配送（無料）";
  summaryGift.textContent = giftWrapCheckbox.checked ? "あり (+¥500)" : "なし";
  summaryTotal.textContent = "¥" + total.toLocaleString();
}

// 商品選択のchangeイベント
productSelect.addEventListener("change", function() {
  let selectedOption = productSelect.options[productSelect.selectedIndex];

  if (selectedOption.value === "") {
    summaryProduct.textContent = "未選択";
    productPrice = 0;
  } else {
    summaryProduct.textContent = selectedOption.textContent;
    productPrice = parseInt(selectedOption.getAttribute("data-price"));
  }

  updateSummary();
});

// 数量のchangeイベント
quantityInput.addEventListener("change", function() {
  updateSummary();
});

// 配送オプションのchangeイベント
standardRadio.addEventListener("change", updateSummary);
expressRadio.addEventListener("change", updateSummary);

// ギフト包装のchangeイベント
giftWrapCheckbox.addEventListener("change", updateSummary);

// 初期表示
updateSummary();
```

### inputとchangeの違い

| 特徴 | input | change |
|------|-------|--------|
| 発生タイミング | 入力のたびに即座 | 値が変更されてフォーカスが外れた時 |
| text inputでの動作 | 1文字ごとに発生 | blur時に発生（値が変更されている場合） |
| select要素での動作 | 発生しない | 選択肢が変更された瞬間に発生 |
| checkbox/radioでの動作 | 発生しない | チェック状態が変更された瞬間に発生 |
| 使用場面 | リアルタイム検証、文字数カウント | 完了時の検証、フォーム値の確定 |

### いつどちらを使うべきか

**inputを使うべき場面**
- 文字数をリアルタイムで表示したい
- 入力中に自動補完を表示したい
- パスワード強度を即座に判定したい
- 検索ボックスで入力中に候補を表示したい

**changeを使うべき場面**
- 選択肢が変更されたときに処理を実行したい
- 入力が完了したときに合計金額を計算したい
- フォーカスが外れたタイミングで検証したい
- サーバーへのリクエスト回数を減らしたい

---

## submit イベント

submitイベントは、フォームが送信されるときに発生します。このイベントを使うことで、送信前にデータを検証したり、デフォルトの送信動作をキャンセルしてAjaxで送信したりできます。

### 基本的な使い方

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>submitイベント</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
        }

        input[type="text"],
        input[type="email"],
        input[type="password"],
        textarea {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            border: 2px solid #ddd;
            border-radius: 5px;
            box-sizing: border-box;
        }

        textarea {
            height: 100px;
            resize: vertical;
        }

        .error {
            color: red;
            font-size: 14px;
            margin-top: 5px;
            display: none;
        }

        .error.show {
            display: block;
        }

        input.invalid {
            border-color: red;
        }

        input.valid {
            border-color: green;
        }

        button {
            padding: 12px 30px;
            font-size: 16px;
            background-color: #2196F3;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #1976D2;
        }

        button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }

        .success-message {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
            display: none;
        }

        .success-message.show {
            display: block;
        }
    </style>
</head>
<body>
    <h1>お問い合わせフォーム</h1>

    <form id="contactForm">
        <div class="form-group">
            <label for="nameInput">お名前 <span style="color: red;">*</span></label>
            <input type="text" id="nameInput" required>
            <div class="error" id="nameError"></div>
        </div>

        <div class="form-group">
            <label for="emailInput">メールアドレス <span style="color: red;">*</span></label>
            <input type="email" id="emailInput" required>
            <div class="error" id="emailError"></div>
        </div>

        <div class="form-group">
            <label for="messageInput">お問い合わせ内容 <span style="color: red;">*</span></label>
            <textarea id="messageInput" required></textarea>
            <div class="error" id="messageError"></div>
        </div>

        <button type="submit">送信する</button>
    </form>

    <div class="success-message" id="successMessage">
        お問い合わせを受け付けました。ありがとうございます！
    </div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let contactForm = document.getElementById("contactForm");
let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let messageInput = document.getElementById("messageInput");

let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
let messageError = document.getElementById("messageError");
let successMessage = document.getElementById("successMessage");

// メールアドレスの形式をチェックする関数
function isValidEmail(email) {
  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// エラーメッセージを表示する関数
function showError(inputElement, errorElement, message) {
  errorElement.textContent = message;
  errorElement.classList.add("show");
  inputElement.classList.add("invalid");
  inputElement.classList.remove("valid");
}

// エラーメッセージを非表示にする関数
function hideError(inputElement, errorElement) {
  errorElement.classList.remove("show");
  inputElement.classList.remove("invalid");
  inputElement.classList.add("valid");
}

// フォーム送信イベント
contactForm.addEventListener("submit", function(event) {
  event.preventDefault(); // デフォルトのフォーム送信を防ぐ

  // エラーフラグ
  let hasError = false;

  // 名前の検証
  let name = nameInput.value.trim();
  if (name.length === 0) {
    showError(nameInput, nameError, "お名前を入力してください");
    hasError = true;
  } else if (name.length < 2) {
    showError(nameInput, nameError, "お名前は2文字以上で入力してください");
    hasError = true;
  } else {
    hideError(nameInput, nameError);
  }

  // メールアドレスの検証
  let email = emailInput.value.trim();
  if (email.length === 0) {
    showError(emailInput, emailError, "メールアドレスを入力してください");
    hasError = true;
  } else if (!isValidEmail(email)) {
    showError(emailInput, emailError, "有効なメールアドレスを入力してください");
    hasError = true;
  } else {
    hideError(emailInput, emailError);
  }

  // お問い合わせ内容の検証
  let message = messageInput.value.trim();
  if (message.length === 0) {
    showError(messageInput, messageError, "お問い合わせ内容を入力してください");
    hasError = true;
  } else if (message.length < 10) {
    showError(messageInput, messageError, "お問い合わせ内容は10文字以上で入力してください");
    hasError = true;
  } else {
    hideError(messageInput, messageError);
  }

  // エラーがある場合は送信しない
  if (hasError) {
    console.log("バリデーションエラーがあります");
    return;
  }

  // エラーがない場合は送信処理を実行
  console.log("フォームを送信します");
  console.log("名前: " + name);
  console.log("メール: " + email);
  console.log("メッセージ: " + message);

  // サーバーに送信（実際のコードではfetchやXMLHttpRequestを使用）
  // ここではシミュレーション
  setTimeout(function() {
    // 成功メッセージを表示
    successMessage.classList.add("show");

    // フォームをリセット
    contactForm.reset();

    // バリデーションのクラスを削除
    nameInput.classList.remove("valid");
    emailInput.classList.remove("valid");
    messageInput.classList.remove("valid");

    // 3秒後に成功メッセージを非表示
    setTimeout(function() {
      successMessage.classList.remove("show");
    }, 3000);
  }, 500);
});

// 入力中にエラーが解消されたら即座にエラーを消す
nameInput.addEventListener("input", function() {
  if (nameError.classList.contains("show") && nameInput.value.trim().length >= 2) {
    hideError(nameInput, nameError);
  }
});

emailInput.addEventListener("input", function() {
  if (emailError.classList.contains("show") && isValidEmail(emailInput.value.trim())) {
    hideError(emailInput, emailError);
  }
});

messageInput.addEventListener("input", function() {
  if (messageError.classList.contains("show") && messageInput.value.trim().length >= 10) {
    hideError(messageInput, messageError);
  }
});
```

### コードの詳細説明

#### event.preventDefault()の重要性

```javascript
contactForm.addEventListener("submit", function(event) {
  event.preventDefault(); // デフォルトのフォーム送信を防ぐ
```

- `event.preventDefault()`を呼ばないと、フォームがそのまま送信されてページが遷移します
- これを呼ぶことで、送信をキャンセルし、JavaScriptで処理を制御できます
- バリデーションやAjax送信を実装する際に必須です

#### バリデーションの流れ

```javascript
let hasError = false;

// 各フィールドを検証
if (name.length === 0) {
  showError(nameInput, nameError, "お名前を入力してください");
  hasError = true;
}

// エラーがある場合は送信しない
if (hasError) {
  return;
}

// エラーがない場合は送信処理を実行
```

- すべてのフィールドを検証してからエラーフラグをチェックします
- これにより、すべてのエラーを一度に表示できます
- エラーがある場合は早期リターンで処理を中断します

#### リアルタイムエラークリア

```javascript
nameInput.addEventListener("input", function() {
  if (nameError.classList.contains("show") && nameInput.value.trim().length >= 2) {
    hideError(nameInput, nameError);
  }
});
```

- エラーが表示されている状態で、ユーザーが修正を始めたら即座にエラーを消します
- これにより、ユーザーは修正が正しいかすぐに確認できます
- UXが大幅に向上します

---

## よくある間違いと解決方法

### 間違い1：inputとchangeを混同する

**問題のあるコード**
```javascript
// selectでinputイベントを使おうとする（発生しない）
selectElement.addEventListener("input", function() {
  console.log("選択が変更されました"); // 動かない
});
```

**何が問題なのか**
select要素ではinputイベントは発生しません。changeイベントを使う必要があります。

**正しいコード**
```javascript
// selectではchangeイベントを使う
selectElement.addEventListener("change", function() {
  console.log("選択が変更されました"); // 正しく動く
});
```

### 間違い2：submitイベントでpreventDefault()を忘れる

**問題のあるコード**
```javascript
form.addEventListener("submit", function(event) {
  // バリデーション処理
  if (!isValid()) {
    alert("入力内容に誤りがあります");
    // preventDefault()を呼んでいない！
  }
});
```

**何が問題なのか**
preventDefault()を呼ばないと、バリデーションエラーがあってもフォームが送信されてしまいます。

**正しいコード**
```javascript
form.addEventListener("submit", function(event) {
  event.preventDefault(); // 最初に必ず呼ぶ

  // バリデーション処理
  if (!isValid()) {
    alert("入力内容に誤りがあります");
    return;
  }

  // バリデーションOKの場合のみ送信
  submitForm();
});
```

### 間違い3：blurイベントで毎回エラーを表示してしまう

**問題のあるコード**
```javascript
input.addEventListener("blur", function() {
  if (input.value.length === 0) {
    showError("入力してください");
  }
});
```

**何が問題なのか**
ユーザーが何も入力せずにフィールドを通過しただけでエラーが表示され、UXが悪いです。

**正しいコード**
```javascript
let hasInteracted = false;

input.addEventListener("input", function() {
  hasInteracted = true;
});

input.addEventListener("blur", function() {
  // ユーザーが何か入力した後の場合のみチェック
  if (hasInteracted && input.value.length === 0) {
    showError("入力してください");
  }
});
```

### 間違い4：focusとblurでバブリングしないことを忘れる

**問題のあるコード**
```javascript
// 親要素でfocusイベントを検出しようとする
formContainer.addEventListener("focus", function() {
  console.log("フォーカスされました"); // 動かない
});
```

**何が問題なのか**
focusとblurイベントはバブリングしないため、親要素では検出できません。

**正しいコード - 方法1: focusinとfocusoutを使う**
```javascript
// focusinとfocusoutはバブリングする
formContainer.addEventListener("focusin", function(event) {
  console.log("フォーカスされました: " + event.target.id);
});
```

**正しいコード - 方法2: キャプチャフェーズを使う**
```javascript
// 第3引数にtrueを指定してキャプチャフェーズで検出
formContainer.addEventListener("focus", function(event) {
  console.log("フォーカスされました: " + event.target.id);
}, true); // キャプチャフェーズ
```

### 間違い5：changeイベントの発生タイミングを誤解する

**問題のあるコード**
```javascript
// text inputでchangeイベントを使い、リアルタイム処理を期待する
textInput.addEventListener("change", function() {
  updatePreview(); // フォーカスが外れるまで実行されない
});
```

**何が問題なのか**
text inputのchangeイベントは、値が変更されてからblurしたときに発生します。リアルタイムではありません。

**正しいコード**
```javascript
// リアルタイム処理にはinputイベントを使う
textInput.addEventListener("input", function() {
  updatePreview(); // 1文字ごとに実行される
});
```

### 間違い6：フォーム送信をボタンのclickイベントで処理する

**問題のあるコード**
```javascript
// ボタンのclickイベントで処理
submitButton.addEventListener("click", function(event) {
  event.preventDefault();
  submitForm();
});
```

**何が問題なのか**
この方法では、Enterキーでのフォーム送信に対応できません。また、フォームのデフォルト機能を活用できません。

**正しいコード**
```javascript
// formのsubmitイベントで処理
form.addEventListener("submit", function(event) {
  event.preventDefault();
  submitForm();
  // ボタンクリックもEnterキーも両方対応できる
});
```

---

## 実践的なアプリケーション例

### アプリケーション1：会員登録フォーム

完全なバリデーション機能を持つ会員登録フォームを作成します。

#### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>会員登録フォーム</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            padding: 40px;
            max-width: 500px;
            width: 100%;
        }

        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
        }

        .form-group {
            margin-bottom: 25px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #555;
        }

        .required {
            color: red;
        }

        input[type="text"],
        input[type="email"],
        input[type="password"] {
            width: 100%;
            padding: 12px 15px;
            font-size: 16px;
            border: 2px solid #ddd;
            border-radius: 5px;
            transition: all 0.3s;
        }

        input:focus {
            outline: none;
            border-color: #667eea;
            background-color: #f8f9ff;
        }

        input.valid {
            border-color: #4CAF50;
        }

        input.invalid {
            border-color: #f44336;
        }

        .input-wrapper {
            position: relative;
        }

        .validation-icon {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
            display: none;
        }

        .validation-icon.show {
            display: block;
        }

        .error-message,
        .hint-message {
            font-size: 14px;
            margin-top: 5px;
            display: none;
        }

        .error-message {
            color: #f44336;
        }

        .error-message.show {
            display: block;
        }

        .hint-message {
            color: #667eea;
        }

        .hint-message.show {
            display: block;
        }

        .password-strength {
            margin-top: 8px;
            display: none;
        }

        .password-strength.show {
            display: block;
        }

        .strength-bar {
            height: 5px;
            background-color: #e0e0e0;
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 5px;
        }

        .strength-fill {
            height: 100%;
            width: 0%;
            transition: width 0.3s, background-color 0.3s;
        }

        .strength-fill.weak {
            width: 33%;
            background-color: #f44336;
        }

        .strength-fill.medium {
            width: 66%;
            background-color: #ff9800;
        }

        .strength-fill.strong {
            width: 100%;
            background-color: #4CAF50;
        }

        .strength-text {
            font-size: 13px;
            color: #666;
        }

        .checkbox-group {
            margin: 20px 0;
        }

        .checkbox-group label {
            font-weight: normal;
            display: inline;
        }

        input[type="checkbox"] {
            margin-right: 8px;
        }

        .submit-button {
            width: 100%;
            padding: 15px;
            font-size: 18px;
            font-weight: bold;
            color: white;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .submit-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .submit-button:active:not(:disabled) {
            transform: translateY(0);
        }

        .submit-button:disabled {
            background: #ccc;
            cursor: not-allowed;
        }

        .success-message {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
            display: none;
            text-align: center;
        }

        .success-message.show {
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>会員登録</h1>

        <div class="success-message" id="successMessage">
            <strong>登録が完了しました！</strong><br>
            ご登録ありがとうございます。
        </div>

        <form id="registerForm">
            <div class="form-group">
                <label for="username">ユーザー名 <span class="required">*</span></label>
                <div class="input-wrapper">
                    <input type="text" id="username" autocomplete="off">
                    <span class="validation-icon" id="usernameIcon"></span>
                </div>
                <div class="hint-message" id="usernameHint">3〜20文字の英数字</div>
                <div class="error-message" id="usernameError"></div>
            </div>

            <div class="form-group">
                <label for="email">メールアドレス <span class="required">*</span></label>
                <div class="input-wrapper">
                    <input type="email" id="email" autocomplete="off">
                    <span class="validation-icon" id="emailIcon"></span>
                </div>
                <div class="hint-message" id="emailHint">有効なメールアドレスを入力してください</div>
                <div class="error-message" id="emailError"></div>
            </div>

            <div class="form-group">
                <label for="password">パスワード <span class="required">*</span></label>
                <div class="input-wrapper">
                    <input type="password" id="password">
                    <span class="validation-icon" id="passwordIcon"></span>
                </div>
                <div class="hint-message" id="passwordHint">8文字以上、大文字・小文字・数字を含む</div>
                <div class="password-strength" id="passwordStrength">
                    <div class="strength-bar">
                        <div class="strength-fill" id="strengthFill"></div>
                    </div>
                    <div class="strength-text" id="strengthText"></div>
                </div>
                <div class="error-message" id="passwordError"></div>
            </div>

            <div class="form-group">
                <label for="confirmPassword">パスワード（確認） <span class="required">*</span></label>
                <div class="input-wrapper">
                    <input type="password" id="confirmPassword">
                    <span class="validation-icon" id="confirmIcon"></span>
                </div>
                <div class="error-message" id="confirmError"></div>
            </div>

            <div class="checkbox-group">
                <input type="checkbox" id="terms">
                <label for="terms">利用規約に同意する <span class="required">*</span></label>
            </div>

            <button type="submit" class="submit-button" id="submitButton" disabled>
                登録する
            </button>
        </form>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

#### JavaScript

```javascript
let registerForm = document.getElementById("registerForm");
let usernameInput = document.getElementById("username");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let confirmPasswordInput = document.getElementById("confirmPassword");
let termsCheckbox = document.getElementById("terms");
let submitButton = document.getElementById("submitButton");
let successMessage = document.getElementById("successMessage");

// バリデーション状態
let validation = {
  username: false,
  email: false,
  password: false,
  confirmPassword: false,
  terms: false
};

// ユーザー名のバリデーション関数
function validateUsername(username) {
  let pattern = /^[a-zA-Z0-9]{3,20}$/;
  return pattern.test(username);
}

// メールアドレスのバリデーション関数
function validateEmail(email) {
  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// パスワード強度を計算する関数
function calculatePasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 25;
  if (/[a-z]/.test(password)) strength += 15;
  if (/[A-Z]/.test(password)) strength += 15;
  if (/[0-9]/.test(password)) strength += 10;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 10;

  return strength;
}

// パスワードのバリデーション関数
function validatePassword(password) {
  if (password.length < 8) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  return true;
}

// エラー表示関数
function showError(input, iconElement, errorElement, message) {
  input.classList.add("invalid");
  input.classList.remove("valid");
  iconElement.textContent = "✗";
  iconElement.style.color = "#f44336";
  iconElement.classList.add("show");
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

// 成功表示関数
function showSuccess(input, iconElement, errorElement) {
  input.classList.add("valid");
  input.classList.remove("invalid");
  iconElement.textContent = "✓";
  iconElement.style.color = "#4CAF50";
  iconElement.classList.add("show");
  errorElement.classList.remove("show");
}

// ヒントクリア関数
function clearHint(hintElement) {
  hintElement.classList.remove("show");
}

// 送信ボタンの状態を更新
function updateSubmitButton() {
  let allValid = validation.username &&
                 validation.email &&
                 validation.password &&
                 validation.confirmPassword &&
                 validation.terms;

  submitButton.disabled = !allValid;
}

// ユーザー名のイベント
usernameInput.addEventListener("focus", function() {
  document.getElementById("usernameHint").classList.add("show");
});

usernameInput.addEventListener("blur", function() {
  clearHint(document.getElementById("usernameHint"));

  let username = usernameInput.value.trim();

  if (username.length === 0) {
    showError(usernameInput, document.getElementById("usernameIcon"),
              document.getElementById("usernameError"), "ユーザー名を入力してください");
    validation.username = false;
  } else if (!validateUsername(username)) {
    showError(usernameInput, document.getElementById("usernameIcon"),
              document.getElementById("usernameError"), "3〜20文字の英数字で入力してください");
    validation.username = false;
  } else {
    showSuccess(usernameInput, document.getElementById("usernameIcon"),
                document.getElementById("usernameError"));
    validation.username = true;
  }

  updateSubmitButton();
});

// メールアドレスのイベント
emailInput.addEventListener("focus", function() {
  document.getElementById("emailHint").classList.add("show");
});

emailInput.addEventListener("blur", function() {
  clearHint(document.getElementById("emailHint"));

  let email = emailInput.value.trim();

  if (email.length === 0) {
    showError(emailInput, document.getElementById("emailIcon"),
              document.getElementById("emailError"), "メールアドレスを入力してください");
    validation.email = false;
  } else if (!validateEmail(email)) {
    showError(emailInput, document.getElementById("emailIcon"),
              document.getElementById("emailError"), "有効なメールアドレスを入力してください");
    validation.email = false;
  } else {
    showSuccess(emailInput, document.getElementById("emailIcon"),
                document.getElementById("emailError"));
    validation.email = true;
  }

  updateSubmitButton();
});

// パスワードのイベント
passwordInput.addEventListener("focus", function() {
  document.getElementById("passwordHint").classList.add("show");
  document.getElementById("passwordStrength").classList.add("show");
});

passwordInput.addEventListener("blur", function() {
  clearHint(document.getElementById("passwordHint"));
});

passwordInput.addEventListener("input", function() {
  let password = passwordInput.value;
  let strength = calculatePasswordStrength(password);
  let strengthFill = document.getElementById("strengthFill");
  let strengthText = document.getElementById("strengthText");

  // 強度バーを更新
  strengthFill.className = "strength-fill";
  if (strength < 50) {
    strengthFill.classList.add("weak");
    strengthText.textContent = "弱い";
  } else if (strength < 80) {
    strengthFill.classList.add("medium");
    strengthText.textContent = "普通";
  } else {
    strengthFill.classList.add("strong");
    strengthText.textContent = "強い";
  }

  // バリデーション
  if (password.length === 0) {
    validation.password = false;
  } else if (!validatePassword(password)) {
    validation.password = false;
  } else {
    validation.password = true;
  }

  // 確認パスワードも再チェック
  if (confirmPasswordInput.value.length > 0) {
    if (confirmPasswordInput.value === password) {
      showSuccess(confirmPasswordInput, document.getElementById("confirmIcon"),
                  document.getElementById("confirmError"));
      validation.confirmPassword = true;
    } else {
      showError(confirmPasswordInput, document.getElementById("confirmIcon"),
                document.getElementById("confirmError"), "パスワードが一致しません");
      validation.confirmPassword = false;
    }
  }

  updateSubmitButton();
});

// パスワード（確認）のイベント
confirmPasswordInput.addEventListener("input", function() {
  let password = passwordInput.value;
  let confirmPassword = confirmPasswordInput.value;

  if (confirmPassword.length === 0) {
    validation.confirmPassword = false;
  } else if (password !== confirmPassword) {
    showError(confirmPasswordInput, document.getElementById("confirmIcon"),
              document.getElementById("confirmError"), "パスワードが一致しません");
    validation.confirmPassword = false;
  } else {
    showSuccess(confirmPasswordInput, document.getElementById("confirmIcon"),
                document.getElementById("confirmError"));
    validation.confirmPassword = true;
  }

  updateSubmitButton();
});

// 利用規約チェックボックス
termsCheckbox.addEventListener("change", function() {
  validation.terms = termsCheckbox.checked;
  updateSubmitButton();
});

// フォーム送信
registerForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // 最終バリデーション
  if (!validation.username || !validation.email ||
      !validation.password || !validation.confirmPassword ||
      !validation.terms) {
    alert("すべての項目を正しく入力してください");
    return;
  }

  // 送信処理（実際はサーバーに送信）
  console.log("登録情報:");
  console.log("ユーザー名: " + usernameInput.value);
  console.log("メール: " + emailInput.value);
  console.log("パスワード: " + passwordInput.value);

  // 成功メッセージを表示
  successMessage.classList.add("show");
  registerForm.style.display = "none";

  // 3秒後にリセット
  setTimeout(function() {
    successMessage.classList.remove("show");
    registerForm.style.display = "block";
    registerForm.reset();

    // すべてのバリデーションクラスをクリア
    document.querySelectorAll("input").forEach(function(input) {
      input.classList.remove("valid", "invalid");
    });
    document.querySelectorAll(".validation-icon").forEach(function(icon) {
      icon.classList.remove("show");
    });
    document.getElementById("passwordStrength").classList.remove("show");

    // バリデーション状態をリセット
    validation = {
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
      terms: false
    };

    updateSubmitButton();
  }, 3000);
});
```

このアプリケーションでは、以下の機能が実装されています：

1. **リアルタイムバリデーション**: 入力中にパスワード強度を表示
2. **focus/blurでのヒント表示**: フォーカス時にヘルプテキスト表示
3. **視覚的フィードバック**: 成功時は緑、エラー時は赤で表示
4. **動的なボタン制御**: すべてのバリデーションが通るまでボタンを無効化
5. **submit制御**: event.preventDefault()で送信を制御

---

## 練習問題

次の仕様を満たすプログラムを作成してください。

### 問題1：リアルタイム検索フォーム

**仕様**
1. テキスト入力欄を作成する
2. 入力中（inputイベント）に入力内容を表示する
3. 3文字以上入力されたら「検索中...」と表示する
4. フォーカスが外れたら「検索完了」と表示する
5. 入力欄が空の場合は何も表示しない

**ヒント - レベル1（大きなヒント）**
- inputイベントで入力内容をリアルタイムに検出します
- value.lengthで文字数をチェックします
- blurイベントでフォーカスが外れたことを検出します

**ヒント - レベル2（中くらいのヒント）**
```javascript
let searchInput = document.getElementById("search");
let result = document.getElementById("result");

searchInput.addEventListener("input", function() {
  let query = searchInput.value;

  if (query.length === 0) {
    result.textContent = "";
  } else if (query.length >= 3) {
    result.textContent = "検索中...";
  } else {
    result.textContent = "入力中: " + query;
  }
});

searchInput.addEventListener("blur", function() {
  if (searchInput.value.length >= 3) {
    result.textContent = "検索完了";
  }
});
```

**ヒント - レベル3（小さなヒント）**
- `element.value`で入力内容を取得
- `element.textContent`で表示内容を設定
- if文で条件分岐

### 問題2：パスワード確認フォーム

**仕様**
1. 2つのパスワード入力欄を作成する
2. 2つ目の入力欄で入力中（inputイベント）に、1つ目と一致するかチェックする
3. 一致する場合は「パスワードが一致しています」と緑色で表示する
4. 一致しない場合は「パスワードが一致しません」と赤色で表示する
5. フォーム送信時に最終チェックを行う

**ヒント - レベル1（大きなヒント）**
- 2つのinput要素を用意します
- 2つ目のinput要素のinputイベントで比較します
- submitイベントでpreventDefault()を呼びます

**ヒント - レベル2（中くらいのヒント）**
```javascript
let password1 = document.getElementById("password1");
let password2 = document.getElementById("password2");
let message = document.getElementById("message");
let form = document.getElementById("form");

password2.addEventListener("input", function() {
  if (password1.value === password2.value) {
    message.textContent = "パスワードが一致しています";
    message.style.color = "green";
  } else {
    message.textContent = "パスワードが一致しません";
    message.style.color = "red";
  }
});

form.addEventListener("submit", function(event) {
  event.preventDefault();

  if (password1.value === password2.value) {
    alert("登録完了");
  } else {
    alert("パスワードが一致しません");
  }
});
```

**ヒント - レベル3（小さなヒント）**
- `===`で文字列を比較
- `style.color`で色を変更
- `event.preventDefault()`でフォーム送信を防ぐ

### 問題3：文字数制限付きテキストエリア

**仕様**
1. textareaを作成する（最大100文字）
2. 入力中（inputイベント）に残り文字数を表示する
3. 100文字を超えたら赤色で表示する
4. フォーカス時にヒントを表示する
5. フォーカスが外れたらヒントを非表示にする

**ヒント - レベル1（大きなヒント）**
- textareaのinputイベントで文字数をカウントします
- focusイベントとblurイベントでヒントの表示/非表示を切り替えます
- 文字数に応じて色を変更します

**ヒント - レベル2（中くらいのヒント）**
```javascript
let textarea = document.getElementById("textarea");
let counter = document.getElementById("counter");
let hint = document.getElementById("hint");
const MAX = 100;

textarea.addEventListener("input", function() {
  let length = textarea.value.length;
  let remaining = MAX - length;

  counter.textContent = "残り " + remaining + " 文字";

  if (remaining < 0) {
    counter.style.color = "red";
  } else {
    counter.style.color = "black";
  }
});

textarea.addEventListener("focus", function() {
  hint.style.display = "block";
});

textarea.addEventListener("blur", function() {
  hint.style.display = "none";
});
```

**ヒント - レベル3（小さなヒント）**
- `value.length`で文字数を取得
- 引き算で残り文字数を計算
- `style.display`で表示/非表示を切り替え

---

## まとめ

このレッスンでは、フォームイベントについて学びました。

### 学んだこと

1. **focus/blurイベント**
   - focusは入力欄が選択されたときに発生
   - blurは入力欄の選択が解除されたときに発生
   - ヒントの表示やバリデーションに使用

2. **input/changeイベント**
   - inputは入力内容が変更されるたびに即座に発生
   - changeは値が変更されてフォーカスが外れたときに発生
   - リアルタイム処理にはinput、完了時の処理にはchange

3. **submitイベント**
   - フォームが送信されるときに発生
   - event.preventDefault()で送信をキャンセル
   - バリデーションや独自の送信処理に使用

4. **フォームバリデーション**
   - リアルタイムバリデーションでUXを向上
   - エラーメッセージの適切な表示タイミング
   - 視覚的フィードバックの重要性

5. **実用的なパターン**
   - パスワード強度の表示
   - 文字数カウント
   - メールアドレスの形式チェック
   - 動的なボタン制御

### フォームイベントが重要な理由

1. **ユーザー体験の向上**: リアルタイムフィードバックで使いやすいフォームを作成
2. **データの整合性**: 不正なデータの送信を防ぐ
3. **サーバー負荷の削減**: クライアント側で事前にチェック
4. **アクセシビリティ**: 適切なフィードバックで誰でも使いやすく

### 次のステップ

フォームイベントを習得したことで、ユーザーフレンドリーなフォームを作れるようになりました。次のレッスンでは、eventオブジェクトについて学び、イベントに関する詳細な情報を取得する方法を学んでいきます。

フォームイベントは、ウェブアプリケーションの基礎となる重要な技術です。様々なフォームで活用して、使いやすいユーザーインターフェースを作成しましょう！
