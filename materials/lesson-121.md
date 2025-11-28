# レッスン121：週のプロジェクト - 関数型電卓

**作成日**: 2025-11-26

## このレッスンで学ぶこと

### 前回の復習
前回のレッスンでは、**良い関数名の付け方**を学びました。

```javascript
// 動詞で始まる明確な名前
function getUserName() { }      // 取得
function calculateTotal() { }   // 計算
function showMessage() { }      // 表示
function validateEmail() { }    // 検証
function isValid() { }          // 判定
```

良い関数名をつけることで、コメントなしで理解できる自己文書化コードが書けるようになりました。

### よくある場面
これまで10レッスンかけて関数の基礎を学んできました：

```
レッスン111-112: 引数と戻り値
レッスン113: 関数の中身
レッスン114: 関数から関数を呼び出す
レッスン115: return の役割
レッスン116: ローカル変数
レッスン117: グローバル変数
レッスン118: 引数と戻り値の型
レッスン119: 単一責任の原則
レッスン120: 名前付け
```

**これらの知識を統合して、実際のアプリケーションを作る**時が来ました。

### 学習目標
このレッスンでは以下を学びます：

1. **学んだ知識を統合**して実践的なアプリを作る
2. **各演算を関数化**して構造化されたプログラムを作る
3. **履歴機能を実装**してグローバル変数の使い方を理解する
4. **関数による設計**でアプリケーションを構築する

## プロジェクト概要

### 作るもの：関数型電卓

**関数型電卓**を作成します。これは、以下の機能を持つ計算機アプリです：

1. **四則演算**（足し算、引き算、掛け算、割り算）
2. **各演算が独立した関数**として実装されている
3. **計算履歴**を表示する機能
4. **クリア機能**で入力と履歴をリセット

### 完成イメージ

```
┌──────────────────────────────────┐
│         関数型電卓                │
├──────────────────────────────────┤
│ 数値1: [     10     ]            │
│ 数値2: [      5     ]            │
├──────────────────────────────────┤
│  [+]  [-]  [×]  [÷]  [クリア]   │
├──────────────────────────────────┤
│ 結果: 15                          │
├──────────────────────────────────┤
│ 計算履歴:                         │
│ 14:30:25 - 10 + 5 = 15           │
│ 14:30:20 - 8 × 2 = 16            │
│ 14:30:15 - 20 - 5 = 15           │
│ [履歴クリア]                      │
└──────────────────────────────────┘
```

## これまで学んだ知識の活用

このプロジェクトでは、以下の学習内容を統合します：

| レッスン | 知識 | このプロジェクトでの活用 |
|---------|------|------------------------|
| **111-112** | 引数と戻り値 | 計算関数に数値を渡し、結果を返す |
| **114** | 関数から関数を呼び出す | メイン関数から計算関数を呼び出す |
| **116** | ローカル変数 | 関数内で計算結果を保持 |
| **117** | グローバル変数 | 履歴をグローバル配列で管理 |
| **118** | 型の一貫性 | すべての計算関数が数値を返す |
| **119** | 単一責任 | 各関数が1つの演算だけを行う |
| **120** | 名前付け | add, subtract など明確な関数名 |

### 知識の統合図

```
       ┌─────────────────────────┐
       │  関数型電卓アプリ        │
       └─────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
┌───▼───┐   ┌───▼───┐   ┌───▼───┐
│ 計算   │   │ 表示   │   │ 履歴   │
│ 関数   │   │ 関数   │   │ 管理   │
└───┬───┘   └───┬───┘   └───┬───┘
    │           │           │
    │           │           │
┌───▼──────────┬▼──────────┬▼────┐
│ add()        │showResult()│history│
│ subtract()   │showHistory()│(配列)│
│ multiply()   │            │      │
│ divide()     │            │      │
└──────────────┴────────────┴──────┘

各関数が単一責任を持ち、
明確な名前で役割がわかる
```

## 設計：関数の構造

### 📖 日常生活での例：レストランの厨房

電卓アプリの設計を、レストランの厨房に例えてみましょう：

