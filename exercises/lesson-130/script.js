// ========================================
// 関数型プログラミングの関数定義
// ========================================

// TODO: add関数を実装してください（純粋関数）
// 引数: a, b (数値)
// 戻り値: a + b
const add = function(a, b) {
  // ここにコードを書いてください
};

// TODO: multiply関数を実装してください（純粋関数）
// 引数: a, b (数値)
// 戻り値: a * b
const multiply = function(a, b) {
  // ここにコードを書いてください
};

// TODO: addElement関数を実装してください（不変性を保つ）
// 引数: array (配列), element (追加する要素)
// 戻り値: elementを末尾に追加した新しい配列
// ヒント: スプレッド構文 [...array, element] を使います
const addElement = function(array, element) {
  // ここにコードを書いてください
};

// TODO: removeElement関数を実装してください（不変性を保つ）
// 引数: array (配列), index (削除するインデックス)
// 戻り値: 指定インデックスの要素を削除した新しい配列
// ヒント: slice()とスプレッド構文を使います
const removeElement = function(array, index) {
  // ここにコードを書いてください
};

// TODO: updateElement関数を実装してください（不変性を保つ）
// 引数: array (配列), index (更新するインデックス), newValue (新しい値)
// 戻り値: 指定インデックスの要素を更新した新しい配列
// ヒント: map()を使います
const updateElement = function(array, index, newValue) {
  // ここにコードを書いてください
};

// TODO: 以下の小さな関数を実装してください（関数の合成用）

// double: 数値を2倍にする
const double = function(n) {
  // ここにコードを書いてください
};

// addTen: 数値に10を加える
const addTen = function(n) {
  // ここにコードを書いてください
};

// square: 数値を2乗する
const square = function(n) {
  // ここにコードを書いてください
};

// ========================================
// 1. 純粋関数 vs 純粋でない関数
// ========================================
let output1 = '=== 純粋関数 ===\n\n';

// TODO: add関数を使って同じ計算を2回行い、結果が同じであることを確認してください
output1 += '純粋関数（add）:\n';
output1 += 'add(2, 3) = ' + add(2, 3) + '\n';
output1 += 'add(2, 3) = ' + add(2, 3) + '\n';
output1 += '→ 常に同じ結果が返る\n\n';

// 純粋でない関数の例（参考）
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

