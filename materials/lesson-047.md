# レッスン47: 複雑な条件

## なぜ重要なのか

実際のWebサービスやアプリケーションでは、単純な条件だけでは不十分で、複数の条件を組み合わせた複雑な判定が必要になります。

### 実例1: ECサイトの送料無料判定（Amazon風）

```
(購入金額が2,000円以上) または (プライム会員である)
→ 送料無料
```

両方の条件を適切に組み合わせて判定する必要があります。

### 実例2: 動画配信サービスの視聴制限（Netflix風）

```
(年齢が適切) かつ ((有料会員) または (無料トライアル期間中))
→ 視聴可能
```

複数の条件を組み合わせて、視聴権限を判定します。

### 実例3: SNSの投稿権限（Twitter風）

```
(ログイン済み) かつ (凍結されていない) かつ ((認証済み) または (新規投稿数が10未満))
→ 投稿可能
```

複数の条件を適切に組み合わせることで、スパム対策と利用制限を実現します。

### 実例4: オンライン予約システム（ホテル予約風）

```
((平日) または (割引クーポンあり)) かつ (空室あり) かつ (ブラックリストでない)
→ 予約可能
```

ビジネスルールを正確に実装するため、複雑な条件を扱います。

### 実例5: ゲームのアチーブメント解除（ゲームアプリ風）

```
((レベルが20以上) かつ (ボスを倒した)) または (隠しアイテムを取得)
→ アチーブメント解除
```

複数の達成条件を組み合わせて、ゲームの進行を管理します。

---

## 基本概念の説明

### 複雑な条件とは

これまで学んだ `&&`（AND）、`||`（OR）、`!`（NOT）を組み合わせて、より複雑な判定を行う条件式のことです。

### 演算子の優先順位

数学の演算子と同じように、論理演算子にも優先順位があります:

```
優先順位（高い → 低い）:
1. !  (NOT)  - 最優先
2. &&  (AND)  - 中間
3. ||  (OR)   - 最後
```

### 優先順位の例

```javascript
let result = !false && true || false;

// 評価順序:
// 1. !false        → true  (NOTが最優先)
// 2. true && true  → true  (ANDが次)
// 3. true || false → true  (ORが最後)
```

### 括弧による優先順位の制御

括弧 `()` を使うと、評価順序を明示的に制御できます:

```javascript
// 括弧なし（優先順位に従う）
age >= 18 && hasTicket || isVIP
// → (age >= 18 && hasTicket) || isVIP

// 括弧あり（意図を明示）
age >= 18 && (hasTicket || isVIP)
// → 18歳以上で、チケットかVIPのどちらか
```

### 真偽値テーブルで理解する

#### パターン1: (A && B) || C

```
┌───┬───┬───┬─────────┬───────────────┐
│ A │ B │ C │ A && B  │ (A && B) || C │
├───┼───┼───┼─────────┼───────────────┤
│ T │ T │ T │    T    │       T       │
│ T │ T │ F │    T    │       T       │
│ T │ F │ T │    F    │       T       │
│ T │ F │ F │    F    │       F       │
│ F │ T │ T │    F    │       T       │
│ F │ T │ F │    F    │       F       │
│ F │ F │ T │    F    │       T       │
│ F │ F │ F │    F    │       F       │
└───┴───┴───┴─────────┴───────────────┘

ポイント:
- AとBが両方真、またはCが真なら結果は真
- 8通りのうち5通りで真になる
```

#### パターン2: A && (B || C)

```
┌───┬───┬───┬─────────┬───────────────┐
│ A │ B │ C │ B || C  │ A && (B || C) │
├───┼───┼───┼─────────┼───────────────┤
│ T │ T │ T │    T    │       T       │
│ T │ T │ F │    T    │       T       │
│ T │ F │ T │    T    │       T       │
│ T │ F │ F │    F    │       F       │
│ F │ T │ T │    T    │       F       │
│ F │ T │ F │    T    │       F       │
│ F │ F │ T │    T    │       F       │
│ F │ F │ F │    F    │       F       │
└───┴───┴───┴─────────┴───────────────┘

ポイント:
- Aが真で、かつBまたはCが真なら結果は真
- 8通りのうち3通りで真になる
```

### 括弧の有無による違い

```javascript
// パターン1: (A && B) || C
// 「AかつB」または「C」
if ((age >= 18 && hasTicket) || isVIP) {
  // 18歳以上でチケットあり、またはVIP
}

// パターン2: A && (B || C)
// 「A」かつ「BまたはC」
if (age >= 18 && (hasTicket || isVIP)) {
  // 18歳以上で、チケットかVIPのどちらか
}
```

---

## 動作の流れ

### 例1: (A && B) || C の評価フロー

```
条件: (age >= 18 && hasTicket) || isVIP
値: age=20, hasTicket=false, isVIP=true

評価の流れ:
┌─────────────────────────────┐
│  (age >= 18 && hasTicket)   │
│         ↓                   │
│    (20 >= 18 && false)      │
│         ↓                   │
│    (true && false)          │
│         ↓                   │
│        false                │ ← 左側の結果
└─────────────────────────────┘
           ↓
┌─────────────────────────────┐
│     false || isVIP          │
│         ↓                   │
│     false || true           │
│         ↓                   │
│        true                 │ ← 最終結果
└─────────────────────────────┘

結果: true（VIPなので条件を満たす）
```

### 例2: A && (B || C) の評価フロー

```
条件: age >= 18 && (hasTicket || isVIP)
値: age=16, hasTicket=false, isVIP=true

評価の流れ:
┌─────────────────────────────┐
│    (hasTicket || isVIP)     │
│         ↓                   │
│    (false || true)          │
│         ↓                   │
│        true                 │ ← 右側の結果
└─────────────────────────────┘
           ↓
┌─────────────────────────────┐
│   age >= 18 && true         │
│         ↓                   │
│   16 >= 18 && true          │
│         ↓                   │
│   false && true             │
│         ↓                   │
│        false                │ ← 最終結果
└─────────────────────────────┘

結果: false（18歳未満なので条件を満たさない）
```

### 例3: 複雑な条件の評価フロー

```
条件: (A && B) || (C && D)
値: A=true, B=false, C=true, D=true

評価の流れ:
      ┌──────────────┐
      │  (A && B)    │
      │      ↓       │
      │ (true && false)
      │      ↓       │
      │    false     │
      └──────┬───────┘
             │
      ┌──────┴───────┐
      │  (C && D)    │
      │      ↓       │
      │ (true && true)
      │      ↓       │
      │    true      │
      └──────┬───────┘
             │
      ┌──────┴───────┐
      │ false || true│
      │      ↓       │
      │    true      │ ← 最終結果
      └──────────────┘
```

---

## 詳細解説

### 1. 演算子の優先順位を理解する

#### 優先順位の基本

