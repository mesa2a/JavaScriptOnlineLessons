// タスクを保存する配列
let tasks = [];

// タスクを追加する関数
function addTask() {
  // 入力欄の値を取得
  let input = document.getElementById('taskInput');
  let taskText = input.value;

  // 空でなければ追加
  if (taskText !== "") {
    tasks.push(taskText);
    input.value = ""; // 入力欄をクリア
    displayTasks(); // 画面を更新
  }
}

// タスクを削除する関数
function deleteTask(index) {
  // 指定されたインデックスのタスクを削除
  tasks.splice(index, 1);
  displayTasks(); // 画面を更新
}

// タスクを表示する関数
function displayTasks() {
  let taskList = document.getElementById('taskList');

  // タスクがない場合
  if (tasks.length === 0) {
    taskList.innerHTML = '<p class="empty-message">タスクがありません</p>';
    return;
  }

  let html = "";

  // 配列のすべてのタスクを表示
  for (let i = 0; i < tasks.length; i++) {
    html += "<div>";
    html += "<span>" + (i + 1) + ". " + tasks[i] + "</span>";
    html += " <button onclick='deleteTask(" + i + ")'>削除</button>";
    html += "</div>";
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
