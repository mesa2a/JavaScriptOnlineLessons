# レッスン143：データモデリング

## 学習目標
- 現実世界のものをオブジェクトでモデル化する方法を学ぶ
- 適切なプロパティの設計方法を理解する
- オブジェクト間の関係性を表現する方法を習得する

## データモデリングとは

**データモデリング**とは、現実世界の情報をプログラムで扱えるデータ構造に変換することです。オブジェクトを使って、人、物、場所などを表現します。

### 基本的な考え方

現実世界のものには**属性（特徴）**と**動作（行動）**があります：

- **属性** → オブジェクトのプロパティ
- **動作** → オブジェクトのメソッド

## 簡単な例：本のモデル化

本を考えてみましょう。本には何があるでしょうか？

```javascript
let book = {
  // 属性（プロパティ）
  title: "JavaScript入門",
  author: "山田太郎",
  pages: 350,
  isbn: "978-4-123456-78-9",
  publishYear: 2023,
  publisher: "技術出版社",
  price: 2800,
  inStock: true,

  // 動作（メソッド）
  getInfo() {
    return this.title + " by " + this.author;
  },

  isAffordable(budget) {
    return this.price <= budget;
  }
};
```

## プロパティの設計

### 適切なプロパティ名を選ぶ

```javascript
// 良い例：明確で分かりやすい
let person = {
  firstName: "太郎",
  lastName: "山田",
  age: 28,
  email: "taro@example.com"
};

// 悪い例：省略しすぎや曖昧
let person = {
  fn: "太郎",      // firstNameの方が分かりやすい
  ln: "山田",
  a: 28,           // ageと書くべき
  contact: "..."   // emailなのか電話番号なのか不明
};
```

### データ型を適切に選ぶ

```javascript
let product = {
  id: 101,              // 数値
  name: "ノート",       // 文字列
  price: 200,           // 数値
  available: true,      // 真偽値
  tags: ["文具", "紙"], // 配列
  supplier: {           // オブジェクト
    name: "文具商事",
    contact: "..."
  }
};
```

## 学生管理システムのモデル化

学生管理システムを例に、データモデリングを実践してみましょう。

### 学生オブジェクト

```javascript
let student = {
  studentId: "S2023001",
  name: "田中花子",
  age: 18,
  grade: 1,
  email: "hanako@school.ac.jp",
  enrollmentDate: "2023-04-01",

  courses: [
    "数学I",
    "英語I",
    "物理学",
    "プログラミング基礎"
  ],

  scores: {
    math: 85,
    english: 92,
    physics: 78,
    programming: 95
  },

  getAverageScore() {
    let scores = Object.values(this.scores);
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
      sum = sum + scores[i];
    }
    return sum / scores.length;
  },

  getGrade() {
    let average = this.getAverageScore();
    if (average >= 90) return "A";
    if (average >= 80) return "B";
    if (average >= 70) return "C";
    if (average >= 60) return "D";
    return "F";
  }
};

console.log(student.getAverageScore());  // 87.5
console.log(student.getGrade());         // "B"
```

## ECサイトのモデル化

### 商品オブジェクト

```javascript
let product = {
  productId: "P001",
  name: "ワイヤレスマウス",
  category: "PC周辺機器",
  brand: "TechCorp",
  price: 2500,
  stock: 15,
  description: "高精度な無線マウス",
  images: [
    "mouse-front.jpg",
    "mouse-side.jpg"
  ],
  specifications: {
    color: "黒",
    weight: "85g",
    battery: "単三電池×2"
  },

  isInStock() {
    return this.stock > 0;
  },

  canPurchase(quantity) {
    return this.stock >= quantity;
  },

  getTotalPrice(quantity) {
    return this.price * quantity;
  }
};
```

### 注文オブジェクト

```javascript
let order = {
  orderId: "ORD20230101-001",
  customerId: "C123",
  customerName: "佐藤一郎",
  orderDate: "2023-01-01",
  status: "配送中",

  items: [
    {
      productId: "P001",
      productName: "ワイヤレスマウス",
      quantity: 2,
      price: 2500
    },
    {
      productId: "P002",
      productName: "キーボード",
      quantity: 1,
      price: 5000
    }
  ],

  shippingAddress: {
    postalCode: "100-0001",
    prefecture: "東京都",
    city: "千代田区",
    address: "千代田1-1-1"
  },

  getTotalAmount() {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total = total + (this.items[i].price * this.items[i].quantity);
    }
    return total;
  },

  getItemCount() {
    let count = 0;
    for (let i = 0; i < this.items.length; i++) {
      count = count + this.items[i].quantity;
    }
    return count;
  }
};

console.log(order.getTotalAmount());  // 10000
console.log(order.getItemCount());    // 3
```

## オブジェクト間の関係性

### IDによる参照

