---
title: "フィルタリング"
lesson: 106
description: "配列を条件で絞り込み、表示内容を切り替える方法を学びます"
objectives:
  - "条件に合う要素だけを表示できる"
  - "完了/未完了/全てを切り替えられる"
  - "表示制御の仕組みを理解できる"
duration: 30
date: 2025-11-26
---

# レッスン106: フィルタリング

## このレッスンで学ぶこと

### 前回の復習

前回のレッスン105では、**状態管理**を学びました：

```javascript
// オブジェクトに状態を追加
let task = {
  id: 1,
  text: "買い物",
  completed: false  // 状態
};

// チェックボックスで状態を切り替え
task.completed = !task.completed;
```

今回は、この**状態を使ってデータを絞り込む**方法を学びます。

### よくある場面

TODOアプリを使っていて、こんな場面に出会います：

**場面1：完了したタスクだけ見たい**
```
タスク一覧:
□ 買い物に行く
✓ 掃除をする
□ メールを送る
✓ 本を読む

↓「完了済み」ボタンをクリック

完了済みタスク:
✓ 掃除をする
✓ 本を読む
```

**場面2：まだやっていないタスクだけ見たい**
```
↓「未完了」ボタンをクリック

未完了タスク:
□ 買い物に行く
□ メールを送る
```

**場面3：全部見たい**
```
↓「全て」ボタンをクリック

全てのタスク:
□ 買い物に行く
✓ 掃除をする
□ メールを送る
✓ 本を読む
```

このように、**条件に合うデータだけを表示する**機能を「フィルタリング」と呼びます。

### 学習目標

このレッスンでは、以下のスキルを身につけます：

1. **フィルタリングの基本**（条件に合う要素だけを表示）
2. **フィルタモードの管理**（変数で状態を保持）
3. **条件分岐での表示制御**（if文で判定）
4. **フィルタボタンの実装**（ボタンクリックで切り替え）
5. **アクティブボタンの表示**（選択中のボタンをハイライト）

---

## 1. フィルタリングの基本

### フィルタリングとは

**フィルタリング**とは、データの中から**条件に合うものだけを取り出す**処理です。

```javascript
let tasks = [
  { id: 1, text: "買い物", completed: false },
  { id: 2, text: "掃除", completed: true },
  { id: 3, text: "勉強", completed: true }
];

// 完了済み（completed = true）だけを表示したい
// → "掃除"と"勉強"だけ表示される
```

### フィルタリングの仕組み

```
すべてのデータ
  ↓
┌─────────────────────────────────┐
│ ループで1つずつチェック           │
├─────────────────────────────────┤
│ タスク1: completed = false      │
│   → 条件に合わない → スキップ    │
│                                 │
│ タスク2: completed = true       │
│   → 条件に合う → 表示           │
│                                 │
│ タスク3: completed = true       │
│   → 条件に合う → 表示           │
└─────────────────────────────────┘
  ↓
条件に合うデータだけが表示される
```

### 基本的な実装

```javascript
let tasks = [
  { id: 1, text: "買い物", completed: false },
  { id: 2, text: "掃除", completed: true },
  { id: 3, text: "勉強", completed: true }
];

// 完了済みタスクだけを表示
for (let i = 0; i < tasks.length; i++) {
  let task = tasks[i];

  // 条件に合うタスクだけ処理
  if (task.completed === true) {
    console.log(task.text);
  }
}

// 出力:
// 掃除
// 勉強
```

**実行の流れ**：
```
ループ1回目（i = 0）:
  task = { id: 1, text: "買い物", completed: false }

  if (task.completed === true)
  if (false === true) → false

  条件がfalseなので何もしない（スキップ）

ループ2回目（i = 1）:
  task = { id: 2, text: "掃除", completed: true }

  if (task.completed === true)
  if (true === true) → true

  条件がtrueなので実行
  console.log("掃除")

ループ3回目（i = 2）:
  task = { id: 3, text: "勉強", completed: true }

  if (task.completed === true)
  if (true === true) → true

  条件がtrueなので実行
  console.log("勉強")
```

