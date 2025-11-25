# レッスン46：NOT演算（!）

## なぜ重要なのか

NOT演算（!）は、**条件を反転させて「〜でない」という否定の判定**を行います。実際のWebサービスでは、除外条件や権限チェックなど、あらゆる場面で使われています。

| サービス | 使用場面 | 条件の例 |
|---------|---------|---------|
| **Twitter** | 投稿制限 | !isBanned（凍結されていない）&& テキスト入力済み |
| **YouTube** | 年齢制限 | !isAdult（成人でない）→ 一部コンテンツ非表示 |
| **Amazon** | 配送可否 | !isOutOfStock（在庫切れでない）→ 購入可能 |
| **Gmail** | スパムフィルタ | !isSpam（スパムでない）→ 受信トレイに表示 |
| **GitHub** | ブランチ保護 | !isProtected（保護されていない）→ 直接プッシュ可能 |

**学ぶべき理由：**
- 否定条件を簡潔に表現できる
- 除外判定を直感的に書ける
- フラグの切り替えに使える
- AND、ORと組み合わせて複雑な条件を表現できる

---

## 基本概念の説明

### NOT演算子（!）とは

**!（ノット）** は、**真偽値を反転させる**演算子です。

```
!条件
```

**真偽値表（Truth Table）：**

```
┌─────────┬──────────┐
│  条件   │  !条件   │
├─────────┼──────────┤
│ true    │ false ❌ │
│ false   │ true  ✅ │
└─────────┴──────────┘
```

**重要なポイント：**
- trueをfalseに、falseをtrueに反転する
- 単項演算子（1つの値に対して作用）
- 優先順位が高い（比較演算子より先に評価される）

### 否定の表現方法の比較

| 表現 | 方法1（NOT使用） | 方法2（比較演算子） | 推奨 |
|------|----------------|-------------------|------|
| 等しくない | `!(a === b)` | `a !== b` | **方法2** |
| 未満でない | `!(a < 18)` | `a >= 18` | **方法2** |
| 空でない | `!(name === "")` | `name !== ""` | **方法2** |
| ログインしていない | `!isLoggedIn` | `isLoggedIn === false` | **方法1** |
| 雨でない | `!isRaining` | `isRaining === false` | **方法1** |

**使い分けの原則：**
- **真偽値の変数**：`!isLoggedIn` のようにNOTを使う
- **比較の否定**：`a !== b` のように不等号を使う

---

## 動作の流れ

### 基本的な評価の流れ

```
    スタート
       ↓
   ┌─────────┐
   │ 条件を  │
   │ 評価    │
   └────┬────┘
        │
    ┌───┴───┐
    │       │
   true    false
    │       │
    ↓       ↓
  false    true
    │       │
    └───┬───┘
        ↓
     結果を返す
```

### 実際の例：雨でない時の判定

```javascript
const isRaining = false;

if (!isRaining) {
  console.log("散歩に行けます");
}
```

**評価の流れ：**

```
ステップ1: isRaining を評価
          → false

ステップ2: !false を評価
          → true ✅

結果: if文の中身が実行される
     「散歩に行けます」と表示
```

### 複数条件の否定

```javascript
const isWeekend = false;
const isHoliday = false;

if (!(isWeekend || isHoliday)) {
  console.log("平日です");
}
```

**評価の流れ：**

```
ステップ1: isWeekend || isHoliday を評価
          false || false
          → false

ステップ2: !(false) を評価
          → true ✅

結果: if文の中身が実行される
     「平日です」と表示
```

---

## 詳細解説

### ❶ 基本的な使い方

**真偽値の反転：**

```javascript
const isLoggedIn = false;

if (!isLoggedIn) {
  console.log("ログインしてください");
} else {
  console.log("ログイン済みです");
}
```

| isLoggedIn | !isLoggedIn | 出力 |
|-----------|------------|------|
| true | false | "ログイン済みです" |
| false | true | "ログインしてください" |

**ポイント：**
- `!isLoggedIn` は「ログインしていない」という意味
- 真偽値の変数に直接使うと読みやすい

### ❷ チェックボックスとの組み合わせ

