# レッスン172: 苦手分野の復習（オブジェクトと関数編）

## このレッスンで学ぶこと
- オブジェクトの基本の復習
- オブジェクトの操作方法
- 関数の定義と使い方
- 関数のスコープとクロージャ
- よくあるミスと対処法
- 実践的なパターン

---

## 1. オブジェクトと関数の重要性

JavaScriptにおいて、オブジェクトと関数は最も重要な概念です。実際のアプリケーション開発では、データをオブジェクトで管理し、処理を関数で実装します。

### なぜ重要か

```javascript
// 実際の開発での使用例

// ユーザー情報をオブジェクトで管理
var user = {
  id: 1,
  name: '田中太郎',
  email: 'tanaka@example.com',
  age: 25,
  isActive: true
};

// 商品情報をオブジェクトで管理
var product = {
  id: 101,
  name: 'ノートPC',
  price: 100000,
  stock: 5,
  calculateTotal: function(quantity) {
    return this.price * quantity;
  }
};

// 関数で処理を再利用
function greetUser(user) {
  return 'こんにちは、' + user.name + 'さん';
}

console.log(greetUser(user)); // 'こんにちは、田中太郎さん'
console.log(product.calculateTotal(2)); // 200000
```

---

## 2. オブジェクトの基本

### 2.1 オブジェクトの作成

```javascript
// オブジェクトリテラル（最も一般的）
var person = {
  name: '田中',
  age: 25,
  city: '東京'
};

// 空のオブジェクト
var emptyObj = {};

// プロパティを後から追加
emptyObj.name = '佐藤';
emptyObj.age = 30;

console.log(emptyObj); // { name: '佐藤', age: 30 }
```

### 2.2 プロパティへのアクセス

```javascript
var person = {
  name: '田中',
  age: 25,
  city: '東京'
};

// ドット記法
console.log(person.name); // '田中'
console.log(person.age);  // 25

// ブラケット記法
console.log(person['name']); // '田中'
console.log(person['age']);  // 25

// 変数を使ったアクセス
var key = 'city';
console.log(person[key]); // '東京'

// 存在しないプロパティ
console.log(person.email); // undefined
```

### 2.3 プロパティの追加・更新・削除

```javascript
var person = {
  name: '田中',
  age: 25
};

// プロパティの追加
person.email = 'tanaka@example.com';
person['phone'] = '090-1234-5678';

// プロパティの更新
person.age = 26;
person['name'] = '田中太郎';

console.log(person);
// { name: '田中太郎', age: 26, email: 'tanaka@example.com', phone: '090-1234-5678' }

// プロパティの削除
delete person.phone;
console.log(person);
// { name: '田中太郎', age: 26, email: 'tanaka@example.com' }
```

### 2.4 ネストしたオブジェクト

```javascript
var user = {
  name: '田中',
  age: 25,
  address: {
    zip: '100-0001',
    city: '東京都',
    street: '千代田区1-2-3'
  },
  hobbies: ['読書', '映画', 'スポーツ']
};

// ネストしたプロパティへのアクセス
console.log(user.address.city);     // '東京都'
console.log(user.address['zip']);   // '100-0001'
console.log(user.hobbies[0]);       // '読書'

// ネストしたプロパティの更新
user.address.city = '大阪府';
user.hobbies.push('料理');

console.log(user.address.city);     // '大阪府'
console.log(user.hobbies);          // ['読書', '映画', 'スポーツ', '料理']
```

### 2.5 メソッド（オブジェクト内の関数）

```javascript
var calculator = {
  value: 0,

  add: function(num) {
    this.value += num;
    return this.value;
  },

  subtract: function(num) {
    this.value -= num;
    return this.value;
  },

  reset: function() {
    this.value = 0;
    return this.value;
  },

  getValue: function() {
    return this.value;
  }
};

calculator.add(10);      // 10
calculator.add(5);       // 15
calculator.subtract(3);  // 12
console.log(calculator.getValue()); // 12
calculator.reset();      // 0
```

---

## 3. オブジェクトの操作

### 3.1 Object.keys()

