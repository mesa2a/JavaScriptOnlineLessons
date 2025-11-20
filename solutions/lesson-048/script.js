function checkWeather() {
  const isSunny = document.getElementById("isSunny").checked;
  const result = document.getElementById("result");

  // 三項演算子を使って簡潔に書く
  const message = isSunny ? "外出日和です" : "傘を持っていきましょう";
  result.textContent = message;
}
