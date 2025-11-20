# レッスン66：キーボードイベント

## このレッスンで学ぶこと

このレッスンでは、キーボード操作に反応するプログラムの作り方を学びます。キーボードイベントを使うことで、ユーザーがキーを押したときに特定の処理を実行できるようになります。

## キーボードイベントとは

キーボードイベントは、ユーザーがキーボードのキーを押したり離したりしたときに発生するイベントです。マウスイベントと同じように、`addEventListener`を使ってキーボード操作を検出できます。

### 主なキーボードイベント

キーボードには主に2つのイベントがあります。

**keydown**
- キーを押した瞬間に発生します
- キーを押し続けると、連続して発生します
- すべてのキー（文字キー、Enterキー、矢印キーなど）で発生します

**keyup**
- キーを離した瞬間に発生します
- キーを押し続けても、離すまで発生しません

## 基本的な使い方

キーボードイベントは、`document`に対して設定することが一般的です。これにより、ページ全体でキーボード操作を検出できます。

```javascript
document.addEventListener("keydown", function(event) {
  console.log("キーが押されました");
});
```

### event.keyプロパティ

キーボードイベントが発生したとき、`event`オブジェクトには押されたキーの情報が含まれています。`event.key`プロパティを使うと、どのキーが押されたかがわかります。

```javascript
document.addEventListener("keydown", function(event) {
  console.log("押されたキー: " + event.key);
});
```

`event.key`の値の例：
- 文字キー: "a", "b", "c", "A", "B", "C"
- 数字キー: "0", "1", "2"
- 特殊キー: "Enter", "Escape", "Backspace", "Tab"
- 矢印キー: "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"
- スペースキー: " "（空白文字）

## 実践例：キーの表示

キーボードで押されたキーを画面に表示するプログラムを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>キーボードイベント</title>
</head>
<body>
    <h1>キーボード操作の練習</h1>
    <p>何かキーを押してください</p>
    <p id="keyDisplay">押されたキー: </p>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let keyDisplay = document.getElementById("keyDisplay");

document.addEventListener("keydown", function(event) {
  keyDisplay.textContent = "押されたキー: " + event.key;
});
```

このプログラムを実行してキーを押すと、押したキーの名前が画面に表示されます。

## 特定のキーに反応する

プログラムでは、特定のキーが押されたときだけ処理を実行したいことがよくあります。`if`文を使って、押されたキーをチェックします。

```javascript
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    console.log("Enterキーが押されました");
  }
});
```

### 複数のキーに異なる処理を設定する

```javascript
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp") {
    console.log("上矢印が押されました");
  } else if (event.key === "ArrowDown") {
    console.log("下矢印が押されました");
  } else if (event.key === "ArrowLeft") {
    console.log("左矢印が押されました");
  } else if (event.key === "ArrowRight") {
    console.log("右矢印が押されました");
  }
});
```

## 実践例：矢印キーで要素を移動

矢印キーを押すと、画面上のボックスが移動するプログラムを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>矢印キーで移動</title>
    <style>
        #box {
            width: 50px;
            height: 50px;
            background-color: blue;
            position: absolute;
            top: 100px;
            left: 100px;
        }
    </style>
</head>
<body>
    <h1>矢印キーでボックスを動かそう</h1>
    <div id="box"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let box = document.getElementById("box");
let topPosition = 100;
let leftPosition = 100;

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp") {
    topPosition = topPosition - 10;
    box.style.top = topPosition + "px";
  } else if (event.key === "ArrowDown") {
    topPosition = topPosition + 10;
    box.style.top = topPosition + "px";
  } else if (event.key === "ArrowLeft") {
    leftPosition = leftPosition - 10;
    box.style.left = leftPosition + "px";
  } else if (event.key === "ArrowRight") {
    leftPosition = leftPosition + 10;
    box.style.left = leftPosition + "px";
  }
});
```

このプログラムでは、矢印キーを押すごとに、ボックスが10ピクセルずつ移動します。

### コードの説明

1. `topPosition`と`leftPosition`という変数で、ボックスの位置を管理しています
2. 矢印キーが押されたら、該当する変数を増減させます
3. `box.style.top`と`box.style.left`を更新して、実際にボックスを移動させます
4. 位置の値には単位（"px"）を付ける必要があります

## キーボードショートカット

キーボードショートカットは、特定のキーの組み合わせで機能を実行する仕組みです。例えば、Enterキーで送信、Escapeキーでキャンセルなどです。

### Enterキーで送信する例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Enterキーで送信</title>
</head>
<body>
    <h1>メッセージ入力</h1>
    <input type="text" id="messageInput" placeholder="メッセージを入力">
    <button id="sendButton">送信</button>
    <p id="result"></p>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let messageInput = document.getElementById("messageInput");
let sendButton = document.getElementById("sendButton");
let result = document.getElementById("result");

