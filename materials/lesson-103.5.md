---
title: "2次元配列入門"
lesson: 103.5
description: "配列の中に配列を入れて、表形式のデータを管理する方法を学びます"
objectives:
  - "2次元配列の概念を理解できる"
  - "2次元配列の作成と要素へのアクセスができる"
  - "表形式のデータを扱える"
duration: 30
---

# 2次元配列入門

## 今回の学習

**2次元配列**とは、配列の中に配列が入っているデータ構造です。表（テーブル）のような、行と列で構成されるデータを管理するのに適しています。

---

## 1. 2次元配列とは

2次元配列は「配列の配列」です。

```javascript
// 1次元配列（普通の配列）
let fruits = ["りんご", "バナナ", "みかん"];

// 2次元配列（配列の中に配列）
let table = [
  ["太郎", 85],
  ["花子", 92],
  ["次郎", 78]
];
```

### 表として見ると

```
行0: ["太郎", 85]
行1: ["花子", 92]
行2: ["次郎", 78]

     列0    列1
```

---

## 2. 2次元配列の作成

配列の中に配列を入れて作ります。

```javascript
// 学生の成績表
let grades = [
  ["太郎", 85],
  ["花子", 92],
  ["次郎", 78]
];

// 座標データ
let points = [
  [10, 20],
  [30, 40],
  [50, 60]
];

// 商品データ
let products = [
  ["ノート", 100],
  ["ペン", 50],
  ["消しゴム", 80]
];
```

---

## 3. 要素へのアクセス

2次元配列の要素にアクセスするには、**2つのインデックス**を使います。

```javascript
let grades = [
  ["太郎", 85],
  ["花子", 92],
  ["次郎", 78]
];

// 1つ目のインデックスで「行」を選ぶ
console.log(grades[0]);     // ["太郎", 85]
console.log(grades[1]);     // ["花子", 92]

// 2つ目のインデックスで「列」を選ぶ
console.log(grades[0][0]);  // "太郎"
console.log(grades[0][1]);  // 85
console.log(grades[1][0]);  // "花子"
console.log(grades[1][1]);  // 92
```

### アクセスの仕組み

```javascript
grades[行][列]

grades[0][0]  // 0行目の0列目 → "太郎"
grades[0][1]  // 0行目の1列目 → 85
grades[1][0]  // 1行目の0列目 → "花子"
grades[1][1]  // 1行目の1列目 → 92
```

---

## 4. 2次元配列のループ

2次元配列をすべて表示するには、**二重ループ**を使います。

```javascript
let grades = [
  ["太郎", 85],
  ["花子", 92],
  ["次郎", 78]
];

// 外側のループ: 各行を処理
for (let i = 0; i < grades.length; i++) {
  let row = grades[i];  // 1行取り出す

  // 内側のループ: 各列を処理
  for (let j = 0; j < row.length; j++) {
    console.log(row[j]);
  }
}

// 出力:
// 太郎
// 85
// 花子
// 92
// 次郎
// 78
```

### インデックスで直接アクセス

```javascript
// より直接的な書き方
for (let i = 0; i < grades.length; i++) {
  for (let j = 0; j < grades[i].length; j++) {
    console.log(grades[i][j]);
  }
}
```

---

## 5. 行ごとに処理

各行をまとめて処理することもできます。

```javascript
let grades = [
  ["太郎", 85],
  ["花子", 92],
  ["次郎", 78]
];

// 各学生の情報を表示
for (let i = 0; i < grades.length; i++) {
  let name = grades[i][0];
  let score = grades[i][1];
  console.log(name + "さん: " + score + "点");
}

// 出力:
// 太郎さん: 85点
// 花子さん: 92点
// 次郎さん: 78点
```

---

## 6. 要素の追加

新しい行を追加するには`push`を使います。

```javascript
let grades = [
  ["太郎", 85],
  ["花子", 92]
];

// 新しい学生を追加
grades.push(["次郎", 78]);

console.log(grades);
// [
//   ["太郎", 85],
//   ["花子", 92],
//   ["次郎", 78]
// ]
```

---

## 7. 要素の削除

行を削除するには`splice`を使います。

```javascript
let grades = [
  ["太郎", 85],
  ["花子", 92],
  ["次郎", 78]
];

// インデックス1の行を削除（花子を削除）
grades.splice(1, 1);

console.log(grades);
// [
//   ["太郎", 85],
//   ["次郎", 78]
// ]
```

---

## 8. 実践例：座席表アプリ

座席表を管理するアプリを作成します。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>座席表</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>座席表</h1>

    <div class="input-area">
      <input type="text" id="nameInput" placeholder="名前を入力">
      <input type="number" id="rowInput" placeholder="行" min="0">
      <input type="number" id="colInput" placeholder="列" min="0">
      <button id="addButton">配置</button>
    </div>

    <div id="seatingChart"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### CSS

