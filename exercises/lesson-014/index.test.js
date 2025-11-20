import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 014: 文字を変更する', () => {
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

  it('HTMLにid="message"の要素が存在する', () => {
    const element = document.getElementById('message');
    expect(element).not.toBeNull();
  });

  it('elem変数が定義されている', () => {
    expect(window.elem).toBeDefined();
  });

  it('elem変数がDOM要素を参照している', () => {
    const element = document.getElementById('message');
    expect(window.elem).toBe(element);
  });

  it('textContentが変更されている', () => {
    const element = document.getElementById('message');
    expect(element.textContent).not.toBe('最初の文字');
    expect(element.textContent.length).toBeGreaterThan(0);
  });

  it('textContentに文字列が設定されている', () => {
    const element = document.getElementById('message');
    expect(typeof element.textContent).toBe('string');
  });
});
