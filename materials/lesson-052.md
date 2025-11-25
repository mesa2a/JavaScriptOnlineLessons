# レッスン52: 入力検証

## なぜ重要なのか

入力検証（バリデーション）は、**すべてのWebアプリケーションに必要不可欠**な機能です。ユーザーからの入力を信頼せず、適切にチェックすることで、エラーやセキュリティ問題を防ぎます。

### 実際のサービスでの使用例

1. **Twitter：ツイート投稿**
   ```javascript
   // 文字数制限: 280文字以内
   if (tweet.length > 280) {
     showError("ツイートは280文字以内で入力してください");
   }
   ```

2. **Gmail：メールアドレス入力**
   ```javascript
   // メールアドレスの形式チェック
   if (!email.includes("@") || !email.includes(".")) {
     showError("正しいメールアドレスを入力してください");
   }
   ```

3. **Amazon：パスワード設定**
   ```javascript
   // パスワード強度チェック
   if (password.length < 8) {
     showError("パスワードは8文字以上で設定してください");
   }
   ```

4. **Facebook：生年月日入力**
   ```javascript
   // 年齢制限: 13歳以上
   if (age < 13) {
     showError("13歳以上の方のみ登録できます");
   }
   ```

5. **PayPal：金額入力**
   ```javascript
   // 金額の検証: 0より大きい
   if (amount <= 0 || isNaN(amount)) {
     showError("正しい金額を入力してください");
   }
   ```

このように、**入力検証はユーザー体験とデータの整合性を守る**ために、あらゆるアプリケーションで使われています。

---

## このレッスンで学ぶこと

ユーザーからの入力を受け取る際、その入力が正しい形式かどうかをチェックする**入力検証(バリデーション)**は非常に重要です。今回は、実践的な入力検証の方法を学びます：

- **空文字チェック**：必須項目の検証
- **数値チェック**：数値型データの検証
- **長さチェック**：文字列の長さ制限
- **範囲チェック**：数値の範囲制限
- **形式チェック**：メールアドレスなどの形式
- **エラー表示**：わかりやすいエラーメッセージ

---

## 入力検証とは

入力検証は、**ユーザーが入力したデータが期待する形式や条件を満たしているか**をチェックする処理です。

### なぜ入力検証が必要か

#### 1. エラーの防止

```javascript
// 検証なし: エラーが発生する
let age = "abc";
let futureAge = age + 10;  // "abc10" になってしまう

// 検証あり: エラーを防ぐ
let age = "abc";
if (isNaN(Number(age))) {
  console.log("数値を入力してください");
  return;
}
let futureAge = Number(age) + 10;  // 正常に計算できる
```

#### 2. データの整合性

```javascript
// 検証なし: データベースに不正なデータが入る
saveToDB({ name: "", age: -5 });  // 空の名前、負の年齢

// 検証あり: 正しいデータのみ保存
if (name === "" || age < 0) {
  console.log("正しい値を入力してください");
  return;
}
saveToDB({ name, age });
```

#### 3. ユーザー体験の向上

```javascript
// 検証なし: エラーメッセージなし
submit();  // 何も起こらない...ユーザーは混乱

// 検証あり: わかりやすいフィードバック
if (!validate()) {
  showError("名前を入力してください");
  return;
}
submit();  // 成功メッセージ
```

### 入力検証の3つの原則

1. **信頼しない**：ユーザー入力を決して信頼しない
2. **早期発見**：できるだけ早く入力エラーを検出する
3. **明確なフィードバック**：何が間違っているかを明確に伝える

---

## 基本的な検証パターン

### パターン1: 空文字チェック

**最も基本的な検証**です。必須項目が入力されているかをチェックします。

```javascript
let name = "";

if (name === "") {
  console.log("名前を入力してください");
}

// 評価の流れ:
// 1. name === "" → "" === "" → true
// 2. エラーメッセージを表示 ✅
```

#### なぜ `=== ""` を使うのか

```javascript
// ✅ 正しい: === を使う
if (name === "") {
  // 空文字のみにマッチ
}

// ❌ 間違い: == を使う
if (name == "") {
  // null, undefined も true になってしまう
}

// ✅ 別の方法: length を使う
if (name.length === 0) {
  // 空文字をチェック
}
```

### パターン2: 数値チェック

入力が**数値かどうか**をチェックします。

```javascript
let input = "abc";
let number = Number(input);

if (isNaN(number)) {
  console.log("数値を入力してください");
}

// 評価の流れ:
// 1. Number("abc") → NaN
// 2. isNaN(NaN) → true
// 3. エラーメッセージを表示 ✅
```

#### isNaN() の使い方

```javascript
// 数値の場合
console.log(isNaN(123));       // false（数値である）
console.log(isNaN("123"));     // false（数値に変換できる）

// 数値でない場合
console.log(isNaN("abc"));     // true（数値でない）
console.log(isNaN(""));        // false（空文字は0になる！注意）
console.log(isNaN(undefined)); // true
```

