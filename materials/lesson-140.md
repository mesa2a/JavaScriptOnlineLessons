# レッスン140：for...inループ

## 学習目標
- for...inループを使ってオブジェクトのプロパティを反復処理する方法を学ぶ
- すべてのプロパティを取得する方法を理解する
- hasOwnPropertyメソッドの使い方を習得する

## オブジェクトのループ処理

これまで、配列のループには通常のforループを使ってきました。しかし、オブジェクトには**for...inループ**という特別な構文があります。

### 基本的な書き方

```javascript
let person = {
  name: "田中",
  age: 25,
  city: "東京"
};

for (let key in person) {
  console.log(key);
}
// "name"
// "age"
// "city"
```

for...inループは、オブジェクトの**すべてのプロパティ名**を順番に取り出します。

## プロパティ名と値の取得

### プロパティ名を取得

```javascript
let student = {
  name: "佐藤",
  grade: "A",
  score: 85
};

for (let key in student) {
  console.log("プロパティ名：" + key);
}
// プロパティ名：name
// プロパティ名：grade
// プロパティ名：score
```

`key` 変数には、各プロパティの名前（キー）が文字列として入ります。

### プロパティの値を取得

プロパティの値を取得するには、ブラケット記法を使います：

```javascript
let book = {
  title: "JavaScript入門",
  author: "山田太郎",
  price: 2800
};

for (let key in book) {
  console.log(key + "：" + book[key]);
}
// title：JavaScript入門
// author：山田太郎
// price：2800
```

`book[key]` でプロパティの値にアクセスできます。ドット記法（`book.key`）は使えないので注意してください。

## 実用例

### すべてのプロパティを表示

```javascript
let car = {
  brand: "トヨタ",
  model: "プリウス",
  year: 2023,
  color: "白"
};

for (let key in car) {
  console.log(key + " = " + car[key]);
}
// brand = トヨタ
// model = プリウス
// year = 2023
// color = 白
```

### プロパティをHTMLに表示

```javascript
let user = {
  username: "taro123",
  email: "taro@example.com",
  age: 28
};

let output = document.getElementById("userInfo");
let html = "";

for (let key in user) {
  html = html + "<p><strong>" + key + ":</strong> " + user[key] + "</p>";
}

output.innerHTML = html;
```

## プロパティの数を数える

for...inループを使って、オブジェクトのプロパティ数を数えることができます：

```javascript
let product = {
  name: "ノート",
  price: 200,
  stock: 50,
  category: "文具"
};

let count = 0;
for (let key in product) {
  count++;
}

console.log("プロパティの数：" + count);
// プロパティの数：4
```

## 条件付き処理

特定のプロパティだけを処理することもできます：

```javascript
let scores = {
  math: 85,
  english: 92,
  science: 78,
  history: 88
};

// 80点以上の科目を表示
for (let subject in scores) {
  if (scores[subject] >= 80) {
    console.log(subject + "：" + scores[subject] + "点");
  }
}
// math：85点
// english：92点
// history：88点
```

## オブジェクトの配列とfor...in

オブジェクトの配列と組み合わせることもできます：

```javascript
let students = [
  { name: "田中", age: 18, grade: "A" },
  { name: "佐藤", age: 19, grade: "B" },
  { name: "鈴木", age: 18, grade: "A" }
];

// 各学生のすべてのプロパティを表示
for (let i = 0; i < students.length; i++) {
  console.log("学生" + (i + 1) + "：");
  for (let key in students[i]) {
    console.log("  " + key + "：" + students[i][key]);
  }
}
```

## hasOwnPropertyメソッド

`hasOwnProperty()` メソッドを使うと、オブジェクトが特定のプロパティを持っているかを確認できます：

```javascript
let person = {
  name: "山田",
  age: 30
};

console.log(person.hasOwnProperty("name"));    // true
console.log(person.hasOwnProperty("email"));   // false
```

### for...inと組み合わせて使う

より安全なコードを書くために、for...inループと組み合わせて使うことがあります：

```javascript
let data = {
  id: 1,
  name: "商品A",
  price: 1000
};

for (let key in data) {
  if (data.hasOwnProperty(key)) {
    console.log(key + "：" + data[key]);
  }
}
```

これは、継承されたプロパティを除外するために使われますが、基本的な使い方では通常は必要ありません。

## 注意点

### 順序は保証されない

オブジェクトのプロパティの順序は保証されません。現代のJavaScriptでは多くの場合、追加した順序で取得されますが、依存すべきではありません。

### 配列にはfor...inを使わない

配列には通常のforループを使いましょう：

```javascript
// 悪い例
let numbers = [10, 20, 30];
for (let i in numbers) {
  console.log(numbers[i]);
}

// 良い例
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
```

## 実用例：設定オブジェクト

設定情報を表示する実用的な例：

```javascript
let settings = {
  theme: "ダーク",
  language: "日本語",
  notifications: true,
  autoSave: true,
  fontSize: 14
};

let output = document.getElementById("settingsList");
let html = "<ul>";

for (let setting in settings) {
  html = html + "<li>";
  html = html + setting + "：" + settings[setting];
  html = html + "</li>";
}

html = html + "</ul>";
output.innerHTML = html;
```

## Object.keysメソッド（参考）

for...inループ以外に、`Object.keys()` メソッドでプロパティ名の配列を取得することもできます：

```javascript
let person = {
  name: "田中",
  age: 25,
  city: "東京"
};

let keys = Object.keys(person);
console.log(keys);
// ["name", "age", "city"]

// 通常のforループで処理
for (let i = 0; i < keys.length; i++) {
  let key = keys[i];
  console.log(key + "：" + person[key]);
}
```

## まとめ

for...inループはオブジェクトのすべてのプロパティを処理するのに便利です：

1. `for (let key in object)` でプロパティ名を取得
2. `object[key]` で値にアクセス
3. すべてのプロパティを列挙できる
4. 条件付きで特定のプロパティだけを処理
5. `hasOwnProperty()` でプロパティの存在確認

次のレッスンでは、オブジェクトのさらに高度な使い方を学びます。

## 練習問題

以下の商品オブジェクトを使って、プロパティ情報を表示してください：

```javascript
let product = {
  id: 101,
  name: "ワイヤレスマウス",
  price: 2500,
  brand: "LogiTech",
  inStock: true
};
```

以下の処理を実装してください：

1. すべてのプロパティ名と値を「プロパティ名：値」の形式で表示
2. プロパティの総数を表示
3. 数値型のプロパティだけを表示
4. プロパティ名のリストを作成してHTMLに表示
