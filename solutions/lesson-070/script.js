let myForm = document.getElementById("myForm");
let urlInput = document.getElementById("urlInput");
let result = document.getElementById("result");

myForm.addEventListener("submit", function(event) {
  event.preventDefault();

  let url = urlInput.value;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    result.textContent = "正しいURLです: " + url;
    result.style.color = "";
  } else {
    result.textContent = "URLはhttpまたはhttpsで始まる必要があります";
    result.style.color = "red";
  }
});
