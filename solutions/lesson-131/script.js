// ========================================
// アロー関数の定義
// ========================================

// 基本的なアロー関数
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// 引数が1つのアロー関数
const double = n => n * 2;
const square = n => n * n;
const greet = name => 'こんにちは、' + name + 'さん';

// 引数がないアロー関数
const getRandomNumber = () => Math.random();
const getCurrentTime = () => new Date().toLocaleTimeString();

// 複数行の処理
const processNumber = n => {
  const doubled = n * 2;
  const added = doubled + 10;
  const squared = added * added;
  return squared;
};

// オブジェクトを返すアロー関数
const makePerson = (name, age) => ({ name: name, age: age });
const makePoint = (x, y) => ({ x, y }); // プロパティの省略記法

// ========================================
// 1. 基本的な書き方の比較
// ========================================
let output1 = '=== 通常の関数 vs アロー関数 ===\n\n';

// 通常の関数
const addNormal = function(a, b) {
  return a + b;
};

// アロー関数（完全な形）
const addArrow1 = (a, b) => {
  return a + b;
};

// アロー関数（省略形）
const addArrow2 = (a, b) => a + b;

output1 += '通常の関数:\n';
output1 += '  const add = function(a, b) { return a + b; }\n';
output1 += '  add(2, 3) = ' + addNormal(2, 3) + '\n\n';

output1 += 'アロー関数（完全な形）:\n';
output1 += '  const add = (a, b) => { return a + b; }\n';
output1 += '  add(2, 3) = ' + addArrow1(2, 3) + '\n\n';

output1 += 'アロー関数（省略形）:\n';
output1 += '  const add = (a, b) => a + b\n';
output1 += '  add(2, 3) = ' + addArrow2(2, 3) + '\n\n';

output1 += '→ すべて同じ結果が返ります';

document.getElementById('basicOutput').textContent = output1;

// ========================================
// 2. 様々な書き方
// ========================================
let output2 = '=== アロー関数の様々な書き方 ===\n\n';

// 引数なし
output2 += '引数なし:\n';
output2 += '  () => Math.random()\n';
output2 += '  結果: ' + getRandomNumber() + '\n\n';

// 引数1つ（括弧省略可能）
output2 += '引数1つ（括弧省略）:\n';
output2 += '  n => n * 2\n';
output2 += '  double(5) = ' + double(5) + '\n\n';

// 引数2つ以上（括弧必須）
output2 += '引数2つ以上（括弧必須）:\n';
output2 += '  (a, b) => a + b\n';
output2 += '  add(3, 4) = ' + add(3, 4) + '\n\n';

// 複数行の処理
output2 += '複数行の処理:\n';
output2 += '  processNumber(5) = ' + processNumber(5) + '\n';
output2 += '  計算式: ((5 * 2) + 10)^2 = 400\n\n';

// オブジェクトを返す
const person = makePerson('太郎', 25);
output2 += 'オブジェクトを返す:\n';
output2 += '  (name, age) => ({ name, age })\n';
output2 += '  結果: { name: "' + person.name + '", age: ' + person.age + ' }';

document.getElementById('syntaxOutput').textContent = output2;

// ========================================
// 3. 配列メソッドでの活用
// ========================================
let output3 = '=== 配列メソッドでの活用 ===\n\n';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map
const doubled = numbers.map(n => n * 2);
output3 += 'map（2倍）:\n';
output3 += '  numbers.map(n => n * 2)\n';
output3 += '  [' + numbers.join(', ') + ']\n';
output3 += '  → [' + doubled.join(', ') + ']\n\n';

// filter
const evens = numbers.filter(n => n % 2 === 0);
output3 += 'filter（偶数のみ）:\n';
output3 += '  numbers.filter(n => n % 2 === 0)\n';
output3 += '  → [' + evens.join(', ') + ']\n\n';

// reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);
const max = numbers.reduce((acc, n) => n > acc ? n : acc, numbers[0]);
output3 += 'reduce:\n';
output3 += '  合計: numbers.reduce((acc, n) => acc + n, 0) = ' + sum + '\n';
output3 += '  最大値: numbers.reduce((acc, n) => n > acc ? n : acc) = ' + max;

document.getElementById('arrayMethodsOutput').textContent = output3;

