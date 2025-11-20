import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 031: 足し算計算機', () => {
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

  it('calculateAdd関数が定義されている', () => {
    expect(typeof window.calculateAdd).toBe('function');
  });

  it('ボタンが存在する', () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it('ボタンのonclick属性にcalculateAddが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[0].getAttribute('onclick');
    expect(onclick).toContain('calculateAdd');
  });

  it('calculateAdd関数を実行すると正しく計算される', () => {
    document.getElementById('num1').value = '10';
    document.getElementById('num2').value = '20';
    window.calculateAdd();
    const result = document.getElementById('result');
    expect(result.textContent).toContain('答え');
    expect(result.textContent).toContain('30');
  });

  it('calculateAdd関数は数値として計算する（文字列連結ではない）', () => {
    document.getElementById('num1').value = '5';
    document.getElementById('num2').value = '3';
    window.calculateAdd();
    const result = document.getElementById('result');
    // 文字列連結だと"53"になるが、正しくは8
    expect(result.textContent).not.toContain('53');
    expect(result.textContent).toContain('8');
  });

  it('calculateAdd関数は小数も計算できる', () => {
    document.getElementById('num1').value = '1.5';
    document.getElementById('num2').value = '2.5';
    window.calculateAdd();
    const result = document.getElementById('result');
    expect(result.textContent).toContain('4');
  });

  it('calculateAdd関数は負の数も計算できる', () => {
    document.getElementById('num1').value = '-10';
    document.getElementById('num2').value = '15';
    window.calculateAdd();
    const result = document.getElementById('result');
    expect(result.textContent).toContain('5');
  });

  it('calculateAdd関数は0を含む計算もできる', () => {
    document.getElementById('num1').value = '0';
    document.getElementById('num2').value = '100';
    window.calculateAdd();
    const result = document.getElementById('result');
    expect(result.textContent).toContain('100');
  });
});