```javascript
function checkAgreement() {
  const agreed = document.getElementById("agree").checked;
  const result = document.getElementById("result");

  // 同意していない場合
  if (!agreed) {
    result.textContent = "❌ 利用規約に同意してください";
  } else {
    result.textContent = "✅ 登録できます";
  }
}
```

**評価例：**

| agreed (checked) | !agreed | 結果 |
|-----------------|---------|------|
| true | false | "✅ 登録できます" |
| false | true | "❌ 利用規約に同意してください" |

### ❸ 除外条件での使用

```javascript
function checkEntry() {
  const age = 25;
  const isBanned = false;

  // 出禁でない場合
  if (!isBanned) {
    if (age >= 18) {
      console.log("✅ 入場できます");
    } else {
      console.log("❌ 年齢不足です");
    }
  } else {
    console.log("❌ 入場禁止です");
  }
}
```

**ポイント：**
- `!isBanned` で「出禁でない」ことを表現
- 除外条件を明確に表現できる

### ❹ フラグの切り替え

NOT演算子を使って、真偽値を反転できます。

```javascript
let isOn = false;

// 状態を反転
isOn = !isOn;
console.log(isOn);  // true

// もう一度反転
isOn = !isOn;
console.log(isOn);  // false
```

**実用例：ライトスイッチ**

```javascript
function toggleLight() {
  let lightOn = false;
  const status = document.getElementById("status");

  // ボタンをクリックするたびに切り替え
  function toggle() {
    lightOn = !lightOn;  // 反転

    if (lightOn) {
      status.textContent = "💡 ライトON";
    } else {
      status.textContent = "⚫ ライトOFF";
    }
  }
}
```

### ❺ 複数条件の否定

括弧で囲んだ条件全体を否定できます。

```javascript
const isWeekend = false;
const isHoliday = false;

// 週末でも祝日でもない（平日）
if (!(isWeekend || isHoliday)) {
  console.log("平日です");
}
```

**評価の流れ：**

```
isWeekend || isHoliday
    ↓
 false  ||   false
    ↓
        false
    ↓
    !(false)
    ↓
       true  ✅
```

### ❻ ド・モルガンの法則

複数条件の否定には2つの書き方があります。

```javascript
// 方法1: 全体を否定
if (!(isWeekend || isHoliday)) {
  console.log("平日です");
}

// 方法2: 個別に否定してANDで結合
if (!isWeekend && !isHoliday) {
  console.log("平日です");
}

// 両方とも同じ意味
```

**ド・モルガンの法則：**

```
!(A || B) = !A && !B
!(A && B) = !A || !B
```

**例：**

| 元の式 | 変換後 |
|-------|-------|
| `!(a || b)` | `!a && !b` |
| `!(a && b)` | `!a || !b` |
| `!(age >= 18 \|\| hasTicket)` | `age < 18 && !hasTicket` |

### ❼ 二重否定（!!）

NOT演算子を2回使うと、元の値に戻ります。

```javascript
const isRaining = true;

console.log(!isRaining);    // false（1回否定）
console.log(!!isRaining);   // true（2回否定→元に戻る）
```

**用途：値を真偽値に変換**

```javascript
// 文字列を真偽値に変換
const name = "太郎";
console.log(!!name);  // true（空でない文字列）

const empty = "";
console.log(!!empty);  // false（空文字列）

// 数値を真偽値に変換
const count = 5;
console.log(!!count);  // true（0以外）

const zero = 0;
console.log(!!zero);  // false（0）
```

**仕組み：**

```
"太郎" → !"太郎" → false → !false → true
""     → !""     → true  → !true  → false
5      → !5      → false → !false → true
0      → !0      → true  → !true  → false
```

### ❽ AND/ORとの組み合わせ

```javascript
const age = 25;
const hasTicket = true;
const isBanned = false;

// 18歳以上 かつ チケット所持 かつ 出禁でない
if (age >= 18 && hasTicket && !isBanned) {
  console.log("✅ 入場できます");
} else {
  console.log("❌ 入場できません");
}
```

**評価例：**

| age | hasTicket | isBanned | !isBanned | 結果 |
|-----|----------|----------|----------|------|
| 25 | true | false | **true** | 入場できます |
| 25 | true | true | **false** | 入場できません |
| 15 | true | false | **true** | 入場できません（年齢不足） |

---

## よくある間違い

### ❌ 間違い1：NOTの位置を間違える

