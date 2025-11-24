/**
 * レッスン174: 苦手分野の復習（総合演習編）
 * 演習問題
 */

// ========================================
// 問題1: ユーザー管理システム
// ========================================

/**
 * ユーザーデータを管理するオブジェクトを作成する
 *
 * 要件:
 * - users配列を持つ
 * - addUser(user): ユーザーを追加（IDは自動採番）
 * - removeUser(id): ユーザーを削除
 * - findUserById(id): IDでユーザーを検索
 * - findUsersByRole(role): 役職でユーザーを検索
 * - getAllUsers(): すべてのユーザーを取得
 */
function createUserManager() {
  // ヒント:
  // - users 配列を内部で保持
  // - nextId で次のIDを管理
  // - 各メソッドは適切な配列操作を使用

  // ここにコードを書いてください
}

// テスト
// var manager = createUserManager();
// manager.addUser({ name: '田中太郎', age: 25, role: '開発者' });
// manager.addUser({ name: '佐藤花子', age: 30, role: 'デザイナー' });
// console.log(manager.getAllUsers());


// ========================================
// 問題2: データのフィルタリングとソート
// ========================================

/**
 * 商品データを条件でフィルタリングし、ソートする
 *
 * products: 商品の配列
 * filters: { category: string, minPrice: number, maxPrice: number, inStock: boolean }
 * sortBy: 'price' | 'name' | 'stock'
 * sortOrder: 'asc' | 'desc'
 */
function filterAndSortProducts(products, filters, sortBy, sortOrder) {
  // ヒント:
  // 1. filter で条件に合う商品を抽出
  // 2. sort でソート
  // 3. 各フィルター条件は存在する場合のみ適用

  // ここにコードを書いてください
}

// テスト
// var products = [
//   { id: 1, name: 'ノートPC', category: '電子機器', price: 80000, stock: 5 },
//   { id: 2, name: 'マウス', category: '電子機器', price: 2000, stock: 0 },
//   { id: 3, name: 'デスク', category: '家具', price: 30000, stock: 3 }
// ];
// var filtered = filterAndSortProducts(products,
//   { category: '電子機器', minPrice: 1000 },
//   'price',
//   'asc'
// );
// console.log(filtered);


// ========================================
// 問題3: フォームバリデーション
// ========================================

/**
 * 登録フォームの入力をバリデーションする
 *
 * formData: { username: string, email: string, password: string, age: string }
 *
 * バリデーションルール:
 * - username: 3文字以上20文字以下
 * - email: @ と . を含む
 * - password: 8文字以上、英字と数字を含む
 * - age: 0以上150以下の数値
 *
 * 返り値: { isValid: boolean, errors: string[] }
 */
function validateRegistrationForm(formData) {
  // ヒント:
  // - errors 配列を用意
  // - 各フィールドを順番にチェック
  // - エラーメッセージを配列に追加
  // - errors.length === 0 なら isValid: true

  // ここにコードを書いてください
}

// テスト
// console.log(validateRegistrationForm({
//   username: 'ab',
//   email: 'test@example.com',
//   password: 'pass',
//   age: '25'
// }));


// ========================================
// 問題4: データの集計
// ========================================

/**
 * 売上データから統計情報を計算する
 *
 * sales: { date: string, amount: number, category: string }[]
 *
 * 返り値: {
 *   total: number,        // 総売上
 *   average: number,      // 平均売上
 *   max: number,          // 最大売上
 *   min: number,          // 最小売上
 *   byCategory: object    // カテゴリ別の売上合計
 * }
 */
function calculateSalesStatistics(sales) {
  // ヒント:
  // - reduce で合計を計算
  // - ループで最大・最小を見つける
  // - オブジェクトでカテゴリ別集計

  // ここにコードを書いてください
}

// テスト
// var sales = [
//   { date: '2024-01-01', amount: 10000, category: '食品' },
//   { date: '2024-01-02', amount: 15000, category: '衣料' },
//   { date: '2024-01-03', amount: 8000, category: '食品' }
// ];
// console.log(calculateSalesStatistics(sales));


// ========================================
// 問題5: 検索機能
// ========================================

/**
 * 複数条件での商品検索
 *
 * products: 商品の配列
 * searchTerm: 検索キーワード（名前と説明を部分一致検索）
 * options: { category: string, minPrice: number, maxPrice: number }
 *
 * 返り値: 条件に合う商品の配列
 */
function searchProducts(products, searchTerm, options) {
  // ヒント:
  // - まず searchTerm で名前・説明を検索
  // - 次に options の各条件でフィルタリング
  // - toLowerCase() で大文字小文字を無視

  // ここにコードを書いてください
}

// テスト
// var products = [
//   { id: 1, name: 'ノートパソコン', description: '高性能PC', category: '電子機器', price: 80000 },
//   { id: 2, name: 'デスクトップPC', description: 'デスク用PC', category: '電子機器', price: 120000 },
//   { id: 3, name: '木製デスク', description: 'シンプルなデスク', category: '家具', price: 30000 }
// ];
// var results = searchProducts(products, 'デスク', { maxPrice: 50000 });
// console.log(results);


// ========================================
// チャレンジ1: ページネーション
// ========================================

