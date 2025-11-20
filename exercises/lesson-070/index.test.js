import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 070: preventDefault', () => {
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

  it('myForm要素が存在する', () => {
    const myForm = document.getElementById('myForm');
    expect(myForm).not.toBeNull();
    expect(myForm.tagName).toBe('FORM');
  });

  it('urlInput要素が存在する', () => {
    const urlInput = document.getElementById('urlInput');
    expect(urlInput).not.toBeNull();
  });

  it('result要素が存在する', () => {
    const result = document.getElementById('result');
    expect(result).not.toBeNull();
  });

  it('正しいURL（https）の場合、正しいメッセージが表示される', () => {
    const myForm = document.getElementById('myForm');
    const urlInput = document.getElementById('urlInput');
    const result = document.getElementById('result');

    urlInput.value = 'https://example.com';

    const submitEvent = new window.Event('submit', {
      bubbles: true,
      cancelable: true,
    });
    myForm.dispatchEvent(submitEvent);

    expect(result.textContent).toContain('正しいURLです');
    expect(result.textContent).toContain('https://example.com');
  });

  it('正しいURL（http）の場合、正しいメッセージが表示される', () => {
    const myForm = document.getElementById('myForm');
    const urlInput = document.getElementById('urlInput');
    const result = document.getElementById('result');

    urlInput.value = 'http://example.com';

    const submitEvent = new window.Event('submit', {
      bubbles: true,
      cancelable: true,
    });
    myForm.dispatchEvent(submitEvent);

    expect(result.textContent).toContain('正しいURLです');
    expect(result.textContent).toContain('http://example.com');
  });

  it('正しくないURLの場合、エラーメッセージが表示される', () => {
    const myForm = document.getElementById('myForm');
    const urlInput = document.getElementById('urlInput');
    const result = document.getElementById('result');

    urlInput.value = 'example.com';

    const submitEvent = new window.Event('submit', {
      bubbles: true,
      cancelable: true,
    });
    myForm.dispatchEvent(submitEvent);

    expect(result.textContent).toContain('httpまたはhttpsで始まる必要があります');
  });

  it('正しくないURLの場合、resultの色が赤になる', () => {
    const myForm = document.getElementById('myForm');
    const urlInput = document.getElementById('urlInput');
    const result = document.getElementById('result');

    urlInput.value = 'example.com';

    const submitEvent = new window.Event('submit', {
      bubbles: true,
      cancelable: true,
    });
    myForm.dispatchEvent(submitEvent);

    expect(result.style.color).toBe('red');
  });

  it('正しいURLの場合、resultの色がredではない', () => {
    const myForm = document.getElementById('myForm');
    const urlInput = document.getElementById('urlInput');
    const result = document.getElementById('result');

    urlInput.value = 'https://example.com';

    const submitEvent = new window.Event('submit', {
      bubbles: true,
      cancelable: true,
    });
    myForm.dispatchEvent(submitEvent);

    expect(result.style.color).not.toBe('red');
  });
});
