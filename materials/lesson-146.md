# レッスン146：TODOアプリ（基本編）

## このレッスンで学ぶこと
- 配列を使ってタスクを管理する
- 入力フォームでタスクを追加する
- ボタンでタスクを削除する
- 配列の内容をHTMLで表示する

---

## 1. TODOアプリとは

TODOアプリは、やるべきことを記録して管理するアプリです。

### 基本的な機能

1. **タスクの追加**: やるべきことを入力して追加する
2. **タスクの表示**: すべてのタスクをリスト表示する
3. **タスクの削除**: 終わったタスクを削除する

このレッスンでは、配列を使ってこれらの機能を実装します。

---

## 2. データを配列で管理する

### タスクを配列に保存

```javascript
let tasks = [];
```

これが、すべてのタスクを保存する配列です。最初は空です。

### タスクを追加する

```javascript
let tasks = [];

tasks.push("買い物に行く");
tasks.push("宿題をする");
tasks.push("メールを送る");

console.log(tasks);
// ["買い物に行く", "宿題をする", "メールを送る"]
```

`push()`を使って、配列の最後にタスクを追加します。

### タスクを削除する

```javascript
let tasks = ["買い物に行く", "宿題をする", "メールを送る"];

// インデックス1のタスクを削除（"宿題をする"）
tasks.splice(1, 1);

console.log(tasks);
// ["買い物に行く", "メールを送る"]
```

`splice()`を使って、指定した位置のタスクを削除します。

---

## 3. 入力フォームでタスクを追加

### HTML

```html
<input type="text" id="taskInput" placeholder="タスクを入力">
<button onclick="addTask()">追加</button>

<div id="taskList"></div>
```

### JavaScript

```javascript
let tasks = [];

function addTask() {
  // 入力欄の値を取得
  let input = document.getElementById('taskInput');
  let taskText = input.value;

  // 空でなければ追加
  if (taskText !== "") {
    tasks.push(taskText);
    input.value = ""; // 入力欄をクリア
    displayTasks(); // 画面を更新
  }
}
```

**ポイント:**
- `input.value`で入力された値を取得
- 空でないかチェックしてから追加
- 追加したら入力欄をクリア

---

## 4. タスクを画面に表示する

### displayTasks関数

```javascript
function displayTasks() {
  let taskList = document.getElementById('taskList');
  let html = "";

  // 配列のすべてのタスクを表示
  for (let i = 0; i < tasks.length; i++) {
    html += "<div>";
    html += tasks[i];
    html += " <button onclick='deleteTask(" + i + ")'>削除</button>";
    html += "</div>";
  }

  taskList.innerHTML = html;
}
```

**処理の流れ:**
1. 空のHTML文字列を用意
2. forループで配列のすべてのタスクを処理
3. 各タスクに削除ボタンを追加
4. 完成したHTMLを画面に表示

---

## 5. タスクを削除する

### deleteTask関数

```javascript
function deleteTask(index) {
  // 指定されたインデックスのタスクを削除
  tasks.splice(index, 1);
  displayTasks(); // 画面を更新
}
```

**ポイント:**
- `splice(index, 1)`で指定された位置のタスクを1つ削除
- 削除したら`displayTasks()`で画面を更新

---

## 6. 完全なコード例

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>TODOアプリ</title>
</head>
<body>
  <h1>TODOリスト</h1>

  <input type="text" id="taskInput" placeholder="タスクを入力">
  <button onclick="addTask()">追加</button>

  <div id="taskList"></div>

  <script src="script.js"></script>
