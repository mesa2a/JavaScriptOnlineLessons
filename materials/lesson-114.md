# Lesson 114: 関数から関数を呼び出す

> **レッスン日**: 2025-11-26

## このレッスンで学ぶこと

### 前回の復習
レッスン113では、**複数の処理**を関数内で実行する方法を学びました。条件分岐やループを使って、順番に複数の処理を実行できるようになりました。

```javascript
function calculateStats(numbers) {
  // 処理1: 入力チェック
  if (numbers.length === 0) {
    return;
  }

  // 処理2: 合計を計算
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  // 処理3: 平均を計算
  const average = sum / numbers.length;

  // 処理4: 結果を表示
  console.log('平均: ' + average);
}
```

### よくある場面
「同じ処理を何度も書くのは面倒」「処理が複雑になってきて分かりにくい」「一部の処理だけを別の場所でも使いたい」という場面はよくあります。

たとえば、ショッピングサイトの合計金額計算を考えてみましょう：
```javascript
// ❌ 1つの関数に全部詰め込む（読みにくい）
function calculateTotal(price) {
  // 消費税計算
  const tax = price * 0.1;
  const priceWithTax = price + tax;

  // 送料計算
  let shipping = 0;
  if (priceWithTax < 3000) {
    shipping = 500;
  }

  // ポイント計算
  const points = Math.floor(priceWithTax * 0.01);

  // 合計
  const total = priceWithTax + shipping;

  return { total: total, points: points };
}
```

関数を分割すれば、もっと分かりやすくなります：
```javascript
// ✅ 処理を関数に分割（読みやすい、再利用可能）
function addTax(price) {
  return price * 1.1;
}

function calculateShipping(price) {
  return price < 3000 ? 500 : 0;
}

function calculatePoints(price) {
  return Math.floor(price * 0.01);
}

function calculateTotal(price) {
  const priceWithTax = addTax(price);        // 関数を呼び出す
  const shipping = calculateShipping(priceWithTax);  // 関数を呼び出す
  const points = calculatePoints(priceWithTax);      // 関数を呼び出す
  const total = priceWithTax + shipping;

  return { total: total, points: points };
}
```

### 学習目標
このレッスンでは、次のことができるようになります：
1. **関数の中から別の関数を呼び出す**方法を理解する
2. 処理を**小さな関数に分割**して、コードを読みやすくする
3. 関数を**再利用**して、重複を避ける
4. **単一責任の原則**を理解し、1つの関数は1つの仕事だけをするようにする

---

## 1. 関数から関数を呼び出す基本

### 日常生活のアナロジー: 会社の組織

関数から関数を呼び出す仕組みは、会社の組織に似ています：

```
┌─────────────────────────────────────┐
│         社長（メイン関数）            │
│                                     │
│  「プロジェクトを完成させる」          │
│         ↓                           │
│  ┌────────────────────────┐        │
│  │ 部長に指示を出す          │        │
│  └────────────────────────┘        │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│         部長（サブ関数1）             │
│                                     │
│  「デザインを作成する」               │
│         ↓                           │
│  ┌────────────────────────┐        │
│  │ デザイナーに指示を出す    │        │
│  └────────────────────────┘        │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│      デザイナー（サブ関数2）          │
│                                     │
│  「ロゴを作成する」                   │
│  「色を決める」                       │
└─────────────────────────────────────┘

重要なポイント:
- 各役職は自分の責任範囲の仕事をする
- 上位の人は下位の人に仕事を任せる
- 全員が協力して、大きな目標を達成する
```

### プログラミングでの関数呼び出し

```javascript
// デザイナー（最も小さな関数）
function createLogo() {
  return '🎨 ロゴ';
}

function chooseColor() {
  return '青色';
}

// 部長（中間の関数）
function createDesign() {
  const logo = createLogo();      // デザイナーに依頼
  const color = chooseColor();    // デザイナーに依頼
  return logo + ' (' + color + ')';
}

// 社長（メインの関数）
function completeProject() {
  const design = createDesign();  // 部長に依頼
  console.log('プロジェクト完成: ' + design);
  return design;
}

completeProject();  // "プロジェクト完成: 🎨 ロゴ (青色)"
```

### 実行フロー
```
completeProject() を呼び出す
  ↓
createDesign() を呼び出す
  ↓
  createLogo() を呼び出す
    ↓
    return '🎨 ロゴ'
  ↓
  logo = '🎨 ロゴ'
  ↓
  chooseColor() を呼び出す
    ↓
    return '青色'
  ↓
  color = '青色'
  ↓
  return '🎨 ロゴ (青色)'
  ↓
design = '🎨 ロゴ (青色)'
  ↓
console.log('プロジェクト完成: 🎨 ロゴ (青色)')
  ↓
return design
```

---

## 2. なぜ関数を分割するのか？

### 理由1: コードが読みやすくなる

