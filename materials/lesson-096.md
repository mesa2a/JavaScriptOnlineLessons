---
title: "レッスン96：配列の結合"
author: "JavaScript Online Lessons"
date: "2025-11-26"
---

# レッスン96：配列の結合

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、配列のコピー方法を学びました：

- 参照の問題（`let array2 = array1`では同じ配列を指す）
- スプレッド構文（`[...array]`で新しい配列を作成）
- 安全なコピー（元の配列を保護する）
- `structuredClone()`（深いコピー）

配列は参照型なので、適切にコピーすることが重要でした。

### よくある場面

日常のプログラミングでは、こんな場面に遭遇します：

「複数のカテゴリに分かれたデータを、1つのリストにまとめたい」
「午前と午後のタスクを、1日分のタスクとして表示したい」
「検索結果を複数の配列から集めて、統合したい」

これらを実現するには、配列の結合が必要です。

### 学習目標

このレッスンでは、配列の結合について学びます：

1. **concat()メソッドの使い方** - 複数の配列を1つにまとめる
2. **複数配列を一つに** - 2つ以上の配列を結合する方法
3. **新しい配列作成** - 元の配列を変更せずに結合する
4. **イミュータブル操作** - 安全な配列操作の理解

配列を効率的に扱う重要な技術です。

---

## 1. concat()メソッドの基本

### 配列を結合する

`concat()`メソッドを使うと、複数の配列を1つにまとめることができます。

**基本的な使い方：**

```javascript
let fruits = ["りんご", "バナナ"];
let vegetables = ["にんじん", "トマト"];

let foods = fruits.concat(vegetables);
console.log(foods);
// ["りんご", "バナナ", "にんじん", "トマト"]
```

**実行の流れ：**

```
ステップ1: 配列の準備
  fruits = ["りんご", "バナナ"]
  vegetables = ["にんじん", "トマト"]

ステップ2: fruits.concat(vegetables)
  fruitsの要素: "りんご", "バナナ"
  vegetablesの要素: "にんじん", "トマト"
  ↓
  新しい配列を作成: ["りんご", "バナナ", "にんじん", "トマト"]

ステップ3: 結果
  foods = ["りんご", "バナナ", "にんじん", "トマト"]

【重要】元の配列は変更されない:
  fruits = ["りんご", "バナナ"]（そのまま）
  vegetables = ["にんじん", "トマト"]（そのまま）
```

**図解：concat()の動作**

```
元の配列:
  fruits     → ["りんご", "バナナ"]
  vegetables → ["にんじん", "トマト"]

concat()実行:
  fruits.concat(vegetables)
  ↓
  ["りんご", "バナナ"] + ["にんじん", "トマト"]
  ↓
  新しい配列を作成

結果:
  fruits     → ["りんご", "バナナ"]（変更なし）
  vegetables → ["にんじん", "トマト"]（変更なし）
  foods      → ["りんご", "バナナ", "にんじん", "トマト"]（新しい配列）
```

### 元の配列はそのまま残る

`concat()`は元の配列を変更しません：

```javascript
let fruits = ["りんご", "バナナ"];
let vegetables = ["にんじん", "トマト"];

let foods = fruits.concat(vegetables);

console.log(fruits);      // ["りんご", "バナナ"]（変更されていない）
console.log(vegetables);  // ["にんじん", "トマト"]（変更されていない）
console.log(foods);       // ["りんご", "バナナ", "にんじん", "トマト"]
```

**実行の流れ：**

```
初期状態:
  配列A: ["りんご", "バナナ"]
  配列B: ["にんじん", "トマト"]
  fruits → 配列A
  vegetables → 配列B

concat()実行後:
  配列A: ["りんご", "バナナ"]（変更なし）
  配列B: ["にんじん", "トマト"]（変更なし）
  配列C: ["りんご", "バナナ", "にんじん", "トマト"]（新しい配列）

  fruits → 配列A（元のまま）
  vegetables → 配列B（元のまま）
  foods → 配列C（新しい配列）
```

これは「イミュータブル（不変）操作」と呼ばれる重要な特性です。

### 要素を追加しながら結合

配列だけでなく、個別の値も一緒に結合できます：

```javascript
let numbers = [1, 2, 3];
let result = numbers.concat(4, 5, [6, 7]);

console.log(result);  // [1, 2, 3, 4, 5, 6, 7]
```

