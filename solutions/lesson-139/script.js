let product = {
  name: "ノートパソコン",
  price: 80000,
  stock: 5,
  taxRate: 0.1,

  getPriceWithTax() {
    return this.price * (1 + this.taxRate);
  },

  sell(quantity) {
    if (this.stock < quantity) {
      return "在庫不足";
    } else {
      this.stock = this.stock - quantity;
      return "販売完了";
    }
  },

  restock(quantity) {
    this.stock = this.stock + quantity;
    return "入荷完了";
  },

  displayInfo() {
    let infoBox = document.getElementById("productInfo");
    let html = "";
    html = html + "<h3>" + this.name + "</h3>";
    html = html + "<p>価格：" + this.price + "円</p>";
    html = html + "<p>在庫：" + this.stock + "個</p>";
    infoBox.innerHTML = html;
  }
};

// 初期表示
product.displayInfo();

// ボタンのイベントリスナーを設定
let sellBtn = document.getElementById("sellBtn");
sellBtn.addEventListener("click", function() {
  let message = product.sell(1);
  let resultBox = document.getElementById("result");
  resultBox.textContent = message;
  product.displayInfo();
});

let restockBtn = document.getElementById("restockBtn");
restockBtn.addEventListener("click", function() {
  let message = product.restock(5);
  let resultBox = document.getElementById("result");
  resultBox.textContent = message;
  product.displayInfo();
});

let showPriceBtn = document.getElementById("showPriceBtn");
showPriceBtn.addEventListener("click", function() {
  let priceWithTax = product.getPriceWithTax();
  let resultBox = document.getElementById("result");
  resultBox.textContent = "税込価格：" + priceWithTax + "円";
});
