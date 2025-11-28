# レッスン134: 最初のオブジェクト

**日付**: 2025-11-26
**所要時間**: 30分

## このレッスンで学ぶこと

1. オブジェクトとは何か
2. オブジェクトリテラルの書き方
3. プロパティ（キーと値）の理解
4. オブジェクトの表示方法

---

## オブジェクトとは？

### 日常生活での例え：整理された引き出し

```
【配列：番号で管理】
引き出し1: 「太郎」
引き出し2: 20
引き出し3: 「東京」
→ 番号だけでは、何のデータか分かりにくい

【オブジェクト：名前で管理】
名前の引き出し: 「太郎」
年齢の引き出し: 20
住所の引き出し: 「東京」
→ ラベルがあるので、何のデータかすぐわかる！
```

**オブジェクト**とは、関連するデータを「名前（キー）」と「値」のペアでまとめて管理する仕組みです。

---

## 1. オブジェクトリテラル

### 基本的な書き方

```javascript
const person = {
  name: "太郎",
  age: 20
};
```

**構文の説明**：
```
const オブジェクト名 = {
  キー1: 値1,
  キー2: 値2,
  キー3: 値3
};
```

- `{ }` : 波括弧でオブジェクトを囲む
- `name: "太郎"` : キーと値をコロン`:`で区切る
- `,` : 複数のプロパティをカンマで区切る
- 最後のプロパティの後のカンマは省略可能

### 配列との比較

```javascript
// 配列：番号（インデックス）でアクセス
const personArray = ["太郎", 20, "東京"];
console.log(personArray[0]); // => "太郎"
console.log(personArray[1]); // => 20
console.log(personArray[2]); // => "東京"
// 問題：0, 1, 2が何を意味するか分かりにくい

// オブジェクト：名前（キー）でアクセス
const person = {
  name: "太郎",
  age: 20,
  city: "東京"
};
console.log(person.name); // => "太郎"
console.log(person.age);  // => 20
console.log(person.city); // => "東京"
// メリット：キー名で意味が明確
```

### 実行の流れ

```javascript
// オブジェクトの作成
const person = {
  name: "太郎",
  age: 20
};

// 実行の流れ:
// ステップ1: 空のオブジェクトが作成される
// person = {}

// ステップ2: nameプロパティが追加される
// person = { name: "太郎" }

// ステップ3: ageプロパティが追加される
// person = { name: "太郎", age: 20 }

// ステップ4: personという定数に代入される
```

**図解：オブジェクトの構造**

```
person オブジェクト
┌─────────────────┐
│  name: "太郎"   │ ← プロパティ1（キー: name, 値: "太郎"）
│  age: 20        │ ← プロパティ2（キー: age, 値: 20）
└─────────────────┘
```

---

## 2. プロパティの理解

### プロパティとは？

オブジェクトの中にあるデータの1つ1つを「プロパティ」と呼びます。

```javascript
const book = {
  title: "JavaScriptの本",  // プロパティ1
  price: 2000,              // プロパティ2
  pages: 300                // プロパティ3
};
```

### キーと値

各プロパティは「キー（Key）」と「値（Value）」のペアで構成されます。

```javascript
const product = {
  name: "ノートPC",    // キー: name,  値: "ノートPC"
  price: 120000,       // キー: price, 値: 120000
  stock: 15            // キー: stock, 値: 15
};
```

**図解：キーと値の関係**

```
プロパティ: name: "ノートPC"
           ↑    ↑
          キー   値

キー（Key）  → プロパティの名前（ラベル）
値（Value）  → プロパティに格納されているデータ
```

### 様々なデータ型を値にできる

```javascript
const data = {
  // 文字列
  text: "こんにちは",

  // 数値
  number: 100,

  // 真偽値
  flag: true,

  // null
  empty: null,

  // 配列
  list: [1, 2, 3, 4, 5]
};

console.log(data.text);   // => "こんにちは"
console.log(data.number); // => 100
console.log(data.flag);   // => true
console.log(data.empty);  // => null
console.log(data.list);   // => [1, 2, 3, 4, 5]
console.log(data.list[0]); // => 1
```

