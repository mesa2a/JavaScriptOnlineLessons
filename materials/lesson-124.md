# レッスン124：即時実行関数

**作成日: 2025-11-26**

## このレッスンで学ぶこと

このレッスンでは、**即時実行関数（IIFE: Immediately Invoked Function Expression）** について学びます。即時実行関数は、定義した瞬間に自動的に実行される特殊な関数です。

### 学習目標

1. 即時実行関数とは何かを理解する
2. `(function() {})()`の書き方を学ぶ
3. スコープの分離の仕組みを理解する
4. 名前空間の汚染防止の重要性を学ぶ
5. 初期化処理やプライベート変数の作り方を習得する

---

## 📚 即時実行関数とは？

### 日常生活での例：使い捨ての作業スペース

即時実行関数を理解するために、日常生活の例で考えてみましょう。

**段ボール箱での作業**

想像してください。あなたは工作をするとき、こんな風に作業します：

```
通常の作業台（再利用する）:
┌─────────────────┐
│  作業台          │ ← 何度も使う
│  ・道具を並べる   │
│  ・作業する      │
│  ・片付ける      │
└─────────────────┘
 ↓ 何度も呼び出せる


使い捨ての段ボール箱（即時実行）:
┌─────────────────┐
│  段ボール箱      │ ← 組み立てた瞬間に
│  ・道具を入れる   │    作業開始
│  ・作業する      │    終わったら捨てる
│  ・完了          │
└─────────────────┘
 ↓ 一度だけ実行、すぐ片付く
```

**即時実行関数の特徴**：
1. **組み立てた瞬間に作業開始** → 定義と同時に実行
2. **作業が終わったら箱を捨てる** → 関数名が残らない
3. **箱の中のものは外から見えない** → スコープの分離
4. **周りを汚さない** → グローバル変数を作らない

---

## 🔧 基本的な書き方

### 通常の関数 vs 即時実行関数

**通常の関数（名前をつけて、後で呼び出す）**

```javascript
// ステップ1: 関数を定義（準備）
const greet = function() {
  console.log('こんにちは！');
};

// ステップ2: 関数を呼び出す（実行）
greet();  // 'こんにちは！'
```

**即時実行関数（定義と同時に実行）**

```javascript
// 定義と同時に実行！
(function() {
  console.log('こんにちは！');
})();  // 'こんにちは！'
```

### 構造の分解

即時実行関数は3つの部分で構成されています：

```javascript
(function() {        // ← 部分1: 関数全体を () で囲む
  console.log('実行');
})                   // ← 部分2: 関数の定義終わり
();                  // ← 部分3: すぐに () で実行
```

**視覚的な構造**：

```
全体を括弧で囲む
    ↓
┌───(─────────────────────────┐
│   function() {               │  関数の定義
│     console.log('実行');     │
│   }                          │
└──────────────────────────)──┘
                             ();  ← 実行の括弧
```

---

## 💡 なぜ即時実行関数を使うのか？

### 理由1：スコープの分離（変数が外に漏れない）

**問題：グローバル変数の汚染**

```javascript
// 悪い例：グローバル変数がたくさん作られる
let userName = '太郎';
let userAge = 20;
let userEmail = 'taro@example.com';

// これらの変数はプログラム全体で残り続ける
console.log(userName);  // どこからでもアクセス可能
```

**問題点**：
- ❌ 変数名が衝突する可能性がある
- ❌ 他のコードに影響を与える
- ❌ メモリを使い続ける

**解決：即時実行関数でスコープを分離**

```javascript
// 良い例：即時実行関数で囲む
(function() {
  let userName = '太郎';
  let userAge = 20;
  let userEmail = 'taro@example.com';

  console.log(userName);  // '太郎' ← 関数内でのみアクセス可能
})();

// 外からはアクセスできない
console.log(userName);  // エラー！userName is not defined
```

### 実行の流れ（ステップバイステップ）

