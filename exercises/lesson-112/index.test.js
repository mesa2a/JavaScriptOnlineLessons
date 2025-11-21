/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lesson 112 - 戻り値', () => {
  beforeEach(() => {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    document.documentElement.innerHTML = html;

    const script = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
    eval(script);
  });

  test('add関数が定義されている', () => {
    expect(typeof window.add).toBe('function');
  });

  test('subtract関数が定義されている', () => {
    expect(typeof window.subtract).toBe('function');
  });

  test('multiply関数が定義されている', () => {
    expect(typeof window.multiply).toBe('function');
  });

  test('divide関数が定義されている', () => {
    expect(typeof window.divide).toBe('function');
  });

  test('calculate関数が定義されている', () => {
    expect(typeof window.calculate).toBe('function');
  });

  test('add(5, 3)は8を返す', () => {
    expect(window.add(5, 3)).toBe(8);
  });

  test('subtract(10, 3)は7を返す', () => {
    expect(window.subtract(10, 3)).toBe(7);
  });

  test('multiply(4, 5)は20を返す', () => {
    expect(window.multiply(4, 5)).toBe(20);
  });

  test('divide(10, 2)は5を返す', () => {
    expect(window.divide(10, 2)).toBe(5);
  });

  test('calculate("add")を呼ぶと、足し算の結果が表示される', () => {
    document.getElementById('num1').value = '10';
    document.getElementById('num2').value = '5';
    window.calculate('add');
    const output = document.getElementById('output');
    expect(output.textContent).toContain('15');
  });

  test('calculate("subtract")を呼ぶと、引き算の結果が表示される', () => {
    document.getElementById('num1').value = '10';
    document.getElementById('num2').value = '3';
    window.calculate('subtract');
    const output = document.getElementById('output');
    expect(output.textContent).toContain('7');
  });

  test('calculate("multiply")を呼ぶと、掛け算の結果が表示される', () => {
    document.getElementById('num1').value = '6';
    document.getElementById('num2').value = '7';
    window.calculate('multiply');
    const output = document.getElementById('output');
    expect(output.textContent).toContain('42');
  });

  test('calculate("divide")を呼ぶと、割り算の結果が表示される', () => {
    document.getElementById('num1').value = '20';
    document.getElementById('num2').value = '4';
    window.calculate('divide');
    const output = document.getElementById('output');
    expect(output.textContent).toContain('5');
  });

  test('HTMLにnum1とnum2が存在する', () => {
    expect(document.getElementById('num1')).not.toBeNull();
    expect(document.getElementById('num2')).not.toBeNull();
  });

  test('HTMLにoutputが存在する', () => {
    expect(document.getElementById('output')).not.toBeNull();
  });
});
