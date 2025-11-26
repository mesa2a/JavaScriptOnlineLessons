---
title: "Lesson 071: 複数イベントの管理"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン71：複数イベントの管理

## このレッスンで学ぶこと

このレッスンでは、1つの要素に複数のイベントリスナーを設定する方法と、それらを効率的に管理する方法を学びます。実際のWebアプリケーションでは、1つのボタンやフォームに複数の処理を組み合わせることが多いため、この技術は非常に重要です。

## なぜ複数イベントの管理が必要なのか

実際のWebサイトでは、1つの要素に対して複数の処理が必要になることがよくあります。

### 実例：Twitterの投稿ボタン

Twitterの投稿ボタンをクリックすると、以下のような複数の処理が実行されます：

1. 投稿内容のバリデーション（文字数チェック）
2. 投稿データの送信
3. ログの記録
4. アニメーションの表示
5. 画面の更新

このような複数の処理を、1つのイベントで管理する必要があります。

## 基本：同じ要素に複数のイベントリスナー

### まずは試してみよう

1つの要素に、同じイベントの複数のリスナーを設定できます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>複数イベントの基本</title>
</head>
<body>
    <h1>複数イベントリスナーの基本</h1>
    <button id="myButton">クリックしてください</button>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let button = document.getElementById("myButton");

// 1つ目のイベントリスナー
button.addEventListener("click", function() {
  console.log("1番目の処理が実行されました");
});

// 2つ目のイベントリスナー
button.addEventListener("click", function() {
  console.log("2番目の処理が実行されました");
});

// 3つ目のイベントリスナー
button.addEventListener("click", function() {
  console.log("3番目の処理が実行されました");
});
```

**実行結果：**
ボタンをクリックすると、コンソールに以下のように表示されます：
```
1番目の処理が実行されました
2番目の処理が実行されました
3番目の処理が実行されました
```

### 重要なポイント

- 複数のイベントリスナーは、**設定した順番に実行**されます
- 全てのリスナーが実行されます（途中で止まりません）
- それぞれのリスナーは独立して動作します

## 実行順序を確認してみよう

複数のイベントリスナーがどの順番で実行されるか、画面で確認できるプログラムを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>実行順序の確認</title>
    <style>
        #log {
            font-size: 20px;
            padding: 20px;
            background-color: #f0f0f0;
            margin-top: 20px;
            border: 2px solid #333;
        }
        button {
            padding: 15px 30px;
            font-size: 18px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>実行順序の確認</h1>
    <button id="testButton">クリックして実行順序を確認</button>
    <p id="log"></p>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let testButton = document.getElementById("testButton");
let log = document.getElementById("log");

// 1番目のリスナー
testButton.addEventListener("click", function() {
  log.textContent = log.textContent + "A → ";
  console.log("処理A: 最初の処理");
});

// 2番目のリスナー
testButton.addEventListener("click", function() {
  log.textContent = log.textContent + "B → ";
  console.log("処理B: 2番目の処理");
});

// 3番目のリスナー
testButton.addEventListener("click", function() {
  log.textContent = log.textContent + "C";
  console.log("処理C: 最後の処理");
});
```

ボタンをクリックすると、画面に「A → B → C」と表示されます。何度クリックしても、常にこの順序で実行されることを確認してください。

## 異なる種類のイベントを組み合わせる

1つの要素に、異なる種類のイベントリスナーを設定することもできます。

