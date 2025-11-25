# レッスン36: 週のまとめプロジェクト

## なぜ重要なのか

これまで学んだ条件分岐の知識を組み合わせると、実用的なシステムが作れます。実際のウェブサイトでは、複数の判定機能が1つのページで動作しています。

| サービス | 使われている機能 | 具体例 |
|---------|----------------|--------|
| **Amazon** | 年齢確認、在庫判定、配送可否 | 「20歳以上」「在庫あり」「配送可能地域」の複数判定 |
| **Twitter** | 年齢制限、フォロワー数表示、いいね数判定 | アカウント年齢、フォロワー数、投稿の人気度を同時に判定 |
| **YouTube** | 視聴制限、再生回数判定、登録者数表示 | 年齢制限、人気動画判定、チャンネル規模の複合判定 |
| **楽天市場** | ポイント判定、価格判定、レビュー評価 | 「ポイント10倍」「送料無料」「高評価」を同時表示 |
| **食べログ** | 評価判定、予算判定、営業時間確認 | 「★4以上」「3000円以下」「営業中」の複数条件 |

## 基本概念の説明

### 総合判定システムとは

これまで学んだ条件分岐を**1つのプログラムに統合**したものです。

```
┌─────────────────────────────────────┐
│    総合判定システム                  │
│                                     │
│  ┌─────────────┐                   │
│  │ 年齢判定     │ ← if文で判定     │
│  └─────────────┘                   │
│                                     │
│  ┌─────────────┐                   │
│  │ 点数判定     │ ← if文で判定     │
│  └─────────────┘                   │
│                                     │
│  ┌─────────────┐                   │
│  │ カウンター判定│ ← if文で判定     │
│  └─────────────┘                   │
│                                     │
│  ┌─────────────┐                   │
│  │ 文字列判定   │ ← if文で判定     │
│  └─────────────┘                   │
└─────────────────────────────────────┘
```

**特徴**:
- 複数の関数を1つのファイルに記述
- それぞれ独立した判定ロジック
- HTML側で適切に呼び分け
- 変数のスコープ（有効範囲）に注意

## 動作の流れ

### 総合判定システムの実行フロー

```
【ユーザーの操作】
     ↓
1. ボタンをクリック
     ↓
2. 対応する関数が実行される
     ↓
3. 変数の値を取得
     ↓
4. if文で条件を判定
     ↓
5. 条件に応じた処理を実行
     ↓
6. 結果を画面に表示
     ↓
7. 他のボタンも独立して動作
```

### 複数の判定が同時に動作する仕組み

```javascript
// 年齢判定関数
function checkAge() {
  let age = 25;

  if (age >= 20) {
    // 「成人です」と表示
  }

  if (age >= 18) {
    // 「高校卒業年齢です」と表示
  }
}

// 点数判定関数
function checkScore() {
  let score = 85;

  if (score >= 80) {
    // 「良好です」と表示
  }

  if (score >= 60) {
    // 「合格です」と表示
  }
}
```

**ポイント**: それぞれの関数は独立しているため、片方の実行が他方に影響しない

## これまで学んだ内容の復習

### レッスン33: 条件分岐入門

```javascript
let age = 20;

if (age >= 18) {
  console.log("大人です");
}
```

**学んだこと**:
- `if`文の基本構文
- 比較演算子（`>=`, `<=`, `>`, `<`）
- 真偽値（`true`/`false`）
- ブロック `{}` の概念

### レッスン34: 比較演算子

```javascript
let score = 60;

if (score === 60) {
  console.log("ちょうど60点");
}

if (score !== 100) {
  console.log("100点ではありません");
}
```

**学んだこと**:
- `===`（厳密等価）
- `!==`（厳密不等価）
- 6つの比較演算子の使い分け

### レッスン35: 文字列の比較

```javascript
let password = "hello";

if (password === "hello") {
  console.log("ログイン成功");
}
```

**学んだこと**:
- 文字列の比較方法
- 大文字小文字の区別
- パスワードチェックの実装

## 年齢判定の実装

### 基本的な年齢判定

```javascript
function checkAge() {
  let age = 25;

  if (age >= 20) {
    const elem = document.getElementById("result1");
    elem.textContent = "成人です";
  }

  if (age >= 18) {
    const elem = document.getElementById("result2");
    elem.textContent = "高校卒業年齢です";
  }

  if (age < 18) {
    const elem = document.getElementById("result3");
    elem.textContent = "未成年です";
  }
}
```

### 動作の詳細

| age の値 | 1つ目のif | 2つ目のif | 3つ目のif | 表示される内容 |
|---------|----------|----------|----------|--------------|
| 25 | `25 >= 20` → true | `25 >= 18` → true | `25 < 18` → false | 「成人です」「高校卒業年齢です」 |
| 19 | `19 >= 20` → false | `19 >= 18` → true | `19 < 18` → false | 「高校卒業年齢です」 |
| 15 | `15 >= 20` → false | `15 >= 18` → false | `15 < 18` → true | 「未成年です」 |

