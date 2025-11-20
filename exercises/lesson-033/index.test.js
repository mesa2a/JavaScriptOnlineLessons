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

describe('Lesson 33: 条件分岐入門', () => {
  describe('HTML要素の確認', () => {
    it('onclick="checkAge()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const checkButton = buttons.find(btn => btn.getAttribute('onclick') === 'checkAge()');
      expect(checkButton).not.toBeNull();
    });

    it('id="result"の要素が存在する', () => {
      const elem = document.getElementById('result');
      expect(elem).not.toBeNull();
    });
  });

  describe('checkAge関数の確認', () => {
    it('checkAge関数が定義されている', () => {
      expect(typeof window.checkAge).toBe('function');
    });

    it('checkAge関数を実行すると、結果が表示される', () => {
      window.checkAge();
      const result = document.getElementById('result');
      expect(result.textContent).not.toBe('');
    });

    it('年齢が20歳以上の場合、「成人です」と表示される', () => {
      window.checkAge();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('成人');
    });
  });

  describe('スクリプト内容の確認', () => {
    it('if文が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toMatch(/if\s*\(/);
    });

    it('比較演算子(>=)が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('>=');
    });

    it('age変数が定義されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toMatch(/let\s+age\s*=/);
    });
  });
});
