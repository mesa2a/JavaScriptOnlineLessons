let car = {
  brand: "トヨタ",
  model: "プリウス",
  year: 2023,
  color: "白"
};

let keyInput = document.getElementById("keyInput");
let getButton = document.getElementById("getButton");
let result = document.getElementById("result");

getButton.addEventListener("click", function() {
  let propertyName = keyInput.value;

  // ブラケット記法を使って動的にプロパティにアクセス
  let value = car[propertyName];

  if (value !== undefined) {
    result.textContent = value;
  } else {
    result.textContent = "プロパティが見つかりません";
  }
});
