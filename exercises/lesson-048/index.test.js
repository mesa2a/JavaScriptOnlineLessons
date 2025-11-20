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

describe('Lesson 48: 三項演算子', () => {
  describe('HTML要素の確認', () => {
    it('id="isSunny"のinput要素(checkbox)が存在する', () => {
      const elem = document.getElementById('isSunny');
      expect(elem).not.toBeNull();
      expect(elem.tagName).toBe('INPUT');
      expect(elem.type).toBe('checkbox');
    });

    it('onclick="checkWeather()"のbutton要素が存在する', () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const checkButton = buttons.find(btn => btn.getAttribute('onclick') === 'checkWeather()');
      expect(checkButton).not.toBeNull();
    });

    it('id="result"の要素が存在する', () => {
      const elem = document.getElementById('result');
      expect(elem).not.toBeNull();
    });
  });

  describe('checkWeather関数の確認', () => {
    it('checkWeather関数が定義されている', () => {
      expect(typeof window.checkWeather).toBe('function');
    });

    it('晴れている場合、"外出日和です"を表示する', () => {
      document.getElementById('isSunny').checked = true;
      window.checkWeather();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('外出日和です');
    });

    it('晴れていない場合、"傘を持っていきましょう"を表示する', () => {
      document.getElementById('isSunny').checked = false;
      window.checkWeather();
      const result = document.getElementById('result');
      expect(result.textContent).toContain('傘を持っていきましょう');
    });
  });

  describe('スクリプト内容の確認', () => {
    it('三項演算子(?)が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('?');
    });

    it('コロン(:)が使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain(':');
    });

    it('.checkedプロパティが使用されている', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
      expect(scriptContent).toContain('.checked');
    });
  });
});
