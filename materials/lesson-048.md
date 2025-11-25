# レッスン48: 三項演算子

## なぜ重要なのか

三項演算子は、単純な条件分岐を1行で簡潔に書ける強力なツールです。実際のWebサービスでは、コードを読みやすく保ちながら、条件に応じた値の選択を頻繁に行います。

### 実例1: Twitterのタイムスタンプ表示

```javascript
// 投稿からの経過時間に応じて表示を変える
const display = minutesAgo < 60 ? `${minutesAgo}分前` : `${hoursAgo}時間前`;
```

シンプルな条件で表示を切り替えるのに最適です。

### 実例2: Amazonの在庫表示

```javascript
// 在庫数に応じてメッセージを変える
const message = stock > 0 ? "カートに入れる" : "在庫切れ";
```

ボタンのラベルやメッセージを動的に変更する際に便利です。

### 実例3: GitHubのステータスバッジ

```javascript
// テスト結果に応じてバッジの色を変える
const badgeColor = testsPassed ? "green" : "red";
```

条件に応じたスタイルやクラスの切り替えに使用されます。

### 実例4: Netflixのコンテンツ評価

```javascript
// 年齢制限に応じて表示を変える
const ratingLabel = age >= 18 ? "すべて視聴可能" : "一部制限あり";
```

ユーザーの属性に応じた表示の切り替えに活用されます。

### 実例5: Slackのオンライン状態

```javascript
// オンライン状態の表示
const statusIcon = isOnline ? "🟢" : "⚪";
```

状態に応じたアイコンや表示の切り替えに使用されます。

---

## 基本概念の説明

### 三項演算子とは

**三項演算子（ternary operator）** は、条件に応じて2つの値のうちどちらかを返す演算子です。**唯一の三項演算子**（3つの要素を取る演算子）であることから、この名前がついています。

### 基本構文

```javascript
条件 ? 真の場合の値 : 偽の場合の値
```

**各部分の説明:**
- **条件**: 評価される式（真偽値になる）
- **?**: 「ならば」を意味する
- **真の場合の値**: 条件が`true`の時に返される値
- **:**: 「そうでなければ」を意味する
- **偽の場合の値**: 条件が`false`の時に返される値

### if-else文との対応関係

```javascript
// if-else文
let message;
if (age >= 18) {
  message = "成人";
} else {
  message = "未成年";
}

// 三項演算子（同じ意味）
let message = age >= 18 ? "成人" : "未成年";
```

**比較:**

| 項目 | if-else文 | 三項演算子 |
|------|-----------|-----------|
| 行数 | 5行 | 1行 |
| 変数宣言 | 先に宣言が必要 | 宣言と同時に代入可 |
| 読みやすさ | 明確 | 慣れが必要 |
| 用途 | 複雑な処理に適する | 単純な値の選択に適する |

### 評価の流れ

```
      条件を評価
         ↓
    ┌────┴────┐
    │         │
  true      false
    │         │
    ↓         ↓
真の値    偽の値
    │         │
    └────┬────┘
         ↓
      結果を返す
```

---

## 動作の流れ

### 例1: 年齢判定の評価フロー

```javascript
let age = 20;
let status = age >= 18 ? "成人" : "未成年";
```

**評価ステップ:**

```
ステップ1: 条件を評価
  age >= 18
  → 20 >= 18
  → true

ステップ2: 真の値を選択
  true なので "成人" を返す

ステップ3: 変数に代入
  status = "成人"
```

### 例2: 合否判定の評価フロー

```javascript
let score = 55;
let result = score >= 60 ? "合格" : "不合格";
```

**評価ステップ:**

```
ステップ1: 条件を評価
  score >= 60
  → 55 >= 60
  → false

ステップ2: 偽の値を選択
  false なので "不合格" を返す

ステップ3: 変数に代入
  result = "不合格"
```

### 例3: ネストした三項演算子の評価フロー

```javascript
let score = 85;
let grade = score >= 90 ? "優" : score >= 60 ? "良" : "不可";
```

**評価ステップ:**

```
ステップ1: 最初の条件を評価
  score >= 90
  → 85 >= 90
  → false

ステップ2: false側（:の後）を評価
  score >= 60 ? "良" : "不可"
  → 85 >= 60
  → true

ステップ3: true側の値を返す
  "良"

最終結果: grade = "良"
```

**評価の流れ図:**

```
score >= 90 ?
     ↓
   false
     ↓
score >= 60 ? ← ここを評価
     ↓
   true
     ↓
   "良" ← これが返される
```

---

## 詳細解説

### 1. 基本的な使い方

#### 文字列を返す

```javascript
let age = 20;
let message = age >= 18 ? "成人です" : "未成年です";
console.log(message); // "成人です"
```

**ポイント:**
- 条件が`true`なら`"成人です"`
- 条件が`false`なら`"未成年です"`

#### 数値を返す

