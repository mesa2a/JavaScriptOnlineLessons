# レッスン120：名前付け

## 学習目標
- 関数名の命名規則を理解する
- わかりやすい関数名の付け方を学ぶ
- 自己文書化コードを書けるようになる

## 良い関数名とは

**良い関数名**は、関数の中身を見なくても何をするかわかる名前です。

```javascript
// 悪い例：何をするかわからない
function func1() {
  return price * 1.1;
}

// 良い例：税込価格を計算することがわかる
function calculatePriceWithTax() {
  return price * 1.1;
}
```

## 基本ルール1：動詞で始める

関数は**動作**を表すので、**動詞**で始めます。

### よく使う動詞

| 動詞 | 意味 | 例 |
|------|------|-----|
| get | 取得する | `getUserName()` |
| set | 設定する | `setUserName()` |
| calculate | 計算する | `calculateTotal()` |
| create | 作成する | `createUser()` |
| update | 更新する | `updateProfile()` |
| delete | 削除する | `deleteItem()` |
| show | 表示する | `showMessage()` |
| hide | 非表示にする | `hideModal()` |
| validate | 検証する | `validateEmail()` |
| check | チェックする | `checkPassword()` |
| is / has | 判定する | `isValid()`, `hasPermission()` |

### 動詞の例

```javascript
// データ取得
function getUserData() { }
function getProductList() { }

// データ設定
function setUserName() { }
function setPrice() { }

// 計算
function calculateTotal() { }
function calculateDiscount() { }

// 作成
function createOrder() { }
function createReport() { }

// 更新
function updateCart() { }
function updateStatus() { }

// 表示
function showError() { }
function showLoading() { }

// 検証・判定
function validateForm() { }
function isValidEmail() { }
function hasData() { }
```

## 基本ルール2：具体的な名前をつける

抽象的な名前ではなく、**具体的**な名前をつけます。

### 悪い例：抽象的

```javascript
function process() { }       // 何を処理する？
function handle() { }        // 何を処理する？
function doIt() { }          // 何をする？
function run() { }           // 何を実行する？
```

### 良い例：具体的

```javascript
function processPayment() { }      // 支払い処理
function handleError() { }         // エラー処理
function submitForm() { }          // フォーム送信
function runValidation() { }       // バリデーション実行
```

## 基本ルール3：長すぎず、短すぎず

適切な長さは**2〜4単語**程度です。

### 短すぎる例

```javascript
function calc() { }         // 何を計算？
function get() { }          // 何を取得？
function update() { }       // 何を更新？
```

### 長すぎる例

```javascript
function calculateTheTotalPriceIncludingTaxAndShippingFee() { }
// 長すぎて読みにくい
```

### 適切な例

```javascript
function calculateTotal() { }
function getTotalPrice() { }
function updateCartItem() { }
```

## 基本ルール4：キャメルケースを使う

JavaScriptでは**キャメルケース（camelCase）**を使います。

```javascript
// 正しい：キャメルケース
function calculateTotal() { }
function getUserName() { }
function isValidEmail() { }

// 間違い：スネークケース（Pythonなどで使われる）
function calculate_total() { }
function get_user_name() { }

// 間違い：パスカルケース（クラス名で使われる）
function CalculateTotal() { }
function GetUserName() { }
```

## よくある命名パターン

### 1. 取得系: get〜

値を取得する関数です。

```javascript
function getUserName() {
  return document.getElementById('name').value;
}

function getTotalPrice() {
  return price + tax;
}

function getCurrentDate() {
  return new Date();
}
```

### 2. 設定系: set〜

値を設定する関数です。

```javascript
function setUserName(name) {
  document.getElementById('name').textContent = name;
}

function setPrice(price) {
  currentPrice = price;
}
```

### 3. 計算系: calculate〜

計算をする関数です。

```javascript
function calculateTotal(price, quantity) {
  return price * quantity;
}

function calculateDiscount(price, rate) {
  return price * (rate / 100);
}

function calculateTax(price) {
  return price * 0.1;
}
```

### 4. 作成系: create〜

何かを作成する関数です。

