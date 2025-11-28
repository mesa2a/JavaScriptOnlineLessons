---
title: "2次元配列入門"
lesson: 103.5
description: "配列の中に配列を入れて、表形式のデータを管理する方法を学びます"
objectives:
  - "2次元配列の概念を理解できる"
  - "2次元配列の作成と要素へのアクセスができる"
  - "表形式のデータを扱える"
duration: 30
date: 2025-11-26
---

# レッスン103.5: 2次元配列入門

## このレッスンで学ぶこと

### 前回の復習

前回のレッスン103では、**配列からの削除**を学びました：

```javascript
// splice()で配列から要素を削除
tasks.splice(i, 1);

// 削除後は必ず表示を更新
showTasks();
```

今回は、**配列の中に配列を入れる**方法を学びます。これを「2次元配列」と呼びます。

### よくある場面

プログラミングで、こんなデータを扱いたいことがあります：

**場面1：成績表**
```
名前    点数
太郎    85
花子    92
次郎    78
```

**場面2：座席表**
```
     列0   列1   列2   列3   列4
行0  太郎  花子  次郎  空席  空席
行1  空席  空席  美咲  空席  空席
行2  空席  健太  空席  空席  空席
```

**場面3：ゲームのマップ**
```
0 0 1 0 0
0 1 1 1 0
0 0 1 0 0
（0=道、1=壁）
```

このような**表形式のデータ**を管理するには、2次元配列が便利です。

### 学習目標

このレッスンでは、以下のスキルを身につけます：

1. **2次元配列とは何か**を理解する（配列の配列）
2. **2次元配列の作成**方法を学ぶ
3. **要素へのアクセス**方法を学ぶ（`array[行][列]`）
4. **二重ループ**で全要素を処理する方法を学ぶ
5. **実践的なアプリ**を作成する

---

## 1. 2次元配列とは何か

### 1次元配列と2次元配列の違い

**1次元配列**は、一列に並んだデータです：

```javascript
// 1次元配列（普通の配列）
let fruits = ["りんご", "バナナ", "みかん"];

// イメージ:
// [0]     [1]     [2]
// りんご  バナナ  みかん
```

**2次元配列**は、**配列の中に配列が入っている**データ構造です：

```javascript
// 2次元配列（配列の配列）
let table = [
  ["太郎", 85],
  ["花子", 92],
  ["次郎", 78]
];

// イメージ:
// [0] → ["太郎", 85]
// [1] → ["花子", 92]
// [2] → ["次郎", 78]
```

### 2次元配列を表として見る

2次元配列は、**表（テーブル）**のような構造を持ちます：

```javascript
let table = [
  ["太郎", 85],
  ["花子", 92],
  ["次郎", 78]
];
```

**表として見ると**：
```
         列0    列1
行0:    "太郎"   85
行1:    "花子"   92
行2:    "次郎"   78
```

### メモリイメージ

```
table → ┌─────────────┐
        │ 配列        │
        ├─────────────┤
        │ [0] ──────→ ["太郎", 85]  ← これも配列
        │ [1] ──────→ ["花子", 92]  ← これも配列
        │ [2] ──────→ ["次郎", 78]  ← これも配列
        └─────────────┘

table[0] → ["太郎", 85]
           ┌──────┬──────┐
           │[0]   │[1]   │
           │"太郎"│ 85   │
           └──────┴──────┘
```

---

## 2. 2次元配列の作成

### 基本的な作成方法

配列の中に配列を入れて作ります。

```javascript
// 成績表（名前と点数）
let grades = [
  ["太郎", 85],
  ["花子", 92],
  ["次郎", 78]
];
```

**実行の流れ**：
```
ステップ1: 外側の配列を作成
  grades → []

ステップ2: 各要素（内側の配列）を追加
  grades[0] = ["太郎", 85]
  grades[1] = ["花子", 92]
  grades[2] = ["次郎", 78]

最終的な構造:
  grades → [
    ["太郎", 85],
    ["花子", 92],
    ["次郎", 78]
  ]

  grades.length → 3（行の数）
  grades[0].length → 2（列の数）
```

### 様々な2次元配列の例

