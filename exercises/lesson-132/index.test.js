/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('レッスン132: アロー関数とthis', () => {
  let person, obj1, obj3, counterDemo, calculator;

  beforeAll(() => {
    const scriptPath = path.join(__dirname, 'script.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

    // HTMLのモック
    document.body.innerHTML = `
      <div id="thisBasicOutput"></div>
      <div id="comparisonOutput"></div>
      <div id="counterDisplay">0</div>
      <div id="timerDisplay">00:00</div>
      <div id="arrayOutput"></div>
      <div id="mistakesOutput"></div>
      <div id="guideOutput"></div>
      <button id="startBtn"></button>
      <button id="stopBtn"></button>
    `;

    // console.logをモック
    global.console.log = jest.fn();

    eval(scriptContent);

    person = eval('person');
    obj1 = eval('obj1');
    obj3 = eval('obj3');
    counterDemo = eval('counterDemo');
    calculator = eval('calculator');
  });

  describe('thisの基本', () => {
    test('personオブジェクトのgreetメソッドが正しく動作する', () => {
      expect(person.greet()).toBe('こんにちは、太郎です');
    });

    test('personオブジェクトのgetInfoメソッドが正しく動作する', () => {
      expect(person.getInfo()).toBe('太郎さん（25歳）');
    });

    test('メソッドは通常の関数として実装されている', () => {
      expect(person.greet.toString()).toContain('function');
      expect(person.getInfo.toString()).toContain('function');
    });
  });

  describe('通常の関数 vs アロー関数', () => {
    test('通常の関数を使ったgetValueメソッドが正しく動作する', () => {
      expect(obj1.getValue()).toBe(10);
    });

    test('obj1.getValueは通常の関数として実装されている', () => {
      expect(obj1.getValue.toString()).toContain('function');
    });

    test('コールバック内でアロー関数を使ったaddToAllが正しく動作する', () => {
      const result = obj3.addToAll();
      expect(result).toEqual([11, 12, 13, 14, 15]);
    });
  });

  describe('カウンターのデモ', () => {
    beforeEach(() => {
      counterDemo.count = 0;
    });

    test('incrementメソッドがカウントを1増やす', () => {
      counterDemo.increment();
      expect(counterDemo.count).toBe(1);

      counterDemo.increment();
      expect(counterDemo.count).toBe(2);
    });

    test('decrementメソッドがカウントを1減らす', () => {
      counterDemo.count = 5;
      counterDemo.decrement();
      expect(counterDemo.count).toBe(4);
    });

    test('incrementMultipleメソッドが指定回数だけカウントを増やす', () => {
      counterDemo.incrementMultiple(5);
      expect(counterDemo.count).toBe(5);

      counterDemo.incrementMultiple(3);
      expect(counterDemo.count).toBe(8);
    });

    test('resetメソッドがカウントを0にリセットする', () => {
      counterDemo.count = 10;
      counterDemo.reset();
      expect(counterDemo.count).toBe(0);
    });

    test('メソッドは通常の関数として実装されている', () => {
      expect(counterDemo.increment.toString()).toContain('function');
      expect(counterDemo.decrement.toString()).toContain('function');
    });
  });

  describe('配列メソッドでの活用', () => {
    const testNumbers = [1, 5, 10, 15, 20];

    test('addToAllメソッドが各要素にbaseValueを加算する', () => {
      const result = calculator.addToAll(testNumbers);
      expect(result).toEqual([11, 15, 20, 25, 30]);
    });

    test('filterGreaterThanメソッドがbaseValue以上の要素を返す', () => {
      const result = calculator.filterGreaterThan(testNumbers);
      expect(result).toEqual([10, 15, 20]);
    });

    test('multiplyAllメソッドが各要素をbaseValueで乗算する', () => {
      const result = calculator.multiplyAll(testNumbers);
      expect(result).toEqual([10, 50, 100, 150, 200]);
    });

    test('sumWithBaseメソッドが正しく計算する', () => {
      const result = calculator.sumWithBase([1, 2, 3]);
      // (1+10) + (2+10) + (3+10) = 11 + 12 + 13 = 36
      expect(result).toBe(36);
    });

    test('メソッドは通常の関数として実装されている', () => {
      expect(calculator.addToAll.toString()).toContain('function');
    });
  });

  describe('thisの正しい参照', () => {
    test('オブジェクトメソッド内でthisが正しくオブジェクトを参照する', () => {
      const testObj = {
        value: 42,
        getValue: function() {
          return this.value;
        }
      };

      expect(testObj.getValue()).toBe(42);
    });

    test('アロー関数のコールバック内でthisが外側のスコープを参照する', () => {
      const testObj = {
        base: 5,
        addToArray: function(arr) {
          return arr.map(n => n + this.base);
        }
      };

      expect(testObj.addToArray([1, 2, 3])).toEqual([6, 7, 8]);
    });
  });

  describe('実践的なテストケース', () => {
    test('複数のメソッドを組み合わせて使用できる', () => {
      counterDemo.reset();
      counterDemo.increment();
      counterDemo.increment();
      counterDemo.incrementMultiple(3);
      expect(counterDemo.count).toBe(5);
    });

    test('calculator の各メソッドが独立して動作する', () => {
      const nums = [5, 10, 15];

      expect(calculator.addToAll(nums)).toEqual([15, 20, 25]);
      expect(calculator.filterGreaterThan(nums)).toEqual([10, 15]);
      expect(calculator.multiplyAll(nums)).toEqual([50, 100, 150]);
    });
  });

  describe('エッジケースのテスト', () => {
    test('空配列の処理', () => {
      expect(calculator.addToAll([])).toEqual([]);
      expect(calculator.filterGreaterThan([])).toEqual([]);
      expect(calculator.multiplyAll([])).toEqual([]);
    });

    test('単一要素の配列', () => {
      expect(calculator.addToAll([5])).toEqual([15]);
      expect(calculator.filterGreaterThan([5])).toEqual([]);
      expect(calculator.multiplyAll([2])).toEqual([20]);
    });

    test('カウンターが負の値を扱える', () => {
      counterDemo.reset();
      counterDemo.decrement();
      expect(counterDemo.count).toBe(-1);

      counterDemo.decrement();
      expect(counterDemo.count).toBe(-2);
    });
  });
});