**重要**: 複数の`if`文は**すべて評価される**（どれか1つではない）

### 複数の条件が同時にtrueになる例

```javascript
let age = 25;

if (age >= 20) {
  console.log("成人です");        // ← 表示される
}

if (age >= 18) {
  console.log("高校卒業年齢です"); // ← これも表示される
}
```

**実行結果**:
```
成人です
高校卒業年齢です
```

両方の条件が`true`なので、**両方とも実行される**

## 点数判定の実装

### 基本的な点数判定

```javascript
function checkScore() {
  let score = 85;

  if (score >= 90) {
    const elem = document.getElementById("result1");
    elem.textContent = "優秀です";
  }

  if (score >= 80) {
    const elem = document.getElementById("result2");
    elem.textContent = "良好です";
  }

  if (score >= 60) {
    const elem = document.getElementById("result3");
    elem.textContent = "合格です";
  }

  if (score < 60) {
    const elem = document.getElementById("result4");
    elem.textContent = "不合格です";
  }
}
```

### 点数による判定結果の変化

| score の値 | >= 90 | >= 80 | >= 60 | < 60 | 表示される内容 |
|-----------|-------|-------|-------|------|--------------|
| 95 | ✅ | ✅ | ✅ | ❌ | 「優秀です」「良好です」「合格です」 |
| 85 | ❌ | ✅ | ✅ | ❌ | 「良好です」「合格です」 |
| 70 | ❌ | ❌ | ✅ | ❌ | 「合格です」 |
| 50 | ❌ | ❌ | ❌ | ✅ | 「不合格です」 |

### 境界値のテスト

```javascript
let score = 90;  // ちょうど90点

if (score >= 90) {
  console.log("優秀です");  // ← 表示される（>=は等しい場合を含む）
}

if (score > 90) {
  console.log("90点超え");  // ← 表示されない（>は等しい場合を含まない）
}
```

## カウンター判定の実装

### カウンターの基本実装

```javascript
let count = 0;  // グローバル変数（関数の外で宣言）

function addCount() {
  count++;  // countを1増やす
  const counter = document.getElementById("counter");
  counter.textContent = count;

  if (count >= 10) {
    const elem = document.getElementById("message1");
    elem.textContent = "10回以上クリックされました";
  }

  if (count >= 5) {
    const elem = document.getElementById("message2");
    elem.textContent = "5回以上クリックされました";
  }

  if (count === 1) {
    const elem = document.getElementById("message3");
    elem.textContent = "初めてのクリックです";
  }
}
```

### カウンターの動作フロー

```
【1回目のクリック】
count = 0 → count = 1
  ↓
判定:
- count >= 10 → false
- count >= 5  → false
- count === 1 → true ✅
  ↓
表示: 「初めてのクリックです」

【5回目のクリック】
count = 4 → count = 5
  ↓
判定:
- count >= 10 → false
- count >= 5  → true ✅
- count === 1 → false
  ↓
表示: 「5回以上クリックされました」

【10回目のクリック】
count = 9 → count = 10
  ↓
判定:
- count >= 10 → true ✅
- count >= 5  → true ✅
- count === 1 → false
  ↓
表示: 「10回以上クリックされました」
     「5回以上クリックされました」
```

### グローバル変数とローカル変数

```javascript
let count = 0;  // ← グローバル変数（関数の外）

function addCount() {
  let message = "クリックされました";  // ← ローカル変数（関数の中）
  count++;  // ← グローバル変数にアクセス可能
}

function showCount() {
  console.log(count);     // ← アクセス可能
  console.log(message);   // ← エラー！ messageは関数の外からアクセスできない
}
```

**重要な違い**:
- **グローバル変数**: どこからでもアクセス可能、値が保持される
- **ローカル変数**: 関数内でのみ有効、関数終了後は消える

## 複数の判定を組み合わせる

### HTMLの構造

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>総合判定システム</title>
  <script src="script.js"></script>
</head>
<body>
  <h1>総合判定システム</h1>

  <section>
    <h2>年齢判定</h2>
    <button onclick="checkAge()">判定する</button>
    <p id="age-result1"></p>
    <p id="age-result2"></p>
    <p id="age-result3"></p>
  </section>

  <section>
    <h2>点数判定</h2>
    <button onclick="checkScore()">判定する</button>
    <p id="score-result1"></p>
    <p id="score-result2"></p>
    <p id="score-result3"></p>
    <p id="score-result4"></p>
  </section>

  <section>
    <h2>カウンター判定</h2>
    <button onclick="addCount()">クリック</button>
    <p>カウント: <span id="counter">0</span></p>
    <p id="counter-message1"></p>
    <p id="counter-message2"></p>
    <p id="counter-message3"></p>
  </section>
