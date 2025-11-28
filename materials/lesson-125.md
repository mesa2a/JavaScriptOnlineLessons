# レッスン125：関数を返す関数

**作成日: 2025-11-26**

## このレッスンで学ぶこと

このレッスンでは、**関数を返す関数（関数ファクトリー）** について学びます。関数が関数を返すという、JavaScriptの強力な機能を理解し、カスタマイズ可能な関数の作り方を習得します。

### 学習目標

1. `return function() {}` の書き方を理解する
2. クロージャの基本概念を学ぶ
3. カスタマイズ可能な関数の作り方を習得する
4. 高階関数の概念を理解する
5. 関数ファクトリーのパターンを学ぶ

---

## 📚 関数を返す関数とは？

### 日常生活での例：工場（ファクトリー）

関数を返す関数を理解するために、日常生活の例で考えてみましょう。

**クッキー製造機の工場**

想像してください。あなたはクッキー製造機を作る工場を経営しています。

```
通常の関数（クッキーを作る）:
┌─────────────────┐
│  クッキーマシン  │
│  材料を入れる    │ → 🍪 クッキー
│  ボタンを押す    │
└─────────────────┘

関数を返す関数（クッキーマシンを作る）:
┌──────────────────────────┐
│  クッキーマシン工場       │
│  設定を指定              │ → ┌─────────────┐
│  「チョコ味」「バター味」  │   │ チョコマシン │ → 🍪🍫
│                          │   └─────────────┘
│                          │ → ┌─────────────┐
│                          │   │バターマシン  │ → 🍪🧈
└──────────────────────────┘   └─────────────┘
```

**関数を返す関数の特徴**：
1. **工場が製造機を作る** → 関数が関数を返す
2. **製造機ごとに設定が違う** → それぞれの関数が異なる動作をする
3. **製造機は設定を覚えている** → クロージャで値を記憶
4. **同じ工場から別々の製造機を作れる** → 独立した関数を量産できる

---

## 🔧 基本的な書き方

### シンプルな例：関数を返す

**ステップ1：関数が関数を返す**

```javascript
// 関数を作る関数（関数ファクトリー）
function createGreeter() {
  // 新しい関数を返す
  return function() {
    console.log('こんにちは！');
  };
}

// 関数を取得
const greet = createGreeter();

// 取得した関数を実行
greet();  // 'こんにちは！'
```

### 実行の流れ（ステップバイステップ）

```
ステップ1: createGreeter() を呼び出す
  ↓
関数が返される
  function() {
    console.log('こんにちは！');
  }
  ↓
ステップ2: 返された関数を greet に代入
  const greet = function() { ... };
  ↓
ステップ3: greet() を実行
  ↓
console.log('こんにちは！'); が実行される
  ↓
出力: 'こんにちは！'
```

### 視覚的な構造

```
createGreeter 関数
┌─────────────────────────┐
│ function createGreeter() │
│ {                        │
│   return ──────────┐     │
│ }                  │     │
└────────────────────┼─────┘
                     ↓
         新しい関数を返す
         ┌───────────────┐
         │ function() {  │
         │   console.log │
         │ }             │
         └───────────────┘
              ↓
         greet に代入
```

---

## 💡 パラメータを覚える関数

### カスタマイズされた挨拶関数を作る

**問題**：異なる名前で挨拶したい

```javascript
// 悪い例：同じコードを何度も書く
function greetTaro() {
  console.log('こんにちは、太郎さん');
}

function greetHanako() {
  console.log('こんにちは、花子さん');
}

// これでは関数が増えすぎる...
```

**解決**：関数ファクトリーを使う

```javascript
// 良い例：関数ファクトリーで作る
function createGreeter(name) {
  return function() {
    console.log('こんにちは、' + name + 'さん');
  };
}

// カスタマイズされた関数を作る
const greetTaro = createGreeter('太郎');
const greetHanako = createGreeter('花子');
const greetJiro = createGreeter('次郎');

// 実行
greetTaro();    // 'こんにちは、太郎さん'
greetHanako();  // 'こんにちは、花子さん'
greetJiro();    // 'こんにちは、次郎さん'
```

### 実行の流れ（詳細）

```
ステップ1: createGreeter('太郎') を呼び出す
  ↓
パラメータ name に '太郎' が入る
  name = '太郎'
  ↓
関数を返す（name = '太郎' を覚えている）
  return function() {
    console.log('こんにちは、' + '太郎' + 'さん');
  }
  ↓
ステップ2: 返された関数を greetTaro に代入
  const greetTaro = function() { ... };
  ↓
ステップ3: greetTaro() を実行
  ↓
console.log('こんにちは、太郎さん'); が実行される
  ↓
出力: 'こんにちは、太郎さん'

重要：greetTaro は name = '太郎' を覚え続ける！
```

