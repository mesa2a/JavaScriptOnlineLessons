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

describe('Lesson 50: 組み合わせ条件', () => {
  describe('HTML要素の確認', () => {
    it('id="isWeekday"のinput要素(checkbox)が存在する', () => {
      const elem = document.getElementById('isWeekday');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
      expect(elem.type).toBe('checkbox');
    });

    it('id="isMember"のinput要素(checkbox)が存在する', () => {
      const elem = document.getElementById('isMember');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
      expect(elem.type).toBe('checkbox');
    });

    it('id="partySize"のinput要素が存在する', () => {
      const elem = document.getElementById('partySize');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
    });

    it('onclick="checkReservation()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const checkButton = buttons.find(btn => btn.getAttribute('onclick') === 'checkReservation()');
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

  describe('checkReservation関数の確認', () => {
    it('checkReservation関数が定義されている', () => {
      expect(typeof window.checkReservation).toBe('function');
    });

    it('人数が数値でない場合、エラーメッセージを表示する', () => {
      document.getElementById('isWeekday').checked = true;
      document.getElementById('isMember').checked = false;
      document.getElementById('partySize').value = 'abc';
      window.checkReservation();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
      expect(error.textContent).toContain('数値');
    });

    it('平日で4人以下の場合、"予約できます"を表示する', () => {
      document.getElementById('isWeekday').checked = true;
      document.getElementById('isMember').checked = false;
      document.getElementById('partySize').value = '3';
      window.checkReservation();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('予約できます');
    });

    it('会員で4人以下の場合、"予約できます"を表示する', () => {
      document.getElementById('isWeekday').checked = false;
      document.getElementById('isMember').checked = true;
      document.getElementById('partySize').value = '2';
      window.checkReservation();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('予約できます');
    });

    it('平日でも会員でもない場合、"予約できません"を表示する', () => {
      document.getElementById('isWeekday').checked = false;
      document.getElementById('isMember').checked = false;
      document.getElementById('partySize').value = '3';
      window.checkReservation();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('予約できません');
    });

    it('平日だが5人以上の場合、"予約できません"を表示する', () => {
      document.getElementById('isWeekday').checked = true;
      document.getElementById('isMember').checked = false;
      document.getElementById('partySize').value = '5';
      window.checkReservation();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('予約できません');
    });

    it('会員だが5人以上の場合、"予約できません"を表示する', () => {
      document.getElementById('isWeekday').checked = false;
      document.getElementById('isMember').checked = true;
      document.getElementById('partySize').value = '6';
      window.checkReservation();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('予約できません');
    });

    it('平日で会員で4人の場合、"予約できます"を表示する', () => {
      document.getElementById('isWeekday').checked = true;
      document.getElementById('isMember').checked = true;
      document.getElementById('partySize').value = '4';
      window.checkReservation();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('予約できます');
    });
  });

  describe('スクリプト内容の確認', () => {
    it('AND演算子(&&)が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('&&');
    });

    it('OR演算子(||)が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('||');
    });

    it('isNaNが使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('isNaN');
    });
  });
});
