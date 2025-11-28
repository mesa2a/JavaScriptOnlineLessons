---
title: "レッスン104：オブジェクト配列"
author: "JavaScript Online Lessons"
date: "2025-11-26"
---

# レッスン104：オブジェクト配列

## このレッスンで学ぶこと

### 前回の復習

前回のレッスン103では、タスクの削除機能を学びました：

```javascript
// 削除の基本パターン
deleteButton.addEventListener("click", function() {
  tasks.splice(i, 1);  // 配列から削除
  showTasks();         // 画面を更新
});
```

しかし、これまでのタスクは単純な文字列の配列でした：

```javascript
let tasks = ["買い物", "掃除", "洗濯"];
```

実際のアプリケーションでは、各タスクに「ID」「優先度」「完了状態」など、複数の情報を持たせたいことがよくあります。

### よくある場面

実際のアプリケーションでは、以下のような「複雑なデータ」が必要です：

1. **TODOリストアプリ**
   - タスク名だけでなく、ID、優先度、完了状態も管理したい
   - 各タスクを一意に識別したい
   - 追加した日時を記録したい

2. **商品管理アプリ**
   - 商品名、価格、在庫数、カテゴリを管理
   - 商品ごとに複数の属性を持つ
   - 検索や並び替えをしたい

3. **ユーザー管理アプリ**
   - 名前、メールアドレス、年齢、住所など
   - ユーザーごとに複数の情報を管理
   - 更新や削除が簡単にできる

### 学習目標

このレッスンでは、以下の技術を習得します：

1. **オブジェクトの基本**: プロパティと値の理解
2. **オブジェクト配列**: `[{id: 1, text: "買い物"}]` の形式
3. **プロパティアクセス**: ドット記法とブラケット記法
4. **構造化データの操作**: 追加、表示、削除、更新
5. **ID管理**: 一意な識別子を使った安全な操作

---

## 1. オブジェクトの基本

### 1.1 オブジェクトとは？

オブジェクトは、複数の情報を1つにまとめたデータ構造です：

```javascript
// 単純な値
let taskName = "買い物";

// オブジェクト（複数の情報をまとめる）
let task = {
  id: 1,
  text: "買い物",
  priority: "高"
};
```

**視覚的な比較:**

```
単純な文字列:
  "買い物"
  ↑ 情報は1つだけ

オブジェクト:
  {
    id: 1,           ← プロパティ: 値
    text: "買い物",  ← プロパティ: 値
    priority: "高"   ← プロパティ: 値
  }
  ↑ 複数の情報をまとめて管理
```

### 1.2 オブジェクトの構文

```javascript
let person = {
  name: "太郎",    // プロパティ名: 値
  age: 25,
  city: "東京"
};
```

**構文の説明:**

```
{ } ← 中括弧でオブジェクトを作る

プロパティ名: 値, ← カンマで区切る
プロパティ名: 値,
プロパティ名: 値  ← 最後はカンマ不要（付けても良い）

例:
{
  name: "太郎",   ← name というプロパティに "太郎" という値
  age: 25,        ← age というプロパティに 25 という値
  city: "東京"    ← city というプロパティに "東京" という値
}
```

### 1.3 プロパティへのアクセス

オブジェクトのプロパティにアクセスする方法は2つあります：

**方法1: ドット記法（推奨）**

```javascript
let person = {
  name: "太郎",
  age: 25
};

console.log(person.name);  // "太郎"
console.log(person.age);   // 25
```

**方法2: ブラケット記法**

```javascript
console.log(person["name"]);  // "太郎"
console.log(person["age"]);   // 25
```

**実行フローの詳細:**

```
person = {
  name: "太郎",
  age: 25
}

person.name にアクセス:
  Step 1: person オブジェクトを見る
  Step 2: name プロパティを探す
  Step 3: 値 "太郎" を取得

  → "太郎" が返される

person.age にアクセス:
  Step 1: person オブジェクトを見る
  Step 2: age プロパティを探す
  Step 3: 値 25 を取得

  → 25 が返される
```

**どちらを使うべきか？**

```
ドット記法 (推奨):
  person.name
  ✓ 読みやすい
  ✓ 書きやすい
  ✓ 多くの場合これを使う

ブラケット記法:
  person["name"]
  ✓ プロパティ名に変数を使える
  ✓ プロパティ名にスペースや特殊文字がある場合

  例:
  let propertyName = "name";
  person[propertyName]  // 変数を使う場合
```

---

## 2. オブジェクト配列とは

### 2.1 配列の中にオブジェクトを入れる

複数のオブジェクトを配列で管理します：

