# レッスン37: どちらか（if-else文）

## なぜ重要なのか

現実のウェブサイトでは、ユーザーの入力や状態に応じて「どちらか一方」を選択する処理が頻繁に使われます。if-else文は、この二択を効率的に実装するための基本構文です。

| サービス | 使われている機能 | 具体例 |
|---------|----------------|--------|
| **Twitter** | ログイン成功/失敗、フォロー済み/未フォロー | パスワードが正しければログイン、違えばエラー表示 |
| **Amazon** | 在庫あり/なし、配送可能/不可能 | 在庫があれば「カートに入れる」、なければ「入荷待ち」 |
| **YouTube** | 登録済み/未登録、再生可能/年齢制限 | 登録済みなら通知ON、未登録なら「登録」ボタン表示 |
| **楽天市場** | 会員/非会員、ポイント利用可/不可 | 会員なら特別価格、非会員なら通常価格を表示 |
| **Netflix** | 視聴可能/制限あり、ダウンロード可/不可 | プランに含まれていれば視聴可能、なければアップグレード促進 |

## 基本概念の説明

### if-else文とは

**if-else文**は、条件によって「どちらか一方」の処理を実行する構文です。

```
        条件を判定
           ↓
    ┌──────┴──────┐
    ↓              ↓
  true           false
    ↓              ↓
if部分の処理   else部分の処理
    ↓              ↓
    └──────┬──────┘
           ↓
      処理を続ける
```

**特徴**:
- **必ずどちらか一方が実行される**
- 条件判定は1回だけ（効率的）
- 二択の判定に最適
- コードの意図が明確

### 構文

```javascript
if (条件) {
  // 条件がtrueの場合の処理
} else {
  // 条件がfalseの場合の処理
}
```

**else**は「そうでなければ」という意味です。

## これまでのif文だけの問題点

### if文を2回使う方法

```javascript
function checkAge() {
  let age = 15;

  if (age >= 20) {
    const elem = document.getElementById("result");
    elem.textContent = "成人です";
  }

  if (age < 20) {
    const elem = document.getElementById("result");
    elem.textContent = "未成年です";
  }
}
```

**問題点**:
1. 同じ条件を2回判定している（`age >= 20` と `age < 20`）
2. コードが長くなる
3. 条件の関係性が分かりにくい
4. 計算コストが2倍

### if-else文を使う方法

```javascript
function checkAge() {
  let age = 15;

  if (age >= 20) {
    const elem = document.getElementById("result");
    elem.textContent = "成人です";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "未成年です";
  }
}
```

**改善点**:
1. 条件判定は1回だけ
2. コードが短く読みやすい
3. 「どちらか一方」という意図が明確
4. 効率的

## 動作の流れ

### if-else文の実行フロー

```
【プログラム実行】
     ↓
1. 変数の値を取得（例: age = 25）
     ↓
2. if文の条件を評価（age >= 20）
     ↓
3. 条件の結果を判定
     ↓
  ┌───┴───┐
  ↓       ↓
true    false
  ↓       ↓
if部分  else部分
  ↓       ↓
  └───┬───┘
      ↓
4. 結果を画面に表示
```

### 具体例: age = 25 の場合

```javascript
let age = 25;

if (age >= 20) {  // 25 >= 20 → true
  // ← この部分が実行される
  console.log("成人です");
} else {
  // ← この部分は実行されない
  console.log("未成年です");
}
```

**実行結果**: `成人です`

### 具体例: age = 15 の場合

```javascript
let age = 15;

if (age >= 20) {  // 15 >= 20 → false
  // ← この部分は実行されない
  console.log("成人です");
} else {
  // ← この部分が実行される
  console.log("未成年です");
}
```

**実行結果**: `未成年です`

## else文の仕組み

### 条件がtrueの場合

```javascript
let age = 25;

if (age >= 20) {
  // age >= 20 は true
  // ↓ この部分が実行される
  console.log("成人です");
} else {
  // ↓ if部分が実行されたので、ここは実行されない
  console.log("未成年です");
}
```

**結果**: 「成人です」のみ表示

