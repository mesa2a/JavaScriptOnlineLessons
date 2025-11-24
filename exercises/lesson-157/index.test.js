import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 157: TODOアプリ（完成編）', () => {
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

    // confirmのモック
    window.confirm = function() { return true; };

    // JavaScriptを実行
    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);
  });

  it('削除ボタンが存在する', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    const deleteBtn = todoList.querySelector('.delete-btn');
    expect(deleteBtn).not.toBeNull();
    expect(deleteBtn.textContent).toContain('削除');
  });

  it('削除ボタンをクリックするとタスクが削除される', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const totalCount = document.getElementById('total-count');

    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    expect(totalCount.textContent).toBe('1');

    const deleteBtn = todoList.querySelector('.delete-btn');
    deleteBtn.click();

    expect(totalCount.textContent).toBe('0');
  });

  it('完了タスク削除ボタンが存在する', () => {
    const clearCompletedBtn = document.getElementById('clear-completed-btn');
    expect(clearCompletedBtn).not.toBeNull();
  });

  it('完了タスク削除ボタンで完了タスクのみ削除される', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const clearCompletedBtn = document.getElementById('clear-completed-btn');
    const totalCount = document.getElementById('total-count');

    // 2つのタスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = 'タスク1';
    addBtn.click();

    todoInput.value = 'タスク2';
    addBtn.click();

    expect(totalCount.textContent).toBe('2');

    // 1つ目を完了にする
    const tasks = todoList.querySelectorAll('.task-text');
    tasks[0].click();

    // 完了タスクを削除
    clearCompletedBtn.click();

    // 未完了タスクだけ残る
    expect(totalCount.textContent).toBe('1');
  });

  it('すべての機能が統合されて動作する', () => {
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

    newTaskCategory.value = 'プライベート';
    todoInput.value = '買い物に行く';
    addBtn.click();

    // すべてのタスクが表示される
    expect(todoList.children.length).toBe(2);

    // カテゴリでフィルター
    categorySelect.value = '仕事';
    categorySelect.dispatchEvent(new window.Event('change'));
    expect(todoList.children.length).toBe(1);

    // 検索
    categorySelect.value = 'すべて';
    categorySelect.dispatchEvent(new window.Event('change'));
    searchInput.value = '買い物';
    searchInput.dispatchEvent(new window.Event('input'));
    expect(todoList.children.length).toBe(1);
    expect(todoList.children[0].textContent).toContain('買い物');
  });
});
