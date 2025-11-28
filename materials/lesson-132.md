# レッスン132: エラーハンドリング - 安全な関数を書く

**日付**: 2025-11-26
**所要時間**: 30分

## このレッスンで学ぶこと

1. エラーチェックの重要性
2. デフォルト値の設定方法
3. 安全な関数の書き方
4. 防御的プログラミング

---

## エラーハンドリングとは？

### 日常生活での例え：自動販売機の設計

自動販売機を想像してください：

```
【悪い自動販売機】
- お金を入れずにボタンを押すと壊れる
- 100円玉しか受け付けない（500円玉を入れると壊れる）
- 在庫がないのに商品を出そうとして壊れる

【良い自動販売機】
✓ お金が足りなければ「お金を入れてください」と表示
✓ どんな硬貨でも受け付ける（10円、50円、100円、500円）
✓ 在庫がなければ「売り切れ」と表示
✓ おつりが足りなければ「おつり切れ」と表示
```

**エラーハンドリング**とは、プログラムが想定外の状況でも正しく動くように守ることです。

---

## 1. エラーチェック

### なぜエラーチェックが必要か？

関数は様々な入力を受け取ります。その入力が正しくない場合に備える必要があります。

### 基本例1：割り算関数

```javascript
// ❌ エラーチェックなし（危険）
const divide = function(a, b) {
  return a / b;
};

console.log(divide(10, 2));  // => 5（正常）
console.log(divide(10, 0));  // => Infinity（問題！）
console.log(divide('10', 2)); // => 5（意図しない動作）
console.log(divide(10));      // => NaN（エラー！）
```

**問題点**：
- ゼロ除算でInfinityになる
- 引数が足りなくてもエラーにならない
- 文字列でも動いてしまう

```javascript
// ✅ エラーチェックあり（安全）
const divide = function(a, b) {
  // 引数の型チェック
  if (typeof a !== 'number' || typeof b !== 'number') {
    return 'エラー: 数値を入力してください';
  }

  // ゼロ除算チェック
  if (b === 0) {
    return 'エラー: ゼロで割ることはできません';
  }

  return a / b;
};

console.log(divide(10, 2));   // => 5
console.log(divide(10, 0));   // => 'エラー: ゼロで割ることはできません'
console.log(divide('10', 2)); // => 'エラー: 数値を入力してください'
console.log(divide(10));      // => 'エラー: 数値を入力してください'
```

### 実行の流れを見てみよう

```javascript
const divide = function(a, b) {
  // ステップ1: 型チェック
  if (typeof a !== 'number' || typeof b !== 'number') {
    return 'エラー: 数値を入力してください';
  }

  // ステップ2: ゼロ除算チェック
  if (b === 0) {
    return 'エラー: ゼロで割ることはできません';
  }

  // ステップ3: 正常な計算
  return a / b;
};

// 実行例1: divide(10, 2)
// a = 10, b = 2
// ステップ1: typeof 10 === 'number' && typeof 2 === 'number' → true
//          条件がfalseなので次へ
// ステップ2: 2 === 0 → false、次へ
// ステップ3: 10 / 2 → 5を返す

// 実行例2: divide(10, 0)
// a = 10, b = 0
// ステップ1: 型チェック → 通過
// ステップ2: 0 === 0 → true、エラーメッセージを返す
// ステップ3: 実行されない

// 実行例3: divide('10', 2)
// a = '10', b = 2
// ステップ1: typeof '10' === 'number' → false、エラーメッセージを返す
// ステップ2以降: 実行されない
```

**図解：エラーチェックの流れ**

```
入力: divide(a, b)
       ↓
   [型チェック]
    a と b は数値？
       ↓ NO → エラーメッセージを返す
       ↓ YES
   [ゼロチェック]
    b はゼロ？
       ↓ YES → エラーメッセージを返す
       ↓ NO
   [計算実行]
    a / b を返す
```

---

## 2. デフォルト値

### デフォルト値とは？

引数が渡されなかった場合に使われる「初期値」のことです。

### 基本例2：挨拶関数

```javascript
// ❌ デフォルト値なし
const greet = function(name) {
  return 'こんにちは、' + name + 'さん';
};

console.log(greet('太郎'));  // => 'こんにちは、太郎さん'
console.log(greet());        // => 'こんにちは、undefinedさん'（問題！）
```

