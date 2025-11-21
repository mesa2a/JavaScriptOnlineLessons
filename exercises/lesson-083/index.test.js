import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 083: ループの選択', () => {
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

  it('useForボタンが存在する', () => {
    const useFor = document.getElementById('useFor');
    expect(useFor).not.toBeNull();
    expect(useFor.tagName).toBe('BUTTON');
  });

  it('useWhileボタンが存在する', () => {
    const useWhile = document.getElementById('useWhile');
    expect(useWhile).not.toBeNull();
    expect(useWhile.tagName).toBe('BUTTON');
  });

  it('forResult要素が存在する', () => {
    const forResult = document.getElementById('forResult');
    expect(forResult).not.toBeNull();
  });

  it('whileResult要素が存在する', () => {
    const whileResult = document.getElementById('whileResult');
    expect(whileResult).not.toBeNull();
  });

  it('for文ボタンをクリックすると10個の要素が追加される', () => {
    const useFor = document.getElementById('useFor');
    const forResult = document.getElementById('forResult');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    useFor.dispatchEvent(clickEvent);

    expect(forResult.children.length).toBe(10);
  });

  it('while文ボタンをクリックすると10個の要素が追加される', () => {
    const useWhile = document.getElementById('useWhile');
    const whileResult = document.getElementById('whileResult');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    useWhile.dispatchEvent(clickEvent);

    expect(whileResult.children.length).toBe(10);
  });

  it('for文で1から10までの数字が表示される', () => {
    const useFor = document.getElementById('useFor');
    const forResult = document.getElementById('forResult');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    useFor.dispatchEvent(clickEvent);

    expect(forResult.children[0].textContent).toBe('1');
    expect(forResult.children[4].textContent).toBe('5');
    expect(forResult.children[9].textContent).toBe('10');
  });

  it('while文で1から10までの数字が表示される', () => {
    const useWhile = document.getElementById('useWhile');
    const whileResult = document.getElementById('whileResult');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    useWhile.dispatchEvent(clickEvent);

    expect(whileResult.children[0].textContent).toBe('1');
    expect(whileResult.children[4].textContent).toBe('5');
    expect(whileResult.children[9].textContent).toBe('10');
  });
});
