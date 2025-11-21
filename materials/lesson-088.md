---
title: "Lesson 088: 要素の変更"
author: "JavaScript学習教材"
date: "2025-01-21"
---

# レッスン88：要素の変更

## 今回の学習

### 前回の復習

前回のレッスンでは、配列の要素にアクセスする方法を学びました。

- **インデックスでアクセス**：`配列名[インデックス]`の形式で、特定の要素を取得できます
- **0ベースインデックス**：配列のインデックスは0から始まり、最初の要素は`配列名[0]`です
- **最後の要素**：`配列名[配列名.length - 1]`で最後の要素を取得できます
- **成果物**：要素取得マスター - 配列の様々な位置の要素にアクセスしました

### 今回の目標

今回のレッスンでは、配列の要素を変更する方法を学びます。

- インデックスを使って要素を書き換える
- 複数の要素を変更する
- 配列の可変性を理解する

## 配列の可変性

JavaScriptの配列は**可変（mutable）**です。これは、一度作成した配列の要素を後から変更できることを意味します。

### 変数との違い

**変数の再代入**：
```javascript
let fruit = "りんご";
fruit = "みかん";  // 変数全体を上書き
console.log(fruit);  // "みかん"
```

**配列の要素変更**：
```javascript
let fruits = ["りんご", "バナナ", "ぶどう"];
fruits[0] = "みかん";  // 最初の要素だけを変更
console.log(fruits);  // ["みかん", "バナナ", "ぶどう"]
```

配列では、配列全体を置き換えることなく、特定の要素だけを変更できます。

## 要素の変更方法

配列の要素を変更するには、代入演算子`=`を使います。

### 基本的な構文

```javascript
配列名[インデックス] = 新しい値;
```

### 最初の要素を変更

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]

fruits[0] = "メロン";
console.log(fruits);  // ["メロン", "みかん", "ぶどう"]
```

**変更前**：
```
インデックス:  0        1        2
値:         "りんご"  "みかん"  "ぶどう"
```

**変更後**：
```
インデックス:  0        1        2
値:         "メロン"  "みかん"  "ぶどう"
```

### 2番目の要素を変更

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
fruits[1] = "バナナ";
console.log(fruits);  // ["りんご", "バナナ", "ぶどう"]
```

### 最後の要素を変更

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
fruits[fruits.length - 1] = "いちご";
console.log(fruits);  // ["りんご", "みかん", "いちご"]
```

## 複数の要素を変更

複数の要素を順番に変更できます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]

fruits[0] = "メロン";
fruits[1] = "バナナ";
fruits[2] = "いちご";
console.log(fruits);  // ["メロン", "バナナ", "いちご"]
```

### すべての要素を変更

for文を使って、すべての要素を一度に変更できます。

```javascript
let numbers = [1, 2, 3, 4, 5];
console.log(numbers);  // [1, 2, 3, 4, 5]

// すべての要素を2倍にする
for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2;
}

console.log(numbers);  // [2, 4, 6, 8, 10]
```

**詳しい説明**：
- `numbers[i]`: 現在の値を取得
- `numbers[i] * 2`: 現在の値を2倍にする
- `numbers[i] = ...`: 新しい値を代入

### ループの動き

```javascript
// 1回目のループ: i = 0
numbers[0] = numbers[0] * 2;  // 1 * 2 = 2

// 2回目のループ: i = 1
numbers[1] = numbers[1] * 2;  // 2 * 2 = 4

// 3回目のループ: i = 2
numbers[2] = numbers[2] * 2;  // 3 * 2 = 6

// ...続く
```

## 条件付きの変更

条件に合う要素だけを変更することもできます。

```javascript
let numbers = [1, 2, 3, 4, 5];

// 偶数だけを0に変更
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    numbers[i] = 0;
  }
}

console.log(numbers);  // [1, 0, 3, 0, 5]
```

**詳しい説明**：
- `numbers[i] % 2 === 0`: 偶数かどうかをチェック
- 偶数なら`numbers[i] = 0`で0に変更
- 奇数ならそのまま

## constで宣言した配列

`const`で宣言した配列でも、要素の変更は可能です。

```javascript
const fruits = ["りんご", "みかん", "ぶどう"];

// 要素の変更は可能
fruits[0] = "メロン";
console.log(fruits);  // ["メロン", "みかん", "ぶどう"]

// 配列全体の再代入は不可
// fruits = ["バナナ"];  // エラー！
```

**重要**：
- `const`は配列への再代入を禁止します
- しかし、配列の中身（要素）の変更は許可されます

### constとletの違い

