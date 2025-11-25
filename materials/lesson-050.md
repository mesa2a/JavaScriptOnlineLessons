# レッスン50: 組み合わせ条件

## なぜ重要なのか

複雑な条件式は、実際のアプリケーション開発で避けて通れません。以下のような場面で、複数の条件を組み合わせた判定が必要になります。

### 実際のサービスでの使用例

1. **Amazon：商品の割引判定**
   ```javascript
   // (プライム会員 または 学生) かつ (購入額5000円以上) で送料無料
   if ((isPrimeMember || isStudent) && totalAmount >= 5000) {
     shippingFee = 0;
   }
   ```

2. **Netflix：視聴制限の判定**
   ```javascript
   // (アカウント有効) かつ (年齢制限クリア または 保護者同意) かつ (地域制限なし)
   if (isAccountActive && (age >= ratingAge || hasParentalConsent) && !isRegionBlocked) {
     allowStreaming = true;
   }
   ```

3. **Uber Eats：配達可否の判定**
   ```javascript
   // (営業時間内 または プレミアム会員) かつ (配達可能エリア) かつ (在庫あり)
   if ((isBusinessHours || isPremium) && isDeliverableArea && isInStock) {
     canDeliver = true;
   }
   ```

4. **LinkedIn：メッセージ送信権限の判定**
   ```javascript
   // (つながっている または プレミアム会員) かつ (ブロックされていない)
   if ((isConnected || isPremium) && !isBlocked) {
   canSendMessage = true;
   }
   ```

5. **楽天市場：ポイント倍率の計算**
   ```javascript
   // (アプリ購入 かつ カード決済) または (プレミアム会員 かつ セール期間)
   if ((isAppPurchase && isCreditCard) || (isPremiumMember && isSalePeriod)) {
     pointRate = 10;  // 10倍
   }
   ```

このように、**複数の条件を正しく組み合わせる能力**は、実践的なアプリケーション開発に不可欠です。

---

## このレッスンで学ぶこと

これまで学んだAND(`&&`)、OR(`||`)、NOT(`!`)を組み合わせた**複雑な条件式**について、さらに深く学びます。特に、以下の重要な概念を理解します：

- **優先順位**：演算子が評価される順序
- **短絡評価**：効率的な評価とエラー防止
- **括弧の使い方**：意図した順序で評価させる方法
- **可読性の向上**：複雑な条件をわかりやすく書く技術

---

## 論理演算子の優先順位

数式に `×` と `+` の優先順位があるように、論理演算子にも**評価される順番**があります。

### 優先順位の順序

1. **`!` (NOT)** - 最優先（最初に評価される）
2. **`&&` (AND)** - 2番目
3. **`||` (OR)** - 最後

### なぜ優先順位が重要なのか

優先順位を理解していないと、**意図しない結果**になってしまいます。

```javascript
let a = true;
let b = false;
let c = true;

// 優先順位に従って評価される
let result = a || b && c;

// どう評価されるか？
// 間違った理解: (a || b) && c → true && true → true
// 正しい評価: a || (b && c) → true || false → true

console.log(result);  // true
```

### 評価の流れを段階的に見る

```javascript
let age = 25;
let isStudent = false;
let hasCoupon = true;

// 式: age < 18 || isStudent && hasCoupon
// どう評価される？

// ステップ1: まず && が評価される（優先順位2位）
// isStudent && hasCoupon → false && true → false

// ステップ2: 次に || が評価される（優先順位3位）
// age < 18 || false → false || false → false

if (age < 18 || isStudent && hasCoupon) {
  console.log("割引適用");  // 実行されない
}
```

### 優先順位の覚え方

```
NOT（!）が最強 → AND（&&）が中間 → OR（||）が最弱

"ノットが最も強く、アンドがその次、オアが最後"
```

数式で言えば：
- `!` は「括弧」のような存在（最優先）
- `&&` は「×（掛け算）」のような存在
- `||` は「+（足し算）」のような存在

---

## 括弧で優先順位を制御する

数式と同じように、**括弧 `()` を使えば評価の順序を変更**できます。

### 例1: 括弧なしの場合

```javascript
let age = 25;
let isStudent = false;
let hasCoupon = true;

// AND が先に評価される
if (age < 18 || isStudent && hasCoupon) {
  console.log("割引適用");
}

// 評価の流れ:
// 1. isStudent && hasCoupon → false && true → false
// 2. age < 18 || false → false || false → false
// 結果: 実行されない ❌
```

### 例2: 括弧ありの場合（意図を変える）

```javascript
let age = 25;
let isStudent = false;
let hasCoupon = true;

// 括弧で順序を変更
if ((age < 18 || isStudent) && hasCoupon) {
  console.log("割引適用");
}

// 評価の流れ:
// 1. (age < 18 || isStudent) → false || false → false
// 2. false && hasCoupon → false && true → false
// 結果: 実行されない ❌
```

### 例3: 括弧で意図を明確にする

```javascript
let age = 16;
let isStudent = true;
let hasCoupon = true;

// 括弧で "18歳未満または学生" を一つの条件として扱う
if ((age < 18 || isStudent) && hasCoupon) {
  console.log("割引適用");
}

// 評価の流れ:
// 1. (age < 18 || isStudent) → true || true → true
// 2. true && hasCoupon → true && true → true
// 結果: 実行される ✅
```

### 括弧の重要性

```javascript
// ❌ 読みにくい・意図が不明確
if (a || b && c || d && e) {
  // どう評価される？
}

// ✅ 読みやすい・意図が明確
if ((a || b) && (c || d) && e) {
  // 明確に理解できる
}
```

**ベストプラクティス**：複雑な条件では、優先順位に頼らず、**常に括弧を使う**ことが推奨されます。

---

## 短絡評価とは

論理演算子は、**結果が確定した時点で評価を停止**します。これを**短絡評価（Short-circuit evaluation）**と呼びます。

### なぜ短絡評価が存在するのか

**効率化**と**エラー防止**のためです。

