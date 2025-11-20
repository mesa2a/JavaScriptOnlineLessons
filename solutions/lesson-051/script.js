function checkBusinessHours() {
  const hourValue = document.getElementById("hour").value;
  const isWeekend = document.getElementById("isWeekend").checked;
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  // 結果とエラーをクリア
  result.textContent = "";
  error.textContent = "";

  // 時刻を数値に変換
  const hour = Number(hourValue);

  // 数値チェック
  if (isNaN(hour)) {
    error.textContent = "時刻は数値で入力してください";
    return;
  }

  // 範囲判定で営業時間をチェック
  if (isWeekend) {
    // 土日: 10時から20時
    if (hour >= 10 && hour < 20) {
      result.textContent = "営業中です";
    } else {
      result.textContent = "営業時間外です";
    }
  } else {
    // 平日: 9時から18時
    if (hour >= 9 && hour < 18) {
      result.textContent = "営業中です";
    } else {
      result.textContent = "営業時間外です";
    }
  }
}