**❌ 分割しない場合**:
```javascript
function processOrder(price, quantity) {
  // 小計を計算
  const subtotal = price * quantity;

  // 消費税を計算
  const tax = subtotal * 0.1;
  const totalWithTax = subtotal + tax;

  // 送料を計算
  let shipping = 0;
  if (totalWithTax < 3000) {
    shipping = 500;
  } else if (totalWithTax < 5000) {
    shipping = 300;
  } else {
    shipping = 0;
  }

  // ポイントを計算
  const points = Math.floor(totalWithTax * 0.01);

  // 割引を計算
  let discount = 0;
  if (totalWithTax >= 10000) {
    discount = totalWithTax * 0.1;
  } else if (totalWithTax >= 5000) {
    discount = totalWithTax * 0.05;
  }

  // 最終金額を計算
  const finalTotal = totalWithTax + shipping - discount;

  return {
    subtotal: subtotal,
    tax: tax,
    shipping: shipping,
    points: points,
    discount: discount,
    total: finalTotal
  };
}
```

**✅ 分割した場合**:
```javascript
// 小計を計算する関数
function calculateSubtotal(price, quantity) {
  return price * quantity;
}

// 消費税を計算する関数
function calculateTax(subtotal) {
  return subtotal * 0.1;
}

// 送料を計算する関数
function calculateShipping(total) {
  if (total < 3000) return 500;
  if (total < 5000) return 300;
  return 0;
}

// ポイントを計算する関数
function calculatePoints(total) {
  return Math.floor(total * 0.01);
}

// 割引を計算する関数
function calculateDiscount(total) {
  if (total >= 10000) return total * 0.1;
  if (total >= 5000) return total * 0.05;
  return 0;
}

// 全体をまとめる関数
function processOrder(price, quantity) {
  const subtotal = calculateSubtotal(price, quantity);
  const tax = calculateTax(subtotal);
  const totalWithTax = subtotal + tax;
  const shipping = calculateShipping(totalWithTax);
  const points = calculatePoints(totalWithTax);
  const discount = calculateDiscount(totalWithTax);
  const finalTotal = totalWithTax + shipping - discount;

  return {
    subtotal: subtotal,
    tax: tax,
    shipping: shipping,
    points: points,
    discount: discount,
    total: finalTotal
  };
}
```

**メリット**:
- 各関数の名前を見れば、何をしているか一目で分かる
- 各関数が短く、理解しやすい
- バグを見つけやすい
- 修正が簡単

### 理由2: 関数を再利用できる

```javascript
// 消費税を計算する関数（再利用可能）
function addTax(price) {
  return price * 1.1;
}

// 様々な場所で使える
const price1 = addTax(1000);  // 1100
const price2 = addTax(2500);  // 2750
const price3 = addTax(500);   // 550

// 配列の各要素に適用
const prices = [1000, 2000, 3000];
for (let i = 0; i < prices.length; i++) {
  const taxIncluded = addTax(prices[i]);
  console.log(taxIncluded);
}
```

### 理由3: テストしやすくなる

```javascript
// 小さな関数は、個別にテストできる
function calculateDiscount(total) {
  if (total >= 10000) return total * 0.1;
  if (total >= 5000) return total * 0.05;
  return 0;
}

// テスト
console.log(calculateDiscount(15000));  // 1500（正しい）
console.log(calculateDiscount(7000));   // 350（正しい）
console.log(calculateDiscount(3000));   // 0（正しい）
```

---

## 3. 実行フローの詳細な理解

### 基本的な呼び出し

```javascript
function greet(name) {
  return 'こんにちは、' + name + 'さん';
}

function showMessage(name) {
  const message = greet(name);  // greet関数を呼び出す
  console.log(message);
  return message;
}

showMessage('太郎');
```

### 実行フロー図解
```
ステップ1: showMessage('太郎') を呼び出す
  ┌────────────────────────┐
  │ showMessage関数に入る   │
  │ name = '太郎'          │
  └────────────────────────┘
  ↓
ステップ2: greet('太郎') を呼び出す
  ┌────────────────────────┐
  │ greet関数に入る         │
  │ name = '太郎'          │
  │ ↓                      │
  │ return 'こんにちは、太郎さん' │
  └────────────────────────┘
  ↓
ステップ3: greet関数から戻る
  message = 'こんにちは、太郎さん'
  ↓
ステップ4: showMessage関数内の処理を続ける
  console.log('こんにちは、太郎さん')
  ↓
  return 'こんにちは、太郎さん'
  ↓
ステップ5: showMessage関数から戻る
  関数終了
```

### 複数の関数を呼び出す

```javascript
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function calculate(x, y) {
  const sum = add(x, y);          // add関数を呼び出す
  const product = multiply(x, y);  // multiply関数を呼び出す
  const result = add(sum, product); // add関数を再度呼び出す
  return result;
}

const answer = calculate(3, 4);
console.log(answer);  // 19（3+4 + 3×4 = 7 + 12 = 19）
```

### 実行フロー図解
```
calculate(3, 4) を呼び出す
  ↓
ステップ1: add(3, 4) を呼び出す
  3 + 4 = 7
  ↓
  sum = 7
  ↓
ステップ2: multiply(3, 4) を呼び出す
  3 × 4 = 12
  ↓
  product = 12
  ↓
ステップ3: add(7, 12) を呼び出す
  7 + 12 = 19
  ↓
  result = 19
  ↓
return 19
  ↓
answer = 19
```

---

## 4. 単一責任の原則

各関数は**1つの仕事だけ**をするべきです。これを「単一責任の原則」といいます。

### ❌ 悪い例: 複数の責任を持つ関数