```javascript
let isMember = true;
let discount = isMember ? 0.1 : 0; // 10%割引 または 割引なし
let price = 1000;
let finalPrice = price * (1 - discount);
console.log(finalPrice); // 900
```

**ポイント:**
- 三項演算子は文字列だけでなく、数値やオブジェクトなど、どんな型でも返せる

#### 真偽値を返す

```javascript
let score = 85;
let isPassed = score >= 60 ? true : false;

// より簡潔に書くなら:
let isPassed = score >= 60; // 条件式自体が真偽値なので三項演算子は不要
```

**注意:**
- 条件式自体が真偽値を返す場合、三項演算子で`? true : false`とする必要はない

### 2. 変数代入以外での使い方

#### 関数の引数として使う

```javascript
function greet(name) {
  console.log(`こんにちは、${name}さん`);
}

let userName = "";
greet(userName !== "" ? userName : "ゲスト");
// → "こんにちは、ゲストさん"
```

**活用例:**

```javascript
// API呼び出しで、値がある場合のみ送信
fetchData(userId ? userId : null);

// 配列の要素にアクセス
let item = items.length > 0 ? items[0] : "なし";
```

#### console.logで直接使う

```javascript
let age = 15;
console.log(age >= 18 ? "投票できます" : "投票できません");
// → "投票できません"
```

#### 文字列の中に埋め込む

```javascript
let count = 5;
let message = `現在${count}件のアイテムがあります（${count >= 10 ? "多い" : "少ない"}）`;
console.log(message);
// → "現在5件のアイテムがあります（少ない）"
```

#### return文で使う

```javascript
function getStatus(isLoggedIn) {
  return isLoggedIn ? "ログイン済み" : "未ログイン";
}

console.log(getStatus(true));  // "ログイン済み"
console.log(getStatus(false)); // "未ログイン"
```

### 3. 実用的なパターン

#### パターン1: デフォルト値の設定

```javascript
function getUserName(name) {
  return name ? name : "ゲスト";
}

// より短く書くなら（論理OR演算子）
function getUserName(name) {
  return name || "ゲスト";
}
```

#### パターン2: 最小値・最大値の選択

```javascript
// 最小値
let a = 10;
let b = 20;
let min = a < b ? a : b;
console.log(min); // 10

// 最大値
let max = a > b ? a : b;
console.log(max); // 20
```

#### パターン3: 絶対値の計算

```javascript
let number = -5;
let absolute = number >= 0 ? number : -number;
console.log(absolute); // 5
```

#### パターン4: 単数形・複数形の切り替え

```javascript
let count = 1;
let message = `${count}件のメッセージ`;
// 英語の場合
let englishMessage = `${count} item${count === 1 ? "" : "s"}`;
console.log(englishMessage); // "1 item"

count = 3;
englishMessage = `${count} item${count === 1 ? "" : "s"}`;
console.log(englishMessage); // "3 items"
```

#### パターン5: CSSクラスの切り替え

```javascript
let isActive = true;
let className = isActive ? "active" : "inactive";

// HTMLに適用
element.className = className;
```

### 4. ネストした三項演算子

複数の条件を扱う場合、三項演算子をネストできます。

#### 基本的なネスト（2階層）

```javascript
let score = 75;
let grade = score >= 60 ? "合格" : score >= 40 ? "再試験" : "不合格";
console.log(grade); // "合格"
```

**評価の流れ:**

```
score >= 60 ? "合格" : (score >= 40 ? "再試験" : "不合格")
                        ↑
                        偽の場合、ここが評価される
```

#### 読みやすい書き方（改行を使う）

```javascript
let score = 85;
let grade = score >= 90 ? "優" :
            score >= 80 ? "良" :
            score >= 60 ? "可" :
            "不可";
console.log(grade); // "良"
```

**if-else if-elseとの対応:**

```javascript
// 同じ意味のif文
let grade;
if (score >= 90) {
  grade = "優";
} else if (score >= 80) {
  grade = "良";
} else if (score >= 60) {
  grade = "可";
} else {
  grade = "不可";
}
```

#### ネストの注意点

```javascript
// ❌ 読みにくい例
let result = a ? b ? c ? d : e : f : g;

// ✅ 改善: if文を使う
let result;
if (a) {
  result = b ? (c ? d : e) : f;
} else {
  result = g;
}
```

**ポイント:**
- ネストが深くなると読みにくくなる
- 3階層以上のネストは避ける
- 複雑な場合はif文を使う

### 5. 複雑な条件での使用

#### 複数の条件を組み合わせる

```javascript
let age = 25;
let hasTicket = true;

// AND条件
let canEnter = (age >= 18 && hasTicket) ? "入場可能" : "入場不可";
console.log(canEnter); // "入場可能"

// OR条件
let age = 70;
let isStudent = false;
let discount = (age >= 65 || isStudent) ? 0.2 : 0;
console.log(discount); // 0.2
```

**注意点:**
- 複雑な条件は括弧で囲んで読みやすくする
- あまり複雑な条件はif文を使う方が良い

#### 条件を変数に分ける

