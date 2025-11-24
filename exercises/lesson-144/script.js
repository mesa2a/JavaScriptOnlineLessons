// 1. 商品に税込価格を追加する関数
function addTaxToProduct(product, taxRate) {
  // ヒント: スプレッド構文を使って元のプロパティをコピー
  // 新しいプロパティ priceWithTax を追加
  // priceWithTax = product.price * (1 + taxRate)
}

// テストデータ
let product = {
  name: "ノートパソコン",
  price: 80000,
  category: "電化製品"
};

// 関数を呼び出して結果を表示
let productWithTax = addTaxToProduct(product, 0.1);

let productDisplay = document.getElementById("productWithTax");
// ヒント: productWithTax の全プロパティを表示


// 2. ユーザーを検索する関数
function findUsers(users, criteria) {
  // ヒント: 結果を格納する配列を作成
  // forループで users を処理
  // criteria の条件（minAge, maxAge, city）をチェック
  // 条件に合うユーザーを結果配列に追加
}

// テストデータ
let users = [
  { name: "田中", age: 25, city: "東京" },
  { name: "佐藤", age: 32, city: "大阪" },
  { name: "鈴木", age: 28, city: "東京" },
  { name: "高橋", age: 45, city: "名古屋" },
  { name: "伊藤", age: 29, city: "東京" }
];

// 検索条件：年齢25-30、東京在住
let searchCriteria = {
  minAge: 25,
  maxAge: 30,
  city: "東京"
};

let foundUsers = findUsers(users, searchCriteria);

let searchDisplay = document.getElementById("searchResults");
// ヒント: foundUsers をforループで処理して表示


// 3. 注文統計を計算する関数
function getOrderStats(orders) {
  // ヒント: 合計注文数、合計金額を計算
  // 平均金額 = 合計金額 / 注文数
  // オブジェクトを返す
}

// テストデータ
let orders = [
  { orderId: "O001", amount: 5000 },
  { orderId: "O002", amount: 3500 },
  { orderId: "O003", amount: 8000 },
  { orderId: "O004", amount: 2500 },
  { orderId: "O005", amount: 6000 }
];

let stats = getOrderStats(orders);

let statsDisplay = document.getElementById("orderStats");
// ヒント: stats の各プロパティを .stat-card で表示
// 例:
// <div class="stat-card">
//   <div class="stat-label">総注文数</div>
//   <div class="stat-value">5</div>
// </div>
