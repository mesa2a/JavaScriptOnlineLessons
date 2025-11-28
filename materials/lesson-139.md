# レッスン139：メソッド

**日付**: 2025-11-26

## このレッスンで学ぶこと

このレッスンでは、オブジェクトの中に関数を定義する方法を学びます。オブジェクトの中にある関数のことを「メソッド」と呼び、オブジェクトに動作を持たせることができるようになります。

## 日常生活での例え

メソッドは、**リモコンのボタン**のようなものです。

- **オブジェクト**: テレビ（データと機能を持つ）
- **プロパティ**: チャンネル番号、音量、電源状態などのデータ
- **メソッド**: チャンネル変更、音量調整、電源オン/オフなどの動作

例えば、テレビオブジェクトを考えてみましょう：

```
テレビオブジェクト
┌───────────────────────────────────┐
│ データ（プロパティ）              │
│ - channel: 1                      │
│ - volume: 15                      │
│ - power: true                     │
│                                   │
│ 動作（メソッド）                  │
│ - changeChannel() ← チャンネル変更│
│ - volumeUp()      ← 音量上げる    │
│ - volumeDown()    ← 音量下げる    │
│ - togglePower()   ← 電源切り替え  │
└───────────────────────────────────┘
```

データだけでなく、そのデータを操作する動作も一緒に持つことができます。

## メソッドとは

これまで学んだオブジェクトは、データ（プロパティ）を保存するものでした。しかし、オブジェクトは関数も持つことができます。**オブジェクトの中にある関数のことを「メソッド」と呼びます**。

### 基本的な書き方

```javascript
const person = {
  name: "田中",
  age: 25,
  greet: function() {
    console.log("こんにちは！");
  }
};

person.greet();  // "こんにちは！"
```

### データ構造の視覚化

```
person オブジェクト
┌─────────────────────────────────┐
│ name: "田中"                    │ ← プロパティ（データ）
│ age: 25                         │ ← プロパティ（データ）
│ greet: function() { ... }       │ ← メソッド（動作）
└─────────────────────────────────┘

呼び出し方:
person.greet()  → "こんにちは！" と出力
         ↑
       () を付けて実行
```

`greet` がメソッドです。プロパティと同じようにドット記法でアクセスし、`()` を付けて実行します。

## 省略記法

ES6以降では、メソッドをより簡潔に書くことができます：

```javascript
// 従来の書き方
const calculator1 = {
  add: function(a, b) {
    return a + b;
  }
};

// 省略記法（推奨）
const calculator2 = {
  add(a, b) {
    return a + b;
  }
};
```

`function` キーワードを省略できます。この書き方の方がよく使われます。

### メソッドの実行例

```javascript
const calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  }
};

const result1 = calculator.add(5, 3);
console.log(result1);  // 8

const result2 = calculator.subtract(10, 4);
console.log(result2);  // 6
```

### 実行の流れ

```
【calculator.add(5, 3) の実行】

ステップ1: calculator オブジェクトにアクセス
  calculator = {
    add(a, b) { return a + b; },
    subtract(a, b) { return a - b; }
  }

ステップ2: add メソッドにアクセス
  add = function(a, b) { return a + b; }

ステップ3: add(5, 3) を実行
  引数: a = 5, b = 3
  計算: 5 + 3 = 8
  結果: 8 を返す

result1 = 8
```

メソッドは通常の関数と同じように、引数を受け取り、値を返すことができます。

## thisキーワード

メソッドの中で、**そのオブジェクト自身のプロパティにアクセスする**には、`this` キーワードを使います。

### 基本的な使い方

```javascript
const person = {
  name: "佐藤",
  age: 30,
  introduce() {
    console.log("私の名前は" + this.name + "です");
    console.log("年齢は" + this.age + "歳です");
  }
};

person.introduce();
// "私の名前は佐藤です"
// "年齢は30歳です"
```

### thisの仕組み

