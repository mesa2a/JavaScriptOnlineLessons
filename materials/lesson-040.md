# レッスン40: エラー処理

## なぜ重要なのか

エラー処理は、ユーザーの予期しない入力や操作から、プログラムを守る重要な技術です。以下は、実際のサービスで使われているエラー処理の例です。

| サービス | エラー処理の例 | エラーがないとどうなるか |
|---------|------------|-----------------|
| Amazon | クレジットカード番号に数字以外を入力 → 「正しい番号を入力してください」 | 決済システムがエラーを起こす |
| Twitter | ユーザー名に空白だけ → 「ユーザー名を入力してください」 | データベースに空データが保存される |
| Google Maps | 目的地を入力せずに検索 → 「場所を入力してください」 | 検索が実行できない |
| YouTube | 動画の再生速度に文字を入力 → 「数値を入力してください」 | 動画が正しく再生できない |
| Excel Online | セルに「=10/0」を入力 → 「#DIV/0!」エラー表示 | 計算結果が無限大になる |

これらのサービスは、すべてエラー処理によってユーザーに分かりやすいメッセージを表示し、システムを守っています。

## 基本概念の説明

### エラー処理とは

**エラー処理（Error Handling）**とは、プログラムが予期しない状況に遭遇したときに、適切に対応する仕組みのことです。

```
【通常の処理】
ユーザー入力 → 変換 → 計算 → 結果表示
    ↓            ↓       ↓
  "100"        100      200
```

```
【エラー処理が必要な場合】
ユーザー入力 → 変換 → ??  → システムエラー
    ↓            ↓
  "abc"        NaN      💥 プログラムが誤動作
```

```
【エラー処理を追加】
ユーザー入力 → チェック → エラー検出 → エラーメッセージ
    ↓            ↓          ↓
  "abc"        ❌         "数値を入力してください"

ユーザー入力 → チェック → 変換 → 計算 → 結果表示
    ↓            ↓         ↓      ↓
  "100"        ✅        100    200
```

### NaN（Not a Number）

**NaN**は「Not a Number」の略で、「数値ではない」ことを表す特殊な値です。

```javascript
const text = "こんにちは";
const num = Number(text);  // NaN（数値に変換できない）
```

| 変換前 | Number()で変換後 | 説明 |
|--------|----------------|------|
| "123" | 123 | ✅ 数値に変換できる |
| "12.5" | 12.5 | ✅ 小数も変換できる |
| "abc" | NaN | ❌ 文字は変換できない |
| "こんにちは" | NaN | ❌ 日本語は変換できない |
| "" | 0 | ⚠️ 空文字列は0になる |
| " " | 0 | ⚠️ 空白だけでも0になる |

### isNaN()関数

**isNaN()**は、値がNaNかどうかを判定する関数です。

```javascript
if (isNaN(num)) {
  // 数値ではない場合の処理
} else {
  // 数値の場合の処理
}
```

| 引数 | isNaN()の結果 | 意味 |
|-----|-------------|------|
| 123 | false | 数値なので「NaNではない」 |
| NaN | true | 「NaNである」 |
| "abc" | true | 文字列は数値ではない |
| "123" | false | 文字列でも数字なら変換可能 |

### Infinity（無限大）

**Infinity**は「無限大」を表す特殊な値です。0で割り算をすると発生します。

```javascript
const result = 10 / 0;  // Infinity
const result2 = -10 / 0;  // -Infinity
```

## 動作の流れ

### エラーチェックの順序

エラーチェックは、以下の順序で行うのが一般的です。

```
【ステップ1】空文字列チェック
   ↓
   └─→ 空文字列？ ─→ YES → エラー表示 → 終了
        ↓ NO

【ステップ2】NaNチェック
   ↓
   └─→ 数値変換できる？ ─→ NO → エラー表示 → 終了
        ↓ YES

【ステップ3】0で割るチェック
   ↓
   └─→ 割る数が0？ ─→ YES → エラー表示 → 終了
        ↓ NO

【ステップ4】正常な処理
   ↓
   計算実行 → 結果表示
```

### returnによる処理の中断

**return**を使うと、エラーが発生した時点で関数を終了できます。

```
【returnなし】
エラーチェック1 → ❌エラー → エラー表示
                            ↓
エラーチェック2 ←─────────────┘
   ↓
正常処理（実行されてしまう）← 問題！
```

```
【returnあり】
エラーチェック1 → ❌エラー → エラー表示 → return（終了）

エラーチェック2（実行されない）

正常処理（実行されない）← 安全！
```

