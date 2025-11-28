# レッスン144：オブジェクトと関数

**日付**: 2025-11-26

## 学習目標
このレッスンでは、オブジェクトと関数を組み合わせて使う方法を学びます。関数の引数としてオブジェクトを渡したり、関数からオブジェクトを返したりする実用的なパターンを習得します。

---

## オブジェクトと関数の組み合わせとは？

### 日常生活の例：「注文書と処理」

オブジェクトと関数の関係を理解するために、注文書の処理を考えてみましょう：

```
注文書（オブジェクト）:
┌─────────────────────────┐
│ 注文番号: 001           │
│ 商品名: ノート          │
│ 数量: 3                 │
│ 単価: 200円             │
└─────────────────────────┘
        ↓
    処理機（関数）に入れる
        ↓
┌─────────────────────────┐
│ 処理関数                │
│ - 合計金額を計算        │
│ - 消費税を計算          │
│ - 領収書を作成          │
└─────────────────────────┘
        ↓
    処理結果（オブジェクト）
        ↓
┌─────────────────────────┐
│ 小計: 600円             │
│ 消費税: 60円            │
│ 合計: 660円             │
│ 領収書番号: R001        │
└─────────────────────────┘
```

**ポイント:**
- オブジェクト（データ）→ 関数（処理）→ オブジェクト（結果）
- 複数のデータをまとめて処理できる
- 処理結果も複数の情報を返せる

---

## 1. 引数にオブジェクトを渡す

### 基本的な使い方

関数にオブジェクトを渡すことで、複数の関連するデータをまとめて処理できます：

```javascript
function displayPerson(person) {
  console.log("名前：" + person.name);
  console.log("年齢：" + person.age);
  console.log("都市：" + person.city);
}

let user = {
  name: "田中太郎",
  age: 28,
  city: "東京"
};

displayPerson(user);
// 名前：田中太郎
// 年齢：28
// 都市：東京
```

**実行の流れ:**

```
ステップ1: userオブジェクトを作成
user = {
  name: "田中太郎",
  age: 28,
  city: "東京"
}

ステップ2: displayPerson(user) を呼び出す
displayPerson 関数に user を渡す
        ↓
関数内で person = user となる
person.name → "田中太郎"
person.age → 28
person.city → "東京"

ステップ3: 各プロパティを表示
console.log("名前：" + person.name)
console.log("年齢：" + person.age)
console.log("都市：" + person.city)
```

### 複数の引数よりもオブジェクトを使う利点

引数が多い場合、オブジェクトにまとめると管理しやすくなります：

```javascript
// ❌ 悪い例：引数が多すぎる
function createUser(name, age, email, address, phone, role) {
  console.log(name);
  console.log(age);
  // 順序を間違えやすい！
  // 何番目が何のデータか分かりにくい
}

// 呼び出し時も順序を覚える必要がある
createUser("佐藤", 30, "sato@example.com", "大阪", "090-1234-5678", "admin");
//         ↑何番目？  ↑何番目？


// ✅ 良い例：オブジェクトにまとめる
function createUser(userInfo) {
  console.log(userInfo.name);
  console.log(userInfo.age);
  console.log(userInfo.email);
  // プロパティ名で分かりやすい！
}

let newUser = {
  name: "佐藤",
  age: 30,
  email: "sato@example.com",
  address: "大阪",
  phone: "090-1234-5678",
  role: "admin"
};

createUser(newUser);  // オブジェクトを1つ渡すだけ
```

**オブジェクトを使う利点:**

```
1. 順序を気にしなくて良い:
   { name: "田中", age: 28 } ← プロパティ名で明確

2. 必要なプロパティだけ渡せる:
   { name: "田中", email: "..." } ← ageは省略OK

3. 後から追加しやすい:
   { name: "田中", age: 28, phone: "..." } ← phoneを追加

4. 読みやすい:
   userInfo.name ← 何のデータか一目瞭然
```

### 実用例：商品情報の表示

```javascript
function displayProduct(product) {
  console.log("━━━━━━━━━━━━━━━━━━");
  console.log("商品名: " + product.name);
  console.log("価格: ¥" + product.price);
  console.log("カテゴリ: " + product.category);
  console.log("在庫: " + (product.inStock ? "あり" : "なし"));
  console.log("━━━━━━━━━━━━━━━━━━");
}

let laptop = {
  name: "ノートパソコン",
  price: 89800,
  category: "電子機器",
  inStock: true,
  brand: "TechCorp"
};

displayProduct(laptop);
// ━━━━━━━━━━━━━━━━━━
// 商品名: ノートパソコン
// 価格: ¥89800
// カテゴリ: 電子機器
// 在庫: あり
// ━━━━━━━━━━━━━━━━━━
```

