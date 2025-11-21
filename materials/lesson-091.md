---
title: "Lesson 091: 配列の長さ"
author: "JavaScript学習教材"
date: "2025-01-21"
---

# レッスン91：配列の長さ

## 今回の学習

### 前回の復習

前回のレッスンでは、配列から要素を削除する方法を学びました。

- **pop()メソッド**：配列の末尾の要素を削除し、その値を返します
- **shift()メソッド**：配列の先頭の要素を削除し、その値を返します
- **戻り値の活用**：削除した要素は戻り値として返されるため、変数に保存して活用できます
- **成果物**：リスト削除機 - 配列から要素を削除するプログラムを作成しました

### 今回の目標

今回のレッスンでは、配列の長さについて詳しく学びます。

- `length`プロパティの使い方を理解する
- 要素数をカウントする方法を学ぶ
- 空配列の判定方法を習得する

## lengthプロパティ

**lengthプロパティ**は、配列の要素数を返すプロパティです。これまでのレッスンでも何度か使ってきましたが、今回はより詳しく学びます。

### 基本的な使い方

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits.length);  // 3
```

**構文**：
```javascript
配列名.length
```

### lengthは常に最新

配列に要素を追加したり削除したりすると、`length`は自動的に更新されます。

```javascript
let fruits = ["りんご"];
console.log(fruits.length);  // 1

fruits.push("みかん");
console.log(fruits.length);  // 2

fruits.push("ぶどう");
console.log(fruits.length);  // 3

fruits.pop();
console.log(fruits.length);  // 2
```

配列の操作に応じて、`length`は常に正確な要素数を示します。

## 要素数のカウント

`length`プロパティを使って、配列の要素数を確認できます。

### 基本的なカウント

```javascript
let numbers = [1, 2, 3, 4, 5];
console.log("要素数: " + numbers.length);  // "要素数: 5"
```

### 動的なカウント

```javascript
let todos = [];
console.log("タスク数: " + todos.length);  // 0

todos.push("買い物");
todos.push("掃除");
todos.push("洗濯");
console.log("タスク数: " + todos.length);  // 3
```

### 複数の配列の比較

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let vegetables = ["にんじん", "たまねぎ"];

if (fruits.length > vegetables.length) {
  console.log("フルーツの方が多いです");
} else {
  console.log("野菜の方が多いです");
}
```

## 空配列の判定

`length`プロパティを使って、配列が空かどうかを判定できます。

### 基本的な判定

```javascript
let fruits = [];

if (fruits.length === 0) {
  console.log("配列は空です");
} else {
  console.log("配列には " + fruits.length + " 個の要素があります");
}
```

### より簡潔な書き方

```javascript
let fruits = [];

if (fruits.length) {
  console.log("配列には要素があります");
} else {
  console.log("配列は空です");
}
```

**説明**：
- `fruits.length`が0の場合、falseと評価される
- `fruits.length`が0以外の場合、trueと評価される

### 実用例：削除前のチェック

```javascript
let fruits = ["りんご", "みかん"];

if (fruits.length > 0) {
  fruits.pop();
  console.log("要素を削除しました");
} else {
  console.log("配列は既に空です");
}
```

## lengthとインデックスの関係

配列の長さと最後のインデックスには、重要な関係があります。

### 最後のインデックス

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

console.log("長さ: " + fruits.length);  // 3
console.log("最後のインデックス: " + (fruits.length - 1));  // 2
console.log("最後の要素: " + fruits[fruits.length - 1]);  // "ぶどう"
```

**重要な公式**：
```
最後のインデックス = length - 1
```

### なぜ -1 が必要か

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// インデックスは0, 1, 2
// 長さは3
// 最後のインデックスは2（3 - 1）

console.log(fruits[0]);  // "りんご"
console.log(fruits[1]);  // "みかん"
console.log(fruits[2]);  // "ぶどう"
console.log(fruits[3]);  // undefined（存在しない）
```

インデックスは0から始まるため、長さから1を引いた値が最後のインデックスになります。

## lengthの活用例

### 例1：平均値の計算

