# レッスン126：関数を引数に

**作成日: 2025-11-26**

## このレッスンで学ぶこと

このレッスンでは、**関数を引数として受け取る** 方法について学びます。コールバック関数を使って処理を委譲し、柔軟で再利用可能なコードを書く方法を習得します。

### 学習目標

1. `function(callback) {}` の書き方を理解する
2. コールバック関数の概念を学ぶ
3. 処理の委譲（制御の反転）を理解する
4. 柔軟な設計パターンを習得する
5. 高階関数の実践的な使い方を学ぶ

---

## 📚 関数を引数に渡すとは？

### 日常生活での例：配達サービス

関数を引数に渡すことを理解するために、日常生活の例で考えてみましょう。

**宅配便の配達**

想像してください。あなたは宅配便のドライバーです。

```
通常の配達（指示が固定）:
┌─────────────────────┐
│ ドライバー          │
│ 1. 荷物を持つ       │
│ 2. 住所に行く       │
│ 3. チャイムを鳴らす │ ← 固定の動作
│ 4. 手渡す           │
└─────────────────────┘

コールバックを使った配達（指示が柔軟）:
┌─────────────────────────────┐
│ ドライバー                  │
│ 1. 荷物を持つ               │
│ 2. 住所に行く               │
│ 3. 配達方法を実行 ────┐     │
└───────────────────────┼─────┘
                        ↓
        ┌───────────────┴──────────────┐
        │ 配達方法（コールバック）      │
        │                              │
        │ ・チャイムを鳴らして手渡し    │
        │ ・宅配ボックスに入れる        │
        │ ・置き配する                 │
        │ ・コンビニに預ける           │
        └──────────────────────────────┘
```

**関数を引数に渡す特徴**：
1. **配達方法を選べる** → 呼び出し側が処理を決める
2. **同じドライバーが様々な方法で配達** → 1つの関数を様々な用途で使える
3. **新しい配達方法を追加しやすい** → 柔軟な設計
4. **ドライバーは配達方法の詳細を知らない** → 処理の委譲

---

## 🔧 基本的な書き方

### シンプルな例：関数を受け取る

**ステップ1：関数を引数として受け取る**

```javascript
// コールバック関数を受け取る関数
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

### 実行の流れ（ステップバイステップ）

```
ステップ1: execute() を呼び出す
  引数に無名関数を渡す
  ↓
ステップ2: execute 関数の中
  console.log('処理を開始します'); → 出力
  ↓
ステップ3: callback() を実行
  渡された関数を呼び出す
  ↓
ステップ4: 無名関数の中
  console.log('コールバック関数が実行されました'); → 出力
  ↓
ステップ5: execute 関数に戻る
  console.log('処理が完了しました'); → 出力

出力結果:
処理を開始します
コールバック関数が実行されました
処理が完了しました
```

### 視覚的な構造

```
execute 関数
┌────────────────────────────┐
│ function execute(callback) │
│ {                          │
│   準備処理                  │
│   callback() ────┐         │ ← 渡された関数を実行
│   後処理         │         │
│ }                │         │
└──────────────────┼─────────┘
                   ↓
        渡された関数を実行
        ┌──────────────┐
        │ function() { │
        │   処理       │
        │ }            │
        └──────────────┘
```

---

## 💡 コールバック関数とは？

**コールバック関数**（Callback Function）は、他の関数に引数として渡される関数のことです。

### 基本例：引数を渡すコールバック

```javascript
function greet(name, callback) {
  const message = 'こんにちは、' + name + 'さん';
  callback(message);  // メッセージを渡してコールバックを実行
}

// コールバック関数を渡す
greet('太郎', function(msg) {
  console.log(msg);  // 'こんにちは、太郎さん'
});

greet('花子', function(msg) {
  alert(msg);  // アラートで表示
});
```

### 実行の流れ

```
greet('太郎', function(msg) { console.log(msg); }) を実行
  ↓
greet 関数の中
  name = '太郎'
  callback = function(msg) { console.log(msg); }
  ↓
message を作成
  message = 'こんにちは、太郎さん'
  ↓
callback(message) を実行
  ↓
コールバック関数が実行される
  msg = 'こんにちは、太郎さん'
  console.log(msg)
  ↓
出力: 'こんにちは、太郎さん'
```

---

## 🎯 処理の委譲（制御の反転）

**制御の反転**（Inversion of Control）は、処理の詳細を呼び出し側に委ねることです。

### 例：配列の処理

**問題**：配列の各要素に対して、様々な処理をしたい

```javascript
// 処理が固定されている（悪い例）
function showNumbers(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);  // 表示だけ
  }
}

// これでは表示以外のことができない...
```

**解決**：コールバックで処理を委譲する

```javascript
// 良い例：処理を委譲する
function forEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i);  // 要素とインデックスを渡す
  }
}

const numbers = [1, 2, 3, 4, 5];