### 条件がfalseの場合

```javascript
let age = 15;

if (age >= 20) {
  // age >= 20 は false
  // ↓ この部分は実行されない
  console.log("成人です");
} else {
  // ↓ if部分が実行されなかったので、ここが実行される
  console.log("未成年です");
}
```

**結果**: 「未成年です」のみ表示

### 必ずどちらか一方が実行される

| age の値 | age >= 20 | 実行される部分 | 表示される内容 |
|---------|----------|-------------|--------------|
| 25 | true | if部分 | 「成人です」 |
| 20 | true | if部分 | 「成人です」 |
| 19 | false | else部分 | 「未成年です」 |
| 15 | false | else部分 | 「未成年です」 |
| 0 | false | else部分 | 「未成年です」 |

## 実践例: 年齢判定

### 基本的な年齢判定

```javascript
function checkAge() {
  let age = 25;

  if (age >= 20) {
    const elem = document.getElementById("result");
    elem.textContent = "成人です";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "未成年です";
  }
}
```

### 動作の詳細

```
【age = 25 の場合】
  ↓
条件評価: 25 >= 20 → true
  ↓
if部分を実行
  ↓
「成人です」と表示

【age = 15 の場合】
  ↓
条件評価: 15 >= 20 → false
  ↓
else部分を実行
  ↓
「未成年です」と表示
```

## 実践例: 合格判定

### 点数による合格/不合格判定

```javascript
function checkScore() {
  let score = 75;

  if (score >= 60) {
    const elem = document.getElementById("result");
    elem.textContent = "合格です";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "不合格です";
  }
}
```

### 境界値での動作

| score | score >= 60 | 実行部分 | 表示内容 |
|-------|------------|---------|----------|
| 100 | true | if部分 | 「合格です」 |
| 60 | true | if部分 | 「合格です」 |
| 59 | false | else部分 | 「不合格です」 |
| 0 | false | else部分 | 「不合格です」 |

**ポイント**: 60点ちょうどは「合格」（`>=` は等しい場合を含む）

## 実践例: ○×判定

### クイズの正解/不正解判定

```javascript
function checkAnswer() {
  let answer = "Tokyo";
  let correctAnswer = "Tokyo";

  if (answer === correctAnswer) {
    const elem = document.getElementById("result");
    elem.textContent = "○ 正解です";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "× 不正解です";
  }
}
```

### 動作例

```javascript
// 正解の場合
let answer = "Tokyo";
let correctAnswer = "Tokyo";
// "Tokyo" === "Tokyo" → true
// 表示: 「○ 正解です」

// 不正解の場合
let answer = "Osaka";
let correctAnswer = "Tokyo";
// "Osaka" === "Tokyo" → false
// 表示: 「× 不正解です」

// 大文字小文字が違う場合
let answer = "tokyo";
let correctAnswer = "Tokyo";
// "tokyo" === "Tokyo" → false（大文字小文字を区別）
// 表示: 「× 不正解です」
```

## 実践例: パスワードチェック

### ログイン成功/失敗の判定

```javascript
function checkPassword() {
  let password = "abc123";

  if (password === "abc123") {
    const elem = document.getElementById("result");
    elem.textContent = "ログイン成功";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "パスワードが違います";
  }
}
```

### パスワードの比較

| password | password === "abc123" | 実行部分 | 表示内容 |
|----------|---------------------|---------|----------|
| "abc123" | true | if部分 | 「ログイン成功」 |
| "wrong" | false | else部分 | 「パスワードが違います」 |
| "ABC123" | false | else部分 | 「パスワードが違います」 |
| "" | false | else部分 | 「パスワードが違います」 |

## 実践例: 数値の等価判定

### 特定の値かどうかの判定

```javascript
function checkNumber() {
  let num = 7;

  if (num === 6) {
    const elem = document.getElementById("result");
    elem.textContent = "6です";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "6ではありません";
  }
}
```

**動作**:
- `num = 6` の場合 → 「6です」
- `num = 7` の場合 → 「6ではありません」
- `num = 0` の場合 → 「6ではありません」