---

## 2. 完了済みタスクだけを表示

### 基本パターン

`completed`プロパティが`true`のタスクだけを表示します。

```javascript
function showTasks() {
  let taskList = document.getElementById("taskList");
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    // 完了済みのタスクだけ表示
    if (task.completed === true) {
      // DOM要素を作成して表示
      let item = document.createElement("div");
      item.textContent = task.text;
      taskList.appendChild(item);
    }
  }
}
```

**実行の流れ**：
```
前提:
  tasks = [
    { id: 1, text: "買い物", completed: false },
    { id: 2, text: "掃除", completed: true },
    { id: 3, text: "メール", completed: false },
    { id: 4, text: "勉強", completed: true }
  ]

showTasks()が呼ばれる
  ↓
taskList.replaceChildren()で既存の内容をクリア
  ↓
ループ1回目（i = 0）:
  task = { id: 1, text: "買い物", completed: false }
  if (false === true) → false
  スキップ

ループ2回目（i = 1）:
  task = { id: 2, text: "掃除", completed: true }
  if (true === true) → true

  item = <div>掃除</div>
  taskList.appendChild(item)

  画面に「掃除」が追加される

ループ3回目（i = 2）:
  task = { id: 3, text: "メール", completed: false }
  if (false === true) → false
  スキップ

ループ4回目（i = 3）:
  task = { id: 4, text: "勉強", completed: true }
  if (true === true) → true

  item = <div>勉強</div>
  taskList.appendChild(item)

  画面に「勉強」が追加される

最終的な画面:
  掃除
  勉強
```

### 省略記法

`=== true`は省略できます。

```javascript
// 完全な書き方
if (task.completed === true) {
  // 処理
}

// 省略した書き方（推奨）
if (task.completed) {
  // 処理
}
```

**理由**：
```
task.completed自体がboolean値（true/false）なので、
if文で直接評価できる

task.completed = true の場合:
  if (true) → 条件がtrue

task.completed = false の場合:
  if (false) → 条件がfalse
```

---

## 3. 未完了タスクだけを表示

### 基本パターン

`completed`プロパティが`false`のタスクだけを表示します。

```javascript
// 方法1: === false で比較
for (let i = 0; i < tasks.length; i++) {
  let task = tasks[i];

  if (task.completed === false) {
    // 未完了タスクを表示
    console.log(task.text);
  }
}

// 方法2: !演算子を使う（推奨）
for (let i = 0; i < tasks.length; i++) {
  let task = tasks[i];

  if (!task.completed) {
    // 未完了タスクを表示
    console.log(task.text);
  }
}
```

**実行の流れ**：
```
前提:
  tasks = [
    { id: 1, text: "買い物", completed: false },
    { id: 2, text: "掃除", completed: true },
    { id: 3, text: "メール", completed: false }
  ]

ループ1回目（i = 0）:
  task = { id: 1, text: "買い物", completed: false }

  if (!task.completed)
  if (!false)
  if (true) → 条件がtrue

  console.log("買い物")

ループ2回目（i = 1）:
  task = { id: 2, text: "掃除", completed: true }

  if (!task.completed)
  if (!true)
  if (false) → 条件がfalse

  スキップ

ループ3回目（i = 2）:
  task = { id: 3, text: "メール", completed: false }

  if (!task.completed)
  if (!false)
  if (true) → 条件がtrue

  console.log("メール")

出力:
  買い物
  メール
```

### !演算子の仕組み

```javascript
// !演算子は値を反転する
!true  → false
!false → true

// 未完了のチェック
task.completed = false の場合:
  !task.completed → !false → true（条件に合う）

task.completed = true の場合:
  !task.completed → !true → false（条件に合わない）
```

---

## 4. フィルタモードの管理

### フィルタモードとは

**フィルタモード**は、現在どのフィルタを適用しているかを管理する変数です。

