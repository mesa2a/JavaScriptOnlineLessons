// ========================================
// 1. thisの基本
// ========================================
let output1 = '=== thisの基本 ===\n\n';

// TODO: 以下のオブジェクトを完成させてください
const person = {
  name: '太郎',
  age: 25,

  // TODO: greetメソッドを通常の関数で実装してください
  // 'こんにちは、太郎です' という文字列を返す
  greet: null, // ここを修正してください

  // TODO: getInfoメソッドを通常の関数で実装してください
  // '太郎さん（25歳）' という文字列を返す
  getInfo: null // ここを修正してください
};

output1 += 'オブジェクトのメソッド内でthisを使用:\n';
output1 += person.greet() + '\n';
output1 += person.getInfo() + '\n';

document.getElementById('thisBasicOutput').textContent = output1;

// ========================================
// 2. 通常の関数 vs アロー関数
// ========================================
let output2 = '=== 通常の関数 vs アロー関数 ===\n\n';

// TODO: 通常の関数を使った例
const obj1 = {
  value: 10,

  getValue: null // ここを修正してください（通常の関数）
};

output2 += '✓ 通常の関数（正しく動作）:\n';
output2 += '  obj.getValue() = ' + obj1.getValue() + '\n\n';

// アロー関数を使った例（thisが期待通りに動かない）
const obj2 = {
  value: 10,

  getValue: () => {
    return this.value;
  }
};

output2 += '✗ アロー関数（期待通りに動かない）:\n';
output2 += '  obj.getValue() = ' + obj2.getValue() + ' (undefined)\n\n';

// TODO: コールバック内でアロー関数を使う例
const obj3 = {
  values: [1, 2, 3, 4, 5],
  baseValue: 10,

  addToAll: null // ここを修正してください（アロー関数を使う）
};

output2 += '✓ コールバック内でアロー関数を使用（正しく動作）:\n';
output2 += '  addToAll() = [' + obj3.addToAll().join(', ') + ']';

document.getElementById('comparisonOutput').textContent = output2;

// ========================================
// 3. カウンターのデモ
// ========================================
// TODO: counterDemoオブジェクトを完成させてください
const counterDemo = {
  count: 0,

  increment: null, // ここを修正してください

  decrement: null, // ここを修正してください

  incrementMultiple: null, // ここを修正してください（アロー関数を使う）

  reset: null, // ここを修正してください

  updateDisplay: function() {
    document.getElementById('counterDisplay').textContent = this.count;
  }
};

// ========================================
// 4. タイマーのデモ
// ========================================
// TODO: timerDemoオブジェクトを完成させてください
const timerDemo = {
  seconds: 0,
  intervalId: null,

  start: null, // ここを修正してください（アロー関数を使う）

  stop: null, // ここを修正してください

  reset: null, // ここを修正してください

  updateDisplay: function() {
    const minutes = Math.floor(this.seconds / 60);
    const secs = this.seconds % 60;
    const display = String(minutes).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    document.getElementById('timerDisplay').textContent = display;
  }
};

// ========================================
// 5. 配列メソッドでの活用
// ========================================
// TODO: calculatorオブジェクトを完成させてください
const calculator = {
  baseValue: 10,

  addToAll: null, // ここを修正してください（アロー関数を使う）

  filterGreaterThan: null, // ここを修正してください（アロー関数を使う）

  multiplyAll: null, // ここを修正してください（アロー関数を使う）

  sumWithBase: null // ここを修正してください（アロー関数を使う）
};

const testNumbers = [1, 5, 10, 15, 20];

let output5 = '=== 配列メソッドでの活用 ===\n\n';
output5 += '元の配列: [' + testNumbers.join(', ') + ']\n';
output5 += 'baseValue: ' + calculator.baseValue + '\n\n';

output5 += 'addToAll（各要素 + baseValue）:\n';
output5 += '  [' + calculator.addToAll(testNumbers).join(', ') + ']\n\n';

output5 += 'filterGreaterThan（baseValue以上）:\n';
output5 += '  [' + calculator.filterGreaterThan(testNumbers).join(', ') + ']\n\n';

