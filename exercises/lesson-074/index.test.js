import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 074: 基本のwhile', () => {
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

  it('startLoopボタンが存在する', () => {
    const startLoop = document.getElementById('startLoop');
    expect(startLoop).not.toBeNull();
    expect(startLoop.tagName).toBe('BUTTON');
  });

  it('result要素が存在する', () => {
    const result = document.getElementById('result');
    expect(result).not.toBeNull();
  });

  it('startLoopボタンをクリックすると5つの要素が追加される', () => {
    const startLoop = document.getElementById('startLoop');
    const result = document.getElementById('result');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    startLoop.dispatchEvent(clickEvent);

    expect(result.children.length).toBe(5);
  });

  it('追加される要素はp要素である', () => {
    const startLoop = document.getElementById('startLoop');
    const result = document.getElementById('result');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    startLoop.dispatchEvent(clickEvent);

    expect(result.children[0].tagName).toBe('P');
    expect(result.children[1].tagName).toBe('P');
    expect(result.children[2].tagName).toBe('P');
    expect(result.children[3].tagName).toBe('P');
    expect(result.children[4].tagName).toBe('P');
  });

  it('各要素に正しいループ回数が表示される', () => {
    const startLoop = document.getElementById('startLoop');
    const result = document.getElementById('result');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    startLoop.dispatchEvent(clickEvent);

    expect(result.children[0].textContent).toContain('1');
    expect(result.children[1].textContent).toContain('2');
    expect(result.children[2].textContent).toContain('3');
    expect(result.children[3].textContent).toContain('4');
    expect(result.children[4].textContent).toContain('5');
  });

  it('ボタンを複数回クリックすると前回の結果がクリアされる', () => {
    const startLoop = document.getElementById('startLoop');
    const result = document.getElementById('result');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });

    // 1回目のクリック
    startLoop.dispatchEvent(clickEvent);
    expect(result.children.length).toBe(5);

    // 2回目のクリック
    startLoop.dispatchEvent(clickEvent);
    expect(result.children.length).toBe(5);
  });
});
