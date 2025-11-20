import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 071: 複数イベントの管理', () => {
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

  it('clickCount要素が存在する', () => {
    const clickCount = document.getElementById('clickCount');
    expect(clickCount).not.toBeNull();
  });

  it('hoverStatus要素が存在する', () => {
    const hoverStatus = document.getElementById('hoverStatus');
    expect(hoverStatus).not.toBeNull();
  });

  it('enableClickボタンが存在する', () => {
    const enableClick = document.getElementById('enableClick');
    expect(enableClick).not.toBeNull();
    expect(enableClick.tagName).toBe('BUTTON');
  });

  it('disableClickボタンが存在する', () => {
    const disableClick = document.getElementById('disableClick');
    expect(disableClick).not.toBeNull();
    expect(disableClick.tagName).toBe('BUTTON');
  });

  it('boxをクリックするとクリック回数が増える', () => {
    const box = document.getElementById('box');
    const clickCount = document.getElementById('clickCount');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(clickEvent);

    expect(clickCount.textContent).toContain('1');
  });

  it('boxを複数回クリックするとカウントが増え続ける', () => {
    const box = document.getElementById('box');
    const clickCount = document.getElementById('clickCount');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });

    box.dispatchEvent(clickEvent);
    box.dispatchEvent(clickEvent);
    box.dispatchEvent(clickEvent);

    expect(clickCount.textContent).toContain('3');
  });

  it('boxにマウスオーバーするとhoverStatusに表示される', () => {
    const box = document.getElementById('box');
    const hoverStatus = document.getElementById('hoverStatus');

    const mouseoverEvent = new window.MouseEvent('mouseover', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(mouseoverEvent);

    expect(hoverStatus.textContent).toContain('マウスオーバー');
  });

  it('boxからマウスアウトするとhoverStatusに表示される', () => {
    const box = document.getElementById('box');
    const hoverStatus = document.getElementById('hoverStatus');

    const mouseoutEvent = new window.MouseEvent('mouseout', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(mouseoutEvent);

    expect(hoverStatus.textContent).toContain('マウスアウト');
  });

  it('disableClickボタンをクリックすると、boxのクリックが無効になる', () => {
    const box = document.getElementById('box');
    const clickCount = document.getElementById('clickCount');
    const disableClick = document.getElementById('disableClick');

    // まず1回クリック
    let clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(clickEvent);
    expect(clickCount.textContent).toContain('1');

    // 無効化ボタンをクリック
    const disableClickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    disableClick.dispatchEvent(disableClickEvent);

    // もう一度boxをクリック
    clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(clickEvent);

    // カウントは1のまま
    expect(clickCount.textContent).toContain('1');
  });

  it('enableClickボタンをクリックすると、boxのクリックが有効になる', () => {
    const box = document.getElementById('box');
    const clickCount = document.getElementById('clickCount');
    const enableClick = document.getElementById('enableClick');
    const disableClick = document.getElementById('disableClick');

    // まず無効化
    const disableClickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    disableClick.dispatchEvent(disableClickEvent);

    // 有効化
    const enableClickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    enableClick.dispatchEvent(enableClickEvent);

    // boxをクリック
    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(clickEvent);

    // カウントが増える
    expect(clickCount.textContent).toContain('1');
  });
});