```javascript
function processUser(name, age) {
  // 責任1: 入力チェック
  if (!name || age < 0) {
    alert('エラー');
    return;
  }

  // 責任2: データの整形
  const formattedName = name.toUpperCase();

  // 責任3: メッセージの作成
  const message = formattedName + 'さんは' + age + '歳です';

  // 責任4: 画面への表示
  alert(message);

  // 責任5: ログの記録
  console.log('処理完了: ' + message);
}
```

### ✅ 良い例: 各関数が1つの責任を持つ

```javascript
// 責任1: 入力チェック
function validateInput(name, age) {
  if (!name || age < 0) {
    return false;
  }
  return true;
}

// 責任2: データの整形
function formatName(name) {
  return name.toUpperCase();
}

// 責任3: メッセージの作成
function createMessage(name, age) {
  return name + 'さんは' + age + '歳です';
}

// 責任4: 画面への表示
function displayMessage(message) {
  alert(message);
}

// 責任5: ログの記録
function logMessage(message) {
  console.log('処理完了: ' + message);
}

// すべてを統合する関数
function processUser(name, age) {
  // 各関数を呼び出す
  if (!validateInput(name, age)) {
    alert('エラー');
    return;
  }

  const formattedName = formatName(name);
  const message = createMessage(formattedName, age);
  displayMessage(message);
  logMessage(message);
}
```

**メリット**:
- 各関数がシンプルで理解しやすい
- テストしやすい
- 修正が必要なとき、該当する関数だけを変更すればよい
- 関数を他の場所でも再利用できる

---

## 5. 完全なアプリ例: 注文管理システム