## 詳細解説

### 1. isNaN()の使い方

```javascript
function checkNumber() {
  let input = "abc";  // 文字列を想定
  let num = Number(input);  // NaNになる

  if (isNaN(num)) {
    // NaNの場合（数値ではない）
    const elem = document.getElementById("result");
    elem.textContent = "エラー: 数値を入力してください";
  } else {
    // NaNでない場合（数値）
    const elem = document.getElementById("result");
    elem.textContent = "正しい数値です: " + num;
  }
}
```

**重要ポイント**：
- `isNaN(num)`は、numがNaNの場合に`true`を返す
- Number()で変換後にチェックする
- 文字列を直接チェックしても正しく判定できない

### 2. 空文字列のチェック

```javascript
function checkInput() {
  let value = "";  // 空文字列

  if (value === "") {
    // 空文字列の場合
    const elem = document.getElementById("result");
    elem.textContent = "エラー: 入力されていません";
  } else {
    // 何か入力されている場合
    const num = Number(value);
    const elem = document.getElementById("result");
    elem.textContent = "入力された値: " + num;
  }
}
```

**なぜ空文字列チェックが必要か**：

| 入力 | === "" | Number()の結果 | isNaN()の結果 | 問題 |
|-----|--------|-------------|-------------|-----|
| "" | true | 0 | false | 空文字列が0になる |
| "0" | false | 0 | false | 本当の0と区別できない |
| " " | false | 0 | false | 空白だけでも0になる |

**結論**：空文字列チェックは、Number()変換の**前**に行う必要があります。

### 3. 0で割るチェック

```javascript
function divide() {
  let num1 = 10;
  let num2 = 0;  // 割る数が0

  if (num2 === 0) {
    // 0で割ろうとしている
    const elem = document.getElementById("result");
    elem.textContent = "エラー: 0で割ることはできません";
  } else {
    // 正常な割り算
    const result = num1 / num2;
    const elem = document.getElementById("result");
    elem.textContent = "答え: " + result;
  }
}
```

**JavaScriptの0除算の動作**：

| 計算 | 結果 | JavaScriptのエラー | 説明 |
|-----|------|-----------------|------|
| 10 / 0 | Infinity | ❌ エラーにならない | 正の無限大 |
| -10 / 0 | -Infinity | ❌ エラーにならない | 負の無限大 |
| 0 / 0 | NaN | ❌ エラーにならない | 不定 |

**重要**：JavaScriptは0除算でエラーを出さないので、自分でチェックする必要があります。

### 4. returnによる処理の終了

```javascript
function calculate() {
  const value = "";
  const error = document.getElementById("error");

  if (value === "") {
    error.textContent = "数値を入力してください";
    return;  // ここで関数を終了
  }

  // 以下の処理は、valueが空でない場合のみ実行される
  const num = Number(value);
  console.log(num);  // valueが空なら実行されない
}
```

**returnの効果**：

```
【returnなし】
if (value === "") {
  error.textContent = "数値を入力してください";
  // ここで終わらない
}
const num = Number(value);  // 空文字列が0に変換される
console.log(num);  // 0が表示される（誤動作）
```

```
【returnあり】
if (value === "") {
  error.textContent = "数値を入力してください";
  return;  // ここで関数が終了
}
const num = Number(value);  // 実行されない
console.log(num);  // 実行されない（安全）
```

### 5. エラーメッセージの表示とクリア

```javascript
function calculate() {
  const value = "abc";
  const num = Number(value);
  const error = document.getElementById("error");

  if (isNaN(num)) {
    error.textContent = "正しい数値を入力してください";
  } else {
    error.textContent = "";  // エラーメッセージをクリア
    // 正常な処理
  }
}
```

**エラーメッセージのクリアが重要な理由**：

```
【1回目の実行】
入力: "abc" → エラー → "正しい数値を入力してください"

【2回目の実行（クリアしない場合）】
入力: "123" → 正常 → エラーメッセージが残ったまま（混乱）

【2回目の実行（クリアする場合）】
入力: "123" → 正常 → エラーメッセージが消える（分かりやすい）
```

### 6. 複数のエラーチェック

