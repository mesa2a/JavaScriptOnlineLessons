---
title: "Lesson 154: TODOアプリ（編集編）"
author: "JavaScript学習教材"
date: "2025-11-23"
---

# Lesson 154: TODOアプリ（編集編）

## 今回の学習

### 前回の復習

前回のレッスンでは、TODOアプリに検索機能を追加しました。具体的には以下の内容を学習しました。

- **文字列検索**: `includes()` メソッドを使って部分一致検索を実装する
- **配列操作**: `filter()` メソッドと文字列検索を組み合わせて条件に一致する要素を取り出す
- **リアルタイム検索**: `input` イベントで入力しながら検索結果を表示する

前回作成した「検索機能付きTODO」により、キーワードでタスクを素早く見つけられるようになりました。

### 今回の目標

今回は、TODOアプリに編集機能を追加します。一度作成したタスクの内容を後から変更できるようにすることで、より実用的なアプリになります。

今回の学習で達成する目標は以下の通りです。

- **タスクの編集機能**: 既存のタスクの内容を変更できるようにする
- **テキストを変更**: タスクのテキストを編集する
- **編集の保存とキャンセル**: 変更を保存するか、キャンセルして元に戻す
- **入力欄の切り替え**: 通常表示と編集モードを切り替える

## 動的な画面更新

### なぜ編集機能が必要なのか

実際にTODOアプリを使っていると、タスクを追加した後に内容を修正したくなることがあります。例えば、「買い物」というタスクを「スーパーで牛乳を買う」と詳しく書き直したい場合や、誤字を修正したい場合などです。

編集機能がない場合、タスクを削除して新しく追加し直す必要があり、とても不便です。Gmail、Googleドキュメント、Trelloなど、ほとんどのアプリケーションでは、一度作成したコンテンツを後から編集できます。

TODOアプリでも編集機能を実装することで、ユーザーは柔軟にタスクを管理できるようになります。

### 編集モードと通常モード

編集機能を実装するには、各タスクに「通常モード」と「編集モード」という2つの状態を持たせます。

- **通常モード**: タスクのテキストを表示するだけ
- **編集モード**: 入力欄が表示され、テキストを編集できる

ユーザーがタスクをダブルクリックしたり、編集ボタンをクリックしたりすると、編集モードに切り替わります。

```javascript
// 各タスクの状態を管理
let editingIndex = -1; // 現在編集中のタスクのインデックス（-1は編集していない状態）
```

この変数を使って、どのタスクが編集モードなのかを管理します。

### 画面の動的な切り替え

JavaScriptで画面を動的に更新するには、DOM要素を作り替えます。

**通常モード:**
```html
<li>
  <span>買い物に行く</span>
  <button>編集</button>
</li>
```

**編集モード:**
```html
<li>
  <input type="text" value="買い物に行く">
  <button>保存</button>
  <button>キャンセル</button>
</li>
```

このように、同じタスクでも状態に応じて異なるHTMLを表示します。

## 編集機能の実装

### 編集ボタンの追加

各タスクに編集ボタンを追加します。

```javascript
function renderTodos() {
  todoList.innerHTML = '';

  const filteredTodos = getFilteredTodos();

  filteredTodos.forEach(function(todo, index) {
    const li = document.createElement('li');

    // タスクのテキスト
    const taskText = document.createElement('span');
    taskText.textContent = todo.text;

    // 編集ボタン
    const editBtn = document.createElement('button');
    editBtn.textContent = '編集';
    editBtn.className = 'edit-btn';

    li.appendChild(taskText);
    li.appendChild(editBtn);

    todoList.appendChild(li);
  });
}
```

編集ボタンをクリックすると、編集モードに切り替わるようにします。

### 編集モードへの切り替え

編集ボタンがクリックされたら、`editingIndex` を設定して画面を再描画します。

```javascript
editBtn.addEventListener('click', function(e) {
  e.stopPropagation(); // タスクのクリックイベントが発火しないようにする
  editingIndex = todos.indexOf(todo);
  renderTodos();
});
```

`e.stopPropagation()` は、イベントの伝播を止めるメソッドです。これがないと、ボタンをクリックしたときに親要素（`<li>`）のクリックイベントも発火してしまいます。

### 編集モードの表示

`editingIndex` が設定されている場合、そのタスクを編集モードで表示します。

