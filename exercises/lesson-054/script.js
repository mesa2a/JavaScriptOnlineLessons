// ここに play 関数を定義してください
//
// 以下の手順で実装してください:
// 1. プレイヤーの手を取得する
// 2. コンピュータの手は「グー」で固定
// 3. 結果とエラーをクリアする
// 4. 入力検証:
//    - 「グー」「チョキ」「パー」のいずれでもない場合: エラーメッセージを表示してreturn
// 5. 勝敗判定:
//    - あいこ(同じ手): "あいこです" を表示
//    - プレイヤーの勝ち: "あなたの勝ちです！" を表示
//      - グー vs チョキ
//      - チョキ vs パー
//      - パー vs グー
//    - それ以外(コンピュータの勝ち): "コンピュータの勝ちです" を表示
//
// ヒント:
// const playerHand = document.getElementById("playerHand").value;
// const computerHand = "グー";
//
// if (playerHand !== "グー" && playerHand !== "チョキ" && playerHand !== "パー") {
//   error.textContent = "「グー」「チョキ」「パー」のいずれかを入力してください";
//   return;
// }
//
// if (playerHand === computerHand) {
//   result.textContent = "あいこです";
// } else if (
//   (playerHand === "グー" && computerHand === "チョキ") ||
//   (playerHand === "チョキ" && computerHand === "パー") ||
//   (playerHand === "パー" && computerHand === "グー")
// ) {
//   result.textContent = "あなたの勝ちです！";
// } else {
//   result.textContent = "コンピュータの勝ちです";
// }
