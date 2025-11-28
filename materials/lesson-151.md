# レッスン151：TODOアプリ（フィルター編）

## このレッスンで学ぶこと
- すべて表示
- 未完了のみ表示
- 完了のみ表示
- ボタンで切り替え
- 配列のfilter()メソッド

---

## 1. 日常生活の例:本棚の本を探す

TODOアプリを使い続けていると、タスクがどんどん増えていきます。完了したタスクと未完了のタスクが混在すると、**今やるべきことが分かりにくくなります**。

これは、**本棚にすべての本が並んでいて、読みたい本を探すのが大変**な状況に似ています：

### フィルター機能がない場合（すべて表示のみ）
```
本棚:
┌────────────────────────┐
│ 📕 読んだ本            │
│ 📗 読んでない本        │
│ 📕 読んだ本            │
│ 📗 読んでない本        │
│ 📕 読んだ本            │
│ 📗 読んでない本        │
└────────────────────────┘

読みたい本を探すのが大変...
```

### フィルター機能がある場合
```
フィルター選択:
┌──────────────────────┐
│ [すべて] │
│ [読んでない本のみ] │  ← これを選択
│ [読んだ本のみ]     │
└──────────────────────┘

↓

表示:
┌────────────────────────┐
│ 📗 読んでない本        │
│ 📗 読んでない本        │
│ 📗 読んでない本        │
└────────────────────────┘

読みたい本がすぐ分かる！
```

**フィルター機能は、必要な情報だけを素早く見つけるための仕組みです！**

---

## 2. フィルター機能とは何か

### フィルターの概念

**フィルター（filter）**は、条件に合うものだけを取り出す機能です。

```
元のデータ:
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

↓ フィルター: 5以上

結果:
[5, 6, 7, 8, 9, 10]
```

### 日常生活のフィルター例

**1. メールアプリ**
```
[すべて] [未読] [既読] [重要] [迷惑メール]

未読を選択 → 未読メールだけ表示
```

**2. ECサイト**
```
[すべて] [価格の安い順] [新着順] [評価の高い順]

価格の安い順 → 安い商品から表示
```

**3. 写真アプリ**
```
[すべて] [今日] [今週] [今月] [お気に入り]

今日 → 今日撮った写真だけ表示
```

### TODOアプリのフィルター

TODOアプリでは、タスクの状態でフィルターします：

```
フィルターの種類:
1. すべて表示      → すべてのタスク
2. 未完了のみ表示  → done: false のタスク
3. 完了のみ表示    → done: true のタスク
```

---

## 3. filter()メソッド：配列から条件に合う要素を取り出す

### filter()メソッドとは

JavaScriptの配列には、**filter()メソッド**という便利な機能があります。

```javascript
配列.filter(function(要素) {
  return 条件;
});
```

### 実行の流れ：基本例

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let result = numbers.filter(function(num) {
  return num >= 5;
});
```

**処理のプロセス：**
```
元の配列:
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

↓ filter()が各要素をチェック

num = 1 → 1 >= 5 ? → false → 除外
num = 2 → 2 >= 5 ? → false → 除外
num = 3 → 3 >= 5 ? → false → 除外
num = 4 → 4 >= 5 ? → false → 除外
num = 5 → 5 >= 5 ? → true  → 含める ✓
num = 6 → 6 >= 5 ? → true  → 含める ✓
num = 7 → 7 >= 5 ? → true  → 含める ✓
num = 8 → 8 >= 5 ? → true  → 含める ✓
num = 9 → 9 >= 5 ? → true  → 含める ✓
num = 10 → 10 >= 5 ? → true → 含める ✓

↓

新しい配列:
[5, 6, 7, 8, 9, 10]

result = [5, 6, 7, 8, 9, 10]
```

### 実行の流れ：偶数だけ取り出す

```javascript
let numbers = [1, 2, 3, 4, 5, 6];

let evenNumbers = numbers.filter(function(num) {
  return num % 2 === 0;
});
```

**処理のプロセス：**
```
num = 1 → 1 % 2 === 0 ? → false → 除外
num = 2 → 2 % 2 === 0 ? → true  → 含める ✓
num = 3 → 3 % 2 === 0 ? → false → 除外
num = 4 → 4 % 2 === 0 ? → true  → 含める ✓
num = 5 → 5 % 2 === 0 ? → false → 除外
num = 6 → 6 % 2 === 0 ? → true  → 含める ✓

