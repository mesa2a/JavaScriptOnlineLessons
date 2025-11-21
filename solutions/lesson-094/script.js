let sumButton = document.getElementById("calcSum");
let averageButton = document.getElementById("calcAverage");
let maxButton = document.getElementById("calcMax");
let minButton = document.getElementById("calcMin");
let allButton = document.getElementById("calcAll");
let result = document.getElementById("result");

// テストの点数
let scores = [85, 92, 78, 95, 88];

// 合計を計算
sumButton.addEventListener("click", function() {
  let total = 0;

  for (let score of scores) {
    total = total + score;
  }

  result.textContent = "合計: " + total + "点";
});

// 平均を計算
averageButton.addEventListener("click", function() {
  let total = 0;

  for (let score of scores) {
    total = total + score;
  }

  let average = total / scores.length;
  let rounded = Math.round(average * 10) / 10;

  result.textContent = "平均: " + rounded + "点";
});

// 最大値を検索
maxButton.addEventListener("click", function() {
  let max = scores[0];

  for (let score of scores) {
    if (score > max) {
      max = score;
    }
  }

  result.textContent = "最高点: " + max + "点";
});

// 最小値を検索
minButton.addEventListener("click", function() {
  let min = scores[0];

  for (let score of scores) {
    if (score < min) {
      min = score;
    }
  }

  result.textContent = "最低点: " + min + "点";
});

// すべて計算
allButton.addEventListener("click", function() {
  let total = 0;
  let max = scores[0];
  let min = scores[0];

  for (let score of scores) {
    total = total + score;

    if (score > max) {
      max = score;
    }

    if (score < min) {
      min = score;
    }
  }

  let average = Math.round((total / scores.length) * 10) / 10;

  result.innerHTML = "";
  result.innerHTML += "<p>合計: " + total + "点</p>";
  result.innerHTML += "<p>平均: " + average + "点</p>";
  result.innerHTML += "<p>最高点: " + max + "点</p>";
  result.innerHTML += "<p>最低点: " + min + "点</p>";
  result.innerHTML += "<p>テスト数: " + scores.length + "回</p>";
});
