function checkReady() {
  const ok = confirm("準備はできていますか？");
  const elem = document.getElementById("result1");
  elem.textContent = "準備: " + ok;
}

function checkContinue() {
  const ok = confirm("続けますか？");
  const elem = document.getElementById("result2");
  elem.textContent = "続行: " + ok;
}

function checkAgree() {
  const ok = confirm("同意しますか？");
  const elem = document.getElementById("result3");
  elem.textContent = "同意: " + ok;
}
