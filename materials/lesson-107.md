---
title: "ソート機能"
lesson: 107
description: "配列を並べ替え、日付順・優先度順・アルファベット順に表示する方法を学びます"
objectives:
  - "sort()メソッドを使える"
  - "比較関数を書ける"
  - "日付順・優先度順・名前順に並べ替えられる"
duration: 30
date: 2025-11-26
---

# レッスン107: ソート機能

## このレッスンで学ぶこと

### 前回の復習

前回のレッスン106では、**フィルタリング**を学びました：

```javascript
// 条件に合うタスクだけを表示
let shouldShow = false;

if (filterMode === "completed") {
  shouldShow = task.completed;
}

if (shouldShow) {
  // 表示処理
}
```

今回は、データを**並べ替える**方法を学びます。

### よくある場面

データを扱っていて、こんな場面に出会います：

**場面1：優先度の高い順に見たい**
```
タスク一覧:
□ メールを送る（優先度: 低）
□ 買い物に行く（優先度: 中）
□ レポート提出（優先度: 高）

↓「優先度順」ボタンをクリック

優先度順:
□ レポート提出（優先度: 高）
□ 買い物に行く（優先度: 中）
□ メールを送る（優先度: 低）
```

**場面2：追加した日付順に見たい**
```
↓「日付順」ボタンをクリック

新しい順:
□ レポート提出（2025-11-27）
□ 買い物に行く（2025-11-26）
□ メールを送る（2025-11-25）
```

**場面3：名前順に見たい**
```
↓「名前順」ボタンをクリック

アルファベット順:
□ メールを送る
□ レポート提出
□ 買い物に行く
```

このように、**データを特定の順序で並べ替える**機能を「ソート」と呼びます。

### 学習目標

このレッスンでは、以下のスキルを身につけます：

1. **sort()メソッドの基本**（配列を並べ替える）
2. **比較関数の書き方**（どのように並べるかを指定）
3. **数値のソート**（点数順、優先度順）
4. **文字列のソート**（名前順、アルファベット順）
5. **日付のソート**（新しい順、古い順）
6. **ソートモードの管理**（ボタンで切り替え）

---

## 1. sort()メソッドの基本

### sort()メソッドとは

**sort()メソッド**は、配列の要素を並べ替えるメソッドです。

```javascript
let numbers = [3, 1, 4, 1, 5];

// 数値を昇順（小さい順）に並べ替える
numbers.sort(function(a, b) {
  return a - b;
});

console.log(numbers);  // [1, 1, 3, 4, 5]
```

### 重要な特徴

```javascript
// ⚠️ sort()は元の配列を変更する
let numbers = [3, 1, 4];
console.log(numbers);  // [3, 1, 4]

numbers.sort(function(a, b) {
  return a - b;
});

console.log(numbers);  // [1, 3, 4] ← 元の配列が変わった！
```

**実行の流れ**：
```
初期状態:
  numbers = [3, 1, 4]

sort()を実行:
  numbers.sort(function(a, b) {
    return a - b;
  })

  内部で要素を比較して並べ替え
  ↓
  numbers = [1, 3, 4]  （元の配列が変更される）

console.log(numbers)
  出力: [1, 3, 4]
```

### 元の配列を保持したい場合

```javascript
let original = [3, 1, 4];

// スプレッド構文でコピーを作る
let sorted = [...original].sort(function(a, b) {
  return a - b;
});

console.log(original);  // [3, 1, 4] ← 元の配列は変わらない
console.log(sorted);    // [1, 3, 4] ← コピーがソートされた
```

---

## 2. 比較関数の仕組み

### 比較関数とは

sort()メソッドには、**2つの要素を比較する関数**を渡します。

```javascript
array.sort(function(a, b) {
  // a と b を比較して、数値を返す

  // 負の数を返す → a を b の前に配置
  // 0 を返す     → 順序を変えない
  // 正の数を返す → b を a の前に配置
});
```

### 数値のソート