```javascript
let filterMode = "all";  // 現在のフィルタモード

// 取りうる値:
// "all"       → 全てのタスクを表示
// "completed" → 完了済みのみ表示
// "active"    → 未完了のみ表示
```

### フィルタモードを使った表示制御

```javascript
let filterMode = "all";  // 初期値は「全て表示」

function showTasks() {
  let taskList = document.getElementById("taskList");
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    // フィルタモードに応じて表示するかどうかを判定
    let shouldShow = false;

    if (filterMode === "all") {
      shouldShow = true;  // 全てのタスクを表示
    } else if (filterMode === "completed") {
      shouldShow = task.completed;  // 完了済みのみ
    } else if (filterMode === "active") {
      shouldShow = !task.completed;  // 未完了のみ
    }

    // shouldShowがtrueの場合のみ表示
    if (shouldShow) {
      // DOM要素を作成
      let item = document.createElement("div");
      item.textContent = task.text;
      taskList.appendChild(item);
    }
  }
}
```

**実行の流れ（filterMode = "completed"の場合）**：
```
前提:
  tasks = [
    { id: 1, text: "買い物", completed: false },
    { id: 2, text: "掃除", completed: true },
    { id: 3, text: "メール", completed: false }
  ]
  filterMode = "completed"

showTasks()が呼ばれる
  ↓
ループ1回目（i = 0）:
  task = { id: 1, text: "買い物", completed: false }

  shouldShow = false（初期値）

  if (filterMode === "all") → if ("completed" === "all") → false
  else if (filterMode === "completed") → if ("completed" === "completed") → true
    shouldShow = task.completed
    shouldShow = false

  if (shouldShow) → if (false) → false
  スキップ

ループ2回目（i = 1）:
  task = { id: 2, text: "掃除", completed: true }

  shouldShow = false（初期値）

  if (filterMode === "all") → false
  else if (filterMode === "completed") → true
    shouldShow = task.completed
    shouldShow = true

  if (shouldShow) → if (true) → true

  item = <div>掃除</div>
  taskList.appendChild(item)

ループ3回目（i = 2）:
  task = { id: 3, text: "メール", completed: false }

  shouldShow = false（初期値）

  if (filterMode === "all") → false
  else if (filterMode === "completed") → true
    shouldShow = task.completed
    shouldShow = false

  if (shouldShow) → if (false) → false
  スキップ

最終的な画面:
  掃除
```

### shouldShow変数のメリット

```javascript
// shouldShow変数を使う理由:

// ❌ 悪い例: 各条件で重複したコード
if (filterMode === "all") {
  // DOM要素を作成（重複）
  let item = document.createElement("div");
  item.textContent = task.text;
  taskList.appendChild(item);
} else if (filterMode === "completed") {
  if (task.completed) {
    // DOM要素を作成（重複）
    let item = document.createElement("div");
    item.textContent = task.text;
    taskList.appendChild(item);
  }
}

// ⭕ 良い例: shouldShowで判定を集約
let shouldShow = false;

if (filterMode === "all") {
  shouldShow = true;
} else if (filterMode === "completed") {
  shouldShow = task.completed;
}

if (shouldShow) {
  // DOM要素を作成（1箇所だけ）
  let item = document.createElement("div");
  item.textContent = task.text;
  taskList.appendChild(item);
}
```

---

## 5. フィルタボタンの実装

### ボタンで切り替える

ボタンをクリックしたときに`filterMode`を変更し、表示を更新します。

```javascript
let allButton = document.getElementById("allButton");
let completedButton = document.getElementById("completedButton");
let activeButton = document.getElementById("activeButton");

// 「全て」ボタン
allButton.addEventListener("click", function() {
  filterMode = "all";
  showTasks();
});

// 「完了済み」ボタン
completedButton.addEventListener("click", function() {
  filterMode = "completed";
  showTasks();
});

// 「未完了」ボタン
activeButton.addEventListener("click", function() {
  filterMode = "active";
  showTasks();
});
```

