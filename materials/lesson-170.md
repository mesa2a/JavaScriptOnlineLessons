# レッスン170: 苦手分野の復習（配列操作編）

## このレッスンで学ぶこと
- 配列の基本操作の復習
- 配列メソッドの理解を深める
- 実践的な配列操作の練習
- よくあるミスとその対処法
- 配列を使った問題解決パターン

---

## 1. 配列操作の重要性

配列はJavaScriptで最も頻繁に使用するデータ構造の一つです。Webアプリケーション開発では、データの集合を扱う際に必ず配列を使用します。

### なぜ配列が重要か

```javascript
// 実際の開発での配列の使用例

// ユーザーリスト
var users = [
  { id: 1, name: '田中', age: 25 },
  { id: 2, name: '佐藤', age: 30 },
  { id: 3, name: '鈴木', age: 28 }
];

// 商品リスト
var products = [
  { id: 101, name: 'ノートPC', price: 100000 },
  { id: 102, name: 'マウス', price: 2000 },
  { id: 103, name: 'キーボード', price: 5000 }
];

// タスクリスト
var tasks = [
  { id: 1, title: '買い物', completed: false },
  { id: 2, title: '掃除', completed: true },
  { id: 3, title: '勉強', completed: false }
];
```

---

## 2. 配列の基本操作の復習

### 2.1 配列の作成

```javascript
// 空の配列
var emptyArray = [];

// 初期値を持つ配列
var numbers = [1, 2, 3, 4, 5];
var fruits = ['りんご', 'バナナ', 'オレンジ'];

// 混合型の配列
var mixed = [1, 'hello', true, null, { name: '太郎' }];

// 配列の長さ
console.log(numbers.length); // 5
console.log(fruits.length);  // 3
```

### 2.2 配列の要素へのアクセス

```javascript
var fruits = ['りんご', 'バナナ', 'オレンジ', 'ぶどう'];

// インデックスでアクセス（0から始まる）
console.log(fruits[0]); // 'りんご'
console.log(fruits[1]); // 'バナナ'
console.log(fruits[3]); // 'ぶどう'

// 最後の要素
console.log(fruits[fruits.length - 1]); // 'ぶどう'

// 存在しないインデックス
console.log(fruits[10]); // undefined
```

### 2.3 配列の要素の変更

```javascript
var fruits = ['りんご', 'バナナ', 'オレンジ'];

// 要素の変更
fruits[1] = 'いちご';
console.log(fruits); // ['りんご', 'いちご', 'オレンジ']

// 要素の追加
fruits[3] = 'ぶどう';
console.log(fruits); // ['りんご', 'いちご', 'オレンジ', 'ぶどう']
```

---

## 3. 配列メソッドの復習

### 3.1 要素の追加と削除

#### push() - 末尾に追加

```javascript
var fruits = ['りんご', 'バナナ'];

fruits.push('オレンジ');
console.log(fruits); // ['りんご', 'バナナ', 'オレンジ']

fruits.push('ぶどう', 'いちご');
console.log(fruits); // ['りんご', 'バナナ', 'オレンジ', 'ぶどう', 'いちご']

// 戻り値は新しい配列の長さ
var newLength = fruits.push('メロン');
console.log(newLength); // 6
```

#### pop() - 末尾から削除

```javascript
var fruits = ['りんご', 'バナナ', 'オレンジ'];

var lastFruit = fruits.pop();
console.log(lastFruit); // 'オレンジ'
console.log(fruits);    // ['りんご', 'バナナ']
```

#### unshift() - 先頭に追加

```javascript
var fruits = ['バナナ', 'オレンジ'];

fruits.unshift('りんご');
console.log(fruits); // ['りんご', 'バナナ', 'オレンジ']
```

#### shift() - 先頭から削除

```javascript
var fruits = ['りんご', 'バナナ', 'オレンジ'];

var firstFruit = fruits.shift();
console.log(firstFruit); // 'りんご'
console.log(fruits);     // ['バナナ', 'オレンジ']
```

### 3.2 filter() - 条件に合う要素を抽出

```javascript
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 偶数のみ抽出
var evenNumbers = numbers.filter(function(num) {
  return num % 2 === 0;
});
console.log(evenNumbers); // [2, 4, 6, 8, 10]

// 5より大きい数
var greaterThanFive = numbers.filter(function(num) {
  return num > 5;
});
console.log(greaterThanFive); // [6, 7, 8, 9, 10]

// オブジェクトの配列でのfilter
var users = [
  { name: '田中', age: 25 },
  { name: '佐藤', age: 30 },
  { name: '鈴木', age: 28 }
];

// 25歳以上のユーザー
var adults = users.filter(function(user) {
  return user.age >= 25;
});
console.log(adults);
// [{ name: '田中', age: 25 }, { name: '佐藤', age: 30 }, { name: '鈴木', age: 28 }]
```

