/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lesson 122: 関数式の基本', () => {
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

  describe('関数式の定義', () => {
    test('greetが関数式で定義されている', () => {
      expect(typeof greet).toBe('function');
      // 関数式であることを確認（constで宣言されている）
      expect(scriptContent).toMatch(/const\s+greet\s*=\s*function/);
    });

    test('addが関数式で定義されている', () => {
      expect(typeof add).toBe('function');
      expect(scriptContent).toMatch(/const\s+add\s*=\s*function/);
    });

    test('subtractが関数式で定義されている', () => {
      expect(typeof subtract).toBe('function');
      expect(scriptContent).toMatch(/const\s+subtract\s*=\s*function/);
    });

    test('multiplyが関数式で定義されている', () => {
      expect(typeof multiply).toBe('function');
      expect(scriptContent).toMatch(/const\s+multiply\s*=\s*function/);
    });

    test('divideが関数式で定義されている', () => {
      expect(typeof divide).toBe('function');
      expect(scriptContent).toMatch(/const\s+divide\s*=\s*function/);
    });
  });

  describe('greet関数', () => {
    test('greet関数が正しく動作する', () => {
      expect(greet('太郎')).toBe('こんにちは、太郎さん！');
      expect(greet('花子')).toBe('こんにちは、花子さん！');
    });

    test('greet関数が文字列を返す', () => {
      expect(typeof greet('test')).toBe('string');
    });
  });

  describe('計算関数', () => {
    test('add関数が正しく足し算する', () => {
      expect(add(5, 3)).toBe(8);
      expect(add(10, 20)).toBe(30);
    });

    test('subtract関数が正しく引き算する', () => {
      expect(subtract(10, 3)).toBe(7);
      expect(subtract(20, 5)).toBe(15);
    });

    test('multiply関数が正しく掛け算する', () => {
      expect(multiply(5, 3)).toBe(15);
      expect(multiply(10, 2)).toBe(20);
    });

    test('divide関数が正しく割り算する', () => {
      expect(divide(10, 2)).toBe(5);
      expect(divide(20, 4)).toBe(5);
    });

    test('divide関数が0で割る場合に0を返す', () => {
      expect(divide(10, 0)).toBe(0);
    });

    test('すべての計算関数が数値を返す', () => {
      expect(typeof add(1, 2)).toBe('number');
      expect(typeof subtract(5, 3)).toBe('number');
      expect(typeof multiply(2, 4)).toBe('number');
      expect(typeof divide(10, 2)).toBe('number');
    });
  });

  describe('UI関数', () => {
    test('testGreet関数が定義されている', () => {
      expect(typeof testGreet).toBe('function');
      expect(scriptContent).toMatch(/const\s+testGreet\s*=\s*function/);
    });

    test('testGreet関数が正しく動作する', () => {
      document.getElementById('nameInput').value = '太郎';
      testGreet();
      const result = document.getElementById('greetResult').innerHTML;
      expect(result).toContain('太郎');
    });

    test('testCalculator関数が定義されている', () => {
      expect(typeof testCalculator).toBe('function');
      expect(scriptContent).toMatch(/const\s+testCalculator\s*=\s*function/);
    });

    test('testCalculator関数が正しく動作する', () => {
      document.getElementById('num1Input').value = '10';
      document.getElementById('num2Input').value = '5';
      testCalculator();
      const result = document.getElementById('calcResult').innerHTML;
      expect(result).toContain('15'); // 10 + 5
      expect(result).toContain('5');  // 10 - 5
      expect(result).toContain('50'); // 10 × 5
      expect(result).toContain('2');  // 10 ÷ 5
    });

    test('testFunctionAsValue関数が定義されている', () => {
      expect(typeof testFunctionAsValue).toBe('function');
      expect(scriptContent).toMatch(/const\s+testFunctionAsValue\s*=\s*function/);
    });

    test('testFunctionAsValue関数が正しく動作する', () => {
      testFunctionAsValue();
      const result = document.getElementById('valueResult').innerHTML;
      expect(result).toContain('Hello');
    });
  });

  describe('関数式の特徴', () => {
    test('すべての関数がconstで宣言されている', () => {
      const functionNames = ['greet', 'add', 'subtract', 'multiply', 'divide',
                            'testGreet', 'testCalculator', 'testFunctionAsValue'];

      functionNames.forEach(name => {
        const regex = new RegExp(`const\\s+${name}\\s*=\\s*function`);
        expect(scriptContent).toMatch(regex);
      });
    });

    test('関数宣言（function name() {}）を使っていない', () => {
      // 関数宣言の形式がないことを確認
      const declarationPattern = /^function\s+\w+\s*\(/m;
      expect(scriptContent).not.toMatch(declarationPattern);
    });

    test('セミコロンが適切に使われている', () => {
      // 関数式の後にセミコロンがあることを確認
      expect(scriptContent).toMatch(/};\s*$/m);
    });
  });

  describe('関数を値として扱う', () => {
    test('関数を変数にコピーできる', () => {
      const func1 = function() {
        return 'test';
      };
      const func2 = func1;

      expect(func2()).toBe('test');
      expect(func1()).toBe(func2());
    });

    test('計算関数を別の変数に代入して使える', () => {
      const myAdd = add;
      expect(myAdd(3, 4)).toBe(7);
      expect(myAdd(3, 4)).toBe(add(3, 4));
    });
  });

  describe('統合テスト', () => {
    test('すべての関数が連携して動作する', () => {
      document.getElementById('nameInput').value = 'テスト';
      document.getElementById('num1Input').value = '8';
      document.getElementById('num2Input').value = '4';

      testGreet();
      testCalculator();
      testFunctionAsValue();

      expect(document.getElementById('greetResult').innerHTML).toContain('テスト');
      expect(document.getElementById('calcResult').innerHTML).toContain('12'); // 8 + 4
      expect(document.getElementById('valueResult').innerHTML).toContain('Hello');
    });
  });
});
