# レッスン42: バリデーション基礎

## なぜ重要なのか

バリデーション（入力検証）は、ユーザーの入力ミスを防ぎ、アプリケーションの信頼性を高めるために不可欠です。以下は、実際のサービスで使われているバリデーションの例です。

| サービス | バリデーションの例 | バリデーションがないとどうなるか |
|---------|-----------------|------------------------|
| Twitter | ツイートは280文字まで | 長すぎる投稿でシステムがパンクする |
| Gmail | パスワードは8文字以上 | 簡単なパスワードで不正アクセスされる |
| Amazon | 住所の入力必須チェック | 配送先が不明で商品が届かない |
| Instagram | ユーザー名は30文字まで | データベースのエラーが発生する |
| Facebook | メールアドレスに@が必須 | 無効なアドレスで通知が届かない |

すべてのWebアプリケーションは、ユーザー入力をバリデーションすることで、データの整合性を保ち、良いユーザー体験を提供しています。

## 基本概念の説明

### バリデーションとは

**バリデーション（Validation）**とは、ユーザーが入力した値が適切かどうかをチェックすることです。

```
【バリデーションなし】
ユーザー入力 → そのまま処理 → エラー発生 💥

例：
名前: ""（空） → "こんにちは、さん" （変な表示）
年齢: "abc" → NaN → 計算エラー
```

```
【バリデーションあり】
ユーザー入力 → チェック → ❌NG → エラーメッセージ
                ↓
              ✅OK
                ↓
              正常処理 → 結果表示
```

### バリデーションの種類

| バリデーション | 目的 | 例 |
|------------|------|-----|
| 空文字チェック | 必須項目が入力されているか | `name === ""` |
| 長さチェック | 文字数が適切か | `password.length >= 8` |
| 形式チェック | データの形式が正しいか | メールに@が含まれるか |
| 範囲チェック | 数値が範囲内か | `age >= 0 && age <= 150` |
| 型チェック | データの型が正しいか | `isNaN(num)` |

このレッスンでは、**空文字チェック**と**長さチェック**を中心に学びます。

### lengthプロパティ

**length**プロパティは、文字列の長さ（文字数）を取得できます。

```javascript
const text = "こんにちは";
console.log(text.length);  // 5

const empty = "";
console.log(empty.length);  // 0

const name = "山田太郎";
console.log(name.length);  // 4
```

| 文字列 | length | 説明 |
|--------|--------|------|
| "abc" | 3 | 半角英字3文字 |
| "あいう" | 3 | 全角ひらがな3文字 |
| "123" | 3 | 半角数字3文字 |
| "" | 0 | 空文字列 |
| " " | 1 | 空白1文字 |
| "hello world" | 11 | 空白も1文字としてカウント |

**重要**：lengthは**文字数**をカウントします（バイト数ではありません）。

## 動作の流れ

### 空文字チェックの流れ

```
【ステップ1】ボタンクリック
   ↓
【ステップ2】input.valueで値を取得
   ↓
【ステップ3】空文字チェック（=== ""）
   ↓
   ├─→ 空文字？ ─→ YES → エラーメッセージ表示
   │                    "名前を入力してください"
   │
   └─→ NO → 正常メッセージ表示
              "入力されました"
```

### 長さチェックの流れ

```
【ステップ1】input.valueで値を取得
   ↓
【ステップ2】.lengthで文字数を取得
   ↓
【ステップ3】文字数を条件でチェック
   ↓
   ├─→ 3文字未満？ ─→ YES → "3文字以上入力してください"
   │
   ├─→ 10文字超過？ ─→ YES → "10文字以内で入力してください"
   │
   └─→ どちらもNO → "OK"
```

### 複合バリデーションの流れ

