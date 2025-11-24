# レッスン181: アロー関数入門

## このレッスンで学ぶこと
- アロー関数の基本構文
- 従来の関数との違い
- アロー関数の省略記法
- thisキーワードの挙動の違い
- 実践的な使用例
- いつアロー関数を使うべきか

## アロー関数とは

アロー関数（Arrow Function）は、ES6（ES2015）で導入された新しい関数の書き方です。より簡潔に関数を書くことができ、`this`キーワードの挙動も異なります。

## 基本構文

### 従来の関数宣言
```javascript
// 関数宣言
function add(a, b) {
  return a + b;
}

// 関数式
var add = function(a, b) {
  return a + b;
};
```

### アロー関数
```javascript
// 基本形
var add = (a, b) => {
  return a + b;
};

// 式が1つだけなら{}とreturnを省略可能
var add = (a, b) => a + b;
```

## アロー関数の様々な書き方

### 1. パラメータが0個の場合
```javascript
// 従来の書き方
var sayHello = function() {
  return 'Hello!';
};

// アロー関数
var sayHello = () => 'Hello!';

// 実行
console.log(sayHello());  // 'Hello!'
```

### 2. パラメータが1個の場合
```javascript
// 従来の書き方
var double = function(n) {
  return n * 2;
};

// アロー関数（括弧を省略可能）
var double = n => n * 2;

// 実行
console.log(double(5));  // 10
```

### 3. パラメータが2個以上の場合
```javascript
// 従来の書き方
var add = function(a, b) {
  return a + b;
};

// アロー関数（括弧が必要）
var add = (a, b) => a + b;

// 実行
console.log(add(3, 4));  // 7
```

### 4. 複数行の処理がある場合
```javascript
// 従来の書き方
var greet = function(name) {
  var message = 'Hello, ' + name;
  return message + '!';
};

// アロー関数
var greet = (name) => {
  var message = 'Hello, ' + name;
  return message + '!';
};

// または
var greet = name => {
  var message = `Hello, ${name}`;  // テンプレートリテラル
  return message + '!';
};

// 実行
console.log(greet('Alice'));  // 'Hello, Alice!'
```

### 5. オブジェクトを返す場合
```javascript
// 従来の書き方
var createPerson = function(name, age) {
  return {
    name: name,
    age: age
  };
};

// アロー関数（オブジェクトを()で囲む必要がある）
var createPerson = (name, age) => ({
  name: name,
  age: age
});

// 実行
var person = createPerson('Bob', 25);
console.log(person);  // { name: 'Bob', age: 25 }
```

## 配列メソッドでの活用

アロー関数は配列メソッドと組み合わせると非常に便利です。

### map の例
```javascript
var numbers = [1, 2, 3, 4, 5];

// 従来の書き方
var doubled = numbers.map(function(n) {
  return n * 2;
});

// アロー関数
var doubled = numbers.map(n => n * 2);

console.log(doubled);  // [2, 4, 6, 8, 10]
```

### filter の例
```javascript
var numbers = [1, 2, 3, 4, 5, 6];

// 従来の書き方
var evens = numbers.filter(function(n) {
  return n % 2 === 0;
});

// アロー関数
var evens = numbers.filter(n => n % 2 === 0);

console.log(evens);  // [2, 4, 6]
```

### reduce の例
```javascript
var numbers = [1, 2, 3, 4, 5];

// 従来の書き方
var sum = numbers.reduce(function(acc, n) {
  return acc + n;
}, 0);

// アロー関数
var sum = numbers.reduce((acc, n) => acc + n, 0);

console.log(sum);  // 15
```

### forEach の例
```javascript
var fruits = ['apple', 'banana', 'orange'];

// 従来の書き方
fruits.forEach(function(fruit) {
  console.log(fruit);
});

// アロー関数
fruits.forEach(fruit => console.log(fruit));
```

### find の例
```javascript
var users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

// 従来の書き方
var user = users.find(function(u) {
  return u.id === 2;
});

// アロー関数
var user = users.find(u => u.id === 2);

console.log(user);  // { id: 2, name: 'Bob' }
```

## this キーワードの違い

アロー関数の最も重要な特徴の1つは、`this`の挙動が異なることです。

### 従来の関数の this
```javascript
var person = {
  name: 'Alice',
  sayHello: function() {
    console.log('Hello, ' + this.name);
  },
  sayHelloLater: function() {
    setTimeout(function() {
      // このthisはwindowオブジェクトを参照してしまう
      console.log('Hello, ' + this.name);
    }, 1000);
  }
};

person.sayHello();       // 'Hello, Alice'
person.sayHelloLater();  // 'Hello, undefined'
```

### 従来の解決策（selfパターン）
```javascript
var person = {
  name: 'Alice',
  sayHelloLater: function() {
    var self = this;  // thisを保存
    setTimeout(function() {
      console.log('Hello, ' + self.name);
    }, 1000);
  }
};

person.sayHelloLater();  // 'Hello, Alice'
```

