# レッスン68：eventオブジェクト

## このレッスンで学ぶこと

このレッスンでは、イベントオブジェクト（eventオブジェクト）について学びます。イベントオブジェクトには、発生したイベントに関する詳細な情報が含まれており、これを活用することでより高度なイベント処理ができるようになります。

## eventオブジェクトとは

イベントが発生したとき、JavaScriptは自動的にイベントオブジェクトを作成します。このオブジェクトには、イベントに関するさまざまな情報が含まれています。

### イベントオブジェクトの取得

イベントリスナー関数の引数として、イベントオブジェクトを受け取ることができます。

```javascript
button.addEventListener("click", function(event) {
  // eventがイベントオブジェクト
  console.log(event);
});
```

引数名は慣例的に`event`または`e`が使われますが、どんな名前でも構いません。

```javascript
// すべて同じ意味
button.addEventListener("click", function(event) { });
button.addEventListener("click", function(e) { });
button.addEventListener("click", function(evt) { });
```

## event.target

`event.target`は、イベントが実際に発生した要素を指します。これは非常によく使われるプロパティです。

### 基本的な使い方

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>event.target</title>
</head>
<body>
    <button id="button1">ボタン1</button>
    <button id="button2">ボタン2</button>
    <button id="button3">ボタン3</button>
    <p id="result"></p>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let result = document.getElementById("result");

button1.addEventListener("click", function(event) {
  result.textContent = "クリックされた要素: " + event.target.id;
});

button2.addEventListener("click", function(event) {
  result.textContent = "クリックされた要素: " + event.target.id;
});

button3.addEventListener("click", function(event) {
  result.textContent = "クリックされた要素: " + event.target.id;
});
```

### event.targetのメリット

複数の要素に同じイベントリスナーを設定する場合、`event.target`を使うことでコードを簡潔にできます。

```javascript
let buttons = document.querySelectorAll("button");
let result = document.getElementById("result");

buttons.forEach(function(button) {
  button.addEventListener("click", function(event) {
    result.textContent = "クリックされたボタン: " + event.target.textContent;
  });
});
```

この方法では、すべてのボタンに同じイベントリスナーを設定し、`event.target`でどのボタンがクリックされたかを判別しています。

## イベント情報の取得

イベントオブジェクトには、さまざまな情報が含まれています。

### 主なプロパティ

**event.type**
- イベントの種類を表す文字列です
- "click", "mouseover", "keydown"などの値が入ります

```javascript
button.addEventListener("click", function(event) {
  console.log(event.type); // "click"
});
```

**event.target**
- イベントが発生した要素を指します

**event.currentTarget**
- イベントリスナーが設定されている要素を指します
- 通常、`event.target`と同じですが、イベントバブリングがある場合は異なることがあります

```javascript
let button = document.getElementById("myButton");

button.addEventListener("click", function(event) {
  console.log(event.target); // クリックされた要素
  console.log(event.currentTarget); // イベントリスナーが設定されている要素
});
```

## マウスイベントの情報

マウスイベントのイベントオブジェクトには、マウスの位置情報などが含まれています。

### マウス座標の取得

**event.clientX と event.clientY**
- ブラウザウィンドウの左上を基準とした、マウスのX座標とY座標です

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>マウス座標</title>
    <style>
        #box {
            width: 300px;
            height: 300px;
            background-color: lightblue;
            border: 2px solid blue;
        }
    </style>
</head>
<body>
    <h1>マウス座標の表示</h1>
    <div id="box"></div>
    <p id="coordinates"></p>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let box = document.getElementById("box");
let coordinates = document.getElementById("coordinates");

box.addEventListener("mousemove", function(event) {
  coordinates.textContent = "X: " + event.clientX + ", Y: " + event.clientY;
});
```

このプログラムでは、ボックス上でマウスを動かすと、マウスの座標が表示されます。

### クリック位置でアクションを変える

```javascript
let box = document.getElementById("box");

box.addEventListener("click", function(event) {
  let rect = box.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  if (x < box.offsetWidth / 2) {
    console.log("左側がクリックされました");
  } else {
    console.log("右側がクリックされました");
  }
});
```

## キーボードイベントの情報

キーボードイベントのイベントオブジェクトには、押されたキーの情報が含まれています。

### event.key

`event.key`は、押されたキーの文字列を返します。

```javascript
document.addEventListener("keydown", function(event) {
  console.log("押されたキー: " + event.key);
});
```

これはレッスン66で学んだ内容です。イベントオブジェクトの一部として提供されています。

## 実践例：イベント情報の表示

