# レッスン43: 週のまとめプロジェクト

## なぜ重要なのか

これまで学んだ個別の技術を**統合**して、実用的なアプリケーションを作ることは、プログラミング学習において最も重要なステップです。

| 学習段階 | 内容 | 例 |
|---------|------|-----|
| 個別学習 | 1つの技術を学ぶ | if文だけを学ぶ |
| 統合学習 | 複数の技術を組み合わせる | if + バリデーション + 計算 |
| 実践 | 実用的なアプリを作る | プロフィール作成ツール |

**実際のアプリケーション**は、常に複数の技術を組み合わせています：

| サービス | 使われている技術の組み合わせ |
|---------|------------------------|
| Twitter投稿 | 入力 + バリデーション（280文字）+ 条件分岐（空チェック）+ エラー表示 |
| Gmail登録 | 入力 + バリデーション（メール形式、パスワード強度）+ 条件分岐 + エラー処理 |
| Amazon配送先 | 入力（住所）+ バリデーション（郵便番号、必須項目）+ 条件分岐（配送可能地域）|
| Facebook プロフィール | 入力（名前、年齢）+ バリデーション + 条件分岐（年齢制限）+ 表示 |

このレッスンでは、これまで学んだすべての技術を統合して、実用的なプロフィール作成ツールを作ります。

## これまで学んだこと

### レッスン33-36: 条件分岐の基礎
- ✅ if文の基本構文
- ✅ 比較演算子（`===`, `!==`, `>`, `<`, `>=`, `<=`）
- ✅ 文字列の比較
- ✅ 数値の比較
- ✅ 複数の独立した判定

### レッスン37-39: 高度な条件分岐
- ✅ else文（二択の判定）
- ✅ else if文（多分岐）
- ✅ ネスト（if文の中にif文）
- ✅ 条件の順序の重要性

### レッスン40: エラー処理
- ✅ isNaN()で数値チェック
- ✅ 空文字列チェック（`=== ""`）
- ✅ 0で割るチェック
- ✅ returnで処理を早期終了
- ✅ エラーメッセージの表示

### レッスン41-42: 入力とバリデーション
- ✅ promptとinputの比較
- ✅ 空文字チェック
- ✅ lengthプロパティで文字数チェック
- ✅ フィードバック表示（色分け）
- ✅ リアルタイムバリデーション

## プロジェクト概要

### 作成するもの：プロフィール作成ツール

**機能**：
1. 名前の入力（2文字以上）
2. 年齢の入力（0〜150の数値）
3. プロフィールの自動生成
4. 年齢グループの判定（未成年・成人・シニア）
5. 詳細なエラーメッセージ表示

**使用する技術**：
- ✅ input要素からの値取得
- ✅ 空文字チェック
- ✅ 長さチェック（length）
- ✅ 数値チェック（isNaN）
- ✅ 範囲チェック（0〜150）
- ✅ 多分岐（else if）
- ✅ 早期リターン（return）
- ✅ 文字列連結
- ✅ エラー表示

## 動作の流れ

### 全体フロー

```
【ユーザー操作】
名前を入力 → 「太郎」
年齢を入力 → 「25」
   ↓
【ボタンクリック】
「プロフィール作成」をクリック
   ↓
【バリデーション開始】
   ↓
❶ 名前の空文字チェック
   └→ 空？ → YES → エラー表示 → 終了
       ↓ NO
❷ 名前の長さチェック
   └→ 2文字未満？ → YES → エラー表示 → 終了
       ↓ NO
❸ 年齢の空文字チェック
   └→ 空？ → YES → エラー表示 → 終了
       ↓ NO
❹ 年齢の数値チェック
   └→ 数値でない？ → YES → エラー表示 → 終了
       ↓ NO
❺ 年齢の範囲チェック
   └→ 0〜150外？ → YES → エラー表示 → 終了
       ↓ NO
【プロフィール生成】
   ↓
❻ 年齢グループ判定
   18歳未満 → 「未成年」
   18〜64歳 → 「成人」
   65歳以上 → 「シニア」
   ↓
❷ 結果表示
「名前: 太郎
 年齢: 25歳
 グループ: 成人」
```

### バリデーションの優先順位

