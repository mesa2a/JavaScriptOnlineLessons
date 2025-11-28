# レッスン120：名前付け

**作成日**: 2025-11-26

## このレッスンで学ぶこと

### 前回の復習
前回のレッスンでは、**単一責任の原則**を学びました。

```javascript
// 1つの関数は1つの仕事だけ
function getUserInput() { }      // 入力を取得するだけ
function validateInput() { }     // 検証するだけ
function saveUser() { }          // 保存するだけ
```

各関数が明確な役割を持つことで、コードが理解しやすく、保守しやすくなりました。

### よくある場面
プログラミングをしていると、こんな状況になります：

```javascript
// 1週間後にこのコードを見たとき...
function func1() {
  return price * 1.1;
}

function process(x) {
  return x * 0.8;
}

function calc() {
  return a + b;
}

// 何をする関数だったか思い出せない...
// 中身を読まないとわからない...
```

せっかく単一責任で関数を分けても、**名前が悪い**と意味がありません。

良い名前をつけることで：
- **関数の中身を見なくても**何をするかわかる
- **他の人が読んでも**すぐに理解できる
- **自分が後で見ても**すぐに思い出せる

### 学習目標
このレッスンでは以下を学びます：

1. **動詞で始める関数名**の付け方
2. **具体的でわかりやすい名前**の付け方
3. **キャメルケース**の使い方
4. **自己文書化コード**の書き方

## 良い関数名とは

### 📖 日常生活での例：道具の名前

道具の名前を考えてみましょう：

```
悪い名前の道具：
├─ 「物1」        ← 何に使う道具？
├─ 「道具A」      ← 何ができる？
└─ 「アレ」       ← わからない...

良い名前の道具：
├─ 「包丁」       ← 切る道具だとわかる
├─ 「電卓」       ← 計算する道具だとわかる
├─ 「体温計」     ← 体温を測る道具だとわかる
└─ 「消しゴム」   ← 消す道具だとわかる
```

関数名も同じです。**名前を見ただけで何をするかわかる**名前が良い名前です。

### 悪い関数名と良い関数名

```javascript
// ❌ 悪い例：何をするかわからない
function func1() {
  return price * 1.1;
}

function data() {
  return name + email;
}

function process(x) {
  return x * 0.8;
}

// ✅ 良い例：何をするかわかる
function calculatePriceWithTax() {
  return price * 1.1;
}

function getUserInfo() {
  return name + email;
}

function applyDiscount(price) {
  return price * 0.8;
}
```

**良い関数名**の特徴：
1. 関数の中身を見なくても**何をするかわかる**
2. **具体的**で明確
3. **わかりやすい**英単語を使っている

## 基本ルール1：動詞で始める

### なぜ動詞で始めるのか

関数は**動作**を表します。動作は動詞で表現するのが自然です。

```javascript
// ❌ 悪い例：名詞だけ
function total() { }        // 名詞「合計」
function user() { }         // 名詞「ユーザー」
function price() { }        // 名詞「価格」

// ✅ 良い例：動詞で始まる
function calculateTotal() { }   // 動詞「計算する」+ 名詞「合計」
function getUser() { }          // 動詞「取得する」+ 名詞「ユーザー」
function setPrice() { }         // 動詞「設定する」+ 名詞「価格」
```

### よく使う動詞一覧

| 動詞 | 意味 | 使う場面 | 例 |
|------|------|----------|-----|
| **get** | 取得する | 値を取得するとき | `getUserName()` |
| **set** | 設定する | 値を設定するとき | `setUserName()` |
| **calculate** | 計算する | 計算をするとき | `calculateTotal()` |
| **create** | 作成する | データを作成するとき | `createUser()` |
| **update** | 更新する | データを更新するとき | `updateProfile()` |
| **delete** | 削除する | データを削除するとき | `deleteItem()` |
| **remove** | 取り除く | 要素を取り除くとき | `removeElement()` |
| **add** | 追加する | 要素を追加するとき | `addItem()` |
| **show** | 表示する | 表示するとき | `showMessage()` |
| **hide** | 非表示にする | 非表示にするとき | `hideModal()` |
| **validate** | 検証する | 検証するとき | `validateEmail()` |
| **check** | チェックする | チェックするとき | `checkPassword()` |
| **is** | 〜かどうか | 判定するとき（真偽値） | `isValid()` |
| **has** | 〜を持っているか | 所有を判定するとき | `hasPermission()` |

### 動詞別の実例

#### 1. get〜：値を取得する

```javascript
// HTMLから値を取得
function getUserName() {
  return document.getElementById('name').value;
}

// 計算結果を取得
function getTotalPrice() {
  return price + tax;
}

// 現在の日付を取得
function getCurrentDate() {
  return new Date();
}
```

**実行の流れ**：
```
getUserName() を呼び出し
↓
1. id="name" の要素を取得
2. その要素の value を取得
3. 値を返す
↓
"山田太郎" が返ってくる
```

#### 2. set〜：値を設定する

```javascript
// HTMLに値を設定
function setUserName(name) {
  document.getElementById('name').textContent = name;
}

// 変数に値を設定
function setPrice(price) {
  currentPrice = price;
}

// CSSスタイルを設定
function setBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}
```