function sendMessage() {
  let message = messageInput.value;
  if (message !== "") {
    result.textContent = "送信しました: " + message;
    messageInput.value = "";
  }
}

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
```

このプログラムでは、送信ボタンをクリックする代わりに、入力欄でEnterキーを押しても送信できます。

## keydownとkeyupの使い分け

**keydownを使う場面**
- キーが押されたときに即座に反応したい
- キーを押し続けることで連続して処理を実行したい（例：矢印キーで連続移動）

**keyupを使う場面**
- キーを離したときに処理を実行したい
- キーの押し下げ中は処理をスキップしたい

### keyupの例

```javascript
document.addEventListener("keyup", function(event) {
  console.log(event.key + "キーが離されました");
});
```

## event.preventDefault()

キーボード操作には、ブラウザが標準で持っている動作があります。例えば、スペースキーを押すとページがスクロールします。`event.preventDefault()`を使うと、この標準動作をキャンセルできます。

```javascript
document.addEventListener("keydown", function(event) {
  if (event.key === " ") {
    event.preventDefault();
    console.log("スペースキーが押されましたが、スクロールしません");
  }
});
```

## 実践例：キーボード操作のゲーム

WASDキーでキャラクターを動かし、スペースキーでジャンプするゲームの基礎を作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>キーボードゲーム</title>
    <style>
        #character {
            width: 40px;
            height: 40px;
            background-color: red;
            position: absolute;
            top: 200px;
            left: 200px;
            transition: background-color 0.2s;
        }
        #status {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>キーボードゲーム</h1>
    <p>W/A/S/Dキーで移動、スペースキーでジャンプ</p>
    <div id="character"></div>
    <div id="status"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let character = document.getElementById("character");
let status = document.getElementById("status");
let topPosition = 200;
let leftPosition = 200;

document.addEventListener("keydown", function(event) {
  if (event.key === "w" || event.key === "W") {
    topPosition = topPosition - 10;
    character.style.top = topPosition + "px";
    status.textContent = "上に移動";
  } else if (event.key === "s" || event.key === "S") {
    topPosition = topPosition + 10;
    character.style.top = topPosition + "px";
    status.textContent = "下に移動";
  } else if (event.key === "a" || event.key === "A") {
    leftPosition = leftPosition - 10;
    character.style.left = leftPosition + "px";
    status.textContent = "左に移動";
  } else if (event.key === "d" || event.key === "D") {
    leftPosition = leftPosition + 10;
    character.style.left = leftPosition + "px";
    status.textContent = "右に移動";
  } else if (event.key === " ") {
    event.preventDefault();
    character.style.backgroundColor = "yellow";
    status.textContent = "ジャンプ！";
  }
});

document.addEventListener("keyup", function(event) {
  if (event.key === " ") {
    character.style.backgroundColor = "red";
  }
});
```

このプログラムでは、WASDキーで移動し、スペースキーを押している間はキャラクターの色が変わります。

## よくあるパターン

### パターン1：特定のキーを無効化する

```javascript
document.addEventListener("keydown", function(event) {
  if (event.key === "F5") {
    event.preventDefault();
    console.log("F5キーは無効です");
  }
});
```

### パターン2：数字キーだけを受け付ける

```javascript
let input = document.getElementById("numberInput");

input.addEventListener("keydown", function(event) {
  let allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace"];

  if (!allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
});
```

### パターン3：キーの状態を記録する

複数のキーが同時に押されているかを判定するために、キーの状態を記録します。

```javascript
let keys = {};

document.addEventListener("keydown", function(event) {
  keys[event.key] = true;

  if (keys["Shift"] && keys["Enter"]) {
    console.log("ShiftとEnterが同時に押されています");
  }
});

document.addEventListener("keyup", function(event) {
  keys[event.key] = false;
});
```

## 注意点

### 1. documentに設定する

キーボードイベントは通常`document`に設定します。特定の要素（inputなど）に設定することもできますが、その要素にフォーカスがあるときだけイベントが発生します。

### 2. 大文字と小文字

`event.key`は、実際に入力される文字を返します。Shiftキーを押しながら"a"を押すと、`event.key`は"A"になります。大文字小文字を区別しない場合は、両方をチェックします。

```javascript
if (event.key === "a" || event.key === "A") {
  // 処理
}
```

### 3. 日本語入力

日本語入力モード（IME）がオンの場合、キーボードイベントの動作が異なることがあります。英数字の入力を前提とする場合は、この点に注意が必要です。

## 練習問題

次の仕様を満たすプログラムを作成してください。

### 仕様

1. HTMLに以下の要素を作成する
   - `id="box"`のdiv要素（スタイルは自由）
   - `id="message"`のp要素

2. JavaScriptで以下の機能を実装する
   - 矢印キー（↑↓←→）でボックスを移動させる
   - Enterキーを押すと、ボックスの背景色を青に変える
   - Escapeキーを押すと、ボックスを初期位置（top: 100px, left: 100px）に戻す
   - キーを押すたびに、`message`要素に「〇〇キーが押されました」と表示する

### ヒント

- ボックスの移動には`position: absolute`を使用します
- 初期位置を変数に保存しておくと、リセットが簡単です
- `event.key`の値を使って、どのキーが押されたかを表示します

## まとめ

このレッスンでは、以下のことを学びました。

1. キーボードイベント（`keydown`と`keyup`）の基本
2. `event.key`を使った押されたキーの判定
3. 特定のキーに反応する処理の書き方
4. 矢印キーやEnterキーなどを使ったインタラクティブな操作
5. `event.preventDefault()`でブラウザの標準動作をキャンセルする方法

キーボードイベントを使うことで、ユーザーがキーボードで操作できるプログラムを作れるようになりました。次のレッスンでは、さらに高度なイベント処理について学んでいきます。
