# レッスン175: 応用課題 - ToDoリスト アプリケーション

## このレッスンの目標

実践的なToDoリストアプリケーションを作成し、これまで学んだすべての知識を統合して使えるようになる。

## 学習内容

### 1. プロジェクト概要

#### 1-1. 機能要件

基本的なToDoリストアプリケーションに以下の機能を実装します：

**必須機能:**
- タスクの追加
- タスクの削除
- タスクの完了/未完了の切り替え
- タスクの一覧表示
- タスク数の表示

**追加機能:**
- タスクの編集
- タスクのフィルタリング（全て/未完了/完了済み）
- タスクの優先度設定
- タスクの期限設定
- ローカルストレージへの保存

#### 1-2. データ構造

タスクオブジェクトの構造：

```javascript
var task = {
  id: 1,                        // 一意のID
  title: 'JavaScriptを学ぶ',     // タスクのタイトル
  completed: false,              // 完了状態
  priority: 'medium',            // 優先度: low, medium, high
  dueDate: '2024-12-31',        // 期限（オプション）
  createdAt: '2024-01-15'       // 作成日時
};
```

### 2. 実装の設計

#### 2-1. アプリケーションの構造

```javascript
// アプリケーション全体を管理するオブジェクト
var todoApp = {
  tasks: [],           // タスクの配列
  nextId: 1,          // 次に使用するID
  currentFilter: 'all', // 現在のフィルター

  // 初期化
  init: function() {
    this.loadFromStorage();
    this.setupEventListeners();
    this.render();
  },

  // タスク追加
  addTask: function(title, priority, dueDate) {
    // 実装
  },

  // タスク削除
  removeTask: function(id) {
    // 実装
  },

  // タスクの完了切り替え
  toggleTask: function(id) {
    // 実装
  },

  // タスク編集
  editTask: function(id, newTitle) {
    // 実装
  },

  // フィルタリング
  getFilteredTasks: function() {
    // 実装
  },

  // 描画
  render: function() {
    // 実装
  },

  // ストレージ操作
  saveToStorage: function() {
    // 実装
  },

  loadFromStorage: function() {
    // 実装
  }
};
```

#### 2-2. HTML構造

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ToDoリスト</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>📝 ToDoリスト</h1>
      <div class="stats">
        <span id="total-count">全て: 0</span>
        <span id="active-count">未完了: 0</span>
        <span id="completed-count">完了: 0</span>
      </div>
    </header>

    <!-- タスク追加フォーム -->
    <form id="add-task-form" class="add-form">
      <input
        type="text"
        id="task-input"
        placeholder="新しいタスクを入力..."
        required
      >
      <select id="priority-select">
        <option value="low">低</option>
        <option value="medium" selected>中</option>
        <option value="high">高</option>
      </select>
      <input type="date" id="due-date-input">
      <button type="submit">追加</button>
    </form>

    <!-- フィルターボタン -->
    <div class="filters">
      <button class="filter-btn active" data-filter="all">全て</button>
      <button class="filter-btn" data-filter="active">未完了</button>
      <button class="filter-btn" data-filter="completed">完了済み</button>
    </div>

    <!-- タスク一覧 -->
    <ul id="task-list" class="task-list">
      <!-- タスクがここに表示される -->
    </ul>

    <!-- 空の状態 -->
    <div id="empty-state" class="empty-state" style="display: none;">
      <p>タスクがありません</p>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>
