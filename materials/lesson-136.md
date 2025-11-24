# レッスン136：プロパティ変更

## このレッスンで学ぶこと

このレッスンでは、オブジェクトのプロパティを変更、追加、削除する方法を学びます。オブジェクトは作成後も自由に編集でき、動的にプロパティを操作することができます。

## プロパティ値の変更

既存のプロパティの値を変更するには、代入演算子を使います。

### 基本的な変更方法

```javascript
let person = {
  name: "太郎",
  age: 20
};

console.log(person.age); // 20

// プロパティの値を変更
person.age = 21;

console.log(person.age); // 21
```

ドット記法またはブラケット記法を使って、プロパティの値を変更できます。

### ブラケット記法での変更

```javascript
let person = {
  name: "太郎",
  age: 20
};

person["age"] = 21;
console.log(person.age); // 21
```

どちらの記法を使っても、同じように値を変更できます。

## 新しいプロパティの追加

存在しないプロパティに値を代入すると、新しいプロパティが追加されます。

### 基本的な追加方法

```javascript
let person = {
  name: "太郎",
  age: 20
};

console.log(person); // { name: "太郎", age: 20 }

// 新しいプロパティを追加
person.city = "東京";
person.job = "学生";

console.log(person);
// { name: "太郎", age: 20, city: "東京", job: "学生" }
```

### ブラケット記法での追加

```javascript
let person = {
  name: "太郎",
  age: 20
};

person["email"] = "taro@example.com";
person["phone"] = "090-1234-5678";

console.log(person.email); // "taro@example.com"
```

## プロパティの削除

`delete`演算子を使うと、プロパティを削除できます。

### 基本的な削除方法

```javascript
let person = {
  name: "太郎",
  age: 20,
  city: "東京"
};

console.log(person); // { name: "太郎", age: 20, city: "東京" }

// プロパティを削除
delete person.city;

console.log(person); // { name: "太郎", age: 20 }
console.log(person.city); // undefined
```

`delete`演算子を使うと、プロパティ自体がオブジェクトから削除されます。

### ブラケット記法での削除

```javascript
let person = {
  name: "太郎",
  age: 20,
  email: "taro@example.com"
};

delete person["email"];
console.log(person.email); // undefined
```

## 複数の操作を組み合わせる

変更、追加、削除を組み合わせて、オブジェクトを自由に編集できます。

```javascript
let product = {
  name: "ノートPC",
  price: 120000,
  stock: 10
};

// 値を変更
product.price = 115000;

// プロパティを追加
product.category = "電子機器";
product.brand = "XYZ";

// プロパティを削除
delete product.stock;

console.log(product);
// { name: "ノートPC", price: 115000, category: "電子機器", brand: "XYZ" }
```

## 実践例：ユーザー情報の編集

ユーザー情報を編集できるプログラムを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>ユーザー情報編集</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 700px;
            margin: 50px auto;
            padding: 20px;
        }
        .user-card {
            border: 2px solid #333;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            background-color: #f9f9f9;
        }
        .property {
            padding: 10px;
            margin: 5px 0;
            background-color: white;
            border-radius: 4px;
        }
        .controls {
            margin: 20px 0;
        }
        input, button {
            padding: 10px;
            margin: 5px;
            font-size: 14px;
        }
        button {
            cursor: pointer;
        }
        .update-btn {
            background-color: #4CAF50;
            color: white;
            border: none;
        }
        .add-btn {
            background-color: #2196F3;
            color: white;
            border: none;
        }
        .delete-btn {
            background-color: #f44336;
            color: white;
            border: none;
        }
    </style>
</head>
<body>
    <h1>ユーザー情報管理</h1>

    <div class="user-card">
        <h2>現在のユーザー情報</h2>
        <div id="userInfo"></div>
    </div>

    <div class="controls">
        <h3>年齢を変更</h3>
        <input type="number" id="newAge" placeholder="新しい年齢">
        <button class="update-btn" id="updateAge">年齢を更新</button>
    </div>

    <div class="controls">
        <h3>プロパティを追加</h3>
        <input type="text" id="newKey" placeholder="キー名（例: email）">
        <input type="text" id="newValue" placeholder="値">
        <button class="add-btn" id="addProperty">プロパティを追加</button>
    </div>

    <div class="controls">
        <h3>プロパティを削除</h3>
        <input type="text" id="deleteKey" placeholder="削除するキー名">
        <button class="delete-btn" id="deleteProperty">プロパティを削除</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let user = {
  name: "山田太郎",
  age: 25,
  city: "東京"
};

let userInfo = document.getElementById("userInfo");
let updateAge = document.getElementById("updateAge");
let addProperty = document.getElementById("addProperty");
let deleteProperty = document.getElementById("deleteProperty");

// ユーザー情報を表示する関数
function displayUser() {
  userInfo.innerHTML = "";

  for (let key in user) {
    let propertyDiv = document.createElement("div");
    propertyDiv.className = "property";
    propertyDiv.textContent = key + ": " + user[key];
    userInfo.appendChild(propertyDiv);
  }
}

// 初期表示
displayUser();

