# レッスン45：OR演算（||）

## なぜ重要なのか

OR演算（||）は、**複数の選択肢のうちどれか1つでも満たせば良い場面**で使用します。実際のWebサービスでは、柔軟な条件判定に欠かせません。

| サービス | 使用場面 | 条件の例 |
|---------|---------|---------|
| **Amazon** | 配送オプション | 通常配送 \|\| お急ぎ便 \|\| 当日お急ぎ便のいずれか選択 |
| **Netflix** | 割引対象 | 学生 \|\| 65歳以上 \|\| ファミリープラン加入者 |
| **Twitter** | ログイン方法 | メールアドレス \|\| 電話番号 \|\| Googleアカウントで認証 |
| **鉄道運賃** | 割引適用 | 子供 \|\| 学生 \|\| 障がい者 \|\| 高齢者のいずれか |
| **YouTube** | 年齢制限解除 | ログイン済み \|\| 保護者の同意がある |

**学ぶべき理由：**
- 複数の選択肢を柔軟に扱える
- エラーチェックを効率的に書ける
- デフォルト値の設定に使える
- 実務で頻繁に使う演算子の1つ

---

## 基本概念の説明

### OR演算子（||）とは

**||（オア）** は、**左右の条件のどちらか一方でもtrueならtrueになる**演算子です。

```
条件1 || 条件2
```

**真偽値表（Truth Table）：**

```
┌─────────┬─────────┬──────────┐
│ 条件1   │ 条件2   │  結果    │
├─────────┼─────────┼──────────┤
│ true    │ true    │ true  ✅ │
│ true    │ false   │ true  ✅ │
│ false   │ true    │ true  ✅ │
│ false   │ false   │ false ❌ │
└─────────┴─────────┴──────────┘
```

**重要なポイント：**
- どちらか一方でもtrueならtrueになる
- 両方ともfalseの時**だけ**falseになる
- 3つ以上の条件も連結できる

### AND演算子との比較

| 演算子 | 意味 | 条件 | 例 |
|-------|------|------|-----|
| **&&（AND）** | すべて満たす | 両方ともtrue | `age >= 18 && hasLicense` |
| **\|\|（OR）** | どれか1つ満たす | どちらか一方がtrue | `day === "土曜" \|\| day === "日曜"` |

**AND（&&）の真偽値表：**
```
true  && true  → true  ✅（両方true）
true  && false → false ❌
false && true  → false ❌
false && false → false ❌
```

**OR（||）の真偽値表：**
```
true  || true  → true  ✅
true  || false → true  ✅（どちらか一方がtrue）
false || true  → true  ✅（どちらか一方がtrue）
false || false → false ❌（両方false）
```

---

## 動作の流れ

### 基本的な評価の流れ

```
    スタート
       ↓
   ┌─────────┐
   │ 条件1を │
   │ 評価    │
   └────┬────┘
        │
    ┌───┴───┐
    │       │
   true    false
    │       │
    │   ┌───┴────┐
    │   │ 条件2を│
    │   │ 評価   │
    │   └───┬────┘
    │       │
    │   ┌───┴───┐
    │   │       │
    │  true   false
    │   │       │
    └───┼───────┤
        │       │
    ┌───┴───┐┌──┴───┐
    │ true  ││ false│
    │を返す ││を返す│
    └───────┘└──────┘
```

### 実際の例：休日判定

```javascript
const day = "土曜日";

if (day === "土曜日" || day === "日曜日") {
  console.log("休みです");
}
```

**評価の流れ：**

```
ステップ1: day === "土曜日" を評価
          "土曜日" === "土曜日"
          → true ✅

ステップ2: 左側がtrueなので、
          右側（day === "日曜日"）は評価されない
          （評価する必要がない）

ステップ3: true || (評価されない) を評価
          → true ✅

結果: if文の中身が実行される
     「休みです」と表示
```

### ショートサーキット評価（短絡評価）

**重要な特性：** 左側の条件がtrueなら、右側は評価されない

```javascript
const day = "土曜日";

if (day === "土曜日" || day === "日曜日") {  // 左側が true
  console.log("休みです");
}
```

**評価の流れ：**

```
ステップ1: day === "土曜日" を評価
          → true ✅

ステップ2: 左側がtrueなので、
          右側は評価されない
          （すでに全体がtrueと確定）

結果: if文の中身が実行される
```

**逆のパターン（左側がfalse）：**

```javascript
const day = "日曜日";

if (day === "土曜日" || day === "日曜日") {
  console.log("休みです");
}
```

**評価の流れ：**

```
ステップ1: day === "土曜日" を評価
          "日曜日" === "土曜日"
          → false ❌

ステップ2: 左側がfalseなので、
          右側も評価する必要がある

ステップ3: day === "日曜日" を評価
          "日曜日" === "日曜日"
          → true ✅

ステップ4: false || true を評価
          → true ✅

結果: if文の中身が実行される
```

