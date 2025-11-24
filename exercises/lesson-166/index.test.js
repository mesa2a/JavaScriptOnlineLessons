import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 166: インポート', () => {
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

  it('parseCSVLine関数が定義されている', () => {
    expect(typeof window.parseCSVLine).toBe('function');
  });

  it('parseCSV関数が定義されている', () => {
    expect(typeof window.parseCSV).toBe('function');
  });

  it('validateImportedData関数が定義されている', () => {
    expect(typeof window.validateImportedData).toBe('function');
  });

  it('mergeTransactions関数が定義されている', () => {
    expect(typeof window.mergeTransactions).toBe('function');
  });

  it('importJSON関数が定義されている', () => {
    expect(typeof window.importJSON).toBe('function');
  });

  it('importCSV関数が定義されている', () => {
    expect(typeof window.importCSV).toBe('function');
  });

  it('handleFileSelect関数が定義されている', () => {
    expect(typeof window.handleFileSelect).toBe('function');
  });

  it('parseCSVLine関数が通常の行を正しく解析する', () => {
    const result = window.parseCSVLine('2025-11-01,収入,給料,100000,給与');
    expect(result).toEqual(['2025-11-01', '収入', '給料', '100000', '給与']);
  });

  it('parseCSVLine関数がカンマを含む引用符付きフィールドを解析する', () => {
    const result = window.parseCSVLine('2025-11-05,支出,食費,5000,"ランチ, コーヒー"');
    expect(result[4]).toBe('ランチ, コーヒー');
  });

  it('parseCSVLine関数がダブルクォーテーションをエスケープする', () => {
    const result = window.parseCSVLine('2025-11-05,支出,食費,5000,"彼は""こんにちは""と言った"');
    expect(result[4]).toBe('彼は"こんにちは"と言った');
  });

  it('parseCSV関数がCSV文字列を解析する', () => {
    const csv = '日付,種類,カテゴリ,金額,メモ\n2025-11-01,収入,給料,100000,給与\n2025-11-05,支出,食費,5000,スーパー';
    const result = window.parseCSV(csv);
    expect(result.length).toBe(2);
    expect(result[0].date).toBe('2025-11-01');
    expect(result[0].type).toBe('income');
    expect(result[1].type).toBe('expense');
  });

  it('parseCSV関数が空行をスキップする', () => {
    const csv = '日付,種類,カテゴリ,金額,メモ\n2025-11-01,収入,給料,100000,給与\n\n2025-11-05,支出,食費,5000,スーパー';
    const result = window.parseCSV(csv);
    expect(result.length).toBe(2);
  });

  it('validateImportedData関数が有効なデータを承認する', () => {
    const validData = {
      date: '2025-11-01',
      type: 'income',
      category: '給料',
      amount: 100000,
      memo: ''
    };
    expect(window.validateImportedData(validData)).toBe(true);
  });

  it('validateImportedData関数が日付がないデータを拒否する', () => {
    const invalidData = {
      type: 'income',
      category: '給料',
      amount: 100000
    };
    expect(window.validateImportedData(invalidData)).toBe(false);
  });

  it('validateImportedData関数が不正な日付形式を拒否する', () => {
    const invalidData = {
      date: '2025/11/01',
      type: 'income',
      category: '給料',
      amount: 100000
    };
    expect(window.validateImportedData(invalidData)).toBe(false);
  });

  it('validateImportedData関数が不正なtypeを拒否する', () => {
    const invalidData = {
      date: '2025-11-01',
      type: 'invalid',
      category: '給料',
      amount: 100000
    };
    expect(window.validateImportedData(invalidData)).toBe(false);
  });

  it('validateImportedData関数が負の金額を拒否する', () => {
    const invalidData = {
      date: '2025-11-01',
      type: 'income',
      category: '給料',
      amount: -100
    };
    expect(window.validateImportedData(invalidData)).toBe(false);
  });

  it('mergeTransactions関数がデータを追加する', () => {
    window.transactions = [];
    const importedData = [
      { date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '' }
    ];
    window.mergeTransactions(importedData);
    expect(window.transactions.length).toBe(1);
    expect(window.transactions[0].id).toBeDefined();
  });

  it('mergeTransactions関数が複数データを追加する', () => {
    window.transactions = [];
    const importedData = [
      { date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '' },
      { date: '2025-11-05', type: 'expense', category: '食費', amount: 5000, memo: '' }
    ];
    window.mergeTransactions(importedData);
    expect(window.transactions.length).toBe(2);
  });

  it('mergeTransactions関数が既存データに追加する', () => {
    window.transactions = [
      { id: 1, date: '2025-10-01', type: 'income', category: '給料', amount: 100000, memo: '' }
    ];
    const importedData = [
      { date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '' }
    ];
    window.mergeTransactions(importedData);
    expect(window.transactions.length).toBe(2);
  });

  it('importJSON関数がJSONファイルを読み込む', async () => {
    const jsonContent = JSON.stringify([
      { id: 1, date: '2025-11-01', type: 'income', category: '給料', amount: 100000, memo: '' }
    ]);
    const mockFile = { content: jsonContent, name: 'test.json' };

    window.transactions = [];
    window.importJSON(mockFile);

    await new Promise(resolve => setTimeout(resolve, 10));

    expect(window.transactions.length).toBe(1);
  });

  it('importJSON関数が不正なJSONでエラーを表示する', async () => {
    const mockFile = { content: 'invalid json', name: 'test.json' };

    window.importJSON(mockFile);

    await new Promise(resolve => setTimeout(resolve, 10));

    expect(window.alert).toHaveBeenCalledWith('ファイルの読み込みに失敗しました');
  });

  it('importCSV関数がCSVファイルを読み込む', async () => {
    const csvContent = '日付,種類,カテゴリ,金額,メモ\n2025-11-01,収入,給料,100000,給与';
    const mockFile = { content: csvContent, name: 'test.csv' };

    window.transactions = [];
    window.importCSV(mockFile);

    await new Promise(resolve => setTimeout(resolve, 10));

    expect(window.transactions.length).toBe(1);
  });

  it('handleFileSelect関数がJSONファイルを判定する', () => {
    const mockEvent = {
      target: {
        files: [{ name: 'test.json', content: '[]' }],
        value: 'test.json'
      }
    };

    const importJSONSpy = vi.spyOn(window, 'importJSON');
    window.handleFileSelect(mockEvent);

    expect(importJSONSpy).toHaveBeenCalled();
  });

  it('handleFileSelect関数がCSVファイルを判定する', () => {
    const mockEvent = {
      target: {
        files: [{ name: 'test.csv', content: '' }],
        value: 'test.csv'
      }
    };

    const importCSVSpy = vi.spyOn(window, 'importCSV');
    window.handleFileSelect(mockEvent);

    expect(importCSVSpy).toHaveBeenCalled();
  });

  it('handleFileSelect関数が不正なファイル形式を拒否する', () => {
    const mockEvent = {
      target: {
        files: [{ name: 'test.txt', content: '' }],
        value: 'test.txt'
      }
    };

    window.handleFileSelect(mockEvent);

    expect(window.alert).toHaveBeenCalledWith(
      'サポートされていないファイル形式です。JSON または CSV ファイルを選択してください。'
    );
  });

  it('handleFileSelect関数がファイルがない場合は何もしない', () => {
    const mockEvent = {
      target: {
        files: [],
        value: ''
      }
    };

    const importJSONSpy = vi.spyOn(window, 'importJSON');
    const importCSVSpy = vi.spyOn(window, 'importCSV');

    window.handleFileSelect(mockEvent);

    expect(importJSONSpy).not.toHaveBeenCalled();
    expect(importCSVSpy).not.toHaveBeenCalled();
  });

  it('インポートボタンが存在する', () => {
    const importButton = document.getElementById('import-button');
    expect(importButton).not.toBeNull();
  });

  it('ファイル入力要素が存在する', () => {
    const importFileInput = document.getElementById('import-file-input');
    expect(importFileInput).not.toBeNull();
    expect(importFileInput.type).toBe('file');
    expect(importFileInput.accept).toBe('.json,.csv');
  });

  it('ファイル入力要素が非表示である', () => {
    const importFileInput = document.getElementById('import-file-input');
    expect(importFileInput.style.display).toBe('none');
  });

  it('ファイル名表示要素が存在する', () => {
    const importFileName = document.getElementById('import-file-name');
    expect(importFileName).not.toBeNull();
  });

  it('HTMLにインポートセクションが存在する', () => {
    const settingsTab = document.getElementById('settings-tab');
    expect(settingsTab.textContent).toContain('インポート');
  });

  it('parseCSV関数がメモなしのデータを処理する', () => {
    const csv = '日付,種類,カテゴリ,金額,メモ\n2025-11-01,収入,給料,100000,';
    const result = window.parseCSV(csv);
    expect(result.length).toBe(1);
    expect(result[0].memo).toBeDefined();
  });

  it('validateImportedData関数がNaN金額を拒否する', () => {
    const invalidData = {
      date: '2025-11-01',
      type: 'income',
      category: '給料',
      amount: NaN
    };
    expect(window.validateImportedData(invalidData)).toBe(false);
  });
});