関数の分割と再利用を活用した実用的なアプリを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>注文管理システム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 700px;
      margin: 50px auto;
      padding: 20px;
      background: #f0f0f0;
    }

    .container {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }

    .input-section {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 5px;
      margin-bottom: 20px;
    }

    .input-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }

    input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
    }

    button {
      width: 100%;
      padding: 15px;
      font-size: 18px;
      font-weight: bold;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }

    button:hover {
      background: #45a049;
    }

    .result {
      background: #E8F5E9;
      padding: 20px;
      border-radius: 5px;
      margin-top: 20px;
      display: none;
    }

    .result.show {
      display: block;
    }

    .result-row {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #ddd;
      font-size: 16px;
    }

    .result-row:last-child {
      border-bottom: none;
    }

    .total-row {
      font-size: 24px;
      font-weight: bold;
      color: #2E7D32;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 2px solid #2E7D32;
    }

    .label {
      font-weight: bold;
    }

    .value {
      color: #555;
    }

    .highlight {
      color: #f44336;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🛍️ 注文管理システム</h1>

    <div class="input-section">
      <h2>商品情報を入力</h2>

      <div class="input-group">
        <label>商品価格（円）:</label>
        <input type="number" id="price" value="5000" min="0">
      </div>

      <div class="input-group">
        <label>数量:</label>
        <input type="number" id="quantity" value="1" min="1">
      </div>

      <button onclick="processOrder()">注文を計算</button>
    </div>

    <div id="result" class="result"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
// ========================================
// 小さな関数（それぞれが1つの責任を持つ）
// ========================================

// 小計を計算する関数
function calculateSubtotal(price, quantity) {
  return price * quantity;
}

// 消費税を計算する関数
function calculateTax(subtotal) {
  const TAX_RATE = 0.1;  // 10%
  return subtotal * TAX_RATE;
}

// 税込価格を計算する関数
function addTaxToSubtotal(subtotal) {
  const tax = calculateTax(subtotal);  // calculateTax関数を呼び出す
  return subtotal + tax;
}

// 送料を計算する関数
function calculateShipping(totalWithTax) {
  if (totalWithTax >= 5000) {
    return 0;  // 5000円以上は送料無料
  } else if (totalWithTax >= 3000) {
    return 300;  // 3000円以上は300円
  } else {
    return 500;  // それ以外は500円
  }
}

// 割引を計算する関数
function calculateDiscount(totalWithTax) {
  if (totalWithTax >= 10000) {
    return totalWithTax * 0.1;  // 10%割引
  } else if (totalWithTax >= 5000) {
    return totalWithTax * 0.05;  // 5%割引
  } else {
    return 0;  // 割引なし
  }
}

// ポイントを計算する関数
function calculatePoints(totalWithTax) {
  return Math.floor(totalWithTax * 0.01);  // 1%ポイント還元
}

// ========================================
// 中規模の関数（小さな関数を組み合わせる）
// ========================================

// 注文の詳細を計算する関数
function calculateOrderDetails(price, quantity) {
  // 各関数を呼び出して計算
  const subtotal = calculateSubtotal(price, quantity);
  const tax = calculateTax(subtotal);
  const totalWithTax = addTaxToSubtotal(subtotal);
  const shipping = calculateShipping(totalWithTax);
  const discount = calculateDiscount(totalWithTax);
  const points = calculatePoints(totalWithTax);
  const finalTotal = totalWithTax + shipping - discount;

  // 結果をオブジェクトとして返す
  return {
    subtotal: subtotal,
    tax: tax,
    totalWithTax: totalWithTax,
    shipping: shipping,
    discount: discount,
    points: points,
    finalTotal: finalTotal
  };
}

// ========================================
// 表示関連の関数
// ========================================

// 金額を表示用にフォーマットする関数
function formatCurrency(amount) {
  return '¥' + amount.toLocaleString();
}

// 結果のHTML要素を作成する関数
function createResultRow(label, value, isHighlight) {
  const className = isHighlight ? 'highlight' : 'value';
  return '<div class="result-row">' +
         '<span class="label">' + label + ':</span>' +
         '<span class="' + className + '">' + value + '</span>' +
         '</div>';
}

// 結果を表示する関数
function displayOrderResult(details) {
  let html = '<h2>注文詳細</h2>';

  html += createResultRow('小計', formatCurrency(details.subtotal), false);
  html += createResultRow('消費税', formatCurrency(details.tax), false);
  html += createResultRow('税込小計', formatCurrency(details.totalWithTax), false);
  html += createResultRow('送料', formatCurrency(details.shipping), false);

  if (details.discount > 0) {
    html += createResultRow('割引', '-' + formatCurrency(details.discount), true);
  }

  html += '<div class="result-row total-row">';
  html += '<span class="label">合計:</span>';
  html += '<span>' + formatCurrency(details.finalTotal) + '</span>';
  html += '</div>';

  html += createResultRow('獲得ポイント', details.points + 'pt', false);

  // 結果を表示
  const resultElement = document.getElementById('result');
  resultElement.innerHTML = html;
  resultElement.classList.add('show');
}

// ========================================
// メインの関数（すべてをまとめる）
// ========================================

// 入力値を取得する関数
function getInputValues() {
  const price = Number(document.getElementById('price').value);
  const quantity = Number(document.getElementById('quantity').value);
  return { price: price, quantity: quantity };
}

// 入力をチェックする関数
function validateInputs(price, quantity) {
  if (price <= 0 || quantity <= 0) {
    alert('正しい値を入力してください');
    return false;
  }
  return true;
}

// 注文を処理する関数（すべての関数を呼び出す）
function processOrder() {
  // 処理1: 入力値を取得
  const inputs = getInputValues();

  // 処理2: 入力をチェック
  if (!validateInputs(inputs.price, inputs.quantity)) {
    return;  // 早期リターン
  }

  // 処理3: 注文詳細を計算
  const details = calculateOrderDetails(inputs.price, inputs.quantity);

  // 処理4: 結果を表示
  displayOrderResult(details);

  // 処理5: コンソールにログを出力
  console.log('注文処理完了:', details);
}
```

### 実行フロー（価格5000円、数量2個の場合）
```
processOrder() を呼び出す
  ↓
処理1: getInputValues() を呼び出す
  price = 5000
  quantity = 2
  inputs = { price: 5000, quantity: 2 }
  ↓
処理2: validateInputs(5000, 2) を呼び出す
  if (5000 <= 0 || 2 <= 0) → false
  return true（検証OK）
  ↓
処理3: calculateOrderDetails(5000, 2) を呼び出す
  ↓
  calculateSubtotal(5000, 2) を呼び出す
    return 10000
    ↓
  subtotal = 10000
    ↓
  calculateTax(10000) を呼び出す
    return 1000
    ↓
  tax = 1000
    ↓
  addTaxToSubtotal(10000) を呼び出す
    calculateTax(10000) → 1000
    return 11000
    ↓
  totalWithTax = 11000
    ↓
  calculateShipping(11000) を呼び出す
    if (11000 >= 5000) → true
    return 0
    ↓
  shipping = 0
    ↓
  calculateDiscount(11000) を呼び出す
    if (11000 >= 10000) → true
    return 1100
    ↓
  discount = 1100
    ↓
  calculatePoints(11000) を呼び出す
    return 110
    ↓
  points = 110
    ↓
  finalTotal = 11000 + 0 - 1100 = 9900
    ↓
  return { subtotal: 10000, tax: 1000, ... }
  ↓
details = { subtotal: 10000, tax: 1000, totalWithTax: 11000,
           shipping: 0, discount: 1100, points: 110, finalTotal: 9900 }
  ↓
処理4: displayOrderResult(details) を呼び出す
  ↓
  formatCurrency(10000) → "¥10,000"
  createResultRow(...) → HTML要素作成
  ... (各行を作成)
  ↓
  画面に結果を表示
  ↓
処理5: コンソールにログ出力
  console.log('注文処理完了:', details)
  ↓
関数終了
```

---

## 6. 練習問題

### 問題1: メッセージカード作成アプリ

入力された名前とメッセージを使って、装飾されたメッセージカードを作成するアプリを作成してください。

**要件**:
1. 名前とメッセージを入力するフォームを作成
2. 以下の関数を作成し、**関数から関数を呼び出す**こと:
   - `createBorder()`: 装飾用の線を返す
   - `createHeader(name)`: 名前を含むヘッダーを返す
   - `createBody(message)`: メッセージ本文を返す
   - `createFooter()`: フッターを返す
   - `createCard(name, message)`: 上記すべての関数を呼び出してカード全体を作成
   - `displayCard()`: カードを画面に表示するメイン関数

**ヒント**:
```javascript
function createBorder() {
  return '━━━━━━━━━━━━━━━━━━━━';
}

function createHeader(name) {
  const border = createBorder();  // 関数を呼び出す
  return border + '\n  親愛なる ' + name + ' さんへ\n' + border;
}

// 残りの関数を実装してください
```

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>メッセージカード作成</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .container {
      background: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }

    .input-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: #555;
    }

    input, textarea {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
      font-family: sans-serif;
    }

    textarea {
      min-height: 100px;
      resize: vertical;
    }

    button {
      width: 100%;
      padding: 15px;
      font-size: 18px;
      font-weight: bold;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: transform 0.2s;
    }

    button:hover {
      transform: translateY(-2px);
    }

    .card-preview {
      margin-top: 30px;
      padding: 30px;
      background: #f9f9f9;
      border-radius: 10px;
      white-space: pre-wrap;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.8;
      display: none;
      border: 3px solid #667eea;
    }

    .card-preview.show {
      display: block;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>💌 メッセージカード作成</h1>

    <div class="input-group">
      <label>宛先の名前:</label>
      <input type="text" id="name" placeholder="例: 太郎">
    </div>

    <div class="input-group">
      <label>メッセージ:</label>
      <textarea id="message" placeholder="例: いつもありがとう！"></textarea>
    </div>

    <button onclick="displayCard()">カードを作成</button>

    <div id="card-preview" class="card-preview"></div>
  </div>

  <script>
    // 装飾用の線を作成する関数
    function createBorder() {
      return '━━━━━━━━━━━━━━━━━━━━';
    }

    // ヘッダーを作成する関数
    function createHeader(name) {
      const border = createBorder();  // createBorder関数を呼び出す
      return border + '\n  親愛なる ' + name + ' さんへ\n' + border;
    }

    // 本文を作成する関数
    function createBody(message) {
      return '\n' + message + '\n';
    }

    // フッターを作成する関数
    function createFooter() {
      const border = createBorder();  // createBorder関数を呼び出す
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dateString = year + '年' + month + '月' + day + '日';

      return border + '\n  ' + dateString + '\n  あなたより\n' + border;
    }

    // カード全体を作成する関数
    function createCard(name, message) {
      // 各関数を呼び出して、カードの各部分を作成
      const header = createHeader(name);
      const body = createBody(message);
      const footer = createFooter();

      // すべてを組み合わせる
      return header + body + footer;
    }

    // 入力値を取得する関数
    function getInputName() {
      return document.getElementById('name').value;
    }

    function getInputMessage() {
      return document.getElementById('message').value;
    }

    // 入力をチェックする関数
    function validateInputs(name, message) {
      if (!name || name.trim() === '') {
        alert('名前を入力してください');
        return false;
      }
      if (!message || message.trim() === '') {
        alert('メッセージを入力してください');
        return false;
      }
      return true;
    }

    // カードを表示するメイン関数
    function displayCard() {
      // 処理1: 入力値を取得
      const name = getInputName();
      const message = getInputMessage();

      // 処理2: 入力をチェック
      if (!validateInputs(name, message)) {
        return;  // 早期リターン
      }

      // 処理3: カードを作成
      const card = createCard(name, message);

      // 処理4: カードを表示
      const previewElement = document.getElementById('card-preview');
      previewElement.textContent = card;
      previewElement.classList.add('show');

      // 処理5: コンソールにログ出力
      console.log('カード作成完了:');
      console.log(card);
    }
  </script>
</body>
</html>
```

**実行フロー**:
```
displayCard() を呼び出す
  ↓
処理1: 入力値を取得
  name = getInputName() → "太郎"
  message = getInputMessage() → "いつもありがとう！"
  ↓
処理2: validateInputs("太郎", "いつもありがとう！")
  両方とも空でない → true
  ↓
処理3: createCard("太郎", "いつもありがとう！")
  ↓
  createHeader("太郎")
    ↓
    createBorder() → "━━━━━━━━━━━━━━━━━━━━"
    ↓
    return "━━━━━━━━━━━━━━━━━━━━\n  親愛なる 太郎 さんへ\n━━━━━━━━━━━━━━━━━━━━"
  ↓
  header = "..."
  ↓
  createBody("いつもありがとう！")
    ↓
    return "\nいつもありがとう！\n"
  ↓
  body = "\nいつもありがとう！\n"
  ↓
  createFooter()
    ↓
    createBorder() → "━━━━━━━━━━━━━━━━━━━━"
    ↓
    return "━━━━━━━━━━━━━━━━━━━━\n  2025年11月26日\n  あなたより\n━━━━━━━━━━━━━━━━━━━━"
  ↓
  footer = "..."
  ↓
  return header + body + footer
  ↓
card = 完成したカード
  ↓
処理4: 画面に表示
  ↓
処理5: コンソールにログ出力
  ↓
関数終了
```
</details>

---

### 問題2: グレード計算システム

学生の点数からグレードと評価コメントを計算するシステムを作成してください。

**要件**:
1. 点数を入力するフォームを作成
2. 以下の関数を作成し、**関数から関数を呼び出す**こと:
   - `calculateGrade(score)`: 点数からグレード（A/B/C/D/F）を返す
   - `getComment(grade)`: グレードから評価コメントを返す
   - `getColor(grade)`: グレードから表示色を返す
   - `calculateResult(score)`: 上記関数を呼び出して結果オブジェクトを返す
   - `displayResult(result)`: 結果を画面に表示

**グレード基準**:
- 90点以上: A（優秀）
- 80点以上: B（良好）
- 70点以上: C（普通）
- 60点以上: D（要努力）
- 60点未満: F（不合格）

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>グレード計算システム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background: #f0f0f0;
    }

    .container {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .input-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: #555;
    }

    input {
      width: 100%;
      padding: 12px;
      font-size: 18px;
      border: 2px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
      text-align: center;
    }

    button {
      width: 100%;
      padding: 15px;
      font-size: 18px;
      font-weight: bold;
      background: #2196F3;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    button:hover {
      background: #1976D2;
    }

    .result {
      margin-top: 30px;
      padding: 30px;
      border-radius: 10px;
      text-align: center;
      display: none;
    }

    .result.show {
      display: block;
    }

    .score {
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .grade {
      font-size: 72px;
      font-weight: bold;
      margin: 20px 0;
    }

    .comment {
      font-size: 24px;
      margin-top: 15px;
    }

    .grade-A { background: #E8F5E9; color: #2E7D32; }
    .grade-B { background: #E3F2FD; color: #1565C0; }
    .grade-C { background: #FFF3E0; color: #E65100; }
    .grade-D { background: #FFE0B2; color: #E64A19; }
    .grade-F { background: #FFEBEE; color: #C62828; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 グレード計算システム</h1>

    <div class="input-group">
      <label>点数を入力（0〜100）:</label>
      <input type="number" id="score" value="85" min="0" max="100">
    </div>

    <button onclick="processScore()">グレードを計算</button>

    <div id="result" class="result"></div>
  </div>

  <script>
    // グレードを計算する関数
    function calculateGrade(score) {
      if (score >= 90) return 'A';
      if (score >= 80) return 'B';
      if (score >= 70) return 'C';
      if (score >= 60) return 'D';
      return 'F';
    }

    // 評価コメントを取得する関数
    function getComment(grade) {
      if (grade === 'A') return '優秀です！';
      if (grade === 'B') return '良好です';
      if (grade === 'C') return '普通です';
      if (grade === 'D') return '要努力';
      if (grade === 'F') return '不合格';
      return '';
    }

    // グレードに応じた色を取得する関数
    function getColor(grade) {
      return 'grade-' + grade;
    }

    // 結果を計算する関数（他の関数を呼び出す）
    function calculateResult(score) {
      const grade = calculateGrade(score);     // calculateGrade関数を呼び出す
      const comment = getComment(grade);        // getComment関数を呼び出す
      const colorClass = getColor(grade);       // getColor関数を呼び出す

      return {
        score: score,
        grade: grade,
        comment: comment,
        colorClass: colorClass
      };
    }

    // 結果を表示する関数
    function displayResult(result) {
      let html = '<div class="score">点数: ' + result.score + '点</div>';
      html += '<div class="grade">' + result.grade + '</div>';
      html += '<div class="comment">' + result.comment + '</div>';

      const resultElement = document.getElementById('result');
      resultElement.innerHTML = html;
      resultElement.className = 'result show ' + result.colorClass;
    }

    // 入力値を取得する関数
    function getInputScore() {
      return Number(document.getElementById('score').value);
    }

    // 入力をチェックする関数
    function validateScore(score) {
      if (score < 0 || score > 100) {
        alert('0〜100の範囲で入力してください');
        return false;
      }
      return true;
    }

    // メイン処理関数（すべての関数を呼び出す）
    function processScore() {
      // 処理1: 入力値を取得
      const score = getInputScore();

      // 処理2: 入力をチェック
      if (!validateScore(score)) {
        return;  // 早期リターン
      }

      // 処理3: 結果を計算
      const result = calculateResult(score);

      // 処理4: 結果を表示
      displayResult(result);

      // 処理5: コンソールにログ出力
      console.log('グレード計算完了:', result);
    }
  </script>
</body>
</html>
```

**実行フロー（点数85点の場合）**:
```
processScore() を呼び出す
  ↓
処理1: getInputScore()
  score = 85
  ↓
処理2: validateScore(85)
  if (85 < 0 || 85 > 100) → false
  return true（検証OK）
  ↓
処理3: calculateResult(85)
  ↓
  calculateGrade(85)
    if (85 >= 90) → false
    if (85 >= 80) → true
    return 'B'
    ↓
  grade = 'B'
    ↓
  getComment('B')
    if (grade === 'B') → true
    return '良好です'
    ↓
  comment = '良好です'
    ↓
  getColor('B')
    return 'grade-B'
    ↓
  colorClass = 'grade-B'
    ↓
  return { score: 85, grade: 'B', comment: '良好です', colorClass: 'grade-B' }
  ↓
result = { score: 85, grade: 'B', comment: '良好です', colorClass: 'grade-B' }
  ↓
処理4: displayResult(result)
  HTML作成して画面に表示
  ↓
処理5: コンソールにログ出力
  ↓
関数終了
```
</details>

---

### 問題3: BMI計算と健康アドバイス（応用）

BMIを計算し、その結果に応じた健康アドバイスを表示するシステムを作成してください。

**要件**:
1. 身長と体重を入力するフォームを作成
2. 以下の関数を作成し、**関数から関数を呼び出す**こと:
   - `calculateBMI(weight, height)`: BMIを計算して返す
   - `getBMICategory(bmi)`: BMI値からカテゴリー（低体重/普通/肥満など）を返す
   - `getHealthAdvice(category)`: カテゴリーから健康アドバイスを返す
   - `getColorClass(category)`: カテゴリーから表示色クラスを返す
   - `processHealthCheck(weight, height)`: すべてを統合して結果を返す

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>健康チェックシステム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 700px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .container {
      background: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }

    .input-row {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }

    .input-group {
      flex: 1;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: #555;
    }

    input {
      width: 100%;
      padding: 12px;
      font-size: 18px;
      border: 2px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
    }

    button {
      width: 100%;
      padding: 15px;
      font-size: 18px;
      font-weight: bold;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: transform 0.2s;
    }

    button:hover {
      transform: translateY(-2px);
    }

    .result {
      margin-top: 30px;
      padding: 30px;
      border-radius: 10px;
      display: none;
    }

    .result.show {
      display: block;
    }

    .bmi-value {
      text-align: center;
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .category {
      text-align: center;
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .advice {
      background: white;
      padding: 20px;
      border-radius: 5px;
      font-size: 16px;
      line-height: 1.8;
    }

    .advice-title {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 10px;
      color: #333;
    }

    .low { background: #E3F2FD; }
    .normal { background: #E8F5E9; }
    .overweight { background: #FFF3E0; }
    .obese { background: #FFEBEE; }

    .low .bmi-value, .low .category { color: #1976D2; }
    .normal .bmi-value, .normal .category { color: #388E3C; }
    .overweight .bmi-value, .overweight .category { color: #F57C00; }
    .obese .bmi-value, .obese .category { color: #D32F2F; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🏥 健康チェックシステム</h1>

    <div class="input-row">
      <div class="input-group">
        <label>体重（kg）:</label>
        <input type="number" id="weight" value="60" step="0.1">
      </div>

      <div class="input-group">
        <label>身長（cm）:</label>
        <input type="number" id="height" value="170" step="0.1">
      </div>
    </div>

    <button onclick="checkHealth()">健康チェック</button>

    <div id="result" class="result"></div>
  </div>

  <script>
    // BMIを計算する関数
    function calculateBMI(weight, height) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      return Math.round(bmi * 10) / 10;  // 小数点第1位まで
    }

    // BMIカテゴリーを取得する関数
    function getBMICategory(bmi) {
      if (bmi < 18.5) return '低体重';
      if (bmi < 25) return '普通体重';
      if (bmi < 30) return '肥満（1度）';
      return '肥満（2度以上）';
    }

    // 健康アドバイスを取得する関数
    function getHealthAdvice(category) {
      const adviceMap = {
        '低体重': [
          '栄養バランスの取れた食事を心がけましょう',
          '適度な運動で筋肉をつけることが大切です',
          '必要に応じて医師や栄養士に相談してください'
        ],
        '普通体重': [
          '理想的な体重を維持できています',
          '引き続きバランスの良い食事と適度な運動を続けましょう',
          '定期的な健康チェックをお勧めします'
        ],
        '肥満（1度）': [
          'カロリー摂取量を見直しましょう',
          '週3回以上の有酸素運動をお勧めします',
          '野菜中心の食生活を心がけてください'
        ],
        '肥満（2度以上）': [
          '医師の診察を受けることをお勧めします',
          '専門家の指導のもと、計画的な減量が必要です',
          '生活習慣病のリスクが高まっています'
        ]
      };

      return adviceMap[category] || [];
    }

    // 色クラスを取得する関数
    function getColorClass(category) {
      const colorMap = {
        '低体重': 'low',
        '普通体重': 'normal',
        '肥満（1度）': 'overweight',
        '肥満（2度以上）': 'obese'
      };

      return colorMap[category] || 'normal';
    }

    // 健康チェックを処理する関数（すべての関数を呼び出す）
    function processHealthCheck(weight, height) {
      // 各関数を呼び出して結果を計算
      const bmi = calculateBMI(weight, height);
      const category = getBMICategory(bmi);
      const advice = getHealthAdvice(category);
      const colorClass = getColorClass(category);

      return {
        bmi: bmi,
        category: category,
        advice: advice,
        colorClass: colorClass
      };
    }

    // 結果を表示する関数
    function displayHealthResult(result) {
      let html = '<div class="bmi-value">BMI: ' + result.bmi + '</div>';
      html += '<div class="category">' + result.category + '</div>';

      html += '<div class="advice">';
      html += '<div class="advice-title">📋 健康アドバイス:</div>';
      html += '<ul>';
      for (let i = 0; i < result.advice.length; i++) {
        html += '<li>' + result.advice[i] + '</li>';
      }
      html += '</ul>';
      html += '</div>';

      const resultElement = document.getElementById('result');
      resultElement.innerHTML = html;
      resultElement.className = 'result show ' + result.colorClass;
    }

    // 入力値を取得する関数
    function getInputValues() {
      const weight = Number(document.getElementById('weight').value);
      const height = Number(document.getElementById('height').value);
      return { weight: weight, height: height };
    }

    // 入力をチェックする関数
    function validateHealthInputs(weight, height) {
      if (weight <= 0 || weight > 300) {
        alert('正しい体重を入力してください（1〜300kg）');
        return false;
      }
      if (height <= 0 || height > 250) {
        alert('正しい身長を入力してください（1〜250cm）');
        return false;
      }
      return true;
    }

    // メイン処理関数
    function checkHealth() {
      // 処理1: 入力値を取得
      const inputs = getInputValues();

      // 処理2: 入力をチェック
      if (!validateHealthInputs(inputs.weight, inputs.height)) {
        return;  // 早期リターン
      }

      // 処理3: 健康チェックを実行
      const result = processHealthCheck(inputs.weight, inputs.height);

      // 処理4: 結果を表示
      displayHealthResult(result);

      // 処理5: コンソールにログ出力
      console.log('健康チェック完了:', result);
    }
  </script>
</body>
</html>
```

**実行フロー（体重60kg、身長170cmの場合）**:
```
checkHealth() を呼び出す
  ↓
処理1: getInputValues()
  weight = 60
  height = 170
  inputs = { weight: 60, height: 170 }
  ↓
処理2: validateHealthInputs(60, 170)
  両方とも範囲内 → true
  ↓
処理3: processHealthCheck(60, 170)
  ↓
  calculateBMI(60, 170)
    heightInMeters = 1.7
    bmi = 60 / (1.7 * 1.7) = 20.76...
    return 20.8
    ↓
  bmi = 20.8
    ↓
  getBMICategory(20.8)
    if (20.8 < 18.5) → false
    if (20.8 < 25) → true
    return '普通体重'
    ↓
  category = '普通体重'
    ↓
  getHealthAdvice('普通体重')
    return ['理想的な体重を維持できています', ...]
    ↓
  advice = [...]
    ↓
  getColorClass('普通体重')
    return 'normal'
    ↓
  colorClass = 'normal'
    ↓
  return { bmi: 20.8, category: '普通体重', advice: [...], colorClass: 'normal' }
  ↓
result = { ... }
  ↓
処理4: displayHealthResult(result)
  HTML作成して画面に表示
  ↓
処理5: コンソールにログ出力
  ↓
関数終了
```
</details>

---

## まとめ

### 重要なポイント

1. **関数から関数を呼び出す**
   - 関数の中から別の関数を呼び出せる
   - 小さな関数を組み合わせて、大きな機能を作る

2. **処理を分割するメリット**
   - コードが読みやすくなる
   - バグを見つけやすい
   - テストしやすい
   - 修正が簡単

3. **単一責任の原則**
   - 各関数は1つの仕事だけをする
   - 関数名を見れば、何をしているか分かる

4. **関数の再利用**
   - 同じ処理を何度も書かなくて済む
   - 修正が一箇所で済む

5. **関数の階層構造**
   ```javascript
   // 小さな関数（基本的な処理）
   function calculateTax(price) { ... }

   // 中規模の関数（小さな関数を組み合わせる）
   function calculateTotal(price) {
     const tax = calculateTax(price);  // 小さな関数を呼び出す
     return price + tax;
   }

   // 大きな関数（すべてをまとめる）
   function processOrder() {
     const total = calculateTotal(price);  // 中規模の関数を呼び出す
     displayResult(total);
   }
   ```

### よく使うパターン

```javascript
// パターン1: 入力 → 検証 → 処理 → 表示
function mainProcess() {
  const input = getInput();           // 入力取得
  if (!validate(input)) return;       // 検証
  const result = process(input);      // 処理
  display(result);                    // 表示
}

// パターン2: 複数の小さな関数を組み合わせる
function complexCalculation(data) {
  const step1 = processStep1(data);
  const step2 = processStep2(step1);
  const step3 = processStep3(step2);
  return step3;
}

// パターン3: ヘルパー関数を活用
function createReport(data) {
  const header = createHeader();      // ヘルパー関数
  const body = createBody(data);      // ヘルパー関数
  const footer = createFooter();      // ヘルパー関数
  return header + body + footer;
}
```

### カリキュラム要件チェック

このレッスンで学んだ内容を確認しましょう：

✅ **関数内で別の関数呼び出し**: 関数の中から別の関数を呼び出す方法を学びました
✅ **処理の分割**: 複雑な処理を小さな関数に分割する方法を理解しました
✅ **再利用**: 同じ処理を複数の場所で使う方法を学びました
✅ **【知識】関数の組み合わせ、モジュール化**: 関数を組み合わせて大きな機能を作る方法を理解しました
✅ **成果物：関数の連携**: 注文管理システム、メッセージカード、健康チェックシステムなど、複数の関数が連携するアプリを作成しました

---

## 次のレッスンの予告

次回のレッスン115では、**デフォルト引数**について学びます。

これまでは、関数を呼び出すときに必ず引数を渡していましたが、次回は：
- 引数が渡されなかった場合のデフォルト値を設定する
- オプショナルな引数を作る
- より柔軟な関数を作る

といった、実践的な関数の書き方を学びます。

---

**🎯 今日の達成目標**
- [x] 関数の中から別の関数を呼び出せる
- [x] 処理を小さな関数に分割できる
- [x] 単一責任の原則を理解する
- [x] 関数を再利用できる
- [x] 複数の関数を連携させたアプリを作成できる

お疲れさまでした！次のレッスンも頑張りましょう！