### 実例：入力フィールドの監視

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>複数種類のイベント</title>
    <style>
        #myInput {
            padding: 10px;
            font-size: 16px;
            width: 300px;
            margin: 10px 0;
        }
        .status {
            color: gray;
            font-size: 14px;
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <h1>入力フィールドのイベント監視</h1>
    <input type="text" id="myInput" placeholder="何か入力してください">
    <p class="status" id="focusStatus"></p>
    <p class="status" id="inputStatus"></p>
    <p class="status" id="blurStatus"></p>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let input = document.getElementById("myInput");
let focusStatus = document.getElementById("focusStatus");
let inputStatus = document.getElementById("inputStatus");
let blurStatus = document.getElementById("blurStatus");

// フォーカスイベント（入力欄をクリックしたとき）
input.addEventListener("focus", function() {
  focusStatus.textContent = "✓ フォーカスされました";
  console.log("入力欄がフォーカスされました");
});

// 入力イベント（文字を入力したとき）
input.addEventListener("input", function() {
  inputStatus.textContent = "✓ 入力されました: " + input.value;
  console.log("入力内容: " + input.value);
});

// ブラーイベント（入力欄からフォーカスが外れたとき）
input.addEventListener("blur", function() {
  blurStatus.textContent = "✓ フォーカスが外れました";
  console.log("入力欄からフォーカスが外れました");
});
```

**動作の流れ：**
1. 入力欄をクリック → 「フォーカスされました」と表示
2. 文字を入力 → 「入力されました: ○○」と表示
3. 他の場所をクリック → 「フォーカスが外れました」と表示

## 処理の分離：名前付き関数を使う

複数のイベント処理を管理しやすくするために、処理を関数として分離することが重要です。

### 悪い例：無名関数を使う（あまり推奨されない）

```javascript
button.addEventListener("click", function() {
  console.log("処理1");
});

button.addEventListener("click", function() {
  console.log("処理2");
});
```

**問題点：**
- 後からリスナーを削除することができない
- コードが読みにくい
- 同じ処理を他の場所で再利用できない

### 良い例：名前付き関数を使う（推奨）

```javascript
// 処理を関数として定義
function process1() {
  console.log("処理1");
}

function process2() {
  console.log("処理2");
}

// イベントリスナーに関数を設定
button.addEventListener("click", process1);
button.addEventListener("click", process2);
```

**メリット：**
- コードが読みやすい
- 後からリスナーを削除できる
- 関数を他の場所で再利用できる
- デバッグが簡単

## 実践例：多機能入力フィールド

名前付き関数を使って、複数のイベントを管理する実用的な例を見てみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>多機能入力フィールド</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }
        #input {
            padding: 10px;
            font-size: 16px;
            width: 100%;
            box-sizing: border-box;
            border: 2px solid #ccc;
            transition: all 0.3s;
        }
        .focused {
            background-color: lightyellow;
            border-color: blue;
        }
        #charCount {
            color: gray;
            font-size: 14px;
            margin-top: 10px;
        }
        #status {
            color: blue;
            font-weight: bold;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <h1>多機能入力フィールド</h1>
    <p>入力欄をクリックしたり、文字を入力したりしてみてください</p>

    <input type="text" id="input" placeholder="テキストを入力してください">
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

// フォーカス時の処理を関数として定義
function handleFocus() {
  input.classList.add("focused");
  status.textContent = "入力中です";
  console.log("入力フィールドにフォーカスしました");
}

// ブラー時の処理を関数として定義
function handleBlur() {
  input.classList.remove("focused");
  status.textContent = "入力が完了しました";
  console.log("入力フィールドからフォーカスが外れました");
}

// 入力時の処理を関数として定義
function handleInput() {
  let length = input.value.length;
  charCount.textContent = "文字数: " + length;
  console.log("現在の文字数: " + length);
}

// イベントリスナーを設定
input.addEventListener("focus", handleFocus);
input.addEventListener("blur", handleBlur);
input.addEventListener("input", handleInput);
```

このプログラムでは、3つの異なるイベント（focus、blur、input）に対して、それぞれ独立した関数で処理を行っています。

## イベントリスナーの削除

`removeEventListener()`を使うと、設定したイベントリスナーを削除できます。これは、イベントが不要になったときやメモリを節約したいときに使います。

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

**重要な注意点：**
リスナーを削除するためには、追加時と**まったく同じ関数**を指定する必要があります。

### 無名関数は削除できない

```javascript
// これは削除できません
button.addEventListener("click", function() {
  console.log("これは削除できません");
});

// removeEventListenerで削除しようとしても、関数の参照が違うため削除できない
button.removeEventListener("click", function() {
  console.log("これは削除できません");
});
```

### 実例：イベントの有効化・無効化

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>イベントの削除</title>
    <style>
        button {
            padding: 10px 20px;
            font-size: 16px;
            margin: 5px;
            cursor: pointer;
        }
        #clickButton {
            padding: 20px 40px;
            font-size: 20px;
            background-color: lightblue;
        }
        #clickCount {
            font-size: 24px;
            color: blue;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <h1>イベントの有効化・無効化</h1>
    <button id="clickButton">クリックしてください</button>
    <p id="clickCount">クリック回数: 0</p>

    <button id="enableButton">クリックイベント有効</button>
    <button id="disableButton">クリックイベント無効</button>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let clickButton = document.getElementById("clickButton");