**間違ったコード：**
```javascript
const age = 25;

// 意図：18歳未満でない（18歳以上）
if (!age < 18) {  // 構文エラー ❌
  console.log("成人です");
}
```

**理由：** `!age` が先に評価され、その結果と18を比較してしまう

```javascript
!age < 18
  ↓
!(25) < 18  // !25 は false
  ↓
false < 18  // 比較できない
```

**正しいコード：**
```javascript
const age = 25;

// 方法1: 括弧で囲む
if (!(age < 18)) {
  console.log("成人です");
}

// 方法2: 比較演算子を変える（推奨）
if (age >= 18) {
  console.log("成人です");
}
```

### ❌ 間違い2：真偽値を二重にチェックする

**間違ったコード：**
```javascript
const isLoggedIn = false;

// 冗長 ❌
if (isLoggedIn === false) {
  console.log("ログインしてください");
}
```

**理由：** 真偽値の変数に対して `=== false` は冗長

**正しいコード：**
```javascript
const isLoggedIn = false;

// シンプル ✅
if (!isLoggedIn) {
  console.log("ログインしてください");
}
```

### ❌ 間違い3：否定の読みにくい使い方

**間違ったコード：**
```javascript
const age = 25;

// 読みにくい ❌
if (!(age < 18)) {
  console.log("成人です");
}

// さらに読みにくい ❌
if (!!(age >= 18)) {
  console.log("成人です");
}
```

**理由：** 不等号で書ける場合はそちらの方が読みやすい

**正しいコード：**
```javascript
const age = 25;

// 読みやすい ✅
if (age >= 18) {
  console.log("成人です");
}
```

### ❌ 間違い4：!==とNOTを混同する

**間違ったコード：**
```javascript
const answer = "東京";
const correct = "大阪";

// 冗長 ❌
if (!(answer === correct)) {
  console.log("不正解");
}
```

**理由：** `!==` 演算子を使う方が簡潔

**正しいコード：**
```javascript
const answer = "東京";
const correct = "大阪";

// 簡潔 ✅
if (answer !== correct) {
  console.log("不正解");
}
```

### ❌ 間違い5：ド・モルガンの法則を間違える

**間違ったコード：**
```javascript
const isWeekend = false;
const isHoliday = false;

// 間違い ❌
if (!(isWeekend || isHoliday)) {
  // これは以下と同じ
  // !isWeekend && !isHoliday
}

// 間違った変換
if (!isWeekend || !isHoliday) {  // ❌ 意味が違う
  console.log("平日です");
}
```

**理由：** `!(A || B)` は `!A || !B` ではなく、`!A && !B`

**正しいコード：**
```javascript
const isWeekend = false;
const isHoliday = false;

// 正しい変換 ✅
if (!(isWeekend || isHoliday)) {
  console.log("平日です");
}

// これと同じ
if (!isWeekend && !isHoliday) {
  console.log("平日です");
}
```

### ❌ 間違い6：文字列やNullに対してNOTを使う

**間違ったコード：**
```javascript
const name = "太郎";

// 空文字チェックのつもり？ ❌
if (!name) {
  console.log("名前が空です");
}
```

**理由：** `name` が "太郎" の場合、`!"太郎"` は `false` になる

```javascript
!"太郎" → false（空でない文字列はtruthy）
```

**正しいコード：**
```javascript
const name = "太郎";

// 明示的に空文字チェック ✅
if (name === "") {
  console.log("名前が空です");
}

// または
if (!name || name === "") {
  console.log("名前が空です");
}
```

---

## 実用例

### 例1：利用規約同意チェック