// ========================================
// 4. オブジェクトを返す
// ========================================
let output4 = '=== オブジェクトを返すアロー関数 ===\n\n';

const users = ['太郎', '花子', '一郎'];

// mapでオブジェクトの配列を作成
const userObjects = users.map((name, index) => ({
  id: index + 1,
  name: name,
  email: name + '@example.com'
}));

output4 += 'ユーザー配列からオブジェクト配列を作成:\n\n';
for (let i = 0; i < userObjects.length; i++) {
  const user = userObjects[i];
  output4 += `{ id: ${user.id}, name: "${user.name}", email: "${user.email}" }\n`;
}

document.getElementById('objectOutput').textContent = output4;

// ========================================
// 5. メソッドチェーン
// ========================================
let output5 = '=== メソッドチェーン ===\n\n';

const people = [
  { name: '太郎', age: 25, active: true },
  { name: '花子', age: 30, active: true },
  { name: '一郎', age: 20, active: false },
  { name: '美咲', age: 28, active: true },
  { name: '健太', age: 22, active: false }
];

// アクティブなユーザーの名前を取得
const activeNames = people
  .filter(person => person.active)
  .map(person => person.name);

output5 += 'アクティブなユーザーの名前:\n';
output5 += '  ' + activeNames.join(', ') + '\n\n';

// 25歳以上のアクティブなユーザーの平均年齢
const activeAdults = people
  .filter(person => person.active && person.age >= 25);

const totalAge = activeAdults.reduce((sum, person) => sum + person.age, 0);
const averageAge = totalAge / activeAdults.length;

output5 += '25歳以上のアクティブなユーザーの平均年齢:\n';
output5 += '  対象者: ' + activeAdults.map(p => p.name).join(', ') + '\n';
output5 += '  平均年齢: ' + averageAge.toFixed(1) + '歳';

document.getElementById('chainOutput').textContent = output5;

// ========================================
// 6. 実践例: ショッピングカート
// ========================================
const products = [
  { name: 'りんご', price: 100, quantity: 3 },
  { name: 'バナナ', price: 80, quantity: 5 },
  { name: 'オレンジ', price: 120, quantity: 2 },
  { name: 'ぶどう', price: 150, quantity: 1 }
];

// 小計を追加
const withSubtotal = products.map(product => ({
  ...product,
  subtotal: product.price * product.quantity
}));

let cartHTML = '<table>';
cartHTML += '<tr><th>商品名</th><th>単価</th><th>数量</th><th>小計</th></tr>';

withSubtotal.forEach(product => {
  cartHTML += '<tr>';
  cartHTML += '<td>' + product.name + '</td>';
  cartHTML += '<td>¥' + product.price.toLocaleString() + '</td>';
  cartHTML += '<td>' + product.quantity + '</td>';
  cartHTML += '<td>¥' + product.subtotal.toLocaleString() + '</td>';
  cartHTML += '</tr>';
});

// 合計金額
const total = withSubtotal.reduce((sum, product) => sum + product.subtotal, 0);

cartHTML += '<tr style="font-weight: bold; background-color: #f0f0f0;">';
cartHTML += '<td colspan="3">合計</td>';
cartHTML += '<td>¥' + total.toLocaleString() + '</td>';
cartHTML += '</tr>';
cartHTML += '</table>';

// 100円以上の商品のみの合計
const expensiveTotal = products
  .filter(product => product.price >= 100)
  .reduce((sum, product) => sum + product.price * product.quantity, 0);

cartHTML += '<div class="card">';
cartHTML += '<strong>100円以上の商品の合計:</strong> ¥' + expensiveTotal.toLocaleString();
cartHTML += '</div>';

document.getElementById('cartOutput').innerHTML = cartHTML;

// ========================================
// 7. 実践例: データ処理
// ========================================
const students = [
  { id: 1, name: '田中太郎', scores: [85, 92, 78, 88, 90], active: true },
  { id: 2, name: '佐藤花子', scores: [92, 88, 95, 90, 93], active: true },
  { id: 3, name: '鈴木一郎', scores: [78, 82, 75, 80, 85], active: false },
  { id: 4, name: '高橋美咲', scores: [88, 85, 90, 92, 87], active: true },
  { id: 5, name: '伊藤健太', scores: [70, 75, 72, 78, 80], active: true }
];

