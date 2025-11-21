/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lesson 116: ローカル変数', () => {
  let html;
  let scriptContent;

  beforeAll(() => {
    // HTMLファイルを読み込む
    html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    // スクリプトファイルを読み込む
    scriptContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
  });

  beforeEach(() => {
    // DOMをセットアップ
    document.documentElement.innerHTML = html;

    // スクリプトを実行
    eval(scriptContent);
  });

  describe('calculateDiscount関数', () => {
    test('calculateDiscount関数が定義されている', () => {
      expect(typeof calculateDiscount).toBe('function');
    });

    test('価格10000円、割引率20%の場合、8000円を返す', () => {
      expect(calculateDiscount(10000, 20)).toBe(8000);
    });

    test('価格5000円、割引率10%の場合、4500円を返す', () => {
      expect(calculateDiscount(5000, 10)).toBe(4500);
    });

    test('価格8000円、割引率25%の場合、6000円を返す', () => {
      expect(calculateDiscount(8000, 25)).toBe(6000);
    });

    test('価格3000円、割引率50%の場合、1500円を返す', () => {
      expect(calculateDiscount(3000, 50)).toBe(1500);
    });

    test('割引率0%の場合、元の価格を返す', () => {
      expect(calculateDiscount(10000, 0)).toBe(10000);
    });
  });

  describe('calculate関数', () => {
    test('calculate関数が定義されている', () => {
      expect(typeof calculate).toBe('function');
    });

    test('正しい入力で割引後の価格を表示する', () => {
      document.getElementById('priceInput').value = '10000';
      document.getElementById('rateInput').value = '20';

      calculate();

      const output = document.getElementById('output').textContent;
      expect(output).toContain('8000');
    });

    test('価格が0以下の場合、エラーメッセージを表示する', () => {
      document.getElementById('priceInput').value = '0';
      document.getElementById('rateInput').value = '20';

      calculate();

      const output = document.getElementById('output').textContent;
      expect(output).toContain('正しい値');
    });

    test('割引率がマイナスの場合、エラーメッセージを表示する', () => {
      document.getElementById('priceInput').value = '10000';
      document.getElementById('rateInput').value = '-10';

      calculate();

      const output = document.getElementById('output').textContent;
      expect(output).toContain('正しい値');
    });

    test('割引率が100を超える場合、エラーメッセージを表示する', () => {
      document.getElementById('priceInput').value = '10000';
      document.getElementById('rateInput').value = '150';

      calculate();

      const output = document.getElementById('output').textContent;
      expect(output).toContain('正しい値');
    });
  });

  describe('ローカル変数の使用', () => {
    test('calculateDiscount関数内でローカル変数を使用している', () => {
      // 関数のソースコードを取得
      const funcSource = calculateDiscount.toString();

      // constまたはletでローカル変数を宣言しているか確認
      expect(funcSource).toMatch(/const|let/);
    });

    test('calculate関数内でローカル変数を使用している', () => {
      // 関数のソースコードを取得
      const funcSource = calculate.toString();

      // constまたはletでローカル変数を宣言しているか確認
      expect(funcSource).toMatch(/const|let/);
    });
  });
});
