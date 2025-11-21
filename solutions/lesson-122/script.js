// ========================================
// 関数式の例
// ========================================

// 挨拶関数（関数式）
const greet = function(name) {
  return 'こんにちは、' + name + 'さん！';
};

// 計算機関数（関数式）
const add = function(a, b) {
  return a + b;
};

const subtract = function(a, b) {
  return a - b;
};

const multiply = function(a, b) {
  return a * b;
};

const divide = function(a, b) {
  if (b === 0) {
    return 0;
  }
  return a / b;
};

// ========================================
// UI関数
// ========================================

// 挨拶のテスト
const testGreet = function() {
  const name = document.getElementById('nameInput').value;
  const message = greet(name);

  const resultDiv = document.getElementById('greetResult');
  resultDiv.innerHTML =
    '<div class="result">' +
    message +
    '<br><small>関数式で定義された greet() を使用</small>' +
    '</div>';
};

// 計算機のテスト
const testCalculator = function() {
  const num1 = Number(document.getElementById('num1Input').value);
  const num2 = Number(document.getElementById('num2Input').value);

  const resultDiv = document.getElementById('calcResult');
  resultDiv.innerHTML =
    '<div class="result">' +
    num1 + ' + ' + num2 + ' = ' + add(num1, num2) + '<br>' +
    num1 + ' - ' + num2 + ' = ' + subtract(num1, num2) + '<br>' +
    num1 + ' × ' + num2 + ' = ' + multiply(num1, num2) + '<br>' +
    num1 + ' ÷ ' + num2 + ' = ' + divide(num1, num2) +
    '<br><small>すべて関数式で定義</small>' +
    '</div>';
};

// 関数を値として扱うテスト
const testFunctionAsValue = function() {
  // 関数を定義
  const func1 = function() {
    return 'Hello from func1';
  };

  // 関数を別の変数にコピー
  const func2 = func1;

  // 両方実行してみる
  const result1 = func1();
  const result2 = func2();

  const resultDiv = document.getElementById('valueResult');
  resultDiv.innerHTML =
    '<div class="result">' +
    'func1(): ' + result1 + '<br>' +
    'func2(): ' + result2 + '<br>' +
    '<small>func2 は func1 のコピー。同じ関数を実行している</small>' +
    '</div>';
};
