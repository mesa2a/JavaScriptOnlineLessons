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

describe('Lesson 39: ネスト', () => {
  describe('HTML要素の確認', () => {
    it('onclick="checkAccess()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const checkButton = buttons.find(btn => btn.getAttribute('onclick') === 'checkAccess()');
      expect(checkButton).not.toBeNull();
    });

    it('id="result"の要素が存在する', () => {
      const elem = document.getElementById('result');
      expect(elem).not.toBeNull();
    });
  });

  describe('checkAccess関数の確認', () => {
    it('checkAccess関数が定義されている', () => {
      expect(typeof window.checkAccess).toBe('function');
    });

    it('checkAccess関数を実行すると、結果が表示される', () => {
      window.checkAccess();
      const result = document.getElementById('result');
      expect(result.textContent).not.toBe('');
    });

    it('適切な条件でメッセージが表示される', () => {
      window.checkAccess();
      const result = document.getElementById('result');
      expect(result.textContent.length).toBeGreaterThan(0);
    });
  });

  describe('スクリプト内容の確認', () => {
    it('if文が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toMatch(/if\s*\(/);
    });

    it('ネストされたif文が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      // if文が2回以上登場することを確認
      const ifMatches = scriptContent.match(/if\s*\(/g);
      expect(ifMatches).not.toBeNull();
      expect(ifMatches.length).toBeGreaterThanOrEqual(2);
    });

    it('else文が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toMatch(/\}\s*else\s*\{/);
    });

    it('password変数とage変数が定義されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toMatch(/let\s+password\s*=/);
      expect(scriptContent).toMatch(/let\s+age\s*=/);
    });
  });
});