**実行の流れ：**

```
ステップ1: 元の配列
  numbers = [1, 2, 3]

ステップ2: concat(4, 5, [6, 7])
  引数を順番に処理:
    - 4 → そのまま追加
    - 5 → そのまま追加
    - [6, 7] → 配列なので展開して追加

ステップ3: 新しい配列を作成
  [1, 2, 3] + 4 + 5 + [6, 7]
  ↓
  [1, 2, 3, 4, 5, 6, 7]

最終状態:
  numbers = [1, 2, 3]（変更なし）
  result = [1, 2, 3, 4, 5, 6, 7]
```

**ポイント：**
- 配列は展開されて追加される
- 数値や文字列はそのまま追加される
- 何個でも引数を渡せる

---

## 2. 複数の配列を一つに

### 3つ以上の配列を結合

`concat()`は、3つ以上の配列も一度に結合できます：

```javascript
let array1 = [1, 2];
let array2 = [3, 4];
let array3 = [5, 6];

let result = array1.concat(array2, array3);
console.log(result);  // [1, 2, 3, 4, 5, 6]
```

**実行の流れ：**

```
ステップ1: 配列の準備
  array1 = [1, 2]
  array2 = [3, 4]
  array3 = [5, 6]

ステップ2: array1.concat(array2, array3)
  array1の要素: 1, 2
  array2の要素: 3, 4
  array3の要素: 5, 6
  ↓
  順番に結合

ステップ3: 結合の過程
  [1, 2] + [3, 4] → [1, 2, 3, 4]
  [1, 2, 3, 4] + [5, 6] → [1, 2, 3, 4, 5, 6]

最終結果:
  result = [1, 2, 3, 4, 5, 6]

元の配列:
  array1 = [1, 2]（変更なし）
  array2 = [3, 4]（変更なし）
  array3 = [5, 6]（変更なし）
```

カンマで区切って、何個でも引数を渡せます。

### メソッドチェーンで連続結合

新しい配列が返されるので、連続してメソッドを呼び出せます：

```javascript
let result = [1, 2]
  .concat([3, 4])
  .concat([5, 6])
  .concat([7, 8]);

console.log(result);  // [1, 2, 3, 4, 5, 6, 7, 8]
```

**実行の流れ：**

```
ステップ1: [1, 2].concat([3, 4])
  [1, 2] + [3, 4] → [1, 2, 3, 4]

ステップ2: [1, 2, 3, 4].concat([5, 6])
  [1, 2, 3, 4] + [5, 6] → [1, 2, 3, 4, 5, 6]

ステップ3: [1, 2, 3, 4, 5, 6].concat([7, 8])
  [1, 2, 3, 4, 5, 6] + [7, 8] → [1, 2, 3, 4, 5, 6, 7, 8]

最終結果:
  result = [1, 2, 3, 4, 5, 6, 7, 8]
```

**図解：メソッドチェーン**

```
[1, 2]
  ↓ .concat([3, 4])
[1, 2, 3, 4]
  ↓ .concat([5, 6])
[1, 2, 3, 4, 5, 6]
  ↓ .concat([7, 8])
[1, 2, 3, 4, 5, 6, 7, 8]
```

これを「メソッドチェーン」と呼びます。各メソッドが新しい配列を返すので、続けて次のメソッドを呼び出せます。

### 実用例：カテゴリ別データの統合

複数のカテゴリに分かれたデータを統合する例：

```javascript
let morningTasks = ["朝食", "掃除"];
let afternoonTasks = ["買い物", "勉強"];
let eveningTasks = ["夕食", "読書"];

let allTasks = morningTasks
  .concat(afternoonTasks)
  .concat(eveningTasks);

console.log(allTasks);
// ["朝食", "掃除", "買い物", "勉強", "夕食", "読書"]

console.log("今日のタスク: " + allTasks.length + "件");
// 今日のタスク: 6件
```

**実行の流れ：**

