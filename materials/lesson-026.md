# Lesson 026: 数値の入力

このレッスンでは、ユーザーから数値を入力してもらい、計算に使う方法を学びます。

## なぜ重要なのか

**身近な例**：
- **オンラインショッピング**：商品の個数を入力 → 合計金額を計算
- **電卓アプリ**：数値を入力 → 計算結果を表示
- **年齢計算サイト**：生まれた年を入力 → 現在の年齢を計算
- **割り勘アプリ**：合計金額と人数を入力 → 一人当たりの金額を計算

これらすべてに共通するのは、**ユーザーが入力した値で計算を行う**ということです。

**重要なポイント**：
- promptで入力された値は「文字列」
- 計算するには「数値」に変換が必要
- 変換を忘れると、意図しない結果になる

## promptで入力される値は文字列

前のレッスンで学んだ`prompt`は、ユーザーからの入力を受け取ることができます。

**重要**：`prompt`で入力された値は、**常に文字列として扱われます**。

```javascript
let age = prompt("年齢は？");
console.log(age);  // 例: "20"（文字列）
console.log(typeof age);  // "string"
```

ユーザーが「20」と入力しても、それは**数値の20ではなく、文字列の"20"**になります。

### なぜ文字列になるのか

**理由**：
1. promptは入力欄に**テキスト**を入力する
2. テキストはすべて**文字列**として扱われる
3. JavaScriptは自動的に「これは数値だ」とは判断しない

**日常の例え**：
- 紙に「20」と書いても、それは文字として書かれている
- 数値として計算に使うには、「これは数値です」と明示する必要がある

## 文字列と数値の違い

文字列と数値では、**演算の結果が大きく異なります**。

### 文字列の足し算（連結）

```javascript
let a = "10";
let b = "5";
let result = a + b;
console.log(result);  // "105"（文字列として連結される）
```

**何が起こっているか**：
- "10" と "5" は文字列
- `+` 演算子は文字列を**くっつける**（連結する）
- 結果：**"105"**（イチゼロゴ）

### 数値の足し算（計算）

```javascript
let a = 10;
let b = 5;
let result = a + b;
console.log(result);  // 15（数値として計算される）
```

**何が起こっているか**：
- 10 と 5 は数値
- `+` 演算子は数値を**足す**（計算する）
- 結果：**15**（ジュウゴ）

### 比較表

| 種類 | 値の例 | `+` の動作 | 結果 |
|------|--------|-----------|------|
| 文字列 | "10" + "5" | 連結 | "105" |
| 数値 | 10 + 5 | 計算 | 15 |
| 混在 | "10" + 5 | 連結 | "105" |
| 混在 | 10 + "5" | 連結 | "105" |

**重要**：**片方でも文字列があると、連結になってしまいます**。

## Number関数で数値に変換する

文字列を数値に変換するには、**`Number`関数**を使います。

### 基本的な使い方

```javascript
let str = "20";
let num = Number(str);
console.log(num);  // 20（数値）
console.log(typeof num);  // "number"
```

**Number関数の役割**：
- 文字列 → 数値に変換
- "20" → 20
- "3.14" → 3.14

### promptとNumberの組み合わせ

```javascript
let age = prompt("年齢は？");
let num = Number(age);
console.log(num + 10);  // ユーザーが20と入力すると、30が表示される
```

**動作の流れ（6ステップ）**：

```
ステップ1: prompt("年齢は？")
         ↓
ステップ2: ユーザーが「20」と入力
         ↓
ステップ3: age に "20"（文字列）が代入される
         ↓
ステップ4: Number(age) で 20（数値）に変換
         ↓
ステップ5: num に 20（数値）が代入される
         ↓
ステップ6: num + 10 で 30（数値）が計算される
```

### よくあるパターン

**パターン1：変数に分けて書く**
```javascript
let age = prompt("年齢は？");  // ステップ1: 入力を受け取る
let num = Number(age);          // ステップ2: 数値に変換
console.log(num + 10);          // ステップ3: 計算する
```

**パターン2：1行で書く**
```javascript
let num = Number(prompt("年齢は？"));  // 入力と変換を同時に行う
console.log(num + 10);                 // 計算する
```

