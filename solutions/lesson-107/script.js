// 並列配列でデータを管理
let gradeIds = [];
let gradeNames = [];
let gradeSubjects = [];
let gradeScores = [];
let nextId = 1;
let sortMode = "none";  // "none", "score", "name"

let nameInput = document.getElementById("nameInput");
let subjectInput = document.getElementById("subjectInput");
let scoreInput = document.getElementById("scoreInput");
let addButton = document.getElementById("addButton");
let gradeList = document.getElementById("gradeList");

let sortNoneButton = document.getElementById("sortNoneButton");
let sortScoreButton = document.getElementById("sortScoreButton");
let sortNameButton = document.getElementById("sortNameButton");

// 成績を追加
addButton.addEventListener("click", function() {
  addGrade();
});

// Enterキーで追加
nameInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addGrade();
  }
});

subjectInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addGrade();
  }
});

scoreInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addGrade();
  }
});

// ソートボタン
sortNoneButton.addEventListener("click", function() {
  sortMode = "none";
  showGrades();
});

sortScoreButton.addEventListener("click", function() {
  sortMode = "score";
  showGrades();
});

sortNameButton.addEventListener("click", function() {
  sortMode = "name";
  showGrades();
});

// 成績を追加
function addGrade() {
  let name = nameInput.value.trim();
  let subject = subjectInput.value.trim();
  let score = parseInt(scoreInput.value);

  if (name === "") {
    alert("生徒名を入力してください");
    return;
  }

  if (subject === "") {
    alert("科目を入力してください");
    return;
  }

  if (isNaN(score) || score < 0 || score > 100) {
    alert("点数は0〜100の数値で入力してください");
    return;
  }

  gradeIds.push(nextId);
  gradeNames.push(name);
  gradeSubjects.push(subject);
  gradeScores.push(score);

  nextId++;
  nameInput.value = "";
  subjectInput.value = "";
  scoreInput.value = "";
  nameInput.focus();
  showGrades();
}

// 成績を表示
function showGrades() {
  // インデックス配列を作成
  let indices = [];
  for (let i = 0; i < gradeNames.length; i++) {
    indices.push(i);
  }

  // ソートモードに応じてソート
  if (sortMode === "score") {
    // 点数順（高い順）
    indices.sort(function(a, b) {
      return gradeScores[b] - gradeScores[a];
    });
  } else if (sortMode === "name") {
    // 名前順
    indices.sort(function(a, b) {
      return gradeNames[a].localeCompare(gradeNames[b]);
    });
  }

  // 表示
  gradeList.replaceChildren();

  if (indices.length === 0) {
    let message = document.createElement("div");
    message.className = "empty-message";
    message.textContent = "成績がありません";
    gradeList.appendChild(message);
  } else {
    for (let i = 0; i < indices.length; i++) {
      let index = indices[i];

      let item = document.createElement("div");
      item.className = "grade-item";

      // 生徒名
      let name = document.createElement("span");
      name.className = "grade-name";
      name.textContent = gradeNames[index];

      // 科目
      let subject = document.createElement("span");
      subject.className = "grade-subject";
      subject.textContent = gradeSubjects[index];

      // 点数
      let score = document.createElement("span");
      score.className = "grade-score";
      score.textContent = gradeScores[index] + "点";

      // 削除ボタン
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "削除";
      deleteButton.className = "delete-button";

      deleteButton.addEventListener("click", function() {
        gradeIds.splice(index, 1);
        gradeNames.splice(index, 1);
        gradeSubjects.splice(index, 1);
        gradeScores.splice(index, 1);
        showGrades();
      });

      item.appendChild(name);
      item.appendChild(subject);
      item.appendChild(score);
      item.appendChild(deleteButton);
      gradeList.appendChild(item);
    }
  }

  updateSortButtons();
}

// ソートボタンの状態を更新
function updateSortButtons() {
  sortNoneButton.classList.remove("active");
  sortScoreButton.classList.remove("active");
  sortNameButton.classList.remove("active");

  if (sortMode === "none") {
    sortNoneButton.classList.add("active");
  } else if (sortMode === "score") {
    sortScoreButton.classList.add("active");
  } else if (sortMode === "name") {
    sortNameButton.classList.add("active");
  }
}

// 初期表示
showGrades();
