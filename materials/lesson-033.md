# Lesson 033: 条件分岐入門

これまでのレッスンでは、プログラムは常に同じ処理を実行していました。しかし、実際のアプリケーションでは、状況に応じて異なる処理を行う必要があります。このレッスンでは、条件によって処理を分岐させる方法を学びます。

## なぜ重要なのか

条件分岐は、すべてのプログラムの基礎となる技術です。実際のウェブサイトで頻繁に使われています。

| サービス | 具体例 | 使用される条件分岐 |
|---------|--------|------------------|
| **Twitter** | ログイン状態の判定 | if (ログイン済み) { ツイート可能 } |
| **Amazon** | 在庫チェック | if (在庫あり) { 購入ボタン表示 } |
| **YouTube** | 年齢制限 | if (18歳以上) { 動画視聴可能 } |
| **Google** | 検索結果の有無 | if (結果あり) { 結果表示 } else { 該当なし } |
| **メルカリ** | 価格の妥当性 | if (価格 > 0) { 出品可能 } |

これらはすべて、条件分岐を使って実装されています。

## 基本概念の説明

### 条件分岐とは

条件分岐とは、ある条件が満たされているかどうかによって、異なる処理を実行する仕組みのことです。

```
      条件判定
         ↓
    [age >= 18?]
       ↙   ↘
    true    false
      ↓       ↓
  処理実行  スキップ
  "大人"
```

**日常生活の例:**
- もし雨なら傘を持っていく
- もし18歳以上なら映画を見られる
- もし60点以上なら合格

**プログラムの例:**
- もし年齢が18歳以上なら「大人」と表示する
- もし点数が60点以上なら「合格」と表示する
- もしクリック回数が10回を超えたら「たくさんクリックされました」と表示する

### 動作の流れ

```
1. プログラム開始
   let age = 20;
            ↓
2. if文に到達
   if (age >= 18)
            ↓
3. 条件を評価
   20 >= 18 → true
            ↓
4. 条件がtrueなので実行
   console.log("大人です");
            ↓
5. if文の後の処理へ
   （プログラム続行）
```

## if文の基本

JavaScriptでは、`if`文を使って条件分岐を行います。

### 基本的な書き方

```javascript
if (条件) {
  // 条件が満たされたときに実行する処理
}
```

**構造:**

| 部分 | 説明 | 例 |
|------|------|-----|
| `if` | キーワード | 条件分岐の開始 |
| `(条件)` | 判定する式 | `age >= 18` |
| `{ }` | ブロック | 実行する処理 |

### 実際の例: 年齢判定

年齢が18歳以上かどうかを判定するプログラムを作ってみましょう。

```javascript
let age = 20;

if (age >= 18) {
  console.log("大人です");
}
```

**実行結果:**
```
大人です
```

**動作の説明:**
1. `age`に20が代入される
2. `age >= 18`が評価される → `20 >= 18` → `true`
3. 条件が`true`なので、ブロック内が実行される
4. "大人です"と表示される

### 条件が満たされない場合

```javascript
let age = 15;

if (age >= 18) {
  console.log("大人です");
}
```

**実行結果:**
```
（何も表示されない）
```

**動作の説明:**
1. `age`に15が代入される
2. `age >= 18`が評価される → `15 >= 18` → `false`
3. 条件が`false`なので、ブロック内はスキップされる
4. 何も実行されない

## 条件の真偽

条件は、`true`または`false`という特殊な値に評価されます。これらの値を「**真偽値（ブール値）**」と呼びます。

### trueの場合

```javascript
let age = 20;
console.log(age >= 18);  // true
```

`age >= 18`という式は、`true`という値になります。この`true`という値によって、if文の中の処理が実行されるかどうかが決まります。

### falseの場合

```javascript
let age = 15;
console.log(age >= 18);  // false
```

`age`が15の場合、`age >= 18`という式は`false`になります。この場合、if文の中の処理は実行されません。

### 真偽値の確認

