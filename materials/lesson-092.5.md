---
title: "Lesson 092.5: for...of文"
author: "JavaScript学習教材"
date: "2025-01-21"
---

# レッスン92.5：for...of文

## 今回の学習

### 前回の復習

前回のレッスンでは、for文を使った配列処理について学びました。

- **配列の巡回**：`for (let i = 0; i < 配列名.length; i++)`のパターンで配列を処理します
- **インデックスアクセス**：ループ変数`i`をインデックスとして使い、`配列名[i]`で各要素を取得します
- **全要素の表示**：for文を使って配列のすべての要素を順番に表示できます
- **成果物**：配列表示機 - 様々な形式で配列を表示するプログラムを作成しました

### 今回の目標

今回のレッスンでは、**for...of文**について学びます。これは、配列を処理するためのより簡潔な方法です。

- `for...of`文の書き方を理解する
- 通常のfor文との違いを学ぶ
- 使い分けの基準を習得する

## for...of文とは

**for...of文**は、配列の各要素を順番に処理するための構文です。ES6（ECMAScript 2015）で追加された比較的新しい機能です。

### 基本的な構文

```javascript
for (let 要素 of 配列名) {
  // 処理
}
```

### シンプルな例

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

for (let fruit of fruits) {
  console.log(fruit);
}
```

**出力**：
```
りんご
みかん
ぶどう
```

### 通常のfor文との比較

**通常のfor文**：
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

**for...of文**：
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

for (let fruit of fruits) {
  console.log(fruit);
}
```

`for...of`文の方がシンプルで読みやすいですね。

## for...of文の特徴

### 1. インデックスが不要

`for...of`文では、インデックス変数（`i`）が不要です。

```javascript
let colors = ["赤", "青", "黄色"];

// 通常のfor文：インデックスが必要
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}

// for...of：インデックス不要
for (let color of colors) {
  console.log(color);
}
```

### 2. 要素に直接アクセス

`配列名[i]`ではなく、直接要素を取得できます。

```javascript
let numbers = [10, 20, 30, 40, 50];

for (let num of numbers) {
  console.log(num);  // 直接値が取得できる
}
```

### 3. シンプルで読みやすい

コードがシンプルになり、意図が明確になります。

```javascript
let names = ["太郎", "花子", "次郎"];

// 「配列namesの各要素nameに対して」と読める
for (let name of names) {
  console.log(name + "さん");
}
```

## 通常のfor文が必要な場合

`for...of`文は便利ですが、すべての場面で使えるわけではありません。

### 1. インデックスが必要な場合

**番号付きリストを作成**：
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 通常のfor文を使う必要がある
for (let i = 0; i < fruits.length; i++) {
  console.log((i + 1) + ". " + fruits[i]);
}
```

**出力**：
```
1. りんご
2. みかん
3. ぶどう
```

`for...of`ではインデックスが取得できないため、番号付きリストを作るには通常のfor文が必要です。

### 2. 配列を変更する場合

**要素を変更**：
```javascript
let numbers = [1, 2, 3, 4, 5];

// 通常のfor文を使う必要がある
for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2;
}

console.log(numbers);  // [2, 4, 6, 8, 10]
```

`for...of`では要素のコピーが取得されるため、配列自体を変更できません。

```javascript
let numbers = [1, 2, 3, 4, 5];

// これは動作しない（元の配列は変更されない）
for (let num of numbers) {
  num = num * 2;  // 変数numを変更しているだけ
}

console.log(numbers);  // [1, 2, 3, 4, 5]（変わらない）
```

### 3. 特定の範囲だけを処理

**最初の3つだけを処理**：
```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// 通常のfor文を使う必要がある
for (let i = 0; i < 3; i++) {
  console.log(fruits[i]);
}
```

`for...of`は配列の全要素を順番に処理するため、途中で止めるのは不自然です。

### 4. 逆順に処理

**末尾から先頭へ**：
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 通常のfor文を使う必要がある
for (let i = fruits.length - 1; i >= 0; i--) {
  console.log(fruits[i]);
}
```

`for...of`は常に先頭から末尾への順番です。

## 使い分けの基準

