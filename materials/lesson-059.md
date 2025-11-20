---
title: "Lesson 059: Truthyとfalsy"
author: "JavaScript学習教材"
date: "2025-11-20"
---

## 今回の学習

### 前回の復習

前回のレッスンでは、真偽値の活用について学びました。フラグ変数を使ってプログラムの状態を管理し、トグル処理（`変数 = !変数`）で状態を反転させる方法を習得しました。ON/OFFスイッチを作成し、真偽値を使った実践的なプログラミングを体験しました。

### 今回の目標

今回のレッスンでは、JavaScriptの**TruthyとFalsy**という重要な概念を学びます。JavaScriptでは、`true`と`false`以外の値も、条件判定の中で真偽値のように扱われます。この仕組みを理解することで、より柔軟で簡潔なコードを書けるようになります。

今回のレッスンで習得する内容は以下の通りです。

- Falsy値（0、空文字、null、undefined）の理解
- 暗黙的な真偽判定の仕組み
- 明示的な判定との違い

## TruthyとFalsyとは

JavaScriptでは、`if`文などの条件判定で、真偽値（`true`/`false`）以外の値も使うことができます。このとき、JavaScriptは自動的にその値を真偽値に変換します。

```javascript
let name = "太郎";

if (name) {
  console.log("名前が入力されています");
}
```

このコードでは、`name`は文字列ですが、`if`文の中で真偽値として評価されます。空文字でない文字列は「真」として扱われるため、メッセージが表示されます。

このように、条件判定で「真」として扱われる値を**Truthy（トゥルーシー）**、「偽」として扱われる値を**Falsy（フォルシー）**と呼びます。

## Falsy値

JavaScriptには、条件判定で「偽」として扱われる値が6つあります。これらを**Falsy値**と呼びます。

1. **false** - 真偽値の偽
2. **0** - 数値のゼロ
3. **""** - 空文字列（空の文字列）
4. **null** - 値が存在しないことを明示的に示す
5. **undefined** - 値が未定義
6. **NaN** - Not a Number（数値でない）

これら6つの値以外は、すべてTruthy値（真として扱われる）です。

それぞれのFalsy値を実際に確認してみましょう。

```javascript
// false
if (false) {
  console.log("実行されない");
}

// 0
if (0) {
  console.log("実行されない");
}

// 空文字列
if ("") {
  console.log("実行されない");
}

// null
if (null) {
  console.log("実行されない");
}

// undefined
if (undefined) {
  console.log("実行されない");
}

// NaN
if (NaN) {
  console.log("実行されない");
}
```

これらの条件はすべてFalsyなので、`if`文の中の処理は実行されません。

### 空文字列とスペースの違い

注意が必要なのは、空文字列（`""`）とスペースを含む文字列（`" "`）は違うということです。

```javascript
let empty = "";
let space = " ";

if (empty) {
  console.log("実行されない"); // 空文字列はFalsy
}

if (space) {
  console.log("実行される"); // スペースを含む文字列はTruthy
}
```

スペースも1文字として扱われるため、`" "`はTruthy値です。

### 0と他の数値

数値の中で、Falsyなのは`0`だけです。負の数や小数もTruthyです。

```javascript
if (0) {
  console.log("実行されない"); // 0はFalsy
}

if (1) {
  console.log("実行される"); // 1はTruthy
}

if (-1) {
  console.log("実行される"); // -1もTruthy
}

if (0.1) {
  console.log("実行される"); // 0.1もTruthy
}
```

## Truthy値

Falsy値以外のすべての値は、Truthy値として扱われます。以下は代表的なTruthy値です。

- 空でない文字列（`"hello"`, `"0"`, `" "`など）
- 0以外の数値（`1`, `-1`, `0.1`など）
- オブジェクト（`{}`など）
- 配列（`[]`など、空の配列も含む）
- 関数

```javascript
if ("hello") {
  console.log("実行される"); // 文字列はTruthy
}

if (123) {
  console.log("実行される"); // 0以外の数値はTruthy
}

if (-5) {
  console.log("実行される"); // 負の数もTruthy
}
```

特に注意すべきなのは、文字列の`"0"`です。これは数値の`0`ではなく文字列なので、Truthyです。

```javascript
if ("0") {
  console.log("実行される"); // "0"は文字列なのでTruthy
}

if (0) {
  console.log("実行されない"); // 0は数値なのでFalsy
}
```

## 暗黙的な真偽判定

JavaScriptでは、条件判定の中で値が自動的に真偽値に変換されます。これを**暗黙的な真偽判定**と呼びます。

