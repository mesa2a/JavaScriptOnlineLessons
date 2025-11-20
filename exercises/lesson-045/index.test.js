import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
let dom;
let document;
let window;

beforeEach(() => {
  dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
  document = dom.window.document;
  window = dom.window;

  const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
  const scriptEl = document.createElement('script');
  scriptEl.textContent = scriptContent;
  document.head.appendChild(scriptEl);
});

describe('Lesson 45: OR演算（||）', () => {
  describe('HTML要素の確認', () => {
    it('id="day"のinput要素が存在する', () => {
      const elem = document.getElementById('day');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
    });

    it('onclick="checkDay()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const checkButton = buttons.find(btn => btn.getAttribute('onclick') === 'checkDay()');
      expect(checkButton).not.toBeNull();
    });

    it('id="result"の要素が存在する', () => {
      const elem = document.getElementById('result');
      expect(elem).not.toBeNull();
    });
  });

  describe('checkDay関数の確認', () => {
    it('checkDay関数が定義されている', () => {
      expect(typeof window.checkDay).toBe('function');
    });

    it('土曜日の場合、"休みです"を表示する', () => {
      document.getElementById('day').value = '土曜日';
      window.checkDay();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('休みです');
    });

    it('日曜日の場合、"休みです"を表示する', () => {
      document.getElementById('day').value = '日曜日';
      window.checkDay();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('休みです');
    });

    it('月曜日の場合、"平日です"を表示する', () => {
      document.getElementById('day').value = '月曜日';
      window.checkDay();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('平日です');
    });

    it('火曜日の場合、"平日です"を表示する', () => {
      document.getElementById('day').value = '火曜日';
      window.checkDay();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('平日です');
    });

    it('水曜日の場合、"平日です"を表示する', () => {
      document.getElementById('day').value = '水曜日';
      window.checkDay();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('平日です');
    });

    it('木曜日の場合、"平日です"を表示する', () => {
      document.getElementById('day').value = '木曜日';
      window.checkDay();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('平日です');
    });

    it('金曜日の場合、"平日です"を表示する', () => {
      document.getElementById('day').value = '金曜日';
      window.checkDay();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('平日です');
    });
  });

  describe('スクリプト内容の確認', () => {
    it('OR演算子(||)が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('||');
    });
  });
});
