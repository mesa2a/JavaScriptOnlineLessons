# Lesson 032: 四則演算

このレッスンでは、足し算だけでなく、引き算、掛け算、割り算もできる計算機を作ります。

## なぜ重要なのか

四則演算は、すべての計算アプリケーションの基礎となる技術です。実際のウェブサイトで頻繁に使われています。

| サービス | 具体例 | 使用される演算 |
|---------|--------|---------------|
| **Amazon** | 商品価格計算 | 価格 × 数量、合計 + 送料、割引計算 |
| **Uber Eats** | 配達料金計算 | 商品価格 + 配送料 - クーポン |
| **PayPay** | 割り勘機能 | 合計金額 ÷ 人数 |
| **楽天市場** | ポイント計算 | 購入金額 × ポイント率 ÷ 100 |
| **電卓アプリ** | 基本計算 | すべての四則演算 |

これらはすべて、四則演算を組み合わせて実装されています。

## 基本概念の説明

### 四則演算とは

四則演算とは、次の4つの基本的な計算のことです。

| 演算 | 記号 | JavaScript | 例 | 結果 |
|------|------|------------|-----|------|
| **足し算** | + | `+` | `10 + 3` | `13` |
| **引き算** | - | `-` | `10 - 3` | `7` |
| **掛け算** | × | `*` | `10 * 3` | `30` |
| **割り算** | ÷ | `/` | `10 / 3` | `3.333...` |

### 動作の流れ

```
1. ユーザーが1つ目の数値を入力
   input[id="num1"] ← "10"（文字列）
            ↓
2. ユーザーが2つ目の数値を入力
   input[id="num2"] ← "3"（文字列）
            ↓
3. 演算ボタンをクリック（例: 掛け算）
   button[onclick="multiply()"]
            ↓
4. 関数が実行される
   function multiply() 開始
            ↓
5. 値を取得して数値に変換
   num1 = Number("10") → 10
   num2 = Number("3") → 3
            ↓
6. 演算を実行
   result = 10 * 3 → 30
            ↓
7. 結果を表示
   result.textContent = "答え: 30"
            ↓
8. 画面に表示される
   「答え: 30」
```

## JavaScriptでの四則演算

### 基本的な使い方

```javascript
let a = 10;
let b = 3;

let sum = a + b;      // 13 (足し算)
let diff = a - b;     // 7  (引き算)
let product = a * b;  // 30 (掛け算)
let quotient = a / b; // 3.333... (割り算)
```

### 演算子の詳細

**足し算 (+):**
```javascript
10 + 3    // 13
5 + 7     // 12
1.5 + 2.3 // 3.8
```

**引き算 (-):**
```javascript
10 - 3    // 7
5 - 7     // -2（負の数になる）
10 - 10   // 0
```

**掛け算 (*):**
```javascript
10 * 3    // 30
5 * 0     // 0
2.5 * 4   // 10
```

**割り算 (/):**
```javascript
10 / 3    // 3.3333333333333335（小数になる）
12 / 4    // 3
10 / 2    // 5
```

## 四則演算計算機の構造

4つのボタンを用意し、それぞれの演算を実行できるようにします。

HTML:
```html
<input id="num1" type="text" placeholder="数値1">
<input id="num2" type="text" placeholder="数値2">
<button onclick="add()">足し算</button>
<button onclick="subtract()">引き算</button>
<button onclick="multiply()">掛け算</button>
<button onclick="divide()">割り算</button>
<p id="result"></p>
```

**構造:**

```
[入力欄1: num1] ──┐
                  │
[入力欄2: num2] ──┤
                  │
[足し算ボタン] ───┼──→ add()      ──→ num1 + num2
[引き算ボタン] ───┼──→ subtract() ──→ num1 - num2
[掛け算ボタン] ───┼──→ multiply() ──→ num1 * num2
[割り算ボタン] ───┘──→ divide()   ──→ num1 / num2
                             ↓
                    [結果表示: result]
```

## 各演算の実装

### 足し算

```javascript
function add() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 + num2;

  const resultElem = document.getElementById("result");
  resultElem.textContent = "答え: " + result;
}
```

**動作例:**
- 入力: 10, 3
- 計算: 10 + 3
- 結果: "答え: 13"

### 引き算

```javascript
function subtract() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 - num2;

  const resultElem = document.getElementById("result");
  resultElem.textContent = "答え: " + result;
}
```

**動作例:**
- 入力: 10, 3
- 計算: 10 - 3
- 結果: "答え: 7"

**負の数になる場合:**
- 入力: 3, 10
- 計算: 3 - 10
- 結果: "答え: -7"

