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

describe('Lesson 38: else if', () => {
  describe('HTML要素の確認', () => {
    it('onclick="checkGrade()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const checkButton = buttons.find(btn => btn.getAttribute('onclick') === 'checkGrade()');
      expect(checkButton).not.toBeNull();
    });

    it('id="result"の要素が存在する', () => {
      const elem = document.getElementById('result');
      expect(elem).not.toBeNull();
    });
  });

  describe('checkGrade関数の確認', () => {
    it('checkGrade関数が定義されている', () => {
      expect(typeof window.checkGrade).toBe('function');
    });

    it('checkGrade関数を実行すると、結果が表示される', () => {
      window.checkGrade();
      const result = document.getElementById('result');
      expect(result.textContent).not.toBe('');
    });

    it('点数に応じた評価が表示される', () => {
      window.checkGrade();
      const result = document.getElementById('result');
      // 85点程度なら「良好」または「合格」のいずれかが表示されるはず
      expect(result.textContent.length).toBeGreaterThan(0);
    });
  });

  describe('スクリプト内容の確認', () => {
    it('if文が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toMatch(/if\s*\(/);
    });

    it('else if文が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toMatch(/\}\s*else\s+if\s*\(/);
    });

    it('else文が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toMatch(/\}\s*else\s*\{/);
    });

    it('score変数が定義されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toMatch(/let\s+score\s*=/);
    });

    it('複数の>=演算子が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      const matches = scriptContent.match(/>=|<=/g);
      expect(matches).not.toBeNull();
      expect(matches.length).toBeGreaterThanOrEqual(2);
    });
  });
});