```
初期状態:
  morningTasks = ["朝食", "掃除"]
  afternoonTasks = ["買い物", "勉強"]
  eveningTasks = ["夕食", "読書"]

結合の過程:
  ステップ1: morningTasks.concat(afternoonTasks)
    ["朝食", "掃除"] + ["買い物", "勉強"]
    → ["朝食", "掃除", "買い物", "勉強"]

  ステップ2: .concat(eveningTasks)
    ["朝食", "掃除", "買い物", "勉強"] + ["夕食", "読書"]
    → ["朝食", "掃除", "買い物", "勉強", "夕食", "読書"]

最終結果:
  allTasks = ["朝食", "掃除", "買い物", "勉強", "夕食", "読書"]
  allTasks.length = 6
```

---

## 3. 新しい配列の作成（イミュータブル操作）

### 元の配列は変更されない

`concat()`は、新しい配列を作成して返します。元の配列は変更されません：

```javascript
let original = ["a", "b"];
let added = original.concat("c", "d");

console.log(original);  // ["a", "b"]（変更されていない）
console.log(added);     // ["a", "b", "c", "d"]
```

**実行の流れ：**

```
ステップ1: 元の配列
  配列A: ["a", "b"]
  original → 配列A

ステップ2: original.concat("c", "d")
  配列Aはそのまま
  新しい配列Bを作成: ["a", "b", "c", "d"]

ステップ3: 結果
  original → 配列A: ["a", "b"]（変更なし）
  added → 配列B: ["a", "b", "c", "d"]（新しい配列）
```

これは「イミュータブル（不変）操作」と呼ばれます。

### push()との違い

これは`push()`との大きな違いです：

```javascript
// push()は元の配列を変更する（ミュータブル操作）
let array1 = [1, 2];
array1.push(3);
console.log(array1);  // [1, 2, 3]（変更される）

// concat()は新しい配列を返す（イミュータブル操作）
let array2 = [1, 2];
let array3 = array2.concat(3);
console.log(array2);  // [1, 2]（変更されない）
console.log(array3);  // [1, 2, 3]（新しい配列）
```

**実行の流れの比較：**

```
【push()の場合】
初期状態:
  配列A: [1, 2]
  array1 → 配列A

array1.push(3):
  配列Aを直接変更: [1, 2, 3]

結果:
  array1 → 配列A: [1, 2, 3]（変更された）

【concat()の場合】
初期状態:
  配列A: [1, 2]
  array2 → 配列A

array2.concat(3):
  配列Aはそのまま
  新しい配列Bを作成: [1, 2, 3]

結果:
  array2 → 配列A: [1, 2]（変更なし）
  array3 → 配列B: [1, 2, 3]（新しい配列）
```

**図解：push()とconcat()の違い**

```
【push() - ミュータブル操作】
元の配列を直接変更:
  [1, 2]
    ↓ push(3)
  [1, 2, 3]（同じ配列が変更される）

【concat() - イミュータブル操作】
新しい配列を作成:
  [1, 2]（元の配列は保持）
    ↓ concat(3)
  [1, 2, 3]（新しい配列を作成）
```

### イミュータブル操作の利点

イミュータブル操作には多くの利点があります：

**1. 元のデータを保護**

```javascript
let originalScores = [80, 90, 85];
let bonusScores = originalScores.concat(95);

console.log(originalScores);  // [80, 90, 85]（元のデータが残る）
console.log(bonusScores);     // [80, 90, 85, 95]
```

**2. 予期しない変更を防ぐ**

```javascript
function addItem(list, item) {
  return list.concat(item);  // 元の配列を変更しない
}

let myList = ["a", "b"];
let newList = addItem(myList, "c");

console.log(myList);   // ["a", "b"]（元のまま）
console.log(newList);  // ["a", "b", "c"]
```

**実行の流れ：**

```
関数呼び出し前:
  配列A: ["a", "b"]
  myList → 配列A

関数内部:
  list.concat(item)
  配列A: ["a", "b"]（変更なし）
  新しい配列B: ["a", "b", "c"]
  return 配列B

関数呼び出し後:
  myList → 配列A: ["a", "b"]（保護されている）
  newList → 配列B: ["a", "b", "c"]
```

**3. 履歴管理が簡単**

```javascript
let history = [];
let current = [1, 2];

history.push([...current]);  // コピーを保存

current = current.concat(3);  // 新しい配列を作成
history.push([...current]);

console.log(history[0]);  // [1, 2]
console.log(history[1]);  // [1, 2, 3]
```

### メソッドチェーンとの相性

新しい配列が返されるので、他のメソッドと組み合わせやすい：

