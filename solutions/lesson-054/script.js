function play() {
  const playerHand = document.getElementById("playerHand").value;
  const computerHand = "グー";
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  // 結果とエラーをクリア
  result.textContent = "";
  error.textContent = "";

  // 入力検証
  if (playerHand !== "グー" && playerHand !== "チョキ" && playerHand !== "パー") {
    error.textContent = "「グー」「チョキ」「パー」のいずれかを入力してください";
    return;
  }

  // 勝敗判定
  if (playerHand === computerHand) {
    result.textContent = "あいこです";
  } else if (
    (playerHand === "グー" && computerHand === "チョキ") ||
    (playerHand === "チョキ" && computerHand === "パー") ||
    (playerHand === "パー" && computerHand === "グー")
  ) {
    result.textContent = "あなたの勝ちです！";
  } else {
    result.textContent = "コンピュータの勝ちです";
  }
}
