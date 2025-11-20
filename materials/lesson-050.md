# レッスン50: 組み合わせ条件

## このレッスンで学ぶこと

これまで学んだAND(&&)、OR(||)、NOT(!)を組み合わせた複雑な条件式について、さらに深く学びます。特に、優先順位や短絡評価といった重要な概念を理解します。

## 優先順位の復習

論理演算子には評価される順番があります。

### 優先順位の順序

1. **`!` (NOT)** - 最優先
2. **`&&` (AND)** - 2番目
3. **`||` (OR)** - 最後

```javascript
let a = true;
let b = false;
let c = true;

// 優先順位に従って評価される
let result = a || b && c;

// 評価の流れ:
// 1. b && c が先に評価される → false
// 2. a || false が評価される → true

console.log(result);  // true
```

## 括弧で優先順位を制御する

括弧を使うと、評価の順序を明示的に指定できます。

### 例1: 括弧なし

```javascript
let age = 25;
let isStudent = false;
let hasCoupon = true;

// AND が先に評価される
if (age < 18 || isStudent && hasCoupon) {
  console.log("割引適用");
}

// 評価順序:
// 1. isStudent && hasCoupon → false
// 2. age < 18 || false → false
// 結果: 実行されない
```

### 例2: 括弧あり

```javascript
let age = 25;
let isStudent = false;
let hasCoupon = true;

// 括弧で順序を変更
if ((age < 18 || isStudent) && hasCoupon) {
  console.log("割引適用");
}

// 評価順序:
// 1. (age < 18 || isStudent) → false
// 2. false && hasCoupon → false
// 結果: 実行されない
```

## 短絡評価とは

論理演算子は、結果が確定した時点で評価を停止します。これを**短絡評価**と呼びます。

### AND演算子の短絡評価

ANDは、左側が偽なら右側を評価しません。

```javascript
let age = 15;
let hasLicense = true;

// age >= 18 が false なので、hasLicense はチェックされない
if (age >= 18 && hasLicense) {
  console.log("運転できます");
}
```

これは、エラーを防ぐために利用できます:

```javascript
let name = "";

// name が空でない場合だけ、length をチェック
if (name !== "" && name.length >= 3) {
  console.log("OK");
}

// もし && がなければ、name.length でエラーになる可能性がある
```

### OR演算子の短絡評価

ORは、左側が真なら右側を評価しません。

```javascript
let isVIP = true;
let hasTicket = false;

// isVIP が true なので、hasTicket はチェックされない
if (isVIP || hasTicket) {
  console.log("入場できます");
}
```

デフォルト値の設定に利用できます:

```javascript
let userName = "";
let displayName = userName || "ゲスト";

console.log(displayName);  // "ゲスト"

// userName が空文字(falsy)なので、"ゲスト" が使われる
```

## 複雑な条件の例

### 例1: イベント参加条件

```javascript
function checkEventEntry() {
  const age = 20;
  const hasTicket = true;
  const isMember = false;
  const isVIP = false;

  // (18歳以上でチケットあり) または (会員 または VIP)
  if ((age >= 18 && hasTicket) || (isMember || isVIP)) {
    console.log("参加できます");
  } else {
    console.log("参加できません");
  }
}
```

### 例2: 割引判定

```javascript
function checkDiscount() {
  const age = 70;
  const isStudent = false;
  const isPremiumMember = true;
  const purchaseAmount = 5000;

  // (学生 または 65歳以上) または (プレミアム会員で5000円以上購入)
  if ((isStudent || age >= 65) || (isPremiumMember && purchaseAmount >= 5000)) {
    console.log("20%割引が適用されます");
  } else {
    console.log("通常価格です");
  }
}
```

### 例3: アクセス制御

```javascript
function checkAccess() {
  const isLoggedIn = true;
  const isAdmin = false;
  const isModerator = true;
  const isOwner = false;
  const isBanned = false;

  // ログイン済みで、(管理者 または モデレーター または 所有者) で、出禁でない
  if (isLoggedIn && (isAdmin || isModerator || isOwner) && !isBanned) {
    console.log("アクセス許可");
  } else {
    console.log("アクセス拒否");
  }
}
```