#### 空文字に注意

```javascript
let input = "";
let number = Number(input);  // Number("") → 0

// ❌ 問題: 空文字が 0 として扱われる
if (isNaN(number)) {
  console.log("数値を入力してください");  // 表示されない
}

// ✅ 正しい: 空文字を先にチェック
if (input === "") {
  console.log("数値を入力してください");
  return;
}
let number = Number(input);
if (isNaN(number)) {
  console.log("数値を入力してください");
}
```

### パターン3: 長さチェック

文字列の**長さ**をチェックします。

```javascript
let password = "abc";

if (password.length < 8) {
  console.log("パスワードは8文字以上にしてください");
}

// 評価の流れ:
// 1. "abc".length → 3
// 2. 3 < 8 → true
// 3. エラーメッセージを表示 ✅
```

#### 最小・最大の両方をチェック

```javascript
let username = "ab";

// 最小長チェック
if (username.length < 3) {
  console.log("ユーザー名は3文字以上にしてください");
}

// 最大長チェック
if (username.length > 15) {
  console.log("ユーザー名は15文字以内にしてください");
}

// 両方を一度にチェック
if (username.length < 3 || username.length > 15) {
  console.log("ユーザー名は3文字以上15文字以内にしてください");
}
```

### パターン4: 範囲チェック

数値が**特定の範囲内**かをチェックします。

```javascript
let age = 150;

if (age < 0 || age > 120) {
  console.log("正しい年齢を入力してください");
}

// 評価の流れ:
// 1. age < 0 → 150 < 0 → false
// 2. age > 120 → 150 > 120 → true
// 3. false || true → true
// 4. エラーメッセージを表示 ✅
```

### パターン5: 形式チェック

特定の**形式**を満たしているかをチェックします。

```javascript
let email = "test.example.com";  // @がない

// @を含むかチェック
if (email.indexOf("@") === -1) {
  console.log("正しいメールアドレスを入力してください");
}

// 評価の流れ:
// 1. "test.example.com".indexOf("@") → -1（見つからない）
// 2. -1 === -1 → true
// 3. エラーメッセージを表示 ✅
```

#### indexOf() の返り値

```javascript
let str = "hello@example.com";

console.log(str.indexOf("@"));     // 5（@の位置）
console.log(str.indexOf("xyz"));   // -1（見つからない）

// 含まれているかチェック
if (str.indexOf("@") !== -1) {
  console.log("@が含まれています");
}

// または includes() を使う（より読みやすい）
if (str.includes("@")) {
  console.log("@が含まれています");
}
```

---

## 実践的な入力検証

### 例1: 名前の検証

```javascript
function validateName() {
  const name = document.getElementById("name").value;
  const error = document.getElementById("error");

  // エラーメッセージをクリア
  error.textContent = "";

  // 検証1: 空文字チェック
  if (name === "") {
    error.textContent = "名前を入力してください";
    return false;
  }

  // 検証2: 最小長チェック
  if (name.length < 2) {
    error.textContent = "名前は2文字以上入力してください";
    return false;
  }

  // 検証3: 最大長チェック
  if (name.length > 20) {
    error.textContent = "名前は20文字以内で入力してください";
    return false;
  }

  // すべての検証を通過
  return true;
}
```

#### 検証の流れ

```
入力: ""
├─ 空文字チェック → エラー: "名前を入力してください" ❌

入力: "a"
├─ 空文字チェック → OK ✅
└─ 最小長チェック → エラー: "名前は2文字以上入力してください" ❌

入力: "これは非常に長い名前でテストしています"
├─ 空文字チェック → OK ✅
├─ 最小長チェック → OK ✅
└─ 最大長チェック → エラー: "名前は20文字以内で入力してください" ❌

入力: "太郎"
├─ 空文字チェック → OK ✅
├─ 最小長チェック → OK ✅
└─ 最大長チェック → OK ✅
→ すべて通過 ✅
```

### 例2: 年齢の検証

```javascript
function validateAge() {
  const ageValue = document.getElementById("age").value;
  const error = document.getElementById("error");

  // エラーメッセージをクリア
  error.textContent = "";

  // 検証1: 空文字チェック
  if (ageValue === "") {
    error.textContent = "年齢を入力してください";
    return false;
  }

  // 検証2: 数値チェック
  const age = Number(ageValue);
  if (isNaN(age)) {
    error.textContent = "年齢は数値で入力してください";
    return false;
  }

  // 検証3: 範囲チェック
  if (age < 0 || age > 150) {
    error.textContent = "正しい年齢を入力してください（0〜150）";
    return false;
  }

  // すべての検証を通過
  return true;
}
```

#### 検証の順序が重要

```javascript
// ❌ 間違った順序: 先に数値チェックをすると、空文字が 0 になる
const age = Number(ageValue);  // Number("") → 0
if (isNaN(age)) {
  // 空文字でも通過してしまう
}

// ✅ 正しい順序: 先に空文字チェック
if (ageValue === "") {
  error.textContent = "年齢を入力してください";
  return false;
}
const age = Number(ageValue);
```