↓

evenNumbers = [2, 4, 6]
```

### 実行の流れ：TODOアプリで使う

```javascript
let tasks = [
  { id: 1, text: '買い物', done: false },
  { id: 2, text: '宿題', done: true },
  { id: 3, text: '掃除', done: false },
  { id: 4, text: '洗濯', done: true }
];

let incompleteTasks = tasks.filter(function(task) {
  return task.done === false;
});
```

**処理のプロセス：**
```
task = { id: 1, text: '買い物', done: false }
  → done === false ? → true → 含める ✓

task = { id: 2, text: '宿題', done: true }
  → done === false ? → false → 除外

task = { id: 3, text: '掃除', done: false }
  → done === false ? → true → 含める ✓

task = { id: 4, text: '洗濯', done: true }
  → done === false ? → false → 除外

↓

incompleteTasks = [
  { id: 1, text: '買い物', done: false },
  { id: 3, text: '掃除', done: false }
]
```

### filter()の重要な特徴

**1. 元の配列は変更されない**
```javascript
let numbers = [1, 2, 3, 4, 5];
let filtered = numbers.filter(function(num) {
  return num >= 3;
});

console.log(numbers);  // [1, 2, 3, 4, 5] ← 変わらない
console.log(filtered); // [3, 4, 5]       ← 新しい配列
```

**2. 条件に合うものがなければ空配列**
```javascript
let numbers = [1, 2, 3];
let result = numbers.filter(function(num) {
  return num >= 10;
});

console.log(result);  // [] ← 空配列
```

**3. すべて条件に合えば全要素を含む**
```javascript
let numbers = [1, 2, 3];
let result = numbers.filter(function(num) {
  return num >= 1;
});

console.log(result);  // [1, 2, 3] ← 全部
```

---

## 4. フィルター状態の管理

### 現在のフィルターを記憶する

どのフィルターが選択されているかを変数で管理します：

```javascript
let currentFilter = 'all';  // 'all', 'active', 'completed'
```

**値の意味：**
```
'all'       → すべて表示
'active'    → 未完了のみ表示
'completed' → 完了のみ表示
```

### getFilteredTasks()関数を作る

現在のフィルター設定に応じて、表示するタスクを返す関数：

```javascript
function getFilteredTasks() {
  if (currentFilter === 'all') {
    return tasks;
  } else if (currentFilter === 'active') {
    return tasks.filter(function(task) {
      return task.done === false;
    });
  } else if (currentFilter === 'completed') {
    return tasks.filter(function(task) {
      return task.done === true;
    });
  }
}
```

**実行の流れ（currentFilter === 'active'の場合）：**
```
tasks = [
  { id: 1, text: '買い物', done: false },
  { id: 2, text: '宿題', done: true },
  { id: 3, text: '掃除', done: false }
]

currentFilter = 'active'

↓ getFilteredTasks() が呼ばれる

if (currentFilter === 'all') → false
else if (currentFilter === 'active') → true ✓

↓ この処理が実行される

return tasks.filter(function(task) {
  return task.done === false;
});

↓ filter()が実行される

返り値 = [
  { id: 1, text: '買い物', done: false },
  { id: 3, text: '掃除', done: false }
]
```

**実行の流れ（currentFilter === 'all'の場合）：**
```
tasks = [
  { id: 1, text: '買い物', done: false },
  { id: 2, text: '宿題', done: true },
  { id: 3, text: '掃除', done: false }
]

currentFilter = 'all'

↓ getFilteredTasks() が呼ばれる

if (currentFilter === 'all') → true ✓

↓ この処理が実行される

return tasks;

↓

返り値 = [
  { id: 1, text: '買い物', done: false },
  { id: 2, text: '宿題', done: true },
  { id: 3, text: '掃除', done: false }
]

すべてのタスクをそのまま返す
```

---

## 5. ボタンで切り替える仕組み

### HTML：3つのフィルターボタン

```html
<div class="filter-buttons">
  <button id="filterAll" onclick="setFilter('all')">すべて</button>
  <button id="filterActive" onclick="setFilter('active')">未完了</button>
  <button id="filterCompleted" onclick="setFilter('completed')">完了</button>
