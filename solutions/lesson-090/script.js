let removeLastButton = document.getElementById("removeLast");
let removeFirstButton = document.getElementById("removeFirst");
let display = document.getElementById("display");
let count = document.getElementById("count");
let result = document.getElementById("result");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// 配列を表示
function showArray() {
  display.textContent = fruits.join(", ");
  count.textContent = fruits.length;
}

// 初期表示
showArray();

// 末尾を削除
removeLastButton.addEventListener("click", function() {
  if (fruits.length > 0) {
    let removed = fruits.pop();
    showArray();
    result.textContent = "「" + removed + "」を削除しました";
  } else {
    result.textContent = "配列は空です";
  }
});

// 先頭を削除
removeFirstButton.addEventListener("click", function() {
  if (fruits.length > 0) {
    let removed = fruits.shift();
    showArray();
    result.textContent = "「" + removed + "」を削除しました";
  } else {
    result.textContent = "配列は空です";
  }
});
