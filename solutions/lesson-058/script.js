let isLightOn = false;

function toggleLight() {
  // 状態を反転
  isLightOn = !isLightOn;

  // 状態に応じて表示を更新
  if (isLightOn) {
    document.getElementById("status").textContent = "ライトON";
    document.getElementById("light").style.backgroundColor = "yellow";
  } else {
    document.getElementById("status").textContent = "ライトOFF";
    document.getElementById("light").style.backgroundColor = "gray";
  }
}

// 初期状態を表示
toggleLight();
toggleLight();
