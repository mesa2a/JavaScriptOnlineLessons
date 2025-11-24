# レッスン141：オブジェクトのコピー

## 学習目標
- オブジェクトの参照の仕組みを理解する
- Object.assign()を使ったオブジェクトのコピー方法を学ぶ
- スプレッド構文によるオブジェクトのコピーを習得する
- シャローコピーとディープコピーの違いを知る

## オブジェクトと参照

プリミティブ型（数値、文字列など）とは異なり、オブジェクトは**参照型**です。これは重要な特性で、予期しない動作の原因になることがあります。

### 参照のコピー

```javascript
let person1 = {
  name: "田中",
  age: 25
};

let person2 = person1;
person2.name = "佐藤";

console.log(person1.name);  // "佐藤"
console.log(person2.name);  // "佐藤"
```

`person2 = person1` は、**オブジェクトそのものをコピーしているのではなく、参照（メモリアドレス）をコピーしています**。両方の変数が同じオブジェクトを指しているため、一方を変更すると他方も変わります。

### 配列との比較

```javascript
// プリミティブ型
let a = 10;
let b = a;
b = 20;
console.log(a);  // 10（変わらない）

// オブジェクト型
let obj1 = { value: 10 };
let obj2 = obj1;
obj2.value = 20;
console.log(obj1.value);  // 20（変わってしまう！）
```

## Object.assign()を使ったコピー

オブジェクトを独立してコピーするには、`Object.assign()` メソッドを使います。

### 基本的な使い方

```javascript
let original = {
  name: "田中",
  age: 25
};

let copy = Object.assign({}, original);
copy.name = "佐藤";

console.log(original.name);  // "田中"（変わらない）
console.log(copy.name);      // "佐藤"
```

`Object.assign({}, original)` は、空のオブジェクト `{}` に `original` のプロパティをコピーして、新しいオブジェクトを作ります。

### 構文

```javascript
Object.assign(コピー先, コピー元)
```

最初の引数が空のオブジェクト `{}` で、2番目の引数がコピーしたいオブジェクトです。

### 複数のオブジェクトをマージ

```javascript
let defaults = {
  theme: "light",
  fontSize: 14
};

let userSettings = {
  theme: "dark"
};

let settings = Object.assign({}, defaults, userSettings);
console.log(settings);
// { theme: "dark", fontSize: 14 }
```

複数のオブジェクトを指定すると、後のオブジェクトが前のオブジェクトのプロパティを上書きします。

## スプレッド構文を使ったコピー

ES6では、スプレッド構文（`...`）を使ってオブジェクトをコピーできます。こちらの方がよく使われます。

### 基本的な使い方

```javascript
let original = {
  name: "鈴木",
  age: 30
};

let copy = { ...original };
copy.name = "山田";

console.log(original.name);  // "鈴木"（変わらない）
console.log(copy.name);      // "山田"
```

`{ ...original }` は、`original` のすべてのプロパティを展開して新しいオブジェクトを作ります。

### プロパティの追加

スプレッド構文を使うと、コピーと同時に新しいプロパティを追加できます：

```javascript
let person = {
  name: "田中",
  age: 25
};

let employee = {
  ...person,
  company: "ABC株式会社",
  position: "エンジニア"
};

console.log(employee);
// { name: "田中", age: 25, company: "ABC株式会社", position: "エンジニア" }
```

### プロパティの上書き

```javascript
let product = {
  name: "ノート",
  price: 200,
  stock: 50
};

let discountProduct = {
  ...product,
  price: 150  // 価格を上書き
};

console.log(product.price);         // 200（元は変わらない）
console.log(discountProduct.price); // 150
```

## シャローコピーの制限

`Object.assign()` やスプレッド構文は**シャローコピー（浅いコピー）**を行います。これは、ネストされたオブジェクトまではコピーされないことを意味します。

```javascript
let person = {
  name: "田中",
  address: {
    city: "東京",
    postal: "100-0001"
  }
};

let copy = { ...person };
copy.address.city = "大阪";

console.log(person.address.city);  // "大阪"（変わってしまう！）
```

ネストされたオブジェクト `address` は参照がコピーされるだけなので、変更すると元のオブジェクトも影響を受けます。

### ディープコピーの方法（参考）

完全に独立したコピーを作るには、以下の方法があります：

```javascript
// 方法1: JSON を使う（簡易的）
let original = {
  name: "田中",
  address: { city: "東京" }
};

let deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.address.city = "大阪";

console.log(original.address.city);  // "東京"（変わらない）
```

注意：この方法は、関数やundefinedなどは正しくコピーできません。

## 実用例

### 設定のデフォルト値

```javascript
let defaultConfig = {
  volume: 50,
  brightness: 80,
  language: "ja"
};

function createConfig(userConfig) {
  return {
    ...defaultConfig,
    ...userConfig
  };
}

let config1 = createConfig({ volume: 70 });
console.log(config1);
// { volume: 70, brightness: 80, language: "ja" }

let config2 = createConfig({ language: "en" });
console.log(config2);
// { volume: 50, brightness: 80, language: "en" }
```

### フォームデータの更新

```javascript
let formData = {
  username: "",
  email: "",
  age: 0
};

// ユーザーが名前を入力
formData = {
  ...formData,
  username: "taro123"
};

// ユーザーがメールを入力
formData = {
  ...formData,
  email: "taro@example.com"
};

console.log(formData);
// { username: "taro123", email: "taro@example.com", age: 0 }
```

### 商品データの複製

```javascript
let product = {
  id: 1,
  name: "ノート",
  price: 200
};

// 新しい商品を作成（IDと名前を変更）
let newProduct = {
  ...product,
  id: 2,
  name: "ペン"
};

console.log(product);
// { id: 1, name: "ノート", price: 200 }

console.log(newProduct);
// { id: 2, name: "ペン", price: 200 }
```

## 配列のスプレッド構文（参考）

配列でもスプレッド構文が使えます：

```javascript
let numbers1 = [1, 2, 3];
let numbers2 = [...numbers1];
numbers2.push(4);

console.log(numbers1);  // [1, 2, 3]
console.log(numbers2);  // [1, 2, 3, 4]

// 配列の結合
let arr1 = [1, 2];
let arr2 = [3, 4];
let combined = [...arr1, ...arr2];
console.log(combined);  // [1, 2, 3, 4]
```

## まとめ

オブジェクトのコピーは、JavaScriptで重要なテクニックです：

1. **参照の問題**: `obj2 = obj1` は参照のコピー
2. **Object.assign()**: `Object.assign({}, original)` で新しいオブジェクトを作成
3. **スプレッド構文**: `{ ...original }` でコピー（推奨）
4. **シャローコピー**: ネストされたオブジェクトは参照がコピーされる
5. **プロパティの追加・上書き**: コピーと同時に変更可能

次のレッスンでは、オブジェクトのさらに高度なテクニックを学びます。

## 練習問題

以下のユーザーオブジェクトを使って、コピーの動作を確認してください：

```javascript
let user = {
  username: "taro123",
  email: "taro@example.com",
  age: 28,
  premium: false
};
```

以下の処理を実装してください：

1. 参照コピーを作成して、元のオブジェクトが変更されることを確認
2. Object.assign()を使って独立したコピーを作成
3. スプレッド構文を使ってコピーを作成
4. スプレッド構文を使って、premiumをtrueにしたコピーを作成
5. 3つのコピーをHTMLに表示して、それぞれが独立していることを確認
