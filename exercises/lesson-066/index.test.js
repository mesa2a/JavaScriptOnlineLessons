import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 066: キーボードイベント', () => {
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

  it('box要素が存在する', () => {
    const box = document.getElementById('box');
    expect(box).not.toBeNull();
  });

  it('message要素が存在する', () => {
    const message = document.getElementById('message');
    expect(message).not.toBeNull();
  });

  it('ArrowUpキーでボックスが上に移動する', () => {
    const box = document.getElementById('box');

    // 初期位置を取得
    const initialTop = parseInt(box.style.top) || 100;

    // ArrowUpキーイベントを発火
    const keydownEvent = new window.KeyboardEvent('keydown', {
      key: 'ArrowUp',
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(keydownEvent);

    const newTop = parseInt(box.style.top);
    expect(newTop).toBe(initialTop - 10);
  });

  it('ArrowDownキーでボックスが下に移動する', () => {
    const box = document.getElementById('box');

    const initialTop = parseInt(box.style.top) || 100;

    const keydownEvent = new window.KeyboardEvent('keydown', {
      key: 'ArrowDown',
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(keydownEvent);

    const newTop = parseInt(box.style.top);
    expect(newTop).toBe(initialTop + 10);
  });

  it('ArrowLeftキーでボックスが左に移動する', () => {
    const box = document.getElementById('box');

    const initialLeft = parseInt(box.style.left) || 100;

    const keydownEvent = new window.KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(keydownEvent);

    const newLeft = parseInt(box.style.left);
    expect(newLeft).toBe(initialLeft - 10);
  });

  it('ArrowRightキーでボックスが右に移動する', () => {
    const box = document.getElementById('box');

    const initialLeft = parseInt(box.style.left) || 100;

    const keydownEvent = new window.KeyboardEvent('keydown', {
      key: 'ArrowRight',
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(keydownEvent);

    const newLeft = parseInt(box.style.left);
    expect(newLeft).toBe(initialLeft + 10);
  });

  it('Enterキーでボックスの背景色が青に変わる', () => {
    const box = document.getElementById('box');

    const keydownEvent = new window.KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(keydownEvent);

    expect(box.style.backgroundColor).toBe('blue');
  });

  it('Escapeキーでボックスが初期位置に戻る', () => {
    const box = document.getElementById('box');

    // まず移動させる
    const arrowDownEvent = new window.KeyboardEvent('keydown', {
      key: 'ArrowDown',
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(arrowDownEvent);

    // Escapeで初期位置に戻す
    const escapeEvent = new window.KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(escapeEvent);

    expect(box.style.top).toBe('100px');
    expect(box.style.left).toBe('100px');
  });

  it('ArrowUpキーでメッセージが表示される', () => {
    const message = document.getElementById('message');

    const keydownEvent = new window.KeyboardEvent('keydown', {
      key: 'ArrowUp',
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(keydownEvent);

    expect(message.textContent).toContain('キー');
  });

  it('Enterキーでメッセージが表示される', () => {
    const message = document.getElementById('message');

    const keydownEvent = new window.KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(keydownEvent);

    expect(message.textContent).toContain('キー');
  });

  it('Escapeキーでメッセージが表示される', () => {
    const message = document.getElementById('message');

    const keydownEvent = new window.KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(keydownEvent);

    expect(message.textContent).toContain('キー');
  });
});
