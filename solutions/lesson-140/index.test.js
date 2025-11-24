import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 140: for...inループ (Solution)', () => {
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

  describe('オブジェクトの定義', () => {
    it('productオブジェクトが定義されている', () => {
      expect(product).toBeDefined();
    });

    it('必要なプロパティが存在する', () => {
      expect(product.id).toBe(101);
      expect(product.name).toBe('ワイヤレスマウス');
      expect(product.price).toBe(2500);
      expect(product.brand).toBe('LogiTech');
      expect(product.inStock).toBe(true);
    });
  });

  describe('1. 全プロパティ一覧', () => {
    it('allProperties要素が存在する', () => {
      const allProperties = document.getElementById('allProperties');
      expect(allProperties).not.toBeNull();
    });

    it('全プロパティが表示されている', () => {
      const allProperties = document.getElementById('allProperties');
      expect(allProperties.innerHTML.length).toBeGreaterThan(0);
    });

    it('プロパティ名が表示されている', () => {
      const allProperties = document.getElementById('allProperties');
      const content = allProperties.innerHTML;
      expect(content).toContain('id');
      expect(content).toContain('name');
      expect(content).toContain('price');
      expect(content).toContain('brand');
      expect(content).toContain('inStock');
    });

    it('プロパティ値が表示されている', () => {
      const allProperties = document.getElementById('allProperties');
      const content = allProperties.innerHTML;
      expect(content).toContain('101');
      expect(content).toContain('ワイヤレスマウス');
      expect(content).toContain('2500');
      expect(content).toContain('LogiTech');
    });
  });

  describe('2. プロパティ総数', () => {
    it('propertyCount要素が存在する', () => {
      const propertyCount = document.getElementById('propertyCount');
      expect(propertyCount).not.toBeNull();
    });

    it('プロパティ数が正しく表示される', () => {
      const propertyCount = document.getElementById('propertyCount');
      expect(propertyCount.textContent).toBe('5');
    });
  });

  describe('3. 数値型プロパティのみ', () => {
    it('numericProperties要素が存在する', () => {
      const numericProperties = document.getElementById('numericProperties');
      expect(numericProperties).not.toBeNull();
    });

    it('数値型プロパティが表示されている', () => {
      const numericProperties = document.getElementById('numericProperties');
      expect(numericProperties.innerHTML.length).toBeGreaterThan(0);
    });

    it('idプロパティが表示されている', () => {
      const numericProperties = document.getElementById('numericProperties');
      const content = numericProperties.innerHTML;
      expect(content).toContain('id');
      expect(content).toContain('101');
    });

    it('priceプロパティが表示されている', () => {
      const numericProperties = document.getElementById('numericProperties');
      const content = numericProperties.innerHTML;
      expect(content).toContain('price');
      expect(content).toContain('2500');
    });

    it('文字列型プロパティは表示されない', () => {
      const numericProperties = document.getElementById('numericProperties');
      const content = numericProperties.innerHTML.toLowerCase();
      // nameとbrandは文字列なので表示されないはず
      const hasName = content.includes('name') && content.includes('ワイヤレスマウス');
      const hasBrand = content.includes('brand') && content.includes('logitech');
      expect(hasName).toBe(false);
      expect(hasBrand).toBe(false);
    });
  });

  describe('4. プロパティ名リスト', () => {
    it('keyList要素が存在する', () => {
      const keyList = document.getElementById('keyList');
      expect(keyList).not.toBeNull();
    });

    it('プロパティ名リストが表示されている', () => {
      const keyList = document.getElementById('keyList');
      expect(keyList.innerHTML.length).toBeGreaterThan(0);
    });

    it('全てのプロパティ名が表示されている', () => {
      const keyList = document.getElementById('keyList');
      const content = keyList.innerHTML;
      expect(content).toContain('id');
      expect(content).toContain('name');
      expect(content).toContain('price');
      expect(content).toContain('brand');
      expect(content).toContain('inStock');
    });
  });

  describe('UI要素', () => {
    it('全ての必要な要素が存在する', () => {
      expect(document.getElementById('allProperties')).not.toBeNull();
      expect(document.getElementById('propertyCount')).not.toBeNull();
      expect(document.getElementById('numericProperties')).not.toBeNull();
      expect(document.getElementById('keyList')).not.toBeNull();
    });
  });
});
