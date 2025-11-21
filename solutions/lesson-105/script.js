// 並列配列でデータを管理
let bookIds = [];
let bookTitles = [];
let bookCompleted = [];
let nextId = 1;

let bookInput = document.getElementById("bookInput");
let addButton = document.getElementById("addButton");
let bookList = document.getElementById("bookList");

// 本を追加
addButton.addEventListener("click", function() {
  addBook();
});

// Enterキーで追加
bookInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addBook();
  }
});

// 本を追加
function addBook() {
  let title = bookInput.value.trim();

  if (title === "") {
    alert("本のタイトルを入力してください");
    return;
  }

  // 3つの配列すべてに追加
  bookIds.push(nextId);
  bookTitles.push(title);
  bookCompleted.push(false);  // 最初は未読

  nextId++;
  bookInput.value = "";
  bookInput.focus();
  showBooks();
}

// 本を表示
function showBooks() {
  bookList.replaceChildren();

  if (bookTitles.length === 0) {
    let message = document.createElement("div");
    message.className = "empty-message";
    message.textContent = "まだ本が登録されていません";
    bookList.appendChild(message);
    return;
  }

  for (let i = 0; i < bookTitles.length; i++) {
    let item = document.createElement("div");
    item.className = "book-item";

    // チェックボックス
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = bookCompleted[i];

    // インデックスを保存
    let index = i;

    // 読了状態を切り替える
    checkbox.addEventListener("click", function() {
      bookCompleted[index] = !bookCompleted[index];
      showBooks();
    });

    // タイトル
    let title = document.createElement("span");
    title.textContent = bookTitles[i];

    // 読了済みの場合、クラスを追加
    if (bookCompleted[i]) {
      title.classList.add("completed");
    }

    // 削除ボタン
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function() {
      // 3つの配列すべてから削除
      bookIds.splice(index, 1);
      bookTitles.splice(index, 1);
      bookCompleted.splice(index, 1);
      showBooks();
    });

    item.appendChild(checkbox);
    item.appendChild(title);
    item.appendChild(deleteButton);
    bookList.appendChild(item);
  }
}
