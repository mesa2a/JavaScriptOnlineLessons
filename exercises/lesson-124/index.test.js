/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lesson 124: 即時実行関数', () => {
  let html;
  let scriptContent;

  beforeAll(() => {
    html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    scriptContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
  });

  beforeEach(() => {
    document.documentElement.innerHTML = html;

    // console.logをモック
    global.console = {
      ...console,
      log: jest.fn()
    };

    eval(scriptContent);
  });

  describe('即時実行関数の使用確認', () => {
    test('即時実行関数が使われている', () => {
      // (function() {})() のパターンを検索
      const iifePattern = /\(function\s*\([^)]*\)\s*\{[\s\S]*?\}\)\s*\([^)]*\)/g;
      const matches = scriptContent.match(iifePattern);

      expect(matches).not.toBeNull();
      expect(matches.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('1. アプリの初期化', () => {
    test('app-info要素に情報が表示される', () => {
      const appInfo = document.getElementById('app-info');
      expect(appInfo.innerHTML).toContain('マイアプリ');
      expect(appInfo.innerHTML).toContain('1.0.0');
      expect(appInfo.innerHTML).toContain('開発者');
    });

    test('初期化完了メッセージがコンソールに出力される', () => {
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('初期化'));
    });

    test('appName, version, author がグローバルに存在しない', () => {
      expect(typeof appName).toBe('undefined');
      expect(typeof version).toBe('undefined');
      expect(typeof author).toBe('undefined');
    });
  });

  describe('2. 計算結果', () => {
    test('calcResult変数が定義されている', () => {
      expect(typeof calcResult).not.toBe('undefined');
    });

    test('calcResultがオブジェクトである', () => {
      expect(typeof calcResult).toBe('object');
    });

    test('calcResultにsumプロパティがある', () => {
      expect(calcResult).toHaveProperty('sum');
    });

    test('calcResultにproductプロパティがある', () => {
      expect(calcResult).toHaveProperty('product');
    });

    test('15 + 4 = 19が計算されている', () => {
      expect(calcResult.sum).toBe(19);
    });

    test('15 × 4 = 60が計算されている', () => {
      expect(calcResult.product).toBe(60);
    });

    test('calc-result要素に結果が表示される', () => {
      const calcResultDiv = document.getElementById('calc-result');
      expect(calcResultDiv.innerHTML).toContain('19');
      expect(calcResultDiv.innerHTML).toContain('60');
    });
  });

  describe('3. カウンター', () => {
    test('counter変数が定義されている', () => {
      expect(typeof counter).not.toBe('undefined');
    });

    test('counterがオブジェクトである', () => {
      expect(typeof counter).toBe('object');
    });

    test('counter.incrementメソッドが存在する', () => {
      expect(typeof counter.increment).toBe('function');
    });

    test('counter.decrementメソッドが存在する', () => {
      expect(typeof counter.decrement).toBe('function');
    });

    test('counter.getValueメソッドが存在する', () => {
      expect(typeof counter.getValue).toBe('function');
    });

    test('counter.resetメソッドが存在する', () => {
      expect(typeof counter.reset).toBe('function');
    });

    test('初期値が0である', () => {
      expect(counter.getValue()).toBe(0);
    });

    test('incrementで値が増える', () => {
      counter.increment();
      expect(counter.getValue()).toBe(1);
      counter.increment();
      expect(counter.getValue()).toBe(2);
    });

    test('decrementで値が減る', () => {
      counter.decrement();
      expect(counter.getValue()).toBe(-1);
    });

    test('resetで0に戻る', () => {
      counter.increment();
      counter.increment();
      counter.reset();
      expect(counter.getValue()).toBe(0);
    });

    test('countプロパティに直接アクセスできない', () => {
      expect(counter.count).toBeUndefined();
    });
  });

  describe('UI関数', () => {
    test('incrementCounter関数が定義されている', () => {
      expect(typeof incrementCounter).toBe('function');
    });

    test('decrementCounter関数が定義されている', () => {
      expect(typeof decrementCounter).toBe('function');
    });

    test('showCount関数が定義されている', () => {
      expect(typeof showCount).toBe('function');
    });

    test('incrementCounterで表示が更新される', () => {
      counter.reset();
      incrementCounter();
      const display = document.getElementById('counter-display');
      expect(display.textContent).toContain('1');
    });

    test('decrementCounterで表示が更新される', () => {
      counter.reset();
      decrementCounter();
      const display = document.getElementById('counter-display');
      expect(display.textContent).toContain('-1');
    });

    test('showCountでalertが表示される', () => {
      global.alert = jest.fn();
      counter.reset();
      counter.increment();
      showCount();
      expect(alert).toHaveBeenCalled();
    });
  });

  describe('スコープの分離', () => {
    test('一時変数がグローバルに残らない', () => {
      // 計算で使った一時変数がグローバルに存在しないことを確認
      expect(typeof sum).toBe('undefined');
      expect(typeof product).toBe('undefined');
      expect(typeof count).toBe('undefined');
    });

    test('counterのメソッド経由でのみアクセス可能', () => {
      // countに直接アクセスできないことを確認
      expect(counter.count).toBeUndefined();

      // メソッド経由でのみアクセス可能
      expect(typeof counter.getValue()).toBe('number');
    });
  });

  describe('統合テスト', () => {
    test('すべての機能が正しく動作する', () => {
      // アプリ初期化
      const appInfo = document.getElementById('app-info');
      expect(appInfo.innerHTML).toContain('マイアプリ');

      // 計算結果
      expect(calcResult.sum).toBe(19);
      expect(calcResult.product).toBe(60);

      // カウンター
      counter.reset();
      expect(counter.getValue()).toBe(0);
      counter.increment();
      counter.increment();
      expect(counter.getValue()).toBe(2);
      counter.decrement();
      expect(counter.getValue()).toBe(1);
    });

    test('プライベート変数が保護されている', () => {
      // どのプライベート変数もグローバルに存在しない
      expect(typeof appName).toBe('undefined');
      expect(typeof version).toBe('undefined');
      expect(typeof author).toBe('undefined');
      expect(typeof count).toBe('undefined');
      expect(counter.count).toBeUndefined();
    });
  });
});
