/**
 * レッスン4：初めてのHTMLファイル - テスト
 *
 * このテストでは、HTMLファイルの中でJavaScriptが正しく実行され、
 * 適切な出力がコンソールに表示されることを確認します。
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('レッスン4：初めてのHTMLファイル - 基本テスト', () => {
  let consoleLogs;
  let dom;

  beforeEach(() => {
    // console.logの出力をキャプチャ
    consoleLogs = [];
    const mockConsoleLog = vi.fn((...args) => {
      consoleLogs.push(args.map(arg => String(arg)).join(' '));
    });

    const html = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );
    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
      beforeParse(window) {
        window.console.log = mockConsoleLog;
      }
    });

    // スクリプトの実行を待つ
    return new Promise(resolve => setTimeout(resolve, 100));
  });

  describe('基本的な出力', () => {
    it('複数の値が出力されている', () => {
      expect(consoleLogs.length).toBeGreaterThan(0);
    });

    it('HTMLファイルが正しくロードされる', () => {
      const document = dom.window.document;
      expect(document.title).toBe('レッスン4：初めてのHTMLファイル - 解答');
    });
  });

  describe('scriptタグの動作', () => {
    it('scriptタグが存在する', () => {
      const document = dom.window.document;
      const scripts = document.querySelectorAll('script');
      expect(scripts.length).toBeGreaterThan(0);
    });

    it('scriptタグ内のJavaScriptが実行されている', () => {
      // console.logが呼ばれていることを確認
      expect(consoleLogs.length).toBeGreaterThan(0);
    });
  });

  describe('出力内容の確認', () => {
    it('文字列（名前）が出力されている', () => {
      const nameOutput = consoleLogs.find(log =>
        log.includes('山田太郎') ||
        log.includes('田中花子') ||
        log.includes('佐藤次郎') ||
        /[ぁ-んァ-ヶ一-龥]/.test(log)  // 日本語を含む
      );
      expect(nameOutput).toBeDefined();
    });

    it('数値が出力されている', () => {
      const numericLog = consoleLogs.find(log => {
        const trimmed = log.trim();
        return /^\d+$/.test(trimmed) && !isNaN(parseFloat(trimmed));
      });
      expect(numericLog).toBeDefined();
    });

    it('計算結果が出力されている', () => {
      const calculationLog = consoleLogs.find(log => {
        const trimmed = log.trim();
        return /^\d+$/.test(trimmed) && parseInt(trimmed) >= 10;
      });
      expect(calculationLog).toBeDefined();
    });

    it('「完了」または「終了」という文字列が出力されている', () => {
      const completeLog = consoleLogs.find(log =>
        log.includes('完了') || log.includes('終了')
      );
      expect(completeLog).toBeDefined();
    });
  });

  describe('解答例の確認', () => {
    it('「山田太郎」が出力されている', () => {
      const hasYamada = consoleLogs.some(log => log.includes('山田太郎'));
      expect(hasYamada).toBe(true);
    });

    it('数字「7」が出力されている', () => {
      const has7 = consoleLogs.some(log => log.trim() === '7');
      expect(has7).toBe(true);
    });

    it('「7」の2倍である「14」が出力されている', () => {
      const has14 = consoleLogs.some(log => log.trim() === '14');
      expect(has14).toBe(true);
    });

    it('「完了」が出力されている', () => {
      const hasComplete = consoleLogs.some(log => log.includes('完了'));
      expect(hasComplete).toBe(true);
    });
  });

  describe('バリエーション例の確認', () => {
    it('「田中花子」が出力されている', () => {
      const hasTanaka = consoleLogs.some(log => log.includes('田中花子'));
      expect(hasTanaka).toBe(true);
    });

    it('数字「42」が出力されている', () => {
      const has42 = consoleLogs.some(log => log.trim() === '42');
      expect(has42).toBe(true);
    });

    it('「42」の2倍である「84」が出力されている', () => {
      const has84 = consoleLogs.some(log => log.trim() === '84');
      expect(has84).toBe(true);
    });

    it('「佐藤次郎」が出力されている', () => {
      const hasSato = consoleLogs.some(log => log.includes('佐藤次郎'));
      expect(hasSato).toBe(true);
    });

    it('数字「10」が出力されている', () => {
      const has10 = consoleLogs.some(log => log.trim() === '10');
      expect(has10).toBe(true);
    });

    it('「10」の2倍である「20」が出力されている', () => {
      const has20 = consoleLogs.some(log => log.trim() === '20');
      expect(has20).toBe(true);
    });

    it('「終了」が出力されている', () => {
      const hasEnd = consoleLogs.some(log => log.includes('終了'));
      expect(hasEnd).toBe(true);
    });
  });

  describe('複数の計算例の確認', () => {
    it('数字「5」が出力されている', () => {
      const has5 = consoleLogs.some(log => log.trim() === '5');
      expect(has5).toBe(true);
    });

    it('「5」の2倍である「10」が出力されている（バリエーション3）', () => {
      const has10 = consoleLogs.some(log => log.trim() === '10');
      expect(has10).toBe(true);
    });

    it('「5」の3倍である「15」が出力されている', () => {
      const has15 = consoleLogs.some(log => log.trim() === '15');
      expect(has15).toBe(true);
    });

    it('「5」の4倍である「20」が出力されている（バリエーション3）', () => {
      const has20 = consoleLogs.some(log => log.trim() === '20');
      expect(has20).toBe(true);
    });
  });
});

describe('レッスン4：HTMLとJavaScriptの関係', () => {
  it('HTMLファイルにJavaScriptが埋め込まれている', () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );

    // scriptタグが存在することを確認
    expect(html).toContain('<script>');
    expect(html).toContain('</script>');
  });

  it('scriptタグの中にconsole.logが含まれている', () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );

    expect(html).toContain('console.log');
  });

  it('HTMLファイルは正しい文字コード（UTF-8）を指定している', () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );

    expect(html).toContain('charset="UTF-8"');
  });

  it('HTMLファイルにはtitleタグが含まれている', () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );

    expect(html).toContain('<title>');
    expect(html).toContain('</title>');
  });
});

describe('レッスン4：学習目標の達成確認', () => {
  it('HTMLファイルが作成されている', () => {
    const htmlPath = path.resolve(__dirname, 'index.html');
    expect(fs.existsSync(htmlPath)).toBe(true);
  });

  it('scriptタグが正しく使用されている', () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );

    const scriptMatches = html.match(/<script[^>]*>[\s\S]*?<\/script>/gi);
    expect(scriptMatches).not.toBeNull();
    expect(scriptMatches.length).toBeGreaterThan(0);
  });

  it('JavaScriptコードが実行されてコンソール出力がある', () => {
    const consoleLogs = [];
    const mockConsoleLog = vi.fn((...args) => {
      consoleLogs.push(args.map(arg => String(arg)).join(' '));
    });

    const html = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );

    new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
      beforeParse(window) {
        window.console.log = mockConsoleLog;
      }
    });

    // 少し待ってから確認
    return new Promise(resolve => {
      setTimeout(() => {
        expect(consoleLogs.length).toBeGreaterThan(0);
        resolve();
      }, 100);
    });
  });
});
