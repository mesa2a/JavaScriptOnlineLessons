/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('レッスン129: デバッグとエラー処理', () => {
  let divide;
  let checkAge;
  let validateForm;
  let safeParseJSON;
  let processUserData;

  beforeAll(() => {
    const scriptPath = path.join(__dirname, 'script.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

    // HTMLのモック
    document.body.innerHTML = `
      <div id="errorOutput"></div>
      <div id="tryCatchOutput"></div>
      <div id="divideOutput"></div>
      <div id="ageOutput"></div>
      <div id="formResult"></div>
      <div id="jsonOutput"></div>
      <div id="processingOutput"></div>
      <form id="userForm">
        <input type="text" id="name">
        <input type="text" id="email">
        <input type="number" id="age">
      </form>
    `;

    // console.logをモック
    global.console.log = jest.fn();

    eval(scriptContent);

    divide = eval('divide');
    checkAge = eval('checkAge');
    validateForm = eval('validateForm');
    safeParseJSON = eval('safeParseJSON');
    processUserData = eval('processUserData');
  });

  describe('divide関数', () => {
    test('正常な除算ができる', () => {
      expect(divide(10, 2)).toBe(5);
      expect(divide(100, 4)).toBe(25);
      expect(divide(7, 2)).toBe(3.5);
    });

    test('0で割るとnullを返す', () => {
      expect(divide(10, 0)).toBe(null);
    });

    test('数値でない引数を渡すとnullを返す', () => {
      expect(divide('abc', 5)).toBe(null);
      expect(divide(10, 'xyz')).toBe(null);
      expect(divide('a', 'b')).toBe(null);
    });

    test('エラー時にconsole.logが呼ばれる', () => {
      global.console.log = jest.fn();
      divide(10, 0);
      expect(console.log).toHaveBeenCalled();
    });
  });

  describe('checkAge関数', () => {
    test('20歳以上の場合「成人です」を返す', () => {
      expect(checkAge(20)).toBe('成人です');
      expect(checkAge(25)).toBe('成人です');
      expect(checkAge(100)).toBe('成人です');
    });

    test('20歳未満の場合「未成年です」を返す', () => {
      expect(checkAge(0)).toBe('未成年です');
      expect(checkAge(10)).toBe('未成年です');
      expect(checkAge(19)).toBe('未成年です');
    });

    test('負の年齢でエラーを投げる', () => {
      expect(() => checkAge(-1)).toThrow('年齢は0以上である必要があります');
      expect(() => checkAge(-10)).toThrow();
    });

    test('120を超える年齢でエラーを投げる', () => {
      expect(() => checkAge(121)).toThrow('年齢が現実的な範囲を超えています');
      expect(() => checkAge(150)).toThrow();
    });

    test('数値でない引数でエラーを投げる', () => {
      expect(() => checkAge('abc')).toThrow('年齢は数値である必要があります');
      expect(() => checkAge(null)).toThrow();
    });
  });

  describe('validateForm関数', () => {
    test('正常なデータの場合、空の配列を返す', () => {
      const validData = {
        name: '田中太郎',
        email: 'tanaka@example.com',
        age: 25
      };
      expect(validateForm(validData)).toEqual([]);
    });

    test('名前が空の場合、エラーを返す', () => {
      const data = { name: '', email: 'test@example.com', age: 25 };
      const errors = validateForm(data);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.includes('名前'))).toBe(true);
    });

    test('名前が空白文字のみの場合、エラーを返す', () => {
      const data = { name: '   ', email: 'test@example.com', age: 25 };
      const errors = validateForm(data);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.includes('名前'))).toBe(true);
    });

    test('名前が50文字を超える場合、エラーを返す', () => {
      const longName = 'あ'.repeat(51);
      const data = { name: longName, email: 'test@example.com', age: 25 };
      const errors = validateForm(data);
      expect(errors.some(e => e.includes('50文字'))).toBe(true);
    });

    test('メールアドレスが空の場合、エラーを返す', () => {
      const data = { name: '田中太郎', email: '', age: 25 };
      const errors = validateForm(data);
      expect(errors.some(e => e.includes('メール'))).toBe(true);
    });

    test('メールアドレスに@が含まれない場合、エラーを返す', () => {
      const data = { name: '田中太郎', email: 'invalid-email', age: 25 };
      const errors = validateForm(data);
      expect(errors.some(e => e.includes('メール') || e.includes('有効'))).toBe(true);
    });

    test('年齢が空の場合、エラーを返す', () => {
      const data = { name: '田中太郎', email: 'test@example.com', age: '' };
      const errors = validateForm(data);
      expect(errors.some(e => e.includes('年齢'))).toBe(true);
    });

    test('年齢が数値でない場合、エラーを返す', () => {
      const data = { name: '田中太郎', email: 'test@example.com', age: 'abc' };
      const errors = validateForm(data);
      expect(errors.some(e => e.includes('年齢') || e.includes('数値'))).toBe(true);
    });

    test('年齢が範囲外の場合、エラーを返す', () => {
      const data1 = { name: '田中太郎', email: 'test@example.com', age: -5 };
      const errors1 = validateForm(data1);
      expect(errors1.some(e => e.includes('年齢') || e.includes('有効'))).toBe(true);

      const data2 = { name: '田中太郎', email: 'test@example.com', age: 150 };
      const errors2 = validateForm(data2);
      expect(errors2.some(e => e.includes('年齢') || e.includes('有効'))).toBe(true);
    });

    test('複数のエラーがある場合、すべて返す', () => {
      const data = { name: '', email: 'invalid', age: -5 };
      const errors = validateForm(data);
      expect(errors.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('safeParseJSON関数', () => {
    test('正常なJSONを解析できる', () => {
      const json = '{"name": "田中太郎", "age": 25}';
      const result = safeParseJSON(json);
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ name: '田中太郎', age: 25 });
    });

    test('配列のJSONを解析できる', () => {
      const json = '[1, 2, 3, 4, 5]';
      const result = safeParseJSON(json);
      expect(result.success).toBe(true);
      expect(result.data).toEqual([1, 2, 3, 4, 5]);
    });

    test('不正なJSONの場合、エラー情報を返す', () => {
      const json = '{ name: 太郎 }';
      const result = safeParseJSON(json);
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(typeof result.error).toBe('string');
    });

    test('空文字列の場合、エラー情報を返す', () => {
      const result = safeParseJSON('');
      expect(result.success).toBe(false);
    });

    test('クォートが不正な場合、エラー情報を返す', () => {
      const json = "{'name': 'test'}"; // シングルクォートは不正
      const result = safeParseJSON(json);
      expect(result.success).toBe(false);
    });
  });

  describe('processUserData関数', () => {
    test('正常なデータを処理できる', () => {
      const json = '{"name": "田中太郎", "email": "tanaka@example.com", "age": 25}';
      const result = processUserData(json);
      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        name: '田中太郎',
        email: 'tanaka@example.com',
        age: 25
      });
      expect(result.errors).toEqual([]);
    });

    test('JSON解析エラーの場合、エラー情報を返す', () => {
      const json = '{ invalid json }';
      const result = processUserData(json);
      expect(result.success).toBe(false);
      expect(result.data).toBe(null);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toContain('JSON');
    });

    test('バリデーションエラーの場合、エラー情報を返す', () => {
      const json = '{"name": "", "email": "invalid", "age": -5}';
      const result = processUserData(json);
      expect(result.success).toBe(false);
      expect(result.data).toBe(null);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('正常なJSONだがバリデーションに失敗する場合', () => {
      const json = '{"name": "田中太郎", "email": "no-at-sign", "age": 25}';
      const result = processUserData(json);
      expect(result.success).toBe(false);
      expect(result.errors.some(e => e.includes('メール') || e.includes('有効'))).toBe(true);
    });
  });

  describe('エラー処理の統合テスト', () => {
    test('divide関数はtry-catchを使用している', () => {
      // エラーが投げられてもプログラムが停止しないことを確認
      expect(() => divide('a', 'b')).not.toThrow();
      expect(divide('a', 'b')).toBe(null);
    });

    test('checkAge関数は適切にエラーを投げる', () => {
      // throwを使ってエラーを投げることを確認
      expect(() => checkAge(-1)).toThrow(Error);
      expect(() => checkAge(150)).toThrow(Error);
    });

    test('safeParseJSON関数はtry-catchを使用している', () => {
      // JSON.parse()のエラーをキャッチしてプログラムが停止しないことを確認
      expect(() => safeParseJSON('invalid')).not.toThrow();
      const result = safeParseJSON('invalid');
      expect(result.success).toBe(false);
    });

    test('processUserData関数は複数のエラー処理を統合している', () => {
      // JSON解析とバリデーションの両方を適切に処理することを確認
      const invalidJSON = '{ invalid }';
      const result1 = processUserData(invalidJSON);
      expect(result1.success).toBe(false);
      expect(result1.errors.length).toBeGreaterThan(0);

      const validJSONInvalidData = '{"name": "", "email": "x", "age": -1}';
      const result2 = processUserData(validJSONInvalidData);
      expect(result2.success).toBe(false);
      expect(result2.errors.length).toBeGreaterThan(0);
    });
  });

  describe('境界値テスト', () => {
    test('checkAgeは境界値を正しく処理する', () => {
      expect(checkAge(0)).toBe('未成年です');
      expect(checkAge(19)).toBe('未成年です');
      expect(checkAge(20)).toBe('成人です');
      expect(checkAge(120)).toBe('成人です');
    });

    test('validateFormは境界値を正しく処理する', () => {
      const exactLength = 'あ'.repeat(50);
      const data = { name: exactLength, email: 'test@example.com', age: 0 };
      const errors = validateForm(data);
      expect(errors.every(e => !e.includes('50文字'))).toBe(true);
    });

    test('divideは0除算を適切に処理する', () => {
      expect(divide(0, 5)).toBe(0);
      expect(divide(5, 0)).toBe(null);
    });
  });
});
