---
title: "Lesson 072: 動的要素のイベント"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン72：動的要素のイベント

## このレッスンで学ぶこと

このレッスンでは、JavaScriptで**後から追加された要素**に対するイベント処理の方法を学びます。動的に生成される要素は、通常のイベント設定では正しく動作しない場合があります。この問題を解決する**イベント委譲**というパターンを理解し、実際のWebアプリケーション開発で使える技術を身につけましょう。

## なぜこの問題が重要なのか

現代のWebアプリケーションでは、ページを読み込んだ後に新しい要素を追加することが非常に多くあります。

### 実例：SNSのタイムライン

- Twitterでスクロールすると、新しいツイートが次々と表示される
- Facebookで「もっと見る」をクリックすると、新しい投稿が追加される
- Instagramでスクロールすると、新しい写真が読み込まれる

これらのすべてで、**後から追加された要素にもイベントが正しく動作**する必要があります。

## 問題：後から追加した要素のイベントが動かない

まず、問題がどのように発生するのかを見てみましょう。

### 問題のあるコード例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>動的要素の問題</title>
    <style>
        button {
            padding: 10px 20px;
            margin: 5px;
            font-size: 16px;
            cursor: pointer;
        }
        .dynamic-button {
            background-color: lightblue;
        }
    </style>
</head>
<body>
    <h1>動的要素の問題</h1>
    <p>「ボタンを追加」をクリックした後、青いボタンをクリックしてみてください</p>
    <button id="addButton">ボタンを追加</button>
    <div id="container"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let addButton = document.getElementById("addButton");
let container = document.getElementById("container");

// ❌ 問題のあるコード：最初に存在するボタンにイベントを設定
let buttons = document.querySelectorAll(".dynamic-button");
console.log("最初に見つかったボタンの数: " + buttons.length); // 0個

buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    alert("クリックされました");
  });
});

// 新しいボタンを追加
addButton.addEventListener("click", function() {
  let newButton = document.createElement("button");
  newButton.className = "dynamic-button";
  newButton.textContent = "動的ボタン " + (container.children.length + 1);
  container.appendChild(newButton);
  console.log("ボタンを追加しました");
});
```

**何が起こるか：**
1. 「ボタンを追加」をクリックすると、青いボタンが表示される
2. しかし、青いボタンをクリックしても**何も起こらない**

### なぜ動作しないのか

問題の原因を理解しましょう。

```javascript
// ページ読み込み時
let buttons = document.querySelectorAll(".dynamic-button");
// ↑ この時点では.dynamic-buttonは0個（まだ追加されていない）

buttons.forEach(function(button) {
  // ↓ 0個なので、このループは1回も実行されない
  button.addEventListener("click", function() {
    alert("クリックされました");
  });
});

// 後でボタンを追加
// ↓ でも、イベントリスナーは設定されていない
container.appendChild(newButton);
```

**重要なポイント：**
- `querySelectorAll()`は、実行した**その瞬間に存在する要素**だけを取得する
- 後から追加された要素は含まれない
- したがって、後から追加された要素にはイベントリスナーが設定されない

## 解決方法1：要素追加時にイベントを設定する

最もシンプルな解決方法は、要素を追加するたびにイベントリスナーも設定することです。

```javascript
let addButton = document.getElementById("addButton");
let container = document.getElementById("container");

// ボタンを追加
addButton.addEventListener("click", function() {
  let newButton = document.createElement("button");
  newButton.className = "dynamic-button";
  newButton.textContent = "動的ボタン " + (container.children.length + 1);

  // ✅ 要素を追加すると同時にイベントも設定
  newButton.addEventListener("click", function() {
    alert("クリックされました");
  });

  container.appendChild(newButton);
});
```

**この方法の問題点：**
- ボタンが100個あれば、100個のイベントリスナーを設定する必要がある
- メモリを多く使う
- コードが複雑になる
- 後から「すべてのボタンのイベントを無効にする」といった操作が難しい

## 解決方法2：イベント委譲（推奨）

**イベント委譲**は、親要素にイベントリスナーを設定し、イベントバブリングを利用して子要素のイベントをキャッチする方法です。

### イベント委譲の基本概念

イベント委譲を理解するために、まずイベントバブリングを復習しましょう。

```
親要素（container）
  ↑
  |（バブリング：イベントが親に伝わる）
  |
