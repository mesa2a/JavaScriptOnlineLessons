function add() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 + num2;
  document.getElementById("result").textContent = "答え: " + result;
}

function subtract() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 - num2;
  document.getElementById("result").textContent = "答え: " + result;
}

function multiply() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 * num2;
  document.getElementById("result").textContent = "答え: " + result;
}

function divide() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const result = num1 / num2;
  document.getElementById("result").textContent = "答え: " + result;
}
