/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lesson 118: 引数と戻り値の型', () => {
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

  describe('calculateBMIValue関数', () => {
    test('calculateBMIValue関数が定義されている', () => {
      expect(typeof calculateBMIValue).toBe('function');
    });

    test('正しい数値でBMIを計算できる', () => {
      const result = calculateBMIValue(170, 60);
      expect(result).toBeCloseTo(20.8, 1);
      expect(typeof result).toBe('number');
    });

    test('heightが数値でない場合は0を返す', () => {
      const result = calculateBMIValue('170', 60);
      expect(result).toBe(0);
      expect(typeof result).toBe('number');
    });

    test('weightが数値でない場合は0を返す', () => {
      const result = calculateBMIValue(170, '60');
      expect(result).toBe(0);
      expect(typeof result).toBe('number');
    });

    test('heightが0以下の場合は0を返す', () => {
      expect(calculateBMIValue(0, 60)).toBe(0);
      expect(calculateBMIValue(-10, 60)).toBe(0);
    });

    test('weightが0以下の場合は0を返す', () => {
      expect(calculateBMIValue(170, 0)).toBe(0);
      expect(calculateBMIValue(170, -10)).toBe(0);
    });

    test('異常な値の場合は0を返す', () => {
      expect(calculateBMIValue(400, 60)).toBe(0);
      expect(calculateBMIValue(170, 600)).toBe(0);
    });
  });

  describe('createGreeting関数', () => {
    test('createGreeting関数が定義されている', () => {
      expect(typeof createGreeting).toBe('function');
    });

    test('正しい文字列で挨拶を生成できる', () => {
      const result = createGreeting('太郎');
      expect(result).toBe('こんにちは、太郎さん！');
      expect(typeof result).toBe('string');
    });

    test('nameが文字列でない場合は"こんにちは"を返す', () => {
      expect(createGreeting(123)).toBe('こんにちは');
      expect(createGreeting(true)).toBe('こんにちは');
      expect(typeof createGreeting(123)).toBe('string');
    });

    test('空文字の場合は"こんにちは"を返す', () => {
      expect(createGreeting('')).toBe('こんにちは');
      expect(createGreeting('   ')).toBe('こんにちは');
    });

    test('常に文字列を返す', () => {
      expect(typeof createGreeting('太郎')).toBe('string');
      expect(typeof createGreeting(123)).toBe('string');
      expect(typeof createGreeting('')).toBe('string');
    });
  });

  describe('formatPriceWithTax関数', () => {
    test('formatPriceWithTax関数が定義されている', () => {
      expect(typeof formatPriceWithTax).toBe('function');
    });

    test('正しい数値で税込価格を計算できる', () => {
      const result = formatPriceWithTax(1000);
      expect(result).toContain('1100');
      expect(result).toContain('¥');
      expect(typeof result).toBe('string');
    });

    test('priceが数値でない場合は"価格不明"を返す', () => {
      expect(formatPriceWithTax('1000')).toBe('価格不明');
      expect(formatPriceWithTax(true)).toBe('価格不明');
      expect(typeof formatPriceWithTax('1000')).toBe('string');
    });

    test('priceが負の値の場合は"価格不明"を返す', () => {
      expect(formatPriceWithTax(-100)).toBe('価格不明');
    });

    test('常に文字列を返す', () => {
      expect(typeof formatPriceWithTax(1000)).toBe('string');
      expect(typeof formatPriceWithTax('abc')).toBe('string');
      expect(typeof formatPriceWithTax(-10)).toBe('string');
    });
  });

  describe('convertToNumber関数', () => {
    test('convertToNumber関数が定義されている', () => {
      expect(typeof convertToNumber).toBe('function');
    });

    test('数値をそのまま返す', () => {
      expect(convertToNumber(123)).toBe(123);
      expect(typeof convertToNumber(123)).toBe('number');
    });

    test('数値文字列を数値に変換する', () => {
      expect(convertToNumber('456')).toBe(456);
      expect(typeof convertToNumber('456')).toBe('number');
    });

    test('変換できない文字列は0を返す', () => {
      expect(convertToNumber('abc')).toBe(0);
      expect(typeof convertToNumber('abc')).toBe('number');
    });

    test('その他の型は0を返す', () => {
      expect(convertToNumber(true)).toBe(0);
      expect(convertToNumber(false)).toBe(0);
      expect(convertToNumber(null)).toBe(0);
    });

    test('常に数値を返す', () => {
      expect(typeof convertToNumber(123)).toBe('number');
      expect(typeof convertToNumber('456')).toBe('number');
      expect(typeof convertToNumber('abc')).toBe('number');
      expect(typeof convertToNumber(true)).toBe('number');
    });
  });

  describe('型の一貫性', () => {
    test('calculateBMIValueは常に数値を返す', () => {
      expect(typeof calculateBMIValue(170, 60)).toBe('number');
      expect(typeof calculateBMIValue('170', 60)).toBe('number');
      expect(typeof calculateBMIValue(0, 60)).toBe('number');
    });

    test('createGreetingは常に文字列を返す', () => {
      expect(typeof createGreeting('太郎')).toBe('string');
      expect(typeof createGreeting(123)).toBe('string');
      expect(typeof createGreeting('')).toBe('string');
    });

    test('formatPriceWithTaxは常に文字列を返す', () => {
      expect(typeof formatPriceWithTax(1000)).toBe('string');
      expect(typeof formatPriceWithTax('1000')).toBe('string');
      expect(typeof formatPriceWithTax(-10)).toBe('string');
    });

    test('convertToNumberは常に数値を返す', () => {
      expect(typeof convertToNumber(123)).toBe('number');
      expect(typeof convertToNumber('456')).toBe('number');
      expect(typeof convertToNumber(true)).toBe('number');
    });
  });
});
