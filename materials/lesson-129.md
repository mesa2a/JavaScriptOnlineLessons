# レッスン129: バリデーション関数

**作成日**: 2025-11-26

## このレッスンで学ぶこと

- 入力チェックの重要性
- `true`/`false`を返す述語関数
- エラーメッセージの生成
- バリデーション関数の設計
- フォームのバリデーション実装

---

## 日常生活での例：空港のセキュリティチェック

バリデーション関数は、**空港のセキュリティチェック**のようなものです。

```
空港のセキュリティチェック：
┌─────────────────────────────────┐
│  パスポートチェック              │  ← isValidPassport()
│  ✓ 有効期限は切れていないか       │
│  ✓ 本人の写真と一致しているか     │
│  ✓ ビザは必要か                  │
└─────────────────────────────────┘
         ↓
    ✅ OK → 搭乗可能
    ❌ NG → エラーメッセージ表示
              「パスポートの有効期限が切れています」
```

**セキュリティチェックの役割**：
- 不正な人を通さない
- 問題がある場合は理由を伝える
- 問題がなければスムーズに通す

**バリデーション関数の役割**：
- 不正なデータを受け付けない
- 問題がある場合はエラーメッセージを返す
- 問題がなければ処理を続行する

---

## バリデーション関数とは

**バリデーション関数**（Validation Functions、検証関数）は、データが正しいかどうかをチェックする関数です。

### バリデーション関数の特徴

```javascript
// ❌ バリデーションなし（危険）
const registerUser = function(email) {
  // emailが正しいかチェックせずにそのまま使う
  saveToDatabase(email);  // 不正なデータが保存されるかも
};

// ✅ バリデーションあり（安全）
const registerUser = function(email) {
  // まずemailが正しいかチェック
  if (!isValidEmail(email)) {
    return { success: false, error: 'メールアドレスが不正です' };
  }

  saveToDatabase(email);
  return { success: true };
};
```

**バリデーションの重要性**：
1. **データの品質を保つ**: 不正なデータが入らない
2. **エラーを早期発見**: 問題を早く見つけられる
3. **ユーザー体験の向上**: わかりやすいエラーメッセージ
4. **セキュリティの向上**: 攻撃を防ぐ

---

## 基本例1: true/falseを返す述語関数

最もシンプルなバリデーション関数は、`true`か`false`を返す**述語関数**（Predicate Function）です。

```javascript
// メールアドレスが有効かチェック
const isValidEmail = function(email) {
  // 最低限のチェック：@が含まれているか
  return email.includes('@');
};

// 使用例
console.log(isValidEmail('test@example.com'));  // => true
console.log(isValidEmail('invalid-email'));     // => false
console.log(isValidEmail(''));                  // => false
```

### 実行フローの詳細

```
isValidEmail('test@example.com') の実行：

ステップ1: email = 'test@example.com' を受け取る
         ↓
ステップ2: email.includes('@') を実行
         'test@example.com'.includes('@')
         ↓
ステップ3: '@'が含まれているか確認
         位置4に'@'が見つかる
         ↓
ステップ4: true を返す

結果: true（有効なメールアドレス）


isValidEmail('invalid-email') の実行：

ステップ1: email = 'invalid-email' を受け取る
         ↓
ステップ2: email.includes('@') を実行
         'invalid-email'.includes('@')
         ↓
ステップ3: '@'が含まれているか確認
         '@'が見つからない
         ↓
ステップ4: false を返す

結果: false（無効なメールアドレス）
```

---

## 基本例2: より詳細なチェック

複数の条件をチェックするバリデーション関数を作成します。

```javascript
// パスワードが有効かチェック
const isValidPassword = function(password) {
  // 長さが8文字以上
  if (password.length < 8) {
    return false;
  }

  // 数字が含まれているか
  const hasNumber = /[0-9]/.test(password);
  if (!hasNumber) {
    return false;
  }

  // 文字が含まれているか
  const hasLetter = /[a-zA-Z]/.test(password);
  if (!hasLetter) {
    return false;
  }

  return true;
};

// 使用例
console.log(isValidPassword('abc12345'));    // => true
console.log(isValidPassword('abcdefgh'));    // => false（数字なし）
console.log(isValidPassword('12345678'));    // => false（文字なし）
console.log(isValidPassword('abc123'));      // => false（短い）
```

### 実行フローの詳細

