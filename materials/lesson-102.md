---
title: "レッスン102：タスク表示"
author: "JavaScript Online Lessons"
date: "2025-01-21"
---

# レッスン102：タスク表示

## 今回の学習

前回のレッスンでは、タスクの追加方法を学びました：

- 入力欄とボタンを用意する
- 配列に要素を追加する
- 画面に即座に反映する

今回は、追加したタスクを見やすく表示する方法を学びます：

- 番号付きで表示する
- 見やすく整形する
- CSSでスタイルを適用する
- インデックスを活用する

## 1. 番号付き表示

### forループのインデックスを使う

通常の`for`ループを使うと、インデックス（番号）が利用できます：

```javascript
function showTasks() {
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let li = document.createElement("li");
    li.textContent = (i + 1) + ". " + task;  // 1. タスク名
    taskList.appendChild(li);
  }
}
```

`i + 1`とすることで、0から始まるインデックスを1から始まる番号に変換します。

### for...ofではインデックスが使えない

```javascript
// for...of では番号を付けられない
for (let task of tasks) {
  // インデックスが分からない
}
```

番号が必要な時は、通常の`for`ループを使いましょう。

## 2. 構造化された表示

### 情報を分けて表示

番号とタスク名を別々の要素にします：

```javascript
for (let i = 0; i < tasks.length; i++) {
  let task = tasks[i];

  let li = document.createElement("li");

  // 番号を作成
  let number = document.createElement("span");
  number.className = "task-number";
  number.textContent = (i + 1) + ".";

  // タスク名を作成
  let text = document.createElement("span");
  text.className = "task-text";
  text.textContent = task;

  // 組み立て
  li.appendChild(number);
  li.appendChild(text);

  taskList.appendChild(li);
}
```

### divでラップする

より複雑なレイアウトには`<div>`を使います：

```javascript
for (let i = 0; i < tasks.length; i++) {
  let task = tasks[i];

  let div = document.createElement("div");
  div.className = "task-item";

  let number = document.createElement("span");
  number.className = "task-number";
  number.textContent = "#" + (i + 1);

  let text = document.createElement("span");
  text.className = "task-text";
  text.textContent = task;

  div.appendChild(number);
  div.appendChild(text);

  container.appendChild(div);
}
```

## 3. CSSでスタイリング

### 基本的なスタイル

```css
.task-item {
  display: flex;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
}

.task-number {
  font-weight: bold;
  color: #4CAF50;
  margin-right: 10px;
  min-width: 30px;
}

.task-text {
  flex-grow: 1;
  font-size: 16px;
}
```

### 交互に色を変える

CSS の`:nth-child`を使う方法もありますが、JavaScriptで制御することもできます：

```javascript
for (let i = 0; i < tasks.length; i++) {
  let div = document.createElement("div");
  div.className = "task-item";

  // 偶数行と奇数行で色を変える
  if (i % 2 === 0) {
    div.style.backgroundColor = "#f9f9f9";
  } else {
    div.style.backgroundColor = "white";
  }

  // ...
}
```

## 4. オブジェクトの配列を表示

### 複数の情報を表示

タスクがオブジェクトの場合、複数の情報を表示できます：

```javascript
let tasks = [
  { title: "買い物", priority: "高" },
  { title: "掃除", priority: "中" },
  { title: "読書", priority: "低" }
];

function showTasks() {
  container.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let div = document.createElement("div");
    div.className = "task-item";

    // 番号
    let number = document.createElement("span");
    number.className = "task-number";
    number.textContent = (i + 1);

    // タイトル
    let title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    // 優先度
    let priority = document.createElement("span");
    priority.className = "task-priority";
    priority.textContent = task.priority;

    // 優先度に応じてクラスを追加
    if (task.priority === "高") {
      priority.classList.add("priority-high");
    } else if (task.priority === "中") {
      priority.classList.add("priority-medium");
    } else {
      priority.classList.add("priority-low");
    }

    div.appendChild(number);
    div.appendChild(title);
    div.appendChild(priority);

    container.appendChild(div);
  }
}
```

## 5. 空の状態の表示

### タスクが無い時のメッセージ

```javascript
function showTasks() {
  taskList.replaceChildren();

  if (tasks.length === 0) {
    let empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "まだタスクがありません";
    taskList.appendChild(empty);
    return;  // ここで終了
  }

  // タスクを表示
  for (let i = 0; i < tasks.length; i++) {
    // ...
  }
}
```

CSSでスタイリング：

```css
.empty-message {
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 40px;
}
```