**実行の流れ（「完了済み」ボタンをクリックした場合）**：
```
初期状態:
  filterMode = "all"
  画面には全てのタスクが表示されている

ユーザーが「完了済み」ボタンをクリック
  ↓
completedButtonのclickイベントが発火
  ↓
イベントリスナー内の関数が実行される
  ↓
ステップ1: filterModeを変更
  filterMode = "completed"

ステップ2: 表示を更新
  showTasks()が呼ばれる
  ↓
  showTasks()内でfilterMode === "completed"の条件が適用される
  ↓
  完了済みタスクだけが表示される
```

### フィルタ切り替えの流れ

```
┌─────────────────────────────────────┐
│ ユーザーがボタンをクリック            │
├─────────────────────────────────────┤
│ 1. filterMode を変更                │
│    filterMode = "completed"         │
│                                     │
│ 2. showTasks() を呼び出す           │
│    ↓                                │
│    ループで全タスクをチェック         │
│    ↓                                │
│    filterMode === "completed"       │
│    ↓                                │
│    task.completed === true のみ表示  │
└─────────────────────────────────────┘
```

---

## 6. アクティブボタンの表示

### 選択中のボタンをハイライト

現在選択されているフィルタボタンに、特別なスタイルを適用します。

```javascript
function updateFilterButtons() {
  // まず全てのボタンからactiveクラスを削除
  allButton.classList.remove("active");
  completedButton.classList.remove("active");
  activeButton.classList.remove("active");

  // 現在のモードに対応するボタンにactiveクラスを追加
  if (filterMode === "all") {
    allButton.classList.add("active");
  } else if (filterMode === "completed") {
    completedButton.classList.add("active");
  } else if (filterMode === "active") {
    activeButton.classList.add("active");
  }
}

function showTasks() {
  // ... フィルタリング処理 ...

  // ボタンの状態を更新
  updateFilterButtons();
}
```

**実行の流れ（filterMode = "completed"の場合）**：
```
updateFilterButtons()が呼ばれる
  ↓
ステップ1: 全てのボタンからactiveクラスを削除
  allButton.classList.remove("active")
  completedButton.classList.remove("active")
  activeButton.classList.remove("active")

  全てのボタンが通常のスタイルになる

ステップ2: 現在のモードを確認
  if (filterMode === "all") → if ("completed" === "all") → false
  else if (filterMode === "completed") → if ("completed" === "completed") → true
    completedButton.classList.add("active")

  completedButtonにactiveクラスが追加される

最終状態:
  allButton:       activeクラスなし
  completedButton: activeクラスあり ← ハイライト
  activeButton:    activeクラスなし
```

### CSSでスタイルを定義

```css
.filter-button {
  padding: 8px 16px;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-button:hover {
  background-color: #e0e0e0;
}

.filter-button.active {
  background-color: #2196F3;
  color: white;
  border-color: #2196F3;
}
```

### ボタン状態の可視化

```
初期状態（filterMode = "all"）:
┌─────┐ ┌─────────┐ ┌─────────┐
│ 全て│ │完了済み │ │ 未完了  │
│■■■■│ │         │ │         │  ← 「全て」が青色
└─────┘ └─────────┘ └─────────┘

「完了済み」をクリック後（filterMode = "completed"）:
┌─────┐ ┌─────────┐ ┌─────────┐
│ 全て│ │完了済み │ │ 未完了  │
│     │ │■■■■■■│ │         │  ← 「完了済み」が青色
└─────┘ └─────────┘ └─────────┘
```

---

## 7. 実践例：完全なTODOアプリ

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TODOアプリ - フィルタリング</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>📝 TODOアプリ</h1>

    <div class="input-area">
      <input type="text" id="todoInput" placeholder="新しいタスクを入力">
      <button id="addButton">追加</button>
    </div>

    <div class="filter-area">
      <button id="allButton" class="filter-button">全て</button>
      <button id="activeButton" class="filter-button">未完了</button>
      <button id="completedButton" class="filter-button">完了済み</button>
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
  max-width: 600px;
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

#todoInput {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

