# レッスン147: TODOアプリ（オブジェクト編）

**日付**: 2025-11-26
**トピック**: オブジェクトによるタスク管理、ID管理、完了状態の切り替え

---

## 📋 このレッスンで学ぶこと

前回のレッスンで作成した文字列ベースのTODOアプリを、オブジェクトを使ってより高機能にします。

- タスクをオブジェクトで管理する
- IDで各タスクを識別する
- 完了/未完了の切り替え機能
- オブジェクトの配列を操作する
- プロパティを使った情報管理

---

## 🌟 日常生活の例：メモ用紙とタスクカード

### 📝 メモ用紙の限界（文字列のみ）

前回は、タスクを「メモ用紙」のように文字列だけで管理しました。

```
┌─────────────┐
│ 買い物に行く │
└─────────────┘

┌─────────────┐
│ 宿題をする   │
└─────────────┘
```

**メモ用紙の問題点**：
- ❌ 完了したかどうかが分からない
- ❌ どのメモがどれか区別しにくい
- ❌ 追加の情報を書き込めない
- ❌ 整理や分類が難しい

### 📇 タスクカードの利点（オブジェクト）

オブジェクトを使うと、「タスクカード」のように情報を整理できます。

```
┌──────────────────────┐
│ ID: 1                │
│ タスク: 買い物に行く │
│ 状態: □ 未完了       │
└──────────────────────┘

┌──────────────────────┐
│ ID: 2                │
│ タスク: 宿題をする   │
│ 状態: ✅ 完了        │
└──────────────────────┘
```

**タスクカードの利点**：
- ✅ IDで確実に識別できる
- ✅ 完了/未完了の状態を記録できる
- ✅ 複数の情報を1つにまとめられる
- ✅ 整理や分類がしやすい

このレッスンでは、オブジェクトを使ってこのようなタスク管理を実現します。

---

## 🎯 なぜオブジェクトを使うのか

### 文字列での管理（前回）

```javascript
let tasks = ["買い物に行く", "宿題をする", "メールを送る"];
```

**問題点**：
- タスクの内容しか保存できない
- 完了したかどうかを記録できない
- タスクを識別するのが難しい

### オブジェクトでの管理（今回）

```javascript
let tasks = [
  { id: 1, text: "買い物に行く", done: false },
  { id: 2, text: "宿題をする", done: true },
  { id: 3, text: "メールを送る", done: false }
];
```

**利点**：
- ✅ 複数の情報を持てる（ID、内容、状態）
- ✅ 完了/未完了を記録できる
- ✅ IDで確実に識別できる
- ✅ 将来的に情報を追加しやすい（期限、優先度など）

---

## 📚 タスクをオブジェクトにする

### 基本的なタスクオブジェクト

```javascript
let task = {
  id: 1,                    // タスクを識別するための番号（一意）
  text: "買い物に行く",     // タスクの内容
  done: false               // 完了しているかどうか（true/false）
};
```

**各プロパティの役割**：

1. **`id`（識別番号）**
   - タスクを一意に識別するための番号
   - 削除や更新の際に使用
   - 重複しない番号を割り当てる

2. **`text`（タスク内容）**
   - やるべきことの説明
   - 文字列で保存

3. **`done`（完了状態）**
   - 完了しているか未完了か
   - `true`（完了）または`false`（未完了）
   - ブール値で保存

### オブジェクトの配列

複数のタスクを配列で管理します。

```javascript
let tasks = [
  { id: 1, text: "買い物に行く", done: false },
  { id: 2, text: "宿題をする", done: true },
  { id: 3, text: "メールを送る", done: false }
];
```

**構造の図解**：