```
ステップ1: 即時実行関数を定義
┌─────────────────────────┐
│ (function() {            │
│   let userName = '太郎'; │ ← この変数は関数内だけで有効
│   console.log(userName); │
│ })();                    │
└─────────────────────────┘

ステップ2: すぐに実行される
  ↓
変数 userName が作られる
  ↓
'太郎' がコンソールに表示される
  ↓
ステップ3: 関数が終了
  ↓
userName が消える（メモリから削除）
  ↓
グローバルスコープには何も残らない ✓
```

---

## 📊 スコープの視覚化

### グローバルスコープ vs ローカルスコープ

```javascript
// グローバル変数
const globalMessage = 'グローバル';

(function() {
  // ローカル変数
  const localMessage = 'ローカル';

  console.log(globalMessage);  // 'グローバル' ← 外の変数にアクセス可能
  console.log(localMessage);   // 'ローカル'   ← 内の変数にアクセス可能
})();

console.log(globalMessage);  // 'グローバル' ← 外の変数にアクセス可能
console.log(localMessage);   // エラー！← 内の変数にアクセス不可
```

**スコープの図解**：

```
グローバルスコープ
┌────────────────────────────────────┐
│ globalMessage = 'グローバル'        │
│                                    │
│  即時実行関数のスコープ               │
│  ┌──────────────────────────┐     │
│  │ localMessage = 'ローカル'  │     │
│  │                          │     │
│  │ ✓ globalMessage 見える    │     │
│  │ ✓ localMessage 見える     │     │
│  └──────────────────────────┘     │
│                                    │
│ ✓ globalMessage 見える              │
│ ✗ localMessage 見えない              │
└────────────────────────────────────┘

ルール：
・内側 → 外側の変数が見える
・外側 → 内側の変数は見えない
```

---

## 🎯 基本例1：変数の衝突を防ぐ

### 問題：変数名の衝突

```javascript
// プログラムA
let count = 0;
count = count + 1;
console.log(count);  // 1

// プログラムB（別の部分）
let count = 0;  // エラー！同じ名前の変数は作れない
```

### 解決：即時実行関数で分離

```javascript
// プログラムA
(function() {
  let count = 0;
  count = count + 1;
  console.log('プログラムA:', count);  // 'プログラムA: 1'
})();

// プログラムB
(function() {
  let count = 0;  // OK！別のスコープなので衝突しない
  count = count + 10;
  console.log('プログラムB:', count);  // 'プログラムB: 10'
})();

// どちらの count もグローバルには残らない
```

**実行の流れ**：

```
グローバルスコープ
┌─────────────────────────────────────┐
│                                     │
│  プログラムAの実行                    │
│  ┌───────────────────┐              │
│  │ count = 0         │              │
│  │ count = count + 1 │ → count = 1  │
│  │ console.log       │ → '1' 表示   │
│  └───────────────────┘              │
│  ↓ 終了（count が消える）             │
│                                     │
│  プログラムBの実行                    │
│  ┌───────────────────┐              │
│  │ count = 0         │              │
│  │ count = count + 10│ → count = 10 │
│  │ console.log       │ → '10' 表示  │
│  └───────────────────┘              │
│  ↓ 終了（count が消える）             │
│                                     │
│  グローバルには何も残らない ✓          │
└─────────────────────────────────────┘
```

---

## 🎯 基本例2：引数を渡す

即時実行関数にも引数を渡すことができます。

```javascript
(function(name, age) {
  console.log('名前:', name);
  console.log('年齢:', age);
})('太郎', 20);

// 出力:
// 名前: 太郎
// 年齢: 20
```

### 実行の流れ

```
ステップ1: 即時実行関数を定義
(function(name, age) {  ← パラメータ
  console.log('名前:', name);
  console.log('年齢:', age);
})

ステップ2: 引数を渡して実行
('太郎', 20);  ← 引数

ステップ3: パラメータに値が入る
name = '太郎'
age = 20

ステップ4: 処理が実行される
console.log('名前:', '太郎');  → '名前: 太郎'
console.log('年齢:', 20);      → '年齢: 20'
```

---

## 🎯 基本例3：戻り値を使う

