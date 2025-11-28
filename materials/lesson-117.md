# Lesson 117: グローバル変数

**作成日: 2025-11-26**

---

## このレッスンで学ぶこと

### 前回の復習
前回のレッスンでは、**ローカル変数**について学びました：

```javascript
function test() {
  const message = 'こんにちは';  // ローカル変数
  console.log(message);  // OK
}

test();
// console.log(message);  // エラー！関数の外では使えない
```

ローカル変数は、**関数の中でのみ使える変数**でした。関数の外からはアクセスできません。

### よくある場面
プログラミングをしていると、こんな場面に出会います：

- 「複数の関数で、同じデータを使いたい」
- 「アプリ全体で共有したい設定値がある」
- 「毎回引数で渡すのが面倒だな」

例えば、複数の関数でユーザー名を使いたい場合：

```javascript
function greet(userName) {
  alert('こんにちは、' + userName + 'さん');
}

function showProfile(userName) {
  alert(userName + 'さんのプロフィール');
}

function sendMessage(userName) {
  alert(userName + 'さんにメッセージを送信');
}

// 毎回userNameを渡すのは面倒...
greet('太郎');
showProfile('太郎');
sendMessage('太郎');
```

毎回引数で渡すのは面倒ですね。こんなときに**グローバル変数**が便利です。

### 学習目標
このレッスンでは：
- ✅ **グローバル変数**とは何かを理解する
- ✅ ローカル変数とグローバル変数の違いを理解する
- ✅ **どこからでもアクセス**できることを確認する
- ✅ グローバル変数の**注意点**を学ぶ

---

## 1. グローバル変数とは？

### 日常生活のアナロジー：会社の共有スペース

グローバル変数を理解するために、**会社の共有スペース**をイメージしてみましょう：

```
会社全体
┌────────────────────────────────────────┐
│  共有スペース（グローバル変数）        │
│  ・お茶                                │
│  ・コピー用紙                          │
│  ・プリンター                          │
│  ↑ 誰でも使える                        │
│                                        │
│  ┌──────────┐  ┌──────────┐          │
│  │ 個室A    │  │ 個室B    │          │
│  │（関数A） │  │（関数B） │          │
│  │          │  │          │          │
│  │ 机の引出 │  │ 机の引出 │          │
│  │（ローカル）│  │（ローカル）│          │
│  │ ↑       │  │ ↑       │          │
│  │ Aさん   │  │ Bさん   │          │
│  │ だけ    │  │ だけ    │          │
│  └──────────┘  └──────────┘          │
└────────────────────────────────────────┘
```

- **共有スペースのもの**（グローバル変数）：誰でも使える
- **個室の机の引き出し**（ローカル変数）：その部屋の人だけが使える

### 基本的な定義

**グローバル変数**は、**関数の外**で宣言された変数のことです。グローバル変数は、プログラムの**どこからでも**アクセスできます。

```javascript
const appName = 'マイアプリ';  // グローバル変数（関数の外で宣言）

function showAppName() {
  alert(appName);  // グローバル変数にアクセスできる
}

function showMessage() {
  alert(appName + 'へようこそ');  // ここからもアクセスできる
}

showAppName();  // 「マイアプリ」と表示される
showMessage();  // 「マイアプリへようこそ」と表示される
```

### 実行フロー図解

```
プログラムの構造
═══════════════════════════════════════

グローバルスコープ（関数の外）
┌───────────────────────────────────┐
│ const appName = 'マイアプリ';     │ ← グローバル変数
│                                   │   （どこからでもアクセス可能）
│                                   │
│ function showAppName() {          │
│   ┌───────────────────────────┐  │
│   │ alert(appName);           │  │ ← グローバル変数を使える
│   └───────────────────────────┘  │
│ }                                 │
│                                   │
│ function showMessage() {          │
│   ┌───────────────────────────┐  │
│   │ alert(appName + '...');   │  │ ← グローバル変数を使える
│   └───────────────────────────┘  │
│ }                                 │
│                                   │
│ showAppName();                    │ ← グローバル変数を使える
└───────────────────────────────────┘
```

---

## 2. ローカル変数とグローバル変数の違い

前回学んだローカル変数と比較してみましょう。

### 違いを確認するコード

```javascript
const globalMessage = 'グローバル';  // グローバル変数（関数の外）

function test() {
  const localMessage = 'ローカル';  // ローカル変数（関数の中）

  console.log(globalMessage);  // OK: グローバル変数にアクセス可能
  console.log(localMessage);   // OK: ローカル変数にアクセス可能
}

test();

console.log(globalMessage);  // OK: グローバル変数にアクセス可能
// console.log(localMessage);   // エラー: ローカル変数にはアクセスできない
```

### 実行フロー図解

