// ========================================
// データ
// ========================================

let tasks = [];
let taskIdCounter = 1;

// ========================================
// データ操作関数
// ========================================

function addTask(text) {
  // TODO: 新しいタスクオブジェクトを作成
  // TODO: taskIdCounterをインクリメント
  // TODO: tasksに追加
  // TODO: 新しいタスクを返す
}

function getTaskById(id) {
  // TODO: IDでタスクを検索して返す
}

function deleteTask(id) {
  // TODO: IDでタスクを削除
  // TODO: 成功したらtrueを返す
}

function toggleTask(id) {
  // TODO: IDでタスクを検索
  // TODO: doneプロパティを反転
  // TODO: 成功したらtrueを返す
}

// ========================================
// 表示関数
// ========================================

function displayTasks() {
  // TODO: taskListエリアを取得
  // TODO: tasksが空なら空メッセージを表示
  // TODO: forループで各タスクのHTMLを作成
  // TODO: 完成したHTMLを表示
}

function createTaskHTML(task) {
  // TODO: 1つのタスクのHTMLを作成して返す
  // TODO: doneクラスの適用
  // TODO: checkbox の checked属性
  // TODO: イベントハンドラの設定
}

// ========================================
// イベントハンドラ
// ========================================

function handleAdd() {
  // TODO: 入力値を取得
  // TODO: 空でなければaddTask()を呼ぶ
  // TODO: 入力欄をクリア
  // TODO: displayTasks()を呼ぶ
}

function handleToggle(id) {
  // TODO: toggleTask()を呼ぶ
  // TODO: displayTasks()を呼ぶ
}

function handleDelete(id) {
  // TODO: deleteTask()を呼ぶ
  // TODO: displayTasks()を呼ぶ
}

// ========================================
// 初期化
// ========================================

// TODO: ページ読み込み時にdisplayTasks()を呼ぶ
