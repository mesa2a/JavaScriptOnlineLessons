function showInput1() {
  const input = document.getElementById("input1");
  const value = input.value;
  const result = document.getElementById("result1");
  result.textContent = "入力: " + value;
}

function countChars() {
  const input = document.getElementById("input2");
  const value = input.value;
  const length = value.length;
  const result = document.getElementById("result2");
  result.textContent = "文字数: " + length;
}

function showBoth() {
  const input = document.getElementById("input3");
  const value = input.value;
  const length = value.length;
  const result = document.getElementById("result3");
  result.textContent = "入力: " + value + " (" + length + "文字)";
}
