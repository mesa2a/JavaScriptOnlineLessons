import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 168: 最終テスト - 統合テスト', () => {
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
      }
    };

    window.alert = vi.fn();
    window.confirm = vi.fn(() => true);
    window.URL = {
      createObjectURL: vi.fn(() => 'blob:mock-url'),
      revokeObjectURL: vi.fn()
    };
    window.Blob = class MockBlob {
      constructor(parts, options) {
        this.parts = parts;
        this.options = options;
      }
    };
    window.FileReader = class MockFileReader {
      readAsText(file) {
        setTimeout(() => {
          if (this.onload) {
            this.onload({ target: { result: file.content } });
          }
        }, 0);
      }
    };

    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);

    const event = new window.Event('DOMContentLoaded');
    window.document.dispatchEvent(event);
  });

  describe('収入管理機能', () => {
    it('収入を追加できる', () => {
      const incomeTypeRadio = document.querySelector('input[name="type"][value="income"]');
      const categorySelect = document.getElementById('category');
      const amountInput = document.getElementById('amount');
      const dateInput = document.getElementById('date');
      const memoInput = document.getElementById('memo');
      const addButton = document.getElementById('add-transaction');

      incomeTypeRadio.checked = true;
      categorySelect.value = '給料';
      amountInput.value = '100000';
      dateInput.value = '2025-11-01';
      memoInput.value = '給与';

      addButton.click();

      expect(window.transactions.length).toBe(1);
      expect(window.transactions[0].type).toBe('income');
      expect(window.transactions[0].amount).toBe(100000);
    });

    it('複数の収入を追加できる', () => {
      for (let i = 0; i < 3; i++) {
        const incomeTypeRadio = document.querySelector('input[name="type"][value="income"]');
        const categorySelect = document.getElementById('category');
        const amountInput = document.getElementById('amount');
        const dateInput = document.getElementById('date');
        const addButton = document.getElementById('add-transaction');

        incomeTypeRadio.checked = true;
        categorySelect.value = '給料';
        amountInput.value = String(100000 + i * 10000);
        dateInput.value = '2025-11-0' + (i + 1);

        addButton.click();
      }

      expect(window.transactions.length).toBe(3);
    });

    it('収入の統計が正しく計算される', () => {
      window.transactions = [
        { id: 1, date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '' },
        { id: 2, date: '2025-11-02', type: 'income', category: '副業', amount: 50000, memo: '' }
      ];

      window.updateStatistics();

      const totalIncomeEl = document.getElementById('total-income');
      expect(totalIncomeEl.textContent).toContain('150,000');
    });
  });

  describe('支出管理機能', () => {
    it('支出を追加できる', () => {
      const expenseTypeRadio = document.querySelector('input[name="type"][value="expense"]');
      const categorySelect = document.getElementById('category');
      const amountInput = document.getElementById('amount');
      const dateInput = document.getElementById('date');
      const memoInput = document.getElementById('memo');
      const addButton = document.getElementById('add-transaction');

      expenseTypeRadio.checked = true;
      window.updateCategories();
      categorySelect.value = '食費';
      amountInput.value = '5000';
      dateInput.value = '2025-11-01';
      memoInput.value = 'スーパー';

      addButton.click();

      expect(window.transactions.length).toBe(1);
      expect(window.transactions[0].type).toBe('expense');
      expect(window.transactions[0].amount).toBe(5000);
    });

    it('複数の支出を追加できる', () => {
      for (let i = 0; i < 5; i++) {
        const expenseTypeRadio = document.querySelector('input[name="type"][value="expense"]');
        const categorySelect = document.getElementById('category');
        const amountInput = document.getElementById('amount');
        const dateInput = document.getElementById('date');
        const addButton = document.getElementById('add-transaction');

        expenseTypeRadio.checked = true;
        window.updateCategories();
        categorySelect.value = '食費';
        amountInput.value = String(5000 + i * 1000);
        dateInput.value = '2025-11-0' + (i + 1);

        addButton.click();
      }

      expect(window.transactions.length).toBe(5);
    });

    it('支出の統計が正しく計算される', () => {
      window.transactions = [
        { id: 1, date: '2025-11-01', type: 'expense', category: '食費', amount: 5000, memo: '' },
        { id: 2, date: '2025-11-02', type: 'expense', category: '交通費', amount: 3000, memo: '' }
      ];

      window.updateStatistics();

      const totalExpenseEl = document.getElementById('total-expense');
      expect(totalExpenseEl.textContent).toContain('8,000');
    });
  });

  describe('統計機能', () => {
    it('収支バランスが正しく計算される', () => {
      window.transactions = [
        { id: 1, date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '' },
        { id: 2, date: '2025-11-02', type: 'expense', category: '食費', amount: 5000, memo: '' },
        { id: 3, date: '2025-11-03', type: 'expense', category: '交通費', amount: 3000, memo: '' }
      ];

      window.updateStatistics();

      const balanceEl = document.getElementById('balance');
      expect(balanceEl.textContent).toContain('92,000');
    });

    it('カテゴリ別の統計が正しく計算される', () => {
      window.transactions = [
        { id: 1, date: '2025-11-01', type: 'expense', category: '食費', amount: 5000, memo: '' },
        { id: 2, date: '2025-11-02', type: 'expense', category: '食費', amount: 3000, memo: '' },
        { id: 3, date: '2025-11-03', type: 'expense', category: '交通費', amount: 2000, memo: '' }
      ];

      window.updateCategoryReport();

      const categoryRows = document.querySelectorAll('#category-list tr');
      expect(categoryRows.length).toBeGreaterThan(0);
    });

    it('月別レポートが正しく表示される', () => {
      window.transactions = [
        { id: 1, date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '' },
        { id: 2, date: '2025-11-02', type: 'expense', category: '食費', amount: 5000, memo: '' },
        { id: 3, date: '2025-10-01', type: 'income', category: '給料', amount: 100000, memo: '' }
      ];

      window.updateMonthlyReport();

      const monthlyRows = document.querySelectorAll('#monthly-list tr');
      expect(monthlyRows.length).toBeGreaterThan(0);
    });
  });

  describe('レポート機能', () => {
    it('レポートタブが正しく表示される', () => {
      const reportTabBtn = document.querySelector('.tab-button[data-tab="report-tab"]');
      reportTabBtn.click();

      const reportTab = document.getElementById('report-tab');
      expect(reportTab.classList.contains('active')).toBe(true);
    });

    it('カテゴリレポートが生成される', () => {
      window.transactions = [
        { id: 1, date: '2025-11-01', type: 'expense', category: '食費', amount: 5000, memo: '' },
        { id: 2, date: '2025-11-02', type: 'expense', category: '食費', amount: 3000, memo: '' }
      ];

      window.updateCategoryReport();

      const categoryList = document.getElementById('category-list');
      expect(categoryList.children.length).toBeGreaterThan(0);
    });

    it('月別レポートが生成される', () => {
      window.transactions = [
        { id: 1, date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '' },
        { id: 2, date: '2025-11-02', type: 'expense', category: '食費', amount: 5000, memo: '' }
      ];

      window.updateMonthlyReport();

      const monthlyList = document.getElementById('monthly-list');
      expect(monthlyList.children.length).toBeGreaterThan(0);
    });
  });

  describe('エクスポート機能', () => {
    it('CSV形式でエクスポートできる', () => {
      window.transactions = [
        { id: 1, date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '給与' }
      ];

      const csvData = window.generateCSV();
      expect(csvData).toContain('日付,種類,カテゴリ,金額,メモ');
      expect(csvData).toContain('2025-11-01,収入,給料,100000,給与');
    });

    it('JSON形式でエクスポートできる', () => {
      window.transactions = [
        { id: 1, date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '給与' }
      ];

      const jsonData = window.generateJSON();
      const parsed = JSON.parse(jsonData);
      expect(parsed.length).toBe(1);
      expect(parsed[0].date).toBe('2025-11-01');
    });

    it('CSV値がエスケープされる', () => {
      const value = 'ランチ, コーヒー';
      const escaped = window.escapeCSVValue(value);
      expect(escaped).toBe('"ランチ, コーヒー"');
    });

    it('空データのエクスポートでアラートが表示される', () => {
      window.transactions = [];
      window.downloadCSV();
      expect(window.alert).toHaveBeenCalledWith('エクスポートするデータがありません');
    });
  });

  describe('インポート機能', () => {
    it('JSONファイルをインポートできる', async () => {
      const jsonContent = JSON.stringify([
        { id: 1, date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '' }
      ]);
      const mockFile = { content: jsonContent, name: 'test.json' };

      window.transactions = [];
      window.importJSON(mockFile);

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(window.transactions.length).toBe(1);
    });

    it('CSVファイルをインポートできる', async () => {
      const csvContent = '日付,種類,カテゴリ,金額,メモ\n2025-11-01,収入,給料,100000,給与';
      const mockFile = { content: csvContent, name: 'test.csv' };

      window.transactions = [];
      window.importCSV(mockFile);

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(window.transactions.length).toBe(1);
    });

    it('CSV行が正しく解析される', () => {
      const line = '2025-11-01,収入,給料,100000,給与';
      const result = window.parseCSVLine(line);
      expect(result).toEqual(['2025-11-01', '収入', '給料', '100000', '給与']);
    });

    it('不正なファイル形式が拒否される', () => {
      const mockEvent = {
        target: {
          files: [{ name: 'test.txt', content: '' }],
          value: 'test.txt'
        }
      };

      window.handleFileSelect(mockEvent);
      expect(window.alert).toHaveBeenCalled();
    });
  });

  describe('データ管理機能', () => {
    it('トランザクションを削除できる', () => {
      window.transactions = [
        { id: 1, date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '' },
        { id: 2, date: '2025-11-02', type: 'expense', category: '食費', amount: 5000, memo: '' }
      ];

      window.deleteTransaction(1);

      expect(window.transactions.length).toBe(1);
      expect(window.transactions[0].id).toBe(2);
    });

    it('データを保存できる', () => {
      window.transactions = [
        { id: 1, date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '' }
      ];

      window.saveData();

      const saved = window.localStorage.getItem('transactions');
      expect(saved).toBeTruthy();
    });

    it('データを読み込みできる', () => {
      const testData = [
        { id: 1, date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '' }
      ];
      window.localStorage.setItem('transactions', JSON.stringify(testData));

      window.loadData();

      expect(window.transactions.length).toBe(1);
    });

    it('すべてのデータを削除できる', () => {
      window.transactions = [
        { id: 1, date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '' }
      ];

      window.clearAllData();

      expect(window.transactions.length).toBe(0);
    });
  });

  describe('UI/UX機能', () => {
    it('タブが切り替わる', () => {
      const reportTabBtn = document.querySelector('.tab-button[data-tab="report-tab"]');
      reportTabBtn.click();

      const reportTab = document.getElementById('report-tab');
      expect(reportTab.classList.contains('active')).toBe(true);
    });

    it('種類によってカテゴリが更新される', () => {
      const incomeTypeRadio = document.querySelector('input[name="type"][value="income"]');
      incomeTypeRadio.checked = true;
      window.updateCategories();

      const categorySelect = document.getElementById('category');
      const options = Array.from(categorySelect.options).map(opt => opt.value);
      expect(options).toContain('給料');

      const expenseTypeRadio = document.querySelector('input[name="type"][value="expense"]');
      expenseTypeRadio.checked = true;
      window.updateCategories();

      const expenseOptions = Array.from(categorySelect.options).map(opt => opt.value);
      expect(expenseOptions).toContain('食費');
    });

    it('トランザクションリストが表示される', () => {
      window.transactions = [
        { id: 1, date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '' }
      ];

      window.renderTransactions();

      const transactionList = document.getElementById('transaction-list');
      expect(transactionList.children.length).toBeGreaterThan(0);
    });

    it('フィルターが機能する', () => {
      window.transactions = [
        { id: 1, date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '' },
        { id: 2, date: '2025-11-02', type: 'expense', category: '食費', amount: 5000, memo: '' }
      ];

      const typeFilter = document.getElementById('filter-type');
      typeFilter.value = 'income';

      window.renderTransactions();

      const transactionList = document.getElementById('transaction-list');
      expect(transactionList.children.length).toBe(1);
    });
  });

  describe('データ永続化', () => {
    it('ページを読み込むとデータが復元される', () => {
      const testData = [
        { id: 1, date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '' }
      ];
      window.localStorage.setItem('transactions', JSON.stringify(testData));

      window.loadData();

      expect(window.transactions.length).toBe(1);
    });

    it('データ追加後に自動保存される', () => {
      const incomeTypeRadio = document.querySelector('input[name="type"][value="income"]');
      const categorySelect = document.getElementById('category');
      const amountInput = document.getElementById('amount');
      const dateInput = document.getElementById('date');
      const addButton = document.getElementById('add-transaction');

      incomeTypeRadio.checked = true;
      categorySelect.value = '給料';
      amountInput.value = '100000';
      dateInput.value = '2025-11-01';

      addButton.click();

      const saved = window.localStorage.getItem('transactions');
      expect(saved).toBeTruthy();
    });

    it('データ検証が機能する', () => {
      const validData = {
        id: 1,
        date: '2025-11-01',
        type: 'income',
        category: '給料',
        amount: 100000
      };
      expect(window.validateTransaction(validData)).toBe(true);

      const invalidData = {
        id: 1,
        date: '2025/11/01',
        type: 'income',
        category: '給料',
        amount: 100000
      };
      expect(window.validateTransaction(invalidData)).toBe(false);
    });
  });

  describe('エッジケースとエラーハンドリング', () => {
    it('空の入力値を拒否する', () => {
      const amountInput = document.getElementById('amount');
      const dateInput = document.getElementById('date');
      const addButton = document.getElementById('add-transaction');

      amountInput.value = '';
      dateInput.value = '';

      addButton.click();

      expect(window.transactions.length).toBe(0);
    });

    it('不正な金額を拒否する', () => {
      const amountInput = document.getElementById('amount');
      const dateInput = document.getElementById('date');
      const addButton = document.getElementById('add-transaction');

      amountInput.value = '-1000';
      dateInput.value = '2025-11-01';

      addButton.click();

      expect(window.transactions.length).toBe(0);
    });

    it('不正な日付形式を拒否する', () => {
      const invalidData = {
        id: 1,
        date: '2025/11/01',
        type: 'income',
        category: '給料',
        amount: 100000
      };
      expect(window.validateTransaction(invalidData)).toBe(false);
    });

    it('存在しないIDの削除で何も起きない', () => {
      window.transactions = [
        { id: 1, date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '' }
      ];

      window.deleteTransaction(999);

      expect(window.transactions.length).toBe(1);
    });

    it('不正なJSONインポートでエラーが表示される', async () => {
      const mockFile = { content: 'invalid json', name: 'test.json' };

      window.importJSON(mockFile);

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(window.alert).toHaveBeenCalledWith('ファイルの読み込みに失敗しました');
    });

    it('大量のデータを処理できる', () => {
      const largeData = [];
      for (let i = 0; i < 1000; i++) {
        largeData.push({
          id: i + 1,
          date: '2025-11-01',
          type: 'expense',
          category: '食費',
          amount: 1000,
          memo: ''
        });
      }

      window.transactions = largeData;
      window.updateStatistics();

      const totalExpenseEl = document.getElementById('total-expense');
      expect(totalExpenseEl.textContent).toContain('1,000,000');
    });
  });
});