```javascript
function safeDivide() {
  const value1 = "10";
  const value2 = "2";
  const error = document.getElementById("error");
  const result = document.getElementById("result");

  // エラーメッセージと結果をクリア
  error.textContent = "";
  result.textContent = "";

  // ❶ 空文字列チェック
  if (value1 === "" || value2 === "") {
    error.textContent = "両方の数値を入力してください";
    return;
  }

  // ❷ 数値変換
  const num1 = Number(value1);
  const num2 = Number(value2);

  // ❸ NaNチェック
  if (isNaN(num1) || isNaN(num2)) {
    error.textContent = "正しい数値を入力してください";
    return;
  }

  // ❹ 0で割るチェック
  if (num2 === 0) {
    error.textContent = "0で割ることはできません";
    return;
  }

  // ❺ 正常な計算
  const answer = num1 / num2;
  result.textContent = "答え: " + answer;
}
```

**チェックの順序が重要な理由**：

| 順序 | チェック内容 | 理由 |
|-----|-----------|------|
| 1番目 | 空文字列チェック | Number()の前に確認 |
| 2番目 | 数値変換 | チェックに必要な数値を作る |
| 3番目 | NaNチェック | 計算前に数値か確認 |
| 4番目 | 0チェック | 割り算特有のチェック |
| 5番目 | 正常処理 | すべてのチェックをパス |

## よくある間違い

### ❌ 間違い1: isNaN()を変換前の値に使う

```javascript
// ❌ 間違い
function check() {
  const value = "abc";
  if (isNaN(value)) {  // 文字列を直接チェック
    console.log("数値ではない");
  }
}
```

```javascript
// ✅ 正しい
function check() {
  const value = "abc";
  const num = Number(value);  // 先に変換
  if (isNaN(num)) {  // 変換後の値をチェック
    console.log("数値ではない");
  }
}
```

**理由**：isNaN()は、引数を自動的にNumber()で変換してからチェックしますが、明示的に変換した方が分かりやすく安全です。

### ❌ 間違い2: 空文字列チェックをしない

```javascript
// ❌ 間違い
function check() {
  const value = "";  // 空文字列
  const num = Number(value);  // 0になる

  if (isNaN(num)) {
    console.log("数値ではない");
  } else {
    console.log("数値です: " + num);  // "数値です: 0"
  }
}
```

```javascript
// ✅ 正しい
function check() {
  const value = "";

  if (value === "") {  // 先に空文字列チェック
    console.log("入力されていません");
    return;
  }

  const num = Number(value);
  console.log("数値です: " + num);
}
```

**エラーメッセージ**：なし（誤動作するだけ）

### ❌ 間違い3: returnを忘れる

```javascript
// ❌ 間違い
function divide() {
  const num1 = 10;
  const num2 = 0;
  const error = document.getElementById("error");
  const result = document.getElementById("result");

  if (num2 === 0) {
    error.textContent = "0で割れません";
    // returnがない
  }

  const answer = num1 / num2;  // Infinityになる
  result.textContent = "答え: " + answer;  // "答え: Infinity"
}
```

```javascript
// ✅ 正しい
function divide() {
  const num1 = 10;
  const num2 = 0;
  const error = document.getElementById("error");
  const result = document.getElementById("result");

  if (num2 === 0) {
    error.textContent = "0で割れません";
    return;  // ここで終了
  }

  const answer = num1 / num2;
  result.textContent = "答え: " + answer;
}
```

**エラーメッセージ**：なし（誤動作するだけ）

### ❌ 間違い4: エラーメッセージをクリアしない

```javascript
// ❌ 間違い
function calculate() {
  const value = "123";
  const num = Number(value);
  const error = document.getElementById("error");

  if (isNaN(num)) {
    error.textContent = "数値ではありません";
  }
  // elseでクリアしていない

  console.log(num);
}
```

```javascript
// ✅ 正しい
function calculate() {
  const value = "123";
  const num = Number(value);
  const error = document.getElementById("error");

  if (isNaN(num)) {
    error.textContent = "数値ではありません";
  } else {
    error.textContent = "";  // エラーメッセージをクリア
  }

  console.log(num);
}
```

**問題**：前回のエラーメッセージが残ったまま、正常な処理が実行される（ユーザーが混乱）

### ❌ 間違い5: Infinityをチェックしない

```javascript
// ❌ 間違い
function divide() {
  const num1 = 10;
  const num2 = 0;
  const result = num1 / num2;  // Infinityになる

  const elem = document.getElementById("result");
  elem.textContent = "答え: " + result;  // "答え: Infinity"
}
```

```javascript
// ✅ 正しい
function divide() {
  const num1 = 10;
  const num2 = 0;
  const elem = document.getElementById("result");

  if (num2 === 0) {  // 0除算を事前にチェック
    elem.textContent = "エラー: 0で割れません";
    return;
  }

  const result = num1 / num2;
  elem.textContent = "答え: " + result;
}
```