```javascript
var person = {
  name: '田中',
  age: 25,
  city: '東京'
};

// すべてのキーを取得
var keys = Object.keys(person);
console.log(keys); // ['name', 'age', 'city']

// キーをループ
Object.keys(person).forEach(function(key) {
  console.log(key + ': ' + person[key]);
});
// name: 田中
// age: 25
// city: 東京
```

### 3.2 for...in ループ

```javascript
var person = {
  name: '田中',
  age: 25,
  city: '東京'
};

for (var key in person) {
  console.log(key + ': ' + person[key]);
}
// name: 田中
// age: 25
// city: 東京
```

### 3.3 オブジェクトのコピー

```javascript
var original = {
  name: '田中',
  age: 25
};

// ❌ 参照のコピー（同じオブジェクトを指す）
var reference = original;
reference.age = 30;
console.log(original.age); // 30 （元のオブジェクトも変更される）

// ✅ 浅いコピー（シャローコピー）
var shallowCopy = {};
for (var key in original) {
  shallowCopy[key] = original[key];
}
shallowCopy.age = 35;
console.log(original.age);    // 25 （元のオブジェクトは変更されない）
console.log(shallowCopy.age); // 35

// Object.assign を使った浅いコピー
var copy = Object.assign({}, original);
```

### 3.4 オブジェクトのマージ

```javascript
var defaults = {
  color: 'blue',
  size: 'medium',
  quantity: 1
};

var userSettings = {
  color: 'red',
  quantity: 3
};

// マージ
var settings = {};
for (var key in defaults) {
  settings[key] = defaults[key];
}
for (var key in userSettings) {
  settings[key] = userSettings[key];
}

console.log(settings);
// { color: 'red', size: 'medium', quantity: 3 }
```

---

## 4. 関数の基本

### 4.1 関数の定義

```javascript
// 関数宣言
function greet(name) {
  return 'こんにちは、' + name + 'さん';
}

// 関数式
var greet2 = function(name) {
  return 'こんにちは、' + name + 'さん';
};

// 関数の呼び出し
console.log(greet('田中'));  // 'こんにちは、田中さん'
console.log(greet2('佐藤')); // 'こんにちは、佐藤さん'
```

### 4.2 パラメーターとデフォルト値

```javascript
// パラメーターなし
function sayHello() {
  return 'こんにちは';
}

// 複数のパラメーター
function add(a, b) {
  return a + b;
}

// デフォルト値（ES5の方法）
function greet(name) {
  name = name || 'ゲスト';
  return 'こんにちは、' + name + 'さん';
}

console.log(greet('田中')); // 'こんにちは、田中さん'
console.log(greet());       // 'こんにちは、ゲストさん'

// より安全なデフォルト値の設定
function multiply(a, b) {
  if (typeof b === 'undefined') {
    b = 1;
  }
  return a * b;
}

console.log(multiply(5, 3)); // 15
console.log(multiply(5));    // 5
```

### 4.3 戻り値

```javascript
// 値を返す
function add(a, b) {
  return a + b;
}

var result = add(3, 5);
console.log(result); // 8

// returnがない場合はundefinedを返す
function noReturn() {
  var x = 5;
}

console.log(noReturn()); // undefined

// 早期リターン
function checkAge(age) {
  if (age < 0) {
    return 'エラー: 年齢は0以上である必要があります';
  }

  if (age < 20) {
    return '未成年です';
  }

  return '成人です';
}

console.log(checkAge(-5));  // 'エラー: 年齢は0以上である必要があります'
console.log(checkAge(15));  // '未成年です'
console.log(checkAge(25));  // '成人です'
```

### 4.4 関数のスコープ

```javascript
// グローバルスコープ
var globalVar = 'グローバル';

function testScope() {
  // ローカルスコープ
  var localVar = 'ローカル';

  console.log(globalVar); // 'グローバル' （アクセス可能）
  console.log(localVar);  // 'ローカル'
}

testScope();
console.log(globalVar); // 'グローバル'
// console.log(localVar); // エラー！ローカル変数にはアクセスできない

// 変数のシャドーイング
var x = 10;

function shadow() {
  var x = 20; // 別の変数
  console.log(x); // 20
}

shadow();
console.log(x); // 10
```

### 4.5 クロージャ

