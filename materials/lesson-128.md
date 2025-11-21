# レッスン128: ユーティリティ関数の作成

## このレッスンで学ぶこと

- 汎用的な処理を関数化する方法
- 日付フォーマット関数の作成
- 数値フォーマット関数の作成
- 文字列操作関数の作成

## ユーティリティ関数とは

ユーティリティ関数は、プログラムの様々な場所で繰り返し使われる汎用的な処理を関数としてまとめたものです。これにより、コードの重複を減らし、保守性を向上させることができます。

```javascript
// ユーティリティ関数の例
const capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

console.log(capitalize('hello')); // => 'Hello'
console.log(capitalize('world')); // => 'World'
```

### ユーティリティ関数の特徴

1. **汎用的**: 特定の処理に依存しない
2. **再利用可能**: プロジェクト全体で使える
3. **シンプル**: 1つの明確な目的を持つ
4. **独立**: 他の関数に依存しない

## 日付フォーマット関数

日付を見やすい形式に変換する関数を作成してみましょう。

```javascript
const formatDate = function(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}年${month}月${day}日`;
};

const today = new Date();
console.log(formatDate(today)); // => '2024年01月15日'
```

### padStartメソッド

`padStart`は文字列を指定した長さになるまで、先頭に文字を追加するメソッドです。

```javascript
String(5).padStart(2, '0');  // => '05'
String(12).padStart(2, '0'); // => '12'
String(3).padStart(3, '0');  // => '003'
```

## 数値フォーマット関数

数値を見やすい形式に変換する関数を作成してみましょう。

### 3桁区切りのカンマ

```javascript
const formatNumber = function(num) {
  return num.toLocaleString('ja-JP');
};

console.log(formatNumber(1234567));    // => '1,234,567'
console.log(formatNumber(1000));       // => '1,000'
console.log(formatNumber(123));        // => '123'
```

### 小数点以下の桁数指定

```javascript
const formatDecimal = function(num, digits) {
  return num.toFixed(digits);
};

console.log(formatDecimal(3.14159, 2));  // => '3.14'
console.log(formatDecimal(10, 2));       // => '10.00'
console.log(formatDecimal(5.6789, 3));   // => '5.679'
```

## 文字列操作関数

文字列を扱う便利な関数を作成してみましょう。

### 文字列の切り詰め

```javascript
const truncate = function(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
};

console.log(truncate('こんにちは', 5));           // => 'こんにちは'
console.log(truncate('こんにちは世界', 5));       // => 'こんにちは...'
console.log(truncate('長い文字列です', 3));       // => '長い文...'
```

### 文字列の反復

```javascript
const repeat = function(str, count) {
  let result = '';
  for (let i = 0; i < count; i++) {
    result += str;
  }
  return result;
};

console.log(repeat('★', 3));    // => '★★★'
console.log(repeat('Hello', 2)); // => 'HelloHello'
```

注: 実際のJavaScriptには`String.prototype.repeat()`メソッドがありますが、ここでは学習のために自作しています。

## 配列操作関数

配列を扱う便利な関数を作成してみましょう。

### 配列の最大値・最小値

```javascript
const max = function(array) {
  let maxValue = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }
  return maxValue;
};

const min = function(array) {
  let minValue = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    }
  }
  return minValue;
};

const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
console.log(max(numbers)); // => 9
console.log(min(numbers)); // => 1
```

### 配列の平均値

```javascript
const average = function(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / array.length;
};

const scores = [80, 90, 70, 85, 95];
console.log(average(scores)); // => 84
```

## 実践例: 商品情報の表示

複数のユーティリティ関数を組み合わせて使ってみましょう。

```javascript
const formatPrice = function(price) {
  return '¥' + price.toLocaleString('ja-JP');
};

const formatDate = function(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

const truncate = function(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
};

// 商品情報の表示
const product = {
  name: 'プログラミング学習コース 完全版',
  price: 29800,
  releaseDate: new Date(2024, 0, 15)
};

const displayName = truncate(product.name, 15);
const displayPrice = formatPrice(product.price);
const displayDate = formatDate(product.releaseDate);

console.log(`商品名: ${displayName}`);
console.log(`価格: ${displayPrice}`);
console.log(`発売日: ${displayDate}`);
```

出力:
```
商品名: プログラミング学習コース...
価格: ¥29,800
発売日: 2024/01/15
```

## まとめ

このレッスンで学んだこと:

1. **ユーティリティ関数の目的**: 汎用的な処理を再利用可能にする
2. **日付フォーマット**: `getFullYear()`, `getMonth()`, `getDate()`, `padStart()`
3. **数値フォーマット**: `toLocaleString()`, `toFixed()`
4. **文字列操作**: `slice()`, `charAt()`, `toUpperCase()`
5. **配列操作**: ループを使った最大値、最小値、平均値の計算
6. **関数の組み合わせ**: 複数のユーティリティ関数を使った実践的な処理

ユーティリティ関数を作成する習慣を身につけることで、より保守性の高いコードが書けるようになります。
