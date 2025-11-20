// ここに checkReservation 関数を定義してください
//
// 以下の手順で実装してください:
// 1. 平日か、会員か、人数を取得する
// 2. 結果とエラーをクリアする
// 3. 人数が数値かチェック(isNaN)
//    - 数値でない場合: エラーメッセージを表示してreturn
// 4. 予約条件をチェック:
//    - (isWeekday || isMember) && partySize <= 4
// 5. 予約できる場合: "予約できます" を表示
// 6. 予約できない場合: "予約できません" を表示
//
// ヒント:
// const isWeekday = document.getElementById("isWeekday").checked;
// const isMember = document.getElementById("isMember").checked;
// const partySizeValue = document.getElementById("partySize").value;
// const partySize = Number(partySizeValue);
// if ((isWeekday || isMember) && partySize <= 4) { ... }
