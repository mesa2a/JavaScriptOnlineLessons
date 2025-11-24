/**
 * レッスン170: 配列操作の復習
 * 解答
 */

// ========================================
// 問題1: 成績処理
// ========================================

var students = [
  { name: '田中', score: 85 },
  { name: '佐藤', score: 45 },
  { name: '鈴木', score: 72 },
  { name: '高橋', score: 58 },
  { name: '伊藤', score: 90 }
];

/**
 * 合格者（60点以上）の名前のリストを作成する関数
 * @param {Array} students - 学生の配列
 * @returns {Array} 合格者の名前の配列
 */
function getPassedStudents(students) {
  return students
    .filter(function(student) {
      return student.score >= 60;
    })
    .map(function(student) {
      return student.name;
    });
}

// テスト
console.log('問題1: 合格者');
var passed = getPassedStudents(students);
console.log(passed); // ['田中', '鈴木', '伊藤']

// ========================================
// 問題2: 商品の合計金額
// ========================================

var cart = [
  { name: 'りんご', price: 100, quantity: 3 },
  { name: 'バナナ', price: 150, quantity: 2 },
  { name: 'オレンジ', price: 120, quantity: 4 }
];

/**
 * カート内の商品の合計金額を計算する関数
 * @param {Array} cart - カート内の商品の配列
 * @returns {number} 合計金額
 */
function calculateTotal(cart) {
  return cart.reduce(function(total, item) {
    return total + (item.price * item.quantity);
  }, 0);
}

// テスト
console.log('問題2: 合計金額');
var total = calculateTotal(cart);
console.log(total); // 1080

// ========================================
// 問題3: データの変換
// ========================================

var apiUsers = [
  { id: 1, first_name: '太郎', last_name: '山田', email: 'taro@example.com' },
  { id: 2, first_name: '花子', last_name: '佐藤', email: 'hanako@example.com' }
];

/**
 * APIデータを表示用の形式に変換する関数
 * @param {Array} apiUsers - APIから取得したユーザーデータ
 * @returns {Array} 変換後のユーザーデータ
 */
function transformUsers(apiUsers) {
  return apiUsers.map(function(user) {
    return {
      id: user.id,
      fullName: user.last_name + user.first_name,
      email: user.email
    };
  });
}

// テスト
console.log('問題3: データ変換');
var displayUsers = transformUsers(apiUsers);
console.log(displayUsers);
// [
//   { id: 1, fullName: '山田太郎', email: 'taro@example.com' },
//   { id: 2, fullName: '佐藤花子', email: 'hanako@example.com' }
// ]

// ========================================
// 問題4: タスクの統計
// ========================================

var tasks = [
  { title: '買い物', completed: true },
  { title: '掃除', completed: false },
  { title: '勉強', completed: true },
  { title: '料理', completed: true },
  { title: '運動', completed: false }
];

/**
 * タスクの完了率を計算する関数
 * @param {Array} tasks - タスクの配列
 * @returns {number} 完了率（%）
 */
function calculateCompletionRate(tasks) {
  var completedCount = tasks.filter(function(task) {
    return task.completed;
  }).length;

  return Math.round((completedCount / tasks.length) * 100);
}

// テスト
console.log('問題4: 完了率');
var rate = calculateCompletionRate(tasks);
console.log(rate + '%'); // 60%

// ========================================
// 問題5: 配列の検索と更新
// ========================================

var users = [
  { id: 1, name: '田中', age: 25 },
  { id: 2, name: '佐藤', age: 30 },
  { id: 3, name: '鈴木', age: 28 }
];

/**
 * ユーザーの年齢を更新する関数
 * @param {Array} users - ユーザーの配列
 * @param {number} userId - 更新するユーザーのID
 * @param {number} newAge - 新しい年齢
 */
function updateUserAge(users, userId, newAge) {
  var user = users.find(function(u) {
    return u.id === userId;
  });

  if (user) {
    user.age = newAge;
  }
}

// テスト
console.log('問題5: ユーザー更新');
console.log('更新前:', JSON.parse(JSON.stringify(users)));
updateUserAge(users, 2, 31);
console.log('更新後:', users);
// 佐藤の年齢が31に更新される

// ========================================
// チャレンジ1: 在庫管理システム
// ========================================

var inventory = [
  { id: 1, name: 'ノートPC', stock: 5, price: 100000 },
  { id: 2, name: 'マウス', stock: 20, price: 2000 },
  { id: 3, name: 'キーボード', stock: 0, price: 5000 },
  { id: 4, name: 'モニター', stock: 3, price: 30000 }
];

/**
 * 在庫切れの商品を見つける関数
 * @param {Array} inventory - 在庫の配列
 * @returns {Array} 在庫切れの商品の配列
 */
function findOutOfStock(inventory) {
  return inventory.filter(function(item) {
    return item.stock === 0;
  });
}

/**
 * 在庫総額を計算する関数
 * @param {Array} inventory - 在庫の配列
 * @returns {number} 在庫総額
 */
function calculateTotalValue(inventory) {
  return inventory.reduce(function(total, item) {
    return total + (item.stock * item.price);
  }, 0);
}

