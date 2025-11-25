# レッスン44：AND演算（&&）

## なぜ重要なのか

AND演算（&&）は、**複数の条件をすべて満たす必要がある場面**で使用します。実際のWebサービスでは、非常に多くの場所で使われています。

| サービス | 使用場面 | 条件の例 |
|---------|---------|---------|
| **Amazon** | 購入確定 | カートに商品がある && 支払い方法が設定されている && 配送先が入力されている |
| **Netflix** | コンテンツ視聴 | ログインしている && 年齢制限をクリアしている && サブスク契約が有効 |
| **運転免許証** | 運転可否 | 年齢が18歳以上 && 免許を持っている && 免許が有効期限内 |
| **Twitter** | ツイート投稿 | ログインしている && 文字数が280文字以内 && アカウントが凍結されていない |
| **LINE** | メッセージ送信 | 友達登録されている && ブロックされていない && テキストが入力されている |

**学ぶべき理由：**
- 複数の条件チェックを1行で書ける
- 安全な処理を実現できる（すべての条件を確認）
- コードが読みやすくなる
- 実務で最も頻繁に使う演算子の1つ

---

## 基本概念の説明

### AND演算子（&&）とは

**&&（アンド）** は、**左右の条件が両方ともtrueの時だけtrueになる**演算子です。

```
条件1 && 条件2
```

**真偽値表（Truth Table）：**

```
┌─────────┬─────────┬──────────┐
│ 条件1   │ 条件2   │  結果    │
├─────────┼─────────┼──────────┤
│ true    │ true    │ true  ✅ │
│ true    │ false   │ false ❌ │
│ false   │ true    │ false ❌ │
│ false   │ false   │ false ❌ │
└─────────┴─────────┴──────────┘
```

**重要なポイント：**
- 両方がtrueの時**だけ**trueになる
- どちらか一方でもfalseなら、結果はfalse
- 3つ以上の条件も連結できる

### ネストしたifとの比較

**❌ ネストしたif（読みにくい）：**
```javascript
if (age >= 20) {
  if (hasLicense) {
    console.log("運転できます");
  }
}
```

**✅ AND演算子（読みやすい）：**
```javascript
if (age >= 20 && hasLicense) {
  console.log("運転できます");
}
```

| 比較項目 | ネストしたif | AND演算子（&&） |
|---------|-------------|----------------|
| **行数** | 5行 | 3行 |
| **インデント** | 2段階 | 1段階 |
| **読みやすさ** | △ | ◎ |
| **処理速度** | 同じ | 同じ |
| **実務での使用** | 少ない | 多い |

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
  false    true
    │       │
    │   ┌───┴────┐
    │   │ 条件2を│
    │   │ 評価   │
    │   └───┬────┘
    │       │
    │   ┌───┴───┐
    │   │       │
    │ false    true
    │   │       │
    └───┼───────┤
        │       │
    ┌───┴───┐┌──┴───┐
    │ false ││ true │
    │ を返す││を返す│
    └───────┘└──────┘
```

### 実際の例：運転免許チェック

```javascript
const age = 22;
const hasLicense = true;

if (age >= 20 && hasLicense) {
  console.log("運転できます");
}
```

**評価の流れ：**

```
ステップ1: age >= 20 を評価
          22 >= 20
          → true ✅

ステップ2: hasLicense を評価
          → true ✅

ステップ3: true && true を評価
          → true ✅

結果: if文の中身が実行される
     「運転できます」と表示
```

### ショートサーキット評価（短絡評価）

**重要な特性：** 左側の条件がfalseなら、右側は評価されない

```javascript
const age = 15;
const hasLicense = true;

if (age >= 20 && hasLicense) {  // age >= 20 が false
  console.log("運転できます");   // ここは実行されない
}
```

**評価の流れ：**

```
ステップ1: age >= 20 を評価
          15 >= 20
          → false ❌

ステップ2: 左側がfalseなので、
          右側（hasLicense）は評価されない
          （評価する必要がない）

結果: if文の中身は実行されない
```

この仕組みを**ショートサーキット評価**と呼びます。

---

## 詳細解説

### ❶ 基本的な使い方

**2つの条件をチェック：**

```javascript
const age = 25;
const hasLicense = true;

if (age >= 20 && hasLicense) {
  console.log("運転できます");
} else {
  console.log("運転できません");
}
```

| age | hasLicense | age >= 20 | 結果 | 出力 |
|-----|-----------|-----------|------|------|
| 25 | true | true | true && true = **true** | "運転できます" |
| 18 | true | false | false && true = **false** | "運転できません" |
| 25 | false | true | true && false = **false** | "運転できません" |
| 18 | false | false | false && false = **false** | "運転できません" |

**ポイント：**
- 両方の条件がtrueの時だけ、最初のメッセージが表示される
- どちらか一方でもfalseなら、else部分が実行される

### ❷ 3つ以上の条件

AND演算子は、3つ以上の条件も連結できます。

```javascript
const age = 25;
const hasLicense = true;
const hasInsurance = true;

