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

describe('Lesson 52: 入力検証', () => {
  describe('HTML要素の確認', () => {
    it('id="username"のinput要素が存在する', () => {
      const elem = document.getElementById('username');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
    });

    it('id="password"のinput要素が存在する', () => {
      const elem = document.getElementById('password');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
    });

    it('id="age"のinput要素が存在する', () => {
      const elem = document.getElementById('age');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
    });

    it('onclick="validateRegistration()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const validateButton = buttons.find(btn => btn.getAttribute('onclick') === 'validateRegistration()');
      expect(validateButton).not.toBeNull();
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

  describe('validateRegistration関数の確認', () => {
    it('validateRegistration関数が定義されている', () => {
      expect(typeof window.validateRegistration).toBe('function');
    });

    it('ユーザー名が空の場合、エラーメッセージを表示する', () => {
      document.getElementById('username').value = '';
      document.getElementById('password').value = 'password123';
      document.getElementById('age').value = '20';
      window.validateRegistration();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
      expect(error.textContent).toContain('ユーザー名');
    });

    it('ユーザー名が3文字未満の場合、エラーメッセージを表示する', () => {
      document.getElementById('username').value = 'ab';
      document.getElementById('password').value = 'password123';
      document.getElementById('age').value = '20';
      window.validateRegistration();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
    });

    it('ユーザー名が15文字より大きい場合、エラーメッセージを表示する', () => {
      document.getElementById('username').value = 'abcdefghijklmnop';
      document.getElementById('password').value = 'password123';
      document.getElementById('age').value = '20';
      window.validateRegistration();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
    });

    it('パスワードが空の場合、エラーメッセージを表示する', () => {
      document.getElementById('username').value = 'user123';
      document.getElementById('password').value = '';
      document.getElementById('age').value = '20';
      window.validateRegistration();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
      expect(error.textContent).toContain('パスワード');
    });

    it('パスワードが6文字未満の場合、エラーメッセージを表示する', () => {
      document.getElementById('username').value = 'user123';
      document.getElementById('password').value = 'pass';
      document.getElementById('age').value = '20';
      window.validateRegistration();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
    });

    it('年齢が数値でない場合、エラーメッセージを表示する', () => {
      document.getElementById('username').value = 'user123';
      document.getElementById('password').value = 'password123';
      document.getElementById('age').value = 'abc';
      window.validateRegistration();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
      expect(error.textContent).toContain('数値');
    });

    it('年齢が13歳未満の場合、エラーメッセージを表示する', () => {
      document.getElementById('username').value = 'user123';
      document.getElementById('password').value = 'password123';
      document.getElementById('age').value = '12';
      window.validateRegistration();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
    });

    it('すべての入力が正しい場合、"登録できます"を表示する', () => {
      document.getElementById('username').value = 'user123';
      document.getElementById('password').value = 'password123';
      document.getElementById('age').value = '20';
      window.validateRegistration();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('登録できます');
    });
  });

  describe('スクリプト内容の確認', () => {
    it('isNaNが使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('isNaN');
    });

    it('.lengthプロパティが使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('.length');
    });

    it('returnが使用されている(早期リターン)', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('return');
    });
  });
});