### 3.3 map() - 各要素を変換

```javascript
var numbers = [1, 2, 3, 4, 5];

// 各要素を2倍に
var doubled = numbers.map(function(num) {
  return num * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]

// 各要素を文字列に変換
var strings = numbers.map(function(num) {
  return '番号' + num;
});
console.log(strings); // ['番号1', '番号2', '番号3', '番号4', '番号5']

// オブジェクトの配列でのmap
var users = [
  { name: '田中', age: 25 },
  { name: '佐藤', age: 30 }
];

// 名前だけ取り出す
var names = users.map(function(user) {
  return user.name;
});
console.log(names); // ['田中', '佐藤']

// 新しいプロパティを追加
var usersWithId = users.map(function(user, index) {
  return {
    id: index + 1,
    name: user.name,
    age: user.age
  };
});
console.log(usersWithId);
// [{ id: 1, name: '田中', age: 25 }, { id: 2, name: '佐藤', age: 30 }]
```

### 3.4 reduce() - 配列を単一の値に集約

```javascript
var numbers = [1, 2, 3, 4, 5];

// 合計を計算
var sum = numbers.reduce(function(total, num) {
  return total + num;
}, 0);
console.log(sum); // 15

// 最大値を見つける
var max = numbers.reduce(function(maxValue, num) {
  return num > maxValue ? num : maxValue;
}, numbers[0]);
console.log(max); // 5

// オブジェクトの配列での合計
var products = [
  { name: 'りんご', price: 100 },
  { name: 'バナナ', price: 150 },
  { name: 'オレンジ', price: 120 }
];

var totalPrice = products.reduce(function(total, product) {
  return total + product.price;
}, 0);
console.log(totalPrice); // 370
```

### 3.5 find() - 条件に合う最初の要素

```javascript
var users = [
  { id: 1, name: '田中', age: 25 },
  { id: 2, name: '佐藤', age: 30 },
  { id: 3, name: '鈴木', age: 28 }
];

// IDが2のユーザーを見つける
var user = users.find(function(u) {
  return u.id === 2;
});
console.log(user); // { id: 2, name: '佐藤', age: 30 }

// 見つからない場合
var notFound = users.find(function(u) {
  return u.id === 99;
});
console.log(notFound); // undefined
```

### 3.6 forEach() - 各要素に処理を実行

```javascript
var fruits = ['りんご', 'バナナ', 'オレンジ'];

// 各要素を表示
fruits.forEach(function(fruit) {
  console.log(fruit);
});
// 'りんご'
// 'バナナ'
// 'オレンジ'

// インデックスも使える
fruits.forEach(function(fruit, index) {
  console.log(index + ': ' + fruit);
});
// 0: りんご
// 1: バナナ
// 2: オレンジ
```

### 3.7 sort() - 配列をソート

```javascript
var numbers = [5, 2, 8, 1, 9];

// 数値のソート（比較関数が必要）
numbers.sort(function(a, b) {
  return a - b; // 昇順
});
console.log(numbers); // [1, 2, 5, 8, 9]

// 降順
numbers.sort(function(a, b) {
  return b - a;
});
console.log(numbers); // [9, 8, 5, 2, 1]

// 文字列のソート
var fruits = ['バナナ', 'りんご', 'オレンジ'];
fruits.sort();
console.log(fruits); // ['オレンジ', 'バナナ', 'りんご']

// オブジェクトのソート
var users = [
  { name: '佐藤', age: 30 },
  { name: '田中', age: 25 },
  { name: '鈴木', age: 28 }
];

// 年齢でソート
users.sort(function(a, b) {
  return a.age - b.age;
});
console.log(users);
```

---

## 4. よくあるミスと対処法

### 4.1 元の配列を変更してしまう

```javascript
// ❌ 悪い例：元の配列が変更される
var numbers = [1, 2, 3, 4, 5];
numbers.sort(function(a, b) { return b - a; });
console.log(numbers); // [5, 4, 3, 2, 1] - 元の配列が変更された！

// ✅ 良い例：コピーを作成してから操作
var numbers = [1, 2, 3, 4, 5];
var sorted = numbers.slice().sort(function(a, b) { return b - a; });
console.log(numbers); // [1, 2, 3, 4, 5] - 元の配列は変更されない
console.log(sorted);  // [5, 4, 3, 2, 1]
```

### 4.2 filter()とmap()の混同

