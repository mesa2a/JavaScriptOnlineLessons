# レッスン156：TODOアプリ（カウンター編）

**日付**: 2025-11-26
**所要時間**: 30分

## このレッスンで学ぶこと

今回は、TODOアプリに統計機能を追加します。タスクの数を集計して表示することで、タスクの進捗状況を一目で把握できるようにします。

### 学習目標

- 全タスク数を表示する
- 未完了タスク数を表示する
- 完了タスク数を表示する
- タスクの変更時に統計情報を自動更新する

## 日常生活の例で理解する

統計情報は、日常生活のあらゆる場面で使われています。

### メールアプリの未読件数

メールアプリを開くと、未読メールの数が表示されます。

```
受信トレイ
未読: 15件
既読: 234件
全体: 249件

→ 15件のメールを読む必要があることが分かる
→ 今日は249件中234件を処理したことが分かる
```

未読数を見れば、どれだけのメールが残っているかがすぐに分かります。

### SNSの通知バッジ

スマートフォンのSNSアプリには、通知の数が表示されます。

```
Instagram
通知: 8件

Facebook
通知: 3件

Twitter
通知: 12件

→ 合計23件の未読通知がある
→ Twitterに一番多くの通知がある
```

数字を見るだけで、どのアプリを先にチェックすべきか判断できます。

### プロジェクト管理ツール

Trelloやasanaなどのプロジェクト管理ツールでは、タスクの統計が表示されます。

```
プロジェクトAの進捗:
全タスク: 50個
完了: 35個
未完了: 15個
進捗率: 70%

→ プロジェクトの70%が完了している
→ あと15個のタスクを完了すればプロジェクト終了
→ 順調に進んでいることが分かる
```

数字で進捗を把握することで、プロジェクトの状況が明確になります。

## カウント処理とは

### なぜ統計情報が必要なのか

タスクが増えてくると、全体の進捗状況を把握することが重要になります。

```
統計情報がない場合:
[✓] 牛乳を買う
[  ] 掃除する
[✓] 資料を作る
[  ] メールを送る
[✓] 本を読む
...（50個のタスクが続く）

→ 全部で何個のタスクがあるか分からない
→ 何個完了したか数えるのが面倒
→ どれくらい進んでいるか把握できない

統計情報がある場合:
全タスク: 50個
完了: 30個
未完了: 20個

→ 一目で進捗が分かる
→ あと20個で終わることが分かる
→ 60%完了していることが分かる
```

統計情報により、状況を素早く把握できます。

### 配列の長さを取得する

JavaScriptの配列には、`length`プロパティがあります。

```javascript
const tasks = [
  { text: '牛乳を買う', done: false },
  { text: '掃除する', done: true },
  { text: '資料を作る', done: false }
];

// 配列の要素数を取得
const totalCount = tasks.length;
console.log(totalCount); // 3
```

**実行の流れ**:

```
tasks = [
  { text: '牛乳を買う', done: false },  ← 1個目
  { text: '掃除する', done: true },    ← 2個目
  { text: '資料を作る', done: false }   ← 3個目
]

tasks.length を実行
↓
配列の要素数を数える
↓
結果: 3
```

全タスク数は、単純に`tasks.length`で取得できます。

### 条件に一致する要素の数を数える

未完了や完了のタスク数を数えるには、`filter()`メソッドを使います。

```javascript
const tasks = [
  { text: '牛乳を買う', done: false },
  { text: '掃除する', done: true },
  { text: '資料を作る', done: false }
];

// 未完了タスクの数
const incompleteCount = tasks.filter(function(task) {
  return task.done === false;
}).length;

console.log(incompleteCount); // 2

// 完了タスクの数
const completedCount = tasks.filter(function(task) {
  return task.done === true;
}).length;

console.log(completedCount); // 1
```

**実行の流れ（未完了タスクのカウント）**:

```
ステップ1: filter()で未完了タスクを抽出

tasks.filter(function(task) {
  return task.done === false;
})

1個目: { text: '牛乳を買う', done: false }
  → done === false → true → 含める

2個目: { text: '掃除する', done: true }
  → done === false → false → 除外

3個目: { text: '資料を作る', done: false }
  → done === false → true → 含める

フィルター結果: [
  { text: '牛乳を買う', done: false },
  { text: '資料を作る', done: false }
]

ステップ2: lengthで要素数を取得

フィルター結果.length
↓
2
```

