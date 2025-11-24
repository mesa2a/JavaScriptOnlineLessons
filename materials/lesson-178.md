# レッスン178: 計算機アプリケーション

## このレッスンで学ぶこと
- 計算機の実装パターン
- 数式の評価と計算
- 状態管理（現在の数値、演算子、前の数値）
- 小数点の扱い
- エラーハンドリング
- キーボードイベント対応
- 計算履歴の管理

## 計算機アプリの仕様

### 基本機能
1. **数字入力**: 0-9の数字を入力できる
2. **四則演算**: +, -, ×, ÷ の演算ができる
3. **小数点**: 小数点を含む計算ができる
4. **クリア機能**: AC（All Clear）とC（Clear）
5. **バックスペース**: 最後の1文字を削除
6. **イコール**: 計算結果を表示
7. **符号反転**: +/- で正負を反転
8. **パーセント**: % で百分率計算

### 追加機能
1. **キーボード対応**: 数字キー、演算子キー、Enterキーなど
2. **計算履歴**: 過去の計算を表示
3. **連続計算**: 計算結果を使って次の計算ができる
4. **エラーハンドリング**: 0での除算などのエラー処理

## アプリの構造

### HTML構造
```html
<div class="calculator">
  <!-- ディスプレイ -->
  <div class="display">
    <div class="previous-operand">123 +</div>
    <div class="current-operand">456</div>
  </div>

  <!-- ボタン -->
  <div class="buttons">
    <!-- 行1: AC, C, %, ÷ -->
    <!-- 行2: 7, 8, 9, × -->
    <!-- 行3: 4, 5, 6, - -->
    <!-- 行4: 1, 2, 3, + -->
    <!-- 行5: +/-, 0, ., = -->
  </div>

  <!-- 計算履歴 -->
  <div class="history">
    <h3>計算履歴</h3>
    <div class="history-list">
      <!-- 履歴がここに表示される -->
    </div>
  </div>
</div>
```

### CSS設計
```css
.calculator {
  max-width: 400px;
  background: #2d2d2d;
  border-radius: 20px;
  padding: 20px;
}

.display {
  background: #1a1a1a;
  border-radius: 10px;
  padding: 20px;
  text-align: right;
  margin-bottom: 20px;
}

.previous-operand {
  color: #888;
  font-size: 20px;
  min-height: 30px;
}

.current-operand {
  color: white;
  font-size: 48px;
  font-weight: bold;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.btn {
  padding: 20px;
  font-size: 24px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  opacity: 0.8;
  transform: scale(1.05);
}

.btn-number {
  background: #505050;
  color: white;
}

.btn-operator {
  background: #ff9500;
  color: white;
}

.btn-function {
  background: #a5a5a5;
  color: black;
}

.btn-equals {
  background: #ff9500;
  color: white;
  grid-column: span 2;
}
```

## JavaScript実装

### 1. 状態管理

計算機の状態を管理するオブジェクトを作成します。

```javascript
var calculator = {
  state: {
    currentOperand: '0',      // 現在表示中の数値
    previousOperand: '',      // 前の数値
    operation: null,          // 選択された演算子
    waitingForOperand: false, // 次の入力待ちフラグ
    history: []               // 計算履歴
  },

  init: function() {
    this.setupEventListeners();
    this.loadHistory();
    this.updateDisplay();
  }
};
```

### 2. 数字入力の処理

```javascript
inputDigit: function(digit) {
  var state = this.state;

  if (state.waitingForOperand) {
    // 新しい数値の入力を開始
    state.currentOperand = String(digit);
    state.waitingForOperand = false;
  } else {
    // 現在の数値に数字を追加
    if (state.currentOperand === '0') {
      state.currentOperand = String(digit);
    } else {
      state.currentOperand += String(digit);
    }
  }

  this.updateDisplay();
}
```

### 3. 小数点の処理

```javascript
inputDecimal: function() {
  var state = this.state;

  if (state.waitingForOperand) {
    state.currentOperand = '0.';
    state.waitingForOperand = false;
  } else {
    // すでに小数点が含まれていないかチェック
    if (state.currentOperand.indexOf('.') === -1) {
      state.currentOperand += '.';
    }
  }

  this.updateDisplay();
}
```

### 4. 演算子の処理

