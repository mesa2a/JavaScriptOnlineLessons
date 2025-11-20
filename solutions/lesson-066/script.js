let box = document.getElementById("box");
let message = document.getElementById("message");
let topPosition = 100;
let leftPosition = 100;

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp") {
    topPosition = topPosition - 10;
    box.style.top = topPosition + "px";
    message.textContent = "ArrowUpキーが押されました";
  } else if (event.key === "ArrowDown") {
    topPosition = topPosition + 10;
    box.style.top = topPosition + "px";
    message.textContent = "ArrowDownキーが押されました";
  } else if (event.key === "ArrowLeft") {
    leftPosition = leftPosition - 10;
    box.style.left = leftPosition + "px";
    message.textContent = "ArrowLeftキーが押されました";
  } else if (event.key === "ArrowRight") {
    leftPosition = leftPosition + 10;
    box.style.left = leftPosition + "px";
    message.textContent = "ArrowRightキーが押されました";
  } else if (event.key === "Enter") {
    box.style.backgroundColor = "blue";
    message.textContent = "Enterキーが押されました";
  } else if (event.key === "Escape") {
    topPosition = 100;
    leftPosition = 100;
    box.style.top = topPosition + "px";
    box.style.left = leftPosition + "px";
    message.textContent = "Escapeキーが押されました";
  }
});
