// ここに validateRegistration 関数を定義してください
//
// 以下の手順で実装してください:
// 1. ユーザー名、パスワード、年齢を取得する
// 2. 結果とエラーをクリアする
// 3. ユーザー名を検証:
//    - 空文字の場合: エラーメッセージを表示してreturn
//    - 3文字未満の場合: エラーメッセージを表示してreturn
//    - 15文字より大きい場合: エラーメッセージを表示してreturn
// 4. パスワードを検証:
//    - 空文字の場合: エラーメッセージを表示してreturn
//    - 6文字未満の場合: エラーメッセージを表示してreturn
// 5. 年齢を検証:
//    - 数値でない場合: エラーメッセージを表示してreturn
//    - 13歳未満の場合: エラーメッセージを表示してreturn
// 6. すべて正しければ: "登録できます" を表示
//
// ヒント:
// const username = document.getElementById("username").value;
// const password = document.getElementById("password").value;
// const ageValue = document.getElementById("age").value;
// const age = Number(ageValue);
//
// if (username === "") {
//   error.textContent = "ユーザー名を入力してください";
//   return;
// }
//
// if (username.length < 3) { ... }