```javascript
// クロージャの基本
function createCounter() {
  var count = 0;

  return function() {
    count++;
    return count;
  };
}

var counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// 別のカウンター
var counter2 = createCounter();
console.log(counter2()); // 1 （独立したカウンター）

// 実用的なクロージャ
function createCalculator(initialValue) {
  var value = initialValue || 0;

  return {
    add: function(num) {
      value += num;
      return value;
    },
    subtract: function(num) {
      value -= num;
      return value;
    },
    getValue: function() {
      return value;
    }
  };
}

var calc = createCalculator(10);
console.log(calc.add(5));      // 15
console.log(calc.subtract(3)); // 12
console.log(calc.getValue());  // 12
```

---

## 5. よくあるミスと対処法

### 5.1 thisの扱い

```javascript
var person = {
  name: '田中',
  greet: function() {
    return 'こんにちは、' + this.name + 'さん';
  }
};

console.log(person.greet()); // 'こんにちは、田中さん'

// ❌ thisが変わる例
var greetFunc = person.greet;
// console.log(greetFunc()); // エラーまたはundefined

// ✅ bindを使う（ES5）
var boundGreet = person.greet.bind(person);
console.log(boundGreet()); // 'こんにちは、田中さん'

// ✅ 別の変数に保存
var person2 = {
  name: '田中',
  greet: function() {
    var self = this; // thisを保存
    return function() {
      return 'こんにちは、' + self.name + 'さん';
    };
  }
};
```

### 5.2 オブジェクトの参照

```javascript
// ❌ 参照のコピー
var obj1 = { value: 10 };
var obj2 = obj1; // 同じオブジェクトを参照
obj2.value = 20;
console.log(obj1.value); // 20 （変更される）

// ✅ オブジェクトのコピー
var obj3 = { value: 10 };
var obj4 = { value: obj3.value }; // 新しいオブジェクト
obj4.value = 20;
console.log(obj3.value); // 10 （変更されない）
```

### 5.3 存在しないプロパティへのアクセス

```javascript
var person = {
  name: '田中',
  age: 25
};

// ❌ エラーになる例
// console.log(person.address.city); // エラー！

// ✅ 安全なアクセス
if (person.address) {
  console.log(person.address.city);
} else {
  console.log('住所が設定されていません');
}

// または
console.log(person.address ? person.address.city : '不明');
```

### 5.4 関数のパラメーター順序

```javascript
// ❌ パラメーターが多すぎる
function createUser(name, age, email, city, phone, country) {
  // ...
}

// 順序を間違えやすい
createUser('田中', 25, 'tokyo@example.com', '東京', '090-1234-5678', '日本');

// ✅ オブジェクトを使う
function createUser(userInfo) {
  var name = userInfo.name;
  var age = userInfo.age;
  var email = userInfo.email;
  // ...
}

createUser({
  name: '田中',
  age: 25,
  email: 'tokyo@example.com',
  city: '東京',
  phone: '090-1234-5678',
  country: '日本'
});
```

---

## 6. 実践的なパターン

### 6.1 オブジェクトの検証

```javascript
function validateUser(user) {
  var errors = [];

  if (!user.name || user.name.trim() === '') {
    errors.push('名前は必須です');
  }

  if (!user.email || !user.email.includes('@')) {
    errors.push('正しいメールアドレスを入力してください');
  }

  if (!user.age || user.age < 0 || user.age > 150) {
    errors.push('正しい年齢を入力してください');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// 使用例
var user1 = { name: '田中', email: 'tanaka@example.com', age: 25 };
var result1 = validateUser(user1);
console.log(result1); // { isValid: true, errors: [] }

var user2 = { name: '', email: 'invalid', age: -5 };
var result2 = validateUser(user2);
console.log(result2);
// { isValid: false, errors: ['名前は必須です', '正しいメールアドレスを入力してください', '正しい年齢を入力してください'] }
```

### 6.2 オブジェクトの変換

```javascript
function transformUser(apiUser) {
  return {
    id: apiUser.user_id,
    fullName: apiUser.first_name + ' ' + apiUser.last_name,
    email: apiUser.email_address,
    isActive: apiUser.status === 'active',
    createdAt: new Date(apiUser.created_timestamp)
  };
}

// 使用例
var apiUser = {
  user_id: 123,
  first_name: '太郎',
  last_name: '山田',
  email_address: 'taro@example.com',
  status: 'active',
  created_timestamp: '2025-01-01T00:00:00Z'
};

var user = transformUser(apiUser);
console.log(user);
// {
//   id: 123,
//   fullName: '太郎 山田',
//   email: 'taro@example.com',
//   isActive: true,
//   createdAt: Date object
// }
```

