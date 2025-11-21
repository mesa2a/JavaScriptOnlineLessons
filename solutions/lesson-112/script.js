// 足し算（戻り値を返す）
function add(a, b) {
  return a + b;
}

// 引き算（戻り値を返す）
function subtract(a, b) {
  return a - b;
}

// 掛け算（戻り値を返す）
function multiply(a, b) {
  return a * b;
}

// 割り算（戻り値を返す）
function divide(a, b) {
  return a / b;
}

// 計算を実行する関数
function calculate(operation) {
  // 入力された数値を取得
  const num1 = Number(document.getElementById('num1').value);
  const num2 = Number(document.getElementById('num2').value);

  let result;

  // 操作に応じて適切な関数を呼び出す（戻り値を受け取る）
  if (operation === 'add') {
    result = add(num1, num2);
  } else if (operation === 'subtract') {
    result = subtract(num1, num2);
  } else if (operation === 'multiply') {
    result = multiply(num1, num2);
  } else if (operation === 'divide') {
    result = divide(num1, num2);
  }

  // 結果を表示
  document.getElementById('output').textContent = result;
}
