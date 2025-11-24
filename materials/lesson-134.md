# レッスン134：最初のオブジェクト

## このレッスンで学ぶこと

このレッスンでは、JavaScriptのオブジェクトについて学びます。オブジェクトは、関連するデータをまとめて管理するための便利な仕組みです。これまで学んできた変数や配列とは異なり、名前付きのデータを扱うことができます。

## オブジェクトとは

オブジェクトは、複数のデータをまとめて管理するためのデータ構造です。配列が番号（インデックス）でデータを管理するのに対し、オブジェクトは名前（キー）でデータを管理します。

### 配列との違い

**配列の場合**
```javascript
let personArray = ["太郎", 20, "東京"];
console.log(personArray[0]); // "太郎"
console.log(personArray[1]); // 20
```

配列では、データが何を意味するのか、番号だけでは分かりにくいです。

**オブジェクトの場合**
```javascript
let person = {
  name: "太郎",
  age: 20,
  city: "東京"
};
console.log(person.name); // "太郎"
console.log(person.age); // 20
```

オブジェクトでは、データに名前が付いているため、何のデータかすぐに分かります。

## オブジェクトリテラル

オブジェクトを作成する最も基本的な方法は、オブジェクトリテラルを使うことです。

### 基本的な書き方

```javascript
let person = {
  name: "太郎",
  age: 20
};
```

**構文の説明**
- `{ }`: 波括弧でオブジェクトを囲みます
- `name: "太郎"`: キー（name）と値（"太郎"）をコロンで区切ります
- `,`: 複数のプロパティをカンマで区切ります
- 最後のプロパティの後のカンマは省略できます

### 空のオブジェクト

```javascript
let emptyObject = {};
```

何もプロパティを持たないオブジェクトも作成できます。

## プロパティの理解

オブジェクトの中にあるデータの1つ1つを「プロパティ」と呼びます。プロパティは「キー」と「値」のペアで構成されます。

### キーと値

```javascript
let book = {
  title: "JavaScriptの本",  // キー: title, 値: "JavaScriptの本"
  price: 2000,              // キー: price, 値: 2000
  pages: 300                // キー: pages, 値: 300
};
```

- **キー（Key）**: プロパティの名前
- **値（Value）**: プロパティに格納されるデータ

### 値には様々なデータ型を使える

```javascript
let data = {
  text: "文字列",        // 文字列
  number: 100,          // 数値
  flag: true,           // 真偽値
  empty: null,          // null
  list: [1, 2, 3]       // 配列
};
```

オブジェクトの値には、文字列、数値、真偽値、配列など、あらゆるデータ型を格納できます。

## プロパティへのアクセス

オブジェクトのプロパティにアクセスするには、ドット記法を使います。

### ドット記法

```javascript
let person = {
  name: "太郎",
  age: 20
};

console.log(person.name); // "太郎"
console.log(person.age);  // 20
```

`オブジェクト名.キー名`の形式で、プロパティの値を取得できます。

### プロパティの値を変更する

```javascript
let person = {
  name: "太郎",
  age: 20
};

person.age = 21;
console.log(person.age); // 21
```

ドット記法を使って、プロパティの値を変更することもできます。

### 新しいプロパティを追加する

```javascript
let person = {
  name: "太郎",
  age: 20
};

person.city = "東京";
console.log(person.city); // "東京"
```

存在しないプロパティに値を代入すると、新しいプロパティが追加されます。

## オブジェクトの表示

オブジェクトを表示する方法はいくつかあります。

### console.logで表示

```javascript
let person = {
  name: "太郎",
  age: 20
};

console.log(person);
// { name: "太郎", age: 20 }
```

オブジェクト全体をそのまま`console.log()`に渡すと、オブジェクトの内容が表示されます。

### プロパティを個別に表示

```javascript
let person = {
  name: "太郎",
  age: 20
};

console.log("名前: " + person.name);
console.log("年齢: " + person.age);
// 名前: 太郎
// 年齢: 20
```