```javascript
// 条件式の結果を変数に格納できる
let age = 20;
let isAdult = age >= 18;
console.log(isAdult);  // true
console.log(typeof isAdult);  // "boolean"
```

## 比較演算子

条件を作るために、以下のような比較演算子を使います。

| 演算子 | 意味 | 例 | 結果 |
|--------|------|-----|------|
| `>=` | 以上（等しいを含む） | `20 >= 18` | `true` |
| `<=` | 以下（等しいを含む） | `15 <= 18` | `true` |
| `>` | より大きい（等しいを含まない） | `20 > 18` | `true` |
| `<` | より小さい（等しいを含まない） | `15 < 18` | `true` |

### 各演算子の詳細

**>= （以上）:**
```javascript
let age = 18;

if (age >= 18) {
  console.log("18歳以上です");  // 表示される
}

// 18 >= 18 は true（等しい場合も含む）
```

**> （より大きい）:**
```javascript
let age = 18;

if (age > 18) {
  console.log("18歳より上です");  // 表示されない
}

// 18 > 18 は false（等しい場合は含まない）
```

### >= と > の違い

```javascript
let score = 60;

// >= は等しい場合も含む
if (score >= 60) {
  console.log("合格");  // 表示される（60 >= 60 は true）
}

// > は等しい場合を含まない
if (score > 60) {
  console.log("合格");  // 表示されない（60 > 60 は false）
}
```

**境界値の比較:**

| score | `score >= 60` | `score > 60` |
|-------|---------------|--------------|
| 59 | `false` | `false` |
| 60 | `true` | `false` |
| 61 | `true` | `true` |

## ブロックとは

if文の中括弧 `{ }` で囲まれた部分を「**ブロック**」と呼びます。

### 単一処理のブロック

```javascript
if (age >= 18) {
  console.log("大人です");
}
```

### 複数処理のブロック

```javascript
if (age >= 18) {
  // ここがブロック
  console.log("大人です");
  console.log("選挙権があります");
  console.log("運転免許が取得できます");
}
```

**重要:**
- ブロックの中には、複数の処理を書くことができます
- 条件が満たされた場合、ブロック内のすべての処理が**順番に**実行されます
- インデント（字下げ）で読みやすくします

### ブロックのインデント

```javascript
// ✅ 良い例：インデントあり
if (age >= 18) {
  console.log("大人です");
  console.log("選挙権があります");
}

// ❌ 悪い例：インデントなし（読みにくい）
if (age >= 18) {
console.log("大人です");
console.log("選挙権があります");
}
```

## 変数の値を変えて試す

同じif文でも、変数の値を変えることで、実行される処理が変わります。

```javascript
let age = 20;

if (age >= 18) {
  console.log("大人です");  // 表示される
}

age = 15;  // 値を変更

if (age >= 18) {
  console.log("大人です");  // 表示されない
}
```

**実行の流れ:**

```
1回目のif文:
age = 20
20 >= 18 → true
「大人です」と表示

値を変更:
age = 15

2回目のif文:
age = 15
15 >= 18 → false
何も表示されない
```

## DOMと組み合わせる

if文をDOM操作と組み合わせることで、条件に応じて表示を変更できます。

### 基本例

HTML:
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
      }
    }
  </script>
</body>
</html>
```

**動作:**
1. ボタンをクリック
2. `checkAge()`関数が実行される
3. `age`が18以上かチェック
4. 条件が`true`なので「大人です」と表示

## 実践例: 点数判定

点数が60点以上かどうかを判定するプログラムを作ってみましょう。

```javascript
function checkScore() {
  let score = 75;

  if (score >= 60) {
    const elem = document.getElementById("result");
    elem.textContent = "合格です";
  }
}
```

**動作の流れ:**

```
1. 関数が実行される
   score = 75
        ↓
2. 条件を評価
   75 >= 60 → true
        ↓
3. ブロック内を実行
   result要素のtextContentに"合格です"を設定
        ↓
