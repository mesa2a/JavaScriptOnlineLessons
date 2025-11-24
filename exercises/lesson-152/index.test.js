import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 152: TODOアプリ（カテゴリ編）', () => {
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

  it('カテゴリ選択のドロップダウンが存在する', () => {
    const categorySelect = document.getElementById('category-select');
    expect(categorySelect).not.toBeNull();
    expect(categorySelect.tagName).toBe('SELECT');
  });

  it('新しいタスクにカテゴリを指定できる', () => {
    const newTaskCategory = document.getElementById('new-task-category');
    expect(newTaskCategory).not.toBeNull();
    expect(newTaskCategory.tagName).toBe('SELECT');
  });

  it('タスクを追加するとカテゴリ情報が保存される', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');

    newTaskCategory.value = '仕事';
    todoInput.value = 'プレゼン資料作成';
    addBtn.click();

    // localStorageから取得
    const savedTodos = JSON.parse(window.localStorage.getItem('todos'));
    expect(savedTodos).not.toBeNull();
    expect(savedTodos.length).toBe(1);
    expect(savedTodos[0].text).toBe('プレゼン資料作成');
    expect(savedTodos[0].category).toBe('仕事');
  });

  it('カテゴリでタスクをフィルターできる', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const categorySelect = document.getElementById('category-select');
    const todoList = document.getElementById('todo-list');

    // 異なるカテゴリのタスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議';
    addBtn.click();

    newTaskCategory.value = 'プライベート';
    todoInput.value = '読書';
    addBtn.click();

    newTaskCategory.value = '買い物';
    todoInput.value = '牛乳';
    addBtn.click();

    // 「仕事」カテゴリでフィルター
    categorySelect.value = '仕事';
    categorySelect.dispatchEvent(new window.Event('change'));

    expect(todoList.children.length).toBe(1);
    expect(todoList.children[0].textContent).toContain('会議');

    // 「プライベート」カテゴリでフィルター
    categorySelect.value = 'プライベート';
    categorySelect.dispatchEvent(new window.Event('change'));

    expect(todoList.children.length).toBe(1);
    expect(todoList.children[0].textContent).toContain('読書');

    // 「すべて」に戻す
    categorySelect.value = 'すべて';
    categorySelect.dispatchEvent(new window.Event('change'));

    expect(todoList.children.length).toBe(3);
  });

  it('タスクにカテゴリバッジが表示される', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    newTaskCategory.value = '仕事';
    todoInput.value = 'レポート作成';
    addBtn.click();

    const badge = todoList.querySelector('.category-badge');
    expect(badge).not.toBeNull();
    expect(badge.textContent).toBe('仕事');
  });

  it('カテゴリと完了状態の両方でフィルターできる', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const categorySelect = document.getElementById('category-select');
    const filterActiveBtn = document.getElementById('filter-active');
    const todoList = document.getElementById('todo-list');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議';
    addBtn.click();

    newTaskCategory.value = '仕事';
    todoInput.value = 'メール返信';
    addBtn.click();

    newTaskCategory.value = 'プライベート';
    todoInput.value = '読書';
    addBtn.click();

    // 最初のタスクを完了にする
    todoList.children[0].click();

    // 「仕事」カテゴリ + 未完了フィルター
    categorySelect.value = '仕事';
    categorySelect.dispatchEvent(new window.Event('change'));
    filterActiveBtn.click();

    // 仕事カテゴリの未完了タスクのみ表示される
    expect(todoList.children.length).toBe(1);
    expect(todoList.children[0].textContent).toContain('メール返信');
  });

  it('カテゴリごとに異なる色が設定される', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // 異なるカテゴリのタスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = 'タスク1';
    addBtn.click();

    newTaskCategory.value = 'プライベート';
    todoInput.value = 'タスク2';
    addBtn.click();

    const badges = todoList.querySelectorAll('.category-badge');
    expect(badges.length).toBe(2);

    // 各バッジに背景色が設定されている
    expect(badges[0].style.backgroundColor).not.toBe('');
    expect(badges[1].style.backgroundColor).not.toBe('');
    // 異なる色が設定されている
    expect(badges[0].style.backgroundColor).not.toBe(badges[1].style.backgroundColor);
  });
});
