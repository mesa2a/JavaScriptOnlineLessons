import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('lesson 149 solution', () => {
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

  describe('basic tests', () => {
    it('all functions exist', () => {
      expect(typeof window.addTask).toBe('function');
      expect(typeof window.getTaskById).toBe('function');
      expect(typeof window.deleteTask).toBe('function');
      expect(typeof window.toggleTask).toBe('function');
      expect(typeof window.displayTasks).toBe('function');
      expect(typeof window.createTaskHTML).toBe('function');
      expect(typeof window.handleAdd).toBe('function');
      expect(typeof window.handleToggle).toBe('function');
      expect(typeof window.handleDelete).toBe('function');
    });

    it('addTask works', () => {
      const task = window.addTask('test');
      expect(window.tasks.length).toBe(1);
      expect(task.text).toBe('test');
    });

    it('styling classes are applied correctly', () => {
      window.tasks = [{ id: 1, text: 'test', done: true }];
      window.displayTasks();

      const taskItem = document.querySelector('.task-item');
      expect(taskItem.classList.contains('done')).toBe(true);
    });
  });
});