```javascript
// ✅ デフォルト値あり（方法1：||演算子）
const greet = function(name) {
  name = name || 'ゲスト';
  return 'こんにちは、' + name + 'さん';
};

console.log(greet('太郎'));  // => 'こんにちは、太郎さん'
console.log(greet());        // => 'こんにちは、ゲストさん'
```

```javascript
// ✅ デフォルト値あり（方法2：条件分岐）
const greet = function(name) {
  if (name === undefined || name === null || name === '') {
    name = 'ゲスト';
  }
  return 'こんにちは、' + name + 'さん';
};

console.log(greet('太郎'));  // => 'こんにちは、太郎さん'
console.log(greet());        // => 'こんにちは、ゲストさん'
console.log(greet(''));      // => 'こんにちは、ゲストさん'
```

### 実行の流れ

```javascript
const greet = function(name) {
  // ステップ1: デフォルト値の設定
  if (name === undefined || name === null || name === '') {
    name = 'ゲスト';
  }

  // ステップ2: メッセージの生成
  return 'こんにちは、' + name + 'さん';
};

// 実行例1: greet('太郎')
// 引数: name = '太郎'
// ステップ1: '太郎' === undefined → false
//          '太郎' === null → false
//          '太郎' === '' → false
//          条件がfalseなのでnameはそのまま
// ステップ2: 'こんにちは、太郎さん'を返す

// 実行例2: greet()
// 引数: name = undefined（引数なし）
// ステップ1: undefined === undefined → true
//          nameに'ゲスト'を代入
// ステップ2: 'こんにちは、ゲストさん'を返す

// 実行例3: greet('')
// 引数: name = ''（空文字列）
// ステップ1: '' === undefined → false
//          '' === null → false
//          '' === '' → true
//          nameに'ゲスト'を代入
// ステップ2: 'こんにちは、ゲストさん'を返す
```

### 基本例3：数値計算のデフォルト値

```javascript
const multiply = function(a, b) {
  // デフォルト値を設定
  a = a || 1;
  b = b || 1;

  return a * b;
};

console.log(multiply(5, 3));  // => 15
console.log(multiply(5));     // => 5（b=1として計算）
console.log(multiply());      // => 1（a=1, b=1として計算）
```

---

## 3. 安全な関数

### 安全な関数の3つの要素

1. **入力チェック**：引数が正しいか確認
2. **デフォルト値**：引数がない場合の初期値
3. **エラーメッセージ**：問題があれば分かりやすく伝える

### 基本例4：価格計算関数

```javascript
const calculatePrice = function(price, quantity, discount) {
  // 1. 入力チェック
  if (typeof price !== 'number' || price < 0) {
    return { error: '価格は0以上の数値を入力してください' };
  }

  if (typeof quantity !== 'number' || quantity < 1) {
    return { error: '数量は1以上の数値を入力してください' };
  }

  // 2. デフォルト値
  discount = discount || 0;

  // 3. 安全な計算
  const subtotal = price * quantity;
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal - discountAmount;

  return {
    subtotal: subtotal,
    discount: discountAmount,
    total: total
  };
};

// 正常なケース
console.log(calculatePrice(1000, 3, 10));
// => { subtotal: 3000, discount: 300, total: 2700 }

// エラーケース
console.log(calculatePrice(-100, 3, 10));
// => { error: '価格は0以上の数値を入力してください' }

console.log(calculatePrice(1000, 0, 10));
// => { error: '数量は1以上の数値を入力してください' }

// デフォルト値のケース
console.log(calculatePrice(1000, 2));
// => { subtotal: 2000, discount: 0, total: 2000 }
```

### 実行の流れ

```javascript
// calculatePrice(1000, 3, 10) の実行

// 入力:
price = 1000
quantity = 3
discount = 10

// ステップ1: 価格チェック
typeof 1000 === 'number' → true
1000 < 0 → false
→ チェック通過

// ステップ2: 数量チェック
typeof 3 === 'number' → true
3 < 1 → false
→ チェック通過

// ステップ3: デフォルト値設定
discount = 10 || 0 → 10
→ discountは10のまま

// ステップ4: 計算
subtotal = 1000 × 3 = 3000
discountAmount = 3000 × (10 / 100) = 300
total = 3000 - 300 = 2700

// ステップ5: 結果を返す
{
  subtotal: 3000,
  discount: 300,
  total: 2700
}
```

**図解：安全な関数の処理フロー**

