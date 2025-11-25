# Lesson 031: 足し算計算機

このレッスンでは、2つの数値を入力して足し算をする計算機を作ります。

## なぜ重要なのか

足し算計算機は、入力値の計算処理の基本となる技術です。実際のウェブサイトで頻繁に使われています。

| サービス | 具体例 | 使用される計算 |
|---------|--------|---------------|
| **Amazon** | ショッピングカート | 商品価格の合計計算 |
| **楽天市場** | 送料計算 | 商品価格 + 送料の合計 |
| **食べログ** | 割り勘計算 | 合計金額 ÷ 人数 |
| **Yahoo!ショッピング** | ポイント計算 | 購入金額 × ポイント率 |
| **メルカリ** | 手数料計算 | 販売価格 - 手数料 |

これらはすべて、ユーザーの入力値を数値に変換して計算しています。

## 基本概念の説明

### 足し算計算機とは

ユーザーが2つの数値を入力し、ボタンをクリックすると合計が表示されるプログラムです。

```
[入力欄1: 10] ────┐
                  │
[入力欄2: 20] ────┼──→ JavaScript ──→ [結果表示]
                  │   Number変換          "答え: 30"
[計算ボタン] ─────┘   足し算
```

### 動作の流れ

```
1. ユーザーが1つ目の数値を入力
   input[id="num1"] ← "10"（文字列）
            ↓
2. ユーザーが2つ目の数値を入力
   input[id="num2"] ← "20"（文字列）
            ↓
3. 計算ボタンをクリック
   button[onclick="calculate()"]
            ↓
4. 関数が実行される
   function calculate() 開始
            ↓
5. 値を取得する
   value1 = "10"（文字列）
   value2 = "20"（文字列）
            ↓
6. 数値に変換する
   num1 = Number("10") → 10（数値）
   num2 = Number("20") → 20（数値）
            ↓
7. 足し算を実行する
   sum = 10 + 20 → 30
            ↓
8. 結果を表示する
   result.textContent = "答え: 30"
            ↓
9. 画面に表示される
   「答え: 30」
```

## 基本的な構造

足し算計算機には次の要素が必要です。

| 要素 | 役割 | HTML例 |
|------|------|--------|
| **1つ目の入力欄** | 数値1を入力 | `<input id="num1">` |
| **2つ目の入力欄** | 数値2を入力 | `<input id="num2">` |
| **計算ボタン** | 計算を実行 | `<button onclick="calculate()">` |
| **結果表示欄** | 答えを表示 | `<p id="result"></p>` |

## コード例

HTML:
```html
<input id="num1" type="text" placeholder="数値1">
<input id="num2" type="text" placeholder="数値2">
<button onclick="calculate()">計算</button>
<p id="result"></p>
```

JavaScript:
```javascript
function calculate() {
  const input1 = document.getElementById("num1");
  const input2 = document.getElementById("num2");

  const value1 = input1.value;
  const value2 = input2.value;

  const num1 = Number(value1);
  const num2 = Number(value2);

  const sum = num1 + num2;

  const result = document.getElementById("result");
  result.textContent = "答え: " + sum;
}
```

## 処理の詳細

### 1. 値を取得する

```javascript
const input1 = document.getElementById("num1");
const input2 = document.getElementById("num2");

const value1 = input1.value;
const value2 = input2.value;
```

**重要:**
- input要素から取得した値は**常に文字列**です
- たとえ数字を入力しても、`value`は文字列型になります

```javascript
// 例: ユーザーが「10」と入力した場合
const value = input.value;
console.log(value);        // "10"（文字列）
console.log(typeof value); // "string"
```

### 2. 数値に変換する

```javascript
const num1 = Number(value1);
const num2 = Number(value2);
```

`Number()`関数で文字列を数値に変換します。

**変換の仕組み:**

```javascript
Number("10")    // → 10（数値）
Number("20.5")  // → 20.5（数値）
Number("")      // → 0（空文字列は0）
Number("abc")   // → NaN（数値でない文字列はNaN）
```