```javascript
let numbers = [30, 5, 100, 1];

// 昇順（小さい順）
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);  // [1, 5, 30, 100]

// 降順（大きい順）
numbers.sort(function(a, b) {
  return b - a;
});
console.log(numbers);  // [100, 30, 5, 1]
```

**実行の流れ（昇順の場合）**：
```
numbers = [30, 5, 100, 1]

sort()が内部で要素を比較:

比較1: a=30, b=5
  return a - b
  return 30 - 5
  return 25 (正の数)
  → b(5)をa(30)の前に → [5, 30, ...]

比較2: a=5, b=100
  return 5 - 100
  return -95 (負の数)
  → a(5)をb(100)の前に → [5, 100, ...]

比較3: a=30, b=100
  return 30 - 100
  return -70 (負の数)
  → a(30)をb(100)の前に → [5, 30, 100, ...]

比較4: a=5, b=1
  return 5 - 1
  return 4 (正の数)
  → b(1)をa(5)の前に → [1, 5, 30, 100]

最終結果: [1, 5, 30, 100]
```

### 比較関数の返り値の意味

```
a - b の結果による動作:

例: a = 5, b = 30
  5 - 30 = -25 (負の数)
  → aをbの前に配置 → [5, 30]

例: a = 30, b = 5
  30 - 5 = 25 (正の数)
  → bをaの前に配置 → [5, 30]

例: a = 5, b = 5
  5 - 5 = 0
  → 順序を変えない → [5, 5]

┌─────────────────────────────────┐
│ a - b → 昇順（小さい順）         │
│ b - a → 降順（大きい順）         │
└─────────────────────────────────┘
```

---

## 3. オブジェクト配列のソート

### 基本パターン

オブジェクト配列では、プロパティの値を使って比較します。

```javascript
let tasks = [
  { id: 1, text: "買い物", priority: 2 },
  { id: 2, text: "掃除", priority: 1 },
  { id: 3, text: "勉強", priority: 3 }
];

// 優先度順にソート（高い順）
tasks.sort(function(a, b) {
  return b.priority - a.priority;
});

console.log(tasks);
// [
//   { id: 3, text: "勉強", priority: 3 },
//   { id: 1, text: "買い物", priority: 2 },
//   { id: 2, text: "掃除", priority: 1 }
// ]
```

**実行の流れ**：
```
初期状態:
  tasks = [
    { id: 1, text: "買い物", priority: 2 },
    { id: 2, text: "掃除", priority: 1 },
    { id: 3, text: "勉強", priority: 3 }
  ]

sort()を実行:
  tasks.sort(function(a, b) {
    return b.priority - a.priority;
  })

内部での比較:

比較1: a={買い物, priority:2}, b={掃除, priority:1}
  return b.priority - a.priority
  return 1 - 2
  return -1 (負の数)
  → a(買い物)をb(掃除)の前に

比較2: a={買い物, priority:2}, b={勉強, priority:3}
  return 3 - 2
  return 1 (正の数)
  → b(勉強)をa(買い物)の前に

比較3: a={掃除, priority:1}, b={勉強, priority:3}
  return 3 - 1
  return 2 (正の数)
  → b(勉強)をa(掃除)の前に

最終結果:
  tasks = [
    { id: 3, text: "勉強", priority: 3 },    ← 優先度最高
    { id: 1, text: "買い物", priority: 2 },
    { id: 2, text: "掃除", priority: 1 }      ← 優先度最低
  ]
```

---

## 4. 文字列のソート

### localeCompare()メソッド

文字列を比較するには、`localeCompare()`メソッドを使います。

```javascript
let tasks = [
  { id: 1, text: "掃除" },
  { id: 2, text: "買い物" },
  { id: 3, text: "勉強" }
];

// 名前順（アルファベット順）にソート
tasks.sort(function(a, b) {
  return a.text.localeCompare(b.text);
});

console.log(tasks);
// [
//   { id: 2, text: "買い物" },
//   { id: 1, text: "掃除" },
//   { id: 3, text: "勉強" }
// ]
```