### for...of文を使うべき場合

✅ **要素の値だけが必要な場合**
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

for (let fruit of fruits) {
  console.log("私は" + fruit + "が好きです");
}
```

✅ **配列を読み取るだけの場合**
```javascript
let scores = [85, 92, 78, 95, 88];
let total = 0;

for (let score of scores) {
  total = total + score;
}

console.log("合計: " + total);
```

✅ **コードをシンプルにしたい場合**
```javascript
let colors = ["赤", "青", "黄色"];

for (let color of colors) {
  console.log(color);
}
```

### 通常のfor文を使うべき場合

✅ **インデックスが必要な場合**
```javascript
for (let i = 0; i < fruits.length; i++) {
  console.log((i + 1) + ". " + fruits[i]);
}
```

✅ **配列を変更する場合**
```javascript
for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2;
}
```

✅ **特定の範囲を処理する場合**
```javascript
for (let i = 0; i < 5; i++) {
  console.log(fruits[i]);
}
```

✅ **逆順に処理する場合**
```javascript
for (let i = fruits.length - 1; i >= 0; i--) {
  console.log(fruits[i]);
}
```

## 実践例：ループ比較デモ

HTMLとJavaScriptを組み合わせて、両方のループを比較してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ループ比較デモ</title>
</head>
<body>
    <h1>for文とfor...of文の比較</h1>

    <h2>for...of文が適している例</h2>
    <button id="forOfExample">シンプルな表示</button>
    <div id="forOfResult"></div>

    <h2>通常のfor文が必要な例</h2>
    <button id="forExample">番号付き表示</button>
    <div id="forResult"></div>

    <h2>合計の計算（両方で可能）</h2>
    <button id="sumForOf">for...ofで合計</button>
    <button id="sumFor">forで合計</button>
    <div id="sumResult"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let forOfButton = document.getElementById("forOfExample");
let forButton = document.getElementById("forExample");
let sumForOfButton = document.getElementById("sumForOf");
let sumForButton = document.getElementById("sumFor");
let forOfResult = document.getElementById("forOfResult");
let forResult = document.getElementById("forResult");
let sumResult = document.getElementById("sumResult");

// データ
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
let scores = [85, 92, 78, 95, 88];

// for...ofでシンプルな表示
forOfButton.addEventListener("click", function() {
  forOfResult.innerHTML = "";

  for (let fruit of fruits) {
    let p = document.createElement("p");
    p.textContent = fruit;
    forOfResult.appendChild(p);
  }
});

// 通常のforで番号付き表示
forButton.addEventListener("click", function() {
  forResult.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = (i + 1) + ". " + fruits[i];
    forResult.appendChild(p);
  }
});

// for...ofで合計
sumForOfButton.addEventListener("click", function() {
  let total = 0;

  for (let score of scores) {
    total = total + score;
  }

  sumResult.textContent = "for...ofで計算した合計: " + total;
});

// 通常のforで合計
sumForButton.addEventListener("click", function() {
  let total = 0;

  for (let i = 0; i < scores.length; i++) {
    total = total + scores[i];
  }

  sumResult.textContent = "通常のforで計算した合計: " + total;
});
```

### コードの詳しい説明

**for...ofでシンプルな表示**
```javascript
for (let fruit of fruits) {
  let p = document.createElement("p");
  p.textContent = fruit;
  forOfResult.appendChild(p);
}
```
- インデックス不要
- 要素に直接アクセス
- コードがシンプル

**通常のforで番号付き表示**
```javascript
for (let i = 0; i < fruits.length; i++) {
  let p = document.createElement("p");
  p.textContent = (i + 1) + ". " + fruits[i];
  forResult.appendChild(p);
}
```
- インデックス`i`を使って番号を表示
- `for...of`では実現できない

**合計の計算（両方で可能）**
```javascript
// for...of版
for (let score of scores) {
  total = total + score;
}

// 通常のfor版
for (let i = 0; i < scores.length; i++) {
  total = total + scores[i];
}
```
- どちらでも実装可能
- `for...of`の方がシンプル

## 実用的な例

### 例1：文字列の配列処理