---

## 🎯 クロージャとは？

**クロージャ**は、関数が作られた時の環境（外側の変数）を記憶する仕組みです。

### クロージャの図解

```javascript
function createGreeter(name) {  // ← 外側の関数
  // name = '太郎'

  return function() {           // ← 内側の関数
    // この関数は外側の name を覚えている
    console.log('こんにちは、' + name + 'さん');
  };
}

const greetTaro = createGreeter('太郎');
```

**クロージャの視覚化**：

```
createGreeter('太郎') の実行環境
┌────────────────────────────┐
│ name = '太郎'               │ ← 外側の変数
│                            │
│  返される関数               │
│  ┌──────────────────┐     │
│  │ function() {     │     │
│  │   // name を使う │ ───┼─→ name を覚えている
│  │ }                │     │
│  └──────────────────┘     │
└────────────────────────────┘
         ↓
    greetTaro に代入
         ↓
greetTaro の実行環境（クロージャ）
┌────────────────────────────┐
│ 覚えている値:               │
│ name = '太郎'               │ ← ずっと覚えている
│                            │
│ function() {               │
│   console.log(             │
│     'こんにちは、' +        │
│     name + 'さん'          │ ← name を使える
│   );                       │
│ }                          │
└────────────────────────────┘
```

**ポイント**：
- ✅ 返された関数は、外側の変数 `name` を覚えている
- ✅ `createGreeter()` の実行が終わっても、`name` は消えない
- ✅ この「覚えている」仕組みがクロージャ

---

## 🎯 基本例1：足し算ファクトリー

特定の数を足す関数を作ります。

```javascript
function createAdder(x) {
  return function(y) {
    return x + y;
  };
}

// 5を足す関数
const add5 = createAdder(5);

// 10を足す関数
const add10 = createAdder(10);

// 使用
console.log(add5(3));   // 8  (5 + 3)
console.log(add5(7));   // 12 (5 + 7)
console.log(add10(3));  // 13 (10 + 3)
console.log(add10(7));  // 17 (10 + 7)
```

### 実行の流れ

```
createAdder(5) の実行
  ↓
x = 5 を覚えた関数を返す
  return function(y) {
    return 5 + y;  ← x = 5 を記憶
  }
  ↓
add5 に代入
  ↓
add5(3) を実行
  ↓
y = 3
  ↓
return 5 + 3
  ↓
結果: 8

createAdder(10) の実行
  ↓
x = 10 を覚えた関数を返す（別のクロージャ）
  return function(y) {
    return 10 + y;  ← x = 10 を記憶
  }
  ↓
add10 に代入
  ↓
add10(3) を実行
  ↓
y = 3
  ↓
return 10 + 3
  ↓
結果: 13
```

**重要**：
- `add5` と `add10` は **別々のクロージャ**
- それぞれが **独立した `x` の値** を覚えている

---

## 🎯 基本例2：掛け算ファクトリー

```javascript
function createMultiplier(multiplier) {
  return function(value) {
    return value * multiplier;
  };
}

// カスタマイズされた関数を作る
const double = createMultiplier(2);   // 2倍
const triple = createMultiplier(3);   // 3倍
const tenTimes = createMultiplier(10); // 10倍

// 使用
console.log(double(5));    // 10  (5 × 2)
console.log(triple(5));    // 15  (5 × 3)
console.log(tenTimes(5));  // 50  (5 × 10)
```

### データ構造の図解

```
createMultiplier ファクトリー
        ↓
┌───────┴───────┬───────────┬───────────┐
│               │           │           │
double          triple      tenTimes
multiplier=2    multiplier=3 multiplier=10
│               │           │
├─ double(5)    ├─ triple(5) ├─ tenTimes(5)
│  = 5 × 2      │  = 5 × 3   │  = 5 × 10
│  = 10         │  = 15      │  = 50
```

---

## 🎯 基本例3：状態を持つカウンター

クロージャを使って、プライベートな状態を持つ関数を作れます。

```javascript
function createCounter() {
  let count = 0;  // プライベート変数

  return function() {
    count = count + 1;
    return count;
  };
}

// 独立したカウンターを作る
const counter1 = createCounter();
const counter2 = createCounter();

// counter1 を使う
console.log(counter1());  // 1
console.log(counter1());  // 2
console.log(counter1());  // 3

// counter2 を使う（独立している）
console.log(counter2());  // 1
console.log(counter2());  // 2

// counter1 は影響を受けない
console.log(counter1());  // 4
```

### 実行の流れ

