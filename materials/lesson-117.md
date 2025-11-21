# レッスン117：グローバル変数

## 学習目標
- グローバル変数とは何かを理解する
- ローカル変数とグローバル変数の違いを理解する
- グローバル変数の使い方と注意点を学ぶ

## グローバル変数とは

**グローバル変数**は、関数の外で宣言された変数のことです。グローバル変数は、プログラムのどこからでもアクセスできます。

```javascript
const appName = 'マイアプリ';  // グローバル変数

function showAppName() {
  alert(appName);  // グローバル変数にアクセスできる
}

showAppName();  // 'マイアプリ' と表示される
```

## ローカル変数とグローバル変数の違い

前回学んだローカル変数と比較してみましょう。

```javascript
const globalMessage = 'グローバル';  // グローバル変数

function test() {
  const localMessage = 'ローカル';  // ローカル変数

  console.log(globalMessage);  // OK: グローバル変数にアクセス可能
  console.log(localMessage);   // OK: ローカル変数にアクセス可能
}

test();

console.log(globalMessage);  // OK: グローバル変数にアクセス可能
console.log(localMessage);   // エラー: ローカル変数にはアクセスできない
```

### 違いのまとめ

| 種類 | 宣言場所 | アクセス範囲 |
|------|----------|--------------|
| ローカル変数 | 関数の中 | その関数の中だけ |
| グローバル変数 | 関数の外 | プログラムのどこからでも |

## グローバル変数の活用例

複数の関数から同じデータにアクセスしたい場合に便利です。

```javascript
const userName = '太郎';  // グローバル変数

function greet() {
  alert('こんにちは、' + userName + 'さん');
}

function farewell() {
  alert('さようなら、' + userName + 'さん');
}

greet();      // 'こんにちは、太郎さん'
farewell();   // 'さようなら、太郎さん'
```

両方の関数から同じ `userName` にアクセスできています。

## グローバル変数の更新

グローバル変数の値を変更すると、すべての場所でその変更が反映されます。

```javascript
let score = 0;  // グローバル変数

function addPoint() {
  score = score + 10;  // グローバル変数を更新
  alert('現在のスコア: ' + score);
}

addPoint();  // '現在のスコア: 10'
addPoint();  // '現在のスコア: 20'
addPoint();  // '現在のスコア: 30'
```

## ローカル変数とグローバル変数が同じ名前の場合

同じ名前の変数がある場合、ローカル変数が優先されます。

```javascript
const message = 'グローバル';  // グローバル変数

function test() {
  const message = 'ローカル';  // ローカル変数（同じ名前）
  console.log(message);  // 'ローカル' と表示（ローカル変数が優先）
}

test();
console.log(message);  // 'グローバル' と表示
```

## グローバル変数の注意点

### 1. 使いすぎに注意

グローバル変数を多用すると、どこで値が変更されたかわかりにくくなります。

```javascript
let count = 0;  // グローバル変数

function funcA() {
  count = count + 1;
}

function funcB() {
  count = count + 2;
}

function funcC() {
  count = 0;
}

// countがどこで変更されたかわかりにくい
```

### 2. なるべく引数と戻り値を使う

可能な限り、グローバル変数ではなく引数と戻り値を使う方が安全です。

```javascript
// グローバル変数を使う（あまり良くない）
let total = 0;

function add(value) {
  total = total + value;
}

// 引数と戻り値を使う（良い）
function add(current, value) {
  return current + value;
}

let total = 0;
total = add(total, 10);
total = add(total, 20);
```

### 3. 定数として使う場合は便利

変更しない値（定数）をグローバル変数にするのは良い使い方です。

```javascript
const TAX_RATE = 0.1;  // 消費税率（定数）
const APP_VERSION = '1.0.0';  // アプリバージョン（定数）

function calculatePrice(price) {
  return price + (price * TAX_RATE);
}

function showVersion() {
  alert('バージョン: ' + APP_VERSION);
}
```

## いつグローバル変数を使うべきか

### 使って良い場合
- アプリ全体で使う設定値や定数
- 複数の関数で共有する必要がある状態

### 避けるべき場合
- 一つの関数内だけで使う値
- 引数と戻り値で代用できる場合

## まとめ

1. **グローバル変数**は関数の外で宣言し、どこからでもアクセスできる
2. **ローカル変数**は関数の中で宣言し、その関数内だけでアクセスできる
3. グローバル変数は便利だが、**使いすぎると問題**が起きる
4. 基本的には**引数と戻り値**を使い、必要な場合だけグローバル変数を使う
5. **定数**をグローバル変数にするのは良い使い方

次回は、引数と戻り値の型について学びます。
