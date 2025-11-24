import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('レッスン146：TODOアプリ（基本編）- 演習', () => {
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
  });

  describe('UI要素の存在確認', () => {
    it('タスク入力欄が存在する', () => {
      const input = document.getElementById('taskInput');
      expect(input).toBeTruthy();
      expect(input.tagName).toBe('INPUT');
    });

    it('タスク追加ボタンが存在する', () => {
      const buttons = document.querySelectorAll('button');
      const addButton = Array.from(buttons).find(btn => btn.textContent.includes('追加'));
      expect(addButton).toBeTruthy();
    });

    it('タスク一覧エリアが存在する', () => {
      const taskList = document.getElementById('taskList');
      expect(taskList).toBeTruthy();
    });
  });

  describe('関数の存在確認', () => {
    it('addTask関数が定義されている', () => {
      expect(typeof window.addTask).toBe('function');
    });

    it('deleteTask関数が定義されている', () => {
      expect(typeof window.deleteTask).toBe('function');
    });

    it('displayTasks関数が定義されている', () => {
      expect(typeof window.displayTasks).toBe('function');
    });
  });

  describe('データ構造', () => {
    it('tasksという配列が存在する', () => {
      expect(Array.isArray(window.tasks)).toBe(true);
    });
  });
});
