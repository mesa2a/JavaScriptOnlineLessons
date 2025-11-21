/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lesson 119: 単一責任', () => {
  let html;
  let scriptContent;

  beforeAll(() => {
    html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    scriptContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
  });

  beforeEach(() => {
    document.documentElement.innerHTML = html;
    eval(scriptContent);
  });

  describe('getFormData関数', () => {
    test('getFormData関数が定義されている', () => {
      expect(typeof getFormData).toBe('function');
    });

    test('フォームデータをオブジェクトで返す', () => {
      document.getElementById('username').value = 'testuser';
      document.getElementById('email').value = 'test@example.com';
      document.getElementById('password').value = 'password123';

      const data = getFormData();
      expect(data).toHaveProperty('username', 'testuser');
      expect(data).toHaveProperty('email', 'test@example.com');
      expect(data).toHaveProperty('password', 'password123');
    });
  });

  describe('isValidUsername関数', () => {
    test('isValidUsername関数が定義されている', () => {
      expect(typeof isValidUsername).toBe('function');
    });

    test('3文字以上の場合trueを返す', () => {
      expect(isValidUsername('abc')).toBe(true);
      expect(isValidUsername('abcd')).toBe(true);
    });

    test('3文字未満の場合falseを返す', () => {
      expect(isValidUsername('ab')).toBe(false);
      expect(isValidUsername('a')).toBe(false);
      expect(isValidUsername('')).toBe(false);
    });
  });

  describe('isValidEmail関数', () => {
    test('isValidEmail関数が定義されている', () => {
      expect(typeof isValidEmail).toBe('function');
    });

    test('@と.を含む場合trueを返す', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user@mail.co.jp')).toBe(true);
    });

    test('@がない場合falseを返す', () => {
      expect(isValidEmail('test.example.com')).toBe(false);
    });

    test('.がない場合falseを返す', () => {
      expect(isValidEmail('test@example')).toBe(false);
    });
  });

  describe('isValidPassword関数', () => {
    test('isValidPassword関数が定義されている', () => {
      expect(typeof isValidPassword).toBe('function');
    });

    test('8文字以上の場合trueを返す', () => {
      expect(isValidPassword('12345678')).toBe(true);
      expect(isValidPassword('password123')).toBe(true);
    });

    test('8文字未満の場合falseを返す', () => {
      expect(isValidPassword('1234567')).toBe(false);
      expect(isValidPassword('pass')).toBe(false);
      expect(isValidPassword('')).toBe(false);
    });
  });

  describe('validateForm関数', () => {
    test('validateForm関数が定義されている', () => {
      expect(typeof validateForm).toBe('function');
    });

    test('すべて有効な場合、validがtrueを返す', () => {
      const data = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
      const result = validateForm(data);
      expect(result.valid).toBe(true);
    });

    test('ユーザー名が無効な場合、validがfalseとメッセージを返す', () => {
      const data = {
        username: 'ab',
        email: 'test@example.com',
        password: 'password123'
      };
      const result = validateForm(data);
      expect(result.valid).toBe(false);
      expect(result.message).toContain('ユーザー名');
    });

    test('メールが無効な場合、validがfalseとメッセージを返す', () => {
      const data = {
        username: 'testuser',
        email: 'invalid',
        password: 'password123'
      };
      const result = validateForm(data);
      expect(result.valid).toBe(false);
      expect(result.message).toContain('メール');
    });

    test('パスワードが無効な場合、validがfalseとメッセージを返す', () => {
      const data = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'pass'
      };
      const result = validateForm(data);
      expect(result.valid).toBe(false);
      expect(result.message).toContain('パスワード');
    });
  });

  describe('showError関数', () => {
    test('showError関数が定義されている', () => {
      expect(typeof showError).toBe('function');
    });

    test('エラーメッセージを表示する', () => {
      showError('テストエラー');
      const messageDiv = document.getElementById('message');
      expect(messageDiv.textContent).toBe('テストエラー');
      expect(messageDiv.className).toBe('message error');
    });
  });

  describe('showSuccess関数', () => {
    test('showSuccess関数が定義されている', () => {
      expect(typeof showSuccess).toBe('function');
    });

    test('成功メッセージを表示する', () => {
      showSuccess('testuser');
      const messageDiv = document.getElementById('message');
      expect(messageDiv.textContent).toContain('testuser');
      expect(messageDiv.textContent).toContain('登録が完了');
      expect(messageDiv.className).toBe('message success');
    });
  });

  describe('clearForm関数', () => {
    test('clearForm関数が定義されている', () => {
      expect(typeof clearForm).toBe('function');
    });

    test('フォームの入力をクリアする', () => {
      document.getElementById('username').value = 'test';
      document.getElementById('email').value = 'test@example.com';
      document.getElementById('password').value = 'password';

      clearForm();

      expect(document.getElementById('username').value).toBe('');
      expect(document.getElementById('email').value).toBe('');
      expect(document.getElementById('password').value).toBe('');
    });
  });

  describe('register関数', () => {
    test('register関数が定義されている', () => {
      expect(typeof register).toBe('function');
    });

    test('有効な入力で成功メッセージを表示する', () => {
      document.getElementById('username').value = 'testuser';
      document.getElementById('email').value = 'test@example.com';
      document.getElementById('password').value = 'password123';

      register();

      const messageDiv = document.getElementById('message');
      expect(messageDiv.className).toBe('message success');
      expect(messageDiv.textContent).toContain('testuser');
    });

    test('無効な入力でエラーメッセージを表示する', () => {
      document.getElementById('username').value = 'ab';
      document.getElementById('email').value = 'test@example.com';
      document.getElementById('password').value = 'password123';

      register();

      const messageDiv = document.getElementById('message');
      expect(messageDiv.className).toBe('message error');
    });

    test('成功時にフォームをクリアする', () => {
      document.getElementById('username').value = 'testuser';
      document.getElementById('email').value = 'test@example.com';
      document.getElementById('password').value = 'password123';

      register();

      expect(document.getElementById('username').value).toBe('');
      expect(document.getElementById('email').value).toBe('');
      expect(document.getElementById('password').value).toBe('');
    });
  });

  describe('単一責任の確認', () => {
    test('各検証関数は独立して使用できる', () => {
      expect(isValidUsername('test')).toBe(true);
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidPassword('password123')).toBe(true);
    });

    test('getFormDataは他の処理に依存しない', () => {
      document.getElementById('username').value = 'test';
      const data = getFormData();
      expect(data.username).toBe('test');
    });
  });
});
