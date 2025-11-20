import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 012: 総合復習', () => {
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

  it('問題1: taxRate定数が定義されている', () => {
    expect(window.taxRate).toBeDefined();
    expect(typeof window.taxRate).toBe('number');
  });

  it('問題1: 商品価格の変数が定義されている', () => {
    expect(window.applePrice).toBeDefined();
    expect(window.breadPrice).toBeDefined();
    expect(window.milkPrice).toBeDefined();
  });

  it('問題1: 税込価格が計算されている', () => {
    expect(window.appleWithTax).toBeDefined();
    expect(window.breadWithTax).toBeDefined();
    expect(window.milkWithTax).toBeDefined();
  });

  it('問題1: 合計が計算されている', () => {
    expect(window.total).toBeDefined();
    expect(window.totalWithTax).toBeDefined();
  });

  it('4つ以上の値がconsole.logで出力されている', () => {
    expect(consoleLogs.length).toBeGreaterThanOrEqual(4);
  });
});