</body>
</html>
```

### JavaScriptの完全実装

```javascript
// 年齢判定
function checkAge() {
  let age = 25;

  if (age >= 20) {
    const elem = document.getElementById("age-result1");
    elem.textContent = "成人です";
  }

  if (age >= 18) {
    const elem = document.getElementById("age-result2");
    elem.textContent = "高校卒業年齢です";
  }

  if (age < 18) {
    const elem = document.getElementById("age-result3");
    elem.textContent = "未成年です";
  }
}

// 点数判定
function checkScore() {
  let score = 85;

  if (score >= 90) {
    const elem = document.getElementById("score-result1");
    elem.textContent = "優秀です";
  }

  if (score >= 80) {
    const elem = document.getElementById("score-result2");
    elem.textContent = "良好です";
  }

  if (score >= 60) {
    const elem = document.getElementById("score-result3");
    elem.textContent = "合格です";
  }

  if (score < 60) {
    const elem = document.getElementById("score-result4");
    elem.textContent = "不合格です";
  }
}

// カウンター判定
let count = 0;

function addCount() {
  count++;
  const counter = document.getElementById("counter");
  counter.textContent = count;

  if (count >= 10) {
    const elem = document.getElementById("counter-message1");
    elem.textContent = "10回以上クリックされました";
  }

  if (count >= 5) {
    const elem = document.getElementById("counter-message2");
    elem.textContent = "5回以上クリックされました";
  }

  if (count === 1) {
    const elem = document.getElementById("counter-message3");
    elem.textContent = "初めてのクリックです";
  }
}
```

## よくある間違いと解決方法

### ❌ 間違い1: IDの重複

```javascript
function checkAge() {
  if (age >= 20) {
    const elem = document.getElementById("result");
    elem.textContent = "成人です";
  }
}

function checkScore() {
  if (score >= 60) {
    const elem = document.getElementById("result");  // ← 同じID！
    elem.textContent = "合格です";
  }
}
```

**何が問題か**: 同じIDを複数の要素に使うと、最初の1つしか取得できない

**エラーメッセージ**: 表示されない（JavaScriptエラーは出ないが期待通り動かない）

**✅ 正しい書き方**:

```javascript
function checkAge() {
  if (age >= 20) {
    const elem = document.getElementById("age-result");  // ← 固有のID
    elem.textContent = "成人です";
  }
}

function checkScore() {
  if (score >= 60) {
    const elem = document.getElementById("score-result");  // ← 別のID
    elem.textContent = "合格です";
  }
}
```

### ❌ 間違い2: グローバル変数をローカル変数として宣言

```javascript
function addCount() {
  let count = 0;  // ← 関数内でletを使うとローカル変数になる
  count++;
  console.log(count);  // 常に1が表示される
}
```

**何が問題か**: 関数が呼ばれるたびに`count`が0にリセットされる

**✅ 正しい書き方**:

```javascript
let count = 0;  // ← 関数の外で宣言（グローバル変数）

function addCount() {
  count++;  // ← letを付けない（既存の変数を更新）
  console.log(count);  // 1, 2, 3, 4... と増える
}
```

### ❌ 間違い3: if文の条件順序が不適切

```javascript
function checkScore() {
  let score = 95;

  if (score >= 60) {
    console.log("合格です");  // ← 先に表示される
  }

  if (score >= 90) {
    console.log("優秀です");  // ← 後に表示される
  }
}
```

**実行結果**:
```
合格です
優秀です
```

**何が問題か**: 表示順序が期待と違う（「優秀です」を先に表示したい場合）

**✅ 正しい書き方**:

```javascript
function checkScore() {
  let score = 95;

  if (score >= 90) {
    console.log("優秀です");  // ← 高い条件を先に
  }

  if (score >= 60) {
    console.log("合格です");  // ← 低い条件を後に
  }
}
```

### ❌ 間違い4: 複数の結果を同じ要素に表示

```javascript
function checkAge() {
  let age = 25;
  const elem = document.getElementById("result");

  if (age >= 20) {
    elem.textContent = "成人です";
  }

  if (age >= 18) {
    elem.textContent = "高校卒業年齢です";  // ← 上書きされる
  }
}
```

**実行結果**: 「高校卒業年齢です」のみ表示される（「成人です」は消える）

**✅ 正しい書き方**:

```javascript
function checkAge() {
  let age = 25;

  if (age >= 20) {
    const elem1 = document.getElementById("result1");  // ← 別々の要素
    elem1.textContent = "成人です";
  }

  if (age >= 18) {
    const elem2 = document.getElementById("result2");  // ← 別々の要素
    elem2.textContent = "高校卒業年齢です";
  }
}
```

### ❌ 間違い5: 関数名の重複

```javascript
function check() {
  let age = 20;
  // 年齢判定
}

function check() {  // ← 同じ関数名
  let score = 80;
  // 点数判定
}
```

**何が問題か**: 後から定義した関数が前の関数を上書きする

**✅ 正しい書き方**:

```javascript
function checkAge() {  // ← 明確な名前
  let age = 20;
  // 年齢判定
}

