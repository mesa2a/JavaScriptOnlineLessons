import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 013: 要素を取得する', () => {
  let document;
  let window;
  let consoleLogs;

  beforeEach(() => {
    consoleLogs = [];
    const mockConsoleLog = vi.fn((...args) => {
      consoleLogs.push(args.join(' '));
    });

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
    window.console.log = mockConsoleLog;

    // JavaScriptを実行
    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);
  });

  it('課題1: HTMLにid="greeting"の要素が存在する', () => {
    const element = document.getElementById('greeting');
    expect(element).not.toBeNull();
  });

  it('課題1: greetingElement変数が定義されている', () => {
    expect(window.greetingElement).toBeDefined();
  });

  it('課題1: greetingElementがDOM要素を参照している', () => {
    const element = document.getElementById('greeting');
    expect(window.greetingElement).toBe(element);
  });

  it('課題1: 要素がconsole.logで出力されている', () => {
    expect(consoleLogs.length).toBeGreaterThanOrEqual(1);
  });
});
