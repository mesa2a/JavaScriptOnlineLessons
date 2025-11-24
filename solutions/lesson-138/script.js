let products = [
  { id: 1, name: "ワイヤレスマウス", price: 2500, stock: 15 },
  { id: 2, name: "キーボード", price: 5000, stock: 8 },
  { id: 3, name: "モニター", price: 25000, stock: 3 },
  { id: 4, name: "Webカメラ", price: 7000, stock: 12 }
];

// 1. 全商品の名前と価格を表示
let productList = document.getElementById("productList");
let html = "";
for (let i = 0; i < products.length; i++) {
  html = html + '<div class="product-item">';
  html = html + "<strong>" + products[i].name + "</strong><br>";
  html = html + "価格：" + products[i].price + "円 / 在庫：" + products[i].stock + "個";
  html = html + "</div>";
}
productList.innerHTML = html;

// 2. 在庫が10個以上ある商品の数を数える
let highStock = document.getElementById("highStock");
let count = 0;
for (let i = 0; i < products.length; i++) {
  if (products[i].stock >= 10) {
    count++;
  }
}
highStock.textContent = count;

// 3. 全商品の総在庫金額を計算
let totalValue = document.getElementById("totalValue");
let total = 0;
for (let i = 0; i < products.length; i++) {
  total = total + (products[i].price * products[i].stock);
}
totalValue.textContent = total;

// 4. 最も高い商品の名前を見つける
let mostExpensive = document.getElementById("mostExpensive");
let maxPrice = 0;
let maxName = "";
for (let i = 0; i < products.length; i++) {
  if (products[i].price > maxPrice) {
    maxPrice = products[i].price;
    maxName = products[i].name;
  }
}
mostExpensive.textContent = maxName;
