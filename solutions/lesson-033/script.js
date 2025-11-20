function checkAge() {
  let age = 25;

  if (age >= 20) {
    const elem = document.getElementById("result");
    elem.textContent = "成人です";
  }
}