```
【person.introduce() の実行】

person オブジェクト
┌─────────────────────────────────┐
│ name: "佐藤"                    │
│ age: 30                         │
│ introduce() {                   │
│   console.log("私の名前は" +    │
│     this.name + "です");        │ ← this は person を指す
│   console.log("年齢は" +        │
│     this.age + "歳です");       │ ← this は person を指す
│ }                               │
└─────────────────────────────────┘

実行時:
this.name → person.name → "佐藤"
this.age  → person.age  → 30
```

`this` は「このオブジェクト自身」を指します。`this.name` は `person.name` と同じ意味になります。

### thisを使わない場合のエラー

もし `this` を使わないと、オブジェクトのプロパティにアクセスできません：

```javascript
const person = {
  name: "佐藤",
  introduce() {
    console.log("私の名前は" + name + "です");  // エラー！
    // name という変数が見つからない
  }
};
```

メソッドの中で自分自身のプロパティを使う場合は、必ず `this` を付けます。

## プロパティを変更するメソッド

メソッドを使って、オブジェクトのプロパティを変更することもできます。

```javascript
const counter = {
  count: 0,
  increment() {
    this.count = this.count + 1;
  },
  decrement() {
    this.count = this.count - 1;
  },
  reset() {
    this.count = 0;
  }
};

counter.increment();
console.log(counter.count);  // 1

counter.increment();
console.log(counter.count);  // 2

counter.decrement();
console.log(counter.count);  // 1

counter.reset();
console.log(counter.count);  // 0
```

### 実行の流れ

```
【初期状態】
counter = { count: 0, increment() {...}, decrement() {...}, reset() {...} }

【counter.increment() の実行】
ステップ1: this.count にアクセス
  this.count = counter.count = 0

ステップ2: this.count + 1 を計算
  0 + 1 = 1

ステップ3: this.count に代入
  counter.count = 1

【実行後】
counter = { count: 1, ... }

【counter.increment() の実行（2回目）】
ステップ1: this.count にアクセス
  this.count = counter.count = 1

ステップ2: this.count + 1 を計算
  1 + 1 = 2

ステップ3: this.count に代入
  counter.count = 2

【実行後】
counter = { count: 2, ... }

【counter.decrement() の実行】
counter.count = 2 - 1 = 1

【counter.reset() の実行】
counter.count = 0
```

## 値を返すメソッド

メソッドは計算結果を返すこともできます。

```javascript
const rectangle = {
  width: 10,
  height: 5,
  getArea() {
    return this.width * this.height;
  },
  getPerimeter() {
    return (this.width + this.height) * 2;
  }
};

const area = rectangle.getArea();
console.log(area);  // 50

const perimeter = rectangle.getPerimeter();
console.log(perimeter);  // 30
```

### 実行の流れ

```
【rectangle.getArea() の実行】

rectangle = { width: 10, height: 5, ... }

ステップ1: メソッドを呼び出し
  getArea() が実行される

ステップ2: this.width * this.height を計算
  this.width = rectangle.width = 10
  this.height = rectangle.height = 5
  計算: 10 * 5 = 50

ステップ3: 結果を返す
  return 50

area = 50

【rectangle.getPerimeter() の実行】

ステップ1: (this.width + this.height) * 2 を計算
  this.width = 10
  this.height = 5
  計算: (10 + 5) * 2 = 15 * 2 = 30

ステップ2: 結果を返す
  return 30

perimeter = 30
```

## 実践例1：銀行口座管理システム