/**
 * 最も高価な商品を見つける関数
 * @param {Array} inventory - 在庫の配列
 * @returns {Object} 最も高価な商品
 */
function findMostExpensive(inventory) {
  return inventory.reduce(function(max, item) {
    return item.price > max.price ? item : max;
  }, inventory[0]);
}

/**
 * 商品名で検索する関数
 * @param {Array} inventory - 在庫の配列
 * @param {string} keyword - 検索キーワード
 * @returns {Array} 検索結果の配列
 */
function searchByName(inventory, keyword) {
  return inventory.filter(function(item) {
    return item.name.indexOf(keyword) !== -1;
  });
}

// テスト
console.log('チャレンジ1: 在庫管理');
console.log('在庫切れ:', findOutOfStock(inventory));
// [{ id: 3, name: 'キーボード', stock: 0, price: 5000 }]

console.log('在庫総額:', calculateTotalValue(inventory));
// 630000 (5*100000 + 20*2000 + 0*5000 + 3*30000)

console.log('最高額商品:', findMostExpensive(inventory));
// { id: 1, name: 'ノートPC', stock: 5, price: 100000 }

console.log('検索結果:', searchByName(inventory, 'ー'));
// [
//   { id: 3, name: 'キーボード', stock: 0, price: 5000 },
//   { id: 4, name: 'モニター', stock: 3, price: 30000 }
// ]

// ========================================
// チャレンジ2: データの集計と分析
// ========================================

var sales = [
  { date: '2025-01-15', product: 'りんご', category: '果物', amount: 500 },
  { date: '2025-01-15', product: 'バナナ', category: '果物', amount: 300 },
  { date: '2025-01-16', product: 'にんじん', category: '野菜', amount: 200 },
  { date: '2025-01-16', product: 'りんご', category: '果物', amount: 600 },
  { date: '2025-01-17', product: 'バナナ', category: '果物', amount: 400 }
];

/**
 * カテゴリ別の売上合計を計算する関数
 * @param {Array} sales - 売上の配列
 * @returns {Object} カテゴリ別売上
 */
function salesByCategory(sales) {
  return sales.reduce(function(result, sale) {
    if (!result[sale.category]) {
      result[sale.category] = 0;
    }
    result[sale.category] += sale.amount;
    return result;
  }, {});
}

/**
 * 日付別の売上合計を計算する関数
 * @param {Array} sales - 売上の配列
 * @returns {Object} 日付別売上
 */
function salesByDate(sales) {
  return sales.reduce(function(result, sale) {
    if (!result[sale.date]) {
      result[sale.date] = 0;
    }
    result[sale.date] += sale.amount;
    return result;
  }, {});
}

/**
 * 最も売れた商品を見つける関数
 * @param {Array} sales - 売上の配列
 * @returns {string} 最も売れた商品名
 */
function topProduct(sales) {
  // まず商品ごとの売上を集計
  var productSales = sales.reduce(function(result, sale) {
    if (!result[sale.product]) {
      result[sale.product] = 0;
    }
    result[sale.product] += sale.amount;
    return result;
  }, {});

  // 最大売上の商品を見つける
  var maxProduct = '';
  var maxAmount = 0;

  for (var product in productSales) {
    if (productSales[product] > maxAmount) {
      maxAmount = productSales[product];
      maxProduct = product;
    }
  }

  return maxProduct;
}

/**
 * 平均売上金額を計算する関数
 * @param {Array} sales - 売上の配列
 * @returns {number} 平均売上金額
 */
function averageSale(sales) {
  var total = sales.reduce(function(sum, sale) {
    return sum + sale.amount;
  }, 0);

  return Math.round(total / sales.length);
}

// テスト
console.log('チャレンジ2: 売上分析');
console.log('カテゴリ別:', salesByCategory(sales));
// { 果物: 1800, 野菜: 200 }

console.log('日付別:', salesByDate(sales));
// { '2025-01-15': 800, '2025-01-16': 800, '2025-01-17': 400 }

console.log('トップ商品:', topProduct(sales));
// 'りんご' (500 + 600 = 1100)

console.log('平均売上:', averageSale(sales));
// 400 (2000 / 5)

// ========================================
// 補足: 別の実装パターン
// ========================================

// 問題5の別解：forEachを使う方法
function updateUserAgeAlt(users, userId, newAge) {
  users.forEach(function(user) {
    if (user.id === userId) {
      user.age = newAge;
    }
  });
}

// チャレンジ2の別解：Object.keysを使う方法
function topProductAlt(sales) {
  var productSales = sales.reduce(function(result, sale) {
    if (!result[sale.product]) {
      result[sale.product] = 0;
    }
    result[sale.product] += sale.amount;
    return result;
  }, {});

  // Object.keysで商品名の配列を取得し、reduceで最大値を見つける
  return Object.keys(productSales).reduce(function(max, product) {
    return productSales[product] > productSales[max] ? product : max;
  });
}

console.log('\n補足: 別の実装パターン');
console.log('トップ商品（別解）:', topProductAlt(sales));
