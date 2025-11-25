# レッスン41: 入力方法の比較

## なぜ重要なのか

ユーザーから情報を受け取る方法は、アプリケーションの使いやすさ（UX: User Experience）に大きく影響します。以下は、実際のサービスで使われている入力方法の例です。

| サービス | 入力方法 | 理由 |
|---------|---------|------|
| Google検索 | input要素 | 検索キーワードを見ながら調整できる |
| Twitter | input/textarea | 複数の入力（ツイート本文、画像、ハッシュタグ）を同時に扱う |
| JavaScript Alert | prompt/confirm | 簡単な確認や一時的な入力に使う（古い手法） |
| Amazon | input要素 | 住所、クレジットカード番号など多数の情報を入力 |
| ブラウザのブックマーク | prompt | 簡単な名前入力（一時的な使用） |

現代のWebアプリケーションでは、ほとんどの場合**input要素**を使います。promptは学習用や簡単なテストに使われます。

## 基本概念の説明

### 3つの入力方法

JavaScriptでユーザーから値を受け取る方法は、主に3つあります。

#### 1. 変数に直接代入

```javascript
let age = 20;
let name = "太郎";
```

```
【特徴】
- プログラマーが値を決める
- ユーザーは値を変更できない
- テストやデバッグに使う
```

#### 2. input要素（HTML）

```html
<input id="name" type="text">
```

```javascript
const name = document.getElementById("name").value;
```

```
【特徴】
- ページに入力欄が表示される
- ユーザーが自由に入力できる
- 実用的なアプリケーションで使う
```

#### 3. prompt（ポップアップ）

```javascript
const name = prompt("名前を入力してください");
```

```
【特徴】
- ポップアップウィンドウが表示される
- 入力するまで次に進めない
- 学習用や簡単なテストに使う
```

### promptとは

**prompt()**は、ダイアログボックス（ポップアップウィンドウ）を表示してユーザーに入力を求める関数です。

```
【promptの動作】
ボタンクリック
   ↓
prompt()実行
   ↓
┌─────────────────────┐
│ 名前を入力してください    │
│ ┌───────────────┐    │
│ │               │    │
│ └───────────────┘    │
│  [OK]  [キャンセル]    │
└─────────────────────┘
   ↓
入力完了（OKクリック）
   ↓
入力値が変数に代入される
   ↓
次の処理
```

### confirmとalert

promptと似た関数に、**confirm()**と**alert()**があります。

| 関数 | 用途 | 戻り値 | 入力欄 |
|-----|------|--------|--------|
| prompt() | 文字列の入力 | 文字列 または null | ✅ あり |
| confirm() | はい/いいえの確認 | true または false | ❌ なし |
| alert() | メッセージの表示 | undefined | ❌ なし |

```javascript
// prompt: 入力を受け取る
const name = prompt("名前は？");  // "太郎" または null

// confirm: はい/いいえを受け取る
const ok = confirm("削除しますか？");  // true または false

// alert: メッセージを表示するだけ
alert("完了しました");  // undefined
```

## 動作の流れ

### promptの動作フロー

```
【promptを使った場合】
1. ボタンクリック
   ↓
2. prompt()実行
   ↓
3. ポップアップ表示（他の操作は一時停止）
   ↓
4. ユーザーが入力
   ↓
5. OKボタンクリック → 入力値を取得
   または
   キャンセルクリック → nullを取得
   ↓
6. 次の処理を実行
```

### input要素の動作フロー

```
【input要素を使った場合】
1. ページ読み込み
   ↓
2. input要素が表示される（いつでも入力可能）
   ↓
3. ユーザーが入力（他の操作も可能）
   ↓
4. ボタンクリック
   ↓
5. .valueで値を取得
   ↓
6. 処理を実行
```

### promptとinputの比較フロー

```
【prompt】
ボタンクリック → ポップアップ → 入力 → OK → 処理
                    ↑
                 他の操作不可


【input】
ページ表示 → 入力欄表示
                ↓
             自由に入力（他の操作も可能）
                ↓
          ボタンクリック → 処理
```

