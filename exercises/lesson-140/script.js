// 商品オブジェクトを作成してください
let product = {
  // ここにプロパティを追加
  // id: 101,
  // name: "ワイヤレスマウス",
  // price: 2500,
  // brand: "LogiTech",
  // inStock: true
};

// 1. すべてのプロパティ名と値を表示してください
let allProperties = document.getElementById("allProperties");
// ヒント: for...inループを使用
// for (let key in product) {
//   html += '<div class="property-item">';
//   html += '<strong>' + key + ':</strong> ' + product[key];
//   html += '</div>';
// }


// 2. プロパティの総数を表示してください
let propertyCount = document.getElementById("propertyCount");
// ヒント: カウンター変数を作成し、for...inループで加算


// 3. 数値型のプロパティだけを表示してください
let numericProperties = document.getElementById("numericProperties");
// ヒント: typeof product[key] === 'number' で数値型かチェック


// 4. プロパティ名のリストを作成してHTMLに表示してください
let keyList = document.getElementById("keyList");
// ヒント: 各プロパティ名を <span class="key-badge"> で囲んで表示