即時実行関数の戻り値を変数に代入できます。

```javascript
const result = (function(a, b) {
  const sum = a + b;
  return sum;
})(5, 3);

console.log(result);  // 8
```

### 実行の流れ

```
ステップ1: 即時実行関数を実行
(function(a, b) {
  const sum = a + b;  ← sum = 5 + 3 = 8
  return sum;         ← 8 を返す
})(5, 3)

ステップ2: 戻り値を result に代入
const result = 8;

ステップ3: sum は消える（スコープ外）
グローバルには result のみが残る
```

**メリット**：
- ✅ 計算過程（`sum`）がグローバルに残らない
- ✅ 結果（`result`）だけを取得できる

---

## 🏗️ 実践例1：アプリの初期化

即時実行関数は、アプリの初期化処理によく使われます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>アプリ初期化の例</title>
</head>
<body>
  <h1 id="title"></h1>
  <p id="version"></p>
  <button id="startBtn">スタート</button>

  <script>
    // アプリの初期化（即時実行関数）
    (function() {
      console.log('アプリを初期化中...');

      // 初期設定（これらの変数は外から見えない）
      const appName = 'マイアプリ';
      const version = '1.0.0';
      const releaseDate = '2025-11-26';

      // 画面に表示
      document.getElementById('title').textContent = appName;
      document.getElementById('version').textContent = 'バージョン: ' + version;

      // イベントリスナーの設定
      document.getElementById('startBtn').addEventListener('click', function() {
        alert('アプリを起動しました！');
      });

      console.log('初期化完了！');
    })();

    // ここでは appName や version にアクセスできない
    // console.log(appName);  // エラー！
  </script>
</body>
</html>
```

### 実行の流れ

```
ページ読み込み開始
  ↓
即時実行関数が実行される
  ↓
変数を作成
  appName = 'マイアプリ'
  version = '1.0.0'
  releaseDate = '2025-11-26'
  ↓
画面に表示
  title.textContent = 'マイアプリ'
  version.textContent = 'バージョン: 1.0.0'
  ↓
イベントリスナー設定
  startBtn に click イベントを登録
  ↓
初期化完了
  ↓
即時実行関数終了
  ↓
変数が消える
  appName, version, releaseDate はメモリから削除
  ↓
グローバルには何も残らない ✓
```

**メリット**：
- ✅ 初期化処理が自動的に実行される
- ✅ 設定変数がグローバルを汚さない
- ✅ コードが整理される

---

## 🏗️ 実践例2：プライベートなカウンター

即時実行関数を使って、外から直接変更できないカウンターを作ることができます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>プライベートカウンター</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      max-width: 400px;
      margin: 0 auto;
    }
    #display {
      font-size: 48px;
      text-align: center;
      padding: 20px;
      background: #f0f0f0;
      border-radius: 10px;
      margin: 20px 0;
    }
    button {
      font-size: 18px;
      padding: 10px 20px;
      margin: 5px;
      cursor: pointer;
    }
    .btn-container {
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>プライベートカウンター</h1>
  <div id="display">0</div>
  <div class="btn-container">
    <button id="incrementBtn">+1</button>
    <button id="decrementBtn">-1</button>
    <button id="resetBtn">リセット</button>
    <button id="getValueBtn">値を表示</button>
  </div>

  <script>
    // カウンターを作成（即時実行関数）
    const counter = (function() {
      // プライベート変数（外から直接アクセスできない）
      let count = 0;

      // 画面を更新する内部関数
      function updateDisplay() {
        document.getElementById('display').textContent = count;
      }

      // 公開するメソッド（外から使える機能）
      return {
        // カウントを増やす
        increment: function() {
          count = count + 1;
          updateDisplay();
          return count;
        },

        // カウントを減らす
        decrement: function() {
          count = count - 1;
          updateDisplay();
          return count;
        },

        // カウントをリセット
        reset: function() {
          count = 0;
          updateDisplay();
          return count;
        },

        // 現在の値を取得
        getValue: function() {
          return count;
        }
      };
    })();

    // イベントリスナーの設定
    document.getElementById('incrementBtn').addEventListener('click', function() {
      counter.increment();
    });

    document.getElementById('decrementBtn').addEventListener('click', function() {
      counter.decrement();
    });

    document.getElementById('resetBtn').addEventListener('click', function() {
      counter.reset();
    });

    document.getElementById('getValueBtn').addEventListener('click', function() {
      const value = counter.getValue();
      alert('現在の値: ' + value);
    });

    // 外から count に直接アクセスできない
    console.log(counter.count);  // undefined（保護されている）

    // メソッド経由でのみ操作可能
    console.log(counter.getValue());  // 0（OK）
  </script>
</body>
</html>
```