さまざまなイベント情報を表示するプログラムを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>イベント情報表示</title>
    <style>
        #box {
            width: 300px;
            height: 200px;
            background-color: lightgreen;
            border: 2px solid green;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            margin: 20px 0;
        }
        .info {
            margin: 5px 0;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <h1>イベント情報の表示</h1>
    <div id="box">ここをクリック</div>

    <div id="eventInfo">
        <p class="info">イベントタイプ: <span id="eventType"></span></p>
        <p class="info">ターゲット要素ID: <span id="targetId"></span></p>
        <p class="info">マウスX座標: <span id="mouseX"></span></p>
        <p class="info">マウスY座標: <span id="mouseY"></span></p>
        <p class="info">クリック回数: <span id="clickCount">0</span></p>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let box = document.getElementById("box");
let eventType = document.getElementById("eventType");
let targetId = document.getElementById("targetId");
let mouseX = document.getElementById("mouseX");
let mouseY = document.getElementById("mouseY");
let clickCount = document.getElementById("clickCount");
let count = 0;

box.addEventListener("click", function(event) {
  eventType.textContent = event.type;
  targetId.textContent = event.target.id;
  mouseX.textContent = event.clientX;
  mouseY.textContent = event.clientY;
  count = count + 1;
  clickCount.textContent = count;
});

box.addEventListener("mousemove", function(event) {
  mouseX.textContent = event.clientX;
  mouseY.textContent = event.clientY;
});
```

このプログラムでは、ボックスをクリックしたりマウスを動かしたりすると、イベント情報が表示されます。

## event.targetの実践的な使い方

`event.target`を使うと、複数の要素に対して効率的にイベント処理を設定できます。

### 実践例：動的なボタン

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>動的なボタン</title>
    <style>
        .color-button {
            padding: 10px 20px;
            margin: 5px;
            font-size: 16px;
            cursor: pointer;
        }
        #display {
            width: 200px;
            height: 200px;
            border: 2px solid black;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>色選択</h1>
    <div id="buttonContainer">
        <button class="color-button" data-color="red">赤</button>
        <button class="color-button" data-color="blue">青</button>
        <button class="color-button" data-color="green">緑</button>
        <button class="color-button" data-color="yellow">黄色</button>
    </div>
    <div id="display"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let buttonContainer = document.getElementById("buttonContainer");
let display = document.getElementById("display");

buttonContainer.addEventListener("click", function(event) {
  if (event.target.classList.contains("color-button")) {
    let color = event.target.dataset.color;
    display.style.backgroundColor = color;
  }
});
```

この例では、`buttonContainer`に1つのイベントリスナーを設定し、`event.target`を使ってクリックされたボタンを判別しています。これをイベント委譲（Event Delegation）と呼びます。

### data属性の活用

HTML要素に`data-`で始まる属性を付けると、JavaScriptから`dataset`プロパティで値を取得できます。

```html
<button data-color="red">赤</button>
```

```javascript
button.addEventListener("click", function(event) {
  let color = event.target.dataset.color; // "red"
});
```

## event.currentTargetとevent.targetの違い

`event.currentTarget`は、イベントリスナーが設定されている要素を指します。一方、`event.target`は、実際にイベントが発生した要素を指します。

### 実例

```html
<div id="parent">
    <button id="child">ボタン</button>
</div>
```

```javascript
let parent = document.getElementById("parent");

parent.addEventListener("click", function(event) {
  console.log("target:", event.target.id); // "child" (クリックされたボタン)
  console.log("currentTarget:", event.currentTarget.id); // "parent" (リスナーが設定されている要素)
});
```

ボタンをクリックすると、`event.target`は`button`要素を指し、`event.currentTarget`は`div`要素を指します。

## その他の便利なプロパティ

### event.preventDefault()

イベントのデフォルト動作をキャンセルします。レッスン67で学びました。

```javascript
form.addEventListener("submit", function(event) {
  event.preventDefault(); // フォーム送信をキャンセル
});
```

### event.stopPropagation()

イベントの伝播（バブリング）を止めます。

```javascript
button.addEventListener("click", function(event) {
  event.stopPropagation(); // 親要素にイベントが伝わらない
  console.log("ボタンがクリックされました");
});
```

## 実践例：カラーパレット

`event.target`を使って、カラーパレットを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>カラーパレット</title>
    <style>
        #palette {
            display: flex;
            gap: 10px;
            margin: 20px 0;
        }
        .color-box {
            width: 50px;
            height: 50px;
            cursor: pointer;
            border: 2px solid transparent;
        }
        .color-box:hover {
            border: 2px solid black;
        }
        #canvas {
            width: 400px;
            height: 300px;
            border: 2px solid black;
            position: relative;
        }
        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            position: absolute;
        }
    </style>