```
ステップ1: const counter1 = createCounter();
  ↓
クロージャ1が作られる
  count = 0 を持つ
  ↓
function() { count++; return count; } を返す
  ↓
counter1 に代入

ステップ2: const counter2 = createCounter();
  ↓
クロージャ2が作られる（別の count）
  count = 0 を持つ（counter1の count とは別物）
  ↓
function() { count++; return count; } を返す
  ↓
counter2 に代入

counter1() を実行:
  クロージャ1の count を使う
  count = 0 → 1
  return 1

counter1() を実行:
  クロージャ1の count を使う
  count = 1 → 2
  return 2

counter2() を実行:
  クロージャ2の count を使う（別のcount）
  count = 0 → 1
  return 1
```

**クロージャの独立性**：

```
グローバルスコープ
┌────────────────────────────────────┐
│                                    │
│  counter1 のクロージャ              │
│  ┌──────────────────┐             │
│  │ count = 3        │             │
│  │ function() {...} │             │
│  └──────────────────┘             │
│                                    │
│  counter2 のクロージャ              │
│  ┌──────────────────┐             │
│  │ count = 2        │ ← 別の count │
│  │ function() {...} │             │
│  └──────────────────┘             │
│                                    │
│  ※ それぞれ独立している             │
└────────────────────────────────────┘
```

---

## 🏗️ 実践例1：挨拶ファクトリー

異なる挨拶タイプの関数を作ります。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>挨拶ファクトリー</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .section {
      margin: 20px 0;
      padding: 15px;
      border: 2px solid #333;
      border-radius: 5px;
    }
    button {
      font-size: 16px;
      padding: 10px 20px;
      margin: 5px;
      cursor: pointer;
      border-radius: 5px;
      border: none;
      background: #4CAF50;
      color: white;
    }
    button:hover {
      background: #45a049;
    }
    input {
      font-size: 16px;
      padding: 8px;
      margin: 5px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }
    #output {
      margin-top: 20px;
      padding: 15px;
      background: #f0f0f0;
      border-radius: 5px;
      min-height: 50px;
    }
  </style>
</head>
<body>
  <h1>挨拶ファクトリー</h1>

  <div class="section">
    <h2>名前を入力</h2>
    <input type="text" id="nameInput" placeholder="名前を入力" value="太郎">
  </div>

  <div class="section">
    <h2>挨拶タイプを選択</h2>
    <button id="helloBtn">こんにちは</button>
    <button id="goodbyeBtn">さようなら</button>
    <button id="thanksBtn">ありがとう</button>
    <button id="morningBtn">おはよう</button>
  </div>

  <div id="output"></div>

  <script>
    // 挨拶関数ファクトリー
    function createGreeting(greeting) {
      // greeting を覚えた関数を返す
      return function(name) {
        return greeting + '、' + name + 'さん！';
      };
    }

    // 異なる挨拶関数を作成
    const sayHello = createGreeting('こんにちは');
    const sayGoodbye = createGreeting('さようなら');
    const sayThanks = createGreeting('ありがとう');
    const sayMorning = createGreeting('おはよう');

    // 出力エリア
    const output = document.getElementById('output');

    // 挨拶を表示する関数
    function showGreeting(greetFunc) {
      const name = document.getElementById('nameInput').value;
      if (name === '') {
        output.textContent = '名前を入力してください';
        return;
      }
      const message = greetFunc(name);
      output.innerHTML = '<h2>' + message + '</h2>';
    }

    // イベントリスナーの設定
    document.getElementById('helloBtn').addEventListener('click', function() {
      showGreeting(sayHello);
    });

    document.getElementById('goodbyeBtn').addEventListener('click', function() {
      showGreeting(sayGoodbye);
    });

    document.getElementById('thanksBtn').addEventListener('click', function() {
      showGreeting(sayThanks);
    });

    document.getElementById('morningBtn').addEventListener('click', function() {
      showGreeting(sayMorning);
    });
  </script>
</body>
</html>
```

### データの流れ

```
createGreeting('こんにちは') を実行
  ↓
greeting = 'こんにちは' を覚えた関数を返す
  ↓
sayHello に代入
  ↓
ユーザーが名前入力: '太郎'
  ↓
「こんにちは」ボタンをクリック
  ↓
sayHello('太郎') を実行
  ↓
return 'こんにちは' + '、' + '太郎' + 'さん！'
  ↓
結果: 'こんにちは、太郎さん！'
  ↓