### 基本例1：人物データ

```javascript
const person = {
  name: "太郎",
  age: 20,
  city: "東京"
};

// 実行時のメモリイメージ:
// person
// ├─ name: "太郎"
// ├─ age: 20
// └─ city: "東京"
```

### 基本例2：商品データ

```javascript
const product = {
  name: "JavaScript本",
  price: 2800,
  inStock: true,
  category: "プログラミング"
};

// 各プロパティには意味がある:
// name     → 商品名
// price    → 価格
// inStock  → 在庫があるか
// category → カテゴリー
```

---

## 3. オブジェクトの表示

### console.logで表示

```javascript
const person = {
  name: "太郎",
  age: 20,
  city: "東京"
};

// オブジェクト全体を表示
console.log(person);
// => { name: "太郎", age: 20, city: "東京" }

// プロパティごとに表示
console.log("名前:", person.name);  // => 名前: 太郎
console.log("年齢:", person.age);   // => 年齢: 20
console.log("都市:", person.city);  // => 都市: 東京
```

### 実行の流れ

```javascript
const person = {
  name: "太郎",
  age: 20
};

console.log(person);

// 実行の流れ:
// ステップ1: personオブジェクトにアクセス
// person = { name: "太郎", age: 20 }

// ステップ2: console.logに渡す
// console.log({ name: "太郎", age: 20 })

// ステップ3: コンソールに出力
// { name: "太郎", age: 20 }
```

### プロパティを個別に表示

```javascript
const book = {
  title: "JavaScript入門",
  author: "山田太郎",
  price: 2800
};

// 文字列と組み合わせて表示
console.log("タイトル: " + book.title);
// => タイトル: JavaScript入門

console.log("著者: " + book.author);
// => 著者: 山田太郎

console.log("価格: " + book.price + "円");
// => 価格: 2800円
```

---

## 実践例1：人物データカード

