---
title: "Lesson 089: 要素の追加"
author: "JavaScript学習教材"
date: "2025-01-21"
---

# レッスン89：要素の追加

## 今回の学習

### 前回の復習

前回のレッスンでは、配列の要素を変更する方法を学びました。

- **要素の変更**：`配列名[インデックス] = 新しい値`の形式で、特定の要素を書き換えられます
- **配列の可変性**：JavaScriptの配列は可変で、作成後も要素を変更できます
- **複数の要素を変更**：for文を使って、複数の要素を一度に変更できます
- **成果物**：配列編集機 - 配列の要素を動的に変更するプログラムを作成しました

### 今回の目標

今回のレッスンでは、配列に新しい要素を追加する方法を学びます。

- `push()`メソッドで末尾に要素を追加する
- 複数の要素を一度に追加する
- 配列の拡張を理解する

## push()メソッド

**push()メソッド**は、配列の末尾に新しい要素を追加するメソッドです。

### 基本的な構文

```javascript
配列名.push(追加する要素);
```

### 1つの要素を追加

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]

fruits.push("いちご");
console.log(fruits);  // ["りんご", "みかん", "ぶどう", "いちご"]
```

**変更前**：
```
インデックス:  0        1        2
値:         "りんご"  "みかん"  "ぶどう"
長さ: 3
```

**変更後**：
```
インデックス:  0        1        2        3
値:         "りんご"  "みかん"  "ぶどう"  "いちご"
長さ: 4
```

### 配列の長さが増える

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits.length);  // 3

fruits.push("いちご");
console.log(fruits.length);  // 4
```

`push()`を使うと、配列の長さが1増えます。

## 複数の要素を追加

`push()`メソッドは、複数の要素を一度に追加できます。

```javascript
let fruits = ["りんご", "みかん"];
console.log(fruits);  // ["りんご", "みかん"]

fruits.push("ぶどう", "いちご", "メロン");
console.log(fruits);  // ["りんご", "みかん", "ぶどう", "いちご", "メロン"]
```

**構文**：
```javascript
配列名.push(要素1, 要素2, 要素3, ...);
```

### 長さの変化

```javascript
let fruits = ["りんご", "みかん"];
console.log(fruits.length);  // 2

fruits.push("ぶどう", "いちご", "メロン");
console.log(fruits.length);  // 5（3つ追加されたので2+3=5）
```

## push()の戻り値

`push()`メソッドは、追加後の配列の長さを返します。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let newLength = fruits.push("いちご");

console.log(newLength);  // 4（新しい長さ）
console.log(fruits);     // ["りんご", "みかん", "ぶどう", "いちご"]
```

### 戻り値の活用

```javascript
let numbers = [1, 2, 3];
let length = numbers.push(4, 5);

console.log("要素を追加しました。現在の長さ: " + length);  // 5
```

通常は戻り値を使わないことが多いですが、配列の長さを知りたい場合に便利です。

## 空の配列に追加

空の配列から始めて、要素を追加していくこともできます。

```javascript
let fruits = [];  // 空の配列
console.log(fruits);  // []

fruits.push("りんご");
console.log(fruits);  // ["りんご"]

fruits.push("みかん");
console.log(fruits);  // ["りんご", "みかん"]

fruits.push("ぶどう");
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]
```

このパターンは、ユーザーの入力を配列に蓄積する際によく使われます。

## ループで複数追加

for文と組み合わせて、複数の要素を追加できます。

```javascript
let numbers = [];

// 1から5までの数字を追加
for (let i = 1; i <= 5; i++) {
  numbers.push(i);
}

console.log(numbers);  // [1, 2, 3, 4, 5]
```

**詳しい説明**：
- 最初は空の配列`[]`
- ループ1回目：`numbers.push(1)` → `[1]`
- ループ2回目：`numbers.push(2)` → `[1, 2]`
- ループ3回目：`numbers.push(3)` → `[1, 2, 3]`
- ループ4回目：`numbers.push(4)` → `[1, 2, 3, 4]`
- ループ5回目：`numbers.push(5)` → `[1, 2, 3, 4, 5]`

## 条件付きで追加

条件に合う要素だけを追加することもできます。

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let evenNumbers = [];

// 偶数だけを新しい配列に追加
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    evenNumbers.push(numbers[i]);
  }
}

console.log(evenNumbers);  // [2, 4, 6, 8, 10]
```

**詳しい説明**：
- `numbers[i] % 2 === 0`：偶数かどうかをチェック
- 偶数なら`evenNumbers.push(numbers[i])`で追加
- 奇数なら何もしない

## 実践例：リスト追加機

HTMLとJavaScriptを組み合わせて、配列に要素を追加してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>リスト追加機</title>
</head>
<body>
    <h1>フルーツリストに追加</h1>
    <p>現在のリスト: <span id="display"></span></p>
    <p>要素数: <span id="count"></span></p>

    <input type="text" id="newFruit" placeholder="フルーツの名前">
    <button id="add">追加</button>
    <button id="addMultiple">3つまとめて追加</button>

    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let addButton = document.getElementById("add");
