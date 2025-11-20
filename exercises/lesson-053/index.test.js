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

describe('Lesson 53: クイズアプリ', () => {
  describe('HTML要素の確認', () => {
    it('id="answer"のinput要素が存在する', () => {
      const elem = document.getElementById('answer');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
    });

    it('onclick="checkAnswer()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const checkButton = buttons.find(btn => btn.getAttribute('onclick') === 'checkAnswer()');
      expect(checkButton).not.toBeNull();
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

  describe('checkAnswer関数の確認', () => {
    it('checkAnswer関数が定義されている', () => {
      expect(typeof window.checkAnswer).toBe('function');
    });

    it('答えが空の場合、エラーメッセージを表示する', () => {
      document.getElementById('answer').value = '';
      window.checkAnswer();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
      expect(error.textContent).toContain('答え');
    });

    it('答えが「東京」の場合、正解と表示する', () => {
      document.getElementById('answer').value = '東京';
      window.checkAnswer();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('正解');
    });

    it('答えが「Tokyo」の場合(大文字小文字混在)、正解と表示する', () => {
      document.getElementById('answer').value = 'Tokyo';
      window.checkAnswer();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('正解');
    });

    it('答えが「tokyo」の場合(小文字)、正解と表示する', () => {
      document.getElementById('answer').value = 'tokyo';
      window.checkAnswer();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('正解');
    });

    it('答えが「TOKYO」の場合(大文字)、正解と表示する', () => {
      document.getElementById('answer').value = 'TOKYO';
      window.checkAnswer();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('正解');
    });

    it('答えが間違っている場合、不正解と表示する', () => {
      document.getElementById('answer').value = '大阪';
      window.checkAnswer();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('不正解');
    });
  });

  describe('スクリプト内容の確認', () => {
    it('toLowerCase()が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('toLowerCase');
    });

    it('returnが使用されている(早期リターン)', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('return');
    });
  });
});