4. 画面に「合格です」と表示
```

### 異なる点数で試す

```javascript
// 点数を変えて試す
function checkScore1() {
  let score = 75;
  if (score >= 60) {
    console.log("合格です");  // 表示される
  }
}

function checkScore2() {
  let score = 45;
  if (score >= 60) {
    console.log("合格です");  // 表示されない
  }
}

function checkScore3() {
  let score = 60;
  if (score >= 60) {
    console.log("合格です");  // 表示される（60は含む）
  }
}
```

## カウンターと組み合わせる

以前学んだカウンターと組み合わせることで、クリック回数に応じて表示を変更できます。

```javascript
let count = 0;

function addCount() {
  count++;
  const counter = document.getElementById("counter");
  counter.textContent = count;

  if (count >= 10) {
    const message = document.getElementById("message");
    message.textContent = "10回以上クリックされました";
  }
}
```

**動作の流れ:**

```
クリック1回目: count = 1, 1 >= 10 → false（メッセージなし）
クリック2回目: count = 2, 2 >= 10 → false（メッセージなし）
...
クリック9回目: count = 9, 9 >= 10 → false（メッセージなし）
クリック10回目: count = 10, 10 >= 10 → true（メッセージ表示！）
クリック11回目: count = 11, 11 >= 10 → true（メッセージ表示）
```

**注意:**
10回目以降は毎回条件が`true`になるため、メッセージが毎回設定されます（見た目は変わりませんが）。

## よくある間違いと解決方法

### 間違い1: 括弧を忘れる

```javascript
// ❌ 間違い：条件の括弧を忘れる
let age = 20;
if age >= 18 {
  console.log("大人です");
}
```

**エラーメッセージ:**
```
Uncaught SyntaxError: Unexpected identifier
```

**何が問題か:**
条件は必ず括弧`()`で囲む必要があります。

**解決方法:**
```javascript
// ✅ 正しい
let age = 20;
if (age >= 18) {
  console.log("大人です");
}
```

### 間違い2: 中括弧を忘れる

```javascript
// ⚠️ 動くが推奨されない
let age = 20;
if (age >= 18)
  console.log("大人です");
```

**何が問題か:**
中括弧を省略できますが、複数行の処理を追加するときに問題が起こりやすいです。

**解決方法:**
```javascript
// ✅ 正しい：常に中括弧を使う
let age = 20;
if (age >= 18) {
  console.log("大人です");
}
```

### 間違い3: 比較演算子の間違い

```javascript
// ❌ 間違い：= を使う（代入になる）
let age = 20;
if (age = 18) {  // 代入している
  console.log("大人です");
}
```

**何が問題か:**
`=`は代入、`>=`や`===`は比較です。

**解決方法:**
```javascript
// ✅ 正しい
let age = 20;
if (age >= 18) {  // 比較している
  console.log("大人です");
}
```

### 間違い4: >= と > の混同

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

### 間違い5: 条件式の結果を理解していない

```javascript
// ❌ 間違い：条件を文字列にしている
let age = 20;
if ("age >= 18") {  // 文字列は常にtrue
  console.log("大人です");  // 常に表示される
}
```

**何が問題か:**
文字列は常に`true`として評価されます。

**解決方法:**
```javascript
// ✅ 正しい：条件式を直接書く
let age = 20;
if (age >= 18) {
  console.log("大人です");
}
```

### 間違い6: インデントの不統一

```javascript
// ❌ 悪い例：インデントが不統一
let age = 20;
if (age >= 18) {
console.log("大人です");
    console.log("選挙権があります");
  console.log("運転免許が取得できます");
}
```

**何が問題か:**
読みにくく、バグの原因になります。

**解決方法:**
```javascript
// ✅ 正しい：統一されたインデント
let age = 20;
if (age >= 18) {
  console.log("大人です");
  console.log("選挙権があります");
  console.log("運転免許が取得できます");
}
```

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
  <h1>年齢判定</h1>
  <p>あなたの年齢: 25歳</p>
  <button onclick="checkAge()">判定する</button>
  <p id="result"></p>

  <script>
    function checkAge() {
      let age = 25;

      if (age >= 18) {
        const elem = document.getElementById("result");
        elem.textContent = "成人です";
      }
    }
  </script>
</body>
</html>
```