```javascript
// 優先順位: ! > && > ||

let result = !false && true || false;

// 評価ステップ:
// ステップ1: !false → true (NOTが最優先)
// ステップ2: true && true → true (ANDが次)
// ステップ3: true || false → true (ORが最後)

console.log(result); // true
```

#### 優先順位の実例

```javascript
let age = 25;
let hasTicket = false;
let isVIP = true;

// 括弧なし（優先順位に従う）
if (age >= 18 && hasTicket || isVIP) {
  console.log("入場できます");
}

// これは以下と同じ意味:
if ((age >= 18 && hasTicket) || isVIP) {
  console.log("入場できます");
}
// → VIPなので「入場できます」と表示される
```

#### 優先順位の違いによる結果の変化

```javascript
let A = true;
let B = false;
let C = true;

// パターン1: 優先順位に従う（括弧なし）
console.log(A && B || C);  // true
// → (A && B) || C
// → (true && false) || true
// → false || true
// → true

// パターン2: 括弧で順序を変える
console.log(A && (B || C)); // true
// → A && (B || C)
// → true && (false || true)
// → true && true
// → true
```

この例では結果は同じですが、次の例では異なります:

```javascript
let A = false;
let B = false;
let C = true;

// パターン1
console.log(A && B || C);  // true
// → (A && B) || C
// → false || true
// → true

// パターン2
console.log(A && (B || C)); // false
// → A && (B || C)
// → false && true
// → false
```

### 2. 括弧を使った優先順位の制御

#### 括弧の基本的な使い方

```javascript
// ケース1: 括弧なし
let age = 20;
let hasTicket = false;
let isVIP = true;

if (age >= 18 && hasTicket || isVIP) {
  console.log("OK");  // 表示される
}
// 評価: ((age >= 18 && hasTicket) || isVIP)
// → (true && false) || true
// → false || true
// → true
```

```javascript
// ケース2: 括弧あり（意味が変わる）
if (age >= 18 && (hasTicket || isVIP)) {
  console.log("OK");  // 表示される
}
// 評価: (age >= 18 && (hasTicket || isVIP))
// → true && (false || true)
// → true && true
// → true
```

#### 括弧による意図の明示

```javascript
// 例: イベント参加条件

// 意図1: (18歳以上でチケットあり) または VIP
if ((age >= 18 && hasTicket) || isVIP) {
  console.log("参加できます");
}

// 意図2: 18歳以上で (チケットあり または VIP)
if (age >= 18 && (hasTicket || isVIP)) {
  console.log("参加できます");
}
```

#### 複数の括弧を使った複雑な条件

```javascript
let age = 25;
let hasTicket = true;
let isVIP = false;
let isBanned = false;

// (チケットあり または VIP) かつ (18歳以上 かつ 出禁でない)
if ((hasTicket || isVIP) && (age >= 18 && !isBanned)) {
  console.log("✅ 入場できます");
}

// 評価の流れ:
// 1. (hasTicket || isVIP) → (true || false) → true
// 2. (age >= 18 && !isBanned) → (true && true) → true
// 3. true && true → true
```

### 3. (A && B) || C パターンの活用

このパターンは「AとBの両方が満たされる」または「Cが満たされる」という条件です。

#### 実例1: ECサイトの送料無料条件

```javascript
let purchaseAmount = 1500;  // 購入金額
let isPrimeMember = false;   // プライム会員

// (2000円以上 かつ 通常配送) または プライム会員
if ((purchaseAmount >= 2000 && !isPrimeMember) || isPrimeMember) {
  console.log("送料無料");
} else {
  console.log("送料がかかります");
}
// → "送料がかかります"

// プライム会員の場合
isPrimeMember = true;
if ((purchaseAmount >= 2000 && !isPrimeMember) || isPrimeMember) {
  console.log("送料無料");
}
// → "送料無料"
```

#### 実例2: イベント参加資格

```javascript
let age = 16;
let hasParentalConsent = true;  // 保護者の同意
let isAdult = age >= 18;

// (18歳以上) または (18歳未満で保護者の同意あり)
if (isAdult || (!isAdult && hasParentalConsent)) {
  console.log("✅ イベントに参加できます");
}
// → "✅ イベントに参加できます"
```

#### 真偽値テーブルでの確認

```
条件: (A && B) || C

┌───┬───┬───┬─────────┬───────────────┐
│ A │ B │ C │ A && B  │ (A && B) || C │
├───┼───┼───┼─────────┼───────────────┤
│ T │ T │ T │    T    │       T       │ ← すべて満たす
│ T │ T │ F │    T    │       T       │ ← AとBを満たす
│ T │ F │ T │    F    │       T       │ ← Cを満たす
│ T │ F │ F │    F    │       F       │ ← Cがないと失敗
│ F │ T │ T │    F    │       T       │ ← Cを満たす
│ F │ T │ F │    F    │       F       │ ← Aが必要
│ F │ F │ T │    F    │       T       │ ← Cを満たす
│ F │ F │ F │    F    │       F       │ ← 何も満たさない
└───┴───┴───┴─────────┴───────────────┘

ポイント:
- 8パターン中、5パターンで true
- AとBの両方、またはCだけでも true
```

### 4. A && (B || C) パターンの活用

このパターンは「Aが満たされ、かつBまたはCのどちらかが満たされる」という条件です。

#### 実例1: アクセス権限チェック

```javascript
let isLoggedIn = true;
let isAdmin = false;
let isModerator = true;

// ログイン済み かつ (管理者 または モデレーター)
if (isLoggedIn && (isAdmin || isModerator)) {
  console.log("✅ 管理画面にアクセスできます");
}
// → "✅ 管理画面にアクセスできます"
```

#### 実例2: 割引適用条件

```javascript
let purchaseAmount = 3000;
let isStudent = false;
let isSenior = true;
let age = 70;

// 3000円以上購入 かつ (学生 または シニア)
if (purchaseAmount >= 3000 && (isStudent || isSenior)) {
  console.log("✅ 10%割引が適用されます");
}
// → "✅ 10%割引が適用されます"
```

#### 真偽値テーブルでの確認

```
条件: A && (B || C)

┌───┬───┬───┬─────────┬───────────────┐
│ A │ B │ C │ B || C  │ A && (B || C) │
├───┼───┼───┼─────────┼───────────────┤
│ T │ T │ T │    T    │       T       │ ← すべて満たす
│ T │ T │ F │    T    │       T       │ ← AとBを満たす
│ T │ F │ T │    T    │       T       │ ← AとCを満たす
│ T │ F │ F │    F    │       F       │ ← BかCが必要
│ F │ T │ T │    T    │       F       │ ← Aが必須
│ F │ T │ F │    T    │       F       │ ← Aが必須
│ F │ F │ T │    T    │       F       │ ← Aが必須
│ F │ F │ F │    F    │       F       │ ← Aが必須
└───┴───┴───┴─────────┴───────────────┘

ポイント:
- 8パターン中、3パターンで true
- Aは必須、BまたはCのどちらか
```

