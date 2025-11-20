import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 025: promptの基本', () => {
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

  it('askQuestion1関数が定義されている', () => {
    expect(typeof window.askQuestion1).toBe('function');
  });

  it('askQuestion2関数が定義されている', () => {
    expect(typeof window.askQuestion2).toBe('function');
  });

  it('askQuestion3関数が定義されている', () => {
    expect(typeof window.askQuestion3).toBe('function');
  });

  it('3つのボタンが存在する', () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('1つ目のボタンのonclick属性にaskQuestion1が含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[0].getAttribute('onclick');
    expect(onclick).toContain('askQuestion1');
  });

  it('2つ目のボタンのonclick属性にaskQuestion2が含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[1].getAttribute('onclick');
    expect(onclick).toContain('askQuestion2');
  });

  it('3つ目のボタンのonclick属性にaskQuestion3が含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[2].getAttribute('onclick');
    expect(onclick).toContain('askQuestion3');
  });

  it('askQuestion1関数を実行するとpromptが呼ばれる', () => {
    window.prompt = vi.fn().mockReturnValue('ラーメン');
    window.askQuestion1();
    expect(window.prompt).toHaveBeenCalled();
  });

  it('askQuestion1関数を実行するとid="result1"のtextContentが更新される', () => {
    window.prompt = vi.fn().mockReturnValue('ラーメン');
    window.askQuestion1();
    const element = document.getElementById('result1');
    expect(element.textContent).toContain('好きな食べ物');
    expect(element.textContent).toContain('ラーメン');
  });

  it('askQuestion2関数を実行するとpromptが呼ばれる', () => {
    window.prompt = vi.fn().mockReturnValue('青');
    window.askQuestion2();
    expect(window.prompt).toHaveBeenCalled();
  });

  it('askQuestion2関数を実行するとid="result2"のtextContentが更新される', () => {
    window.prompt = vi.fn().mockReturnValue('青');
    window.askQuestion2();
    const element = document.getElementById('result2');
    expect(element.textContent).toContain('好きな色');
    expect(element.textContent).toContain('青');
  });

  it('askQuestion3関数を実行するとpromptが呼ばれる', () => {
    window.prompt = vi.fn().mockReturnValue('犬');
    window.askQuestion3();
    expect(window.prompt).toHaveBeenCalled();
  });

  it('askQuestion3関数を実行するとid="result3"のtextContentが更新される', () => {
    window.prompt = vi.fn().mockReturnValue('犬');
    window.askQuestion3();
    const element = document.getElementById('result3');
    expect(element.textContent).toContain('好きな動物');
    expect(element.textContent).toContain('犬');
  });
});
