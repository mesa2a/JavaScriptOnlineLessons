# レッスン39: ネスト（入れ子構造）

## なぜ重要なのか

実際のウェブサイトでは、複数の条件を組み合わせて判定する必要があります。ネスト（入れ子構造）は、「AかつB」のような複雑な条件を段階的にチェックするための基本的な手法です。

| サービス | 使われている機能 | 具体例 |
|---------|----------------|--------|
| **Amazon** | ログイン状態＋カート金額で送料無料判定 | ログイン済みかつ2000円以上なら送料無料 |
| **YouTube** | 年齢確認＋地域制限の二重チェック | 18歳以上かつ日本在住なら視聴可能 |
| **Twitter** | 認証状態＋フォロー状態でDM送信可否 | ログイン済みかつフォロー中ならDM可能 |
| **楽天市場** | 会員ランク＋購入金額でポイント倍率 | プレミアム会員かつ5000円以上なら10倍 |
| **Netflix** | 契約プラン＋デバイス数で同時視聴制限 | プレミアムプランかつ4台未満なら視聴可 |

## 基本概念の説明

### ネストとは

**ネスト（nest）**は「巣」という意味で、プログラミングでは**入れ子構造**のことを指します。if文の中に別のif文を書くことで、複数の条件を段階的にチェックできます。

```
        条件1を判定
           ↓
    ┌──────┴──────┐
    ↓              ↓
  true           false
    ↓              ↓
条件2を判定      処理をスキップ
    ↓
┌───┴───┐
↓       ↓
true  false
↓       ↓
処理    スキップ
```

**特徴**:
- 外側の条件が`true`の場合のみ、内側の条件をチェック
- 複数の条件を**段階的**に評価
- 「AかつB」の論理を表現
- インデント（字下げ）で構造を明確化

### 構文

```javascript
if (条件1) {
  if (条件2) {
    // 条件1と条件2の両方がtrueの場合の処理
  }
}
```

**意味**: 「条件1が満たされた場合、さらに条件2をチェックする」

## これまでの復習

### 単一条件（if文）

```javascript
if (age >= 18) {
  elem.textContent = "大人です";
}
```

**チェック内容**: 年齢のみ

### 多分岐（else if文）

```javascript
if (age >= 65) {
  elem.textContent = "シニア";
} else if (age >= 20) {
  elem.textContent = "成人";
} else {
  elem.textContent = "未成年";
}
```

**チェック内容**: 年齢を複数の範囲で分類

### 複数条件（ネスト）

```javascript
if (age >= 18) {
  if (height >= 150) {
    elem.textContent = "条件を満たしています";
  }
}
```

**チェック内容**: 年齢**かつ**身長

## 動作の流れ

### ネスト構造の実行フロー

```
【プログラム実行】
     ↓
1. 変数の値を取得（例: age = 20, height = 160）
     ↓
2. 外側のif条件を評価（age >= 18）
     ↓
  ┌───┴───┐
  ↓       ↓
true    false
  ↓       ↓
  3.    終了（何も表示しない）
  ↓
内側のif条件を評価（height >= 150）
  ↓
┌───┴───┐
↓       ↓
true  false
↓       ↓
4.    終了
↓
「条件を満たしています」と表示
```

### 具体例: age = 20, height = 160 の場合

```javascript
let age = 20;
let height = 160;

if (age >= 18) {        // 20 >= 18 → true
  // ← 内側の条件をチェックする
  if (height >= 150) {  // 160 >= 150 → true
    // ← 両方trueなので実行される
    elem.textContent = "条件を満たしています";
  }
}
```

**実行結果**: 「条件を満たしています」

### 具体例: age = 15, height = 160 の場合

```javascript
let age = 15;
let height = 160;

if (age >= 18) {        // 15 >= 18 → false
  // ← 外側がfalseなので、内側はチェックされない
  if (height >= 150) {
    elem.textContent = "条件を満たしています";
  }
}
```

**実行結果**: 何も表示されない

**重要**: 外側の条件が`false`の場合、**内側の条件はチェックされない**

## 実践例: 年齢と身長のチェック

### 基本的なネスト構造

```javascript
function checkEligibility() {
  let age = 20;
  let height = 160;

  if (age >= 18) {
    if (height >= 150) {
      const elem = document.getElementById("result");
      elem.textContent = "条件を満たしています";
    }
  }
}
```