```javascript
// もし短絡評価がなかったら...
let name = null;

// エラーになってしまう！
if (name !== null && name.length > 0) {
  // name.length を評価しようとしてエラー
}

// 短絡評価のおかげで:
// 1. name !== null → false
// 2. false && ... → もう評価しない（短絡！）
// 3. name.length は評価されない → エラーにならない
```

### AND演算子（&&）の短絡評価

**左側が `false` なら、右側を評価しません。**

なぜなら、ANDは「両方とも真」でないと真にならないため、片方が偽の時点で結果は確定するからです。

```javascript
let age = 15;
let hasLicense = true;

// age >= 18 が false なので、hasLicense はチェックされない
if (age >= 18 && hasLicense) {
  console.log("運転できます");
}

// 評価の流れ:
// 1. age >= 18 → false
// 2. false && ... → 結果は必ず false
// 3. hasLicense は評価されない（短絡！）
```

### 短絡評価を使ったエラー防止

```javascript
let user = null;

// ❌ 危険: user が null の場合、エラーになる
if (user.age >= 18 && user.hasLicense) {
  console.log("運転できます");
}

// ✅ 安全: 短絡評価でエラーを防ぐ
if (user !== null && user.age >= 18 && user.hasLicense) {
  console.log("運転できます");
}

// 評価の流れ:
// 1. user !== null → false
// 2. false && ... → 短絡評価で停止
// 3. user.age や user.hasLicense は評価されない → エラーにならない
```

### 短絡評価の実用例

```javascript
let name = "";

// name が空でない場合だけ、length をチェック
if (name !== "" && name.length >= 3) {
  console.log("名前が有効です");
}

// もし && がなければ...
if (name.length >= 3) {  // name が "" の場合も評価される
  console.log("名前が有効です");  // 0 >= 3 → false
}
```

### OR演算子（||）の短絡評価

**左側が `true` なら、右側を評価しません。**

なぜなら、ORは「どちらか一つが真」なら真になるため、片方が真の時点で結果は確定するからです。

```javascript
let isVIP = true;
let hasTicket = false;

// isVIP が true なので、hasTicket はチェックされない
if (isVIP || hasTicket) {
  console.log("入場できます");
}

// 評価の流れ:
// 1. isVIP → true
// 2. true || ... → 結果は必ず true
// 3. hasTicket は評価されない（短絡！）
```

### 短絡評価を使ったデフォルト値の設定

```javascript
let userName = "";
let displayName = userName || "ゲスト";

console.log(displayName);  // "ゲスト"

// 評価の流れ:
// 1. userName → "" (falsyな値)
// 2. false || "ゲスト" → "ゲスト"
```

これは、以下のif文と同じ意味です：

```javascript
let userName = "";
let displayName;

if (userName) {
  displayName = userName;
} else {
  displayName = "ゲスト";
}

console.log(displayName);  // "ゲスト"
```

### 短絡評価の真偽値テーブル

| 演算子 | 左側 | 右側を評価する？ | 理由 |
|--------|------|------------------|------|
| `&&` | false | **評価しない** | 結果は必ず false |
| `&&` | true | **評価する** | 右側次第で結果が変わる |
| `\|\|` | true | **評価しない** | 結果は必ず true |
| `\|\|` | false | **評価する** | 右側次第で結果が変わる |

---

## 複雑な条件の実例

### 例1: イベント参加条件

```javascript
function checkEventEntry() {
  const age = 20;
  const hasTicket = true;
  const isMember = false;
  const isVIP = false;

  // 条件: (18歳以上でチケットあり) または (会員 または VIP)
  if ((age >= 18 && hasTicket) || (isMember || isVIP)) {
    console.log("参加できます");
  } else {
    console.log("参加できません");
  }
}

// 評価の流れ:
// 1. (age >= 18 && hasTicket) → (true && true) → true
// 2. (isMember || isVIP) → (false || false) → false
// 3. true || false → true
// 結果: "参加できます" ✅
```

#### なぜこの条件なのか

- **一般参加者**：18歳以上でチケットが必要
- **特別参加者**：会員またはVIPならチケット不要

この2つの条件のどちらかを満たせば参加できます。

### 例2: 割引判定

```javascript
function checkDiscount() {
  const age = 70;
  const isStudent = false;
  const isPremiumMember = true;
  const purchaseAmount = 5000;

  // 条件: (学生 または 65歳以上) または (プレミアム会員で5000円以上購入)
  if ((isStudent || age >= 65) || (isPremiumMember && purchaseAmount >= 5000)) {
    console.log("20%割引が適用されます");
  } else {
    console.log("通常価格です");
  }
}

// 評価の流れ:
// 1. (isStudent || age >= 65) → (false || true) → true
// 2. true || ... → 短絡評価で終了
// 結果: "20%割引が適用されます" ✅
```

#### なぜこの条件なのか

割引が適用される2つのパターン：
1. **年齢割引**：学生または65歳以上
2. **会員割引**：プレミアム会員で5000円以上購入

どちらかを満たせば割引されます。

### 例3: アクセス制御

```javascript
function checkAccess() {
  const isLoggedIn = true;
  const isAdmin = false;
  const isModerator = true;
  const isOwner = false;
  const isBanned = false;

  // 条件: ログイン済みで、(管理者 または モデレーター または 所有者) で、出禁でない
  if (isLoggedIn && (isAdmin || isModerator || isOwner) && !isBanned) {
    console.log("アクセス許可");
  } else {
    console.log("アクセス拒否");
  }
}

// 評価の流れ:
// 1. isLoggedIn → true
// 2. (isAdmin || isModerator || isOwner) → (false || true || false) → true
// 3. !isBanned → !false → true
// 4. true && true && true → true
// 結果: "アクセス許可" ✅
```

#### なぜこの条件なのか

アクセス許可の3つの必須条件：
1. **ログイン済み**であること
2. **権限がある**こと（管理者、モデレーター、所有者のいずれか）
3. **出禁でない**こと

すべてを満たす必要があります（AND条件）。

### 例4: 配送可否の判定

