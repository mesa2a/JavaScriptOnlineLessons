---
title: "Lesson 153: TODOアプリ（検索編）"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# Lesson 153: TODOアプリ（検索編）

## 日常生活の例：図書館の本の検索

図書館で本を探すとき、書架をすべて見て回るのは大変です。そこで、検索システムを使います。

- **キーワード検索**: 「JavaScript」と入力すると、タイトルや著者名に「JavaScript」を含む本がすべて表示される
- **部分一致**: 「Java」と入力すると、「JavaScript」も「Java入門」も見つかる
- **絞り込み**: 検索結果から、さらに出版年や著者で絞り込める

TODOアプリでも同じです。タスクが増えてきたら、キーワードで検索できると便利です。「会議」と入力すれば、会議関連のタスクがすぐに見つかります。

今回は、TODOアプリに検索機能を追加して、大量のタスクの中から目的のものを素早く見つけられるようにします。

## カリキュラム仕様

今回のレッスンでは、以下の機能を実装します：

✅ **キーワードで検索**: 入力したキーワードでタスクを検索する
✅ **部分一致検索**: タスクのテキストに含まれるキーワードを検索する
✅ **検索結果を表示**: 検索条件に一致するタスクだけを表示する
✅ **検索のクリア**: 検索をクリアしてすべてのタスクを表示する

## キーワードで検索する仕組み

### 文字列検索の基本 - includes() メソッド

JavaScriptの文字列には、**特定の文字列が含まれているかを判定する `includes()` メソッド**があります。

```javascript
let text = '会議の資料を準備する';
let keyword = '会議';

let result = text.includes(keyword);
console.log(result);  // true

let keyword2 = '買い物';
let result2 = text.includes(keyword2);
console.log(result2);  // false
```

### includes() メソッドの動作

```
【includes() の仕組み】

文字列: '会議の資料を準備する'
キーワード: '会議'

---------------------------------------------------
includes() が実行される
---------------------------------------------------

文字列の先頭から順番に、キーワードと一致する部分を探す:

  位置0: '会議の資料を準備する'
         ^^
         '会' '議' が '会議' と一致！
         → true を返す

---------------------------------------------------
別の例: キーワード = '買い物'
---------------------------------------------------

文字列: '会議の資料を準備する'
キーワード: '買い物'

  位置0: '会議' ≠ '買い物'
  位置1: '議の' ≠ '買い物'
  位置2: 'の資' ≠ '買い物'
  ...
  最後まで一致する部分が見つからない
  → false を返す
```

### 検索キーワードの取得と処理

検索ボックスから入力されたキーワードを取得して処理します。

```javascript
function getSearchKeyword() {
  let input = document.getElementById('searchInput');
  let keyword = input.value.trim();  // 前後の空白を削除
  return keyword.toLowerCase();      // 小文字に変換
}
```

### キーワード処理の流れ

```
【検索キーワードの処理】

ユーザーが入力した値: "  会議  "

---------------------------------------------------
ステップ1: trim() で前後の空白を削除
---------------------------------------------------
"  会議  " → "会議"

前後の空白が削除される:
- 左側のスペース2個が削除
- 右側のスペース2個が削除
- 結果: "会議"

---------------------------------------------------
ステップ2: toLowerCase() で小文字に変換
---------------------------------------------------
"会議" → "会議"

この例では日本語なので変化なし。
英語の場合:
"MEETING" → "meeting"
"Meeting" → "meeting"

---------------------------------------------------
結果:
---------------------------------------------------
検索キーワード = "会議"

このキーワードを使ってタスクを検索する
```

## 部分一致検索の仕組み

### 大文字小文字を区別しない検索

英語の検索では、大文字と小文字の違いを無視したい場合があります。

```javascript
let text = 'JavaScript学習';
let keyword = 'javascript';

// そのまま比較すると一致しない
console.log(text.includes(keyword));  // false

// 両方を小文字に変換してから比較
console.log(text.toLowerCase().includes(keyword.toLowerCase()));  // true
```

### 大文字小文字を区別しない検索の流れ

