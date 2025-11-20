function calculateAdd() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const sum = num1 + num2;

  const result = document.getElementById("result");
  result.textContent = "答え: " + sum;
}