```javascript
// ❌ 読みにくい
let message = (age >= 18 && hasTicket && !isBanned) ? "OK" : "NG";

// ✅ 読みやすい
let canAccess = age >= 18 && hasTicket && !isBanned;
let message = canAccess ? "OK" : "NG";
```

### 6. 三項演算子の連鎖

#### パターン1: 範囲判定

```javascript
let temperature = 28;
let comfort = temperature > 30 ? "暑い" :
              temperature > 20 ? "快適" :
              temperature > 10 ? "涼しい" :
              "寒い";
console.log(comfort); // "快適"
```

#### パターン2: 優先順位の判定

```javascript
let userType = "premium"; // "premium", "member", "guest"
let priority = userType === "premium" ? 1 :
               userType === "member" ? 2 :
               3;
console.log(priority); // 1
```

#### パターン3: エラーメッセージの選択

```javascript
let errorCode = 404;
let errorMessage = errorCode === 404 ? "ページが見つかりません" :
                   errorCode === 500 ? "サーバーエラー" :
                   errorCode === 403 ? "アクセス拒否" :
                   "エラーが発生しました";
console.log(errorMessage); // "ページが見つかりません"
```

### 7. オブジェクトや配列を返す

三項演算子は、プリミティブ型だけでなく、オブジェクトや配列も返せます。

#### オブジェクトを返す

```javascript
let isAdmin = true;
let user = isAdmin ? { name: "管理者", role: "admin" } : { name: "ゲスト", role: "guest" };
console.log(user); // { name: "管理者", role: "admin" }
```

#### 配列を返す

```javascript
let showAll = false;
let items = showAll ? [1, 2, 3, 4, 5] : [1, 2, 3];
console.log(items); // [1, 2, 3]
```

#### 関数を返す

```javascript
let isDebug = true;
let logger = isDebug ? console.log : () => {}; // デバッグモード時のみログ出力

logger("これは表示されます"); // デバッグモードなので表示される
```

### 8. 三項演算子を使うべきでない場合

#### ケース1: 複数の処理がある場合

```javascript
// ❌ 三項演算子は不適切
let result = age >= 18 ? (console.log("成人です"), count++, "OK") : "NG";

// ✅ if文を使う
if (age >= 18) {
  console.log("成人です");
  count++;
  result = "OK";
} else {
  result = "NG";
}
```

#### ケース2: 値を返さない場合

```javascript
// ❌ 不自然
age >= 18 ? console.log("成人") : console.log("未成年");

// ✅ if文を使う
if (age >= 18) {
  console.log("成人");
} else {
  console.log("未成年");
}
```

#### ケース3: 条件が複雑すぎる場合

```javascript
// ❌ 読みにくい
let canAccess = (age >= 18 && hasTicket && !isBanned && (isPremium || hasCoupon)) ? "OK" : "NG";

// ✅ if文で明確に
let canAccess;
if (age >= 18 && hasTicket && !isBanned && (isPremium || hasCoupon)) {
  canAccess = "OK";
} else {
  canAccess = "NG";
}
```

---

## よくある間違い

### 間違い1: 不要な三項演算子

```javascript
// ❌ 間違い: 冗長
let isPassed = score >= 60 ? true : false;

// ✅ 正しい: 条件式自体が真偽値
let isPassed = score >= 60;
```

**理由:**
- `score >= 60`は既に真偽値を返すので、三項演算子は不要

### 間違い2: セミコロンの位置

```javascript
// ❌ 間違い: セミコロンの位置が間違っている
let message = age >= 18 ? "成人"; : "未成年";

// ✅ 正しい: セミコロンは文の最後
let message = age >= 18 ? "成人" : "未成年";
```

### 間違い3: 括弧の不足

```javascript
// ❌ 読みにくい
let result = a && b ? "OK" : c || d ? "NG" : "Unknown";

// ✅ 読みやすい: 括弧で明確に
let result = (a && b) ? "OK" : (c || d) ? "NG" : "Unknown";
```

### 間違い4: 複数の処理をカンマで繋げる

```javascript
// ❌ 間違い: 複数の処理は三項演算子に不向き
age >= 18 ? (console.log("成人"), count++, "OK") : "NG";

// ✅ 正しい: if文を使う
if (age >= 18) {
  console.log("成人");
  count++;
  result = "OK";
} else {
  result = "NG";
}
```

### 間違い5: ネストしすぎて読めない

```javascript
// ❌ 間違い: ネストが深すぎる
let result = a ? b ? c ? d ? e : f : g : h : i;

// ✅ 正しい: if-else文を使う
let result;
if (a) {
  if (b) {
    if (c) {
      result = d ? e : f;
    } else {
      result = g;
    }
  } else {
    result = h;
  }
} else {
  result = i;
}
```

### 間違い6: 演算子の優先順位を間違える

```javascript
// ❌ 間違い: 優先順位の問題
let result = isActive && isValid ? "OK" : "NG";
// これは: (isActive && isValid) ? "OK" : "NG" と解釈される

// 意図が異なる場合は括弧で明示
let result = isActive && (isValid ? "OK" : "NG");
```