```javascript
function checkDelivery() {
  const isInStock = true;
  const isDeliverableArea = true;
  const isWeekday = false;
  const isPremiumMember = true;
  const orderTime = 22;  // 22時

  // 条件: (在庫あり && 配送エリア) && ((平日 && 20時まで) || プレミアム会員)
  if (
    (isInStock && isDeliverableArea) &&
    ((isWeekday && orderTime <= 20) || isPremiumMember)
  ) {
    console.log("本日配送できます");
  } else {
    console.log("配送できません");
  }
}

// 評価の流れ:
// 1. (isInStock && isDeliverableArea) → (true && true) → true
// 2. (isWeekday && orderTime <= 20) → (false && false) → false
// 3. isPremiumMember → true
// 4. false || true → true
// 5. true && true → true
// 結果: "本日配送できます" ✅
```

#### なぜこの条件なのか

配送可能の条件は2段階：
1. **基本条件**（必須）：在庫あり && 配送エリア内
2. **時間条件**（いずれか）：
   - 平日の20時まで
   - プレミアム会員（時間制限なし）

---

## 条件式の読みやすさを向上させる技術

複雑な条件は、そのまま書くと**読みにくく、バグの原因**になります。以下の技術を使って、読みやすいコードを書きましょう。

### 技術1: 改行して整理する

```javascript
// ❌ 読みにくい
if ((age >= 18 && hasTicket) || (isMember || isVIP) && !isBanned) {
  console.log("OK");
}

// ✅ 読みやすい
if (
  (age >= 18 && hasTicket) ||
  (isMember || isVIP) &&
  !isBanned
) {
  console.log("OK");
}

// ✅ さらに読みやすい（インデントで構造を表現）
if (
  (age >= 18 && hasTicket) ||
  ((isMember || isVIP) && !isBanned)
) {
  console.log("OK");
}
```

### 技術2: 中間変数を使う

複雑な条件は、**中間変数に分けると読みやすく**なります。

```javascript
// ❌ 複雑で読みにくい
if ((age >= 18 && hasTicket && !isBanned) || (isVIP && !isBanned)) {
  console.log("OK");
}

// ✅ わかりやすい
const isRegularEntry = age >= 18 && hasTicket && !isBanned;
const isVIPEntry = isVIP && !isBanned;

if (isRegularEntry || isVIPEntry) {
  console.log("OK");
}
```

#### 中間変数のメリット

1. **可読性の向上**：条件に名前がつく
2. **デバッグしやすい**：各条件を個別に確認できる
3. **再利用できる**：同じ条件を複数回使う場合に便利

```javascript
const isRegularEntry = age >= 18 && hasTicket && !isBanned;
const isVIPEntry = isVIP && !isBanned;

console.log("一般入場:", isRegularEntry);  // デバッグ出力
console.log("VIP入場:", isVIPEntry);        // デバッグ出力

if (isRegularEntry || isVIPEntry) {
  console.log("入場できます");
}

// 他の場所でも再利用できる
if (isVIPEntry) {
  console.log("VIP特典があります");
}
```

### 技術3: コメントを追加する

```javascript
// 一般入場: 18歳以上でチケットあり、出禁でない
const isRegularEntry = age >= 18 && hasTicket && !isBanned;

// VIP入場: VIPで出禁でない
const isVIPEntry = isVIP && !isBanned;

if (isRegularEntry || isVIPEntry) {
  console.log("入場できます");
}
```

### 技術4: 早期リターンを使う

```javascript
// ❌ ネストが深い
function checkEntry(age, hasTicket, isBanned, isVIP) {
  if (age >= 18) {
    if (hasTicket) {
      if (!isBanned) {
        return true;
      }
    }
  }
  if (isVIP && !isBanned) {
    return true;
  }
  return false;
}

// ✅ 早期リターンで読みやすく
function checkEntry(age, hasTicket, isBanned, isVIP) {
  // 出禁チェック（最優先）
  if (isBanned) {
    return false;
  }

  // VIP入場
  if (isVIP) {
    return true;
  }

  // 一般入場
  if (age >= 18 && hasTicket) {
    return true;
  }

  return false;
}
```

---

## よくある間違い

### 間違い1: 優先順位の勘違い

```javascript
let age = 25;
let isStudent = false;
let hasCoupon = true;

// ❌ 間違い: 意図と異なる評価になる
if (age < 18 || isStudent && hasCoupon) {
  // これは (age < 18) || (isStudent && hasCoupon) と評価される
  // 「18歳未満、または、学生でクーポンあり」という意味
}

// ✅ 正しい: 括弧で明示する
if ((age < 18 || isStudent) && hasCoupon) {
  // 「(18歳未満または学生) かつ クーポンあり」という意味
}
```

#### なぜ間違えやすいのか

人間は、**左から右に読む**ため、`age < 18 || isStudent` が先だと思いがちです。しかし、JavaScriptは**優先順位**に従います。

### 間違い2: 短絡評価を考慮しない

```javascript
let user = null;

// ❌ 危険: user が null の場合、エラーになる
if (user.age >= 18 && user !== null) {
  console.log("成人です");
}

// エラー: Cannot read property 'age' of null
// 理由: user.age を先に評価しようとするため

// ✅ 安全: 先に null チェック
if (user !== null && user.age >= 18) {
  console.log("成人です");
}

// 評価の流れ:
// 1. user !== null → false
// 2. false && ... → 短絡評価で停止
// 3. user.age は評価されない → エラーにならない
```

#### ポイント

**null/undefined チェックは常に最初に行う**

### 間違い3: 二重否定の乱用

```javascript
let isNotInvalid = true;

// ❌ 読みにくい
if (!isNotInvalid) {
  console.log("無効です");
}

// ✅ 読みやすい
let isValid = true;

if (!isValid) {
  console.log("無効です");
}

// または
if (isValid === false) {
  console.log("無効です");
}
```

#### なぜ避けるべきか

- **理解しにくい**：`!isNotInvalid` は二重否定で混乱する
- **バグの原因**：論理が複雑になる

### 間違い4: 括弧の付け忘れ