function checkScore() {  // ← 別の明確な名前
  let score = 80;
  // 点数判定
}
```

### ❌ 間違い6: カウンターのリセット忘れ

```javascript
let count = 0;

function addCount() {
  count++;
  // ...判定処理
}

// リセットボタンの処理がない
```

**何が問題か**: 一度カウントを増やすと元に戻せない

**✅ 正しい書き方**:

```javascript
let count = 0;

function addCount() {
  count++;
  updateDisplay();
}

function resetCount() {  // ← リセット関数を追加
  count = 0;
  updateDisplay();
}

function updateDisplay() {
  const counter = document.getElementById("counter");
  counter.textContent = count;
}
```

## 実用例

### 実用例1: 完全な判定システム

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>総合判定システム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
    }
    section {
      margin: 30px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
    .result {
      margin: 10px 0;
      padding: 10px;
      background-color: #f0f0f0;
      border-radius: 3px;
      min-height: 20px;
    }
  </style>
</head>
<body>
  <h1>総合判定システム</h1>

  <section>
    <h2>年齢判定</h2>
    <button onclick="checkAge()">判定する</button>
    <div class="result" id="age-result1"></div>
    <div class="result" id="age-result2"></div>
    <div class="result" id="age-result3"></div>
  </section>

  <section>
    <h2>点数判定</h2>
    <button onclick="checkScore()">判定する</button>
    <div class="result" id="score-result1"></div>
    <div class="result" id="score-result2"></div>
    <div class="result" id="score-result3"></div>
    <div class="result" id="score-result4"></div>
  </section>

  <section>
    <h2>カウンター判定</h2>
    <button onclick="addCount()">クリック</button>
    <button onclick="resetCount()">リセット</button>
    <p>カウント: <span id="counter">0</span></p>
    <div class="result" id="counter-message1"></div>
    <div class="result" id="counter-message2"></div>
    <div class="result" id="counter-message3"></div>
  </section>

  <script>
    // 年齢判定
    function checkAge() {
      let age = 25;

      if (age >= 20) {
        const elem = document.getElementById("age-result1");
        elem.textContent = "✅ 成人です";
      }

      if (age >= 18) {
        const elem = document.getElementById("age-result2");
        elem.textContent = "✅ 高校卒業年齢です";
      }

      if (age < 18) {
        const elem = document.getElementById("age-result3");
        elem.textContent = "❌ 未成年です";
      }
    }

    // 点数判定
    function checkScore() {
      let score = 85;

      if (score >= 90) {
        const elem = document.getElementById("score-result1");
        elem.textContent = "🌟 優秀です";
      }

      if (score >= 80) {
        const elem = document.getElementById("score-result2");
        elem.textContent = "😊 良好です";
      }

      if (score >= 60) {
        const elem = document.getElementById("score-result3");
        elem.textContent = "✅ 合格です";
      }

      if (score < 60) {
        const elem = document.getElementById("score-result4");
        elem.textContent = "❌ 不合格です";
      }
    }

    // カウンター判定
    let count = 0;

    function addCount() {
      count++;
      updateCounter();
    }

    function resetCount() {
      count = 0;
      updateCounter();
      // メッセージをクリア
      document.getElementById("counter-message1").textContent = "";
      document.getElementById("counter-message2").textContent = "";
      document.getElementById("counter-message3").textContent = "";
    }

    function updateCounter() {
      const counter = document.getElementById("counter");
      counter.textContent = count;

      if (count >= 10) {
        const elem = document.getElementById("counter-message1");
        elem.textContent = "🎉 10回以上クリックされました";
      }

      if (count >= 5) {
        const elem = document.getElementById("counter-message2");
        elem.textContent = "👍 5回以上クリックされました";
      }

      if (count === 1) {
        const elem = document.getElementById("counter-message3");
        elem.textContent = "🎊 初めてのクリックです";
      }
    }
  </script>
</body>
</html>
```

