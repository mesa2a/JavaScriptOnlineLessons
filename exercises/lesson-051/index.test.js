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

describe('Lesson 51: 範囲判定', () => {
  describe('HTML要素の確認', () => {
    it('id="hour"のinput要素が存在する', () => {
      const elem = document.getElementById('hour');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
    });

    it('id="isWeekend"のinput要素(checkbox)が存在する', () => {
      const elem = document.getElementById('isWeekend');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
      expect(elem.type).toBe('checkbox');
    });

    it('onclick="checkBusinessHours()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const checkButton = buttons.find(btn => btn.getAttribute('onclick') === 'checkBusinessHours()');
      expect(checkButton).not.toBeNull();
    });

    it('id="result"の要素が存在する', () => {
      const elem = document.getElementById('result');
      expect(elem).not.toBeNull();
    });

    it('id="error"の要素が存在する', () => {
      const elem = document.getElementById('error');
      expect(elem).not.toBeNull();
    });
  });

  describe('checkBusinessHours関数の確認', () => {
    it('checkBusinessHours関数が定義されている', () => {
      expect(typeof window.checkBusinessHours).toBe('function');
    });

    it('時刻が数値でない場合、エラーメッセージを表示する', () => {
      document.getElementById('hour').value = 'abc';
      document.getElementById('isWeekend').checked = false;
      window.checkBusinessHours();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
      expect(error.textContent).toContain('数値');
    });

    it('平日の9時の場合、"営業中です"を表示する', () => {
      document.getElementById('hour').value = '9';
      document.getElementById('isWeekend').checked = false;
      window.checkBusinessHours();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('営業中です');
    });

    it('平日の12時の場合、"営業中です"を表示する', () => {
      document.getElementById('hour').value = '12';
      document.getElementById('isWeekend').checked = false;
      window.checkBusinessHours();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('営業中です');
    });

    it('平日の17時の場合、"営業中です"を表示する', () => {
      document.getElementById('hour').value = '17';
      document.getElementById('isWeekend').checked = false;
      window.checkBusinessHours();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('営業中です');
    });

    it('平日の8時の場合、"営業時間外です"を表示する', () => {
      document.getElementById('hour').value = '8';
      document.getElementById('isWeekend').checked = false;
      window.checkBusinessHours();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('営業時間外です');
    });

    it('平日の18時の場合、"営業時間外です"を表示する', () => {
      document.getElementById('hour').value = '18';
      document.getElementById('isWeekend').checked = false;
      window.checkBusinessHours();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('営業時間外です');
    });

    it('土日の10時の場合、"営業中です"を表示する', () => {
      document.getElementById('hour').value = '10';
      document.getElementById('isWeekend').checked = true;
      window.checkBusinessHours();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('営業中です');
    });

    it('土日の15時の場合、"営業中です"を表示する', () => {
      document.getElementById('hour').value = '15';
      document.getElementById('isWeekend').checked = true;
      window.checkBusinessHours();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('営業中です');
    });

    it('土日の19時の場合、"営業中です"を表示する', () => {
      document.getElementById('hour').value = '19';
      document.getElementById('isWeekend').checked = true;
      window.checkBusinessHours();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('営業中です');
    });

    it('土日の9時の場合、"営業時間外です"を表示する', () => {
      document.getElementById('hour').value = '9';
      document.getElementById('isWeekend').checked = true;
      window.checkBusinessHours();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('営業時間外です');
    });

    it('土日の20時の場合、"営業時間外です"を表示する', () => {
      document.getElementById('hour').value = '20';
      document.getElementById('isWeekend').checked = true;
      window.checkBusinessHours();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('営業時間外です');
    });
  });

  describe('スクリプト内容の確認', () => {
    it('AND演算子(&&)が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('&&');
    });

    it('isNaNが使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('isNaN');
    });

    it('範囲判定(>=と<)が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('>=');
      expect(scriptContent).toContain('<');
    });
  });
});
