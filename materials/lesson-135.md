# レッスン135：プロパティアクセス

## このレッスンで学ぶこと

このレッスンでは、オブジェクトのプロパティにアクセスする2つの方法を学びます。ドット記法とブラケット記法という2つの書き方があり、それぞれに特徴と使いどころがあります。

## ドット記法の復習

前のレッスンで学んだドット記法は、プロパティにアクセスする最も基本的な方法です。

### 基本的な使い方

```javascript
let person = {
  name: "太郎",
  age: 20,
  city: "東京"
};

console.log(person.name); // "太郎"
console.log(person.age);  // 20
console.log(person.city); // "東京"
```

`オブジェクト名.プロパティ名`の形式で、プロパティの値を取得できます。

## ブラケット記法

ブラケット記法は、角括弧`[]`を使ってプロパティにアクセスする方法です。

### 基本的な使い方

```javascript
let person = {
  name: "太郎",
  age: 20,
  city: "東京"
};

console.log(person["name"]); // "太郎"
console.log(person["age"]);  // 20
console.log(person["city"]); // "東京"
```

`オブジェクト名["プロパティ名"]`の形式で、プロパティの値を取得できます。プロパティ名は文字列として指定します。

### ドット記法とブラケット記法の結果は同じ

```javascript
let person = {
  name: "太郎",
  age: 20
};

// 両方とも同じ結果
console.log(person.name);    // "太郎"
console.log(person["name"]); // "太郎"

console.log(person.age);     // 20
console.log(person["age"]);  // 20
```

どちらの記法を使っても、同じプロパティにアクセスできます。

## ブラケット記法の利点

ブラケット記法には、ドット記法ではできないことができます。

### 1. 変数を使ったアクセス

ブラケット記法では、変数に格納されたプロパティ名を使ってアクセスできます。

```javascript
let person = {
  name: "太郎",
  age: 20,
  city: "東京"
};

let propertyName = "name";
console.log(person[propertyName]); // "太郎"

propertyName = "age";
console.log(person[propertyName]); // 20
```

ドット記法では、変数を使うことはできません。

```javascript
// これは動作しない
console.log(person.propertyName); // undefined
```

### 2. スペースや特殊文字を含むプロパティ名

プロパティ名にスペースや特殊文字が含まれる場合、ブラケット記法を使う必要があります。

```javascript
let data = {
  "first name": "太郎",
  "user-id": 12345,
  "email address": "taro@example.com"
};

console.log(data["first name"]);     // "太郎"
console.log(data["user-id"]);        // 12345
console.log(data["email address"]);  // "taro@example.com"

// ドット記法では動作しない
// console.log(data.first name); // エラー
```

### 3. 数字で始まるプロパティ名

プロパティ名が数字で始まる場合も、ブラケット記法を使います。

```javascript
let scores = {
  "1st": 100,
  "2nd": 95,
  "3rd": 90
};

console.log(scores["1st"]); // 100
console.log(scores["2nd"]); // 95
```

## 実践例：動的なプロパティアクセス

変数を使って、ユーザーの入力に応じて異なるプロパティにアクセスする例を見てみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>動的プロパティアクセス</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }
        select, button {
            padding: 10px;
            font-size: 16px;
            margin: 10px 0;
        }
        #result {
            margin-top: 20px;
            padding: 15px;
            background-color: #f0f0f0;
            border-radius: 5px;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <h1>人物データ取得</h1>

    <label>取得する情報を選択:</label><br>
    <select id="propertySelect">
        <option value="name">名前</option>
        <option value="age">年齢</option>
        <option value="city">都市</option>
        <option value="job">職業</option>
    </select><br>

    <button id="getButton">情報を取得</button>

    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let person = {
  name: "太郎",
  age: 25,
  city: "東京",
  job: "エンジニア"
};

let propertySelect = document.getElementById("propertySelect");
let getButton = document.getElementById("getButton");
let result = document.getElementById("result");