### 実用例2: パスワード判定を含む総合システム

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>認証と判定システム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
    }
    section {
      margin: 30px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      margin-right: 10px;
    }
    .success {
      color: green;
      font-weight: bold;
    }
    .error {
      color: red;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>認証と判定システム</h1>

  <section>
    <h2>パスワード認証</h2>
    <button onclick="checkPassword()">ログイン</button>
    <p id="password-result"></p>
  </section>

  <section>
    <h2>年齢判定</h2>
    <button onclick="checkAge()">判定する</button>
    <p id="age-result"></p>
  </section>

  <section>
    <h2>点数判定</h2>
    <button onclick="checkScore()">判定する</button>
    <p id="score-result"></p>
  </section>

  <script>
    // パスワード認証
    function checkPassword() {
      let password = "abc123";
      const elem = document.getElementById("password-result");

      if (password === "abc123") {
        elem.textContent = "✅ ログイン成功";
        elem.className = "success";
      }

      if (password !== "abc123") {
        elem.textContent = "❌ パスワードが違います";
        elem.className = "error";
      }
    }

    // 年齢判定
    function checkAge() {
      let age = 20;
      const elem = document.getElementById("age-result");

      if (age >= 20) {
        elem.textContent = "✅ 成人です";
        elem.className = "success";
      }

      if (age < 20) {
        elem.textContent = "❌ 未成年です";
        elem.className = "error";
      }
    }

    // 点数判定
    function checkScore() {
      let score = 75;
      const elem = document.getElementById("score-result");

      if (score >= 80) {
        elem.textContent = "🌟 優秀です";
        elem.className = "success";
      }

      if (score >= 60) {
        elem.textContent = "✅ 合格です";
        elem.className = "success";
      }

      if (score < 60) {
        elem.textContent = "❌ 不合格です";
        elem.className = "error";
      }
    }
  </script>
</body>
</html>
```

### 実用例3: すべての条件を表示するシステム

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>詳細判定システム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 700px;
      margin: 50px auto;
    }
    .judge-box {
      margin: 20px 0;
      padding: 20px;
      border: 2px solid #333;
      border-radius: 8px;
    }
    .condition {
      margin: 10px 0;
      padding: 10px;
      background-color: #f9f9f9;
      border-left: 4px solid #ccc;
    }
    .true {
      border-left-color: green;
      background-color: #e8f5e9;
    }
    .false {
      border-left-color: red;
      background-color: #ffebee;
    }
  </style>
</head>
<body>
  <h1>詳細判定システム</h1>

  <div class="judge-box">
    <h2>点数の総合判定</h2>
    <button onclick="judgeScore()">判定する</button>
    <div id="score-conditions"></div>
  </div>

  <script>
    function judgeScore() {
      let score = 85;
      const container = document.getElementById("score-conditions");
      container.innerHTML = "";  // クリア

      // 条件1
      const cond1 = document.createElement("div");
      cond1.className = "condition";
      if (score >= 90) {
        cond1.className += " true";
        cond1.textContent = "✅ score >= 90: true（優秀です）";
      } else {
        cond1.className += " false";
        cond1.textContent = "❌ score >= 90: false";
      }
      container.appendChild(cond1);

      // 条件2
      const cond2 = document.createElement("div");
      cond2.className = "condition";
      if (score >= 80) {
        cond2.className += " true";
        cond2.textContent = "✅ score >= 80: true（良好です）";
      } else {
        cond2.className += " false";
        cond2.textContent = "❌ score >= 80: false";
      }
      container.appendChild(cond2);

      // 条件3
      const cond3 = document.createElement("div");
      cond3.className = "condition";
      if (score >= 60) {
        cond3.className += " true";
        cond3.textContent = "✅ score >= 60: true（合格です）";
      } else {
        cond3.className += " false";
        cond3.textContent = "❌ score >= 60: false";
      }
      container.appendChild(cond3);

      // 条件4
      const cond4 = document.createElement("div");
      cond4.className = "condition";
      if (score < 60) {
        cond4.className += " true";
        cond4.textContent = "✅ score < 60: true（不合格です）";
      } else {
        cond4.className += " false";
        cond4.textContent = "❌ score < 60: false";
      }
      container.appendChild(cond4);

      // 現在の点数を表示
      const summary = document.createElement("div");
      summary.style.marginTop = "20px";
      summary.style.fontWeight = "bold";
      summary.textContent = `現在の点数: ${score}点`;
      container.appendChild(summary);
    }
  </script>
</body>
</html>
```

### 実用例4: インタラクティブなカウンターシステム

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>インタラクティブカウンター</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      text-align: center;
    }
    #counter-display {
      font-size: 72px;
      font-weight: bold;
      margin: 30px 0;
      color: #333;
    }
    .buttons {
      margin: 20px 0;
    }
    button {
      padding: 15px 30px;
      font-size: 18px;
      margin: 5px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
    }
    .increment {
      background-color: #4CAF50;
      color: white;
    }
    .decrement {
      background-color: #f44336;
      color: white;
    }
    .reset {
      background-color: #999;
      color: white;
    }
    .message {
      margin: 10px 0;
      padding: 15px;
      border-radius: 5px;
      font-size: 18px;
      min-height: 30px;
    }
    .milestone {
      background-color: #fff3cd;
      border: 2px solid #ffc107;
    }
  </style>
