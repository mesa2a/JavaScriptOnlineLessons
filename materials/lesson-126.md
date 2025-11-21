# レッスン126：関数を引数に

## 学習目標
- 関数を引数として受け取る方法を理解する
- コールバック関数のパターンを学ぶ
- 処理の委譲による柔軟な設計を身につける

## 関数を引数に渡す

JavaScriptでは、関数を他の関数の**引数**として渡すことができます。

### 基本例

```javascript
// 関数を引数として受け取る関数
function execute(callback) {
  console.log('処理を開始します');
  callback();  // 渡された関数を実行
  console.log('処理が完了しました');
}

// 関数を渡す
execute(function() {
  console.log('コールバック関数が実行されました');
});
```

出力:
```
処理を開始します
コールバック関数が実行されました
処理が完了しました
```

## コールバック関数とは

**コールバック関数**は、他の関数に引数として渡される関数のことです。

```javascript
function greet(name, callback) {
  const message = 'こんにちは、' + name + 'さん';
  callback(message);  // コールバック関数を呼ぶ
}

// コールバック関数を渡す
greet('太郎', function(msg) {
  alert(msg);
});
```

## なぜコールバック関数を使うのか

### 1. 処理を委譲できる

呼び出し側が具体的な処理を決められます。

```javascript
function processNumbers(numbers, callback) {
  for (let i = 0; i < numbers.length; i++) {
    callback(numbers[i]);
  }
}

// 異なる処理を渡せる
processNumbers([1, 2, 3], function(num) {
  console.log(num);  // 表示
});

processNumbers([1, 2, 3], function(num) {
  console.log(num * 2);  // 2倍にして表示
});
```

### 2. 柔軟な設計

同じ関数を異なる用途で使えます。

```javascript
function repeat(count, callback) {
  for (let i = 0; i < count; i++) {
    callback(i);
  }
}

// 異なる使い方
repeat(3, function(i) {
  console.log('回数: ' + i);
});

repeat(5, function(i) {
  console.log('★'.repeat(i + 1));
});
```

## 実践例：配列の処理

配列の各要素に処理を適用します。

```javascript
function forEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i);
  }
}

const fruits = ['りんご', 'バナナ', 'オレンジ'];

forEach(fruits, function(fruit, index) {
  console.log(index + ': ' + fruit);
});
```

出力:
```
0: りんご
1: バナナ
2: オレンジ
```

## 実践例：フィルター

条件に合う要素だけを抽出します。

```javascript
function filter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
}

const numbers = [1, 2, 3, 4, 5, 6];

// 偶数だけを抽出
const evenNumbers = filter(numbers, function(num) {
  return num % 2 === 0;
});

console.log(evenNumbers);  // [2, 4, 6]

// 3より大きい数を抽出
const largeNumbers = filter(numbers, function(num) {
  return num > 3;
});

console.log(largeNumbers);  // [4, 5, 6]
```

## 実践例：変換（マップ）

各要素を変換します。

```javascript
function map(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i]));
  }
  return result;
}

const numbers = [1, 2, 3, 4, 5];

// 2倍にする
const doubled = map(numbers, function(num) {
  return num * 2;
});

console.log(doubled);  // [2, 4, 6, 8, 10]

// 文字列に変換
const strings = map(numbers, function(num) {
  return 'Number: ' + num;
});

console.log(strings);  // ['Number: 1', 'Number: 2', ...]
```

## 実践例：非同期処理の完了通知

処理が完了したらコールバックを呼びます。

```javascript
function loadData(callback) {
  console.log('データを読み込んでいます...');

  // 処理を模擬（実際は時間がかかる処理）
  setTimeout(function() {
    const data = { name: '太郎', age: 25 };
    callback(data);  // 完了したらコールバック
  }, 1000);
}

// 使用例
loadData(function(data) {
  console.log('データが読み込まれました:', data);
});
```

## 実践例：成功・失敗のコールバック

2つのコールバックを受け取ります。

```javascript
function fetchUser(userId, onSuccess, onError) {
  console.log('ユーザー情報を取得中...');

  if (userId > 0) {
    // 成功
    const user = { id: userId, name: 'ユーザー' + userId };
    onSuccess(user);
  } else {
    // 失敗
    onError('無効なユーザーID');
  }
}

// 使用例
fetchUser(1,
  function(user) {
    console.log('成功:', user);
  },
  function(error) {
    console.log('エラー:', error);
  }
);
```

