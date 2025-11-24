---
title: "Lesson 153: TODOアプリ（検索編）"
author: "JavaScript学習教材"
date: "2025-11-23"
---

# Lesson 153: TODOアプリ（検索編）

## 今回の学習

### 前回の復習

前回のレッスンでは、TODOアプリにカテゴリ機能を追加しました。具体的には以下の内容を学習しました。

- **データ構造**: オブジェクトのプロパティを増やして情報を拡張する
- **分類処理**: カテゴリごとにタスクを分類して表示する
- **動的なUI生成**: カテゴリのリストから動的にドロップダウンメニューを生成する

前回作成した「カテゴリ機能付きTODO」により、タスクを「仕事」「プライベート」「買い物」などのカテゴリに分類して管理できるようになりました。

### 今回の目標

今回は、TODOアプリに検索機能を追加します。タスクが増えてきたときに、キーワードで素早く目的のタスクを見つけられるようにすることで、より使いやすいアプリになります。

今回の学習で達成する目標は以下の通りです。

- **キーワードで検索**: 入力したキーワードでタスクを検索する
- **部分一致検索**: タスクのテキストに含まれるキーワードを検索する
- **検索結果を表示**: 検索条件に一致するタスクだけを表示する
- **検索のクリア**: 検索をクリアしてすべてのタスクを表示する

## 文字列検索の基礎

### なぜ検索機能が必要なのか

タスクが10個、20個と増えていくと、目的のタスクを見つけるのが大変になります。カテゴリやフィルターだけでは、特定のタスクを素早く見つけるのが難しい場合があります。

例えば、Gmailでは件名や本文でメールを検索できます。Amazonでは商品名で商品を検索できます。Googleドキュメントでは文書内の単語を検索できます。これらの検索機能により、大量の情報の中から必要なものを素早く見つけることができます。

TODOアプリでも同様に、「会議」というキーワードで会議関連のタスクを検索したり、「買う」というキーワードで買い物リストを検索したりできると便利です。

### 文字列の検索メソッド

JavaScriptの文字列には、検索に便利なメソッドがいくつかあります。

#### includes()メソッド

`includes()` メソッドは、文字列に特定の文字列が含まれているかを判定します。

```javascript
const text = '会議の資料を準備する';
const keyword = '会議';

console.log(text.includes(keyword)); // true

const keyword2 = '買い物';
console.log(text.includes(keyword2)); // false
```

このメソッドは、部分一致検索を実装するのに最適です。文字列の一部に検索キーワードが含まれていれば `true` を返します。

#### toLowerCase()で大文字小文字を無視

検索する際、大文字と小文字の違いを無視したい場合があります。`toLowerCase()` メソッドを使うと、文字列をすべて小文字に変換できます。

```javascript
const text = 'JavaScript学習';
const keyword = 'javascript';

// そのまま比較すると一致しない
console.log(text.includes(keyword)); // false

// 両方を小文字に変換してから比較
console.log(text.toLowerCase().includes(keyword.toLowerCase())); // true
```

このテクニックを使うことで、ユーザーが大文字で入力しても小文字で入力しても、正しく検索できるようになります。

### 配列のフィルターと組み合わせる

検索機能を実装するには、`filter()` メソッドと `includes()` メソッドを組み合わせます。

```javascript
const todos = [
  { text: '会議の資料を準備する', completed: false },
  { text: '買い物に行く', completed: false },
  { text: '会議に参加する', completed: true }
];

const keyword = '会議';

const searchResults = todos.filter(function(todo) {
  return todo.text.includes(keyword);
});

console.log(searchResults);
// [
//   { text: '会議の資料を準備する', completed: false },
//   { text: '会議に参加する', completed: true }
// ]
```

このように、`filter()` と `includes()` を組み合わせることで、キーワードを含むタスクだけを取り出すことができます。

## 検索UIの実装

### 検索ボックスの作成

検索キーワードを入力するための入力欄を追加します。

```html
<div id="search-container">
  <input type="text" id="search-input" placeholder="タスクを検索...">
  <button id="clear-search-btn">クリア</button>
</div>
```

検索ボックスと、検索をクリアするボタンを用意します。

### リアルタイム検索の実装

ユーザーが文字を入力するたびに、リアルタイムで検索結果を表示します。これには `input` イベントを使います。

```javascript
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', function() {
  renderTodos(); // 入力のたびにタスクを再描画
});
```

`input` イベントは、ユーザーが入力欄に文字を入力したり削除したりするたびに発火します。これにより、キーワードを入力しながらリアルタイムで検索結果が更新されます。

