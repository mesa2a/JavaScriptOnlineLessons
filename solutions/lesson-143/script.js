// 1. 図書館オブジェクト
let library = {
  name: "市立図書館",
  address: "東京都新宿区新宿1-1-1",
  openingHours: "9:00-20:00",
  totalBooks: 10000,
  totalMembers: 500
};

// 2. 本オブジェクトの配列
let books = [
  {
    isbn: "978-4-123456-78-9",
    title: "JavaScript入門",
    author: "山田太郎",
    publisher: "技術出版社",
    publishYear: 2023,
    isBorrowed: false,
    borrowedBy: null,
    dueDate: null
  },
  {
    isbn: "978-4-234567-89-0",
    title: "Webデザイン基礎",
    author: "佐藤花子",
    publisher: "デザイン出版",
    publishYear: 2022,
    isBorrowed: true,
    borrowedBy: "M001",
    dueDate: "2023-07-15"
  },
  {
    isbn: "978-4-345678-90-1",
    title: "データベース入門",
    author: "鈴木次郎",
    publisher: "IT出版社",
    publishYear: 2023,
    isBorrowed: false,
    borrowedBy: null,
    dueDate: null
  },
  {
    isbn: "978-4-456789-01-2",
    title: "ネットワーク技術",
    author: "田中三郎",
    publisher: "ネット出版",
    publishYear: 2021,
    isBorrowed: true,
    borrowedBy: "M001",
    dueDate: "2023-07-20"
  }
];

// 3. 会員オブジェクト
let member = {
  memberId: "M001",
  name: "田中花子",
  email: "hanako@example.com",
  registrationDate: "2023-01-15",
  borrowedBooks: ["978-4-234567-89-0", "978-4-456789-01-2"],

  borrowBook(isbn) {
    if (!this.borrowedBooks.includes(isbn)) {
      this.borrowedBooks.push(isbn);
    }
  },

  returnBook(isbn) {
    let index = this.borrowedBooks.indexOf(isbn);
    if (index !== -1) {
      this.borrowedBooks.splice(index, 1);
    }
  },

  getBorrowedCount() {
    return this.borrowedBooks.length;
  }
};

// 図書館情報を表示
let libraryInfo = document.getElementById("libraryInfo");
let html1 = "<h3>" + library.name + "</h3>";
html1 = html1 + '<div class="property"><strong>住所:</strong> ' + library.address + "</div>";
html1 = html1 + '<div class="property"><strong>開館時間:</strong> ' + library.openingHours + "</div>";
html1 = html1 + '<div class="property"><strong>蔵書数:</strong> ' + library.totalBooks + "冊</div>";
html1 = html1 + '<div class="property"><strong>会員数:</strong> ' + library.totalMembers + "名</div>";
libraryInfo.innerHTML = html1;

// 蔵書リストを表示
let booksList = document.getElementById("booksList");
let html2 = "";
for (let i = 0; i < books.length; i++) {
  html2 = html2 + '<div class="card">';
  html2 = html2 + "<h3>" + books[i].title;

  if (books[i].isBorrowed) {
    html2 = html2 + ' <span class="status-badge borrowed">貸出中</span>';
  } else {
    html2 = html2 + ' <span class="status-badge available">貸出可</span>';
  }

  html2 = html2 + "</h3>";
  html2 = html2 + '<div class="property"><strong>著者:</strong> ' + books[i].author + "</div>";
  html2 = html2 + '<div class="property"><strong>出版社:</strong> ' + books[i].publisher + "</div>";
  html2 = html2 + '<div class="property"><strong>出版年:</strong> ' + books[i].publishYear + "</div>";
  html2 = html2 + '<div class="property"><strong>ISBN:</strong> ' + books[i].isbn + "</div>";

  if (books[i].isBorrowed) {
    html2 = html2 + '<div class="property"><strong>返却期限:</strong> ' + books[i].dueDate + "</div>";
  }

  html2 = html2 + "</div>";
}
booksList.innerHTML = html2;

// 会員情報を表示
let memberInfo = document.getElementById("memberInfo");
let html3 = "<h3>" + member.name + "</h3>";
html3 = html3 + '<div class="property"><strong>会員ID:</strong> ' + member.memberId + "</div>";
html3 = html3 + '<div class="property"><strong>メール:</strong> ' + member.email + "</div>";
html3 = html3 + '<div class="property"><strong>登録日:</strong> ' + member.registrationDate + "</div>";
html3 = html3 + '<div class="property"><strong>借りている本:</strong> ' + member.getBorrowedCount() + "冊</div>";

if (member.borrowedBooks.length > 0) {
  html3 = html3 + '<div style="margin-top: 15px;"><strong>借りている本のリスト:</strong></div>';
  for (let i = 0; i < member.borrowedBooks.length; i++) {
    let isbn = member.borrowedBooks[i];
    // ISBNから本のタイトルを探す
    for (let j = 0; j < books.length; j++) {
      if (books[j].isbn === isbn) {
        html3 = html3 + '<div class="book-item">';
        html3 = html3 + books[j].title + " (返却期限: " + books[j].dueDate + ")";
        html3 = html3 + "</div>";
        break;
      }
    }
  }
}

memberInfo.innerHTML = html3;