**動作:**
- ボタンをクリック
- 年齢が18歳以上なので「成人です」と表示

### 例2: スコア判定アプリ

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>スコア判定</title>
</head>
<body>
  <h1>テスト結果判定</h1>
  <p>あなたの点数: 85点</p>
  <button onclick="checkScore()">判定する</button>
  <p id="result"></p>

  <script>
    function checkScore() {
      let score = 85;

      if (score >= 80) {
        const elem = document.getElementById("result");
        elem.textContent = "優秀です";
      }
    }
  </script>
</body>
</html>
```

**動作:**
- ボタンをクリック
- 点数が80点以上なので「優秀です」と表示

### 例3: カウンター判定アプリ

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>カウンター判定</title>
</head>
<body>
  <h1>カウンター判定</h1>
  <p>カウント: <span id="counter">0</span></p>
  <button onclick="addCount()">カウント追加</button>
  <p id="message"></p>

  <script>
    let count = 0;

    function addCount() {
      count++;
      const counter = document.getElementById("counter");
      counter.textContent = count;

      if (count >= 5) {
        const message = document.getElementById("message");
        message.textContent = "5回以上クリックされました";
      }
    }
  </script>
</body>
</html>
```

**動作:**
- ボタンをクリックするたびにカウントが増える
- 5回以上クリックするとメッセージが表示される

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
  <h1>複数の判定</h1>
  <button onclick="checkAll()">すべて判定</button>
  <p id="result1"></p>
  <p id="result2"></p>
  <p id="result3"></p>

  <script>
    function checkAll() {
      let age = 20;
      let score = 75;
      let count = 8;

      if (age >= 18) {
        document.getElementById("result1").textContent = "年齢: 成人です";
      }

      if (score >= 60) {
        document.getElementById("result2").textContent = "点数: 合格です";
      }

      if (count >= 5) {
        document.getElementById("result3").textContent = "カウント: 5回以上です";
      }
    }
  </script>
</body>
</html>
```

**動作:**
- 1つのボタンで3つの判定を実行
- それぞれの条件に応じて結果を表示

## 練習問題

### 問題1: 年齢判定

ボタンをクリックしたときに、年齢が20歳以上の場合に「成人です」と表示するプログラムを作成してください。

**要件:**
1. `let age = 25`のように、変数で年齢を定義する
2. `if`文を使って20歳以上かチェックする
3. 条件が満たされたら、id="result"の要素に「成人です」と表示する
4. ボタンをクリックすると判定が実行される

<details>
<summary>💡 ヒント1: HTML構造</summary>

```html
<button onclick="checkAge()">判定する</button>
<p id="result"></p>
```
</details>

<details>
<summary>💡 ヒント2: 関数の構造</summary>

```javascript
function checkAge() {
  let age = 25;

  if (age >= 20) {
    // 結果を表示
  }
}
```
</details>

<details>
<summary>💡 ヒント3: 完成例</summary>

```javascript
function checkAge() {
  let age = 25;

  if (age >= 20) {
    const elem = document.getElementById("result");
    elem.textContent = "成人です";
  }
}
```
</details>

### 問題2: スコア判定

ボタンをクリックしたときに、スコアが80点以上の場合に「優秀です」と表示するプログラムを作成してください。

**要件:**
1. `let score = 85`のように、変数でスコアを定義する
2. `if`文を使って80点以上かチェックする
3. 条件が満たされたら、id="result"の要素に「優秀です」と表示する

<details>
<summary>💡 ヒント1: 関数の構造</summary>

```javascript
function checkScore() {
  let score = 85;

  if (score >= 80) {
    // 結果を表示
  }
}
```
</details>

<details>
<summary>💡 ヒント2: 完成例</summary>

```javascript
function checkScore() {
  let score = 85;

  if (score >= 80) {
    const elem = document.getElementById("result");
    elem.textContent = "優秀です";
  }
}
```
</details>

### 問題3: カウンター判定

カウンターを増やすボタンを作成してください。カウントが5以上になったら、「5回以上クリックされました」というメッセージを表示してください。

**要件:**
1. グローバル変数`count`を0で初期化する
2. ボタンをクリックするたびに`count`を1増やす
3. カウント数をid="counter"の要素に表示する
4. `if`文を使って5以上かチェックする
5. 条件が満たされたら、id="message"の要素にメッセージを表示する

<details>
<summary>💡 ヒント1: グローバル変数</summary>

```javascript
let count = 0;

