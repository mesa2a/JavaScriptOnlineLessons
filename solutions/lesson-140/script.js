let product = {
  id: 101,
  name: "ワイヤレスマウス",
  price: 2500,
  brand: "LogiTech",
  inStock: true
};

// 1. すべてのプロパティ名と値を表示
let allProperties = document.getElementById("allProperties");
let html1 = "";
for (let key in product) {
  html1 = html1 + '<div class="property-item">';
  html1 = html1 + "<strong>" + key + ":</strong> " + product[key];
  html1 = html1 + "</div>";
}
allProperties.innerHTML = html1;

// 2. プロパティの総数を表示
let propertyCount = document.getElementById("propertyCount");
let count = 0;
for (let key in product) {
  count++;
}
propertyCount.textContent = count;

// 3. 数値型のプロパティだけを表示
let numericProperties = document.getElementById("numericProperties");
let html2 = "";
for (let key in product) {
  if (typeof product[key] === "number") {
    html2 = html2 + '<div class="property-item">';
    html2 = html2 + "<strong>" + key + ":</strong> " + product[key];
    html2 = html2 + "</div>";
  }
}
numericProperties.innerHTML = html2;

// 4. プロパティ名のリストを作成してHTMLに表示
let keyList = document.getElementById("keyList");
let html3 = "";
for (let key in product) {
  html3 = html3 + '<span class="key-badge">' + key + "</span>";
}
keyList.innerHTML = html3;
