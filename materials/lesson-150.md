# レッスン150：TODOアプリ（保存編）

## このレッスンで学ぶこと
- localStorageでデータを保存する
- JSON.stringifyでデータを変換する
- JSON.parseでデータを復元する
- ページを再読み込みしてもデータが残る仕組み

---

## 1. 日常生活の例：冷蔵庫に食材を保存する

これまでのTODOアプリは、**ページを閉じるとすべて消えてしまう**という大きな問題がありました。

これは、**料理を作っても冷蔵庫に保存せず、そのまま放置する**ようなものです：

### データを保存しない場合（これまで）
```
朝:
タスクを追加
┌─────────────┐
│ 買い物      │
│ 宿題        │
│ 掃除        │
└─────────────┘

↓ ページを閉じる

夜:
すべて消える！
┌─────────────┐
│ （空）      │
└─────────────┘
また最初から...
```

### データを保存する場合（localStorage）
```
朝:
タスクを追加
┌─────────────┐
│ 買い物      │
│ 宿題        │
│ 掃除        │
└─────────────┘
→ 自動保存！

↓ ページを閉じる

夜:
データが残っている！
┌─────────────┐
│ 買い物      │
│ 宿題        │
│ 掃除        │
└─────────────┘
続きから始められる！
```

**localStorageは、データを「冷蔵庫」に保存する仕組みです！**

---

## 2. localStorageとは何か

### localStorageの概念

**localStorage**は、ブラウザに備わっている「データ保管庫」です。

```
ブラウザ（Chrome、Firefox、Edgeなど）
┌────────────────────────────────┐
│                                │
│  Webページ                     │
│  ┌──────────────┐              │
│  │ TODOアプリ   │              │
│  └──────────────┘              │
│         ↓↑                     │
│  ┌──────────────┐              │
│  │ localStorage │ ← データ保管庫│
│  │ key: value   │              │
│  │ todoApp: ... │              │
│  └──────────────┘              │
│                                │
└────────────────────────────────┘

ページを閉じても消えない！
```

### localStorageの特徴

**1. 永続的（Persistent）**
```
通常の変数:
let tasks = [];  // ページを閉じると消える

localStorage:
localStorage.setItem('tasks', ...)  // ページを閉じても残る
```

**2. ドメインごとに独立**
```
https://example.com
→ example.comのlocalStorage

https://another.com
→ another.comのlocalStorage

別々に管理される
```

**3. 文字列のみ保存可能**
```
保存できる:
localStorage.setItem('name', 'John');  // 文字列

保存できない（そのままでは）:
localStorage.setItem('tasks', [1, 2, 3]);  // 配列
localStorage.setItem('user', { name: 'John' });  // オブジェクト
```

**4. 容量制限**
```
通常: 5MB～10MB程度
（ブラウザによって異なる）
```

---

## 3. localStorageの基本操作

### データを保存する：setItem()

```javascript
localStorage.setItem('キー', '値');
```

**実行の流れ：**
```javascript
localStorage.setItem('username', 'Taro');

↓

localStorage
┌──────────────────┐
│ username: 'Taro' │
└──────────────────┘
```

### データを取得する：getItem()

```javascript
let value = localStorage.getItem('キー');
```

**実行の流れ：**
```javascript
let username = localStorage.getItem('username');

↓

localStorage
┌──────────────────┐
│ username: 'Taro' │ → 'Taro'を返す
└──────────────────┘

username = 'Taro'
```

**データがない場合：**
```javascript
let age = localStorage.getItem('age');

↓

localStorage
┌──────────────────┐
│ username: 'Taro' │
└──────────────────┘
 'age'というキーがない

age = null  // nullを返す
```

### データを削除する：removeItem()

```javascript
localStorage.removeItem('キー');
```

**実行の流れ：**
```javascript
localStorage.removeItem('username');

↓

localStorage
┌──────────────────┐
│ （空）           │
└──────────────────┘
```

### すべて削除する：clear()

