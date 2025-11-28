# Lesson 119: 単一責任

**作成日: 2025-11-26**

---

## このレッスンで学ぶこと

### 前回の復習
前回のレッスンでは、**引数と戻り値の型**について学びました：

```javascript
// 型チェックで安全な関数を作る
function calculateTax(price) {
  if (typeof price !== 'number') {
    return 0;  // エラー時も数値を返す
  }
  return price * 0.1;  // 常に数値を返す
}
```

型を意識することで、バグを減らし、予測可能な関数を作ることができました。

### よくある場面
プログラミングをしていると、こんな関数を書いてしまうことがあります：

```javascript
function processUser() {
  // 入力を取得
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;

  // 入力をチェック
  if (name === '' || email === '') {
    alert('入力してください');
    return;
  }

  // データを加工
  const userData = { name: name, email: email };

  // データを保存
  localStorage.setItem('user', JSON.stringify(userData));

  // 結果を表示
  document.getElementById('output').textContent = '登録完了';
}
```

この関数は**5つの仕事**をしています。読みづらく、テストしにくく、修正も大変です。

### 学習目標
このレッスンでは：
- ✅ **単一責任の原則**を理解する
- ✅ **1つの関数 = 1つの仕事**にすることの重要性を学ぶ
- ✅ **関数を小さく**保つメリットを理解する
- ✅ 関数を**テストしやすく**する方法を学ぶ

---

## 1. 単一責任の原則とは？

### 日常生活のアナロジー：レストランの役割分担

単一責任の原則を理解するために、**レストラン**をイメージしてみましょう：

```
❌ 悪い例：1人がすべてをやる
┌────────────────────────────┐
│ スタッフA（1人）           │
│                            │
│ ・お客様を案内する         │
│ ・注文を聞く               │
│ ・料理を作る               │
│ ・料理を運ぶ               │
│ ・会計をする               │
│ ・皿を洗う                 │
│                            │
│ → 大変！ミスも多い！       │
└────────────────────────────┘

✅ 良い例：役割分担
┌────────────────────────────┐
│ ホール担当                 │
│ ・お客様を案内する         │
│ ・注文を聞く               │
└────────────────────────────┘

┌────────────────────────────┐
│ 調理担当                   │
│ ・料理を作る               │
└────────────────────────────┘

┌────────────────────────────┐
│ 配膳担当                   │
│ ・料理を運ぶ               │
└────────────────────────────┘

┌────────────────────────────┐
│ 会計担当                   │
│ ・会計をする               │
└────────────────────────────┘

→ 効率的！それぞれの仕事に集中できる！
```

関数も同じです。1つの関数が1つの仕事だけをすることで、コードが読みやすく、管理しやすくなります。

### 基本的な定義

**単一責任の原則（Single Responsibility Principle）**とは、**1つの関数は1つの仕事だけをするべき**という考え方です。

### 悪い例：複数の仕事をしている

```javascript
function processUser() {
  // 仕事1: 入力を取得
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;

  // 仕事2: 入力をチェック
  if (name === '' || email === '') {
    alert('入力してください');
    return;
  }

  // 仕事3: データを加工
  const userData = {
    name: name,
    email: email,
    createdAt: new Date()
  };

  // 仕事4: データを保存
  localStorage.setItem('user', JSON.stringify(userData));

  // 仕事5: 結果を表示
  document.getElementById('output').textContent = name + 'さんを登録しました';
}
```

この関数は**5つの仕事**をしています：
1. 入力を取得する
2. 入力をチェックする
3. データを加工する
4. データを保存する
5. 結果を表示する

### 問題点の図解

```
processUser関数の問題
═══════════════════════════════════════

processUser() {
  ┌─────────────────────┐
  │ 仕事1: 入力取得     │
  ├─────────────────────┤
  │ 仕事2: 入力チェック │
  ├─────────────────────┤
  │ 仕事3: データ加工   │
  ├─────────────────────┤
  │ 仕事4: データ保存   │
  ├─────────────────────┤
  │ 仕事5: 結果表示     │
  └─────────────────────┘
}

問題点：
❌ 読みづらい（何をしているか把握しにくい）
❌ テストしづらい（全体をテストするしかない）
❌ 再利用できない（他の場所で使えない）
❌ 修正しづらい（どこを直せばいいかわかりにくい）
```

---

## 2. 関数を分割する

1つの関数が1つの仕事だけをするように分割します。

