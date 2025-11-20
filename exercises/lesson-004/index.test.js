import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 004: 初めてのHTMLファイル', () => {
  let consoleLogs;

  beforeEach(() => {
    // console.logの出力をキャプチャ
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
      beforeParse(window) {
        window.console.log = mockConsoleLog;
      }
    });
  });

  it('4つの値が出力されている', () => {
    expect(consoleLogs.length).toBe(4);
  });

  it('1つ目は文字列（名前）が出力されている', () => {
    expect(typeof consoleLogs[0]).toBe('string');
    expect(consoleLogs[0].length).toBeGreaterThan(0);
  });

  it('2つ目は数値が出力されている', () => {
    const value = parseFloat(consoleLogs[1]);
    expect(!isNaN(value)).toBe(true);
  });

  it('3つ目は2つ目の値の2倍になっている', () => {
    const secondValue = parseFloat(consoleLogs[1]);
    const thirdValue = parseFloat(consoleLogs[2]);
    expect(thirdValue).toBe(secondValue * 2);
  });

  it('4つ目は「完了」という文字列が出力されている', () => {
    expect(consoleLogs[3]).toContain('完了');
  });
});
