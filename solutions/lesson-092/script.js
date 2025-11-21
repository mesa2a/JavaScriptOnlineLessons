let simpleButton = document.getElementById("showSimple");
let numberedButton = document.getElementById("showNumbered");
let listButton = document.getElementById("showList");
let result = document.getElementById("result");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// シンプル表示
simpleButton.addEventListener("click", function() {
  result.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = fruits[i];
    result.appendChild(p);
  }
});

// 番号付き表示
numberedButton.addEventListener("click", function() {
  result.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = (i + 1) + ". " + fruits[i];
    result.appendChild(p);
  }
});

// リスト表示
listButton.addEventListener("click", function() {
  result.innerHTML = "";

  let ul = document.createElement("ul");

  for (let i = 0; i < fruits.length; i++) {
    let li = document.createElement("li");
    li.textContent = fruits[i];
    ul.appendChild(li);
  }

  result.appendChild(ul);
});
