# レッスン148: TODOアプリ（関数編）

**日付**: 2025-11-26
**トピック**: 関数の分割、コードの整理、単一責任の原則

---

## 📋 このレッスンで学ぶこと

前回までのTODOアプリのコードを、関数に適切に分割して整理します。

- コードを関数に分割する
- 関数の役割を明確にする
- コードの整理と可読性向上
- 再利用可能な関数を作る
- 良い関数の命名方法

---

## 🌟 日常生活の例：ごちゃごちゃの部屋と整理された部屋

### 🏚️ ごちゃごちゃの部屋（関数で分割していないコード）

すべてのものが1つの場所に散らばっている部屋を想像してください。

```
┌──────────────────────────────┐
│  ごちゃごちゃの部屋          │
├──────────────────────────────┤
│ 📚 本                        │
│ 👕 服                        │
│ 🍽️ 食器                      │
│ 🎮 ゲーム                    │
│ 📱 スマホ                    │
│ 💻 パソコン                  │
│ すべてが1つの部屋に混在      │
└──────────────────────────────┘
```

**問題点**：
- ❌ どこに何があるか分からない
- ❌ 探すのに時間がかかる
- ❌ 片付けるのが大変
- ❌ 整理整頓ができない

### 🏡 整理された部屋（関数で分割したコード）

用途ごとに部屋を分けた家を想像してください。

```
┌──────────────────────────────┐
│  整理された家                │
├──────────────────────────────┤
│ 📚 書斎：本や勉強道具        │
│ 👕 寝室：服や寝具            │
│ 🍽️ キッチン：食器や調理器具  │
│ 🎮 リビング：ゲームやテレビ  │
│ 各部屋に役割がある           │
└──────────────────────────────┘
```

**利点**：
- ✅ 何がどこにあるか一目瞭然
- ✅ すぐに見つけられる
- ✅ 整理しやすい
- ✅ 使いやすい

このレッスンでは、コードを「部屋」のように整理します。

---

## 🎯 なぜ関数に分割するのか

### 分割していないコードの問題点

```javascript
// すべてが1つの関数に詰め込まれている
function doEverything() {
  // タスクを追加
  let input = document.getElementById('taskInput');
  let task = { id: 1, text: input.value, done: false };
  tasks.push(task);

  // 画面を更新
  let html = "";
  for (let i = 0; i < tasks.length; i++) {
    html += "<div>..." + tasks[i].text + "</div>";
  }
  document.getElementById('taskList').innerHTML = html;

  // 統計を計算
  let completedCount = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done) completedCount++;
  }
  console.log("完了: " + completedCount);
}
```

**問題点**：
- ❌ どこに何が書いてあるか分かりにくい
- ❌ 同じ処理を何度も書いてしまう
- ❌ バグを見つけにくい
- ❌ 修正が大変
- ❌ テストしにくい

### 関数で分割したコード

```javascript
// 役割ごとに関数を分割
function addTask(text) {
  // タスクの追加だけを行う
}

function displayTasks() {
  // タスクの表示だけを行う
}

function getCompletedCount() {
  // 統計の計算だけを行う
}
```

**利点**：
- ✅ 何をする関数か一目瞭然
- ✅ 再利用できる
- ✅ バグを見つけやすい
- ✅ 修正しやすい
- ✅ テストしやすい

---

## 📚 良い関数の特徴

### 1. 1つの関数は1つのことだけする（単一責任の原則）

```javascript
// ❌ 悪い例：複数のことをしている
function addAndDisplay(text) {
  // タスクを追加
  let newTask = { id: taskIdCounter, text: text, done: false };
  taskIdCounter++;
  tasks.push(newTask);

  // 画面を表示
  displayTasks();

  // 統計を更新
  updateStats();
}

// ✅ 良い例：1つのことだけする
function addTask(text) {
  let newTask = { id: taskIdCounter, text: text, done: false };
  taskIdCounter++;
  tasks.push(newTask);
  return newTask;
}
```