```javascript
let tasks = [
  { id: 1, text: "買い物" },
  { id: 2, text: "掃除" },
  { id: 3, text: "洗濯" }
];
```

**構造の視覚化:**

```
配列:
tasks = [
  { id: 1, text: "買い物" },  ← インデックス0のオブジェクト
  { id: 2, text: "掃除" },    ← インデックス1のオブジェクト
  { id: 3, text: "洗濯" }     ← インデックス2のオブジェクト
]

詳細:
tasks[0] = { id: 1, text: "買い物" }
  ↓
  tasks[0].id = 1
  tasks[0].text = "買い物"

tasks[1] = { id: 2, text: "掃除" }
  ↓
  tasks[1].id = 2
  tasks[1].text = "掃除"

tasks[2] = { id: 3, text: "洗濯" }
  ↓
  tasks[2].id = 3
  tasks[2].text = "洗濯"
```

### 2.2 オブジェクト配列へのアクセス

```javascript
let tasks = [
  { id: 1, text: "買い物" },
  { id: 2, text: "掃除" },
  { id: 3, text: "洗濯" }
];

// 配列の要素にアクセス
console.log(tasks[0]);        // { id: 1, text: "買い物" }

// オブジェクトのプロパティにアクセス
console.log(tasks[0].id);     // 1
console.log(tasks[0].text);   // "買い物"

console.log(tasks[1].id);     // 2
console.log(tasks[1].text);   // "掃除"
```

**アクセスの2段階:**

```
Step 1: 配列のインデックスでオブジェクトを取得
  tasks[0]
  → { id: 1, text: "買い物" }

Step 2: プロパティでデータを取得
  tasks[0].text
  → "買い物"

視覚的な説明:
tasks[0].text
  ↑    ↑
  配列  オブジェクトの
  添字  プロパティ

処理の流れ:
  tasks[0] → { id: 1, text: "買い物" }
  { id: 1, text: "買い物" }.text → "買い物"
```

### 2.3 文字列配列との比較

```javascript
// 文字列配列（これまでの方法）
let tasks1 = ["買い物", "掃除", "洗濯"];

console.log(tasks1[0]);       // "買い物"
// ↑ タスク名しか分からない


// オブジェクト配列（新しい方法）
let tasks2 = [
  { id: 1, text: "買い物", priority: "高" },
  { id: 2, text: "掃除", priority: "中" },
  { id: 3, text: "洗濯", priority: "低" }
];

console.log(tasks2[0]);       // { id: 1, text: "買い物", priority: "高" }
console.log(tasks2[0].id);    // 1
console.log(tasks2[0].text);  // "買い物"
console.log(tasks2[0].priority); // "高"
// ↑ 複数の情報が管理できる
```

**視覚的な比較:**

```
文字列配列:
┌─────┬─────┬─────┐
│  0  │  1  │  2  │
├─────┼─────┼─────┤
│買い物│掃除 │洗濯 │
└─────┴─────┴─────┘
↑ 1つの情報のみ

オブジェクト配列:
┌─────────────────────────┐
│ 0: { id: 1,             │
│      text: "買い物",    │
│      priority: "高" }   │
├─────────────────────────┤
│ 1: { id: 2,             │
│      text: "掃除",      │
│      priority: "中" }   │
├─────────────────────────┤
│ 2: { id: 3,             │
│      text: "洗濯",      │
│      priority: "低" }   │
└─────────────────────────┘
↑ 複数の情報を管理
```

---

## 3. オブジェクト配列の操作

### 3.1 オブジェクトの追加

```javascript
let tasks = [];
let nextId = 1;

// 新しいタスクを追加
let newTask = {
  id: nextId,
  text: "買い物"
};

tasks.push(newTask);
nextId++;  // 次のIDをインクリメント
```

**実行フローの詳細:**

```
初期状態:
tasks = []
nextId = 1

Step 1: オブジェクトを作成
  newTask = {
    id: 1,
    text: "買い物"
  }

Step 2: 配列に追加
  tasks.push(newTask)
  → tasks = [
       { id: 1, text: "買い物" }
     ]

Step 3: nextIdをインクリメント
  nextId++
  → nextId = 2


2つ目のタスクを追加:

Step 1: オブジェクトを作成
  newTask = {
    id: 2,
    text: "掃除"
  }

Step 2: 配列に追加
  tasks.push(newTask)
  → tasks = [
       { id: 1, text: "買い物" },
       { id: 2, text: "掃除" }
     ]

Step 3: nextIdをインクリメント
  nextId++
  → nextId = 3
```

**より簡潔な書き方:**

```javascript
// オブジェクトを直接push()に渡す
tasks.push({
  id: nextId,
  text: "買い物"
});
nextId++;
```