---

## 2. オブジェクトを返す関数

### 基本的な使い方

関数はオブジェクトを返すこともできます。複数の値を返したい時に便利です：

```javascript
function createProduct(name, price) {
  return {
    name: name,
    price: price,
    inStock: true,
    createdAt: new Date().toISOString().split('T')[0]
  };
}

let product = createProduct("ノート", 200);
console.log(product.name);      // "ノート"
console.log(product.price);     // 200
console.log(product.inStock);   // true
console.log(product.createdAt); // "2025-11-26"
```

**実行の流れ:**

```
ステップ1: createProduct("ノート", 200) を呼び出す
関数内で name = "ノート", price = 200

ステップ2: オブジェクトを作成
{
  name: "ノート",
  price: 200,
  inStock: true,
  createdAt: "2025-11-26"
}

ステップ3: オブジェクトを返す
return { ... }
        ↓
product = { name: "ノート", price: 200, ... }

ステップ4: プロパティにアクセス
product.name → "ノート"
product.price → 200
```

### プロパティの省略記法

プロパティ名と変数名が同じ場合は、省略できます：

```javascript
// 通常の書き方
function createBook(title, author, price) {
  return {
    title: title,      // プロパティ名: 変数名
    author: author,
    price: price
  };
}

// 省略記法（ES6以降）
function createBook(title, author, price) {
  return {
    title,    // title: title の省略形
    author,   // author: author の省略形
    price     // price: price の省略形
  };
}

let book = createBook("JavaScript入門", "山田", 2800);
console.log(book);
// { title: "JavaScript入門", author: "山田", price: 2800 }
```

**省略記法の仕組み:**

```
変数名とプロパティ名が同じ場合:

通常:     { title: title }
         ↑プロパティ名  ↑変数名

省略形:   { title }
         ↑自動的に title: title と解釈される
```

### 計算結果を含むオブジェクトを返す

```javascript
function analyzeArray(numbers) {
  let sum = 0;
  let max = numbers[0];
  let min = numbers[0];

  for (let i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i];
    if (numbers[i] > max) max = numbers[i];
    if (numbers[i] < min) min = numbers[i];
  }

  return {
    sum: sum,
    average: sum / numbers.length,
    max: max,
    min: min,
    count: numbers.length
  };
}

let data = [10, 25, 5, 30, 15];
let result = analyzeArray(data);

console.log("合計：" + result.sum);        // 85
console.log("平均：" + result.average);    // 17
console.log("最大：" + result.max);        // 30
console.log("最小：" + result.min);        // 5
console.log("個数：" + result.count);      // 5
```

**実行の流れ:**

```
入力: [10, 25, 5, 30, 15]

ループ処理:
i=0: sum=10,  max=10,  min=10
i=1: sum=35,  max=25,  min=10
i=2: sum=40,  max=25,  min=5
i=3: sum=70,  max=30,  min=5
i=4: sum=85,  max=30,  min=5

計算:
average = 85 / 5 = 17

返すオブジェクト:
{
  sum: 85,
  average: 17,
  max: 30,
  min: 5,
  count: 5
}
```

---

## 3. 設定オブジェクトパターン

### 設定オブジェクトとは？

関数のオプション（設定）をオブジェクトにまとめて渡すパターンです：

```javascript
function createAlert(message, options) {
  // デフォルト設定
  let defaultOptions = {
    type: "info",
    duration: 3000,
    position: "top",
    closable: true
  };

  // ユーザー設定とデフォルト設定をマージ
  let settings = { ...defaultOptions, ...options };

  console.log("メッセージ：" + message);
  console.log("タイプ：" + settings.type);
  console.log("表示時間：" + settings.duration + "ms");
  console.log("位置：" + settings.position);
  console.log("閉じるボタン：" + settings.closable);
}

// 一部の設定だけ変更
createAlert("保存しました", {
  type: "success",
  duration: 5000
});
// メッセージ：保存しました
// タイプ：success
// 表示時間：5000ms
// 位置：top（デフォルト）
// 閉じるボタン：true（デフォルト）

// すべてデフォルトを使用
createAlert("情報を読み込み中", {});
// メッセージ：情報を読み込み中
// タイプ：info（デフォルト）
// 表示時間：3000ms（デフォルト）
// 位置：top（デフォルト）
// 閉じるボタン：true（デフォルト）
```

**設定オブジェクトの仕組み:**