**HTML：**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>利用規約同意チェック</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 {
      text-align: center;
      color: #333;
    }
    .terms {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 20px;
      max-height: 150px;
      overflow-y: auto;
      border: 1px solid #ddd;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 15px;
      background-color: #fff3cd;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    label {
      font-weight: bold;
      cursor: pointer;
    }
    button {
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
    }
    button:hover {
      background-color: #0056b3;
    }
    #result {
      margin-top: 20px;
      padding: 15px;
      border-radius: 4px;
      text-align: center;
      font-weight: bold;
    }
    .success {
      background-color: #d4edda;
      color: #155724;
      border: 2px solid #c3e6cb;
    }
    .error {
      background-color: #f8d7da;
      color: #721c24;
      border: 2px solid #f5c6cb;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📜 利用規約同意チェック</h1>

    <div class="terms">
      <h3>利用規約</h3>
      <p>第1条：本サービスを利用する際は、利用規約に同意する必要があります。</p>
      <p>第2条：個人情報は適切に管理されます。</p>
      <p>第3条：禁止事項に違反した場合、アカウントを停止することがあります。</p>
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="agree">
      <label for="agree">利用規約に同意します</label>
    </div>

    <button onclick="checkAgreement()">登録</button>

    <div id="result"></div>
  </div>

  <script>
    function checkAgreement() {
      const agreed = document.getElementById("agree").checked;
      const result = document.getElementById("result");

      // ❶ NOT演算子で「同意していない」をチェック
      if (!agreed) {
        result.textContent = "❌ 利用規約に同意してください";
        result.className = "error";
      } else {
        result.textContent = "✅ 登録を受け付けました！";
        result.className = "success";
      }
    }
  </script>
</body>
</html>
```

**ポイント：**
- `!agreed` で「同意していない」を判定
- 真偽値に対してNOT演算子を使用
- シンプルで読みやすいコード

### 例2：除外判定機（出禁チェック）

**HTML：**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>除外判定機</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .container {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px;
      border-radius: 10px;
      color: white;
    }
    h1 {
      text-align: center;
      margin-bottom: 30px;
    }
    .form-group {
      background-color: rgba(255, 255, 255, 0.9);
      padding: 20px;
      margin-bottom: 15px;
      border-radius: 8px;
      color: #333;
    }
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }
    input[type="number"] {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    button {
      width: 100%;
      padding: 15px;
      background-color: #fff;
      color: #667eea;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 18px;
      font-weight: bold;
    }
    button:hover {
      background-color: #f0f0f0;
    }
    #result {
      margin-top: 20px;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      background-color: white;
      color: #333;
    }
    .allowed {
      border: 3px solid #28a745;
    }
    .denied {
      border: 3px solid #dc3545;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚫 除外判定機（出禁チェック）</h1>

    <div class="form-group">
      <label for="age">年齢：</label>
      <input type="number" id="age" placeholder="年齢を入力">
    </div>

    <div class="form-group">
      <div class="checkbox-group">
        <input type="checkbox" id="ticket">
        <label for="ticket">チケットを持っていますか？</label>
      </div>
    </div>

    <div class="form-group">
      <div class="checkbox-group">
        <input type="checkbox" id="banned">
        <label for="banned">出入り禁止（Banned）</label>
      </div>
    </div>

    <button onclick="checkEntry()">入場判定</button>

    <div id="result"></div>
  </div>

  <script>
    function checkEntry() {
      const ageValue = document.getElementById("age").value;
      const hasTicket = document.getElementById("ticket").checked;
      const isBanned = document.getElementById("banned").checked;
      const result = document.getElementById("result");

      // ❶ 空文字チェック
      if (ageValue === "") {
        result.textContent = "❌ 年齢を入力してください";
        result.className = "denied";
        return;
      }

      const age = Number(ageValue);

      // ❷ NaNチェック
      if (isNaN(age)) {
        result.textContent = "❌ 正しい数値を入力してください";
        result.className = "denied";
        return;
      }

      // ❸ NOT演算子で除外条件をチェック
      // 出禁でない かつ 18歳以上 かつ チケット所持
      if (!isBanned && age >= 18 && hasTicket) {
        result.textContent = "✅ 入場できます！";
        result.className = "allowed";
      } else {
        let message = "❌ 入場できません\n\n理由：\n";

        if (isBanned) {
          message += "• 出入り禁止です\n";
        }
        if (age < 18) {
          message += "• 18歳以上である必要があります\n";
        }
        if (!hasTicket) {
          message += "• チケットが必要です\n";
        }

        result.textContent = message;
        result.className = "denied";
        result.style.whiteSpace = "pre-line";
      }
    }
  </script>
</body>
</html>
```

**ポイント：**
- `!isBanned` で「出禁でない」という除外条件を表現
- ANDと組み合わせて複数条件をチェック
- 除外理由を具体的に表示

### 例3：ライトスイッチ（切り替え）

**HTML：**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ライトスイッチ</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      background-color: #2c3e50;
      transition: background-color 0.3s;
    }
    body.light-on {
      background-color: #f1c40f;
    }
    .container {
      background-color: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      text-align: center;
    }
    h1 {
      margin-bottom: 30px;
      color: #333;
    }
    .light-status {
      font-size: 80px;
      margin: 30px 0;
    }
    button {
      width: 100%;
      padding: 15px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 18px;
      font-weight: bold;
    }
    button:hover {
      background-color: #2980b9;
    }
    #status {
      margin-top: 20px;
      font-size: 24px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>💡 ライトスイッチ</h1>

    <div class="light-status" id="light">⚫</div>

    <button onclick="toggleLight()">スイッチを押す</button>

    <div id="status">ライトOFF</div>
  </div>

  <script>
    let lightOn = false;  // 初期状態：OFF

    function toggleLight() {
      const light = document.getElementById("light");
      const status = document.getElementById("status");
      const body = document.body;

      // ❶ NOT演算子で状態を反転
      lightOn = !lightOn;

      // ❷ 状態に応じて表示を変更
      if (lightOn) {
        light.textContent = "💡";
        status.textContent = "ライトON";
        body.classList.add("light-on");
      } else {
        light.textContent = "⚫";
        status.textContent = "ライトOFF";
        body.classList.remove("light-on");
      }
    }
  </script>
