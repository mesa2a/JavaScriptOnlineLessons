---
title: "Lesson 157: TODOアプリ（完成編）"
author: "JavaScript学習教材"
date: "2025-11-23"
---

# Lesson 157: TODOアプリ（完成編）

## 今回の学習

### 前回の復習

前回のレッスンでは、TODOアプリに統計機能を追加しました。具体的には以下の内容を学習しました。

- **カウント処理**: 配列の `length` プロパティや `filter()` メソッドを使って、条件に一致する要素の数を数える
- **集計**: 複数の統計情報を同時に計算し、画面に表示する
- **自動更新**: タスクが変更されるたびに統計情報を更新する

前回作成した「統計機能付きTODO」により、全タスク数、未完了タスク数、完了タスク数を一目で確認できるようになりました。

### 今回の目標

今回は、TODOアプリの完成編です。これまでに実装したすべての機能を統合し、削除機能などの最終的な機能を追加して、完全に動作するTODOアプリを完成させます。

今回の学習で達成する目標は以下の通りです。

- **すべての機能を統合**: これまでのレッスンで作成した機能をすべて組み合わせる
- **コードの整理**: 重複するコードを関数にまとめ、読みやすく保守しやすいコードにする
- **バグ修正**: 細かい不具合を修正し、安定した動作を実現する
- **動作確認**: すべての機能が正しく連携して動作することを確認する

## 統合されるすべての機能

### これまでに実装した機能の一覧

レッスン146からレッスン156までで、以下の機能を実装してきました。

1. **基本機能（レッスン146-149）**
   - タスクの追加
   - タスクの表示
   - タスクの完了/未完了切り替え
   - タスクの削除

2. **データ永続化（レッスン150）**
   - localStorageへの保存
   - ページ再読み込み時のデータ復元

3. **フィルター機能（レッスン151）**
   - すべて/未完了/完了のフィルター切り替え

4. **カテゴリ機能（レッスン152）**
   - タスクへのカテゴリ設定
   - カテゴリごとの表示
   - カテゴリバッジの色分け

5. **検索機能（レッスン153）**
   - キーワードによる部分一致検索
   - リアルタイム検索

6. **編集機能（レッスン154）**
   - タスクの編集
   - 編集モードと通常モードの切り替え

7. **バリデーション（レッスン155）**
   - 空のタスクの防止
   - 文字数制限
   - エラーメッセージ表示

8. **統計機能（レッスン156）**
   - 全タスク数の表示
   - 未完了/完了タスク数の表示

これらすべての機能を統合し、シームレスに動作するアプリを完成させます。

## タスク削除機能の追加

### 削除ボタンの実装

これまでのレッスンでは削除機能を実装していなかったので、ここで追加します。

```javascript
// 削除ボタン
const deleteBtn = document.createElement('button');
deleteBtn.textContent = '削除';
deleteBtn.className = 'delete-btn';

deleteBtn.addEventListener('click', function(e) {
  e.stopPropagation();

  // 確認ダイアログを表示
  if (confirm('このタスクを削除しますか？')) {
    todos.splice(originalIndex, 1);
    saveTodos();
    renderTodos();
    showSuccess('タスクを削除しました');
  }
});

li.appendChild(deleteBtn);
```

`splice()` メソッドを使って、配列から指定したインデックスの要素を削除します。`confirm()` で確認ダイアログを表示し、ユーザーの意図しない削除を防ぎます。

### 削除ボタンのスタイル

削除ボタンを目立たせるために、赤いスタイルを設定します。

```css
.delete-btn {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
}

.delete-btn:hover {
    background-color: #c82333;
}
```

削除は取り消せない操作なので、赤色で警告の意味を持たせます。

## コードの整理とリファクタリング

### 重複コードの削減

複数の場所で同じような処理をしている場合、関数にまとめることでコードを整理できます。

例えば、タスクのDOM要素を作成する処理は共通化できます。

