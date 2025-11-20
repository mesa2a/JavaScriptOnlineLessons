function validateRegistration() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const ageValue = document.getElementById("age").value;
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  // 結果とエラーをクリア
  result.textContent = "";
  error.textContent = "";

  // ユーザー名の検証
  if (username === "") {
    error.textContent = "ユーザー名を入力してください";
    return;
  }

  if (username.length < 3) {
    error.textContent = "ユーザー名は3文字以上入力してください";
    return;
  }

  if (username.length > 15) {
    error.textContent = "ユーザー名は15文字以内で入力してください";
    return;
  }

  // パスワードの検証
  if (password === "") {
    error.textContent = "パスワードを入力してください";
    return;
  }

  if (password.length < 6) {
    error.textContent = "パスワードは6文字以上入力してください";
    return;
  }

  // 年齢の検証
  const age = Number(ageValue);

  if (isNaN(age)) {
    error.textContent = "年齢は数値で入力してください";
    return;
  }

  if (age < 13) {
    error.textContent = "13歳以上から登録できます";
    return;
  }

  // すべての検証を通過
  result.textContent = "登録できます";
}