#todoInput:focus {
  outline: none;
  border-color: #667eea;
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
  transition: background-color 0.3s;
}

#addButton:hover {
  background-color: #5568d3;
}

.filter-area {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  justify-content: center;
}

.filter-button {
  padding: 8px 16px;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.3s;
}

.filter-button:hover {
  background-color: #e0e0e0;
  transform: translateY(-1px);
}

.filter-button.active {
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
  transition: background-color 0.2s;
}

.task-item:hover {
  background-color: #f9f9f9;
}

.task-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.task-item span {
  flex: 1;
  font-size: 14px;
  color: #333;
  transition: all 0.3s;
}

.completed {
  text-decoration: line-through;
  color: #999;
  opacity: 0.6;
}

.delete-button {
  padding: 6px 12px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #dc2626;
}
```

### JavaScript（完全版）

```javascript
// タスクデータをオブジェクト配列で管理
let tasks = [];
let nextId = 1;
let filterMode = "all";  // "all", "completed", "active"

// 要素を取得
let todoInput = document.getElementById("todoInput");
let addButton = document.getElementById("addButton");
let taskList = document.getElementById("taskList");
let allButton = document.getElementById("allButton");
let activeButton = document.getElementById("activeButton");
let completedButton = document.getElementById("completedButton");

// タスクを追加
addButton.addEventListener("click", function() {
  addTask();
});

// Enterキーでも追加
todoInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// タスク追加の処理
function addTask() {
  let text = todoInput.value.trim();

  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  // 新しいタスクオブジェクトを作成
  let newTask = {
    id: nextId,
    text: text,
    completed: false
  };

  tasks.push(newTask);
  nextId++;

  todoInput.value = "";
  todoInput.focus();
  showTasks();
}

// フィルタボタンのイベントリスナー
allButton.addEventListener("click", function() {
  filterMode = "all";
  showTasks();
});

activeButton.addEventListener("click", function() {
  filterMode = "active";
  showTasks();
});

completedButton.addEventListener("click", function() {
  filterMode = "completed";
  showTasks();
});

// タスクを表示
function showTasks() {
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    // フィルタモードに応じて表示を判定
    let shouldShow = false;

    if (filterMode === "all") {
      shouldShow = true;  // 全て表示
    } else if (filterMode === "completed") {
      shouldShow = task.completed;  // 完了済みのみ
    } else if (filterMode === "active") {
      shouldShow = !task.completed;  // 未完了のみ
    }

    // 表示すべきタスクだけ処理
    if (shouldShow) {
      // タスク全体のコンテナ
      let item = document.createElement("div");
      item.className = "task-item";

      // チェックボックス
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;

      checkbox.addEventListener("click", function() {
        task.completed = !task.completed;
        showTasks();
      });

      // タスクのテキスト
      let textSpan = document.createElement("span");
      textSpan.textContent = task.text;

      if (task.completed) {
        textSpan.classList.add("completed");
      }

      // 削除ボタン
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "削除";
      deleteButton.className = "delete-button";

      deleteButton.addEventListener("click", function() {
        if (confirm("「" + task.text + "」を削除しますか？")) {
          tasks.splice(i, 1);
          showTasks();
        }
      });

      // 要素を組み立て
      item.appendChild(checkbox);
      item.appendChild(textSpan);
      item.appendChild(deleteButton);
      taskList.appendChild(item);
    }
  }

  // ボタンの状態を更新
  updateFilterButtons();
}

// フィルタボタンの状態を更新
function updateFilterButtons() {
  // 全てのボタンからactiveクラスを削除
  allButton.classList.remove("active");
  activeButton.classList.remove("active");
  completedButton.classList.remove("active");

  // 現在のモードのボタンにactiveクラスを追加
  if (filterMode === "all") {
    allButton.classList.add("active");
  } else if (filterMode === "active") {
    activeButton.classList.add("active");
  } else if (filterMode === "completed") {
    completedButton.classList.add("active");
  }
}

