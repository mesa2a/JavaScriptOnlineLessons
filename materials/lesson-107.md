---
title: "ソート機能"
lesson: 107
description: "並列配列を並べ替え、点数順・名前順に表示する方法を学びます"
objectives:
  - "並列配列を同期させてソートできる"
  - "比較関数を書ける"
  - "点数順・名前順に並べ替えられる"
duration: 30
---

# ソート機能

## 今回の学習

**ソート**とは、配列の要素を特定の順序で並べ替えることです。並列配列を同期させながら、点数順・名前順に並べ替える方法を学びます。

---

## 1. sortメソッドの基本

`sort`メソッドは、配列を並べ替えます。

```javascript
let numbers = [3, 1, 4, 1, 5];

// 昇順に並べ替える
numbers.sort(function(a, b) {
  return a - b;
});

console.log(numbers);  // [1, 1, 3, 4, 5]
```

### 重要な注意点

```javascript
// sortは元の配列を変更する!
let numbers = [3, 1, 4];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);  // [1, 3, 4] (元の配列が変わる)
```

---

## 2. 比較関数の仕組み

`sort`メソッドは、2つの要素を比較する関数を受け取ります。

```javascript
array.sort(function(a, b) {
  // a と b を比較
  // 負の数を返す → a を b の前に
  // 0 を返す     → 順序を変えない
  // 正の数を返す → b を a の前に
});
```

### 数値の並べ替え

```javascript
let numbers = [30, 5, 100, 1];

// 昇順（小さい順）
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);  // [1, 5, 30, 100]

// 降順（大きい順）
numbers.sort(function(a, b) {
  return b - a;
});
console.log(numbers);  // [100, 30, 5, 1]
```

### 仕組みの詳細

```javascript
// a - b の結果:
// a = 5, b = 30 → 5 - 30 = -25 (負) → a を前に (5, 30)
// a = 30, b = 5 → 30 - 5 = 25 (正)  → b を前に (5, 30)
```

---

## 3. 文字列の並べ替え

文字列をアルファベット順に並べ替えます。

```javascript
let names = ["banana", "apple", "cherry"];

// アルファベット順（昇順）
names.sort(function(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
});

console.log(names);  // ["apple", "banana", "cherry"]
```

### localeCompareを使う方法

```javascript
// より簡潔な書き方
names.sort(function(a, b) {
  return a.localeCompare(b);
});
```

---

## 4. 並列配列のソート

並列配列をソートするには、**すべての配列を同じ順序で並べ替える**必要があります。

### 問題：片方だけソートすると...

```javascript
let studentNames = ["太郎", "花子", "次郎"];
let studentScores = [85, 92, 78];

// ❌ 間違い: 片方だけソート
studentScores.sort(function(a, b) {
  return b - a;  // 降順
});

// 結果: データがバラバラに!
console.log(studentNames);  // ["太郎", "花子", "次郎"] (変わらない)
console.log(studentScores); // [92, 85, 78] (ソートされた)

// インデックス0: "太郎", 92点 → 本当は花子が92点なのに!
```

### 解決策：インデックス配列を作る

並列配列を同期させてソートするには、インデックスの配列を作ります。

```javascript
let studentNames = ["太郎", "花子", "次郎"];
let studentScores = [85, 92, 78];

// インデックスの配列を作る [0, 1, 2]
let indices = [];
for (let i = 0; i < studentNames.length; i++) {
  indices.push(i);
}

// インデックスを点数順にソート
indices.sort(function(a, b) {
  return studentScores[b] - studentScores[a];  // 降順
});

console.log(indices);  // [1, 0, 2]  (花子, 太郎, 次郎の順)

// ソート済みインデックスで表示
for (let i = 0; i < indices.length; i++) {
  let index = indices[i];
  console.log(studentNames[index] + ": " + studentScores[index] + "点");
}

// 出力:
// 花子: 92点
// 太郎: 85点
// 次郎: 78点
```

### 仕組みの説明

```javascript
// 元のデータ
// インデックス: 0      1      2
// 名前:       ["太郎", "花子", "次郎"]
// 点数:       [85,    92,    78]

// インデックス配列を点数順にソート
indices = [1, 0, 2]

// indices[0] = 1 → 花子, 92点
// indices[1] = 0 → 太郎, 85点
// indices[2] = 2 → 次郎, 78点
```

---

## 5. 名前順のソート

名前でソートする場合も同じ方法を使います。