```
【ステップ1】値を取得
   ↓
【ステップ2】空文字チェック
   ↓
   └─→ 空文字？ ─→ YES → "入力してください" → 終了
        ↓ NO
【ステップ3】最小文字数チェック
   ↓
   └─→ 短すぎる？ ─→ YES → "〇文字以上" → 終了
        ↓ NO
【ステップ4】最大文字数チェック
   ↓
   └─→ 長すぎる？ ─→ YES → "〇文字以内" → 終了
        ↓ NO
【ステップ5】正常
   ↓
   "OK" → 次の処理
```

## 詳細解説

### 1. 空文字チェック

**空文字チェック**は、最も基本的なバリデーションです。

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

**重要なポイント**：
- `=== ""`で厳密に空文字列をチェック
- `== ""`ではなく`=== ""`を使う（厳密等価演算子）
- 空白だけの入力（" "）は空文字列ではない

```javascript
// 空文字チェックの例
"" === ""        // true  ← 空文字列
" " === ""       // false ← 空白1文字
"   " === ""     // false ← 空白3文字
"a" === ""       // false ← 文字あり
```

### 2. lengthプロパティの使い方

```javascript
const text = "こんにちは";
console.log(text.length);  // 5
```

**lengthの特徴**：
- プロパティなので`()`は不要（関数ではない）
- ✅ `text.length` （正しい）
- ❌ `text.length()` （間違い）

```javascript
// lengthは関数ではない
const name = "太郎";
console.log(name.length);    // ✅ 2
console.log(name.length());  // ❌ エラー: length is not a function
```

### 3. 最小文字数のチェック

```javascript
function checkMinLength() {
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

**条件の読み方**：
- `name.length >= 3` → 「文字数が3以上」
- `name.length < 3` → 「文字数が3未満」

| 入力 | length | >= 3 | 結果 |
|------|--------|------|------|
| "太" | 1 | false | "3文字以上入力してください" |
| "太郎" | 2 | false | "3文字以上入力してください" |
| "太郎さん" | 4 | true | "OK" |
| "" | 0 | false | "3文字以上入力してください" |

### 4. 最大文字数のチェック

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

**条件の読み方**：
- `name.length <= 10` → 「文字数が10以下」
- `name.length > 10` → 「文字数が10より大きい」

### 5. 複数条件の組み合わせ

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

**チェックの順序**：
1. 空文字チェック（最優先）
2. 最小文字数チェック
3. 最大文字数チェック
4. 正常（すべてOK）

**なぜこの順序か**：
- 空文字の場合、`length`は0なので、最小文字数チェックでも引っかかる
- しかし「名前を入力してください」の方が「3文字以上」より分かりやすい
- より具体的なエラーメッセージを優先する

### 6. フィードバックの表示

**色分けでユーザーに分かりやすく**：

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
    message.textContent = "✓ OK";
    message.style.color = "green";
  }
}
```

**フィードバックの原則**：
- ✅ **成功**：緑色、チェックマーク（✓）
- ❌ **エラー**：赤色、バツマーク（✗）
- ⚠️ **警告**：黄色、注意マーク（⚠）
- 📝 **情報**：青色、アイコン（ℹ）

### 7. リアルタイムバリデーション

**oninputイベント**を使うと、入力中にリアルタイムでチェックできます。

```html
<input id="name" type="text" oninput="validate()">
```

```javascript
function validate() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message");

  if (name === "") {
    message.textContent = "";  // 空の場合はメッセージなし
  } else if (name.length < 3) {
    message.textContent = "あと" + (3 - name.length) + "文字必要です";
  } else {
    message.textContent = "✓ OK";
  }
}
```

**oninput vs onclick**：
- `onclick`：ボタンをクリックしたとき
- `oninput`：入力欄に文字を入力したとき（リアルタイム）

### 8. 文字数カウンター

```javascript
function countCharacters() {
  const text = document.getElementById("text").value;
  const counter = document.getElementById("counter");
  counter.textContent = text.length + " / 100文字";
}
```

