# レッスン133: スコープとクロージャ

## このレッスンで学ぶこと

- スコープとは何か
- グローバルスコープとローカルスコープ
- クロージャの仕組み
- クロージャの実践的な活用

## スコープとは

スコープとは、変数や関数が参照できる範囲のことです。JavaScriptには主に2つのスコープがあります。

### グローバルスコープ

プログラム全体からアクセスできる範囲です。

```javascript
const globalValue = 'グローバル';

const showGlobal = function() {
  console.log(globalValue); // グローバル変数にアクセスできる
};

showGlobal(); // => 'グローバル'
console.log(globalValue); // => 'グローバル'
```

### ローカルスコープ（関数スコープ）

関数の内部でのみアクセスできる範囲です。

```javascript
const myFunction = function() {
  const localValue = 'ローカル';
  console.log(localValue); // => 'ローカル'
};

myFunction();
console.log(localValue); // エラー: localValueは定義されていない
```

## スコープの階層

内側のスコープから外側のスコープの変数にはアクセスできますが、逆はできません。

```javascript
const outer = '外側';

const outerFunction = function() {
  const middle = '中間';

  const innerFunction = function() {
    const inner = '内側';

    console.log(outer);  // => '外側' （アクセス可能）
    console.log(middle); // => '中間' （アクセス可能）
    console.log(inner);  // => '内側' （アクセス可能）
  };

  innerFunction();
  console.log(outer);  // => '外側' （アクセス可能）
  console.log(middle); // => '中間' （アクセス可能）
  // console.log(inner); // エラー（アクセス不可）
};

outerFunction();
```

## クロージャとは

クロージャは、関数が定義されたときのスコープを「記憶」する仕組みです。関数が外側の変数にアクセスし続けることができます。

### 基本的なクロージャ

```javascript
const makeCounter = function() {
  let count = 0; // プライベート変数

  return function() {
    count = count + 1;
    return count;
  };
};

const counter = makeCounter();
console.log(counter()); // => 1
console.log(counter()); // => 2
console.log(counter()); // => 3
```

`count`変数は`makeCounter`関数の中で定義されていますが、返された関数（クロージャ）からアクセスできます。

## クロージャの実践例

### 例1: カウンター

```javascript
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

const counter = createCounter();
console.log(counter.increment()); // => 1
console.log(counter.increment()); // => 2
console.log(counter.decrement()); // => 1
console.log(counter.getCount());  // => 1
```

### 例2: プライベート変数

```javascript
const createPerson = function(name) {
  let age = 0; // プライベート変数（外部から直接アクセスできない）

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
console.log(person.getName());   // => '太郎'
console.log(person.getAge());    // => 0
console.log(person.birthday());  // => 1
console.log(person.birthday());  // => 2
console.log(person.age);         // => undefined（直接アクセスできない）
```

### 例3: 関数ファクトリー

```javascript
const makeAdder = function(x) {
  return function(y) {
    return x + y;
  };
};

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(3));  // => 8  (5 + 3)
console.log(add10(3)); // => 13 (10 + 3)
console.log(add5(7));  // => 12 (5 + 7)
```

### 例4: 乗数ファクトリー

```javascript
const makeMultiplier = function(multiplier) {
  return function(number) {
    return number * multiplier;
  };
};

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(double(5)); // => 10
console.log(triple(5)); // => 15
console.log(double(7)); // => 14
```

## クロージャのメリット

### 1. データの隠蔽（カプセル化）

外部から直接アクセスできない変数を作ることができます。

```javascript
const createBankAccount = function(initialBalance) {
  let balance = initialBalance; // プライベート変数

  return {
    deposit: function(amount) {
      if (amount > 0) {
        balance = balance + amount;
        return balance;
      }
      return '入金額は0より大きい必要があります';
    },
    withdraw: function(amount) {
      if (amount > 0 && amount <= balance) {
        balance = balance - amount;
        return balance;
      }
      return '引き出しできません';
    },
    getBalance: function() {
      return balance;
    }
  };
};

const account = createBankAccount(1000);
console.log(account.getBalance()); // => 1000
console.log(account.deposit(500)); // => 1500
console.log(account.withdraw(300)); // => 1200
console.log(account.balance); // => undefined（直接アクセスできない）
```

### 2. 状態の保持

関数の呼び出しをまたいで値を保持できます。

```javascript
const createTimer = function() {
  let startTime = null;

  return {
    start: function() {
      startTime = Date.now();
    },
    getElapsed: function() {
      if (startTime === null) {
        return 0;
      }
      return Date.now() - startTime;
    }
  };
};

const timer = createTimer();
timer.start();
// 時間が経過...
console.log(timer.getElapsed()); // 経過時間（ミリ秒）
```

## クロージャの注意点

### ループとクロージャ

```javascript
// 問題のあるコード
const createFunctions = function() {
  const functions = [];

  for (var i = 0; i < 3; i++) {
    functions.push(function() {
      return i; // すべて3を返してしまう
    });
  }

  return functions;
};

const funcs = createFunctions();
console.log(funcs[0]()); // => 3（期待: 0）
console.log(funcs[1]()); // => 3（期待: 1）
console.log(funcs[2]()); // => 3（期待: 2）

// 解決方法1: letを使う
const createFunctions = function() {
  const functions = [];

  for (let i = 0; i < 3; i++) { // letを使う
    functions.push(function() {
      return i;
    });
  }

  return functions;
};

// 解決方法2: 即座に実行する関数を使う
const createFunctions = function() {
  const functions = [];

  for (var i = 0; i < 3; i++) {
    functions.push((function(num) {
      return function() {
        return num;
      };
    })(i));
  }

  return functions;
};
```

## 実践例: タスク管理

```javascript
const createTaskManager = function() {
  const tasks = []; // プライベート配列

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
      // 配列のコピーを返す（元の配列を保護）
      return tasks.map(task => ({ ...task }));
    },

    getCompletedTasks: function() {
      return tasks.filter(task => task.completed);
    }
  };
};

const manager = createTaskManager();
manager.addTask('買い物に行く');
manager.addTask('宿題をする');
manager.addTask('掃除する');
manager.completeTask(1);

console.log(manager.getTasks());
// => [
//   { id: 1, name: '買い物に行く', completed: true },
//   { id: 2, name: '宿題をする', completed: false },
//   { id: 3, name: '掃除する', completed: false }
// ]
```

## まとめ

このレッスンで学んだこと:

1. **スコープ**: 変数や関数が参照できる範囲
   - グローバルスコープ: プログラム全体
   - ローカルスコープ: 関数内部

2. **スコープの階層**: 内側から外側は見えるが、外側から内側は見えない

3. **クロージャ**: 関数が定義されたときのスコープを記憶する仕組み

4. **クロージャの利点**:
   - データの隠蔽（プライベート変数）
   - 状態の保持
   - 関数ファクトリー

5. **実践的な使い方**:
   - カウンター
   - プライベート変数を持つオブジェクト
   - 銀行口座などの状態管理

クロージャを理解することで、より高度で安全なプログラムを書くことができます。
