# Lesson 034: 比較演算子

前回のレッスンでは、`>=`や`<=`などの比較演算子を使って条件分岐を学びました。このレッスンでは、さまざまな比較演算子を詳しく学び、数値や文字列の比較方法をマスターします。

## なぜ重要なのか

比較演算子は、すべての条件判定の基礎となる技術です。実際のウェブサイトで頻繁に使われています。

| サービス | 具体例 | 使用される比較演算子 |
|---------|--------|---------------------|
| **Amazon** | 価格フィルター | if (価格 >= 1000 && 価格 <= 5000) |
| **Twitter** | 文字数制限 | if (文字数 <= 280) |
| **YouTube** | 年齢確認 | if (年齢 === 入力年齢) |
| **楽天市場** | ポイント条件 | if (購入額 >= 3000) |
| **メルカリ** | 価格エラー | if (価格 !== 0) |

これらはすべて、比較演算子を使って実装されています。

## 基本概念の説明

### 比較演算子とは

比較演算子とは、2つの値を比較して、その結果を`true`または`false`で返す演算子のことです。

```
   値1    演算子    値2
    ↓       ↓       ↓
   20      >=      18
    └───────┴───────┘
           ↓
         true
```

```javascript
let age = 20;
console.log(age >= 18);  // true
```

この例では、`age`が18以上かどうかを比較し、`true`という結果が返ってきます。

### 動作の流れ

```
1. 変数に値を代入
   let age = 20;
        ↓
2. 比較演算子で比較
   age >= 18
        ↓
3. 左辺と右辺を評価
   20 >= 18
        ↓
4. 結果を返す
   true
        ↓
5. 条件分岐で使用
   if (true) { 処理実行 }
```

## 主な比較演算子

JavaScriptには、以下のような比較演算子があります。

| 演算子 | 意味 | 例 | 結果 | 読み方 |
|--------|------|-----|------|--------|
| `===` | 等しい | `10 === 10` | `true` | 厳密等価 |
| `!==` | 等しくない | `10 !== 5` | `true` | 厳密不等価 |
| `>` | より大きい | `10 > 5` | `true` | 大なり |
| `<` | より小さい | `5 < 10` | `true` | 小なり |
| `>=` | 以上 | `10 >= 10` | `true` | 大なりイコール |
| `<=` | 以下 | `10 <= 10` | `true` | 小なりイコール |

## === と !== の使い方

### === （厳密等価）

`===`は「等しい」を判定する演算子です。

```javascript
let answer = 42;

console.log(answer === 42);  // true（42は42と等しい）
console.log(answer === 50);  // false（42は50と等しくない）
```

**動作:**

```
answer === 42
   ↓
  42 === 42
   ↓
  true
```

### !== （厳密不等価）

`!==`は「等しくない」を判定する演算子です。

```javascript
let answer = 42;

console.log(answer !== 50);  // true（42は50と等しくない）
console.log(answer !== 42);  // false（42は42と等しくないわけではない）
```

**!の意味:**
- `!`は「否定」を意味する記号です
- `!==`は「等しくない」という意味になります

### 実装例

```javascript
let num = 10;

if (num === 10) {
  console.log("numは10です");  // 表示される
}

if (num !== 5) {
  console.log("numは5ではありません");  // 表示される
}
```

**動作の流れ:**

```
1つ目のif文:
num === 10 → 10 === 10 → true → 処理実行

2つ目のif文:
num !== 5 → 10 !== 5 → true → 処理実行
```

## 大小の比較

### 4つの演算子

- `>` : より大きい（左辺が右辺より大きい）
- `<` : より小さい（左辺が右辺より小さい）
- `>=` : 以上（左辺が右辺以上）
- `<=` : 以下（左辺が右辺以下）

### 基本例

```javascript
let score = 75;

console.log(score > 80);   // false（75は80より大きくない）
console.log(score < 80);   // true（75は80より小さい）
console.log(score >= 75);  // true（75は75以上）
console.log(score <= 75);  // true（75は75以下）
```

