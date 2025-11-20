function showFullName() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const result = document.getElementById("result1");
  result.textContent = lastName + " " + firstName;
}

function showProfile() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;
  const result = document.getElementById("result2");
  result.textContent = lastName + " " + firstName + "さんは" + age + "歳で、" + city + "市に住んでいます";
}
