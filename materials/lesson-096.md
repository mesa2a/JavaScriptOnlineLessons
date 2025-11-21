---
title: "レッスン96：配列の結合"
author: "JavaScript Online Lessons"
date: "2025-01-21"
---

# レッスン96：配列の結合

## 今回の学習

前回のレッスンでは、配列のコピー方法を学びました：

- 参照の問題を理解する
- スプレッド構文でコピーする
- 安全なコピーの重要性

今回は、複数の配列を1つにまとめる方法について学びます：

- concat()メソッドの使い方
- 複数の配列を結合する
- 新しい配列が作成されること

## 1. concat()メソッド

### 配列を結合する

`concat()`メソッドを使うと、複数の配列を1つにまとめることができます：

```javascript
let fruits = ["りんご", "バナナ"];
let vegetables = ["にんじん", "トマト"];

let foods = fruits.concat(vegetables);
console.log(foods);
// ["りんご", "バナナ", "にんじん", "トマト"]
```

元の配列はそのまま残ります：

```javascript
console.log(fruits);      // ["りんご", "バナナ"]
console.log(vegetables);  // ["にんじん", "トマト"]
```

### 複数の配列を結合

`concat()`は、3つ以上の配列も一度に結合できます：

```javascript
let array1 = [1, 2];
let array2 = [3, 4];
let array3 = [5, 6];

let result = array1.concat(array2, array3);
console.log(result);  // [1, 2, 3, 4, 5, 6]
```

カンマで区切って、何個でも引数を渡せます。

### 要素を追加しながら結合

配列だけでなく、個別の値も一緒に結合できます：

```javascript
let numbers = [1, 2, 3];
let result = numbers.concat(4, 5, [6, 7]);

console.log(result);  // [1, 2, 3, 4, 5, 6, 7]
```

配列と値を混ぜて渡すこともできます。

## 2. 新しい配列の作成

### 元の配列は変更されない

`concat()`は、新しい配列を作成して返します。元の配列は変更されません：

```javascript
let original = ["a", "b"];
let added = original.concat("c", "d");

console.log(original);  // ["a", "b"]（変更されていない）
console.log(added);     // ["a", "b", "c", "d"]
```

これは`push()`との大きな違いです：

```javascript
// push()は元の配列を変更する
let array1 = [1, 2];
array1.push(3);
console.log(array1);  // [1, 2, 3]（変更される）

// concat()は新しい配列を返す
let array2 = [1, 2];
let array3 = array2.concat(3);
console.log(array2);  // [1, 2]（変更されない）
console.log(array3);  // [1, 2, 3]（新しい配列）
```

### メソッドチェーン

新しい配列が返されるので、連続してメソッドを呼び出せます：

```javascript
let result = [1, 2]
  .concat([3, 4])
  .concat([5, 6])
  .concat([7, 8]);

console.log(result);  // [1, 2, 3, 4, 5, 6, 7, 8]
```

これを「メソッドチェーン」と呼びます。

## 3. スプレッド構文との比較

### スプレッド構文でも結合できる

前回学んだスプレッド構文でも、配列を結合できます：

```javascript
let fruits = ["りんご", "バナナ"];
let vegetables = ["にんじん", "トマト"];

let foods = [...fruits, ...vegetables];
console.log(foods);
// ["りんご", "バナナ", "にんじん", "トマト"]
```

`concat()`と同じ結果が得られます。

### 使い分けのポイント

どちらを使っても構いませんが、次のような使い分けができます：

**concat()が便利な場合**
- メソッドチェーンを使いたい時
- 変数に入った配列を結合する時

```javascript
let result = array1
  .concat(array2)
  .concat(array3)
  .filter(x => x > 0);  // 他のメソッドに続けられる
```

**スプレッド構文が便利な場合**
- 途中に要素を挿入したい時
- より視覚的にわかりやすくしたい時

```javascript
let result = [0, ...array1, 100, ...array2, 200];
// 配列の前後や間に値を入れやすい
```

両方とも覚えておくと便利です。

## 4. 実用例

### 複数のリストをマージ

異なる期間のデータを1つにまとめることができます：

```javascript
let morningTasks = ["朝食", "掃除"];
let afternoonTasks = ["買い物", "勉強"];
let eveningTasks = ["夕食", "読書"];

let allTasks = morningTasks
  .concat(afternoonTasks)
  .concat(eveningTasks);

console.log(allTasks);
// ["朝食", "掃除", "買い物", "勉強", "夕食", "読書"]
```

### カテゴリ別データの統合