// 表示する
forEach(numbers, function(num, index) {
  console.log(index + ': ' + num);
});

// 2倍にして表示
forEach(numbers, function(num) {
  console.log(num * 2);
});

// 合計を計算
let sum = 0;
forEach(numbers, function(num) {
  sum = sum + num;
});
console.log('合計:', sum);  // 15
```

### データの流れ

```
forEach 関数
┌────────────────────────────────┐
│ array = [1, 2, 3, 4, 5]        │
│ callback = 渡された関数         │
│                                │
│ for (i = 0; i < 5; i++) {      │
│   callback(array[i], i) ───┐   │
│ }                          │   │
└────────────────────────────┼───┘
                             ↓
                呼び出し側で処理を決める
                ┌──────────────────┐
                │ 表示する         │
                │ 2倍する          │
                │ 合計を計算する    │
                └──────────────────┘
```

---

## 🎯 基本例1：繰り返し処理

指定した回数だけ処理を繰り返します。

```javascript
function repeat(count, callback) {
  for (let i = 0; i < count; i++) {
    callback(i);
  }
}

// 様々な使い方
repeat(3, function(i) {
  console.log('回数: ' + i);
});
// 出力:
// 回数: 0
// 回数: 1
// 回数: 2

repeat(5, function(i) {
  console.log('★'.repeat(i + 1));
});
// 出力:
// ★
// ★★
// ★★★
// ★★★★
// ★★★★★
```

### 実行の流れ

```
repeat(3, function(i) { console.log('回数: ' + i); })
  ↓
repeat 関数の中
  count = 3
  callback = function(i) { console.log('回数: ' + i); }
  ↓
ループ開始
  ↓
i = 0: callback(0) → console.log('回数: 0')
  ↓
i = 1: callback(1) → console.log('回数: 1')
  ↓
i = 2: callback(2) → console.log('回数: 2')
  ↓
ループ終了
```

---

## 🎯 基本例2：フィルター（条件で絞り込み）

条件に合う要素だけを抽出します。

```javascript
function filter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {  // 条件を満たすか確認
      result.push(array[i]);
    }
  }
  return result;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 偶数だけを抽出
const evenNumbers = filter(numbers, function(num) {
  return num % 2 === 0;
});
console.log(evenNumbers);  // [2, 4, 6, 8, 10]

// 5より大きい数を抽出
const largeNumbers = filter(numbers, function(num) {
  return num > 5;
});
console.log(largeNumbers);  // [6, 7, 8, 9, 10]

// 3の倍数を抽出
const multiplesOf3 = filter(numbers, function(num) {
  return num % 3 === 0;
});
console.log(multiplesOf3);  // [3, 6, 9]
```

### 実行の流れ

```
filter([1, 2, 3, 4], function(num) { return num % 2 === 0; })
  ↓
filter 関数の中
  array = [1, 2, 3, 4]
  callback = function(num) { return num % 2 === 0; }
  result = []
  ↓
i = 0: callback(1) → 1 % 2 === 0 → false → スキップ
i = 1: callback(2) → 2 % 2 === 0 → true  → result.push(2)
i = 2: callback(3) → 3 % 2 === 0 → false → スキップ
i = 3: callback(4) → 4 % 2 === 0 → true  → result.push(4)
  ↓
return [2, 4]
```

**視覚化**：

```
入力: [1, 2, 3, 4, 5, 6]
       ↓
条件: num % 2 === 0 (偶数か?)
       ↓
1 → false → ×
2 → true  → ○ → result
3 → false → ×
4 → true  → ○ → result
5 → false → ×
6 → true  → ○ → result
       ↓
出力: [2, 4, 6]
```

---

## 🎯 基本例3：マップ（変換）

各要素を別の値に変換します。

```javascript
function map(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const transformed = callback(array[i]);
    result.push(transformed);
  }
  return result;
}

const numbers = [1, 2, 3, 4, 5];

// 2倍にする
const doubled = map(numbers, function(num) {
  return num * 2;
});
console.log(doubled);  // [2, 4, 6, 8, 10]

// 平方にする
const squared = map(numbers, function(num) {
  return num * num;
});
console.log(squared);  // [1, 4, 9, 16, 25]

// 文字列に変換
const strings = map(numbers, function(num) {
  return 'Number: ' + num;
});
console.log(strings);  // ['Number: 1', 'Number: 2', ...]
```

### 実行の流れ

```
map([1, 2, 3], function(num) { return num * 2; })
  ↓
map 関数の中
  array = [1, 2, 3]
  callback = function(num) { return num * 2; }
  result = []
  ↓
i = 0: callback(1) → 1 * 2 = 2 → result.push(2)
i = 1: callback(2) → 2 * 2 = 4 → result.push(4)
i = 2: callback(3) → 3 * 2 = 6 → result.push(6)
  ↓
return [2, 4, 6]
```

**視覚化**：

```
入力: [1, 2, 3, 4, 5]
       ↓
