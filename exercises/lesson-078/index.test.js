import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 078: 逆順ループ', () => {
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

  it('startCountdownボタンが存在する', () => {
    const startCountdown = document.getElementById('startCountdown');
    expect(startCountdown).not.toBeNull();
    expect(startCountdown.tagName).toBe('BUTTON');
  });

  it('result要素が存在する', () => {
    const result = document.getElementById('result');
    expect(result).not.toBeNull();
  });

  it('ボタンをクリックすると12個の要素が追加される（10から0 + 発射）', () => {
    const startCountdown = document.getElementById('startCountdown');
    const result = document.getElementById('result');

    startCountdown.click();

    const numbers = result.querySelectorAll('div');
    expect(numbers.length).toBe(12);
  });

  it('10から0まで逆順に表示される', () => {
    const startCountdown = document.getElementById('startCountdown');
    const result = document.getElementById('result');

    startCountdown.click();

    const numbers = result.querySelectorAll('div');
    expect(numbers[0].textContent).toContain('10');
    expect(numbers[1].textContent).toContain('9');
    expect(numbers[2].textContent).toContain('8');
    expect(numbers[10].textContent).toContain('0');
  });

  it('最後に「発射！」というメッセージが表示される', () => {
    const startCountdown = document.getElementById('startCountdown');
    const result = document.getElementById('result');

    startCountdown.click();

    const allDivs = result.querySelectorAll('div');
    const lastDiv = allDivs[allDivs.length - 1];
    expect(lastDiv.textContent).toContain('発射');
  });
});
