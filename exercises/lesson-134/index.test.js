import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 134: 最初のオブジェクト', () => {
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

  it('bookTitle要素が存在する', () => {
    const bookTitle = document.getElementById('bookTitle');
    expect(bookTitle).not.toBeNull();
  });

  it('bookAuthor要素が存在する', () => {
    const bookAuthor = document.getElementById('bookAuthor');
    expect(bookAuthor).not.toBeNull();
  });

  it('bookPrice要素が存在する', () => {
    const bookPrice = document.getElementById('bookPrice');
    expect(bookPrice).not.toBeNull();
  });

  it('bookPages要素が存在する', () => {
    const bookPages = document.getElementById('bookPages');
    expect(bookPages).not.toBeNull();
  });

  it('bookTitleに正しい値が表示される', () => {
    const bookTitle = document.getElementById('bookTitle');
    expect(bookTitle.textContent).toBe('JavaScript入門');
  });

  it('bookAuthorに正しい値が表示される', () => {
    const bookAuthor = document.getElementById('bookAuthor');
    expect(bookAuthor.textContent).toBe('山田太郎');
  });

  it('bookPriceに正しい値が表示される', () => {
    const bookPrice = document.getElementById('bookPrice');
    expect(bookPrice.textContent).toBe('2800');
  });

  it('bookPagesに正しい値が表示される', () => {
    const bookPages = document.getElementById('bookPages');
    expect(bookPages.textContent).toBe('350');
  });
});