### localeCompare()の仕組み

```javascript
// localeCompare()は比較結果を返す
"apple".localeCompare("banana")  // -1 (負の数) → apple が前
"banana".localeCompare("apple")  //  1 (正の数) → apple が前
"apple".localeCompare("apple")   //  0          → 同じ
```

**実行の流れ**：
```
"掃除".localeCompare("買い物")
  → 文字コードで比較
  → "掃除" > "買い物" （日本語の場合、五十音順）
  → 正の数を返す
  → "買い物"を"掃除"の前に

"買い物".localeCompare("勉強")
  → "買い物" < "勉強"
  → 負の数を返す
  → "買い物"を"勉強"の前に

最終結果: ["買い物", "掃除", "勉強"]
```

### 英語の場合

```javascript
let fruits = [
  { id: 1, name: "banana" },
  { id: 2, name: "apple" },
  { id: 3, name: "cherry" }
];

// アルファベット順
fruits.sort(function(a, b) {
  return a.name.localeCompare(b.name);
});

console.log(fruits);
// [
//   { id: 2, name: "apple" },
//   { id: 1, name: "banana" },
//   { id: 3, name: "cherry" }
// ]
```

---

## 5. 日付のソート

### 日付文字列のソート

日付を文字列として扱う場合、ISO形式（YYYY-MM-DD）なら文字列比較で正しくソートできます。

```javascript
let tasks = [
  { id: 1, text: "買い物", date: "2025-11-26" },
  { id: 2, text: "掃除", date: "2025-11-27" },
  { id: 3, text: "勉強", date: "2025-11-25" }
];

// 日付順（新しい順）
tasks.sort(function(a, b) {
  return b.date.localeCompare(a.date);
});

console.log(tasks);
// [
//   { id: 2, text: "掃除", date: "2025-11-27" },   ← 最新
//   { id: 1, text: "買い物", date: "2025-11-26" },
//   { id: 3, text: "勉強", date: "2025-11-25" }    ← 最古
// ]
```

**実行の流れ**：
```
比較: "2025-11-27" と "2025-11-26"
  b.date.localeCompare(a.date)
  "2025-11-27".localeCompare("2025-11-26")
  → "2025-11-27" > "2025-11-26"
  → 正の数を返す
  → b(2025-11-27)をa(2025-11-26)の前に

ISO形式（YYYY-MM-DD）なら文字列として正しく比較できる:
  "2025-11-27" > "2025-11-26" > "2025-11-25"
```

### Dateオブジェクトを使う場合

```javascript
let tasks = [
  { id: 1, text: "買い物", date: new Date("2025-11-26") },
  { id: 2, text: "掃除", date: new Date("2025-11-27") },
  { id: 3, text: "勉強", date: new Date("2025-11-25") }
];

// 日付順（新しい順）
tasks.sort(function(a, b) {
  return b.date - a.date;  // Dateオブジェクトは数値に変換される
});
```

**実行の流れ**：
```
Dateオブジェクトの減算:
  new Date("2025-11-27") - new Date("2025-11-26")

内部でミリ秒に変換される:
  1732665600000 - 1732579200000 = 86400000 (正の数)

正の数なので、b(2025-11-27)がa(2025-11-26)の前に配置される
```

---

## 6. ソートモードの管理

### ソートモード変数

現在のソート方法を変数で管理します。

```javascript
let sortMode = "none";  // 現在のソートモード

// 取りうる値:
// "none"     → ソートしない（元の順序）
// "priority" → 優先度順
// "date"     → 日付順
// "name"     → 名前順
```

### ソートモードに応じた処理

