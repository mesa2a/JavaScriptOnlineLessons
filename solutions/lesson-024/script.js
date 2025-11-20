let count = 0;

function setRed() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "red";
  const counter = document.getElementById("counter");
  counter.textContent = count;
}

function setBlue() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "blue";
  const counter = document.getElementById("counter");
  counter.textContent = count;
}

function setGreen() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "green";
  const counter = document.getElementById("counter");
  counter.textContent = count;
}

function resetCounter() {
  count = 0;
  const display = document.getElementById("display");
  display.style.backgroundColor = "white";
  const counter = document.getElementById("counter");
  counter.textContent = 0;
}
