# レッスン132: アロー関数とthis

## このレッスンで学ぶこと

- thisとは何か
- 通常の関数とアロー関数のthisの違い
- オブジェクトのメソッドでの使い分け
- イベントハンドラーでの注意点

## thisとは

`this`は、関数が実行されるコンテキスト（文脈）を参照する特別なキーワードです。オブジェクトのメソッド内で`this`を使うと、そのオブジェクト自身を参照できます。

### 基本的な使い方

```javascript
const person = {
  name: '太郎',
  age: 25,
  greet: function() {
    console.log('こんにちは、' + this.name + 'です');
  }
};

person.greet(); // => 'こんにちは、太郎です'
```

## 通常の関数のthis

通常の関数では、`this`は関数が**呼び出された方法**によって変わります。

```javascript
const counter = {
  count: 0,
  increment: function() {
    this.count = this.count + 1;
    console.log('カウント:', this.count);
  }
};

counter.increment(); // => 'カウント: 1'
counter.increment(); // => 'カウント: 2'
```

## アロー関数のthis

アロー関数では、`this`は**定義された場所**のthisを引き継ぎます。これを「レキシカルスコープ」と呼びます。

```javascript
const counter = {
  count: 0,
  increment: () => {
    // アロー関数のthisは、counterオブジェクトではなく、
    // 外側のスコープ（この場合はグローバル）を参照する
    this.count = this.count + 1; // 期待通りに動かない！
  }
};
```

## オブジェクトのメソッド：使い分け

### 通常の関数を使うべき場合

オブジェクトのメソッドを定義するときは、**通常の関数**を使います。

```javascript
const person = {
  name: '太郎',
  age: 25,

  // ✓ 良い例：通常の関数
  greet: function() {
    return 'こんにちは、' + this.name + 'です';
  },

  // ✗ 悪い例：アロー関数
  greetBad: () => {
    return 'こんにちは、' + this.name + 'です'; // thisが正しく機能しない
  }
};

console.log(person.greet());    // => 'こんにちは、太郎です'
console.log(person.greetBad()); // => 'こんにちは、undefinedです'
```

### アロー関数を使うべき場合

メソッドの**内部**でコールバック関数を使う場合は、アロー関数が便利です。

```javascript
const timer = {
  seconds: 0,

  start: function() {
    // 通常の関数を使うと、setIntervalのコールバック内のthisが変わってしまう
    setInterval(function() {
      this.seconds = this.seconds + 1; // thisがtimerを参照しない！
      console.log(this.seconds);
    }, 1000);
  }
};

// 解決方法1: アロー関数を使う
const timer = {
  seconds: 0,

  start: function() {
    // アロー関数は外側のthisを引き継ぐ
    setInterval(() => {
      this.seconds = this.seconds + 1; // thisがtimerを参照する
      console.log(this.seconds);
    }, 1000);
  }
};
```

## 実践例: カウンター

```javascript
const counter = {
  count: 0,

  // メソッドは通常の関数で定義
  increment: function() {
    this.count = this.count + 1;
  },

  decrement: function() {
    this.count = this.count - 1;
  },

  // コールバック内ではアロー関数を使う
  incrementMultiple: function(times) {
    const numbers = [];
    for (let i = 0; i < times; i++) {
      numbers.push(i);
    }

    // アロー関数を使うことで、thisがcounterを参照する
    numbers.forEach(() => {
      this.count = this.count + 1;
    });
  },

  getCount: function() {
    return this.count;
  }
};

counter.increment();
console.log(counter.getCount()); // => 1

counter.incrementMultiple(5);
console.log(counter.getCount()); // => 6
```

## 実践例: タイマー

```javascript
const stopwatch = {
  seconds: 0,
  intervalId: null,

  start: function() {
    // アロー関数を使うことで、thisがstopwatchを参照する
    this.intervalId = setInterval(() => {
      this.seconds = this.seconds + 1;
      console.log(this.seconds + '秒経過');
    }, 1000);
  },

  stop: function() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  },

  reset: function() {
    this.stop();
    this.seconds = 0;
  }
};

// 使用例
stopwatch.start();  // タイマー開始
// 5秒後...
stopwatch.stop();   // タイマー停止
stopwatch.reset();  // リセット
```

## 配列メソッドでの活用

```javascript
const calculator = {
  baseValue: 10,

  // 配列の各要素にbaseValueを加算
  addToAll: function(numbers) {
    // アロー関数を使うことで、thisがcalculatorを参照する
    return numbers.map(n => n + this.baseValue);
  },

  // 配列からbaseValue以上の値を取得
  filterGreaterThan: function(numbers) {
    return numbers.filter(n => n >= this.baseValue);
  }
};

const numbers = [1, 5, 10, 15, 20];

console.log(calculator.addToAll(numbers));
// => [11, 15, 20, 25, 30]

console.log(calculator.filterGreaterThan(numbers));
// => [10, 15, 20]
```

## まとめ：使い分けの指針

### 通常の関数を使う場合

1. **オブジェクトのメソッド定義**

```javascript
const obj = {
  value: 10,
  getValue: function() {  // ✓ 通常の関数
    return this.value;
  }
};
```

2. **thisを参照する必要がある関数**

```javascript
const person = {
  name: '太郎',
  greet: function() {  // ✓ 通常の関数
    return 'こんにちは、' + this.name + 'です';
  }
};
```

### アロー関数を使う場合

1. **コールバック関数**

```javascript
const obj = {
  values: [1, 2, 3],
  processAll: function() {
    // ✓ アロー関数
    return this.values.map(v => v * 2);
  }
};
```

2. **thisを外側から引き継ぎたい場合**

```javascript
const timer = {
  count: 0,
  start: function() {
    setInterval(() => {  // ✓ アロー関数
      this.count++;
    }, 1000);
  }
};
```

3. **単純なデータ変換**

```javascript
const double = n => n * 2;  // ✓ アロー関数
const add = (a, b) => a + b;  // ✓ アロー関数
```

## よくある間違い

### 間違い1: オブジェクトのメソッドでアロー関数を使う

```javascript
// ✗ 悪い例
const person = {
  name: '太郎',
  greet: () => {
    return 'こんにちは、' + this.name + 'です'; // thisが機能しない
  }
};

// ✓ 良い例
const person = {
  name: '太郎',
  greet: function() {
    return 'こんにちは、' + this.name + 'です';
  }
};
```

### 間違い2: コールバックで通常の関数を使う

```javascript
// ✗ 悪い例
const obj = {
  values: [1, 2, 3],
  baseValue: 10,
  addToAll: function() {
    return this.values.map(function(v) {
      return v + this.baseValue; // thisが正しく参照されない
    });
  }
};

// ✓ 良い例
const obj = {
  values: [1, 2, 3],
  baseValue: 10,
  addToAll: function() {
    return this.values.map(v => v + this.baseValue);
  }
};
```

## まとめ

このレッスンで学んだこと:

1. **thisとは**: 関数が実行されるコンテキストを参照する
2. **通常の関数のthis**: 呼び出された方法によって変わる
3. **アロー関数のthis**: 定義された場所のthisを引き継ぐ
4. **使い分け**:
   - オブジェクトのメソッド定義 → 通常の関数
   - コールバック関数 → アロー関数
   - thisを使わない単純な関数 → アロー関数
5. **配列メソッド**: map、filter、reduceなどではアロー関数が便利

アロー関数と通常の関数のthisの違いを理解することで、より適切な関数の選択ができるようになります。
