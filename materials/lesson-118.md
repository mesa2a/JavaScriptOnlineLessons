# レッスン118：引数と戻り値の型

## 学習目標
- 関数の引数と戻り値にはデータ型があることを理解する
- 型の一貫性を保つことの重要性を学ぶ
- 型を意識した関数の書き方を身につける

## 引数と戻り値の型

JavaScriptの変数にはデータ型があることを学びました。関数の**引数**と**戻り値**にも型があります。

```javascript
function add(a, b) {
  return a + b;
}

const result = add(5, 3);  // 8
```

この関数は:
- 引数: 数値を2つ受け取る
- 戻り値: 数値を返す

## 型を意識する理由

型を意識して関数を書くと、予期しない動作を防げます。

```javascript
function add(a, b) {
  return a + b;
}

add(5, 3);      // 8 (期待通り)
add('5', '3');  // '53' (文字列の連結になってしまう!)
```

文字列を渡すと、足し算ではなく文字列の連結になってしまいます。

## 数値を受け取る関数

数値を受け取ることを想定した関数の例です。

```javascript
function calculateTax(price) {
  return price * 0.1;  // 10%の税金を計算
}

calculateTax(1000);  // 100 (正しい)
calculateTax('1000');  // '10001000...' (おかしな結果!)
```

### 型チェックを追加

引数の型をチェックすることで、安全な関数になります。

```javascript
function calculateTax(price) {
  if (typeof price !== 'number') {
    return 0;  // 数値でない場合は0を返す
  }
  return price * 0.1;
}

calculateTax(1000);    // 100
calculateTax('1000');  // 0 (安全に処理できた)
```

## 文字列を受け取る関数

文字列を受け取ることを想定した関数の例です。

```javascript
function greet(name) {
  return 'こんにちは、' + name + 'さん';
}

greet('太郎');  // 'こんにちは、太郎さん'
greet(123);     // 'こんにちは、123さん' (動くが意図と違う)
```

### 型チェックを追加

```javascript
function greet(name) {
  if (typeof name !== 'string') {
    return 'こんにちは';
  }
  return 'こんにちは、' + name + 'さん';
}

greet('太郎');  // 'こんにちは、太郎さん'
greet(123);     // 'こんにちは' (安全に処理できた)
```

## 数値を返す関数

戻り値が数値であることを保証する関数です。

```javascript
function getAge(birthYear) {
  const currentYear = 2024;
  const age = currentYear - birthYear;

  if (age < 0 || age > 150) {
    return 0;  // 不正な値の場合は0を返す
  }

  return age;  // 常に数値を返す
}
```

この関数は:
- 引数: 数値（生まれ年）
- 戻り値: 常に数値（年齢、または0）

## 文字列を返す関数

戻り値が文字列であることを保証する関数です。

```javascript
function formatPrice(price) {
  if (typeof price !== 'number') {
    return '価格不明';  // エラー時も文字列を返す
  }
  return price + '円';  // 常に文字列を返す
}

formatPrice(1000);     // '1000円'
formatPrice('abc');    // '価格不明'
```

この関数は:
- 引数: 数値を期待
- 戻り値: 常に文字列

## 型の一貫性

同じ関数から異なる型の値を返すのは避けましょう。

### 悪い例

```javascript
function divide(a, b) {
  if (b === 0) {
    return '0で割れません';  // 文字列
  }
  return a / b;  // 数値
}

const result = divide(10, 2);
const doubled = result * 2;  // resultが文字列の場合、おかしな結果に
```

### 良い例

```javascript
function divide(a, b) {
  if (b === 0) {
    return 0;  // エラー時も数値を返す
  }
  return a / b;  // 数値
}

const result = divide(10, 2);
const doubled = result * 2;  // 常に正しく計算できる
```

## 複数の型を扱う場合

引数が複数の型を受け付ける場合は、明確に処理を分けます。

```javascript
function convertToNumber(value) {
  if (typeof value === 'number') {
    return value;  // すでに数値
  }

  if (typeof value === 'string') {
    const num = Number(value);
    if (isNaN(num)) {
      return 0;  // 変換失敗時は0
    }
    return num;
  }

  return 0;  // その他の型は0
}

convertToNumber(123);      // 123
convertToNumber('456');    // 456
convertToNumber('abc');    // 0
convertToNumber(true);     // 0
```

この関数は:
- 引数: 任意の型
- 戻り値: 常に数値

## 実践例：BMI計算

型を意識したBMI計算関数です。

```javascript
function calculateBMI(height, weight) {
  // 引数の型チェック
  if (typeof height !== 'number' || typeof weight !== 'number') {
    return 0;  // エラー時は0を返す
  }

  // 値の範囲チェック
  if (height <= 0 || weight <= 0) {
    return 0;
  }

  // BMI計算
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);

  // 小数点以下1桁に丸める
  return Math.round(bmi * 10) / 10;  // 常に数値を返す
}

calculateBMI(170, 60);      // 20.8
calculateBMI('170', 60);    // 0 (型エラー)
calculateBMI(170, -60);     // 0 (値エラー)
```

この関数は:
- 引数: 2つの数値を期待
- 戻り値: 常に数値（正常時はBMI、エラー時は0）

## 型チェックの基本パターン

```javascript
// 数値チェック
if (typeof value !== 'number') {
  // エラー処理
}

// 文字列チェック
if (typeof value !== 'string') {
  // エラー処理
}

// 真偽値チェック
if (typeof value !== 'boolean') {
  // エラー処理
}

// 配列チェック
if (!Array.isArray(value)) {
  // エラー処理
}
```

## まとめ

1. 関数の引数と戻り値には**型**がある
2. **型チェック**を行うことで安全な関数を作れる
3. **戻り値の型は一貫**させる（同じ関数から異なる型を返さない）
4. エラー時でも**同じ型**を返すようにする
5. `typeof`演算子で型をチェックできる

### 良い関数の例

```javascript
// 引数: 数値2つ
// 戻り値: 常に数値
function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return 0;
  }
  return a + b;
}
```

型を意識することで、バグを減らし、予測可能な関数を作ることができます。

次回は、関数の単一責任について学びます。
