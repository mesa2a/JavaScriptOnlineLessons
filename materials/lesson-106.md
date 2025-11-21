---
title: "フィルタリング"
lesson: 106
description: "並列配列を条件で絞り込み、表示内容を切り替える方法を学びます"
objectives:
  - "条件に合う要素だけを表示できる"
  - "完了/未完了/全てを切り替えられる"
  - "表示制御の仕組みを理解できる"
duration: 30
---

# フィルタリング

## 今回の学習

**フィルタリング**とは、データから条件に合うものだけを取り出して表示することです。並列配列を使ったTODOアプリで「完了のみ」「未完了のみ」「全て」を切り替えて表示する方法を学びます。

---

## 1. フィルタリングの基本

並列配列では、ループ内で条件を判定して、条件に合う要素だけを表示します。

```javascript
let todoTexts = ["買い物", "掃除", "勉強"];
let todoCompleted = [true, false, true];

// 完了済みだけを表示
for (let i = 0; i < todoTexts.length; i++) {
  if (todoCompleted[i] === true) {
    console.log(todoTexts[i]);  // "買い物"と"勉強"だけ表示
  }
}
```

### 仕組み

```javascript
// ループで全要素をチェック
for (let i = 0; i < todoTexts.length; i++) {
  // 条件に合う要素だけ処理
  if (条件) {
    // 表示する
  }
  // 条件に合わない要素はスキップ
}
```

---

## 2. 完了済みタスクだけを表示

`completed`が`true`のタスクだけを表示します。

```javascript
let todoTexts = ["買い物", "掃除", "勉強"];
let todoCompleted = [true, false, true];

// 完了済みのみ表示
for (let i = 0; i < todoTexts.length; i++) {
  if (todoCompleted[i] === true) {
    console.log(todoTexts[i]);
  }
}

// 出力:
// 買い物
// 勉強
```

### 短く書く

```javascript
// === true は省略できる
for (let i = 0; i < todoTexts.length; i++) {
  if (todoCompleted[i]) {
    console.log(todoTexts[i]);
  }
}
```

---

## 3. 未完了タスクだけを表示

`completed`が`false`のタスクだけを表示します。

```javascript
// 未完了のみ表示
for (let i = 0; i < todoTexts.length; i++) {
  if (todoCompleted[i] === false) {
    console.log(todoTexts[i]);  // "掃除"だけ表示
  }
}

// または !演算子を使う
for (let i = 0; i < todoTexts.length; i++) {
  if (!todoCompleted[i]) {
    console.log(todoTexts[i]);  // "掃除"だけ表示
  }
}
```

---

## 4. フィルタモードの管理

どのフィルタを適用するかを変数で管理します。

```javascript
let filterMode = "all";  // "all", "completed", "active"

function showTodos() {
  todoList.replaceChildren();

  for (let i = 0; i < todoTexts.length; i++) {
    // フィルタモードに応じて表示を判定
    let shouldShow = false;

    if (filterMode === "all") {
      shouldShow = true;  // 全て表示
    } else if (filterMode === "completed") {
      shouldShow = todoCompleted[i];  // 完了済みのみ
    } else if (filterMode === "active") {
      shouldShow = !todoCompleted[i];  // 未完了のみ
    }

    // 表示すべき要素だけ処理
    if (shouldShow) {
      // DOM要素を作成して表示
      let item = document.createElement("div");
      item.textContent = todoTexts[i];
      todoList.appendChild(item);
    }
  }
}
```

### フィルタモードの切り替え

```javascript
// 全て表示
filterMode = "all";
showTodos();

// 完了のみ表示
filterMode = "completed";
showTodos();

// 未完了のみ表示
filterMode = "active";
showTodos();
```

---

## 5. フィルタボタンの実装

ボタンをクリックしたときにフィルタモードを変更します。

```javascript
let allButton = document.getElementById("allButton");
let completedButton = document.getElementById("completedButton");
let activeButton = document.getElementById("activeButton");

// 全て表示
allButton.addEventListener("click", function() {
  filterMode = "all";
  showTodos();
});

// 完了のみ表示
completedButton.addEventListener("click", function() {
  filterMode = "completed";
  showTodos();
});

// 未完了のみ表示
activeButton.addEventListener("click", function() {
  filterMode = "active";
  showTodos();
});
```

---

## 6. アクティブボタンの表示

現在選択中のフィルタをハイライトします。

```javascript
function updateFilterButtons() {
  // 全てのボタンからactiveクラスを削除
  allButton.classList.remove("active");
  completedButton.classList.remove("active");
  activeButton.classList.remove("active");

  // 現在のモードのボタンにactiveクラスを追加
  if (filterMode === "all") {
    allButton.classList.add("active");
  } else if (filterMode === "completed") {
    completedButton.classList.add("active");
  } else if (filterMode === "active") {
    activeButton.classList.add("active");
  }
}

function showTodos() {
  // ... フィルタリング処理 ...

  updateFilterButtons();  // ボタンの状態を更新
}
```

### CSS

```css
.filter-button {
  padding: 6px 12px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  cursor: pointer;
}

.filter-button.active {
  background-color: #2196F3;
  color: white;
  border-color: #2196F3;
}
```

---

## 7. 実践例：タスク管理アプリ

フィルタリング機能付きのTODOアプリを作成します。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>TODOアプリ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>TODOアプリ</h1>

    <div class="input-area">
      <input type="text" id="todoInput" placeholder="新しいタスクを入力">
      <button id="addButton">追加</button>
    </div>

    <div class="filter-area">
      <button id="allButton" class="filter-button">全て</button>
      <button id="activeButton" class="filter-button">未完了</button>
      <button id="completedButton" class="filter-button">完了済み</button>
    </div>

    <div id="todoList"></div>
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
  max-width: 600px;
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
  margin-bottom: 15px;
}

