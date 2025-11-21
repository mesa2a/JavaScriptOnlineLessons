let addButton = document.getElementById("add");
let removeButton = document.getElementById("remove");
let clearButton = document.getElementById("clear");
let display = document.getElementById("display");
let count = document.getElementById("count");
let status = document.getElementById("status");
let newItemInput = document.getElementById("newItem");

// アイテムの配列
let items = ["りんご", "みかん", "ぶどう"];

// 配列を表示
function showArray() {
  display.textContent = items.join(", ");
  count.textContent = items.length;

  // 状態を表示
  if (items.length === 0) {
    status.textContent = "空です";
  } else if (items.length < 3) {
    status.textContent = "少ないです";
  } else if (items.length >= 10) {
    status.textContent = "たくさんあります";
  } else {
    status.textContent = "普通です";
  }
}

// 初期表示
showArray();

// 追加
addButton.addEventListener("click", function() {
  let newItem = newItemInput.value;

  if (newItem) {
    items.push(newItem);
    showArray();
    newItemInput.value = "";
  }
});

// 削除
removeButton.addEventListener("click", function() {
  if (items.length > 0) {
    items.pop();
    showArray();
  }
});

// 全削除
clearButton.addEventListener("click", function() {
  items.length = 0;  // lengthを0にして配列を空にする
  showArray();
});