```
isValidPassword('abc123') の実行：

ステップ1: password = 'abc123' を受け取る
         ↓
ステップ2: 長さチェック
         password.length = 6
         6 < 8 ? → true（短すぎる）
         ↓
ステップ3: return false

結果: false（8文字未満）


isValidPassword('abc12345') の実行：

ステップ1: password = 'abc12345' を受け取る
         ↓
ステップ2: 長さチェック
         password.length = 8
         8 < 8 ? → false（OK）
         ↓
ステップ3: 数字チェック
         /[0-9]/.test('abc12345')
         '1', '2', '3', '4', '5'が見つかる
         hasNumber = true
         ↓
ステップ4: 文字チェック
         /[a-zA-Z]/.test('abc12345')
         'a', 'b', 'c'が見つかる
         hasLetter = true
         ↓
ステップ5: すべてのチェックをパス
         return true

結果: true（有効なパスワード）
```

---

## 基本例3: エラーメッセージを返す

`true`/`false`だけでなく、エラーメッセージも返すバリデーション関数です。

```javascript
// ユーザー名をチェック（エラーメッセージ付き）
const validateUsername = function(username) {
  // 空文字チェック
  if (!username || username.trim() === '') {
    return 'ユーザー名を入力してください';
  }

  // 長さチェック
  if (username.length < 3) {
    return 'ユーザー名は3文字以上にしてください';
  }

  if (username.length > 20) {
    return 'ユーザー名は20文字以内にしてください';
  }

  // 特殊文字チェック
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'ユーザー名は英数字とアンダースコアのみ使用できます';
  }

  // すべてのチェックをパス
  return '';  // エラーなし
};

// 使用例
console.log(validateUsername(''));           // => 'ユーザー名を入力してください'
console.log(validateUsername('ab'));         // => 'ユーザー名は3文字以上にしてください'
console.log(validateUsername('user@name'));  // => 'ユーザー名は英数字とアンダースコアのみ使用できます'
console.log(validateUsername('user_123'));   // => ''（エラーなし）
```

### 実行フローの詳細

```
validateUsername('ab') の実行：

ステップ1: username = 'ab' を受け取る
         ↓
ステップ2: 空文字チェック
         'ab' && 'ab'.trim() !== '' → true（OK）
         ↓
ステップ3: 最小長チェック
         'ab'.length = 2
         2 < 3 ? → true（短すぎる）
         ↓
ステップ4: エラーメッセージを返す
         return 'ユーザー名は3文字以上にしてください'

結果: 'ユーザー名は3文字以上にしてください'


validateUsername('user_123') の実行：

ステップ1: username = 'user_123' を受け取る
         ↓
ステップ2: 空文字チェック → OK
         ↓
ステップ3: 最小長チェック
         'user_123'.length = 8
         8 < 3 ? → false（OK）
         ↓
ステップ4: 最大長チェック
         8 > 20 ? → false（OK）
         ↓
ステップ5: 特殊文字チェック
         /^[a-zA-Z0-9_]+$/.test('user_123')
         すべて英数字とアンダースコア → true（OK）
         ↓
ステップ6: すべてOK
         return ''（エラーなし）

結果: ''（有効なユーザー名）
```

---

## 実践例1: ユーザー登録フォームのバリデーション