```
デフォルト設定:
{
  type: "info",
  duration: 3000,
  position: "top",
  closable: true
}

ユーザー設定:
{
  type: "success",
  duration: 5000
}

マージ（...スプレッド構文）:
{ ...defaultOptions, ...options }
        ↓
{
  type: "info",      ← デフォルト
  duration: 3000,    ← デフォルト
  position: "top",   ← デフォルト
  closable: true     ← デフォルト
}
        ↓ options で上書き
{
  type: "success",   ← 上書き！
  duration: 5000,    ← 上書き！
  position: "top",   ← デフォルトのまま
  closable: true     ← デフォルトのまま
}
```

### 実用例：商品検索関数

```javascript
function searchProducts(products, options) {
  let results = [];

  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    let matches = true;

    // カテゴリでフィルタ
    if (options.category && product.category !== options.category) {
      matches = false;
    }

    // 最小価格でフィルタ
    if (options.minPrice && product.price < options.minPrice) {
      matches = false;
    }

    // 最大価格でフィルタ
    if (options.maxPrice && product.price > options.maxPrice) {
      matches = false;
    }

    // 在庫状態でフィルタ
    if (options.inStockOnly && !product.inStock) {
      matches = false;
    }

    if (matches) {
      results.push(product);
    }
  }

  return results;
}

let products = [
  { name: "ノート", price: 200, category: "文具", inStock: true },
  { name: "ペン", price: 100, category: "文具", inStock: false },
  { name: "消しゴム", price: 80, category: "文具", inStock: true },
  { name: "ファイル", price: 300, category: "文具", inStock: true }
];

// 価格範囲で検索
let filtered = searchProducts(products, {
  minPrice: 100,
  maxPrice: 250,
  inStockOnly: true
});

console.log(filtered);
// [{ name: "ノート", price: 200, category: "文具", inStock: true }]
```

**フィルタリングの流れ:**

```
商品リスト:
1. ノート (200円, 在庫あり)
2. ペン (100円, 在庫なし)
3. 消しゴム (80円, 在庫あり)
4. ファイル (300円, 在庫あり)

検索条件:
- minPrice: 100 (100円以上)
- maxPrice: 250 (250円以下)
- inStockOnly: true (在庫ありのみ)

チェック:
1. ノート → 200円 (100-250の範囲内) & 在庫あり → ✅ 合格
2. ペン → 在庫なし → ❌ 不合格
3. 消しゴム → 80円 (100円未満) → ❌ 不合格
4. ファイル → 300円 (250円超) → ❌ 不合格

結果: [ノート]
```

---

## 4. オブジェクトを加工する関数

### ユーザー情報の拡張

既存のオブジェクトに新しいプロパティを追加して返します：

```javascript
function enrichUser(user) {
  return {
    ...user,  // 元のプロパティをすべてコピー
    fullName: user.firstName + " " + user.lastName,
    age: calculateAge(user.birthYear),
    isAdult: calculateAge(user.birthYear) >= 18
  };
}

function calculateAge(birthYear) {
  return new Date().getFullYear() - birthYear;
}

let user = {
  firstName: "太郎",
  lastName: "山田",
  birthYear: 1995
};

let enrichedUser = enrichUser(user);
console.log(enrichedUser);
// {
//   firstName: "太郎",
//   lastName: "山田",
//   birthYear: 1995,
//   fullName: "太郎 山田",
//   age: 30,
//   isAdult: true
// }
```

**加工の流れ:**

```
元のオブジェクト:
{
  firstName: "太郎",
  lastName: "山田",
  birthYear: 1995
}
        ↓
    enrichUser 関数で加工
        ↓
計算:
- fullName = "太郎" + " " + "山田" = "太郎 山田"
- age = 2025 - 1995 = 30
- isAdult = 30 >= 18 = true
        ↓
新しいオブジェクト:
{
  firstName: "太郎",     ← 元のまま
  lastName: "山田",      ← 元のまま
  birthYear: 1995,       ← 元のまま
  fullName: "太郎 山田", ← 追加
  age: 30,               ← 追加
  isAdult: true          ← 追加
}
```

### フォームデータの検証

```javascript
function validateForm(formData) {
  let errors = [];

  // ユーザー名の検証
  if (!formData.username || formData.username.length < 3) {
    errors.push("ユーザー名は3文字以上必要です");
  }

  // メールアドレスの検証
  if (!formData.email || formData.email.indexOf("@") === -1) {
    errors.push("有効なメールアドレスを入力してください");
  }

  // パスワードの検証
  if (!formData.password || formData.password.length < 8) {
    errors.push("パスワードは8文字以上必要です");
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
    data: formData
  };
}

let formData = {
  username: "ta",
  email: "invalidEmail",
  password: "1234"
};

let result = validateForm(formData);

if (result.isValid) {
  console.log("検証成功");
} else {
  console.log("エラー：");
  for (let i = 0; i < result.errors.length; i++) {
    console.log("- " + result.errors[i]);
  }
}
// エラー：
// - ユーザー名は3文字以上必要です
// - 有効なメールアドレスを入力してください
// - パスワードは8文字以上必要です
```