## > と >= の違い

`>`と`>=`は似ていますが、**等しい場合を含むか**という重要な違いがあります。

### 比較表

| score | `score > 60` | `score >= 60` | 説明 |
|-------|--------------|---------------|------|
| 59 | `false` | `false` | 60未満 |
| 60 | `false` | `true` | **60ちょうど** |
| 61 | `true` | `true` | 60より大きい |

### コード例

```javascript
let score = 60;

console.log(score > 60);   // false（60は60より大きくない）
console.log(score >= 60);  // true（60は60以上）
```

**重要:**
- `>` : 等しい場合は**含まない**（より大きい）
- `>=` : 等しい場合も**含む**（以上）

### < と <= の違い

同様に、`<`と`<=`にも違いがあります。

```javascript
let score = 60;

console.log(score < 60);   // false（60は60より小さくない）
console.log(score <= 60);  // true（60は60以下）
```

| score | `score < 60` | `score <= 60` | 説明 |
|-------|--------------|---------------|------|
| 59 | `true` | `true` | 60未満 |
| 60 | `false` | `true` | **60ちょうど** |
| 61 | `false` | `false` | 60より大きい |

## 実践例

### 例1: 合格判定

点数に応じて「合格」を判定するプログラムを作ってみましょう。

```javascript
function checkPass() {
  let score = 75;

  if (score >= 60) {
    const elem = document.getElementById("result");
    elem.textContent = "合格です";
  }
}
```

**動作:**
- score = 75
- 75 >= 60 → true
- 「合格です」と表示

### 例2: 範囲の判定

ある値が特定の範囲内にあるかどうかを判定します。

```javascript
function checkRange() {
  let temperature = 25;

  if (temperature >= 20) {
    const elem = document.getElementById("result");
    elem.textContent = "暖かいです";
  }

  if (temperature < 10) {
    const elem = document.getElementById("result");
    elem.textContent = "寒いです";
  }
}
```

**動作:**
- temperature = 25
- 25 >= 20 → true → 「暖かいです」と表示
- 25 < 10 → false → 何も起こらない

### 例3: ぴったりの値を探す

`===`を使って、ぴったりの値を探すこともできます。

```javascript
function checkNumber() {
  let num = 7;

  if (num === 7) {
    const elem = document.getElementById("result");
    elem.textContent = "ラッキーセブン";
  }
}
```

**動作:**
- num = 7
- 7 === 7 → true
- 「ラッキーセブン」と表示

### 例4: 特定の値を除外する

`!==`を使って、特定の値を除外することもできます。

```javascript
function checkNotZero() {
  let value = 5;

  if (value !== 0) {
    const elem = document.getElementById("result");
    elem.textContent = "0ではありません";
  }
}
```

**動作:**
- value = 5
- 5 !== 0 → true
- 「0ではありません」と表示

## 複数の条件

複数のif文を使うことで、複数の条件を判定できます。

```javascript
function checkScore() {
  let score = 85;

  if (score >= 80) {
    const elem = document.getElementById("result1");
    elem.textContent = "優秀です";
  }

  if (score >= 60) {
    const elem = document.getElementById("result2");
    elem.textContent = "合格です";
  }

  if (score < 60) {
    const elem = document.getElementById("result3");
    elem.textContent = "不合格です";
  }
}
```

**動作:**
```
score = 85

1つ目: 85 >= 80 → true → 「優秀です」表示
2つ目: 85 >= 60 → true → 「合格です」表示
3つ目: 85 < 60 → false → 何も起こらない

結果: 「優秀です」と「合格です」の両方が表示
```

## 変数同士の比較

変数同士を比較することもできます。

```javascript
function compare() {
  let a = 10;
  let b = 20;

  if (a < b) {
    const elem = document.getElementById("result");
    elem.textContent = "aはbより小さい";
  }

  if (a === b) {
    const elem = document.getElementById("result");
    elem.textContent = "aとbは等しい";
  }
}
```

