# Lesson 035: 文字列の比較

前回のレッスンでは、数値の比較について学びました。このレッスンでは、文字列（テキスト）を使った比較方法を学びます。パスワードチェックや答え合わせなど、実用的なプログラムを作れるようになります。

## なぜ重要なのか

文字列の比較は、ユーザー入力を扱うすべてのアプリケーションで必須の技術です。実際のウェブサイトで頻繁に使われています。

| サービス | 具体例 | 使用される文字列比較 |
|---------|--------|---------------------|
| **Twitter** | ログイン | if (password === 入力パスワード) |
| **Google** | 検索クエリ | if (検索語 !== "") |
| **Amazon** | クーポンコード | if (コード === "SUMMER2024") |
| **YouTube** | コメント判定 | if (コメント === "削除済み") |
| **メルカリ** | カテゴリー選択 | if (カテゴリー === "衣類") |

これらはすべて、文字列の比較を使って実装されています。

## 基本概念の説明

### 文字列とは

文字列とは、文字の並びのことです。JavaScriptでは、ダブルクォーテーション（`"`）で囲んで表現します。

```javascript
let name = "太郎";
let answer = "yes";
let password = "secret123";
```

**文字列の特徴:**
- `"`で囲む（シングルクォート`'`でも可）
- 文字、数字、記号、スペースなど何でも含められる
- 0文字（空文字列）から数千文字まで可能

### 動作の流れ

```
1. 変数に文字列を代入
   let answer = "yes";
        ↓
2. 比較演算子で比較
   answer === "yes"
        ↓
3. 左辺と右辺を評価
   "yes" === "yes"
        ↓
4. 結果を返す
   true
        ↓
5. 条件分岐で使用
   if (true) { 処理実行 }
```

## 文字列の比較

文字列を比較するには、`===`演算子を使います。

### 基本例

```javascript
let answer = "yes";

if (answer === "yes") {
  console.log("はいと答えました");
}
```

**動作:**

```
answer === "yes"
   ↓
 "yes" === "yes"
   ↓
  true
   ↓
メッセージ表示
```

### 比較の仕組み

```
"yes"  ===  "yes"
  ↓          ↓
文字列1    文字列2
  └────┬────┘
    比較
      ↓
   1文字ずつ比較
   y = y ✓
   e = e ✓
   s = s ✓
      ↓
    true
```

## 文字列と数値の違い

文字列の`"123"`と数値の`123`は、見た目は同じですが、**異なるもの**です。

### 比較例

```javascript
let text = "123";
let num = 123;

console.log(text === num);  // false
console.log(typeof text);   // "string"
console.log(typeof num);    // "number"
```

**重要な違い:**

| 項目 | 文字列 `"123"` | 数値 `123` |
|------|---------------|-----------|
| 型 | string | number |
| 書き方 | `"`で囲む | 囲まない |
| 計算 | できない（連結になる） | できる |
| 比較 | `"123" === "123"` | `123 === 123` |
| 混在比較 | `"123" === 123` → `false` | |

### 実際の例

```javascript
let text = "123";

if (text === "123") {
  console.log("文字列の123です");  // これは実行される
}

if (text === 123) {
  console.log("数値の123です");  // これは実行されない
}
```

**動作:**

```
1つ目: "123" === "123" → true → 実行
2つ目: "123" === 123 → false（型が違う） → スキップ
```

## 大文字と小文字の区別

JavaScriptでは、文字列の比較で**大文字と小文字は区別されます**。

### 比較例

```javascript
let answer = "yes";

console.log(answer === "yes");  // true
console.log(answer === "Yes");  // false
console.log(answer === "YES");  // false
```

**3つの異なる文字列:**

| 文字列 | `answer === ?` | 結果 |
|--------|---------------|------|
| `"yes"` | `answer === "yes"` | `true` |
| `"Yes"` | `answer === "Yes"` | `false` |
| `"YES"` | `answer === "YES"` | `false` |

### 実装例

