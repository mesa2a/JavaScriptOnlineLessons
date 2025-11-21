---
title: "Lesson 087: 要素にアクセス"
author: "JavaScript学習教材"
date: "2025-01-21"
---

# レッスン87：要素にアクセス

## 今回の学習

### 前回の復習

前回のレッスンでは、配列の基本について学びました。

- **配列とは**：複数の値をひとつの変数にまとめて保存できるデータ構造です
- **配列の作成**：角かっこ `[]` を使って、`let fruits = ["りんご", "みかん", "ぶどう"]` のように作成します
- **配列の長さ**：`.length`プロパティで要素の数を取得できます
- **成果物**：フルーツリスト - 配列を作成し、画面に表示しました

### 今回の目標

今回のレッスンでは、配列の要素にアクセスする方法を学びます。

- インデックスを使って特定の要素を取得する
- 最初の要素、最後の要素にアクセスする
- 0ベースインデックスを理解する

## インデックスとは

**インデックス（index）**は、配列内の要素の位置を示す番号です。

### 重要な特徴：0から始まる

JavaScriptの配列では、インデックスは**0から始まります**。これを**0ベースインデックス**と呼びます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
//            インデックス0  インデックス1  インデックス2
```

**インデックスと要素の対応**：
```
インデックス:  0        1        2
値:         "りんご"  "みかん"  "ぶどう"
```

### 日常生活での例え

配列のインデックスは、アパートの部屋番号に似ています。

```
部屋0号室: りんご
部屋1号室: みかん
部屋2号室: ぶどう
```

日本では「1号室」から始まることが多いですが、プログラミングの世界では「0号室」から始まります。

## 要素へのアクセス方法

配列の要素にアクセスするには、角かっこ `[]` の中にインデックスを書きます。

### 基本的な構文

```javascript
配列名[インデックス]
```

### 最初の要素を取得

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let first = fruits[0];
console.log(first);  // "りんご"
```

**説明**：
- `fruits[0]`: インデックス0の要素を取得
- 結果: "りんご"

### 2番目の要素を取得

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let second = fruits[1];
console.log(second);  // "みかん"
```

**注意**：2番目の要素はインデックス1です（1ではなく0から数えるため）。

### 3番目の要素を取得

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let third = fruits[2];
console.log(third);  // "ぶどう"
```

## すべての要素にアクセス

配列のすべての要素を順番に取得してみましょう。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

console.log(fruits[0]);  // "りんご"
console.log(fruits[1]);  // "みかん"
console.log(fruits[2]);  // "ぶどう"
```

## 最後の要素を取得

配列の最後の要素を取得するには、配列の長さを使います。

### lengthを使った方法

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let last = fruits[fruits.length - 1];
console.log(last);  // "ぶどう"
```

**詳しい説明**：
- `fruits.length`: 配列の長さ（3）
- `fruits.length - 1`: 3 - 1 = 2（最後のインデックス）
- `fruits[2]`: "ぶどう"

### なぜ -1 が必要か

配列の長さが3の場合：
```
インデックス: 0, 1, 2
長さ: 3
```

インデックスは0から始まるので、最後のインデックスは「長さ - 1」になります。

```javascript
// 長さが3の配列
let fruits = ["りんご", "みかん", "ぶどう"];

// 間違い：インデックス3は存在しない
console.log(fruits[3]);  // undefined

// 正しい：最後はインデックス2
console.log(fruits[2]);  // "ぶどう"

// 正しい：length - 1を使う
console.log(fruits[fruits.length - 1]);  // "ぶどう"
```

## 範囲外のインデックス

存在しないインデックスにアクセスすると、`undefined`が返されます。

### 例：範囲外アクセス

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

console.log(fruits[0]);   // "りんご"（存在する）
console.log(fruits[1]);   // "みかん"（存在する）
console.log(fruits[2]);   // "ぶどう"（存在する）
console.log(fruits[3]);   // undefined（存在しない）
console.log(fruits[10]);  // undefined（存在しない）
```

**重要**：エラーにはなりませんが、`undefined`という値が返されます。

### undefinedとは

`undefined`は、「値が定義されていない」ことを表す特別な値です。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let result = fruits[10];

if (result === undefined) {
  console.log("その要素は存在しません");
}
```

## 負のインデックス

