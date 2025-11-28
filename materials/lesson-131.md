# レッスン131: 関数の組み合わせ

**作成日**: 2025-11-26

## このレッスンで学ぶこと

- パイプライン処理とは
- 処理の連鎖（メソッドチェーン）
- 関数合成の基礎
- 関数型プログラミングの基本
- 小さな関数を組み合わせる技術

---

## 日常生活での例：工場の組立ライン

関数の組み合わせは、**工場の組立ライン**のようなものです。

```
工場の組立ライン：
┌────────────────────────────────────────┐
│  材料投入                                │
│    ↓                                   │
│  ステップ1: 切断する                    │  ← cut()
│    ↓                                   │
│  ステップ2: 磨く                        │  ← polish()
│    ↓                                   │
│  ステップ3: 塗装する                    │  ← paint()
│    ↓                                   │
│  ステップ4: 組み立てる                  │  ← assemble()
│    ↓                                   │
│  完成品                                 │
└────────────────────────────────────────┘

各ステップ：
✓ 1つの作業だけを行う
✓ 前の工程の出力を受け取る
✓ 次の工程に渡す
✓ 組み合わせて複雑な製品を作る
```

**組立ラインの特徴**：
- 各工程は独立している
- 順番に処理される
- 工程を組み替えられる
- 全体で1つの製品を作る

**関数の組み合わせの特徴**：
- 各関数は独立している
- 順番に実行される
- 関数を組み替えられる
- 全体で1つの処理を実現する

---

## パイプライン処理とは

**パイプライン**（Pipeline）は、複数の関数を順番に実行し、各関数の出力を次の関数の入力として渡す処理方法です。

### 基本的な考え方

```javascript
// パイプラインなし（ネストした関数呼び出し）
const result = functionC(functionB(functionA(data)));

// パイプラインの概念（イメージ）
const result = data
  |> functionA
  |> functionB
  |> functionC;
```

### JavaScriptでのパイプライン実装

```javascript
// 小さな関数を定義
const double = function(n) {
  return n * 2;
};

const addTen = function(n) {
  return n + 10;
};

const square = function(n) {
  return n * n;
};

// 方法1: ネストした呼び出し（読みにくい）
const result1 = square(addTen(double(5)));
console.log(result1); // => ((5 * 2) + 10) ^ 2 = 400

// 方法2: 段階的に処理（読みやすい）
const step1 = double(5);      // 5 * 2 = 10
const step2 = addTen(step1);  // 10 + 10 = 20
const step3 = square(step2);  // 20 * 20 = 400
console.log(step3); // => 400
```

### 実行フローの詳細

```
パイプライン処理: square(addTen(double(5)))

入力: 5

ステップ1: double(5) を実行
         5 * 2 = 10
         出力: 10

ステップ2: addTen(10) を実行
         10 + 10 = 20
         出力: 20

ステップ3: square(20) を実行
         20 * 20 = 400
         出力: 400

最終結果: 400

データの流れ:
  5 → [double] → 10 → [addTen] → 20 → [square] → 400
```

---

## 処理の連鎖（メソッドチェーン）

配列メソッドを連鎖させることで、パイプライン処理を実現できます。

### 基本例

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 処理1: 偶数だけを取り出す
// 処理2: 2倍にする
// 処理3: 合計を求める

const result = numbers
  .filter(function(n) { return n % 2 === 0; })  // [2, 4, 6, 8, 10]
  .map(function(n) { return n * 2; })            // [4, 8, 12, 16, 20]
  .reduce(function(sum, n) { return sum + n; }, 0); // 60

console.log(result); // => 60
```

### 実行フローの詳細

```
メソッドチェーンの処理フロー:

入力: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

ステップ1: filter(n => n % 2 === 0)
         各要素をチェック:
         1 % 2 === 0 ? → false（除外）
         2 % 2 === 0 ? → true（残す）
         3 % 2 === 0 ? → false（除外）
         4 % 2 === 0 ? → true（残す）
         ...
         出力: [2, 4, 6, 8, 10]

ステップ2: map(n => n * 2)
         各要素を変換:
         2 * 2 = 4
         4 * 2 = 8
         6 * 2 = 12
         8 * 2 = 16
         10 * 2 = 20
         出力: [4, 8, 12, 16, 20]

