---
title: "レッスン103：タスク削除"
author: "JavaScript Online Lessons"
date: "2025-01-21"
---

# レッスン103：タスク削除

## 今回の学習

前回のレッスンでは、タスクを見やすく表示する方法を学びました：

- 番号付きで表示する
- 見やすく整形する
- CSSでスタイルを適用する

今回は、追加したタスクを削除する方法を学びます：

- 削除ボタンを追加する
- 配列から要素を削除する
- 画面表示を更新する
- splice()メソッドの使い方

## 1. 削除ボタンの追加

### 各タスクにボタンを追加

表示する時に、各タスクに削除ボタンを追加します：

```javascript
function showTasks() {
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let li = document.createElement("li");
    li.textContent = task + " ";

    // 削除ボタンを作成
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }
}
```

これで、各タスクの横に「削除」ボタンが表示されます。

## 2. splice()で配列から削除

### splice()メソッドの基本

`splice()`メソッドは、配列の指定位置から要素を削除します：

```javascript
let fruits = ["りんご", "バナナ", "みかん"];

fruits.splice(1, 1);  // インデックス1から1個削除
console.log(fruits);  // ["りんご", "みかん"]
```

**書き方**：`array.splice(開始位置, 削除個数)`

### インデックスを使った削除

```javascript
let tasks = ["買い物", "掃除", "洗濯"];

// インデックス0（最初の要素）を削除
tasks.splice(0, 1);
console.log(tasks);  // ["掃除", "洗濯"]

// インデックス1（2番目の要素）を削除
tasks.splice(1, 1);
console.log(tasks);  // ["掃除"]
```

## 3. 削除ボタンにイベントを追加

### クリックで削除

削除ボタンがクリックされた時に、配列から要素を削除します：

```javascript
function showTasks() {
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let li = document.createElement("li");
    li.textContent = task + " ";

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";

    // クリックイベントを追加
    deleteButton.addEventListener("click", function() {
      tasks.splice(i, 1);  // 配列から削除
      showTasks();         // 画面を更新
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }
}
```

**重要**: 削除したら必ず`showTasks()`を呼んで画面を更新します。

### なぜインデックスが使えるのか

ループ内で作成した関数は、その時の`i`の値を覚えています（クロージャ）：

```javascript
for (let i = 0; i < tasks.length; i++) {
  deleteButton.addEventListener("click", function() {
    // この関数は、自分が作られた時の i の値を覚えている
    tasks.splice(i, 1);
  });
}
```

## 4. 確認メッセージの追加

### confirm()で確認

削除する前に、ユーザーに確認を求めます：

```javascript
deleteButton.addEventListener("click", function() {
  let confirmed = confirm("本当に削除しますか？");

  if (confirmed) {
    tasks.splice(i, 1);
    showTasks();
  }
});
```

`confirm()`は、OKがクリックされると`true`、キャンセルがクリックされると`false`を返します。

### カスタムメッセージ

削除する内容を表示することもできます：

```javascript
let confirmed = confirm("「" + task + "」を削除しますか？");
```

## 5. IDを使った削除

### インデックスの問題

配列を削除すると、インデックスがずれる可能性があります。より確実な方法として、各要素にIDを付ける方法があります：

```javascript
let tasks = [
  { id: 1, title: "買い物" },
  { id: 2, title: "掃除" },
  { id: 3, title: "洗濯" }
];

let nextId = 4;
```

### IDで要素を探して削除

```javascript
function deleteTask(id) {
  // IDで要素を探す
  let index = tasks.findIndex(task => task.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);
    showTasks();
  }
}

// ボタンのイベント
deleteButton.addEventListener("click", function() {
  deleteTask(task.id);
});
```

`findIndex()`は、条件に合う要素のインデックスを返します。見つからない場合は`-1`を返します。

## 6. 削除時のアニメーション

### CSSトランジション

削除する前に、フェードアウトさせることができます：

```javascript
deleteButton.addEventListener("click", function() {
  // 要素を半透明にする
  li.style.opacity = "0.5";
  li.style.transition = "opacity 0.3s";

  // 0.3秒後に削除
  setTimeout(function() {
    tasks.splice(i, 1);
    showTasks();
  }, 300);
});
```

## 7. すべて削除

### 配列を空にする

すべてのタスクを削除するボタンも追加できます：

```javascript
let clearAllButton = document.getElementById("clearAll");

clearAllButton.addEventListener("click", function() {
  let confirmed = confirm("すべてのタスクを削除しますか？");

  if (confirmed) {
    tasks = [];  // 配列を空にする
    showTasks();
  }
});
```

