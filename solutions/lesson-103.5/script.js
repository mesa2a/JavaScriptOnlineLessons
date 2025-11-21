// 5×5の2次元配列でビンゴカードを管理
let bingoCard = [];

// マークされたセルを管理する2次元配列
let marked = [];

let bingoCardDiv = document.getElementById("bingoCard");
let newCardButton = document.getElementById("newCardButton");

// 新しいカードを作成
newCardButton.addEventListener("click", function() {
  createNewCard();
});

// 新しいビンゴカードを作成
function createNewCard() {
  // 1〜75の数字を作成
  let numbers = [];
  for (let i = 1; i <= 75; i++) {
    numbers.push(i);
  }

  // シャッフル（ランダムに並べ替え）
  shuffleArray(numbers);

  // 5×5の2次元配列を作成
  bingoCard = [];
  marked = [];
  let index = 0;

  for (let i = 0; i < 5; i++) {
    bingoCard[i] = [];
    marked[i] = [];

    for (let j = 0; j < 5; j++) {
      // 中央のマスはFREE
      if (i === 2 && j === 2) {
        bingoCard[i][j] = "FREE";
        marked[i][j] = true;
      } else {
        bingoCard[i][j] = numbers[index];
        marked[i][j] = false;
        index++;
      }
    }
  }

  showCard();
}

// 配列をシャッフル（Fisher-Yatesアルゴリズム）
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// ビンゴカードを表示
function showCard() {
  bingoCardDiv.replaceChildren();

  for (let i = 0; i < bingoCard.length; i++) {
    for (let j = 0; j < bingoCard[i].length; j++) {
      let cell = document.createElement("div");
      cell.className = "bingo-cell";

      // FREEマスの場合
      if (bingoCard[i][j] === "FREE") {
        cell.classList.add("free");
        cell.textContent = "FREE";
      } else {
        cell.textContent = bingoCard[i][j];

        // マーク済みの場合
        if (marked[i][j]) {
          cell.classList.add("marked");
        }

        // クリックでマーク/マーク解除
        let row = i;
        let col = j;
        cell.addEventListener("click", function() {
          marked[row][col] = !marked[row][col];
          showCard();
        });
      }

      bingoCardDiv.appendChild(cell);
    }
  }
}

// 初期表示
createNewCard();
