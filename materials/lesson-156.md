---
title: "Lesson 156: TODOアプリ（カウンター編）"
author: "JavaScript学習教材"
date: "2025-11-23"
---

# Lesson 156: TODOアプリ（カウンター編）

## 今回の学習

### 前回の復習

前回のレッスンでは、TODOアプリにバリデーション機能を追加しました。具体的には以下の内容を学習しました。

- **バリデーション**: ユーザーの入力をチェックして、不正なデータを防ぐ
- **エラー処理**: エラーが発生したときに、分かりやすいメッセージをユーザーに伝える
- **リアルタイムフィードバック**: ユーザーが入力しながらエラーに気づけるようにする

前回作成した「堅牢なTODOアプリ」により、空のタスクや長すぎるタスクを防ぎ、データの品質を保てるようになりました。

### 今回の目標

今回は、TODOアプリに統計機能を追加します。タスクの数を集計して表示することで、タスクの進捗状況を一目で把握できるようにします。

今回の学習で達成する目標は以下の通りです。

- **全タスク数を表示**: すべてのタスクの合計数を表示する
- **未完了タスク数を表示**: 未完了のタスクの数を表示する
- **完了タスク数を表示**: 完了したタスクの数を表示する
- **統計情報の更新**: タスクの追加・削除・変更時に統計を自動更新する

## カウント処理の基礎

### なぜ統計情報が必要なのか

タスクが増えてくると、全体の進捗状況を把握することが重要になります。統計情報を表示することで、以下のようなメリットがあります。

- **進捗の可視化**: どれだけのタスクが完了したかが一目で分かる
- **モチベーション**: 完了タスクが増えていくのを見ると達成感がある
- **タスク管理**: 未完了タスクの数を見て、優先順位を決められる

例えば、GitHubではイシューの数（Open/Closed）が表示されます。Gmailでは未読メールの数が表示されます。Trelloではカード数が表示されます。これらの統計情報により、ユーザーは状況を素早く把握できます。

### 配列の長さを取得する

JavaScriptの配列には、`length` プロパティがあります。これを使って、配列の要素数を取得できます。

```javascript
const todos = [
  { text: '買い物', completed: false },
  { text: '掃除', completed: true },
  { text: '勉強', completed: false }
];

console.log(todos.length); // 3
```

全タスク数は、単純に `todos.length` で取得できます。

### 条件に一致する要素の数を数える

未完了や完了のタスク数を数えるには、`filter()` メソッドを使います。

```javascript
// 未完了タスクの数
const incompleteCount = todos.filter(function(todo) {
  return todo.completed === false;
}).length;

console.log(incompleteCount); // 2

// 完了タスクの数
const completedCount = todos.filter(function(todo) {
  return todo.completed === true;
}).length;

console.log(completedCount); // 1
```

`filter()` で条件に一致する要素を抽出し、その結果の配列の `length` を取得することで、数を数えられます。

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

統計情報を横並びに配置し、数字を大きく表示することで、一目で分かるようにします。

### 統計情報を更新する関数

統計情報を更新する関数を作成します。

```javascript
function updateStats() {
  // 全タスク数
  const totalCount = todos.length;

  // 未完了タスク数
  const incompleteCount = todos.filter(function(todo) {
    return todo.completed === false;
  }).length;

  // 完了タスク数
  const completedCount = todos.filter(function(todo) {
    return todo.completed === true;
  }).length;

  // 画面に反映
  document.getElementById('total-count').textContent = totalCount;
  document.getElementById('incomplete-count').textContent = incompleteCount;
  document.getElementById('completed-count').textContent = completedCount;
}
```

この関数を、タスクが変更されるたびに呼び出します。

## 統計情報の自動更新

### タスク追加時に更新

タスクを追加したときに、統計情報を更新します。

```javascript
function addTodo() {
  const text = todoInput.value.trim();

  if (text === '') {
    showError('タスクを入力してください');
    return;
  }

  todos.push({
    text: text,
    completed: false,
    category: newTaskCategory.value
  });

  todoInput.value = '';
  saveTodos();
  renderTodos();
  updateStats(); // 統計情報を更新
}
```