完全なユーザー登録フォームのバリデーションシステムです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ユーザー登録フォーム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input {
      width: 100%;
      padding: 10px;
      font-size: 14px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .error {
      color: #e74c3c;
      font-size: 12px;
      margin-top: 5px;
      display: none;
    }
    .error.show {
      display: block;
    }
    button {
      width: 100%;
      padding: 12px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    button:hover {
      background-color: #2980b9;
    }
    .success {
      background-color: #27ae60;
      color: white;
      padding: 15px;
      border-radius: 4px;
      margin-top: 20px;
      display: none;
    }
    .success.show {
      display: block;
    }
  </style>
</head>
<body>
  <h1>📝 ユーザー登録</h1>

  <form id="registerForm">
    <div class="form-group">
      <label for="username">ユーザー名</label>
      <input type="text" id="username" placeholder="user_123">
      <div class="error" id="usernameError"></div>
    </div>

    <div class="form-group">
      <label for="email">メールアドレス</label>
      <input type="text" id="email" placeholder="user@example.com">
      <div class="error" id="emailError"></div>
    </div>

    <div class="form-group">
      <label for="password">パスワード</label>
      <input type="password" id="password" placeholder="8文字以上、英数字を含む">
      <div class="error" id="passwordError"></div>
    </div>

    <div class="form-group">
      <label for="age">年齢</label>
      <input type="number" id="age" placeholder="18">
      <div class="error" id="ageError"></div>
    </div>

    <button type="submit">登録</button>
  </form>

  <div class="success" id="successMessage">
    ✅ 登録が完了しました！
  </div>

  <script>
    // ========================================
    // バリデーション関数群（述語関数）
    // ========================================

    // ユーザー名のバリデーション
    const validateUsername = function(username) {
      if (!username || username.trim() === '') {
        return 'ユーザー名を入力してください';
      }
      if (username.length < 3) {
        return 'ユーザー名は3文字以上にしてください';
      }
      if (username.length > 20) {
        return 'ユーザー名は20文字以内にしてください';
      }
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return 'ユーザー名は英数字とアンダースコアのみ使用できます';
      }
      return '';  // エラーなし
    };

    // メールアドレスのバリデーション
    const validateEmail = function(email) {
      if (!email || email.trim() === '') {
        return 'メールアドレスを入力してください';
      }
      if (!email.includes('@')) {
        return '有効なメールアドレスを入力してください';
      }
      if (!email.includes('.')) {
        return '有効なメールアドレスを入力してください';
      }
      return '';
    };

    // パスワードのバリデーション
    const validatePassword = function(password) {
      if (!password || password.trim() === '') {
        return 'パスワードを入力してください';
      }
      if (password.length < 8) {
        return 'パスワードは8文字以上にしてください';
      }
      if (!/[0-9]/.test(password)) {
        return 'パスワードには数字を含めてください';
      }
      if (!/[a-zA-Z]/.test(password)) {
        return 'パスワードには英字を含めてください';
      }
      return '';
    };

    // 年齢のバリデーション
    const validateAge = function(age) {
      const ageNum = parseInt(age);

      if (!age || age === '') {
        return '年齢を入力してください';
      }
      if (isNaN(ageNum)) {
        return '有効な年齢を入力してください';
      }
      if (ageNum < 18) {
        return '18歳以上である必要があります';
      }
      if (ageNum > 120) {
        return '有効な年齢を入力してください';
      }
      return '';
    };

    // ========================================
    // UI操作関数
    // ========================================

    // エラーメッセージを表示
    const showError = function(fieldId, message) {
      const errorElement = document.getElementById(fieldId + 'Error');
      errorElement.textContent = message;
      errorElement.classList.add('show');
    };

    // エラーメッセージを非表示
    const hideError = function(fieldId) {
      const errorElement = document.getElementById(fieldId + 'Error');
      errorElement.classList.remove('show');
    };

    // すべてのエラーをクリア
    const clearAllErrors = function() {
      hideError('username');
      hideError('email');
      hideError('password');
      hideError('age');
    };

    // フォーム送信処理
    document.getElementById('registerForm').addEventListener('submit', function(event) {
      event.preventDefault();  // フォームのデフォルト送信を防ぐ

      // 入力値を取得
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const age = document.getElementById('age').value;

      // エラーをクリア
      clearAllErrors();
      document.getElementById('successMessage').classList.remove('show');

      // バリデーション実行
      const usernameError = validateUsername(username);
      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);
      const ageError = validateAge(age);

      // エラーがあれば表示
      let hasError = false;

      if (usernameError) {
        showError('username', usernameError);
        hasError = true;
      }

      if (emailError) {
        showError('email', emailError);
        hasError = true;
      }

      if (passwordError) {
        showError('password', passwordError);
        hasError = true;
      }

      if (ageError) {
        showError('age', ageError);
        hasError = true;
      }

      // エラーがなければ成功
      if (!hasError) {
        document.getElementById('successMessage').classList.add('show');

        console.log('=== 登録データ ===');
        console.log('ユーザー名:', username);
        console.log('メール:', email);
        console.log('年齢:', age);

        // フォームをクリア
        document.getElementById('registerForm').reset();
      }
    });
  </script>
</body>
</html>
```

### バリデーションの実行フロー

```
フォーム送信時のバリデーション処理：

入力データ:
  username: 'ab'
  email: 'test@example.com'
  password: 'pass123'
  age: '25'

ステップ1: validateUsername('ab')
         ↓
         'ab'.length = 2
         2 < 3 ? → true
         ↓
         usernameError = 'ユーザー名は3文字以上にしてください'

ステップ2: validateEmail('test@example.com')
         ↓
         '@'を含む？ → true
         '.'を含む？ → true
         ↓
         emailError = ''（エラーなし）

ステップ3: validatePassword('pass123')
         ↓
         length = 7
         7 < 8 ? → true
         ↓
         passwordError = 'パスワードは8文字以上にしてください'

ステップ4: validateAge('25')
         ↓
         25 >= 18 ? → true
         25 <= 120 ? → true
         ↓
         ageError = ''（エラーなし）

ステップ5: エラーチェック
         usernameError !== '' → true
         passwordError !== '' → true
         ↓
         hasError = true

ステップ6: エラー表示
         showError('username', 'ユーザー名は3文字以上にしてください')
         showError('password', 'パスワードは8文字以上にしてください')