JavaScriptでは、負のインデックスは特別な意味を持ちません（一部の言語とは異なります）。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits[-1]);  // undefined（JavaScriptでは使えない）
```

**注意**：Pythonなど一部の言語では、`-1`で最後の要素を取得できますが、JavaScriptでは`undefined`になります。

JavaScriptで最後の要素を取得するには、`fruits[fruits.length - 1]`を使います。

## ループで要素にアクセス

for文と組み合わせて、すべての要素に順番にアクセスできます。

### 基本的なパターン

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

for (let i = 0; i < fruits.length; i++) {
  console.log("インデックス " + i + ": " + fruits[i]);
}
```

**出力**：
```
インデックス 0: りんご
インデックス 1: みかん
インデックス 2: ぶどう
```

**詳しい説明**：
- `i = 0`: 最初のインデックス（0）から始まる
- `i < fruits.length`: 配列の長さ（3）未満まで繰り返す
- `fruits[i]`: i番目の要素を取得

### ループの詳細な動き

```javascript
// 1回目のループ: i = 0
fruits[0]  // "りんご"

// 2回目のループ: i = 1
fruits[1]  // "みかん"

// 3回目のループ: i = 2
fruits[2]  // "ぶどう"

// 4回目はなし: i = 3 は fruits.length (3) 以上なので終了
```

## 実践例：要素取得マスター

HTMLとJavaScriptを組み合わせて、配列の要素にアクセスしてみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>要素取得マスター</title>
</head>
<body>
    <h1>配列の要素にアクセス</h1>
    <button id="showFirst">最初の要素</button>
    <button id="showLast">最後の要素</button>
    <button id="showAll">すべての要素</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let firstButton = document.getElementById("showFirst");
let lastButton = document.getElementById("showLast");
let allButton = document.getElementById("showAll");
let result = document.getElementById("result");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// 最初の要素を表示
firstButton.addEventListener("click", function() {
  result.textContent = "最初の要素: " + fruits[0];
});

// 最後の要素を表示
lastButton.addEventListener("click", function() {
  let lastIndex = fruits.length - 1;
  result.textContent = "最後の要素: " + fruits[lastIndex];
});

// すべての要素を表示
allButton.addEventListener("click", function() {
  result.innerHTML = "";  // クリア

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = "インデックス " + i + ": " + fruits[i];
    result.appendChild(p);
  }
});
```

### コードの詳しい説明

**最初の要素の取得**
```javascript
result.textContent = "最初の要素: " + fruits[0];
```
- `fruits[0]`: インデックス0の要素（"りんご"）
- 直接インデックス0を指定

**最後の要素の取得**
```javascript
let lastIndex = fruits.length - 1;
result.textContent = "最後の要素: " + fruits[lastIndex];
```
- `fruits.length - 1`: 配列の長さから1を引いて最後のインデックスを計算
- 配列の長さが変わっても対応できる

**すべての要素の表示**
```javascript
for (let i = 0; i < fruits.length; i++) {
  let p = document.createElement("p");
  p.textContent = "インデックス " + i + ": " + fruits[i];
  result.appendChild(p);
}
```
- for文で0から配列の長さ-1まで繰り返す
- 各ループで`fruits[i]`にアクセス
- インデックスと値を両方表示

## 特定の位置の要素を取得

配列の途中の要素も簡単に取得できます。

```javascript
let numbers = [10, 20, 30, 40, 50];

// 3番目の要素（インデックス2）
console.log(numbers[2]);  // 30

// 4番目の要素（インデックス3）
console.log(numbers[3]);  // 40
```

## インデックスの計算

インデックスは計算式でも指定できます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// 真ん中の要素を取得
let middleIndex = Math.floor(fruits.length / 2);
console.log(fruits[middleIndex]);  // "ぶどう"

// 最後から2番目
let secondLast = fruits.length - 2;
console.log(fruits[secondLast]);  // "バナナ"
```

**Math.floor()の説明**：
- `Math.floor()`は小数点以下を切り捨てる関数
- `fruits.length / 2`: 5 / 2 = 2.5
- `Math.floor(2.5)`: 2
- `fruits[2]`: "ぶどう"

## 境界値の注意

配列の範囲内でアクセスすることが重要です。

### 安全なアクセス

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 範囲内のアクセス
if (0 <= 2 && 2 < fruits.length) {
  console.log(fruits[2]);  // "ぶどう"
}
```

### エラーを避ける方法

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let index = 5;

// アクセス前にチェック
if (index >= 0 && index < fruits.length) {
  console.log(fruits[index]);
} else {
  console.log("インデックスが範囲外です");
}
```

## 実用的な例

### 例1：成績の管理

```javascript
let scores = [85, 92, 78, 95, 88];

console.log("1回目のテスト: " + scores[0] + "点");
console.log("最新のテスト: " + scores[scores.length - 1] + "点");
```

