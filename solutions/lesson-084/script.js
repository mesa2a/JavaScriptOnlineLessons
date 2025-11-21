let generate = document.getElementById("generate");
let result = document.getElementById("result");
let timeDisplay = document.getElementById("time");

generate.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  // 開始時刻を記録
  let startTime = Date.now();

  // 効率的な実装: DOM要素の参照を一度だけ取得
  let resultElement = document.getElementById("result");

  // 1から100まで表示
  for (let i = 1; i <= 100; i++) {
    let p = document.createElement("p");
    p.textContent = i;
    resultElement.appendChild(p);
  }

  // 終了時刻を記録
  let endTime = Date.now();

  // 処理時間を表示
  timeDisplay.textContent = "処理時間: " + (endTime - startTime) + "ミリ秒";
});
