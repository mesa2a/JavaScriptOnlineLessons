import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 020: 関数を呼ぶ', () => {
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

  it('3つのボタンが存在する', () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('showMessage1関数が定義されている', () => {
    expect(typeof window.showMessage1).toBe('function');
  });

  it('showMessage2関数が定義されている', () => {
    expect(typeof window.showMessage2).toBe('function');
  });

  it('showMessage3関数が定義されている', () => {
    expect(typeof window.showMessage3).toBe('function');
  });

  it('1つ目のボタンのonclick属性にshowMessage1が含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[0].getAttribute('onclick');
    expect(onclick).toContain('showMessage1');
  });

  it('2つ目のボタンのonclick属性にshowMessage2が含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[1].getAttribute('onclick');
    expect(onclick).toContain('showMessage2');
  });

  it('3つ目のボタンのonclick属性にshowMessage3が含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[2].getAttribute('onclick');
    expect(onclick).toContain('showMessage3');
  });
});