</div>
```

### setFilter()関数を作る

```javascript
function setFilter(filter) {
  currentFilter = filter;
  displayTasks();
}
```

**実行の流れ：**
```
ユーザーが「未完了」ボタンをクリック

↓ onclick="setFilter('active')" が実行される

setFilter('active') が呼ばれる

↓

currentFilter = 'active'  // 状態を変更

↓

displayTasks()  // 画面を再描画

↓ displayTasks()の中で

let filteredTasks = getFilteredTasks();

↓ getFilteredTasks()の中で

currentFilter === 'active' なので
未完了のタスクだけを返す

↓

未完了のタスクだけが画面に表示される
```

### 全体の流れ図

```
初期状態:
currentFilter = 'all'
画面にすべてのタスクが表示されている

↓ ユーザーが「未完了」ボタンをクリック

setFilter('active') が呼ばれる
  ↓
  currentFilter = 'active' に変更
  ↓
  displayTasks() を呼ぶ
    ↓
    getFilteredTasks() を呼ぶ
      ↓
      未完了タスクだけを返す
    ↓
    未完了タスクを画面に表示

結果:
currentFilter = 'active'
画面に未完了のタスクだけが表示されている
```

---

## 6. アクティブなボタンを視覚的に示す

### なぜ必要か

現在どのフィルターが選択されているか、ユーザーに分かりやすく示す必要があります。

```
悪い例（どれが選択されているか分からない）:
[すべて] [未完了] [完了]

良い例（選択中のボタンが強調されている）:
[すべて] [未完了] [完了]
          ↑
          背景が青く、文字が白い
```

### updateFilterButtons()関数

```javascript
function updateFilterButtons() {
  // すべてのボタンから active クラスを削除
  let allBtn = document.getElementById('filterAll');
  let activeBtn = document.getElementById('filterActive');
  let completedBtn = document.getElementById('filterCompleted');

  allBtn.classList.remove('active');
  activeBtn.classList.remove('active');
  completedBtn.classList.remove('active');

  // 現在のフィルターに対応するボタンに active クラスを追加
  if (currentFilter === 'all') {
    allBtn.classList.add('active');
  } else if (currentFilter === 'active') {
    activeBtn.classList.add('active');
  } else if (currentFilter === 'completed') {
    completedBtn.classList.add('active');
  }
}
```

**実行の流れ（currentFilter === 'active'の場合）：**
```
ボタンの初期状態:
<button id="filterAll" class="active">すべて</button>
<button id="filterActive">未完了</button>
<button id="filterCompleted">完了</button>

↓ updateFilterButtons() が呼ばれる

すべてのボタンから active を削除:
<button id="filterAll">すべて</button>
<button id="filterActive">未完了</button>
<button id="filterCompleted">完了</button>

↓ currentFilter === 'active' なので

activeBtn.classList.add('active');

↓

<button id="filterAll">すべて</button>
<button id="filterActive" class="active">未完了</button>
<button id="filterCompleted">完了</button>
```

### CSS：activeクラスのスタイル

```css
.filter-buttons button {
  padding: 8px 16px;
  margin: 0 5px;
  border: 2px solid #ddd;
  background: white;
  color: #333;
  cursor: pointer;
}

.filter-buttons button.active {
  background: #667eea;  /* 紫色の背景 */
  color: white;         /* 白文字 */
  border-color: #667eea;
}
```

**表示結果：**
```
通常のボタン:
┌─────────┐
│ すべて  │  白背景、黒文字
└─────────┘

アクティブなボタン:
┌─────────┐
│ 未完了  │  紫背景、白文字 ← 目立つ
└─────────┘
```

---

## 7. displayTasks()関数の更新

フィルターされたタスクだけを表示するように変更します：

```javascript
function displayTasks() {
  let taskList = document.getElementById('taskList');

  // フィルターされたタスクを取得
  let filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    taskList.innerHTML = '<div class="empty-message">タスクがありません</div>';
    updateFilterButtons();
    return;
  }

  let html = "";
  for (let i = 0; i < filteredTasks.length; i++) {
    let task = filteredTasks[i];

    if (task.done) {
      html += '<div class="task-item done">';
    } else {
      html += '<div class="task-item">';
    }

    html += '<input type="checkbox"';
    if (task.done) {
      html += ' checked';
    }
    html += ' onchange="handleToggle(' + task.id + ')">';

    html += '<span>' + task.text + '</span>';

    html += '<button class="btn-delete" onclick="handleDelete(' + task.id + ')">削除</button>';

    html += '</div>';
  }

  taskList.innerHTML = html;
  updateFilterButtons();
}
```

**実行の流れ：**
```
tasks = [
  { id: 1, text: '買い物', done: false },
  { id: 2, text: '宿題', done: true },
  { id: 3, text: '掃除', done: false }
]