### データ構造の図解

```
counter オブジェクト
┌──────────────────────────────────┐
│ 公開されているメソッド（外から使える）  │
│  ・increment()                    │
│  ・decrement()                    │
│  ・reset()                        │
│  ・getValue()                     │
└──────────────────────────────────┘
         ↓ アクセス可能
┌──────────────────────────────────┐
│ プライベート変数（隠されている）      │
│  count = 0                        │
│  updateDisplay()                  │
└──────────────────────────────────┘
         ↑ 直接アクセス不可

外部からは：
✓ counter.increment()  → OK
✓ counter.getValue()   → OK
✗ counter.count        → undefined（保護されている）
✗ counter.count = 100  → 無効（変更できない）
```

### 実行の流れ

```
ステップ1: 即時実行関数を実行
  ↓
ステップ2: プライベート変数を作成
  count = 0

ステップ3: メソッドを持つオブジェクトを返す
  return {
    increment: function() { ... },
    decrement: function() { ... },
    reset: function() { ... },
    getValue: function() { ... }
  }

ステップ4: 戻り値を counter に代入
  const counter = { メソッド群 };

ステップ5: count は即時実行関数の中に閉じ込められる
  外からアクセス不可、でもメソッドからはアクセス可能

ユーザーが +1 ボタンをクリック
  ↓
counter.increment() が呼ばれる
  ↓
count = count + 1  （count は 1 になる）
  ↓
updateDisplay() で画面を更新
  ↓
return count で 1 を返す
```

**メリット**：
- ✅ `count` が保護されている（勝手に変更できない）
- ✅ メソッド経由でのみ操作可能
- ✅ 予期しない変更を防げる

---

## 🏗️ 実践例3：複数のコンポーネントの分離

複数の機能を持つアプリで、それぞれを独立したスコープで管理できます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>コンポーネント分離の例</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    #header {
      background: #333;
      color: white;
      padding: 20px;
      text-align: center;
    }
    #content {
      padding: 20px;
    }
    #footer {
      background: #666;
      color: white;
      padding: 10px;
      text-align: center;
      position: fixed;
      bottom: 0;
      width: 100%;
    }
  </style>
</head>
<body>
  <div id="header"></div>
  <div id="content">
    <p>ここがメインコンテンツです。</p>
  </div>
  <div id="footer"></div>

  <script>
    // ヘッダーコンポーネント（即時実行関数）
    (function() {
      // このコンポーネント専用の変数
      const siteName = 'マイウェブサイト';
      const menu = ['ホーム', 'About', 'お問い合わせ'];
      const version = '1.0.0';

      // 初期化関数
      function init() {
        const header = document.getElementById('header');
        header.innerHTML = '<h1>' + siteName + '</h1>' +
                          '<p>Version: ' + version + '</p>';
        console.log('ヘッダー初期化完了');
      }

      // 初期化を実行
      init();
    })();

    // フッターコンポーネント（即時実行関数）
    (function() {
      // このコンポーネント専用の変数
      const companyName = 'MyCompany';
      const year = 2025;
      const links = ['プライバシーポリシー', '利用規約', 'サイトマップ'];

      // 初期化関数
      function init() {
        const footer = document.getElementById('footer');
        footer.innerHTML = '<p>&copy; ' + year + ' ' + companyName + '</p>';
        console.log('フッター初期化完了');
      }

      // 初期化を実行
      init();
    })();

    // サイドバーコンポーネント（即時実行関数）
    (function() {
      // このコンポーネント専用の変数
      const title = '最新記事';
      const articles = ['記事1', '記事2', '記事3'];

      function init() {
        console.log('サイドバー初期化完了');
        console.log('表示する記事:', articles);
      }

      init();
    })();

    // グローバルスコープは汚染されていない
    console.log(typeof siteName);     // 'undefined'
    console.log(typeof companyName);  // 'undefined'
    console.log(typeof title);        // 'undefined'

    // 各コンポーネントの変数は衝突しない
  </script>
