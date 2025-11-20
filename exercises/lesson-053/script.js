// ここに checkAnswer 関数を定義してください
//
// 以下の手順で実装してください:
// 1. 答えを取得する
// 2. 結果とエラーをクリアする
// 3. 空文字チェック:
//    - 空の場合: エラーメッセージを表示してreturn
// 4. 答えをチェック:
//    - 正解は「東京」(大文字・小文字は区別しない)
//    - 正解の場合: "○ 正解です！" を表示
//    - 不正解の場合: "× 不正解です。正解は「東京」です。" を表示
//
// ヒント:
// const answer = document.getElementById("answer").value;
// const result = document.getElementById("result");
// const error = document.getElementById("error");
//
// if (answer === "") {
//   error.textContent = "答えを入力してください";
//   return;
// }
//
// // toLowerCase() で小文字に変換して比較
// if (answer.toLowerCase() === "東京" || answer.toLowerCase() === "tokyo") {
//   result.textContent = "○ 正解です！";
// } else {
//   result.textContent = "× 不正解です。正解は「東京」です。";
// }
