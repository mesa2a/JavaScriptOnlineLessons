// ここに checkBusinessHours 関数を定義してください
//
// 以下の手順で実装してください:
// 1. 時刻と土日かを取得する
// 2. 結果とエラーをクリアする
// 3. 時刻が数値かチェック(isNaN)
//    - 数値でない場合: エラーメッセージを表示してreturn
// 4. 営業時間をチェック:
//    - 平日の場合: 9 <= hour < 18 で「営業中です」
//    - 土日の場合: 10 <= hour < 20 で「営業中です」
//    - それ以外: 「営業時間外です」
//
// ヒント:
// const hourValue = document.getElementById("hour").value;
// const hour = Number(hourValue);
// const isWeekend = document.getElementById("isWeekend").checked;
//
// if (isWeekend) {
//   if (hour >= 10 && hour < 20) { ... }
// } else {
//   if (hour >= 9 && hour < 18) { ... }
// }
