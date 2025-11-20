let count = 0;

function addCount() {
  count++;
  const elem = document.getElementById("counter");
  elem.textContent = count;
}

function resetCount() {
  count = 0;
  const elem = document.getElementById("counter");
  elem.textContent = count;
}