子要素（button）← クリック
```

**イベント委譲の仕組み：**
1. 親要素（container）にイベントリスナーを設定
2. 子要素（button）がクリックされる
3. イベントが親要素にバブリング（伝播）する
4. 親要素のイベントリスナーが実行される
5. `event.target`でどの子要素がクリックされたかを判別
6. 必要な処理を実行

### イベント委譲の実装

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>イベント委譲</title>
    <style>
        button {
            padding: 10px 20px;
            margin: 5px;
            font-size: 16px;
            cursor: pointer;
        }
        .dynamic-button {
            background-color: lightblue;
        }
        #addButton {
            background-color: lightgreen;
        }
    </style>
</head>
<body>
    <h1>イベント委譲の基礎</h1>
    <p>「ボタンを追加」で複数のボタンを追加し、それぞれクリックしてみてください</p>
    <button id="addButton">ボタンを追加</button>
    <div id="container"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let addButton = document.getElementById("addButton");
let container = document.getElementById("container");

// ✅ 親要素（container）にイベントリスナーを設定
container.addEventListener("click", function(event) {
  console.log("containerがクリックされました");
  console.log("実際にクリックされた要素:", event.target);

  // クリックされた要素がdynamic-buttonクラスを持っているかチェック
  if (event.target.classList.contains("dynamic-button")) {
    let buttonNumber = event.target.textContent;
    alert(buttonNumber + "がクリックされました");
  }
});

// ボタンを追加（イベントリスナーは設定しない）
addButton.addEventListener("click", function() {
  let newButton = document.createElement("button");
  newButton.className = "dynamic-button";
  newButton.textContent = "動的ボタン " + (container.children.length + 1);
  container.appendChild(newButton);
  console.log("ボタンを追加しました");
});
```

**動作の流れ：**
1. 「ボタンを追加」をクリック → 新しいボタンが追加される
2. 新しいボタンをクリック → containerのイベントリスナーが実行される
3. `event.target`で「どのボタンがクリックされたか」を判別
4. そのボタンが`.dynamic-button`クラスを持っていれば処理を実行

**この方法のメリット：**
- イベントリスナーは1つだけ（親要素に1つ）
- 後から追加されたボタンでも自動的に動作する
- メモリ効率が良い
- コードがシンプル

## 親要素でキャッチする実例

イベント委譲を使って、より実践的な例を作ってみましょう。

### 実例：動的リストの管理

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>動的リスト管理</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }
        .input-area {
            margin-bottom: 20px;
        }
        #itemInput {
            padding: 10px;
            font-size: 16px;
            width: 300px;
        }
        #addItem {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            background-color: #4CAF50;
            color: white;
            border: none;
        }
        .list-item {
            padding: 15px;
            margin: 10px 0;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .list-item:hover {
            background-color: #e9e9e9;
        }
        .item-text {
            flex: 1;
            cursor: pointer;
        }
        .delete-button {
            background-color: #f44336;
            color: white;
            border: none;
            padding: 8px 16px;
            cursor: pointer;
            border-radius: 3px;
        }
        .delete-button:hover {
            background-color: #da190b;
        }
    </style>
</head>
<body>
    <h1>動的リスト管理</h1>
    <p>アイテムをクリックすると詳細が表示され、削除ボタンでアイテムを削除できます</p>

    <div class="input-area">
        <input type="text" id="itemInput" placeholder="アイテムを入力してください">
        <button id="addItem">追加</button>
    </div>

    <div id="itemList"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let itemInput = document.getElementById("itemInput");
let addItem = document.getElementById("addItem");
let itemList = document.getElementById("itemList");

// アイテムを追加する関数
function addNewItem() {
  let text = itemInput.value.trim();

  if (text === "") {
    alert("アイテムを入力してください");
    return;
  }

  // 新しいアイテム要素を作成
  let listItem = document.createElement("div");
  listItem.className = "list-item";

  let itemText = document.createElement("span");
  itemText.className = "item-text";
  itemText.textContent = text;

  let deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "削除";

  listItem.appendChild(itemText);
  listItem.appendChild(deleteButton);
  itemList.appendChild(listItem);

  itemInput.value = "";
  itemInput.focus();

  console.log("アイテムを追加しました: " + text);
}

// 追加ボタンのクリック
addItem.addEventListener("click", addNewItem);

// Enterキーで追加
itemInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addNewItem();
  }
});