</body>
</html>
```

### JavaScript (script.js)

```javascript
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
  let html = "";

  for (let i = 0; i < tasks.length; i++) {
    html += "<div>";
    html += tasks[i];
    html += " <button onclick='deleteTask(" + i + ")'>削除</button>";
    html += "</div>";
  }

  taskList.innerHTML = html;
}
```

---

## 7. 動作の流れ

### タスクを追加したとき

1. ユーザーが入力欄にテキストを入力
2. 「追加」ボタンをクリック
3. `addTask()`関数が実行される
4. 入力された値を配列に追加
5. `displayTasks()`で画面を更新

### タスクを削除したとき

1. ユーザーが「削除」ボタンをクリック
2. `deleteTask(index)`関数が実行される
3. 配列から指定されたタスクを削除
4. `displayTasks()`で画面を更新

---

## 8. よくある間違い

### 間違い1：displayTasksを呼び忘れ

```javascript
// 悪い例
function addTask() {
  let input = document.getElementById('taskInput');
  tasks.push(input.value);
  input.value = "";
  // displayTasks()を呼んでいない！
}
```

配列を変更したら、必ず`displayTasks()`を呼んで画面を更新しましょう。

### 間違い2：空の入力をチェックしない

```javascript
// 悪い例
function addTask() {
  let input = document.getElementById('taskInput');
  tasks.push(input.value); // 空でも追加してしまう
  input.value = "";
  displayTasks();
}
```

空の入力を防ぐために、`if (taskText !== "")`でチェックしましょう。

### 間違い3：インデックスが文字列になる

```javascript
// 注意が必要な例
html += "<button onclick='deleteTask(" + i + ")'>削除</button>";
```

これは正しいです。`i`は数値ですが、文字列に変換されてHTMLに埋め込まれます。
クリックされたときに、JavaScriptが数値として解釈します。

---

## 9. 改善のアイデア

### Enterキーで追加できるようにする

```javascript
let input = document.getElementById('taskInput');

input.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});
```

### タスクがないときのメッセージ

```javascript
function displayTasks() {
  let taskList = document.getElementById('taskList');

  if (tasks.length === 0) {
    taskList.innerHTML = "<p>タスクがありません</p>";
    return;
  }

  let html = "";
  for (let i = 0; i < tasks.length; i++) {
    html += "<div>";
    html += tasks[i];
    html += " <button onclick='deleteTask(" + i + ")'>削除</button>";
    html += "</div>";
  }

  taskList.innerHTML = html;
}
```

### 番号を表示する

```javascript
function displayTasks() {
  let taskList = document.getElementById('taskList');
  let html = "";

  for (let i = 0; i < tasks.length; i++) {
    html += "<div>";
    html += (i + 1) + ". " + tasks[i]; // 番号を追加
    html += " <button onclick='deleteTask(" + i + ")'>削除</button>";
    html += "</div>";
  }

  taskList.innerHTML = html;
}
```

---

## 10. 練習問題

### 練習1：基本的なTODOアプリを作る

上記の完全なコード例を実際に作って、動作を確認してください。

### 練習2：「すべて削除」ボタンを追加

すべてのタスクを一度に削除するボタンを追加してください。

```javascript
function deleteAllTasks() {
  tasks = [];
  displayTasks();
}
```

```html
<button onclick="deleteAllTasks()">すべて削除</button>
```

### 練習3：タスク数を表示

現在のタスク数を表示する機能を追加してください。

```html
<p>タスク数: <span id="taskCount">0</span></p>
```

```javascript
function displayTasks() {
  // ... 既存のコード ...

  // タスク数を更新
  document.getElementById('taskCount').textContent = tasks.length;
}
```

---

## 11. まとめ

このレッスンで学んだこと:

1. **配列でデータ管理**: `let tasks = []`でタスクを保存
2. **push()で追加**: `tasks.push(taskText)`
3. **splice()で削除**: `tasks.splice(index, 1)`
4. **forループで表示**: すべてのタスクをHTMLに変換
5. **関数で整理**: addTask、deleteTask、displayTasks

### 次のステップ

次のレッスンでは、タスクを**オブジェクト**にして、もっと多くの情報を管理できるようにします。

例: `{id: 1, text: "買い物", done: false}`

これにより、完了/未完了の切り替えなど、より高度な機能が実装できるようになります！