結果: 登録失敗（エラーメッセージ表示）
```

---

## 実践例2: 商品価格バリデーター

商品価格の入力をチェックするシステムです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>商品価格バリデーター</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .input-group {
      margin: 20px 0;
    }
    input {
      padding: 10px;
      font-size: 16px;
      width: 200px;
      margin-right: 10px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .result {
      margin-top: 20px;
      padding: 15px;
      border-radius: 4px;
      display: none;
    }
    .result.valid {
      background-color: #27ae60;
      color: white;
      display: block;
    }
    .result.invalid {
      background-color: #e74c3c;
      color: white;
      display: block;
    }
    .checks {
      margin-top: 20px;
      padding: 15px;
      background-color: #ecf0f1;
      border-radius: 4px;
    }
    .check-item {
      margin: 5px 0;
    }
    .check-item.pass {
      color: #27ae60;
    }
    .check-item.fail {
      color: #e74c3c;
    }
  </style>
</head>
<body>
  <h1>💰 商品価格バリデーター</h1>

  <div class="input-group">
    <input type="text" id="priceInput" placeholder="1000">
    <button onclick="validatePrice()">チェック</button>
  </div>

  <div class="result" id="result"></div>

  <div class="checks" id="checks"></div>

  <script>
    // ========================================
    // バリデーション関数群
    // ========================================

    // 数値かチェック
    const isNumber = function(value) {
      return !isNaN(value) && value !== '';
    };

    // 正の数かチェック
    const isPositive = function(value) {
      return parseFloat(value) > 0;
    };

    // 範囲内かチェック
    const isInRange = function(value, min, max) {
      const num = parseFloat(value);
      return num >= min && num <= max;
    };

    // 小数点以下の桁数チェック
    const hasValidDecimals = function(value, maxDecimals) {
      const parts = value.toString().split('.');
      if (parts.length === 1) return true;  // 整数はOK
      return parts[1].length <= maxDecimals;
    };

    // 総合バリデーション
    const validatePriceValue = function(price) {
      const checks = [];

      // チェック1: 数値か
      const isNum = isNumber(price);
      checks.push({
        name: '数値であるか',
        passed: isNum,
        message: isNum ? '✓ 数値です' : '✗ 数値を入力してください'
      });

      if (!isNum) {
        return { valid: false, checks: checks };
      }

      // チェック2: 正の数か
      const isPos = isPositive(price);
      checks.push({
        name: '正の数であるか',
        passed: isPos,
        message: isPos ? '✓ 正の数です' : '✗ 0より大きい値を入力してください'
      });

      // チェック3: 範囲内か（1円〜1,000,000円）
      const inRange = isInRange(price, 1, 1000000);
      checks.push({
        name: '範囲内か（1〜1,000,000円）',
        passed: inRange,
        message: inRange ? '✓ 範囲内です' : '✗ 1円〜1,000,000円の範囲で入力してください'
      });

      // チェック4: 小数点以下2桁以内か
      const validDecimals = hasValidDecimals(price, 2);
      checks.push({
        name: '小数点以下2桁以内か',
        passed: validDecimals,
        message: validDecimals ? '✓ 小数点以下2桁以内です' : '✗ 小数点以下は2桁以内にしてください'
      });

      // すべてのチェックをパスしたか
      const allPassed = checks.every(function(check) {
        return check.passed;
      });

      return {
        valid: allPassed,
        checks: checks,
        value: parseFloat(price)
      };
    };

    // ========================================
    // UI操作関数
    // ========================================

    function validatePrice() {
      const input = document.getElementById('priceInput').value;
      const result = validatePriceValue(input);

      // 結果表示
      const resultElement = document.getElementById('result');
      if (result.valid) {
        resultElement.textContent = `✅ 有効な価格です：¥${result.value.toLocaleString()}`;
        resultElement.className = 'result valid';
      } else {
        resultElement.textContent = '❌ 無効な価格です';
        resultElement.className = 'result invalid';
      }

      // チェック詳細表示
      const checksElement = document.getElementById('checks');
      let checksHTML = '<h3>チェック結果：</h3>';

      result.checks.forEach(function(check) {
        const className = check.passed ? 'check-item pass' : 'check-item fail';
        checksHTML += `<div class="${className}">${check.message}</div>`;
      });

      checksElement.innerHTML = checksHTML;

      // コンソールにログ
      console.log('=== バリデーション結果 ===');
      console.log('入力値:', input);
      console.log('有効:', result.valid);
      result.checks.forEach(function(check) {
        console.log(`${check.name}: ${check.passed ? 'OK' : 'NG'}`);
      });
    }
  </script>
</body>
</html>
```

### 価格バリデーションの実行フロー