```javascript
let age = 20;
let hasTicket = true;
let isMember = true;
let isVIP = false;

// ❌ 意図が不明確
if (age >= 18 && hasTicket || isMember || isVIP) {
  console.log("OK");
}

// これは以下のように評価される:
// (age >= 18 && hasTicket) || isMember || isVIP

// 意図していたのは:
// age >= 18 && (hasTicket || isMember || isVIP)

// ✅ 括弧で明確にする
if (age >= 18 && (hasTicket || isMember || isVIP)) {
  console.log("OK");
}
```

### 間違い5: 複雑すぎる条件

```javascript
// ❌ 複雑すぎて理解できない
if ((a || b && c) && (d || e && !f) || (g && h || !i) && j) {
  console.log("OK");
}

// ✅ 中間変数で分解する
const condition1 = (a || b && c);
const condition2 = (d || e && !f);
const condition3 = (g && h || !i);

if ((condition1 && condition2) || (condition3 && j)) {
  console.log("OK");
}

// ✅ さらにわかりやすく
const firstCheck = condition1 && condition2;
const secondCheck = condition3 && j;

if (firstCheck || secondCheck) {
  console.log("OK");
}
```

### 間違い6: デフォルト値の誤解

```javascript
let count = 0;
let displayCount = count || 10;

console.log(displayCount);  // 10 (意図: 0 を表示したかった)

// 問題: 0 は falsy なので、|| の右側が選ばれる

// ✅ 正しい方法
let displayCount = (count !== undefined && count !== null) ? count : 10;

// または
let displayCount = count ?? 10;  // Null 合体演算子（ES2020）
```

---

## 実用例