### 2. 関数名から何をするか分かる

```javascript
// ❌ 悪い例：何をするか不明
function doIt() { ... }
function process() { ... }
function handle() { ... }

// ✅ 良い例：何をするか明確
function addTask(text) { ... }
function deleteTask(id) { ... }
function displayTasks() { ... }
```

### 3. 短い（10〜30行程度）

```javascript
// ❌ 悪い例：長すぎる（100行以上）
function displayTasks() {
  // 100行以上のコード...
}

// ✅ 良い例：短く分割
function displayTasks() {
  // 10〜20行のコード
  let html = "";
  for (let i = 0; i < tasks.length; i++) {
    html += createTaskHTML(tasks[i]);  // 別関数に分割
  }
  document.getElementById('taskList').innerHTML = html;
}

function createTaskHTML(task) {
  // 10〜20行のコード
  let html = '<div class="task-item">';
  // ...
  return html;
}
```

### 4. 再利用できる

```javascript
// ✅ 再利用可能な関数
function getTaskById(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      return tasks[i];
    }
  }
  return null;
}

// この関数は複数の場所で使える
function toggleTask(id) {
  let task = getTaskById(id);  // 再利用
  if (task !== null) {
    task.done = !task.done;
  }
}

function deleteTask(id) {
  let task = getTaskById(id);  // 再利用
  if (task !== null) {
    // 削除処理
  }
}
```

---

## 🗂️ 関数の分類

TODOアプリの関数を役割ごとに分類します。

### 1. データ操作関数（ビジネスロジック）

データを直接操作する関数です。

```javascript
// タスクを追加
function addTask(text) {
  let newTask = {
    id: taskIdCounter,
    text: text,
    done: false
  };
  taskIdCounter = taskIdCounter + 1;
  tasks.push(newTask);
  return newTask;
}

// IDでタスクを検索
function getTaskById(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      return tasks[i];
    }
  }
  return null;
}

// タスクを削除
function deleteTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      return true;
    }
  }
  return false;
}

// 完了状態を切り替え
function toggleTask(id) {
  let task = getTaskById(id);
  if (task !== null) {
    task.done = !task.done;
    return true;
  }
  return false;
}
```

**特徴**：
- データ（`tasks`配列）を直接操作
- 画面表示には関わらない
- 戻り値でデータを返す

### 2. 表示関数（ビューロジック）

画面の表示を担当する関数です。

```javascript
// すべてのタスクを表示
function displayTasks() {
  let taskList = document.getElementById('taskList');

  if (tasks.length === 0) {
    taskList.innerHTML = '<p class="empty">タスクがありません</p>';
    return;
  }

  let html = "";
  for (let i = 0; i < tasks.length; i++) {
    html += createTaskHTML(tasks[i]);
  }
  taskList.innerHTML = html;
}

// 1つのタスクのHTMLを作成
function createTaskHTML(task) {
  let doneClass = task.done ? "done" : "";
  let checked = task.done ? "checked" : "";

  let html = '<div class="task-item ' + doneClass + '">';
  html += '  <input type="checkbox" ' + checked;
  html += '  onchange="handleToggle(' + task.id + ')">';
  html += '  <span>' + task.text + '</span>';
  html += '  <button onclick="handleDelete(' + task.id + ')">削除</button>';
  html += '</div>';

  return html;
}
```

**特徴**：
- DOM操作を担当
- データは変更しない
- HTMLを生成・表示する

### 3. イベントハンドラ関数

ユーザーの操作を処理する関数です。

```javascript
// 追加ボタンがクリックされた
function handleAdd() {
  let input = document.getElementById('taskInput');
  let text = input.value.trim();

  if (text !== "") {
    addTask(text);      // データ操作関数を呼ぶ
    input.value = "";
    displayTasks();     // 表示関数を呼ぶ
  }
}

// チェックボックスが変更された
function handleToggle(id) {
  toggleTask(id);       // データ操作関数を呼ぶ
  displayTasks();       // 表示関数を呼ぶ
}

// 削除ボタンがクリックされた
function handleDelete(id) {
  deleteTask(id);       // データ操作関数を呼ぶ
  displayTasks();       // 表示関数を呼ぶ
}
```

