import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 165: エクスポート', () => {
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
    window.URL = {
      createObjectURL: vi.fn(() => 'blob:mock-url'),
      revokeObjectURL: vi.fn()
    };
    window.Blob = class MockBlob {
      constructor(parts, options) {
        this.parts = parts;
        this.options = options;
        this.size = parts.reduce((sum, part) => {
          if (typeof part === 'string') return sum + part.length;
          if (part instanceof Uint8Array) return sum + part.length;
          return sum;
        }, 0);
        this.type = options?.type || '';
      }
    };

    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);

    const event = new window.Event('DOMContentLoaded');
    window.document.dispatchEvent(event);
  });

  it('escapeCSVValue関数が定義されている', () => {
    expect(typeof window.escapeCSVValue).toBe('function');
  });

  it('generateCSV関数が定義されている', () => {
    expect(typeof window.generateCSV).toBe('function');
  });

  it('downloadCSV関数が定義されている', () => {
    expect(typeof window.downloadCSV).toBe('function');
  });

  it('generateJSON関数が定義されている', () => {
    expect(typeof window.generateJSON).toBe('function');
  });

  it('downloadJSON関数が定義されている', () => {
    expect(typeof window.downloadJSON).toBe('function');
  });

  it('escapeCSVValue関数がカンマを含む値をエスケープする', () => {
    const result = window.escapeCSVValue('ランチ, コーヒー');
    expect(result).toBe('"ランチ, コーヒー"');
  });

  it('escapeCSVValue関数が改行を含む値をエスケープする', () => {
    const result = window.escapeCSVValue('行1\n行2');
    expect(result).toBe('"行1\n行2"');
  });

  it('escapeCSVValue関数がダブルクォーテーションをエスケープする', () => {
    const result = window.escapeCSVValue('彼は"こんにちは"と言った');
    expect(result).toBe('"彼は""こんにちは""と言った"');
  });

  it('escapeCSVValue関数が通常の値はそのまま返す', () => {
    const result = window.escapeCSVValue('通常のテキスト');
    expect(result).toBe('通常のテキスト');
  });

  it('generateCSV関数がヘッダー行を含む', () => {
    window.transactions = [];
    const csv = window.generateCSV();
    expect(csv).toContain('日付,種類,カテゴリ,金額,メモ');
  });

  it('generateCSV関数が収入データを正しく変換する', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];
    const csv = window.generateCSV();
    expect(csv).toContain('2025-11-01,収入,給料,100000');
  });

  it('generateCSV関数が支出データを正しく変換する', () => {
    window.transactions = [
      { id: 1, type: 'expense', date: '2025-11-05', amount: 5000, category: '食費', memo: 'スーパー' }
    ];
    const csv = window.generateCSV();
    expect(csv).toContain('2025-11-05,支出,食費,5000,スーパー');
  });

  it('generateCSV関数が複数データを正しく変換する', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' },
      { id: 2, type: 'expense', date: '2025-11-05', amount: 5000, category: '食費', memo: '' }
    ];
    const csv = window.generateCSV();
    const lines = csv.split('\n').filter(line => line.length > 0);
    expect(lines.length).toBe(3); // ヘッダー + 2データ
  });

  it('generateCSV関数がメモの特殊文字をエスケープする', () => {
    window.transactions = [
      { id: 1, type: 'expense', date: '2025-11-05', amount: 5000, category: '食費', memo: 'ランチ, コーヒー' }
    ];
    const csv = window.generateCSV();
    expect(csv).toContain('"ランチ, コーヒー"');
  });

  it('generateJSON関数がJSON文字列を生成する', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];
    const json = window.generateJSON();
    expect(() => JSON.parse(json)).not.toThrow();
    const parsed = JSON.parse(json);
    expect(parsed.length).toBe(1);
    expect(parsed[0].id).toBe(1);
  });

  it('generateJSON関数が整形されたJSONを生成する', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];
    const json = window.generateJSON();
    expect(json).toContain('\n');
    expect(json).toContain('  ');
  });

  it('downloadCSV関数がデータがない場合にアラートを表示する', () => {
    window.transactions = [];
    window.downloadCSV();
    expect(window.alert).toHaveBeenCalledWith('エクスポートするデータがありません');
  });

  it('downloadCSV関数がBlobを作成する', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];
    window.downloadCSV();
    // Blobが作成されていることを確認（URL.createObjectURLが呼ばれる）
    expect(window.URL.createObjectURL).toHaveBeenCalled();
  });

  it('downloadCSV関数がBOMを含むBlobを作成する', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];

    const originalBlob = window.Blob;
    let blobParts = null;
    window.Blob = class MockBlob extends originalBlob {
      constructor(parts, options) {
        super(parts, options);
        blobParts = parts;
      }
    };

    window.downloadCSV();

    expect(blobParts).not.toBeNull();
    expect(blobParts[0] instanceof Uint8Array).toBe(true);
    const bom = blobParts[0];
    expect(bom[0]).toBe(0xEF);
    expect(bom[1]).toBe(0xBB);
    expect(bom[2]).toBe(0xBF);
  });

  it('downloadCSV関数がリンクをクリックしてダウンロードする', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];

    const clickSpy = vi.fn();
    const originalCreateElement = document.createElement.bind(document);
    document.createElement = function(tag) {
      const element = originalCreateElement(tag);
      if (tag === 'a') {
        element.click = clickSpy;
      }
      return element;
    };

    window.downloadCSV();

    expect(clickSpy).toHaveBeenCalled();
  });

  it('downloadCSV関数がURL.revokeObjectURLを呼ぶ', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];
    window.downloadCSV();
    expect(window.URL.revokeObjectURL).toHaveBeenCalled();
  });

  it('downloadJSON関数がデータがない場合にアラートを表示する', () => {
    window.transactions = [];
    window.downloadJSON();
    expect(window.alert).toHaveBeenCalledWith('エクスポートするデータがありません');
  });

  it('downloadJSON関数がBlobを作成する', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];
    window.downloadJSON();
    expect(window.URL.createObjectURL).toHaveBeenCalled();
  });

  it('downloadJSON関数がURL.revokeObjectURLを呼ぶ', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];
    window.downloadJSON();
    expect(window.URL.revokeObjectURL).toHaveBeenCalled();
  });

  it('CSVエクスポートボタンが存在する', () => {
    const exportCSVButton = document.getElementById('export-csv-button');
    expect(exportCSVButton).not.toBeNull();
    expect(exportCSVButton.disabled).toBe(false);
  });

  it('JSONエクスポートボタンが存在する', () => {
    const exportJSONButton = document.getElementById('export-json-button');
    expect(exportJSONButton).not.toBeNull();
    expect(exportJSONButton.disabled).toBe(false);
  });

  it('CSVエクスポートボタンをクリックするとdownloadCSVが呼ばれる', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];
    const downloadCSVSpy = vi.spyOn(window, 'downloadCSV');
    const exportCSVButton = document.getElementById('export-csv-button');
    exportCSVButton.click();
    expect(downloadCSVSpy).toHaveBeenCalled();
  });

  it('JSONエクスポートボタンをクリックするとdownloadJSONが呼ばれる', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];
    const downloadJSONSpy = vi.spyOn(window, 'downloadJSON');
    const exportJSONButton = document.getElementById('export-json-button');
    exportJSONButton.click();
    expect(downloadJSONSpy).toHaveBeenCalled();
  });

  it('HTMLにエクスポートセクションが存在する', () => {
    const settingsTab = document.getElementById('settings-tab');
    expect(settingsTab.textContent).toContain('エクスポート');
  });

  it('CSVファイル名に日付が含まれる', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];

    let filename = '';
    const originalCreateElement = document.createElement.bind(document);
    document.createElement = function(tag) {
      const element = originalCreateElement(tag);
      if (tag === 'a') {
        Object.defineProperty(element, 'download', {
          set(value) {
            filename = value;
          },
          get() {
            return filename;
          }
        });
      }
      return element;
    };

    window.downloadCSV();

    expect(filename).toMatch(/budget_data_\d{8}\.csv/);
  });

  it('JSONファイル名に日付が含まれる', () => {
    window.transactions = [
      { id: 1, type: 'income', date: '2025-11-01', amount: 100000, category: '給料', memo: '' }
    ];

    let filename = '';
    const originalCreateElement = document.createElement.bind(document);
    document.createElement = function(tag) {
      const element = originalCreateElement(tag);
      if (tag === 'a') {
        Object.defineProperty(element, 'download', {
          set(value) {
            filename = value;
          },
          get() {
            return filename;
          }
        });
      }
      return element;
    };

    window.downloadJSON();

    expect(filename).toMatch(/budget_data_\d{8}\.json/);
  });
});
