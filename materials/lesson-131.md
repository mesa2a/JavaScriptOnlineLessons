# レッスン131: アロー関数の基本

## このレッスンで学ぶこと

- アロー関数の書き方
- 通常の関数との違い
- アロー関数の省略記法
- いつアロー関数を使うべきか

## アロー関数とは

アロー関数は、ES6（ES2015）で導入された新しい関数の書き方です。`=>`（矢印）を使って関数を定義します。

### 基本的な書き方

```javascript
// 通常の関数
const add = function(a, b) {
  return a + b;
};

// アロー関数
const add = (a, b) => {
  return a + b;
};

console.log(add(2, 3)); // => 5
```

## アロー関数の書き方

### 1. 基本形

```javascript
const greet = (name) => {
  return 'こんにちは、' + name + 'さん';
};

console.log(greet('太郎')); // => 'こんにちは、太郎さん'
```

### 2. 引数が1つの場合、括弧を省略できる

```javascript
// 括弧あり
const double = (n) => {
  return n * 2;
};

// 括弧なし
const double = n => {
  return n * 2;
};

console.log(double(5)); // => 10
```

### 3. 引数が0個または2個以上の場合、括弧は必須

```javascript
// 引数なし
const getRandomNumber = () => {
  return Math.random();
};

// 引数2個
const add = (a, b) => {
  return a + b;
};
```

### 4. 本体が1行の場合、中括弧とreturnを省略できる

```javascript
// 通常の書き方
const double = n => {
  return n * 2;
};

// 省略形
const double = n => n * 2;

console.log(double(5)); // => 10
```

### 5. 最も短い形

```javascript
const add = (a, b) => a + b;
const square = n => n * n;
const greet = name => 'Hello, ' + name;

console.log(add(2, 3));      // => 5
console.log(square(4));      // => 16
console.log(greet('Alice')); // => 'Hello, Alice'
```

## オブジェクトを返す場合の注意

オブジェクトリテラルを返す場合は、括弧で囲む必要があります。

```javascript
// エラー：中括弧が関数本体と解釈される
const makePerson = name => { name: name };

// 正しい書き方：括弧で囲む
const makePerson = name => ({ name: name });

console.log(makePerson('太郎')); // => { name: '太郎' }
```

## 配列メソッドでの活用

アロー関数は、`map`、`filter`、`reduce`などの配列メソッドで特に便利です。

### map

```javascript
const numbers = [1, 2, 3, 4, 5];

// 通常の関数
const doubled1 = numbers.map(function(n) {
  return n * 2;
});

// アロー関数
const doubled2 = numbers.map(n => n * 2);

console.log(doubled2); // => [2, 4, 6, 8, 10]
```

### filter

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 通常の関数
const evens1 = numbers.filter(function(n) {
  return n % 2 === 0;
});

// アロー関数
const evens2 = numbers.filter(n => n % 2 === 0);

console.log(evens2); // => [2, 4, 6, 8, 10]
```

### reduce

```javascript
const numbers = [1, 2, 3, 4, 5];

// 通常の関数
const sum1 = numbers.reduce(function(acc, n) {
  return acc + n;
}, 0);

// アロー関数
const sum2 = numbers.reduce((acc, n) => acc + n, 0);

console.log(sum2); // => 15
```

## 複数行の処理

複雑な処理の場合は、中括弧とreturnを使います。

```javascript
const processNumber = n => {
  const doubled = n * 2;
  const added = doubled + 10;
  const squared = added * added;
  return squared;
};

console.log(processNumber(5)); // => ((5 * 2) + 10)^2 = 400
```

## メソッドチェーンでの活用

アロー関数を使うと、メソッドチェーンがより読みやすくなります。

```javascript
const users = [
  { name: '太郎', age: 25, active: true },
  { name: '花子', age: 30, active: true },
  { name: '一郎', age: 20, active: false },
  { name: '美咲', age: 28, active: true }
];

// 通常の関数
const result1 = users
  .filter(function(user) {
    return user.active;
  })
  .map(function(user) {
    return user.name;
  });

// アロー関数
const result2 = users
  .filter(user => user.active)
  .map(user => user.name);

console.log(result2); // => ['太郎', '花子', '美咲']
```

## 実践例: データの変換

```javascript
const products = [
  { name: 'りんご', price: 100, quantity: 3 },
  { name: 'バナナ', price: 80, quantity: 5 },
  { name: 'オレンジ', price: 120, quantity: 2 }
];

// 小計を追加
const withSubtotal = products.map(product => ({
  ...product,
  subtotal: product.price * product.quantity
}));

// 合計金額を計算
const total = withSubtotal.reduce((sum, product) => sum + product.subtotal, 0);

console.log(total); // => 940
```

## 実践例: 条件分岐を含む処理

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 偶数は2倍、奇数は3倍
const result = numbers.map(n => {
  if (n % 2 === 0) {
    return n * 2;
  } else {
    return n * 3;
  }
});

console.log(result); // => [3, 4, 9, 8, 15, 12, 21, 16, 27, 20]

// 三項演算子を使った短い書き方
const result2 = numbers.map(n => n % 2 === 0 ? n * 2 : n * 3);
```

## いつアロー関数を使うべきか

### 使うと良い場合

1. **コールバック関数として**: `map`、`filter`、`reduce`など
2. **短い処理**: 1行で書ける簡単な処理
3. **関数型プログラミング**: データの変換や処理

```javascript
// ✓ 良い例
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

### 通常の関数を使う場合

1. **メソッド定義**: オブジェクトのメソッド
2. **thisを使う場合**: イベントハンドラーなど（次のレッスンで学習）
3. **複雑な処理**: 複数行にわたる長い処理

```javascript
// ✓ 良い例（通常の関数）
const calculator = {
  value: 0,
  add: function(n) {
    this.value += n;
  }
};
```

## 比較: 通常の関数 vs アロー関数

```javascript
// 通常の関数
const add1 = function(a, b) {
  return a + b;
};

// アロー関数（完全な形）
const add2 = (a, b) => {
  return a + b;
};

// アロー関数（省略形）
const add3 = (a, b) => a + b;

// すべて同じ動作
console.log(add1(2, 3)); // => 5
console.log(add2(2, 3)); // => 5
console.log(add3(2, 3)); // => 5
```

## まとめ

このレッスンで学んだこと:

1. **アロー関数の基本**: `(引数) => { 処理 }`
2. **省略記法**:
   - 引数が1つ: 括弧を省略可能
   - 本体が1行: 中括弧とreturnを省略可能
3. **オブジェクトを返す**: `() => ({ key: value })`
4. **配列メソッドでの活用**: map、filter、reduceで便利
5. **メソッドチェーン**: より読みやすいコードに
6. **使い分け**: コールバックや短い処理にはアロー関数、メソッド定義には通常の関数

アロー関数を使うことで、より簡潔で読みやすいコードを書くことができます。特に関数型プログラミングのスタイルでは、アロー関数が非常に便利です。
