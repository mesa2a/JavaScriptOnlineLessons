function calculateAge() {
  const age = prompt("現在の年齢は？");
  const num = Number(age);
  const future = num + 10;

  const elem = document.getElementById("result1");
  elem.textContent = "10年後は" + future + "歳です";
}

function calculateDouble() {
  const input = prompt("数値を入力してください");
  const num = Number(input);
  const result = num * 2;

  const elem = document.getElementById("result2");
  elem.textContent = "2倍は" + result + "です";
}

function calculateSum() {
  const first = prompt("1つ目の数値は？");
  const second = prompt("2つ目の数値は？");

  const num1 = Number(first);
  const num2 = Number(second);
  const sum = num1 + num2;

  const elem = document.getElementById("result3");
  elem.textContent = "合計は" + sum + "です";
}