```javascript
let tasks = [
  { id: 1, text: "買い物", priority: 2, date: "2025-11-26" },
  { id: 2, text: "掃除", priority: 1, date: "2025-11-27" },
  { id: 3, text: "勉強", priority: 3, date: "2025-11-25" }
];

let sortMode = "priority";

function showTasks() {
  let taskList = document.getElementById("taskList");
  taskList.replaceChildren();

  // ソート用の配列を作成（元の配列は保持）
  let sortedTasks = [...tasks];

  // ソートモードに応じてソート
  if (sortMode === "priority") {
    // 優先度順（高い順）
    sortedTasks.sort(function(a, b) {
      return b.priority - a.priority;
    });
  } else if (sortMode === "date") {
    // 日付順（新しい順）
    sortedTasks.sort(function(a, b) {
      return b.date.localeCompare(a.date);
    });
  } else if (sortMode === "name") {
    // 名前順
    sortedTasks.sort(function(a, b) {
      return a.text.localeCompare(b.text);
    });
  }
  // sortMode === "none"の場合は何もしない

  // ソート済みの配列を表示
  for (let i = 0; i < sortedTasks.length; i++) {
    let task = sortedTasks[i];
    // DOM要素を作成して表示
  }
}
```

**実行の流れ（sortMode = "priority"の場合）**：
```
初期状態:
  tasks = [
    { id: 1, text: "買い物", priority: 2, date: "2025-11-26" },
    { id: 2, text: "掃除", priority: 1, date: "2025-11-27" },
    { id: 3, text: "勉強", priority: 3, date: "2025-11-25" }
  ]
  sortMode = "priority"

showTasks()が呼ばれる
  ↓
ステップ1: 元の配列のコピーを作成
  sortedTasks = [...tasks]
  sortedTasks → [
    { id: 1, text: "買い物", priority: 2, date: "2025-11-26" },
    { id: 2, text: "掃除", priority: 1, date: "2025-11-27" },
    { id: 3, text: "勉強", priority: 3, date: "2025-11-25" }
  ]

ステップ2: ソートモードを確認
  if (sortMode === "priority") → true

ステップ3: 優先度順にソート
  sortedTasks.sort(function(a, b) {
    return b.priority - a.priority;
  })

  sortedTasks → [
    { id: 3, text: "勉強", priority: 3, date: "2025-11-25" },
    { id: 1, text: "買い物", priority: 2, date: "2025-11-26" },
    { id: 2, text: "掃除", priority: 1, date: "2025-11-27" }
  ]

ステップ4: ソート済みの配列を表示
  for (let i = 0; i < sortedTasks.length; i++)
    表示: "勉強" (priority: 3)
    表示: "買い物" (priority: 2)
    表示: "掃除" (priority: 1)

元のtasks配列は変更されていない:
  tasks → [
    { id: 1, text: "買い物", priority: 2, date: "2025-11-26" },
    { id: 2, text: "掃除", priority: 1, date: "2025-11-27" },
    { id: 3, text: "勉強", priority: 3, date: "2025-11-25" }
  ]
```

---

## 7. 実践例：タスク管理アプリ

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>タスク管理アプリ - ソート機能</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>📋 タスク管理</h1>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="タスク名">
      <select id="prioritySelect">
        <option value="1">低</option>
        <option value="2" selected>中</option>
        <option value="3">高</option>
      </select>
      <button id="addButton">追加</button>
    </div>

    <div class="sort-area">
      <button id="sortNoneButton" class="sort-button">元の順序</button>
      <button id="sortPriorityButton" class="sort-button">優先度順</button>
      <button id="sortDateButton" class="sort-button">日付順</button>
      <button id="sortNameButton" class="sort-button">名前順</button>
    </div>

    <div id="taskList"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### CSS

