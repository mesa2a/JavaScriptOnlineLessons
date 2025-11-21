let forOfButton = document.getElementById("forOfExample");
let forButton = document.getElementById("forExample");
let sumForOfButton = document.getElementById("sumForOf");
let sumForButton = document.getElementById("sumFor");
let forOfResult = document.getElementById("forOfResult");
let forResult = document.getElementById("forResult");
let sumResult = document.getElementById("sumResult");

// データ
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
let scores = [85, 92, 78, 95, 88];

// for...ofでシンプルな表示
forOfButton.addEventListener("click", function() {
  forOfResult.innerHTML = "";

  for (let fruit of fruits) {
    let p = document.createElement("p");
    p.textContent = fruit;
    forOfResult.appendChild(p);
  }
});

// 通常のforで番号付き表示
forButton.addEventListener("click", function() {
  forResult.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = (i + 1) + ". " + fruits[i];
    forResult.appendChild(p);
  }
});

// for...ofで合計
sumForOfButton.addEventListener("click", function() {
  let total = 0;

  for (let score of scores) {
    total = total + score;
  }

  sumResult.textContent = "for...ofで計算した合計: " + total;
});

// 通常のforで合計
sumForButton.addEventListener("click", function() {
  let total = 0;

  for (let i = 0; i < scores.length; i++) {
    total = total + scores[i];
  }

  sumResult.textContent = "通常のforで計算した合計: " + total;
});
