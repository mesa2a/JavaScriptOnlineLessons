# Lesson 115: デフォルト引数

> **レッスン日**: 2025-11-26

## このレッスンで学ぶこと

### 前回の復習
レッスン114では、**関数から関数を呼び出す**方法を学びました。処理を小さな関数に分割し、それらを組み合わせることで、読みやすく再利用しやすいコードを書けるようになりました。

```javascript
function calculateTax(price) {
  return price * 0.1;
}

function calculateTotal(price) {
  const tax = calculateTax(price);  // 関数から関数を呼び出す
  return price + tax;
}
```

### よくある場面
「引数を毎回指定するのは面倒」「引数がない場合はデフォルトの値を使いたい」という場面はよくあります。

たとえば、ユーザーにあいさつする関数を考えてみましょう：
```javascript
// ❌ デフォルト引数なし（不便）
function greet(name) {
  alert('こんにちは、' + name + 'さん');
}

greet('太郎');  // "こんにちは、太郎さん"
greet();        // "こんにちは、undefinedさん" ← エラーではないが不自然
```

名前が指定されなかった場合に「ゲスト」と表示したい場合、従来は以下のように書く必要がありました：
```javascript
// 従来の方法（面倒）
function greet(name) {
  if (name === undefined) {
    name = 'ゲスト';
  }
  alert('こんにちは、' + name + 'さん');
}

greet('太郎');  // "こんにちは、太郎さん"
greet();        // "こんにちは、ゲストさん"
```

デフォルト引数を使えば、もっとシンプルに書けます：
```javascript
// ✅ デフォルト引数を使う（シンプル）
function greet(name = 'ゲスト') {
  alert('こんにちは、' + name + 'さん');
}

greet('太郎');  // "こんにちは、太郎さん"
greet();        // "こんにちは、ゲストさん"
```

### 学習目標
このレッスンでは、次のことができるようになります：
1. **デフォルト引数**の構文を理解し、使えるようになる
2. 引数が省略された場合の動作を理解する
3. 複数のデフォルト引数を使った柔軟な関数を作成できるようになる
4. デフォルト引数の注意点を理解する

---

## 1. デフォルト引数とは？

### 日常生活のアナロジー: カフェの注文

デフォルト引数の概念を、カフェでの注文で考えてみましょう：

```
┌─────────────────────────────────────┐
│  店員: 「ご注文をどうぞ」             │
└─────────────────────────────────────┘

パターン1: 詳しく指定する
  お客さん: 「アイスコーヒー、Lサイズ、砂糖なしで」
  → すべて指定された通り

パターン2: 一部を省略する
  お客さん: 「アイスコーヒーで」
  → サイズはMサイズ（デフォルト）
  → 砂糖は普通（デフォルト）

パターン3: すべて省略する
  お客さん: 「いつものやつで」
  → ホットコーヒー（デフォルト）
  → Mサイズ（デフォルト）
  → 砂糖普通（デフォルト）
```

**重要なポイント**:
- 省略された情報には、**デフォルト値**が使われる
- 指定された情報は、そのまま使われる
- デフォルト値があるから、毎回すべてを指定しなくて済む

### プログラミングでのデフォルト引数

```javascript
// カフェの注文関数
function orderCoffee(type = 'ホット', size = 'M', sugar = '普通') {
  const order = type + 'コーヒー、' + size + 'サイズ、砂糖' + sugar;
  console.log('注文: ' + order);
  return order;
}

// パターン1: すべて指定
orderCoffee('アイス', 'L', 'なし');
// "注文: アイスコーヒー、Lサイズ、砂糖なし"

// パターン2: 一部を省略
orderCoffee('アイス');
// "注文: アイスコーヒー、Mサイズ、砂糖普通"

// パターン3: すべて省略
orderCoffee();
// "注文: ホットコーヒー、Mサイズ、砂糖普通"
```

### 実行フロー
```
orderCoffee('アイス') を呼び出す
  ↓
引数の確認:
  type = 'アイス'（指定された）
  size = undefined → デフォルト値 'M' を使用
  sugar = undefined → デフォルト値 '普通' を使用
  ↓
変数の値:
  type = 'アイス'
  size = 'M'
  sugar = '普通'
  ↓
処理実行:
  order = 'アイスコーヒー、Mサイズ、砂糖普通'
  ↓
結果を出力
```

