/**
 * レッスン172: オブジェクトと関数の復習
 * 演習問題
 */

// ========================================
// 問題1: ユーザーオブジェクトの作成
// ========================================

/**
 * ユーザーオブジェクトを作成する関数
 * @param {string} name - ユーザー名
 * @param {number} age - 年齢
 * @param {string} email - メールアドレス
 * @returns {Object} ユーザーオブジェクト
 */
function createUser(name, age, email) {
  // ヒント: オブジェクトリテラルを返す
  // プロパティ: name, age, email

  // ここにコードを書いてください
}

// テスト
console.log('問題1: ユーザーオブジェクト');
var user1 = createUser('田中', 25, 'tanaka@example.com');
console.log(user1);
// 期待される結果: { name: '田中', age: 25, email: 'tanaka@example.com' }

// ========================================
// 問題2: オブジェクトのプロパティ取得
// ========================================

/**
 * オブジェクトから指定されたキーの値を取得する関数
 * @param {Object} obj - オブジェクト
 * @param {string} key - キー
 * @returns {*} 値（存在しない場合はundefined）
 */
function getValue(obj, key) {
  // ヒント: ブラケット記法を使う

  // ここにコードを書いてください
}

// テスト
console.log('問題2: プロパティ取得');
var person = { name: '田中', age: 25, city: '東京' };
console.log(getValue(person, 'name')); // '田中'
console.log(getValue(person, 'age'));  // 25
console.log(getValue(person, 'email'));// undefined

// ========================================
// 問題3: オブジェクトのマージ
// ========================================

/**
 * 2つのオブジェクトをマージする関数
 * @param {Object} obj1 - 1つ目のオブジェクト
 * @param {Object} obj2 - 2つ目のオブジェクト（優先）
 * @returns {Object} マージされたオブジェクト
 */
function mergeObjects(obj1, obj2) {
  // ヒント:
  // 1. 新しい空のオブジェクトを作成
  // 2. obj1のプロパティをコピー
  // 3. obj2のプロパティをコピー（上書き）

  // ここにコードを書いてください
}

// テスト
console.log('問題3: オブジェクトのマージ');
var defaults = { color: 'blue', size: 'medium', quantity: 1 };
var options = { color: 'red', quantity: 3 };
var merged = mergeObjects(defaults, options);
console.log(merged);
// 期待される結果: { color: 'red', size: 'medium', quantity: 3 }

// ========================================
// 問題4: 計算機オブジェクト
// ========================================

/**
 * 計算機オブジェクトを作成する関数
 * メソッド: add, subtract, multiply, divide, getValue, reset
 * @param {number} initialValue - 初期値
 * @returns {Object} 計算機オブジェクト
 */
function createCalculator(initialValue) {
  // ヒント:
  // - value プロパティで値を保持
  // - メソッドで this.value を操作
  // - 各メソッドは結果を返す

  // ここにコードを書いてください
}

// テスト
console.log('問題4: 計算機オブジェクト');
var calc = createCalculator(10);
console.log(calc.add(5));      // 15
console.log(calc.subtract(3)); // 12
console.log(calc.multiply(2)); // 24
console.log(calc.divide(4));   // 6
console.log(calc.getValue());  // 6
calc.reset();
console.log(calc.getValue());  // 0

// ========================================
// 問題5: 配列をオブジェクトに変換
// ========================================

/**
 * 配列をオブジェクトに変換する関数
 * @param {Array} arr - [key, value]のペアの配列
 * @returns {Object} オブジェクト
 */
function arrayToObject(arr) {
  // ヒント:
  // - 空のオブジェクトを作成
  // - 配列をループして、各ペアをオブジェクトに追加
  // arr[i][0]がキー、arr[i][1]が値

  // ここにコードを書いてください
}

// テスト
console.log('問題5: 配列をオブジェクトに変換');
var pairs = [['name', '田中'], ['age', 25], ['city', '東京']];
var obj = arrayToObject(pairs);
console.log(obj);
// 期待される結果: { name: '田中', age: 25, city: '東京' }

