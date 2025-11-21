const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

describe('Lesson 109: 完成版TODOアプリ', () => {
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

  test('タスクを追加できる', () => {
    const todoInput = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');

    todoInput.value = '買い物';
    addButton.click();

    expect(todoList.children.length).toBeGreaterThan(0);
    expect(todoList.textContent).toContain('買い物');
  });

  test('フィルタボタンがある', () => {
    const filterAll = document.getElementById('filterAll');
    const filterActive = document.getElementById('filterActive');
    const filterCompleted = document.getElementById('filterCompleted');

    expect(filterAll).toBeTruthy();
    expect(filterActive).toBeTruthy();
    expect(filterCompleted).toBeTruthy();
  });

  test('統計情報が表示される', () => {
    const todoInput = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const stats = document.getElementById('stats');

    todoInput.value = 'テスト';
    addButton.click();

    expect(stats.textContent).toBeTruthy();
  });
});