**実行の流れ（完了タスクのカウント）**:

```
ステップ1: filter()で完了タスクを抽出

tasks.filter(function(task) {
  return task.done === true;
})

1個目: { text: '牛乳を買う', done: false }
  → done === true → false → 除外

2個目: { text: '掃除する', done: true }
  → done === true → true → 含める

3個目: { text: '資料を作る', done: false }
  → done === true → false → 除外

フィルター結果: [
  { text: '掃除する', done: true }
]

ステップ2: lengthで要素数を取得

フィルター結果.length
↓
1
```

### ASCII図で理解する

```
カウント処理の流れ:

元の配列:
┌───────────────────────┐
│ { '牛乳', done: false }│
│ { '掃除', done: true } │
│ { '資料', done: false }│
└───────────────────────┘
         │
         │ tasks.length
         ↓
    全タスク数: 3
         │
    ┌────┴────┐
    │         │
    │ filter  │ filter
    │ done==false  done==true
    │         │
    ↓         ↓
┌─────┐   ┌─────┐
│牛乳 │   │掃除 │
│資料 │   └─────┘
└─────┘
  │          │
  │ length   │ length
  ↓          ↓
未完了: 2  完了: 1
```

## 統計情報の表示

### HTMLで統計表示エリアを作成

統計情報を表示するためのエリアをHTMLに追加します。

```html
<div id="stats-container">
  <div class="stat-item">
    <span class="stat-label">全タスク</span>
    <span id="total-count" class="stat-value">0</span>
  </div>
  <div class="stat-item">
    <span class="stat-label">未完了</span>
    <span id="incomplete-count" class="stat-value">0</span>
  </div>
  <div class="stat-item">
    <span class="stat-label">完了</span>
    <span id="completed-count" class="stat-value">0</span>
  </div>
</div>
```

**HTMLの構造**:

```
stats-container（統計コンテナ）
├─ stat-item（統計項目1）
│  ├─ stat-label: "全タスク"
│  └─ stat-value: "0" ← 全タスク数を表示
├─ stat-item（統計項目2）
│  ├─ stat-label: "未完了"
│  └─ stat-value: "0" ← 未完了タスク数を表示
└─ stat-item（統計項目3）
   ├─ stat-label: "完了"
   └─ stat-value: "0" ← 完了タスク数を表示
```

各統計情報を分かりやすく表示するために、ラベルと値を分けて配置します。

### CSSでスタイルを設定

統計情報を見やすくスタイルを設定します。

```css
#stats-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 8px;
}

.stat-item {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
```

**視覚的な表示**:

```
┌──────────────────────────────────────────┐
│                                          │
│   全タスク     未完了      完了         │
│      5          3          2            │
│                                          │
└──────────────────────────────────────────┘
     ↑          ↑           ↑
  大きい文字  大きい文字  大きい文字
```

統計情報を横並びに配置し、数字を大きく表示することで、一目で分かるようにします。

### 統計情報を更新する関数

統計情報を更新する関数を作成します。

```javascript
function updateStats() {
  // 1. 全タスク数を計算
  const totalCount = tasks.length;

  // 2. 未完了タスク数を計算
  const incompleteCount = tasks.filter(function(task) {
    return task.done === false;
  }).length;

  // 3. 完了タスク数を計算
  const completedCount = tasks.filter(function(task) {
    return task.done === true;
  }).length;

  // 4. 画面に反映
  document.getElementById('total-count').textContent = totalCount;
  document.getElementById('incomplete-count').textContent = incompleteCount;
  document.getElementById('completed-count').textContent = completedCount;
}
```

**実行の流れ**:

```
tasks = [
  { text: '牛乳を買う', done: false },
  { text: '掃除する', done: true },
  { text: '資料を作る', done: false },
  { text: 'メールを送る', done: true },
  { text: '本を読む', done: false }
]

updateStats()を実行
↓
ステップ1: 全タスク数を計算
totalCount = tasks.length
totalCount = 5

ステップ2: 未完了タスク数を計算
tasks.filter(function(task) {
  return task.done === false;
})
→ [牛乳を買う, 資料を作る, 本を読む]
incompleteCount = 3

ステップ3: 完了タスク数を計算
tasks.filter(function(task) {
  return task.done === true;
})
→ [掃除する, メールを送る]
completedCount = 2

ステップ4: 画面に反映
document.getElementById('total-count').textContent = 5
document.getElementById('incomplete-count').textContent = 3
document.getElementById('completed-count').textContent = 2

画面表示:
全タスク: 5
未完了: 3
完了: 2
```