---

## 詳細解説

### ❶ 基本的な使い方

**2つの選択肢をチェック：**

```javascript
const day = "土曜日";

if (day === "土曜日" || day === "日曜日") {
  console.log("休みです");
} else {
  console.log("平日です");
}
```

| day | day === "土曜日" | day === "日曜日" | 結果 | 出力 |
|-----|-----------------|-----------------|------|------|
| "土曜日" | true | false | true \|\| false = **true** | "休みです" |
| "日曜日" | false | true | false \|\| true = **true** | "休みです" |
| "月曜日" | false | false | false \|\| false = **false** | "平日です" |

**ポイント：**
- どちらか一方でもtrueなら、最初のメッセージが表示される
- 両方ともfalseの時だけ、else部分が実行される

### ❷ 3つ以上の条件

OR演算子は、3つ以上の条件も連結できます。

```javascript
const day = "祝日";

if (day === "土曜日" || day === "日曜日" || day === "祝日") {
  console.log("休みです");
} else {
  console.log("平日です");
}
```

**評価の流れ：**

```
(day === "土曜日") || (day === "日曜日") || (day === "祝日")
        ↓
      false        ||        false        || (day === "祝日")
                       ↓
                     false                ||      true
                                    ↓
                                  true  ✅
```

**真偽値表（3つの条件）：**

| 条件1 | 条件2 | 条件3 | 結果 |
|------|------|------|------|
| true | true | true | **true** ✅ |
| true | true | false | **true** ✅ |
| true | false | true | **true** ✅ |
| true | false | false | **true** ✅ |
| false | true | true | **true** ✅ |
| false | true | false | **true** ✅ |
| false | false | true | **true** ✅ |
| false | false | false | false ❌ |

**ポイント：** どれか1つでもtrueならtrueになる（全部falseの時だけfalse）

### ❸ エラーチェックでの使用

複数のエラー条件をまとめて判定できます。

```javascript
function validateAge() {
  const ageValue = document.getElementById("age").value;
  const result = document.getElementById("result");

  // 空文字チェック
  if (ageValue === "") {
    result.textContent = "年齢を入力してください";
    return;
  }

  const age = Number(ageValue);

  // NaNチェック
  if (isNaN(age)) {
    result.textContent = "正しい数値を入力してください";
    return;
  }

  // OR演算子で範囲外チェック
  if (age < 0 || age > 150) {
    result.textContent = "❌ 年齢は0〜150の範囲で入力してください";
    return;
  }

  result.textContent = "✅ 有効な年齢です";
}
```

**ポイント：**
- `age < 0 || age > 150` で範囲外を一度にチェック
- どちらか一方でも該当すればエラー

### ❹ 権限チェックでの使用

複数の権限のいずれかを持っていればアクセス許可できます。

```javascript
function checkAccess() {
  const isAdmin = false;
  const isModerator = true;
  const isOwner = false;

  if (isAdmin || isModerator || isOwner) {
    console.log("✅ アクセス許可");
  } else {
    console.log("❌ アクセス拒否");
  }
}
```

**評価例：**

| isAdmin | isModerator | isOwner | 結果 | 出力 |
|---------|-------------|---------|------|------|
| true | false | false | **true** | アクセス許可 |
| false | true | false | **true** | アクセス許可 |
| false | false | true | **true** | アクセス許可 |
| false | false | false | **false** | アクセス拒否 |

### ❺ 割引判定での使用

複数の割引条件のいずれかに該当すれば割引が適用されます。

```javascript
function checkDiscount() {
  const age = 70;
  const isStudent = false;
  const isMember = false;

  if (age < 12 || age >= 65 || isStudent || isMember) {
    console.log("✅ 割引対象です");
  } else {
    console.log("通常料金です");
  }
}
```

**割引条件：**
- 12歳未満
- **または** 65歳以上
- **または** 学生
- **または** 会員

どれか1つでも該当すれば割引対象になります。

### ❻ デフォルト値の設定

OR演算子は、変数が空やnullの場合にデフォルト値を設定するのに使えます。

```javascript
// 例1: 空文字の場合のデフォルト値
let name = "";
let displayName = name || "ゲスト";
console.log(displayName);  // "ゲスト" が表示される

// 例2: ユーザー入力がない場合
let userInput = "";
let message = userInput || "デフォルトメッセージ";
console.log(message);  // "デフォルトメッセージ"

// 例3: 値がある場合
let userName = "太郎";
let greeting = userName || "名無しさん";
console.log(greeting);  // "太郎" が表示される
```

**仕組み：**

