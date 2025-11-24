import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 137: 複雑なオブジェクト', () => {
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

  it('libraryName要素が存在する', () => {
    const libraryName = document.getElementById('libraryName');
    expect(libraryName).not.toBeNull();
  });

  it('libraryAddress要素が存在する', () => {
    const libraryAddress = document.getElementById('libraryAddress');
    expect(libraryAddress).not.toBeNull();
  });

  it('availableCount要素が存在する', () => {
    const availableCount = document.getElementById('availableCount');
    expect(availableCount).not.toBeNull();
  });

  it('firstBook要素が存在する', () => {
    const firstBook = document.getElementById('firstBook');
    expect(firstBook).not.toBeNull();
  });

  it('図書館の名前が正しく表示される', () => {
    const libraryName = document.getElementById('libraryName');
    expect(libraryName.textContent).toBe('市立図書館');
  });

  it('図書館の住所が正しく表示される', () => {
    const libraryAddress = document.getElementById('libraryAddress');
    expect(libraryAddress.textContent).toBe('東京新宿1-1-1');
  });

  it('利用可能な本の数が正しく表示される', () => {
    const availableCount = document.getElementById('availableCount');
    expect(availableCount.textContent).toBe('2');
  });

  it('最初の本の情報が正しく表示される', () => {
    const firstBook = document.getElementById('firstBook');
    expect(firstBook.textContent).toBe('JavaScript入門 - 山田太郎');
  });
});