```
【優先順位1】空文字チェック
   ↓
【優先順位2】形式チェック（長さ、数値）
   ↓
【優先順位3】範囲チェック
   ↓
【優先順位4】正常処理
```

**理由**：
- より基本的なエラーを先にチェック
- ユーザーに分かりやすいメッセージの順序
- 処理の効率化

## 段階的な実装

### ステップ1: 基本構造（HTML）

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>プロフィール作成ツール</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    section {
      margin: 30px 0;
      padding: 20px;
      border: 2px solid #ddd;
      border-radius: 10px;
    }
    .form-group {
      margin: 15px 0;
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
      padding: 12px 30px;
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
    #error {
      color: #f44336;
      font-weight: bold;
      margin-top: 10px;
    }
    #result {
      color: #2e7d32;
      font-size: 18px;
      white-space: pre-line;
      background-color: #e8f5e9;
      padding: 15px;
      border-radius: 5px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <h1>プロフィール作成ツール</h1>

  <section>
    <h2>📝 情報入力</h2>
    <div class="form-group">
      <label>名前（2文字以上）:</label>
      <input id="name" type="text" placeholder="山田太郎">
    </div>
    <div class="form-group">
      <label>年齢（0〜150）:</label>
      <input id="age" type="text" placeholder="25">
    </div>
    <button onclick="createProfile()">プロフィール作成</button>
  </section>

  <section>
    <h2>📄 結果</h2>
    <div id="error"></div>
    <div id="result"></div>
  </section>

  <script src="script.js"></script>
</body>
</html>
```

### ステップ2: 基本機能（バリデーションなし）

まず、最もシンプルな実装から始めます。

```javascript
function createProfile() {
  // 値を取得
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const result = document.getElementById("result");

  // プロフィール作成
  result.textContent = "名前: " + name + "\n年齢: " + age;
}
```

**問題点**：
- 空文字でも実行される
- 年齢が文字列でも実行される
- エラーチェックがない

### ステップ3: 空文字チェックを追加

```javascript
function createProfile() {
  const name = document.getElementById("name").value;
  const ageValue = document.getElementById("age").value;
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  // 表示をクリア
  result.textContent = "";
  error.textContent = "";

  // 空文字チェック
  if (name === "" || ageValue === "") {
    error.textContent = "すべての項目を入力してください";
    return;
  }

  // プロフィール作成
  result.textContent = "名前: " + name + "\n年齢: " + ageValue;
}
```

**改善点**：
- 空文字の場合、エラーメッセージを表示
- returnで早期終了

### ステップ4: 詳細なバリデーションを追加

```javascript
function createProfile() {
  const name = document.getElementById("name").value;
  const ageValue = document.getElementById("age").value;
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  // 表示をクリア
  result.textContent = "";
  error.textContent = "";

  // ❶ 名前の空文字チェック
  if (name === "") {
    error.textContent = "名前を入力してください";
    return;
  }

  // ❷ 名前の長さチェック
  if (name.length < 2) {
    error.textContent = "名前は2文字以上入力してください";
    return;
  }

  // ❸ 年齢の空文字チェック
  if (ageValue === "") {
    error.textContent = "年齢を入力してください";
    return;
  }

  // ❹ 年齢の数値変換
  const age = Number(ageValue);

  // ❺ 年齢の数値チェック
  if (isNaN(age)) {
    error.textContent = "年齢は数値で入力してください";
    return;
  }

  // ❻ 年齢の範囲チェック
  if (age < 0 || age > 150) {
    error.textContent = "年齢は0〜150の範囲で入力してください";
    return;
  }

  // プロフィール作成
  result.textContent = "名前: " + name + "\n年齢: " + age + "歳";
}
```

### ステップ5: 年齢グループ判定を追加（完成版）

```javascript
function createProfile() {
  const name = document.getElementById("name").value;
  const ageValue = document.getElementById("age").value;
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  // 表示をクリア
  result.textContent = "";
  error.textContent = "";

  // ❶ 名前の空文字チェック
  if (name === "") {
    error.textContent = "❌ 名前を入力してください";
    return;
  }

  // ❷ 名前の長さチェック
  if (name.length < 2) {
    error.textContent = "❌ 名前は2文字以上入力してください（現在" + name.length + "文字）";
    return;
  }

  // ❸ 年齢の空文字チェック
  if (ageValue === "") {
    error.textContent = "❌ 年齢を入力してください";
    return;
  }

  // ❹ 年齢の数値変換
  const age = Number(ageValue);

  // ❺ 年齢の数値チェック
  if (isNaN(age)) {
    error.textContent = "❌ 年齢は数値で入力してください";
    return;
  }

  // ❻ 年齢の範囲チェック
  if (age < 0 || age > 150) {
    error.textContent = "❌ 年齢は0〜150の範囲で入力してください";
    return;
  }

  // ❼ プロフィール作成
  let profile = "✅ プロフィールを作成しました\n\n";
  profile = profile + "名前: " + name + "\n";
  profile = profile + "年齢: " + age + "歳\n";

  // ❽ 年齢グループの判定
  if (age < 18) {
    profile = profile + "グループ: 未成年";
  } else if (age < 65) {
    profile = profile + "グループ: 成人";
  } else {
    profile = profile + "グループ: シニア";
  }

  // ❾ 結果表示
  result.textContent = profile;
}
```

## 詳細解説

### 1. 表示のクリア

```javascript
result.textContent = "";
error.textContent = "";
```

**なぜ必要か**：
- 前回のエラーメッセージが残らないようにする
- 前回の結果が残らないようにする
- 常にクリーンな状態から始める

### 2. バリデーションの順序

```javascript
// ❶ 名前の空文字チェック
if (name === "") { return; }

