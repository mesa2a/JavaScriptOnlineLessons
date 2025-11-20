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

describe('Lesson 35: 文字列の比較', () => {
  describe('HTML要素の確認', () => {
    it('onclick="checkPassword()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const checkButton = buttons.find(btn => btn.getAttribute('onclick') === 'checkPassword()');
      expect(checkButton).not.toBeNull();
    });

    it('id="result"の要素が存在する', () => {
      const elem = document.getElementById('result');
      expect(elem).not.toBeNull();
    });
  });

  describe('checkPassword関数の確認', () => {
    it('checkPassword関数が定義されている', () => {
      expect(typeof window.checkPassword).toBe('function');
    });

    it('checkPassword関数を実行すると、結果が表示される', () => {
      window.checkPassword();
      const result = document.getElementById('result');
      expect(result.textContent).not.toBe('');
    });

    it('パスワードが正しい場合、「ログイン成功」と表示される', () => {
      window.checkPassword();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('ログイン成功');
    });
  });

  describe('スクリプト内容の確認', () => {
    it('if文が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toMatch(/if\s*\(/);
    });

    it('===演算子が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('===');
    });

    it('文字列"hello"が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toMatch(/"hello"|'hello'/);
    });

    it('password変数が定義されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toMatch(/let\s+password\s*=/);
    });
  });
});