```
tasks配列
┌────────────────────────────────────────┐
│ インデックス0                          │
│ ┌────────────────────────────────────┐ │
│ │ id: 1                              │ │
│ │ text: "買い物に行く"               │ │
│ │ done: false                        │ │
│ └────────────────────────────────────┘ │
├────────────────────────────────────────┤
│ インデックス1                          │
│ ┌────────────────────────────────────┐ │
│ │ id: 2                              │ │
│ │ text: "宿題をする"                 │ │
│ │ done: true                         │ │
│ └────────────────────────────────────┘ │
├────────────────────────────────────────┤
│ インデックス2                          │
│ ┌────────────────────────────────────┐ │
│ │ id: 3                              │ │
│ │ text: "メールを送る"               │ │
│ │ done: false                        │ │
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```

**アクセス方法**：

```javascript
// 最初のタスクのテキスト
console.log(tasks[0].text);  // "買い物に行く"

// 2番目のタスクの完了状態
console.log(tasks[1].done);  // true

// 3番目のタスクのID
console.log(tasks[2].id);    // 3
```

---

## 🔢 IDカウンターの管理

新しいタスクを追加するたびに、一意のIDを割り当てる必要があります。

### IDカウンターの仕組み

```javascript
let tasks = [];
let taskIdCounter = 1;  // 次に使うID

function addTask(text) {
  // ステップ1: 新しいタスクオブジェクトを作成
  let newTask = {
    id: taskIdCounter,    // 現在のカウンター値を使用
    text: text,
    done: false
  };

  // ステップ2: カウンターを増やす（次回のため）
  taskIdCounter = taskIdCounter + 1;

  // ステップ3: 配列に追加
  tasks.push(newTask);
}
```

**実行の流れ**：

```
初期状態:
  tasks = []
  taskIdCounter = 1

↓ addTask("買い物に行く") を呼び出し

ステップ1: 新しいタスクを作成
  newTask = {
    id: 1,                    ← taskIdCounterの値（1）を使用
    text: "買い物に行く",
    done: false
  }

ステップ2: カウンターを増やす
  taskIdCounter = 1 + 1 = 2   ← 次回は2を使う

ステップ3: 配列に追加
  tasks = [
    { id: 1, text: "買い物に行く", done: false }
  ]

↓ addTask("宿題をする") を呼び出し

ステップ1: 新しいタスクを作成
  newTask = {
    id: 2,                    ← taskIdCounterの値（2）を使用
    text: "宿題をする",
    done: false
  }

ステップ2: カウンターを増やす
  taskIdCounter = 2 + 1 = 3   ← 次回は3を使う

ステップ3: 配列に追加
  tasks = [
    { id: 1, text: "買い物に行く", done: false },
    { id: 2, text: "宿題をする", done: false }
  ]
```

**重要なポイント**：
- カウンターは常に増え続ける（減らさない）
- 削除してもカウンターは戻さない（IDの重複を防ぐため）
- これにより、各タスクに一意のIDが割り当てられる

---

## 🔍 IDでタスクを検索する

配列のインデックスではなく、IDでタスクを探します。

### getTaskById関数

```javascript
function getTaskById(id) {
  // 配列の全要素をループ
  for (let i = 0; i < tasks.length; i++) {
    // IDが一致するタスクを探す
    if (tasks[i].id === id) {
      return tasks[i];  // 見つかったタスクを返す
    }
  }
  return null;  // 見つからなかった場合
}
```

**使用例**：

```javascript
tasks = [
  { id: 1, text: "買い物に行く", done: false },
  { id: 2, text: "宿題をする", done: true },
  { id: 3, text: "メールを送る", done: false }
];

let task = getTaskById(2);
console.log(task);
// { id: 2, text: "宿題をする", done: true }

let notFound = getTaskById(99);
console.log(notFound);
// null
```

**実行の流れ**：

```
tasks = [
  { id: 1, text: "買い物に行く", done: false },
  { id: 2, text: "宿題をする", done: true },
  { id: 3, text: "メールを送る", done: false }
]

↓ getTaskById(2) を呼び出し

i=0: tasks[0].id (1) === 2 ? → false、次へ
i=1: tasks[1].id (2) === 2 ? → true、見つかった！
  return tasks[1]

結果: { id: 2, text: "宿題をする", done: true }
```