### 3.2 オブジェクト配列のループ

**方法1: 通常のforループ**

```javascript
let tasks = [
  { id: 1, text: "買い物" },
  { id: 2, text: "掃除" },
  { id: 3, text: "洗濯" }
];

for (let i = 0; i < tasks.length; i++) {
  let task = tasks[i];
  console.log(task.id + ": " + task.text);
}
```

**実行フロー:**

```
tasks = [
  { id: 1, text: "買い物" },
  { id: 2, text: "掃除" },
  { id: 3, text: "洗濯" }
]

ループ1回目 (i = 0):
  task = tasks[0]
  → task = { id: 1, text: "買い物" }

  task.id = 1
  task.text = "買い物"

  console.log("1: 買い物")

ループ2回目 (i = 1):
  task = tasks[1]
  → task = { id: 2, text: "掃除" }

  task.id = 2
  task.text = "掃除"

  console.log("2: 掃除")

ループ3回目 (i = 2):
  task = tasks[2]
  → task = { id: 3, text: "洗濯" }

  task.id = 3
  task.text = "洗濯"

  console.log("3: 洗濯")

出力:
  1: 買い物
  2: 掃除
  3: 洗濯
```

**方法2: for...ofループ**

```javascript
for (let task of tasks) {
  console.log(task.id + ": " + task.text);
}
```

**実行フロー:**

```
ループ1回目:
  task = { id: 1, text: "買い物" }
  console.log("1: 買い物")

ループ2回目:
  task = { id: 2, text: "掃除" }
  console.log("2: 掃除")

ループ3回目:
  task = { id: 3, text: "洗濯" }
  console.log("3: 洗濯")
```

### 3.3 IDでオブジェクトを探す

```javascript
let tasks = [
  { id: 1, text: "買い物" },
  { id: 2, text: "掃除" },
  { id: 3, text: "洗濯" }
];

// id: 2 のタスクを探す
function findTaskById(id) {
  for (let task of tasks) {
    if (task.id === id) {
      return task;
    }
  }
  return null;  // 見つからなかった
}

let found = findTaskById(2);
console.log(found);  // { id: 2, text: "掃除" }
```

**実行フローの詳細:**

```
tasks = [
  { id: 1, text: "買い物" },
  { id: 2, text: "掃除" },
  { id: 3, text: "洗濯" }
]

findTaskById(2) を呼ぶ:

ループ1回目:
  task = { id: 1, text: "買い物" }

  if (task.id === id)
  → if (1 === 2)
  → false
  → 次のループへ

ループ2回目:
  task = { id: 2, text: "掃除" }

  if (task.id === id)
  → if (2 === 2)
  → true
  → return task

  関数が終了:
    return { id: 2, text: "掃除" }

結果:
found = { id: 2, text: "掃除" }
```

**findIndex()を使う方法（より簡潔）:**

```javascript
let index = tasks.findIndex(task => task.id === 2);
console.log(index);  // 1

if (index !== -1) {
  console.log(tasks[index]);  // { id: 2, text: "掃除" }
}
```

### 3.4 IDでオブジェクトを削除

```javascript
function deleteTaskById(id) {
  let index = tasks.findIndex(task => task.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);
    return true;  // 削除成功
  }

  return false;  // 削除失敗（見つからなかった）
}

deleteTaskById(2);  // id: 2 のタスクを削除
```

**実行フローの詳細:**

```
初期状態:
tasks = [
  { id: 1, text: "買い物" },
  { id: 2, text: "掃除" },
  { id: 3, text: "洗濯" }
]

deleteTaskById(2) を呼ぶ:

Step 1: findIndex()で検索
  tasks.findIndex(task => task.id === 2)

  処理:
    task = { id: 1, text: "買い物" }
    → task.id === 2 → 1 === 2 → false

    task = { id: 2, text: "掃除" }
    → task.id === 2 → 2 === 2 → true
    → インデックス 1 を返す

  index = 1

Step 2: 条件チェック
  if (index !== -1)
  → if (1 !== -1)
  → true

Step 3: 削除
  tasks.splice(1, 1)

  削除前:
    [
      { id: 1, text: "買い物" },
      { id: 2, text: "掃除" },    ← これを削除
      { id: 3, text: "洗濯" }
    ]

  削除後:
    [
      { id: 1, text: "買い物" },
      { id: 3, text: "洗濯" }
    ]

Step 4: return true
  削除成功

最終状態:
tasks = [
  { id: 1, text: "買い物" },
  { id: 3, text: "洗濯" }
]
```

### 3.5 オブジェクトのプロパティを更新

