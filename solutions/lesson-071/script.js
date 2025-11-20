let box = document.getElementById("box");
let clickCount = document.getElementById("clickCount");
let hoverStatus = document.getElementById("hoverStatus");
let enableClick = document.getElementById("enableClick");
let disableClick = document.getElementById("disableClick");

let count = 0;

// クリックイベントのハンドラ（名前付き関数）
function handleBoxClick() {
  count = count + 1;
  clickCount.textContent = "クリック回数: " + count;
}

// マウスオーバーのハンドラ
function handleMouseOver() {
  hoverStatus.textContent = "ステータス: マウスオーバー中";
}

// マウスアウトのハンドラ
function handleMouseOut() {
  hoverStatus.textContent = "ステータス: マウスアウト";
}

// 初期設定：すべてのイベントを有効化
box.addEventListener("click", handleBoxClick);
box.addEventListener("mouseover", handleMouseOver);
box.addEventListener("mouseout", handleMouseOut);

// クリックイベントを有効化するボタン
enableClick.addEventListener("click", function() {
  box.addEventListener("click", handleBoxClick);
});

// クリックイベントを無効化するボタン
disableClick.addEventListener("click", function() {
  box.removeEventListener("click", handleBoxClick);
});
