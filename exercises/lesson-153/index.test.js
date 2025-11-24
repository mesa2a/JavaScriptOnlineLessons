import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 153: TODOアプリ（検索編）', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
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

  it('検索ボックスが存在する', () => {
    const searchInput = document.getElementById('search-input');
    expect(searchInput).not.toBeNull();
    expect(searchInput.tagName).toBe('INPUT');
  });

  it('クリアボタンが存在する', () => {
    const clearSearchBtn = document.getElementById('clear-search-btn');
    expect(clearSearchBtn).not.toBeNull();
  });

  it('キーワードで検索できる（部分一致）', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const searchInput = document.getElementById('search-input');
    const todoList = document.getElementById('todo-list');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議の資料を準備する';
    addBtn.click();

    newTaskCategory.value = '買い物';
    todoInput.value = '牛乳を買う';
    addBtn.click();

    newTaskCategory.value = '仕事';
    todoInput.value = '会議に参加する';
    addBtn.click();

    // 「会議」で検索
    searchInput.value = '会議';
    searchInput.dispatchEvent(new window.Event('input'));

    // 会議を含むタスクのみ表示される
    expect(todoList.children.length).toBe(2);
    expect(todoList.children[0].textContent).toContain('会議の資料を準備する');
    expect(todoList.children[1].textContent).toContain('会議に参加する');
  });

  it('検索は大文字小文字を区別しない', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const searchInput = document.getElementById('search-input');
    const todoList = document.getElementById('todo-list');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = 'JavaScript学習';
    addBtn.click();

    // 小文字で検索
    searchInput.value = 'javascript';
    searchInput.dispatchEvent(new window.Event('input'));

    // 大文字小文字を区別せず検索される
    expect(todoList.children.length).toBe(1);
    expect(todoList.children[0].textContent).toContain('JavaScript学習');
  });

  it('検索結果が0件の場合、メッセージが表示される', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const searchInput = document.getElementById('search-input');
    const todoList = document.getElementById('todo-list');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議';
    addBtn.click();

    // 存在しないキーワードで検索
    searchInput.value = '存在しない';
    searchInput.dispatchEvent(new window.Event('input'));

    // メッセージが表示される
    expect(todoList.children.length).toBe(1);
    expect(todoList.children[0].textContent).toContain('見つかりませんでした');
  });

  it('クリアボタンで検索がクリアされる', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const todoList = document.getElementById('todo-list');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議';
    addBtn.click();

    newTaskCategory.value = '買い物';
    todoInput.value = '牛乳';
    addBtn.click();

    // 検索
    searchInput.value = '会議';
    searchInput.dispatchEvent(new window.Event('input'));
    expect(todoList.children.length).toBe(1);

    // クリア
    clearSearchBtn.click();
    expect(searchInput.value).toBe('');
    expect(todoList.children.length).toBe(2);
  });

  it('検索とカテゴリフィルターを組み合わせられる', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');
    const todoList = document.getElementById('todo-list');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    newTaskCategory.value = 'プライベート';
    todoInput.value = '会議に行く';
    addBtn.click();

    newTaskCategory.value = '仕事';
    todoInput.value = 'メール返信';
    addBtn.click();

    // 「仕事」カテゴリ + 「会議」で検索
    categorySelect.value = '仕事';
    categorySelect.dispatchEvent(new window.Event('change'));
    searchInput.value = '会議';
    searchInput.dispatchEvent(new window.Event('input'));

    // 仕事カテゴリで「会議」を含むタスクのみ表示
    expect(todoList.children.length).toBe(1);
    expect(todoList.children[0].textContent).toContain('会議の準備');
  });

  it('検索とカテゴリと完了状態フィルターを組み合わせられる', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');
    const filterActiveBtn = document.getElementById('filter-active');
    const todoList = document.getElementById('todo-list');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    newTaskCategory.value = '仕事';
    todoInput.value = '会議に参加';
    addBtn.click();

    newTaskCategory.value = 'プライベート';
    todoInput.value = '会議室予約';
    addBtn.click();

    // 最初のタスクを完了にする
    todoList.children[0].click();

    // 「仕事」カテゴリ + 未完了 + 「会議」で検索
    categorySelect.value = '仕事';
    categorySelect.dispatchEvent(new window.Event('change'));
    filterActiveBtn.click();
    searchInput.value = '会議';
    searchInput.dispatchEvent(new window.Event('input'));

    // 仕事カテゴリの未完了で「会議」を含むタスクのみ表示
    expect(todoList.children.length).toBe(1);
    expect(todoList.children[0].textContent).toContain('会議に参加');
  });

  it('検索ボックスが空の場合、すべてのタスクが表示される', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const searchInput = document.getElementById('search-input');
    const todoList = document.getElementById('todo-list');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議';
    addBtn.click();

    newTaskCategory.value = '買い物';
    todoInput.value = '牛乳';
    addBtn.click();

    // 検索ボックスが空の場合
    searchInput.value = '';
    searchInput.dispatchEvent(new window.Event('input'));

    // すべてのタスクが表示される
    expect(todoList.children.length).toBe(2);
  });
});