## 実践問題

以下の要件を満たすプログラムを作成してください。

### 問題: レストラン予約チェック

レストランの予約ができるかを判定するプログラムを作成してください。

**予約条件:**
- (平日 または 会員) かつ (人数が4人以下)

**HTMLの構成:**
- id="isWeekday" のチェックボックス(平日か)
- id="isMember" のチェックボックス(会員か)
- id="partySize" のinput要素(人数入力)
- id="result" の結果表示エリア
- id="error" のエラー表示エリア

**動作:**
1. 人数が数値かチェック
2. (isWeekday || isMember) && partySize <= 4 を判定
3. 予約できる場合: "予約できます"
4. 予約できない場合: "予約できません"

## 条件式の読みやすさ

### 1. 改行して整理する

```javascript
// 読みにくい
if ((age >= 18 && hasTicket) || (isMember || isVIP) && !isBanned) {
  console.log("OK");
}

// 読みやすい
if (
  (age >= 18 && hasTicket) ||
  (isMember || isVIP) &&
  !isBanned
) {
  console.log("OK");
}
```

### 2. 中間変数を使う

複雑な条件は、中間変数に分けると読みやすくなります。

```javascript
// 複雑
if ((age >= 18 && hasTicket && !isBanned) || (isVIP && !isBanned)) {
  console.log("OK");
}

// わかりやすい
const isRegularEntry = age >= 18 && hasTicket && !isBanned;
const isVIPEntry = isVIP && !isBanned;

if (isRegularEntry || isVIPEntry) {
  console.log("OK");
}
```

### 3. コメントを追加する

```javascript
// 一般入場: 18歳以上でチケットあり、出禁でない
const isRegularEntry = age >= 18 && hasTicket && !isBanned;

// VIP入場: VIPで出禁でない
const isVIPEntry = isVIP && !isBanned;

if (isRegularEntry || isVIPEntry) {
  console.log("入場できます");
}
```

## よくある間違い

### 間違い1: 優先順位の勘違い

```javascript
let age = 25;
let isStudent = false;
let hasCoupon = true;

// 間違い: 意図と異なる評価になる
if (age < 18 || isStudent && hasCoupon) {
  // (age < 18) || (isStudent && hasCoupon)
  // と評価される
}

// 正しい: 括弧で明示する
if ((age < 18 || isStudent) && hasCoupon) {
  // 意図した通りに評価される
}
```

### 間違い2: 短絡評価を考慮しない

```javascript
let name = null;

// 危険: name が null の場合、エラーになる
if (name.length > 0 && name !== "") {
  console.log("OK");
}

// 安全: 先に null チェック
if (name !== null && name.length > 0) {
  console.log("OK");
}
```

### 間違い3: 二重否定の乱用

```javascript
let isNotInvalid = true;

// 読みにくい
if (!isNotInvalid) {
  console.log("無効です");
}

// 読みやすい
let isValid = true;

if (!isValid) {
  console.log("無効です");
}
```

## デバッグのヒント

複雑な条件がうまく動かない場合は、以下を試しましょう:

### 1. 条件を分解する

```javascript
console.log("age >= 18:", age >= 18);
console.log("hasTicket:", hasTicket);
console.log("age >= 18 && hasTicket:", age >= 18 && hasTicket);
console.log("isVIP:", isVIP);
console.log("final:", (age >= 18 && hasTicket) || isVIP);
```

### 2. 真偽値テーブルを作る

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
  console.log("18歳以上");
}

// ステップ2: ANDを追加
if (age >= 18 && hasTicket) {
  console.log("18歳以上でチケットあり");
}

// ステップ3: ORを追加
if ((age >= 18 && hasTicket) || isVIP) {
  console.log("最終条件");
}
```

## まとめ

- 論理演算子の優先順位: `!` → `&&` → `||`
- 括弧を使って評価順序を明示しましょう
- 短絡評価を理解すると、エラーを防げます
- 複雑な条件は中間変数に分けると読みやすくなります
- デバッグ時は条件を分解して確認しましょう

次のレッスンでは、範囲判定について学びます。
