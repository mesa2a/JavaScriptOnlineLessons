import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 018: 表示/非表示を切り替える', () => {
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

  it('HTMLにid="item1"の要素が存在する', () => {
    const element = document.getElementById('item1');
    expect(element).not.toBeNull();
  });

  it('HTMLにid="item2"の要素が存在する', () => {
    const element = document.getElementById('item2');
    expect(element).not.toBeNull();
  });

  it('HTMLにid="item3"の要素が存在する', () => {
    const element = document.getElementById('item3');
    expect(element).not.toBeNull();
  });

  it('item1が非表示に設定されている', () => {
    const element = document.getElementById('item1');
    expect(element.style.display).toBe('none');
  });

  it('item2が表示に設定されている', () => {
    const element = document.getElementById('item2');
    expect(element.style.display).toBe('block');
  });

  it('item3が非表示に設定されている', () => {
    const element = document.getElementById('item3');
    expect(element.style.display).toBe('none');
  });

  it('elem1変数が定義されている', () => {
    expect(window.elem1).toBeDefined();
  });

  it('elem2変数が定義されている', () => {
    expect(window.elem2).toBeDefined();
  });

  it('elem3変数が定義されている', () => {
    expect(window.elem3).toBeDefined();
  });
});
