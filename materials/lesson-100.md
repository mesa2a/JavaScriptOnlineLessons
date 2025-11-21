---
title: "レッスン100：リストの更新"
author: "JavaScript Online Lessons"
date: "2025-01-21"
---

# レッスン100：リストの更新

## 今回の学習

前回のレッスンでは、`createElement`と`appendChild`を学びました：

- 要素を動的に作成する
- DOMに要素を追加する
- innerHTMLより安全な方法

今回は、配列のデータが変更された時に、画面表示を更新する方法を学びます：

- 配列が変わったら表示を更新する
- 古い表示をクリアする
- 新しく生成し直す
- 効率的な更新パターン

## 1. 基本的な更新パターン

### データと表示の同期

配列のデータを変更したら、必ず表示を更新する必要があります：

```javascript
let fruits = ["りんご", "バナナ"];

function showFruits() {
  let ul = document.getElementById("list");
  ul.replaceChildren();  // 古い表示をクリア

  for (let fruit of fruits) {
    let li = document.createElement("li");
    li.textContent = fruit;
    ul.appendChild(li);
  }
}

// 初期表示
showFruits();

// データを変更したら再表示
fruits.push("みかん");
showFruits();  // 画面が更新される
```

**重要**: 配列を変更したら、必ず`showFruits()`を呼び出して画面を更新します。

### 更新関数のパターン

表示更新は、次のパターンで行います：

1. **古い表示をクリア**
2. **配列をループ**
3. **各要素を作成して追加**

```javascript
function updateDisplay() {
  // 1. クリア
  container.replaceChildren();

  // 2. ループで各要素を処理
  for (let item of array) {
    // 3. 要素を作成して追加
    let element = createElement("div");
    element.textContent = item;
    container.appendChild(element);
  }
}
```

## 2. 追加・削除での更新

### 要素を追加する

配列に要素を追加したら、画面を更新します：

```javascript
let addButton = document.getElementById("addButton");

addButton.addEventListener("click", function() {
  let input = document.getElementById("input");
  let value = input.value.trim();

  if (value === "") return;

  // 配列に追加
  fruits.push(value);

  // 画面を更新
  showFruits();

  // 入力欄をクリア
  input.value = "";
});
```

### 要素を削除する

配列から要素を削除したら、画面を更新します：

```javascript
function showFruits() {
  ul.replaceChildren();

  for (let i = 0; i < fruits.length; i++) {
    let li = document.createElement("li");
    li.textContent = fruits[i] + " ";

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function() {
      // 配列から削除
      fruits.splice(i, 1);

      // 画面を更新
      showFruits();
    });

    li.appendChild(deleteButton);
    ul.appendChild(li);
  }
}
```

## 3. クリア方法の比較

### replaceChildren()（推奨）

```javascript
container.replaceChildren();
```

- モダンな方法
- シンプルで読みやすい
- すべての子要素を削除

### innerHTML = ""

```javascript
container.innerHTML = "";
```

- 簡単だが、イベントリスナーが正しく削除されない場合がある
- メモリリークの原因になることも

### while + removeChild

```javascript
while (container.firstChild) {
  container.removeChild(container.firstChild);
}
```

- 古いブラウザでも動作
- 確実に削除できる

## 4. 更新のタイミング

### いつ更新するか

配列を変更するたびに、必ず画面を更新します：

```javascript
// 追加
fruits.push("みかん");
showFruits();

// 削除
fruits.pop();
showFruits();

// 変更
fruits[0] = "メロン";
showFruits();

// ソート
fruits.sort();
showFruits();
```

### まとめて更新

複数の変更を行う場合は、最後に1回だけ更新します：

```javascript
// 悪い例：何度も更新
fruits.push("みかん");
showFruits();
fruits.push("ぶどう");
showFruits();
fruits.push("いちご");
showFruits();

// 良い例：まとめて更新
fruits.push("みかん");
fruits.push("ぶどう");
fruits.push("いちご");
showFruits();  // 1回だけ更新
```

これで、パフォーマンスが向上します。

## 5. フィルタリングと更新

### 表示する要素を絞り込む

元の配列を変更せず、表示だけを変える方法：

```javascript
let allProducts = [
  { name: "ノート", price: 100, category: "文房具" },
  { name: "ペン", price: 50, category: "文房具" },
  { name: "消しゴム", price: 30, category: "文房具" },
  { name: "りんご", price: 120, category: "食品" },
  { name: "バナナ", price: 80, category: "食品" }
];

function showProducts(filter) {
  container.replaceChildren();

  for (let product of allProducts) {
    // フィルタリング
    if (filter && product.category !== filter) {
      continue;  // スキップ
    }

    // 要素を作成
    let card = document.createElement("div");
    card.textContent = product.name + " - " + product.price + "円";
    container.appendChild(card);
  }
}

// すべて表示
showProducts();

// 文房具だけ表示
showProducts("文房具");

// 食品だけ表示
showProducts("食品");
```

## 6. ソートと更新

### ソートボタンの実装

