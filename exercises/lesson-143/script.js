// 1. 図書館オブジェクトを作成してください
let library = {
  // ここにプロパティを追加
  // name: "市立図書館",
  // address: "東京都新宿区...",
  // openingHours: "9:00-20:00",
  // totalBooks: 10000,
  // totalMembers: 500
};

// 2. 本オブジェクトの配列を作成してください
let books = [
  // 例:
  // {
  //   isbn: "978-4-123456-78-9",
  //   title: "JavaScript入門",
  //   author: "山田太郎",
  //   publisher: "技術出版社",
  //   publishYear: 2023,
  //   isBorrowed: false,
  //   borrowedBy: null,
  //   dueDate: null
  // }
];

// 3. 会員オブジェクトを作成してください
let member = {
  // memberId: "M001",
  // name: "田中花子",
  // email: "hanako@example.com",
  // registrationDate: "2023-01-15",
  // borrowedBooks: [],  // 借りている本のISBNリスト

  // 本を借りるメソッド
  borrowBook(isbn) {
    // ヒント: borrowedBooks配列にisbnを追加
  },

  // 本を返すメソッド
  returnBook(isbn) {
    // ヒント: borrowedBooks配列からisbnを削除
  },

  // 借りている本の数を返すメソッド
  getBorrowedCount() {
    // ヒント: borrowedBooks.length を返す
  }
};

// 図書館情報を表示
let libraryInfo = document.getElementById("libraryInfo");
// ヒント: library オブジェクトのプロパティをHTMLで表示


// 蔵書リストを表示
let booksList = document.getElementById("booksList");
// ヒント: books 配列をforループで処理
// 各本を .card クラスのdivで表示
// 貸出状態に応じて .available または .borrowed バッジを表示


// 会員情報を表示
let memberInfo = document.getElementById("memberInfo");
// ヒント: member オブジェクトのプロパティを表示
// borrowedBooks の内容も表示
