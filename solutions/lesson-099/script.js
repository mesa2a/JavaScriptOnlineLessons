// 商品データ
let products = [
  { name: "ノート", price: 100, stock: 5 },
  { name: "ペン", price: 50, stock: 10 },
  { name: "消しゴム", price: 30, stock: 0 },
  { name: "定規", price: 150, stock: 3 },
  { name: "ファイル", price: 200, stock: 8 }
];

let container = document.getElementById("container");

// 商品リストを表示する関数
function showProducts() {
  // コンテナをクリア
  container.replaceChildren();

  // 各商品を表示
  for (let product of products) {
    // カード要素を作成
    let card = document.createElement("div");
    card.className = "product-card";

    // 商品名を作成
    let nameElement = document.createElement("div");
    nameElement.className = "product-name";
    nameElement.textContent = product.name;

    // 価格を作成
    let priceElement = document.createElement("div");
    priceElement.className = "product-price";
    priceElement.textContent = "価格: " + product.price + "円";

    // 在庫数を作成
    let stockElement = document.createElement("div");
    stockElement.className = "product-stock";

    if (product.stock > 0) {
      stockElement.textContent = "在庫: " + product.stock + "個";
    } else {
      stockElement.textContent = "売り切れ";
      stockElement.classList.add("sold-out");
    }

    // 購入ボタンを作成
    let buyButton = document.createElement("button");
    buyButton.className = "buy-button";
    buyButton.textContent = "購入";

    // 在庫がゼロの場合はボタンを無効化
    if (product.stock === 0) {
      buyButton.disabled = true;
      buyButton.textContent = "売り切れ";
    }

    // 購入ボタンのクリックイベント
    buyButton.addEventListener("click", function() {
      if (product.stock > 0) {
        product.stock--;
        showProducts();  // 再表示
      }
    });

    // 要素を組み立てる
    card.appendChild(nameElement);
    card.appendChild(priceElement);
    card.appendChild(stockElement);
    card.appendChild(buyButton);

    // コンテナに追加
    container.appendChild(card);
  }
}

// 初期表示
showProducts();
