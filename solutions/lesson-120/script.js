// ========================================
// カート機能
// ========================================

// 価格を取得する
function getPrice() {
  return Number(document.getElementById('priceInput').value);
}

// 数量を取得する
function getQuantity() {
  return Number(document.getElementById('quantityInput').value);
}

// 小計を計算する
function calculateSubtotal(price, quantity) {
  return price * quantity;
}

// 税金を計算する
function calculateTax(subtotal) {
  const TAX_RATE = 0.1;
  return subtotal * TAX_RATE;
}

// 合計を計算する
function calculateTotal(subtotal, tax) {
  return subtotal + tax;
}

// カート概要を表示する
function showCartSummary(subtotal, tax, total) {
  const resultDiv = document.getElementById('cartResult');
  resultDiv.innerHTML =
    '<div class="result">' +
    '小計: ¥' + subtotal.toLocaleString() + '<br>' +
    '税金: ¥' + tax.toLocaleString() + '<br>' +
    '<strong>合計: ¥' + total.toLocaleString() + '</strong>' +
    '</div>';
}

// カートを更新する（メイン処理）
function updateCart() {
  const price = getPrice();
  const quantity = getQuantity();
  const subtotal = calculateSubtotal(price, quantity);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, tax);
  showCartSummary(subtotal, tax, total);
}

// ========================================
// ユーザー情報機能
// ========================================

// ユーザー名を取得する
function getUserName() {
  return document.getElementById('nameInput').value;
}

// メールアドレスを取得する
function getUserEmail() {
  return document.getElementById('emailInput').value;
}

// メールアドレスを検証する
function validateEmail(email) {
  return email.includes('@') && email.includes('.');
}

// ユーザーデータを作成する
function createUserData(name, email) {
  return {
    name: name,
    email: email,
    createdAt: new Date().toLocaleString()
  };
}

// 結果を表示する
function showUserResult(message) {
  const resultDiv = document.getElementById('userResult');
  resultDiv.innerHTML = '<div class="result">' + message + '</div>';
}

// ユーザー情報を保存する（メイン処理）
function saveUserInfo() {
  const name = getUserName();
  const email = getUserEmail();

  // 入力チェック
  if (name === '') {
    showUserResult('名前を入力してください');
    return;
  }

  if (!validateEmail(email)) {
    showUserResult('正しいメールアドレスを入力してください');
    return;
  }

  // ユーザーデータ作成
  const userData = createUserData(name, email);

  // 成功メッセージ
  showUserResult(
    name + 'さんの情報を保存しました！<br>' +
    'メール: ' + email
  );
}

// ========================================
// メッセージ表示機能
// ========================================

// ウェルカムメッセージを表示する
function showWelcomeMessage() {
  const messageArea = document.getElementById('messageArea');
  messageArea.innerHTML =
    '<div class="result">' +
    'ようこそ！ショッピングカートへ' +
    '</div>';
}

// メッセージを非表示にする
function hideMessage() {
  const messageArea = document.getElementById('messageArea');
  messageArea.innerHTML = '';
}