## 詳細解説

### 1. promptの基本的な使い方

```javascript
function greet() {
  const name = prompt("あなたの名前は？");
  const elem = document.getElementById("result");
  elem.textContent = "こんにちは、" + name + "さん";
}
```

**promptの構文**：
```javascript
const 変数 = prompt("メッセージ");
```

**promptの戻り値**：
- ユーザーが入力してOKを押した → 入力した文字列
- ユーザーがキャンセルを押した → `null`
- 何も入力せずOKを押した → `""`（空文字列）

| 操作 | 戻り値 | typeof |
|-----|--------|--------|
| "太郎"と入力してOK | "太郎" | "string" |
| 何も入力せずOK | "" | "string" |
| キャンセル | null | "object" |

### 2. promptのキャンセル処理

```javascript
function checkInput() {
  const name = prompt("名前を入力してください");

  if (name === null) {
    // キャンセルされた場合
    const elem = document.getElementById("result");
    elem.textContent = "キャンセルされました";
  } else if (name === "") {
    // 空文字列の場合
    const elem = document.getElementById("result");
    elem.textContent = "名前が入力されていません";
  } else {
    // 正常に入力された場合
    const elem = document.getElementById("result");
    elem.textContent = "こんにちは、" + name + "さん";
  }
}
```

**重要**：キャンセルのチェックは、空文字列のチェックより**先**に行います。

```
【チェックの順序】
1. null（キャンセル）をチェック
2. ""（空文字列）をチェック
3. 正常な入力
```

### 3. input要素との比較

**promptの場合**：
```javascript
function usePrompt() {
  const name = prompt("名前を入力してください");
  const elem = document.getElementById("result");
  elem.textContent = "こんにちは、" + name + "さん";
}
```

**input要素の場合**：
```html
<input id="name" type="text">
<button onclick="useInput()">実行</button>
```

```javascript
function useInput() {
  const name = document.getElementById("name").value;
  const elem = document.getElementById("result");
  elem.textContent = "こんにちは、" + name + "さん";
}
```

| 特徴 | prompt | input要素 |
|-----|--------|----------|
| 表示場所 | ポップアップ | ページ上 |
| 他の操作 | できない（ブロック） | できる |
| 見た目 | ブラウザ依存（変更不可） | CSS自由 |
| 入力欄の残存 | 消える | 残る |
| 複数入力 | 1つずつ順番 | 同時に可能 |
| 実用性 | 低い（学習用） | 高い（実用） |

### 4. promptの利点

```javascript
function simpleCalculator() {
  const num1 = prompt("1つ目の数値を入力");
  const num2 = prompt("2つ目の数値を入力");
  const result = Number(num1) + Number(num2);
  const elem = document.getElementById("result");
  elem.textContent = "答え: " + result;
}
```

**promptの利点**：
1. **HTMLが不要** - input要素を作らなくて良い
2. **シンプル** - 1行で入力を受け取れる
3. **順序制御** - 1つずつ順番に入力させられる
4. **学習に最適** - JavaScriptの基本を学ぶのに便利

### 5. input要素の利点

```html
<input id="num1" type="text" placeholder="1つ目の数値">
<input id="num2" type="text" placeholder="2つ目の数値">
<button onclick="calculator()">計算</button>
```

```javascript
function calculator() {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;
  const result = Number(num1) + Number(num2);
  const elem = document.getElementById("result");
  elem.textContent = "答え: " + result;
}
```

**input要素の利点**：
1. **視覚的** - 入力欄が常に見える
2. **柔軟** - いつでも修正できる
3. **複数入力** - 複数の値を同時に表示
4. **デザイン** - CSSで自由にスタイリング
5. **UX** - ユーザーフレンドリー
6. **実用的** - 実際のアプリケーションで使われる

### 6. confirmの使い方