変換: num * 2
       ↓
1 → 2
2 → 4
3 → 6
4 → 8
5 → 10
       ↓
出力: [2, 4, 6, 8, 10]
```

---

## 🏗️ 実践例1：配列処理ツール

フィルター、マップ、リデュースを組み合わせたツールを作ります。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>配列処理ツール</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .section {
      margin: 20px 0;
      padding: 20px;
      border: 2px solid #333;
      border-radius: 10px;
      background: #f9f9f9;
    }
    button {
      font-size: 16px;
      padding: 10px 20px;
      margin: 5px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      background: #4CAF50;
      color: white;
    }
    button:hover {
      background: #45a049;
    }
    .result {
      margin-top: 15px;
      padding: 15px;
      background: white;
      border-radius: 5px;
      font-family: monospace;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <h1>配列処理ツール（コールバック関数）</h1>

  <div class="section">
    <h2>元の配列</h2>
    <p><code>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</code></p>
  </div>

  <div class="section">
    <h2>フィルター（条件で絞り込み）</h2>
    <button id="filterEven">偶数のみ</button>
    <button id="filterOdd">奇数のみ</button>
    <button id="filterGreater5">5より大きい</button>
    <div class="result" id="filterResult"></div>
  </div>

  <div class="section">
    <h2>マップ（変換）</h2>
    <button id="mapDouble">2倍にする</button>
    <button id="mapSquare">平方にする</button>
    <button id="mapString">文字列化</button>
    <div class="result" id="mapResult"></div>
  </div>

  <div class="section">
    <h2>リデュース（集約）</h2>
    <button id="reduceSum">合計を計算</button>
    <button id="reduceProduct">積を計算</button>
    <button id="reduceMax">最大値を取得</button>
    <div class="result" id="reduceResult"></div>
  </div>

  <script>
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // フィルター関数（コールバックを受け取る）
    function filter(array, callback) {
      const result = [];
      for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) {
          result.push(array[i]);
        }
      }
      return result;
    }

    // マップ関数（コールバックを受け取る）
    function map(array, callback) {
      const result = [];
      for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i]));
      }
      return result;
    }

    // リデュース関数（コールバックを受け取る）
    function reduce(array, callback, initialValue) {
      let accumulator = initialValue;
      for (let i = 0; i < array.length; i++) {
        accumulator = callback(accumulator, array[i]);
      }
      return accumulator;
    }

    // フィルターのイベントリスナー
    document.getElementById('filterEven').addEventListener('click', function() {
      const result = filter(numbers, function(num) {
        return num % 2 === 0;
      });
      document.getElementById('filterResult').textContent =
        '結果: [' + result.join(', ') + ']';
    });

    document.getElementById('filterOdd').addEventListener('click', function() {
      const result = filter(numbers, function(num) {
        return num % 2 !== 0;
      });
      document.getElementById('filterResult').textContent =
        '結果: [' + result.join(', ') + ']';
    });

    document.getElementById('filterGreater5').addEventListener('click', function() {
      const result = filter(numbers, function(num) {
        return num > 5;
      });
      document.getElementById('filterResult').textContent =
        '結果: [' + result.join(', ') + ']';
    });

    // マップのイベントリスナー
    document.getElementById('mapDouble').addEventListener('click', function() {
      const result = map(numbers, function(num) {
        return num * 2;
      });
      document.getElementById('mapResult').textContent =
        '結果: [' + result.join(', ') + ']';
    });

    document.getElementById('mapSquare').addEventListener('click', function() {
      const result = map(numbers, function(num) {
        return num * num;
      });
      document.getElementById('mapResult').textContent =
        '結果: [' + result.join(', ') + ']';
    });

    document.getElementById('mapString').addEventListener('click', function() {
      const result = map(numbers, function(num) {
        return 'No.' + num;
      });
      document.getElementById('mapResult').textContent =
        '結果: [' + result.join(', ') + ']';
    });

    // リデュースのイベントリスナー
    document.getElementById('reduceSum').addEventListener('click', function() {
      const result = reduce(numbers, function(acc, num) {
        return acc + num;
      }, 0);
      document.getElementById('reduceResult').textContent =
        '結果: ' + result;
    });

    document.getElementById('reduceProduct').addEventListener('click', function() {
      const result = reduce(numbers, function(acc, num) {
        return acc * num;
      }, 1);
      document.getElementById('reduceResult').textContent =
        '結果: ' + result;
    });

    document.getElementById('reduceMax').addEventListener('click', function() {
      const result = reduce(numbers, function(acc, num) {
        return num > acc ? num : acc;
      }, numbers[0]);
      document.getElementById('reduceResult').textContent =
        '結果: ' + result;
    });
  </script>
</body>
</html>
```

### データの流れ