let clickCount = document.getElementById("clickCount");
let enableButton = document.getElementById("enableButton");
let disableButton = document.getElementById("disableButton");

let count = 0;

// クリック処理を関数として定義
function handleClick() {
  count = count + 1;
  clickCount.textContent = "クリック回数: " + count;
  console.log("クリックされました（" + count + "回目）");
}

// 最初はイベントリスナーを設定
clickButton.addEventListener("click", handleClick);

// イベントを有効にするボタン
enableButton.addEventListener("click", function() {
  clickButton.addEventListener("click", handleClick);
  console.log("クリックイベントを有効にしました");
});

// イベントを無効にするボタン
disableButton.addEventListener("click", function() {
  clickButton.removeEventListener("click", handleClick);
  console.log("クリックイベントを無効にしました");
});
```

このプログラムでは、「クリックイベント無効」ボタンを押すと、青いボタンが反応しなくなります。「クリックイベント有効」ボタンを押すと、再び反応するようになります。

### 1回だけ実行されるイベント

イベントを1回だけ実行したい場合は、2つの方法があります。

**方法1：実行後に削除する**

```javascript
function handleClickOnce() {
  console.log("1回だけ実行されます");
  // 実行後にリスナーを削除
  button.removeEventListener("click", handleClickOnce);
}

button.addEventListener("click", handleClickOnce);
```

**方法2：onceオプションを使う（推奨）**

```javascript
button.addEventListener("click", function() {
  console.log("1回だけ実行されます");
}, { once: true });
```

`{ once: true }`オプションを使うと、自動的に1回の実行後にリスナーが削除されます。

## イベントの優先順位と実行制御

### 基本：設定順に実行される

複数のイベントリスナーは、基本的に設定された順番に実行されます。

```javascript
button.addEventListener("click", function() {
  console.log("1番目");
});

button.addEventListener("click", function() {
  console.log("2番目");
});

button.addEventListener("click", function() {
  console.log("3番目");
});

// 実行結果：1番目 → 2番目 → 3番目
```

### stopImmediatePropagation()で後続を停止

`event.stopImmediatePropagation()`を使うと、同じ要素に設定された**後続のイベントリスナーの実行を止める**ことができます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>stopImmediatePropagation</title>
    <style>
        button {
            padding: 20px 40px;
            font-size: 18px;
            cursor: pointer;
        }
        #log {
            margin-top: 20px;
            padding: 10px;
            background-color: #f0f0f0;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <h1>stopImmediatePropagation の動作</h1>
    <button id="testButton">クリックしてください</button>
    <p id="log"></p>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let testButton = document.getElementById("testButton");
let log = document.getElementById("log");

// 1番目のリスナー
testButton.addEventListener("click", function(event) {
  log.textContent = log.textContent + "1番目の処理が実行されました\n";
  console.log("1番目");

  // ここで後続のリスナーを止める
  event.stopImmediatePropagation();
  log.textContent = log.textContent + "→ ここで後続のリスナーを停止しました\n";
});

// 2番目のリスナー（実行されない）
testButton.addEventListener("click", function() {
  log.textContent = log.textContent + "2番目の処理が実行されました\n";
  console.log("2番目");
});

// 3番目のリスナー（実行されない）
testButton.addEventListener("click", function() {
  log.textContent = log.textContent + "3番目の処理が実行されました\n";
  console.log("3番目");
});
```

ボタンをクリックすると、1番目の処理だけが実行され、2番目と3番目は実行されません。

**使用例：**
- フォームのバリデーションで、エラーがある場合に後続の送信処理を止める
- ゲームで、すでに処理中の場合に追加のクリックを無効にする

## 実践例：マルチイベント管理システム

複数のイベントを組み合わせた実用的な例を作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>マルチイベント管理デモ</title>
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
            margin: 20px auto;
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
            text-align: center;
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