**動作:**
```
a = 10, b = 20

1つ目: 10 < 20 → true → 「aはbより小さい」表示
2つ目: 10 === 20 → false → 何も起こらない
```

## よくある間違いと解決方法

### 間違い1: = と === の混同

```javascript
// ❌ 間違い：= は代入
let num = 10;
if (num = 5) {  // 代入している
  console.log("numは5です");
}
```

**何が問題か:**
- `=` は代入演算子
- `===` は比較演算子

**解決方法:**
```javascript
// ✅ 正しい
let num = 10;
if (num === 5) {  // 比較している
  console.log("numは5です");
}
```

### 間違い2: == を使う

```javascript
// ⚠️ 動くが推奨されない
let num = 10;
if (num == "10") {  // 型変換が起こる
  console.log("等しい");  // 表示される
}
```

**何が問題か:**
- `==` は型変換を行う（暗黙の型変換）
- `===` は型変換を行わない（厳密等価）

**解決方法:**
```javascript
// ✅ 正しい：===を使う
let num = 10;
if (num === 10) {  // 型も含めて比較
  console.log("等しい");
}
```

**比較:**

| 比較 | `==` | `===` |
|------|------|-------|
| `10 == "10"` | `true` | `false` |
| `10 == 10` | `true` | `true` |
| `0 == false` | `true` | `false` |
| `0 === false` | `false` | `false` |

### 間違い3: ! の位置を間違える

```javascript
// ❌ 間違い：!の位置が違う
let num = 10;
if (num =! 5) {  // =!ではなく!==
  console.log("等しくない");
}
```

**何が問題か:**
`=!`という演算子は存在しません。

**解決方法:**
```javascript
// ✅ 正しい
let num = 10;
if (num !== 5) {  // !==を使う
  console.log("等しくない");
}
```

### 間違い4: >= と > の選択ミス

```javascript
// ⚠️ 意図と異なる可能性
let score = 60;
if (score > 60) {  // 60は含まない
  console.log("合格");  // 表示されない
}
```

**何が問題か:**
60点ちょうどで合格のはずなのに、`>`だと含まれません。

**解決方法:**
```javascript
// ✅ 正しい：60を含む
let score = 60;
if (score >= 60) {  // 60を含む
  console.log("合格");  // 表示される
}
```

### 間違い5: 範囲判定の誤り

```javascript
// ❌ 間違い：複数の比較を一度に書けない
let age = 25;
if (18 <= age <= 30) {  // JavaScriptではこれは動かない
  console.log("範囲内");
}
```

**何が問題か:**
JavaScriptでは複数の比較を一度に書けません。

**解決方法:**
```javascript
// ✅ 正しい：後のレッスンで学ぶ&&を使う（参考）
let age = 25;
if (age >= 18 && age <= 30) {
  console.log("範囲内");
}

// 今の段階では2つのif文で
if (age >= 18) {
  if (age <= 30) {
    console.log("範囲内");
  }
}
```

### 間違い6: 論理の反対を間違える

```javascript
// ⚠️ 注意：論理の反対
let score = 55;

// "60以上でない" = "60未満"
if (score >= 60) {
  // 合格
}
// これの反対は？

// ❌ 間違い：score <= 60（60を含んでしまう）
// ✅ 正しい：score < 60（60未満）
```

**演算子の反対:**

| 演算子 | 反対 |
|--------|------|
| `===` | `!==` |
| `>` | `<=` |
| `>=` | `<` |
| `<` | `>=` |
| `<=` | `>` |

## 実用例

### 例1: 年齢判定アプリ

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>年齢判定</title>
</head>
<body>
  <h1>年齢判定（18歳より上）</h1>
  <p>あなたの年齢: 20歳</p>
  <button onclick="checkAge()">判定する</button>
  <p id="result"></p>

  <script>
    function checkAge() {
      let age = 20;

      if (age > 18) {
        const elem = document.getElementById("result");
        elem.textContent = "18歳より上です";
      }
    }
  </script>
