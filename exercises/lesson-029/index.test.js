import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 029: リアルタイム取得', () => {
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

  it('HTMLにid="input1"のinput要素が存在する', () => {
    const element = document.getElementById('input1');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('INPUT');
  });

  it('HTMLにid="input2"のinput要素が存在する', () => {
    const element = document.getElementById('input2');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('INPUT');
  });

  it('HTMLにid="input3"のinput要素が存在する', () => {
    const element = document.getElementById('input3');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('INPUT');
  });

  it('HTMLにid="result1"の要素が存在する', () => {
    const element = document.getElementById('result1');
    expect(element).not.toBeNull();
  });

  it('HTMLにid="result2"の要素が存在する', () => {
    const element = document.getElementById('result2');
    expect(element).not.toBeNull();
  });

  it('HTMLにid="result3"の要素が存在する', () => {
    const element = document.getElementById('result3');
    expect(element).not.toBeNull();
  });

  it('input1にoninput属性が設定されている', () => {
    const input = document.getElementById('input1');
    const oninput = input.getAttribute('oninput');
    expect(oninput).not.toBeNull();
    expect(oninput).toContain('showInput1');
  });

  it('input2にoninput属性が設定されている', () => {
    const input = document.getElementById('input2');
    const oninput = input.getAttribute('oninput');
    expect(oninput).not.toBeNull();
    expect(oninput).toContain('countChars');
  });

  it('input3にoninput属性が設定されている', () => {
    const input = document.getElementById('input3');
    const oninput = input.getAttribute('oninput');
    expect(oninput).not.toBeNull();
    expect(oninput).toContain('showBoth');
  });

  it('showInput1関数が定義されている', () => {
    expect(typeof window.showInput1).toBe('function');
  });

  it('countChars関数が定義されている', () => {
    expect(typeof window.countChars).toBe('function');
  });

  it('showBoth関数が定義されている', () => {
    expect(typeof window.showBoth).toBe('function');
  });

  it('showInput1関数を実行するとinput1の値が表示される', () => {
    const input = document.getElementById('input1');
    input.value = 'テスト';
    window.showInput1();
    const result = document.getElementById('result1');
    expect(result.textContent).toContain('入力');
    expect(result.textContent).toContain('テスト');
  });

  it('countChars関数を実行すると文字数が表示される', () => {
    const input = document.getElementById('input2');
    input.value = 'こんにちは';
    window.countChars();
    const result = document.getElementById('result2');
    expect(result.textContent).toContain('文字数');
    expect(result.textContent).toContain('5');
  });

  it('countChars関数は空文字の場合0文字と表示する', () => {
    const input = document.getElementById('input2');
    input.value = '';
    window.countChars();
    const result = document.getElementById('result2');
    expect(result.textContent).toContain('0');
  });

  it('showBoth関数を実行すると値と文字数が表示される', () => {
    const input = document.getElementById('input3');
    input.value = 'Hello';
    window.showBoth();
    const result = document.getElementById('result3');
    expect(result.textContent).toContain('入力');
    expect(result.textContent).toContain('Hello');
    expect(result.textContent).toContain('5');
    expect(result.textContent).toContain('文字');
  });

  it('showBoth関数は指定された形式で表示する', () => {
    const input = document.getElementById('input3');
    input.value = 'Test';
    window.showBoth();
    const result = document.getElementById('result3');
    expect(result.textContent).toMatch(/入力.*Test.*4.*文字/);
  });
});
