// タスクを保存する配列
let tasks = [];
let taskIdCounter = 1;

// タスクを追加する関数
function addTask() {
  // TODO: 入力欄の値を取得

  // TODO: 空でなければ、新しいタスクオブジェクトを作成
  // { id: taskIdCounter, text: taskText, done: false }

  // TODO: taskIdCounterをインクリメント

  // TODO: tasksに追加

  // TODO: 入力欄をクリア

  // TODO: displayTasks()を呼び出す
}

// IDでタスクを検索する関数
function getTaskById(id) {
  // TODO: forループでtasksを走査

  // TODO: tasks[i].id === idなら、tasks[i]を返す

  // TODO: 見つからなければnullを返す
}

// 完了/未完了を切り替える関数
function toggleTask(id) {
  // TODO: getTaskById(id)でタスクを取得

  // TODO: taskがnullでなければ、task.doneを反転

  // TODO: displayTasks()を呼び出す
}

// タスクを削除する関数
function deleteTask(id) {
  // TODO: forループでtasksを走査

  // TODO: tasks[i].id === idなら、splice(i, 1)で削除

  // TODO: displayTasks()を呼び出して、returnで終了
}

// タスクを表示する関数
function displayTasks() {
  // TODO: taskListエリアを取得

  // TODO: tasksが空なら、「タスクがありません」を表示してreturn

  // TODO: 空のHTML文字列を用意

  // TODO: forループですべてのタスクを処理
  //   - task.doneならdoneClassに"done"を設定
  //   - task.doneならchecked属性を追加
  //   - checkboxのonchangeでtoggleTask(task.id)を呼ぶ
  //   - spanにtask.textを表示
  //   - 削除ボタンのonclickでdeleteTask(task.id)を呼ぶ

  // TODO: 完成したHTMLをtaskListに表示
}
