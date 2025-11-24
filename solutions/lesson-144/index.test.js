import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 144: オブジェクトと関数 (Solution)', () => {
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
      const addTaxToProduct = window.eval('addTaxToProduct');
      expect(typeof addTaxToProduct).toBe('function');
    });

    it('元のプロパティをすべて保持している', () => {
      const addTaxToProduct = window.eval('addTaxToProduct');
      const product = { name: "ノートパソコン", price: 80000, category: "電化製品" };
      const result = addTaxToProduct(product, 0.1);

      expect(result.name).toBe("ノートパソコン");
      expect(result.price).toBe(80000);
      expect(result.category).toBe("電化製品");
    });

    it('priceWithTaxプロパティが正しく計算されている', () => {
      const addTaxToProduct = window.eval('addTaxToProduct');
      const product = { name: "ノートパソコン", price: 80000, category: "電化製品" };
      const result = addTaxToProduct(product, 0.1);

      expect(result.priceWithTax).toBe(88000);
    });

    it('異なる税率で正しく計算される', () => {
      const addTaxToProduct = window.eval('addTaxToProduct');
      const product = { name: "本", price: 1000, category: "書籍" };
      const result = addTaxToProduct(product, 0.08);

      expect(result.priceWithTax).toBe(1080);
    });

    it('元のオブジェクトを変更しない（イミュータブル）', () => {
      const addTaxToProduct = window.eval('addTaxToProduct');
      const product = { name: "商品", price: 1000, category: "テスト" };
      const result = addTaxToProduct(product, 0.1);

      expect(product.priceWithTax).toBeUndefined();
      expect(result).not.toBe(product);
    });

    it('productWithTax要素に結果が表示されている', () => {
      const productDisplay = document.getElementById('productWithTax');
      expect(productDisplay.innerHTML).toContain('ノートパソコン');
      expect(productDisplay.innerHTML).toContain('88000');
    });
  });

  describe('2. findUsers関数', () => {
    it('findUsers関数が定義されている', () => {
      const findUsers = window.eval('findUsers');
      expect(typeof findUsers).toBe('function');
    });

    it('minAge条件で正しくフィルタリングされる', () => {
      const findUsers = window.eval('findUsers');
      const users = [
        { name: "田中", age: 25, city: "東京" },
        { name: "佐藤", age: 20, city: "大阪" }
      ];
      const criteria = { minAge: 25 };
      const result = findUsers(users, criteria);

      expect(result.length).toBe(1);
      expect(result[0].name).toBe("田中");
    });

    it('maxAge条件で正しくフィルタリングされる', () => {
      const findUsers = window.eval('findUsers');
      const users = [
        { name: "田中", age: 25, city: "東京" },
        { name: "佐藤", age: 35, city: "大阪" }
      ];
      const criteria = { maxAge: 30 };
      const result = findUsers(users, criteria);

      expect(result.length).toBe(1);
      expect(result[0].name).toBe("田中");
    });

    it('city条件で正しくフィルタリングされる', () => {
      const findUsers = window.eval('findUsers');
      const users = [
        { name: "田中", age: 25, city: "東京" },
        { name: "佐藤", age: 28, city: "大阪" },
        { name: "鈴木", age: 30, city: "東京" }
      ];
      const criteria = { city: "東京" };
      const result = findUsers(users, criteria);

      expect(result.length).toBe(2);
      expect(result[0].name).toBe("田中");
      expect(result[1].name).toBe("鈴木");
    });

    it('複数条件を組み合わせて正しくフィルタリングされる', () => {
      const findUsers = window.eval('findUsers');
      const users = [
        { name: "田中", age: 25, city: "東京" },
        { name: "佐藤", age: 32, city: "大阪" },
        { name: "鈴木", age: 28, city: "東京" },
        { name: "高橋", age: 45, city: "名古屋" },
        { name: "伊藤", age: 29, city: "東京" }
      ];
      const criteria = { minAge: 25, maxAge: 30, city: "東京" };
      const result = findUsers(users, criteria);

      expect(result.length).toBe(3);
      expect(result.map(u => u.name)).toContain("田中");
      expect(result.map(u => u.name)).toContain("鈴木");
      expect(result.map(u => u.name)).toContain("伊藤");
    });

    it('条件に合うユーザーがいない場合は空配列を返す', () => {
      const findUsers = window.eval('findUsers');
      const users = [
        { name: "田中", age: 25, city: "東京" }
      ];
      const criteria = { city: "大阪" };
      const result = findUsers(users, criteria);

      expect(result.length).toBe(0);
    });

    it('searchResults要素に検索結果が表示されている', () => {
      const searchDisplay = document.getElementById('searchResults');
      expect(searchDisplay.innerHTML).toContain('検索条件');
      expect(searchDisplay.innerHTML).toContain('検索結果');
      expect(searchDisplay.innerHTML).toContain('田中');
      expect(searchDisplay.innerHTML).toContain('鈴木');
      expect(searchDisplay.innerHTML).toContain('伊藤');
    });
  });

  describe('3. getOrderStats関数', () => {
    it('getOrderStats関数が定義されている', () => {
      const getOrderStats = window.eval('getOrderStats');
      expect(typeof getOrderStats).toBe('function');
    });

    it('totalOrdersが正しく計算される', () => {
      const getOrderStats = window.eval('getOrderStats');
      const orders = [
        { orderId: "O001", amount: 5000 },
        { orderId: "O002", amount: 3500 },
        { orderId: "O003", amount: 8000 }
      ];
      const result = getOrderStats(orders);

      expect(result.totalOrders).toBe(3);
    });

    it('totalAmountが正しく計算される', () => {
      const getOrderStats = window.eval('getOrderStats');
      const orders = [
        { orderId: "O001", amount: 5000 },
        { orderId: "O002", amount: 3500 },
        { orderId: "O003", amount: 8000 },
        { orderId: "O004", amount: 2500 },
        { orderId: "O005", amount: 6000 }
      ];
      const result = getOrderStats(orders);

      expect(result.totalAmount).toBe(25000);
    });

    it('averageAmountが正しく計算される', () => {
      const getOrderStats = window.eval('getOrderStats');
      const orders = [
        { orderId: "O001", amount: 5000 },
        { orderId: "O002", amount: 3500 },
        { orderId: "O003", amount: 8000 },
        { orderId: "O004", amount: 2500 },
        { orderId: "O005", amount: 6000 }
      ];
      const result = getOrderStats(orders);

      expect(result.averageAmount).toBe(5000);
    });

    it('1つの注文でも正しく計算される', () => {
      const getOrderStats = window.eval('getOrderStats');
      const orders = [
        { orderId: "O001", amount: 10000 }
      ];
      const result = getOrderStats(orders);

      expect(result.totalOrders).toBe(1);
      expect(result.totalAmount).toBe(10000);
      expect(result.averageAmount).toBe(10000);
    });

    it('オブジェクトに必要なプロパティがすべて含まれている', () => {
      const getOrderStats = window.eval('getOrderStats');
      const orders = [
        { orderId: "O001", amount: 5000 }
      ];
      const result = getOrderStats(orders);

      expect(result).toHaveProperty('totalOrders');
      expect(result).toHaveProperty('totalAmount');
      expect(result).toHaveProperty('averageAmount');
    });

    it('orderStats要素に統計情報が表示されている', () => {
      const statsDisplay = document.getElementById('orderStats');
      expect(statsDisplay.innerHTML).toContain('総注文数');
      expect(statsDisplay.innerHTML).toContain('総売上金額');
      expect(statsDisplay.innerHTML).toContain('平均注文金額');
      expect(statsDisplay.innerHTML).toContain('25000');
      expect(statsDisplay.innerHTML).toContain('5000');
    });
  });

  describe('データフロー', () => {
    it('関数がテストデータを正しく処理している', () => {
      const product = window.eval('product');
      const productWithTax = window.eval('productWithTax');
      const users = window.eval('users');
      const foundUsers = window.eval('foundUsers');
      const orders = window.eval('orders');
      const stats = window.eval('stats');

      expect(product).toBeDefined();
      expect(productWithTax).toBeDefined();
      expect(users).toBeDefined();
      expect(Array.isArray(foundUsers)).toBe(true);
      expect(orders).toBeDefined();
      expect(stats).toBeDefined();
    });

    it('関数の戻り値が適切に使用されている', () => {
      const productWithTax = window.eval('productWithTax');
      const foundUsers = window.eval('foundUsers');
      const stats = window.eval('stats');

      expect(productWithTax.priceWithTax).toBeDefined();
      expect(Array.isArray(foundUsers)).toBe(true);
      expect(stats.totalOrders).toBeDefined();
      expect(stats.totalAmount).toBeDefined();
      expect(stats.averageAmount).toBeDefined();
    });
  });
});
