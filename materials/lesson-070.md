# レッスン70：preventDefault

## このレッスンで学ぶこと

このレッスンでは、`event.preventDefault()`メソッドについて詳しく学びます。このメソッドを使うことで、ブラウザのデフォルト動作をキャンセルし、独自の動作を実装できるようになります。

## デフォルト動作とは

ブラウザには、特定の要素やイベントに対して、あらかじめ決められた動作があります。これをデフォルト動作と呼びます。

### 主なデフォルト動作の例

**リンク（a要素）のクリック**
- クリックすると、href属性で指定されたURLに移動します

**フォームの送信**
- 送信ボタンをクリックすると、フォームが送信されてページがリロードされます

**チェックボックスのクリック**
- クリックすると、チェック状態が切り替わります

**テキスト選択**
- ドラッグすると、テキストが選択されます

**右クリック**
- 右クリックすると、コンテキストメニューが表示されます

## preventDefault()とは

`event.preventDefault()`は、イベントのデフォルト動作をキャンセルするメソッドです。

### 基本的な使い方

```javascript
element.addEventListener("click", function(event) {
  event.preventDefault(); // デフォルト動作をキャンセル
  // ここに独自の処理を書く
});
```

`event.preventDefault()`を呼び出すと、そのイベントのデフォルト動作が実行されなくなります。

## リンクのキャンセル

リンクをクリックしたときのページ遷移をキャンセルする例を見てみましょう。

### 基本例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>リンクのキャンセル</title>
</head>
<body>
    <h1>リンククリックの制御</h1>
    <a href="https://example.com" id="link1">通常のリンク</a><br>
    <a href="https://example.com" id="link2">キャンセルされるリンク</a>
    <p id="message"></p>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let link2 = document.getElementById("link2");
let message = document.getElementById("message");

link2.addEventListener("click", function(event) {
  event.preventDefault(); // ページ遷移をキャンセル
  message.textContent = "リンクがクリックされましたが、ページ遷移はキャンセルされました";
});
```

このプログラムでは、link2をクリックしても、ページは移動しません。代わりに、メッセージが表示されます。

### 実用例：確認ダイアログ

リンクをクリックしたときに、確認ダイアログを表示する例です。

```javascript
let dangerousLink = document.getElementById("dangerousLink");

dangerousLink.addEventListener("click", function(event) {
  event.preventDefault();

  let confirmed = confirm("本当に移動しますか");
  if (confirmed) {
    window.location.href = dangerousLink.href; // 手動で移動
  }
});
```

### タブ切り替えの実装

リンクのデフォルト動作をキャンセルして、タブ切り替えを実装できます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>タブ切り替え</title>
    <style>
        .tab {
            display: inline-block;
            padding: 10px 20px;
            background-color: #ddd;
            cursor: pointer;
            text-decoration: none;
            color: black;
        }
        .tab.active {
            background-color: #4CAF50;
            color: white;
        }
        .content {
            display: none;
            padding: 20px;
            border: 1px solid #ddd;
        }
        .content.active {
            display: block;
        }
    </style>
</head>
<body>
    <h1>タブ切り替え</h1>
    <div>
        <a href="#tab1" class="tab active" data-tab="tab1">タブ1</a>
        <a href="#tab2" class="tab" data-tab="tab2">タブ2</a>
        <a href="#tab3" class="tab" data-tab="tab3">タブ3</a>
    </div>

    <div id="tab1" class="content active">タブ1の内容</div>
    <div id="tab2" class="content">タブ2の内容</div>
    <div id="tab3" class="content">タブ3の内容</div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let tabs = document.querySelectorAll(".tab");
let contents = document.querySelectorAll(".content");

tabs.forEach(function(tab) {
  tab.addEventListener("click", function(event) {
    event.preventDefault(); // リンクのデフォルト動作をキャンセル

    // すべてのタブとコンテンツからactiveクラスを削除
    tabs.forEach(function(t) {
      t.classList.remove("active");
    });
    contents.forEach(function(c) {
      c.classList.remove("active");
    });

    // クリックされたタブと対応するコンテンツにactiveクラスを追加
    tab.classList.add("active");
    let targetId = tab.dataset.tab;
    document.getElementById(targetId).classList.add("active");
  });
});
```