</head>
<body>
  <h1>インタラクティブカウンター</h1>

  <div id="counter-display">0</div>

  <div class="buttons">
    <button class="increment" onclick="increment()">+1</button>
    <button class="decrement" onclick="decrement()">-1</button>
    <button class="reset" onclick="reset()">リセット</button>
  </div>

  <div class="message" id="message1"></div>
  <div class="message" id="message2"></div>
  <div class="message" id="message3"></div>

  <script>
    let count = 0;

    function increment() {
      count++;
      updateDisplay();
    }

    function decrement() {
      count--;
      updateDisplay();
    }

    function reset() {
      count = 0;
      updateDisplay();
    }

    function updateDisplay() {
      // カウント表示を更新
      const display = document.getElementById("counter-display");
      display.textContent = count;

      // メッセージをクリア
      document.getElementById("message1").textContent = "";
      document.getElementById("message2").textContent = "";
      document.getElementById("message3").textContent = "";

      // 判定と表示
      if (count >= 10) {
        const elem = document.getElementById("message1");
        elem.textContent = "🎉 すごい！10回以上です！";
        elem.className = "message milestone";
      }

      if (count >= 5) {
        const elem = document.getElementById("message2");
        elem.textContent = "👍 5回以上クリックされました";
      }

      if (count === 0) {
        const elem = document.getElementById("message3");
        elem.textContent = "📍 カウントはゼロです";
      }

      if (count < 0) {
        const elem = document.getElementById("message3");
        elem.textContent = "⚠️ マイナスになっています";
        elem.style.color = "red";
      }
    }

    // 初期表示
    updateDisplay();
  </script>
</body>
</html>
```

## 変数の値を変えて試す

### 年齢を変えてテスト

```javascript
// テストケース1: 成人
let age = 25;
checkAge();  // 「成人です」「高校卒業年齢です」

// テストケース2: 高校卒業年齢
let age = 19;
checkAge();  // 「高校卒業年齢です」

// テストケース3: 未成年
let age = 15;
checkAge();  // 「未成年です」

// テストケース4: 境界値（20歳ちょうど）
let age = 20;
checkAge();  // 「成人です」「高校卒業年齢です」

// テストケース5: 境界値（18歳ちょうど）
let age = 18;
checkAge();  // 「高校卒業年齢です」
```

### 点数を変えてテスト

```javascript
// テストケース1: 優秀
let score = 95;
checkScore();  // 「優秀です」「良好です」「合格です」

// テストケース2: 良好
let score = 85;
checkScore();  // 「良好です」「合格です」

// テストケース3: 合格
let score = 70;
checkScore();  // 「合格です」

// テストケース4: 不合格
let score = 50;
checkScore();  // 「不合格です」

// テストケース5: 境界値（60点ちょうど）
let score = 60;
checkScore();  // 「合格です」

// テストケース6: 境界値（59点）
let score = 59;
checkScore();  // 「不合格です」
```

### パスワードを変えてテスト

```javascript
// テストケース1: 正しいパスワード
let password = "abc123";
checkPassword();  // 「ログイン成功」

// テストケース2: 間違ったパスワード
let password = "wrong";
checkPassword();  // 「パスワードが違います」

// テストケース3: 大文字小文字が違う
let password = "ABC123";
checkPassword();  // 「パスワードが違います」

// テストケース4: 空文字列
let password = "";
checkPassword();  // 「パスワードが違います」
```

## 練習問題

### 問題1: 年齢と点数の判定システム

以下の仕様で判定システムを作成してください。

**仕様**:
1. 年齢判定ボタンをクリックすると、`age`が18歳以上なら「大人です」と表示
2. 点数判定ボタンをクリックすると、`score`が70点以上なら「合格です」と表示
3. それぞれ別の`<p>`要素に表示する

**ヒント**:
<details>
<summary>ヒント1: HTMLの構造</summary>

2つの`<section>`を作り、それぞれにボタンと結果表示用の`<p>`を配置します。

```html
<section>
  <h2>年齢判定</h2>
  <button onclick="???">判定する</button>
  <p id="???"></p>
</section>
```
</details>

<details>
<summary>ヒント2: 年齢判定の関数名</summary>

関数名は`checkAge`が適切です。

```javascript
function checkAge() {
  let age = ???;
  // ...
}
```
</details>

<details>
<summary>ヒント3: if文の条件</summary>

年齢の条件は`age >= 18`、点数の条件は`score >= 70`です。

```javascript
if (age >= 18) {
  // ...
}
```
</details>

<details>
<summary>ヒント4: 要素の取得</summary>

`document.getElementById("age-result")`のように、固有のIDで要素を取得します。

```javascript
const elem = document.getElementById("age-result");
```
</details>

<details>
<summary>ヒント5: テキストの設定</summary>

取得した要素の`textContent`プロパティに文字列を代入します。

```javascript
elem.textContent = "大人です";
```
</details>

<details>
<summary>ヒント6: 点数判定の関数</summary>

年齢判定と同じ構造で、変数名と条件を変更します。

```javascript
function checkScore() {
  let score = ???;

  if (score >= 70) {
    const elem = document.getElementById("score-result");
    elem.textContent = "合格です";
  }
}
```
</details>

<details>
<summary>ヒント7: 完全な解答例</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>判定システム</title>
</head>
<body>
  <h1>判定システム</h1>

  <section>
    <h2>年齢判定</h2>
    <button onclick="checkAge()">判定する</button>
    <p id="age-result"></p>
  </section>

  <section>
    <h2>点数判定</h2>
    <button onclick="checkScore()">判定する</button>
    <p id="score-result"></p>
  </section>

  <script>
    function checkAge() {
      let age = 20;

      if (age >= 18) {
        const elem = document.getElementById("age-result");
        elem.textContent = "大人です";
      }
    }

    function checkScore() {
      let score = 75;

      if (score >= 70) {
        const elem = document.getElementById("score-result");
        elem.textContent = "合格です";
      }
    }
  </script>
</body>
</html>
```
</details>