### 検索キーワードの取得

現在の検索キーワードを取得して、タスクをフィルターします。

```javascript
function getSearchKeyword() {
  const keyword = searchInput.value.trim();
  return keyword.toLowerCase(); // 小文字に変換
}
```

検索キーワードは、前後の空白を削除（`trim()`）し、小文字に変換（`toLowerCase()`）しておきます。

## 検索結果の表示

### 検索フィルターの実装

既存の `getFilteredTodos()` 関数に、検索機能を追加します。

```javascript
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
```

この関数では、まず検索キーワードでフィルターし、その後にカテゴリと完了状態でフィルターしています。複数の条件を順番に適用することで、詳細な絞り込みができます。

### 検索結果が0件の場合

検索結果が見つからない場合、ユーザーにメッセージを表示すると親切です。

```javascript
function renderTodos() {
  todoList.innerHTML = '';

  const filteredTodos = getFilteredTodos();

  // 検索結果が0件の場合
  if (filteredTodos.length === 0) {
    const message = document.createElement('li');
    message.textContent = 'タスクが見つかりませんでした';
    message.style.textAlign = 'center';
    message.style.color = '#999';
    todoList.appendChild(message);
    return;
  }

  // タスクを表示
  filteredTodos.forEach(function(todo) {
    // ... タスクを表示する処理
  });
}
```

このように、検索結果が空の場合に分かりやすいメッセージを表示することで、ユーザーエクスペリエンスが向上します。

## 検索のクリア

### クリアボタンの実装

検索をクリアして、すべてのタスクを再び表示できるようにします。

```javascript
const clearSearchBtn = document.getElementById('clear-search-btn');

clearSearchBtn.addEventListener('click', function() {
  searchInput.value = ''; // 検索ボックスをクリア
  renderTodos(); // タスクを再描画
});
```

クリアボタンをクリックすると、検索ボックスが空になり、すべてのタスクが表示されます。

### Escapeキーでクリア

キーボードのEscapeキーを押したときに、検索をクリアすることもできます。

```javascript
searchInput.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    searchInput.value = '';
    renderTodos();
  }
});
```

このように、複数の方法で検索をクリアできるようにすることで、ユーザーの好みに応じた操作が可能になります。

## 検索のハイライト表示

検索結果をより見やすくするために、一致したキーワードをハイライト表示することもできます（発展的な内容）。

```javascript
function highlightKeyword(text, keyword) {
  if (keyword === '') {
    return text;
  }

  // 大文字小文字を区別せずに検索
  const regex = new RegExp('(' + keyword + ')', 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// タスク表示時に使用
taskText.innerHTML = highlightKeyword(todo.text, getSearchKeyword());
```

`<mark>` タグで囲まれた部分は、ブラウザが自動的に黄色い背景で強調表示します。

## 複数フィルターの組み合わせ

検索機能、カテゴリフィルター、完了状態フィルターをすべて組み合わせることで、非常に柔軟な検索が可能になります。

例えば、以下のような使い方ができます。

- **「会議」というキーワードで検索 + 仕事カテゴリ + 未完了**: 仕事カテゴリの未完了タスクの中から、「会議」というキーワードを含むタスクだけを表示
- **「買う」というキーワードで検索 + すべてカテゴリ + 完了**: 完了したタスクの中から、「買う」というキーワードを含むタスクを表示

このように、複数の条件を組み合わせることで、大量のタスクの中から必要なものをピンポイントで見つけることができます。

## 検索のパフォーマンス

タスクの数が増えてくると、検索のパフォーマンスが気になる場合があります。しかし、数百個程度のタスクであれば、`filter()` と `includes()` の組み合わせで十分高速に動作します。

もしタスクが数千個以上になる場合は、以下のような最適化を考えることができます。

- **検索の遅延**: ユーザーが入力を止めてから少し待ってから検索を実行する（デバウンス）
- **インデックス化**: タスクのキーワードを事前にインデックス化しておく

ただし、一般的なTODOアプリの用途では、このような最適化は不要です。シンプルな実装で十分です。

## 練習問題

### 課題

検索機能付きTODOアプリを作成してください。キーワードでタスクを検索し、一致するタスクだけを表示できるようにします。

### 保存場所

