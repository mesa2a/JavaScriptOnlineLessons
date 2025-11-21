// ========================================
// 関数型プログラミングの関数定義
// ========================================

// 純粋関数の例
const add = function(a, b) {
  return a + b;
};

const multiply = function(a, b) {
  return a * b;
};

// 配列操作の関数（不変性を保つ）
const addElement = function(array, element) {
  return [...array, element];
};

const removeElement = function(array, index) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

const updateElement = function(array, index, newValue) {
  return array.map((item, i) => i === index ? newValue : item);
};

// 関数の合成用の小さな関数
const double = function(n) {
  return n * 2;
};

const addTen = function(n) {
  return n + 10;
};

const square = function(n) {
  return n * n;
};

// ========================================
// 1. 純粋関数 vs 純粋でない関数
// ========================================
let output1 = '=== 純粋関数 ===\n\n';

// 純粋関数
output1 += '純粋関数（add）:\n';
output1 += 'add(2, 3) = ' + add(2, 3) + '\n';
output1 += 'add(2, 3) = ' + add(2, 3) + '\n';
output1 += '→ 常に同じ結果が返る\n\n';

// 純粋でない関数の例
output1 += '=== 純粋でない関数 ===\n\n';
let globalCounter = 0;

const impureIncrement = function() {
  globalCounter = globalCounter + 1;
  return globalCounter;
};

output1 += '純粋でない関数（impureIncrement）:\n';
output1 += 'impureIncrement() = ' + impureIncrement() + '\n';
output1 += 'impureIncrement() = ' + impureIncrement() + '\n';
output1 += '→ 呼び出すたびに異なる結果が返る\n\n';

// 純粋関数に書き換え
const pureIncrement = function(counter) {
  return counter + 1;
};

output1 += '純粋関数版（pureIncrement）:\n';
output1 += 'pureIncrement(0) = ' + pureIncrement(0) + '\n';
output1 += 'pureIncrement(0) = ' + pureIncrement(0) + '\n';
output1 += '→ 常に同じ結果が返る';

document.getElementById('pureFunctionOutput').textContent = output1;

// ========================================
// 2. 不変性（配列操作）
// ========================================
let output2 = '=== 不変性のデモ ===\n\n';

const original = [1, 2, 3, 4, 5];
output2 += '元の配列: [' + original.join(', ') + ']\n\n';

// 要素を追加
const added = addElement(original, 6);
output2 += '要素を追加:\n';
output2 += '  元の配列: [' + original.join(', ') + ']\n';
output2 += '  新しい配列: [' + added.join(', ') + ']\n\n';

// 要素を削除
const removed = removeElement(original, 2);
output2 += '要素を削除（インデックス2）:\n';
output2 += '  元の配列: [' + original.join(', ') + ']\n';
output2 += '  新しい配列: [' + removed.join(', ') + ']\n\n';

// 要素を更新
const updated = updateElement(original, 2, 30);
output2 += '要素を更新（インデックス2を30に）:\n';
output2 += '  元の配列: [' + original.join(', ') + ']\n';
output2 += '  新しい配列: [' + updated.join(', ') + ']\n\n';

output2 += '→ すべての操作で元の配列は変更されていません';

document.getElementById('immutabilityOutput').textContent = output2;

// ========================================
// 3. スプレッド構文
// ========================================
let output3 = '=== スプレッド構文 ===\n\n';

// 配列のコピー
const arr1 = [1, 2, 3];
const arr2 = [...arr1];
arr2.push(4);

output3 += '配列のコピー:\n';
output3 += '  元の配列: [' + arr1.join(', ') + ']\n';
output3 += '  コピー後: [' + arr2.join(', ') + ']\n\n';

// 配列の結合
const arr3 = [1, 2, 3];
const arr4 = [4, 5, 6];
const combined = [...arr3, ...arr4];

output3 += '配列の結合:\n';
output3 += '  配列1: [' + arr3.join(', ') + ']\n';
output3 += '  配列2: [' + arr4.join(', ') + ']\n';
output3 += '  結合後: [' + combined.join(', ') + ']\n\n';

// オブジェクトのコピー
const user = { name: '太郎', age: 25 };
const updatedUser = { ...user, age: 26 };

output3 += 'オブジェクトのコピー:\n';
output3 += '  元: { name: "' + user.name + '", age: ' + user.age + ' }\n';
output3 += '  更新: { name: "' + updatedUser.name + '", age: ' + updatedUser.age + ' }';

document.getElementById('spreadOutput').textContent = output3;

