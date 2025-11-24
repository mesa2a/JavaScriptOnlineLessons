---
title: "Lesson 155: TODOアプリ（バリデーション編）"
author: "JavaScript学習教材"
date: "2025-11-23"
---

# Lesson 155: TODOアプリ（バリデーション編）

## 今回の学習

### 前回の復習

前回のレッスンでは、TODOアプリに編集機能を追加しました。具体的には以下の内容を学習しました。

- **動的な画面更新**: 状態に応じて画面の表示を動的に切り替える
- **状態管理**: `editingIndex` のような変数でアプリケーションの状態を管理する
- **イベント伝播の制御**: `stopPropagation()` を使ってイベントの伝播を止める

前回作成した「編集機能付きTODO」により、既存のタスクの内容を後から変更できるようになりました。

### 今回の目標

今回は、TODOアプリにバリデーション機能を追加します。ユーザーの入力をチェックして、不正なデータを防ぐことで、より堅牢なアプリになります。

今回の学習で達成する目標は以下の通りです。

- **空のタスクを防ぐ**: 空文字列のタスクを追加できないようにする
- **長すぎるタスクを防ぐ**: 一定の文字数を超えるタスクを防ぐ
- **エラーメッセージを表示**: ユーザーにエラーの内容を分かりやすく伝える
- **入力チェック**: リアルタイムで入力内容をチェックする

## バリデーションとは

### なぜバリデーションが必要なのか

バリデーション（入力検証）は、ユーザーが入力したデータが正しいかどうかをチェックする処理です。バリデーションがないと、以下のような問題が発生します。

- **空のタスク**: 何も入力せずに追加ボタンを押すと、空のタスクが作成される
- **異常に長いタスク**: 1000文字のタスクなど、画面表示が崩れる原因になる
- **不正なデータ**: データベースやlocalStorageに不正なデータが保存される

例えば、Twitterでは140文字（現在は280文字）の制限があります。Gmailでは添付ファイルのサイズ制限があります。オンラインフォームでは必須項目のチェックがあります。これらはすべてバリデーションの例です。

適切なバリデーションを実装することで、データの品質を保ち、ユーザーエクスペリエンスを向上させることができます。

### バリデーションの種類

主なバリデーションの種類は以下の通りです。

- **必須チェック**: 空でないことを確認する
- **長さチェック**: 最小・最大文字数を確認する
- **形式チェック**: メールアドレス、電話番号などの形式を確認する
- **範囲チェック**: 数値が一定の範囲内にあることを確認する
- **重複チェック**: すでに存在するデータでないことを確認する

今回のTODOアプリでは、必須チェックと長さチェックを実装します。

## 空のタスクを防ぐ

### trim()メソッドの重要性

ユーザーがスペースだけを入力した場合も、空のタスクとして扱うべきです。`trim()` メソッドを使って、前後の空白を削除します。

```javascript
const text = todoInput.value.trim();

if (text === '') {
  // 空のタスクは追加しない
  return;
}
```

`trim()` を使うことで、以下のような入力をすべて空文字列として扱えます。

```javascript
''.trim()         // ''
'   '.trim()      // ''
'  \n  '.trim()   // ''
```

### エラーメッセージの表示

空のタスクを追加しようとしたとき、ユーザーにエラーメッセージを表示します。

```javascript
if (text === '') {
  showError('タスクを入力してください');
  return;
}
```

エラーメッセージを表示する関数を作成します。

```javascript
function showError(message) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';

  // 3秒後に自動で消す
  setTimeout(function() {
    errorDiv.style.display = 'none';
  }, 3000);
}
```

この関数は、エラーメッセージを表示し、3秒後に自動的に非表示にします。

### エラーメッセージのHTML

エラーメッセージを表示するための要素をHTMLに追加します。

```html
<div id="error-message" style="display: none;">
  <!-- エラーメッセージがここに表示される -->
</div>
```

CSSでスタイルを設定します。

```css
#error-message {
  background-color: #dc3545;
  color: white;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  text-align: center;
}
```

赤い背景に白文字で、エラーメッセージが目立つようにします。

## 長すぎるタスクを防ぐ

### 最大文字数の設定

タスクの最大文字数を設定します。

```javascript
const MAX_TASK_LENGTH = 100; // 最大100文字
```

この定数を使って、入力チェックを行います。

### 文字数チェック

タスクを追加する前に、文字数をチェックします。

```javascript
if (text.length > MAX_TASK_LENGTH) {
  showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください（現在：' + text.length + '文字）');
  return;
}
```