メソッドを使った実用的な銀行口座オブジェクトを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>銀行口座管理システム</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }

        h1 {
            text-align: center;
            color: white;
            margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .container {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }

        .account-info {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }

        .owner-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .balance {
            font-size: 36px;
            font-weight: bold;
            text-align: center;
            margin: 15px 0;
        }

        .balance-label {
            font-size: 14px;
            text-align: center;
        }

        .controls {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }

        .control-group {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
        }

        .control-label {
            font-weight: bold;
            margin-bottom: 10px;
            color: #667eea;
        }

        input[type="number"] {
            width: 100%;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            margin-bottom: 10px;
        }

        button {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s;
        }

        button:hover {
            transform: translateY(-2px);
        }

        .deposit-btn {
            background: #28a745;
            color: white;
        }

        .withdraw-btn {
            background: #dc3545;
            color: white;
        }

        .history {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
            max-height: 300px;
            overflow-y: auto;
        }

        .history-title {
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
        }

        .history-item {
            padding: 8px;
            margin: 5px 0;
            border-radius: 5px;
            font-size: 14px;
        }

        .history-deposit {
            background: #d4edda;
            color: #155724;
        }

        .history-withdraw {
            background: #f8d7da;
            color: #721c24;
        }

        .history-error {
            background: #fff3cd;
            color: #856404;
        }
    </style>
</head>
<body>
    <h1>💰 銀行口座管理システム</h1>
    <div class="container">
        <div id="accountInfo" class="account-info"></div>

        <div class="controls">
            <div class="control-group">
                <div class="control-label">💵 預金</div>
                <input type="number" id="depositAmount" placeholder="金額を入力" min="1">
                <button class="deposit-btn" onclick="handleDeposit()">預金する</button>
            </div>

            <div class="control-group">
                <div class="control-label">💸 引き出し</div>
                <input type="number" id="withdrawAmount" placeholder="金額を入力" min="1">
                <button class="withdraw-btn" onclick="handleWithdraw()">引き出す</button>
            </div>
        </div>

        <div class="history">
            <div class="history-title">📋 取引履歴</div>
            <div id="historyList"></div>
        </div>
    </div>

    <script>
        // 銀行口座オブジェクト（メソッドを持つ）
        const bankAccount = {
            owner: "山田太郎",
            balance: 10000,
            history: [],

            // 預金メソッド
            deposit(amount) {
                this.balance = this.balance + amount;
                this.addHistory("預金", amount, true);
                return true;
            },

            // 引き出しメソッド
            withdraw(amount) {
                if (amount > this.balance) {
                    this.addHistory("引き出し失敗", amount, false);
                    return false;
                } else {
                    this.balance = this.balance - amount;
                    this.addHistory("引き出し", amount, true);
                    return true;
                }
            },

            // 残高取得メソッド
            getBalance() {
                return this.balance;
            },

            // 履歴追加メソッド
            addHistory(type, amount, success) {
                const now = new Date();
                const time = now.getHours() + ":" +
                            String(now.getMinutes()).padStart(2, "0");
                this.history.push({
                    type: type,
                    amount: amount,
                    success: success,
                    time: time,
                    balance: this.balance
                });
            },

            // 口座情報表示メソッド
            displayInfo() {
                const infoDiv = document.getElementById("accountInfo");
                infoDiv.innerHTML = `
                    <div class="owner-name">👤 ${this.owner}</div>
                    <div class="balance">¥${this.balance.toLocaleString()}</div>
                    <div class="balance-label">現在の残高</div>
                `;
            },

            // 履歴表示メソッド
            displayHistory() {
                const historyDiv = document.getElementById("historyList");
                historyDiv.innerHTML = "";

                // 最新の10件を表示
                const recentHistory = this.history.slice(-10).reverse();

                for (let i = 0; i < recentHistory.length; i++) {
                    const item = recentHistory[i];
                    const itemDiv = document.createElement("div");

                    let className = "history-item ";
                    if (!item.success) {
                        className = className + "history-error";
                    } else if (item.type === "預金") {
                        className = className + "history-deposit";
                    } else {
                        className = className + "history-withdraw";
                    }
                    itemDiv.className = className;

                    itemDiv.textContent = `${item.time} - ${item.type}: ¥${item.amount.toLocaleString()} (残高: ¥${item.balance.toLocaleString()})`;

                    historyDiv.appendChild(itemDiv);
                }
            }
        };

        // 預金処理
        function handleDeposit() {
            const input = document.getElementById("depositAmount");
            const amount = parseInt(input.value);

            if (amount > 0) {
                bankAccount.deposit(amount);
                bankAccount.displayInfo();
                bankAccount.displayHistory();
                input.value = "";
            } else {
                alert("正しい金額を入力してください");
            }
        }

        // 引き出し処理
        function handleWithdraw() {
            const input = document.getElementById("withdrawAmount");
            const amount = parseInt(input.value);

            if (amount > 0) {
                const success = bankAccount.withdraw(amount);
                if (!success) {
                    alert("残高不足です");
                }
                bankAccount.displayInfo();
                bankAccount.displayHistory();
                input.value = "";
            } else {
                alert("正しい金額を入力してください");
            }
        }

        // 初期表示
        bankAccount.displayInfo();

        // コンソールに情報を出力
        console.log("=== 銀行口座管理システム ===");
        console.log(`口座名義: ${bankAccount.owner}`);
        console.log(`初期残高: ¥${bankAccount.getBalance().toLocaleString()}`);
    </script>
</body>
</html>
```

### このアプリケーションのポイント

1. **複数のメソッド**
   - `deposit()`: 預金処理
   - `withdraw()`: 引き出し処理
   - `getBalance()`: 残高取得
   - `addHistory()`: 履歴追加
   - `displayInfo()`: 口座情報表示
   - `displayHistory()`: 履歴表示

2. **thisの活用**
   - 各メソッドで `this.balance` を使って残高を参照・更新
   - `this.history` で履歴配列を管理

3. **メソッド間の連携**
   - `deposit()` や `withdraw()` から `addHistory()` を呼び出す
   - データの整合性を保つ

## 実践例2：タイマーオブジェクト

メソッドを使ってタイマー機能を持つオブジェクトを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>タイマーシステム</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            text-align: center;
        }

        h1 {
            color: #f5576c;
            margin-bottom: 30px;
        }

        .timer-display {
            font-size: 72px;
            font-weight: bold;
            color: #f093fb;
            margin: 30px 0;
            font-family: 'Courier New', monospace;
        }

        .controls {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-bottom: 20px;
        }

        button {
            padding: 15px 30px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }

        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .start-btn {
            background: #28a745;
            color: white;
        }

        .stop-btn {
            background: #dc3545;
            color: white;
        }

        .reset-btn {
            background: #ffc107;
            color: white;
        }

        .stats {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
        }

        .stat-item {
            padding: 8px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>⏱️ タイマーシステム</h1>
        <div id="timerDisplay" class="timer-display">00:00</div>

        <div class="controls">
            <button class="start-btn" onclick="timer.start()">スタート</button>
            <button class="stop-btn" onclick="timer.stop()">ストップ</button>
            <button class="reset-btn" onclick="timer.reset()">リセット</button>
        </div>

        <div class="stats">
            <div id="stats"></div>
        </div>
    </div>

    <script>
        // タイマーオブジェクト
        const timer = {
            seconds: 0,
            isRunning: false,
            intervalId: null,
            startCount: 0,

            // タイマー開始メソッド
            start() {
                if (!this.isRunning) {
                    this.isRunning = true;
                    this.startCount = this.startCount + 1;
                    this.intervalId = setInterval(() => {
                        this.tick();
                    }, 1000);
                    console.log("タイマー開始");
                }
            },

            // タイマー停止メソッド
            stop() {
                if (this.isRunning) {
                    this.isRunning = false;
                    clearInterval(this.intervalId);
                    console.log("タイマー停止");
                }
            },

            // タイマーリセットメソッド
            reset() {
                this.stop();
                this.seconds = 0;
                this.display();
                this.displayStats();
                console.log("タイマーリセット");
            },

            // 1秒ごとに呼ばれるメソッド
            tick() {
                this.seconds = this.seconds + 1;
                this.display();
                this.displayStats();
            },

            // 時間を取得するメソッド
            getFormattedTime() {
                const minutes = Math.floor(this.seconds / 60);
                const secs = this.seconds % 60;
                return String(minutes).padStart(2, "0") + ":" +
                       String(secs).padStart(2, "0");
            },

            // 表示更新メソッド
            display() {
                const displayDiv = document.getElementById("timerDisplay");
                displayDiv.textContent = this.getFormattedTime();
            },

            // 統計表示メソッド
            displayStats() {
                const statsDiv = document.getElementById("stats");
                const status = this.isRunning ? "⏸️ 実行中" : "⏹️ 停止中";
                statsDiv.innerHTML = `
                    <div class="stat-item">状態: ${status}</div>
                    <div class="stat-item">経過秒数: ${this.seconds}秒</div>
                    <div class="stat-item">開始回数: ${this.startCount}回</div>
                `;
            }
        };

        // 初期表示
        timer.display();
        timer.displayStats();

        // コンソールに情報を出力
        console.log("=== タイマーシステム ===");
        console.log("start() - タイマー開始");
        console.log("stop() - タイマー停止");
        console.log("reset() - タイマーリセット");
    </script>
</body>
</html>
```

### このアプリケーションのポイント

1. **状態管理メソッド**
   - `start()`: タイマー開始
   - `stop()`: タイマー停止
   - `reset()`: タイマーリセット

2. **内部処理メソッド**
   - `tick()`: 1秒ごとに時間を更新
   - `getFormattedTime()`: 時間を文字列に変換

3. **表示メソッド**
   - `display()`: タイマー表示更新
   - `displayStats()`: 統計情報表示

4. **メソッド内でメソッドを呼び出し**
   - `reset()` から `stop()` を呼び出す
   - `tick()` から `display()` と `displayStats()` を呼び出す

## 実践例3：商品管理オブジェクト

在庫管理機能を持つ商品オブジェクトを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品管理システム</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 30px;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            min-height: 100vh;
        }

        h1 {
            text-align: center;
            color: white;
            margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .product-card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
            margin-bottom: 20px;
        }

        .product-name {
            font-size: 28px;
            font-weight: bold;
            color: #4facfe;
            margin-bottom: 20px;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 25px;
        }

        .info-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
        }

        .info-label {
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
        }

        .info-value {
            font-size: 24px;
            font-weight: bold;
            color: #4facfe;
        }

        .controls {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 20px;
        }

        .control-group {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
        }

        .control-title {
            font-weight: bold;
            margin-bottom: 10px;
            color: #4facfe;
        }

        input[type="number"] {
            width: 100%;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 5px;
            margin-bottom: 10px;
        }

        button {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            color: white;
        }

        .sell-btn {
            background: #28a745;
        }

        .restock-btn {
            background: #17a2b8;
        }

        .log {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
            max-height: 200px;
            overflow-y: auto;
        }

        .log-title {
            font-weight: bold;
            color: #4facfe;
            margin-bottom: 10px;
        }

        .log-item {
            padding: 5px 0;
            border-bottom: 1px solid #ddd;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <h1>📦 商品管理システム</h1>
    <div class="product-card">
        <div class="product-name" id="productName"></div>

        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">価格（税込）</div>
                <div class="info-value" id="price"></div>
            </div>
            <div class="info-item">
                <div class="info-label">在庫数</div>
                <div class="info-value" id="stock"></div>
            </div>
            <div class="info-item">
                <div class="info-label">販売数</div>
                <div class="info-value" id="soldCount"></div>
            </div>
            <div class="info-item">
                <div class="info-label">総売上</div>
                <div class="info-value" id="revenue"></div>
            </div>
        </div>

        <div class="controls">
            <div class="control-group">
                <div class="control-title">💰 販売</div>
                <input type="number" id="sellQuantity" placeholder="数量" min="1" value="1">
                <button class="sell-btn" onclick="handleSell()">販売する</button>
            </div>
            <div class="control-group">
                <div class="control-title">📥 入荷</div>
                <input type="number" id="restockQuantity" placeholder="数量" min="1" value="10">
                <button class="restock-btn" onclick="handleRestock()">入荷する</button>
            </div>
        </div>

        <div class="log">
            <div class="log-title">📋 操作ログ</div>
            <div id="logList"></div>
        </div>
    </div>

    <script>
        // 商品オブジェクト
        const product = {
            name: "ノートパソコン",
            price: 80000,
            stock: 5,
            taxRate: 0.1,
            soldCount: 0,
            totalRevenue: 0,
            logs: [],

            // 税込価格を計算するメソッド
            getPriceWithTax() {
                return Math.floor(this.price * (1 + this.taxRate));
            },

            // 販売メソッド
            sell(quantity) {
                if (quantity > this.stock) {
                    this.addLog(`販売失敗: 在庫不足（要求: ${quantity}個、在庫: ${this.stock}個）`);
                    return false;
                } else {
                    this.stock = this.stock - quantity;
                    this.soldCount = this.soldCount + quantity;
                    const revenue = this.getPriceWithTax() * quantity;
                    this.totalRevenue = this.totalRevenue + revenue;
                    this.addLog(`販売: ${quantity}個（売上: ¥${revenue.toLocaleString()}）`);
                    return true;
                }
            },

            // 入荷メソッド
            restock(quantity) {
                this.stock = this.stock + quantity;
                this.addLog(`入荷: ${quantity}個`);
            },

            // ログ追加メソッド
            addLog(message) {
                const now = new Date();
                const time = now.getHours() + ":" +
                            String(now.getMinutes()).padStart(2, "0");
                this.logs.push(`[${time}] ${message}`);
                this.displayLog();
            },

            // 商品情報表示メソッド
            displayInfo() {
                document.getElementById("productName").textContent = this.name;
                document.getElementById("price").textContent =
                    "¥" + this.getPriceWithTax().toLocaleString();
                document.getElementById("stock").textContent = this.stock + "個";
                document.getElementById("soldCount").textContent = this.soldCount + "個";
                document.getElementById("revenue").textContent =
                    "¥" + this.totalRevenue.toLocaleString();
            },

            // ログ表示メソッド
            displayLog() {
                const logDiv = document.getElementById("logList");
                logDiv.innerHTML = "";

                const recentLogs = this.logs.slice(-10).reverse();
                for (let i = 0; i < recentLogs.length; i++) {
                    const logItem = document.createElement("div");
                    logItem.className = "log-item";
                    logItem.textContent = recentLogs[i];
                    logDiv.appendChild(logItem);
                }
            }
        };

        // 販売処理
        function handleSell() {
            const input = document.getElementById("sellQuantity");
            const quantity = parseInt(input.value);

            if (quantity > 0) {
                const success = product.sell(quantity);
                if (!success) {
                    alert("在庫が不足しています");
                }
                product.displayInfo();
            } else {
                alert("正しい数量を入力してください");
            }
        }

        // 入荷処理
        function handleRestock() {
            const input = document.getElementById("restockQuantity");
            const quantity = parseInt(input.value);

            if (quantity > 0) {
                product.restock(quantity);
                product.displayInfo();
            } else {
                alert("正しい数量を入力してください");
            }
        }

        // 初期表示
        product.displayInfo();

        // コンソールに情報を出力
        console.log("=== 商品管理システム ===");
        console.log(`商品名: ${product.name}`);
        console.log(`価格（税込）: ¥${product.getPriceWithTax().toLocaleString()}`);
        console.log(`初期在庫: ${product.stock}個`);
    </script>
</body>
</html>
```

### このアプリケーションのポイント

1. **計算メソッド**
   - `getPriceWithTax()`: 税込価格を計算

2. **データ操作メソッド**
   - `sell()`: 在庫を減らし、販売数と売上を更新
   - `restock()`: 在庫を増やす
   - `addLog()`: ログを追加

3. **表示メソッド**
   - `displayInfo()`: 商品情報を表示
   - `displayLog()`: 操作ログを表示

4. **複雑な状態管理**
   - 在庫、販売数、総売上など複数のプロパティを管理
   - メソッド内で複数のプロパティを更新

## メソッドの利点

メソッドを使うことで、以下の利点があります：

### 1. 関連するデータと処理を一箇所にまとめられる

```javascript
// メソッドなし（データと処理が分離）
let studentName = "田中";
let studentScore = 75;

function getGrade(score) {
  if (score >= 80) return "A";
  if (score >= 60) return "B";
  return "C";
}

const grade = getGrade(studentScore);

// メソッドあり（データと処理が統合）
const student = {
  name: "田中",
  score: 75,
  getGrade() {
    if (this.score >= 80) return "A";
    if (this.score >= 60) return "B";
    return "C";
  }
};

const grade = student.getGrade();
```

### 2. コードの整理がしやすくなる

オブジェクトごとにメソッドがまとまっているため、どの処理がどのデータに関連しているかが明確になります。

### 3. 再利用しやすくなる

同じ構造のオブジェクトを複数作れば、メソッドも一緒に使えます。

### 4. データの整合性を保ちやすくなる

メソッドを通してデータを操作することで、不正な値が設定されるのを防げます。

## カリキュラムの仕様チェック

このレッスンで実装した内容が、カリキュラムの仕様を満たしているか確認します。

### カリキュラムの要件

curriculum.md の レッスン139 (行1094-1099):

```
レッスン139:メソッド(30分)
□ オブジェクト内の関数
□ thisキーワード（軽く）
□ 動作するオブジェクト
【知識】メソッド、オブジェクト指向の入口
✅ 成果物:スマートオブジェクト
```

### 仕様の確認

| 要件 | 実装内容 | 確認 |
|-----|---------|-----|
| オブジェクト内の関数 | メソッドの定義方法、呼び出し方法を詳しく解説 | ✅ |
| thisキーワード（軽く） | thisの基本的な使い方を解説、プロパティへのアクセス方法を説明 | ✅ |
| 動作するオブジェクト | 銀行口座、タイマー、商品管理など実際に動作するオブジェクトを実装 | ✅ |
| メソッド | メソッドの定義、呼び出し、引数、戻り値を解説 | ✅ |
| オブジェクト指向の入口 | データと処理をまとめる概念を説明 | ✅ |
| 成果物：スマートオブジェクト | 3つの実用的なスマートオブジェクトを実装 | ✅ |

### 詳細な確認

**✅ オブジェクト内の関数**
- メソッドの基本的な書き方を解説
- 省略記法（ES6）の説明
- 引数を受け取るメソッド
- 値を返すメソッド

**✅ thisキーワード（軽く）**
- thisの基本概念を説明（「このオブジェクト自身」）
- this.property でプロパティにアクセス
- thisを使わない場合のエラー例
- 詳細な実行フローで視覚化

**✅ 動作するオブジェクト**
- 実践例1: 銀行口座管理システム（預金、引き出し、履歴）
- 実践例2: タイマーシステム（開始、停止、リセット）
- 実践例3: 商品管理システム（販売、入荷、統計）

**✅ メソッド**
- プロパティを変更するメソッド
- 値を返すメソッド
- メソッド内で他のメソッドを呼び出す

**✅ オブジェクト指向の入口**
- データと処理を一箇所にまとめる概念
- メソッドの利点を説明

**✅ 成果物：スマートオブジェクト**
- 銀行口座オブジェクト（複数のメソッドで状態管理）
- タイマーオブジェクト（時間管理機能）
- 商品オブジェクト（在庫管理機能）

すべての要件を満たしています。

## まとめ

このレッスンでは、以下のことを学びました。

### 学んだこと

1. **メソッドの基本**
   - オブジェクトの中に関数を定義する方法
   - `object.method()` で呼び出す
   - 省略記法（ES6）

2. **thisキーワード**
   - `this` は「このオブジェクト自身」を指す
   - `this.property` でプロパティにアクセス
   - メソッド内で必ず `this` を使う

3. **メソッドの種類**
   - プロパティを変更するメソッド
   - 値を返すメソッド
   - 他のメソッドを呼び出すメソッド

4. **実践的なアプリケーション**
   - 銀行口座管理システム
   - タイマーシステム
   - 商品管理システム

### 重要なポイント

- **データと処理の統合**: メソッドでデータと処理を一箇所にまとめる
- **thisの重要性**: メソッド内で自身のプロパティにアクセスするには `this` が必須
- **実用性**: メソッドを使うことで実際のアプリケーションに近いオブジェクトを作れる
- **オブジェクト指向**: データと処理をまとめる考え方がオブジェクト指向の基本

メソッドを使えるようになることで、オブジェクトに動作を持たせ、より実用的なプログラムを作れるようになりました。次のレッスンでは、オブジェクトのさらに高度な操作について学んでいきます。