### 掛け算

```javascript
function multiply() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 * num2;

  const resultElem = document.getElementById("result");
  resultElem.textContent = "答え: " + result;
}
```

**動作例:**
- 入力: 10, 3
- 計算: 10 * 3
- 結果: "答え: 30"

### 割り算

```javascript
function divide() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 / num2;

  const resultElem = document.getElementById("result");
  resultElem.textContent = "答え: " + result;
}
```

**動作例:**
- 入力: 10, 3
- 計算: 10 / 3
- 結果: "答え: 3.3333333333333335"（小数）

## 演算子の優先順位

JavaScriptでは、掛け算と割り算が足し算と引き算より先に計算されます。

### 優先順位の表

| 優先順位 | 演算子 | 例 | 計算順序 |
|---------|--------|-----|---------|
| **高** | `*` `/` | `2 + 3 * 4` | `3 * 4` → `2 + 12` |
| **低** | `+` `-` | `2 - 3 + 4` | 左から順に |

### 優先順位の例

```javascript
let result = 2 + 3 * 4;
console.log(result);  // 14

// 計算の流れ:
// 1. 3 * 4 = 12（掛け算が先）
// 2. 2 + 12 = 14（足し算が後）
```

### 括弧で順序を変更

括弧を使えば、順序を変更できます。

```javascript
let result = (2 + 3) * 4;
console.log(result);  // 20

// 計算の流れ:
// 1. (2 + 3) = 5（括弧内が先）
// 2. 5 * 4 = 20（掛け算が後）
```

**比較:**

```javascript
2 + 3 * 4   // 14（掛け算が優先）
(2 + 3) * 4 // 20（括弧内が優先）

10 - 2 * 3  // 4 （10 - 6）
(10 - 2) * 3 // 24（8 * 3）
```

## 割り算の注意点

### 小数の結果

割り算の結果は小数になることがあります。

```javascript
let result = 10 / 3;
console.log(result);  // 3.3333333333333335
```

**割り切れる場合:**
```javascript
10 / 2  // 5（整数）
12 / 4  // 3（整数）
```

**割り切れない場合:**
```javascript
10 / 3  // 3.3333333333333335（小数）
7 / 2   // 3.5（小数）
```

### 0で割る

0で割ることはできません。JavaScriptでは、0で割ると`Infinity`（無限大）になります。

```javascript
let result = 10 / 0;
console.log(result);  // Infinity
```

**0で割った場合の動作:**

| 計算 | 結果 | 説明 |
|------|------|------|
| `10 / 0` | `Infinity` | 正の無限大 |
| `-10 / 0` | `-Infinity` | 負の無限大 |
| `0 / 0` | `NaN` | 不定（Not a Number） |

**注意:**

エラー処理には`if`文を使いますが、まだ学習していないため、この段階では**0で割らないことを前提**とします。

後のレッスンで条件分岐を学ぶと、次のような処理ができるようになります:

```javascript
// 今後学ぶ内容（参考）
if (num2 === 0) {
  result.textContent = "エラー: 0で割ることはできません";
} else {
  const answer = num1 / num2;
  result.textContent = "答え: " + answer;
}
```

## よくある間違いと解決方法

### 間違い1: 演算子の間違い

```javascript
// ❌ 間違い：掛け算に×を使う
function multiply() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 × num2;  // JavaScriptでは×は使えない
}
```

**エラーメッセージ:**
```
Uncaught SyntaxError: Unexpected token '×'
```

**何が問題か:**
JavaScriptでは掛け算に`*`を使います。数学の記号`×`は使えません。

**解決方法:**
```javascript
// ✅ 正しい
function multiply() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 * num2;  // *を使う
}
```

### 間違い2: Number変換を忘れる

```javascript
// ❌ 間違い：引き算でも変換が必要
function subtract() {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;
  const result = num1 - num2;  // 文字列で引き算
}
```

**結果:**
- 入力: "10", "3"
- 計算: "10" - "3"
- 結果: 7（偶然正しく動く）

**何が問題か:**
引き算、掛け算、割り算は文字列でも数値に自動変換されますが、**足し算だけは文字列連結になる**ため、統一して`Number()`を使うべきです。

**解決方法:**
```javascript
// ✅ 正しい：すべての演算でNumber変換を使う
function subtract() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 - num2;
}
```

### 間違い3: 関数名の重複

```javascript
// ❌ 間違い：すべて同じ関数名
function calculate() {
  const result = num1 + num2;
}

function calculate() {  // 上書きされる
  const result = num1 - num2;
}

function calculate() {  // 最後だけ有効
  const result = num1 * num2;
}
```