画面に表示
```

---

## 🏗️ 実践例2：複数のメソッドを持つカウンター

オブジェクトとして複数の関数を返すことができます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>高機能カウンター</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 50px;
    }
    #display {
      font-size: 64px;
      margin: 30px 0;
      color: #333;
    }
    button {
      font-size: 18px;
      padding: 12px 24px;
      margin: 5px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      color: white;
    }
    .increment { background: #4CAF50; }
    .decrement { background: #f44336; }
    .reset { background: #2196F3; }
    .getValue { background: #FF9800; }
    button:hover { opacity: 0.8; }
  </style>
</head>
<body>
  <h1>高機能カウンター</h1>
  <div id="display">10</div>
  <div>
    <button class="increment" id="incrementBtn">+1</button>
    <button class="decrement" id="decrementBtn">-1</button>
    <button class="reset" id="resetBtn">リセット</button>
    <button class="getValue" id="getValueBtn">値を表示</button>
  </div>

  <script>
    // 高機能カウンターファクトリー
    function createCounter(start) {
      let count = start;  // プライベート変数

      // 複数のメソッドを持つオブジェクトを返す
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

    // カウンターを作成（初期値10）
    const counter = createCounter(10);

    // 画面更新関数
    function updateDisplay() {
      const value = counter.getValue();
      document.getElementById('display').textContent = value;
    }

    // イベントリスナーの設定
    document.getElementById('incrementBtn').addEventListener('click', function() {
      counter.increment();
      updateDisplay();
    });

    document.getElementById('decrementBtn').addEventListener('click', function() {
      counter.decrement();
      updateDisplay();
    });

    document.getElementById('resetBtn').addEventListener('click', function() {
      counter.reset();
      updateDisplay();
    });

    document.getElementById('getValueBtn').addEventListener('click', function() {
      const value = counter.getValue();
      alert('現在の値: ' + value);
    });
  </script>
</body>
</html>
```

### データ構造の図解

```
createCounter(10) を実行
┌────────────────────────────────┐
│ プライベート変数               │
│ count = 10                     │
│ start = 10                     │
└────────────────────────────────┘
         ↓ 返される
┌────────────────────────────────┐
│ 公開メソッド                   │
│ ・increment() → count++        │
│ ・decrement() → count--        │
│ ・getValue()  → return count   │
│ ・reset()     → count = start  │
└────────────────────────────────┘
         ↓
    counter に代入

使用例:
counter.increment() → count = 11
counter.increment() → count = 12
counter.decrement() → count = 11
counter.getValue()  → return 11
counter.reset()     → count = 10
```

**ポイント**：
- ✅ `count` と `start` は外から直接アクセスできない（プライベート）
- ✅ メソッド経由でのみ操作できる
- ✅ 予期しない変更を防げる

---

## 🏗️ 実践例3：税金計算機ファクトリー

