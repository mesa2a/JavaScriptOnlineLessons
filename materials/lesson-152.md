---
title: "Lesson 152: TODOアプリ（カテゴリ編）"
author: "JavaScript学習教材"
date: "2025-11-23"
---

# Lesson 152: TODOアプリ（カテゴリ編）

## 今回の学習

### 前回の復習

前回のレッスンでは、TODOアプリにフィルター機能を追加しました。具体的には以下の内容を学習しました。

- **配列フィルター**: `filter()` メソッドを使って条件に合う要素だけを取り出す
- **条件分岐**: if文でフィルターの種類に応じた処理を実行する
- **動的な表示切り替え**: ボタンクリックで画面の表示内容を変更する

前回作成した「フィルター機能付きTODO」により、すべて/未完了/完了のタスクを切り替えて表示できるようになりました。

### 今回の目標

今回は、TODOアプリにカテゴリ機能を追加します。タスクを「仕事」「プライベート」「買い物」などのカテゴリに分類することで、より整理された使いやすいアプリになります。

今回の学習で達成する目標は以下の通りです。

- **タスクにカテゴリを追加**: 各タスクにカテゴリ情報を持たせる
- **カテゴリ別に表示**: 選択したカテゴリのタスクだけを表示する
- **カテゴリを選択できる**: ドロップダウンやボタンでカテゴリを選択する
- **複数カテゴリの管理**: 複数のカテゴリを作成して管理する

## データ構造の拡張

### なぜカテゴリが必要なのか

実際にTODOアプリを使っていると、タスクが増えてくると管理が大変になります。仕事のタスク、家事のタスク、買い物リストなど、異なる種類のタスクが混在すると、どれを優先すべきか分かりにくくなります。

例えば、Gmailではメールをラベルやフォルダーで分類できます。Googleカレンダーでは予定をカテゴリ別に色分けできます。Trelloでは付箋をリストやボードで整理できます。これらのアプリでは、カテゴリ機能により情報を効率的に整理できています。

TODOアプリでも同様に、タスクをカテゴリで分類することで、見通しが良くなり、効率的にタスクを管理できるようになります。

### オブジェクトのプロパティを増やす

これまでのTODOアプリでは、各タスクは以下のような構造でした。

```javascript
{
  text: '買い物',
  completed: false
}
```

カテゴリ機能を追加するには、このオブジェクトに `category` プロパティを追加します。

```javascript
{
  text: '買い物',
  completed: false,
  category: 'プライベート'
}
```

このように、オブジェクトのプロパティを増やすことで、タスクに関する情報を拡張できます。データ構造を適切に設計することは、アプリケーション開発において非常に重要です。

### カテゴリの配列を管理する

アプリで使用できるカテゴリのリストも、配列で管理します。

```javascript
const categories = ['すべて', '仕事', 'プライベート', '買い物'];
```

この配列を使って、ドロップダウンメニューやボタンを動的に生成できます。新しいカテゴリを追加する場合も、この配列に要素を追加するだけで対応できます。

## カテゴリ選択UIの作成

### ドロップダウンメニュー（select要素）

カテゴリを選択するUIとして、ドロップダウンメニュー（`<select>` 要素）を使います。

```html
<select id="category-select">
  <option value="すべて">すべて</option>
  <option value="仕事">仕事</option>
  <option value="プライベート">プライベート</option>
  <option value="買い物">買い物</option>
</select>
```

JavaScriptでカテゴリの配列から動的に `<option>` を生成することもできます。

```javascript
const categorySelect = document.getElementById('category-select');

categories.forEach(function(category) {
  const option = document.createElement('option');
  option.value = category;
  option.textContent = category;
  categorySelect.appendChild(option);
});
```

このようにすることで、カテゴリを追加する際にHTMLを変更する必要がなくなります。

### タスク追加時のカテゴリ選択

タスクを追加する際に、どのカテゴリに属するかを選択できるようにします。

```html
<div id="input-container">
  <input type="text" id="todo-input" placeholder="新しいタスクを入力">
  <select id="new-task-category">
    <option value="仕事">仕事</option>
    <option value="プライベート">プライベート</option>
    <option value="買い物">買い物</option>
  </select>
  <button id="add-btn">追加</button>
</div>
```