```

### 3. 主要な実装パターン

#### 3-1. タスクの追加

```javascript
addTask: function(title, priority, dueDate) {
  // バリデーション
  if (!title || title.trim() === '') {
    return false;
  }

  // 新しいタスクを作成
  var newTask = {
    id: this.nextId++,
    title: title.trim(),
    completed: false,
    priority: priority || 'medium',
    dueDate: dueDate || null,
    createdAt: new Date().toISOString()
  };

  // タスク配列に追加
  this.tasks.push(newTask);

  // 保存と再描画
  this.saveToStorage();
  this.render();

  return true;
}
```

#### 3-2. タスクの削除

```javascript
removeTask: function(id) {
  // IDに一致するタスクを探して削除
  for (var i = 0; i < this.tasks.length; i++) {
    if (this.tasks[i].id === id) {
      this.tasks.splice(i, 1);
      this.saveToStorage();
      this.render();
      return true;
    }
  }
  return false;
}
```

#### 3-3. タスクの完了切り替え

```javascript
toggleTask: function(id) {
  // IDに一致するタスクを探して完了状態を反転
  for (var i = 0; i < this.tasks.length; i++) {
    if (this.tasks[i].id === id) {
      this.tasks[i].completed = !this.tasks[i].completed;
      this.saveToStorage();
      this.render();
      return true;
    }
  }
  return false;
}
```

#### 3-4. フィルタリング

```javascript
getFilteredTasks: function() {
  var filter = this.currentFilter;

  if (filter === 'all') {
    return this.tasks;
  } else if (filter === 'active') {
    return this.tasks.filter(function(task) {
      return !task.completed;
    });
  } else if (filter === 'completed') {
    return this.tasks.filter(function(task) {
      return task.completed;
    });
  }

  return this.tasks;
}
```

#### 3-5. 描画処理

```javascript
render: function() {
  var taskList = document.getElementById('task-list');
  var emptyState = document.getElementById('empty-state');

  // フィルタリングされたタスクを取得
  var filteredTasks = this.getFilteredTasks();

  // リストをクリア
  taskList.innerHTML = '';

  // タスクがない場合
  if (filteredTasks.length === 0) {
    emptyState.style.display = 'block';
    taskList.style.display = 'none';
    this.updateStats();
    return;
  }

  emptyState.style.display = 'none';
  taskList.style.display = 'block';

  // 各タスクをレンダリング
  for (var i = 0; i < filteredTasks.length; i++) {
    var task = filteredTasks[i];
    var li = this.createTaskElement(task);
    taskList.appendChild(li);
  }

  // 統計情報を更新
  this.updateStats();
}
```

#### 3-6. タスク要素の作成

```javascript
createTaskElement: function(task) {
  var li = document.createElement('li');
  li.className = 'task-item';
  li.setAttribute('data-id', task.id);

  // 完了状態のクラス
  if (task.completed) {
    li.classList.add('completed');
  }

  // 優先度のクラス
  li.classList.add('priority-' + task.priority);

  // チェックボックス
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.className = 'task-checkbox';

  // タイトル
  var titleSpan = document.createElement('span');
  titleSpan.className = 'task-title';
  titleSpan.textContent = task.title;

  // 期限表示
  var dueDateSpan = document.createElement('span');
  dueDateSpan.className = 'task-due-date';
  if (task.dueDate) {
    dueDateSpan.textContent = '期限: ' + task.dueDate;
  }

  // 削除ボタン
  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '削除';

  // 要素を組み立て
  li.appendChild(checkbox);
  li.appendChild(titleSpan);
  if (task.dueDate) {
    li.appendChild(dueDateSpan);
  }
  li.appendChild(deleteBtn);

  return li;
}
```

#### 3-7. イベントリスナーの設定

```javascript
setupEventListeners: function() {
  var self = this;

  // タスク追加フォーム
  var form = document.getElementById('add-task-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var input = document.getElementById('task-input');
    var prioritySelect = document.getElementById('priority-select');
    var dueDateInput = document.getElementById('due-date-input');

    var title = input.value;
    var priority = prioritySelect.value;
    var dueDate = dueDateInput.value;

    if (self.addTask(title, priority, dueDate)) {
      input.value = '';
      dueDateInput.value = '';
    }
  });

  // タスクリストのイベント（イベント委譲）
  var taskList = document.getElementById('task-list');
  taskList.addEventListener('click', function(e) {
    var li = e.target.closest('.task-item');
    if (!li) return;

    var id = parseInt(li.getAttribute('data-id'));

    // チェックボックスがクリックされた
    if (e.target.classList.contains('task-checkbox')) {
      self.toggleTask(id);
    }

    // 削除ボタンがクリックされた
    if (e.target.classList.contains('delete-btn')) {
      if (confirm('このタスクを削除しますか？')) {
        self.removeTask(id);
      }
    }
  });

  // フィルターボタン
  var filterBtns = document.querySelectorAll('.filter-btn');
  for (var i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener('click', function() {
      // すべてのボタンから active クラスを削除
      for (var j = 0; j < filterBtns.length; j++) {
        filterBtns[j].classList.remove('active');
      }

      // クリックされたボタンに active クラスを追加
      this.classList.add('active');

      // フィルターを変更
      self.currentFilter = this.getAttribute('data-filter');
      self.render();
    });
  }
}
```

#### 3-8. ローカルストレージの操作

```javascript
saveToStorage: function() {
  try {
    var data = {
      tasks: this.tasks,
      nextId: this.nextId
    };
    localStorage.setItem('todoApp', JSON.stringify(data));
  } catch (e) {
    console.error('保存に失敗しました:', e);
  }
},

