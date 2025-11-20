// ここに createProfile 関数を定義してください
//
// 以下の手順で実装してください:
// 1. 名前と年齢の値を取得する
// 2. 結果とエラーをクリアする
// 3. 名前のバリデーション:
//    - 空文字の場合: エラーメッセージを表示してreturn
//    - 2文字未満の場合: エラーメッセージを表示してreturn
// 4. 年齢のバリデーション:
//    - 空文字の場合: エラーメッセージを表示してreturn
//    - 数値でない場合(isNaN): エラーメッセージを表示してreturn
//    - 0未満または150より大きい場合: エラーメッセージを表示してreturn
// 5. プロフィールを作成:
//    - 名前と年齢を表示
//    - 年齢グループを判定して表示:
//      - 18歳未満: "未成年"
//      - 18歳以上65歳未満: "成人"
//      - 65歳以上: "シニア"
//
// ヒント:
// const name = document.getElementById("name").value;
// const ageValue = document.getElementById("age").value;
// const age = Number(ageValue);
// if (isNaN(age)) { ... }
// if (age < 18) { ... } else if (age < 65) { ... } else { ... }
