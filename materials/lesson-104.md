---
title: "並列配列"
lesson: 104
description: "複数の配列を使って関連するデータを管理する方法を学びます"
objectives:
  - "並列配列の概念を理解できる"
  - "複数の配列で関連データを管理できる"
  - "同じインデックスでデータを関連付けられる"
duration: 30
---

# 並列配列

## 今回の学習

複数の情報を管理するために、**並列配列**というテクニックを学びます。複数の配列を使って、関連するデータを同じインデックスで管理します。

---

## 1. 並列配列とは

### 単純な配列の問題

これまでは、一つの配列でタスクのテキストだけを管理していました：

```javascript
let todos = ["買い物", "掃除", "洗濯"];
```

しかし、各タスクに**追加情報**を持たせたい場合、一つの配列では不十分です。

### 並列配列による解決

複数の配列を使って、関連する情報を管理します：

```javascript
let todoTexts = ["買い物", "掃除", "洗濯"];
let todoPriorities = [3, 1, 2];  // 優先度

// インデックス0: "買い物", 優先度3
// インデックス1: "掃除", 優先度1
// インデックス2: "洗濯", 優先度2
```

**同じインデックス**で関連するデータにアクセスできます。

---

## 2. 並列配列のルール

### 重要な原則

1. **配列の長さを揃える** - すべての配列は同じ長さにする
2. **同じインデックスで管理** - 関連するデータは同じインデックスに配置
3. **同時に操作** - 追加・削除は全ての配列で同時に行う

### 例：連絡先管理

```javascript
let names = ["太郎", "花子", "次郎"];
let phones = ["090-1111-2222", "080-3333-4444", "070-5555-6666"];
let emails = ["taro@example.com", "hanako@example.com", "jiro@example.com"];

// インデックス0の人: 太郎さん、電話090-1111-2222、メールtaro@example.com
// インデックス1の人: 花子さん、電話080-3333-4444、メールhanako@example.com
```

---

## 3. データの追加

すべての配列に同時に追加します。

```javascript
let todoTexts = [];
let todoPriorities = [];

// 新しいタスクを追加
todoTexts.push("買い物");
todoPriorities.push(3);

todoTexts.push("掃除");
todoPriorities.push(1);

console.log(todoTexts);        // ["買い物", "掃除"]
console.log(todoPriorities);   // [3, 1]
```

---

## 4. データの表示

ループで並列配列を表示します。

```javascript
let todoTexts = ["買い物", "掃除", "洗濯"];
let todoPriorities = [3, 1, 2];

for (let i = 0; i < todoTexts.length; i++) {
  console.log(todoTexts[i] + " (優先度: " + todoPriorities[i] + ")");
}

// 出力:
// 買い物 (優先度: 3)
// 掃除 (優先度: 1)
// 洗濯 (優先度: 2)
```

---

## 5. データの削除

**すべての配列から同じインデックスを削除**します。

```javascript
let todoTexts = ["買い物", "掃除", "洗濯"];
let todoPriorities = [3, 1, 2];

// インデックス1（"掃除"）を削除
let index = 1;
todoTexts.splice(index, 1);
todoPriorities.splice(index, 1);

console.log(todoTexts);        // ["買い物", "洗濯"]
console.log(todoPriorities);   // [3, 2]
```

### 削除時の注意

```javascript
// ❌ 間違い: 片方だけ削除
todoTexts.splice(1, 1);
// todoPriorities.splice(1, 1);  // 削除し忘れ！

// ⭕ 正しい: 両方削除
todoTexts.splice(1, 1);
todoPriorities.splice(1, 1);
```

---

## 6. 実践例：タスク管理アプリ