**実行の流れ**：
```
setUserName('山田太郎') を呼び出し
↓
1. 引数 name に '山田太郎' が入る
2. id="name" の要素を取得
3. その要素の textContent に '山田太郎' を設定
↓
画面に「山田太郎」が表示される
```

#### 3. calculate〜：計算する

```javascript
// 合計を計算
function calculateTotal(price, quantity) {
  return price * quantity;
}

// 割引額を計算
function calculateDiscount(price, rate) {
  return price * (rate / 100);
}

// 税込価格を計算
function calculatePriceWithTax(price) {
  const TAX_RATE = 0.1;
  return price * (1 + TAX_RATE);
}
```

**実行の流れ**：
```
calculateTotal(1000, 3) を呼び出し
↓
1. price に 1000 が入る
2. quantity に 3 が入る
3. 1000 * 3 を計算
4. 結果 3000 を返す
↓
3000 が返ってくる
```

#### 4. create〜：データを作成する

```javascript
// ユーザーデータを作成
function createUser(name, email) {
  return {
    name: name,
    email: email,
    createdAt: new Date()
  };
}

// メッセージを作成
function createMessage(title, body) {
  return title + '\n\n' + body;
}

// HTML要素を作成
function createButton(text) {
  const button = document.createElement('button');
  button.textContent = text;
  return button;
}
```

**実行の流れ**：
```
createUser('山田太郎', 'yamada@example.com') を呼び出し
↓
1. name に '山田太郎' が入る
2. email に 'yamada@example.com' が入る
3. オブジェクトを作成：
   {
     name: '山田太郎',
     email: 'yamada@example.com',
     createdAt: 現在の日時
   }
4. オブジェクトを返す
↓
ユーザーデータが返ってくる
```

#### 5. update〜：データを更新する

```javascript
// カートを更新
function updateCart(itemId, quantity) {
  cart[itemId].quantity = quantity;
}

// ステータスを更新
function updateStatus(status) {
  currentStatus = status;
}

// 表示を更新
function updateDisplay(value) {
  document.getElementById('display').textContent = value;
}
```

#### 6. show〜 / hide〜：表示・非表示

```javascript
// メッセージを表示
function showMessage(message) {
  const div = document.getElementById('message');
  div.textContent = message;
  div.style.display = 'block';
}

// メッセージを非表示
function hideMessage() {
  const div = document.getElementById('message');
  div.style.display = 'none';
}

// ローディング表示
function showLoading() {
  document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}
```

**実行の流れ**：
```
showMessage('保存しました') を呼び出し
↓
1. message に '保存しました' が入る
2. id="message" の要素を取得
3. textContent に '保存しました' を設定
4. display を 'block' に設定（表示）
↓
画面に「保存しました」が表示される
```

#### 7. validate〜：検証する

```javascript
// メールアドレスを検証
function validateEmail(email) {
  return email.includes('@') && email.includes('.');
}

// パスワードを検証（8文字以上）
function validatePassword(password) {
  return password.length >= 8;
}

// フォーム全体を検証
function validateForm(name, email, password) {
  if (name === '') return false;
  if (!validateEmail(email)) return false;
  if (!validatePassword(password)) return false;
  return true;
}
```

**実行の流れ**：
```
validateEmail('test@example.com') を呼び出し
↓
1. email に 'test@example.com' が入る
2. '@' が含まれているかチェック → true
3. '.' が含まれているかチェック → true
4. true && true = true を返す
↓
true が返ってくる（有効なメールアドレス）
```

#### 8. is〜 / has〜：判定する（真偽値を返す）

```javascript
// is〜：状態を判定
function isValid(value) {
  return value !== null && value !== '';
}

function isEmpty(text) {
  return text === '';
}

function isAdult(age) {
  return age >= 18;
}

function isEven(number) {
  return number % 2 === 0;
}

// has〜：所有を判定
function hasValue(obj) {
  return obj !== null && obj !== undefined;
}

function hasPermission(user) {
  return user.role === 'admin';
}

function hasError(form) {
  return form.errors.length > 0;
}
```

**実行の流れ**：
```
isAdult(20) を呼び出し
↓
1. age に 20 が入る
2. 20 >= 18 を判定
3. true を返す
↓
true が返ってくる（成人です）

isAdult(15) を呼び出し
↓
1. age に 15 が入る
2. 15 >= 18 を判定
3. false を返す
↓
false が返ってくる（未成年です）
```

### 判定関数の命名規則

**is〜 / has〜** で始まる関数は、必ず **true または false** を返します。

```javascript
// ✅ 良い例：真偽値を返す
function isValid(email) {
  return email.includes('@');  // true または false
}

// ❌ 悪い例：文字列を返している
function isValid(email) {
  return 'valid';  // 真偽値ではない
}
```

**名前から期待される動作**：
```javascript
if (isValid(email)) {
  // true が返ってくることを期待
}

if (hasPermission(user)) {
  // true が返ってくることを期待
}
```

## 基本ルール2：具体的な名前をつける

### 抽象的な名前の問題

```javascript
// ❌ 悪い例：抽象的すぎる
function process() { }       // 何を処理する？
function handle() { }        // 何を処理する？
function doIt() { }          // 何をする？
function run() { }           // 何を実行する？
function manage() { }        // 何を管理する？
function data() { }          // 何のデータ？
```