この関数を、タスクが変更されるたびに呼び出します。

## 統計情報の自動更新

### いつ統計を更新するか

統計情報は、以下のタイミングで更新する必要があります。

```
1. タスクを追加したとき
   全タスク数が増える
   未完了タスク数が増える

2. タスクを削除したとき
   全タスク数が減る
   完了/未完了タスク数が減る

3. タスクの完了状態を変更したとき
   全タスク数は変わらない
   完了タスク数と未完了タスク数が変わる

4. ページを読み込んだとき
   初期表示として統計を表示する
```

### タスク追加時に更新

タスクを追加したときに、統計情報を更新します。

```javascript
function addTask() {
  const text = taskInput.value.trim();

  // バリデーション
  if (text === '') {
    showError('タスクを入力してください');
    return;
  }

  // タスクを追加
  tasks.push({
    text: text,
    done: false,
    category: categorySelect.value
  });

  taskInput.value = '';
  displayTasks();
  updateStats(); // 統計情報を更新
}
```

**実行の流れ**:

```
タスク追加前:
tasks = [
  { text: '牛乳を買う', done: false },
  { text: '掃除する', done: true }
]
統計: 全タスク: 2, 未完了: 1, 完了: 1

addTask()を実行
↓
新しいタスクを追加
tasks.push({ text: '資料を作る', done: false })
↓
tasks = [
  { text: '牛乳を買う', done: false },
  { text: '掃除する', done: true },
  { text: '資料を作る', done: false }
]
↓
updateStats()を呼び出し
↓
統計を再計算
全タスク: 3 (2→3に増加)
未完了: 2 (1→2に増加)
完了: 1 (変化なし)
↓
画面に反映
```

### タスク完了/未完了切り替え時に更新

タスクの完了状態を切り替えたときにも、統計情報を更新します。

```javascript
checkbox.addEventListener('change', function() {
  tasks[index].done = checkbox.checked;
  displayTasks();
  updateStats(); // 統計情報を更新
});
```

**実行の流れ（未完了→完了に変更）**:

```
変更前:
tasks[0] = { text: '牛乳を買う', done: false }
統計: 全タスク: 3, 未完了: 2, 完了: 1

チェックボックスをクリック
↓
checkbox.checked = true
tasks[0].done = true
↓
変更後:
tasks[0] = { text: '牛乳を買う', done: true }
↓
updateStats()を呼び出し
↓
統計を再計算
全タスク: 3 (変化なし)
未完了: 1 (2→1に減少)
完了: 2 (1→2に増加)
↓
画面に反映
```

**実行の流れ（完了→未完了に変更）**:

```
変更前:
tasks[1] = { text: '掃除する', done: true }
統計: 全タスク: 3, 未完了: 1, 完了: 2

チェックボックスをクリック（チェックを外す）
↓
checkbox.checked = false
tasks[1].done = false
↓
変更後:
tasks[1] = { text: '掃除する', done: false }
↓
updateStats()を呼び出し
↓
統計を再計算
全タスク: 3 (変化なし)
未完了: 2 (1→2に増加)
完了: 1 (2→1に減少)
↓
画面に反映
```

### ページ読み込み時に更新

ページを開いたときにも、統計情報を更新します。

```javascript
// ページ読み込み時にデータを復元
loadTasks();
displayTasks();
updateStats(); // 統計情報を更新
```

**実行の流れ**:

```
ページを開く
↓
loadTasks()を実行
localStorageからタスクを読み込む
tasks = [
  { text: '牛乳を買う', done: false },
  { text: '掃除する', done: true },
  { text: '資料を作る', done: false }
]
↓
displayTasks()を実行
タスク一覧を画面に表示
↓
updateStats()を実行
統計を計算して表示
全タスク: 3
未完了: 2
完了: 1
↓
画面に初期表示が完了
```

これにより、ページを開いた瞬間から正しい統計情報が表示されます。

## 実践例1: 基本的な統計機能

