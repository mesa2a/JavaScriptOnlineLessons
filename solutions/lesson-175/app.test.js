/**
 * レッスン175: ToDoリスト アプリケーション
 * テスト
 */

import { describe, it, expect, beforeEach } from 'vitest';

describe('レッスン175: ToDoリスト アプリケーション', () => {

  // テスト用のtoDoAppオブジェクトを作成
  function createTodoApp() {
    return {
      tasks: [],
      nextId: 1,
      currentFilter: 'all',

      addTask: function(title, priority, dueDate) {
        if (!title || title.trim() === '') {
          return false;
        }

        var newTask = {
          id: this.nextId++,
          title: title.trim(),
          completed: false,
          priority: priority || 'medium',
          dueDate: dueDate || null,
          createdAt: new Date().toISOString()
        };

        this.tasks.push(newTask);
        return true;
      },

      removeTask: function(id) {
        for (var i = 0; i < this.tasks.length; i++) {
          if (this.tasks[i].id === id) {
            this.tasks.splice(i, 1);
            return true;
          }
        }
        return false;
      },

      toggleTask: function(id) {
        for (var i = 0; i < this.tasks.length; i++) {
          if (this.tasks[i].id === id) {
            this.tasks[i].completed = !this.tasks[i].completed;
            return true;
          }
        }
        return false;
      },

      getFilteredTasks: function() {
        var filter = this.currentFilter;

        if (filter === 'all') {
          return this.tasks;
        } else if (filter === 'active') {
          return this.tasks.filter(function(task) {
            return !task.completed;
          });
        } else if (filter === 'completed') {
          return this.tasks.filter(function(task) {
            return task.completed;
          });
        }

        return this.tasks;
      }
    };
  }

  describe('タスクの追加', () => {
    it('タスクを正しく追加できる', () => {
      const app = createTodoApp();
      const result = app.addTask('新しいタスク', 'medium', null);

      expect(result).toBe(true);
      expect(app.tasks.length).toBe(1);
      expect(app.tasks[0].title).toBe('新しいタスク');
      expect(app.tasks[0].completed).toBe(false);
    });

    it('IDが自動的に採番される', () => {
      const app = createTodoApp();
      app.addTask('タスク1');
      app.addTask('タスク2');

      expect(app.tasks[0].id).toBe(1);
      expect(app.tasks[1].id).toBe(2);
      expect(app.nextId).toBe(3);
    });

    it('空のタイトルは追加できない', () => {
      const app = createTodoApp();
      const result = app.addTask('', 'medium', null);

      expect(result).toBe(false);
      expect(app.tasks.length).toBe(0);
    });

    it('タイトルの前後の空白は削除される', () => {
      const app = createTodoApp();
      app.addTask('  タスク  ', 'medium', null);

      expect(app.tasks[0].title).toBe('タスク');
    });

    it('優先度が設定される', () => {
      const app = createTodoApp();
      app.addTask('タスク', 'high', null);

      expect(app.tasks[0].priority).toBe('high');
    });

    it('優先度が指定されない場合はmediumになる', () => {
      const app = createTodoApp();
      app.addTask('タスク');

      expect(app.tasks[0].priority).toBe('medium');
    });

    it('期限が設定される', () => {
      const app = createTodoApp();
      app.addTask('タスク', 'medium', '2024-12-31');

      expect(app.tasks[0].dueDate).toBe('2024-12-31');
    });

    it('作成日時が設定される', () => {
      const app = createTodoApp();
      app.addTask('タスク');

      expect(app.tasks[0].createdAt).toBeDefined();
      expect(typeof app.tasks[0].createdAt).toBe('string');
    });
  });

  describe('タスクの削除', () => {
    it('タスクを正しく削除できる', () => {
      const app = createTodoApp();
      app.addTask('タスク1');
      app.addTask('タスク2');

      const result = app.removeTask(1);

      expect(result).toBe(true);
      expect(app.tasks.length).toBe(1);
      expect(app.tasks[0].id).toBe(2);
    });

    it('存在しないIDの削除はfalseを返す', () => {
      const app = createTodoApp();
      app.addTask('タスク');

      const result = app.removeTask(999);

      expect(result).toBe(false);
      expect(app.tasks.length).toBe(1);
    });
  });

  describe('タスクの完了切り替え', () => {
    it('タスクの完了状態を切り替えられる', () => {
      const app = createTodoApp();
      app.addTask('タスク');

      expect(app.tasks[0].completed).toBe(false);

      app.toggleTask(1);
      expect(app.tasks[0].completed).toBe(true);

      app.toggleTask(1);
      expect(app.tasks[0].completed).toBe(false);
    });

    it('存在しないIDの切り替えはfalseを返す', () => {
      const app = createTodoApp();
      app.addTask('タスク');

      const result = app.toggleTask(999);

      expect(result).toBe(false);
    });
  });

  describe('タスクのフィルタリング', () => {
    beforeEach(() => {
      // 各テストの前に新しいappを作成しない
    });

    it('全てのフィルターで全タスクを返す', () => {
      const app = createTodoApp();
      app.addTask('タスク1');
      app.addTask('タスク2');
      app.toggleTask(1); // タスク1を完了

      app.currentFilter = 'all';
      const filtered = app.getFilteredTasks();

      expect(filtered.length).toBe(2);
    });

    it('activeフィルターで未完了タスクのみ返す', () => {
      const app = createTodoApp();
      app.addTask('タスク1');
      app.addTask('タスク2');
      app.addTask('タスク3');
      app.toggleTask(1); // タスク1を完了

      app.currentFilter = 'active';
      const filtered = app.getFilteredTasks();

      expect(filtered.length).toBe(2);
      expect(filtered[0].completed).toBe(false);
      expect(filtered[1].completed).toBe(false);
    });

    it('completedフィルターで完了タスクのみ返す', () => {
      const app = createTodoApp();
      app.addTask('タスク1');
      app.addTask('タスク2');
      app.addTask('タスク3');
      app.toggleTask(1); // タスク1を完了
      app.toggleTask(2); // タスク2を完了

      app.currentFilter = 'completed';
      const filtered = app.getFilteredTasks();

      expect(filtered.length).toBe(2);
      expect(filtered[0].completed).toBe(true);
      expect(filtered[1].completed).toBe(true);
    });
  });

  describe('複雑なシナリオ', () => {
    it('複数のタスクを追加、完了、削除できる', () => {
      const app = createTodoApp();

      // タスクを追加
      app.addTask('買い物', 'high', '2024-12-25');
      app.addTask('掃除', 'medium', null);
      app.addTask('勉強', 'low', '2024-12-31');

      expect(app.tasks.length).toBe(3);

      // タスクを完了
      app.toggleTask(2);
      expect(app.tasks[1].completed).toBe(true);

      // タスクを削除
      app.removeTask(1);
      expect(app.tasks.length).toBe(2);
      expect(app.tasks[0].id).toBe(2);
      expect(app.tasks[1].id).toBe(3);
    });

    it('フィルタリングと完了状態の組み合わせ', () => {
      const app = createTodoApp();

      app.addTask('タスク1', 'high', null);
      app.addTask('タスク2', 'medium', null);
      app.addTask('タスク3', 'low', null);
      app.addTask('タスク4', 'high', null);

      // 2つのタスクを完了
      app.toggleTask(1);
      app.toggleTask(3);

      // 未完了タスクをフィルタリング
      app.currentFilter = 'active';
      var active = app.getFilteredTasks();
      expect(active.length).toBe(2);

      // 完了タスクをフィルタリング
      app.currentFilter = 'completed';
      var completed = app.getFilteredTasks();
      expect(completed.length).toBe(2);

      // 全タスクをフィルタリング
      app.currentFilter = 'all';
      var all = app.getFilteredTasks();
      expect(all.length).toBe(4);
    });

    it('タスクの追加と削除を繰り返してもIDが正しく管理される', () => {
      const app = createTodoApp();

      app.addTask('タスク1');
      app.addTask('タスク2');
      app.removeTask(1);
      app.addTask('タスク3');

      expect(app.tasks.length).toBe(2);
      expect(app.tasks[0].id).toBe(2);
      expect(app.tasks[1].id).toBe(3);
      expect(app.nextId).toBe(4);
    });
  });

  describe('エッジケース', () => {
    it('空の配列でフィルタリングしても動作する', () => {
      const app = createTodoApp();

      app.currentFilter = 'all';
      expect(app.getFilteredTasks().length).toBe(0);

      app.currentFilter = 'active';
      expect(app.getFilteredTasks().length).toBe(0);

      app.currentFilter = 'completed';
      expect(app.getFilteredTasks().length).toBe(0);
    });

    it('すべてのタスクが完了している場合', () => {
      const app = createTodoApp();
      app.addTask('タスク1');
      app.addTask('タスク2');
      app.toggleTask(1);
      app.toggleTask(2);

      app.currentFilter = 'active';
      expect(app.getFilteredTasks().length).toBe(0);

      app.currentFilter = 'completed';
      expect(app.getFilteredTasks().length).toBe(2);
    });

    it('すべてのタスクが未完了の場合', () => {
      const app = createTodoApp();
      app.addTask('タスク1');
      app.addTask('タスク2');

      app.currentFilter = 'active';
      expect(app.getFilteredTasks().length).toBe(2);

      app.currentFilter = 'completed';
      expect(app.getFilteredTasks().length).toBe(0);
    });
  });
});