**検証の流れ:**

```
入力データ:
{
  username: "ta",           ← 2文字（短すぎる）
  email: "invalidEmail",    ← @がない（無効）
  password: "1234"          ← 4文字（短すぎる）
}

検証:
1. username.length < 3 → エラー追加
2. email.indexOf("@") === -1 → エラー追加
3. password.length < 8 → エラー追加

結果:
{
  isValid: false,  ← エラーがあるのでfalse
  errors: [
    "ユーザー名は3文字以上必要です",
    "有効なメールアドレスを入力してください",
    "パスワードは8文字以上必要です"
  ],
  data: { ... }  ← 元のデータ
}
```

---

## 5. オブジェクトの配列を処理する

### カートの合計金額を計算

```javascript
function calculateTotalPrice(items) {
  let subtotal = 0;
  let tax = 0;

  // 小計を計算
  for (let i = 0; i < items.length; i++) {
    subtotal = subtotal + (items[i].price * items[i].quantity);
  }

  // 税金を計算
  tax = subtotal * 0.1;

  return {
    subtotal: subtotal,
    tax: tax,
    total: subtotal + tax,
    itemCount: items.length
  };
}

let cart = [
  { name: "商品A", price: 1000, quantity: 2 },
  { name: "商品B", price: 1500, quantity: 1 },
  { name: "商品C", price: 500, quantity: 3 }
];

let summary = calculateTotalPrice(cart);
console.log("小計：" + summary.subtotal + "円");  // 5000円
console.log("税金：" + summary.tax + "円");       // 500円
console.log("合計：" + summary.total + "円");     // 5500円
console.log("商品数：" + summary.itemCount);      // 3
```

**計算の流れ:**

```
カート内の商品:
[
  { name: "商品A", price: 1000, quantity: 2 },
  { name: "商品B", price: 1500, quantity: 1 },
  { name: "商品C", price: 500, quantity: 3 }
]

小計の計算:
商品A: 1000 × 2 = 2000円
商品B: 1500 × 1 = 1500円
商品C: 500 × 3 = 1500円
小計: 2000 + 1500 + 1500 = 5000円

税金の計算:
税金 = 5000 × 0.1 = 500円

合計:
合計 = 5000 + 500 = 5500円

返すオブジェクト:
{
  subtotal: 5000,
  tax: 500,
  total: 5500,
  itemCount: 3
}
```

### データ変換の関数

APIから取得したデータを、アプリで使いやすい形式に変換します：

```javascript
function transformUser(rawData) {
  return {
    id: rawData.user_id,
    name: rawData.full_name,
    email: rawData.email_address,
    role: rawData.user_role,
    active: rawData.is_active === "1"  // 文字列 → 真偽値
  };
}

// APIから取得したデータ（異なる形式）
let apiData = {
  user_id: 123,
  full_name: "佐藤花子",
  email_address: "hanako@example.com",
  user_role: "admin",
  is_active: "1"
};

let user = transformUser(apiData);
console.log(user);
// {
//   id: 123,
//   name: "佐藤花子",
//   email: "hanako@example.com",
//   role: "admin",
//   active: true
// }
```

**変換の流れ:**

```
API形式（スネークケース）:
{
  user_id: 123,
  full_name: "佐藤花子",
  email_address: "hanako@example.com",
  user_role: "admin",
  is_active: "1"
}
        ↓
    transformUser 関数で変換
        ↓
アプリ形式（キャメルケース）:
{
  id: 123,              ← user_id から変換
  name: "佐藤花子",      ← full_name から変換
  email: "hanako@...",  ← email_address から変換
  role: "admin",        ← user_role から変換
  active: true          ← "1" → true に変換
}
```

---

## 実践アプリケーション