**なぜIDで検索するのか**：
- インデックスは削除すると変わってしまう
- IDは削除しても変わらない
- 確実に同じタスクを操作できる

---

## ✅ 完了/未完了を切り替える

### toggleTask関数

```javascript
function toggleTask(id) {
  // ステップ1: IDでタスクを検索
  let task = getTaskById(id);

  // ステップ2: タスクが見つかったら状態を反転
  if (task !== null) {
    task.done = !task.done;  // trueならfalse、falseならtrue
  }
}
```

**`!`演算子（NOT演算子）の動き**：

```javascript
let done = false;
done = !done;    // false の反対 → true

done = !done;    // true の反対 → false
```

**使用例**：

```javascript
tasks = [
  { id: 1, text: "買い物に行く", done: false }
];

// 1回目: 未完了 → 完了
toggleTask(1);
console.log(tasks[0].done);  // true

// 2回目: 完了 → 未完了
toggleTask(1);
console.log(tasks[0].done);  // false
```

**実行の流れ**：

```
初期状態:
  task = { id: 1, text: "買い物に行く", done: false }

↓ toggleTask(1) を呼び出し（1回目）

ステップ1: タスクを検索
  task = getTaskById(1)
  → { id: 1, text: "買い物に行く", done: false }

ステップ2: 状態を反転
  task.done = !task.done
  task.done = !false
  task.done = true

結果:
  task = { id: 1, text: "買い物に行く", done: true }  ← 完了になった

↓ toggleTask(1) を呼び出し（2回目）

ステップ1: タスクを検索
  task = getTaskById(1)
  → { id: 1, text: "買い物に行く", done: true }

ステップ2: 状態を反転
  task.done = !task.done
  task.done = !true
  task.done = false

結果:
  task = { id: 1, text: "買い物に行く", done: false }  ← 未完了に戻った
```

---

## 🗑️ IDで削除する

インデックスではなく、IDで削除します。

### deleteTask関数

```javascript
function deleteTask(id) {
  // 配列の全要素をループ
  for (let i = 0; i < tasks.length; i++) {
    // IDが一致するタスクを探す
    if (tasks[i].id === id) {
      tasks.splice(i, 1);  // 見つかったら削除
      return true;         // 削除成功
    }
  }
  return false;  // 見つからなかった
}
```

**実行の流れ**：

```
tasks = [
  { id: 1, text: "買い物に行く", done: false },
  { id: 2, text: "宿題をする", done: true },
  { id: 3, text: "メールを送る", done: false }
]

↓ deleteTask(2) を呼び出し

i=0: tasks[0].id (1) === 2 ? → false、次へ
i=1: tasks[1].id (2) === 2 ? → true、見つかった！
  tasks.splice(1, 1)  ← インデックス1を削除
  return true

結果:
  tasks = [
    { id: 1, text: "買い物に行く", done: false },
    { id: 3, text: "メールを送る", done: false }
  ]
  ← ID2が削除された
```

---

## 📺 タスクを表示する

### displayTasks関数（オブジェクト対応版）

```javascript
function displayTasks() {
  let taskList = document.getElementById('taskList');

  // タスクがない場合
  if (tasks.length === 0) {
    taskList.innerHTML = '<p class="empty-message">タスクがありません</p>';
    return;
  }

  let html = "";

  // 全タスクをループ
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    // 完了状態に応じてクラスを設定
    let doneClass = task.done ? "done" : "";

    html += '<div class="task-item ' + doneClass + '">';

    // チェックボックス（完了/未完了の切り替え）
    html += '  <input type="checkbox" ';
    if (task.done) {
      html += 'checked ';  // 完了していればチェック
    }
    html += 'onchange="toggleTask(' + task.id + ')">';

    // タスクのテキスト
    html += '  <span>' + task.text + '</span>';

    // 削除ボタン
    html += '  <button onclick="deleteTask(' + task.id + ')">削除</button>';

    html += '</div>';
  }

  taskList.innerHTML = html;
}
```

