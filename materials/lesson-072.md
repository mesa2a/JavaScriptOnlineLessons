# レッスン72：動的要素のイベント

## このレッスンで学ぶこと

このレッスンでは、JavaScriptで後から追加された要素に対するイベント処理の方法を学びます。動的に生成される要素は、通常のイベント設定では正しく動作しない場合があります。イベント委譲というパターンを使って、この問題を解決する方法を学びましょう。

## 後から追加した要素の問題

HTMLページが読み込まれた後に、JavaScriptで新しい要素を追加することがよくあります。しかし、これらの要素に対してイベントリスナーを設定する際に、問題が発生することがあります。

### 問題の例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>動的要素の問題</title>
</head>
<body>
    <h1>動的要素の問題</h1>
    <button id="addButton">ボタンを追加</button>
    <div id="container"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let addButton = document.getElementById("addButton");
let container = document.getElementById("container");

// 最初に存在するボタンにイベントを設定
let buttons = document.querySelectorAll(".dynamic-button");
buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    alert("クリックされました");
  });
});

// 新しいボタンを追加
addButton.addEventListener("click", function() {
  let newButton = document.createElement("button");
  newButton.className = "dynamic-button";
  newButton.textContent = "動的ボタン";
  container.appendChild(newButton);
});
```

このコードの問題点は、`querySelectorAll()`を実行した時点では動的ボタンがまだ存在していないため、後から追加されたボタンにはイベントリスナーが設定されないことです。

### なぜ動作しないのか

1. ページ読み込み時に`querySelectorAll()`が実行される
2. この時点では`.dynamic-button`要素が存在しない
3. 後からボタンを追加しても、そのボタンにはイベントリスナーが設定されていない

## 解決方法1：要素追加時にイベントを設定

最も単純な解決方法は、要素を追加するときに同時にイベントリスナーを設定することです。

```javascript
let addButton = document.getElementById("addButton");
let container = document.getElementById("container");

addButton.addEventListener("click", function() {
  let newButton = document.createElement("button");
  newButton.className = "dynamic-button";
  newButton.textContent = "動的ボタン";

  // 要素を追加すると同時にイベントを設定
  newButton.addEventListener("click", function() {
    alert("クリックされました");
  });

  container.appendChild(newButton);
});
```

この方法は動作しますが、要素が多くなるとメモリ使用量が増え、管理が難しくなります。

## 解決方法2：イベント委譲

イベント委譲は、親要素にイベントリスナーを設定し、イベントバブリングを利用して子要素のイベントをキャッチする方法です。これが最も推奨される方法です。

### イベント委譲の基礎

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>イベント委譲</title>
</head>
<body>
    <h1>イベント委譲の基礎</h1>
    <button id="addButton">ボタンを追加</button>
    <div id="container"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let addButton = document.getElementById("addButton");
let container = document.getElementById("container");

// 親要素（container）にイベントリスナーを設定
container.addEventListener("click", function(event) {
  // クリックされた要素がdynamic-buttonかチェック
  if (event.target.classList.contains("dynamic-button")) {
    alert("動的ボタンがクリックされました");
  }
});

// ボタンを追加
addButton.addEventListener("click", function() {
  let newButton = document.createElement("button");
  newButton.className = "dynamic-button";
  newButton.textContent = "動的ボタン " + (container.children.length + 1);
  container.appendChild(newButton);
});
```

この方法では、後から追加されたボタンでもイベントが正しく動作します。

### イベント委譲の仕組み

1. 親要素（container）にクリックイベントリスナーを設定
2. 子要素がクリックされると、イベントが親要素にバブリング（伝播）
3. `event.target`でどの要素がクリックされたかを判別
4. 該当する要素の場合のみ処理を実行

## 親要素でキャッチ

イベント委譲を使うと、親要素で子要素のイベントをキャッチできます。