```javascript
let tasks = [
  { id: 1, text: "買い物", completed: false },
  { id: 2, text: "掃除", completed: false }
];

// id: 1 のタスクを完了にする
let task = tasks.find(task => task.id === 1);
if (task) {
  task.completed = true;
}

console.log(tasks);
// [
//   { id: 1, text: "買い物", completed: true },
//   { id: 2, text: "掃除", completed: false }
// ]
```

**実行フローの詳細:**

```
初期状態:
tasks = [
  { id: 1, text: "買い物", completed: false },
  { id: 2, text: "掃除", completed: false }
]

Step 1: find()でオブジェクトを検索
  tasks.find(task => task.id === 1)

  処理:
    task = { id: 1, text: "買い物", completed: false }
    → task.id === 1 → true
    → このオブジェクトを返す

  task = { id: 1, text: "買い物", completed: false }

Step 2: 条件チェック
  if (task)
  → if (オブジェクトが存在する)
  → true

Step 3: プロパティを更新
  task.completed = true

  更新前:
    task = { id: 1, text: "買い物", completed: false }

  更新後:
    task = { id: 1, text: "買い物", completed: true }

重要: find()は元の配列のオブジェクトへの参照を返すので、
      taskを変更すると、tasks配列の中のオブジェクトも変わる

最終状態:
tasks = [
  { id: 1, text: "買い物", completed: true },  ← 変わった
  { id: 2, text: "掃除", completed: false }
]
```

---

## 4. ID管理の重要性

### 4.1 なぜIDが必要なのか？

インデックスだけでは問題が起こる場合があります：

```javascript
// インデックスだけで管理（問題あり）
let tasks = ["買い物", "掃除", "洗濯"];

// インデックス1を削除
tasks.splice(1, 1);
// → ["買い物", "洗濯"]

// 問題: インデックスが変わってしまう
// "洗濯"は元々インデックス2だったが、今はインデックス1
```

IDを使うと、削除や並べ替えをしても一意に識別できます：

```javascript
// IDで管理（安全）
let tasks = [
  { id: 1, text: "買い物" },
  { id: 2, text: "掃除" },
  { id: 3, text: "洗濯" }
];

// id: 2 を削除
let index = tasks.findIndex(task => task.id === 2);
tasks.splice(index, 1);

// → [ { id: 1, text: "買い物" }, { id: 3, text: "洗濯" } ]
// id: 3 は変わらないので、常に一意に識別できる
```

**視覚的な比較:**

```
インデックスのみ:
削除前:
  index:0   index:1   index:2
  買い物    掃除      洗濯

削除後 (index:1を削除):
  index:0   index:1
  買い物    洗濯
           ↑ インデックスが変わった!

IDあり:
削除前:
  id:1      id:2      id:3
  買い物    掃除      洗濯

削除後 (id:2を削除):
  id:1      id:3
  買い物    洗濯
           ↑ IDは変わらない
```

### 4.2 ID生成のパターン

**パターン1: インクリメント方式**

```javascript
let tasks = [];
let nextId = 1;

function addTask(text) {
  tasks.push({
    id: nextId,
    text: text
  });
  nextId++;
}

addTask("買い物");  // id: 1
addTask("掃除");    // id: 2
addTask("洗濯");    // id: 3
```

**パターン2: Date.now()を使う方式**

```javascript
function addTask(text) {
  tasks.push({
    id: Date.now(),  // 現在時刻のミリ秒
    text: text
  });
}

addTask("買い物");  // id: 1732614123456 など
```

**実行フローの比較:**

```
パターン1: インクリメント
  初期: nextId = 1

  addTask("買い物"):
    id = 1
    nextId = 2

  addTask("掃除"):
    id = 2
    nextId = 3

  結果:
    [ { id: 1, ... }, { id: 2, ... } ]
    ↑ 連番で分かりやすい

パターン2: Date.now()
  addTask("買い物"):
    id = 1732614123456

  addTask("掃除"):
    id = 1732614123789

  結果:
    [ { id: 1732614123456, ... }, { id: 1732614123789, ... } ]
    ↑ 数字が大きいが、絶対に重複しない
```

---

## 5. 実践例：完全なTODOリストアプリ

オブジェクト配列を使った完全なTODOリストを作成しましょう。