**何が問題か:**
同じ関数名を複数定義すると、最後の定義だけが有効になります。

**解決方法:**
```javascript
// ✅ 正しい：それぞれ別の関数名
function add() {
  const result = num1 + num2;
}

function subtract() {
  const result = num1 - num2;
}

function multiply() {
  const result = num1 * num2;
}
```

### 間違い4: ボタンと関数の不一致

```javascript
// ❌ 間違い
<button onclick="add()">足し算</button>
<button onclick="sub()">引き算</button>  // 関数名が違う

function add() { /* ... */ }
function subtract() { /* ... */ }  // subではなくsubtract
```

**エラーメッセージ:**
```
Uncaught ReferenceError: sub is not defined
```

**何が問題か:**
HTML側は`sub()`を呼んでいますが、関数名は`subtract()`です。

**解決方法:**
```javascript
// ✅ 正しい：一致させる
<button onclick="add()">足し算</button>
<button onclick="subtract()">引き算</button>

function add() { /* ... */ }
function subtract() { /* ... */ }
```

### 間違い5: 結果変数名の衝突

```javascript
// ❌ 間違い：変数名が要素名と衝突
function add() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 + num2;

  const result = document.getElementById("result");  // エラー
  result.textContent = "答え: " + result;
}
```

**エラーメッセージ:**
```
Uncaught SyntaxError: Identifier 'result' has already been declared
```

**何が問題か:**
同じ変数名`result`を2回宣言しています。

**解決方法:**
```javascript
// ✅ 正しい：別の変数名を使う
function add() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const answer = num1 + num2;

  const result = document.getElementById("result");
  result.textContent = "答え: " + answer;
}
```

### 間違い6: 演算子の優先順位を誤解

```javascript
// ⚠️ 注意：意図と異なる計算
const result = 10 + 5 * 2;
console.log(result);  // 20（10 + 10）と思うかもしれない
                      // 実際は20（10 + (5 * 2)）
```

**何が問題か:**
掛け算が先に計算されることを忘れています。

**解決方法:**
```javascript
// ✅ 正しい：括弧で明示
const result = (10 + 5) * 2;  // 30（意図通り）
```

## 実用例

### 例1: 基本的な四則演算計算機

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>四則演算計算機</title>
</head>
<body>
  <h1>四則演算計算機</h1>

  <input id="num1" type="text" placeholder="数値1">
  <input id="num2" type="text" placeholder="数値2">
  <br><br>
  <button onclick="add()">足し算 (+)</button>
  <button onclick="subtract()">引き算 (-)</button>
  <button onclick="multiply()">掛け算 (×)</button>
  <button onclick="divide()">割り算 (÷)</button>

  <p id="result"></p>

  <script>
    function add() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      const result = num1 + num2;
      document.getElementById("result").textContent = "答え: " + result;
    }

    function subtract() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      const result = num1 - num2;
      document.getElementById("result").textContent = "答え: " + result;
    }

    function multiply() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      const result = num1 * num2;
      document.getElementById("result").textContent = "答え: " + result;
    }

    function divide() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      const result = num1 / num2;
      document.getElementById("result").textContent = "答え: " + result;
    }
  </script>
</body>
</html>
```

**動作:**
- 2つの数値を入力
- 好きな演算ボタンをクリック
- 計算結果が表示される

### 例2: 計算式も表示する計算機

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>計算式表示計算機</title>
</head>
<body>
  <h1>計算式も表示する計算機</h1>

  <input id="num1" type="text" placeholder="数値1">
  <input id="num2" type="text" placeholder="数値2">
  <br><br>
  <button onclick="add()">+</button>
  <button onclick="subtract()">-</button>
  <button onclick="multiply()">×</button>
  <button onclick="divide()">÷</button>

  <p id="result"></p>

  <script>
    function add() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      const result = num1 + num2;
      document.getElementById("result").textContent =
        num1 + " + " + num2 + " = " + result;
    }

    function subtract() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      const result = num1 - num2;
      document.getElementById("result").textContent =
        num1 + " - " + num2 + " = " + result;
    }

    function multiply() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      const result = num1 * num2;
      document.getElementById("result").textContent =
        num1 + " × " + num2 + " = " + result;
    }

    function divide() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      const result = num1 / num2;
      document.getElementById("result").textContent =
        num1 + " ÷ " + num2 + " = " + result;
    }
  </script>
</body>
</html>
```

**動作:**
- 計算式と結果を両方表示
- 例: "10 + 3 = 13"