### すべてのパターン

| age | height | 外側の条件 | 内側の条件 | 結果 |
|-----|--------|----------|----------|------|
| 20 | 160 | true | true | 「条件を満たしています」 |
| 20 | 140 | true | false | 何も表示されない |
| 15 | 160 | false | チェックされない | 何も表示されない |
| 15 | 140 | false | チェックされない | 何も表示されない |

**ポイント**: 両方の条件が`true`の場合のみメッセージが表示される

## ネストとelseの組み合わせ

### 外側と内側の両方でelseを使う

```javascript
function checkAge() {
  let age = 25;

  if (age >= 18) {
    if (age >= 65) {
      const elem = document.getElementById("result");
      elem.textContent = "シニアです";
    } else {
      const elem = document.getElementById("result");
      elem.textContent = "成人です";
    }
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "未成年です";
  }
}
```

### 動作の詳細

```
【age = 70 の場合】
  ↓
1. age >= 18 → true
  ↓
2. age >= 65 → true
  ↓
表示: 「シニアです」

【age = 30 の場合】
  ↓
1. age >= 18 → true
  ↓
2. age >= 65 → false
  ↓
表示: 「成人です」

【age = 15 の場合】
  ↓
1. age >= 18 → false
  ↓
表示: 「未成年です」
（内側の条件はチェックされない）
```

### 各条件の範囲

| age の範囲 | 判定の流れ | 表示内容 |
|-----------|----------|----------|
| 65以上 | 外側true → 内側true | 「シニアです」 |
| 18以上65未満 | 外側true → 内側false | 「成人です」 |
| 18未満 | 外側false | 「未成年です」 |

## 実践例: パスワードと年齢のチェック

### 段階的な認証

```javascript
function checkAccess() {
  let password = "abc123";
  let age = 20;

  if (password === "abc123") {
    if (age >= 18) {
      const elem = document.getElementById("result");
      elem.textContent = "アクセス許可";
    } else {
      const elem = document.getElementById("result");
      elem.textContent = "年齢が足りません";
    }
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "パスワードが違います";
  }
}
```

### すべてのケース

| password | age | 外側の判定 | 内側の判定 | 表示内容 |
|----------|-----|----------|----------|----------|
| "abc123" | 20 | true | true | 「アクセス許可」 |
| "abc123" | 15 | true | false | 「年齢が足りません」 |
| "wrong" | 20 | false | チェックされない | 「パスワードが違います」 |
| "wrong" | 15 | false | チェックされない | 「パスワードが違います」 |

**ポイント**: パスワードが正しい場合のみ、年齢をチェックする

## インデント（字下げ）の重要性

### 正しいインデント（読みやすい）

```javascript
if (条件1) {
  if (条件2) {
    if (条件3) {
      処理
    }
  }
}
```

**特徴**:
- 各ネストレベルで2スペース（またはタブ）追加
- どのブロックがどこに属するか一目瞭然
- 構造が視覚的に理解しやすい

### 間違ったインデント（読みにくい）

```javascript
if (条件1) {
if (条件2) {
if (条件3) {
処理
}
}
}
```

**問題点**:
- どのブロックがどこに属するか分かりにくい
- 構造が理解しづらい
- バグが発生しやすい

### インデントの比較

| コード | 可読性 | 保守性 | 推奨 |
|--------|--------|--------|------|
| 正しいインデント | ✅ 高い | ✅ 高い | ✅ |
| インデントなし | ❌ 低い | ❌ 低い | ❌ |

**ルール**: ネストが1段階深くなるごとに、インデントを1段階増やす

## 実践例: 3つの条件をチェック

### 3段階のネスト

```javascript
function checkMembership() {
  let password = "abc123";
  let age = 25;
  let isMember = "yes";

  if (password === "abc123") {
    if (age >= 20) {
      if (isMember === "yes") {
        const elem = document.getElementById("result");
        elem.textContent = "特別コンテンツにアクセスできます";
      } else {
        const elem = document.getElementById("result");
        elem.textContent = "会員登録が必要です";
      }
    } else {
      const elem = document.getElementById("result");
      elem.textContent = "20歳以上である必要があります";
    }
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "パスワードが違います";
  }
}
```

### 判定フロー