</body>
</html>
```

**ポイント：**
- `lightOn = !lightOn` で状態を反転
- 押すたびにON/OFFが切り替わる
- シンプルなトグル処理

### 例4：平日判定機（複数条件の否定）

**HTML：**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>平日判定機</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }
    .container {
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 {
      text-align: center;
      color: #333;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 4px;
    }
    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    label {
      font-weight: bold;
      cursor: pointer;
    }
    button {
      width: 100%;
      padding: 12px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
    }
    button:hover {
      background-color: #218838;
    }
    #result {
      margin-top: 20px;
      padding: 15px;
      border-radius: 4px;
      text-align: center;
      font-weight: bold;
    }
    .weekday {
      background-color: #fff3cd;
      color: #856404;
      border: 2px solid #ffeaa7;
    }
    .holiday {
      background-color: #d4edda;
      color: #155724;
      border: 2px solid #c3e6cb;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📅 平日判定機</h1>

    <div class="form-group">
      <div class="checkbox-group">
        <input type="checkbox" id="weekend">
        <label for="weekend">週末（土日）</label>
      </div>
    </div>

    <div class="form-group">
      <div class="checkbox-group">
        <input type="checkbox" id="holiday">
        <label for="holiday">祝日</label>
      </div>
    </div>

    <button onclick="checkWeekday()">判定</button>

    <div id="result"></div>
  </div>

  <script>
    function checkWeekday() {
      const isWeekend = document.getElementById("weekend").checked;
      const isHoliday = document.getElementById("holiday").checked;
      const result = document.getElementById("result");

      // ❶ NOT演算子で複数条件の否定
      // 週末でも祝日でもない = 平日
      if (!(isWeekend || isHoliday)) {
        result.textContent = "💼 平日です\n\n仕事・学校があります";
        result.className = "weekday";
        result.style.whiteSpace = "pre-line";
      } else {
        let message = "🎉 休日です\n\n";

        if (isWeekend) {
          message += "週末を楽しんでください！\n";
        }
        if (isHoliday) {
          message += "祝日を楽しんでください！\n";
        }

        result.textContent = message;
        result.className = "holiday";
        result.style.whiteSpace = "pre-line";
      }
    }
  </script>
</body>
</html>
```

**ポイント：**
- `!(isWeekend || isHoliday)` で「週末でも祝日でもない」を表現
- ド・モルガンの法則の実例
- 複数条件の否定を簡潔に記述

---

## 練習問題

### 問題1：傘チェック

雨が降っているかどうかで、傘の必要性を判定するプログラムを作成してください。

**要件：**
- 雨が降っているかのチェックボックス
- 判定ボタン
- 結果表示エリア
- 雨が降っていない（`!isRaining`）場合「傘は不要です」
- 雨が降っている場合「傘が必要です」

<details>
<summary>💡 ヒント1：HTMLの構造</summary>