### 良い例：それぞれが1つの仕事

```javascript
// 仕事1: 入力を取得する
function getUserInput() {
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;
  return { name: name, email: email };
}

// 仕事2: 入力をチェックする
function validateInput(name, email) {
  if (name === '' || email === '') {
    return false;
  }
  return true;
}

// 仕事3: ユーザーデータを作成する
function createUserData(name, email) {
  return {
    name: name,
    email: email,
    createdAt: new Date()
  };
}

// 仕事4: データを保存する
function saveUser(userData) {
  localStorage.setItem('user', JSON.stringify(userData));
}

// 仕事5: 結果を表示する
function showResult(name) {
  document.getElementById('output').textContent = name + 'さんを登録しました';
}

// メイン処理（全体の流れを制御）
function processUser() {
  const input = getUserInput();

  if (!validateInput(input.name, input.email)) {
    alert('入力してください');
    return;
  }

  const userData = createUserData(input.name, input.email);
  saveUser(userData);
  showResult(input.name);
}
```

### 分割後の構造図解

```
分割後の構造
═══════════════════════════════════════

processUser() {
  ↓
  getUserInput()      ← 仕事1だけ
  ↓
  validateInput()     ← 仕事2だけ
  ↓
  createUserData()    ← 仕事3だけ
  ↓
  saveUser()          ← 仕事4だけ
  ↓
  showResult()        ← 仕事5だけ
}

メリット：
✅ 読みやすい（各関数が何をするかすぐわかる）
✅ テストしやすい（個別にテストできる）
✅ 再利用できる（他の場所でも使える）
✅ 修正しやすい（どの関数を直せばいいか明確）
```

### 実行フロー図解

```
processUser()の実行
═══════════════════════════════════════

1. getUserInput()を呼び出す
   ↓
   { name: '太郎', email: 'taro@example.com' }

2. validateInput('太郎', 'taro@example.com')を呼び出す
   ↓
   true（入力OK）

3. createUserData('太郎', 'taro@example.com')を呼び出す
   ↓
   {
     name: '太郎',
     email: 'taro@example.com',
     createdAt: Date(...)
   }

4. saveUser(userData)を呼び出す
   ↓
   localStorageに保存

5. showResult('太郎')を呼び出す
   ↓
   画面に「太郎さんを登録しました」を表示
```

---

## 3. 単一責任のメリット

### メリット1: 理解しやすい

短い関数は読みやすく、何をしているかすぐわかります。

**悪い例**：
```javascript
// わかりにくい
function calc(a, b) {
  return (a + b) * 1.1;  // 何を計算している？
}
```

**良い例**：
```javascript
// わかりやすい
function calculateSubtotal(price, quantity) {
  return price * quantity;  // 小計を計算
}

function addTax(subtotal) {
  return subtotal * 1.1;  // 税込み価格を計算
}
```

### メリット2: 再利用しやすい

小さな関数は他の場所でも使えます。

```javascript
// 税金計算関数（単一責任）
function addTax(amount) {
  const TAX_RATE = 0.1;
  return amount + (amount * TAX_RATE);
}

// 様々な場所で再利用できる
const productPrice = addTax(1000);   // 商品価格
const shippingFee = addTax(500);     // 送料
const giftWrap = addTax(200);        // ギフト包装
const total = addTax(1700);          // 合計
```

### 再利用の図解

```
addTax関数の再利用
═══════════════════════════════════════

addTax(amount) {
  税込み価格を計算する（単一責任）
}
    ↓         ↓         ↓
商品価格   送料      ギフト包装
1100円    550円     220円

1つの関数を様々な場所で使える！
```

### メリット3: テストしやすい

1つの仕事だけをする関数は、テストが簡単です。

```javascript
// テストしやすい関数（単一責任）
function isValidEmail(email) {
  return email.includes('@') && email.includes('.');
}

// テストコード例
console.log(isValidEmail('test@example.com'));  // true ✅
console.log(isValidEmail('invalid'));           // false ✅
console.log(isValidEmail('test@'));             // false ✅
console.log(isValidEmail('@example.com'));      // false ✅
```

### テストの図解

```
単一責任の関数はテストしやすい
═══════════════════════════════════════

isValidEmail(email) {
  emailに@と.が含まれているかチェック
}

テストケース：
入力: 'test@example.com' → 出力: true  ✅
入力: 'invalid'          → 出力: false ✅
入力: 'test@'            → 出力: false ✅
入力: '@example.com'     → 出力: false ✅

各ケースを簡単にテストできる！
```