## 二択の判定パターン

if-else文は、以下のような**二択の判定**に最適です。

| パターン | 条件 | if部分 | else部分 |
|---------|------|--------|---------|
| 年齢判定 | `age >= 20` | 「成人です」 | 「未成年です」 |
| 合格判定 | `score >= 60` | 「合格です」 | 「不合格です」 |
| 正誤判定 | `answer === correct` | 「正解です」 | 「不正解です」 |
| ログイン | `password === "abc123"` | 「成功」 | 「失敗」 |
| 在庫判定 | `stock > 0` | 「在庫あり」 | 「在庫なし」 |
| 大小判定 | `num > 100` | 「大きい」 | 「小さい」 |
| 会員判定 | `isMember === true` | 「会員です」 | 「非会員です」 |

**共通点**: どちらか一方が**必ず実行される**

## if文だけの場合との比較

### if文を2つ使う場合

```javascript
if (age >= 20) {
  elem.textContent = "成人です";
}

if (age < 20) {
  elem.textContent = "未成年です";
}
```

**特徴**:
- 条件を2回評価（`age >= 20` と `age < 20`）
- コードが長い
- 2つのif文が独立している（関連性が不明瞭）
- 逆条件を書く必要がある

### if-else文を使う場合

```javascript
if (age >= 20) {
  elem.textContent = "成人です";
} else {
  elem.textContent = "未成年です";
}
```

**特徴**:
- 条件を1回評価（効率的）
- コードが短い
- 「どちらか一方」という意図が明確
- 逆条件を書く必要がない

### 比較まとめ

| 項目 | if文2つ | if-else文 |
|------|---------|----------|
| 条件評価回数 | 2回 | 1回 |
| コード行数 | 長い | 短い |
| 意図の明確さ | やや不明瞭 | 明確 |
| 逆条件の記述 | 必要 | 不要 |
| 実行効率 | やや低い | 高い |
| 推奨度 | △ | ✅ |

**結論**: 二択の判定には**if-else文**を使うべき

## よくある間違いと解決方法

### ❌ 間違い1: elseの後にセミコロン

```javascript
if (age >= 20) {
  elem.textContent = "成人です";
} else; {  // ← セミコロンが余計
  elem.textContent = "未成年です";
}
```

**エラーメッセージ**: `SyntaxError: Unexpected token '{'`

**何が問題か**: `else`の後には直接`{`を書く（セミコロン不要）

**✅ 正しい書き方**:

```javascript
if (age >= 20) {
  elem.textContent = "成人です";
} else {  // ← セミコロンなし
  elem.textContent = "未成年です";
}
```

### ❌ 間違い2: elseに条件を書く

```javascript
if (age >= 20) {
  elem.textContent = "成人です";
} else (age < 20) {  // ← 条件は書けない
  elem.textContent = "未成年です";
}
```

**エラーメッセージ**: `SyntaxError: Unexpected token '('`

**何が問題か**: `else`には条件を書かない（自動的に「それ以外」を意味する）

**✅ 正しい書き方**:

```javascript
if (age >= 20) {
  elem.textContent = "成人です";
} else {  // ← 条件なし
  elem.textContent = "未成年です";
}
```

### ❌ 間違い3: ifとelseの間に他のコード

```javascript
if (age >= 20) {
  elem.textContent = "成人です";
}

console.log("判定中...");  // ← 間に他のコードがある

else {  // ← エラー
  elem.textContent = "未成年です";
}
```

**エラーメッセージ**: `SyntaxError: Unexpected token 'else'`

**何が問題か**: `if`の`}`と`else`の間には何も書けない（連続している必要がある）

**✅ 正しい書き方**:

```javascript
if (age >= 20) {
  elem.textContent = "成人です";
} else {  // ← ifの直後
  elem.textContent = "未成年です";
}

console.log("判定完了");  // ← if-else文の後に書く
```

### ❌ 間違い4: elseだけを書く

```javascript
else {  // ← ifがないのにelseを書いている
  elem.textContent = "未成年です";
}
```