```
変数のアクセス範囲
═══════════════════════════════════════

グローバルスコープ
┌─────────────────────────────────────┐
│ const globalMessage = 'グローバル'; │ ← グローバル変数
│                                     │
│ function test() {                   │
│   ┌─────────────────────────────┐  │
│   │ const localMessage =        │  │ ← ローカル変数
│   │       'ローカル';           │  │
│   │                             │  │
│   │ console.log(globalMessage); │  │ ✅ アクセス可能
│   │ console.log(localMessage);  │  │ ✅ アクセス可能
│   └─────────────────────────────┘  │
│ }                                   │
│                                     │
│ test();                             │
│                                     │
│ console.log(globalMessage);         │ ✅ アクセス可能
│ console.log(localMessage);          │ ❌ エラー！
└─────────────────────────────────────┘
```

### 違いのまとめ

| 種類 | 宣言場所 | アクセス範囲 | 使える場所 |
|------|----------|--------------|------------|
| **ローカル変数** | 関数の中 | その関数の中だけ | 宣言した関数内のみ |
| **グローバル変数** | 関数の外 | プログラムのどこからでも | すべての関数、プログラム全体 |

### メモリ上のイメージ

```
メモリ構造
═══════════════════════════════════════

グローバル変数
┌─────────────────────────────────┐
│ globalMessage: 'グローバル'     │ ← ずっと存在する
└─────────────────────────────────┘
        ↑
        どこからでもアクセス可能
        ↓

test関数が実行されている間だけ存在
┌─────────────────────────────────┐
│ localMessage: 'ローカル'        │ ← 関数が終わると消える
└─────────────────────────────────┘
```

---

## 3. グローバル変数の活用例

### 例1：複数の関数から同じデータにアクセス

複数の関数から同じデータにアクセスしたい場合に便利です。

```javascript
const userName = '太郎';  // グローバル変数

function greet() {
  alert('こんにちは、' + userName + 'さん');
}

function farewell() {
  alert('さようなら、' + userName + 'さん');
}

function showProfile() {
  alert(userName + 'さんのプロフィール');
}

greet();        // 「こんにちは、太郎さん」
farewell();     // 「さようなら、太郎さん」
showProfile();  // 「太郎さんのプロフィール」
```

すべての関数から同じ `userName` にアクセスできています。

### 実行フロー図解

```
グローバル変数の共有
═══════════════════════════════════════

グローバル変数
┌─────────────────────┐
│ userName: '太郎'    │
└─────────────────────┘
   ↓       ↓       ↓
   アクセス アクセス アクセス
   ↓       ↓       ↓
greet() farewell() showProfile()
   ↓       ↓       ↓
「こんにちは」「さようなら」「プロフィール」
```

### 例2：アプリの設定値を管理

アプリ全体で使う設定値をグローバル変数にすると便利です。

```javascript
// アプリの設定（グローバル変数）
const APP_NAME = 'タスク管理アプリ';
const VERSION = '1.0.0';
const MAX_TASKS = 100;

function showAppInfo() {
  alert(APP_NAME + ' バージョン' + VERSION);
}

function checkTaskLimit(currentTasks) {
  if (currentTasks >= MAX_TASKS) {
    alert('タスクの上限（' + MAX_TASKS + '個）に達しました');
    return false;
  }
  return true;
}

showAppInfo();        // 「タスク管理アプリ バージョン1.0.0」
checkTaskLimit(50);   // true
checkTaskLimit(100);  // 「タスクの上限（100個）に達しました」false
```

---

## 4. グローバル変数の更新

グローバル変数の値を変更すると、すべての場所でその変更が反映されます。

### 基本的な例

```javascript
let score = 0;  // グローバル変数（let で宣言 = 変更可能）

function addPoint() {
  score = score + 10;  // グローバル変数を更新
  alert('現在のスコア: ' + score);
}

function resetScore() {
  score = 0;  // グローバル変数をリセット
  alert('スコアをリセットしました');
}

addPoint();   // 「現在のスコア: 10」
addPoint();   // 「現在のスコア: 20」
addPoint();   // 「現在のスコア: 30」
resetScore(); // 「スコアをリセットしました」
addPoint();   // 「現在のスコア: 10」
```

### 実行フロー図解

```
グローバル変数の更新
═══════════════════════════════════════

初期状態
┌─────────────┐
│ score: 0    │ ← グローバル変数
└─────────────┘

addPoint()が1回目に呼ばれる
┌─────────────┐
│ score: 0    │
└─────────────┘
      ↓
   score = 0 + 10
      ↓
┌─────────────┐
│ score: 10   │ ← 更新された
└─────────────┘

addPoint()が2回目に呼ばれる
┌─────────────┐
│ score: 10   │
└─────────────┘
      ↓
   score = 10 + 10
      ↓
┌─────────────┐
│ score: 20   │ ← さらに更新された
└─────────────┘

addPoint()が3回目に呼ばれる
┌─────────────┐
│ score: 20   │
└─────────────┘
      ↓
   score = 20 + 10
      ↓
┌─────────────┐
│ score: 30   │ ← さらに更新された
└─────────────┘

resetScore()が呼ばれる
┌─────────────┐
│ score: 30   │
└─────────────┘
      ↓
   score = 0
      ↓
┌─────────────┐
│ score: 0    │ ← リセットされた
└─────────────┘
```