```
validatePriceValue('1500.5') の実行：

初期状態: price = '1500.5'

チェック1: 数値チェック
  isNumber('1500.5')
  ↓
  !isNaN('1500.5') && '1500.5' !== ''
  !isNaN(1500.5) && true
  true && true → true
  ↓
  checks.push({ name: '数値であるか', passed: true, ... })

チェック2: 正の数チェック
  isPositive('1500.5')
  ↓
  parseFloat('1500.5') > 0
  1500.5 > 0 → true
  ↓
  checks.push({ name: '正の数であるか', passed: true, ... })

チェック3: 範囲チェック
  isInRange('1500.5', 1, 1000000)
  ↓
  1500.5 >= 1 && 1500.5 <= 1000000
  true && true → true
  ↓
  checks.push({ name: '範囲内か', passed: true, ... })

チェック4: 小数点桁数チェック
  hasValidDecimals('1500.5', 2)
  ↓
  '1500.5'.split('.') → ['1500', '5']
  parts[1].length = 1
  1 <= 2 → true
  ↓
  checks.push({ name: '小数点以下2桁以内か', passed: true, ... })

最終判定:
  すべてのチェックがpassed: true
  ↓
  allPassed = true

結果: { valid: true, checks: [...], value: 1500.5 }
```

---

## 実践例3: 複数フィールドの相互チェック

複数のフィールドを組み合わせてチェックする高度なバリデーションです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>イベント予約フォーム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
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
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 12px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    .errors {
      background-color: #e74c3c;
      color: white;
      padding: 15px;
      border-radius: 4px;
      margin: 15px 0;
      display: none;
    }
    .errors.show {
      display: block;
    }
    .errors ul {
      margin: 5px 0;
      padding-left: 20px;
    }
    .success {
      background-color: #27ae60;
      color: white;
      padding: 15px;
      border-radius: 4px;
      margin: 15px 0;
      display: none;
    }
    .success.show {
      display: block;
    }
  </style>
</head>
<body>
  <h1>🎫 イベント予約フォーム</h1>

  <form id="eventForm">
    <div class="form-group">
      <label for="startDate">開始日</label>
      <input type="date" id="startDate">
    </div>

    <div class="form-group">
      <label for="endDate">終了日</label>
      <input type="date" id="endDate">
    </div>

    <div class="form-group">
      <label for="participants">参加人数</label>
      <input type="number" id="participants" min="1">
    </div>

    <div class="form-group">
      <label for="budget">予算（円）</label>
      <input type="number" id="budget" min="0">
    </div>

    <button type="submit">予約確認</button>
  </form>

  <div class="errors" id="errors">
    <strong>⚠️ 以下のエラーを修正してください：</strong>
    <ul id="errorList"></ul>
  </div>

  <div class="success" id="success">
    ✅ 予約内容を確認しました！
  </div>

  <script>
    // ========================================
    // バリデーション関数群
    // ========================================

    // 日付が未来かチェック
    const isFutureDate = function(dateString) {
      const inputDate = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0);  // 時刻をリセット
      return inputDate >= today;
    };

    // 終了日が開始日より後かチェック
    const isEndAfterStart = function(startDate, endDate) {
      return new Date(endDate) >= new Date(startDate);
    };

    // 予算が適切かチェック（1人あたり最低1000円）
    const isBudgetSufficient = function(budget, participants) {
      const perPerson = budget / participants;
      return perPerson >= 1000;
    };

    // 総合バリデーション
    const validateEventForm = function(formData) {
      const errors = [];

      // 開始日チェック
      if (!formData.startDate) {
        errors.push('開始日を入力してください');
      } else if (!isFutureDate(formData.startDate)) {
        errors.push('開始日は今日以降の日付を選択してください');
      }

      // 終了日チェック
      if (!formData.endDate) {
        errors.push('終了日を入力してください');
      } else if (!isFutureDate(formData.endDate)) {
        errors.push('終了日は今日以降の日付を選択してください');
      }

      // 開始日と終了日の関係チェック
      if (formData.startDate && formData.endDate) {
        if (!isEndAfterStart(formData.startDate, formData.endDate)) {
          errors.push('終了日は開始日以降の日付を選択してください');
        }
      }

      // 参加人数チェック
      if (!formData.participants || formData.participants < 1) {
        errors.push('参加人数を1人以上にしてください');
      } else if (formData.participants > 100) {
        errors.push('参加人数は100人以下にしてください');
      }

      // 予算チェック
      if (!formData.budget || formData.budget < 0) {
        errors.push('予算を入力してください');
      } else if (formData.participants && formData.budget) {
        if (!isBudgetSufficient(formData.budget, formData.participants)) {
          const required = formData.participants * 1000;
          errors.push(`予算が不足しています（最低${required.toLocaleString()}円必要）`);
        }
      }

      return errors;
    };

    // ========================================
    // UI操作関数
    // ========================================

    document.getElementById('eventForm').addEventListener('submit', function(event) {
      event.preventDefault();

      // フォームデータ取得
      const formData = {
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        participants: parseInt(document.getElementById('participants').value),
        budget: parseInt(document.getElementById('budget').value)
      };

      // バリデーション実行
      const errors = validateEventForm(formData);

      // エラー表示をクリア
      document.getElementById('errors').classList.remove('show');
      document.getElementById('success').classList.remove('show');

      if (errors.length > 0) {
        // エラーがある場合
        let errorHTML = '';
        errors.forEach(function(error) {
          errorHTML += '<li>' + error + '</li>';
        });
        document.getElementById('errorList').innerHTML = errorHTML;
        document.getElementById('errors').classList.add('show');

        console.log('=== バリデーションエラー ===');
        errors.forEach(function(error) {
          console.log('- ' + error);
        });
      } else {
        // エラーがない場合
        document.getElementById('success').classList.add('show');

        console.log('=== 予約内容 ===');
        console.log('開始日:', formData.startDate);
        console.log('終了日:', formData.endDate);
        console.log('参加人数:', formData.participants + '人');
        console.log('予算:', '¥' + formData.budget.toLocaleString());
        console.log('1人あたり:', '¥' + (formData.budget / formData.participants).toLocaleString());
      }
    });
  </script>
