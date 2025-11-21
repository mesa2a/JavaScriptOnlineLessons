---
title: "レッスン95：配列のコピー"
author: "JavaScript Online Lessons"
date: "2025-01-21"
---

# レッスン95：配列のコピー

## 今回の学習

前回のレッスンでは、配列の集計方法を学びました：

- 合計を計算する
- 平均を計算する
- 最大値・最小値を見つける
- アキュムレータパターン

今回は、配列をコピーする方法と、その際の注意点について学びます：

- 参照の問題を理解する
- スプレッド構文を使ったコピー
- structuredClone()で深いコピー
- 安全なコピーの重要性

## 1. 参照の問題

### 単純な代入の落とし穴

配列を別の変数に代入しても、新しい配列は作成されません：

```javascript
let fruits1 = ["りんご", "バナナ"];
let fruits2 = fruits1;

fruits2.push("みかん");

console.log(fruits1);  // ["りんご", "バナナ", "みかん"]
console.log(fruits2);  // ["りんご", "バナナ", "みかん"]
```

`fruits2`に追加したはずなのに、`fruits1`も変更されてしまいました！

### なぜこうなるのか

配列は「参照型」のデータです。変数には配列の実体ではなく、配列が置かれている「場所」が入っています：

```javascript
let fruits1 = ["りんご", "バナナ"];  // 配列を作成
let fruits2 = fruits1;                // 同じ場所を指す
```

これは、同じノートを2人で共有しているようなものです。どちらが書き込んでも、同じノートが変更されます。

### 参照の確認

2つの変数が同じ配列を指しているかは、`===`で確認できます：

```javascript
let fruits1 = ["りんご", "バナナ"];
let fruits2 = fruits1;
let fruits3 = ["りんご", "バナナ"];

console.log(fruits1 === fruits2);  // true（同じ配列）
console.log(fruits1 === fruits3);  // false（別の配列）
```

内容が同じでも、別の配列なら`false`になります。

## 2. スプレッド構文によるコピー

### 新しい配列を作る

スプレッド構文`...`を使うと、新しい配列を作成できます：

```javascript
let fruits1 = ["りんご", "バナナ"];
let fruits2 = [...fruits1];

fruits2.push("みかん");

console.log(fruits1);  // ["りんご", "バナナ"]
console.log(fruits2);  // ["りんご", "バナナ", "みかん"]
```

今度は、`fruits2`を変更しても`fruits1`は変わりません。

### スプレッド構文の仕組み

`...fruits1`は、配列の要素を1つずつ取り出します：

```javascript
let fruits1 = ["りんご", "バナナ"];
let fruits2 = [...fruits1];
// これは次と同じ：
let fruits2 = ["りんご", "バナナ"];
```

新しい`[]`の中に要素をコピーしているので、別の配列になります。

### 配列の結合にも使える

スプレッド構文は、複数の配列を結合する時にも便利です：

```javascript
let fruits = ["りんご", "バナナ"];
let vegetables = ["にんじん", "トマト"];

let foods = [...fruits, ...vegetables];
console.log(foods);
// ["りんご", "バナナ", "にんじん", "トマト"]
```

要素を追加しながらコピーすることもできます：

```javascript
let numbers1 = [1, 2, 3];
let numbers2 = [...numbers1, 4, 5];

console.log(numbers2);  // [1, 2, 3, 4, 5]
```

## 3. 安全なコピーの重要性

### いつコピーが必要か

次のような場合は、配列をコピーする必要があります：

1. **元の配列を保持したい時**
```javascript
let original = [1, 2, 3];
let sorted = [...original];
sorted.sort((a, b) => b - a);  // 降順ソート

console.log(original);  // [1, 2, 3]（変更されていない）
console.log(sorted);    // [3, 2, 1]
```

2. **関数に渡す時**
```javascript
function addScore(scores, newScore) {
  let copy = [...scores];  // コピーを作る
  copy.push(newScore);
  return copy;
}

let scores = [80, 90];
let newScores = addScore(scores, 95);

console.log(scores);     // [80, 90]（元のまま）
console.log(newScores);  // [80, 90, 95]
```

3. **配列を変更するメソッドを使う前**
```javascript
let items = ["c", "a", "b"];
let sortedItems = [...items];
sortedItems.sort();

console.log(items);        // ["c", "a", "b"]
console.log(sortedItems);  // ["a", "b", "c"]
```

### constでも変更される

`const`で宣言しても、配列の中身は変更できてしまいます：

```javascript
const fruits = ["りんご"];
fruits.push("バナナ");  // エラーにならない
console.log(fruits);     // ["りんご", "バナナ"]
```

`const`は変数の再代入を防ぐだけで、配列の中身の変更は防げません。

元の配列を保護したい時は、コピーを作って操作しましょう。

## 4. structuredClone()による深いコピー

### 浅いコピーと深いコピー

スプレッド構文は「浅いコピー（shallow copy）」を作ります。配列の中に配列やオブジェクトがある場合、その内部は参照のままです：

```javascript
let original = [[1, 2], [3, 4]];
let copy = [...original];

copy[0].push(5);

console.log(original);  // [[1, 2, 5], [3, 4]]（変更された！）
console.log(copy);      // [[1, 2, 5], [3, 4]]
```