```
【大文字小文字を区別しない検索】

タスクのテキスト: "JavaScript学習"
検索キーワード: "javascript"

---------------------------------------------------
方法1: そのまま比較 (❌ 失敗)
---------------------------------------------------
"JavaScript学習".includes("javascript")

  'J' ≠ 'j' → 一致しない
  → false

---------------------------------------------------
方法2: 両方を小文字に変換してから比較 (✅ 成功)
---------------------------------------------------
ステップ1: タスクのテキストを小文字に変換
  "JavaScript学習" → "javascript学習"

ステップ2: 検索キーワードを小文字に変換
  "javascript" → "javascript"

ステップ3: 比較
  "javascript学習".includes("javascript")

  位置0: 'javascript' が一致！
  → true

---------------------------------------------------
結果:
---------------------------------------------------
大文字で "JavaScript" と書いても
小文字で "javascript" と検索しても
両方見つかる
```

### 配列のフィルターと組み合わせる

`filter()` メソッドと `includes()` メソッドを組み合わせて、検索機能を実装します。

```javascript
function searchTasks(keyword) {
  return tasks.filter(function(task) {
    return task.text.toLowerCase().includes(keyword.toLowerCase());
  });
}
```

### 検索フィルターの実行フロー

```
【配列フィルターによる検索】

初期状態のタスク配列:
tasks = [
  {id: 1, text: '会議の資料を準備する', done: false},
  {id: 2, text: '牛乳を買う', done: false},
  {id: 3, text: '会議に参加する', done: true},
  {id: 4, text: 'レポート作成', done: false}
]

検索キーワード: "会議"

---------------------------------------------------
filter() メソッドが各タスクをチェック
---------------------------------------------------

タスク1を確認:
  text = '会議の資料を準備する'
  text.includes('会議') → true
  → このタスクを含める ✓

タスク2を確認:
  text = '牛乳を買う'
  text.includes('会議') → false
  → このタスクを除外 ✗

タスク3を確認:
  text = '会議に参加する'
  text.includes('会議') → true
  → このタスクを含める ✓

タスク4を確認:
  text = 'レポート作成'
  text.includes('会議') → false
  → このタスクを除外 ✗

---------------------------------------------------
結果:
---------------------------------------------------
検索結果 = [
  {id: 1, text: '会議の資料を準備する', done: false},
  {id: 3, text: '会議に参加する', done: true}
]

→ "会議" を含む2件のタスクだけが返される
```

## 検索結果を表示する仕組み

### リアルタイム検索の実装

ユーザーが文字を入力するたびに、**リアルタイムで検索結果を表示**します。これには `input` イベントを使います。

```javascript
let searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function() {
  displayTasks();  // 入力のたびにタスクを再表示
});
```

### input イベントの動作

```
【input イベントの発火タイミング】

検索ボックスの初期状態: ""

---------------------------------------------------
ユーザーが '会' を入力
---------------------------------------------------
検索ボックスの値: "会"
  ↓
input イベントが発火
  ↓
displayTasks() が呼ばれる
  ↓
"会" を含むタスクが表示される

---------------------------------------------------
ユーザーが '議' を追加入力
---------------------------------------------------
検索ボックスの値: "会議"
  ↓
input イベントが発火
  ↓
displayTasks() が呼ばれる
  ↓
"会議" を含むタスクが表示される

---------------------------------------------------
ユーザーが Backspace を押して '議' を削除
---------------------------------------------------
検索ボックスの値: "会"
  ↓
input イベントが発火
  ↓
displayTasks() が呼ばれる
  ↓
"会" を含むタスクが表示される

---------------------------------------------------
特徴:
---------------------------------------------------
- 文字を入力するたびに発火
- 文字を削除するたびに発火
- ペーストした場合も発火
→ リアルタイムで検索結果が更新される
```

### 検索フィルターの統合

既存のフィルター（カテゴリ、完了状態）に検索機能を追加します。

```javascript
function getFilteredTasks() {
  let filtered = tasks;

  // ステップ1: 検索キーワードでフィルター
  let keyword = getSearchKeyword();
  if (keyword !== '') {
    filtered = filtered.filter(function(task) {
      return task.text.toLowerCase().includes(keyword);
    });
  }

  // ステップ2: カテゴリでフィルター
  if (currentCategory !== 'すべて') {
    filtered = filtered.filter(function(task) {
      return task.category === currentCategory;
    });
  }

  // ステップ3: 完了状態でフィルター
  if (currentFilter === 'active') {
    filtered = filtered.filter(function(task) {
      return task.done === false;
    });
  } else if (currentFilter === 'completed') {
    filtered = filtered.filter(function(task) {
      return task.done === true;
    });
  }

  return filtered;
}
```

### 複合フィルターの実行フロー