// 初期表示
showTasks();
```

---

## 8. よくある場面での応用

### 応用例1：優先度でフィルタリング

```javascript
let tasks = [
  { id: 1, text: "買い物", priority: "高" },
  { id: 2, text: "掃除", priority: "低" },
  { id: 3, text: "メール", priority: "高" }
];

let filterMode = "all";  // "all", "high", "low"

function showTasks() {
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let shouldShow = false;

    if (filterMode === "all") {
      shouldShow = true;
    } else if (filterMode === "high") {
      shouldShow = (task.priority === "高");
    } else if (filterMode === "low") {
      shouldShow = (task.priority === "低");
    }

    if (shouldShow) {
      // タスクを表示
    }
  }
}
```

### 応用例2：タグでフィルタリング

```javascript
let tasks = [
  { id: 1, text: "買い物", tag: "家事" },
  { id: 2, text: "レポート", tag: "勉強" },
  { id: 3, text: "掃除", tag: "家事" }
];

let filterTag = "all";  // "all", "家事", "勉強"

function showTasks() {
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let shouldShow = false;

    if (filterTag === "all") {
      shouldShow = true;
    } else {
      shouldShow = (task.tag === filterTag);
    }

    if (shouldShow) {
      // タスクを表示
    }
  }
}
```

### 応用例3：複数条件でフィルタリング

```javascript
let tasks = [
  { id: 1, text: "買い物", completed: false, priority: "高" },
  { id: 2, text: "掃除", completed: true, priority: "低" },
  { id: 3, text: "メール", completed: false, priority: "高" }
];

let completedFilter = "all";  // "all", "completed", "active"
let priorityFilter = "all";   // "all", "high", "low"

function showTasks() {
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let shouldShow = true;  // 初期値をtrueに

    // 完了状態でフィルタ
    if (completedFilter === "completed" && !task.completed) {
      shouldShow = false;
    } else if (completedFilter === "active" && task.completed) {
      shouldShow = false;
    }

    // 優先度でフィルタ
    if (priorityFilter === "high" && task.priority !== "高") {
      shouldShow = false;
    } else if (priorityFilter === "low" && task.priority !== "低") {
      shouldShow = false;
    }

    if (shouldShow) {
      // タスクを表示
    }
  }
}
```

---

## 9. 練習問題

### 練習問題1：買い物リストアプリ

買い物リストアプリにフィルタ機能を追加してください。

**要件**：
1. 商品名を入力して追加できる
2. 各商品にチェックボックス（購入済み/未購入）
3. 「全て」「未購入」「購入済み」のフィルタボタン
4. フィルタボタンで表示を切り替え
5. 選択中のボタンをハイライト
6. 削除機能

**データ構造のヒント**：
```javascript
let items = [
  { id: 1, name: "牛乳", purchased: false },
  { id: 2, name: "パン", purchased: true }
];

let filterMode = "all";  // "all", "purchased", "unpurchased"
```

**フィルタリングのヒント**：
```javascript
let shouldShow = false;

if (filterMode === "all") {
  shouldShow = true;
} else if (filterMode === "purchased") {
  shouldShow = item.purchased;
} else if (filterMode === "unpurchased") {
  shouldShow = !item.purchased;
}
```

---

### 練習問題2：読書リストアプリ

読書リストアプリにフィルタ機能を追加してください。

**要件**：
1. 本のタイトルを入力して追加できる
2. 各本にチェックボックス（読了/未読）
3. 「全て」「未読」「読了」のフィルタボタン
4. フィルタ切り替え機能
5. 読了済みの本は取り消し線で表示

**追加課題**：
- 各フィルタでの件数を表示する（例：「未読 (3)」）

**件数表示のヒント**：
```javascript
function countBooks() {
  let total = books.length;
  let unread = 0;
  let finished = 0;

  for (let i = 0; i < books.length; i++) {
    if (books[i].finished) {
      finished++;
    } else {
      unread++;
    }
  }

  return { total: total, unread: unread, finished: finished };
}

