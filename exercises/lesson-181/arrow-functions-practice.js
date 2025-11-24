/**
 * レッスン181: アロー関数入門 - 演習問題
 *
 * 以下の従来の関数をアロー関数に書き直してください
 */

// ========================================
// 問題1: 基本的なアロー関数
// ========================================

// 従来の関数
function add(a, b) {
  return a + b;
}

// TODO: アロー関数に書き直してください
// var add = ...

// ========================================
// 問題2: パラメータが1つの関数
// ========================================

// 従来の関数
function square(n) {
  return n * n;
}

// TODO: アロー関数に書き直してください（括弧を省略）
// var square = ...

// ========================================
// 問題3: パラメータがない関数
// ========================================

// 従来の関数
function getRandomNumber() {
  return Math.random();
}

// TODO: アロー関数に書き直してください
// var getRandomNumber = ...

// ========================================
// 問題4: オブジェクトを返す関数
// ========================================

// 従来の関数
function createUser(name, age) {
  return {
    name: name,
    age: age
  };
}

// TODO: アロー関数に書き直してください
// ヒント: オブジェクトを()で囲む必要があります
// var createUser = ...

// ========================================
// 問題5: map を使った配列の変換
// ========================================

var numbers = [1, 2, 3, 4, 5];

// 従来の書き方
var doubled = numbers.map(function(n) {
  return n * 2;
});

// TODO: アロー関数に書き直してください
// var doubled = ...

// ========================================
// 問題6: filter を使った絞り込み
// ========================================

var ages = [15, 22, 18, 30, 12, 25];

// 従来の書き方
var adults = ages.filter(function(age) {
  return age >= 18;
});

// TODO: アロー関数に書き直してください
// var adults = ...

// ========================================
// 問題7: reduce を使った合計計算
// ========================================

var prices = [100, 200, 150, 300];

// 従来の書き方
var total = prices.reduce(function(sum, price) {
  return sum + price;
}, 0);

// TODO: アロー関数に書き直してください
// var total = ...

// ========================================
// 問題8: 複数行の処理がある関数
// ========================================

// 従来の関数
function greet(name) {
  var message = 'Hello, ' + name;
  var punctuation = '!';
  return message + punctuation;
}

// TODO: アロー関数に書き直してください
// var greet = ...

// ========================================
// 問題9: オブジェクトの配列から特定のプロパティを抽出
// ========================================

var users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 20 }
];

// 従来の書き方
var names = users.map(function(user) {
  return user.name;
});

// TODO: アロー関数に書き直してください
// var names = ...

// ========================================
// 問題10: find を使った検索
// ========================================

var products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Mouse', price: 20 },
  { id: 3, name: 'Keyboard', price: 50 }
];

// 従来の書き方
var product = products.find(function(p) {
  return p.id === 2;
});

// TODO: アロー関数に書き直してください
// var product = ...

// ========================================
// 問題11: sort を使った並び替え
// ========================================

var scores = [85, 92, 78, 95, 88];

// 従来の書き方
var sortedScores = scores.sort(function(a, b) {
  return a - b;
});

// TODO: アロー関数に書き直してください
// var sortedScores = ...

// ========================================
// 問題12: 三項演算子との組み合わせ
// ========================================

// 従来の関数
function isAdult(age) {
  return age >= 18 ? '成人' : '未成年';
}

// TODO: アロー関数に書き直してください
// var isAdult = ...

// ========================================
// 問題13: メソッドチェーン
// ========================================

var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 従来の書き方
var result = data
  .filter(function(n) {
    return n % 2 === 0;
  })
  .map(function(n) {
    return n * 2;
  })
  .reduce(function(sum, n) {
    return sum + n;
  }, 0);

// TODO: 各コールバックをアロー関数に書き直してください
// var result = data
//   .filter(...)
//   .map(...)
//   .reduce(...);

// ========================================
// 問題14: forEach でのログ出力
// ========================================

var fruits = ['apple', 'banana', 'orange'];

// 従来の書き方
fruits.forEach(function(fruit) {
  console.log(fruit);
});

// TODO: アロー関数に書き直してください
// fruits.forEach(...);

// ========================================
// 問題15: every と some
// ========================================

var allScores = [85, 92, 78, 95, 88];

// 従来の書き方
var allPassed = allScores.every(function(score) {
  return score >= 60;
});

var hasHighScore = allScores.some(function(score) {
  return score >= 90;
});

// TODO: アロー関数に書き直してください
// var allPassed = ...
// var hasHighScore = ...

// ========================================
// テスト用にエクスポート
// ========================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    add,
    square,
    getRandomNumber,
    createUser,
    doubled,
    adults,
    total,
    greet,
    names,
    product,
    sortedScores,
    isAdult,
    result,
    allPassed,
    hasHighScore
  };
}