```
元の配列: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
           ↓
┌──────────┴──────────┬──────────┬──────────┐
│                     │          │          │
フィルター            マップ      リデュース
│                     │          │
├─ 偶数のみ           ├─ 2倍     ├─ 合計
│  callback:          │  callback: │  callback:
│  num % 2 === 0      │  num * 2  │  acc + num
│  → [2,4,6,8,10]     │  → [2,4..] │  → 55
│                     │          │
├─ 奇数のみ           ├─ 平方    ├─ 積
│  → [1,3,5,7,9]      │  → [1,4..] │  → 3628800
```

---

## 🏗️ 実践例2：成功・失敗のコールバック

非同期処理で成功・失敗を処理します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ユーザー検索</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    input {
      font-size: 18px;
      padding: 10px;
      width: 200px;
      margin: 10px 0;
    }
    button {
      font-size: 18px;
      padding: 10px 20px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      background: #4CAF50;
      color: white;
    }
    .result {
      margin-top: 20px;
      padding: 20px;
      border-radius: 5px;
    }
    .success {
      background: #d4edda;
      border: 1px solid #c3e6cb;
      color: #155724;
    }
    .error {
      background: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
    }
  </style>
</head>
<body>
  <h1>ユーザー検索システム</h1>
  <p>ユーザーID（1〜5）を入力してください</p>
  <input type="number" id="userIdInput" placeholder="ユーザーID" value="1">
  <button id="searchBtn">検索</button>
  <div id="result"></div>

  <script>
    // ユーザーデータベース（模擬）
    const users = [
      { id: 1, name: '太郎', age: 25, email: 'taro@example.com' },
      { id: 2, name: '花子', age: 30, email: 'hanako@example.com' },
      { id: 3, name: '次郎', age: 28, email: 'jiro@example.com' },
      { id: 4, name: '美咲', age: 22, email: 'misaki@example.com' },
      { id: 5, name: '健太', age: 35, email: 'kenta@example.com' }
    ];

    // ユーザー取得関数（コールバックを受け取る）
    function fetchUser(userId, onSuccess, onError) {
      console.log('ユーザー情報を取得中...');

      // 非同期処理を模擬
      setTimeout(function() {
        // ユーザーを検索
        const user = users.find(function(u) {
          return u.id === userId;
        });

        if (user) {
          // 成功時のコールバックを実行
          onSuccess(user);
        } else {
          // 失敗時のコールバックを実行
          onError('ユーザーID ' + userId + ' は見つかりませんでした');
        }
      }, 1000);  // 1秒後に結果を返す
    }

    // 検索ボタンのイベントリスナー
    document.getElementById('searchBtn').addEventListener('click', function() {
      const userId = parseInt(document.getElementById('userIdInput').value);
      const resultDiv = document.getElementById('result');

      // ローディング表示
      resultDiv.innerHTML = '<p>検索中...</p>';

      // ユーザーを検索
      fetchUser(
        userId,
        // 成功時のコールバック
        function(user) {
          resultDiv.className = 'result success';
          resultDiv.innerHTML = `
            <h2>✓ ユーザーが見つかりました</h2>
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>名前:</strong> ${user.name}</p>
            <p><strong>年齢:</strong> ${user.age}歳</p>
            <p><strong>メール:</strong> ${user.email}</p>
          `;
        },
        // 失敗時のコールバック
        function(errorMessage) {
          resultDiv.className = 'result error';
          resultDiv.innerHTML = `
            <h2>✗ エラー</h2>
            <p>${errorMessage}</p>
          `;
        }
      );
    });
  </script>
</body>
</html>
```

### 実行の流れ

```
ユーザーが検索ボタンをクリック
  ↓
userId = 1 を取得
  ↓
fetchUser(1, onSuccess, onError) を実行
  ↓
fetchUser 関数の中
  userId = 1
  onSuccess = function(user) { ... }
  onError = function(errorMessage) { ... }
  ↓
setTimeout で1秒後に実行
  ↓
users から userId = 1 を検索
  ↓
user が見つかった
  user = { id: 1, name: '太郎', age: 25, ... }
  ↓
onSuccess(user) を実行
  ↓
成功時のコールバック関数が実行される
  画面に成功メッセージとユーザー情報を表示
```

**2つのコールバック**：

```
fetchUser 関数
┌────────────────────────────────┐
│ userId を検索                  │
│   ↓                            │
│ ┌─────────────┐               │
│ │ 見つかった？ │               │
│ └──┬──────┬───┘               │
│    │      │                    │
│   YES    NO                    │
│    │      │                    │
│    ↓      ↓                    │
│ onSuccess onError              │
└────┼──────┼────────────────────┘
     │      │
     ↓      ↓
  成功処理  エラー処理
