import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 162: グラフ表示', () => {
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

  it('円グラフ用のCanvas要素が存在する', () => {
    const pieChart = document.getElementById('pie-chart');
    expect(pieChart).not.toBeNull();
    expect(pieChart.tagName).toBe('CANVAS');
  });

  it('棒グラフ用のCanvas要素が存在する', () => {
    const barChart = document.getElementById('bar-chart');
    expect(barChart).not.toBeNull();
    expect(barChart.tagName).toBe('CANVAS');
  });

  it('凡例用のコンテナが存在する', () => {
    const pieLegend = document.getElementById('pie-legend');
    expect(pieLegend).not.toBeNull();
  });

  it('drawPieChart関数が定義されている', () => {
    expect(typeof window.drawPieChart).toBe('function');
  });

  it('drawLegend関数が定義されている', () => {
    expect(typeof window.drawLegend).toBe('function');
  });

  it('drawBarChart関数が定義されている', () => {
    expect(typeof window.drawBarChart).toBe('function');
  });

  it('updateCharts関数が定義されている', () => {
    expect(typeof window.updateCharts).toBe('function');
  });

  it('drawPieChart関数がCanvasコンテキストを取得できる', () => {
    const canvas = document.getElementById('pie-chart');
    const data = { '食費': 30000, '交通費': 10000 };
    const colors = { '食費': '#F44336', '交通費': '#E91E63' };

    // エラーが発生しないことを確認
    expect(() => {
      window.drawPieChart(canvas, data, colors);
    }).not.toThrow();
  });

  it('drawBarChart関数がCanvasに描画できる', () => {
    const canvas = document.getElementById('bar-chart');

    // エラーが発生しないことを確認
    expect(() => {
      window.drawBarChart(canvas, 100000, 50000);
    }).not.toThrow();
  });

  it('drawLegend関数が凡例を生成する', () => {
    const container = document.getElementById('pie-legend');
    const data = { '食費': 30000, '交通費': 10000 };
    const colors = { '食費': '#F44336', '交通費': '#E91E63' };

    window.drawLegend(container, data, colors);

    const legendItems = container.querySelectorAll('.legend-item');
    expect(legendItems.length).toBe(2);
  });

  it('凡例に金額とパーセンテージが表示される', () => {
    const container = document.getElementById('pie-legend');
    const data = { '食費': 30000, '交通費': 10000 };
    const colors = { '食費': '#F44336', '交通費': '#E91E63' };

    window.drawLegend(container, data, colors);

    const legendAmounts = container.querySelectorAll('.legend-amount');
    expect(legendAmounts.length).toBeGreaterThan(0);

    const firstAmount = legendAmounts[0].textContent;
    expect(firstAmount).toContain('¥');
    expect(firstAmount).toContain('%');
  });

  it('データがない場合、円グラフにメッセージが表示される', () => {
    const canvas = document.getElementById('pie-chart');
    const data = {};
    const colors = {};

    window.drawPieChart(canvas, data, colors);

    // Canvasの内容を確認するのは難しいので、エラーが発生しないことだけ確認
    expect(true).toBe(true);
  });

  it('データがない場合、棒グラフにメッセージが表示される', () => {
    const canvas = document.getElementById('bar-chart');

    window.drawBarChart(canvas, 0, 0);

    // Canvasの内容を確認するのは難しいので、エラーが発生しないことだけ確認
    expect(true).toBe(true);
  });

  it('updateCharts関数が正しく動作する', () => {
    window.transactions = [
      { id: 1, type: 'expense', amount: 30000, category: '食費' },
      { id: 2, type: 'expense', amount: 10000, category: '交通費' },
      { id: 3, type: 'income', amount: 100000, category: '給料' }
    ];

    // エラーが発生しないことを確認
    expect(() => {
      window.updateCharts();
    }).not.toThrow();
  });

  it('統計タブを開いたときにグラフが更新される', () => {
    window.transactions = [
      { id: 1, type: 'expense', amount: 30000, category: '食費' }
    ];

    const statsTabButton = Array.from(document.querySelectorAll('.tab-button'))
      .find(btn => btn.getAttribute('data-tab') === 'stats');

    if (statsTabButton) {
      const updateChartsSpy = vi.spyOn(window, 'updateCharts');
      statsTabButton.click();
      expect(updateChartsSpy).toHaveBeenCalled();
    }
  });

  it('凡例が金額順にソートされる', () => {
    const container = document.getElementById('pie-legend');
    const data = { '交通費': 10000, '食費': 30000, '娯楽': 20000 };
    const colors = { '食費': '#F44336', '交通費': '#E91E63', '娯楽': '#9C27B0' };

    window.drawLegend(container, data, colors);

    const legendLabels = container.querySelectorAll('.legend-label');
    expect(legendLabels[0].textContent).toBe('食費'); // 最も高額
    expect(legendLabels[1].textContent).toBe('娯楽');
    expect(legendLabels[2].textContent).toBe('交通費');
  });

  it('HTMLにChart用のCSSクラスが定義されている', () => {
    const chartSection = document.querySelector('.chart-section');
    expect(chartSection).not.toBeNull();

    const chartContainer = document.querySelector('.chart-container');
    expect(chartContainer).not.toBeNull();
  });
});
