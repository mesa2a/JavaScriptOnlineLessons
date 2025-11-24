/**
 * レッスン170: 配列操作の復習
 * 演習問題
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
  // ヒント: filter() と map() を使います
  // 1. filter()で60点以上の学生を抽出
  // 2. map()で名前だけを取り出す

  // ここにコードを書いてください
}

// テスト
console.log('問題1: 合格者');
var passed = getPassedStudents(students);
console.log(passed); // 期待される結果: ['田中', '鈴木', '伊藤']

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
  // ヒント: reduce() を使います
  // 各商品の price * quantity を合計します

  // ここにコードを書いてください
}

// テスト
console.log('問題2: 合計金額');
var total = calculateTotal(cart);
console.log(total); // 期待される結果: 1080

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
  // ヒント: map() を使います
  // fullName は last_name + first_name の形式で作成

  // ここにコードを書いてください
}

// テスト
console.log('問題3: データ変換');
var displayUsers = transformUsers(apiUsers);
console.log(displayUsers);
// 期待される結果:
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
  // ヒント: filter() を使って完了したタスクをカウント
  // 完了数 / 全体数 * 100 で完了率を計算

  // ここにコードを書いてください
}

// テスト
console.log('問題4: 完了率');
var rate = calculateCompletionRate(tasks);
console.log(rate + '%'); // 期待される結果: 60%

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
  // ヒント: find() または forEach() を使います
  // 指定されたIDのユーザーを見つけて、年齢を更新

  // ここにコードを書いてください
}

// テスト
console.log('問題5: ユーザー更新');
console.log('更新前:', users);
updateUserAge(users, 2, 31);
console.log('更新後:', users);
// 期待される結果: 佐藤の年齢が31に更新される

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
  // ヒント: filter() で stock が 0 の商品を抽出

  // ここにコードを書いてください
}

/**
 * 在庫総額を計算する関数
 * @param {Array} inventory - 在庫の配列
 * @returns {number} 在庫総額
 */
function calculateTotalValue(inventory) {
  // ヒント: reduce() で stock * price の合計を計算

  // ここにコードを書いてください
}

/**
 * 最も高価な商品を見つける関数
 * @param {Array} inventory - 在庫の配列
 * @returns {Object} 最も高価な商品
 */
function findMostExpensive(inventory) {
  // ヒント: reduce() で価格を比較

  // ここにコードを書いてください
}

/**
 * 商品名で検索する関数
 * @param {Array} inventory - 在庫の配列
 * @param {string} keyword - 検索キーワード
 * @returns {Array} 検索結果の配列
 */
function searchByName(inventory, keyword) {
  // ヒント: filter() と indexOf() で部分一致検索

  // ここにコードを書いてください
}

// テスト
console.log('チャレンジ1: 在庫管理');
console.log('在庫切れ:', findOutOfStock(inventory));
console.log('在庫総額:', calculateTotalValue(inventory));
console.log('最高額商品:', findMostExpensive(inventory));
console.log('検索結果:', searchByName(inventory, 'ー'));

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
  // ヒント: reduce() でカテゴリごとに集計

  // ここにコードを書いてください
}

/**
 * 日付別の売上合計を計算する関数
 * @param {Array} sales - 売上の配列
 * @returns {Object} 日付別売上
 */
function salesByDate(sales) {
  // ヒント: reduce() で日付ごとに集計

  // ここにコードを書いてください
}

/**
 * 最も売れた商品を見つける関数
 * @param {Array} sales - 売上の配列
 * @returns {string} 最も売れた商品名
 */
function topProduct(sales) {
  // ヒント: reduce() で商品ごとの売上を集計し、最大値を見つける

  // ここにコードを書いてください
}

/**
 * 平均売上金額を計算する関数
 * @param {Array} sales - 売上の配列
 * @returns {number} 平均売上金額
 */
function averageSale(sales) {
  // ヒント: reduce() で合計を計算し、件数で割る

  // ここにコードを書いてください
}

// テスト
console.log('チャレンジ2: 売上分析');
console.log('カテゴリ別:', salesByCategory(sales));
console.log('日付別:', salesByDate(sales));
console.log('トップ商品:', topProduct(sales));
console.log('平均売上:', averageSale(sales));