タスクを追加した後に `updateStats()` を呼び出すことで、常に最新の統計情報が表示されます。

### タスク完了/未完了切り替え時に更新

タスクの完了状態を切り替えたときにも、統計情報を更新します。

```javascript
taskText.addEventListener('click', function() {
  todos[originalIndex].completed = !todos[originalIndex].completed;
  saveTodos();
  renderTodos();
  updateStats(); // 統計情報を更新
});
```

完了状態が変わると、未完了数と完了数が変化するため、統計を更新する必要があります。

### ページ読み込み時に更新

ページを開いたときにも、localStorageからデータを読み込んだ後に統計情報を更新します。

```javascript
// ページ読み込み時にデータを復元
loadTodos();
renderTodos();
updateStats(); // 統計情報を更新
```

これにより、ページを開いた瞬間から正しい統計情報が表示されます。

## 進捗率の表示

### パーセンテージの計算

完了したタスクの割合を計算して表示することもできます。

```javascript
function updateStats() {
  const totalCount = todos.length;
  const completedCount = todos.filter(function(todo) {
    return todo.completed === true;
  }).length;

  // 進捗率を計算（0で割らないように注意）
  let progressPercentage = 0;
  if (totalCount > 0) {
    progressPercentage = Math.round((completedCount / totalCount) * 100);
  }

  // 画面に反映
  document.getElementById('progress-percentage').textContent = progressPercentage + '%';
}
```

`Math.round()` を使って、小数点以下を四捨五入しています。

### プログレスバーの表示

進捗率を視覚的に表示するプログレスバーを追加できます。

```html
<div id="progress-bar-container">
  <div id="progress-bar" style="width: 0%;"></div>
</div>
```

```css
#progress-bar-container {
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
}

#progress-bar {
  height: 100%;
  background-color: #28a745;
  transition: width 0.3s ease;
}
```

```javascript
function updateStats() {
  // ... 統計計算

  // プログレスバーを更新
  const progressBar = document.getElementById('progress-bar');
  progressBar.style.width = progressPercentage + '%';
}
```

プログレスバーの幅を変更することで、視覚的に進捗を表現できます。

## カテゴリ別の統計

### カテゴリごとのタスク数を表示

カテゴリごとにタスクの数を集計することもできます。

```javascript
function getCategoryStats() {
  const stats = {};

  todos.forEach(function(todo) {
    const category = todo.category;

    if (!stats[category]) {
      stats[category] = {
        total: 0,
        completed: 0,
        incomplete: 0
      };
    }

    stats[category].total++;

    if (todo.completed) {
      stats[category].completed++;
    } else {
      stats[category].incomplete++;
    }
  });

  return stats;
}
```

この関数は、各カテゴリの統計情報をオブジェクトとして返します。

```javascript
{
  '仕事': { total: 5, completed: 2, incomplete: 3 },
  'プライベート': { total: 3, completed: 1, incomplete: 2 },
  '買い物': { total: 2, completed: 2, incomplete: 0 }
}
```

### カテゴリ別統計の表示

カテゴリ別の統計を画面に表示します。

```javascript
function displayCategoryStats() {
  const stats = getCategoryStats();
  const container = document.getElementById('category-stats');
  container.innerHTML = '';

  for (const category in stats) {
    const stat = stats[category];
    const div = document.createElement('div');
    div.className = 'category-stat-item';
    div.innerHTML = category + ': ' + stat.total + '件（完了：' + stat.completed + '）';
    container.appendChild(div);
  }
}
```

カテゴリごとにタスク数を表示することで、どのカテゴリに多くのタスクがあるかが分かります。

## reduce()メソッドによる集計

### reduce()を使った別の集計方法

`reduce()` メソッドを使うと、より柔軟に集計できます。

```javascript
// 未完了タスク数をreduce()で計算
const incompleteCount = todos.reduce(function(count, todo) {
  return count + (todo.completed ? 0 : 1);
}, 0);
```

`reduce()` は、配列の各要素に対して関数を実行し、単一の値を返します。初期値は `0` で、未完了タスクを見つけるたびに `1` を加算しています。

### reduce()の利点

`reduce()` を使うと、1回のループで複数の統計を同時に計算できます。