**特徴**：
- ユーザーの操作を受け取る
- 他の関数を組み合わせて処理
- `handle`で始める命名

### 4. ヘルパー関数（補助関数）

補助的な計算や処理を行う関数です。

```javascript
// 完了タスク数を取得
function getCompletedCount() {
  let count = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done === true) {
      count = count + 1;
    }
  }
  return count;
}

// 未完了タスク数を取得
function getIncompleteCount() {
  let count = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done === false) {
      count = count + 1;
    }
  }
  return count;
}

// 総タスク数を取得
function getTotalCount() {
  return tasks.length;
}
```

**特徴**：
- 計算や集計を担当
- 小さくて再利用可能
- データを変更しない

---

## 📛 関数の命名規則

### 動詞で始める

関数は「何をするか」を表すので、動詞で始めます。

```javascript
// ✅ 良い例
addTask()       // タスクを追加する
deleteTask()    // タスクを削除する
displayTasks()  // タスクを表示する
getTaskById()   // タスクを取得する
toggleTask()    // タスクを切り替える
createTaskHTML()// HTMLを作成する

// ❌ 悪い例
task()          // 何をするか不明
taskList()      // 何をするか不明
todo()          // 何をするか不明
```

### よく使う動詞

| 動詞 | 意味 | 例 |
|------|------|-----|
| **get** | 取得する | `getTaskById(id)` |
| **set** | 設定する | `setCompleted(id)` |
| **add** | 追加する | `addTask(text)` |
| **delete** | 削除する | `deleteTask(id)` |
| **remove** | 削除する | `removeTask(id)` |
| **update** | 更新する | `updateTask(id, text)` |
| **toggle** | 切り替える | `toggleTask(id)` |
| **display** | 表示する | `displayTasks()` |
| **show** | 表示する | `showTask(id)` |
| **hide** | 非表示にする | `hideTask(id)` |
| **create** | 作成する | `createTaskHTML(task)` |
| **handle** | 処理する | `handleClick()` |
| **calculate** | 計算する | `calculateTotal()` |

### ハンドラ関数の命名

イベントハンドラは `handle` で始めると分かりやすいです。

```javascript
handleAdd()      // 追加ボタンのハンドラ
handleDelete()   // 削除ボタンのハンドラ
handleToggle()   // チェックボックスのハンドラ
handleSubmit()   // フォーム送信のハンドラ
handleClick()    // クリックのハンドラ
```

---

## 💡 実践アプリケーション

### アプリケーション1: 関数で整理されたTODOアプリ

