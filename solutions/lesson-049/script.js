function diagnose() {
  const isOutgoing = document.getElementById("isOutgoing").checked;
  const isPlanner = document.getElementById("isPlanner").checked;
  const isAdventurous = document.getElementById("isAdventurous").checked;
  const result = document.getElementById("result");

  let type = "";
  let description = "";

  // 複雑な条件分岐で性格タイプを判定
  if (isOutgoing && isPlanner && isAdventurous) {
    type = "リーダータイプ";
    description = "行動力があり、計画的に物事を進められます。";
  } else if (isOutgoing && isAdventurous) {
    type = "冒険家タイプ";
    description = "新しいことに挑戦する勇気があります。";
  } else if (isPlanner && !isOutgoing) {
    type = "思索家タイプ";
    description = "じっくり考えて行動する慎重派です。";
  } else if (isOutgoing) {
    type = "社交家タイプ";
    description = "人と関わることが得意です。";
  } else {
    type = "平和主義者タイプ";
    description = "穏やかで調和を大切にします。";
  }

  result.textContent = "あなたは【" + type + "】です\n" + description;
}
