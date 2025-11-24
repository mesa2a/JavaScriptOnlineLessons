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
