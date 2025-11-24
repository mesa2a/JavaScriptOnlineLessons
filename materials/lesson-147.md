# レッスン147：TODOアプリ（オブジェクト編）

## このレッスンで学ぶこと
- タスクをオブジェクトで管理する
- IDで各タスクを識別する
- 完了/未完了の切り替え機能
- オブジェクトの配列を操作する

---

## 1. なぜオブジェクトを使うのか

前回のレッスンでは、タスクを**文字列**で管理しました。

```javascript
let tasks = ["買い物", "宿題", "メール"];
```

しかし、実際のアプリでは、タスクにもっと多くの情報が必要です：
- **完了したかどうか**
- **いつ作られたか**
- **優先度**
- **カテゴリ**

これらを文字列だけで管理するのは困難です。

---

## 2. タスクをオブジェクトにする

### 基本的なタスクオブジェクト

```javascript
let task = {
  id: 1,
  text: "買い物に行く",
  done: false
};
```

**プロパティの説明：**
- `id`: タスクを識別するための番号（一意）
- `text`: タスクの内容
- `done`: 完了しているかどうか（true/false）

### オブジェクトの配列

```javascript
let tasks = [
  { id: 1, text: "買い物に行く", done: false },
  { id: 2, text: "宿題をする", done: true },
  { id: 3, text: "メールを送る", done: false }
];
```

これで、各タスクに複数の情報を持たせることができます。

---

## 3. IDカウンターの管理

新しいタスクを追加するたびに、一意のIDを割り当てる必要があります。

```javascript
let tasks = [];
let taskIdCounter = 1; // 次に使うID

function addTask(text) {
  let newTask = {
    id: taskIdCounter,
    text: text,
    done: false
  };

  taskIdCounter = taskIdCounter + 1; // IDをインクリメント
  tasks.push(newTask);
}
```

**ポイント：**
- `taskIdCounter`で次に使うIDを管理
- タスクを追加したら、カウンターを1増やす
- これで、各タスクに一意のIDが割り当てられる

---

## 4. IDでタスクを検索する

配列のインデックスではなく、IDでタスクを探します。

```javascript
function getTaskById(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      return tasks[i];
    }
  }
  return null; // 見つからなかった
}
```

**使用例：**
```javascript
let task = getTaskById(2);
console.log(task);
// { id: 2, text: "宿題をする", done: true }
```

---

## 5. 完了/未完了を切り替える

### toggleTask関数

```javascript
function toggleTask(id) {
  let task = getTaskById(id);
  if (task !== null) {
    task.done = !task.done; // trueならfalse、falseならtrue
  }
}
```

**使用例：**
```javascript
// タスクID=1を完了にする
toggleTask(1);

console.log(tasks[0]);
// { id: 1, text: "買い物に行く", done: true }

// もう一度呼ぶと未完了に戻る
toggleTask(1);

console.log(tasks[0]);
// { id: 1, text: "買い物に行く", done: false }
```

---

## 6. IDで削除する

インデックスではなく、IDで削除します。

```javascript
function deleteTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      return true; // 削除成功
    }
  }
  return false; // 見つからなかった
}
```

---

## 7. 完全なコード例

### JavaScript (script.js)