```javascript
var numbers = [1, 2, 3, 4, 5];

// ❌ 間違い：filterで変換しようとしている
var doubled = numbers.filter(function(num) {
  return num * 2; // これは常にtruthyなので全要素が返される
});
console.log(doubled); // [1, 2, 3, 4, 5] - 期待した結果ではない

// ✅ 正しい：mapで変換
var doubled = numbers.map(function(num) {
  return num * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]

// ✅ filterとmapの組み合わせ
var evenDoubled = numbers
  .filter(function(num) { return num % 2 === 0; })
  .map(function(num) { return num * 2; });
console.log(evenDoubled); // [4, 8]
```

### 4.3 reduce()の初期値を忘れる

```javascript
var numbers = [1, 2, 3, 4, 5];

// ❌ 初期値なし（配列が空の場合にエラー）
var emptyArray = [];
// var sum = emptyArray.reduce(function(total, num) {
//   return total + num;
// }); // エラー！

// ✅ 初期値を指定
var sum = emptyArray.reduce(function(total, num) {
  return total + num;
}, 0);
console.log(sum); // 0 - 安全
```

### 4.4 ループ内でのインデックス操作

```javascript
var numbers = [1, 2, 3, 4, 5];

// ❌ 悪い例：ループ中に配列を変更
for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    numbers.splice(i, 1); // 要素を削除するとインデックスがずれる
    i--; // インデックスを調整する必要がある
  }
}

// ✅ 良い例：filterを使う
var numbers = [1, 2, 3, 4, 5];
var oddNumbers = numbers.filter(function(num) {
  return num % 2 !== 0;
});
console.log(oddNumbers); // [1, 3, 5]
```

---

## 5. 実践的な配列操作パターン

### 5.1 配列の重複を削除

```javascript
var numbers = [1, 2, 2, 3, 3, 3, 4, 5, 5];

// パターン1: filter + indexOf
var unique = numbers.filter(function(num, index, arr) {
  return arr.indexOf(num) === index;
});
console.log(unique); // [1, 2, 3, 4, 5]

// パターン2: オブジェクトを使う
var unique2 = [];
var seen = {};
for (var i = 0; i < numbers.length; i++) {
  if (!seen[numbers[i]]) {
    seen[numbers[i]] = true;
    unique2.push(numbers[i]);
  }
}
console.log(unique2); // [1, 2, 3, 4, 5]
```

### 5.2 配列のグループ化

```javascript
var users = [
  { name: '田中', age: 25 },
  { name: '佐藤', age: 30 },
  { name: '鈴木', age: 25 },
  { name: '高橋', age: 30 }
];

// 年齢でグループ化
var grouped = users.reduce(function(result, user) {
  var age = user.age;
  if (!result[age]) {
    result[age] = [];
  }
  result[age].push(user);
  return result;
}, {});

console.log(grouped);
// {
//   25: [{ name: '田中', age: 25 }, { name: '鈴木', age: 25 }],
//   30: [{ name: '佐藤', age: 30 }, { name: '高橋', age: 30 }]
// }
```

### 5.3 配列の平坦化（flatten）

```javascript
var nested = [[1, 2], [3, 4], [5, 6]];

// パターン1: reduce + concat
var flat = nested.reduce(function(result, arr) {
  return result.concat(arr);
}, []);
console.log(flat); // [1, 2, 3, 4, 5, 6]

// パターン2: forループ
var flat2 = [];
for (var i = 0; i < nested.length; i++) {
  for (var j = 0; j < nested[i].length; j++) {
    flat2.push(nested[i][j]);
  }
}
console.log(flat2); // [1, 2, 3, 4, 5, 6]
```

### 5.4 配列の要素をカウント

```javascript
var fruits = ['りんご', 'バナナ', 'りんご', 'オレンジ', 'バナナ', 'りんご'];

var count = fruits.reduce(function(result, fruit) {
  if (!result[fruit]) {
    result[fruit] = 0;
  }
  result[fruit]++;
  return result;
}, {});

console.log(count);
// { りんご: 3, バナナ: 2, オレンジ: 1 }
```

### 5.5 配列の分割（chunk）

```javascript
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var chunkSize = 3;

function chunk(arr, size) {
  var result = [];
  for (var i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

var chunked = chunk(numbers, chunkSize);
console.log(chunked);
// [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

---

## 6. 実践問題

### 問題1: 成績処理

学生の成績データから、合格者（60点以上）のみを抽出し、名前のリストを作成してください。

```javascript
var students = [
  { name: '田中', score: 85 },
  { name: '佐藤', score: 45 },
  { name: '鈴木', score: 72 },
  { name: '高橋', score: 58 },
  { name: '伊藤', score: 90 }
];

