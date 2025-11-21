// ========================================
// 再帰関数の実装
// ========================================

// 1. カウントダウン（再帰版）
const countdown = function(n) {
  // ベースケース：0以下になったら終了
  if (n <= 0) {
    return '完了！';
  }

  // 再帰ケース：現在の数 + 改行 + 残りのカウントダウン
  return n + '\n' + countdown(n - 1);
};

// 2. 階乗（n! = n × (n-1) × ... × 1）
const factorial = function(n) {
  // ベースケース
  if (n <= 1) {
    return 1;
  }

  // 再帰ケース
  return n * factorial(n - 1);
};

// 3. 累乗（base ^ exponent）
const power = function(base, exponent) {
  // ベースケース
  if (exponent === 0) {
    return 1;
  }

  // 再帰ケース
  return base * power(base, exponent - 1);
};

// 4. 配列の合計
const sum = function(array) {
  // ベースケース：配列が空
  if (array.length === 0) {
    return 0;
  }

  // 再帰ケース：最初の要素 + 残りの合計
  return array[0] + sum(array.slice(1));
};

// ========================================
// UI関数
// ========================================

// カウントダウンのテスト
function testCountdown() {
  const n = Number(document.getElementById('countdownInput').value);
  const result = countdown(n);
  document.getElementById('countdownResult').textContent = result;
}

// 階乗のテスト
function testFactorial() {
  const n = Number(document.getElementById('factorialInput').value);
  const result = factorial(n);

  // 計算過程を表示
  let process = n + '! = ';
  const steps = [];
  for (let i = n; i >= 1; i--) {
    steps.push(i);
  }
  process += steps.join(' × ') + ' = ' + result;

  document.getElementById('factorialResult').textContent = process;
}

// 累乗のテスト
function testPower() {
  const base = Number(document.getElementById('baseInput').value);
  const exponent = Number(document.getElementById('exponentInput').value);
  const result = power(base, exponent);

  // 計算過程を表示
  let process = base + '^' + exponent + ' = ';
  const steps = [];
  for (let i = 0; i < exponent; i++) {
    steps.push(base);
  }
  process += steps.join(' × ') + ' = ' + result;

  document.getElementById('powerResult').textContent = process;
}

// 配列の合計のテスト
function testSum() {
  const testArrays = [
    [1, 2, 3, 4, 5],
    [10, 20, 30],
    [100]
  ];

  let output = '';
  testArrays.forEach(function(arr) {
    const result = sum(arr);
    output += '[' + arr.join(', ') + '] の合計 = ' + result + '\n';
  });

  document.getElementById('sumResult').textContent = output;
}

// ========================================
// その他の再帰関数（コンソールで確認）
// ========================================

// 文字列の反転
const reverse = function(str) {
  if (str.length <= 1) {
    return str;
  }
  return str[str.length - 1] + reverse(str.slice(0, -1));
};

console.log('文字列の反転:');
console.log('reverse("hello"):', reverse('hello'));  // 'olleh'

// フィボナッチ数列
const fibonacci = function(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

console.log('フィボナッチ数列:');
console.log('fibonacci(6):', fibonacci(6));  // 8

// 配列の最大値
const max = function(array) {
  if (array.length === 1) {
    return array[0];
  }
  const restMax = max(array.slice(1));
  return array[0] > restMax ? array[0] : restMax;
};

console.log('配列の最大値:');
console.log('max([3, 7, 2, 9, 1]):', max([3, 7, 2, 9, 1]));  // 9

// カウントアップ
const countUp = function(start, end) {
  if (start > end) {
    return '';
  }
  if (start === end) {
    return start.toString();
  }
  return start + '\n' + countUp(start + 1, end);
};

console.log('カウントアップ:');
console.log(countUp(1, 5));
