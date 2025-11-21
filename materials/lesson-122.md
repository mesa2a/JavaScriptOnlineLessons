# レッスン122：関数式の基本

## 学習目標
- 関数式の書き方を理解する
- 変数に関数を代入できることを学ぶ
- 関数宣言と関数式の違いを理解する

## 関数式とは

これまで学んだ関数の書き方は**関数宣言**と呼ばれます。

```javascript
// 関数宣言（これまで学んだ方法）
function greet() {
  alert('こんにちは');
}
```

JavaScriptでは、関数を**値として扱う**ことができます。関数を変数に代入する書き方を**関数式**と呼びます。

```javascript
// 関数式（新しい方法）
const greet = function() {
  alert('こんにちは');
};
```

## 関数式の基本構文

関数式は `function` キーワードの後に関数名を書かず、変数に代入します。

```javascript
const 変数名 = function() {
  // 処理
};
```

### 例1: 引数なし

```javascript
const sayHello = function() {
  alert('Hello!');
};

// 呼び出し方は同じ
sayHello();  // 'Hello!'
```

### 例2: 引数あり

```javascript
const greet = function(name) {
  alert('こんにちは、' + name + 'さん');
};

greet('太郎');  // 'こんにちは、太郎さん'
```

### 例3: 戻り値あり

```javascript
const add = function(a, b) {
  return a + b;
};

const result = add(5, 3);  // 8
```

## 関数宣言 vs 関数式

### 関数宣言

```javascript
function add(a, b) {
  return a + b;
}
```

**特徴:**
- `function` キーワードで始まる
- 関数名が必須
- 巻き上げ（ホイスティング）される

### 関数式

```javascript
const add = function(a, b) {
  return a + b;
};
```

**特徴:**
- 変数に代入する
- `function` の後の関数名は省略可能（通常は省略）
- 巻き上げされない
- セミコロン `;` が必要

## 巻き上げ（ホイスティング）の違い

### 関数宣言：巻き上げされる

関数宣言は、定義前に呼び出せます。

```javascript
// 定義前に呼び出せる
greet();  // 'こんにちは' と表示される

function greet() {
  alert('こんにちは');
}
```

JavaScriptが自動的に関数を上に移動（巻き上げ）してくれるためです。

### 関数式：巻き上げされない

関数式は、定義前に呼び出せません。

```javascript
// エラー！定義前に呼び出せない
greet();  // エラー: greet is not a function

const greet = function() {
  alert('こんにちは');
};
```

関数式は変数なので、定義した後でないと使えません。

## 正しい使い方

関数式は、定義の後に呼び出します。

```javascript
// 正しい：定義の後に呼び出す
const greet = function() {
  alert('こんにちは');
};

greet();  // OK
```

## 関数は値である

JavaScriptでは、関数は**第一級オブジェクト**です。つまり、値として扱えます。

### 1. 変数に代入できる

```javascript
const myFunc = function() {
  return 'Hello';
};
```

### 2. 他の変数に再代入できる

```javascript
const func1 = function() {
  return 'Hello';
};

const func2 = func1;  // 関数をコピー
func2();  // 'Hello'
```

### 3. 引数として渡せる（後で学習）

```javascript
function execute(func) {
  func();
}

const myFunc = function() {
  alert('実行されました');
};

execute(myFunc);
```

### 4. 戻り値として返せる（後で学習）

```javascript
function createGreeter() {
  return function() {
    return 'こんにちは';
  };
}
```

## 実践例：計算機

関数式を使った計算機です。

```javascript
// 足し算
const add = function(a, b) {
  return a + b;
};

// 引き算
const subtract = function(a, b) {
  return a - b;
};

// 掛け算
const multiply = function(a, b) {
  return a * b;
};

// 割り算
const divide = function(a, b) {
  if (b === 0) {
    return 0;
  }
  return a / b;
};

// 使用例
console.log(add(10, 5));       // 15
console.log(subtract(10, 5));  // 5
console.log(multiply(10, 5));  // 50
console.log(divide(10, 5));    // 2
```

## どちらを使うべきか

### 関数宣言を使う場合
- トップレベルの関数
- 再利用する関数
- 巻き上げが必要な場合

```javascript
function calculateTotal(price, quantity) {
  return price * quantity;
}
```

### 関数式を使う場合
- 変数に関数を代入したい
- 後で別の関数に差し替える可能性がある
- コールバック関数として使う（次のレッスンで学習）

```javascript
const calculateTotal = function(price, quantity) {
  return price * quantity;
};
```

## よくある間違い

### 間違い1: セミコロンを忘れる

```javascript
// 間違い
const greet = function() {
  alert('こんにちは');
}  // セミコロンがない

// 正しい
const greet = function() {
  alert('こんにちは');
};  // セミコロンが必要
```

### 間違い2: 定義前に呼び出す

```javascript
// 間違い
greet();  // エラー

const greet = function() {
  alert('こんにちは');
};

// 正しい
const greet = function() {
  alert('こんにちは');
};

greet();  // OK
```

### 間違い3: let や var で宣言

```javascript
// 避けるべき
let greet = function() {
  alert('こんにちは');
};

// 推奨：const を使う
const greet = function() {
  alert('こんにちは');
};
```

関数を再代入することは稀なので、`const` を使うのが推奨されます。

## 名前付き関数式

関数式でも、関数に名前を付けることができます（オプション）。

```javascript
const greet = function greetFunc() {
  alert('こんにちは');
};
```

ただし、この名前は関数の外からは呼び出せません。

```javascript
const greet = function greetFunc() {
  alert('こんにちは');
};

greet();       // OK
greetFunc();   // エラー: greetFunc is not defined
```

通常は名前を省略します。

## まとめ

1. **関数式**は、関数を変数に代入する書き方
2. 構文: `const 変数名 = function() { };`
3. **セミコロン**が必要
4. **巻き上げされない**ので、定義の後に呼び出す
5. 関数は**値**として扱える（第一級オブジェクト）
6. 基本的に `const` で宣言する

### 関数宣言と関数式の比較

| 項目 | 関数宣言 | 関数式 |
|------|---------|--------|
| 書き方 | `function name() {}` | `const name = function() {};` |
| 関数名 | 必須 | 省略可能 |
| セミコロン | 不要 | 必要 |
| 巻き上げ | される | されない |
| 使い分け | 一般的な関数 | 変数として扱いたい時 |

次回は、関数式の応用として、無名関数の活用方法を学びます。