関数に適切に分割された完全なTODOアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TODOアプリ - 関数編</title>
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
      max-width: 600px;
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
      background: #e9ecef;
      transform: translateX(5px);
    }

    .task-item.done {
      background: #e8f5e9;
    }

    .task-item input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .task-item span {
      flex: 1;
      font-size: 16px;
      color: #333;
    }

    .task-item.done span {
      text-decoration: line-through;
      color: #999;
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

    .empty {
      text-align: center;
      padding: 40px;
      color: #999;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>✅ TODOリスト</h1>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="タスクを入力してください...">
      <button class="add-btn" onclick="handleAdd()">追加</button>
    </div>

    <div id="taskList" class="task-list"></div>
  </div>

  <script>
    // ========================================
    // データ
    // ========================================

    let tasks = [];
    let taskIdCounter = 1;

    // ========================================
    // データ操作関数
    // ========================================

    function addTask(text) {
      let newTask = {
        id: taskIdCounter,
        text: text,
        done: false
      };
      taskIdCounter = taskIdCounter + 1;
      tasks.push(newTask);
      return newTask;
    }

    function getTaskById(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          return tasks[i];
        }
      }
      return null;
    }

    function deleteTask(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          tasks.splice(i, 1);
          return true;
        }
      }
      return false;
    }

    function toggleTask(id) {
      let task = getTaskById(id);
      if (task !== null) {
        task.done = !task.done;
        return true;
      }
      return false;
    }

    // ========================================
    // 表示関数
    // ========================================

    function displayTasks() {
      let taskList = document.getElementById('taskList');

      if (tasks.length === 0) {
        taskList.innerHTML = '<p class="empty">タスクがありません。追加してください。</p>';
        return;
      }

      let html = "";
      for (let i = 0; i < tasks.length; i++) {
        html += createTaskHTML(tasks[i]);
      }
      taskList.innerHTML = html;
    }

    function createTaskHTML(task) {
      let doneClass = task.done ? "done" : "";
      let checked = task.done ? "checked" : "";

      let html = '<div class="task-item ' + doneClass + '">';
      html += '  <input type="checkbox" ' + checked;
      html += '  onchange="handleToggle(' + task.id + ')">';
      html += '  <span>' + task.text + '</span>';
      html += '  <button class="delete-btn" onclick="handleDelete(' + task.id + ')">削除</button>';
      html += '</div>';

      return html;
    }

    // ========================================
    // イベントハンドラ
    // ========================================

    function handleAdd() {
      let input = document.getElementById('taskInput');
      let text = input.value.trim();

      if (text !== "") {
        addTask(text);
        input.value = "";
        displayTasks();
      }
    }

    function handleToggle(id) {
      toggleTask(id);
      displayTasks();
    }

    function handleDelete(id) {
      deleteTask(id);
      displayTasks();
    }

    // ========================================
    // ヘルパー関数
    // ========================================

    function getCompletedCount() {
      let count = 0;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].done === true) {
          count = count + 1;
        }
      }
      return count;
    }

    function getIncompleteCount() {
      let count = 0;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].done === false) {
          count = count + 1;
        }
      }
      return count;
    }

    function getTotalCount() {
      return tasks.length;
    }

    // ========================================
    // 初期化
    // ========================================

    document.getElementById('taskInput').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        handleAdd();
      }
    });

    displayTasks();
  </script>