---

## 2. デフォルト引数の基本構文

### 構文

```javascript
function 関数名(引数名 = デフォルト値) {
  // 処理
}
```

### 基本的な例

```javascript
function greet(name = 'ゲスト') {
  return 'こんにちは、' + name + 'さん';
}

console.log(greet('太郎'));  // "こんにちは、太郎さん"
console.log(greet());        // "こんにちは、ゲストさん"
```

### 実行フロー図解
```
greet('太郎') の場合:
  ↓
  name = '太郎'（引数が渡された）
  ↓
  return 'こんにちは、太郎さん'

greet() の場合:
  ↓
  name = undefined → デフォルト値 'ゲスト' を使用
  ↓
  name = 'ゲスト'
  ↓
  return 'こんにちは、ゲストさん'
```

### 様々なデフォルト値の例

```javascript
// 文字列のデフォルト値
function greet(message = 'こんにちは') {
  console.log(message);
}

// 数値のデフォルト値
function multiply(a, b = 1) {
  return a * b;
}

// 真偽値のデフォルト値
function setDebug(enabled = false) {
  console.log('デバッグモード: ' + enabled);
}

// 配列のデフォルト値
function processItems(items = []) {
  console.log('アイテム数: ' + items.length);
}

// オブジェクトのデフォルト値
function configure(options = { color: 'blue', size: 'medium' }) {
  console.log(options.color + '、' + options.size);
}
```

---

## 3. 複数のデフォルト引数

複数の引数に、それぞれデフォルト値を設定できます。

### 基本的な例

```javascript
function introduce(name = 'ゲスト', age = 20, job = '学生') {
  const message = name + 'さんは' + age + '歳の' + job + 'です';
  console.log(message);
  return message;
}

// すべて指定
introduce('太郎', 25, 'エンジニア');
// "太郎さんは25歳のエンジニアです"

// 一部を省略
introduce('花子', 30);
// "花子さんは30歳の学生です"（jobはデフォルト値）

// 名前だけ指定
introduce('次郎');
// "次郎さんは20歳の学生です"（age, jobはデフォルト値）

// すべて省略
introduce();
// "ゲストさんは20歳の学生です"（すべてデフォルト値）
```

### 実行フロー（一部省略の場合）
```
introduce('花子', 30) を呼び出す
  ↓
引数の確認:
  name = '花子'（指定された）
  age = 30（指定された）
  job = undefined → デフォルト値 '学生' を使用
  ↓
変数の値:
  name = '花子'
  age = 30
  job = '学生'
  ↓
処理実行:
  message = '花子さんは30歳の学生です'
  ↓
console.log(message)
  ↓
return message
```

### より実用的な例: メッセージ表示関数

```javascript
function showMessage(message = 'メッセージがありません', type = 'info', duration = 3000) {
  // タイプに応じたアイコンを決定
  let icon = '';
  if (type === 'success') {
    icon = '✅ ';
  } else if (type === 'error') {
    icon = '❌ ';
  } else if (type === 'warning') {
    icon = '⚠️ ';
  } else {
    icon = 'ℹ️ ';
  }

  // メッセージを表示
  console.log(icon + message);
  console.log('表示時間: ' + duration + 'ミリ秒');

  return {
    message: message,
    type: type,
    duration: duration
  };
}

// 様々な呼び出し方
showMessage('保存しました', 'success');
// "✅ 保存しました"
// "表示時間: 3000ミリ秒"

showMessage('エラーが発生しました', 'error', 5000);
// "❌ エラーが発生しました"
// "表示時間: 5000ミリ秒"

showMessage();
// "ℹ️ メッセージがありません"
// "表示時間: 3000ミリ秒"
```

---

## 4. デフォルト引数の重要なルール

### ルール1: デフォルト引数は後ろから設定する

デフォルト引数を持つパラメータは、**後ろに配置する**のが一般的です。

**✅ 良い例**:
```javascript
function calculate(a, b = 10, c = 5) {
  return a + b + c;
}

calculate(1);        // 16（a=1, b=10, c=5）
calculate(1, 2);     // 8（a=1, b=2, c=5）
calculate(1, 2, 3);  // 6（a=1, b=2, c=3）
```

