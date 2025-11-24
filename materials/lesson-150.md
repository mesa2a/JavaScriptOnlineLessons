# レッスン150：TODOアプリ（保存編）

## このレッスンで学ぶこと
- localStorageでデータを保存する
- JSON.stringifyでデータを変換する
- JSON.parseでデータを復元する
- ページを再読み込みしてもデータが残る仕組み

---

## 1. なぜデータを保存するのか

これまでのTODOアプリは、ページを再読み込みすると**すべてのタスクが消えてしまいました**。

```javascript
let tasks = [];  // ページを読み込むたびに空になる
```

これでは実用的ではありません。

**localStorage**を使うことで、ブラウザにデータを保存できます。

---

## 2. localStorageとは

### localStorageの特徴

- **ブラウザに保存**: データはブラウザに保存される
- **永続的**: ページを閉じても残る
- **文字列のみ**: 文字列しか保存できない
- **簡単**: 数行のコードで使える

### 基本的な使い方

```javascript
// データを保存
localStorage.setItem('key', 'value');

// データを取得
let value = localStorage.getItem('key');

// データを削除
localStorage.removeItem('key');

// すべてのデータを削除
localStorage.clear();
```

---

## 3. JSON.stringifyとJSON.parse

### 問題：配列やオブジェクトは保存できない

```javascript
let tasks = [
  { id: 1, text: "買い物", done: false }
];

// これは動かない！
localStorage.setItem('tasks', tasks);
// "[object Object]"という文字列になってしまう
```

### 解決：JSONに変換する

```javascript
// 配列を文字列に変換
let jsonString = JSON.stringify(tasks);
localStorage.setItem('tasks', jsonString);
// '[ {"id":1,"text":"買い物","done":false}]'が保存される
```

### 取り出すときは逆変換

```javascript
// 文字列を配列に変換
let jsonString = localStorage.getItem('tasks');
let tasks = JSON.parse(jsonString);
// 配列として使える！
```

---

## 4. タスクを保存する関数

```javascript
function saveTasks() {
  // tasksとtaskIdCounterをオブジェクトにまとめる
  let data = {
    tasks: tasks,
    taskIdCounter: taskIdCounter
  };

  // JSONに変換
  let jsonString = JSON.stringify(data);

  // localStorageに保存
  localStorage.setItem('todoApp', jsonString);
}
```

**ポイント:**
- tasksだけでなく、taskIdCounterも保存する
- オブジェクトにまとめてから保存

---

## 5. タスクを読み込む関数

```javascript
function loadTasks() {
  // localStorageからデータを取得
  let jsonString = localStorage.getItem('todoApp');

  // データがない場合（初めての起動）
  if (jsonString === null) {
    tasks = [];
    taskIdCounter = 1;
    return;
  }

  // JSONをオブジェクトに変換
  let data = JSON.parse(jsonString);

  // データを復元
  tasks = data.tasks;
  taskIdCounter = data.taskIdCounter;
}
```

**ポイント:**
- データがない場合は空の配列を使う
- エラー処理も重要

---

## 6. いつ保存するか

タスクが**変更されたとき**に保存します。

```javascript
function addTask(text) {
  let newTask = {
    id: taskIdCounter,
    text: text,
    done: false
  };
  taskIdCounter++;
  tasks.push(newTask);

  saveTasks(); // ここで保存！

  return newTask;
}

function deleteTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      saveTasks(); // ここでも保存！
      return true;
    }
  }
  return false;
}

function toggleTask(id) {
  let task = getTaskById(id);
  if (task !== null) {
    task.done = !task.done;
    saveTasks(); // ここでも保存！
    return true;
  }
  return false;
}
```

**ポイント:**
- 追加・削除・更新のたびに`saveTasks()`を呼ぶ

---

## 7. 起動時にデータを読み込む

```javascript
// ページが読み込まれたときに実行
loadTasks();
displayTasks();
```

または

```javascript
document.addEventListener('DOMContentLoaded', function() {
  loadTasks();
  displayTasks();
});
```

---

## 8. エラー処理

JSONの解析に失敗することがあります。