```javascript
let numbers = [1, 2, 3];

let result = numbers
  .concat([4, 5])      // [1, 2, 3, 4, 5]
  .concat([6, 7])      // [1, 2, 3, 4, 5, 6, 7]
  .filter(x => x > 3)  // [4, 5, 6, 7]
  .map(x => x * 2);    // [8, 10, 12, 14]

console.log(result);  // [8, 10, 12, 14]
console.log(numbers); // [1, 2, 3]（元のまま）
```

**実行の流れ：**

```
numbers = [1, 2, 3]
  ↓ .concat([4, 5])
[1, 2, 3, 4, 5]
  ↓ .concat([6, 7])
[1, 2, 3, 4, 5, 6, 7]
  ↓ .filter(x => x > 3)
[4, 5, 6, 7]
  ↓ .map(x => x * 2)
[8, 10, 12, 14]

元の配列は変更されない:
  numbers = [1, 2, 3]
```

---

## 4. スプレッド構文との比較

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

**実行の流れ：**

```
fruits = ["りんご", "バナナ"]
vegetables = ["にんじん", "トマト"]

スプレッド構文の展開:
  ...fruits → "りんご", "バナナ"
  ...vegetables → "にんじん", "トマト"

新しい配列の作成:
  [...fruits, ...vegetables]
  ↓
  ["りんご", "バナナ", "にんじん", "トマト"]
```

### 使い分けのポイント

どちらを使っても構いませんが、次のような使い分けができます：

**concat()が便利な場合：**

1. **メソッドチェーンを使いたい時**

```javascript
let result = array1
  .concat(array2)
  .concat(array3)
  .filter(x => x > 0)    // 他のメソッドに続けられる
  .map(x => x * 2);
```

2. **変数に入った配列を結合する時**

```javascript
let arrays = [[1, 2], [3, 4], [5, 6]];
let result = [].concat(...arrays);  // 配列の配列を平坦化
```

**スプレッド構文が便利な場合：**

1. **途中に要素を挿入したい時**

```javascript
let result = [0, ...array1, 100, ...array2, 200];
// 配列の前後や間に値を入れやすい
```

2. **より視覚的にわかりやすくしたい時**

```javascript
let morning = ["朝食"];
let afternoon = ["昼食"];
let evening = ["夕食"];

// スプレッド構文: 視覚的にわかりやすい
let meals = [...morning, ...afternoon, ...evening];

// concat(): メソッド呼び出しの連鎖
let meals = morning.concat(afternoon).concat(evening);
```

### 比較表

```
                concat()              スプレッド構文
記法            array1.concat(array2) [...array1, ...array2]
読みやすさ      メソッド形式          配列リテラル形式
チェーン        ○（得意）             △
途中挿入        △                     ○（得意）
パフォーマンス  ほぼ同じ              ほぼ同じ
```

**実践例：両方を使った比較**

```javascript
let array1 = [1, 2, 3];
let array2 = [4, 5, 6];
let array3 = [7, 8, 9];

// concat()を使った場合
let result1 = array1
  .concat(array2)
  .concat(array3);

// スプレッド構文を使った場合
let result2 = [...array1, ...array2, ...array3];

// 途中に要素を追加する場合はスプレッド構文が便利
let result3 = [0, ...array1, 99, ...array2, 99, ...array3];

console.log(result1);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(result2);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(result3);  // [0, 1, 2, 3, 99, 4, 5, 6, 99, 7, 8, 9]
```

両方とも覚えておくと便利です。

---

## 5. 実践例：タスクマネージャー

