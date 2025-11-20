function divide() {
  const value1 = document.getElementById("num1").value;
  const value2 = document.getElementById("num2").value;
  const error = document.getElementById("error");
  const result = document.getElementById("result");

  // エラーメッセージと結果をクリア
  error.textContent = "";
  result.textContent = "";

  // 空文字列チェック
  if (value1 === "" || value2 === "") {
    error.textContent = "両方の数値を入力してください";
    return;
  }

  // 数値変換
  const num1 = Number(value1);
  const num2 = Number(value2);

  // NaNチェック
  if (isNaN(num1) || isNaN(num2)) {
    error.textContent = "正しい数値を入力してください";
    return;
  }

  // 0で割るチェック
  if (num2 === 0) {
    error.textContent = "0で割ることはできません";
    return;
  }

  // 正常な計算
  const answer = num1 / num2;
  result.textContent = "答え: " + answer;
}
