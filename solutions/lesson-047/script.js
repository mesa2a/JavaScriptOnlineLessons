function checkEvent() {
  const ageValue = document.getElementById("age").value;
  const hasTicket = document.getElementById("hasTicket").checked;
  const isVIP = document.getElementById("isVIP").checked;
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

  // 複雑な条件: (18歳以上 かつ チケットあり) または VIP
  if ((age >= 18 && hasTicket) || isVIP) {
    result.textContent = "参加できます";
  } else {
    result.textContent = "参加できません";
  }
}
