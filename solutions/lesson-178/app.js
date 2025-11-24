/**
 * レッスン178: 計算機アプリケーション
 * 完全な実装
 */

var calculator = {
  state: {
    currentOperand: '0',
    previousOperand: '',
    operation: null,
    waitingForOperand: false,
    history: []
  },

  init: function() {
    this.setupEventListeners();
    this.loadHistory();
    this.updateDisplay();
  },

  inputDigit: function(digit) {
    var state = this.state;

    if (state.waitingForOperand) {
      state.currentOperand = String(digit);
      state.waitingForOperand = false;
    } else {
      if (state.currentOperand === '0') {
        state.currentOperand = String(digit);
      } else {
        state.currentOperand += String(digit);
      }
    }

    this.updateDisplay();
  },

  inputDecimal: function() {
    var state = this.state;

    if (state.waitingForOperand) {
      state.currentOperand = '0.';
      state.waitingForOperand = false;
    } else {
      if (state.currentOperand.indexOf('.') === -1) {
        state.currentOperand += '.';
      }
    }

    this.updateDisplay();
  },

  performOperation: function(nextOperation) {
    var state = this.state;
    var inputValue = parseFloat(state.currentOperand);

    if (state.previousOperand === '') {
      state.previousOperand = state.currentOperand;
    } else if (state.operation) {
      var currentValue = parseFloat(state.previousOperand);
      var newValue = this.calculate(currentValue, inputValue, state.operation);

      this.addToHistory(
        this.formatNumber(state.previousOperand) + ' ' + state.operation + ' ' +
        this.formatNumber(state.currentOperand) + ' = ' + this.formatNumber(String(newValue))
      );

      state.currentOperand = String(newValue);
      state.previousOperand = String(newValue);
    }

    state.waitingForOperand = true;
    state.operation = nextOperation;

    this.updateDisplay();
  },

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
  },

  performEquals: function() {
    var state = this.state;
    var inputValue = parseFloat(state.currentOperand);

    if (state.operation && state.previousOperand !== '') {
      var newValue = this.calculate(
        parseFloat(state.previousOperand),
        inputValue,
        state.operation
      );

      this.addToHistory(
        this.formatNumber(state.previousOperand) + ' ' + state.operation + ' ' +
        this.formatNumber(state.currentOperand) + ' = ' + this.formatNumber(String(newValue))
      );

      state.currentOperand = String(newValue);
      state.previousOperand = '';
      state.operation = null;
    }

    state.waitingForOperand = true;
    this.updateDisplay();
  },

  clearAll: function() {
    this.state.currentOperand = '0';
    this.state.previousOperand = '';
    this.state.operation = null;
    this.state.waitingForOperand = false;
    this.updateDisplay();
  },

  clearCurrent: function() {
    this.state.currentOperand = '0';
    this.updateDisplay();
  },

  backspace: function() {
    var state = this.state;

    if (state.currentOperand.length > 1) {
      state.currentOperand = state.currentOperand.slice(0, -1);
    } else {
      state.currentOperand = '0';
    }

    this.updateDisplay();
  },

  toggleSign: function() {
    var value = parseFloat(this.state.currentOperand);
    this.state.currentOperand = String(-value);
    this.updateDisplay();
  },

  percentage: function() {
    var value = parseFloat(this.state.currentOperand);
    this.state.currentOperand = String(value / 100);
    this.updateDisplay();
  },

  updateDisplay: function() {
    var state = this.state;

    document.getElementById('current-operand').textContent =
      this.formatNumber(state.currentOperand);

    if (state.operation) {
      document.getElementById('previous-operand').textContent =
        this.formatNumber(state.previousOperand) + ' ' + state.operation;
    } else {
      document.getElementById('previous-operand').textContent = '';
    }
  },

  formatNumber: function(num) {
    if (num === 'エラー') {
      return num;
    }

    var parts = String(num).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return parts.join('.');
  },

  addToHistory: function(entry) {
    this.state.history.unshift(entry);

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
  },

  setupKeyboardEvents: function() {
    var self = this;

    document.addEventListener('keydown', function(e) {
      if (e.key >= '0' && e.key <= '9') {
        self.inputDigit(parseInt(e.key));
      }

      if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        var operation = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key;
        self.performOperation(operation);
      }

      if (e.key === '.') {
        self.inputDecimal();
      }

      if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        self.performEquals();
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        self.backspace();
      }

      if (e.key === 'Escape') {
        self.clearAll();
      }

      if (e.key === '%') {
        self.percentage();
      }
    });
  },

  setupEventListeners: function() {
    var self = this;

    var numberButtons = document.querySelectorAll('.btn-number');
    for (var i = 0; i < numberButtons.length; i++) {
      numberButtons[i].addEventListener('click', function() {
        var digit = this.getAttribute('data-value');
        self.inputDigit(digit);
      });
    }

    var operatorButtons = document.querySelectorAll('.btn-operator');
    for (var i = 0; i < operatorButtons.length; i++) {
      operatorButtons[i].addEventListener('click', function() {
        var operation = this.getAttribute('data-operation');
        self.performOperation(operation);
      });
    }

    document.getElementById('btn-decimal').addEventListener('click', function() {
      self.inputDecimal();
    });

    document.getElementById('btn-equals').addEventListener('click', function() {
      self.performEquals();
    });

    document.getElementById('btn-ac').addEventListener('click', function() {
      self.clearAll();
    });

    document.getElementById('btn-c').addEventListener('click', function() {
      self.clearCurrent();
    });

    document.getElementById('btn-backspace').addEventListener('click', function() {
      self.backspace();
    });

    document.getElementById('btn-toggle-sign').addEventListener('click', function() {
      self.toggleSign();
    });

    document.getElementById('btn-percentage').addEventListener('click', function() {
      self.percentage();
    });

    document.getElementById('btn-clear-history').addEventListener('click', function() {
      self.clearHistory();
    });

    this.setupKeyboardEvents();
  }
};

document.addEventListener('DOMContentLoaded', function() {
  calculator.init();
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = calculator;
}