### 例3: メールアドレスの検証

```javascript
function validateEmail() {
  const email = document.getElementById("email").value;
  const error = document.getElementById("error");

  // エラーメッセージをクリア
  error.textContent = "";

  // 検証1: 空文字チェック
  if (email === "") {
    error.textContent = "メールアドレスを入力してください";
    return false;
  }

  // 検証2: @を含むかチェック
  if (!email.includes("@")) {
    error.textContent = "正しいメールアドレスを入力してください（@が必要です）";
    return false;
  }

  // 検証3: ドットを含むかチェック
  if (!email.includes(".")) {
    error.textContent = "正しいメールアドレスを入力してください（.が必要です）";
    return false;
  }

  // 検証4: @の後にドットがあるかチェック
  const atIndex = email.indexOf("@");
  const dotIndex = email.lastIndexOf(".");
  if (dotIndex <= atIndex) {
    error.textContent = "正しいメールアドレスを入力してください";
    return false;
  }

  // すべての検証を通過
  return true;
}
```

#### メールアドレスの基本的な形式

```
正しい例:
- user@example.com ✅
- test.user@mail.co.jp ✅
- admin123@site.org ✅

間違った例:
- userexample.com ❌（@がない）
- user@examplecom ❌（.がない）
- user@.com ❌（@の直後に.）
- @example.com ❌（ユーザー名がない）
```

---

## 複数フィールドの検証

実際のフォームでは、**複数の項目を一度に検証**します。

```javascript
function validateForm() {
  const name = document.getElementById("name").value;
  const ageValue = document.getElementById("age").value;
  const email = document.getElementById("email").value;
  const error = document.getElementById("error");

  // エラーメッセージをクリア
  error.textContent = "";

  // 名前の検証
  if (name === "") {
    error.textContent = "名前を入力してください";
    return false;
  }

  if (name.length < 2) {
    error.textContent = "名前は2文字以上入力してください";
    return false;
  }

  if (name.length > 20) {
    error.textContent = "名前は20文字以内で入力してください";
    return false;
  }

  // 年齢の検証
  if (ageValue === "") {
    error.textContent = "年齢を入力してください";
    return false;
  }

  const age = Number(ageValue);
  if (isNaN(age)) {
    error.textContent = "年齢は数値で入力してください";
    return false;
  }

  if (age < 0 || age > 150) {
    error.textContent = "正しい年齢を入力してください（0〜150）";
    return false;
  }

  // メールの検証
  if (email === "") {
    error.textContent = "メールアドレスを入力してください";
    return false;
  }

  if (!email.includes("@")) {
    error.textContent = "正しいメールアドレスを入力してください";
    return false;
  }

  // すべての検証を通過
  return true;
}
```

### 検証の流れ（フローチャート）

```
開始
  ↓
名前: 空文字？ ──Yes→ エラー表示 → 終了
  ↓ No
名前: 2文字未満？ ──Yes→ エラー表示 → 終了
  ↓ No
名前: 20文字超？ ──Yes→ エラー表示 → 終了
  ↓ No
年齢: 空文字？ ──Yes→ エラー表示 → 終了
  ↓ No
年齢: 数値？ ──No→ エラー表示 → 終了
  ↓ Yes
年齢: 0〜150？ ──No→ エラー表示 → 終了
  ↓ Yes
メール: 空文字？ ──Yes→ エラー表示 → 終了
  ↓ No
メール: @含む？ ──No→ エラー表示 → 終了
  ↓ Yes
すべて OK
  ↓
成功
```

---

## 早期リターンパターン

検証では、**エラーが見つかったらすぐに処理を終了**する**早期リターン**が有効です。

### 早期リターンなし（ネストが深い）

```javascript
// ❌ 読みにくい: ネストが深い
function validate() {
  const name = document.getElementById("name").value;
  const error = document.getElementById("error");

  error.textContent = "";

  if (name !== "") {
    if (name.length >= 2) {
      if (name.length <= 20) {
        // すべてOK
        const result = document.getElementById("result");
        result.textContent = "OK";
      } else {
        error.textContent = "名前は20文字以内で入力してください";
      }
    } else {
      error.textContent = "名前は2文字以上入力してください";
    }
  } else {
    error.textContent = "名前を入力してください";
  }
}
```

### 早期リターンあり（読みやすい）

```javascript
// ✅ 読みやすい: 早期リターン
function validate() {
  const name = document.getElementById("name").value;
  const error = document.getElementById("error");

  error.textContent = "";

  // エラーが見つかったらすぐreturn
  if (name === "") {
    error.textContent = "名前を入力してください";
    return;
  }

  if (name.length < 2) {
    error.textContent = "名前は2文字以上入力してください";
    return;
  }

  if (name.length > 20) {
    error.textContent = "名前は20文字以内で入力してください";
    return;
  }

  // すべての検証を通過
  const result = document.getElementById("result");
  result.textContent = "OK";
}
```