```javascript
let username = prompt("名前を入力してください");

if (username) {
  console.log("ようこそ、" + username + "さん");
} else {
  console.log("名前が入力されていません");
}
```

この例では、`username`が空文字列の場合（何も入力せずにOKを押した場合）、Falsyとして扱われ、else節が実行されます。文字列が入力されていれば、Truthyとして扱われ、if節が実行されます。

### 空文字チェックの簡略化

暗黙的な真偽判定を使うと、コードを簡潔に書けます。

```javascript
// 明示的な比較
let name = document.getElementById("nameInput").value;
if (name !== "") {
  console.log("名前: " + name);
}

// 暗黙的な真偽判定（より簡潔）
let name = document.getElementById("nameInput").value;
if (name) {
  console.log("名前: " + name);
}
```

どちらも同じ結果になりますが、下の方がシンプルです。

### 数値のチェック

数値が入力されているかをチェックする場合、注意が必要です。

```javascript
let count = 0;

if (count) {
  console.log("カウント: " + count);
} else {
  console.log("カウントなし");
}
// 結果: "カウントなし" （0はFalsyなので）
```

この場合、`count`が`0`でも有効な値として扱いたい場合は、明示的な比較が必要です。

```javascript
let count = 0;

if (count !== undefined && count !== null) {
  console.log("カウント: " + count);
}
// 結果: "カウント: 0"
```

または、`0`も有効な値として扱いたい場合は、以下のようにします。

```javascript
let count = 0;

if (typeof count === "number") {
  console.log("カウント: " + count);
}
```

## 明示的な判定

暗黙的な判定に頼らず、明確に条件を書くことを**明示的な判定**と呼びます。

```javascript
// 暗黙的
if (value) {
  // valueがTruthyの場合
}

// 明示的
if (value !== null && value !== undefined) {
  // valueがnullでもundefinedでもない場合
}
```

明示的な判定は、コードの意図が明確になるため、可読性が向上します。特に、`0`や空文字列を有効な値として扱う場合は、明示的な判定が推奨されます。

### いつ明示的に書くべきか

以下のような場合は、明示的な判定を使うと良いでしょう。

1. **0が有効な値の場合**

```javascript
let score = 0;

// 悪い例（0がFalsyなので動作しない）
if (score) {
  console.log("スコア: " + score);
}

// 良い例
if (score !== undefined) {
  console.log("スコア: " + score);
}
```

2. **空文字列が意味を持つ場合**

```javascript
let comment = "";

// 明示的に空文字列かチェック
if (comment === "") {
  console.log("コメントが空です");
}
```

3. **意図が明確でない場合**

```javascript
// どちらもnullとundefinedをチェックしているが、明示的な方が分かりやすい

// 暗黙的（何をチェックしているか分かりにくい）
if (data) {
  processData(data);
}

// 明示的（nullとundefinedをチェックしていることが明確）
if (data !== null && data !== undefined) {
  processData(data);
}
```

## nullとundefinedの違い

`null`と`undefined`は、どちらもFalsyですが、意味が異なります。

- **undefined**: 変数が宣言されているが、値が代入されていない状態
- **null**: 意図的に「値がない」ことを示す

```javascript
let a;
console.log(a); // undefined（値が未定義）

let b = null;
console.log(b); // null（明示的に値なしを設定）
```

どちらもFalsyなので、条件判定では同じように扱われます。

```javascript
if (!a) {
  console.log("aはFalsy"); // 実行される
}

if (!b) {
  console.log("bはFalsy"); // 実行される
}
```

## 否定演算子との組み合わせ

Falsy値を`!`（否定演算子）で反転すると、`true`になります。

```javascript
let empty = "";

if (!empty) {
  console.log("空文字列です"); // 実行される
}

let name = "太郎";

if (!name) {
  console.log("名前がありません"); // 実行されない
}
```

この技法は、「空文字でない場合」や「値が存在する場合」をチェックする際に便利です。

```javascript
// 名前が空でない場合の処理
if (!name) {
  console.log("名前を入力してください");
  return;
}

// ここからは名前が入力されている前提の処理
console.log("ようこそ、" + name + "さん");
```

## 実践：真偽判定テスター

それでは、さまざまな値のTruthy/Falsyを判定するテスターを作ってみましょう。

**HTML部分:**

```html
<h1>真偽判定テスター</h1>
<input type="text" id="valueInput" placeholder="値を入力">
<button onclick="testValue()">判定する</button>
<p id="result"></p>
<p id="detail"></p>
```