// ✅ イベント委譲：親要素（itemList）にイベントリスナーを設定
itemList.addEventListener("click", function(event) {
  let target = event.target;

  console.log("クリックされた要素:", target);

  // 削除ボタンがクリックされた場合
  if (target.classList.contains("delete-button")) {
    let listItem = target.parentElement;
    let itemText = listItem.querySelector(".item-text").textContent;

    if (confirm("「" + itemText + "」を削除しますか？")) {
      itemList.removeChild(listItem);
      console.log("アイテムを削除しました: " + itemText);
    }
  }
  // アイテムのテキスト部分がクリックされた場合
  else if (target.classList.contains("item-text")) {
    alert("アイテム: " + target.textContent);
    console.log("アイテムの詳細を表示: " + target.textContent);
  }
});
```

**このプログラムのポイント：**
1. `itemList`（親要素）に1つのイベントリスナーを設定
2. 削除ボタンとアイテムテキストの両方のクリックを判別
3. 後から追加されたアイテムでも正しく動作
4. `event.target`で「何がクリックされたか」を判別

## event.targetとevent.currentTargetの違い

イベント委譲を使う場合、この2つのプロパティの違いを理解することが非常に重要です。

### 違いを確認するデモ

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>targetとcurrentTargetの違い</title>
    <style>
        #parent {
            padding: 30px;
            background-color: lightblue;
            border: 3px solid blue;
        }
        #child {
            padding: 20px;
            background-color: lightcoral;
            border: 3px solid red;
        }
        #output {
            margin-top: 20px;
            padding: 10px;
            background-color: #f0f0f0;
            font-family: monospace;
            white-space: pre;
        }
    </style>
</head>
<body>
    <h1>targetとcurrentTargetの違い</h1>
    <p>青いエリアと赤いエリアをクリックして違いを確認してください</p>

    <div id="parent">
        親要素（parent）
        <div id="child">
            子要素（child）
        </div>
    </div>

    <div id="output"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let parent = document.getElementById("parent");
let output = document.getElementById("output");

// 親要素にイベントリスナーを設定
parent.addEventListener("click", function(event) {
  let message = "イベント情報:\n";
  message += "event.target (実際にクリックされた要素): " + event.target.id + "\n";
  message += "event.currentTarget (リスナーが設定された要素): " + event.currentTarget.id + "\n";

  output.textContent = message;

  console.log("target:", event.target);
  console.log("currentTarget:", event.currentTarget);
});
```

**実行結果：**

赤いエリア（child）をクリックした場合：
```
event.target: child（実際にクリックされた要素）
event.currentTarget: parent（リスナーが設定された要素）
```

青いエリア（parent）をクリックした場合：
```
event.target: parent（実際にクリックされた要素）
event.currentTarget: parent（リスナーが設定された要素）
```

**まとめ：**
- `event.target`：実際にクリックされた要素（子要素の可能性がある）
- `event.currentTarget`：イベントリスナーが設定されている要素（常に親要素）

## 複数の要素タイプを処理する

イベント委譲を使うと、異なるタイプの要素を1つのイベントリスナーで処理できます。