**エラーメッセージ**：なし（誤動作するだけ）

### ❌ 間違い6: ||の使い方を間違える

```javascript
// ❌ 間違い
function check() {
  const value1 = "";
  const value2 = "10";

  if (value1 === "" && value2 === "") {  // 両方空の場合のみ
    console.log("入力してください");
  }
  // value1が空でもチェックをすり抜ける
}
```

```javascript
// ✅ 正しい
function check() {
  const value1 = "";
  const value2 = "10";

  if (value1 === "" || value2 === "") {  // どちらか空の場合
    console.log("両方入力してください");
    return;
  }
}
```

**理由**：
- `&&`（AND）：両方の条件が真の場合のみ
- `||`（OR）：どちらかの条件が真の場合

## 実用例

### 実用例1: 数値チェッカー

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>数値チェッカー</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
    }
    .error { color: red; }
    .success { color: green; }
  </style>
</head>
<body>
  <h1>数値チェッカー</h1>
  <button onclick="checkNumber1()">テスト1: "123"</button>
  <button onclick="checkNumber2()">テスト2: "abc"</button>
  <button onclick="checkNumber3()">テスト3: ""</button>
  <p id="result"></p>

  <script>
    function checkNumber1() {
      checkValue("123");
    }

    function checkNumber2() {
      checkValue("abc");
    }

    function checkNumber3() {
      checkValue("");
    }

    function checkValue(input) {
      const elem = document.getElementById("result");

      // 空文字列チェック
      if (input === "") {
        elem.textContent = "❌ エラー: 入力されていません";
        elem.className = "error";
        return;
      }

      // 数値変換
      const num = Number(input);

      // NaNチェック
      if (isNaN(num)) {
        elem.textContent = "❌ エラー: 数値ではありません";
        elem.className = "error";
      } else {
        elem.textContent = "✅ 正しい数値です: " + num;
        elem.className = "success";
      }
    }
  </script>
</body>
</html>
```

**動作**：
- "123" → ✅ 正しい数値です: 123
- "abc" → ❌ エラー: 数値ではありません
- "" → ❌ エラー: 入力されていません

### 実用例2: 安全な割り算計算機

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>安全な割り算計算機</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
    }
    button {
      padding: 10px 20px;
      margin: 5px;
      font-size: 16px;
    }
    .error { color: red; font-weight: bold; }
    .result { color: blue; font-size: 20px; }
  </style>
</head>
<body>
  <h1>割り算計算機</h1>
  <button onclick="test1()">10 ÷ 2</button>
  <button onclick="test2()">10 ÷ 0</button>
  <button onclick="test3()">10 ÷ abc</button>
  <button onclick="test4()">空 ÷ 5</button>
  <p id="error" class="error"></p>
  <p id="result" class="result"></p>

  <script>
    function test1() {
      safeDivide("10", "2");
    }

    function test2() {
      safeDivide("10", "0");
    }

    function test3() {
      safeDivide("10", "abc");
    }

    function test4() {
      safeDivide("", "5");
    }

    function safeDivide(value1, value2) {
      const error = document.getElementById("error");
      const result = document.getElementById("result");

      // 表示をクリア
      error.textContent = "";
      result.textContent = "";

      // ❶ 空文字列チェック
      if (value1 === "" || value2 === "") {
        error.textContent = "エラー: 両方の数値を入力してください";
        return;
      }

      // ❷ 数値変換
      const num1 = Number(value1);
      const num2 = Number(value2);

      // ❸ NaNチェック
      if (isNaN(num1) || isNaN(num2)) {
        error.textContent = "エラー: 正しい数値を入力してください";
        return;
      }

      // ❹ 0で割るチェック
      if (num2 === 0) {
        error.textContent = "エラー: 0で割ることはできません";
        return;
      }

      // ❺ 正常な計算
      const answer = num1 / num2;
      result.textContent = "答え: " + answer;
    }
  </script>
</body>
</html>
```

**動作**：
- 10 ÷ 2 → 答え: 5
- 10 ÷ 0 → エラー: 0で割ることはできません
- 10 ÷ abc → エラー: 正しい数値を入力してください
- 空 ÷ 5 → エラー: 両方の数値を入力してください

### 実用例3: 年齢確認（エラー処理付き）

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>年齢確認</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
    }
    button {
      padding: 10px 20px;
      margin: 5px;
      font-size: 16px;
    }
    .error { color: red; }
    .message { color: green; font-size: 18px; }
  </style>