```javascript
let scores = [85, 92, 78, 95, 88];
let total = 0;

for (let i = 0; i < scores.length; i++) {
  total = total + scores[i];
}

let average = total / scores.length;
console.log("平均点: " + average);  // "平均点: 87.6"
```

### 例2：条件による処理分岐

```javascript
let items = ["りんご", "みかん", "ぶどう"];

if (items.length < 5) {
  console.log("在庫が少なくなっています");
} else if (items.length >= 10) {
  console.log("在庫は十分です");
} else {
  console.log("在庫は適正です");
}
```

### 例3：ループの制御

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// 最初の3つだけを表示
let limit = Math.min(3, fruits.length);

for (let i = 0; i < limit; i++) {
  console.log(fruits[i]);
}
```

**出力**：
```
りんご
みかん
ぶどう
```

## lengthを変更する

`length`プロパティは書き込み可能で、値を変更できます。

### 配列を短くする

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
console.log(fruits);  // ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]

fruits.length = 3;
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]
```

`length`を小さくすると、配列の末尾が切り捨てられます。

### 配列を空にする

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]

fruits.length = 0;
console.log(fruits);  // []
```

`length`を0にすると、配列が空になります。

### 配列を拡張する（推奨されません）

```javascript
let fruits = ["りんご", "みかん"];
console.log(fruits);  // ["りんご", "みかん"]

fruits.length = 5;
console.log(fruits);  // ["りんご", "みかん", undefined, undefined, undefined]
```

`length`を大きくすると、`undefined`で埋められます。通常、この使い方は避けるべきです。

## 実践例：配列カウンター

HTMLとJavaScriptを組み合わせて、配列の長さを活用してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>配列カウンター</title>
</head>
<body>
    <h1>配列の長さを確認</h1>
    <p>現在のリスト: <span id="display"></span></p>

    <input type="text" id="newItem" placeholder="アイテム名">
    <button id="add">追加</button>
    <button id="remove">削除</button>
    <button id="clear">全削除</button>

    <div id="info">
        <p>要素数: <span id="count"></span></p>
        <p>状態: <span id="status"></span></p>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let addButton = document.getElementById("add");
let removeButton = document.getElementById("remove");
let clearButton = document.getElementById("clear");
let display = document.getElementById("display");
let count = document.getElementById("count");
let status = document.getElementById("status");
let newItemInput = document.getElementById("newItem");

// アイテムの配列
let items = ["りんご", "みかん", "ぶどう"];

// 配列を表示
function showArray() {
  display.textContent = items.join(", ");
  count.textContent = items.length;

  // 状態を表示
  if (items.length === 0) {
    status.textContent = "空です";
  } else if (items.length < 3) {
    status.textContent = "少ないです";
  } else if (items.length >= 10) {
    status.textContent = "たくさんあります";
  } else {
    status.textContent = "普通です";
  }
}

// 初期表示
showArray();

// 追加
addButton.addEventListener("click", function() {
  let newItem = newItemInput.value;

  if (newItem) {
    items.push(newItem);
    showArray();
    newItemInput.value = "";
  }
});

// 削除
removeButton.addEventListener("click", function() {
  if (items.length > 0) {
    items.pop();
    showArray();
  }
});

// 全削除
clearButton.addEventListener("click", function() {
  items.length = 0;  // lengthを0にして配列を空にする
  showArray();
});
```

### コードの詳しい説明

**配列の表示と状態判定**
```javascript
function showArray() {
  display.textContent = items.join(", ");
  count.textContent = items.length;

  if (items.length === 0) {
    status.textContent = "空です";
  } else if (items.length < 3) {
    status.textContent = "少ないです";
  } else if (items.length >= 10) {
    status.textContent = "たくさんあります";
  } else {
    status.textContent = "普通です";
  }
}
```
- `items.length`を使って要素数を表示
- 要素数に応じて状態を判定

**削除の安全性チェック**
```javascript
if (items.length > 0) {
  items.pop();
  showArray();
}
```
- `items.length > 0`で空でないかチェック
- 空の配列で`pop()`を呼ばないようにする

**配列を空にする**
```javascript
items.length = 0;
```
- `length`を0にして配列を空にする
- すべての要素を一度に削除

