// 並列配列でデータを管理
let studentNames = [];
let studentScores = [];

let nameInput = document.getElementById("nameInput");
let scoreInput = document.getElementById("scoreInput");
let addButton = document.getElementById("addButton");
let studentList = document.getElementById("studentList");

addButton.addEventListener("click", function() {
  let name = nameInput.value.trim();
  let score = parseInt(scoreInput.value);

  if (name === "") {
    alert("学生名を入力してください");
    return;
  }

  if (isNaN(score) || score < 0 || score > 100) {
    alert("点数は0〜100の数値で入力してください");
    return;
  }

  // 両方の配列に追加
  studentNames.push(name);
  studentScores.push(score);

  nameInput.value = "";
  scoreInput.value = "";
  nameInput.focus();

  showStudents();
});

nameInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") scoreInput.focus();
});

scoreInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") addButton.click();
});

function showStudents() {
  studentList.replaceChildren();

  if (studentNames.length === 0) {
    let empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "まだ学生が登録されていません";
    studentList.appendChild(empty);
    return;
  }

  for (let i = 0; i < studentNames.length; i++) {
    let item = document.createElement("div");
    item.className = "student-item";

    let info = document.createElement("div");
    info.className = "student-info";

    let name = document.createElement("div");
    name.className = "student-name";
    name.textContent = studentNames[i];

    let score = document.createElement("div");
    score.className = "student-score";
    score.textContent = studentScores[i] + "点";

    info.appendChild(name);
    info.appendChild(score);

    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function() {
      let confirmed = confirm("「" + studentNames[i] + "」を削除しますか？");
      if (confirmed) {
        // 両方の配列から削除
        studentNames.splice(i, 1);
        studentScores.splice(i, 1);
        showStudents();
      }
    });

    item.appendChild(info);
    item.appendChild(deleteButton);
    studentList.appendChild(item);
  }
}

showStudents();
nameInput.focus();