---

## 実用例

### 実用例1: ユーザー名表示システム

ユーザー名が入力されていない場合に「ゲスト」と表示します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ユーザー名表示</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }
    .container {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
    }
    h2 {
      color: #333;
      margin-bottom: 20px;
    }
    .input-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input[type="text"] {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    button:hover {
      background: #0056b3;
    }
    #result {
      margin-top: 20px;
      padding: 15px;
      background: white;
      border-radius: 4px;
      font-size: 18px;
      text-align: center;
      color: #333;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>👤 ユーザー名表示システム</h2>
    <div class="input-group">
      <label for="name">お名前を入力してください:</label>
      <input type="text" id="name" placeholder="名前を入力">
    </div>
    <button onclick="displayGreeting()">挨拶を表示</button>
    <div id="result"></div>
  </div>

  <script>
    function displayGreeting() {
      const nameInput = document.getElementById("name");
      const result = document.getElementById("result");
      const name = nameInput.value.trim();

      // 三項演算子で名前が空の場合は「ゲスト」を使用
      const displayName = name !== "" ? name : "ゲスト";

      result.textContent = `ようこそ、${displayName}さん！`;
    }
  </script>
</body>
</html>
```

**ポイント:**
- `name !== "" ? name : "ゲスト"` という三項演算子
- 入力が空の場合にデフォルト値「ゲスト」を使用

### 実用例2: 在庫状況表示システム

商品の在庫数に応じてメッセージとボタンの状態を変更します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>在庫状況表示</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }
    .container {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
    }
    h2 {
      color: #333;
      margin-bottom: 20px;
    }
    .product {
      background: white;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 4px;
      border-left: 4px solid #007bff;
    }
    .product-name {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .stock-info {
      margin: 10px 0;
      padding: 8px;
      border-radius: 4px;
      font-weight: bold;
    }
    .in-stock {
      background: #d4edda;
      color: #155724;
    }
    .out-of-stock {
      background: #f8d7da;
      color: #721c24;
    }
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
    }
    button.available {
      background: #28a745;
      color: white;
    }
    button.unavailable {
      background: #6c757d;
      color: white;
      cursor: not-allowed;
    }
    .input-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input[type="number"] {
      width: 100%;
      padding: 8px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>📦 在庫状況表示システム</h2>

    <div class="input-group">
      <label for="stock">在庫数を入力:</label>
      <input type="number" id="stock" value="5" min="0">
    </div>

    <button onclick="updateDisplay()" style="width: 100%; margin-bottom: 15px; background: #007bff; color: white;">
      表示を更新
    </button>

    <div id="productDisplay"></div>
  </div>

  <script>
    function updateDisplay() {
      const stock = Number(document.getElementById("stock").value);
      const productDisplay = document.getElementById("productDisplay");

      // 三項演算子で在庫メッセージを決定
      const stockMessage = stock > 0 ? `在庫あり（${stock}個）` : "在庫切れ";

      // 三項演算子でCSSクラスを決定
      const stockClass = stock > 0 ? "in-stock" : "out-of-stock";

      // 三項演算子でボタンのラベルを決定
      const buttonLabel = stock > 0 ? "カートに追加" : "入荷待ち";

      // 三項演算子でボタンのクラスを決定
      const buttonClass = stock > 0 ? "available" : "unavailable";

      // 三項演算子でボタンの有効/無効を決定
      const buttonDisabled = stock > 0 ? "" : "disabled";

      productDisplay.innerHTML = `
        <div class="product">
          <div class="product-name">サンプル商品</div>
          <div class="stock-info ${stockClass}">
            ${stockMessage}
          </div>
          <button class="${buttonClass}" ${buttonDisabled}>
            ${buttonLabel}
          </button>
        </div>
      `;
    }

    // ページ読み込み時に実行
    updateDisplay();
  </script>
</body>
</html>
```

**ポイント:**
- 複数の三項演算子を使って、在庫数に応じた表示を制御
- メッセージ、CSSクラス、ボタンラベル、ボタンの状態をすべて三項演算子で決定

### 実用例3: 成績判定システム

点数に応じて評価を表示します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>成績判定システム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }
    .container {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
    }
    h2 {
      color: #333;
      margin-bottom: 20px;
    }
    .input-group {
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
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    button:hover {
      background: #218838;
    }
    #result {
      margin-top: 20px;
      padding: 20px;
      background: white;
      border-radius: 4px;
      text-align: center;
    }
    .score {
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .grade {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .message {
      font-size: 18px;
      color: #666;
    }
    .grade-S { color: #ff6b6b; }
    .grade-A { color: #ff8c42; }
    .grade-B { color: #ffd93d; }
    .grade-C { color: #6bcf7f; }
    .grade-D { color: #4d96ff; }
    .grade-F { color: #95a5a6; }
  </style>
</head>
<body>
  <div class="container">
    <h2>📊 成績判定システム</h2>
    <div class="input-group">
      <label for="score">点数を入力してください (0-100):</label>
      <input type="number" id="score" value="75" min="0" max="100">
    </div>
    <button onclick="judgeScore()">評価を判定</button>
    <div id="result"></div>
  </div>

  <script>
    function judgeScore() {
      const scoreInput = document.getElementById("score").value;
      const score = Number(scoreInput);
      const result = document.getElementById("result");

      // 入力チェック
      if (score < 0 || score > 100) {
        result.innerHTML = `
          <div class="message" style="color: red;">
            ⚠️ 0から100の範囲で入力してください
          </div>
        `;
        return;
      }

      // ネストした三項演算子で評価を決定
      const grade = score >= 90 ? "S" :
                    score >= 80 ? "A" :
                    score >= 70 ? "B" :
                    score >= 60 ? "C" :
                    score >= 50 ? "D" :
                    "F";

      // 三項演算子でメッセージを決定
      const message = score >= 90 ? "素晴らしい！" :
                      score >= 80 ? "優秀です！" :
                      score >= 70 ? "良好です！" :
                      score >= 60 ? "合格です！" :
                      score >= 50 ? "もう少し頑張りましょう" :
                      "不合格です";

      // 三項演算子で合否を決定
      const passOrFail = score >= 60 ? "合格" : "不合格";

      // 三項演算子でアイコンを決定
      const icon = score >= 60 ? "✅" : "❌";

      result.innerHTML = `
        <div class="score">${score}点</div>
        <div class="grade grade-${grade}">評価: ${grade}</div>
        <div class="message">${icon} ${passOrFail}</div>
        <div class="message">${message}</div>
      `;
    }

    // ページ読み込み時に実行
    judgeScore();
  </script>
</body>
</html>
```

**ポイント:**
- ネストした三項演算子で6段階評価（S, A, B, C, D, F）を実装
- 複数の三項演算子を使って、メッセージ、合否、アイコンを決定
- 改行を使って読みやすく整形

### 実用例4: トグルボタンシステム

ボタンのON/OFF状態に応じて表示を切り替えます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>トグルボタン</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }
    .container {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
    }
    h2 {
      color: #333;
      margin-bottom: 20px;
    }
    .toggle-button {
      width: 100%;
      padding: 20px;
      font-size: 20px;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .toggle-on {
      background: #28a745;
      color: white;
    }
    .toggle-off {
      background: #dc3545;
      color: white;
    }
    #status {
      margin-top: 20px;
      padding: 15px;
      background: white;
      border-radius: 4px;
      text-align: center;
      font-size: 18px;
    }
    .status-icon {
      font-size: 48px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🔘 トグルボタンシステム</h2>
    <button id="toggleBtn" class="toggle-button" onclick="toggle()">
      オンにする
    </button>
    <div id="status"></div>
  </div>

  <script>
    let isOn = false;

    function toggle() {
      const button = document.getElementById("toggleBtn");
      const status = document.getElementById("status");

      // 状態を切り替え
      isOn = !isOn;

      // 三項演算子でボタンのテキストを決定
      button.textContent = isOn ? "オフにする" : "オンにする";

      // 三項演算子でボタンのクラスを決定
      button.className = isOn ? "toggle-button toggle-on" : "toggle-button toggle-off";

      // 三項演算子でアイコンを決定
      const icon = isOn ? "🟢" : "🔴";

      // 三項演算子でメッセージを決定
      const message = isOn ? "現在オンです" : "現在オフです";

      status.innerHTML = `
        <div class="status-icon">${icon}</div>
        <div>${message}</div>
      `;
    }

    // 初期表示
    toggle();
    toggle(); // 2回呼び出してオフ状態に戻す
  </script>
</body>
</html>
```

**ポイント:**
- `isOn`の状態に応じて、ボタンのテキスト、クラス、アイコン、メッセージを三項演算子で切り替え
- 状態管理を三項演算子で簡潔に実装

---

## 練習問題

### 問題1: 天気メッセージ表示

天気に応じたメッセージを三項演算子で表示するプログラムを作成してください。

**条件:**
- チェックボックスで「晴れている」かどうかを取得
- 晴れている場合: "☀️ 外出日和です"
- 晴れていない場合: "☔ 傘を持っていきましょう"

**HTML要素:**
- `id="isSunny"` のcheckbox（晴れているか）
- `id="result"` の結果表示要素
- ボタンをクリックで判定

<details>
<summary>ヒント1: 基本構造</summary>

```javascript
function checkWeather() {
  const isSunny = document.getElementById("isSunny").checked;
  const result = document.getElementById("result");

  // 三項演算子でメッセージを決定
  const message = isSunny ? "☀️ 外出日和です" : "☔ 傘を持っていきましょう";

  result.textContent = message;
}
```
</details>

<details>
<summary>ヒント2: HTMLの構造</summary>

```html
<div class="container">
  <h2>天気メッセージ</h2>
  <label>
    <input type="checkbox" id="isSunny">
    晴れている
  </label>
  <button onclick="checkWeather()">メッセージを表示</button>
  <div id="result"></div>
</div>
```
</details>

<details>
<summary>ヒント3: 完全な解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>天気メッセージ</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }
    .container {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
    }
    h2 {
      color: #333;
      margin-bottom: 20px;
    }
    .checkbox-group {
      margin: 15px 0;
      padding: 10px;
      background: white;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
    }
    button:hover {
      background: #0056b3;
    }
    #result {
      margin-top: 20px;
      padding: 15px;
      background: white;
      border-radius: 4px;
      font-size: 20px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🌤️ 天気メッセージ</h2>
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isSunny">
        晴れている
      </label>
    </div>
    <button onclick="checkWeather()">メッセージを表示</button>
    <div id="result"></div>
  </div>

  <script>
    function checkWeather() {
      const isSunny = document.getElementById("isSunny").checked;
      const result = document.getElementById("result");

      // 三項演算子でメッセージを決定
      const message = isSunny ? "☀️ 外出日和です" : "☔ 傘を持っていきましょう";

      result.textContent = message;
    }
  </script>
</body>
</html>
```
</details>

### 問題2: 割引価格計算

会員かどうかに応じて割引を適用した価格を三項演算子で計算するプログラムを作成してください。

**条件:**
- 元の価格: 1000円（固定）
- 会員の場合: 10%割引
- 会員でない場合: 割引なし
- 最終価格を表示

**HTML要素:**
- `id="isMember"` のcheckbox（会員か）
- `id="result"` の結果表示要素

<details>
<summary>ヒント1: 割引率の計算</summary>

```javascript
const price = 1000;
const discountRate = isMember ? 0.1 : 0;
const finalPrice = price * (1 - discountRate);
```
</details>

<details>
<summary>ヒント2: 表示の工夫</summary>

```javascript
// 割引額も表示する
const discountAmount = price * discountRate;
result.innerHTML = `
  元の価格: ${price}円<br>
  割引額: ${discountAmount}円<br>
  最終価格: ${finalPrice}円
`;
```
</details>

<details>
<summary>ヒント3: 完全な解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>割引価格計算</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }
    .container {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
    }
    h2 {
      color: #333;
      margin-bottom: 20px;
    }
    .checkbox-group {
      margin: 15px 0;
      padding: 10px;
      background: white;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
    }
    button:hover {
      background: #218838;
    }
    #result {
      margin-top: 20px;
      padding: 15px;
      background: white;
      border-radius: 4px;
      font-size: 16px;
    }
    .price-detail {
      margin: 8px 0;
      padding: 8px;
      border-left: 3px solid #007bff;
    }
    .final-price {
      font-size: 24px;
      font-weight: bold;
      color: #28a745;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>💰 割引価格計算</h2>
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isMember">
        会員である
      </label>
    </div>
    <button onclick="calculatePrice()">価格を計算</button>
    <div id="result"></div>
  </div>

  <script>
    function calculatePrice() {
      const isMember = document.getElementById("isMember").checked;
      const result = document.getElementById("result");

      const price = 1000;

      // 三項演算子で割引率を決定
      const discountRate = isMember ? 0.1 : 0;

      const discountAmount = price * discountRate;
      const finalPrice = price - discountAmount;

      // 三項演算子でメッセージを決定
      const memberStatus = isMember ? "会員（10%割引）" : "非会員（割引なし）";

      result.innerHTML = `
        <div class="price-detail">会員区分: ${memberStatus}</div>
        <div class="price-detail">元の価格: ${price}円</div>
        <div class="price-detail">割引額: ${discountAmount}円</div>
        <div class="final-price">最終価格: ${finalPrice}円</div>
      `;
    }
  </script>
</body>
</html>
```
</details>

### 問題3: BMI判定

身長と体重からBMIを計算し、ネストした三項演算子で判定するプログラムを作成してください。

**条件:**
- BMI = 体重(kg) / (身長(m) × 身長(m))
- BMI判定:
  - 18.5未満: "低体重"
  - 18.5以上25未満: "普通体重"
  - 25以上: "肥満"

**HTML要素:**
- `id="height"` のinput（身長、cm）
- `id="weight"` のinput（体重、kg）
- `id="result"` の結果表示要素

<details>
<summary>ヒント1: BMIの計算</summary>

```javascript
const height = Number(document.getElementById("height").value);
const weight = Number(document.getElementById("weight").value);

// cmをmに変換
const heightInMeters = height / 100;
const bmi = weight / (heightInMeters * heightInMeters);
```
</details>

<details>
<summary>ヒント2: ネストした三項演算子</summary>

```javascript
const category = bmi < 18.5 ? "低体重" :
                 bmi < 25 ? "普通体重" :
                 "肥満";
```
</details>

<details>
<summary>ヒント3: 完全な解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>BMI判定</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }
    .container {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
    }
    h2 {
      color: #333;
      margin-bottom: 20px;
    }
    .input-group {
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
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #17a2b8;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    button:hover {
      background: #138496;
    }
    #result {
      margin-top: 20px;
      padding: 20px;
      background: white;
      border-radius: 4px;
      text-align: center;
    }
    .bmi-value {
      font-size: 48px;
      font-weight: bold;
      color: #007bff;
      margin: 10px 0;
    }
    .category {
      font-size: 24px;
      font-weight: bold;
      margin: 10px 0;
    }
    .category-low { color: #ffc107; }
    .category-normal { color: #28a745; }
    .category-high { color: #dc3545; }
  </style>
</head>
<body>
  <div class="container">
    <h2>⚖️ BMI判定システム</h2>
    <div class="input-group">
      <label for="height">身長 (cm):</label>
      <input type="number" id="height" value="170" min="100" max="250">
    </div>
    <div class="input-group">
      <label for="weight">体重 (kg):</label>
      <input type="number" id="weight" value="65" min="30" max="200">
    </div>
    <button onclick="calculateBMI()">BMIを計算</button>
    <div id="result"></div>
  </div>

  <script>
    function calculateBMI() {
      const height = Number(document.getElementById("height").value);
      const weight = Number(document.getElementById("weight").value);
      const result = document.getElementById("result");

      // 入力チェック
      if (height <= 0 || weight <= 0) {
        result.innerHTML = `
          <div style="color: red;">
            正しい値を入力してください
          </div>
        `;
        return;
      }

      // BMI計算
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      const bmiRounded = Math.round(bmi * 10) / 10;

      // ネストした三項演算子で判定
      const category = bmi < 18.5 ? "低体重" :
                       bmi < 25 ? "普通体重" :
                       "肥満";

      // 三項演算子でCSSクラスを決定
      const categoryClass = bmi < 18.5 ? "category-low" :
                            bmi < 25 ? "category-normal" :
                            "category-high";

      // 三項演算子でメッセージを決定
      const message = bmi < 18.5 ? "もう少し体重を増やしましょう" :
                      bmi < 25 ? "健康的な体重です" :
                      "体重管理に注意しましょう";

      result.innerHTML = `
        <div class="bmi-value">${bmiRounded}</div>
        <div class="category ${categoryClass}">${category}</div>
        <div>${message}</div>
      `;
    }

    // ページ読み込み時に実行
    calculateBMI();
  </script>
</body>
</html>
```
</details>

---

## チェックリスト

以下の項目を確認して、理解度をチェックしましょう:

- [ ] **三項演算子の基本構文を理解している**
  - `条件 ? 真の値 : 偽の値` の形式を書ける
  - 各部分の意味を説明できる

- [ ] **if-else文との違いを理解している**
  - 三項演算子は値を返す式である
  - if-else文は文（statement）である

- [ ] **三項演算子が適している場面を判断できる**
  - 単純な条件で値を選択する時
  - 変数への代入が目的の時
  - 1行で書きたい時

- [ ] **三項演算子を使うべきでない場面を判断できる**
  - 複雑な条件の時
  - 複数の処理を実行する時
  - ネストが深くなる時

- [ ] **変数代入以外での使い方を理解している**
  - 関数の引数として使える
  - return文で使える
  - 文字列の中に埋め込める

- [ ] **ネストした三項演算子を読み書きできる**
  - 複数の条件を扱える
  - 改行を使って読みやすく書ける
  - if-else if-elseと対応関係を理解している

- [ ] **文字列以外の値を返すことができる**
  - 数値を返せる
  - オブジェクトを返せる
  - 配列を返せる

- [ ] **よくある間違いを避けられる**
  - `? true : false` の冗長性を理解している
  - セミコロンの位置を正しく理解している
  - 複数処理はif文を使うべきと理解している

- [ ] **実用的なパターンを活用できる**
  - デフォルト値の設定
  - 最小値・最大値の選択
  - CSSクラスの切り替え

- [ ] **可読性を重視できる**
  - 複雑になったらif文を使う判断ができる
  - コードの読みやすさを最優先できる

---

## デバッグのヒント

三項演算子で問題が起きた時の確認方法:

### 1. 条件を段階的に確認する

```javascript
let age = 20;

// 条件を個別に確認
console.log("age:", age);
console.log("age >= 18:", age >= 18);

// 三項演算子の結果を確認
let message = age >= 18 ? "成人" : "未成年";
console.log("message:", message);
```

### 2. if文に書き直してみる

```javascript
// 三項演算子
let result = score >= 90 ? "優" : score >= 60 ? "良" : "不可";

// if文に書き直して動作確認
let result;
if (score >= 90) {
  result = "優";
} else if (score >= 60) {
  result = "良";
} else {
  result = "不可";
}
console.log(result);
```

### 3. 括弧で優先順位を明確にする

```javascript
// 優先順位が不明確
let result = a && b ? "OK" : c || d ? "NG" : "Unknown";

// 括弧で明確にする
let result = (a && b) ? "OK" : ((c || d) ? "NG" : "Unknown");
```

### 4. 変数に分けて確認する

```javascript
// 複雑な三項演算子
let message = (age >= 18 && hasTicket) ? "OK" : "NG";

// 変数に分けて確認
let canEnter = age >= 18 && hasTicket;
console.log("canEnter:", canEnter);
let message = canEnter ? "OK" : "NG";
console.log("message:", message);
```

### 5. ネストの階層を確認する

```javascript
// ネストした三項演算子
let grade = score >= 90 ? "優" :
            score >= 60 ? "良" :
            "不可";

// 各段階を確認
console.log("score >= 90:", score >= 90);
if (score >= 90) {
  console.log("結果: 優");
} else {
  console.log("score >= 60:", score >= 60);
  if (score >= 60) {
    console.log("結果: 良");
  } else {
    console.log("結果: 不可");
  }
}
```

---

## ポイント

### 1. 三項演算子の基本形

```javascript
条件 ? 真の値 : 偽の値
```

この形式を覚えておけば、どんな状況でも使えます。

### 2. if-else文との使い分け

```javascript
// 単純な値の選択 → 三項演算子
let label = isActive ? "有効" : "無効";

// 複雑な処理 → if文
if (age >= 18) {
  console.log("成人です");
  count++;
  logAccess();
}
```

### 3. 読みやすさを最優先

```javascript
// 読みにくい
let x = a ? b ? c : d : e ? f : g;

// 読みやすい（if文）
let x;
if (a) {
  x = b ? c : d;
} else {
  x = e ? f : g;
}
```

### 4. ネストは改行で整える

```javascript
let grade = score >= 90 ? "優" :
            score >= 80 ? "良" :
            score >= 60 ? "可" :
            "不可";
```

### 5. 不要な三項演算子を避ける

```javascript
// ❌ 不要
let isPassed = score >= 60 ? true : false;

// ✅ シンプル
let isPassed = score >= 60;
```

### 6. 変数代入以外でも使える

```javascript
// 関数の引数
greet(name || "ゲスト");

// return文
return age >= 18 ? "成人" : "未成年";

// 文字列埋め込み
console.log(`${count}件${count === 1 ? "" : "s"}`);
```

### 7. 複雑な条件は括弧で囲む

```javascript
let result = (age >= 18 && hasTicket) ? "OK" : "NG";
```

### 8. 実用的なパターンを覚える

```javascript
// デフォルト値
let name = input || "ゲスト";

// 最小値
let min = a < b ? a : b;

// CSSクラス切り替え
let className = isActive ? "active" : "inactive";
```

---

## できるようになったこと

このレッスンを完了すると、以下のことができるようになります:

1. **三項演算子の基本構文を使える**
   - `条件 ? 真の値 : 偽の値` の形式で書ける
   - if-else文を三項演算子で書き換えられる

2. **適切な場面で三項演算子を使い分けられる**
   - 単純な条件には三項演算子を使える
   - 複雑な条件にはif文を使う判断ができる

3. **変数代入以外でも三項演算子を活用できる**
   - 関数の引数として使える
   - return文で使える
   - 文字列の中に埋め込める

4. **ネストした三項演算子を読み書きできる**
   - 複数の条件を扱える
   - 改行を使って読みやすく書ける

5. **文字列以外の値も返せる**
   - 数値、オブジェクト、配列を返せる
   - 様々な型で三項演算子を活用できる

6. **実用的なパターンを実装できる**
   - デフォルト値の設定ができる
   - 最小値・最大値の選択ができる
   - CSSクラスの切り替えができる

7. **よくある間違いを避けられる**
   - 不要な`? true : false`を避けられる
   - セミコロンの位置を正しく理解している
   - 複雑になったらif文を使う判断ができる

8. **可読性を重視したコードを書ける**
   - コードの読みやすさを最優先できる
   - 適切な場面で三項演算子を使える

---

## まとめ

- **三項演算子**: `条件 ? 真の値 : 偽の値` の形式で条件分岐を1行で書ける
- **if-else文との違い**: 三項演算子は値を返す式、if-else文は文
- **適している場面**: 単純な条件で値を選択する時、変数への代入が目的の時
- **避けるべき場面**: 複雑な条件、複数の処理、深いネスト
- **ネスト**: 複数の条件を扱えるが、改行を使って読みやすく書く
- **実用パターン**: デフォルト値、最小値・最大値、CSSクラス切り替え
- **よくある間違い**: `? true : false` は不要、複雑になったらif文を使う
- **読みやすさ**: コードの可読性を最優先に考えて使い分ける

---

## 次のステップ

次のレッスンでは、**週のプロジェクト**として、これまで学んだ条件分岐を組み合わせた診断アプリを作成します。

プロジェクトでは:
- 複数の質問に答える
- 条件分岐で結果を判定
- ユーザーインターフェースを作成

これまで学んだif文、論理演算子、三項演算子をすべて活用して、実践的なアプリケーションを作りましょう！