```javascript
localStorage.clear();
```

**実行の流れ：**
```javascript
localStorage.setItem('name', 'Taro');
localStorage.setItem('age', '20');
localStorage.setItem('city', 'Tokyo');

localStorage
┌──────────────────┐
│ name: 'Taro'     │
│ age: '20'        │
│ city: 'Tokyo'    │
└──────────────────┘

↓ localStorage.clear();

localStorage
┌──────────────────┐
│ （空）           │
└──────────────────┘
```

---

## 4. 問題：配列やオブジェクトは保存できない

### 問題の発生

```javascript
let tasks = [
  { id: 1, text: '買い物', done: false },
  { id: 2, text: '宿題', done: true }
];

localStorage.setItem('tasks', tasks);
```

**何が起こるか：**
```
実行結果:

localStorage
┌──────────────────────────────┐
│ tasks: '[object Object],...' │  ← 壊れた文字列！
└──────────────────────────────┘

取り出すとき:
let tasks = localStorage.getItem('tasks');
// '[object Object],[object Object]'
// 使えない...
```

### なぜこうなるのか

JavaScriptが配列をそのまま文字列に変換しようとすると：

```javascript
let tasks = [
  { id: 1, text: '買い物', done: false }
];

// 自動的に toString() が呼ばれる
String(tasks);  // "[object Object]"

// これと同じ
tasks.toString();  // "[object Object]"
```

**解決策：JSONを使う！**

---

## 5. JSON.stringify()：オブジェクトを文字列に変換

### JSON.stringify()とは

**JSON（JavaScript Object Notation）**は、データを文字列として表現する形式です。

```javascript
JSON.stringify(値);
```

### 実行の流れ：配列の場合

```javascript
let tasks = [
  { id: 1, text: '買い物', done: false },
  { id: 2, text: '宿題', done: true }
];

let jsonString = JSON.stringify(tasks);
```

**変換のプロセス：**
```
元のデータ（配列）:
[
  { id: 1, text: '買い物', done: false },
  { id: 2, text: '宿題', done: true }
]

↓ JSON.stringify()

JSON文字列:
'[{"id":1,"text":"買い物","done":false},{"id":2,"text":"宿題","done":true}]'
             ↑
             すべてが1つの文字列になる
```

### 実行の流れ：オブジェクトの場合

```javascript
let user = {
  name: 'Taro',
  age: 20,
  city: 'Tokyo'
};

let jsonString = JSON.stringify(user);
```

**変換のプロセス：**
```
元のデータ（オブジェクト）:
{
  name: 'Taro',
  age: 20,
  city: 'Tokyo'
}

↓ JSON.stringify()

JSON文字列:
'{"name":"Taro","age":20,"city":"Tokyo"}'
```

### JSON.stringify()の特徴

**1. 人間が読める**
```javascript
let data = { id: 1, text: '買い物', done: false };

// 整形オプション付き
let json = JSON.stringify(data, null, 2);

console.log(json);
/*
{
  "id": 1,
  "text": "買い物",
  "done": false
}
*/
```

**2. すべてのデータ型を保持**
```javascript
let data = {
  string: 'テキスト',
  number: 123,
  boolean: true,
  null: null,
  array: [1, 2, 3],
  object: { a: 1 }
};

JSON.stringify(data);
// '{"string":"テキスト","number":123,"boolean":true,"null":null,"array":[1,2,3],"object":{"a":1}}'
```

---

## 6. JSON.parse()：文字列をオブジェクトに復元

### JSON.parse()とは

JSON文字列を元のオブジェクトに戻す関数です。

```javascript
JSON.parse(JSON文字列);
```

### 実行の流れ

```javascript
let jsonString = '[{"id":1,"text":"買い物","done":false}]';

let tasks = JSON.parse(jsonString);
```

**復元のプロセス：**
```
JSON文字列:
'[{"id":1,"text":"買い物","done":false}]'

↓ JSON.parse()

元の配列:
[
  { id: 1, text: '買い物', done: false }
]

使える！
tasks[0].id    // 1
tasks[0].text  // '買い物'
tasks[0].done  // false
```