## 実践例：カスタマイズ可能なソート

比較関数を渡してソートをカスタマイズします。

```javascript
function sortArray(array, compareFunc) {
  const result = array.slice();  // コピー

  // バブルソート
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length - 1 - i; j++) {
      if (compareFunc(result[j], result[j + 1]) > 0) {
        const temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
      }
    }
  }

  return result;
}

const numbers = [5, 2, 8, 1, 9];

// 昇順
const ascending = sortArray(numbers, function(a, b) {
  return a - b;
});

console.log(ascending);  // [1, 2, 5, 8, 9]

// 降順
const descending = sortArray(numbers, function(a, b) {
  return b - a;
});

console.log(descending);  // [9, 8, 5, 2, 1]
```

## 実践例：リトライ機能

処理が成功するまで繰り返します。

```javascript
function retry(maxAttempts, action, onSuccess, onFailure) {
  let attempts = 0;

  function attempt() {
    attempts = attempts + 1;
    console.log('試行 ' + attempts + '回目');

    const success = action();  // 処理を実行

    if (success) {
      onSuccess();
    } else if (attempts < maxAttempts) {
      setTimeout(attempt, 1000);  // 1秒後に再試行
    } else {
      onFailure();
    }
  }

  attempt();
}

// 使用例
let count = 0;
retry(3,
  function() {
    count = count + 1;
    return count >= 2;  // 2回目で成功
  },
  function() {
    console.log('成功しました');
  },
  function() {
    console.log('最大試行回数に達しました');
  }
);
```

## 高階関数

**高階関数**は、関数を引数に取るか、関数を返す関数です。

```javascript
// 高階関数の例
function calculate(a, b, operation) {
  return operation(a, b);
}

// 異なる演算を渡せる
const sum = calculate(5, 3, function(x, y) {
  return x + y;
});

const product = calculate(5, 3, function(x, y) {
  return x * y;
});

console.log(sum);      // 8
console.log(product);  // 15
```

## 名前付き関数 vs 無名関数

### 無名関数を渡す

```javascript
processData(function() {
  console.log('処理');
});
```

### 名前付き関数を渡す

```javascript
function handleData() {
  console.log('処理');
}

processData(handleData);  // () をつけない
```

**注意**: `()` をつけると即座に実行されてしまいます。

```javascript
// 間違い
processData(handleData());  // すぐに実行される

// 正しい
processData(handleData);    // 関数自体を渡す
```

## よくあるパターン

### パターン1: 繰り返し処理

```javascript
function times(n, callback) {
  for (let i = 0; i < n; i++) {
    callback(i);
  }
}

times(3, function(i) {
  console.log('繰り返し ' + i);
});
```

### パターン2: 条件チェック

```javascript
function all(array, predicate) {
  for (let i = 0; i < array.length; i++) {
    if (!predicate(array[i])) {
      return false;
    }
  }
  return true;
}

const numbers = [2, 4, 6, 8];
const allEven = all(numbers, function(num) {
  return num % 2 === 0;
});

console.log(allEven);  // true
```

### パターン3: データ変換

```javascript
function transform(data, transformer) {
  return transformer(data);
}

const data = { name: 'taro', age: 25 };

const formatted = transform(data, function(d) {
  return d.name + ' (' + d.age + '歳)';
});

console.log(formatted);  // 'taro (25歳)'
```

## まとめ

1. 関数を**引数として渡せる**
2. **コールバック関数**で処理を委譲
3. **柔軟な設計**が可能
4. **高階関数**で再利用性が高まる
5. 同じ関数を**異なる用途**で使える

### 基本パターン

```javascript
// コールバックを受け取る関数
function process(callback) {
  // 何か処理
  callback();  // コールバックを実行
}

// 使用
process(function() {
  console.log('実行されました');
});
```

### 使い分け

- **処理を委譲したい** → コールバック関数
- **柔軟な設計** → 関数を引数に
- **再利用性を高める** → 高階関数

関数を引数に取ることで、より汎用的で再利用可能なコードを書くことができます。

次回は、再帰関数について学びます。