**JavaScript部分:**

```javascript
function testValue() {
  let input = document.getElementById("valueInput").value;
  let testValue;

  // 入力値を適切な型に変換
  if (input === "") {
    testValue = "";
  } else if (input === "0") {
    testValue = 0;
  } else if (input === "null") {
    testValue = null;
  } else if (input === "undefined") {
    testValue = undefined;
  } else if (input === "NaN") {
    testValue = NaN;
  } else if (input === "false") {
    testValue = false;
  } else if (input === "true") {
    testValue = true;
  } else {
    testValue = input;
  }

  // 真偽判定
  if (testValue) {
    document.getElementById("result").textContent = "結果: Truthy（真として扱われる）";
    document.getElementById("result").style.color = "green";
  } else {
    document.getElementById("result").textContent = "結果: Falsy（偽として扱われる）";
    document.getElementById("result").style.color = "red";
  }

  // 詳細情報
  document.getElementById("detail").textContent = "型: " + typeof testValue + ", 値: " + testValue;
}
```

このコードの動作を詳しく見ていきましょう。

1. **入力値の取得**: ユーザーが入力した値を取得します

2. **型の変換**: 文字列として入力された値を、適切な型に変換します
   - `"0"`という文字列を数値の`0`に変換
   - `"null"`という文字列を`null`に変換
   - `"undefined"`という文字列を`undefined`に変換
   - その他、特殊な値を変換

3. **真偽判定**: `if (testValue)`で暗黙的な真偽判定を行います

4. **結果の表示**: Truthyなら緑色で「真として扱われる」、Falsyなら赤色で「偽として扱われる」と表示します

5. **詳細情報**: 値の型と実際の値を表示します

このテスターを使って、さまざまな値を試してみることができます。

- 空文字を入力（何も入力せずに判定）→ Falsy
- `0`と入力 → Falsy
- `1`と入力 → Truthy
- `null`と入力 → Falsy
- `undefined`と入力 → Falsy
- 任意の文字列を入力 → Truthy

## 実用例

TruthyとFalsyの理解は、実際のプログラミングで非常に役立ちます。

### 例1: デフォルト値の設定

```javascript
function greet(name) {
  // nameがFalsyなら"ゲスト"を使う
  let displayName = name;
  if (!name) {
    displayName = "ゲスト";
  }
  console.log("こんにちは、" + displayName + "さん");
}

greet("太郎"); // "こんにちは、太郎さん"
greet("");     // "こんにちは、ゲストさん"
greet(null);   // "こんにちは、ゲストさん"
```

### 例2: 入力検証

```javascript
function validateInput() {
  let name = document.getElementById("nameInput").value;
  let age = document.getElementById("ageInput").value;

  if (!name) {
    document.getElementById("result").textContent = "名前を入力してください";
    return;
  }

  if (!age) {
    document.getElementById("result").textContent = "年齢を入力してください";
    return;
  }

  document.getElementById("result").textContent = "入力完了";
}
```

### 例3: 条件付き処理

```javascript
function processData() {
  let data = document.getElementById("dataInput").value;

  if (data) {
    // dataがTruthyなら処理を実行
    console.log("データを処理: " + data);
  } else {
    console.log("データがありません");
  }
}
```

## 注意点とベストプラクティス

### 1. 0を有効な値として扱う場合

数値の`0`が意味のある値の場合、暗黙的な判定は使えません。

```javascript
// 悪い例
let count = 0;
if (count) {
  console.log("カウント: " + count); // 実行されない
}

// 良い例
if (count !== undefined && count !== null) {
  console.log("カウント: " + count); // 実行される
}
```

### 2. 空配列と空オブジェクト

空の配列や空のオブジェクトは、Truthyです。

```javascript
let emptyArray = [];
let emptyObject = {};

if (emptyArray) {
  console.log("実行される"); // 空配列でもTruthy
}

if (emptyObject) {
  console.log("実行される"); // 空オブジェクトでもTruthy
}
```

### 3. 文字列の"0"

文字列の`"0"`は、数値の`0`とは異なりTruthyです。

```javascript
if ("0") {
  console.log("実行される"); // "0"は文字列なのでTruthy
}

if (0) {
  console.log("実行されない"); // 0は数値なのでFalsy
}
```

## 練習問題

### 課題

さまざまな値の真偽判定を行うテスターを作成しましょう。入力された値がTruthyかFalsyかを判定し、結果を表示します。

### 保存場所

