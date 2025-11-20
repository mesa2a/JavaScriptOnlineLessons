# レッスン71：複数イベントの管理

## このレッスンで学ぶこと

このレッスンでは、1つの要素に複数のイベントリスナーを設定する方法と、それらを効率的に管理する方法を学びます。複数のイベントを適切に管理することで、より柔軟で保守性の高いコードを書けるようになります。

## 同じ要素に複数イベント

1つの要素に、複数のイベントリスナーを設定することができます。これにより、同じ要素に対して異なる処理を組み合わせることができます。

### 基本例：同じイベントに複数のリスナー

同じ要素の同じイベントに、複数のリスナーを設定できます。

```javascript
let button = document.getElementById("myButton");

button.addEventListener("click", function() {
  console.log("1番目の処理");
});

button.addEventListener("click", function() {
  console.log("2番目の処理");
});

button.addEventListener("click", function() {
  console.log("3番目の処理");
});
```

このボタンをクリックすると、3つの処理がすべて実行されます。

### 実行順序

複数のイベントリスナーは、設定された順番に実行されます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>実行順序</title>
</head>
<body>
    <h1>複数イベントの実行順序</h1>
    <button id="testButton">クリック</button>
    <p id="log"></p>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let testButton = document.getElementById("testButton");
let log = document.getElementById("log");

testButton.addEventListener("click", function() {
  log.textContent = log.textContent + "A → ";
});

testButton.addEventListener("click", function() {
  log.textContent = log.textContent + "B → ";
});

testButton.addEventListener("click", function() {
  log.textContent = log.textContent + "C";
});
```

ボタンをクリックすると、「A → B → C」の順番で実行されます。

### 異なるイベントの組み合わせ

1つの要素に、異なる種類のイベントリスナーを設定することもできます。

```javascript
let input = document.getElementById("myInput");

input.addEventListener("focus", function() {
  console.log("フォーカスされました");
});

input.addEventListener("input", function() {
  console.log("入力されました");
});

input.addEventListener("blur", function() {
  console.log("フォーカスが外れました");
});
```

この場合、入力欄をクリックすると「フォーカスされました」、文字を入力すると「入力されました」、他の場所をクリックすると「フォーカスが外れました」と表示されます。

## 処理の分離

複数のイベント処理を管理しやすくするために、処理を関数として分離することが推奨されます。

### 無名関数を使う方法（あまり推奨されない）

```javascript
button.addEventListener("click", function() {
  console.log("処理1");
});

button.addEventListener("click", function() {
  console.log("処理2");
});
```

この方法では、後からリスナーを削除することが難しくなります。

### 名前付き関数を使う方法（推奨）

```javascript
function process1() {
  console.log("処理1");
}

function process2() {
  console.log("処理2");
}

button.addEventListener("click", process1);
button.addEventListener("click", process2);
```

この方法では、コードが読みやすく、後からリスナーを削除することも簡単です。

### 実例：入力フィールドの多機能化

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>多機能入力フィールド</title>
    <style>
        #input {
            padding: 10px;
            font-size: 16px;
            width: 300px;
        }
        .focused {
            background-color: lightyellow;
            outline: 2px solid blue;
        }
        #charCount {
            color: gray;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <h1>多機能入力フィールド</h1>
    <input type="text" id="input" placeholder="テキストを入力">
    <p id="charCount">文字数: 0</p>
    <p id="status"></p>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let input = document.getElementById("input");
let charCount = document.getElementById("charCount");
let status = document.getElementById("status");

// フォーカス時の処理
function handleFocus() {
  input.classList.add("focused");
  status.textContent = "入力中です";
}

// ブラー時の処理
function handleBlur() {
  input.classList.remove("focused");
  status.textContent = "入力が完了しました";
}

// 入力時の処理
function handleInput() {
  let length = input.value.length;
  charCount.textContent = "文字数: " + length;
}

// イベントリスナーを設定
input.addEventListener("focus", handleFocus);
input.addEventListener("blur", handleBlur);
input.addEventListener("input", handleInput);
```

このプログラムでは、3つの異なるイベントに対して、それぞれ独立した関数で処理を行っています。

## イベントリスナーの削除

`removeEventListener()`を使うと、設定したイベントリスナーを削除できます。

### 基本的な使い方

```javascript
function handleClick() {
  console.log("クリックされました");
}

// リスナーを追加
button.addEventListener("click", handleClick);

// リスナーを削除
button.removeEventListener("click", handleClick);
```

注意：リスナーを削除するためには、追加時と同じ関数を指定する必要があります。無名関数では削除できません。