### 早期リターンのメリット

1. **読みやすい**：ネストが浅い
2. **理解しやすい**：エラー条件が明確
3. **保守しやすい**：新しい検証を追加しやすい

---

## エラーメッセージのベストプラクティス

### 原則1: 具体的に書く

```javascript
// ❌ 悪い例: 何が間違っているか不明
error.textContent = "エラーです";

// ✅ 良い例: 何が間違っているか明確
error.textContent = "名前は2文字以上入力してください";
```

### 原則2: わかりやすい日本語を使う

```javascript
// ❌ 悪い例: 英語やプログラム用語
error.textContent = "Invalid input";
error.textContent = "NaN error";

// ✅ 良い例: わかりやすい日本語
error.textContent = "正しい形式で入力してください";
error.textContent = "数値を入力してください";
```

### 原則3: 解決方法を示す

```javascript
// ❌ 悪い例: 問題だけ指摘
error.textContent = "パスワードが短いです";
error.textContent = "メールアドレスが間違っています";

// ✅ 良い例: 解決方法も示す
error.textContent = "パスワードは8文字以上で入力してください";
error.textContent = "正しいメールアドレスを入力してください（例: user@example.com）";
```

### 原則4: ポジティブな表現を使う

```javascript
// ❌ 悪い例: ネガティブな表現
error.textContent = "あなたの入力は間違っています";
error.textContent = "そんな値は使えません";

// ✅ 良い例: ポジティブな表現
error.textContent = "名前を入力してください";
error.textContent = "0以上の数値を入力してください";
```

---

## 防御的プログラミング

**想定外の入力に備える**プログラミング手法です。

### 技術1: トリム処理（前後の空白を削除）

```javascript
// ❌ 問題: 空白が入っている
let name = "  太郎  ";
if (name === "") {
  console.log("名前を入力してください");  // 実行されない
}

// ✅ 解決: trim() で空白を削除
let name = document.getElementById("name").value.trim();
if (name === "") {
  console.log("名前を入力してください");  // 正しく実行される
}
```

#### trim() の動作

```javascript
console.log("  hello  ".trim());  // "hello"
console.log("  ".trim());         // ""（空文字）
console.log("hello".trim());      // "hello"（変化なし）
```

### 技術2: 大文字・小文字の統一

```javascript
// ❌ 問題: 大文字・小文字が異なる
let email1 = "USER@example.com";
let email2 = "user@example.com";
if (email1 === email2) {
  console.log("同じ");  // 実行されない
}

// ✅ 解決: toLowerCase() で統一
let email1 = "USER@example.com".toLowerCase();
let email2 = "user@example.com".toLowerCase();
if (email1 === email2) {
  console.log("同じ");  // 実行される
}
```

### 技術3: 境界値の確認

```javascript
// ✅ 境界値をチェック
let age = Number(document.getElementById("age").value);

// 負の数をチェック
if (age < 0) {
  error.textContent = "0以上の数値を入力してください";
  return;
}

// 大きすぎる数をチェック
if (age > 150) {
  error.textContent = "正しい年齢を入力してください";
  return;
}

// 整数かチェック
if (!Number.isInteger(age)) {
  error.textContent = "整数を入力してください";
  return;
}
```

### 技術4: デフォルト値の設定

```javascript
// ✅ デフォルト値を設定
let count = Number(document.getElementById("count").value) || 1;

// 入力が空の場合、1になる
// 入力が "abc" の場合、NaN → falsy → 1になる
```

---

## 検証の順序

検証は**適切な順序**で行いましょう。

### 推奨される順序

```javascript
function validate() {
  const ageValue = document.getElementById("age").value;

  // ステップ1: 空文字チェック（最初）
  if (ageValue === "") {
    error.textContent = "年齢を入力してください";
    return;
  }

  // ステップ2: 型チェック
  const age = Number(ageValue);
  if (isNaN(age)) {
    error.textContent = "数値を入力してください";
    return;
  }

  // ステップ3: 範囲チェック（最後）
  if (age < 0 || age > 150) {
    error.textContent = "正しい年齢を入力してください（0〜150）";
    return;
  }

  // OK
  result.textContent = "正しい入力です";
}
```

### なぜこの順序なのか

1. **空文字チェックが最初**：
   - 空文字を `Number()` で変換すると `0` になってしまう
   - 他の検証の前に空文字を検出する必要がある

2. **型チェックが2番目**：
   - 数値でないものを範囲チェックしても意味がない
   - 先に数値であることを確認する

3. **範囲チェックが最後**：
   - 数値であることが確認できてから範囲をチェック

---

## 実用例

