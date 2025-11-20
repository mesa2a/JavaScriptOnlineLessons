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

describe('Lesson 44: AND演算（&&）', () => {
  describe('HTML要素の確認', () => {
    it('id="age"のinput要素が存在する', () => {
      const elem = document.getElementById('age');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
    });

    it('id="hasTicket"のinput要素(checkbox)が存在する', () => {
      const elem = document.getElementById('hasTicket');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
      expect(elem.type).toBe('checkbox');
    });

    it('onclick="checkEntry()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const checkButton = buttons.find(btn => btn.getAttribute('onclick') === 'checkEntry()');
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

  describe('checkEntry関数の確認', () => {
    it('checkEntry関数が定義されている', () => {
      expect(typeof window.checkEntry).toBe('function');
    });

    it('年齢が数値でない場合、エラーメッセージを表示する', () => {
      document.getElementById('age').value = 'abc';
      document.getElementById('hasTicket').checked = true;
      window.checkEntry();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
      expect(error.textContent).toContain('数値');
    });

    it('年齢が12歳以上でチケットを持っている場合、"入場できます"を表示する', () => {
      document.getElementById('age').value = '15';
      document.getElementById('hasTicket').checked = true;
      window.checkEntry();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('入場できます');
    });

    it('年齢が12歳未満の場合、"入場できません"を表示する', () => {
      document.getElementById('age').value = '10';
      document.getElementById('hasTicket').checked = true;
      window.checkEntry();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('入場できません');
    });

    it('チケットを持っていない場合、"入場できません"を表示する', () => {
      document.getElementById('age').value = '15';
      document.getElementById('hasTicket').checked = false;
      window.checkEntry();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('入場できません');
    });

    it('年齢が12歳未満でチケットも持っていない場合、"入場できません"を表示する', () => {
      document.getElementById('age').value = '10';
      document.getElementById('hasTicket').checked = false;
      window.checkEntry();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('入場できません');
    });

    it('年齢が12歳ちょうどでチケットを持っている場合、"入場できます"を表示する', () => {
      document.getElementById('age').value = '12';
      document.getElementById('hasTicket').checked = true;
      window.checkEntry();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('入場できます');
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

    it('.checkedプロパティが使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('.checked');
    });
  });
});