### 例2：曜日の取得

```javascript
let weekdays = ["月", "火", "水", "木", "金"];
let today = 2;  // 水曜日（インデックス2）

console.log("今日は" + weekdays[today] + "曜日です");
```

### 例3：ランキングの表示

```javascript
let ranking = ["田中", "佐藤", "鈴木", "山田", "高橋"];

console.log("1位: " + ranking[0]);
console.log("2位: " + ranking[1]);
console.log("3位: " + ranking[2]);
```

## 練習問題

### 課題：要素取得マスター

配列の要素にアクセスする方法を理解し、最初の要素、最後の要素、すべての要素を表示するプログラムを作成してください。

### 保存場所

`exercises/lesson-087/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. インデックスを使って要素にアクセスする
2. 最初の要素と最後の要素を取得する
3. すべての要素を表示する

### 要件

- 3つのボタン（最初の要素、最後の要素、すべての要素）
- 配列には少なくとも3つの要素を含める
- 最後の要素は`fruits.length - 1`を使って取得

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-087
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

要素にアクセスする際のポイントを確認しましょう。

**インデックスの使い方**
- `配列名[インデックス]`で要素を取得します
- 最初の要素は`配列名[0]`です
- インデックスは0から始まります

**最後の要素**
- `配列名[配列名.length - 1]`で取得します
- 長さから1を引くことを忘れないでください

**すべての要素**
- for文を使って`i = 0`から`i < 配列名.length`まで繰り返します
- 各ループで`配列名[i]`にアクセスします

### 解答例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 087</title>
</head>
<body>
    <h1>配列の要素にアクセス</h1>
    <button id="showFirst">最初の要素</button>
    <button id="showLast">最後の要素</button>
    <button id="showAll">すべての要素</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let firstButton = document.getElementById("showFirst");
let lastButton = document.getElementById("showLast");
let allButton = document.getElementById("showAll");
let result = document.getElementById("result");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう"];

// 最初の要素を表示
firstButton.addEventListener("click", function() {
  result.textContent = "最初の要素: " + fruits[0];
});

// 最後の要素を表示
lastButton.addEventListener("click", function() {
  result.textContent = "最後の要素: " + fruits[fruits.length - 1];
});

// すべての要素を表示
allButton.addEventListener("click", function() {
  result.innerHTML = "";  // クリア

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = "インデックス " + i + ": " + fruits[i];
    result.appendChild(p);
  }
});
```

### 解説

このコードでは、配列の要素へのアクセス方法を実践しています。

**最初の要素の取得**
```javascript
result.textContent = "最初の要素: " + fruits[0];
```
- `fruits[0]`: 配列の最初の要素（インデックス0）
- 結果: "りんご"

**最後の要素の取得**
```javascript
result.textContent = "最後の要素: " + fruits[fruits.length - 1];
```
- `fruits.length`: 配列の長さ（3）
- `fruits.length - 1`: 最後のインデックス（2）
- `fruits[2]`: "ぶどう"

**すべての要素の表示**
```javascript
for (let i = 0; i < fruits.length; i++) {
  let p = document.createElement("p");
  p.textContent = "インデックス " + i + ": " + fruits[i];
  result.appendChild(p);
}
```
- for文で配列の全要素をループ
- `i = 0`から`i < fruits.length`（i < 3）まで
- 各ループで`fruits[i]`にアクセスして表示

**動作の流れ**
1. ボタンをクリック
2. 対応するイベントハンドラーが実行される
3. 配列の要素にアクセス
4. 結果を画面に表示

## まとめ

お疲れ様でした。今回のレッスンでは、配列の要素にアクセスする方法を学びました。

**今回学んだキーポイント**

- **インデックスでアクセス**：`配列名[インデックス]`の形式で、特定の要素を取得できます
- **0ベースインデックス**：配列のインデックスは0から始まります。最初の要素は`配列名[0]`、2番目は`配列名[1]`です
- **最後の要素**：`配列名[配列名.length - 1]`で最後の要素を取得できます。長さから1を引くことが重要です
- **範囲外アクセス**：存在しないインデックスにアクセスすると`undefined`が返されます。エラーにはなりませんが、注意が必要です

インデックスを使った要素へのアクセスは、配列操作の基本中の基本です。この知識は、今後のすべての配列操作で使われます。

次のレッスンでは、配列の要素を変更する方法を学びます。インデックスを使って、既存の要素を新しい値に書き換える方法を習得しましょう。