### メリット4: 修正しやすい

問題が起きた時、どの関数を直せばいいかすぐわかります。

```javascript
// 税率が変わった時、この関数だけ修正すればOK
function calculateTax(price) {
  const TAX_RATE = 0.1;  // ここだけ変更すればいい
  return price * TAX_RATE;
}

// 他の関数は変更不要
function calculateSubtotal(price, quantity) {
  return price * quantity;  // 変更不要
}

function calculateTotal(subtotal, tax) {
  return subtotal + tax;  // 変更不要
}
```

### 修正のしやすさの図解

```
修正が必要な場所が明確
═══════════════════════════════════════

税率変更の場合：
┌─────────────────────┐
│ calculateTax()      │ ← ここだけ修正
│ const TAX_RATE = 0.1│
└─────────────────────┘

┌─────────────────────┐
│ calculateSubtotal() │ ← 修正不要
└─────────────────────┘

┌─────────────────────┐
│ calculateTotal()    │ ← 修正不要
└─────────────────────┘

1箇所だけ修正すればOK！
```

---

## 4. 関数を小さく保つ

関数は**5〜15行程度**に収めることを目指しましょう。

### 長すぎる関数の例

```javascript
function processOrder() {
  // 入力を取得
  const item1 = document.getElementById('item1').value;
  const item2 = document.getElementById('item2').value;
  const item3 = document.getElementById('item3').value;

  // 価格を取得
  const price1 = Number(document.getElementById('price1').value);
  const price2 = Number(document.getElementById('price2').value);
  const price3 = Number(document.getElementById('price3').value);

  // 小計を計算
  const subtotal = price1 + price2 + price3;

  // 税金を計算
  const tax = subtotal * 0.1;

  // 合計を計算
  const total = subtotal + tax;

  // 割引を計算
  let discount = 0;
  if (total >= 10000) {
    discount = 1000;
  } else if (total >= 5000) {
    discount = 500;
  }

  // 最終金額を計算
  const finalTotal = total - discount;

  // 結果を表示
  document.getElementById('subtotal').textContent = subtotal + '円';
  document.getElementById('tax').textContent = tax + '円';
  document.getElementById('discount').textContent = discount + '円';
  document.getElementById('total').textContent = finalTotal + '円';

  // ... さらに続く（50行以上）
}
```

この関数は**長すぎて**読むのが大変です。

### 小さく分割した例

```javascript
// メイン処理（全体の流れ）
function processOrder() {
  const items = getOrderItems();
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal + tax);
  const total = subtotal + tax - discount;
  showOrderSummary(subtotal, tax, discount, total);
}

// それぞれの関数は短くてわかりやすい

function getOrderItems() {
  return [
    { name: 'item1', price: Number(document.getElementById('price1').value) },
    { name: 'item2', price: Number(document.getElementById('price2').value) },
    { name: 'item3', price: Number(document.getElementById('price3').value) }
  ];
}

function calculateSubtotal(items) {
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    sum += items[i].price;
  }
  return sum;
}

function calculateTax(subtotal) {
  return subtotal * 0.1;
}

function calculateDiscount(total) {
  if (total >= 10000) {
    return 1000;
  } else if (total >= 5000) {
    return 500;
  }
  return 0;
}

function showOrderSummary(subtotal, tax, discount, total) {
  document.getElementById('subtotal').textContent = subtotal + '円';
  document.getElementById('tax').textContent = tax + '円';
  document.getElementById('discount').textContent = discount + '円';
  document.getElementById('total').textContent = total + '円';
}
```

### 分割の効果の図解

```
長い関数 vs 小さく分割した関数
═══════════════════════════════════════

❌ 長い関数（50行以上）
┌────────────────────────────┐
│ processOrder() {           │
│   // 50行以上のコード...   │
│   // 読むのが大変！         │
│   // 何をしているか追いにくい│
│ }                          │
└────────────────────────────┘

✅ 小さく分割（各5〜15行）
┌────────────────────────────┐
│ processOrder() {           │ ← 8行（流れがわかる）
│   items = getOrderItems()  │
│   subtotal = calculate...  │
│   ...                      │
│ }                          │
└────────────────────────────┘
        ↓
┌────────────────────────────┐
│ getOrderItems() { }        │ ← 7行
├────────────────────────────┤
│ calculateSubtotal() { }    │ ← 6行
├────────────────────────────┤
│ calculateTax() { }         │ ← 3行
├────────────────────────────┤
│ calculateDiscount() { }    │ ← 8行
├────────────────────────────┤
│ showOrderSummary() { }     │ ← 5行
└────────────────────────────┘

各関数が短く、読みやすい！
```