getButton.addEventListener("click", function() {
  let selectedProperty = propertySelect.value;

  // ブラケット記法を使って動的にアクセス
  let value = person[selectedProperty];

  result.textContent = "選択した情報: " + value;
});
```

このプログラムでは、ユーザーが選択したプロパティに応じて、異なる値を表示します。

## 値の取得と表示

両方の記法を使って、オブジェクトのデータを取得し表示する例を見てみましょう。

### 実践例：商品情報の表示

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>商品情報</title>
    <style>
        .product-card {
            border: 2px solid #333;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            background-color: #f9f9f9;
        }
        .info-row {
            margin: 10px 0;
            padding: 10px;
            background-color: white;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>商品情報表示</h1>

    <div class="product-card">
        <h2>ドット記法で取得</h2>
        <div class="info-row" id="dotName"></div>
        <div class="info-row" id="dotPrice"></div>
        <div class="info-row" id="dotStock"></div>
    </div>

    <div class="product-card">
        <h2>ブラケット記法で取得</h2>
        <div class="info-row" id="bracketName"></div>
        <div class="info-row" id="bracketPrice"></div>
        <div class="info-row" id="bracketStock"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let product = {
  name: "ノートPC",
  price: 120000,
  stock: 15,
  category: "電子機器"
};

// ドット記法で取得
document.getElementById("dotName").textContent = "商品名: " + product.name;
document.getElementById("dotPrice").textContent = "価格: " + product.price + "円";
document.getElementById("dotStock").textContent = "在庫: " + product.stock + "個";

// ブラケット記法で取得
document.getElementById("bracketName").textContent = "商品名: " + product["name"];
document.getElementById("bracketPrice").textContent = "価格: " + product["price"] + "円";
document.getElementById("bracketStock").textContent = "在庫: " + product["stock"] + "個";
```

どちらの記法を使っても、同じ結果が得られます。

## ループでプロパティを取得

ブラケット記法を使うと、複数のプロパティを効率的に処理できます。

### 配列を使った反復処理

```javascript
let person = {
  name: "太郎",
  age: 20,
  city: "東京",
  job: "学生"
};

let properties = ["name", "age", "city", "job"];

properties.forEach(function(prop) {
  console.log(prop + ": " + person[prop]);
});

// 出力:
// name: 太郎
// age: 20
// city: 東京
// job: 学生
```

## 実践例：データ取得システム