// データ処理パイプライン
const processedStudents = students
  .filter(student => student.active)
  .map(student => ({
    ...student,
    average: student.scores.reduce((sum, score) => sum + score, 0) / student.scores.length,
    max: student.scores.reduce((max, score) => score > max ? score : max, student.scores[0]),
    min: student.scores.reduce((min, score) => score < min ? score : min, student.scores[0])
  }))
  .sort((a, b) => b.average - a.average);

let dataHTML = '<table>';
dataHTML += '<tr><th>順位</th><th>名前</th><th>平均点</th><th>最高点</th><th>最低点</th></tr>';

processedStudents.forEach((student, index) => {
  dataHTML += '<tr>';
  dataHTML += '<td>' + (index + 1) + '位</td>';
  dataHTML += '<td>' + student.name + '</td>';
  dataHTML += '<td>' + student.average.toFixed(1) + '</td>';
  dataHTML += '<td>' + student.max + '</td>';
  dataHTML += '<td>' + student.min + '</td>';
  dataHTML += '</tr>';
});

dataHTML += '</table>';

// 統計情報
const allScores = students
  .filter(s => s.active)
  .map(s => s.scores)
  .reduce((all, scores) => [...all, ...scores], []);

const overallAverage = allScores.reduce((sum, score) => sum + score, 0) / allScores.length;

dataHTML += '<div class="card">';
dataHTML += '<h3>統計情報</h3>';
dataHTML += '<p>アクティブな学生: ' + processedStudents.length + '人</p>';
dataHTML += '<p>総スコア数: ' + allScores.length + '件</p>';
dataHTML += '<p>全体平均: ' + overallAverage.toFixed(1) + '点</p>';
dataHTML += '</div>';

document.getElementById('dataOutput').innerHTML = dataHTML;

// ========================================
// 8. 比較表
// ========================================
const comparisons = [
  {
    category: '引数なし',
    normal: 'function() { ... }',
    arrow: '() => { ... }',
    example: 'getCurrentTime()'
  },
  {
    category: '引数1つ',
    normal: 'function(n) { ... }',
    arrow: 'n => { ... }',
    example: 'double(5)'
  },
  {
    category: '引数2つ以上',
    normal: 'function(a, b) { ... }',
    arrow: '(a, b) => { ... }',
    example: 'add(2, 3)'
  },
  {
    category: '1行の処理',
    normal: 'function(n) { return n * 2 }',
    arrow: 'n => n * 2',
    example: '省略形が便利'
  },
  {
    category: '複数行の処理',
    normal: 'function(n) { ... return result }',
    arrow: 'n => { ... return result }',
    example: 'returnが必要'
  }
];

let comparisonHTML = '<table>';
comparisonHTML += '<tr><th>カテゴリ</th><th>通常の関数</th><th>アロー関数</th><th>備考</th></tr>';

comparisons.forEach(item => {
  comparisonHTML += '<tr>';
  comparisonHTML += '<td>' + item.category + '</td>';
  comparisonHTML += '<td><code>' + item.normal + '</code></td>';
  comparisonHTML += '<td><code>' + item.arrow + '</code></td>';
  comparisonHTML += '<td>' + item.example + '</td>';
  comparisonHTML += '</tr>';
});

comparisonHTML += '</table>';

document.getElementById('comparisonOutput').innerHTML = comparisonHTML;

// ========================================
// コンソールにデバッグ情報を出力
// ========================================
console.log('=== レッスン131: アロー関数の基本 ===');
console.log('');

console.log('1. 基本的な計算:');
console.log('  add(2, 3) =', add(2, 3));
console.log('  multiply(4, 5) =', multiply(4, 5));
console.log('  double(7) =', double(7));
console.log('');

console.log('2. 配列メソッド:');
console.log('  doubled:', doubled);
console.log('  evens:', evens);
console.log('  sum:', sum);
console.log('');

console.log('3. オブジェクト:');
console.log('  userObjects:', userObjects);
console.log('');

console.log('4. メソッドチェーン:');
console.log('  activeNames:', activeNames);
console.log('  averageAge:', averageAge);