**エラーメッセージ**: `SyntaxError: Unexpected token 'else'`

**何が問題か**: `else`は必ず`if`とセットで使う

**✅ 正しい書き方**:

```javascript
if (age >= 20) {  // ← ifが必要
  elem.textContent = "成人です";
} else {
  elem.textContent = "未成年です";
}
```

### ❌ 間違い5: 両方の結果を同じ変数に代入して上書き

```javascript
function checkAge() {
  let age = 25;
  let message = "";

  if (age >= 20) {
    message = "成人です";
  } else {
    message = "未成年です";
  }

  // ← ここで message を使い忘れる
}
```

**何が問題か**: 変数に代入しただけで表示していない

**✅ 正しい書き方**:

```javascript
function checkAge() {
  let age = 25;
  let message = "";

  if (age >= 20) {
    message = "成人です";
  } else {
    message = "未成年です";
  }

  const elem = document.getElementById("result");
  elem.textContent = message;  // ← 表示する
}
```

### ❌ 間違い6: ブロック{}を忘れる

```javascript
if (age >= 20)
  elem.textContent = "成人です";
  console.log("判定完了");  // ← 常に実行される
else  // ← エラー
  elem.textContent = "未成年です";
```

**エラーメッセージ**: `SyntaxError: Unexpected token 'else'`

**何が問題か**: ブロック`{}`がないと、次の1文しかif/elseに含まれない

**✅ 正しい書き方**:

```javascript
if (age >= 20) {  // ← {}を付ける
  elem.textContent = "成人です";
  console.log("判定完了");
} else {  // ← {}を付ける
  elem.textContent = "未成年です";
}
```

## 実用例

### 実用例1: 完全な年齢判定システム

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>年齢判定システム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      text-align: center;
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
    button:hover {
      background-color: #45a049;
    }
    #result {
      font-size: 24px;
      font-weight: bold;
      margin: 20px 0;
      padding: 20px;
      border-radius: 5px;
      min-height: 30px;
    }
    .adult {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    .minor {
      background-color: #fff3e0;
      color: #e65100;
    }
  </style>
</head>
<body>
  <h1>年齢判定システム</h1>
  <p>現在の年齢: <span id="age-display">20</span>歳</p>
  <button onclick="checkAge()">判定する</button>
  <div id="result"></div>

  <script>
    function checkAge() {
      let age = 20;

      const elem = document.getElementById("result");

      if (age >= 20) {
        elem.textContent = "成人です";
        elem.className = "adult";
      } else {
        elem.textContent = "未成年です";
        elem.className = "minor";
      }
    }
  </script>
</body>
</html>
```

### 実用例2: 合格判定システム

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>合格判定システム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      text-align: center;
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
    }
    #result {
      font-size: 24px;
      font-weight: bold;
      margin: 20px 0;
      padding: 20px;
      border-radius: 5px;
      min-height: 30px;
    }
    .pass {
      background-color: #c8e6c9;
      color: #1b5e20;
      border: 3px solid #4caf50;
    }
    .fail {
      background-color: #ffcdd2;
      color: #b71c1c;
      border: 3px solid #f44336;
    }
  </style>
</head>
<body>
  <h1>合格判定システム</h1>
  <p>あなたの点数: <span id="score-display">75</span>点</p>
  <p>合格ライン: 60点</p>
  <button onclick="checkScore()">判定する</button>
  <div id="result"></div>

  <script>
    function checkScore() {
      let score = 75;

      const elem = document.getElementById("result");

      if (score >= 60) {
        elem.textContent = "✅ 合格です";
        elem.className = "pass";
      } else {
        elem.textContent = "❌ 不合格です";
        elem.className = "fail";
      }
    }
  </script>
</body>
</html>
```

### 実用例3: ○×判定機（クイズ）

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>○×判定機</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      text-align: center;
    }
    .quiz-box {
      background-color: #f5f5f5;
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
      margin: 20px 10px;
    }
    #result {
      font-size: 36px;
      font-weight: bold;
      margin: 20px 0;
      padding: 30px;
      border-radius: 10px;
      min-height: 50px;
    }
    .correct {
      background-color: #c8e6c9;
      color: #1b5e20;
    }
    .incorrect {
      background-color: #ffcdd2;
      color: #b71c1c;
    }
  </style>