### エラーケース

**無効なJSON文字列の場合：**
```javascript
let badJSON = '{id: 1, text: "買い物"}';  // ダブルクォートがない

try {
  let data = JSON.parse(badJSON);
} catch (error) {
  console.error('JSONのパースに失敗:', error);
  // SyntaxError: Unexpected token i in JSON at position 1
}
```

**nullの場合：**
```javascript
let jsonString = null;

JSON.parse(jsonString);  // エラー！

// 正しい処理
if (jsonString !== null) {
  let data = JSON.parse(jsonString);
}
```

---

## 7. TODOアプリにlocalStorageを実装する

### ステップ1：データ構造を決める

保存するデータ：
- タスクの配列（tasks）
- 次のID（taskIdCounter）

```javascript
let data = {
  tasks: [
    { id: 1, text: '買い物', done: false },
    { id: 2, text: '宿題', done: true }
  ],
  taskIdCounter: 3
};
```

### ステップ2：saveTasks()関数を作る

```javascript
function saveTasks() {
  // オブジェクトにまとめる
  let data = {
    tasks: tasks,
    taskIdCounter: taskIdCounter
  };

  // JSON文字列に変換
  let jsonString = JSON.stringify(data);

  // localStorageに保存
  localStorage.setItem('todoApp', jsonString);
}
```

**実行の流れ：**
```
tasks = [
  { id: 1, text: '買い物', done: false }
]
taskIdCounter = 2

↓ data = { tasks: tasks, taskIdCounter: taskIdCounter }

data = {
  tasks: [{ id: 1, text: '買い物', done: false }],
  taskIdCounter: 2
}

↓ JSON.stringify(data)

jsonString = '{"tasks":[{"id":1,"text":"買い物","done":false}],"taskIdCounter":2}'

↓ localStorage.setItem('todoApp', jsonString)

localStorage
┌───────────────────────────────────────┐
│ todoApp: '{"tasks":[...],...}'        │
└───────────────────────────────────────┘
```

### ステップ3：loadTasks()関数を作る

```javascript
function loadTasks() {
  // localStorageからJSON文字列を取得
  let jsonString = localStorage.getItem('todoApp');

  // データがない場合（初回起動）
  if (jsonString === null) {
    tasks = [];
    taskIdCounter = 1;
    return;
  }

  // JSON文字列をオブジェクトに変換
  let data = JSON.parse(jsonString);

  // グローバル変数に代入
  tasks = data.tasks;
  taskIdCounter = data.taskIdCounter;
}
```

**実行の流れ（初回起動）：**
```
localStorage
┌───────────────────────────────────────┐
│ （空）                                │
└───────────────────────────────────────┘

↓ localStorage.getItem('todoApp')

jsonString = null

↓ if (jsonString === null)

tasks = []
taskIdCounter = 1

初期状態で開始
```

**実行の流れ（2回目以降）：**
```
localStorage
┌───────────────────────────────────────┐
│ todoApp: '{"tasks":[...],"task...}'   │
└───────────────────────────────────────┘

↓ localStorage.getItem('todoApp')

jsonString = '{"tasks":[{"id":1,"text":"買い物","done":false}],"taskIdCounter":2}'

↓ JSON.parse(jsonString)

data = {
  tasks: [{ id: 1, text: '買い物', done: false }],
  taskIdCounter: 2
}

↓ tasks = data.tasks; taskIdCounter = data.taskIdCounter;

tasks = [{ id: 1, text: '買い物', done: false }]
taskIdCounter = 2

前回のデータが復元された！
```

### ステップ4：データ変更時に保存する