## フォーム送信の制御

フォームの送信をキャンセルして、JavaScriptで独自の処理を行うことができます。

### 基本例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>フォーム送信の制御</title>
</head>
<body>
    <h1>フォーム送信の制御</h1>
    <form id="myForm">
        <label>名前:</label><br>
        <input type="text" id="nameInput"><br>
        <button type="submit">送信</button>
    </form>
    <p id="result"></p>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let myForm = document.getElementById("myForm");
let result = document.getElementById("result");

myForm.addEventListener("submit", function(event) {
  event.preventDefault(); // フォーム送信をキャンセル

  let name = document.getElementById("nameInput").value;
  result.textContent = name + "さん、送信されました（ページはリロードされません）";
});
```

`event.preventDefault()`を呼び出さないと、フォームが送信されてページがリロードされてしまいます。

### 実用例：バリデーション付きフォーム

送信前にバリデーションを行う例です。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>バリデーション</title>
    <style>
        .error {
            color: red;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <h1>ユーザー登録フォーム</h1>
    <form id="registerForm">
        <label>ユーザー名（4文字以上）:</label><br>
        <input type="text" id="username"><br>
        <span id="usernameError" class="error"></span><br>

        <label>メールアドレス:</label><br>
        <input type="text" id="email"><br>
        <span id="emailError" class="error"></span><br>

        <button type="submit">登録</button>
    </form>
    <p id="result"></p>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let registerForm = document.getElementById("registerForm");
let usernameError = document.getElementById("usernameError");
let emailError = document.getElementById("emailError");
let result = document.getElementById("result");

registerForm.addEventListener("submit", function(event) {
  event.preventDefault(); // まずフォーム送信をキャンセル

  // エラーメッセージをクリア
  usernameError.textContent = "";
  emailError.textContent = "";
  result.textContent = "";

  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let isValid = true;

  // バリデーションチェック
  if (username.length < 4) {
    usernameError.textContent = "ユーザー名は4文字以上で入力してください";
    isValid = false;
  }

  if (!email.includes("@")) {
    emailError.textContent = "正しいメールアドレスを入力してください";
    isValid = false;
  }

  // バリデーションをクリアした場合
  if (isValid) {
    result.textContent = "登録が完了しました";
    result.style.color = "green";
  }
});
```

### Ajax送信の実装

`preventDefault()`を使って、ページをリロードせずにフォームデータを送信できます。

```javascript
let form = document.getElementById("contactForm");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  let formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  console.log("送信データ:", formData);
  // ここで通常はfetch()などでサーバーに送信する
  // fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

  alert("送信しました（実際のサーバー送信はしていません）");
});
```

## その他のデフォルト動作のキャンセル

### 右クリックメニューのキャンセル

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>右クリックメニュー</title>
</head>
<body>
    <h1>右クリックメニューの制御</h1>
    <div id="noContextMenu" style="width: 300px; height: 200px; background-color: lightblue; padding: 20px;">
        この領域では右クリックメニューが表示されません
    </div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let noContextMenu = document.getElementById("noContextMenu");

noContextMenu.addEventListener("contextmenu", function(event) {
  event.preventDefault(); // 右クリックメニューをキャンセル
  alert("右クリックメニューは無効です");
});
```

### ドラッグ&ドロップのキャンセル

```javascript
let image = document.getElementById("myImage");

image.addEventListener("dragstart", function(event) {
  event.preventDefault(); // ドラッグをキャンセル
});
```

### キーボード入力の制御

特定のキーの入力をキャンセルすることもできます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>キー入力制御</title>
</head>
<body>
    <h1>数字のみ入力可能</h1>
    <input type="text" id="numberOnly" placeholder="数字のみ">

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let numberOnly = document.getElementById("numberOnly");

numberOnly.addEventListener("keydown", function(event) {
  let allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

  if (!allowedKeys.includes(event.key)) {
    event.preventDefault(); // 数字以外の入力をキャンセル
  }
});
```

## デフォルト動作を確認する