</head>
<body>
  <h1>○×判定機</h1>

  <div class="quiz-box">
    <h2>問題: 日本の首都はどこ?</h2>
    <p>あなたの答え: <strong>Tokyo</strong></p>
    <p>正解: <strong>Tokyo</strong></p>
    <button onclick="checkAnswer()">判定する</button>
  </div>

  <div id="result"></div>

  <script>
    function checkAnswer() {
      let answer = "Tokyo";
      let correctAnswer = "Tokyo";

      const elem = document.getElementById("result");

      if (answer === correctAnswer) {
        elem.textContent = "○ 正解です！";
        elem.className = "correct";
      } else {
        elem.textContent = "× 不正解です";
        elem.className = "incorrect";
      }
    }
  </script>
</body>
</html>
```

### 実用例4: パスワードログインシステム

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>ログインシステム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 400px;
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
      background-color: #673ab7;
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
      min-height: 30px;
    }
    .success {
      background-color: #c8e6c9;
      color: #1b5e20;
    }
    .error {
      background-color: #ffcdd2;
      color: #b71c1c;
    }
    .info {
      background-color: #e3f2fd;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <h1>ログインシステム</h1>

  <div class="login-box">
    <h2>ログイン</h2>
    <div class="info">
      <p>テスト用パスワード: <code>abc123</code></p>
    </div>
    <p>入力されたパスワード: <strong id="password-display">abc123</strong></p>
    <button onclick="checkPassword()">ログイン</button>
  </div>

  <div id="result"></div>

  <script>
    function checkPassword() {
      let password = "abc123";

      const elem = document.getElementById("result");

      if (password === "abc123") {
        elem.textContent = "✅ ログイン成功";
        elem.className = "success";
      } else {
        elem.textContent = "❌ パスワードが違います";
        elem.className = "error";
      }
    }
  </script>
</body>
</html>
```

## 変数の値を変えて試す

### 年齢判定のテスト

```javascript
// テストケース1: 成人
let age = 25;
checkAge();  // 「成人です」

// テストケース2: 境界値（20歳ちょうど）
let age = 20;
checkAge();  // 「成人です」（>= なので含まれる）

// テストケース3: 境界値の1つ下（19歳）
let age = 19;
checkAge();  // 「未成年です」

// テストケース4: 若い年齢
let age = 10;
checkAge();  // 「未成年です」

// テストケース5: 0歳
let age = 0;
checkAge();  // 「未成年です」
```

### 合格判定のテスト

```javascript
// テストケース1: 高得点
let score = 100;
checkScore();  // 「合格です」

// テストケース2: 境界値（60点ちょうど）
let score = 60;
checkScore();  // 「合格です」

// テストケース3: 境界値の1つ下（59点）
let score = 59;
checkScore();  // 「不合格です」

// テストケース4: 低得点
let score = 30;
checkScore();  // 「不合格です」

// テストケース5: 0点
let score = 0;
checkScore();  // 「不合格です」
```

### パスワードのテスト

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