```javascript
let studentNames = ["太郎", "花子", "次郎"];
let studentScores = [85, 92, 78];

// インデックスの配列を作る
let indices = [];
for (let i = 0; i < studentNames.length; i++) {
  indices.push(i);
}

// インデックスを名前順にソート
indices.sort(function(a, b) {
  return studentNames[a].localeCompare(studentNames[b]);
});

// ソート済みインデックスで表示
for (let i = 0; i < indices.length; i++) {
  let index = indices[i];
  console.log(studentNames[index] + ": " + studentScores[index] + "点");
}
```

---

## 6. ソートモードの管理

ソートモードを変数で管理して、切り替えられるようにします。

```javascript
let sortMode = "none";  // "none", "score", "name"

function showStudents() {
  // インデックス配列を作成
  let indices = [];
  for (let i = 0; i < studentNames.length; i++) {
    indices.push(i);
  }

  // ソートモードに応じてソート
  if (sortMode === "score") {
    // 点数順（高い順）
    indices.sort(function(a, b) {
      return studentScores[b] - studentScores[a];
    });
  } else if (sortMode === "name") {
    // 名前順
    indices.sort(function(a, b) {
      return studentNames[a].localeCompare(studentNames[b]);
    });
  }
  // sortMode === "none"の場合は何もしない（元の順序）

  // インデックス順に表示
  studentList.replaceChildren();
  for (let i = 0; i < indices.length; i++) {
    let index = indices[i];
    // DOM要素を作成して表示
  }
}
```

---

## 7. 実践例：成績管理アプリ

ソート機能付きの成績管理アプリを作成します。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>成績管理</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>成績管理</h1>

    <div class="input-area">
      <input type="text" id="nameInput" placeholder="生徒名">
      <input type="text" id="subjectInput" placeholder="科目">
      <input type="number" id="scoreInput" placeholder="点数" min="0" max="100">
      <button id="addButton">追加</button>
    </div>

    <div class="sort-area">
      <button id="sortNoneButton" class="sort-button">元の順序</button>
      <button id="sortScoreButton" class="sort-button">点数順</button>
      <button id="sortNameButton" class="sort-button">名前順</button>
    </div>

    <div id="gradeList"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
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
  let name = nameInput.value.trim();
  let subject = subjectInput.value.trim();
  let score = parseInt(scoreInput.value);

  if (name === "" || subject === "") {
    alert("生徒名と科目を入力してください");
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

      let name = document.createElement("span");
      name.className = "grade-name";
      name.textContent = gradeNames[index];

      let subject = document.createElement("span");
      subject.className = "grade-subject";
      subject.textContent = gradeSubjects[index];

      let score = document.createElement("span");
      score.className = "grade-score";
      score.textContent = gradeScores[index] + "点";

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
```

---

## 8. 練習問題

書籍管理アプリを作成してください。

### 要件

1. 本のタイトル・著者・評価（1-5）を入力して追加できる
2. 「元の順序」「評価順」「タイトル順」のソートボタンがある
3. ソートボタンで表示順を切り替えられる
4. 削除ボタンで本を削除できる

### ヒント

```javascript
let bookIds = [];
let bookTitles = [];
let bookAuthors = [];
let bookRatings = [];

// インデックス配列を作成
let indices = [];
for (let i = 0; i < bookTitles.length; i++) {
  indices.push(i);
}

// 評価順にソート（高い順）
indices.sort(function(a, b) {
  return bookRatings[b] - bookRatings[a];
});

// タイトル順にソート
indices.sort(function(a, b) {
  return bookTitles[a].localeCompare(bookTitles[b]);
});
```

---

## まとめ

### 今回学んだこと

- **sortメソッド**：`array.sort(function(a, b) { return a - b; })`で配列をソート
- **比較関数**：負/0/正の数を返して順序を決定
- **インデックス配列**：並列配列を同期させるためにインデックスをソート
- **ソートモード**：変数でソート方法を管理

### 重要なポイント

- `sort`は元の配列を変更する
- 並列配列をソートするにはインデックス配列を使う
- 点数は`a - b`、名前は`localeCompare`でソート
- インデックス配列でソートすれば、並列配列を同期できる

### 並列配列でのソートの難しさ

並列配列でソートすると、以下のような問題があります：

- インデックス配列を作る必要がある
- 比較関数内でインデックスを使って値を参照する必要がある
- コードが複雑になりやすい
- 削除時にインデックスがずれる問題がある

**レッスン134以降で学ぶオブジェクト配列**を使えば、シンプルにソートできます：

```javascript
// オブジェクト配列なら（レッスン134以降）
grades.sort(function(a, b) {
  return b.score - a.score;  // 点数順
});
```

並列配列の限界を経験することで、オブジェクトの必要性を実感できます。

これで並列配列を使ったデータ管理の学習は完了です。次のレッスンでは新しいトピックに進みます。