```javascript
function createUser(name, email) {
  return {
    name: name,
    email: email,
    createdAt: new Date()
  };
}

function createMessage(title, body) {
  return title + '\n\n' + body;
}
```

### 5. 表示系: show〜 / hide〜

表示・非表示を制御する関数です。

```javascript
function showMessage(message) {
  const div = document.getElementById('message');
  div.textContent = message;
  div.style.display = 'block';
}

function hideMessage() {
  const div = document.getElementById('message');
  div.style.display = 'none';
}
```

### 6. 検証系: validate〜

検証をする関数です。

```javascript
function validateEmail(email) {
  return email.includes('@') && email.includes('.');
}

function validatePassword(password) {
  return password.length >= 8;
}
```

### 7. 判定系: is〜 / has〜

真偽値を返す関数です。

```javascript
// is〜: 状態を判定
function isValid(value) {
  return value !== null && value !== '';
}

function isEmpty(text) {
  return text === '';
}

function isAdult(age) {
  return age >= 18;
}

// has〜: 所有を判定
function hasValue(obj) {
  return obj !== null && obj !== undefined;
}

function hasPermission(user) {
  return user.role === 'admin';
}
```

## 悪い名前の例と改善

### 例1: 抽象的すぎる

```javascript
// 悪い
function data() {
  return name + email;
}

// 良い
function getUserInfo() {
  return name + email;
}
```

### 例2: 略しすぎ

```javascript
// 悪い
function calcTot() {
  return price * quantity;
}

// 良い
function calculateTotal() {
  return price * quantity;
}
```

### 例3: 動詞がない

```javascript
// 悪い
function total() {
  return price * quantity;
}

// 良い
function calculateTotal() {
  return price * quantity;
}
```

### 例4: 曖昧

```javascript
// 悪い
function process(value) {
  return value * 1.1;
}

// 良い
function addTax(price) {
  return price * 1.1;
}
```

## 実践例：ショッピングカート

良い命名を使った実装例です。

```javascript
// 価格を取得
function getPrice() {
  return Number(document.getElementById('price').value);
}

// 数量を取得
function getQuantity() {
  return Number(document.getElementById('quantity').value);
}

// 小計を計算
function calculateSubtotal(price, quantity) {
  return price * quantity;
}

// 税金を計算
function calculateTax(subtotal) {
  const TAX_RATE = 0.1;
  return subtotal * TAX_RATE;
}

// 合計を計算
function calculateTotal(subtotal, tax) {
  return subtotal + tax;
}

// 合計を表示
function showTotal(total) {
  document.getElementById('total').textContent = '合計: ¥' + total;
}

// メイン処理
function updateCart() {
  const price = getPrice();
  const quantity = getQuantity();
  const subtotal = calculateSubtotal(price, quantity);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, tax);
  showTotal(total);
}
```

すべての関数名から、何をするかがわかります。

## 自己文書化コード

良い関数名を使うと、コメントなしでも理解できる**自己文書化コード**になります。

### コメントが必要な例（悪い）

```javascript
// 価格に税金を追加する
function calc(p) {
  return p * 1.1;
}
```

### コメント不要な例（良い）

```javascript
function addTax(price) {
  return price * 1.1;
}
```

関数名だけで「価格に税金を追加する」ことがわかります。

## まとめ

1. **動詞で始める**（get, set, calculate, create など）
2. **具体的な名前**をつける
3. **適切な長さ**（2〜4単語程度）
4. **キャメルケース**を使う
5. **判定関数**は is〜 / has〜 で始める
6. 関数名だけで**何をするかわかる**ようにする
7. **略しすぎない**

### 良い名前のチェックリスト

関数名を決めたら、以下を確認しましょう：

- ✅ 動詞で始まっているか？
- ✅ 何をするか具体的にわかるか？
- ✅ 長すぎず、短すぎないか？
- ✅ キャメルケースになっているか？
- ✅ コメントなしで理解できるか？

良い関数名をつけることは、**読みやすく保守しやすいコード**を書く第一歩です。

次回は、これまで学んだ関数の知識を使って、週のプロジェクト（関数型電卓）を作成します。