**生成されるHTML**：

```html
<div id="taskList">
  <!-- done: false の場合 -->
  <div class="task-item">
    <input type="checkbox" onchange="toggleTask(1)">
    <span>買い物に行く</span>
    <button onclick="deleteTask(1)">削除</button>
  </div>

  <!-- done: true の場合 -->
  <div class="task-item done">
    <input type="checkbox" checked onchange="toggleTask(2)">
    <span>宿題をする</span>
    <button onclick="deleteTask(2)">削除</button>
  </div>
</div>
```

---

## 💡 実践アプリケーション

### アプリケーション1: 基本的なオブジェクト管理TODOアプリ

オブジェクトを使った完全なTODOアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TODOアプリ - オブジェクト編</title>
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
    <h1>✅ TODOリスト</h1>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="タスクを入力してください...">
      <button class="add-btn" onclick="addTask()">追加</button>
    </div>

    <div id="taskList" class="task-list"></div>
  </div>

  <script>
    let tasks = [];
    let taskIdCounter = 1;

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

    function getTaskById(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          return tasks[i];
        }
      }
      return null;
    }

    function toggleTask(id) {
      let task = getTaskById(id);
      if (task !== null) {
        task.done = !task.done;
        displayTasks();
      }
    }

    function deleteTask(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          tasks.splice(i, 1);
          displayTasks();
          return;
        }
      }
    }

    function displayTasks() {
      let taskList = document.getElementById('taskList');

      if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-message">タスクがありません。追加してください。</div>';
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
        html += '  <button class="delete-btn" onclick="deleteTask(' + task.id + ')">削除</button>';
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

### アプリケーション2: 統計情報付きTODOアプリ

完了数と未完了数を表示するバージョンです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TODOアプリ - 統計情報付き</title>
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
      <button class="add-btn" onclick="addTask()">追加</button>
    </div>

    <div id="taskList" class="task-list"></div>
  </div>

  <script>
    let tasks = [];
    let taskIdCounter = 1;

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

    function getTaskById(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          return tasks[i];
        }
      }
      return null;
    }

    function toggleTask(id) {
      let task = getTaskById(id);
      if (task !== null) {
        task.done = !task.done;
        displayTasks();
      }
    }

    function deleteTask(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          tasks.splice(i, 1);
          displayTasks();
          return;
        }
      }
    }

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

    function updateStats() {
      document.getElementById('totalCount').textContent = tasks.length;
      document.getElementById('completedCount').textContent = getCompletedCount();
      document.getElementById('incompleteCount').textContent = getIncompleteCount();
    }

    function displayTasks() {
      let taskList = document.getElementById('taskList');

      updateStats();

      if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-message">タスクがありません。追加してください。</div>';
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
        html += '  <button class="delete-btn" onclick="deleteTask(' + task.id + ')">削除</button>';
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

### アプリケーション3: フィルター機能付きTODOアプリ

全て・未完了・完了を切り替えて表示できるバージョンです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TODOアプリ - フィルター機能付き</title>
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

    .filter-buttons {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
    }

    .filter-btn {
      flex: 1;
      padding: 10px;
      background: #f8f9fa;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 14px;
    }

    .filter-btn.active {
      background: linear-gradient(135deg, #a8edea 0%, #5ec9d4 100%);
      color: white;
      border-color: #5ec9d4;
    }

    .filter-btn:hover {
      background: #e9ecef;
    }

    .filter-btn.active:hover {
      background: linear-gradient(135deg, #a8edea 0%, #5ec9d4 100%);
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
    <h1>✅ TODOリスト</h1>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="タスクを入力してください...">
      <button class="add-btn" onclick="addTask()">追加</button>
    </div>

    <div class="filter-buttons">
      <button class="filter-btn active" onclick="setFilter('all')">全て</button>
      <button class="filter-btn" onclick="setFilter('incomplete')">未完了</button>
      <button class="filter-btn" onclick="setFilter('completed')">完了</button>
    </div>

    <div id="taskList" class="task-list"></div>
  </div>

  <script>
    let tasks = [];
    let taskIdCounter = 1;
    let currentFilter = 'all';

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

    function getTaskById(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          return tasks[i];
        }
      }
      return null;
    }

    function toggleTask(id) {
      let task = getTaskById(id);
      if (task !== null) {
        task.done = !task.done;
        displayTasks();
      }
    }

    function deleteTask(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          tasks.splice(i, 1);
          displayTasks();
          return;
        }
      }
    }

    function setFilter(filter) {
      currentFilter = filter;

      let buttons = document.querySelectorAll('.filter-btn');
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
      }

      if (filter === 'all') {
        buttons[0].classList.add('active');
      } else if (filter === 'incomplete') {
        buttons[1].classList.add('active');
      } else if (filter === 'completed') {
        buttons[2].classList.add('active');
      }

      displayTasks();
    }

    function getFilteredTasks() {
      let filteredTasks = [];

      for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        if (currentFilter === 'all') {
          filteredTasks.push(task);
        } else if (currentFilter === 'incomplete' && task.done === false) {
          filteredTasks.push(task);
        } else if (currentFilter === 'completed' && task.done === true) {
          filteredTasks.push(task);
        }
      }

      return filteredTasks;
    }

    function displayTasks() {
      let taskList = document.getElementById('taskList');
      let filteredTasks = getFilteredTasks();

      if (filteredTasks.length === 0) {
        let message = currentFilter === 'all' ? 'タスクがありません' :
                      currentFilter === 'incomplete' ? '未完了のタスクがありません' :
                      '完了したタスクがありません';
        taskList.innerHTML = '<div class="empty-message">' + message + '</div>';
        return;
      }

      let html = "";

      for (let i = 0; i < filteredTasks.length; i++) {
        let task = filteredTasks[i];
        let doneClass = task.done ? "done" : "";

        html += '<div class="task-item ' + doneClass + '">';
        html += '  <input type="checkbox" ';
        if (task.done) {
          html += 'checked ';
        }
        html += 'onchange="toggleTask(' + task.id + ')">';
        html += '  <span>' + task.text + '</span>';
        html += '  <button class="delete-btn" onclick="deleteTask(' + task.id + ')">削除</button>';
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

## 🔍 インデックスとIDの違い

### インデックスの問題点（前回）

```javascript
tasks = [
  "買い物に行く",    // インデックス0
  "宿題をする",      // インデックス1
  "メールを送る"     // インデックス2
];

// インデックス1を削除
deleteTask(1);

// 結果
tasks = [
  "買い物に行く",    // インデックス0（変わらず）
  "メールを送る"     // インデックス1（2から変わった！）
];
```

**問題**：削除すると他の要素のインデックスが変わってしまう

### IDの利点（今回）

```javascript
tasks = [
  { id: 1, text: "買い物に行く", done: false },
  { id: 2, text: "宿題をする", done: false },
  { id: 3, text: "メールを送る", done: false }
];

// ID 2を削除
deleteTask(2);

// 結果
tasks = [
  { id: 1, text: "買い物に行く", done: false },  // IDは1のまま
  { id: 3, text: "メールを送る", done: false }   // IDは3のまま
];
```

**利点**：
- ✅ 削除してもIDは変わらない
- ✅ 特定のタスクを確実に操作できる
- ✅ 後でlocalStorageに保存するときに便利
- ✅ ボタンクリック時のバグが起きにくい

---

## ⚠️ よくある間違いと解決方法

### 間違い1: IDカウンターを増やし忘れ

```javascript
// ❌ 悪い例
function addTask(text) {
  let newTask = {
    id: taskIdCounter,  // 毎回同じIDになってしまう
    text: text,
    done: false
  };
  // taskIdCounter++ を忘れている！
  tasks.push(newTask);
}
```

**問題点**: 全てのタスクのIDが同じになる

**解決方法**:
```javascript
// ✅ 良い例
function addTask(text) {
  let newTask = {
    id: taskIdCounter,
    text: text,
    done: false
  };
  taskIdCounter = taskIdCounter + 1;  // 必ず増やす！
  tasks.push(newTask);
}
```

### 間違い2: doneをtrue/false以外にする

```javascript
// ❌ 悪い例
task.done = "true";  // 文字列にしない
task.done = 1;       // 数値にしない
task.done = "yes";   // 文字列にしない

// ✅ 良い例
task.done = true;    // ブール値を使う
task.done = false;
```

**問題点**: 条件判定が正しく動かない可能性がある

### 間違い3: ===と==を混同する

```javascript
// ⚠️ 注意が必要
if (tasks[i].id == id) {  // == は型変換が起こる
  // 例: "1" == 1 は true になる
}

// ✅ 推奨
if (tasks[i].id === id) {  // === は型も厳密に比較
  // 例: "1" === 1 は false になる
}
```

---

## ✅ カリキュラム仕様の確認

このレッスンは、curriculum.mdの以下の項目を満たしています：

### レッスン147：TODOアプリ（オブジェクト編）（30分）
- ✅ **タスクをオブジェクトにする**: `{id, text, done}`の構造でタスクを管理
- ✅ **{id: 1, text: "買い物", done: false}**: この形式のオブジェクトを使用
- ✅ **完了/未完了の切り替え**: `toggleTask()`関数で`done`プロパティを反転
- ✅ **IDで管理**: IDカウンターで一意のIDを割り当て、IDで検索・削除
- ✅ **知識: オブジェクト、プロパティ、配列操作**: オブジェクトの配列を操作し、プロパティにアクセス
- ✅ **成果物: オブジェクト管理TODO**: 3つの完全動作するオブジェクト管理TODOアプリを作成

---

## 📝 まとめ

このレッスンでは、タスクをオブジェクトで管理するTODOアプリを作成しました。

### 学んだこと

1. **オブジェクトでタスク管理**
   - `{id, text, done}`の構造
   - 複数の情報を1つにまとめて管理

2. **IDカウンターの管理**
   - `let taskIdCounter = 1`で次のIDを管理
   - タスク追加時にカウンターを増やす
   - 一意のIDを自動採番

3. **IDによる操作**
   - `getTaskById(id)`: IDで検索
   - `toggleTask(id)`: 完了状態を切り替え
   - `deleteTask(id)`: IDで削除

4. **ブール値の活用**
   - `done: true/false`で完了状態を管理
   - `!`演算子で状態を反転
   - `if (task.done)`で条件判定

5. **オブジェクトの配列**
   - `tasks[i].property`でプロパティにアクセス
   - ループでオブジェクトを処理
   - 配列操作（`push`, `splice`）

### 文字列からオブジェクトへの進化

```javascript
// 前回（文字列）
tasks = ["買い物", "宿題"]

// 今回（オブジェクト）
tasks = [
  {id: 1, text: "買い物", done: false},
  {id: 2, text: "宿題", done: true}
]
```

オブジェクトにすることで、より多くの情報を管理でき、実用的なアプリになりました。

---

## 🚀 次のレッスンでは

次のレッスンでは、コードを**関数に整理**して、より保守しやすい構造にします。

また、以下の機能を追加します：
- フィルター機能（全て・未完了・完了）
- 統計情報の表示
- より高度なUI

---

**作成日**: 2025-11-26
**トピック**: TODOアプリオブジェクト編、ID管理、完了状態の切り替え、オブジェクトの配列操作