どちらも同じ動作ですが、**初心者は分けて書く方が理解しやすい**です。

## Numberを使わない場合の問題

`Number`を使わないと、**意図しない結果**になります。

### ❌ 間違った例

```javascript
let age = prompt("年齢は？");  // ユーザーが"20"と入力
let result = age + 10;
console.log(result);  // "2010"（おかしい！）
```

**何が問題か**：
- `age` は文字列の "20"
- "20" + 10 は "20" + "10" に自動変換される
- 文字列同士の `+` は連結になる
- 結果：**"2010"**（意図した30ではない）

### ✅ 正しい例

```javascript
let age = prompt("年齢は？");  // ユーザーが"20"と入力
let num = Number(age);         // 数値の20に変換
let result = num + 10;
console.log(result);           // 30（正しい！）
```

**正しい理由**：
- `num` は数値の 20
- 20 + 10 は数値同士の計算
- 結果：**30**（意図した結果）

## 数値に変換できない場合

文字列が数値に変換できない場合、`Number`関数は**`NaN`（Not a Number）**を返します。

### NaNとは

```javascript
let str = "abc";
let num = Number(str);
console.log(num);  // NaN
```

**NaN**：
- **N**ot **a** **N**umber の略
- 「数値ではない」という意味の特殊な値
- 数値型の一種だが、計算には使えない

### NaNの例

| 変換前 | 変換後 | 理由 |
|--------|--------|------|
| "20" | 20 | 正しい数値 |
| "3.14" | 3.14 | 正しい数値 |
| "abc" | NaN | 数値ではない |
| "" | 0 | 空文字列は0になる |
| "10円" | NaN | 数値以外の文字が含まれる |

### NaNを使った計算

```javascript
let num = Number("abc");  // NaN
console.log(num + 10);    // NaN（計算できない）
```

**重要**：**NaNが含まれる計算は、結果もNaNになります**。

## 計算に使う

数値に変換した後は、**様々な計算**ができます。

### 足し算（+）

```javascript
let age = Number(prompt("年齢は？"));
let result = age + 5;
console.log("5年後は" + result + "歳です");
```

### 引き算（-）

```javascript
let year = Number(prompt("生まれた年は？"));
let age = 2024 - year;
console.log("あなたは" + age + "歳です");
```

### 掛け算（*）

```javascript
let price = Number(prompt("単価は？"));
let quantity = Number(prompt("個数は？"));
let total = price * quantity;
console.log("合計は" + total + "円です");
```

### 割り算（/）

```javascript
let total = Number(prompt("合計金額は？"));
let people = Number(prompt("人数は？"));
let perPerson = total / people;
console.log("一人当たり" + perPerson + "円です");
```

### 計算演算子一覧

| 演算子 | 意味 | 例 | 結果 |
|--------|------|-----|------|
| `+` | 足し算 | `10 + 5` | `15` |
| `-` | 引き算 | `10 - 5` | `5` |
| `*` | 掛け算 | `10 * 5` | `50` |
| `/` | 割り算 | `10 / 5` | `2` |
| `%` | 余り | `10 % 3` | `1` |

## よくある間違いと解決方法

### ❌ 間違い1：Numberを忘れる

```javascript
let age = prompt("年齢は？");  // "20"
console.log(age + 10);  // "2010"（連結になる）
```

**エラーメッセージ**：エラーは出ないが、結果がおかしい

**解決方法**：
```javascript
let age = Number(prompt("年齢は？"));  // 20
console.log(age + 10);  // 30（正しい計算）
```

### ❌ 間違い2：Number関数の括弧を間違える

```javascript
let num = Number(prompt("年齢は？");  // ❌ 括弧が足りない
```

**エラーメッセージ**：`Uncaught SyntaxError: Unexpected token ')'`

**解決方法**：
```javascript
let num = Number(prompt("年齢は？"));  // ✅ 括弧を正しく閉じる
```

**括弧の対応**：
```javascript
Number(prompt("年齢は？"))
↑     ↑              ↑ ↑
|     |              | |
|     +--------------+ |
+----------------------+
```