// ❷ 名前の長さチェック
if (name.length < 2) { return; }

// ❸ 年齢の空文字チェック
if (ageValue === "") { return; }

// ❹ 数値変換
const age = Number(ageValue);

// ❺ 数値チェック
if (isNaN(age)) { return; }

// ❻ 範囲チェック
if (age < 0 || age > 150) { return; }
```

**順序の理由**：

| 順序 | チェック | 理由 |
|-----|---------|------|
| 1 | 名前の空文字 | 最も基本的なチェック |
| 2 | 名前の長さ | 形式チェック |
| 3 | 年齢の空文字 | 最も基本的なチェック |
| 4 | 数値変換 | チェックに必要 |
| 5 | 数値チェック | 形式チェック |
| 6 | 範囲チェック | 詳細なチェック |

### 3. ||（OR）演算子の使い方

```javascript
// 範囲チェック
if (age < 0 || age > 150) {
  error.textContent = "年齢は0〜150の範囲で入力してください";
  return;
}
```

**意味**：
- `age < 0`：年齢が0未満
- `||`：または
- `age > 150`：年齢が150より大きい
- **どちらか一方でも**真なら、if文の中を実行

| age | age < 0 | age > 150 | 結果 |
|-----|---------|-----------|------|
| -5 | true | false | true（エラー） |
| 0 | false | false | false（OK） |
| 25 | false | false | false（OK） |
| 150 | false | false | false（OK） |
| 200 | false | true | true（エラー） |

### 4. 文字列の連結

```javascript
let profile = "✅ プロフィールを作成しました\n\n";
profile = profile + "名前: " + name + "\n";
profile = profile + "年齢: " + age + "歳\n";
```

**ポイント**：
- `\n`は改行を表す
- `profile = profile + "追加文字列"`で文字列を追加
- 変数を使い回すことで、段階的に文字列を構築

**結果**：
```
✅ プロフィールを作成しました

名前: 太郎
年齢: 25歳
グループ: 成人
```

### 5. 年齢グループの判定

```javascript
if (age < 18) {
  profile = profile + "グループ: 未成年";
} else if (age < 65) {
  profile = profile + "グループ: 成人";
} else {
  profile = profile + "グループ: シニア";
}
```

**判定ロジック**：

| 年齢 | 条件1 (< 18) | 条件2 (< 65) | 結果 |
|-----|------------|------------|------|
| 10 | true | - | 未成年 |
| 17 | true | - | 未成年 |
| 18 | false | true | 成人 |
| 25 | false | true | 成人 |
| 64 | false | true | 成人 |
| 65 | false | false | シニア |
| 80 | false | false | シニア |

## 拡張機能

### 拡張1: リセットボタン

**HTML追加**：
```html
<button onclick="resetForm()">リセット</button>
```

**JavaScript追加**：
```javascript
function resetForm() {
  // 入力欄をクリア
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";

  // 表示をクリア
  document.getElementById("result").textContent = "";
  document.getElementById("error").textContent = "";
}
```

### 拡張2: 趣味の追加（任意項目）

**HTML追加**：
```html
<div class="form-group">
  <label>趣味（任意）:</label>
  <input id="hobby" type="text" placeholder="読書">