```javascript
// 座標データ（x, y）
let points = [
  [10, 20],
  [30, 40],
  [50, 60]
];

// 商品データ（商品名、価格）
let products = [
  ["ノート", 100],
  ["ペン", 50],
  ["消しゴム", 80]
];

// ゲームマップ（0=道、1=壁）
let map = [
  [0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0]
];

// 座席表（null=空席、文字列=名前）
let seats = [
  ["太郎", "花子", null],
  [null, "次郎", null],
  [null, null, "美咲"]
];
```

### 空の2次元配列を作る

```javascript
// 3行5列の空の座席表を作成
let seats = [
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null]
];

// seats.length → 3（行数）
// seats[0].length → 5（列数）
```

**実行の流れ**：
```
ステップ1: 外側の配列（3行）を作成
  seats → []

ステップ2: 各行に5個のnullを持つ配列を追加
  seats[0] → [null, null, null, null, null]
  seats[1] → [null, null, null, null, null]
  seats[2] → [null, null, null, null, null]

最終状態:
  seats → [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null]
  ]
```

---

## 3. 要素へのアクセス

### 2段階のアクセス

2次元配列の要素にアクセスするには、**2つのインデックス**を使います。

```javascript
let grades = [
  ["太郎", 85],
  ["花子", 92],
  ["次郎", 78]
];

// 1つ目のインデックス: 行を選ぶ
console.log(grades[0]);     // ["太郎", 85]
console.log(grades[1]);     // ["花子", 92]
console.log(grades[2]);     // ["次郎", 78]

// 2つ目のインデックス: 列を選ぶ
console.log(grades[0][0]);  // "太郎"
console.log(grades[0][1]);  // 85
console.log(grades[1][0]);  // "花子"
console.log(grades[1][1]);  // 92
console.log(grades[2][0]);  // "次郎"
console.log(grades[2][1]);  // 78
```

### アクセスの仕組み

```javascript
array[行][列]

// 例:
grades[0][0]  // 0行目の0列目 → "太郎"
grades[0][1]  // 0行目の1列目 → 85
grades[1][0]  // 1行目の0列目 → "花子"
grades[1][1]  // 1行目の1列目 → 92
```

**実行の流れ（grades[1][0]の場合）**：
```
ステップ1: grades[1]を評価
  grades[1] → ["花子", 92]

ステップ2: 結果の配列の[0]を取得
  ["花子", 92][0] → "花子"

最終結果:
  grades[1][0] → "花子"
```

### 図解：アクセスのイメージ

```
grades = [
  ["太郎", 85],  ← 行0
  ["花子", 92],  ← 行1
  ["次郎", 78]   ← 行2
]
  ↑      ↑
  列0    列1

grades[1][0] にアクセス:

ステップ1: grades[1] で行1を取得
  → ["花子", 92]

ステップ2: [0] で列0を取得
  → "花子"

┌───────────────────────────────┐
│ grades[行][列] の順番を守る     │
│                               │
│ grades[1][0]                  │
│        ↑  ↑                   │
│        行 列                   │
└───────────────────────────────┘
```

### よくある間違い

```javascript
let grades = [
  ["太郎", 85],
  ["花子", 92]
];

// ❌ 間違い: 行と列を逆にする
console.log(grades[0, 1]);  // これは文法エラーではないが意図と違う結果

// ⭕ 正しい: [行][列]の順番
console.log(grades[0][1]);  // 85

// ❌ 間違い: インデックスを1つしか指定しない
console.log(grades[0]);     // ["太郎", 85]（配列全体が返る）

// ⭕ 正しい: 2つのインデックスで値を取得
console.log(grades[0][1]);  // 85
```

---

## 4. 2次元配列のループ処理

### 二重ループの基本

2次元配列のすべての要素を処理するには、**二重ループ（ネストしたループ）**を使います。

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