### HTML

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>TODOリスト - オブジェクト配列版</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    h1 {
      color: #333;
    }
    .input-section {
      background-color: white;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    input[type="text"] {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      width: 250px;
    }
    select {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      margin-left: 10px;
    }
    button {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      margin-left: 10px;
    }
    button:hover {
      background-color: #45a049;
    }
    .task-item {
      display: flex;
      align-items: center;
      padding: 15px;
      margin: 10px 0;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .task-id {
      color: #999;
      font-size: 12px;
      margin-right: 10px;
      min-width: 40px;
    }
    .task-content {
      flex-grow: 1;
    }
    .task-text {
      font-size: 16px;
      color: #333;
      display: block;
      margin-bottom: 5px;
    }
    .task-priority {
      font-size: 12px;
      padding: 3px 8px;
      border-radius: 3px;
      display: inline-block;
    }
    .priority-high {
      background-color: #ffebee;
      color: #c62828;
    }
    .priority-medium {
      background-color: #fff3e0;
      color: #e65100;
    }
    .priority-low {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    .delete-button {
      background-color: #e74c3c;
      padding: 8px 16px;
      font-size: 14px;
    }
    .delete-button:hover {
      background-color: #c0392b;
    }
    .empty-message {
      text-align: center;
      color: #999;
      font-style: italic;
      padding: 40px;
      background-color: white;
      border-radius: 8px;
    }
    .summary {
      background-color: #e3f2fd;
      padding: 15px;
      margin: 20px 0;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <h1>📋 TODOリスト</h1>

  <div class="input-section">
    <input type="text" id="taskInput" placeholder="タスクを入力">
    <select id="prioritySelect">
      <option value="高">高</option>
      <option value="中" selected>中</option>
      <option value="低">低</option>
    </select>
    <button id="addButton">追加</button>
  </div>

  <div class="summary">
    <p>タスク数: <strong><span id="taskCount">0</span>件</strong></p>
  </div>

  <div id="taskList"></div>

  <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
// オブジェクト配列でタスクを管理
let tasks = [];
let nextId = 1;

let taskInput = document.getElementById("taskInput");
let prioritySelect = document.getElementById("prioritySelect");
let addButton = document.getElementById("addButton");
let taskCount = document.getElementById("taskCount");
let taskList = document.getElementById("taskList");

// タスクを追加
addButton.addEventListener("click", function() {
  let text = taskInput.value.trim();
  let priority = prioritySelect.value;

  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  // オブジェクトを作成して追加
  let newTask = {
    id: nextId,
    text: text,
    priority: priority
  };

  tasks.push(newTask);
  nextId++;

  showTasks();

  taskInput.value = "";
  taskInput.focus();
});

// Enterキーで追加
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

// タスクを表示
function showTasks() {
  taskList.replaceChildren();
  taskCount.textContent = tasks.length;

  if (tasks.length === 0) {
    let empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "タスクがありません";
    taskList.appendChild(empty);
    return;
  }

  for (let task of tasks) {
    let item = document.createElement("div");
    item.className = "task-item";

    // ID表示
    let id = document.createElement("span");
    id.className = "task-id";
    id.textContent = "#" + task.id;

    // コンテンツ
    let content = document.createElement("div");
    content.className = "task-content";

    let text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    let priority = document.createElement("span");
    priority.className = "task-priority";

    // 優先度に応じてアイコンとクラスを設定
    let icon = "";
    if (task.priority === "高") {
      icon = "🔴 ";
      priority.classList.add("priority-high");
    } else if (task.priority === "中") {
      icon = "🟡 ";
      priority.classList.add("priority-medium");
    } else {
      icon = "🟢 ";
      priority.classList.add("priority-low");
    }

    priority.textContent = icon + task.priority;

    content.appendChild(text);
    content.appendChild(priority);

    // 削除ボタン
    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function() {
      if (confirm("「" + task.text + "」を削除しますか？")) {
        deleteTaskById(task.id);
      }
    });

    item.appendChild(id);
    item.appendChild(content);
    item.appendChild(deleteButton);

    taskList.appendChild(item);
  }
}

// IDでタスクを削除
function deleteTaskById(id) {
  let index = tasks.findIndex(task => task.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);
    showTasks();
  }
}

// 初期表示
showTasks();
taskInput.focus();
```

### アプリケーションの動作フロー

```
初期状態:
tasks = []
nextId = 1

画面表示:
┌─────────────────────────────────┐
│ 📋 TODOリスト                   │
├─────────────────────────────────┤
│ [タスクを入力] [中▼] [追加]    │
├─────────────────────────────────┤
│ タスク数: 0件                   │
├─────────────────────────────────┤
│ タスクがありません              │
└─────────────────────────────────┘

ユーザー操作1: タスク追加
  入力: "買い物"
  優先度: "高"
  [追加]クリック

処理:
  text = "買い物"
  priority = "高"

  newTask = {
    id: 1,
    text: "買い物",
    priority: "高"
  }

  tasks.push(newTask)
  → tasks = [
       { id: 1, text: "買い物", priority: "高" }
     ]

  nextId++
  → nextId = 2

  showTasks()

表示:
┌─────────────────────────────────┐
│ タスク数: 1件                   │
├─────────────────────────────────┤
│ #1  買い物                      │
│     🔴 高            [削除]     │
└─────────────────────────────────┘

ユーザー操作2: さらに追加
  入力: "掃除"
  優先度: "中"

結果:
  tasks = [
    { id: 1, text: "買い物", priority: "高" },
    { id: 2, text: "掃除", priority: "中" }
  ]
  nextId = 3

表示:
┌─────────────────────────────────┐
│ タスク数: 2件                   │
├─────────────────────────────────┤
│ #1  買い物                      │
│     🔴 高            [削除]     │
├─────────────────────────────────┤
│ #2  掃除                        │
│     🟡 中            [削除]     │
└─────────────────────────────────┘

ユーザー操作3: 削除
  #1の[削除]ボタンをクリック

確認:
  confirm("「買い物」を削除しますか？")
  → OK

処理:
  deleteTaskById(1)

  Step 1: findIndex()で検索
    tasks.findIndex(task => task.id === 1)
    → index = 0

  Step 2: 削除
    tasks.splice(0, 1)
    → tasks = [
         { id: 2, text: "掃除", priority: "中" }
       ]

  Step 3: showTasks()

最終表示:
┌─────────────────────────────────┐
│ タスク数: 1件                   │
├─────────────────────────────────┤
│ #2  掃除                        │
│     🟡 中            [削除]     │
└─────────────────────────────────┘
  ↑ ID: 2 は変わらない
```

### このコードのポイント

```
1. オブジェクト配列
   ┌──────────────────────────┐
   │ { id, text, priority }   │
   │ 複数の情報を1つに        │
   │ プロパティでアクセス     │
   └──────────────────────────┘

2. ID管理
   ┌──────────────────────────┐
   │ nextId でインクリメント  │
   │ 一意な識別子             │
   │ 削除後も変わらない       │
   └──────────────────────────┘

3. findIndex()で検索
   ┌──────────────────────────┐
   │ IDで要素を探す           │
   │ インデックスを返す       │
   │ -1 は見つからない        │
   └──────────────────────────┘

4. プロパティアクセス
   ┌──────────────────────────┐
   │ task.id                  │
   │ task.text                │
   │ task.priority            │
   └──────────────────────────┘

5. for...of ループ
   ┌──────────────────────────┐
   │ 各オブジェクトを取得     │
   │ プロパティに直接アクセス │
   │ シンプルで読みやすい     │
   └──────────────────────────┘
```

---

## 6. 練習問題

「学生管理アプリ」を作成してください。

### 要件

1. 学生名と点数を入力して追加できる
2. 各学生にIDが自動的に割り振られる
3. 学生の一覧を表示（ID、名前、点数）
4. IDで学生を削除できる
5. 平均点を表示する

### ヒント

```javascript
let students = [];
let nextId = 1;

// 追加
function addStudent(name, score) {
  students.push({
    id: nextId,
    name: name,
    score: score
  });
  nextId++;
  showStudents();
}

// 表示
function showStudents() {
  container.replaceChildren();

  let totalScore = 0;

  for (let student of students) {
    totalScore += student.score;

    // 学生を表示
    let div = document.createElement("div");
    div.textContent = `#${student.id} ${student.name}: ${student.score}点`;

    // 削除ボタン
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", function() {
      deleteStudentById(student.id);
    });

    div.appendChild(deleteButton);
    container.appendChild(div);
  }

  // 平均点
  let average = students.length > 0 ? totalScore / students.length : 0;
  averageElement.textContent = average.toFixed(1) + "点";
}

