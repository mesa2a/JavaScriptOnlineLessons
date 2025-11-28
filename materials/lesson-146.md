# レッスン146: TODOアプリ（基本編）

**日付**: 2025-11-26
**トピック**: 配列によるタスク管理、DOM操作、イベント処理

---

## 📋 このレッスンで学ぶこと

配列とDOM操作を組み合わせて、実用的なTODOアプリケーションの基礎を作成します。

- 配列にタスクを保存する
- 入力フォームでタスクを追加する
- ボタンでタスクを削除する
- 配列の内容をHTMLで表示する
- DOM操作とイベント処理の実践

---

## 🌟 日常生活の例：付箋メモとTODOアプリ

### 📝 付箋メモの問題点

やるべきことを「付箋メモ」に書いて机に貼っていたとします。

```
┌──────────────┐
│ 📝 買い物に行く │
└──────────────┘

┌──────────────┐
│ 📝 宿題をする  │
└──────────────┘

┌──────────────┐
│ 📝 メールを送る │
└──────────────┘
```

**付箋メモの問題点**：
- ❌ 付箋が増えると管理が大変（どれがどれか分からなくなる）
- ❌ 風で飛んでいく可能性がある
- ❌ 終わったタスクを剥がすと捨てるだけ（記録が残らない）
- ❌ 並べ替えが面倒
- ❌ 何個あるか数えるのが大変

### 💻 TODOアプリの利点

JavaScriptで作るTODOアプリなら：

```
┌─────────────────────────────┐
│  ✅ TODOリスト             │
├─────────────────────────────┤
│ [タスクを入力...] [追加]   │
├─────────────────────────────┤
│ □ 買い物に行く     [削除]  │
│ □ 宿題をする       [削除]  │
│ □ メールを送る     [削除]  │
├─────────────────────────────┤
│ タスク数: 3件               │
└─────────────────────────────┘
```

**TODOアプリの利点**：
- ✅ 配列で整理されて管理しやすい
- ✅ データが消えない（保存可能）
- ✅ ボタン1つで削除できる
- ✅ 自動で並んでいる
- ✅ タスク数が自動で分かる

このレッスンでは、配列を使ってこのようなTODOアプリを作ります。

---

## 🎯 TODOアプリとは

TODOアプリは、やるべきこと（タスク）を記録して管理するアプリケーションです。

### 基本的な機能

このレッスンで実装する3つの基本機能：

```
┌──────────────────────────┐
│  TODOアプリの基本機能    │
├──────────────────────────┤
│ 1. タスクの追加          │
│    → やるべきことを     │
│       入力して追加       │
│                          │
│ 2. タスクの表示          │
│    → すべてのタスクを   │
│       リスト表示         │
│                          │
│ 3. タスクの削除          │
│    → 終わったタスクを   │
│       削除               │
└──────────────────────────┘
```

---

## 📚 データを配列で管理する

### タスクを配列に保存

```javascript
// タスクを保存する配列（最初は空）
let tasks = [];
```

この`tasks`配列が、すべてのタスクを保存する「入れ物」になります。

**なぜ配列を使うのか**：
- 複数のタスクをまとめて管理できる
- 順序を保持できる（追加した順番が保たれる）
- ループで全タスクを簡単に処理できる
- 追加・削除が簡単

### タスクを追加する

```javascript
let tasks = [];

// タスクを追加
tasks.push("買い物に行く");
tasks.push("宿題をする");
tasks.push("メールを送る");

console.log(tasks);
// ["買い物に行く", "宿題をする", "メールを送る"]

console.log(tasks.length);
// 3
```

**実行の流れ**：

```
初期状態: tasks = []

↓ tasks.push("買い物に行く")

tasks = ["買い物に行く"]
         インデックス0

↓ tasks.push("宿題をする")

tasks = ["買い物に行く", "宿題をする"]
         インデックス0    インデックス1

↓ tasks.push("メールを送る")

tasks = ["買い物に行く", "宿題をする", "メールを送る"]
         インデックス0    インデックス1   インデックス2

tasks.length = 3
```

### タスクを削除する

```javascript
let tasks = ["買い物に行く", "宿題をする", "メールを送る"];

// インデックス1のタスクを削除（"宿題をする"）
tasks.splice(1, 1);

console.log(tasks);
// ["買い物に行く", "メールを送る"]
```