### 実例：タスク管理アプリ

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>タスク管理アプリ</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 700px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        h1 {
            color: #333;
        }
        .input-area {
            margin-bottom: 20px;
            padding: 15px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        #taskInput {
            padding: 10px;
            font-size: 16px;
            width: 400px;
            border: 2px solid #ddd;
            border-radius: 4px;
        }
        #addTask {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        #addTask:hover {
            background-color: #45a049;
        }
        .task {
            padding: 15px;
            margin: 10px 0;
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: all 0.3s;
        }
        .task:hover {
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .task-title {
            flex: 1;
            font-weight: bold;
            cursor: pointer;
            padding: 5px;
        }
        .task-title:hover {
            color: #2196F3;
        }
        .task-actions {
            display: flex;
            gap: 5px;
        }
        .complete-button, .delete-button {
            padding: 8px 16px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 14px;
        }
        .complete-button {
            background-color: #2196F3;
            color: white;
        }
        .complete-button:hover {
            background-color: #0b7dda;
        }
        .delete-button {
            background-color: #f44336;
            color: white;
        }
        .delete-button:hover {
            background-color: #da190b;
        }
        .task.completed {
            background-color: #d4edda;
            opacity: 0.8;
        }
        .task.completed .task-title {
            text-decoration: line-through;
            color: #666;
        }
    </style>
</head>
<body>
    <h1>タスク管理アプリ</h1>
    <p>タスクのタイトルをクリックで詳細表示、完了ボタンで完了/未完了を切り替え、削除ボタンで削除できます</p>

    <div class="input-area">
        <input type="text" id="taskInput" placeholder="新しいタスクを入力してください">
        <button id="addTask">タスク追加</button>
    </div>

    <div id="taskList"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let taskInput = document.getElementById("taskInput");
let addTask = document.getElementById("addTask");
let taskList = document.getElementById("taskList");
let taskCount = 0;

// タスクを追加する関数
function addNewTask() {
  let text = taskInput.value.trim();

  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  taskCount = taskCount + 1;

  // タスク要素を作成
  let taskDiv = document.createElement("div");
  taskDiv.className = "task";
  taskDiv.dataset.id = taskCount;

  taskDiv.innerHTML =
    '<div class="task-title">' + text + '</div>' +
    '<div class="task-actions">' +
    '<button class="complete-button">完了</button>' +
    '<button class="delete-button">削除</button>' +
    '</div>';

  taskList.appendChild(taskDiv);
  taskInput.value = "";
  taskInput.focus();

  console.log("タスクを追加しました: " + text + " (ID: " + taskCount + ")");
}

// 追加ボタンのクリック
addTask.addEventListener("click", addNewTask);

// Enterキーで追加
taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addNewTask();
  }
});

// ✅ イベント委譲：すべてのタスク操作を1つのリスナーで処理
taskList.addEventListener("click", function(event) {
  let target = event.target;

  console.log("クリックされた要素:", target.className);

  // タイトルがクリックされた場合
  if (target.classList.contains("task-title")) {
    let taskDiv = target.parentElement;
    let taskId = taskDiv.dataset.id;
    let taskTitle = target.textContent;
    let isCompleted = taskDiv.classList.contains("completed");

    let status = isCompleted ? "完了済み" : "未完了";
    alert("タスクID: " + taskId + "\nタイトル: " + taskTitle + "\nステータス: " + status);
  }
  // 完了ボタンがクリックされた場合
  else if (target.classList.contains("complete-button")) {
    let taskDiv = target.closest(".task");
    taskDiv.classList.toggle("completed");

    let taskTitle = taskDiv.querySelector(".task-title").textContent;
    if (taskDiv.classList.contains("completed")) {
      console.log("タスクを完了にしました: " + taskTitle);
      target.textContent = "未完了に戻す";
    } else {
      console.log("タスクを未完了に戻しました: " + taskTitle);
      target.textContent = "完了";
    }
  }
  // 削除ボタンがクリックされた場合
  else if (target.classList.contains("delete-button")) {
    let taskDiv = target.closest(".task");
    let taskTitle = taskDiv.querySelector(".task-title").textContent;

    if (confirm("「" + taskTitle + "」を削除しますか？")) {
      taskList.removeChild(taskDiv);
      console.log("タスクを削除しました: " + taskTitle);
    }
  }
});
```

**このプログラムのポイント：**
1. **1つのイベントリスナー**で3種類の操作を処理
   - タイトルクリック → 詳細表示
   - 完了ボタン → 完了/未完了の切り替え
   - 削除ボタン → タスクの削除

2. **event.target**で「何がクリックされたか」を判別

3. **closest()**メソッドで親要素を取得
   - `target.parentElement`よりも安全
   - ネストされた要素でも正しく動作

## イベント委譲のパターン集

実際の開発でよく使われるパターンを紹介します。

### パターン1：クラス名でチェック

最も基本的なパターンです。

```javascript
container.addEventListener("click", function(event) {
  // クラス名でチェック
  if (event.target.classList.contains("my-button")) {
    console.log("my-buttonがクリックされました");
  }
});
```

### パターン2：タグ名でチェック

特定のタグ（button、aなど）をチェックする場合に使います。

```javascript
container.addEventListener("click", function(event) {
  // タグ名でチェック（大文字で返される）
  if (event.target.tagName === "BUTTON") {
    console.log("ボタンがクリックされました");
  }
});
```

### パターン3：data属性でチェック

複数のアクションを管理する場合に便利です。

```html
<button data-action="edit">編集</button>
<button data-action="delete">削除</button>
<button data-action="share">共有</button>
```

```javascript
container.addEventListener("click", function(event) {
  let action = event.target.dataset.action;

  if (action === "edit") {
    console.log("編集ボタンがクリックされました");
  } else if (action === "delete") {
    console.log("削除ボタンがクリックされました");
  } else if (action === "share") {
    console.log("共有ボタンがクリックされました");
  }
});
```

### パターン4：closest()メソッドを使う（推奨）

**最も安全で推奨される方法**です。

```html
<button class="my-button">
  <span class="icon">📝</span>
  <span class="text">編集</span>