```css
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  margin: 0;
  padding: 20px;
}

.container {
  max-width: 700px;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

h1 {
  margin: 0 0 20px 0;
  color: #333;
  text-align: center;
}

.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

#taskInput {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

#prioritySelect {
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

#addButton {
  padding: 12px 24px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.sort-area {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.sort-button {
  padding: 8px 16px;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.3s;
}

.sort-button:hover {
  background-color: #e0e0e0;
}

.sort-button.active {
  background-color: #667eea;
  color: white;
  border-color: #667eea;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid #eee;
  border-left: 4px solid transparent;
}

.task-item.priority-high {
  border-left-color: #ef4444;
}

.task-item.priority-medium {
  border-left-color: #f59e0b;
}

.task-item.priority-low {
  border-left-color: #10b981;
}

.task-name {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.task-priority {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.priority-high {
  background-color: #fee2e2;
  color: #ef4444;
}

.priority-medium {
  background-color: #fef3c7;
  color: #f59e0b;
}

.priority-low {
  background-color: #d1fae5;
  color: #10b981;
}

.task-date {
  font-size: 12px;
  color: #666;
}

.delete-button {
  padding: 6px 12px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
```

### JavaScript（完全版）

```javascript
// タスクデータをオブジェクト配列で管理
let tasks = [];
let nextId = 1;
let sortMode = "none";  // "none", "priority", "date", "name"

// 要素を取得
let taskInput = document.getElementById("taskInput");
let prioritySelect = document.getElementById("prioritySelect");
let addButton = document.getElementById("addButton");
let taskList = document.getElementById("taskList");

let sortNoneButton = document.getElementById("sortNoneButton");
let sortPriorityButton = document.getElementById("sortPriorityButton");
let sortDateButton = document.getElementById("sortDateButton");
let sortNameButton = document.getElementById("sortNameButton");

// 現在の日時を取得する関数
function getCurrentDate() {
  let now = new Date();
  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, "0");
  let day = String(now.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

// タスクを追加
addButton.addEventListener("click", function() {
  addTask();
});

taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  let text = taskInput.value.trim();
  let priority = parseInt(prioritySelect.value);

  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  // 新しいタスクオブジェクトを作成
  let newTask = {
    id: nextId,
    text: text,
    priority: priority,
    date: getCurrentDate(),
    completed: false
  };

  tasks.push(newTask);
  nextId++;

  taskInput.value = "";
  taskInput.focus();
  showTasks();
}

// ソートボタンのイベントリスナー
sortNoneButton.addEventListener("click", function() {
  sortMode = "none";
  showTasks();
});

sortPriorityButton.addEventListener("click", function() {
  sortMode = "priority";
  showTasks();
});

sortDateButton.addEventListener("click", function() {
  sortMode = "date";
  showTasks();
});

sortNameButton.addEventListener("click", function() {
  sortMode = "name";
  showTasks();
});

// タスクを表示
function showTasks() {
  taskList.replaceChildren();

  // ソート用のコピーを作成
  let sortedTasks = [...tasks];

  // ソートモードに応じてソート
  if (sortMode === "priority") {
    // 優先度順（高い順）
    sortedTasks.sort(function(a, b) {
      return b.priority - a.priority;
    });
  } else if (sortMode === "date") {
    // 日付順（新しい順）
    sortedTasks.sort(function(a, b) {
      return b.date.localeCompare(a.date);
    });
  } else if (sortMode === "name") {
    // 名前順（アルファベット順）
    sortedTasks.sort(function(a, b) {
      return a.text.localeCompare(b.text);
    });
  }

  // 表示
  for (let i = 0; i < sortedTasks.length; i++) {
    let task = sortedTasks[i];

    let item = document.createElement("div");
    item.className = "task-item";

    // 優先度に応じて枠線の色を変える
    if (task.priority === 3) {
      item.classList.add("priority-high");
    } else if (task.priority === 2) {
      item.classList.add("priority-medium");
    } else {
      item.classList.add("priority-low");
    }

    // タスク名
    let name = document.createElement("span");
    name.className = "task-name";
    name.textContent = task.text;

    // 優先度ラベル
    let priorityLabel = document.createElement("span");
    priorityLabel.className = "task-priority";
    if (task.priority === 3) {
      priorityLabel.textContent = "高";
      priorityLabel.classList.add("priority-high");
    } else if (task.priority === 2) {
      priorityLabel.textContent = "中";
      priorityLabel.classList.add("priority-medium");
    } else {
      priorityLabel.textContent = "低";
      priorityLabel.classList.add("priority-low");
    }

    // 日付
    let date = document.createElement("span");
    date.className = "task-date";
    date.textContent = task.date;

    // 削除ボタン
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function() {
      // 元のtasks配列から削除（IDで検索）
      let index = tasks.findIndex(function(t) {
        return t.id === task.id;
      });

      if (index !== -1) {
        tasks.splice(index, 1);
        showTasks();
      }
    });

    item.appendChild(name);
    item.appendChild(priorityLabel);
    item.appendChild(date);
    item.appendChild(deleteButton);
    taskList.appendChild(item);
  }

  updateSortButtons();
}

// ソートボタンの状態を更新
function updateSortButtons() {
  sortNoneButton.classList.remove("active");
  sortPriorityButton.classList.remove("active");
  sortDateButton.classList.remove("active");
  sortNameButton.classList.remove("active");

  if (sortMode === "none") {
    sortNoneButton.classList.add("active");
  } else if (sortMode === "priority") {
    sortPriorityButton.classList.add("active");
  } else if (sortMode === "date") {
    sortDateButton.classList.add("active");
  } else if (sortMode === "name") {
    sortNameButton.classList.add("active");
  }
}

// 初期表示
showTasks();
```