全タスク数、未完了タスク数、完了タスク数を表示するシンプルなTODOアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>TODOアプリ（基本統計）</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    #stats-container {
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
      padding: 15px;
      background-color: #f0f0f0;
      border-radius: 8px;
    }

    .stat-item {
      text-align: center;
    }

    .stat-label {
      display: block;
      font-size: 14px;
      color: #666;
      margin-bottom: 5px;
    }

    .stat-value {
      display: block;
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }

    #input-container {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    #task-input {
      flex: 1;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ccc;
      border-radius: 4px;
    }

    #add-btn {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    #task-list {
      list-style: none;
      padding: 0;
    }

    #task-list li {
      padding: 10px;
      margin-bottom: 5px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    #task-list li.completed {
      text-decoration: line-through;
      color: #999;
    }
  </style>
</head>
<body>
  <h1>TODOアプリ（基本統計）</h1>

  <div id="stats-container">
    <div class="stat-item">
      <span class="stat-label">全タスク</span>
      <span id="total-count" class="stat-value">0</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">未完了</span>
      <span id="incomplete-count" class="stat-value">0</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">完了</span>
      <span id="completed-count" class="stat-value">0</span>
    </div>
  </div>

  <div id="input-container">
    <input type="text" id="task-input" placeholder="新しいタスクを入力">
    <button id="add-btn">追加</button>
  </div>

  <ul id="task-list"></ul>

  <script>
    // タスクの配列
    let tasks = [];

    // DOM要素の取得
    const totalCountEl = document.getElementById('total-count');
    const incompleteCountEl = document.getElementById('incomplete-count');
    const completedCountEl = document.getElementById('completed-count');
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    // 統計情報を更新
    function updateStats() {
      // 全タスク数
      const totalCount = tasks.length;

      // 未完了タスク数
      const incompleteCount = tasks.filter(function(task) {
        return task.done === false;
      }).length;

      // 完了タスク数
      const completedCount = tasks.filter(function(task) {
        return task.done === true;
      }).length;

      // 画面に反映
      totalCountEl.textContent = totalCount;
      incompleteCountEl.textContent = incompleteCount;
      completedCountEl.textContent = completedCount;
    }

    // タスクを表示
    function displayTasks() {
      taskList.innerHTML = '';

      tasks.forEach(function(task, index) {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;

        checkbox.addEventListener('change', function() {
          tasks[index].done = checkbox.checked;
          displayTasks();
          updateStats(); // 統計情報を更新
        });

        const span = document.createElement('span');
        span.textContent = task.text;

        if (task.done) {
          li.classList.add('completed');
        }

        li.appendChild(checkbox);
        li.appendChild(span);
        taskList.appendChild(li);
      });
    }

    // タスクを追加
    function addTask() {
      const text = taskInput.value.trim();

      if (text === '') {
        alert('タスクを入力してください');
        return;
      }

      tasks.push({
        text: text,
        done: false
      });

      taskInput.value = '';
      displayTasks();
      updateStats(); // 統計情報を更新
    }

    // 追加ボタンのイベント
    addBtn.addEventListener('click', addTask);

    // Enterキーで追加
    taskInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addTask();
      }
    });

    // 初期表示
    displayTasks();
    updateStats();
  </script>
