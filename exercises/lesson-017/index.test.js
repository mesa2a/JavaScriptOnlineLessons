import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 017: サイズを変える', () => {
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

  it('HTMLにid="text1"の要素が存在する', () => {
    const element = document.getElementById('text1');
    expect(element).not.toBeNull();
  });

  it('HTMLにid="text2"の要素が存在する', () => {
    const element = document.getElementById('text2');
    expect(element).not.toBeNull();
  });

  it('HTMLにid="box"の要素が存在する', () => {
    const element = document.getElementById('box');
    expect(element).not.toBeNull();
  });

  it('text1の文字サイズが20pxに設定されている', () => {
    const element = document.getElementById('text1');
    expect(element.style.fontSize).toBe('20px');
  });

  it('text2の文字サイズが40pxに設定されている', () => {
    const element = document.getElementById('text2');
    expect(element.style.fontSize).toBe('40px');
  });

  it('boxの幅が300pxに設定されている', () => {
    const element = document.getElementById('box');
    expect(element.style.width).toBe('300px');
  });

  it('boxの高さが150pxに設定されている', () => {
    const element = document.getElementById('box');
    expect(element.style.height).toBe('150px');
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