currentFilter = 'active'

↓ displayTasks() が呼ばれる

let filteredTasks = getFilteredTasks();

↓ getFilteredTasks() が実行される

filteredTasks = [
  { id: 1, text: '買い物', done: false },
  { id: 3, text: '掃除', done: false }
]

↓ for文で各タスクのHTMLを生成

html = '<div class="task-item">...</div><div class="task-item">...</div>'

↓ taskList.innerHTML = html;

画面に未完了タスクだけが表示される

↓ updateFilterButtons();

「未完了」ボタンが強調される
```

---

## 8. 実践例1：基本的なフィルター機能

完全に動作するHTML例です。フィルターボタンをクリックして表示が切り替わることを確認してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>フィルター機能付きTODOアプリ</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }

    h1 {
      text-align: center;
      color: #333;
      margin: 0 0 30px 0;
      font-size: 32px;
      font-weight: 700;
    }

    h1::before {
      content: "✓ ";
      color: #667eea;
    }

    .filter-buttons {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 30px;
    }

    .filter-buttons button {
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 600;
      border: 2px solid #ddd;
      border-radius: 8px;
      background: white;
      color: #333;
      cursor: pointer;
      transition: all 0.3s;
    }

    .filter-buttons button:hover {
      background: #f5f5f5;
    }

    .filter-buttons button.active {
      background: #667eea;
      color: white;
      border-color: #667eea;
    }

    .input-area {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
    }

    #taskInput {
      flex: 1;
      padding: 12px 16px;
      font-size: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      transition: border-color 0.3s;
    }

    #taskInput:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    button {
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-add {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-add:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-delete {
      background: #ff4757;
      color: white;
      padding: 6px 12px;
      font-size: 14px;
    }

    .btn-delete:hover {
      background: #ff3838;
      transform: scale(1.05);
    }

    .task-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      margin-bottom: 12px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      transition: all 0.3s;
    }

    .task-item:hover {
      background: #e9ecef;
      transform: translateX(4px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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

    .task-item.done {
      opacity: 0.6;
      border-left-color: #2ed573;
    }

    .task-item.done span {
      text-decoration: line-through;
      color: #999;
    }

    .empty-message {
      text-align: center;
      padding: 40px 20px;
      color: #999;
      font-size: 18px;
    }

    .empty-message::before {
      content: "📝";
      display: block;
      font-size: 48px;
      margin-bottom: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>TODOリスト</h1>

    <div class="filter-buttons">
      <button id="filterAll" class="active" onclick="setFilter('all')">すべて</button>
      <button id="filterActive" onclick="setFilter('active')">未完了</button>
      <button id="filterCompleted" onclick="setFilter('completed')">完了</button>
    </div>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="新しいタスクを入力...">
      <button class="btn-add" onclick="handleAdd()">追加</button>
    </div>

    <div id="taskList"></div>
  </div>

  <script>
    // データ
    let tasks = [];
    let taskIdCounter = 1;
    let currentFilter = 'all';  // 'all', 'active', 'completed'

    // データ操作関数
    function addTask(text) {
      let newTask = {
        id: taskIdCounter,
        text: text,
        done: false
      };
      taskIdCounter = taskIdCounter + 1;
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

    // フィルター関数
    function getFilteredTasks() {
      if (currentFilter === 'all') {
        return tasks;
      } else if (currentFilter === 'active') {
        return tasks.filter(function(task) {
          return task.done === false;
        });
      } else if (currentFilter === 'completed') {
        return tasks.filter(function(task) {
          return task.done === true;
        });
      }
    }

    function setFilter(filter) {
      currentFilter = filter;
      displayTasks();
    }

    function updateFilterButtons() {
      let allBtn = document.getElementById('filterAll');
      let activeBtn = document.getElementById('filterActive');
      let completedBtn = document.getElementById('filterCompleted');

      allBtn.classList.remove('active');
      activeBtn.classList.remove('active');
      completedBtn.classList.remove('active');

      if (currentFilter === 'all') {
        allBtn.classList.add('active');
      } else if (currentFilter === 'active') {
        activeBtn.classList.add('active');
      } else if (currentFilter === 'completed') {
        completedBtn.classList.add('active');
      }
    }

    // localStorage操作
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
        console.error('データの読み込みに失敗しました:', error);
        tasks = [];
        taskIdCounter = 1;
      }
    }

    // 表示関数
    function displayTasks() {
      let taskList = document.getElementById('taskList');

      let filteredTasks = getFilteredTasks();

      if (filteredTasks.length === 0) {
        taskList.innerHTML = '<div class="empty-message">タスクがありません</div>';
        updateFilterButtons();
        return;
      }

      let html = "";
      for (let i = 0; i < filteredTasks.length; i++) {
        let task = filteredTasks[i];

        if (task.done) {
          html += '<div class="task-item done">';
        } else {
          html += '<div class="task-item">';
        }

        html += '<input type="checkbox"';
        if (task.done) {
          html += ' checked';
        }
        html += ' onchange="handleToggle(' + task.id + ')">';

        html += '<span>' + task.text + '</span>';

        html += '<button class="btn-delete" onclick="handleDelete(' + task.id + ')">削除</button>';

        html += '</div>';
      }

      taskList.innerHTML = html;
      updateFilterButtons();
    }

    // イベントハンドラ
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

    // 初期化
    loadTasks();
    displayTasks();
  </script>
</body>
</html>
```