### 実例：動的リスト

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>動的リスト</title>
    <style>
        .list-item {
            padding: 10px;
            margin: 5px 0;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            cursor: pointer;
        }
        .list-item:hover {
            background-color: #e0e0e0;
        }
        .delete-button {
            float: right;
            background-color: #ff4444;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>動的リスト</h1>
    <input type="text" id="itemInput" placeholder="アイテムを入力">
    <button id="addItem">追加</button>
    <ul id="itemList"></ul>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let itemInput = document.getElementById("itemInput");
let addItem = document.getElementById("addItem");
let itemList = document.getElementById("itemList");

// アイテムを追加
addItem.addEventListener("click", function() {
  let text = itemInput.value.trim();
  if (text === "") {
    return;
  }

  let li = document.createElement("li");
  li.className = "list-item";
  li.innerHTML = text + ' <button class="delete-button">削除</button>';
  itemList.appendChild(li);

  itemInput.value = "";
});

// イベント委譲：親要素（ul）にイベントリスナーを設定
itemList.addEventListener("click", function(event) {
  // 削除ボタンがクリックされた場合
  if (event.target.classList.contains("delete-button")) {
    let listItem = event.target.parentElement;
    itemList.removeChild(listItem);
  }
  // リストアイテム自体がクリックされた場合
  else if (event.target.classList.contains("list-item")) {
    alert("アイテム: " + event.target.textContent);
  }
});
```

このプログラムでは、後から追加されたリストアイテムと削除ボタンのすべてに対して、イベントが正しく動作します。

## event.targetとevent.currentTarget

イベント委譲を使う場合、`event.target`と`event.currentTarget`の違いを理解することが重要です。

**event.target**
- 実際にクリックされた要素（子要素）

**event.currentTarget**
- イベントリスナーが設定されている要素（親要素）

```javascript
container.addEventListener("click", function(event) {
  console.log("target:", event.target); // クリックされた子要素
  console.log("currentTarget:", event.currentTarget); // container要素
});
```

## 複数の要素タイプを処理する

イベント委譲を使うと、異なるタイプの要素を1つのイベントリスナーで処理できます。

### 実例：複合的な操作

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>複合操作</title>
    <style>
        .task {
            padding: 10px;
            margin: 10px 0;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .task-title {
            font-weight: bold;
            cursor: pointer;
        }
        .task-title:hover {
            color: blue;
        }
        .complete-button, .delete-button {
            margin: 5px;
            padding: 5px 10px;
            cursor: pointer;
        }
        .complete-button {
            background-color: #4CAF50;
            color: white;
            border: none;
        }
        .delete-button {
            background-color: #f44336;
            color: white;
            border: none;
        }
        .completed {
            background-color: #d4edda;
            text-decoration: line-through;
        }
    </style>
</head>
<body>
    <h1>タスク管理</h1>
    <input type="text" id="taskInput" placeholder="タスクを入力">
    <button id="addTask">タスク追加</button>
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

// タスクを追加
addTask.addEventListener("click", function() {
  let text = taskInput.value.trim();
  if (text === "") {
    return;
  }

  taskCount = taskCount + 1;

  let taskDiv = document.createElement("div");
  taskDiv.className = "task";
  taskDiv.dataset.id = taskCount;
  taskDiv.innerHTML =
    '<div class="task-title">' + text + '</div>' +
    '<button class="complete-button">完了</button>' +
    '<button class="delete-button">削除</button>';

  taskList.appendChild(taskDiv);
  taskInput.value = "";
});

// イベント委譲：すべてのボタンとタイトルのクリックを処理
taskList.addEventListener("click", function(event) {
  let target = event.target;

  // タイトルがクリックされた場合
  if (target.classList.contains("task-title")) {
    let taskDiv = target.parentElement;
    let taskId = taskDiv.dataset.id;
    alert("タスクID: " + taskId + "\n内容: " + target.textContent);
  }
  // 完了ボタンがクリックされた場合
  else if (target.classList.contains("complete-button")) {
    let taskDiv = target.parentElement;
    taskDiv.classList.toggle("completed");
  }
  // 削除ボタンがクリックされた場合
  else if (target.classList.contains("delete-button")) {
    let taskDiv = target.parentElement;
    if (confirm("このタスクを削除しますか")) {
      taskList.removeChild(taskDiv);
    }
  }
});
```

このプログラムでは、1つのイベントリスナーで、タスクのタイトルクリック、完了ボタン、削除ボタンのすべてを処理しています。

## イベント委譲のパターン

### パターン1：クラス名でチェック

```javascript
parent.addEventListener("click", function(event) {
  if (event.target.classList.contains("my-button")) {
    // 処理
  }
});
```

### パターン2：タグ名でチェック

```javascript
parent.addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    // 処理
  }
});
```

### パターン3：data属性でチェック

```javascript
parent.addEventListener("click", function(event) {
  if (event.target.dataset.action) {
    let action = event.target.dataset.action;
    // actionに応じた処理
  }
});
```

### パターン4：closest()メソッドを使う

```javascript
parent.addEventListener("click", function(event) {
  let button = event.target.closest(".my-button");
  if (button) {
    // ボタンまたはその子要素がクリックされた
  }
});
```

`closest()`は、クリックされた要素自身または最も近い親要素を検索します。

## 実践例：動的イベント管理システム

複雑な動的要素を管理するシステムを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>動的イベント管理</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
        }
        .input-area {
            margin: 20px 0;
            padding: 15px;
            background-color: #f5f5f5;
            border-radius: 4px;
        }
        input, select {
            padding: 8px;
            margin: 5px;
        }
        button {
            padding: 8px 16px;
            cursor: pointer;
            margin: 5px;
        }
        .card-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .card {
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 8px;
            background-color: white;
            transition: all 0.3s;
        }
        .card:hover {
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transform: translateY(-2px);
        }
        .card-title {
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 10px;
            cursor: pointer;
        }
        .card-title:hover {
            color: #2196F3;
        }
        .card-content {
            margin: 10px 0;
            color: #666;
        }
        .card-actions {
            margin-top: 10px;
            display: flex;
            gap: 5px;
        }
        .edit-button {
            background-color: #2196F3;
            color: white;
            border: none;
        }
        .delete-button {
            background-color: #f44336;
            color: white;
            border: none;
        }
        .favorite-button {
            background-color: #FFC107;
            color: white;
            border: none;
        }
        .card.favorite {
            border-color: #FFC107;
            background-color: #FFF9E6;
        }
    </style>
