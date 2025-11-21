---
title: "Lesson 093: 配列の検索"
author: "JavaScript学習教材"
date: "2025-01-21"
---

# レッスン93：配列の検索

## 今回の学習

### 前回の復習

前回のレッスンでは、`for...of`文について学びました。

- **for...of文**：`for (let 要素 of 配列名)`の形式で、配列の各要素に直接アクセスできます
- **シンプルさ**：インデックスが不要な場合、`for...of`の方がコードがシンプルになります
- **使い分け**：インデックスが必要なら通常の`for`、不要なら`for...of`を選びます
- **成果物**：ループ比較デモ - 両方のループの特徴を比較するプログラムを作成しました

### 今回の目標

今回のレッスンでは、配列から特定の要素を検索する方法を学びます。

- 配列から特定の要素を探す方法を理解する
- 見つかった場合の処理を実装する
- `indexOf()`メソッドの基礎を学ぶ

## 線形探索

**線形探索（リニアサーチ）**は、配列の先頭から順番に要素を調べていく最も基本的な検索方法です。

### 基本的なパターン

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
let target = "ぶどう";
let found = false;

for (let i = 0; i < fruits.length; i++) {
  if (fruits[i] === target) {
    found = true;
    console.log("見つかりました！");
    break;  // 見つかったらループを抜ける
  }
}

if (!found) {
  console.log("見つかりませんでした");
}
```

### 詳しい説明

```javascript
for (let i = 0; i < fruits.length; i++) {
  if (fruits[i] === target) {
    found = true;
    break;
  }
}
```

**ポイント**：
- `fruits[i] === target`: 現在の要素が探している値と一致するかチェック
- `found = true`: 見つかったフラグを立てる
- `break`: 見つかったらループを終了（効率化）

## インデックスを取得

要素が見つかった位置（インデックス）を取得する方法です。

### 基本的な実装

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
let target = "ぶどう";
let index = -1;  // 見つからない場合は-1

for (let i = 0; i < fruits.length; i++) {
  if (fruits[i] === target) {
    index = i;
    break;
  }
}

if (index !== -1) {
  console.log("インデックス " + index + " で見つかりました");
} else {
  console.log("見つかりませんでした");
}
```

**出力**：
```
インデックス 2 で見つかりました
```

### なぜ-1を使うのか

```javascript
let index = -1;
```

- 配列のインデックスは0から始まる
- -1は「存在しないインデックス」を表す慣習
- 見つからなかった場合と区別できる

## indexOf()メソッド

JavaScriptには、配列から要素を検索するための`indexOf()`メソッドが用意されています。

### 基本的な使い方

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
let index = fruits.indexOf("ぶどう");

console.log(index);  // 2
```

**構文**：
```javascript
配列名.indexOf(検索する値);
```

### 戻り値

- **見つかった場合**：最初に見つかった要素のインデックス（0以上の整数）
- **見つからなかった場合**：-1

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

console.log(fruits.indexOf("みかん"));  // 1
console.log(fruits.indexOf("メロン"));  // -1（見つからない）
```

### 見つかったかどうかの判定

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let target = "ぶどう";
let index = fruits.indexOf(target);

if (index !== -1) {
  console.log("「" + target + "」はインデックス " + index + " にあります");
} else {
  console.log("「" + target + "」は見つかりませんでした");
}
```

### より簡潔な判定

```javascript
if (fruits.indexOf("ぶどう") !== -1) {
  console.log("ぶどうは配列に含まれています");
}

// または
if (fruits.indexOf("ぶどう") >= 0) {
  console.log("ぶどうは配列に含まれています");
}
```

## includes()メソッド（補足）

要素が存在するかどうかだけを知りたい場合は、`includes()`メソッドが便利です。

### 基本的な使い方

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

console.log(fruits.includes("ぶどう"));  // true
console.log(fruits.includes("メロン"));  // false
```

**構文**：
```javascript
配列名.includes(検索する値);
```