**動作確認手順：**
1. タスクを5つ追加する
2. 2つを完了にする
3. **「未完了」ボタンをクリック** → 未完了タスクだけ表示
4. **「完了」ボタンをクリック** → 完了タスクだけ表示
5. **「すべて」ボタンをクリック** → すべてのタスクが表示

---

## 9. 実践例2：タスク数カウンター付きフィルター

各フィルターに該当するタスクの数を表示します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>タスク数表示付きTODOアプリ</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }

    h1 {
      text-align: center;
      color: #333;
      margin: 0 0 30px 0;
      font-size: 32px;
      font-weight: 700;
    }

    h1::before {
      content: "✓ ";
      color: #667eea;
    }

    .filter-buttons {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 30px;
    }

    .filter-buttons button {
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 600;
      border: 2px solid #ddd;
      border-radius: 8px;
      background: white;
      color: #333;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
    }

    .filter-buttons button:hover {
      background: #f5f5f5;
    }

    .filter-buttons button.active {
      background: #667eea;
      color: white;
      border-color: #667eea;
    }

    .filter-buttons button .count {
      display: inline-block;
      margin-left: 8px;
      padding: 2px 8px;
      background: #e0e0e0;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 700;
    }

    .filter-buttons button.active .count {
      background: rgba(255, 255, 255, 0.3);
      color: white;
    }

    .input-area {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
    }

    #taskInput {
      flex: 1;
      padding: 12px 16px;
      font-size: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      transition: border-color 0.3s;
    }

    #taskInput:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    button {
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-add {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-add:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-delete {
      background: #ff4757;
      color: white;
      padding: 6px 12px;
      font-size: 14px;
    }

    .btn-delete:hover {
      background: #ff3838;
      transform: scale(1.05);
    }

    .task-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      margin-bottom: 12px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      transition: all 0.3s;
    }

    .task-item:hover {
      background: #e9ecef;
      transform: translateX(4px);
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

    .task-item.done {
      opacity: 0.6;
      border-left-color: #2ed573;
    }

    .task-item.done span {
      text-decoration: line-through;
      color: #999;
    }

    .empty-message {
      text-align: center;
      padding: 40px 20px;
      color: #999;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>TODOリスト</h1>

    <div class="filter-buttons">
      <button id="filterAll" class="active" onclick="setFilter('all')">
        すべて<span class="count" id="countAll">0</span>
      </button>
      <button id="filterActive" onclick="setFilter('active')">
        未完了<span class="count" id="countActive">0</span>
      </button>
      <button id="filterCompleted" onclick="setFilter('completed')">
        完了<span class="count" id="countCompleted">0</span>
      </button>
    </div>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="新しいタスクを入力...">
      <button class="btn-add" onclick="handleAdd()">追加</button>
    </div>

    <div id="taskList"></div>
  </div>

  <script>
    let tasks = [];
    let taskIdCounter = 1;
    let currentFilter = 'all';

    function addTask(text) {
      let newTask = {
        id: taskIdCounter,
        text: text,
        done: false
      };
      taskIdCounter = taskIdCounter + 1;
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

    function getFilteredTasks() {
      if (currentFilter === 'all') {
        return tasks;
      } else if (currentFilter === 'active') {
        return tasks.filter(function(task) {
          return task.done === false;
        });
      } else if (currentFilter === 'completed') {
        return tasks.filter(function(task) {
          return task.done === true;
        });
      }
    }

    function getTaskCounts() {
      let activeCount = 0;
      let completedCount = 0;

      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].done) {
          completedCount = completedCount + 1;
        } else {
          activeCount = activeCount + 1;
        }
      }

      return {
        all: tasks.length,
        active: activeCount,
        completed: completedCount
      };
    }

    function updateCounts() {
      let counts = getTaskCounts();
      document.getElementById('countAll').textContent = counts.all;
      document.getElementById('countActive').textContent = counts.active;
      document.getElementById('countCompleted').textContent = counts.completed;
    }

    function setFilter(filter) {
      currentFilter = filter;
      displayTasks();
    }

    function updateFilterButtons() {
      let allBtn = document.getElementById('filterAll');
      let activeBtn = document.getElementById('filterActive');
      let completedBtn = document.getElementById('filterCompleted');

      allBtn.classList.remove('active');
      activeBtn.classList.remove('active');
      completedBtn.classList.remove('active');

      if (currentFilter === 'all') {
        allBtn.classList.add('active');
      } else if (currentFilter === 'active') {
        activeBtn.classList.add('active');
      } else if (currentFilter === 'completed') {
        completedBtn.classList.add('active');
      }
    }

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
        console.error('データの読み込みに失敗しました:', error);
        tasks = [];
        taskIdCounter = 1;
      }
    }

    function displayTasks() {
      let taskList = document.getElementById('taskList');

      let filteredTasks = getFilteredTasks();

      if (filteredTasks.length === 0) {
        taskList.innerHTML = '<div class="empty-message">タスクがありません</div>';
        updateFilterButtons();
        updateCounts();
        return;
      }

      let html = "";
      for (let i = 0; i < filteredTasks.length; i++) {
        let task = filteredTasks[i];

        if (task.done) {
          html += '<div class="task-item done">';
        } else {
          html += '<div class="task-item">';
        }

        html += '<input type="checkbox"';
        if (task.done) {
          html += ' checked';
        }
        html += ' onchange="handleToggle(' + task.id + ')">';

        html += '<span>' + task.text + '</span>';

        html += '<button class="btn-delete" onclick="handleDelete(' + task.id + ')">削除</button>';

        html += '</div>';
      }

      taskList.innerHTML = html;
      updateFilterButtons();
      updateCounts();
    }

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

    loadTasks();
    displayTasks();
  </script>
