import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 027: confirmで確認', () => {
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

  it('checkReady関数が定義されている', () => {
    expect(typeof window.checkReady).toBe('function');
  });

  it('checkContinue関数が定義されている', () => {
    expect(typeof window.checkContinue).toBe('function');
  });

  it('checkAgree関数が定義されている', () => {
    expect(typeof window.checkAgree).toBe('function');
  });

  it('3つのボタンが存在する', () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('1つ目のボタンのonclick属性にcheckReadyが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[0].getAttribute('onclick');
    expect(onclick).toContain('checkReady');
  });

  it('2つ目のボタンのonclick属性にcheckContinueが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[1].getAttribute('onclick');
    expect(onclick).toContain('checkContinue');
  });

  it('3つ目のボタンのonclick属性にcheckAgreeが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[2].getAttribute('onclick');
    expect(onclick).toContain('checkAgree');
  });

  it('checkReady関数を実行するとconfirmが呼ばれる', () => {
    window.confirm = vi.fn().mockReturnValue(true);
    window.checkReady();
    expect(window.confirm).toHaveBeenCalled();
  });

  it('checkReady関数でOKを押すとtrueが表示される', () => {
    window.confirm = vi.fn().mockReturnValue(true);
    window.checkReady();
    const element = document.getElementById('result1');
    expect(element.textContent).toContain('準備');
    expect(element.textContent).toContain('true');
  });

  it('checkReady関数でキャンセルを押すとfalseが表示される', () => {
    window.confirm = vi.fn().mockReturnValue(false);
    window.checkReady();
    const element = document.getElementById('result1');
    expect(element.textContent).toContain('準備');
    expect(element.textContent).toContain('false');
  });

  it('checkContinue関数を実行するとconfirmが呼ばれる', () => {
    window.confirm = vi.fn().mockReturnValue(true);
    window.checkContinue();
    expect(window.confirm).toHaveBeenCalled();
  });

  it('checkContinue関数でOKを押すとtrueが表示される', () => {
    window.confirm = vi.fn().mockReturnValue(true);
    window.checkContinue();
    const element = document.getElementById('result2');
    expect(element.textContent).toContain('続行');
    expect(element.textContent).toContain('true');
  });

  it('checkContinue関数でキャンセルを押すとfalseが表示される', () => {
    window.confirm = vi.fn().mockReturnValue(false);
    window.checkContinue();
    const element = document.getElementById('result2');
    expect(element.textContent).toContain('続行');
    expect(element.textContent).toContain('false');
  });

  it('checkAgree関数を実行するとconfirmが呼ばれる', () => {
    window.confirm = vi.fn().mockReturnValue(true);
    window.checkAgree();
    expect(window.confirm).toHaveBeenCalled();
  });

  it('checkAgree関数でOKを押すとtrueが表示される', () => {
    window.confirm = vi.fn().mockReturnValue(true);
    window.checkAgree();
    const element = document.getElementById('result3');
    expect(element.textContent).toContain('同意');
    expect(element.textContent).toContain('true');
  });

  it('checkAgree関数でキャンセルを押すとfalseが表示される', () => {
    window.confirm = vi.fn().mockReturnValue(false);
    window.checkAgree();
    const element = document.getElementById('result3');
    expect(element.textContent).toContain('同意');
    expect(element.textContent).toContain('false');
  });
});
