# レッスン124：即時実行関数

## 学習目標
- 即時実行関数（IIFE）とは何かを理解する
- 即時実行関数の書き方を学ぶ
- スコープの分離と名前空間の汚染防止を理解する

## 即時実行関数（IIFE）とは

**即時実行関数**（Immediately Invoked Function Expression、略してIIFE）は、定義と同時に実行される関数です。

### 通常の関数

```javascript
// 定義
const greet = function() {
  alert('こんにちは');
};

// 実行
greet();
```

### 即時実行関数

```javascript
// 定義と同時に実行
(function() {
  alert('こんにちは');
})();
```

関数全体を `()` で囲み、最後に `()` をつけて即座に実行します。

## 即時実行関数の構文

### 基本形

```javascript
(function() {
  // 処理
})();
```

### 別の書き方

```javascript
(function() {
  // 処理
}());
```

どちらも同じ意味です。一般的には前者がよく使われます。

## なぜ即時実行関数を使うのか

### 1. スコープの分離

即時実行関数内の変数は、外からアクセスできません。

```javascript
// グローバルスコープ
const message = 'グローバル';

(function() {
  // 即時実行関数のスコープ
  const message = 'ローカル';
  console.log(message);  // 'ローカル'
})();

console.log(message);  // 'グローバル'
```

### 2. 名前空間の汚染防止

グローバル変数を作らずに済みます。

```javascript
// 悪い例：グローバル変数を汚染
let count = 0;
let total = 0;
// これらはグローバルスコープに残る

// 良い例：即時実行関数で分離
(function() {
  let count = 0;
  let total = 0;
  // これらは外からアクセスできない
})();
```

## 実践例：初期化処理

アプリの初期化に使えます。

```javascript
(function() {
  console.log('アプリを初期化します');

  // 初期設定
  const appName = 'マイアプリ';
  const version = '1.0.0';

  // 初期表示
  document.getElementById('appName').textContent = appName;
  document.getElementById('version').textContent = version;

  console.log('初期化が完了しました');
})();
```

この初期化処理は一度だけ実行され、`appName` や `version` は外からアクセスできません。

## 引数を渡す

即時実行関数にも引数を渡せます。

```javascript
(function(name) {
  alert('こんにちは、' + name + 'さん');
})('太郎');
```

### 複数の引数

```javascript
(function(a, b) {
  const result = a + b;
  console.log(result);
})(5, 3);  // 8
```

## 戻り値を使う

即時実行関数も値を返せます。

```javascript
const result = (function() {
  const a = 5;
  const b = 3;
  return a + b;
})();

console.log(result);  // 8
```

### 実践例：設定オブジェクトの作成

```javascript
const config = (function() {
  // プライベート変数
  const apiUrl = 'https://api.example.com';
  const apiKey = 'secret-key';

  // 公開する設定
  return {
    url: apiUrl,
    timeout: 5000,
    headers: {
      'Authorization': 'Bearer ' + apiKey
    }
  };
})();

console.log(config.url);      // OK
console.log(config.apiKey);   // undefined（アクセスできない）
```

## スコープの分離の例

### 変数の衝突を防ぐ

```javascript
// グローバル変数
const name = 'グローバル太郎';

// 即時実行関数1
(function() {
  const name = '太郎';
  console.log(name);  // '太郎'
})();

// 即時実行関数2
(function() {
  const name = '花子';
  console.log(name);  // '花子'
})();

console.log(name);  // 'グローバル太郎'
```

それぞれの `name` は独立しています。

## 実践例：カウンター

プライベートな状態を持つカウンターです。

```javascript
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
    }
  };
})();

console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.getValue());   // 2
console.log(counter.count);        // undefined（直接アクセスできない）
```

`count` は保護され、メソッド経由でしか操作できません。

## 実践例：複数のコンポーネント

それぞれが独立したスコープを持ちます。

```javascript
// ヘッダーコンポーネント
(function() {
  const title = 'マイサイト';
  const menu = ['ホーム', 'about', 'お問い合わせ'];

  function init() {
    document.getElementById('header').textContent = title;
  }

  init();
})();

// フッターコンポーネント
(function() {
  const copyright = '© 2024 MyCompany';
  const links = ['プライバシー', '利用規約'];

  function init() {
    document.getElementById('footer').textContent = copyright;
  }

  init();
})();

// title や copyright はグローバルに残らない
```

## グローバル変数へのアクセス

グローバル変数を引数として渡すことができます。

```javascript
(function(window, document) {
  // window と document を引数として受け取る
  console.log(window.innerWidth);
  document.body.style.backgroundColor = 'lightblue';
})(window, document);
```

これにより、グローバル変数へのアクセスが明示的になります。

## よくあるパターン

### パターン1: モジュールパターン

```javascript
const myModule = (function() {
  // プライベート
  let privateVar = 'プライベート';

  function privateFunc() {
    return 'プライベート関数';
  }

  // パブリック
  return {
    publicVar: 'パブリック',
    publicFunc: function() {
      return 'パブリック関数';
    },
    usePrivate: function() {
      return privateFunc();
    }
  };
})();

console.log(myModule.publicVar);      // OK
console.log(myModule.privateVar);     // undefined
console.log(myModule.publicFunc());   // OK
console.log(myModule.usePrivate());   // OK
```

### パターン2: 初期化

```javascript
(function() {
  // 初期化処理
  console.log('アプリ起動');

  // イベントリスナーの設定
  document.getElementById('btn').addEventListener('click', function() {
    alert('クリック');
  });

  // 初期データの読み込み
  loadData();
})();
```

### パターン3: 一時的な処理

```javascript
const result = (function() {
  // 複雑な計算
  const step1 = 10 * 2;
  const step2 = step1 + 5;
  const step3 = step2 * 3;
  return step3;
})();

console.log(result);  // 75
// step1, step2, step3 はもう存在しない
```

## 即時実行関数 vs 通常の関数

### 通常の関数

```javascript
function init() {
  const message = 'こんにちは';
  console.log(message);
}

init();  // 呼び出しが必要
```

- 再利用できる
- 明示的に呼び出す必要がある
- 関数名がグローバルに残る

### 即時実行関数

```javascript
(function() {
  const message = 'こんにちは';
  console.log(message);
})();  // 自動実行
```

- 一度だけ実行
- 自動的に実行される
- 関数名が残らない

## アロー関数でも書ける（参考）

即時実行関数はアロー関数でも書けます。

```javascript
(() => {
  console.log('アロー関数版');
})();
```

ただし、従来の書き方の方が一般的です。

## まとめ

1. **即時実行関数**は定義と同時に実行される
2. 構文: `(function() { })();`
3. **スコープの分離**ができる
4. **グローバル変数の汚染を防ぐ**
5. **プライベートな変数**を作れる
6. 一度だけ実行する**初期化処理**に適している

### 使い分け

```javascript
// 再利用する → 通常の関数
const greet = function() {
  alert('こんにちは');
};
greet();
greet();

// 一度だけ実行、スコープ分離 → 即時実行関数
(function() {
  const message = 'こんにちは';
  alert(message);
})();
```

### 主な用途

- アプリの初期化
- プライベート変数の作成
- グローバル変数の汚染防止
- 一時的な処理の実行

即時実行関数を使うことで、より安全で保守しやすいコードを書くことができます。

次回は、関数を返す関数について学びます。