**❌ 良くない例**:
```javascript
function calculate(a = 10, b) {
  return a + b;
}

calculate(5);     // NaN（a=5, b=undefined）
calculate(undefined, 5);  // 15（a=10, b=5）← undefinedを明示的に渡す必要がある
```

### 実行フロー比較
```
良い例: calculate(a, b = 10)
  calculate(5)
    ↓
    a = 5（指定された）
    b = undefined → デフォルト値 10
    ↓
    return 5 + 10 = 15

悪い例: calculate(a = 10, b)
  calculate(5)
    ↓
    a = 5（指定された）
    b = undefined（デフォルト値なし）
    ↓
    return 5 + undefined = NaN
```

### ルール2: undefinedを渡すとデフォルト値が使われる

```javascript
function greet(name = 'ゲスト') {
  return 'こんにちは、' + name + 'さん';
}

console.log(greet());           // "こんにちは、ゲストさん"
console.log(greet(undefined));  // "こんにちは、ゲストさん"
console.log(greet(null));       // "こんにちは、nullさん"
console.log(greet(''));         // "こんにちは、さん"
```

**重要な違い**:
- `undefined`: デフォルト値が使われる
- `null`: 値として扱われる（デフォルト値は使われない）
- `''`（空文字列）: 値として扱われる（デフォルト値は使われない）

### 実行フロー
```
greet(undefined) の場合:
  ↓
  name = undefined → デフォルト値 'ゲスト' を使用
  ↓
  return 'こんにちは、ゲストさん'

greet(null) の場合:
  ↓
  name = null（値として扱われる）
  ↓
  return 'こんにちは、nullさん'
```

### ルール3: デフォルト値は式も使える

```javascript
// 関数呼び出しをデフォルト値に
function getDefaultName() {
  return 'ゲスト' + Date.now();
}

function greet(name = getDefaultName()) {
  console.log('こんにちは、' + name + 'さん');
}

greet();  // "こんにちは、ゲスト1732627200000さん"

// 計算式をデフォルト値に
function multiply(a, b = a * 2) {
  return a * b;
}

console.log(multiply(5));     // 50（5 × 10）
console.log(multiply(5, 3));  // 15（5 × 3）

// 他の引数を参照
function createUser(name = 'ゲスト', id = name.toLowerCase()) {
  return { name: name, id: id };
}

console.log(createUser('Taro'));  // { name: 'Taro', id: 'taro' }
console.log(createUser());        // { name: 'ゲスト', id: 'ゲスト' }
```

---

## 5. 従来の方法との比較

### 従来の方法（デフォルト引数がない場合）

```javascript
function greet(name, time) {
  // nameが指定されていない場合
  if (name === undefined) {
    name = 'ゲスト';
  }

  // timeが指定されていない場合
  if (time === undefined) {
    time = 'こんにちは';
  }

  console.log(time + '、' + name + 'さん');
}
```

**問題点**:
- コードが長くなる
- 同じパターンを何度も書く必要がある
- 読みにくい

### デフォルト引数を使う方法（現代）

```javascript
function greet(name = 'ゲスト', time = 'こんにちは') {
  console.log(time + '、' + name + 'さん');
}
```

**メリット**:
- コードが短い
- 読みやすい
- 一目でデフォルト値が分かる

---

## 6. 完全なアプリ例: 通知システム

