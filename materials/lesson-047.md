# レッスン47: 複雑な条件

## このレッスンで学ぶこと

これまでにAND(&&)、OR(||)、NOT(!)の3つの論理演算子を学びました。今回は、これらを組み合わせて複雑な条件式を作成する方法を学びます。括弧を使った優先順位の制御も理解します。

## 複数の演算子を組み合わせる

実際のプログラムでは、複数の条件を組み合わせることがよくあります。

### 例1: 基本的な組み合わせ

```javascript
let age = 25;
let hasTicket = true;
let isBanned = false;

// 18歳以上で、チケットを持っていて、出禁でない
if (age >= 18 && hasTicket && !isBanned) {
  console.log("入場できます");
}
```

この条件は、3つすべてが真の時に全体が真になります。

### 例2: ANDとORの組み合わせ

```javascript
let age = 15;
let isStudent = true;
let isSenior = false;

// 学生または65歳以上の場合
if (isStudent || age >= 65) {
  console.log("割引対象です");
}
```

## 演算子の優先順位

複数の演算子を使う時、優先順位を理解することが重要です。

### 優先順位の順序

1. `!` (NOT) - 最優先
2. `&&` (AND)
3. `||` (OR) - 最後

```javascript
let a = true;
let b = false;
let c = true;

// !が最優先で評価される
console.log(!a && b || c);  // false && false || true → true

// 括弧なしの評価順序:
// 1. !a → false
// 2. false && b → false
// 3. false || c → true
```

## 括弧を使った優先順位の制御

括弧を使うと、評価の順序を明示的に指定できます。

### 例1: 括弧なし

```javascript
let age = 25;
let isWeekend = true;
let hasTicket = false;

// これはどう評価される?
if (age >= 18 && isWeekend || hasTicket) {
  console.log("OK");
}

// 評価順序:
// 1. age >= 18 && isWeekend → true
// 2. true || hasTicket → true
```

### 例2: 括弧あり

```javascript
let age = 25;
let isWeekend = true;
let hasTicket = false;

// 明示的に順序を指定
if (age >= 18 && (isWeekend || hasTicket)) {
  console.log("OK");
}

// 評価順序:
// 1. (isWeekend || hasTicket) → true
// 2. age >= 18 && true → true
```

括弧を使うと、意図がはっきりします。

## 複雑な条件の例

### 例1: 入場条件

```javascript
function checkEntry() {
  const age = 20;
  const hasTicket = true;
  const isVIP = false;
  const isBanned = false;

  // (チケットを持っている または VIP) かつ (18歳以上 かつ 出禁でない)
  if ((hasTicket || isVIP) && (age >= 18 && !isBanned)) {
    console.log("入場できます");
  } else {
    console.log("入場できません");
  }
}
```

### 例2: 割引判定

```javascript
function checkDiscount() {
  const age = 70;
  const isStudent = false;
  const isMember = true;

  // (学生 または 65歳以上) または 会員
  if ((isStudent || age >= 65) || isMember) {
    console.log("割引が適用されます");
  } else {
    console.log("通常料金です");
  }
}
```

### 例3: アクセス権限

```javascript
function checkAccess() {
  const isAdmin = false;
  const isModerator = true;
  const isOwner = false;
  const isLoggedIn = true;

  // ログインしていて、かつ (管理者 または モデレーター または 所有者)
  if (isLoggedIn && (isAdmin || isModerator || isOwner)) {
    console.log("アクセス許可");
  } else {
    console.log("アクセス拒否");
  }
}
```

## ド・モルガンの法則

NOTを使った条件式は、ド・モルガンの法則で書き換えられます。

### 法則1: NOT (A AND B) = (NOT A) OR (NOT B)

```javascript
let isWeekend = false;
let isHoliday = false;

// これら2つは同じ意味
if (!(isWeekend || isHoliday)) {
  console.log("平日です");
}

if (!isWeekend && !isHoliday) {
  console.log("平日です");
}
```

### 法則2: NOT (A OR B) = (NOT A) AND (NOT B)

