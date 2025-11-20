import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 059: TruthyとFalsy', () => {
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

  it('valueInput要素が存在する', () => {
    const input = document.getElementById('valueInput');
    expect(input).not.toBeNull();
  });

  it('result要素が存在する', () => {
    const result = document.getElementById('result');
    expect(result).not.toBeNull();
  });

  it('detail要素が存在する', () => {
    const detail = document.getElementById('detail');
    expect(detail).not.toBeNull();
  });

  it('testValue関数が存在する', () => {
    expect(typeof window.testValue).toBe('function');
  });

  it('空文字列がFalsyと判定される', () => {
    const input = document.getElementById('valueInput');
    const result = document.getElementById('result');

    input.value = '';
    window.testValue();

    expect(result.textContent).toContain('Falsy');
    expect(result.style.color).toBe('red');
  });

  it('数値の0がFalsyと判定される', () => {
    const input = document.getElementById('valueInput');
    const result = document.getElementById('result');

    input.value = '0';
    window.testValue();

    expect(result.textContent).toContain('Falsy');
    expect(result.style.color).toBe('red');
  });

  it('nullがFalsyと判定される', () => {
    const input = document.getElementById('valueInput');
    const result = document.getElementById('result');

    input.value = 'null';
    window.testValue();

    expect(result.textContent).toContain('Falsy');
    expect(result.style.color).toBe('red');
  });

  it('undefinedがFalsyと判定される', () => {
    const input = document.getElementById('valueInput');
    const result = document.getElementById('result');

    input.value = 'undefined';
    window.testValue();

    expect(result.textContent).toContain('Falsy');
    expect(result.style.color).toBe('red');
  });

  it('NaNがFalsyと判定される', () => {
    const input = document.getElementById('valueInput');
    const result = document.getElementById('result');

    input.value = 'NaN';
    window.testValue();

    expect(result.textContent).toContain('Falsy');
    expect(result.style.color).toBe('red');
  });

  it('falseがFalsyと判定される', () => {
    const input = document.getElementById('valueInput');
    const result = document.getElementById('result');

    input.value = 'false';
    window.testValue();

    expect(result.textContent).toContain('Falsy');
    expect(result.style.color).toBe('red');
  });

  it('trueがTruthyと判定される', () => {
    const input = document.getElementById('valueInput');
    const result = document.getElementById('result');

    input.value = 'true';
    window.testValue();

    expect(result.textContent).toContain('Truthy');
    expect(result.style.color).toBe('green');
  });

  it('任意の文字列がTruthyと判定される', () => {
    const input = document.getElementById('valueInput');
    const result = document.getElementById('result');

    input.value = 'hello';
    window.testValue();

    expect(result.textContent).toContain('Truthy');
    expect(result.style.color).toBe('green');
  });

  it('数値の1がTruthyと判定される', () => {
    const input = document.getElementById('valueInput');
    const result = document.getElementById('result');

    input.value = '1';
    window.testValue();

    expect(result.textContent).toContain('Truthy');
    expect(result.style.color).toBe('green');
  });

  it('詳細情報が表示される', () => {
    const input = document.getElementById('valueInput');
    const detail = document.getElementById('detail');

    input.value = 'test';
    window.testValue();

    expect(detail.textContent).toContain('型:');
    expect(detail.textContent).toContain('値:');
  });
});
