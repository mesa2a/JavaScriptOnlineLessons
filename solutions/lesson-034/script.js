function checkAge() {
  let age = 25;

  if (age > 18) {
    const elem = document.getElementById("result");
    elem.textContent = "大人です";
  }
}
