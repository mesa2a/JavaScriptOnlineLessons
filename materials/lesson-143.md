# レッスン143：データモデリング

**日付**: 2025-11-26

## 学習目標
このレッスンでは、現実世界の情報をプログラムで扱えるデータ構造に変換する「データモデリング」について学びます。適切なデータ設計の方法を習得します。

---

## データモデリングとは？

### 日常生活の例：「設計図を描く」

データモデリングを理解するために、家の設計図を考えてみましょう：

```
現実の家:
┌─────────────────────────┐
│  実際の家               │
│  ・部屋がある           │
│  ・ドアがある           │ ← そのままではプログラムで扱えない
│  ・窓がある             │
│  ・色や大きさがある     │
└─────────────────────────┘
        ↓
    設計図を描く（モデル化）
        ↓
設計図（データモデル）:
┌─────────────────────────┐
│ let house = {           │
│   rooms: 3,             │
│   doors: 5,             │ ← プログラムで扱える
│   windows: 8,           │
│   color: "白",          │
│   size: "120平米"       │
│ }                       │
└─────────────────────────┘
```

**データモデリングの役割:**
- 現実世界 → データ構造（オブジェクト）に変換
- **属性（特徴）** → プロパティ
- **動作（行動）** → メソッド

---

## 1. 現実をモデル化する

### 現実世界の「もの」を分析する

現実世界のものには**属性（特徴）**と**動作（行動）**があります：

```
例：本
┌─────────────────────────┐
│ 属性（プロパティ）      │
│ ・タイトル              │
│ ・著者                  │
│ ・ページ数              │
│ ・価格                  │
│ ・ISBN                  │
└─────────────────────────┘

┌─────────────────────────┐
│ 動作（メソッド）        │
│ ・情報を表示する        │
│ ・予算内か判定する      │
│ ・貸出可能か確認する    │
└─────────────────────────┘
```

### 本をモデル化する

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
  },

  getDetails() {
    return `${this.title}（${this.author}著）\n` +
           `出版社: ${this.publisher}\n` +
           `価格: ¥${this.price}`;
  }
};

console.log(book.getInfo());           // "JavaScript入門 by 山田太郎"
console.log(book.isAffordable(3000));  // true
console.log(book.isAffordable(2000));  // false
```

**モデル化のプロセス:**

```
ステップ1: 現実の本を観察
- タイトルは何？ → "JavaScript入門"
- 著者は誰？ → "山田太郎"
- 価格は？ → 2800円

ステップ2: プロパティに変換
title: "JavaScript入門"
author: "山田太郎"
price: 2800

ステップ3: 動作を考える
- 本の情報を表示できる → getInfo()
- 予算内か判定できる → isAffordable(budget)

ステップ4: オブジェクトとして実装
let book = { title: "...", author: "...", getInfo() {...} }
```

---

## 2. プロパティの設計

### 適切なプロパティ名を選ぶ

プロパティ名は、**明確で分かりやすく**する必要があります：

```javascript
// ✅ 良い例：明確で分かりやすい
let person = {
  firstName: "太郎",
  lastName: "山田",
  age: 28,
  email: "taro@example.com",
  phoneNumber: "090-1234-5678"
};

// ❌ 悪い例：省略しすぎや曖昧
let person = {
  fn: "太郎",           // firstNameの方が分かりやすい
  ln: "山田",           // lastNameの方が分かりやすい
  a: 28,                // ageと書くべき
  contact: "..."        // emailなのか電話番号なのか不明
};
```

**プロパティ名の原則:**

```
1. 省略しすぎない:
   ❌ fn → ✅ firstName
   ❌ pwd → ✅ password

2. 具体的に書く:
   ❌ data → ✅ userData
   ❌ info → ✅ productInfo

3. 一貫性を保つ:
   ✅ firstName, lastName（統一）
   ❌ firstName, family_name（バラバラ）
```

### データ型を適切に選ぶ

各プロパティに適したデータ型を選びます：

```javascript
let product = {
  // 数値型
  id: 101,
  price: 200,
  stock: 50,
  rating: 4.5,

  // 文字列型
  name: "ノート",
  description: "A4サイズのノート",
  sku: "NOTE-A4-001",

  // 真偽値型
  available: true,
  featured: false,

  // 配列型
  tags: ["文具", "紙", "オフィス"],
  images: ["note1.jpg", "note2.jpg"],

  // オブジェクト型
  supplier: {
    name: "文具商事",
    contact: "info@bungu.com"
  },

  // 日付（文字列で保存）
  createdAt: "2023-06-01",
  updatedAt: "2023-06-15"
};
```

**データ型の選択基準:**

```
数値を使うべき場合:
✅ 価格: 2800
✅ 在庫数: 50
❌ "2800円" ← 計算できない！

真偽値を使うべき場合:
✅ available: true
❌ available: "yes" ← 判定が複雑になる！