**なぜ変換が必要か:**

```javascript
// ❌ 変換しない場合
"10" + "20"  // → "1020"（文字列の連結）

// ✅ 変換した場合
10 + 20      // → 30（数値の足し算）
```

### 3. 計算する

```javascript
const sum = num1 + num2;
```

数値に変換した後に足し算をします。

**計算例:**

```javascript
const num1 = 10;
const num2 = 20;
const sum = num1 + num2;  // 30
```

### 4. 結果を表示する

```javascript
const result = document.getElementById("result");
result.textContent = "答え: " + sum;
```

計算結果を画面に表示します。

**表示の仕組み:**

```javascript
// sumが30の場合
result.textContent = "答え: " + 30;
// → 数値30が文字列に変換されて連結される
// → "答え: 30"
```

## 文字列と数値の違い

### Number変換を忘れた場合

Number変換を忘れると、文字列として連結されてしまいます。

```javascript
// ❌ 悪い例：変換を忘れた
const value1 = "10";
const value2 = "20";
const sum = value1 + value2;
console.log(sum);  // "1020"（文字列として連結される）
```

```javascript
// ✅ 良い例：正しく変換
const value1 = "10";
const value2 = "20";
const num1 = Number(value1);
const num2 = Number(value2);
const sum = num1 + num2;
console.log(sum);  // 30（数値として計算される）
```

### 比較表

| 処理 | 変換なし | 変換あり |
|------|----------|----------|
| データ型 | `"10"` (string) | `10` (number) |
| 計算結果 | `"10" + "20"` = `"1020"` | `10 + 20` = `30` |
| 演算 | 文字列の連結 | 数値の足し算 |

## より簡潔な書き方

変数の宣言を減らして、より簡潔に書くこともできます。

```javascript
// 📝 段階的な書き方（初心者向け）
function calculate() {
  const input1 = document.getElementById("num1");
  const input2 = document.getElementById("num2");

  const value1 = input1.value;
  const value2 = input2.value;

  const num1 = Number(value1);
  const num2 = Number(value2);

  const sum = num1 + num2;

  const result = document.getElementById("result");
  result.textContent = "答え: " + sum;
}
```

```javascript
// ⚡ 簡潔な書き方（慣れてきたら）
function calculate() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const sum = num1 + num2;

  const result = document.getElementById("result");
  result.textContent = "答え: " + sum;
}
```

**どちらを使うべきか:**
- 学習段階では段階的な書き方がわかりやすい
- 慣れてきたら簡潔な書き方も使える
- どちらも正しいコードです

## リアルタイム計算

`oninput`イベントを使えば、入力するたびに計算できます。

HTML:
```html
<input id="num1" type="text" oninput="calculate()" placeholder="数値1">
<input id="num2" type="text" oninput="calculate()" placeholder="数値2">
<p id="result"></p>
```

JavaScript:
```javascript
function calculate() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const sum = num1 + num2;

  const result = document.getElementById("result");
  result.textContent = "答え: " + sum;
}
```

**動作:**

```
ユーザーが1つ目に「5」と入力
  ↓
calculate()が実行される
  ↓
結果: "答え: 5"（2つ目は空なので0として計算）

ユーザーが2つ目に「3」と入力
  ↓
calculate()が実行される
  ↓
結果: "答え: 8"
```

どちらのinput要素でも、入力するたびに計算結果が更新されます。

## 空の入力への対応

ユーザーが何も入力していない場合、`Number("")`は0になります。

```javascript
const num = Number("");
console.log(num);  // 0
```

**動作例:**

| num1の入力 | num2の入力 | 結果 |
|-----------|-----------|------|
| "10" | "20" | 30 |
| "10" | "" (空) | 10 |
| "" (空) | "20" | 20 |
| "" (空) | "" (空) | 0 |

このため、何も入力されていないときは0として計算されます。

## よくある間違いと解決方法

### 間違い1: Number変換を忘れる

