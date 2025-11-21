/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lesson 113 - 複数の処理', () => {
  beforeEach(() => {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    document.documentElement.innerHTML = html;

    const script = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
    eval(script);
  });

  test('calculateBMI関数が定義されている', () => {
    expect(typeof window.calculateBMI).toBe('function');
  });

  test('calculate関数が定義されている', () => {
    expect(typeof window.calculate).toBe('function');
  });

  test('calculateBMI(170, 60)を呼ぶと、BMIと判定が表示される', () => {
    window.calculateBMI(170, 60);
    const output = document.getElementById('output');
    expect(output.textContent).toMatch(/20\.\d/);  // BMI 20.8
  });

  test('calculateBMI(170, 50)を呼ぶと、「やせ」と判定される', () => {
    window.calculateBMI(170, 50);  // BMI 17.3
    const output = document.getElementById('output');
    expect(output.textContent).toContain('やせ');
  });

  test('calculateBMI(170, 70)を呼ぶと、「普通」と判定される', () => {
    window.calculateBMI(170, 70);  // BMI 24.2
    const output = document.getElementById('output');
    expect(output.textContent).toContain('普通');
  });

  test('calculateBMI(170, 80)を呼ぶと、「肥満」と判定される', () => {
    window.calculateBMI(170, 80);  // BMI 27.7
    const output = document.getElementById('output');
    expect(output.textContent).toContain('肥満');
  });

  test('calculateBMI(0, 60)を呼ぶと、エラーメッセージが表示される', () => {
    window.calculateBMI(0, 60);
    const output = document.getElementById('output');
    expect(output.textContent).toContain('正しい');
  });

  test('calculateBMI(170, 0)を呼ぶと、エラーメッセージが表示される', () => {
    window.calculateBMI(170, 0);
    const output = document.getElementById('output');
    expect(output.textContent).toContain('正しい');
  });

  test('calculate関数を呼ぶと、入力値でcalculateBMIが呼ばれる', () => {
    document.getElementById('height').value = '170';
    document.getElementById('weight').value = '60';
    window.calculate();
    const output = document.getElementById('output');
    expect(output.textContent.length).toBeGreaterThan(0);
  });

  test('HTMLにheightとweightが存在する', () => {
    expect(document.getElementById('height')).not.toBeNull();
    expect(document.getElementById('weight')).not.toBeNull();
  });

  test('HTMLにoutputが存在する', () => {
    expect(document.getElementById('output')).not.toBeNull();
  });
});