```
【検索 + カテゴリ + 完了状態の複合フィルター】

初期状態:
tasks = [
  {id: 1, text: '会議の資料を準備する', done: false, category: '仕事'},
  {id: 2, text: '牛乳を買う', done: false, category: '買い物'},
  {id: 3, text: '会議に参加する', done: true, category: '仕事'},
  {id: 4, text: '仕事のメールを送る', done: false, category: '仕事'}
]

検索キーワード: "会議"
カテゴリ: "仕事"
完了状態: "active" (未完了)

---------------------------------------------------
ステップ1: 検索キーワードでフィルター
---------------------------------------------------
keyword = "会議"

filtered.filter(task => task.text.includes("会議"))

  タスク1: '会議の資料を準備する' → 含む ✓
  タスク2: '牛乳を買う' → 含まない ✗
  タスク3: '会議に参加する' → 含む ✓
  タスク4: '仕事のメールを送る' → 含まない ✗

結果:
filtered = [
  {id: 1, text: '会議の資料を準備する', done: false, category: '仕事'},
  {id: 3, text: '会議に参加する', done: true, category: '仕事'}
]

---------------------------------------------------
ステップ2: カテゴリでフィルター
---------------------------------------------------
currentCategory = "仕事"

filtered.filter(task => task.category === "仕事")

  タスク1: category = '仕事' → 一致 ✓
  タスク3: category = '仕事' → 一致 ✓

結果:
filtered = [
  {id: 1, text: '会議の資料を準備する', done: false, category: '仕事'},
  {id: 3, text: '会議に参加する', done: true, category: '仕事'}
]
(変化なし、すでにすべて '仕事' カテゴリだった)

---------------------------------------------------
ステップ3: 完了状態でフィルター
---------------------------------------------------
currentFilter = "active" (未完了)

filtered.filter(task => task.done === false)

  タスク1: done = false → 一致 ✓
  タスク3: done = true → 一致しない ✗

結果:
filtered = [
  {id: 1, text: '会議の資料を準備する', done: false, category: '仕事'}
]

---------------------------------------------------
最終結果:
---------------------------------------------------
「会議」を含む、「仕事」カテゴリの、「未完了」タスク
→ 1件のみ表示
```

### 検索結果が0件の場合の処理

検索結果が見つからない場合、ユーザーにメッセージを表示します。

```javascript
function displayTasks() {
  let list = document.getElementById('taskList');
  list.innerHTML = '';

  let filtered = getFilteredTasks();

  // 検索結果が0件の場合
  if (filtered.length === 0) {
    let message = document.createElement('li');
    message.textContent = 'タスクが見つかりませんでした';
    message.style.textAlign = 'center';
    message.style.color = '#999';
    list.appendChild(message);
    return;
  }

  // タスクを表示
  filtered.forEach(function(task) {
    // ... タスク表示処理
  });
}
```

## 検索のクリア機能

### クリアボタンの実装

検索をクリアして、すべてのタスクを表示できるようにします。

```javascript
let clearButton = document.getElementById('clearButton');

clearButton.addEventListener('click', function() {
  searchInput.value = '';  // 検索ボックスを空にする
  displayTasks();          // タスクを再表示
});
```

### 検索クリアの流れ

```
【検索クリアの動作】

現在の状態:
検索ボックス: "会議"
表示: "会議" を含む2件のタスクのみ

---------------------------------------------------
ユーザーがクリアボタンをクリック
---------------------------------------------------
click イベントが発火
  ↓
searchInput.value = ''
  → 検索ボックスが空になる
  ↓
displayTasks() が呼ばれる
  ↓
getFilteredTasks() が実行される
  ↓
keyword = '' (空文字列)
  ↓
if (keyword !== '') が false
  → 検索フィルターをスキップ
  ↓
すべてのタスクが表示される

---------------------------------------------------
結果:
---------------------------------------------------
検索ボックス: "" (空)
表示: すべてのタスク
```

### Escapeキーでクリア

キーボードのEscapeキーでも検索をクリアできるようにします。

```javascript
searchInput.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    searchInput.value = '';
    displayTasks();
  }
});
```

### Escapeキーの動作フロー

