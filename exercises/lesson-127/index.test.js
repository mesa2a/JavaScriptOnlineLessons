/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lesson 127: 再帰入門', () => {
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

  describe('countdown関数', () => {
    test('countdown関数が定義されている', () => {
      expect(typeof countdown).toBe('function');
    });

    test('countdownが正しくカウントダウンする', () => {
      const result = countdown(3);
      expect(result).toBe('3\n2\n1\n完了！');
    });

    test('countdown(1)が正しく動作する', () => {
      const result = countdown(1);
      expect(result).toBe('1\n完了！');
    });

    test('countdown(0)が完了を返す', () => {
      const result = countdown(0);
      expect(result).toBe('完了！');
    });

    test('countdown(5)が正しく動作する', () => {
      const result = countdown(5);
      expect(result).toBe('5\n4\n3\n2\n1\n完了！');
    });
  });

  describe('factorial関数', () => {
    test('factorial関数が定義されている', () => {
      expect(typeof factorial).toBe('function');
    });

    test('factorial(5)が120を返す', () => {
      expect(factorial(5)).toBe(120);
    });

    test('factorial(0)が1を返す', () => {
      expect(factorial(0)).toBe(1);
    });

    test('factorial(1)が1を返す', () => {
      expect(factorial(1)).toBe(1);
    });

    test('factorial(3)が6を返す', () => {
      expect(factorial(3)).toBe(6);
    });

    test('factorial(4)が24を返す', () => {
      expect(factorial(4)).toBe(24);
    });
  });

  describe('power関数', () => {
    test('power関数が定義されている', () => {
      expect(typeof power).toBe('function');
    });

    test('power(2, 3)が8を返す', () => {
      expect(power(2, 3)).toBe(8);
    });

    test('power(5, 2)が25を返す', () => {
      expect(power(5, 2)).toBe(25);
    });

    test('power(3, 0)が1を返す', () => {
      expect(power(3, 0)).toBe(1);
    });

    test('power(2, 5)が32を返す', () => {
      expect(power(2, 5)).toBe(32);
    });

    test('power(10, 2)が100を返す', () => {
      expect(power(10, 2)).toBe(100);
    });
  });

  describe('sum関数', () => {
    test('sum関数が定義されている', () => {
      expect(typeof sum).toBe('function');
    });

    test('sum([1, 2, 3])が6を返す', () => {
      expect(sum([1, 2, 3])).toBe(6);
    });

    test('sum([1, 2, 3, 4, 5])が15を返す', () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15);
    });

    test('sum([])が0を返す', () => {
      expect(sum([])).toBe(0);
    });

    test('sum([10])が10を返す', () => {
      expect(sum([10])).toBe(10);
    });

    test('sum([10, 20, 30])が60を返す', () => {
      expect(sum([10, 20, 30])).toBe(60);
    });
  });

  describe('UI関数', () => {
    test('testCountdown関数が定義されている', () => {
      expect(typeof testCountdown).toBe('function');
    });

    test('testCountdownが正しく動作する', () => {
      document.getElementById('countdownInput').value = '3';
      testCountdown();
      const result = document.getElementById('countdownResult').textContent;
      expect(result).toContain('3');
      expect(result).toContain('2');
      expect(result).toContain('1');
      expect(result).toContain('完了');
    });

    test('testFactorial関数が定義されている', () => {
      expect(typeof testFactorial).toBe('function');
    });

    test('testFactorialが正しく動作する', () => {
      document.getElementById('factorialInput').value = '5';
      testFactorial();
      const result = document.getElementById('factorialResult').textContent;
      expect(result).toContain('120');
    });

    test('testPower関数が定義されている', () => {
      expect(typeof testPower).toBe('function');
    });

    test('testPowerが正しく動作する', () => {
      document.getElementById('baseInput').value = '2';
      document.getElementById('exponentInput').value = '3';
      testPower();
      const result = document.getElementById('powerResult').textContent;
      expect(result).toContain('8');
    });

    test('testSum関数が定義されている', () => {
      expect(typeof testSum).toBe('function');
    });

    test('testSumが正しく動作する', () => {
      testSum();
      const result = document.getElementById('sumResult').textContent;
      expect(result).toContain('15');
      expect(result).toContain('60');
      expect(result).toContain('100');
    });
  });

  describe('再帰の確認', () => {
    test('countdownが再帰的に実装されている', () => {
      // 関数のソースコードに再帰呼び出しがあるか確認
      const funcSource = countdown.toString();
      expect(funcSource).toMatch(/countdown\s*\(/);
    });

    test('factorialが再帰的に実装されている', () => {
      const funcSource = factorial.toString();
      expect(funcSource).toMatch(/factorial\s*\(/);
    });

    test('powerが再帰的に実装されている', () => {
      const funcSource = power.toString();
      expect(funcSource).toMatch(/power\s*\(/);
    });

    test('sumが再帰的に実装されている', () => {
      const funcSource = sum.toString();
      expect(funcSource).toMatch(/sum\s*\(/);
    });
  });

  describe('統合テスト', () => {
    test('すべての再帰関数が正しく動作する', () => {
      // countdown
      expect(countdown(2)).toBe('2\n1\n完了！');

      // factorial
      expect(factorial(4)).toBe(24);

      // power
      expect(power(3, 3)).toBe(27);

      // sum
      expect(sum([5, 10, 15])).toBe(30);
    });

    test('ベースケースが正しく機能する', () => {
      // 各関数のベースケース
      expect(countdown(0)).toBe('完了！');
      expect(factorial(1)).toBe(1);
      expect(power(2, 0)).toBe(1);
      expect(sum([])).toBe(0);
    });
  });
});
