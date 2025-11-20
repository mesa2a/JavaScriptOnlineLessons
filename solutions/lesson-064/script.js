// 要素を取得
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let result = document.getElementById("result");

// ボタン1の処理
function handleButton1() {
  result.textContent = "ボタン1がクリックされました";
}

// ボタン2の処理
function handleButton2() {
  result.textContent = "ボタン2がクリックされました";
}

// ボタン3の処理
function handleButton3() {
  result.textContent = "ボタン3がクリックされました";
}

// イベントリスナーを登録
button1.addEventListener("click", handleButton1);
button2.addEventListener("click", handleButton2);
button3.addEventListener("click", handleButton3);