または：

```javascript
tasks.length = 0;  // 配列を空にする別の方法
```

## 実践例：TODOリスト（削除機能付き）

削除機能を持つTODOリストを作ってみましょう：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>TODOリスト</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .input-section {
      margin: 20px 0;
    }
    input[type="text"] {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      width: 300px;
    }
    button {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      margin-left: 10px;
    }
    button:hover {
      background-color: #45a049;
    }
    .task-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      margin: 10px 0;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .task-text {
      flex-grow: 1;
      font-size: 16px;
    }
    .delete-button {
      background-color: #e74c3c;
      padding: 8px 16px;
      font-size: 14px;
      margin-left: 10px;
    }
    .delete-button:hover {
      background-color: #c0392b;
    }
    .clear-all {
      background-color: #95a5a6;
      margin-top: 20px;
      width: 100%;
    }
    .clear-all:hover {
      background-color: #7f8c8d;
    }
    .empty-message {
      text-align: center;
      color: #999;
      font-style: italic;
      padding: 40px;
    }
  </style>
</head>
<body>
  <h1>✅ TODOリスト</h1>

  <div class="input-section">
    <input type="text" id="taskInput" placeholder="タスクを入力">
    <button id="addButton">追加</button>
  </div>

  <div id="taskList"></div>

  <button id="clearAll" class="clear-all">すべて削除</button>

  <script src="script.js"></script>
</body>
</html>
```

```javascript
let tasks = [];

let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let taskList = document.getElementById("taskList");
let clearAllButton = document.getElementById("clearAll");

// タスクを追加
addButton.addEventListener("click", function() {
  let text = taskInput.value.trim();

  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  tasks.push(text);
  showTasks();

  taskInput.value = "";
  taskInput.focus();
});

// Enterキーで追加
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

// すべて削除
clearAllButton.addEventListener("click", function() {
  if (tasks.length === 0) {
    alert("削除するタスクがありません");
    return;
  }

  let confirmed = confirm("すべてのタスクを削除しますか？");

  if (confirmed) {
    tasks = [];
    showTasks();
  }
});

// タスクを表示
function showTasks() {
  taskList.replaceChildren();

  if (tasks.length === 0) {
    let empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "タスクがありません";
    taskList.appendChild(empty);
    return;
  }

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let div = document.createElement("div");
    div.className = "task-item";

    let text = document.createElement("span");
    text.className = "task-text";
    text.textContent = (i + 1) + ". " + task;

    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function() {
      let confirmed = confirm("「" + task + "」を削除しますか？");

      if (confirmed) {
        tasks.splice(i, 1);
        showTasks();
      }
    });

    div.appendChild(text);
    div.appendChild(deleteButton);

    taskList.appendChild(div);
  }
}

// 初期表示
showTasks();
taskInput.focus();
```

このコードのポイント：

1. **個別削除**：各タスクに削除ボタン
2. **確認ダイアログ**：削除前に確認
3. **すべて削除**：配列を空にする
4. **画面更新**：削除後に`showTasks()`を呼ぶ

## 練習問題

「ブックマーク管理アプリ」を作成してください：

### 要件

1. URLとタイトルを入力して追加
2. 追加したブックマークをリスト表示
3. 各ブックマークに削除ボタン
4. 削除前に確認メッセージ
5. 「すべて削除」ボタン

### ヒント

```javascript
let bookmarks = [];

function deleteBookmark(index) {
  let bookmark = bookmarks[index];
  let confirmed = confirm("「" + bookmark.title + "」を削除しますか？");

  if (confirmed) {
    bookmarks.splice(index, 1);
    showBookmarks();
  }
}

function showBookmarks() {
  container.replaceChildren();

  for (let i = 0; i < bookmarks.length; i++) {
    let bookmark = bookmarks[i];

    // 削除ボタン
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", function() {
      deleteBookmark(i);
    });

    // ...
  }
}
```

## まとめ

今回は、配列から要素を削除する方法を学びました：

- **削除ボタン**：各要素にボタンを追加
- **splice()**：`array.splice(index, 1)`で要素を削除
- **画面更新**：削除後に必ず表示を更新
- **確認ダイアログ**：`confirm()`で削除前に確認
- **クロージャ**：ループ内の関数が変数を記憶
- **ID管理**：より確実な削除のためにIDを使う
- **すべて削除**：配列を空にする

削除機能は、CRUD（作成・読み取り・更新・削除）操作の重要な部分です。`splice()`メソッドと画面更新のパターンをしっかり理解しましょう。

次のレッスンでは、さらに高度な配列操作について学びます。
