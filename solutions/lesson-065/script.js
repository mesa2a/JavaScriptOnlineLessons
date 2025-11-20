let box = document.getElementById("box");
let status = document.getElementById("status");

// マウスが乗った時
box.addEventListener("mouseover", function() {
  box.style.backgroundColor = "lightcoral";
  status.textContent = "マウスがボックスの上にあります";
});

// マウスが離れた時
box.addEventListener("mouseout", function() {
  box.style.backgroundColor = "lightblue";
  status.textContent = "";
});

// マウスボタンを押した時
box.addEventListener("mousedown", function() {
  box.style.transform = "scale(0.9)";
  status.textContent = "ボックスが押されています";
});

// マウスボタンを離した時
box.addEventListener("mouseup", function() {
  box.style.transform = "scale(1)";
  status.textContent = "マウスがボックスの上にあります";
});
