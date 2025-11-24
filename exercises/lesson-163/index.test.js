import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 163: レポート機能', () => {
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
      clear() {
        this.data = {};
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

  it('getMonthKey関数が定義されている', () => {
    expect(typeof window.getMonthKey).toBe('function');
  });

  it('getMonthKey関数が正しく年月を抽出する', () => {
    expect(window.getMonthKey('2025-11-23')).toBe('2025-11');
    expect(window.getMonthKey('2025-01-01')).toBe('2025-01');
  });

  it('calculateMonthlyData関数が定義されている', () => {
    expect(typeof window.calculateMonthlyData).toBe('function');
  });

  it('calculateMonthlyData関数が月別データを計算する', () => {
    window.transactions = [
      { type: 'income', date: '2025-11-01', amount: 100000 },
      { type: 'expense', date: '2025-11-05', amount: 30000 },
      { type: 'income', date: '2025-10-01', amount: 150000 },
      { type: 'expense', date: '2025-10-10', amount: 50000 }
    ];

    const monthlyData = window.calculateMonthlyData();

    expect(monthlyData['2025-11'].income).toBe(100000);
    expect(monthlyData['2025-11'].expense).toBe(30000);
    expect(monthlyData['2025-11'].balance).toBe(70000);
    expect(monthlyData['2025-10'].income).toBe(150000);
    expect(monthlyData['2025-10'].expense).toBe(50000);
    expect(monthlyData['2025-10'].balance).toBe(100000);
  });

  it('getSortedMonths関数が定義されている', () => {
    expect(typeof window.getSortedMonths).toBe('function');
  });

  it('getSortedMonths関数が月をソートする', () => {
    const monthlyData = {
      '2025-11': {},
      '2025-09': {},
      '2025-10': {}
    };

    const sorted = window.getSortedMonths(monthlyData);
    expect(sorted).toEqual(['2025-09', '2025-10', '2025-11']);
  });

  it('renderMonthlyReport関数が定義されている', () => {
    expect(typeof window.renderMonthlyReport).toBe('function');
  });

  it('renderMonthlyReport関数が月次レポートを表示する', () => {
    window.transactions = [
      { type: 'income', date: '2025-11-01', amount: 100000 },
      { type: 'expense', date: '2025-11-05', amount: 30000 }
    ];

    window.renderMonthlyReport();

    const tbody = document.getElementById('monthly-report-body');
    expect(tbody).not.toBeNull();
    expect(tbody.innerHTML).toContain('2025-11');
    expect(tbody.innerHTML).toContain('100,000');
    expect(tbody.innerHTML).toContain('30,000');
  });

  it('analyzeCategoryData関数が定義されている', () => {
    expect(typeof window.analyzeCategoryData).toBe('function');
  });

  it('analyzeCategoryData関数がカテゴリ別データを分析する', () => {
    window.transactions = [
      { type: 'expense', date: '2025-11-01', amount: 3000, category: '食費' },
      { type: 'expense', date: '2025-11-02', amount: 2000, category: '食費' },
      { type: 'expense', date: '2025-11-03', amount: 500, category: '交通費' }
    ];

    const categoryData = window.analyzeCategoryData();

    expect(categoryData['食費'].total).toBe(5000);
    expect(categoryData['食費'].count).toBe(2);
    expect(categoryData['食費'].average).toBe(2500);
    expect(categoryData['交通費'].total).toBe(500);
    expect(categoryData['交通費'].count).toBe(1);
    expect(categoryData['交通費'].average).toBe(500);
  });

  it('renderCategoryAnalysis関数が定義されている', () => {
    expect(typeof window.renderCategoryAnalysis).toBe('function');
  });

  it('renderCategoryAnalysis関数がカテゴリ分析を表示する', () => {
    window.transactions = [
      { type: 'expense', date: '2025-11-01', amount: 3000, category: '食費' }
    ];

    window.renderCategoryAnalysis();

    const tbody = document.getElementById('category-analysis-body');
    expect(tbody).not.toBeNull();
    expect(tbody.innerHTML).toContain('食費');
    expect(tbody.innerHTML).toContain('3,000');
  });

  it('calculateSummary関数が定義されている', () => {
    expect(typeof window.calculateSummary).toBe('function');
  });

  it('calculateSummary関数がサマリーを計算する', () => {
    window.transactions = [
      { type: 'income', date: '2025-11-01', amount: 100000 },
      { type: 'income', date: '2025-10-01', amount: 100000 },
      { type: 'expense', date: '2025-11-05', amount: 30000 },
      { type: 'expense', date: '2025-10-05', amount: 40000 }
    ];

    const summary = window.calculateSummary();

    expect(summary.totalIncome).toBe(200000);
    expect(summary.totalExpense).toBe(70000);
    expect(summary.balance).toBe(130000);
    expect(summary.averageExpense).toBe(35000);
    expect(summary.monthCount).toBe(2);
    expect(summary.averageMonthlyExpense).toBe(35000);
  });

  it('renderSummary関数が定義されている', () => {
    expect(typeof window.renderSummary).toBe('function');
  });

  it('renderSummary関数がサマリーを表示する', () => {
    window.transactions = [
      { type: 'income', date: '2025-11-01', amount: 100000 },
      { type: 'expense', date: '2025-11-05', amount: 30000 }
    ];

    window.renderSummary();

    const container = document.getElementById('summary-container');
    expect(container).not.toBeNull();
    expect(container.innerHTML).toContain('総収入');
    expect(container.innerHTML).toContain('100,000');
  });

  it('updateReports関数が定義されている', () => {
    expect(typeof window.updateReports).toBe('function');
  });

  it('updateReports関数がすべてのレポートを更新する', () => {
    window.transactions = [
      { type: 'income', date: '2025-11-01', amount: 100000 },
      { type: 'expense', date: '2025-11-05', amount: 30000, category: '食費' }
    ];

    expect(() => {
      window.updateReports();
    }).not.toThrow();

    const monthlyReportBody = document.getElementById('monthly-report-body');
    expect(monthlyReportBody.innerHTML).toContain('2025-11');

    const categoryAnalysisBody = document.getElementById('category-analysis-body');
    expect(categoryAnalysisBody.innerHTML).toContain('食費');

    const summaryContainer = document.getElementById('summary-container');
    expect(summaryContainer.innerHTML).toContain('総収入');
  });

  it('HTMLにレポート用の要素が存在する', () => {
    expect(document.getElementById('monthly-report-body')).not.toBeNull();
    expect(document.getElementById('category-analysis-body')).not.toBeNull();
    expect(document.getElementById('summary-container')).not.toBeNull();
  });

  it('統計タブを開いたときにレポートが更新される', () => {
    window.transactions = [
      { type: 'expense', date: '2025-11-01', amount: 3000, category: '食費' }
    ];

    const statsTabButton = Array.from(document.querySelectorAll('.tab-button'))
      .find(btn => btn.getAttribute('data-tab') === 'stats');

    if (statsTabButton) {
      const updateReportsSpy = vi.spyOn(window, 'updateReports');
      statsTabButton.click();
      expect(updateReportsSpy).toHaveBeenCalled();
    }
  });
});