```javascript
// ❌ 間違い
function calculate() {
  const value1 = document.getElementById("num1").value;
  const value2 = document.getElementById("num2").value;
  const sum = value1 + value2;  // Number変換を忘れている

  const result = document.getElementById("result");
  result.textContent = "答え: " + sum;
}
```

**結果:**
- 入力: 10と20
- 表示: "答え: 1020"（連結されてしまう）

**何が問題か:**
`value`は文字列なので、`+`演算子は文字列連結として動作します。

**解決方法:**
```javascript
// ✅ 正しい
function calculate() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const sum = num1 + num2;

  const result = document.getElementById("result");
  result.textContent = "答え: " + sum;
}
```

### 間違い2: 変換のタイミングが遅い

```javascript
// ❌ 間違い
function calculate() {
  const value1 = document.getElementById("num1").value;
  const value2 = document.getElementById("num2").value;
  const sum = value1 + value2;  // ここで連結されてしまう
  const result = Number(sum);   // 変換が遅すぎる
}
```

**結果:**
- 入力: 10と20
- sum: "1020"（文字列）
- result: 1020（数値だが、意図した30ではない）

**何が問題か:**
連結された後に変換しても、元の計算には影響しません。

**解決方法:**
```javascript
// ✅ 正しい
function calculate() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const sum = num1 + num2;  // 変換してから計算
}
```

### 間違い3: IDのスペルミス

```javascript
// ❌ 間違い
<input id="num1" type="text">
<input id="num2" type="text">

function calculate() {
  const num1 = Number(document.getElementById("number1").value);  // IDが違う
  const num2 = Number(document.getElementById("num2").value);
}
```

**エラーメッセージ:**
```
Uncaught TypeError: Cannot read properties of null (reading 'value')
```

**何が問題か:**
IDが"num1"なのに"number1"で取得しようとしています。

**解決方法:**
```javascript
// ✅ 正しい
function calculate() {
  const num1 = Number(document.getElementById("num1").value);  // 正しいID
  const num2 = Number(document.getElementById("num2").value);
}
```

### 間違い4: 結果を数値のまま表示

```javascript
// ❌ 間違い
function calculate() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const sum = num1 + num2;

  const result = document.getElementById("result");
  result.textContent = sum;  // 数値だけを表示
}
```

**結果:**
- 表示: "30"（これでも動くが、わかりにくい）

**何が問題か:**
数値だけだと、何の結果かわかりにくいです。

**解決方法:**
```javascript
// ✅ 正しい
function calculate() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const sum = num1 + num2;

  const result = document.getElementById("result");
  result.textContent = "答え: " + sum;  // ラベルをつける
}
```

### 間違い5: NaNの処理を考慮していない

```javascript
// ⚠️ 注意が必要
function calculate() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const sum = num1 + num2;

  const result = document.getElementById("result");
  result.textContent = "答え: " + sum;
}
```

**入力が数値でない場合:**
- 入力: "abc"と"10"
- num1: NaN
- sum: NaN
- 表示: "答え: NaN"

**注意:**
今の段階では、ユーザーが正しい数値を入力することを前提とします。入力検証は後のレッスンで学びます。

### 間違い6: 関数名の付け間違い

```javascript
// ❌ 間違い
<button onclick="calculate()">計算</button>

function calc() {  // 関数名が違う
  // ...
}
```

**エラーメッセージ:**
```
Uncaught ReferenceError: calculate is not defined
```

**何が問題か:**
HTML側は`calculate()`を呼び出していますが、関数名は`calc()`です。

**解決方法:**
```javascript
// ✅ 正しい
<button onclick="calculate()">計算</button>

function calculate() {  // 関数名を一致させる
  // ...
}
```

## 実用例

### 例1: 基本的な足し算計算機

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>足し算計算機</title>
</head>
<body>
  <h1>足し算計算機</h1>

  <input id="num1" type="text" placeholder="数値1">
  +
  <input id="num2" type="text" placeholder="数値2">
  <button onclick="calculate()">計算</button>

  <p id="result"></p>

  <script>
    function calculate() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      const sum = num1 + num2;

      const result = document.getElementById("result");
      result.textContent = "答え: " + sum;
    }
  </script>