```javascript
function addTask(text) {
  let newTask = {
    id: taskIdCounter,
    text: text,
    done: false
  };
  taskIdCounter = taskIdCounter + 1;
  tasks.push(newTask);

  saveTasks();  // ← ここで保存！

  return newTask;
}

function deleteTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      saveTasks();  // ← ここでも保存！
      return true;
    }
  }
  return false;
}

function toggleTask(id) {
  let task = getTaskById(id);
  if (task !== null) {
    task.done = !task.done;
    saveTasks();  // ← ここでも保存！
    return true;
  }
  return false;
}
```

**実行の流れ（タスク追加時）：**
```
タスクを追加:
addTask('買い物');

↓

tasks = [{ id: 1, text: '買い物', done: false }]
taskIdCounter = 2

↓ saveTasks() が呼ばれる

localStorage
┌───────────────────────────────────────┐
│ todoApp: '{"tasks":[...],...}'        │ ← 自動保存！
└───────────────────────────────────────┘
```

### ステップ5：起動時にデータを読み込む

```javascript
// ページが読み込まれたときに実行
loadTasks();
displayTasks();
```

**実行の流れ：**
```
ページを開く
↓
loadTasks()
  → localStorageからデータを読み込む
  → tasks と taskIdCounter を復元
↓
displayTasks()
  → 画面に表示

前回の続きから始められる！
```

---

## 8. エラー処理：try-catch構文

### なぜエラー処理が必要か

JSONのパースが失敗する可能性があります：

```javascript
// 壊れたデータ
let badJSON = '{invalid json}';

JSON.parse(badJSON);  // エラー！アプリが止まる
```

### try-catch構文

```javascript
try {
  // エラーが起こるかもしれないコード
} catch (error) {
  // エラーが起きたときの処理
}
```

### 実行の流れ：正常な場合

```javascript
try {
  let jsonString = '{"name":"Taro"}';
  let data = JSON.parse(jsonString);
  console.log(data.name);  // 'Taro'
} catch (error) {
  console.error('エラー:', error);
}
```

```
実行の流れ:

try ブロック:
  jsonString = '{"name":"Taro"}'
  ↓
  JSON.parse(jsonString)  ← 成功
  ↓
  data = { name: 'Taro' }
  ↓
  console.log(data.name)  // 'Taro'

catch ブロック:
  実行されない
```

### 実行の流れ：エラーの場合

```javascript
try {
  let jsonString = '{invalid}';
  let data = JSON.parse(jsonString);  // ここでエラー
  console.log(data.name);  // ここは実行されない
} catch (error) {
  console.error('エラー:', error);  // ここが実行される
}
```

```
実行の流れ:

try ブロック:
  jsonString = '{invalid}'
  ↓
  JSON.parse(jsonString)  ← エラー発生！
  ↓
  すぐにcatchブロックへジャンプ

catch ブロック:
  console.error('エラー:', error)
  ↓
  アプリは止まらず続行
```

### loadTasks()にエラー処理を追加

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
    // エラーが起きても初期状態で続行
    tasks = [];
    taskIdCounter = 1;
  }
}
```

**実行の流れ（エラーの場合）：**
```
localStorage
┌───────────────────────────────────────┐
│ todoApp: '{壊れたデータ}'             │
└───────────────────────────────────────┘

↓ JSON.parse(jsonString)

エラー発生！

↓ catch ブロック

console.error('データの読み込みに失敗しました:', error)
tasks = []
taskIdCounter = 1

↓

アプリは初期状態で動作
ユーザーは使い続けられる
```

### ||演算子でデフォルト値を設定

```javascript
tasks = data.tasks || [];
taskIdCounter = data.taskIdCounter || 1;
```

**仕組み：**
```
data.tasks が存在する場合:
  tasks = data.tasks

data.tasks が undefined の場合:
  tasks = []