`exercises/lesson-153/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. キーワードで検索
2. 部分一致検索
3. 検索結果を表示
4. 検索のクリア

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-153
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**検索機能の実装で迷ったら**

- 検索ボックス（`<input type="text">`）を追加します
- 検索ボックスの `input` イベントで、入力のたびにタスクを再描画します
- 検索キーワードは `trim()` で前後の空白を削除し、`toLowerCase()` で小文字に変換します

**部分一致検索の方法**

- 文字列の `includes()` メソッドを使います
- `todo.text.includes(keyword)` で、タスクのテキストにキーワードが含まれているか判定します
- 大文字小文字を区別しないために、両方を小文字に変換してから比較します

**検索結果の表示**

- `filter()` メソッドで、検索キーワードを含むタスクだけを取り出します
- 検索結果が0件の場合、「タスクが見つかりませんでした」というメッセージを表示すると親切です
- 検索キーワードが空文字列の場合は、すべてのタスクを表示します

**検索のクリア**

- クリアボタンを追加して、クリックしたら検索ボックスを空にします
- 検索ボックスが空になったら、自動的にすべてのタスクが表示されます
- Escapeキーでもクリアできるようにすると、より使いやすくなります

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 153</title>
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
        #clear-search-btn:hover {
            background-color: #5a6268;
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
            cursor: pointer;
            display: flex;
            align-items: center;
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
            margin-right: 10px;
            color: white;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
        }
        mark {
            background-color: yellow;
            padding: 0;
        }
    </style>
</head>
<body>
    <h1>TODOアプリ（検索編）</h1>

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

    // カテゴリバッジを作成
    const categoryBadge = document.createElement('span');
    categoryBadge.textContent = todo.category;
    categoryBadge.className = 'category-badge';
    categoryBadge.style.backgroundColor = categoryColors[todo.category] || '#999';

    // タスクテキストを作成
    const taskText = document.createElement('span');
    taskText.textContent = todo.text;

    li.appendChild(categoryBadge);
    li.appendChild(taskText);

    if (todo.completed) {
      li.classList.add('completed');
    }

    // クリックで完了/未完了を切り替え
    li.addEventListener('click', function() {
      const index = todos.findIndex(function(t) {
        return t.text === todo.text && t.category === todo.category;
      });
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    });

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

**検索キーワードの取得**

`getSearchKeyword()` 関数で、検索ボックスの値を取得し、前後の空白を削除して小文字に変換しています。これにより、大文字小文字を区別しない検索が可能になります。

**部分一致検索**

`includes()` メソッドを使って、タスクのテキストに検索キーワードが含まれているかを判定しています。両方を小文字に変換してから比較することで、大文字小文字を気にせず検索できます。

**リアルタイム検索**

検索ボックスの `input` イベントで、ユーザーが文字を入力するたびに `renderTodos()` を呼び出しています。これにより、入力しながらリアルタイムで検索結果が更新されます。

**検索のクリア**

クリアボタンをクリックすると、検索ボックスが空になり、すべてのタスクが再び表示されます。また、Escapeキーでもクリアできるようにして、キーボード操作にも対応しています。

**検索結果が0件の場合**

`filteredTodos.length === 0` の場合、「タスクが見つかりませんでした」というメッセージを表示しています。これにより、検索結果がないことがユーザーに明確に伝わります。

**複数フィルターの組み合わせ**

検索キーワード、カテゴリ、完了状態のすべてのフィルターを組み合わせることで、非常に柔軟な検索が可能になっています。

## まとめ

お疲れ様でした。今回は、TODOアプリに検索機能を追加しました。キーワードでタスクを検索できるようになり、大量のタスクの中から目的のものを素早く見つけられるようになりました。

今回学んだキーポイントは以下の通りです。

- **文字列検索**: `includes()` メソッドを使って、文字列に特定のキーワードが含まれているかを判定できます。部分一致検索を実装する基本的な方法です
- **配列操作**: `filter()` メソッドと文字列検索を組み合わせることで、条件に一致する要素だけを取り出せます。複数の条件を順番に適用することで、詳細な絞り込みができます
- **リアルタイム検索**: `input` イベントを使うことで、ユーザーが入力しながらリアルタイムで検索結果を表示できます。即座にフィードバックを返すことで、ユーザーエクスペリエンスが向上します
- **大文字小文字の処理**: `toLowerCase()` を使って文字列を小文字に変換することで、大文字小文字を区別しない検索ができます。ユーザーの入力方法に左右されない柔軟な検索が可能です

検索機能は、あらゆるアプリケーションで使われる基本的な機能です。メールアプリ、ECサイト、ドキュメント管理システムなど、大量のデータを扱うアプリでは必須の機能と言えます。

次回は、TODOアプリに編集機能を追加します。既存のタスクの内容を修正できるようにすることで、さらに実用的なアプリになります。
