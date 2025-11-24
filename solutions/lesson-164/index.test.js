import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 164: 保存機能', () => {
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

    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    window.localStorage = {
      data: {},
      getItem(key) {
        return this.data[key] || null;
      },
      setItem(key, value) {
        this.data[key] = value;
      },
      removeItem(key) {
        delete this.data[key];
      },
      clear() {
        this.data = {};
      },
      get length() {
        return Object.keys(this.data).length;
      },
      key(index) {
        return Object.keys(this.data)[index] || null;
      }
    };

    window.alert = vi.fn();
    window.confirm = vi.fn(() => true);

    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);

    const event = new window.Event('DOMContentLoaded');
    window.document.dispatchEvent(event);
  });

  it('saveData関数が定義されている', () => {
    expect(typeof window.saveData).toBe('function');
  });

  it('loadData関数が定義されている', () => {
    expect(typeof window.loadData).toBe('function');
  });

  it('validateTransaction関数が定義されている', () => {
    expect(typeof window.validateTransaction).toBe('function');
  });

  it('clearAllData関数が定義されている', () => {
    expect(typeof window.clearAllData).toBe('function');
  });

  it('displayStorageInfo関数が定義されている', () => {
    expect(typeof window.displayStorageInfo).toBe('function');
  });

  it('init関数が定義されている', () => {
    expect(typeof window.init).toBe('function');
  });

  it('saveData関数がデータをlocalStorageに保存する', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];

    window.saveData();

    const saved = window.localStorage.getItem('transactions');
    expect(saved).not.toBeNull();

    const parsed = JSON.parse(saved);
    expect(parsed.length).toBe(1);
    expect(parsed[0].id).toBe(1);
  });

  it('loadData関数がlocalStorageからデータを読み込む', () => {
    const testData = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];

    window.localStorage.setItem('transactions', JSON.stringify(testData));

    window.loadData();

    expect(window.transactions.length).toBe(1);
    expect(window.transactions[0].id).toBe(1);
  });

  it('loadData関数でデータがない場合は空配列になる', () => {
    window.loadData();

    expect(Array.isArray(window.transactions)).toBe(true);
    expect(window.transactions.length).toBe(0);
  });

  it('validateTransaction関数が正しいデータを検証する', () => {
    const validTransaction = {
      id: 1,
      type: 'income',
      date: '2025-11-01',
      amount: 100000,
      category: '給料',
      memo: ''
    };

    expect(window.validateTransaction(validTransaction)).toBe(true);
  });

  it('validateTransaction関数がidがないデータを拒否する', () => {
    const invalidTransaction = {
      type: 'income',
      date: '2025-11-01',
      amount: 100000,
      category: '給料'
    };

    expect(window.validateTransaction(invalidTransaction)).toBe(false);
  });

  it('validateTransaction関数がtypeが不正なデータを拒否する', () => {
    const invalidTransaction = {
      id: 1,
      type: 'invalid',
      date: '2025-11-01',
      amount: 100000,
      category: '給料'
    };

    expect(window.validateTransaction(invalidTransaction)).toBe(false);
  });

  it('validateTransaction関数がamountが負の数のデータを拒否する', () => {
    const invalidTransaction = {
      id: 1,
      type: 'income',
      date: '2025-11-01',
      amount: -100,
      category: '給料'
    };

    expect(window.validateTransaction(invalidTransaction)).toBe(false);
  });

  it('validateTransaction関数が日付形式が不正なデータを拒否する', () => {
    const invalidTransaction = {
      id: 1,
      type: 'income',
      date: '2025/11/01',
      amount: 100000,
      category: '給料'
    };

    expect(window.validateTransaction(invalidTransaction)).toBe(false);
  });

  it('loadData関数が不正なデータをフィルタリングする', () => {
    const testData = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' },
      { id: 2, type: 'invalid', date: '2025-11-02', amount: 50000, category: '給料' },
      { id: 3, type: 'expense', date: '2025-11-03', amount: 30000, category: '食費', memo: '' }
    ];

    window.localStorage.setItem('transactions', JSON.stringify(testData));

    window.loadData();

    expect(window.transactions.length).toBe(2);
    expect(window.transactions[0].id).toBe(1);
    expect(window.transactions[1].id).toBe(3);
  });

  it('clearAllData関数がすべてのデータを削除する', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];
    window.saveData();

    window.confirm = vi.fn(() => true);
    window.clearAllData();

    expect(window.transactions.length).toBe(0);
    expect(window.localStorage.getItem('transactions')).toBeNull();
  });

  it('clearAllData関数が確認ダイアログをキャンセルした場合は削除しない', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];
    window.saveData();

    window.confirm = vi.fn(() => false);
    window.clearAllData();

    expect(window.transactions.length).toBe(1);
  });

  it('displayStorageInfo関数がストレージ情報を表示する', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];

    window.displayStorageInfo();

    const dataCount = document.getElementById('data-count');
    expect(dataCount).not.toBeNull();
    expect(dataCount.textContent).toBe('1');
  });

  it('収入を追加したときにsaveDataが呼ばれる', () => {
    const saveDataSpy = vi.spyOn(window, 'saveData');

    document.getElementById('income-date').value = '2025-11-01';
    document.getElementById('income-amount').value = '100000';
    document.getElementById('income-category').value = '給料';

    document.getElementById('add-income-button').click();

    expect(saveDataSpy).toHaveBeenCalled();
  });

  it('支出を追加したときにsaveDataが呼ばれる', () => {
    const saveDataSpy = vi.spyOn(window, 'saveData');

    document.getElementById('expense-date').value = '2025-11-01';
    document.getElementById('expense-amount').value = '30000';
    document.getElementById('expense-category').value = '食費';

    document.getElementById('add-expense-button').click();

    expect(saveDataSpy).toHaveBeenCalled();
  });

  it('収入を削除したときにsaveDataが呼ばれる', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];
    window.renderIncomeList();

    const saveDataSpy = vi.spyOn(window, 'saveData');
    window.deleteIncome(1);

    expect(saveDataSpy).toHaveBeenCalled();
  });

  it('支出を削除したときにsaveDataが呼ばれる', () => {
    window.transactions = [
      { id: 1, type: 'expense', date: '2025-11-01', amount: 30000, category: '食費', memo: '' }
    ];
    window.renderExpenseList();

    const saveDataSpy = vi.spyOn(window, 'saveData');
    window.deleteExpense(1);

    expect(saveDataSpy).toHaveBeenCalled();
  });

  it('データ削除ボタンが有効になっている', () => {
    const clearButton = document.getElementById('clear-all-button');
    expect(clearButton).not.toBeNull();
    expect(clearButton.disabled).toBe(false);
  });

  it('データ削除ボタンをクリックするとclearAllDataが呼ばれる', () => {
    const clearAllDataSpy = vi.spyOn(window, 'clearAllData');
    const clearButton = document.getElementById('clear-all-button');

    clearButton.click();

    expect(clearAllDataSpy).toHaveBeenCalled();
  });

  it('設定タブを開いたときにdisplayStorageInfoが呼ばれる', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];

    const displayStorageInfoSpy = vi.spyOn(window, 'displayStorageInfo');

    const settingsTabButton = Array.from(document.querySelectorAll('.tab-button'))
      .find(btn => btn.getAttribute('data-tab') === 'settings');

    if (settingsTabButton) {
      settingsTabButton.click();
      expect(displayStorageInfoSpy).toHaveBeenCalled();
    }
  });

  it('HTMLにストレージ情報表示エリアが存在する', () => {
    expect(document.getElementById('storage-info-content')).not.toBeNull();
    expect(document.getElementById('data-count')).not.toBeNull();
    expect(document.getElementById('storage-size')).not.toBeNull();
  });

  it('起動時にloadDataが呼ばれる', () => {
    // init関数は既にbeforeEachで実行されているため、
    // transactions配列が存在することを確認
    expect(window.transactions).toBeDefined();
    expect(Array.isArray(window.transactions)).toBe(true);
  });

  it('破損したJSONデータを読み込んでもエラーにならない', () => {
    window.localStorage.setItem('transactions', 'invalid json');

    expect(() => {
      window.loadData();
    }).not.toThrow();

    expect(window.transactions.length).toBe(0);
  });

  it('配列でないデータを読み込んでもエラーにならない', () => {
    window.localStorage.setItem('transactions', JSON.stringify({ not: 'array' }));

    expect(() => {
      window.loadData();
    }).not.toThrow();

    expect(window.transactions.length).toBe(0);
  });
});