```javascript
function checkAnswer() {
  let answer = "yes";

  if (answer === "yes") {
    const elem = document.getElementById("result");
    elem.textContent = "小文字のyesです";
  }

  if (answer === "Yes") {
    const elem = document.getElementById("result");
    elem.textContent = "大文字始まりのYesです";
  }
}
```

**動作:**
- answer = "yes"
- "yes" === "yes" → true → 「小文字のyesです」表示
- "yes" === "Yes" → false → 何も起こらない

## 不等価の判定

文字列が等しくないことを判定するには、`!==`演算子を使います。

### 基本例

```javascript
let answer = "no";

if (answer !== "yes") {
  console.log("yesではありません");
}
```

**動作:**

```
answer !== "yes"
   ↓
 "no" !== "yes"
   ↓
  true（等しくない）
   ↓
メッセージ表示
```

### === と !== の使い分け

| 演算子 | 意味 | 例 | 結果 |
|--------|------|-----|------|
| `===` | 等しい | `"yes" === "yes"` | `true` |
| `===` | 等しい | `"yes" === "no"` | `false` |
| `!==` | 等しくない | `"yes" !== "no"` | `true` |
| `!==` | 等しくない | `"yes" !== "yes"` | `false` |

## 実践例

### 例1: 簡単なパスワードチェック

パスワードが正しいかどうかをチェックするプログラムを作ってみましょう。

```javascript
function checkPassword() {
  let password = "abc123";

  if (password === "abc123") {
    const elem = document.getElementById("result");
    elem.textContent = "パスワードが正しいです";
  }
}
```

**動作:**
- password = "abc123"
- "abc123" === "abc123" → true
- 「パスワードが正しいです」と表示

### 例2: クイズアプリ

簡単なクイズアプリを作ってみましょう。

```javascript
function checkQuiz() {
  let answer = "Tokyo";

  if (answer === "Tokyo") {
    const elem = document.getElementById("result");
    elem.textContent = "正解です";
  }

  if (answer !== "Tokyo") {
    const elem = document.getElementById("result");
    elem.textContent = "不正解です";
  }
}
```

**動作:**
- answer = "Tokyo"
- "Tokyo" === "Tokyo" → true → 「正解です」表示
- "Tokyo" !== "Tokyo" → false → 何も起こらない

### 例3: 複数の答えをチェック

複数のif文を使って、複数の答えをチェックできます。

```javascript
function checkColor() {
  let color = "red";

  if (color === "red") {
    const elem = document.getElementById("result");
    elem.textContent = "赤が選ばれました";
  }

  if (color === "blue") {
    const elem = document.getElementById("result");
    elem.textContent = "青が選ばれました";
  }

  if (color === "green") {
    const elem = document.getElementById("result");
    elem.textContent = "緑が選ばれました";
  }
}
```

**動作:**

```
color = "red"

1つ目: "red" === "red" → true → 「赤が選ばれました」表示
2つ目: "red" === "blue" → false → スキップ
3つ目: "red" === "green" → false → スキップ
```

## 空文字列

何も入力されていない状態を表す特別な文字列を「**空文字列**」と呼びます。`""`と書きます。

### 空文字列の特徴

```javascript
let text = "";

console.log(text);        // （何も表示されない）
console.log(text.length); // 0
console.log(typeof text); // "string"
```

**空文字列と他の値の違い:**

| 値 | 説明 | 例 |
|----|------|-----|
| `""` | 空文字列（文字が0個） | `let text = "";` |
| `" "` | スペース1文字 | `let text = " ";` |
| `null` | 値がない（後で学習） | `let text = null;` |
| `undefined` | 未定義（後で学習） | `let text;` |

### 空文字列の判定

```javascript
let text = "";

if (text === "") {
  console.log("空文字列です");
}
```

**実用例:**

```javascript
function checkInput() {
  let name = "";

  if (name === "") {
    const elem = document.getElementById("result");
    elem.textContent = "名前が入力されていません";
  }

  if (name !== "") {
    const elem = document.getElementById("result");
    elem.textContent = "名前: " + name;
  }
}
```

## 変数同士の比較

変数同士を比較することもできます。

### 基本例