```

---

## 🏗️ 実践例3：カスタマイズ可能なソート

比較関数をコールバックとして渡します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>カスタムソート</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .section {
      margin: 20px 0;
      padding: 20px;
      border: 2px solid #333;
      border-radius: 10px;
      background: #f9f9f9;
    }
    button {
      font-size: 16px;
      padding: 10px 20px;
      margin: 5px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      background: #4CAF50;
      color: white;
    }
    .result {
      margin-top: 15px;
      padding: 15px;
      background: white;
      border-radius: 5px;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <h1>カスタマイズ可能なソート</h1>

  <div class="section">
    <h2>数値の配列</h2>
    <p>元の配列: <code>[5, 2, 8, 1, 9, 3, 7, 4, 6]</code></p>
    <button id="sortAsc">昇順ソート</button>
    <button id="sortDesc">降順ソート</button>
    <div class="result" id="numberResult"></div>
  </div>

  <div class="section">
    <h2>文字列の配列</h2>
    <p>元の配列: <code>['バナナ', 'りんご', 'オレンジ', 'いちご']</code></p>
    <button id="sortStrAsc">昇順ソート</button>
    <button id="sortStrDesc">降順ソート</button>
    <button id="sortStrLength">文字数順</button>
    <div class="result" id="stringResult"></div>
  </div>

  <div class="section">
    <h2>オブジェクトの配列</h2>
    <p>ユーザーリスト（名前・年齢）</p>
    <button id="sortByName">名前順</button>
    <button id="sortByAge">年齢順</button>
    <button id="sortByAgeDesc">年齢降順</button>
    <div class="result" id="objectResult"></div>
  </div>

  <script>
    // カスタムソート関数（比較関数をコールバックとして受け取る）
    function customSort(array, compareFunc) {
      const result = array.slice();  // コピーを作成

      // バブルソート
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result.length - 1 - i; j++) {
          if (compareFunc(result[j], result[j + 1]) > 0) {
            // 交換
            const temp = result[j];
            result[j] = result[j + 1];
            result[j + 1] = temp;
          }
        }
      }

      return result;
    }

    // 数値の配列
    const numbers = [5, 2, 8, 1, 9, 3, 7, 4, 6];

    document.getElementById('sortAsc').addEventListener('click', function() {
      const result = customSort(numbers, function(a, b) {
        return a - b;  // 昇順
      });
      document.getElementById('numberResult').textContent =
        '結果: [' + result.join(', ') + ']';
    });

    document.getElementById('sortDesc').addEventListener('click', function() {
      const result = customSort(numbers, function(a, b) {
        return b - a;  // 降順
      });
      document.getElementById('numberResult').textContent =
        '結果: [' + result.join(', ') + ']';
    });

    // 文字列の配列
    const fruits = ['バナナ', 'りんご', 'オレンジ', 'いちご'];

    document.getElementById('sortStrAsc').addEventListener('click', function() {
      const result = customSort(fruits, function(a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
      document.getElementById('stringResult').textContent =
        '結果: [' + result.join(', ') + ']';
    });

    document.getElementById('sortStrDesc').addEventListener('click', function() {
      const result = customSort(fruits, function(a, b) {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      });
      document.getElementById('stringResult').textContent =
        '結果: [' + result.join(', ') + ']';
    });

    document.getElementById('sortStrLength').addEventListener('click', function() {
      const result = customSort(fruits, function(a, b) {
        return a.length - b.length;  // 文字数で比較
      });
      document.getElementById('stringResult').textContent =
        '結果: [' + result.join(', ') + ']';
    });

    // オブジェクトの配列
    const users = [
      { name: '太郎', age: 25 },
      { name: '花子', age: 30 },
      { name: '次郎', age: 22 },
      { name: '美咲', age: 28 }
    ];

    function displayUsers(users) {
      return users.map(function(user) {
        return user.name + '(' + user.age + '歳)';
      }).join(', ');
    }

    document.getElementById('sortByName').addEventListener('click', function() {
      const result = customSort(users, function(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      document.getElementById('objectResult').textContent =
        '結果: ' + displayUsers(result);
    });

    document.getElementById('sortByAge').addEventListener('click', function() {
      const result = customSort(users, function(a, b) {
        return a.age - b.age;  // 年齢昇順
      });
      document.getElementById('objectResult').textContent =
        '結果: ' + displayUsers(result);
    });

    document.getElementById('sortByAgeDesc').addEventListener('click', function() {
      const result = customSort(users, function(a, b) {
        return b.age - a.age;  // 年齢降順
      });
      document.getElementById('objectResult').textContent =
        '結果: ' + displayUsers(result);
    });
  </script>
</body>
</html>
```

### 比較関数の仕組み

```
customSort 関数
┌────────────────────────────────┐
│ array = [5, 2, 8, 1]           │
│ compareFunc = 比較関数         │
│                                │
│ バブルソート:                  │
│ for (i...) {                   │
│   for (j...) {                 │
│     if (compareFunc(a, b) > 0) │
│       交換                     │
│   }                            │
│ }                              │
└────────────────────────────────┘

比較関数の戻り値:
・正の数 → a を b の後に
・負の数 → a を b の前に
・0     → 順序を変えない

例: 昇順ソート
compareFunc(a, b) = a - b
  a=5, b=2 → 5-2=3  (正) → 交換 [2, 5]
  a=2, b=8 → 2-8=-6 (負) → そのまま [2, 8]
```