loadFromStorage: function() {
  try {
    var data = localStorage.getItem('todoApp');
    if (data) {
      var parsed = JSON.parse(data);
      this.tasks = parsed.tasks || [];
      this.nextId = parsed.nextId || 1;
    }
  } catch (e) {
    console.error('読み込みに失敗しました:', e);
  }
}
```

#### 3-9. 統計情報の更新

```javascript
updateStats: function() {
  var total = this.tasks.length;
  var active = this.tasks.filter(function(task) {
    return !task.completed;
  }).length;
  var completed = total - active;

  document.getElementById('total-count').textContent = '全て: ' + total;
  document.getElementById('active-count').textContent = '未完了: ' + active;
  document.getElementById('completed-count').textContent = '完了: ' + completed;
}
```

### 4. スタイリング

#### 4-1. 基本スタイル

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  padding: 30px;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

h1 {
  color: #333;
  margin-bottom: 15px;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  color: #666;
  font-size: 14px;
}
```

#### 4-2. フォームスタイル

```css
.add-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

#task-input {
  flex: 1;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 16px;
}

#task-input:focus {
  outline: none;
  border-color: #667eea;
}

#priority-select,
#due-date-input {
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 14px;
}

.add-form button {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.add-form button:hover {
  background: #5568d3;
}
```

#### 4-3. タスクリストスタイル

```css
.task-list {
  list-style: none;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: all 0.3s;
}

.task-item:hover {
  background: #f0f0f0;
  transform: translateX(5px);
}

.task-item.completed {
  opacity: 0.6;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #999;
}

.task-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-title {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.task-due-date {
  font-size: 12px;
  color: #999;
  background: #e0e0e0;
  padding: 4px 8px;
  border-radius: 3px;
}

.delete-btn {
  padding: 6px 12px;
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
}

.delete-btn:hover {
  background: #e84118;
}
```

### 5. 拡張アイデア

#### 5-1. タスクの編集機能

```javascript
editTask: function(id, newTitle) {
  for (var i = 0; i < this.tasks.length; i++) {
    if (this.tasks[i].id === id) {
      this.tasks[i].title = newTitle;
      this.saveToStorage();
      this.render();
      return true;
    }
  }
  return false;
}
```

#### 5-2. タスクのソート

```javascript
sortTasks: function(sortBy) {
  var tasks = this.tasks.slice();

  if (sortBy === 'priority') {
    var priorityOrder = { high: 0, medium: 1, low: 2 };
    tasks.sort(function(a, b) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  } else if (sortBy === 'dueDate') {
    tasks.sort(function(a, b) {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  } else if (sortBy === 'created') {
    tasks.sort(function(a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }

  return tasks;
}
```

## まとめ

このレッスンでは、実践的なToDoリストアプリケーションを作成しました：

1. **データ管理**: オブジェクトと配列を使ったデータ管理
2. **DOM操作**: 動的な要素の生成と更新
3. **イベント処理**: ユーザー操作への対応
4. **ローカルストレージ**: データの永続化
5. **フィルタリング**: データの絞り込み表示

次のレッスンでは、さらに複雑な応用課題に取り組みます。

## 演習

演習ファイルで実際にToDoリストアプリケーションを実装してみましょう。