**実行の流れ**：
```
外側ループ1回目（i = 0）:
  row = grades[0] → ["太郎", 85]

  内側ループ1回目（j = 0）:
    row[0] → "太郎"
    console.log("太郎")

  内側ループ2回目（j = 1）:
    row[1] → 85
    console.log(85)

  内側ループ終了（j = 2, j < 2 がfalse）

外側ループ2回目（i = 1）:
  row = grades[1] → ["花子", 92]

  内側ループ1回目（j = 0）:
    row[0] → "花子"
    console.log("花子")

  内側ループ2回目（j = 1）:
    row[1] → 92
    console.log(92)

外側ループ3回目（i = 2）:
  row = grades[2] → ["次郎", 78]

  内側ループ1回目（j = 0）:
    row[0] → "次郎"
    console.log("次郎")

  内側ループ2回目（j = 1）:
    row[1] → 78
    console.log(78)

外側ループ終了（i = 3, i < 3 がfalse）
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

**実行の流れ**：
```
i=0, j=0: grades[0][0] → "太郎"
i=0, j=1: grades[0][1] → 85
i=1, j=0: grades[1][0] → "花子"
i=1, j=1: grades[1][1] → 92
i=2, j=0: grades[2][0] → "次郎"
i=2, j=1: grades[2][1] → 78
```

### 二重ループの可視化

```
┌─────────────────────────────────────────┐
│ 外側のループ（行）                        │
│ for (let i = 0; i < grades.length; i++) │
├─────────────────────────────────────────┤
│   i = 0 → ["太郎", 85]                   │
│   │                                     │
│   └→ ┌───────────────────────────────┐ │
│      │ 内側のループ（列）              │ │
│      │ for (let j = 0; j < row.length; j++) │
│      ├───────────────────────────────┤ │
│      │ j = 0 → "太郎"                 │ │
│      │ j = 1 → 85                     │ │
│      └───────────────────────────────┘ │
│                                         │
│   i = 1 → ["花子", 92]                   │
│   │                                     │
│   └→ ┌───────────────────────────────┐ │
│      │ j = 0 → "花子"                 │ │
│      │ j = 1 → 92                     │ │
│      └───────────────────────────────┘ │
│                                         │
│   i = 2 → ["次郎", 78]                   │
│   │                                     │
│   └→ ┌───────────────────────────────┐ │
│      │ j = 0 → "次郎"                 │ │
│      │ j = 1 → 78                     │ │
│      └───────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 5. 行ごとに処理する

### 各行をまとめて処理

各行の情報を組み合わせて処理することができます。

```javascript
let grades = [
  ["太郎", 85],
  ["花子", 92],
  ["次郎", 78]
];

// 各学生の情報を表示
for (let i = 0; i < grades.length; i++) {
  let name = grades[i][0];   // 列0: 名前
  let score = grades[i][1];  // 列1: 点数
  console.log(name + "さん: " + score + "点");
}

// 出力:
// 太郎さん: 85点
// 花子さん: 92点
// 次郎さん: 78点
```

**実行の流れ**：
```
ループ1回目（i = 0）:
  name = grades[0][0] → "太郎"
  score = grades[0][1] → 85
  console.log("太郎さん: 85点")

ループ2回目（i = 1）:
  name = grades[1][0] → "花子"
  score = grades[1][1] → 92
  console.log("花子さん: 92点")

ループ3回目（i = 2）:
  name = grades[2][0] → "次郎"
  score = grades[2][1] → 78
  console.log("次郎さん: 78点")
```

### 計算処理の例

```javascript
let grades = [
  ["太郎", 85],
  ["花子", 92],
  ["次郎", 78]
];

// 平均点を計算
let total = 0;
for (let i = 0; i < grades.length; i++) {
  total = total + grades[i][1];  // 列1の点数を加算
}
let average = total / grades.length;
console.log("平均点: " + average + "点");
```

**実行の流れ**：
```
初期状態:
  total = 0

ループ1回目（i = 0）:
  total = total + grades[0][1]
  total = 0 + 85
  total → 85

ループ2回目（i = 1）:
  total = total + grades[1][1]
  total = 85 + 92
  total → 177

ループ3回目（i = 2）:
  total = total + grades[2][1]
  total = 177 + 78
  total → 255

ループ終了後:
  average = total / grades.length
  average = 255 / 3
  average → 85

出力: "平均点: 85点"
```

---

## 6. 要素の追加と削除

### 行の追加（push）

新しい行を追加するには、`push()`を使います。

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

**実行の流れ**：
```
初期状態:
  grades = [
    ["太郎", 85],
    ["花子", 92]
  ]
  grades.length → 2

push(["次郎", 78])を実行:
  ステップ1: 配列の末尾に新しい要素を追加
    grades[2] = ["次郎", 78]

  grades = [
    ["太郎", 85],
    ["花子", 92],
    ["次郎", 78]
  ]
  grades.length → 3
```