</body>
</html>
```

### コンポーネント構造の図解

```
グローバルスコープ
┌────────────────────────────────────────┐
│                                        │
│  ヘッダーコンポーネント                  │
│  ┌──────────────────────┐             │
│  │ siteName             │             │
│  │ menu                 │             │
│  │ version              │             │
│  │ init()               │             │
│  └──────────────────────┘             │
│                                        │
│  フッターコンポーネント                  │
│  ┌──────────────────────┐             │
│  │ companyName          │             │
│  │ year                 │             │
│  │ links                │             │
│  │ init()               │             │
│  └──────────────────────┘             │
│                                        │
│  サイドバーコンポーネント                │
│  ┌──────────────────────┐             │
│  │ title                │             │
│  │ articles             │             │
│  │ init()               │             │
│  └──────────────────────┘             │
│                                        │
│  ※ 各コンポーネントの変数は独立        │
│  ※ グローバルには何も残らない          │
└────────────────────────────────────────┘
```

**メリット**：
- ✅ 各コンポーネントが独立している
- ✅ 変数名の衝突が起きない
- ✅ 保守しやすい構造

---

## 📝 練習問題

### 練習1：基本的な即時実行関数（基本）

**問題**：即時実行関数を使って、以下の処理を行ってください。

1. 変数 `message` に `'こんにちは、JavaScript!'` を代入
2. `console.log()` で表示
3. グローバルスコープに `message` が残らないことを確認

<details>
<summary>💡 ヒント</summary>

```javascript
// この形を使います
(function() {
  // ここに処理を書く
})();

// 外から変数にアクセスできないことを確認
console.log(typeof message);  // 'undefined' になるはず
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
// 即時実行関数で message を作成
(function() {
  const message = 'こんにちは、JavaScript!';
  console.log(message);  // 'こんにちは、JavaScript!'
})();

// グローバルスコープには残らない
console.log(typeof message);  // 'undefined'
```

**実行の流れ**：

```
ステップ1: 即時実行関数を実行
  ↓
ステップ2: message を作成
  message = 'こんにちは、JavaScript!'
  ↓
ステップ3: console.log で表示
  'こんにちは、JavaScript!' が表示される
  ↓
ステップ4: 即時実行関数が終了
  ↓
ステップ5: message が消える
  ↓
グローバルスコープで typeof message をチェック
  → 'undefined'（変数が残っていない）✓
```

**確認**：
- ✅ 即時実行関数の構文が正しい
- ✅ message が表示される
- ✅ グローバルに message が残らない
</details>

---

### 練習2：引数と戻り値を使った計算（応用）

**問題**：即時実行関数を使って、消費税込みの価格を計算してください。

**仕様**：
1. 即時実行関数に引数として価格（例: 1000）を渡す
2. 関数内で消費税率 `taxRate = 0.1`（10%）を定義
3. 税込価格を計算して返す
4. 戻り値を変数 `totalPrice` に代入
5. `totalPrice` を表示

<details>
<summary>💡 ヒント</summary>

```javascript
// 引数を受け取る即時実行関数
const result = (function(引数) {
  // 計算処理
  return 結果;
})(渡す値);
```

税込価格の計算式：
```javascript
税込価格 = 価格 + (価格 × 税率)
// または
税込価格 = 価格 × (1 + 税率)
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
// 即時実行関数で税込価格を計算
const totalPrice = (function(price) {
  const taxRate = 0.1;  // 消費税率10%
  const total = price + (price * taxRate);
  return total;
})(1000);

