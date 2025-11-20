function showInput1() {
  const input = document.getElementById("input1");
  const value = input.value;
  const result = document.getElementById("result1");
  result.textContent = "入力1: " + value;
}

function showInput2() {
  const input = document.getElementById("input2");
  const value = input.value;
  const result = document.getElementById("result2");
  result.textContent = "入力2: " + value;
}

function combineInputs() {
  const input1 = document.getElementById("input1");
  const input2 = document.getElementById("input2");
  const value1 = input1.value;
  const value2 = input2.value;
  const combined = value1 + " " + value2;
  const result = document.getElementById("result3");
  result.textContent = "結合: " + combined;
}