```javascript
// let: 配列全体の再代入が可能
let fruits1 = ["りんご"];
fruits1 = ["みかん"];  // OK
fruits1[0] = "ぶどう";  // OK

// const: 配列全体の再代入は不可、要素の変更は可能
const fruits2 = ["りんご"];
// fruits2 = ["みかん"];  // エラー！
fruits2[0] = "ぶどう";  // OK
```

## 存在しないインデックスへの代入

存在しないインデックスに値を代入すると、配列が拡張されます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits.length);  // 3

fruits[5] = "メロン";
console.log(fruits);  // ["りんご", "みかん", "ぶどう", undefined, undefined, "メロン"]
console.log(fruits.length);  // 6
```

**注意**：
- インデックス3と4には何も代入されていないため、`undefined`になります
- 配列の長さは6に拡張されます
- 通常はこのような使い方は避けるべきです

## 実践例：配列編集機

HTMLとJavaScriptを組み合わせて、配列の要素を変更してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>配列編集機</title>
</head>
<body>
    <h1>配列の要素を変更</h1>
    <p>現在の配列: <span id="display"></span></p>

    <input type="number" id="index" placeholder="インデックス" min="0">
    <input type="text" id="value" placeholder="新しい値">
    <button id="change">変更</button>
    <button id="doubleAll">すべて2倍</button>

    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let changeButton = document.getElementById("change");
let doubleButton = document.getElementById("doubleAll");
let display = document.getElementById("display");
let result = document.getElementById("result");
let indexInput = document.getElementById("index");
let valueInput = document.getElementById("value");

// 数値の配列
let numbers = [10, 20, 30, 40, 50];

// 配列を表示
function showArray() {
  display.textContent = "[" + numbers.join(", ") + "]";
}

// 初期表示
showArray();

// 特定の要素を変更
changeButton.addEventListener("click", function() {
  let index = Number(indexInput.value);
  let value = Number(valueInput.value);

  if (index >= 0 && index < numbers.length) {
    numbers[index] = value;
    showArray();
    result.textContent = "インデックス " + index + " を " + value + " に変更しました";
  } else {
    result.textContent = "インデックスが範囲外です（0〜" + (numbers.length - 1) + "）";
  }
});

// すべての要素を2倍にする
doubleButton.addEventListener("click", function() {
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[i] * 2;
  }
  showArray();
  result.textContent = "すべての要素を2倍にしました";
});
```

### コードの詳しい説明

**配列の表示**
```javascript
function showArray() {
  display.textContent = "[" + numbers.join(", ") + "]";
}
```
- `numbers.join(", ")`: 配列を文字列に変換
- 角かっこで囲んで配列らしく表示

**特定の要素を変更**
```javascript
let index = Number(indexInput.value);
let value = Number(valueInput.value);

if (index >= 0 && index < numbers.length) {
  numbers[index] = value;
  showArray();
}
```
- 入力されたインデックスと値を数値に変換
- 範囲チェック：`0 <= index < numbers.length`
- `numbers[index] = value`: 要素を変更
- `showArray()`: 更新された配列を表示

**すべての要素を2倍**
```javascript
for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2;
}
```
- for文で全要素をループ
- `numbers[i] * 2`: 現在の値を2倍
- `numbers[i] = ...`: 新しい値を代入

## 実用的な例

### 例1：価格の更新

```javascript
let prices = [100, 200, 300, 400, 500];

// 10%値上げ
for (let i = 0; i < prices.length; i++) {
  prices[i] = Math.floor(prices[i] * 1.1);
}

console.log(prices);  // [110, 220, 330, 440, 550]
```

### 例2：名前の修正

```javascript
let names = ["太郎", "次郎", "三郎"];

// 敬称をつける
for (let i = 0; i < names.length; i++) {
  names[i] = names[i] + "さん";
}

console.log(names);  // ["太郎さん", "次郎さん", "三郎さん"]
```

### 例3：点数の補正

```javascript
let scores = [85, 92, 78, 95, 88];

// 80点未満を80点に補正
for (let i = 0; i < scores.length; i++) {
  if (scores[i] < 80) {
    scores[i] = 80;
  }
}

console.log(scores);  // [85, 92, 80, 95, 88]
```

## 注意点

### 1. インデックスの範囲チェック

範囲外のインデックスにアクセスしないように注意しましょう。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 範囲チェックなし（危険）
let index = 10;
fruits[index] = "メロン";  // 配列が意図せず拡張される

// 範囲チェックあり（安全）
if (index >= 0 && index < fruits.length) {
  fruits[index] = "メロン";
} else {
  console.log("インデックスが範囲外です");
}
```

### 2. 配列の長さは変わらない

要素を変更しても、配列の長さは変わりません。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits.length);  // 3

fruits[0] = "メロン";
console.log(fruits.length);  // 3（変わらない）
```

