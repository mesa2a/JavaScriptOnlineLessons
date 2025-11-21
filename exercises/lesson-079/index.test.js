import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 079: ステップ変更', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    const html = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );
    const js = fs.readFileSync(
      path.resolve(__dirname, 'script.js'),
      'utf-8'
    );

    dom = new JSDOM(html, {
      runScripts: 'outside-only',
      resources: 'usable'
    });
    document = dom.window.document;
    window = dom.window;

    // JavaScriptを実行
    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);
  });

  it('showEvenNumbersボタンが存在する', () => {
    const showEvenNumbers = document.getElementById('showEvenNumbers');
    expect(showEvenNumbers).not.toBeNull();
    expect(showEvenNumbers.tagName).toBe('BUTTON');
  });

  it('showMultiplesOf3ボタンが存在する', () => {
    const showMultiplesOf3 = document.getElementById('showMultiplesOf3');
    expect(showMultiplesOf3).not.toBeNull();
    expect(showMultiplesOf3.tagName).toBe('BUTTON');
  });

  it('showMultiplicationTableボタンが存在する', () => {
    const showMultiplicationTable = document.getElementById('showMultiplicationTable');
    expect(showMultiplicationTable).not.toBeNull();
    expect(showMultiplicationTable.tagName).toBe('BUTTON');
  });

  it('result要素が存在する', () => {
    const result = document.getElementById('result');
    expect(result).not.toBeNull();
  });

  it('偶数ボタンをクリックすると11個の要素が追加される（0から20まで）', () => {
    const showEvenNumbers = document.getElementById('showEvenNumbers');
    const result = document.getElementById('result');

    showEvenNumbers.click();

    const numbers = result.querySelectorAll('div');
    expect(numbers.length).toBe(11);
  });

  it('偶数が0から20まで表示される（2ずつ増加）', () => {
    const showEvenNumbers = document.getElementById('showEvenNumbers');
    const result = document.getElementById('result');

    showEvenNumbers.click();

    const numbers = result.querySelectorAll('div');
    expect(numbers[0].textContent).toContain('0');
    expect(numbers[1].textContent).toContain('2');
    expect(numbers[5].textContent).toContain('10');
    expect(numbers[10].textContent).toContain('20');
  });

  it('3の倍数ボタンをクリックすると11個の要素が追加される（0から30まで）', () => {
    const showMultiplesOf3 = document.getElementById('showMultiplesOf3');
    const result = document.getElementById('result');

    showMultiplesOf3.click();

    const numbers = result.querySelectorAll('div');
    expect(numbers.length).toBe(11);
  });

  it('3の倍数が0から30まで表示される（3ずつ増加）', () => {
    const showMultiplesOf3 = document.getElementById('showMultiplesOf3');
    const result = document.getElementById('result');

    showMultiplesOf3.click();

    const numbers = result.querySelectorAll('div');
    expect(numbers[0].textContent).toContain('0');
    expect(numbers[1].textContent).toContain('3');
    expect(numbers[10].textContent).toContain('30');
  });

  it('九九の3の段ボタンをクリックすると9個の要素が追加される', () => {
    const showMultiplicationTable = document.getElementById('showMultiplicationTable');
    const result = document.getElementById('result');

    showMultiplicationTable.click();

    const numbers = result.querySelectorAll('div');
    expect(numbers.length).toBe(9);
  });

  it('九九の3の段が正しく表示される', () => {
    const showMultiplicationTable = document.getElementById('showMultiplicationTable');
    const result = document.getElementById('result');

    showMultiplicationTable.click();

    const numbers = result.querySelectorAll('div');
    expect(numbers[0].textContent).toContain('3 × 1 = 3');
    expect(numbers[8].textContent).toContain('3 × 9 = 27');
  });
});