異なる税率の計算機を作ります。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>税金計算機</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .calculator {
      margin: 20px 0;
      padding: 20px;
      border: 2px solid #333;
      border-radius: 10px;
      background: #f9f9f9;
    }
    input {
      font-size: 18px;
      padding: 10px;
      width: 200px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    button {
      font-size: 18px;
      padding: 10px 20px;
      margin: 10px 5px;
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
      font-size: 18px;
    }
  </style>
</head>
<body>
  <h1>税金計算機ファクトリー</h1>

  <div class="calculator">
    <h2>価格を入力</h2>
    <input type="number" id="priceInput" placeholder="価格" value="1000">
    <div style="margin-top: 20px;">
      <button id="japanBtn">日本（10%）</button>
      <button id="usaBtn">アメリカ（7%）</button>
      <button id="ukBtn">イギリス（20%）</button>
    </div>
    <div class="result" id="result">計算結果がここに表示されます</div>
  </div>

  <script>
    // 税金計算機ファクトリー
    function createTaxCalculator(taxRate, country) {
      // taxRate と country を覚えた関数を返す
      return function(price) {
        const tax = Math.round(price * taxRate);
        const total = price + tax;

        return {
          country: country,
          price: price,
          taxRate: (taxRate * 100) + '%',
          tax: tax,
          total: total
        };
      };
    }

    // 異なる税率の計算機を作成
    const japanTax = createTaxCalculator(0.1, '日本');      // 10%
    const usaTax = createTaxCalculator(0.07, 'アメリカ');   // 7%
    const ukTax = createTaxCalculator(0.2, 'イギリス');     // 20%

    // 結果を表示する関数
    function showResult(calculator, calcName) {
      const price = parseInt(document.getElementById('priceInput').value);

      if (isNaN(price) || price <= 0) {
        document.getElementById('result').innerHTML =
          '<p style="color: red;">正しい価格を入力してください</p>';
        return;
      }

      // 計算実行
      const result = calculator(price);

      // 結果を表示
      document.getElementById('result').innerHTML = `
        <h3>${result.country}の税金計算</h3>
        <p><strong>本体価格:</strong> ¥${result.price.toLocaleString()}</p>
        <p><strong>税率:</strong> ${result.taxRate}</p>
        <p><strong>消費税:</strong> ¥${result.tax.toLocaleString()}</p>
        <p style="font-size: 24px; color: #4CAF50;">
          <strong>合計:</strong> ¥${result.total.toLocaleString()}
        </p>
      `;
    }

    // イベントリスナーの設定
    document.getElementById('japanBtn').addEventListener('click', function() {
      showResult(japanTax, '日本');
    });

    document.getElementById('usaBtn').addEventListener('click', function() {
      showResult(usaTax, 'アメリカ');
    });

    document.getElementById('ukBtn').addEventListener('click', function() {
      showResult(ukTax, 'イギリス');
    });
  </script>
</body>
</html>
```

### 実行の流れ

```
createTaxCalculator(0.1, '日本') を実行
  ↓
taxRate = 0.1, country = '日本' を覚えた関数を返す
  ↓
japanTax に代入
  ↓
ユーザーが価格入力: 1000
  ↓
「日本（10%）」ボタンをクリック
  ↓
japanTax(1000) を実行
  ↓
tax = 1000 × 0.1 = 100
total = 1000 + 100 = 1100
  ↓
return {
  country: '日本',
  price: 1000,
  taxRate: '10%',
  tax: 100,
  total: 1100
}
  ↓
結果を画面に表示
```

---

## 📝 練習問題

### 練習1：基本的な関数ファクトリー（基本）

**問題**：接頭辞（prefix）を付ける関数ファクトリーを作成してください。

**仕様**：
1. `createPrefixer(prefix)` という関数を作る
2. この関数は、引数で受け取った `prefix` を覚えた関数を返す
3. 返された関数は、文字列を受け取り、`prefix + 文字列` を返す

**例**：
```javascript
const addMr = createPrefixer('Mr. ');
const addMs = createPrefixer('Ms. ');

console.log(addMr('Tanaka'));  // 'Mr. Tanaka'
console.log(addMs('Suzuki'));  // 'Ms. Suzuki'
```

<details>
<summary>💡 ヒント</summary>

```javascript
function createPrefixer(prefix) {
  // prefix を覚えた関数を返す
  return function(text) {
    // prefix と text を結合
    return prefix + text;
  };
}
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
// 接頭辞を付ける関数ファクトリー
function createPrefixer(prefix) {
  return function(text) {
    return prefix + text;
  };
}

// カスタマイズされた関数を作成
const addMr = createPrefixer('Mr. ');
const addMs = createPrefixer('Ms. ');
const addDr = createPrefixer('Dr. ');

// 使用
console.log(addMr('Tanaka'));   // 'Mr. Tanaka'
console.log(addMs('Suzuki'));   // 'Ms. Suzuki'
console.log(addDr('Yamada'));   // 'Dr. Yamada'
```

**実行の流れ**：

```
createPrefixer('Mr. ') を実行
  ↓
prefix = 'Mr. ' を覚えた関数を返す
  return function(text) {
    return 'Mr. ' + text;
  }
  ↓
addMr に代入
  ↓
addMr('Tanaka') を実行
  ↓
text = 'Tanaka'
  ↓
return 'Mr. ' + 'Tanaka'
  ↓
結果: 'Mr. Tanaka'
```

**確認**：
- ✅ 関数が関数を返している
- ✅ クロージャで `prefix` を覚えている
- ✅ 異なる接頭辞で複数の関数を作れる
</details>

---

### 練習2：割引計算機ファクトリー（応用）

**問題**：割引率を設定できる計算機を作成してください。

**仕様**：
1. `createDiscountCalculator(discountRate)` という関数を作る
2. この関数は、割引率を覚えた関数を返す
3. 返された関数は、価格を受け取り、以下を返す：
   - `original`: 元の価格
   - `discount`: 割引額
   - `final`: 割引後の価格

**例**：
```javascript
const discount10 = createDiscountCalculator(0.1);  // 10%割引
const discount20 = createDiscountCalculator(0.2);  // 20%割引

console.log(discount10(1000));
// { original: 1000, discount: 100, final: 900 }

console.log(discount20(1000));
// { original: 1000, discount: 200, final: 800 }
```

<details>
<summary>💡 ヒント</summary>

```javascript
function createDiscountCalculator(discountRate) {
  return function(price) {
    const discount = price × discountRate;
    const final = price - discount;

    return {
      original: price,
      discount: discount,
      final: final
    };
  };
}
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
// 割引計算機ファクトリー
function createDiscountCalculator(discountRate) {
  return function(price) {
    const discount = Math.round(price * discountRate);
    const final = price - discount;

    return {
      original: price,
      discount: discount,
      final: final
    };
  };
}

// 異なる割引率の計算機を作成
const discount10 = createDiscountCalculator(0.1);  // 10%割引
const discount20 = createDiscountCalculator(0.2);  // 20%割引
const discount50 = createDiscountCalculator(0.5);  // 50%割引

// 使用
console.log(discount10(1000));
// { original: 1000, discount: 100, final: 900 }

console.log(discount20(1000));
// { original: 1000, discount: 200, final: 800 }

console.log(discount50(1000));
// { original: 1000, discount: 500, final: 500 }
```

**完全版（HTML付き）**：

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>割引計算機</title>
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
      font-size: 16px;
      padding: 10px 20px;
      margin: 5px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      color: white;
    }
    .btn-10 { background: #4CAF50; }
    .btn-20 { background: #2196F3; }
    .btn-50 { background: #f44336; }
    .result {
      margin-top: 20px;
      padding: 20px;
      background: #f0f0f0;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <h1>割引計算機ファクトリー</h1>
  <input type="number" id="priceInput" placeholder="価格" value="1000">
  <div>
    <button class="btn-10" id="btn10">10%割引</button>
    <button class="btn-20" id="btn20">20%割引</button>
    <button class="btn-50" id="btn50">50%割引</button>
  </div>
  <div class="result" id="result"></div>

  <script>
    function createDiscountCalculator(discountRate) {
      return function(price) {
        const discount = Math.round(price * discountRate);
        const final = price - discount;
        return {
          original: price,
          discountRate: (discountRate * 100) + '%',
          discount: discount,
          final: final
        };
      };
    }

    const discount10 = createDiscountCalculator(0.1);
    const discount20 = createDiscountCalculator(0.2);
    const discount50 = createDiscountCalculator(0.5);

    function showResult(calculator) {
      const price = parseInt(document.getElementById('priceInput').value);
      if (isNaN(price) || price <= 0) {
        document.getElementById('result').innerHTML =
          '<p style="color: red;">正しい価格を入力してください</p>';
        return;
      }

      const result = calculator(price);
      document.getElementById('result').innerHTML = `
        <h3>割引計算結果</h3>
        <p><strong>元の価格:</strong> ¥${result.original.toLocaleString()}</p>
        <p><strong>割引率:</strong> ${result.discountRate}</p>
        <p><strong>割引額:</strong> ¥${result.discount.toLocaleString()}</p>
        <p style="font-size: 24px; color: #4CAF50;">
          <strong>割引後:</strong> ¥${result.final.toLocaleString()}
        </p>
      `;
    }

    document.getElementById('btn10').addEventListener('click', function() {
      showResult(discount10);
    });
    document.getElementById('btn20').addEventListener('click', function() {
      showResult(discount20);
    });
    document.getElementById('btn50').addEventListener('click', function() {
      showResult(discount50);
    });
  </script>
</body>
</html>
```

**確認**：
- ✅ 割引率がクロージャで記憶されている
- ✅ 計算結果をオブジェクトで返している
- ✅ 複数の割引率の計算機を作れる
</details>

---

### 練習3：ストップウォッチファクトリー（発展）

**問題**：独立したストップウォッチを作成できるファクトリーを作ってください。

**仕様**：
1. `createStopwatch()` という関数を作る
2. 以下のメソッドを持つオブジェクトを返す：
   - `start()`: 計測開始
   - `stop()`: 計測停止
   - `reset()`: リセット
   - `getTime()`: 経過時間（秒）を返す
3. 複数のストップウォッチが独立して動作すること

<details>
<summary>💡 ヒント</summary>

```javascript
function createStopwatch() {
  let seconds = 0;
  let intervalId = null;

  return {
    start: function() {
      if (intervalId === null) {
        intervalId = setInterval(function() {
          seconds++;
        }, 1000);
      }
    },
    stop: function() {
      // clearInterval を使う
    },
    // 他のメソッド...
  };
}
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
// ストップウォッチファクトリー
function createStopwatch() {
  let seconds = 0;
  let intervalId = null;

  return {
    start: function() {
      if (intervalId !== null) {
        console.log('既に開始しています');
        return;
      }

      intervalId = setInterval(function() {
        seconds = seconds + 1;
        console.log('経過時間:', seconds, '秒');
      }, 1000);
    },

    stop: function() {
      if (intervalId === null) {
        console.log('停止していません');
        return;
      }

      clearInterval(intervalId);
      intervalId = null;
      console.log('停止しました');
    },

    reset: function() {
      this.stop();
      seconds = 0;
      console.log('リセットしました');
    },

    getTime: function() {
      return seconds;
    }
  };
}

// 使用例
const watch1 = createStopwatch();
const watch2 = createStopwatch();

watch1.start();  // ストップウォッチ1を開始

setTimeout(function() {
  watch2.start();  // 2秒後にストップウォッチ2を開始
}, 2000);

setTimeout(function() {
  watch1.stop();   // 5秒後にストップウォッチ1を停止
  console.log('watch1:', watch1.getTime(), '秒');

  watch2.stop();   // ストップウォッチ2を停止
  console.log('watch2:', watch2.getTime(), '秒');
}, 5000);
```

**完全版（HTML付き）**：

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ストップウォッチファクトリー</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .stopwatch {
      display: inline-block;
      margin: 20px;
      padding: 20px;
      border: 3px solid #333;
      border-radius: 10px;
      background: #f9f9f9;
      text-align: center;
      min-width: 250px;
    }
    .display {
      font-size: 48px;
      margin: 20px 0;
      color: #333;
    }
    button {
      font-size: 16px;
      padding: 10px 20px;
      margin: 5px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      color: white;
    }
    .start { background: #4CAF50; }
    .stop { background: #f44336; }
    .reset { background: #2196F3; }
  </style>
</head>
<body>
  <h1>ストップウォッチファクトリー</h1>

  <div class="stopwatch">
    <h2>ストップウォッチ 1</h2>
    <div class="display" id="display1">0秒</div>
    <button class="start" id="start1">スタート</button>
    <button class="stop" id="stop1">ストップ</button>
    <button class="reset" id="reset1">リセット</button>
  </div>

  <div class="stopwatch">
    <h2>ストップウォッチ 2</h2>
    <div class="display" id="display2">0秒</div>
    <button class="start" id="start2">スタート</button>
    <button class="stop" id="stop2">ストップ</button>
    <button class="reset" id="reset2">リセット</button>
  </div>

  <script>
    // ストップウォッチファクトリー
    function createStopwatch(displayId) {
      let seconds = 0;
      let intervalId = null;

      function updateDisplay() {
        document.getElementById(displayId).textContent = seconds + '秒';
      }

      return {
        start: function() {
          if (intervalId !== null) {
            alert('既に開始しています');
            return;
          }

          intervalId = setInterval(function() {
            seconds = seconds + 1;
            updateDisplay();
          }, 1000);
        },

        stop: function() {
          if (intervalId === null) {
            alert('停止していません');
            return;
          }

          clearInterval(intervalId);
          intervalId = null;
        },

        reset: function() {
          if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
          }
          seconds = 0;
          updateDisplay();
        },

        getTime: function() {
          return seconds;
        }
      };
    }

    // 2つの独立したストップウォッチを作成
    const watch1 = createStopwatch('display1');
    const watch2 = createStopwatch('display2');

    // ストップウォッチ1のイベントリスナー
    document.getElementById('start1').addEventListener('click', function() {
      watch1.start();
    });
    document.getElementById('stop1').addEventListener('click', function() {
      watch1.stop();
    });
    document.getElementById('reset1').addEventListener('click', function() {
      watch1.reset();
    });

    // ストップウォッチ2のイベントリスナー
    document.getElementById('start2').addEventListener('click', function() {
      watch2.start();
    });
    document.getElementById('stop2').addEventListener('click', function() {
      watch2.stop();
    });
    document.getElementById('reset2').addEventListener('click', function() {
      watch2.reset();
    });
  </script>
</body>
</html>
```

**データ構造**：

```
createStopwatch('display1') を実行
┌────────────────────────────┐
│ プライベート変数           │
│ seconds = 0                │
│ intervalId = null          │
│ displayId = 'display1'     │
└────────────────────────────┘
         ↓
┌────────────────────────────┐
│ 公開メソッド               │
│ ・start()                  │
│ ・stop()                   │
│ ・reset()                  │
│ ・getTime()                │
└────────────────────────────┘
         ↓
    watch1 に代入

createStopwatch('display2') を実行
┌────────────────────────────┐
│ プライベート変数（別物）    │
│ seconds = 0                │
│ intervalId = null          │
│ displayId = 'display2'     │
└────────────────────────────┘
         ↓
    watch2 に代入

※ watch1 と watch2 は完全に独立
```

**確認**：
- ✅ 複数のストップウォッチが独立している
- ✅ それぞれが独立した状態を持つ
- ✅ クロージャで秒数を保持している
- ✅ プライベート変数が外からアクセスできない
</details>

---

## 🔍 高階関数とは？

**高階関数**（Higher-Order Function）は、以下のいずれかを満たす関数です：

1. **関数を引数として受け取る**
2. **関数を戻り値として返す** ← 今回学んだこと

### 高階関数の例

```javascript
// パターン1: 関数を返す（今回学んだ）
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

// パターン2: 関数を引数に受け取る（次回学ぶ）
function execute(callback) {
  callback();
}
```

---

## 📋 関数ファクトリーのパターン

### パターン1：パラメータを記憶

```javascript
function createFormatter(prefix, suffix) {
  return function(text) {
    return prefix + text + suffix;
  };
}

const addBrackets = createFormatter('[', ']');
const addParens = createFormatter('(', ')');

console.log(addBrackets('Hello'));  // '[Hello]'
console.log(addParens('Hello'));    // '(Hello)'
```

### パターン2：初期状態を持つ

```javascript
function createCounter(start, step) {
  let count = start;

  return function() {
    const current = count;
    count = count + step;
    return current;
  };
}

const counter1 = createCounter(0, 1);   // 0から1ずつ
const counter2 = createCounter(10, 5);  // 10から5ずつ

console.log(counter1());  // 0
console.log(counter1());  // 1
console.log(counter2());  // 10
console.log(counter2());  // 15
```

### パターン3：設定を適用

```javascript
function createValidator(minLength, maxLength) {
  return function(text) {
    const length = text.length;
    return length >= minLength && length <= maxLength;
  };
}

const validateUsername = createValidator(3, 20);   // 3〜20文字
const validatePassword = createValidator(8, 50);   // 8〜50文字

console.log(validateUsername('ab'));        // false（短すぎる）
console.log(validateUsername('john'));      // true
console.log(validatePassword('pass'));      // false（短すぎる）
console.log(validatePassword('password1')); // true
```

---

## 🎓 まとめ

### 関数を返す関数の重要ポイント

1. **関数を返す関数とは**
   - 関数が新しい関数を生成して返す
   - 構文: `return function() { }`
   - 「関数ファクトリー」とも呼ばれる

2. **クロージャ**
   - 返された関数は、外側の変数を覚えている
   - 外側の関数の実行が終わっても、変数は保持される
   - これがクロージャの仕組み

3. **主な用途**
   - カスタマイズ可能な関数を作る
   - プライベートな状態を持つ関数
   - 設定を記憶した関数
   - 独立した複数の関数を生成

4. **メリット**
   - ✅ コードの再利用性が高まる
   - ✅ 柔軟なカスタマイズが可能
   - ✅ プライベート変数を作れる
   - ✅ 独立した状態を管理できる

### 基本パターン

```javascript
// 基本形
function createFunction(parameter) {
  return function() {
    // parameter を使える（クロージャ）
    return parameter;
  };
}

// 複数のメソッドを返す
function createObject(initial) {
  let state = initial;

  return {
    method1: function() { /* ... */ },
    method2: function() { /* ... */ }
  };
}
```

### 使い分けガイド

```javascript
// 同じような関数が複数必要 → 関数ファクトリー
const add5 = createAdder(5);
const add10 = createAdder(10);

// 設定を覚えておきたい → クロージャ
const japanTax = createTaxCalculator(0.1);

// 独立した状態を持ちたい → 関数ファクトリー
const counter1 = createCounter();
const counter2 = createCounter();
```

---

## 📚 カリキュラム要求事項の確認

このレッスンで学んだ内容がカリキュラムの要求を満たしているか確認しましょう。

### レッスン125の要求事項

- ✅ **`return function() {}`** - 関数を返す構文を学習
- ✅ **クロージャの入口** - クロージャの基本概念を理解
- ✅ **カスタマイズ可能な関数** - 関数ファクトリーのパターンを習得
- ✅ **知識：高階関数、関数の生成** - 高階関数の概念と関数生成の仕組みを学習
- ✅ **成果物：関数ファクトリー** - 実践例（挨拶、カウンター、税金計算機、ストップウォッチ）を作成

すべての要求事項を満たしています！

---

## 🚀 次のステップ

次回のレッスンでは、**関数を引数として受け取る** 方法を学びます。

高階関数のもう一つの側面を学ぶことで、より高度な関数の使い方をマスターできます。

```javascript
// 次回の予告：関数を引数に
function execute(callback) {
  console.log('処理開始');
  callback();  // 渡された関数を実行
  console.log('処理終了');
}

execute(function() {
  console.log('実行中');
});

// 出力:
// 処理開始
// 実行中
// 処理終了
```

関数を返す関数と、関数を引数に受け取る関数を組み合わせることで、非常に強力なプログラミングパターンを実現できます！
