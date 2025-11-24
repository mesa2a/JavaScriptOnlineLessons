import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 145: 住所録アプリ (Solution)', () => {
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

    // localStorageのモック
    localStorage = {
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

    dom = new JSDOM(html, {
      runScripts: 'outside-only',
      resources: 'usable',
      beforeParse(window) {
        window.localStorage = localStorage;
        window.alert = () => {};
        window.confirm = () => true;
      }
    });
    document = dom.window.document;
    window = dom.window;

    // JavaScriptを実行
    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);
  });

  describe('UI要素', () => {
    it('統計情報の要素が全て存在する', () => {
      expect(document.getElementById('totalCount')).not.toBeNull();
      expect(document.getElementById('friendCount')).not.toBeNull();
      expect(document.getElementById('workCount')).not.toBeNull();
      expect(document.getElementById('familyCount')).not.toBeNull();
    });

    it('入力フォームの要素が全て存在する', () => {
      expect(document.getElementById('nameInput')).not.toBeNull();
      expect(document.getElementById('emailInput')).not.toBeNull();
      expect(document.getElementById('phoneInput')).not.toBeNull();
      expect(document.getElementById('addressInput')).not.toBeNull();
      expect(document.getElementById('categoryInput')).not.toBeNull();
    });

    it('検索関連の要素が存在する', () => {
      expect(document.getElementById('searchInput')).not.toBeNull();
      expect(document.getElementById('filterCategory')).not.toBeNull();
      expect(document.getElementById('resultCount')).not.toBeNull();
    });

    it('連絡先リスト表示エリアが存在する', () => {
      expect(document.getElementById('contactList')).not.toBeNull();
    });
  });

  describe('addContact関数', () => {
    it('新しい連絡先を追加できる', () => {
      const addContact = window.eval('addContact');
      const contacts = window.eval('contacts');
      const initialLength = contacts.length;

      const newContact = addContact("テスト太郎", "test@example.com", "000-0000-0000", "テスト市", "友人");

      expect(contacts.length).toBe(initialLength + 1);
      expect(newContact.name).toBe("テスト太郎");
    });

    it('IDが自動的に割り当てられる', () => {
      const addContact = window.eval('addContact');
      const newContact = addContact("ID テスト", "id@test.com", "111-1111-1111", "ID市", "友人");

      expect(newContact.id).toBeDefined();
      expect(typeof newContact.id).toBe('number');
    });

    it('連絡先オブジェクトが正しい構造を持つ', () => {
      const addContact = window.eval('addContact');
      const contact = addContact("構造テスト", "struct@test.com", "222-2222-2222", "構造市", "仕事");

      expect(contact).toHaveProperty('id');
      expect(contact).toHaveProperty('name');
      expect(contact).toHaveProperty('email');
      expect(contact).toHaveProperty('phone');
      expect(contact).toHaveProperty('address');
      expect(contact).toHaveProperty('category');
    });
  });

  describe('getContactById関数', () => {
    it('IDで連絡先を取得できる', () => {
      const addContact = window.eval('addContact');
      const getContactById = window.eval('getContactById');

      const newContact = addContact("取得テスト", "get@test.com", "333-3333-3333", "取得市", "友人");
      const retrieved = getContactById(newContact.id);

      expect(retrieved).not.toBeNull();
      expect(retrieved.name).toBe("取得テスト");
    });

    it('存在しないIDの場合nullを返す', () => {
      const getContactById = window.eval('getContactById');
      const result = getContactById(99999);

      expect(result).toBeNull();
    });
  });

  describe('updateContact関数', () => {
    it('連絡先情報を更新できる', () => {
      const addContact = window.eval('addContact');
      const updateContact = window.eval('updateContact');
      const getContactById = window.eval('getContactById');

      const newContact = addContact("更新前", "before@test.com", "444-4444-4444", "更新前市", "友人");
      const success = updateContact(newContact.id, "更新後", "after@test.com", "555-5555-5555", "更新後市", "仕事");

      expect(success).toBe(true);

      const updated = getContactById(newContact.id);
      expect(updated.name).toBe("更新後");
      expect(updated.email).toBe("after@test.com");
      expect(updated.category).toBe("仕事");
    });

    it('存在しないIDの場合falseを返す', () => {
      const updateContact = window.eval('updateContact');
      const result = updateContact(99999, "無効", "invalid@test.com", "000", "無効市", "友人");

      expect(result).toBe(false);
    });
  });

  describe('deleteContact関数', () => {
    it('連絡先を削除できる', () => {
      const addContact = window.eval('addContact');
      const deleteContact = window.eval('deleteContact');
      const contacts = window.eval('contacts');

      const newContact = addContact("削除テスト", "delete@test.com", "666-6666-6666", "削除市", "友人");
      const initialLength = contacts.length;

      const success = deleteContact(newContact.id);

      expect(success).toBe(true);
      expect(contacts.length).toBe(initialLength - 1);
    });

    it('存在しないIDの場合falseを返す', () => {
      const deleteContact = window.eval('deleteContact');
      const result = deleteContact(99999);

      expect(result).toBe(false);
    });
  });

  describe('searchByName関数', () => {
    it('名前で検索できる', () => {
      const addContact = window.eval('addContact');
      const searchByName = window.eval('searchByName');

      addContact("山田太郎", "yamada@test.com", "777-7777-7777", "山田市", "友人");
      addContact("山田花子", "hanako@test.com", "888-8888-8888", "山田市", "家族");
      addContact("佐藤次郎", "sato@test.com", "999-9999-9999", "佐藤市", "仕事");

      const results = searchByName("山田");

      expect(results.length).toBeGreaterThanOrEqual(2);
      expect(results[0].name.indexOf("山田")).not.toBe(-1);
    });

    it('該当なしの場合空配列を返す', () => {
      const searchByName = window.eval('searchByName');
      const results = searchByName("存在しない名前XYZ");

      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(0);
    });
  });

  describe('filterByCategory関数', () => {
    it('カテゴリでフィルタリングできる', () => {
      const addContact = window.eval('addContact');
      const filterByCategory = window.eval('filterByCategory');

      addContact("友人A", "a@test.com", "111", "市A", "友人");
      addContact("友人B", "b@test.com", "222", "市B", "友人");
      addContact("仕事C", "c@test.com", "333", "市C", "仕事");

      const friends = filterByCategory("友人");

      expect(friends.length).toBeGreaterThanOrEqual(2);
      for (let i = 0; i < friends.length; i++) {
        expect(friends[i].category).toBe("友人");
      }
    });
  });

  describe('searchContacts関数', () => {
    it('キーワードとカテゴリで複合検索できる', () => {
      const addContact = window.eval('addContact');
      const searchContacts = window.eval('searchContacts');

      addContact("田中太郎", "tanaka@test.com", "111", "市", "友人");
      addContact("田中花子", "hanako@test.com", "222", "市", "仕事");

      const results = searchContacts("田中", "友人");

      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results[0].name.indexOf("田中")).not.toBe(-1);
      expect(results[0].category).toBe("友人");
    });

    it('全ての条件がnullの場合は全件を返す', () => {
      const contacts = window.eval('contacts');
      const searchContacts = window.eval('searchContacts');

      const results = searchContacts("", "全て");

      expect(results.length).toBe(contacts.length);
    });
  });

  describe('saveContacts関数', () => {
    it('localStorageにデータを保存できる', () => {
      const addContact = window.eval('addContact');
      const saveContacts = window.eval('saveContacts');

      addContact("保存テスト", "save@test.com", "000", "保存市", "友人");
      saveContacts();

      const saved = localStorage.getItem("contacts");
      expect(saved).not.toBeNull();
      expect(saved).toContain("保存テスト");
    });
  });

  describe('loadContacts関数', () => {
    it('localStorageからデータを読み込める', () => {
      const loadContacts = window.eval('loadContacts');
      const contacts = window.eval('contacts');

      const testData = [
        { id: 1, name: "読込テスト", email: "load@test.com", phone: "000", address: "読込市", category: "友人" }
      ];

      localStorage.setItem("contacts", JSON.stringify(testData));
      loadContacts();

      expect(contacts.length).toBeGreaterThan(0);
    });
  });

  describe('displayAllContacts関数', () => {
    it('連絡先がHTML表示される', () => {
      const addContact = window.eval('addContact');
      const displayAllContacts = window.eval('displayAllContacts');

      addContact("表示テスト", "display@test.com", "000-0000-0000", "表示市", "友人");
      displayAllContacts();

      const contactList = document.getElementById('contactList');
      expect(contactList.innerHTML).toContain("表示テスト");
    });

    it('連絡先がない場合は空状態を表示', () => {
      window.eval('contacts = []');
      const displayAllContacts = window.eval('displayAllContacts');

      displayAllContacts();

      const contactList = document.getElementById('contactList');
      expect(contactList.innerHTML).toContain("連絡先がありません");
    });
  });

  describe('updateStats関数', () => {
    it('統計情報が正しく更新される', () => {
      const addContact = window.eval('addContact');
      const updateStats = window.eval('updateStats');

      window.eval('contacts = []');
      addContact("友人1", "friend1@test.com", "111", "市", "友人");
      addContact("友人2", "friend2@test.com", "222", "市", "友人");
      addContact("仕事1", "work1@test.com", "333", "市", "仕事");

      updateStats();

      const totalCount = document.getElementById('totalCount').textContent;
      const friendCount = document.getElementById('friendCount').textContent;
      const workCount = document.getElementById('workCount').textContent;

      expect(parseInt(totalCount)).toBe(3);
      expect(parseInt(friendCount)).toBe(2);
      expect(parseInt(workCount)).toBe(1);
    });
  });

  describe('初期データ', () => {
    it('初回読み込み時に初期データが存在する', () => {
      const contacts = window.eval('contacts');
      expect(contacts.length).toBeGreaterThan(0);
    });

    it('初期データに山田太郎が含まれる', () => {
      const contacts = window.eval('contacts');
      let found = false;

      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].name === "山田太郎") {
          found = true;
          break;
        }
      }

      expect(found).toBe(true);
    });
  });

  describe('統合テスト', () => {
    it('追加→検索→削除のフローが正常に動作する', () => {
      const addContact = window.eval('addContact');
      const searchByName = window.eval('searchByName');
      const deleteContact = window.eval('deleteContact');

      const newContact = addContact("統合テスト", "integration@test.com", "999", "統合市", "友人");

      let found = searchByName("統合テスト");
      expect(found.length).toBeGreaterThan(0);

      const deleted = deleteContact(newContact.id);
      expect(deleted).toBe(true);

      found = searchByName("統合テスト");
      expect(found.length).toBe(0);
    });
  });
});
