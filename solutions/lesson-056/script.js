function checkDay() {
  // 入力値を取得
  let input = document.getElementById("dayInput").value;
  let day = Number(input);

  let dayName = "";
  let weekendStatus = "";

  // 曜日を判定
  switch (day) {
    case 0:
      dayName = "日曜日";
      weekendStatus = "週末";
      break;
    case 1:
      dayName = "月曜日";
      weekendStatus = "平日";
      break;
    case 2:
      dayName = "火曜日";
      weekendStatus = "平日";
      break;
    case 3:
      dayName = "水曜日";
      weekendStatus = "平日";
      break;
    case 4:
      dayName = "木曜日";
      weekendStatus = "平日";
      break;
    case 5:
      dayName = "金曜日";
      weekendStatus = "平日";
      break;
    case 6:
      dayName = "土曜日";
      weekendStatus = "週末";
      break;
    default:
      dayName = "0から6の数字を入力してください";
      weekendStatus = "";
  }

  // 結果を表示
  document.getElementById("dayResult").textContent = dayName;
  document.getElementById("weekendResult").textContent = weekendStatus;
}