if (age >= 20 && hasLicense && hasInsurance) {
  console.log("運転できます");
} else {
  console.log("運転できません");
}
```

**評価の流れ：**

```
(age >= 20) && hasLicense && hasInsurance
    ↓
   true    &&    true    && hasInsurance
              ↓
            true         &&    true
                    ↓
                  true  ✅
```

**真偽値表（3つの条件）：**

| 条件1 | 条件2 | 条件3 | 結果 |
|------|------|------|------|
| true | true | true | **true** ✅ |
| true | true | false | false ❌ |
| true | false | true | false ❌ |
| true | false | false | false ❌ |
| false | true | true | false ❌ |
| false | true | false | false ❌ |
| false | false | true | false ❌ |
| false | false | false | false ❌ |

**ポイント：** すべてtrueの時だけtrueになる

### ❸ ユーザー入力との組み合わせ

実際のWebアプリケーションでは、ユーザー入力の検証に使います。

```javascript
function checkEntry() {
  const ageValue = document.getElementById("age").value;
  const hasTicket = document.getElementById("ticket").checked;
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

  // 複数条件チェック
  if (age >= 18 && hasTicket) {
    result.textContent = "✅ 入場できます";
  } else {
    result.textContent = "❌ 入場できません";
  }
}
```

**検証の流れ：**

```
1. 空文字チェック
   ↓
2. NaNチェック
   ↓
3. 複合条件チェック（age >= 18 && hasTicket）
   ↓
4. 結果表示
```

### ❹ 比較演算子との組み合わせ

AND演算子は、様々な比較演算子と組み合わせて使えます。

```javascript
const score = 75;
const attendance = 90;

// 範囲チェック + 別の条件
if (score >= 60 && attendance >= 80) {
  console.log("合格です");
}

// 複数の範囲チェック
if (score >= 0 && score <= 100) {
  console.log("スコアは有効範囲内です");
}

// 不等号との組み合わせ
if (age > 20 && age < 65) {
  console.log("成人です");
}

// 等価演算子との組み合わせ
if (name !== "" && age >= 18) {
  console.log("登録できます");
}
```

**使える比較演算子：**

| 演算子 | 意味 | 例 |
|-------|------|-----|
| `>=` | 以上 | `age >= 20` |
| `<=` | 以下 | `age <= 65` |
| `>` | より大きい | `score > 60` |
| `<` | より小さい | `age < 18` |
| `===` | 等しい | `name === "太郎"` |
| `!==` | 等しくない | `name !== ""` |

### ❺ ネストしたifとの使い分け

**AND演算子を使うべき場合：**

```javascript
// ✅ 両方の条件が同じレベルで重要な場合
if (age >= 20 && hasLicense) {
  console.log("運転できます");
}
```

**ネストしたifを使うべき場合：**

```javascript
// ✅ 最初の条件で異なるメッセージを表示したい場合
if (age >= 20) {
  if (hasLicense) {
    console.log("運転できます");
  } else {
    console.log("免許を取得してください");
  }
} else {
  console.log("20歳になってから免許を取得してください");
}
```

| 状況 | 推奨 |
|------|------|
| 両方の条件が必須で、同じレベル | **AND演算子** |
| 条件ごとに異なるメッセージを表示 | **ネストしたif** |
| 3つ以上の条件をすべて満たす必要 | **AND演算子** |
| 複雑な分岐処理 | **ネストしたif** |

### ❻ ショートサーキット評価の活用

左側がfalseの場合、右側の条件は評価されません。この性質を活用できます。

```javascript
// 例：配列が存在し、かつ要素数が0より大きい場合
if (items && items.length > 0) {
  console.log("アイテムがあります");
}
```

**評価の流れ：**

```
ケース1: items が null または undefined の場合
  items → false
  右側（items.length > 0）は評価されない
  → エラーが発生しない ✅

ケース2: items が存在する場合
  items → true
  items.length > 0 を評価
  → 安全にlengthプロパティにアクセスできる ✅
```

**メリット：**
- エラーを防げる
- 安全なコードが書ける
- パフォーマンスが向上する（不要な評価をスキップ）

### ❼ 実用的なパターン

**パターン1：範囲チェック**

```javascript
// 18歳以上65歳未満
if (age >= 18 && age < 65) {
  console.log("成人です");
}
```

**パターン2：複数の入力チェック**

```javascript
// すべての入力が空でないことを確認
if (name !== "" && email !== "" && password !== "") {
  console.log("登録処理を実行");
}
```

**パターン3：権限チェック**

```javascript
// ログイン済みで、かつ管理者権限がある
if (isLoggedIn && isAdmin) {
  console.log("管理画面にアクセスできます");
}
```

**パターン4：範囲内チェック**

```javascript
// 0以上100以下
if (score >= 0 && score <= 100) {
  console.log("有効なスコアです");
}
```

### ❽ 優先順位と括弧

**演算子の優先順位：**

```
1. 括弧 ()
2. 比較演算子 (>, <, >=, <=, ===, !==)
3. AND演算子 (&&)
4. OR演算子 (||)
```

**例：**

```javascript
// 優先順位により、以下のように評価される
if (age >= 20 && hasLicense || isInstructor) {
  console.log("運転できます");
}