let addMultipleButton = document.getElementById("addMultiple");
let display = document.getElementById("display");
let count = document.getElementById("count");
let result = document.getElementById("result");
let newFruitInput = document.getElementById("newFruit");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう"];

// 配列を表示
function showArray() {
  display.textContent = fruits.join(", ");
  count.textContent = fruits.length;
}

// 初期表示
showArray();

// 1つ追加
addButton.addEventListener("click", function() {
  let newFruit = newFruitInput.value;

  if (newFruit) {
    fruits.push(newFruit);
    showArray();
    result.textContent = "「" + newFruit + "」を追加しました";
    newFruitInput.value = "";  // 入力欄をクリア
  } else {
    result.textContent = "フルーツの名前を入力してください";
  }
});

// 複数追加
addMultipleButton.addEventListener("click", function() {
  fruits.push("バナナ", "メロン", "いちご");
  showArray();
  result.textContent = "バナナ、メロン、いちごを追加しました";
});
```

### コードの詳しい説明

**配列の表示**
```javascript
function showArray() {
  display.textContent = fruits.join(", ");
  count.textContent = fruits.length;
}
```
- `fruits.join(", ")`: 配列を文字列に変換
- `fruits.length`: 要素数を表示

**1つ追加**
```javascript
let newFruit = newFruitInput.value;

if (newFruit) {
  fruits.push(newFruit);
  showArray();
  newFruitInput.value = "";
}
```
- `newFruitInput.value`: 入力された値を取得
- `if (newFruit)`: 空でないかチェック
- `fruits.push(newFruit)`: 配列に追加
- `showArray()`: 更新された配列を表示
- `newFruitInput.value = ""`: 入力欄をクリア

**複数追加**
```javascript
fruits.push("バナナ", "メロン", "いちご");
```
- カンマで区切って複数の要素を一度に追加

## 配列の拡張

`push()`を使うと、配列は自動的に拡張されます。配列のサイズを事前に決める必要はありません。

```javascript
let numbers = [1, 2, 3];
console.log(numbers.length);  // 3

// 100個追加しても問題なし
for (let i = 4; i <= 100; i++) {
  numbers.push(i);
}

console.log(numbers.length);  // 100
```

JavaScriptの配列は、必要に応じて自動的に拡張されるため、非常に柔軟です。

## unshift()メソッド（補足）

`push()`は末尾に追加しますが、**unshift()メソッド**を使うと先頭に追加できます。

```javascript
let fruits = ["みかん", "ぶどう"];
fruits.unshift("りんご");
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]
```

### push()とunshift()の違い

```javascript
let fruits = ["みかん"];

// push(): 末尾に追加
fruits.push("ぶどう");
console.log(fruits);  // ["みかん", "ぶどう"]

// unshift(): 先頭に追加
fruits.unshift("りんご");
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]
```

**注意**：`unshift()`は全要素をずらす必要があるため、`push()`より処理が遅くなります。通常は`push()`を使うことが推奨されます。

## 実用的な例

### 例1：TODOリストの作成

```javascript
let todos = [];

todos.push("買い物に行く");
todos.push("掃除する");
todos.push("洗濯する");

console.log("TODOリスト:");
for (let i = 0; i < todos.length; i++) {
  console.log((i + 1) + ". " + todos[i]);
}
```

**出力**：
```
TODOリスト:
1. 買い物に行く
2. 掃除する
3. 洗濯する
```

### 例2：得点の記録

```javascript
let scores = [];

// テストの点数を追加
scores.push(85);
scores.push(92);
scores.push(78);

console.log("テストの点数: " + scores.join(", "));
console.log("平均点: " + (scores[0] + scores[1] + scores[2]) / scores.length);
```

### 例3：ログの蓄積

```javascript
let logs = [];

logs.push("アプリ起動");
logs.push("ユーザーログイン");
logs.push("データ読み込み");

console.log("ログ一覧:");
for (let i = 0; i < logs.length; i++) {
  console.log("[" + i + "] " + logs[i]);
}
```

## 注意点

### 1. push()は元の配列を変更する

`push()`は元の配列自体を変更します（破壊的メソッド）。

```javascript
let fruits = ["りんご", "みかん"];
fruits.push("ぶどう");

console.log(fruits);  // ["りんご", "みかん", "ぶどう"]（元の配列が変更された）
```

### 2. constで宣言した配列でも使える

```javascript
const fruits = ["りんご"];
fruits.push("みかん");  // OK
console.log(fruits);  // ["りんご", "みかん"]