---

## 📝 練習問題

### 練習1：全要素チェック（基本）

**問題**：配列のすべての要素が条件を満たすかをチェックする関数を作成してください。

**仕様**：
1. `all(array, callback)` という関数を作る
2. 配列のすべての要素で `callback` が `true` を返したら `true`
3. 1つでも `false` を返したら `false`

**例**：
```javascript
const numbers = [2, 4, 6, 8];
const allEven = all(numbers, function(num) {
  return num % 2 === 0;
});
console.log(allEven);  // true

const numbers2 = [2, 4, 5, 8];
const allEven2 = all(numbers2, function(num) {
  return num % 2 === 0;
});
console.log(allEven2);  // false
```

<details>
<summary>💡 ヒント</summary>

```javascript
function all(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i])) {
      return false;  // 1つでも false なら false
    }
  }
  return true;  // すべて true
}
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
// すべての要素が条件を満たすかチェック
function all(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i])) {
      return false;
    }
  }
  return true;
}

// テスト
const numbers = [2, 4, 6, 8];
const allEven = all(numbers, function(num) {
  return num % 2 === 0;
});
console.log(allEven);  // true

const numbers2 = [2, 4, 5, 8];
const allEven2 = all(numbers2, function(num) {
  return num % 2 === 0;
});
console.log(allEven2);  // false

// 別の使い方
const words = ['hello', 'world', 'test'];
const allLong = all(words, function(word) {
  return word.length >= 4;
});
console.log(allLong);  // true
```

**実行の流れ**：

```
all([2, 4, 6, 8], function(num) { return num % 2 === 0; })
  ↓
i=0: callback(2) → 2%2===0 → true  → 続行
i=1: callback(4) → 4%2===0 → true  → 続行
i=2: callback(6) → 6%2===0 → true  → 続行
i=3: callback(8) → 8%2===0 → true  → 続行
  ↓
すべて true → return true

all([2, 4, 5, 8], function(num) { return num % 2 === 0; })
  ↓
i=0: callback(2) → 2%2===0 → true  → 続行
i=1: callback(4) → 4%2===0 → true  → 続行
i=2: callback(5) → 5%2===0 → false → return false
```

**確認**：
- ✅ すべての要素をチェックしている
- ✅ 1つでも false なら false を返す
- ✅ コールバック関数で条件を指定できる
</details>

---

### 練習2：検索関数（応用）

**問題**：条件に合う最初の要素を見つける関数を作成してください。

**仕様**：
1. `find(array, callback)` という関数を作る
2. 条件を満たす最初の要素を返す
3. 見つからなければ `null` を返す

**例**：
```javascript
const users = [
  { name: '太郎', age: 25 },
  { name: '花子', age: 30 },
  { name: '次郎', age: 22 }
];

const user = find(users, function(u) {
  return u.age > 25;
});
console.log(user);  // { name: '花子', age: 30 }
```

<details>
<summary>💡 ヒント</summary>

```javascript
function find(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      return array[i];  // 見つかった
    }
  }
  return null;  // 見つからない
}
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
// 条件に合う最初の要素を検索
function find(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      return array[i];
    }
  }
  return null;
}

// テスト
const users = [
  { name: '太郎', age: 25 },
  { name: '花子', age: 30 },
  { name: '次郎', age: 22 },
  { name: '美咲', age: 28 }
];

// 年齢が25より大きい最初のユーザー
const user1 = find(users, function(u) {
  return u.age > 25;
});
console.log(user1);  // { name: '花子', age: 30 }

// 名前が「次郎」のユーザー
const user2 = find(users, function(u) {
  return u.name === '次郎';
});
console.log(user2);  // { name: '次郎', age: 22 }

// 年齢が40以上のユーザー
const user3 = find(users, function(u) {
  return u.age >= 40;
});
console.log(user3);  // null（見つからない）

// 数値の配列での使用
const numbers = [1, 3, 5, 8, 9, 10];
const firstEven = find(numbers, function(num) {
  return num % 2 === 0;
});
console.log(firstEven);  // 8
```

**実行の流れ**：

```
find(users, function(u) { return u.age > 25; })
  ↓
i=0: callback({ name: '太郎', age: 25 })
     → 25 > 25 → false → 続行
i=1: callback({ name: '花子', age: 30 })
     → 30 > 25 → true → return { name: '花子', age: 30 }
```

**確認**：
- ✅ 条件に合う最初の要素を返している
- ✅ 見つからなければ null を返す
- ✅ 様々な条件で検索できる
</details>

---

### 練習3：リトライ機能付きデータ取得（発展）

**問題**：失敗時に自動でリトライするデータ取得関数を作成してください。

