// 1. 商品に税込価格を追加する関数
function addTaxToProduct(product, taxRate) {
  return {
    ...product,
    priceWithTax: product.price * (1 + taxRate)
  };
}

let product = {
  name: "ノートパソコン",
  price: 80000,
  category: "電化製品"
};

let productWithTax = addTaxToProduct(product, 0.1);

let productDisplay = document.getElementById("productWithTax");
let html1 = '<div class="product-card">';
html1 = html1 + "<h3>" + productWithTax.name + "</h3>";
html1 = html1 + '<div class="property"><strong>カテゴリ:</strong> ' + productWithTax.category + "</div>";
html1 = html1 + '<div class="property"><strong>価格（税抜）:</strong> ' + productWithTax.price + "円</div>";
html1 = html1 + '<div class="property"><strong>価格（税込）:</strong> ' + productWithTax.priceWithTax + "円</div>";
html1 = html1 + "</div>";
productDisplay.innerHTML = html1;

// 2. ユーザーを検索する関数
function findUsers(users, criteria) {
  let results = [];

  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    let matches = true;

    // 年齢の最小値チェック
    if (criteria.minAge && user.age < criteria.minAge) {
      matches = false;
    }

    // 年齢の最大値チェック
    if (criteria.maxAge && user.age > criteria.maxAge) {
      matches = false;
    }

    // 都市チェック
    if (criteria.city && user.city !== criteria.city) {
      matches = false;
    }

    if (matches) {
      results.push(user);
    }
  }

  return results;
}

let users = [
  { name: "田中", age: 25, city: "東京" },
  { name: "佐藤", age: 32, city: "大阪" },
  { name: "鈴木", age: 28, city: "東京" },
  { name: "高橋", age: 45, city: "名古屋" },
  { name: "伊藤", age: 29, city: "東京" }
];

let searchCriteria = {
  minAge: 25,
  maxAge: 30,
  city: "東京"
};

let foundUsers = findUsers(users, searchCriteria);

let searchDisplay = document.getElementById("searchResults");
let html2 = '<div class="result-box">';
html2 = html2 + "<p><strong>検索条件:</strong> 年齢 " + searchCriteria.minAge + "-" + searchCriteria.maxAge + "歳、" + searchCriteria.city + "在住</p>";
html2 = html2 + "<p><strong>検索結果:</strong> " + foundUsers.length + "名</p>";
html2 = html2 + "</div>";

for (let i = 0; i < foundUsers.length; i++) {
  html2 = html2 + '<div class="product-card">';
  html2 = html2 + '<div class="property"><strong>名前:</strong> ' + foundUsers[i].name + "</div>";
  html2 = html2 + '<div class="property"><strong>年齢:</strong> ' + foundUsers[i].age + "歳</div>";
  html2 = html2 + '<div class="property"><strong>都市:</strong> ' + foundUsers[i].city + "</div>";
  html2 = html2 + "</div>";
}

searchDisplay.innerHTML = html2;

// 3. 注文統計を計算する関数
function getOrderStats(orders) {
  let totalAmount = 0;

  for (let i = 0; i < orders.length; i++) {
    totalAmount = totalAmount + orders[i].amount;
  }

  return {
    totalOrders: orders.length,
    totalAmount: totalAmount,
    averageAmount: totalAmount / orders.length
  };
}

let orders = [
  { orderId: "O001", amount: 5000 },
  { orderId: "O002", amount: 3500 },
  { orderId: "O003", amount: 8000 },
  { orderId: "O004", amount: 2500 },
  { orderId: "O005", amount: 6000 }
];

let stats = getOrderStats(orders);

let statsDisplay = document.getElementById("orderStats");
let html3 = "";
html3 = html3 + '<div class="stat-card">';
html3 = html3 + '<div class="stat-label">総注文数</div>';
html3 = html3 + '<div class="stat-value">' + stats.totalOrders + "</div>";
html3 = html3 + "</div>";

html3 = html3 + '<div class="stat-card">';
html3 = html3 + '<div class="stat-label">総売上金額</div>';
html3 = html3 + '<div class="stat-value">' + stats.totalAmount + "円</div>";
html3 = html3 + "</div>";

html3 = html3 + '<div class="stat-card">';
html3 = html3 + '<div class="stat-label">平均注文金額</div>';
html3 = html3 + '<div class="stat-value">' + stats.averageAmount + "円</div>";
html3 = html3 + "</div>";

statsDisplay.innerHTML = html3;