### indexOf()との違い

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// indexOf(): インデックスを返す
let index = fruits.indexOf("ぶどう");
console.log(index);  // 2

// includes(): true/falseを返す
let exists = fruits.includes("ぶどう");
console.log(exists);  // true
```

**使い分け**：
- インデックスが必要 → `indexOf()`
- 存在確認だけ → `includes()`

## 実践例：配列検索機

HTMLとJavaScriptを組み合わせて、配列を検索してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>配列検索機</title>
</head>
<body>
    <h1>フルーツ検索</h1>
    <p>配列: りんご, みかん, ぶどう, バナナ, メロン</p>

    <input type="text" id="searchInput" placeholder="検索するフルーツ">
    <button id="searchButton">検索</button>

    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");
let result = document.getElementById("result");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// 検索処理
searchButton.addEventListener("click", function() {
  let target = searchInput.value;

  if (!target) {
    result.textContent = "検索するフルーツを入力してください";
    return;
  }

  // indexOf()で検索
  let index = fruits.indexOf(target);

  if (index !== -1) {
    result.textContent = "「" + target + "」はインデックス " + index + " で見つかりました！";
  } else {
    result.textContent = "「" + target + "」は見つかりませんでした";
  }
});
```

### コードの詳しい説明

**検索対象の取得**
```javascript
let target = searchInput.value;

if (!target) {
  result.textContent = "検索するフルーツを入力してください";
  return;
}
```
- 入力値を取得
- 空の場合はエラーメッセージを表示して終了

**indexOf()で検索**
```javascript
let index = fruits.indexOf(target);

if (index !== -1) {
  result.textContent = "「" + target + "」はインデックス " + index + " で見つかりました！";
} else {
  result.textContent = "「" + target + "」は見つかりませんでした";
}
```
- `indexOf()`で検索
- -1以外なら見つかった
- インデックスを表示

## for文を使った検索の実装

`indexOf()`を使わずに、for文で検索を実装してみましょう。

### パターン1：見つかったかどうか

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let target = "みかん";
let found = false;

for (let i = 0; i < fruits.length; i++) {
  if (fruits[i] === target) {
    found = true;
    break;
  }
}

console.log(found ? "見つかりました" : "見つかりませんでした");
```

### パターン2：インデックスを取得

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let target = "みかん";
let index = -1;

for (let i = 0; i < fruits.length; i++) {
  if (fruits[i] === target) {
    index = i;
    break;
  }
}

if (index !== -1) {
  console.log("インデックス: " + index);
}
```

### パターン3：すべての一致を検索

```javascript
let numbers = [1, 2, 3, 2, 4, 2, 5];
let target = 2;
let indices = [];

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] === target) {
    indices.push(i);
  }
}

console.log("見つかった位置: " + indices.join(", "));
// "見つかった位置: 1, 3, 5"
```

**注意**：`indexOf()`は最初に見つかった要素のみを返します。すべての一致を探す場合はfor文が必要です。

## 条件付き検索

より複雑な条件で検索することもできます。

### 例1：数値の範囲で検索

```javascript
let numbers = [10, 25, 30, 45, 60, 75];
let threshold = 50;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > threshold) {
    console.log("最初に50を超える値: " + numbers[i]);
    console.log("インデックス: " + i);
    break;
  }
}
```

### 例2：文字列の部分一致

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let keyword = "ん";

for (let i = 0; i < fruits.length; i++) {
  if (fruits[i].includes(keyword)) {
    console.log("「" + keyword + "」を含む: " + fruits[i]);
  }
}
```

**出力**：
```
「ん」を含む: りんご
「ん」を含む: みかん
```

### 例3：オブジェクトの配列を検索

```javascript
let students = [
  {name: "太郎", age: 20},
  {name: "花子", age: 22},
  {name: "次郎", age: 19}
];

let targetName = "花子";

