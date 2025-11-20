import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 026: 数値の入力', () => {
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

  it('calculateAge関数が定義されている', () => {
    expect(typeof window.calculateAge).toBe('function');
  });

  it('calculateDouble関数が定義されている', () => {
    expect(typeof window.calculateDouble).toBe('function');
  });

  it('calculateSum関数が定義されている', () => {
    expect(typeof window.calculateSum).toBe('function');
  });

  it('3つのボタンが存在する', () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('1つ目のボタンのonclick属性にcalculateAgeが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[0].getAttribute('onclick');
    expect(onclick).toContain('calculateAge');
  });

  it('2つ目のボタンのonclick属性にcalculateDoubleが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[1].getAttribute('onclick');
    expect(onclick).toContain('calculateDouble');
  });

  it('3つ目のボタンのonclick属性にcalculateSumが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[2].getAttribute('onclick');
    expect(onclick).toContain('calculateSum');
  });

  it('calculateAge関数を実行すると正しく計算される', () => {
    window.prompt = vi.fn().mockReturnValue('20');
    window.calculateAge();
    const element = document.getElementById('result1');
    expect(element.textContent).toContain('10年後');
    expect(element.textContent).toContain('30');
  });

  it('calculateDouble関数を実行すると正しく計算される', () => {
    window.prompt = vi.fn().mockReturnValue('15');
    window.calculateDouble();
    const element = document.getElementById('result2');
    expect(element.textContent).toContain('2倍');
    expect(element.textContent).toContain('30');
  });

  it('calculateSum関数を実行すると正しく計算される', () => {
    const prompts = ['10', '25'];
    let callCount = 0;
    window.prompt = vi.fn(() => prompts[callCount++]);
    window.calculateSum();
    const element = document.getElementById('result3');
    expect(element.textContent).toContain('合計');
    expect(element.textContent).toContain('35');
  });

  it('calculateAge関数は数値として計算している（文字列連結ではない）', () => {
    window.prompt = vi.fn().mockReturnValue('5');
    window.calculateAge();
    const element = document.getElementById('result1');
    // 文字列連結だと"510"になるが、正しくは15
    expect(element.textContent).not.toContain('510');
    expect(element.textContent).toContain('15');
  });

  it('calculateDouble関数は数値として計算している（文字列連結ではない）', () => {
    window.prompt = vi.fn().mockReturnValue('7');
    window.calculateDouble();
    const element = document.getElementById('result2');
    // 文字列連結だと"77"になるが、正しくは14
    expect(element.textContent).not.toContain('77');
    expect(element.textContent).toContain('14');
  });

  it('calculateSum関数は数値として計算している（文字列連結ではない）', () => {
    const prompts = ['3', '4'];
    let callCount = 0;
    window.prompt = vi.fn(() => prompts[callCount++]);
    window.calculateSum();
    const element = document.getElementById('result3');
    // 文字列連結だと"34"になるが、正しくは7
    expect(element.textContent).not.toContain('34');
    expect(element.textContent).toContain('7');
  });
});