```javascript
const stats = todos.reduce(function(acc, todo) {
  acc.total++;

  if (todo.completed) {
    acc.completed++;
  } else {
    acc.incomplete++;
  }

  return acc;
}, { total: 0, completed: 0, incomplete: 0 });

console.log(stats); // { total: 3, completed: 1, incomplete: 2 }
```

`filter()` を複数回使うよりも効率的です。

## 練習問題

### 課題

統計機能付きTODOアプリを作成してください。全タスク数、未完了タスク数、完了タスク数を表示し、タスクの変更時に自動的に統計情報を更新します。

### 保存場所

`exercises/lesson-156/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. 全タスク数を表示
2. 未完了タスク数を表示
3. 完了タスク数を表示
4. 統計情報の更新

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-156
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**統計情報の表示エリア**

- HTMLに統計情報を表示するための要素を追加します
- 全タスク数、未完了タスク数、完了タスク数のそれぞれに `id` を設定します
- CSSで見やすくスタイルを設定します

**統計情報の計算**

- 全タスク数は `todos.length` で取得します
- 未完了タスク数は `filter()` で `completed === false` のタスクを抽出し、その `length` を取得します
- 完了タスク数は `filter()` で `completed === true` のタスクを抽出し、その `length` を取得します

**統計情報の更新**

- `updateStats()` 関数を作成して、統計情報を計算して画面に反映します
- タスクを追加、削除、完了状態を変更したときに `updateStats()` を呼び出します
- ページ読み込み時にも `updateStats()` を呼び出して、初期表示を行います

**効率的な実装**

- 統計情報の更新は、`renderTodos()` の中で行うと、常に最新の状態が保たれます
- すべてのタスク変更処理で `updateStats()` を呼び出すことを忘れないようにします

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 156</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }
        h1 {
            text-align: center;
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
        #error-message {
            display: none;
            background-color: #dc3545;
            color: white;
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 4px;
            text-align: center;
        }
        #success-message {
            display: none;
            background-color: #28a745;
            color: white;
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 4px;
            text-align: center;
        }
        #search-container {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        #search-input {
            flex: 1;
            padding: 10px;
            font-size: 16px;
            border: 2px solid #007bff;
            border-radius: 4px;
        }
        #clear-search-btn {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            background-color: #6c757d;
            color: white;
            border: none;
            border-radius: 4px;
        }
        #input-container {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
        }
        #todo-input {
            flex: 1;
            padding: 10px;
            font-size: 16px;
            border: 2px solid #ccc;
            border-radius: 4px;
        }
        #todo-input.error {
            border-color: #dc3545;
        }
        #new-task-category {
            padding: 10px;
            font-size: 16px;
        }
        #add-btn {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }
        #char-counter {
            text-align: right;
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
        }
        #char-count.over {
            color: #dc3545;
            font-weight: bold;
        }
        #filter-container {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            align-items: center;
        }
        #category-select {
            padding: 8px;
            font-size: 14px;
        }
        #filter-buttons button {
            padding: 8px 16px;
            cursor: pointer;
            border: 1px solid #ccc;
            background-color: white;
        }
        #filter-buttons button.active {
            background-color: #007bff;
            color: white;
            border-color: #007bff;
        }
        #todo-list {
            list-style: none;
            padding: 0;
        }
        #todo-list li {
            padding: 10px;
            margin-bottom: 5px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        #todo-list li.completed {
            text-decoration: line-through;
            color: #999;
        }
        #todo-list li.no-results {
            cursor: default;
            justify-content: center;
            color: #999;
        }
        .category-badge {
            display: inline-block;
            padding: 3px 10px;
            color: white;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
        }
        .task-text {
            flex: 1;
            cursor: pointer;
        }
        .edit-input {
            flex: 1;
            padding: 5px;
            font-size: 16px;
            border: 2px solid #007bff;
            border-radius: 4px;
        }
        .edit-btn {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 4px;
        }
        .save-btn {
            background-color: #28a745;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 4px;
        }
        .cancel-btn {
            background-color: #dc3545;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>TODOアプリ（カウンター編）</h1>

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

    <div id="error-message"></div>
    <div id="success-message"></div>

    <div id="search-container">
        <input type="text" id="search-input" placeholder="タスクを検索...">
        <button id="clear-search-btn">クリア</button>
    </div>

    <div id="input-container">
        <input type="text" id="todo-input" placeholder="新しいタスクを入力" maxlength="100">
        <select id="new-task-category">
            <option value="仕事">仕事</option>
            <option value="プライベート">プライベート</option>
            <option value="買い物">買い物</option>
        </select>
        <button id="add-btn">追加</button>
    </div>

    <div id="char-counter">
        <span id="char-count">0</span> / 100
    </div>

    <div id="filter-container">
        <label>カテゴリ:</label>
        <select id="category-select">
            <option value="すべて">すべて</option>
            <option value="仕事">仕事</option>
            <option value="プライベート">プライベート</option>
            <option value="買い物">買い物</option>
        </select>

        <div id="filter-buttons">
            <button id="filter-all" class="active">すべて</button>
            <button id="filter-active">未完了</button>
            <button id="filter-completed">完了</button>
        </div>
    </div>

    <ul id="todo-list"></ul>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
// タスクの配列
let todos = [];

// カテゴリのリスト
const categories = ['すべて', '仕事', 'プライベート', '買い物'];

// 現在のフィルター状態
let currentFilter = 'all'; // 'all', 'active', 'completed'
let currentCategory = 'すべて';

// 編集中のタスクのインデックス
let editingIndex = -1;

// 最大文字数
const MAX_TASK_LENGTH = 100;

// DOM要素の取得
const totalCountEl = document.getElementById('total-count');
const incompleteCountEl = document.getElementById('incomplete-count');
const completedCountEl = document.getElementById('completed-count');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
const todoInput = document.getElementById('todo-input');
const newTaskCategory = document.getElementById('new-task-category');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const categorySelect = document.getElementById('category-select');
const filterAllBtn = document.getElementById('filter-all');
const filterActiveBtn = document.getElementById('filter-active');
const filterCompletedBtn = document.getElementById('filter-completed');
const charCount = document.getElementById('char-count');

// カテゴリごとの色
const categoryColors = {
  '仕事': '#ff6b6b',
  'プライベート': '#4ecdc4',
  '買い物': '#ffe66d'
};

// localStorageからデータを読み込む
function loadTodos() {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }
}

// localStorageにデータを保存
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// エラーメッセージを表示
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';

  setTimeout(function() {
    errorMessage.style.display = 'none';
  }, 3000);
}

// 成功メッセージを表示
function showSuccess(message) {
  successMessage.textContent = message;
  successMessage.style.display = 'block';

  setTimeout(function() {
    successMessage.style.display = 'none';
  }, 2000);
}

// 統計情報を更新
function updateStats() {
  // 全タスク数
  const totalCount = todos.length;

  // 未完了タスク数
  const incompleteCount = todos.filter(function(todo) {
    return todo.completed === false;
  }).length;

  // 完了タスク数
  const completedCount = todos.filter(function(todo) {
    return todo.completed === true;
  }).length;

  // 画面に反映
  totalCountEl.textContent = totalCount;
  incompleteCountEl.textContent = incompleteCount;
  completedCountEl.textContent = completedCount;
}

// 検索キーワードを取得
function getSearchKeyword() {
  const keyword = searchInput.value.trim();
  return keyword.toLowerCase();
}

// フィルターに応じたタスクを取得
function getFilteredTodos() {
  let filtered = todos;

  // 検索キーワードでフィルター
  const keyword = getSearchKeyword();
  if (keyword !== '') {
    filtered = filtered.filter(function(todo) {
      return todo.text.toLowerCase().includes(keyword);
    });
  }

  // カテゴリでフィルター
  if (currentCategory !== 'すべて') {
    filtered = filtered.filter(function(todo) {
      return todo.category === currentCategory;
    });
  }

  // 完了状態でフィルター
  if (currentFilter === 'active') {
    filtered = filtered.filter(function(todo) {
      return todo.completed === false;
    });
  } else if (currentFilter === 'completed') {
    filtered = filtered.filter(function(todo) {
      return todo.completed === true;
    });
  }

  return filtered;
}

// タスクを画面に表示
function renderTodos() {
  todoList.innerHTML = '';

  const filteredTodos = getFilteredTodos();

  // 検索結果が0件の場合
  if (filteredTodos.length === 0) {
    const message = document.createElement('li');
    message.textContent = 'タスクが見つかりませんでした';
    message.className = 'no-results';
    todoList.appendChild(message);
    updateStats(); // 統計情報を更新
    return;
  }

  // タスクを表示
  filteredTodos.forEach(function(todo) {
    const li = document.createElement('li');

    // 元の配列でのインデックスを取得
    const originalIndex = todos.indexOf(todo);

    // カテゴリバッジを作成
    const categoryBadge = document.createElement('span');
    categoryBadge.textContent = todo.category;
    categoryBadge.className = 'category-badge';
    categoryBadge.style.backgroundColor = categoryColors[todo.category] || '#999';

    li.appendChild(categoryBadge);

    // 編集モード
    if (originalIndex === editingIndex) {
      // 入力欄
      const input = document.createElement('input');
      input.type = 'text';
      input.value = todo.text;
      input.className = 'edit-input';
      input.maxLength = MAX_TASK_LENGTH;

      // 保存ボタン
      const saveBtn = document.createElement('button');
      saveBtn.textContent = '保存';
      saveBtn.className = 'save-btn';

      saveBtn.addEventListener('click', function() {
        const newText = input.value.trim();

        // 空チェック
        if (newText === '') {
          showError('タスクを入力してください');
          return;
        }

        // 長さチェック
        if (newText.length > MAX_TASK_LENGTH) {
          showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください（現在：' + newText.length + '文字）');
          return;
        }

        // バリデーション通過
        todos[originalIndex].text = newText;
        saveTodos();
        editingIndex = -1;
        renderTodos();
        showSuccess('タスクを更新しました');
      });

      // キャンセルボタン
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'キャンセル';
      cancelBtn.className = 'cancel-btn';

      cancelBtn.addEventListener('click', function() {
        editingIndex = -1;
        renderTodos();
      });

      // Enterキーで保存、Escapeキーでキャンセル
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          saveBtn.click();
        } else if (e.key === 'Escape') {
          cancelBtn.click();
        }
      });

      li.appendChild(input);
      li.appendChild(saveBtn);
      li.appendChild(cancelBtn);

      // 入力欄にフォーカス
      setTimeout(function() {
        input.focus();
        input.select();
      }, 0);
    } else {
      // 通常モード
      const taskText = document.createElement('span');
      taskText.textContent = todo.text;
      taskText.className = 'task-text';

      if (todo.completed) {
        taskText.style.textDecoration = 'line-through';
        taskText.style.color = '#999';
      }

      // クリックで完了/未完了を切り替え
      taskText.addEventListener('click', function() {
        todos[originalIndex].completed = !todos[originalIndex].completed;
        saveTodos();
        renderTodos();
      });

      // ダブルクリックで編集開始
      taskText.addEventListener('dblclick', function() {
        editingIndex = originalIndex;
        renderTodos();
      });

      // 編集ボタン
      const editBtn = document.createElement('button');
      editBtn.textContent = '編集';
      editBtn.className = 'edit-btn';

      editBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        editingIndex = originalIndex;
        renderTodos();
      });

      li.appendChild(taskText);
      li.appendChild(editBtn);
    }

    todoList.appendChild(li);
  });

  updateFilterButtons();
  updateStats(); // 統計情報を更新
}

// フィルターボタンの状態を更新
function updateFilterButtons() {
  filterAllBtn.classList.remove('active');
  filterActiveBtn.classList.remove('active');
  filterCompletedBtn.classList.remove('active');

  if (currentFilter === 'all') {
    filterAllBtn.classList.add('active');
  } else if (currentFilter === 'active') {
    filterActiveBtn.classList.add('active');
  } else if (currentFilter === 'completed') {
    filterCompletedBtn.classList.add('active');
  }
}

// タスクを追加
function addTodo() {
  const text = todoInput.value.trim();
  const category = newTaskCategory.value;

  // 空チェック
  if (text === '') {
    showError('タスクを入力してください');
    return;
  }

  // 長さチェック
  if (text.length > MAX_TASK_LENGTH) {
    showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください（現在：' + text.length + '文字）');
    return;
  }

  // すべてのバリデーションを通過
  todos.push({
    text: text,
    completed: false,
    category: category
  });

  todoInput.value = '';
  charCount.textContent = '0';
  charCount.classList.remove('over');
  todoInput.classList.remove('error');
  saveTodos();
  renderTodos();
  showSuccess('タスクを追加しました');
}

// 文字数カウンターを更新
todoInput.addEventListener('input', function() {
  const length = todoInput.value.length;
  charCount.textContent = length;

  if (length > MAX_TASK_LENGTH) {
    charCount.classList.add('over');
    todoInput.classList.add('error');
  } else {
    charCount.classList.remove('over');
    todoInput.classList.remove('error');
  }
});

// 検索のイベントリスナー
searchInput.addEventListener('input', function() {
  renderTodos();
});

// 検索クリアのイベントリスナー
clearSearchBtn.addEventListener('click', function() {
  searchInput.value = '';
  renderTodos();
});

// Escapeキーで検索をクリア
searchInput.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    searchInput.value = '';
    renderTodos();
  }
});

// カテゴリ選択のイベントリスナー
categorySelect.addEventListener('change', function() {
  currentCategory = categorySelect.value;
  renderTodos();
});

// フィルターボタンのイベントリスナー
filterAllBtn.addEventListener('click', function() {
  currentFilter = 'all';
  renderTodos();
});

filterActiveBtn.addEventListener('click', function() {
  currentFilter = 'active';
  renderTodos();
});

filterCompletedBtn.addEventListener('click', function() {
  currentFilter = 'completed';
  renderTodos();
});

// 追加ボタンのイベントリスナー
addBtn.addEventListener('click', addTodo);

// Enterキーでも追加できるように
todoInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// ページ読み込み時にデータを復元
loadTodos();
renderTodos();
```