```
【password = "abc123", age = 25, isMember = "yes"】
  ↓
1. password === "abc123" → true
  ↓
2. age >= 20 → true
  ↓
3. isMember === "yes" → true
  ↓
表示: 「特別コンテンツにアクセスできます」

【password = "abc123", age = 25, isMember = "no"】
  ↓
1. password === "abc123" → true
  ↓
2. age >= 20 → true
  ↓
3. isMember === "yes" → false
  ↓
表示: 「会員登録が必要です」

【password = "abc123", age = 18, isMember = "yes"】
  ↓
1. password === "abc123" → true
  ↓
2. age >= 20 → false
  ↓
表示: 「20歳以上である必要があります」

【password = "wrong", age = 25, isMember = "yes"】
  ↓
1. password === "abc123" → false
  ↓
表示: 「パスワードが違います」
```

## ネストの深さ

### 推奨される深さ

```javascript
// ✅ 2段階（読みやすい）
if (条件1) {
  if (条件2) {
    処理
  }
}

// ✅ 3段階（許容範囲）
if (条件1) {
  if (条件2) {
    if (条件3) {
      処理
    }
  }
}
```

### 深すぎるネスト（避けるべき）

```javascript
// ❌ 5段階以上（読みにくい）
if (条件1) {
  if (条件2) {
    if (条件3) {
      if (条件4) {
        if (条件5) {
          // 深すぎて理解しづらい
        }
      }
    }
  }
}
```

**推奨**: 2〜3段階まで（それ以上は別の方法を検討）

## 実践例: 割引判定

### シニア割引の判定

```javascript
function checkDiscount() {
  let age = 70;
  let amount = 3000;

  if (age >= 65) {
    if (amount >= 1000) {
      const elem = document.getElementById("result");
      elem.textContent = "シニア割引が適用されます";
    } else {
      const elem = document.getElementById("result");
      elem.textContent = "1000円以上でシニア割引が適用されます";
    }
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "シニア割引は65歳以上が対象です";
  }
}
```

### すべてのケース

| age | amount | 外側の判定 | 内側の判定 | 表示内容 |
|-----|--------|----------|----------|----------|
| 70 | 3000 | true | true | 「シニア割引が適用されます」 |
| 70 | 500 | true | false | 「1000円以上でシニア割引が適用されます」 |
| 50 | 3000 | false | チェックされない | 「シニア割引は65歳以上が対象です」 |
| 50 | 500 | false | チェックされない | 「シニア割引は65歳以上が対象です」 |

## ネストを使わない書き方との比較

### ネストを使う場合

```javascript
if (age >= 18) {
  if (height >= 150) {
    elem.textContent = "OK";
  }
}
```

**メリット**:
- 条件の関係が明確
- 効率的（外側がfalseなら内側をチェックしない）
- 読みやすい

### ネストを使わない場合（間違った例）

```javascript
if (age >= 18) {
  // 何も書かない
}

if (height >= 150) {
  // 何も書かない
}

if (age >= 18 && height >= 150) {  // 後のレッスンで学ぶ&&演算子
  elem.textContent = "OK";
}
```

**デメリット**:
- 条件を複数回書く必要がある
- 冗長

### 比較表

| 項目 | ネストあり | ネストなし |
|------|----------|----------|
| 条件の明確さ | ✅ 明確 | △ やや不明瞭 |
| コードの長さ | ✅ 短い | ❌ 長い |
| 実行効率 | ✅ 高い | △ 普通 |
| 可読性 | ✅ 高い | △ 普通 |

**結論**: 複数の条件を組み合わせる場合は**ネストを使う**方が良い

## よくある間違いと解決方法

### ❌ 間違い1: インデントの不統一

```javascript
if (age >= 18) {
if (height >= 150) {  // ← インデントがない
    elem.textContent = "OK";  // ← インデントが深すぎる
  }
}
```

**何が問題か**: 構造が分かりにくく、バグの原因になる

**✅ 正しい書き方**:

```javascript
if (age >= 18) {
  if (height >= 150) {  // ← 2スペース
    elem.textContent = "OK";  // ← さらに2スペース
  }
}
```

### ❌ 間違い2: ブロック{}の閉じ忘れ

```javascript
if (age >= 18) {
  if (height >= 150) {
    elem.textContent = "OK";
  // ← 内側のブロックの}が閉じていない
}
```

