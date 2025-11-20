function testValue() {
  let input = document.getElementById("valueInput").value;
  let testValue;

  // 入力値を適切な型に変換
  if (input === "") {
    testValue = "";
  } else if (input === "0") {
    testValue = 0;
  } else if (input === "null") {
    testValue = null;
  } else if (input === "undefined") {
    testValue = undefined;
  } else if (input === "NaN") {
    testValue = NaN;
  } else if (input === "false") {
    testValue = false;
  } else if (input === "true") {
    testValue = true;
  } else {
    testValue = input;
  }

  // 真偽判定
  if (testValue) {
    document.getElementById("result").textContent = "結果: Truthy（真として扱われる）";
    document.getElementById("result").style.color = "green";
  } else {
    document.getElementById("result").textContent = "結果: Falsy（偽として扱われる）";
    document.getElementById("result").style.color = "red";
  }

  // 詳細情報
  document.getElementById("detail").textContent = "型: " + typeof testValue + ", 値: " + testValue;
}