```javascript
let sortButton = document.getElementById("sortButton");

sortButton.addEventListener("click", function() {
  // 配列をソート
  fruits.sort();

  // 画面を更新
  showFruits();
});
```

### 昇順・降順の切り替え

```javascript
let ascending = true;

sortButton.addEventListener("click", function() {
  if (ascending) {
    // 昇順
    fruits.sort();
  } else {
    // 降順
    fruits.sort();
    fruits.reverse();
  }

  ascending = !ascending;  // 切り替え
  showFruits();
});
```

## 実践例：タスク管理アプリ

配列の更新と画面の同期を使ったタスク管理アプリを作ってみましょう：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>タスク管理</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .controls {
      margin: 20px 0;
    }
    button {
      padding: 8px 16px;
      margin-right: 10px;
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
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .task-text {
      flex-grow: 1;
      margin-left: 10px;
    }
    .completed {
      text-decoration: line-through;
      color: #999;
    }
    .delete-button {
      background-color: #e74c3c;
    }
    .delete-button:hover {
      background-color: #c0392b;
    }
  </style>
</head>
<body>
  <h1>タスク管理</h1>

  <div>
    <input type="text" id="taskInput" placeholder="タスクを入力">
    <button id="addButton">追加</button>
  </div>

  <div class="controls">
    <button id="showAll">すべて表示</button>
    <button id="showActive">未完了のみ</button>
    <button id="showCompleted">完了済みのみ</button>
    <button id="clearCompleted">完了済みを削除</button>
  </div>

  <div id="taskList"></div>

  <script src="script.js"></script>
</body>
</html>
```

```javascript
let tasks = [];
let filter = "all";  // all, active, completed

let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let taskList = document.getElementById("taskList");

let showAllButton = document.getElementById("showAll");
let showActiveButton = document.getElementById("showActive");
let showCompletedButton = document.getElementById("showCompleted");
let clearCompletedButton = document.getElementById("clearCompleted");

// タスクを追加
addButton.addEventListener("click", function() {
  let text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({
    text: text,
    completed: false
  });

  taskInput.value = "";
  showTasks();
});

// フィルタ切り替え
showAllButton.addEventListener("click", function() {
  filter = "all";
  showTasks();
});

showActiveButton.addEventListener("click", function() {
  filter = "active";
  showTasks();
});

showCompletedButton.addEventListener("click", function() {
  filter = "completed";
  showTasks();
});

// 完了済みを削除
clearCompletedButton.addEventListener("click", function() {
  tasks = tasks.filter(task => !task.completed);
  showTasks();
});

// タスクを表示
function showTasks() {
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    // フィルタリング
    if (filter === "active" && task.completed) continue;
    if (filter === "completed" && !task.completed) continue;

    // タスクアイテムを作成
    let item = document.createElement("div");
    item.className = "task-item";

    // チェックボックス
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", function() {
      task.completed = checkbox.checked;
      showTasks();
    });

    // テキスト
    let text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    if (task.completed) {
      text.classList.add("completed");
    }

    // 削除ボタン
    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function() {
      tasks.splice(i, 1);
      showTasks();
    });

    // 組み立て
    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(deleteButton);

    taskList.appendChild(item);
  }
}

// Enterキーで追加
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

// 初期表示
showTasks();
```

このコードのポイント：

1. **データと表示の分離**：`tasks`配列がデータ、`showTasks()`が表示
2. **更新の一貫性**：配列を変更したら必ず`showTasks()`を呼ぶ
3. **フィルタリング**：元の配列を変更せず、表示だけを変える
4. **効率的な更新**：`replaceChildren()`で古い表示をクリアしてから再生成

## 練習問題

メモ帳アプリを作成してください：

### 要件

1. メモの配列を管理（テキストと日時）
2. メモを追加できる
3. メモを削除できる
4. 「新しい順」「古い順」でソート可能
5. 配列を変更したら必ず画面を更新

### ヒント

```javascript
let memos = [];

function addMemo(text) {
  memos.push({
    text: text,
    date: new Date()
  });
  showMemos();
}

function deleteMemo(index) {
  memos.splice(index, 1);
  showMemos();
}

function sortByNewest() {
  memos.sort((a, b) => b.date - a.date);
  showMemos();
}

function showMemos() {
  container.replaceChildren();

  for (let i = 0; i < memos.length; i++) {
    let memo = memos[i];
    // 要素を作成...
  }
}
```

## まとめ

今回は、配列の更新と画面表示の同期について学びました：

- **更新パターン**：クリア → ループ → 作成・追加
- **タイミング**：配列を変更したら必ず表示を更新
- **クリア方法**：`replaceChildren()`が推奨
- **フィルタリング**：元の配列を変更せず、表示だけを変える
- **まとめて更新**：複数の変更後に1回だけ更新
- **データと表示の分離**：配列がデータ、関数が表示

配列のデータと画面表示を常に同期させることで、ユーザーに正しい情報を提供できます。この「データを変更したら表示を更新する」パターンは、多くのアプリケーションで使われる基本的な考え方です。

次のレッスンでは、さらに高度なDOM操作について学びます。
