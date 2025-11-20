import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 056: switch文入門', () => {
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

  it('dayInput要素が存在する', () => {
    const input = document.getElementById('dayInput');
    expect(input).not.toBeNull();
    expect(input.tagName).toBe('INPUT');
  });

  it('dayResult要素が存在する', () => {
    const result = document.getElementById('dayResult');
    expect(result).not.toBeNull();
  });

  it('weekendResult要素が存在する', () => {
    const result = document.getElementById('weekendResult');
    expect(result).not.toBeNull();
  });

  it('checkDay関数が存在する', () => {
    expect(typeof window.checkDay).toBe('function');
  });

  it('日曜日（0）が正しく判定される', () => {
    const input = document.getElementById('dayInput');
    const dayResult = document.getElementById('dayResult');
    const weekendResult = document.getElementById('weekendResult');

    input.value = '0';
    window.checkDay();

    expect(dayResult.textContent).toBe('日曜日');
    expect(weekendResult.textContent).toBe('週末');
  });

  it('月曜日（1）が正しく判定される', () => {
    const input = document.getElementById('dayInput');
    const dayResult = document.getElementById('dayResult');
    const weekendResult = document.getElementById('weekendResult');

    input.value = '1';
    window.checkDay();

    expect(dayResult.textContent).toBe('月曜日');
    expect(weekendResult.textContent).toBe('平日');
  });

  it('水曜日（3）が正しく判定される', () => {
    const input = document.getElementById('dayInput');
    const dayResult = document.getElementById('dayResult');
    const weekendResult = document.getElementById('weekendResult');

    input.value = '3';
    window.checkDay();

    expect(dayResult.textContent).toBe('水曜日');
    expect(weekendResult.textContent).toBe('平日');
  });

  it('土曜日（6）が正しく判定され、週末として表示される', () => {
    const input = document.getElementById('dayInput');
    const dayResult = document.getElementById('dayResult');
    const weekendResult = document.getElementById('weekendResult');

    input.value = '6';
    window.checkDay();

    expect(dayResult.textContent).toBe('土曜日');
    expect(weekendResult.textContent).toBe('週末');
  });

  it('範囲外の値（7）でエラーメッセージが表示される', () => {
    const input = document.getElementById('dayInput');
    const dayResult = document.getElementById('dayResult');

    input.value = '7';
    window.checkDay();

    expect(dayResult.textContent).toContain('0から6');
  });

  it('範囲外の値（-1）でエラーメッセージが表示される', () => {
    const input = document.getElementById('dayInput');
    const dayResult = document.getElementById('dayResult');

    input.value = '-1';
    window.checkDay();

    expect(dayResult.textContent).toContain('0から6');
  });
});