---

## 8. よくある場面での応用

### 応用例1：複数条件でのソート

```javascript
// 優先度が同じ場合は日付順にソート
tasks.sort(function(a, b) {
  // まず優先度で比較
  if (a.priority !== b.priority) {
    return b.priority - a.priority;  // 優先度が高い順
  }

  // 優先度が同じ場合は日付で比較
  return b.date.localeCompare(a.date);  // 新しい順
});
```

**実行の流れ**：
```
比較: taskA={priority:3, date:"2025-11-26"}, taskB={priority:3, date:"2025-11-27"}

if (a.priority !== b.priority)
if (3 !== 3) → false

優先度が同じなので、日付で比較:
return b.date.localeCompare(a.date)
return "2025-11-27".localeCompare("2025-11-26")
return 1 (正の数)
→ taskBをtaskAの前に
```

### 応用例2：完了/未完了で分けてソート

```javascript
// まず完了状態で分けて、その中で優先度順
tasks.sort(function(a, b) {
  // 未完了を先に表示
  if (a.completed !== b.completed) {
    return a.completed - b.completed;  // false(0) が前、true(1) が後
  }

  // 同じ完了状態の場合は優先度順
  return b.priority - a.priority;
});
```

### 応用例3：カスタム順序

```javascript
// 優先度を「高→低→中」の順にしたい場合
let priorityOrder = { 3: 1, 1: 2, 2: 3 };  // カスタム順序

tasks.sort(function(a, b) {
  return priorityOrder[a.priority] - priorityOrder[b.priority];
});
```

---

## 9. 練習問題

### 練習問題1：読書リストアプリ

読書リストアプリにソート機能を追加してください。

**要件**：
1. 本のタイトル・著者・評価（1-5）を入力して追加できる
2. 「元の順序」「評価順」「タイトル順」「著者順」のソートボタン
3. 評価順は高い順、タイトル・著者順はアルファベット順
4. 削除機能

**データ構造のヒント**：
```javascript
let books = [
  { id: 1, title: "ハリー・ポッター", author: "J.K.ローリング", rating: 5 },
  { id: 2, title: "星の王子さま", author: "サン=テグジュペリ", rating: 4 }
];
```

**ソートのヒント**：
```javascript
// 評価順（高い順）
sortedBooks.sort(function(a, b) {
  return b.rating - a.rating;
});

// タイトル順
sortedBooks.sort(function(a, b) {
  return a.title.localeCompare(b.title);
});
```

---

### 練習問題2：成績管理アプリ

