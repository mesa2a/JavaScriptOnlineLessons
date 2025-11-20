import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 008: 変数で計算する', () => {
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

  it('課題1: price変数が定義されている', () => {
    expect(window.price).toBeDefined();
    expect(typeof window.price).toBe('number');
  });

  it('課題1: count変数が定義されている', () => {
    expect(window.count).toBeDefined();
    expect(typeof window.count).toBe('number');
  });

  it('課題1: total変数が計算されている', () => {
    expect(window.total).toBeDefined();
    expect(window.total).toBe(window.price * window.count);
  });

  it('3つ以上の値がconsole.logで出力されている', () => {
    expect(consoleLogs.length).toBeGreaterThanOrEqual(3);
  });
});