`event.defaultPrevented`プロパティを使うと、デフォルト動作がキャンセルされているかどうかを確認できます。

```javascript
element.addEventListener("click", function(event) {
  event.preventDefault();
  console.log(event.defaultPrevented); // true
});
```

## preventDefault()とreturn false

jQueryなどでは`return false`を使うことがありますが、素のJavaScriptでは`event.preventDefault()`を使うのが推奨されます。

### 非推奨な方法

```javascript
// あまり推奨されない
element.addEventListener("click", function(event) {
  return false; // これは効果がない
});
```

### 推奨される方法

```javascript
// 推奨される
element.addEventListener("click", function(event) {
  event.preventDefault();
});
```

## 実践例：動作制御ツール

さまざまなデフォルト動作を制御できるツールを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>動作制御ツール</title>
    <style>
        .section {
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #ddd;
            background-color: #f9f9f9;
        }
        .control {
            margin: 10px 0;
        }
        label {
            display: inline-block;
            width: 200px;
        }
        #protectedArea {
            width: 300px;
            height: 150px;
            background-color: lightcoral;
            padding: 20px;
            margin: 10px 0;
        }
        .result {
            margin-top: 10px;
            padding: 10px;
            background-color: #e0e0e0;
            min-height: 30px;
        }
    </style>
</head>
<body>
    <h1>動作制御ツール</h1>

    <div class="section">
        <h2>1. リンクの制御</h2>
        <div class="control">
            <label>
                <input type="checkbox" id="preventLink">
                リンククリックを無効化
            </label>
        </div>
        <a href="https://example.com" id="testLink">テストリンク</a>
        <div class="result" id="linkResult"></div>
    </div>

    <div class="section">
        <h2>2. フォームの制御</h2>
        <div class="control">
            <label>
                <input type="checkbox" id="preventSubmit" checked>
                フォーム送信を無効化
            </label>
        </div>
        <form id="testForm">
            <input type="text" id="formInput" placeholder="テキストを入力">
            <button type="submit">送信</button>
        </form>
        <div class="result" id="formResult"></div>
    </div>

    <div class="section">
        <h2>3. 右クリックメニューの制御</h2>
        <div class="control">
            <label>
                <input type="checkbox" id="preventContextMenu">
                右クリックメニューを無効化
            </label>
        </div>
        <div id="protectedArea">
            この領域で右クリックしてみてください
        </div>
        <div class="result" id="contextResult"></div>
    </div>

    <div class="section">
        <h2>4. テキスト選択の制御</h2>
        <div class="control">
            <label>
                <input type="checkbox" id="preventSelection">
                テキスト選択を無効化
            </label>
        </div>
        <p id="selectableText">このテキストを選択してみてください。チェックボックスをオンにすると選択できなくなります。</p>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let preventLink = document.getElementById("preventLink");
let testLink = document.getElementById("testLink");
let linkResult = document.getElementById("linkResult");

let preventSubmit = document.getElementById("preventSubmit");
let testForm = document.getElementById("testForm");
let formResult = document.getElementById("formResult");

let preventContextMenu = document.getElementById("preventContextMenu");
let protectedArea = document.getElementById("protectedArea");
let contextResult = document.getElementById("contextResult");

let preventSelection = document.getElementById("preventSelection");
let selectableText = document.getElementById("selectableText");

// 1. リンクの制御
testLink.addEventListener("click", function(event) {
  if (preventLink.checked) {
    event.preventDefault();
    linkResult.textContent = "リンククリックがキャンセルされました";
  } else {
    linkResult.textContent = "リンクが機能します（実際には移動します）";
  }
});

// 2. フォームの制御
testForm.addEventListener("submit", function(event) {
  if (preventSubmit.checked) {
    event.preventDefault();
    let inputValue = document.getElementById("formInput").value;
    formResult.textContent = "送信がキャンセルされました。入力値: " + inputValue;
  } else {
    formResult.textContent = "フォームが送信されます（ページがリロードされます）";
  }
});

// 3. 右クリックメニューの制御
protectedArea.addEventListener("contextmenu", function(event) {
  if (preventContextMenu.checked) {
    event.preventDefault();
    contextResult.textContent = "右クリックメニューがキャンセルされました";
  }
});