</head>
<body>
  <h1>年齢確認システム</h1>
  <button onclick="test1()">テスト: 25歳</button>
  <button onclick="test2()">テスト: 15歳</button>
  <button onclick="test3()">テスト: "abc"</button>
  <button onclick="test4()">テスト: 空</button>
  <button onclick="test5()">テスト: -5歳</button>
  <p id="error" class="error"></p>
  <p id="message" class="message"></p>

  <script>
    function test1() { checkAge("25"); }
    function test2() { checkAge("15"); }
    function test3() { checkAge("abc"); }
    function test4() { checkAge(""); }
    function test5() { checkAge("-5"); }

    function checkAge(value) {
      const error = document.getElementById("error");
      const message = document.getElementById("message");

      // 表示をクリア
      error.textContent = "";
      message.textContent = "";

      // ❶ 空文字列チェック
      if (value === "") {
        error.textContent = "エラー: 年齢を入力してください";
        return;
      }

      // ❷ 数値変換
      const age = Number(value);

      // ❸ NaNチェック
      if (isNaN(age)) {
        error.textContent = "エラー: 正しい数値を入力してください";
        return;
      }

      // ❹ 範囲チェック（追加のエラー処理）
      if (age < 0) {
        error.textContent = "エラー: 年齢は0以上で入力してください";
        return;
      }

      if (age > 150) {
        error.textContent = "エラー: 年齢が大きすぎます";
        return;
      }

      // ❺ 正常な判定
      if (age >= 20) {
        message.textContent = "✅ 成人です（" + age + "歳）";
      } else {
        message.textContent = "❌ 未成年です（" + age + "歳）";
      }
    }
  </script>
</body>
</html>
```

**動作**：
- 25歳 → ✅ 成人です（25歳）
- 15歳 → ❌ 未成年です（15歳）
- "abc" → エラー: 正しい数値を入力してください
- 空 → エラー: 年齢を入力してください
- -5歳 → エラー: 年齢は0以上で入力してください

### 実用例4: BMI計算機（複数エラー処理）

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>BMI計算機</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
    }
    button {
      padding: 10px 20px;
      margin: 5px;
      font-size: 16px;
    }
    .error { color: red; font-weight: bold; }
    .result { color: blue; font-size: 18px; }
  </style>
</head>
<body>
  <h1>BMI計算機</h1>
  <p>BMI = 体重(kg) ÷ (身長(m) × 身長(m))</p>
  <button onclick="test1()">正常: 70kg, 1.75m</button>
  <button onclick="test2()">エラー: 空, 1.75m</button>
  <button onclick="test3()">エラー: 70kg, 0m</button>
  <button onclick="test4()">エラー: abc, xyz</button>
  <p id="error" class="error"></p>
  <p id="result" class="result"></p>

  <script>
    function test1() { calculateBMI("70", "1.75"); }
    function test2() { calculateBMI("", "1.75"); }
    function test3() { calculateBMI("70", "0"); }
    function test4() { calculateBMI("abc", "xyz"); }

    function calculateBMI(weightValue, heightValue) {
      const error = document.getElementById("error");
      const result = document.getElementById("result");

      // 表示をクリア
      error.textContent = "";
      result.textContent = "";

      // ❶ 空文字列チェック
      if (weightValue === "" || heightValue === "") {
        error.textContent = "エラー: 体重と身長を入力してください";
        return;
      }

      // ❷ 数値変換
      const weight = Number(weightValue);
      const height = Number(heightValue);

      // ❸ NaNチェック
      if (isNaN(weight) || isNaN(height)) {
        error.textContent = "エラー: 正しい数値を入力してください";
        return;
      }

      // ❹ 範囲チェック
      if (weight <= 0) {
        error.textContent = "エラー: 体重は0より大きい値を入力してください";
        return;
      }

      if (height <= 0) {
        error.textContent = "エラー: 身長は0より大きい値を入力してください";
        return;
      }

      // ❺ 正常な計算
      const bmi = weight / (height * height);
      const bmiRounded = Math.round(bmi * 10) / 10;  // 小数点1桁に丸める

      result.textContent = "BMI: " + bmiRounded;

      // 判定
      if (bmi < 18.5) {
        result.textContent += " （低体重）";
      } else if (bmi < 25) {
        result.textContent += " （普通体重）";
      } else {
        result.textContent += " （肥満）";
      }
    }
  </script>
</body>
</html>
```

