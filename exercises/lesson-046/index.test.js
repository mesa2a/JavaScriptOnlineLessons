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

describe('Lesson 46: NOT演算（!）', () => {
  describe('HTML要素の確認', () => {
    it('id="isRaining"のinput要素(checkbox)が存在する', () => {
      const elem = document.getElementById('isRaining');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
      expect(elem.type).toBe('checkbox');
    });

    it('onclick="checkUmbrella()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const checkButton = buttons.find(btn => btn.getAttribute('onclick') === 'checkUmbrella()');
      expect(checkButton).not.toBeNull();
    });

    it('id="result"の要素が存在する', () => {
      const elem = document.getElementById('result');
      expect(elem).not.toBeNull();
    });
  });

  describe('checkUmbrella関数の確認', () => {
    it('checkUmbrella関数が定義されている', () => {
      expect(typeof window.checkUmbrella).toBe('function');
    });

    it('雨が降っていない場合(チェックなし)、"傘は不要です"を表示する', () => {
      document.getElementById('isRaining').checked = false;
      window.checkUmbrella();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('傘は不要です');
    });

    it('雨が降っている場合(チェックあり)、"傘が必要です"を表示する', () => {
      document.getElementById('isRaining').checked = true;
      window.checkUmbrella();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('傘が必要です');
    });
  });

  describe('スクリプト内容の確認', () => {
    it('NOT演算子(!)が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('!');
    });

    it('.checkedプロパティが使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('.checked');
    });
  });
});
