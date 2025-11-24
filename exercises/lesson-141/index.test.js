import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 141: オブジェクトのコピー', () => {
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
    it('userオブジェクトが定義されている', () => {
      const user = window.eval('user');
      expect(user).toBeDefined();
    });

    it('必要なプロパティが存在する', () => {
      const user = window.eval('user');
      expect(user.username).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.age).toBeDefined();
      expect(user.premium).toBeDefined();
    });
  });

  describe('UI要素', () => {
    it('referenceResult要素が存在する', () => {
      const referenceResult = document.getElementById('referenceResult');
      expect(referenceResult).not.toBeNull();
    });

    it('assignResult要素が存在する', () => {
      const assignResult = document.getElementById('assignResult');
      expect(assignResult).not.toBeNull();
    });

    it('spreadResult要素が存在する', () => {
      const spreadResult = document.getElementById('spreadResult');
      expect(spreadResult).not.toBeNull();
    });

    it('upgradeResult要素が存在する', () => {
      const upgradeResult = document.getElementById('upgradeResult');
      expect(upgradeResult).not.toBeNull();
    });

    it('allUsers要素が存在する', () => {
      const allUsers = document.getElementById('allUsers');
      expect(allUsers).not.toBeNull();
    });
  });

  describe('1. 参照コピー', () => {
    it('referenceResultに内容が表示されている', () => {
      const referenceResult = document.getElementById('referenceResult');
      expect(referenceResult.innerHTML.length).toBeGreaterThan(0);
    });

    it('参照コピーの説明が含まれている', () => {
      const referenceResult = document.getElementById('referenceResult');
      const content = referenceResult.innerHTML;
      expect(content).toContain('ユーザー名');
    });
  });

  describe('2. Object.assign()', () => {
    it('assignResultに内容が表示されている', () => {
      const assignResult = document.getElementById('assignResult');
      expect(assignResult.innerHTML.length).toBeGreaterThan(0);
    });

    it('Object.assign()の説明が含まれている', () => {
      const assignResult = document.getElementById('assignResult');
      const content = assignResult.innerHTML;
      expect(content).toContain('メール');
    });
  });

  describe('3. スプレッド構文', () => {
    it('spreadResultに内容が表示されている', () => {
      const spreadResult = document.getElementById('spreadResult');
      expect(spreadResult.innerHTML.length).toBeGreaterThan(0);
    });

    it('スプレッド構文の説明が含まれている', () => {
      const spreadResult = document.getElementById('spreadResult');
      const content = spreadResult.innerHTML;
      expect(content).toContain('年齢');
    });
  });

  describe('4. プレミアムアップグレード', () => {
    it('upgradeResultに内容が表示されている', () => {
      const upgradeResult = document.getElementById('upgradeResult');
      expect(upgradeResult.innerHTML.length).toBeGreaterThan(0);
    });

    it('プレミアムステータスの説明が含まれている', () => {
      const upgradeResult = document.getElementById('upgradeResult');
      const content = upgradeResult.innerHTML;
      expect(content.toLowerCase()).toContain('premium');
    });
  });

  describe('5. 全ユーザー一覧', () => {
    it('allUsersに内容が表示されている', () => {
      const allUsers = document.getElementById('allUsers');
      expect(allUsers.innerHTML.length).toBeGreaterThan(0);
    });

    it('複数のユーザーカードが表示されている', () => {
      const allUsers = document.getElementById('allUsers');
      const content = allUsers.innerHTML;
      const cardCount = (content.match(/user-card/g) || []).length;
      expect(cardCount).toBeGreaterThanOrEqual(3);
    });

    it('ユーザー情報が表示されている', () => {
      const allUsers = document.getElementById('allUsers');
      const content = allUsers.innerHTML;
      expect(content).toContain('Username');
      expect(content).toContain('Email');
      expect(content).toContain('Age');
    });
  });

  describe('createUserCard関数', () => {
    it('createUserCard関数が定義されている', () => {
      const createUserCard = window.eval('createUserCard');
      expect(typeof createUserCard).toBe('function');
    });
  });
});
