import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 084: パフォーマンス', () => {
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

  it('generateボタンが存在する', () => {
    const generate = document.getElementById('generate');
    expect(generate).not.toBeNull();
    expect(generate.tagName).toBe('BUTTON');
  });

  it('result要素が存在する', () => {
    const result = document.getElementById('result');
    expect(result).not.toBeNull();
  });

  it('time要素が存在する', () => {
    const timeDisplay = document.getElementById('time');
    expect(timeDisplay).not.toBeNull();
  });

  it('ボタンをクリックすると100個の要素が追加される', () => {
    const generate = document.getElementById('generate');
    const result = document.getElementById('result');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    generate.dispatchEvent(clickEvent);

    expect(result.children.length).toBe(100);
  });

  it('処理時間が表示される', () => {
    const generate = document.getElementById('generate');
    const timeDisplay = document.getElementById('time');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    generate.dispatchEvent(clickEvent);

    expect(timeDisplay.textContent).toContain('処理時間');
    expect(timeDisplay.textContent).toContain('ミリ秒');
  });

  it('1から100までの数字が表示される', () => {
    const generate = document.getElementById('generate');
    const result = document.getElementById('result');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    generate.dispatchEvent(clickEvent);

    expect(result.children[0].textContent).toBe('1');
    expect(result.children[49].textContent).toBe('50');
    expect(result.children[99].textContent).toBe('100');
  });
});