### 重要なポイント

グローバル変数を更新する場合は、**let** で宣言する必要があります：

```javascript
// ❌ constで宣言すると変更できない
const score = 0;
function addPoint() {
  score = score + 10;  // エラー！constは再代入できない
}

// ✅ letで宣言すれば変更できる
let score = 0;
function addPoint() {
  score = score + 10;  // OK
}
```

---

## 5. ローカル変数とグローバル変数が同じ名前の場合

同じ名前の変数がある場合、**ローカル変数が優先**されます。これを「**シャドーイング**」と呼びます。

### 基本的な例

```javascript
const message = 'グローバル';  // グローバル変数

function test() {
  const message = 'ローカル';  // ローカル変数（同じ名前）
  console.log(message);  // 「ローカル」と表示（ローカル変数が優先）
}

test();
console.log(message);  // 「グローバル」と表示
```

### 実行フロー図解

```
シャドーイング（変数の優先順位）
═══════════════════════════════════════

グローバルスコープ
┌───────────────────────────────────┐
│ const message = 'グローバル';     │ ← グローバル変数
│                                   │
│ function test() {                 │
│   ┌───────────────────────────┐  │
│   │ const message = 'ローカル'│  │ ← ローカル変数（同じ名前）
│   │                           │  │
│   │ console.log(message);     │  │ ← ローカル変数が優先される
│   │           ↑               │  │   「ローカル」が表示される
│   │           │               │  │
│   │     ローカル変数を探す    │  │
│   │     ↓                     │  │
│   │   見つかった！            │  │
│   └───────────────────────────┘  │
│ }                                 │
│                                   │
│ console.log(message);             │ ← グローバル変数を表示
│           ↑                       │   「グローバル」が表示される
│           │                       │
│     グローバル変数を探す          │
│     ↓                             │
│   見つかった！                    │
└───────────────────────────────────┘
```

### 変数の検索順序（スコープチェーン）

JavaScriptは、変数を次の順序で探します：

1. **ローカルスコープ**（現在の関数内）で探す
2. 見つからなければ、**グローバルスコープ**で探す
3. それでも見つからなければエラー

```javascript
const name = 'グローバル太郎';  // グローバル変数

function outer() {
  const name = '外側次郎';  // outer関数のローカル変数

  function inner() {
    const name = '内側三郎';  // inner関数のローカル変数
    console.log(name);  // 「内側三郎」← 最も近いローカル変数が優先
  }

  inner();
  console.log(name);  // 「外側次郎」← outer関数のローカル変数
}

outer();
console.log(name);  // 「グローバル太郎」← グローバル変数
```

---

## 6. グローバル変数の注意点

グローバル変数は便利ですが、使いすぎると問題が起きます。

### 注意点1：使いすぎに注意

グローバル変数を多用すると、**どこで値が変更されたかわかりにくく**なります。

```javascript
let count = 0;  // グローバル変数

function funcA() {
  count = count + 1;  // ここで変更？
}

function funcB() {
  count = count + 2;  // それともここ？
}

function funcC() {
  count = 0;  // ここでリセット？
}

funcA();
funcB();
funcC();
funcA();
console.log(count);  // countがどこで変更されたかわかりにくい
```

### 問題点の図解

```
グローバル変数の変更が追いにくい
═══════════════════════════════════════

count: 0
   ↓
funcA()が呼ばれる
   ↓
count: 1
   ↓
funcB()が呼ばれる
   ↓
count: 3
   ↓
funcC()が呼ばれる
   ↓
count: 0  ← あれ？リセットされた？
   ↓
funcA()が呼ばれる
   ↓
count: 1

問題：
- どの関数がcountを変更しているのか一目でわからない
- バグが発生したとき、原因を特定するのが大変
```

### 注意点2：なるべく引数と戻り値を使う

可能な限り、グローバル変数ではなく**引数と戻り値**を使う方が安全です。

```javascript
// ❌ グローバル変数を使う（あまり良くない）
let total = 0;

function add(value) {
  total = total + value;  // グローバル変数を直接変更
}

add(10);
add(20);
console.log(total);  // 30

// ✅ 引数と戻り値を使う（良い）
function add(current, value) {
  return current + value;  // 引数を受け取り、結果を返す
}

let total = 0;
total = add(total, 10);
total = add(total, 20);
console.log(total);  // 30
```

### なぜ引数と戻り値の方が良いのか？

```
グローバル変数を使う場合
═══════════════════════════════════════
let total = 0;  ← グローバル変数

function add(value) {
  total = total + value;  ← グローバル変数を直接変更
}

問題点：
- 関数がグローバル変数に依存している
- 他の場所でtotalが変更されると、予期しない動作になる
- 同じ関数を再利用しにくい


引数と戻り値を使う場合
═══════════════════════════════════════
function add(current, value) {
  return current + value;  ← 引数を受け取り、結果を返す
}

let total = 0;
total = add(total, 10);

メリット：
- 関数が独立している（グローバル変数に依存しない）
- 引数が何で、何を返すかが明確
- 同じ関数を様々な場所で再利用できる
```

