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

describe('Lesson 49: 週のプロジェクト - 性格診断アプリ', () => {
  describe('HTML要素の確認', () => {
    it('id="isOutgoing"のinput要素(checkbox)が存在する', () => {
      const elem = document.getElementById('isOutgoing');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
      expect(elem.type).toBe('checkbox');
    });

    it('id="isPlanner"のinput要素(checkbox)が存在する', () => {
      const elem = document.getElementById('isPlanner');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
      expect(elem.type).toBe('checkbox');
    });

    it('id="isAdventurous"のinput要素(checkbox)が存在する', () => {
      const elem = document.getElementById('isAdventurous');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
      expect(elem.type).toBe('checkbox');
    });

    it('onclick="diagnose()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const diagnoseButton = buttons.find(btn => btn.getAttribute('onclick') === 'diagnose()');
      expect(diagnoseButton).not.toBeNull();
    });

    it('id="result"の要素が存在する', () => {
      const elem = document.getElementById('result');
      expect(elem).not.toBeNull();
    });
  });

  describe('diagnose関数の確認', () => {
    it('diagnose関数が定義されている', () => {
      expect(typeof window.diagnose).toBe('function');
    });

    it('3つすべてチェックした場合、"リーダータイプ"を表示する', () => {
      document.getElementById('isOutgoing').checked = true;
      document.getElementById('isPlanner').checked = true;
      document.getElementById('isAdventurous').checked = true;
      window.diagnose();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('リーダータイプ');
    });

    it('外向的と冒険好きをチェックした場合、"冒険家タイプ"を表示する', () => {
      document.getElementById('isOutgoing').checked = true;
      document.getElementById('isPlanner').checked = false;
      document.getElementById('isAdventurous').checked = true;
      window.diagnose();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('冒険家タイプ');
    });

    it('計画的のみチェックした場合(外向的でない)、"思索家タイプ"を表示する', () => {
      document.getElementById('isOutgoing').checked = false;
      document.getElementById('isPlanner').checked = true;
      document.getElementById('isAdventurous').checked = false;
      window.diagnose();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('思索家タイプ');
    });

    it('外向的のみチェックした場合、"社交家タイプ"を表示する', () => {
      document.getElementById('isOutgoing').checked = true;
      document.getElementById('isPlanner').checked = false;
      document.getElementById('isAdventurous').checked = false;
      window.diagnose();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('社交家タイプ');
    });

    it('何もチェックしない場合、"平和主義者タイプ"を表示する', () => {
      document.getElementById('isOutgoing').checked = false;
      document.getElementById('isPlanner').checked = false;
      document.getElementById('isAdventurous').checked = false;
      window.diagnose();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('平和主義者タイプ');
    });

    it('結果にタイプの特徴も表示される', () => {
      document.getElementById('isOutgoing').checked = true;
      document.getElementById('isPlanner').checked = true;
      document.getElementById('isAdventurous').checked = true;
      window.diagnose();
      const result = document.getElementById('result');
      // タイプ名と説明文の両方が含まれているか確認
      expect(result.textContent.length).toBeGreaterThan(10);
    });
  });

  describe('スクリプト内容の確認', () => {
    it('AND演算子(&&)が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('&&');
    });

    it('else ifまたは複数のif文が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      const hasElseIf = scriptContent.includes('else if');
      const ifCount = (scriptContent.match(/if\s*\(/g) || []).length;
      expect(hasElseIf || ifCount >= 3).toBe(true);
    });

    it('.checkedプロパティが使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('.checked');
    });
  });
});