### アロー関数での解決
```javascript
var person = {
  name: 'Alice',
  sayHelloLater: function() {
    setTimeout(() => {
      // アロー関数は外側のthisを引き継ぐ
      console.log('Hello, ' + this.name);
    }, 1000);
  }
};

person.sayHelloLater();  // 'Hello, Alice'
```

## アロー関数を使うべき場合と使わない場合

### 使うべき場合 ✓

1. **配列メソッドのコールバック**
```javascript
var numbers = [1, 2, 3, 4, 5];
var doubled = numbers.map(n => n * 2);
```

2. **短い関数**
```javascript
var isEven = n => n % 2 === 0;
```

3. **thisを外側から引き継ぎたい時**
```javascript
setTimeout(() => {
  console.log(this.name);
}, 1000);
```

### 使わない方が良い場合 ✗

1. **オブジェクトのメソッド**
```javascript
// ❌ 避ける
var person = {
  name: 'Alice',
  sayHello: () => {
    console.log(this.name);  // undefinedになる
  }
};

// ✓ 従来の関数を使う
var person = {
  name: 'Alice',
  sayHello: function() {
    console.log(this.name);  // 正しく動作
  }
};
```

2. **プロトタイプメソッド**
```javascript
// ❌ 避ける
Person.prototype.sayHello = () => {
  console.log(this.name);
};

// ✓ 従来の関数を使う
Person.prototype.sayHello = function() {
  console.log(this.name);
};
```

3. **イベントハンドラでthisを使う場合**
```javascript
// ❌ thisが期待通りに動作しない
button.addEventListener('click', () => {
  this.classList.toggle('active');  // thisがbuttonを指さない
});

// ✓ 従来の関数を使う
button.addEventListener('click', function() {
  this.classList.toggle('active');  // thisがbuttonを指す
});
```

## 実践例

### 例1: ユーザーリストのフィルタリング
```javascript
var users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 20 },
  { name: 'David', age: 35 }
];

// 30歳以上のユーザーを抽出
var adults = users.filter(user => user.age >= 30);
console.log(adults);
// [{ name: 'Bob', age: 30 }, { name: 'David', age: 35 }]

// 名前のみを抽出
var names = users.map(user => user.name);
console.log(names);
// ['Alice', 'Bob', 'Charlie', 'David']
```

### 例2: 数値の合計と平均
```javascript
var scores = [85, 92, 78, 95, 88];

// 合計
var total = scores.reduce((sum, score) => sum + score, 0);
console.log(total);  // 438

// 平均
var average = total / scores.length;
console.log(average);  // 87.6
```

### 例3: オブジェクトの配列を並び替え
```javascript
var products = [
  { name: 'Laptop', price: 1000 },
  { name: 'Mouse', price: 20 },
  { name: 'Keyboard', price: 50 },
  { name: 'Monitor', price: 300 }
];

// 価格順に並び替え
var sortedByPrice = products.sort((a, b) => a.price - b.price);
console.log(sortedByPrice);
```

### 例4: 条件に応じた処理
```javascript
var checkAge = age => age >= 18 ? '成人' : '未成年';

console.log(checkAge(20));  // '成人'
console.log(checkAge(15));  // '未成年'
```

### 例5: チェーンメソッド
```javascript
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = numbers
  .filter(n => n % 2 === 0)     // 偶数のみ
  .map(n => n * 2)               // 2倍
  .reduce((sum, n) => sum + n, 0);  // 合計

console.log(result);  // 60 (2+4+6+8+10の2倍 = 4+8+12+16+20)
```

## まとめ

### アロー関数の特徴
1. ✅ より簡潔な構文
2. ✅ 暗黙のreturn（式が1つの場合）
3. ✅ thisを外側のスコープから引き継ぐ
4. ✅ 配列メソッドと相性が良い

### 注意点
1. ⚠️ オブジェクトのメソッドとしては使わない
2. ⚠️ プロトタイプメソッドとしては使わない
3. ⚠️ constructorとしては使えない
4. ⚠️ argumentsオブジェクトが使えない

### 使い分けのポイント
- **短い処理や配列操作**: アロー関数 ✓
- **オブジェクトのメソッド**: 従来の関数 ✓
- **thisを明示的に使う場合**: 状況に応じて判断

アロー関数は、コードを簡潔に書くための強力なツールですが、`this`の挙動の違いを理解して適切に使い分けることが重要です。

## 練習問題

これまで書いてきたES5のコードを、アロー関数を使って書き直してみましょう。特に配列メソッド（map、filter、reduce、forEach など）のコールバック関数をアロー関数に変換する練習をしてください。

次のレッスンでは、テンプレートリテラルについて学びます。