タスクを追加する関数では、選択されたカテゴリも一緒に保存します。

```javascript
function addTodo() {
  const text = todoInput.value.trim();
  const category = document.getElementById('new-task-category').value;

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
```

## カテゴリでフィルター

### カテゴリに基づく分類処理

カテゴリフィルターを実装するために、現在選択されているカテゴリを管理する変数を用意します。

```javascript
let currentCategory = 'すべて';
```

カテゴリが選択されたときに、この変数を更新します。

```javascript
const categorySelect = document.getElementById('category-select');
categorySelect.addEventListener('change', function() {
  currentCategory = categorySelect.value;
  renderTodos();
});
```

`change` イベントは、ドロップダウンメニューの選択が変更されたときに発火します。

### カテゴリでタスクをフィルター

タスクを表示する前に、選択されたカテゴリに応じてフィルターします。

```javascript
function getFilteredTodos() {
  let filtered = todos;

  // カテゴリでフィルター
  if (currentCategory !== 'すべて') {
    filtered = filtered.filter(function(todo) {
      return todo.category === currentCategory;
    });
  }

  // 完了状態でフィルター（前回の機能）
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

この関数では、まずカテゴリでフィルターし、その後に完了状態でフィルターしています。複数の条件を組み合わせることで、より詳細な絞り込みが可能になります。

## カテゴリの表示

### タスクにカテゴリを表示

各タスクの横に、そのタスクがどのカテゴリに属しているかを表示すると分かりやすくなります。

```javascript
function renderTodos() {
  todoList.innerHTML = '';

  const filteredTodos = getFilteredTodos();

  filteredTodos.forEach(function(todo) {
    const li = document.createElement('li');

    // カテゴリバッジを作成
    const categoryBadge = document.createElement('span');
    categoryBadge.textContent = todo.category;
    categoryBadge.className = 'category-badge';

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
}
```

CSSでカテゴリバッジのスタイルを設定すると、より見やすくなります。

```css
.category-badge {
  display: inline-block;
  padding: 2px 8px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border-radius: 12px;
  font-size: 12px;
}
```

### カテゴリごとに色分け

カテゴリごとに異なる色を設定することで、視覚的に区別しやすくなります。

```javascript
function getCategoryColor(category) {
  const colors = {
    '仕事': '#ff6b6b',
    'プライベート': '#4ecdc4',
    '買い物': '#ffe66d'
  };
  return colors[category] || '#999';
}

// カテゴリバッジに色を適用
categoryBadge.style.backgroundColor = getCategoryColor(todo.category);
```

このようにカテゴリごとに色を変えることで、一目でどのカテゴリのタスクか判断できるようになります。

## 複数カテゴリの管理

### カテゴリの動的追加

より柔軟なアプリにするために、ユーザーが新しいカテゴリを追加できるようにすることもできます。

```javascript
function addCategory(categoryName) {
  if (categoryName === '' || categories.includes(categoryName)) {
    return; // 空文字や既存のカテゴリは追加しない
  }

  categories.push(categoryName);
  updateCategorySelects(); // ドロップダウンを更新
  saveCategories(); // localStorageに保存
}
```

### カテゴリの保存と読み込み

カテゴリのリストもlocalStorageに保存することで、ページを再読み込みしても維持できます。

```javascript
function saveCategories() {
  localStorage.setItem('categories', JSON.stringify(categories));
}

function loadCategories() {
  const saved = localStorage.getItem('categories');
  if (saved) {
    categories = JSON.parse(saved);
  }
}
```

## カテゴリフィルターと完了フィルターの組み合わせ

カテゴリフィルターと完了状態フィルター（前回実装）を組み合わせることで、より細かい条件でタスクを絞り込めます。

例えば、「仕事カテゴリの未完了タスクだけを表示」といった使い方ができます。

```javascript
// カテゴリ: 仕事、フィルター: 未完了
// → 仕事の未完了タスクのみ表示

// カテゴリ: すべて、フィルター: 完了
// → すべてのカテゴリの完了タスクを表示
```

このように、複数のフィルター条件を組み合わせることで、柔軟な検索が可能になります。

## 練習問題

### 課題

カテゴリ機能付きTODOアプリを作成してください。タスクにカテゴリ情報を追加し、カテゴリごとに表示や管理ができるようにします。

### 保存場所

`exercises/lesson-152/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. タスクにカテゴリを追加
2. カテゴリ別に表示
3. カテゴリを選択できる
4. 複数カテゴリの管理

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-152
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**カテゴリの追加で迷ったら**

- タスクオブジェクトに `category` プロパティを追加します
- カテゴリのリストを配列で管理します（例: `['すべて', '仕事', 'プライベート', '買い物']`）
- タスク追加時に、選択されたカテゴリも一緒に保存します

**カテゴリでフィルターする方法**

- 現在選択されているカテゴリを変数で管理します（例: `currentCategory`）
- ドロップダウンメニューの `change` イベントでカテゴリを切り替えます
- `filter()` メソッドで、選択されたカテゴリに一致するタスクだけを取り出します
- 「すべて」が選択されている場合は、フィルターせずにすべてのタスクを表示します

**カテゴリの表示**

- 各タスクにカテゴリバッジを追加して、どのカテゴリに属しているか分かりやすくします
- `<span>` 要素を使ってカテゴリ名を表示し、CSSでスタイルを設定します
- カテゴリごとに色を変えると、視覚的に区別しやすくなります

**複数フィルターの組み合わせ**

- カテゴリフィルターと完了状態フィルターを組み合わせる場合、段階的にフィルターします
- まずカテゴリでフィルターし、その結果をさらに完了状態でフィルターします
- `filter()` メソッドは連鎖して使うことができます

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 152</title>
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
        .category-badge {
            display: inline-block;
            padding: 3px 10px;
            margin-right: 10px;
            color: white;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>TODOアプリ（カテゴリ編）</h1>

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

// フィルターに応じたタスクを取得
function getFilteredTodos() {
  let filtered = todos;

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

**データ構造の拡張**

各タスクオブジェクトに `category` プロパティを追加しました。これにより、タスクがどのカテゴリに属しているかを管理できるようになります。

**カテゴリでのフィルター**

`getFilteredTodos()` 関数では、まずカテゴリでフィルターし、その後に完了状態でフィルターしています。複数の条件を組み合わせることで、より細かい絞り込みができます。

**カテゴリの選択UI**

タスク追加時に `<select>` 要素でカテゴリを選択できるようにしました。また、表示するタスクを絞り込むためのカテゴリフィルターも追加しました。

**カテゴリバッジの表示**

各タスクにカテゴリバッジを表示することで、どのカテゴリに属しているか一目で分かるようにしました。カテゴリごとに色を変えることで、視覚的にも区別しやすくなっています。

**複数カテゴリの管理**

`categories` 配列でカテゴリのリストを管理しています。この配列を使って、ドロップダウンメニューのオプションを動的に生成することもできます。

## まとめ

お疲れ様でした。今回は、TODOアプリにカテゴリ機能を追加しました。タスクを分類して管理できるようになり、より実用的なアプリに近づきました。

今回学んだキーポイントは以下の通りです。

- **データ構造**: オブジェクトのプロパティを増やすことで、より多くの情報を管理できます。適切なデータ構造を設計することは、アプリケーション開発の基本です
- **分類処理**: `filter()` メソッドと条件分岐を組み合わせて、カテゴリごとにタスクを分類できます。複数の条件を組み合わせることで、柔軟な検索が可能になります
- **動的なUI生成**: カテゴリのリストから動的にドロップダウンメニューを生成することで、カテゴリの追加や変更に柔軟に対応できます
- **視覚的な区別**: カテゴリバッジや色分けにより、タスクの分類が一目で分かるようになります。ユーザビリティの向上に重要な要素です

カテゴリ機能は、多くのアプリケーションで使われています。メールアプリのフォルダー分け、ファイル管理のディレクトリ構造、ECサイトの商品カテゴリなど、情報を整理するための基本的な仕組みです。

次回は、TODOアプリに検索機能を追加します。キーワードでタスクを検索できるようにすることで、大量のタスクの中から目的のものを素早く見つけられるようになります。