### 6.3 高階関数

```javascript
// 関数を返す関数
function createMultiplier(multiplier) {
  return function(num) {
    return num * multiplier;
  };
}

var double = createMultiplier(2);
var triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// 関数を受け取る関数
function repeat(times, callback) {
  for (var i = 0; i < times; i++) {
    callback(i);
  }
}

repeat(3, function(i) {
  console.log('繰り返し ' + (i + 1) + ' 回目');
});
// 繰り返し 1 回目
// 繰り返し 2 回目
// 繰り返し 3 回目
```

### 6.4 ファクトリー関数

```javascript
function createProduct(name, price, stock) {
  return {
    name: name,
    price: price,
    stock: stock,

    isAvailable: function() {
      return this.stock > 0;
    },

    calculateTotal: function(quantity) {
      if (quantity > this.stock) {
        return null; // 在庫不足
      }
      return this.price * quantity;
    },

    sell: function(quantity) {
      if (quantity > this.stock) {
        return false;
      }
      this.stock -= quantity;
      return true;
    },

    restock: function(quantity) {
      this.stock += quantity;
    }
  };
}

// 使用例
var laptop = createProduct('ノートPC', 100000, 5);
console.log(laptop.isAvailable()); // true
console.log(laptop.calculateTotal(2)); // 200000
laptop.sell(3);
console.log(laptop.stock); // 2
laptop.restock(10);
console.log(laptop.stock); // 12
```

### 6.5 モジュールパターン

```javascript
var CounterModule = (function() {
  // プライベート変数
  var count = 0;
  var maxCount = 100;

  // プライベート関数
  function validateCount(value) {
    return value >= 0 && value <= maxCount;
  }

  // パブリックAPI
  return {
    increment: function() {
      if (count < maxCount) {
        count++;
      }
      return count;
    },

    decrement: function() {
      if (count > 0) {
        count--;
      }
      return count;
    },

    reset: function() {
      count = 0;
      return count;
    },

    getCount: function() {
      return count;
    },

    setCount: function(value) {
      if (validateCount(value)) {
        count = value;
        return true;
      }
      return false;
    }
  };
})();

// 使用例
CounterModule.increment(); // 1
CounterModule.increment(); // 2
console.log(CounterModule.getCount()); // 2
CounterModule.reset(); // 0
CounterModule.setCount(50); // true
console.log(CounterModule.getCount()); // 50
```

---

## 7. 実践問題のヒント

### 問題の解き方

1. **オブジェクトを作成する**
   - 必要なプロパティを洗い出す
   - メソッドが必要か考える

2. **関数を設計する**
   - 入力（パラメーター）は何か
   - 出力（戻り値）は何か
   - どんな処理が必要か

3. **エラーハンドリング**
   - 不正な入力をチェック
   - 早期リターンを使う

4. **再利用性を考える**
   - 汎用的な関数にする
   - パラメーターで柔軟に対応

---

## まとめ

このレッスンでは、オブジェクトと関数について復習しました：

1. **オブジェクトの基本**
   - オブジェクトリテラル
   - プロパティのアクセス（ドット記法、ブラケット記法）
   - プロパティの追加・更新・削除
   - メソッド

2. **オブジェクトの操作**
   - Object.keys()
   - for...in ループ
   - オブジェクトのコピー
   - オブジェクトのマージ

3. **関数の基本**
   - 関数の定義（宣言、式）
   - パラメーターとデフォルト値
   - 戻り値
   - スコープ
   - クロージャ

4. **よくあるミス**
   - thisの扱い
   - オブジェクトの参照
   - 存在しないプロパティへのアクセス
   - 関数のパラメーター順序

5. **実践パターン**
   - オブジェクトの検証
   - オブジェクトの変換
   - 高階関数
   - ファクトリー関数
   - モジュールパターン

オブジェクトと関数を理解することで、より複雑なアプリケーションを作れるようになります。しっかり復習して、実践で使えるようになりましょう！
