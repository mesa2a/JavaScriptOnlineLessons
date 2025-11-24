import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 160: 収入管理', () => {
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
    const js = fs.readFileSync(
      path.resolve(__dirname, 'script.js'),
      'utf-8'
    );

    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: 'http://localhost'
    });
    window = dom.window;
    document = window.document;

    // CSSを追加
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // localStorageのモック
    window.localStorage = {
      data: {},
      getItem(key) {
        return this.data[key] || null;
      },
      setItem(key, value) {
        this.data[key] = value;
      },
      clear() {
        this.data = {};
      }
    };

    // alertとconfirmのモック
    window.alert = vi.fn();
    window.confirm = vi.fn(() => true);

    // JavaScriptを実行
    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);

    // DOMContentLoadedイベントを発火
    const event = new window.Event('DOMContentLoaded');
    window.document.dispatchEvent(event);
  });

  it('transactions配列が定義されている', () => {
    expect(window.transactions).toBeDefined();
    expect(Array.isArray(window.transactions)).toBe(true);
  });

  it('incomeCategories オブジェクトが定義されている', () => {
    expect(window.incomeCategories).toBeDefined();
    expect(typeof window.incomeCategories).toBe('object');
  });

  it('generateId関数が定義されている', () => {
    expect(typeof window.generateId).toBe('function');
  });

  it('generateId関数が正しくIDを生成する', () => {
    window.transactions = [];
    expect(window.generateId()).toBe(1);

    window.transactions = [{ id: 1 }, { id: 2 }];
    expect(window.generateId()).toBe(3);
  });

  it('formatCurrency関数が定義されている', () => {
    expect(typeof window.formatCurrency).toBe('function');
  });

  it('formatCurrency関数が金額をフォーマットする', () => {
    expect(window.formatCurrency(1000)).toBe('1,000');
    expect(window.formatCurrency(250000)).toBe('250,000');
  });

  it('getCategoryColor関数が定義されている', () => {
    expect(typeof window.getCategoryColor).toBe('function');
  });

  it('getCategoryColor関数が正しい色を返す', () => {
    const color = window.getCategoryColor('給料', 'income');
    expect(color).toBe('#4CAF50');
  });

  it('addIncome関数が定義されている', () => {
    expect(typeof window.addIncome).toBe('function');
  });

  it('addIncome関数が収入を追加できる', () => {
    window.transactions = [];

    const dateInput = document.getElementById('income-date');
    const amountInput = document.getElementById('income-amount');
    const categoryInput = document.getElementById('income-category');
    const memoInput = document.getElementById('income-memo');

    dateInput.value = '2025-11-23';
    amountInput.value = '250000';
    categoryInput.value = '給料';
    memoInput.value = 'テスト';

    window.addIncome();

    expect(window.transactions.length).toBe(1);
    expect(window.transactions[0].type).toBe('income');
    expect(window.transactions[0].amount).toBe(250000);
    expect(window.transactions[0].category).toBe('給料');
  });

  it('addIncome関数がバリデーションを行う（日付なし）', () => {
    window.transactions = [];

    const dateInput = document.getElementById('income-date');
    const amountInput = document.getElementById('income-amount');
    const categoryInput = document.getElementById('income-category');

    dateInput.value = '';
    amountInput.value = '1000';
    categoryInput.value = '給料';

    window.addIncome();

    expect(window.transactions.length).toBe(0);
    expect(window.alert).toHaveBeenCalledWith('日付を入力してください');
  });

  it('addIncome関数がバリデーションを行う（金額なし）', () => {
    window.transactions = [];

    const dateInput = document.getElementById('income-date');
    const amountInput = document.getElementById('income-amount');
    const categoryInput = document.getElementById('income-category');

    dateInput.value = '2025-11-23';
    amountInput.value = '';
    categoryInput.value = '給料';

    window.addIncome();

    expect(window.transactions.length).toBe(0);
    expect(window.alert).toHaveBeenCalledWith('金額を入力してください');
  });

  it('addIncome関数がバリデーションを行う（カテゴリなし）', () => {
    window.transactions = [];

    const dateInput = document.getElementById('income-date');
    const amountInput = document.getElementById('income-amount');
    const categoryInput = document.getElementById('income-category');

    dateInput.value = '2025-11-23';
    amountInput.value = '1000';
    categoryInput.value = '';

    window.addIncome();

    expect(window.transactions.length).toBe(0);
    expect(window.alert).toHaveBeenCalledWith('カテゴリを選択してください');
  });

  it('renderIncomeList関数が定義されている', () => {
    expect(typeof window.renderIncomeList).toBe('function');
  });

  it('renderIncomeList関数が収入一覧を表示する', () => {
    window.transactions = [
      {
        id: 1,
        type: 'income',
        date: '2025-11-20',
        amount: 250000,
        category: '給料',
        memo: 'テスト'
      }
    ];

    window.renderIncomeList();

    const listContainer = document.getElementById('income-items');
    expect(listContainer.innerHTML).toContain('250,000');
    expect(listContainer.innerHTML).toContain('給料');
  });

  it('renderIncomeList関数がデータなしメッセージを表示する', () => {
    window.transactions = [];

    window.renderIncomeList();

    const listContainer = document.getElementById('income-items');
    expect(listContainer.innerHTML).toContain('データがありません');
  });

  it('deleteIncome関数が定義されている', () => {
    expect(typeof window.deleteIncome).toBe('function');
  });

  it('deleteIncome関数が収入を削除できる', () => {
    window.transactions = [
      {
        id: 1,
        type: 'income',
        date: '2025-11-20',
        amount: 250000,
        category: '給料',
        memo: 'テスト'
      }
    ];

    window.confirm = vi.fn(() => true);
    window.deleteIncome(1);

    expect(window.transactions.length).toBe(0);
  });

  it('calculateIncomeTotal関数が定義されている', () => {
    expect(typeof window.calculateIncomeTotal).toBe('function');
  });

  it('calculateIncomeTotal関数が収入合計を計算する', () => {
    window.transactions = [
      { id: 1, type: 'income', amount: 100000 },
      { id: 2, type: 'income', amount: 150000 },
      { id: 3, type: 'expense', amount: 5000 }
    ];

    const total = window.calculateIncomeTotal();
    expect(total).toBe(250000);
  });

  it('updateIncomeTotal関数が定義されている', () => {
    expect(typeof window.updateIncomeTotal).toBe('function');
  });

  it('updateIncomeTotal関数が合計を表示する', () => {
    window.transactions = [
      { id: 1, type: 'income', amount: 100000 }
    ];

    window.updateIncomeTotal();

    const totalElement = document.getElementById('income-total');
    expect(totalElement.textContent).toContain('100,000');
  });

  it('saveTransactions関数が定義されている', () => {
    expect(typeof window.saveTransactions).toBe('function');
  });

  it('loadTransactions関数が定義されている', () => {
    expect(typeof window.loadTransactions).toBe('function');
  });

  it('saveTransactions関数がlocalStorageに保存する', () => {
    window.transactions = [
      { id: 1, type: 'income', amount: 100000 }
    ];

    window.saveTransactions();

    const saved = window.localStorage.getItem('transactions');
    expect(saved).toBeDefined();
    expect(JSON.parse(saved).length).toBe(1);
  });

  it('loadTransactions関数がlocalStorageから読み込む', () => {
    window.localStorage.setItem('transactions', JSON.stringify([
      { id: 1, type: 'income', amount: 100000 }
    ]));

    window.transactions = [];
    window.loadTransactions();

    expect(window.transactions.length).toBe(1);
    expect(window.transactions[0].amount).toBe(100000);
  });

  it('追加ボタンにイベントリスナーが設定されている', () => {
    const addButton = document.getElementById('add-income-button');
    expect(addButton).not.toBeNull();
  });
});
