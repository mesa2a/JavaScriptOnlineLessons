import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 081: ループとDOM', () => {
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

  it('createNumberedListボタンが存在する', () => {
    const createNumberedList = document.getElementById('createNumberedList');
    expect(createNumberedList).not.toBeNull();
    expect(createNumberedList.tagName).toBe('BUTTON');
  });

  it('result要素が存在する', () => {
    const result = document.getElementById('result');
    expect(result).not.toBeNull();
  });

  it('ボタンをクリックすると20個の要素が追加される', () => {
    const createNumberedList = document.getElementById('createNumberedList');
    const result = document.getElementById('result');

    createNumberedList.click();

    const items = result.querySelectorAll('div');
    expect(items.length).toBe(20);
  });

  it('1番目の要素に「アイテム1」が表示される', () => {
    const createNumberedList = document.getElementById('createNumberedList');
    const result = document.getElementById('result');

    createNumberedList.click();

    const items = result.querySelectorAll('div');
    expect(items[0].textContent).toContain('アイテム1');
  });

  it('10番目の要素に「アイテム10」が表示される', () => {
    const createNumberedList = document.getElementById('createNumberedList');
    const result = document.getElementById('result');

    createNumberedList.click();

    const items = result.querySelectorAll('div');
    expect(items[9].textContent).toContain('アイテム10');
  });

  it('20番目の要素に「アイテム20」が表示される', () => {
    const createNumberedList = document.getElementById('createNumberedList');
    const result = document.getElementById('result');

    createNumberedList.click();

    const items = result.querySelectorAll('div');
    expect(items[19].textContent).toContain('アイテム20');
  });

  it('ボタンを再度クリックすると前回の結果がクリアされる', () => {
    const createNumberedList = document.getElementById('createNumberedList');
    const result = document.getElementById('result');

    // 1回目のクリック
    createNumberedList.click();
    let items = result.querySelectorAll('div');
    expect(items.length).toBe(20);

    // 2回目のクリック
    createNumberedList.click();
    items = result.querySelectorAll('div');
    expect(items.length).toBe(20); // 40個ではなく20個のまま
  });
});