console.log('税込価格:', totalPrice);  // '税込価格: 1100'

// taxRate や total は外から見えない
console.log(typeof taxRate);  // 'undefined'
console.log(typeof total);    // 'undefined'
```

**実行の流れ**：

```
ステップ1: 即時実行関数を定義・実行
(function(price) { ... })(1000)
  ↓
ステップ2: 引数を受け取る
price = 1000
  ↓
ステップ3: 税率を定義
taxRate = 0.1
  ↓
ステップ4: 税込価格を計算
total = 1000 + (1000 × 0.1)
total = 1000 + 100
total = 1100
  ↓
ステップ5: 戻り値を返す
return 1100
  ↓
ステップ6: 変数に代入
const totalPrice = 1100
  ↓
ステップ7: 関数が終了
taxRate と total が消える
  ↓
グローバルには totalPrice だけが残る ✓
```

**別の書き方（よりシンプル）**：

```javascript
const totalPrice = (function(price) {
  const taxRate = 0.1;
  return price * (1 + taxRate);
})(1000);

console.log('税込価格:', totalPrice);  // '税込価格: 1100'
```

**確認**：
- ✅ 引数が正しく渡されている
- ✅ 税込価格の計算が正しい
- ✅ 計算過程の変数がグローバルに残らない
</details>

---

### 練習3：プライベートなタイマーアプリ（発展）

**問題**：即時実行関数を使って、経過秒数を表示するタイマーを作成してください。

**仕様**：
1. プライベート変数 `seconds`（経過秒数）を持つ
2. 以下のメソッドを持つオブジェクトを返す：
   - `start()`: 1秒ごとに seconds を増やす
   - `stop()`: タイマーを停止
   - `reset()`: seconds を 0 にリセット
   - `getSeconds()`: 現在の秒数を返す
3. 外から `seconds` に直接アクセスできないこと

<details>
<summary>💡 ヒント</summary>

```javascript
const timer = (function() {
  // プライベート変数
  let seconds = 0;
  let intervalId = null;

  return {
    start: function() {
      // setInterval でタイマー開始
      intervalId = setInterval(function() {
        // 1秒ごとに実行
      }, 1000);
    },
    stop: function() {
      // clearInterval でタイマー停止
    },
    // 他のメソッド...
  };
})();
```

`setInterval` の使い方：
```javascript
// 1秒ごとに処理を実行
const id = setInterval(function() {
  console.log('1秒経過');
}, 1000);

// 停止
clearInterval(id);
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
// タイマーオブジェクトを作成（即時実行関数）
const timer = (function() {
  // プライベート変数（外から直接アクセス不可）
  let seconds = 0;
  let intervalId = null;

  // 公開するメソッド
  return {
    // タイマー開始
    start: function() {
      if (intervalId !== null) {
        console.log('既にタイマーは動いています');
        return;
      }

      console.log('タイマー開始');
      intervalId = setInterval(function() {
        seconds = seconds + 1;
        console.log('経過時間:', seconds, '秒');
      }, 1000);
    },

    // タイマー停止
    stop: function() {
      if (intervalId === null) {
        console.log('タイマーは動いていません');
        return;
      }

      clearInterval(intervalId);
      intervalId = null;
      console.log('タイマー停止');
    },

    // リセット
    reset: function() {
      seconds = 0;
      console.log('タイマーをリセットしました');
    },

    // 現在の秒数を取得
    getSeconds: function() {
      return seconds;
    }
  };
})();

// 使用例
timer.start();       // タイマー開始

// 5秒後に停止したい場合
setTimeout(function() {
  timer.stop();      // タイマー停止
  console.log('合計:', timer.getSeconds(), '秒');
}, 5000);