### 1回だけ実行されるリスナー

```javascript
function handleClickOnce() {
  console.log("1回だけ実行されます");
  button.removeEventListener("click", handleClickOnce);
}

button.addEventListener("click", handleClickOnce);
```

または、`once`オプションを使う方法もあります。

```javascript
button.addEventListener("click", function() {
  console.log("1回だけ実行されます");
}, { once: true });
```

## イベントの優先順位

複数のイベントリスナーがある場合、どのような順序で実行されるかを理解することが重要です。

### 設定順に実行される

基本的に、イベントリスナーは設定された順番に実行されます。

```javascript
button.addEventListener("click", function() {
  console.log("1番目");
});

button.addEventListener("click", function() {
  console.log("2番目");
});
```

### stopImmediatePropagation()

`event.stopImmediatePropagation()`を使うと、同じ要素に設定された後続のイベントリスナーの実行を止めることができます。

```javascript
button.addEventListener("click", function(event) {
  console.log("1番目");
  event.stopImmediatePropagation(); // ここで後続のリスナーを止める
});

button.addEventListener("click", function() {
  console.log("2番目"); // これは実行されない
});

button.addEventListener("click", function() {
  console.log("3番目"); // これも実行されない
});
```

この場合、「1番目」だけが実行され、「2番目」と「3番目」は実行されません。

## 実践例：マルチイベント管理システム

