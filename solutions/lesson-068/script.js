let eventType = document.getElementById("eventType");
let targetId = document.getElementById("targetId");
let buttonText = document.getElementById("buttonText");

let buttons = document.querySelectorAll("button");

buttons.forEach(function(button) {
  button.addEventListener("click", function(event) {
    eventType.textContent = event.type;
    targetId.textContent = event.target.id;
    buttonText.textContent = event.target.textContent;
  });
});
