import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 080: 二重ループ', () => {
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

  it('showMultiplicationTableボタンが存在する', () => {
    const showMultiplicationTable = document.getElementById('showMultiplicationTable');
    expect(showMultiplicationTable).not.toBeNull();
    expect(showMultiplicationTable.tagName).toBe('BUTTON');
  });

  it('result要素が存在する', () => {
    const result = document.getElementById('result');
    expect(result).not.toBeNull();
  });

  it('ボタンをクリックすると81個の要素が追加される（9×9）', () => {
    const showMultiplicationTable = document.getElementById('showMultiplicationTable');
    const result = document.getElementById('result');

    showMultiplicationTable.click();

    const numbers = result.querySelectorAll('div');
    expect(numbers.length).toBe(81);
  });

  it('最初の出力が1×1=1である', () => {
    const showMultiplicationTable = document.getElementById('showMultiplicationTable');
    const result = document.getElementById('result');

    showMultiplicationTable.click();

    const numbers = result.querySelectorAll('div');
    expect(numbers[0].textContent).toContain('1 × 1 = 1');
  });

  it('最後の出力が9×9=81である', () => {
    const showMultiplicationTable = document.getElementById('showMultiplicationTable');
    const result = document.getElementById('result');

    showMultiplicationTable.click();

    const numbers = result.querySelectorAll('div');
    expect(numbers[80].textContent).toContain('9 × 9 = 81');
  });

  it('1の段が正しく表示される（1×1から1×9まで）', () => {
    const showMultiplicationTable = document.getElementById('showMultiplicationTable');
    const result = document.getElementById('result');

    showMultiplicationTable.click();

    const numbers = result.querySelectorAll('div');
    // 1の段は最初の9個
    expect(numbers[0].textContent).toContain('1 × 1 = 1');
    expect(numbers[8].textContent).toContain('1 × 9 = 9');
  });

  it('5の段が正しく表示される（5×1から5×9まで）', () => {
    const showMultiplicationTable = document.getElementById('showMultiplicationTable');
    const result = document.getElementById('result');

    showMultiplicationTable.click();

    const numbers = result.querySelectorAll('div');
    // 5の段は37番目から45番目（インデックス36-44）
    expect(numbers[36].textContent).toContain('5 × 1 = 5');
    expect(numbers[44].textContent).toContain('5 × 9 = 45');
  });

  it('9の段が正しく表示される（9×1から9×9まで）', () => {
    const showMultiplicationTable = document.getElementById('showMultiplicationTable');
    const result = document.getElementById('result');

    showMultiplicationTable.click();

    const numbers = result.querySelectorAll('div');
    // 9の段は73番目から81番目（インデックス72-80）
    expect(numbers[72].textContent).toContain('9 × 1 = 9');
    expect(numbers[80].textContent).toContain('9 × 9 = 81');
  });

  it('表示形式が正しい（× と = を使用）', () => {
    const showMultiplicationTable = document.getElementById('showMultiplicationTable');
    const result = document.getElementById('result');

    showMultiplicationTable.click();

    const numbers = result.querySelectorAll('div');
    // いくつかのランダムな掛け算をチェック
    // 2×3=6 は 12番目（インデックス11）
    expect(numbers[11].textContent).toContain('2 × 3 = 6');
    // 4×7=28 は 34番目（インデックス33）
    expect(numbers[33].textContent).toContain('4 × 7 = 28');
  });
});
