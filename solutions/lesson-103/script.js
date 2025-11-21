let bookmarks = [];

let titleInput = document.getElementById("titleInput");
let urlInput = document.getElementById("urlInput");
let addButton = document.getElementById("addButton");
let bookmarkList = document.getElementById("bookmarkList");
let clearAllButton = document.getElementById("clearAll");

// ブックマークを追加
addButton.addEventListener("click", function() {
  let title = titleInput.value.trim();
  let url = urlInput.value.trim();

  if (title === "" || url === "") {
    alert("タイトルとURLを入力してください");
    return;
  }

  let bookmark = {
    title: title,
    url: url
  };

  bookmarks.push(bookmark);
  showBookmarks();

  titleInput.value = "";
  urlInput.value = "";
  titleInput.focus();
});

// Enterキーで次の入力欄へ
titleInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    urlInput.focus();
  }
});

urlInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

// すべて削除
clearAllButton.addEventListener("click", function() {
  if (bookmarks.length === 0) {
    alert("削除するブックマークがありません");
    return;
  }

  let confirmed = confirm("すべてのブックマークを削除しますか？");

  if (confirmed) {
    bookmarks = [];
    showBookmarks();
  }
});

// ブックマークを表示
function showBookmarks() {
  bookmarkList.replaceChildren();

  if (bookmarks.length === 0) {
    let empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "まだブックマークがありません";
    bookmarkList.appendChild(empty);
    return;
  }

  for (let i = 0; i < bookmarks.length; i++) {
    let bookmark = bookmarks[i];

    let item = document.createElement("div");
    item.className = "bookmark-item";

    let info = document.createElement("div");
    info.className = "bookmark-info";

    let title = document.createElement("div");
    title.className = "bookmark-title";
    title.textContent = bookmark.title;

    let url = document.createElement("div");
    url.className = "bookmark-url";
    url.textContent = bookmark.url;

    info.appendChild(title);
    info.appendChild(url);

    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function() {
      let confirmed = confirm("「" + bookmark.title + "」を削除しますか？");

      if (confirmed) {
        bookmarks.splice(i, 1);
        showBookmarks();
      }
    });

    item.appendChild(info);
    item.appendChild(deleteButton);

    bookmarkList.appendChild(item);
  }
}

// 初期表示
showBookmarks();
titleInput.focus();