```css
body {
  font-family: sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
  margin-top: 0;
}

.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.input-area input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

#nameInput {
  flex: 2;
}

#rowInput, #colInput {
  flex: 1;
}

#addButton {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#addButton:hover {
  background-color: #45a049;
}

.seat-row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.seat {
  width: 80px;
  height: 60px;
  border: 2px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  font-size: 13px;
  text-align: center;
}

.seat.occupied {
  background-color: #e3f2fd;
  border-color: #2196F3;
  font-weight: bold;
}

.seat.empty {
  color: #999;
}
```

### JavaScript

```javascript
// 2次元配列で座席を管理（3行5列の座席表）
let seats = [
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null]
];

let nameInput = document.getElementById("nameInput");
let rowInput = document.getElementById("rowInput");
let colInput = document.getElementById("colInput");
let addButton = document.getElementById("addButton");
let seatingChart = document.getElementById("seatingChart");

// 座席に人を配置
addButton.addEventListener("click", function() {
  let name = nameInput.value.trim();
  let row = parseInt(rowInput.value);
  let col = parseInt(colInput.value);

  if (name === "") {
    alert("名前を入力してください");
    return;
  }

  if (isNaN(row) || isNaN(col)) {
    alert("行と列を入力してください");
    return;
  }

  if (row < 0 || row >= seats.length) {
    alert("行は0〜" + (seats.length - 1) + "の範囲で入力してください");
    return;
  }

  if (col < 0 || col >= seats[0].length) {
    alert("列は0〜" + (seats[0].length - 1) + "の範囲で入力してください");
    return;
  }

  // 座席に名前を設定
  seats[row][col] = name;

  nameInput.value = "";
  rowInput.value = "";
  colInput.value = "";
  nameInput.focus();

  showSeats();
});

// Enterキーで配置
nameInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

rowInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

colInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

// 座席表を表示
function showSeats() {
  seatingChart.replaceChildren();

  for (let i = 0; i < seats.length; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.className = "seat-row";

    for (let j = 0; j < seats[i].length; j++) {
      let seatDiv = document.createElement("div");
      seatDiv.className = "seat";

      if (seats[i][j] === null) {
        seatDiv.classList.add("empty");
        seatDiv.textContent = "空席";
      } else {
        seatDiv.classList.add("occupied");
        seatDiv.textContent = seats[i][j];
      }

      // クリックで座席をクリア
      seatDiv.addEventListener("click", function() {
        if (seats[i][j] !== null) {
          if (confirm(seats[i][j] + "さんを退席させますか？")) {
            seats[i][j] = null;
            showSeats();
          }
        }
      });

      rowDiv.appendChild(seatDiv);
    }

    seatingChart.appendChild(rowDiv);
  }
}

// 初期表示
showSeats();
```

---

## 9. 練習問題

ビンゴカードアプリを作成してください。

### 要件

1. 5×5のビンゴカード（2次元配列）を作成する
2. 各マスに1〜75の数字をランダムに配置する（重複なし）
3. 中央のマスは「FREE」とする
4. 数字をクリックすると「✓」マークが付く
5. ビンゴカードを表示する

### ヒント

```javascript
// 5×5の2次元配列を作成
let bingoCard = [
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, "FREE", null, null],
  [null, null, null, null, null],
  [null, null, null, null, null]
];

// ランダムな数字を生成（1〜75）
let num = Math.floor(Math.random() * 75) + 1;

// 2次元配列のループ
for (let i = 0; i < bingoCard.length; i++) {
  for (let j = 0; j < bingoCard[i].length; j++) {
    // 処理
  }
}
```

---

## まとめ

### 今回学んだこと

- **2次元配列**：配列の中に配列を入れたデータ構造
- **アクセス方法**：`array[行][列]`で要素にアクセス
- **二重ループ**：外側のループで行、内側のループで列を処理
- **追加と削除**：`push`で行追加、`splice`で行削除

### 重要なポイント

- 2次元配列は表形式のデータに適している
- インデックスは`[行][列]`の順番
- 二重ループですべての要素を処理できる
- 各行の長さは`array[i].length`で取得

### いつ2次元配列を使うか

**2次元配列が適している場合：**
- 表（テーブル）形式のデータ
- 座標データ（位置情報）
- ゲームのマップやボード
- 行と列の概念があるデータ

**2次元配列が適していない場合：**
- 各データが3つ以上のプロパティを持つ → オブジェクト配列（レッスン134以降）
- 行ごとに列数が大きく異なる → 他のデータ構造を検討

次のレッスンでは、**並列配列**について学びます。複数のデータを別々の配列で管理する方法を学習します。
