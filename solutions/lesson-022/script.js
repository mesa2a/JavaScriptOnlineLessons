function updateTitle() {
  const elem = document.getElementById("title");
  elem.textContent = "新しいタイトル";
  elem.style.color = "blue";
  elem.style.fontSize = "24px";
}

function updateDescription() {
  const elem = document.getElementById("description");
  elem.textContent = "新しい説明文";
  elem.style.backgroundColor = "yellow";
}

function updateStatus() {
  const elem = document.getElementById("status");
  elem.textContent = "実行中";
  elem.style.color = "green";
}