```javascript
function deleteItem() {
  const confirmed = confirm("本当に削除しますか？");

  if (confirmed) {
    // OKが押された場合（true）
    const elem = document.getElementById("result");
    elem.textContent = "削除しました";
  } else {
    // キャンセルが押された場合（false）
    const elem = document.getElementById("result");
    elem.textContent = "キャンセルしました";
  }
}
```

**confirmの戻り値**：
- OKボタン → `true`
- キャンセルボタン → `false`

**confirm vs prompt**：
- **confirm**: はい/いいえの2択 → boolean（true/false）
- **prompt**: 文字列の入力 → string または null

## よくある間違い

### ❌ 間違い1: promptの戻り値をチェックしない

```javascript
// ❌ 間違い
function greet() {
  const name = prompt("名前を入力してください");
  const elem = document.getElementById("result");
  elem.textContent = "こんにちは、" + name + "さん";
  // キャンセルすると "こんにちは、nullさん" と表示される
}
```

```javascript
// ✅ 正しい
function greet() {
  const name = prompt("名前を入力してください");

  if (name === null) {
    return;  // キャンセル時は何もしない
  }

  const elem = document.getElementById("result");
  elem.textContent = "こんにちは、" + name + "さん";
}
```

**エラーメッセージ**：なし（表示が不自然になるだけ）

### ❌ 間違い2: promptの結果を数値として扱う

```javascript
// ❌ 間違い
function add() {
  const num1 = prompt("1つ目の数値");
  const num2 = prompt("2つ目の数値");
  const result = num1 + num2;  // 文字列連結になる
  console.log(result);  // "1020"（102ではない）
}
```

```javascript
// ✅ 正しい
function add() {
  const num1 = prompt("1つ目の数値");
  const num2 = prompt("2つ目の数値");
  const result = Number(num1) + Number(num2);  // 数値変換
  console.log(result);  // 30
}
```

**理由**：promptの戻り値は**常に文字列**

### ❌ 間違い3: 空文字列とnullを区別しない

```javascript
// ❌ 間違い
function check() {
  const name = prompt("名前を入力");

  if (name === "") {
    console.log("入力なし");
  }
  // nullの場合が処理されない
}
```

```javascript
// ✅ 正しい
function check() {
  const name = prompt("名前を入力");

  if (name === null) {
    console.log("キャンセルされました");
    return;
  }

  if (name === "") {
    console.log("入力されていません");
    return;
  }

  console.log("入力: " + name);
}
```

**理由**：
- キャンセル → `null`
- 空入力でOK → `""`

### ❌ 間違い4: confirmの戻り値を文字列と比較

```javascript
// ❌ 間違い
function check() {
  const result = confirm("削除しますか？");

  if (result === "true") {  // 文字列と比較
    console.log("削除");
  }
  // 常にfalseになる
}
```

```javascript
// ✅ 正しい
function check() {
  const result = confirm("削除しますか？");

  if (result === true) {  // booleanと比較
    console.log("削除");
  }
  // またはシンプルに
  if (result) {
    console.log("削除");
  }
}
```

**理由**：confirmは**boolean**（true/false）を返す

### ❌ 間違い5: promptを実用アプリで使う

```javascript
// ❌ 非推奨（学習用はOK）
function register() {
  const name = prompt("名前");
  const email = prompt("メール");
  const password = prompt("パスワード");
  // 実用アプリではinput要素を使うべき
}
```

```javascript
// ✅ 正しい（実用アプリ）
function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  // input要素を使う
}
```

**理由**：promptは古い手法で、UXが悪い

### ❌ 間違い6: input.valueを取得せずに要素を使う

```javascript
// ❌ 間違い
function check() {
  const input = document.getElementById("name");  // 要素自体
  console.log(input);  // [object HTMLInputElement]
}
```

```javascript
// ✅ 正しい
function check() {
  const input = document.getElementById("name");
  const value = input.value;  // .valueで値を取得
  console.log(value);  // "太郎"
}
```

