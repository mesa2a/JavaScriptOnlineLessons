import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 032: 四則演算', () => {
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

  it('HTMLにid="num1"のinput要素が存在する', () => {
    const element = document.getElementById('num1');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('INPUT');
  });

  it('HTMLにid="num2"のinput要素が存在する', () => {
    const element = document.getElementById('num2');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('INPUT');
  });

  it('HTMLにid="result"の要素が存在する', () => {
    const element = document.getElementById('result');
    expect(element).not.toBeNull();
  });

  it('add関数が定義されている', () => {
    expect(typeof window.add).toBe('function');
  });

  it('subtract関数が定義されている', () => {
    expect(typeof window.subtract).toBe('function');
  });

  it('multiply関数が定義されている', () => {
    expect(typeof window.multiply).toBe('function');
  });

  it('divide関数が定義されている', () => {
    expect(typeof window.divide).toBe('function');
  });

  it('4つのボタンが存在する', () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(4);
  });

  it('add関数を実行すると正しく足し算される', () => {
    document.getElementById('num1').value = '10';
    document.getElementById('num2').value = '5';
    window.add();
    const result = document.getElementById('result');
    expect(result.textContent).toContain('答え');
    expect(result.textContent).toContain('15');
  });

  it('subtract関数を実行すると正しく引き算される', () => {
    document.getElementById('num1').value = '10';
    document.getElementById('num2').value = '3';
    window.subtract();
    const result = document.getElementById('result');
    expect(result.textContent).toContain('答え');
    expect(result.textContent).toContain('7');
  });

  it('multiply関数を実行すると正しく掛け算される', () => {
    document.getElementById('num1').value = '6';
    document.getElementById('num2').value = '7';
    window.multiply();
    const result = document.getElementById('result');
    expect(result.textContent).toContain('答え');
    expect(result.textContent).toContain('42');
  });

  it('divide関数を実行すると正しく割り算される', () => {
    document.getElementById('num1').value = '20';
    document.getElementById('num2').value = '4';
    window.divide();
    const result = document.getElementById('result');
    expect(result.textContent).toContain('答え');
    expect(result.textContent).toContain('5');
  });

  it('subtract関数は負の数も扱える', () => {
    document.getElementById('num1').value = '3';
    document.getElementById('num2').value = '10';
    window.subtract();
    const result = document.getElementById('result');
    expect(result.textContent).toContain('-7');
  });

  it('divide関数は小数も扱える', () => {
    document.getElementById('num1').value = '10';
    document.getElementById('num2').value = '3';
    window.divide();
    const result = document.getElementById('result');
    expect(result.textContent).toMatch(/3\.3+/);
  });
});