同様に:
data.taskIdCounter が存在する → その値を使う
data.taskIdCounter が undefined → 1を使う
```

---

## 9. 実践例1：基本的なlocalStorage実装

完全に動作するHTML例です。ページを再読み込みしてもデータが残ることを確認してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>データ保存TODOアプリ</title>
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

    .info {
      background: #e3f2fd;
      border-left: 4px solid #2196f3;
      padding: 12px;
      margin-bottom: 20px;
      border-radius: 4px;
      font-size: 14px;
      color: #1565c0;
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

    <div class="info">
      💾 データは自動的に保存されます。ページを再読み込みしても消えません！
    </div>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="新しいタスクを入力...">
      <button class="btn-add" onclick="handleAdd()">追加</button>
    </div>

    <div id="taskList"></div>
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
      saveTasks();  // 保存
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
          saveTasks();  // 保存
          return true;
        }
      }
      return false;
    }

    function toggleTask(id) {
      let task = getTaskById(id);
      if (task !== null) {
        task.done = !task.done;
        saveTasks();  // 保存
        return true;
      }
      return false;
    }

    // ========================================
    // localStorage操作
    // ========================================
    function saveTasks() {
      let data = {
        tasks: tasks,
        taskIdCounter: taskIdCounter
      };
      let jsonString = JSON.stringify(data);
      localStorage.setItem('todoApp', jsonString);
      console.log('データを保存しました');
    }

    function loadTasks() {
      let jsonString = localStorage.getItem('todoApp');

      if (jsonString === null) {
        console.log('初回起動です');
        tasks = [];
        taskIdCounter = 1;
        return;
      }

      try {
        let data = JSON.parse(jsonString);
        tasks = data.tasks || [];
        taskIdCounter = data.taskIdCounter || 1;
        console.log('データを読み込みました:', tasks.length + '件のタスク');
      } catch (error) {
        console.error('データの読み込みに失敗しました:', error);
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
        taskList.innerHTML = '<div class="empty-message">タスクがありません</div>';
        return;
      }

      let html = "";
      for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

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
  </script>
</body>
</html>
```

**動作確認手順：**
1. タスクを3つ追加する
2. 1つを完了にする
3. **F5キーでページを再読み込み**
4. タスクが残っていることを確認！

---

## 10. 実践例2：デバッグ情報表示付きTODOアプリ

