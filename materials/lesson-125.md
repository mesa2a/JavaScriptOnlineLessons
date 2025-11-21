# レッスン125：関数を返す関数

## 学習目標
- 関数から関数を返す方法を理解する
- クロージャの基本概念を学ぶ
- カスタマイズ可能な関数の作り方を身につける

## 関数を返す関数とは

JavaScriptでは、関数は値として扱えます。つまり、**関数から関数を返す**ことができます。

### 基本形

```javascript
function createGreeter() {
  return function() {
    alert('こんにちは');
  };
}

// 関数を取得
const greet = createGreeter();

// 取得した関数を実行
greet();  // 'こんにちは'
```

`createGreeter()` を呼ぶと、新しい関数が返ってきます。

## なぜ関数を返すのか

### 1. カスタマイズ可能な関数を作れる

```javascript
function createGreeter(name) {
  return function() {
    alert('こんにちは、' + name + 'さん');
  };
}

const greetTaro = createGreeter('太郎');
const greetHanako = createGreeter('花子');

greetTaro();   // 'こんにちは、太郎さん'
greetHanako(); // 'こんにちは、花子さん'
```

同じ仕組みで、異なる動作をする関数を作れます。

### 2. 設定を覚えておける

```javascript
function createCounter(start) {
  let count = start;

  return function() {
    count = count + 1;
    return count;
  };
}

const counter1 = createCounter(0);
const counter2 = createCounter(100);

console.log(counter1());  // 1
console.log(counter1());  // 2
console.log(counter2());  // 101
console.log(counter2());  // 102
```

それぞれのカウンターが独立した状態を持っています。

## クロージャ

**クロージャ**は、関数が作られた時の環境（変数）を覚えておく仕組みです。

```javascript
function createAdder(x) {
  // x はこの関数のパラメータ

  return function(y) {
    // 内側の関数は外側の x を覚えている
    return x + y;
  };
}

const add5 = createAdder(5);
const add10 = createAdder(10);

console.log(add5(3));   // 8  (5 + 3)
console.log(add10(3));  // 13 (10 + 3)
```

`add5` は `x = 5` を覚えていて、`add10` は `x = 10` を覚えています。

## 実践例：挨拶関数ファクトリー

カスタマイズされた挨拶関数を作ります。

```javascript
function createGreeting(greeting) {
  return function(name) {
    return greeting + '、' + name + 'さん！';
  };
}

// 異なる挨拶関数を作る
const sayHello = createGreeting('こんにちは');
const sayGoodbye = createGreeting('さようなら');
const sayThanks = createGreeting('ありがとう');

console.log(sayHello('太郎'));     // 'こんにちは、太郎さん！'
console.log(sayGoodbye('花子'));   // 'さようなら、花子さん！'
console.log(sayThanks('次郎'));    // 'ありがとう、次郎さん！'
```

## 実践例：計算関数ファクトリー

特定の数値を使う計算関数を作ります。

```javascript
function createMultiplier(multiplier) {
  return function(value) {
    return value * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const tenTimes = createMultiplier(10);

console.log(double(5));     // 10
console.log(triple(5));     // 15
console.log(tenTimes(5));   // 50
```

## 実践例：カウンター

プライベートな状態を持つカウンターです。

```javascript
function createCounter() {
  let count = 0;  // プライベート変数

  return function() {
    count = count + 1;
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1());  // 1
console.log(counter1());  // 2
console.log(counter2());  // 1 (独立している)
console.log(counter1());  // 3
```

それぞれのカウンターが独立した `count` を持っています。

## 実践例：複数のメソッドを返す

オブジェクトとして複数の関数を返すこともできます。

```javascript
function createCounter(start) {
  let count = start;

  return {
    increment: function() {
      count = count + 1;
      return count;
    },
    decrement: function() {
      count = count - 1;
      return count;
    },
    getValue: function() {
      return count;
    },
    reset: function() {
      count = start;
      return count;
    }
  };
}

const counter = createCounter(10);

console.log(counter.increment());  // 11
console.log(counter.increment());  // 12
console.log(counter.decrement());  // 11
console.log(counter.getValue());   // 11
console.log(counter.reset());      // 10
```

## 実践例：設定を持つバリデーター

検証ルールをカスタマイズできます。