// 実際の評価順序：
// 1. age >= 20 を評価
// 2. 結果 && hasLicense を評価
// 3. 結果 || isInstructor を評価
```

**括弧で明示的にする（推奨）：**

```javascript
// 括弧を使って意図を明確にする
if ((age >= 20 && hasLicense) || isInstructor) {
  console.log("運転できます");
}
```

**ポイント：**
- 括弧を使うとコードの意図が明確になる
- 複雑な条件式では括弧を使うことを推奨
- 可読性が向上する

---

## よくある間違い

### ❌ 間違い1：ANDではなくORを使ってしまう

**間違ったコード：**
```javascript
const age = 25;
const hasLicense = false;

if (age >= 20 || hasLicense) {  // || (OR) を使用
  console.log("運転できます");  // 実行されてしまう ❌
}
```

**理由：** ORは「どちらか一方でもtrueならtrue」なので、年齢だけで条件を満たしてしまう

**正しいコード：**
```javascript
const age = 25;
const hasLicense = false;

if (age >= 20 && hasLicense) {  // && (AND) を使用
  console.log("運転できます");  // 実行されない ✅
} else {
  console.log("免許が必要です");  // これが実行される
}
```

### ❌ 間違い2：条件式を省略してしまう

**間違ったコード：**
```javascript
const age = 25;

if (age >= 20 && <= 65) {  // 構文エラー ❌
  console.log("成人です");
}
```

**理由：** `<= 65` は不完全な式で、何と比較するのか不明

**正しいコード：**
```javascript
const age = 25;

if (age >= 20 && age <= 65) {  // age を再度記述 ✅
  console.log("成人です");
}
```

**ポイント：** 各条件式は完全な形で記述する必要がある

### ❌ 間違い3：文字列の比較で型変換を忘れる

**間違ったコード：**
```javascript
const ageValue = "25";  // 文字列

if (ageValue >= 20 && ageValue <= 65) {
  console.log("成人です");  // 期待通りに動作しない可能性 ❌
}
```

**理由：** 文字列の比較は辞書順になり、数値比較と結果が異なる場合がある

```javascript
"25" >= "20"  // true（たまたま正しい）
"9" >= "20"   // true（辞書順では "9" > "2" なので）❌
```

**正しいコード：**
```javascript
const ageValue = "25";
const age = Number(ageValue);  // 数値に変換

if (age >= 20 && age <= 65) {
  console.log("成人です");  // 正しく動作 ✅
}
```

### ❌ 間違い4：NaNのチェックを忘れる

**間違ったコード：**
```javascript
const ageValue = "abc";
const age = Number(ageValue);  // NaN

if (age >= 20 && age <= 65) {
  console.log("成人です");  // 実行されない（良いが、エラーメッセージもない）
}
```

**理由：** NaNとの比較は常にfalseになるが、ユーザーに何が問題か伝わらない

**正しいコード：**
```javascript
const ageValue = "abc";
const age = Number(ageValue);

if (isNaN(age)) {
  console.log("正しい数値を入力してください");  // エラーメッセージ ✅
} else if (age >= 20 && age <= 65) {
  console.log("成人です");
}
```

### ❌ 間違い5：チェックボックスの値を直接使う

**間違ったコード：**
```javascript
const hasLicense = document.getElementById("license").value;  // "on" or ""

if (age >= 20 && hasLicense) {  // hasLicenseは文字列 ❌
  console.log("運転できます");
}
```

**理由：** チェックボックスの `value` は文字列で、空文字（""）もtruthyとして扱われる可能性

**正しいコード：**
```javascript
const hasLicense = document.getElementById("license").checked;  // true or false

if (age >= 20 && hasLicense) {  // 正しく真偽値を評価 ✅
  console.log("運転できます");
}
```

**ポイント：** チェックボックスには `.checked` プロパティを使う

### ❌ 間違い6：否定条件の組み合わせミス

**間違ったコード：**
```javascript
const name = "";
const age = 17;

if (name !== "" && age >= 18) {
  console.log("登録できます");
} else {
  console.log("登録できません");  // どちらが問題か分からない ❌
}
```

**理由：** エラーメッセージが具体的でなく、ユーザーが何を修正すべきか分からない

**正しいコード：**
```javascript
const name = "";
const age = 17;

