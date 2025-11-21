// 並列配列でデータを管理
let itemIds = [];
let itemNames = [];
let itemPurchased = [];
let nextId = 1;
let filterMode = "all";  // "all", "purchased", "unpurchased"

let itemInput = document.getElementById("itemInput");
let addButton = document.getElementById("addButton");
let itemList = document.getElementById("itemList");

let allButton = document.getElementById("allButton");
let unpurchasedButton = document.getElementById("unpurchasedButton");
let purchasedButton = document.getElementById("purchasedButton");

// 商品を追加
addButton.addEventListener("click", function() {
  addItem();
});

// Enterキーで追加
itemInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addItem();
  }
});

// フィルタボタン
allButton.addEventListener("click", function() {
  filterMode = "all";
  showItems();
});

unpurchasedButton.addEventListener("click", function() {
  filterMode = "unpurchased";
  showItems();
});

purchasedButton.addEventListener("click", function() {
  filterMode = "purchased";
  showItems();
});

// 商品を追加
function addItem() {
  let name = itemInput.value.trim();

  if (name === "") {
    alert("商品名を入力してください");
    return;
  }

  itemIds.push(nextId);
  itemNames.push(name);
  itemPurchased.push(false);

  nextId++;
  itemInput.value = "";
  itemInput.focus();
  showItems();
}

// 商品を表示
function showItems() {
  itemList.replaceChildren();

  let hasItems = false;

  for (let i = 0; i < itemNames.length; i++) {
    // フィルタモードに応じて表示を判定
    let shouldShow = false;

    if (filterMode === "all") {
      shouldShow = true;
    } else if (filterMode === "purchased") {
      shouldShow = itemPurchased[i];
    } else if (filterMode === "unpurchased") {
      shouldShow = !itemPurchased[i];
    }

    if (shouldShow) {
      hasItems = true;

      let itemDiv = document.createElement("div");
      itemDiv.className = "item";

      // チェックボックス
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = itemPurchased[i];

      let index = i;
      checkbox.addEventListener("click", function() {
        itemPurchased[index] = !itemPurchased[index];
        showItems();
      });

      // 商品名
      let name = document.createElement("span");
      name.textContent = itemNames[i];

      if (itemPurchased[i]) {
        name.classList.add("completed");
      }

      // 削除ボタン
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "削除";
      deleteButton.className = "delete-button";

      deleteButton.addEventListener("click", function() {
        itemIds.splice(index, 1);
        itemNames.splice(index, 1);
        itemPurchased.splice(index, 1);
        showItems();
      });

      itemDiv.appendChild(checkbox);
      itemDiv.appendChild(name);
      itemDiv.appendChild(deleteButton);
      itemList.appendChild(itemDiv);
    }
  }

  if (!hasItems) {
    let message = document.createElement("div");
    message.className = "empty-message";
    message.textContent = "商品がありません";
    itemList.appendChild(message);
  }

  updateFilterButtons();
}

// フィルタボタンの状態を更新
function updateFilterButtons() {
  allButton.classList.remove("active");
  unpurchasedButton.classList.remove("active");
  purchasedButton.classList.remove("active");

  if (filterMode === "all") {
    allButton.classList.add("active");
  } else if (filterMode === "unpurchased") {
    unpurchasedButton.classList.add("active");
  } else if (filterMode === "purchased") {
    purchasedButton.classList.add("active");
  }
}

// 初期表示
showItems();