```
【Escapeキーによるクリア】

検索ボックスにフォーカスがある状態
検索ボックスの値: "会議"

---------------------------------------------------
ユーザーがEscapeキーを押す
---------------------------------------------------
keydown イベントが発火
  ↓
イベントオブジェクト e を確認:
  e.key = 'Escape'
  ↓
if (e.key === 'Escape') が true
  ↓
searchInput.value = ''
  → 検索ボックスがクリアされる
  ↓
displayTasks() が呼ばれる
  ↓
すべてのタスクが表示される

---------------------------------------------------
他のキーを押した場合:
---------------------------------------------------
e.key = 'Enter' → 何もしない
e.key = 'a' → 何もしない
e.key = 'Backspace' → 何もしない

Escapeキーのみが特別に処理される
```

## 実践例1：基本的な検索機能

キーワード検索、部分一致検索、検索結果表示、検索クリアの基本機能を実装したTODOアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>TODOアプリ（検索編）</title>
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

    #searchContainer {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    #searchInput {
      flex: 1;
      padding: 10px;
      border: 2px solid #667eea;
      border-radius: 4px;
      font-size: 16px;
    }

    #searchInput:focus {
      outline: none;
      border-color: #5568d3;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    #clearButton {
      padding: 10px 20px;
      background: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    #clearButton:hover {
      background: #5a6268;
    }

    #inputContainer {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    #taskInput {
      flex: 1;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }

    #newTaskCategory {
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }

    #addButton {
      padding: 10px 20px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    #addButton:hover {
      background: #5568d3;
    }

    #filterContainer {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      align-items: center;
    }

    #categoryFilter {
      padding: 8px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .filter-buttons button {
      padding: 8px 16px;
      border: 2px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .filter-buttons button.active {
      background: #667eea;
      color: white;
      border-color: #667eea;
    }

    #taskList {
      list-style: none;
      padding: 0;
    }

    #taskList li {
      padding: 15px;
      margin-bottom: 10px;
      background: white;
      border: 2px solid #ddd;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    #taskList li:hover {
      border-color: #667eea;
    }

    #taskList li.done {
      opacity: 0.6;
    }

    #taskList li.done .task-text {
      text-decoration: line-through;
      color: #999;
    }

    #taskList li.no-results {
      justify-content: center;
      color: #999;
      font-style: italic;
    }

    .category-badge {
      display: inline-block;
      padding: 4px 12px;
      color: white;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
    }

    .task-text {
      flex: 1;
      font-size: 16px;
    }

    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>🔍 TODOアプリ（検索編）</h1>

  <div id="searchContainer">
    <input type="text" id="searchInput" placeholder="タスクを検索...">
    <button id="clearButton">クリア</button>
  </div>

  <div id="inputContainer">
    <input type="text" id="taskInput" placeholder="新しいタスクを入力">
    <select id="newTaskCategory">
      <option value="仕事">仕事</option>
      <option value="プライベート">プライベート</option>
      <option value="買い物">買い物</option>
    </select>
    <button id="addButton">追加</button>
  </div>

  <div id="filterContainer">
    <label>カテゴリ:</label>
    <select id="categoryFilter">
      <option value="すべて">すべて</option>
      <option value="仕事">仕事</option>
      <option value="プライベート">プライベート</option>
      <option value="買い物">買い物</option>
    </select>

    <div class="filter-buttons">
      <button id="filterAll" class="active">すべて</button>
      <button id="filterActive">未完了</button>
      <button id="filterCompleted">完了</button>
    </div>
  </div>

  <ul id="taskList"></ul>

  <script>
    let tasks = [];
    let taskIdCounter = 1;
    let categories = ['仕事', 'プライベート', '買い物'];
    let currentFilter = 'all';
    let currentCategory = 'すべて';

    let categoryColors = {
      '仕事': '#ff6b6b',
      'プライベート': '#4ecdc4',
      '買い物': '#ffe66d'
    };

    let searchInput = document.getElementById('searchInput');
    let clearButton = document.getElementById('clearButton');
    let taskInput = document.getElementById('taskInput');
    let newTaskCategory = document.getElementById('newTaskCategory');
    let addButton = document.getElementById('addButton');
    let taskList = document.getElementById('taskList');
    let categoryFilter = document.getElementById('categoryFilter');
    let filterAll = document.getElementById('filterAll');
    let filterActive = document.getElementById('filterActive');
    let filterCompleted = document.getElementById('filterCompleted');

    function getCategoryColor(category) {
      return categoryColors[category] || '#999999';
    }

    function getSearchKeyword() {
      let keyword = searchInput.value.trim();
      return keyword.toLowerCase();
    }

    function getFilteredTasks() {
      let filtered = tasks;

      // 検索キーワードでフィルター
      let keyword = getSearchKeyword();
      if (keyword !== '') {
        filtered = filtered.filter(function(task) {
          return task.text.toLowerCase().includes(keyword);
        });
      }

      // カテゴリでフィルター
      if (currentCategory !== 'すべて') {
        filtered = filtered.filter(function(task) {
          return task.category === currentCategory;
        });
      }

      // 完了状態でフィルター
      if (currentFilter === 'active') {
        filtered = filtered.filter(function(task) {
          return task.done === false;
        });
      } else if (currentFilter === 'completed') {
        filtered = filtered.filter(function(task) {
          return task.done === true;
        });
      }

      return filtered;
    }

    function displayTasks() {
      taskList.innerHTML = '';

      let filtered = getFilteredTasks();

      if (filtered.length === 0) {
        let message = document.createElement('li');
        message.textContent = 'タスクが見つかりませんでした';
        message.className = 'no-results';
        taskList.appendChild(message);
        return;
      }

      filtered.forEach(function(task) {
        let li = document.createElement('li');
        if (task.done) {
          li.classList.add('done');
        }

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', function() {
          toggleTask(task.id);
        });

        let badge = document.createElement('span');
        badge.textContent = task.category;
        badge.className = 'category-badge';
        badge.style.backgroundColor = getCategoryColor(task.category);

        let text = document.createElement('span');
        text.textContent = task.text;
        text.className = 'task-text';

        li.appendChild(checkbox);
        li.appendChild(badge);
        li.appendChild(text);

        taskList.appendChild(li);
      });

      updateFilterButtons();
    }

    function addTask() {
      let text = taskInput.value.trim();
      let category = newTaskCategory.value;

      if (text === '') {
        alert('タスクを入力してください');
        return;
      }

      tasks.push({
        id: taskIdCounter++,
        text: text,
        done: false,
        category: category
      });

      taskInput.value = '';
      saveTasks();
      displayTasks();
    }

    function toggleTask(id) {
      let task = tasks.find(function(t) {
        return t.id === id;
      });

      if (task) {
        task.done = !task.done;
        saveTasks();
        displayTasks();
      }
    }

    function updateFilterButtons() {
      filterAll.classList.remove('active');
      filterActive.classList.remove('active');
      filterCompleted.classList.remove('active');

      if (currentFilter === 'all') {
        filterAll.classList.add('active');
      } else if (currentFilter === 'active') {
        filterActive.classList.add('active');
      } else if (currentFilter === 'completed') {
        filterCompleted.classList.add('active');
      }
    }

    function saveTasks() {
      let data = {
        tasks: tasks,
        taskIdCounter: taskIdCounter
      };
      localStorage.setItem('todoAppSearch', JSON.stringify(data));
    }

    function loadTasks() {
      let saved = localStorage.getItem('todoAppSearch');
      if (saved) {
        try {
          let data = JSON.parse(saved);
          tasks = data.tasks || [];
          taskIdCounter = data.taskIdCounter || 1;
        } catch (error) {
          console.error('データの読み込みに失敗しました:', error);
          tasks = [];
          taskIdCounter = 1;
        }
      }
    }

    // 検索のイベントリスナー
    searchInput.addEventListener('input', function() {
      displayTasks();
    });

    clearButton.addEventListener('click', function() {
      searchInput.value = '';
      displayTasks();
    });

    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        searchInput.value = '';
        displayTasks();
      }
    });

    // その他のイベントリスナー
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addTask();
      }
    });

    categoryFilter.addEventListener('change', function() {
      currentCategory = categoryFilter.value;
      displayTasks();
    });

    filterAll.addEventListener('click', function() {
      currentFilter = 'all';
      displayTasks();
    });

    filterActive.addEventListener('click', function() {
      currentFilter = 'active';
      displayTasks();
    });

    filterCompleted.addEventListener('click', function() {
      currentFilter = 'completed';
      displayTasks();
    });

    loadTasks();
    displayTasks();
  </script>