// ========================================
// 4. map、filter、reduce
// ========================================
let output4 = '=== map、filter、reduce ===\n\n';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map
const doubled = numbers.map(n => n * 2);
output4 += 'map（各要素を2倍）:\n';
output4 += '  元: [' + numbers.join(', ') + ']\n';
output4 += '  結果: [' + doubled.join(', ') + ']\n\n';

// filter
const evens = numbers.filter(n => n % 2 === 0);
output4 += 'filter（偶数のみ）:\n';
output4 += '  元: [' + numbers.join(', ') + ']\n';
output4 += '  結果: [' + evens.join(', ') + ']\n\n';

// reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);
const max = numbers.reduce((acc, n) => n > acc ? n : acc, numbers[0]);

output4 += 'reduce:\n';
output4 += '  合計: ' + sum + '\n';
output4 += '  最大値: ' + max;

document.getElementById('arrayMethodsOutput').textContent = output4;

// ========================================
// 5. メソッドチェーン
// ========================================
let output5 = '=== メソッドチェーン ===\n\n';

const users = [
  { name: '太郎', age: 25, active: true },
  { name: '花子', age: 30, active: true },
  { name: '一郎', age: 20, active: false },
  { name: '美咲', age: 28, active: true }
];

// アクティブなユーザーの名前を取得
const activeUserNames = users
  .filter(user => user.active)
  .map(user => user.name);

output5 += 'アクティブなユーザーの名前:\n';
output5 += '  ' + activeUserNames.join(', ') + '\n\n';

// アクティブなユーザーの平均年齢
const activeUsers = users.filter(user => user.active);
const totalAge = activeUsers.reduce((sum, user) => sum + user.age, 0);
const averageAge = totalAge / activeUsers.length;

output5 += 'アクティブなユーザーの平均年齢:\n';
output5 += '  ' + averageAge.toFixed(1) + '歳\n\n';

// 30歳未満のユーザー名を取得して大文字に
const youngUsers = users
  .filter(user => user.age < 30)
  .map(user => user.name)
  .map(name => name.toUpperCase());

output5 += '30歳未満のユーザー（大文字）:\n';
output5 += '  ' + youngUsers.join(', ');

document.getElementById('chainOutput').textContent = output5;

// ========================================
// 6. 実践例: ショッピングカート
// ========================================
const cart = [
  { name: 'りんご', price: 100, quantity: 3 },
  { name: 'バナナ', price: 80, quantity: 5 },
  { name: 'オレンジ', price: 120, quantity: 2 },
  { name: 'ぶどう', price: 150, quantity: 1 }
];

// 各商品の小計を計算
const cartWithSubtotal = cart.map(item => ({
  ...item,
  subtotal: item.price * item.quantity
}));

let cartHTML = '<table>';
cartHTML += '<tr><th>商品名</th><th>単価</th><th>数量</th><th>小計</th></tr>';

for (let i = 0; i < cartWithSubtotal.length; i++) {
  const item = cartWithSubtotal[i];
  cartHTML += '<tr>';
  cartHTML += '<td>' + item.name + '</td>';
  cartHTML += '<td>¥' + item.price.toLocaleString() + '</td>';
  cartHTML += '<td>' + item.quantity + '</td>';
  cartHTML += '<td>¥' + item.subtotal.toLocaleString() + '</td>';
  cartHTML += '</tr>';
}

// 合計金額を計算
const total = cartWithSubtotal.reduce((sum, item) => sum + item.subtotal, 0);

cartHTML += '<tr style="font-weight: bold; background-color: #f0f0f0;">';
cartHTML += '<td colspan="3">合計</td>';
cartHTML += '<td>¥' + total.toLocaleString() + '</td>';
cartHTML += '</tr>';

cartHTML += '</table>';

// 100円以上の商品のみの合計
const expensiveTotal = cart
  .filter(item => item.price >= 100)
  .map(item => item.price * item.quantity)
  .reduce((sum, subtotal) => sum + subtotal, 0);

cartHTML += '<div class="card">';
cartHTML += '<strong>100円以上の商品の合計:</strong> ¥' + expensiveTotal.toLocaleString();
cartHTML += '</div>';

document.getElementById('cartOutput').innerHTML = cartHTML;

// ========================================
// 7. 関数の合成
// ========================================
let output7 = '=== 関数の合成 ===\n\n';

output7 += '小さな関数:\n';
output7 += '  double(n) = n * 2\n';
output7 += '  addTen(n) = n + 10\n';
output7 += '  square(n) = n * n\n\n';

const number = 5;
output7 += '入力: ' + number + '\n\n';

// ステップごとに適用
const step1 = double(number);
const step2 = addTen(step1);
const step3 = square(step2);

