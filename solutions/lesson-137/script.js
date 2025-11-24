let library = {
  name: "市立図書館",
  location: {
    city: "東京",
    address: "新宿1-1-1"
  },
  books: [
    { title: "JavaScript入門", author: "山田太郎", available: true },
    { title: "Web デザイン", author: "佐藤花子", available: false },
    { title: "データベース基礎", author: "田中次郎", available: true }
  ]
};

// 1. 図書館の名前を表示
let libraryName = document.getElementById("libraryName");
libraryName.textContent = library.name;

// 2. 図書館の住所を表示（city + address）
let libraryAddress = document.getElementById("libraryAddress");
libraryAddress.textContent = library.location.city + library.location.address;

// 3. 利用可能な本の数を数える
let availableCount = document.getElementById("availableCount");
let count = 0;
for (let i = 0; i < library.books.length; i++) {
  if (library.books[i].available === true) {
    count++;
  }
}
availableCount.textContent = count;

// 4. 最初の本の情報を表示
let firstBook = document.getElementById("firstBook");
firstBook.textContent = library.books[0].title + " - " + library.books[0].author;