**`splice()`の使い方**：
- `splice(開始位置, 削除する個数)`
- `splice(1, 1)` = インデックス1から1個削除

**実行の流れ**：

```
削除前: tasks = ["買い物に行く", "宿題をする", "メールを送る"]
                  インデックス0    インデックス1   インデックス2

↓ tasks.splice(1, 1)
  （インデックス1から1個削除）

削除後: tasks = ["買い物に行く", "メールを送る"]
                  インデックス0    インデックス1
                                  （自動的に詰まる）
```

---

## 🎨 入力フォームでタスクを追加

### HTML構造

```html
<!-- タスク入力欄 -->
<input type="text" id="taskInput" placeholder="タスクを入力">

<!-- 追加ボタン -->
<button onclick="addTask()">追加</button>

<!-- タスク表示エリア -->
<div id="taskList"></div>
```

### JavaScript: addTask関数

```javascript
let tasks = [];

function addTask() {
  // ステップ1: 入力欄の要素を取得
  let input = document.getElementById('taskInput');

  // ステップ2: 入力された値を取得
  let taskText = input.value;

  // ステップ3: 空でなければ追加
  if (taskText !== "") {
    tasks.push(taskText);      // 配列に追加
    input.value = "";          // 入力欄をクリア
    displayTasks();            // 画面を更新
  }
}
```

**実行の流れ**：

```
ユーザーが "買い物に行く" と入力して「追加」ボタンをクリック

↓ addTask() が呼び出される

ステップ1: input要素を取得
  input = <input id="taskInput">

ステップ2: 入力値を取得
  taskText = "買い物に行く"

ステップ3: 空チェック
  "買い物に行く" !== "" → true（空でない）

  tasks.push("買い物に行く")
  → tasks = ["買い物に行く"]

  input.value = ""
  → 入力欄が空になる

  displayTasks()
  → 画面を更新
```

**重要なポイント**：

1. **空チェックが必要**
   ```javascript
   if (taskText !== "") {  // 空でない場合のみ追加
     tasks.push(taskText);
   }
   ```
   空の入力を防ぐために必ずチェックします。

2. **入力欄をクリア**
   ```javascript
   input.value = "";  // 次の入力のためにクリア
   ```
   追加後は入力欄を空にして、次のタスクを入力しやすくします。

3. **画面を更新**
   ```javascript
   displayTasks();  // 配列の内容を画面に反映
   ```
   配列を変更したら必ず`displayTasks()`を呼んで画面を更新します。

---

## 📺 タスクを画面に表示する

### displayTasks関数

```javascript
function displayTasks() {
  // ステップ1: 表示エリアを取得
  let taskList = document.getElementById('taskList');

  // ステップ2: 空のHTML文字列を用意
  let html = "";

  // ステップ3: 配列のすべてのタスクをループ
  for (let i = 0; i < tasks.length; i++) {
    html += "<div>";
    html += tasks[i];  // タスクのテキスト
    html += " <button onclick='deleteTask(" + i + ")'>削除</button>";
    html += "</div>";
  }

  // ステップ4: 完成したHTMLを画面に表示
  taskList.innerHTML = html;
}
```

**実行の流れ**：

```
tasks = ["買い物に行く", "宿題をする", "メールを送る"]

↓ displayTasks() を呼び出し

ステップ1: taskList要素を取得
  taskList = <div id="taskList">

ステップ2: html = ""

ステップ3: ループで各タスクを処理

  i=0: tasks[0] = "買い物に行く"
    html += "<div>"
    html += "買い物に行く"
    html += " <button onclick='deleteTask(0)'>削除</button>"
    html += "</div>"
    → html = "<div>買い物に行く <button onclick='deleteTask(0)'>削除</button></div>"

  i=1: tasks[1] = "宿題をする"
    html += "<div>"
    html += "宿題をする"
    html += " <button onclick='deleteTask(1)'>削除</button>"
    html += "</div>"
    → html = "<div>買い物に行く <button onclick='deleteTask(0)'>削除</button></div>
              <div>宿題をする <button onclick='deleteTask(1)'>削除</button></div>"

  i=2: tasks[2] = "メールを送る"
    （同様に追加）

ステップ4: HTMLを画面に表示
  taskList.innerHTML = html
  → 画面に3つのタスクが表示される
```

