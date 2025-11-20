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

describe('Lesson 37: どちらか（if-else文）', () => {
  describe('HTML要素の確認', () => {
    it('onclick="checkAnswer()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const checkButton = buttons.find(btn => btn.getAttribute('onclick') === 'checkAnswer()');
      expect(checkButton).not.toBeNull();
    });

    it('id="result"の要素が存在する', () => {
      const elem = document.getElementById('result');
      expect(elem).not.toBeNull();
    });
  });

  describe('checkAnswer関数の確認', () => {
    it('checkAnswer関数が定義されている', () => {
      expect(typeof window.checkAnswer).toBe('function');
    });

    it('checkAnswer関数を実行すると、結果が表示される', () => {
      window.checkAnswer();
      const result = document.getElementById('result');
      expect(result.textContent).not.toBe('');
    });

    it('正解の場合、「正解」というメッセージが表示される', () => {
      window.checkAnswer();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('正解');
    });
  });

  describe('スクリプト内容の確認', () => {
    it('if文が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toMatch(/if\s*\(/);
    });

    it('else文が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toMatch(/\}\s*else\s*\{/);
    });

    it('===演算子が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('===');
    });

    it('answer変数とcorrectAnswer変数が定義されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toMatch(/let\s+answer\s*=/);
      expect(scriptContent).toMatch(/let\s+correctAnswer\s*=/);
    });
  });
});