### 5. 複数条件の組み合わせ

#### 3つの条件を組み合わせる

```javascript
let age = 25;
let hasTicket = true;
let isBanned = false;

// すべての条件をANDで結合
if (age >= 18 && hasTicket && !isBanned) {
  console.log("✅ 入場できます");
}

// 評価の流れ:
// 1. age >= 18 → true
// 2. true && hasTicket → true && true → true
// 3. true && !isBanned → true && true → true
```

#### 複雑な組み合わせ

```javascript
let age = 20;
let hasTicket = false;
let isVIP = true;
let isBanned = false;

// (チケット または VIP) かつ (18歳以上 かつ 出禁でない)
if ((hasTicket || isVIP) && (age >= 18 && !isBanned)) {
  console.log("✅ 入場できます");
}

// 評価の流れ:
// 1. (hasTicket || isVIP) → (false || true) → true
// 2. (age >= 18 && !isBanned) → (true && true) → true
// 3. true && true → true
```

### 6. ド・モルガンの法則を使った書き換え

ド・モルガンの法則を使うと、複雑な条件を読みやすく書き換えられます。

#### 法則1: !(A || B) = !A && !B

```javascript
let isWeekend = false;
let isHoliday = false;

// パターン1: 全体を否定
if (!(isWeekend || isHoliday)) {
  console.log("平日です");
}

// パターン2: 個別に否定（同じ意味）
if (!isWeekend && !isHoliday) {
  console.log("平日です");
}
```

#### 法則2: !(A && B) = !A || !B

```javascript
let hasTicket = false;
let isVIP = false;

// パターン1: 全体を否定
if (!(hasTicket && isVIP)) {
  console.log("特別席には座れません");
}

// パターン2: 個別に否定（同じ意味）
if (!hasTicket || !isVIP) {
  console.log("特別席には座れません");
}
```

#### 実用例: エラーチェック

```javascript
let username = "";
let password = "";

// パターン1: 直接的な表現
if (!(username && password)) {
  console.log("❌ ユーザー名とパスワードを入力してください");
}

// パターン2: ド・モルガンの法則（より読みやすい）
if (!username || !password) {
  console.log("❌ ユーザー名とパスワードを入力してください");
}
```

### 7. 条件を変数に分けて読みやすくする

複雑な条件式は、意味のある名前の変数に分けると読みやすくなります。

#### 改善前: 複雑な条件式

```javascript
if ((age >= 18 && hasTicket && !isBanned) || (isVIP && !isBanned)) {
  console.log("入場できます");
}
```

#### 改善後: 変数に分ける

```javascript
// 条件を意味のある名前で定義
const isRegularCustomer = age >= 18 && hasTicket && !isBanned;
const isValidVIP = isVIP && !isBanned;

// 読みやすい条件式
if (isRegularCustomer || isValidVIP) {
  console.log("✅ 入場できます");
}
```

#### より複雑な例

```javascript
// 改善前
if (
  (age >= 18 && hasDriverLicense && !isSuspended) ||
  (age >= 16 && hasLearnerPermit && hasInstructor)
) {
  console.log("運転できます");
}

// 改善後
const isLicensedDriver = age >= 18 && hasDriverLicense && !isSuspended;
const isLearnerDriver = age >= 16 && hasLearnerPermit && hasInstructor;

if (isLicensedDriver || isLearnerDriver) {
  console.log("✅ 運転できます");
}
```

### 8. 早期リターンでネストを減らす

複雑な条件が増えると、ネストが深くなります。早期リターン（early return）を使うとシンプルになります。

#### 改善前: ネストが深い

```javascript
function checkEntry(age, hasTicket, isBanned) {
  if (!isBanned) {
    if (age >= 18) {
      if (hasTicket) {
        return "✅ 入場できます";
      } else {
        return "❌ チケットが必要です";
      }
    } else {
      return "❌ 18歳以上が必要です";
    }
  } else {
    return "❌ 入場できません（出禁）";
  }
}
```

#### 改善後: 早期リターン

```javascript
function checkEntry(age, hasTicket, isBanned) {
  // 除外条件を最初にチェック
  if (isBanned) {
    return "❌ 入場できません（出禁）";
  }

  if (age < 18) {
    return "❌ 18歳以上が必要です";
  }

  if (!hasTicket) {
    return "❌ チケットが必要です";
  }

  return "✅ 入場できます";
}
```

---

## よくある間違い

### 間違い1: 括弧の付け忘れ

```javascript
let age = 20;
let isVIP = false;
let hasTicket = true;

// ❌ 間違い: 括弧がないと意図と異なる結果に
if (age >= 18 || isVIP && hasTicket) {
  console.log("OK");
}
// これは以下と同じ:
// age >= 18 || (isVIP && hasTicket)
// → 20 >= 18 || (false && true)
// → true || false
// → true

// ✅ 正しい: 意図を明示する
if ((age >= 18 || isVIP) && hasTicket) {
  console.log("OK");
}
// → (true || false) && true
// → true && true
// → true
```

**具体例で確認:**

```javascript
// 意図: (18歳以上 または VIP) かつ チケットあり
let age = 16;
let isVIP = false;
let hasTicket = true;

// ❌ 間違い
if (age >= 18 || isVIP && hasTicket) {
  console.log("入場できます");  // 表示されてしまう！
}
// → 16 >= 18 || (false && true)
// → false || false
// → false（表示されない）

// ✅ 正しい
if ((age >= 18 || isVIP) && hasTicket) {
  console.log("入場できます");  // 表示されない
}
// → (false || false) && true
// → false && true
// → false
```

### 間違い2: NOTの適用範囲を間違える

```javascript
let hasTicket = false;
let isVIP = false;

// ❌ 間違い: NOTが最初の条件にしか適用されない
if (!hasTicket || isVIP) {
  console.log("NG");  // 意図と異なる
}
// → (!hasTicket) || isVIP
// → true || false
// → true（チケットがないだけで真になる）

// ✅ 正しい: 両方に適用する（パターン1）
if (!hasTicket && !isVIP) {
  console.log("NG");
}
// → !false && !false
// → true && true
// → true

// ✅ 正しい: 全体を否定する（パターン2）
if (!(hasTicket || isVIP)) {
  console.log("NG");
}
// → !(false || false)
// → !false
// → true
```

### 間違い3: 演算子の優先順位を理解していない

```javascript
let A = true;
let B = false;
let C = true;

// 意図: A かつ (B または C)
// ❌ 間違い: 括弧を省略
if (A && B || C) {
  console.log("OK");
}
// これは以下と同じ:
// (A && B) || C
// → (true && false) || true
// → false || true
// → true（意図通りだが、Aが無視されるケースがある）

// ✅ 正しい: 括弧で意図を明示
if (A && (B || C)) {
  console.log("OK");
}
// → true && (false || true)
// → true && true
// → true
```

