function drawOmikuji() {
  const result = document.getElementById("result");

  const random = Math.floor(Math.random() * 4);

  if (random === 0) {
    result.textContent = "大吉";
  } else if (random === 1) {
    result.textContent = "中吉";
  } else if (random === 2) {
    result.textContent = "小吉";
  } else {
    result.textContent = "凶";
  }
}