</button>
```

```javascript
container.addEventListener("click", function(event) {
  // closest()は、クリックされた要素自身または最も近い親要素を検索
  let button = event.target.closest(".my-button");

  if (button) {
    // ボタン自身、またはボタン内の要素（iconやtext）がクリックされた
    console.log("my-buttonがクリックされました");
  }
});
```

**closest()が優れている理由：**
- ボタンの中のspan要素がクリックされても正しく動作
- ネストされた要素でも安全
- 最も実用的

### パターン5：switch文で複数のアクションを処理

```javascript
container.addEventListener("click", function(event) {
  let action = event.target.dataset.action;

  switch (action) {
    case "edit":
      handleEdit(event.target);
      break;
    case "delete":
      handleDelete(event.target);
      break;
    case "share":
      handleShare(event.target);
      break;
    default:
      console.log("未知のアクション");
  }
});

function handleEdit(element) {
  console.log("編集処理");
}

function handleDelete(element) {
  console.log("削除処理");
}

function handleShare(element) {
  console.log("共有処理");
}
```

## 実践例：動的カード管理システム

複雑な動的要素を管理する実用的なシステムを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>動的カード管理システム</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1000px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f0f0f0;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .input-area {
            margin: 20px 0;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .input-area h3 {
            margin-top: 0;
        }
        input {
            padding: 10px;
            margin: 5px;
            border: 2px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        #titleInput {
            width: 300px;
        }
        #contentInput {
            width: 400px;
        }
        #addCard {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        #addCard:hover {
            background-color: #45a049;
        }
        .card-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .card {
            padding: 20px;
            border: 2px solid #ddd;
            border-radius: 8px;
            background-color: white;
            transition: all 0.3s;
        }
        .card:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateY(-4px);
        }
        .card-title {
            font-weight: bold;
            font-size: 20px;
            margin-bottom: 10px;
            cursor: pointer;
            color: #333;
        }
        .card-title:hover {
            color: #2196F3;
        }
        .card-content {
            margin: 15px 0;
            color: #666;
            line-height: 1.6;
        }
        .card-actions {
            margin-top: 15px;
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }
        .card-actions button {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
        }
        .edit-button {
            background-color: #2196F3;
            color: white;
        }
        .edit-button:hover {
            background-color: #0b7dda;
        }
        .favorite-button {
            background-color: #FFC107;
            color: white;
        }
        .favorite-button:hover {
            background-color: #e0a800;
        }
        .delete-button {
            background-color: #f44336;
            color: white;
        }
        .delete-button:hover {
            background-color: #da190b;
        }
        .card.favorite {
            border-color: #FFC107;
            background-color: #FFFBF0;
        }
        .card.favorite .card-title::before {
            content: "⭐ ";
        }
    </style>
</head>
<body>
    <h1>動的カード管理システム</h1>
    <p style="text-align: center;">カードを追加して、タイトルクリック・編集・お気に入り・削除を試してみてください</p>

    <div class="input-area">
        <h3>新しいカードを追加</h3>
        <input type="text" id="titleInput" placeholder="カードのタイトルを入力">
        <input type="text" id="contentInput" placeholder="カードの内容を入力">
        <button id="addCard">カード追加</button>
    </div>

    <div id="cardContainer" class="card-container"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let titleInput = document.getElementById("titleInput");
let contentInput = document.getElementById("contentInput");
let addCard = document.getElementById("addCard");
let cardContainer = document.getElementById("cardContainer");
let cardIdCounter = 0;

// カードを追加する関数
function addNewCard() {
  let title = titleInput.value.trim();
  let content = contentInput.value.trim();

  if (title === "" || content === "") {
    alert("タイトルと内容の両方を入力してください");
    return;
  }

  cardIdCounter = cardIdCounter + 1;

  // カード要素を作成
  let card = document.createElement("div");
  card.className = "card";
  card.dataset.id = cardIdCounter;

  card.innerHTML =
    '<div class="card-title">' + title + '</div>' +
    '<div class="card-content">' + content + '</div>' +
    '<div class="card-actions">' +
    '<button class="edit-button" data-action="edit">編集</button>' +
    '<button class="favorite-button" data-action="favorite">お気に入り</button>' +
    '<button class="delete-button" data-action="delete">削除</button>' +
    '</div>';

  cardContainer.appendChild(card);

  titleInput.value = "";
  contentInput.value = "";
  titleInput.focus();

  console.log("カードを追加しました (ID: " + cardIdCounter + ", タイトル: " + title + ")");
}

// 追加ボタンのクリック
addCard.addEventListener("click", addNewCard);

// Enterキーで追加（contentInputでEnterを押したとき）
contentInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addNewCard();
  }
});

// ✅ イベント委譲：すべてのカード操作を1つのリスナーで処理
cardContainer.addEventListener("click", function(event) {
  let target = event.target;

  // タイトルクリック：詳細表示
  if (target.classList.contains("card-title")) {
    let card = target.closest(".card");
    let cardId = card.dataset.id;
    let title = target.textContent.replace("⭐ ", ""); // お気に入りの星を除く
    let content = card.querySelector(".card-content").textContent;
    let isFavorite = card.classList.contains("favorite");

    let message = "カードID: " + cardId + "\n";
    message += "タイトル: " + title + "\n";
    message += "内容: " + content + "\n";
    message += "お気に入り: " + (isFavorite ? "はい" : "いいえ");

    alert(message);
    console.log("カード詳細を表示 (ID: " + cardId + ")");
  }

  // ボタンクリック：data-action属性で判別
  let action = target.dataset.action;

  if (action) {
    let card = target.closest(".card");
    let cardId = card.dataset.id;

    if (action === "edit") {
      editCard(card);
    } else if (action === "favorite") {
      toggleFavorite(card);
    } else if (action === "delete") {
      deleteCard(card);
    }
  }
});

// カードを編集する関数
function editCard(card) {
  let titleElement = card.querySelector(".card-title");
  let contentElement = card.querySelector(".card-content");
  let cardId = card.dataset.id;

  // 現在のテキストから⭐を除く
  let currentTitle = titleElement.textContent.replace("⭐ ", "");
  let currentContent = contentElement.textContent;

  let newTitle = prompt("新しいタイトルを入力してください", currentTitle);
  if (newTitle !== null && newTitle.trim() !== "") {
    titleElement.textContent = newTitle.trim();
    // お気に入りの場合は星を再度追加（CSSで自動的に追加されるので不要）
    console.log("カードを編集しました (ID: " + cardId + ", 新タイトル: " + newTitle + ")");
  }

  let newContent = prompt("新しい内容を入力してください", currentContent);
  if (newContent !== null && newContent.trim() !== "") {
    contentElement.textContent = newContent.trim();
    console.log("カードの内容を更新しました (ID: " + cardId + ")");
  }
}

// お気に入りを切り替える関数
function toggleFavorite(card) {
  let cardId = card.dataset.id;
  let title = card.querySelector(".card-title").textContent.replace("⭐ ", "");

  card.classList.toggle("favorite");

  if (card.classList.contains("favorite")) {
    console.log("お気に入りに追加しました (ID: " + cardId + ", タイトル: " + title + ")");
  } else {
    console.log("お気に入りから削除しました (ID: " + cardId + ", タイトル: " + title + ")");
  }
}

// カードを削除する関数
function deleteCard(card) {
  let cardId = card.dataset.id;
  let title = card.querySelector(".card-title").textContent.replace("⭐ ", "");

  if (confirm("「" + title + "」を削除しますか？")) {
    cardContainer.removeChild(card);
    console.log("カードを削除しました (ID: " + cardId + ", タイトル: " + title + ")");
  }
}
```