</div>
```

**JavaScript追加**：
```javascript
const hobby = document.getElementById("hobby").value;

// 趣味が入力されている場合のみ追加
if (hobby !== "") {
  profile = profile + "\n趣味: " + hobby;
}
```

### 拡張3: 住所の追加（必須項目）

**HTML追加**：
```html
<div class="form-group">
  <label>住所:</label>
  <input id="address" type="text" placeholder="東京都">
</div>
```

**JavaScript追加**：
```javascript
const address = document.getElementById("address").value;

// 住所の空文字チェック（年齢チェックの後に追加）
if (address === "") {
  error.textContent = "❌ 住所を入力してください";
  return;
}

// プロフィールに追加
profile = profile + "住所: " + address + "\n";
```

### 拡張4: 文字数カウンター

**HTML追加**：
```html
<div class="form-group">
  <label>自己紹介（100文字まで）:</label>
  <textarea id="bio" oninput="countBio()" rows="3"></textarea>
  <div id="bio-counter">0 / 100</div>
</div>
```

**JavaScript追加**：
```javascript
function countBio() {
  const bio = document.getElementById("bio").value;
  const counter = document.getElementById("bio-counter");
  counter.textContent = bio.length + " / 100";

  if (bio.length > 100) {
    counter.style.color = "red";
  } else {
    counter.style.color = "black";
  }
}

// createProfile関数内に追加
const bio = document.getElementById("bio").value;

if (bio.length > 100) {
  error.textContent = "❌ 自己紹介は100文字以内で入力してください";
  return;
}

if (bio !== "") {
  profile = profile + "\n自己紹介: " + bio;
}
```

## 完成版コード

### HTML（完成版）

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>プロフィール作成ツール</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    section {
      margin: 30px 0;
      padding: 20px;
      background-color: white;
      border: 2px solid #ddd;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .form-group {
      margin: 15px 0;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }
    input {
      padding: 10px;
      font-size: 16px;
      width: 100%;
      box-sizing: border-box;
      border: 2px solid #ddd;
      border-radius: 5px;
    }
    input:focus {
      outline: none;
      border-color: #4CAF50;
    }
    button {
      padding: 12px 30px;
      font-size: 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
      margin-right: 10px;
    }
    button:hover {
      background-color: #45a049;
    }
    .reset-btn {
      background-color: #9E9E9E;
    }
    .reset-btn:hover {
      background-color: #757575;
    }
    #error {
      color: #f44336;
      font-weight: bold;
      margin-top: 10px;
      padding: 10px;
      background-color: #ffebee;
      border-radius: 5px;
      display: none;
    }
    #error:not(:empty) {
      display: block;
    }
    #result {
      color: #2e7d32;
      font-size: 18px;
      white-space: pre-line;
      background-color: #e8f5e9;
      padding: 15px;
      border-radius: 5px;
      margin-top: 10px;
      display: none;
    }
    #result:not(:empty) {
      display: block;
    }
  </style>
</head>
<body>
  <h1>📋 プロフィール作成ツール</h1>

  <section>
    <h2>📝 情報入力</h2>
    <div class="form-group">
      <label>名前（2文字以上）:</label>
      <input id="name" type="text" placeholder="山田太郎">
    </div>
    <div class="form-group">
      <label>年齢（0〜150）:</label>
      <input id="age" type="text" placeholder="25">
    </div>
    <button onclick="createProfile()">プロフィール作成</button>
    <button class="reset-btn" onclick="resetForm()">リセット</button>
  </section>

  <section>
    <h2>📄 結果</h2>
    <div id="error"></div>
    <div id="result"></div>
  </section>

  <script>
    function createProfile() {
      const name = document.getElementById("name").value;
      const ageValue = document.getElementById("age").value;
      const result = document.getElementById("result");
      const error = document.getElementById("error");

      // 表示をクリア
      result.textContent = "";
      error.textContent = "";

      // ❶ 名前の空文字チェック
      if (name === "") {
        error.textContent = "❌ 名前を入力してください";
        return;
      }

      // ❷ 名前の長さチェック
      if (name.length < 2) {
        error.textContent = "❌ 名前は2文字以上入力してください（現在" + name.length + "文字）";
        return;
      }

      // ❸ 年齢の空文字チェック
      if (ageValue === "") {
        error.textContent = "❌ 年齢を入力してください";
        return;
      }

      // ❹ 年齢の数値変換
      const age = Number(ageValue);

      // ❺ 年齢の数値チェック
      if (isNaN(age)) {
        error.textContent = "❌ 年齢は数値で入力してください";
        return;
      }

      // ❻ 年齢の範囲チェック
      if (age < 0 || age > 150) {
        error.textContent = "❌ 年齢は0〜150の範囲で入力してください";
        return;
      }

      // ❼ プロフィール作成
      let profile = "✅ プロフィールを作成しました\n\n";
      profile = profile + "名前: " + name + "\n";
      profile = profile + "年齢: " + age + "歳\n";

      // ❽ 年齢グループの判定
      if (age < 18) {
        profile = profile + "グループ: 未成年";
      } else if (age < 65) {
        profile = profile + "グループ: 成人";
      } else {
        profile = profile + "グループ: シニア";
      }

      // ❾ 結果表示
      result.textContent = profile;
    }

    function resetForm() {
      // 入力欄をクリア
      document.getElementById("name").value = "";
      document.getElementById("age").value = "";

      // 表示をクリア
      document.getElementById("result").textContent = "";
      document.getElementById("error").textContent = "";
    }
  </script>
</body>
</html>
```

