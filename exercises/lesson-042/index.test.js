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

describe('Lesson 42: バリデーション基礎', () => {
  describe('HTML要素の確認', () => {
    it('id="name"のinput要素が存在する', () => {
      const elem = document.getElementById('name');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
    });

    it('onclick="validate()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const validateButton = buttons.find(btn => btn.getAttribute('onclick') === 'validate()');
      expect(validateButton).not.toBeNull();
    });

    it('id="message"の要素が存在する', () => {
      const elem = document.getElementById('message');
      expect(elem).not.toBeNull();
    });
  });

  describe('validate関数の確認', () => {
    it('validate関数が定義されている', () => {
      expect(typeof window.validate).toBe('function');
    });

    it('空文字の場合、エラーメッセージを表示する', () => {
      document.getElementById('name').value = '';
      window.validate();
      const message = document.getElementById('message');
      expect(message.textContent).toContain('入力');
    });

    it('3文字未満の場合、エラーメッセージを表示する', () => {
      document.getElementById('name').value = 'ab';
      window.validate();
      const message = document.getElementById('message');
      expect(message.textContent).not.toBe('OK');
    });

    it('10文字より多い場合、エラーメッセージを表示する', () => {
      document.getElementById('name').value = '12345678901';
      window.validate();
      const message = document.getElementById('message');
      expect(message.textContent).not.toBe('OK');
    });

    it('3文字以上10文字以下の場合、OKを表示する', () => {
      document.getElementById('name').value = 'abcde';
      window.validate();
      const message = document.getElementById('message');
      expect(message.textContent).toContain('OK');
    });
  });

  describe('スクリプト内容の確認', () => {
    it('lengthプロパティが使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('.length');
    });

    it('複数のif文またはelse if文が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      const ifMatches = scriptContent.match(/if\s*\(|else\s+if\s*\(/g);
      expect(ifMatches).not.toBeNull();
      expect(ifMatches.length).toBeGreaterThanOrEqual(2);
    });
  });
});