**Twitterのような文字数表示**：
```javascript
function twitterCounter() {
  const text = document.getElementById("text").value;
  const counter = document.getElementById("counter");
  const maxLength = 280;
  const remaining = maxLength - text.length;

  counter.textContent = remaining + " 文字";

  if (remaining < 0) {
    counter.style.color = "red";  // 超過したら赤
  } else if (remaining < 20) {
    counter.style.color = "orange";  // 残り少ないなら黄色
  } else {
    counter.style.color = "black";  // 通常は黒
  }
}
```

## よくある間違い

### ❌ 間違い1: lengthに()をつける

```javascript
// ❌ 間違い
function check() {
  const name = document.getElementById("name").value;
  console.log(name.length());  // エラー
}
```

```javascript
// ✅ 正しい
function check() {
  const name = document.getElementById("name").value;
  console.log(name.length);  // lengthはプロパティ
}
```

**エラーメッセージ**：`TypeError: name.length is not a function`

### ❌ 間違い2: 空文字チェックを忘れる

```javascript
// ❌ 間違い
function validate() {
  const name = document.getElementById("name").value;

  if (name.length >= 3) {
    console.log("OK");
  } else {
    console.log("3文字以上");
  }
  // 空文字も"3文字以上"になる
}
```

```javascript
// ✅ 正しい
function validate() {
  const name = document.getElementById("name").value;

  if (name === "") {
    console.log("入力してください");
  } else if (name.length >= 3) {
    console.log("OK");
  } else {
    console.log("3文字以上");
  }
}
```

**理由**：空文字列のlengthは0なので、`>= 3`はfalseになり、elseに入ってしまう

### ❌ 間違い3: チェック順序が逆

```javascript
// ❌ 間違い
function validate() {
  const name = document.getElementById("name").value;

  if (name.length < 3) {
    console.log("3文字以上");
  } else if (name === "") {
    console.log("入力してください");  // 到達しない
  }
}
```

```javascript
// ✅ 正しい
function validate() {
  const name = document.getElementById("name").value;

  if (name === "") {
    console.log("入力してください");
  } else if (name.length < 3) {
    console.log("3文字以上");
  }
}
```

**理由**：空文字列のlengthは0なので、最初の条件（`< 3`）でtrueになり、2番目の条件に到達しない

### ❌ 間違い4: ==を使う

```javascript
// ❌ 間違い
function check() {
  const name = document.getElementById("name").value;

  if (name == "") {  // ==を使用
    console.log("空");
  }
}
```

```javascript
// ✅ 正しい
function check() {
  const name = document.getElementById("name").value;

  if (name === "") {  // ===を使用
    console.log("空");
  }
}
```

**理由**：`==`は型変換を行うので、意図しない動作をする可能性がある。常に`===`を使う。

### ❌ 間違い5: フィードバックをクリアしない

```javascript
// ❌ 間違い
function validate() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message");

  if (name === "") {
    message.textContent = "入力してください";
    message.style.color = "red";
  } else if (name.length >= 3) {
    message.textContent = "OK";
    // 色をクリアしていない
  }
}
```

```javascript
// ✅ 正しい
function validate() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message");

  if (name === "") {
    message.textContent = "入力してください";
    message.style.color = "red";
  } else if (name.length >= 3) {
    message.textContent = "OK";
    message.style.color = "green";  // 色を変更
  }
}
```

**問題**：前回のエラーの赤色が残ったまま、「OK」が赤色で表示される

### ❌ 間違い6: 条件の境界を間違える

```javascript
// ❌ 間違い
function validate() {
  const password = document.getElementById("password").value;

  // 8文字以上が必要なのに、> 8（8文字より大きい）にしている
  if (password.length > 8) {
    console.log("OK");
  } else {
    console.log("8文字以上");
  }
  // "12345678"（8文字）が"8文字以上"になる
}
```

```javascript
// ✅ 正しい
function validate() {
  const password = document.getElementById("password").value;

  if (password.length >= 8) {  // 8以上
    console.log("OK");
  } else {
    console.log("8文字以上");
  }
}
```