output7 += 'ステップ1（double）: ' + number + ' → ' + step1 + '\n';
output7 += 'ステップ2（addTen）: ' + step1 + ' → ' + step2 + '\n';
output7 += 'ステップ3（square）: ' + step2 + ' → ' + step3 + '\n\n';

// 一度に適用
const result = square(addTen(double(number)));
output7 += '一度に適用: ' + result + '\n';
output7 += '計算式: ((5 * 2) + 10)^2 = 400';

document.getElementById('compositionOutput').textContent = output7;

// ========================================
// 8. 総合例: データ処理パイプライン
// ========================================
const students = [
  { id: 1, name: '田中太郎', scores: [85, 92, 78, 88, 90], active: true },
  { id: 2, name: '佐藤花子', scores: [92, 88, 95, 90, 93], active: true },
  { id: 3, name: '鈴木一郎', scores: [78, 82, 75, 80, 85], active: false },
  { id: 4, name: '高橋美咲', scores: [88, 85, 90, 92, 87], active: true },
  { id: 5, name: '伊藤健太', scores: [70, 75, 72, 78, 80], active: true }
];

// 処理パイプライン
const processedStudents = students
  // アクティブな学生のみ
  .filter(student => student.active)
  // 平均点を追加
  .map(student => ({
    ...student,
    average: student.scores.reduce((sum, score) => sum + score, 0) / student.scores.length
  }))
  // 平均点でソート（降順）
  .sort((a, b) => b.average - a.average)
  // 上位3名のみ
  .slice(0, 3);

let pipelineHTML = '<div class="card">';
pipelineHTML += '<h3>処理パイプライン</h3>';
pipelineHTML += '<ol>';
pipelineHTML += '<li>アクティブな学生のみをフィルタ</li>';
pipelineHTML += '<li>各学生の平均点を計算</li>';
pipelineHTML += '<li>平均点で降順にソート</li>';
pipelineHTML += '<li>上位3名を取得</li>';
pipelineHTML += '</ol>';
pipelineHTML += '</div>';

pipelineHTML += '<table>';
pipelineHTML += '<tr><th>順位</th><th>名前</th><th>平均点</th><th>最高点</th><th>最低点</th></tr>';

for (let i = 0; i < processedStudents.length; i++) {
  const student = processedStudents[i];
  const maxScore = student.scores.reduce((max, score) => score > max ? score : max, student.scores[0]);
  const minScore = student.scores.reduce((min, score) => score < min ? score : min, student.scores[0]);

  pipelineHTML += '<tr>';
  pipelineHTML += '<td>' + (i + 1) + '位</td>';
  pipelineHTML += '<td>' + student.name + '</td>';
  pipelineHTML += '<td>' + student.average.toFixed(1) + '</td>';
  pipelineHTML += '<td>' + maxScore + '</td>';
  pipelineHTML += '<td>' + minScore + '</td>';
  pipelineHTML += '</tr>';
}

pipelineHTML += '</table>';

// 統計情報
const allActiveStudents = students.filter(s => s.active);
const allScores = allActiveStudents
  .map(s => s.scores)
  .reduce((all, scores) => [...all, ...scores], []);

const overallAverage = allScores.reduce((sum, score) => sum + score, 0) / allScores.length;

pipelineHTML += '<div class="card">';
pipelineHTML += '<h3>全体統計（アクティブな学生）</h3>';
pipelineHTML += '<p>学生数: ' + allActiveStudents.length + '人</p>';
pipelineHTML += '<p>総スコア数: ' + allScores.length + '件</p>';
pipelineHTML += '<p>全体平均: ' + overallAverage.toFixed(1) + '点</p>';
pipelineHTML += '</div>';

document.getElementById('pipelineOutput').innerHTML = pipelineHTML;

// ========================================
// コンソールにデバッグ情報を出力
// ========================================
console.log('=== レッスン130: 関数型プログラミング入門 ===');
console.log('');

console.log('1. 純粋関数:');
console.log('  add(2, 3) =', add(2, 3));
console.log('  multiply(4, 5) =', multiply(4, 5));
console.log('');

console.log('2. 配列操作（不変性）:');
console.log('  元の配列:', original);
console.log('  追加後:', added);
console.log('  削除後:', removed);
console.log('  更新後:', updated);
console.log('');

console.log('3. map/filter/reduce:');
console.log('  doubled:', doubled);
console.log('  evens:', evens);
console.log('  sum:', sum);
console.log('');

console.log('4. メソッドチェーン:');
console.log('  アクティブユーザー:', activeUserNames);
console.log('  平均年齢:', averageAge);
console.log('');

console.log('5. 関数の合成:');
console.log('  square(addTen(double(5))) =', result);