// 4. テキスト選択の制御
selectableText.addEventListener("selectstart", function(event) {
  if (preventSelection.checked) {
    event.preventDefault();
  }
});
```

このツールでは、チェックボックスをオン・オフすることで、さまざまなデフォルト動作を制御できます。

## よくあるパターン

### パターン1：条件付きキャンセル

```javascript
form.addEventListener("submit", function(event) {
  event.preventDefault(); // 常にキャンセル

  if (isValid()) {
    // バリデーションOKなら手動で送信
    form.submit();
  }
});
```

### パターン2：カスタム確認ダイアログ

```javascript
deleteButton.addEventListener("click", function(event) {
  event.preventDefault();

  if (confirm("本当に削除しますか")) {
    // 削除処理を実行
    performDelete();
  }
});
```

### パターン3：Enter キーでのフォーム送信を防ぐ

```javascript
input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Enterキーでのフォーム送信を防ぐ
  }
});
```

## 注意点

### 1. preventDefault()のタイミング

`preventDefault()`は、イベントリスナー関数の中で呼び出す必要があります。通常は関数の最初に呼び出します。

```javascript
// 正しい
element.addEventListener("click", function(event) {
  event.preventDefault();
  // 処理
});

// 間違い（遅すぎる）
element.addEventListener("click", function(event) {
  // 処理
  event.preventDefault(); // これでも動作するが、最初に呼ぶのが推奨
});
```

### 2. すべてのイベントでキャンセルできるわけではない

一部のイベントは、`preventDefault()`でキャンセルできません。キャンセル可能かどうかは、`event.cancelable`プロパティで確認できます。

```javascript
element.addEventListener("click", function(event) {
  if (event.cancelable) {
    event.preventDefault();
  }
});
```

### 3. ユーザビリティへの配慮

デフォルト動作をキャンセルすると、ユーザーが期待する動作と異なる場合があります。必要な場合にのみ使用し、代替の動作を提供しましょう。

```javascript
// 悪い例：理由なく右クリックを無効化
document.addEventListener("contextmenu", function(event) {
  event.preventDefault(); // ユーザーの利便性を損なう
});
```

## preventDefault()を使わない場合

デフォルト動作をそのまま使いたい場合は、`preventDefault()`を呼び出さなければOKです。

```javascript
link.addEventListener("click", function(event) {
  // preventDefault()を呼ばないので、リンクは通常通り動作する
  console.log("リンクがクリックされました");
});
```

## 練習問題

次の仕様を満たすプログラムを作成してください。

### 仕様

1. HTMLに以下の要素を作成する
   - `id="myForm"`のform要素
   - その中に`id="urlInput"`のinput要素（type="text"）
   - その中に`type="submit"`のbutton要素（テキスト: 送信）
   - `id="result"`のp要素

2. JavaScriptで以下の機能を実装する
   - フォーム送信時、デフォルト動作（ページリロード）をキャンセルする
   - 入力されたURLが"http"または"https"で始まっているかチェックする
   - 正しい形式の場合、`result`に「正しいURLです: 〇〇」と表示する
   - 正しくない場合、`result`に「URLはhttpまたはhttpsで始まる必要があります」と表示する（赤色）

### ヒント

- `event.preventDefault()`でフォーム送信をキャンセルします
- `value.startsWith("http")`でURLの開始文字列をチェックできます
- `||`（OR演算子）で複数の条件をチェックできます

## まとめ

このレッスンでは、以下のことを学びました。

1. デフォルト動作の概念（リンク、フォーム、右クリックなど）
2. `event.preventDefault()`でデフォルト動作をキャンセルする方法
3. リンクのキャンセルとカスタム動作の実装
4. フォーム送信の制御とバリデーション
5. その他のデフォルト動作のキャンセル（右クリック、ドラッグ、キー入力など）
6. 実践的な動作制御ツールの作成

`preventDefault()`を使うことで、ブラウザのデフォルト動作を制御し、より高度なWebアプリケーションを作成できるようになりました。次のレッスンでは、さらに実践的なJavaScriptの技術について学んでいきます。