### 解説

**統計情報の計算**

`updateStats()` 関数で、全タスク数、未完了タスク数、完了タスク数を計算しています。`filter()` メソッドを使って条件に一致するタスクを抽出し、その `length` を取得することで数を数えています。

**統計情報の自動更新**

`renderTodos()` 関数の最後に `updateStats()` を呼び出すことで、タスクが変更されるたびに自動的に統計情報が更新されます。これにより、常に最新の統計情報が表示されます。

**視覚的な表示**

統計情報を大きく表示し、背景色を設定することで、一目で分かるようにしています。数字を強調することで、ユーザーは進捗状況を素早く把握できます。

**効率的な実装**

`renderTodos()` の中で `updateStats()` を呼び出すことで、タスクの追加、削除、完了状態の変更など、すべての変更に対して統計が更新されます。個別に `updateStats()` を呼び出す必要がないため、実装がシンプルになります。

## まとめ

お疲れ様でした。今回は、TODOアプリに統計機能を追加しました。タスクの数を集計して表示することで、進捗状況を一目で把握できるようになりました。

今回学んだキーポイントは以下の通りです。

- **カウント処理**: 配列の `length` プロパティや `filter()` メソッドを使って、条件に一致する要素の数を数えることができます。これは統計情報を表示する基本的な方法です
- **集計**: 複数の統計情報を同時に計算し、画面に表示することで、ユーザーに有益な情報を提供できます。全体像を把握することで、タスク管理がしやすくなります
- **自動更新**: タスクが変更されるたびに統計情報を更新することで、常に最新の情報を表示できます。`renderTodos()` の中で更新することで、実装がシンプルになります
- **視覚的な表現**: 数字を大きく表示したり、プログレスバーを使ったりすることで、統計情報を視覚的に分かりやすく表現できます

統計機能は、多くのアプリケーションで使われています。ダッシュボード、分析ツール、プロジェクト管理ツールなど、データを集計して可視化することは、ユーザーにとって非常に価値があります。

次回は、TODOアプリの完成編です。これまでに実装したすべての機能を統合し、削除機能などの最終的な機能を追加して、完全なTODOアプリを完成させます。