**問題が起きるケース:**

```javascript
let A = false;  // Aが false に変わった
let B = false;
let C = true;

// ❌ 括弧なし
if (A && B || C) {
  console.log("OK");  // 表示される（Aが無視される！）
}
// → (false && false) || true
// → false || true
// → true

// ✅ 括弧あり
if (A && (B || C)) {
  console.log("OK");  // 表示されない（意図通り）
}
// → false && (false || true)
// → false && true
// → false
```

### 間違い4: 複雑すぎる条件式

```javascript
// ❌ 間違い: 読みにくく、バグの原因になる
if (
  age >= 18 && hasTicket && !isBanned ||
  isVIP && !isBanned ||
  age >= 65 && !isBanned
) {
  console.log("OK");
}

// ✅ 正しい: 変数に分けて読みやすくする
const isRegularCustomer = age >= 18 && hasTicket && !isBanned;
const isValidVIP = isVIP && !isBanned;
const isSenior = age >= 65 && !isBanned;

if (isRegularCustomer || isValidVIP || isSenior) {
  console.log("✅ OK");
}
```

### 間違い5: 短絡評価を考慮していない

```javascript
let user = null;

// ❌ 間違い: userがnullの時にエラーになる
if (user.age >= 18 && user.hasTicket) {
  console.log("OK");
}
// エラー: Cannot read property 'age' of null

// ✅ 正しい: 存在チェックを先に行う
if (user && user.age >= 18 && user.hasTicket) {
  console.log("✅ OK");
}
// → userがnullの時点でfalseとなり、以降は評価されない
```

### 間違い6: 同じ条件の重複

```javascript
let isBanned = false;

// ❌ 間違い: !isBannedが重複している
if ((age >= 18 && hasTicket && !isBanned) || (isVIP && !isBanned)) {
  console.log("OK");
}

// ✅ 正しい: 共通条件を外に出す
if ((age >= 18 && hasTicket || isVIP) && !isBanned) {
  console.log("✅ OK");
}

// または変数に分ける
const canEnter = (age >= 18 && hasTicket) || isVIP;
if (canEnter && !isBanned) {
  console.log("✅ OK");
}
```

---

## 実用例

### 実用例1: ECサイトの送料判定システム

