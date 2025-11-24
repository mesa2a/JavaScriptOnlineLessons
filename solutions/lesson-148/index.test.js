import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('lesson 148 solution test', () => {
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

  describe('function tests', () => {
    it('addTask works', () => {
      const task = window.addTask('test');
      expect(window.tasks.length).toBe(1);
      expect(task.id).toBe(1);
    });

    it('getTaskById works', () => {
      window.tasks = [{ id: 1, text: 't1', done: false }];
      const task = window.getTaskById(1);
      expect(task.id).toBe(1);
    });

    it('deleteTask works', () => {
      window.tasks = [{ id: 1, text: 't1', done: false }];
      const result = window.deleteTask(1);
      expect(result).toBe(true);
      expect(window.tasks.length).toBe(0);
    });

    it('toggleTask works', () => {
      window.tasks = [{ id: 1, text: 't1', done: false }];
      window.toggleTask(1);
      expect(window.tasks[0].done).toBe(true);
    });

    it('createTaskHTML works', () => {
      const task = { id: 1, text: 'test', done: false };
      const html = window.createTaskHTML(task);
      expect(html).toContain('test');
    });

    it('handleAdd works', () => {
      const input = document.getElementById('taskInput');
      input.value = 'test';
      window.handleAdd();
      expect(window.tasks.length).toBe(1);
    });
  });
});