カテゴリごとに分かれたデータを、全体として扱いたい時に便利です：

```javascript
let techBooks = ["JavaScript入門", "Python基礎"];
let novelBooks = ["ハリーポッター", "星の王子さま"];

let allBooks = techBooks.concat(novelBooks);
console.log("全" + allBooks.length + "冊");  // 全4冊
```

## 実践例：タスクマネージャー

複数のカテゴリのタスクを管理するアプリを作ってみましょう：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>タスクマネージャー</title>
</head>
<body>
  <h1>タスクマネージャー</h1>

  <div>
    <h2>仕事</h2>
    <input type="text" id="workInput" placeholder="仕事タスク">
    <button id="addWork">追加</button>
    <div id="workList"></div>
  </div>

  <div>
    <h2>プライベート</h2>
    <input type="text" id="privateInput" placeholder="プライベートタスク">
    <button id="addPrivate">追加</button>
    <div id="privateList"></div>
  </div>

  <div>
    <h2>すべてのタスク</h2>
    <button id="showAll">すべて表示</button>
    <div id="allList"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

```javascript
let workTasks = [];
let privateTasks = [];

let workInput = document.getElementById("workInput");
let addWorkButton = document.getElementById("addWork");
let workListDiv = document.getElementById("workList");

let privateInput = document.getElementById("privateInput");
let addPrivateButton = document.getElementById("addPrivate");
let privateListDiv = document.getElementById("privateList");

let showAllButton = document.getElementById("showAll");
let allListDiv = document.getElementById("allList");

addWorkButton.addEventListener("click", function() {
  let task = workInput.value;
  if (task === "") return;

  workTasks.push(task);
  workInput.value = "";
  showWorkList();
});

addPrivateButton.addEventListener("click", function() {
  let task = privateInput.value;
  if (task === "") return;

  privateTasks.push(task);
  privateInput.value = "";
  showPrivateList();
});

showAllButton.addEventListener("click", function() {
  // 2つの配列を結合
  let allTasks = workTasks.concat(privateTasks);
  showAllList(allTasks);
});

function showWorkList() {
  workListDiv.innerHTML = "<p>仕事タスク: " + workTasks.length + "件</p>";
  let html = "<ul>";
  for (let task of workTasks) {
    html += "<li>📊 " + task + "</li>";
  }
  html += "</ul>";
  workListDiv.innerHTML += html;
}

function showPrivateList() {
  privateListDiv.innerHTML = "<p>プライベートタスク: " + privateTasks.length + "件</p>";
  let html = "<ul>";
  for (let task of privateTasks) {
    html += "<li>🏠 " + task + "</li>";
  }
  html += "</ul>";
  privateListDiv.innerHTML += html;
}

function showAllList(allTasks) {
  allListDiv.innerHTML = "<p>全タスク: " + allTasks.length + "件</p>";
  let html = "<ul>";

  // 仕事タスクを表示
  for (let task of workTasks) {
    html += "<li>📊 " + task + "</li>";
  }

  // プライベートタスクを表示
  for (let task of privateTasks) {
    html += "<li>🏠 " + task + "</li>";
  }

  html += "</ul>";
  allListDiv.innerHTML += html;
}
```

このコードのポイント：

```javascript
let allTasks = workTasks.concat(privateTasks);
```

2つのカテゴリのタスクを1つの配列にまとめて、全体の件数を表示できます。

## 練習問題

配列の結合を使った「メニュー管理システム」を作成してください：

### 要件

1. 「前菜」「メイン」「デザート」の3つのカテゴリがある
2. 各カテゴリにメニュー項目を追加できる
3. 「フルコース表示」ボタンで全メニューを結合して表示
4. 全メニューの合計数を表示
5. カテゴリごとの件数も表示

### ヒント

```javascript
let appetizers = [];
let mains = [];
let desserts = [];

// フルコースを作成
let fullCourse = appetizers
  .concat(mains)
  .concat(desserts);

// 合計数
let total = fullCourse.length;
```

## まとめ

今回は、配列の結合について学びました：

- **concat()メソッド**：複数の配列を1つにまとめる
- **新しい配列**：元の配列は変更されず、新しい配列が返される
- **複数結合**：3つ以上の配列も一度に結合できる
- **スプレッド構文**：`[...array1, ...array2]`でも結合できる
- **使いどころ**：カテゴリ別データの統合、複数リストのマージ

`concat()`は元の配列を変更しないので、安全に配列を結合できます。`push()`のように元の配列を変更するメソッドとの違いを理解しておきましょう。

次のレッスンでは、配列のソートについて学びます。
