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

describe('Lesson 40: エラー処理', () => {
  describe('HTML要素の確認', () => {
    it('id="num1"のinput要素が存在する', () => {
      const elem = document.getElementById('num1');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
    });

    it('id="num2"のinput要素が存在する', () => {
      const elem = document.getElementById('num2');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
    });

    it('onclick="divide()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const divideButton = buttons.find(btn => btn.getAttribute('onclick') === 'divide()');
      expect(divideButton).not.toBeNull();
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

  describe('divide関数の確認', () => {
    it('divide関数が定義されている', () => {
      expect(typeof window.divide).toBe('function');
    });

    it('正常な割り算ができる', () => {
      document.getElementById('num1').value = '10';
      document.getElementById('num2').value = '2';
      window.divide();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('5');
    });

    it('空文字列の場合、エラーメッセージを表示する（num1が空）', () => {
      document.getElementById('num1').value = '';
      document.getElementById('num2').value = '2';
      window.divide();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
    });

    it('空文字列の場合、エラーメッセージを表示する（num2が空）', () => {
      document.getElementById('num1').value = '10';
      document.getElementById('num2').value = '';
      window.divide();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
    });

    it('空文字列の場合、結果を表示しない', () => {
      document.getElementById('num1').value = '';
      document.getElementById('num2').value = '2';
      window.divide();
      const result = document.getElementById('result');
      expect(result.textContent).toBe('');
    });

    it('数値でない場合、エラーメッセージを表示する', () => {
      document.getElementById('num1').value = 'abc';
      document.getElementById('num2').value = '2';
      window.divide();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
    });

    it('数値でない場合、結果を表示しない', () => {
      document.getElementById('num1').value = 'abc';
      document.getElementById('num2').value = '2';
      window.divide();
      const result = document.getElementById('result');
      expect(result.textContent).toBe('');
    });

    it('0で割る場合、エラーメッセージを表示する', () => {
      document.getElementById('num1').value = '10';
      document.getElementById('num2').value = '0';
      window.divide();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
    });

    it('0で割る場合、結果を表示しない', () => {
      document.getElementById('num1').value = '10';
      document.getElementById('num2').value = '0';
      window.divide();
      const result = document.getElementById('result');
      expect(result.textContent).toBe('');
    });

    it('正常な場合、エラーメッセージをクリアする', () => {
      // 先にエラーを表示
      document.getElementById('num1').value = '';
      document.getElementById('num2').value = '2';
      window.divide();
      // 正常な入力に変更
      document.getElementById('num1').value = '10';
      document.getElementById('num2').value = '2';
      window.divide();
      const error = document.getElementById('error');
      expect(error.textContent).toBe('');
    });
  });
});
