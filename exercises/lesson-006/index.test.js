import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 006: ユーザーとの会話を作る', () => {
  let html;
  let alertCalls;
  let confirmCalls;

  beforeEach(() => {
    html = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );

    alertCalls = [];
    confirmCalls = [];

    const mockAlert = vi.fn((message) => {
      alertCalls.push(message);
    });

    const mockConfirm = vi.fn((message) => {
      confirmCalls.push(message);
      return true;
    });

    const dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
      beforeParse(window) {
        window.alert = mockAlert;
        window.confirm = mockConfirm;
      }
    });
  });

  it('alert()が少なくとも3回呼ばれている', () => {
    expect(alertCalls.length).toBeGreaterThanOrEqual(3);
  });

  it('alert()に文字列が渡されている', () => {
    expect(alertCalls.length).toBeGreaterThan(0);
    alertCalls.forEach(call => {
      expect(typeof call === 'string' || typeof call === 'number').toBe(true);
    });
  });

  it('scriptタグが正しく記述されている', () => {
    expect(html).toContain('<script>');
    expect(html).toContain('</script>');
  });
});