// ========================================
// 問題6: カウンタークロージャ
// ========================================

/**
 * カウンターを作成する関数
 * @returns {Object} increment, decrement, getCount メソッドを持つオブジェクト
 */
function createCounter() {
  // ヒント:
  // - クロージャを使ってcountを保持
  // - count変数は外部からアクセスできないようにする
  // - incrementでcount++
  // - decrementでcount--
  // - getCountでcountを返す

  // ここにコードを書いてください
}

// テスト
console.log('問題6: カウンタークロージャ');
var counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount());  // 1

// ========================================
// チャレンジ1: 商品管理システム
// ========================================

/**
 * 商品オブジェクトを作成する関数
 * @param {string} name - 商品名
 * @param {number} price - 価格
 * @param {number} stock - 在庫数
 * @returns {Object} 商品オブジェクト
 */
function createProduct(name, price, stock) {
  // ヒント:
  // プロパティ: name, price, stock
  // メソッド:
  // - isAvailable(): 在庫があるか確認
  // - calculateTotal(quantity): 合計金額を計算
  // - sell(quantity): 販売処理（在庫を減らす）
  // - restock(quantity): 入荷処理（在庫を増やす）
  // - getInfo(): 商品情報を文字列で返す

  // ここにコードを書いてください
}

// テスト
console.log('チャレンジ1: 商品管理システム');
var laptop = createProduct('ノートPC', 100000, 5);
console.log(laptop.isAvailable());      // true
console.log(laptop.calculateTotal(2));  // 200000
console.log(laptop.sell(3));            // true (在庫: 2)
console.log(laptop.sell(5));            // false (在庫不足)
laptop.restock(10);                     // 在庫: 12
console.log(laptop.getInfo());          // 'ノートPC - 価格: 100000円, 在庫: 12個'

// ========================================
// チャレンジ2: ユーザー管理システム
// ========================================

/**
 * ユーザー管理システムを作成する関数
 * @returns {Object} ユーザー管理システム
 */
function createUserManager() {
  // ヒント:
  // - users配列でユーザーを管理（クロージャ）
  // - addUser(user): ユーザーを追加
  // - getUser(id): IDでユーザーを取得
  // - updateUser(id, updates): ユーザー情報を更新
  // - deleteUser(id): ユーザーを削除
  // - getAllUsers(): すべてのユーザーを取得
  // - getUserCount(): ユーザー数を取得

  // ここにコードを書いてください
}

// テスト
console.log('チャレンジ2: ユーザー管理システム');
var userManager = createUserManager();

userManager.addUser({ id: 1, name: '田中', email: 'tanaka@example.com' });
userManager.addUser({ id: 2, name: '佐藤', email: 'sato@example.com' });
userManager.addUser({ id: 3, name: '鈴木', email: 'suzuki@example.com' });

console.log(userManager.getUserCount()); // 3
console.log(userManager.getUser(2));     // { id: 2, name: '佐藤', email: 'sato@example.com' }

userManager.updateUser(2, { email: 'sato-new@example.com' });
console.log(userManager.getUser(2));     // { id: 2, name: '佐藤', email: 'sato-new@example.com' }

userManager.deleteUser(1);
console.log(userManager.getUserCount()); // 2
console.log(userManager.getAllUsers());  // [佐藤, 鈴木]

// ========================================
// チャレンジ3: データ変換パイプライン
// ========================================

/**
 * 複数の関数を順番に適用する関数
 * @param {*} value - 初期値
 * @param {Array<Function>} functions - 関数の配列
 * @returns {*} 最終的な値
 */
function pipe(value, functions) {
  // ヒント:
  // - forループで各関数を順番に実行
  // - 前の関数の結果を次の関数に渡す

  // ここにコードを書いてください
}

// テスト用の関数
function double(n) {
  return n * 2;
}

function addTen(n) {
  return n + 10;
}

function square(n) {
  return n * n;
}

// テスト
console.log('チャレンジ3: データ変換パイプライン');
var result = pipe(5, [double, addTen, square]);
console.log(result); // ((5 * 2) + 10) ^ 2 = 400
