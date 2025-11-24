import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('lesson 150 solution', () => {
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

  afterEach(() => {
    if (window && window.localStorage) {
      window.localStorage.clear();
    }
  });

  describe('localStorage functions', () => {
    it('saveTasks function exists', () => {
      expect(typeof window.saveTasks).toBe('function');
    });

    it('loadTasks function exists', () => {
      expect(typeof window.loadTasks).toBe('function');
    });

    it('saveTasks saves data to localStorage', () => {
      window.tasks = [{ id: 1, text: 'test', done: false }];
      window.taskIdCounter = 2;

      window.saveTasks();

      const saved = window.localStorage.getItem('todoApp');
      expect(saved).toBeTruthy();

      const data = JSON.parse(saved);
      expect(data.tasks.length).toBe(1);
      expect(data.taskIdCounter).toBe(2);
    });

    it('loadTasks restores data from localStorage', () => {
      const testData = {
        tasks: [{ id: 1, text: 'test', done: false }],
        taskIdCounter: 2
      };
      window.localStorage.setItem('todoApp', JSON.stringify(testData));

      window.loadTasks();

      expect(window.tasks.length).toBe(1);
      expect(window.tasks[0].text).toBe('test');
      expect(window.taskIdCounter).toBe(2);
    });

    it('loadTasks handles missing data', () => {
      window.localStorage.removeItem('todoApp');

      window.loadTasks();

      expect(window.tasks.length).toBe(0);
      expect(window.taskIdCounter).toBe(1);
    });

    it('loadTasks handles invalid JSON', () => {
      window.localStorage.setItem('todoApp', 'invalid json');

      window.loadTasks();

      expect(window.tasks.length).toBe(0);
      expect(window.taskIdCounter).toBe(1);
    });
  });

  describe('integration with CRUD operations', () => {
    it('addTask automatically saves', () => {
      window.addTask('test task');

      const saved = window.localStorage.getItem('todoApp');
      const data = JSON.parse(saved);
      expect(data.tasks.length).toBe(1);
    });

    it('deleteTask automatically saves', () => {
      window.tasks = [
        { id: 1, text: 'task1', done: false },
        { id: 2, text: 'task2', done: false }
      ];
      window.saveTasks();

      window.deleteTask(1);

      const saved = window.localStorage.getItem('todoApp');
      const data = JSON.parse(saved);
      expect(data.tasks.length).toBe(1);
    });

    it('toggleTask automatically saves', () => {
      window.tasks = [{ id: 1, text: 'task', done: false }];
      window.saveTasks();

      window.toggleTask(1);

      const saved = window.localStorage.getItem('todoApp');
      const data = JSON.parse(saved);
      expect(data.tasks[0].done).toBe(true);
    });
  });
});