</body>
</html>
```

**getTaskCounts()関数の仕組み：**
```javascript
function getTaskCounts() {
  let activeCount = 0;
  let completedCount = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done) {
      completedCount = completedCount + 1;
    } else {
      activeCount = activeCount + 1;
    }
  }

  return {
    all: tasks.length,
    active: activeCount,
    completed: completedCount
  };
}
```

**実行の流れ：**
```
tasks = [
  { id: 1, text: '買い物', done: false },
  { id: 2, text: '宿題', done: true },
  { id: 3, text: '掃除', done: false },
  { id: 4, text: '洗濯', done: true },
  { id: 5, text: '料理', done: false }
]

↓ getTaskCounts() が呼ばれる

activeCount = 0
completedCount = 0

↓ for文で各タスクをチェック

i = 0: done === false → activeCount = 1
i = 1: done === true  → completedCount = 1
i = 2: done === false → activeCount = 2
i = 3: done === true  → completedCount = 2
i = 4: done === false → activeCount = 3

↓ 返り値

{
  all: 5,
  active: 3,
  completed: 2
}

↓ 表示

[すべて 5] [未完了 3] [完了 2]
```

---

## 10. よくある問題と解決策

### 問題1：フィルターを変えても表示が変わらない

**原因：displayTasks()を呼んでいない**
```javascript
// 悪い例
function setFilter(filter) {
  currentFilter = filter;
  // displayTasks()を呼んでいない！
}

