import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 142: JSONの基礎', () => {
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
    it('userDataオブジェクトが定義されている', () => {
      const userData = window.eval('userData');
      expect(userData).toBeDefined();
    });

    it('必要なプロパティが存在する', () => {
      const userData = window.eval('userData');
      expect(userData.username).toBeDefined();
      expect(userData.email).toBeDefined();
      expect(userData.preferences).toBeDefined();
      expect(userData.loginCount).toBeDefined();
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
    it('stringifyResultに内容が表示されている', () => {
      const stringifyResult = document.getElementById('stringifyResult');
      expect(stringifyResult.textContent.length).toBeGreaterThan(0);
    });
  });

  describe('2. JSON.parse()', () => {
    it('parseResultに内容が表示されている', () => {
      const parseResult = document.getElementById('parseResult');
      expect(parseResult.innerHTML.length).toBeGreaterThan(0);
    });
  });

  describe('3. localStorage操作', () => {
    it('saveボタンがクリックできる', () => {
      const saveBtn = document.getElementById('saveBtn');
      expect(saveBtn).not.toBeNull();
    });

    it('loadボタンがクリックできる', () => {
      const loadBtn = document.getElementById('loadBtn');
      expect(loadBtn).not.toBeNull();
    });

    it('clearボタンがクリックできる', () => {
      const clearBtn = document.getElementById('clearBtn');
      expect(clearBtn).not.toBeNull();
    });
  });

  describe('4. currentData表示', () => {
    it('currentData要素に内容が表示される', () => {
      const currentData = document.getElementById('currentData');
      expect(currentData.innerHTML.length).toBeGreaterThan(0);
    });
  });
});
