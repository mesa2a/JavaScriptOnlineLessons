import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 075: 条件付きループ', () => {
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

  it('startQuizボタンが存在する', () => {
    const startQuiz = document.getElementById('startQuiz');
    expect(startQuiz).not.toBeNull();
    expect(startQuiz.tagName).toBe('BUTTON');
  });

  it('result要素が存在する', () => {
    const result = document.getElementById('result');
    expect(result).not.toBeNull();
  });

  it('正解すると成功メッセージが表示される', () => {
    const startQuiz = document.getElementById('startQuiz');
    const result = document.getElementById('result');

    // promptをモック化
    let callCount = 0;
    window.prompt = vi.fn(() => {
      callCount++;
      return 'JavaScript';  // 1回目で正解
    });

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    startQuiz.dispatchEvent(clickEvent);

    expect(result.innerHTML).toContain('正解');
    expect(result.innerHTML).toContain('1');
  });

  it('不正解の後に正解すると成功メッセージが表示される', () => {
    const startQuiz = document.getElementById('startQuiz');
    const result = document.getElementById('result');

    let callCount = 0;
    window.prompt = vi.fn(() => {
      callCount++;
      if (callCount === 1) return 'Python';  // 1回目は不正解
      return 'JavaScript';  // 2回目で正解
    });

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    startQuiz.dispatchEvent(clickEvent);

    expect(result.innerHTML).toContain('正解');
    expect(result.innerHTML).toContain('2');
  });

  it('試行回数上限に達するとメッセージが表示される', () => {
    const startQuiz = document.getElementById('startQuiz');
    const result = document.getElementById('result');

    window.prompt = vi.fn(() => 'Python');  // 常に不正解

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    startQuiz.dispatchEvent(clickEvent);

    expect(result.innerHTML).toContain('上限');
  });

  it('キャンセルするとキャンセルメッセージが表示される', () => {
    const startQuiz = document.getElementById('startQuiz');
    const result = document.getElementById('result');

    window.prompt = vi.fn(() => null);  // キャンセル

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    startQuiz.dispatchEvent(clickEvent);

    expect(result.innerHTML).toContain('キャンセル');
  });
});
