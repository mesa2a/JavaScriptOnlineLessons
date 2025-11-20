import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 011: 変数に再代入する', () => {
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

  it('課題1: counter変数が定義されている', () => {
    expect(window.counter).toBeDefined();
    expect(typeof window.counter).toBe('number');
  });

  it('課題1: counter変数が増加している', () => {
    // 最終的なcounter値は5になっているはず
    expect(window.counter).toBeGreaterThanOrEqual(5);
  });

  it('5つ以上の値がconsole.logで出力されている', () => {
    expect(consoleLogs.length).toBeGreaterThanOrEqual(5);
  });

  it('console.logの出力に数値が含まれている', () => {
    const hasNumbers = consoleLogs.some(log => /\d+/.test(log));
    expect(hasNumbers).toBe(true);
  });
});