それでは、人物データをオブジェクトで管理して、HTMLに表示するアプリを作りましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>人物データカード</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .person-card {
      background-color: white;
      border-radius: 10px;
      padding: 30px;
      margin: 20px 0;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .person-card h2 {
      margin-top: 0;
      color: #667eea;
      border-bottom: 2px solid #667eea;
      padding-bottom: 10px;
    }

    .info-row {
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }

    .info-row:last-child {
      border-bottom: none;
    }

    .label {
      font-weight: bold;
      color: #666;
      width: 100px;
    }

    .value {
      color: #333;
      flex: 1;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>👤 人物データカード</h1>

    <div class="person-card">
      <h2 id="personName"></h2>

      <div class="info-row">
        <span class="label">年齢:</span>
        <span class="value" id="personAge"></span>
      </div>

      <div class="info-row">
        <span class="label">都市:</span>
        <span class="value" id="personCity"></span>
      </div>

      <div class="info-row">
        <span class="label">職業:</span>
        <span class="value" id="personJob"></span>
      </div>

      <div class="info-row">
        <span class="label">趣味:</span>
        <span class="value" id="personHobbies"></span>
      </div>
    </div>
  </div>

  <script>
    // オブジェクトで人物データを作成
    const person = {
      name: "山田太郎",
      age: 28,
      city: "東京都",
      job: "Webエンジニア",
      hobbies: "プログラミング、読書、ランニング"
    };

    // HTMLに表示
    document.getElementById('personName').textContent = person.name;
    document.getElementById('personAge').textContent = person.age + "歳";
    document.getElementById('personCity').textContent = person.city;
    document.getElementById('personJob').textContent = person.job;
    document.getElementById('personHobbies').textContent = person.hobbies;
  </script>
</body>
</html>
```

**このアプリの特徴**：
- ✅ オブジェクトで人物データを整理
- ✅ プロパティごとに異なる情報を管理
- ✅ 見やすいカードデザイン
- ✅ データとデザインを分離

---

## 実践例2：複数の人物データ

複数の人物を管理してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>チームメンバー紹介</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 40px 20px;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
    }

    h1 {
      text-align: center;
      color: white;
      font-size: 36px;
      margin-bottom: 40px;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .member-card {
      background-color: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
      transition: transform 0.3s;
    }

    .member-card:hover {
      transform: translateY(-5px);
    }

    .member-name {
      font-size: 22px;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 10px;
    }

    .member-role {
      font-size: 14px;
      color: #666;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 2px solid #eee;
    }

    .member-info {
      font-size: 14px;
      color: #333;
      line-height: 1.8;
    }

    .member-info div {
      margin: 5px 0;
    }

    .label {
      font-weight: 600;
      color: #555;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 チームメンバー紹介</h1>

    <div class="team-grid">
      <!-- メンバー1 -->
      <div class="member-card">
        <div class="member-name" id="name1"></div>
        <div class="member-role" id="role1"></div>
        <div class="member-info">
          <div><span class="label">年齢:</span> <span id="age1"></span></div>
          <div><span class="label">経験:</span> <span id="experience1"></span></div>
          <div><span class="label">スキル:</span> <span id="skills1"></span></div>
        </div>
      </div>

      <!-- メンバー2 -->
      <div class="member-card">
        <div class="member-name" id="name2"></div>
        <div class="member-role" id="role2"></div>
        <div class="member-info">
          <div><span class="label">年齢:</span> <span id="age2"></span></div>
          <div><span class="label">経験:</span> <span id="experience2"></span></div>
          <div><span class="label">スキル:</span> <span id="skills2"></span></div>
        </div>
      </div>

      <!-- メンバー3 -->
      <div class="member-card">
        <div class="member-name" id="name3"></div>
        <div class="member-role" id="role3"></div>
        <div class="member-info">
          <div><span class="label">年齢:</span> <span id="age3"></span></div>
          <div><span class="label">経験:</span> <span id="experience3"></span></div>
          <div><span class="label">スキル:</span> <span id="skills3"></span></div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // メンバー1のデータ
    const member1 = {
      name: "山田太郎",
      role: "プロジェクトマネージャー",
      age: 35,
      experience: "10年",
      skills: "JavaScript, Python, チーム管理"
    };

    // メンバー2のデータ
    const member2 = {
      name: "佐藤花子",
      role: "フロントエンドエンジニア",
      age: 28,
      experience: "5年",
      skills: "React, Vue.js, CSS"
    };

    // メンバー3のデータ
    const member3 = {
      name: "鈴木一郎",
      role: "バックエンドエンジニア",
      age: 30,
      experience: "7年",
      skills: "Node.js, PostgreSQL, AWS"
    };

    // メンバー1の情報を表示
    document.getElementById('name1').textContent = member1.name;
    document.getElementById('role1').textContent = member1.role;
    document.getElementById('age1').textContent = member1.age + "歳";
    document.getElementById('experience1').textContent = member1.experience;
    document.getElementById('skills1').textContent = member1.skills;

    // メンバー2の情報を表示
    document.getElementById('name2').textContent = member2.name;
    document.getElementById('role2').textContent = member2.role;
    document.getElementById('age2').textContent = member2.age + "歳";
    document.getElementById('experience2').textContent = member2.experience;
    document.getElementById('skills2').textContent = member2.skills;

    // メンバー3の情報を表示
    document.getElementById('name3').textContent = member3.name;
    document.getElementById('role3').textContent = member3.role;
    document.getElementById('age3').textContent = member3.age + "歳";
    document.getElementById('experience3').textContent = member3.experience;
    document.getElementById('skills3').textContent = member3.skills;
  </script>
</body>
</html>
```

**このアプリの特徴**：
- ✅ 3人のメンバーをそれぞれオブジェクトで管理
- ✅ 各メンバーが同じ構造のデータを持つ
- ✅ グリッドレイアウトで見やすく表示
- ✅ ホバーエフェクト付き

---

## 実践例3：商品カタログ

商品情報をオブジェクトで管理します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>商品カタログ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f8f9fa;
      padding: 40px 20px;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 40px;
    }

    .product-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .product {
      background-color: white;
      border-radius: 8px;
      padding: 25px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .product-info {
      flex: 1;
    }

    .product-name {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }

    .product-description {
      font-size: 14px;
      color: #666;
      margin-bottom: 15px;
    }

    .product-details {
      font-size: 13px;
      color: #888;
    }

    .product-price {
      font-size: 32px;
      font-weight: bold;
      color: #e74c3c;
      margin-right: 20px;
    }

    .product-stock {
      font-size: 14px;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;
    }

    .in-stock {
      background-color: #d4edda;
      color: #155724;
    }

    .out-of-stock {
      background-color: #f8d7da;
      color: #721c24;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🛒 商品カタログ</h1>

    <div class="product-list">
      <!-- 商品1 -->
      <div class="product">
        <div class="product-info">
          <div class="product-name" id="productName1"></div>
          <div class="product-description" id="productDesc1"></div>
          <div class="product-details">
            カテゴリ: <span id="productCategory1"></span> |
            在庫: <span id="productStock1"></span>個
          </div>
        </div>
        <div>
          <div class="product-price">¥<span id="productPrice1"></span></div>
        </div>
      </div>

      <!-- 商品2 -->
      <div class="product">
        <div class="product-info">
          <div class="product-name" id="productName2"></div>
          <div class="product-description" id="productDesc2"></div>
          <div class="product-details">
            カテゴリ: <span id="productCategory2"></span> |
            在庫: <span id="productStock2"></span>個
          </div>
        </div>
        <div>
          <div class="product-price">¥<span id="productPrice2"></span></div>
        </div>
      </div>

      <!-- 商品3 -->
      <div class="product">
        <div class="product-info">
          <div class="product-name" id="productName3"></div>
          <div class="product-description" id="productDesc3"></div>
          <div class="product-details">
            カテゴリ: <span id="productCategory3"></span> |
            在庫: <span id="productStock3"></span>個
          </div>
        </div>
        <div>
          <div class="product-price">¥<span id="productPrice3"></span></div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // 商品1のデータ
    const product1 = {
      name: "JavaScript完全ガイド",
      description: "初心者から上級者まで、JavaScriptの全てを学べる決定版",
      category: "プログラミング書籍",
      price: 3800,
      stock: 25
    };

    // 商品2のデータ
    const product2 = {
      name: "ワイヤレスマウス",
      description: "人間工学に基づいたデザインで長時間の作業も快適",
      category: "PC周辺機器",
      price: 2400,
      stock: 15
    };

    // 商品3のデータ
    const product3 = {
      name: "プログラミング用キーボード",
      description: "メカニカルスイッチ採用、高速タイピングに最適",
      category: "PC周辺機器",
      price: 12800,
      stock: 8
    };

    // 商品1の情報を表示
    document.getElementById('productName1').textContent = product1.name;
    document.getElementById('productDesc1').textContent = product1.description;
    document.getElementById('productCategory1').textContent = product1.category;
    document.getElementById('productPrice1').textContent = product1.price.toLocaleString();
    document.getElementById('productStock1').textContent = product1.stock;

    // 商品2の情報を表示
    document.getElementById('productName2').textContent = product2.name;
    document.getElementById('productDesc2').textContent = product2.description;
    document.getElementById('productCategory2').textContent = product2.category;
    document.getElementById('productPrice2').textContent = product2.price.toLocaleString();
    document.getElementById('productStock2').textContent = product2.stock;

    // 商品3の情報を表示
    document.getElementById('productName3').textContent = product3.name;
    document.getElementById('productDesc3').textContent = product3.description;
    document.getElementById('productCategory3').textContent = product3.category;
    document.getElementById('productPrice3').textContent = product3.price.toLocaleString();
    document.getElementById('productStock3').textContent = product3.stock;
  </script>
</body>
</html>
```

**このアプリの特徴**：
- ✅ 商品データをオブジェクトで管理
- ✅ 価格、在庫、カテゴリーなど複数の情報を整理
- ✅ toLocaleString()で価格を読みやすく表示
- ✅ プロフェッショナルなデザイン

---

## オブジェクトのメリット

### 1. データの整理

関連するデータをまとめて管理できます。

```javascript
// ❌ バラバラに管理（わかりにくい）
const userName = "太郎";
const userAge = 20;
const userCity = "東京";
const userJob = "エンジニア";

// ✅ オブジェクトで管理（わかりやすい）
const user = {
  name: "太郎",
  age: 20,
  city: "東京",
  job: "エンジニア"
};
```

### 2. 意味が明確

キー名でデータの意味がすぐわかります。

```javascript
// 配列：何のデータか分かりにくい
const data = [120000, 15, "ノートPC"];

// オブジェクト：意味が明確
const product = {
  price: 120000,
  stock: 15,
  name: "ノートPC"
};
```

### 3. 拡張しやすい

新しいプロパティを簡単に追加できます。

```javascript
const person = {
  name: "太郎",
  age: 20
};

// 後から追加可能
person.city = "東京";
person.email = "taro@example.com";
```

---

## 空のオブジェクト

何もプロパティを持たないオブジェクトも作成できます。

```javascript
// 空のオブジェクト
const emptyObject = {};

console.log(emptyObject); // => {}

// 後からプロパティを追加
emptyObject.name = "太郎";
emptyObject.age = 20;

console.log(emptyObject); // => { name: "太郎", age: 20 }
```

---

## より複雑なオブジェクト

### 配列を含むオブジェクト

```javascript
const student = {
  name: "太郎",
  age: 20,
  hobbies: ["読書", "音楽", "スポーツ"]
};

console.log(student.hobbies);    // => ["読書", "音楽", "スポーツ"]
console.log(student.hobbies[0]); // => "読書"
console.log(student.hobbies[1]); // => "音楽"
console.log(student.hobbies[2]); // => "スポーツ"
```

**実行の流れ**：

```javascript
// student.hobbies[0] にアクセスする流れ

// ステップ1: studentオブジェクトにアクセス
student
// => { name: "太郎", age: 20, hobbies: ["読書", "音楽", "スポーツ"] }

// ステップ2: hobbiesプロパティを取得
student.hobbies
// => ["読書", "音楽", "スポーツ"]

// ステップ3: 配列のインデックス0にアクセス
student.hobbies[0]
// => "読書"
```

---

## まとめ

このレッスンで学んだこと：

### 1. **オブジェクトの基本**
```javascript
const person = {
  name: "太郎",
  age: 20
};
```
- `{ }` で囲む
- `キー: 値` の形式
- カンマで区切る

### 2. **プロパティ（キーと値）**
- プロパティ = キーと値のペア
- キー: データの名前（ラベル）
- 値: 実際のデータ

### 3. **オブジェクトの表示**
```javascript
// オブジェクト全体
console.log(person);

// プロパティごと
console.log(person.name);
console.log(person.age);
```

### 4. **オブジェクトのメリット**
- ✅ データを整理できる
- ✅ 意味が明確
- ✅ 拡張しやすい

---

## カリキュラムの要件チェック

### レッスン134：最初のオブジェクト
- ✅ **let person = {name: "太郎", age: 20}**: オブジェクトリテラルの基本構文
- ✅ **プロパティの理解**: キーと値のペア、様々なデータ型
- ✅ **オブジェクトの表示**: console.log、HTMLへの表示
- ✅ **成果物：人物データ**: 複数の実践例（人物カード、チームメンバー、商品カタログ）

---

## 次のレッスンの予告

次のレッスンでは、**プロパティアクセス**について学びます。

オブジェクトのプロパティにアクセスする方法や、プロパティの値を変更・追加する方法を詳しく学んでいきましょう！
