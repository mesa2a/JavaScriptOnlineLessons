/**
 * レッスン172: オブジェクトと関数の復習
 * 解答
 */

// ========================================
// 問題1: ユーザーオブジェクトの作成
// ========================================

function createUser(name, age, email) {
  return {
    name: name,
    age: age,
    email: email
  };
}

// テスト
console.log('問題1: ユーザーオブジェクト');
var user1 = createUser('田中', 25, 'tanaka@example.com');
console.log(user1);
// { name: '田中', age: 25, email: 'tanaka@example.com' }

// ========================================
// 問題2: オブジェクトのプロパティ取得
// ========================================

function getValue(obj, key) {
  return obj[key];
}

// テスト
console.log('問題2: プロパティ取得');
var person = { name: '田中', age: 25, city: '東京' };
console.log(getValue(person, 'name')); // '田中'
console.log(getValue(person, 'age'));  // 25
console.log(getValue(person, 'email'));// undefined

// ========================================
// 問題3: オブジェクトのマージ
// ========================================

function mergeObjects(obj1, obj2) {
  var result = {};

  // obj1のプロパティをコピー
  for (var key in obj1) {
    result[key] = obj1[key];
  }

  // obj2のプロパティをコピー（上書き）
  for (var key in obj2) {
    result[key] = obj2[key];
  }

  return result;
}

// テスト
console.log('問題3: オブジェクトのマージ');
var defaults = { color: 'blue', size: 'medium', quantity: 1 };
var options = { color: 'red', quantity: 3 };
var merged = mergeObjects(defaults, options);
console.log(merged);
// { color: 'red', size: 'medium', quantity: 3 }

// ========================================
// 問題4: 計算機オブジェクト
// ========================================

function createCalculator(initialValue) {
  return {
    value: initialValue || 0,

    add: function(num) {
      this.value += num;
      return this.value;
    },

    subtract: function(num) {
      this.value -= num;
      return this.value;
    },

    multiply: function(num) {
      this.value *= num;
      return this.value;
    },

    divide: function(num) {
      if (num === 0) {
        console.log('エラー: 0で割ることはできません');
        return this.value;
      }
      this.value /= num;
      return this.value;
    },

    getValue: function() {
      return this.value;
    },

    reset: function() {
      this.value = 0;
      return this.value;
    }
  };
}

// テスト
console.log('問題4: 計算機オブジェクト');
var calc = createCalculator(10);
console.log(calc.add(5));      // 15
console.log(calc.subtract(3)); // 12
console.log(calc.multiply(2)); // 24
console.log(calc.divide(4));   // 6
console.log(calc.getValue());  // 6
calc.reset();
console.log(calc.getValue());  // 0

// ========================================
// 問題5: 配列をオブジェクトに変換
// ========================================

function arrayToObject(arr) {
  var obj = {};

  for (var i = 0; i < arr.length; i++) {
    var key = arr[i][0];
    var value = arr[i][1];
    obj[key] = value;
  }

  return obj;
}

// テスト
console.log('問題5: 配列をオブジェクトに変換');
var pairs = [['name', '田中'], ['age', 25], ['city', '東京']];
var obj = arrayToObject(pairs);
console.log(obj);
// { name: '田中', age: 25, city: '東京' }

// ========================================
// 問題6: カウンタークロージャ
// ========================================

function createCounter() {
  var count = 0;

  return {
    increment: function() {
      count++;
      return count;
    },

    decrement: function() {
      count--;
      return count;
    },

    getCount: function() {
      return count;
    }
  };
}

// テスト
console.log('問題6: カウンタークロージャ');
var counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount());  // 1

// ========================================
// チャレンジ1: 商品管理システム
// ========================================

function createProduct(name, price, stock) {
  return {
    name: name,
    price: price,
    stock: stock,

    isAvailable: function() {
      return this.stock > 0;
    },

    calculateTotal: function(quantity) {
      return this.price * quantity;
    },

    sell: function(quantity) {
      if (quantity > this.stock) {
        console.log('在庫不足: ' + this.name);
        return false;
      }
      this.stock -= quantity;
      return true;
    },

    restock: function(quantity) {
      this.stock += quantity;
    },

    getInfo: function() {
      return this.name + ' - 価格: ' + this.price + '円, 在庫: ' + this.stock + '個';
    }
  };
}

// テスト
console.log('チャレンジ1: 商品管理システム');
var laptop = createProduct('ノートPC', 100000, 5);
console.log(laptop.isAvailable());      // true
console.log(laptop.calculateTotal(2));  // 200000
console.log(laptop.sell(3));            // true
console.log(laptop.stock);              // 2
console.log(laptop.sell(5));            // false
laptop.restock(10);
console.log(laptop.stock);              // 12
console.log(laptop.getInfo());          // 'ノートPC - 価格: 100000円, 在庫: 12個'

