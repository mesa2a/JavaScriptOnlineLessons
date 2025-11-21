// ========================================
// ユーティリティ関数の定義
// ========================================

// 日付フォーマット関数
// TODO: formatDate関数を実装してください
// 引数: date (Dateオブジェクト)
// 戻り値: "YYYY年MM月DD日" 形式の文字列
// ヒント: getFullYear(), getMonth(), getDate(), padStart()を使います
const formatDate = function(date) {
  // ここにコードを書いてください
};

// TODO: formatDateSlash関数を実装してください
// 引数: date (Dateオブジェクト)
// 戻り値: "YYYY/MM/DD" 形式の文字列
const formatDateSlash = function(date) {
  // ここにコードを書いてください
};

// 数値フォーマット関数
// TODO: formatNumber関数を実装してください
// 引数: num (数値)
// 戻り値: 3桁区切りのカンマを入れた文字列
// ヒント: toLocaleString('ja-JP')を使います
const formatNumber = function(num) {
  // ここにコードを書いてください
};

// TODO: formatDecimal関数を実装してください
// 引数: num (数値), digits (小数点以下の桁数)
// 戻り値: 指定した桁数で丸めた文字列
// ヒント: toFixed()を使います
const formatDecimal = function(num, digits) {
  // ここにコードを書いてください
};

// TODO: formatPrice関数を実装してください
// 引数: price (価格)
// 戻り値: "¥1,234" のような価格表示
// ヒント: formatNumber()を使って、前に"¥"を付けます
const formatPrice = function(price) {
  // ここにコードを書いてください
};

// 文字列操作関数
// TODO: truncate関数を実装してください
// 引数: str (文字列), maxLength (最大長)
// 戻り値: maxLengthより長い場合は切り詰めて"..."を付けた文字列
// ヒント: lengthで長さを確認し、slice()で切り取ります
const truncate = function(str, maxLength) {
  // ここにコードを書いてください
};

// TODO: capitalize関数を実装してください
// 引数: str (文字列)
// 戻り値: 最初の文字を大文字にした文字列
// ヒント: charAt(0).toUpperCase() + slice(1)
const capitalize = function(str) {
  // ここにコードを書いてください
};

// TODO: repeat関数を実装してください
// 引数: str (文字列), count (繰り返し回数)
// 戻り値: strをcount回繰り返した文字列
// ヒント: forループで文字列を連結します
const repeat = function(str, count) {
  // ここにコードを書いてください
};

// 配列操作関数
// TODO: max関数を実装してください
// 引数: array (数値の配列)
// 戻り値: 配列の最大値
// ヒント: forループで全要素を比較します
const max = function(array) {
  // ここにコードを書いてください
};

// TODO: min関数を実装してください
// 引数: array (数値の配列)
// 戻り値: 配列の最小値
const min = function(array) {
  // ここにコードを書いてください
};

// TODO: average関数を実装してください
// 引数: array (数値の配列)
// 戻り値: 配列の平均値
// ヒント: sum()を使うか、forループで合計を計算して要素数で割ります
const average = function(array) {
  // ここにコードを書いてください
};

// TODO: sum関数を実装してください
// 引数: array (数値の配列)
// 戻り値: 配列の合計値
const sum = function(array) {
  // ここにコードを書いてください
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