## 練習問題

### 問題1: 基本的なプロフィール作成

名前と年齢を入力して、プロフィールを作成するプログラムを作成してください。

**仕様**：
- 名前が空の場合: 「名前を入力してください」と表示
- 年齢が空の場合: 「年齢を入力してください」と表示
- 両方入力されている場合: 「名前: 〇〇, 年齢: 〇〇」と表示

<details>
<summary>💡 ヒント1: 全体の流れ</summary>

```
1. 名前と年齢を取得
2. 表示をクリア
3. 名前の空文字チェック
4. 年齢の空文字チェック
5. プロフィール表示
```
</details>

<details>
<summary>💡 ヒント2: 空文字チェック</summary>

```javascript
if (name === "") {
  error.textContent = "名前を入力してください";
  return;
}

if (age === "") {
  error.textContent = "年齢を入力してください";
  return;
}
```
</details>

<details>
<summary>💡 ヒント3: HTML構造</summary>

```html
<input id="name" type="text">
<input id="age" type="text">
<button onclick="createProfile()">作成</button>
<p id="error" style="color: red;"></p>
<p id="result"></p>
```
</details>

<details>
<summary>💡 ヒント4: 関数の骨組み</summary>

```javascript
function createProfile() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const error = document.getElementById("error");
  const result = document.getElementById("result");

  // クリア
  error.textContent = "";
  result.textContent = "";

  // チェック処理

  // 表示
}
```
</details>

<details>
<summary>💡 ヒント5: 文字列連結</summary>

```javascript
result.textContent = "名前: " + name + ", 年齢: " + age;
```
</details>

<details>
<summary>💡 ヒント6: returnの使い方</summary>

エラーを検出したら、`return`で関数を終了します。
</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <title>プロフィール作成</title>
</head>
<body>
  <h1>プロフィール作成</h1>
  <input id="name" type="text" placeholder="名前">
  <input id="age" type="text" placeholder="年齢">
  <button onclick="createProfile()">作成</button>
  <p id="error" style="color: red;"></p>
  <p id="result"></p>

  <script>
    function createProfile() {
      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const error = document.getElementById("error");
      const result = document.getElementById("result");

      error.textContent = "";
      result.textContent = "";

      if (name === "") {
        error.textContent = "名前を入力してください";
        return;
      }

      if (age === "") {
        error.textContent = "年齢を入力してください";
        return;
      }

      result.textContent = "名前: " + name + ", 年齢: " + age;
    }
  </script>