### 注意点3：定数として使う場合は便利

変更しない値（**定数**）をグローバル変数にするのは**良い使い方**です。

```javascript
// ✅ 定数として使う（推奨）
const TAX_RATE = 0.1;          // 消費税率（定数）
const APP_VERSION = '1.0.0';   // アプリバージョン（定数）
const MAX_LENGTH = 100;        // 最大文字数（定数）

function calculatePrice(price) {
  return price + (price * TAX_RATE);  // TAX_RATEを使う
}

function showVersion() {
  alert('バージョン: ' + APP_VERSION);  // APP_VERSIONを使う
}

function validateInput(text) {
  if (text.length > MAX_LENGTH) {  // MAX_LENGTHを使う
    alert('最大' + MAX_LENGTH + '文字までです');
    return false;
  }
  return true;
}
```

定数として使う場合のメリット：

1. **値を一箇所で管理**できる（変更が簡単）
2. **意味のある名前**をつけられる（0.1 よりも TAX_RATE の方がわかりやすい）
3. **変更されない**ので安全（constで宣言）

---

## 7. いつグローバル変数を使うべきか？

### 使って良い場合 ✅

1. **アプリ全体で使う設定値や定数**：
   ```javascript
   const APP_NAME = 'マイアプリ';
   const API_URL = 'https://api.example.com';
   const TAX_RATE = 0.1;
   ```

2. **複数の関数で共有する必要がある状態**：
   ```javascript
   let currentUser = null;  // ログイン中のユーザー
   let theme = 'light';     // テーマ設定
   ```

3. **DOMの要素を保存する**（後のレッスンで学びます）：
   ```javascript
   const outputElement = document.getElementById('output');
   ```

### 避けるべき場合 ❌

1. **一つの関数内だけで使う値**：
   ```javascript
   // ❌ 悪い例：関数内だけで使うのにグローバル変数
   let tempResult = 0;

   function calculate(a, b) {
     tempResult = a + b;
     return tempResult;
   }

   // ✅ 良い例：ローカル変数を使う
   function calculate(a, b) {
     const result = a + b;  // ローカル変数
     return result;
   }
   ```

2. **引数と戻り値で代用できる場合**：
   ```javascript
   // ❌ 悪い例：グローバル変数を直接変更
   let count = 0;

   function increment() {
     count++;
   }

   // ✅ 良い例：引数と戻り値を使う
   function increment(count) {
     return count + 1;
   }

   let count = 0;
   count = increment(count);
   ```

---

## 8. 実践例：カウンターアプリ

グローバル変数とローカル変数を組み合わせた実用的な例を見てみましょう。

