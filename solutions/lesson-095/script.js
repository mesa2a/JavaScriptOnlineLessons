let current = 0;
let history = [];

let currentSpan = document.getElementById("current");
let incrementButton = document.getElementById("incrementButton");
let saveButton = document.getElementById("saveButton");
let averageSpan = document.getElementById("average");
let historyList = document.getElementById("historyList");

incrementButton.addEventListener("click", function() {
  current = current + 1;
  currentSpan.textContent = current;
});

saveButton.addEventListener("click", function() {
  // 現在の値を履歴に保存（数値は自動的にコピーされる）
  history.push(current);

  // 平均を計算
  let total = 0;
  for (let value of history) {
    total = total + value;
  }
  let average = total / history.length;
  let rounded = Math.round(average * 10) / 10;
  averageSpan.textContent = rounded;

  // 履歴を表示
  showHistory();
});

function showHistory() {
  if (history.length === 0) {
    historyList.innerHTML = "<p>（履歴なし）</p>";
    return;
  }

  let html = "<ul>";
  for (let i = 0; i < history.length; i++) {
    html += "<li>" + (i + 1) + "回目: " + history[i] + "</li>";
  }
  html += "</ul>";
  historyList.innerHTML = html;
}

showHistory();
