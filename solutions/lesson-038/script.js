function checkGrade() {
  let score = 85;

  if (score >= 90) {
    const elem = document.getElementById("result");
    elem.textContent = "優秀です";
  } else if (score >= 80) {
    const elem = document.getElementById("result");
    elem.textContent = "良好です";
  } else if (score >= 60) {
    const elem = document.getElementById("result");
    elem.textContent = "合格です";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "不合格です";
  }
}