</body>
</html>
```
</details>

### 問題2: バリデーション追加

問題1に以下のバリデーションを追加してください。

**仕様**：
- 名前は2文字以上
- 年齢は数値
- 年齢は0以上150以下

<details>
<summary>💡 ヒント1: チェックの順序</summary>

```
1. 名前の空文字チェック
2. 名前の長さチェック
3. 年齢の空文字チェック
4. 年齢の数値チェック
5. 年齢の範囲チェック
6. プロフィール表示
```
</details>

<details>
<summary>💡 ヒント2: 長さチェック</summary>

```javascript
if (name.length < 2) {
  error.textContent = "名前は2文字以上入力してください";
  return;
}
```
</details>

<details>
<summary>💡 ヒント3: 数値チェック</summary>

```javascript
const ageNum = Number(age);

if (isNaN(ageNum)) {
  error.textContent = "年齢は数値で入力してください";
  return;
}
```
</details>

<details>
<summary>💡 ヒント4: 範囲チェック</summary>

```javascript
if (ageNum < 0 || ageNum > 150) {
  error.textContent = "年齢は0〜150で入力してください";
  return;
}
```
</details>

<details>
<summary>💡 ヒント5: 完全な順序</summary>

```javascript
// 1. 名前の空文字
// 2. 名前の長さ
// 3. 年齢の空文字
// 4. 数値変換
// 5. 数値チェック
// 6. 範囲チェック
// 7. 表示
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
function createProfile() {
  const name = document.getElementById("name").value;
  const ageValue = document.getElementById("age").value;
  const error = document.getElementById("error");
  const result = document.getElementById("result");

  error.textContent = "";
  result.textContent = "";

  if (name === "") {
    error.textContent = "名前を入力してください";
    return;
  }

  if (name.length < 2) {
    error.textContent = "名前は2文字以上入力してください";
    return;
  }

  if (ageValue === "") {
    error.textContent = "年齢を入力してください";
    return;
  }

  const age = Number(ageValue);

  if (isNaN(age)) {
    error.textContent = "年齢は数値で入力してください";
    return;
  }

  if (age < 0 || age > 150) {
    error.textContent = "年齢は0〜150の範囲で入力してください";
    return;
  }

  result.textContent = "名前: " + name + ", 年齢: " + age + "歳";
}
```
</details>

### 問題3: 拡張機能

問題2に以下の機能を追加してください。

**仕様**：
- 年齢グループの判定（18歳未満、18歳以上65歳未満、65歳以上）
- リセットボタン

<details>
<summary>💡 ヒント1: 年齢グループ判定</summary>

```javascript
let profile = "名前: " + name + "\n年齢: " + age + "歳\n";

if (age < 18) {
  profile = profile + "グループ: 未成年";
} else if (age < 65) {
  profile = profile + "グループ: 成人";
} else {
  profile = profile + "グループ: シニア";
}
```
</details>

<details>
<summary>💡 ヒント2: リセット関数</summary>

```javascript
function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("error").textContent = "";
  document.getElementById("result").textContent = "";
}
```
</details>

<details>
<summary>💡 ヒント3: リセットボタンHTML</summary>

```html
<button onclick="resetForm()">リセット</button>
```
</details>

<details>
<summary>💡 ヒント4: 改行の使い方</summary>

`\n`で改行できます。`white-space: pre-line;`をCSSで設定すると改行が表示されます。
</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <title>プロフィール作成（完成版）</title>
  <style>
    #result {
      white-space: pre-line;
    }
  </style>
</head>
<body>
  <h1>プロフィール作成</h1>
  <input id="name" type="text" placeholder="名前">
  <input id="age" type="text" placeholder="年齢">
  <button onclick="createProfile()">作成</button>
  <button onclick="resetForm()">リセット</button>
  <p id="error" style="color: red;"></p>
  <p id="result"></p>

  <script>
    function createProfile() {
      const name = document.getElementById("name").value;
      const ageValue = document.getElementById("age").value;
      const error = document.getElementById("error");
      const result = document.getElementById("result");

      error.textContent = "";
      result.textContent = "";

      if (name === "") {
        error.textContent = "名前を入力してください";
        return;
      }

      if (name.length < 2) {
        error.textContent = "名前は2文字以上入力してください";
        return;
      }

      if (ageValue === "") {
        error.textContent = "年齢を入力してください";
        return;
      }

      const age = Number(ageValue);

      if (isNaN(age)) {
        error.textContent = "年齢は数値で入力してください";
        return;
      }

      if (age < 0 || age > 150) {
        error.textContent = "年齢は0〜150の範囲で入力してください";
        return;
      }

      let profile = "名前: " + name + "\n";
      profile = profile + "年齢: " + age + "歳\n";

      if (age < 18) {
        profile = profile + "グループ: 未成年";
      } else if (age < 65) {
        profile = profile + "グループ: 成人";
      } else {
        profile = profile + "グループ: シニア";
      }

      result.textContent = profile;
    }

    function resetForm() {
      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("error").textContent = "";
      document.getElementById("result").textContent = "";
    }
  </script>
</body>
</html>
```
</details>