// fruits = [];  // エラー！配列全体の再代入は不可
```

### 3. 空の値も追加できる

```javascript
let fruits = ["りんご"];
fruits.push("");  // 空文字列を追加
console.log(fruits);  // ["りんご", ""]
console.log(fruits.length);  // 2
```

通常は空の値を追加しないように、事前にチェックします。

```javascript
let newFruit = "";
if (newFruit) {
  fruits.push(newFruit);  // 空なので追加されない
}
```

## 練習問題

### 課題：リスト追加機

配列に要素を追加するプログラムを作成してください。

### 保存場所

`exercises/lesson-089/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. `push()`メソッドで要素を追加する方法を理解する
2. ユーザー入力を配列に追加する
3. 複数の要素を一度に追加する機能を実装する

### 要件

- 配列の表示（id="display"）
- 要素数の表示（id="count"）
- 入力欄（id="newFruit"）
- 追加ボタン（id="add"）
- 複数追加ボタン（id="addMultiple"）
- 結果表示エリア（id="result"）

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-089
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

要素を追加する際のポイントを確認しましょう。

**push()メソッド**
- `配列名.push(要素)`で末尾に追加します
- 複数の場合は`配列名.push(要素1, 要素2, ...)`
- 配列の長さは自動的に増えます

**入力値のチェック**
- `if (入力値)`で空でないかチェックします
- 空の場合はエラーメッセージを表示します

**配列の表示**
- `join(", ")`で文字列に変換します
- `length`プロパティで要素数を表示します

### 解答例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 089</title>
</head>
<body>
    <h1>フルーツリストに追加</h1>
    <p>現在のリスト: <span id="display"></span></p>
    <p>要素数: <span id="count"></span></p>

    <input type="text" id="newFruit" placeholder="フルーツの名前">
    <button id="add">追加</button>
    <button id="addMultiple">3つまとめて追加</button>

    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let addButton = document.getElementById("add");
let addMultipleButton = document.getElementById("addMultiple");
let display = document.getElementById("display");
let count = document.getElementById("count");
let result = document.getElementById("result");
let newFruitInput = document.getElementById("newFruit");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう"];

// 配列を表示
function showArray() {
  display.textContent = fruits.join(", ");
  count.textContent = fruits.length;
}

// 初期表示
showArray();

// 1つ追加
addButton.addEventListener("click", function() {
  let newFruit = newFruitInput.value;

  if (newFruit) {
    fruits.push(newFruit);
    showArray();
    result.textContent = "「" + newFruit + "」を追加しました";
    newFruitInput.value = "";  // 入力欄をクリア
  } else {
    result.textContent = "フルーツの名前を入力してください";
  }
});

// 複数追加
addMultipleButton.addEventListener("click", function() {
  fruits.push("バナナ", "メロン", "いちご");
  showArray();
  result.textContent = "バナナ、メロン、いちごを追加しました";
});
```

### 解説

このコードでは、`push()`メソッドを使って配列に要素を追加しています。

**配列の初期化**
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
```
- 初期値として3つの要素を持つ配列を作成

**配列の表示**
```javascript
function showArray() {
  display.textContent = fruits.join(", ");
  count.textContent = fruits.length;
}
```
- `join(", ")`で配列を文字列に変換
- `length`で要素数を表示
- 配列が更新されるたびに呼び出す

**1つの要素を追加**
```javascript
let newFruit = newFruitInput.value;

if (newFruit) {
  fruits.push(newFruit);
  showArray();
  newFruitInput.value = "";
}
```
- 入力値を取得
- 空でないかチェック
- `push()`で配列に追加
- 表示を更新
- 入力欄をクリア

**複数の要素を追加**
```javascript
fruits.push("バナナ", "メロン", "いちご");
```
- カンマで区切って3つの要素を一度に追加
- 配列の長さは3増える

**動作の流れ**
1. ユーザーがフルーツ名を入力
2. 「追加」ボタンをクリック
3. 入力値が空でないかチェック
4. `push()`で配列に追加
5. 更新された配列を表示
6. 入力欄をクリア

## まとめ

お疲れ様でした。今回のレッスンでは、配列に要素を追加する方法を学びました。

**今回学んだキーポイント**

- **push()メソッド**：`配列名.push(要素)`の形式で、配列の末尾に新しい要素を追加できます
- **複数追加**：`push(要素1, 要素2, ...)`のように、複数の要素を一度に追加できます
- **配列の拡張**：`push()`を使うと配列の長さが自動的に増え、必要に応じて配列が拡張されます
- **戻り値**：`push()`は追加後の配列の長さを返しますが、通常はあまり使用しません

`push()`メソッドは、配列操作の中で最もよく使われるメソッドの1つです。ユーザーの入力を蓄積したり、データを動的に収集する際に非常に便利です。

次のレッスンでは、配列から要素を削除する方法を学びます。`pop()`と`shift()`メソッドを使って、末尾や先頭の要素を削除する方法を習得しましょう。