```javascript
function compare() {
  let userAnswer = "Tokyo";
  let correctAnswer = "Tokyo";

  if (userAnswer === correctAnswer) {
    const elem = document.getElementById("result");
    elem.textContent = "正解です";
  }
}
```

**動作:**

```
userAnswer = "Tokyo"
correctAnswer = "Tokyo"
   ↓
"Tokyo" === "Tokyo"
   ↓
  true
   ↓
「正解です」表示
```

### 実用例

```javascript
function checkMatch() {
  let password = "abc123";
  let confirmPassword = "abc123";

  if (password === confirmPassword) {
    const elem = document.getElementById("result");
    elem.textContent = "パスワードが一致しています";
  }

  if (password !== confirmPassword) {
    const elem = document.getElementById("result");
    elem.textContent = "パスワードが一致していません";
  }
}
```

## よくある間違いと解決方法

### 間違い1: クォーテーションを忘れる

```javascript
// ❌ 間違い：クォーテーションを忘れる
let answer = yes;  // エラー
if (answer === yes) {  // エラー
  console.log("yes");
}
```

**エラーメッセージ:**
```
Uncaught ReferenceError: yes is not defined
```

**何が問題か:**
クォーテーションがないと、変数名として扱われます。

**解決方法:**
```javascript
// ✅ 正しい：クォーテーションで囲む
let answer = "yes";
if (answer === "yes") {
  console.log("yes");
}
```

### 間違い2: シングルとダブルの混在

```javascript
// ⚠️ 注意：混在しても動くが統一すべき
let answer = "yes';  // エラー（閉じ方が違う）
```

**何が問題か:**
開始と終了のクォーテーションが一致していません。

**解決方法:**
```javascript
// ✅ 正しい：統一する
let answer = "yes";  // ダブルクォーテーション
let answer = 'yes';  // シングルクォーテーション（どちらでもOK）
```

### 間違い3: 大文字・小文字の見落とし

```javascript
// ⚠️ 意図と異なる可能性
let answer = "yes";
if (answer === "Yes") {  // 大文字のY
  console.log("一致");  // 表示されない
}
```

**何が問題か:**
"yes"と"Yes"は異なる文字列です。

**解決方法:**
```javascript
// ✅ 正しい：大文字・小文字を一致させる
let answer = "yes";
if (answer === "yes") {  // 小文字のy
  console.log("一致");  // 表示される
}

// または後で学ぶtoLowerCase()を使う（参考）
if (answer.toLowerCase() === "yes") {
  console.log("一致");
}
```

### 間違い4: 文字列と数値の混同

```javascript
// ⚠️ 意図と異なる可能性
let age = "20";  // 文字列
if (age === 20) {  // 数値
  console.log("20歳");  // 表示されない
}
```

**何が問題か:**
文字列の"20"と数値の20は異なります。

**解決方法:**
```javascript
// ✅ 正しい：型を揃える
let age = "20";
if (age === "20") {  // 文字列同士
  console.log("20歳");
}

// または
let age = 20;  // 数値
if (age === 20) {  // 数値同士
  console.log("20歳");
}
```

### 間違い5: スペースの見落とし

```javascript
// ⚠️ 注意：スペースも1文字
let answer = "yes ";  // 末尾にスペース
if (answer === "yes") {
  console.log("一致");  // 表示されない
}
```

**何が問題か:**
"yes "（スペース付き）と"yes"は異なる文字列です。

**解決方法:**
```javascript
// ✅ 正しい：スペースも含めて一致させる
let answer = "yes";
if (answer === "yes") {
  console.log("一致");
}

// または後で学ぶtrim()を使う（参考）
if (answer.trim() === "yes") {
  console.log("一致");
}
```

### 間違い6: 空文字列の判定ミス

```javascript
// ❌ 間違い：空文字列をスペースで判定
let text = "";
if (text === " ") {  // スペース
  console.log("空");  // 表示されない
}
```

**何が問題か:**
空文字列`""`とスペース`" "`は異なります。

**解決方法:**
```javascript
// ✅ 正しい：空文字列を正しく判定
let text = "";
if (text === "") {
  console.log("空");  // 表示される
}
```

