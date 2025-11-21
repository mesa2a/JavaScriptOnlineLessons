// ========================================
// 1. カウンターアプリ（無名関数を使用）
// ========================================

let count = 0;

// カウントアップボタン（無名関数）
document.getElementById('upBtn').addEventListener('click', function() {
  count = count + 1;
  document.getElementById('counterDisplay').textContent = count;
});

// カウントダウンボタン（無名関数）
document.getElementById('downBtn').addEventListener('click', function() {
  count = count - 1;
  document.getElementById('counterDisplay').textContent = count;
});

// リセットボタン（無名関数）
document.getElementById('resetBtn').addEventListener('click', function() {
  count = 0;
  document.getElementById('counterDisplay').textContent = count;
});

// ========================================
// 2. リアルタイム入力チェック（無名関数）
// ========================================

// 名前の入力チェック（無名関数）
document.getElementById('nameInput').addEventListener('input', function() {
  const value = document.getElementById('nameInput').value;
  const errorDiv = document.getElementById('nameError');

  if (value.length === 0) {
    errorDiv.textContent = '';
  } else if (value.length < 3) {
    errorDiv.textContent = '3文字以上入力してください';
  } else {
    errorDiv.textContent = '';
  }
});

// メールの入力チェック（無名関数）
document.getElementById('emailInput').addEventListener('input', function() {
  const value = document.getElementById('emailInput').value;
  const errorDiv = document.getElementById('emailError');

  if (value.length === 0) {
    errorDiv.textContent = '';
  } else if (!value.includes('@')) {
    errorDiv.textContent = '@を含めてください';
  } else if (!value.includes('.')) {
    errorDiv.textContent = '.を含めてください';
  } else {
    errorDiv.textContent = '';
  }
});

// 送信ボタン（無名関数）
document.getElementById('submitBtn').addEventListener('click', function() {
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;

  // 簡単なバリデーション
  if (name.length >= 3 && email.includes('@') && email.includes('.')) {
    const message = document.getElementById('successMessage');
    message.classList.add('show');

    // 3秒後に非表示
    setTimeout(function() {
      message.classList.remove('show');
    }, 3000);
  }
});

// ========================================
// 3. マウスイベント（無名関数）
// ========================================

const hoverBtn = document.getElementById('hoverBtn');
const hoverMessage = document.getElementById('hoverMessage');

// マウスオーバー時（無名関数）
hoverBtn.addEventListener('mouseover', function() {
  hoverBtn.style.backgroundColor = '#2196F3';
  hoverMessage.textContent = 'マウスが乗っています';
  hoverMessage.classList.add('show');
});

// マウスアウト時（無名関数）
hoverBtn.addEventListener('mouseout', function() {
  hoverBtn.style.backgroundColor = '';
  hoverMessage.textContent = 'マウスが離れました';

  // 1秒後にメッセージを消す
  setTimeout(function() {
    hoverMessage.classList.remove('show');
  }, 1000);
});

// クリック時（無名関数）
hoverBtn.addEventListener('click', function() {
  hoverMessage.textContent = 'クリックされました！';
  hoverMessage.classList.add('show');
});