### 実用例1: ユーザー登録フォーム

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ユーザー登録フォーム</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h2 {
      color: #667eea;
      text-align: center;
      margin-bottom: 30px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: #333;
    }
    input {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box;
      transition: border-color 0.3s;
    }
    input:focus {
      outline: none;
      border-color: #667eea;
    }
    input.error {
      border-color: #f44336;
    }
    .hint {
      font-size: 14px;
      color: #666;
      margin-top: 5px;
    }
    button {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 20px;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    .message {
      margin-top: 20px;
      padding: 15px;
      border-radius: 8px;
      display: none;
    }
    .message.show {
      display: block;
    }
    .error-message {
      background: #ffebee;
      color: #c62828;
      border: 2px solid #ef5350;
    }
    .success-message {
      background: #e8f5e9;
      color: #2e7d32;
      border: 2px solid #66bb6a;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>ユーザー登録</h2>

    <div class="form-group">
      <label for="username">ユーザー名</label>
      <input type="text" id="username" placeholder="ユーザー名を入力">
      <div class="hint">3文字以上15文字以内</div>
    </div>

    <div class="form-group">
      <label for="password">パスワード</label>
      <input type="password" id="password" placeholder="パスワードを入力">
      <div class="hint">6文字以上</div>
    </div>

    <div class="form-group">
      <label for="age">年齢</label>
      <input type="number" id="age" placeholder="年齢を入力">
      <div class="hint">13歳以上</div>
    </div>

    <button onclick="validateAndRegister()">登録する</button>

    <div id="message" class="message"></div>
  </div>

  <script>
    function validateAndRegister() {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      const ageValue = document.getElementById("age").value;
      const messageEl = document.getElementById("message");

      // エラーメッセージをクリア
      messageEl.className = "message";
      messageEl.textContent = "";

      // すべての入力フィールドのエラー状態をクリア
      document.querySelectorAll("input").forEach(input => {
        input.classList.remove("error");
      });

      // ユーザー名の検証
      if (username === "") {
        showError("ユーザー名を入力してください", "username");
        return;
      }

      if (username.length < 3) {
        showError("ユーザー名は3文字以上にしてください", "username");
        return;
      }

      if (username.length > 15) {
        showError("ユーザー名は15文字以内にしてください", "username");
        return;
      }

      // パスワードの検証
      if (password === "") {
        showError("パスワードを入力してください", "password");
        return;
      }

      if (password.length < 6) {
        showError("パスワードは6文字以上にしてください", "password");
        return;
      }

      // 年齢の検証
      if (ageValue === "") {
        showError("年齢を入力してください", "age");
        return;
      }

      const age = Number(ageValue);
      if (isNaN(age)) {
        showError("年齢は数値で入力してください", "age");
        return;
      }

      if (age < 13) {
        showError("13歳以上の方のみ登録できます", "age");
        return;
      }

      if (age > 150) {
        showError("正しい年齢を入力してください", "age");
        return;
      }

      // すべての検証を通過
      showSuccess(`登録完了！ようこそ、${username}さん！`);
    }

    function showError(message, inputId) {
      const messageEl = document.getElementById("message");
      messageEl.className = "message error-message show";
      messageEl.textContent = "❌ " + message;

      // エラーがあった入力フィールドを強調
      if (inputId) {
        document.getElementById(inputId).classList.add("error");
        document.getElementById(inputId).focus();
      }
    }

    function showSuccess(message) {
      const messageEl = document.getElementById("message");
      messageEl.className = "message success-message show";
      messageEl.textContent = "✅ " + message;
    }
  </script>
</body>
</html>
```

#### このコードのポイント

1. **トリム処理**：`username.trim()` で前後の空白を削除
2. **段階的な検証**：早期リターンで読みやすく
3. **エラーフィールドの強調**：どの入力が間違っているか視覚的に表示
4. **ヒント表示**：各フィールドに入力条件を表示

### 実用例2: 問い合わせフォーム

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>問い合わせフォーム</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      min-height: 100vh;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h2 {
      color: #f5576c;
      text-align: center;
      margin-bottom: 30px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: #333;
    }
    label .required {
      color: #f44336;
    }
    input, textarea {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box;
      font-family: 'Segoe UI', sans-serif;
    }
    textarea {
      min-height: 120px;
      resize: vertical;
    }
    button {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 20px;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(245, 87, 108, 0.4);
    }
    .message {
      margin-top: 20px;
      padding: 15px;
      border-radius: 8px;
      display: none;
    }
    .message.show {
      display: block;
    }
    .error {
      background: #ffebee;
      color: #c62828;
      border: 2px solid #ef5350;
    }
    .success {
      background: #e8f5e9;
      color: #2e7d32;
      border: 2px solid #66bb6a;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>お問い合わせ</h2>

    <div class="form-group">
      <label for="name">お名前 <span class="required">*</span></label>
      <input type="text" id="name" placeholder="山田太郎">
    </div>

    <div class="form-group">
      <label for="email">メールアドレス <span class="required">*</span></label>
      <input type="email" id="email" placeholder="example@mail.com">
    </div>

    <div class="form-group">
      <label for="subject">件名 <span class="required">*</span></label>
      <input type="text" id="subject" placeholder="お問い合わせの件名">
    </div>

    <div class="form-group">
      <label for="message">メッセージ <span class="required">*</span></label>
      <textarea id="messageText" placeholder="お問い合わせ内容を入力してください"></textarea>
    </div>

    <button onclick="validateAndSend()">送信する</button>

    <div id="result" class="message"></div>
  </div>

  <script>
    function validateAndSend() {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim().toLowerCase();
      const subject = document.getElementById("subject").value.trim();
      const messageText = document.getElementById("messageText").value.trim();
      const resultEl = document.getElementById("result");

      // エラーメッセージをクリア
      resultEl.className = "message";
      resultEl.textContent = "";

      // 名前の検証
      if (name === "") {
        showError("お名前を入力してください");
        return;
      }

      if (name.length < 2) {
        showError("お名前は2文字以上入力してください");
        return;
      }

      // メールアドレスの検証
      if (email === "") {
        showError("メールアドレスを入力してください");
        return;
      }

      if (!email.includes("@")) {
        showError("正しいメールアドレスを入力してください（@が必要です）");
        return;
      }

      if (!email.includes(".")) {
        showError("正しいメールアドレスを入力してください（.が必要です）");
        return;
      }

      const atIndex = email.indexOf("@");
      const dotIndex = email.lastIndexOf(".");
      if (dotIndex <= atIndex + 1) {
        showError("正しいメールアドレスを入力してください");
        return;
      }

      // 件名の検証
      if (subject === "") {
        showError("件名を入力してください");
        return;
      }

      if (subject.length < 3) {
        showError("件名は3文字以上入力してください");
        return;
      }

      // メッセージの検証
      if (messageText === "") {
        showError("メッセージを入力してください");
        return;
      }

      if (messageText.length < 10) {
        showError("メッセージは10文字以上入力してください");
        return;
      }

      // すべての検証を通過
      showSuccess("お問い合わせを送信しました。ありがとうございます！");

      // フォームをクリア
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("messageText").value = "";
    }

    function showError(message) {
      const resultEl = document.getElementById("result");
      resultEl.className = "message error show";
      resultEl.textContent = "❌ " + message;
    }

    function showSuccess(message) {
      const resultEl = document.getElementById("result");
      resultEl.className = "message success show";
      resultEl.textContent = "✅ " + message;
    }
  </script>
</body>
</html>
```

#### このコードのポイント

1. **トリム + 小文字変換**：`email.trim().toLowerCase()`
2. **必須項目の明示**：`<span class="required">*</span>`
3. **詳細なメール検証**：@の位置、.の位置を確認
4. **成功時のフォームクリア**：送信後に入力をクリア

---

## 練習問題

### 問題1: パスワード強度チェッカー

パスワードの強度を判定するプログラムを作成してください。

**検証条件:**
- 8文字以上
- 英字を含む
- 数字を含む

<details>
<summary>💡 ヒント1: 英字を含むかチェック</summary>

```javascript
// 英字を含むかチェック
let hasLetter = false;
for (let i = 0; i < password.length; i++) {
  const char = password[i];
  if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
    hasLetter = true;
    break;
  }
}
```
</details>

<details>
<summary>💡 ヒント2: 数字を含むかチェック</summary>

```javascript
// 数字を含むかチェック
let hasNumber = false;
for (let i = 0; i < password.length; i++) {
  const char = password[i];
  if (char >= '0' && char <= '9') {
    hasNumber = true;
    break;
  }
}
```
</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>パスワード強度チェッカー</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
    }
    .form-group {
      margin: 15px 0;
    }
    input {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }
    .result {
      margin-top: 20px;
      padding: 15px;
      border-radius: 5px;
      display: none;
    }
    .result.show {
      display: block;
    }
    .weak {
      background: #ffebee;
      color: #c62828;
    }
    .strong {
      background: #e8f5e9;
      color: #2e7d32;
    }
  </style>
</head>
<body>
  <h2>パスワード強度チェッカー</h2>

  <div class="form-group">
    <label>パスワード</label>
    <input type="password" id="password" placeholder="パスワードを入力">
  </div>

  <button onclick="checkPassword()">チェック</button>

  <div id="result" class="result"></div>

  <script>
    function checkPassword() {
      const password = document.getElementById("password").value;
      const resultEl = document.getElementById("result");

      // エラーメッセージをクリア
      resultEl.className = "result";
      resultEl.textContent = "";

      // 空文字チェック
      if (password === "") {
        resultEl.className = "result weak show";
        resultEl.textContent = "❌ パスワードを入力してください";
        return;
      }

      // 長さチェック
      if (password.length < 8) {
        resultEl.className = "result weak show";
        resultEl.textContent = "❌ パスワードは8文字以上にしてください";
        return;
      }

      // 英字を含むかチェック
      let hasLetter = false;
      for (let i = 0; i < password.length; i++) {
        const char = password[i];
        if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
          hasLetter = true;
          break;
        }
      }

      if (!hasLetter) {
        resultEl.className = "result weak show";
        resultEl.textContent = "❌ パスワードには英字を含めてください";
        return;
      }

      // 数字を含むかチェック
      let hasNumber = false;
      for (let i = 0; i < password.length; i++) {
        const char = password[i];
        if (char >= '0' && char <= '9') {
          hasNumber = true;
          break;
        }
      }

      if (!hasNumber) {
        resultEl.className = "result weak show";
        resultEl.textContent = "❌ パスワードには数字を含めてください";
        return;
      }

      // すべての条件を満たす
      resultEl.className = "result strong show";
      resultEl.textContent = "✅ 強力なパスワードです！";
    }
  </script>