```html
<input type="checkbox" id="raining"> 雨が降っている
<button onclick="checkUmbrella()">判定</button>
<div id="result"></div>
```
</details>

<details>
<summary>💡 ヒント2：値の取得</summary>

```javascript
function checkUmbrella() {
  const isRaining = document.getElementById("raining").checked;
  const result = document.getElementById("result");
}
```
</details>

<details>
<summary>💡 ヒント3：NOT演算子の使用</summary>

```javascript
// 雨が降っていない場合
if (!isRaining) {
  result.textContent = "☀️ 傘は不要です";
} else {
  result.textContent = "☔ 傘が必要です";
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
  <title>傘チェック</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 4px;
      margin-bottom: 15px;
    }
    input[type="checkbox"] {
      width: 20px;
      height: 20px;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 4px;
    }
    #result {
      margin-top: 15px;
      padding: 15px;
      text-align: center;
      font-weight: bold;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>☔ 傘チェック</h1>

  <div class="checkbox-group">
    <input type="checkbox" id="raining">
    <label for="raining">雨が降っている</label>
  </div>

  <button onclick="checkUmbrella()">判定</button>

  <div id="result"></div>

  <script>
    function checkUmbrella() {
      const isRaining = document.getElementById("raining").checked;
      const result = document.getElementById("result");

      if (!isRaining) {
        result.textContent = "☀️ 傘は不要です";
        result.style.backgroundColor = "#d4edda";
        result.style.color = "#155724";
      } else {
        result.textContent = "☔ 傘が必要です";
        result.style.backgroundColor = "#cce5ff";
        result.style.color = "#004085";
      }
    }
  </script>
</body>
</html>
```
</details>

---

### 問題2：ログイン状態チェック

ログイン状態をチェックし、ログインしていない場合にメッセージを表示するプログラムを作成してください。

**要件：**
- ログイン済みかのチェックボックス
- チェックボタン
- 結果表示エリア
- ログインしていない（`!isLoggedIn`）場合「ログインしてください」
- ログイン済みの場合「ようこそ！」

<details>
<summary>💡 ヒント1：基本構造</summary>

```html
<input type="checkbox" id="loggedIn"> ログイン済み
<button onclick="checkLogin()">チェック</button>
<div id="result"></div>
```
</details>

<details>
<summary>💡 ヒント2：NOT演算子での判定</summary>

```javascript
const isLoggedIn = document.getElementById("loggedIn").checked;

if (!isLoggedIn) {
  result.textContent = "ログインしてください";
} else {
  result.textContent = "ようこそ！";
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
  <title>ログイン状態チェック</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 4px;
      margin-bottom: 15px;
    }
    input[type="checkbox"] {
      width: 20px;
      height: 20px;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #28a745;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 4px;
    }
    #result {
      margin-top: 15px;
      padding: 15px;
      text-align: center;
      font-weight: bold;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>🔐 ログイン状態チェック</h1>

  <div class="checkbox-group">
    <input type="checkbox" id="loggedIn">
    <label for="loggedIn">ログイン済み</label>
  </div>

  <button onclick="checkLogin()">チェック</button>

  <div id="result"></div>

  <script>
    function checkLogin() {
      const isLoggedIn = document.getElementById("loggedIn").checked;
      const result = document.getElementById("result");

      if (!isLoggedIn) {
        result.textContent = "❌ ログインしてください";
        result.style.backgroundColor = "#f8d7da";
        result.style.color = "#721c24";
      } else {
        result.textContent = "✅ ようこそ！";
        result.style.backgroundColor = "#d4edda";
        result.style.color = "#155724";
      }
    }
  </script>
</body>
</html>
```
</details>

---

### 問題3：複合除外条件（AND/ORとの組み合わせ）

年齢、チケット所持、出禁状態をチェックし、入場可否を判定するプログラムを作成してください。

**要件：**
- 年齢の入力欄
- チケット所持チェックボックス
- 出禁チェックボックス
- 判定ボタン
- **入場条件：18歳以上 かつ チケット所持 かつ 出禁でない（`!isBanned`）**

<details>
<summary>💡 ヒント1：HTMLの構造</summary>