// TODO: pureIncrement関数を実装してください
// 引数: counter (カウンター値)
// 戻り値: counter + 1
const pureIncrement = function(counter) {
  // ここにコードを書いてください
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

// TODO: addElement関数を使って要素を追加してください
const added = addElement(original, 6);
output2 += '要素を追加:\n';
output2 += '  元の配列: [' + original.join(', ') + ']\n';
output2 += '  新しい配列: [' + added.join(', ') + ']\n\n';

// TODO: removeElement関数を使ってインデックス2の要素を削除してください
const removed = removeElement(original, 2);
output2 += '要素を削除（インデックス2）:\n';
output2 += '  元の配列: [' + original.join(', ') + ']\n';
output2 += '  新しい配列: [' + removed.join(', ') + ']\n\n';

// TODO: updateElement関数を使ってインデックス2の要素を30に更新してください
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

// TODO: スプレッド構文を使って配列をコピーしてください
const arr1 = [1, 2, 3];
const arr2 = []; // ここを修正してください（スプレッド構文を使う）
arr2.push(4);

output3 += '配列のコピー:\n';
output3 += '  元の配列: [' + arr1.join(', ') + ']\n';
output3 += '  コピー後: [' + arr2.join(', ') + ']\n\n';

// TODO: スプレッド構文を使って2つの配列を結合してください
const arr3 = [1, 2, 3];
const arr4 = [4, 5, 6];
const combined = []; // ここを修正してください（スプレッド構文を使う）

output3 += '配列の結合:\n';
output3 += '  配列1: [' + arr3.join(', ') + ']\n';
output3 += '  配列2: [' + arr4.join(', ') + ']\n';
output3 += '  結合後: [' + combined.join(', ') + ']\n\n';

// TODO: スプレッド構文を使ってオブジェクトをコピーし、ageだけを更新してください
const user = { name: '太郎', age: 25 };
const updatedUser = {}; // ここを修正してください（スプレッド構文を使う）

output3 += 'オブジェクトのコピー:\n';
output3 += '  元: { name: "' + user.name + '", age: ' + user.age + ' }\n';
output3 += '  更新: { name: "' + updatedUser.name + '", age: ' + updatedUser.age + ' }';

document.getElementById('spreadOutput').textContent = output3;

// ========================================
// 4. map、filter、reduce
// ========================================
let output4 = '=== map、filter、reduce ===\n\n';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// TODO: map()を使って各要素を2倍にしてください
const doubled = []; // ここを修正してください
output4 += 'map（各要素を2倍）:\n';
output4 += '  元: [' + numbers.join(', ') + ']\n';
output4 += '  結果: [' + doubled.join(', ') + ']\n\n';

// TODO: filter()を使って偶数のみを取得してください
const evens = []; // ここを修正してください
output4 += 'filter（偶数のみ）:\n';
output4 += '  元: [' + numbers.join(', ') + ']\n';
output4 += '  結果: [' + evens.join(', ') + ']\n\n';

// TODO: reduce()を使って合計と最大値を計算してください
const sum = 0; // ここを修正してください
const max = 0; // ここを修正してください

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

// TODO: filter()とmap()を組み合わせて、アクティブなユーザーの名前を取得してください
const activeUserNames = []; // ここを修正してください

output5 += 'アクティブなユーザーの名前:\n';
output5 += '  ' + activeUserNames.join(', ') + '\n\n';

// TODO: filter()とreduce()を使って、アクティブなユーザーの平均年齢を計算してください
const activeUsers = []; // ここを修正してください
const totalAge = 0; // ここを修正してください
const averageAge = totalAge / activeUsers.length;

output5 += 'アクティブなユーザーの平均年齢:\n';
output5 += '  ' + averageAge.toFixed(1) + '歳\n\n';

// TODO: 30歳未満のユーザー名を取得して大文字に変換してください
const youngUsers = []; // ここを修正してください

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

// TODO: map()を使って各商品の小計（price * quantity）を追加してください
const cartWithSubtotal = []; // ここを修正してください

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

// TODO: reduce()を使って合計金額を計算してください
const total = 0; // ここを修正してください

cartHTML += '<tr style="font-weight: bold; background-color: #f0f0f0;">';
cartHTML += '<td colspan="3">合計</td>';
cartHTML += '<td>¥' + total.toLocaleString() + '</td>';
cartHTML += '</tr>';

cartHTML += '</table>';

// TODO: filter()、map()、reduce()を組み合わせて、100円以上の商品の合計を計算してください
const expensiveTotal = 0; // ここを修正してください

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

// TODO: 関数を順番に適用してください
const step1 = 0; // double(number)
const step2 = 0; // addTen(step1)
const step3 = 0; // square(step2)

output7 += 'ステップ1（double）: ' + number + ' → ' + step1 + '\n';
output7 += 'ステップ2（addTen）: ' + step1 + ' → ' + step2 + '\n';
output7 += 'ステップ3（square）: ' + step2 + ' → ' + step3 + '\n\n';

// TODO: 関数を一度に適用してください
const result = 0; // square(addTen(double(number)))
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

// TODO: 以下の処理パイプラインを実装してください
// 1. アクティブな学生のみをフィルタ
// 2. 各学生の平均点を追加
// 3. 平均点で降順にソート
// 4. 上位3名のみを取得
const processedStudents = []; // ここを修正してください

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

// TODO: 統計情報を計算してください
const allActiveStudents = []; // アクティブな学生を取得
const allScores = []; // すべてのスコアを1つの配列にまとめる
const overallAverage = 0; // 全体平均を計算

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
