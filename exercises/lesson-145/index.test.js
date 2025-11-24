import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 145: 住所録アプリ (Exercise)', () => {
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

    // localStorageのモック
    global.localStorage = {
      data: {},
      getItem(key) {
        return this.data[key] || null;
      },
      setItem(key, value) {
        this.data[key] = value;
      },
      clear() {
        this.data = {};
      }
    };

    // JavaScriptを実行
    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);
  });

  describe('UI要素', () => {
    it('統計情報セクションが存在する', () => {
      const stats = document.getElementById('stats');
      expect(stats).not.toBeNull();
    });

    it('入力フォームが存在する', () => {
      const nameInput = document.getElementById('nameInput');
      const emailInput = document.getElementById('emailInput');
      const phoneInput = document.getElementById('phoneInput');
      const addressInput = document.getElementById('addressInput');
      const categoryInput = document.getElementById('categoryInput');

      expect(nameInput).not.toBeNull();
      expect(emailInput).not.toBeNull();
      expect(phoneInput).not.toBeNull();
      expect(addressInput).not.toBeNull();
      expect(categoryInput).not.toBeNull();
    });

    it('検索フィールドが存在する', () => {
      const searchInput = document.getElementById('searchInput');
      const filterCategory = document.getElementById('filterCategory');
      expect(searchInput).not.toBeNull();
      expect(filterCategory).not.toBeNull();
    });

    it('連絡先リスト表示エリアが存在する', () => {
      const contactList = document.getElementById('contactList');
      expect(contactList).not.toBeNull();
    });
  });

  describe('データ構造', () => {
    it('contacts配列が定義されている', () => {
      const contacts = window.eval('typeof contacts');
      expect(contacts).toBe('object');
    });
  });

  describe('CRUD関数', () => {
    it('addContact関数が定義されている', () => {
      const addContact = window.eval('typeof addContact');
      expect(addContact).toBe('function');
    });

    it('getContactById関数が定義されている', () => {
      const getContactById = window.eval('typeof getContactById');
      expect(getContactById).toBe('function');
    });

    it('updateContact関数が定義されている', () => {
      const updateContact = window.eval('typeof updateContact');
      expect(updateContact).toBe('function');
    });

    it('deleteContact関数が定義されている', () => {
      const deleteContact = window.eval('typeof deleteContact');
      expect(deleteContact).toBe('function');
    });
  });

  describe('検索関数', () => {
    it('searchByName関数が定義されている', () => {
      const searchByName = window.eval('typeof searchByName');
      expect(searchByName).toBe('function');
    });

    it('filterByCategory関数が定義されている', () => {
      const filterByCategory = window.eval('typeof filterByCategory');
      expect(filterByCategory).toBe('function');
    });

    it('searchContacts関数が定義されている', () => {
      const searchContacts = window.eval('typeof searchContacts');
      expect(searchContacts).toBe('function');
    });
  });

  describe('データ永続化関数', () => {
    it('saveContacts関数が定義されている', () => {
      const saveContacts = window.eval('typeof saveContacts');
      expect(saveContacts).toBe('function');
    });

    it('loadContacts関数が定義されている', () => {
      const loadContacts = window.eval('typeof loadContacts');
      expect(loadContacts).toBe('function');
    });
  });

  describe('表示関数', () => {
    it('displayAllContacts関数が定義されている', () => {
      const displayAllContacts = window.eval('typeof displayAllContacts');
      expect(displayAllContacts).toBe('function');
    });

    it('displaySearchResults関数が定義されている', () => {
      const displaySearchResults = window.eval('typeof displaySearchResults');
      expect(displaySearchResults).toBe('function');
    });

    it('updateStats関数が定義されている', () => {
      const updateStats = window.eval('typeof updateStats');
      expect(updateStats).toBe('function');
    });
  });

  describe('イベントハンドラー', () => {
    it('handleAddContact関数が定義されている', () => {
      const handleAddContact = window.eval('typeof handleAddContact');
      expect(handleAddContact).toBe('function');
    });

    it('handleSearch関数が定義されている', () => {
      const handleSearch = window.eval('typeof handleSearch');
      expect(handleSearch).toBe('function');
    });

    it('handleShowAll関数が定義されている', () => {
      const handleShowAll = window.eval('typeof handleShowAll');
      expect(handleShowAll).toBe('function');
    });

    it('handleDelete関数が定義されている', () => {
      const handleDelete = window.eval('typeof handleDelete');
      expect(handleDelete).toBe('function');
    });

    it('handleExport関数が定義されている', () => {
      const handleExport = window.eval('typeof handleExport');
      expect(handleExport).toBe('function');
    });
  });
});
