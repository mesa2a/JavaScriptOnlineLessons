// メッセージを表示する関数（デフォルト引数あり）
function showMessage(message = 'メッセージがありません', type = 'info') {
  let bgColor = '';
  let icon = '';

  // タイプに応じて色とアイコンを設定
  if (type === 'success') {
    bgColor = '#d4edda';
    icon = '✅ ';
  } else if (type === 'error') {
    bgColor = '#f8d7da';
    icon = '❌ ';
  } else {
    bgColor = '#d1ecf1';
    icon = 'ℹ️ ';
  }

  // 結果を表示
  const output = document.getElementById('output');
  output.style.backgroundColor = bgColor;
  output.textContent = icon + message;
}

// 表示ボタンがクリックされたときの処理
function displayMessage() {
  const message = document.getElementById('messageInput').value;
  const type = document.getElementById('typeSelect').value;

  // メッセージが空の場合、引数を渡さない（デフォルト値が使われる）
  if (message === '') {
    showMessage(undefined, type);
  } else {
    showMessage(message, type);
  }
}