### コード全体

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>カウンターアプリ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f0f0f0;
    }

    .container {
      background-color: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      text-align: center;
    }

    h1 {
      color: #333;
      margin-bottom: 30px;
    }

    #counter {
      font-size: 72px;
      font-weight: bold;
      color: #2196F3;
      margin: 30px 0;
      padding: 20px;
      background-color: #E3F2FD;
      border-radius: 10px;
    }

    .button-group {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    button {
      flex: 1;
      padding: 15px 20px;
      font-size: 18px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: bold;
    }

    .btn-increment {
      background-color: #4CAF50;
      color: white;
    }

    .btn-increment:hover {
      background-color: #45a049;
    }

    .btn-decrement {
      background-color: #f44336;
      color: white;
    }

    .btn-decrement:hover {
      background-color: #da190b;
    }

    .btn-reset {
      background-color: #9E9E9E;
      color: white;
    }

    .btn-reset:hover {
      background-color: #757575;
    }

    #message {
      margin-top: 20px;
      padding: 10px;
      border-radius: 5px;
      font-size: 16px;
      min-height: 24px;
    }

    .warning {
      background-color: #FFF3E0;
      color: #E65100;
      border-left: 4px solid #FF9800;
    }

    .info {
      background-color: #E3F2FD;
      color: #1565C0;
      border-left: 4px solid #2196F3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔢 カウンターアプリ</h1>

    <div id="counter">0</div>

    <div class="button-group">
      <button class="btn-increment" onclick="increment()">➕ +1</button>
      <button class="btn-decrement" onclick="decrement()">➖ -1</button>
    </div>

    <button class="btn-reset" onclick="reset()">🔄 リセット</button>

    <div id="message"></div>
  </div>

  <script>
    // グローバル変数（アプリ全体で使う設定値と状態）
    const MAX_COUNT = 10;   // 最大値（定数）
    const MIN_COUNT = -10;  // 最小値（定数）
    let count = 0;          // 現在のカウント（状態）

    // カウンターの表示を更新する関数
    function updateDisplay() {
      // ローカル変数
      const counterElement = document.getElementById('counter');
      counterElement.textContent = count;  // グローバル変数countを表示
    }

    // メッセージを表示する関数
    function showMessage(message, type) {
      // ローカル変数
      const messageElement = document.getElementById('message');
      messageElement.textContent = message;
      messageElement.className = type;  // 'warning' または 'info'
    }

    // メッセージをクリアする関数
    function clearMessage() {
      // ローカル変数
      const messageElement = document.getElementById('message');
      messageElement.textContent = '';
      messageElement.className = '';
    }

    // +1 ボタンのクリック処理
    function increment() {
      // グローバル変数countをチェック
      if (count >= MAX_COUNT) {
        showMessage('最大値（' + MAX_COUNT + '）に達しています', 'warning');
        return;
      }

      // グローバル変数countを更新
      count = count + 1;

      // 表示を更新
      updateDisplay();
      clearMessage();
    }

    // -1 ボタンのクリック処理
    function decrement() {
      // グローバル変数countをチェック
      if (count <= MIN_COUNT) {
        showMessage('最小値（' + MIN_COUNT + '）に達しています', 'warning');
        return;
      }

      // グローバル変数countを更新
      count = count - 1;

      // 表示を更新
      updateDisplay();
      clearMessage();
    }

    // リセットボタンのクリック処理
    function reset() {
      // グローバル変数countをリセット
      count = 0;

      // 表示を更新
      updateDisplay();
      showMessage('カウンターをリセットしました', 'info');
    }
  </script>
</body>
</html>
```

### 実行フロー図解

ユーザーが「+1」ボタンを3回押した場合：

```
実行フロー
═══════════════════════════════════════

初期状態
┌────────────────────┐
│ グローバル変数     │
│ MAX_COUNT: 10      │ ← 定数
│ MIN_COUNT: -10     │ ← 定数
│ count: 0           │ ← 状態
└────────────────────┘

1回目：increment()が呼ばれる
   ↓
 count < MAX_COUNT なのでOK
   ↓
 count = 0 + 1 = 1
   ↓
┌────────────────────┐
│ count: 1           │ ← 更新された
└────────────────────┘
   ↓
 updateDisplay()で画面に「1」を表示

2回目：increment()が呼ばれる
   ↓
 count < MAX_COUNT なのでOK
   ↓
 count = 1 + 1 = 2
   ↓
┌────────────────────┐
│ count: 2           │ ← 更新された
└────────────────────┘
   ↓
 updateDisplay()で画面に「2」を表示

3回目：increment()が呼ばれる
   ↓
 count < MAX_COUNT なのでOK
   ↓
 count = 2 + 1 = 3
   ↓
┌────────────────────┐
│ count: 3           │ ← 更新された
└────────────────────┘
   ↓
 updateDisplay()で画面に「3」を表示
```

### このアプリでのグローバル変数とローカル変数の使い分け

**グローバル変数**：
- `MAX_COUNT`, `MIN_COUNT`：アプリ全体で使う定数
- `count`：複数の関数で共有する状態

**ローカル変数**：
- `counterElement`, `messageElement`：各関数内でのみ使う一時的な変数
- `message`, `type`：関数の引数（ローカル変数）

---

## 練習問題

### 問題1: グローバル変数とローカル変数の識別（基本）

以下のコードで、グローバル変数とローカル変数をそれぞれ識別してください：

```javascript
const appName = 'マイアプリ';
let userCount = 0;

function registerUser(name) {
  const message = 'ようこそ、' + name + 'さん';
  userCount = userCount + 1;
  alert(message);
}

function showInfo() {
  const info = appName + ' - ユーザー数: ' + userCount;
  alert(info);
}

registerUser('太郎');
showInfo();
```

**問い**：
1. グローバル変数はどれですか？
2. ローカル変数はどれですか？
3. `registerUser`関数内で使えるのはどの変数ですか？

<details>
<summary>解答例</summary>

**1. グローバル変数**：
- `appName`：関数の外で宣言されている
- `userCount`：関数の外で宣言されている

**2. ローカル変数**：
- `name`：`registerUser`関数の引数（ローカル変数）
- `message`：`registerUser`関数内で宣言されている
- `info`：`showInfo`関数内で宣言されている

**3. registerUser関数内で使える変数**：
- `name`（ローカル変数・引数）
- `message`（ローカル変数）
- `appName`（グローバル変数）
- `userCount`（グローバル変数）

**図解**：

```
変数のスコープ
═══════════════════════════════════════

グローバルスコープ
┌─────────────────────────────────────┐
│ const appName = 'マイアプリ';       │ ← グローバル変数
│ let userCount = 0;                  │ ← グローバル変数
│                                     │
│ function registerUser(name) {       │
│   ┌─────────────────────────────┐  │
│   │ name                        │  │ ← ローカル変数（引数）
│   │ const message = '...';      │  │ ← ローカル変数
│   │                             │  │
│   │ userCount++を実行           │  │ ← グローバル変数にアクセス
│   │ alert(message)を実行        │  │ ← ローカル変数にアクセス
│   └─────────────────────────────┘  │
│ }                                   │
│                                     │
│ function showInfo() {               │
│   ┌─────────────────────────────┐  │
│   │ const info = appName + ... │  │ ← ローカル変数
│   │                             │  │
│   │ appNameとuserCountに        │  │ ← グローバル変数にアクセス
│   │ アクセス                    │  │
│   └─────────────────────────────┘  │
│ }                                   │
└─────────────────────────────────────┘
```

</details>

---

### 問題2: ポイント管理アプリ（応用）

以下の要件を満たすアプリを作成してください：

**要件**：
1. グローバル変数`points`を使って、ポイントを管理する
2. 「+10ポイント」「+50ポイント」「-20ポイント」「リセット」のボタンを用意
3. ポイントが0未満にならないようにする
4. 現在のポイントを画面に表示する

**ヒント**：
- グローバル変数：`let points = 0;`
- 関数：`addPoints(amount)`, `subtractPoints(amount)`, `resetPoints()`, `updateDisplay()`

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ポイント管理アプリ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background-color: #FFF8E1;
    }

    .container {
      background-color: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      text-align: center;
    }

    h1 {
      color: #F57C00;
    }

    #points {
      font-size: 64px;
      font-weight: bold;
      color: #FF6F00;
      margin: 20px 0;
      padding: 20px;
      background-color: #FFF3E0;
      border-radius: 10px;
    }

    .button-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 15px;
    }

    button {
      padding: 15px;
      font-size: 18px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: bold;
    }

    .btn-add {
      background-color: #4CAF50;
      color: white;
    }

    .btn-add:hover {
      background-color: #45a049;
    }

    .btn-subtract {
      background-color: #FF9800;
      color: white;
    }

    .btn-subtract:hover {
      background-color: #FB8C00;
    }

    .btn-reset {
      grid-column: 1 / 3;
      background-color: #9E9E9E;
      color: white;
    }

    .btn-reset:hover {
      background-color: #757575;
    }

    #message {
      margin-top: 20px;
      padding: 10px;
      border-radius: 5px;
      font-size: 16px;
      min-height: 24px;
    }

    .warning {
      background-color: #FFEBEE;
      color: #C62828;
      border-left: 4px solid #F44336;
    }

    .success {
      background-color: #E8F5E9;
      color: #2E7D32;
      border-left: 4px solid #4CAF50;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>💰 ポイント管理アプリ</h1>

    <div id="points">0</div>
    <div style="color: #666; margin-bottom: 20px;">ポイント</div>

    <div class="button-group">
      <button class="btn-add" onclick="addPoints(10)">➕ +10pt</button>
      <button class="btn-add" onclick="addPoints(50)">➕ +50pt</button>
      <button class="btn-subtract" onclick="subtractPoints(20)">➖ -20pt</button>
      <button class="btn-reset" onclick="resetPoints()">🔄 リセット</button>
    </div>

    <div id="message"></div>
  </div>

  <script>
    // グローバル変数
    let points = 0;  // 現在のポイント（状態）

    // 表示を更新する関数
    function updateDisplay() {
      // ローカル変数
      const pointsElement = document.getElementById('points');
      pointsElement.textContent = points;  // グローバル変数を表示
    }

    // メッセージを表示する関数
    function showMessage(message, type) {
      // ローカル変数
      const messageElement = document.getElementById('message');
      messageElement.textContent = message;
      messageElement.className = type;
    }

    // メッセージをクリアする関数
    function clearMessage() {
      // ローカル変数
      const messageElement = document.getElementById('message');
      messageElement.textContent = '';
      messageElement.className = '';
    }

    // ポイントを追加する関数
    function addPoints(amount) {
      // amountは引数（ローカル変数）
      points = points + amount;  // グローバル変数を更新

      updateDisplay();
      showMessage('+' + amount + 'ポイント獲得しました！', 'success');
    }

    // ポイントを減らす関数
    function subtractPoints(amount) {
      // amountは引数（ローカル変数）

      // ローカル変数
      const newPoints = points - amount;

      // 0未満にならないようにチェック
      if (newPoints < 0) {
        showMessage('ポイントが足りません（現在: ' + points + 'pt）', 'warning');
        return;
      }

      // グローバル変数を更新
      points = newPoints;

      updateDisplay();
      showMessage('-' + amount + 'ポイント使用しました', 'success');
    }

    // ポイントをリセットする関数
    function resetPoints() {
      // グローバル変数をリセット
      points = 0;

      updateDisplay();
      showMessage('ポイントをリセットしました', 'success');
    }
  </script>
</body>
</html>
```

**実行フロー**（+10、+50、-20の順にクリックした場合）：

```
実行フロー
═══════════════════════════════════════

初期状態
┌────────────────────┐
│ points: 0          │ ← グローバル変数
└────────────────────┘

addPoints(10)が呼ばれる
   ┌─────────────────┐
   │ amount: 10      │ ← ローカル変数（引数）
   └─────────────────┘
   ↓
 points = 0 + 10 = 10
   ↓
┌────────────────────┐
│ points: 10         │ ← 更新された
└────────────────────┘
   ↓
 画面に「10」を表示
 「+10ポイント獲得しました！」

addPoints(50)が呼ばれる
   ┌─────────────────┐
   │ amount: 50      │ ← ローカル変数（引数）
   └─────────────────┘
   ↓
 points = 10 + 50 = 60
   ↓
┌────────────────────┐
│ points: 60         │ ← 更新された
└────────────────────┘
   ↓
 画面に「60」を表示
 「+50ポイント獲得しました！」

subtractPoints(20)が呼ばれる
   ┌─────────────────┐
   │ amount: 20      │ ← ローカル変数（引数）
   └─────────────────┘
   ↓
   ┌─────────────────┐
   │ newPoints =     │ ← ローカル変数
   │   60 - 20 = 40  │
   └─────────────────┘
   ↓
 newPoints >= 0 なのでOK
   ↓
 points = 40
   ↓
┌────────────────────┐
│ points: 40         │ ← 更新された
└────────────────────┘
   ↓
 画面に「40」を表示
 「-20ポイント使用しました」
```

</details>

---

### 問題3: テーマ切り替えアプリ（発展）

以下の要件を満たすアプリを作成してください：

**要件**：
1. グローバル変数`currentTheme`で現在のテーマを管理する（'light' または 'dark'）
2. 「ライトテーマ」「ダークテーマ」のボタンを用意
3. テーマに応じて背景色とテキスト色を変更する
4. 現在のテーマ名を表示する

**ヒント**：
- グローバル変数：`let currentTheme = 'light';`
- 関数：`setTheme(theme)`, `applyTheme()`
- ライトテーマ：背景色 `#ffffff`、テキスト色 `#333333`
- ダークテーマ：背景色 `#1a1a1a`、テキスト色 `#e0e0e0`

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>テーマ切り替えアプリ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 50px;
      transition: all 0.3s;
      min-height: 100vh;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      transition: all 0.3s;
    }

    h1 {
      text-align: center;
      margin-bottom: 30px;
    }

    .theme-info {
      text-align: center;
      font-size: 24px;
      margin-bottom: 30px;
      padding: 20px;
      border-radius: 10px;
      font-weight: bold;
    }

    .button-group {
      display: flex;
      gap: 15px;
      margin-bottom: 30px;
    }

    button {
      flex: 1;
      padding: 15px 20px;
      font-size: 18px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: bold;
    }

    .btn-light {
      background-color: #fff;
      color: #333;
      border: 2px solid #333;
    }

    .btn-light:hover {
      background-color: #f5f5f5;
    }

    .btn-dark {
      background-color: #1a1a1a;
      color: #e0e0e0;
      border: 2px solid #e0e0e0;
    }

    .btn-dark:hover {
      background-color: #2a2a2a;
    }

    .content {
      line-height: 1.8;
      font-size: 16px;
    }

    /* ライトテーマ用のスタイル */
    body.light {
      background-color: #f5f5f5;
      color: #333333;
    }

    body.light .container {
      background-color: #ffffff;
    }

    body.light .theme-info {
      background-color: #E3F2FD;
      color: #1976D2;
    }

    /* ダークテーマ用のスタイル */
    body.dark {
      background-color: #121212;
      color: #e0e0e0;
    }

    body.dark .container {
      background-color: #1a1a1a;
    }

    body.dark .theme-info {
      background-color: #263238;
      color: #80DEEA;
    }
  </style>
