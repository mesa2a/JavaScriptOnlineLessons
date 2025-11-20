import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 005: 開発サイクルを習慣にする', () => {
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

  it('課題1: 自己紹介が3行出力されている', () => {
    // 最初の3行が自己紹介（名前、年齢、住所）
    expect(consoleLogs.length).toBeGreaterThanOrEqual(3);
    expect(consoleLogs[0]).toMatch(/名前/);
    expect(consoleLogs[1]).toMatch(/年齢|歳/);
    expect(consoleLogs[2]).toMatch(/住所|都|道|府|県/);
  });

  it('課題2: 今日の予定が4行出力されている', () => {
    // 「今日の予定」+ 3つの予定
    const scheduleStart = consoleLogs.findIndex(log => log.includes('今日の予定'));
    expect(scheduleStart).toBeGreaterThanOrEqual(0);
    expect(consoleLogs[scheduleStart + 1]).toMatch(/1\./);
    expect(consoleLogs[scheduleStart + 2]).toMatch(/2\./);
    expect(consoleLogs[scheduleStart + 3]).toMatch(/3\./);
  });

  it('課題3: 計算結果が5行出力されている', () => {
    // 100から1を引き続けた結果: 99, 98, 97, 96, 95
    const lastFiveLogs = consoleLogs.slice(-5);
    expect(lastFiveLogs[0]).toContain('99');
    expect(lastFiveLogs[1]).toContain('98');
    expect(lastFiveLogs[2]).toContain('97');
    expect(lastFiveLogs[3]).toContain('96');
    expect(lastFiveLogs[4]).toContain('95');
  });
});