</body>
</html>
```

**動作:**
- age = 20
- 20 > 18 → true
- 「18歳より上です」と表示

### 例2: ぴったり判定アプリ

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>ぴったり判定</title>
</head>
<body>
  <h1>100点満点判定</h1>
  <p>あなたの点数: 100点</p>
  <button onclick="checkPerfect()">判定する</button>
  <p id="result"></p>

  <script>
    function checkPerfect() {
      let score = 100;

      if (score === 100) {
        const elem = document.getElementById("result");
        elem.textContent = "100点満点！";
      }
    }
  </script>
</body>
</html>
```

**動作:**
- score = 100
- 100 === 100 → true
- 「100点満点！」と表示

### 例3: 温度判定アプリ

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>温度判定</title>
</head>
<body>
  <h1>温度判定</h1>
  <p>現在の温度: 35度</p>
  <button onclick="checkTemp()">判定する</button>
  <p id="result"></p>

  <script>
    function checkTemp() {
      let temperature = 35;

      if (temperature >= 30) {
        document.getElementById("result").textContent = "暑いです";
      }

      if (temperature <= 10) {
        document.getElementById("result").textContent = "寒いです";
      }
    }
  </script>
</body>
</html>
```

**動作:**
- temperature = 35
- 35 >= 30 → true → 「暑いです」表示
- 35 <= 10 → false → 何も起こらない

### 例4: 複数判定アプリ

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>複数判定</title>
</head>
<body>
  <h1>スコア判定</h1>
  <p>あなたのスコア: 85点</p>
  <button onclick="checkScore()">判定する</button>
  <p id="result1"></p>
  <p id="result2"></p>
  <p id="result3"></p>

  <script>
    function checkScore() {
      let score = 85;

      if (score === 100) {
        document.getElementById("result1").textContent = "満点です！";
      }

      if (score >= 80) {
        document.getElementById("result2").textContent = "優秀です";
      }

      if (score >= 60) {
        document.getElementById("result3").textContent = "合格です";
      }
    }
  </script>
</body>
</html>
```

**動作:**
- score = 85
- 85 === 100 → false → 何も起こらない
- 85 >= 80 → true → 「優秀です」表示
- 85 >= 60 → true → 「合格です」表示

## 練習問題

### 問題1: 大人判定

ボタンをクリックしたときに、年齢が18歳より大きい場合に「大人です」と表示するプログラムを作成してください。

**要件:**
1. `let age = 20`のように、変数で年齢を定義する
2. `>`演算子を使って18歳より大きいかチェックする（18歳ちょうどは含まない）
3. 条件が満たされたら、id="result"の要素に「大人です」と表示する

<details>
<summary>💡 ヒント1: > と >= の違い</summary>

```javascript
// > は等しい場合を含まない
18 > 18  // false
19 > 18  // true

// >= は等しい場合を含む
18 >= 18  // true
19 >= 18  // true
```
</details>

<details>
<summary>💡 ヒント2: 関数の構造</summary>

```javascript
function checkAge() {
  let age = 20;

  if (age > 18) {
    // 結果を表示
  }
}
```
</details>

<details>
<summary>💡 ヒント3: 完成例</summary>

```javascript
function checkAge() {
  let age = 20;

  if (age > 18) {
    const elem = document.getElementById("result");
    elem.textContent = "大人です";
  }
}
```
</details>

### 問題2: ぴったり判定

ボタンをクリックしたときに、数値が100とぴったり等しい場合に「100点満点」と表示するプログラムを作成してください。

**要件:**
1. `let score = 100`のように、変数でスコアを定義する
2. `===`演算子を使って100と等しいかチェックする
3. 条件が満たされたら、id="result"の要素に「100点満点」と表示する

<details>
<summary>💡 ヒント1: ===の使い方</summary>

```javascript
// === は厳密等価
100 === 100  // true
100 === 99   // false
100 === "100"  // false（型が違う）
```
</details>