### ❌ 間違い3：数値リテラルを文字列で書く

```javascript
let age = Number(prompt("年齢は？"));
let result = age + "10";  // ❌ "10"は文字列
console.log(result);  // "2010"（連結になる）
```

**解決方法**：
```javascript
let age = Number(prompt("年齢は？"));
let result = age + 10;  // ✅ 10は数値
console.log(result);  // 30（正しい計算）
```

### ❌ 間違い4：変換を途中で忘れる

```javascript
let first = prompt("1つ目の数値は？");   // 文字列
let second = Number(prompt("2つ目の数値は？"));  // 数値
let sum = first + second;  // ❌ firstが文字列のまま
```

**解決方法**：
```javascript
let first = Number(prompt("1つ目の数値は？"));   // 数値
let second = Number(prompt("2つ目の数値は？"));  // 数値
let sum = first + second;  // ✅ 両方とも数値
```

### ❌ 間違い5：計算結果を文字列で表示しようとして失敗

```javascript
let age = Number(prompt("年齢は？"));
let result = age + 10;
const elem = document.getElementById("result");
elem.textContent = result + 歳です;  // ❌ 歳です が変数として扱われる
```

**エラーメッセージ**：`Uncaught ReferenceError: 歳です is not defined`

**解決方法**：
```javascript
let age = Number(prompt("年齢は？"));
let result = age + 10;
const elem = document.getElementById("result");
elem.textContent = result + "歳です";  // ✅ 文字列は引用符で囲む
```

### ❌ 間違い6：複数の計算で優先順位を間違える

```javascript
let age = Number(prompt("年齢は？"));
let message = "10年後は" + age + 10 + "歳です";
// "10年後は2010歳です"（おかしい！）
```

**何が起こっているか**：
```javascript
"10年後は" + age + 10 + "歳です"
// ステップ1: "10年後は" + 20 → "10年後は20"
// ステップ2: "10年後は20" + 10 → "10年後は2010"
// ステップ3: "10年後は2010" + "歳です" → "10年後は2010歳です"
```

**解決方法1：括弧で計算を先に行う**
```javascript
let age = Number(prompt("年齢は？"));
let message = "10年後は" + (age + 10) + "歳です";
// "10年後は30歳です"（正しい！）
```

**解決方法2：計算を先に変数に入れる**
```javascript
let age = Number(prompt("年齢は？"));
let future = age + 10;  // 先に計算
let message = "10年後は" + future + "歳です";
// "10年後は30歳です"（正しい！）
```

## 実用例

### 例1：10年後の年齢を計算する

**HTML**：
```html
<p id="result"></p>
<button onclick="calculateAge()">計算する</button>
```

**JavaScript**：
```javascript
function calculateAge() {
  let age = prompt("現在の年齢は？");
  let num = Number(age);
  let future = num + 10;

  const elem = document.getElementById("result");
  elem.textContent = "10年後は" + future + "歳です";
}
```

**動作の流れ**：
1. ボタンをクリック
2. promptで年齢を入力（例：20）
3. 文字列"20"をNumber関数で数値20に変換
4. 20 + 10 = 30 を計算
5. "10年後は30歳です" を表示

### 例2：2つの数値を足す

**HTML**：
```html
<p id="result"></p>
<button onclick="addNumbers()">計算する</button>
```

**JavaScript**：
```javascript
function addNumbers() {
  let first = prompt("1つ目の数値は？");
  let second = prompt("2つ目の数値は？");

  let num1 = Number(first);
  let num2 = Number(second);
  let sum = num1 + num2;

  const elem = document.getElementById("result");
  elem.textContent = "合計は" + sum + "です";
}
```

**動作の流れ**：
1. ボタンをクリック
2. 1つ目の数値を入力（例：10）
3. 2つ目の数値を入力（例：5）
4. 両方をNumber関数で数値に変換
5. 10 + 5 = 15 を計算
6. "合計は15です" を表示

### 例3：簡単な計算機

**HTML**：
```html
<p id="result"></p>
<button onclick="calculate()">計算する</button>
```

