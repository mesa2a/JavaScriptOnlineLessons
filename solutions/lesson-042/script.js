function validate() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message");

  if (name === "") {
    message.textContent = "名前を入力してください";
  } else if (name.length < 3) {
    message.textContent = "3文字以上入力してください";
  } else if (name.length > 10) {
    message.textContent = "10文字以内で入力してください";
  } else {
    message.textContent = "OK";
  }
}