**エラーメッセージ**：なし（オブジェクトが表示されるだけ）

## 実用例

### 実用例1: promptとinputの比較（挨拶プログラム）

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>入力方法の比較</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }
    button {
      padding: 10px 20px;
      margin: 10px 5px;
      font-size: 16px;
    }
    input {
      padding: 8px;
      font-size: 16px;
      width: 200px;
    }
    .result {
      margin-top: 20px;
      padding: 15px;
      background-color: #f0f0f0;
      border-radius: 5px;
      min-height: 30px;
    }
  </style>
</head>
<body>
  <h1>入力方法の比較</h1>

  <h2>方法1: prompt（ポップアップ）</h2>
  <button onclick="usePrompt()">promptで入力</button>

  <h2>方法2: input要素</h2>
  <input id="name" type="text" placeholder="名前を入力">
  <button onclick="useInput()">inputで入力</button>

  <div class="result" id="result"></div>

  <script>
    function usePrompt() {
      const name = prompt("あなたの名前を入力してください");
      const elem = document.getElementById("result");

      if (name === null) {
        elem.textContent = "キャンセルされました";
        return;
      }

      if (name === "") {
        elem.textContent = "名前が入力されていません";
        return;
      }

      elem.textContent = "こんにちは、" + name + "さん（promptで入力）";
    }

    function useInput() {
      const name = document.getElementById("name").value;
      const elem = document.getElementById("result");

      if (name === "") {
        elem.textContent = "名前が入力されていません";
        return;
      }

      elem.textContent = "こんにちは、" + name + "さん（inputで入力）";
    }
  </script>
</body>
</html>
```

**動作**：
- promptボタン → ポップアップで入力 → 結果表示
- input欄 → ページ上で入力 → ボタンで結果表示

### 実用例2: 簡単な計算機（prompt vs input）

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>計算機の比較</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .method {
      border: 2px solid #ddd;
      padding: 20px;
      margin: 20px 0;
      border-radius: 10px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      margin: 5px;
    }
    input {
      padding: 8px;
      font-size: 16px;
      width: 100px;
      margin: 5px;
    }
    .result {
      margin-top: 15px;
      padding: 10px;
      background-color: #e3f2fd;
      border-radius: 5px;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <h1>計算機の比較</h1>

  <div class="method">
    <h2>方法1: promptで計算</h2>
    <button onclick="calculateWithPrompt()">2つの数値を入力して計算</button>
    <div class="result" id="result1"></div>
  </div>

  <div class="method">
    <h2>方法2: input要素で計算</h2>
    <input id="num1" type="number" placeholder="数値1">
    +
    <input id="num2" type="number" placeholder="数値2">
    <button onclick="calculateWithInput()">=</button>
    <div class="result" id="result2"></div>
  </div>

  <script>
    function calculateWithPrompt() {
      const value1 = prompt("1つ目の数値を入力してください");

      if (value1 === null) {
        document.getElementById("result1").textContent = "キャンセルされました";
        return;
      }

      const value2 = prompt("2つ目の数値を入力してください");

      if (value2 === null) {
        document.getElementById("result1").textContent = "キャンセルされました";
        return;
      }

      const num1 = Number(value1);
      const num2 = Number(value2);
      const result = num1 + num2;

      document.getElementById("result1").textContent =
        value1 + " + " + value2 + " = " + result;
    }

    function calculateWithInput() {
      const value1 = document.getElementById("num1").value;
      const value2 = document.getElementById("num2").value;

      if (value1 === "" || value2 === "") {
        document.getElementById("result2").textContent =
          "両方の数値を入力してください";
        return;
      }

      const num1 = Number(value1);
      const num2 = Number(value2);
      const result = num1 + num2;

      document.getElementById("result2").textContent =
        value1 + " + " + value2 + " = " + result;
    }
  </script>
</body>
</html>
```

**比較ポイント**：
- prompt: 2回ポップアップが出る（順番に入力）
- input: 同時に2つの値が見える（自由に修正可能）

