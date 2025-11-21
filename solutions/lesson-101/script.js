// 本のデータ
let books = [];

// HTML要素の取得
let titleInput = document.getElementById("titleInput");
let authorInput = document.getElementById("authorInput");
let addButton = document.getElementById("addButton");
let bookCount = document.getElementById("bookCount");
let bookList = document.getElementById("bookList");

// 追加ボタンのクリックイベント
addButton.addEventListener("click", function() {
  let title = titleInput.value.trim();
  let author = authorInput.value.trim();

  // バリデーション：空文字チェック
  if (title === "" || author === "") {
    alert("タイトルと著者名を入力してください");
    return;
  }

  // 本のオブジェクトを作成
  let book = {
    title: title,
    author: author
  };

  // 配列に追加
  books.push(book);

  // 画面を更新
  showBooks();

  // 入力欄をクリア
  titleInput.value = "";
  authorInput.value = "";

  // タイトル入力欄にフォーカス
  titleInput.focus();
});

// Enterキーで次の入力欄へ移動、または追加
titleInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    authorInput.focus();
  }
});

authorInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

// 本のリストを表示
function showBooks() {
  // リストをクリア
  bookList.replaceChildren();

  // 冊数を更新
  bookCount.textContent = books.length;

  // 本が空の場合
  if (books.length === 0) {
    let emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-message";
    emptyMessage.textContent = "まだ本が登録されていません";
    bookList.appendChild(emptyMessage);
    return;
  }

  // 各本を表示
  for (let book of books) {
    let item = document.createElement("div");
    item.className = "book-item";

    let titleElement = document.createElement("div");
    titleElement.className = "book-title";
    titleElement.textContent = book.title;

    let authorElement = document.createElement("div");
    authorElement.className = "book-author";
    authorElement.textContent = "著者: " + book.author;

    item.appendChild(titleElement);
    item.appendChild(authorElement);

    bookList.appendChild(item);
  }
}

// 初期表示
showBooks();

// ページ読み込み時にタイトル入力欄にフォーカス
titleInput.focus();
