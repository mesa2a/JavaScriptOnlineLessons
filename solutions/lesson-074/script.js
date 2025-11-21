let startLoop = document.getElementById("startLoop");
let result = document.getElementById("result");

startLoop.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  // カウンタ変数を初期化
  let i = 0;

  // while文で5回繰り返す
  while (i < 5) {
    // 結果を表示
    let p = document.createElement("p");
    p.textContent = "ループ回数: " + (i + 1);
    result.appendChild(p);

    // カウンタを1増やす
    i++;
  }
});