```javascript
performOperation: function(nextOperation) {
  var state = this.state;
  var inputValue = parseFloat(state.currentOperand);

  if (state.previousOperand === '') {
    // 最初の演算子入力
    state.previousOperand = state.currentOperand;
  } else if (state.operation) {
    // 前の演算を実行
    var currentValue = state.previousOperand || 0;
    var newValue = this.calculate(
      parseFloat(currentValue),
      inputValue,
      state.operation
    );

    // 計算履歴に追加
    this.addToHistory(
      currentValue + ' ' + state.operation + ' ' + inputValue + ' = ' + newValue
    );

    state.currentOperand = String(newValue);
    state.previousOperand = String(newValue);
  }

  state.waitingForOperand = true;
  state.operation = nextOperation;

  this.updateDisplay();
}
```

### 5. 計算ロジック

```javascript
calculate: function(firstOperand, secondOperand, operation) {
  switch (operation) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '×':
      return firstOperand * secondOperand;
    case '÷':
      if (secondOperand === 0) {
        return 'エラー';
      }
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
}
```

### 6. イコールの処理

```javascript
performEquals: function() {
  var state = this.state;
  var inputValue = parseFloat(state.currentOperand);

  if (state.operation && state.previousOperand !== '') {
    var newValue = this.calculate(
      parseFloat(state.previousOperand),
      inputValue,
      state.operation
    );

    // 計算履歴に追加
    this.addToHistory(
      state.previousOperand + ' ' + state.operation + ' ' + inputValue + ' = ' + newValue
    );

    state.currentOperand = String(newValue);
    state.previousOperand = '';
    state.operation = null;
  }

  state.waitingForOperand = true;
  this.updateDisplay();
}
```

### 7. クリア機能

```javascript
// AC（All Clear）: すべてクリア
clearAll: function() {
  this.state.currentOperand = '0';
  this.state.previousOperand = '';
  this.state.operation = null;
  this.state.waitingForOperand = false;
  this.updateDisplay();
},

// C（Clear）: 現在の数値のみクリア
clearCurrent: function() {
  this.state.currentOperand = '0';
  this.updateDisplay();
}
```

### 8. バックスペース機能

```javascript
backspace: function() {
  var state = this.state;

  if (state.currentOperand.length > 1) {
    state.currentOperand = state.currentOperand.slice(0, -1);
  } else {
    state.currentOperand = '0';
  }

  this.updateDisplay();
}
```

### 9. 符号反転

```javascript
toggleSign: function() {
  var value = parseFloat(this.state.currentOperand);
  this.state.currentOperand = String(-value);
  this.updateDisplay();
}
```

### 10. パーセント計算

```javascript
percentage: function() {
  var value = parseFloat(this.state.currentOperand);
  this.state.currentOperand = String(value / 100);
  this.updateDisplay();
}
```

### 11. ディスプレイの更新

```javascript
updateDisplay: function() {
  var state = this.state;

  // 現在の数値を表示
  document.getElementById('current-operand').textContent =
    this.formatNumber(state.currentOperand);

  // 前の数値と演算子を表示
  if (state.operation) {
    document.getElementById('previous-operand').textContent =
      this.formatNumber(state.previousOperand) + ' ' + state.operation;
  } else {
    document.getElementById('previous-operand').textContent = '';
  }
}
```

### 12. 数値のフォーマット

```javascript
formatNumber: function(num) {
  if (num === 'エラー') {
    return num;
  }

  var parts = String(num).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
}
```

### 13. キーボードイベント対応

```javascript
setupKeyboardEvents: function() {
  var self = this;

  document.addEventListener('keydown', function(e) {
    // 数字キー
    if (e.key >= '0' && e.key <= '9') {
      self.inputDigit(parseInt(e.key));
    }

    // 演算子キー
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
      var operation = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key;
      self.performOperation(operation);
    }

    // 小数点
    if (e.key === '.') {
      self.inputDecimal();
    }

    // Enter または =
    if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      self.performEquals();
    }

    // Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      self.backspace();
    }

    // Escape
    if (e.key === 'Escape') {
      self.clearAll();
    }
  });
}
```

### 14. 計算履歴の管理