エラーメッセージには、制限文字数と現在の文字数を表示することで、ユーザーがどれだけ削減すればよいか分かりやすくなります。

### 入力欄の文字数制限

HTMLの `maxlength` 属性を使って、入力欄で入力できる文字数を制限することもできます。

```html
<input type="text" id="todo-input" maxlength="100">
```

ただし、これだけではJavaScriptで直接値を設定した場合に対応できないため、JavaScript側でもチェックを行います。

## リアルタイム入力チェック

### 文字数カウンターの表示

ユーザーが入力しながら、残りの文字数を表示すると親切です。

```html
<div id="char-counter">
  <span id="char-count">0</span> / 100
</div>
```

入力のたびに文字数を更新します。

```javascript
todoInput.addEventListener('input', function() {
  const length = todoInput.value.length;
  const charCount = document.getElementById('char-count');
  charCount.textContent = length;

  // 制限を超えたら赤くする
  if (length > MAX_TASK_LENGTH) {
    charCount.style.color = 'red';
  } else {
    charCount.style.color = 'black';
  }
});
```

このように、リアルタイムで入力内容をチェックすることで、ユーザーは送信前にエラーに気づくことができます。

### 入力欄の視覚的フィードバック

文字数が制限を超えたら、入力欄の枠を赤くすることもできます。

```javascript
if (length > MAX_TASK_LENGTH) {
  todoInput.style.borderColor = 'red';
} else {
  todoInput.style.borderColor = '#ccc';
}
```

視覚的なフィードバックにより、ユーザーはエラーの状態を直感的に理解できます。

## 重複チェック

### 同じタスクの追加を防ぐ

すでに存在するタスクと同じ内容のタスクを追加できないようにします。

```javascript
// すでに同じテキストのタスクが存在するかチェック
const isDuplicate = todos.some(function(todo) {
  return todo.text.toLowerCase() === text.toLowerCase();
});

if (isDuplicate) {
  showError('同じタスクがすでに存在します');
  return;
}
```

`some()` メソッドは、配列の要素のうち、少なくとも1つが条件を満たす場合に `true` を返します。大文字小文字を区別しないために、`toLowerCase()` で統一してから比較しています。

### 重複チェックの注意点

重複チェックは、完了したタスクも含めて行うか、未完了のタスクだけを対象にするかを考慮する必要があります。

```javascript
// 未完了のタスクのみをチェック
const isDuplicate = todos.some(function(todo) {
  return !todo.completed && todo.text.toLowerCase() === text.toLowerCase();
});
```

一般的には、完了したタスクと同じ内容のタスクを再度追加することは許可する場合が多いです。

## エラー処理のベストプラクティス

### 複数のバリデーションの順序

複数のバリデーションを行う場合、チェックする順序が重要です。

```javascript
function addTodo() {
  const text = todoInput.value.trim();

  // 1. 空チェック（最初に行う）
  if (text === '') {
    showError('タスクを入力してください');
    return;
  }

  // 2. 長さチェック
  if (text.length > MAX_TASK_LENGTH) {
    showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください');
    return;
  }

  // 3. 重複チェック
  const isDuplicate = todos.some(function(todo) {
    return todo.text.toLowerCase() === text.toLowerCase();
  });

  if (isDuplicate) {
    showError('同じタスクがすでに存在します');
    return;
  }

  // すべてのバリデーションを通過したら追加
  todos.push({
    text: text,
    completed: false,
    category: newTaskCategory.value
  });

  todoInput.value = '';
  saveTodos();
  renderTodos();
}
```

基本的なチェック（空チェック）を最初に行い、より複雑なチェック（重複チェック）を後で行うのが一般的です。

### 成功メッセージの表示

エラーだけでなく、成功した場合もフィードバックを返すことができます。

```javascript
function showSuccess(message) {
  const successDiv = document.getElementById('success-message');
  successDiv.textContent = message;
  successDiv.style.display = 'block';

  setTimeout(function() {
    successDiv.style.display = 'none';
  }, 2000);
}

// タスク追加後
showSuccess('タスクを追加しました');
```

ただし、成功メッセージを表示しすぎると煩わしいので、必要な場合だけ使うようにします。

## 編集時のバリデーション

### 編集でも同じバリデーションを適用

タスクを編集する際にも、同じバリデーションルールを適用します。

