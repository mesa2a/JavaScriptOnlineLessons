import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 064: イベントリスナー基礎', () => {
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

  it('button1要素が存在する', () => {
    const button = document.getElementById('button1');
    expect(button).not.toBeNull();
  });

  it('button2要素が存在する', () => {
    const button = document.getElementById('button2');
    expect(button).not.toBeNull();
  });

  it('button3要素が存在する', () => {
    const button = document.getElementById('button3');
    expect(button).not.toBeNull();
  });

  it('result要素が存在する', () => {
    const result = document.getElementById('result');
    expect(result).not.toBeNull();
  });

  it('button1をクリックすると対応するメッセージが表示される', () => {
    const button1 = document.getElementById('button1');
    const result = document.getElementById('result');

    button1.click();

    expect(result.textContent).toBe('ボタン1がクリックされました');
  });

  it('button2をクリックすると対応するメッセージが表示される', () => {
    const button2 = document.getElementById('button2');
    const result = document.getElementById('result');

    button2.click();

    expect(result.textContent).toBe('ボタン2がクリックされました');
  });

  it('button3をクリックすると対応するメッセージが表示される', () => {
    const button3 = document.getElementById('button3');
    const result = document.getElementById('result');

    button3.click();

    expect(result.textContent).toBe('ボタン3がクリックされました');
  });

  it('異なるボタンをクリックすると表示が更新される', () => {
    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');
    const result = document.getElementById('result');

    button1.click();
    expect(result.textContent).toBe('ボタン1がクリックされました');

    button2.click();
    expect(result.textContent).toBe('ボタン2がクリックされました');
  });

  it('addEventListenerが使用されている（onclickが使用されていない）', () => {
    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');
    const button3 = document.getElementById('button3');

    // onclick属性が設定されていないことを確認
    expect(button1.onclick).toBeNull();
    expect(button2.onclick).toBeNull();
    expect(button3.onclick).toBeNull();
  });
});