ステップ3: reduce((sum, n) => sum + n, 0)
         合計を計算:
         初期値: 0
         0 + 4 = 4
         4 + 8 = 12
         12 + 12 = 24
         24 + 16 = 40
         40 + 20 = 60
         出力: 60

最終結果: 60
```

---

## 関数合成の基礎

小さな関数を組み合わせて、新しい関数を作ることを**関数合成**（Function Composition）といいます。

### 手動での関数合成

```javascript
// 小さな関数を定義
const trim = function(str) {
  return str.trim();
};

const toLowerCase = function(str) {
  return str.toLowerCase();
};

const removeSpaces = function(str) {
  return str.replace(/\s+/g, '');
};

// 関数を合成して新しい関数を作る
const normalizeString = function(str) {
  const step1 = trim(str);           // 前後の空白削除
  const step2 = toLowerCase(step1);  // 小文字化
  const step3 = removeSpaces(step2); // 空白削除
  return step3;
};

// 使用例
console.log(normalizeString('  Hello World  ')); // => 'helloworld'
```

### compose関数の作成

複数の関数を自動的に合成する`compose`関数を作成できます。

```javascript
// compose関数: 右から左に関数を適用
const compose = function(f, g, h) {
  return function(value) {
    return f(g(h(value)));
  };
};

// 関数を合成
const normalizeString = compose(
  removeSpaces,
  toLowerCase,
  trim
);

// 使用例
console.log(normalizeString('  Hello World  ')); // => 'helloworld'
```

### 実行フローの詳細

```
compose(removeSpaces, toLowerCase, trim)('  Hello World  ') の実行：

入力: '  Hello World  '

ステップ1: trim('  Hello World  ')
         前後の空白を削除
         出力: 'Hello World'

ステップ2: toLowerCase('Hello World')
         小文字に変換
         出力: 'hello world'

ステップ3: removeSpaces('hello world')
         空白を削除
         出力: 'helloworld'

最終結果: 'helloworld'

データの流れ:
  '  Hello World  '
    ↓ trim
  'Hello World'
    ↓ toLowerCase
  'hello world'
    ↓ removeSpaces
  'helloworld'