output5 += 'multiplyAll（各要素 × baseValue）:\n';
output5 += '  [' + calculator.multiplyAll(testNumbers).join(', ') + ']\n\n';

output5 += 'sumWithBase（各要素にbaseValueを加えた合計）:\n';
output5 += '  ' + calculator.sumWithBase(testNumbers);

document.getElementById('arrayOutput').textContent = output5;

// ========================================
// 6. よくある間違いと正しい書き方
// ========================================
const mistakes = [
  {
    category: 'オブジェクトのメソッド',
    wrong: 'getValue: () => { return this.value; }',
    correct: 'getValue: function() { return this.value; }',
    reason: 'アロー関数はthisを正しく参照できない'
  },
  {
    category: 'コールバック関数',
    wrong: 'array.map(function(v) { return v + this.base; })',
    correct: 'array.map(v => v + this.base)',
    reason: '通常の関数だとthisが変わってしまう'
  },
  {
    category: 'setInterval/setTimeout',
    wrong: 'setInterval(function() { this.count++; }, 1000)',
    correct: 'setInterval(() => { this.count++; }, 1000)',
    reason: 'アロー関数で外側のthisを引き継ぐ'
  }
];

let mistakesHTML = '<table>';
mistakesHTML += '<tr><th>カテゴリ</th><th>間違った書き方</th><th>正しい書き方</th><th>理由</th></tr>';

mistakes.forEach(item => {
  mistakesHTML += '<tr>';
  mistakesHTML += '<td>' + item.category + '</td>';
  mistakesHTML += '<td><code class="bad">✗ ' + item.wrong + '</code></td>';
  mistakesHTML += '<td><code class="good">✓ ' + item.correct + '</code></td>';
  mistakesHTML += '<td>' + item.reason + '</td>';
  mistakesHTML += '</tr>';
});

mistakesHTML += '</table>';

document.getElementById('mistakesOutput').innerHTML = mistakesHTML;

// ========================================
// 7. 使い分けガイド
// ========================================
const guide = [
  {
    situation: 'オブジェクトのメソッド定義',
    choice: '通常の関数',
    example: 'greet: function() { return this.name; }'
  },
  {
    situation: 'map/filter/reduce',
    choice: 'アロー関数',
    example: 'array.map(n => n * 2)'
  },
  {
    situation: 'forEach内でthisを使う',
    choice: 'アロー関数',
    example: 'array.forEach(item => this.process(item))'
  },
  {
    situation: 'setInterval/setTimeout',
    choice: 'アロー関数',
    example: 'setInterval(() => this.update(), 1000)'
  },
  {
    situation: '単純なデータ変換',
    choice: 'アロー関数',
    example: 'const double = n => n * 2'
  },
  {
    situation: 'thisを使わない関数',
    choice: 'アロー関数',
    example: 'const add = (a, b) => a + b'
  }
];

let guideHTML = '<table>';
guideHTML += '<tr><th>状況</th><th>選択</th><th>例</th></tr>';

guide.forEach(item => {
  const choiceClass = item.choice === 'アロー関数' ? 'good' : '';
  guideHTML += '<tr>';
  guideHTML += '<td>' + item.situation + '</td>';
  guideHTML += '<td class="' + choiceClass + '">' + item.choice + '</td>';
  guideHTML += '<td><code>' + item.example + '</code></td>';
  guideHTML += '</tr>';
});

guideHTML += '</table>';

document.getElementById('guideOutput').innerHTML = guideHTML;

// ========================================
// コンソールにデバッグ情報を出力
// ========================================
console.log('=== レッスン132: アロー関数とthis ===');
console.log('');

console.log('1. thisの基本:');
console.log('  person.greet() =', person.greet());
console.log('');

console.log('2. 通常の関数 vs アロー関数:');
console.log('  通常の関数:', obj1.getValue());
console.log('  アロー関数:', obj2.getValue());
console.log('');

console.log('3. 配列メソッド:');
console.log('  addToAll:', calculator.addToAll([1, 2, 3]));
console.log('  filterGreaterThan:', calculator.filterGreaterThan([5, 10, 15, 20]));
console.log('');

console.log('4. カウンター:');
console.log('  初期値:', counterDemo.count);
