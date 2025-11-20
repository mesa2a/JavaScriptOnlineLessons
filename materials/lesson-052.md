# レッスン52: 入力検証

## このレッスンで学ぶこと

ユーザーからの入力を受け取る際、その入力が正しい形式かどうかをチェックする**入力検証(バリデーション)**は非常に重要です。今回は、実践的な入力検証の方法を学びます。

## 入力検証とは

入力検証は、ユーザーが入力したデータが期待する形式や条件を満たしているかをチェックする処理です。

### なぜ入力検証が必要か

1. **エラーの防止**: 不正な入力でプログラムがエラーを起こすのを防ぐ
2. **データの整合性**: 正しい形式のデータだけを扱う
3. **ユーザー体験**: 入力ミスをわかりやすく伝える

## 基本的な検証パターン

### 1. 空文字チェック

最も基本的な検証です。

```javascript
let name = "";

if (name === "") {
  console.log("名前を入力してください");
}
```

### 2. 数値チェック

入力が数値かどうかをチェックします。

```javascript
let input = "abc";
let number = Number(input);

if (isNaN(number)) {
  console.log("数値を入力してください");
}
```

### 3. 長さチェック

文字列の長さをチェックします。

```javascript
let password = "abc";

if (password.length < 8) {
  console.log("パスワードは8文字以上にしてください");
}
```

## 実践的な入力検証

### 例1: 名前の検証

```javascript
function validateName() {
  const name = document.getElementById("name").value;
  const error = document.getElementById("error");

  error.textContent = "";

  // 空文字チェック
  if (name === "") {
    error.textContent = "名前を入力してください";
    return false;
  }

  // 長さチェック
  if (name.length < 2) {
    error.textContent = "名前は2文字以上入力してください";
    return false;
  }

  if (name.length > 20) {
    error.textContent = "名前は20文字以内で入力してください";
    return false;
  }

  return true;
}
```

### 例2: 年齢の検証

```javascript
function validateAge() {
  const ageValue = document.getElementById("age").value;
  const error = document.getElementById("error");

  error.textContent = "";

  // 空文字チェック
  if (ageValue === "") {
    error.textContent = "年齢を入力してください";
    return false;
  }

  // 数値チェック
  const age = Number(ageValue);
  if (isNaN(age)) {
    error.textContent = "年齢は数値で入力してください";
    return false;
  }

  // 範囲チェック
  if (age < 0 || age > 150) {
    error.textContent = "正しい年齢を入力してください";
    return false;
  }

  return true;
}
```

### 例3: メールアドレスの検証

```javascript
function validateEmail() {
  const email = document.getElementById("email").value;
  const error = document.getElementById("error");

  error.textContent = "";

  // 空文字チェック
  if (email === "") {
    error.textContent = "メールアドレスを入力してください";
    return false;
  }

  // @を含むかチェック
  if (email.indexOf("@") === -1) {
    error.textContent = "正しいメールアドレスを入力してください";
    return false;
  }

  return true;
}
```

## 複数フィールドの検証

複数の入力項目を一度に検証します。

```javascript
function validateForm() {
  const name = document.getElementById("name").value;
  const age = Number(document.getElementById("age").value);
  const email = document.getElementById("email").value;
  const error = document.getElementById("error");

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

  // 年齢の検証
  if (isNaN(age)) {
    error.textContent = "年齢は数値で入力してください";
    return false;
  }

  if (age < 0 || age > 150) {
    error.textContent = "正しい年齢を入力してください";
    return false;
  }

  // メールの検証
  if (email === "") {
    error.textContent = "メールアドレスを入力してください";
    return false;
  }

  if (email.indexOf("@") === -1) {
    error.textContent = "正しいメールアドレスを入力してください";
    return false;
  }

  // すべての検証を通過
  return true;
}
```

## 実践問題

以下の要件を満たすプログラムを作成してください。

### 問題: ユーザー登録フォーム