```javascript
function createTaskElement(todo, originalIndex) {
  const li = document.createElement('li');

  // カテゴリバッジ
  const categoryBadge = document.createElement('span');
  categoryBadge.textContent = todo.category;
  categoryBadge.className = 'category-badge';
  categoryBadge.style.backgroundColor = categoryColors[todo.category] || '#999';
  li.appendChild(categoryBadge);

  // 編集モードと通常モードで分岐
  if (originalIndex === editingIndex) {
    addEditModeElements(li, todo, originalIndex);
  } else {
    addNormalModeElements(li, todo, originalIndex);
  }

  return li;
}
```

このように関数を分割することで、コードが読みやすくなり、保守もしやすくなります。

### 定数の整理

アプリ全体で使用する定数を、ファイルの先頭にまとめます。

```javascript
// 定数
const MAX_TASK_LENGTH = 100;
const STORAGE_KEY_TODOS = 'todos';
const STORAGE_KEY_CATEGORIES = 'categories';

const CATEGORY_COLORS = {
  '仕事': '#ff6b6b',
  'プライベート': '#4ecdc4',
  '買い物': '#ffe66d'
};

const DEFAULT_CATEGORIES = ['すべて', '仕事', 'プライベート', '買い物'];
```

定数名を大文字にすることで、変更してはいけない値であることが明確になります。

## バグ修正と安定性向上

### エッジケースへの対応

実際にアプリを使っていると、予期しない使い方による不具合が見つかることがあります。

**空の検索結果でタスクを編集しようとした場合**

検索やフィルターで絞り込んだ状態で編集すると、インデックスがずれる可能性があります。元の配列のインデックスを正確に管理する必要があります。

```javascript
// 元の配列でのインデックスを確実に取得
const originalIndex = todos.findIndex(function(t) {
  return t === todo; // 同一のオブジェクト参照で確認
});
```

**編集中に検索やフィルターを変更した場合**

編集モード中に検索条件を変更すると、編集中のタスクが表示されなくなる可能性があります。この場合、編集をキャンセルするか、編集中は検索を無効化する必要があります。

```javascript
// 検索やフィルター変更時に編集モードをキャンセル
searchInput.addEventListener('input', function() {
  if (editingIndex !== -1) {
    editingIndex = -1;
  }
  renderTodos();
});
```

### データの整合性チェック

localStorageから読み込んだデータが壊れている可能性も考慮します。

```javascript
function loadTodos() {
  try {
    const savedTodos = localStorage.getItem(STORAGE_KEY_TODOS);
    if (savedTodos) {
      const parsed = JSON.parse(savedTodos);
      // 配列であることを確認
      if (Array.isArray(parsed)) {
        todos = parsed;
      } else {
        console.error('Invalid todos data');
        todos = [];
      }
    }
  } catch (error) {
    console.error('Error loading todos:', error);
    todos = [];
  }
}
```

`try-catch` を使って、JSONのパースエラーに対応します。

## 完全削除機能の追加

### 完了タスクを一括削除

完了したタスクをすべて削除する機能を追加すると便利です。

```javascript
function clearCompletedTasks() {
  const beforeCount = todos.length;

  todos = todos.filter(function(todo) {
    return todo.completed === false;
  });

  const deletedCount = beforeCount - todos.length;

  if (deletedCount > 0) {
    saveTodos();
    renderTodos();
    showSuccess(deletedCount + '件の完了タスクを削除しました');
  } else {
    showError('削除する完了タスクがありません');
  }
}
```

```html
<button id="clear-completed-btn">完了タスクを削除</button>
```

### すべてのタスクを削除

すべてのタスクを削除する機能も追加できます。

```javascript
function clearAllTasks() {
  if (todos.length === 0) {
    showError('削除するタスクがありません');
    return;
  }

  if (confirm('すべてのタスクを削除しますか？この操作は取り消せません。')) {
    todos = [];
    saveTodos();
    renderTodos();
    showSuccess('すべてのタスクを削除しました');
  }
}
```

## ユーザビリティの向上

### キーボードショートカット

キーボード操作を追加することで、より使いやすくなります。

```javascript
// グローバルなキーボードショートカット
document.addEventListener('keydown', function(e) {
  // Ctrl+N で新規タスクの入力欄にフォーカス
  if (e.ctrlKey && e.key === 'n') {
    e.preventDefault();
    todoInput.focus();
  }

  // Escapeキーで編集モードをキャンセル
  if (e.key === 'Escape' && editingIndex !== -1) {
    editingIndex = -1;
    renderTodos();
  }
});
```

