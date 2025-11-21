let generateList = document.getElementById("generateList");
let result = document.getElementById("result");

generateList.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  // 1から100まで繰り返す
  for (let i = 1; i <= 100; i++) {
    // 新しい段落要素を作成
    let p = document.createElement("p");
    p.textContent = i;
    result.appendChild(p);
  }
});
