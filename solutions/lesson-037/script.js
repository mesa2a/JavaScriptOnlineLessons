function checkAnswer() {
  let answer = "Tokyo";
  let correctAnswer = "Tokyo";

  if (answer === correctAnswer) {
    const elem = document.getElementById("result");
    elem.textContent = "○ 正解です";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "× 不正解です";
  }
}