複数のカテゴリのタスクを管理するアプリを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>タスクマネージャー</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }
    .category {
      background: #f9f9f9;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
      border-left: 4px solid #4CAF50;
    }
    .category h2 {
      margin-top: 0;
      color: #333;
    }
    input {
      padding: 8px;
      font-size: 16px;
      width: 250px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      padding: 8px 16px;
      font-size: 16px;
      margin-left: 10px;
      cursor: pointer;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:hover {
      background: #45a049;
    }
    .list {
      margin-top: 15px;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      background: white;
      padding: 10px;
      margin: 5px 0;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    .all-tasks {
      background: #e8f5e9;
      border-left-color: #2196F3;
    }
    .count {
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <h1>タスクマネージャー</h1>

  <div class="category">
    <h2>📊 仕事</h2>
    <input type="text" id="workInput" placeholder="仕事タスク">
    <button id="addWork">追加</button>
    <div class="list" id="workList"></div>
  </div>

  <div class="category">
    <h2>🏠 プライベート</h2>
    <input type="text" id="privateInput" placeholder="プライベートタスク">
    <button id="addPrivate">追加</button>
    <div class="list" id="privateList"></div>
  </div>

  <div class="category all-tasks">
    <h2>📋 すべてのタスク</h2>
    <button id="showAll">すべて表示</button>
    <div class="list" id="allList"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### JavaScript

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
  // 2つの配列を結合（重要！）
  let allTasks = workTasks.concat(privateTasks);
  showAllList(allTasks);
});

function showWorkList() {
  if (workTasks.length === 0) {
    workListDiv.innerHTML = "<p class='count'>タスクなし</p>";
    return;
  }

  let html = "<p class='count'>仕事タスク: " + workTasks.length + "件</p>";
  html += "<ul>";
  for (let task of workTasks) {
    html += "<li>📊 " + task + "</li>";
  }
  html += "</ul>";
  workListDiv.innerHTML = html;
}

function showPrivateList() {
  if (privateTasks.length === 0) {
    privateListDiv.innerHTML = "<p class='count'>タスクなし</p>";
    return;
  }

  let html = "<p class='count'>プライベートタスク: " + privateTasks.length + "件</p>";
  html += "<ul>";
  for (let task of privateTasks) {
    html += "<li>🏠 " + task + "</li>";
  }
  html += "</ul>";
  privateListDiv.innerHTML = html;
}

function showAllList(allTasks) {
  if (allTasks.length === 0) {
    allListDiv.innerHTML = "<p class='count'>タスクなし</p>";
    return;
  }

  let html = "<p class='count'>全タスク: " + allTasks.length + "件</p>";
  html += "<ul>";

  // 仕事タスクを表示
  for (let task of workTasks) {
    html += "<li>📊 " + task + "</li>";
  }

  // プライベートタスクを表示
  for (let task of privateTasks) {
    html += "<li>🏠 " + task + "</li>";
  }

  html += "</ul>";
  allListDiv.innerHTML = html;
}

// 初期表示
showWorkList();
showPrivateList();
```

### 重要なポイント

**concat()の使用：**

```javascript
let allTasks = workTasks.concat(privateTasks);
```

**実行の流れ：**

```
例：
  workTasks = ["メール返信", "資料作成"]
  privateTasks = ["買い物", "読書"]

concat()実行:
  workTasks.concat(privateTasks)
  ↓
  ["メール返信", "資料作成"] + ["買い物", "読書"]
  ↓
  allTasks = ["メール返信", "資料作成", "買い物", "読書"]

元の配列は変更されない:
  workTasks = ["メール返信", "資料作成"]（そのまま）
  privateTasks = ["買い物", "読書"]（そのまま）

全タスクの件数:
  allTasks.length = 4
```

2つのカテゴリのタスクを1つの配列にまとめて、全体の件数を表示できます。

---

## 6. 配列結合機の作成

カリキュラムの成果物として、配列の結合を体験できる「配列結合機」を作りましょう。

### HTML

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>配列結合機</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }
    .demo-section {
      background: #f9f9f9;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
      border-left: 4px solid #4CAF50;
    }
    h3 {
      color: #555;
      margin-top: 0;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      margin: 5px;
      cursor: pointer;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:hover {
      background: #45a049;
    }
    .result {
      background: white;
      padding: 15px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: monospace;
      min-height: 30px;
      white-space: pre-wrap;
    }
    .comparison {
      background: #fff3cd;
      border-left-color: #ffc107;
    }
  </style>
</head>
<body>
  <h1>配列結合機</h1>

  <div class="demo-section">
    <h3>基本的な結合</h3>
    <button id="basicDemo">concat()を試す</button>
    <div class="result" id="basicResult"></div>
  </div>

  <div class="demo-section">
    <h3>複数配列の結合</h3>
    <button id="multipleDemo">3つの配列を結合</button>
    <div class="result" id="multipleResult"></div>
  </div>

  <div class="demo-section">
    <h3>メソッドチェーン</h3>
    <button id="chainDemo">チェーンで結合</button>
    <div class="result" id="chainResult"></div>
  </div>

  <div class="demo-section comparison">
    <h3>push()との比較</h3>
    <button id="compareDemo">違いを見る</button>
    <div class="result" id="compareResult"></div>
  </div>

  <div class="demo-section">
    <h3>スプレッド構文との比較</h3>
    <button id="spreadDemo">スプレッド構文で結合</button>
    <div class="result" id="spreadResult"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
// デモ1: 基本的な結合
document.getElementById("basicDemo").addEventListener("click", function() {
  let result = "";

  let fruits = ["りんご", "バナナ"];
  let vegetables = ["にんじん", "トマト"];

  result += "fruits = " + JSON.stringify(fruits) + "\n";
  result += "vegetables = " + JSON.stringify(vegetables) + "\n\n";

  let foods = fruits.concat(vegetables);

  result += "foods = fruits.concat(vegetables)\n";
  result += "結果: " + JSON.stringify(foods) + "\n\n";

  result += "元の配列は変更されない:\n";
  result += "fruits = " + JSON.stringify(fruits) + "\n";
  result += "vegetables = " + JSON.stringify(vegetables);

  document.getElementById("basicResult").innerText = result;
});

// デモ2: 複数配列の結合
document.getElementById("multipleDemo").addEventListener("click", function() {
  let result = "";

  let array1 = [1, 2];
  let array2 = [3, 4];
  let array3 = [5, 6];

  result += "array1 = " + JSON.stringify(array1) + "\n";
  result += "array2 = " + JSON.stringify(array2) + "\n";
  result += "array3 = " + JSON.stringify(array3) + "\n\n";

  let combined = array1.concat(array2, array3);

  result += "combined = array1.concat(array2, array3)\n";
  result += "結果: " + JSON.stringify(combined) + "\n\n";

  result += "元の配列:\n";
  result += "array1 = " + JSON.stringify(array1) + "\n";
  result += "array2 = " + JSON.stringify(array2) + "\n";
  result += "array3 = " + JSON.stringify(array3);

  document.getElementById("multipleResult").innerText = result;
});

// デモ3: メソッドチェーン
document.getElementById("chainDemo").addEventListener("click", function() {
  let result = "";

  result += "メソッドチェーンで連続結合:\n\n";
  result += "[1, 2]\n";
  result += "  .concat([3, 4])\n";
  result += "  .concat([5, 6])\n";
  result += "  .concat([7, 8])\n\n";

  let chained = [1, 2]
    .concat([3, 4])
    .concat([5, 6])
    .concat([7, 8]);

  result += "結果: " + JSON.stringify(chained);

  document.getElementById("chainResult").innerText = result;
});

// デモ4: push()との比較
document.getElementById("compareDemo").addEventListener("click", function() {
  let result = "";

  result += "【push()の場合 - 元の配列を変更】\n";
  let array1 = [1, 2];
  result += "array1 = [1, 2]\n";
  array1.push(3);
  result += "array1.push(3)\n";
  result += "array1 = " + JSON.stringify(array1) + " ← 変更される\n\n";

  result += "【concat()の場合 - 新しい配列を作成】\n";
  let array2 = [1, 2];
  result += "array2 = [1, 2]\n";
  let array3 = array2.concat(3);
  result += "array3 = array2.concat(3)\n";
  result += "array2 = " + JSON.stringify(array2) + " ← 変更されない\n";
  result += "array3 = " + JSON.stringify(array3) + " ← 新しい配列";

  document.getElementById("compareResult").innerText = result;
});

// デモ5: スプレッド構文との比較
document.getElementById("spreadDemo").addEventListener("click", function() {
  let result = "";

  let fruits = ["りんご", "バナナ"];
  let vegetables = ["にんじん", "トマト"];

  result += "【concat()を使った場合】\n";
  let foods1 = fruits.concat(vegetables);
  result += "foods1 = fruits.concat(vegetables)\n";
  result += "結果: " + JSON.stringify(foods1) + "\n\n";

  result += "【スプレッド構文を使った場合】\n";
  let foods2 = [...fruits, ...vegetables];
  result += "foods2 = [...fruits, ...vegetables]\n";
  result += "結果: " + JSON.stringify(foods2) + "\n\n";

  result += "【途中に要素を追加（スプレッド構文が便利）】\n";
  let foods3 = ["朝食", ...fruits, "昼食", ...vegetables];
  result += "foods3 = [\"朝食\", ...fruits, \"昼食\", ...vegetables]\n";
  result += "結果: " + JSON.stringify(foods3);

  document.getElementById("spreadResult").innerText = result;
});
```

### 動作の説明

**基本的な結合デモ：**
```
fruits = ["りんご", "バナナ"]
vegetables = ["にんじん", "トマト"]
  ↓ concat()
foods = ["りんご", "バナナ", "にんじん", "トマト"]

元の配列は変更されない
```

**複数配列の結合デモ：**
```
array1 = [1, 2]
array2 = [3, 4]
array3 = [5, 6]
  ↓ concat(array2, array3)
combined = [1, 2, 3, 4, 5, 6]
```

**メソッドチェーンデモ：**
```
[1, 2]
  ↓ .concat([3, 4])
[1, 2, 3, 4]
  ↓ .concat([5, 6])
[1, 2, 3, 4, 5, 6]
  ↓ .concat([7, 8])
[1, 2, 3, 4, 5, 6, 7, 8]
```

**push()との比較デモ：**
```
push(): 元の配列を変更（ミュータブル）
concat(): 新しい配列を作成（イミュータブル）
```

**スプレッド構文との比較デモ：**
```
concat(): メソッド形式
スプレッド構文: 配列リテラル形式
途中に要素を追加する場合はスプレッド構文が便利
```

---

## 7. 練習問題

配列の結合を使った「メニュー管理システム」を作成してください。

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

// 各カテゴリに追加
appetizers.push("サラダ");
mains.push("ステーキ");
desserts.push("アイス");

// フルコースを作成
let fullCourse = appetizers
  .concat(mains)
  .concat(desserts);

// 合計数
let total = fullCourse.length;

// 表示
console.log("前菜: " + appetizers.length + "品");
console.log("メイン: " + mains.length + "品");
console.log("デザート: " + desserts.length + "品");
console.log("合計: " + total + "品");
```

### 発展課題

1. スプレッド構文を使ったバージョンも作成する
2. カテゴリごとに異なる絵文字を表示する
3. 「クリア」ボタンで全メニューを空にする

---

## まとめ

今回は、配列の結合について学びました。

### 学んだこと

**1. concat()メソッド**
- 複数の配列を1つにまとめる
- `array1.concat(array2)`で結合
- 配列と値を混ぜて渡せる

**2. 複数配列を一つに**
- 3つ以上の配列も一度に結合できる
- `array1.concat(array2, array3)`
- メソッドチェーンで連続結合も可能

**3. 新しい配列作成（イミュータブル操作）**
- 元の配列は変更されない
- 新しい配列が返される
- `push()`との大きな違い

**4. スプレッド構文との比較**
- `[...array1, ...array2]`でも結合可能
- メソッドチェーンなら`concat()`
- 途中挿入ならスプレッド構文

### 重要なポイント

```javascript
// concat()はイミュータブル操作
let array1 = [1, 2];
let array2 = array1.concat(3);
console.log(array1);  // [1, 2]（変更されない）
console.log(array2);  // [1, 2, 3]（新しい配列）

// 複数の配列を結合
let result = array1.concat(array2, array3);

// メソッドチェーン
let result = [1, 2]
  .concat([3, 4])
  .concat([5, 6]);
```

### カリキュラムの要件チェック

- ✅ concat()メソッド - 基本的な使い方、複数引数、メソッドチェーン
- ✅ 複数配列を一つに - 3つ以上の配列の結合、実用例
- ✅ 新しい配列作成 - イミュータブル操作、push()との違い
- ✅ 【知識】配列の結合 - concat()とスプレッド構文の比較
- ✅ 【知識】イミュータブル操作 - 元の配列を変更しない利点
- ✅ 成果物：配列結合機 - 5つのデモ（基本、複数、チェーン、比較、スプレッド）

### 次のレッスンの予告

次のレッスンでは、週のプロジェクトとして「単語帳アプリ」を作成します：

- 配列を使ったデータ管理
- 追加・削除・検索機能
- これまで学んだ配列操作の総復習

配列の知識を総動員して、実用的なアプリを作りましょう。