localStorageの動作を確認できるデバッグ情報を表示します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>デバッグ情報付きTODOアプリ</title>
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

    .debug-info {
      background: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 20px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
    }

    .debug-info h3 {
      margin: 0 0 12px 0;
      font-size: 14px;
      color: #333;
    }

    .debug-info pre {
      background: white;
      padding: 8px;
      border-radius: 4px;
      overflow-x: auto;
      max-height: 200px;
      overflow-y: auto;
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

    .btn-clear {
      background: #6c757d;
      color: white;
      padding: 8px 16px;
      font-size: 14px;
      margin-top: 10px;
    }

    .btn-clear:hover {
      background: #5a6268;
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

    <div class="debug-info">
      <h3>🔍 デバッグ情報</h3>
      <div>タスク数: <span id="taskCount">0</span></div>
      <div>次のID: <span id="nextId">1</span></div>
      <div style="margin-top: 10px;">
        <strong>localStorage内容:</strong>
        <pre id="storageContent">（データなし）</pre>
      </div>
      <button class="btn-clear" onclick="clearAllData()">すべてクリア</button>
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

    function saveTasks() {
      let data = {
        tasks: tasks,
        taskIdCounter: taskIdCounter
      };
      let jsonString = JSON.stringify(data);
      localStorage.setItem('todoApp', jsonString);
      updateDebugInfo();
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

      if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-message">タスクがありません</div>';
        updateDebugInfo();
        return;
      }

      let html = "";
      for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

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
      updateDebugInfo();
    }

    function updateDebugInfo() {
      document.getElementById('taskCount').textContent = tasks.length;
      document.getElementById('nextId').textContent = taskIdCounter;

      let jsonString = localStorage.getItem('todoApp');
      if (jsonString === null) {
        document.getElementById('storageContent').textContent = '（データなし）';
      } else {
        let data = JSON.parse(jsonString);
        document.getElementById('storageContent').textContent = JSON.stringify(data, null, 2);
      }
    }

    function clearAllData() {
      if (confirm('すべてのデータを削除しますか？')) {
        tasks = [];
        taskIdCounter = 1;
        localStorage.removeItem('todoApp');
        displayTasks();
      }
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

**このアプリの特徴：**
- localStorage内容をリアルタイム表示
- タスク数と次のIDを表示
- JSON文字列を整形して表示
- すべてクリアボタン付き

---

## 11. 実践例3：データのエクスポート・インポート機能

データをファイルに保存したり、読み込んだりできる機能を追加します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>エクスポート・インポート機能付きTODOアプリ</title>
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

    .actions {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      flex-wrap: wrap;
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

    .btn-secondary {
      background: #6c757d;
      color: white;
      padding: 8px 16px;
      font-size: 14px;
    }

    .btn-secondary:hover {
      background: #5a6268;
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

    #fileInput {
      display: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>TODOリスト</h1>

    <div class="actions">
      <button class="btn-secondary" onclick="exportData()">📥 エクスポート</button>
      <button class="btn-secondary" onclick="document.getElementById('fileInput').click()">📤 インポート</button>
      <button class="btn-secondary" onclick="clearAllData()">🗑️ すべてクリア</button>
    </div>

    <input type="file" id="fileInput" accept=".json" onchange="importData(event)">

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="新しいタスクを入力...">
      <button class="btn-add" onclick="handleAdd()">追加</button>
    </div>

    <div id="taskList"></div>
  </div>

  <script>
    let tasks = [];
    let taskIdCounter = 1;

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

    function exportData() {
      let data = {
        tasks: tasks,
        taskIdCounter: taskIdCounter
      };
      let jsonString = JSON.stringify(data, null, 2);
      let blob = new Blob([jsonString], { type: 'application/json' });
      let url = URL.createObjectURL(blob);

      let a = document.createElement('a');
      a.href = url;
      a.download = 'todo-backup.json';
      a.click();

      URL.revokeObjectURL(url);
      alert('データをエクスポートしました！');
    }

    function importData(event) {
      let file = event.target.files[0];
      if (!file) return;

      let reader = new FileReader();
      reader.onload = function(e) {
        try {
          let data = JSON.parse(e.target.result);
          tasks = data.tasks || [];
          taskIdCounter = data.taskIdCounter || 1;
          saveTasks();
          displayTasks();
          alert('データをインポートしました！');
        } catch (error) {
          alert('ファイルの読み込みに失敗しました。');
          console.error(error);
        }
      };
      reader.readAsText(file);
    }

    function clearAllData() {
      if (confirm('すべてのデータを削除しますか？')) {
        tasks = [];
        taskIdCounter = 1;
        localStorage.removeItem('todoApp');
        displayTasks();
      }
    }

    function displayTasks() {
      let taskList = document.getElementById('taskList');

      if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-message">タスクがありません</div>';
        return;
      }

      let html = "";
      for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

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

**エクスポート・インポートの仕組み：**

```javascript
// エクスポート
function exportData() {
  let jsonString = JSON.stringify(data, null, 2);  // 整形
  let blob = new Blob([jsonString], { type: 'application/json' });
  let url = URL.createObjectURL(blob);  // ダウンロード用URL
  // ファイルとしてダウンロード
}

// インポート
function importData(event) {
  let file = event.target.files[0];  // 選択されたファイル
  let reader = new FileReader();
  reader.onload = function(e) {
    let data = JSON.parse(e.target.result);  // JSONをパース
    // データを復元
  };
  reader.readAsText(file);
}
```

---

## 12. よくある問題と解決策

### 問題1：データが保存されない

**原因：saveTasks()を呼び忘れ**
```javascript
// 悪い例
function addTask(text) {
  tasks.push({ id: 1, text: text, done: false });
  // saveTasks()を呼んでいない
}

// 良い例
function addTask(text) {
  tasks.push({ id: 1, text: text, done: false });
  saveTasks();  // 必ず呼ぶ
}
```

### 問題2：ページを開くたびに空になる

**原因：loadTasks()を呼び忘れ**
```javascript
// 悪い例
displayTasks();  // loadTasks()を呼んでいない

// 良い例
loadTasks();     // 先に読み込む
displayTasks();  // その後表示
```

### 問題3：古いIDが再利用される

**原因：taskIdCounterを保存していない**
```javascript
// 悪い例
let data = {
  tasks: tasks
  // taskIdCounterがない！
};

// 良い例
let data = {
  tasks: tasks,
  taskIdCounter: taskIdCounter  // 必ず保存
};
```

### 問題4：JSONパースエラー

**原因：エラー処理がない**
```javascript
// 悪い例
let data = JSON.parse(jsonString);  // エラーで止まる

// 良い例
try {
  let data = JSON.parse(jsonString);
} catch (error) {
  console.error('エラー:', error);
  // 初期状態で続行
}
```

---

## 13. まとめ

### このレッスンで学んだこと

**1. localStorage**
- ブラウザにデータを永続的に保存
- `setItem(key, value)` - 保存
- `getItem(key)` - 取得
- `removeItem(key)` - 削除
- `clear()` - 全削除

**2. JSON.stringify()**
- オブジェクト・配列を文字列に変換
- localStorageに保存できるようにする
- `JSON.stringify(data, null, 2)` で整形

**3. JSON.parse()**
- JSON文字列をオブジェクトに復元
- localStorageから取得したデータを使えるようにする
- エラー処理（try-catch）が重要

**4. データ永続化の流れ**
```
データ変更
  ↓
saveTasks()
  ↓
JSON.stringify()
  ↓
localStorage.setItem()
  ↓
ブラウザに保存

ページ読み込み
  ↓
loadTasks()
  ↓
localStorage.getItem()
  ↓
JSON.parse()
  ↓
データ復元
```

**5. エラー処理**
- `try-catch`構文でエラーをキャッチ
- データがない場合の処理
- デフォルト値の設定（`||`演算子）

### 重要な概念

**データの流れ：**
```
メモリ（変数）
    ↓ saveTasks()
localStorage（永続化）
    ↓ ページを閉じても残る
localStorage
    ↓ loadTasks()
メモリ（変数）
```

**JSONの役割：**
```
オブジェクト → JSON文字列 → localStorage
localStorage → JSON文字列 → オブジェクト
```

---

## 14. カリキュラム要件チェック

レッスン150の要件を確認します：

✅ **localStorageで保存**
- `localStorage.setItem('todoApp', jsonString)` でデータを保存
- `saveTasks()` 関数で自動保存を実装
- すべてのデータ変更時に保存

✅ **JSON.stringifyでデータを変換**
- `JSON.stringify(data)` で配列・オブジェクトを文字列に変換
- tasksとtaskIdCounterをまとめて変換
- 整形オプション（`null, 2`）も説明

✅ **JSON.parseで復元**
- `JSON.parse(jsonString)` で文字列をオブジェクトに復元
- try-catch構文でエラー処理
- デフォルト値の設定（`||`演算子）

✅ **ページを再読み込みしてもデータが残る**
- `loadTasks()` 関数で起動時にデータを読み込み
- ページを閉じても消えない
- 3つの実践例で動作確認

**すべての要件を満たしています！**

---

## 15. 次のレッスンの予告

次のレッスンでは、**フィルター機能**を追加します！

### 学ぶこと
- すべて表示
- 未完了のみ表示
- 完了のみ表示
- ボタンで切り替え

### できるようになること
```
現在:
すべてのタスクが表示される

次回:
┌──────────────────┐
│ [すべて] │
│ [未完了] │
│ [完了]   │
└──────────────────┘
↓ ボタンで切り替え

未完了のタスクだけ表示
完了したタスクだけ表示
```

**TODOアプリがさらに便利になります！**

---

Date: 2025-11-26