---

## 5. 実践例：ユーザー登録フォーム

単一責任を意識した完全な実装例を見てみましょう。

### コード全体

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ユーザー登録フォーム</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f0f0f0;
    }

    .container {
      background-color: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    h1 {
      text-align: center;
      color: #2196F3;
      margin-bottom: 30px;
    }

    .input-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #2196F3;
    }

    button {
      width: 100%;
      padding: 15px;
      background-color: #2196F3;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 18px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #1976D2;
    }

    .message {
      margin-top: 20px;
      padding: 15px;
      border-radius: 5px;
      font-size: 16px;
      display: none;
    }

    .error {
      background-color: #FFEBEE;
      color: #C62828;
      border-left: 4px solid #F44336;
      display: block;
    }

    .success {
      background-color: #E8F5E9;
      color: #2E7D32;
      border-left: 4px solid #4CAF50;
      display: block;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>👤 ユーザー登録フォーム</h1>

    <div class="input-group">
      <label for="username">ユーザー名：</label>
      <input type="text" id="username" placeholder="3文字以上">
    </div>

    <div class="input-group">
      <label for="email">メールアドレス：</label>
      <input type="email" id="email" placeholder="example@mail.com">
    </div>

    <div class="input-group">
      <label for="password">パスワード：</label>
      <input type="password" id="password" placeholder="8文字以上">
    </div>

    <button onclick="register()">登録</button>

    <div id="message" class="message"></div>
  </div>

  <script>
    // 単一責任1: フォームデータを取得する
    function getFormData() {
      return {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      };
    }

    // 単一責任2: ユーザー名をチェックする
    function isValidUsername(username) {
      return username.length >= 3;
    }

    // 単一責任3: メールアドレスをチェックする
    function isValidEmail(email) {
      return email.includes('@') && email.includes('.');
    }

    // 単一責任4: パスワードをチェックする
    function isValidPassword(password) {
      return password.length >= 8;
    }

    // 単一責任5: 全体のバリデーション（複数のチェックを組み合わせる）
    function validateForm(data) {
      if (!isValidUsername(data.username)) {
        return { valid: false, message: 'ユーザー名は3文字以上入力してください' };
      }
      if (!isValidEmail(data.email)) {
        return { valid: false, message: '正しいメールアドレスを入力してください' };
      }
      if (!isValidPassword(data.password)) {
        return { valid: false, message: 'パスワードは8文字以上入力してください' };
      }
      return { valid: true, message: '' };
    }

    // 単一責任6: エラーメッセージを表示する
    function showError(message) {
      const messageDiv = document.getElementById('message');
      messageDiv.textContent = '❌ ' + message;
      messageDiv.className = 'message error';
    }

    // 単一責任7: 成功メッセージを表示する
    function showSuccess(username) {
      const messageDiv = document.getElementById('message');
      messageDiv.textContent = '✅ ' + username + 'さん、登録が完了しました！';
      messageDiv.className = 'message success';
    }

    // 単一責任8: フォームをクリアする
    function clearForm() {
      document.getElementById('username').value = '';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
    }

    // メイン処理（全体の流れを制御）
    function register() {
      // 1. データ取得
      const data = getFormData();

      // 2. バリデーション
      const validation = validateForm(data);

      // 3. エラーがあれば表示して終了
      if (!validation.valid) {
        showError(validation.message);
        return;
      }

      // 4. 登録処理（ここでは省略）
      // ... 実際のアプリでは、サーバーに送信する処理など

      // 5. 成功メッセージを表示
      showSuccess(data.username);

      // 6. フォームをクリア
      clearForm();
    }
  </script>
</body>
</html>
```

### 各関数の責任の図解

```
各関数の単一責任
═══════════════════════════════════════

getFormData()
└→ フォームデータを取得する（1つの仕事）

isValidUsername()
└→ ユーザー名をチェックする（1つの仕事）

isValidEmail()
└→ メールアドレスをチェックする（1つの仕事）

isValidPassword()
└→ パスワードをチェックする（1つの仕事）

validateForm()
└→ 全体のバリデーションを行う（複数のチェックを組み合わせる）

showError()
└→ エラーメッセージを表示する（1つの仕事）

showSuccess()
└→ 成功メッセージを表示する（1つの仕事）

clearForm()
└→ フォームをクリアする（1つの仕事）

register()
└→ 全体の流れを制御する（メイン処理）
```

### 実行フロー図解

```
register()の実行
═══════════════════════════════════════

1. getFormData()
   ↓
   { username: 'taro', email: 'taro@mail.com', password: '12345678' }

2. validateForm(data)
   ↓
   isValidUsername('taro')
     → true（3文字以上）
   ↓
   isValidEmail('taro@mail.com')
     → true（@と.を含む）
   ↓
   isValidPassword('12345678')
     → true（8文字以上）
   ↓
   { valid: true, message: '' }

3. バリデーションOKなので、登録処理へ

4. showSuccess('taro')
   ↓
   画面に「taroさん、登録が完了しました！」を表示

5. clearForm()
   ↓
   フォームをクリア
```

---

## 6. 「1つの仕事」の見極め方

関数名で簡単に説明できるなら、それは1つの仕事です。

### 良い例：1つの仕事

```javascript
function calculateTotal() { }     // 「合計を計算する」→ 1つの仕事 ✅
function validateEmail() { }      // 「メールを検証する」→ 1つの仕事 ✅
function saveToStorage() { }      // 「ストレージに保存する」→ 1つの仕事 ✅
function showErrorMessage() { }   // 「エラーメッセージを表示する」→ 1つの仕事 ✅
```

### 悪い例：複数の仕事

```javascript
// 「データを取得して、検証して、保存して、表示する」
// → これは4つの仕事！ ❌
function getAndValidateAndSaveAndShow() { }

// 「ユーザーを作成してメールを送る」
// → これは2つの仕事！ ❌
function createUserAndSendEmail() { }
```

### 見極め方のチェックリスト

関数を書いたら、以下を確認しましょう：

```
✅ チェックリスト
═══════════════════════════════════════

□ 関数名に「and」「と」が含まれていないか？
  → 含まれている場合は複数の仕事をしている可能性

□ 関数名で簡単に説明できるか？
  → できない場合は複数の仕事をしている可能性

□ 関数内で「// ステップ1」「// ステップ2」のようなコメントが必要か？
  → 必要な場合は複数の仕事をしている可能性

□ 15行以内に収まっているか？
  → 超えている場合は分割を検討
```

---

## 7. 分割しすぎに注意

小さすぎる関数も問題です。バランスが大切です。

### 分割しすぎの例

```javascript
// ❌ 小さすぎる（分割しすぎ）
function addOne(n) {
  return n + 1;
}

function multiplyByTwo(n) {
  return n * 2;
}

function calculate(n) {
  const step1 = addOne(n);
  const step2 = multiplyByTwo(step1);
  return step2;
}

// ✅ これで十分（適切）
function calculate(n) {
  return (n + 1) * 2;  // シンプルな計算は1つの関数でOK
}
```

### 適切な分割

```javascript
// ✅ 適切：意味のあるまとまりで分割
function calculateDiscountedPrice(price, discountRate) {
  const discount = calculateDiscount(price, discountRate);
  return price - discount;
}

function calculateDiscount(price, rate) {
  return price * (rate / 100);
}

// calculateDiscount()は他の場所でも使える可能性がある
// → 分割する価値がある
```

### 分割の判断基準

```
分割すべき？
═══════════════════════════════════════

✅ 分割すべき場合：
- その処理が他の場所でも使われる可能性がある
- その処理が意味的にまとまっている
- その処理をテストしたい
- 関数が15行を超えている

❌ 分割すべきでない場合：
- その処理が1〜2行の単純な計算
- その処理がその場所でしか使わない
- 分割することで逆に読みにくくなる
```

---

## 練習問題

### 問題1: 関数を分割する（基本）

以下の関数を、単一責任の原則に従って分割してください：

```javascript
function checkAndShowAge() {
  const age = Number(document.getElementById('ageInput').value);

  if (age < 0 || age > 150) {
    document.getElementById('output').textContent = '正しい年齢を入力してください';
    return;
  }

  if (age >= 20) {
    document.getElementById('output').textContent = '成人です';
  } else {
    document.getElementById('output').textContent = '未成年です';
  }
}
```

**要件**：
- 入力取得、バリデーション、判定、表示を別々の関数に分ける
- 各関数が1つの仕事だけをするようにする

<details>
<summary>解答例</summary>

```javascript
// 単一責任1: 年齢を取得する
function getAge() {
  return Number(document.getElementById('ageInput').value);
}

// 単一責任2: 年齢が有効かチェックする
function isValidAge(age) {
  return age >= 0 && age <= 150;
}

// 単一責任3: 成人かどうか判定する
function isAdult(age) {
  return age >= 20;
}

// 単一責任4: エラーメッセージを表示する
function showError(message) {
  document.getElementById('output').textContent = message;
}

// 単一責任5: 結果を表示する
function showAgeResult(isAdult) {
  const message = isAdult ? '成人です' : '未成年です';
  document.getElementById('output').textContent = message;
}

// メイン処理
function checkAndShowAge() {
  // 1. 入力を取得
  const age = getAge();

  // 2. バリデーション
  if (!isValidAge(age)) {
    showError('正しい年齢を入力してください');
    return;
  }

  // 3. 判定
  const adult = isAdult(age);

  // 4. 結果表示
  showAgeResult(adult);
}
```

**各関数の役割**：

```
各関数の単一責任
═══════════════════════════════════════

getAge()
└→ 年齢を取得する（1つの仕事）

isValidAge()
└→ 年齢が有効かチェックする（1つの仕事）

isAdult()
└→ 成人かどうか判定する（1つの仕事）

showError()
└→ エラーメッセージを表示する（1つの仕事）

showAgeResult()
└→ 結果を表示する（1つの仕事）

checkAndShowAge()
└→ 全体の流れを制御する（メイン処理）
```

</details>

---

### 問題2: 計算処理を分割する（応用）

以下の関数を、単一責任の原則に従って分割してください：

```javascript
function calculateAndShow() {
  const price = Number(document.getElementById('priceInput').value);
  const quantity = Number(document.getElementById('quantityInput').value);

  const subtotal = price * quantity;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  let discount = 0;
  if (total >= 10000) {
    discount = 1000;
  } else if (total >= 5000) {
    discount = 500;
  }

  const finalTotal = total - discount;

  document.getElementById('subtotal').textContent = subtotal + '円';
  document.getElementById('tax').textContent = tax + '円';
  document.getElementById('discount').textContent = discount + '円';
  document.getElementById('total').textContent = finalTotal + '円';
}
```

**要件**：
- 入力取得、小計計算、税計算、割引計算、表示を別々の関数に分ける
- 各関数が1つの仕事だけをするようにする

<details>
<summary>解答例</summary>

```javascript
// 単一責任1: 入力を取得する
function getInputValues() {
  return {
    price: Number(document.getElementById('priceInput').value),
    quantity: Number(document.getElementById('quantityInput').value)
  };
}

// 単一責任2: 小計を計算する
function calculateSubtotal(price, quantity) {
  return price * quantity;
}

// 単一責任3: 税金を計算する
function calculateTax(subtotal) {
  return subtotal * 0.1;
}

// 単一責任4: 割引を計算する
function calculateDiscount(total) {
  if (total >= 10000) {
    return 1000;
  } else if (total >= 5000) {
    return 500;
  }
  return 0;
}

// 単一責任5: 結果を表示する
function showOrderSummary(subtotal, tax, discount, finalTotal) {
  document.getElementById('subtotal').textContent = subtotal + '円';
  document.getElementById('tax').textContent = tax + '円';
  document.getElementById('discount').textContent = discount + '円';
  document.getElementById('total').textContent = finalTotal + '円';
}

// メイン処理
function calculateAndShow() {
  // 1. 入力を取得
  const input = getInputValues();

  // 2. 小計を計算
  const subtotal = calculateSubtotal(input.price, input.quantity);

  // 3. 税金を計算
  const tax = calculateTax(subtotal);

  // 4. 合計を計算
  const total = subtotal + tax;

  // 5. 割引を計算
  const discount = calculateDiscount(total);

  // 6. 最終金額を計算
  const finalTotal = total - discount;

  // 7. 結果を表示
  showOrderSummary(subtotal, tax, discount, finalTotal);
}
```

**実行フロー**：

```
calculateAndShow()の実行
（価格: 8000円、数量: 2個の場合）
═══════════════════════════════════════

1. getInputValues()
   ↓
   { price: 8000, quantity: 2 }

2. calculateSubtotal(8000, 2)
   ↓
   16000円

3. calculateTax(16000)
   ↓
   1600円

4. total = 16000 + 1600 = 17600円

5. calculateDiscount(17600)
   ↓
   17600 >= 10000 なので 1000円割引

6. finalTotal = 17600 - 1000 = 16600円

7. showOrderSummary(16000, 1600, 1000, 16600)
   ↓
   画面に表示：
   小計: 16000円
   税金: 1600円
   割引: 1000円
   合計: 16600円
```

</details>

---

### 問題3: 完全なアプリを作る（発展）

以下の要件を満たす「成績判定アプリ」を作成してください：

**要件**：
1. 3つの科目の点数（国語、数学、英語）を入力するフォーム
2. 「判定」ボタンを押すと、以下を表示：
   - 合計点
   - 平均点
   - 判定（80点以上: 優、60点以上: 良、40点以上: 可、40点未満: 不可）
3. 各機能を単一責任の関数に分ける
4. 入力チェック（0〜100の範囲）も行う

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>成績判定アプリ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #FFF3E0;
    }

    .container {
      background-color: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    h1 {
      text-align: center;
      color: #FF6F00;
      margin-bottom: 30px;
    }

    .input-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      box-sizing: border-box;
    }

    button {
      width: 100%;
      padding: 15px;
      background-color: #FF6F00;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 18px;
      cursor: pointer;
      font-weight: bold;
    }

    button:hover {
      background-color: #F57C00;
    }

    #output {
      margin-top: 25px;
      padding: 20px;
      border-radius: 5px;
      font-size: 16px;
      display: none;
    }

    .error {
      background-color: #FFEBEE;
      border-left: 4px solid #F44336;
      color: #C62828;
      display: block;
    }

    .result {
      background-color: #FFF3E0;
      border-left: 4px solid #FF6F00;
      color: #E65100;
      display: block;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 成績判定アプリ</h1>

    <div class="input-group">
      <label for="japanese">国語（0〜100点）：</label>
      <input type="number" id="japanese" placeholder="例: 85">
    </div>

    <div class="input-group">
      <label for="math">数学（0〜100点）：</label>
      <input type="number" id="math" placeholder="例: 90">
    </div>

    <div class="input-group">
      <label for="english">英語（0〜100点）：</label>
      <input type="number" id="english" placeholder="例: 75">
    </div>

    <button onclick="judge()">判定</button>

    <div id="output"></div>
  </div>

  <script>
    // 単一責任1: 点数を取得する
    function getScores() {
      return {
        japanese: Number(document.getElementById('japanese').value),
        math: Number(document.getElementById('math').value),
        english: Number(document.getElementById('english').value)
      };
    }

    // 単一責任2: 点数が有効かチェックする
    function isValidScore(score) {
      return score >= 0 && score <= 100;
    }

    // 単一責任3: すべての点数が有効かチェックする
    function validateScores(scores) {
      if (!isValidScore(scores.japanese)) {
        return { valid: false, message: '国語の点数は0〜100の範囲で入力してください' };
      }
      if (!isValidScore(scores.math)) {
        return { valid: false, message: '数学の点数は0〜100の範囲で入力してください' };
      }
      if (!isValidScore(scores.english)) {
        return { valid: false, message: '英語の点数は0〜100の範囲で入力してください' };
      }
      return { valid: true, message: '' };
    }

    // 単一責任4: 合計点を計算する
    function calculateTotal(scores) {
      return scores.japanese + scores.math + scores.english;
    }

    // 単一責任5: 平均点を計算する
    function calculateAverage(total, count) {
      return total / count;
    }

    // 単一責任6: 成績を判定する
    function judgeGrade(average) {
      if (average >= 80) {
        return '優';
      } else if (average >= 60) {
        return '良';
      } else if (average >= 40) {
        return '可';
      } else {
        return '不可';
      }
    }

    // 単一責任7: エラーを表示する
    function showError(message) {
      const output = document.getElementById('output');
      output.textContent = '❌ ' + message;
      output.className = 'error';
    }

    // 単一責任8: 結果を表示する
    function showResult(scores, total, average, grade) {
      const output = document.getElementById('output');
      output.innerHTML =
        '<strong>成績結果</strong><br>' +
        '国語: ' + scores.japanese + '点<br>' +
        '数学: ' + scores.math + '点<br>' +
        '英語: ' + scores.english + '点<br>' +
        '<hr>' +
        '合計点: <strong>' + total + '点</strong><br>' +
        '平均点: <strong>' + average.toFixed(1) + '点</strong><br>' +
        '判定: <strong>' + grade + '</strong>';
      output.className = 'result';
    }

    // メイン処理
    function judge() {
      // 1. 点数を取得
      const scores = getScores();

      // 2. バリデーション
      const validation = validateScores(scores);

      // 3. エラーがあれば表示して終了
      if (!validation.valid) {
        showError(validation.message);
        return;
      }

      // 4. 合計点を計算
      const total = calculateTotal(scores);

      // 5. 平均点を計算
      const average = calculateAverage(total, 3);

      // 6. 成績を判定
      const grade = judgeGrade(average);

      // 7. 結果を表示
      showResult(scores, total, average, grade);
    }
  </script>
</body>
</html>
```

**各関数の単一責任**：

```
各関数の役割
═══════════════════════════════════════

getScores()
└→ 点数を取得する

isValidScore()
└→ 1つの点数が有効かチェックする

validateScores()
└→ すべての点数が有効かチェックする

calculateTotal()
└→ 合計点を計算する

calculateAverage()
└→ 平均点を計算する

judgeGrade()
└→ 成績を判定する

showError()
└→ エラーメッセージを表示する

showResult()
└→ 結果を表示する

judge()
└→ 全体の流れを制御する（メイン処理）
```

</details>

---

## まとめ

このレッスンでは、**単一責任の原則**について学びました。

### 重要なポイント

1. **1つの関数は1つの仕事だけをする**：
   - 複数の仕事を1つの関数にまとめない
   - 意味のあるまとまりで分割する

2. **関数を小さく保つ**：
   - 5〜15行程度を目安にする
   - 長すぎる関数は分割を検討

3. **単一責任のメリット**：
   - **理解しやすい**：短い関数は読みやすい
   - **再利用しやすい**：他の場所でも使える
   - **テストしやすい**：個別にテストできる
   - **修正しやすい**：どこを直せばいいか明確

4. **見極め方**：
   - 関数名で簡単に説明できるか？
   - 関数名に「and」「と」が含まれていないか？
   - 15行以内に収まっているか？

5. **分割しすぎに注意**：
   - 1〜2行の単純な処理は分割しなくてもOK
   - 意味のあるまとまりで分割する

### チェックリスト

関数を書いたら、以下を確認しましょう：

- ✅ 1つの仕事だけをしているか？
- ✅ 関数名で簡単に説明できるか？
- ✅ 15行以内に収まっているか？
- ✅ 他の場所でも使えそうか？
- ✅ テストしやすいか？

### 基本パターン

```javascript
// ❌ 悪い例：複数の仕事をしている
function processData() {
  // 仕事1: データを取得
  // 仕事2: データをチェック
  // 仕事3: データを加工
  // 仕事4: データを保存
  // 仕事5: 結果を表示
}

// ✅ 良い例：それぞれが1つの仕事
function getData() { }      // 仕事1だけ
function validateData() { } // 仕事2だけ
function transformData() { }// 仕事3だけ
function saveData() { }     // 仕事4だけ
function showResult() { }   // 仕事5だけ

function processData() {
  // 全体の流れを制御
  const data = getData();
  if (!validateData(data)) return;
  const transformed = transformData(data);
  saveData(transformed);
  showResult();
}
```

単一責任を意識することで、保守しやすく、バグの少ないコードを書くことができます！

---

## カリキュラム要件チェック

このレッスンで、以下のカリキュラム要件を満たしました：

- ✅ **1つの関数=1つの仕事**：単一責任の原則を理解し、1つの関数が1つの仕事だけをすることの重要性を学びました
- ✅ **関数を小さく**：関数を5〜15行程度に保つことの重要性を理解しました
- ✅ **テストしやすい**：単一責任の関数がテストしやすいことを実践的に理解しました
- ✅ **知識：単一責任の原則、関数の粒度**：単一責任の原則と適切な関数の粒度について学びました
- ✅ **成果物：整理された関数**：ユーザー登録フォーム、成績判定アプリを通じて、整理された関数の書き方を実践的に理解しました

---

## 次のレッスンの予告

次のレッスンでは、**名前付け**について学びます。

- 動詞で始める関数名
- わかりやすい変数名
- 命名規則（キャメルケース、スネークケース）
- 読みやすいコードの書き方

適切な名前を付けることで、コードの可読性が大きく向上します！