#todoInput {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
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

.filter-area {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.filter-button {
  padding: 6px 12px;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.filter-button:hover {
  background-color: #e0e0e0;
}

.filter-button.active {
  background-color: #2196F3;
  color: white;
  border-color: #2196F3;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-item input[type="checkbox"] {
  cursor: pointer;
}

.todo-item span {
  flex: 1;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

.delete-button {
  padding: 4px 8px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.delete-button:hover {
  background-color: #da190b;
}
```

### JavaScript

```javascript
// 並列配列でデータを管理
let todoIds = [];
let todoTexts = [];
let todoCompleted = [];
let nextId = 1;
let filterMode = "all";  // "all", "completed", "active"

let todoInput = document.getElementById("todoInput");
let addButton = document.getElementById("addButton");
let todoList = document.getElementById("todoList");
let allButton = document.getElementById("allButton");
let activeButton = document.getElementById("activeButton");
let completedButton = document.getElementById("completedButton");

// タスクを追加
addButton.addEventListener("click", function() {
  let text = todoInput.value.trim();

  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  todoIds.push(nextId);
  todoTexts.push(text);
  todoCompleted.push(false);

  nextId++;
  todoInput.value = "";
  todoInput.focus();
  showTodos();
});

// Enterキーで追加
todoInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

// フィルタボタン
allButton.addEventListener("click", function() {
  filterMode = "all";
  showTodos();
});

activeButton.addEventListener("click", function() {
  filterMode = "active";
  showTodos();
});

completedButton.addEventListener("click", function() {
  filterMode = "completed";
  showTodos();
});

// タスクを表示
function showTodos() {
  todoList.replaceChildren();

  for (let i = 0; i < todoTexts.length; i++) {
    // フィルタモードに応じて表示を判定
    let shouldShow = false;

    if (filterMode === "all") {
      shouldShow = true;
    } else if (filterMode === "completed") {
      shouldShow = todoCompleted[i];
    } else if (filterMode === "active") {
      shouldShow = !todoCompleted[i];
    }

    // 表示すべき要素だけ処理
    if (shouldShow) {
      let item = document.createElement("div");
      item.className = "todo-item";

      // チェックボックス
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todoCompleted[i];

      let index = i;
      checkbox.addEventListener("click", function() {
        todoCompleted[index] = !todoCompleted[index];
        showTodos();
      });

      // テキスト
      let text = document.createElement("span");
      text.textContent = todoTexts[i];

      if (todoCompleted[i]) {
        text.classList.add("completed");
      }

      // 削除ボタン
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "削除";
      deleteButton.className = "delete-button";

      deleteButton.addEventListener("click", function() {
        todoIds.splice(index, 1);
        todoTexts.splice(index, 1);
        todoCompleted.splice(index, 1);
        showTodos();
      });

      item.appendChild(checkbox);
      item.appendChild(text);
      item.appendChild(deleteButton);
      todoList.appendChild(item);
    }
  }

  updateFilterButtons();
}

// フィルタボタンの状態を更新
function updateFilterButtons() {
  allButton.classList.remove("active");
  activeButton.classList.remove("active");
  completedButton.classList.remove("active");

  if (filterMode === "all") {
    allButton.classList.add("active");
  } else if (filterMode === "active") {
    activeButton.classList.add("active");
  } else if (filterMode === "completed") {
    completedButton.classList.add("active");
  }
}

// 初期表示
showTodos();
```

---

## 8. 練習問題

買い物リストアプリを作成してください。

### 要件

1. 商品名を入力して追加できる
2. 各商品にチェックボックスがある（購入済み/未購入）
3. チェックボックスで購入状態を切り替えられる
4. 「全て」「未購入」「購入済み」のフィルタボタンがある
5. フィルタボタンで表示を切り替えられる
6. 削除ボタンで商品を削除できる

### ヒント

```javascript
let itemIds = [];
let itemNames = [];
let itemPurchased = [];

// フィルタリング
for (let i = 0; i < itemNames.length; i++) {
  let shouldShow = false;

  if (filterMode === "all") {
    shouldShow = true;
  } else if (filterMode === "purchased") {
    shouldShow = itemPurchased[i];
  } else if (filterMode === "unpurchased") {
    shouldShow = !itemPurchased[i];
  }

  if (shouldShow) {
    // 表示処理
  }
}
```

---

## まとめ

### 今回学んだこと

- **フィルタリング**：ループ内で条件判定して、条件に合う要素だけを表示
- **フィルタモード**：変数で現在のフィルタ状態を管理
- **条件判定**：`if`文で表示するかどうかを決定
- **ボタンの状態**：`classList.add/remove`で選択中のボタンをハイライト

### 重要なポイント

- 並列配列では、ループ内で条件を判定してフィルタリングする
- `shouldShow`のようなフラグ変数で表示判定を管理すると読みやすい
- フィルタモードが変わったら`showTodos()`で再表示する
- ボタンの状態更新も忘れずに行う

### 並列配列でのフィルタリングの難しさ

並列配列でフィルタリングすると、以下のような問題があります：

- ループ内で複数の条件分岐が必要
- インデックスを保存する必要がある（イベントリスナーのため）
- コードが複雑になりやすい

**レッスン134以降で学ぶオブジェクト配列**を使えば、`filter`メソッドで簡潔にフィルタリングできます：

```javascript
// オブジェクト配列なら（レッスン134以降）
let completedTodos = todos.filter(function(todo) {
  return todo.completed;
});
```

並列配列の不便さを経験することで、オブジェクトの便利さを実感できます。

次のレッスンでは、**ソート機能**について学びます。並列配列を使って、優先度順・名前順に並べ替える方法を学習します。