</head>
<body class="light">
  <div class="container">
    <h1>🎨 テーマ切り替えアプリ</h1>

    <div class="theme-info">
      現在のテーマ: <span id="themeName">ライトテーマ</span>
    </div>

    <div class="button-group">
      <button class="btn-light" onclick="setTheme('light')">☀️ ライトテーマ</button>
      <button class="btn-dark" onclick="setTheme('dark')">🌙 ダークテーマ</button>
    </div>

    <div class="content">
      <p>このアプリでは、グローバル変数を使ってテーマの状態を管理しています。</p>
      <p>ボタンをクリックすると、テーマが切り替わります。</p>
      <p>グローバル変数 <code>currentTheme</code> には、現在のテーマ（'light' または 'dark'）が保存されています。</p>
    </div>
  </div>

  <script>
    // グローバル変数（アプリのテーマ状態を管理）
    let currentTheme = 'light';  // 現在のテーマ（'light' または 'dark'）

    // テーマを設定する関数
    function setTheme(theme) {
      // themeは引数（ローカル変数）

      // グローバル変数を更新
      currentTheme = theme;

      // テーマを適用
      applyTheme();

      // テーマ名を更新
      updateThemeName();
    }

    // テーマを適用する関数
    function applyTheme() {
      // ローカル変数
      const body = document.body;

      // グローバル変数currentThemeに応じてクラスを切り替え
      if (currentTheme === 'light') {
        body.className = 'light';
      } else if (currentTheme === 'dark') {
        body.className = 'dark';
      }
    }

    // テーマ名を更新する関数
    function updateThemeName() {
      // ローカル変数
      const themeNameElement = document.getElementById('themeName');
      let themeName = '';  // ローカル変数

      // グローバル変数currentThemeに応じてテーマ名を設定
      if (currentTheme === 'light') {
        themeName = 'ライトテーマ';
      } else if (currentTheme === 'dark') {
        themeName = 'ダークテーマ';
      }

      themeNameElement.textContent = themeName;
    }

    // ページ読み込み時に初期テーマを適用
    applyTheme();
  </script>
