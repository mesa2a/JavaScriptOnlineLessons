import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 154: TODOアプリ（編集編）', () => {
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

    // alertのモック
    window.alert = vi.fn();

    // JavaScriptを実行
    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);
  });

  it('各タスクに編集ボタンが存在する', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    // 編集ボタンが存在する
    const editBtn = todoList.querySelector('.edit-btn');
    expect(editBtn).not.toBeNull();
    expect(editBtn.textContent).toContain('編集');
  });

  it('編集ボタンをクリックすると編集モードになる', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    // 編集ボタンをクリック
    const editBtn = todoList.querySelector('.edit-btn');
    editBtn.click();

    // 編集モードになる（入力欄が表示される）
    const editInput = todoList.querySelector('.edit-input');
    expect(editInput).not.toBeNull();
    expect(editInput.value).toBe('会議の準備');
  });

  it('編集モードでは保存ボタンとキャンセルボタンが表示される', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    // 編集ボタンをクリック
    const editBtn = todoList.querySelector('.edit-btn');
    editBtn.click();

    // 保存ボタンとキャンセルボタンが表示される
    const saveBtn = todoList.querySelector('.save-btn');
    const cancelBtn = todoList.querySelector('.cancel-btn');

    expect(saveBtn).not.toBeNull();
    expect(cancelBtn).not.toBeNull();
    expect(saveBtn.textContent).toContain('保存');
    expect(cancelBtn.textContent).toContain('キャンセル');
  });

  it('保存ボタンをクリックするとタスクが更新される', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    // 編集ボタンをクリック
    let editBtn = todoList.querySelector('.edit-btn');
    editBtn.click();

    // テキストを変更
    const editInput = todoList.querySelector('.edit-input');
    editInput.value = '会議の資料を準備する';

    // 保存ボタンをクリック
    const saveBtn = todoList.querySelector('.save-btn');
    saveBtn.click();

    // タスクが更新されている
    const taskText = todoList.querySelector('.task-text');
    expect(taskText.textContent).toBe('会議の資料を準備する');

    // localStorageにも保存されている
    const savedTodos = JSON.parse(window.localStorage.getItem('todos'));
    expect(savedTodos[0].text).toBe('会議の資料を準備する');
  });

  it('キャンセルボタンをクリックすると変更が破棄される', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    // 編集ボタンをクリック
    let editBtn = todoList.querySelector('.edit-btn');
    editBtn.click();

    // テキストを変更
    const editInput = todoList.querySelector('.edit-input');
    editInput.value = '変更されたテキスト';

    // キャンセルボタンをクリック
    const cancelBtn = todoList.querySelector('.cancel-btn');
    cancelBtn.click();

    // 元のテキストのまま
    const taskText = todoList.querySelector('.task-text');
    expect(taskText.textContent).toBe('会議の準備');
  });

  it('空のテキストは保存できない', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    // 編集ボタンをクリック
    let editBtn = todoList.querySelector('.edit-btn');
    editBtn.click();

    // テキストを空にする
    const editInput = todoList.querySelector('.edit-input');
    editInput.value = '';

    // 保存ボタンをクリック
    const saveBtn = todoList.querySelector('.save-btn');
    saveBtn.click();

    // alertが表示される
    expect(window.alert).toHaveBeenCalled();

    // 編集モードのまま（保存されない）
    const editInputAfter = todoList.querySelector('.edit-input');
    expect(editInputAfter).not.toBeNull();
  });

  it('編集モード中は他のタスクの編集ボタンは表示されない', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // 2つのタスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = 'タスク1';
    addBtn.click();

    todoInput.value = 'タスク2';
    addBtn.click();

    // 最初のタスクを編集モードにする
    const editBtns = todoList.querySelectorAll('.edit-btn');
    editBtns[0].click();

    // 1つの入力欄だけが表示される
    const editInputs = todoList.querySelectorAll('.edit-input');
    expect(editInputs.length).toBe(1);

    // 1つのタスクだけが編集ボタンを持つ（編集中でないタスク）
    const editBtnsAfter = todoList.querySelectorAll('.edit-btn');
    expect(editBtnsAfter.length).toBe(1);
  });

  it('保存後は編集モードが解除される', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    // 編集ボタンをクリック
    let editBtn = todoList.querySelector('.edit-btn');
    editBtn.click();

    // テキストを変更
    const editInput = todoList.querySelector('.edit-input');
    editInput.value = '会議の資料を準備する';

    // 保存ボタンをクリック
    const saveBtn = todoList.querySelector('.save-btn');
    saveBtn.click();

    // 編集モードが解除される
    const editInputAfter = todoList.querySelector('.edit-input');
    expect(editInputAfter).toBeNull();

    // 編集ボタンが再び表示される
    const editBtnAfter = todoList.querySelector('.edit-btn');
    expect(editBtnAfter).not.toBeNull();
  });
});