</body>
</html>
```
</details>

### 問題2: 電話番号バリデーター

電話番号の形式をチェックするプログラムを作成してください。

**検証条件:**
- 空でない
- 10桁または11桁の数字のみ
- ハイフンは含まない

<details>
<summary>💡 ヒント1: 数字のみかチェック</summary>

```javascript
// すべて数字かチェック
let isAllNumbers = true;
for (let i = 0; i < phone.length; i++) {
  const char = phone[i];
  if (char < '0' || char > '9') {
    isAllNumbers = false;
    break;
  }
}
```
</details>

<details>
<summary>💡 ヒント2: 桁数チェック</summary>

```javascript
// 10桁または11桁かチェック
if (phone.length !== 10 && phone.length !== 11) {
  error.textContent = "電話番号は10桁または11桁で入力してください";
  return;
}
```
</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>電話番号バリデーター</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
    }
    .form-group {
      margin: 15px 0;
    }
    input {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #2196F3;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }
    .result {
      margin-top: 20px;
      padding: 15px;
      border-radius: 5px;
      display: none;
    }
    .result.show {
      display: block;
    }
    .error {
      background: #ffebee;
      color: #c62828;
    }
    .success {
      background: #e8f5e9;
      color: #2e7d32;
    }
  </style>
</head>
<body>
  <h2>電話番号バリデーター</h2>

  <div class="form-group">
    <label>電話番号</label>
    <input type="text" id="phone" placeholder="09012345678">
    <div style="font-size: 14px; color: #666; margin-top: 5px;">
      ハイフンなしで入力してください
    </div>
  </div>

  <button onclick="validatePhone()">チェック</button>

  <div id="result" class="result"></div>

  <script>
    function validatePhone() {
      const phone = document.getElementById("phone").value.trim();
      const resultEl = document.getElementById("result");

      // エラーメッセージをクリア
      resultEl.className = "result";
      resultEl.textContent = "";

      // 空文字チェック
      if (phone === "") {
        resultEl.className = "result error show";
        resultEl.textContent = "❌ 電話番号を入力してください";
        return;
      }

      // 桁数チェック
      if (phone.length !== 10 && phone.length !== 11) {
        resultEl.className = "result error show";
        resultEl.textContent = "❌ 電話番号は10桁または11桁で入力してください";
        return;
      }

      // すべて数字かチェック
      let isAllNumbers = true;
      for (let i = 0; i < phone.length; i++) {
        const char = phone[i];
        if (char < '0' || char > '9') {
          isAllNumbers = false;
          break;
        }
      }

      if (!isAllNumbers) {
        resultEl.className = "result error show";
        resultEl.textContent = "❌ 電話番号は数字のみで入力してください（ハイフンは不要）";
        return;
      }

      // すべての条件を満たす
      resultEl.className = "result success show";
      resultEl.textContent = `✅ 正しい電話番号です（${phone}）`;
    }
  </script>
</body>
</html>
```
</details>