</body>
</html>
```

このアプリでは：
- リアルタイム検索（入力するたびに結果が更新される）
- 部分一致検索（キーワードを含むタスクがすべて見つかる）
- クリアボタンとEscapeキーで検索をクリア
- 検索結果が0件の場合のメッセージ表示

## 実践例2：検索ハイライト表示付きTODOアプリ

検索キーワードを黄色くハイライト表示する機能を追加したアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>TODOアプリ（ハイライト付き検索）</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 700px;
      margin: 50px auto;
      padding: 20px;
      background: #f5f5f5;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .container {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    #searchContainer {
      display: flex;
      gap: 10px;
      margin-bottom: 25px;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 8px;
    }

    #searchInput {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
    }

    #searchInput:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(255,255,255,0.3);
    }

    #clearButton {
      padding: 12px 24px;
      background: white;
      color: #667eea;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
    }

    #clearButton:hover {
      background: #f8f9fa;
    }

    .search-info {
      margin-bottom: 15px;
      padding: 10px;
      background: #e7f3ff;
      border-left: 4px solid #667eea;
      border-radius: 4px;
      color: #666;
      font-size: 14px;
    }

    #inputContainer {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    #taskInput {
      flex: 1;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
    }

    #newTaskCategory {
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
    }

    #addButton {
      padding: 12px 24px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
    }

    #addButton:hover {
      background: #5568d3;
    }

    #filterContainer {
      display: flex;
      gap: 15px;
      margin-bottom: 25px;
      flex-wrap: wrap;
      align-items: center;
    }

    #categoryFilter {
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
    }

    .filter-buttons {
      display: flex;
      gap: 10px;
    }

    .filter-buttons button {
      padding: 10px 18px;
      border: 2px solid #ddd;
      background: white;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s;
    }

    .filter-buttons button.active {
      background: #667eea;
      color: white;
      border-color: #667eea;
    }

    #taskList {
      list-style: none;
      padding: 0;
    }

    #taskList li {
      padding: 18px;
      margin-bottom: 12px;
      background: white;
      border: 2px solid #e9ecef;
      border-left: 4px solid #667eea;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.3s;
    }

    #taskList li:hover {
      transform: translateX(5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    #taskList li.done {
      opacity: 0.6;
      border-left-color: #2ed573;
    }

    #taskList li.done .task-text {
      text-decoration: line-through;
      color: #999;
    }

    #taskList li.no-results {
      justify-content: center;
      color: #999;
      font-style: italic;
      border-left-color: #ddd;
    }

    .category-badge {
      display: inline-block;
      padding: 5px 14px;
      color: white;
      border-radius: 14px;
      font-size: 12px;
      font-weight: bold;
      text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }

    .task-text {
      flex: 1;
      font-size: 16px;
      color: #333;
    }

    input[type="checkbox"] {
      width: 22px;
      height: 22px;
      cursor: pointer;
    }

    mark {
      background-color: #ffeb3b;
      color: #000;
      padding: 2px 4px;
      border-radius: 2px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>🔍 TODOアプリ（ハイライト付き検索）</h1>

  <div class="container">
    <div id="searchContainer">
      <input type="text" id="searchInput" placeholder="タスクを検索...">
      <button id="clearButton">クリア</button>
    </div>

    <div id="searchInfo" class="search-info" style="display: none;"></div>

    <div id="inputContainer">
      <input type="text" id="taskInput" placeholder="新しいタスクを入力">
      <select id="newTaskCategory">
        <option value="仕事">仕事</option>
        <option value="プライベート">プライベート</option>
        <option value="買い物">買い物</option>
      </select>
      <button id="addButton">追加</button>
    </div>

    <div id="filterContainer">
      <label>カテゴリ:</label>
      <select id="categoryFilter">
        <option value="すべて">すべて</option>
        <option value="仕事">仕事</option>
        <option value="プライベート">プライベート</option>
        <option value="買い物">買い物</option>
      </select>

      <div class="filter-buttons">
        <button id="filterAll" class="active">すべて</button>
        <button id="filterActive">未完了</button>
        <button id="filterCompleted">完了</button>
      </div>
    </div>

    <ul id="taskList"></ul>
  </div>

  <script>
    let tasks = [];
    let taskIdCounter = 1;
    let categories = ['仕事', 'プライベート', '買い物'];
    let currentFilter = 'all';
    let currentCategory = 'すべて';

    let categoryColors = {
      '仕事': '#ff6b6b',
      'プライベート': '#4ecdc4',
      '買い物': '#ffe66d'
    };

    let searchInput = document.getElementById('searchInput');
    let clearButton = document.getElementById('clearButton');
    let searchInfo = document.getElementById('searchInfo');
    let taskInput = document.getElementById('taskInput');
    let newTaskCategory = document.getElementById('newTaskCategory');
    let addButton = document.getElementById('addButton');
    let taskList = document.getElementById('taskList');
    let categoryFilter = document.getElementById('categoryFilter');
    let filterAll = document.getElementById('filterAll');
    let filterActive = document.getElementById('filterActive');
    let filterCompleted = document.getElementById('filterCompleted');

    function getCategoryColor(category) {
      return categoryColors[category] || '#999999';
    }

    function getSearchKeyword() {
      let keyword = searchInput.value.trim();
      return keyword.toLowerCase();
    }

    function highlightKeyword(text, keyword) {
      if (keyword === '') {
        return text;
      }

      let regex = new RegExp('(' + keyword + ')', 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    }

    function getFilteredTasks() {
      let filtered = tasks;

      let keyword = getSearchKeyword();
      if (keyword !== '') {
        filtered = filtered.filter(function(task) {
          return task.text.toLowerCase().includes(keyword);
        });
      }

      if (currentCategory !== 'すべて') {
        filtered = filtered.filter(function(task) {
          return task.category === currentCategory;
        });
      }

      if (currentFilter === 'active') {
        filtered = filtered.filter(function(task) {
          return task.done === false;
        });
      } else if (currentFilter === 'completed') {
        filtered = filtered.filter(function(task) {
          return task.done === true;
        });
      }

      return filtered;
    }

    function displayTasks() {
      taskList.innerHTML = '';

      let filtered = getFilteredTasks();
      let keyword = getSearchKeyword();

      // 検索情報の表示
      if (keyword !== '') {
        searchInfo.style.display = 'block';
        searchInfo.textContent = '「' + searchInput.value + '」の検索結果: ' + filtered.length + ' 件';
      } else {
        searchInfo.style.display = 'none';
      }

      if (filtered.length === 0) {
        let message = document.createElement('li');
        message.textContent = 'タスクが見つかりませんでした';
        message.className = 'no-results';
        taskList.appendChild(message);
        return;
      }

      filtered.forEach(function(task) {
        let li = document.createElement('li');
        if (task.done) {
          li.classList.add('done');
        }

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', function() {
          toggleTask(task.id);
        });

        let badge = document.createElement('span');
        badge.textContent = task.category;
        badge.className = 'category-badge';
        badge.style.backgroundColor = getCategoryColor(task.category);

        let text = document.createElement('span');
        text.innerHTML = highlightKeyword(task.text, keyword);
        text.className = 'task-text';

        li.appendChild(checkbox);
        li.appendChild(badge);
        li.appendChild(text);

        taskList.appendChild(li);
      });

      updateFilterButtons();
    }

    function addTask() {
      let text = taskInput.value.trim();
      let category = newTaskCategory.value;

      if (text === '') {
        alert('タスクを入力してください');
        return;
      }

      tasks.push({
        id: taskIdCounter++,
        text: text,
        done: false,
        category: category
      });

      taskInput.value = '';
      saveTasks();
      displayTasks();
    }

    function toggleTask(id) {
      let task = tasks.find(function(t) {
        return t.id === id;
      });

      if (task) {
        task.done = !task.done;
        saveTasks();
        displayTasks();
      }
    }

    function updateFilterButtons() {
      filterAll.classList.remove('active');
      filterActive.classList.remove('active');
      filterCompleted.classList.remove('active');

      if (currentFilter === 'all') {
        filterAll.classList.add('active');
      } else if (currentFilter === 'active') {
        filterActive.classList.add('active');
      } else if (currentFilter === 'completed') {
        filterCompleted.classList.add('active');
      }
    }

    function saveTasks() {
      let data = {
        tasks: tasks,
        taskIdCounter: taskIdCounter
      };
      localStorage.setItem('todoAppSearchHighlight', JSON.stringify(data));
    }

    function loadTasks() {
      let saved = localStorage.getItem('todoAppSearchHighlight');
      if (saved) {
        try {
          let data = JSON.parse(saved);
          tasks = data.tasks || [];
          taskIdCounter = data.taskIdCounter || 1;
        } catch (error) {
          console.error('データの読み込みに失敗しました:', error);
          tasks = [];
          taskIdCounter = 1;
        }
      }
    }

    searchInput.addEventListener('input', function() {
      displayTasks();
    });

    clearButton.addEventListener('click', function() {
      searchInput.value = '';
      displayTasks();
    });

    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        searchInput.value = '';
        displayTasks();
      }
    });

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addTask();
      }
    });

    categoryFilter.addEventListener('change', function() {
      currentCategory = categoryFilter.value;
      displayTasks();
    });

    filterAll.addEventListener('click', function() {
      currentFilter = 'all';
      displayTasks();
    });

    filterActive.addEventListener('click', function() {
      currentFilter = 'active';
      displayTasks();
    });

    filterCompleted.addEventListener('click', function() {
      currentFilter = 'completed';
      displayTasks();
    });

    loadTasks();
    displayTasks();
  </script>
</body>
</html>
```

