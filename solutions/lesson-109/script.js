// 並列配列でデータを管理
let todoIds = [];
let todoTexts = [];
let todoCompleted = [];
let nextId = 1;

// 表示モード管理
let filterMode = "all";         // "all", "active", "completed"
let sortMode = "addOrder";      // "addOrder", "name"
let editingIndex = -1;          // -1は「編集中でない」

// DOM要素
let todoInput = document.getElementById("todoInput");
let addButton = document.getElementById("addButton");
let todoList = document.getElementById("todoList");
let statsDiv = document.getElementById("stats");
let emptyMessage = document.getElementById("emptyMessage");

let filterAll = document.getElementById("filterAll");
let filterActive = document.getElementById("filterActive");
let filterCompleted = document.getElementById("filterCompleted");

let sortAddOrder = document.getElementById("sortAddOrder");
let sortName = document.getElementById("sortName");

let clearCompletedButton = document.getElementById("clearCompleted");

// タスクを追加
addButton.addEventListener("click", function() {
  addTodo();
});

// Enterキーで追加
todoInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

// フィルタボタン
filterAll.addEventListener("click", function() {
  filterMode = "all";
  showTodos();
});

filterActive.addEventListener("click", function() {
  filterMode = "active";
  showTodos();
});

filterCompleted.addEventListener("click", function() {
  filterMode = "completed";
  showTodos();
});

// ソートボタン
sortAddOrder.addEventListener("click", function() {
  sortMode = "addOrder";
  showTodos();
});

sortName.addEventListener("click", function() {
  sortMode = "name";
  showTodos();
});

// 完了済みを削除
clearCompletedButton.addEventListener("click", function() {
  clearCompleted();
});

// タスクを追加
function addTodo() {
  let text = todoInput.value.trim();

  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  todoIds.push(nextId);
  todoTexts.push(text);
  todoCompleted.push(false);

  nextId++;
  todoInput.value = "";
  todoInput.focus();
  showTodos();
}

// タスクを表示
function showTodos() {
  // インデックス配列を作成
  let indices = [];
  for (let i = 0; i < todoTexts.length; i++) {
    indices.push(i);
  }

  // ソート
  if (sortMode === "name") {
    indices.sort(function(a, b) {
      return todoTexts[a].localeCompare(todoTexts[b]);
    });
  }
  // addOrderの場合は何もしない（元の順序）

  // 表示
  todoList.replaceChildren();
  let hasVisibleTodos = false;

  for (let i = 0; i < indices.length; i++) {
    let index = indices[i];

    // フィルタリング
    let shouldShow = false;
    if (filterMode === "all") {
      shouldShow = true;
    } else if (filterMode === "active") {
      shouldShow = !todoCompleted[index];
    } else if (filterMode === "completed") {
      shouldShow = todoCompleted[index];
    }

    if (shouldShow) {
      hasVisibleTodos = true;
      createTodoItem(index);
    }
  }

  // 空メッセージの表示/非表示
  if (hasVisibleTodos) {
    emptyMessage.classList.remove("show");
  } else {
    emptyMessage.classList.add("show");
  }

  updateStats();
  updateButtons();
}

// タスクアイテムを作成
function createTodoItem(index) {
  let item = document.createElement("div");
  item.className = "todo-item";

  if (editingIndex === index) {
    // 編集モード
    createEditMode(item, index);
  } else {
    // 表示モード
    createViewMode(item, index);
  }

  todoList.appendChild(item);
}

// 編集モードのUI
function createEditMode(item, index) {
  let input = document.createElement("input");
  input.type = "text";
  input.value = todoTexts[index];
  input.className = "edit-input";

  // Enterキーで保存
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      saveTodo(index, input.value.trim());
    }
  });

  let saveButton = document.createElement("button");
  saveButton.textContent = "保存";
  saveButton.className = "save-button";

  saveButton.addEventListener("click", function() {
    saveTodo(index, input.value.trim());
  });

  let cancelButton = document.createElement("button");
  cancelButton.textContent = "キャンセル";
  cancelButton.className = "cancel-button";

  cancelButton.addEventListener("click", function() {
    editingIndex = -1;
    showTodos();
  });

  item.appendChild(input);
  item.appendChild(saveButton);
  item.appendChild(cancelButton);

  // フォーカスを設定
  setTimeout(function() {
    input.focus();
    input.select();
  }, 0);
}

// 表示モードのUI
function createViewMode(item, index) {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todoCompleted[index];

  checkbox.addEventListener("click", function() {
    todoCompleted[index] = !todoCompleted[index];
    showTodos();
  });

  let text = document.createElement("span");
  text.textContent = todoTexts[index];

  if (todoCompleted[index]) {
    text.classList.add("completed");
  }

  let editButton = document.createElement("button");
  editButton.textContent = "編集";
  editButton.className = "edit-button";

  editButton.addEventListener("click", function() {
    editingIndex = index;
    showTodos();
  });

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "削除";
  deleteButton.className = "delete-button";

  deleteButton.addEventListener("click", function() {
    deleteTodo(index);
  });

  item.appendChild(checkbox);
  item.appendChild(text);
  item.appendChild(editButton);
  item.appendChild(deleteButton);
}

// タスクを保存
function saveTodo(index, newText) {
  if (newText === "") {
    alert("タスクを入力してください");
    return;
  }

  todoTexts[index] = newText;
  editingIndex = -1;
  showTodos();
}

// タスクを削除
function deleteTodo(index) {
  if (confirm("このタスクを削除しますか？")) {
    todoIds.splice(index, 1);
    todoTexts.splice(index, 1);
    todoCompleted.splice(index, 1);
    showTodos();
  }
}

// 完了済みタスクを一括削除
function clearCompleted() {
  let completedCount = 0;
  for (let i = 0; i < todoCompleted.length; i++) {
    if (todoCompleted[i]) {
      completedCount++;
    }
  }

  if (completedCount === 0) {
    alert("完了済みのタスクがありません");
    return;
  }

  if (confirm(completedCount + "件の完了済みタスクを削除しますか？")) {
    // 後ろから削除（インデックスがずれないように）
    for (let i = todoTexts.length - 1; i >= 0; i--) {
      if (todoCompleted[i]) {
        todoIds.splice(i, 1);
        todoTexts.splice(i, 1);
        todoCompleted.splice(i, 1);
      }
    }
    showTodos();
  }
}

// 統計情報を更新
function updateStats() {
  let total = todoTexts.length;
  let completed = 0;
  let active = 0;

  for (let i = 0; i < todoCompleted.length; i++) {
    if (todoCompleted[i]) {
      completed++;
    } else {
      active++;
    }
  }

  statsDiv.textContent = `全体: ${total}件 | 未完了: ${active}件 | 完了: ${completed}件`;
}

// ボタンの状態を更新
function updateButtons() {
  // フィルタボタン
  filterAll.classList.remove("active");
  filterActive.classList.remove("active");
  filterCompleted.classList.remove("active");

  if (filterMode === "all") {
    filterAll.classList.add("active");
  } else if (filterMode === "active") {
    filterActive.classList.add("active");
  } else if (filterMode === "completed") {
    filterCompleted.classList.add("active");
  }

  // ソートボタン
  sortAddOrder.classList.remove("active");
  sortName.classList.remove("active");

  if (sortMode === "addOrder") {
    sortAddOrder.classList.add("active");
  } else if (sortMode === "name") {
    sortName.classList.add("active");
  }
}

// 初期表示
showTodos();