商品の購入金額とユーザーの会員ステータスに基づいて送料を判定します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>送料判定システム</title>
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
      padding: 8px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 4px;
    }
    .checkbox-group {
      margin: 15px 0;
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
      border-radius: 4px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
    .free {
      background: #d4edda;
      color: #155724;
    }
    .charged {
      background: #f8d7da;
      color: #721c24;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🛒 送料判定システム</h2>
    <div class="input-group">
      <label for="amount">購入金額（円）:</label>
      <input type="number" id="amount" value="1500" min="0">
    </div>
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isPrime">
        プライム会員
      </label>
    </div>
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isRegion">
        離島・遠隔地
      </label>
    </div>
    <button onclick="checkShipping()">送料を判定</button>
    <div id="result"></div>
  </div>

  <script>
    function checkShipping() {
      const amount = Number(document.getElementById("amount").value);
      const isPrime = document.getElementById("isPrime").checked;
      const isRegion = document.getElementById("isRegion").checked;
      const result = document.getElementById("result");

      // 条件を変数に分ける
      const qualifiesForFree = amount >= 2000;  // 2000円以上
      const isFreeShipping = (qualifiesForFree || isPrime) && !isRegion;

      // 結果の表示
      if (isFreeShipping) {
        result.className = "free";
        result.textContent = "✅ 送料無料";
      } else {
        result.className = "charged";
        if (isRegion) {
          result.textContent = "❌ 送料がかかります（離島・遠隔地は有料）";
        } else if (isPrime) {
          result.textContent = "✅ 送料無料（プライム会員）";
        } else if (amount >= 2000) {
          result.textContent = "✅ 送料無料（2000円以上）";
        } else {
          const remaining = 2000 - amount;
          result.textContent = `❌ あと${remaining}円で送料無料`;
        }
      }
    }
  </script>
</body>
</html>
```

**ポイント:**
- `(qualifiesForFree || isPrime) && !isRegion` という複雑な条件
- 条件を変数に分けて読みやすくしている
- 離島の場合は必ず送料がかかる（ANDで除外）

### 実用例2: イベント参加資格判定システム

年齢、チケット、VIPステータスに基づいて参加資格を判定します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>イベント参加資格判定</title>
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
      padding: 8px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 4px;
    }
    .checkbox-group {
      margin: 10px 0;
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
      border-radius: 4px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
    .allowed {
      background: #d4edda;
      color: #155724;
    }
    .denied {
      background: #f8d7da;
      color: #721c24;
    }
    #details {
      margin-top: 10px;
      padding: 10px;
      background: white;
      border-radius: 4px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🎫 イベント参加資格判定</h2>
    <div class="input-group">
      <label for="age">年齢:</label>
      <input type="number" id="age" value="20" min="0" max="150">
    </div>
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="hasTicket" checked>
        チケットを持っている
      </label>
    </div>
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isVIP">
        VIP会員
      </label>
    </div>
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isBanned">
        出禁（ブラックリスト）
      </label>
    </div>
    <button onclick="checkEligibility()">参加資格を判定</button>
    <div id="result"></div>
    <div id="details"></div>
  </div>

  <script>
    function checkEligibility() {
      const age = Number(document.getElementById("age").value);
      const hasTicket = document.getElementById("hasTicket").checked;
      const isVIP = document.getElementById("isVIP").checked;
      const isBanned = document.getElementById("isBanned").checked;
      const result = document.getElementById("result");
      const details = document.getElementById("details");

      // 早期リターン: 出禁チェック
      if (isBanned) {
        result.className = "denied";
        result.textContent = "❌ 参加できません";
        details.textContent = "理由: ブラックリストに登録されています";
        return;
      }

      // 年齢チェック
      if (age < 18) {
        result.className = "denied";
        result.textContent = "❌ 参加できません";
        details.textContent = "理由: 18歳以上が必要です";
        return;
      }

      // メイン条件: (チケットあり または VIP)
      if (hasTicket || isVIP) {
        result.className = "allowed";
        result.textContent = "✅ 参加できます！";

        // 詳細な理由を表示
        let reason = "条件: ";
        if (isVIP) {
          reason += "VIP会員";
        } else if (hasTicket) {
          reason += "チケット保有";
        }
        details.textContent = reason;
      } else {
        result.className = "denied";
        result.textContent = "❌ 参加できません";
        details.textContent = "理由: チケットまたはVIP会員資格が必要です";
      }
    }
  </script>
</body>
</html>
```

**ポイント:**
- 早期リターンで除外条件を先にチェック
- `(hasTicket || isVIP)` という OR 条件
- 詳細な理由を表示してユーザーに分かりやすく

### 実用例3: アクセス権限判定システム

ユーザーのログイン状態と役割に基づいてアクセス権限を判定します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>アクセス権限判定</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
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
      margin: 10px 0;
      padding: 10px;
      background: white;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 15px;
    }
    button:hover {
      background: #5a6268;
    }
    .result-section {
      margin-top: 20px;
    }
    .access-item {
      padding: 12px;
      margin: 8px 0;
      border-radius: 4px;
      font-weight: bold;
    }
    .granted {
      background: #d4edda;
      color: #155724;
    }
    .denied {
      background: #f8d7da;
      color: #721c24;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🔐 アクセス権限判定システム</h2>

    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isLoggedIn" checked>
        ログイン済み
      </label>
    </div>

    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isAdmin">
        管理者（Admin）
      </label>
    </div>

    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isModerator">
        モデレーター（Moderator）
      </label>
    </div>

    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isOwner">
        所有者（Owner）
      </label>
    </div>

    <button onclick="checkAccess()">権限を判定</button>

    <div id="results" class="result-section"></div>
  </div>

  <script>
    function checkAccess() {
      const isLoggedIn = document.getElementById("isLoggedIn").checked;
      const isAdmin = document.getElementById("isAdmin").checked;
      const isModerator = document.getElementById("isModerator").checked;
      const isOwner = document.getElementById("isOwner").checked;
      const results = document.getElementById("results");

      // 条件を変数に分ける
      const hasSpecialRole = isAdmin || isModerator || isOwner;
      const canAccessAdminPanel = isLoggedIn && (isAdmin || isOwner);
      const canModerateContent = isLoggedIn && (isAdmin || isModerator || isOwner);
      const canEditSettings = isLoggedIn && isOwner;
      const canViewContent = isLoggedIn;

      // 結果をHTML形式で生成
      let html = "";

      // 1. 管理画面へのアクセス
      html += `<div class="access-item ${canAccessAdminPanel ? 'granted' : 'denied'}">`;
      html += canAccessAdminPanel
        ? "✅ 管理画面にアクセスできます"
        : "❌ 管理画面にアクセスできません";
      html += "</div>";

      // 2. コンテンツの管理
      html += `<div class="access-item ${canModerateContent ? 'granted' : 'denied'}">`;
      html += canModerateContent
        ? "✅ コンテンツを管理できます"
        : "❌ コンテンツを管理できません";
      html += "</div>";

      // 3. 設定の編集
      html += `<div class="access-item ${canEditSettings ? 'granted' : 'denied'}">`;
      html += canEditSettings
        ? "✅ 設定を編集できます"
        : "❌ 設定を編集できません";
      html += "</div>";

      // 4. コンテンツの閲覧
      html += `<div class="access-item ${canViewContent ? 'granted' : 'denied'}">`;
      html += canViewContent
        ? "✅ コンテンツを閲覧できます"
        : "❌ ログインが必要です";
      html += "</div>";

      results.innerHTML = html;
    }

    // ページ読み込み時に実行
    checkAccess();
  </script>
</body>
</html>
```

**ポイント:**
- `isLoggedIn && (isAdmin || isModerator || isOwner)` という複雑な条件
- 条件を変数に分けて管理
- 複数の権限レベルを同時に判定

### 実用例4: 割引適用判定システム

購入金額、会員ステータス、年齢に基づいて割引を判定します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>割引適用判定</title>
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
      padding: 8px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 4px;
    }
    .checkbox-group {
      margin: 10px 0;
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
      margin-top: 10px;
    }
    button:hover {
      background: #138496;
    }
    #result {
      margin-top: 20px;
      padding: 15px;
      border-radius: 4px;
      background: white;
    }
    .price-info {
      font-size: 24px;
      font-weight: bold;
      color: #28a745;
      margin: 10px 0;
    }
    .discount-info {
      color: #dc3545;
      font-size: 18px;
      margin: 5px 0;
    }
    .detail {
      font-size: 14px;
      color: #666;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>💰 割引適用判定システム</h2>

    <div class="input-group">
      <label for="amount">購入金額（円）:</label>
      <input type="number" id="amount" value="5000" min="0">
    </div>

    <div class="input-group">
      <label for="age">年齢:</label>
      <input type="number" id="age" value="30" min="0" max="150">
    </div>

    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isStudent">
        学生
      </label>
    </div>

    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isMember">
        会員
      </label>
    </div>

    <button onclick="calculateDiscount()">割引を計算</button>

    <div id="result"></div>
  </div>

  <script>
    function calculateDiscount() {
      const amount = Number(document.getElementById("amount").value);
      const age = Number(document.getElementById("age").value);
      const isStudent = document.getElementById("isStudent").checked;
      const isMember = document.getElementById("isMember").checked;
      const result = document.getElementById("result");

      // 割引条件を変数に分ける
      const isSenior = age >= 65;
      const qualifiesForAgeDiscount = isStudent || isSenior;
      const qualifiesForVolumeDiscount = amount >= 10000;

      // 複雑な条件: (学生 または シニア または 会員) かつ 3000円以上
      const getsDiscount = (qualifiesForAgeDiscount || isMember) && amount >= 3000;

      // 割引率を計算
      let discountRate = 0;
      let reasons = [];

      if (getsDiscount) {
        // 基本割引
        if (isStudent) {
          discountRate += 10;
          reasons.push("学生割引: 10%");
        }
        if (isSenior) {
          discountRate += 10;
          reasons.push("シニア割引: 10%");
        }
        if (isMember) {
          discountRate += 5;
          reasons.push("会員割引: 5%");
        }

        // ボリューム割引
        if (qualifiesForVolumeDiscount) {
          discountRate += 5;
          reasons.push("大量購入割引: 5%");
        }
      }

      // 割引後の金額を計算
      const discountAmount = Math.floor(amount * discountRate / 100);
      const finalAmount = amount - discountAmount;

      // 結果を表示
      let html = "";
      if (getsDiscount) {
        html += `<div class="price-info">`;
        html += `最終金額: ¥${finalAmount.toLocaleString()}`;
        html += `</div>`;
        html += `<div class="discount-info">`;
        html += `割引額: -¥${discountAmount.toLocaleString()} (${discountRate}%)`;
        html += `</div>`;
        html += `<div class="detail">`;
        html += `適用された割引:<br>`;
        html += reasons.join("<br>");
        html += `</div>`;
      } else {
        html += `<div class="price-info">`;
        html += `金額: ¥${amount.toLocaleString()}`;
        html += `</div>`;
        html += `<div class="detail">`;
        if (amount < 3000) {
          html += `割引を受けるには3,000円以上の購入が必要です。`;
        } else {
          html += `割引の対象外です。`;
        }
        html += `</div>`;
      }

      result.innerHTML = html;
    }

    // ページ読み込み時に実行
    calculateDiscount();
  </script>
</body>
</html>
```

**ポイント:**
- `(qualifiesForAgeDiscount || isMember) && amount >= 3000` という複雑な条件
- 複数の割引条件を組み合わせて計算
- 条件ごとに割引率を累積

---

## 練習問題

### 問題1: 映画館の入場判定

映画館の入場条件を判定するプログラムを作成してください。

**条件:**
- 以下の場合に入場できます:
  - (年齢が適切 かつ チケットあり) または (スタッフである)
  - ただし、出禁の場合は入場不可

**HTML要素:**
- `id="age"` の input要素（年齢）
- `id="movieRating"` の select要素（映画のレーティング: "G", "PG12", "R15", "R18"）
- `id="hasTicket"` のcheckbox（チケット保有）
- `id="isStaff"` のcheckbox（スタッフ）
- `id="isBanned"` のcheckbox（出禁）
- `id="result"` の結果表示要素

**動作:**
1. レーティングに応じた年齢制限をチェック
2. (年齢OK && チケットあり) || スタッフ を判定
3. 出禁でないことをチェック
4. 入場可否を表示

<details>
<summary>ヒント1: レーティングと年齢の判定</summary>

```javascript
// レーティングごとの年齢制限
let ageOK = false;
if (movieRating === "G") {
  ageOK = true;  // 全年齢
} else if (movieRating === "PG12") {
  ageOK = age >= 12;
} else if (movieRating === "R15") {
  ageOK = age >= 15;
} else if (movieRating === "R18") {
  ageOK = age >= 18;
}
```
</details>

<details>
<summary>ヒント2: 複雑な条件の組み立て</summary>

```javascript
// 条件を変数に分ける
const meetsAgeRequirement = ageOK;
const hasValidTicket = hasTicket;
const isAuthorized = (meetsAgeRequirement && hasValidTicket) || isStaff;
const canEnter = isAuthorized && !isBanned;
```
</details>

<details>
<summary>ヒント3: 完全な解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>映画館入場判定</title>
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
    .input-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input, select {
      width: 100%;
      padding: 8px;
      font-size: 16px;
      border: 2px solid #ddd;
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
    #result {
      margin-top: 20px;
      padding: 15px;
      border-radius: 4px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
    .allowed { background: #d4edda; color: #155724; }
    .denied { background: #f8d7da; color: #721c24; }
  </style>
</head>
<body>
  <div class="container">
    <h2>🎬 映画館入場判定</h2>

    <div class="input-group">
      <label for="age">年齢:</label>
      <input type="number" id="age" value="20" min="0">
    </div>

    <div class="input-group">
      <label for="movieRating">映画のレーティング:</label>
      <select id="movieRating">
        <option value="G">G（全年齢）</option>
        <option value="PG12">PG12（12歳以上推奨）</option>
        <option value="R15" selected>R15（15歳以上）</option>
        <option value="R18">R18（18歳以上）</option>
      </select>
    </div>

    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="hasTicket" checked>
        チケットを持っている
      </label>
    </div>

    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isStaff">
        スタッフ
      </label>
    </div>

    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isBanned">
        出禁
      </label>
    </div>

    <button onclick="checkEntry()">入場判定</button>
    <div id="result"></div>
  </div>

  <script>
    function checkEntry() {
      const age = Number(document.getElementById("age").value);
      const movieRating = document.getElementById("movieRating").value;
      const hasTicket = document.getElementById("hasTicket").checked;
      const isStaff = document.getElementById("isStaff").checked;
      const isBanned = document.getElementById("isBanned").checked;
      const result = document.getElementById("result");

      // 早期リターン: 出禁チェック
      if (isBanned) {
        result.className = "denied";
        result.textContent = "❌ 入場できません（出禁）";
        return;
      }

      // 年齢制限チェック
      let ageOK = false;
      let requiredAge = 0;

      if (movieRating === "G") {
        ageOK = true;
      } else if (movieRating === "PG12") {
        requiredAge = 12;
        ageOK = age >= 12;
      } else if (movieRating === "R15") {
        requiredAge = 15;
        ageOK = age >= 15;
      } else if (movieRating === "R18") {
        requiredAge = 18;
        ageOK = age >= 18;
      }

      // 複雑な条件: (年齢OK && チケットあり) || スタッフ
      const regularEntry = ageOK && hasTicket;
      const canEnter = regularEntry || isStaff;

      if (canEnter) {
        result.className = "allowed";
        if (isStaff) {
          result.textContent = "✅ 入場できます（スタッフ）";
        } else {
          result.textContent = "✅ 入場できます";
        }
      } else {
        result.className = "denied";
        if (!ageOK) {
          result.textContent = `❌ ${requiredAge}歳以上が必要です`;
        } else {
          result.textContent = "❌ チケットが必要です";
        }
      }
    }
  </script>
</body>
</html>
```
</details>

### 問題2: クレジットカード申込資格判定

クレジットカードの申込資格を判定するプログラムを作成してください。

**条件:**
- 以下のすべてを満たす必要があります:
  - 年齢が18歳以上65歳以下
  - (年収が200万円以上) または (学生で親の同意あり)
  - 信用情報に問題がない

**HTML要素:**
- `id="age"` の input要素（年齢）
- `id="income"` の input要素（年収、万円単位）
- `id="isStudent"` のcheckbox（学生）
- `id="hasParentalConsent"` のcheckbox（親の同意）
- `id="hasCreditIssue"` のcheckbox（信用情報に問題あり）
- `id="result"` の結果表示要素

<details>
<summary>ヒント1: 年齢範囲のチェック</summary>

```javascript
// 年齢が範囲内かチェック
const ageInRange = age >= 18 && age <= 65;
```
</details>

<details>
<summary>ヒント2: 収入条件のチェック</summary>

```javascript
// 収入条件: (年収200万以上) または (学生で親の同意)
const meetsIncomeRequirement =
  (income >= 200) || (isStudent && hasParentalConsent);
```
</details>

<details>
<summary>ヒント3: 完全な解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>クレジットカード申込資格判定</title>
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
    .input-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input {
      width: 100%;
      padding: 8px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #ffc107;
      color: #000;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
    }
    #result {
      margin-top: 20px;
      padding: 15px;
      border-radius: 4px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
    .approved { background: #d4edda; color: #155724; }
    .rejected { background: #f8d7da; color: #721c24; }
    #details {
      margin-top: 10px;
      font-size: 14px;
      text-align: left;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>💳 クレジットカード申込資格判定</h2>

    <div class="input-group">
      <label for="age">年齢:</label>
      <input type="number" id="age" value="25" min="0">
    </div>

    <div class="input-group">
      <label for="income">年収（万円）:</label>
      <input type="number" id="income" value="300" min="0">
    </div>

    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isStudent">
        学生
      </label>
    </div>

    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="hasParentalConsent">
        親の同意あり
      </label>
    </div>

    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="hasCreditIssue">
        信用情報に問題あり
      </label>
    </div>

    <button onclick="checkEligibility()">申込資格を判定</button>
    <div id="result"></div>
    <div id="details"></div>
  </div>

  <script>
    function checkEligibility() {
      const age = Number(document.getElementById("age").value);
      const income = Number(document.getElementById("income").value);
      const isStudent = document.getElementById("isStudent").checked;
      const hasParentalConsent = document.getElementById("hasParentalConsent").checked;
      const hasCreditIssue = document.getElementById("hasCreditIssue").checked;
      const result = document.getElementById("result");
      const details = document.getElementById("details");

      // 条件を変数に分ける
      const ageInRange = age >= 18 && age <= 65;
      const meetsIncomeRequirement = (income >= 200) || (isStudent && hasParentalConsent);
      const hasGoodCredit = !hasCreditIssue;

      // すべての条件を満たす必要がある
      const isEligible = ageInRange && meetsIncomeRequirement && hasGoodCredit;

      // 結果を表示
      if (isEligible) {
        result.className = "approved";
        result.textContent = "✅ 申込可能です";
        details.innerHTML = "すべての条件を満たしています。";
      } else {
        result.className = "rejected";
        result.textContent = "❌ 申込できません";

        // 満たしていない条件を列挙
        let reasons = "理由:<br>";
        if (!ageInRange) {
          reasons += "• 年齢は18歳以上65歳以下が必要です<br>";
        }
        if (!meetsIncomeRequirement) {
          if (isStudent) {
            reasons += "• 学生の場合は親の同意が必要です<br>";
          } else {
            reasons += "• 年収200万円以上が必要です<br>";
          }
        }
        if (!hasGoodCredit) {
          reasons += "• 信用情報に問題があります<br>";
        }
        details.innerHTML = reasons;
      }
    }
  </script>
</body>
</html>
```
</details>

### 問題3: 複雑な宅配サービス利用条件

宅配サービスの利用可否を判定するプログラムを作成してください。

**条件:**
- 以下の場合に利用できます:
  - ((会員である) または (初回利用)) かつ (配送エリア内) かつ (ブラックリストでない)
  - ただし、悪天候の場合は会員のみ利用可能

**HTML要素:**
- `id="isMember"` のcheckbox（会員）
- `id="isFirstTime"` のcheckbox（初回利用）
- `id="inDeliveryArea"` のcheckbox（配送エリア内）
- `id="isBlacklisted"` のcheckbox（ブラックリスト）
- `id="isBadWeather"` のcheckbox（悪天候）
- `id="result"` の結果表示要素

<details>
<summary>ヒント1: 基本条件の組み立て</summary>

```javascript
// 基本条件
const qualifiesAsUser = isMember || isFirstTime;
const canDeliver = qualifiesAsUser && inDeliveryArea && !isBlacklisted;
```
</details>

<details>
<summary>ヒント2: 悪天候時の追加条件</summary>

```javascript
// 悪天候時は会員のみ
if (isBadWeather) {
  canDeliver = canDeliver && isMember;
}
```
</details>

<details>
<summary>ヒント3: 完全な解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>宅配サービス利用条件</title>
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
      margin: 12px 0;
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
      margin-top: 15px;
    }
    #result {
      margin-top: 20px;
      padding: 15px;
      border-radius: 4px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
    .available { background: #d4edda; color: #155724; }
    .unavailable { background: #f8d7da; color: #721c24; }
    #details {
      margin-top: 10px;
      padding: 10px;
      background: white;
      border-radius: 4px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🚚 宅配サービス利用条件判定</h2>

    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isMember">
        会員である
      </label>
    </div>

    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isFirstTime">
        初回利用
      </label>
    </div>

    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="inDeliveryArea" checked>
        配送エリア内
      </label>
    </div>

    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isBlacklisted">
        ブラックリスト
      </label>
    </div>

    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="isBadWeather">
        悪天候
      </label>
    </div>

    <button onclick="checkService()">利用可否を判定</button>
    <div id="result"></div>
    <div id="details"></div>
  </div>

  <script>
    function checkService() {
      const isMember = document.getElementById("isMember").checked;
      const isFirstTime = document.getElementById("isFirstTime").checked;
      const inDeliveryArea = document.getElementById("inDeliveryArea").checked;
      const isBlacklisted = document.getElementById("isBlacklisted").checked;
      const isBadWeather = document.getElementById("isBadWeather").checked;
      const result = document.getElementById("result");
      const details = document.getElementById("details");

      // 早期リターン: ブラックリストチェック
      if (isBlacklisted) {
        result.className = "unavailable";
        result.textContent = "❌ 利用できません";
        details.textContent = "理由: ブラックリストに登録されています";
        return;
      }

      // 配送エリアチェック
      if (!inDeliveryArea) {
        result.className = "unavailable";
        result.textContent = "❌ 利用できません";
        details.textContent = "理由: 配送エリア外です";
        return;
      }

      // 基本条件: (会員 または 初回) かつ エリア内 かつ ブラックリストでない
      const qualifiesAsUser = isMember || isFirstTime;

      // 悪天候時の追加条件
      let canUseService = qualifiesAsUser;
      if (isBadWeather) {
        canUseService = canUseService && isMember;
      }

      // 結果表示
      if (canUseService) {
        result.className = "available";
        result.textContent = "✅ 利用できます";

        let info = "条件: ";
        if (isBadWeather) {
          info += "悪天候のため会員のみ利用可能です";
        } else if (isMember) {
          info += "会員として利用できます";
        } else {
          info += "初回利用特典が適用されます";
        }
        details.textContent = info;
      } else {
        result.className = "unavailable";
        result.textContent = "❌ 利用できません";

        if (isBadWeather && !isMember) {
          details.textContent = "理由: 悪天候時は会員のみ利用可能です";
        } else {
          details.textContent = "理由: 会員登録または初回利用が必要です";
        }
      }
    }
  </script>
</body>
</html>
```
</details>

---

## チェックリスト

以下の項目を確認して、理解度をチェックしましょう:

- [ ] **演算子の優先順位を理解している**
  - `!` > `&&` > `||` の順序を覚えている
  - 優先順位に従って評価される流れを説明できる

- [ ] **括弧を使って優先順位を制御できる**
  - 括弧を使って評価順序を変更できる
  - `(A && B) || C` と `A && (B || C)` の違いを説明できる

- [ ] **(A && B) || C パターンを使える**
  - 「AとBの両方」または「C」という条件を書ける
  - 真偽値テーブルで動作を確認できる

- [ ] **A && (B || C) パターンを使える**
  - 「Aが必須で、BまたはC」という条件を書ける
  - 実際のユースケースで適用できる

- [ ] **複数の条件を組み合わせられる**
  - 3つ以上の条件を適切に組み合わせられる
  - ネストした括弧を正しく使える

- [ ] **ド・モルガンの法則を理解している**
  - `!(A || B)` = `!A && !B` を説明できる
  - `!(A && B)` = `!A || !B` を説明できる

- [ ] **複雑な条件を変数に分けられる**
  - 意味のある変数名で条件を分割できる
  - コードの可読性を向上させられる

- [ ] **早期リターンを使える**
  - 除外条件を先にチェックできる
  - ネストを浅く保てる

- [ ] **実用的な条件判定を実装できる**
  - ECサイトの送料判定ができる
  - アクセス権限の判定ができる
  - 資格要件の判定ができる

- [ ] **よくある間違いを避けられる**
  - 括弧の付け忘れに注意できる
  - NOTの適用範囲を正しく理解している
  - 短絡評価を考慮できる

---

## デバッグのヒント

複雑な条件式で問題が起きた時の確認方法:

### 1. 条件を段階的に確認する

```javascript
let age = 20;
let hasTicket = false;
let isVIP = true;

// 各部分を個別に確認
console.log("age >= 18:", age >= 18);           // true
console.log("hasTicket:", hasTicket);           // false
console.log("isVIP:", isVIP);                   // true
console.log("A && B:", age >= 18 && hasTicket); // false
console.log("(A && B) || C:", (age >= 18 && hasTicket) || isVIP); // true
```

### 2. 括弧の対応を確認する

```javascript
// ❌ 括弧が合っていない
if ((age >= 18 && hasTicket || isVIP) {
  // エラー: ) が足りない
}

// ✅ 括弧が正しく対応している
if ((age >= 18 && hasTicket) || isVIP) {
  // OK
}
```

### 3. 真偽値テーブルで確認する

```javascript
// すべてのパターンを表示して確認
for (let A of [true, false]) {
  for (let B of [true, false]) {
    for (let C of [true, false]) {
      console.log(`A=${A}, B=${B}, C=${C}: ${(A && B) || C}`);
    }
  }
}
```

### 4. 条件を変数に分けて確認する

```javascript
// 複雑な条件をステップごとに確認
const part1 = age >= 18 && hasTicket;
console.log("part1:", part1);

const part2 = isVIP;
console.log("part2:", part2);

const result = part1 || part2;
console.log("result:", result);
```

### 5. NOT の適用範囲を確認する

```javascript
// どこまでNOTが適用されるか確認
console.log("!hasTicket:", !hasTicket);              // true
console.log("!hasTicket || isVIP:", !hasTicket || isVIP);  // true
console.log("!(hasTicket || isVIP):", !(hasTicket || isVIP)); // false
```

---

## ポイント

### 1. 演算子の優先順位を覚える

```
! (NOT) > && (AND) > || (OR)
```

この順序を覚えておくと、括弧なしでもコードが読めるようになります。

### 2. 括弧で意図を明示する

優先順位に頼らず、括弧を使って意図を明確にしましょう:

```javascript
// 読みにくい
if (age >= 18 && hasTicket || isVIP)

// 読みやすい
if ((age >= 18 && hasTicket) || isVIP)
```

### 3. 複雑な条件は変数に分ける

```javascript
// わかりやすい
const isAdultWithTicket = age >= 18 && hasTicket;
const canEnter = isAdultWithTicket || isVIP;
```

### 4. (A && B) || C と A && (B || C) は異なる

括弧の位置で意味が変わります:
- `(A && B) || C`: AとBの両方、またはC
- `A && (B || C)`: Aが必須で、BまたはC

### 5. ド・モルガンの法則を活用する

```javascript
!(A || B) = !A && !B
!(A && B) = !A || !B
```

### 6. 早期リターンでネストを減らす

除外条件を先にチェックすると、コードがシンプルになります:

```javascript
if (isBanned) return "❌ 利用不可";
if (age < 18) return "❌ 年齢不足";
// メインのロジック
```

### 7. 短絡評価を理解する

```javascript
// Aがfalseの場合、Bは評価されない
A && B

// Aがtrueの場合、Bは評価されない
A || B
```

### 8. 真偽値テーブルで動作を確認する

複雑な条件は、すべてのパターンを表で確認しましょう。

### 9. 同じ条件の重複を避ける

```javascript
// ❌ 重複
if ((A && B && !C) || (D && !C))

// ✅ 共通条件を外に出す
if ((A && B || D) && !C)
```

---

## できるようになったこと

このレッスンを完了すると、以下のことができるようになります:

1. **演算子の優先順位を理解して使える**
   - `!`、`&&`、`||` の評価順序を説明できる
   - 優先順位に従った条件式を書ける

2. **括弧を使って優先順位を制御できる**
   - 意図通りの評価順序を括弧で指定できる
   - 複雑な条件を読みやすく書ける

3. **(A && B) || C パターンを実装できる**
   - 「両方満たす、または別の条件」を書ける
   - ECサイトの送料判定などに応用できる

4. **A && (B || C) パターンを実装できる**
   - 「必須条件と、どれか一つ」を書ける
   - アクセス権限の判定などに応用できる

5. **複数の条件を適切に組み合わせられる**
   - 3つ以上の条件を正しく結合できる
   - ネストした括弧を使いこなせる

6. **ド・モルガンの法則を使って書き換えられる**
   - `!(A || B)` を `!A && !B` に変換できる
   - より読みやすい形に条件を書き換えられる

7. **複雑な条件を変数に分けて読みやすくできる**
   - 意味のある変数名で条件を分割できる
   - メンテナンスしやすいコードを書ける

8. **早期リターンを使ってネストを減らせる**
   - 除外条件を先にチェックできる
   - フラットで読みやすいコードを書ける

---

## まとめ

- **演算子の優先順位**: `!` > `&&` > `||`
- **括弧を使うと優先順位を制御できる**: 意図を明示して読みやすくする
- **(A && B) || C**: 「AとBの両方」または「C」
- **A && (B || C)**: 「Aが必須で、BまたはC」
- **ド・モルガンの法則**: `!(A || B)` = `!A && !B`, `!(A && B)` = `!A || !B`
- **複雑な条件は変数に分ける**: 可読性とメンテナンス性が向上する
- **早期リターンを活用**: ネストを浅く保ち、コードをシンプルにする
- **真偽値テーブルで確認**: すべてのパターンを確認して動作を理解する

---

## 次のステップ

次のレッスンでは、**三項演算子**を学びます。

三項演算子を使うと、if-else文を1行で書けるようになります:

```javascript
// if-else文
let message;
if (age >= 18) {
  message = "成人";
} else {
  message = "未成年";
}

// 三項演算子
let message = age >= 18 ? "成人" : "未成年";
```

複雑な条件式を学んだ今、より簡潔なコードを書く方法を習得しましょう！