```
入力値受け取り
    ↓
[入力チェック1]
 価格は正しい？
    ↓ NO → エラーオブジェクトを返す
    ↓ YES
[入力チェック2]
 数量は正しい？
    ↓ NO → エラーオブジェクトを返す
    ↓ YES
[デフォルト値設定]
 割引が未指定なら0%
    ↓
[計算実行]
 小計、割引額、合計を計算
    ↓
結果オブジェクトを返す
```

---

## 実践例1：会員登録フォーム

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>安全な会員登録</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }

    button {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
      font-size: 16px;
    }

    button:hover {
      background-color: #0056b3;
    }

    .error {
      color: #dc3545;
      font-size: 14px;
      margin-top: 5px;
    }

    .success {
      color: #28a745;
      font-size: 14px;
      margin-top: 5px;
    }

    #result {
      margin-top: 20px;
      padding: 15px;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>会員登録</h1>

  <div class="form-group">
    <label>ユーザー名:</label>
    <input type="text" id="username" placeholder="3文字以上">
    <div id="usernameError" class="error"></div>
  </div>

  <div class="form-group">
    <label>メールアドレス:</label>
    <input type="email" id="email" placeholder="example@email.com">
    <div id="emailError" class="error"></div>
  </div>

  <div class="form-group">
    <label>年齢:</label>
    <input type="number" id="age" placeholder="18以上">
    <div id="ageError" class="error"></div>
  </div>

  <div class="form-group">
    <label>紹介コード (任意):</label>
    <input type="text" id="referral" placeholder="お持ちの方のみ">
  </div>

  <button onclick="register()">登録する</button>

  <div id="result"></div>

  <script>
    // 安全なユーザー登録関数
    const createUser = function(username, email, age, referral) {
      // 1. ユーザー名のチェック
      if (!username || username.trim() === '') {
        return { error: 'ユーザー名を入力してください' };
      }

      if (username.length < 3) {
        return { error: 'ユーザー名は3文字以上にしてください' };
      }

      // 2. メールアドレスのチェック
      if (!email || email.trim() === '') {
        return { error: 'メールアドレスを入力してください' };
      }

      // 簡易的なメール形式チェック
      const hasAt = email.indexOf('@') > 0;
      const hasDot = email.indexOf('.') > email.indexOf('@');
      if (!hasAt || !hasDot) {
        return { error: 'メールアドレスの形式が正しくありません' };
      }

      // 3. 年齢のチェック
      if (typeof age !== 'number' || age < 18) {
        return { error: '18歳以上の方のみ登録できます' };
      }

      if (age > 120) {
        return { error: '年齢が正しくありません' };
      }

      // 4. デフォルト値の設定
      referral = referral || 'なし';

      // 5. ユーザーオブジェクトの作成
      const user = {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        age: age,
        referral: referral,
        registeredAt: new Date().toLocaleString('ja-JP')
      };

      return { success: true, user: user };
    };

    // 登録ボタンの処理
    const register = function() {
      // エラーメッセージをクリア
      document.getElementById('usernameError').textContent = '';
      document.getElementById('emailError').textContent = '';
      document.getElementById('ageError').textContent = '';
      document.getElementById('result').textContent = '';

      // 入力値を取得
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const age = parseInt(document.getElementById('age').value);
      const referral = document.getElementById('referral').value;

      // ユーザー作成
      const result = createUser(username, email, age, referral);

      // 結果を表示
      if (result.error) {
        // エラーの場合
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = result.error;
        resultDiv.style.backgroundColor = '#f8d7da';
        resultDiv.style.color = '#721c24';
      } else {
        // 成功の場合
        const user = result.user;
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <strong>登録完了！</strong><br>
          ユーザー名: ${user.username}<br>
          メール: ${user.email}<br>
          年齢: ${user.age}歳<br>
          紹介コード: ${user.referral}<br>
          登録日時: ${user.registeredAt}
        `;
        resultDiv.style.backgroundColor = '#d4edda';
        resultDiv.style.color = '#155724';

        // フォームをクリア
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('age').value = '';
        document.getElementById('referral').value = '';
      }
    };
  </script>
</body>
</html>
```

**このアプリの特徴**：
- ✅ すべての入力をチェック
- ✅ デフォルト値（紹介コードは任意）
- ✅ わかりやすいエラーメッセージ
- ✅ 成功時は登録情報を表示

---

## 実践例2：商品注文システム

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>安全な注文システム</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f5f5f5;
    }

    .container {
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h1 {
      color: #333;
      border-bottom: 3px solid #007bff;
      padding-bottom: 10px;
    }

    .form-group {
      margin-bottom: 20px;
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
      border: 2px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 14px;
    }

    input:focus, select:focus {
      outline: none;
      border-color: #007bff;
    }

    button {
      background-color: #28a745;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
      font-size: 16px;
      font-weight: bold;
    }

    button:hover {
      background-color: #218838;
    }

    .result {
      margin-top: 20px;
      padding: 20px;
      border-radius: 4px;
      display: none;
    }

    .error-box {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .success-box {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .price-breakdown {
      margin-top: 10px;
      padding: 10px;
      background-color: #f8f9fa;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📦 商品注文フォーム</h1>

    <div class="form-group">
      <label>商品名:</label>
      <input type="text" id="productName" placeholder="購入する商品名">
    </div>

    <div class="form-group">
      <label>単価 (円):</label>
      <input type="number" id="price" placeholder="1000" min="0">
    </div>

    <div class="form-group">
      <label>数量:</label>
      <input type="number" id="quantity" placeholder="1" min="1">
    </div>

    <div class="form-group">
      <label>配送方法:</label>
      <select id="shipping">
        <option value="">選択してください</option>
        <option value="standard">通常配送 (無料)</option>
        <option value="express">速達配送 (+500円)</option>
        <option value="premium">プレミアム配送 (+1000円)</option>
      </select>
    </div>

    <div class="form-group">
      <label>クーポンコード (任意):</label>
      <input type="text" id="coupon" placeholder="お持ちの方のみ">
    </div>

    <button onclick="processOrder()">注文を確定する</button>

    <div id="result" class="result"></div>
  </div>

  <script>
    // 配送料を計算する関数
    const getShippingFee = function(shippingType) {
      // デフォルト値
      if (!shippingType || shippingType === '') {
        return { error: '配送方法を選択してください' };
      }

      // 配送方法に応じた料金
      if (shippingType === 'standard') {
        return { fee: 0, name: '通常配送' };
      } else if (shippingType === 'express') {
        return { fee: 500, name: '速達配送' };
      } else if (shippingType === 'premium') {
        return { fee: 1000, name: 'プレミアム配送' };
      } else {
        return { error: '無効な配送方法です' };
      }
    };

    // クーポン割引を計算する関数
    const applyCoupon = function(couponCode, subtotal) {
      // デフォルト値（クーポンなし）
      if (!couponCode || couponCode.trim() === '') {
        return { discount: 0, name: 'なし' };
      }

      // クーポンコードのチェック
      couponCode = couponCode.trim().toUpperCase();

      if (couponCode === 'WELCOME10') {
        return { discount: subtotal * 0.1, name: 'WELCOME10 (10%割引)' };
      } else if (couponCode === 'SAVE500') {
        const discount = Math.min(500, subtotal);
        return { discount: discount, name: 'SAVE500 (500円割引)' };
      } else {
        return { discount: 0, name: '無効なクーポン' };
      }
    };

    // 注文を処理する関数
    const processOrder = function() {
      // 入力値を取得
      const productName = document.getElementById('productName').value;
      const price = parseFloat(document.getElementById('price').value);
      const quantity = parseInt(document.getElementById('quantity').value);
      const shippingType = document.getElementById('shipping').value;
      const couponCode = document.getElementById('coupon').value;

      // === エラーチェック ===

      // 1. 商品名のチェック
      if (!productName || productName.trim() === '') {
        showError('商品名を入力してください');
        return;
      }

      // 2. 価格のチェック
      if (isNaN(price) || price < 0) {
        showError('正しい価格を入力してください（0円以上）');
        return;
      }

      if (price > 1000000) {
        showError('価格が高すぎます（100万円以下）');
        return;
      }

      // 3. 数量のチェック
      if (isNaN(quantity) || quantity < 1) {
        showError('数量は1以上を入力してください');
        return;
      }

      if (quantity > 100) {
        showError('1回の注文は100個までです');
        return;
      }

      // 4. 配送方法のチェック
      const shippingResult = getShippingFee(shippingType);
      if (shippingResult.error) {
        showError(shippingResult.error);
        return;
      }

      // === 計算処理 ===

      // 小計
      const subtotal = price * quantity;

      // 配送料
      const shippingFee = shippingResult.fee;

      // クーポン割引
      const couponResult = applyCoupon(couponCode, subtotal);
      const discount = couponResult.discount;

      // 合計金額
      const total = subtotal + shippingFee - discount;

      // === 結果表示 ===

      const resultHTML = `
        <strong>✅ 注文を受け付けました</strong>

        <div class="price-breakdown">
          <strong>【注文内容】</strong><br>
          商品名: ${productName}<br>
          単価: ${price.toLocaleString()}円<br>
          数量: ${quantity}個<br>
          <hr style="border: 1px solid #ddd; margin: 10px 0;">
          小計: ${subtotal.toLocaleString()}円<br>
          配送方法: ${shippingResult.name} (+${shippingFee.toLocaleString()}円)<br>
          クーポン: ${couponResult.name} (-${discount.toLocaleString()}円)<br>
          <hr style="border: 2px solid #28a745; margin: 10px 0;">
          <strong style="font-size: 18px; color: #28a745;">
            合計: ${total.toLocaleString()}円
          </strong>
        </div>
      `;

      showSuccess(resultHTML);
    };

    // エラー表示関数
    const showError = function(message) {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = '<strong>❌ エラー</strong><br>' + message;
      resultDiv.className = 'result error-box';
      resultDiv.style.display = 'block';
    };

    // 成功表示関数
    const showSuccess = function(html) {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = html;
      resultDiv.className = 'result success-box';
      resultDiv.style.display = 'block';
    };
  </script>
</body>
</html>
```

**このアプリの特徴**：
- ✅ 商品名、価格、数量の厳密なチェック
- ✅ 配送方法の選択必須
- ✅ クーポンは任意（デフォルト値）
- ✅ 詳細な価格内訳を表示
- ✅ わかりやすいエラーメッセージ

---

## 実践例3：BMI計算機（体格指数）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>BMI計算機</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }

    .container {
      background-color: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }

    h1 {
      text-align: center;
      color: #667eea;
      margin-bottom: 30px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #333;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 6px;
      box-sizing: border-box;
      font-size: 16px;
    }

    input:focus {
      outline: none;
      border-color: #667eea;
    }

    button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 14px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      width: 100%;
      font-size: 16px;
      font-weight: bold;
    }

    button:hover {
      opacity: 0.9;
    }

    .result {
      margin-top: 20px;
      padding: 20px;
      border-radius: 6px;
      display: none;
    }

    .error {
      background-color: #fee;
      color: #c33;
      border: 2px solid #fcc;
    }

    .success {
      background-color: #efe;
      color: #3c3;
      border: 2px solid #cfc;
    }

    .bmi-value {
      font-size: 36px;
      font-weight: bold;
      text-align: center;
      margin: 20px 0;
    }

    .category {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      padding: 10px;
      border-radius: 6px;
      margin: 10px 0;
    }

    .underweight { background-color: #cce5ff; color: #004085; }
    .normal { background-color: #d4edda; color: #155724; }
    .overweight { background-color: #fff3cd; color: #856404; }
    .obese { background-color: #f8d7da; color: #721c24; }
  </style>
</head>
<body>
  <div class="container">
    <h1>💪 BMI計算機</h1>

    <div class="form-group">
      <label>身長 (cm):</label>
      <input type="number" id="height" placeholder="170" step="0.1">
    </div>

    <div class="form-group">
      <label>体重 (kg):</label>
      <input type="number" id="weight" placeholder="60" step="0.1">
    </div>

    <div class="form-group">
      <label>年齢 (任意):</label>
      <input type="number" id="age" placeholder="年齢を入力（省略可）">
    </div>

    <button onclick="calculateBMI()">BMIを計算する</button>

    <div id="result" class="result"></div>
  </div>

  <script>
    // BMIを計算する安全な関数
    const calculateBMIValue = function(height, weight) {
      // 1. 身長のチェック
      if (typeof height !== 'number' || isNaN(height)) {
        return { error: '身長を数値で入力してください' };
      }

      if (height < 50 || height > 250) {
        return { error: '身長は50cm〜250cmの範囲で入力してください' };
      }

      // 2. 体重のチェック
      if (typeof weight !== 'number' || isNaN(weight)) {
        return { error: '体重を数値で入力してください' };
      }

      if (weight < 10 || weight > 300) {
        return { error: '体重は10kg〜300kgの範囲で入力してください' };
      }

      // 3. BMI計算
      // 身長をメートルに変換
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);

      return {
        bmi: bmi,
        height: height,
        weight: weight
      };
    };

    // BMIカテゴリーを判定する関数
    const getBMICategory = function(bmi) {
      if (bmi < 18.5) {
        return {
          category: '低体重（やせ）',
          className: 'underweight',
          advice: '栄養バランスの良い食事を心がけましょう'
        };
      } else if (bmi < 25) {
        return {
          category: '普通体重',
          className: 'normal',
          advice: '理想的な体重です。この状態を維持しましょう'
        };
      } else if (bmi < 30) {
        return {
          category: '肥満（1度）',
          className: 'overweight',
          advice: '適度な運動とバランスの良い食事を心がけましょう'
        };
      } else {
        return {
          category: '肥満（2度以上）',
          className: 'obese',
          advice: '医師に相談することをおすすめします'
        };
      }
    };

    // 年齢に応じたメッセージを生成する関数
    const getAgeMessage = function(age) {
      // デフォルト値（年齢未入力の場合）
      if (!age || isNaN(age)) {
        return '';
      }

      // 年齢チェック
      if (age < 0 || age > 120) {
        return '';
      }

      // 年齢別メッセージ
      if (age < 18) {
        return '※成長期のため、医師の指導を受けることをおすすめします';
      } else if (age >= 65) {
        return '※高齢者の方は、BMIの基準が異なる場合があります';
      } else {
        return '';
      }
    };

    // BMI計算ボタンの処理
    const calculateBMI = function() {
      // 入力値を取得
      const height = parseFloat(document.getElementById('height').value);
      const weight = parseFloat(document.getElementById('weight').value);
      const age = parseInt(document.getElementById('age').value);

      // BMI計算
      const result = calculateBMIValue(height, weight);

      // エラーチェック
      if (result.error) {
        showError(result.error);
        return;
      }

      // BMIカテゴリー判定
      const category = getBMICategory(result.bmi);

      // 年齢メッセージ取得
      const ageMessage = getAgeMessage(age);

      // 結果表示
      const resultHTML = `
        <div class="bmi-value">${result.bmi.toFixed(1)}</div>
        <div class="category ${category.className}">${category.category}</div>
        <div style="margin-top: 15px; line-height: 1.6;">
          <strong>📊 詳細情報:</strong><br>
          身長: ${result.height}cm<br>
          体重: ${result.weight}kg<br>
          <br>
          <strong>💡 アドバイス:</strong><br>
          ${category.advice}
          ${ageMessage ? '<br><br>' + ageMessage : ''}
        </div>
        <div style="margin-top: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 4px; font-size: 12px;">
          <strong>BMI基準値:</strong><br>
          18.5未満: 低体重<br>
          18.5〜25未満: 普通体重<br>
          25〜30未満: 肥満(1度)<br>
          30以上: 肥満(2度以上)
        </div>
      `;

      showSuccess(resultHTML);
    };

    // エラー表示関数
    const showError = function(message) {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = '<strong>❌ エラー</strong><br>' + message;
      resultDiv.className = 'result error';
      resultDiv.style.display = 'block';
    };

    // 成功表示関数
    const showSuccess = function(html) {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = html;
      resultDiv.className = 'result success';
      resultDiv.style.display = 'block';
    };
  </script>
</body>
</html>
```

**このアプリの特徴**：
- ✅ 身長・体重の範囲チェック
- ✅ 年齢は任意（デフォルト値）
- ✅ BMIカテゴリー自動判定
- ✅ 年齢に応じた追加メッセージ
- ✅ 見やすい結果表示

---

## 練習問題

### 問題1：安全なパスワードチェック関数（基本）

パスワードの強度をチェックする関数を作成してください。

**要件**：
- パスワードが8文字以上なら「強い」
- 6文字以上なら「普通」
- それ以下なら「弱い」
- 空文字列ならエラーメッセージ

```javascript
const checkPasswordStrength = function(password) {
  // ここにコードを書く
};

// テスト
console.log(checkPasswordStrength('MyPassword123'));  // => '強い'
console.log(checkPasswordStrength('Pass12'));         // => '普通'
console.log(checkPasswordStrength('abc'));            // => '弱い'
console.log(checkPasswordStrength(''));               // => 'エラー: パスワードを入力してください'
```

<details>
<summary>💡 ヒント</summary>

1. まず空文字列チェック
2. password.lengthで長さを取得
3. 条件分岐で強度を判定

</details>

<details>
<summary>✅ 解答例</summary>

```javascript
const checkPasswordStrength = function(password) {
  // 空文字列チェック
  if (!password || password === '') {
    return 'エラー: パスワードを入力してください';
  }

  // 長さで強度を判定
  if (password.length >= 8) {
    return '強い';
  } else if (password.length >= 6) {
    return '普通';
  } else {
    return '弱い';
  }
};

// テスト
console.log(checkPasswordStrength('MyPassword123'));  // => '強い'
console.log(checkPasswordStrength('Pass12'));         // => '普通'
console.log(checkPasswordStrength('abc'));            // => '弱い'
console.log(checkPasswordStrength(''));               // => 'エラー: パスワードを入力してください'
```

**解説**：
1. まず空文字列をチェック
2. 8文字以上なら「強い」
3. 6文字以上なら「普通」
4. それ以外は「弱い」

</details>

---

### 問題2：安全な割引計算関数（応用）

商品価格から割引額を計算する関数を作成してください。

**要件**：
- 価格と割引率から割引後の価格を計算
- 価格は0以上の数値
- 割引率は0〜100の範囲（デフォルト値は0）
- 不正な入力にはエラーメッセージ

```javascript
const calculateDiscount = function(price, discountRate) {
  // ここにコードを書く
};

// テスト
console.log(calculateDiscount(1000, 10));   // => { original: 1000, discount: 100, final: 900 }
console.log(calculateDiscount(1000));       // => { original: 1000, discount: 0, final: 1000 }
console.log(calculateDiscount(-100, 10));   // => { error: '価格は0以上を入力してください' }
console.log(calculateDiscount(1000, 150));  // => { error: '割引率は0〜100の範囲で入力してください' }
```

<details>
<summary>💡 ヒント</summary>

1. 価格のチェック（数値型、0以上）
2. 割引率のデフォルト値設定
3. 割引率の範囲チェック（0〜100）
4. 計算してオブジェクトで返す

</details>

<details>
<summary>✅ 解答例</summary>

```javascript
const calculateDiscount = function(price, discountRate) {
  // 1. 価格のチェック
  if (typeof price !== 'number' || price < 0) {
    return { error: '価格は0以上を入力してください' };
  }

  // 2. デフォルト値の設定
  discountRate = discountRate || 0;

  // 3. 割引率のチェック
  if (typeof discountRate !== 'number' || discountRate < 0 || discountRate > 100) {
    return { error: '割引率は0〜100の範囲で入力してください' };
  }

  // 4. 計算
  const discountAmount = price * (discountRate / 100);
  const finalPrice = price - discountAmount;

  return {
    original: price,
    discount: discountAmount,
    final: finalPrice
  };
};

// テスト
console.log(calculateDiscount(1000, 10));
// => { original: 1000, discount: 100, final: 900 }

console.log(calculateDiscount(1000));
// => { original: 1000, discount: 0, final: 1000 }

console.log(calculateDiscount(-100, 10));
// => { error: '価格は0以上を入力してください' }

console.log(calculateDiscount(1000, 150));
// => { error: '割引率は0〜100の範囲で入力してください' }
```

**解説**：
1. 価格が数値で0以上かチェック
2. 割引率が未指定なら0を設定
3. 割引率が0〜100の範囲かチェック
4. 計算結果をオブジェクトで返す

</details>

---

### 問題3：総合的なユーザーデータ検証（発展）

ユーザー登録データを総合的に検証する関数を作成してください。

**要件**：
- ユーザー名：3文字以上、20文字以下
- メール：@を含む（簡易チェック）
- 年齢：18歳以上、100歳以下（デフォルト値：20）
- 電話番号：10桁または11桁（任意、デフォルト値：'未登録'）
- すべての検証を通過したらユーザーオブジェクトを返す
- エラーがあればエラーメッセージを返す

```javascript
const validateUser = function(username, email, age, phone) {
  // ここにコードを書く
};

// テスト
console.log(validateUser('Taro', 'taro@example.com', 25, '09012345678'));
// => { username: 'Taro', email: 'taro@example.com', age: 25, phone: '09012345678' }

console.log(validateUser('T', 'taro@example.com', 25));
// => { error: 'ユーザー名は3文字以上にしてください' }

console.log(validateUser('Taro', 'invalid-email', 25));
// => { error: 'メールアドレスに@が含まれていません' }
```

<details>
<summary>💡 ヒント</summary>

1. ユーザー名の長さチェック
2. メールに@が含まれるかチェック（indexOf使用）
3. 年齢のデフォルト値設定と範囲チェック
4. 電話番号のデフォルト値設定と長さチェック
5. すべてのチェックを通過したらオブジェクトを返す

</details>

<details>
<summary>✅ 解答例</summary>

```javascript
const validateUser = function(username, email, age, phone) {
  // 1. ユーザー名のチェック
  if (!username || username.length < 3) {
    return { error: 'ユーザー名は3文字以上にしてください' };
  }

  if (username.length > 20) {
    return { error: 'ユーザー名は20文字以下にしてください' };
  }

  // 2. メールアドレスのチェック
  if (!email || email.indexOf('@') === -1) {
    return { error: 'メールアドレスに@が含まれていません' };
  }

  // 3. 年齢のデフォルト値とチェック
  age = age || 20;

  if (typeof age !== 'number' || age < 18) {
    return { error: '年齢は18歳以上にしてください' };
  }

  if (age > 100) {
    return { error: '年齢は100歳以下にしてください' };
  }

  // 4. 電話番号のデフォルト値とチェック
  phone = phone || '未登録';

  if (phone !== '未登録') {
    // ハイフンを削除
    const cleanPhone = phone.replace(/-/g, '');

    if (cleanPhone.length !== 10 && cleanPhone.length !== 11) {
      return { error: '電話番号は10桁または11桁で入力してください' };
    }
  }

  // 5. すべての検証を通過したらユーザーオブジェクトを返す
  return {
    username: username,
    email: email,
    age: age,
    phone: phone
  };
};

// テスト
console.log(validateUser('Taro', 'taro@example.com', 25, '09012345678'));
// => { username: 'Taro', email: 'taro@example.com', age: 25, phone: '09012345678' }

console.log(validateUser('Taro', 'taro@example.com', 25));
// => { username: 'Taro', email: 'taro@example.com', age: 25, phone: '未登録' }

console.log(validateUser('T', 'taro@example.com', 25));
// => { error: 'ユーザー名は3文字以上にしてください' }

console.log(validateUser('Taro', 'invalid-email', 25));
// => { error: 'メールアドレスに@が含まれていません' }

console.log(validateUser('Taro', 'taro@example.com', 15));
// => { error: '年齢は18歳以上にしてください' }

console.log(validateUser('Taro', 'taro@example.com', 25, '123'));
// => { error: '電話番号は10桁または11桁で入力してください' }
```

**解説**：

この関数は段階的に検証を行います：

1. **ユーザー名**：3〜20文字の範囲をチェック
2. **メール**：@が含まれるかをindexOfでチェック
3. **年齢**：デフォルト値20、18〜100の範囲をチェック
4. **電話番号**：デフォルト値'未登録'、ハイフンを削除して10桁または11桁をチェック
5. すべての検証を通過したら、ユーザーオブジェクトを返す

**ポイント**：
- エラーは早期に返す（早期リターン）
- デフォルト値は||演算子で設定
- 電話番号は任意項目（'未登録'の場合は検証スキップ）

</details>

---

## カリキュラムの要件チェック

このレッスンで学んだ内容がカリキュラムの要件を満たしているか確認しましょう：

### レッスン132：エラーハンドリング
- ✅ **エラーチェック**：入力値の型、範囲、必須項目の確認
- ✅ **デフォルト値**：||演算子や条件分岐でデフォルト値を設定
- ✅ **安全な関数**：想定外の入力でも適切に動作する関数の作成

---

## まとめ

このレッスンで学んだこと：

### 1. **エラーチェックの重要性**
- 型チェック（typeof）
- 範囲チェック（数値の最小値・最大値）
- 必須項目チェック（空文字列、undefined）
- ゼロ除算などの特殊ケース

### 2. **デフォルト値の設定**
```javascript
// 方法1: ||演算子
const value = inputValue || 'デフォルト';

// 方法2: 条件分岐
if (inputValue === undefined || inputValue === null) {
  inputValue = 'デフォルト';
}
```

### 3. **安全な関数の3つの原則**
1. **入力を信用しない**：すべての入力をチェック
2. **デフォルト値を用意**：引数が省略されても動作する
3. **わかりやすいエラー**：何が問題かを明確に伝える

### 4. **防御的プログラミング**
```javascript
const safeFunction = function(input) {
  // 1. エラーチェック
  if (/* 何か問題がある */) {
    return { error: 'わかりやすいエラーメッセージ' };
  }

  // 2. デフォルト値
  input = input || 'デフォルト値';

  // 3. 安全な処理
  const result = /* 処理 */;

  return { success: true, data: result };
};
```

---

## 次のレッスンの予告

次のレッスンでは、**週のプロジェクト**に取り組みます！

これまで学んだ知識を総動員して、実践的なアプリケーションを作成します。楽しみにしていてください！