### 問題2: カウンターとメッセージ表示

クリック回数に応じてメッセージを表示するカウンターを作成してください。

**仕様**:
1. クリックボタンを押すたびにカウントが1増える
2. カウントが3以上の場合: 「3回以上クリックされました」
3. カウントが7以上の場合: 「7回以上クリックされました」
4. カウントが10とぴったり等しい場合: 「ちょうど10回です」

**ヒント**:
<details>
<summary>ヒント1: グローバル変数の宣言</summary>

カウンターの値を保持するため、関数の外で変数を宣言します。

```javascript
let count = 0;
```
</details>

<details>
<summary>ヒント2: カウントを増やす</summary>

`count++`でカウントを1増やします。

```javascript
function addCount() {
  count++;
  // ...
}
```
</details>

<details>
<summary>ヒント3: カウントの表示</summary>

カウントを表示する要素を取得し、`textContent`を更新します。

```javascript
const counter = document.getElementById("counter");
counter.textContent = count;
```
</details>

<details>
<summary>ヒント4: 3以上の判定</summary>

`if (count >= 3)`で判定します。

```javascript
if (count >= 3) {
  const elem = document.getElementById("message1");
  elem.textContent = "3回以上クリックされました";
}
```
</details>

<details>
<summary>ヒント5: 10とぴったり等しい判定</summary>

`===`を使って厳密等価で判定します。

```javascript
if (count === 10) {
  const elem = document.getElementById("message3");
  elem.textContent = "ちょうど10回です";
}
```
</details>

<details>
<summary>ヒント6: HTMLの構造</summary>

カウント表示用の`<span>`とメッセージ表示用の`<p>`を複数用意します。

```html
<p>カウント: <span id="counter">0</span></p>
<p id="message1"></p>
<p id="message2"></p>
<p id="message3"></p>
```
</details>

<details>
<summary>ヒント7: 完全な解答例</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>カウンターシステム</title>
</head>
<body>
  <h1>カウンターシステム</h1>

  <button onclick="addCount()">クリック</button>
  <p>カウント: <span id="counter">0</span></p>
  <p id="message1"></p>
  <p id="message2"></p>
  <p id="message3"></p>

  <script>
    let count = 0;

    function addCount() {
      count++;
      const counter = document.getElementById("counter");
      counter.textContent = count;

      if (count >= 7) {
        const elem = document.getElementById("message2");
        elem.textContent = "7回以上クリックされました";
      }

      if (count >= 3) {
        const elem = document.getElementById("message1");
        elem.textContent = "3回以上クリックされました";
      }

      if (count === 10) {
        const elem = document.getElementById("message3");
        elem.textContent = "ちょうど10回です";
      }
    }
  </script>
</body>
</html>
```
</details>

### 問題3: パスワードと数値の判定

パスワード認証と数値判定を行うシステムを作成してください。

**仕様**:
1. パスワード判定ボタン: `password`が"hello"と等しい場合に「認証成功」と表示
2. 数値判定ボタン: `score`が100と等しい場合に「満点です」と表示
3. それぞれ別のボタンと表示エリアを用意

**ヒント**:
<details>
<summary>ヒント1: 文字列の比較</summary>

文字列の比較には`===`を使います。

```javascript
if (password === "hello") {
  // ...
}
```
</details>

<details>
<summary>ヒント2: パスワード判定の関数</summary>

`checkPassword`という関数名が適切です。

```javascript
function checkPassword() {
  let password = "hello";
  // ...
}
```
</details>

<details>
<summary>ヒント3: 数値の厳密等価</summary>

数値も`===`で比較します。

```javascript
if (score === 100) {
  // ...
}
```
</details>

<details>
<summary>ヒント4: 2つの関数を作る</summary>

パスワード用と数値用で2つの独立した関数を作ります。

```javascript
function checkPassword() { /* ... */ }
function checkScore() { /* ... */ }
```
</details>

<details>
<summary>ヒント5: 別々のID</summary>

パスワード結果用と点数結果用で別々のIDを使います。

```html
<p id="password-result"></p>
<p id="score-result"></p>
```
</details>

<details>
<summary>ヒント6: ボタンのonclick</summary>

各ボタンに適切な関数を割り当てます。

```html
<button onclick="checkPassword()">パスワード判定</button>
<button onclick="checkScore()">点数判定</button>
```
</details>

<details>
<summary>ヒント7: 完全な解答例</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>認証と判定</title>
</head>
<body>
  <h1>認証と判定システム</h1>

  <section>
    <h2>パスワード認証</h2>
    <button onclick="checkPassword()">判定する</button>
    <p id="password-result"></p>
  </section>

  <section>
    <h2>数値判定</h2>
    <button onclick="checkScore()">判定する</button>
    <p id="score-result"></p>
  </section>

  <script>
    function checkPassword() {
      let password = "hello";

      if (password === "hello") {
        const elem = document.getElementById("password-result");
        elem.textContent = "認証成功";
      }
    }

    function checkScore() {
      let score = 100;

      if (score === 100) {
        const elem = document.getElementById("score-result");
        elem.textContent = "満点です";
      }
    }
  </script>
</body>
</html>
```
</details>

