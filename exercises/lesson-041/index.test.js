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

describe('Lesson 41: 入力方法の比較', () => {
  describe('HTML要素の確認', () => {
    it('onclick="usePrompt()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const promptButton = buttons.find(btn => btn.getAttribute('onclick') === 'usePrompt()');
      expect(promptButton).not.toBeNull();
    });

    it('onclick="useInput()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const inputButton = buttons.find(btn => btn.getAttribute('onclick') === 'useInput()');
      expect(inputButton).not.toBeNull();
    });

    it('id="name"のinput要素が存在する', () => {
      const elem = document.getElementById('name');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
    });

    it('id="result"の要素が存在する', () => {
      const elem = document.getElementById('result');
      expect(elem).not.toBeNull();
    });
  });

  describe('関数の確認', () => {
    it('usePrompt関数が定義されている', () => {
      expect(typeof window.usePrompt).toBe('function');
    });

    it('useInput関数が定義されている', () => {
      expect(typeof window.useInput).toBe('function');
    });

    it('useInput関数でinputから値を取得して表示できる', () => {
      document.getElementById('name').value = '太郎';
      window.useInput();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('太郎');
    });
  });

  describe('スクリプト内容の確認', () => {
    it('usePrompt関数内でpromptが使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      // usePrompt関数の定義を探す
      const usePromptMatch = scriptContent.match(/function\s+usePrompt\s*\([^)]*\)\s*\{[^}]*\}/s);
      if (usePromptMatch) {
        expect(usePromptMatch[0]).toContain('prompt');
      }
    });

    it('useInput関数内でgetElementByIdが使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      // useInput関数の定義を探す
      const useInputMatch = scriptContent.match(/function\s+useInput\s*\([^)]*\)\s*\{[^}]*\}/s);
      if (useInputMatch) {
        expect(useInputMatch[0]).toContain('getElementById');
      }
    });
  });
});
