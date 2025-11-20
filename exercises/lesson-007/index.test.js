import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 007: 変数という箱', () => {
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

  it('課題1: name変数が定義されている', () => {
    expect(window.name).toBeDefined();
    expect(typeof window.name).toBe('string');
  });

  it('課題1: age変数が定義されている', () => {
    expect(window.age).toBeDefined();
    expect(typeof window.age).toBe('number');
  });

  it('課題1: color変数が定義されている', () => {
    expect(window.color).toBeDefined();
    expect(typeof window.color).toBe('string');
  });

  it('3つの値がconsole.logで出力されている', () => {
    expect(consoleLogs.length).toBeGreaterThanOrEqual(3);
  });
});
