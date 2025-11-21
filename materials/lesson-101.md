---
title: "レッスン101：タスク追加"
author: "JavaScript Online Lessons"
date: "2025-01-21"
---

# レッスン101：タスク追加

## 今回の学習

前回のレッスンでは、リストの更新方法を学びました：

- 配列が変わったら表示を更新する
- 古い表示をクリアする
- 新しく生成し直す

今回は、ユーザーの入力をもとに配列に要素を追加し、画面に反映する方法を学びます：

- 入力欄とボタンを用意する
- 配列に要素を追加する
- 画面に即座に反映する
- 入力バリデーション

## 1. 基本的なタスク追加

### HTMLの準備

入力欄とボタンを用意します：

```html
<div>
  <input type="text" id="taskInput" placeholder="タスクを入力">
  <button id="addButton">追加</button>
</div>

<ul id="taskList"></ul>
```

### JavaScriptでの実装

```javascript
let tasks = [];

let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let taskList = document.getElementById("taskList");

addButton.addEventListener("click", function() {
  // 1. 入力値を取得
  let text = taskInput.value;

  // 2. 配列に追加
  tasks.push(text);

  // 3. 画面を更新
  showTasks();

  // 4. 入力欄をクリア
  taskInput.value = "";
});

function showTasks() {
  taskList.replaceChildren();

  for (let task of tasks) {
    let li = document.createElement("li");
    li.textContent = task;
    taskList.appendChild(li);
  }
}

// 初期表示
showTasks();
```

これで、ボタンをクリックするとタスクが追加されます。

## 2. 入力バリデーション

### 空文字チェック

空の入力を防ぎます：

```javascript
addButton.addEventListener("click", function() {
  let text = taskInput.value.trim();  // 前後の空白を削除

  // 空文字チェック
  if (text === "") {
    alert("タスクを入力してください");
    return;  // 処理を中断
  }

  tasks.push(text);
  showTasks();
  taskInput.value = "";
});
```

`trim()`メソッドで、前後の空白を削除してからチェックします。

### 最小文字数チェック

```javascript
if (text.length < 3) {
  alert("3文字以上入力してください");
  return;
}
```

### 重複チェック

同じタスクを防ぎます：

```javascript
// 既に存在するかチェック
if (tasks.includes(text)) {
  alert("このタスクは既に存在します");
  return;
}

tasks.push(text);
```

`includes()`メソッドで、配列に含まれているかチェックできます。

## 3. Enterキーで追加

### keypressイベント

Enterキーを押した時も追加できるようにします：

```javascript
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();  // ボタンのクリックを実行
  }
});
```

これで、入力欄でEnterキーを押すと、ボタンをクリックしたのと同じ動作になります。

### なぜclick()を呼ぶのか

ボタンの`click()`メソッドを呼ぶことで：

- 同じ処理を2回書かなくて済む
- バリデーションも自動的に実行される
- コードの重複を避けられる

## 4. オブジェクトとして追加

### より複雑なデータ

単純な文字列ではなく、オブジェクトとして保存します：

```javascript
addButton.addEventListener("click", function() {
  let text = taskInput.value.trim();
  if (text === "") return;

  // オブジェクトを作成
  let task = {
    text: text,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(task);
  showTasks();
  taskInput.value = "";
});

function showTasks() {
  taskList.replaceChildren();

  for (let task of tasks) {
    let li = document.createElement("li");
    li.textContent = task.text;  // オブジェクトのtextプロパティを表示
    taskList.appendChild(li);
  }
}
```

オブジェクトにすることで、追加の情報を保存できます。

## 5. IDを付ける

### ユニークなIDの生成

各タスクに固有のIDを付けます：

```javascript
let nextId = 1;

addButton.addEventListener("click", function() {
  let text = taskInput.value.trim();
  if (text === "") return;

  let task = {
    id: nextId,
    text: text,
    completed: false
  };

  nextId++;  // 次のIDに進める

  tasks.push(task);
  showTasks();
  taskInput.value = "";
});
```

IDがあると、後で特定のタスクを探したり削除したりするのが簡単になります。

### タイムスタンプをIDに使う

より確実にユニークなIDが欲しい場合：

```javascript
let task = {
  id: Date.now(),  // 現在時刻（ミリ秒）をIDにする
  text: text,
  completed: false
};
```

## 6. フォーカス管理

### 追加後に入力欄にフォーカス

ユーザーが続けて入力できるように：

```javascript
addButton.addEventListener("click", function() {
  let text = taskInput.value.trim();
  if (text === "") return;

  tasks.push(text);
  showTasks();
  taskInput.value = "";

  // 入力欄にフォーカスを戻す
  taskInput.focus();
});
```

### 初期フォーカス

ページを開いた時に、すぐ入力できるように：

```javascript
// ページ読み込み時に入力欄にフォーカス
taskInput.focus();
```

## 7. 件数の表示

### 追加した件数を表示

```html
<p>タスク数: <span id="taskCount">0</span></p>
```

```javascript
function showTasks() {
  taskList.replaceChildren();

  // 件数を更新
  document.getElementById("taskCount").textContent = tasks.length;

  for (let task of tasks) {
    let li = document.createElement("li");
    li.textContent = task.text;
    taskList.appendChild(li);
  }
}
```

