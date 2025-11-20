function checkUmbrella() {
  const isRaining = document.getElementById("isRaining").checked;
  const result = document.getElementById("result");

  // NOT演算子で条件を反転
  if (!isRaining) {
    result.textContent = "傘は不要です";
  } else {
    result.textContent = "傘が必要です";
  }
}
