// 学生データ
let students = [
  { name: "太郎", score: 85 },
  { name: "花子", score: 55 },
  { name: "次郎", score: 92 },
  { name: "美咲", score: 78 },
  { name: "健太", score: 45 },
  { name: "さくら", score: 68 }
];

// HTML要素の取得
let showAllButton = document.getElementById("showAll");
let showPassedButton = document.getElementById("showPassed");
let studentList = document.getElementById("studentList");

// すべて表示ボタン
showAllButton.addEventListener("click", function() {
  showStudents(students);
});

// 合格者のみ表示ボタン
showPassedButton.addEventListener("click", function() {
  // 60点以上の学生だけを抽出
  let passed = [];
  for (let student of students) {
    if (student.score >= 60) {
      passed.push(student);
    }
  }
  showStudents(passed);
});

// 学生リストを表示する関数
function showStudents(list) {
  // リストが空の場合
  if (list.length === 0) {
    studentList.innerHTML = '<p class="empty-message">該当する学生がいません</p>';
    return;
  }

  // HTMLを生成
  let html = "";
  for (let student of list) {
    html += '<div class="student-card">';
    html += '  <div class="student-name">' + student.name + '</div>';
    html += '  <div class="student-score">テスト: ' + student.score + '点</div>';

    // 合格・不合格の判定
    if (student.score >= 60) {
      html += '  <div class="pass">✓ 合格</div>';
    } else {
      html += '  <div class="fail">✗ 不合格</div>';
    }

    html += '</div>';
  }

  // HTMLを表示
  studentList.innerHTML = html;
}

// 初期表示（すべての学生を表示）
showStudents(students);
