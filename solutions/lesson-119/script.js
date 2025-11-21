// 1. フォームデータを取得する（1つの仕事）
function getFormData() {
  return {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };
}

// 2. ユーザー名が有効かチェックする（1つの仕事）
function isValidUsername(username) {
  return username.length >= 3;
}

// 3. メールアドレスが有効かチェックする（1つの仕事）
function isValidEmail(email) {
  return email.includes('@') && email.includes('.');
}

// 4. パスワードが有効かチェックする（1つの仕事）
function isValidPassword(password) {
  return password.length >= 8;
}

// 5. フォーム全体を検証する（1つの仕事）
function validateForm(data) {
  if (!isValidUsername(data.username)) {
    return {
      valid: false,
      message: 'ユーザー名は3文字以上で入力してください'
    };
  }

  if (!isValidEmail(data.email)) {
    return {
      valid: false,
      message: '正しいメールアドレスを入力してください'
    };
  }

  if (!isValidPassword(data.password)) {
    return {
      valid: false,
      message: 'パスワードは8文字以上で入力してください'
    };
  }

  return {
    valid: true,
    message: ''
  };
}

// 6. エラーメッセージを表示する（1つの仕事）
function showError(message) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
  messageDiv.className = 'message error';
}

// 7. 成功メッセージを表示する（1つの仕事）
function showSuccess(username) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = username + 'さん、登録が完了しました！';
  messageDiv.className = 'message success';
}

// 8. フォームをクリアする（1つの仕事）
function clearForm() {
  document.getElementById('username').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
}

// 9. メイン登録処理（全体の流れを制御）
function register() {
  // データを取得
  const data = getFormData();

  // 検証
  const validation = validateForm(data);

  // 検証失敗の場合
  if (!validation.valid) {
    showError(validation.message);
    return;
  }

  // 検証成功の場合
  // （本来はここでサーバーに送信するが、今回は省略）

  // 成功メッセージを表示
  showSuccess(data.username);

  // フォームをクリア
  clearForm();
}
