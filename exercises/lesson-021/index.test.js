import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 021: カウンターを作る', () => {
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

    const dom = new JSDOM(html, {
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

  it('HTMLにid="counter"の要素が存在する', () => {
    const element = document.getElementById('counter');
    expect(element).not.toBeNull();
  });

  it('id="counter"の初期値が"0"である', () => {
    const element = document.getElementById('counter');
    expect(element.textContent).toBe('0');
  });

  it('count変数が定義されている', () => {
    expect(window.count).toBeDefined();
  });

  it('countの初期値が0である', () => {
    expect(window.count).toBe(0);
  });

  it('addCount関数が定義されている', () => {
    expect(typeof window.addCount).toBe('function');
  });

  it('resetCount関数が定義されている', () => {
    expect(typeof window.resetCount).toBe('function');
  });

  it('2つのボタンが存在する', () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it('1つ目のボタンのonclick属性にaddCountが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[0].getAttribute('onclick');
    expect(onclick).toContain('addCount');
  });

  it('2つ目のボタンのonclick属性にresetCountが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[1].getAttribute('onclick');
    expect(onclick).toContain('resetCount');
  });

  it('addCount関数を実行するとcountが1増える', () => {
    window.count = 0;
    window.addCount();
    expect(window.count).toBe(1);
  });

  it('addCount関数を実行するとid="counter"のtextContentが更新される', () => {
    window.count = 0;
    window.addCount();
    const element = document.getElementById('counter');
    expect(element.textContent).toBe('1');
  });

  it('resetCount関数を実行するとcountが0になる', () => {
    window.count = 5;
    window.resetCount();
    expect(window.count).toBe(0);
  });

  it('resetCount関数を実行するとid="counter"のtextContentが"0"になる', () => {
    window.count = 5;
    const element = document.getElementById('counter');
    element.textContent = '5';
    window.resetCount();
    expect(element.textContent).toBe('0');
  });
});