// 削除
function deleteStudentById(id) {
  let index = students.findIndex(student => student.id === id);
  if (index !== -1) {
    students.splice(index, 1);
    showStudents();
  }
}
```

### 解答例の実行フロー

```
初期状態:
students = []
nextId = 1

addStudent("太郎", 85):
  students = [
    { id: 1, name: "太郎", score: 85 }
  ]
  nextId = 2

addStudent("花子", 92):
  students = [
    { id: 1, name: "太郎", score: 85 },
    { id: 2, name: "花子", score: 92 }
  ]
  nextId = 3

addStudent("次郎", 78):
  students = [
    { id: 1, name: "太郎", score: 85 },
    { id: 2, name: "花子", score: 92 },
    { id: 3, name: "次郎", score: 78 }
  ]
  nextId = 4

showStudents():
  totalScore = 0

  ループ1回目:
    student = { id: 1, name: "太郎", score: 85 }
    totalScore = 0 + 85 = 85
    表示: "#1 太郎: 85点 [削除]"

  ループ2回目:
    student = { id: 2, name: "花子", score: 92 }
    totalScore = 85 + 92 = 177
    表示: "#2 花子: 92点 [削除]"

  ループ3回目:
    student = { id: 3, name: "次郎", score: 78 }
    totalScore = 177 + 78 = 255
    表示: "#3 次郎: 78点 [削除]"

  平均点計算:
    average = 255 / 3 = 85.0
    表示: "平均点: 85.0点"

