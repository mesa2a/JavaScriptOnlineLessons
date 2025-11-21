/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('レッスン133: スコープとクロージャ', () => {
  let makeCounter, createCounter, makeAdder, makeMultiplier, createPerson, createBankAccount, createTaskManager;

  beforeAll(() => {
    const scriptPath = path.join(__dirname, 'script.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

    document.body.innerHTML = `
      <div id="scopeOutput"></div>
      <div id="closureBasicOutput"></div>
      <div id="counterDisplay">0</div>
      <div id="factoryOutput"></div>
      <div id="privateOutput"></div>
      <div id="accountDisplay"></div>
      <input id="amountInput">
      <div id="taskList"></div>
      <input id="taskInput">
    `;

    global.console.log = jest.fn();
    global.alert = jest.fn();

    eval(scriptContent);

    makeCounter = eval('makeCounter');
    createCounter = eval('createCounter');
    makeAdder = eval('makeAdder');
    makeMultiplier = eval('makeMultiplier');
    createPerson = eval('createPerson');
    createBankAccount = eval('createBankAccount');
    createTaskManager = eval('createTaskManager');
  });

  describe('クロージャの基本', () => {
    test('makeCounterが関数を返す', () => {
      const counter = makeCounter();
      expect(typeof counter).toBe('function');
    });

    test('返された関数は呼び出すたびにインクリメントする', () => {
      const counter = makeCounter();
      expect(counter()).toBe(1);
      expect(counter()).toBe(2);
      expect(counter()).toBe(3);
    });

    test('各カウンターは独立している', () => {
      const counter1 = makeCounter();
      const counter2 = makeCounter();

      counter1();
      counter1();
      expect(counter1()).toBe(3);
      expect(counter2()).toBe(1);
    });
  });

  describe('カウンターオブジェクト', () => {
    test('createCounterがオブジェクトを返す', () => {
      const counter = createCounter();
      expect(typeof counter).toBe('object');
      expect(typeof counter.increment).toBe('function');
      expect(typeof counter.decrement).toBe('function');
      expect(typeof counter.getCount).toBe('function');
    });

    test('incrementメソッドが正しく動作する', () => {
      const counter = createCounter();
      expect(counter.increment()).toBe(1);
      expect(counter.increment()).toBe(2);
    });

    test('decrementメソッドが正しく動作する', () => {
      const counter = createCounter();
      counter.increment();
      counter.increment();
      expect(counter.decrement()).toBe(1);
    });

    test('getCountメソッドが現在の値を返す', () => {
      const counter = createCounter();
      expect(counter.getCount()).toBe(0);
      counter.increment();
      expect(counter.getCount()).toBe(1);
    });
  });

  describe('関数ファクトリー', () => {
    test('makeAdderが正しく動作する', () => {
      const add5 = makeAdder(5);
      expect(add5(3)).toBe(8);
      expect(add5(10)).toBe(15);
    });

    test('異なる引数で作成したadderは独立している', () => {
      const add5 = makeAdder(5);
      const add10 = makeAdder(10);
      expect(add5(3)).toBe(8);
      expect(add10(3)).toBe(13);
    });

    test('makeMultiplierが正しく動作する', () => {
      const double = makeMultiplier(2);
      expect(double(5)).toBe(10);
      expect(double(7)).toBe(14);
    });

    test('異なる引数で作成したmultiplierは独立している', () => {
      const double = makeMultiplier(2);
      const triple = makeMultiplier(3);
      expect(double(5)).toBe(10);
      expect(triple(5)).toBe(15);
    });
  });

  describe('プライベート変数', () => {
    test('createPersonがオブジェクトを返す', () => {
      const person = createPerson('太郎');
      expect(typeof person).toBe('object');
      expect(typeof person.getName).toBe('function');
      expect(typeof person.getAge).toBe('function');
      expect(typeof person.birthday).toBe('function');
    });

    test('getNameが名前を返す', () => {
      const person = createPerson('太郎');
      expect(person.getName()).toBe('太郎');
    });

    test('初期年齢は0', () => {
      const person = createPerson('太郎');
      expect(person.getAge()).toBe(0);
    });

    test('birthdayメソッドが年齢を増やす', () => {
      const person = createPerson('太郎');
      expect(person.birthday()).toBe(1);
      expect(person.birthday()).toBe(2);
      expect(person.getAge()).toBe(2);
    });

    test('ageに直接アクセスできない', () => {
      const person = createPerson('太郎');
      expect(person.age).toBeUndefined();
    });
  });

  describe('銀行口座', () => {
    test('createBankAccountがオブジェクトを返す', () => {
      const account = createBankAccount(1000);
      expect(typeof account).toBe('object');
      expect(typeof account.deposit).toBe('function');
      expect(typeof account.withdraw).toBe('function');
      expect(typeof account.getBalance).toBe('function');
    });

    test('初期残高が正しく設定される', () => {
      const account = createBankAccount(1000);
      expect(account.getBalance()).toBe(1000);
    });

    test('入金が正しく動作する', () => {
      const account = createBankAccount(1000);
      const result = account.deposit(500);
      expect(result.success).toBe(true);
      expect(account.getBalance()).toBe(1500);
    });

    test('出金が正しく動作する', () => {
      const account = createBankAccount(1000);
      const result = account.withdraw(300);
      expect(result.success).toBe(true);
      expect(account.getBalance()).toBe(700);
    });

    test('残高を超える出金はできない', () => {
      const account = createBankAccount(1000);
      const result = account.withdraw(1500);
      expect(result.success).toBe(false);
      expect(account.getBalance()).toBe(1000);
    });

    test('負の金額の入金はできない', () => {
      const account = createBankAccount(1000);
      const result = account.deposit(-100);
      expect(result.success).toBe(false);
    });

    test('balanceに直接アクセスできない', () => {
      const account = createBankAccount(1000);
      expect(account.balance).toBeUndefined();
    });
  });

  describe('タスク管理', () => {
    test('createTaskManagerがオブジェクトを返す', () => {
      const manager = createTaskManager();
      expect(typeof manager).toBe('object');
      expect(typeof manager.addTask).toBe('function');
      expect(typeof manager.completeTask).toBe('function');
      expect(typeof manager.getTasks).toBe('function');
    });

    test('タスクを追加できる', () => {
      const manager = createTaskManager();
      manager.addTask('買い物');
      const tasks = manager.getTasks();
      expect(tasks.length).toBe(1);
      expect(tasks[0].name).toBe('買い物');
      expect(tasks[0].completed).toBe(false);
    });

    test('タスクに自動的にIDが割り当てられる', () => {
      const manager = createTaskManager();
      manager.addTask('タスク1');
      manager.addTask('タスク2');
      const tasks = manager.getTasks();
      expect(tasks[0].id).toBe(1);
      expect(tasks[1].id).toBe(2);
    });

    test('タスクを完了できる', () => {
      const manager = createTaskManager();
      manager.addTask('買い物');
      manager.completeTask(1);
      const tasks = manager.getTasks();
      expect(tasks[0].completed).toBe(true);
    });

    test('複数のタスクを管理できる', () => {
      const manager = createTaskManager();
      manager.addTask('買い物');
      manager.addTask('宿題');
      manager.addTask('掃除');
      expect(manager.getTasks().length).toBe(3);
    });

    test('tasksに直接アクセスできない', () => {
      const manager = createTaskManager();
      expect(manager.tasks).toBeUndefined();
    });
  });

  describe('クロージャの独立性', () => {
    test('複数のカウンターは独立している', () => {
      const c1 = createCounter();
      const c2 = createCounter();

      c1.increment();
      c1.increment();
      c2.increment();

      expect(c1.getCount()).toBe(2);
      expect(c2.getCount()).toBe(1);
    });

    test('複数の銀行口座は独立している', () => {
      const acc1 = createBankAccount(1000);
      const acc2 = createBankAccount(2000);

      acc1.deposit(500);
      acc2.withdraw(500);

      expect(acc1.getBalance()).toBe(1500);
      expect(acc2.getBalance()).toBe(1500);
    });
  });
});
