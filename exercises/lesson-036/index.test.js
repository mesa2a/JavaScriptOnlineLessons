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

describe('Lesson 36: 週のまとめプロジェクト', () => {
  describe('HTML要素の確認', () => {
    it('onclick="checkAge()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const checkButton = buttons.find(btn => btn.getAttribute('onclick') === 'checkAge()');
      expect(checkButton).not.toBeNull();
    });

    it('id="age-result"の要素が存在する', () => {
      const elem = document.getElementById('age-result');
      expect(elem).not.toBeNull();
    });

    it('onclick="checkScore()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const checkButton = buttons.find(btn => btn.getAttribute('onclick') === 'checkScore()');
      expect(checkButton).not.toBeNull();
    });

    it('id="score-result"の要素が存在する', () => {
      const elem = document.getElementById('score-result');
      expect(elem).not.toBeNull();
    });

    it('onclick="addCount()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const addButton = buttons.find(btn => btn.getAttribute('onclick') === 'addCount()');
      expect(addButton).not.toBeNull();
    });

    it('id="counter"の要素が存在する', () => {
      const elem = document.getElementById('counter');
      expect(elem).not.toBeNull();
    });

    it('id="counter-message"の要素が存在する', () => {
      const elem = document.getElementById('counter-message');
      expect(elem).not.toBeNull();
    });
  });

  describe('checkAge関数の確認', () => {
    it('checkAge関数が定義されている', () => {
      expect(typeof window.checkAge).toBe('function');
    });

    it('年齢が20歳以上の場合、「成人です」と表示される', () => {
      window.checkAge();
      const result = document.getElementById('age-result');
      expect(result.textContent).toContain('成人');
    });
  });

  describe('checkScore関数の確認', () => {
    it('checkScore関数が定義されている', () => {
      expect(typeof window.checkScore).toBe('function');
    });

    it('点数が60点以上の場合、「合格です」と表示される', () => {
      window.checkScore();
      const result = document.getElementById('score-result');
      expect(result.textContent).toContain('合格');
    });
  });

  describe('addCount関数とcount変数の確認', () => {
    it('count変数が定義されている', () => {
      expect(typeof window.count).toBe('number');
    });

    it('addCount関数が定義されている', () => {
      expect(typeof window.addCount).toBe('function');
    });

    it('addCount関数を実行すると、カウントが増える', () => {
      const initialCount = window.count;
      window.addCount();
      expect(window.count).toBe(initialCount + 1);
    });

    it('カウントがid="counter"に表示される', () => {
      window.addCount();
      const counter = document.getElementById('counter');
      expect(counter.textContent).not.toBe('0');
    });

    it('カウントが5以上になると、メッセージが表示される', () => {
      for (let i = 0; i < 5; i++) {
        window.addCount();
      }
      const message = document.getElementById('counter-message');
      expect(message.textContent).not.toBe('');
    });
  });
});