**このシステムのポイント：**
1. **イベント委譲**で動的に追加されたすべてのカードに対応
2. **1つのイベントリスナー**で5種類の操作を処理
   - タイトルクリック
   - 編集ボタン
   - お気に入りボタン
   - 削除ボタン
3. **data-action属性**で各ボタンのアクションを管理
4. **closest()**メソッドで安全に親要素を取得
5. **関数の分離**で各処理を独立させてメンテナンスしやすく

## イベント委譲のメリットとデメリット

### メリット

1. **メモリ効率が良い**
   - 100個の要素に100個のイベントリスナーを設定する必要がない
   - 親要素に1つのリスナーだけで済む

2. **動的要素に自動対応**
   - 後から追加された要素にも自動的に適用される
   - 個別にイベントリスナーを設定する必要がない

3. **コードがシンプル**
   - 1つのイベントリスナーで複数の要素を管理できる
   - コードの見通しが良くなる

4. **パフォーマンスが良い**
   - 特に要素が多い場合、イベントリスナーの数が少ないため高速
   - メモリ使用量も少ない

### デメリット

1. **条件チェックが必要**
   - どの要素がクリックされたかを毎回判別する必要がある
   - コードが若干複雑になる

2. **バブリングしないイベントには使えない**
   - `focus`、`blur`などはバブリングしない
   - これらのイベントには別の方法が必要