```javascript
saveBtn.addEventListener('click', function() {
  const newText = input.value.trim();

  // 空チェック
  if (newText === '') {
    showError('タスクを入力してください');
    return;
  }

  // 長さチェック
  if (newText.length > MAX_TASK_LENGTH) {
    showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください');
    return;
  }

  // 重複チェック（自分自身は除外）
  const isDuplicate = todos.some(function(todo, index) {
    return index !== originalIndex &&
           todo.text.toLowerCase() === newText.toLowerCase();
  });

  if (isDuplicate) {
    showError('同じタスクがすでに存在します');
    return;
  }

  // バリデーション通過
  todos[originalIndex].text = newText;
  saveTodos();
  editingIndex = -1;
  renderTodos();
});
```

編集時の重複チェックでは、自分自身のインデックスを除外する必要があります。

## 練習問題

### 課題

堅牢なTODOアプリを作成してください。バリデーション機能を追加して、不正な入力を防ぎ、適切なエラーメッセージを表示します。

### 保存場所

`exercises/lesson-155/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. 空のタスクを防ぐ
2. 長すぎるタスクを防ぐ
3. エラーメッセージを表示
4. 入力チェック

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-155
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**空のタスクを防ぐ**

- `trim()` メソッドで前後の空白を削除します
- 空文字列の場合は、エラーメッセージを表示して `return` します
- タスクを追加する関数と編集保存の関数の両方で実装します

**長さチェック**

- 最大文字数を定数で定義します（例: `MAX_TASK_LENGTH = 100`）
- `text.length` で文字数を取得し、最大値と比較します
- エラーメッセージには、制限文字数と現在の文字数を表示すると親切です

**エラーメッセージの表示**

- エラーメッセージを表示するための要素をHTMLに追加します
- `showError()` 関数を作成して、エラーメッセージを表示します
- `setTimeout()` を使って、一定時間後に自動で非表示にします

**リアルタイム入力チェック**

- 入力欄の `input` イベントで、入力のたびに文字数をチェックします
- 文字数カウンターを表示して、残りの文字数を表示します
- 制限を超えたら、視覚的なフィードバック（赤文字、赤枠など）を表示します

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 155</title>
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
    <h1>TODOアプリ（バリデーション編）</h1>

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

**空のタスクを防ぐ**

`trim()` メソッドで前後の空白を削除してから、空文字列かどうかをチェックしています。空の場合は、エラーメッセージを表示して処理を中断します。

**長さチェック**

`MAX_TASK_LENGTH` 定数で最大文字数を定義し、`text.length` と比較しています。エラーメッセージには、制限文字数と現在の文字数を表示することで、ユーザーが修正しやすくしています。

**エラーメッセージの表示**

`showError()` 関数で、エラーメッセージを表示します。`setTimeout()` を使って3秒後に自動的に非表示にすることで、画面を見やすく保っています。

**リアルタイム入力チェック**

入力欄の `input` イベントで、文字数をリアルタイムで更新しています。制限を超えた場合は、文字数カウンターを赤くし、入力欄の枠も赤くすることで、視覚的なフィードバックを提供しています。

**バリデーションの順序**

空チェック、長さチェックの順にバリデーションを実行しています。基本的なチェックから順番に行うことで、効率的にエラーを検出できます。

## まとめ

お疲れ様でした。今回は、TODOアプリにバリデーション機能を追加しました。ユーザーの入力をチェックして不正なデータを防ぐことで、より堅牢なアプリになりました。

今回学んだキーポイントは以下の通りです。

- **バリデーション**: ユーザーの入力をチェックして、不正なデータを防ぐことで、データの品質を保ちます。空チェック、長さチェックなど、適切なバリデーションを実装することが重要です
- **エラー処理**: エラーが発生したときに、分かりやすいメッセージをユーザーに伝えます。エラーメッセージは具体的で、どう修正すればよいかが分かる内容にします
- **リアルタイムフィードバック**: ユーザーが入力しながらエラーに気づけるように、リアルタイムでチェックします。文字数カウンターや視覚的なフィードバックにより、ユーザーエクスペリエンスが向上します
- **バリデーションの順序**: 基本的なチェックから順番に実行することで、効率的にエラーを検出できます。複雑なチェックは最後に行います

バリデーションは、あらゆるWebアプリケーションで必要な機能です。フォーム入力、ユーザー登録、コメント投稿など、ユーザーがデータを入力するすべての場面でバリデーションが使われています。

次回は、TODOアプリにカウンター機能を追加します。全タスク数、未完了タスク数などの統計情報を表示することで、タスクの進捗状況を把握しやすくします。