**境界値の確認**：
- 「8文字以上」→ `>= 8`
- 「8文字より大きい」→ `> 8`
- 「8文字以下」→ `<= 8`
- 「8文字未満」→ `< 8`

## 実用例

### 実用例1: 名前の入力検証

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>名前の入力検証</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }
    .form-group {
      margin: 20px 0;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input {
      padding: 10px;
      font-size: 16px;
      width: 100%;
      box-sizing: border-box;
      border: 2px solid #ddd;
      border-radius: 5px;
    }
    button {
      padding: 10px 30px;
      font-size: 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }
    .message {
      margin-top: 10px;
      padding: 10px;
      border-radius: 5px;
      font-weight: bold;
    }
    .error {
      background-color: #ffebee;
      color: #c62828;
    }
    .success {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
  </style>
</head>
<body>
  <h1>名前の入力検証</h1>

  <div class="form-group">
    <label>名前（3〜10文字）:</label>
    <input id="name" type="text" placeholder="山田太郎">
  </div>

  <button onclick="validate()">検証</button>

  <div id="message" class="message"></div>

  <script>
    function validate() {
      const name = document.getElementById("name").value;
      const message = document.getElementById("message");

      // クラスをリセット
      message.className = "message";

      if (name === "") {
        message.textContent = "❌ 名前を入力してください";
        message.classList.add("error");
      } else if (name.length < 3) {
        message.textContent = "❌ 3文字以上入力してください（現在" + name.length + "文字）";
        message.classList.add("error");
      } else if (name.length > 10) {
        message.textContent = "❌ 10文字以内で入力してください（現在" + name.length + "文字）";
        message.classList.add("error");
      } else {
        message.textContent = "✅ OK：正しく入力されました";
        message.classList.add("success");
      }
    }
  </script>
</body>
</html>
```

**動作**：
- 空 → "名前を入力してください"
- "太" → "3文字以上入力してください（現在1文字）"
- "太郎" → "3文字以上入力してください（現在2文字）"
- "太郎さん" → "OK：正しく入力されました"
- "あいうえおかきくけこさ" → "10文字以内で入力してください（現在12文字）"

### 実用例2: パスワード強度チェック

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>パスワード強度チェック</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }
    .form-group {
      margin: 20px 0;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input {
      padding: 10px;
      font-size: 16px;
      width: 100%;
      box-sizing: border-box;
      border: 2px solid #ddd;
      border-radius: 5px;
    }
    .strength {
      margin-top: 10px;
      padding: 10px;
      border-radius: 5px;
      font-weight: bold;
    }
    .weak { background-color: #ffebee; color: #c62828; }
    .medium { background-color: #fff3e0; color: #e65100; }
    .strong { background-color: #e8f5e9; color: #2e7d32; }
  </style>
</head>
<body>
  <h1>パスワード強度チェック</h1>

  <div class="form-group">
    <label>パスワード:</label>
    <input id="password" type="password" oninput="checkStrength()">
  </div>

  <div id="strength" class="strength"></div>

  <script>
    function checkStrength() {
      const password = document.getElementById("password").value;
      const strength = document.getElementById("strength");

      // クラスをリセット
      strength.className = "strength";

      if (password === "") {
        strength.textContent = "";
      } else if (password.length < 6) {
        strength.textContent = "❌ 弱い：6文字以上にしてください（現在" + password.length + "文字）";
        strength.classList.add("weak");
      } else if (password.length < 8) {
        strength.textContent = "⚠️ 普通：8文字以上を推奨（現在" + password.length + "文字）";
        strength.classList.add("medium");
      } else {
        strength.textContent = "✅ 強い：安全なパスワードです（" + password.length + "文字）";
        strength.classList.add("strong");
      }
    }
  </script>
</body>
</html>
```

**動作**：
- 空 → メッセージなし
- "abc" → "弱い：6文字以上にしてください（現在3文字）"
- "abcdef" → "普通：8文字以上を推奨（現在6文字）"
- "abcdefgh" → "強い：安全なパスワードです（8文字）"

### 実用例3: リアルタイム文字数カウンター

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>文字数カウンター</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .form-group {
      margin: 20px 0;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    textarea {
      padding: 10px;
      font-size: 16px;
      width: 100%;
      box-sizing: border-box;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-family: sans-serif;
      resize: vertical;
    }
    .counter {
      margin-top: 5px;
      font-size: 14px;
      text-align: right;
    }
    .normal { color: #666; }
    .warning { color: #ff9800; }
    .danger { color: #f44336; }
  </style>
</head>
<body>
  <h1>ツイート作成</h1>

  <div class="form-group">
    <label>ツイート内容（280文字まで）:</label>
    <textarea id="tweet" rows="5" oninput="countCharacters()" placeholder="今何してる？"></textarea>
    <div id="counter" class="counter normal">0 / 280</div>
  </div>

  <script>
    function countCharacters() {
      const tweet = document.getElementById("tweet").value;
      const counter = document.getElementById("counter");
      const maxLength = 280;
      const currentLength = tweet.length;

      // 文字数を表示
      counter.textContent = currentLength + " / " + maxLength;

      // 色を変更
      counter.className = "counter";
      if (currentLength > maxLength) {
        counter.classList.add("danger");
      } else if (currentLength > maxLength - 20) {
        counter.classList.add("warning");
      } else {
        counter.classList.add("normal");
      }
    }
  </script>
</body>
</html>
```

**動作**：
- 入力するたびに文字数がリアルタイムで更新される
- 260文字以下：通常（グレー）
- 261〜280文字：警告（オレンジ）
- 281文字以上：危険（赤）

### 実用例4: フォーム総合検証

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>ユーザー登録フォーム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .form-group {
      margin: 20px 0;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input {
      padding: 10px;
      font-size: 16px;
      width: 100%;
      box-sizing: border-box;
      border: 2px solid #ddd;
      border-radius: 5px;
    }
    .error-message {
      color: #f44336;
      font-size: 14px;
      margin-top: 5px;
    }
    button {
      padding: 12px 40px;
      font-size: 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }
    button:hover {
      background-color: #45a049;
    }
    .result {
      margin-top: 20px;
      padding: 15px;
      border-radius: 5px;
      font-weight: bold;
    }
    .success-result {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
  </style>
</head>
<body>
  <h1>ユーザー登録フォーム</h1>

  <div class="form-group">
    <label>ユーザー名（3〜20文字）:</label>
    <input id="username" type="text">
    <div id="username-error" class="error-message"></div>
  </div>

  <div class="form-group">
    <label>パスワード（8文字以上）:</label>
    <input id="password" type="password">
    <div id="password-error" class="error-message"></div>
  </div>

  <div class="form-group">
    <label>自己紹介（200文字まで）:</label>
    <input id="bio" type="text">
    <div id="bio-error" class="error-message"></div>
  </div>

  <button onclick="submitForm()">登録</button>

  <div id="result"></div>

  <script>
    function submitForm() {
      // エラーメッセージをクリア
      document.getElementById("username-error").textContent = "";
      document.getElementById("password-error").textContent = "";
      document.getElementById("bio-error").textContent = "";
      document.getElementById("result").textContent = "";

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const bio = document.getElementById("bio").value;

      let hasError = false;

      // ユーザー名検証
      if (username === "") {
        document.getElementById("username-error").textContent = "ユーザー名を入力してください";
        hasError = true;
      } else if (username.length < 3) {
        document.getElementById("username-error").textContent = "3文字以上で入力してください";
        hasError = true;
      } else if (username.length > 20) {
        document.getElementById("username-error").textContent = "20文字以内で入力してください";
        hasError = true;
      }

      // パスワード検証
      if (password === "") {
        document.getElementById("password-error").textContent = "パスワードを入力してください";
        hasError = true;
      } else if (password.length < 8) {
        document.getElementById("password-error").textContent = "8文字以上で入力してください";
        hasError = true;
      }

      // 自己紹介検証
      if (bio.length > 200) {
        document.getElementById("bio-error").textContent = "200文字以内で入力してください";
        hasError = true;
      }

      // エラーがあれば終了
      if (hasError) {
        return;
      }

      // 成功
      const result = document.getElementById("result");
      result.textContent = "✅ 登録完了：ユーザー名「" + username + "」で登録しました";
      result.className = "result success-result";
    }
  </script>
</body>
</html>
```

**動作**：
- 各フィールドをバリデーション
- エラーがある場合、該当フィールドの下にエラーメッセージ表示
- すべて正常な場合のみ、登録完了メッセージを表示

## 練習問題

### 問題1: 空文字チェック

input要素から名前を取得し、空文字の場合は「名前を入力してください」、入力されている場合は「入力されました」と表示するプログラムを作成してください。

**仕様**：
- ボタンをクリックすると`checkEmpty()`が実行される
- input要素のid="name"から値を取得
- 結果をid="message"に表示

<details>
<summary>💡 ヒント1: 全体の流れ</summary>

```
1. input.valueで値を取得
2. 空文字チェック（=== ""）
3. 結果をid="message"に表示
```
</details>

<details>
<summary>💡 ヒント2: 空文字チェック</summary>

```javascript
if (name === "") {
  // 空の場合
} else {
  // 入力されている場合
}
```
</details>

<details>
<summary>💡 ヒント3: HTML構造</summary>

```html
<input id="name" type="text">
<button onclick="checkEmpty()">チェック</button>
<p id="message"></p>
```
</details>

<details>
<summary>💡 ヒント4: 関数の骨組み</summary>

```javascript
function checkEmpty() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message");

  if (name === "") {
    // エラーメッセージ
  } else {
    // 成功メッセージ
  }
}
```
</details>

<details>
<summary>💡 ヒント5: ===を使う</summary>

空文字チェックは`===`（厳密等価演算子）を使います。
</details>

<details>
<summary>💡 ヒント6: テストケース</summary>

- 入力: "" → "名前を入力してください"
- 入力: "太郎" → "入力されました"
</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <title>空文字チェック</title>
</head>
<body>
  <h1>名前入力</h1>
  <input id="name" type="text" placeholder="名前">
  <button onclick="checkEmpty()">チェック</button>
  <p id="message"></p>

  <script>
    function checkEmpty() {
      const name = document.getElementById("name").value;
      const message = document.getElementById("message");

      if (name === "") {
        message.textContent = "名前を入力してください";
      } else {
        message.textContent = "入力されました";
      }
    }
  </script>
</body>
</html>
```
</details>

### 問題2: 長さチェック

input要素からテキストを取得し、以下の条件でメッセージを表示するプログラムを作成してください。

**仕様**：
- 空文字の場合: 「入力してください」
- 5文字未満の場合: 「5文字以上入力してください」
- 5文字以上の場合: 「OK」

<details>
<summary>💡 ヒント1: チェックの順序</summary>

```
1. 空文字チェック
2. 長さチェック（< 5）
3. 正常（>= 5）
```
</details>

<details>
<summary>💡 ヒント2: lengthの使い方</summary>

```javascript
const text = document.getElementById("text").value;
console.log(text.length);  // 文字数
```
</details>

<details>
<summary>💡 ヒント3: else ifの使い方</summary>

```javascript
if (text === "") {
  // 空
} else if (text.length < 5) {
  // 5文字未満
} else {
  // 5文字以上
}
```
</details>

<details>
<summary>💡 ヒント4: 関数の骨組み</summary>

```javascript
function checkLength() {
  const text = document.getElementById("text").value;
  const message = document.getElementById("message");

  // チェック処理
}
```
</details>

<details>
<summary>💡 ヒント5: テストケース</summary>

- 入力: "" → "入力してください"
- 入力: "abc" → "5文字以上入力してください"
- 入力: "abcde" → "OK"
</details>

<details>
<summary>💡 ヒント6: HTML構造</summary>

```html
<input id="text" type="text">
<button onclick="checkLength()">チェック</button>
<p id="message"></p>
```
</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <title>長さチェック</title>
</head>
<body>
  <h1>テキスト入力</h1>
  <input id="text" type="text" placeholder="5文字以上">
  <button onclick="checkLength()">チェック</button>
  <p id="message"></p>

  <script>
    function checkLength() {
      const text = document.getElementById("text").value;
      const message = document.getElementById("message");

      if (text === "") {
        message.textContent = "入力してください";
      } else if (text.length < 5) {
        message.textContent = "5文字以上入力してください";
      } else {
        message.textContent = "OK";
      }
    }
  </script>
</body>
</html>
```
</details>

### 問題3: 文字数カウンター

input要素にoninputイベントを設定し、入力された文字数を「〇文字」と表示するプログラムを作成してください。

**仕様**：
- input要素にoninput="countCharacters()"を設定
- 入力するたびに文字数を更新
- 「5文字」のように表示

<details>
<summary>💡 ヒント1: oninputの使い方</summary>

```html
<input id="text" type="text" oninput="countCharacters()">
```
</details>

<details>
<summary>💡 ヒント2: lengthで文字数を取得</summary>

```javascript
const text = document.getElementById("text").value;
const count = text.length;
```
</details>

<details>
<summary>💡 ヒント3: 文字列の連結</summary>

```javascript
counter.textContent = count + "文字";
```
</details>

<details>
<summary>💡 ヒント4: 関数の骨組み</summary>

```javascript
function countCharacters() {
  const text = document.getElementById("text").value;
  const counter = document.getElementById("counter");

  counter.textContent = text.length + "文字";
}
```
</details>

<details>
<summary>💡 ヒント5: HTML構造</summary>

```html
<input id="text" type="text" oninput="countCharacters()">
<p id="counter">0文字</p>
```
</details>

<details>
<summary>💡 ヒント6: テストケース</summary>

- 入力: "" → "0文字"
- 入力: "abc" → "3文字"
- 入力: "こんにちは" → "5文字"
</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <title>文字数カウンター</title>
</head>
<body>
  <h1>文字数カウンター</h1>
  <input id="text" type="text" oninput="countCharacters()" placeholder="入力してください">
  <p id="counter">0文字</p>

  <script>
    function countCharacters() {
      const text = document.getElementById("text").value;
      const counter = document.getElementById("counter");

      counter.textContent = text.length + "文字";
    }
  </script>
</body>
</html>
```
</details>

## チェックリスト

このレッスンを終える前に、以下の項目を確認してください。

- [ ] バリデーションの目的を理解している
- [ ] 空文字チェック（=== ""）ができる
- [ ] lengthプロパティで文字数を取得できる
- [ ] lengthは関数ではなくプロパティであることを理解している
- [ ] 最小文字数のチェックができる（>= N）
- [ ] 最大文字数のチェックができる（<= N）
- [ ] 複数条件を組み合わせてチェックできる
- [ ] チェックの順序（空文字 → 最小 → 最大）を理解している
- [ ] フィードバックメッセージを色分けできる
- [ ] oninputでリアルタイムバリデーションができる

## デバッグのヒント

バリデーションのプログラムでうまく動かない時は、以下を確認してください。

### 1. lengthの値を確認

```javascript
function check() {
  const text = document.getElementById("text").value;
  console.log("入力値:", text);
  console.log("文字数:", text.length);
}
```

### 2. 条件の順序を確認

```javascript
// チェックの順序
if (text === "") {
  // 1番目：空文字
} else if (text.length < 3) {
  // 2番目：最小文字数
} else if (text.length > 10) {
  // 3番目：最大文字数
} else {
  // 4番目：正常
}
```

### 3. ===と==の違いを確認

```javascript
// ✅ 正しい
if (text === "") {
  console.log("空文字");
}

// ❌ 間違い（動くが非推奨）
if (text == "") {
  console.log("空文字");
}
```

### 4. lengthに()がないか確認

```javascript
// ✅ 正しい
console.log(text.length);

// ❌ 間違い
console.log(text.length());  // エラー
```

## ポイント

### バリデーションの原則

1. **ユーザーフレンドリー**
   - 分かりやすいエラーメッセージ
   - 何が問題で、どう直せば良いか明示
   - 色やアイコンで視覚的に伝える

2. **早期チェック**
   - 空文字チェックを最優先
   - より具体的なエラーを先にチェック

3. **リアルタイムフィードバック**
   - oninputでリアルタイム検証
   - 入力中にユーザーをガイド

4. **一貫性**
   - すべての入力欄で同じルール
   - エラーメッセージの表示位置を統一

### lengthプロパティの注意点

1. **関数ではない**
   - `text.length` ✅
   - `text.length()` ❌

2. **文字数をカウント**
   - バイト数ではない
   - 全角も半角も1文字

3. **空文字列は0**
   - `"".length` → 0
   - 空白も文字としてカウント：`" ".length` → 1

## できるようになったこと

このレッスンを終えると、以下のことができるようになります。

1. ✅ **バリデーションの目的を理解する**
   - なぜバリデーションが必要か説明できる
   - ユーザー体験との関係を理解している

2. ✅ **空文字チェックができる**
   - === ""で空文字を判定できる
   - エラーメッセージを表示できる

3. ✅ **lengthプロパティを使える**
   - 文字数を取得できる
   - lengthが関数ではないことを理解している

4. ✅ **最小・最大文字数をチェックできる**
   - >= N（N文字以上）
   - <= N（N文字以内）

5. ✅ **複数条件を組み合わせる**
   - else ifで複数の条件をチェックできる
   - 正しい順序でチェックできる

6. ✅ **フィードバックを表示する**
   - エラーと成功を色分けできる
   - 分かりやすいメッセージを作れる

7. ✅ **リアルタイムバリデーションを実装する**
   - oninputイベントを使える
   - 入力中に文字数を表示できる

8. ✅ **実用的なフォームを作る**
   - 複数フィールドを検証できる
   - ユーザーフレンドリーなUIを作れる

## まとめ

このレッスンでは、以下のことを学びました。

1. **バリデーションの重要性**
   - ユーザーの入力ミスを防ぐ
   - アプリケーションの信頼性を高める
   - 良いユーザー体験を提供する

2. **空文字チェック**
   - `=== ""`で判定
   - 最優先でチェック
   - 具体的なエラーメッセージ

3. **lengthプロパティ**
   - 文字数を取得
   - プロパティなので()不要
   - 全角も半角も1文字

4. **文字数チェック**
   - 最小：`>= N`
   - 最大：`<= N`
   - 境界値に注意

5. **複数条件の組み合わせ**
   - else ifで順番にチェック
   - 空文字 → 最小 → 最大の順序
   - より具体的なエラーを優先

6. **フィードバック表示**
   - 色分けで視覚的に
   - 赤：エラー、緑：成功
   - アイコンで分かりやすく

7. **リアルタイムバリデーション**
   - oninputイベント
   - 入力中に即座にフィードバック
   - 文字数カウンター

バリデーションは、すべてのWebアプリケーションで必要な技術です。ユーザーにとって使いやすいフォームを作れるようになりましょう。

## 次のステップ

次のレッスンでは、**週のまとめプロジェクト**を作成します。

これまで学んだ入力、計算、表示、条件分岐、エラー処理、バリデーションを組み合わせて、実用的なプロフィール作成ツールを作ります。以下のことを実践します。

- 複数の入力フィールド
- 各フィールドのバリデーション
- エラー処理
- 結果の表示

これまで学んだすべての知識を総動員して、完成度の高いアプリケーションを作りましょう。