```
name || "ゲスト"
  ↓
 "" || "ゲスト"
  ↓
false || "ゲスト"  （空文字はfalsyな値）
  ↓
"ゲスト"  ✅
```

**falsyな値（falseとみなされる値）：**
- `false`
- `0`
- `""`（空文字）
- `null`
- `undefined`
- `NaN`

### ❼ ANDとORの組み合わせ

2つの演算子を組み合わせて、複雑な条件を表現できます。

```javascript
const age = 25;
const isWeekend = true;
const hasTicket = false;

// (18歳以上) かつ (週末 または チケット所持)
if (age >= 18 && (isWeekend || hasTicket)) {
  console.log("入場できます");
} else {
  console.log("入場できません");
}
```

**括弧の重要性：**

```javascript
// ❌ 括弧なし（意図と異なる可能性）
if (age >= 18 && isWeekend || hasTicket) {
  // (age >= 18 && isWeekend) || hasTicket
  // と解釈される
}

// ✅ 括弧あり（意図が明確）
if (age >= 18 && (isWeekend || hasTicket)) {
  // age >= 18 かつ (isWeekend または hasTicket)
}
```

**演算子の優先順位：**

```
1. 括弧 ()
2. 比較演算子 (>, <, >=, <=, ===, !==)
3. AND演算子 (&&)
4. OR演算子 (||)
```

### ❽ 複数条件の可読性向上

条件が多い場合は改行して読みやすくします。

```javascript
// ❌ 読みにくい
if (day === "土曜日" || day === "日曜日" || day === "祝日" || day === "振替休日") {
  console.log("休みです");
}

// ✅ 読みやすい
if (
  day === "土曜日" ||
  day === "日曜日" ||
  day === "祝日" ||
  day === "振替休日"
) {
  console.log("休みです");
}

// ✅ さらに見やすく（配列を使う方法）
const holidays = ["土曜日", "日曜日", "祝日", "振替休日"];
if (holidays.includes(day)) {
  console.log("休みです");
}
```

---

## よくある間違い

### ❌ 間違い1：条件式を省略してしまう

**間違ったコード：**
```javascript
const day = "土曜日";

if (day === "土曜日" || "日曜日") {  // 構文エラーではないが、意図と異なる ❌
  console.log("休みです");
}
```

**理由：** `"日曜日"` は常にtruthyな値なので、常にtrueになる

```javascript
day === "土曜日" || "日曜日"
        ↓
      false      || "日曜日"
        ↓
               true  （文字列はtruthy）
```

**正しいコード：**
```javascript
const day = "土曜日";

if (day === "土曜日" || day === "日曜日") {  // day を再度記述 ✅
  console.log("休みです");
}
```

### ❌ 間違い2：ANDとORを混同する

**間違ったコード：**
```javascript
const age = 10;

// 12歳未満「かつ」65歳以上？（ありえない条件） ❌
if (age < 12 && age >= 65) {
  console.log("割引対象です");  // 絶対に実行されない
}
```

**理由：** 同時に満たすことができない条件をANDで結合している

**正しいコード：**
```javascript
const age = 10;

// 12歳未満「または」65歳以上 ✅
if (age < 12 || age >= 65) {
  console.log("割引対象です");  // 10歳なので実行される
}
```

### ❌ 間違い3：範囲チェックでORを間違って使う

**間違ったコード：**
```javascript
const age = 200;

// 0以上「または」100以下？ ❌
if (age >= 0 || age <= 100) {
  console.log("有効な年齢です");  // 200でも実行されてしまう
}
```

**理由：** `age >= 0` が true なので、`age <= 100` に関係なく常に true

```
200 >= 0  → true
true || (何でも) → true  ❌
```

**正しいコード：**
```javascript
const age = 200;

// 0以上「かつ」100以下 ✅
if (age >= 0 && age <= 100) {
  console.log("有効な年齢です");  // 実行されない
} else {
  console.log("無効な年齢です");  // これが実行される
}
```

**または、範囲外をORでチェック：**
```javascript
const age = 200;

// 0未満「または」100より大きい ✅
if (age < 0 || age > 100) {
  console.log("❌ 無効な年齢です");  // これが実行される
} else {
  console.log("✅ 有効な年齢です");
}
```

### ❌ 間違い4：デフォルト値設定で数値0を使う

**間違ったコード：**
```javascript
const count = 0;  // 0は有効な値

const displayCount = count || 10;  // 0はfalsyなので10になってしまう ❌
console.log(displayCount);  // 10（期待：0）
```

**理由：** `0` はfalsyな値なので、デフォルト値が使われてしまう

**正しいコード：**
```javascript
const count = 0;

// nullish coalescing operator (??) を使う（より新しい方法）
const displayCount = count ?? 10;  // null または undefined の時だけ10 ✅
console.log(displayCount);  // 0（正しい）

// または、明示的にチェック
const displayCount2 = (count !== undefined && count !== null) ? count : 10;
console.log(displayCount2);  // 0（正しい）
```