### 行の削除（splice）

行を削除するには、`splice()`を使います。

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

**実行の流れ**：
```
初期状態:
  grades = [
    ["太郎", 85],   ← インデックス0
    ["花子", 92],   ← インデックス1（削除対象）
    ["次郎", 78]    ← インデックス2
  ]

splice(1, 1)を実行:
  ステップ1: インデックス1から1個削除
    削除される要素: ["花子", 92]

  ステップ2: 後ろの要素が前に詰まる
    ["次郎", 78]がインデックス1に移動

最終状態:
  grades = [
    ["太郎", 85],   ← インデックス0
    ["次郎", 78]    ← インデックス1（前に詰まった）
  ]
  grades.length → 2
```

### 特定の要素を変更

```javascript
let seats = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

// 1行1列に「太郎」を配置
seats[1][1] = "太郎";

console.log(seats);
// [
//   [null, null, null],
//   [null, "太郎", null],
//   [null, null, null]
// ]
```

**実行の流れ**：
```
初期状態:
  seats[1][1] → null

代入:
  seats[1][1] = "太郎"

変更後:
  seats[1][1] → "太郎"

全体の状態:
  seats = [
    [null, null, null],
    [null, "太郎", null],  ← この行の列1が変更された
    [null, null, null]
  ]
```

---

## 7. 実践例：座席表アプリ

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>座席表アプリ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>🪑 座席表管理</h1>

    <div class="input-area">
      <input type="text" id="nameInput" placeholder="名前を入力">
      <input type="number" id="rowInput" placeholder="行番号" min="0" max="2">
      <input type="number" id="colInput" placeholder="列番号" min="0" max="4">
      <button id="addButton">配置</button>
    </div>

    <div class="info">
      <p>座席をクリックすると退席できます</p>
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
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  margin: 0;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

h1 {
  margin: 0 0 20px 0;
  color: #333;
  text-align: center;
}

.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.input-area input {
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.input-area input:focus {
  outline: none;
  border-color: #667eea;
}

#nameInput {
  flex: 2;
}

#rowInput,
#colInput {
  flex: 1;
}

#addButton {
  padding: 10px 20px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s;
}

#addButton:hover {
  background-color: #5568d3;
}

.info {
  text-align: center;
  color: #666;
  font-size: 13px;
  margin-bottom: 20px;
}

.info p {
  margin: 0;
}

#seatingChart {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.seat-row {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.seat {
  width: 100px;
  height: 70px;
  border: 2px solid #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.seat:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.seat.occupied {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  color: white;
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

// 要素を取得
let nameInput = document.getElementById("nameInput");
let rowInput = document.getElementById("rowInput");
let colInput = document.getElementById("colInput");
let addButton = document.getElementById("addButton");
let seatingChart = document.getElementById("seatingChart");

// 座席に人を配置
addButton.addEventListener("click", function() {
  assignSeat();
});

// Enterキーでも配置できるようにする
nameInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    assignSeat();
  }
});

rowInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    assignSeat();
  }
});

colInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    assignSeat();
  }
});

// 座席配置の処理
function assignSeat() {
  let name = nameInput.value.trim();
  let row = parseInt(rowInput.value);
  let col = parseInt(colInput.value);

  // 入力チェック
  if (name === "") {
    alert("名前を入力してください");
    return;
  }

  if (isNaN(row) || isNaN(col)) {
    alert("行番号と列番号を入力してください");
    return;
  }

  if (row < 0 || row >= seats.length) {
    alert("行番号は 0 〜 " + (seats.length - 1) + " の範囲で入力してください");
    return;
  }

  if (col < 0 || col >= seats[0].length) {
    alert("列番号は 0 〜 " + (seats[0].length - 1) + " の範囲で入力してください");
    return;
  }

  if (seats[row][col] !== null) {
    alert("その座席は既に " + seats[row][col] + " さんが使用しています");
    return;
  }

  // 座席に名前を設定
  seats[row][col] = name;

  // 入力欄をクリア
  nameInput.value = "";
  rowInput.value = "";
  colInput.value = "";
  nameInput.focus();

  // 表示を更新
  showSeats();
}

