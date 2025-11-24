import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('レッスン146：TODOアプリ（基本編）- 解答', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
    });
    document = dom.window.document;
    window = dom.window;

    const scriptContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf-8');
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptContent;
    document.body.appendChild(scriptEl);

    // DOMContentLoadedイベントを発火
    const event = new window.Event('DOMContentLoaded');
    document.dispatchEvent(event);
  });

  describe('UI要素の存在確認', () => {
    it('タスク入力欄が存在する', () => {
      const input = document.getElementById('taskInput');
      expect(input).toBeTruthy();
      expect(input.tagName).toBe('INPUT');
    });

    it('タスク一覧エリアが存在する', () => {
      const taskList = document.getElementById('taskList');
      expect(taskList).toBeTruthy();
    });
  });

  describe('データ構造', () => {
    it('tasksという配列が存在する', () => {
      expect(Array.isArray(window.tasks)).toBe(true);
    });

    it('tasksは初期状態で空配列', () => {
      expect(window.tasks.length).toBe(0);
    });
  });

  describe('addTask関数', () => {
    it('addTask関数が定義されている', () => {
      expect(typeof window.addTask).toBe('function');
    });

    it('タスクを追加すると配列に追加される', () => {
      const input = document.getElementById('taskInput');
      input.value = 'テストタスク';

      window.addTask();

      expect(window.tasks.length).toBe(1);
      expect(window.tasks[0]).toBe('テストタスク');
    });

    it('タスク追加後、入力欄がクリアされる', () => {
      const input = document.getElementById('taskInput');
      input.value = 'テストタスク';

      window.addTask();

      expect(input.value).toBe('');
    });

    it('空の入力では追加されない', () => {
      const input = document.getElementById('taskInput');
      input.value = '';

      window.addTask();

      expect(window.tasks.length).toBe(0);
    });

    it('複数のタスクを追加できる', () => {
      const input = document.getElementById('taskInput');

      input.value = 'タスク1';
      window.addTask();

      input.value = 'タスク2';
      window.addTask();

      input.value = 'タスク3';
      window.addTask();

      expect(window.tasks.length).toBe(3);
      expect(window.tasks[0]).toBe('タスク1');
      expect(window.tasks[1]).toBe('タスク2');
      expect(window.tasks[2]).toBe('タスク3');
    });
  });

  describe('deleteTask関数', () => {
    it('deleteTask関数が定義されている', () => {
      expect(typeof window.deleteTask).toBe('function');
    });

    it('指定されたインデックスのタスクが削除される', () => {
      window.tasks = ['タスク1', 'タスク2', 'タスク3'];

      window.deleteTask(1);

      expect(window.tasks.length).toBe(2);
      expect(window.tasks[0]).toBe('タスク1');
      expect(window.tasks[1]).toBe('タスク3');
    });

    it('最初のタスクを削除できる', () => {
      window.tasks = ['タスク1', 'タスク2', 'タスク3'];

      window.deleteTask(0);

      expect(window.tasks.length).toBe(2);
      expect(window.tasks[0]).toBe('タスク2');
    });

    it('最後のタスクを削除できる', () => {
      window.tasks = ['タスク1', 'タスク2', 'タスク3'];

      window.deleteTask(2);

      expect(window.tasks.length).toBe(2);
      expect(window.tasks[1]).toBe('タスク2');
    });
  });

  describe('displayTasks関数', () => {
    it('displayTasks関数が定義されている', () => {
      expect(typeof window.displayTasks).toBe('function');
    });

    it('タスクがない場合、メッセージが表示される', () => {
      window.tasks = [];
      window.displayTasks();

      const taskList = document.getElementById('taskList');
      expect(taskList.innerHTML).toContain('タスクがありません');
    });

    it('タスクが表示される', () => {
      window.tasks = ['買い物', '宿題'];
      window.displayTasks();

      const taskList = document.getElementById('taskList');
      expect(taskList.innerHTML).toContain('買い物');
      expect(taskList.innerHTML).toContain('宿題');
    });

    it('削除ボタンが各タスクに表示される', () => {
      window.tasks = ['タスク1', 'タスク2'];
      window.displayTasks();

      const taskList = document.getElementById('taskList');
      const deleteButtons = taskList.querySelectorAll('button');
      expect(deleteButtons.length).toBe(2);
    });

    it('タスク番号が表示される', () => {
      window.tasks = ['タスク1', 'タスク2'];
      window.displayTasks();

      const taskList = document.getElementById('taskList');
      expect(taskList.innerHTML).toContain('1.');
      expect(taskList.innerHTML).toContain('2.');
    });
  });

  describe('統合テスト', () => {
    it('タスクの追加と表示が連動する', () => {
      const input = document.getElementById('taskInput');
      input.value = 'テストタスク';

      window.addTask();

      const taskList = document.getElementById('taskList');
      expect(taskList.innerHTML).toContain('テストタスク');
    });

    it('タスクの削除と表示が連動する', () => {
      window.tasks = ['タスク1', 'タスク2'];
      window.displayTasks();

      window.deleteTask(0);

      const taskList = document.getElementById('taskList');
      expect(taskList.innerHTML).not.toContain('タスク1');
      expect(taskList.innerHTML).toContain('タスク2');
    });

    it('複数のタスクを追加・削除できる', () => {
      const input = document.getElementById('taskInput');

      // 追加
      input.value = 'タスク1';
      window.addTask();
      input.value = 'タスク2';
      window.addTask();
      input.value = 'タスク3';
      window.addTask();

      expect(window.tasks.length).toBe(3);

      // 削除
      window.deleteTask(1);

      expect(window.tasks.length).toBe(2);
      expect(window.tasks[0]).toBe('タスク1');
      expect(window.tasks[1]).toBe('タスク3');
    });
  });
});
