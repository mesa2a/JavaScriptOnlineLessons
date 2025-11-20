import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 015: 複数の要素を操作する', () => {
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

  it('HTMLにid="area1"の要素が存在する', () => {
    const element = document.getElementById('area1');
    expect(element).not.toBeNull();
  });

  it('HTMLにid="area2"の要素が存在する', () => {
    const element = document.getElementById('area2');
    expect(element).not.toBeNull();
  });

  it('HTMLにid="area3"の要素が存在する', () => {
    const element = document.getElementById('area3');
    expect(element).not.toBeNull();
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

  it('area1のtextContentが変更されている', () => {
    const element = document.getElementById('area1');
    expect(element.textContent).not.toBe('初期値1');
    expect(element.textContent.length).toBeGreaterThan(0);
  });

  it('area2のtextContentが変更されている', () => {
    const element = document.getElementById('area2');
    expect(element.textContent).not.toBe('初期値2');
    expect(element.textContent.length).toBeGreaterThan(0);
  });

  it('area3のtextContentが変更されている', () => {
    const element = document.getElementById('area3');
    expect(element.textContent).not.toBe('初期値3');
    expect(element.textContent.length).toBeGreaterThan(0);
  });
});