</body>
</html>
```

**実行フロー**（ダークテーマボタンをクリックした場合）：

```
実行フロー
═══════════════════════════════════════

初期状態
┌────────────────────┐
│ currentTheme:      │ ← グローバル変数
│   'light'          │
└────────────────────┘
   ↓
bodyのclass: 'light'
背景色: 明るい色
テキスト色: 暗い色

setTheme('dark')が呼ばれる
   ┌─────────────────┐
   │ theme: 'dark'   │ ← ローカル変数（引数）
   └─────────────────┘
   ↓
 currentTheme = 'dark'
   ↓
┌────────────────────┐
│ currentTheme:      │ ← グローバル変数が更新された
│   'dark'           │
└────────────────────┘
   ↓
applyTheme()が呼ばれる
   ↓
   ┌──────────────────────┐
   │ const body = ...     │ ← ローカル変数
   └──────────────────────┘
   ↓
 currentTheme === 'dark' なので
 body.className = 'dark'
   ↓
bodyのclass: 'dark'
背景色: 暗い色
テキスト色: 明るい色
   ↓
updateThemeName()が呼ばれる
   ↓
   ┌──────────────────────────┐
   │ const themeNameElement = │ ← ローカル変数
   │   ...                    │
   │ let themeName = ''       │ ← ローカル変数
   └──────────────────────────┘
   ↓
 currentTheme === 'dark' なので
 themeName = 'ダークテーマ'
   ↓
 画面に「ダークテーマ」を表示
