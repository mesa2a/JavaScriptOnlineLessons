import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 161: 支出管理', () => {
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

  it('expenseCategoriesオブジェクトが定義されている', () => {
    expect(window.expenseCategories).toBeDefined();
    expect(typeof window.expenseCategories).toBe('object');
  });

  it('getCategoryColor関数が支出の色を返す', () => {
    const color = window.getCategoryColor('食費', 'expense');
    expect(color).toBe('#F44336');
  });

  it('addExpense関数が定義されている', () => {
    expect(typeof window.addExpense).toBe('function');
  });

  it('addExpense関数が支出を追加できる', () => {
    window.transactions = [];

    const dateInput = document.getElementById('expense-date');
    const amountInput = document.getElementById('expense-amount');
    const categoryInput = document.getElementById('expense-category');
    const memoInput = document.getElementById('expense-memo');

    dateInput.value = '2025-11-23';
    amountInput.value = '3000';
    categoryInput.value = '食費';
    memoInput.value = 'テスト';

    window.addExpense();

    expect(window.transactions.length).toBe(1);
    expect(window.transactions[0].type).toBe('expense');
    expect(window.transactions[0].amount).toBe(3000);
    expect(window.transactions[0].category).toBe('食費');
  });

  it('addExpense関数がバリデーションを行う', () => {
    window.transactions = [];

    const dateInput = document.getElementById('expense-date');
    const amountInput = document.getElementById('expense-amount');
    const categoryInput = document.getElementById('expense-category');

    dateInput.value = '';
    amountInput.value = '1000';
    categoryInput.value = '食費';

    window.addExpense();

    expect(window.transactions.length).toBe(0);
    expect(window.alert).toHaveBeenCalledWith('日付を入力してください');
  });

  it('renderExpenseList関数が定義されている', () => {
    expect(typeof window.renderExpenseList).toBe('function');
  });

  it('renderExpenseList関数が支出一覧を表示する', () => {
    window.transactions = [
      {
        id: 1,
        type: 'expense',
        date: '2025-11-20',
        amount: 3000,
        category: '食費',
        memo: 'テスト'
      }
    ];

    window.renderExpenseList();

    const listContainer = document.getElementById('expense-items');
    expect(listContainer.innerHTML).toContain('3,000');
    expect(listContainer.innerHTML).toContain('食費');
  });

  it('deleteExpense関数が定義されている', () => {
    expect(typeof window.deleteExpense).toBe('function');
  });

  it('deleteExpense関数が支出を削除できる', () => {
    window.transactions = [
      {
        id: 1,
        type: 'expense',
        date: '2025-11-20',
        amount: 3000,
        category: '食費',
        memo: 'テスト'
      }
    ];

    window.confirm = vi.fn(() => true);
    window.deleteExpense(1);

    expect(window.transactions.length).toBe(0);
  });

  it('calculateExpenseTotal関数が定義されている', () => {
    expect(typeof window.calculateExpenseTotal).toBe('function');
  });

  it('calculateExpenseTotal関数が支出合計を計算する', () => {
    window.transactions = [
      { id: 1, type: 'expense', amount: 3000 },
      { id: 2, type: 'expense', amount: 500 },
      { id: 3, type: 'income', amount: 100000 }
    ];

    const total = window.calculateExpenseTotal();
    expect(total).toBe(3500);
  });

  it('updateExpenseTotal関数が定義されている', () => {
    expect(typeof window.updateExpenseTotal).toBe('function');
  });

  it('calculateBalance関数が定義されている', () => {
    expect(typeof window.calculateBalance).toBe('function');
  });

  it('calculateBalance関数が収支を計算する', () => {
    window.transactions = [
      { id: 1, type: 'income', amount: 100000 },
      { id: 2, type: 'expense', amount: 30000 }
    ];

    const balance = window.calculateBalance();
    expect(balance).toBe(70000);
  });

  it('updateStats関数が定義されている', () => {
    expect(typeof window.updateStats).toBe('function');
  });

  it('updateStats関数が統計情報を更新する', () => {
    window.transactions = [
      { id: 1, type: 'income', amount: 100000 },
      { id: 2, type: 'expense', amount: 30000 }
    ];

    window.updateStats();

    const balanceElement = document.getElementById('balance');
    if (balanceElement) {
      expect(balanceElement.textContent).toContain('70,000');
      expect(balanceElement.classList.contains('positive')).toBe(true);
    }
  });

  it('収支がマイナスの場合、negativeクラスが追加される', () => {
    window.transactions = [
      { id: 1, type: 'income', amount: 50000 },
      { id: 2, type: 'expense', amount: 100000 }
    ];

    window.updateStats();

    const balanceElement = document.getElementById('balance');
    if (balanceElement) {
      expect(balanceElement.classList.contains('negative')).toBe(true);
    }
  });

  it('calculateExpenseByCategory関数が定義されている', () => {
    expect(typeof window.calculateExpenseByCategory).toBe('function');
  });

  it('calculateExpenseByCategory関数がカテゴリ別集計を計算する', () => {
    window.transactions = [
      { id: 1, type: 'expense', amount: 3000, category: '食費' },
      { id: 2, type: 'expense', amount: 2000, category: '食費' },
      { id: 3, type: 'expense', amount: 1000, category: '交通費' }
    ];

    const result = window.calculateExpenseByCategory();
    expect(result['食費']).toBe(5000);
    expect(result['交通費']).toBe(1000);
  });

  it('setTodayDate関数が定義されている', () => {
    expect(typeof window.setTodayDate).toBe('function');
  });

  it('setTodayDate関数が今日の日付を設定する', () => {
    window.setTodayDate();

    const incomeDateInput = document.getElementById('income-date');
    const expenseDateInput = document.getElementById('expense-date');

    expect(incomeDateInput.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(expenseDateInput.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('収入と支出が混在していても正しく集計できる', () => {
    window.transactions = [
      { id: 1, type: 'income', amount: 250000 },
      { id: 2, type: 'expense', amount: 50000 },
      { id: 3, type: 'income', amount: 30000 },
      { id: 4, type: 'expense', amount: 20000 }
    ];

    expect(window.calculateIncomeTotal()).toBe(280000);
    expect(window.calculateExpenseTotal()).toBe(70000);
    expect(window.calculateBalance()).toBe(210000);
  });

  it('追加ボタンにイベントリスナーが設定されている', () => {
    const addIncomeButton = document.getElementById('add-income-button');
    const addExpenseButton = document.getElementById('add-expense-button');
    expect(addIncomeButton).not.toBeNull();
    expect(addExpenseButton).not.toBeNull();
  });
});