```javascript
let messages = ["おはよう", "こんにちは", "こんばんは"];

// for...ofが適している
for (let message of messages) {
  console.log(message + "ございます");
}
```

### 例2：データの検証

```javascript
let ages = [20, 25, 17, 30, 15];
let allAdults = true;

// for...ofが適している
for (let age of ages) {
  if (age < 18) {
    allAdults = false;
    break;
  }
}

console.log(allAdults ? "全員成人" : "未成年が含まれる");
```

### 例3：データの変換

```javascript
let celsius = [0, 10, 20, 30, 40];
let fahrenheit = [];

// 通常のforが必要（新しい配列を作成）
for (let i = 0; i < celsius.length; i++) {
  let f = celsius[i] * 9 / 5 + 32;
  fahrenheit.push(f);
}

console.log(fahrenheit);
```

**注意**：`for...of`でも可能ですが、インデックスを使わない方法になります。
```javascript
let celsius = [0, 10, 20, 30, 40];
let fahrenheit = [];

for (let c of celsius) {
  let f = c * 9 / 5 + 32;
  fahrenheit.push(f);
}

console.log(fahrenheit);
```

この場合は`for...of`の方がシンプルです。

## for...ofの制限事項

### 1. 配列専用ではない

`for...of`は配列だけでなく、イテラブル（反復可能）なオブジェクトに使えます。

```javascript
// 文字列も使える
let text = "こんにちは";

for (let char of text) {
  console.log(char);
}
```

**出力**：
```
こ
ん
に
ち
は
```

### 2. 古いブラウザでは動作しない

`for...of`はES6の機能のため、古いブラウザ（IE11以前）では動作しません。

### 3. breakとcontinueは使える

通常のfor文と同じく、`break`と`continue`が使えます。

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let num of numbers) {
  if (num > 5) {
    break;  // 5より大きくなったら終了
  }
  console.log(num);
}
```

## まとめ：どちらを使うべきか

### for...of文を選ぶ場合

- ✅ 要素の値だけが必要
- ✅ 配列を読み取るだけ
- ✅ コードをシンプルにしたい
- ✅ インデックスが不要

### 通常のfor文を選ぶ場合

- ✅ インデックスが必要
- ✅ 配列を変更する
- ✅ 特定の範囲を処理
- ✅ 逆順に処理
- ✅ 複雑なループ制御

**基本方針**：
- インデックスが不要なら`for...of`を使う
- インデックスが必要なら通常の`for`を使う
- 迷ったら、よりシンプルな方を選ぶ

## 練習問題

### 課題：ループ比較デモ

`for`文と`for...of`文の両方を使って、それぞれの特徴を理解するプログラムを作成してください。

### 保存場所

`exercises/lesson-092.5/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

### 要件

- for...of文でシンプルな表示（id="forOfExample"）
- 通常のfor文で番号付き表示（id="forExample"）
- 合計の計算（両方の方法）
- 各結果の表示エリア

### テストで確認する

```bash
npm test exercises/lesson-092.5
```

### ヒント

**for...of文**
- `for (let 要素 of 配列名)`の形式
- 要素に直接アクセスできる
- インデックスは取得できない

**通常のfor文**
- `for (let i = 0; i < 配列名.length; i++)`
- インデックス`i`が使える
- `配列名[i]`で要素にアクセス

## まとめ

お疲れ様でした。今回のレッスンでは、`for...of`文について学びました。

**今回学んだキーポイント**

- **for...of文**：`for (let 要素 of 配列名)`の形式で、配列の各要素に直接アクセスできます
- **シンプルさ**：インデックスが不要な場合、`for...of`の方がコードがシンプルで読みやすくなります
- **使い分け**：インデックスが必要なら通常の`for`、不要なら`for...of`を選びます
- **制限事項**：`for...of`では配列の変更や番号付き表示には向いていません

`for...of`文は、配列を読み取るだけの処理において非常に便利です。しかし、すべての場面で使えるわけではないため、状況に応じて適切なループを選択することが重要です。

次のレッスンでは、配列の検索について学びます。配列から特定の要素を探し出す方法を習得しましょう。