```javascript
function createValidator(minLength) {
  return function(text) {
    return text.length >= minLength;
  };
}

const validateShort = createValidator(3);   // 3文字以上
const validateMedium = createValidator(8);  // 8文字以上
const validateLong = createValidator(16);   // 16文字以上

console.log(validateShort('ab'));       // false
console.log(validateShort('abc'));      // true
console.log(validateMedium('pass'));    // false
console.log(validateMedium('password')); // true
```

## 実践例：税金計算機ファクトリー

税率が設定された計算機を作ります。

```javascript
function createTaxCalculator(taxRate) {
  return function(price) {
    const tax = price * taxRate;
    const total = price + tax;
    return {
      price: price,
      tax: tax,
      total: total
    };
  };
}

const japanTax = createTaxCalculator(0.1);   // 10%
const usaTax = createTaxCalculator(0.07);    // 7%

console.log(japanTax(1000));  // { price: 1000, tax: 100, total: 1100 }
console.log(usaTax(1000));    // { price: 1000, tax: 70, total: 1070 }
```

## クロージャの注意点

### 1. 変数は共有される

```javascript
function createCounters() {
  let count = 0;  // 共有される

  return {
    counter1: function() {
      count = count + 1;
      return count;
    },
    counter2: function() {
      count = count + 1;
      return count;
    }
  };
}

const counters = createCounters();
console.log(counters.counter1());  // 1
console.log(counters.counter2());  // 2 (同じcountを使っている)
```

### 2. 独立させるには別々に作る

```javascript
function createCounter() {
  let count = 0;

  return function() {
    count = count + 1;
    return count;
  };
}

const counter1 = createCounter();  // 独立したcount
const counter2 = createCounter();  // 別の独立したcount

console.log(counter1());  // 1
console.log(counter2());  // 1 (独立している)
```

## 高階関数

**高階関数**は、以下のいずれかを満たす関数です：
1. 関数を引数として受け取る
2. 関数を戻り値として返す

関数を返す関数は、高階関数の一種です。

```javascript
// 高階関数の例
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}
```

## 関数ファクトリーのパターン

### パターン1: パラメータを記憶

```javascript
function createFormatter(prefix, suffix) {
  return function(text) {
    return prefix + text + suffix;
  };
}

const addBrackets = createFormatter('[', ']');
const addQuotes = createFormatter('"', '"');

console.log(addBrackets('Hello'));  // '[Hello]'
console.log(addQuotes('Hello'));    // '"Hello"'
```

### パターン2: 初期状態を持つ

```javascript
function createTimer(initialSeconds) {
  let seconds = initialSeconds;

  return {
    tick: function() {
      if (seconds > 0) {
        seconds = seconds - 1;
      }
      return seconds;
    },
    getTime: function() {
      return seconds;
    }
  };
}

const timer = createTimer(10);
console.log(timer.tick());  // 9
console.log(timer.tick());  // 8
```

### パターン3: 設定を適用

```javascript
function createPriceFormatter(currency, locale) {
  return function(price) {
    return currency + price.toLocaleString(locale);
  };
}

const formatJPY = createPriceFormatter('¥', 'ja-JP');
const formatUSD = createPriceFormatter('$', 'en-US');

console.log(formatJPY(1000));   // '¥1,000'
console.log(formatUSD(1000));   // '$1,000'
```

## まとめ

1. 関数は**関数を返すことができる**
2. 構文: `return function() { }`
3. **クロージャ**で外側の変数を覚えておける
4. **カスタマイズ可能な関数**を作れる
5. **独立した状態**を持つ関数を作れる
6. これを**関数ファクトリー**と呼ぶ

### 基本パターン

```javascript
// 関数ファクトリー
function createFunction(parameter) {
  return function() {
    // parameter を使える（クロージャ）
    return parameter;
  };
}

const func = createFunction('Hello');
console.log(func());  // 'Hello'
```

### 使い分け

- **同じような関数が複数必要** → 関数ファクトリー
- **設定を覚えておきたい** → クロージャを使う
- **独立した状態を持ちたい** → 関数を返す

関数を返す関数は、より柔軟で再利用可能なコードを書くための強力な手法です。

次回は、関数を引数として受け取る方法を学びます。