// 座席表を表示
function showSeats() {
  seatingChart.replaceChildren();

  // 外側のループ: 各行を処理
  for (let i = 0; i < seats.length; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.className = "seat-row";

    // 内側のループ: 各列を処理
    for (let j = 0; j < seats[i].length; j++) {
      let seatDiv = document.createElement("div");
      seatDiv.className = "seat";

      if (seats[i][j] === null) {
        // 空席の場合
        seatDiv.classList.add("empty");
        seatDiv.textContent = "空席";
      } else {
        // 使用中の場合
        seatDiv.classList.add("occupied");
        seatDiv.textContent = seats[i][j];
      }

      // クリックで座席をクリア（退席）
      seatDiv.addEventListener("click", function() {
        if (seats[i][j] !== null) {
          if (confirm(seats[i][j] + " さんを退席させますか？")) {
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

**実行の流れ（"太郎"を行1列2に配置する場合）**：
```
ユーザーが入力:
  nameInput.value = "太郎"
  rowInput.value = "1"
  colInput.value = "2"

配置ボタンをクリック
  ↓
assignSeat()が実行される
  ↓
ステップ1: 入力値を取得
  name = "太郎"
  row = parseInt("1") → 1
  col = parseInt("2") → 2

ステップ2: 入力チェック
  name !== "" ✓
  !isNaN(row) && !isNaN(col) ✓
  row >= 0 && row < 3 ✓
  col >= 0 && col < 5 ✓
  seats[1][2] === null ✓

ステップ3: 座席に名前を設定
  seats[1][2] = "太郎"

  seats = [
    [null, null, null, null, null],
    [null, null, "太郎", null, null],  ← 変更された
    [null, null, null, null, null]
  ]

ステップ4: 入力欄をクリア
  nameInput.value = ""
  rowInput.value = ""
  colInput.value = ""

ステップ5: 画面を更新
  showSeats()が呼ばれる
```

---

## 8. よくある場面での応用

### 応用例1：ビンゴカード

```javascript
// 5×5のビンゴカード
let bingoCard = [
  [12, 23, 35, 41, 52],
  [8, 19, 34, 48, 63],
  [3, 27, "FREE", 50, 74],
  [11, 16, 38, 56, 61],
  [7, 29, 33, 47, 70]
];

// 中央のマスを確認
console.log(bingoCard[2][2]);  // "FREE"

// 全てのマスを表示
for (let i = 0; i < bingoCard.length; i++) {
  for (let j = 0; j < bingoCard[i].length; j++) {
    console.log("(" + i + ", " + j + "): " + bingoCard[i][j]);
  }
}
```

### 応用例2：ゲームマップ

```javascript
// 0=道、1=壁、2=ゴール
let gameMap = [
  [0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 2]
];

// ゴールの位置を探す
for (let i = 0; i < gameMap.length; i++) {
  for (let j = 0; j < gameMap[i].length; j++) {
    if (gameMap[i][j] === 2) {
      console.log("ゴールは行" + i + "、列" + j + "です");
    }
  }
}
// 出力: ゴールは行4、列4です
```

### 応用例3：カレンダー

```javascript
// 2025年1月のカレンダー（週ごとに行分け）
let january2025 = [
  [null, null, null, 1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, 31, null]
];

// 各週を表示
let weekNames = ["日", "月", "火", "水", "木", "金", "土"];

for (let i = 0; i < january2025.length; i++) {
  let week = "";
  for (let j = 0; j < january2025[i].length; j++) {
    let day = january2025[i][j];
    if (day === null) {
      week += "   ";
    } else {
      week += day + " ";
    }
  }
  console.log(week);
}
```

---

## 9. 練習問題

### 練習問題1：ビンゴカード作成

5×5のビンゴカードを作成してください。

**要件**：
1. 5×5の2次元配列を作成する
2. 各マスに1〜75の数字をランダムに配置する
3. 中央のマスは「FREE」とする
4. ビンゴカードをHTMLで表示する
5. 数字をクリックすると背景色が変わる

**ヒント**：
```javascript
// 5×5の配列を作成
let bingoCard = [
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, "FREE", null, null],
  [null, null, null, null, null],
  [null, null, null, null, null]
];

// ランダムな数字を生成（1〜75）
let randomNum = Math.floor(Math.random() * 75) + 1;

// 2次元配列のループ
for (let i = 0; i < bingoCard.length; i++) {
  for (let j = 0; j < bingoCard[i].length; j++) {
    // 中央以外に数字を配置
    if (!(i === 2 && j === 2)) {
      bingoCard[i][j] = randomNum;
    }
  }
}
```

---

### 練習問題2：三目並べ（○×ゲーム）

3×3の三目並べゲームを作成してください。

**要件**：
1. 3×3の2次元配列を作成（初期値はすべてnull）
2. マスをクリックすると「○」が配置される
3. 既に配置されているマスはクリックできない
4. 画面に3×3のマスを表示する

**データ構造のヒント**：
```javascript
let board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

// クリックされたら
board[row][col] = "○";
```

---

### 練習問題3：成績表アプリ

学生の成績を管理するアプリを作成してください。

**要件**：
1. 名前と点数を入力して追加できる
2. 2次元配列で管理（`[["太郎", 85], ["花子", 92]]`）
3. 全員の成績をリスト表示
4. 平均点を表示
5. 最高得点の人を表示

**ヒント**：
```javascript
let grades = [];

// 追加
grades.push([name, score]);

// 平均点
let total = 0;
for (let i = 0; i < grades.length; i++) {
  total += grades[i][1];
}
let average = total / grades.length;

// 最高得点
let maxScore = grades[0][1];
let topStudent = grades[0][0];
for (let i = 1; i < grades.length; i++) {
  if (grades[i][1] > maxScore) {
    maxScore = grades[i][1];
    topStudent = grades[i][0];
  }
}
```

---

## まとめ

### このレッスンで学んだこと

1. **2次元配列の概念**
   ```javascript
   let table = [
     ["太郎", 85],
     ["花子", 92]
   ];
   ```
   配列の中に配列を入れる構造

2. **要素へのアクセス**
   ```javascript
   table[行][列]
   table[0][1]  // 0行目の1列目 → 85
   ```
   2つのインデックスで要素を指定

3. **二重ループ**
   ```javascript
   for (let i = 0; i < table.length; i++) {
     for (let j = 0; j < table[i].length; j++) {
       console.log(table[i][j]);
     }
   }
   ```
   外側のループで行、内側のループで列を処理

4. **追加と削除**
   ```javascript
   table.push(["次郎", 78]);    // 行を追加
   table.splice(1, 1);          // 行を削除
   table[row][col] = "太郎";    // 要素を変更
   ```

### 重要なポイント

1. **2次元配列は表形式データに適している**
   - 行と列の概念があるデータ
   - 座席表、カレンダー、ゲームマップなど

2. **[行][列]の順番を守る**
   - 最初のインデックスが行
   - 2番目のインデックスが列

3. **二重ループで全要素を処理**
   - 外側: 行（i）
   - 内側: 列（j）

4. **各行の長さは個別に確認**
   - `table[i].length`で各行の長さを取得
   - 行ごとに列数が異なる場合もある

### 2次元配列 vs オブジェクト配列

**2次元配列が適している場合**：
```javascript
// シンプルな2列のデータ
let grades = [
  ["太郎", 85],
  ["花子", 92]
];
```

**オブジェクト配列が適している場合**：
```javascript
// 3つ以上のプロパティを持つデータ
let students = [
  { name: "太郎", score: 85, age: 15, class: "A" },
  { name: "花子", score: 92, age: 14, class: "B" }
];
```

→ データの複雑さに応じて使い分けることが重要です！

### 次のレッスンの予告

次のレッスン104では、**オブジェクト配列**について学びます。

- `[{id: 1, text: "買い物"}]`形式
- プロパティ名でデータにアクセス
- より複雑なデータの管理

2次元配列では列番号（0, 1, 2...）でアクセスしましたが、オブジェクト配列では名前（id, text, completed...）でアクセスできるようになります！

---

## 参考：2次元配列の基本パターン

```javascript
// 作成
let table = [
  [値, 値, 値],
  [値, 値, 値]
];

// アクセス
let value = table[行][列];

// 変更
table[行][列] = 新しい値;

// 全要素のループ
for (let i = 0; i < table.length; i++) {
  for (let j = 0; j < table[i].length; j++) {
    // table[i][j]を処理
  }
}

// 行の追加
table.push([値, 値, 値]);

// 行の削除
table.splice(行番号, 1);
```
