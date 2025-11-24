---
title: "Lesson 151: TODOアプリ（フィルター編）"
author: "JavaScript学習教材"
date: "2025-11-23"
---

# Lesson 151: TODOアプリ（フィルター編）

## 今回の学習

### 前回の復習

前回のレッスンでは、localStorageを使ってTODOアプリのデータを永続化する方法を学びました。具体的には以下の内容を学習しました。

- **localStorage**: ブラウザにデータを保存する仕組み
- **JSON**: データをテキスト形式に変換する方法
- **データ永続化**: ページを再読み込みしてもデータが残る仕組み

前回作成した「データが残るTODOアプリ」により、ブラウザを閉じても、再度開いた時にタスクが保持されるようになりました。

### 今回の目標

今回は、TODOアプリにフィルター機能を追加します。タスクの状態（すべて/未完了/完了）に応じて表示を切り替えられるようにすることで、より実用的なアプリになります。

今回の学習で達成する目標は以下の通りです。

- **すべて表示**: すべてのタスクを表示する
- **未完了のみ表示**: 未完了のタスクだけを表示する
- **完了のみ表示**: 完了したタスクだけを表示する
- **ボタンで切り替え**: ボタンをクリックして表示を切り替える

## 配列のフィルター機能とは

### なぜフィルター機能が必要なのか

実際のTODOアプリを使っていると、タスクがどんどん増えていきます。完了したタスクと未完了のタスクが混在していると、今やるべきことが分かりにくくなってしまいます。

例えば、Gmailの受信トレイには「すべて」「未読」「既読」などのフィルターがあります。Amazonの注文履歴も「過去30日間」「過去3か月」などで絞り込めます。これらのフィルター機能により、必要な情報だけを素早く見つけることができます。

TODOアプリでも同じように、「今やるべきこと（未完了）だけを見たい」「完了したタスクを確認したい」といったニーズに応えるために、フィルター機能が重要になります。

### 配列のfilter()メソッド

JavaScriptの配列には、`filter()` というメソッドがあります。このメソッドは、配列の中から条件に合う要素だけを取り出して、新しい配列を作成します。

基本的な使い方は以下の通りです。

```javascript
// 数値の配列から10以上の数だけを取り出す
const numbers = [5, 12, 8, 20, 3];
const filtered = numbers.filter(function(num) {
  return num >= 10; // 10以上ならtrue
});

console.log(filtered); // [12, 20]
```

このコードでは、`filter()` メソッドが配列の各要素に対して関数を実行しています。関数が `true` を返した要素だけが新しい配列に含まれます。

TODOアプリに適用すると、以下のように使えます。

```javascript
// タスクの配列から未完了のものだけを取り出す
const todos = [
  { text: '買い物', completed: false },
  { text: '掃除', completed: true },
  { text: '勉強', completed: false }
];

const incompleteTodos = todos.filter(function(todo) {
  return todo.completed === false; // 未完了ならtrue
});

console.log(incompleteTodos);
// [{ text: '買い物', completed: false }, { text: '勉強', completed: false }]
```

このように、`filter()` を使うことで、特定の条件に合うタスクだけを簡単に取り出すことができます。

### 条件分岐による表示の切り替え

フィルター機能を実装するには、「どのフィルターが選択されているか」を管理する必要があります。これには条件分岐（if文）を使います。

```javascript
// 現在のフィルター状態を変数で管理
let currentFilter = 'all'; // 'all', 'active', 'completed'

// フィルターに応じてタスクを絞り込む
function getFilteredTodos() {
  if (currentFilter === 'all') {
    return todos; // すべて表示
  } else if (currentFilter === 'active') {
    return todos.filter(function(todo) {
      return todo.completed === false; // 未完了のみ
    });
  } else if (currentFilter === 'completed') {
    return todos.filter(function(todo) {
      return todo.completed === true; // 完了のみ
    });
  }
}
```

このように、`currentFilter` 変数の値に応じて、表示するタスクを切り替えることができます。

## ボタンでフィルターを切り替える

### ボタンの作成

フィルターを切り替えるために、3つのボタンを用意します。HTMLでは以下のように記述します。

```html
<div id="filter-buttons">
  <button id="filter-all">すべて</button>
  <button id="filter-active">未完了</button>
  <button id="filter-completed">完了</button>
</div>
```

それぞれのボタンにIDを設定することで、JavaScriptから個別に操作できるようにします。

### ボタンにイベントリスナーを追加