</body>
</html>
```

**動作:**
- 2つの数値を入力
- 計算ボタンをクリック
- 合計が表示される

### 例2: リアルタイム計算機

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>リアルタイム計算機</title>
</head>
<body>
  <h1>リアルタイム足し算</h1>

  <input id="num1" type="text" oninput="calculate()" placeholder="数値1">
  +
  <input id="num2" type="text" oninput="calculate()" placeholder="数値2">

  <h2>結果: <span id="result">0</span></h2>

  <script>
    function calculate() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      const sum = num1 + num2;

      const result = document.getElementById("result");
      result.textContent = sum;
    }
  </script>
</body>
</html>
```

**動作:**
- 入力するたびに自動計算
- ボタン不要
- 即座に結果が更新される

### 例3: 詳細表示付き計算機

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>詳細表示計算機</title>
</head>
<body>
  <h1>足し算計算機（詳細表示）</h1>

  <input id="num1" type="text" placeholder="数値1">
  <input id="num2" type="text" placeholder="数値2">
  <button onclick="calculate()">計算</button>

  <p id="detail"></p>
  <p id="result"></p>

  <script>
    function calculate() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      const sum = num1 + num2;

      const detail = document.getElementById("detail");
      detail.textContent = num1 + " + " + num2 + " =";

      const result = document.getElementById("result");
      result.textContent = sum;
    }
  </script>
</body>
</html>
```

**動作:**
- 計算式を表示: "10 + 20 ="
- 答えを別行に表示: "30"

### 例4: 小数点対応計算機

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>小数点対応計算機</title>
</head>
<body>
  <h1>小数点も計算できる足し算</h1>

  <input id="num1" type="text" placeholder="数値1（小数可）">
  <input id="num2" type="text" placeholder="数値2（小数可）">
  <button onclick="calculate()">計算</button>

  <p id="result"></p>

  <script>
    function calculate() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      const sum = num1 + num2;

      const result = document.getElementById("result");
      result.textContent = num1 + " + " + num2 + " = " + sum;
    }
  </script>
</body>
</html>
```

**動作:**
- 小数点を含む数値も計算可能
- 例: 10.5 + 20.3 = 30.8

## 練習問題

次の要件を満たす足し算計算機を作成してください。

**要件:**

1. id="num1"のinput要素を用意する（placeholderは"1つ目の数値"）
2. id="num2"のinput要素を用意する（placeholderは"2つ目の数値"）
3. id="result"のp要素を用意する
4. calculateAdd関数を定義し、次の処理を行う:
   - id="num1"の値を取得し、Number関数で数値に変換する
   - id="num2"の値を取得し、Number関数で数値に変換する
   - 2つの数値を足し算する
   - id="result"の要素のtextContentに「答え: 」+合計値を設定する
5. ボタンを作成し、クリックするとcalculateAdd関数が実行されるようにする（ボタンのテキストは"計算"）

<details>
<summary>💡 ヒント1: HTML構造</summary>

2つのinput要素、1つのbutton要素、1つのp要素が必要です。

```html
<input id="num1" type="text" placeholder="1つ目の数値">
<input id="num2" type="text" placeholder="2つ目の数値">
<button onclick="calculateAdd()">計算</button>
<p id="result"></p>
```
</details>

<details>
<summary>💡 ヒント2: 値の取得と変換</summary>

`document.getElementById().value`で取得し、`Number()`で変換します。

```javascript
const num1 = Number(document.getElementById("num1").value);
const num2 = Number(document.getElementById("num2").value);
```
</details>

<details>
<summary>💡 ヒント3: 足し算の実行</summary>

`+`演算子で足し算をします。

```javascript
const sum = num1 + num2;
```
</details>

<details>
<summary>💡 ヒント4: 結果の表示</summary>

textContentに文字列と数値を連結して設定します。

```javascript
const result = document.getElementById("result");
result.textContent = "答え: " + sum;
```
</details>