**エラーメッセージ**: `SyntaxError: Unexpected end of input`

**✅ 正しい書き方**:

```javascript
if (age >= 18) {
  if (height >= 150) {
    elem.textContent = "OK";
  }  // ← 内側のブロックを閉じる
}    // ← 外側のブロックを閉じる
```

### ❌ 間違い3: elseの位置ミス

```javascript
if (age >= 18) {
  if (height >= 150) {
    elem.textContent = "OK";
  }
} else {  // ← どちらのifに対するelse？
  elem.textContent = "NG";
}
```

**何が問題か**: elseがどのifに対応するか不明瞭

**✅ 正しい書き方**:

```javascript
// 外側のifに対するelse
if (age >= 18) {
  if (height >= 150) {
    elem.textContent = "OK";
  }
} else {
  elem.textContent = "年齢が足りません";
}

// または、内側のifに対するelse
if (age >= 18) {
  if (height >= 150) {
    elem.textContent = "OK";
  } else {
    elem.textContent = "身長が足りません";
  }
}
```

### ❌ 間違い4: 不要なネスト

```javascript
if (age >= 18) {
  if (age >= 18) {  // ← 同じ条件を2回チェックしている
    elem.textContent = "OK";
  }
}
```

**何が問題か**: 無駄な処理

**✅ 正しい書き方**:

```javascript
if (age >= 18) {
  elem.textContent = "OK";
}
```

### ❌ 間違い5: 条件の順序ミス

```javascript
if (height >= 150) {
  if (age >= 18) {
    elem.textContent = "OK";
  } else {
    elem.textContent = "年齢が足りません";  // ← 身長が足りない場合もこう表示される
  }
}
```

**何が問題か**: 身長が150未満の場合、何も表示されない

**✅ 正しい書き方**:

```javascript
if (age >= 18) {
  if (height >= 150) {
    elem.textContent = "OK";
  } else {
    elem.textContent = "身長が足りません";
  }
} else {
  elem.textContent = "年齢が足りません";
}
```

### ❌ 間違い6: 深すぎるネスト

```javascript
if (a) {
  if (b) {
    if (c) {
      if (d) {
        if (e) {
          if (f) {  // ← 6段階は深すぎる
            処理
          }
        }
      }
    }
  }
}
```

**何が問題か**: 読みにくく、保守しづらい

**✅ 正しい書き方**:

後のレッスンで学ぶ論理演算子（`&&`）を使う
```javascript
if (a && b && c && d && e && f) {
  処理
}
```

## 実用例

### 実用例1: 完全な資格チェックシステム

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>資格チェックシステム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      text-align: center;
    }
    .info-box {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 10px;
      margin: 20px 0;
    }
    button {
      padding: 15px 30px;
      font-size: 18px;
      cursor: pointer;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      margin: 20px 0;
    }
    #result {
      font-size: 24px;
      font-weight: bold;
      margin: 20px 0;
      padding: 20px;
      border-radius: 5px;
      min-height: 30px;
    }
    .success {
      background-color: #c8e6c9;
      color: #1b5e20;
    }
    .warning {
      background-color: #fff3cd;
      color: #856404;
    }
    .error {
      background-color: #ffcdd2;
      color: #b71c1c;
    }
  </style>
</head>
<body>
  <h1>資格チェックシステム</h1>

  <div class="info-box">
    <p>年齢: <strong>20歳</strong></p>
    <p>身長: <strong>160cm</strong></p>
  </div>

  <button onclick="checkEligibility()">資格を確認</button>
  <div id="result"></div>

  <script>
    function checkEligibility() {
      let age = 20;
      let height = 160;

      const elem = document.getElementById("result");

      if (age >= 18) {
        if (height >= 150) {
          elem.textContent = "✅ 条件を満たしています";
          elem.className = "success";
        } else {
          elem.textContent = "⚠️ 身長が150cm以上必要です";
          elem.className = "warning";
        }
      } else {
        elem.textContent = "❌ 18歳以上である必要があります";
        elem.className = "error";
      }
    }
  </script>