</body>
</html>
```

### アプリケーション2: 統計表示機能付きTODOアプリ

統計情報を表示する関数を追加したバージョンです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TODOアプリ - 統計機能付き</title>
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
      margin-bottom: 20px;
      font-size: 32px;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 30px;
    }

    .stat-item {
      padding: 15px;
      background: #fff3f4;
      border-radius: 10px;
      text-align: center;
    }

    .stat-number {
      font-size: 24px;
      font-weight: bold;
      color: #f5576c;
    }

    .stat-label {
      font-size: 12px;
      color: #666;
      margin-top: 5px;
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
      background: #ffe5e9;
      transform: translateX(5px);
    }

    .task-item.done {
      background: #e8f5e9;
    }

    .task-item input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .task-item span {
      flex: 1;
      font-size: 16px;
      color: #333;
    }

    .task-item.done span {
      text-decoration: line-through;
      color: #999;
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

    .empty {
      text-align: center;
      padding: 40px;
      color: #999;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>✅ TODOリスト</h1>

    <div class="stats">
      <div class="stat-item">
        <div class="stat-number" id="totalCount">0</div>
        <div class="stat-label">総タスク</div>
      </div>
      <div class="stat-item">
        <div class="stat-number" id="completedCount">0</div>
        <div class="stat-label">完了</div>
      </div>
      <div class="stat-item">
        <div class="stat-number" id="incompleteCount">0</div>
        <div class="stat-label">未完了</div>
      </div>
    </div>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="タスクを入力してください...">
      <button class="add-btn" onclick="handleAdd()">追加</button>
    </div>

    <div id="taskList" class="task-list"></div>
  </div>

  <script>
    // ========================================
    // データ
    // ========================================

    let tasks = [];
    let taskIdCounter = 1;

    // ========================================
    // データ操作関数
    // ========================================

    function addTask(text) {
      let newTask = {
        id: taskIdCounter,
        text: text,
        done: false
      };
      taskIdCounter = taskIdCounter + 1;
      tasks.push(newTask);
      return newTask;
    }

    function getTaskById(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          return tasks[i];
        }
      }
      return null;
    }

    function deleteTask(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          tasks.splice(i, 1);
          return true;
        }
      }
      return false;
    }

    function toggleTask(id) {
      let task = getTaskById(id);
      if (task !== null) {
        task.done = !task.done;
        return true;
      }
      return false;
    }

    // ========================================
    // 表示関数
    // ========================================

    function displayTasks() {
      let taskList = document.getElementById('taskList');

      if (tasks.length === 0) {
        taskList.innerHTML = '<p class="empty">タスクがありません。追加してください。</p>';
        return;
      }

      let html = "";
      for (let i = 0; i < tasks.length; i++) {
        html += createTaskHTML(tasks[i]);
      }
      taskList.innerHTML = html;
    }

    function createTaskHTML(task) {
      let doneClass = task.done ? "done" : "";
      let checked = task.done ? "checked" : "";

      let html = '<div class="task-item ' + doneClass + '">';
      html += '  <input type="checkbox" ' + checked;
      html += '  onchange="handleToggle(' + task.id + ')">';
      html += '  <span>' + task.text + '</span>';
      html += '  <button class="delete-btn" onclick="handleDelete(' + task.id + ')">削除</button>';
      html += '</div>';

      return html;
    }

    function displayStats() {
      document.getElementById('totalCount').textContent = getTotalCount();
      document.getElementById('completedCount').textContent = getCompletedCount();
      document.getElementById('incompleteCount').textContent = getIncompleteCount();
    }

    // ========================================
    // イベントハンドラ
    // ========================================

    function handleAdd() {
      let input = document.getElementById('taskInput');
      let text = input.value.trim();

      if (text !== "") {
        addTask(text);
        input.value = "";
        displayTasks();
        displayStats();
      }
    }

    function handleToggle(id) {
      toggleTask(id);
      displayTasks();
      displayStats();
    }

    function handleDelete(id) {
      deleteTask(id);
      displayTasks();
      displayStats();
    }

    // ========================================
    // ヘルパー関数
    // ========================================

    function getCompletedCount() {
      let count = 0;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].done === true) {
          count = count + 1;
        }
      }
      return count;
    }

    function getIncompleteCount() {
      let count = 0;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].done === false) {
          count = count + 1;
        }
      }
      return count;
    }

    function getTotalCount() {
      return tasks.length;
    }

    // ========================================
    // 初期化
    // ========================================

    document.getElementById('taskInput').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        handleAdd();
      }
    });

    displayTasks();
    displayStats();
  </script>
</body>
</html>
```

### アプリケーション3: すべて削除機能付きTODOアプリ

