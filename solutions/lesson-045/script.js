function checkDay() {
  const day = document.getElementById("day").value;
  const result = document.getElementById("result");

  // OR演算子で複数の条件をチェック
  if (day === "土曜日" || day === "日曜日") {
    result.textContent = "休みです";
  } else {
    result.textContent = "平日です";
  }
}
