/**
 * レッスン178: 計算機アプリケーションのテスト
 */

import { describe, it, expect, beforeEach } from 'vitest';

describe('レッスン178: 計算機アプリケーション', () => {

  function createCalculator() {
    return {
      state: {
        currentOperand: '0',
        previousOperand: '',
        operation: null,
        waitingForOperand: false,
        history: []
      },

      inputDigit: function(digit) {
        if (this.state.waitingForOperand) {
          this.state.currentOperand = String(digit);
          this.state.waitingForOperand = false;
        } else {
          if (this.state.currentOperand === '0') {
            this.state.currentOperand = String(digit);
          } else {
            this.state.currentOperand += String(digit);
          }
        }
      },

      inputDecimal: function() {
        if (this.state.waitingForOperand) {
          this.state.currentOperand = '0.';
          this.state.waitingForOperand = false;
        } else {
          if (this.state.currentOperand.indexOf('.') === -1) {
            this.state.currentOperand += '.';
          }
        }
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

      clearAll: function() {
        this.state.currentOperand = '0';
        this.state.previousOperand = '';
        this.state.operation = null;
        this.state.waitingForOperand = false;
      },

      clearCurrent: function() {
        this.state.currentOperand = '0';
      },

      backspace: function() {
        if (this.state.currentOperand.length > 1) {
          this.state.currentOperand = this.state.currentOperand.slice(0, -1);
        } else {
          this.state.currentOperand = '0';
        }
      },

      toggleSign: function() {
        const value = parseFloat(this.state.currentOperand);
        this.state.currentOperand = String(-value);
      },

      percentage: function() {
        const value = parseFloat(this.state.currentOperand);
        this.state.currentOperand = String(value / 100);
      },

      formatNumber: function(num) {
        if (num === 'エラー') {
          return num;
        }

        const parts = String(num).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
      },

      addToHistory: function(entry) {
        this.state.history.unshift(entry);
        if (this.state.history.length > 10) {
          this.state.history.pop();
        }
      }
    };
  }

  describe('数字入力', () => {
    let calc;
    beforeEach(() => {
      calc = createCalculator();
    });

    it('初期状態は0', () => {
      expect(calc.state.currentOperand).toBe('0');
    });

    it('数字を入力できる', () => {
      calc.inputDigit(5);
      expect(calc.state.currentOperand).toBe('5');
    });

    it('複数の数字を連続入力できる', () => {
      calc.inputDigit(1);
      calc.inputDigit(2);
      calc.inputDigit(3);
      expect(calc.state.currentOperand).toBe('123');
    });

    it('0の後に数字を入力すると上書きされる', () => {
      calc.inputDigit(5);
      expect(calc.state.currentOperand).toBe('5');
    });

    it('waitingForOperandがtrueなら新しい数値を開始', () => {
      calc.state.currentOperand = '100';
      calc.state.waitingForOperand = true;
      calc.inputDigit(5);
      expect(calc.state.currentOperand).toBe('5');
      expect(calc.state.waitingForOperand).toBe(false);
    });
  });

  describe('小数点入力', () => {
    let calc;
    beforeEach(() => {
      calc = createCalculator();
    });

    it('小数点を入力できる', () => {
      calc.inputDigit(1);
      calc.inputDecimal();
      expect(calc.state.currentOperand).toBe('1.');
    });

    it('小数点の重複入力は無視される', () => {
      calc.inputDigit(1);
      calc.inputDecimal();
      calc.inputDecimal();
      expect(calc.state.currentOperand).toBe('1.');
    });

    it('waitingForOperandがtrueなら0.から始まる', () => {
      calc.state.waitingForOperand = true;
      calc.inputDecimal();
      expect(calc.state.currentOperand).toBe('0.');
      expect(calc.state.waitingForOperand).toBe(false);
    });

    it('小数点の後に数字を入力できる', () => {
      calc.inputDigit(1);
      calc.inputDecimal();
      calc.inputDigit(5);
      expect(calc.state.currentOperand).toBe('1.5');
    });
  });

  describe('四則演算', () => {
    let calc;
    beforeEach(() => {
      calc = createCalculator();
    });

    it('加算が正しく計算される', () => {
      const result = calc.calculate(10, 5, '+');
      expect(result).toBe(15);
    });

    it('減算が正しく計算される', () => {
      const result = calc.calculate(10, 5, '-');
      expect(result).toBe(5);
    });

    it('乗算が正しく計算される', () => {
      const result = calc.calculate(10, 5, '×');
      expect(result).toBe(50);
    });

    it('除算が正しく計算される', () => {
      const result = calc.calculate(10, 5, '÷');
      expect(result).toBe(2);
    });

    it('0での除算はエラーを返す', () => {
      const result = calc.calculate(10, 0, '÷');
      expect(result).toBe('エラー');
    });

    it('小数点の計算ができる', () => {
      const result = calc.calculate(1.5, 2.5, '+');
      expect(result).toBe(4);
    });

    it('小数点の乗算', () => {
      const result = calc.calculate(1.5, 2, '×');
      expect(result).toBe(3);
    });
  });

  describe('クリア機能', () => {
    let calc;
    beforeEach(() => {
      calc = createCalculator();
    });

    it('ACですべてクリアされる', () => {
      calc.state.currentOperand = '123';
      calc.state.previousOperand = '456';
      calc.state.operation = '+';
      calc.clearAll();
      expect(calc.state.currentOperand).toBe('0');
      expect(calc.state.previousOperand).toBe('');
      expect(calc.state.operation).toBe(null);
    });

    it('Cで現在の数値のみクリアされる', () => {
      calc.state.currentOperand = '123';
      calc.state.previousOperand = '456';
      calc.state.operation = '+';
      calc.clearCurrent();
      expect(calc.state.currentOperand).toBe('0');
      expect(calc.state.previousOperand).toBe('456');
      expect(calc.state.operation).toBe('+');
    });
  });

  describe('バックスペース', () => {
    let calc;
    beforeEach(() => {
      calc = createCalculator();
    });

    it('最後の1文字を削除できる', () => {
      calc.state.currentOperand = '123';
      calc.backspace();
      expect(calc.state.currentOperand).toBe('12');
    });

    it('1文字のときは0になる', () => {
      calc.state.currentOperand = '5';
      calc.backspace();
      expect(calc.state.currentOperand).toBe('0');
    });

    it('連続して削除できる', () => {
      calc.state.currentOperand = '12345';
      calc.backspace();
      calc.backspace();
      calc.backspace();
      expect(calc.state.currentOperand).toBe('12');
    });
  });

  describe('符号反転', () => {
    let calc;
    beforeEach(() => {
      calc = createCalculator();
    });

    it('正の数を負に反転', () => {
      calc.state.currentOperand = '123';
      calc.toggleSign();
      expect(calc.state.currentOperand).toBe('-123');
    });

    it('負の数を正に反転', () => {
      calc.state.currentOperand = '-123';
      calc.toggleSign();
      expect(calc.state.currentOperand).toBe('123');
    });

    it('0の符号反転', () => {
      calc.state.currentOperand = '0';
      calc.toggleSign();
      expect(calc.state.currentOperand).toBe('0');
    });

    it('小数点の符号反転', () => {
      calc.state.currentOperand = '1.5';
      calc.toggleSign();
      expect(calc.state.currentOperand).toBe('-1.5');
    });
  });

  describe('パーセント計算', () => {
    let calc;
    beforeEach(() => {
      calc = createCalculator();
    });

    it('パーセント計算が正しい', () => {
      calc.state.currentOperand = '200';
      calc.percentage();
      expect(calc.state.currentOperand).toBe('2');
    });

    it('小数のパーセント', () => {
      calc.state.currentOperand = '50';
      calc.percentage();
      expect(calc.state.currentOperand).toBe('0.5');
    });

    it('1のパーセント', () => {
      calc.state.currentOperand = '1';
      calc.percentage();
      expect(calc.state.currentOperand).toBe('0.01');
    });
  });

  describe('数値フォーマット', () => {
    let calc;
    beforeEach(() => {
      calc = createCalculator();
    });

    it('3桁ごとにカンマが挿入される', () => {
      const formatted = calc.formatNumber('1000');
      expect(formatted).toBe('1,000');
    });

    it('大きな数値のカンマ区切り', () => {
      const formatted = calc.formatNumber('1234567');
      expect(formatted).toBe('1,234,567');
    });

    it('小数点はそのまま', () => {
      const formatted = calc.formatNumber('1234.56');
      expect(formatted).toBe('1,234.56');
    });

    it('エラー文字列はそのまま', () => {
      const formatted = calc.formatNumber('エラー');
      expect(formatted).toBe('エラー');
    });

    it('小さな数値にはカンマがつかない', () => {
      const formatted = calc.formatNumber('999');
      expect(formatted).toBe('999');
    });
  });

  describe('計算履歴', () => {
    let calc;
    beforeEach(() => {
      calc = createCalculator();
    });

    it('履歴に追加できる', () => {
      calc.addToHistory('1 + 2 = 3');
      expect(calc.state.history.length).toBe(1);
      expect(calc.state.history[0]).toBe('1 + 2 = 3');
    });

    it('履歴は先頭に追加される', () => {
      calc.addToHistory('1 + 2 = 3');
      calc.addToHistory('4 + 5 = 9');
      expect(calc.state.history[0]).toBe('4 + 5 = 9');
      expect(calc.state.history[1]).toBe('1 + 2 = 3');
    });

    it('履歴は10件まで', () => {
      for (let i = 1; i <= 15; i++) {
        calc.addToHistory(i + ' + ' + i + ' = ' + (i * 2));
      }
      expect(calc.state.history.length).toBe(10);
    });

    it('11件目を追加すると最古が削除される', () => {
      for (let i = 1; i <= 11; i++) {
        calc.addToHistory('計算' + i);
      }
      expect(calc.state.history.length).toBe(10);
      expect(calc.state.history[0]).toBe('計算11');
      expect(calc.state.history.indexOf('計算1')).toBe(-1);
    });
  });

  describe('状態管理', () => {
    it('初期状態が正しい', () => {
      const calc = createCalculator();
      expect(calc.state.currentOperand).toBe('0');
      expect(calc.state.previousOperand).toBe('');
      expect(calc.state.operation).toBe(null);
      expect(calc.state.waitingForOperand).toBe(false);
      expect(calc.state.history.length).toBe(0);
    });
  });
});