</body>
</html>
```

### 実用例2: 認証システム

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>認証システム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      text-align: center;
    }
    .login-box {
      background-color: #f9f9f9;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    button {
      padding: 15px 30px;
      font-size: 18px;
      cursor: pointer;
      background-color: #2196F3;
      color: white;
      border: none;
      border-radius: 5px;
      margin: 20px 0;
      width: 100%;
    }
    #result {
      font-size: 20px;
      font-weight: bold;
      margin: 20px 0;
      padding: 15px;
      border-radius: 5px;
    }
    .access-granted {
      background-color: #c8e6c9;
      color: #1b5e20;
    }
    .access-denied {
      background-color: #ffcdd2;
      color: #b71c1c;
    }
  </style>
</head>
<body>
  <h1>認証システム</h1>

  <div class="login-box">
    <h2>ログイン</h2>
    <p>パスワード: <code>abc123</code></p>
    <p>年齢: <strong>20歳</strong></p>
    <button onclick="checkAccess()">ログイン</button>
  </div>

  <div id="result"></div>

  <script>
    function checkAccess() {
      let password = "abc123";
      let age = 20;

      const elem = document.getElementById("result");

      if (password === "abc123") {
        if (age >= 18) {
          elem.textContent = "✅ アクセス許可";
          elem.className = "access-granted";
        } else {
          elem.textContent = "❌ 年齢が足りません（18歳以上が必要）";
          elem.className = "access-denied";
        }
      } else {
        elem.textContent = "❌ パスワードが違います";
        elem.className = "access-denied";
      }
    }
  </script>
</body>
</html>
```

### 実用例3: プレミアム会員チェック

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>会員システム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 700px;
      margin: 50px auto;
      text-align: center;
    }
    .status-box {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 10px;
      margin: 20px 0;
    }
    button {
      padding: 15px 30px;
      font-size: 18px;
      cursor: pointer;
      background-color: #ff9800;
      color: white;
      border: none;
      border-radius: 5px;
      margin: 20px 0;
    }
    #result {
      font-size: 24px;
      font-weight: bold;
      margin: 20px 0;
      padding: 30px;
      border-radius: 10px;
    }
    .premium {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }
    .standard {
      background-color: #e3f2fd;
      color: #1565c0;
    }
    .denied {
      background-color: #ffcdd2;
      color: #b71c1c;
    }
  </style>
</head>
<body>
  <h1>会員システム</h1>

  <div class="status-box">
    <h2>アカウント情報</h2>
    <p>パスワード: <code>abc123</code></p>
    <p>年齢: <strong>25歳</strong></p>
    <p>会員ステータス: <strong>premium</strong></p>
  </div>

  <button onclick="checkMembership()">会員状態を確認</button>
  <div id="result"></div>

  <script>
    function checkMembership() {
      let password = "abc123";
      let age = 25;
      let memberStatus = "premium";

      const elem = document.getElementById("result");

      if (password === "abc123") {
        if (age >= 20) {
          if (memberStatus === "premium") {
            elem.textContent = "🌟 特別コンテンツにアクセスできます";
            elem.className = "premium";
          } else {
            elem.textContent = "📋 会員登録が必要です";
            elem.className = "standard";
          }
        } else {
          elem.textContent = "⚠️ 20歳以上である必要があります";
          elem.className = "denied";
        }
      } else {
        elem.textContent = "❌ パスワードが違います";
        elem.className = "denied";
      }
    }
  </script>
</body>
</html>
```

### 実用例4: シニア割引判定システム

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>シニア割引判定</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      text-align: center;
    }
    .purchase-info {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 10px;
      margin: 20px 0;
    }
    .price {
      font-size: 36px;
      font-weight: bold;
      color: #e65100;
      margin: 10px 0;
    }
    button {
      padding: 15px 30px;
      font-size: 18px;
      cursor: pointer;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      margin: 20px 0;
    }
    #result {
      font-size: 20px;
      font-weight: bold;
      margin: 20px 0;
      padding: 20px;
      border-radius: 5px;
    }
    .discount-ok {
      background-color: #c8e6c9;
      color: #1b5e20;
    }
    .discount-pending {
      background-color: #fff3cd;
      color: #856404;
    }
    .no-discount {
      background-color: #e3f2fd;
      color: #1565c0;
    }
  </style>
</head>
<body>
  <h1>シニア割引判定システム</h1>

  <div class="purchase-info">
    <p>お客様の年齢: <strong>70歳</strong></p>
    <p>購入金額</p>
    <div class="price">¥3,000</div>
  </div>

  <button onclick="checkDiscount()">割引を確認</button>
  <div id="result"></div>

  <script>
    function checkDiscount() {
      let age = 70;
      let amount = 3000;

      const elem = document.getElementById("result");

      if (age >= 65) {
        if (amount >= 1000) {
          elem.textContent = "🎉 シニア割引が適用されます（10%OFF）";
          elem.className = "discount-ok";
        } else {
          elem.textContent = "💡 あと" + (1000 - amount) + "円で シニア割引が適用されます";
          elem.className = "discount-pending";
        }
      } else {
        elem.textContent = "ℹ️ シニア割引は65歳以上が対象です";
        elem.className = "no-discount";
      }
    }
  </script>
</body>
</html>
```

