/**
 * レッスン175: ToDoリスト アプリケーション
 * 完全な実装
 */

// ToDoアプリケーションオブジェクト
var todoApp = {
  tasks: [],           // タスクの配列
  nextId: 1,          // 次に使用するID
  currentFilter: 'all', // 現在のフィルター

  /**
   * 初期化処理
   */
  init: function() {
    this.loadFromStorage();
    this.setupEventListeners();
    this.render();
  },

  /**
   * タスクを追加
   */
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
  },

  /**
   * タスクを削除
   */
  removeTask: function(id) {
    for (var i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        this.tasks.splice(i, 1);
        this.saveToStorage();
        this.render();
        return true;
      }
    }
    return false;
  },

  /**
   * タスクの完了状態を切り替え
   */
  toggleTask: function(id) {
    for (var i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        this.tasks[i].completed = !this.tasks[i].completed;
        this.saveToStorage();
        this.render();
        return true;
      }
    }
    return false;
  },

  /**
   * フィルタリングされたタスクを取得
   */
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
  },

  /**
   * タスクリストを描画
   */
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
  },

  /**
   * タスク要素を作成
   */
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
  },

  /**
   * イベントリスナーを設定
   */
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
  },

  /**
   * 統計情報を更新
   */
  updateStats: function() {
    var total = this.tasks.length;
    var active = this.tasks.filter(function(task) {
      return !task.completed;
    }).length;
    var completed = total - active;

    document.getElementById('total-count').textContent = '全て: ' + total;
    document.getElementById('active-count').textContent = '未完了: ' + active;
    document.getElementById('completed-count').textContent = '完了: ' + completed;
  },

  /**
   * ローカルストレージに保存
   */
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

  /**
   * ローカルストレージから読み込み
   */
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
};

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', function() {
  todoApp.init();
});

// テスト用にエクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = todoApp;
}
