import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 139: メソッド', () => {
  let dom;
  let document;
  let window;
  let product;

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

    // productオブジェクトを取得
    product = window.eval('product');
  });

  describe('オブジェクトの構造', () => {
    it('productオブジェクトが定義されている', () => {
      expect(product).toBeDefined();
    });

    it('必要なプロパティが存在する', () => {
      expect(product.name).toBe('ノートパソコン');
      expect(product.price).toBe(80000);
      expect(product.stock).toBe(5);
      expect(product.taxRate).toBe(0.1);
    });

    it('必要なメソッドが存在する', () => {
      expect(typeof product.getPriceWithTax).toBe('function');
      expect(typeof product.sell).toBe('function');
      expect(typeof product.restock).toBe('function');
      expect(typeof product.displayInfo).toBe('function');
    });
  });

  describe('getPriceWithTaxメソッド', () => {
    it('税込価格を正しく計算する', () => {
      const priceWithTax = product.getPriceWithTax();
      expect(priceWithTax).toBe(88000);
    });
  });

  describe('sellメソッド', () => {
    it('在庫があれば販売できる', () => {
      const result = product.sell(1);
      expect(result).toBe('販売完了');
      expect(product.stock).toBe(4);
    });

    it('複数個販売できる', () => {
      product.sell(2);
      expect(product.stock).toBe(3);
    });

    it('在庫不足の場合はエラーメッセージを返す', () => {
      const result = product.sell(10);
      expect(result).toBe('在庫不足');
      expect(product.stock).toBe(5);
    });
  });

  describe('restockメソッド', () => {
    it('在庫を増やせる', () => {
      const result = product.restock(5);
      expect(result).toBe('入荷完了');
      expect(product.stock).toBe(10);
    });

    it('複数回入荷できる', () => {
      product.restock(3);
      product.restock(2);
      expect(product.stock).toBe(10);
    });
  });

  describe('displayInfoメソッド', () => {
    it('商品情報を表示する', () => {
      product.displayInfo();
      const infoBox = document.getElementById('productInfo');
      expect(infoBox).not.toBeNull();
      expect(infoBox.innerHTML.length).toBeGreaterThan(0);
    });

    it('商品名が表示される', () => {
      product.displayInfo();
      const infoBox = document.getElementById('productInfo');
      expect(infoBox.innerHTML).toContain('ノートパソコン');
    });

    it('価格が表示される', () => {
      product.displayInfo();
      const infoBox = document.getElementById('productInfo');
      expect(infoBox.innerHTML).toContain('80000');
    });

    it('在庫が表示される', () => {
      product.displayInfo();
      const infoBox = document.getElementById('productInfo');
      expect(infoBox.innerHTML).toContain('5');
    });
  });

  describe('UI要素', () => {
    it('必要な要素が存在する', () => {
      expect(document.getElementById('productInfo')).not.toBeNull();
      expect(document.getElementById('result')).not.toBeNull();
      expect(document.getElementById('sellBtn')).not.toBeNull();
      expect(document.getElementById('restockBtn')).not.toBeNull();
      expect(document.getElementById('showPriceBtn')).not.toBeNull();
    });
  });
});
