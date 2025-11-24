import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 159: 基本構造', () => {
  let dom;
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
      resources: 'usable'
    });
    document = dom.window.document;

    // CSSを追加
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  });

  it('ページタイトルが「予算管理アプリ」である', () => {
    const title = document.querySelector('title');
    expect(title).not.toBeNull();
    expect(title.textContent).toBe('予算管理アプリ');
  });

  it('ヘッダーに「予算管理アプリ」のタイトルが表示されている', () => {
    const header = document.querySelector('.app-header h1');
    expect(header).not.toBeNull();
    expect(header.textContent).toContain('予算管理アプリ');
  });

  it('タブメニューに4つのタブボタンがある', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    expect(tabButtons.length).toBe(4);
  });

  it('タブボタンのテキストが正しい', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabTexts = Array.from(tabButtons).map(btn => btn.textContent);
    expect(tabTexts).toContain('収入');
    expect(tabTexts).toContain('支出');
    expect(tabTexts).toContain('統計');
    expect(tabTexts).toContain('設定');
  });

  it('収入タブに入力フォームがある', () => {
    const incomeTab = document.querySelector('#income-tab');
    expect(incomeTab).not.toBeNull();

    const form = incomeTab.querySelector('.input-form');
    expect(form).not.toBeNull();
  });

  it('収入タブに日付入力欄がある', () => {
    const dateInput = document.querySelector('#income-tab input[type="date"]');
    expect(dateInput).not.toBeNull();
  });

  it('収入タブに金額入力欄がある', () => {
    const amountInput = document.querySelector('#income-tab input[type="number"]');
    expect(amountInput).not.toBeNull();
  });

  it('収入タブにカテゴリ選択欄がある', () => {
    const categorySelect = document.querySelector('#income-tab select');
    expect(categorySelect).not.toBeNull();

    const options = categorySelect.querySelectorAll('option');
    expect(options.length).toBeGreaterThan(1);
  });

  it('収入タブにメモ入力欄がある', () => {
    const memoInput = document.querySelector('#income-tab input[type="text"]');
    expect(memoInput).not.toBeNull();
  });

  it('収入タブに追加ボタンがある', () => {
    const addButton = document.querySelector('#income-tab .add-button');
    expect(addButton).not.toBeNull();
    expect(addButton.textContent).toContain('追加');
  });

  it('収入タブに一覧表示エリアがある', () => {
    const listItems = document.querySelector('#income-tab .list-items');
    expect(listItems).not.toBeNull();
  });

  it('支出タブに入力フォームがある', () => {
    const expenseTab = document.querySelector('#expense-tab');
    expect(expenseTab).not.toBeNull();

    const form = expenseTab.querySelector('.input-form');
    expect(form).not.toBeNull();
  });

  it('統計タブに統計カードが3つある', () => {
    const statsTab = document.querySelector('#stats-tab');
    expect(statsTab).not.toBeNull();

    const statCards = statsTab.querySelectorAll('.stat-card');
    expect(statCards.length).toBeGreaterThanOrEqual(3);
  });

  it('設定タブがある', () => {
    const settingsTab = document.querySelector('#settings-tab');
    expect(settingsTab).not.toBeNull();
  });

  it('CSSファイルがリンクされている', () => {
    const cssLink = document.querySelector('link[rel="stylesheet"]');
    expect(cssLink).not.toBeNull();
    expect(cssLink.getAttribute('href')).toBe('style.css');
  });

  it('JavaScriptファイルがリンクされている', () => {
    const scriptTag = document.querySelector('script[src]');
    expect(scriptTag).not.toBeNull();
    expect(scriptTag.getAttribute('src')).toBe('script.js');
  });

  it('コンテナ要素がある', () => {
    const container = document.querySelector('.container');
    expect(container).not.toBeNull();
  });

  it('タブコンテンツ要素がある', () => {
    const tabContent = document.querySelector('.tab-content');
    expect(tabContent).not.toBeNull();
  });

  it('最初のタブ（収入）がアクティブである', () => {
    const firstTabButton = document.querySelector('.tab-button.active');
    expect(firstTabButton).not.toBeNull();
    expect(firstTabButton.getAttribute('data-tab')).toBe('income');

    const firstTabPane = document.querySelector('.tab-pane.active');
    expect(firstTabPane).not.toBeNull();
    expect(firstTabPane.id).toBe('income-tab');
  });
});
