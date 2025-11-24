// 商品オブジェクトを作成してください
let product = {
  name: "ノートパソコン",
  price: 80000,
  stock: 5,
  taxRate: 0.1,

  // 1. 税込価格を計算して返すメソッド
  getPriceWithTax() {
    // ここに実装
    // ヒント: this.price * (1 + this.taxRate) を返します
  },

  // 2. 在庫を減らすメソッド
  sell(quantity) {
    // ここに実装
    // ヒント: if文で this.stock が quantity 以上かチェック
    // 足りない場合は "在庫不足" を返す
    // 足りる場合は this.stock を減らして "販売完了" を返す
  },

  // 3. 在庫を増やすメソッド
  restock(quantity) {
    // ここに実装
    // ヒント: this.stock に quantity を加算
    // "入荷完了" を返す
  },

  // 4. 商品情報を表示するメソッド
  displayInfo() {
    // ここに実装
    // ヒント: this.name, this.price, this.stock を使って
    // document.getElementById("productInfo") に情報を表示
  }
};

// 初期表示


// ボタンのイベントリスナーを設定
let sellBtn = document.getElementById("sellBtn");

  // product.sell(1) を呼び出す
  // 結果を #result に表示
  // product.displayInfo() を呼び出して情報を更新


let restockBtn = document.getElementById("restockBtn");

  // product.restock(5) を呼び出す
  // 結果を #result に表示
  // product.displayInfo() を呼び出して情報を更新


let showPriceBtn = document.getElementById("showPriceBtn");

  // product.getPriceWithTax() を呼び出す
  // 結果を #result に表示
