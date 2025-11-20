function createProfile() {
  const name = document.getElementById("name").value;
  const ageValue = document.getElementById("age").value;
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  // 結果とエラーをクリア
  result.textContent = "";
  error.textContent = "";

  // 名前のバリデーション
  if (name === "") {
    error.textContent = "名前を入力してください";
    return;
  }

  if (name.length < 2) {
    error.textContent = "名前は2文字以上入力してください";
    return;
  }

  // 年齢のバリデーション
  if (ageValue === "") {
    error.textContent = "年齢を入力してください";
    return;
  }

  const age = Number(ageValue);

  if (isNaN(age)) {
    error.textContent = "年齢は数値で入力してください";
    return;
  }

  if (age < 0 || age > 150) {
    error.textContent = "年齢は0〜150の範囲で入力してください";
    return;
  }

  // プロフィール作成
  let profile = "名前: " + name + "\n";
  profile = profile + "年齢: " + age + "歳\n";

  // 年齢グループの判定
  if (age < 18) {
    profile = profile + "グループ: 未成年";
  } else if (age < 65) {
    profile = profile + "グループ: 成人";
  } else {
    profile = profile + "グループ: シニア";
  }

  result.textContent = profile;
}