</body>
</html>
```

### コードの詳しい解説

**1. 統計情報の計算**

```javascript
function updateStats() {
  const totalCount = tasks.length;

  const incompleteCount = tasks.filter(function(task) {
    return task.done === false;
  }).length;

  const completedCount = tasks.filter(function(task) {
    return task.done === true;
  }).length;

  totalCountEl.textContent = totalCount;
  incompleteCountEl.textContent = incompleteCount;
  completedCountEl.textContent = completedCount;
}
```

`filter()`メソッドで条件に一致するタスクを抽出し、その`length`を取得することで数を数えています。

**2. タスク追加時の統計更新**

```javascript
function addTask() {
  // ... タスクを追加

  displayTasks();
  updateStats(); // タスク追加後に統計を更新
}
```

タスクを追加した後に`updateStats()`を呼び出すことで、常に最新の統計情報が表示されます。

**3. 完了状態変更時の統計更新**

```javascript
checkbox.addEventListener('change', function() {
  tasks[index].done = checkbox.checked;
  displayTasks();
  updateStats(); // 完了状態変更後に統計を更新
});
```

完了状態が変わると、未完了数と完了数が変化するため、統計を更新する必要があります。

## 実践例2: 進捗率表示付きTODOアプリ

統計情報に加えて、進捗率をパーセンテージとプログレスバーで表示します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>TODOアプリ（進捗率表示）</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    #progress-section {
      margin-bottom: 20px;
      padding: 15px;
      background-color: #f9f9f9;
      border-radius: 8px;
    }

    #progress-text {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }

    #progress-bar-container {
      width: 100%;
      height: 30px;
      background-color: #e0e0e0;
      border-radius: 15px;
      overflow: hidden;
    }

    #progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #4ecdc4 0%, #44a08d 100%);
      transition: width 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 14px;
    }

    #stats-container {
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
      padding: 15px;
      background-color: #f0f0f0;
      border-radius: 8px;
    }

    .stat-item {
      text-align: center;
    }

    .stat-label {
      display: block;
      font-size: 14px;
      color: #666;
      margin-bottom: 5px;
    }

    .stat-value {
      display: block;
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }

    #input-container {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    #task-input {
      flex: 1;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ccc;
      border-radius: 4px;
    }

    #add-btn {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    #task-list {
      list-style: none;
      padding: 0;
    }

    #task-list li {
      padding: 10px;
      margin-bottom: 5px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    #task-list li.completed {
      text-decoration: line-through;
      color: #999;
    }

    .delete-btn {
      margin-left: auto;
      padding: 5px 10px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>TODOアプリ（進捗率表示）</h1>

  <div id="progress-section">
    <div id="progress-text">進捗率: <span id="progress-percentage">0%</span></div>
    <div id="progress-bar-container">
      <div id="progress-bar" style="width: 0%;"></div>
    </div>
  </div>

  <div id="stats-container">
    <div class="stat-item">
      <span class="stat-label">全タスク</span>
      <span id="total-count" class="stat-value">0</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">未完了</span>
      <span id="incomplete-count" class="stat-value">0</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">完了</span>
      <span id="completed-count" class="stat-value">0</span>
    </div>
  </div>

  <div id="input-container">
    <input type="text" id="task-input" placeholder="新しいタスクを入力">
    <button id="add-btn">追加</button>
  </div>

  <ul id="task-list"></ul>

  <script>
    // タスクの配列
    let tasks = [];

    // DOM要素の取得
    const totalCountEl = document.getElementById('total-count');
    const incompleteCountEl = document.getElementById('incomplete-count');
    const completedCountEl = document.getElementById('completed-count');
    const progressPercentageEl = document.getElementById('progress-percentage');
    const progressBarEl = document.getElementById('progress-bar');
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    // 統計情報を更新
    function updateStats() {
      // 全タスク数
      const totalCount = tasks.length;

      // 未完了タスク数
      const incompleteCount = tasks.filter(function(task) {
        return task.done === false;
      }).length;

      // 完了タスク数
      const completedCount = tasks.filter(function(task) {
        return task.done === true;
      }).length;

      // 進捗率を計算（0で割らないように注意）
      let progressPercentage = 0;
      if (totalCount > 0) {
        progressPercentage = Math.round((completedCount / totalCount) * 100);
      }

      // 画面に反映
      totalCountEl.textContent = totalCount;
      incompleteCountEl.textContent = incompleteCount;
      completedCountEl.textContent = completedCount;
      progressPercentageEl.textContent = progressPercentage + '%';
      progressBarEl.style.width = progressPercentage + '%';
      progressBarEl.textContent = progressPercentage + '%';
    }

    // タスクを表示
    function displayTasks() {
      taskList.innerHTML = '';

      tasks.forEach(function(task, index) {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;

        checkbox.addEventListener('change', function() {
          tasks[index].done = checkbox.checked;
          displayTasks();
          updateStats();
        });

        const span = document.createElement('span');
        span.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.className = 'delete-btn';

        deleteBtn.addEventListener('click', function() {
          tasks.splice(index, 1);
          displayTasks();
          updateStats();
        });

        if (task.done) {
          li.classList.add('completed');
        }

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    }

    // タスクを追加
    function addTask() {
      const text = taskInput.value.trim();

      if (text === '') {
        alert('タスクを入力してください');
        return;
      }

      tasks.push({
        text: text,
        done: false
      });

      taskInput.value = '';
      displayTasks();
      updateStats();
    }

    // 追加ボタンのイベント
    addBtn.addEventListener('click', addTask);

    // Enterキーで追加
    taskInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addTask();
      }
    });

    // 初期表示
    displayTasks();
    updateStats();
  </script>
</body>
</html>
```

