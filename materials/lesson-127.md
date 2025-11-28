# レッスン127：再帰入門

**作成日: 2025-11-26**

## このレッスンで学ぶこと

このレッスンでは、**再帰関数（Recursive Function）** について学びます。関数が自分自身を呼び出すという、プログラミングの重要な技法を習得します。

### 学習目標

1. 再帰関数とは何かを理解する
2. 終了条件（ベースケース）の重要性を学ぶ
3. 再帰ケースの書き方を習得する
4. カウントダウンを再帰で実装できる
5. 再帰の仕組みを理解する

---

## 📚 再帰関数とは？

### 日常生活での例：ロシアの入れ子人形（マトリョーシカ）

再帰を理解するために、日常生活の例で考えてみましょう。

**マトリョーシカ人形**

想像してください。マトリョーシカ人形（入れ子になった人形）を開けていく作業です。

```
マトリョーシカを開ける手順:
┌─────────────────────────┐
│ 大きい人形を開ける       │
│   ↓                     │
│ ┌───────────────────┐   │
│ │中くらいの人形を開ける│   │
│ │   ↓               │   │
│ │ ┌─────────────┐   │   │
│ │ │小さい人形を開ける│   │   │
│ │ │   ↓           │   │   │
│ │ │ ┌─────────┐ │   │   │
│ │ │ │一番小さい │ │   │   │ ← 終了条件
│ │ │ │これ以上    │ │   │   │   （もう開けない）
│ │ │ │開けない    │ │   │   │
│ │ │ └─────────┘ │   │   │
│ │ └─────────────┘   │   │
│ └───────────────────┘   │
└─────────────────────────┘
```

**再帰の特徴**：
1. **同じ作業の繰り返し** → 「人形を開ける」を繰り返す
2. **だんだん小さくなる** → 問題が小さくなっていく
3. **最後は必ず終わる** → 一番小さい人形で終了
4. **終了条件が重要** → 「これ以上開けられない」がないと永遠に続く

---

## 🔧 基本的な書き方

### シンプルな例：カウントダウン

**ステップ1：再帰関数を書く**

```javascript
function countdown(n) {
  // 終了条件（ベースケース）
  if (n <= 0) {
    console.log('完了！');
    return;
  }

  // 現在の数を表示
  console.log(n);

  // 自分自身を呼ぶ（再帰呼び出し）
  countdown(n - 1);
}

countdown(3);
```

### 実行の流れ（ステップバイステップ）

```
ステップ1: countdown(3) を呼び出す
  ↓
n = 3, n <= 0 ? → いいえ
  ↓
console.log(3) → '3' を出力
  ↓
countdown(2) を呼び出す
  ↓
ステップ2: countdown(2)
  ↓
n = 2, n <= 0 ? → いいえ
  ↓
console.log(2) → '2' を出力
  ↓
countdown(1) を呼び出す
  ↓
ステップ3: countdown(1)
  ↓
n = 1, n <= 0 ? → いいえ
  ↓
console.log(1) → '1' を出力
  ↓
countdown(0) を呼び出す
  ↓
ステップ4: countdown(0)
  ↓
n = 0, n <= 0 ? → はい（終了条件）
  ↓
console.log('完了！') → '完了！' を出力
  ↓
return で終了

出力結果:
3
2
1
完了！
```

### 視覚的な構造

```
countdown(3)
│
├─ n = 3
├─ console.log(3)
├─ countdown(2) を呼ぶ
│  │
│  ├─ n = 2
│  ├─ console.log(2)
│  ├─ countdown(1) を呼ぶ
│  │  │
│  │  ├─ n = 1
│  │  ├─ console.log(1)
│  │  ├─ countdown(0) を呼ぶ
│  │  │  │
│  │  │  ├─ n = 0
│  │  │  ├─ 終了条件！
│  │  │  └─ console.log('完了！')
│  │  │
│  │  └─ return
│  │
│  └─ return
│
└─ return
```

---

## 💡 再帰の2つの要素

再帰関数は必ず以下の2つの要素で構成されます。

### 要素1：ベースケース（終了条件）

**ベースケース**は、再帰を止める条件です。これがないと無限ループになります。

```javascript
function countdown(n) {
  // ベースケース（終了条件）
  if (n <= 0) {
    console.log('完了！');
    return;  // ここで止まる
  }

  console.log(n);
  countdown(n - 1);
}
```