```javascript
filteredTodos.forEach(function(todo, index) {
  const li = document.createElement('li');

  // 元の配列でのインデックスを取得
  const originalIndex = todos.indexOf(todo);

  // 編集モード
  if (originalIndex === editingIndex) {
    // 入力欄
    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo.text;
    input.className = 'edit-input';

    // 保存ボタン
    const saveBtn = document.createElement('button');
    saveBtn.textContent = '保存';
    saveBtn.className = 'save-btn';

    // キャンセルボタン
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'キャンセル';
    cancelBtn.className = 'cancel-btn';

    li.appendChild(input);
    li.appendChild(saveBtn);
    li.appendChild(cancelBtn);
  } else {
    // 通常モード
    const taskText = document.createElement('span');
    taskText.textContent = todo.text;

    const editBtn = document.createElement('button');
    editBtn.textContent = '編集';

    li.appendChild(taskText);
    li.appendChild(editBtn);
  }

  todoList.appendChild(li);
});
```

このように、条件分岐を使って、編集モードと通常モードで異なる要素を表示します。

## 編集の保存とキャンセル

### 保存ボタンの実装

保存ボタンがクリックされたら、入力欄の値をタスクに反映します。

```javascript
saveBtn.addEventListener('click', function() {
  const newText = input.value.trim();

  if (newText === '') {
    alert('タスクを入力してください');
    return;
  }

  // タスクのテキストを更新
  todos[originalIndex].text = newText;
  saveTodos(); // localStorageに保存

  // 編集モードを終了
  editingIndex = -1;
  renderTodos();
});
```

空のテキストは保存できないようにバリデーションを追加しています。

### キャンセルボタンの実装

キャンセルボタンがクリックされたら、変更を破棄して編集モードを終了します。

```javascript
cancelBtn.addEventListener('click', function() {
  // 編集モードを終了（変更は保存しない）
  editingIndex = -1;
  renderTodos();
});
```

キャンセルの場合は、タスクの配列を変更せずに、単に編集モードを終了するだけです。

### Enterキーで保存、Escapeキーでキャンセル

入力欄でEnterキーを押したら保存、Escapeキーを押したらキャンセルできるようにすると、操作性が向上します。

```javascript
input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    // Enterキーで保存
    saveBtn.click();
  } else if (e.key === 'Escape') {
    // Escapeキーでキャンセル
    cancelBtn.click();
  }
});
```

このように、複数の方法で操作できるようにすることで、ユーザーの好みに応じた使い方が可能になります。

### 編集中の入力欄に自動フォーカス

編集モードに切り替わったとき、自動的に入力欄にフォーカスが当たると便利です。

```javascript
// 編集モードの入力欄を表示後
input.focus();
input.select(); // テキストを全選択
```

`focus()` メソッドで入力欄にフォーカスを当て、`select()` メソッドでテキストを全選択します。これにより、すぐに入力を開始できます。

## 状態管理の重要性

### 編集中のインデックス管理

`editingIndex` 変数は、アプリケーションの「状態」を管理する重要な役割を果たしています。この変数の値によって、画面の表示が変わります。

```javascript
// 状態の種類
editingIndex = -1;  // どのタスクも編集していない
editingIndex = 0;   // 1番目のタスクを編集中
editingIndex = 2;   // 3番目のタスクを編集中
```

状態管理は、複雑なアプリケーションを作る上で非常に重要な概念です。React、Vue、Angularなどのモダンなフレームワークも、状態管理を中心に設計されています。

### 複数のタスクを同時に編集しない

`editingIndex` を使うことで、一度に1つのタスクしか編集できないようにしています。これは意図的な設計です。

複数のタスクを同時に編集できるようにすることも技術的には可能ですが、UIが複雑になり、ユーザーが混乱する可能性があります。シンプルな設計を保つことも重要です。

## ダブルクリックで編集開始

編集ボタンの他に、タスクをダブルクリックして編集を開始できるようにすることもできます。

```javascript
taskText.addEventListener('dblclick', function() {
  editingIndex = todos.indexOf(todo);
  renderTodos();
});
```

`dblclick` イベントは、要素が素早く2回クリックされたときに発火します。多くのアプリケーション（Windowsのファイル名変更など）でダブルクリックによる編集が使われているため、ユーザーにとって直感的な操作方法です。

## 編集中の表示スタイル

編集中のタスクが分かりやすいように、CSSでスタイルを設定します。

```css
.edit-input {
  flex: 1;
  padding: 5px;
  font-size: 16px;
  border: 2px solid #007bff;
}

.save-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
```

保存ボタンは緑、キャンセルボタンは赤にすることで、それぞれの役割が視覚的に分かりやすくなります。

## 練習問題

### 課題

編集機能付きTODOアプリを作成してください。既存のタスクをクリックして編集し、変更を保存またはキャンセルできるようにします。

### 保存場所