## 練習問題

### 問題1: 年齢と点数のチェック

ボタンをクリックしたときに、以下の条件をチェックするプログラムを作成してください。

1. 年齢が18歳以上の場合
2. その上で、点数が80点以上の場合に「合格です」と表示

ネストを使ってください。

**ヒント**:
<details>
<summary>ヒント1: ネストの構造</summary>

外側のif文で年齢、内側のif文で点数をチェックします。

```javascript
if (age >= 18) {
  if (score >= 80) {
    // ...
  }
}
```
</details>

<details>
<summary>ヒント2: 完全な関数</summary>

```javascript
function checkQualification() {
  let age = 20;
  let score = 85;

  if (age >= 18) {
    if (score >= 80) {
      const elem = document.getElementById("result");
      elem.textContent = "合格です";
    }
  }
}
```
</details>

<details>
<summary>ヒント3: 完全なHTML</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>年齢と点数のチェック</title>
</head>
<body>
  <h1>年齢と点数のチェック</h1>
  <button onclick="checkQualification()">判定する</button>
  <p id="result"></p>

  <script>
    function checkQualification() {
      let age = 20;
      let score = 85;

      if (age >= 18) {
        if (score >= 80) {
          const elem = document.getElementById("result");
          elem.textContent = "合格です";
        }
      }
    }
  </script>
</body>
</html>
```
</details>

### 問題2: パスワードと会員チェック

ボタンをクリックしたときに、以下の条件をチェックするプログラムを作成してください。

1. パスワードが"hello"と等しい場合
2. その上で、会員ステータスが"premium"と等しい場合に「プレミアム会員です」と表示
3. パスワードが正しくて会員ステータスが"premium"でない場合は「一般会員です」と表示
4. パスワードが違う場合は「認証失敗」と表示

**ヒント**:
<details>
<summary>ヒント1: 外側と内側のelse</summary>

外側のif-elseでパスワード、内側のif-elseで会員ステータスをチェックします。

```javascript
if (password === "hello") {
  if (memberStatus === "premium") {
    // プレミアム会員
  } else {
    // 一般会員
  }
} else {
  // 認証失敗
}
```
</details>

<details>
<summary>ヒント2: 完全な解答</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>パスワードと会員チェック</title>
</head>
<body>
  <h1>パスワードと会員チェック</h1>
  <button onclick="checkMember()">認証する</button>
  <p id="result"></p>

  <script>
    function checkMember() {
      let password = "hello";
      let memberStatus = "premium";

      const elem = document.getElementById("result");

      if (password === "hello") {
        if (memberStatus === "premium") {
          elem.textContent = "プレミアム会員です";
        } else {
          elem.textContent = "一般会員です";
        }
      } else {
        elem.textContent = "認証失敗";
      }
    }
  </script>
</body>
</html>
```
</details>

### 問題3: 3段階チェック

ボタンをクリックしたときに、以下の3つの条件をチェックするプログラムを作成してください。

1. 年齢が20歳以上
2. 点数が60点以上
3. 出席率が80以上

すべて満たしている場合に「すべての条件をクリアしました」と表示してください。

**ヒント**:
<details>
<summary>ヒント1: 3段階のネスト</summary>

3つのif文を入れ子にします。

```javascript
if (age >= 20) {
  if (score >= 60) {
    if (attendance >= 80) {
      // ...
    }
  }
}
```
</details>