### 実用例3: confirm（削除確認）

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>削除確認</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }
    .item {
      border: 1px solid #ddd;
      padding: 15px;
      margin: 10px 0;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .delete-btn {
      background-color: #f44336;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 3px;
      cursor: pointer;
    }
    .message {
      margin-top: 20px;
      padding: 15px;
      background-color: #fff3cd;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <h1>削除確認（confirm）</h1>

  <div class="item" id="item1">
    <span>アイテム1</span>
    <button class="delete-btn" onclick="deleteItem(1)">削除</button>
  </div>

  <div class="item" id="item2">
    <span>アイテム2</span>
    <button class="delete-btn" onclick="deleteItem(2)">削除</button>
  </div>

  <div class="item" id="item3">
    <span>アイテム3</span>
    <button class="delete-btn" onclick="deleteItem(3)">削除</button>
  </div>

  <div class="message" id="message"></div>

  <script>
    function deleteItem(itemNumber) {
      // confirmで確認
      const confirmed = confirm("アイテム" + itemNumber + "を削除しますか？");

      const message = document.getElementById("message");

      if (confirmed) {
        // OKが押された場合（true）
        const item = document.getElementById("item" + itemNumber);
        item.style.display = "none";  // アイテムを非表示
        message.textContent = "アイテム" + itemNumber + "を削除しました";
      } else {
        // キャンセルが押された場合（false）
        message.textContent = "削除をキャンセルしました";
      }
    }
  </script>
</body>
</html>
```

**動作**：
- 削除ボタン → confirmダイアログ → OK/キャンセル → 結果表示

### 実用例4: 入力方法の組み合わせ

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>入力方法の組み合わせ</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
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
      padding: 8px;
      font-size: 16px;
      width: 100%;
      box-sizing: border-box;
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
    .result {
      margin-top: 20px;
      padding: 15px;
      background-color: #f0f0f0;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <h1>ユーザー登録</h1>

  <div class="form-group">
    <label>名前:</label>
    <input id="name" type="text" placeholder="山田太郎">
  </div>

  <div class="form-group">
    <label>メールアドレス:</label>
    <input id="email" type="email" placeholder="example@example.com">
  </div>

  <button onclick="register()">登録</button>

  <div class="result" id="result"></div>

  <script>
    function register() {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;

      // 入力チェック
      if (name === "" || email === "") {
        alert("すべての項目を入力してください");  // alertで警告
        return;
      }

      // confirmで最終確認
      const confirmed = confirm(
        "以下の内容で登録しますか？\n\n" +
        "名前: " + name + "\n" +
        "メール: " + email
      );

      const result = document.getElementById("result");

      if (confirmed) {
        // OKの場合
        result.textContent = "✅ 登録完了: " + name + "さん";
        result.style.backgroundColor = "#d4edda";

        // promptで追加情報を取得（オプション）
        const nickname = prompt("ニックネームを設定しますか？（任意）");
        if (nickname !== null && nickname !== "") {
          result.textContent += "\nニックネーム: " + nickname;
        }
      } else {
        // キャンセルの場合
        result.textContent = "❌ 登録をキャンセルしました";
        result.style.backgroundColor = "#f8d7da";
      }
    }
  </script>
</body>
</html>
```

**組み合わせ例**：
1. input要素で基本情報を入力（名前、メール）
2. alertで入力エラーを警告
3. confirmで最終確認
4. promptで追加情報を取得（オプション）

## 練習問題

### 問題1: promptを使った挨拶

ボタンをクリックしたときに、promptで名前を入力させ、「こんにちは、〇〇さん」と表示するプログラムを作成してください。

**仕様**：
- ボタンをクリックすると`greet()`が実行される
- promptで名前を入力
- 入力された名前を使って挨拶を表示
- キャンセルされた場合は何も表示しない

<details>
<summary>💡 ヒント1: 全体の流れ</summary>

```
1. promptで名前を入力
2. キャンセルチェック（null）
3. 結果をid="result"に表示
```
</details>

<details>
<summary>💡 ヒント2: promptの使い方</summary>

```javascript
const name = prompt("メッセージ");
```
</details>

<details>
<summary>💡 ヒント3: キャンセルのチェック</summary>

```javascript
if (name === null) {
  return;  // 何もしない
}
```
</details>

<details>
<summary>💡 ヒント4: 関数の骨組み</summary>

```javascript
function greet() {
  const name = prompt("名前を入力してください");

  if (name === null) {
    return;
  }

  // 挨拶を表示
}
```
</details>

<details>
<summary>💡 ヒント5: 文字列の連結</summary>

```javascript
elem.textContent = "こんにちは、" + name + "さん";
```
</details>

<details>
<summary>💡 ヒント6: HTML構造</summary>

```html
<button onclick="greet()">挨拶</button>
<p id="result"></p>
```
</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <title>promptで挨拶</title>
</head>
<body>
  <h1>挨拶プログラム</h1>
  <button onclick="greet()">挨拶</button>
  <p id="result"></p>

  <script>
    function greet() {
      const name = prompt("あなたの名前を入力してください");

      if (name === null) {
        return;
      }

      const elem = document.getElementById("result");
      elem.textContent = "こんにちは、" + name + "さん";
    }
  </script>
</body>
</html>
```
</details>

### 問題2: inputとpromptの比較

以下の2つの機能を持つプログラムを作成してください。

**仕様**：
- ボタン1: promptで年齢を入力させ、成人判定を表示
- ボタン2: input要素から年齢を取得し、成人判定を表示
- 20歳以上なら「成人です」、未満なら「未成年です」と表示

<details>
<summary>💡 ヒント1: HTML構造</summary>

```html
<button onclick="checkWithPrompt()">promptで判定</button>
<input id="age" type="number">
<button onclick="checkWithInput()">inputで判定</button>
<p id="result"></p>
```
</details>

<details>
<summary>💡 ヒント2: promptの関数</summary>

```javascript
function checkWithPrompt() {
  const ageStr = prompt("年齢を入力してください");
  if (ageStr === null) return;
  const age = Number(ageStr);
  // 判定処理
}
```
</details>

<details>
<summary>💡 ヒント3: inputの関数</summary>

```javascript
function checkWithInput() {
  const ageStr = document.getElementById("age").value;
  if (ageStr === "") return;
  const age = Number(ageStr);
  // 判定処理
}
```
</details>

<details>
<summary>💡 ヒント4: 成人判定</summary>

```javascript
if (age >= 20) {
  elem.textContent = "成人です";
} else {
  elem.textContent = "未成年です";
}
```
</details>

<details>
<summary>💡 ヒント5: Number()で変換</summary>

promptとinput.valueは両方とも文字列を返すので、Number()で数値に変換します。
</details>

<details>
<summary>💡 ヒント6: 完全な骨組み</summary>

```javascript
function checkWithPrompt() {
  const ageStr = prompt("年齢を入力");
  if (ageStr === null) return;
  const age = Number(ageStr);
  const elem = document.getElementById("result");
  // if文で判定
}

function checkWithInput() {
  const ageStr = document.getElementById("age").value;
  if (ageStr === "") return;
  const age = Number(ageStr);
  const elem = document.getElementById("result");
  // if文で判定
}
```
</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <title>入力方法の比較</title>
</head>
<body>
  <h1>年齢判定</h1>

  <h2>方法1: prompt</h2>
  <button onclick="checkWithPrompt()">promptで判定</button>

  <h2>方法2: input</h2>
  <input id="age" type="number" placeholder="年齢">
  <button onclick="checkWithInput()">inputで判定</button>

  <p id="result"></p>

  <script>
    function checkWithPrompt() {
      const ageStr = prompt("年齢を入力してください");

      if (ageStr === null) {
        return;
      }

      const age = Number(ageStr);
      const elem = document.getElementById("result");

      if (age >= 20) {
        elem.textContent = "成人です（promptで判定）";
      } else {
        elem.textContent = "未成年です（promptで判定）";
      }
    }

    function checkWithInput() {
      const ageStr = document.getElementById("age").value;

      if (ageStr === "") {
        return;
      }

      const age = Number(ageStr);
      const elem = document.getElementById("result");

      if (age >= 20) {
        elem.textContent = "成人です（inputで判定）";
      } else {
        elem.textContent = "未成年です（inputで判定）";
      }
    }
  </script>
</body>
</html>
```
</details>

### 問題3: promptのキャンセル処理

ボタンをクリックしたときに、promptで名前を入力させるプログラムを作成してください。

**仕様**：
- 入力された場合: 「ようこそ、〇〇さん」と表示
- キャンセルされた場合: 「キャンセルされました」と表示
- 空文字列の場合: 「名前が入力されていません」と表示

<details>
<summary>💡 ヒント1: チェックの順序</summary>

```
1. null（キャンセル）をチェック
2. ""（空文字列）をチェック
3. 正常な入力を処理
```
</details>

<details>
<summary>💡 ヒント2: nullのチェック</summary>

```javascript
if (name === null) {
  elem.textContent = "キャンセルされました";
  return;
}
```
</details>

<details>
<summary>💡 ヒント3: 空文字列のチェック</summary>

```javascript
if (name === "") {
  elem.textContent = "名前が入力されていません";
  return;
}
```
</details>

<details>
<summary>💡 ヒント4: 関数の骨組み</summary>

```javascript
function welcome() {
  const name = prompt("名前を入力してください");

  if (name === null) {
    // キャンセル処理
    return;
  }

  if (name === "") {
    // 空文字列処理
    return;
  }

  // 正常処理
}
```
</details>

<details>
<summary>💡 ヒント5: else不要</summary>

returnを使うので、elseは不要です（早期リターン）。
</details>

<details>
<summary>💡 ヒント6: テストケース</summary>

- 入力: "太郎" → "ようこそ、太郎さん"
- 入力: "" → "名前が入力されていません"
- キャンセル → "キャンセルされました"
</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <title>キャンセル処理</title>
</head>
<body>
  <h1>名前入力</h1>
  <button onclick="welcome()">名前を入力</button>
  <p id="result"></p>

  <script>
    function welcome() {
      const name = prompt("名前を入力してください");
      const elem = document.getElementById("result");

      if (name === null) {
        elem.textContent = "キャンセルされました";
        return;
      }

      if (name === "") {
        elem.textContent = "名前が入力されていません";
        return;
      }

      elem.textContent = "ようこそ、" + name + "さん";
    }
  </script>
</body>
</html>
```
</details>

## チェックリスト

このレッスンを終える前に、以下の項目を確認してください。

- [ ] promptの基本的な使い方を理解している
- [ ] promptの戻り値（文字列またはnull）を知っている
- [ ] promptのキャンセル処理ができる
- [ ] input要素とpromptの違いを説明できる
- [ ] それぞれの利点と欠点を理解している
- [ ] confirmの使い方を知っている
- [ ] confirmの戻り値（trueまたはfalse）を知っている
- [ ] promptの結果をNumber()で変換できる
- [ ] 実用アプリではinput要素を使うべき理由を理解している
- [ ] 空文字列とnullの違いを理解している

## デバッグのヒント

入力処理のプログラムでうまく動かない時は、以下を確認してください。

### 1. promptの戻り値を確認

```javascript
function test() {
  const value = prompt("入力してください");
  console.log("value:", value);  // 何が返ってきたか確認
  console.log("typeof:", typeof value);  // 型を確認
}
```

### 2. キャンセルと空文字列の区別

```javascript
function test() {
  const value = prompt("入力してください");

  console.log("value === null:", value === null);
  console.log("value === \"\":", value === "");
  console.log("実際の値:", value);
}
```

### 3. Number()の変換結果を確認

```javascript
function test() {
  const value = prompt("数値を入力");
  console.log("入力値:", value);

  const num = Number(value);
  console.log("変換後:", num);
  console.log("isNaN:", isNaN(num));
}
```

### 4. input.valueの取得確認

```javascript
function test() {
  const elem = document.getElementById("name");
  console.log("要素:", elem);  // 要素が取得できているか

  const value = elem.value;
  console.log("値:", value);  // 値が取得できているか
}
```

## ポイント

### 入力方法の選択基準

1. **学習用・簡単なテスト**
   - prompt、confirm、alertを使う
   - HTMLが不要でシンプル
   - 動作確認が素早くできる

2. **実用的なアプリケーション**
   - input要素を使う
   - UXが良い
   - デザインの自由度が高い

3. **確認ダイアログ**
   - confirmを使う
   - 削除などの重要な操作の前に確認
   - はい/いいえの2択

### promptの注意点

1. **戻り値は常に文字列**
   - 数値として使う場合はNumber()で変換
   - 計算前に必ず変換する

2. **キャンセルはnull**
   - 空文字列（""）とは異なる
   - キャンセルチェックを忘れない

3. **ブロッキング**
   - promptが表示されている間、他の操作ができない
   - ユーザー体験が悪くなる可能性がある

4. **デザイン不可**
   - ブラウザ標準のデザイン
   - CSSでスタイリングできない

## できるようになったこと

このレッスンを終えると、以下のことができるようになります。

1. ✅ **promptを使って入力を受け取る**
   - 基本的な使い方を理解している
   - キャンセル処理ができる

2. ✅ **input要素とpromptを比較する**
   - それぞれの特徴を理解している
   - 違いを説明できる

3. ✅ **適切な入力方法を選択する**
   - 学習用 → prompt
   - 実用アプリ → input要素

4. ✅ **confirmを使って確認する**
   - はい/いいえの確認ができる
   - 削除などの重要な操作前に使える

5. ✅ **promptの戻り値を正しく処理する**
   - null（キャンセル）をチェックできる
   - 空文字列と区別できる

6. ✅ **promptの結果を数値に変換する**
   - Number()で変換できる
   - 計算に使える

7. ✅ **複数の入力方法を組み合わせる**
   - input + confirm + prompt
   - 状況に応じて使い分けられる

8. ✅ **UX（ユーザー体験）を考慮する**
   - promptの欠点を理解している
   - 実用アプリでの適切な選択ができる

## まとめ

このレッスンでは、以下のことを学びました。

1. **promptはポップアップで入力を受け取る**
   - 構文: `const value = prompt("メッセージ");`
   - 戻り値: 文字列 または null

2. **input要素はページ上で入力を受け取る**
   - 構文: `document.getElementById("id").value`
   - 戻り値: 常に文字列

3. **promptの特徴**
   - シンプルで簡単
   - 学習用に最適
   - 実用アプリには不向き

4. **input要素の特徴**
   - 視覚的で分かりやすい
   - 複数入力が可能
   - 実用アプリに最適

5. **confirmの使い方**
   - はい/いいえの確認
   - 戻り値: true または false
   - 重要な操作の前に使う

6. **promptのキャンセル処理**
   - キャンセル → null
   - 空入力でOK → ""
   - 順序: null → "" → 正常処理

7. **使い分けの基準**
   - 学習・テスト → prompt
   - 実用アプリ → input要素
   - 確認 → confirm

入力方法の選択は、ユーザー体験（UX）に大きく影響します。適切な方法を選択できるようになりましょう。

## 次のステップ

次のレッスンでは、**バリデーション（入力検証）**について学びます。

ユーザーからの入力を受け取った後、その入力が正しいかどうかをチェックする方法を学びます。以下のことを学びます。

- 空文字列のチェック
- 文字列の長さチェック
- フィードバック表示

どんな入力方法を使う場合でも、バリデーションは必須です。しっかりと理解しておきましょう。