成績管理アプリにソート機能を追加してください。

**要件**：
1. 名前・科目・点数を入力して追加できる
2. 「元の順序」「点数順」「名前順」「科目順」のソートボタン
3. 点数順は高い順
4. 削除機能

**追加課題**：
- 同じ点数の場合は名前順にソート

**ヒント**：
```javascript
// 点数が同じ場合は名前順
sortedGrades.sort(function(a, b) {
  if (a.score !== b.score) {
    return b.score - a.score;  // 点数が高い順
  }
  return a.name.localeCompare(b.name);  // 名前順
});
```

---

### 練習問題3：イベント管理アプリ

イベント管理アプリを作成してください。

**要件**：
1. イベント名・日付・参加人数を入力して追加できる
2. 「元の順序」「日付順」「参加人数順」のソートボタン
3. 日付順は近い順、参加人数順は多い順
4. 削除機能

**データ構造**：
```javascript
let events = [
  { id: 1, name: "勉強会", date: "2025-12-01", participants: 15 },
  { id: 2, name: "忘年会", date: "2025-12-25", participants: 30 }
];
```

**日付順のヒント**：
```javascript
// 日付が近い順
sortedEvents.sort(function(a, b) {
  return a.date.localeCompare(b.date);
});
```

---

## まとめ

### このレッスンで学んだこと

1. **sort()メソッドの基本**
   ```javascript
   array.sort(function(a, b) {
     return a - b;  // 昇順
   });
   ```

2. **比較関数の返り値**
   - 負の数 → a を b の前に
   - 0 → 順序を変えない
   - 正の数 → b を a の前に

3. **数値のソート**
   ```javascript
   // 昇順
   array.sort(function(a, b) { return a - b; });
   // 降順
   array.sort(function(a, b) { return b - a; });
   ```

4. **文字列のソート**
   ```javascript
   array.sort(function(a, b) {
     return a.localeCompare(b);
   });
   ```

5. **オブジェクト配列のソート**
   ```javascript
   tasks.sort(function(a, b) {
     return b.priority - a.priority;
   });
   ```

6. **元の配列を保持**
   ```javascript
   let sortedTasks = [...tasks].sort(...);
   ```

### 重要なポイント

1. **sort()は元の配列を変更する**
   - コピーを作ってからソートする

2. **比較関数で順序を制御**
   - `a - b` で昇順
   - `b - a` で降順

3. **文字列はlocaleCompare()**
   - アルファベット順、五十音順に対応

4. **複数条件でソート可能**
   - 第1条件、第2条件と優先順位を付ける

5. **ソートモードで管理**
   - 変数でソート方法を保持
   - ボタンで切り替え

### ソートの基本パターン

```javascript
// 基本パターン
function showItems() {
  // 元の配列のコピーを作成
  let sorted = [...items];

  // ソートモードに応じてソート
  if (sortMode === "数値降順") {
    sorted.sort(function(a, b) {
      return b.value - a.value;
    });
  } else if (sortMode === "文字列昇順") {
    sorted.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  // ソート済み配列を表示
  for (let i = 0; i < sorted.length; i++) {
    // DOM要素を作成
  }
}
```

### 次のレッスンの予告

次のレッスン108では、**編集機能**について学びます。

- タスクの内容を編集する
- インライン編集の実装
- 保存とキャンセルの処理

フィルタリングとソートで表示を制御できるようになったので、次はデータの編集方法を学びます！

---

## カリキュラム要件チェック

このレッスンは以下のカリキュラム要件を満たしています：

✅ **日付順**：`date.localeCompare()`で日付順にソート
✅ **優先度順**：`b.priority - a.priority`で優先度順にソート
✅ **アルファベット順**：`text.localeCompare()`で名前順にソート
✅ **【知識】ソートアルゴリズム、比較関数**：sort()メソッドと比較関数を詳細に解説
✅ **成果物：並び替え機能**：4つのソートボタンで切り替え可能なタスク管理アプリを実装