</head>
<body>
    <h1>動的カード管理システム</h1>

    <div class="input-area">
        <h3>新しいカードを追加</h3>
        <input type="text" id="titleInput" placeholder="タイトル">
        <input type="text" id="contentInput" placeholder="内容">
        <button id="addCard">カード追加</button>
    </div>

    <div id="cardContainer" class="card-container"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let titleInput = document.getElementById("titleInput");
let contentInput = document.getElementById("contentInput");
let addCard = document.getElementById("addCard");
let cardContainer = document.getElementById("cardContainer");
let cardIdCounter = 0;

// カードを追加
addCard.addEventListener("click", function() {
  let title = titleInput.value.trim();
  let content = contentInput.value.trim();

  if (title === "" || content === "") {
    alert("タイトルと内容を入力してください");
    return;
  }

  cardIdCounter = cardIdCounter + 1;

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
});

// イベント委譲：すべてのカード操作を1つのリスナーで処理
cardContainer.addEventListener("click", function(event) {
  let target = event.target;

  // タイトルクリック：詳細表示
  if (target.classList.contains("card-title")) {
    let card = target.closest(".card");
    let content = card.querySelector(".card-content").textContent;
    alert("タイトル: " + target.textContent + "\n内容: " + content);
  }

  // ボタンクリック：data-action属性で判別
  if (target.dataset.action) {
    let card = target.closest(".card");
    let action = target.dataset.action;

    if (action === "edit") {
      editCard(card);
    } else if (action === "favorite") {
      toggleFavorite(card);
    } else if (action === "delete") {
      deleteCard(card);
    }
  }
});

// カードを編集
function editCard(card) {
  let titleElement = card.querySelector(".card-title");
  let contentElement = card.querySelector(".card-content");

  let newTitle = prompt("新しいタイトル", titleElement.textContent);
  let newContent = prompt("新しい内容", contentElement.textContent);

  if (newTitle !== null && newTitle.trim() !== "") {
    titleElement.textContent = newTitle.trim();
  }
  if (newContent !== null && newContent.trim() !== "") {
    contentElement.textContent = newContent.trim();
  }
}

// お気に入り切り替え
function toggleFavorite(card) {
  card.classList.toggle("favorite");
}

