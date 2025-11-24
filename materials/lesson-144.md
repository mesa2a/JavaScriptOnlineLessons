# レッスン144：オブジェクトと関数

## 学習目標
- 関数の引数としてオブジェクトを渡す方法を学ぶ
- 関数からオブジェクトを返す方法を理解する
- 設定オブジェクトパターンを習得する
- オブジェクトを効果的に扱う関数の書き方を学ぶ

## 関数の引数にオブジェクトを渡す

オブジェクトを関数の引数として渡すことで、複数の関連するデータをまとめて処理できます。

### 基本的な使い方

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

### 複数の引数よりもオブジェクトを使う利点

```javascript
// 悪い例：引数が多すぎる
function createUser(name, age, email, address, phone, role) {
  // 順序を間違えやすい
}

// 良い例：オブジェクトにまとめる
function createUser(userInfo) {
  console.log(userInfo.name);
  console.log(userInfo.age);
  console.log(userInfo.email);
  // 必要なプロパティだけアクセス
}

let newUser = {
  name: "佐藤",
  age: 30,
  email: "sato@example.com",
  address: "大阪",
  phone: "090-1234-5678",
  role: "admin"
};

createUser(newUser);
```

## オブジェクトを返す関数

関数はオブジェクトを返すこともできます。これは、複数の値を返したい時に便利です。

### 基本的な使い方

```javascript
function createProduct(name, price) {
  return {
    name: name,
    price: price,
    inStock: true,
    createdAt: new Date().toISOString()
  };
}

let product = createProduct("ノート", 200);
console.log(product.name);     // "ノート"
console.log(product.price);    // 200
console.log(product.inStock);  // true
```

### 省略記法

プロパティ名と変数名が同じ場合は、省略できます：

```javascript
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

## 計算結果を含むオブジェクトを返す

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

## 設定オブジェクトパターン

設定オブジェクトは、関数のオプションをまとめて渡すパターンです。

### デフォルト値との組み合わせ

```javascript
function createAlert(message, options) {
  // デフォルト設定
  let defaultOptions = {
    type: "info",
    duration: 3000,
    position: "top",
    closable: true
  };

  // ユーザー設定をマージ
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

// すべてデフォルトを使用
createAlert("情報を読み込み中", {});
```

### 実用例：検索関数

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
// [{ name: "ノート", price: 200, ... }]
```

## オブジェクトを加工する関数

```javascript
function enrichUser(user) {
  return {
    ...user,
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
//   age: 28,
//   isAdult: true
// }
```

## フォームデータの検証

```javascript
function validateForm(formData) {
  let errors = [];

  if (!formData.username || formData.username.length < 3) {
    errors.push("ユーザー名は3文字以上必要です");
  }

  if (!formData.email || formData.email.indexOf("@") === -1) {
    errors.push("有効なメールアドレスを入力してください");
  }

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

## データ変換の関数

```javascript
function transformUser(rawData) {
  return {
    id: rawData.user_id,
    name: rawData.full_name,
    email: rawData.email_address,
    role: rawData.user_role,
    active: rawData.is_active === "1"
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

## オブジェクトの配列を処理する

```javascript
function calculateTotalPrice(items) {
  let subtotal = 0;
  let tax = 0;

  for (let i = 0; i < items.length; i++) {
    subtotal = subtotal + (items[i].price * items[i].quantity);
  }

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
```

## まとめ

オブジェクトと関数を組み合わせることで、より実用的なプログラムが書けます：

1. **引数にオブジェクト**: 複数の関連データをまとめて渡す
2. **オブジェクトを返す**: 複数の値を返す、計算結果をまとめる
3. **設定オブジェクト**: オプションをまとめて渡す
4. **データ変換**: 異なる形式のデータを変換
5. **検証と加工**: データをチェックして整形

次のレッスンでは、オブジェクトの週のプロジェクトに挑戦します。

## 練習問題

以下の関数を実装してください：

1. **商品オブジェクトを受け取り、税込価格を計算して新しいオブジェクトを返す関数**
   ```javascript
   function addTaxToProduct(product, taxRate) {
     // product: { name, price, category }
     // 返り値: 元のプロパティ + priceWithTax
   }
   ```

2. **ユーザー配列から、特定の条件に合うユーザーを検索する関数**
   ```javascript
   function findUsers(users, criteria) {
     // criteria: { minAge, maxAge, city }
     // 返り値: 条件に合うユーザーの配列
   }
   ```

3. **注文データから統計情報を計算する関数**
   ```javascript
   function getOrderStats(orders) {
     // 返り値: { totalOrders, totalAmount, averageAmount }
   }
   ```
