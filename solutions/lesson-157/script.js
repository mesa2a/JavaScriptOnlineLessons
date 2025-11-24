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
const clearCompletedBtn = document.getElementById('clear-completed-btn');

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

      // 削除ボタン
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

// ページ読み込み時にデータを復元
loadTodos();
renderTodos();