```javascript
let interactiveBox = document.getElementById("interactiveBox");
let eventLog = document.getElementById("eventLog");
let enableAll = document.getElementById("enableAll");
let disableClick = document.getElementById("disableClick");
let disableHover = document.getElementById("disableHover");
let clearLog = document.getElementById("clearLog");

let eventCount = 0;

// ログを記録する関数
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
  console.log("ボックスがクリックされました");
}

// ダブルクリックイベントの処理関数
function handleDoubleClick(event) {
  logEvent("ダブルクリック");
  console.log("ボックスがダブルクリックされました");
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

// すべてのイベントリスナーを設定する関数
function enableAllEvents() {
  interactiveBox.addEventListener("click", handleClick);
  interactiveBox.addEventListener("dblclick", handleDoubleClick);
  interactiveBox.addEventListener("mouseover", handleMouseOver);
  interactiveBox.addEventListener("mouseout", handleMouseOut);
  interactiveBox.addEventListener("mousedown", handleMouseDown);
  interactiveBox.addEventListener("mouseup", handleMouseUp);
  logEvent("すべてのイベントを有効化");
}

// クリックイベントを無効化する関数
function disableClickEvent() {
  interactiveBox.removeEventListener("click", handleClick);
  interactiveBox.removeEventListener("dblclick", handleDoubleClick);
  logEvent("クリックイベントを無効化");
}

// ホバーイベントを無効化する関数
function disableHoverEvent() {
  interactiveBox.removeEventListener("mouseover", handleMouseOver);
  interactiveBox.removeEventListener("mouseout", handleMouseOut);
  logEvent("ホバーイベントを無効化");
}

// ログをクリアする関数
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

このプログラムでは、1つの要素（interactiveBox）に6つの異なるイベントリスナーを設定し、それらを動的に有効化・無効化できます。

**このプログラムの特徴：**
- 複数のイベント（click、dblclick、mouseover、mouseout、mousedown、mouseup）を1つの要素に設定
- 各イベント処理を独立した関数として定義
- イベントリスナーの追加・削除を動的に管理
- 発生したイベントをログとして記録

## 関心の分離：処理を機能ごとに分ける

複雑なアプリケーションでは、イベント処理を機能ごとに分離することが重要です。

### 悪い例：すべてを1つの関数に詰め込む

```javascript
button.addEventListener("click", function() {
  // ログ記録
  console.log("クリックされました");
  let time = new Date().toLocaleTimeString();
  console.log("時刻: " + time);

  // UI更新
  element.style.backgroundColor = "red";
  element.textContent = "クリック済み";

  // データ保存
  localStorage.setItem("clicked", "true");
  localStorage.setItem("clickTime", time);

  // 通知表示
  alert("クリックされました");
});
```

**問題点：**
- 1つの関数が複数の責任を持っている
- コードが読みにくい
- テストが難しい
- 一部の処理だけを無効にすることができない
- 再利用できない

### 良い例：処理を分離する

```javascript
// ログを記録する処理
function logClick() {
  console.log("クリックされました");
  let time = new Date().toLocaleTimeString();
  console.log("時刻: " + time);
}

// UIを更新する処理
function updateUI() {
  element.style.backgroundColor = "red";
  element.textContent = "クリック済み";
}

// データを保存する処理
function saveData() {
  localStorage.setItem("clicked", "true");
  let time = new Date().toLocaleTimeString();
  localStorage.setItem("clickTime", time);
}

// 通知を表示する処理
function showNotification() {
  alert("クリックされました");
}