**ベースケースがない場合（危険！）**：

```javascript
// 悪い例：終了条件がない
function infiniteCountdown(n) {
  console.log(n);
  infiniteCountdown(n - 1);  // 永遠に続く！
}

// これを実行すると...
// infiniteCountdown(3);  // エラー: Maximum call stack size exceeded
```

### 要素2：再帰ケース

**再帰ケース**は、問題を小さくして自分自身を呼び出す部分です。

```javascript
function countdown(n) {
  if (n <= 0) {
    console.log('完了！');
    return;
  }

  console.log(n);

  // 再帰ケース
  countdown(n - 1);  // n を1減らして、より小さい問題に
}
```

**問題が小さくなる様子**：

```
countdown(5)
  ↓ 小さくする
countdown(4)
  ↓ 小さくする
countdown(3)
  ↓ 小さくする
countdown(2)
  ↓ 小さくする
countdown(1)
  ↓ 小さくする
countdown(0) ← 終了条件に到達
```

---

## 🎯 基本例1：カウントアップ

逆にカウントアップする再帰関数を作ります。

```javascript
function countUp(start, end) {
  // ベースケース（終了条件）
  if (start > end) {
    console.log('完了！');
    return;
  }

  // 現在の数を表示
  console.log(start);

  // 再帰ケース（1増やす）
  countUp(start + 1, end);
}

countUp(1, 5);
```

### 実行の流れ

```
countUp(1, 5)
  ↓
start = 1, end = 5
1 > 5 ? → いいえ
console.log(1) → '1' を出力
countUp(2, 5) を呼ぶ
  ↓
start = 2, end = 5
2 > 5 ? → いいえ
console.log(2) → '2' を出力
countUp(3, 5) を呼ぶ
  ↓
start = 3, end = 5
3 > 5 ? → いいえ
console.log(3) → '3' を出力
countUp(4, 5) を呼ぶ
  ↓
start = 4, end = 5
4 > 5 ? → いいえ
console.log(4) → '4' を出力
countUp(5, 5) を呼ぶ
  ↓
start = 5, end = 5
5 > 5 ? → いいえ
console.log(5) → '5' を出力
countUp(6, 5) を呼ぶ
  ↓
start = 6, end = 5
6 > 5 ? → はい（終了条件）
console.log('完了！')
return

出力:
1
2
3
4
5
完了！
```

---

## 🎯 基本例2：階乗の計算

階乗（factorial）は `n! = n × (n-1) × ... × 1` です。

```javascript
function factorial(n) {
  // ベースケース
  if (n <= 1) {
    return 1;
  }

  // 再帰ケース
  return n * factorial(n - 1);
}

console.log(factorial(5));  // 120
console.log(factorial(3));  // 6
console.log(factorial(1));  // 1
```

### 実行の流れ

```
factorial(5) を実行
  ↓
n = 5, 5 <= 1 ? → いいえ
return 5 * factorial(4)
  ↓
  factorial(4) を実行
    ↓
  n = 4, 4 <= 1 ? → いいえ
  return 4 * factorial(3)
    ↓
    factorial(3) を実行
      ↓
    n = 3, 3 <= 1 ? → いいえ
    return 3 * factorial(2)
      ↓
      factorial(2) を実行
        ↓
      n = 2, 2 <= 1 ? → いいえ
      return 2 * factorial(1)
        ↓
        factorial(1) を実行
          ↓
        n = 1, 1 <= 1 ? → はい（ベースケース）
        return 1
        ↓
      return 2 * 1 = 2
      ↓
    return 3 * 2 = 6
    ↓
  return 4 * 6 = 24
  ↓
return 5 * 24 = 120
```

**計算の展開**：

```
factorial(5)
= 5 × factorial(4)
= 5 × (4 × factorial(3))
= 5 × (4 × (3 × factorial(2)))
= 5 × (4 × (3 × (2 × factorial(1))))
= 5 × (4 × (3 × (2 × 1)))
= 5 × (4 × (3 × 2))
= 5 × (4 × 6)
= 5 × 24
= 120
```

---

## 🎯 基本例3：累乗の計算

`power(2, 3)` = 2³ = 2 × 2 × 2 = 8

