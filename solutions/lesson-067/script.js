let registerForm = document.getElementById("registerForm");
let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");
let result = document.getElementById("result");

// メールアドレス入力欄のフォーカスイベント
emailInput.addEventListener("focus", function() {
  emailInput.style.backgroundColor = "lightyellow";
});

emailInput.addEventListener("blur", function() {
  emailInput.style.backgroundColor = "white";
});

// パスワード入力欄のinputイベント
passwordInput.addEventListener("input", function() {
  let password = passwordInput.value;
  if (password.length < 6) {
    passwordError.textContent = "6文字以上入力してください";
  } else {
    passwordError.textContent = "";
  }
});

// フォーム送信イベント
registerForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // エラーメッセージと結果をリセット
  emailError.textContent = "";
  result.textContent = "";

  let email = emailInput.value;
  let password = passwordInput.value;

  // メールアドレスのバリデーション
  if (!email.includes("@")) {
    emailError.textContent = "正しいメールアドレスを入力してください";
    return;
  }

  // すべてのチェックをクリア
  result.textContent = "登録が完了しました";
  registerForm.reset();
});