すべてのタスクを削除する関数を追加したバージョンです。

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
      margin-bottom: 30px;
      font-size: 32px;
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

    .task-item.done {
      background: #e8f5e9;
    }

    .task-item input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .task-item span {
      flex: 1;
      font-size: 16px;
      color: #333;
    }

    .task-item.done span {
      text-decoration: line-through;
      color: #999;
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

    .empty {
      text-align: center;
      padding: 40px;
      color: #999;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>✅ TODOリスト</h1>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="タスクを入力してください...">
      <button class="add-btn" onclick="handleAdd()">追加</button>
    </div>

    <button class="clear-btn" onclick="handleDeleteAll()">すべてのタスクを削除</button>

    <div id="taskList" class="task-list"></div>
  </div>

  <script>
    // ========================================
    // データ
    // ========================================

    let tasks = [];
    let taskIdCounter = 1;

    // ========================================
    // データ操作関数
    // ========================================

    function addTask(text) {
      let newTask = {
        id: taskIdCounter,
        text: text,
        done: false
      };
      taskIdCounter = taskIdCounter + 1;
      tasks.push(newTask);
      return newTask;
    }

    function getTaskById(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          return tasks[i];
        }
      }
      return null;
    }

    function deleteTask(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          tasks.splice(i, 1);
          return true;
        }
      }
      return false;
    }

    function deleteAllTasks() {
      tasks = [];
      return true;
    }

    function toggleTask(id) {
      let task = getTaskById(id);
      if (task !== null) {
        task.done = !task.done;
        return true;
      }
      return false;
    }

    // ========================================
    // 表示関数
    // ========================================

    function displayTasks() {
      let taskList = document.getElementById('taskList');

      if (tasks.length === 0) {
        taskList.innerHTML = '<p class="empty">タスクがありません。追加してください。</p>';
        return;
      }

      let html = "";
      for (let i = 0; i < tasks.length; i++) {
        html += createTaskHTML(tasks[i]);
      }
      taskList.innerHTML = html;
    }

    function createTaskHTML(task) {
      let doneClass = task.done ? "done" : "";
      let checked = task.done ? "checked" : "";

      let html = '<div class="task-item ' + doneClass + '">';
      html += '  <input type="checkbox" ' + checked;
      html += '  onchange="handleToggle(' + task.id + ')">';
      html += '  <span>' + task.text + '</span>';
      html += '  <button class="delete-btn" onclick="handleDelete(' + task.id + ')">削除</button>';
      html += '</div>';

      return html;
    }

    // ========================================
    // イベントハンドラ
    // ========================================

    function handleAdd() {
      let input = document.getElementById('taskInput');
      let text = input.value.trim();

      if (text !== "") {
        addTask(text);
        input.value = "";
        displayTasks();
      }
    }

    function handleToggle(id) {
      toggleTask(id);
      displayTasks();
    }

    function handleDelete(id) {
      deleteTask(id);
      displayTasks();
    }

    function handleDeleteAll() {
      if (tasks.length === 0) {
        return;
      }

      if (confirm('すべてのタスクを削除しますか？')) {
        deleteAllTasks();
        displayTasks();
      }
    }

    // ========================================
    // ヘルパー関数
    // ========================================

    function getCompletedCount() {
      let count = 0;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].done === true) {
          count = count + 1;
        }
      }
      return count;
    }

    function getIncompleteCount() {
      let count = 0;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].done === false) {
          count = count + 1;
        }
      }
      return count;
    }

    function getTotalCount() {
      return tasks.length;
    }

    // ========================================
    // 初期化
    // ========================================

    document.getElementById('taskInput').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        handleAdd();
      }
    });

    displayTasks();
  </script>
</body>
</html>
```

---

## 📐 コードの整理方法

### コメントで区切る

関数が増えたら、コメントで区切ると見やすくなります。

```javascript
// ========================================
// データ
// ========================================

let tasks = [];
let taskIdCounter = 1;

// ========================================
// データ操作関数
// ========================================

function addTask(text) { ... }
function deleteTask(id) { ... }
function toggleTask(id) { ... }

// ========================================
// 表示関数
// ========================================

function displayTasks() { ... }
function createTaskHTML(task) { ... }

// ========================================
// イベントハンドラ
// ========================================

function handleAdd() { ... }
function handleDelete(id) { ... }
function handleToggle(id) { ... }

// ========================================
// ヘルパー関数
// ========================================

function getCompletedCount() { ... }
function getIncompleteCount() { ... }

// ========================================
// 初期化
// ========================================

