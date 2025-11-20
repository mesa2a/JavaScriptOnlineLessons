// エラーメッセージを表示する関数
function showError(message) {
  let result = document.getElementById("result");
  result.textContent = message;
  result.style.color = "red";
}

// 成功メッセージを表示する関数
function showSuccess(message) {
  let result = document.getElementById("result");
  result.textContent = message;
  result.style.color = "green";
}

function checkInput() {
  let name = document.getElementById("nameInput").value;
  let age = document.getElementById("ageInput").value;
  let email = document.getElementById("emailInput").value;

  // 早期リターンで各検証を実行
  if (name === "") {
    showError("名前を入力してください");
    return;
  }

  if (age === "") {
    showError("年齢を入力してください");
    return;
  }

  if (Number(age) < 18) {
    showError("18歳以上である必要があります");
    return;
  }

  if (email === "") {
    showError("メールアドレスを入力してください");
    return;
  }

  if (!email.includes("@")) {
    showError("有効なメールアドレスを入力してください");
    return;
  }

  // すべての検証を通過
  showSuccess("登録成功！");
}