// イベントリスナーを個別に設定
button.addEventListener("click", logClick);
button.addEventListener("click", updateUI);
button.addEventListener("click", saveData);
button.addEventListener("click", showNotification);
```

**メリット：**
- 各処理が独立している
- コードが読みやすい
- テストが簡単
- 一部の処理だけを無効にできる
- 関数を他の場所で再利用できる

**一部の処理を無効にする例：**
```javascript
// 通知だけを無効にする
button.removeEventListener("click", showNotification);
```

## 実践例：タスク管理アプリ

複数のイベントを効果的に管理する、実用的なタスク管理アプリを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>タスク管理アプリ</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        h1 {
            color: #333;
        }
        .task-input {
            display: flex;
            margin-bottom: 20px;
        }
        #taskInput {
            flex: 1;
            padding: 10px;
            font-size: 16px;
            border: 2px solid #ddd;
            border-radius: 4px 0 0 4px;
        }
        #addButton {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
        }
        #addButton:hover {
            background-color: #45a049;
        }
        .task-item {
            padding: 15px;
            margin: 10px 0;
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s;
        }
        .task-item:hover {
            background-color: #f9f9f9;
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
    <p>タスクをクリックで完了/未完了を切り替え、ダブルクリックで編集できます</p>

    <div class="task-input">
        <input type="text" id="taskInput" placeholder="新しいタスクを入力してください">
        <button id="addButton">追加</button>
    </div>

    <div id="taskList"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let taskList = document.getElementById("taskList");

// タスクを追加する関数
function addTask() {
  let taskText = taskInput.value.trim();

  // 空の入力は無視
  if (taskText === "") {
    alert("タスクを入力してください");
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
  taskInput.focus();

  console.log("タスクを追加しました: " + taskText);
}

// タスクアイテムにイベントを設定する関数
function setupTaskEvents(taskItem, taskTextSpan, deleteButton) {
  // クリックで完了/未完了を切り替え
  taskTextSpan.addEventListener("click", function() {
    toggleTaskCompletion(taskItem);
  });

  // ダブルクリックで編集モード
  taskTextSpan.addEventListener("dblclick", function(event) {
    event.stopPropagation(); // クリックイベントが発生しないようにする
    editTask(taskTextSpan);
  });

  // 削除ボタン
  deleteButton.addEventListener("click", function(event) {
    event.stopPropagation(); // クリックイベントが親要素に伝わらないようにする
    deleteTask(taskItem);
  });
}

// タスクの完了状態を切り替える関数
function toggleTaskCompletion(taskItem) {
  taskItem.classList.toggle("completed");

  if (taskItem.classList.contains("completed")) {
    console.log("タスクを完了にしました");
  } else {
    console.log("タスクを未完了に戻しました");
  }
}

// タスクを編集する関数
function editTask(taskTextSpan) {
  let currentText = taskTextSpan.textContent;
  let newText = prompt("タスクを編集してください", currentText);

  if (newText !== null && newText.trim() !== "") {
    taskTextSpan.textContent = newText.trim();
    console.log("タスクを編集しました: " + currentText + " → " + newText);
  }
}

// タスクを削除する関数
function deleteTask(taskItem) {
  if (confirm("このタスクを削除しますか？")) {
    let taskText = taskItem.querySelector(".task-text").textContent;
    taskList.removeChild(taskItem);
    console.log("タスクを削除しました: " + taskText);
  }
}

// 追加ボタンのクリックイベント
addButton.addEventListener("click", addTask);

// Enterキーで追加
taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});
```

このアプリでは、各タスクアイテムに複数のイベント（クリック、ダブルクリック、削除ボタン）を設定し、それぞれを独立した関数で管理しています。

**このアプリの機能：**
- タスクの追加（Enterキーでも追加可能）
- クリックで完了/未完了の切り替え
- ダブルクリックでタスクの編集
- 削除ボタンでタスクの削除
- 各機能が独立した関数として実装されている

## よくあるパターン

### パターン1：イベントの一括設定

複数のイベントタイプに同じ処理を設定したい場合、配列とループを使って一括設定できます。

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

フラグを使って、イベント処理を条件付きで実行することができます。

```javascript
let isEnabled = true;

function handleClick(event) {
  if (!isEnabled) {
    console.log("イベントは無効です");
    return; // 処理を中断
  }
  console.log("処理を実行します");
  // ここに実際の処理を書く
}

button.addEventListener("click", handleClick);

// イベントを無効にする
isEnabled = false;

// イベントを有効にする
isEnabled = true;
```

### パターン3：イベントのグループ管理

オブジェクトを使って、複数のイベントハンドラを管理することができます。

```javascript
let eventHandlers = {
  click: function() {
    console.log("クリックされました");
  },
  mouseover: function() {
    console.log("マウスオーバーしました");
  },
  mouseout: function() {
    console.log("マウスアウトしました");
  }
};

let element = document.getElementById("myElement");

// すべてのイベントを設定
Object.keys(eventHandlers).forEach(function(eventType) {
  element.addEventListener(eventType, eventHandlers[eventType]);
});

// すべてのイベントを削除
Object.keys(eventHandlers).forEach(function(eventType) {
  element.removeEventListener(eventType, eventHandlers[eventType]);
});
```