```html
<input type="number" id="age" placeholder="年齢">
<input type="checkbox" id="ticket"> チケット所持
<input type="checkbox" id="banned"> 出入り禁止
<button onclick="checkEntry()">判定</button>
<div id="result"></div>
```
</details>

<details>
<summary>💡 ヒント2：値の取得</summary>

```javascript
const ageValue = document.getElementById("age").value;
const hasTicket = document.getElementById("ticket").checked;
const isBanned = document.getElementById("banned").checked;
```
</details>

<details>
<summary>💡 ヒント3：NOT演算子とANDの組み合わせ</summary>

```javascript
// 18歳以上 かつ チケット所持 かつ 出禁でない
if (age >= 18 && hasTicket && !isBanned) {
  result.textContent = "✅ 入場できます";
} else {
  result.textContent = "❌ 入場できません";
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
  <title>入場判定（除外条件）</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }
    .container {
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 {
      text-align: center;
    }
    .info {
      background-color: #e3f2fd;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 20px;
      border-left: 4px solid #2196f3;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input[type="number"] {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      border: 2px solid #ddd;
      border-radius: 4px;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      background-color: #f8f9fa;
      border-radius: 4px;
    }
    input[type="checkbox"] {
      width: 20px;
      height: 20px;
    }
    button {
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 4px;
      font-size: 16px;
      font-weight: bold;
    }
    #result {
      margin-top: 20px;
      padding: 15px;
      text-align: center;
      font-weight: bold;
      border-radius: 4px;
      white-space: pre-line;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎫 入場判定（除外条件）</h1>

    <div class="info">
      <strong>入場条件：</strong> 18歳以上 かつ チケット所持 かつ 出禁でない
    </div>

    <div class="form-group">
      <label for="age">年齢：</label>
      <input type="number" id="age" placeholder="年齢を入力">
    </div>

    <div class="form-group">
      <div class="checkbox-group">
        <input type="checkbox" id="ticket">
        <label for="ticket">チケットを持っていますか？</label>
      </div>
    </div>

    <div class="form-group">
      <div class="checkbox-group">
        <input type="checkbox" id="banned">
        <label for="banned">出入り禁止（Banned）</label>
      </div>
    </div>

    <button onclick="checkEntry()">入場判定</button>

    <div id="result"></div>
  </div>

  <script>
    function checkEntry() {
      const ageValue = document.getElementById("age").value;
      const hasTicket = document.getElementById("ticket").checked;
      const isBanned = document.getElementById("banned").checked;
      const result = document.getElementById("result");

      if (ageValue === "") {
        result.textContent = "年齢を入力してください";
        result.style.backgroundColor = "#fff3cd";
        result.style.color = "#856404";
        return;
      }

      const age = Number(ageValue);

      if (isNaN(age)) {
        result.textContent = "正しい数値を入力してください";
        result.style.backgroundColor = "#f8d7da";
        result.style.color = "#721c24";
        return;
      }

      // NOT演算子で除外条件をチェック
      if (age >= 18 && hasTicket && !isBanned) {
        result.textContent = "✅ 入場できます！\n\nすべての条件を満たしています";
        result.style.backgroundColor = "#d4edda";
        result.style.color = "#155724";
      } else {
        let message = "❌ 入場できません\n\n理由：\n";

        if (age < 18) {
          message += "• 18歳以上である必要があります\n";
        }
        if (!hasTicket) {
          message += "• チケットが必要です\n";
        }
        if (isBanned) {
          message += "• 出入り禁止です\n";
        }

        result.textContent = message;
        result.style.backgroundColor = "#f8d7da";
        result.style.color = "#721c24";
      }
    }
  </script>
</body>
</html>
```
</details>

---

## チェックリスト

このレッスンを完了したら、以下の項目を確認してください。

- [ ] NOT演算子（!）の基本的な使い方を理解した
- [ ] 真偽値表を理解し、true/falseが反転することを確認した
- [ ] 真偽値の変数に対してNOTを使える
- [ ] チェックボックスと組み合わせて使える
- [ ] 除外条件を表現できる（`!isBanned`）
- [ ] フラグの切り替えができる（`flag = !flag`）
- [ ] 複数条件の否定ができる（`!(A || B)`）
- [ ] ド・モルガンの法則を理解した
- [ ] AND/ORと組み合わせて使える
- [ ] 実用的なプログラム（除外判定機など）を作成できる

