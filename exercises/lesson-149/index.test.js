import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('レッスン148：TODOアプリ（関数編）- 演習', () => {
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

  describe('データ操作関数の存在確認', () => {
    it('addTask関数が定義されている', () => {
      expect(typeof window.addTask).toBe('function');
    });

    it('getTaskById関数が定義されている', () => {
      expect(typeof window.getTaskById).toBe('function');
    });

    it('deleteTask関数が定義されている', () => {
      expect(typeof window.deleteTask).toBe('function');
    });

    it('toggleTask関数が定義されている', () => {
      expect(typeof window.toggleTask).toBe('function');
    });
  });

  describe('表示関数の存在確認', () => {
    it('displayTasks関数が定義されている', () => {
      expect(typeof window.displayTasks).toBe('function');
    });

    it('createTaskHTML関数が定義されている', () => {
      expect(typeof window.createTaskHTML).toBe('function');
    });
  });

  describe('イベントハンドラの存在確認', () => {
    it('handleAdd関数が定義されている', () => {
      expect(typeof window.handleAdd).toBe('function');
    });

    it('handleToggle関数が定義されている', () => {
      expect(typeof window.handleToggle).toBe('function');
    });

    it('handleDelete関数が定義されている', () => {
      expect(typeof window.handleDelete).toBe('function');
    });
  });
});
