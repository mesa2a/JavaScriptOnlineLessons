let startGame = document.getElementById("startGame");
let result = document.getElementById("result");

startGame.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  let items = ["鍵", "本", "リンゴ", "懐中電灯", "地図"];
  let correctItem = "鍵";
  let attempts = 0;
  let maxAttempts = 5;
  let escaped = false;

  // アイテムリストを表示
  result.innerHTML = "<p>アイテム: " + items.join(", ") + "</p>";

  // ゲームループ
  while (attempts < maxAttempts) {
    let choice = prompt("どのアイテムを使いますか？");
    attempts++;

    // キャンセルされた場合
    if (choice === null) {
      result.innerHTML += "<p>ゲームをキャンセルしました。</p>";
      break;
    }

    // 正解の場合
    if (choice === correctItem) {
      result.innerHTML += "<p>正解！「" + choice + "」で扉が開きました。脱出成功！</p>";
      escaped = true;
      break;  // ループを抜ける
    }

    // 不正解の場合
    let remaining = maxAttempts - attempts;
    if (remaining > 0) {
      result.innerHTML += "<p>「" + choice + "」では扉が開きません。残り" + remaining + "回</p>";
    }
  }

  // 試行回数を使い切った場合
  if (!escaped && attempts >= maxAttempts) {
    result.innerHTML += "<p>残念！チャンスを使い切りました。正解は「" + correctItem + "」でした。</p>";
  }
});