### 3. 元の値は消える

要素を変更すると、元の値は失われます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let original = fruits[0];  // "りんご"を保存

fruits[0] = "メロン";
// "りんご"は失われた

console.log(original);  // "りんご"（保存していた値）
console.log(fruits[0]);  // "メロン"（新しい値）
```

## 練習問題

### 課題：配列編集機

配列の要素を変更するプログラムを作成してください。

### 保存場所

`exercises/lesson-088/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. 配列の要素を変更する方法を理解する
2. インデックスを指定して要素を書き換える
3. すべての要素を変更する機能を実装する

### 要件

- 配列の表示（id="display"）
- インデックス入力欄（id="index"）
- 新しい値入力欄（id="value"）
- 変更ボタン（id="change"）
- すべて2倍ボタン（id="doubleAll"）
- 結果表示エリア（id="result"）

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-088
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

要素を変更する際のポイントを確認しましょう。

**要素の変更**
- `配列名[インデックス] = 新しい値`で変更します
- インデックスは0から始まります
- 範囲チェックを忘れずに

**すべての要素を変更**
- for文を使います
- `numbers[i] = numbers[i] * 2`のように現在の値を使って計算します

**入力値の取得**
- `Number()`で文字列を数値に変換します
- `indexInput.value`で入力値を取得します

### 解答例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 088</title>
</head>
<body>
    <h1>配列の要素を変更</h1>
    <p>現在の配列: <span id="display"></span></p>

    <input type="number" id="index" placeholder="インデックス" min="0">
    <input type="text" id="value" placeholder="新しい値">
    <button id="change">変更</button>
    <button id="doubleAll">すべて2倍</button>

    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let changeButton = document.getElementById("change");
let doubleButton = document.getElementById("doubleAll");
let display = document.getElementById("display");
let result = document.getElementById("result");
let indexInput = document.getElementById("index");
let valueInput = document.getElementById("value");

// 数値の配列
let numbers = [10, 20, 30, 40, 50];

// 配列を表示
function showArray() {
  display.textContent = "[" + numbers.join(", ") + "]";
}

// 初期表示
showArray();

// 特定の要素を変更
changeButton.addEventListener("click", function() {
  let index = Number(indexInput.value);
  let value = Number(valueInput.value);

  if (index >= 0 && index < numbers.length) {
    numbers[index] = value;
    showArray();
    result.textContent = "インデックス " + index + " を " + value + " に変更しました";
  } else {
    result.textContent = "インデックスが範囲外です（0〜" + (numbers.length - 1) + "）";
  }
});

// すべての要素を2倍にする
doubleButton.addEventListener("click", function() {
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[i] * 2;
  }
  showArray();
  result.textContent = "すべての要素を2倍にしました";
});
```

### 解説

このコードでは、配列の要素を変更する方法を実践しています。

**配列の初期化と表示**
```javascript
let numbers = [10, 20, 30, 40, 50];

function showArray() {
  display.textContent = "[" + numbers.join(", ") + "]";
}
```
- 数値の配列を作成
- `showArray()`関数で配列を見やすく表示

**特定の要素を変更**
```javascript
let index = Number(indexInput.value);
let value = Number(valueInput.value);

if (index >= 0 && index < numbers.length) {
  numbers[index] = value;
  showArray();
}
```
- 入力値を数値に変換
- 範囲チェック：`0 <= index < numbers.length`
- `numbers[index] = value`で要素を変更
- `showArray()`で更新後の配列を表示

**すべての要素を2倍**
```javascript
for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2;
}
```
- for文で全要素をループ
- `numbers[i] * 2`で現在の値を2倍
- 結果を同じ位置に代入

**動作の流れ**
1. ユーザーがインデックスと値を入力
2. 「変更」ボタンをクリック
3. 範囲チェック
4. 要素を変更
5. 更新された配列を表示

## まとめ

お疲れ様でした。今回のレッスンでは、配列の要素を変更する方法を学びました。

**今回学んだキーポイント**

- **要素の変更**：`配列名[インデックス] = 新しい値`の形式で、特定の要素を書き換えられます
- **配列の可変性**：JavaScriptの配列は可変（mutable）で、作成後も要素を変更できます
- **複数の要素を変更**：for文を使って、複数の要素を一度に変更できます。条件付きの変更も可能です
- **constと要素変更**：`const`で宣言した配列でも、要素の変更は可能です。ただし、配列全体の再代入はできません

配列の要素を変更できることで、データを動的に更新できるようになります。これは、実用的なプログラムを作る上で非常に重要な機能です。

次のレッスンでは、配列に新しい要素を追加する方法を学びます。`push()`メソッドを使って、配列の末尾に要素を追加する方法を習得しましょう。
