import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 142: JSONの基礎 (Solution)', () => {
  let dom;
  let document;
  let window;
  let localStorage;

  beforeEach(() => {
    const html = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );
    const js = fs.readFileSync(
      path.resolve(__dirname, 'script.js'),
      'utf-8'
    );

    dom = new JSDOM(html, {
      runScripts: 'outside-only',
      resources: 'usable'
    });
    document = dom.window.document;
    window = dom.window;
    localStorage = dom.window.localStorage;

    // localStorageをクリア
    localStorage.clear();

    // JavaScriptを実行
    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);
  });

  afterEach(() => {
    // テスト後にlocalStorageをクリア
    if (localStorage) {
      localStorage.clear();
    }
  });

  describe('オブジェクトの定義', () => {
    it('userDataオブジェクトが正しく定義されている', () => {
      const userData = window.eval('userData');
      expect(userData).toBeDefined();
      expect(userData.username).toBe('user123');
      expect(userData.email).toBe('user@example.com');
      expect(userData.preferences.theme).toBe('light');
      expect(userData.preferences.language).toBe('ja');
      expect(userData.loginCount).toBe(10);
    });
  });

  describe('UI要素', () => {
    it('stringifyResult要素が存在する', () => {
      const stringifyResult = document.getElementById('stringifyResult');
      expect(stringifyResult).not.toBeNull();
    });

    it('parseResult要素が存在する', () => {
      const parseResult = document.getElementById('parseResult');
      expect(parseResult).not.toBeNull();
    });

    it('storageResult要素が存在する', () => {
      const storageResult = document.getElementById('storageResult');
      expect(storageResult).not.toBeNull();
    });

    it('currentData要素が存在する', () => {
      const currentData = document.getElementById('currentData');
      expect(currentData).not.toBeNull();
    });

    it('ボタン要素が存在する', () => {
      expect(document.getElementById('saveBtn')).not.toBeNull();
      expect(document.getElementById('loadBtn')).not.toBeNull();
      expect(document.getElementById('clearBtn')).not.toBeNull();
    });
  });

  describe('1. JSON.stringify()', () => {
    it('stringifyResultにJSON文字列が表示されている', () => {
      const stringifyResult = document.getElementById('stringifyResult');
      expect(stringifyResult.textContent.length).toBeGreaterThan(0);
      expect(stringifyResult.textContent).toContain('username');
      expect(stringifyResult.textContent).toContain('user123');
    });

    it('JSON文字列が正しい形式である', () => {
      const stringifyResult = document.getElementById('stringifyResult');
      const text = stringifyResult.textContent;
      // JSON形式として解析できることを確認
      expect(() => JSON.parse(text)).not.toThrow();
    });
  });

  describe('2. JSON.parse()', () => {
    it('parseResultにオブジェクトのデータが表示されている', () => {
      const parseResult = document.getElementById('parseResult');
      expect(parseResult.innerHTML.length).toBeGreaterThan(0);
      expect(parseResult.innerHTML).toContain('user123');
      expect(parseResult.innerHTML).toContain('user@example.com');
    });

    it('ネストされたプロパティも表示されている', () => {
      const parseResult = document.getElementById('parseResult');
      expect(parseResult.innerHTML).toContain('light');
      expect(parseResult.innerHTML).toContain('ja');
    });
  });

  describe('3. localStorage操作', () => {
    it('saveボタンをクリックするとlocalStorageに保存される', () => {
      const saveBtn = document.getElementById('saveBtn');
      saveBtn.click();

      const saved = localStorage.getItem('userData');
      expect(saved).not.toBeNull();

      const parsed = JSON.parse(saved);
      expect(parsed.username).toBe('user123');
    });

    it('loadボタンをクリックするとデータが表示される', () => {
      // まずデータを保存
      const userData = window.eval('userData');
      localStorage.setItem('userData', JSON.stringify(userData));

      const loadBtn = document.getElementById('loadBtn');
      loadBtn.click();

      const storageResult = document.getElementById('storageResult');
      expect(storageResult.innerHTML).toContain('user123');
    });

    it('clearボタンをクリックするとlocalStorageから削除される', () => {
      // まずデータを保存
      const userData = window.eval('userData');
      localStorage.setItem('userData', JSON.stringify(userData));

      const clearBtn = document.getElementById('clearBtn');
      clearBtn.click();

      const saved = localStorage.getItem('userData');
      expect(saved).toBeNull();
    });
  });

  describe('4. displayCurrentData関数', () => {
    it('displayCurrentData関数が定義されている', () => {
      const displayCurrentData = window.eval('displayCurrentData');
      expect(typeof displayCurrentData).toBe('function');
    });

    it('データがない場合は適切なメッセージが表示される', () => {
      const currentData = document.getElementById('currentData');
      expect(currentData.innerHTML).toContain('保存されているデータはありません');
    });

    it('データがある場合は内容が表示される', () => {
      // データを保存
      const userData = window.eval('userData');
      localStorage.setItem('userData', JSON.stringify(userData));

      // displayCurrentDataを呼び出し
      const displayCurrentData = window.eval('displayCurrentData');
      displayCurrentData();

      const currentData = document.getElementById('currentData');
      expect(currentData.innerHTML).toContain('user123');
    });
  });

  describe('JSON操作の正確性', () => {
    it('JSON.stringify()とJSON.parse()の往復でデータが保持される', () => {
      const userData = window.eval('userData');
      const jsonString = JSON.stringify(userData);
      const parsed = JSON.parse(jsonString);

      expect(parsed.username).toBe(userData.username);
      expect(parsed.email).toBe(userData.email);
      expect(parsed.preferences.theme).toBe(userData.preferences.theme);
      expect(parsed.loginCount).toBe(userData.loginCount);
    });
  });
});
