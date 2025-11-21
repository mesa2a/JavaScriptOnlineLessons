// ========================================
// 1. スコープの基本
// ========================================
const globalValue = 'グローバル';

const demonstrateScope = function() {
  const localValue = 'ローカル';

  const inner = function() {
    const innerValue = '内側';
    return `${globalValue}, ${localValue}, ${innerValue}`;
  };

  return inner();
};

let output1 = '=== スコープの基本 ===\n\n';
output1 += 'グローバル変数: ' + globalValue + '\n';
output1 += '関数内からのアクセス: ' + demonstrateScope() + '\n';

document.getElementById('scopeOutput').textContent = output1;

// ========================================
// 2. クロージャの基本
// ========================================
const makeCounter = function() {
  let count = 0;

  return function() {
    count = count + 1;
    return count;
  };
};

const counter1 = makeCounter();
const counter2 = makeCounter();

let output2 = '=== クロージャの基本 ===\n\n';
output2 += 'カウンター1:\n';
output2 += '  1回目: ' + counter1() + '\n';
output2 += '  2回目: ' + counter1() + '\n';
output2 += '  3回目: ' + counter1() + '\n\n';
output2 += 'カウンター2（独立）:\n';
output2 += '  1回目: ' + counter2() + '\n';
output2 += '  2回目: ' + counter2() + '\n';

document.getElementById('closureBasicOutput').textContent = output2;

// ========================================
// 3. カウンターのデモ
// ========================================
const createCounter = function() {
  let count = 0;

  return {
    increment: function() {
      count = count + 1;
      return count;
    },
    decrement: function() {
      count = count - 1;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
};

const demoCounter = createCounter();

const incrementCounter = function() {
  const value = demoCounter.increment();
  document.getElementById('counterDisplay').textContent = value;
};

const decrementCounter = function() {
  const value = demoCounter.decrement();
  document.getElementById('counterDisplay').textContent = value;
};

const getCounterValue = function() {
  alert('現在の値: ' + demoCounter.getCount());
};

// ========================================
// 4. 関数ファクトリー
// ========================================
const makeAdder = function(x) {
  return function(y) {
    return x + y;
  };
};

const makeMultiplier = function(multiplier) {
  return function(number) {
    return number * multiplier;
  };
};

const add5 = makeAdder(5);
const add10 = makeAdder(10);
const double = makeMultiplier(2);
const triple = makeMultiplier(3);

let output4 = '=== 関数ファクトリー ===\n\n';
output4 += 'makeAdder:\n';
output4 += '  add5(3) = ' + add5(3) + '\n';
output4 += '  add10(3) = ' + add10(3) + '\n\n';
output4 += 'makeMultiplier:\n';
output4 += '  double(5) = ' + double(5) + '\n';
output4 += '  triple(5) = ' + triple(5) + '\n';

document.getElementById('factoryOutput').textContent = output4;

// ========================================
// 5. プライベート変数
// ========================================
const createPerson = function(name) {
  let age = 0;

  return {
    getName: function() {
      return name;
    },
    getAge: function() {
      return age;
    },
    birthday: function() {
      age = age + 1;
      return age;
    }
  };
};

const person = createPerson('太郎');

let output5 = '=== プライベート変数 ===\n\n';
output5 += '名前: ' + person.getName() + '\n';
output5 += '初期年齢: ' + person.getAge() + '\n';
output5 += '誕生日: ' + person.birthday() + '歳\n';
output5 += '誕生日: ' + person.birthday() + '歳\n';
output5 += '現在の年齢: ' + person.getAge() + '歳\n';
output5 += '直接アクセス: ' + person.age + ' (undefined)';

document.getElementById('privateOutput').textContent = output5;

// ========================================
// 6. 銀行口座のデモ
// ========================================
const createBankAccount = function(initialBalance) {
  let balance = initialBalance;

  return {
    deposit: function(amount) {
      if (amount > 0) {
        balance = balance + amount;
        return { success: true, balance: balance };
      }
      return { success: false, message: '入金額は0より大きい必要があります' };
    },
    withdraw: function(amount) {
      if (amount > 0 && amount <= balance) {
        balance = balance - amount;
        return { success: true, balance: balance };
      }
      return { success: false, message: '引き出しできません' };
    },
    getBalance: function() {
      return balance;
    }
  };
};

const account = createBankAccount(10000);

const updateAccountDisplay = function() {
  document.getElementById('accountDisplay').textContent =
    '現在の残高: ¥' + account.getBalance().toLocaleString();
};

const depositMoney = function() {
  const amount = Number(document.getElementById('amountInput').value);
  const result = account.deposit(amount);

  if (result.success) {
    alert('入金しました: ¥' + amount.toLocaleString());
    updateAccountDisplay();
  } else {
    alert(result.message);
  }

  document.getElementById('amountInput').value = '';
};

const withdrawMoney = function() {
  const amount = Number(document.getElementById('amountInput').value);
  const result = account.withdraw(amount);

  if (result.success) {
    alert('出金しました: ¥' + amount.toLocaleString());
    updateAccountDisplay();
  } else {
    alert(result.message);
  }

  document.getElementById('amountInput').value = '';
};

const showBalance = function() {
  alert('現在の残高: ¥' + account.getBalance().toLocaleString());
};

updateAccountDisplay();

// ========================================
// 7. タスク管理のデモ
// ========================================
const createTaskManager = function() {
  const tasks = [];

  return {
    addTask: function(task) {
      tasks.push({
        id: tasks.length + 1,
        name: task,
        completed: false
      });
      return tasks.length;
    },

    completeTask: function(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          tasks[i].completed = true;
          return true;
        }
      }
      return false;
    },

    getTasks: function() {
      return tasks.map(task => ({ ...task }));
    }
  };
};

const taskManager = createTaskManager();

const renderTasks = function() {
  const tasks = taskManager.getTasks();
  let html = '';

  tasks.forEach(task => {
    const className = task.completed ? 'task-item completed' : 'task-item';
    html += `<div class="${className}">
      <span>${task.name}</span>
      <button onclick="completeTaskById(${task.id})">完了</button>
    </div>`;
  });

  document.getElementById('taskList').innerHTML = html;
};

const addNewTask = function() {
  const input = document.getElementById('taskInput');
  const taskName = input.value.trim();

  if (taskName) {
    taskManager.addTask(taskName);
    renderTasks();
    input.value = '';
  }
};

const completeTaskById = function(id) {
  taskManager.completeTask(id);
  renderTasks();
};

// ========================================
// コンソールにデバッグ情報を出力
// ========================================
console.log('=== レッスン133: スコープとクロージャ ===');
console.log('');

console.log('1. クロージャの基本:');
const test = makeCounter();
console.log('  ', test());
console.log('  ', test());
console.log('  ', test());
console.log('');

console.log('2. 関数ファクトリー:');
console.log('  add5(10) =', add5(10));
console.log('  double(7) =', double(7));
console.log('');

console.log('3. プライベート変数:');
console.log('  person.getName() =', person.getName());
console.log('  person.getAge() =', person.getAge());
console.log('  person.age =', person.age, '(undefined)');
