// ========================================
// アロー関数の定義
// ========================================

// TODO: 以下の関数をアロー関数で実装してください

// add: 2つの数値を加算
// ヒント: (a, b) => a + b
const add = null; // ここを修正してください

// subtract: 2つの数値を減算
const subtract = null; // ここを修正してください

// multiply: 2つの数値を乗算
const multiply = null; // ここを修正してください

// divide: 2つの数値を除算
const divide = null; // ここを修正してください

// TODO: 引数が1つのアロー関数を実装してください（括弧を省略）

// double: 数値を2倍にする
// ヒント: n => n * 2
const double = null; // ここを修正してください

// square: 数値を2乗する
const square = null; // ここを修正してください

// greet: 挨拶文を返す
// ヒント: name => 'こんにちは、' + name + 'さん'
const greet = null; // ここを修正してください

// TODO: 引数がないアロー関数を実装してください

// getRandomNumber: 0以上1未満のランダムな数値を返す
// ヒント: () => Math.random()
const getRandomNumber = null; // ここを修正してください

// getCurrentTime: 現在時刻を文字列で返す
// ヒント: () => new Date().toLocaleTimeString()
const getCurrentTime = null; // ここを修正してください

// TODO: 複数行の処理を含むアロー関数を実装してください
// processNumber: 数値を受け取り、(n * 2 + 10)^2 を計算する
const processNumber = null; // ここを修正してください

// TODO: オブジェクトを返すアロー関数を実装してください
// makePerson: name と age を受け取り、オブジェクトを返す
// ヒント: (name, age) => ({ name: name, age: age })
const makePerson = null; // ここを修正してください

// makePoint: x と y を受け取り、オブジェクトを返す
const makePoint = null; // ここを修正してください

// ========================================
// 1. 基本的な書き方の比較
// ========================================
let output1 = '=== 通常の関数 vs アロー関数 ===\n\n';

// 通常の関数（参考）
const addNormal = function(a, b) {
  return a + b;
};

// アロー関数（完全な形）
const addArrow1 = (a, b) => {
  return a + b;
};

// TODO: アロー関数（省略形）を実装してください
const addArrow2 = null; // ここを修正してください

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

// TODO: map()でアロー関数を使って各要素を2倍にしてください
const doubled = null; // ここを修正してください（numbers.map(...)）

output3 += 'map（2倍）:\n';
output3 += '  numbers.map(n => n * 2)\n';
output3 += '  [' + numbers.join(', ') + ']\n';
output3 += '  → [' + doubled.join(', ') + ']\n\n';

// TODO: filter()でアロー関数を使って偶数のみを取得してください
const evens = null; // ここを修正してください（numbers.filter(...)）

output3 += 'filter（偶数のみ）:\n';
output3 += '  numbers.filter(n => n % 2 === 0)\n';
output3 += '  → [' + evens.join(', ') + ']\n\n';

// TODO: reduce()でアロー関数を使って合計と最大値を計算してください
const sum = null; // ここを修正してください（numbers.reduce(...)）
const max = null; // ここを修正してください（numbers.reduce(...)）

output3 += 'reduce:\n';
output3 += '  合計: numbers.reduce((acc, n) => acc + n, 0) = ' + sum + '\n';
output3 += '  最大値: numbers.reduce((acc, n) => n > acc ? n : acc) = ' + max;

document.getElementById('arrayMethodsOutput').textContent = output3;

// ========================================
// 4. オブジェクトを返す
// ========================================
let output4 = '=== オブジェクトを返すアロー関数 ===\n\n';

const users = ['太郎', '花子', '一郎'];

// TODO: map()でアロー関数を使ってオブジェクトの配列を作成してください
// 各オブジェクトは { id, name, email } の形式
const userObjects = null; // ここを修正してください

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

// TODO: filter()とmap()を組み合わせてアクティブなユーザーの名前を取得してください
const activeNames = null; // ここを修正してください

output5 += 'アクティブなユーザーの名前:\n';
output5 += '  ' + activeNames.join(', ') + '\n\n';

// TODO: 25歳以上のアクティブなユーザーを抽出してください
const activeAdults = null; // ここを修正してください

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

// TODO: map()でアロー関数を使って小計を追加してください
const withSubtotal = null; // ここを修正してください

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

// TODO: reduce()でアロー関数を使って合計金額を計算してください
const total = null; // ここを修正してください

cartHTML += '<tr style="font-weight: bold; background-color: #f0f0f0;">';
cartHTML += '<td colspan="3">合計</td>';
cartHTML += '<td>¥' + total.toLocaleString() + '</td>';
cartHTML += '</tr>';
cartHTML += '</table>';

// TODO: filter()とreduce()を組み合わせて100円以上の商品の合計を計算してください
const expensiveTotal = null; // ここを修正してください

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

// TODO: 以下の処理パイプラインを実装してください
// 1. アクティブな学生をフィルタ
// 2. 各学生に average, max, min を追加
// 3. 平均点で降順にソート
const processedStudents = null; // ここを修正してください

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

// TODO: 統計情報を計算してください
const allScores = null; // すべてのアクティブな学生のスコアを1つの配列にまとめる
const overallAverage = null; // 全体平均を計算

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
