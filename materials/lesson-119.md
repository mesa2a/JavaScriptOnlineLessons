# レッスン119：単一責任

## 学習目標
- 単一責任の原則を理解する
- 1つの関数が1つの仕事だけをすることの重要性を学ぶ
- 関数を小さく保つことでテストしやすくなることを理解する

## 単一責任の原則とは

**単一責任の原則（Single Responsibility Principle）**とは、1つの関数は1つの仕事だけをするべきという考え方です。

```javascript
// 悪い例：複数の仕事をしている
function processUser() {
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;

  // 1. 入力チェック
  if (name === '' || email === '') {
    alert('入力してください');
    return;
  }

  // 2. データ加工
  const userData = {
    name: name,
    email: email,
    createdAt: new Date()
  };

  // 3. 保存
  localStorage.setItem('user', JSON.stringify(userData));

  // 4. 画面表示
  document.getElementById('output').textContent = name + 'さんを登録しました';
}
```

この関数は4つの仕事をしています。これを分割しましょう。

## 関数を分割する

1つの関数が1つの仕事だけをするように分割します。

```javascript
// 良い例：それぞれが1つの仕事

// 1. 入力を取得する
function getUserInput() {
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;
  return { name: name, email: email };
}

// 2. 入力をチェックする
function validateInput(name, email) {
  if (name === '' || email === '') {
    return false;
  }
  return true;
}

// 3. ユーザーデータを作成する
function createUserData(name, email) {
  return {
    name: name,
    email: email,
    createdAt: new Date()
  };
}

// 4. データを保存する
function saveUser(userData) {
  localStorage.setItem('user', JSON.stringify(userData));
}

// 5. 結果を表示する
function showResult(name) {
  document.getElementById('output').textContent = name + 'さんを登録しました';
}

// メイン処理
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

## 単一責任のメリット

### 1. 理解しやすい

短い関数は読みやすく、何をしているかすぐわかります。

```javascript
// わかりにくい
function calc(a, b) {
  return (a + b) * 1.1;
}

// わかりやすい
function calculateSubtotal(price, quantity) {
  return price * quantity;
}

function addTax(subtotal) {
  return subtotal * 1.1;
}
```

### 2. 再利用しやすい

小さな関数は他の場所でも使えます。

```javascript
// 税金計算を他の場所でも使える
function addTax(amount) {
  const TAX_RATE = 0.1;
  return amount + (amount * TAX_RATE);
}

// 商品価格
const productPrice = addTax(1000);

// 送料
const shippingFee = addTax(500);

// 合計
const total = addTax(1500);
```

### 3. テストしやすい

1つの仕事だけをする関数は、テストが簡単です。

```javascript
// テストしやすい関数
function isValidEmail(email) {
  return email.includes('@');
}

// テストコード例
console.log(isValidEmail('test@example.com'));  // true
console.log(isValidEmail('invalid'));           // false
```

### 4. 修正しやすい

問題が起きた時、どの関数を直せばいいかすぐわかります。

```javascript
// 税率が変わった時、この関数だけ修正すればOK
function calculateTax(price) {
  const TAX_RATE = 0.1;  // ここだけ変更
  return price * TAX_RATE;
}
```

## 関数を小さく保つ

関数は**5〜15行程度**に収めることを目指しましょう。

### 長すぎる関数の例

```javascript
function processOrder() {
  // 50行以上のコード...
  // 読むのが大変！
}
```

### 小さく分割した例

```javascript
function processOrder() {
  const items = getOrderItems();
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;
  showOrderSummary(total);
}

// それぞれの関数は短くてわかりやすい
function getOrderItems() {
  // 3行
}

function calculateSubtotal(items) {
  // 5行
}

function calculateTax(subtotal) {
  // 2行
}

function showOrderSummary(total) {
  // 4行
}
```

## 実践例：ユーザー登録フォーム

単一責任を意識した実装です。

```javascript
// 入力を取得（1つの仕事）
function getFormData() {
  return {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };
}

// ユーザー名をチェック（1つの仕事）
function isValidUsername(username) {
  return username.length >= 3;
}

// メールをチェック（1つの仕事）
function isValidEmail(email) {
  return email.includes('@') && email.includes('.');
}

// パスワードをチェック（1つの仕事）
function isValidPassword(password) {
  return password.length >= 8;
}

// 全体をチェック（複数のチェックを組み合わせる）
function validateForm(data) {
  if (!isValidUsername(data.username)) {
    return { valid: false, message: 'ユーザー名は3文字以上' };
  }
  if (!isValidEmail(data.email)) {
    return { valid: false, message: '正しいメールアドレスを入力' };
  }
  if (!isValidPassword(data.password)) {
    return { valid: false, message: 'パスワードは8文字以上' };
  }
  return { valid: true, message: '' };
}

// エラー表示（1つの仕事）
function showError(message) {
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}

// 成功表示（1つの仕事）
function showSuccess(username) {
  const successDiv = document.getElementById('success');
  successDiv.textContent = username + 'さん、登録完了しました！';
  successDiv.style.display = 'block';
}

// メイン処理（全体の流れを制御）
function register() {
  const data = getFormData();
  const validation = validateForm(data);

  if (!validation.valid) {
    showError(validation.message);
    return;
  }

  // 登録処理...
  showSuccess(data.username);
}
```

それぞれの関数が短く、1つの仕事だけをしています。

## 「1つの仕事」の見極め方

関数名で簡単に説明できるなら、それは1つの仕事です。

### 良い例

```javascript
function calculateTotal() { }     // 「合計を計算する」
function validateEmail() { }      // 「メールを検証する」
function saveToStorage() { }      // 「ストレージに保存する」
```

### 悪い例

```javascript
// 「データを取得して、検証して、保存して、表示する」
// → これは4つの仕事！
function getAndValidateAndSaveAndShow() { }
```

## 分割しすぎに注意

小さすぎる関数も問題です。バランスが大切です。

### 分割しすぎの例

```javascript
// 小さすぎる
function addOne(n) {
  return n + 1;
}

function multiplyByTwo(n) {
  return n * 2;
}

// これで十分
function calculate(n) {
  return (n + 1) * 2;
}
```

### 適切な分割

```javascript
// 適切：意味のあるまとまり
function calculateDiscountedPrice(price, discountRate) {
  const discount = calculateDiscount(price, discountRate);
  return price - discount;
}

function calculateDiscount(price, rate) {
  return price * (rate / 100);
}
```

## まとめ

1. **1つの関数は1つの仕事**だけをする
2. 関数は**短く（5〜15行）**保つ
3. 短い関数は**理解しやすく、テストしやすい**
4. **再利用しやすく、修正しやすい**コードになる
5. 関数名で仕事が簡単に説明できるか確認する
6. 分割しすぎにも注意する

### チェックリスト

関数を書いたら、以下を確認しましょう：

- ✅ 1つの仕事だけをしているか？
- ✅ 関数名で簡単に説明できるか？
- ✅ 15行以内に収まっているか？
- ✅ 他の場所でも使えそうか？
- ✅ テストしやすいか？

単一責任を意識することで、保守しやすく、バグの少ないコードを書くことができます。

次回は、関数の名前付けについて学びます。
