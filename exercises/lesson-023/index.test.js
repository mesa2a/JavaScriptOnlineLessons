import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 023: イベントの復習', () => {
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

  it('id="display"の初期値が"初期状態"である', () => {
    const element = document.getElementById('display');
    expect(element.textContent).toBe('初期状態');
  });

  it('showMessage1関数が定義されている', () => {
    expect(typeof window.showMessage1).toBe('function');
  });

  it('showMessage2関数が定義されている', () => {
    expect(typeof window.showMessage2).toBe('function');
  });

  it('showMessage3関数が定義されている', () => {
    expect(typeof window.showMessage3).toBe('function');
  });

  it('changeColor関数が定義されている', () => {
    expect(typeof window.changeColor).toBe('function');
  });

  it('resetDisplay関数が定義されている', () => {
    expect(typeof window.resetDisplay).toBe('function');
  });

  it('5つのボタンが存在する', () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(5);
  });

  it('1つ目のボタンのonclick属性にshowMessage1が含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[0].getAttribute('onclick');
    expect(onclick).toContain('showMessage1');
  });

  it('2つ目のボタンのonclick属性にshowMessage2が含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[1].getAttribute('onclick');
    expect(onclick).toContain('showMessage2');
  });

  it('3つ目のボタンのonclick属性にshowMessage3が含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[2].getAttribute('onclick');
    expect(onclick).toContain('showMessage3');
  });

  it('4つ目のボタンのonclick属性にchangeColorが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[3].getAttribute('onclick');
    expect(onclick).toContain('changeColor');
  });

  it('5つ目のボタンのonclick属性にresetDisplayが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[4].getAttribute('onclick');
    expect(onclick).toContain('resetDisplay');
  });

  it('showMessage1関数を実行するとtextContentが"メッセージ1"になる', () => {
    window.showMessage1();
    const element = document.getElementById('display');
    expect(element.textContent).toBe('メッセージ1');
  });

  it('showMessage2関数を実行するとtextContentが"メッセージ2"になる', () => {
    window.showMessage2();
    const element = document.getElementById('display');
    expect(element.textContent).toBe('メッセージ2');
  });

  it('showMessage3関数を実行するとtextContentが"メッセージ3"になる', () => {
    window.showMessage3();
    const element = document.getElementById('display');
    expect(element.textContent).toBe('メッセージ3');
  });

  it('changeColor関数を実行するとstyle.colorが変更される', () => {
    window.changeColor('red');
    const element = document.getElementById('display');
    expect(element.style.color).toBe('red');
  });

  it('resetDisplay関数を実行するとtextContentが"初期状態"に戻る', () => {
    const element = document.getElementById('display');
    element.textContent = 'テスト';
    window.resetDisplay();
    expect(element.textContent).toBe('初期状態');
  });

  it('resetDisplay関数を実行するとstyle.colorが"black"に戻る', () => {
    const element = document.getElementById('display');
    element.style.color = 'red';
    window.resetDisplay();
    expect(element.style.color).toBe('black');
  });
});