**仕様**：
1. `fetchWithRetry(action, maxAttempts, onSuccess, onFailure)` という関数を作る
2. `action` は成功なら `true`、失敗なら `false` を返す関数
3. 失敗したら `maxAttempts` 回まで再試行
4. 成功したら `onSuccess`、最大回数失敗したら `onFailure` を呼ぶ

<details>
<summary>💡 ヒント</summary>

```javascript
function fetchWithRetry(action, maxAttempts, onSuccess, onFailure) {
  let attempts = 0;

  function attempt() {
    attempts++;
    console.log('試行', attempts, '回目');

    const success = action();  // アクションを実行

    if (success) {
      onSuccess(attempts);
    } else if (attempts < maxAttempts) {
      setTimeout(attempt, 1000);  // 1秒後に再試行
    } else {
      onFailure(attempts);
    }
  }

  attempt();
}
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
// リトライ機能付きデータ取得
function fetchWithRetry(action, maxAttempts, onSuccess, onFailure) {
  let attempts = 0;

  function attempt() {
    attempts = attempts + 1;
    console.log('試行', attempts, '回目');

    const success = action(attempts);

    if (success) {
      onSuccess(attempts);
    } else if (attempts < maxAttempts) {
      console.log('失敗しました。1秒後に再試行します...');
      setTimeout(attempt, 1000);
    } else {
      onFailure(attempts);
    }
  }

  attempt();
}

// 使用例1: 3回目で成功
console.log('=== テスト1: 3回目で成功 ===');
let count1 = 0;
fetchWithRetry(
  function(attemptNum) {
    count1 = count1 + 1;
    return count1 >= 3;  // 3回目で成功
  },
  5,  // 最大5回
  function(attempts) {
    console.log('✓ 成功しました！（' + attempts + '回目）');
  },
  function(attempts) {
    console.log('✗ 最大試行回数に達しました（' + attempts + '回）');
  }
);

// 使用例2: 常に失敗
setTimeout(function() {
  console.log('\n=== テスト2: 常に失敗 ===');
  fetchWithRetry(
    function(attemptNum) {
      return false;  // 常に失敗
    },
    3,  // 最大3回
    function(attempts) {
      console.log('✓ 成功しました！');
    },
    function(attempts) {
      console.log('✗ 最大試行回数に達しました（' + attempts + '回）');
    }
  );
}, 5000);
```

