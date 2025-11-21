/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lesson 120: 名前付け', () => {
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

  describe('カート機能の関数', () => {
    test('getPrice関数が定義されている', () => {
      expect(typeof getPrice).toBe('function');
    });

    test('getPriceが価格を取得できる', () => {
      document.getElementById('priceInput').value = '1500';
      expect(getPrice()).toBe(1500);
    });

    test('getQuantity関数が定義されている', () => {
      expect(typeof getQuantity).toBe('function');
    });

    test('getQuantityが数量を取得できる', () => {
      document.getElementById('quantityInput').value = '3';
      expect(getQuantity()).toBe(3);
    });

    test('calculateSubtotal関数が定義されている', () => {
      expect(typeof calculateSubtotal).toBe('function');
    });

    test('calculateSubtotalが小計を計算できる', () => {
      expect(calculateSubtotal(1000, 2)).toBe(2000);
      expect(calculateSubtotal(500, 3)).toBe(1500);
    });

    test('calculateTax関数が定義されている', () => {
      expect(typeof calculateTax).toBe('function');
    });

    test('calculateTaxが税金を計算できる', () => {
      expect(calculateTax(1000)).toBe(100);
      expect(calculateTax(2000)).toBe(200);
    });

    test('calculateTotal関数が定義されている', () => {
      expect(typeof calculateTotal).toBe('function');
    });

    test('calculateTotalが合計を計算できる', () => {
      expect(calculateTotal(1000, 100)).toBe(1100);
      expect(calculateTotal(2000, 200)).toBe(2200);
    });

    test('showCartSummary関数が定義されている', () => {
      expect(typeof showCartSummary).toBe('function');
    });

    test('showCartSummaryがカート概要を表示できる', () => {
      showCartSummary(1000, 100, 1100);
      const result = document.getElementById('cartResult').innerHTML;
      expect(result).toContain('1000');
      expect(result).toContain('100');
      expect(result).toContain('1100');
    });

    test('updateCart関数が定義されている', () => {
      expect(typeof updateCart).toBe('function');
    });

    test('updateCartが正しく動作する', () => {
      document.getElementById('priceInput').value = '1000';
      document.getElementById('quantityInput').value = '2';
      updateCart();
      const result = document.getElementById('cartResult').innerHTML;
      expect(result).toContain('2000'); // 小計
    });
  });

  describe('ユーザー情報機能の関数', () => {
    test('getUserName関数が定義されている', () => {
      expect(typeof getUserName).toBe('function');
    });

    test('getUserNameが名前を取得できる', () => {
      document.getElementById('nameInput').value = '山田太郎';
      expect(getUserName()).toBe('山田太郎');
    });

    test('getUserEmail関数が定義されている', () => {
      expect(typeof getUserEmail).toBe('function');
    });

    test('getUserEmailがメールを取得できる', () => {
      document.getElementById('emailInput').value = 'test@example.com';
      expect(getUserEmail()).toBe('test@example.com');
    });

    test('validateEmail関数が定義されている', () => {
      expect(typeof validateEmail).toBe('function');
    });

    test('validateEmailが正しく検証できる', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@example')).toBe(false);
    });

    test('createUserData関数が定義されている', () => {
      expect(typeof createUserData).toBe('function');
    });

    test('createUserDataがユーザーデータを作成できる', () => {
      const data = createUserData('太郎', 'taro@example.com');
      expect(data).toHaveProperty('name', '太郎');
      expect(data).toHaveProperty('email', 'taro@example.com');
      expect(data).toHaveProperty('createdAt');
    });

    test('showUserResult関数が定義されている', () => {
      expect(typeof showUserResult).toBe('function');
    });

    test('showUserResultがメッセージを表示できる', () => {
      showUserResult('テストメッセージ');
      const result = document.getElementById('userResult').innerHTML;
      expect(result).toContain('テストメッセージ');
    });

    test('saveUserInfo関数が定義されている', () => {
      expect(typeof saveUserInfo).toBe('function');
    });

    test('saveUserInfoが空の名前でエラーを表示', () => {
      document.getElementById('nameInput').value = '';
      document.getElementById('emailInput').value = 'test@example.com';
      saveUserInfo();
      const result = document.getElementById('userResult').innerHTML;
      expect(result).toContain('名前');
    });

    test('saveUserInfoが無効なメールでエラーを表示', () => {
      document.getElementById('nameInput').value = '太郎';
      document.getElementById('emailInput').value = 'invalid';
      saveUserInfo();
      const result = document.getElementById('userResult').innerHTML;
      expect(result).toContain('メール');
    });

    test('saveUserInfoが有効な入力で成功メッセージを表示', () => {
      document.getElementById('nameInput').value = '太郎';
      document.getElementById('emailInput').value = 'taro@example.com';
      saveUserInfo();
      const result = document.getElementById('userResult').innerHTML;
      expect(result).toContain('太郎');
      expect(result).toContain('保存');
    });
  });

  describe('メッセージ表示機能の関数', () => {
    test('showWelcomeMessage関数が定義されている', () => {
      expect(typeof showWelcomeMessage).toBe('function');
    });

    test('showWelcomeMessageがメッセージを表示できる', () => {
      showWelcomeMessage();
      const result = document.getElementById('messageArea').innerHTML;
      expect(result).toContain('ようこそ');
    });

    test('hideMessage関数が定義されている', () => {
      expect(typeof hideMessage).toBe('function');
    });

    test('hideMessageがメッセージを非表示にできる', () => {
      showWelcomeMessage();
      hideMessage();
      const result = document.getElementById('messageArea').innerHTML;
      expect(result).toBe('');
    });
  });

  describe('命名規則の確認', () => {
    test('すべての関数がキャメルケースである', () => {
      const functionNames = [
        'getPrice', 'getQuantity', 'calculateSubtotal', 'calculateTax',
        'calculateTotal', 'showCartSummary', 'updateCart', 'getUserName',
        'getUserEmail', 'validateEmail', 'createUserData', 'showUserResult',
        'saveUserInfo', 'showWelcomeMessage', 'hideMessage'
      ];

      functionNames.forEach(name => {
        // キャメルケースのチェック（最初が小文字）
        expect(name[0]).toBe(name[0].toLowerCase());
        // スネークケースでないことを確認
        expect(name).not.toContain('_');
      });
    });

    test('取得系関数がgetで始まる', () => {
      expect(typeof getPrice).toBe('function');
      expect(typeof getQuantity).toBe('function');
      expect(typeof getUserName).toBe('function');
      expect(typeof getUserEmail).toBe('function');
    });

    test('計算系関数がcalculateで始まる', () => {
      expect(typeof calculateSubtotal).toBe('function');
      expect(typeof calculateTax).toBe('function');
      expect(typeof calculateTotal).toBe('function');
    });

    test('表示系関数がshowで始まる', () => {
      expect(typeof showCartSummary).toBe('function');
      expect(typeof showUserResult).toBe('function');
      expect(typeof showWelcomeMessage).toBe('function');
    });

    test('検証系関数がvalidateで始まる', () => {
      expect(typeof validateEmail).toBe('function');
    });

    test('作成系関数がcreateで始まる', () => {
      expect(typeof createUserData).toBe('function');
    });
  });
});