**動作**：
- 70kg, 1.75m → BMI: 22.9 （普通体重）
- 空, 1.75m → エラー: 体重と身長を入力してください
- 70kg, 0m → エラー: 身長は0より大きい値を入力してください
- abc, xyz → エラー: 正しい数値を入力してください

## 練習問題

### 問題1: 数値チェック（基本）

ボタンをクリックしたときに、変数の値が数値に変換できるかチェックするプログラムを作成してください。

**仕様**：
- ボタンをクリックすると`checkNumber()`が実行される
- 変数`input`に`"abc"`が入っている
- 数値に変換できる場合: 「正しい数値です」と表示
- 数値に変換できない場合: 「エラー: 数値ではありません」と表示
- isNaN()を使う

<details>
<summary>💡 ヒント1: 全体の流れ</summary>

```
1. 変数inputを宣言して"abc"を代入
2. Number()で変換してnumに代入
3. if (isNaN(num))で判定
4. 結果をid="result"に表示
```
</details>

<details>
<summary>💡 ヒント2: isNaN()の使い方</summary>

```javascript
if (isNaN(num)) {
  // NaNの場合（数値ではない）
} else {
  // 数値の場合
}
```
</details>

<details>
<summary>💡 ヒント3: HTML構造</summary>

```html
<button onclick="checkNumber()">チェック</button>
<p id="result"></p>
```
</details>

<details>
<summary>💡 ヒント4: 関数の骨組み</summary>

```javascript
function checkNumber() {
  let input = "abc";
  let num = Number(input);

  if (isNaN(num)) {
    // エラーメッセージ
  } else {
    // 成功メッセージ
  }
}
```
</details>

<details>
<summary>💡 ヒント5: 要素の取得と表示</summary>

```javascript
const elem = document.getElementById("result");
elem.textContent = "メッセージ";
```
</details>

<details>
<summary>💡 ヒント6: テストケース</summary>

- `input = "abc"` → "エラー: 数値ではありません"
- `input = "123"` → "正しい数値です"
- `input = "12.5"` → "正しい数値です"
</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <title>数値チェック</title>
</head>
<body>
  <h1>数値チェック</h1>
  <button onclick="checkNumber()">チェック</button>
  <p id="result"></p>

  <script>
    function checkNumber() {
      let input = "abc";
      let num = Number(input);

      if (isNaN(num)) {
        const elem = document.getElementById("result");
        elem.textContent = "エラー: 数値ではありません";
      } else {
        const elem = document.getElementById("result");
        elem.textContent = "正しい数値です";
      }
    }
  </script>
</body>
</html>
```
</details>

### 問題2: 空文字列チェック

ボタンをクリックしたときに、変数が空文字列かどうかをチェックするプログラムを作成してください。

**仕様**：
- ボタンをクリックすると`checkInput()`が実行される
- 変数`value`に`""`が入っている
- 空文字列の場合: 「エラー: 入力されていません」と表示
- 空文字列でない場合: 「入力された値: 」に続けて値を表示
- returnを使う

<details>
<summary>💡 ヒント1: 空文字列の判定</summary>

```javascript
if (value === "") {
  // 空文字列の場合
}
```
</details>

<details>
<summary>💡 ヒント2: returnの使い方</summary>

```javascript
if (value === "") {
  elem.textContent = "エラー: 入力されていません";
  return;  // ここで関数を終了
}
// 以下は空文字列でない場合のみ実行される
```
</details>

<details>
<summary>💡 ヒント3: 関数の骨組み</summary>

```javascript
function checkInput() {
  let value = "";

  if (value === "") {
    // エラー処理
    return;
  }

  // 正常処理
}
```
</details>

<details>
<summary>💡 ヒント4: 文字列の連結</summary>

```javascript
elem.textContent = "入力された値: " + value;
```
</details>

<details>
<summary>💡 ヒント5: テストケース</summary>

- `value = ""` → "エラー: 入力されていません"
- `value = "hello"` → "入力された値: hello"
- `value = "123"` → "入力された値: 123"
</details>

<details>
<summary>💡 ヒント6: HTML構造</summary>

```html
<button onclick="checkInput()">チェック</button>
<p id="result"></p>
```
</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <title>空文字列チェック</title>
</head>
<body>
  <h1>空文字列チェック</h1>
  <button onclick="checkInput()">チェック</button>
  <p id="result"></p>

  <script>
    function checkInput() {
      let value = "";
      const elem = document.getElementById("result");

      if (value === "") {
        elem.textContent = "エラー: 入力されていません";
        return;
      }

      elem.textContent = "入力された値: " + value;
    }
  </script>
</body>
</html>
```
</details>