function addCount() {
  count++;
  // ...
}
```
</details>

<details>
<summary>💡 ヒント2: カウント表示とチェック</summary>

```javascript
function addCount() {
  count++;

  // カウントを表示
  const counter = document.getElementById("counter");
  counter.textContent = count;

  // 5以上かチェック
  if (count >= 5) {
    // メッセージを表示
  }
}
```
</details>

<details>
<summary>💡 ヒント3: 完成例</summary>

```javascript
let count = 0;

function addCount() {
  count++;

  const counter = document.getElementById("counter");
  counter.textContent = count;

  if (count >= 5) {
    const message = document.getElementById("message");
    message.textContent = "5回以上クリックされました";
  }
}
```
</details>

### チェックリスト

実装後、次の項目を確認してください:

- [ ] if文の基本構文を理解している
- [ ] 条件を括弧`()`で囲んでいる
- [ ] ブロックを中括弧`{}`で囲んでいる
- [ ] 比較演算子（>=, <=, >, <）を正しく使える
- [ ] 条件がtrueのときだけ処理が実行される
- [ ] 条件がfalseのときは何も起こらない
- [ ] DOM操作と組み合わせられる
- [ ] インデントが統一されている

## ポイント

- if文は条件分岐の基本です
- 条件は括弧`()`で囲みます
- 実行する処理は中括弧`{}`で囲みます（ブロック）
- 条件は`true`または`false`に評価されます
- 比較演算子（`>=`, `<=`, `>`, `<`）を使って条件を作ります
- `>=`は等しい場合も含み、`>`は含みません
- 条件が`true`の場合のみ、ブロック内の処理が実行されます
- 条件が`false`の場合、ブロック内はスキップされます
- 複数の処理をブロック内に書けます
- インデントで読みやすくします

## できるようになったこと

このレッスンを終えると、次のことができるようになります:

- [ ] if文の基本構文を書ける
- [ ] 条件式を作成できる
- [ ] 比較演算子を使える
- [ ] true/falseの概念を理解できる
- [ ] ブロックの概念を理解できる
- [ ] 条件に応じて処理を分岐できる
- [ ] if文とDOM操作を組み合わせられる
- [ ] カウンターと条件分岐を組み合わせられる

## まとめ

このレッスンでは、条件分岐の基礎を学びました。

### 重要なポイント7つ:

1. **if文の構文**: `if (条件) { 処理 }`
2. **条件の評価**: 条件は`true`か`false`に評価される
3. **比較演算子**: `>=`（以上）、`<=`（以下）、`>`（より大きい）、`<`（より小さい）
4. **ブロック**: `{}`で囲まれた処理のまとまり
5. **実行の制御**: 条件が`true`のときだけ実行
6. **DOM連携**: 条件に応じて画面表示を変更
7. **組み合わせ**: カウンターなど他の機能と組み合わせ可能

これにより、状況に応じて異なる処理を実行できるプログラムを作ることができます。

## 次のステップ

次のレッスンでは、**等しいかどうかの判定（=== と !==）**について学びます。

- `===`演算子の使い方
- `!==`演算子の使い方
- 等しい・等しくないの判定
- 文字列や数値の比較

条件分岐の知識を応用して、さらに複雑な判定ができるようになります。