**HTML構造の図解**：

```
生成されるHTML:
┌────────────────────────────────────┐
│ <div id="taskList">                │
│   <div>                            │
│     買い物に行く                   │
│     <button onclick="deleteTask(0)">│
│       削除                         │
│     </button>                      │
│   </div>                           │
│   <div>                            │
│     宿題をする                     │
│     <button onclick="deleteTask(1)">│
│       削除                         │
│     </button>                      │
│   </div>                           │
│   <div>                            │
│     メールを送る                   │
│     <button onclick="deleteTask(2)">│
│       削除                         │
│     </button>                      │
│   </div>                           │
│ </div>                             │
└────────────────────────────────────┘
```

---

## 🗑️ タスクを削除する

### deleteTask関数

```javascript
function deleteTask(index) {
  // ステップ1: 指定されたインデックスのタスクを削除
  tasks.splice(index, 1);

  // ステップ2: 画面を更新
  displayTasks();
}
```

**実行の流れ**：

```
tasks = ["買い物に行く", "宿題をする", "メールを送る"]
         インデックス0    インデックス1   インデックス2

ユーザーが「宿題をする」の削除ボタンをクリック
→ deleteTask(1) が呼び出される

↓

ステップ1: 削除実行
  tasks.splice(1, 1)
  → インデックス1から1個削除

  tasks = ["買い物に行く", "メールを送る"]
           インデックス0    インデックス1
          （後ろが自動的に詰まる）

ステップ2: 画面更新
  displayTasks()
  → 残り2つのタスクが表示される
```

**重要なポイント**：

1. **インデックスをパラメータで受け取る**
   ```javascript
   function deleteTask(index) {  // どのタスクを削除するか
     tasks.splice(index, 1);
   }
   ```

2. **HTMLにインデックスを埋め込む**
   ```javascript
   html += "<button onclick='deleteTask(" + i + ")'>削除</button>";
   ```
   ループのインデックス`i`を使って、各削除ボタンに対応する位置を指定します。

3. **削除後は必ず画面更新**
   ```javascript
   displayTasks();  // 配列の変更を画面に反映
   ```

---

## 💡 実践アプリケーション

### アプリケーション1: 基本的なTODOアプリ

配列を使った最もシンプルなTODOアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TODOアプリ - 基本編</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .container {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      padding: 40px;
      width: 100%;
      max-width: 500px;
    }

    h1 {
      color: #667eea;
      text-align: center;
      margin-bottom: 30px;
      font-size: 32px;
    }

    .input-area {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
    }

    #taskInput {
      flex: 1;
      padding: 15px;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 16px;
      transition: all 0.3s;
    }

    #taskInput:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .add-btn {
      padding: 15px 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .add-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .add-btn:active {
      transform: translateY(0);
    }

    .task-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .task-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 10px;
      transition: all 0.3s;
    }

    .task-item:hover {
      background: #e9ecef;
      transform: translateX(5px);
    }

    .task-text {
      flex: 1;
      font-size: 16px;
      color: #333;
    }

    .delete-btn {
      padding: 8px 20px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .delete-btn:hover {
      background: #c82333;
      transform: scale(1.05);
    }

    .empty-message {
      text-align: center;
      padding: 40px;
      color: #999;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📝 TODOリスト</h1>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="タスクを入力してください...">
      <button class="add-btn" onclick="addTask()">追加</button>
    </div>

    <div id="taskList" class="task-list"></div>
  </div>

  <script>
    // タスクを保存する配列
    let tasks = [];

    // タスクを追加する関数
    function addTask() {
      let input = document.getElementById('taskInput');
      let taskText = input.value;

      if (taskText !== "") {
        tasks.push(taskText);
        input.value = "";
        displayTasks();
      }
    }

    // タスクを削除する関数
    function deleteTask(index) {
      tasks.splice(index, 1);
      displayTasks();
    }

    // タスクを表示する関数
    function displayTasks() {
      let taskList = document.getElementById('taskList');

      if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-message">タスクがありません。追加してください。</div>';
        return;
      }

      let html = "";
      for (let i = 0; i < tasks.length; i++) {
        html += '<div class="task-item">';
        html += '<div class="task-text">' + tasks[i] + '</div>';
        html += '<button class="delete-btn" onclick="deleteTask(' + i + ')">削除</button>';
        html += '</div>';
      }

      taskList.innerHTML = html;
    }

    // Enterキーで追加できるようにする
    document.getElementById('taskInput').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        addTask();
      }
    });

    // 初期表示
    displayTasks();
  </script>