```javascript
let hasTicket = false;
let isVIP = false;

// これら2つは同じ意味
if (!(hasTicket || isVIP)) {
  console.log("入場できません");
}

if (!hasTicket && !isVIP) {
  console.log("入場できません");
}
```

## 実践問題

以下の要件を満たすプログラムを作成してください。

### 問題: イベント参加資格チェック

イベントに参加できるかを判定するプログラムを作成してください。

**参加条件:**
- 以下のいずれかを満たす必要があります:
  1. (18歳以上 かつ チケットを持っている)
  2. または VIP会員である

**HTMLの構成:**
- id="age" の input要素(年齢入力用)
- id="hasTicket" の input要素(type="checkbox"、チケットの有無)
- id="isVIP" の input要素(type="checkbox"、VIP会員か)
- id="result" の要素(結果表示用)
- id="error" の要素(エラーメッセージ表示用)

**動作:**
1. 年齢が数値かチェック
2. (age >= 18 && hasTicket) || isVIP を判定
3. 参加できる場合: "参加できます"
4. 参加できない場合: "参加できません"

## 複雑な条件を書く時のポイント

### 1. 括弧で明示する

```javascript
// 読みにくい
if (age >= 18 && hasTicket || isVIP) {
  console.log("OK");
}

// 読みやすい
if ((age >= 18 && hasTicket) || isVIP) {
  console.log("OK");
}
```

### 2. 改行して整理する

```javascript
if (
  (age >= 18 && hasTicket) ||
  isVIP
) {
  console.log("OK");
}
```

### 3. 条件を変数に分ける

複雑な条件は、変数に分けると読みやすくなります。

```javascript
// 複雑
if ((age >= 18 && hasTicket && !isBanned) || (isVIP && !isBanned)) {
  console.log("OK");
}

// わかりやすい
const isRegularMember = age >= 18 && hasTicket && !isBanned;
const isValidVIP = isVIP && !isBanned;

if (isRegularMember || isValidVIP) {
  console.log("OK");
}
```

### 4. 早期リターンを使う

ネストが深くなる場合は、早期リターンを使いましょう。

```javascript
function checkEntry() {
  const age = 25;
  const hasTicket = true;
  const isBanned = false;

  // 出禁チェックを最初に
  if (isBanned) {
    console.log("入場できません");
    return;
  }

  // その後、通常の条件チェック
  if (age >= 18 && hasTicket) {
    console.log("入場できます");
  } else {
    console.log("入場できません");
  }
}
```

## 真偽値テーブルで確認

複雑な条件は、表で確認すると理解しやすくなります。

### 例: (A && B) || C

| A | B | C | A && B | (A && B) \|\| C |
|---|---|---|--------|----------------|
| T | T | T | T | T |
| T | T | F | T | T |
| T | F | T | F | T |
| T | F | F | F | F |
| F | T | T | F | T |
| F | T | F | F | F |
| F | F | T | F | T |
| F | F | F | F | F |

## よくある間違い

### 間違い1: 括弧の付け忘れ

```javascript
// 意図: (18歳以上 または VIP) かつ チケットあり
// 間違い
if (age >= 18 || isVIP && hasTicket) {
  console.log("OK");
}

// 正しい
if ((age >= 18 || isVIP) && hasTicket) {
  console.log("OK");
}
```

### 間違い2: NOTの範囲

```javascript
let hasTicket = false;
let isVIP = false;

// 意図: チケットもVIPもない
// 間違い
if (!hasTicket || isVIP) {  // チケットがない または VIP
  console.log("NG");
}

// 正しい
if (!hasTicket && !isVIP) {  // チケットもVIPもない
  console.log("NG");
}

// または
if (!(hasTicket || isVIP)) {
  console.log("NG");
}
```

## まとめ

- 複数の論理演算子を組み合わせて複雑な条件を作れます
- 優先順位: `!` → `&&` → `||`
- 括弧を使って優先順位を明示しましょう
- 複雑な条件は変数に分けると読みやすくなります
- ド・モルガンの法則で条件式を書き換えられます
- 早期リターンでネストを浅くできます

次のレッスンでは、条件式を簡潔に書ける三項演算子を学びます。
