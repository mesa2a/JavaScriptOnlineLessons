let startQuiz = document.getElementById("startQuiz");
let result = document.getElementById("result");

startQuiz.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  let answer = "";
  let correctAnswer = "JavaScript";
  let attempts = 0;
  let maxAttempts = 5;

  // 正解するか、試行回数が上限に達するまで繰り返す
  while (answer !== correctAnswer && attempts < maxAttempts) {
    answer = prompt("このレッスンで学んでいるプログラミング言語は何ですか？");
    attempts++;

    // キャンセルされた場合
    if (answer === null) {
      result.innerHTML = "<p>クイズをキャンセルしました。</p>";
      break;
    }
    // 正解の場合
    else if (answer === correctAnswer) {
      result.innerHTML = "<p>正解です！" + attempts + "回目で成功しました。</p>";
    }
    // 試行回数上限に達した場合
    else if (attempts >= maxAttempts) {
      result.innerHTML = "<p>残念！試行回数の上限に達しました。正解は「" + correctAnswer + "」でした。</p>";
    }
    // 不正解の場合
    else {
      result.innerHTML = "<p>不正解です。残り" + (maxAttempts - attempts) + "回挑戦できます。</p>";
    }
  }
});