// ========================================
// チャレンジ2: ユーザー管理システム
// ========================================

function createUserManager() {
  var users = [];

  return {
    addUser: function(user) {
      users.push(user);
    },

    getUser: function(id) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === id) {
          return users[i];
        }
      }
      return null;
    },

    updateUser: function(id, updates) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === id) {
          for (var key in updates) {
            users[i][key] = updates[key];
          }
          return true;
        }
      }
      return false;
    },

    deleteUser: function(id) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === id) {
          users.splice(i, 1);
          return true;
        }
      }
      return false;
    },

    getAllUsers: function() {
      return users.slice(); // コピーを返す
    },

    getUserCount: function() {
      return users.length;
    }
  };
}

// テスト
console.log('チャレンジ2: ユーザー管理システム');
var userManager = createUserManager();

userManager.addUser({ id: 1, name: '田中', email: 'tanaka@example.com' });
userManager.addUser({ id: 2, name: '佐藤', email: 'sato@example.com' });
userManager.addUser({ id: 3, name: '鈴木', email: 'suzuki@example.com' });

console.log(userManager.getUserCount()); // 3
console.log(userManager.getUser(2));     // { id: 2, name: '佐藤', email: 'sato@example.com' }

userManager.updateUser(2, { email: 'sato-new@example.com' });
console.log(userManager.getUser(2).email); // 'sato-new@example.com'

userManager.deleteUser(1);
console.log(userManager.getUserCount()); // 2

var allUsers = userManager.getAllUsers();
console.log(allUsers.length); // 2

// ========================================
// チャレンジ3: データ変換パイプライン
// ========================================

function pipe(value, functions) {
  var result = value;

  for (var i = 0; i < functions.length; i++) {
    result = functions[i](result);
  }

  return result;
}

// テスト用の関数
function double(n) {
  return n * 2;
}

function addTen(n) {
  return n + 10;
}

function square(n) {
  return n * n;
}

// テスト
console.log('チャレンジ3: データ変換パイプライン');
var result = pipe(5, [double, addTen, square]);
console.log(result); // ((5 * 2) + 10) ^ 2 = 400

// 別の例
var result2 = pipe(3, [double, square]);
console.log(result2); // (3 * 2) ^ 2 = 36

// ========================================
// 補足: より高度なパターン
// ========================================

// 問題4の別解: メソッドチェーン対応
function createChainableCalculator(initialValue) {
  return {
    value: initialValue || 0,

    add: function(num) {
      this.value += num;
      return this; // 自分自身を返す
    },

    subtract: function(num) {
      this.value -= num;
      return this;
    },

    multiply: function(num) {
      this.value *= num;
      return this;
    },

    divide: function(num) {
      if (num !== 0) {
        this.value /= num;
      }
      return this;
    },

    getValue: function() {
      return this.value;
    }
  };
}

// メソッドチェーンの例
var calcChain = createChainableCalculator(10);
var finalValue = calcChain
  .add(5)
  .multiply(2)
  .subtract(10)
  .divide(2)
  .getValue();

console.log('\n補足: メソッドチェーン');
console.log(finalValue); // ((10 + 5) * 2 - 10) / 2 = 10

// チャレンジ2の別解: find()を使う方法（より現代的）
function createUserManagerModern() {
  var users = [];

  return {
    addUser: function(user) {
      users.push(user);
    },

    getUser: function(id) {
      // find() メソッドを使用（ES5互換のため手動実装）
      var found = null;
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === id) {
          found = users[i];
          break;
        }
      }
      return found;
    },

    findUsers: function(predicate) {
      var results = [];
      for (var i = 0; i < users.length; i++) {
        if (predicate(users[i])) {
          results.push(users[i]);
        }
      }
      return results;
    },

    updateUser: function(id, updates) {
      var user = this.getUser(id);
      if (user) {
        for (var key in updates) {
          user[key] = updates[key];
        }
        return true;
      }
      return false;
    },

    deleteUser: function(id) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === id) {
          users.splice(i, 1);
          return true;
        }
      }
      return false;
    },

    getAllUsers: function() {
      return users.slice();
    },

    getUserCount: function() {
      return users.length;
    }
  };
}

// チャレンジ3の別解: reduce()を使う方法
function pipeWithReduce(value, functions) {
  return functions.reduce(function(acc, fn) {
    return fn(acc);
  }, value);
}

console.log('\n補足: pipeWithReduce');
var result3 = pipeWithReduce(5, [double, addTen, square]);
console.log(result3); // 400