```

**グローバル変数とローカル変数の使い分け**：

```
グローバル変数
═══════════════════════════════════════
currentTheme
  ↓
  複数の関数で共有する必要がある状態
  ・setTheme()で更新
  ・applyTheme()で参照
  ・updateThemeName()で参照


ローカル変数
═══════════════════════════════════════
theme（setTheme関数の引数）
  ↓
  関数に渡される値

body, themeNameElement（各関数内）
  ↓
  一時的にDOM要素を保存する変数

themeName（updateThemeName関数内）
  ↓
  一時的にテーマ名を保存する変数
```

</details>

---

## まとめ

このレッスンでは、**グローバル変数**について学びました。

### 重要なポイント

1. **グローバル変数とは**：
   - 関数の外で宣言した変数
   - プログラムのどこからでもアクセスできる
   - 複数の関数で共有できる

2. **ローカル変数との違い**：
   - ローカル変数：関数の中だけで使える
   - グローバル変数：どこからでも使える

3. **グローバル変数のメリット**：
   - 複数の関数で同じデータを共有できる
   - アプリ全体の設定や状態を管理できる
   - 定数として使うと便利

4. **グローバル変数の注意点**：
   - 使いすぎると、どこで値が変更されたかわかりにくい
   - 可能な限り、引数と戻り値を使う方が安全
   - 定数（変更しない値）として使うのは良い

5. **変数の検索順序（スコープチェーン）**：
   - ローカルスコープ → グローバルスコープの順で探す
   - 同じ名前の場合、ローカル変数が優先される

### いつグローバル変数を使うか？

**使って良い場合** ✅：
- アプリ全体で使う設定値や定数
- 複数の関数で共有する必要がある状態

**避けるべき場合** ❌：
- 一つの関数内だけで使う値
- 引数と戻り値で代用できる場合

### 基本パターン

```javascript
// グローバル変数（関数の外で宣言）
const APP_NAME = 'マイアプリ';  // 定数
let count = 0;                  // 状態

function increment() {
  // ローカル変数
  const message = 'カウント: ';

  // グローバル変数を更新
  count = count + 1;

  // グローバル変数とローカル変数を使う
  alert(message + count);
}
```

グローバル変数とローカル変数を適切に使い分けることで、より効果的なプログラムを書けるようになります！

---

## カリキュラム要件チェック

このレッスンで、以下のカリキュラム要件を満たしました：

- ✅ **関数外の変数**：関数の外で宣言した変数がグローバル変数になることを学びました
- ✅ **どこからでもアクセス**：グローバル変数はプログラムのどこからでもアクセスできることを確認しました
- ✅ **注意点**：グローバル変数の使いすぎによる問題と、適切な使い方を学びました
- ✅ **知識：グローバルスコープ、変数の可視性**：スコープの概念と変数の可視性について理解しました
- ✅ **成果物：変数アクセス**：カウンターアプリ、ポイント管理アプリ、テーマ切り替えアプリを通じて、変数アクセスを実践的に理解しました

---

## 次のレッスンの予告

次のレッスンでは、**引数と戻り値の型**について学びます。

- 数値を受け取る関数
- 文字列を受け取る関数
- 異なる型のデータの扱い方
- 型変換の注意点

関数が受け取るデータの型を意識することで、より安全で正確なプログラムを書けるようになります！