</body>
</html>
```

### アプリケーション2: 番号付きTODOアプリ

各タスクに番号を表示するバージョンです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TODOアプリ - 番号付き</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      min-height: 100vh;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .container {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      padding: 40px;
      width: 100%;
      max-width: 600px;
    }

    h1 {
      color: #f5576c;
      text-align: center;
      margin-bottom: 10px;
      font-size: 32px;
    }

    .task-count {
      text-align: center;
      color: #666;
      margin-bottom: 30px;
      font-size: 14px;
    }

    .input-area {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
    }

    #taskInput {
      flex: 1;
      padding: 15px;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 16px;
      transition: all 0.3s;
    }

    #taskInput:focus {
      outline: none;
      border-color: #f5576c;
      box-shadow: 0 0 0 3px rgba(245, 87, 108, 0.1);
    }

    .add-btn {
      padding: 15px 30px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .add-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(245, 87, 108, 0.4);
    }

    .task-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .task-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 10px;
      transition: all 0.3s;
    }

    .task-item:hover {
      background: #ffe0e6;
      transform: translateX(5px);
    }

    .task-number {
      width: 30px;
      height: 30px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
    }

    .task-text {
      flex: 1;
      font-size: 16px;
      color: #333;
    }

    .delete-btn {
      padding: 8px 20px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .delete-btn:hover {
      background: #c82333;
      transform: scale(1.05);
    }

    .empty-message {
      text-align: center;
      padding: 40px;
      color: #999;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📝 TODOリスト</h1>
    <div class="task-count">タスク数: <span id="taskCount">0</span>件</div>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="タスクを入力してください...">
      <button class="add-btn" onclick="addTask()">追加</button>
    </div>

    <div id="taskList" class="task-list"></div>
  </div>

  <script>
    let tasks = [];

    function addTask() {
      let input = document.getElementById('taskInput');
      let taskText = input.value;

      if (taskText !== "") {
        tasks.push(taskText);
        input.value = "";
        displayTasks();
      }
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      displayTasks();
    }

    function displayTasks() {
      let taskList = document.getElementById('taskList');

      // タスク数を更新
      document.getElementById('taskCount').textContent = tasks.length;

      if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-message">タスクがありません。追加してください。</div>';
        return;
      }

      let html = "";
      for (let i = 0; i < tasks.length; i++) {
        html += '<div class="task-item">';
        html += '<div class="task-number">' + (i + 1) + '</div>';
        html += '<div class="task-text">' + tasks[i] + '</div>';
        html += '<button class="delete-btn" onclick="deleteTask(' + i + ')">削除</button>';
        html += '</div>';
      }

      taskList.innerHTML = html;
    }

    document.getElementById('taskInput').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        addTask();
      }
    });

    displayTasks();
  </script>
</body>
</html>
```

### アプリケーション3: 一括削除機能付きTODOアプリ