```javascript
// タスクを保存する配列
let tasks = [];
let taskIdCounter = 1;

// タスクを追加する関数
function addTask() {
  let input = document.getElementById('taskInput');
  let taskText = input.value;

  if (taskText !== "") {
    let newTask = {
      id: taskIdCounter,
      text: taskText,
      done: false
    };

    taskIdCounter = taskIdCounter + 1;
    tasks.push(newTask);
    input.value = "";
    displayTasks();
  }
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

// 完了/未完了を切り替え
function toggleTask(id) {
  let task = getTaskById(id);
  if (task !== null) {
    task.done = !task.done;
    displayTasks();
  }
}

// タスクを削除
function deleteTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      displayTasks();
      return;
    }
  }
}

// タスクを表示
function displayTasks() {
  let taskList = document.getElementById('taskList');

  if (tasks.length === 0) {
    taskList.innerHTML = '<p class="empty-message">タスクがありません</p>';
    return;
  }

  let html = "";

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let doneClass = task.done ? "done" : "";

    html += '<div class="task-item ' + doneClass + '">';
    html += '  <input type="checkbox" ';
    if (task.done) {
      html += 'checked ';
    }
    html += 'onchange="toggleTask(' + task.id + ')">';
    html += '  <span>' + task.text + '</span>';
    html += '  <button onclick="deleteTask(' + task.id + ')">削除</button>';
    html += '</div>';
  }

  taskList.innerHTML = html;
}
```

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>TODOアプリ（オブジェクト編）</title>
  <style>
    .task-item {
      padding: 10px;
      margin-bottom: 10px;
      background: #f9f9f9;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .task-item.done span {
      text-decoration: line-through;
      color: #999;
    }
  </style>
</head>
<body>
  <h1>TODOリスト</h1>

  <div class="input-area">
    <input type="text" id="taskInput" placeholder="タスクを入力">
    <button onclick="addTask()">追加</button>
  </div>

  <div id="taskList"></div>

  <script src="script.js"></script>
</body>
</html>
```

---

## 8. インデックスとIDの違い

### インデックス（前回）

```javascript
// インデックスで削除
function deleteTask(index) {
  tasks.splice(index, 1);
}

// 問題：タスクを削除すると、他のタスクのインデックスが変わる
```

### ID（今回）

```javascript
// IDで削除
function deleteTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      return;
    }
  }
}

// メリット：IDは変わらないので、安全
```

**なぜIDが必要？**
- タスクを削除しても、IDは変わらない
- 特定のタスクを確実に操作できる
- 後でlocalStorageに保存するときに便利

---

## 9. よくある間違い

### 間違い1：IDカウンターを増やし忘れ

```javascript
// 悪い例
function addTask(text) {
  let newTask = {
    id: taskIdCounter, // 毎回同じIDになってしまう
    text: text,
    done: false
  };
  // taskIdCounter++; を忘れている！
  tasks.push(newTask);
}
```

### 間違い2：doneをtrue/false以外にする

```javascript
// 悪い例
task.done = "true"; // 文字列にしない
task.done = 1;      // 数値にしない

// 正しい例
task.done = true;   // ブール値を使う
task.done = false;
```

### 間違い3：===と==を混同する

```javascript
// 注意が必要
if (tasks[i].id == id) {  // == は型変換が起こる
  // ...
}

// 推奨
if (tasks[i].id === id) { // === は型も厳密に比較
  // ...
}
```

---

## 10. 練習問題

### 練習1：基本的なオブジェクト管理

上記の完全なコード例を作成して、以下を確認してください：
- タスクを追加する
- チェックボックスで完了/未完了を切り替える
- タスクを削除する

### 練習2：完了タスク数を表示

完了したタスクの数を表示する関数を追加してください。

```javascript
function getCompletedCount() {
  let count = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done === true) {
      count = count + 1;
    }
  }
  return count;
}

// 使用例
console.log("完了: " + getCompletedCount() + "個");
```

### 練習3：未完了タスクのみ表示

未完了のタスクだけを表示するフィルター機能を追加してください。

```javascript
function displayIncompleteTasks() {
  let taskList = document.getElementById('taskList');
  let html = "";

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done === false) {
      // 未完了のタスクだけ表示
      html += "...";
    }
  }

  taskList.innerHTML = html;
}
```

---

## 11. まとめ

このレッスンで学んだこと:

1. **オブジェクトでタスク管理**: `{id: 1, text: "...", done: false}`
2. **IDカウンター**: 一意のIDを自動採番
3. **IDで検索**: `getTaskById(id)`関数
4. **完了切り替え**: `toggleTask(id)`関数
5. **IDで削除**: インデックスではなくIDを使う

### 次のステップ

次のレッスンでは、コードを**関数に分割**して、より整理された構造にします。

- `addTask()`
- `deleteTask()`
- `displayTasks()`
- など、それぞれの役割を明確にします。