---

## デバッグのヒント

入力検証がうまく動かない場合は、以下を試しましょう。

### 1. 入力値をコンソールに出力

```javascript
const name = document.getElementById("name").value;
console.log("name:", name);
console.log("name.length:", name.length);
console.log("name === '':", name === "");
```

### 2. 空白文字に注意

```javascript
// ユーザーが空白を入力している可能性
const name = document.getElementById("name").value;
console.log("name:", name);  // "   " （空白のみ）
console.log("name === '':", name === "");  // false

// trim() を使う
const trimmedName = name.trim();
console.log("trimmedName:", trimmedName);  // ""
console.log("trimmedName === '':", trimmedName === "");  // true
```

### 3. 数値変換の確認

```javascript
const input = "";
console.log("input:", input);
console.log("Number(input):", Number(input));  // 0 (空文字は0になる!)
console.log("isNaN(Number(input)):", isNaN(Number(input)));  // false

// 空文字を先にチェック
if (input === "") {
  console.log("空文字です");
}
```

### 4. 検証の順序を確認

```javascript
// デバッグ用のログを入れる
function validate() {
  console.log("検証開始");

  if (name === "") {
    console.log("エラー: 空文字");
    return;
  }

  console.log("空文字チェック: OK");

  if (name.length < 2) {
    console.log("エラー: 長さ不足");
    return;
  }

  console.log("長さチェック: OK");
  console.log("すべての検証を通過");
}
```