複数のイベントを組み合わせた実用的な例を見てみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>マルチイベント管理</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
        }
        #interactiveBox {
            width: 400px;
            height: 300px;
            background-color: lightblue;
            border: 3px solid blue;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.3s;
        }
        .hover {
            background-color: lightcoral;
            border-color: red;
        }
        .active {
            transform: scale(0.95);
        }
        #eventLog {
            margin-top: 20px;
            padding: 10px;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            max-height: 200px;
            overflow-y: auto;
            font-family: monospace;
            font-size: 12px;
        }
        .log-entry {
            margin: 2px 0;
            padding: 2px;
        }
        .controls {
            margin: 20px 0;
        }
        button {
            padding: 8px 16px;
            margin: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>マルチイベント管理デモ</h1>
    <p>ボックスをクリック、ホバー、ダブルクリックしてみてください</p>

    <div id="interactiveBox">インタラクティブボックス</div>

    <div class="controls">
        <button id="enableAll">すべて有効</button>
        <button id="disableClick">クリック無効</button>
        <button id="disableHover">ホバー無効</button>
        <button id="clearLog">ログクリア</button>
    </div>

    <div id="eventLog">
        <strong>イベントログ:</strong>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let interactiveBox = document.getElementById("interactiveBox");
let eventLog = document.getElementById("eventLog");
let enableAll = document.getElementById("enableAll");
let disableClick = document.getElementById("disableClick");
let disableHover = document.getElementById("disableHover");
let clearLog = document.getElementById("clearLog");

let eventCount = 0;

// ログ記録用の関数
function logEvent(eventName) {
  eventCount = eventCount + 1;
  let entry = document.createElement("div");
  entry.className = "log-entry";
  let time = new Date().toLocaleTimeString();
  entry.textContent = eventCount + ". [" + time + "] " + eventName;
  eventLog.appendChild(entry);
  eventLog.scrollTop = eventLog.scrollHeight;
}

// クリックイベントの処理関数
function handleClick(event) {
  logEvent("クリック");
  console.log("クリックされました");
}

// ダブルクリックイベントの処理関数
function handleDoubleClick(event) {
  logEvent("ダブルクリック");
  console.log("ダブルクリックされました");
}

// マウスオーバーの処理関数
function handleMouseOver(event) {
  interactiveBox.classList.add("hover");
  logEvent("マウスオーバー");
}

// マウスアウトの処理関数
function handleMouseOut(event) {
  interactiveBox.classList.remove("hover");
  logEvent("マウスアウト");
}

// マウスダウンの処理関数
function handleMouseDown(event) {
  interactiveBox.classList.add("active");
  logEvent("マウスダウン");
}

// マウスアップの処理関数
function handleMouseUp(event) {
  interactiveBox.classList.remove("active");
  logEvent("マウスアップ");
}

// すべてのイベントリスナーを設定
function enableAllEvents() {
  interactiveBox.addEventListener("click", handleClick);
  interactiveBox.addEventListener("dblclick", handleDoubleClick);
  interactiveBox.addEventListener("mouseover", handleMouseOver);
  interactiveBox.addEventListener("mouseout", handleMouseOut);
  interactiveBox.addEventListener("mousedown", handleMouseDown);
  interactiveBox.addEventListener("mouseup", handleMouseUp);
  logEvent("すべてのイベントを有効化");
}

// クリックイベントを無効化
function disableClickEvent() {
  interactiveBox.removeEventListener("click", handleClick);
  interactiveBox.removeEventListener("dblclick", handleDoubleClick);
  logEvent("クリックイベントを無効化");
}

// ホバーイベントを無効化
function disableHoverEvent() {
  interactiveBox.removeEventListener("mouseover", handleMouseOver);
  interactiveBox.removeEventListener("mouseout", handleMouseOut);
  logEvent("ホバーイベントを無効化");
}

// ログをクリア
function clearEventLog() {
  eventLog.innerHTML = "<strong>イベントログ:</strong>";
  eventCount = 0;
}

// 初期設定：すべてのイベントを有効化
enableAllEvents();

// コントロールボタンのイベント設定
enableAll.addEventListener("click", enableAllEvents);
disableClick.addEventListener("click", disableClickEvent);
disableHover.addEventListener("click", disableHoverEvent);
clearLog.addEventListener("click", clearEventLog);
```

このプログラムでは、1つの要素に6つの異なるイベントリスナーを設定し、それらを動的に有効化・無効化できます。

## 関心の分離

複雑なアプリケーションでは、イベント処理を機能ごとに分離することが重要です。

### 悪い例：すべてを1つの関数に詰め込む

```javascript
button.addEventListener("click", function() {
  // ログ記録
  console.log("クリックされました");

  // UI更新
  element.style.backgroundColor = "red";

  // データ保存
  localStorage.setItem("clicked", "true");

  // 通知表示
  alert("クリックされました");
});
```

### 良い例：処理を分離する

```javascript
function logClick() {
  console.log("クリックされました");
}

function updateUI() {
  element.style.backgroundColor = "red";
}

function saveData() {
  localStorage.setItem("clicked", "true");
}

function showNotification() {
  alert("クリックされました");
}

button.addEventListener("click", logClick);
button.addEventListener("click", updateUI);
button.addEventListener("click", saveData);
button.addEventListener("click", showNotification);
```

この方法では、各処理が独立しているため、テストやメンテナンスが容易になります。

## 実践例：タスク管理アプリ

複数のイベントを効果的に管理するタスク管理アプリを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>タスク管理</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }
        .task-input {
            display: flex;
            margin-bottom: 20px;
        }
        #taskInput {
            flex: 1;
            padding: 10px;
            font-size: 16px;
        }
        #addButton {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }
        .task-item {
            padding: 15px;
            margin: 10px 0;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s;
        }
        .task-item:hover {
            background-color: #e9e9e9;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .task-item.completed {
            background-color: #d4edda;
            text-decoration: line-through;
            opacity: 0.7;
        }
        .task-text {
            flex: 1;
            cursor: pointer;
        }
        .delete-button {
            padding: 5px 10px;
            background-color: #dc3545;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }
        .delete-button:hover {
            background-color: #c82333;
        }
    </style>
</head>
<body>
    <h1>タスク管理アプリ</h1>

    <div class="task-input">
        <input type="text" id="taskInput" placeholder="新しいタスクを入力">
        <button id="addButton">追加</button>
    </div>

    <div id="taskList"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let taskList = document.getElementById("taskList");

// タスクを追加する関数
function addTask() {
  let taskText = taskInput.value.trim();
  if (taskText === "") {
    return;
  }

  // タスクアイテムを作成
  let taskItem = document.createElement("div");
  taskItem.className = "task-item";

  let taskTextSpan = document.createElement("span");
  taskTextSpan.className = "task-text";
  taskTextSpan.textContent = taskText;

  let deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "削除";

  taskItem.appendChild(taskTextSpan);
  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);

  // イベントリスナーを設定
  setupTaskEvents(taskItem, taskTextSpan, deleteButton);

  // 入力欄をクリア
  taskInput.value = "";
}

// タスクアイテムにイベントを設定する関数
function setupTaskEvents(taskItem, taskTextSpan, deleteButton) {
  // クリックで完了/未完了を切り替え
  taskTextSpan.addEventListener("click", function() {
    toggleTaskCompletion(taskItem);
  });

  // ダブルクリックで編集モード
  taskTextSpan.addEventListener("dblclick", function(event) {
    event.stopPropagation();
    editTask(taskTextSpan);
  });

  // ホバーでハイライト（CSSで処理）

  // 削除ボタン
  deleteButton.addEventListener("click", function(event) {
    event.stopPropagation();
    deleteTask(taskItem);
  });
}

// タスクの完了状態を切り替える関数
function toggleTaskCompletion(taskItem) {
  taskItem.classList.toggle("completed");
}

// タスクを編集する関数
function editTask(taskTextSpan) {
  let currentText = taskTextSpan.textContent;
  let newText = prompt("タスクを編集", currentText);

  if (newText !== null && newText.trim() !== "") {
    taskTextSpan.textContent = newText.trim();
  }
}

// タスクを削除する関数
function deleteTask(taskItem) {
  if (confirm("このタスクを削除しますか")) {
    taskList.removeChild(taskItem);
  }
}

// 追加ボタンのイベント
addButton.addEventListener("click", addTask);

// Enterキーで追加
taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});
```

このアプリでは、各タスクアイテムに複数のイベント（クリック、ダブルクリック、削除）を設定し、それぞれを独立した関数で管理しています。

## よくあるパターン

### パターン1：イベントの一括設定

```javascript
let events = ["click", "mouseover", "mouseout"];
let element = document.getElementById("myElement");

events.forEach(function(eventType) {
  element.addEventListener(eventType, function() {
    console.log(eventType + " イベントが発生しました");
  });
});
```

### パターン2：条件付きイベント実行

```javascript
let isEnabled = true;

function handleClick(event) {
  if (!isEnabled) {
    return; // イベントが無効の場合は何もしない
  }
  console.log("処理を実行");
}

button.addEventListener("click", handleClick);
```

### パターン3：イベントのグループ管理

```javascript
let eventHandlers = {
  click: function() { console.log("クリック"); },
  mouseover: function() { console.log("ホバー"); },
  mouseout: function() { console.log("ホバー解除"); }
};

Object.keys(eventHandlers).forEach(function(eventType) {
  element.addEventListener(eventType, eventHandlers[eventType]);
});
```

## 注意点

### 1. メモリリーク

要素を削除する前に、イベントリスナーを削除しないと、メモリリークが発生する可能性があります。

```javascript
// 悪い例
element.remove(); // リスナーが残ったまま

// 良い例
element.removeEventListener("click", handleClick);
element.remove();
```

### 2. 無名関数の削除不可

無名関数で設定したリスナーは、後から削除できません。

```javascript
// 削除できない
button.addEventListener("click", function() {
  console.log("削除できません");
});

// 削除できる
function handleClick() {
  console.log("削除できます");
}
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);
```

### 3. イベントの重複登録

同じ関数を複数回登録しても、実行されるのは1回だけです。

```javascript
button.addEventListener("click", handleClick);
button.addEventListener("click", handleClick); // 無視される
```

## 練習問題

次の仕様を満たすプログラムを作成してください。

### 仕様

1. HTMLに以下の要素を作成する
   - `id="box"`のdiv要素（幅: 200px、高さ: 200px、背景色: lightblue）
   - `id="clickCount"`のp要素
   - `id="hoverStatus"`のp要素
   - `id="enableClick"`のbutton要素（テキスト: クリックイベント有効）
   - `id="disableClick"`のbutton要素（テキスト: クリックイベント無効）

2. JavaScriptで以下の機能を実装する
   - boxをクリックすると、クリック回数をカウントし`clickCount`に表示する
   - boxにマウスオーバーすると、`hoverStatus`に「マウスオーバー中」と表示する
   - boxからマウスアウトすると、`hoverStatus`に「マウスアウト」と表示する
   - 「クリックイベント有効」ボタンをクリックすると、boxのクリックイベントを有効にする
   - 「クリックイベント無効」ボタンをクリックすると、boxのクリックイベントを無効にする

### ヒント

- クリック回数は変数で管理します
- `removeEventListener()`でイベントを無効化できます
- イベントハンドラは名前付き関数として定義します

## まとめ

このレッスンでは、以下のことを学びました。

1. 同じ要素に複数のイベントリスナーを設定する方法
2. イベントリスナーの実行順序
3. 処理の分離と名前付き関数の活用
4. `removeEventListener()`でイベントを削除する方法
5. `stopImmediatePropagation()`で後続のリスナーを停止する方法
6. 関心の分離によるコードの整理
7. 実践的なマルチイベント管理の例

複数のイベントを適切に管理することで、より複雑で機能的なWebアプリケーションを作成できるようになりました。次のレッスンでは、さらに高度なJavaScriptの技術について学んでいきます。
