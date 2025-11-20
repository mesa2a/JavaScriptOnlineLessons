let itemInput = document.getElementById("itemInput");
let addButton = document.getElementById("addButton");
let itemList = document.getElementById("itemList");

// アイテムを追加する関数
function addItem() {
  let text = itemInput.value.trim();
  if (text === "") {
    return;
  }

  let li = document.createElement("li");
  li.className = "list-item";

  let textSpan = document.createElement("span");
  textSpan.className = "item-text";
  textSpan.textContent = text;

  let deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "削除";

  li.appendChild(textSpan);
  li.appendChild(deleteButton);
  itemList.appendChild(li);

  itemInput.value = "";
}

// 追加ボタンのクリックイベント
addButton.addEventListener("click", addItem);

// イベント委譲：itemListにクリックイベントを設定
itemList.addEventListener("click", function(event) {
  let target = event.target;

  // 削除ボタンがクリックされた場合
  if (target.classList.contains("delete-button")) {
    let listItem = target.parentElement;
    itemList.removeChild(listItem);
  }
  // アイテムのテキスト部分がクリックされた場合
  else if (target.classList.contains("item-text")) {
    alert(target.textContent);
  }
});