画面表示:
  #1 太郎: 85点 [削除]
  #2 花子: 92点 [削除]
  #3 次郎: 78点 [削除]
  ─────────────────
  平均点: 85.0点

deleteStudentById(2):
  findIndex(student => student.id === 2)
  → index = 1

  students.splice(1, 1)
  → students = [
       { id: 1, name: "太郎", score: 85 },
       { id: 3, name: "次郎", score: 78 }
     ]

  showStudents()

  平均点:
    (85 + 78) / 2 = 81.5

更新後の表示:
  #1 太郎: 85点 [削除]
  #3 次郎: 78点 [削除]
  ─────────────────
  平均点: 81.5点
```

---

## 7. ケーススタディ1: 商品管理アプリ

複数のプロパティを持つ商品を管理するアプリを作りましょう。

```javascript
let products = [];
let nextId = 1;

// 商品を追加
function addProduct(name, price, stock) {
  products.push({
    id: nextId,
    name: name,
    price: price,
    stock: stock
  });
  nextId++;
  showProducts();
}

// 商品を表示
function showProducts() {
  productList.replaceChildren();

  for (let product of products) {
    let div = document.createElement("div");
    div.className = "product-item";

    let info = document.createElement("div");
    info.innerHTML = `
      <strong>#${product.id} ${product.name}</strong><br>
      価格: ¥${product.price}<br>
      在庫: ${product.stock}個
    `;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", function() {
      deleteProductById(product.id);
    });

    div.appendChild(info);
    div.appendChild(deleteButton);
    productList.appendChild(div);
  }
}

// 商品を削除
function deleteProductById(id) {
  let index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    showProducts();
  }
}

// 使用例
addProduct("りんご", 150, 50);
addProduct("バナナ", 100, 30);
addProduct("牛乳", 200, 20);
```

**実行フロー:**

```
addProduct("りんご", 150, 50):
  products = [
    { id: 1, name: "りんご", price: 150, stock: 50 }
  ]
  nextId = 2

addProduct("バナナ", 100, 30):
  products = [
    { id: 1, name: "りんご", price: 150, stock: 50 },
    { id: 2, name: "バナナ", price: 100, stock: 30 }
  ]
  nextId = 3

showProducts():
  ループ1回目:
    product = { id: 1, name: "りんご", price: 150, stock: 50 }
    表示:
      #1 りんご
      価格: ¥150
      在庫: 50個
      [削除]

  ループ2回目:
    product = { id: 2, name: "バナナ", price: 100, stock: 30 }
    表示:
      #2 バナナ
      価格: ¥100
      在庫: 30個
      [削除]

deleteProductById(1):
  index = 0
  products.splice(0, 1)
  → products = [
       { id: 2, name: "バナナ", price: 100, stock: 30 }
     ]
```

---

## 8. ケーススタディ2: ブックマーク管理アプリ

URL、タイトル、カテゴリを持つブックマークを管理します。

```javascript
let bookmarks = [];
let nextId = 1;

// ブックマークを追加
function addBookmark(url, title, category) {
  bookmarks.push({
    id: nextId,
    url: url,
    title: title,
    category: category,
    createdAt: new Date().toLocaleString("ja-JP")
  });
  nextId++;
  showBookmarks();
}

// ブックマークを表示
function showBookmarks() {
  bookmarkList.replaceChildren();

  for (let bookmark of bookmarks) {
    let div = document.createElement("div");
    div.className = "bookmark-item";

    let link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.title;
    link.target = "_blank";

    let category = document.createElement("span");
    category.className = "category-badge";
    category.textContent = bookmark.category;

    let date = document.createElement("small");
    date.textContent = bookmark.createdAt;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", function() {
      if (confirm(`「${bookmark.title}」を削除しますか？`)) {
        deleteBookmarkById(bookmark.id);
      }
    });

    div.appendChild(link);
    div.appendChild(category);
    div.appendChild(date);
    div.appendChild(deleteButton);

    bookmarkList.appendChild(div);
  }
}

// ブックマークを削除
function deleteBookmarkById(id) {
  let index = bookmarks.findIndex(bookmark => bookmark.id === id);
  if (index !== -1) {
    bookmarks.splice(index, 1);
    showBookmarks();
  }
}