### 実用例1: ログインフォームのバリデーション

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ログインフォーム</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
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
    input[type="text"],
    input[type="password"] {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
      transition: all 0.3s;
      box-sizing: border-box;
    }
    input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 15px 0;
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
      transition: transform 0.2s, box-shadow 0.2s;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    button:active {
      transform: translateY(0);
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
    .success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
    .error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
    .requirements {
      font-size: 14px;
      color: #666;
      margin-top: 10px;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>ログイン</h2>
    <div class="form-group">
      <label for="username">ユーザー名</label>
      <input type="text" id="username" placeholder="3文字以上">
      <div class="requirements">3文字以上、20文字以内</div>
    </div>

    <div class="form-group">
      <label for="password">パスワード</label>
      <input type="password" id="password" placeholder="8文字以上">
      <div class="requirements">8文字以上、英数字を含む</div>
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="terms">
      <label for="terms">利用規約に同意する</label>
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="remember">
      <label for="remember">ログイン状態を保持</label>
    </div>

    <button onclick="login()">ログイン</button>

    <div id="message" class="message"></div>
  </div>

  <script>
    function login() {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const termsAccepted = document.getElementById("terms").checked;
      const remember = document.getElementById("remember").checked;
      const messageEl = document.getElementById("message");

      // 入力値の検証
      const isUsernameValid = username.length >= 3 && username.length <= 20;
      const isPasswordValid = password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
      const isTermsAccepted = termsAccepted;

      // 複合条件: すべての条件を満たす必要がある
      if (isUsernameValid && isPasswordValid && isTermsAccepted) {
        messageEl.className = "message success show";
        messageEl.textContent = remember
          ? "ログイン成功！ログイン状態を保持します。"
          : "ログイン成功！";
      } else {
        // どの条件が満たされていないかを明示
        let errors = [];

        if (!isUsernameValid) {
          errors.push("ユーザー名は3文字以上20文字以内で入力してください");
        }
        if (!isPasswordValid) {
          errors.push("パスワードは8文字以上で英数字を含む必要があります");
        }
        if (!isTermsAccepted) {
          errors.push("利用規約への同意が必要です");
        }

        messageEl.className = "message error show";
        messageEl.innerHTML = errors.join("<br>");
      }
    }
  </script>
</body>
</html>
```

#### このコードのポイント

1. **複数の検証条件**を組み合わせている
2. **中間変数**（`isUsernameValid`など）で可読性を向上
3. **すべての条件を満たす**（AND条件）必要がある
4. **どの条件が失敗したか**を明示的に表示

### 実用例2: チケット予約システム

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>チケット予約システム</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      max-width: 500px;
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
    input[type="number"] {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 10px 0;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 5px;
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
    .result {
      margin-top: 20px;
      padding: 20px;
      border-radius: 8px;
      display: none;
    }
    .result.show {
      display: block;
    }
    .success {
      background: #d4edda;
      color: #155724;
      border: 2px solid #c3e6cb;
    }
    .error {
      background: #f8d7da;
      color: #721c24;
      border: 2px solid #f5c6cb;
    }
    .info-box {
      background: #e7f3ff;
      border-left: 4px solid #2196F3;
      padding: 15px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .info-box h3 {
      margin-top: 0;
      color: #2196F3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🎫 イベントチケット予約</h2>

    <div class="info-box">
      <h3>予約条件</h3>
      <p><strong>一般:</strong> チケット購入 かつ 18歳以上</p>
      <p><strong>特別:</strong> VIP または プレミアム会員</p>
      <p><strong>共通:</strong> 定員に空きがある</p>
    </div>

    <div class="form-group">
      <label for="age">年齢</label>
      <input type="number" id="age" placeholder="年齢を入力" value="20">
    </div>

    <div class="form-group">
      <label for="ticketCount">チケット枚数</label>
      <input type="number" id="ticketCount" placeholder="枚数" value="2" min="1" max="10">
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="hasTicket">
      <label for="hasTicket">チケット購入済み</label>
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="isVIP">
      <label for="isVIP">VIP会員</label>
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="isPremium">
      <label for="isPremium">プレミアム会員</label>
    </div>

    <button onclick="checkReservation()">予約可否をチェック</button>

    <div id="result" class="result"></div>
  </div>

  <script>
    const MAX_CAPACITY = 100;  // 最大定員
    let currentBookings = 95;   // 現在の予約数

    function checkReservation() {
      const age = parseInt(document.getElementById("age").value);
      const ticketCount = parseInt(document.getElementById("ticketCount").value);
      const hasTicket = document.getElementById("hasTicket").checked;
      const isVIP = document.getElementById("isVIP").checked;
      const isPremium = document.getElementById("isPremium").checked;
      const resultEl = document.getElementById("result");

      // 中間変数で条件を整理
      const isGeneralEligible = hasTicket && age >= 18;
      const isSpecialEligible = isVIP || isPremium;
      const hasCapacity = (currentBookings + ticketCount) <= MAX_CAPACITY;

      // 複合条件: (一般条件 または 特別条件) かつ 定員に空きがある
      if ((isGeneralEligible || isSpecialEligible) && hasCapacity) {
        currentBookings += ticketCount;
        resultEl.className = "result success show";
        resultEl.innerHTML = `
          <h3>✅ 予約できます！</h3>
          <p><strong>予約枚数:</strong> ${ticketCount}枚</p>
          <p><strong>残り枚数:</strong> ${MAX_CAPACITY - currentBookings}枚</p>
          <p><strong>条件:</strong> ${
            isSpecialEligible ? "特別会員" : "一般（18歳以上・チケット購入済み）"
          }</p>
        `;
      } else {
        // 失敗理由を明示
        let reasons = [];

        if (!hasCapacity) {
          reasons.push(`定員オーバー（残り${MAX_CAPACITY - currentBookings}枚）`);
        }
        if (!isGeneralEligible && !isSpecialEligible) {
          if (!hasTicket && age < 18) {
            reasons.push("チケット未購入 かつ 18歳未満");
          } else if (!hasTicket) {
            reasons.push("チケット未購入");
          } else if (age < 18) {
            reasons.push("18歳未満");
          }
          reasons.push("VIPまたはプレミアム会員でもありません");
        }

        resultEl.className = "result error show";
        resultEl.innerHTML = `
          <h3>❌ 予約できません</h3>
          <p>${reasons.join("<br>")}</p>
        `;
      }
    }
  </script>
</body>
</html>
```

#### このコードのポイント

1. **複数の入場条件**を組み合わせた判定
2. **(一般条件 OR 特別条件) AND 定員条件**という複合ロジック
3. **失敗理由を詳細に表示**

### 実用例3: 割引計算システム

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>割引計算システム</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      min-height: 100vh;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h2 {
      color: #4facfe;
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
    input[type="number"] {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 10px 0;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 5px;
    }
    button {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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
      box-shadow: 0 5px 15px rgba(79, 172, 254, 0.4);
    }
    .result {
      margin-top: 20px;
      padding: 20px;
      border-radius: 8px;
      background: #e7f3ff;
      border: 2px solid #4facfe;
      display: none;
    }
    .result.show {
      display: block;
    }
    .price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0;
      padding: 10px;
      background: white;
      border-radius: 5px;
    }
    .price-label {
      font-weight: bold;
    }
    .price-value {
      font-size: 20px;
      color: #4facfe;
    }
    .discount-info {
      background: #fff3cd;
      border: 1px solid #ffc107;
      padding: 15px;
      border-radius: 5px;
      margin-top: 15px;
    }
    .discount-info h4 {
      margin-top: 0;
      color: #856404;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>💰 割引計算システム</h2>

    <div class="form-group">
      <label for="age">年齢</label>
      <input type="number" id="age" placeholder="年齢を入力" value="70">
    </div>

    <div class="form-group">
      <label for="amount">購入金額（円）</label>
      <input type="number" id="amount" placeholder="金額" value="10000" step="100">
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="isStudent">
      <label for="isStudent">学生</label>
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="isPremium">
      <label for="isPremium">プレミアム会員</label>
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="isFirstPurchase">
      <label for="isFirstPurchase">初回購入</label>
    </div>

    <button onclick="calculateDiscount()">割引を計算</button>

    <div id="result" class="result"></div>
  </div>

  <script>
    function calculateDiscount() {
      const age = parseInt(document.getElementById("age").value);
      const amount = parseInt(document.getElementById("amount").value);
      const isStudent = document.getElementById("isStudent").checked;
      const isPremium = document.getElementById("isPremium").checked;
      const isFirstPurchase = document.getElementById("isFirstPurchase").checked;
      const resultEl = document.getElementById("result");

      // 割引条件の判定（複合条件）
      const isSeniorDiscount = age >= 65;
      const isStudentDiscount = isStudent && age <= 25;
      const isPremiumDiscount = isPremium && amount >= 5000;
      const isBulkDiscount = amount >= 10000;
      const isFirstBuyerDiscount = isFirstPurchase;

      // 適用される割引率を計算
      let discountRate = 0;
      let appliedDiscounts = [];

      // 年齢割引: 65歳以上で15%
      if (isSeniorDiscount) {
        discountRate += 15;
        appliedDiscounts.push("シニア割引（15%）");
      }

      // 学生割引: 学生かつ25歳以下で10%
      if (isStudentDiscount) {
        discountRate += 10;
        appliedDiscounts.push("学生割引（10%）");
      }

      // プレミアム会員割引: 会員かつ5000円以上で20%
      if (isPremiumDiscount) {
        discountRate += 20;
        appliedDiscounts.push("プレミアム会員割引（20%）");
      }

      // まとめ買い割引: 10000円以上で5%
      if (isBulkDiscount) {
        discountRate += 5;
        appliedDiscounts.push("まとめ買い割引（5%）");
      }

      // 初回購入割引: 初回なら10%
      if (isFirstBuyerDiscount) {
        discountRate += 10;
        appliedDiscounts.push("初回購入割引（10%）");
      }

      // 最大割引率は50%まで
      if (discountRate > 50) {
        discountRate = 50;
      }

      const discountAmount = Math.floor(amount * discountRate / 100);
      const finalAmount = amount - discountAmount;

      resultEl.className = "result show";
      resultEl.innerHTML = `
        <h3>💳 お会計</h3>
        <div class="price-row">
          <span class="price-label">元の金額:</span>
          <span class="price-value">¥${amount.toLocaleString()}</span>
        </div>
        <div class="price-row">
          <span class="price-label">割引額:</span>
          <span class="price-value" style="color: #f5576c;">-¥${discountAmount.toLocaleString()}</span>
        </div>
        <div class="price-row" style="background: #4facfe; color: white;">
          <span class="price-label">お支払い額:</span>
          <span class="price-value" style="color: white; font-size: 24px;">¥${finalAmount.toLocaleString()}</span>
        </div>
        ${appliedDiscounts.length > 0 ? `
        <div class="discount-info">
          <h4>🎉 適用された割引（合計${discountRate}%）</h4>
          <ul>
            ${appliedDiscounts.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>
        ` : '<p style="text-align: center; color: #666;">適用される割引はありません</p>'}
      `;
    }
  </script>
</body>
</html>
```

#### このコードのポイント

1. **複数の割引条件を判定**
2. **各条件が独立**（OR条件ではなく、すべて累積）
3. **複合条件の組み合わせ**（例：プレミアム会員 AND 5000円以上）
4. **最大値制限**（50%まで）

---

## 練習問題

### 問題1: レストラン予約チェック

レストランの予約ができるかを判定するプログラムを作成してください。

**予約条件:**
- (平日 または 会員) かつ (人数が4人以下)

**HTMLの構成:**
- `id="isWeekday"` のチェックボックス（平日か）
- `id="isMember"` のチェックボックス（会員か）
- `id="partySize"` のinput要素（人数入力）
- `id="result"` の結果表示エリア

**動作:**
1. 人数が数値かチェック
2. `(isWeekday || isMember) && partySize <= 4` を判定
3. 予約できる場合: "予約できます"
4. 予約できない場合: "予約できません"

<details>
<summary>💡 ヒント1: 基本構造</summary>

```javascript
function checkReservation() {
  const isWeekday = document.getElementById("isWeekday").checked;
  const isMember = document.getElementById("isMember").checked;
  const partySize = parseInt(document.getElementById("partySize").value);

  // ここに条件を書く
}
```
</details>

<details>
<summary>💡 ヒント2: 条件式の構造</summary>

```javascript
// 中間変数で整理する
const isDayOrMemberOK = isWeekday || isMember;
const isSizeOK = partySize <= 4;

if (isDayOrMemberOK && isSizeOK) {
  // 予約できる
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
  <title>レストラン予約</title>
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
    button {
      padding: 10px 20px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    #result {
      margin-top: 20px;
      padding: 15px;
      border-radius: 5px;
      display: none;
    }
    .success {
      background: #d4edda;
      color: #155724;
    }
    .error {
      background: #f8d7da;
      color: #721c24;
    }
  </style>
</head>
<body>
  <h2>レストラン予約チェック</h2>

  <div class="form-group">
    <label>
      <input type="checkbox" id="isWeekday">
      平日
    </label>
  </div>

  <div class="form-group">
    <label>
      <input type="checkbox" id="isMember">
      会員
    </label>
  </div>

  <div class="form-group">
    <label>
      人数: <input type="number" id="partySize" value="2" min="1" max="10">
    </label>
  </div>

  <button onclick="checkReservation()">予約可否をチェック</button>

  <div id="result"></div>

  <script>
    function checkReservation() {
      const isWeekday = document.getElementById("isWeekday").checked;
      const isMember = document.getElementById("isMember").checked;
      const partySize = parseInt(document.getElementById("partySize").value);
      const resultEl = document.getElementById("result");

      // 数値チェック
      if (isNaN(partySize) || partySize < 1) {
        resultEl.className = "error";
        resultEl.style.display = "block";
        resultEl.textContent = "人数を正しく入力してください";
        return;
      }

      // 予約条件の判定
      const isDayOrMemberOK = isWeekday || isMember;
      const isSizeOK = partySize <= 4;

      if (isDayOrMemberOK && isSizeOK) {
        resultEl.className = "success";
        resultEl.style.display = "block";
        resultEl.textContent = `✅ 予約できます（${partySize}名）`;
      } else {
        resultEl.className = "error";
        resultEl.style.display = "block";

        let reason = [];
        if (!isDayOrMemberOK) {
          reason.push("平日または会員である必要があります");
        }
        if (!isSizeOK) {
          reason.push("人数は4人以下である必要があります");
        }

        resultEl.textContent = `❌ 予約できません\n${reason.join("\n")}`;
      }
    }
  </script>
</body>
</html>
```
</details>

### 問題2: 配送料金の計算

商品の配送料金を計算するプログラムを作成してください。

**配送料金のルール:**
- 基本送料: 500円
- 無料条件: (購入額5000円以上) または (プレミアム会員 かつ 購入額3000円以上)
- 速達料金: 速達の場合は+300円

**作成するもの:**
- 購入金額の入力欄
- プレミアム会員のチェックボックス
- 速達配送のチェックボックス
- 計算ボタン
- 結果表示エリア

<details>
<summary>💡 ヒント1: 無料条件の判定</summary>

```javascript
const isFreeShipping =
  (amount >= 5000) ||
  (isPremium && amount >= 3000);
```
</details>

<details>
<summary>💡 ヒント2: 料金計算のロジック</summary>

```javascript
let shippingFee = 0;

if (!isFreeShipping) {
  shippingFee = 500;
}

if (isExpressDelivery) {
  shippingFee += 300;
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
  <title>配送料金計算</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h2 {
      text-align: center;
      color: #333;
    }
    .form-group {
      margin: 20px 0;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input[type="number"] {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 10px 0;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #2196F3;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 20px;
    }
    button:hover {
      background: #1976D2;
    }
    .result {
      margin-top: 20px;
      padding: 20px;
      background: #e3f2fd;
      border-radius: 5px;
      display: none;
    }
    .result.show {
      display: block;
    }
    .fee-row {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      padding: 10px;
      background: white;
      border-radius: 5px;
    }
    .total {
      font-size: 20px;
      font-weight: bold;
      color: #2196F3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>📦 配送料金計算</h2>

    <div class="form-group">
      <label for="amount">購入金額（円）</label>
      <input type="number" id="amount" value="4000" step="100">
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="isPremium">
      <label for="isPremium">プレミアム会員</label>
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="isExpress">
      <label for="isExpress">速達配送（+300円）</label>
    </div>

    <button onclick="calculateShipping()">配送料金を計算</button>

    <div id="result" class="result"></div>
  </div>

  <script>
    function calculateShipping() {
      const amount = parseInt(document.getElementById("amount").value);
      const isPremium = document.getElementById("isPremium").checked;
      const isExpress = document.getElementById("isExpress").checked;
      const resultEl = document.getElementById("result");

      // 無料配送条件の判定
      const isFreeShipping =
        (amount >= 5000) ||
        (isPremium && amount >= 3000);

      // 配送料金の計算
      let shippingFee = 0;

      if (!isFreeShipping) {
        shippingFee = 500;
      }

      if (isExpress) {
        shippingFee += 300;
      }

      const totalAmount = amount + shippingFee;

      // 結果表示
      resultEl.className = "result show";
      resultEl.innerHTML = `
        <div class="fee-row">
          <span>商品金額:</span>
          <span>¥${amount.toLocaleString()}</span>
        </div>
        <div class="fee-row">
          <span>配送料金:</span>
          <span>${isFreeShipping ? '無料' : '¥' + shippingFee.toLocaleString()}</span>
        </div>
        ${isExpress ? '<div class="fee-row"><span>速達料金:</span><span>¥300</span></div>' : ''}
        <div class="fee-row" style="background: #2196F3; color: white;">
          <span class="total">合計:</span>
          <span class="total">¥${totalAmount.toLocaleString()}</span>
        </div>
        <p style="margin-top: 15px; color: #666;">
          ${isFreeShipping
            ? (amount >= 5000
              ? '✅ 5000円以上で送料無料'
              : '✅ プレミアム会員特典で送料無料')
            : '💡 あと' + (isPremium ? (3000 - amount) : (5000 - amount)) + '円で送料無料'}
        </p>
      `;
    }
  </script>
</body>
</html>
```
</details>

### 問題3: アクセス権限チェック

システムへのアクセス権限を判定するプログラムを作成してください。

**アクセス許可条件:**
- ログイン済み かつ (管理者 または 編集者) かつ (アカウント有効) かつ (凍結されていない)

**作成するもの:**
- ログイン状態のチェックボックス
- 管理者のチェックボックス
- 編集者のチェックボックス
- アカウント有効のチェックボックス
- アカウント凍結のチェックボックス
- チェックボタン
- 結果表示エリア

<details>
<summary>💡 ヒント1: 条件の整理</summary>

```javascript
const hasPermission = isLoggedIn;
const hasRole = isAdmin || isEditor;
const isAccountOK = isActive && !isSuspended;
```
</details>

<details>
<summary>💡 ヒント2: 最終判定</summary>

```javascript
if (hasPermission && hasRole && isAccountOK) {
  // アクセス許可
} else {
  // アクセス拒否
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
  <title>アクセス権限チェック</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background: #263238;
      color: white;
    }
    .container {
      background: #37474f;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
    h2 {
      text-align: center;
      color: #4CAF50;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 15px 0;
      padding: 12px;
      background: #455a64;
      border-radius: 5px;
    }
    button {
      width: 100%;
      padding: 14px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 20px;
    }
    button:hover {
      background: #45a049;
    }
    .result {
      margin-top: 20px;
      padding: 20px;
      border-radius: 5px;
      display: none;
    }
    .result.show {
      display: block;
    }
    .success {
      background: #4CAF50;
      color: white;
    }
    .error {
      background: #f44336;
      color: white;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🔐 アクセス権限チェック</h2>

    <div class="checkbox-group">
      <input type="checkbox" id="isLoggedIn">
      <label for="isLoggedIn">ログイン済み</label>
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="isAdmin">
      <label for="isAdmin">管理者</label>
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="isEditor">
      <label for="isEditor">編集者</label>
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="isActive">
      <label for="isActive">アカウント有効</label>
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="isSuspended">
      <label for="isSuspended">アカウント凍結</label>
    </div>

    <button onclick="checkAccess()">権限をチェック</button>

    <div id="result" class="result"></div>
  </div>

  <script>
    function checkAccess() {
      const isLoggedIn = document.getElementById("isLoggedIn").checked;
      const isAdmin = document.getElementById("isAdmin").checked;
      const isEditor = document.getElementById("isEditor").checked;
      const isActive = document.getElementById("isActive").checked;
      const isSuspended = document.getElementById("isSuspended").checked;
      const resultEl = document.getElementById("result");

      // 中間変数で条件を整理
      const hasPermission = isLoggedIn;
      const hasRole = isAdmin || isEditor;
      const isAccountOK = isActive && !isSuspended;

      // 最終判定
      if (hasPermission && hasRole && isAccountOK) {
        resultEl.className = "result success show";
        resultEl.innerHTML = `
          <h3>✅ アクセス許可</h3>
          <p><strong>権限:</strong> ${isAdmin ? '管理者' : '編集者'}</p>
          <p>システムへのアクセスが許可されました。</p>
        `;
      } else {
        let reasons = [];

        if (!hasPermission) {
          reasons.push("ログインしていません");
        }
        if (!hasRole) {
          reasons.push("管理者または編集者の権限が必要です");
        }
        if (!isAccountOK) {
          if (!isActive) {
            reasons.push("アカウントが無効です");
          }
          if (isSuspended) {
            reasons.push("アカウントが凍結されています");
          }
        }

        resultEl.className = "result error show";
        resultEl.innerHTML = `
          <h3>❌ アクセス拒否</h3>
          <p><strong>理由:</strong></p>
          <ul>
            ${reasons.map(r => `<li>${r}</li>`).join('')}
          </ul>
        `;
      }
    }
  </script>
</body>
</html>
```
</details>

---

## デバッグのヒント

複雑な条件がうまく動かない場合は、以下を試しましょう。

### 1. 条件を分解してログ出力する

```javascript
console.log("age >= 18:", age >= 18);
console.log("hasTicket:", hasTicket);
console.log("age >= 18 && hasTicket:", age >= 18 && hasTicket);
console.log("isVIP:", isVIP);
console.log("final:", (age >= 18 && hasTicket) || isVIP);
```

### 2. 真偽値テーブルを作る

すべての組み合わせをテストします。

| 条件A | 条件B | A && B | A \|\| B |
|-------|-------|--------|----------|
| true  | true  | true   | true     |
| true  | false | false  | true     |
| false | true  | false  | true     |
| false | false | false  | false    |

### 3. 段階的にテストする

```javascript
// ステップ1: シンプルな条件から
if (age >= 18) {
  console.log("✅ 18歳以上");
}

// ステップ2: ANDを追加
if (age >= 18 && hasTicket) {
  console.log("✅ 18歳以上でチケットあり");
}

// ステップ3: ORを追加
if ((age >= 18 && hasTicket) || isVIP) {
  console.log("✅ 最終条件クリア");
}
```

### 4. 中間変数を使ってデバッグ

```javascript
const condition1 = age >= 18;
const condition2 = hasTicket;
const condition3 = condition1 && condition2;
const condition4 = isVIP;
const final = condition3 || condition4;

console.log("condition1 (age >= 18):", condition1);
console.log("condition2 (hasTicket):", condition2);
console.log("condition3 (1 && 2):", condition3);
console.log("condition4 (isVIP):", condition4);
console.log("final (3 || 4):", final);
```

### 5. コメントアウトで原因を特定

```javascript
// どこで失敗しているか特定する
if (
  isLoggedIn &&
  // (isAdmin || isModerator) &&  // ← コメントアウトして確認
  !isBanned
) {
  console.log("OK");
}
```

---

## チェックリスト

このレッスンの内容を理解できたか、以下でチェックしましょう。

- [ ] 論理演算子の優先順位（`!` → `&&` → `||`）を理解している
- [ ] 括弧を使って評価順序を制御できる
- [ ] 短絡評価とは何かを説明できる
- [ ] 短絡評価を使ってエラーを防ぐ方法を知っている
- [ ] `&&` の短絡評価（左側が false なら右側を評価しない）を理解している
- [ ] `||` の短絡評価（左側が true なら右側を評価しない）を理解している
- [ ] 複雑な条件を中間変数で整理できる
- [ ] `(A && B) || C` のような複合条件を正しく評価できる
- [ ] 条件式を読みやすく書く技術（改行、中間変数、コメント）を使える
- [ ] 条件が意図通りに動かないときのデバッグ方法を知っている

---

## ポイント

### 1. 優先順位を覚える

```
! (NOT) → && (AND) → || (OR)
```

数式の「括弧 → × → +」と同じ構造です。

### 2. 括弧を積極的に使う

```javascript
// ❌ 読みにくい
if (a || b && c) { }

// ✅ 読みやすい
if (a || (b && c)) { }

// ✅ さらに読みやすい
if ((a) || (b && c)) { }
```

### 3. 短絡評価でエラーを防ぐ

```javascript
// ✅ null チェックを先に
if (user !== null && user.age >= 18) { }

// ❌ エラーになる
if (user.age >= 18 && user !== null) { }
```

### 4. 中間変数で可読性を向上

```javascript
// ✅ わかりやすい
const isEligible = (age >= 18 && hasTicket) || isVIP;
if (isEligible && !isBanned) { }
```

### 5. デフォルト値の設定に短絡評価を活用

```javascript
let displayName = userName || "ゲスト";
```

### 6. 複雑な条件は分解してデバッグ

```javascript
console.log("condition1:", condition1);
console.log("condition2:", condition2);
console.log("final:", condition1 && condition2);
```

### 7. 二重否定を避ける

```javascript
// ❌ 読みにくい
if (!isNotValid) { }

// ✅ 読みやすい
if (isValid) { }
```

### 8. 早期リターンでネストを減らす

```javascript
// ✅ 読みやすい
if (isBanned) return false;
if (isVIP) return true;
if (age >= 18 && hasTicket) return true;
return false;
```

---

## できるようになったこと

このレッスンを終えて、以下ができるようになりました：

1. **論理演算子の優先順位を理解**し、正しく評価できる
2. **括弧を使って**評価順序を制御できる
3. **短絡評価の仕組み**を理解し、エラー防止に活用できる
4. **複雑な条件式**を正しく書ける
5. **中間変数を使って**可読性の高いコードを書ける
6. **実践的なアプリケーション**（ログインフォーム、予約システムなど）で複合条件を実装できる
7. **デバッグの技術**を使って条件の問題を特定できる
8. **読みやすいコード**を書くための技術（改行、コメント、早期リターン）を使える

---

## まとめ

### 優先順位

```
! (NOT) → && (AND) → || (OR)
```

- **括弧を使って明示的に**するのがベストプラクティス

### 短絡評価

- **`&&`**：左側が `false` なら右側を評価しない
- **`||`**：左側が `true` なら右側を評価しない
- **エラー防止**に活用できる（null チェックなど）

### 可読性の向上

1. **改行して整理**する
2. **中間変数**を使う
3. **コメント**を追加する
4. **早期リターン**でネストを減らす

### デバッグ

1. 条件を**分解してログ出力**
2. **真偽値テーブル**を作る
3. **段階的にテスト**する
4. **コメントアウト**で原因を特定

### 実践での使い方

複雑な条件式は、**実際のアプリケーション開発で頻繁に登場**します。

- ログインフォームのバリデーション
- アクセス権限の判定
- 割引やポイントの計算
- 予約システムの条件チェック

これらを**正しく実装**できることは、プロフェッショナルなエンジニアの必須スキルです。

---

## 次のステップ

次のレッスンでは、**範囲判定**について学びます。

```javascript
// 範囲内かどうかを判定する
if (10 <= age && age <= 20) {
  console.log("10代");
}

// 時間帯の判定
if (9 <= hour && hour < 18) {
  console.log("営業時間内");
}
```

範囲判定は、年齢制限、営業時間、価格帯など、実際のアプリケーションで非常によく使われるパターンです。

[レッスン51: 範囲判定](lesson-051.md) に進みましょう！