// 年齢を更新
updateAge.addEventListener("click", function() {
  let newAge = document.getElementById("newAge").value;
  if (newAge !== "") {
    user.age = Number(newAge);
    displayUser();
  }
});

// プロパティを追加
addProperty.addEventListener("click", function() {
  let key = document.getElementById("newKey").value;
  let value = document.getElementById("newValue").value;

  if (key !== "" && value !== "") {
    user[key] = value;
    displayUser();
    document.getElementById("newKey").value = "";
    document.getElementById("newValue").value = "";
  }
});

// プロパティを削除
deleteProperty.addEventListener("click", function() {
  let key = document.getElementById("deleteKey").value;

  if (key !== "") {
    delete user[key];
    displayUser();
    document.getElementById("deleteKey").value = "";
  }
});
```

このプログラムでは、ユーザー情報を表示し、年齢の変更、プロパティの追加・削除を行うことができます。

## 動的なプロパティ操作

変数を使って、動的にプロパティを操作することができます。

### 変数を使った変更

```javascript
let person = {
  name: "太郎",
  age: 20,
  city: "東京"
};

let propertyName = "age";
let newValue = 21;

person[propertyName] = newValue;
console.log(person.age); // 21
```

### 変数を使った追加

```javascript
let person = {
  name: "太郎"
};

let newProperty = "age";
person[newProperty] = 20;

console.log(person.age); // 20
```

### 変数を使った削除

```javascript
let person = {
  name: "太郎",
  age: 20,
  city: "東京"
};

let propertyToDelete = "city";
delete person[propertyToDelete];

console.log(person.city); // undefined
```

## 条件に応じたプロパティ操作

条件に応じて、プロパティを操作することができます。

### 実例：在庫管理

```javascript
let product = {
  name: "ノートPC",
  price: 120000,
  stock: 5
};

// 在庫が10個未満の場合、lowStockプロパティを追加
if (product.stock < 10) {
  product.lowStock = true;
}

// 価格が変更された場合、oldPriceプロパティを追加
let newPrice = 115000;
if (newPrice !== product.price) {
  product.oldPrice = product.price;
  product.price = newPrice;
}

console.log(product);
// { name: "ノートPC", price: 115000, stock: 5, lowStock: true, oldPrice: 120000 }
```

## プロパティの存在確認

プロパティが存在するかどうかを確認してから操作することができます。

### undefined チェック

```javascript
let person = {
  name: "太郎",
  age: 20
};

// プロパティが存在しない場合のみ追加
if (person.email === undefined) {
  person.email = "taro@example.com";
}

console.log(person.email); // "taro@example.com"
```

### in 演算子

```javascript
let person = {
  name: "太郎",
  age: 20
};

if ("email" in person) {
  console.log("emailプロパティが存在します");
} else {
  console.log("emailプロパティが存在しません");
  person.email = "taro@example.com";
}
```

## 実践例：データ編集システム

商品データを編集できる実用的なシステムを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>データ編集システム</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
        }
        .product-display {
            border: 2px solid #4CAF50;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            background-color: #f1f8f4;
        }
        .property-item {
            padding: 12px;
            margin: 8px 0;
            background-color: white;
            border-left: 4px solid #4CAF50;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
        }
        .edit-section {
            margin: 30px 0;
            padding: 20px;
            background-color: #f5f5f5;
            border-radius: 8px;
        }
        input {
            padding: 8px;
            margin: 5px;
            font-size: 14px;
        }
        button {
            padding: 10px 15px;
            margin: 5px;
            cursor: pointer;
            border: none;
            border-radius: 4px;
            font-size: 14px;
        }
        .btn-update {
            background-color: #2196F3;
            color: white;
        }
        .btn-add {
            background-color: #4CAF50;
            color: white;
        }
        .btn-delete {
            background-color: #f44336;
            color: white;
        }
    </style>
</head>
<body>
    <h1>商品データ編集システム</h1>

    <div class="product-display">
        <h2>商品情報</h2>
        <div id="productDisplay"></div>
    </div>

    <div class="edit-section">
        <h3>価格を変更</h3>
        <input type="number" id="newPrice" placeholder="新しい価格">
        <button class="btn-update" id="updatePrice">価格を更新</button>
    </div>

    <div class="edit-section">
        <h3>在庫を変更</h3>
        <input type="number" id="newStock" placeholder="新しい在庫数">
        <button class="btn-update" id="updateStock">在庫を更新</button>
    </div>

    <div class="edit-section">
        <h3>カテゴリを追加</h3>
        <input type="text" id="category" placeholder="カテゴリ名">
        <button class="btn-add" id="addCategory">カテゴリを追加</button>
    </div>

    <div class="edit-section">
        <h3>割引情報を追加/削除</h3>
        <input type="number" id="discount" placeholder="割引率（%）">
        <button class="btn-add" id="addDiscount">割引を追加</button>
        <button class="btn-delete" id="removeDiscount">割引を削除</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let product = {
  name: "ワイヤレスマウス",
  price: 3000,
  stock: 50
};

let productDisplay = document.getElementById("productDisplay");

// 商品情報を表示する関数
function displayProduct() {
  productDisplay.innerHTML = "";

  for (let key in product) {
    let div = document.createElement("div");
    div.className = "property-item";

    let keySpan = document.createElement("span");
    keySpan.textContent = key + ":";
    keySpan.style.fontWeight = "bold";

    let valueSpan = document.createElement("span");
    valueSpan.textContent = product[key];

    div.appendChild(keySpan);
    div.appendChild(valueSpan);
    productDisplay.appendChild(div);
  }
}

// 初期表示
displayProduct();

// 価格を更新
document.getElementById("updatePrice").addEventListener("click", function() {
  let newPrice = document.getElementById("newPrice").value;
  if (newPrice !== "") {
    product.price = Number(newPrice);
    displayProduct();
    document.getElementById("newPrice").value = "";
  }
});

// 在庫を更新
document.getElementById("updateStock").addEventListener("click", function() {
  let newStock = document.getElementById("newStock").value;
  if (newStock !== "") {
    product.stock = Number(newStock);
    displayProduct();
    document.getElementById("newStock").value = "";
  }
});

// カテゴリを追加
document.getElementById("addCategory").addEventListener("click", function() {
  let category = document.getElementById("category").value;
  if (category !== "") {
    product.category = category;
    displayProduct();
    document.getElementById("category").value = "";
  }
});

// 割引を追加
document.getElementById("addDiscount").addEventListener("click", function() {
  let discount = document.getElementById("discount").value;
  if (discount !== "") {
    product.discount = Number(discount) + "%";
    displayProduct();
    document.getElementById("discount").value = "";
  }
});

// 割引を削除
document.getElementById("removeDiscount").addEventListener("click", function() {
  delete product.discount;
  displayProduct();
});
```