## 注意点とベストプラクティス

### 1. メモリリークに注意

要素を削除する前に、イベントリスナーを削除しないと、メモリリークが発生する可能性があります。

```javascript
// 悪い例：リスナーを削除せずに要素を削除
element.remove(); // リスナーが残ったまま

// 良い例：リスナーを削除してから要素を削除
element.removeEventListener("click", handleClick);
element.remove();
```

**特に動的に要素を追加・削除する場合は注意が必要です。**

### 2. 無名関数は削除できない

無名関数で設定したリスナーは、後から削除できません。削除の可能性がある場合は、必ず名前付き関数を使いましょう。

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
function handleClick() {
  console.log("クリックされました");
}

button.addEventListener("click", handleClick);
button.addEventListener("click", handleClick); // 2回目は無視される

// クリックしても「クリックされました」は1回だけ表示される
```

### 4. イベントハンドラの命名規則

イベントハンドラの関数名は、何をするかが分かりやすい名前にしましょう。

```javascript
// 良い例
function handleClick() { }
function handleSubmit() { }
function validateInput() { }
function updateDisplay() { }

// 悪い例
function func1() { }
function doSomething() { }
function process() { }
```

## 練習問題

次の仕様を満たすプログラムを作成してください。

### 仕様

1. **HTMLに以下の要素を作成する**
   - `id="box"`のdiv要素（幅: 200px、高さ: 200px、背景色: lightblue、中央配置）
   - `id="clickCount"`のp要素
   - `id="hoverStatus"`のp要素
   - `id="enableClick"`のbutton要素（テキスト: クリックイベント有効）
   - `id="disableClick"`のbutton要素（テキスト: クリックイベント無効）

2. **JavaScriptで以下の機能を実装する**
   - boxをクリックすると、クリック回数をカウントし`clickCount`に「クリック回数: X回」と表示する
   - boxにマウスオーバーすると、`hoverStatus`に「マウスオーバー中」と表示し、背景色をlightcoralに変更する
   - boxからマウスアウトすると、`hoverStatus`に「マウスアウト」と表示し、背景色をlightblueに戻す
   - 「クリックイベント有効」ボタンをクリックすると、boxのクリックイベントを有効にする
   - 「クリックイベント無効」ボタンをクリックすると、boxのクリックイベントを無効にする

3. **注意点**
   - イベントハンドラは名前付き関数として定義すること
   - クリック回数は変数で管理すること
   - `removeEventListener()`を使ってイベントを無効化すること

### ヒント

```javascript
// クリック回数を管理する変数
let count = 0;

// クリック処理の関数
function handleClick() {
  // ここにクリック時の処理を書く
}

// マウスオーバー処理の関数
function handleMouseOver() {
  // ここにマウスオーバー時の処理を書く
}

// イベントリスナーの設定
box.addEventListener("click", handleClick);
```

## まとめ

このレッスンでは、以下のことを学びました。

1. **複数イベントリスナーの基本**
   - 1つの要素に複数のイベントリスナーを設定できる
   - イベントリスナーは設定した順番に実行される

2. **異なる種類のイベントの組み合わせ**
   - 同じ要素に異なる種類のイベント（click、focus、inputなど）を設定できる

3. **処理の分離**
   - 名前付き関数を使うことで、コードが読みやすくなる
   - 後からイベントリスナーを削除できる
   - 関数を再利用できる

4. **イベントリスナーの削除**
   - `removeEventListener()`で設定したリスナーを削除できる
   - 削除するには、追加時と同じ関数を指定する必要がある
   - 無名関数は削除できない

5. **イベントの実行制御**
   - `stopImmediatePropagation()`で後続のリスナーを停止できる
   - `{ once: true }`オプションで1回だけ実行するリスナーを設定できる

6. **関心の分離**
   - 処理を機能ごとに独立した関数として定義する
   - テストやメンテナンスが容易になる

7. **実践的なパターン**
   - イベントの一括設定
   - 条件付き実行
   - グループ管理

複数のイベントを適切に管理することで、より複雑で機能的なWebアプリケーションを作成できるようになりました。次のレッスンでは、動的に追加された要素のイベント管理について学んでいきます。