<details>
<summary>ヒント2: 完全な解答</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>3段階チェック</title>
</head>
<body>
  <h1>3段階チェック</h1>
  <button onclick="checkAll()">判定する</button>
  <p id="result"></p>

  <script>
    function checkAll() {
      let age = 25;
      let score = 75;
      let attendance = 85;

      if (age >= 20) {
        if (score >= 60) {
          if (attendance >= 80) {
            const elem = document.getElementById("result");
            elem.textContent = "すべての条件をクリアしました";
          }
        }
      }
    }
  </script>
</body>
</html>
```
</details>

## チェックリスト

このレッスンを終える前に、以下の項目を確認してください。

- [ ] ネストとはif文の中にif文を書くことだと理解している
- [ ] 外側の条件がtrueの場合のみ内側をチェックすることを理解している
- [ ] インデント（字下げ）の重要性を理解している
- [ ] ネストの中でelseを使えることを知っている
- [ ] ネストは2〜3段階が推奨されることを覚えた
- [ ] 年齢と身長の二重チェックができる
- [ ] パスワードと年齢の段階的認証ができる
- [ ] 3段階のネストを書ける
- [ ] ブロック{}の開閉を正しく行える
- [ ] elseがどのifに対応するか理解している

## デバッグのヒント

プログラムが期待通りに動かない場合は、以下を確認してください。

1. **インデントを確認**
   ```javascript
   if (age >= 18) {
     if (height >= 150) {  // 2スペース
       elem.textContent = "OK";  // さらに2スペース
     }
   }
   ```

2. **ブロックの閉じ忘れ**
   ```javascript
   if (age >= 18) {
     if (height >= 150) {
       elem.textContent = "OK";
     }  // ← 内側を閉じる
   }    // ← 外側を閉じる
   ```

3. **elseの対応を確認**
   ```javascript
   console.log("外側の条件チェック");
   if (age >= 18) {
     console.log("内側の条件チェック");
     if (height >= 150) {
       console.log("両方OK");
     }
   }
   ```

4. **条件の値を確認**
   ```javascript
   console.log("age:", age);
   console.log("height:", height);
   if (age >= 18) {
     console.log("年齢OK");
     if (height >= 150) {
       console.log("身長OK");
     }
   }
   ```

5. **ネストの深さを確認**
   - 3段階以上になっていないか
   - 不要なネストがないか

## ポイント

1. **ネストは入れ子構造**: if文の中にif文を書く
2. **段階的チェック**: 外側がtrueの場合のみ内側をチェック
3. **インデントが重要**: 構造を視覚的に理解しやすくする
4. **elseも使える**: ネストの中でもelseを組み合わせ可能
5. **2〜3段階が推奨**: 深すぎると読みにくくなる
6. **「かつ」の表現**: 複数条件が同時に満たされる必要がある場合に使用
7. **効率的**: 外側がfalseなら内側をスキップ

## できるようになったこと

このレッスンを終えると、以下のことができるようになります。

- [ ] ネスト構造を理解している
- [ ] 2段階のネストを書ける
- [ ] 3段階のネストを書ける
- [ ] 年齢と身長の二重チェックができる
- [ ] パスワードと年齢の段階的認証ができる
- [ ] 割引条件の二重チェックができる
- [ ] 正しいインデントで書ける
- [ ] ネストの中でelseを使える

## まとめ

このレッスンでは、ネスト（入れ子構造）を学びました。

最も重要なポイントは以下の7つです。

1. **ネストの定義**: if文の中に別のif文を書く入れ子構造
2. **段階的評価**: 外側の条件がtrueの場合のみ内側をチェック
3. **「かつ」の表現**: 複数の条件が同時に満たされる必要がある場合に使用
4. **インデントの重要性**: 構造を視覚的に分かりやすくする
5. **elseとの組み合わせ**: ネストの中でもelseを使える
6. **推奨される深さ**: 2〜3段階まで（それ以上は読みにくい）
7. **効率性**: 外側がfalseなら内側をスキップするため効率的

## 次のステップ

次のレッスンでは、**エラー処理**について学びます。

```javascript
// 次のレッスンで学ぶこと
if (isNaN(num)) {
  elem.textContent = "数値を入力してください";
} else {
  if (num !== 0) {
    let result = 100 / num;
    elem.textContent = result;
  } else {
    elem.textContent = "0では割れません";
  }
}
```

エラー処理を学ぶと、不正な入力に対して適切に対処できるようになります。

お疲れ様でした！
