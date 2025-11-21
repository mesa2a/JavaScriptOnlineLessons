let addButton = document.getElementById("add");
let addMultipleButton = document.getElementById("addMultiple");
let display = document.getElementById("display");
let count = document.getElementById("count");
let result = document.getElementById("result");
let newFruitInput = document.getElementById("newFruit");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう"];

// 配列を表示
function showArray() {
  display.textContent = fruits.join(", ");
  count.textContent = fruits.length;
}

// 初期表示
showArray();

// 1つ追加
addButton.addEventListener("click", function() {
  let newFruit = newFruitInput.value;

  if (newFruit) {
    fruits.push(newFruit);
    showArray();
    result.textContent = "「" + newFruit + "」を追加しました";
    newFruitInput.value = "";  // 入力欄をクリア
  } else {
    result.textContent = "フルーツの名前を入力してください";
  }
});

// 複数追加
addMultipleButton.addEventListener("click", function() {
  fruits.push("バナナ", "メロン", "いちご");
  showArray();
  result.textContent = "バナナ、メロン、いちごを追加しました";
});
