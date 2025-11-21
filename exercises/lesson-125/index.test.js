/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lesson 125: 関数を返す関数', () => {
  let html;
  let scriptContent;

  beforeAll(() => {
    html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    scriptContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
  });

  beforeEach(() => {
    document.documentElement.innerHTML = html;
    eval(scriptContent);
  });

  describe('createGreeting関数', () => {
    test('createGreeting関数が定義されている', () => {
      expect(typeof createGreeting).toBe('function');
    });

    test('createGreetingが関数を返す', () => {
      const greetFunc = createGreeting('こんにちは');
      expect(typeof greetFunc).toBe('function');
    });

    test('返された関数が正しく動作する', () => {
      const greetFunc = createGreeting('こんにちは');
      expect(greetFunc('太郎')).toBe('こんにちは、太郎さん！');
    });

    test('異なる挨拶の関数を作れる', () => {
      const hello = createGreeting('こんにちは');
      const goodbye = createGreeting('さようなら');

      expect(hello('太郎')).toBe('こんにちは、太郎さん！');
      expect(goodbye('花子')).toBe('さようなら、花子さん！');
    });

    test('sayHelloFuncが定義されている', () => {
      expect(typeof sayHelloFunc).toBe('function');
    });

    test('sayGoodbyeFuncが定義されている', () => {
      expect(typeof sayGoodbyeFunc).toBe('function');
    });
  });

  describe('createMultiplier関数', () => {
    test('createMultiplier関数が定義されている', () => {
      expect(typeof createMultiplier).toBe('function');
    });

    test('createMultiplierが関数を返す', () => {
      const multiplyFunc = createMultiplier(2);
      expect(typeof multiplyFunc).toBe('function');
    });

    test('返された関数が正しく掛け算する', () => {
      const double = createMultiplier(2);
      expect(double(5)).toBe(10);
      expect(double(10)).toBe(20);
    });

    test('異なる倍数の関数を作れる', () => {
      const double = createMultiplier(2);
      const triple = createMultiplier(3);
      const tenTimes = createMultiplier(10);

      expect(double(5)).toBe(10);
      expect(triple(5)).toBe(15);
      expect(tenTimes(5)).toBe(50);
    });

    test('doubleが定義されている', () => {
      expect(typeof double).toBe('function');
    });

    test('tripleが定義されている', () => {
      expect(typeof triple).toBe('function');
    });
  });

  describe('createCounter関数', () => {
    test('createCounter関数が定義されている', () => {
      expect(typeof createCounter).toBe('function');
    });

    test('createCounterがオブジェクトを返す', () => {
      const counter = createCounter(0);
      expect(typeof counter).toBe('object');
    });

    test('返されたオブジェクトにincrementメソッドがある', () => {
      const counter = createCounter(0);
      expect(typeof counter.increment).toBe('function');
    });

    test('返されたオブジェクトにdecrementメソッドがある', () => {
      const counter = createCounter(0);
      expect(typeof counter.decrement).toBe('function');
    });

    test('返されたオブジェクトにgetValueメソッドがある', () => {
      const counter = createCounter(0);
      expect(typeof counter.getValue).toBe('function');
    });

    test('返されたオブジェクトにresetメソッドがある', () => {
      const counter = createCounter(0);
      expect(typeof counter.reset).toBe('function');
    });

    test('初期値が正しく設定される', () => {
      const counter = createCounter(10);
      expect(counter.getValue()).toBe(10);
    });

    test('incrementで値が増える', () => {
      const counter = createCounter(0);
      expect(counter.increment()).toBe(1);
      expect(counter.increment()).toBe(2);
    });

    test('decrementで値が減る', () => {
      const counter = createCounter(10);
      expect(counter.decrement()).toBe(9);
      expect(counter.decrement()).toBe(8);
    });

    test('resetで初期値に戻る', () => {
      const counter = createCounter(5);
      counter.increment();
      counter.increment();
      expect(counter.getValue()).toBe(7);
      counter.reset();
      expect(counter.getValue()).toBe(5);
    });

    test('複数のカウンターが独立している', () => {
      const counter1 = createCounter(0);
      const counter2 = createCounter(100);

      counter1.increment();
      counter1.increment();
      counter2.increment();

      expect(counter1.getValue()).toBe(2);
      expect(counter2.getValue()).toBe(101);
    });

    test('counter1が定義されている', () => {
      expect(typeof counter1).toBe('object');
    });

    test('counter2が定義されている', () => {
      expect(typeof counter2).toBe('object');
    });

    test('countに直接アクセスできない', () => {
      const counter = createCounter(0);
      expect(counter.count).toBeUndefined();
    });
  });

  describe('UI関数', () => {
    test('sayHello関数が定義されている', () => {
      expect(typeof sayHello).toBe('function');
    });

    test('sayGoodbye関数が定義されている', () => {
      expect(typeof sayGoodbye).toBe('function');
    });

    test('applyDouble関数が定義されている', () => {
      expect(typeof applyDouble).toBe('function');
    });

    test('applyTriple関数が定義されている', () => {
      expect(typeof applyTriple).toBe('function');
    });

    test('incrementCounter1関数が定義されている', () => {
      expect(typeof incrementCounter1).toBe('function');
    });

    test('decrementCounter1関数が定義されている', () => {
      expect(typeof decrementCounter1).toBe('function');
    });

    test('incrementCounter2関数が定義されている', () => {
      expect(typeof incrementCounter2).toBe('function');
    });

    test('decrementCounter2関数が定義されている', () => {
      expect(typeof decrementCounter2).toBe('function');
    });

    test('sayHelloが正しく動作する', () => {
      document.getElementById('nameInput').value = 'テスト';
      sayHello();
      const result = document.getElementById('greetResult').textContent;
      expect(result).toContain('こんにちは');
      expect(result).toContain('テスト');
    });

    test('applyDoubleが正しく動作する', () => {
      document.getElementById('multiplyInput').value = '7';
      applyDouble();
      const result = document.getElementById('multiplyResult').textContent;
      expect(result).toContain('14');
    });

    test('カウンター1が正しく動作する', () => {
      counter1.reset();
      incrementCounter1();
      const display = document.getElementById('counter1Display').textContent;
      expect(display).toBe('1');
    });

    test('カウンター2が正しく動作する', () => {
      counter2.reset();
      incrementCounter2();
      const display = document.getElementById('counter2Display').textContent;
      expect(display).toBe('1');
    });
  });

  describe('クロージャの確認', () => {
    test('関数が外側の変数を覚えている', () => {
      const add5 = createMultiplier(5);
      const add10 = createMultiplier(10);

      // それぞれ異なる multiplier を覚えている
      expect(add5(2)).toBe(10);
      expect(add10(2)).toBe(20);
    });

    test('カウンターが独立した状態を持つ', () => {
      counter1.reset();
      counter2.reset();

      counter1.increment();
      counter1.increment();
      counter2.increment();

      // それぞれ独立した count を持つ
      expect(counter1.getValue()).toBe(2);
      expect(counter2.getValue()).toBe(1);
    });
  });

  describe('統合テスト', () => {
    test('すべての機能が連携して動作する', () => {
      // 挨拶
      const hello = createGreeting('こんにちは');
      expect(hello('太郎')).toBe('こんにちは、太郎さん！');

      // 掛け算
      const double = createMultiplier(2);
      expect(double(10)).toBe(20);

      // カウンター
      const counter = createCounter(5);
      expect(counter.increment()).toBe(6);
      expect(counter.decrement()).toBe(5);
      expect(counter.reset()).toBe(5);
    });
  });
});