// 使用例
addBookmark("https://example.com", "例のサイト", "仕事");
addBookmark("https://google.com", "Google", "検索");
```

**実行フロー:**

```
addBookmark("https://example.com", "例のサイト", "仕事"):
  bookmarks = [
    {
      id: 1,
      url: "https://example.com",
      title: "例のサイト",
      category: "仕事",
      createdAt: "2025/11/26 14:30:00"
    }
  ]
  nextId = 2

showBookmarks():
  bookmark = {
    id: 1,
    url: "https://example.com",
    title: "例のサイト",
    category: "仕事",
    createdAt: "2025/11/26 14:30:00"
  }

  表示:
    <a href="https://example.com" target="_blank">例のサイト</a>
    [仕事]
    2025/11/26 14:30:00
    [削除]
```

---

## まとめ

今回は、オブジェクト配列を使ったデータ管理を学びました：

### 重要なポイント

```
1. オブジェクトの基本
   ┌──────────────────────────┐
   │ { プロパティ: 値 }       │
   │ 複数の情報を1つに        │
   │ { } 中括弧で作成         │
   └──────────────────────────┘

2. プロパティアクセス
   ┌──────────────────────────┐
   │ object.property          │
   │ ドット記法（推奨）       │
   │ object["property"]       │
   │ ブラケット記法           │
   └──────────────────────────┘

3. オブジェクト配列
   ┌──────────────────────────┐
   │ [{}, {}, {}]             │
   │ array[i].property        │
   │ 2段階のアクセス          │
   └──────────────────────────┘

4. ID管理
   ┌──────────────────────────┐
   │ nextId でインクリメント  │
   │ 一意な識別子             │
   │ 削除後も変わらない       │
   └──────────────────────────┘

5. findIndex()
   ┌──────────────────────────┐
   │ IDで検索                 │
   │ インデックスを返す       │
   │ -1 は見つからない        │
   └──────────────────────────┘

6. 構造化データ
   ┌──────────────────────────┐
   │ 複数のプロパティ         │
   │ 意味のある名前           │
   │ 拡張しやすい             │
   └──────────────────────────┘
```

### 実用的なパターン

```javascript
// パターン1: オブジェクトの作成
let task = {
  id: 1,
  text: "買い物",
  priority: "高"
};

// パターン2: 配列への追加
tasks.push({
  id: nextId,
  text: "買い物"
});
nextId++;

// パターン3: ループで表示
for (let task of tasks) {
  console.log(task.id + ": " + task.text);
}

// パターン4: IDで検索
let task = tasks.find(task => task.id === 2);

// パターン5: IDで削除
function deleteById(id) {
  let index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
}

// パターン6: プロパティの更新
let task = tasks.find(task => task.id === 1);
if (task) {
  task.completed = true;
}
```

### オブジェクト配列のメリット

```
文字列配列:
  ["買い物", "掃除"]
  ✗ タスク名しか持てない
  ✗ 追加情報が欲しい時に困る

オブジェクト配列:
  [
    { id: 1, text: "買い物", priority: "高" },
    { id: 2, text: "掃除", priority: "中" }
  ]
  ✓ 複数の情報を管理できる
  ✓ IDで一意に識別できる
  ✓ 拡張しやすい（新しいプロパティを追加）
  ✓ 実用的なアプリが作れる
```

オブジェクト配列を使うことで、より実用的で機能豊富なアプリケーションを作成できます。ID管理とfindIndex()を組み合わせることで、安全で確実なデータ操作が可能になります。

次のレッスンでは、状態管理について学びます。タスクの完了/未完了を管理する方法を習得しましょう。

---

## カリキュラム要件チェック

このレッスンで以下の要件を満たしています：

✅ **[{id: 1, text: "買い物"}]**: オブジェクト配列の形式を完全に理解
✅ **複雑なデータ**: 複数のプロパティを持つオブジェクトの作成と管理
✅ **プロパティアクセス**: ドット記法とブラケット記法の両方を習得
✅ **【知識】構造化データ、オブジェクトの配列**: オブジェクトの基本、配列との組み合わせ、ID管理、検索、削除、更新など包括的に学習
✅ **成果物：構造化TODO**: IDと優先度を持つ完全なTODOリストアプリを実装

---

## 次回予告

次回のレッスン105では、**状態管理**を学びます：

- 完了/未完了の状態を管理
- チェックボックスの実装
- 状態の切り替え（トグル処理）
- completedプロパティの活用

オブジェクト配列を使って、より高度なタスク管理機能を実装しましょう！
