# レッスン138：オブジェクトの配列

## 学習目標
- オブジェクトを要素とする配列を理解する
- 複数のデータをオブジェクトの配列で管理する方法を学ぶ
- 配列のループでオブジェクトデータを処理する方法を習得する

## オブジェクトの配列とは

前回のレッスンでは、オブジェクトの中に配列を入れる方法を学びました。今回は逆に、**配列の中に複数のオブジェクトを入れる**方法を学びます。

```javascript
let products = [
  { name: "ノート", price: 200, stock: 50 },
  { name: "ペン", price: 100, stock: 120 },
  { name: "消しゴム", price: 80, stock: 200 }
];
```

この形式は、複数の同じ構造を持つデータを管理するのに非常に便利です。

## 基本的な書き方

### オブジェクトの配列の作成

```javascript
let students = [
  { name: "田中", age: 18, grade: "A" },
  { name: "佐藤", age: 19, grade: "B" },
  { name: "鈴木", age: 18, grade: "A" }
];
```

各要素は独立したオブジェクトで、同じプロパティ構造を持ちます。

### 要素へのアクセス

```javascript
// 最初の学生
console.log(students[0]);
// { name: "田中", age: 18, grade: "A" }

// 最初の学生の名前
console.log(students[0].name);
// "田中"

// 2番目の学生の成績
console.log(students[1].grade);
// "B"
```

配列のインデックスでオブジェクトにアクセスし、さらにドット記法でプロパティにアクセスします。

## ループで処理する

オブジェクトの配列を扱う最も一般的な方法は、forループで各オブジェクトを処理することです。

### 全ての要素を表示

```javascript
let products = [
  { name: "ノート", price: 200 },
  { name: "ペン", price: 100 },
  { name: "消しゴム", price: 80 }
];

for (let i = 0; i < products.length; i++) {
  console.log(products[i].name + "：" + products[i].price + "円");
}
// ノート：200円
// ペン：100円
// 消しゴム：80円
```

### 条件に合うデータを探す

```javascript
let books = [
  { title: "JavaScript入門", price: 2800, inStock: true },
  { title: "Web デザイン", price: 3200, inStock: false },
  { title: "データベース基礎", price: 2500, inStock: true }
];

// 在庫がある本を表示
for (let i = 0; i < books.length; i++) {
  if (books[i].inStock === true) {
    console.log(books[i].title + " は在庫があります");
  }
}
```

### 合計を計算

```javascript
let cart = [
  { item: "りんご", price: 150, quantity: 3 },
  { item: "バナナ", price: 200, quantity: 2 },
  { item: "みかん", price: 100, quantity: 5 }
];

let total = 0;
for (let i = 0; i < cart.length; i++) {
  total = total + (cart[i].price * cart[i].quantity);
}
console.log("合計金額：" + total + "円");
// 合計金額：1350円
```

## HTMLに表示する

オブジェクトの配列をWebページに表示する実用例を見てみましょう。

```javascript
let products = [
  { name: "コーヒー", price: 500, category: "飲料" },
  { name: "サンドイッチ", price: 400, category: "食品" },
  { name: "ケーキ", price: 600, category: "食品" }
];

let output = document.getElementById("productList");
let html = "";

for (let i = 0; i < products.length; i++) {
  html = html + "<div>";
  html = html + "<h3>" + products[i].name + "</h3>";
  html = html + "<p>価格：" + products[i].price + "円</p>";
  html = html + "<p>カテゴリ：" + products[i].category + "</p>";
  html = html + "</div>";
}

output.innerHTML = html;
```

## 配列に要素を追加

新しいオブジェクトを配列に追加することもできます。

```javascript
let tasks = [
  { title: "買い物", done: false },
  { title: "掃除", done: true }
];

// 新しいタスクを追加
tasks.push({ title: "洗濯", done: false });

console.log(tasks.length);
// 3
```

## 実用例：商品カタログ

商品リストを管理し、カテゴリ別に集計するプログラムの例です。

```javascript
let catalog = [
  { id: 1, name: "Tシャツ", category: "衣類", price: 2000 },
  { id: 2, name: "ジーンズ", category: "衣類", price: 5000 },
  { id: 3, name: "スニーカー", category: "靴", price: 8000 },
  { id: 4, name: "帽子", category: "小物", price: 3000 }
];

// カテゴリ「衣類」の商品数を数える
let count = 0;
for (let i = 0; i < catalog.length; i++) {
  if (catalog[i].category === "衣類") {
    count++;
  }
}
console.log("衣類の商品数：" + count);
// 衣類の商品数：2

// 全商品の平均価格を計算
let sum = 0;
for (let i = 0; i < catalog.length; i++) {
  sum = sum + catalog[i].price;
}
let average = sum / catalog.length;
console.log("平均価格：" + average + "円");
// 平均価格：4500円
```

## まとめ

オブジェクトの配列は、実際のアプリケーション開発で最もよく使われるデータ構造の一つです：

1. `[{}, {}, {}]` の形式で複数のデータを管理
2. `array[i].property` でデータにアクセス
3. forループで全要素を処理
4. 条件分岐で特定のデータを抽出
5. 計算処理で集計や統計を行う

次のレッスンでは、オブジェクトのメソッドについて学びます。

## 練習問題

以下の商品データを使って、商品カタログを作成してください：

```javascript
let products = [
  { id: 1, name: "ワイヤレスマウス", price: 2500, stock: 15 },
  { id: 2, name: "キーボード", price: 5000, stock: 8 },
  { id: 3, name: "モニター", price: 25000, stock: 3 },
  { id: 4, name: "Webカメラ", price: 7000, stock: 12 }
];
```

以下の情報を表示してください：

1. 全商品の名前と価格
2. 在庫が10個以上ある商品の数
3. 全商品の合計金額（price × stock）
4. 最も高い商品の名前
