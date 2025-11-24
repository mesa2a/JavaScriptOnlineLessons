import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 143: データモデリング', () => {
  let dom;
  let document;
  let window;

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

    // JavaScriptを実行
    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);
  });

  describe('オブジェクトの定義', () => {
    it('libraryオブジェクトが定義されている', () => {
      const library = window.eval('library');
      expect(library).toBeDefined();
    });

    it('books配列が定義されている', () => {
      const books = window.eval('books');
      expect(books).toBeDefined();
      expect(Array.isArray(books)).toBe(true);
    });

    it('memberオブジェクトが定義されている', () => {
      const member = window.eval('member');
      expect(member).toBeDefined();
    });
  });

  describe('UI要素', () => {
    it('libraryInfo要素が存在する', () => {
      const libraryInfo = document.getElementById('libraryInfo');
      expect(libraryInfo).not.toBeNull();
    });

    it('booksList要素が存在する', () => {
      const booksList = document.getElementById('booksList');
      expect(booksList).not.toBeNull();
    });

    it('memberInfo要素が存在する', () => {
      const memberInfo = document.getElementById('memberInfo');
      expect(memberInfo).not.toBeNull();
    });
  });

  describe('図書館情報の表示', () => {
    it('libraryInfoに内容が表示されている', () => {
      const libraryInfo = document.getElementById('libraryInfo');
      expect(libraryInfo.innerHTML.length).toBeGreaterThan(0);
    });
  });

  describe('蔵書リストの表示', () => {
    it('booksListに内容が表示されている', () => {
      const booksList = document.getElementById('booksList');
      expect(booksList.innerHTML.length).toBeGreaterThan(0);
    });
  });

  describe('会員情報の表示', () => {
    it('memberInfoに内容が表示されている', () => {
      const memberInfo = document.getElementById('memberInfo');
      expect(memberInfo.innerHTML.length).toBeGreaterThan(0);
    });
  });
});