デフォルト引数を活用した実用的なアプリを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>通知システム</title>
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

    input, select {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
    }

    .button-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 20px;
    }

    button {
      padding: 15px;
      font-size: 16px;
      font-weight: bold;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      color: white;
      transition: opacity 0.3s;
    }

    button:hover {
      opacity: 0.8;
    }

    .btn-success { background: #4CAF50; }
    .btn-error { background: #f44336; }
    .btn-warning { background: #FF9800; }
    .btn-info { background: #2196F3; }

    .notification-area {
      margin-top: 30px;
      min-height: 100px;
    }

    .notification {
      padding: 20px;
      margin-bottom: 10px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .notification .icon {
      font-size: 24px;
    }

    .notification .content {
      flex: 1;
    }

    .notification .title {
      font-weight: bold;
      margin-bottom: 5px;
    }

    .notification .message {
      font-size: 14px;
    }

    .notification.success {
      background: #E8F5E9;
      border-left: 4px solid #4CAF50;
      color: #2E7D32;
    }

    .notification.error {
      background: #FFEBEE;
      border-left: 4px solid #f44336;
      color: #C62828;
    }

    .notification.warning {
      background: #FFF3E0;
      border-left: 4px solid #FF9800;
      color: #E65100;
    }

    .notification.info {
      background: #E3F2FD;
      border-left: 4px solid #2196F3;
      color: #1565C0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔔 通知システム</h1>

    <div class="input-section">
      <h2>通知を作成</h2>

      <div class="input-group">
        <label>メッセージ（省略可）:</label>
        <input type="text" id="message" placeholder="空欄の場合はデフォルトメッセージが表示されます">
      </div>

      <div class="input-group">
        <label>タイトル（省略可）:</label>
        <input type="text" id="title" placeholder="空欄の場合はデフォルトタイトルが表示されます">
      </div>

      <div class="button-group">
        <button class="btn-success" onclick="showNotification('success')">成功通知</button>
        <button class="btn-error" onclick="showNotification('error')">エラー通知</button>
        <button class="btn-warning" onclick="showNotification('warning')">警告通知</button>
        <button class="btn-info" onclick="showNotification('info')">情報通知</button>
      </div>
    </div>

    <div id="notification-area" class="notification-area"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
// 通知を作成する関数（デフォルト引数を活用）
function createNotification(
  message = 'メッセージがありません',
  type = 'info',
  title = 'お知らせ',
  duration = 3000
) {
  // タイプに応じたアイコンを取得
  const icon = getIcon(type);

  // タイプに応じたタイトルを取得（titleが"お知らせ"の場合のみ）
  const finalTitle = (title === 'お知らせ') ? getDefaultTitle(type) : title;

  // 通知オブジェクトを作成
  return {
    message: message,
    type: type,
    title: finalTitle,
    icon: icon,
    duration: duration,
    timestamp: new Date()
  };
}

// タイプに応じたアイコンを返す関数
function getIcon(type = 'info') {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  return icons[type] || icons.info;
}

// タイプに応じたデフォルトタイトルを返す関数
function getDefaultTitle(type = 'info') {
  const titles = {
    success: '成功',
    error: 'エラー',
    warning: '警告',
    info: '情報'
  };
  return titles[type] || titles.info;
}

// 通知を画面に表示する関数
function displayNotification(notification) {
  // 通知エリアを取得
  const area = document.getElementById('notification-area');

  // 通知要素を作成
  const notificationElement = document.createElement('div');
  notificationElement.className = 'notification ' + notification.type;

  // HTML内容を設定
  notificationElement.innerHTML =
    '<div class="icon">' + notification.icon + '</div>' +
    '<div class="content">' +
    '<div class="title">' + notification.title + '</div>' +
    '<div class="message">' + notification.message + '</div>' +
    '</div>';

  // 通知エリアの先頭に追加
  area.insertBefore(notificationElement, area.firstChild);

  // 指定時間後に自動削除
  setTimeout(function() {
    notificationElement.style.opacity = '0';
    setTimeout(function() {
      notificationElement.remove();
    }, 300);
  }, notification.duration);
}

// 入力値を取得する関数
function getInputValues() {
  const message = document.getElementById('message').value;
  const title = document.getElementById('title').value;

  return {
    message: message || undefined,  // 空文字の場合はundefinedに
    title: title || undefined       // 空文字の場合はundefinedに
  };
}

// 通知を表示するメイン関数
function showNotification(type = 'info') {
  // 入力値を取得
  const inputs = getInputValues();

  // 通知を作成（デフォルト引数が活用される）
  const notification = createNotification(
    inputs.message,  // undefinedの場合はデフォルト値が使われる
    type,
    inputs.title     // undefinedの場合はデフォルト値が使われる
  );

  // 通知を表示
  displayNotification(notification);

  // コンソールにログ出力
  console.log('通知を表示:', notification);
}
```

### 実行フロー（メッセージを入力して成功通知を表示する場合）
```
ユーザーが「保存しました」と入力してボタンをクリック
  ↓
showNotification('success') を呼び出す
  ↓
処理1: getInputValues()
  message = "保存しました"
  title = ""（空文字）
  ↓
  return { message: "保存しました", title: undefined }
  ↓
inputs = { message: "保存しました", title: undefined }
  ↓
処理2: createNotification("保存しました", 'success', undefined)
  ↓
  引数の確認:
    message = "保存しました"（指定された）
    type = 'success'（指定された）
    title = undefined → デフォルト値 'お知らせ' を使用
    duration = undefined → デフォルト値 3000 を使用
  ↓
  getIcon('success') → '✅'
  ↓
  getDefaultTitle('success') → '成功'
  ↓
  return {
    message: "保存しました",
    type: 'success',
    title: '成功',
    icon: '✅',
    duration: 3000,
    timestamp: Date
  }
  ↓
notification = { ... }
  ↓
処理3: displayNotification(notification)
  画面に通知を表示
  3秒後に自動削除
  ↓
処理4: コンソールにログ出力
  ↓
関数終了
```

---

## 7. 練習問題

### 問題1: 割引計算関数

商品価格から割引を計算する関数を作成してください。

**要件**:
1. `calculateDiscount(price, rate = 0.1, minPrice = 1000)` 関数を作成
2. `price`: 商品価格（必須）
3. `rate`: 割引率（デフォルト: 0.1 = 10%）
4. `minPrice`: 割引適用の最低価格（デフォルト: 1000円）
5. 価格がminPrice以上の場合のみ割引を適用

**ヒント**:
```javascript
function calculateDiscount(price, rate = 0.1, minPrice = 1000) {
  // ここにコードを書く
}

console.log(calculateDiscount(5000));           // 4500（10%割引）
console.log(calculateDiscount(5000, 0.2));      // 4000（20%割引）
console.log(calculateDiscount(500));            // 500（割引なし）
console.log(calculateDiscount(5000, 0.15, 3000)); // 4250（15%割引）
```

<details>
<summary>解答例</summary>

```javascript
function calculateDiscount(price, rate = 0.1, minPrice = 1000) {
  // 最低価格をチェック
  if (price < minPrice) {
    return price;  // 割引なし
  }

  // 割引額を計算
  const discount = price * rate;

  // 割引後の価格を計算
  const finalPrice = price - discount;

  return finalPrice;
}

// テスト
console.log(calculateDiscount(5000));           // 4500
console.log(calculateDiscount(5000, 0.2));      // 4000
console.log(calculateDiscount(500));            // 500
console.log(calculateDiscount(5000, 0.15, 3000)); // 4250
console.log(calculateDiscount(2000, 0.1, 3000)); // 2000（最低価格未満）
```

**実行フロー（calculateDiscount(5000, 0.2)の場合）**:
```
calculateDiscount(5000, 0.2) を呼び出す
  ↓
引数の確認:
  price = 5000（指定された）
  rate = 0.2（指定された）
  minPrice = undefined → デフォルト値 1000 を使用
  ↓
変数の値:
  price = 5000
  rate = 0.2
  minPrice = 1000
  ↓
処理1: 最低価格チェック
  if (5000 < 1000) → false（スキップ）
  ↓
処理2: 割引額を計算
  discount = 5000 * 0.2 = 1000
  ↓
処理3: 割引後の価格を計算
  finalPrice = 5000 - 1000 = 4000
  ↓
return 4000
```
</details>

---

### 問題2: ユーザー登録フォーム

ユーザー情報を表示する関数を作成してください。

**要件**:
1. `displayUser(name = 'ゲスト', age = 18, country = '日本', role = '一般ユーザー')` 関数を作成
2. すべてデフォルト値を持つ
3. 入力フォームとボタンを作成
4. 入力が空の場合はデフォルト値が使われる

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ユーザー登録フォーム</title>
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
      margin-top: 30px;
      padding: 20px;
      background: #E8F5E9;
      border-radius: 5px;
      border-left: 4px solid #4CAF50;
      display: none;
    }

    .result.show {
      display: block;
    }

    .result-item {
      padding: 10px;
      font-size: 16px;
      border-bottom: 1px solid #ddd;
    }

    .result-item:last-child {
      border-bottom: none;
    }

    .result-label {
      font-weight: bold;
      color: #2E7D32;
      display: inline-block;
      width: 100px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>👤 ユーザー登録</h1>

    <div class="input-group">
      <label>名前（省略可）:</label>
      <input type="text" id="name" placeholder="デフォルト: ゲスト">
    </div>

    <div class="input-group">
      <label>年齢（省略可）:</label>
      <input type="number" id="age" placeholder="デフォルト: 18">
    </div>

    <div class="input-group">
      <label>国（省略可）:</label>
      <input type="text" id="country" placeholder="デフォルト: 日本">
    </div>

    <div class="input-group">
      <label>役割（省略可）:</label>
      <input type="text" id="role" placeholder="デフォルト: 一般ユーザー">
    </div>

    <button onclick="registerUser()">登録</button>

    <div id="result" class="result"></div>
  </div>

  <script>
    // ユーザー情報を表示する関数（すべてデフォルト引数あり）
    function displayUser(
      name = 'ゲスト',
      age = 18,
      country = '日本',
      role = '一般ユーザー'
    ) {
      return {
        name: name,
        age: age,
        country: country,
        role: role,
        registeredAt: new Date().toLocaleString('ja-JP')
      };
    }

    // 結果を画面に表示する関数
    function showResult(user) {
      let html = '';
      html += '<div class="result-item"><span class="result-label">名前:</span>' + user.name + '</div>';
      html += '<div class="result-item"><span class="result-label">年齢:</span>' + user.age + '歳</div>';
      html += '<div class="result-item"><span class="result-label">国:</span>' + user.country + '</div>';
      html += '<div class="result-item"><span class="result-label">役割:</span>' + user.role + '</div>';
      html += '<div class="result-item"><span class="result-label">登録日時:</span>' + user.registeredAt + '</div>';

      const resultElement = document.getElementById('result');
      resultElement.innerHTML = html;
      resultElement.classList.add('show');
    }

    // 入力値を取得する関数
    function getInputValues() {
      const name = document.getElementById('name').value.trim();
      const age = document.getElementById('age').value;
      const country = document.getElementById('country').value.trim();
      const role = document.getElementById('role').value.trim();

      return {
        name: name || undefined,
        age: age ? Number(age) : undefined,
        country: country || undefined,
        role: role || undefined
      };
    }

    // ユーザー登録のメイン関数
    function registerUser() {
      // 入力値を取得
      const inputs = getInputValues();

      // ユーザー情報を作成（デフォルト引数が活用される）
      const user = displayUser(
        inputs.name,
        inputs.age,
        inputs.country,
        inputs.role
      );

      // 結果を表示
      showResult(user);

      // コンソールにログ出力
      console.log('ユーザー登録完了:', user);
    }
  </script>
</body>
</html>
```

**実行フロー（名前だけ入力した場合）**:
```
ユーザーが「太郎」と入力してボタンをクリック
  ↓
registerUser() を呼び出す
  ↓
処理1: getInputValues()
  name = "太郎"
  age = ""（空文字）
  country = ""（空文字）
  role = ""（空文字）
  ↓
  return {
    name: "太郎",
    age: undefined,
    country: undefined,
    role: undefined
  }
  ↓
inputs = { name: "太郎", age: undefined, country: undefined, role: undefined }
  ↓
処理2: displayUser("太郎", undefined, undefined, undefined)
  ↓
  引数の確認:
    name = "太郎"（指定された）
    age = undefined → デフォルト値 18 を使用
    country = undefined → デフォルト値 '日本' を使用
    role = undefined → デフォルト値 '一般ユーザー' を使用
  ↓
  return {
    name: "太郎",
    age: 18,
    country: "日本",
    role: "一般ユーザー",
    registeredAt: "2025/11/26 10:30:00"
  }
  ↓
user = { ... }
  ↓
処理3: showResult(user)
  画面に結果を表示
  ↓
処理4: コンソールにログ出力
  ↓
関数終了
```
</details>

---

### 問題3: 設定オブジェクト管理（応用）

アプリの設定を管理する関数を作成してください。

**要件**:
1. `configureApp(theme = 'light', language = 'ja', notifications = true, autoSave = true)` 関数を作成
2. 設定を変更するUIを作成
3. 変更された設定のみを指定し、残りはデフォルト値を使用

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>アプリ設定</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 700px;
      margin: 50px auto;
      padding: 20px;
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

    .settings-group {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 5px;
      margin-bottom: 20px;
    }

    .setting-item {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .setting-label {
      font-weight: bold;
      color: #555;
    }

    select {
      padding: 8px 12px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 5px;
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
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
      margin-top: 10px;
    }

    button:hover {
      background: #1976D2;
    }

    .result {
      margin-top: 30px;
      padding: 30px;
      background: #E3F2FD;
      border-radius: 5px;
      border-left: 4px solid #2196F3;
    }

    .result h2 {
      margin-top: 0;
      color: #1565C0;
    }

    .config-item {
      padding: 10px;
      margin-bottom: 10px;
      background: white;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
    }

    .config-label {
      font-weight: bold;
      color: #1565C0;
    }

    .config-value {
      color: #555;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>⚙️ アプリ設定</h1>

    <div class="settings-group">
      <h2>設定を変更</h2>

      <div class="setting-item">
        <span class="setting-label">テーマ:</span>
        <select id="theme">
          <option value="">デフォルト (light)</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
      </div>

      <div class="setting-item">
        <span class="setting-label">言語:</span>
        <select id="language">
          <option value="">デフォルト (ja)</option>
          <option value="ja">日本語</option>
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
      </div>

      <div class="setting-item">
        <span class="setting-label">通知:</span>
        <div class="checkbox-wrapper">
          <input type="checkbox" id="notifications" checked>
          <span>有効</span>
        </div>
      </div>

      <div class="setting-item">
        <span class="setting-label">自動保存:</span>
        <div class="checkbox-wrapper">
          <input type="checkbox" id="autoSave" checked>
          <span>有効</span>
        </div>
      </div>
    </div>

    <button onclick="applySettings()">設定を適用</button>

    <div id="result" class="result" style="display: none;"></div>
  </div>

  <script>
    // アプリを設定する関数（すべてデフォルト引数あり）
    function configureApp(
      theme = 'light',
      language = 'ja',
      notifications = true,
      autoSave = true
    ) {
      // 設定オブジェクトを作成
      const config = {
        theme: theme,
        language: language,
        notifications: notifications,
        autoSave: autoSave,
        updatedAt: new Date().toLocaleString('ja-JP')
      };

      // 実際のアプリケーションでは、ここで設定を保存したり適用したりする
      console.log('設定を適用:', config);

      return config;
    }

    // 設定の説明を取得する関数
    function getConfigDescription(key, value) {
      const descriptions = {
        theme: {
          light: 'ライトテーマ',
          dark: 'ダークテーマ',
          auto: '自動'
        },
        language: {
          ja: '日本語',
          en: '英語',
          zh: '中国語'
        },
        notifications: value ? '有効' : '無効',
        autoSave: value ? '有効' : '無効'
      };

      if (key === 'theme' || key === 'language') {
        return descriptions[key][value] || value;
      }
      return descriptions[key];
    }

    // 設定を画面に表示する関数
    function displayConfig(config) {
      let html = '<h2>現在の設定</h2>';

      html += '<div class="config-item">';
      html += '<span class="config-label">テーマ:</span>';
      html += '<span class="config-value">' + getConfigDescription('theme', config.theme) + '</span>';
      html += '</div>';

      html += '<div class="config-item">';
      html += '<span class="config-label">言語:</span>';
      html += '<span class="config-value">' + getConfigDescription('language', config.language) + '</span>';
      html += '</div>';

      html += '<div class="config-item">';
      html += '<span class="config-label">通知:</span>';
      html += '<span class="config-value">' + getConfigDescription('notifications', config.notifications) + '</span>';
      html += '</div>';

      html += '<div class="config-item">';
      html += '<span class="config-label">自動保存:</span>';
      html += '<span class="config-value">' + getConfigDescription('autoSave', config.autoSave) + '</span>';
      html += '</div>';

      html += '<div class="config-item">';
      html += '<span class="config-label">更新日時:</span>';
      html += '<span class="config-value">' + config.updatedAt + '</span>';
      html += '</div>';

      const resultElement = document.getElementById('result');
      resultElement.innerHTML = html;
      resultElement.style.display = 'block';
    }

    // 入力値を取得する関数
    function getInputSettings() {
      const theme = document.getElementById('theme').value;
      const language = document.getElementById('language').value;
      const notifications = document.getElementById('notifications').checked;
      const autoSave = document.getElementById('autoSave').checked;

      return {
        theme: theme || undefined,
        language: language || undefined,
        notifications: notifications,
        autoSave: autoSave
      };
    }

    // 設定を適用するメイン関数
    function applySettings() {
      // 入力値を取得
      const settings = getInputSettings();

      // アプリを設定（デフォルト引数が活用される）
      const config = configureApp(
        settings.theme,
        settings.language,
        settings.notifications,
        settings.autoSave
      );

      // 設定を表示
      displayConfig(config);
    }
  </script>
</body>
</html>
```

**実行フロー（テーマだけを変更した場合）**:
```
ユーザーがテーマを "dark" に変更してボタンをクリック
  ↓
applySettings() を呼び出す
  ↓
処理1: getInputSettings()
  theme = "dark"
  language = ""（デフォルト選択）
  notifications = true（チェック済み）
  autoSave = true（チェック済み）
  ↓
  return {
    theme: "dark",
    language: undefined,
    notifications: true,
    autoSave: true
  }
  ↓
settings = { theme: "dark", language: undefined, notifications: true, autoSave: true }
  ↓
処理2: configureApp("dark", undefined, true, true)
  ↓
  引数の確認:
    theme = "dark"（指定された）
    language = undefined → デフォルト値 'ja' を使用
    notifications = true（指定された）
    autoSave = true（指定された）
  ↓
  return {
    theme: "dark",
    language: "ja",
    notifications: true,
    autoSave: true,
    updatedAt: "2025/11/26 10:30:00"
  }
  ↓
config = { ... }
  ↓
処理3: displayConfig(config)
  画面に設定を表示
  ↓
関数終了
```
</details>

---

## まとめ

### 重要なポイント

1. **デフォルト引数の構文**
   ```javascript
   function 関数名(引数名 = デフォルト値) {
     // 処理
   }
   ```

2. **デフォルト引数のメリット**
   - コードが短く、読みやすくなる
   - 引数を省略できる
   - より柔軟な関数を作成できる

3. **デフォルト引数のルール**
   - デフォルト引数は後ろから設定する
   - undefinedを渡すとデフォルト値が使われる
   - nullや空文字列は値として扱われる

4. **従来の方法との比較**
   ```javascript
   // 従来の方法（長い）
   function greet(name) {
     if (name === undefined) {
       name = 'ゲスト';
     }
     console.log('こんにちは、' + name + 'さん');
   }

   // デフォルト引数（短い）
   function greet(name = 'ゲスト') {
     console.log('こんにちは、' + name + 'さん');
   }
   ```

5. **よく使うパターン**
   ```javascript
   // パターン1: 基本的なデフォルト値
   function greet(name = 'ゲスト') { ... }

   // パターン2: 複数のデフォルト値
   function configure(a = 1, b = 2, c = 3) { ... }

   // パターン3: オブジェクトのデフォルト値
   function setup(options = { debug: false, theme: 'light' }) { ... }

   // パターン4: 計算式のデフォルト値
   function calc(a, b = a * 2) { ... }
   ```

### カリキュラム要件チェック

このレッスンで学んだ内容を確認しましょう：

✅ **function(name = "ゲスト")**: デフォルト引数の基本構文を理解し、使えるようになりました
✅ **引数省略時の値**: 引数が省略された場合にデフォルト値が使われる仕組みを学びました
✅ **柔軟な関数**: デフォルト引数を使って、より柔軟で使いやすい関数を作成できるようになりました
✅ **【知識】デフォルトパラメータ、オプション引数**: デフォルト引数の概念と、オプショナルな引数の作り方を理解しました
✅ **成果物：柔軟な関数**: 通知システム、割引計算、ユーザー登録、設定管理など、デフォルト引数を活用した柔軟な関数を作成しました

---

## 次のレッスンの予告

次回のレッスン116では、**ローカル変数**について学びます。

これまでは関数の引数や戻り値を中心に学んできましたが、次回は：
- 関数内で宣言した変数のスコープ
- グローバル変数とローカル変数の違い
- 変数の寿命と有効範囲

といった、変数のスコープに関する重要な概念を学びます。

---

**🎯 今日の達成目標**
- [x] デフォルト引数の構文を理解する
- [x] 引数が省略された場合の動作を理解する
- [x] 複数のデフォルト引数を使える
- [x] デフォルト引数の注意点を理解する
- [x] より柔軟な関数を作成できる

お疲れさまでした！次のレッスンも頑張りましょう！
