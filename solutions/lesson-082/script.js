let showEven = document.getElementById("showEven");
let result = document.getElementById("result");

showEven.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  // 1から20まで繰り返す
  for (let i = 1; i <= 20; i++) {
    // 奇数はスキップ
    if (i % 2 !== 0) {
      continue;
    }

    // 偶数だけ表示
    let p = document.createElement("p");
    p.textContent = i + "は偶数です";
    result.appendChild(p);
  }
});
