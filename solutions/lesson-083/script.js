let useFor = document.getElementById("useFor");
let forResult = document.getElementById("forResult");
let useWhile = document.getElementById("useWhile");
let whileResult = document.getElementById("whileResult");

// for文を使った実装
useFor.addEventListener("click", function() {
  // 結果をクリア
  forResult.innerHTML = "";

  // for文で1から10まで表示
  for (let i = 1; i <= 10; i++) {
    let p = document.createElement("p");
    p.textContent = i;
    forResult.appendChild(p);
  }
});

// while文を使った実装
useWhile.addEventListener("click", function() {
  // 結果をクリア
  whileResult.innerHTML = "";

  // while文で1から10まで表示
  let i = 1;
  while (i <= 10) {
    let p = document.createElement("p");
    p.textContent = i;
    whileResult.appendChild(p);
    i++;
  }
});