`exercises/lesson-059/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. 入力値を適切な型に変換する
2. 暗黙的な真偽判定を行う
3. 結果を色分けして表示する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-059
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

- 入力欄から値を取得します
- 特定の文字列（"0", "null", "undefined"など）を適切な型に変換します
- `if (testValue)`で暗黙的な真偽判定を行います
- Truthyの場合、「Truthy（真として扱われる）」と緑色で表示します
- Falsyの場合、「Falsy（偽として扱われる）」と赤色で表示します
- 値の型と実際の値を詳細として表示します

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 059</title>
</head>
<body>
    <h1>真偽判定テスター</h1>
    <input type="text" id="valueInput" placeholder="値を入力">
    <button onclick="testValue()">判定する</button>
    <p id="result"></p>
    <p id="detail"></p>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
function testValue() {
  let input = document.getElementById("valueInput").value;
  let testValue;

  // 入力値を適切な型に変換
  if (input === "") {
    testValue = "";
  } else if (input === "0") {
    testValue = 0;
  } else if (input === "null") {
    testValue = null;
  } else if (input === "undefined") {
    testValue = undefined;
  } else if (input === "NaN") {
    testValue = NaN;
  } else if (input === "false") {
    testValue = false;
  } else if (input === "true") {
    testValue = true;
  } else {
    testValue = input;
  }

  // 真偽判定
  if (testValue) {
    document.getElementById("result").textContent = "結果: Truthy（真として扱われる）";
    document.getElementById("result").style.color = "green";
  } else {
    document.getElementById("result").textContent = "結果: Falsy（偽として扱われる）";
    document.getElementById("result").style.color = "red";
  }

  // 詳細情報
  document.getElementById("detail").textContent = "型: " + typeof testValue + ", 値: " + testValue;
}
```

### 解説

このプログラムは、入力された値のTruthy/Falsyを判定します。

1. **入力値の取得**: ユーザーが入力した文字列を取得します

2. **型の変換**: 文字列として入力された値を、適切な型に変換します
   - 空文字（何も入力しない）→ 空文字列`""`
   - "0"という文字列 → 数値の`0`
   - "null"という文字列 → `null`値
   - "undefined"という文字列 → `undefined`値
   - "NaN"という文字列 → `NaN`値
   - "false"という文字列 → 真偽値の`false`
   - "true"という文字列 → 真偽値の`true`
   - その他 → 入力された文字列そのまま

3. **暗黙的な真偽判定**: `if (testValue)`で、JavaScriptの暗黙的な真偽判定を実行します。Falsyな値（false, 0, "", null, undefined, NaN）は偽として、それ以外はすべて真として扱われます

4. **結果の表示**:
   - Truthyの場合、緑色で「Truthy（真として扱われる）」と表示
   - Falsyの場合、赤色で「Falsy（偽として扱われる）」と表示

5. **詳細情報の表示**: `typeof`演算子で値の型を取得し、実際の値とともに表示します

このテスターを使うことで、JavaScriptがどのような値をTruthyまたはFalsyとして扱うかを実際に確認できます。

## まとめ

お疲れ様でした。今回のレッスンでは、TruthyとFalsyについて学びました。

**今回のキーポイント:**

- **Falsy値**: JavaScriptには、条件判定で「偽」として扱われる値が6つあります。`false`、`0`、`""`（空文字列）、`null`、`undefined`、`NaN`です。これら以外のすべての値はTruthy（真として扱われる）です。特に、文字列の`"0"`や空配列`[]`、空オブジェクト`{}`はTruthyなので注意が必要です

- **暗黙的な真偽判定**: JavaScriptでは、`if`文などの条件判定で、真偽値以外の値も自動的に真偽値に変換されます。これにより、`if (name)`のようなシンプルなコードで空文字チェックができます。ただし、`0`を有効な値として扱う場合は、明示的な比較が必要です

- **明示的な判定**: 暗黙的な判定に頼らず、`value !== null && value !== undefined`のように明確に条件を書くことを明示的な判定と呼びます。コードの意図が明確になり、可読性が向上します。特に数値の`0`や空文字列を有効な値として扱う場合は、明示的な判定が推奨されます

TruthyとFalsyの理解は、JavaScriptプログラミングの基礎であり、入力検証、デフォルト値の設定、条件付き処理など、さまざまな場面で活用できます。この知識を身につけることで、より簡潔で柔軟なコードが書けるようになります。

次のレッスンでは、条件分岐のリファクタリングについて学びます。コードの重複を削除し、条件を整理して、より保守しやすいコードを書く方法を習得していきましょう。
