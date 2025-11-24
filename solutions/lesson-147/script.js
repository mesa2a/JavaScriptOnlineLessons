// タスクを保存する配列
let tasks = [];
let taskIdCounter = 1;

// タスクを追加する関数
function addTask() {
  let input = document.getElementById('taskInput');
  let taskText = input.value;

  if (taskText !== "") {
    let newTask = {
      id: taskIdCounter,
      text: taskText,
      done: false
    };

    taskIdCounter = taskIdCounter + 1;
    tasks.push(newTask);
    input.value = "";
    displayTasks();
  }
}

// IDでタスクを検索
function getTaskById(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      return tasks[i];
    }
  }
  return null;
}

// 完了/未完了を切り替え
function toggleTask(id) {
  let task = getTaskById(id);
  if (task !== null) {
    task.done = !task.done;
    displayTasks();
  }
}

// タスクを削除
function deleteTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      displayTasks();
      return;
    }
  }
}

// タスクを表示
function displayTasks() {
  let taskList = document.getElementById('taskList');

  if (tasks.length === 0) {
    taskList.innerHTML = '<p class="empty-message">タスクがありません</p>';
    return;
  }

  let html = "";

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let doneClass = task.done ? "done" : "";

    html += '<div class="task-item ' + doneClass + '">';
    html += '  <input type="checkbox" ';
    if (task.done) {
      html += 'checked ';
    }
    html += 'onchange="toggleTask(' + task.id + ')">';
    html += '  <span>' + task.text + '</span>';
    html += '  <button onclick="deleteTask(' + task.id + ')">削除</button>';
    html += '</div>';
  }

  taskList.innerHTML = html;
}

// Enterキーで追加できるようにする
document.addEventListener('DOMContentLoaded', function() {
  let input = document.getElementById('taskInput');
  input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // 初期表示
  displayTasks();
});