## チェックリスト

このレッスンを終える前に、以下の項目を確認してください。

- [ ] これまで学んだ技術を統合できる
- [ ] バリデーションを正しい順序で実装できる
- [ ] returnで早期終了できる
- [ ] ||（OR）演算子を使って範囲チェックができる
- [ ] 文字列連結で複数行のテキストを作成できる
- [ ] else ifで多分岐の判定ができる
- [ ] 表示のクリアの重要性を理解している
- [ ] エラーメッセージと結果表示を使い分けられる
- [ ] リセット機能を実装できる
- [ ] 実用的なアプリケーションの構造を理解している

## できるようになったこと

このレッスンを終えると、以下のことができるようになります。

1. ✅ **複数の技術を統合する**
   - 入力 + バリデーション + 条件分岐 + 表示
   - 実用的なアプリケーションの構造を理解

2. ✅ **段階的なバリデーションを実装する**
   - 正しい順序でチェック
   - 早期リターンで効率化

3. ✅ **||（OR）演算子を使う**
   - 範囲チェックに活用
   - 複数条件の組み合わせ

4. ✅ **文字列連結でテキストを構築する**
   - 改行を含む複数行テキスト
   - 段階的な文字列の構築

5. ✅ **多分岐で判定する**
   - else ifで年齢グループ判定
   - 条件の順序を考慮

6. ✅ **表示のクリアを適切に行う**
   - 前回の表示を消す
   - クリーンな状態から始める

7. ✅ **リセット機能を実装する**
   - 入力欄と表示をクリア
   - ユーザビリティ向上

8. ✅ **実用的なアプリケーションを作る**
   - すべての知識を総動員
   - 完成度の高いプログラム

## まとめ

このレッスンでは、以下のことを学びました。

1. **統合的な実装**
   - これまで学んだ個別の技術を組み合わせる
   - 実用的なアプリケーションの構造

2. **バリデーションの順序**
   - 空文字 → 形式（長さ、数値）→ 範囲
   - より基本的なチェックを優先

3. **早期リターン**
   - returnでエラー時に即座に終了
   - ネストを減らしてコードを読みやすく

4. **||（OR）演算子**
   - 範囲チェックに使用
   - どちらか一方でも真なら実行

5. **文字列連結**
   - `\n`で改行
   - 段階的に文字列を構築

6. **多分岐の判定**
   - else ifで複数のグループに分類
   - 条件の順序が重要

7. **表示のクリア**
   - 関数の最初でクリア
   - エラーと結果を適切に管理

8. **実用的な機能**
   - リセットボタン
   - ユーザーフレンドリーなUI

これまで学んだすべての知識を統合して、実用的なプロフィール作成ツールを作ることができました。

## 次のステップ

次のレッスンでは、**AND演算子（&&）**について学びます。

OR演算子（||）は「どちらか一方」でしたが、AND演算子（&&）は「両方とも」という条件を表します。以下のことを学びます。

- &&の基本的な使い方
- 複数の条件をすべて満たすチェック
- 免許証チェック（年齢 && 免許所持）
- ネストとの比較

より複雑な条件判定ができるようになりましょう。