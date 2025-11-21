// ========================================
// 高階関数の実装
// ========================================

// 1. forEach - 配列の各要素にコールバックを適用
const forEach = function(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i);
  }
};

// 2. filter - 条件に合う要素だけを抽出
const filter = function(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
};

// 3. map - 各要素を変換
const map = function(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i]));
  }
  return result;
};

// 4. repeat - 処理を n 回繰り返す
const repeat = function(count, callback) {
  for (let i = 0; i < count; i++) {
    callback(i);
  }
};

// ========================================
// UI関数
// ========================================

// forEach のテスト
function testForEach() {
  const fruits = ['りんご', 'バナナ', 'オレンジ'];
  let output = '';

  forEach(fruits, function(fruit, index) {
    output += index + ': ' + fruit + '<br>';
  });

  document.getElementById('forEachResult').innerHTML = output;
}

// filter のテスト
function testFilter() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const threshold = Number(document.getElementById('filterInput').value);

  // threshold より大きい数だけを抽出
  const filtered = filter(numbers, function(num) {
    return num > threshold;
  });

  document.getElementById('filterResult').innerHTML =
    '元の配列: [' + numbers.join(', ') + ']<br>' +
    threshold + 'より大きい数: [' + filtered.join(', ') + ']';
}

// map のテスト（2倍）
function testMapDouble() {
  const numbers = [1, 2, 3, 4, 5];

  // 各要素を2倍にする
  const doubled = map(numbers, function(num) {
    return num * 2;
  });

  document.getElementById('mapResult').innerHTML =
    '元の配列: [' + numbers.join(', ') + ']<br>' +
    '2倍: [' + doubled.join(', ') + ']';
}

// map のテスト（2乗）
function testMapSquare() {
  const numbers = [1, 2, 3, 4, 5];

  // 各要素を2乗にする
  const squared = map(numbers, function(num) {
    return num * num;
  });

  document.getElementById('mapResult').innerHTML =
    '元の配列: [' + numbers.join(', ') + ']<br>' +
    '2乗: [' + squared.join(', ') + ']';
}

// repeat のテスト（★を表示）
function testRepeatStar() {
  const count = Number(document.getElementById('repeatInput').value);
  let output = '';

  repeat(count, function(i) {
    output += '★'.repeat(i + 1) + '<br>';
  });

  document.getElementById('repeatResult').innerHTML = output;
}

// repeat のテスト（数字を表示）
function testRepeatNumber() {
  const count = Number(document.getElementById('repeatInput').value);
  let output = '';

  repeat(count, function(i) {
    output += '繰り返し ' + (i + 1) + ' 回目<br>';
  });

  document.getElementById('repeatResult').innerHTML = output;
}

// ========================================
// その他の例（コンソールで確認）
// ========================================

// all - すべての要素が条件を満たすか
const all = function(array, predicate) {
  for (let i = 0; i < array.length; i++) {
    if (!predicate(array[i])) {
      return false;
    }
  }
  return true;
};

console.log('all の例:');
console.log('すべて偶数?', all([2, 4, 6, 8], function(num) {
  return num % 2 === 0;
}));  // true

console.log('すべて偶数?', all([2, 4, 5, 8], function(num) {
  return num % 2 === 0;
}));  // false

// some - 少なくとも1つの要素が条件を満たすか
const some = function(array, predicate) {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return true;
    }
  }
  return false;
};

console.log('some の例:');
console.log('10以上の数がある?', some([1, 5, 8, 12], function(num) {
  return num >= 10;
}));  // true

// find - 条件を満たす最初の要素を返す
const find = function(array, predicate) {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return array[i];
    }
  }
  return undefined;
};

console.log('find の例:');
console.log('10以上の最初の数:', find([3, 7, 12, 15, 8], function(num) {
  return num >= 10;
}));  // 12
