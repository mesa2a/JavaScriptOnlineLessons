function checkAccess() {
  let password = "abc123";
  let age = 20;

  if (password === "abc123") {
    if (age >= 18) {
      const elem = document.getElementById("result");
      elem.textContent = "アクセス許可";
    } else {
      const elem = document.getElementById("result");
      elem.textContent = "年齢が足りません";
    }
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "パスワードが違います";
  }
}
