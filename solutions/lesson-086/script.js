let showButton = document.getElementById("showFruits");
let result = document.getElementById("result");

// フルーツの配列を作成
let fruits = ["りんご", "みかん", "ぶどう"];

showButton.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  // 配列全体を表示
  let listText = document.createElement("p");
  listText.textContent = "フルーツ: " + fruits.join(", ");
  result.appendChild(listText);

  // 要素数を表示
  let countText = document.createElement("p");
  countText.textContent = "合計: " + fruits.length + "個";
  result.appendChild(countText);
});
