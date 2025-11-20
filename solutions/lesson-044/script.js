function checkEntry() {
  const ageValue = document.getElementById("age").value;
  const hasTicket = document.getElementById("hasTicket").checked;
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  // 結果とエラーをクリア
  result.textContent = "";
  error.textContent = "";

  // 年齢を数値に変換
  const age = Number(ageValue);

  // 数値チェック
  if (isNaN(age)) {
    error.textContent = "年齢は数値で入力してください";
    return;
  }

  // AND演算子で両方の条件をチェック
  if (age >= 12 && hasTicket) {
    result.textContent = "入場できます";
  } else {
    result.textContent = "入場できません";
  }
}
