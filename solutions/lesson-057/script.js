function validateForm() {
  // 入力値を取得
  let name = document.getElementById("nameInput").value;
  let age = document.getElementById("ageInput").value;
  let email = document.getElementById("emailInput").value;

  // ガード節：名前のチェック
  if (name === "") {
    document.getElementById("result").textContent = "名前を入力してください";
    return;
  }

  // ガード節：年齢のチェック
  if (age === "") {
    document.getElementById("result").textContent = "年齢を入力してください";
    return;
  }

  let ageNumber = Number(age);
  if (ageNumber < 18) {
    document.getElementById("result").textContent = "18歳以上である必要があります";
    return;
  }

  // ガード節：メールアドレスのチェック
  if (email === "") {
    document.getElementById("result").textContent = "メールアドレスを入力してください";
    return;
  }

  if (!email.includes("@")) {
    document.getElementById("result").textContent = "有効なメールアドレスを入力してください";
    return;
  }

  // すべてのチェックを通過した場合
  document.getElementById("result").textContent = "登録成功！";
}