// 外から seconds に直接アクセスできない
console.log(timer.seconds);  // undefined（保護されている）
```

**完全版（HTML付き）**：

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>タイマーアプリ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 50px;
    }
    #display {
      font-size: 72px;
      margin: 30px 0;
      color: #333;
    }
    button {
      font-size: 20px;
      padding: 15px 30px;
      margin: 10px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
    }
    #startBtn {
      background: #4CAF50;
      color: white;
    }
    #stopBtn {
      background: #f44336;
      color: white;
    }
    #resetBtn {
      background: #2196F3;
      color: white;
    }
  </style>
</head>
<body>
  <h1>タイマーアプリ</h1>
  <div id="display">0秒</div>
  <button id="startBtn">スタート</button>
  <button id="stopBtn">ストップ</button>
  <button id="resetBtn">リセット</button>

  <script>
    // タイマーオブジェクトを作成（即時実行関数）
    const timer = (function() {
      // プライベート変数（外から直接アクセス不可）
      let seconds = 0;
      let intervalId = null;

      // 画面表示を更新する内部関数
      function updateDisplay() {
        document.getElementById('display').textContent = seconds + '秒';
      }

      // 公開するメソッド
      return {
        // タイマー開始
        start: function() {
          if (intervalId !== null) {
            alert('既にタイマーは動いています');
            return;
          }

          intervalId = setInterval(function() {
            seconds = seconds + 1;
            updateDisplay();
          }, 1000);
        },

        // タイマー停止
        stop: function() {
          if (intervalId === null) {
            alert('タイマーは動いていません');
            return;
          }

          clearInterval(intervalId);
          intervalId = null;
        },

        // リセット
        reset: function() {
          this.stop();  // タイマーを停止
          seconds = 0;
          updateDisplay();
        },

        // 現在の秒数を取得
        getSeconds: function() {
          return seconds;
        }
      };
    })();

    // イベントリスナーの設定
    document.getElementById('startBtn').addEventListener('click', function() {
      timer.start();
    });

    document.getElementById('stopBtn').addEventListener('click', function() {
      timer.stop();
    });

    document.getElementById('resetBtn').addEventListener('click', function() {
      timer.reset();
    });

    // 外から seconds に直接アクセスできない
    console.log('timer.seconds:', timer.seconds);  // undefined
    console.log('timer.getSeconds():', timer.getSeconds());  // 0 (OK)
  </script>
</body>
</html>
```

**データ構造**：

```
timer オブジェクト
┌────────────────────────────────┐
│ 公開メソッド（外から使える）      │
│  ・start()                      │
│  ・stop()                       │
│  ・reset()                      │
│  ・getSeconds()                 │
└────────────────────────────────┘
         ↓ アクセス可能
┌────────────────────────────────┐
│ プライベート（隠されている）      │
│  seconds = 0                   │
│  intervalId = null             │
│  updateDisplay()               │
└────────────────────────────────┘
         ↑ 直接アクセス不可
```

**実行の流れ**：

```
ページ読み込み
  ↓
即時実行関数が実行される
  ↓
プライベート変数を作成
  seconds = 0
  intervalId = null
  ↓
メソッドを持つオブジェクトを返す
  ↓
timer 変数に代入
  ↓
ユーザーが「スタート」ボタンをクリック
  ↓
timer.start() が呼ばれる
  ↓
setInterval でタイマー開始
  ↓
1秒ごとに：
  seconds = seconds + 1
  updateDisplay() で画面更新
  ↓
ユーザーが「ストップ」ボタンをクリック
  ↓
timer.stop() が呼ばれる
  ↓
clearInterval でタイマー停止
```

**確認**：
- ✅ `seconds` が保護されている
- ✅ メソッド経由でのみ操作可能
- ✅ タイマーが正しく動作する
- ✅ スタート・ストップ・リセットができる
</details>

---

## 🔍 即時実行関数 vs 通常の関数

### 比較表

| 特徴 | 通常の関数 | 即時実行関数 |
|------|-----------|-------------|
| **定義と実行** | 別々 | 同時 |
| **再利用** | できる | できない（一度だけ） |
| **関数名** | 残る | 残らない |
| **用途** | 繰り返し使う処理 | 初期化、一度だけの処理 |
| **スコープ分離** | 可能 | 自動的に分離 |

### コード比較

**通常の関数**：

