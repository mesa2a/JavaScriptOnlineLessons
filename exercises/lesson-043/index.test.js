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

describe('Lesson 43: 週のまとめプロジェクト', () => {
  describe('HTML要素の確認', () => {
    it('id="name"のinput要素が存在する', () => {
      const elem = document.getElementById('name');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
    });

    it('id="age"のinput要素が存在する', () => {
      const elem = document.getElementById('age');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
    });

    it('onclick="createProfile()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const createButton = buttons.find(btn => btn.getAttribute('onclick') === 'createProfile()');
      expect(createButton).not.toBeNull();
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

  describe('createProfile関数の確認', () => {
    it('createProfile関数が定義されている', () => {
      expect(typeof window.createProfile).toBe('function');
    });

    it('名前が空文字の場合、エラーメッセージを表示する', () => {
      document.getElementById('name').value = '';
      document.getElementById('age').value = '25';
      window.createProfile();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
      expect(error.textContent).toContain('名前');
    });

    it('名前が2文字未満の場合、エラーメッセージを表示する', () => {
      document.getElementById('name').value = 'A';
      document.getElementById('age').value = '25';
      window.createProfile();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
    });

    it('年齢が空文字の場合、エラーメッセージを表示する', () => {
      document.getElementById('name').value = '太郎';
      document.getElementById('age').value = '';
      window.createProfile();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
      expect(error.textContent).toContain('年齢');
    });

    it('年齢が数値でない場合、エラーメッセージを表示する', () => {
      document.getElementById('name').value = '太郎';
      document.getElementById('age').value = 'abc';
      window.createProfile();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
      expect(error.textContent).toContain('数値');
    });

    it('年齢が0未満の場合、エラーメッセージを表示する', () => {
      document.getElementById('name').value = '太郎';
      document.getElementById('age').value = '-1';
      window.createProfile();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
    });

    it('年齢が150より大きい場合、エラーメッセージを表示する', () => {
      document.getElementById('name').value = '太郎';
      document.getElementById('age').value = '151';
      window.createProfile();
      const error = document.getElementById('error');
      expect(error.textContent).not.toBe('');
    });

    it('正しい入力の場合、プロフィールを表示する', () => {
      document.getElementById('name').value = '太郎';
      document.getElementById('age').value = '25';
      window.createProfile();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('太郎');
      expect(result.textContent).toContain('25');
    });

    it('18歳未満の場合、"未成年"を表示する', () => {
      document.getElementById('name').value = '太郎';
      document.getElementById('age').value = '15';
      window.createProfile();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('未成年');
    });

    it('18歳以上65歳未満の場合、"成人"を表示する', () => {
      document.getElementById('name').value = '太郎';
      document.getElementById('age').value = '30';
      window.createProfile();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('成人');
    });

    it('65歳以上の場合、"シニア"を表示する', () => {
      document.getElementById('name').value = '太郎';
      document.getElementById('age').value = '70';
      window.createProfile();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('シニア');
    });
  });

  describe('スクリプト内容の確認', () => {
    it('isNaNが使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('isNaN');
    });

    it('lengthプロパティが使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('.length');
    });

    it('returnが使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('return');
    });

    it('else ifまたはネストされたif文が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      const hasElseIf = scriptContent.includes('else if');
      const ifCount = (scriptContent.match(/if\s*\(/g) || []).length;
      expect(hasElseIf || ifCount >= 3).toBe(true);
    });
  });
});