// テストケース5: スペース付き
let password = "abc123 ";
checkPassword();  // 「パスワードが違います」
```

## 練習問題

### 問題1: 年齢判定

ボタンをクリックしたときに、年齢が18歳以上なら「大人です」、そうでなければ「子供です」と表示するプログラムを作成してください。

if-else文を使ってください。

**ヒント**:
<details>
<summary>ヒント1: HTMLの構造</summary>

```html
<button onclick="checkAge()">判定する</button>
<p id="result"></p>
```
</details>

<details>
<summary>ヒント2: 関数の定義</summary>

```javascript
function checkAge() {
  let age = ???;
  // ...
}
```
</details>

<details>
<summary>ヒント3: if-else文の構造</summary>

```javascript
if (age >= 18) {
  // 「大人です」と表示
} else {
  // 「子供です」と表示
}
```
</details>

<details>
<summary>ヒント4: 要素の取得と更新</summary>

```javascript
const elem = document.getElementById("result");
elem.textContent = "大人です";
```
</details>

<details>
<summary>ヒント5: 完全な関数</summary>

```javascript
function checkAge() {
  let age = 20;

  if (age >= 18) {
    const elem = document.getElementById("result");
    elem.textContent = "大人です";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "子供です";
  }
}
```
</details>

<details>
<summary>ヒント6: テスト方法</summary>

ageの値を変えて動作を確認:
- `let age = 20;` → 「大人です」
- `let age = 18;` → 「大人です」
- `let age = 17;` → 「子供です」
</details>

<details>
<summary>ヒント7: 完全なHTML</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>年齢判定</title>
</head>
<body>
  <h1>年齢判定</h1>
  <button onclick="checkAge()">判定する</button>
  <p id="result"></p>

  <script>
    function checkAge() {
      let age = 20;

      if (age >= 18) {
        const elem = document.getElementById("result");
        elem.textContent = "大人です";
      } else {
        const elem = document.getElementById("result");
        elem.textContent = "子供です";
      }
    }
  </script>
</body>
</html>
```
</details>

### 問題2: 点数判定

ボタンをクリックしたときに、点数が80点以上なら「優秀です」、そうでなければ「もう少しがんばりましょう」と表示するプログラムを作成してください。

**ヒント**:
<details>
<summary>ヒント1: 条件の設定</summary>

```javascript
if (score >= 80) {
  // ...
}
```
</details>

<details>
<summary>ヒント2: 両方のメッセージ</summary>

- if部分: 「優秀です」
- else部分: 「もう少しがんばりましょう」
</details>

<details>
<summary>ヒント3: 完全な関数</summary>

```javascript
function checkScore() {
  let score = 85;

  if (score >= 80) {
    const elem = document.getElementById("result");
    elem.textContent = "優秀です";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "もう少しがんばりましょう";
  }
}
```
</details>

<details>
<summary>ヒント4: テストケース</summary>

- `let score = 90;` → 「優秀です」
- `let score = 80;` → 「優秀です」
- `let score = 79;` → 「もう少しがんばりましょう」
</details>

<details>
<summary>ヒント5: 完全なHTML</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>点数判定</title>
</head>
<body>
  <h1>点数判定</h1>
  <button onclick="checkScore()">判定する</button>
  <p id="result"></p>

  <script>
    function checkScore() {
      let score = 85;

      if (score >= 80) {
        const elem = document.getElementById("result");
        elem.textContent = "優秀です";
      } else {
        const elem = document.getElementById("result");
        elem.textContent = "もう少しがんばりましょう";
      }
    }
  </script>
</body>
</html>
```
</details>

### 問題3: パスワード判定

ボタンをクリックしたときに、パスワードが"hello"と等しければ「認証成功」、そうでなければ「認証失敗」と表示するプログラムを作成してください。

**ヒント**:
<details>
<summary>ヒント1: 文字列の比較</summary>

```javascript
if (password === "hello") {
  // ...
}
```
</details>

<details>
<summary>ヒント2: 完全な関数</summary>

```javascript
function checkPassword() {
  let password = "hello";

  if (password === "hello") {
    const elem = document.getElementById("result");
    elem.textContent = "認証成功";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "認証失敗";
  }
}
```
</details>

<details>
<summary>ヒント3: テストケース</summary>

- `let password = "hello";` → 「認証成功」
- `let password = "Hello";` → 「認証失敗」（大文字小文字を区別）
- `let password = "wrong";` → 「認証失敗」
</details>

<details>
<summary>ヒント4: 完全なHTML</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>パスワード判定</title>
</head>
<body>
  <h1>パスワード判定</h1>
  <button onclick="checkPassword()">ログイン</button>
  <p id="result"></p>

  <script>
    function checkPassword() {
      let password = "hello";

      if (password === "hello") {
        const elem = document.getElementById("result");
        elem.textContent = "認証成功";
      } else {
        const elem = document.getElementById("result");
        elem.textContent = "認証失敗";
      }
    }
  </script>
</body>
</html>
```
</details>

