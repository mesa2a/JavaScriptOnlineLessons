const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

describe('Lesson 110: 最初の関数', () => {
  let dom, document, window;

  beforeEach(() => {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    document = dom.window.document;
    window = dom.window;

    const scriptContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf-8');
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptContent;
    document.body.appendChild(scriptEl);
  });

  test('showMorning関数が定義されている', () => {
    expect(typeof window.showMorning).toBe('function');
  });

  test('showAfternoon関数が定義されている', () => {
    expect(typeof window.showAfternoon).toBe('function');
  });

  test('showEvening関数が定義されている', () => {
    expect(typeof window.showEvening).toBe('function');
  });

  test('showMorning関数を呼び出すとメッセージが変わる', () => {
    const messageDiv = document.getElementById('message');
    window.showMorning();
    expect(messageDiv.textContent).toContain('おはよう');
  });

  test('showAfternoon関数を呼び出すとメッセージが変わる', () => {
    const messageDiv = document.getElementById('message');
    window.showAfternoon();
    expect(messageDiv.textContent).toContain('こんにちは');
  });

  test('showEvening関数を呼び出すとメッセージが変わる', () => {
    const messageDiv = document.getElementById('message');
    window.showEvening();
    expect(messageDiv.textContent).toContain('こんばんは');
  });
});