for (let i = 0; i < students.length; i++) {
  if (students[i].name === targetName) {
    console.log("見つかりました: " + students[i].name + " (" + students[i].age + "歳)");
    break;
  }
}
```

## 実用的な例

### 例1：重複チェック

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let newFruit = "みかん";

if (fruits.indexOf(newFruit) !== -1) {
  console.log("「" + newFruit + "」は既に存在します");
} else {
  fruits.push(newFruit);
  console.log("「" + newFruit + "」を追加しました");
}
```

### 例2：要素の削除（検索して削除）

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ"];
let target = "みかん";
let index = fruits.indexOf(target);

if (index !== -1) {
  fruits.splice(index, 1);  // 1つの要素を削除
  console.log("「" + target + "」を削除しました");
  console.log("残り: " + fruits.join(", "));
}
```

**注意**：`splice()`メソッドは次のレッスンで学びます。

### 例3：存在確認後に処理

```javascript
let allowedUsers = ["admin", "user1", "user2"];
let currentUser = "user1";

if (allowedUsers.includes(currentUser)) {
  console.log("アクセス許可");
} else {
  console.log("アクセス拒否");
}
```

## indexOf()の詳細な動作

### 開始位置の指定

`indexOf()`は、検索を開始する位置を指定できます。

```javascript
let numbers = [1, 2, 3, 2, 4, 2, 5];

// 通常の検索（先頭から）
console.log(numbers.indexOf(2));  // 1

// インデックス2から検索開始
console.log(numbers.indexOf(2, 2));  // 3

// インデックス4から検索開始
console.log(numbers.indexOf(2, 4));  // 5
```

**構文**：
```javascript
配列名.indexOf(検索する値, 開始位置);
```

### すべての出現位置を取得

```javascript
let numbers = [1, 2, 3, 2, 4, 2, 5];
let target = 2;
let indices = [];
let startIndex = 0;

while (true) {
  let index = numbers.indexOf(target, startIndex);
  if (index === -1) break;

  indices.push(index);
  startIndex = index + 1;
}

console.log("2が見つかった位置: " + indices.join(", "));
// "2が見つかった位置: 1, 3, 5"
```

## 練習問題

### 課題：配列検索機

配列から特定の要素を検索し、見つかった場合にインデックスを表示するプログラムを作成してください。

### 保存場所

`exercises/lesson-093/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

### 手順

1. `indexOf()`メソッドで要素を検索する
2. 見つかった場合はインデックスを表示する
3. 見つからなかった場合はメッセージを表示する

### 要件

- 検索入力欄（id="searchInput"）
- 検索ボタン（id="searchButton"）
- 結果表示エリア（id="result"）
- `indexOf()`を使って検索する

### テストで確認する

```bash
npm test exercises/lesson-093
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**indexOf()の使い方**
- `配列名.indexOf(検索する値)`
- 見つかった場合：インデックスを返す（0以上）
- 見つからなかった場合：-1を返す

**結果の判定**
- `if (index !== -1)`で見つかったかチェック
- `index >= 0`でも同じ意味

**入力値のチェック**
- `if (!入力値)`で空かどうかをチェック
- 空の場合はエラーメッセージを表示

### 解答例

解答は上記の実践例を参照してください。

## まとめ

お疲れ様でした。今回のレッスンでは、配列の検索について学びました。

**今回学んだキーポイント**

- **線形探索**：配列を先頭から順番に調べる基本的な検索方法です。for文とif文を組み合わせて実装できます
- **indexOf()メソッド**：`配列名.indexOf(検索する値)`で要素を検索し、見つかった位置（インデックス）を返します。見つからない場合は-1を返します
- **includes()メソッド**：要素の存在確認だけならば`includes()`が便利です。true/falseを返します
- **実用的な応用**：重複チェック、要素の削除、存在確認など、様々な場面で検索が使われます

配列の検索は、データ処理において非常に重要な操作です。`indexOf()`や`includes()`を使うことで、効率的に要素を探すことができます。

次のレッスンでは、配列の集計について学びます。合計、平均、最大値・最小値など、配列の数値を集計する方法を習得しましょう。
