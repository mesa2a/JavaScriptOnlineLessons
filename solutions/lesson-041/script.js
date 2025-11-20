function usePrompt() {
  const name = prompt("あなたの名前は？");
  const elem = document.getElementById("result");
  elem.textContent = "こんにちは、" + name + "さん";
}

function useInput() {
  const name = document.getElementById("name").value;
  const elem = document.getElementById("result");
  elem.textContent = "こんにちは、" + name + "さん";
}