ユーザー登録の入力検証を行うプログラムを作成してください。

**検証項目:**
1. ユーザー名: 空でない、3文字以上15文字以内
2. パスワード: 空でない、6文字以上
3. 年齢: 数値である、13歳以上

**HTMLの構成:**
- id="username" のinput要素
- id="password" のinput要素
- id="age" のinput要素
- id="result" の結果表示エリア
- id="error" のエラー表示エリア

**動作:**
1. すべての入力を検証
2. 検証エラーがあれば、最初のエラーを表示
3. すべて正しければ「登録できます」を表示

## 早期リターンパターン

検証では、エラーが見つかったらすぐに処理を終了する**早期リターン**が有効です。

```javascript
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

  // すべての検証を通過
  const result = document.getElementById("result");
  result.textContent = "OK";
}
```

## エラーメッセージのポイント

### 1. 具体的に

```javascript
// 悪い例
error.textContent = "エラーです";

// 良い例
error.textContent = "名前は2文字以上入力してください";
```

### 2. わかりやすく

```javascript
// 悪い例
error.textContent = "Invalid input";

// 良い例
error.textContent = "名前を入力してください";
```

### 3. 解決方法を示す

```javascript
// 悪い例
error.textContent = "パスワードが短いです";

// 良い例
error.textContent = "パスワードは8文字以上で入力してください";
```

## 防御的プログラミング

想定外の入力に備えるプログラミング手法です。

### 例1: トリム処理

```javascript
// 前後の空白を削除
let name = document.getElementById("name").value.trim();

if (name === "") {
  error.textContent = "名前を入力してください";
  return;
}
```

### 例2: 大文字・小文字の統一

```javascript
let email = document.getElementById("email").value.toLowerCase();

// 小文字に統一して比較
if (email === "test@example.com") {
  console.log("一致しました");
}
```

### 例3: 境界値の確認

```javascript
let age = Number(document.getElementById("age").value);

// 負の数や大きすぎる数をチェック
if (age < 0 || age > 150) {
  error.textContent = "正しい年齢を入力してください";
  return;
}
```

## よくある検証パターン

### 1. 必須項目チェック

```javascript
if (value === "") {
  error.textContent = "この項目は必須です";
  return;
}
```

### 2. 最小・最大長チェック

```javascript
if (value.length < 3) {
  error.textContent = "3文字以上入力してください";
  return;
}

if (value.length > 20) {
  error.textContent = "20文字以内で入力してください";
  return;
}
```

### 3. 数値範囲チェック

```javascript
if (value < 0 || value > 100) {
  error.textContent = "0から100の範囲で入力してください";
  return;
}
```

### 4. 形式チェック

```javascript
// @を含むかチェック
if (email.indexOf("@") === -1) {
  error.textContent = "正しいメールアドレスを入力してください";
  return;
}
```

## 検証の順序

検証は適切な順序で行いましょう。

```javascript
function validate() {
  const ageValue = document.getElementById("age").value;

  // 1. 空文字チェック(最初)
  if (ageValue === "") {
    error.textContent = "年齢を入力してください";
    return;
  }

  // 2. 型チェック
  const age = Number(ageValue);
  if (isNaN(age)) {
    error.textContent = "数値を入力してください";
    return;
  }

  // 3. 範囲チェック(最後)
  if (age < 0 || age > 150) {
    error.textContent = "正しい年齢を入力してください";
    return;
  }

  // OK
  result.textContent = "正しい入力です";
}
```

## まとめ

- 入力検証はユーザー体験とデータの整合性のために重要です
- 基本的な検証: 空文字チェック、数値チェック、長さチェック
- 早期リターンで読みやすいコードを書きましょう
- エラーメッセージは具体的でわかりやすく
- 検証の順序: 空文字 → 型 → 範囲
- 防御的プログラミングで想定外の入力に備えましょう

次のレッスンでは、これまで学んだ知識を使ってクイズアプリを作成します。
