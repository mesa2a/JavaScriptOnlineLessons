import { describe, it, expect, beforeEach, vi } from 'vitest';
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

describe('Lesson 55: おみくじアプリ', () => {
  describe('HTML要素の確認', () => {
    it('onclick="drawOmikuji()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const drawButton = buttons.find(btn => btn.getAttribute('onclick') === 'drawOmikuji()');
      expect(drawButton).not.toBeNull();
    });

    it('id="result"の要素が存在する', () => {
      const elem = document.getElementById('result');
      expect(elem).not.toBeNull();
    });
  });

  describe('drawOmikuji関数の確認', () => {
    it('drawOmikuji関数が定義されている', () => {
      expect(typeof window.drawOmikuji).toBe('function');
    });

    it('4種類の運勢のいずれかが表示される', () => {
      const fortunes = ['大吉', '中吉', '小吉', '凶'];

      // 複数回実行して少なくとも1つは表示されることを確認
      let displayedFortune = false;
      for (let i = 0; i < 10; i++) {
        window.drawOmikuji();
        const result = document.getElementById('result');
        if (fortunes.some(f => result.textContent.includes(f))) {
          displayedFortune = true;
          break;
        }
      }

      expect(displayedFortune).toBe(true);
    });

    it('Math.random()を使用している', () => {
      const originalRandom = Math.random;
      let randomCalled = false;

      Math.random = () => {
        randomCalled = true;
        return 0.5;
      };

      window.drawOmikuji();

      Math.random = originalRandom;
      expect(randomCalled).toBe(true);
    });

    it('Math.random()が0に近い値のとき「大吉」が表示される', () => {
      const originalRandom = Math.random;
      Math.random = () => 0.1; // Math.floor(0.1 * 4) = 0

      window.drawOmikuji();
      const result = document.getElementById('result');

      Math.random = originalRandom;
      expect(result.textContent).toContain('大吉');
    });

    it('Math.random()が0.25-0.5の値のとき「中吉」が表示される', () => {
      const originalRandom = Math.random;
      Math.random = () => 0.3; // Math.floor(0.3 * 4) = 1

      window.drawOmikuji();
      const result = document.getElementById('result');

      Math.random = originalRandom;
      expect(result.textContent).toContain('中吉');
    });

    it('Math.random()が0.5-0.75の値のとき「小吉」が表示される', () => {
      const originalRandom = Math.random;
      Math.random = () => 0.6; // Math.floor(0.6 * 4) = 2

      window.drawOmikuji();
      const result = document.getElementById('result');

      Math.random = originalRandom;
      expect(result.textContent).toContain('小吉');
    });

    it('Math.random()が0.75-1.0の値のとき「凶」が表示される', () => {
      const originalRandom = Math.random;
      Math.random = () => 0.9; // Math.floor(0.9 * 4) = 3

      window.drawOmikuji();
      const result = document.getElementById('result');

      Math.random = originalRandom;
      expect(result.textContent).toContain('凶');
    });
  });

  describe('スクリプト内容の確認', () => {
    it('Math.random()が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('Math.random');
    });

    it('Math.floor()が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('Math.floor');
    });

    it('if文が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('if');
    });
  });
});
