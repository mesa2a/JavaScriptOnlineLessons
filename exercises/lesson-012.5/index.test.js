import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 012.5: 外部JavaScriptファイルの読み込み', () => {
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

  it('課題1: console.logが実行されている', () => {
    expect(consoleLogs.length).toBeGreaterThanOrEqual(2);
  });

  it('課題1: message変数が定義されている', () => {
    expect(window.message).toBeDefined();
    expect(typeof window.message).toBe('string');
  });

  it('HTMLにscriptタグのsrc属性が記述されている', () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );
    expect(html).toMatch(/<script\s+src=["']script\.js["']/);
  });
});