各ボタンがクリックされたときに、フィルターの状態を変更します。

```javascript
// 「すべて」ボタンのイベントリスナー
const filterAllBtn = document.getElementById('filter-all');
filterAllBtn.addEventListener('click', function() {
  currentFilter = 'all'; // フィルター状態を変更
  renderTodos(); // タスクを再描画
});

// 「未完了」ボタンのイベントリスナー
const filterActiveBtn = document.getElementById('filter-active');
filterActiveBtn.addEventListener('click', function() {
  currentFilter = 'active';
  renderTodos();
});

// 「完了」ボタンのイベントリスナー
const filterCompletedBtn = document.getElementById('filter-completed');
filterCompletedBtn.addEventListener('click', function() {
  currentFilter = 'completed';
  renderTodos();
});
```

ボタンをクリックすると、`currentFilter` の値が変わり、`renderTodos()` 関数が呼ばれてタスクが再描画されます。

### タスクの描画関数を更新

タスクを描画する関数では、フィルターされたタスクだけを表示するようにします。

```javascript
function renderTodos() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = ''; // 一旦クリア

  // フィルターされたタスクを取得
  const filteredTodos = getFilteredTodos();

  // 各タスクを表示
  filteredTodos.forEach(function(todo, index) {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.completed) {
      li.style.textDecoration = 'line-through';
    }
    todoList.appendChild(li);
  });
}
```

この関数では、`getFilteredTodos()` でフィルターされたタスクを取得してから、それらを画面に表示しています。

## フィルターボタンのスタイル

現在選択されているフィルターが分かりやすいように、ボタンの見た目を変更することもできます。

```javascript
function updateFilterButtons() {
  // すべてのボタンから active クラスを削除
  filterAllBtn.classList.remove('active');
  filterActiveBtn.classList.remove('active');
  filterCompletedBtn.classList.remove('active');

  // 現在のフィルターに対応するボタンに active クラスを追加
  if (currentFilter === 'all') {
    filterAllBtn.classList.add('active');
  } else if (currentFilter === 'active') {
    filterActiveBtn.classList.add('active');
  } else if (currentFilter === 'completed') {
    filterCompletedBtn.classList.add('active');
  }
}
```

CSSで `active` クラスに背景色や文字色を設定すれば、選択中のボタンが視覚的に分かりやすくなります。

```css
.active {
  background-color: #007bff;
  color: white;
}
```

## 実際の動作の流れ

フィルター機能が追加されたTODOアプリの動作を確認してみましょう。

1. **ページを開く**: localStorageからタスクを読み込み、すべてのタスクが表示されます
2. **「未完了」ボタンをクリック**: `currentFilter` が `'active'` に変わり、未完了のタスクだけが表示されます
3. **「完了」ボタンをクリック**: `currentFilter` が `'completed'` に変わり、完了したタスクだけが表示されます
4. **「すべて」ボタンをクリック**: `currentFilter` が `'all'` に戻り、すべてのタスクが表示されます

このように、ボタンをクリックするだけで、表示するタスクを簡単に切り替えることができます。

## 練習問題

### 課題

フィルター機能付きTODOアプリを作成してください。前回作成したlocalStorageによる保存機能に加えて、タスクの表示を切り替えるフィルター機能を実装します。

### 保存場所