```
レストランの厨房：
├─ シェフ（各料理担当）    → 計算関数（add, subtract など）
│  ├─ パスタ担当           → add() 専門
│  ├─ サラダ担当           → subtract() 専門
│  ├─ デザート担当         → multiply() 専門
│  └─ ドリンク担当         → divide() 専門
│
├─ ホール係（配膳）        → 表示関数（showResult など）
│
├─ オーダー伝票（記録）    → 履歴配列（history）
│
└─ マネージャー（統括）    → メイン関数（performAdd など）
   └─ オーダーを受けて、各担当に指示を出す
```

**それぞれが専門の仕事だけをする**ことで、効率的に運営できます。

### 1. 計算関数（単一責任）

各演算を独立した関数にします。**1つの関数が1つの演算だけ**を担当します。

```javascript
// 足し算専門の関数
function add(a, b) {
  return a + b;
}

// 引き算専門の関数
function subtract(a, b) {
  return a - b;
}

// 掛け算専門の関数
function multiply(a, b) {
  return a * b;
}

// 割り算専門の関数
function divide(a, b) {
  // 0で割れない場合は0を返す（型の一貫性：常に数値）
  if (b === 0) {
    return 0;
  }
  return a / b;
}
```

**実行の流れ（足し算の場合）**：
```
add(10, 5) を呼び出し
↓
1. a に 10 が入る
2. b に 5 が入る
3. 10 + 5 を計算
4. 結果 15 を返す
↓
15 が返ってくる
```

**ポイント**：
- 各関数は1つの演算だけを行う（単一責任）
- すべて数値を返す（型の一貫性）
- 関数名が演算内容を明確に表している（良い命名）

### 2. 入力取得関数

HTMLから数値を取得する関数です。

```javascript
// 最初の数値を取得
function getFirstNumber() {
  return Number(document.getElementById('num1').value);
}

// 2番目の数値を取得
function getSecondNumber() {
  return Number(document.getElementById('num2').value);
}
```

**実行の流れ**：
```
getFirstNumber() を呼び出し
↓
1. id="num1" の要素を取得
2. その value（入力値）を取得
3. Number() で数値に変換
4. 数値を返す
↓
例：入力が "10" なら 10（数値）が返る
```

**ポイント**：
- `Number()` で文字列を数値に変換
- 各入力欄ごとに専用の関数（単一責任）

### 3. 表示関数

結果や履歴を表示する関数です。

```javascript
// 結果を表示
function showResult(result) {
  document.getElementById('result').textContent = '結果: ' + result;
}
```

**実行の流れ**：
```
showResult(15) を呼び出し
↓
1. result に 15 が入る
2. id="result" の要素を取得
3. textContent に '結果: 15' を設定
↓
画面に「結果: 15」が表示される
```

### 4. 履歴管理（グローバル変数を使用）

計算履歴は**複数の関数で共有する必要がある**ため、グローバル変数を使います。

```javascript
// グローバル変数：計算履歴を保存する配列
let history = [];

// 履歴に追加
function addToHistory(operation, num1, num2, result) {
  const record = {
    operation: operation,  // 演算子（+, -, ×, ÷）
    num1: num1,           // 最初の数値
    num2: num2,           // 2番目の数値
    result: result,       // 計算結果
    time: new Date().toLocaleTimeString()  // 時刻
  };
  history.push(record);  // 配列に追加
}

// 履歴を表示
function showHistory() {
  const historyDiv = document.getElementById('history');
  historyDiv.innerHTML = '';  // 既存の履歴をクリア

  // 新しい順に表示（配列の最後から）
  for (let i = history.length - 1; i >= 0; i--) {
    const record = history[i];
    const item = document.createElement('div');
    item.className = 'history-item';
    item.textContent =
      record.time + ' - ' +
      record.num1 + ' ' + record.operation + ' ' +
      record.num2 + ' = ' + record.result;
    historyDiv.appendChild(item);
  }
}
```