## 実用例

### 例1: パスワードチェックアプリ

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>パスワードチェック</title>
</head>
<body>
  <h1>ログイン</h1>
  <p>パスワード: hello</p>
  <button onclick="checkPassword()">ログイン</button>
  <p id="result"></p>

  <script>
    function checkPassword() {
      let password = "hello";

      if (password === "hello") {
        const elem = document.getElementById("result");
        elem.textContent = "ログイン成功";
      }
    }
  </script>
</body>
</html>
```

**動作:**
- password = "hello"
- "hello" === "hello" → true
- 「ログイン成功」と表示

### 例2: 色判定アプリ

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>色判定</title>
</head>
<body>
  <h1>色判定</h1>
  <p>選択された色: red</p>
  <button onclick="checkColor()">判定する</button>
  <p id="result"></p>

  <script>
    function checkColor() {
      let color = "red";

      if (color === "red") {
        document.getElementById("result").textContent = "赤です";
      }

      if (color === "blue") {
        document.getElementById("result").textContent = "青です";
      }
    }
  </script>
</body>
</html>
```

**動作:**
- color = "red"
- "red" === "red" → true → 「赤です」表示
- "red" === "blue" → false → スキップ

### 例3: クイズアプリ

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>クイズ</title>
</head>
<body>
  <h1>クイズ</h1>
  <p>問題: 猫は英語で？</p>
  <p>あなたの答え: cat</p>
  <button onclick="checkQuiz()">答え合わせ</button>
  <p id="result"></p>

  <script>
    function checkQuiz() {
      let answer = "cat";

      if (answer === "cat") {
        document.getElementById("result").textContent = "正解";
      }

      if (answer !== "cat") {
        document.getElementById("result").textContent = "不正解";
      }
    }
  </script>
</body>
</html>
```

**動作:**
- answer = "cat"
- "cat" === "cat" → true → 「正解」表示
- "cat" !== "cat" → false → スキップ

### 例4: 複数選択肢アプリ

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>選択肢判定</title>
</head>
<body>
  <h1>好きな果物は？</h1>
  <p>あなたの選択: apple</p>
  <button onclick="checkFruit()">判定する</button>
  <p id="result"></p>

  <script>
    function checkFruit() {
      let fruit = "apple";

      if (fruit === "apple") {
        document.getElementById("result").textContent = "りんごが選ばれました";
      }

      if (fruit === "banana") {
        document.getElementById("result").textContent = "バナナが選ばれました";
      }

      if (fruit === "orange") {
        document.getElementById("result").textContent = "オレンジが選ばれました";
      }
    }
  </script>
</body>
</html>
```

**動作:**
- fruit = "apple"
- "apple" === "apple" → true → 「りんごが選ばれました」表示
- 他の条件 → false → スキップ

## 練習問題

### 問題1: パスワードチェック

ボタンをクリックしたときに、パスワードが"hello"と等しい場合に「ログイン成功」と表示するプログラムを作成してください。

**要件:**
1. `let password = "hello"`のように、変数でパスワードを定義する
2. `===`演算子を使って"hello"と等しいかチェックする
3. 条件が満たされたら、id="result"の要素に「ログイン成功」と表示する

<details>
<summary>💡 ヒント1: 文字列はクォーテーションで囲む</summary>

```javascript
let password = "hello";  // "で囲む

if (password === "hello") {  // "で囲む
  // ...
}
```
</details>

<details>
<summary>💡 ヒント2: 完成例</summary>

```javascript
function checkPassword() {
  let password = "hello";

  if (password === "hello") {
    const elem = document.getElementById("result");
    elem.textContent = "ログイン成功";
  }
}
```
</details>

### 問題2: 色判定

ボタンをクリックしたときに、色の変数が"red"の場合に「赤です」、"blue"の場合に「青です」と表示するプログラムを作成してください。

**要件:**
1. `let color = "red"`のように、変数で色を定義する
2. 1つ目のif文で"red"と等しいかチェックする
3. 2つ目のif文で"blue"と等しいかチェックする
4. それぞれの条件が満たされたら、適切なメッセージを表示する