**JavaScript**：
```javascript
function calculate() {
  let num1 = prompt("1つ目の数値は？");
  let num2 = prompt("2つ目の数値は？");

  let a = Number(num1);
  let b = Number(num2);

  let sum = a + b;
  let diff = a - b;
  let product = a * b;
  let quotient = a / b;

  const elem = document.getElementById("result");
  elem.textContent = "足し算: " + sum + ", 引き算: " + diff +
                     ", 掛け算: " + product + ", 割り算: " + quotient;
}
```

**実行例**：
- 1つ目：10
- 2つ目：5
- 結果："足し算: 15, 引き算: 5, 掛け算: 50, 割り算: 2"

### 例4：割り勘計算機

**HTML**：
```html
<p id="result"></p>
<button onclick="calculateSplit()">計算する</button>
```

**JavaScript**：
```javascript
function calculateSplit() {
  let total = Number(prompt("合計金額は？"));
  let people = Number(prompt("人数は？"));

  let perPerson = total / people;

  const elem = document.getElementById("result");
  elem.textContent = "一人当たり" + perPerson + "円です";
}
```

**実行例**：
- 合計金額：3000
- 人数：4
- 結果："一人当たり750円です"

## console.logとの組み合わせ

デバッグ（バグを見つける作業）では、`console.log`と組み合わせて使います。

### デバッグの例

```javascript
let age = prompt("年齢は？");
console.log("入力された値:", age);  // "20"（文字列）
console.log("型:", typeof age);  // "string"

let num = Number(age);
console.log("変換後の値:", num);  // 20（数値）
console.log("型:", typeof num);  // "number"

let result = num + 10;
console.log("計算結果:", result);  // 30
```

**デバッグの流れ**：
1. 入力された値を確認
2. 型を確認（文字列か数値か）
3. 変換後の値を確認
4. 計算結果を確認

**よくあるデバッグ方法**：
```javascript
function calculateAge() {
  let age = prompt("年齢は？");
  console.log("age:", age, "type:", typeof age);  // デバッグ1

  let num = Number(age);
  console.log("num:", num, "type:", typeof num);  // デバッグ2

  let result = num + 10;
  console.log("result:", result);  // デバッグ3

  const elem = document.getElementById("result");
  elem.textContent = "10年後は" + result + "歳です";
}
```

## 練習問題

次の要件を満たすページを作成してください。

### 要件

1. id="result1"の要素を用意する
2. id="result2"の要素を用意する
3. id="result3"の要素を用意する
4. calculateAge関数を定義し、次の処理を行う
   - promptで「現在の年齢は？」と質問する
   - 入力された値をNumber関数で数値に変換する
   - 数値に10を足す
   - id="result1"の要素のtextContentに「10年後は○○歳です」と表示する
5. calculateDouble関数を定義し、次の処理を行う
   - promptで「数値を入力してください」と質問する
   - 入力された値をNumber関数で数値に変換する
   - 数値を2倍にする
   - id="result2"の要素のtextContentに「2倍は○○です」と表示する
6. calculateSum関数を定義し、次の処理を行う
   - promptで「1つ目の数値は？」と質問する
   - promptで「2つ目の数値は？」と質問する
   - 両方の値をNumber関数で数値に変換する
   - 2つの数値を足す
   - id="result3"の要素のtextContentに「合計は○○です」と表示する
7. 3つのボタンを作成し、それぞれクリックすると対応する関数が実行されるようにする

### ヒント

<details>
<summary>ヒント1：HTMLの構造</summary>

```html
<p id="result1"></p>
<p id="result2"></p>
<p id="result3"></p>
<button onclick="calculateAge()">年齢計算</button>
<button onclick="calculateDouble()">2倍計算</button>
<button onclick="calculateSum()">合計計算</button>
```
</details>

<details>
<summary>ヒント2：calculateAge関数の骨組み</summary>

```javascript
function calculateAge() {
  let age = prompt(/* ここに質問を書く */);
  let num = Number(/* ここに変換する変数を書く */);
  let future = /* ここに計算を書く */;

  const elem = document.getElementById(/* ここにIDを書く */);
  elem.textContent = /* ここに表示する内容を書く */;
}
```
</details>

