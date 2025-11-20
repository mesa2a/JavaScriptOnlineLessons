import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 024: ミニプロジェクト', () => {
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

  it('HTMLにid="display"の要素が存在する', () => {
    const element = document.getElementById('display');
    expect(element).not.toBeNull();
  });

  it('HTMLにid="counter"の要素が存在する', () => {
    const element = document.getElementById('counter');
    expect(element).not.toBeNull();
  });

  it('id="counter"の初期値が"0"である', () => {
    const element = document.getElementById('counter');
    expect(element.textContent).toBe('0');
  });

  it('count変数が定義されている', () => {
    expect(window.count).toBeDefined();
  });

  it('countの初期値が0である', () => {
    expect(window.count).toBe(0);
  });

  it('setRed関数が定義されている', () => {
    expect(typeof window.setRed).toBe('function');
  });

  it('setBlue関数が定義されている', () => {
    expect(typeof window.setBlue).toBe('function');
  });

  it('setGreen関数が定義されている', () => {
    expect(typeof window.setGreen).toBe('function');
  });

  it('resetCounter関数が定義されている', () => {
    expect(typeof window.resetCounter).toBe('function');
  });

  it('4つのボタンが存在する', () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(4);
  });

  it('1つ目のボタンのonclick属性にsetRedが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[0].getAttribute('onclick');
    expect(onclick).toContain('setRed');
  });

  it('2つ目のボタンのonclick属性にsetBlueが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[1].getAttribute('onclick');
    expect(onclick).toContain('setBlue');
  });

  it('3つ目のボタンのonclick属性にsetGreenが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[2].getAttribute('onclick');
    expect(onclick).toContain('setGreen');
  });

  it('4つ目のボタンのonclick属性にresetCounterが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[3].getAttribute('onclick');
    expect(onclick).toContain('resetCounter');
  });

  it('setRed関数を実行するとcountが1増える', () => {
    window.count = 0;
    window.setRed();
    expect(window.count).toBe(1);
  });

  it('setRed関数を実行するとid="display"の背景色が赤になる', () => {
    window.setRed();
    const display = document.getElementById('display');
    expect(display.style.backgroundColor).toBe('red');
  });

  it('setRed関数を実行するとid="counter"のtextContentが更新される', () => {
    window.count = 0;
    window.setRed();
    const counter = document.getElementById('counter');
    expect(counter.textContent).toBe('1');
  });

  it('setBlue関数を実行するとcountが1増える', () => {
    window.count = 0;
    window.setBlue();
    expect(window.count).toBe(1);
  });

  it('setBlue関数を実行するとid="display"の背景色が青になる', () => {
    window.setBlue();
    const display = document.getElementById('display');
    expect(display.style.backgroundColor).toBe('blue');
  });

  it('setBlue関数を実行するとid="counter"のtextContentが更新される', () => {
    window.count = 0;
    window.setBlue();
    const counter = document.getElementById('counter');
    expect(counter.textContent).toBe('1');
  });

  it('setGreen関数を実行するとcountが1増える', () => {
    window.count = 0;
    window.setGreen();
    expect(window.count).toBe(1);
  });

  it('setGreen関数を実行するとid="display"の背景色が緑になる', () => {
    window.setGreen();
    const display = document.getElementById('display');
    expect(display.style.backgroundColor).toBe('green');
  });

  it('setGreen関数を実行するとid="counter"のtextContentが更新される', () => {
    window.count = 0;
    window.setGreen();
    const counter = document.getElementById('counter');
    expect(counter.textContent).toBe('1');
  });

  it('resetCounter関数を実行するとcountが0になる', () => {
    window.count = 5;
    window.resetCounter();
    expect(window.count).toBe(0);
  });

  it('resetCounter関数を実行すると背景色が白になる', () => {
    window.resetCounter();
    const display = document.getElementById('display');
    expect(display.style.backgroundColor).toBe('white');
  });

  it('resetCounter関数を実行するとid="counter"のtextContentが"0"になる', () => {
    window.count = 10;
    const counter = document.getElementById('counter');
    counter.textContent = '10';
    window.resetCounter();
    expect(counter.textContent).toBe('0');
  });
});
