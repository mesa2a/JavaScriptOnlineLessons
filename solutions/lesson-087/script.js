let firstButton = document.getElementById("showFirst");
let lastButton = document.getElementById("showLast");
let allButton = document.getElementById("showAll");
let result = document.getElementById("result");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう"];

// 最初の要素を表示
firstButton.addEventListener("click", function() {
  result.textContent = "最初の要素: " + fruits[0];
});

// 最後の要素を表示
lastButton.addEventListener("click", function() {
  result.textContent = "最後の要素: " + fruits[fruits.length - 1];
});

// すべての要素を表示
allButton.addEventListener("click", function() {
  result.innerHTML = "";  // クリア

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = "インデックス " + i + ": " + fruits[i];
    result.appendChild(p);
  }
});