**実行の流れ（履歴追加）**：
```
addToHistory('+', 10, 5, 15) を呼び出し
↓
1. operation に '+' が入る
2. num1 に 10 が入る
3. num2 に 5 が入る
4. result に 15 が入る
5. 現在時刻を取得（例：14:30:25）
6. オブジェクトを作成：
   {
     operation: '+',
     num1: 10,
     num2: 5,
     result: 15,
     time: '14:30:25'
   }
7. history 配列に追加
↓
history = [
  { operation: '+', num1: 10, num2: 5, result: 15, time: '14:30:25' }
]
```

**実行の流れ（履歴表示）**：
```
showHistory() を呼び出し
↓
1. id="history" の要素を取得
2. innerHTML を '' に（既存の表示をクリア）
3. history 配列を最後から順に処理：
   ├─ 配列から1つ取り出す
   ├─ div 要素を作成
   ├─ テキストを設定：「14:30:25 - 10 + 5 = 15」
   └─ history 要素に追加
4. すべての履歴が表示される
↓
画面に履歴が新しい順に表示される
```

### 5. メイン計算関数（関数から関数を呼び出す）

各演算ボタンが押されたときの処理です。**複数の関数を組み合わせて**1つの処理を完成させます。

```javascript
// 足し算を実行
function performAdd() {
  const num1 = getFirstNumber();        // 1. 入力を取得
  const num2 = getSecondNumber();       // 2. 入力を取得
  const result = add(num1, num2);       // 3. 計算
  showResult(result);                   // 4. 結果を表示
  addToHistory('+', num1, num2, result); // 5. 履歴に追加
  showHistory();                        // 6. 履歴を表示
}

// 引き算を実行
function performSubtract() {
  const num1 = getFirstNumber();
  const num2 = getSecondNumber();
  const result = subtract(num1, num2);
  showResult(result);
  addToHistory('-', num1, num2, result);
  showHistory();
}

// 掛け算を実行
function performMultiply() {
  const num1 = getFirstNumber();
  const num2 = getSecondNumber();
  const result = multiply(num1, num2);
  showResult(result);
  addToHistory('×', num1, num2, result);
  showHistory();
}

// 割り算を実行
function performDivide() {
  const num1 = getFirstNumber();
  const num2 = getSecondNumber();
  const result = divide(num1, num2);
  showResult(result);
  addToHistory('÷', num1, num2, result);
  showHistory();
}
```

**実行の流れ（足し算の場合）**：
```
performAdd() を呼び出し
↓
1. getFirstNumber() を呼び出し
   └─ 10 を取得
↓
2. getSecondNumber() を呼び出し
   └─ 5 を取得
↓
3. add(10, 5) を呼び出し
   └─ 10 + 5 = 15 を計算
   └─ 15 を返す
↓
4. showResult(15) を呼び出し
   └─ 「結果: 15」を画面に表示
↓
5. addToHistory('+', 10, 5, 15) を呼び出し
   └─ 履歴配列に記録を追加
↓
6. showHistory() を呼び出し
   └─ 履歴を画面に表示
↓
完了！画面に結果と履歴が表示される
```

### データの流れ図

```
    入力欄
      ↓
getFirstNumber()
getSecondNumber()
      ↓
    num1, num2
      ↓
  add(num1, num2)    ← 計算関数（単一責任）
      ↓
    result
      ↓
  ┌───┴────┐
  ↓        ↓
showResult() addToHistory()
  ↓        ↓
画面表示  history配列
           ↓
      showHistory()
           ↓
       履歴表示
```

## 完全な実装

