function askQuestion1() {
  const answer = prompt("好きな食べ物は？");
  const elem = document.getElementById("result1");
  elem.textContent = "好きな食べ物: " + answer;
}

function askQuestion2() {
  const answer = prompt("好きな色は？");
  const elem = document.getElementById("result2");
  elem.textContent = "好きな色: " + answer;
}

function askQuestion3() {
  const answer = prompt("好きな動物は？");
  const elem = document.getElementById("result3");
  elem.textContent = "好きな動物: " + answer;
}
