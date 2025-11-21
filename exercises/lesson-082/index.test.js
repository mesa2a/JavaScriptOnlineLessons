import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 082: continue文', () => {
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

  it('showEvenボタンが存在する', () => {
    const showEven = document.getElementById('showEven');
    expect(showEven).not.toBeNull();
    expect(showEven.tagName).toBe('BUTTON');
  });

  it('result要素が存在する', () => {
    const result = document.getElementById('result');
    expect(result).not.toBeNull();
  });

  it('ボタンをクリックすると10個の要素が追加される', () => {
    const showEven = document.getElementById('showEven');
    const result = document.getElementById('result');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    showEven.dispatchEvent(clickEvent);

    expect(result.children.length).toBe(10);
  });

  it('追加される要素はp要素である', () => {
    const showEven = document.getElementById('showEven');
    const result = document.getElementById('result');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    showEven.dispatchEvent(clickEvent);

    for (let i = 0; i < result.children.length; i++) {
      expect(result.children[i].tagName).toBe('P');
    }
  });

  it('偶数だけが表示される', () => {
    const showEven = document.getElementById('showEven');
    const result = document.getElementById('result');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    showEven.dispatchEvent(clickEvent);

    expect(result.children[0].textContent).toContain('2');
    expect(result.children[1].textContent).toContain('4');
    expect(result.children[4].textContent).toContain('10');
    expect(result.children[9].textContent).toContain('20');
  });

  it('ボタンを複数回クリックすると前回の結果がクリアされる', () => {
    const showEven = document.getElementById('showEven');
    const result = document.getElementById('result');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });

    // 1回目のクリック
    showEven.dispatchEvent(clickEvent);
    expect(result.children.length).toBe(10);

    // 2回目のクリック
    showEven.dispatchEvent(clickEvent);
    expect(result.children.length).toBe(10);
  });
});
