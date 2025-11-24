import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 155: TODOアプリ（バリデーション編）', () => {
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

  it('エラーメッセージ表示要素が存在する', () => {
    const errorMessage = document.getElementById('error-message');
    expect(errorMessage).not.toBeNull();
  });

  it('文字数カウンターが存在する', () => {
    const charCounter = document.getElementById('char-counter');
    const charCount = document.getElementById('char-count');
    expect(charCounter).not.toBeNull();
    expect(charCount).not.toBeNull();
  });

  it('空のタスクは追加できない', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const errorMessage = document.getElementById('error-message');

    // 空のまま追加しようとする
    todoInput.value = '';
    addBtn.click();

    // エラーメッセージが表示される
    expect(errorMessage.style.display).toBe('block');
    expect(errorMessage.textContent).toContain('入力してください');

    // タスクは追加されない
    const savedTodos = window.localStorage.getItem('todos');
    expect(savedTodos).toBeNull();
  });

  it('スペースだけのタスクは追加できない', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const errorMessage = document.getElementById('error-message');

    // スペースだけを入力
    todoInput.value = '   ';
    addBtn.click();

    // エラーメッセージが表示される
    expect(errorMessage.style.display).toBe('block');

    // タスクは追加されない
    const savedTodos = window.localStorage.getItem('todos');
    expect(savedTodos).toBeNull();
  });

  it('100文字を超えるタスクは追加できない', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const errorMessage = document.getElementById('error-message');

    // 101文字のタスクを入力
    const longText = 'a'.repeat(101);
    todoInput.value = longText;
    addBtn.click();

    // エラーメッセージが表示される
    expect(errorMessage.style.display).toBe('block');
    expect(errorMessage.textContent).toContain('100文字以内');

    // タスクは追加されない
    const savedTodos = window.localStorage.getItem('todos');
    expect(savedTodos).toBeNull();
  });

  it('100文字以内のタスクは追加できる', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');

    // 100文字のタスクを入力
    const validText = 'a'.repeat(100);
    newTaskCategory.value = '仕事';
    todoInput.value = validText;
    addBtn.click();

    // タスクが追加される
    const savedTodos = JSON.parse(window.localStorage.getItem('todos'));
    expect(savedTodos).not.toBeNull();
    expect(savedTodos.length).toBe(1);
    expect(savedTodos[0].text).toBe(validText);
  });

  it('文字数カウンターがリアルタイムで更新される', () => {
    const todoInput = document.getElementById('todo-input');
    const charCount = document.getElementById('char-count');

    // 初期状態
    expect(charCount.textContent).toBe('0');

    // 文字を入力
    todoInput.value = 'テスト';
    todoInput.dispatchEvent(new window.Event('input'));

    expect(charCount.textContent).toBe('3');

    // さらに入力
    todoInput.value = 'テストタスク';
    todoInput.dispatchEvent(new window.Event('input'));

    expect(charCount.textContent).toBe('6');
  });

  it('100文字を超えると文字数カウンターが警告表示になる', () => {
    const todoInput = document.getElementById('todo-input');
    const charCount = document.getElementById('char-count');

    // 101文字を入力
    todoInput.value = 'a'.repeat(101);
    todoInput.dispatchEvent(new window.Event('input'));

    // 警告スタイルが適用される
    expect(charCount.classList.contains('over')).toBe(true);
  });

  it('入力欄に maxlength 属性が設定されている', () => {
    const todoInput = document.getElementById('todo-input');
    expect(todoInput.maxLength).toBe(100);
  });

  it('正常なタスクは追加できる', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // 正常なタスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    // タスクが追加される
    expect(todoList.children.length).toBe(1);

    // localStorageにも保存される
    const savedTodos = JSON.parse(window.localStorage.getItem('todos'));
    expect(savedTodos.length).toBe(1);
    expect(savedTodos[0].text).toBe('会議の準備');
  });

  it('タスク追加後、入力欄がクリアされる', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const charCount = document.getElementById('char-count');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    // 入力欄がクリアされる
    expect(todoInput.value).toBe('');

    // 文字数カウンターもリセットされる
    expect(charCount.textContent).toBe('0');
  });

  it('編集時も空のタスクは保存できない', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const errorMessage = document.getElementById('error-message');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    // 編集ボタンをクリック
    const editBtn = todoList.querySelector('.edit-btn');
    editBtn.click();

    // テキストを空にする
    const editInput = todoList.querySelector('.edit-input');
    editInput.value = '';

    // 保存ボタンをクリック
    const saveBtn = todoList.querySelector('.save-btn');
    saveBtn.click();

    // エラーメッセージが表示される
    expect(errorMessage.style.display).toBe('block');

    // タスクは変更されない
    const savedTodos = JSON.parse(window.localStorage.getItem('todos'));
    expect(savedTodos[0].text).toBe('会議の準備');
  });
});
