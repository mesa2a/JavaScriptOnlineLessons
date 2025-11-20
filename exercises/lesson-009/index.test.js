import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 009: 文字列と連結', () => {
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
    const dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
      beforeParse(win) {
        win.console.log = mockConsoleLog;
      }
    });
    window = dom.window;
  });

  it('課題1: firstName変数が定義されている', () => {
    expect(window.firstName).toBeDefined();
    expect(typeof window.firstName).toBe('string');
  });

  it('課題1: lastName変数が定義されている', () => {
    expect(window.lastName).toBeDefined();
    expect(typeof window.lastName).toBe('string');
  });

  it('課題1: fullName変数が連結されている', () => {
    expect(window.fullName).toBeDefined();
    expect(window.fullName).toBe(window.firstName + window.lastName);
  });

  it('3つ以上の値がconsole.logで出力されている', () => {
    expect(consoleLogs.length).toBeGreaterThanOrEqual(3);
  });
});