### アプリ1: 商品管理システム

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>商品管理システム</title>
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
    .form-section {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 10px;
      margin-bottom: 30px;
    }
    .form-group {
      margin: 15px 0;
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 10px;
      align-items: center;
    }
    label {
      font-weight: bold;
      color: #555;
    }
    input, select {
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 14px;
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
    .filters {
      background: #fff3cd;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
    .product-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      border: 2px solid #e9ecef;
      transition: all 0.3s;
    }
    .product-card:hover {
      border-color: #667eea;
      transform: translateY(-5px);
    }
    .product-name {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }
    .product-price {
      font-size: 24px;
      font-weight: bold;
      color: #667eea;
      margin: 10px 0;
    }
    .product-detail {
      font-size: 14px;
      color: #666;
      margin: 5px 0;
    }
    .badge {
      display: inline-block;
      padding: 5px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
      margin-top: 10px;
    }
    .badge-stock { background: #d4edda; color: #155724; }
    .badge-out { background: #f8d7da; color: #721c24; }
    h3 {
      color: #667eea;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📦 商品管理システム</h1>

    <div class="form-section">
      <h3>新しい商品を追加</h3>
      <div class="form-group">
        <label>商品名:</label>
        <input type="text" id="productName" placeholder="例: ノートパソコン">
      </div>
      <div class="form-group">
        <label>価格:</label>
        <input type="number" id="productPrice" placeholder="例: 89800">
      </div>
      <div class="form-group">
        <label>カテゴリ:</label>
        <select id="productCategory">
          <option value="電子機器">電子機器</option>
          <option value="文具">文具</option>
          <option value="家具">家具</option>
          <option value="その他">その他</option>
        </select>
      </div>
      <div class="form-group">
        <label>在庫数:</label>
        <input type="number" id="productStock" value="10">
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <button onclick="addProduct()">商品を追加</button>
      </div>
    </div>

    <div class="filters">
      <h3>🔍 フィルター</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
        <div>
          <label>カテゴリ:</label>
          <select id="filterCategory" onchange="applyFilters()">
            <option value="">すべて</option>
            <option value="電子機器">電子機器</option>
            <option value="文具">文具</option>
            <option value="家具">家具</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <div>
          <label>最小価格:</label>
          <input type="number" id="filterMinPrice" placeholder="0" onchange="applyFilters()">
        </div>
        <div>
          <label>最大価格:</label>
          <input type="number" id="filterMaxPrice" placeholder="無制限" onchange="applyFilters()">
        </div>
      </div>
      <div style="margin-top: 15px;">
        <label>
          <input type="checkbox" id="filterInStock" onchange="applyFilters()">
          在庫ありのみ表示
        </label>
      </div>
    </div>

    <h3>商品一覧</h3>
    <div class="products-grid" id="productsGrid"></div>
  </div>

  <script>
    let products = [];
    let productIdCounter = 1;

    // 商品を追加する関数（オブジェクトを返す）
    function createProduct(productData) {
      return {
        id: productIdCounter++,
        name: productData.name,
        price: productData.price,
        category: productData.category,
        stock: productData.stock,
        inStock: productData.stock > 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
    }

    // 商品を追加
    function addProduct() {
      let name = document.getElementById('productName').value.trim();
      let price = parseInt(document.getElementById('productPrice').value);
      let category = document.getElementById('productCategory').value;
      let stock = parseInt(document.getElementById('productStock').value);

      if (!name || isNaN(price)) {
        alert('商品名と価格は必須です');
        return;
      }

      // createProduct関数を使ってオブジェクトを作成
      let product = createProduct({
        name: name,
        price: price,
        category: category,
        stock: stock
      });

      products.push(product);

      // フォームをクリア
      document.getElementById('productName').value = '';
      document.getElementById('productPrice').value = '';
      document.getElementById('productStock').value = '10';

      applyFilters();
    }

    // 商品を検索する関数（設定オブジェクトパターン）
    function searchProducts(productsArray, filters) {
      let results = [];

      for (let i = 0; i < productsArray.length; i++) {
        let product = productsArray[i];
        let matches = true;

        // カテゴリでフィルタ
        if (filters.category && product.category !== filters.category) {
          matches = false;
        }

        // 最小価格でフィルタ
        if (filters.minPrice && product.price < filters.minPrice) {
          matches = false;
        }

        // 最大価格でフィルタ
        if (filters.maxPrice && product.price > filters.maxPrice) {
          matches = false;
        }

        // 在庫状態でフィルタ
        if (filters.inStockOnly && !product.inStock) {
          matches = false;
        }

        if (matches) {
          results.push(product);
        }
      }

      return results;
    }

    // フィルターを適用
    function applyFilters() {
      let category = document.getElementById('filterCategory').value;
      let minPrice = parseInt(document.getElementById('filterMinPrice').value) || 0;
      let maxPrice = parseInt(document.getElementById('filterMaxPrice').value) || Infinity;
      let inStockOnly = document.getElementById('filterInStock').checked;

      // searchProducts関数を使って検索
      let filtered = searchProducts(products, {
        category: category || null,
        minPrice: minPrice,
        maxPrice: maxPrice,
        inStockOnly: inStockOnly
      });

      renderProducts(filtered);
    }

    // 商品を表示
    function renderProducts(productsToShow) {
      let html = '';

      if (productsToShow.length === 0) {
        html = '<p style="text-align: center; color: #999; grid-column: 1/-1;">商品がありません</p>';
      } else {
        productsToShow.forEach(product => {
          html += `
            <div class="product-card">
              <div class="product-name">${product.name}</div>
              <div class="product-price">¥${product.price.toLocaleString()}</div>
              <div class="product-detail">📁 ${product.category}</div>
              <div class="product-detail">📦 在庫: ${product.stock}個</div>
              <div class="product-detail">📅 登録日: ${product.createdAt}</div>
              <span class="${product.inStock ? 'badge badge-stock' : 'badge badge-out'}">
                ${product.inStock ? '在庫あり' : '在庫切れ'}
              </span>
            </div>
          `;
        });
      }

      document.getElementById('productsGrid').innerHTML = html;
    }

    // 初期データを追加
    products.push(createProduct({ name: "ノートパソコン", price: 89800, category: "電子機器", stock: 5 }));
    products.push(createProduct({ name: "ワイヤレスマウス", price: 2500, category: "電子機器", stock: 15 }));
    products.push(createProduct({ name: "ノート", price: 200, category: "文具", stock: 50 }));
    products.push(createProduct({ name: "オフィスチェア", price: 25000, category: "家具", stock: 0 }));

    // 初期表示
    applyFilters();
  </script>
</body>
</html>
```

---

### アプリ2: ユーザー登録システム

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ユーザー登録システム</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 700px;
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
    .form-section {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 10px;
      margin-bottom: 20px;
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
    input.error {
      border-color: #dc3545;
    }
    button {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      width: 100%;
      transition: transform 0.2s;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(240, 147, 251, 0.4);
    }
    .error-list {
      background: #f8d7da;
      color: #721c24;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      border-left: 5px solid #dc3545;
    }
    .error-list ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    .success-message {
      background: #d4edda;
      color: #155724;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      border-left: 5px solid #28a745;
    }
    .user-info {
      background: #e7f3ff;
      padding: 15px;
      border-radius: 8px;
      margin-top: 15px;
    }
    .user-info h4 {
      margin-top: 0;
      color: #0056b3;
    }
    h3 {
      color: #f5576c;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>👤 ユーザー登録システム</h1>

    <div id="errorContainer"></div>
    <div id="successContainer"></div>

    <div class="form-section">
      <h3>新規ユーザー登録</h3>
      <div class="form-group">
        <label>ユーザー名:</label>
        <input type="text" id="username" placeholder="3文字以上">
      </div>
      <div class="form-group">
        <label>メールアドレス:</label>
        <input type="email" id="email" placeholder="example@example.com">
      </div>
      <div class="form-group">
        <label>パスワード:</label>
        <input type="password" id="password" placeholder="8文字以上">
      </div>
      <div class="form-group">
        <label>生年:</label>
        <input type="number" id="birthYear" placeholder="例: 1995" min="1900" max="2024">
      </div>
      <button onclick="registerUser()">登録する</button>
    </div>

    <div id="userInfoContainer"></div>
  </div>

  <script>
    // フォームデータを検証する関数（オブジェクトを返す）
    function validateForm(formData) {
      let errors = [];

      // ユーザー名の検証
      if (!formData.username || formData.username.length < 3) {
        errors.push("ユーザー名は3文字以上必要です");
      }

      // メールアドレスの検証
      if (!formData.email || formData.email.indexOf("@") === -1) {
        errors.push("有効なメールアドレスを入力してください");
      }

      // パスワードの検証
      if (!formData.password || formData.password.length < 8) {
        errors.push("パスワードは8文字以上必要です");
      }

      // 生年の検証
      if (!formData.birthYear || formData.birthYear < 1900 || formData.birthYear > 2024) {
        errors.push("正しい生年を入力してください");
      }

      return {
        isValid: errors.length === 0,
        errors: errors,
        data: formData
      };
    }

    // ユーザーオブジェクトを拡張する関数（オブジェクトを返す）
    function enrichUser(userData) {
      let currentYear = new Date().getFullYear();
      let age = currentYear - userData.birthYear;

      return {
        ...userData,
        age: age,
        isAdult: age >= 18,
        registeredAt: new Date().toISOString().split('T')[0],
        id: "USER" + Date.now()
      };
    }

    // ユーザーを登録
    function registerUser() {
      // フォームデータを取得
      let formData = {
        username: document.getElementById('username').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
        birthYear: parseInt(document.getElementById('birthYear').value)
      };

      // エラー表示をクリア
      document.getElementById('errorContainer').innerHTML = '';
      document.getElementById('successContainer').innerHTML = '';
      document.getElementById('userInfoContainer').innerHTML = '';

      // 入力フィールドのエラースタイルをクリア
      document.querySelectorAll('input').forEach(input => {
        input.classList.remove('error');
      });

      // バリデーション
      let validationResult = validateForm(formData);

      if (!validationResult.isValid) {
        // エラー表示
        let errorHtml = '<div class="error-list">';
        errorHtml += '<strong>❌ 入力エラー:</strong>';
        errorHtml += '<ul>';
        validationResult.errors.forEach(error => {
          errorHtml += '<li>' + error + '</li>';
        });
        errorHtml += '</ul></div>';

        document.getElementById('errorContainer').innerHTML = errorHtml;

        // エラーのあるフィールドを強調
        if (formData.username.length < 3) {
          document.getElementById('username').classList.add('error');
        }
        if (formData.email.indexOf("@") === -1) {
          document.getElementById('email').classList.add('error');
        }
        if (formData.password.length < 8) {
          document.getElementById('password').classList.add('error');
        }

        return;
      }

      // ユーザー情報を拡張
      let user = enrichUser(formData);

      // 成功メッセージ
      let successHtml = '<div class="success-message">';
      successHtml += '<strong>✅ 登録成功!</strong><br>';
      successHtml += 'ユーザー「' + user.username + '」が登録されました。';
      successHtml += '</div>';

      document.getElementById('successContainer').innerHTML = successHtml;

      // ユーザー情報を表示
      let userInfoHtml = '<div class="user-info">';
      userInfoHtml += '<h4>登録情報:</h4>';
      userInfoHtml += '<p><strong>ユーザーID:</strong> ' + user.id + '</p>';
      userInfoHtml += '<p><strong>ユーザー名:</strong> ' + user.username + '</p>';
      userInfoHtml += '<p><strong>メール:</strong> ' + user.email + '</p>';
      userInfoHtml += '<p><strong>年齢:</strong> ' + user.age + '歳</p>';
      userInfoHtml += '<p><strong>成人:</strong> ' + (user.isAdult ? 'はい' : 'いいえ') + '</p>';
      userInfoHtml += '<p><strong>登録日:</strong> ' + user.registeredAt + '</p>';
      userInfoHtml += '</div>';

      document.getElementById('userInfoContainer').innerHTML = userInfoHtml;

      // フォームをクリア
      document.getElementById('username').value = '';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      document.getElementById('birthYear').value = '';
    }
  </script>
</body>
</html>
```

---

### アプリ3: ショッピングカート

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ショッピングカート</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
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
    .cart-items {
      margin-bottom: 30px;
    }
    .cart-item {
      background: #f8f9fa;
      padding: 15px;
      margin: 10px 0;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .item-info {
      flex: 1;
    }
    .item-name {
      font-weight: bold;
      font-size: 16px;
      color: #333;
    }
    .item-price {
      color: #666;
      margin-top: 5px;
    }
    .item-quantity {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .quantity-btn {
      background: #4facfe;
      color: white;
      border: none;
      width: 30px;
      height: 30px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    .quantity-btn:hover {
      background: #3498db;
    }
    .remove-btn {
      background: #dc3545;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
    }
    .remove-btn:hover {
      background: #c82333;
    }
    .summary {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
      padding: 25px;
      border-radius: 10px;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      font-size: 16px;
    }
    .summary-total {
      border-top: 2px solid white;
      padding-top: 15px;
      margin-top: 15px;
      font-size: 24px;
      font-weight: bold;
    }
    .products-section {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 30px;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }
    .product-card {
      background: white;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
    }
    .product-card button {
      background: #4facfe;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
      margin-top: 10px;
    }
    .product-card button:hover {
      background: #3498db;
    }
    h3 {
      color: #4facfe;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🛒 ショッピングカート</h1>

    <div class="products-section">
      <h3>商品一覧</h3>
      <div class="product-grid" id="productsList"></div>
    </div>

    <h3>カート</h3>
    <div class="cart-items" id="cartItems"></div>

    <div class="summary" id="summary"></div>
  </div>

  <script>
    let cart = [];

    let availableProducts = [
      { id: 1, name: "ノートパソコン", price: 89800 },
      { id: 2, name: "ワイヤレスマウス", price: 2500 },
      { id: 3, name: "キーボード", price: 5500 },
      { id: 4, name: "モニター", price: 25000 }
    ];

    // カートに商品を追加
    function addToCart(productId) {
      let product = availableProducts.find(p => p.id === productId);
      if (!product) return;

      // すでにカートにある商品か確認
      let existingItem = cart.find(item => item.id === productId);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        });
      }

      render();
    }

    // 数量を変更
    function changeQuantity(productId, delta) {
      let item = cart.find(item => item.id === productId);
      if (!item) return;

      item.quantity += delta;

      if (item.quantity <= 0) {
        removeFromCart(productId);
      } else {
        render();
      }
    }

    // カートから削除
    function removeFromCart(productId) {
      cart = cart.filter(item => item.id !== productId);
      render();
    }

    // カートの合計を計算する関数（オブジェクトを返す）
    function calculateCartTotal(items) {
      let subtotal = 0;
      let tax = 0;
      let itemCount = 0;

      for (let i = 0; i < items.length; i++) {
        subtotal += items[i].price * items[i].quantity;
        itemCount += items[i].quantity;
      }

      tax = Math.floor(subtotal * 0.1);

      return {
        subtotal: subtotal,
        tax: tax,
        total: subtotal + tax,
        itemCount: itemCount
      };
    }

    // 表示を更新
    function render() {
      // 商品一覧を表示
      let productsHtml = '';
      availableProducts.forEach(product => {
        productsHtml += `
          <div class="product-card">
            <div class="item-name">${product.name}</div>
            <div class="item-price">¥${product.price.toLocaleString()}</div>
            <button onclick="addToCart(${product.id})">カートに追加</button>
          </div>
        `;
      });
      document.getElementById('productsList').innerHTML = productsHtml;

      // カート内容を表示
      let cartHtml = '';

      if (cart.length === 0) {
        cartHtml = '<p style="text-align: center; color: #999;">カートは空です</p>';
      } else {
        cart.forEach(item => {
          let itemTotal = item.price * item.quantity;
          cartHtml += `
            <div class="cart-item">
              <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-price">¥${item.price.toLocaleString()} × ${item.quantity} = ¥${itemTotal.toLocaleString()}</div>
              </div>
              <div class="item-quantity">
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span style="font-weight: bold; min-width: 30px; text-align: center;">${item.quantity}</span>
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">削除</button>
              </div>
            </div>
          `;
        });
      }

      document.getElementById('cartItems').innerHTML = cartHtml;

      // 合計を計算して表示
      let summary = calculateCartTotal(cart);

      let summaryHtml = `
        <div class="summary-row">
          <span>商品点数:</span>
          <span>${summary.itemCount}点</span>
        </div>
        <div class="summary-row">
          <span>小計:</span>
          <span>¥${summary.subtotal.toLocaleString()}</span>
        </div>
        <div class="summary-row">
          <span>消費税（10%）:</span>
          <span>¥${summary.tax.toLocaleString()}</span>
        </div>
        <div class="summary-row summary-total">
          <span>合計:</span>
          <span>¥${summary.total.toLocaleString()}</span>
        </div>
      `;

      document.getElementById('summary').innerHTML = summaryHtml;
    }

    // 初期表示
    render();
  </script>
</body>
</html>
```

---

## カリキュラムの要件チェック

curriculum.md（行1129-1134）の要件を確認します：

### ✅ 引数にオブジェクト
- 関数の引数としてオブジェクトを渡す方法を詳しく解説
- 複数の引数よりもオブジェクトを使う利点を説明
- 実用例で実践（displayPerson, createUser）

### ✅ オブジェクトを返す
- 関数からオブジェクトを返す方法を詳しく解説
- プロパティの省略記法を説明
- 計算結果をオブジェクトで返す方法を実例で解説

### ✅ 設定オブジェクト
- 設定オブジェクトパターンを詳しく解説
- デフォルト値とのマージ方法を説明
- 実用例（createAlert, searchProducts）で実践

### ✅ 【知識】オブジェクトの受け渡し
- オブジェクトの受け渡しの仕組みを図解で説明
- データ変換、検証、加工のパターンを解説
- 実用的なユースケースを多数提示

### ✅ 成果物：オブジェクト操作
- **アプリ1**: 商品管理システム（オブジェクトの作成、検索、フィルタリング）
- **アプリ2**: ユーザー登録システム（検証、拡張、オブジェクトの返却）
- **アプリ3**: ショッピングカート（配列処理、合計計算、オブジェクトの返却）

すべての要件を満たしています！

---

## まとめ

このレッスンで学んだこと：

1. **引数にオブジェクト**: 複数の関連データをまとめて渡せる
2. **オブジェクトを返す**: 複数の値を1つのオブジェクトで返せる
3. **設定オブジェクト**: オプションをオブジェクトで渡すパターン
4. **データ変換**: 異なる形式のデータを変換
5. **検証と加工**: データをチェックして整形

次のレッスンでは、オブジェクトの週のプロジェクトに挑戦します。
