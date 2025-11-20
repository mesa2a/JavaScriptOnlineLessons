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

describe('Lesson 54: じゃんけんゲーム', () => {
  describe('HTML要素の確認', () => {
    it('id="playerHand"のinput要素が存在する', () => {
      const elem = document.getElementById('playerHand');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
    });

    it('onclick="play()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const playButton = buttons.find(btn => btn.getAttribute('onclick') === 'play()');
      expect(playButton).not.toBeNull();
    });

    it('id="result"の要素が存在する', () => {
      const elem = document.getElementById('result');
      expect(elem).not.toBeNull();
    });

    it('id="error"の要素が存在する', () => {
      const elem = document.getElementById('error');
      expect(elem).not.toBeNull();
    });
  });

  describe('play関数の確認', () => {
    it('play関数が定義されている', () => {
      expect(typeof window.play).toBe('function');
    });

    it('不正な入力の場合、エラーメッセージを表示する', () => {
      document.getElementById('playerHand').value = '石';
      window.play();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
    });

    it('グー vs グーの場合、あいこと表示する', () => {
      document.getElementById('playerHand').value = 'グー';
      window.play();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('あいこ');
    });

    it('チョキ vs グーの場合、コンピュータの勝ちと表示する', () => {
      document.getElementById('playerHand').value = 'チョキ';
      window.play();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('コンピュータの勝ち');
    });

    it('パー vs グーの場合、プレイヤーの勝ちと表示する', () => {
      document.getElementById('playerHand').value = 'パー';
      window.play();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('あなたの勝ち');
    });
  });

  describe('スクリプト内容の確認', () => {
    it('AND演算子(&&)が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('&&');
    });

    it('OR演算子(||)が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('||');
    });
  });
});