3. **イベントの伝播に依存**
   - 子要素で`stopPropagation()`を呼ぶと動作しない
   - イベントフローを理解する必要がある

## 注意点とベストプラクティス

### 1. stopPropagation()に注意

イベント委譲を使う場合、子要素で`stopPropagation()`を呼ぶと親要素でイベントをキャッチできなくなります。

```javascript
// ❌ これをすると委譲が動作しない
childElement.addEventListener("click", function(event) {
  event.stopPropagation(); // 親要素にイベントが伝わらない
  console.log("子要素がクリックされました");
});

// 親要素のイベントリスナーは実行されない
parentElement.addEventListener("click", function(event) {
  console.log("この処理は実行されません");
});
```

### 2. closest()を使う

クリックされた要素が期待する要素でない場合があります。`closest()`を使うと安全です。

```javascript
// ✅ 安全：ボタン内の子要素がクリックされても正しく動作
container.addEventListener("click", function(event) {
  let button = event.target.closest(".my-button");
  if (button) {
    console.log("ボタンがクリックされました");
  }
});

// ❌ 危険：ボタン内の子要素がクリックされた場合に動作しない
container.addEventListener("click", function(event) {
  if (event.target.classList.contains("my-button")) {
    console.log("ボタンがクリックされました");
  }
});
```

### 3. パフォーマンスの考慮

条件チェックは効率的に行いましょう。

```javascript
// ✅ 効率的：シンプルなチェック
if (event.target.classList.contains("button")) {
  // 処理
}

// ❌ 非効率的：毎回querySelectorAllを実行
let allButtons = container.querySelectorAll(".button");
allButtons.forEach(function(button) {
  if (button === event.target) {
    // 処理
  }
});
```