**完全版（HTML付き）**：

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>リトライ機能</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    button {
      font-size: 18px;
      padding: 10px 20px;
      margin: 10px 5px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      color: white;
    }
    .start { background: #4CAF50; }
    .log {
      margin-top: 20px;
      padding: 15px;
      background: #f0f0f0;
      border-radius: 5px;
      max-height: 400px;
      overflow-y: auto;
      font-family: monospace;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <h1>リトライ機能付きデータ取得</h1>
  <p>ボタンをクリックしてリトライ機能をテストします</p>
  <button class="start" id="test1">テスト1: 3回目で成功</button>
  <button class="start" id="test2">テスト2: すぐ成功</button>
  <button class="start" id="test3">テスト3: 常に失敗</button>
  <div class="log" id="log"></div>

  <script>
    function log(message) {
      const logDiv = document.getElementById('log');
      logDiv.textContent += message + '\n';
      logDiv.scrollTop = logDiv.scrollHeight;
    }

    function clearLog() {
      document.getElementById('log').textContent = '';
    }

    function fetchWithRetry(action, maxAttempts, onSuccess, onFailure) {
      let attempts = 0;

      function attempt() {
        attempts = attempts + 1;
        log('試行 ' + attempts + '回目...');

        const success = action(attempts);

        if (success) {
          onSuccess(attempts);
        } else if (attempts < maxAttempts) {
          log('  → 失敗。1秒後に再試行します');
          setTimeout(attempt, 1000);
        } else {
          onFailure(attempts);
        }
      }

      attempt();
    }

    document.getElementById('test1').addEventListener('click', function() {
      clearLog();
      log('=== テスト1: 3回目で成功 ===\n');

      let count = 0;
      fetchWithRetry(
        function(attemptNum) {
          count = count + 1;
          return count >= 3;
        },
        5,
        function(attempts) {
          log('\n✓ 成功しました！（' + attempts + '回目）');
        },
        function(attempts) {
          log('\n✗ 最大試行回数に達しました');
        }
      );
    });

    document.getElementById('test2').addEventListener('click', function() {
      clearLog();
      log('=== テスト2: すぐ成功 ===\n');

      fetchWithRetry(
        function(attemptNum) {
          return true;  // すぐ成功
        },
        5,
        function(attempts) {
          log('\n✓ 成功しました！（' + attempts + '回目）');
        },
        function(attempts) {
          log('\n✗ 最大試行回数に達しました');
        }
      );
    });

    document.getElementById('test3').addEventListener('click', function() {
      clearLog();
      log('=== テスト3: 常に失敗 ===\n');

      fetchWithRetry(
        function(attemptNum) {
          return false;  // 常に失敗
        },
        3,
        function(attempts) {
          log('\n✓ 成功しました！');
        },
        function(attempts) {
          log('\n✗ 最大試行回数（' + attempts + '回）に達しました');
        }
      );
    });
  </script>
</body>
</html>
```

**実行の流れ**：

```
fetchWithRetry(action, 5, onSuccess, onFailure)
  ↓
attempt() を呼び出し
  ↓
attempts = 1
action(1) → false
  ↓ 失敗、再試行
1秒待つ
  ↓
attempts = 2
action(2) → false
  ↓ 失敗、再試行
1秒待つ
  ↓
attempts = 3
action(3) → true
  ↓ 成功！
onSuccess(3)
```

**確認**：
- ✅ リトライ機能が正しく動作する
- ✅ 成功時・失敗時のコールバックが呼ばれる
- ✅ 最大試行回数を守っている
</details>

---

## 🔍 名前付き関数 vs 無名関数

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

processData(handleData);  // () をつけない！
```

### 重要な注意点

```javascript
// 間違い: () をつけると即座に実行される
processData(handleData());
// handleData() が先に実行されて、その戻り値が渡される

// 正しい: 関数自体を渡す
processData(handleData);
// handleData という関数が渡される
```

**視覚化**：

```
間違い:
processData(handleData())
            ↓
    handleData() を実行
            ↓
       戻り値を取得
            ↓
    processData(undefined)
    （関数ではなく戻り値が渡される）

正しい:
processData(handleData)
            ↓
    handleData という関数自体を渡す
            ↓
    processData の中で実行される
```

---

## 📋 コールバックパターン集

### パターン1：繰り返し処理

```javascript
function times(n, callback) {
  for (let i = 0; i < n; i++) {
    callback(i);
  }
}

times(3, function(i) {
  console.log('繰り返し', i);
});
```

### パターン2：条件チェック

```javascript
function some(array, predicate) {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return true;  // 1つでも条件を満たす
    }
  }
  return false;
}

const numbers = [1, 3, 5, 8];
const hasEven = some(numbers, function(num) {
  return num % 2 === 0;
});
console.log(hasEven);  // true（8が偶数）
```

### パターン3：データ変換

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

---

## 🎓 まとめ

### 関数を引数に渡す重要ポイント

1. **関数を引数に渡す**
   - 関数は値として扱える
   - 他の関数に引数として渡せる
   - 構文: `function process(callback) { callback(); }`

2. **コールバック関数**
   - 引数として渡される関数のこと
   - 処理を呼び出し側に委譲できる
   - 柔軟な設計が可能

3. **処理の委譲（制御の反転）**
   - 具体的な処理を呼び出し側が決める
   - 関数は「何をするか」だけを決める
   - 「どうするか」はコールバックに任せる

4. **主な用途**
   - 配列の処理（filter, map, reduce）
   - 非同期処理の完了通知
   - イベント処理
   - カスタマイズ可能な関数

5. **メリット**
   - ✅ コードの再利用性が高まる
   - ✅ 柔軟な設計ができる
   - ✅ 処理を分離できる
   - ✅ テストしやすくなる

### 基本パターン

```javascript
// コールバックを受け取る関数
function process(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
}

// 使用
process([1, 2, 3], function(item) {
  console.log(item);
});
```

### 使い分けガイド

```javascript
// 処理を委譲したい → コールバック
filter(numbers, function(num) {
  return num > 5;
});

// 成功・失敗を処理 → 2つのコールバック
fetchUser(1, onSuccess, onError);

// カスタマイズ可能 → コールバック
customSort(array, compareFunction);
```

---

## 📚 カリキュラム要求事項の確認

このレッスンで学んだ内容がカリキュラムの要求を満たしているか確認しましょう。

### レッスン126の要求事項

- ✅ **`function(callback) {}`** - コールバックを受け取る構文を学習
- ✅ **処理の委譲** - 処理を呼び出し側に委ねる方法を理解
- ✅ **柔軟な設計** - コールバックによる柔軟な設計パターンを習得
- ✅ **知識：コールバック関数、制御の反転** - コールバックと制御の反転の概念を学習
- ✅ **成果物：コールバック実装** - 実践例（配列処理、検索、ソート、リトライ）を作成

すべての要求事項を満たしています！

---

## 🚀 次のステップ

次回のレッスンでは、**再帰関数** について学びます。

関数が自分自身を呼び出すという、より高度なテクニックを学びます。

```javascript
// 次回の予告：再帰関数
function countdown(n) {
  if (n === 0) {
    console.log('終了！');
    return;
  }
  console.log(n);
  countdown(n - 1);  // 自分自身を呼び出す
}

countdown(5);
// 出力:
// 5
// 4
// 3
// 2
// 1
// 終了！
```

コールバック関数の理解が、より複雑な関数パターンを学ぶ基礎となります！