### 問題3: 安全な割り算

ボタンをクリックしたときに、以下のエラーチェックを行う割り算プログラムを作成してください。

**仕様**：
- ボタンをクリックすると`safeDivide()`が実行される
- 変数`value1`に`"10"`、`value2`に`"0"`が入っている
- ❶ 両方の値が入力されているか（空文字列チェック）
- ❷ 両方の値が数値に変換できるか（NaNチェック）
- ❸ 割る数が0ではないか（0チェック）
- すべてのチェックをパスした場合のみ、計算結果を表示
- エラーはid="error"に、結果はid="result"に表示

<details>
<summary>💡 ヒント1: 全体の流れ</summary>

```
1. 表示をクリア
2. 空文字列チェック → エラーならreturn
3. 数値変換
4. NaNチェック → エラーならreturn
5. 0チェック → エラーならreturn
6. 正常な計算
```
</details>

<details>
<summary>💡 ヒント2: 空文字列チェック（OR）</summary>

```javascript
if (value1 === "" || value2 === "") {
  error.textContent = "両方の数値を入力してください";
  return;
}
```
</details>

<details>
<summary>💡 ヒント3: NaNチェック（OR）</summary>

```javascript
if (isNaN(num1) || isNaN(num2)) {
  error.textContent = "正しい数値を入力してください";
  return;
}
```
</details>

<details>
<summary>💡 ヒント4: 0チェック</summary>

```javascript
if (num2 === 0) {
  error.textContent = "0で割ることはできません";
  return;
}
```
</details>

<details>
<summary>💡 ヒント5: 表示のクリア</summary>

```javascript
error.textContent = "";
result.textContent = "";
```
</details>

<details>
<summary>💡 ヒント6: 関数の骨組み</summary>

```javascript
function safeDivide() {
  const value1 = "10";
  const value2 = "0";
  const error = document.getElementById("error");
  const result = document.getElementById("result");

  // クリア
  error.textContent = "";
  result.textContent = "";

  // ❶ 空文字列チェック

  // ❷ 数値変換

  // ❸ NaNチェック

  // ❹ 0チェック

  // ❺ 正常な計算
}
```
</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <title>安全な割り算</title>
  <style>
    .error { color: red; }
    .result { color: blue; }
  </style>
</head>
<body>
  <h1>安全な割り算</h1>
  <button onclick="safeDivide()">10 ÷ 0を計算</button>
  <p id="error" class="error"></p>
  <p id="result" class="result"></p>

  <script>
    function safeDivide() {
      const value1 = "10";
      const value2 = "0";
      const error = document.getElementById("error");
      const result = document.getElementById("result");

      // 表示をクリア
      error.textContent = "";
      result.textContent = "";

      // ❶ 空文字列チェック
      if (value1 === "" || value2 === "") {
        error.textContent = "両方の数値を入力してください";
        return;
      }

      // ❷ 数値変換
      const num1 = Number(value1);
      const num2 = Number(value2);

      // ❸ NaNチェック
      if (isNaN(num1) || isNaN(num2)) {
        error.textContent = "正しい数値を入力してください";
        return;
      }

      // ❹ 0で割るチェック
      if (num2 === 0) {
        error.textContent = "0で割ることはできません";
        return;
      }

      // ❺ 正常な計算
      const answer = num1 / num2;
      result.textContent = "答え: " + answer;
    }
  </script>
</body>
</html>
```
</details>

## チェックリスト

このレッスンを終える前に、以下の項目を確認してください。

- [ ] NaNとは何か説明できる
- [ ] isNaN()関数の使い方を理解している
- [ ] 空文字列のチェック方法を知っている
- [ ] 空文字列チェックをNumber()の前に行う理由を説明できる
- [ ] Infinityとは何か説明できる
- [ ] 0で割り算をした時の動作を理解している
- [ ] returnで関数を途中終了できることを知っている
- [ ] エラーメッセージをクリアする理由を理解している
- [ ] 複数のエラーチェックを正しい順序で書ける
- [ ] ||（OR）と&&（AND）の違いを理解している

## デバッグのヒント

エラー処理のプログラムでうまく動かない時は、以下を確認してください。

### 1. console.log()で値を確認

```javascript
function check() {
  const value = "abc";
  console.log("value:", value);  // "abc"

  const num = Number(value);
  console.log("num:", num);  // NaN

  console.log("isNaN(num):", isNaN(num));  // true
}
```

### 2. エラーチェックの順序を確認

```javascript
// ✅ 正しい順序
1. 空文字列チェック
2. 数値変換
3. NaNチェック
4. 0チェック
5. 正常処理
```

### 3. returnの位置を確認

```javascript
// ❌ 間違い: returnがない
if (num2 === 0) {
  error.textContent = "0で割れません";
  // returnがない
}
const answer = num1 / num2;  // 実行されてしまう

