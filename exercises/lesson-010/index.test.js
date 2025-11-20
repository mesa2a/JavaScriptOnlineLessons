import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 010: constで固定値を守る', () => {
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

  it('課題1: pi定数が定義されている', () => {
    expect(window.pi).toBeDefined();
    expect(typeof window.pi).toBe('number');
    expect(window.pi).toBeCloseTo(3.14, 2);
  });

  it('課題1: radius変数が定義されている', () => {
    expect(window.radius).toBeDefined();
    expect(typeof window.radius).toBe('number');
  });

  it('課題1: area変数が計算されている', () => {
    expect(window.area).toBeDefined();
    expect(window.area).toBe(window.radius * window.radius * window.pi);
  });

  it('2つ以上の値がconsole.logで出力されている', () => {
    expect(consoleLogs.length).toBeGreaterThanOrEqual(2);
  });
});