### ❌ 間違い5：括弧を忘れて優先順位を間違える

**間違ったコード：**
```javascript
const age = 25;
const isWeekend = false;
const hasTicket = true;

// 括弧なし：意図と異なる可能性 ❌
if (age >= 18 && isWeekend || hasTicket) {
  console.log("入場できます");
}

// 実際の評価：(age >= 18 && isWeekend) || hasTicket
// つまり：(25 >= 18 && false) || true
//       → (true && false) || true
//       → false || true
//       → true  ✅ 入場できる
```

**意図していた条件：**
```javascript
// age >= 18 かつ (isWeekend または hasTicket)
// つまり：25 >= 18 && (false || true)
//       → true && true
//       → true  ✅ 入場できる
```

**正しいコード：**
```javascript
const age = 25;
const isWeekend = false;
const hasTicket = true;

// 括弧で意図を明確に ✅
if (age >= 18 && (isWeekend || hasTicket)) {
  console.log("入場できます");
}
```

### ❌ 間違い6：空文字チェックを忘れる

**間違ったコード：**
```javascript
const day = "";

if (day === "土曜日" || day === "日曜日") {
  console.log("休みです");
} else {
  console.log("平日です");  // 空文字でも「平日」と表示される ❌
}
```

**理由：** 空文字の場合の処理が定義されていない

**正しいコード：**
```javascript
const day = "";

// 空文字チェックを先に ✅
if (day === "") {
  console.log("❌ 曜日を入力してください");
} else if (day === "土曜日" || day === "日曜日") {
  console.log("休みです");
} else {
  console.log("平日です");
}
```

---

## 実用例

### 例1：休日判定機

