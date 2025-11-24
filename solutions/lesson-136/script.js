let student = {
  name: "田中",
  age: 18,
  city: "大阪"
};

let display = document.getElementById("display");
let updateName = document.getElementById("updateName");
let addEmail = document.getElementById("addEmail");
let deleteCity = document.getElementById("deleteCity");

// studentオブジェクトを表示する関数
function displayStudent() {
  display.innerHTML = "";

  for (let key in student) {
    let propertyDiv = document.createElement("div");
    propertyDiv.className = "property";
    propertyDiv.textContent = key + ": " + student[key];
    display.appendChild(propertyDiv);
  }
}

// 初期表示
displayStudent();

// 名前を変更
updateName.addEventListener("click", function() {
  student.name = "鈴木";
  displayStudent();
});

// メールを追加
addEmail.addEventListener("click", function() {
  student.email = "suzuki@example.com";
  displayStudent();
});

// 都市を削除
deleteCity.addEventListener("click", function() {
  delete student.city;
  displayStudent();
});
