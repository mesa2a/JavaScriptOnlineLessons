import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 138: オブジェクトの配列', () => {
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

  it('productList要素が存在する', () => {
    const productList = document.getElementById('productList');
    expect(productList).not.toBeNull();
  });

  it('highStock要素が存在する', () => {
    const highStock = document.getElementById('highStock');
    expect(highStock).not.toBeNull();
  });

  it('totalValue要素が存在する', () => {
    const totalValue = document.getElementById('totalValue');
    expect(totalValue).not.toBeNull();
  });

  it('mostExpensive要素が存在する', () => {
    const mostExpensive = document.getElementById('mostExpensive');
    expect(mostExpensive).not.toBeNull();
  });

  it('商品リストが表示されている', () => {
    const productList = document.getElementById('productList');
    expect(productList.innerHTML.length).toBeGreaterThan(0);
  });

  it('在庫10個以上の商品数が正しく表示される', () => {
    const highStock = document.getElementById('highStock');
    expect(highStock.textContent).toBe('3');
  });

  it('総在庫金額が正しく計算される', () => {
    const totalValue = document.getElementById('totalValue');
    expect(totalValue.textContent).toBe('196500');
  });

  it('最高額商品が正しく表示される', () => {
    const mostExpensive = document.getElementById('mostExpensive');
    expect(mostExpensive.textContent).toBe('モニター');
  });

  it('商品リストに全ての商品が含まれる', () => {
    const productList = document.getElementById('productList');
    const content = productList.innerHTML;
    expect(content).toContain('ワイヤレスマウス');
    expect(content).toContain('キーボード');
    expect(content).toContain('モニター');
    expect(content).toContain('Webカメラ');
  });

  it('商品リストに価格が含まれる', () => {
    const productList = document.getElementById('productList');
    const content = productList.innerHTML;
    expect(content).toContain('2500');
    expect(content).toContain('5000');
    expect(content).toContain('25000');
    expect(content).toContain('7000');
  });
});