プロパティを1つずつ取り出して表示することもできます。

### HTMLに表示する

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>オブジェクト表示</title>
</head>
<body>
    <h1>人物情報</h1>
    <p id="info"></p>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let person = {
  name: "太郎",
  age: 20,
  city: "東京"
};

let info = document.getElementById("info");
info.textContent = "名前: " + person.name + ", 年齢: " + person.age + ", 都市: " + person.city;
```

## 実践例：人物データの管理

人物の情報をオブジェクトで管理するプログラムを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>人物データ</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }
        .person-card {
            border: 2px solid #333;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            background-color: #f9f9f9;
        }
        .label {
            font-weight: bold;
            color: #555;
        }
        .value {
            color: #000;
            margin-left: 10px;
        }
    </style>
</head>
<body>
    <h1>人物データ管理</h1>

    <div class="person-card">
        <h2>人物1</h2>
        <p><span class="label">名前:</span><span class="value" id="name1"></span></p>
        <p><span class="label">年齢:</span><span class="value" id="age1"></span></p>
        <p><span class="label">職業:</span><span class="value" id="job1"></span></p>
    </div>

    <div class="person-card">
        <h2>人物2</h2>
        <p><span class="label">名前:</span><span class="value" id="name2"></span></p>
        <p><span class="label">年齢:</span><span class="value" id="age2"></span></p>
        <p><span class="label">職業:</span><span class="value" id="job2"></span></p>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
// 人物1のデータ
let person1 = {
  name: "太郎",
  age: 25,
  job: "エンジニア"
};

// 人物2のデータ
let person2 = {
  name: "花子",
  age: 30,
  job: "デザイナー"
};

// 人物1の情報を表示
document.getElementById("name1").textContent = person1.name;
document.getElementById("age1").textContent = person1.age;
document.getElementById("job1").textContent = person1.job;

// 人物2の情報を表示
document.getElementById("name2").textContent = person2.name;
document.getElementById("age2").textContent = person2.age;
document.getElementById("job2").textContent = person2.job;
```

このプログラムでは、2人の人物データをオブジェクトで管理し、それぞれの情報を画面に表示しています。

## オブジェクトのメリット

### 1. データの整理

関連するデータをまとめて管理できます。

```javascript
// バラバラに管理（わかりにくい）
let userName = "太郎";
let userAge = 20;
let userCity = "東京";

// オブジェクトで管理（わかりやすい）
let user = {
  name: "太郎",
  age: 20,
  city: "東京"
};
```

### 2. 意味が明確

キー名でデータの意味が明確になります。

```javascript
console.log(person.age); // ageが年齢だとすぐわかる
```

### 3. 拡張しやすい

新しいプロパティを簡単に追加できます。

```javascript
let person = {
  name: "太郎",
  age: 20
};

person.email = "taro@example.com"; // 後から追加
```

## より複雑なオブジェクト

オブジェクトには、配列やさらに別のオブジェクトを含めることもできます。

### 配列を含むオブジェクト

```javascript
let student = {
  name: "太郎",
  age: 20,
  hobbies: ["読書", "音楽", "スポーツ"]
};

console.log(student.hobbies[0]); // "読書"
```

### オブジェクトを含むオブジェクト（ネストしたオブジェクト）

```javascript
let person = {
  name: "太郎",
  age: 20,
  address: {
    prefecture: "東京都",
    city: "新宿区"
  }
};

console.log(person.address.city); // "新宿区"
```

## 実践例：商品データの表示

商品情報をオブジェクトで管理し、HTMLに表示するプログラムを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>商品データ</title>
    <style>
        .product {
            border: 1px solid #ddd;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
        }
        .product-name {
            font-size: 20px;
            font-weight: bold;
            color: #333;
        }
        .product-price {
            font-size: 18px;
            color: #e74c3c;
            margin: 10px 0;
        }
        .product-stock {
            color: #27ae60;
        }
    </style>
