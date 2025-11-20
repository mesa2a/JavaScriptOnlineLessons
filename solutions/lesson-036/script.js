function checkAge() {
  let age = 25;

  if (age >= 20) {
    const elem = document.getElementById("age-result");
    elem.textContent = "成人です";
  }
}

function checkScore() {
  let score = 75;

  if (score >= 60) {
    const elem = document.getElementById("score-result");
    elem.textContent = "合格です";
  }
}

let count = 0;

function addCount() {
  count++;
  const counter = document.getElementById("counter");
  counter.textContent = count;

  if (count >= 5) {
    const elem = document.getElementById("counter-message");
    elem.textContent = "5回以上クリックされました";
  }
}
