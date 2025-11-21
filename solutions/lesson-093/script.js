let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");
let result = document.getElementById("result");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// 検索処理
searchButton.addEventListener("click", function() {
  let target = searchInput.value;

  if (!target) {
    result.textContent = "検索するフルーツを入力してください";
    return;
  }

  // indexOf()で検索
  let index = fruits.indexOf(target);

  if (index !== -1) {
    result.textContent = "「" + target + "」はインデックス " + index + " で見つかりました！";
  } else {
    result.textContent = "「" + target + "」は見つかりませんでした";
  }
});