オブジェクト同士の関係は、IDを使って表現できます：

```javascript
// ユーザー
let user = {
  userId: "U001",
  name: "山田太郎",
  favoriteBookIds: ["B001", "B003", "B005"]
};

// 本のリスト
let books = [
  { bookId: "B001", title: "JavaScript入門", author: "田中" },
  { bookId: "B002", title: "Python基礎", author: "佐藤" },
  { bookId: "B003", title: "Web開発", author: "鈴木" },
  { bookId: "B004", title: "データベース", author: "高橋" },
  { bookId: "B005", title: "ネットワーク", author: "伊藤" }
];

// ユーザーのお気に入りの本を取得
function getFavoriteBooks(user, books) {
  let favorites = [];
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < user.favoriteBookIds.length; j++) {
      if (books[i].bookId === user.favoriteBookIds[j]) {
        favorites.push(books[i]);
      }
    }
  }
  return favorites;
}

let userFavorites = getFavoriteBooks(user, books);
console.log(userFavorites);
// [
//   { bookId: "B001", title: "JavaScript入門", author: "田中" },
//   { bookId: "B003", title: "Web開発", author: "鈴木" },
//   { bookId: "B005", title: "ネットワーク", author: "伊藤" }
// ]
```

## ブログシステムのモデル化

### 投稿オブジェクト

```javascript
let post = {
  postId: "POST001",
  title: "JavaScriptの基礎",
  content: "JavaScriptは...",
  authorId: "U001",
  authorName: "山田太郎",
  publishDate: "2023-06-01",
  category: "プログラミング",
  tags: ["JavaScript", "初心者", "入門"],
  views: 1250,
  likes: 45,

  comments: [
    {
      commentId: "C001",
      userId: "U002",
      userName: "佐藤花子",
      content: "とても分かりやすかったです！",
      date: "2023-06-02"
    },
    {
      commentId: "C002",
      userId: "U003",
      userName: "鈴木次郎",
      content: "参考になりました",
      date: "2023-06-03"
    }
  ],

  getCommentCount() {
    return this.comments.length;
  },

  addComment(userId, userName, content) {
    let newComment = {
      commentId: "C" + (this.comments.length + 1).toString().padStart(3, "0"),
      userId: userId,
      userName: userName,
      content: content,
      date: new Date().toISOString().split("T")[0]
    };
    this.comments.push(newComment);
  }
};
```

## データモデリングのベストプラクティス

### 1. 明確な命名

```javascript
// 良い例
let userProfile = {
  userId: "U001",
  displayName: "山田太郎",
  registrationDate: "2023-01-01"
};

// 悪い例
let data = {
  id: "U001",
  name: "山田太郎",
  date: "2023-01-01"  // 何の日付か不明
};
```

### 2. 一貫性のある構造

```javascript
// 良い例：同じ種類のデータは同じ構造
let products = [
  { id: 1, name: "商品A", price: 1000 },
  { id: 2, name: "商品B", price: 2000 },
  { id: 3, name: "商品C", price: 1500 }
];

// 悪い例：構造がバラバラ
let products = [
  { id: 1, name: "商品A", price: 1000 },
  { productId: 2, title: "商品B", cost: 2000 },  // プロパティ名が違う
  { id: 3, name: "商品C", price: "1500円" }      // 型が違う
];
```

### 3. 適切な粒度

```javascript
// 良い例：住所を構造化
let user = {
  name: "田中",
  address: {
    postalCode: "100-0001",
    prefecture: "東京都",
    city: "千代田区",
    street: "千代田1-1-1"
  }
};

// 悪い例：全て文字列で管理
let user = {
  name: "田中",
  fullAddress: "100-0001 東京都千代田区千代田1-1-1"
};
```

## まとめ

データモデリングは、プログラミングの重要なスキルです：

1. **現実をモデル化**: 属性はプロパティ、動作はメソッド
2. **適切な設計**: 明確な命名、適切なデータ型
3. **関係性の表現**: IDによる参照、ネストされた構造
4. **一貫性**: 同じ種類のデータは同じ構造
5. **拡張性**: 将来の変更を考慮した設計

次のレッスンでは、オブジェクトの週のプロジェクトに挑戦します。

## 練習問題

図書館システムのデータモデルを設計してください：

以下の要件を満たすオブジェクトを作成してください：

1. **図書館オブジェクト**
   - 図書館名、住所、開館時間
   - 蔵書数、会員数

2. **本オブジェクト**
   - ISBN、タイトル、著者、出版社、出版年
   - 貸出状態、返却期限

3. **会員オブジェクト**
   - 会員ID、名前、メールアドレス、登録日
   - 借りている本のリスト

4. メソッドを追加：
   - 本を借りるメソッド
   - 本を返すメソッド
   - 延滞しているかチェックするメソッド
