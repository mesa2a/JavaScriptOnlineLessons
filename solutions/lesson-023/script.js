function showMessage1() {
  const elem = document.getElementById("display");
  elem.textContent = "メッセージ1";
}

function showMessage2() {
  const elem = document.getElementById("display");
  elem.textContent = "メッセージ2";
}

function showMessage3() {
  const elem = document.getElementById("display");
  elem.textContent = "メッセージ3";
}

function changeColor(color) {
  const elem = document.getElementById("display");
  elem.style.color = color;
}

function resetDisplay() {
  const elem = document.getElementById("display");
  elem.textContent = "初期状態";
  elem.style.color = "black";
}