/**
 * ページネーション機能を持つオブジェクトを作成
 *
 * items: 全アイテムの配列
 * itemsPerPage: 1ページあたりのアイテム数
 *
 * メソッド:
 * - getCurrentPage(): 現在のページ番号を返す
 * - getTotalPages(): 総ページ数を返す
 * - getPageItems(): 現在のページのアイテムを返す
 * - nextPage(): 次のページへ（最後なら false を返す）
 * - prevPage(): 前のページへ（最初なら false を返す）
 * - goToPage(page): 指定ページへ（範囲外なら false を返す）
 */
function createPagination(items, itemsPerPage) {
  // ヒント:
  // - currentPage を内部で保持
  // - slice を使ってページのアイテムを切り出す
  // - ページ番号の範囲チェックを忘れずに

  // ここにコードを書いてください
}

// テスト
// var items = [];
// for (var i = 1; i <= 25; i++) {
//   items.push('Item ' + i);
// }
// var pager = createPagination(items, 10);
// console.log(pager.getPageItems()); // Item 1-10
// pager.nextPage();
// console.log(pager.getPageItems()); // Item 11-20


// ========================================
// チャレンジ2: データの正規化
// ========================================

/**
 * ネストされたデータを平坦化して正規化する
 *
 * 入力例:
 * {
 *   id: 1,
 *   name: '田中太郎',
 *   address: { city: '東京', zip: '100-0001' },
 *   orders: [
 *     { id: 1, total: 5000 },
 *     { id: 2, total: 3000 }
 *   ]
 * }
 *
 * 出力例:
 * {
 *   id: 1,
 *   name: '田中太郎',
 *   city: '東京',
 *   zip: '100-0001',
 *   orderCount: 2,
 *   totalAmount: 8000
 * }
 */
function normalizeUserData(user) {
  // ヒント:
  // - 新しいオブジェクトを作成
  // - ネストされたプロパティを展開
  // - orders を集計

  // ここにコードを書いてください
}

// テスト
// var user = {
//   id: 1,
//   name: '田中太郎',
//   address: { city: '東京', zip: '100-0001' },
//   orders: [
//     { id: 1, total: 5000 },
//     { id: 2, total: 3000 }
//   ]
// };
// console.log(normalizeUserData(user));


// ========================================
// チャレンジ3: カートシステム
// ========================================

/**
 * ショッピングカート機能を実装
 *
 * メソッド:
 * - addItem(product, quantity): 商品を追加
 * - removeItem(productId): 商品を削除
 * - updateQuantity(productId, quantity): 数量を更新
 * - getTotal(): 合計金額を計算
 * - getItemCount(): 商品の総数を計算
 * - clear(): カートを空にする
 * - getItems(): カート内の商品を取得
 */
function createShoppingCart() {
  // ヒント:
  // - items 配列を内部で保持
  // - 各アイテムは { product, quantity } の形式
  // - 同じ商品は数量を加算

  // ここにコードを書いてください
}

// テスト
// var cart = createShoppingCart();
// cart.addItem({ id: 1, name: 'リンゴ', price: 100 }, 3);
// cart.addItem({ id: 2, name: 'バナナ', price: 150 }, 2);
// console.log(cart.getTotal()); // 600
// console.log(cart.getItemCount()); // 5


// ========================================
// 高度な問題1: データマージ
// ========================================

/**
 * 2つの配列をマージして重複を排除
 *
 * users1: ユーザー配列1
 * users2: ユーザー配列2
 *
 * - 同じIDのユーザーは1つにまとめる
 * - users2のデータで users1 のデータを上書き
 * - IDでソートして返す
 */
function mergeUsers(users1, users2) {
  // ヒント:
  // - オブジェクトを使ってIDでグループ化
  // - Object.keys() で配列に戻す
  // - sort でソート

  // ここにコードを書いてください
}

// テスト
// var users1 = [
//   { id: 1, name: '田中', age: 25 },
//   { id: 2, name: '佐藤', age: 30 }
// ];
// var users2 = [
//   { id: 2, name: '佐藤花子', age: 31 },
//   { id: 3, name: '鈴木', age: 28 }
// ];
// console.log(mergeUsers(users1, users2));


// ========================================
// 高度な問題2: クエリビルダー
// ========================================

/**
 * SQLライクなクエリを配列に対して実行
 *
 * メソッド:
 * - select(...fields): フィールドを選択
 * - where(predicate): 条件でフィルタリング
 * - orderBy(field, order): ソート
 * - limit(count): 件数制限
 * - execute(): クエリを実行
 */
function createQueryBuilder(data) {
  // ヒント:
  // - メソッドチェーンで処理を繋げる
  // - 各メソッドは this を返す
  // - execute() で最終的な処理を実行

  // ここにコードを書いてください
}

// テスト
// var data = [
//   { id: 1, name: '田中', age: 25, role: '開発者' },
//   { id: 2, name: '佐藤', age: 30, role: 'デザイナー' },
//   { id: 3, name: '鈴木', age: 28, role: '開発者' }
// ];
// var query = createQueryBuilder(data);
// var result = query
//   .select('name', 'age')
//   .where(function(item) { return item.role === '開発者'; })
//   .orderBy('age', 'desc')
//   .limit(5)
//   .execute();
// console.log(result);


// エクスポート（テスト用）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createUserManager: createUserManager,
    filterAndSortProducts: filterAndSortProducts,
    validateRegistrationForm: validateRegistrationForm,
    calculateSalesStatistics: calculateSalesStatistics,
    searchProducts: searchProducts,
    createPagination: createPagination,
    normalizeUserData: normalizeUserData,
    createShoppingCart: createShoppingCart,
    mergeUsers: mergeUsers,
    createQueryBuilder: createQueryBuilder
  };
}
