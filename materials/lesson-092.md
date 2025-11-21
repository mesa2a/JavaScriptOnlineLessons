---
title: "Lesson 092: forで配列処理"
author: "JavaScript学習教材"
date: "2025-01-21"
---

# レッスン92：forで配列処理

## 今回の学習

### 前回の復習

前回のレッスンでは、配列の長さについて詳しく学びました。

- **lengthプロパティ**：`配列名.length`で配列の要素数を取得できます
- **要素数のカウント**：`length`は配列の操作に応じて自動的に更新されます
- **空配列の判定**：`length === 0`で配列が空かどうかを判定できます
- **成果物**：配列カウンター - 配列の長さを活用したプログラムを作成しました

### 今回の目標

今回のレッスンでは、for文を使って配列のすべての要素を処理する方法を学びます。

- for文で配列を巡回する方法を理解する
- すべての要素を表示する
- 番号付きリストを作成する

## 配列の巡回

**配列の巡回（ループ）**とは、配列のすべての要素に順番にアクセスすることです。

### 基本的なパターン

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

**出力**：
```
りんご
みかん
ぶどう
```

### 詳しい説明

```javascript
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

**各部分の意味**：
- `let i = 0`: カウンタ変数を0で初期化（最初のインデックス）
- `i < fruits.length`: 配列の長さ未満まで繰り返す
- `i++`: ループごとにiを1増やす
- `fruits[i]`: i番目の要素にアクセス

### ループの動き

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
// length = 3

// 1回目: i = 0
fruits[0]  // "りんご"

// 2回目: i = 1
fruits[1]  // "みかん"

// 3回目: i = 2
fruits[2]  // "ぶどう"

// 4回目はなし: i = 3 は fruits.length (3) 以上なので終了
```

## インデックスアクセス

for文を使うと、インデックス（i）と要素（fruits[i]）の両方が使えます。

### インデックスを表示

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

### 番号付きリスト

```javascript
let todos = ["買い物", "掃除", "洗濯"];

for (let i = 0; i < todos.length; i++) {
  console.log((i + 1) + ". " + todos[i]);
}
```

**出力**：
```
1. 買い物
2. 掃除
3. 洗濯
```

**注意**：`i + 1`を使うのは、インデックスは0から始まるが、番号は1から始めたいためです。

## 全要素の表示

配列のすべての要素を表示する基本的なパターンです。

### パターン1：シンプルな表示

```javascript
let colors = ["赤", "青", "黄色", "緑"];

for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}
```

### パターン2：カンマ区切り

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let result = "";

for (let i = 0; i < fruits.length; i++) {
  result = result + fruits[i];

  if (i < fruits.length - 1) {
    result = result + ", ";
  }
}

console.log(result);  // "りんご, みかん, ぶどう"
```

**詳しい説明**：
- `i < fruits.length - 1`: 最後の要素以外の場合
- カンマを追加（最後の要素の後はカンマを付けない）

### パターン3：箇条書き

```javascript
let items = ["パン", "牛乳", "卵"];

for (let i = 0; i < items.length; i++) {
  console.log("・" + items[i]);
}
```

**出力**：
```
・パン
・牛乳
・卵
```

## 配列の処理

for文を使って、配列の各要素に対して処理を行います。

### 例1：すべての要素を2倍にする

```javascript
let numbers = [1, 2, 3, 4, 5];
console.log("元の配列: " + numbers);

for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2;
}

console.log("2倍後: " + numbers);
```

**出力**：
```
元の配列: 1,2,3,4,5
2倍後: 2,4,6,8,10
```

### 例2：条件に合う要素を表示

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("偶数:");
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    console.log(numbers[i]);
  }
}
```

**出力**：
```
偶数:
2
4
6
8
10
```

### 例3：合計を計算

```javascript
let scores = [85, 92, 78, 95, 88];
let total = 0;

for (let i = 0; i < scores.length; i++) {
  total = total + scores[i];
}

console.log("合計点: " + total);  // 438
console.log("平均点: " + (total / scores.length));  // 87.6
```

## 実践例：配列表示機

HTMLとJavaScriptを組み合わせて、配列を表示してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>配列表示機</title>
</head>
<body>
    <h1>フルーツリストの表示</h1>
    <button id="showSimple">シンプル表示</button>
    <button id="showNumbered">番号付き表示</button>
    <button id="showList">リスト表示</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let simpleButton = document.getElementById("showSimple");
let numberedButton = document.getElementById("showNumbered");
let listButton = document.getElementById("showList");
let result = document.getElementById("result");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// シンプル表示
simpleButton.addEventListener("click", function() {
  result.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = fruits[i];
    result.appendChild(p);
  }
});

// 番号付き表示
numberedButton.addEventListener("click", function() {
  result.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = (i + 1) + ". " + fruits[i];
    result.appendChild(p);
  }
});

// リスト表示
listButton.addEventListener("click", function() {
  result.innerHTML = "";

  let ul = document.createElement("ul");

  for (let i = 0; i < fruits.length; i++) {
    let li = document.createElement("li");
    li.textContent = fruits[i];
    ul.appendChild(li);
  }

  result.appendChild(ul);
});
```

### コードの詳しい説明

**シンプル表示**
```javascript
for (let i = 0; i < fruits.length; i++) {
  let p = document.createElement("p");
  p.textContent = fruits[i];
  result.appendChild(p);
}
```
- 各要素を`<p>`タグで表示
- `fruits[i]`で各要素にアクセス

**番号付き表示**
```javascript
for (let i = 0; i < fruits.length; i++) {
  let p = document.createElement("p");
  p.textContent = (i + 1) + ". " + fruits[i];
  result.appendChild(p);
}
```
- `i + 1`で1から始まる番号を表示
- インデックスは0から、番号は1から

**リスト表示**
```javascript
let ul = document.createElement("ul");

