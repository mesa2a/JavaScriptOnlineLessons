import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 069: イベント伝播入門', () => {
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

  it('outer要素が存在する', () => {
    const outer = document.getElementById('outer');
    expect(outer).not.toBeNull();
  });

  it('middle要素が存在する', () => {
    const middle = document.getElementById('middle');
    expect(middle).not.toBeNull();
  });

  it('inner要素が存在する', () => {
    const inner = document.getElementById('inner');
    expect(inner).not.toBeNull();
  });

  it('log要素が存在する', () => {
    const log = document.getElementById('log');
    expect(log).not.toBeNull();
  });

  it('innerをクリックするとinner, middle, outerと表示される', () => {
    const inner = document.getElementById('inner');
    const log = document.getElementById('log');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    inner.dispatchEvent(clickEvent);

    expect(log.textContent).toBe('inner, middle, outer');
  });

  it('middleをクリックするとmiddle, outerと表示される', () => {
    const middle = document.getElementById('middle');
    const log = document.getElementById('log');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    middle.dispatchEvent(clickEvent);

    expect(log.textContent).toBe('middle, outer');
  });

  it('outerをクリックするとouterと表示される', () => {
    const outer = document.getElementById('outer');
    const log = document.getElementById('log');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    outer.dispatchEvent(clickEvent);

    expect(log.textContent).toBe('outer');
  });

  it('複数回クリックすると毎回ログがリセットされる', () => {
    const inner = document.getElementById('inner');
    const middle = document.getElementById('middle');
    const log = document.getElementById('log');

    // 最初にinnerをクリック
    let clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    inner.dispatchEvent(clickEvent);
    expect(log.textContent).toBe('inner, middle, outer');

    // 次にmiddleをクリック
    clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    middle.dispatchEvent(clickEvent);
    expect(log.textContent).toBe('middle, outer');
  });
});
