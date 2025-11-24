import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 167: UI改善', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    const html = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );
    const css = fs.readFileSync(
      path.resolve(__dirname, 'style.css'),
      'utf-8'
    );

    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: 'http://localhost'
    });
    window = dom.window;
    document = window.document;

    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  });

  it('HTMLにトースト要素が存在する', () => {
    const toast = document.getElementById('toast');
    expect(toast).not.toBeNull();
    expect(toast.className).toBe('toast');
  });

  it('HTMLにローディングスピナーが存在する', () => {
    const spinner = document.getElementById('loading-spinner');
    expect(spinner).not.toBeNull();
    expect(spinner.className).toBe('loading-spinner');
  });

  it('CSSにアニメーションが定義されている', () => {
    const styles = css.textContent || '';
    expect(styles).toContain('@keyframes');
    expect(styles).toContain('fadeIn');
    expect(styles).toContain('slideIn');
  });

  it('CSSにtransitionが定義されている', () => {
    const styles = css.textContent || '';
    expect(styles).toContain('transition');
  });

  it('CSSにメディアクエリが定義されている', () => {
    const styles = css.textContent || '';
    expect(styles).toContain('@media');
    expect(styles).toContain('max-width');
  });

  it('CSSにホバー効果が定義されている', () => {
    const styles = css.textContent || '';
    expect(styles).toContain(':hover');
  });

  it('CSS変数が定義されている', () => {
    const styles = css.textContent || '';
    expect(styles).toContain(':root');
    expect(styles).toContain('--primary-color');
  });

  it('トースト通知用のCSSクラスが存在する', () => {
    const styles = css.textContent || '';
    expect(styles).toContain('.toast');
    expect(styles).toContain('.toast.show');
    expect(styles).toContain('.toast.success');
    expect(styles).toContain('.toast.error');
  });

  it('ローディングスピナー用のCSSが存在する', () => {
    const styles = css.textContent || '';
    expect(styles).toContain('.loading-spinner');
    expect(styles).toContain('.spinner');
    expect(styles).toContain('@keyframes spin');
  });

  it('レスポンシブデザイン用のメディアクエリが存在する', () => {
    const styles = css.textContent || '';
    expect(styles).toContain('@media (max-width: 768px)');
  });

  it('ボタンにホバー効果が適用されている', () => {
    const styles = css.textContent || '';
    expect(styles).toContain('.add-button:hover');
    expect(styles).toContain('.secondary-button:hover');
    expect(styles).toContain('.danger-button:hover');
  });

  it('カードにホバー効果が適用されている', () => {
    const styles = css.textContent || '';
    expect(styles).toContain('.stat-card:hover');
  });

  it('アニメーションにイージング関数が使われている', () => {
    const styles = css.textContent || '';
    expect(styles).toContain('ease');
  });

  it('トランジション効果が複数の要素に適用されている', () => {
    const styles = css.textContent || '';
    const transitionCount = (styles.match(/transition:/g) || []).length;
    expect(transitionCount).toBeGreaterThan(5);
  });

  it('shadow効果が定義されている', () => {
    const styles = css.textContent || '';
    expect(styles).toContain('box-shadow');
  });
});