これらの名前では、**何をする関数か全くわかりません**。

### 具体的な名前に改善

```javascript
// ✅ 良い例：具体的
function processPayment() { }        // 支払い処理
function handleError() { }           // エラー処理
function submitForm() { }            // フォーム送信
function runValidation() { }         // バリデーション実行
function manageSession() { }         // セッション管理
function getUserData() { }           // ユーザーデータ取得
```

**具体的な名前の特徴**：
- **何を**処理するか明確
- **どんな**データか明確
- 関数の**目的**がわかる

### 改善の例

```javascript
// ❌ 悪い例
function calc() {
  return price * quantity;
}

// ✅ 良い例
function calculateTotal() {
  return price * quantity;
}

// 何を計算するか明確になった！
```

```javascript
// ❌ 悪い例
function check() {
  return password.length >= 8;
}

// ✅ 良い例
function checkPasswordLength() {
  return password.length >= 8;
}

// 何をチェックするか明確になった！
```

## 基本ルール3：長すぎず、短すぎず

### 適切な長さ

良い関数名の長さは **2〜4単語** 程度です。

#### 短すぎる例

```javascript
// ❌ 悪い例：短すぎて意味不明
function calc() { }         // 何を計算？
function get() { }          // 何を取得？
function set() { }          // 何を設定？
function update() { }       // 何を更新？
function proc() { }         // 何を処理？
```

#### 長すぎる例

```javascript
// ❌ 悪い例：長すぎて読みにくい
function calculateTheTotalPriceIncludingTaxAndShippingFee() { }
function getUserInformationFromDatabaseAndReturnAsObject() { }
function validateAllFormFieldsAndShowErrorMessagesIfInvalid() { }
```

#### 適切な例

```javascript
// ✅ 良い例：適切な長さ（2〜4単語）
function calculateTotal() { }           // 2単語
function getTotalPrice() { }            // 3単語
function updateCartItem() { }           // 3単語
function validateUserInput() { }        // 3単語
function showErrorMessage() { }         // 3単語
```

### 略さない

**略語は避ける**のが基本です。

```javascript
// ❌ 悪い例：略しすぎ
function calcTot() { }          // calculateTotal
function getUsrNm() { }         // getUserName
function updtProf() { }         // updateProfile
function valEmail() { }         // validateEmail
function delItm() { }           // deleteItem

// ✅ 良い例：略さない
function calculateTotal() { }
function getUserName() { }
function updateProfile() { }
function validateEmail() { }
function deleteItem() { }
```

**例外：一般的な略語**は使っても良い：
```javascript
// 許容される略語
function getMaxValue() { }      // maximum → max（一般的）
function getMinValue() { }      // minimum → min（一般的）
function getAvgScore() { }      // average → avg（一般的）
function initApp() { }          // initialize → init（一般的）
```

## 基本ルール4：キャメルケースを使う

### キャメルケースとは

JavaScriptでは **キャメルケース（camelCase）** を使います。

```
キャメルケースの特徴：
├─ 最初の単語は小文字
├─ 2単語目以降は大文字で始める
└─ スペースやアンダースコアは使わない

例：
getUserName
  ↑ ↑   ↑
  小 大  大
```

### 正しい例

```javascript
// ✅ キャメルケース（JavaScript標準）
function getUserName() { }
function calculateTotal() { }
function isValidEmail() { }
function showErrorMessage() { }
function createUserAccount() { }
```

### 間違った例

```javascript
// ❌ スネークケース（Pythonなどで使われる）
function get_user_name() { }
function calculate_total() { }
function is_valid_email() { }

// ❌ パスカルケース（クラス名で使われる）
function GetUserName() { }
function CalculateTotal() { }
function IsValidEmail() { }

// ❌ 全て小文字（読みにくい）
function getusername() { }
function calculatetotal() { }
function isvalidemail() { }

// ❌ ケバブケース（CSSで使われる）
function get-user-name() { }  // エラーになる！
```

### JavaScriptの命名規則まとめ

```javascript
// 変数：キャメルケース
const userName = '山田太郎';
const totalPrice = 1000;

// 定数：大文字スネークケース（全て大文字）
const TAX_RATE = 0.1;
const MAX_COUNT = 100;

// 関数：キャメルケース
function getUserName() { }
function calculateTotal() { }

// クラス：パスカルケース（最初も大文字）
class UserAccount { }
class ShoppingCart { }
```

## 悪い名前の例と改善

### パターン1：抽象的すぎる

```javascript
// ❌ 悪い
function data() {
  return name + ' (' + email + ')';
}

// ✅ 良い
function getUserInfo() {
  return name + ' (' + email + ')';
}
```

**改善ポイント**：
- `data` → `getUserInfo`
- 何のデータか明確になった

### パターン2：略しすぎ

```javascript
// ❌ 悪い
function calcTot() {
  return price * quantity;
}

// ✅ 良い
function calculateTotal() {
  return price * quantity;
}
```

**改善ポイント**：
- `calc` → `calculate`
- `Tot` → `Total`
- 略語を展開して読みやすくした

### パターン3：動詞がない

```javascript
// ❌ 悪い
function total() {
  return price * quantity;
}

// ✅ 良い
function calculateTotal() {
  return price * quantity;
}
```