if (name === "") {
  console.log("❌ 名前を入力してください");  // 具体的 ✅
} else if (age < 18) {
  console.log("❌ 18歳以上である必要があります");  // 具体的 ✅
} else {
  console.log("✅ 登録できます");
}
```

**ポイント：** 条件を分けることで、より具体的なエラーメッセージを表示できる

---

## 実用例

### 例1：ログインフォーム

**HTML：**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ログインフォーム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input[type="text"],
    input[type="password"] {
      width: 100%;
      padding: 8px;
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
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background-color: #0056b3;
    }
    #message {
      margin-top: 15px;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
      font-weight: bold;
    }
    .success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
    .error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
  </style>
</head>
<body>
  <h1>ログイン</h1>

  <div class="form-group">
    <label for="username">ユーザー名：</label>
    <input type="text" id="username" placeholder="ユーザー名を入力">
  </div>

  <div class="form-group">
    <label for="password">パスワード：</label>
    <input type="password" id="password" placeholder="パスワードを入力">
  </div>

  <button onclick="login()">ログイン</button>

  <div id="message"></div>

  <script>
    function login() {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const message = document.getElementById("message");

      // ❶ 両方入力されているかチェック
      if (username !== "" && password !== "") {
        // ❷ さらに、最小文字数をチェック
        if (username.length >= 3 && password.length >= 6) {
          message.textContent = "✅ ログインに成功しました！";
          message.className = "success";
        } else {
          message.textContent = "❌ ユーザー名は3文字以上、パスワードは6文字以上必要です";
          message.className = "error";
        }
      } else {
        message.textContent = "❌ ユーザー名とパスワードを入力してください";
        message.className = "error";
      }
    }
  </script>
</body>
</html>
```

**ポイント：**
- 2段階のANDチェック：まず両方入力されているか、次に文字数を確認
- 具体的なエラーメッセージを表示
- CSSで成功・失敗を視覚的に表現

### 例2：運転免許チェッカー