<details>
<summary>💡 ヒント5: 関数の構造</summary>

関数の基本構造は次のようになります。

```javascript
function calculateAdd() {
  // 1. 値を取得して数値に変換
  // 2. 足し算を実行
  // 3. 結果を表示
}
```
</details>

<details>
<summary>💡 ヒント6: Number変換の重要性</summary>

Number変換を忘れると文字列連結になります。

```javascript
// ❌ 変換なし: "10" + "20" = "1020"
// ✅ 変換あり: 10 + 20 = 30
```
</details>

<details>
<summary>💡 ヒント7: 完成例の構造</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>足し算計算機</title>
</head>
<body>
  <h1>足し算計算機</h1>

  <!-- 2つのinput要素 -->
  <!-- ボタン -->
  <!-- 結果表示用p要素 -->

  <script>
    function calculateAdd() {
      // 値を取得して数値に変換
      // 足し算を実行
      // 結果を表示
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
- [ ] ボタンがある
- [ ] ボタンのonclick属性が設定されている
- [ ] 結果表示用のp要素がある
- [ ] calculateAdd関数が定義されている
- [ ] Number関数で数値に変換している
- [ ] 足し算の結果が正しく表示される
- [ ] ボタンをクリックすると計算が実行される

### デバッグのヒント

うまく動かない場合は、次を確認してください:

1. **console.logで値を確認:**
```javascript
function calculateAdd() {
  const value1 = document.getElementById("num1").value;
  const value2 = document.getElementById("num2").value;
  console.log("取得した値:", value1, value2);
  console.log("型:", typeof value1, typeof value2);

  const num1 = Number(value1);
  const num2 = Number(value2);
  console.log("変換後:", num1, num2);
  console.log("型:", typeof num1, typeof num2);

  const sum = num1 + num2;
  console.log("合計:", sum);
}
```

2. **Number変換の確認:**
```javascript
// 文字列のまま足し算すると連結される
console.log("10" + "20");  // "1020"

// 数値に変換してから足し算
console.log(Number("10") + Number("20"));  // 30
```

3. **IDの確認:**
```javascript
// HTMLとJavaScriptでIDが一致しているか
<input id="num1">  // HTML
document.getElementById("num1")  // JavaScript（一致している）
```

## ポイント

- input要素から取得した値は**常に文字列**です
- `Number()`関数で数値に変換してから計算します
- 数値変換を忘れると文字列として連結されます
- 変換は計算の**前**に行う必要があります
- `oninput`を使えばリアルタイムに計算できます
- 空の文字列をNumber変換すると0になります
- 数値でない文字列を変換するとNaNになります
- 計算結果には説明ラベルをつけるとわかりやすいです

## できるようになったこと

このレッスンを終えると、次のことができるようになります:

- [ ] 2つのinput要素から値を取得できる
- [ ] 文字列を数値に変換できる
- [ ] Number関数を使える
- [ ] 数値の足し算ができる
- [ ] 計算結果を画面に表示できる
- [ ] 文字列連結と数値計算の違いを理解できる
- [ ] リアルタイム計算を実装できる
- [ ] 計算機の基本的な構造を理解できる

## まとめ

このレッスンでは、足し算計算機を作成しました。

### 重要なポイント7つ:

1. **値の取得**: `document.getElementById().value`で取得
2. **型の認識**: input要素の値は文字列
3. **数値変換**: `Number()`関数で文字列を数値に変換
4. **変換のタイミング**: 計算の前に変換する
5. **計算の実行**: 数値同士で`+`演算子を使う
6. **結果の表示**: textContentに設定
7. **リアルタイム**: oninputイベントで即座に計算

これにより、ユーザーの入力を使った計算プログラムを作ることができます。

## 次のステップ

次のレッスンでは、**引き算計算機**について学びます。

- 引き算の実装
- 負の数の扱い
- 複数の計算機能の実装
- 計算結果の符号の表示

足し算の知識を応用して、他の四則演算も実装できるようになります。