複数のプロパティを動的に取得・表示するシステムを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>データ取得システム</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
        }
        .user-card {
            border: 2px solid #4CAF50;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            background-color: #f1f8f4;
        }
        .property-list {
            list-style: none;
            padding: 0;
        }
        .property-item {
            padding: 12px;
            margin: 8px 0;
            background-color: white;
            border-left: 4px solid #4CAF50;
            border-radius: 4px;
        }
        .property-key {
            font-weight: bold;
            color: #2E7D32;
        }
        .property-value {
            color: #1B5E20;
        }
        button {
            padding: 10px 20px;
            font-size: 16px;
            margin: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>ユーザーデータ取得システム</h1>

    <div>
        <button id="showAll">すべて表示</button>
        <button id="showBasic">基本情報のみ</button>
        <button id="showContact">連絡先のみ</button>
    </div>

    <div id="userCard" class="user-card">
        <h2>ユーザー情報</h2>
        <ul id="propertyList" class="property-list"></ul>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let user = {
  name: "山田太郎",
  age: 28,
  email: "yamada@example.com",
  phone: "090-1234-5678",
  city: "東京",
  job: "Webデザイナー"
};

let showAll = document.getElementById("showAll");
let showBasic = document.getElementById("showBasic");
let showContact = document.getElementById("showContact");
let propertyList = document.getElementById("propertyList");

// プロパティを表示する関数
function displayProperties(properties) {
  propertyList.innerHTML = "";

  properties.forEach(function(prop) {
    let li = document.createElement("li");
    li.className = "property-item";

    let keySpan = document.createElement("span");
    keySpan.className = "property-key";
    keySpan.textContent = prop + ": ";

    let valueSpan = document.createElement("span");
    valueSpan.className = "property-value";
    valueSpan.textContent = user[prop]; // ブラケット記法で取得

    li.appendChild(keySpan);
    li.appendChild(valueSpan);
    propertyList.appendChild(li);
  });
}

// すべて表示
showAll.addEventListener("click", function() {
  let allProperties = ["name", "age", "email", "phone", "city", "job"];
  displayProperties(allProperties);
});

// 基本情報のみ
showBasic.addEventListener("click", function() {
  let basicProperties = ["name", "age", "city"];
  displayProperties(basicProperties);
});

// 連絡先のみ
showContact.addEventListener("click", function() {
  let contactProperties = ["email", "phone"];
  displayProperties(contactProperties);
});
```

このプログラムでは、ブラケット記法を使って、選択されたプロパティのみを動的に表示しています。

## ドット記法とブラケット記法の使い分け

### ドット記法を使う場面

- プロパティ名が事前に分かっている場合
- プロパティ名が有効な変数名の場合（スペースや特殊文字がない）
- コードが読みやすくなる

```javascript
// 推奨
console.log(person.name);
console.log(person.age);
```

### ブラケット記法を使う場面

- プロパティ名が変数に格納されている場合
- プロパティ名にスペースや特殊文字が含まれる場合
- プロパティ名が動的に決まる場合

```javascript
// 変数を使う場合
let prop = "name";
console.log(person[prop]);

// スペースを含む場合
console.log(data["first name"]);
```

## 存在しないプロパティへのアクセス

どちらの記法でも、存在しないプロパティにアクセスすると`undefined`が返されます。

```javascript
let person = {
  name: "太郎",
  age: 20
};

console.log(person.email);     // undefined
console.log(person["phone"]);  // undefined
```

## よくあるパターン

### パターン1：デフォルト値の設定

```javascript
let settings = {
  theme: "dark"
};

let language = settings.language !== undefined ? settings.language : "ja";
console.log(language); // "ja"
```

### パターン2：条件に応じたプロパティアクセス

```javascript
let person = {
  firstName: "太郎",
  lastName: "山田"
};

let useFullName = true;
let propertyName = useFullName ? "firstName" : "lastName";
console.log(person[propertyName]); // "太郎"
```

### パターン3：複数のプロパティをまとめて表示

```javascript
let book = {
  title: "JavaScript入門",
  author: "山田太郎",
  year: 2024,
  pages: 350
};

let properties = ["title", "author", "year", "pages"];

properties.forEach(function(prop) {
  console.log(prop + ": " + book[prop]);
});
```

## 注意点

### 1. ブラケット記法では文字列を使う

```javascript
let person = {
  name: "太郎"
};

// 正しい
console.log(person["name"]);

// 間違い（変数nameを探そうとする）
// console.log(person[name]);
```

### 2. 変数を使う場合は引用符なし

```javascript
let propertyName = "name";

// 正しい
console.log(person[propertyName]);

// 間違い（"propertyName"という名前のプロパティを探す）
// console.log(person["propertyName"]);
```

### 3. ドット記法では変数は使えない

```javascript
let prop = "name";

// これは動作しない
// console.log(person.prop); // undefined

// ブラケット記法を使う
console.log(person[prop]); // "太郎"
```

## 練習問題

次の仕様を満たすプログラムを作成してください。

### 仕様

1. HTMLに以下の要素を作成する
   - `id="keyInput"`のinput要素
   - `id="getButton"`のbutton要素（テキスト: 取得）
   - `id="result"`のp要素

2. JavaScriptで以下を実装する
   - `car`という名前のオブジェクトを作成する
     - brand: "トヨタ"
     - model: "プリウス"
     - year: 2023
     - color: "白"
   - 「取得」ボタンをクリックしたとき、`keyInput`に入力されたプロパティ名の値を`result`に表示する
   - プロパティが存在しない場合は「プロパティが見つかりません」と表示する

### ヒント

- ブラケット記法を使って、入力されたプロパティ名で値を取得します
- `input.value`で入力値を取得します
- 値が`undefined`かどうかで、プロパティの存在を確認できます

## まとめ

このレッスンでは、以下のことを学びました。

1. ドット記法の復習（`object.property`）
2. ブラケット記法の基本（`object["property"]`）
3. 両方の記法は同じ結果を返す
4. ブラケット記法の利点
   - 変数を使ったアクセス
   - スペースや特殊文字を含むプロパティ名
   - 動的なプロパティアクセス
5. ドット記法とブラケット記法の使い分け
6. 実践的なデータ取得システムの作成

プロパティへのアクセス方法を理解することで、より柔軟にオブジェクトを扱えるようになりました。次のレッスンでは、オブジェクトのさらに高度な操作について学んでいきます。