// カードを削除
function deleteCard(card) {
  if (confirm("このカードを削除しますか")) {
    cardContainer.removeChild(card);
  }
}
```

このシステムでは、動的に追加されたすべてのカードに対して、タイトルクリック、編集、お気に入り、削除の各機能が正しく動作します。

## イベント委譲のメリット

1. **メモリ効率**：要素ごとにイベントリスナーを設定する必要がない
2. **動的要素対応**：後から追加された要素にも自動的に適用される
3. **コード簡潔性**：1つのイベントリスナーで複数の要素を管理できる
4. **パフォーマンス**：特に要素が多い場合、イベントリスナーの数が少ないため高速

## イベント委譲のデメリット

1. **イベントチェックのオーバーヘッド**：すべてのクリックで条件チェックが必要
2. **コードの複雑化**：どの要素がクリックされたか判別する必要がある
3. **バブリングしないイベント**：focus、blurなどはバブリングしない

## よくあるパターン

### パターン1：複数のアクションを処理

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
  }
});
```

### パターン2：ネストされた要素の処理

```javascript
container.addEventListener("click", function(event) {
  // 最も近い.itemクラスを持つ要素を取得
  let item = event.target.closest(".item");
  if (item) {
    let itemId = item.dataset.id;
    // 処理
  }
});
```

### パターン3：イベントの種類で分岐

```javascript
container.addEventListener("click", handleClick);
container.addEventListener("dblclick", handleDoubleClick);

function handleClick(event) {
  if (event.target.classList.contains("item")) {
    // 処理
  }
}

function handleDoubleClick(event) {
  if (event.target.classList.contains("item")) {
    // 処理
  }
}
```

## 注意点

### 1. stopPropagation()の影響

イベント委譲を使う場合、子要素で`stopPropagation()`を呼ぶと、親要素でイベントをキャッチできなくなります。

```javascript
// これをすると委譲が動作しない
childElement.addEventListener("click", function(event) {
  event.stopPropagation(); // 親要素にイベントが伝わらない
});
```

### 2. パフォーマンスの考慮

要素が非常に多い場合、条件チェックのコストを考慮する必要があります。

```javascript
// 効率的
if (event.target.classList.contains("button")) {
  // 処理
}

// 非効率的（すべての要素を検索）
let allButtons = container.querySelectorAll(".button");
allButtons.forEach(function(button) {
  if (button === event.target) {
    // 処理
  }
});
```

### 3. イベントが発生する要素の特定

クリックされた要素が期待する要素でない場合があります。`closest()`を使うと安全です。

```javascript
// 安全
let button = event.target.closest(".my-button");
if (button) {
  // 処理
}

// 危険（子要素がクリックされた場合に動作しない）
if (event.target.classList.contains("my-button")) {
  // 処理
}
```

## 練習問題

次の仕様を満たすプログラムを作成してください。

### 仕様

1. HTMLに以下の要素を作成する
   - `id="itemInput"`のinput要素
   - `id="addButton"`のbutton要素（テキスト: 追加）
   - `id="itemList"`のul要素

2. JavaScriptで以下の機能を実装する
   - 「追加」ボタンをクリックすると、入力されたテキストを持つli要素を`itemList`に追加する
   - 各li要素には「削除」ボタンを含める
   - イベント委譲を使って、「削除」ボタンをクリックすると該当のli要素を削除する
   - li要素のテキスト部分（削除ボタン以外）をクリックすると、そのテキストをアラートで表示する

### ヒント

- イベント委譲を使うため、`itemList`要素にイベントリスナーを設定します
- `event.target`でどの要素がクリックされたかを判別します
- `closest()`または`parentElement`で親要素を取得できます

## まとめ

このレッスンでは、以下のことを学びました。

1. 動的に追加された要素でイベントが動作しない問題
2. イベント委譲の基礎と仕組み
3. 親要素でイベントをキャッチする方法
4. `event.target`と`event.currentTarget`の違い
5. 複数の要素タイプを1つのイベントリスナーで処理する方法
6. イベント委譲のメリットとデメリット
7. 実践的な動的イベント管理システムの作成

イベント委譲を使うことで、動的に生成される要素に対しても効率的にイベント処理ができるようになりました。次のレッスンでは、さらに高度なJavaScriptの技術について学んでいきます。
