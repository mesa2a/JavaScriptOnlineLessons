// 要素の取得
let startButton = document.getElementById("start");
let wordDisplay = document.getElementById("word");
let userInput = document.getElementById("userInput");
let timeDisplay = document.getElementById("time");
let scoreDisplay = document.getElementById("score");

// ゲームの状態
let isPlaying = false;
let score = 0;
let timeLeft = 30;
let currentWord = "";
let timer = null;

// 単語リスト
let words = ["apple", "banana", "orange", "grape", "melon",
             "peach", "lemon", "mango", "cherry", "berry"];

// ランダムな単語を選ぶ
function getRandomWord() {
  let randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// 新しい単語を表示
function showNewWord() {
  currentWord = getRandomWord();
  wordDisplay.textContent = currentWord;
}

// タイマー開始
function startTimer() {
  timer = setInterval(function() {
    timeLeft = timeLeft - 1;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// ゲーム開始
function startGame() {
  if (isPlaying) {
    return;  // すでにプレイ中なら何もしない
  }

  // 初期化
  isPlaying = true;
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;

  // 入力欄を有効化
  userInput.disabled = false;
  userInput.value = "";
  userInput.focus();

  // 最初の単語を表示
  showNewWord();

  // タイマー開始
  startTimer();
}

// ゲーム終了
function endGame() {
  isPlaying = false;
  clearInterval(timer);

  // 入力欄を無効化
  userInput.disabled = true;

  // 結果表示
  wordDisplay.textContent = "ゲーム終了! スコア: " + score;
}

// 入力チェック
function checkInput() {
  if (!isPlaying) {
    return;
  }

  let answer = userInput.value;

  if (answer === currentWord) {
    // 正解
    score = score + 1;
    scoreDisplay.textContent = score;

    // 入力欄をクリア
    userInput.value = "";

    // 次の単語を表示
    showNewWord();
  }
}

// イベントリスナー
startButton.addEventListener("click", startGame);

// Enterキーで判定
userInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    checkInput();
  }
});