</body>
</html>
```

### 複数フィールドバリデーションの実行フロー

```
validateEventForm(formData) の実行：

入力データ:
  startDate: '2025-11-20'
  endDate: '2025-11-25'
  participants: 10
  budget: 5000

ステップ1: 開始日チェック
  startDate = '2025-11-20'
  isFutureDate('2025-11-20')
  ↓
  new Date('2025-11-20') >= 今日
  → true（OK）

ステップ2: 終了日チェック
  endDate = '2025-11-25'
  isFutureDate('2025-11-25')
  → true（OK）

ステップ3: 日付の関係チェック
  isEndAfterStart('2025-11-20', '2025-11-25')
  ↓
  new Date('2025-11-25') >= new Date('2025-11-20')
  → true（OK）

ステップ4: 参加人数チェック
  participants = 10
  1 <= 10 <= 100 → true（OK）

ステップ5: 予算チェック
  budget = 5000
  isBudgetSufficient(5000, 10)
  ↓
  perPerson = 5000 / 10 = 500
  500 >= 1000 ? → false（不足）
  ↓
  errors.push('予算が不足しています（最低10,000円必要）')

結果: errors = ['予算が不足しています（最低10,000円必要）']
```

---

## 練習問題

### 練習問題1: 電話番号バリデーター（基本）

日本の電話番号をチェックするバリデーション関数を作成してください。

**要件**：
- ハイフンなしで10桁または11桁
- すべて数字
- 空文字はエラー

```javascript
// 関数を作成してください
const validatePhoneNumber = function(phone) {
  // ここにコードを書く
};

// テスト
console.log(validatePhoneNumber('09012345678'));  // => ''（エラーなし）
console.log(validatePhoneNumber('0312345678'));   // => ''（エラーなし）
console.log(validatePhoneNumber('123'));          // => エラーメッセージ
console.log(validatePhoneNumber(''));             // => エラーメッセージ
console.log(validatePhoneNumber('090-1234-5678')); // => エラーメッセージ
```

<details>
<summary>💡 ヒント</summary>

チェック項目：
1. 空文字チェック
2. 長さチェック（10桁または11桁）
3. 数字のみチェック（`/^[0-9]+$/.test(phone)`）

</details>

<details>
<summary>✅ 解答例</summary>

```javascript
const validatePhoneNumber = function(phone) {
  // 空文字チェック
  if (!phone || phone.trim() === '') {
    return '電話番号を入力してください';
  }

  // 数字のみチェック
  if (!/^[0-9]+$/.test(phone)) {
    return '電話番号は数字のみで入力してください';
  }

  // 長さチェック
  if (phone.length !== 10 && phone.length !== 11) {
    return '電話番号は10桁または11桁で入力してください';
  }

  return '';  // エラーなし
};

// テスト
console.log(validatePhoneNumber('09012345678'));    // => ''
console.log(validatePhoneNumber('0312345678'));     // => ''
console.log(validatePhoneNumber('123'));            // => '電話番号は10桁または11桁で入力してください'
console.log(validatePhoneNumber(''));               // => '電話番号を入力してください'
console.log(validatePhoneNumber('090-1234-5678')); // => '電話番号は数字のみで入力してください'