```javascript
// 定義
const init = function() {
  const message = '初期化完了';
  console.log(message);
};

// 呼び出し（複数回可能）
init();  // '初期化完了'
init();  // '初期化完了'

// 関数名が残る
console.log(typeof init);  // 'function'
```

**即時実行関数**：

```javascript
// 定義と同時に実行
(function() {
  const message = '初期化完了';
  console.log(message);
})();  // '初期化完了'

// 一度だけ実行、関数名は残らない
// もう一度呼び出すことはできない
```

---

## 📋 即時実行関数の主な用途

### 1. アプリの初期化

```javascript
(function() {
  console.log('アプリを起動します');

  // 設定の読み込み
  const config = loadConfig();

  // イベントリスナーの設定
  setupEventListeners();

  console.log('初期化完了');
})();
```

### 2. プライベート変数の作成

```javascript
const module = (function() {
  let privateVar = '秘密';

  return {
    getPrivate: function() {
      return privateVar;
    }
  };
})();

console.log(module.getPrivate());  // '秘密'
console.log(module.privateVar);    // undefined
```

### 3. グローバル変数の汚染防止

```javascript
// 悪い例
let temp1 = 10;
let temp2 = 20;
let result = temp1 + temp2;
// temp1, temp2 がグローバルに残る

// 良い例
const result = (function() {
  let temp1 = 10;
  let temp2 = 20;
  return temp1 + temp2;
})();
// temp1, temp2 は残らない
```

### 4. ライブラリやプラグインの作成

```javascript
const MyLibrary = (function() {
  // プライベートな実装
  function privateHelper() {
    return 'ヘルパー';
  }

  // 公開API
  return {
    doSomething: function() {
      return privateHelper();
    }
  };
})();
```

---

## 🎓 まとめ

### 即時実行関数の重要ポイント

1. **即時実行関数とは**
   - 定義と同時に実行される関数
   - 構文: `(function() { })();`
   - 一度だけ実行される

2. **スコープの分離**
   - 関数内の変数は外からアクセスできない
   - グローバル変数の汚染を防げる
   - 変数名の衝突を防げる

3. **主な用途**
   - アプリの初期化処理
   - プライベート変数の作成
   - モジュールパターンの実装
   - 一時的な計算処理

4. **メリット**
   - ✅ グローバルスコープを汚さない
   - ✅ 変数の衝突を防げる
   - ✅ プライベートな状態を保持できる
   - ✅ コードが整理される

### 使い分けガイド

```javascript
// 繰り返し使う → 通常の関数
const greet = function(name) {
  console.log('こんにちは、' + name + 'さん');
};
greet('太郎');
greet('花子');

// 一度だけ実行、スコープ分離 → 即時実行関数
(function() {
  const appName = 'マイアプリ';
  console.log(appName + 'を起動しました');
})();

// プライベート変数が必要 → 即時実行関数
const counter = (function() {
  let count = 0;
  return {
    increment: function() { count++; }
  };
})();
```

---

## 📚 カリキュラム要求事項の確認

このレッスンで学んだ内容がカリキュラムの要求を満たしているか確認しましょう。

### レッスン124の要求事項

- ✅ **`(function() {})()`** - 即時実行関数の基本構文を学習
- ✅ **すぐに実行** - 定義と同時に実行される仕組みを理解
- ✅ **スコープの分離** - 変数が外に漏れない仕組みを学習
- ✅ **知識：IIFE、名前空間の汚染防止** - 即時実行関数の概念と利点を習得
- ✅ **成果物：即時実行関数** - 実践例（カウンター、タイマー）を作成

すべての要求事項を満たしています！

---

## 🚀 次のステップ

次回のレッスンでは、**関数を返す関数** について学びます。

即時実行関数で学んだスコープの概念が、さらに発展した形で活用されます。

```javascript
// 次回の予告
function createCounter() {
  let count = 0;
  return function() {
    count = count + 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter());  // 1
console.log(counter());  // 2
```

即時実行関数の理解が、高度な関数パターンの基礎となります！
