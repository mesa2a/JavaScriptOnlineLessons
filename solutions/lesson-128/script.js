// ========================================
// ユーティリティ関数の定義
// ========================================

// 日付フォーマット関数
const formatDate = function(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
};

const formatDateSlash = function(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

// 数値フォーマット関数
const formatNumber = function(num) {
  return num.toLocaleString('ja-JP');
};

const formatDecimal = function(num, digits) {
  return num.toFixed(digits);
};

const formatPrice = function(price) {
  return '¥' + price.toLocaleString('ja-JP');
};

// 文字列操作関数
const truncate = function(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
};

const capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const repeat = function(str, count) {
  let result = '';
  for (let i = 0; i < count; i++) {
    result += str;
  }
  return result;
};

// 配列操作関数
const max = function(array) {
  let maxValue = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }
  return maxValue;
};

const min = function(array) {
  let minValue = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    }
  }
  return minValue;
};

const average = function(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / array.length;
};

const sum = function(array) {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }
  return total;
};

// ========================================
// 1. 日付フォーマットのデモ
// ========================================
const today = new Date();
const specificDate = new Date(2024, 0, 15); // 2024年1月15日

let dateOutput = '=== 日付フォーマット ===\n\n';
dateOutput += '今日の日付:\n';
dateOutput += formatDate(today) + '\n\n';
dateOutput += '特定の日付:\n';
dateOutput += formatDate(specificDate) + '\n';
dateOutput += formatDateSlash(specificDate) + '\n';

document.getElementById('dateOutput').textContent = dateOutput;

// ========================================
// 2. 数値フォーマットのデモ
// ========================================
let numberOutput = '=== 数値フォーマット ===\n\n';

numberOutput += '3桁区切りのカンマ:\n';
numberOutput += formatNumber(1234567) + '\n';
numberOutput += formatNumber(1000) + '\n';
numberOutput += formatNumber(123) + '\n\n';

numberOutput += '小数点以下の桁数指定:\n';
numberOutput += formatDecimal(3.14159, 2) + '\n';
numberOutput += formatDecimal(10, 2) + '\n';
numberOutput += formatDecimal(5.6789, 3) + '\n\n';

numberOutput += '価格表示:\n';
numberOutput += formatPrice(29800) + '\n';
numberOutput += formatPrice(1250) + '\n';
numberOutput += formatPrice(999999) + '\n';

document.getElementById('numberOutput').textContent = numberOutput;

// ========================================
// 3. 文字列操作のデモ
// ========================================
let stringOutput = '=== 文字列操作 ===\n\n';

stringOutput += '文字列の切り詰め:\n';
stringOutput += truncate('こんにちは', 5) + '\n';
stringOutput += truncate('こんにちは世界', 5) + '\n';
stringOutput += truncate('長い文字列です', 3) + '\n\n';

stringOutput += '最初の文字を大文字に:\n';
stringOutput += capitalize('hello') + '\n';
stringOutput += capitalize('world') + '\n\n';

stringOutput += '文字列の反復:\n';
stringOutput += repeat('★', 5) + '\n';
stringOutput += repeat('Hello', 3) + '\n';
stringOutput += repeat('-', 10) + '\n';

document.getElementById('stringOutput').textContent = stringOutput;

// ========================================
// 4. 配列操作のデモ
// ========================================
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
const scores = [80, 90, 70, 85, 95];

let arrayOutput = '=== 配列操作 ===\n\n';

arrayOutput += '配列: [' + numbers.join(', ') + ']\n';
arrayOutput += '最大値: ' + max(numbers) + '\n';
arrayOutput += '最小値: ' + min(numbers) + '\n\n';

arrayOutput += 'スコア: [' + scores.join(', ') + ']\n';
arrayOutput += '最高点: ' + max(scores) + '\n';
arrayOutput += '最低点: ' + min(scores) + '\n';
arrayOutput += '平均点: ' + formatDecimal(average(scores), 1) + '\n';
arrayOutput += '合計点: ' + sum(scores) + '\n';

document.getElementById('arrayOutput').textContent = arrayOutput;

// ========================================
// 5. 実践例: 商品情報の表示
// ========================================
const products = [
  {
    name: 'プログラミング学習コース 完全版',
    price: 29800,
    releaseDate: new Date(2024, 0, 15),
    description: 'JavaScriptの基礎から応用までを網羅した総合学習コース'
  },
  {
    name: 'Web開発マスター講座',
    price: 19800,
    releaseDate: new Date(2024, 1, 1),
    description: 'HTML、CSS、JavaScriptを使った実践的なWeb開発スキルを習得'
  },
  {
    name: 'データ構造とアルゴリズム入門',
    price: 24800,
    releaseDate: new Date(2024, 2, 10),
    description: 'プログラミングの基礎となるデータ構造とアルゴリズムを学ぶ'
  }
];

let productHTML = '';
for (let i = 0; i < products.length; i++) {
  const product = products[i];
  const displayName = truncate(product.name, 20);
  const displayPrice = formatPrice(product.price);
  const displayDate = formatDateSlash(product.releaseDate);
  const displayDescription = truncate(product.description, 30);

  productHTML += `
    <div class="product-card">
      <h3>${displayName}</h3>
      <p class="product-info">${displayDescription}</p>
      <div class="price">${displayPrice}</div>
      <p class="product-info">発売日: ${displayDate}</p>
    </div>
  `;
}

document.getElementById('productOutput').innerHTML = productHTML;

// ========================================
// 6. 総合例: スコア管理システム
// ========================================
const students = [
  { name: '田中太郎', scores: [85, 92, 78, 88, 90] },
  { name: '佐藤花子', scores: [92, 88, 95, 90, 93] },
  { name: '鈴木一郎', scores: [78, 82, 75, 80, 85] },
  { name: '高橋美咲', scores: [88, 85, 90, 92, 87] }
];

let scoreHTML = '<table>';
scoreHTML += '<tr><th>氏名</th><th>最高点</th><th>最低点</th><th>平均点</th><th>合計点</th></tr>';

for (let i = 0; i < students.length; i++) {
  const student = students[i];
  const maxScore = max(student.scores);
  const minScore = min(student.scores);
  const avgScore = formatDecimal(average(student.scores), 1);
  const totalScore = sum(student.scores);

  scoreHTML += '<tr>';
  scoreHTML += '<td>' + student.name + '</td>';
  scoreHTML += '<td>' + maxScore + '</td>';
  scoreHTML += '<td>' + minScore + '</td>';
  scoreHTML += '<td>' + avgScore + '</td>';
  scoreHTML += '<td>' + totalScore + '</td>';
  scoreHTML += '</tr>';
}

scoreHTML += '</table>';

// 全体統計
const allScores = [];
for (let i = 0; i < students.length; i++) {
  for (let j = 0; j < students[i].scores.length; j++) {
    allScores.push(students[i].scores[j]);
  }
}

scoreHTML += '<div class="output" style="margin-top: 20px;">';
scoreHTML += '=== 全体統計 ===\n\n';
scoreHTML += '全員の最高点: ' + max(allScores) + '\n';
scoreHTML += '全員の最低点: ' + min(allScores) + '\n';
scoreHTML += '全員の平均点: ' + formatDecimal(average(allScores), 1) + '\n';
scoreHTML += '総スコア数: ' + formatNumber(allScores.length) + '\n';
scoreHTML += '</div>';

document.getElementById('scoreOutput').innerHTML = scoreHTML;
