# レッスン130: 関数型プログラミング入門

## このレッスンで学ぶこと

- 関数型プログラミングの基本概念
- 純粋関数とは
- 不変性（イミュータビリティ）
- 関数の合成

## 関数型プログラミングとは

関数型プログラミングは、プログラムを関数の組み合わせとして構築するプログラミングスタイルです。以下の特徴があります：

1. **純粋関数を使う**
2. **データの不変性を保つ**
3. **副作用を避ける**
4. **関数を組み合わせる**

## 純粋関数（Pure Functions）

純粋関数とは、以下の2つの条件を満たす関数です：

1. **同じ入力に対して常に同じ出力を返す**
2. **副作用がない**（外部の状態を変更しない）

### 純粋関数の例

```javascript
// 純粋関数
const add = function(a, b) {
  return a + b;
};

console.log(add(2, 3)); // => 5
console.log(add(2, 3)); // => 5（常に同じ結果）
```

### 純粋でない関数の例

```javascript
// 純粋でない関数（外部変数に依存）
let counter = 0;

const increment = function() {
  counter = counter + 1;  // 外部の状態を変更（副作用）
  return counter;
};

console.log(increment()); // => 1
console.log(increment()); // => 2（同じ呼び出しで異なる結果）
```

### 純粋関数に書き換える

```javascript
// 純粋関数版
const increment = function(counter) {
  return counter + 1;
};

let myCounter = 0;
myCounter = increment(myCounter); // => 1
myCounter = increment(myCounter); // => 2
```

## 不変性（Immutability）

不変性とは、一度作成したデータを変更しないという考え方です。データを変更する代わりに、新しいデータを作成します。

### 配列の操作

```javascript
// 悪い例：元の配列を変更してしまう
const numbers = [1, 2, 3];
numbers.push(4);  // 元の配列を変更
console.log(numbers); // => [1, 2, 3, 4]

// 良い例：新しい配列を作成
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4];  // 新しい配列を作成
console.log(numbers);    // => [1, 2, 3]（元の配列は変更されていない）
console.log(newNumbers); // => [1, 2, 3, 4]
```

### スプレッド構文（...）

スプレッド構文を使うと、配列やオブジェクトのコピーを簡単に作成できます。

```javascript
// 配列のコピー
const original = [1, 2, 3];
const copy = [...original];

copy.push(4);
console.log(original); // => [1, 2, 3]
console.log(copy);     // => [1, 2, 3, 4]

// オブジェクトのコピー
const user = { name: '太郎', age: 25 };
const updatedUser = { ...user, age: 26 };

console.log(user);        // => { name: '太郎', age: 25 }
console.log(updatedUser); // => { name: '太郎', age: 26 }
```

### 配列操作の関数型アプローチ

```javascript
const numbers = [1, 2, 3, 4, 5];

// 要素を追加
const addElement = function(array, element) {
  return [...array, element];
};

// 要素を削除
const removeElement = function(array, index) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

// 要素を更新
const updateElement = function(array, index, newValue) {
  return array.map((item, i) => i === index ? newValue : item);
};

const result1 = addElement(numbers, 6);
console.log(result1); // => [1, 2, 3, 4, 5, 6]

const result2 = removeElement(numbers, 2);
console.log(result2); // => [1, 2, 4, 5]

const result3 = updateElement(numbers, 2, 30);
console.log(result3); // => [1, 2, 30, 4, 5]

console.log(numbers); // => [1, 2, 3, 4, 5]（元の配列は変更されていない）
```

## map、filter、reduceの活用

関数型プログラミングでは、配列の操作に`map`、`filter`、`reduce`をよく使います。

### map - 変換

```javascript
const numbers = [1, 2, 3, 4, 5];

// 各要素を2倍にする
const doubled = numbers.map(n => n * 2);
console.log(doubled); // => [2, 4, 6, 8, 10]

// 各要素を文字列に変換
const strings = numbers.map(n => `数値: ${n}`);
console.log(strings); // => ['数値: 1', '数値: 2', '数値: 3', '数値: 4', '数値: 5']
```

### filter - 絞り込み

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 偶数のみを取得
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // => [2, 4, 6, 8, 10]