```javascript
addToHistory: function(entry) {
  this.state.history.unshift(entry);

  // 履歴は最大10件まで
  if (this.state.history.length > 10) {
    this.state.history.pop();
  }

  this.saveHistory();
  this.displayHistory();
},

displayHistory: function() {
  var historyList = document.getElementById('history-list');

  if (this.state.history.length === 0) {
    historyList.innerHTML = '<p class="empty">履歴がありません</p>';
    return;
  }

  historyList.innerHTML = '';

  for (var i = 0; i < this.state.history.length; i++) {
    var item = document.createElement('div');
    item.className = 'history-item';
    item.textContent = this.state.history[i];
    historyList.appendChild(item);
  }
},

clearHistory: function() {
  this.state.history = [];
  this.saveHistory();
  this.displayHistory();
},

saveHistory: function() {
  localStorage.setItem('calculatorHistory', JSON.stringify(this.state.history));
},

loadHistory: function() {
  var saved = localStorage.getItem('calculatorHistory');
  if (saved) {
    try {
      this.state.history = JSON.parse(saved);
      this.displayHistory();
    } catch (e) {
      this.state.history = [];
    }
  }
}
```

### 15. イベントリスナーの設定

```javascript
setupEventListeners: function() {
  var self = this;

  // 数字ボタン
  var numberButtons = document.querySelectorAll('.btn-number');
  for (var i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function() {
      var digit = this.getAttribute('data-value');
      self.inputDigit(digit);
    });
  }

  // 演算子ボタン
  var operatorButtons = document.querySelectorAll('.btn-operator');
  for (var i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', function() {
      var operation = this.getAttribute('data-operation');
      self.performOperation(operation);
    });
  }

  // 小数点ボタン
  document.getElementById('btn-decimal').addEventListener('click', function() {
    self.inputDecimal();
  });

  // イコールボタン
  document.getElementById('btn-equals').addEventListener('click', function() {
    self.performEquals();
  });

  // ACボタン
  document.getElementById('btn-ac').addEventListener('click', function() {
    self.clearAll();
  });

  // Cボタン
  document.getElementById('btn-c').addEventListener('click', function() {
    self.clearCurrent();
  });

  // バックスペースボタン
  document.getElementById('btn-backspace').addEventListener('click', function() {
    self.backspace();
  });

  // 符号反転ボタン
  document.getElementById('btn-toggle-sign').addEventListener('click', function() {
    self.toggleSign();
  });

  // パーセントボタン
  document.getElementById('btn-percentage').addEventListener('click', function() {
    self.percentage();
  });

  // 履歴クリアボタン
  document.getElementById('btn-clear-history').addEventListener('click', function() {
    self.clearHistory();
  });

  // キーボードイベント
  this.setupKeyboardEvents();
}
```

## 実装のポイント

### 1. 状態管理の重要性
計算機は複雑な状態を持つアプリケーションです。現在の数値、前の数値、選択された演算子、入力待ちフラグなど、複数の状態を適切に管理する必要があります。

### 2. エッジケースの処理
- 0での除算
- 小数点の重複入力防止
- 最初の入力が0の場合
- 連続して演算子を押した場合

### 3. ユーザビリティの向上
- キーボード対応により、マウスなしでも操作可能
- 数値のカンマ区切り表示で見やすく
- 計算履歴で過去の計算を確認可能

### 4. localStorage活用
計算履歴をlocalStorageに保存することで、ページをリロードしても履歴が残ります。

## 動作確認

### テストケース
1. 基本的な計算: 123 + 456 = 579
2. 小数点計算: 1.5 × 2.5 = 3.75
3. 連続計算: 10 + 5 = 15、そのまま × 2 = 30
4. 0での除算: 10 ÷ 0 = エラー
5. 符号反転: 123 → -123
6. パーセント: 200 → % → 2
7. バックスペース: 123 → Backspace → 12

## まとめ

このレッスンでは、本格的な計算機アプリケーションを実装しました。

### 学んだこと
- 複雑な状態管理パターン
- 数値の入力と演算の処理フロー
- エッジケースへの対応
- キーボードイベントの活用
- 計算履歴の管理とlocalStorage活用
- ユーザビリティを考慮したUI設計

### 次のステップ
- 科学計算機能の追加（平方根、べき乗など）
- メモリ機能（M+, M-, MR, MC）
- 計算式の編集機能
- テーマの切り替え（ダークモード/ライトモード）

この計算機アプリは、実用的なアプリケーション開発の良い練習になります。状態管理、イベント処理、エラーハンドリングなど、重要な概念を実践的に学ぶことができました。