---

## デバッグのヒント

NOT演算子を使ったプログラムでうまく動かない場合、以下を確認してください。

### ❶ NOTの適用範囲を確認

```javascript
const age = 25;

// 間違い：!が age だけに適用される
console.log(!age < 18);  // false < 18 → エラー

// 正しい：括弧で範囲を指定
console.log(!(age < 18));  // true

// より良い：比較演算子を変える
console.log(age >= 18);  // true
```

### ❷ 真偽値の型を確認

```javascript
const isLoggedIn = false;

console.log(typeof isLoggedIn);  // "boolean"
console.log(!isLoggedIn);  // true

// 文字列との混同に注意
const status = "false";  // これは文字列
console.log(!status);  // false（文字列はtruthy）
```

### ❸ ド・モルガンの法則を確認

```javascript
const isWeekend = false;
const isHoliday = false;

// 方法1
console.log(!(isWeekend || isHoliday));  // true

// 方法2（同じ結果）
console.log(!isWeekend && !isHoliday);  // true

// 間違い
console.log(!isWeekend || !isHoliday);  // true（意味が違う）
```

### ❹ 二重否定を確認

```javascript
const value = "太郎";

console.log(!value);   // false
console.log(!!value);  // true（元に戻る）

// 用途：truthy/falsyを真偽値に変換
console.log(!!"");     // false
console.log(!!0);      // false
console.log(!!"text"); // true
```

### ❺ 優先順位を確認

```javascript
const age = 25;
const hasTicket = true;
const isBanned = false;

// NOTは優先順位が高い
console.log(!isBanned && age >= 18 && hasTicket);
// → true && true && true → true

// 括弧で明示
console.log((!isBanned) && (age >= 18) && hasTicket);
// → true && true && true → true
```

---

## ポイント

- **NOT演算子（!）** は真偽値を反転させる
- **trueはfalseに、falseはtrueに**なる
- **真偽値の変数**には直接使う（`!isLoggedIn`）
- **比較の否定**には不等号を使う（`!==`, `<`, `>=`など）
- **除外条件**を表現するのに便利（`!isBanned`）
- **フラグの切り替え**に使える（`flag = !flag`）
- **複数条件の否定**には括弧が必要（`!(A || B)`）
- **ド・モルガンの法則**：`!(A || B) = !A && !B`
- **二重否定（!!）** で値を真偽値に変換できる

---

## できるようになったこと

このレッスンを通じて、以下のことができるようになりました。

1. **NOT演算子（!）の基本を理解**し、真偽値を反転できる
2. **真偽値表を読み解き**、NOT演算の結果を予測できる
3. **除外条件を表現**できる（`!isBanned`）
4. **フラグの切り替え**ができる（`flag = !flag`）
5. **複数条件の否定**ができる（`!(A || B)`）
6. **ド・モルガンの法則を理解**し、適用できる
7. **AND/ORと組み合わせた複雑な条件式**を作成できる
8. **実用的なプログラム**（除外判定機、ライトスイッチなど）を作成できる

---

## まとめ

このレッスンでは、**NOT演算子（!）** を学びました。

1. **NOT演算子は真偽値を反転**させる
2. **trueはfalseに、falseはtrueに**なる
3. **真偽値の変数には直接使う**と読みやすい
4. **除外条件**（`!isBanned`）を簡潔に表現できる
5. **フラグの切り替え**に便利（`flag = !flag`）
6. **複数条件の否定**には括弧を使う（`!(A || B)`）
7. **ド・モルガンの法則**で条件式を変形できる
8. **AND/ORと組み合わせて**複雑な条件判定が可能

次のレッスンでは、**AND、OR、NOTを組み合わせた複雑な条件式**を学びます。

---

## 次のステップ

**レッスン47：複雑な条件**

次のレッスンでは、**AND、OR、NOTを組み合わせた複雑な条件式**を学びます。

- `(A && B) || C` のような複合条件
- 括弧の使い方と優先順位
- 実践的な複雑な条件判定
- ド・モルガンの法則の活用

**成果物：** 複雑な条件を使った総合判定プログラム

AND、OR、NOTの3つの論理演算子を自在に組み合わせることで、あらゆる条件判定ができるようになります！