外側の配列はコピーされましたが、内側の配列`[1, 2]`は参照のままなので、両方が変更されます。

### structuredClone()で深いコピー

`structuredClone()`を使うと、「深いコピー（deep copy）」が作れます：

```javascript
let original = [[1, 2], [3, 4]];
let copy = structuredClone(original);

copy[0].push(5);

console.log(original);  // [[1, 2], [3, 4]]（変更されない）
console.log(copy);      // [[1, 2, 5], [3, 4]]
```

内側の配列も含めて、すべてコピーされます。

### いつ使うか

通常は、スプレッド構文で十分です：

```javascript
// 数値や文字列だけの配列 → スプレッド構文でOK
let numbers = [1, 2, 3];
let copy = [...numbers];
```

配列の中に配列やオブジェクトがある場合は、`structuredClone()`を使います：

```javascript
// 配列の中に配列やオブジェクトがある → structuredClone()
let users = [
  { name: "太郎", scores: [80, 90] },
  { name: "花子", scores: [85, 95] }
];
let copy = structuredClone(users);
```

### 制限事項

`structuredClone()`は、関数はコピーできません：

```javascript
let array = [1, 2, function() { console.log("hello"); }];
let copy = structuredClone(array);  // エラー
```

関数を含む場合は、スプレッド構文を使うか、手動でコピーする必要があります。

## 実践例：買い物リストの履歴

配列のコピーを使って、買い物リストの履歴を記録するアプリを作ってみましょう：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>買い物リスト履歴</title>
</head>
<body>
  <h1>買い物リスト履歴</h1>

  <div>
    <input type="text" id="itemInput" placeholder="商品名">
    <button id="addButton">追加</button>
    <button id="saveButton">保存</button>
  </div>

  <h2>現在のリスト</h2>
  <div id="currentList"></div>

  <h2>保存した履歴</h2>
  <div id="history"></div>

  <script src="script.js"></script>
</body>
</html>
```

```javascript
let currentList = [];
let savedLists = [];

let itemInput = document.getElementById("itemInput");
let addButton = document.getElementById("addButton");
let saveButton = document.getElementById("saveButton");
let currentListDiv = document.getElementById("currentList");
let historyDiv = document.getElementById("history");

addButton.addEventListener("click", function() {
  let item = itemInput.value;
  if (item === "") return;

  currentList.push(item);
  itemInput.value = "";
  showCurrentList();
});

saveButton.addEventListener("click", function() {
  if (currentList.length === 0) return;

  // コピーを保存（重要！）
  let copy = [...currentList];
  savedLists.push(copy);

  currentList = [];  // 現在のリストをクリア
  showCurrentList();
  showHistory();
});

function showCurrentList() {
  if (currentList.length === 0) {
    currentListDiv.innerHTML = "<p>（空）</p>";
    return;
  }

  let html = "<ul>";
  for (let item of currentList) {
    html += "<li>" + item + "</li>";
  }
  html += "</ul>";
  currentListDiv.innerHTML = html;
}

function showHistory() {
  if (savedLists.length === 0) {
    historyDiv.innerHTML = "<p>（履歴なし）</p>";
    return;
  }

  let html = "";
  for (let i = 0; i < savedLists.length; i++) {
    html += "<h3>リスト " + (i + 1) + "</h3>";
    html += "<ul>";
    for (let item of savedLists[i]) {
      html += "<li>" + item + "</li>";
    }
    html += "</ul>";
  }
  historyDiv.innerHTML = html;
}

showCurrentList();
showHistory();
```

このコードのポイント：

```javascript
let copy = [...currentList];
savedLists.push(copy);
```

もし`savedLists.push(currentList)`としてしまうと、すべての履歴が最後のリストと同じになってしまいます。

## 練習問題

配列のコピーを使った「履歴機能付きカウンター」を作成してください：

### 要件

1. 「+1」ボタンでカウントを増やす
2. 「保存」ボタンで現在の値を履歴に記録する
3. 履歴は配列で管理する（コピーを使う）
4. 履歴の平均値を表示する
5. 履歴をリスト表示する

### ヒント

```javascript
let history = [];
let current = 0;

// 保存する時
let copy = current;  // 数値は自動的にコピーされる
history.push(copy);

// 平均を計算
let total = 0;
for (let value of history) {
  total += value;
}
let average = total / history.length;
```

注：数値は「値型」なので、変数に代入すると自動的にコピーされます。配列や オブジェクトなどの「参照型」だけ、スプレッド構文が必要です。

## まとめ

今回は、配列のコピーについて学びました：

- **参照の問題**：`let array2 = array1`では同じ配列を指す
- **スプレッド構文**：`let array2 = [...array1]`で新しい配列を作る（浅いコピー）
- **structuredClone()**：`structuredClone(array)`で深いコピーを作る
- **使い分け**：通常はスプレッド構文、ネストした配列やオブジェクトがある場合はstructuredClone()
- **安全なコピー**：元の配列を保護したい時はコピーを作る
- **使いどころ**：履歴管理、ソート前、関数に渡す前など

配列は参照型なので、コピーしないと予期しない変更が起きることがあります。スプレッド構文やstructuredClone()を使って、安全に配列を扱いましょう。

次のレッスンでは、配列の結合について学びます。
