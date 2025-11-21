// ========================================
// 1. 挨拶ファクトリー
// ========================================

// 挨拶関数を作る関数
const createGreeting = function(greeting) {
  // 関数を返す
  return function(name) {
    return greeting + '、' + name + 'さん！';
  };
};

// カスタマイズされた挨拶関数を作成
const sayHelloFunc = createGreeting('こんにちは');
const sayGoodbyeFunc = createGreeting('さようなら');

// UI関数
function sayHello() {
  const name = document.getElementById('nameInput').value;
  const message = sayHelloFunc(name);
  document.getElementById('greetResult').textContent = message;
}

function sayGoodbye() {
  const name = document.getElementById('nameInput').value;
  const message = sayGoodbyeFunc(name);
  document.getElementById('greetResult').textContent = message;
}

// ========================================
// 2. 掛け算ファクトリー
// ========================================

// 掛け算関数を作る関数
const createMultiplier = function(multiplier) {
  // クロージャ: multiplier を覚えている
  return function(value) {
    return value * multiplier;
  };
};

// 異なる掛け算関数を作成
const double = createMultiplier(2);
const triple = createMultiplier(3);

// UI関数
function applyDouble() {
  const value = Number(document.getElementById('multiplyInput').value);
  const result = double(value);
  document.getElementById('multiplyResult').textContent =
    value + ' × 2 = ' + result;
}

function applyTriple() {
  const value = Number(document.getElementById('multiplyInput').value);
  const result = triple(value);
  document.getElementById('multiplyResult').textContent =
    value + ' × 3 = ' + result;
}

// ========================================
// 3. カウンターファクトリー
// ========================================

// カウンター関数を作る関数
const createCounter = function(initialValue) {
  // プライベート変数
  let count = initialValue;

  // 複数のメソッドを持つオブジェクトを返す
  return {
    increment: function() {
      count = count + 1;
      return count;
    },
    decrement: function() {
      count = count - 1;
      return count;
    },
    getValue: function() {
      return count;
    },
    reset: function() {
      count = initialValue;
      return count;
    }
  };
};

// 独立した2つのカウンターを作成
const counter1 = createCounter(0);
const counter2 = createCounter(0);

// カウンター1のUI関数
function incrementCounter1() {
  const newValue = counter1.increment();
  document.getElementById('counter1Display').textContent = newValue;
}

function decrementCounter1() {
  const newValue = counter1.decrement();
  document.getElementById('counter1Display').textContent = newValue;
}

// カウンター2のUI関数
function incrementCounter2() {
  const newValue = counter2.increment();
  document.getElementById('counter2Display').textContent = newValue;
}

function decrementCounter2() {
  const newValue = counter2.decrement();
  document.getElementById('counter2Display').textContent = newValue;
}

// ========================================
// 4. その他の例（コンソールで確認）
// ========================================

// バリデーターファクトリー
const createValidator = function(minLength) {
  return function(text) {
    return text.length >= minLength;
  };
};

const validateShort = createValidator(3);
const validateLong = createValidator(10);

console.log('バリデーター例:');
console.log('validateShort("ab"):', validateShort('ab'));        // false
console.log('validateShort("abc"):', validateShort('abc'));      // true
console.log('validateLong("short"):', validateLong('short'));    // false
console.log('validateLong("long text"):', validateLong('long text')); // true

// 税金計算機ファクトリー
const createTaxCalculator = function(taxRate) {
  return function(price) {
    const tax = price * taxRate;
    const total = price + tax;
    return {
      price: price,
      tax: Math.round(tax),
      total: Math.round(total)
    };
  };
};

const japanTax = createTaxCalculator(0.1);  // 10%
const usaTax = createTaxCalculator(0.07);   // 7%

console.log('税金計算例:');
console.log('日本(10%)で1000円:', japanTax(1000));
console.log('アメリカ(7%)で1000円:', usaTax(1000));