```javascript
function loadTasks() {
  let jsonString = localStorage.getItem('todoApp');

  if (jsonString === null) {
    tasks = [];
    taskIdCounter = 1;
    return;
  }

  try {
    let data = JSON.parse(jsonString);
    tasks = data.tasks || [];
    taskIdCounter = data.taskIdCounter || 1;
  } catch (error) {
    console.error('データの読み込みに失敗しました:', error);
    tasks = [];
    taskIdCounter = 1;
  }
}
```

**ポイント:**
- `try...catch`でエラーをキャッチ
- エラーが起きても動き続ける

---

## 9. 完全なコード例

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
  saveTasks();
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
      saveTasks();
      return true;
    }
  }
  return false;
}

function toggleTask(id) {
  let task = getTaskById(id);
  if (task !== null) {
    task.done = !task.done;
    saveTasks();
    return true;
  }
  return false;
}

// ========================================
// 保存と読み込み
// ========================================

function saveTasks() {
  let data = {
    tasks: tasks,
    taskIdCounter: taskIdCounter
  };
  let jsonString = JSON.stringify(data);
  localStorage.setItem('todoApp', jsonString);
}

function loadTasks() {
  let jsonString = localStorage.getItem('todoApp');

  if (jsonString === null) {
    tasks = [];
    taskIdCounter = 1;
    return;
  }

  try {
    let data = JSON.parse(jsonString);
    tasks = data.tasks || [];
    taskIdCounter = data.taskIdCounter || 1;
  } catch (error) {
    console.error('データの読み込みに失敗:', error);
    tasks = [];
    taskIdCounter = 1;
  }
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
// 初期化
// ========================================

loadTasks();
displayTasks();
```

---

## 10. 動作確認

### テスト手順

1. タスクをいくつか追加する
2. いくつかを完了にする
3. **ページを再読み込みする**（F5キー）
4. タスクが残っているか確認

### デバッグ方法

開発者ツールで確認できます：

```javascript
// Consoleで実行
console.log(localStorage.getItem('todoApp'));
```

または、ApplicationタブでlocalStorageを見る。

---

## 11. データのクリア

すべてのデータを削除する関数：

```javascript
function clearAllData() {
  tasks = [];
  taskIdCounter = 1;
  localStorage.removeItem('todoApp');
  displayTasks();
}
```

HTMLにボタンを追加：

```html
<button onclick="clearAllData()">すべてクリア</button>
```

---

## 12. よくある問題

### 問題1：データが保存されない

```javascript
// 悪い例
function addTask(text) {
  tasks.push({ id: 1, text: text, done: false });
  // saveTasks()を呼んでいない！
}

// 良い例
function addTask(text) {
  tasks.push({ id: 1, text: text, done: false });
  saveTasks(); // これを忘れずに！
}
```

### 問題2：JSONエラー

```javascript
// 悪い例
let data = JSON.parse(localStorage.getItem('todoApp'));
// データがないとエラー！

// 良い例
let jsonString = localStorage.getItem('todoApp');
if (jsonString !== null) {
  let data = JSON.parse(jsonString);
}
```

### 問題3：古いIDが再利用される

```javascript
// taskIdCounterも保存する
let data = {
  tasks: tasks,
  taskIdCounter: taskIdCounter  // これを忘れずに！
};
```

---

## 13. 練習問題

### 練習1：動作確認

上記のコードを実装して、以下を確認してください：
- タスクを追加
- ページを再読み込み
- タスクが残っている

### 練習2：エクスポート機能

タスクをテキストファイルとしてダウンロードする機能を追加してください。

```javascript
function exportTasks() {
  let jsonString = JSON.stringify(tasks, null, 2);
  let blob = new Blob([jsonString], { type: 'application/json' });
  let url = URL.createObjectURL(blob);

  let a = document.createElement('a');
  a.href = url;
  a.download = 'tasks.json';
  a.click();
}
```

### 練習3：インポート機能

ファイルからタスクを読み込む機能を追加してください。

---

## 14. まとめ

このレッスンで学んだこと:

1. **localStorage**: ブラウザにデータを保存
2. **JSON.stringify**: オブジェクトを文字列に変換
3. **JSON.parse**: 文字列をオブジェクトに変換
4. **保存タイミング**: データ変更時に自動保存
5. **エラー処理**: try...catchで安全に

### 次のステップ

次のレッスンでは、**フィルター機能**を追加します。

- すべて表示
- 未完了のみ表示
- 完了のみ表示

これで、TODOアプリがさらに使いやすくなります！
