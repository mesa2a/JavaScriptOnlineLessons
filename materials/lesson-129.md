# レッスン129: デバッグとエラー処理

## このレッスンで学ぶこと

- console.logを使ったデバッグ
- エラーの種類と原因
- try-catchによるエラー処理
- エラーメッセージの読み方

## デバッグとは

デバッグとは、プログラムのバグ（不具合）を見つけて修正する作業のことです。プログラミングでは、コードを書く時間よりもデバッグに時間がかかることも多くあります。

### console.logを使ったデバッグ

最も基本的なデバッグ方法は、`console.log()`を使って値を確認することです。

```javascript
const calculateTotal = function(price, quantity) {
  console.log('price:', price);      // 値の確認
  console.log('quantity:', quantity); // 値の確認

  const total = price * quantity;
  console.log('total:', total);      // 計算結果の確認

  return total;
};

calculateTotal(100, 3);
```

コンソール出力:
```
price: 100
quantity: 3
total: 300
```

### 複数の値を同時に表示

```javascript
const user = {
  name: '田中太郎',
  age: 25,
  email: 'tanaka@example.com'
};

console.log('ユーザー情報:', user);
console.log('名前:', user.name, '年齢:', user.age);
```

## よくあるエラーの種類

JavaScriptには主に以下のようなエラーがあります。

### 1. ReferenceError（参照エラー）

存在しない変数や関数を使おうとしたときに発生します。

```javascript
// エラーの例
console.log(foo); // ReferenceError: foo is not defined

// 修正版
const foo = 'Hello';
console.log(foo); // => 'Hello'
```

### 2. TypeError（型エラー）

期待される型と異なる操作を行ったときに発生します。

```javascript
// エラーの例
const num = 123;
num.toUpperCase(); // TypeError: num.toUpperCase is not a function

// 修正版
const str = '123';
str.toUpperCase(); // => '123'
```

### 3. SyntaxError（構文エラー）

JavaScriptの文法が間違っているときに発生します。

```javascript
// エラーの例
const message = 'Hello; // SyntaxError: Unterminated string constant

// 修正版
const message = 'Hello';
```

### 4. RangeError（範囲エラー）

数値が許容範囲外のときに発生します。

```javascript
// エラーの例
const array = new Array(-1); // RangeError: Invalid array length

// 修正版
const array = new Array(5); // => [empty × 5]
```

## try-catchによるエラー処理

エラーが発生する可能性がある処理は、`try-catch`文で囲むことで、プログラムが停止するのを防ぐことができます。

### 基本的な使い方

```javascript
try {
  // エラーが発生する可能性のある処理
  const result = riskyOperation();
  console.log('成功:', result);
} catch (error) {
  // エラーが発生したときの処理
  console.log('エラーが発生しました:', error.message);
}

console.log('プログラムは続きます');
```

### 実践例: 数値の検証

```javascript
const divide = function(a, b) {
  try {
    if (b === 0) {
      throw new Error('0で割ることはできません');
    }
    return a / b;
  } catch (error) {
    console.log('エラー:', error.message);
    return null;
  }
};

console.log(divide(10, 2));  // => 5
console.log(divide(10, 0));  // エラー: 0で割ることはできません => null
```

### throwでエラーを発生させる

`throw`を使って、意図的にエラーを発生させることができます。

```javascript
const checkAge = function(age) {
  if (age < 0) {
    throw new Error('年齢は0以上である必要があります');
  }
  if (age < 20) {
    return '未成年です';
  }
  return '成人です';
};

try {
  console.log(checkAge(25));   // => '成人です'
  console.log(checkAge(-5));   // エラーが発生
} catch (error) {
  console.log('入力エラー:', error.message);
}
```

## エラーメッセージの読み方

エラーメッセージには、問題を解決するための重要な情報が含まれています。

```javascript
Uncaught ReferenceError: foo is not defined
    at script.js:5:13
```

- **Uncaught**: キャッチされていないエラー
- **ReferenceError**: エラーの種類
- **foo is not defined**: エラーの内容（fooが定義されていない）
- **at script.js:5:13**: エラーが発生した場所（5行目13文字目）

## 実践例: フォームのバリデーション

```javascript
const validateForm = function(data) {
  const errors = [];

  // 名前のチェック
  if (!data.name || data.name.trim() === '') {
    errors.push('名前を入力してください');
  }

  // メールアドレスのチェック
  if (!data.email || !data.email.includes('@')) {
    errors.push('有効なメールアドレスを入力してください');
  }

  // 年齢のチェック
  if (!data.age || data.age < 0 || data.age > 120) {
    errors.push('有効な年齢を入力してください');
  }

  return errors;
};

// テスト
const formData1 = {
  name: '田中太郎',
  email: 'tanaka@example.com',
  age: 25
};

const formData2 = {
  name: '',
  email: 'invalid-email',
  age: -5
};

console.log(validateForm(formData1)); // => []
console.log(validateForm(formData2));
// => ['名前を入力してください', '有効なメールアドレスを入力してください', '有効な年齢を入力してください']
```

## 実践例: 安全なJSON解析

JSONの解析はエラーが発生しやすい処理の1つです。

```javascript
const safeParseJSON = function(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// 正常なJSON
const result1 = safeParseJSON('{"name": "太郎", "age": 25}');
console.log(result1);
// => { success: true, data: { name: '太郎', age: 25 } }

// 不正なJSON
const result2 = safeParseJSON('{ name: 太郎 }');
console.log(result2);
// => { success: false, error: 'Unexpected token n in JSON at position 2' }
```

## デバッグのヒント

### 1. エラーメッセージをよく読む

エラーメッセージには問題の場所と原因が書かれています。

### 2. console.logで値を確認する

思った通りの値になっているか、こまめに確認しましょう。

```javascript
const calculateDiscount = function(price, rate) {
  console.log('価格:', price);
  console.log('割引率:', rate);

  const discount = price * rate;
  console.log('割引額:', discount);

  const total = price - discount;
  console.log('合計:', total);

  return total;
};
```

### 3. 小さく分けて確認する

複雑な処理は小さな部分に分けて、1つずつ動作を確認しましょう。

```javascript
// 複雑な処理
const result = data.filter(x => x.age >= 20).map(x => x.name).join(', ');

// 小さく分けて確認
const adults = data.filter(x => x.age >= 20);
console.log('成人:', adults);

const names = adults.map(x => x.name);
console.log('名前:', names);

const result = names.join(', ');
console.log('結果:', result);
```

### 4. ブラウザの開発者ツールを使う

ブラウザのコンソール（F12キー）でエラーメッセージやconsole.logの出力を確認できます。

## まとめ

このレッスンで学んだこと:

1. **console.logでのデバッグ**: 値や処理の流れを確認する
2. **エラーの種類**: ReferenceError, TypeError, SyntaxError, RangeError
3. **try-catch**: エラーをキャッチして適切に処理する
4. **throw**: 意図的にエラーを発生させる
5. **バリデーション**: 入力値のチェックとエラーメッセージの作成
6. **安全な処理**: エラーが発生しても止まらないコードを書く

デバッグとエラー処理は、プログラミングにおいて非常に重要なスキルです。エラーを恐れず、適切に対処することで、より堅牢なプログラムを作ることができます。
