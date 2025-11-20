import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 065: マウスイベント', () => {
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

  it('status要素が存在する', () => {
    const status = document.getElementById('status');
    expect(status).not.toBeNull();
  });

  it('mouseoverイベントで背景色が変わる', () => {
    const box = document.getElementById('box');

    // mouseoverイベントを発火
    const mouseoverEvent = new window.MouseEvent('mouseover', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(mouseoverEvent);

    expect(box.style.backgroundColor).toBe('lightcoral');
  });

  it('mouseoverイベントでステータスメッセージが表示される', () => {
    const box = document.getElementById('box');
    const status = document.getElementById('status');

    const mouseoverEvent = new window.MouseEvent('mouseover', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(mouseoverEvent);

    expect(status.textContent).toContain('マウス');
  });

  it('mouseoutイベントで背景色が元に戻る', () => {
    const box = document.getElementById('box');

    // まずmouseoverを実行
    const mouseoverEvent = new window.MouseEvent('mouseover', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(mouseoverEvent);

    // mouseoutを実行
    const mouseoutEvent = new window.MouseEvent('mouseout', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(mouseoutEvent);

    expect(box.style.backgroundColor).toBe('lightblue');
  });

  it('mouseoutイベントでステータスメッセージがクリアされる', () => {
    const box = document.getElementById('box');
    const status = document.getElementById('status');

    // まずmouseoverを実行
    const mouseoverEvent = new window.MouseEvent('mouseover', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(mouseoverEvent);

    // mouseoutを実行
    const mouseoutEvent = new window.MouseEvent('mouseout', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(mouseoutEvent);

    expect(status.textContent).toBe('');
  });

  it('mousedownイベントでボックスが縮小される', () => {
    const box = document.getElementById('box');

    const mousedownEvent = new window.MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(mousedownEvent);

    expect(box.style.transform).toBe('scale(0.9)');
  });

  it('mousedownイベントでステータスメッセージが更新される', () => {
    const box = document.getElementById('box');
    const status = document.getElementById('status');

    const mousedownEvent = new window.MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(mousedownEvent);

    expect(status.textContent).toContain('押されて');
  });

  it('mouseupイベントでボックスが元のサイズに戻る', () => {
    const box = document.getElementById('box');

    // まずmousedownを実行
    const mousedownEvent = new window.MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(mousedownEvent);

    // mouseupを実行
    const mouseupEvent = new window.MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(mouseupEvent);

    expect(box.style.transform).toBe('scale(1)');
  });

  it('mouseupイベントでステータスメッセージが更新される', () => {
    const box = document.getElementById('box');
    const status = document.getElementById('status');

    // mouseoverを実行
    const mouseoverEvent = new window.MouseEvent('mouseover', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(mouseoverEvent);

    // mousedownを実行
    const mousedownEvent = new window.MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(mousedownEvent);

    // mouseupを実行
    const mouseupEvent = new window.MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(mouseupEvent);

    expect(status.textContent).toContain('マウス');
  });
});