### このアプリの特徴

**1. 進捗率の計算**

```javascript
let progressPercentage = 0;
if (totalCount > 0) {
  progressPercentage = Math.round((completedCount / totalCount) * 100);
}
```

0で割らないように注意しながら、完了率をパーセンテージで計算しています。

**実行の流れ**:

```
例: 全タスク5個、完了2個の場合

completedCount = 2
totalCount = 5

progressPercentage = (2 / 5) * 100
                   = 0.4 * 100
                   = 40

Math.round(40) = 40

結果: 40%
```

**2. プログレスバーの表示**

```javascript
progressBarEl.style.width = progressPercentage + '%';
progressBarEl.textContent = progressPercentage + '%';
```

プログレスバーの幅を変更することで、視覚的に進捗を表現できます。

**3. 削除機能と統計更新**

```javascript
deleteBtn.addEventListener('click', function() {
  tasks.splice(index, 1);  // タスクを削除
  displayTasks();
  updateStats();  // 削除後に統計を更新
});
```

タスクを削除したときにも統計を更新することで、常に正確な情報を表示します。

## よくある問題と解決策

### 問題1: 統計が更新されない

```javascript
// 問題のあるコード
function addTask() {
  tasks.push({
    text: taskInput.value.trim(),
    done: false
  });

  displayTasks();
  // updateStats()を呼び出していない
}
```

**解決策**: タスク変更後に必ずupdateStats()を呼び出す

```javascript
// 正しいコード
function addTask() {
  tasks.push({
    text: taskInput.value.trim(),
    done: false
  });

  displayTasks();
  updateStats(); // 統計を更新
}
```

### 問題2: filter()を何度も呼び出して非効率

```javascript
// 問題のあるコード
function updateStats() {
  // 未完了数を計算
  const incompleteCount = tasks.filter(function(task) {
    return task.done === false;
  }).length;

  // 完了数を計算
  const completedCount = tasks.filter(function(task) {
    return task.done === true;
  }).length;

  // filter()を2回実行している（非効率）
}
```

**解決策**: 1回のループで複数の統計を計算

```javascript
// 正しいコード（効率的）
function updateStats() {
  let totalCount = 0;
  let incompleteCount = 0;
  let completedCount = 0;

  tasks.forEach(function(task) {
    totalCount++;
    if (task.done) {
      completedCount++;
    } else {
      incompleteCount++;
    }
  });

  totalCountEl.textContent = totalCount;
  incompleteCountEl.textContent = incompleteCount;
  completedCountEl.textContent = completedCount;
}
```

または、reduce()を使う方法:

```javascript
// reduce()を使った効率的な計算
function updateStats() {
  const stats = tasks.reduce(function(acc, task) {
    acc.total++;
    if (task.done) {
      acc.completed++;
    } else {
      acc.incomplete++;
    }
    return acc;
  }, { total: 0, completed: 0, incomplete: 0 });

  totalCountEl.textContent = stats.total;
  incompleteCountEl.textContent = stats.incomplete;
  completedCountEl.textContent = stats.completed;
}
```

### 問題3: 進捗率の計算で0で割ってしまう

```javascript
// 問題のあるコード
function updateStats() {
  const totalCount = tasks.length;
  const completedCount = tasks.filter(function(task) {
    return task.done === true;
  }).length;

  // totalCountが0の場合、0で割ることになる
  const progressPercentage = (completedCount / totalCount) * 100;
  // NaN（Not a Number）になる
}
```

**解決策**: 0で割らないようにチェックする

```javascript
// 正しいコード
function updateStats() {
  const totalCount = tasks.length;
  const completedCount = tasks.filter(function(task) {
    return task.done === true;
  }).length;

  let progressPercentage = 0;
  if (totalCount > 0) {
    progressPercentage = Math.round((completedCount / totalCount) * 100);
  }

  progressPercentageEl.textContent = progressPercentage + '%';
}
```

### 問題4: 初期表示で統計が0のまま

```javascript
// 問題のあるコード
// ページ読み込み時
loadTasks();
displayTasks();
// updateStats()を呼び出していない

// タスクがあっても統計が0のまま
```

**解決策**: ページ読み込み時にupdateStats()を呼び出す