### 4. イベントハンドラの分離

複雑な処理は関数として分離しましょう。

```javascript
// ✅ 良い例：処理を関数として分離
container.addEventListener("click", function(event) {
  let action = event.target.dataset.action;

  if (action === "edit") {
    handleEdit(event.target);
  } else if (action === "delete") {
    handleDelete(event.target);
  }
});

function handleEdit(element) {
  // 編集処理
}

function handleDelete(element) {
  // 削除処理
}

// ❌ 悪い例：すべてを1つの関数に詰め込む
container.addEventListener("click", function(event) {
  if (event.target.dataset.action === "edit") {
    // 長い編集処理のコード...
  } else if (event.target.dataset.action === "delete") {
    // 長い削除処理のコード...
  }
  // コードが読みにくくなる
});
```

## 練習問題

次の仕様を満たすプログラムを作成してください。

### 仕様

1. **HTMLに以下の要素を作成する**
   - `id="itemInput"`のinput要素（プレースホルダー: アイテムを入力）
   - `id="addButton"`のbutton要素（テキスト: 追加）
   - `id="itemList"`のul要素

2. **JavaScriptで以下の機能を実装する**
   - 「追加」ボタンをクリックすると、入力されたテキストを持つli要素を`itemList`に追加する
   - 各li要素には以下の要素を含める：
     - アイテムのテキスト（spanタグ、クラス名: `item-text`）
     - 「削除」ボタン（buttonタグ、クラス名: `delete-button`）
   - **イベント委譲を使って**、以下の操作を実装する：
     - 「削除」ボタンをクリックすると、該当のli要素を削除
     - アイテムのテキスト部分をクリックすると、そのテキストをアラートで表示
   - 空の入力は無視する（アラートで警告）

3. **注意点**
   - イベント委譲を使うため、`itemList`（ul要素）にイベントリスナーを設定すること
   - `event.target`でどの要素がクリックされたかを判別すること
   - `classList.contains()`または`closest()`を使って要素を判別すること

### ヒント

```javascript
// イベント委譲の基本構造
itemList.addEventListener("click", function(event) {
  // 削除ボタンがクリックされた場合
  if (event.target.classList.contains("delete-button")) {
    // 削除処理
  }
  // アイテムテキストがクリックされた場合
  else if (event.target.classList.contains("item-text")) {
    // テキスト表示処理
  }
});
```

### 期待される動作

1. 「りんご」と入力して「追加」をクリック → リストに「りんご [削除]」が追加される
2. 「りんご」の部分をクリック → 「アイテム: りんご」とアラート表示
3. 「削除」ボタンをクリック → 「りんご」が削除される

## まとめ

このレッスンでは、以下のことを学びました。

1. **動的要素の問題**
   - 後から追加された要素にはイベントリスナーが設定されない
   - `querySelectorAll()`は実行時点の要素しか取得しない

2. **イベント委譲の基礎**
   - 親要素にイベントリスナーを設定する
   - イベントバブリングを利用して子要素のイベントをキャッチ
   - `event.target`で実際にクリックされた要素を判別

3. **親要素でキャッチする方法**
   - 1つのイベントリスナーで複数の子要素を管理
   - 動的に追加された要素にも自動的に対応
   - メモリ効率が良い

4. **event.targetとevent.currentTargetの違い**
   - `event.target`：実際にクリックされた要素
   - `event.currentTarget`：イベントリスナーが設定された要素

5. **実践的なパターン**
   - クラス名でチェック
   - data属性でアクションを管理
   - `closest()`メソッドで安全に親要素を取得
   - 処理の分離でコードを整理

6. **メリットとデメリット**
   - メリット：メモリ効率、動的要素対応、コード簡潔性
   - デメリット：条件チェックが必要、バブリングしないイベントには使えない

イベント委譲を使うことで、動的に生成される要素に対しても効率的にイベント処理ができるようになりました。この技術は、実際のWebアプリケーション開発で非常によく使われる重要なパターンです。次のレッスンでは、さらに高度なJavaScriptの技術について学んでいきます。