## 6. アイコンの追加

### 絵文字を使う

```javascript
let number = document.createElement("span");
number.textContent = "✓ " + (i + 1);
```

### 優先度アイコン

```javascript
let icon = "";
if (task.priority === "高") {
  icon = "🔴";
} else if (task.priority === "中") {
  icon = "🟡";
} else {
  icon = "🟢";
}

let priority = document.createElement("span");
priority.textContent = icon + " " + task.priority;
```

## 実践例：タスク管理アプリ（表示機能）

見やすい表示機能を持つタスク管理アプリを作ってみましょう：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>タスク管理</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 800px;
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
      width: 300px;
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
      border-radius: 8px;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .task-number {
      font-weight: bold;
      color: #666;
      margin-right: 15px;
      min-width: 30px;
      font-size: 18px;
    }
    .task-content {
      flex-grow: 1;
    }
    .task-title {
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
    .empty-message {
      text-align: center;
      color: #999;
      font-style: italic;
      padding: 40px;
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
  <h1>📋 タスク管理</h1>

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

```javascript
let tasks = [];

let taskInput = document.getElementById("taskInput");
let prioritySelect = document.getElementById("prioritySelect");
let addButton = document.getElementById("addButton");
let taskCount = document.getElementById("taskCount");
let taskList = document.getElementById("taskList");

addButton.addEventListener("click", function() {
  let title = taskInput.value.trim();
  let priority = prioritySelect.value;

  if (title === "") {
    alert("タスクを入力してください");
    return;
  }

  let task = {
    title: title,
    priority: priority
  };

  tasks.push(task);
  showTasks();

  taskInput.value = "";
  taskInput.focus();
});

taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

function showTasks() {
  taskList.replaceChildren();
  taskCount.textContent = tasks.length;

  if (tasks.length === 0) {
    let empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "まだタスクがありません";
    taskList.appendChild(empty);
    return;
  }

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let item = document.createElement("div");
    item.className = "task-item";

    // 番号
    let number = document.createElement("div");
    number.className = "task-number";
    number.textContent = "#" + (i + 1);

    // コンテンツ
    let content = document.createElement("div");
    content.className = "task-content";

    let title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    let priority = document.createElement("span");
    priority.className = "task-priority";

    // アイコンを追加
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

    content.appendChild(title);
    content.appendChild(priority);

    item.appendChild(number);
    item.appendChild(content);

    taskList.appendChild(item);
  }
}

showTasks();
taskInput.focus();
```

このコードのポイント：

1. **構造化された表示**：番号、タイトル、優先度を別々の要素で表示
2. **CSSスタイリング**：見やすいデザインを適用
3. **条件付きスタイル**：優先度に応じて色を変える
4. **アイコン使用**：絵文字で視覚的にわかりやすく
5. **空の状態**：タスクが無い時のメッセージ

## 練習問題

「学習記録アプリ」を作成してください：

### 要件

1. 科目名と学習時間（分）を入力できる
2. 追加した記録を番号付きで表示
3. 科目名と学習時間を見やすく整形
4. 合計学習時間を表示
5. CSSで見やすくスタイリング

### ヒント

```javascript
let records = [];

function showRecords() {
  container.replaceChildren();

  let totalMinutes = 0;

  for (let i = 0; i < records.length; i++) {
    let record = records[i];
    totalMinutes += record.minutes;

    let div = document.createElement("div");
    div.className = "record-item";

    let number = document.createElement("span");
    number.textContent = (i + 1) + ".";

    let subject = document.createElement("span");
    subject.textContent = record.subject;

    let time = document.createElement("span");
    time.textContent = record.minutes + "分";

    div.appendChild(number);
    div.appendChild(subject);
    div.appendChild(time);

    container.appendChild(div);
  }

  totalElement.textContent = totalMinutes + "分";
}
```

## まとめ

今回は、タスクを見やすく表示する方法を学びました：

- **番号付き表示**：forループのインデックスを利用
- **構造化**：情報を別々の要素に分けて表示
- **CSSスタイリング**：見やすいデザインを適用
- **条件付きスタイル**：データに応じて表示を変える
- **アイコン**：絵文字で視覚的にわかりやすく
- **空の状態**：データが無い時の適切な表示
- **集計表示**：配列の`length`や合計を表示

見やすい表示は、ユーザー体験を大きく向上させます。情報を適切に整理し、CSSでスタイリングすることで、使いやすいアプリケーションが作れます。

次のレッスンでは、タスクの削除機能について学びます。