for (let i = 0; i < fruits.length; i++) {
  let li = document.createElement("li");
  li.textContent = fruits[i];
  ul.appendChild(li);
}

result.appendChild(ul);
```
- `<ul>`要素を作成
- 各要素を`<li>`タグで追加
- 最後に`<ul>`を結果エリアに追加

## よくあるパターン

### パターン1：配列のコピー

```javascript
let original = ["りんご", "みかん", "ぶどう"];
let copy = [];

for (let i = 0; i < original.length; i++) {
  copy.push(original[i]);
}

console.log(copy);  // ["りんご", "みかん", "ぶどう"]
```

### パターン2：逆順に処理

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 末尾から先頭へ
for (let i = fruits.length - 1; i >= 0; i--) {
  console.log(fruits[i]);
}
```

**出力**：
```
ぶどう
みかん
りんご
```

### パターン3：条件に合う要素を集める

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let evenNumbers = [];

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    evenNumbers.push(numbers[i]);
  }
}

console.log(evenNumbers);  // [2, 4, 6, 8, 10]
```

### パターン4：最大値の検索

```javascript
let numbers = [12, 45, 23, 67, 34, 89, 15];
let max = numbers[0];  // 最初の要素で初期化

for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > max) {
    max = numbers[i];
  }
}

console.log("最大値: " + max);  // 89
```

## 配列とループの組み合わせ

### 例1：成績の評価

```javascript
let scores = [85, 92, 78, 95, 88];

for (let i = 0; i < scores.length; i++) {
  let grade;

  if (scores[i] >= 90) {
    grade = "A";
  } else if (scores[i] >= 80) {
    grade = "B";
  } else if (scores[i] >= 70) {
    grade = "C";
  } else {
    grade = "D";
  }

  console.log("テスト" + (i + 1) + ": " + scores[i] + "点 → " + grade);
}
```

**出力**：
```
テスト1: 85点 → B
テスト2: 92点 → A
テスト3: 78点 → C
テスト4: 95点 → A
テスト5: 88点 → B
```

### 例2：文字列の配列処理

```javascript
let names = ["太郎", "花子", "次郎"];

for (let i = 0; i < names.length; i++) {
  console.log(names[i] + "さん、こんにちは！");
}
```

**出力**：
```
太郎さん、こんにちは！
花子さん、こんにちは！
次郎さん、こんにちは！
```

### 例3：配列の変換

```javascript
let celsius = [0, 10, 20, 30, 40];
let fahrenheit = [];

for (let i = 0; i < celsius.length; i++) {
  let f = celsius[i] * 9 / 5 + 32;
  fahrenheit.push(f);
}

console.log("摂氏: " + celsius);
console.log("華氏: " + fahrenheit);
```

## 注意点

### 1. インデックスの範囲

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 正しい
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// 間違い：最後の要素が表示されない
for (let i = 0; i < fruits.length - 1; i++) {
  console.log(fruits[i]);
}

// 間違い：範囲外アクセス
for (let i = 0; i <= fruits.length; i++) {
  console.log(fruits[i]);  // 最後にundefinedが表示される
}
```

### 2. lengthの再評価

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 推奨：lengthは毎回評価される
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// 最適化：lengthを変数に保存（大きな配列で有効）
let length = fruits.length;
for (let i = 0; i < length; i++) {
  console.log(fruits[i]);
}
```

### 3. ループ内での配列変更

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 注意：ループ内で配列のサイズを変更すると予期しない動作になる
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
  fruits.push("バナナ");  // 無限ループになる可能性
}
```

## 練習問題

### 課題：配列表示機

for文を使って配列のすべての要素を処理し、様々な形式で表示するプログラムを作成してください。

### 保存場所

`exercises/lesson-092/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. for文で配列を巡回する方法を理解する
2. すべての要素をシンプルに表示する
3. 番号付きリストを作成する

### 要件

- シンプル表示ボタン（id="showSimple"）
- 番号付き表示ボタン（id="showNumbered"）
- リスト表示ボタン（id="showList"）
- 結果表示エリア（id="result"）
- for文を使って全要素を処理する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-092
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

for文で配列を処理する際のポイントを確認しましょう。

**基本パターン**
- `for (let i = 0; i < 配列名.length; i++)`
- `i`は0から始まる
- `i < 配列名.length`で配列の長さ未満まで

**要素へのアクセス**
- `配列名[i]`で各要素にアクセス
- `i`はインデックス、`配列名[i]`は値

**番号付き表示**
- `i + 1`で1から始まる番号
- インデックスは0から、番号は1から

### 解答例

解答は上記の実践例を参照してください。

## まとめ

お疲れ様でした。今回のレッスンでは、for文を使った配列処理について学びました。

**今回学んだキーポイント**

- **配列の巡回**：`for (let i = 0; i < 配列名.length; i++)`のパターンで、配列のすべての要素に順番にアクセスできます
- **インデックスアクセス**：ループ変数`i`をインデックスとして使い、`配列名[i]`で各要素を取得できます
- **全要素の表示**：for文を使って配列のすべての要素を順番に表示できます
- **番号付きリスト**：`i + 1`を使うことで、0から始まるインデックスを1から始まる番号に変換できます

for文と配列の組み合わせは、プログラミングで最も基本的で重要なパターンです。配列の全要素を処理する、条件に合う要素を探す、集計するなど、さまざまな処理で使われます。

次のレッスンでは、配列の検索について学びます。特定の要素を配列から探し出す方法を習得しましょう。
