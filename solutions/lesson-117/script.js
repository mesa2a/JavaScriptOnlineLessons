// グローバル変数の宣言
let score = 0;  // 現在のスコアを保持
let history = [];  // 履歴を保持

// スコアを追加する関数
function addScore(points) {
  score = score + points;  // グローバル変数 score を更新
  addHistory('+' + points + '点');  // 履歴に追加
  updateDisplay();  // 表示を更新
}

// スコアを減算する関数
function subtractScore(points) {
  score = score - points;  // グローバル変数 score を更新
  addHistory('-' + points + '点');  // 履歴に追加
  updateDisplay();  // 表示を更新
}

// スコアをリセットする関数
function resetScore() {
  score = 0;  // グローバル変数 score をリセット
  history = [];  // グローバル変数 history をリセット
  addHistory('リセット');
  updateDisplay();  // 表示を更新
}

// 履歴に項目を追加する関数
function addHistory(action) {
  const now = new Date();
  const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

  // グローバル変数 history に追加
  history.push({
    time: time,
    action: action,
    score: score
  });
}

// 表示を更新する関数
function updateDisplay() {
  // スコアの表示を更新
  const scoreDisplay = document.getElementById('scoreDisplay');
  scoreDisplay.textContent = score;  // グローバル変数 score を表示

  // 履歴の表示を更新
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';  // クリア

  // グローバル変数 history を使って履歴を表示
  // 最新の履歴を上に表示するため、逆順でループ
  for (let i = history.length - 1; i >= 0; i--) {
    const item = history[i];
    const div = document.createElement('div');
    div.className = 'history-item';
    div.textContent = item.time + ' - ' + item.action + ' (合計: ' + item.score + '点)';
    historyList.appendChild(div);
  }
}

// 初期表示
updateDisplay();