displayTasks();
```

---

## 🔍 関数分割のビフォー・アフター

### ビフォー（分割前）

```javascript
// すべてが1つの関数
function handleAdd() {
  let input = document.getElementById('taskInput');
  let text = input.value.trim();

  if (text !== "") {
    // タスク追加の処理
    let newTask = {
      id: taskIdCounter,
      text: text,
      done: false
    };
    taskIdCounter++;
    tasks.push(newTask);

    // 画面表示の処理
    let taskList = document.getElementById('taskList');
    let html = "";
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      let doneClass = task.done ? "done" : "";
      html += '<div class="task-item ' + doneClass + '">';
      html += '<span>' + task.text + '</span>';
      html += '</div>';
    }
    taskList.innerHTML = html;

    input.value = "";
  }
}
```

**問題点**：
- 1つの関数が長い（20行以上）
- 追加と表示が混在している
- 再利用できない

### アフター（分割後）

```javascript
// データ操作関数
function addTask(text) {
  let newTask = {
    id: taskIdCounter,
    text: text,
    done: false
  };
  taskIdCounter++;
  tasks.push(newTask);
  return newTask;
}

// 表示関数
function displayTasks() {
  let taskList = document.getElementById('taskList');
  let html = "";
  for (let i = 0; i < tasks.length; i++) {
    html += createTaskHTML(tasks[i]);
  }
  taskList.innerHTML = html;
}

// イベントハンドラ
function handleAdd() {
  let input = document.getElementById('taskInput');
  let text = input.value.trim();

  if (text !== "") {
    addTask(text);      // データ操作を呼ぶ
    displayTasks();     // 表示を呼ぶ
    input.value = "";
  }
}
```

**改善点**：
- ✅ 各関数が短い（5〜10行）
- ✅ 役割が明確
- ✅ 再利用できる
- ✅ テストしやすい

---

## ✅ カリキュラム仕様の確認

このレッスンは、curriculum.mdの以下の項目を満たしています：

### レッスン148：TODOアプリ（関数編）（30分）
- ✅ **addTask関数を作る**: タスク追加専用の関数を実装
- ✅ **deleteTask関数を作る**: タスク削除専用の関数を実装
- ✅ **displayTasks関数を作る**: タスク表示専用の関数を実装
- ✅ **コードを整理する**: データ操作、表示、イベントハンドラ、ヘルパー関数に分類
- ✅ **知識: 関数の分割、コードの整理**: 単一責任の原則、命名規則、コメントによる区切り
- ✅ **成果物: 整理されたコード**: 3つの完全動作する整理されたTODOアプリを作成

---

## 📝 まとめ

このレッスンでは、コードを関数に適切に分割して整理する方法を学びました。

### 学んだこと

1. **関数の分割**
   - データ操作関数（ビジネスロジック）
   - 表示関数（ビューロジック）
   - イベントハンドラ関数
   - ヘルパー関数（補助関数）

2. **良い関数の特徴**
   - 1つの関数は1つのことだけする
   - 関数名から何をするか分かる
   - 短い（10〜30行程度）
   - 再利用できる

3. **命名規則**
   - 動詞で始める（`add`, `delete`, `display`, `get`など）
   - イベントハンドラは`handle`で始める
   - 何をする関数か明確にする

4. **コードの整理**
   - コメントで区切る
   - 関数をグループ化する
   - 読みやすい構造にする

5. **再利用性**
   - `getTaskById()`は複数の場所で使える
   - 同じ処理を何度も書かない
   - DRY原則（Don't Repeat Yourself）

### 関数分割の利点

```javascript
// 分割前：変更が大変
function doEverything() {
  // 100行のコード...
}

// 分割後：変更が簡単
function addTask(text) { ... }      // 追加ロジックだけ修正
function displayTasks() { ... }     // 表示ロジックだけ修正
function handleAdd() { ... }        // イベント処理だけ修正
```

---

## 🚀 次のレッスンでは

次のレッスンでは、CSSで**見た目を良く**します。

以下の機能を追加します：
- カラフルなデザイン
- ホバーエフェクト
- アニメーション
- レスポンシブ対応

---

**作成日**: 2025-11-26
**トピック**: TODOアプリ関数編、関数の分割、コードの整理、単一責任の原則
