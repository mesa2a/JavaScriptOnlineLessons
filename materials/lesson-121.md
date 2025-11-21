# レッスン121：週のプロジェクト - 関数型電卓

## 学習目標
- これまで学んだ関数の知識を統合する
- 各演算を関数化して構造化されたプログラムを作る
- 履歴機能を実装してグローバル変数の使い方を理解する

## プロジェクト概要

**関数型電卓**を作成します。これは、以下の機能を持つ計算機アプリです：

1. 四則演算（足し算、引き算、掛け算、割り算）
2. 各演算が独立した関数として実装されている
3. 計算履歴を表示する機能

## これまで学んだ知識の活用

このプロジェクトでは、以下の学習内容を統合します：

| レッスン | 知識 | 活用方法 |
|---------|------|----------|
| 111-112 | 引数と戻り値 | 計算関数に数値を渡し、結果を返す |
| 114 | 関数から関数 | メイン関数から計算関数を呼び出す |
| 116 | ローカル変数 | 関数内で計算結果を保持 |
| 117 | グローバル変数 | 履歴をグローバル配列で管理 |
| 118 | 型の一貫性 | すべての計算関数が数値を返す |
| 119 | 単一責任 | 各関数が1つの演算だけを行う |
| 120 | 名前付け | add, subtract など明確な関数名 |

## 設計：関数の構造

### 1. 計算関数（単一責任）

各演算を独立した関数にします。

```javascript
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
  if (b === 0) {
    return 0;  // 0で割れない場合は0を返す
  }
  return a / b;
}
```

### 2. 入力取得関数

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

### 3. 表示関数

```javascript
// 結果を表示
function showResult(result) {
  document.getElementById('result').textContent = '結果: ' + result;
}
```

### 4. 履歴管理（グローバル変数を使用）

```javascript
// グローバル変数：計算履歴
let history = [];

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

  for (let i = history.length - 1; i >= 0; i--) {
    const record = history[i];
    const item = document.createElement('div');
    item.textContent = record.time + ' - ' +
      record.num1 + ' ' + record.operation + ' ' +
      record.num2 + ' = ' + record.result;
    historyDiv.appendChild(item);
  }
}
```

### 5. メイン計算関数（関数から関数を呼び出す）

```javascript
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
```

## 完成イメージ

```
┌─────────────────────────────┐
│      関数型電卓              │
├─────────────────────────────┤
│ 数値1: [     10     ]       │
│ 数値2: [      5     ]       │
├─────────────────────────────┤
│ [+] [-] [×] [÷] [クリア]   │
├─────────────────────────────┤
│ 結果: 15                     │
├─────────────────────────────┤
│ 履歴:                        │
│ 14:30:25 - 10 + 5 = 15      │
│ 14:30:20 - 8 × 2 = 16       │
│ 14:30:15 - 20 - 5 = 15      │
└─────────────────────────────┘
```

## 実装のポイント

### 1. 単一責任の原則

各関数は1つの仕事だけをします。

```javascript
// 良い：1つの演算だけ
function add(a, b) {
  return a + b;
}

// 悪い：複数の演算
function calculate(a, b, operation) {
  if (operation === 'add') {
    return a + b;
  } else if (operation === 'subtract') {
    return a - b;
  }
  // ...
}
```

### 2. 型の一貫性

すべての計算関数は数値を返します。

```javascript
// すべて数値を返す
add(1, 2);       // 3
subtract(5, 3);  // 2
multiply(2, 4);  // 8
divide(10, 2);   // 5
divide(10, 0);   // 0（エラー時も数値）
```

### 3. わかりやすい関数名

動詞で始まる明確な名前を使います。

```javascript
getFirstNumber()    // 取得
performAdd()        // 実行
showResult()        // 表示
addToHistory()      // 追加
```

### 4. グローバル変数の適切な使用

履歴は複数の関数で共有する必要があるため、グローバル変数を使います。

```javascript
let history = [];  // すべての関数から参照できる
```

## 拡張アイデア

基本的な電卓ができたら、以下の機能を追加してみましょう：

### 1. クリア機能

```javascript
function clearCalculator() {
  document.getElementById('num1').value = '';
  document.getElementById('num2').value = '';
  document.getElementById('result').textContent = '結果: ';
}

function clearHistory() {
  history = [];
  showHistory();
}
```

### 2. 入力検証

```javascript
function validateInputs(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) {
    return false;
  }
  return true;
}
```

### 3. エラー表示

```javascript
function showError(message) {
  document.getElementById('result').textContent = 'エラー: ' + message;
}
```

## 学習の振り返り

このプロジェクトを通じて、以下を実践しました：

### 関数の基本
- ✅ 引数を受け取り、戻り値を返す
- ✅ 関数から関数を呼び出す
- ✅ ローカル変数とグローバル変数を使い分ける

### 関数の設計
- ✅ 単一責任：1つの関数が1つの仕事
- ✅ 型の一貫性：同じ型を返す
- ✅ わかりやすい名前：動詞で始める

### アプリケーション設計
- ✅ 機能を関数に分割
- ✅ データの流れを設計
- ✅ グローバル状態の管理

## まとめ

関数型電卓プロジェクトでは：

1. **各演算を独立した関数**として実装
2. **単一責任の原則**を守る
3. **わかりやすい関数名**をつける
4. **グローバル変数で履歴を管理**
5. **関数を組み合わせて**アプリケーションを構築

これで、関数の基礎（第10章）が完了しました。次章では、関数式やアロー関数など、より高度な関数の使い方を学びます。
