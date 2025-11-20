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

describe('Lesson 47: 複雑な条件', () => {
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

    it('id="isVIP"のinput要素(checkbox)が存在する', () => {
      const elem = document.getElementById('isVIP');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
      expect(elem.type).toBe('checkbox');
    });

    it('onclick="checkEvent()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const checkButton = buttons.find(btn => btn.getAttribute('onclick') === 'checkEvent()');
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

  describe('checkEvent関数の確認', () => {
    it('checkEvent関数が定義されている', () => {
      expect(typeof window.checkEvent).toBe('function');
    });

    it('年齢が数値でない場合、エラーメッセージを表示する', () => {
      document.getElementById('age').value = 'abc';
      document.getElementById('hasTicket').checked = true;
      document.getElementById('isVIP').checked = false;
      window.checkEvent();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
      expect(error.textContent).toContain('数値');
    });

    it('18歳以上でチケットを持っている場合、"参加できます"を表示する', () => {
      document.getElementById('age').value = '20';
      document.getElementById('hasTicket').checked = true;
      document.getElementById('isVIP').checked = false;
      window.checkEvent();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('参加できます');
    });

    it('VIP会員の場合、年齢やチケットに関わらず"参加できます"を表示する', () => {
      document.getElementById('age').value = '15';
      document.getElementById('hasTicket').checked = false;
      document.getElementById('isVIP').checked = true;
      window.checkEvent();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('参加できます');
    });

    it('18歳未満でチケットを持っていない場合、"参加できません"を表示する', () => {
      document.getElementById('age').value = '15';
      document.getElementById('hasTicket').checked = false;
      document.getElementById('isVIP').checked = false;
      window.checkEvent();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('参加できません');
    });

    it('18歳以上でもチケットを持っていない場合、"参加できません"を表示する', () => {
      document.getElementById('age').value = '20';
      document.getElementById('hasTicket').checked = false;
      document.getElementById('isVIP').checked = false;
      window.checkEvent();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('参加できません');
    });

    it('18歳未満でチケットを持っていてもVIPでない場合、"参加できません"を表示する', () => {
      document.getElementById('age').value = '15';
      document.getElementById('hasTicket').checked = true;
      document.getElementById('isVIP').checked = false;
      window.checkEvent();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('参加できません');
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
