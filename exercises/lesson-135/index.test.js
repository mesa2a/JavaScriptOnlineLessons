import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 135: プロパティアクセス', () => {
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

  it('keyInput要素が存在する', () => {
    const keyInput = document.getElementById('keyInput');
    expect(keyInput).not.toBeNull();
  });

  it('getButton要素が存在する', () => {
    const getButton = document.getElementById('getButton');
    expect(getButton).not.toBeNull();
    expect(getButton.tagName).toBe('BUTTON');
  });

  it('result要素が存在する', () => {
    const result = document.getElementById('result');
    expect(result).not.toBeNull();
  });

  it('brandを入力して取得ボタンをクリックすると正しい値が表示される', () => {
    const keyInput = document.getElementById('keyInput');
    const getButton = document.getElementById('getButton');
    const result = document.getElementById('result');

    keyInput.value = 'brand';

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    getButton.dispatchEvent(clickEvent);

    expect(result.textContent).toBe('トヨタ');
  });

  it('modelを入力して取得ボタンをクリックすると正しい値が表示される', () => {
    const keyInput = document.getElementById('keyInput');
    const getButton = document.getElementById('getButton');
    const result = document.getElementById('result');

    keyInput.value = 'model';

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    getButton.dispatchEvent(clickEvent);

    expect(result.textContent).toBe('プリウス');
  });

  it('yearを入力して取得ボタンをクリックすると正しい値が表示される', () => {
    const keyInput = document.getElementById('keyInput');
    const getButton = document.getElementById('getButton');
    const result = document.getElementById('result');

    keyInput.value = 'year';

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    getButton.dispatchEvent(clickEvent);

    expect(result.textContent).toBe('2023');
  });

  it('colorを入力して取得ボタンをクリックすると正しい値が表示される', () => {
    const keyInput = document.getElementById('keyInput');
    const getButton = document.getElementById('getButton');
    const result = document.getElementById('result');

    keyInput.value = 'color';

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    getButton.dispatchEvent(clickEvent);

    expect(result.textContent).toBe('白');
  });

  it('存在しないプロパティを入力すると「プロパティが見つかりません」と表示される', () => {
    const keyInput = document.getElementById('keyInput');
    const getButton = document.getElementById('getButton');
    const result = document.getElementById('result');

    keyInput.value = 'price';

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    getButton.dispatchEvent(clickEvent);

    expect(result.textContent).toBe('プロパティが見つかりません');
  });
});
