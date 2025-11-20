import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 028: inputから取得', () => {
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

  it('showInput1関数が定義されている', () => {
    expect(typeof window.showInput1).toBe('function');
  });

  it('showInput2関数が定義されている', () => {
    expect(typeof window.showInput2).toBe('function');
  });

  it('combineInputs関数が定義されている', () => {
    expect(typeof window.combineInputs).toBe('function');
  });

  it('3つのボタンが存在する', () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('1つ目のボタンのonclick属性にshowInput1が含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[0].getAttribute('onclick');
    expect(onclick).toContain('showInput1');
  });

  it('2つ目のボタンのonclick属性にshowInput2が含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[1].getAttribute('onclick');
    expect(onclick).toContain('showInput2');
  });

  it('3つ目のボタンのonclick属性にcombineInputsが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[2].getAttribute('onclick');
    expect(onclick).toContain('combineInputs');
  });

  it('showInput1関数を実行するとinput1の値が表示される', () => {
    const input = document.getElementById('input1');
    input.value = 'テスト1';
    window.showInput1();
    const result = document.getElementById('result1');
    expect(result.textContent).toContain('入力1');
    expect(result.textContent).toContain('テスト1');
  });

  it('showInput2関数を実行するとinput2の値が表示される', () => {
    const input = document.getElementById('input2');
    input.value = 'テスト2';
    window.showInput2();
    const result = document.getElementById('result2');
    expect(result.textContent).toContain('入力2');
    expect(result.textContent).toContain('テスト2');
  });

  it('combineInputs関数を実行すると2つの入力が結合される', () => {
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    input1.value = 'こんにちは';
    input2.value = '世界';
    window.combineInputs();
    const result = document.getElementById('result3');
    expect(result.textContent).toContain('結合');
    expect(result.textContent).toContain('こんにちは');
    expect(result.textContent).toContain('世界');
  });

  it('combineInputs関数は2つの値の間にスペースを入れる', () => {
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    input1.value = 'Hello';
    input2.value = 'World';
    window.combineInputs();
    const result = document.getElementById('result3');
    expect(result.textContent).toContain('Hello World');
  });
});
