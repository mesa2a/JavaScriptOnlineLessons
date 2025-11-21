import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 077: 基本のfor', () => {
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

  it('generateListボタンが存在する', () => {
    const generateList = document.getElementById('generateList');
    expect(generateList).not.toBeNull();
    expect(generateList.tagName).toBe('BUTTON');
  });

  it('result要素が存在する', () => {
    const result = document.getElementById('result');
    expect(result).not.toBeNull();
  });

  it('ボタンをクリックすると100個の要素が追加される', () => {
    const generateList = document.getElementById('generateList');
    const result = document.getElementById('result');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    generateList.dispatchEvent(clickEvent);

    expect(result.children.length).toBe(100);
  });

  it('追加される要素はp要素である', () => {
    const generateList = document.getElementById('generateList');
    const result = document.getElementById('result');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    generateList.dispatchEvent(clickEvent);

    expect(result.children[0].tagName).toBe('P');
    expect(result.children[50].tagName).toBe('P');
    expect(result.children[99].tagName).toBe('P');
  });

  it('1から100までの数字が順番に表示される', () => {
    const generateList = document.getElementById('generateList');
    const result = document.getElementById('result');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    generateList.dispatchEvent(clickEvent);

    expect(result.children[0].textContent).toBe('1');
    expect(result.children[9].textContent).toBe('10');
    expect(result.children[49].textContent).toBe('50');
    expect(result.children[99].textContent).toBe('100');
  });

  it('ボタンを複数回クリックすると前回の結果がクリアされる', () => {
    const generateList = document.getElementById('generateList');
    const result = document.getElementById('result');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });

    // 1回目のクリック
    generateList.dispatchEvent(clickEvent);
    expect(result.children.length).toBe(100);

    // 2回目のクリック
    generateList.dispatchEvent(clickEvent);
    expect(result.children.length).toBe(100);
  });
});