// ここにコードを書いてください
// 期待される結果: ['田中', '鈴木', '伊藤']
```

### 問題2: 商品の合計金額

カート内の商品の合計金額を計算してください。

```javascript
var cart = [
  { name: 'りんご', price: 100, quantity: 3 },
  { name: 'バナナ', price: 150, quantity: 2 },
  { name: 'オレンジ', price: 120, quantity: 4 }
];

// ここにコードを書いてください
// 期待される結果: 1080（100*3 + 150*2 + 120*4）
```

### 問題3: データの変換

APIから取得したユーザーデータを、表示用の形式に変換してください。

```javascript
var apiUsers = [
  { id: 1, first_name: '太郎', last_name: '山田', email: 'taro@example.com' },
  { id: 2, first_name: '花子', last_name: '佐藤', email: 'hanako@example.com' }
];

// 以下の形式に変換してください
// [
//   { id: 1, fullName: '山田太郎', email: 'taro@example.com' },
//   { id: 2, fullName: '佐藤花子', email: 'hanako@example.com' }
// ]
```

### 問題4: タスクの統計

タスクリストから完了率を計算してください。

```javascript
var tasks = [
  { title: '買い物', completed: true },
  { title: '掃除', completed: false },
  { title: '勉強', completed: true },
  { title: '料理', completed: true },
  { title: '運動', completed: false }
];

// 完了したタスクの割合（%）を計算してください
// 期待される結果: 60（5つのうち3つが完了）
```

### 問題5: 配列の検索と更新

ユーザーIDを指定して、そのユーザーの年齢を更新してください。

```javascript
var users = [
  { id: 1, name: '田中', age: 25 },
  { id: 2, name: '佐藤', age: 30 },
  { id: 3, name: '鈴木', age: 28 }
];

function updateUserAge(users, userId, newAge) {
  // ここにコードを書いてください
}

updateUserAge(users, 2, 31);
console.log(users);
// 期待される結果: 佐藤の年齢が31に更新される
```

---

## 7. チャレンジ問題

### チャレンジ1: 在庫管理システム

商品の在庫管理システムを実装してください。

```javascript
var inventory = [
  { id: 1, name: 'ノートPC', stock: 5, price: 100000 },
  { id: 2, name: 'マウス', stock: 20, price: 2000 },
  { id: 3, name: 'キーボード', stock: 0, price: 5000 },
  { id: 4, name: 'モニター', stock: 3, price: 30000 }
];

// 1. 在庫切れの商品を見つける関数
function findOutOfStock(inventory) {
  // ここにコードを書いてください
}

// 2. 在庫総額を計算する関数
function calculateTotalValue(inventory) {
  // ここにコードを書いてください
  // 各商品の stock * price の合計
}

// 3. 最も高価な商品を見つける関数
function findMostExpensive(inventory) {
  // ここにコードを書いてください
}

// 4. 商品名で検索する関数
function searchByName(inventory, keyword) {
  // ここにコードを書いてください
  // 部分一致で検索
}
```

### チャレンジ2: データの集計と分析

売上データから様々な統計を計算してください。

```javascript
var sales = [
  { date: '2025-01-15', product: 'りんご', category: '果物', amount: 500 },
  { date: '2025-01-15', product: 'バナナ', category: '果物', amount: 300 },
  { date: '2025-01-16', product: 'にんじん', category: '野菜', amount: 200 },
  { date: '2025-01-16', product: 'りんご', category: '果物', amount: 600 },
  { date: '2025-01-17', product: 'バナナ', category: '果物', amount: 400 }
];

// 1. カテゴリ別の売上合計
function salesByCategory(sales) {
  // ここにコードを書いてください
  // { 果物: 1800, 野菜: 200 }
}

// 2. 日付別の売上合計
function salesByDate(sales) {
  // ここにコードを書いてください
}

// 3. 最も売れた商品
function topProduct(sales) {
  // ここにコードを書いてください
}

// 4. 平均売上金額
function averageSale(sales) {
  // ここにコードを書いてください
}
```

---

## まとめ

このレッスンでは、配列操作について復習しました：

1. **基本操作**
   - 配列の作成、アクセス、変更
   - push、pop、shift、unshift

2. **配列メソッド**
   - filter: 条件に合う要素を抽出
   - map: 各要素を変換
   - reduce: 単一の値に集約
   - find: 条件に合う最初の要素
   - forEach: 各要素に処理を実行
   - sort: 配列をソート

3. **よくあるミス**
   - 元の配列を変更してしまう
   - filterとmapの混同
   - reduceの初期値を忘れる

4. **実践パターン**
   - 重複削除
   - グループ化
   - 平坦化
   - カウント
   - 分割

配列操作は実践的なアプリケーション開発で最も頻繁に使用するスキルです。しっかり復習して、自信を持って使えるようになりましょう！