### ドラッグ&ドロップでの並び替え

発展的な機能として、タスクの順番をドラッグ&ドロップで変更できるようにすることもできます（これは高度な機能なので、オプションとして紹介します）。

### レスポンシブデザイン

スマートフォンでも使いやすいように、CSSでレスポンシブデザインを実装します。

```css
@media (max-width: 600px) {
  body {
    padding: 10px;
  }

  #stats-container {
    flex-direction: column;
    gap: 10px;
  }

  #input-container {
    flex-direction: column;
  }

  #filter-buttons button {
    font-size: 12px;
    padding: 6px 12px;
  }
}
```

## 動作確認チェックリスト

完成したアプリが正しく動作するか、以下のチェックリストで確認します。

### 基本機能
- [ ] タスクを追加できる
- [ ] タスクを表示できる
- [ ] タスクを完了/未完了に切り替えられる
- [ ] タスクを削除できる
- [ ] タスクを編集できる

### フィルターと検索
- [ ] すべて/未完了/完了のフィルターが動作する
- [ ] カテゴリでフィルターできる
- [ ] キーワードで検索できる
- [ ] 複数のフィルターを組み合わせられる

### データ永続化
- [ ] ページを再読み込みしてもデータが残る
- [ ] 編集内容が保存される
- [ ] 削除が保存される

### バリデーション
- [ ] 空のタスクは追加できない
- [ ] 100文字を超えるタスクは追加できない
- [ ] エラーメッセージが表示される

### 統計
- [ ] 全タスク数が正しく表示される
- [ ] 未完了タスク数が正しく表示される
- [ ] 完了タスク数が正しく表示される
- [ ] タスク変更時に統計が更新される

## 練習問題

### 課題

完成版TODOアプリを作成してください。これまでに実装したすべての機能を統合し、削除機能を追加して、完全に動作するアプリを完成させます。

### 保存場所