<details>
<summary>ヒント3：Number関数の使い方</summary>

```javascript
// promptで受け取った文字列を数値に変換
let age = prompt("年齢は？");  // "20"（文字列）
let num = Number(age);         // 20（数値）
```
</details>

<details>
<summary>ヒント4：2倍の計算方法</summary>

```javascript
let num = 10;
let double = num * 2;  // 20
```
</details>

<details>
<summary>ヒント5：複数の数値を扱う場合</summary>

```javascript
// 2つの数値を受け取る
let first = prompt("1つ目は？");
let second = prompt("2つ目は？");

// 両方を数値に変換
let num1 = Number(first);
let num2 = Number(second);

// 足し算
let sum = num1 + num2;
```
</details>

<details>
<summary>ヒント6：文字列の連結</summary>

```javascript
let age = 20;
let future = age + 10;  // 30

// 数値を文字列に埋め込む
let message = "10年後は" + future + "歳です";
// "10年後は30歳です"
```
</details>

<details>
<summary>ヒント7：完全な例（calculateAge関数）</summary>

```javascript
function calculateAge() {
  let age = prompt("現在の年齢は？");
  let num = Number(age);
  let future = num + 10;

  const elem = document.getElementById("result1");
  elem.textContent = "10年後は" + future + "歳です";
}
```
</details>

### チェックリスト

完成したら、以下を確認してください：

- [ ] 3つの`<p>`要素にそれぞれ正しいIDが設定されている
- [ ] 3つのボタンがあり、それぞれ正しい関数を呼び出している
- [ ] calculateAge関数が動作し、10年後の年齢が表示される
- [ ] calculateDouble関数が動作し、2倍の値が表示される
- [ ] calculateSum関数が動作し、合計が表示される
- [ ] promptで入力された値がNumber関数で数値に変換されている
- [ ] 計算結果が正しく表示される（文字列連結ではなく数値計算）
- [ ] console.logで値を確認できる

### デバッグのヒント

うまく動かない場合：

1. **コンソールを開く**
   - F12キーを押す
   - エラーメッセージを確認

2. **console.logで確認**
   ```javascript
   let age = prompt("年齢は？");
   console.log("age:", age, "type:", typeof age);
   ```

3. **よくある問題**
   - Number関数を忘れている → 計算結果がおかしい
   - IDの綴りが間違っている → 何も表示されない
   - 関数名の綴りが間違っている → ボタンを押してもエラー

## ポイント

- `prompt`で入力された値は**文字列**です
- `Number`関数で文字列を**数値に変換**できます
- 数値に変換しないと、**計算が正しく行われません**（連結になる）
- 変換できない文字列は**`NaN`**になります
- **複数の数値を扱う場合、すべてNumber関数で変換**する必要があります

## できるようになったこと

このレッスンを終えると、以下のことができるようになります：

- [ ] promptで入力された値が文字列であることを理解できる
- [ ] Number関数で文字列を数値に変換できる
- [ ] 文字列の連結と数値の計算の違いを理解できる
- [ ] promptとNumber関数を組み合わせて使える
- [ ] ユーザーの入力を使った計算プログラムを作れる
- [ ] 足し算、引き算、掛け算、割り算ができる
- [ ] NaNの意味を理解できる
- [ ] console.logでデバッグできる

## まとめ

このレッスンでは、ユーザーから数値を入力してもらい、計算に使う方法を学びました。

**重要なポイント**：
1. **promptの戻り値は文字列**
   - ユーザーが「20」と入力しても、それは"20"（文字列）

2. **Number関数で数値に変換**
   - `Number("20")` → `20`（数値）
   - 計算するには必ず変換が必要

3. **文字列と数値の違い**
   - 文字列：`"10" + "5"` → `"105"`（連結）
   - 数値：`10 + 5` → `15`（計算）

4. **変換できない場合はNaN**
   - `Number("abc")` → `NaN`
   - NaNを使った計算は結果もNaN

5. **様々な計算ができる**
   - 足し算（`+`）、引き算（`-`）、掛け算（`*`）、割り算（`/`）

これにより、**ユーザーの入力を使った計算プログラム**を作ることができます。
