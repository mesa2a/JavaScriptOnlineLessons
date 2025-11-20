function checkReservation() {
  const isWeekday = document.getElementById("isWeekday").checked;
  const isMember = document.getElementById("isMember").checked;
  const partySizeValue = document.getElementById("partySize").value;
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  // 結果とエラーをクリア
  result.textContent = "";
  error.textContent = "";

  // 人数を数値に変換
  const partySize = Number(partySizeValue);

  // 数値チェック
  if (isNaN(partySize)) {
    error.textContent = "人数は数値で入力してください";
    return;
  }

  // 組み合わせ条件: (平日 または 会員) かつ 4人以下
  if ((isWeekday || isMember) && partySize <= 4) {
    result.textContent = "予約できます";
  } else {
    result.textContent = "予約できません";
  }
}