// 実行フロー例: validatePhoneNumber('090-1234-5678')
//
// ステップ1: phone = '090-1234-5678'
//          空文字チェック → OK
//
// ステップ2: 数字のみチェック
//          /^[0-9]+$/.test('090-1234-5678')
//          '-'が含まれる → false
//          return '電話番号は数字のみで入力してください'
```
</details>

---

### 練習問題2: クレジットカード番号チェッカー（応用）

クレジットカード番号の基本的なバリデーションを行う関数を作成してください。

**要件**：
- 16桁の数字
- すべて数字
- 先頭が0ではない
- 詳細なエラーメッセージ

```javascript
// 関数を作成してください
const validateCreditCard = function(cardNumber) {
  // ここにコードを書く
  // { valid: true/false, message: 'エラーメッセージ' } を返す
};

// テスト
console.log(validateCreditCard('1234567890123456'));
// => { valid: true, message: '' }

console.log(validateCreditCard('123'));
// => { valid: false, message: '16桁で入力してください' }
```

<details>
<summary>💡 ヒント</summary>

オブジェクトを返す形式にします：

```javascript
return {
  valid: true,    // または false
  message: ''     // エラーメッセージ
};
```

チェック項目：
1. 空文字
2. 数字のみ
3. 16桁
4. 先頭が0でない
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
const validateCreditCard = function(cardNumber) {
  // 空文字チェック
  if (!cardNumber || cardNumber.trim() === '') {
    return { valid: false, message: 'カード番号を入力してください' };
  }

  // 数字のみチェック
  if (!/^[0-9]+$/.test(cardNumber)) {
    return { valid: false, message: 'カード番号は数字のみで入力してください' };
  }

  // 長さチェック
  if (cardNumber.length !== 16) {
    return { valid: false, message: '16桁で入力してください' };
  }

  // 先頭が0でないかチェック
  if (cardNumber.charAt(0) === '0') {
    return { valid: false, message: 'カード番号の先頭は0以外にしてください' };
  }

  return { valid: true, message: '' };
};

// テスト
console.log(validateCreditCard('1234567890123456'));
// => { valid: true, message: '' }

console.log(validateCreditCard('123'));
// => { valid: false, message: '16桁で入力してください' }

console.log(validateCreditCard('0234567890123456'));
// => { valid: false, message: 'カード番号の先頭は0以外にしてください' }

console.log(validateCreditCard('1234-5678-9012-3456'));
// => { valid: false, message: 'カード番号は数字のみで入力してください' }
```
</details>

---

### 練習問題3: 総合バリデーションシステム（発展）

複数のバリデーション関数を組み合わせた、完全なバリデーションシステムを作成してください。

**要件**：
- ユーザー名、メール、パスワード、年齢をチェック
- すべてのエラーを配列で返す
- 各フィールドごとにエラーメッセージを分ける

```javascript
// 関数を作成してください
const validateUserRegistration = function(userData) {
  // ここにコードを書く
  // { valid: true/false, errors: {} } を返す
};

// テスト
const data1 = {
  username: 'user_123',
  email: 'test@example.com',
  password: 'pass1234',
  age: 25
};

const data2 = {
  username: 'ab',
  email: 'invalid',
  password: '123',
  age: 15
};

console.log(validateUserRegistration(data1));
// => { valid: true, errors: {} }

console.log(validateUserRegistration(data2));
// => {
//      valid: false,
//      errors: {
//        username: 'ユーザー名は3文字以上にしてください',
//        email: '有効なメールアドレスを入力してください',
//        password: 'パスワードは8文字以上にしてください',
//        age: '18歳以上である必要があります'
//      }
//    }
```

<details>
<summary>💡 ヒント</summary>

各フィールドのバリデーション関数を作成し、それらを組み合わせます：