```

---

## 実践例1: ユーザーデータ処理パイプライン

ユーザーデータを段階的に処理するシステムです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ユーザーデータ処理パイプライン</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 900px;
      margin: 50px auto;
      padding: 20px;
    }
    .pipeline-step {
      margin: 20px 0;
      padding: 20px;
      border: 2px solid #3498db;
      border-radius: 8px;
      background-color: #ecf0f1;
    }
    .step-title {
      font-weight: bold;
      color: #2c3e50;
      margin-bottom: 10px;
    }
    .arrow {
      text-align: center;
      font-size: 24px;
      color: #3498db;
      margin: 10px 0;
    }
    pre {
      background-color: white;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
    }
    button {
      padding: 12px 24px;
      background-color: #27ae60;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background-color: #229954;
    }
  </style>
</head>
<body>
  <h1>🔄 ユーザーデータ処理パイプライン</h1>

  <button onclick="runPipeline()">パイプライン実行</button>

  <div id="pipeline"></div>

  <script>
    // ========================================
    // パイプライン処理関数群（小さな関数）
    // ========================================

    // ステップ1: 名前を正規化
    const normalizeName = function(user) {
      return {
        ...user,
        name: user.name.trim().toLowerCase()
      };
    };

    // ステップ2: メールアドレスを正規化
    const normalizeEmail = function(user) {
      return {
        ...user,
        email: user.email.toLowerCase()
      };
    };

    // ステップ3: 年齢を計算
    const calculateAge = function(user) {
      const birthYear = new Date(user.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      return {
        ...user,
        age: currentYear - birthYear
      };
    };

    // ステップ4: アクティブユーザーをフィルタ
    const filterActive = function(users) {
      return users.filter(function(user) {
        return user.active === true;
      });
    };

    // ステップ5: 年齢で並べ替え
    const sortByAge = function(users) {
      return users.slice().sort(function(a, b) {
        return a.age - b.age;
      });
    };

    // ========================================
    // パイプライン実行
    // ========================================

    function runPipeline() {
      // 元データ
      const rawUsers = [
        { name: '  TARO yamada  ', email: 'TARO@EXAMPLE.COM', birthDate: '2000-05-15', active: true },
        { name: 'hanako SATO', email: 'Hanako@Example.com', birthDate: '1995-08-20', active: true },
        { name: 'ichiro  TANAKA', email: 'ICHIRO@example.COM', birthDate: '2002-03-10', active: false },
        { name: 'misaki  ito  ', email: 'MISAKI@EXAMPLE.com', birthDate: '1998-11-25', active: true }
      ];

      let html = '';

      // ステップ1: 名前を正規化
      html += '<div class="pipeline-step">';
      html += '<div class="step-title">ステップ1: 名前を正規化</div>';
      const step1 = rawUsers.map(normalizeName);
      html += '<pre>' + JSON.stringify(step1, null, 2) + '</pre>';
      html += '</div>';
      html += '<div class="arrow">↓</div>';

      // ステップ2: メールアドレスを正規化
      html += '<div class="pipeline-step">';
      html += '<div class="step-title">ステップ2: メールアドレスを正規化</div>';
      const step2 = step1.map(normalizeEmail);
      html += '<pre>' + JSON.stringify(step2, null, 2) + '</pre>';
      html += '</div>';
      html += '<div class="arrow">↓</div>';

      // ステップ3: 年齢を計算
      html += '<div class="pipeline-step">';
      html += '<div class="step-title">ステップ3: 年齢を計算</div>';
      const step3 = step2.map(calculateAge);
      html += '<pre>' + JSON.stringify(step3, null, 2) + '</pre>';
      html += '</div>';
      html += '<div class="arrow">↓</div>';

      // ステップ4: アクティブユーザーをフィルタ
      html += '<div class="pipeline-step">';
      html += '<div class="step-title">ステップ4: アクティブユーザーをフィルタ</div>';
      const step4 = filterActive(step3);
      html += '<pre>' + JSON.stringify(step4, null, 2) + '</pre>';
      html += '</div>';
      html += '<div class="arrow">↓</div>';

      // ステップ5: 年齢で並べ替え
      html += '<div class="pipeline-step">';
      html += '<div class="step-title">ステップ5: 年齢で並べ替え</div>';
      const step5 = sortByAge(step4);
      html += '<pre>' + JSON.stringify(step5, null, 2) + '</pre>';
      html += '</div>';

      document.getElementById('pipeline').innerHTML = html;

      // メソッドチェーン版（同じ処理を1つの式で）
      console.log('=== メソッドチェーン版 ===');
      const result = rawUsers
        .map(normalizeName)
        .map(normalizeEmail)
        .map(calculateAge)
        .filter(user => user.active)
        .sort((a, b) => a.age - b.age);
      console.log(result);
    }
  </script>
</body>
</html>
```

---

## 実践例2: テキスト処理パイプライン