## lengthの特徴

### 1. プロパティであり、メソッドではない

```javascript
// 正しい
console.log(fruits.length);

// 間違い（メソッドではない）
console.log(fruits.length());  // エラー！
```

`length`は関数ではないため、括弧`()`をつけません。

### 2. 常に整数

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(typeof fruits.length);  // "number"
console.log(fruits.length);  // 3（整数）
```

`length`は常に0以上の整数です。

### 3. 読み取りと書き込みが可能

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 読み取り
console.log(fruits.length);  // 3

// 書き込み
fruits.length = 2;
console.log(fruits);  // ["りんご", "みかん"]
```

## 実用的な例

### 例1：最大値の検索

```javascript
let numbers = [12, 45, 23, 67, 34];
let max = numbers[0];

for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > max) {
    max = numbers[i];
  }
}

console.log("最大値: " + max);  // 67
```

### 例2：配列のコピー

```javascript
let original = ["りんご", "みかん", "ぶどう"];
let copy = [];

for (let i = 0; i < original.length; i++) {
  copy.push(original[i]);
}

console.log(copy);  // ["りんご", "みかん", "ぶどう"]
```

### 例3：逆順の配列を作成

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let reversed = [];

for (let i = fruits.length - 1; i >= 0; i--) {
  reversed.push(fruits[i]);
}

console.log(reversed);  // ["ぶどう", "みかん", "りんご"]
```

## 注意点

### 1. 疎な配列に注意

```javascript
let arr = [];
arr[0] = "A";
arr[5] = "B";

console.log(arr.length);  // 6（実際の要素は2つだけ）
console.log(arr);  // ["A", undefined, undefined, undefined, undefined, "B"]
```

インデックスに穴がある配列（疎な配列）では、`length`は最大のインデックス+1になります。

### 2. lengthを小さくすると要素が失われる

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
fruits.length = 2;

console.log(fruits);  // ["りんご", "みかん"]
// "ぶどう", "バナナ", "メロン"は永久に失われた
```

`length`を小さくすると、削除された要素は復元できません。

## 練習問題

### 課題：配列カウンター

配列の長さを活用して、要素数を表示し、状態を判定するプログラムを作成してください。

### 保存場所

`exercises/lesson-091/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. `length`プロパティで要素数を表示する
2. 要素数に応じて状態を判定する
3. 空配列の判定を実装する

### 要件

- 配列の表示（id="display"）
- 要素数の表示（id="count"）
- 状態の表示（id="status"）
- 追加ボタン（id="add"）
- 削除ボタン（id="remove"）
- 全削除ボタン（id="clear"）
- 入力欄（id="newItem"）

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-091
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

lengthプロパティを活用する際のポイントを確認しましょう。

**lengthの使い方**
- `配列名.length`で要素数を取得します
- 括弧`()`はつけません（プロパティです）
- 常に最新の要素数を返します

**空配列の判定**
- `if (配列名.length === 0)`で空かどうかを判定します
- `if (配列名.length)`で要素があるかどうかを判定します

**状態の判定**
- if文で`length`の値を比較します
- 複数の条件を組み合わせて状態を判定します

### 解答例

解答は上記の実践例を参照してください。

## まとめ

お疲れ様でした。今回のレッスンでは、配列の長さについて詳しく学びました。

**今回学んだキーポイント**

- **lengthプロパティ**：`配列名.length`で配列の要素数を取得できます。メソッドではなくプロパティなので、括弧`()`はつけません
- **要素数のカウント**：`length`は配列の操作に応じて自動的に更新され、常に最新の要素数を示します
- **空配列の判定**：`length === 0`または`!length`で配列が空かどうかを判定できます
- **lengthの書き込み**：`length`プロパティは書き込み可能で、値を変更すると配列のサイズが変わります

`length`プロパティは、配列操作において最も頻繁に使用されるプロパティの1つです。ループの制御、条件分岐、配列の状態確認など、さまざまな場面で活用されます。

次のレッスンでは、for文を使った配列処理について学びます。配列のすべての要素を順番に処理する方法を習得しましょう。