全タスクを一度に削除できる機能を追加したバージョンです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TODOアプリ - 一括削除機能付き</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
      min-height: 100vh;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .container {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      padding: 40px;
      width: 100%;
      max-width: 600px;
    }

    h1 {
      color: #5ec9d4;
      text-align: center;
      margin-bottom: 10px;
      font-size: 32px;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-item {
      padding: 10px 20px;
      background: #e8f5f7;
      border-radius: 20px;
      color: #5ec9d4;
      font-weight: 600;
    }

    .input-area {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    #taskInput {
      flex: 1;
      padding: 15px;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 16px;
      transition: all 0.3s;
    }

    #taskInput:focus {
      outline: none;
      border-color: #5ec9d4;
      box-shadow: 0 0 0 3px rgba(94, 201, 212, 0.1);
    }

    .add-btn {
      padding: 15px 30px;
      background: linear-gradient(135deg, #a8edea 0%, #5ec9d4 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .add-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(94, 201, 212, 0.4);
    }

    .clear-btn {
      width: 100%;
      padding: 12px;
      background: #ff6b6b;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      margin-bottom: 20px;
      transition: all 0.3s;
    }

    .clear-btn:hover {
      background: #ee5a52;
      transform: translateY(-2px);
    }

    .task-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .task-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 10px;
      transition: all 0.3s;
    }

    .task-item:hover {
      background: #e0f7fa;
      transform: translateX(5px);
    }

    .task-number {
      width: 30px;
      height: 30px;
      background: linear-gradient(135deg, #a8edea 0%, #5ec9d4 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
    }

    .task-text {
      flex: 1;
      font-size: 16px;
      color: #333;
    }

    .delete-btn {
      padding: 8px 20px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .delete-btn:hover {
      background: #c82333;
      transform: scale(1.05);
    }

    .empty-message {
      text-align: center;
      padding: 40px;
      color: #999;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📝 TODOリスト</h1>

    <div class="stats">
      <div class="stat-item">タスク数: <span id="taskCount">0</span>件</div>
    </div>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="タスクを入力してください...">
      <button class="add-btn" onclick="addTask()">追加</button>
    </div>

    <button class="clear-btn" onclick="deleteAllTasks()">すべてのタスクを削除</button>

    <div id="taskList" class="task-list"></div>
  </div>

  <script>
    let tasks = [];

    function addTask() {
      let input = document.getElementById('taskInput');
      let taskText = input.value;

      if (taskText !== "") {
        tasks.push(taskText);
        input.value = "";
        displayTasks();
      }
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      displayTasks();
    }

    // すべてのタスクを削除
    function deleteAllTasks() {
      if (tasks.length === 0) {
        return;
      }

      if (confirm('すべてのタスクを削除しますか？')) {
        tasks = [];
        displayTasks();
      }
    }

    function displayTasks() {
      let taskList = document.getElementById('taskList');
      document.getElementById('taskCount').textContent = tasks.length;

      if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-message">タスクがありません。追加してください。</div>';
        return;
      }

      let html = "";
      for (let i = 0; i < tasks.length; i++) {
        html += '<div class="task-item">';
        html += '<div class="task-number">' + (i + 1) + '</div>';
        html += '<div class="task-text">' + tasks[i] + '</div>';
        html += '<button class="delete-btn" onclick="deleteTask(' + i + ')">削除</button>';
        html += '</div>';
      }

      taskList.innerHTML = html;
    }

    document.getElementById('taskInput').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        addTask();
      }
    });

    displayTasks();
  </script>
</body>
</html>
```

---

## 🔍 動作の流れの詳細

### タスクを追加したときの完全な流れ

```
1. ユーザーが入力欄に「買い物に行く」と入力

2. 「追加」ボタンをクリック
   ↓
3. addTask() が呼び出される
   ↓
4. input要素を取得
   let input = document.getElementById('taskInput')
   ↓
5. 入力値を取得
   let taskText = input.value
   taskText = "買い物に行く"
   ↓
6. 空チェック
   if (taskText !== "") → true
   ↓
7. 配列に追加
   tasks.push(taskText)
   tasks = ["買い物に行く"]
   ↓
8. 入力欄をクリア
   input.value = ""
   ↓
9. displayTasks() を呼び出し
   ↓
10. 画面が更新される
    "買い物に行く [削除]" が表示される
```

### タスクを削除したときの完全な流れ

```
tasks = ["買い物に行く", "宿題をする", "メールを送る"]

1. ユーザーが「宿題をする」の削除ボタンをクリック
   ↓
2. deleteTask(1) が呼び出される
   （インデックス1 = "宿題をする"）
   ↓
3. splice()で削除
   tasks.splice(1, 1)
   tasks = ["買い物に行く", "メールを送る"]
   ↓
4. displayTasks() を呼び出し
   ↓
5. 画面が更新される
   残り2つのタスクが表示される