`exercises/lesson-157/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. すべての機能を統合
2. コードの整理
3. バグ修正
4. 動作確認

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-157
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**削除機能の実装**

- 各タスクに削除ボタンを追加します
- `splice()` メソッドで配列から要素を削除します
- `confirm()` で確認ダイアログを表示して、誤削除を防ぎます
- 削除後は `saveTodos()` と `renderTodos()` を呼び出します

**コードの整理**

- 重複するコードを関数にまとめます
- 定数をファイルの先頭に整理します
- 関数名を分かりやすくします
- コメントを追加して、コードの意図を明確にします

**バグ修正**

- 編集中に検索やフィルターを変更した場合の動作を確認します
- localStorageのデータが壊れている場合の処理を追加します
- エッジケース（タスクが0件の場合など）をテストします

**動作確認**

- すべての機能を実際に使ってみて、正しく動作することを確認します
- 異なるブラウザでテストします
- スマートフォンでの表示も確認します

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 157</title>
    <style>
        * {
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
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
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
            border-radius: 4px;
        }
        #add-btn {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
        }
        #add-btn:hover {
            background-color: #0056b3;
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
            flex-wrap: wrap;
        }
        #category-select {
            padding: 8px;
            font-size: 14px;
            border-radius: 4px;
        }
        #filter-buttons {
            display: flex;
            gap: 5px;
        }
        #filter-buttons button {
            padding: 8px 16px;
            cursor: pointer;
            border: 1px solid #ccc;
            background-color: white;
            border-radius: 4px;
        }
        #filter-buttons button.active {
            background-color: #007bff;
            color: white;
            border-color: #007bff;
        }
        #clear-completed-btn {
            padding: 8px 16px;
            cursor: pointer;
            background-color: #ffc107;
            color: #333;
            border: none;
            border-radius: 4px;
            font-size: 14px;
        }
        #clear-completed-btn:hover {
            background-color: #e0a800;
        }
        #todo-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        #todo-list li {
            padding: 12px;
            margin-bottom: 8px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: box-shadow 0.2s;
        }
        #todo-list li:hover {
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        #todo-list li.completed {
            opacity: 0.6;
        }
        #todo-list li.no-results {
            cursor: default;
            justify-content: center;
            color: #999;
        }
        .category-badge {
            display: inline-block;
            padding: 4px 12px;
            color: white;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
            flex-shrink: 0;
        }
        .task-text {
            flex: 1;
            cursor: pointer;
            word-break: break-word;
        }
        .task-text.completed {
            text-decoration: line-through;
            color: #999;
        }
        .edit-input {
            flex: 1;
            padding: 8px;
            font-size: 16px;
            border: 2px solid #007bff;
            border-radius: 4px;
        }
        .edit-btn, .save-btn, .cancel-btn, .delete-btn {
            padding: 6px 12px;
            cursor: pointer;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            flex-shrink: 0;
        }
        .edit-btn {
            background-color: #007bff;
            color: white;
        }
        .edit-btn:hover {
            background-color: #0056b3;
        }
        .save-btn {
            background-color: #28a745;
            color: white;
        }
        .save-btn:hover {
            background-color: #218838;
        }
        .cancel-btn {
            background-color: #6c757d;
            color: white;
        }
        .cancel-btn:hover {
            background-color: #5a6268;
        }
        .delete-btn {
            background-color: #dc3545;
            color: white;
        }
        .delete-btn:hover {
            background-color: #c82333;
        }
        @media (max-width: 600px) {
            body {
                padding: 10px;
                margin: 10px auto;
            }
            #stats-container {
                flex-direction: column;
                gap: 10px;
            }
            #input-container {
                flex-direction: column;
            }
            #filter-buttons button {
                font-size: 12px;
                padding: 6px 12px;
            }
        }
    </style>
</head>
<body>
    <h1>TODOアプリ（完成版）</h1>

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

        <button id="clear-completed-btn">完了タスクを削除</button>
    </div>

    <ul id="todo-list"></ul>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
// 定数
const MAX_TASK_LENGTH = 100;
const STORAGE_KEY_TODOS = 'todos';

const CATEGORY_COLORS = {
  '仕事': '#ff6b6b',
  'プライベート': '#4ecdc4',
  '買い物': '#ffe66d'
};

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
const clearCompletedBtn = document.getElementById('clear-completed-btn');

// localStorageからデータを読み込む
function loadTodos() {
  try {
    const savedTodos = localStorage.getItem(STORAGE_KEY_TODOS);
    if (savedTodos) {
      const parsed = JSON.parse(savedTodos);
      if (Array.isArray(parsed)) {
        todos = parsed;
      }
    }
  } catch (error) {
    console.error('Error loading todos:', error);
    todos = [];
  }
}

// localStorageにデータを保存
function saveTodos() {
  try {
    localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos:', error);
    showError('データの保存に失敗しました');
  }
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
  const totalCount = todos.length;
  const incompleteCount = todos.filter(function(todo) {
    return todo.completed === false;
  }).length;
  const completedCount = todos.filter(function(todo) {
    return todo.completed === true;
  }).length;

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
    updateStats();
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
    categoryBadge.style.backgroundColor = CATEGORY_COLORS[todo.category] || '#999';

    li.appendChild(categoryBadge);

    // 編集モード
    if (originalIndex === editingIndex) {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = todo.text;
      input.className = 'edit-input';
      input.maxLength = MAX_TASK_LENGTH;

      const saveBtn = document.createElement('button');
      saveBtn.textContent = '保存';
      saveBtn.className = 'save-btn';

      saveBtn.addEventListener('click', function() {
        const newText = input.value.trim();

        if (newText === '') {
          showError('タスクを入力してください');
          return;
        }

        if (newText.length > MAX_TASK_LENGTH) {
          showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください');
          return;
        }

        todos[originalIndex].text = newText;
        saveTodos();
        editingIndex = -1;
        renderTodos();
        showSuccess('タスクを更新しました');
      });

      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'キャンセル';
      cancelBtn.className = 'cancel-btn';

      cancelBtn.addEventListener('click', function() {
        editingIndex = -1;
        renderTodos();
      });

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
        taskText.classList.add('completed');
        li.classList.add('completed');
      }

      taskText.addEventListener('click', function() {
        todos[originalIndex].completed = !todos[originalIndex].completed;
        saveTodos();
        renderTodos();
      });

      taskText.addEventListener('dblclick', function() {
        editingIndex = originalIndex;
        renderTodos();
      });

      const editBtn = document.createElement('button');
      editBtn.textContent = '編集';
      editBtn.className = 'edit-btn';

      editBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        editingIndex = originalIndex;
        renderTodos();
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '削除';
      deleteBtn.className = 'delete-btn';

      deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation();

        if (confirm('このタスクを削除しますか？')) {
          todos.splice(originalIndex, 1);
          saveTodos();
          renderTodos();
          showSuccess('タスクを削除しました');
        }
      });

      li.appendChild(taskText);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
    }

    todoList.appendChild(li);
  });

  updateFilterButtons();
  updateStats();
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
    showError('タスクを入力してください');
    return;
  }

  if (text.length > MAX_TASK_LENGTH) {
    showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください');
    return;
  }

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

// 完了タスクを一括削除
function clearCompletedTasks() {
  const beforeCount = todos.length;

  todos = todos.filter(function(todo) {
    return todo.completed === false;
  });

  const deletedCount = beforeCount - todos.length;

  if (deletedCount > 0) {
    saveTodos();
    renderTodos();
    showSuccess(deletedCount + '件の完了タスクを削除しました');
  } else {
    showError('削除する完了タスクがありません');
  }
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
  if (editingIndex !== -1) {
    editingIndex = -1;
  }
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
  if (editingIndex !== -1) {
    editingIndex = -1;
  }
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

// 完了タスク削除ボタンのイベントリスナー
clearCompletedBtn.addEventListener('click', clearCompletedTasks);

// 追加ボタンのイベントリスナー
addBtn.addEventListener('click', addTodo);

// Enterキーでも追加できるように
todoInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// グローバルなキーボードショートカット
document.addEventListener('keydown', function(e) {
  // Escapeキーで編集モードをキャンセル
  if (e.key === 'Escape' && editingIndex !== -1) {
    editingIndex = -1;
    renderTodos();
  }
});

// ページ読み込み時にデータを復元
loadTodos();
renderTodos();
```

