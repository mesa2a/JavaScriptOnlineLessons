// ========================================
// グローバル変数（履歴管理）
// ========================================
let history = [];

// ========================================
// 計算関数（単一責任）
// ========================================

// 足し算
function add(a, b) {
  return a + b;
}

// 引き算
function subtract(a, b) {
  return a - b;
}

// 掛け算
function multiply(a, b) {
  return a * b;
}

// 割り算
function divide(a, b) {
  if (b === 0) {
    return 0;  // 0で割れない場合は0を返す
  }
  return a / b;
}

// ========================================
// 入力取得関数
// ========================================

// 最初の数値を取得
function getFirstNumber() {
  return Number(document.getElementById('num1').value);
}

// 2番目の数値を取得
function getSecondNumber() {
  return Number(document.getElementById('num2').value);
}

// ========================================
// 表示関数
// ========================================

// 結果を表示
function showResult(result) {
  document.getElementById('result').textContent = '結果: ' + result;
}

// ========================================
// 履歴管理関数
// ========================================

// 履歴に追加
function addToHistory(operation, num1, num2, result) {
  const record = {
    operation: operation,
    num1: num1,
    num2: num2,
    result: result,
    time: new Date().toLocaleTimeString()
  };
  history.push(record);
}

// 履歴を表示
function showHistory() {
  const historyDiv = document.getElementById('history');

  // 履歴が空の場合
  if (history.length === 0) {
    historyDiv.innerHTML = '<div class="history-empty">まだ計算履歴がありません</div>';
    return;
  }

  // 履歴を表示（最新が上）
  historyDiv.innerHTML = '';
  for (let i = history.length - 1; i >= 0; i--) {
    const record = history[i];
    const item = document.createElement('div');
    item.className = 'history-item';
    item.textContent =
      record.time + ' - ' +
      record.num1 + ' ' + record.operation + ' ' +
      record.num2 + ' = ' + record.result;
    historyDiv.appendChild(item);
  }
}

// ========================================
// メイン計算関数（関数から関数を呼び出す）
// ========================================

// 足し算を実行
function performAdd() {
  const num1 = getFirstNumber();
  const num2 = getSecondNumber();
  const result = add(num1, num2);
  showResult(result);
  addToHistory('+', num1, num2, result);
  showHistory();
}

// 引き算を実行
function performSubtract() {
  const num1 = getFirstNumber();
  const num2 = getSecondNumber();
  const result = subtract(num1, num2);
  showResult(result);
  addToHistory('-', num1, num2, result);
  showHistory();
}

// 掛け算を実行
function performMultiply() {
  const num1 = getFirstNumber();
  const num2 = getSecondNumber();
  const result = multiply(num1, num2);
  showResult(result);
  addToHistory('×', num1, num2, result);
  showHistory();
}

// 割り算を実行
function performDivide() {
  const num1 = getFirstNumber();
  const num2 = getSecondNumber();
  const result = divide(num1, num2);
  showResult(result);
  addToHistory('÷', num1, num2, result);
  showHistory();
}

// ========================================
// ユーティリティ関数
// ========================================

// 電卓をクリア
function clearCalculator() {
  document.getElementById('num1').value = '';
  document.getElementById('num2').value = '';
  document.getElementById('result').textContent = '結果: ';
}

// 履歴をクリア
function clearHistory() {
  history = [];
  showHistory();
}