## チェックリスト

このレッスンを終える前に、以下の項目を確認してください。

- [ ] 年齢判定プログラムが動作する
- [ ] 点数判定プログラムが動作する
- [ ] カウンター判定プログラムが動作する
- [ ] パスワード判定プログラムが動作する
- [ ] 複数の関数を1つのファイルに書ける
- [ ] グローバル変数とローカル変数の違いを理解している
- [ ] 各関数が独立して動作することを確認した
- [ ] IDの重複がないか確認した
- [ ] 変数の値を変えて動作を確認した
- [ ] 境界値でテストした

## デバッグのヒント

プログラムが期待通りに動かない場合は、以下を確認してください。

1. **HTML側のID確認**
   ```html
   <!-- IDがJavaScriptと一致しているか -->
   <p id="age-result"></p>
   ```

2. **JavaScript側のID確認**
   ```javascript
   // HTML側と同じIDを使っているか
   document.getElementById("age-result")
   ```

3. **関数名の一致確認**
   ```html
   <!-- HTML側 -->
   <button onclick="checkAge()">判定する</button>
   ```
   ```javascript
   // JavaScript側
   function checkAge() { /* ... */ }
   ```

4. **グローバル変数の宣言場所**
   ```javascript
   // 関数の外で宣言（正しい）
   let count = 0;

   function addCount() {
     count++;  // letを付けない
   }
   ```

5. **変数の値を確認**
   ```javascript
   function checkAge() {
     let age = 25;
     console.log("age:", age);  // ← コンソールで確認

     if (age >= 20) {
       console.log("条件がtrueです");  // ← 実行されたか確認
     }
   }
   ```

6. **条件式の確認**
   ```javascript
   // >= なのか > なのか
   if (age >= 20) { /* ... */ }  // 20を含む
   if (age > 20) { /* ... */ }   // 20を含まない
   ```

## ポイント

1. **複数の関数を1つのファイルに書ける**: 各機能を独立した関数にまとめる
2. **グローバル変数は関数の外で宣言**: 複数の関数から同じ変数にアクセスできる
3. **ローカル変数は関数の中で宣言**: その関数内でのみ有効
4. **IDは重複させない**: 各要素に固有のIDを付ける
5. **関数名は明確に**: `checkAge`、`checkScore`など目的がわかる名前
6. **複数のif文はすべて評価される**: 条件に合うものはすべて実行される
7. **境界値をテスト**: `>=`と`>`の違いを理解し、境界値で動作確認

## できるようになったこと

このレッスンを終えると、以下のことができるようになります。

- [ ] これまで学んだif文、比較演算子、文字列の比較を組み合わせられる
- [ ] 年齢判定プログラムを作成できる
- [ ] 点数判定プログラムを作成できる
- [ ] カウンター判定プログラムを作成できる
- [ ] パスワード判定プログラムを作成できる
- [ ] 複数の判定機能を1つのHTMLファイルにまとめられる
- [ ] グローバル変数とローカル変数を使い分けられる
- [ ] 変数の値を変えて動作をテストできる

## まとめ

このレッスンでは、これまで学んだ条件分岐の知識を統合しました。

最も重要なポイントは以下の7つです。

1. **統合の考え方**: 複数の判定機能を1つのプログラムにまとめることができる
2. **関数の独立性**: 各関数は独立しており、互いに影響しない
3. **グローバル変数の役割**: カウンターなど、複数の関数呼び出しで値を保持したい場合に使う
4. **ローカル変数の役割**: 関数内でのみ使う一時的な値を格納する
5. **IDの一意性**: HTML要素のIDは重複させず、JavaScript側と一致させる
6. **複数if文の動作**: 複数のif文は独立して評価され、条件が合えばすべて実行される
7. **テストの重要性**: 変数の値を変えて、様々なケースで動作を確認する

## 次のステップ

次の章では、**else文**を使った「どちらか一方」の判定について学びます。

これまでは複数のif文を書いていましたが、else文を使うと「条件が満たされない場合」の処理を簡潔に書けます。

```javascript
// 次のレッスンで学ぶこと
if (age >= 20) {
  console.log("成人です");
} else {
  console.log("未成年です");  // ← else文で「それ以外」を処理
}
```

お疲れ様でした！