## チェックリスト

このレッスンを終える前に、以下の項目を確認してください。

- [ ] if-else文の構文を理解している
- [ ] elseは「そうでなければ」という意味だと分かる
- [ ] if-else文では必ずどちらか一方が実行されることを理解している
- [ ] elseの後にセミコロンを付けないことを覚えた
- [ ] elseに条件を書かないことを理解している
- [ ] ifの直後にelseを書くことを覚えた
- [ ] 二択の判定にif-else文を使える
- [ ] 年齢判定プログラムが作れる
- [ ] 合格判定プログラムが作れる
- [ ] パスワード判定プログラムが作れる

## デバッグのヒント

プログラムが期待通りに動かない場合は、以下を確認してください。

1. **elseの後のセミコロン**
   ```javascript
   } else {  // ← セミコロンなし（正しい）
   } else; { // ← セミコロンあり（エラー）
   ```

2. **elseに条件を書いていないか**
   ```javascript
   } else {           // ← 正しい
   } else (age < 20) { // ← エラー
   ```

3. **ifとelseが連続しているか**
   ```javascript
   if (age >= 20) {
     // ...
   } else {  // ← ifの直後（正しい）
     // ...
   }
   ```

4. **ブロック{}を付けているか**
   ```javascript
   if (age >= 20) {  // ← {}を付ける
     elem.textContent = "成人です";
   } else {          // ← {}を付ける
     elem.textContent = "未成年です";
   }
   ```

5. **条件式を確認**
   ```javascript
   console.log("age:", age);
   console.log("age >= 20:", age >= 20);
   ```

6. **要素が取得できているか確認**
   ```javascript
   const elem = document.getElementById("result");
   console.log("elem:", elem);  // nullでないか確認
   ```

## ポイント

1. **if-else文は二択の判定に最適**: 必ずどちらか一方が実行される
2. **elseは「そうでなければ」の意味**: 逆条件を書く必要がない
3. **条件判定は1回だけ**: if文を2つ使うより効率的
4. **elseの後にセミコロンは不要**: `} else {` と書く
5. **elseに条件は書かない**: 自動的に「それ以外」を意味する
6. **ifとelseは連続して書く**: 間に他のコードを入れない
7. **ブロック{}を忘れずに**: 複数行の処理を含める場合は必須

## できるようになったこと

このレッスンを終えると、以下のことができるようになります。

- [ ] if-else文を使って二択の判定ができる
- [ ] 「そうでなければ」の処理を書ける
- [ ] 年齢判定（成人/未成年）ができる
- [ ] 合格判定（合格/不合格）ができる
- [ ] 正誤判定（正解/不正解）ができる
- [ ] パスワード判定（成功/失敗）ができる
- [ ] if文だけの場合よりも効率的なコードが書ける
- [ ] 二択の判定パターンを理解している

## まとめ

このレッスンでは、if-else文を使った二択の判定を学びました。

最も重要なポイントは以下の7つです。

1. **if-else文の構文**: `if (条件) { } else { }` という形で書く
2. **elseの意味**: 「そうでなければ」という意味で、逆条件を自動的に扱う
3. **必ず一方が実行**: 条件がtrueならif部分、falseならelse部分が実行される
4. **効率性**: 条件判定が1回で済むため、if文を2つ使うより効率的
5. **二択の判定に最適**: 成人/未成年、合格/不合格など二者択一の場合に使う
6. **構文のルール**: elseの後にセミコロンや条件は不要、ifの直後に書く
7. **コードの明確さ**: 「どちらか一方」という意図が明確に伝わる

## 次のステップ

次のレッスンでは、**else if**を使って3つ以上の分岐を行う方法を学びます。

```javascript
// 次のレッスンで学ぶこと
if (score >= 80) {
  console.log("優秀です");
} else if (score >= 60) {
  console.log("合格です");
} else {
  console.log("不合格です");
}
```

else ifを使うと、「A、そうでなければB、それ以外はC」というように、複数の条件を順番に判定できます。

お疲れ様でした！
