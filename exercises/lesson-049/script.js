// ここに diagnose 関数を定義してください
//
// 以下の手順で実装してください:
// 1. 3つのチェックボックスの状態を取得する
// 2. 条件分岐で性格タイプを判定する:
//    - 3つすべて真: "リーダータイプ"
//    - 外向的 かつ 冒険好き: "冒険家タイプ"
//    - 計画的 かつ 外向的でない: "思索家タイプ"
//    - 外向的: "社交家タイプ"
//    - その他: "平和主義者タイプ"
// 3. タイプ名と特徴を表示する
//
// ヒント:
// const isOutgoing = document.getElementById("isOutgoing").checked;
// const isPlanner = document.getElementById("isPlanner").checked;
// const isAdventurous = document.getElementById("isAdventurous").checked;
//
// if (isOutgoing && isPlanner && isAdventurous) {
//   type = "リーダータイプ";
//   description = "行動力があり、計画的に物事を進められます。";
// } else if (isOutgoing && isAdventurous) {
//   ...
// }
//
// result.textContent = "あなたは【" + type + "】です\n" + description;