```javascript
function power(base, exponent) {
  // ベースケース
  if (exponent === 0) {
    return 1;  // どんな数の0乗も1
  }

  // 再帰ケース
  return base * power(base, exponent - 1);
}

console.log(power(2, 3));  // 8  (2 × 2 × 2)
console.log(power(5, 2));  // 25 (5 × 5)
console.log(power(3, 4));  // 81 (3 × 3 × 3 × 3)
```

### 実行の流れ

```
power(2, 3) を実行
  ↓
base = 2, exponent = 3
3 === 0 ? → いいえ
return 2 * power(2, 2)
  ↓
  power(2, 2) を実行
    ↓
  exponent = 2
  2 === 0 ? → いいえ
  return 2 * power(2, 1)
    ↓
    power(2, 1) を実行
      ↓
    exponent = 1
    1 === 0 ? → いいえ
    return 2 * power(2, 0)
      ↓
      power(2, 0) を実行
        ↓
      exponent = 0
      0 === 0 ? → はい（ベースケース）
      return 1
      ↓
    return 2 * 1 = 2
    ↓
  return 2 * 2 = 4
  ↓
return 2 * 4 = 8
```

---

## 🏗️ 実践例1：再帰カウンター（視覚的）

視覚的にカウントダウンを表示するアプリを作ります。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>再帰カウンター</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
    }
    #display {
      font-size: 120px;
      margin: 50px 0;
      color: #333;
      min-height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    input {
      font-size: 24px;
      padding: 10px;
      width: 100px;
      text-align: center;
      margin: 10px;
    }
    button {
      font-size: 20px;
      padding: 15px 30px;
      margin: 10px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      color: white;
    }
    .start { background: #4CAF50; }
    .stop { background: #f44336; }
    #log {
      margin-top: 30px;
      padding: 20px;
      background: #f0f0f0;
      border-radius: 5px;
      max-height: 300px;
      overflow-y: auto;
      text-align: left;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <h1>再帰カウンター</h1>
  <p>開始値を入力してカウントダウンします</p>

  <div>
    <input type="number" id="startValue" value="10" min="1" max="20">
    <br>
    <button class="start" id="startBtn">カウントダウン開始</button>
    <button class="stop" id="stopBtn">停止</button>
  </div>

  <div id="display">-</div>

  <div id="log"></div>

  <script>
    let intervalId = null;
    let currentNumber = 0;

    function log(message) {
      const logDiv = document.getElementById('log');
      const time = new Date().toLocaleTimeString();
      logDiv.innerHTML += `[${time}] ${message}<br>`;
      logDiv.scrollTop = logDiv.scrollHeight;
    }

    // 再帰カウントダウン関数
    function countdown(n) {
      // ベースケース（終了条件）
      if (n <= 0) {
        document.getElementById('display').textContent = '🎉 完了！';
        document.getElementById('display').style.fontSize = '60px';
        log('カウントダウン完了！');
        return;
      }

      // 現在の数を表示
      document.getElementById('display').textContent = n;
      document.getElementById('display').style.fontSize = '120px';
      log(`カウント: ${n}`);

      // 再帰ケース（1秒後に次を呼ぶ）
      intervalId = setTimeout(function() {
        countdown(n - 1);
      }, 1000);
    }

    // 開始ボタン
    document.getElementById('startBtn').addEventListener('click', function() {
      const startValue = parseInt(document.getElementById('startValue').value);

      if (isNaN(startValue) || startValue < 1 || startValue > 20) {
        alert('1〜20の数値を入力してください');
        return;
      }

      // ログをクリア
      document.getElementById('log').innerHTML = '';

      log(`カウントダウン開始: ${startValue} から 0 まで`);

      // 再帰カウントダウンを開始
      countdown(startValue);
    });

    // 停止ボタン
    document.getElementById('stopBtn').addEventListener('click', function() {
      if (intervalId) {
        clearTimeout(intervalId);
        intervalId = null;
        log('カウントダウンを停止しました');
        document.getElementById('display').textContent = '停止';
      }
    });
  </script>
</body>
</html>
```

### データの流れ

```
ユーザーが「10」を入力して開始ボタンをクリック
  ↓
countdown(10) を呼び出す
  ↓
n = 10
10 <= 0 ? → いいえ
画面に「10」を表示
ログに「カウント: 10」を記録
1秒後に countdown(9) を呼ぶ
  ↓
n = 9
9 <= 0 ? → いいえ
画面に「9」を表示
ログに「カウント: 9」を記録
1秒後に countdown(8) を呼ぶ
  ↓
... 繰り返し ...
  ↓
n = 1
1 <= 0 ? → いいえ
画面に「1」を表示
ログに「カウント: 1」を記録
1秒後に countdown(0) を呼ぶ
  ↓
n = 0
0 <= 0 ? → はい（ベースケース）
画面に「🎉 完了！」を表示
ログに「カウントダウン完了！」を記録
return で終了
```

---

## 🏗️ 実践例2：配列の合計（再帰版）

配列の合計を再帰で計算します。

```javascript
function sum(array) {
  // ベースケース：配列が空
  if (array.length === 0) {
    return 0;
  }

  // 再帰ケース：最初の要素 + 残りの合計
  return array[0] + sum(array.slice(1));
}

console.log(sum([1, 2, 3, 4, 5]));  // 15
console.log(sum([10, 20, 30]));     // 60
console.log(sum([7]));              // 7
console.log(sum([]));               // 0
```

### 実行の流れ

```
sum([1, 2, 3, 4, 5])
  ↓
array.length = 5
5 === 0 ? → いいえ
return 1 + sum([2, 3, 4, 5])
  ↓
  sum([2, 3, 4, 5])
    ↓
  array.length = 4
  4 === 0 ? → いいえ
  return 2 + sum([3, 4, 5])
    ↓
    sum([3, 4, 5])
      ↓
    array.length = 3
    3 === 0 ? → いいえ
    return 3 + sum([4, 5])
      ↓
      sum([4, 5])
        ↓
      array.length = 2
      2 === 0 ? → いいえ
      return 4 + sum([5])
        ↓
        sum([5])
          ↓
        array.length = 1
        1 === 0 ? → いいえ
        return 5 + sum([])
          ↓
          sum([])
            ↓
          array.length = 0
          0 === 0 ? → はい（ベースケース）
          return 0
          ↓
        return 5 + 0 = 5
        ↓
      return 4 + 5 = 9
      ↓
    return 3 + 9 = 12
    ↓
  return 2 + 12 = 14
  ↓
return 1 + 14 = 15
```

**計算の展開**：

```
sum([1, 2, 3, 4, 5])
= 1 + sum([2, 3, 4, 5])
= 1 + (2 + sum([3, 4, 5]))
= 1 + (2 + (3 + sum([4, 5])))
= 1 + (2 + (3 + (4 + sum([5]))))
= 1 + (2 + (3 + (4 + (5 + sum([])))))
= 1 + (2 + (3 + (4 + (5 + 0))))
= 1 + 2 + 3 + 4 + 5
= 15
```

---

## 🏗️ 実践例3：文字列の反転

文字列を逆順にします。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>文字列反転（再帰）</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    input {
      font-size: 20px;
      padding: 10px;
      width: 100%;
      margin: 10px 0;
    }
    button {
      font-size: 18px;
      padding: 10px 30px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      background: #4CAF50;
      color: white;
    }
    .result {
      margin-top: 20px;
      padding: 20px;
      background: #f0f0f0;
      border-radius: 5px;
      font-size: 24px;
      word-break: break-all;
    }
    .steps {
      margin-top: 20px;
      padding: 15px;
      background: #e3f2fd;
      border-radius: 5px;
      font-family: monospace;
      white-space: pre-wrap;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <h1>文字列反転（再帰版）</h1>
  <p>文字列を入力すると、再帰関数で逆順にします</p>

  <input type="text" id="textInput" placeholder="文字列を入力" value="Hello">
  <button id="reverseBtn">反転</button>

  <div class="result" id="result"></div>
  <div class="steps" id="steps"></div>

  <script>
    let stepLog = [];

    // 再帰で文字列を反転
    function reverse(str, depth = 0) {
      const indent = '  '.repeat(depth);

      // ベースケース：空文字または1文字
      if (str.length <= 1) {
        stepLog.push(`${indent}reverse("${str}") → ベースケース → return "${str}"`);
        return str;
      }

      // 再帰ケース
      stepLog.push(`${indent}reverse("${str}")`);
      stepLog.push(`${indent}  → 最後の文字 "${str[str.length - 1]}" + reverse("${str.slice(0, -1)}")`);

      const lastChar = str[str.length - 1];
      const rest = str.slice(0, -1);
      const result = lastChar + reverse(rest, depth + 1);

      stepLog.push(`${indent}  → "${lastChar}" + "${reverse(rest, depth + 1)}" = "${result}"`);

      return result;
    }

    document.getElementById('reverseBtn').addEventListener('click', function() {
      const text = document.getElementById('textInput').value;

      if (text === '') {
        alert('文字列を入力してください');
        return;
      }

      // ログをクリア
      stepLog = [];

      // 反転を実行
      const reversed = reverse(text);

      // 結果を表示
      document.getElementById('result').innerHTML = `
        <strong>元の文字列:</strong> ${text}<br>
        <strong>反転後:</strong> ${reversed}
      `;

      // ステップを表示
      document.getElementById('steps').textContent =
        '実行の流れ:\n' + stepLog.join('\n');
    });
  </script>
</body>
</html>
```

### 簡単な実装

```javascript
function reverse(str) {
  // ベースケース
  if (str.length <= 1) {
    return str;
  }

  // 再帰ケース：最後の文字 + 残りを反転
  return str[str.length - 1] + reverse(str.slice(0, -1));
}

console.log(reverse('hello'));  // 'olleh'
console.log(reverse('abc'));    // 'cba'
console.log(reverse('a'));      // 'a'
```

### 実行の流れ

```
reverse('hello')
  ↓
str = 'hello'
length = 5
5 <= 1 ? → いいえ
return 'o' + reverse('hell')
  ↓
  reverse('hell')
    ↓
  str = 'hell'
  length = 4
  4 <= 1 ? → いいえ
  return 'l' + reverse('hel')
    ↓
    reverse('hel')
      ↓
    str = 'hel'
    length = 3
    3 <= 1 ? → いいえ
    return 'l' + reverse('he')
      ↓
      reverse('he')
        ↓
      str = 'he'
      length = 2
      2 <= 1 ? → いいえ
      return 'e' + reverse('h')
        ↓
        reverse('h')
          ↓
        str = 'h'
        length = 1
        1 <= 1 ? → はい（ベースケース）
        return 'h'
        ↓
      return 'e' + 'h' = 'eh'
      ↓
    return 'l' + 'eh' = 'leh'
    ↓
  return 'l' + 'leh' = 'lleh'
  ↓
return 'o' + 'lleh' = 'olleh'
```

---

## 📝 練習問題

### 練習1：配列の長さを数える（基本）

**問題**：再帰を使って配列の長さを数える関数を作成してください。

**仕様**：
1. `length(array)` という関数を作る
2. 配列が空なら `0` を返す
3. 空でなければ `1 + 残りの配列の長さ` を返す

**例**：
```javascript
console.log(length([1, 2, 3, 4]));  // 4
console.log(length([5, 10]));       // 2
console.log(length([]));            // 0
```

<details>
<summary>💡 ヒント</summary>

```javascript
function length(array) {
  // ベースケース：配列が空
  if (array.length === 0) {
    return 0;
  }

  // 再帰ケース：1 + 残りの長さ
  return 1 + length(array.slice(1));
}
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
// 再帰で配列の長さを数える
function length(array) {
  // ベースケース：配列が空
  if (array.length === 0) {
    return 0;
  }

  // 再帰ケース：1 + 残りの長さ
  return 1 + length(array.slice(1));
}

// テスト
console.log(length([1, 2, 3, 4]));      // 4
console.log(length([5, 10]));           // 2
console.log(length(['a', 'b', 'c']));   // 3
console.log(length([]));                // 0
```

**実行の流れ**：

```
length([1, 2, 3, 4])
  ↓
array.length = 4
4 === 0 ? → いいえ
return 1 + length([2, 3, 4])
  ↓
  length([2, 3, 4])
  return 1 + length([3, 4])
    ↓
    length([3, 4])
    return 1 + length([4])
      ↓
      length([4])
      return 1 + length([])
        ↓
        length([])
        return 0 （ベースケース）
        ↓
      return 1 + 0 = 1
      ↓
    return 1 + 1 = 2
    ↓
  return 1 + 2 = 3
  ↓
return 1 + 3 = 4
```

**確認**：
- ✅ ベースケースがある（配列が空）
- ✅ 再帰ケースで配列が小さくなる
- ✅ 正しく長さを数えている
</details>

---

### 練習2：配列の最大値を見つける（応用）

**問題**：再帰を使って配列の最大値を見つける関数を作成してください。

**仕様**：
1. `max(array)` という関数を作る
2. 配列に要素が1つなら、その要素を返す
3. 最初の要素と残りの最大値を比較して、大きい方を返す

**例**：
```javascript
console.log(max([3, 7, 2, 9, 1]));  // 9
console.log(max([5, 5, 5]));        // 5
console.log(max([42]));             // 42
```

<details>
<summary>💡 ヒント</summary>

```javascript
function max(array) {
  // ベースケース：要素が1つ
  if (array.length === 1) {
    return array[0];
  }

  // 再帰ケース：最初の要素 vs 残りの最大値
  const restMax = max(array.slice(1));
  return array[0] > restMax ? array[0] : restMax;
}
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
// 再帰で配列の最大値を見つける
function max(array) {
  // ベースケース：要素が1つ
  if (array.length === 1) {
    return array[0];
  }

  // 再帰ケース：最初の要素 vs 残りの最大値
  const firstElement = array[0];
  const restMax = max(array.slice(1));

  return firstElement > restMax ? firstElement : restMax;
}

// テスト
console.log(max([3, 7, 2, 9, 1]));  // 9
console.log(max([5, 5, 5]));        // 5
console.log(max([42]));             // 42
console.log(max([10, 3, 8, 15, 6])); // 15
```

**実行の流れ**：

```
max([3, 7, 2, 9, 1])
  ↓
array.length = 5
5 === 1 ? → いいえ
firstElement = 3
restMax = max([7, 2, 9, 1])
  ↓
  max([7, 2, 9, 1])
  firstElement = 7
  restMax = max([2, 9, 1])
    ↓
    max([2, 9, 1])
    firstElement = 2
    restMax = max([9, 1])
      ↓
      max([9, 1])
      firstElement = 9
      restMax = max([1])
        ↓
        max([1])
        array.length = 1
        1 === 1 ? → はい（ベースケース）
        return 1
        ↓
      return 9 > 1 ? 9 : 1 → 9
      ↓
    return 2 > 9 ? 2 : 9 → 9
    ↓
  return 7 > 9 ? 7 : 9 → 9
  ↓
return 3 > 9 ? 3 : 9 → 9
```

**確認**：
- ✅ ベースケースがある（要素が1つ）
- ✅ 再帰ケースで配列が小さくなる
- ✅ 正しく最大値を見つけている
</details>

---

### 練習3：フィボナッチ数列（発展）

**問題**：再帰を使ってフィボナッチ数列のn番目の値を求める関数を作成してください。

**フィボナッチ数列**：`0, 1, 1, 2, 3, 5, 8, 13, 21, ...`
- fibonacci(0) = 0
- fibonacci(1) = 1
- fibonacci(n) = fibonacci(n-1) + fibonacci(n-2)

**仕様**：
1. `fibonacci(n)` という関数を作る
2. n が 0 なら 0 を返す
3. n が 1 なら 1 を返す
4. それ以外は `fibonacci(n-1) + fibonacci(n-2)` を返す

**例**：
```javascript
console.log(fibonacci(0));  // 0
console.log(fibonacci(1));  // 1
console.log(fibonacci(6));  // 8
console.log(fibonacci(10)); // 55
```

<details>
<summary>💡 ヒント</summary>

```javascript
function fibonacci(n) {
  // ベースケース1
  if (n === 0) {
    return 0;
  }

  // ベースケース2
  if (n === 1) {
    return 1;
  }

  // 再帰ケース
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
// 再帰でフィボナッチ数列を計算
function fibonacci(n) {
  // ベースケース1: n = 0
  if (n === 0) {
    return 0;
  }

  // ベースケース2: n = 1
  if (n === 1) {
    return 1;
  }

  // 再帰ケース
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// テスト
console.log(fibonacci(0));   // 0
console.log(fibonacci(1));   // 1
console.log(fibonacci(2));   // 1
console.log(fibonacci(3));   // 2
console.log(fibonacci(4));   // 3
console.log(fibonacci(5));   // 5
console.log(fibonacci(6));   // 8
console.log(fibonacci(10));  // 55

// フィボナッチ数列を表示
console.log('フィボナッチ数列（最初の11個）:');
for (let i = 0; i <= 10; i++) {
  console.log(`fibonacci(${i}) = ${fibonacci(i)}`);
}
```

**完全版（HTML付き）**：

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>フィボナッチ数列</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    input {
      font-size: 20px;
      padding: 10px;
      width: 100px;
      text-align: center;
    }
    button {
      font-size: 18px;
      padding: 10px 30px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      background: #4CAF50;
      color: white;
    }
    .result {
      margin-top: 20px;
      padding: 20px;
      background: #f0f0f0;
      border-radius: 5px;
      font-size: 24px;
    }
    .sequence {
      margin-top: 20px;
      padding: 15px;
      background: #e3f2fd;
      border-radius: 5px;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <h1>フィボナッチ数列（再帰版）</h1>
  <p>n番目のフィボナッチ数を計算します</p>

  <div>
    <input type="number" id="nInput" value="10" min="0" max="20">
    <button id="calcBtn">計算</button>
  </div>

  <div class="result" id="result"></div>
  <div class="sequence" id="sequence"></div>

  <script>
    function fibonacci(n) {
      if (n === 0) return 0;
      if (n === 1) return 1;
      return fibonacci(n - 1) + fibonacci(n - 2);
    }

    document.getElementById('calcBtn').addEventListener('click', function() {
      const n = parseInt(document.getElementById('nInput').value);

      if (isNaN(n) || n < 0 || n > 20) {
        alert('0〜20の数値を入力してください');
        return;
      }

      // 計算
      const result = fibonacci(n);

      // 結果を表示
      document.getElementById('result').innerHTML = `
        <strong>fibonacci(${n}) = ${result}</strong>
      `;

      // 数列を表示
      let sequence = 'フィボナッチ数列（0〜' + n + '）:<br>';
      for (let i = 0; i <= n; i++) {
        sequence += `fibonacci(${i}) = ${fibonacci(i)}<br>`;
      }
      document.getElementById('sequence').innerHTML = sequence;
    });
  </script>
</body>
</html>
```

**実行の流れ（fibonacci(5)の場合）**：

```
fibonacci(5)
  ↓
5 === 0 ? → いいえ
5 === 1 ? → いいえ
return fibonacci(4) + fibonacci(3)
  ↓
fibonacci(4) を計算
  ↓
  4 === 0 ? → いいえ
  4 === 1 ? → いいえ
  return fibonacci(3) + fibonacci(2)
    ↓
  fibonacci(3) を計算
    ... 再帰が続く ...

計算木:
                 fibonacci(5)
                /            \
          fib(4)              fib(3)
         /      \            /      \
     fib(3)   fib(2)      fib(2)   fib(1)
     /   \    /   \       /   \       |
  fib(2) fib(1) fib(1) fib(0) fib(1) fib(0)  1
  /  \     |      |      |      |      |
fib(1) fib(0) 1    1     0      1      0
  |     |
  1     0

結果:
fibonacci(5) = 5
```

**注意**：
- フィボナッチ数列の再帰版は、n が大きくなると非常に遅くなります
- 同じ計算を何度も繰り返すため（例：fibonacci(3)を複数回計算）
- n = 20 以下にすることを推奨

**確認**：
- ✅ 2つのベースケースがある
- ✅ 再帰ケースで2つの再帰呼び出しをしている
- ✅ 正しくフィボナッチ数を計算している
</details>

---

## 🔍 再帰 vs ループ

同じ処理を再帰とループで比較します。

### カウントダウンの比較

**ループ版**：

```javascript
function countdownLoop(n) {
  for (let i = n; i > 0; i--) {
    console.log(i);
  }
  console.log('完了！');
}

countdownLoop(5);
```

**再帰版**：

```javascript
function countdownRecursive(n) {
  if (n <= 0) {
    console.log('完了！');
    return;
  }
  console.log(n);
  countdownRecursive(n - 1);
}

countdownRecursive(5);
```

### 比較表

| 特徴 | ループ | 再帰 |
|------|--------|------|
| **読みやすさ** | シンプルな場合は読みやすい | 数学的な定義に近い |
| **パフォーマンス** | 高速 | やや遅い（関数呼び出しのコスト） |
| **メモリ** | 少ない | スタックを使う |
| **適用範囲** | 線形的な処理 | ツリー構造、分割統治 |
| **無限ループ** | 条件ミスで起こる | ベースケース忘れで起こる |

### 再帰が向いている場合

1. **木構造やネストしたデータ**
   ```javascript
   // フォルダ内のファイルを再帰的に探索
   function searchFiles(folder) {
     // フォルダの中のファイルを処理
     // サブフォルダがあれば再帰的に探索
   }
   ```

2. **分割統治法**
   ```javascript
   // クイックソート、マージソートなど
   function mergeSort(array) {
     // 配列を半分に分割
     // 左半分をソート（再帰）
     // 右半分をソート（再帰）
     // マージ
   }
   ```

3. **数学的な定義**
   ```javascript
   // 階乗、フィボナッチ、累乗など
   function factorial(n) {
     if (n <= 1) return 1;
     return n * factorial(n - 1);
   }
   ```

---

## ⚠️ 再帰の注意点

### 注意点1：終了条件が必須

**悪い例（無限再帰）**：

```javascript
function infiniteRecursion(n) {
  console.log(n);
  infiniteRecursion(n - 1);  // 終了条件がない！
}

// これを実行すると...
// infiniteRecursion(10);
// エラー: Maximum call stack size exceeded
```

### 注意点2：スタックオーバーフロー

再帰が深すぎるとエラーになります。

```javascript
function deepRecursion(n) {
  if (n <= 0) return;
  deepRecursion(n - 1);
}

// 深すぎる再帰
// deepRecursion(100000);  // エラー!
```

### 注意点3：パフォーマンス

単純な再帰は遅い場合があります。

```javascript
// 遅い例：fibonacci(40) は非常に遅い
function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// fibonacci(40); // 数秒かかる
```

---

## 🎓 まとめ

### 再帰関数の重要ポイント

1. **再帰関数とは**
   - 自分自身を呼び出す関数
   - 問題を小さくしていく手法
   - 構文: `if (終了条件) { return; } 自分を呼ぶ();`

2. **2つの要素**
   - **ベースケース（終了条件）**: 再帰を止める
   - **再帰ケース**: 問題を小さくして自分を呼ぶ

3. **主な用途**
   - カウントダウン・カウントアップ
   - 階乗、累乗の計算
   - 配列の処理（合計、最大値）
   - 文字列の反転

4. **チェックリスト**
   - ✅ ベースケースがある
   - ✅ 再帰呼び出しで問題が小さくなる
   - ✅ 必ず終了条件に到達する

5. **注意点**
   - ❌ 終了条件がないと無限ループ
   - ❌ 深すぎるとスタックオーバーフロー
   - ❌ 単純な処理はループの方が速い

### 基本パターン

```javascript
function recursiveFunction(n) {
  // 1. ベースケース（終了条件）
  if (n <= 0) {
    return 基本的な値;
  }

  // 2. 何か処理

  // 3. 再帰ケース（自分を呼ぶ）
  return recursiveFunction(n - 1);  // 問題を小さくする
}
```

---

## 📚 カリキュラム要求事項の確認

このレッスンで学んだ内容がカリキュラムの要求を満たしているか確認しましょう。

### レッスン127の要求事項

- ✅ **自分を呼ぶ関数** - 再帰関数の基本概念を学習
- ✅ **終了条件** - ベースケースの重要性を理解
- ✅ **カウントダウン** - 再帰でカウントダウンを実装
- ✅ **知識：再帰、ベースケースと再帰ケース** - 2つの要素を詳しく解説
- ✅ **成果物：再帰カウンター** - 視覚的なカウンターアプリを作成

すべての要求事項を満たしています！

---

## 🚀 次のステップ

次回のレッスンでは、**ユーティリティ関数** について学びます。

再利用可能な汎用的な関数を作る方法を学びます。

```javascript
// 次回の予告：ユーティリティ関数
function clamp(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

console.log(clamp(15, 0, 10));  // 10（上限）
console.log(clamp(-5, 0, 10));  // 0（下限）
console.log(clamp(5, 0, 10));   // 5（範囲内）
```

再帰の理解が、より複雑なアルゴリズムを学ぶ基礎となります！