### 例3: 記号ボタンの計算機

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>記号ボタン計算機</title>
  <style>
    button {
      font-size: 24px;
      width: 50px;
      height: 50px;
      margin: 5px;
    }
  </style>
</head>
<body>
  <h1>記号ボタン計算機</h1>

  <input id="num1" type="text" placeholder="数値1" style="font-size: 18px;">
  <input id="num2" type="text" placeholder="数値2" style="font-size: 18px;">
  <br><br>
  <button onclick="add()">+</button>
  <button onclick="subtract()">-</button>
  <button onclick="multiply()">×</button>
  <button onclick="divide()">÷</button>

  <h2 id="result"></h2>

  <script>
    function add() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      const result = num1 + num2;
      document.getElementById("result").textContent = result;
    }

    function subtract() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      const result = num1 - num2;
      document.getElementById("result").textContent = result;
    }

    function multiply() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      const result = num1 * num2;
      document.getElementById("result").textContent = result;
    }

    function divide() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      const result = num1 / num2;
      document.getElementById("result").textContent = result;
    }
  </script>
</body>
</html>
```

**動作:**
- 大きな記号ボタン
- シンプルなデザイン

### 例4: リアルタイム計算（最後に押したボタンの演算）

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>リアルタイム計算機</title>
</head>
<body>
  <h1>リアルタイム計算機</h1>

  <input id="num1" type="text" oninput="calculate()" placeholder="数値1">
  <input id="num2" type="text" oninput="calculate()" placeholder="数値2">
  <br><br>
  <button onclick="setOperation('add')">+</button>
  <button onclick="setOperation('subtract')">-</button>
  <button onclick="setOperation('multiply')">×</button>
  <button onclick="setOperation('divide')">÷</button>

  <p id="result"></p>

  <script>
    let currentOperation = 'add';  // 初期値は足し算

    function setOperation(operation) {
      currentOperation = operation;
      calculate();
    }

    function calculate() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      let result;

      if (currentOperation === 'add') {
        result = num1 + num2;
      } else if (currentOperation === 'subtract') {
        result = num1 - num2;
      } else if (currentOperation === 'multiply') {
        result = num1 * num2;
      } else if (currentOperation === 'divide') {
        result = num1 / num2;
      }

      document.getElementById("result").textContent = "答え: " + result;
    }
  </script>
</body>
</html>
```

**動作:**
- 入力するたびに自動計算
- ボタンで演算を切り替え

## 練習問題

次の要件を満たす四則演算計算機を作成してください。

**要件:**

1. id="num1"のinput要素を用意する（placeholderは"1つ目の数値"）
2. id="num2"のinput要素を用意する（placeholderは"2つ目の数値"）
3. id="result"のp要素を用意する
4. add関数を定義し、2つの数値を足し算して結果を表示する
5. subtract関数を定義し、2つの数値を引き算して結果を表示する
6. multiply関数を定義し、2つの数値を掛け算して結果を表示する
7. divide関数を定義し、2つの数値を割り算して結果を表示する
8. 4つのボタンを作成し、それぞれクリックすると対応する関数が実行されるようにする
   - 足し算ボタン: テキストは"+"
   - 引き算ボタン: テキストは"-"
   - 掛け算ボタン: テキストは"×"
   - 割り算ボタン: テキストは"÷"

すべての関数で、結果は「答え: 」+計算結果の形式で表示してください。

<details>
<summary>💡 ヒント1: HTML構造</summary>

2つのinput要素、4つのbutton要素、1つのp要素が必要です。

```html
<input id="num1" type="text" placeholder="1つ目の数値">
<input id="num2" type="text" placeholder="2つ目の数値">
<button onclick="add()">+</button>
<button onclick="subtract()">-</button>
<button onclick="multiply()">×</button>
<button onclick="divide()">÷</button>
<p id="result"></p>
```
</details>

<details>
<summary>💡 ヒント2: 各演算の実装</summary>

4つの関数はほぼ同じ構造で、演算子だけが異なります。

```javascript
function add() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const answer = num1 + num2;  // 演算子が異なる
  document.getElementById("result").textContent = "答え: " + answer;
}
```
</details>

<details>
<summary>💡 ヒント3: 演算子の対応</summary>

| 関数名 | 演算子 | 計算例 |
|--------|--------|--------|
| add | `+` | `num1 + num2` |
| subtract | `-` | `num1 - num2` |
| multiply | `*` | `num1 * num2` |
| divide | `/` | `num1 / num2` |
</details>

<details>
<summary>💡 ヒント4: subtract関数の例</summary>

