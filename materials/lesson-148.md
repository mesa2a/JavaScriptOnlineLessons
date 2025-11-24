# レッスン148：TODOアプリ（関数編）

## このレッスンで学ぶこと
- コードを関数に分割する
- 関数の役割を明確にする
- コードの整理と可読性向上
- 再利用可能な関数を作る

---

## 1. なぜ関数に分割するのか

前回までのコードは、すべて1つのファイルにまとまっていました。

しかし、コードが長くなると：
- **どこに何が書いてあるかわかりにくい**
- **同じ処理を何度も書いてしまう**
- **バグを見つけにくい**
- **修正が大変**

関数に分割することで、これらの問題を解決できます。

---

## 2. 関数の役割を明確にする

### 良い関数の特徴

1. **1つの関数は1つのことだけする**
2. **関数名から何をするかわかる**
3. **短い（10〜20行程度）**
4. **再利用できる**

### 悪い関数の例

```javascript
// 悪い例：何でもやる関数
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

この関数は、**追加・表示・統計**という3つのことをしています。

### 良い関数の例

```javascript
// 良い例：役割ごとに分割
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

---

## 3. 関数の分類

TODOアプリに必要な関数を分類してみましょう。

### データ操作関数

```javascript
// タスクを追加
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

// タスクを検索
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

// 完了を切り替え
function toggleTask(id) {
  let task = getTaskById(id);
  if (task !== null) {
    task.done = !task.done;
    return true;
  }
  return false;
}
```

### 表示関数

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

### イベントハンドラ関数

```javascript
// 追加ボタンがクリックされた
function handleAdd() {
  let input = document.getElementById('taskInput');
  let text = input.value.trim();

  if (text !== "") {
    addTask(text);
    input.value = "";
    displayTasks();
  }
}

// チェックボックスが変更された
function handleToggle(id) {
  toggleTask(id);
  displayTasks();
}

// 削除ボタンがクリックされた
function handleDelete(id) {
  deleteTask(id);
  displayTasks();
}
```

### ヘルパー関数

```javascript
// 完了タスク数を取得
function getCompletedCount() {
  let count = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done) {
      count++;
    }
  }
  return count;
}

// 未完了タスク数を取得
function getIncompleteCount() {
  let count = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].done) {
      count++;
    }
  }
  return count;
}

// すべてのタスク数を取得
function getTotalCount() {
  return tasks.length;
}
```

---

## 4. 関数の命名規則

### 動詞で始める

関数は「何をするか」を表すので、動詞で始めます。

```javascript
// 良い例
addTask()       // 追加する
deleteTask()    // 削除する
displayTasks()  // 表示する
getTaskById()   // 取得する
toggleTask()    // 切り替える

// 悪い例
task()          // 何をするかわからない
taskList()      // 何をするかわからない
```

### よく使う動詞

| 動詞 | 意味 | 例 |
|------|------|-----|
| get | 取得する | getTaskById(id) |
| set | 設定する | setCompleted(id) |
| add | 追加する | addTask(text) |
| delete | 削除する | deleteTask(id) |
| remove | 削除する | removeTask(id) |
| update | 更新する | updateTask(id, text) |
| toggle | 切り替える | toggleTask(id) |
| display | 表示する | displayTasks() |
| show | 表示する | showTask(id) |
| hide | 非表示にする | hideTask(id) |
| create | 作成する | createTaskHTML(task) |
| handle | 処理する | handleClick() |

### ハンドラ関数の命名

イベントハンドラは`handle`で始めるとわかりやすいです。

```javascript
handleAdd()      // 追加ボタンのハンドラ
handleDelete()   // 削除ボタンのハンドラ
handleToggle()   // チェックボックスのハンドラ
handleSubmit()   // フォーム送信のハンドラ
```

---

## 5. 完全なコード例

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>TODOアプリ（関数編）</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }

    .input-area {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    #taskInput {
      flex: 1;
      padding: 10px;
      font-size: 16px;
    }

    button {
      padding: 10px 20px;
      background: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
    }

    .task-item {
      padding: 10px;
      margin-bottom: 10px;
      background: #f9f9f9;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .task-item.done span {
      text-decoration: line-through;
      color: #999;
    }

    .task-item button {
      background: #f44336;
      padding: 5px 10px;
    }

    .empty {
      text-align: center;
      color: #999;
      padding: 20px;
    }
  </style>
</head>
<body>
  <h1>TODOリスト</h1>

  <div class="input-area">
    <input type="text" id="taskInput" placeholder="タスクを入力">
    <button onclick="handleAdd()">追加</button>
  </div>

  <div id="taskList"></div>

  <script src="script.js"></script>
</body>
</html>
```

### JavaScript (script.js)

```javascript
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
  taskIdCounter++;
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
    taskList.innerHTML = '<p class="empty">タスクがありません</p>';
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
  html += '  <button onclick="handleDelete(' + task.id + ')">削除</button>';
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
    if (tasks[i].done) {
      count++;
    }
  }
  return count;
}

function getIncompleteCount() {
  let count = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].done) {
      count++;
    }
  }
  return count;
}

// ========================================
// 初期化
// ========================================

displayTasks();
```

---

## 6. コメントで区切る

関数が増えたら、コメントで区切るとわかりやすくなります。

```javascript
// ========================================
// データ操作関数
// ========================================

function addTask(text) { ... }
function deleteTask(id) { ... }

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
```

---

## 7. 練習問題

### 練習1：関数に分割する

上記の完全なコード例を作成して、動作を確認してください。

### 練習2：統計表示関数を追加

タスクの統計を表示する関数を追加してください。

```javascript
function displayStats() {
  let total = getTotalCount();
  let completed = getCompletedCount();
  let incomplete = getIncompleteCount();

  console.log("全タスク: " + total);
  console.log("完了: " + completed);
  console.log("未完了: " + incomplete);
}
```

### 練習3：すべて削除関数

すべてのタスクを削除する関数を追加してください。

```javascript
function deleteAllTasks() {
  tasks = [];
  displayTasks();
}
```

---

## 8. まとめ

このレッスンで学んだこと:

1. **関数に分割**: コードを役割ごとに分ける
2. **1つの関数は1つのこと**: 単一責任の原則
3. **わかりやすい名前**: 動詞で始める
4. **コメントで区切る**: 見やすく整理
5. **再利用性**: 同じ処理を何度も書かない

### 次のステップ

次のレッスンでは、CSSで**見た目を良く**します。

- カラフルなデザイン
- ホバーエフェクト
- アニメーション
- レスポンシブ対応