**HTML：**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>運転免許チェッカー</title>
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
      font-size: 18px;
      font-weight: bold;
    }
    .can-drive {
      background-color: #d4edda;
      color: #155724;
      border: 2px solid #c3e6cb;
    }
    .cannot-drive {
      background-color: #f8d7da;
      color: #721c24;
      border: 2px solid #f5c6cb;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚗 運転免許チェッカー</h1>

    <div class="form-group">
      <label for="age">年齢：</label>
      <input type="number" id="age" placeholder="年齢を入力">
    </div>

    <div class="form-group">
      <div class="checkbox-group">
        <input type="checkbox" id="license">
        <label for="license">運転免許を持っていますか？</label>
      </div>
    </div>

    <button onclick="checkDriving()">チェック</button>

    <div id="result"></div>
  </div>

  <script>
    function checkDriving() {
      const ageValue = document.getElementById("age").value;
      const hasLicense = document.getElementById("license").checked;
      const result = document.getElementById("result");

      // ❶ 空文字チェック
      if (ageValue === "") {
        result.textContent = "❌ 年齢を入力してください";
        result.className = "cannot-drive";
        return;
      }

      const age = Number(ageValue);

      // ❷ NaNチェック
      if (isNaN(age)) {
        result.textContent = "❌ 正しい数値を入力してください";
        result.className = "cannot-drive";
        return;
      }

      // ❸ 範囲チェック
      if (age < 0 || age > 150) {
        result.textContent = "❌ 有効な年齢を入力してください";
        result.className = "cannot-drive";
        return;
      }

      // ❹ AND演算子で複合条件チェック
      if (age >= 18 && hasLicense) {
        result.textContent = "✅ 運転できます！";
        result.className = "can-drive";
      } else if (age < 18) {
        result.textContent = "❌ 18歳以上である必要があります";
        result.className = "cannot-drive";
      } else {
        result.textContent = "❌ 運転免許を取得してください";
        result.className = "cannot-drive";
      }
    }
  </script>
</body>
</html>
```

**ポイント：**
- 段階的な検証：空文字 → NaN → 範囲 → 複合条件
- チェックボックスは `.checked` プロパティを使用
- 具体的なエラーメッセージで、何が不足しているか明示

### 例3：イベント参加資格チェック

**HTML：**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>イベント参加資格チェック</title>
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
    .eligible {
      border: 3px solid #28a745;
    }
    .not-eligible {
      border: 3px solid #dc3545;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎉 イベント参加資格チェック</h1>

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
        <input type="checkbox" id="consent">
        <label for="consent">利用規約に同意しますか？</label>
      </div>
    </div>

    <button onclick="checkEligibility()">参加資格をチェック</button>

    <div id="result"></div>
  </div>

  <script>
    function checkEligibility() {
      const ageValue = document.getElementById("age").value;
      const hasTicket = document.getElementById("ticket").checked;
      const hasConsent = document.getElementById("consent").checked;
      const result = document.getElementById("result");

      // ❶ 空文字チェック
      if (ageValue === "") {
        result.textContent = "❌ 年齢を入力してください";
        result.className = "not-eligible";
        return;
      }

      const age = Number(ageValue);

      // ❷ NaNチェック
      if (isNaN(age)) {
        result.textContent = "❌ 正しい数値を入力してください";
        result.className = "not-eligible";
        return;
      }

      // ❸ 3つの条件をすべてチェック（AND演算子）
      if (age >= 18 && hasTicket && hasConsent) {
        result.textContent = "✅ イベントに参加できます！ご来場をお待ちしております。";
        result.className = "eligible";
      } else {
        // ❹ 具体的に何が不足しているか表示
        let message = "❌ 参加できません。以下を確認してください：\n\n";

        if (age < 18) {
          message += "• 18歳以上である必要があります\n";
        }
        if (!hasTicket) {
          message += "• チケットが必要です\n";
        }
        if (!hasConsent) {
          message += "• 利用規約への同意が必要です\n";
        }

        result.textContent = message;
        result.className = "not-eligible";
        result.style.whiteSpace = "pre-line";  // 改行を反映
      }
    }
  </script>
</body>
</html>
```

**ポイント：**
- 3つの条件すべてをAND演算子でチェック
- 不足している条件を具体的にリストアップ
- `\n` を使った改行と `white-space: pre-line` でメッセージを整形

### 例4：数値範囲チェッカー

**HTML：**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>数値範囲チェッカー</title>
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
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #34495e;
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
    .in-range {
      background-color: #d4edda;
      color: #155724;
      border: 2px solid #c3e6cb;
    }
    .out-of-range {
      background-color: #fff3cd;
      color: #856404;
      border: 2px solid #ffeaa7;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 数値範囲チェッカー</h1>

    <div class="info">
      <strong>チェック範囲：</strong> 10以上50以下の数値
    </div>

    <div class="form-group">
      <label for="number">数値を入力：</label>
      <input type="number" id="number" placeholder="数値を入力">
    </div>

    <button onclick="checkRange()">範囲をチェック</button>

    <div id="result"></div>
  </div>

  <script>
    function checkRange() {
      const value = document.getElementById("number").value;
      const result = document.getElementById("result");

      // ❶ 空文字チェック
      if (value === "") {
        result.textContent = "数値を入力してください";
        result.className = "out-of-range";
        return;
      }

      const num = Number(value);

      // ❷ NaNチェック
      if (isNaN(num)) {
        result.textContent = "正しい数値を入力してください";
        result.className = "out-of-range";
        return;
      }

      // ❸ AND演算子で範囲チェック
      if (num >= 10 && num <= 50) {
        result.textContent = `✅ ${num} は範囲内です！（10以上50以下）`;
        result.className = "in-range";
      } else if (num < 10) {
        result.textContent = `❌ ${num} は範囲外です（10未満）`;
        result.className = "out-of-range";
      } else {
        result.textContent = `❌ ${num} は範囲外です（50より大きい）`;
        result.className = "out-of-range";
      }
    }
  </script>
</body>
</html>
```

**ポイント：**
- AND演算子で範囲チェック（`num >= 10 && num <= 50`）
- 範囲外の場合、どちら側に外れているか明示
- テンプレートリテラルで動的なメッセージを生成

---

## 練習問題

### 問題1：会員登録チェック

年齢が18歳以上で、かつ利用規約に同意している場合のみ「登録できます」と表示するプログラムを作成してください。

**要件：**
- 年齢の入力欄（input type="number"）
- 利用規約への同意チェックボックス
- チェックボタン
- 結果表示エリア
- 両方の条件を満たす場合のみ「✅ 登録できます」と表示
- それ以外は「❌ 登録できません」と表示

<details>
<summary>💡 ヒント1：HTMLの構造</summary>

年齢の入力欄とチェックボックス、ボタンが必要です。

```html
<input type="number" id="age">
<input type="checkbox" id="agree">
<button onclick="checkRegistration()">チェック</button>
<div id="result"></div>
```
</details>

<details>
<summary>💡 ヒント2：値の取得</summary>

年齢は `value` プロパティ、チェックボックスは `checked` プロパティを使います。

```javascript
const ageValue = document.getElementById("age").value;
const hasAgreed = document.getElementById("agree").checked;
```
</details>

<details>
<summary>💡 ヒント3：空文字チェック</summary>

年齢が入力されているかをまず確認します。

```javascript
if (ageValue === "") {
  result.textContent = "年齢を入力してください";
  return;
}
```
</details>

<details>
<summary>💡 ヒント4：数値変換</summary>

文字列を数値に変換し、NaNチェックを行います。

```javascript
const age = Number(ageValue);

if (isNaN(age)) {
  result.textContent = "正しい数値を入力してください";
  return;
}
```
</details>

<details>
<summary>💡 ヒント5：AND演算子の使用</summary>

年齢が18歳以上で、かつ同意している場合を判定します。

```javascript
if (age >= 18 && hasAgreed) {
  // 登録できる
} else {
  // 登録できない
}
```
</details>

<details>
<summary>💡 ヒント6：完全な関数</summary>

すべての要素を組み合わせます。

```javascript
function checkRegistration() {
  const ageValue = document.getElementById("age").value;
  const hasAgreed = document.getElementById("agree").checked;
  const result = document.getElementById("result");

  if (ageValue === "") {
    result.textContent = "年齢を入力してください";
    return;
  }

  const age = Number(ageValue);

  if (isNaN(age)) {
    result.textContent = "正しい数値を入力してください";
    return;
  }

  if (age >= 18 && hasAgreed) {
    result.textContent = "✅ 登録できます";
  } else {
    result.textContent = "❌ 登録できません";
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
  <title>会員登録チェック</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
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
      padding: 8px;
      box-sizing: border-box;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    #result {
      margin-top: 15px;
      padding: 10px;
      text-align: center;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>会員登録チェック</h1>

  <div class="form-group">
    <label for="age">年齢：</label>
    <input type="number" id="age" placeholder="年齢を入力">
  </div>

  <div class="form-group">
    <div class="checkbox-group">
      <input type="checkbox" id="agree">
      <label for="agree">利用規約に同意する</label>
    </div>
  </div>

  <button onclick="checkRegistration()">チェック</button>

  <div id="result"></div>

  <script>
    function checkRegistration() {
      const ageValue = document.getElementById("age").value;
      const hasAgreed = document.getElementById("agree").checked;
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

      if (age >= 18 && hasAgreed) {
        result.textContent = "✅ 登録できます";
        result.style.backgroundColor = "#d4edda";
        result.style.color = "#155724";
      } else {
        result.textContent = "❌ 登録できません";
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

### 問題2：パスワード強度チェック

パスワードが8文字以上で、かつ数字を含む場合に「強力なパスワードです」と表示するプログラムを作成してください。

**要件：**
- パスワード入力欄
- チェックボタン
- 結果表示エリア
- 8文字以上で数字を含む場合「✅ 強力なパスワードです」
- それ以外は「❌ 弱いパスワードです」

**ヒント：** 文字列に数字が含まれているかは、`/[0-9]/` という正規表現と `.test()` メソッドで判定できます。

```javascript
const hasNumber = /[0-9]/.test(password);
```

<details>
<summary>💡 ヒント1：基本構造</summary>

```html
<input type="password" id="password">
<button onclick="checkPassword()">チェック</button>
<div id="result"></div>
```
</details>

<details>
<summary>💡 ヒント2：値の取得と空文字チェック</summary>

```javascript
function checkPassword() {
  const password = document.getElementById("password").value;
  const result = document.getElementById("result");

  if (password === "") {
    result.textContent = "パスワードを入力してください";
    return;
  }
}
```
</details>

<details>
<summary>💡 ヒント3：文字数チェック</summary>

```javascript
const isLongEnough = password.length >= 8;
```
</details>

<details>
<summary>💡 ヒント4：数字を含むかチェック</summary>

```javascript
const hasNumber = /[0-9]/.test(password);
```
</details>

<details>
<summary>💡 ヒント5：AND演算子で判定</summary>

```javascript
if (isLongEnough && hasNumber) {
  result.textContent = "✅ 強力なパスワードです";
} else {
  result.textContent = "❌ 弱いパスワードです";
}
```
</details>

<details>
<summary>💡 ヒント6：詳細なフィードバック</summary>

何が不足しているかを具体的に表示します。

```javascript
if (isLongEnough && hasNumber) {
  result.textContent = "✅ 強力なパスワードです";
} else {
  let message = "❌ 弱いパスワードです\n";
  if (!isLongEnough) {
    message += "• 8文字以上必要です\n";
  }
  if (!hasNumber) {
    message += "• 数字を含める必要があります\n";
  }
  result.textContent = message;
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
  <title>パスワード強度チェック</title>
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
    input[type="password"] {
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
      font-size: 16px;
    }
    button:hover {
      background-color: #218838;
    }
    #result {
      margin-top: 15px;
      padding: 15px;
      border-radius: 4px;
      font-weight: bold;
      white-space: pre-line;
    }
    .strong {
      background-color: #d4edda;
      color: #155724;
      border: 2px solid #c3e6cb;
    }
    .weak {
      background-color: #f8d7da;
      color: #721c24;
      border: 2px solid #f5c6cb;
    }
  </style>
</head>
<body>
  <h1>🔒 パスワード強度チェック</h1>

  <div class="form-group">
    <label for="password">パスワード：</label>
    <input type="password" id="password" placeholder="パスワードを入力">
  </div>

  <button onclick="checkPassword()">強度をチェック</button>

  <div id="result"></div>

  <script>
    function checkPassword() {
      const password = document.getElementById("password").value;
      const result = document.getElementById("result");

      if (password === "") {
        result.textContent = "パスワードを入力してください";
        result.className = "weak";
        return;
      }

      // ❶ 8文字以上かチェック
      const isLongEnough = password.length >= 8;

      // ❷ 数字を含むかチェック
      const hasNumber = /[0-9]/.test(password);

      // ❸ AND演算子で両方の条件をチェック
      if (isLongEnough && hasNumber) {
        result.textContent = "✅ 強力なパスワードです！";
        result.className = "strong";
      } else {
        let message = "❌ 弱いパスワードです\n\n改善点：\n";

        if (!isLongEnough) {
          message += `• 8文字以上必要です（現在：${password.length}文字）\n`;
        }
        if (!hasNumber) {
          message += "• 数字を含める必要があります\n";
        }

        result.textContent = message;
        result.className = "weak";
      }
    }
  </script>
</body>
</html>
```
</details>

---

### 問題3：試験合格判定

数学と英語の点数を入力し、**両方とも60点以上**の場合に「合格」と表示するプログラムを作成してください。

**要件：**
- 数学の点数入力欄
- 英語の点数入力欄
- 判定ボタン
- 結果表示エリア
- 両方60点以上で「✅ 合格です」
- それ以外は「❌ 不合格です」

<details>
<summary>💡 ヒント1：2つの入力欄</summary>

```html
<input type="number" id="math" placeholder="数学の点数">
<input type="number" id="english" placeholder="英語の点数">
<button onclick="checkResult()">判定</button>
<div id="result"></div>
```
</details>

<details>
<summary>💡 ヒント2：値の取得</summary>

```javascript
const mathValue = document.getElementById("math").value;
const englishValue = document.getElementById("english").value;
```
</details>

<details>
<summary>💡 ヒント3：空文字チェック（両方）</summary>

```javascript
if (mathValue === "" || englishValue === "") {
  result.textContent = "両方の点数を入力してください";
  return;
}
```
</details>

<details>
<summary>💡 ヒント4：数値変換とNaNチェック</summary>

```javascript
const math = Number(mathValue);
const english = Number(englishValue);

if (isNaN(math) || isNaN(english)) {
  result.textContent = "正しい数値を入力してください";
  return;
}
```
</details>

<details>
<summary>💡 ヒント5：AND演算子で判定</summary>

```javascript
if (math >= 60 && english >= 60) {
  result.textContent = "✅ 合格です";
} else {
  result.textContent = "❌ 不合格です";
}
```
</details>

<details>
<summary>💡 ヒント6：詳細なフィードバック</summary>

どちらが基準に達していないか表示します。

```javascript
if (math >= 60 && english >= 60) {
  result.textContent = `✅ 合格です！\n数学：${math}点\n英語：${english}点`;
} else {
  let message = "❌ 不合格です\n\n";
  if (math < 60) {
    message += `数学：${math}点（60点未満）\n`;
  } else {
    message += `数学：${math}点 ✅\n`;
  }
  if (english < 60) {
    message += `英語：${english}点（60点未満）\n`;
  } else {
    message += `英語：${english}点 ✅\n`;
  }
  result.textContent = message;
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
  <title>試験合格判定</title>
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
      padding: 20px;
      border-radius: 4px;
      text-align: center;
      font-weight: bold;
      white-space: pre-line;
    }
    .pass {
      background-color: #d4edda;
      color: #155724;
      border: 2px solid #c3e6cb;
    }
    .fail {
      background-color: #f8d7da;
      color: #721c24;
      border: 2px solid #f5c6cb;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📝 試験合格判定</h1>

    <div class="form-group">
      <label for="math">数学の点数：</label>
      <input type="number" id="math" placeholder="0〜100">
    </div>

    <div class="form-group">
      <label for="english">英語の点数：</label>
      <input type="number" id="english" placeholder="0〜100">
    </div>

    <button onclick="checkResult()">判定</button>

    <div id="result"></div>
  </div>

  <script>
    function checkResult() {
      const mathValue = document.getElementById("math").value;
      const englishValue = document.getElementById("english").value;
      const result = document.getElementById("result");

      // ❶ 空文字チェック
      if (mathValue === "" || englishValue === "") {
        result.textContent = "両方の点数を入力してください";
        result.className = "fail";
        return;
      }

      const math = Number(mathValue);
      const english = Number(englishValue);

      // ❷ NaNチェック
      if (isNaN(math) || isNaN(english)) {
        result.textContent = "正しい数値を入力してください";
        result.className = "fail";
        return;
      }

      // ❸ 範囲チェック
      if (math < 0 || math > 100 || english < 0 || english > 100) {
        result.textContent = "点数は0〜100の範囲で入力してください";
        result.className = "fail";
        return;
      }

      // ❹ AND演算子で合格判定
      if (math >= 60 && english >= 60) {
        result.textContent = `✅ 合格です！\n\n数学：${math}点 ✅\n英語：${english}点 ✅\n\nおめでとうございます！`;
        result.className = "pass";
      } else {
        let message = "❌ 不合格です\n\n";

        if (math < 60) {
          message += `数学：${math}点（あと${60 - math}点必要）\n`;
        } else {
          message += `数学：${math}点 ✅\n`;
        }

        if (english < 60) {
          message += `英語：${english}点（あと${60 - english}点必要）\n`;
        } else {
          message += `英語：${english}点 ✅\n`;
        }

        message += "\n合格基準：両方とも60点以上";

        result.textContent = message;
        result.className = "fail";
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

- [ ] AND演算子（&&）の基本的な使い方を理解した
- [ ] 真偽値表を理解し、両方trueの時だけtrueになることを確認した
- [ ] 2つの条件をAND演算子で結合できる
- [ ] 3つ以上の条件もAND演算子で連結できる
- [ ] ネストしたifとAND演算子の違いを理解した
- [ ] ショートサーキット評価（短絡評価）の仕組みを理解した
- [ ] チェックボックスの値を`.checked`で取得できる
- [ ] 複数の入力を組み合わせた検証ができる
- [ ] 具体的なエラーメッセージを表示できる
- [ ] 実用的なプログラム（ログイン、資格チェックなど）を作成できる

---

## デバッグのヒント

AND演算子を使ったプログラムでうまく動かない場合、以下を確認してください。

### ❶ 各条件を個別に確認

```javascript
console.log("age:", age);
console.log("age >= 20:", age >= 20);
console.log("hasLicense:", hasLicense);
console.log("結果:", age >= 20 && hasLicense);
```

**ポイント：** 各条件を個別に出力し、どこが問題か特定する

### ❷ 型を確認

```javascript
console.log(typeof ageValue);  // "string"
console.log(typeof age);       // "number"
console.log(typeof hasLicense); // "boolean"
```

**ポイント：** 文字列と数値を混同していないか確認

### ❸ チェックボックスの値を確認

```javascript
// ❌ 間違い
const hasLicense = document.getElementById("license").value;
console.log(hasLicense);  // "on" または ""

// ✅ 正しい
const hasLicense = document.getElementById("license").checked;
console.log(hasLicense);  // true または false
```

### ❹ NaNの確認

```javascript
const age = Number("abc");
console.log(age);  // NaN
console.log(age >= 20);  // false（NaNとの比較は常にfalse）
console.log(isNaN(age));  // true
```

### ❺ 演算子のタイプミス

```javascript
// ❌ 間違い
if (age >= 20 & hasLicense) {  // & (ビット演算子) ではない

// ✅ 正しい
if (age >= 20 && hasLicense) {  // && (論理AND)
```

**ポイント：** `&` と `&&` を間違えない（`&` はビット演算子）

---

## ポイント

- **AND演算子（&&）** は、両方の条件がtrueの時だけtrueになる
- **すべての条件を満たす必要がある場面**で使用する
- **ネストしたifよりも読みやすく、簡潔**に書ける
- **ショートサーキット評価**：左側がfalseなら右側は評価されない
- **チェックボックスは`.checked`** で真偽値を取得する
- **3つ以上の条件**も連結できる（すべてtrueの時だけtrue）
- **実務では頻繁に使用**される（ログイン、権限チェック、バリデーションなど）
- **括弧を使って意図を明確**にすることが推奨される
- **具体的なエラーメッセージ**で、何が不足しているかユーザーに伝える

---

## できるようになったこと

このレッスンを通じて、以下のことができるようになりました。

1. **AND演算子（&&）の基本を理解**し、複数の条件を1行で書ける
2. **真偽値表を読み解き**、AND演算の結果を予測できる
3. **ネストしたifとの違いを理解**し、適切に使い分けられる
4. **ショートサーキット評価を理解**し、効率的な条件式を書ける
5. **チェックボックスの値を正しく取得**できる（`.checked`）
6. **複数の入力を組み合わせた検証**プログラムを作成できる
7. **具体的なエラーメッセージ**を表示し、ユーザビリティを向上させられる
8. **実用的なプログラム**（ログインフォーム、資格チェッカーなど）を作成できる

---

## まとめ

このレッスンでは、**AND演算子（&&）** を学びました。

1. **AND演算子は両方の条件がtrueの時だけtrue**になる
2. **複数の条件をすべて満たす必要がある場面**で使用する
3. **ネストしたifよりも簡潔で読みやすい**コードが書ける
4. **ショートサーキット評価により効率的**に条件を評価できる
5. **チェックボックスは`.checked`** で真偽値を取得する
6. **3つ以上の条件も連結**でき、すべてtrueの時だけtrueになる
7. **実務で頻繁に使用**され、ログインや権限チェックなどで不可欠

次のレッスンでは、**OR演算子（||）** を学び、「どちらか一方でも満たせばtrue」になる条件式を学習します。

---

## 次のステップ

**レッスン45：OR演算（||）**

次のレッスンでは、**OR演算子（||）** を学びます。

- `||` (OR) の使い方
- どちらか一方でもtrueならtrue
- ANDとORの組み合わせ
- 複雑な条件式の作り方

**成果物：** OR演算を使った条件判定プログラム

AND演算子とOR演算子を組み合わせることで、より複雑で実用的な条件判定ができるようになります！
