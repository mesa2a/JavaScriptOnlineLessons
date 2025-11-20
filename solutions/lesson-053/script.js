function checkAnswer() {
  const answer = document.getElementById("answer").value;
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  // 結果とエラーをクリア
  result.textContent = "";
  error.textContent = "";

  // 空文字チェック
  if (answer === "") {
    error.textContent = "答えを入力してください";
    return;
  }

  // 答えのチェック(大文字・小文字を区別しない)
  if (answer.toLowerCase() === "東京" || answer.toLowerCase() === "tokyo") {
    result.textContent = "○ 正解です！";
  } else {
    result.textContent = "× 不正解です。正解は「東京」です。";
  }
}