並列配列を使ってタスクを管理します。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>タスク管理</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 20px;
      background-color: #f5f5f5;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      padding: 20px;
      border-radius: 8px;
    }

    .input-area {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    #taskInput {
      flex: 1;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    #priorityInput {
      width: 80px;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      padding: 8px 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #45a049;
    }

    .task-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border-bottom: 1px solid #eee;
    }

    .task-text {
      flex: 1;
    }

    .priority-badge {
      padding: 4px 8px;
      background-color: #2196F3;
      color: white;
      border-radius: 12px;
      font-size: 12px;
    }

    .delete-button {
      padding: 4px 8px;
      background-color: #f44336;
      font-size: 12px;
    }

    .delete-button:hover {
      background-color: #da190b;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>タスク管理</h1>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="タスクを入力">
      <input type="number" id="priorityInput" placeholder="優先度" min="1" max="5">
      <button id="addButton">追加</button>
    </div>

    <div id="taskList"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
// 並列配列でデータを管理
let taskTexts = [];
let taskPriorities = [];

let taskInput = document.getElementById("taskInput");
let priorityInput = document.getElementById("priorityInput");
let addButton = document.getElementById("addButton");
let taskList = document.getElementById("taskList");

// タスクを追加
addButton.addEventListener("click", function() {
  let text = taskInput.value.trim();
  let priority = parseInt(priorityInput.value);

  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  if (isNaN(priority) || priority < 1 || priority > 5) {
    alert("優先度は1〜5の数値で入力してください");
    return;
  }

  // 両方の配列に追加
  taskTexts.push(text);
  taskPriorities.push(priority);

  taskInput.value = "";
  priorityInput.value = "";
  taskInput.focus();

  showTasks();
});

// Enterキーで追加
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

// タスクを表示
function showTasks() {
  taskList.replaceChildren();

  for (let i = 0; i < taskTexts.length; i++) {
    let item = document.createElement("div");
    item.className = "task-item";

    // タスクテキスト
    let text = document.createElement("span");
    text.className = "task-text";
    text.textContent = taskTexts[i];

    // 優先度バッジ
    let badge = document.createElement("span");
    badge.className = "priority-badge";
    badge.textContent = "優先度: " + taskPriorities[i];

    // 削除ボタン
    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "削除";

    // 削除処理
    deleteButton.addEventListener("click", function() {
      // 両方の配列から削除
      taskTexts.splice(i, 1);
      taskPriorities.splice(i, 1);
      showTasks();
    });

    item.appendChild(text);
    item.appendChild(badge);
    item.appendChild(deleteButton);
    taskList.appendChild(item);
  }
}
```

---

## 7. 並列配列 vs 2次元配列 vs オブジェクト配列

同じデータを管理する3つの方法を比較します。

### 方法1: 並列配列（今回学ぶ方法）

```javascript
let studentNames = ["太郎", "花子", "次郎"];
let studentScores = [85, 92, 78];

// アクセス
console.log(studentNames[0]);  // "太郎"
console.log(studentScores[0]); // 85
```

**メリット**:
- 既に学んだ配列の知識だけで実装できる
- 各データ項目を個別に扱える

**デメリット**:
- 複数の配列を同期させる必要がある
- 追加・削除時に全ての配列を操作しなければならない
- 配列の数が増えると管理が大変

### 方法2: 2次元配列（レッスン103.5で学ぶ）

```javascript
let students = [
  ["太郎", 85],  // インデックス0
  ["花子", 92],  // インデックス1
  ["次郎", 78]   // インデックス2
];

// アクセス
console.log(students[0]);     // ["太郎", 85]
console.log(students[0][0]);  // "太郎"
console.log(students[0][1]);  // 85
```

**メリット**:
- データがまとまっている
- 追加・削除が1回で済む

**デメリット**:
- `[行][列]`の2次元アクセスが必要
- どの列が何のデータかわかりにくい（0が名前？1が点数？）
- コードが読みにくくなりやすい

### 方法3: オブジェクト配列（レッスン134で学ぶ）

```javascript
let students = [
  { name: "太郎", score: 85 },
  { name: "花子", score: 92 },
  { name: "次郎", score: 78 }
];

// アクセス
console.log(students[0]);        // { name: "太郎", score: 85 }
console.log(students[0].name);   // "太郎"
console.log(students[0].score);  // 85
```

**メリット**:
- データがまとまっている
- プロパティ名でアクセスできて読みやすい（`score`が点数だとすぐわかる）
- 追加・削除が1回で済む
- 拡張しやすい（新しいプロパティを簡単に追加できる）

**デメリット**:
- オブジェクトの知識が必要（まだ学んでいない）

### どれを使うべきか？

| データの種類 | おすすめの方法 |
|-------------|--------------|
| 1〜2個の関連データ | 並列配列 |
| 表形式のデータ（行と列が明確） | 2次元配列 |
| 3個以上の関連データ | オブジェクト配列（推奨）|

**学習の順序**:
1. **レッスン103.5**: 2次元配列で表形式のデータを学ぶ
2. **今（レッスン104）**: 並列配列で複数データ管理の基礎を学ぶ
3. **レッスン134以降**: オブジェクト配列で本格的なデータ管理を学ぶ

並列配列は「不便だ」と感じるかもしれません。それは正しい感覚です！この不便さを経験することで、後でオブジェクトを学んだときに「なるほど、こんなに便利なのか！」と実感できます。

---

## 8. 並列配列の注意点

### 配列の長さが揃っていないと...

```javascript
let studentNames = ["太郎", "花子", "次郎"];
let studentScores = [85, 92];  // ❌ 長さが違う！

console.log(studentNames[2]);  // "次郎"
console.log(studentScores[2]); // undefined （バグ！）
```

### 片方だけ削除すると...

```javascript
let studentNames = ["太郎", "花子", "次郎"];
let studentScores = [85, 92, 78];

// ❌ 間違い: 片方だけ削除
studentNames.splice(1, 1);
// studentScores.splice(1, 1);  // 削除し忘れ！

// 結果: ズレが発生
console.log(studentNames[1]);  // "次郎" （本来は花子）
console.log(studentScores[1]); // 92 （花子の点数が次郎に紐づく！）
```

**必ずすべての配列で同時に操作する**ことを忘れないでください。

---

## 9. 練習問題

学生の情報を管理するアプリを作成してください。

### 要件

1. 学生名を入力して追加できる
2. 各学生に点数を設定できる
3. 学生名と点数を一覧表示できる
4. 削除ボタンで学生を削除できる

### ヒント

```javascript
let studentNames = [];
let studentScores = [];

// 追加
studentNames.push("太郎");
studentScores.push(85);

// 表示
for (let i = 0; i < studentNames.length; i++) {
  console.log(studentNames[i] + ": " + studentScores[i] + "点");
}

// 削除
studentNames.splice(index, 1);
studentScores.splice(index, 1);
```

---

## まとめ

### 今回学んだこと

- **並列配列**：複数の配列で関連データを管理する手法
- **同じインデックス**：関連するデータは同じ位置に配置
- **同時操作**：追加・削除は全ての配列で同時に行う
- **配列の長さを揃える**：すべての配列は同じ長さに保つ
- **3つの方法の違い**：並列配列、2次元配列、オブジェクト配列の特徴

### 重要なポイント

- 並列配列は既に学んだ配列の知識だけで実装できる
- 追加・削除は**すべての配列で同時に**行う
- インデックスで関連するデータにアクセスする
- 配列の長さが揃っているか常に確認する
- 並列配列の「不便さ」を経験することが、後でオブジェクトを学ぶときの理解を深める

### データ管理の学習ロードマップ

1. **レッスン103.5**: 2次元配列で表形式データ
2. **レッスン104（今回）**: 並列配列で複数データ管理の基礎
3. **レッスン134以降**: オブジェクト配列で本格的なデータ管理

次のレッスンでは、**状態管理**について学びます。タスクの完了/未完了を並列配列で管理する方法を学習します。