<details>
<summary>💡 ヒント1: 2つのif文</summary>

```javascript
function checkColor() {
  let color = "red";

  if (color === "red") {
    // 赤です
  }

  if (color === "blue") {
    // 青です
  }
}
```
</details>

<details>
<summary>💡 ヒント2: 完成例</summary>

```javascript
function checkColor() {
  let color = "red";

  if (color === "red") {
    const elem = document.getElementById("result");
    elem.textContent = "赤です";
  }

  if (color === "blue") {
    const elem = document.getElementById("result");
    elem.textContent = "青です";
  }
}
```
</details>

### 問題3: クイズ

ボタンをクリックしたときに、答えが"cat"と等しい場合に「正解」、等しくない場合に「不正解」と表示するプログラムを作成してください。

**要件:**
1. `let answer = "cat"`のように、変数で答えを定義する
2. 1つ目のif文で`===`を使って"cat"と等しいかチェックする
3. 2つ目のif文で`!==`を使って"cat"と等しくないかチェックする
4. それぞれの条件が満たされたら、適切なメッセージを表示する

<details>
<summary>💡 ヒント1: ===と!==の使い分け</summary>

```javascript
// === は等しい
if (answer === "cat") {
  // 正解
}

// !== は等しくない
if (answer !== "cat") {
  // 不正解
}
```
</details>

<details>
<summary>💡 ヒント2: 完成例</summary>

```javascript
function checkQuiz() {
  let answer = "cat";

  if (answer === "cat") {
    const elem = document.getElementById("result");
    elem.textContent = "正解";
  }

  if (answer !== "cat") {
    const elem = document.getElementById("result");
    elem.textContent = "不正解";
  }
}
```
</details>

### チェックリスト

実装後、次の項目を確認してください:

- [ ] 文字列を`"`で囲んでいる
- [ ] `===`演算子で文字列を比較している
- [ ] `!==`演算子で不等価を判定している
- [ ] 大文字・小文字を正しく使っている
- [ ] 文字列と数値の違いを理解している
- [ ] 空文字列`""`を理解している
- [ ] 変数同士の比較ができる
- [ ] クォーテーションの開始と終了が一致している

## ポイント

- 文字列は`"`で囲んで表現します
- `===`で文字列が等しいかどうかを判定します
- `!==`で文字列が等しくないかどうかを判定します
- 文字列の`"123"`と数値の`123`は異なります
- 大文字と小文字は区別されます（`"yes"` ≠ `"Yes"`）
- 空文字列は`""`で表します
- スペースも1文字として扱われます
- 変数同士を比較できます
- クォーテーションの開始と終了を一致させます

## できるようになったこと

このレッスンを終えると、次のことができるようになります:

- [ ] 文字列を正しく定義できる
- [ ] 文字列同士を比較できる
- [ ] ===と!==を使い分けられる
- [ ] 文字列と数値の違いを理解できる
- [ ] 大文字・小文字を意識して比較できる
- [ ] 空文字列を判定できる
- [ ] パスワードチェックを実装できる
- [ ] クイズアプリを作成できる

## まとめ

このレッスンでは、文字列の比較について学びました。

### 重要なポイント7つ:

1. **文字列の定義**: `"`で囲んで表現する
2. **比較演算子**: `===`で等しい、`!==`で等しくない
3. **型の違い**: `"123"` ≠ `123`（文字列と数値は別物）
4. **大文字小文字**: `"yes"` ≠ `"Yes"` ≠ `"YES"`
5. **空文字列**: `""`は文字が0個の文字列
6. **スペース**: `"yes"` ≠ `"yes "`（スペースも1文字）
7. **実用性**: パスワード、クイズ、選択肢判定など

これにより、ユーザー入力を使った実用的なプログラムを作ることができます。

## 次のステップ

次のレッスンでは、**条件分岐の総合演習**を行います。

- これまで学んだ比較演算子の復習
- 数値と文字列の組み合わせ
- より複雑な条件判定
- 実用的なアプリケーション作成

条件分岐の知識を総合して、本格的なプログラムを作れるようになります。