## よくあるパターン

### パターン1：一括更新

```javascript
let user = {
  name: "太郎",
  age: 20
};

// 複数のプロパティを一度に更新
user.age = 21;
user.city = "東京";
user.job = "学生";

console.log(user);
```

### パターン2：条件付き追加

```javascript
let product = {
  name: "商品A",
  price: 1000
};

let hasDiscount = true;

if (hasDiscount) {
  product.discount = "10%";
}
```

### パターン3：古い値を保存してから更新

```javascript
let settings = {
  theme: "light",
  fontSize: 14
};

// 古い値を保存
settings.previousTheme = settings.theme;

// 新しい値に更新
settings.theme = "dark";

console.log(settings);
// { theme: "dark", fontSize: 14, previousTheme: "light" }
```

## 注意点

### 1. delete の返り値

`delete`演算子は成功すると`true`を返します。

```javascript
let obj = {
  name: "太郎"
};

let result = delete obj.name;
console.log(result); // true
```

### 2. プロパティを削除 vs undefined を代入

プロパティを削除することと、`undefined`を代入することは異なります。

```javascript
let obj = {
  name: "太郎",
  age: 20
};

// undefined を代入（プロパティは残る）
obj.name = undefined;
console.log("name" in obj); // true

// プロパティを削除（プロパティがなくなる）
delete obj.age;
console.log("age" in obj); // false
```

### 3. 存在しないプロパティの削除

存在しないプロパティを削除してもエラーにはなりません。

```javascript
let obj = {
  name: "太郎"
};

delete obj.age; // エラーにならない
```

## 練習問題

次の仕様を満たすプログラムを作成してください。

### 仕様

1. HTMLに以下の要素を作成する
   - `id="display"`のdiv要素
   - `id="updateName"`のbutton要素（テキスト: 名前を変更）
   - `id="addEmail"`のbutton要素（テキスト: メールを追加）
   - `id="deleteCity"`のbutton要素（テキスト: 都市を削除）

2. JavaScriptで以下を実装する
   - `student`という名前のオブジェクトを作成する
     - name: "田中"
     - age: 18
     - city: "大阪"
   - 初期状態でstudentの全プロパティを`display`に表示する
   - 「名前を変更」ボタンをクリックすると、nameを"鈴木"に変更して再表示
   - 「メールを追加」ボタンをクリックすると、emailプロパティ（値: "suzuki@example.com"）を追加して再表示
   - 「都市を削除」ボタンをクリックすると、cityプロパティを削除して再表示

### ヒント

- for...in ループでオブジェクトの全プロパティを表示できます
- プロパティの変更は `object.property = value` で行います
- プロパティの削除は `delete object.property` で行います

## まとめ

このレッスンでは、以下のことを学びました。

1. プロパティ値の変更（`object.property = newValue`）
2. 新しいプロパティの追加（存在しないプロパティへの代入）
3. プロパティの削除（`delete`演算子）
4. ドット記法とブラケット記法の両方でプロパティを操作できる
5. 変数を使った動的なプロパティ操作
6. 条件に応じたプロパティ操作
7. 実践的なデータ編集システムの作成

オブジェクトのプロパティを自由に操作できるようになることで、より柔軟なプログラムを作成できるようになりました。次のレッスンでは、オブジェクトのさらに高度な機能について学んでいきます。
