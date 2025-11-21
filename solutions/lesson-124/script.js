// ========================================
// 1. 基本形：即時実行関数
// ========================================

(function() {
  console.log('即時実行関数が実行されました');
})();

// ========================================
// 2. アプリの初期化
// ========================================

(function() {
  console.log('アプリを初期化します');

  // プライベート変数
  const appName = 'マイアプリ';
  const version = '1.0.0';
  const author = '開発者';

  // 初期表示
  const infoDiv = document.getElementById('app-info');
  infoDiv.innerHTML =
    '<strong>アプリ名:</strong> ' + appName + '<br>' +
    '<strong>バージョン:</strong> ' + version + '<br>' +
    '<strong>作者:</strong> ' + author;

  console.log('初期化が完了しました');
})();

// ========================================
// 3. 引数を渡す
// ========================================

(function(name, age) {
  console.log(name + 'さんは' + age + '歳です');
})('太郎', 25);

(function(a, b, c) {
  const result = a + b + c;
  console.log('合計:', result);
})(10, 20, 30);

// ========================================
// 4. 戻り値を使う
// ========================================

const calculationResult = (function(a, b) {
  const sum = a + b;
  const product = a * b;
  return {
    sum: sum,
    product: product
  };
})(10, 20);

document.getElementById('calculation-result').innerHTML =
  '10 + 20 = ' + calculationResult.sum + '<br>' +
  '10 × 20 = ' + calculationResult.product;

// ========================================
// 5. プライベート変数を持つカウンター
// ========================================

const counter = (function() {
  // プライベート変数（外からアクセスできない）
  let count = 0;

  // 公開するメソッド
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
      count = 0;
      return count;
    }
  };
})();

// UI関数（グローバルに公開）
function incrementCounter() {
  const newCount = counter.increment();
  document.getElementById('counter-display').textContent = 'カウント: ' + newCount;
}

function decrementCounter() {
  const newCount = counter.decrement();
  document.getElementById('counter-display').textContent = 'カウント: ' + newCount;
}

function showCount() {
  const currentCount = counter.getValue();
  alert('現在のカウント: ' + currentCount);
}

// ========================================
// 6. スコープの分離の例
// ========================================

// グローバル変数
const message = 'グローバルメッセージ';

// 即時実行関数1
(function() {
  const message = 'ローカルメッセージ1';
  console.log('関数1内:', message);
})();

// 即時実行関数2
(function() {
  const message = 'ローカルメッセージ2';
  console.log('関数2内:', message);
})();

console.log('グローバル:', message);

// ========================================
// 7. 設定オブジェクトの作成
// ========================================

const config = (function() {
  // プライベート変数
  const apiUrl = 'https://api.example.com';
  const apiKey = 'secret-key-12345';
  const timeout = 5000;

  // 公開する設定
  return {
    getUrl: function() {
      return apiUrl;
    },
    getTimeout: function() {
      return timeout;
    },
    getHeaders: function() {
      return {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      };
    }
  };
})();

console.log('API URL:', config.getUrl());
console.log('Timeout:', config.getTimeout());
console.log('apiKey:', config.apiKey);  // undefined（アクセスできない）

// ========================================
// 8. 一時的な計算
// ========================================

const finalResult = (function() {
  // 複雑な計算過程
  const step1 = 10 * 2;
  const step2 = step1 + 15;
  const step3 = step2 * 3;
  const step4 = step3 - 20;

  return step4;
})();

console.log('計算結果:', finalResult);
// step1, step2, step3, step4 はもう存在しない
