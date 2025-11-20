let outer = document.getElementById("outer");
let middle = document.getElementById("middle");
let inner = document.getElementById("inner");
let log = document.getElementById("log");

outer.addEventListener("click", function() {
  if (log.textContent === "") {
    log.textContent = "outer";
  } else {
    log.textContent = log.textContent + ", outer";
  }
});

middle.addEventListener("click", function() {
  if (log.textContent === "") {
    log.textContent = "middle";
  } else {
    log.textContent = log.textContent + ", middle";
  }
});

inner.addEventListener("click", function() {
  log.textContent = "";
  log.textContent = "inner";
});
