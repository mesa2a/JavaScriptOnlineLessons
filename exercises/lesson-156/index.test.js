import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 156: TODOアプリ（カウンター編）', () => {
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

  it('統計情報表示エリアが存在する', () => {
    const statsContainer = document.getElementById('stats-container');
    expect(statsContainer).not.toBeNull();
  });

  it('全タスク数表示要素が存在する', () => {
    const totalCount = document.getElementById('total-count');
    expect(totalCount).not.toBeNull();
  });

  it('未完了タスク数表示要素が存在する', () => {
    const incompleteCount = document.getElementById('incomplete-count');
    expect(incompleteCount).not.toBeNull();
  });

  it('完了タスク数表示要素が存在する', () => {
    const completedCount = document.getElementById('completed-count');
    expect(completedCount).not.toBeNull();
  });

  it('初期状態では全タスク数が0', () => {
    const totalCount = document.getElementById('total-count');
    expect(totalCount.textContent).toBe('0');
  });

  it('タスクを追加すると全タスク数が増える', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const totalCount = document.getElementById('total-count');

    // 初期状態
    expect(totalCount.textContent).toBe('0');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    expect(totalCount.textContent).toBe('1');

    // もう1つ追加
    todoInput.value = 'メール返信';
    addBtn.click();

    expect(totalCount.textContent).toBe('2');
  });

  it('タスクを追加すると未完了タスク数が増える', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const incompleteCount = document.getElementById('incomplete-count');

    // 初期状態
    expect(incompleteCount.textContent).toBe('0');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    expect(incompleteCount.textContent).toBe('1');
  });

  it('タスクを完了すると完了タスク数が増える', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const completedCount = document.getElementById('completed-count');
    const incompleteCount = document.getElementById('incomplete-count');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    // 初期状態
    expect(completedCount.textContent).toBe('0');
    expect(incompleteCount.textContent).toBe('1');

    // タスクを完了にする
    const taskText = todoList.querySelector('.task-text');
    taskText.click();

    // 完了数が増え、未完了数が減る
    expect(completedCount.textContent).toBe('1');
    expect(incompleteCount.textContent).toBe('0');
  });

  it('複数タスクの統計が正しく計算される', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const totalCount = document.getElementById('total-count');
    const incompleteCount = document.getElementById('incomplete-count');
    const completedCount = document.getElementById('completed-count');

    // 3つのタスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = 'タスク1';
    addBtn.click();

    todoInput.value = 'タスク2';
    addBtn.click();

    todoInput.value = 'タスク3';
    addBtn.click();

    // 全タスク数
    expect(totalCount.textContent).toBe('3');
    expect(incompleteCount.textContent).toBe('3');
    expect(completedCount.textContent).toBe('0');

    // 1つ目を完了
    const tasks = todoList.querySelectorAll('.task-text');
    tasks[0].click();

    expect(totalCount.textContent).toBe('3');
    expect(incompleteCount.textContent).toBe('2');
    expect(completedCount.textContent).toBe('1');

    // 2つ目を完了
    tasks[1].click();

    expect(totalCount.textContent).toBe('3');
    expect(incompleteCount.textContent).toBe('1');
    expect(completedCount.textContent).toBe('2');
  });

  it('タスクを完了から未完了に戻すと統計が更新される', () => {
    const todoInput = document.getElementById('todo-input');
    const newTaskCategory = document.getElementById('new-task-category');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const incompleteCount = document.getElementById('incomplete-count');
    const completedCount = document.getElementById('completed-count');

    // タスクを追加
    newTaskCategory.value = '仕事';
    todoInput.value = '会議の準備';
    addBtn.click();

    // 完了にする
    const taskText = todoList.querySelector('.task-text');
    taskText.click();

    expect(completedCount.textContent).toBe('1');
    expect(incompleteCount.textContent).toBe('0');

    // 未完了に戻す
    taskText.click();

    expect(completedCount.textContent).toBe('0');
    expect(incompleteCount.textContent).toBe('1');
  });

  it('ページ読み込み時に統計が表示される', () => {
    const totalCount = document.getElementById('total-count');
    const incompleteCount = document.getElementById('incomplete-count');
    const completedCount = document.getElementById('completed-count');

    // 初期状態で0が表示されている
    expect(totalCount.textContent).toBe('0');
    expect(incompleteCount.textContent).toBe('0');
    expect(completedCount.textContent).toBe('0');
  });
});