`exercises/lesson-151/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. すべて表示
2. 未完了のみ表示
3. 完了のみ表示
4. ボタンで切り替え

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-151
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**フィルター機能の実装で迷ったら**

- まず、現在のフィルター状態を管理する変数 `currentFilter` を用意します（初期値は `'all'`）
- 3つのボタン（すべて、未完了、完了）をHTMLに追加し、それぞれにIDを設定します
- 各ボタンにクリックイベントリスナーを追加し、クリックされたら `currentFilter` を変更します
- タスクを描画する前に、`filter()` メソッドで配列をフィルターします

**filter()メソッドの使い方**

- `todos.filter(function(todo) { return 条件; })` という形で使います
- 未完了タスクのフィルター: `todo.completed === false`
- 完了タスクのフィルター: `todo.completed === true`
- すべて表示の場合は、フィルターせずに元の配列をそのまま使います

**ボタンの状態管理**

- フィルターを変更したら、必ず `renderTodos()` を呼んで画面を更新します
- 選択中のボタンが分かりやすいように、CSSクラスを追加・削除することもできます
- ボタンのスタイルを変更する場合は、`classList.add()` や `classList.remove()` を使います

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 151</title>
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
            margin-bottom: 20px;
        }
        #todo-input {
            flex: 1;
            padding: 10px;
            font-size: 16px;
        }
        #add-btn {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }
        #filter-buttons {
            margin-bottom: 20px;
            text-align: center;
        }
        #filter-buttons button {
            padding: 8px 16px;
            margin: 0 5px;
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
        }
        #todo-list li.completed {
            text-decoration: line-through;
            color: #999;
        }
    </style>
</head>
<body>
    <h1>TODOアプリ（フィルター編）</h1>

    <div id="input-container">
        <input type="text" id="todo-input" placeholder="新しいタスクを入力">
        <button id="add-btn">追加</button>
    </div>

    <div id="filter-buttons">
        <button id="filter-all" class="active">すべて</button>
        <button id="filter-active">未完了</button>
        <button id="filter-completed">完了</button>
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

// 現在のフィルター状態
let currentFilter = 'all'; // 'all', 'active', 'completed'

// DOM要素の取得
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const filterAllBtn = document.getElementById('filter-all');
const filterActiveBtn = document.getElementById('filter-active');
const filterCompletedBtn = document.getElementById('filter-completed');

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
  if (currentFilter === 'all') {
    return todos;
  } else if (currentFilter === 'active') {
    return todos.filter(function(todo) {
      return todo.completed === false;
    });
  } else if (currentFilter === 'completed') {
    return todos.filter(function(todo) {
      return todo.completed === true;
    });
  }
}

// タスクを画面に表示
function renderTodos() {
  todoList.innerHTML = '';

  const filteredTodos = getFilteredTodos();

  filteredTodos.forEach(function(todo, index) {
    const li = document.createElement('li');
    li.textContent = todo.text;

    if (todo.completed) {
      li.classList.add('completed');
    }

    // クリックで完了/未完了を切り替え
    li.addEventListener('click', function() {
      // 元の配列のインデックスを見つける
      const originalIndex = todos.findIndex(function(t) {
        return t.text === todo.text;
      });
      todos[originalIndex].completed = !todos[originalIndex].completed;
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

  if (text === '') {
    return;
  }

  todos.push({
    text: text,
    completed: false
  });

  todoInput.value = '';
  saveTodos();
  renderTodos();
}

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

**フィルター状態の管理**

`currentFilter` 変数で現在のフィルター状態を管理しています。値は `'all'`, `'active'`, `'completed'` の3つです。

**getFilteredTodos()関数**

この関数は、`currentFilter` の値に応じて適切なタスクの配列を返します。`filter()` メソッドを使って、条件に合うタスクだけを取り出しています。

**ボタンのイベントリスナー**

各フィルターボタンがクリックされたら、`currentFilter` を変更して `renderTodos()` を呼び出します。これにより、画面の表示が即座に更新されます。

**updateFilterButtons()関数**

選択中のボタンに `active` クラスを追加することで、どのフィルターが選ばれているかが視覚的に分かりやすくなります。

**完了状態の切り替え**

タスクをクリックすると完了/未完了が切り替わりますが、フィルター表示中の場合、元の配列（`todos`）の正しいインデックスを見つける必要があります。`findIndex()` メソッドを使って、元の配列での位置を特定しています。

## まとめ

お疲れ様でした。今回は、TODOアプリにフィルター機能を追加しました。これにより、タスクの状態に応じて表示を切り替えられるようになり、より実用的なアプリになりました。

今回学んだキーポイントは以下の通りです。

- **配列フィルター**: `filter()` メソッドを使って、条件に合う要素だけを取り出すことができます。これにより、大量のデータの中から必要なものだけを効率的に表示できます
- **条件分岐**: if文を使って、フィルターの種類に応じた処理を実行します。状態管理は、アプリケーションの振る舞いを制御する重要な要素です
- **動的な表示切り替え**: ボタンをクリックするだけで、画面の表示内容を即座に変更できます。これにより、ユーザーは自分が見たい情報だけを簡単に表示できます
- **視覚的なフィードバック**: 選択中のボタンにスタイルを適用することで、現在の状態が一目で分かるようにできます

フィルター機能は、多くのWebアプリケーションで使われている基本的な機能です。ECサイトの商品検索、メールの受信トレイ、SNSのタイムラインなど、さまざまな場面で活用されています。

次回は、TODOアプリにカテゴリ機能を追加します。タスクを「仕事」「プライベート」などのカテゴリに分類することで、さらに整理された使いやすいアプリになります。