// 5より大きい数のみを取得
const greaterThanFive = numbers.filter(n => n > 5);
console.log(greaterThanFive); // => [6, 7, 8, 9, 10]
```

### reduce - 集約

```javascript
const numbers = [1, 2, 3, 4, 5];

// 合計を計算
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // => 15

// 最大値を取得
const max = numbers.reduce((acc, n) => n > acc ? n : acc, numbers[0]);
console.log(max); // => 5

// オブジェクトに変換
const users = ['太郎', '花子', '一郎'];
const userObjects = users.reduce((acc, name, index) => {
  acc.push({ id: index + 1, name: name });
  return acc;
}, []);
console.log(userObjects);
// => [{ id: 1, name: '太郎' }, { id: 2, name: '花子' }, { id: 3, name: '一郎' }]
```

## 関数の組み合わせ（メソッドチェーン）

複数の配列操作を組み合わせることで、複雑な処理を簡潔に書けます。

```javascript
const users = [
  { name: '太郎', age: 25, active: true },
  { name: '花子', age: 30, active: true },
  { name: '一郎', age: 20, active: false },
  { name: '美咲', age: 28, active: true }
];

// アクティブなユーザーの名前を取得
const activeUserNames = users
  .filter(user => user.active)
  .map(user => user.name);

console.log(activeUserNames); // => ['太郎', '花子', '美咲']

// アクティブなユーザーの平均年齢を計算
const activeUsers = users.filter(user => user.active);
const totalAge = activeUsers.reduce((sum, user) => sum + user.age, 0);
const averageAge = totalAge / activeUsers.length;

console.log(averageAge); // => 27.666...
```

## 実践例: ショッピングカート

```javascript
const cart = [
  { name: 'りんご', price: 100, quantity: 3 },
  { name: 'バナナ', price: 80, quantity: 5 },
  { name: 'オレンジ', price: 120, quantity: 2 }
];

// 各商品の小計を計算
const cartWithSubtotal = cart.map(item => ({
  ...item,
  subtotal: item.price * item.quantity
}));

console.log(cartWithSubtotal);
// => [
//   { name: 'りんご', price: 100, quantity: 3, subtotal: 300 },
//   { name: 'バナナ', price: 80, quantity: 5, subtotal: 400 },
//   { name: 'オレンジ', price: 120, quantity: 2, subtotal: 240 }
// ]

// 合計金額を計算
const total = cartWithSubtotal.reduce((sum, item) => sum + item.subtotal, 0);
console.log(total); // => 940

// 100円以上の商品のみの合計
const expensiveTotal = cart
  .filter(item => item.price >= 100)
  .map(item => item.price * item.quantity)
  .reduce((sum, subtotal) => sum + subtotal, 0);

console.log(expensiveTotal); // => 540
```

## 関数の合成

小さな関数を組み合わせて、より複雑な処理を作ることができます。

```javascript
// 小さな関数を定義
const double = function(n) {
  return n * 2;
};

const addTen = function(n) {
  return n + 10;
};

const square = function(n) {
  return n * n;
};

// 関数を組み合わせて使う
const number = 5;
const result1 = square(addTen(double(number)));
console.log(result1); // => (5 * 2 + 10) ^ 2 = 400

// より読みやすく書く
const transform = function(n) {
  const doubled = double(n);
  const added = addTen(doubled);
  const squared = square(added);
  return squared;
};

console.log(transform(5)); // => 400
```

## まとめ

このレッスンで学んだこと:

1. **純粋関数**: 同じ入力に対して常に同じ出力、副作用なし
2. **不変性**: データを変更せず、新しいデータを作成
3. **スプレッド構文**: `...`を使った配列・オブジェクトのコピー
4. **配列メソッド**: `map`（変換）、`filter`（絞り込み）、`reduce`（集約）
5. **メソッドチェーン**: 複数の操作を組み合わせる
6. **関数の合成**: 小さな関数を組み合わせて複雑な処理を作る

関数型プログラミングのアプローチを使うことで、より読みやすく、テストしやすく、バグの少ないコードを書くことができます。