## 実践例：買い物リストアプリ

タスク追加の知識を使って、買い物リストアプリを作ってみましょう：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>買い物リスト</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .input-group {
      display: flex;
      gap: 10px;
      margin: 20px 0;
    }
    input[type="text"] {
      flex-grow: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    input[type="number"] {
      width: 80px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    button {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background-color: #45a049;
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #f9f9f9;
    }
    .item-name {
      font-size: 18px;
      font-weight: bold;
    }
    .item-quantity {
      color: #666;
      margin-left: 10px;
    }
    .delete-button {
      background-color: #e74c3c;
      padding: 5px 10px;
      font-size: 14px;
    }
    .delete-button:hover {
      background-color: #c0392b;
    }
    .summary {
      margin-top: 20px;
      padding: 15px;
      background-color: #e3f2fd;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <h1>🛒 買い物リスト</h1>

  <div class="input-group">
    <input type="text" id="itemInput" placeholder="商品名">
    <input type="number" id="quantityInput" value="1" min="1">
    <button id="addButton">追加</button>
  </div>

  <div class="summary">
    <p>商品数: <span id="itemCount">0</span>個</p>
  </div>

  <div id="itemList"></div>

  <script src="script.js"></script>
</body>
</html>
```

```javascript
let items = [];
let nextId = 1;

let itemInput = document.getElementById("itemInput");
let quantityInput = document.getElementById("quantityInput");
let addButton = document.getElementById("addButton");
let itemList = document.getElementById("itemList");
let itemCount = document.getElementById("itemCount");

addButton.addEventListener("click", function() {
  let name = itemInput.value.trim();
  let quantity = parseInt(quantityInput.value);

  // バリデーション
  if (name === "") {
    alert("商品名を入力してください");
    return;
  }

  if (quantity < 1) {
    alert("数量は1以上にしてください");
    return;
  }

  // 重複チェック
  let existing = items.find(item => item.name === name);
  if (existing) {
    alert("この商品は既に追加されています");
    return;
  }

  // アイテムを作成
  let item = {
    id: nextId,
    name: name,
    quantity: quantity
  };

  nextId++;

  // 配列に追加
  items.push(item);

  // 画面を更新
  showItems();

  // 入力欄をクリア
  itemInput.value = "";
  quantityInput.value = "1";
  itemInput.focus();
});

// Enterキーで追加
itemInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

quantityInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

function showItems() {
  itemList.replaceChildren();

  // 件数を更新
  itemCount.textContent = items.length;

  // アイテムが空の場合
  if (items.length === 0) {
    let empty = document.createElement("p");
    empty.textContent = "まだ商品が追加されていません";
    empty.style.textAlign = "center";
    empty.style.color = "#999";
    itemList.appendChild(empty);
    return;
  }

  // 各アイテムを表示
  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    let div = document.createElement("div");
    div.className = "item";

    let info = document.createElement("div");

    let nameSpan = document.createElement("span");
    nameSpan.className = "item-name";
    nameSpan.textContent = item.name;

    let quantitySpan = document.createElement("span");
    quantitySpan.className = "item-quantity";
    quantitySpan.textContent = "×" + item.quantity;

    info.appendChild(nameSpan);
    info.appendChild(quantitySpan);

    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function() {
      items.splice(i, 1);
      showItems();
    });

    div.appendChild(info);
    div.appendChild(deleteButton);

    itemList.appendChild(div);
  }
}

// 初期表示
showItems();
itemInput.focus();
```

このコードのポイント：

1. **複数の入力欄**：商品名と数量を入力
2. **バリデーション**：空文字チェック、数値チェック、重複チェック
3. **Enterキー対応**：どちらの入力欄でもEnterで追加
4. **フォーカス管理**：追加後に商品名入力欄にフォーカス
5. **件数表示**：追加した商品数をリアルタイムで表示

## 練習問題

「本の管理アプリ」を作成してください：

### 要件

1. 本のタイトルと著者名を入力できる
2. 「追加」ボタンで配列に追加
3. 追加した本をリスト表示
4. 空文字チェックを実装
5. 追加した本の冊数を表示
6. Enterキーでも追加できる

### ヒント

```javascript
let books = [];

addButton.addEventListener("click", function() {
  let title = titleInput.value.trim();
  let author = authorInput.value.trim();

  if (title === "" || author === "") {
    alert("タイトルと著者名を入力してください");
    return;
  }

  let book = {
    title: title,
    author: author
  };

  books.push(book);
  showBooks();

  titleInput.value = "";
  authorInput.value = "";
  titleInput.focus();
});
```

## まとめ

今回は、ユーザー入力をもとに配列に要素を追加する方法を学びました：

- **基本パターン**：入力取得 → 配列追加 → 画面更新 → 入力クリア
- **バリデーション**：空文字チェック、重複チェック、数値チェック
- **Enterキー対応**：`keypress`イベントで`button.click()`を呼ぶ
- **オブジェクトとして保存**：複数の情報をまとめて管理
- **ID管理**：各要素にユニークなIDを付ける
- **フォーカス管理**：ユーザービリティを向上させる
- **件数表示**：配列の`length`プロパティを利用

これらの技術を組み合わせることで、ユーザーフレンドリーなアプリケーションが作れます。次のレッスンでは、タスクの削除について学びます。
