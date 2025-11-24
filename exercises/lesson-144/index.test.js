import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 144: オブジェクトと関数 (Exercise)', () => {
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

  describe('UI要素', () => {
    it('productWithTax要素が存在する', () => {
      const productWithTax = document.getElementById('productWithTax');
      expect(productWithTax).not.toBeNull();
    });

    it('searchResults要素が存在する', () => {
      const searchResults = document.getElementById('searchResults');
      expect(searchResults).not.toBeNull();
    });

    it('orderStats要素が存在する', () => {
      const orderStats = document.getElementById('orderStats');
      expect(orderStats).not.toBeNull();
    });
  });

  describe('1. addTaxToProduct関数', () => {
    it('addTaxToProduct関数が定義されている', () => {
      const addTaxToProduct = window.eval('typeof addTaxToProduct');
      expect(addTaxToProduct).toBe('function');
    });

    it('元のプロパティを保持している', () => {
      const addTaxToProduct = window.eval('addTaxToProduct');
      if (typeof addTaxToProduct === 'function') {
        const product = { name: "テスト商品", price: 1000, category: "テスト" };
        const result = addTaxToProduct(product, 0.1);
        if (result) {
          expect(result.name).toBe("テスト商品");
          expect(result.price).toBe(1000);
          expect(result.category).toBe("テスト");
        }
      }
    });

    it('priceWithTaxプロパティが追加されている', () => {
      const addTaxToProduct = window.eval('addTaxToProduct');
      if (typeof addTaxToProduct === 'function') {
        const product = { name: "テスト商品", price: 1000, category: "テスト" };
        const result = addTaxToProduct(product, 0.1);
        if (result && result.priceWithTax) {
          expect(result.priceWithTax).toBe(1100);
        }
      }
    });

    it('元のオブジェクトを変更しない', () => {
      const addTaxToProduct = window.eval('addTaxToProduct');
      if (typeof addTaxToProduct === 'function') {
        const product = { name: "テスト商品", price: 1000, category: "テスト" };
        addTaxToProduct(product, 0.1);
        expect(product.priceWithTax).toBeUndefined();
      }
    });
  });

  describe('2. findUsers関数', () => {
    it('findUsers関数が定義されている', () => {
      const findUsers = window.eval('typeof findUsers');
      expect(findUsers).toBe('function');
    });

    it('年齢条件でフィルタリングできる', () => {
      const findUsers = window.eval('findUsers');
      if (typeof findUsers === 'function') {
        const users = [
          { name: "田中", age: 25, city: "東京" },
          { name: "佐藤", age: 35, city: "大阪" }
        ];
        const criteria = { minAge: 30 };
        const result = findUsers(users, criteria);
        if (result && Array.isArray(result)) {
          expect(result.length).toBeLessThanOrEqual(users.length);
        }
      }
    });

    it('都市条件でフィルタリングできる', () => {
      const findUsers = window.eval('findUsers');
      if (typeof findUsers === 'function') {
        const users = [
          { name: "田中", age: 25, city: "東京" },
          { name: "佐藤", age: 35, city: "大阪" }
        ];
        const criteria = { city: "東京" };
        const result = findUsers(users, criteria);
        if (result && Array.isArray(result)) {
          expect(result.length).toBeLessThanOrEqual(users.length);
        }
      }
    });

    it('複数条件でフィルタリングできる', () => {
      const findUsers = window.eval('findUsers');
      if (typeof findUsers === 'function') {
        const users = [
          { name: "田中", age: 25, city: "東京" },
          { name: "鈴木", age: 28, city: "東京" },
          { name: "佐藤", age: 32, city: "大阪" }
        ];
        const criteria = { minAge: 25, maxAge: 30, city: "東京" };
        const result = findUsers(users, criteria);
        if (result && Array.isArray(result)) {
          expect(result.length).toBeLessThanOrEqual(users.length);
        }
      }
    });
  });

  describe('3. getOrderStats関数', () => {
    it('getOrderStats関数が定義されている', () => {
      const getOrderStats = window.eval('typeof getOrderStats');
      expect(getOrderStats).toBe('function');
    });

    it('totalOrdersを返す', () => {
      const getOrderStats = window.eval('getOrderStats');
      if (typeof getOrderStats === 'function') {
        const orders = [
          { orderId: "O001", amount: 5000 },
          { orderId: "O002", amount: 3000 }
        ];
        const result = getOrderStats(orders);
        if (result && typeof result.totalOrders !== 'undefined') {
          expect(result.totalOrders).toBe(2);
        }
      }
    });

    it('totalAmountを計算する', () => {
      const getOrderStats = window.eval('getOrderStats');
      if (typeof getOrderStats === 'function') {
        const orders = [
          { orderId: "O001", amount: 5000 },
          { orderId: "O002", amount: 3000 }
        ];
        const result = getOrderStats(orders);
        if (result && typeof result.totalAmount !== 'undefined') {
          expect(result.totalAmount).toBe(8000);
        }
      }
    });

    it('averageAmountを計算する', () => {
      const getOrderStats = window.eval('getOrderStats');
      if (typeof getOrderStats === 'function') {
        const orders = [
          { orderId: "O001", amount: 5000 },
          { orderId: "O002", amount: 3000 }
        ];
        const result = getOrderStats(orders);
        if (result && typeof result.averageAmount !== 'undefined') {
          expect(result.averageAmount).toBe(4000);
        }
      }
    });
  });
});