`exercises/lesson-154/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. タスクの編集機能
2. テキストを変更
3. 編集の保存とキャンセル
4. 入力欄の切り替え

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-154
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**編集機能の実装で迷ったら**

- 現在編集中のタスクのインデックスを管理する変数（例: `editingIndex`）を用意します
- 各タスクに編集ボタンを追加します
- 編集ボタンがクリックされたら、そのタスクのインデックスを `editingIndex` に設定します

**編集モードの表示**

- タスクを表示する際、`editingIndex` と比較して編集モードかどうかを判定します
- 編集モードの場合は、`<input>` 要素と保存・キャンセルボタンを表示します
- 通常モードの場合は、タスクのテキストと編集ボタンを表示します

**保存とキャンセル**

- 保存ボタンがクリックされたら、入力欄の値でタスクを更新します
- 空のテキストは保存できないようにバリデーションを追加します
- キャンセルボタンがクリックされたら、変更を破棄して編集モードを終了します
- Enterキーで保存、Escapeキーでキャンセルできるようにすると便利です

**入力欄の自動フォーカス**

- 編集モードに切り替わったら、`focus()` メソッドで入力欄にフォーカスを当てます
- `select()` メソッドでテキストを全選択すると、すぐに入力を開始できます

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 154</title>
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
            margin-bottom: 20px;
        }
        #todo-input {
            flex: 1;
            padding: 10px;
            font-size: 16px;
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
        .delete-btn {
            background-color: #6c757d;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>TODOアプリ（編集編）</h1>

    <div id="search-container">
        <input type="text" id="search-input" placeholder="タスクを検索...">
        <button id="clear-search-btn">クリア</button>
    </div>

    <div id="input-container">
        <input type="text" id="todo-input" placeholder="新しいタスクを入力">
        <select id="new-task-category">
            <option value="仕事">仕事</option>
            <option value="プライベート">プライベート</option>
            <option value="買い物">買い物</option>
        </select>
        <button id="add-btn">追加</button>
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

// DOM要素の取得
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

      // 保存ボタン
      const saveBtn = document.createElement('button');
      saveBtn.textContent = '保存';
      saveBtn.className = 'save-btn';

      saveBtn.addEventListener('click', function() {
        const newText = input.value.trim();

        if (newText === '') {
          alert('タスクを入力してください');
          return;
        }

        todos[originalIndex].text = newText;
        saveTodos();
        editingIndex = -1;
        renderTodos();
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

  if (text === '') {
    return;
  }

  todos.push({
    text: text,
    completed: false,
    category: category
  });

  todoInput.value = '';
  saveTodos();
  renderTodos();
}

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

**編集状態の管理**

`editingIndex` 変数で、現在編集中のタスクのインデックスを管理しています。`-1` は編集していない状態を表します。

**編集モードと通常モードの切り替え**

タスクを表示する際、`originalIndex === editingIndex` で現在編集中かどうかを判定し、編集モードと通常モードで異なる要素を表示しています。

**保存とキャンセル**

保存ボタンがクリックされたら、入力欄の値でタスクを更新し、`editingIndex` を `-1` にして編集モードを終了します。キャンセルボタンは、変更を破棄して編集モードを終了するだけです。

**キーボード操作**

Enterキーで保存、Escapeキーでキャンセルできるようにすることで、マウスを使わずにキーボードだけで操作できます。

**自動フォーカス**

`setTimeout` を使って、DOM更新後に入力欄にフォーカスを当てています。`select()` でテキストを全選択することで、すぐに入力を開始できます。

**ダブルクリックで編集**

タスクのテキストをダブルクリックすると編集モードに切り替わるようにしています。これは多くのアプリケーションで使われている直感的な操作方法です。

## まとめ

お疲れ様でした。今回は、TODOアプリに編集機能を追加しました。既存のタスクの内容を変更できるようになり、より実用的なアプリになりました。

今回学んだキーポイントは以下の通りです。

- **動的な画面更新**: 状態に応じて画面の表示を動的に切り替えることができます。同じタスクでも、編集モードと通常モードで異なるHTMLを表示することで、柔軟なUIを実現できます
- **状態管理**: `editingIndex` のような変数で、アプリケーションの状態を管理します。状態管理は、複雑なアプリケーションを作る上で非常に重要な概念です
- **イベント伝播の制御**: `stopPropagation()` を使ってイベントの伝播を止めることで、意図しない動作を防げます
- **ユーザビリティの向上**: キーボードショートカット、自動フォーカス、ダブルクリックなど、複数の操作方法を提供することで、ユーザーにとって使いやすいアプリになります

編集機能は、ほとんどのCRUD（Create, Read, Update, Delete）アプリケーションで必要な機能です。今回学んだパターンは、他のアプリケーションでも応用できます。

次回は、TODOアプリにバリデーション機能を追加します。空のタスクや重複したタスクを防ぐことで、データの品質を保ちます。