配列を使うべき場合:
✅ tags: ["文具", "紙"]
❌ tag1: "文具", tag2: "紙" ← 拡張しにくい！
```

---

## 3. 関係性の表現

### ネストされたオブジェクトで関係を表現

オブジェクトの中にオブジェクトを入れて、関係性を表現できます：

```javascript
let student = {
  studentId: "S2023001",
  name: "田中花子",
  age: 18,
  grade: 1,
  email: "hanako@school.ac.jp",

  // 住所オブジェクト
  address: {
    postalCode: "100-0001",
    prefecture: "東京都",
    city: "千代田区",
    street: "千代田1-1-1"
  },

  // 科目と成績のオブジェクト
  scores: {
    math: 85,
    english: 92,
    physics: 78,
    programming: 95
  },

  // 受講科目の配列
  courses: [
    "数学I",
    "英語I",
    "物理学",
    "プログラミング基礎"
  ],

  // メソッド
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
console.log(student.address.city);       // "千代田区"
```

**構造の図解:**

```
student
├── studentId: "S2023001"
├── name: "田中花子"
├── age: 18
├── address (オブジェクト)
│   ├── postalCode: "100-0001"
│   ├── prefecture: "東京都"
│   └── city: "千代田区"
├── scores (オブジェクト)
│   ├── math: 85
│   ├── english: 92
│   └── physics: 78
├── courses (配列)
│   ├── [0] "数学I"
│   ├── [1] "英語I"
│   └── [2] "物理学"
└── メソッド
    ├── getAverageScore()
    └── getGrade()
```

### IDによる参照で関係を表現

複数のオブジェクト間の関係は、IDを使って表現できます：

```javascript
// ユーザーオブジェクト
let user = {
  userId: "U001",
  name: "山田太郎",
  favoriteBookIds: ["B001", "B003", "B005"]  // 本のIDで参照
};

// 本のリスト
let books = [
  { bookId: "B001", title: "JavaScript入門", author: "田中" },
  { bookId: "B002", title: "Python基礎", author: "佐藤" },
  { bookId: "B003", title: "Web開発", author: "鈴木" },
  { bookId: "B004", title: "データベース", author: "高橋" },
  { bookId: "B005", title: "ネットワーク", author: "伊藤" }
];

// ユーザーのお気に入りの本を取得する関数
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

**IDによる参照の仕組み:**

```
user
├── userId: "U001"
├── name: "山田太郎"
└── favoriteBookIds: ["B001", "B003", "B005"]
                        ↓       ↓       ↓
                     参照を辿る
                        ↓       ↓       ↓
books
├── { bookId: "B001", title: "JavaScript入門" } ← 一致！
├── { bookId: "B002", title: "Python基礎" }
├── { bookId: "B003", title: "Web開発" }        ← 一致！
├── { bookId: "B004", title: "データベース" }
└── { bookId: "B005", title: "ネットワーク" }   ← 一致！
```

---

## 実践的なデータモデリング

### 例1: ECサイトの注文システム

```javascript
// 商品オブジェクト
let product = {
  productId: "P001",
  name: "ワイヤレスマウス",
  category: "PC周辺機器",
  brand: "TechCorp",
  price: 2500,
  stock: 15,
  description: "高精度な無線マウス",
  images: ["mouse-front.jpg", "mouse-side.jpg"],

  specifications: {
    color: "黒",
    weight: "85g",
    battery: "単三電池×2",
    connectivity: "2.4GHz無線"
  },

  // メソッド
  isInStock() {
    return this.stock > 0;
  },

  canPurchase(quantity) {
    return this.stock >= quantity;
  },

  getTotalPrice(quantity) {
    return this.price * quantity;
  },

  reduceStock(quantity) {
    if (this.canPurchase(quantity)) {
      this.stock = this.stock - quantity;
      return true;
    }
    return false;
  }
};

// 注文オブジェクト
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
      unitPrice: 2500
    },
    {
      productId: "P002",
      productName: "キーボード",
      quantity: 1,
      unitPrice: 5000
    }
  ],

  shippingAddress: {
    postalCode: "100-0001",
    prefecture: "東京都",
    city: "千代田区",
    address: "千代田1-1-1",
    building: "技術ビル3F"
  },

  // メソッド
  getTotalAmount() {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total = total + (this.items[i].unitPrice * this.items[i].quantity);
    }
    return total;
  },

  getItemCount() {
    let count = 0;
    for (let i = 0; i < this.items.length; i++) {
      count = count + this.items[i].quantity;
    }
    return count;
  },

  getFormattedAddress() {
    let addr = this.shippingAddress;
    return `〒${addr.postalCode} ${addr.prefecture}${addr.city}${addr.address} ${addr.building}`;
  }
};

console.log(order.getTotalAmount());        // 10000
console.log(order.getItemCount());          // 3
console.log(order.getFormattedAddress());   // "〒100-0001 東京都千代田区千代田1-1-1 技術ビル3F"
```

### 例2: ブログシステム

```javascript
let post = {
  postId: "POST001",
  title: "JavaScriptの基礎",
  content: "JavaScriptは、Webページに動きをつけるプログラミング言語です...",
  authorId: "U001",
  authorName: "山田太郎",
  publishDate: "2023-06-01",
  lastModified: "2023-06-05",
  category: "プログラミング",
  tags: ["JavaScript", "初心者", "入門"],
  views: 1250,
  likes: 45,
  status: "published",  // draft, published, archived

  comments: [
    {
      commentId: "C001",
      userId: "U002",
      userName: "佐藤花子",
      content: "とても分かりやすかったです！",
      date: "2023-06-02",
      likes: 5
    },
    {
      commentId: "C002",
      userId: "U003",
      userName: "鈴木次郎",
      content: "参考になりました",
      date: "2023-06-03",
      likes: 3
    }
  ],

  // メソッド
  getCommentCount() {
    return this.comments.length;
  },

  addComment(userId, userName, content) {
    let commentNumber = this.comments.length + 1;
    let paddedNumber = commentNumber.toString().padStart(3, "0");

    let newComment = {
      commentId: "C" + paddedNumber,
      userId: userId,
      userName: userName,
      content: content,
      date: new Date().toISOString().split("T")[0],
      likes: 0
    };

    this.comments.push(newComment);
  },

  getSummary() {
    return {
      title: this.title,
      author: this.authorName,
      date: this.publishDate,
      views: this.views,
      likes: this.likes,
      comments: this.getCommentCount()
    };
  }
};

console.log(post.getSummary());
// {
//   title: "JavaScriptの基礎",
//   author: "山田太郎",
//   date: "2023-06-01",
//   views: 1250,
//   likes: 45,
//   comments: 2
// }
```

---

## データモデリングのベストプラクティス

### 1. 明確な命名規則

```javascript
// ✅ 良い例：プロパティ名から内容が分かる
let userProfile = {
  userId: "U001",
  displayName: "山田太郎",
  emailAddress: "taro@example.com",
  registrationDate: "2023-01-01",
  lastLoginDate: "2023-06-01",
  isEmailVerified: true,
  isPremiumMember: false
};

// ❌ 悪い例：プロパティ名が曖昧
let data = {
  id: "U001",
  name: "山田太郎",
  email: "taro@example.com",
  date: "2023-01-01",      // 何の日付？
  date2: "2023-06-01",     // これは？
  verified: true,          // 何が検証された？
  premium: false
};
```

### 2. 一貫性のある構造

同じ種類のデータは同じ構造にします：

```javascript
// ✅ 良い例：構造が統一されている
let products = [
  { id: 1, name: "商品A", price: 1000, stock: 10 },
  { id: 2, name: "商品B", price: 2000, stock: 5 },
  { id: 3, name: "商品C", price: 1500, stock: 8 }
];

// ❌ 悪い例：構造がバラバラ
let products = [
  { id: 1, name: "商品A", price: 1000, stock: 10 },
  { productId: 2, title: "商品B", cost: 2000, quantity: 5 },  // プロパティ名が違う
  { id: 3, name: "商品C", price: "1500円", stock: 8 }        // 型が違う
];
```

### 3. 適切な粒度（細かさ）

データを適切に構造化します：

```javascript
// ✅ 良い例：住所を構造化
let user = {
  name: "田中",
  address: {
    postalCode: "100-0001",
    prefecture: "東京都",
    city: "千代田区",
    street: "千代田1-1-1",
    building: "技術ビル"
  }
};
// 利点：prefecture だけ取り出せる、検索しやすい

// ❌ 悪い例：全て1つの文字列
let user = {
  name: "田中",
  fullAddress: "100-0001 東京都千代田区千代田1-1-1 技術ビル"
};
// 問題：都道府県だけ取り出すのが困難
```

### 4. デフォルト値の設計

```javascript
// ✅ 良い例：明確なデフォルト値
function createUser(name, email) {
  return {
    userId: generateId(),
    name: name,
    email: email,
    role: "user",           // デフォルトは一般ユーザー
    isActive: true,         // デフォルトは有効
    createdAt: new Date().toISOString(),
    loginCount: 0,          // 初期値は0
    preferences: {          // デフォルト設定
      theme: "light",
      language: "ja",
      notifications: true
    }
  };
}

function generateId() {
  return "U" + Date.now();
}

let newUser = createUser("田中太郎", "tanaka@example.com");
console.log(newUser);
```

---

## 実践アプリケーション

### アプリ1: 学生管理システム

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>学生管理システム</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1000px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
    }
    .student-form {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 10px;
      margin-bottom: 30px;
    }
    .form-group {
      margin: 15px 0;
    }
    label {
      display: block;
      font-weight: bold;
      color: #555;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 14px;
      box-sizing: border-box;
    }
    button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      margin: 10px 5px;
      transition: transform 0.2s;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    .student-list {
      margin-top: 30px;
    }
    .student-card {
      background: white;
      border: 2px solid #e9ecef;
      padding: 20px;
      margin: 15px 0;
      border-radius: 10px;
      transition: all 0.3s;
    }
    .student-card:hover {
      border-color: #667eea;
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
    }
    .student-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 2px solid #e9ecef;
    }
    .student-name {
      font-size: 20px;
      font-weight: bold;
      color: #667eea;
    }
    .student-id {
      color: #999;
      font-size: 14px;
    }
    .student-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 15px;
    }
    .info-item {
      background: #f8f9fa;
      padding: 10px;
      border-radius: 5px;
    }
    .info-label {
      font-size: 12px;
      color: #666;
      margin-bottom: 5px;
    }
    .info-value {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
    .scores-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-top: 15px;
    }
    .score-item {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 10px;
      border-radius: 5px;
      text-align: center;
    }
    .score-label {
      font-size: 12px;
      opacity: 0.9;
    }
    .score-value {
      font-size: 24px;
      font-weight: bold;
    }
    .grade-badge {
      display: inline-block;
      padding: 5px 15px;
      border-radius: 15px;
      font-weight: bold;
      font-size: 18px;
    }
    .grade-A { background: #28a745; color: white; }
    .grade-B { background: #17a2b8; color: white; }
    .grade-C { background: #ffc107; color: #333; }
    .grade-D { background: #fd7e14; color: white; }
    .grade-F { background: #dc3545; color: white; }
    h3 {
      color: #667eea;
      margin-top: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎓 学生管理システム</h1>

    <div class="student-form">
      <h3>新しい学生を登録</h3>
      <div class="form-group">
        <label>学生名:</label>
        <input type="text" id="studentName" placeholder="例: 田中花子">
      </div>
      <div class="form-group">
        <label>年齢:</label>
        <input type="number" id="studentAge" min="15" max="25" value="18">
      </div>
      <div class="form-group">
        <label>学年:</label>
        <input type="number" id="studentGrade" min="1" max="4" value="1">
      </div>
      <div class="form-group">
        <label>メールアドレス:</label>
        <input type="email" id="studentEmail" placeholder="例: hanako@school.ac.jp">
      </div>

      <h4>成績入力:</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div class="form-group">
          <label>数学:</label>
          <input type="number" id="scoreMath" min="0" max="100" value="0">
        </div>
        <div class="form-group">
          <label>英語:</label>
          <input type="number" id="scoreEnglish" min="0" max="100" value="0">
        </div>
        <div class="form-group">
          <label>物理:</label>
          <input type="number" id="scorePhysics" min="0" max="100" value="0">
        </div>
        <div class="form-group">
          <label>プログラミング:</label>
          <input type="number" id="scoreProgramming" min="0" max="100" value="0">
        </div>
      </div>

      <button onclick="addStudent()">学生を登録</button>
    </div>

    <div class="student-list">
      <h3>登録済み学生一覧</h3>
      <div id="studentsList"></div>
    </div>
  </div>

  <script>
    let students = [];
    let studentIdCounter = 1;

    // 学生を追加
    function addStudent() {
      let name = document.getElementById('studentName').value.trim();
      let age = parseInt(document.getElementById('studentAge').value);
      let grade = parseInt(document.getElementById('studentGrade').value);
      let email = document.getElementById('studentEmail').value.trim();

      if (!name || !email) {
        alert('学生名とメールアドレスは必須です');
        return;
      }

      // 学生オブジェクトを作成（データモデリング）
      let student = {
        studentId: "S" + studentIdCounter.toString().padStart(4, "0"),
        name: name,
        age: age,
        grade: grade,
        email: email,
        enrollmentDate: new Date().toISOString().split('T')[0],

        scores: {
          math: parseInt(document.getElementById('scoreMath').value),
          english: parseInt(document.getElementById('scoreEnglish').value),
          physics: parseInt(document.getElementById('scorePhysics').value),
          programming: parseInt(document.getElementById('scoreProgramming').value)
        },

        // メソッド: 平均点を計算
        getAverageScore() {
          let scores = Object.values(this.scores);
          let sum = 0;
          for (let i = 0; i < scores.length; i++) {
            sum = sum + scores[i];
          }
          return sum / scores.length;
        },

        // メソッド: 評価を取得
        getGrade() {
          let average = this.getAverageScore();
          if (average >= 90) return "A";
          if (average >= 80) return "B";
          if (average >= 70) return "C";
          if (average >= 60) return "D";
          return "F";
        },

        // メソッド: 詳細情報を取得
        getDetails() {
          return `${this.name}（${this.studentId}）\n` +
                 `学年: ${this.grade}年 / 年齢: ${this.age}歳\n` +
                 `平均点: ${this.getAverageScore().toFixed(1)}点 / 評価: ${this.getGrade()}`;
        }
      };

      students.push(student);
      studentIdCounter++;

      // フォームをクリア
      document.getElementById('studentName').value = '';
      document.getElementById('studentEmail').value = '';
      document.getElementById('scoreMath').value = '0';
      document.getElementById('scoreEnglish').value = '0';
      document.getElementById('scorePhysics').value = '0';
      document.getElementById('scoreProgramming').value = '0';

      renderStudents();
    }

    // 学生リストを表示
    function renderStudents() {
      let html = '';

      if (students.length === 0) {
        html = '<p style="text-align: center; color: #999;">登録された学生がいません</p>';
      } else {
        students.forEach(student => {
          let average = student.getAverageScore();
          let grade = student.getGrade();

          html += `
            <div class="student-card">
              <div class="student-header">
                <div>
                  <div class="student-name">${student.name}</div>
                  <div class="student-id">ID: ${student.studentId}</div>
                </div>
                <span class="grade-badge grade-${grade}">評価: ${grade}</span>
              </div>

              <div class="student-info">
                <div class="info-item">
                  <div class="info-label">学年</div>
                  <div class="info-value">${student.grade}年生</div>
                </div>
                <div class="info-item">
                  <div class="info-label">年齢</div>
                  <div class="info-value">${student.age}歳</div>
                </div>
                <div class="info-item">
                  <div class="info-label">メールアドレス</div>
                  <div class="info-value" style="font-size: 14px;">${student.email}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">入学日</div>
                  <div class="info-value" style="font-size: 14px;">${student.enrollmentDate}</div>
                </div>
              </div>

              <div class="info-item">
                <div class="info-label">平均点</div>
                <div class="info-value" style="font-size: 24px; color: #667eea;">
                  ${average.toFixed(1)}点
                </div>
              </div>

              <div class="scores-grid">
                <div class="score-item">
                  <div class="score-label">数学</div>
                  <div class="score-value">${student.scores.math}</div>
                </div>
                <div class="score-item">
                  <div class="score-label">英語</div>
                  <div class="score-value">${student.scores.english}</div>
                </div>
                <div class="score-item">
                  <div class="score-label">物理</div>
                  <div class="score-value">${student.scores.physics}</div>
                </div>
                <div class="score-item">
                  <div class="score-label">プログラミング</div>
                  <div class="score-value">${student.scores.programming}</div>
                </div>
              </div>
            </div>
          `;
        });
      }

      document.getElementById('studentsList').innerHTML = html;
    }

    // 初期表示
    renderStudents();
  </script>
</body>
</html>
```

---

### アプリ2: 商品在庫管理システム

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>商品在庫管理システム</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1200px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }
    .product-card {
      background: #f8f9fa;
      border-radius: 10px;
      padding: 20px;
      transition: all 0.3s;
      border: 2px solid transparent;
    }
    .product-card:hover {
      border-color: #f093fb;
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(240, 147, 251, 0.3);
    }
    .product-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 15px;
    }
    .product-name {
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }
    .product-id {
      font-size: 12px;
      color: #999;
    }
    .stock-badge {
      padding: 5px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
    }
    .stock-high { background: #d4edda; color: #155724; }
    .stock-medium { background: #fff3cd; color: #856404; }
    .stock-low { background: #f8d7da; color: #721c24; }
    .product-price {
      font-size: 24px;
      font-weight: bold;
      color: #f5576c;
      margin: 15px 0;
    }
    .product-details {
      background: white;
      padding: 15px;
      border-radius: 5px;
      margin: 15px 0;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #e9ecef;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      color: #666;
      font-size: 14px;
    }
    .detail-value {
      color: #333;
      font-weight: bold;
      font-size: 14px;
    }
    .action-buttons {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }
    button {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }
    .btn-purchase {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }
    .btn-purchase:hover {
      transform: scale(1.05);
    }
    .btn-restock {
      background: #28a745;
      color: white;
    }
    .btn-restock:hover {
      background: #218838;
    }
    .stats-panel {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 30px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }
    .stat-item {
      text-align: center;
    }
    .stat-value {
      font-size: 32px;
      font-weight: bold;
      color: #f5576c;
    }
    .stat-label {
      font-size: 14px;
      color: #666;
      margin-top: 5px;
    }
    h3 {
      color: #f5576c;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📦 商品在庫管理システム</h1>

    <div class="stats-panel" id="statsPanel"></div>

    <h3>商品一覧</h3>
    <div class="products-grid" id="productsGrid"></div>
  </div>

  <script>
    // 商品データ（データモデリング）
    let products = [
      {
        productId: "P001",
        name: "ワイヤレスマウス",
        category: "PC周辺機器",
        brand: "TechCorp",
        price: 2500,
        stock: 15,
        minStock: 5,

        specifications: {
          color: "黒",
          weight: "85g",
          battery: "単三電池×2"
        },

        // メソッド
        isInStock() {
          return this.stock > 0;
        },

        getStockStatus() {
          if (this.stock === 0) return "out";
          if (this.stock <= this.minStock) return "low";
          if (this.stock <= this.minStock * 2) return "medium";
          return "high";
        },

        canPurchase(quantity) {
          return this.stock >= quantity;
        },

        purchase(quantity) {
          if (this.canPurchase(quantity)) {
            this.stock = this.stock - quantity;
            return true;
          }
          return false;
        },

        restock(quantity) {
          this.stock = this.stock + quantity;
        }
      },
      {
        productId: "P002",
        name: "メカニカルキーボード",
        category: "PC周辺機器",
        brand: "KeyMaster",
        price: 8500,
        stock: 3,
        minStock: 5,

        specifications: {
          color: "白",
          switches: "青軸",
          layout: "日本語配列"
        },

        isInStock() { return this.stock > 0; },
        getStockStatus() {
          if (this.stock === 0) return "out";
          if (this.stock <= this.minStock) return "low";
          if (this.stock <= this.minStock * 2) return "medium";
          return "high";
        },
        canPurchase(quantity) { return this.stock >= quantity; },
        purchase(quantity) {
          if (this.canPurchase(quantity)) {
            this.stock = this.stock - quantity;
            return true;
          }
          return false;
        },
        restock(quantity) { this.stock = this.stock + quantity; }
      },
      {
        productId: "P003",
        name: "Webカメラ",
        category: "PC周辺機器",
        brand: "VisionTech",
        price: 4200,
        stock: 8,
        minStock: 5,

        specifications: {
          resolution: "1080p",
          framerate: "30fps",
          microphone: "内蔵"
        },

        isInStock() { return this.stock > 0; },
        getStockStatus() {
          if (this.stock === 0) return "out";
          if (this.stock <= this.minStock) return "low";
          if (this.stock <= this.minStock * 2) return "medium";
          return "high";
        },
        canPurchase(quantity) { return this.stock >= quantity; },
        purchase(quantity) {
          if (this.canPurchase(quantity)) {
            this.stock = this.stock - quantity;
            return true;
          }
          return false;
        },
        restock(quantity) { this.stock = this.stock + quantity; }
      },
      {
        productId: "P004",
        name: "USBハブ",
        category: "PC周辺機器",
        brand: "ConnectPro",
        price: 1800,
        stock: 0,
        minStock: 10,

        specifications: {
          ports: "4ポート",
          usb: "USB 3.0",
          powered: "セルフパワー"
        },

        isInStock() { return this.stock > 0; },
        getStockStatus() {
          if (this.stock === 0) return "out";
          if (this.stock <= this.minStock) return "low";
          if (this.stock <= this.minStock * 2) return "medium";
          return "high";
        },
        canPurchase(quantity) { return this.stock >= quantity; },
        purchase(quantity) {
          if (this.canPurchase(quantity)) {
            this.stock = this.stock - quantity;
            return true;
          }
          return false;
        },
        restock(quantity) { this.stock = this.stock + quantity; }
      }
    ];

    // 商品を購入
    function purchaseProduct(productId) {
      let product = products.find(p => p.productId === productId);
      if (!product) return;

      let quantity = parseInt(prompt('購入数量を入力してください:', '1'));
      if (isNaN(quantity) || quantity <= 0) {
        alert('正しい数量を入力してください');
        return;
      }

      if (product.purchase(quantity)) {
        alert(`${product.name} を ${quantity}個 購入しました`);
        render();
      } else {
        alert('在庫が不足しています');
      }
    }

    // 商品を入荷
    function restockProduct(productId) {
      let product = products.find(p => p.productId === productId);
      if (!product) return;

      let quantity = parseInt(prompt('入荷数量を入力してください:', '10'));
      if (isNaN(quantity) || quantity <= 0) {
        alert('正しい数量を入力してください');
        return;
      }

      product.restock(quantity);
      alert(`${product.name} を ${quantity}個 入荷しました`);
      render();
    }

    // 統計情報を計算
    function getStatistics() {
      let totalProducts = products.length;
      let totalStock = 0;
      let lowStockCount = 0;
      let outOfStockCount = 0;

      products.forEach(product => {
        totalStock += product.stock;
        if (product.stock === 0) {
          outOfStockCount++;
        } else if (product.stock <= product.minStock) {
          lowStockCount++;
        }
      });

      return {
        totalProducts,
        totalStock,
        lowStockCount,
        outOfStockCount
      };
    }

    // 画面に表示
    function render() {
      // 統計パネル
      let stats = getStatistics();
      document.getElementById('statsPanel').innerHTML = `
        <div class="stat-item">
          <div class="stat-value">${stats.totalProducts}</div>
          <div class="stat-label">総商品数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${stats.totalStock}</div>
          <div class="stat-label">総在庫数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${stats.lowStockCount}</div>
          <div class="stat-label">要発注</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${stats.outOfStockCount}</div>
          <div class="stat-label">在庫切れ</div>
        </div>
      `;

      // 商品グリッド
      let html = '';
      products.forEach(product => {
        let status = product.getStockStatus();
        let statusText = {
          out: '在庫切れ',
          low: '在庫少',
          medium: '在庫あり',
          high: '在庫十分'
        }[status];

        let statusClass = `stock-${status === 'out' ? 'low' : status}`;

        html += `
          <div class="product-card">
            <div class="product-header">
              <div>
                <div class="product-name">${product.name}</div>
                <div class="product-id">${product.productId}</div>
              </div>
              <span class="${statusClass} stock-badge">${statusText}</span>
            </div>

            <div class="product-price">¥${product.price.toLocaleString()}</div>

            <div class="product-details">
              <div class="detail-row">
                <span class="detail-label">カテゴリ</span>
                <span class="detail-value">${product.category}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">ブランド</span>
                <span class="detail-value">${product.brand}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">在庫数</span>
                <span class="detail-value">${product.stock}個</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">最小在庫</span>
                <span class="detail-value">${product.minStock}個</span>
              </div>
            </div>

            <div class="action-buttons">
              <button class="btn-purchase" onclick="purchaseProduct('${product.productId}')"
                      ${product.stock === 0 ? 'disabled' : ''}>
                購入
              </button>
              <button class="btn-restock" onclick="restockProduct('${product.productId}')">
                入荷
              </button>
            </div>
          </div>
        `;
      });

      document.getElementById('productsGrid').innerHTML = html;
    }

    // 初期表示
    render();
  </script>
</body>
</html>
```

---

### アプリ3: ブログ投稿システム

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ブログ投稿システム</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 900px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
    }
    .post-form {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 10px;
      margin-bottom: 30px;
    }
    .form-group {
      margin: 15px 0;
    }
    label {
      display: block;
      font-weight: bold;
      color: #555;
      margin-bottom: 5px;
    }
    input, textarea, select {
      width: 100%;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 14px;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
    }
    textarea {
      min-height: 100px;
      resize: vertical;
    }
    button {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      transition: transform 0.2s;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(79, 172, 254, 0.4);
    }
    .posts-list {
      margin-top: 30px;
    }
    .post-card {
      background: white;
      border: 2px solid #e9ecef;
      border-radius: 10px;
      padding: 25px;
      margin: 20px 0;
    }
    .post-header {
      border-bottom: 2px solid #e9ecef;
      padding-bottom: 15px;
      margin-bottom: 15px;
    }
    .post-title {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }
    .post-meta {
      display: flex;
      gap: 15px;
      font-size: 14px;
      color: #666;
    }
    .post-content {
      line-height: 1.6;
      color: #555;
      margin: 20px 0;
    }
    .post-tags {
      display: flex;
      gap: 10px;
      margin: 15px 0;
      flex-wrap: wrap;
    }
    .tag {
      background: #4facfe;
      color: white;
      padding: 5px 15px;
      border-radius: 15px;
      font-size: 12px;
    }
    .post-stats {
      display: flex;
      gap: 20px;
      margin: 15px 0;
    }
    .stat {
      color: #666;
      font-size: 14px;
    }
    .comments-section {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      margin-top: 20px;
    }
    .comment {
      background: white;
      padding: 10px;
      margin: 10px 0;
      border-radius: 5px;
      border-left: 3px solid #4facfe;
    }
    .comment-author {
      font-weight: bold;
      color: #4facfe;
      font-size: 14px;
    }
    .comment-date {
      font-size: 12px;
      color: #999;
      margin-left: 10px;
    }
    .comment-content {
      margin-top: 5px;
      color: #555;
    }
    h3 {
      color: #4facfe;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📝 ブログ投稿システム</h1>

    <div class="post-form">
      <h3>新しい投稿を作成</h3>
      <div class="form-group">
        <label>タイトル:</label>
        <input type="text" id="postTitle" placeholder="例: JavaScriptの基礎">
      </div>
      <div class="form-group">
        <label>著者名:</label>
        <input type="text" id="postAuthor" placeholder="例: 山田太郎">
      </div>
      <div class="form-group">
        <label>カテゴリ:</label>
        <select id="postCategory">
          <option value="プログラミング">プログラミング</option>
          <option value="デザイン">デザイン</option>
          <option value="ビジネス">ビジネス</option>
          <option value="テクノロジー">テクノロジー</option>
        </select>
      </div>
      <div class="form-group">
        <label>タグ（カンマ区切り）:</label>
        <input type="text" id="postTags" placeholder="例: JavaScript, 初心者, 入門">
      </div>
      <div class="form-group">
        <label>本文:</label>
        <textarea id="postContent" placeholder="記事の本文を入力してください..."></textarea>
      </div>
      <button onclick="createPost()">投稿する</button>
    </div>

    <div class="posts-list">
      <h3>投稿一覧</h3>
      <div id="postsList"></div>
    </div>
  </div>

  <script>
    let posts = [];
    let postIdCounter = 1;

    // 投稿を作成（データモデリング）
    function createPost() {
      let title = document.getElementById('postTitle').value.trim();
      let author = document.getElementById('postAuthor').value.trim();
      let category = document.getElementById('postCategory').value;
      let tagsInput = document.getElementById('postTags').value.trim();
      let content = document.getElementById('postContent').value.trim();

      if (!title || !author || !content) {
        alert('タイトル、著者名、本文は必須です');
        return;
      }

      // タグを配列に変換
      let tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

      // 投稿オブジェクトを作成
      let post = {
        postId: "POST" + postIdCounter.toString().padStart(3, "0"),
        title: title,
        content: content,
        authorId: "U" + Math.floor(Math.random() * 1000),
        authorName: author,
        publishDate: new Date().toISOString().split('T')[0],
        category: category,
        tags: tags,
        views: 0,
        likes: 0,
        comments: [],

        // メソッド: コメント数を取得
        getCommentCount() {
          return this.comments.length;
        },

        // メソッド: コメントを追加
        addComment(userName, content) {
          let commentNumber = this.comments.length + 1;
          let paddedNumber = commentNumber.toString().padStart(3, "0");

          let newComment = {
            commentId: "C" + paddedNumber,
            userId: "U" + Math.floor(Math.random() * 1000),
            userName: userName,
            content: content,
            date: new Date().toISOString().split('T')[0]
          };

          this.comments.push(newComment);
        },

        // メソッド: サマリーを取得
        getSummary() {
          return {
            title: this.title,
            author: this.authorName,
            date: this.publishDate,
            views: this.views,
            likes: this.likes,
            comments: this.getCommentCount()
          };
        },

        // メソッド: いいねを追加
        addLike() {
          this.likes++;
        },

        // メソッド: 閲覧数を増やす
        incrementViews() {
          this.views++;
        }
      };

      posts.unshift(post);  // 最新の投稿を先頭に追加
      postIdCounter++;

      // フォームをクリア
      document.getElementById('postTitle').value = '';
      document.getElementById('postAuthor').value = '';
      document.getElementById('postTags').value = '';
      document.getElementById('postContent').value = '';

      renderPosts();
    }

    // コメントを追加
    function addComment(postId) {
      let post = posts.find(p => p.postId === postId);
      if (!post) return;

      let userName = prompt('お名前を入力してください:', '匿名');
      if (!userName) return;

      let content = prompt('コメントを入力してください:');
      if (!content) return;

      post.addComment(userName, content);
      renderPosts();
    }

    // いいねを追加
    function likePost(postId) {
      let post = posts.find(p => p.postId === postId);
      if (!post) return;

      post.addLike();
      renderPosts();
    }

    // 投稿一覧を表示
    function renderPosts() {
      let html = '';

      if (posts.length === 0) {
        html = '<p style="text-align: center; color: #999;">投稿がありません</p>';
      } else {
        posts.forEach(post => {
          let tagsHtml = post.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

          let commentsHtml = '';
          if (post.comments.length > 0) {
            commentsHtml = '<div class="comments-section"><h4>💬 コメント</h4>';
            post.comments.forEach(comment => {
              commentsHtml += `
                <div class="comment">
                  <span class="comment-author">${comment.userName}</span>
                  <span class="comment-date">${comment.date}</span>
                  <div class="comment-content">${comment.content}</div>
                </div>
              `;
            });
            commentsHtml += '</div>';
          }

          html += `
            <div class="post-card">
              <div class="post-header">
                <div class="post-title">${post.title}</div>
                <div class="post-meta">
                  <span>📁 ${post.category}</span>
                  <span>✍️ ${post.authorName}</span>
                  <span>📅 ${post.publishDate}</span>
                  <span>ID: ${post.postId}</span>
                </div>
              </div>

              <div class="post-content">${post.content}</div>

              ${tagsHtml ? '<div class="post-tags">' + tagsHtml + '</div>' : ''}

              <div class="post-stats">
                <span class="stat">👁️ 閲覧: ${post.views}</span>
                <span class="stat">❤️ いいね: ${post.likes}</span>
                <span class="stat">💬 コメント: ${post.getCommentCount()}</span>
              </div>

              <div style="margin-top: 15px;">
                <button onclick="likePost('${post.postId}')" style="padding: 8px 20px;">❤️ いいね</button>
                <button onclick="addComment('${post.postId}')" style="padding: 8px 20px;">💬 コメント</button>
              </div>

              ${commentsHtml}
            </div>
          `;
        });
      }

      document.getElementById('postsList').innerHTML = html;
    }

    // 初期表示
    renderPosts();
  </script>
</body>
</html>
```

---

## カリキュラムの要件チェック

curriculum.md（行1122-1127）の要件を確認します：

### ✅ 現実をモデル化
- 現実世界のものを分析する方法を詳しく解説
- 属性（プロパティ）と動作（メソッド）の概念を説明
- 本、学生、商品、ブログ投稿など具体例で実践

### ✅ プロパティの設計
- 適切なプロパティ名の選び方を解説
- データ型の適切な選択方法を説明
- 良い例と悪い例を対比して提示
- デフォルト値の設計パターンを紹介

### ✅ 関係性の表現
- ネストされたオブジェクトで関係を表現する方法を解説
- IDによる参照で関係を表現する方法を説明
- 複数オブジェクト間の関係性を図解

### ✅ 【知識】データ設計、モデリング
- データモデリングの基本概念を詳しく解説
- ベストプラクティス（明確な命名、一貫性、適切な粒度）を提示
- モデル化のプロセスをステップバイステップで説明

### ✅ 成果物：データモデル
- **アプリ1**: 学生管理システム（学生オブジェクトのモデリング）
- **アプリ2**: 商品在庫管理システム（商品オブジェクトとメソッドのモデリング）
- **アプリ3**: ブログ投稿システム（投稿とコメントの関係性のモデリング）

すべての要件を満たしています！

---

## まとめ

このレッスンで学んだこと：

1. **データモデリング**: 現実世界をプログラムで扱える形に変換
2. **属性と動作**: プロパティとメソッドで表現
3. **プロパティ設計**: 明確な命名、適切なデータ型
4. **関係性の表現**: ネストとIDによる参照
5. **ベストプラクティス**: 一貫性、適切な粒度、拡張性

次のレッスンでは、オブジェクトと関数について学びます。