以下が完全なHTMLファイルです。すべての知識が統合されています。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>関数型電卓</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background: #f5f5f5;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .calculator {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .input-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }

    input {
      width: 100%;
      padding: 10px;
      font-size: 18px;
      border: 2px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #007bff;
    }

    .buttons {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    button {
      flex: 1;
      padding: 15px;
      font-size: 20px;
      font-weight: bold;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .operator-btn {
      background: #007bff;
      color: white;
    }

    .operator-btn:hover {
      background: #0056b3;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,123,255,0.3);
    }

    .clear-btn {
      background: #6c757d;
      color: white;
    }

    .clear-btn:hover {
      background: #5a6268;
    }

    .result {
      background: #e7f3ff;
      padding: 20px;
      border-radius: 5px;
      margin-bottom: 20px;
      text-align: center;
    }

    .result-text {
      font-size: 24px;
      font-weight: bold;
      color: #007bff;
      margin: 0;
    }

    .history-section {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 5px;
    }

    .history-section h2 {
      margin-top: 0;
      margin-bottom: 15px;
      color: #333;
      font-size: 18px;
    }

    .history {
      max-height: 200px;
      overflow-y: auto;
      margin-bottom: 15px;
    }

    .history-item {
      padding: 10px;
      background: white;
      margin-bottom: 8px;
      border-radius: 5px;
      border-left: 4px solid #007bff;
      font-family: monospace;
    }

    .history:empty::before {
      content: '計算履歴がありません';
      color: #999;
      font-style: italic;
    }

    .clear-history-btn {
      width: 100%;
      background: #dc3545;
      color: white;
    }

    .clear-history-btn:hover {
      background: #c82333;
    }
  </style>
</head>
<body>
  <h1>📱 関数型電卓</h1>

  <div class="calculator">
    <!-- 入力欄 -->
    <div class="input-group">
      <label>数値1：</label>
      <input type="number" id="num1" value="10">
    </div>

    <div class="input-group">
      <label>数値2：</label>
      <input type="number" id="num2" value="5">
    </div>

    <!-- 演算ボタン -->
    <div class="buttons">
      <button class="operator-btn" onclick="performAdd()">+</button>
      <button class="operator-btn" onclick="performSubtract()">-</button>
      <button class="operator-btn" onclick="performMultiply()">×</button>
      <button class="operator-btn" onclick="performDivide()">÷</button>
    </div>

    <div class="buttons">
      <button class="clear-btn" onclick="clearCalculator()">クリア</button>
    </div>

    <!-- 結果表示 -->
    <div class="result">
      <p class="result-text" id="result">結果: </p>
    </div>

    <!-- 履歴 -->
    <div class="history-section">
      <h2>📝 計算履歴</h2>
      <div class="history" id="history"></div>
      <button class="clear-history-btn" onclick="clearHistory()">履歴をクリア</button>
    </div>
  </div>

  <script>
    // ========================================
    // グローバル変数：計算履歴
    // ========================================
    let history = [];

    // ========================================
    // 1. 計算関数（単一責任）
    // ========================================

    // 足し算
    function add(a, b) {
      return a + b;
    }

    // 引き算
    function subtract(a, b) {
      return a - b;
    }

    // 掛け算
    function multiply(a, b) {
      return a * b;
    }

    // 割り算
    function divide(a, b) {
      // 0で割れない場合は0を返す（型の一貫性）
      if (b === 0) {
        return 0;
      }
      return a / b;
    }

    // ========================================
    // 2. 入力取得関数
    // ========================================

    // 最初の数値を取得
    function getFirstNumber() {
      return Number(document.getElementById('num1').value);
    }

    // 2番目の数値を取得
    function getSecondNumber() {
      return Number(document.getElementById('num2').value);
    }

    // ========================================
    // 3. 表示関数
    // ========================================

    // 結果を表示
    function showResult(result) {
      document.getElementById('result').textContent = '結果: ' + result;
    }

    // ========================================
    // 4. 履歴管理関数
    // ========================================

    // 履歴に追加
    function addToHistory(operation, num1, num2, result) {
      const record = {
        operation: operation,
        num1: num1,
        num2: num2,
        result: result,
        time: new Date().toLocaleTimeString()
      };
      history.push(record);
    }

    // 履歴を表示
    function showHistory() {
      const historyDiv = document.getElementById('history');
      historyDiv.innerHTML = '';

      // 新しい順に表示
      for (let i = history.length - 1; i >= 0; i--) {
        const record = history[i];
        const item = document.createElement('div');
        item.className = 'history-item';
        item.textContent =
          record.time + ' - ' +
          record.num1 + ' ' + record.operation + ' ' +
          record.num2 + ' = ' + record.result;
        historyDiv.appendChild(item);
      }
    }

    // ========================================
    // 5. メイン計算関数（関数から関数を呼び出す）
    // ========================================

    // 足し算を実行
    function performAdd() {
      const num1 = getFirstNumber();
      const num2 = getSecondNumber();
      const result = add(num1, num2);
      showResult(result);
      addToHistory('+', num1, num2, result);
      showHistory();
    }

    // 引き算を実行
    function performSubtract() {
      const num1 = getFirstNumber();
      const num2 = getSecondNumber();
      const result = subtract(num1, num2);
      showResult(result);
      addToHistory('-', num1, num2, result);
      showHistory();
    }

    // 掛け算を実行
    function performMultiply() {
      const num1 = getFirstNumber();
      const num2 = getSecondNumber();
      const result = multiply(num1, num2);
      showResult(result);
      addToHistory('×', num1, num2, result);
      showHistory();
    }

    // 割り算を実行
    function performDivide() {
      const num1 = getFirstNumber();
      const num2 = getSecondNumber();
      const result = divide(num1, num2);
      showResult(result);
      addToHistory('÷', num1, num2, result);
      showHistory();
    }

    // ========================================
    // 6. クリア機能
    // ========================================

    // 電卓をクリア
    function clearCalculator() {
      document.getElementById('num1').value = '';
      document.getElementById('num2').value = '';
      document.getElementById('result').textContent = '結果: ';
    }

    // 履歴をクリア
    function clearHistory() {
      history = [];
      showHistory();
    }
  </script>
</body>
</html>
```

## 実装のポイント

### 1. 単一責任の原則

各関数は**1つの仕事だけ**をします。

```javascript
// ✅ 良い：1つの演算だけ
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// ❌ 悪い：複数の演算を1つの関数に詰め込む
function calculate(a, b, operation) {
  if (operation === 'add') {
    return a + b;
  } else if (operation === 'subtract') {
    return a - b;
  } else if (operation === 'multiply') {
    return a * b;
  } else if (operation === 'divide') {
    return a / b;
  }
  // 長くて読みにくい、テストしにくい
}
```

**単一責任の利点**：
- 各関数が短く、理解しやすい
- バグがあったときに原因を特定しやすい
- 再利用しやすい
- テストしやすい

### 2. 型の一貫性

すべての計算関数は**数値を返します**。

```javascript
// すべて数値を返す
add(1, 2);       // 3（数値）
subtract(5, 3);  // 2（数値）
multiply(2, 4);  // 8（数値）
divide(10, 2);   // 5（数値）
divide(10, 0);   // 0（数値）← エラー時も数値を返す
```

**型の一貫性の利点**：
- 戻り値の型を気にせず使える
- エラーハンドリングが簡単
- 予測可能な動作

### 3. わかりやすい関数名

**動詞で始まる明確な名前**を使います。

```javascript
// 動詞のパターン
getFirstNumber()     // 取得（get）
performAdd()         // 実行（perform）
showResult()         // 表示（show）
addToHistory()       // 追加（add）
clearCalculator()    // クリア（clear）

// 計算関数は動詞そのもの
add()       // 足す
subtract()  // 引く
multiply()  // 掛ける
divide()    // 割る
```

**関数名だけで何をするかわかる**ため、コメント不要です。

### 4. グローバル変数の適切な使用

履歴は**複数の関数で共有する必要がある**ため、グローバル変数を使います。

```javascript
// グローバル変数
let history = [];  // すべての関数から参照できる

// この変数を使う関数
function addToHistory() {
  history.push(record);  // グローバル変数に追加
}

function showHistory() {
  for (let i = 0; i < history.length; i++) {
    // グローバル変数を読み取る
  }
}

function clearHistory() {
  history = [];  // グローバル変数をクリア
}
```

**グローバル変数を使う理由**：
- 履歴データは複数の関数で共有される
- アプリ全体で1つの履歴があれば十分
- ローカル変数では関数間で共有できない

### 5. 関数の組み合わせ

**小さな関数を組み合わせて**大きな処理を作ります。

```javascript
function performAdd() {
  const num1 = getFirstNumber();        // 関数1を呼ぶ
  const num2 = getSecondNumber();       // 関数2を呼ぶ
  const result = add(num1, num2);       // 関数3を呼ぶ
  showResult(result);                   // 関数4を呼ぶ
  addToHistory('+', num1, num2, result); // 関数5を呼ぶ
  showHistory();                        // 関数6を呼ぶ
}
```

**組み合わせの利点**：
- 各ステップが明確
- 処理の流れが読みやすい
- 各関数を個別にテストできる

## 拡張アイデア

基本的な電卓ができたら、以下の機能を追加してみましょう：

### 拡張1：入力検証

数値以外が入力されたときのエラー処理を追加します。

```javascript
// 入力を検証
function validateInputs(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) {
    return false;
  }
  return true;
}

// エラーメッセージを表示
function showError(message) {
  document.getElementById('result').textContent = 'エラー: ' + message;
  document.getElementById('result').style.color = 'red';
}

// 改善版：足し算を実行（検証付き）
function performAdd() {
  const num1 = getFirstNumber();
  const num2 = getSecondNumber();

  // 入力検証
  if (!validateInputs(num1, num2)) {
    showError('数値を入力してください');
    return;  // エラー時は処理を中断
  }

  const result = add(num1, num2);
  showResult(result);
  addToHistory('+', num1, num2, result);
  showHistory();
}
```

### 拡張2：0除算の警告

0で割ろうとしたときに警告を表示します。

```javascript
// 改善版：割り算を実行（0除算チェック付き）
function performDivide() {
  const num1 = getFirstNumber();
  const num2 = getSecondNumber();

  if (!validateInputs(num1, num2)) {
    showError('数値を入力してください');
    return;
  }

  // 0除算チェック
  if (num2 === 0) {
    showError('0で割ることはできません');
    return;
  }

  const result = divide(num1, num2);
  showResult(result);
  addToHistory('÷', num1, num2, result);
  showHistory();
}
```

### 拡張3：履歴の上限

履歴が増えすぎないように上限を設定します。

```javascript
const MAX_HISTORY = 10;  // 履歴の上限

function addToHistory(operation, num1, num2, result) {
  const record = {
    operation: operation,
    num1: num1,
    num2: num2,
    result: result,
    time: new Date().toLocaleTimeString()
  };

  history.push(record);

  // 上限を超えたら古いものを削除
  if (history.length > MAX_HISTORY) {
    history.shift();  // 最初の要素を削除
  }
}
```

### 拡張4：計算結果を次の計算に使う

```javascript
// 結果を数値1にコピー
function useResultAsInput() {
  const resultText = document.getElementById('result').textContent;
  const resultValue = resultText.replace('結果: ', '');
  document.getElementById('num1').value = resultValue;
  document.getElementById('num2').value = '';
}
```

これをHTMLに追加：
```html
<button class="clear-btn" onclick="useResultAsInput()">結果を使う</button>
```

## 学習の振り返り

このプロジェクトを通じて、以下を実践しました：

### 関数の基本（レッスン111-115）

✅ **引数を受け取り、戻り値を返す**
```javascript
function add(a, b) {  // a, b が引数
  return a + b;       // 戻り値
}
```

✅ **関数から関数を呼び出す**
```javascript
function performAdd() {
  const num1 = getFirstNumber();  // 関数を呼び出す
  const result = add(num1, num2);  // 別の関数を呼び出す
}
```

✅ **ローカル変数とグローバル変数を使い分ける**
```javascript
let history = [];  // グローバル（すべての関数で共有）

function performAdd() {
  const result = add(num1, num2);  // ローカル（この関数内だけ）
}
```

### 関数の設計（レッスン116-120）

✅ **単一責任：1つの関数が1つの仕事**
```javascript
function add(a, b) { }       // 足し算だけ
function showResult() { }    // 表示だけ
function addToHistory() { }  // 履歴追加だけ
```

✅ **型の一貫性：同じ型を返す**
```javascript
add(1, 2);       // 数値を返す
subtract(5, 3);  // 数値を返す
divide(10, 0);   // エラー時も数値を返す
```

✅ **わかりやすい名前：動詞で始める**
```javascript
getFirstNumber()   // get〜
performAdd()       // perform〜
showResult()       // show〜
addToHistory()     // add〜
```

### アプリケーション設計

✅ **機能を関数に分割**
```
アプリ全体
├─ 計算機能（add, subtract, multiply, divide）
├─ 入力機能（getFirstNumber, getSecondNumber）
├─ 表示機能（showResult, showHistory）
├─ 履歴機能（addToHistory）
└─ 統括機能（performAdd, performSubtract など）
```

✅ **データの流れを設計**
```
入力 → 取得 → 計算 → 表示
              ↓
            履歴保存 → 履歴表示
```

✅ **グローバル状態の管理**
```javascript
let history = [];  // グローバル状態
// 複数の関数で共有されるデータを管理
```

## まとめ

### 関数型電卓プロジェクトのポイント

1. **各演算を独立した関数として実装**
   - add, subtract, multiply, divide
   - 1つの関数が1つの演算だけを担当

2. **単一責任の原則を守る**
   - 各関数が明確な役割を持つ
   - 短く、理解しやすい

3. **わかりやすい関数名をつける**
   - 動詞で始まる
   - 何をするかが一目瞭然

4. **グローバル変数で履歴を管理**
   - 複数の関数で共有するデータ
   - 適切な場面でグローバル変数を使う

5. **関数を組み合わせてアプリケーションを構築**
   - 小さな関数を組み合わせる
   - 処理の流れが明確

### 学んだ設計パターン

```javascript
// パターン1：計算関数（純粋な計算）
function add(a, b) {
  return a + b;
}

// パターン2：取得関数（データの取得）
function getFirstNumber() {
  return Number(document.getElementById('num1').value);
}

// パターン3：表示関数（画面への出力）
function showResult(result) {
  document.getElementById('result').textContent = '結果: ' + result;
}

// パターン4：統括関数（全体の流れを制御）
function performAdd() {
  const num1 = getFirstNumber();  // 取得
  const num2 = getSecondNumber();  // 取得
  const result = add(num1, num2);  // 計算
  showResult(result);              // 表示
  addToHistory('+', num1, num2, result);  // 記録
  showHistory();                   // 表示
}
```

このパターンは、どんなアプリケーションでも使える基本的な設計です。

## カリキュラム要件チェック

このレッスンで以下の要件を満たしています：

✅ **関数型電卓**
- 四則演算を持つ電卓アプリを実装
- 各機能が関数として構造化されている

✅ **各演算を関数化**
- add, subtract, multiply, divide の4つの独立した関数
- 単一責任の原則に基づいた設計
- 型の一貫性を保った実装

✅ **履歴機能**
- グローバル変数で履歴配列を管理
- 時刻付きで計算履歴を記録
- 新しい順に履歴を表示
- 履歴クリア機能

✅ **知識：関数による構造化、アプリケーション設計**
- 10レッスン分の知識を統合
- 計算・取得・表示・履歴管理の役割分担
- 関数の組み合わせによるアプリ構築
- グローバル変数とローカル変数の使い分け

✅ **成果物：関数型計算機**
- 完全に動作する電卓アプリ
- HTMLファイル1つで完結
- 見やすいUI/UX
- 拡張可能な設計

## 次回予告

これで、**関数の基礎（第10章）**が完了しました！

学んだこと：
- レッスン111-112: 引数と戻り値の基本
- レッスン113: 関数の中身の書き方
- レッスン114: 関数から関数を呼び出す
- レッスン115: return の役割
- レッスン116: ローカル変数とスコープ
- レッスン117: グローバル変数の使い方
- レッスン118: 引数と戻り値の型
- レッスン119: 単一責任の原則
- レッスン120: 良い関数名の付け方
- レッスン121: 関数型電卓プロジェクト

次の章では、**より高度な関数の使い方**を学びます：
- 関数式（function expression）
- アロー関数（arrow function）
- コールバック関数
- 高階関数
- クロージャ

関数は JavaScript の最も重要な機能の1つです。基礎をしっかり理解できたので、次はさらに強力な使い方を学んでいきましょう！