</head>
<body>
    <h1>お絵描きツール</h1>
    <p>色を選んでキャンバスをクリックしてください</p>

    <div id="palette">
        <div class="color-box" data-color="red" style="background-color: red;"></div>
        <div class="color-box" data-color="blue" style="background-color: blue;"></div>
        <div class="color-box" data-color="green" style="background-color: green;"></div>
        <div class="color-box" data-color="yellow" style="background-color: yellow;"></div>
        <div class="color-box" data-color="purple" style="background-color: purple;"></div>
        <div class="color-box" data-color="orange" style="background-color: orange;"></div>
    </div>

    <p>選択中の色: <span id="selectedColor">red</span></p>
    <div id="canvas"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let palette = document.getElementById("palette");
let canvas = document.getElementById("canvas");
let selectedColorDisplay = document.getElementById("selectedColor");
let currentColor = "red";

// パレットでの色選択
palette.addEventListener("click", function(event) {
  if (event.target.classList.contains("color-box")) {
    currentColor = event.target.dataset.color;
    selectedColorDisplay.textContent = currentColor;
  }
});

// キャンバスでのお絵描き
canvas.addEventListener("click", function(event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  let dot = document.createElement("div");
  dot.className = "dot";
  dot.style.backgroundColor = currentColor;
  dot.style.left = (x - 5) + "px";
  dot.style.top = (y - 5) + "px";
  canvas.appendChild(dot);
});
```

このプログラムでは、`event.target`と`event.clientX/Y`を組み合わせて、クリック位置に色付きの点を描画しています。

## よくあるパターン

### パターン1：イベント情報のログ出力

```javascript
button.addEventListener("click", function(event) {
  console.log("イベントタイプ:", event.type);
  console.log("ターゲット:", event.target);
  console.log("座標:", event.clientX, event.clientY);
});
```

### パターン2：条件分岐でのevent.target活用

```javascript
container.addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    console.log("ボタンがクリックされました");
  } else if (event.target.tagName === "A") {
    console.log("リンクがクリックされました");
  }
});
```

### パターン3：イベント情報を使った動的な処理

```javascript
let items = document.querySelectorAll(".item");

items.forEach(function(item) {
  item.addEventListener("click", function(event) {
    let itemId = event.target.dataset.id;
    let itemName = event.target.textContent;
    console.log("選択されたアイテム:", itemId, itemName);
  });
});
```

## 注意点

### 1. イベントオブジェクトは自動的に渡される

イベントリスナー関数を呼び出すとき、JavaScriptが自動的にイベントオブジェクトを第1引数として渡します。明示的に渡す必要はありません。

```javascript
// 正しい
button.addEventListener("click", function(event) {
  console.log(event);
});

// これは不要
button.addEventListener("click", function(event) {
  someFunction(event);
});
```

### 2. 引数名は何でもよい

慣例的に`event`や`e`が使われますが、どんな名前でも構いません。

```javascript
button.addEventListener("click", function(evt) {
  console.log(evt.target);
});
```

### 3. アロー関数でも使える

アロー関数を使う場合も、同じようにイベントオブジェクトを受け取れます。

```javascript
button.addEventListener("click", (event) => {
  console.log(event.target);
});
```

## 練習問題

次の仕様を満たすプログラムを作成してください。

### 仕様

1. HTMLに以下の要素を作成する
   - `id="button1"`のbutton要素（テキスト: ボタン1）
   - `id="button2"`のbutton要素（テキスト: ボタン2）
   - `id="button3"`のbutton要素（テキスト: ボタン3）
   - `id="eventType"`のp要素
   - `id="targetId"`のp要素
   - `id="buttonText"`のp要素

2. JavaScriptで以下の機能を実装する
   - すべてのボタンに同じクリックイベントリスナーを設定する
   - ボタンがクリックされたとき、以下の情報を表示する
     - `eventType`に`event.type`の値を表示
     - `targetId`に`event.target.id`の値を表示
     - `buttonText`に`event.target.textContent`の値を表示

### ヒント

- `querySelectorAll("button")`ですべてのボタンを取得できます
- `forEach`を使って各ボタンにイベントリスナーを設定します
- `event.target`でクリックされた要素の情報を取得できます

## まとめ

このレッスンでは、以下のことを学びました。

1. イベントオブジェクトの基本と`function(event) { }`の使い方
2. `event.target`を使ってイベントが発生した要素を取得する方法
3. `event.type`、`event.clientX/Y`などのイベント情報の取得
4. `event.currentTarget`と`event.target`の違い
5. `event.target`を活用した効率的なイベント処理（イベント委譲）

イベントオブジェクトを活用することで、より柔軟で高度なイベント処理ができるようになりました。次のレッスンでは、さらに実践的なWebアプリケーションの開発について学んでいきます。