```javascript
// 正しいコード
// ページ読み込み時
loadTasks();
displayTasks();
updateStats(); // 初期表示で統計を更新
```

### 問題5: 小数点が表示されて見づらい

```javascript
// 問題のあるコード
const progressPercentage = (completedCount / totalCount) * 100;
progressPercentageEl.textContent = progressPercentage + '%';

// 例: 66.66666666666667% と表示される
```

**解決策**: Math.round()で四捨五入する

```javascript
// 正しいコード
const progressPercentage = Math.round((completedCount / totalCount) * 100);
progressPercentageEl.textContent = progressPercentage + '%';

// 例: 67% と表示される（見やすい）
```

## 練習問題

### 課題

統計機能付きTODOアプリを作成してください。全タスク数、未完了タスク数、完了タスク数を表示し、タスクの変更時に自動的に統計情報を更新します。

### 保存場所

`exercises/lesson-156/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 仕様

以下の機能を実装してください。

1. **全タスク数を表示**
   - tasks.lengthで全タスク数を取得
   - 画面に表示する要素を用意

2. **未完了タスク数を表示**
   - filter()でdone === falseのタスクを抽出
   - その配列のlengthを取得して表示

3. **完了タスク数を表示**
   - filter()でdone === trueのタスクを抽出
   - その配列のlengthを取得して表示

4. **統計情報の更新**
   - updateStats()関数を作成
   - タスク追加、削除、完了状態変更時に呼び出す
   - ページ読み込み時にも呼び出す

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-156
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**統計情報の表示エリア**

- HTMLに統計情報を表示するための要素を追加します
- 全タスク数、未完了タスク数、完了タスク数のそれぞれに`id`を設定します
- CSSで見やすくスタイルを設定します

**統計情報の計算**

- 全タスク数は`tasks.length`で取得します
- 未完了タスク数は`filter()`で`done === false`のタスクを抽出し、その`length`を取得します
- 完了タスク数は`filter()`で`done === true`のタスクを抽出し、その`length`を取得します

**統計情報の更新**

- `updateStats()`関数を作成して、統計情報を計算して画面に反映します
- タスクを追加、削除、完了状態を変更したときに`updateStats()`を呼び出します
- ページ読み込み時にも`updateStats()`を呼び出して、初期表示を行います

**効率的な実装**

- 統計情報の更新は、`displayTasks()`の後で行うと、常に最新の状態が保たれます
- すべてのタスク変更処理で`updateStats()`を呼び出すことを忘れないようにします

## まとめ

お疲れ様でした。今回は、TODOアプリに統計機能を追加しました。タスクの数を集計して表示することで、進捗状況を一目で把握できるようになりました。

### 今回学んだキーポイント

- **カウント処理**: 配列の`length`プロパティで要素数を取得できます。全タスク数を表示する基本的な方法です

- **条件に一致する要素の数を数える**: `filter()`メソッドで条件に一致する要素を抽出し、その配列の`length`を取得することで、未完了タスク数や完了タスク数を数えることができます

- **統計情報の自動更新**: タスクが変更されるたびに`updateStats()`関数を呼び出すことで、常に最新の統計情報を表示できます。タスク追加、削除、完了状態変更、ページ読み込み時など、すべてのタイミングで更新が必要です

- **視覚的な表現**: 数字を大きく表示したり、プログレスバーを使ったりすることで、統計情報を視覚的に分かりやすく表現できます。ユーザーは一目で進捗を把握できます

- **効率的な実装**: `reduce()`メソッドや`forEach()`を使うことで、1回のループで複数の統計を同時に計算できます。`filter()`を何度も呼び出すよりも効率的です

### カリキュラムの達成状況

✅ 全タスク数を表示
✅ 未完了タスク数を表示
✅ 完了タスク数を表示
✅ 統計情報の更新

統計機能は、多くのアプリケーションで使われています。ダッシュボード、分析ツール、プロジェクト管理ツールなど、データを集計して可視化することは、ユーザーにとって非常に価値があります。

タスクの進捗を数値で把握することで、モチベーションの向上やタスク管理の効率化につながります。

## 次のレッスンの予告

次回は、TODOアプリの完成編です。これまでに実装したすべての機能を統合し、削除機能などの最終的な機能を追加して、完全なTODOアプリを完成させます。お楽しみに。