<details>
<summary>💡 ヒント2: 完成例</summary>

```javascript
function checkPerfect() {
  let score = 100;

  if (score === 100) {
    const elem = document.getElementById("result");
    elem.textContent = "100点満点";
  }
}
```
</details>

### 問題3: 範囲判定

ボタンをクリックしたときに、温度が30度以上の場合に「暑いです」、10度以下の場合に「寒いです」と表示するプログラムを作成してください。

**要件:**
1. `let temperature = 35`のように、変数で温度を定義する
2. 1つ目のif文で`>=`演算子を使って30度以上かチェックする
3. 2つ目のif文で`<=`演算子を使って10度以下かチェックする
4. それぞれの条件が満たされたら、id="result"の要素に適切なメッセージを表示する

<details>
<summary>💡 ヒント1: 2つのif文</summary>

```javascript
function checkTemp() {
  let temperature = 35;

  if (temperature >= 30) {
    // 暑いです
  }

  if (temperature <= 10) {
    // 寒いです
  }
}
```
</details>

<details>
<summary>💡 ヒント2: 完成例</summary>

```javascript
function checkTemp() {
  let temperature = 35;

  if (temperature >= 30) {
    const elem = document.getElementById("result");
    elem.textContent = "暑いです";
  }

  if (temperature <= 10) {
    const elem = document.getElementById("result");
    elem.textContent = "寒いです";
  }
}
```
</details>

### チェックリスト

実装後、次の項目を確認してください:

- [ ] 6つの比較演算子（===, !==, >, <, >=, <=）を理解している
- [ ] ===と!==の違いを理解している
- [ ] >と>=の違いを理解している
- [ ] <と<=の違いを理解している
- [ ] ==ではなく===を使っている
- [ ] =（代入）と===（比較）を混同していない
- [ ] 複数のif文を使って複数の条件を判定できる
- [ ] 変数同士の比較ができる

## ポイント

- 比較演算子は2つの値を比較して`true`または`false`を返します
- `===`で等しいかどうかを判定します（厳密等価）
- `!==`で等しくないかどうかを判定します（厳密不等価）
- `>`、`<`、`>=`、`<=`で大小を比較します
- `>`と`>=`の違い：`>`は等しい場合を含まない、`>=`は含む
- `<`と`<=`の違い：`<`は等しい場合を含まない、`<=`は含む
- `===`を使い、`==`は使わない（型変換を避ける）
- 複数のif文を使って複数の条件を判定できます
- 変数同士を比較することもできます

## できるようになったこと

このレッスンを終えると、次のことができるようになります:

- [ ] 6つの比較演算子を使い分けられる
- [ ] ===演算子で等しいかを判定できる
- [ ] !==演算子で等しくないかを判定できる
- [ ] >と>=の違いを理解して使える
- [ ] <と<=の違いを理解して使える
- [ ] ==ではなく===を使う理由を理解できる
- [ ] 複数の条件を組み合わせられる
- [ ] 実用的な判定プログラムを作成できる

## まとめ

このレッスンでは、比較演算子の詳細を学びました。

### 重要なポイント7つ:

1. **6つの演算子**: `===`, `!==`, `>`, `<`, `>=`, `<=`
2. **厳密等価**: `===`は型も含めて比較する
3. **厳密不等価**: `!==`は等しくないを判定する
4. **境界値**: `>=`と`>`の違いは等しい場合を含むか
5. **避けるべき**: `==`ではなく`===`を使う
6. **複数判定**: 複数のif文で複数の条件を判定
7. **実用性**: 合格判定、範囲判定、ぴったり判定など

これにより、さまざまな条件判定ができるプログラムを作ることができます。

## 次のステップ

次のレッスンでは、**文字列の比較**について学びます。

- 文字列同士の比較
- 文字列と===の使い方
- 大文字・小文字の違い
- 実用的な文字列判定

比較演算子の知識を応用して、文字列を使った判定ができるようになります。