このアプリでは：
- 検索キーワードが黄色くハイライト表示される
- 検索結果の件数が表示される
- より洗練されたデザイン
- すべての基本機能が統合されている

## よくある問題と解決策

### 問題1: 検索しても表示が更新されない

**症状**:
検索ボックスに文字を入力しても、タスクの表示が変わらない。

**原因**:
`input` イベントリスナーが設定されていない、または `displayTasks()` が呼ばれていない。

**解決策**:
```javascript
// ❌ 間違い
searchInput.addEventListener('click', function() {
  displayTasks();
});

// ✅ 正しい
searchInput.addEventListener('input', function() {
  displayTasks();  // 入力のたびに呼ばれる
});
```

### 問題2: 大文字小文字の違いで検索できない

**症状**:
「JavaScript」というタスクがあるのに、「javascript」で検索しても見つからない。

**原因**:
大文字小文字を区別して検索している。

**解決策**:
```javascript
// ❌ 間違い
function getFilteredTasks() {
  return tasks.filter(function(task) {
    return task.text.includes(keyword);  // 大文字小文字を区別
  });
}

// ✅ 正しい
function getFilteredTasks() {
  let keyword = getSearchKeyword();  // すでに小文字に変換済み

  return tasks.filter(function(task) {
    return task.text.toLowerCase().includes(keyword);  // 両方を小文字に
  });
}
```