テキストを段階的に加工するパイプラインシステムです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>テキスト処理パイプライン</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }
    .processor {
      margin: 20px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    textarea {
      width: 100%;
      height: 100px;
      padding: 10px;
      font-family: monospace;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
      margin: 10px 0;
    }
    button {
      padding: 10px 20px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin: 5px;
    }
    .result {
      background-color: white;
      padding: 15px;
      border: 2px solid #27ae60;
      border-radius: 4px;
      margin: 10px 0;
      white-space: pre-wrap;
      font-family: monospace;
    }
    .step-log {
      background-color: #ecf0f1;
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <h1>📝 テキスト処理パイプライン</h1>

  <div class="processor">
    <h3>入力テキスト</h3>
    <textarea id="input" placeholder="テキストを入力してください">  Hello   World!
This is   a TEST.
  Remove   extra   SPACES.  </textarea>

    <button onclick="processPipeline1()">パイプライン1: 基本整形</button>
    <button onclick="processPipeline2()">パイプライン2: URL化</button>
    <button onclick="processPipeline3()">パイプライン3: 統計情報</button>

    <div id="stepLog" class="step-log"></div>
    <div id="result" class="result"></div>
  </div>

  <script>
    // ========================================
    // テキスト処理関数群
    // ========================================

    // 前後の空白を削除
    const trim = function(text) {
      console.log('trim:', text);
      return text.trim();
    };

    // 連続する空白を1つに
    const normalizeSpaces = function(text) {
      console.log('normalizeSpaces:', text);
      return text.replace(/\s+/g, ' ');
    };

    // 小文字に変換
    const toLowerCase = function(text) {
      console.log('toLowerCase:', text);
      return text.toLowerCase();
    };

    // 句読点を削除
    const removePunctuation = function(text) {
      console.log('removePunctuation:', text);
      return text.replace(/[.,!?]/g, '');
    };

    // 空白をハイフンに変換
    const spacesToHyphens = function(text) {
      console.log('spacesToHyphens:', text);
      return text.replace(/\s+/g, '-');
    };

    // 単語数をカウント
    const countWords = function(text) {
      const words = text.trim().split(/\s+/);
      return words.length;
    };

    // 文字数をカウント
    const countCharacters = function(text) {
      return text.length;
    };

    // ========================================
    // パイプライン処理
    // ========================================

    // パイプライン1: 基本整形
    function processPipeline1() {
      const input = document.getElementById('input').value;

      console.clear();
      console.log('=== パイプライン1: 基本整形 ===');

      // 段階的に処理
      const step1 = trim(input);
      const step2 = normalizeSpaces(step1);
      const result = step2;

      // ステップログ
      let log = '';
      log += '入力: ' + JSON.stringify(input) + '\n';
      log += '↓ trim()\n';
      log += 'ステップ1: ' + JSON.stringify(step1) + '\n';
      log += '↓ normalizeSpaces()\n';
      log += 'ステップ2: ' + JSON.stringify(step2) + '\n';

      document.getElementById('stepLog').textContent = log;
      document.getElementById('result').textContent = result;
    }

    // パイプライン2: URL化
    function processPipeline2() {
      const input = document.getElementById('input').value;

      console.clear();
      console.log('=== パイプライン2: URL化 ===');

      // メソッドチェーンで処理
      const result = [input]
        .map(trim)[0]
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      // または関数合成
      const step1 = trim(input);
      const step2 = toLowerCase(step1);
      const step3 = normalizeSpaces(step2);
      const step4 = spacesToHyphens(step3);
      const step5 = removePunctuation(step4);

      let log = '';
      log += '入力: ' + JSON.stringify(input) + '\n';
      log += '↓ trim → toLowerCase → normalizeSpaces → spacesToHyphens → removePunctuation\n';
      log += '結果: ' + JSON.stringify(step5) + '\n';

      document.getElementById('stepLog').textContent = log;
      document.getElementById('result').textContent = step5;
    }

    // パイプライン3: 統計情報
    function processPipeline3() {
      const input = document.getElementById('input').value;

      console.clear();
      console.log('=== パイプライン3: 統計情報 ===');

      // 正規化してから統計を取る
      const normalized = normalizeSpaces(trim(input));
      const wordCount = countWords(normalized);
      const charCount = countCharacters(normalized);

      const result = `
統計情報:
- 文字数: ${charCount}
- 単語数: ${wordCount}
- 平均単語長: ${(charCount / wordCount).toFixed(2)}

正規化後のテキスト:
${normalized}
      `;

      let log = '';
      log += '処理フロー:\n';
      log += '1. trim() → 前後の空白削除\n';
      log += '2. normalizeSpaces() → 連続空白を1つに\n';
      log += '3. countWords() → 単語数カウント\n';
      log += '4. countCharacters() → 文字数カウント\n';

      document.getElementById('stepLog').textContent = log;
      document.getElementById('result').textContent = result;
    }
  </script>
</body>
</html>
```

---

## 実践例3: データ変換パイプライン

商品データを段階的に変換し、最終的な表示データを作成します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>データ変換パイプライン</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 1000px;
      margin: 50px auto;
      padding: 20px;
    }
    .pipeline-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin: 20px 0;
    }
    .stage {
      padding: 15px;
      border: 2px solid #3498db;
      border-radius: 8px;
      background-color: #ecf0f1;
    }
    .stage h4 {
      margin-top: 0;
      color: #2c3e50;
    }
    .product-item {
      background-color: white;
      padding: 10px;
      margin: 5px 0;
      border-radius: 4px;
      font-size: 12px;
    }
    button {
      padding: 12px 24px;
      background-color: #27ae60;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    .final-result {
      margin-top: 20px;
      padding: 20px;
      background-color: #27ae60;
      color: white;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <h1>🏭 データ変換パイプライン</h1>

  <button onclick="runTransformPipeline()">パイプライン実行</button>

  <div id="pipelineViz" class="pipeline-container"></div>
  <div id="finalResult" class="final-result"></div>

  <script>
    // ========================================
    // 変換関数群（各ステージ）
    // ========================================

    // ステージ1: 税込価格を計算
    const addTax = function(products) {
      return products.map(function(product) {
        return {
          ...product,
          priceWithTax: Math.floor(product.price * 1.1)
        };
      });
    };

    // ステージ2: 小計を計算
    const calculateSubtotal = function(products) {
      return products.map(function(product) {
        return {
          ...product,
          subtotal: product.priceWithTax * product.quantity
        };
      });
    };

    // ステージ3: 在庫切れを除外
    const filterInStock = function(products) {
      return products.filter(function(product) {
        return product.inStock === true;
      });
    };

    // ステージ4: 価格で並べ替え
    const sortByPrice = function(products) {
      return products.slice().sort(function(a, b) {
        return b.subtotal - a.subtotal;
      });
    };

    // ステージ5: 表示用にフォーマット
    const formatForDisplay = function(products) {
      return products.map(function(product) {
        return {
          name: product.name,
          displayPrice: '¥' + product.priceWithTax.toLocaleString(),
          displaySubtotal: '¥' + product.subtotal.toLocaleString(),
          quantity: product.quantity + '個'
        };
      });
    };

    // 合計金額を計算
    const calculateTotal = function(products) {
      return products.reduce(function(sum, product) {
        return sum + product.subtotal;
      }, 0);
    };

    // ========================================
    // パイプライン実行
    // ========================================

    function runTransformPipeline() {
      // 元データ
      const rawProducts = [
        { name: 'ノートPC', price: 80000, quantity: 2, inStock: true },
        { name: 'マウス', price: 2000, quantity: 5, inStock: true },
        { name: 'キーボード', price: 5000, quantity: 3, inStock: false },
        { name: 'モニター', price: 30000, quantity: 1, inStock: true },
        { name: 'USBケーブル', price: 500, quantity: 10, inStock: true }
      ];

      // パイプライン実行（段階的）
      const stage1 = addTax(rawProducts);
      const stage2 = calculateSubtotal(stage1);
      const stage3 = filterInStock(stage2);
      const stage4 = sortByPrice(stage3);
      const stage5 = formatForDisplay(stage4);

      // 合計金額
      const total = calculateTotal(stage4);

      // 可視化
      let html = '';

      // ステージ1
      html += '<div class="stage">';
      html += '<h4>ステージ1: 税込価格</h4>';
      stage1.forEach(p => {
        html += `<div class="product-item">${p.name}: ¥${p.price} → ¥${p.priceWithTax}</div>`;
      });
      html += '</div>';

      // ステージ2
      html += '<div class="stage">';
      html += '<h4>ステージ2: 小計計算</h4>';
      stage2.forEach(p => {
        html += `<div class="product-item">${p.name}: ¥${p.priceWithTax} × ${p.quantity} = ¥${p.subtotal.toLocaleString()}</div>`;
      });
      html += '</div>';

      // ステージ3
      html += '<div class="stage">';
      html += '<h4>ステージ3: 在庫フィルタ</h4>';
      stage3.forEach(p => {
        html += `<div class="product-item">${p.name}: ¥${p.subtotal.toLocaleString()}</div>`;
      });
      html += '</div>';

      document.getElementById('pipelineViz').innerHTML = html;

      // 最終結果
      let resultHTML = '<h3>最終結果</h3>';
      stage5.forEach(p => {
        resultHTML += `<div>${p.name}: ${p.displayPrice} × ${p.quantity} = ${p.displaySubtotal}</div>`;
      });
      resultHTML += `<h2>合計: ¥${total.toLocaleString()}</h2>`;

      document.getElementById('finalResult').innerHTML = resultHTML;

      // メソッドチェーン版をコンソールに表示
      console.log('=== メソッドチェーン版 ===');
      const result = rawProducts
        .map(p => ({ ...p, priceWithTax: Math.floor(p.price * 1.1) }))
        .map(p => ({ ...p, subtotal: p.priceWithTax * p.quantity }))
        .filter(p => p.inStock)
        .sort((a, b) => b.subtotal - a.subtotal);
      console.log(result);
    }
  </script>
</body>
</html>
```

---

## 練習問題

### 練習問題1: シンプルなパイプライン（基本）

文字列を変換するパイプラインを作成してください。

**要件**：
- trim → toLowerCase → replace (空白→ハイフン)

```javascript
// 関数を作成してください
const trim = function(str) {
  // ここにコードを書く
};

const toLowerCase = function(str) {
  // ここにコードを書く
};

const spacesToHyphens = function(str) {
  // ここにコードを書く
};

// パイプラインで処理
const input = '  Hello World  ';
const result = spacesToHyphens(toLowerCase(trim(input)));

console.log(result); // => 'hello-world'
```

<details>
<summary>💡 ヒント</summary>

各関数は1つの処理だけを行います：
- `trim()`: `str.trim()`
- `toLowerCase()`: `str.toLowerCase()`
- `spacesToHyphens()`: `str.replace(/\s+/g, '-')`

パイプラインは内側から外側に実行されます。
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
const trim = function(str) {
  return str.trim();
};

const toLowerCase = function(str) {
  return str.toLowerCase();
};

const spacesToHyphens = function(str) {
  return str.replace(/\s+/g, '-');
};

// パイプラインで処理
const input = '  Hello World  ';

// 方法1: ネスト
const result1 = spacesToHyphens(toLowerCase(trim(input)));
console.log(result1); // => 'hello-world'

// 方法2: 段階的
const step1 = trim(input);           // '  Hello World  ' → 'Hello World'
const step2 = toLowerCase(step1);    // 'Hello World' → 'hello world'
const step3 = spacesToHyphens(step2); // 'hello world' → 'hello-world'
console.log(step3); // => 'hello-world'

// 実行フロー:
//
// 入力: '  Hello World  '
//   ↓ trim()
// 'Hello World'
//   ↓ toLowerCase()
// 'hello world'
//   ↓ spacesToHyphens()
// 'hello-world'
```
</details>

---

### 練習問題2: 配列処理パイプライン（応用）

配列を段階的に処理するパイプラインを作成してください。

**要件**：
1. 偶数のみフィルタ
2. 2倍にする
3. 10以上のみフィルタ
4. 合計を求める

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// メソッドチェーンで処理してください
const result = numbers
  // ここにコードを書く

console.log(result); // => 60
```

<details>
<summary>💡 ヒント</summary>

メソッドチェーン:
```javascript
numbers
  .filter(n => n % 2 === 0)  // 偶数フィルタ
  .map(n => n * 2)            // 2倍
  .filter(n => n >= 10)       // 10以上
  .reduce((sum, n) => sum + n, 0)  // 合計
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = numbers
  .filter(function(n) { return n % 2 === 0; })      // [2, 4, 6, 8, 10]
  .map(function(n) { return n * 2; })                // [4, 8, 12, 16, 20]
  .filter(function(n) { return n >= 10; })           // [12, 16, 20]
  .reduce(function(sum, n) { return sum + n; }, 0);  // 48

console.log(result); // => 48

// 実行フロー:
//
// 入力: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//   ↓ filter(偶数のみ)
// [2, 4, 6, 8, 10]
//   ↓ map(2倍)
// [4, 8, 12, 16, 20]
//   ↓ filter(10以上)
// [12, 16, 20]
//   ↓ reduce(合計)
// 48

// 詳細なステップ:
console.log('=== ステップごとの処理 ===');
const step1 = numbers.filter(n => n % 2 === 0);
console.log('ステップ1（偶数）:', step1);

const step2 = step1.map(n => n * 2);
console.log('ステップ2（2倍）:', step2);

const step3 = step2.filter(n => n >= 10);
console.log('ステップ3（10以上）:', step3);

const step4 = step3.reduce((sum, n) => sum + n, 0);
console.log('ステップ4（合計）:', step4);
```
</details>

---

### 練習問題3: カスタムパイプライン関数（発展）

複数の関数を受け取り、順番に実行するpipeline関数を作成してください。

**要件**：
- 可変長引数で関数を受け取る
- 初期値から順番に各関数を適用
- 最終結果を返す

```javascript
// pipeline関数を作成してください
const pipeline = function(initialValue, ...functions) {
  // ここにコードを書く
};

// テスト用の関数
const add10 = n => n + 10;
const double = n => n * 2;
const square = n => n * n;

// 使用例
const result = pipeline(5, add10, double, square);
console.log(result); // => ((5 + 10) * 2) ^ 2 = 900
```

<details>
<summary>💡 ヒント</summary>

`reduce`を使って順番に関数を適用：
```javascript
const pipeline = function(initialValue, ...functions) {
  return functions.reduce(function(value, fn) {
    return fn(value);
  }, initialValue);
};
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
// pipeline関数の実装
const pipeline = function(initialValue, ...functions) {
  return functions.reduce(function(value, fn) {
    return fn(value);
  }, initialValue);
};

// テスト用の関数
const add10 = function(n) {
  console.log(`add10(${n}) = ${n + 10}`);
  return n + 10;
};

const double = function(n) {
  console.log(`double(${n}) = ${n * 2}`);
  return n * 2;
};

const square = function(n) {
  console.log(`square(${n}) = ${n * n}`);
  return n * n;
};

// 使用例
console.log('=== パイプライン実行 ===');
const result = pipeline(5, add10, double, square);
console.log('最終結果:', result); // => 900

// 実行フロー:
//
// 初期値: 5
//   ↓ add10(5)
// 15
//   ↓ double(15)
// 30
//   ↓ square(30)
// 900
//
// 最終結果: 900

// 別のテスト
console.log('\n=== 別のパイプライン ===');
const trim = str => str.trim();
const toLowerCase = str => str.toLowerCase();
const reverse = str => str.split('').reverse().join('');

const textResult = pipeline('  HELLO  ', trim, toLowerCase, reverse);
console.log('結果:', textResult); // => 'olleh'

// より複雑な例
console.log('\n=== 配列処理パイプライン ===');
const filterEven = arr => arr.filter(n => n % 2 === 0);
const mapDouble = arr => arr.map(n => n * 2);
const sum = arr => arr.reduce((a, b) => a + b, 0);

const arrayResult = pipeline(
  [1, 2, 3, 4, 5, 6],
  filterEven,  // [2, 4, 6]
  mapDouble,   // [4, 8, 12]
  sum          // 24
);
console.log('結果:', arrayResult); // => 24
```
</details>

---

## まとめ

このレッスンで学んだこと：

### 1. パイプライン処理
- 複数の関数を順番に実行
- 各関数の出力が次の関数の入力に
- データの流れが明確

### 2. 処理の連鎖（メソッドチェーン）
- `filter → map → reduce`
- 配列メソッドを連続して呼び出す
- 読みやすく保守しやすい

### 3. 関数合成
- 小さな関数を組み合わせる
- 各関数は1つの責任だけを持つ
- 再利用可能な部品を作る

### 4. 関数型プログラミングの基礎
- 純粋関数を使う
- データの変換に焦点を当てる
- 宣言的なコードスタイル

### 5. 実践的なパターン
- ユーザーデータ処理
- テキスト処理
- データ変換と集計

**パイプライン処理の利点**：
```
入力データ
  ↓ 関数1
中間データ1
  ↓ 関数2
中間データ2
  ↓ 関数3
最終結果

✓ 各ステップが明確
✓ テストしやすい
✓ 再利用しやすい
✓ バグを見つけやすい
```

---

## カリキュラム要求事項の確認

レッスン131の要求事項：

- ✅ **パイプライン**: 複数の関数を順番に実行する処理方法
- ✅ **処理の連鎖**: メソッドチェーンによるデータ変換
- ✅ **関数合成**: 小さな関数を組み合わせて複雑な処理を作る
- ✅ **知識**: 関数型プログラミングの基礎、データフロー
- ✅ **成果物**: 関数パイプライン（ユーザーデータ処理、テキスト処理、データ変換）

すべての要求事項を満たしています！

---

## 次のステップ

次のレッスンでは、**エラーハンドリング**（エラーチェック、デフォルト値、安全な関数）について学びます。

**予告**：
- エラーチェックの方法
- デフォルト値の設定
- 安全な関数の設計
- 防御的プログラミング

**なぜ重要か**：
関数の組み合わせでデータを処理できるようになったら、次はエラーに対処する技術が必要です。エラーハンドリングは、堅牢で信頼性の高いアプリケーションを作るための必須スキルです！