// ✅ 正しい: returnがある
if (num2 === 0) {
  error.textContent = "0で割れません";
  return;  // ここで終了
}
const answer = num1 / num2;  // 実行されない
```

### 4. ||と&&を確認

```javascript
// どちらか一方でも空ならエラー
if (value1 === "" || value2 === "") {  // OR
  error.textContent = "両方入力してください";
}

// 両方とも空の場合のみエラー（これは通常使わない）
if (value1 === "" && value2 === "") {  // AND
  error.textContent = "両方空です";
}
```

## ポイント

### エラーチェックの基本原則

1. **早期リターン（Early Return）**
   - エラーを検出したらすぐにreturnで関数を終了
   - 正常処理をネストの外に書ける
   - コードが読みやすくなる

2. **チェックの順序**
   - 空文字列 → 数値変換 → NaN → 特殊な値（0など）
   - この順序で行うとすべてのエラーを検出できる

3. **エラーメッセージは分かりやすく**
   - 何が問題か明確に伝える
   - 「エラー」だけでなく、具体的な指示を含める
   - 例: 「エラー: 数値を入力してください」

4. **表示のクリア**
   - エラーメッセージは正常時にクリア
   - 前回のメッセージが残らないようにする

## できるようになったこと

このレッスンを終えると、以下のことができるようになります。

1. ✅ **NaNの概念を理解する**
   - Not a Numberの意味を説明できる
   - どんな時にNaNになるか理解している

2. ✅ **isNaN()関数を使う**
   - 数値かどうかを判定できる
   - NaNチェックのコードが書ける

3. ✅ **空文字列をチェックする**
   - === "" で空文字列を判定できる
   - 空文字列とNumber()の関係を理解している

4. ✅ **0除算を防ぐ**
   - 割る数が0かどうかをチェックできる
   - Infinityの意味を理解している

5. ✅ **returnで処理を終了する**
   - エラー時に関数を途中終了できる
   - 早期リターンの利点を理解している

6. ✅ **複数のエラーチェックを組み合わせる**
   - 正しい順序でチェックできる
   - すべてのエラーを適切に検出できる

7. ✅ **エラーメッセージを表示する**
   - 専用の要素にメッセージを表示できる
   - 正常時にメッセージをクリアできる

8. ✅ **実用的な計算機を作る**
   - エラー処理を含む安全なプログラムが書ける
   - ユーザーフレンドリーなアプリケーションを作れる

## まとめ

このレッスンでは、以下のことを学びました。

1. **NaNは「数値ではない」を表す特殊な値**
   - 数値に変換できない文字列をNumber()すると発生
   - isNaN()関数で判定できる

2. **空文字列は0に変換される**
   - === "" で空文字列をチェック
   - Number()の前にチェックする必要がある

3. **0で割るとInfinityになる**
   - JavaScriptはエラーにならない
   - 自分で0チェックを行う必要がある

4. **returnで関数を途中終了できる**
   - エラー時に早期リターン
   - 正常処理をネストの外に書ける

5. **エラーチェックには順序がある**
   - 空文字列 → 数値変換 → NaN → 特殊な値
   - この順序ですべてのエラーを検出できる

6. **||（OR）と&&（AND）を使い分ける**
   - ||: どちらか一方でも真なら真
   - &&: 両方とも真なら真

7. **エラーメッセージは分かりやすく表示する**
   - 専用の要素を用意する
   - 正常時にクリアする
   - 具体的な指示を含める

エラー処理を適切に行うことで、ユーザーにとって使いやすく、安全なアプリケーションを作ることができます。

## 次のステップ

次のレッスンでは、**入力方法の比較**について学びます。

これまで変数に直接値を代入してきましたが、実際のアプリケーションでは、ユーザーから値を入力してもらう必要があります。次のレッスンでは、以下のことを学びます。

- promptとinputの違い
- それぞれの利点と欠点
- 使い分けの基準

エラー処理の知識は、どんな入力方法でも必要になります。しっかりと理解しておきましょう。