**改善ポイント**：
- `total` → `calculateTotal`
- 動詞（calculate）を追加した

### パターン4：曖昧

```javascript
// ❌ 悪い
function process(value) {
  return value * 1.1;
}

// ✅ 良い
function addTax(price) {
  return price * 1.1;
}
```

**改善ポイント**：
- `process` → `addTax`（具体的な動詞）
- `value` → `price`（具体的な引数名）

### パターン5：長すぎる

```javascript
// ❌ 悪い
function calculateTheTotalPriceIncludingTax() {
  const TAX_RATE = 0.1;
  return price * (1 + TAX_RATE);
}

// ✅ 良い
function calculatePriceWithTax() {
  const TAX_RATE = 0.1;
  return price * (1 + TAX_RATE);
}
```

**改善ポイント**：
- 不要な単語（The, Including）を削除
- 簡潔でわかりやすくした

## 実践例1：ショッピングカート

良い命名を使った実装例です。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ショッピングカート</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .input-group {
      margin-bottom: 15px;
    }
    label {
      display: inline-block;
      width: 100px;
    }
    input {
      padding: 8px;
      width: 200px;
    }
    button {
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      margin-top: 10px;
    }
    button:hover {
      background: #0056b3;
    }
    .result {
      margin-top: 20px;
      padding: 15px;
      background: #f0f0f0;
      border-radius: 5px;
    }
    .result div {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <h1>ショッピングカート</h1>

  <div class="input-group">
    <label>商品価格：</label>
    <input type="number" id="price" value="1000">円
  </div>

  <div class="input-group">
    <label>数量：</label>
    <input type="number" id="quantity" value="2">個
  </div>

  <button onclick="updateCart()">計算する</button>

  <div class="result">
    <div id="subtotal"></div>
    <div id="tax"></div>
    <div id="total"></div>
  </div>

  <script>
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

    // 小計を表示
    function showSubtotal(subtotal) {
      document.getElementById('subtotal').textContent =
        '小計: ¥' + subtotal.toLocaleString();
    }

    // 税金を表示
    function showTax(tax) {
      document.getElementById('tax').textContent =
        '消費税（10%）: ¥' + tax.toLocaleString();
    }

    // 合計を表示
    function showTotal(total) {
      document.getElementById('total').textContent =
        '合計: ¥' + total.toLocaleString();
    }

    // カートを更新（メイン処理）
    function updateCart() {
      const price = getPrice();
      const quantity = getQuantity();
      const subtotal = calculateSubtotal(price, quantity);
      const tax = calculateTax(subtotal);
      const total = calculateTotal(subtotal, tax);

      showSubtotal(subtotal);
      showTax(tax);
      showTotal(total);
    }

    // 初期表示
    updateCart();
  </script>
</body>
</html>
```

### 実行の流れ

```
updateCart() を呼び出し
↓
1. getPrice() を呼び出し
   └─ 価格入力欄から 1000 を取得
↓
2. getQuantity() を呼び出し
   └─ 数量入力欄から 2 を取得
↓
3. calculateSubtotal(1000, 2) を呼び出し
   └─ 1000 * 2 = 2000 を計算
↓
4. calculateTax(2000) を呼び出し
   └─ 2000 * 0.1 = 200 を計算
↓
5. calculateTotal(2000, 200) を呼び出し
   └─ 2000 + 200 = 2200 を計算
↓
6. showSubtotal(2000) を呼び出し
   └─ 「小計: ¥2,000」を表示
↓
7. showTax(200) を呼び出し
   └─ 「消費税（10%）: ¥200」を表示
↓
8. showTotal(2200) を呼び出し
   └─ 「合計: ¥2,200」を表示
```

### 良い命名の効果

このコードの関数名を見てください：

```javascript
function getPrice() { }           // 価格を取得することがわかる
function getQuantity() { }        // 数量を取得することがわかる
function calculateSubtotal() { }  // 小計を計算することがわかる
function calculateTax() { }       // 税金を計算することがわかる
function calculateTotal() { }     // 合計を計算することがわかる
function showSubtotal() { }       // 小計を表示することがわかる
function showTax() { }            // 税金を表示することがわかる
function showTotal() { }          // 合計を表示することがわかる
```

**メイン処理を見ただけで全体の流れがわかります**：

```javascript
function updateCart() {
  const price = getPrice();              // 1. 価格を取得
  const quantity = getQuantity();        // 2. 数量を取得
  const subtotal = calculateSubtotal(price, quantity);  // 3. 小計を計算
  const tax = calculateTax(subtotal);    // 4. 税金を計算
  const total = calculateTotal(subtotal, tax);  // 5. 合計を計算

  showSubtotal(subtotal);  // 6. 小計を表示
  showTax(tax);            // 7. 税金を表示
  showTotal(total);        // 8. 合計を表示
}
```

各関数の中身を見なくても、**何をするコードか完全に理解できます**。

## 実践例2：ユーザー登録フォーム

良い命名を使った別の例です。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ユーザー登録</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .input-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input {
      padding: 8px;
      width: 100%;
      box-sizing: border-box;
    }
    button {
      padding: 10px 20px;
      background: #28a745;
      color: white;
      border: none;
      cursor: pointer;
      margin-top: 10px;
    }
    button:hover {
      background: #218838;
    }
    .error {
      color: red;
      margin-top: 5px;
      display: none;
    }
    .error.show {
      display: block;
    }
    .success {
      color: green;
      margin-top: 20px;
      padding: 15px;
      background: #d4edda;
      border-radius: 5px;
      display: none;
    }
    .success.show {
      display: block;
    }
  </style>
</head>
<body>
  <h1>ユーザー登録</h1>

  <div class="input-group">
    <label>名前：</label>
    <input type="text" id="name">
    <div class="error" id="nameError"></div>
  </div>

  <div class="input-group">
    <label>メールアドレス：</label>
    <input type="email" id="email">
    <div class="error" id="emailError"></div>
  </div>

  <div class="input-group">
    <label>パスワード：</label>
    <input type="password" id="password">
    <div class="error" id="passwordError"></div>
  </div>

  <button onclick="submitForm()">登録する</button>

  <div class="success" id="success"></div>

  <script>
    // 入力値を取得
    function getName() {
      return document.getElementById('name').value.trim();
    }

    function getEmail() {
      return document.getElementById('email').value.trim();
    }

    function getPassword() {
      return document.getElementById('password').value;
    }

    // 検証
    function validateName(name) {
      return name.length >= 2;
    }

    function validateEmail(email) {
      return email.includes('@') && email.includes('.');
    }

    function validatePassword(password) {
      return password.length >= 8;
    }

    // エラーメッセージを表示
    function showNameError(message) {
      const errorDiv = document.getElementById('nameError');
      errorDiv.textContent = message;
      errorDiv.classList.add('show');
    }

    function showEmailError(message) {
      const errorDiv = document.getElementById('emailError');
      errorDiv.textContent = message;
      errorDiv.classList.add('show');
    }

    function showPasswordError(message) {
      const errorDiv = document.getElementById('passwordError');
      errorDiv.textContent = message;
      errorDiv.classList.add('show');
    }

    // エラーメッセージを非表示
    function hideAllErrors() {
      document.querySelectorAll('.error').forEach(error => {
        error.classList.remove('show');
      });
    }

    // 成功メッセージを表示
    function showSuccessMessage(name) {
      const successDiv = document.getElementById('success');
      successDiv.textContent = name + ' さん、登録が完了しました！';
      successDiv.classList.add('show');
    }

    // 入力欄をクリア
    function clearForm() {
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
    }

    // フォーム送信（メイン処理）
    function submitForm() {
      // エラーをクリア
      hideAllErrors();

      // 入力値を取得
      const name = getName();
      const email = getEmail();
      const password = getPassword();

      // 検証
      let hasError = false;

      if (!validateName(name)) {
        showNameError('名前は2文字以上で入力してください');
        hasError = true;
      }

      if (!validateEmail(email)) {
        showEmailError('有効なメールアドレスを入力してください');
        hasError = true;
      }

      if (!validatePassword(password)) {
        showPasswordError('パスワードは8文字以上で入力してください');
        hasError = true;
      }

      // エラーがあれば終了
      if (hasError) {
        return;
      }

      // 登録成功
      showSuccessMessage(name);
      clearForm();
    }
  </script>
</body>
</html>
```

### 実行の流れ

```
submitForm() を呼び出し
↓
1. hideAllErrors() を呼び出し
   └─ すべてのエラーメッセージを非表示
↓
2. getName() を呼び出し
   └─ 名前入力欄から値を取得（前後の空白を削除）
↓
3. getEmail() を呼び出し
   └─ メール入力欄から値を取得（前後の空白を削除）
↓
4. getPassword() を呼び出し
   └─ パスワード入力欄から値を取得
↓
5. validateName(name) を呼び出し
   └─ 2文字以上かチェック
   └─ NGなら showNameError() でエラー表示
↓
6. validateEmail(email) を呼び出し
   └─ @と.が含まれているかチェック
   └─ NGなら showEmailError() でエラー表示
↓
7. validatePassword(password) を呼び出し
   └─ 8文字以上かチェック
   └─ NGなら showPasswordError() でエラー表示
↓
8. エラーがある場合は終了
↓
9. showSuccessMessage(name) を呼び出し
   └─ 「〇〇さん、登録が完了しました!」を表示
↓
10. clearForm() を呼び出し
    └─ すべての入力欄をクリア
```

### 良い命名の効果

メイン処理を見てください：

```javascript
function submitForm() {
  hideAllErrors();      // 1. すべてのエラーを非表示

  const name = getName();          // 2. 名前を取得
  const email = getEmail();        // 3. メールを取得
  const password = getPassword();  // 4. パスワードを取得

  let hasError = false;

  if (!validateName(name)) {              // 5. 名前を検証
    showNameError('名前は2文字以上...');  // エラー表示
    hasError = true;
  }

  if (!validateEmail(email)) {                  // 6. メールを検証
    showEmailError('有効なメールアドレス...');  // エラー表示
    hasError = true;
  }

  if (!validatePassword(password)) {              // 7. パスワードを検証
    showPasswordError('パスワードは8文字以上...');  // エラー表示
    hasError = true;
  }

  if (hasError) {
    return;  // エラーがあれば終了
  }

  showSuccessMessage(name);  // 8. 成功メッセージを表示
  clearForm();               // 9. フォームをクリア
}
```

**関数名だけで処理の流れが完全に理解できます**。

## 自己文書化コード

### 自己文書化コードとは

**自己文書化コード**とは、コメントがなくても**コード自体が何をするか説明している**コードです。

### コメントが必要な例（悪い）

```javascript
// 価格に税金を追加する
function calc(p) {
  return p * 1.1;
}

// 名前とメールを結合する
function data(n, e) {
  return n + ' (' + e + ')';
}

// 8文字以上かチェックする
function check(str) {
  return str.length >= 8;
}
```

**問題点**：
- 関数名と引数名が不明瞭
- コメントがないと何をするかわからない
- コメントが古くなると混乱する

### コメント不要な例（良い）

```javascript
function addTax(price) {
  return price * 1.1;
}

function formatUserInfo(name, email) {
  return name + ' (' + email + ')';
}

function isValidPasswordLength(password) {
  return password.length >= 8;
}
```

**改善点**：
- 関数名で何をするか明確
- 引数名で何を受け取るか明確
- コメントなしで理解できる

### 比較

```javascript
// ❌ コメントが必要（悪い）
// ユーザーの年齢を計算する
function calc(y) {
  const now = new Date().getFullYear();
  return now - y;
}

// ✅ コメント不要（良い）
function calculateAge(birthYear) {
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
}
```

**自己文書化コードの効果**：
- コメントを書く時間が不要
- コメントの更新忘れがない
- コード自体が最新のドキュメント

## まとめ

### 良い関数名の4つの基本ルール

1. **動詞で始める**
   ```javascript
   get, set, calculate, create, update, show, validate, is, has
   ```

2. **具体的な名前をつける**
   ```javascript
   // ❌ process() ← 抽象的
   // ✅ processPayment() ← 具体的
   ```

3. **適切な長さ（2〜4単語）**
   ```javascript
   // ❌ calc() ← 短すぎ
   // ❌ calculateTheTotalPriceIncludingTax() ← 長すぎ
   // ✅ calculateTotal() ← ちょうど良い
   ```

4. **キャメルケースを使う**
   ```javascript
   // ✅ getUserName()
   // ❌ get_user_name()
   // ❌ GetUserName()
   ```

### 動詞別パターンまとめ

| パターン | 例 | 用途 |
|---------|-----|------|
| get〜 | `getUserName()` | 値を取得 |
| set〜 | `setUserName()` | 値を設定 |
| calculate〜 | `calculateTotal()` | 計算する |
| create〜 | `createUser()` | データを作成 |
| update〜 | `updateCart()` | データを更新 |
| delete〜 | `deleteItem()` | データを削除 |
| show〜 | `showMessage()` | 表示する |
| hide〜 | `hideModal()` | 非表示にする |
| validate〜 | `validateEmail()` | 検証する |
| is〜 | `isValid()` | 判定（真偽値） |
| has〜 | `hasPermission()` | 所有判定 |

### 良い名前のチェックリスト

関数名を決めたら、以下を確認しましょう：

- ✅ 動詞で始まっているか？
- ✅ 何をするか具体的にわかるか？
- ✅ 長すぎず、短すぎないか？（2〜4単語）
- ✅ キャメルケースになっているか？
- ✅ 略しすぎていないか？
- ✅ コメントなしで理解できるか？

### 自己文書化コードを目指す

```javascript
// ❌ 悪い例：コメントが必要
// 合計金額を計算する
function calc(p, q) {
  return p * q * 1.1;
}

// ✅ 良い例：コメント不要
function calculateTotalWithTax(price, quantity) {
  const TAX_RATE = 1.1;
  return price * quantity * TAX_RATE;
}
```

良い関数名をつけることは、**読みやすく保守しやすいコード**を書く第一歩です。

## 練習問題

### 練習問題1：悪い関数名を改善する（基本）

以下の関数に、適切な名前をつけてください。

```javascript
// 1. ユーザー名を取得する関数
function func1() {
  return document.getElementById('username').value;
}

// 2. 2つの数を掛け算する関数
function calc(a, b) {
  return a * b;
}

// 3. メッセージを画面に表示する関数
function show(msg) {
  document.getElementById('message').textContent = msg;
}

// 4. パスワードが8文字以上かチェックする関数
function check(p) {
  return p.length >= 8;
}

// 5. 商品データを作成する関数
function create(n, p) {
  return {
    name: n,
    price: p
  };
}
```

<details>
<summary>ヒント</summary>

1. 「ユーザー名」を「取得」する → get + UserName
2. 「2つの数」を「掛け算」する → calculate + Product（積）
3. 「メッセージ」を「表示」する → show + Message
4. 「パスワード」を「チェック」する → validate + Password または isValid + Password
5. 「商品データ」を「作成」する → create + Product

引数名も具体的にしましょう：
- `msg` → `message`
- `p` → `password` または `price`
- `n` → `name`
- `a`, `b` → `num1`, `num2` または `x`, `y`

</details>

<details>
<summary>解答例</summary>

```javascript
// 1. ユーザー名を取得する関数
function getUserName() {
  return document.getElementById('username').value;
}

// 2. 2つの数を掛け算する関数
function calculateProduct(num1, num2) {
  return num1 * num2;
}
// または
function multiply(num1, num2) {
  return num1 * num2;
}

// 3. メッセージを画面に表示する関数
function showMessage(message) {
  document.getElementById('message').textContent = message;
}

// 4. パスワードが8文字以上かチェックする関数
function validatePassword(password) {
  return password.length >= 8;
}
// または
function isValidPassword(password) {
  return password.length >= 8;
}

// 5. 商品データを作成する関数
function createProduct(name, price) {
  return {
    name: name,
    price: price
  };
}
```

**改善ポイント**：
- すべて動詞で始まる
- 何をするか具体的
- 引数名も具体的
- キャメルケース
- コメント不要で理解できる

</details>

---

### 練習問題2：命名パターンを使う（応用）

以下の処理に、適切な関数名をつけて実装してください。

```javascript
// 1. id="email" から値を取得する関数

// 2. id="email" に値を設定する関数

// 3. メールアドレスが有効か判定する関数（@と.を含むか）

// 4. 割引価格を計算する関数（20%オフ）

// 5. ローディング画面を表示する関数

// 6. ローディング画面を非表示にする関数

// 7. 注文データを作成する関数（商品名と数量から）

// 8. 在庫があるかチェックする関数（真偽値を返す）
```

<details>
<summary>ヒント</summary>

パターンを使いましょう：
1. 取得 → `get〜`
2. 設定 → `set〜`
3. 判定（真偽値） → `is〜` または `validate〜`
4. 計算 → `calculate〜`
5. 表示 → `show〜`
6. 非表示 → `hide〜`
7. 作成 → `create〜`
8. 所有判定（真偽値） → `has〜`

</details>

<details>
<summary>解答例</summary>

```javascript
// 1. id="email" から値を取得する関数
function getEmail() {
  return document.getElementById('email').value;
}

// 2. id="email" に値を設定する関数
function setEmail(email) {
  document.getElementById('email').value = email;
}

// 3. メールアドレスが有効か判定する関数（@と.を含むか）
function isValidEmail(email) {
  return email.includes('@') && email.includes('.');
}
// または
function validateEmail(email) {
  return email.includes('@') && email.includes('.');
}

// 4. 割引価格を計算する関数（20%オフ）
function calculateDiscountPrice(price) {
  const DISCOUNT_RATE = 0.8;  // 20%オフ = 80%
  return price * DISCOUNT_RATE;
}

// 5. ローディング画面を表示する関数
function showLoading() {
  document.getElementById('loading').style.display = 'block';
}

// 6. ローディング画面を非表示にする関数
function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

// 7. 注文データを作成する関数（商品名と数量から）
function createOrder(productName, quantity) {
  return {
    product: productName,
    quantity: quantity,
    orderedAt: new Date()
  };
}

// 8. 在庫があるかチェックする関数（真偽値を返す）
function hasStock(quantity) {
  return quantity > 0;
}
// または
function isInStock(quantity) {
  return quantity > 0;
}
```

**命名パターンの効果**：
- `get` / `set` がペアになっている
- `show` / `hide` がペアになっている
- `is〜` / `has〜` は真偽値を返すことが明確
- すべての関数が何をするか一目瞭然

</details>

---

### 練習問題3：BMI計算アプリを作る（発展）

良い関数名を使って、BMI計算アプリを作成してください。

**要件**：
- 身長（cm）と体重（kg）を入力
- BMIを計算して表示
- BMIの判定（痩せ型、普通、肥満）も表示
- すべての関数に適切な名前をつける

**BMI計算式**：
```
BMI = 体重(kg) ÷ (身長(m) × 身長(m))

判定：
18.5未満：痩せ型
18.5以上25未満：普通
25以上：肥満
```

<details>
<summary>ヒント</summary>

必要な関数：
1. 身長を取得する関数 → `get〜`
2. 体重を取得する関数 → `get〜`
3. cmをmに変換する関数 → `convert〜`
4. BMIを計算する関数 → `calculate〜`
5. BMIを判定する関数 → `get〜` または `determine〜`
6. BMIを表示する関数 → `show〜`
7. 判定結果を表示する関数 → `show〜`
8. メイン処理（すべてを実行） → `calculate〜` または `update〜`

</details>

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>BMI計算アプリ</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .input-group {
      margin-bottom: 15px;
    }
    label {
      display: inline-block;
      width: 100px;
    }
    input {
      padding: 8px;
      width: 150px;
    }
    button {
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      margin-top: 10px;
    }
    button:hover {
      background: #0056b3;
    }
    .result {
      margin-top: 20px;
      padding: 15px;
      background: #f0f0f0;
      border-radius: 5px;
    }
    .result div {
      margin: 10px 0;
      font-size: 18px;
    }
    .category {
      font-weight: bold;
      padding: 5px 10px;
      border-radius: 3px;
    }
    .underweight {
      background: #cce5ff;
      color: #004085;
    }
    .normal {
      background: #d4edda;
      color: #155724;
    }
    .overweight {
      background: #fff3cd;
      color: #856404;
    }
  </style>
</head>
<body>
  <h1>BMI計算アプリ</h1>

  <div class="input-group">
    <label>身長：</label>
    <input type="number" id="height" value="170"> cm
  </div>

  <div class="input-group">
    <label>体重：</label>
    <input type="number" id="weight" value="65"> kg
  </div>

  <button onclick="calculateAndShowBMI()">計算する</button>

  <div class="result">
    <div id="bmiValue"></div>
    <div id="bmiCategory"></div>
  </div>

  <script>
    // 身長を取得（cm）
    function getHeight() {
      return Number(document.getElementById('height').value);
    }

    // 体重を取得（kg）
    function getWeight() {
      return Number(document.getElementById('weight').value);
    }

    // cmをmに変換
    function convertCmToM(cm) {
      return cm / 100;
    }

    // BMIを計算
    function calculateBMI(weightKg, heightM) {
      return weightKg / (heightM * heightM);
    }

    // BMIのカテゴリーを判定
    function getBMICategory(bmi) {
      if (bmi < 18.5) {
        return '痩せ型';
      } else if (bmi < 25) {
        return '普通';
      } else {
        return '肥満';
      }
    }

    // カテゴリーに応じたCSSクラスを取得
    function getCategoryClass(category) {
      if (category === '痩せ型') {
        return 'underweight';
      } else if (category === '普通') {
        return 'normal';
      } else {
        return 'overweight';
      }
    }

    // BMI値を表示
    function showBMIValue(bmi) {
      const bmiRounded = bmi.toFixed(1);
      document.getElementById('bmiValue').textContent =
        'あなたのBMI: ' + bmiRounded;
    }

    // BMIカテゴリーを表示
    function showBMICategory(category) {
      const categoryDiv = document.getElementById('bmiCategory');
      const categoryClass = getCategoryClass(category);

      categoryDiv.innerHTML =
        '判定: <span class="category ' + categoryClass + '">' +
        category + '</span>';
    }

    // BMIを計算して表示（メイン処理）
    function calculateAndShowBMI() {
      // 1. 入力値を取得
      const heightCm = getHeight();
      const weightKg = getWeight();

      // 2. 単位変換
      const heightM = convertCmToM(heightCm);

      // 3. BMIを計算
      const bmi = calculateBMI(weightKg, heightM);

      // 4. カテゴリーを判定
      const category = getBMICategory(bmi);

      // 5. 結果を表示
      showBMIValue(bmi);
      showBMICategory(category);
    }

    // 初期表示
    calculateAndShowBMI();
  </script>
</body>
</html>
```

**実行の流れ**：
```
calculateAndShowBMI() を呼び出し
↓
1. getHeight() を呼び出し
   └─ 170 を取得
↓
2. getWeight() を呼び出し
   └─ 65 を取得
↓
3. convertCmToM(170) を呼び出し
   └─ 170 ÷ 100 = 1.7 に変換
↓
4. calculateBMI(65, 1.7) を呼び出し
   └─ 65 ÷ (1.7 × 1.7) = 22.5 を計算
↓
5. getBMICategory(22.5) を呼び出し
   └─ 18.5 <= 22.5 < 25 なので「普通」を返す
↓
6. showBMIValue(22.5) を呼び出し
   └─ 「あなたのBMI: 22.5」を表示
↓
7. showBMICategory('普通') を呼び出し
   └─ getCategoryClass('普通') で 'normal' を取得
   └─ 「判定: 普通」を緑色の背景で表示
```

**良い命名の効果**：
```javascript
// メイン処理を読むだけで全体の流れがわかる
function calculateAndShowBMI() {
  const heightCm = getHeight();              // 身長を取得
  const weightKg = getWeight();              // 体重を取得
  const heightM = convertCmToM(heightCm);    // cmをmに変換
  const bmi = calculateBMI(weightKg, heightM);  // BMIを計算
  const category = getBMICategory(bmi);      // カテゴリーを判定

  showBMIValue(bmi);           // BMI値を表示
  showBMICategory(category);   // カテゴリーを表示
}
```

各関数の名前から：
- 何をする関数かが一目瞭然
- 引数と戻り値の意味が明確
- コメントなしで処理の流れが理解できる

これが**自己文書化コード**の良い例です。

</details>

## カリキュラム要件チェック

このレッスンで以下の要件を満たしています：

✅ **動詞で始める**
- get, set, calculate などの動詞で関数名を始める方法を学習
- よく使う動詞のパターンを習得

✅ **わかりやすい名前**
- 具体的で明確な関数名の付け方を学習
- 抽象的な名前を避ける方法を習得
- 適切な長さ（2〜4単語）を理解

✅ **calculateTotal()など**
- 実践的な命名例を多数学習
- ショッピングカート、ユーザー登録、BMI計算などの実例で確認

✅ **知識：命名規則、自己文書化コード**
- キャメルケースの使い方を習得
- is〜 / has〜 の判定関数パターンを理解
- コメント不要な自己文書化コードの書き方を学習

✅ **成果物：良い関数名**
- 3つの練習問題で良い関数名を実践
- 実際のアプリケーション（ショッピングカート、ユーザー登録、BMI計算）で応用

## 次回予告

次回のレッスンでは、これまで学んだ関数の知識を総動員して、**週のプロジェクト：関数型電卓**を作成します。

学んだこと：
- 関数の基本（定義、呼び出し、引数、戻り値）
- スコープ（ローカル変数、グローバル変数）
- 型の整合性（引数と戻り値の型）
- 単一責任の原則
- 良い関数名の付け方

これらすべてを使って、実用的な電卓アプリを作りましょう！