```javascript
const validateUsername = function(username) {
  // チェック処理
  return '';  // またはエラーメッセージ
};

const validateUserRegistration = function(userData) {
  const errors = {};

  const usernameError = validateUsername(userData.username);
  if (usernameError) {
    errors.username = usernameError;
  }

  // 他のフィールドも同様に...

  return {
    valid: Object.keys(errors).length === 0,
    errors: errors
  };
};
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
// 各フィールドのバリデーション関数
const validateUsername = function(username) {
  if (!username || username.trim() === '') {
    return 'ユーザー名を入力してください';
  }
  if (username.length < 3) {
    return 'ユーザー名は3文字以上にしてください';
  }
  if (username.length > 20) {
    return 'ユーザー名は20文字以内にしてください';
  }
  return '';
};

const validateEmail = function(email) {
  if (!email || email.trim() === '') {
    return 'メールアドレスを入力してください';
  }
  if (!email.includes('@') || !email.includes('.')) {
    return '有効なメールアドレスを入力してください';
  }
  return '';
};

const validatePassword = function(password) {
  if (!password || password.trim() === '') {
    return 'パスワードを入力してください';
  }
  if (password.length < 8) {
    return 'パスワードは8文字以上にしてください';
  }
  if (!/[0-9]/.test(password)) {
    return 'パスワードには数字を含めてください';
  }
  if (!/[a-zA-Z]/.test(password)) {
    return 'パスワードには英字を含めてください';
  }
  return '';
};

const validateAge = function(age) {
  if (!age) {
    return '年齢を入力してください';
  }
  if (age < 18) {
    return '18歳以上である必要があります';
  }
  if (age > 120) {
    return '有効な年齢を入力してください';
  }
  return '';
};

// 総合バリデーション
const validateUserRegistration = function(userData) {
  const errors = {};

  // 各フィールドをチェック
  const usernameError = validateUsername(userData.username);
  if (usernameError) {
    errors.username = usernameError;
  }

  const emailError = validateEmail(userData.email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(userData.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  const ageError = validateAge(userData.age);
  if (ageError) {
    errors.age = ageError;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors: errors
  };
};

// テスト
const data1 = {
  username: 'user_123',
  email: 'test@example.com',
  password: 'pass1234',
  age: 25
};

const data2 = {
  username: 'ab',
  email: 'invalid',
  password: '123',
  age: 15
};

console.log('=== テスト1（正常データ）===');
const result1 = validateUserRegistration(data1);
console.log('Valid:', result1.valid);
console.log('Errors:', result1.errors);

console.log('\n=== テスト2（エラーデータ）===');
const result2 = validateUserRegistration(data2);
console.log('Valid:', result2.valid);
console.log('Errors:', result2.errors);

// 実行フロー例: validateUserRegistration(data2)
//
// 入力: { username: 'ab', email: 'invalid', password: '123', age: 15 }
//
// validateUsername('ab')
//   → 'ab'.length = 2
//   → 2 < 3
//   → return 'ユーザー名は3文字以上にしてください'
//
// validateEmail('invalid')
//   → 'invalid'.includes('@') → false
//   → return '有効なメールアドレスを入力してください'
//
// validatePassword('123')
//   → '123'.length = 3
//   → 3 < 8
//   → return 'パスワードは8文字以上にしてください'
//
// validateAge(15)
//   → 15 < 18
//   → return '18歳以上である必要があります'
//
// errors = {
//   username: 'ユーザー名は3文字以上にしてください',
//   email: '有効なメールアドレスを入力してください',
//   password: 'パスワードは8文字以上にしてください',
//   age: '18歳以上である必要があります'
// }
//
// Object.keys(errors).length = 4
// 4 === 0 ? → false
//
// return { valid: false, errors: {...} }
```
</details>

---

## まとめ

このレッスンで学んだこと：

### 1. バリデーション関数の概念
- データの正当性をチェックする
- 不正なデータを早期に発見する
- セキュリティと品質の向上

### 2. 述語関数
- `true`/`false`を返す関数
- `isValid...` の命名規則
- シンプルで再利用可能

### 3. エラーメッセージの生成
- わかりやすいメッセージ
- 具体的な修正方法を提示
- ユーザー体験の向上

### 4. バリデーションのパターン
- 単一フィールドチェック
- 複数フィールドの相互チェック
- 詳細なエラー情報の返却

### 5. 実践的な応用
- フォームバリデーション
- 価格チェック
- イベント予約システム

**バリデーションの重要性**：
```
入力データ
  ↓
バリデーション（検証）
  ↓
✅ 正しい → 処理続行
❌ 不正 → エラーメッセージ
  ↓
品質の高いシステム
```

---

## カリキュラム要求事項の確認

レッスン129の要求事項：

- ✅ **入力チェック**: データが正しいかを検証する関数の実装
- ✅ **true/falseを返す**: 述語関数（isValidEmail, isValidPassword等）
- ✅ **エラーメッセージ**: わかりやすいエラーメッセージの生成
- ✅ **知識**: 検証処理、述語関数、バリデーションパターン
- ✅ **成果物**: バリデーター（ユーザー登録、価格チェック、イベント予約フォーム）

すべての要求事項を満たしています！

---

## 次のステップ

次のレッスンでは、**変換関数**（データの変換）について学びます。

**予告**：
- データの形式変換
- フォーマットの変更
- 正規化処理
- マッピング関数

**なぜ重要か**：
バリデーション関数でデータの正当性をチェックできるようになったら、次はデータを目的の形式に変換する技術が必要です。変換関数は、異なるシステム間でデータをやり取りする際に必須のスキルです！