```

---

## ⚠️ よくある間違いと解決方法

### 間違い1: displayTasksを呼び忘れ

```javascript
// ❌ 悪い例
function addTask() {
  let input = document.getElementById('taskInput');
  tasks.push(input.value);
  input.value = "";
  // displayTasks()を呼んでいない！
}
```

**問題点**: 配列にはタスクが追加されるが、画面が更新されない

**解決方法**:
```javascript
// ✅ 良い例
function addTask() {
  let input = document.getElementById('taskInput');
  tasks.push(input.value);
  input.value = "";
  displayTasks();  // 必ず呼ぶ！
}
```

### 間違い2: 空の入力をチェックしない

```javascript
// ❌ 悪い例
function addTask() {
  let input = document.getElementById('taskInput');
  tasks.push(input.value);  // 空でも追加してしまう
  input.value = "";
  displayTasks();
}
```

**問題点**: 何も入力せずに追加ボタンを押すと、空のタスクが追加される

**解決方法**:
```javascript
// ✅ 良い例
function addTask() {
  let input = document.getElementById('taskInput');
  let taskText = input.value;

  if (taskText !== "") {  // 空チェック
    tasks.push(taskText);
    input.value = "";
    displayTasks();
  }
}
```

### 間違い3: グローバル変数を忘れる

```javascript
// ❌ 悪い例
function addTask() {
  let tasks = [];  // 毎回新しい配列を作ってしまう！
  tasks.push(taskText);
  displayTasks();
}
```

**問題点**: 関数内で新しい配列を作るため、タスクが保存されない

**解決方法**:
```javascript
// ✅ 良い例
let tasks = [];  // グローバルに宣言

function addTask() {
  // グローバルのtasksを使う
  tasks.push(taskText);
  displayTasks();
}
```

---

## ✅ カリキュラム仕様の確認

このレッスンは、curriculum.mdの以下の項目を満たしています：

### レッスン146：TODOアプリ（基本編）（30分）
- ✅ **配列にタスクを保存**: `let tasks = []`でタスクを管理
- ✅ **入力フォームでタスク追加**: `addTask()`関数で入力フォームからタスクを追加
- ✅ **ボタンでタスク削除**: `deleteTask(index)`関数で削除ボタンから削除
- ✅ **配列をHTMLで表示**: `displayTasks()`関数でforループを使って全タスクを表示
- ✅ **知識: 配列、DOM操作、イベント処理**: `push()`, `splice()`, `getElementById()`, `innerHTML`, `onclick`などを実践
- ✅ **成果物: シンプルなTODOアプリ**: 3つの完全動作するTODOアプリを作成

---

## 📝 まとめ

このレッスンでは、配列を使った基本的なTODOアプリを作成しました。

### 学んだこと

1. **配列でデータ管理**
   - `let tasks = []`で複数のタスクを管理
   - タスクを文字列として保存

2. **配列の操作**
   - `push()`: 配列の最後に追加
   - `splice()`: 指定位置から削除
   - `length`: 配列の要素数を取得

3. **DOM操作**
   - `getElementById()`: 要素を取得
   - `value`: 入力欄の値を取得・設定
   - `innerHTML`: HTMLを動的に生成

4. **イベント処理**
   - `onclick`: クリックイベント
   - `addEventListener('keypress')`: Enterキーでの追加

5. **関数の分割**
   - `addTask()`: タスク追加
   - `deleteTask()`: タスク削除
   - `displayTasks()`: 画面表示

### 重要なパターン

```javascript
// 配列を変更したら必ず画面を更新
tasks.push(taskText);
displayTasks();  // 更新！

tasks.splice(index, 1);
displayTasks();  // 更新！
```

このパターンを覚えておくと、配列を使ったアプリケーションが作りやすくなります。

---

## 🚀 次のレッスンでは

次のレッスンでは、タスクを**オブジェクト**で管理します。

```javascript
// 現在（文字列）
tasks = ["買い物に行く", "宿題をする"]

// 次回（オブジェクト）
tasks = [
  {id: 1, text: "買い物に行く", done: false},
  {id: 2, text: "宿題をする", done: false}
]
```

オブジェクトにすることで、以下の機能が実装できるようになります：
- ✅ 完了/未完了の切り替え
- ✅ IDによる確実な管理
- ✅ より多くの情報の管理（期限、優先度など）

---

**作成日**: 2025-11-26
**トピック**: TODOアプリ基本編、配列によるタスク管理、DOM操作、イベント処理
