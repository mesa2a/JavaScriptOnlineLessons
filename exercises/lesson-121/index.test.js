/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lesson 121: 週のプロジェクト - 関数型電卓', () => {
  let html;
  let scriptContent;

  beforeAll(() => {
    html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    scriptContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
  });

  beforeEach(() => {
    document.documentElement.innerHTML = html;
    global.history = undefined;
    eval(scriptContent);
  });

  describe('グローバル変数', () => {
    test('historyがグローバル変数として定義されている', () => {
      expect(Array.isArray(history)).toBe(true);
    });

    test('historyの初期値が空配列', () => {
      expect(history.length).toBe(0);
    });
  });

  describe('計算関数', () => {
    test('add関数が定義されている', () => {
      expect(typeof add).toBe('function');
    });

    test('add関数が正しく足し算する', () => {
      expect(add(5, 3)).toBe(8);
      expect(add(10, 20)).toBe(30);
    });

    test('subtract関数が定義されている', () => {
      expect(typeof subtract).toBe('function');
    });

    test('subtract関数が正しく引き算する', () => {
      expect(subtract(10, 3)).toBe(7);
      expect(subtract(20, 5)).toBe(15);
    });

    test('multiply関数が定義されている', () => {
      expect(typeof multiply).toBe('function');
    });

    test('multiply関数が正しく掛け算する', () => {
      expect(multiply(5, 3)).toBe(15);
      expect(multiply(10, 2)).toBe(20);
    });

    test('divide関数が定義されている', () => {
      expect(typeof divide).toBe('function');
    });

    test('divide関数が正しく割り算する', () => {
      expect(divide(10, 2)).toBe(5);
      expect(divide(20, 4)).toBe(5);
    });

    test('divide関数が0で割る場合に0を返す', () => {
      expect(divide(10, 0)).toBe(0);
    });
  });

  describe('入力取得関数', () => {
    test('getFirstNumber関数が定義されている', () => {
      expect(typeof getFirstNumber).toBe('function');
    });

    test('getFirstNumberが数値を取得できる', () => {
      document.getElementById('num1').value = '15';
      expect(getFirstNumber()).toBe(15);
    });

    test('getSecondNumber関数が定義されている', () => {
      expect(typeof getSecondNumber).toBe('function');
    });

    test('getSecondNumberが数値を取得できる', () => {
      document.getElementById('num2').value = '7';
      expect(getSecondNumber()).toBe(7);
    });
  });

  describe('表示関数', () => {
    test('showResult関数が定義されている', () => {
      expect(typeof showResult).toBe('function');
    });

    test('showResultが結果を表示できる', () => {
      showResult(42);
      const resultText = document.getElementById('result').textContent;
      expect(resultText).toContain('42');
    });
  });

  describe('履歴管理関数', () => {
    test('addToHistory関数が定義されている', () => {
      expect(typeof addToHistory).toBe('function');
    });

    test('addToHistoryが履歴に追加できる', () => {
      addToHistory('+', 10, 5, 15);
      expect(history.length).toBe(1);
      expect(history[0]).toHaveProperty('operation', '+');
      expect(history[0]).toHaveProperty('num1', 10);
      expect(history[0]).toHaveProperty('num2', 5);
      expect(history[0]).toHaveProperty('result', 15);
      expect(history[0]).toHaveProperty('time');
    });

    test('showHistory関数が定義されている', () => {
      expect(typeof showHistory).toBe('function');
    });

    test('showHistoryが空の履歴を表示できる', () => {
      showHistory();
      const historyDiv = document.getElementById('history');
      expect(historyDiv.textContent).toContain('まだ計算履歴がありません');
    });

    test('showHistoryが履歴を表示できる', () => {
      addToHistory('+', 10, 5, 15);
      showHistory();
      const historyDiv = document.getElementById('history');
      expect(historyDiv.textContent).toContain('10');
      expect(historyDiv.textContent).toContain('5');
      expect(historyDiv.textContent).toContain('15');
    });
  });

  describe('メイン計算関数', () => {
    test('performAdd関数が定義されている', () => {
      expect(typeof performAdd).toBe('function');
    });

    test('performAddが足し算を実行できる', () => {
      document.getElementById('num1').value = '10';
      document.getElementById('num2').value = '5';
      performAdd();
      const resultText = document.getElementById('result').textContent;
      expect(resultText).toContain('15');
      expect(history.length).toBe(1);
    });

    test('performSubtract関数が定義されている', () => {
      expect(typeof performSubtract).toBe('function');
    });

    test('performSubtractが引き算を実行できる', () => {
      document.getElementById('num1').value = '10';
      document.getElementById('num2').value = '3';
      performSubtract();
      const resultText = document.getElementById('result').textContent;
      expect(resultText).toContain('7');
    });

    test('performMultiply関数が定義されている', () => {
      expect(typeof performMultiply).toBe('function');
    });

    test('performMultiplyが掛け算を実行できる', () => {
      document.getElementById('num1').value = '5';
      document.getElementById('num2').value = '4';
      performMultiply();
      const resultText = document.getElementById('result').textContent;
      expect(resultText).toContain('20');
    });

    test('performDivide関数が定義されている', () => {
      expect(typeof performDivide).toBe('function');
    });

    test('performDivideが割り算を実行できる', () => {
      document.getElementById('num1').value = '20';
      document.getElementById('num2').value = '4';
      performDivide();
      const resultText = document.getElementById('result').textContent;
      expect(resultText).toContain('5');
    });
  });

  describe('ユーティリティ関数', () => {
    test('clearCalculator関数が定義されている', () => {
      expect(typeof clearCalculator).toBe('function');
    });

    test('clearCalculatorが入力と結果をクリアできる', () => {
      document.getElementById('num1').value = '10';
      document.getElementById('num2').value = '5';
      document.getElementById('result').textContent = '結果: 15';

      clearCalculator();

      expect(document.getElementById('num1').value).toBe('');
      expect(document.getElementById('num2').value).toBe('');
      expect(document.getElementById('result').textContent).toBe('結果: ');
    });

    test('clearHistory関数が定義されている', () => {
      expect(typeof clearHistory).toBe('function');
    });

    test('clearHistoryが履歴をクリアできる', () => {
      addToHistory('+', 10, 5, 15);
      expect(history.length).toBe(1);

      clearHistory();

      expect(history.length).toBe(0);
    });
  });

  describe('統合テスト', () => {
    test('一連の計算が正しく動作する', () => {
      document.getElementById('num1').value = '10';
      document.getElementById('num2').value = '5';

      performAdd();
      expect(history.length).toBe(1);
      expect(history[0].result).toBe(15);

      performMultiply();
      expect(history.length).toBe(2);
      expect(history[1].result).toBe(50);

      clearHistory();
      expect(history.length).toBe(0);
    });

    test('すべての演算が履歴に記録される', () => {
      document.getElementById('num1').value = '10';
      document.getElementById('num2').value = '5';

      performAdd();
      performSubtract();
      performMultiply();
      performDivide();

      expect(history.length).toBe(4);
      expect(history[0].operation).toBe('+');
      expect(history[1].operation).toBe('-');
      expect(history[2].operation).toBe('×');
      expect(history[3].operation).toBe('÷');
    });
  });

  describe('関数設計の確認', () => {
    test('すべての計算関数が数値を返す（型の一貫性）', () => {
      expect(typeof add(1, 2)).toBe('number');
      expect(typeof subtract(5, 3)).toBe('number');
      expect(typeof multiply(2, 4)).toBe('number');
      expect(typeof divide(10, 2)).toBe('number');
      expect(typeof divide(10, 0)).toBe('number');
    });

    test('各関数が適切な名前を持つ（命名規則）', () => {
      const functionNames = [
        'add', 'subtract', 'multiply', 'divide',
        'getFirstNumber', 'getSecondNumber',
        'showResult', 'addToHistory', 'showHistory',
        'performAdd', 'performSubtract', 'performMultiply', 'performDivide',
        'clearCalculator', 'clearHistory'
      ];

      functionNames.forEach(name => {
        expect(typeof eval(name)).toBe('function');
      });
    });
  });
});
