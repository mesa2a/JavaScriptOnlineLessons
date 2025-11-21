import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 076: break文', () => {
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

  it('startGameボタンが存在する', () => {
    const startGame = document.getElementById('startGame');
    expect(startGame).not.toBeNull();
    expect(startGame.tagName).toBe('BUTTON');
  });

  it('result要素が存在する', () => {
    const result = document.getElementById('result');
    expect(result).not.toBeNull();
  });

  it('正解すると成功メッセージが表示される', () => {
    const startGame = document.getElementById('startGame');
    const result = document.getElementById('result');

    let callCount = 0;
    window.prompt = vi.fn(() => {
      callCount++;
      return '鍵';  // 1回目で正解
    });

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    startGame.dispatchEvent(clickEvent);

    expect(result.innerHTML).toContain('正解');
    expect(result.innerHTML).toContain('脱出');
  });

  it('不正解の後に正解すると成功メッセージが表示される', () => {
    const startGame = document.getElementById('startGame');
    const result = document.getElementById('result');

    let callCount = 0;
    window.prompt = vi.fn(() => {
      callCount++;
      if (callCount === 1) return '本';  // 1回目は不正解
      return '鍵';  // 2回目で正解
    });

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    startGame.dispatchEvent(clickEvent);

    expect(result.innerHTML).toContain('正解');
    expect(result.innerHTML).toContain('脱出');
  });

  it('試行回数上限に達するとメッセージが表示される', () => {
    const startGame = document.getElementById('startGame');
    const result = document.getElementById('result');

    window.prompt = vi.fn(() => '本');  // 常に不正解

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    startGame.dispatchEvent(clickEvent);

    expect(result.innerHTML).toContain('残念');
  });

  it('キャンセルするとキャンセルメッセージが表示される', () => {
    const startGame = document.getElementById('startGame');
    const result = document.getElementById('result');

    window.prompt = vi.fn(() => null);  // キャンセル

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    startGame.dispatchEvent(clickEvent);

    expect(result.innerHTML).toContain('キャンセル');
  });

  it('アイテムリストが表示される', () => {
    const startGame = document.getElementById('startGame');
    const result = document.getElementById('result');

    window.prompt = vi.fn(() => null);  // キャンセル

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    startGame.dispatchEvent(clickEvent);

    expect(result.innerHTML).toContain('アイテム');
  });
});