// ボタンのテキストを更新
let counts = countBooks();
allButton.textContent = "全て (" + counts.total + ")";
unreadButton.textContent = "未読 (" + counts.unread + ")";
finishedButton.textContent = "読了 (" + counts.finished + ")";
```

---

### 練習問題3：優先度付きTODO

TODOアプリに優先度とフィルタ機能を追加してください。

**要件**：
1. タスク追加時に優先度を選択できる（高/中/低）
2. 「全て」「高優先度」「中優先度」「低優先度」のフィルタボタン
3. フィルタボタンで優先度別に表示
4. 優先度に応じて色分け表示（高=赤、中=黄、低=緑）

**データ構造**：
```javascript
let task = {
  id: 1,
  text: "買い物",
  priority: "高",  // "高", "中", "低"
  completed: false
};
```

**色分けのヒント**：
```javascript
// CSSクラスを追加
if (task.priority === "高") {
  item.classList.add("priority-high");
} else if (task.priority === "中") {
  item.classList.add("priority-medium");
} else if (task.priority === "低") {
  item.classList.add("priority-low");
}
```

```css
.priority-high {
  border-left: 4px solid #ef4444;
}

.priority-medium {
  border-left: 4px solid #f59e0b;
}

.priority-low {
  border-left: 4px solid #10b981;
}
```

---

## まとめ

### このレッスンで学んだこと

1. **フィルタリングの基本**
   ```javascript
   for (let i = 0; i < tasks.length; i++) {
     if (task.completed) {  // 条件に合うもののみ
       // 表示処理
     }
   }
   ```

2. **フィルタモードの管理**
   ```javascript
   let filterMode = "all";  // 状態を変数で管理
   ```

3. **shouldShow変数のパターン**
   ```javascript
   let shouldShow = false;

   if (filterMode === "all") {
     shouldShow = true;
   } else if (filterMode === "completed") {
     shouldShow = task.completed;
   }

   if (shouldShow) {
     // 表示処理
   }
   ```

4. **ボタンの状態管理**
   ```javascript
   function updateFilterButtons() {
     // 全てのボタンからactiveを削除
     allButton.classList.remove("active");

     // 現在のモードのボタンにactiveを追加
     if (filterMode === "all") {
       allButton.classList.add("active");
     }
   }
   ```

### 重要なポイント

1. **フィルタリングはループ + 条件分岐**
   - 全てのデータをループ
   - 条件に合うものだけ表示

2. **shouldShow変数で判定を集約**
   - コードの重複を防ぐ
   - 読みやすさが向上

3. **フィルタ変更 → 再表示**
   ```javascript
   filterMode = "completed";
   showTasks();  // 必ず再表示
   ```

4. **ボタンの状態も更新**
   - ユーザーに現在の状態を明示
   - UX向上につながる

### フィルタリングのパターン

```javascript
// 基本パターン
function showItems() {
  list.replaceChildren();

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let shouldShow = false;

    // フィルタ条件
    if (filterMode === "all") {
      shouldShow = true;
    } else if (filterMode === "条件1") {
      shouldShow = (item.property === value);
    } else if (filterMode === "条件2") {
      shouldShow = (item.property !== value);
    }

    // 表示
    if (shouldShow) {
      // DOM要素を作成
    }
  }

  updateButtons();
}
```

### 次のレッスンの予告

次のレッスン107では、**ソート機能**について学びます。

- タスクを並び替える
- 日付順、優先度順、アルファベット順
- 比較関数の使い方

フィルタリングで**絞り込み**ができるようになったので、次は**並び替え**を学びます！

---

## カリキュラム要件チェック

このレッスンは以下のカリキュラム要件を満たしています：

✅ **完了のみ表示**：`task.completed`でフィルタリング
✅ **未完了のみ表示**：`!task.completed`でフィルタリング
✅ **全て表示**：`filterMode === "all"`で全件表示
✅ **【知識】配列のフィルタリング、表示制御**：詳細に解説
✅ **成果物：フィルタ機能**：3つのフィルタボタンで切り替え可能なTODOアプリを実装
