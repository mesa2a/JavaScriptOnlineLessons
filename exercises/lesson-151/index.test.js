import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 151: TODOアプリ（フィルター編）', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    // localStorageをクリア
    const html = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
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

    // localStorageのモック
    const localStorageMock = {
      getItem: function(key) {
        return this[key] || null;
      },
      setItem: function(key, value) {
        this[key] = value;
      },
      clear: function() {
        for (let key in this) {
          if (this.hasOwnProperty(key) && key !== 'getItem' && key !== 'setItem' && key !== 'clear') {
            delete this[key];
          }
        }
      }
    };
    window.localStorage = localStorageMock;

    // JavaScriptを実行
    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);
  });

  it('フィルターボタンが3つ存在する（すべて、未完了、完了）', () => {
    const filterAllBtn = document.getElementById('filter-all');
    const filterActiveBtn = document.getElementById('filter-active');
    const filterCompletedBtn = document.getElementById('filter-completed');

    expect(filterAllBtn).not.toBeNull();
    expect(filterActiveBtn).not.toBeNull();
    expect(filterCompletedBtn).not.toBeNull();

    expect(filterAllBtn.textContent).toContain('すべて');
    expect(filterActiveBtn.textContent).toContain('未完了');
    expect(filterCompletedBtn.textContent).toContain('完了');
  });

  it('デフォルトでは「すべて」ボタンがactiveクラスを持つ', () => {
    const filterAllBtn = document.getElementById('filter-all');
    expect(filterAllBtn.classList.contains('active')).toBe(true);
  });

  it('タスクを追加し、未完了フィルターで未完了タスクのみ表示される', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const filterActiveBtn = document.getElementById('filter-active');

    // タスクを追加
    todoInput.value = '買い物';
    addBtn.click();
    todoInput.value = '掃除';
    addBtn.click();

    // 最初のタスクを完了にする
    const firstTask = todoList.children[0];
    firstTask.click();

    // 未完了フィルターをクリック
    filterActiveBtn.click();

    // 未完了タスクのみ表示されることを確認
    expect(todoList.children.length).toBe(1);
    expect(todoList.children[0].textContent).toBe('掃除');
  });

  it('完了フィルターで完了タスクのみ表示される', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const filterCompletedBtn = document.getElementById('filter-completed');

    // タスクを追加
    todoInput.value = '買い物';
    addBtn.click();
    todoInput.value = '掃除';
    addBtn.click();

    // 最初のタスクを完了にする
    const firstTask = todoList.children[0];
    firstTask.click();

    // 完了フィルターをクリック
    filterCompletedBtn.click();

    // 完了タスクのみ表示されることを確認
    expect(todoList.children.length).toBe(1);
    expect(todoList.children[0].textContent).toBe('買い物');
  });

  it('すべてフィルターですべてのタスクが表示される', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const filterAllBtn = document.getElementById('filter-all');
    const filterActiveBtn = document.getElementById('filter-active');

    // タスクを追加
    todoInput.value = '買い物';
    addBtn.click();
    todoInput.value = '掃除';
    addBtn.click();

    // 最初のタスクを完了にする
    const firstTask = todoList.children[0];
    firstTask.click();

    // 未完了フィルターに切り替え
    filterActiveBtn.click();
    expect(todoList.children.length).toBe(1);

    // すべてフィルターに戻す
    filterAllBtn.click();
    expect(todoList.children.length).toBe(2);
  });

  it('フィルターボタンをクリックするとactiveクラスが切り替わる', () => {
    const filterAllBtn = document.getElementById('filter-all');
    const filterActiveBtn = document.getElementById('filter-active');
    const filterCompletedBtn = document.getElementById('filter-completed');

    // 初期状態：すべてがactive
    expect(filterAllBtn.classList.contains('active')).toBe(true);
    expect(filterActiveBtn.classList.contains('active')).toBe(false);
    expect(filterCompletedBtn.classList.contains('active')).toBe(false);

    // 未完了をクリック
    filterActiveBtn.click();
    expect(filterAllBtn.classList.contains('active')).toBe(false);
    expect(filterActiveBtn.classList.contains('active')).toBe(true);
    expect(filterCompletedBtn.classList.contains('active')).toBe(false);

    // 完了をクリック
    filterCompletedBtn.click();
    expect(filterAllBtn.classList.contains('active')).toBe(false);
    expect(filterActiveBtn.classList.contains('active')).toBe(false);
    expect(filterCompletedBtn.classList.contains('active')).toBe(true);

    // すべてに戻す
    filterAllBtn.click();
    expect(filterAllBtn.classList.contains('active')).toBe(true);
    expect(filterActiveBtn.classList.contains('active')).toBe(false);
    expect(filterCompletedBtn.classList.contains('active')).toBe(false);
  });
});
