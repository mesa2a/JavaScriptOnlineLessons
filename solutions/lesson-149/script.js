// ========================================
// データ
// ========================================

let tasks = [];
let taskIdCounter = 1;

// ========================================
// データ操作関数
// ========================================

function addTask(text) {
  let newTask = {
    id: taskIdCounter,
    text: text,
    done: false
  };
  taskIdCounter++;
  tasks.push(newTask);
  return newTask;
}

function getTaskById(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      return tasks[i];
    }
  }
  return null;
}

function deleteTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      return true;
    }
  }
  return false;
}

function toggleTask(id) {
  let task = getTaskById(id);
  if (task !== null) {
    task.done = !task.done;
    return true;
  }
  return false;
}

// ========================================
// 表示関数
// ========================================

function displayTasks() {
  let taskList = document.getElementById('taskList');

  if (tasks.length === 0) {
    taskList.innerHTML = '<p class="empty">タスクがありません</p>';
    return;
  }

  let html = "";
  for (let i = 0; i < tasks.length; i++) {
    html += createTaskHTML(tasks[i]);
  }
  taskList.innerHTML = html;
}

function createTaskHTML(task) {
  let doneClass = task.done ? "done" : "";
  let checked = task.done ? "checked" : "";

  let html = '<div class="task-item ' + doneClass + '">';
  html += '  <input type="checkbox" ' + checked;
  html += '  onchange="handleToggle(' + task.id + ')">';
  html += '  <span>' + task.text + '</span>';
  html += '  <button onclick="handleDelete(' + task.id + ')">削除</button>';
  html += '</div>';

  return html;
}

// ========================================
// イベントハンドラ
// ========================================

function handleAdd() {
  let input = document.getElementById('taskInput');
  let text = input.value.trim();

  if (text !== "") {
    addTask(text);
    input.value = "";
    displayTasks();
  }
}

function handleToggle(id) {
  toggleTask(id);
  displayTasks();
}

function handleDelete(id) {
  deleteTask(id);
  displayTasks();
}

// ========================================
// 初期化
// ========================================

displayTasks();
