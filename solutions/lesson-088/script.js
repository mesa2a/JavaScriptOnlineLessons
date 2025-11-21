let changeButton = document.getElementById("change");
let doubleButton = document.getElementById("doubleAll");
let display = document.getElementById("display");
let result = document.getElementById("result");
let indexInput = document.getElementById("index");
let valueInput = document.getElementById("value");

// 数値の配列
let numbers = [10, 20, 30, 40, 50];

// 配列を表示
function showArray() {
  display.textContent = "[" + numbers.join(", ") + "]";
}

// 初期表示
showArray();

// 特定の要素を変更
changeButton.addEventListener("click", function() {
  let index = Number(indexInput.value);
  let value = Number(valueInput.value);

  if (index >= 0 && index < numbers.length) {
    numbers[index] = value;
    showArray();
    result.textContent = "インデックス " + index + " を " + value + " に変更しました";
  } else {
    result.textContent = "インデックスが範囲外です（0〜" + (numbers.length - 1) + "）";
  }
});

// すべての要素を2倍にする
doubleButton.addEventListener("click", function() {
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[i] * 2;
  }
  showArray();
  result.textContent = "すべての要素を2倍にしました";
});