</head>
<body>
    <h1>商品一覧</h1>
    <div id="productList"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let product = {
  name: "ノートPC",
  price: 120000,
  stock: 15,
  category: "電子機器"
};

let productList = document.getElementById("productList");

let productDiv = document.createElement("div");
productDiv.className = "product";

productDiv.innerHTML =
  '<div class="product-name">' + product.name + '</div>' +
  '<div class="product-price">価格: ' + product.price + '円</div>' +
  '<div class="product-stock">在庫: ' + product.stock + '個</div>' +
  '<div>カテゴリ: ' + product.category + '</div>';

productList.appendChild(productDiv);
```

## よくあるパターン

### パターン1：条件に応じた表示

```javascript
let user = {
  name: "太郎",
  age: 17,
  isPremium: true
};

if (user.age >= 18) {
  console.log(user.name + "さんは成人です");
} else {
  console.log(user.name + "さんは未成年です");
}

if (user.isPremium) {
  console.log("プレミアム会員です");
}
```

### パターン2：プロパティの存在確認

```javascript
let person = {
  name: "太郎",
  age: 20
};

if (person.email === undefined) {
  console.log("メールアドレスが設定されていません");
}
```

### パターン3：デフォルト値の設定

```javascript
let settings = {
  theme: "dark",
  language: "ja"
};

// notificationsが未設定の場合はtrueを使用
let notifications = settings.notifications !== undefined ? settings.notifications : true;
console.log(notifications); // true
```

## 注意点

### 1. キー名の制約

キー名には、変数名と同じルールが適用されます。

```javascript
// 正しい
let obj = {
  name: "太郎",
  firstName: "太郎",
  first_name: "太郎"
};

// スペースや特殊文字を含む場合は引用符が必要
let obj2 = {
  "first name": "太郎",
  "user-id": 123
};
```

### 2. プロパティの順序

オブジェクトのプロパティには順序の概念がありません（配列とは異なります）。

```javascript
let obj1 = {name: "太郎", age: 20};
let obj2 = {age: 20, name: "太郎"};
// 両方とも同じ意味
```

### 3. 存在しないプロパティへのアクセス

存在しないプロパティにアクセスすると、`undefined`が返されます。

```javascript
let person = {
  name: "太郎"
};

console.log(person.age); // undefined
```

## 練習問題

次の仕様を満たすプログラムを作成してください。

### 仕様

1. HTMLに以下の要素を作成する
   - `id="bookTitle"`のp要素
   - `id="bookAuthor"`のp要素
   - `id="bookPrice"`のp要素
   - `id="bookPages"`のp要素

2. JavaScriptで以下を実装する
   - `book`という名前のオブジェクトを作成する
   - プロパティ: `title`（値: "JavaScript入門"）
   - プロパティ: `author`（値: "山田太郎"）
   - プロパティ: `price`（値: 2800）
   - プロパティ: `pages`（値: 350）
   - 各プロパティの値を対応するHTML要素に表示する

### ヒント

- オブジェクトリテラル`{ }`を使ってオブジェクトを作成します
- ドット記法でプロパティにアクセスします
- `textContent`でHTML要素に値を設定します

## まとめ

このレッスンでは、以下のことを学びました。

1. オブジェクトとは、関連するデータをまとめて管理する仕組み
2. オブジェクトリテラル`{ }`を使ったオブジェクトの作成
3. プロパティはキーと値のペアで構成される
4. ドット記法を使ったプロパティへのアクセス
5. プロパティの値の変更と新しいプロパティの追加
6. オブジェクトをコンソールやHTMLに表示する方法
7. 実践的な人物データ・商品データの管理

オブジェクトは、JavaScriptで複雑なデータを扱う上で非常に重要な概念です。次のレッスンでは、オブジェクトのより高度な使い方について学んでいきます。