// 良い例
function setFilter(filter) {
  currentFilter = filter;
  displayTasks();  // 必ず呼ぶ
}
```

### 問題2：フィルター後に完了切り替えができない

**原因：元の配列のインデックスではなく、フィルター後の配列のインデックスを使っている**
```javascript
// 悪い例
function handleToggle(index) {
  let filteredTasks = getFilteredTasks();
  filteredTasks[index].done = !filteredTasks[index].done;
  // filteredTasksは一時的な配列なので、元のtasksは変わらない
}

// 良い例
function handleToggle(id) {
  let task = getTaskById(id);  // IDで検索
  task.done = !task.done;
  saveTasks();
  displayTasks();
}
```

### 問題3：ボタンの強調表示が更新されない

**原因：updateFilterButtons()を呼んでいない**
```javascript
// 悪い例
function displayTasks() {
  // タスクを表示
  // updateFilterButtons()を呼んでいない！
}

// 良い例
function displayTasks() {
  // タスクを表示
  updateFilterButtons();  // 必ず呼ぶ
}
```

---

## 11. まとめ

### このレッスンで学んだこと

**1. filter()メソッド**
- 配列から条件に合う要素だけを取り出す
- 元の配列は変更されない
- 新しい配列を返す
- `配列.filter(function(要素) { return 条件; })`

**2. フィルター状態の管理**
- `currentFilter`変数で現在の状態を管理
- 'all', 'active', 'completed'の3種類
- 状態に応じて異なる処理を実行

**3. ボタンで切り替え**
- `setFilter(filter)`関数で状態を変更
- 変更後に`displayTasks()`を呼んで再描画
- ボタンのアクティブ状態を視覚的に示す

**4. 動的な表示切り替え**
- `getFilteredTasks()`で表示するタスクを決定
- filter()メソッドで条件に合うタスクを抽出
- ユーザーの操作に応じて即座に表示を更新

### 重要な概念

**filter()の流れ：**
```
元の配列 → filter()で条件チェック → 新しい配列
```

**フィルター切り替えの流れ：**
```
ボタンクリック
  ↓
currentFilter変更
  ↓
displayTasks()呼び出し
  ↓
getFilteredTasks()でフィルター
  ↓
画面更新
```

**状態管理：**
```
currentFilter = 'all'      → すべて表示
currentFilter = 'active'   → 未完了のみ表示
currentFilter = 'completed' → 完了のみ表示
```

---

## 12. カリキュラム要件チェック

レッスン151の要件を確認します：

✅ **すべて表示**
- `currentFilter === 'all'`のときすべてのタスクを表示
- `getFilteredTasks()`で`tasks`をそのまま返す

✅ **未完了のみ表示**
- `currentFilter === 'active'`のとき未完了タスクのみ表示
- `tasks.filter(function(task) { return task.done === false; })`で実装

✅ **完了のみ表示**
- `currentFilter === 'completed'`のとき完了タスクのみ表示
- `tasks.filter(function(task) { return task.done === true; })`で実装

✅ **ボタンで切り替え**
- 3つのフィルターボタン（すべて、未完了、完了）
- `setFilter(filter)`関数でフィルターを切り替え
- `updateFilterButtons()`でアクティブなボタンを強調表示

**すべての要件を満たしています！**

---

## 13. 次のレッスンの予告

次のレッスンでは、**カテゴリ機能**を追加します！

### 学ぶこと
- タスクにカテゴリを追加
- カテゴリ別に表示
- カテゴリを選択できる
- 複数カテゴリの管理

### できるようになること
```
現在:
タスクをフィルターで絞り込める

次回:
┌──────────────────┐
│ カテゴリ: 仕事   │
│ ・会議の準備     │
│ ・資料作成       │
└──────────────────┘
┌──────────────────┐
│ カテゴリ: 個人   │
│ ・買い物         │
│ ・掃除           │
└──────────────────┘

タスクをカテゴリで整理できる！
```

**TODOアプリがさらに使いやすくなります！**

---

Date: 2025-11-26