### 問題3: 検索をクリアしてもすべてのタスクが表示されない

**症状**:
クリアボタンを押しても、一部のタスクしか表示されない。

**原因**:
検索ボックスは空になったが、他のフィルター（カテゴリや完了状態）が適用されている。

**解決策**:
```javascript
// これは正常な動作です
// 検索をクリアしても、カテゴリフィルターや完了状態フィルターは残ります

// もしすべてのフィルターをクリアしたい場合:
clearButton.addEventListener('click', function() {
  searchInput.value = '';
  currentCategory = 'すべて';
  currentFilter = 'all';
  categoryFilter.value = 'すべて';
  displayTasks();
});
```

通常は、検索のみをクリアして、他のフィルターは維持するのが一般的です。

## まとめ

お疲れ様でした！今回は、TODOアプリに検索機能を追加しました。

### 今回学んだこと

1. **文字列検索の基本**
   - `includes()` メソッドで部分一致検索
   - `toLowerCase()` で大文字小文字を区別しない検索

2. **リアルタイム検索**
   - `input` イベントで入力のたびに検索結果を更新
   - ユーザーエクスペリエンスの向上

3. **複合フィルター**
   - 検索、カテゴリ、完了状態を組み合わせた柔軟な絞り込み
   - `filter()` メソッドの連鎖的な使用

4. **検索のクリア**
   - クリアボタンとEscapeキーの両方でクリア可能
   - ユーザーの好みに応じた操作方法の提供

### カリキュラム達成確認

✅ **キーワードで検索**: 検索ボックスに入力したキーワードでタスクを検索
✅ **部分一致検索**: `includes()` メソッドでタスクのテキストに含まれるキーワードを検索
✅ **検索結果を表示**: `filter()` メソッドで検索条件に一致するタスクのみを表示
✅ **検索のクリア**: クリアボタンとEscapeキーで検索をクリアし、すべてのタスクを表示

### 実際の開発での応用

検索機能は、あらゆるアプリケーションで使われる基本的な機能です：

- **メールアプリ**: 件名や本文で検索
- **ECサイト**: 商品名で検索
- **SNS**: 投稿内容で検索
- **ドキュメント管理**: ファイル名や内容で検索

検索機能は、**大量のデータの中から必要な情報を素早く見つける**ための必須機能です。

### 次回予告

次回は、TODOアプリに**編集機能**を追加します。

既存のタスクの内容を修正できるようにすることで、さらに実用的なアプリになります。インライン編集やモーダルダイアログなど、編集UIのパターンについて学びます。

---

**日付**: 2025-11-26