### 解説

**削除機能の実装**

各タスクに削除ボタンを追加し、`splice()` メソッドで配列から要素を削除しています。`confirm()` で確認ダイアログを表示することで、誤削除を防いでいます。

**完了タスクの一括削除**

`filter()` メソッドで未完了のタスクだけを残すことで、完了タスクを一括削除しています。削除件数を計算してユーザーにフィードバックしています。

**コードの整理**

定数をファイルの先頭にまとめ、エラー処理を `try-catch` で囲むことで、より堅牢なコードになっています。

**バグ修正**

編集中に検索やフィルターを変更すると編集モードをキャンセルする処理を追加し、不整合を防いでいます。

**レスポンシブデザイン**

メディアクエリを使って、スマートフォンでも使いやすいレイアウトになっています。

## まとめ

お疲れ様でした。今回は、TODOアプリの完成編として、これまでに実装したすべての機能を統合し、削除機能を追加して、完全に動作するTODOアプリを完成させました。

今回学んだキーポイントは以下の通りです。

- **統合**: 複数の機能を組み合わせて、シームレスに動作するアプリを作ることができます。各機能が正しく連携するように注意深く実装する必要があります
- **デバッグ**: エッジケースやエラー処理を適切に実装することで、安定したアプリになります。`try-catch` や確認ダイアログを使って、予期しない動作を防ぎます
- **完成度**: 細かいユーザビリティの向上やレスポンシブデザインなど、完成度を高める工夫が重要です。使いやすいアプリは、細部にまでこだわっています

このTODOアプリには、以下のすべての機能が実装されています。

- タスクの追加・表示・完了・編集・削除
- データの永続化（localStorage）
- フィルター機能（すべて/未完了/完了）
- カテゴリ機能（カテゴリ別表示と色分け）
- 検索機能（リアルタイム検索）
- バリデーション（空チェック、文字数制限）
- 統計機能（タスク数の表示）
- 完了タスクの一括削除

レッスン146から157まで、12回のレッスンをかけて、完全なTODOアプリを段階的に作り上げました。各機能を一つずつ実装することで、複雑なアプリでも着実に完成させることができることを学びました。

この経験を活かして、さらに複雑なアプリケーションにも挑戦してみてください。