### 5. エラーメッセージが表示されない場合

```javascript
// エラー要素が存在するか確認
const error = document.getElementById("error");
console.log("error element:", error);  // null なら要素が存在しない

// textContent が正しく設定されているか確認
error.textContent = "テストメッセージ";
console.log("error.textContent:", error.textContent);
```

---

## チェックリスト

このレッスンの内容を理解できたか、以下でチェックしましょう。

- [ ] 入力検証の重要性を理解している
- [ ] 空文字チェックができる
- [ ] 数値チェックができる（isNaN を使える）
- [ ] 長さチェックができる（.length を使える）
- [ ] 範囲チェックができる
- [ ] 形式チェックができる（indexOf, includes を使える）
- [ ] 早期リターンパターンを使える
- [ ] わかりやすいエラーメッセージを書ける
- [ ] 検証の適切な順序を理解している
- [ ] トリム処理などの防御的プログラミングができる

---

## ポイント

### 1. 入力検証の3原則

```
1. 信頼しない
2. 早期発見
3. 明確なフィードバック
```

### 2. 基本的な検証パターン

```javascript
// 空文字
if (value === "") { }

// 数値
if (isNaN(Number(value))) { }

// 長さ
if (value.length < 3 || value.length > 20) { }

// 範囲
if (value < 0 || value > 100) { }

// 形式
if (!value.includes("@")) { }
```

### 3. 早期リターン

```javascript
// ✅ 読みやすい
if (error1) return;
if (error2) return;
if (error3) return;
// OK
```

### 4. 検証の順序

```
1. 空文字チェック
2. 型チェック
3. 範囲チェック
```

### 5. エラーメッセージの4原則

```
1. 具体的に
2. わかりやすく
3. 解決方法を示す
4. ポジティブに
```

### 6. 防御的プログラミング

```javascript
// トリム
value.trim()

// 小文字変換
value.toLowerCase()

// 境界値チェック
if (value < 0 || value > max) { }
```

### 7. 空文字と数値変換の注意

```javascript
// ❌ 空文字は 0 になる
Number("") === 0  // true

// ✅ 空文字を先にチェック
if (value === "") { }
```

### 8. デバッグの基本

```javascript
// 入力値を確認
console.log("value:", value);
console.log("type:", typeof value);
console.log("length:", value.length);
```

---

## できるようになったこと

このレッスンを終えて、以下ができるようになりました：

1. **入力検証の重要性**を理解している
2. **5つの基本的な検証パターン**を使える（空文字、数値、長さ、範囲、形式）
3. **早期リターンパターン**で読みやすいコードを書ける
4. **わかりやすいエラーメッセージ**を作成できる
5. **複数フィールドの検証**ができる
6. **防御的プログラミング**の技術を使える
7. **実用的なフォーム**（登録フォーム、問い合わせフォーム）を実装できる
8. **デバッグ技術**を使って検証の問題を特定できる

---

## まとめ

### 入力検証とは

ユーザーが入力したデータが**期待する形式や条件を満たしているか**をチェックする処理

### 基本的な検証パターン

| 検証 | コード例 | 用途 |
|------|----------|------|
| 空文字 | `value === ""` | 必須項目 |
| 数値 | `isNaN(Number(value))` | 数値入力 |
| 長さ | `value.length < 3` | 文字数制限 |
| 範囲 | `value < 0 \|\| value > 100` | 数値範囲 |
| 形式 | `value.includes("@")` | メール、電話 |

### 検証の順序

```
空文字チェック → 型チェック → 範囲チェック
```

### エラーメッセージのポイント

1. **具体的に**：「エラーです」→「名前は2文字以上入力してください」
2. **わかりやすく**：英語やプログラム用語を避ける
3. **解決方法を示す**：何をすればいいか明示する
4. **ポジティブに**：責めるような表現を避ける

### 防御的プログラミング

```javascript
// トリム処理
value.trim()

// 大文字・小文字の統一
value.toLowerCase()

// 境界値の確認
if (value < 0 || value > max) { }
```

### 実践での使い方

入力検証は、**すべてのWebアプリケーションに必要不可欠**です：

- ユーザー登録フォーム
- ログインフォーム
- 問い合わせフォーム
- 検索フォーム
- 設定画面

これらを**正確に実装**できることは、プロフェッショナルなエンジニアの必須スキルです。

---

## 次のステップ

次のレッスンでは、**これまで学んだ知識を使ってクイズアプリ**を作成します。

```javascript
// 問題を表示
// 答えをチェック
// 正解/不正解を表示
```

クイズアプリでは、条件分岐、範囲判定、入力検証など、これまで学んだすべての知識を組み合わせて使います。

[レッスン53: クイズアプリ](lesson-053.md) に進みましょう！