```javascript
function subtract() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const answer = num1 - num2;
  document.getElementById("result").textContent = "答え: " + answer;
}
```
</details>

<details>
<summary>💡 ヒント5: multiply関数の例</summary>

```javascript
function multiply() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const answer = num1 * num2;
  document.getElementById("result").textContent = "答え: " + answer;
}
```
</details>

<details>
<summary>💡 ヒント6: divide関数の例</summary>

```javascript
function divide() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const answer = num1 / num2;
  document.getElementById("result").textContent = "答え: " + answer;
}
```
</details>

<details>
<summary>💡 ヒント7: 完成例の構造</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>四則演算計算機</title>
</head>
<body>
  <h1>四則演算計算機</h1>

  <!-- 2つのinput要素 -->
  <!-- 4つのボタン -->
  <!-- 結果表示用p要素 -->

  <script>
    function add() {
      // 足し算の実装
    }

    function subtract() {
      // 引き算の実装
    }

    function multiply() {
      // 掛け算の実装
    }

    function divide() {
      // 割り算の実装
    }
  </script>
</body>
</html>
```
</details>

### チェックリスト

実装後、次の項目を確認してください:

- [ ] 2つのinput要素がある
- [ ] それぞれのinput要素にidが正しく設定されている
- [ ] placeholderが設定されている
- [ ] 4つのボタンがある（+、-、×、÷）
- [ ] 各ボタンのonclick属性が設定されている
- [ ] 結果表示用のp要素がある
- [ ] 4つの関数（add、subtract、multiply、divide）が定義されている
- [ ] すべての関数でNumber変換をしている
- [ ] 足し算ボタンをクリックすると正しく計算される
- [ ] 引き算ボタンをクリックすると正しく計算される
- [ ] 掛け算ボタンをクリックすると正しく計算される
- [ ] 割り算ボタンをクリックすると正しく計算される

### デバッグのヒント

うまく動かない場合は、次を確認してください:

1. **console.logで演算を確認:**
```javascript
function multiply() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  console.log("num1:", num1, "num2:", num2);

  const answer = num1 * num2;
  console.log("計算結果:", answer);

  document.getElementById("result").textContent = "答え: " + answer;
}
```

2. **演算子の確認:**
```javascript
// 掛け算は×ではなく*
10 * 3  // ✅ 正しい
10 × 3  // ❌ エラー
```

3. **関数名とボタンの対応:**
```html
<button onclick="add()">+</button>     ← function add()
<button onclick="subtract()">-</button> ← function subtract()
<button onclick="multiply()">×</button> ← function multiply()
<button onclick="divide()">÷</button>   ← function divide()
```

## ポイント

- 四則演算は `+`、`-`、`*`、`/` を使います
- 掛け算は`×`ではなく`*`、割り算は`÷`ではなく`/`です
- どの演算も、Number関数で数値変換が必要です
- 掛け算と割り算は足し算と引き算より優先されます
- 括弧`()`で計算順序を制御できます
- 割り算の結果は小数になることがあります
- 0で割ると`Infinity`になります
- 各演算ごとに別の関数を定義します
- 関数名とボタンのonclick属性を一致させます

## できるようになったこと

このレッスンを終えると、次のことができるようになります:

- [ ] 4つの基本演算を実装できる
- [ ] JavaScriptの演算子を正しく使える
- [ ] 複数のボタンで異なる処理を実行できる
- [ ] 各演算ごとに関数を分けて定義できる
- [ ] 演算子の優先順位を理解できる
- [ ] 割り算の小数結果を扱える
- [ ] 負の数の計算結果を理解できる
- [ ] 実用的な計算機を作成できる

## まとめ

このレッスンでは、四則演算ができる計算機を作成しました。

### 重要なポイント7つ:

1. **4つの演算子**: `+`（足し算）、`-`（引き算）、`*`（掛け算）、`/`（割り算）
2. **数値変換**: すべての演算で`Number()`が必要
3. **関数の分離**: 各演算ごとに別の関数を定義
4. **優先順位**: `*`と`/`は`+`と`-`より優先
5. **括弧の利用**: `()`で計算順序を制御
6. **小数の扱い**: 割り算は小数結果になる可能性
7. **ボタンと関数**: onclick属性で関数を呼び出す

これにより、実用的な計算機を作ることができます。

## 次のステップ

次のレッスンでは、**余り計算（%演算子）**について学びます。

- 余り算の使い方
- 偶数・奇数の判定
- 繰り返しパターンの実装
- 実用的な余り計算

四則演算の知識を応用して、さらに高度な計算処理ができるようになります。