**HTML：**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>休日判定機</title>
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
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: #555;
    }
    input[type="text"] {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    button {
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 18px;
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
      font-size: 18px;
      font-weight: bold;
    }
    .holiday {
      background-color: #d4edda;
      color: #155724;
      border: 2px solid #c3e6cb;
    }
    .weekday {
      background-color: #fff3cd;
      color: #856404;
      border: 2px solid #ffeaa7;
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
    <h1>📅 休日判定機</h1>

    <div class="form-group">
      <label for="day">曜日を入力：</label>
      <input type="text" id="day" placeholder="例：土曜日、日曜日、月曜日">
    </div>

    <button onclick="checkDay()">判定</button>

    <div id="result"></div>
  </div>

  <script>
    function checkDay() {
      const day = document.getElementById("day").value;
      const result = document.getElementById("result");

      // ❶ 空文字チェック
      if (day === "") {
        result.textContent = "❌ 曜日を入力してください";
        result.className = "error";
        return;
      }

      // ❷ OR演算子で休日判定
      if (day === "土曜日" || day === "日曜日") {
        result.textContent = "🎉 休みです！";
        result.className = "holiday";
      } else {
        result.textContent = "💼 平日です";
        result.className = "weekday";
      }
    }
  </script>
</body>
</html>
```

**ポイント：**
- OR演算子で土曜日または日曜日をチェック
- 空文字チェックを先に実行
- CSSクラスで視覚的に区別

### 例2：割引判定システム

**HTML：**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>割引判定システム</title>
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
    .discount {
      border: 3px solid #28a745;
    }
    .no-discount {
      border: 3px solid #dc3545;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>💰 割引判定システム</h1>

    <div class="form-group">
      <label for="age">年齢：</label>
      <input type="number" id="age" placeholder="年齢を入力">
    </div>

    <div class="form-group">
      <div class="checkbox-group">
        <input type="checkbox" id="student">
        <label for="student">学生ですか？</label>
      </div>
    </div>

    <div class="form-group">
      <div class="checkbox-group">
        <input type="checkbox" id="member">
        <label for="member">会員ですか？</label>
      </div>
    </div>

    <button onclick="checkDiscount()">割引判定</button>

    <div id="result"></div>
  </div>

  <script>
    function checkDiscount() {
      const ageValue = document.getElementById("age").value;
      const isStudent = document.getElementById("student").checked;
      const isMember = document.getElementById("member").checked;
      const result = document.getElementById("result");

      // ❶ 空文字チェック
      if (ageValue === "") {
        result.textContent = "❌ 年齢を入力してください";
        result.className = "no-discount";
        return;
      }

      const age = Number(ageValue);

      // ❷ NaNチェック
      if (isNaN(age)) {
        result.textContent = "❌ 正しい数値を入力してください";
        result.className = "no-discount";
        return;
      }

      // ❸ 範囲チェック
      if (age < 0 || age > 150) {
        result.textContent = "❌ 有効な年齢を入力してください";
        result.className = "no-discount";
        return;
      }

      // ❹ OR演算子で複数の割引条件をチェック
      if (age < 12 || age >= 65 || isStudent || isMember) {
        let reasons = "✅ 割引対象です！\n\n該当条件：\n";

        if (age < 12) {
          reasons += "• 12歳未満\n";
        }
        if (age >= 65) {
          reasons += "• 65歳以上\n";
        }
        if (isStudent) {
          reasons += "• 学生\n";
        }
        if (isMember) {
          reasons += "• 会員\n";
        }

        result.textContent = reasons;
        result.className = "discount";
        result.style.whiteSpace = "pre-line";
      } else {
        result.textContent = "通常料金です";
        result.className = "no-discount";
      }
    }
  </script>
</body>
</html>
```

**ポイント：**
- 4つの条件をOR演算子で連結
- どれか1つでも該当すれば割引対象
- 該当する条件を具体的に表示

### 例3：アクセス権限チェッカー

**HTML：**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>アクセス権限チェッカー</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f0f4f8;
    }
    .container {
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    h1 {
      text-align: center;
      color: #2c3e50;
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
      cursor: pointer;
    }
    label {
      font-weight: bold;
      cursor: pointer;
    }
    button {
      width: 100%;
      padding: 12px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
    }
    button:hover {
      background-color: #2980b9;
    }
    #result {
      margin-top: 20px;
      padding: 15px;
      border-radius: 4px;
      text-align: center;
      font-weight: bold;
    }
    .allowed {
      background-color: #d4edda;
      color: #155724;
      border: 2px solid #c3e6cb;
    }
    .denied {
      background-color: #f8d7da;
      color: #721c24;
      border: 2px solid #f5c6cb;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔐 アクセス権限チェッカー</h1>

    <div class="info">
      <strong>権限:</strong> 管理者、モデレーター、オーナーのいずれかがあればアクセス可能
    </div>

    <div class="form-group">
      <div class="checkbox-group">
        <input type="checkbox" id="admin">
        <label for="admin">管理者（Admin）</label>
      </div>
    </div>

    <div class="form-group">
      <div class="checkbox-group">
        <input type="checkbox" id="moderator">
        <label for="moderator">モデレーター（Moderator）</label>
      </div>
    </div>

    <div class="form-group">
      <div class="checkbox-group">
        <input type="checkbox" id="owner">
        <label for="owner">オーナー（Owner）</label>
      </div>
    </div>

    <button onclick="checkAccess()">アクセスチェック</button>

    <div id="result"></div>
  </div>

  <script>
    function checkAccess() {
      const isAdmin = document.getElementById("admin").checked;
      const isModerator = document.getElementById("moderator").checked;
      const isOwner = document.getElementById("owner").checked;
      const result = document.getElementById("result");

      // ❶ OR演算子で複数の権限をチェック
      if (isAdmin || isModerator || isOwner) {
        let message = "✅ アクセス許可\n\n保有権限：\n";

        if (isAdmin) {
          message += "• 管理者\n";
        }
        if (isModerator) {
          message += "• モデレーター\n";
        }
        if (isOwner) {
          message += "• オーナー\n";
        }

        result.textContent = message;
        result.className = "allowed";
        result.style.whiteSpace = "pre-line";
      } else {
        result.textContent = "❌ アクセス拒否\n\n管理者、モデレーター、オーナーのいずれかの権限が必要です";
        result.className = "denied";
        result.style.whiteSpace = "pre-line";
      }
    }
  </script>
</body>
</html>
```

**ポイント：**
- 3つの権限をOR演算子でチェック
- どれか1つでも権限があればアクセス許可
- 保有している権限を一覧表示

### 例4：入力値範囲外チェッカー

**HTML：**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>範囲外チェッカー</title>
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
    .info {
      background-color: #fff3cd;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 20px;
      border-left: 4px solid #ffc107;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }
    input[type="number"] {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    button {
      width: 100%;
      padding: 12px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 18px;
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
    .valid {
      background-color: #d4edda;
      color: #155724;
      border: 2px solid #c3e6cb;
    }
    .invalid {
      background-color: #f8d7da;
      color: #721c24;
      border: 2px solid #f5c6cb;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 範囲外チェッカー</h1>

    <div class="info">
      <strong>有効範囲：</strong> 1以上100以下の数値
    </div>

    <div class="form-group">
      <label for="number">数値を入力：</label>
      <input type="number" id="number" placeholder="数値を入力">
    </div>

    <button onclick="checkRange()">チェック</button>

    <div id="result"></div>
  </div>

  <script>
    function checkRange() {
      const value = document.getElementById("number").value;
      const result = document.getElementById("result");

      // ❶ 空文字チェック
      if (value === "") {
        result.textContent = "数値を入力してください";
        result.className = "invalid";
        return;
      }

      const num = Number(value);

      // ❷ NaNチェック
      if (isNaN(num)) {
        result.textContent = "正しい数値を入力してください";
        result.className = "invalid";
        return;
      }

      // ❸ OR演算子で範囲外をチェック
      if (num < 1 || num > 100) {
        if (num < 1) {
          result.textContent = `❌ ${num} は範囲外です（1未満）`;
        } else {
          result.textContent = `❌ ${num} は範囲外です（100より大きい）`;
        }
        result.className = "invalid";
      } else {
        result.textContent = `✅ ${num} は有効範囲内です！（1以上100以下）`;
        result.className = "valid";
      }
    }
  </script>
</body>
</html>
```

**ポイント：**
- OR演算子で範囲外（`num < 1 || num > 100`）をチェック
- どちら側に外れているか具体的に表示
- 範囲内の場合は成功メッセージ

---

## 練習問題

### 問題1：支払い方法チェック

支払い方法を入力し、利用可能かどうかを判定するプログラムを作成してください。

**要件：**
- 支払い方法の入力欄（input type="text"）
- チェックボタン
- 結果表示エリア
- 「現金」「クレジットカード」「電子マネー」のいずれかなら「✅ 利用可能です」
- それ以外は「❌ 利用できません」

<details>
<summary>💡 ヒント1：HTMLの構造</summary>

```html
<input type="text" id="payment" placeholder="支払い方法を入力">
<button onclick="checkPayment()">チェック</button>
<div id="result"></div>
```
</details>

<details>
<summary>💡 ヒント2：値の取得と空文字チェック</summary>

```javascript
function checkPayment() {
  const payment = document.getElementById("payment").value;
  const result = document.getElementById("result");

  if (payment === "") {
    result.textContent = "支払い方法を入力してください";
    return;
  }
}
```
</details>

<details>
<summary>💡 ヒント3：OR演算子で複数の選択肢をチェック</summary>

```javascript
if (payment === "現金" || payment === "クレジットカード" || payment === "電子マネー") {
  result.textContent = "✅ 利用可能です";
} else {
  result.textContent = "❌ 利用できません";
}
```
</details>

<details>
<summary>💡 ヒント4：完全な関数</summary>

```javascript
function checkPayment() {
  const payment = document.getElementById("payment").value;
  const result = document.getElementById("result");

  if (payment === "") {
    result.textContent = "支払い方法を入力してください";
    return;
  }

  if (payment === "現金" || payment === "クレジットカード" || payment === "電子マネー") {
    result.textContent = "✅ 利用可能です";
  } else {
    result.textContent = "❌ 利用できません";
  }
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
  <title>支払い方法チェック</title>
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
    .form-group {
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
      box-sizing: border-box;
      border: 2px solid #ddd;
      border-radius: 4px;
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
      padding: 10px;
      text-align: center;
      font-weight: bold;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>💳 支払い方法チェック</h1>

  <div class="form-group">
    <label for="payment">支払い方法：</label>
    <input type="text" id="payment" placeholder="現金、クレジットカード、電子マネー">
  </div>

  <button onclick="checkPayment()">チェック</button>

  <div id="result"></div>

  <script>
    function checkPayment() {
      const payment = document.getElementById("payment").value;
      const result = document.getElementById("result");

      if (payment === "") {
        result.textContent = "支払い方法を入力してください";
        result.style.backgroundColor = "#fff3cd";
        result.style.color = "#856404";
        return;
      }

      if (payment === "現金" || payment === "クレジットカード" || payment === "電子マネー") {
        result.textContent = "✅ 利用可能です";
        result.style.backgroundColor = "#d4edda";
        result.style.color = "#155724";
      } else {
        result.textContent = "❌ 利用できません\n\n利用可能：現金、クレジットカード、電子マネー";
        result.style.backgroundColor = "#f8d7da";
        result.style.color = "#721c24";
        result.style.whiteSpace = "pre-line";
      }
    }
  </script>
</body>
</html>
```
</details>

---

### 問題2：年齢範囲外チェック

年齢を入力し、0〜120の範囲内かどうかを判定するプログラムを作成してください。

**要件：**
- 年齢の入力欄（input type="number"）
- チェックボタン
- 結果表示エリア
- 0未満または120より大きい場合「❌ 範囲外です」
- それ以外は「✅ 有効な年齢です」

<details>
<summary>💡 ヒント1：基本構造</summary>

```html
<input type="number" id="age" placeholder="年齢を入力">
<button onclick="checkAge()">チェック</button>
<div id="result"></div>
```
</details>

<details>
<summary>💡 ヒント2：空文字とNaNのチェック</summary>

```javascript
const ageValue = document.getElementById("age").value;

if (ageValue === "") {
  result.textContent = "年齢を入力してください";
  return;
}

const age = Number(ageValue);

if (isNaN(age)) {
  result.textContent = "正しい数値を入力してください";
  return;
}
```
</details>

<details>
<summary>💡 ヒント3：OR演算子で範囲外をチェック</summary>

```javascript
if (age < 0 || age > 120) {
  result.textContent = "❌ 範囲外です（0〜120の範囲で入力してください）";
} else {
  result.textContent = "✅ 有効な年齢です";
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
  <title>年齢範囲外チェック</title>
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
    .info {
      background-color: #e3f2fd;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 15px;
      text-align: center;
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
      padding: 10px;
      text-align: center;
      font-weight: bold;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>📊 年齢範囲外チェック</h1>

  <div class="info">
    <strong>有効範囲：</strong> 0〜120
  </div>

  <div class="form-group">
    <label for="age">年齢：</label>
    <input type="number" id="age" placeholder="年齢を入力">
  </div>

  <button onclick="checkAge()">チェック</button>

  <div id="result"></div>

  <script>
    function checkAge() {
      const ageValue = document.getElementById("age").value;
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

      // OR演算子で範囲外チェック
      if (age < 0 || age > 120) {
        result.textContent = `❌ ${age} は範囲外です（0〜120の範囲で入力してください）`;
        result.style.backgroundColor = "#f8d7da";
        result.style.color = "#721c24";
      } else {
        result.textContent = `✅ ${age} は有効な年齢です！`;
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

### 問題3：複合条件チェック（ANDとORの組み合わせ）

年齢とチケット所持、会員ステータスをチェックし、入場可否を判定するプログラムを作成してください。

**要件：**
- 年齢の入力欄
- チケット所持チェックボックス
- 会員チェックボックス
- 判定ボタン
- **入場条件：18歳以上 かつ (チケット所持 または 会員)**

<details>
<summary>💡 ヒント1：HTMLの構造</summary>

```html
<input type="number" id="age" placeholder="年齢">
<input type="checkbox" id="ticket"> チケット所持
<input type="checkbox" id="member"> 会員
<button onclick="checkEntry()">判定</button>
<div id="result"></div>
```
</details>

<details>
<summary>💡 ヒント2：値の取得</summary>

```javascript
const ageValue = document.getElementById("age").value;
const hasTicket = document.getElementById("ticket").checked;
const isMember = document.getElementById("member").checked;
```
</details>

<details>
<summary>💡 ヒント3：ANDとORの組み合わせ</summary>

```javascript
// 18歳以上 かつ (チケット所持 または 会員)
if (age >= 18 && (hasTicket || isMember)) {
  result.textContent = "✅ 入場できます";
} else {
  result.textContent = "❌ 入場できません";
}
```
</details>

<details>
<summary>💡 ヒント4：括弧の重要性</summary>

```javascript
// ✅ 正しい（括弧あり）
if (age >= 18 && (hasTicket || isMember)) {
  // age >= 18 かつ (hasTicket または isMember)
}

// ❌ 間違い（括弧なし）
if (age >= 18 && hasTicket || isMember) {
  // (age >= 18 && hasTicket) または isMember
  // 意図と異なる可能性
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
  <title>入場判定システム</title>
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
    <h1>🎫 入場判定システム</h1>

    <div class="info">
      <strong>入場条件：</strong> 18歳以上 かつ (チケット所持 または 会員)
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
        <input type="checkbox" id="member">
        <label for="member">会員ですか？</label>
      </div>
    </div>

    <button onclick="checkEntry()">入場判定</button>

    <div id="result"></div>
  </div>

  <script>
    function checkEntry() {
      const ageValue = document.getElementById("age").value;
      const hasTicket = document.getElementById("ticket").checked;
      const isMember = document.getElementById("member").checked;
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

      // ANDとORの組み合わせ
      if (age >= 18 && (hasTicket || isMember)) {
        result.textContent = "✅ 入場できます！\n\n条件を満たしています";
        result.style.backgroundColor = "#d4edda";
        result.style.color = "#155724";
      } else {
        let message = "❌ 入場できません\n\n";

        if (age < 18) {
          message += "• 18歳以上である必要があります\n";
        }
        if (!hasTicket && !isMember) {
          message += "• チケットまたは会員のいずれかが必要です\n";
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

- [ ] OR演算子（||）の基本的な使い方を理解した
- [ ] 真偽値表を理解し、どちらか一方がtrueならtrueになることを確認した
- [ ] 2つの条件をOR演算子で結合できる
- [ ] 3つ以上の条件もOR演算子で連結できる
- [ ] AND演算子とOR演算子の違いを理解した
- [ ] ショートサーキット評価（短絡評価）の仕組みを理解した
- [ ] OR演算子を使った範囲外チェックができる
- [ ] OR演算子を使ったデフォルト値設定ができる
- [ ] ANDとORを組み合わせた複雑な条件式を書ける
- [ ] 実用的なプログラム（休日判定、割引判定など）を作成できる

---

## デバッグのヒント

OR演算子を使ったプログラムでうまく動かない場合、以下を確認してください。

### ❶ 各条件を個別に確認

```javascript
console.log("day:", day);
console.log("day === '土曜日':", day === "土曜日");
console.log("day === '日曜日':", day === "日曜日");
console.log("結果:", day === "土曜日" || day === "日曜日");
```

**ポイント：** 各条件を個別に出力し、どこが問題か特定する

### ❷ ANDとORの混同を確認

```javascript
// 範囲内チェック（AND）
if (age >= 0 && age <= 100) {
  console.log("範囲内");
}

// 範囲外チェック（OR）
if (age < 0 || age > 100) {
  console.log("範囲外");
}
```

**ポイント：** 範囲内は AND、範囲外は OR を使う

### ❸ 条件式の省略ミスを確認

```javascript
// ❌ 間違い
if (day === "土曜日" || "日曜日") {  // "日曜日" は常にtrue
  console.log(typeof "日曜日");  // "string"（truthyな値）
}

// ✅ 正しい
if (day === "土曜日" || day === "日曜日") {
  console.log("OK");
}
```

### ❹ 括弧の有無を確認

```javascript
const age = 25;
const hasTicket = false;
const isMember = true;

// 括弧なし
console.log(age >= 18 && hasTicket || isMember);
// (age >= 18 && hasTicket) || isMember
// → (true && false) || true
// → false || true
// → true

// 括弧あり
console.log(age >= 18 && (hasTicket || isMember));
// age >= 18 && (hasTicket || isMember)
// → true && (false || true)
// → true && true
// → true
```

### ❺ falsyな値の確認

```javascript
const count = 0;

// デフォルト値設定で注意
console.log(count || 10);  // 10（0はfalsyなので）
console.log(count ?? 10);  // 0（??はnullとundefinedのみチェック）

// falsyな値一覧
console.log(false || "default");     // "default"
console.log(0 || "default");         // "default"
console.log("" || "default");        // "default"
console.log(null || "default");      // "default"
console.log(undefined || "default"); // "default"
console.log(NaN || "default");       // "default"
```

---

## ポイント

- **OR演算子（||）** は、どちらか一方でもtrueならtrueになる
- **両方ともfalseの時だけfalse**になる
- **ショートサーキット評価**：左側がtrueなら右側は評価されない
- **範囲外チェック**に便利（`age < 0 || age > 100`）
- **複数の選択肢**を扱う時に使う
- **デフォルト値の設定**にも使える（`name || "ゲスト"`）
- **ANDとORを組み合わせる**時は括弧で優先順位を明確に
- **falsyな値**（false, 0, "", null, undefined, NaN）に注意

---

## できるようになったこと

このレッスンを通じて、以下のことができるようになりました。

1. **OR演算子（||）の基本を理解**し、複数の選択肢を1行で書ける
2. **真偽値表を読み解き**、OR演算の結果を予測できる
3. **AND演算子との違いを理解**し、適切に使い分けられる
4. **ショートサーキット評価を理解**し、効率的な条件式を書ける
5. **範囲外チェック**を正しく実装できる（`< 0 || > 100`）
6. **複数の割引条件や権限**を柔軟に判定できる
7. **デフォルト値の設定**にOR演算子を活用できる
8. **ANDとORを組み合わせた複雑な条件式**を作成できる

---

## まとめ

このレッスンでは、**OR演算子（||）** を学びました。

1. **OR演算子はどちらか一方でもtrueならtrue**になる
2. **両方ともfalseの時だけfalse**になる
3. **ショートサーキット評価により効率的**に条件を評価できる
4. **範囲外チェック**に便利（`age < 0 || age > 100`）
5. **複数の選択肢や権限**を扱う場面で活躍する
6. **デフォルト値の設定**にも使える（ただしfalsyな値に注意）
7. **ANDとORを組み合わせる**時は括弧で優先順位を明確にする

次のレッスンでは、**NOT演算子（!）** を学び、条件を反転させる方法を学習します。

---

## 次のステップ

**レッスン46：NOT演算（!）**

次のレッスンでは、**NOT演算子（!）** を学びます。

- `!` (NOT) の使い方
- 条件の反転
- 否定形の条件式
- !==（等しくない）との使い分け

**成果物：** NOT演算を使った条件判定プログラム

AND、OR、NOTの3つの論理演算子を組み合わせることで、あらゆる条件判定が可能になります！
