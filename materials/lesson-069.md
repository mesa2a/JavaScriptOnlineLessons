# レッスン69：イベント伝播入門

## このレッスンで学ぶこと

このレッスンでは、イベントの伝播（でんぱ）について学びます。イベント伝播とは、イベントが発生したときに、その要素だけでなく親要素にもイベントが伝わる仕組みです。この仕組みを理解することで、より効率的なイベント処理ができるようになります。

## イベント伝播とは

HTML要素は親子関係を持っています。例えば、ボタンがdiv要素の中にある場合、ボタンはdivの子要素です。

```html
<div id="parent">
    <button id="child">ボタン</button>
</div>
```

この構造で、ボタンをクリックすると、実はボタンだけでなく、親のdiv要素もクリックされたことになります。これをイベント伝播と呼びます。

### イベントバブリング

イベントバブリングは、イベントが子要素から親要素へと伝わっていく仕組みです。水の中の泡が下から上に浮かんでいくようなイメージです。

```
ボタン（子） → div（親） → body → html → document
```

イベントは、発生した要素から始まって、親要素、さらにその親要素へと順番に伝わっていきます。

## バブリングの基礎

実際にバブリングを確認してみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>イベントバブリング</title>
    <style>
        #parent {
            width: 300px;
            height: 200px;
            background-color: lightblue;
            padding: 20px;
        }
        #child {
            width: 150px;
            height: 100px;
            background-color: lightcoral;
        }
    </style>
</head>
<body>
    <h1>イベントバブリングの確認</h1>
    <div id="parent">
        親要素
        <div id="child">子要素</div>
    </div>
    <p id="log"></p>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let parent = document.getElementById("parent");
let child = document.getElementById("child");
let log = document.getElementById("log");

child.addEventListener("click", function() {
  log.textContent = log.textContent + "子要素がクリックされました → ";
});

parent.addEventListener("click", function() {
  log.textContent = log.textContent + "親要素がクリックされました";
});
```

このプログラムを実行して、子要素（赤い部分）をクリックすると、「子要素がクリックされました → 親要素がクリックされました」と表示されます。

### なぜ両方のイベントが発生するのか

子要素をクリックしたとき、以下の順番でイベントが発生します。

1. 子要素のクリックイベントが発生
2. イベントが親要素に伝播（バブリング）
3. 親要素のクリックイベントが発生

つまり、子要素をクリックすると、自動的に親要素のクリックイベントも発生するのです。

## 親要素への伝播

イベントは、何段階も上の親要素まで伝播します。

### 実例：3階層の伝播

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>3階層の伝播</title>
    <style>
        #grandparent {
            width: 400px;
            height: 300px;
            background-color: lightyellow;
            padding: 20px;
        }
        #parent {
            width: 300px;
            height: 200px;
            background-color: lightblue;
            padding: 20px;
        }
        #child {
            width: 150px;
            height: 100px;
            background-color: lightcoral;
        }
    </style>
</head>
<body>
    <h1>3階層の伝播確認</h1>
    <div id="grandparent">
        祖父母要素
        <div id="parent">
            親要素
            <div id="child">子要素</div>
        </div>
    </div>
    <p id="log"></p>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let grandparent = document.getElementById("grandparent");
let parent = document.getElementById("parent");
let child = document.getElementById("child");
let log = document.getElementById("log");

child.addEventListener("click", function() {
  log.textContent = "子 → ";
});

parent.addEventListener("click", function() {
  log.textContent = log.textContent + "親 → ";
});

grandparent.addEventListener("click", function() {
  log.textContent = log.textContent + "祖父母";
});
```

子要素をクリックすると、「子 → 親 → 祖父母」の順番でイベントが発生します。

## event.targetとevent.currentTarget

イベントバブリングを理解するために、`event.target`と`event.currentTarget`の違いを知る必要があります。

**event.target**
- 実際にクリックされた要素（イベントが最初に発生した要素）

**event.currentTarget**
- イベントリスナーが設定されている要素（現在イベントを処理している要素）

### 実例

```javascript
let parent = document.getElementById("parent");
let child = document.getElementById("child");

parent.addEventListener("click", function(event) {
  console.log("target:", event.target.id); // 実際にクリックされた要素
  console.log("currentTarget:", event.currentTarget.id); // リスナーが設定されている要素
});
```

子要素をクリックしたとき：
- `event.target.id` は "child"（実際にクリックされたのは子要素）
- `event.currentTarget.id` は "parent"（リスナーが設定されているのは親要素）

## 実例確認

バブリングの動作を視覚的に確認できるツールを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>伝播確認ツール</title>
    <style>
        .container {
            width: 500px;
            height: 400px;
            background-color: #ffebcd;
            padding: 30px;
            border: 3px solid #ff8c00;
        }
        .box {
            width: 350px;
            height: 250px;
            background-color: #add8e6;
            padding: 30px;
            border: 3px solid #4169e1;
        }
        .button-area {
            width: 200px;
            height: 100px;
            background-color: #ffb6c1;
            padding: 20px;
            border: 3px solid #ff1493;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #log {
            margin-top: 20px;
            padding: 10px;
            background-color: #f0f0f0;
            min-height: 100px;
            font-family: monospace;
        }
        .log-entry {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <h1>イベント伝播確認ツール</h1>
    <p>各要素をクリックして、イベントの伝播を確認してください</p>

    <div class="container" id="container">
        Container
        <div class="box" id="box">
            Box
            <div class="button-area" id="buttonArea">
                Button Area
            </div>
        </div>
    </div>

    <div id="log">
        <strong>イベントログ:</strong>
    </div>

    <button id="clearButton">ログをクリア</button>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let container = document.getElementById("container");
let box = document.getElementById("box");
let buttonArea = document.getElementById("buttonArea");
let log = document.getElementById("log");
let clearButton = document.getElementById("clearButton");
let eventCount = 0;

function addLog(message) {
  eventCount = eventCount + 1;
  let entry = document.createElement("div");
  entry.className = "log-entry";
  entry.textContent = eventCount + ". " + message;
  log.appendChild(entry);
}

container.addEventListener("click", function(event) {
  addLog("Container がクリックされました (target: " + event.target.id + ")");
});

box.addEventListener("click", function(event) {
  addLog("Box がクリックされました (target: " + event.target.id + ")");
});

buttonArea.addEventListener("click", function(event) {
  addLog("Button Area がクリックされました (target: " + event.target.id + ")");
});

clearButton.addEventListener("click", function() {
  log.innerHTML = "<strong>イベントログ:</strong>";
  eventCount = 0;
});
```

このツールでは、各要素をクリックしたときに、どの順番でイベントが発生するかを確認できます。

### 確認してみよう

1. Button Area（ピンクの部分）をクリックする
   - Button Area、Box、Container の順番でイベントが発生します

2. Box（青い部分）をクリックする
   - Box、Container の順番でイベントが発生します

3. Container（オレンジの部分）をクリックする
   - Container のみイベントが発生します

## イベントバブリングを止める

`event.stopPropagation()`を使うと、イベントの伝播を止めることができます。

### 使い方

```javascript
child.addEventListener("click", function(event) {
  event.stopPropagation(); // ここでバブリングを止める
  console.log("子要素がクリックされました");
});

parent.addEventListener("click", function() {
  console.log("親要素がクリックされました"); // これは実行されない
});
```

`event.stopPropagation()`を呼び出すと、親要素にイベントが伝わらなくなります。

### stopPropagation()の実例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>stopPropagation</title>
    <style>
        #parent {
            width: 300px;
            height: 200px;
            background-color: lightblue;
            padding: 20px;
        }
        #child {
            width: 150px;
            height: 80px;
            background-color: lightcoral;
            margin: 10px;
        }
    </style>
</head>
<body>
    <h1>stopPropagationの動作</h1>
    <div id="parent">
        親要素（クリックするとアラートが出ます）
        <button id="child">子要素（バブリング停止）</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let parent = document.getElementById("parent");
let child = document.getElementById("child");

parent.addEventListener("click", function() {
  alert("親要素がクリックされました");
});

child.addEventListener("click", function(event) {
  event.stopPropagation();
  alert("子要素がクリックされました（親には伝わりません）");
});
```

このプログラムでは、子要素をクリックしても親要素のアラートは表示されません。

## イベント委譲（Event Delegation）

イベントバブリングを活用した便利なパターンが、イベント委譲です。これは親要素にイベントリスナーを1つだけ設定し、`event.target`で実際にクリックされた要素を判別する方法です。

### 従来の方法（非効率）

```javascript
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");

button1.addEventListener("click", function() {
  console.log("ボタン1");
});

button2.addEventListener("click", function() {
  console.log("ボタン2");
});

button3.addEventListener("click", function() {
  console.log("ボタン3");
});
```

この方法では、ボタンごとにイベントリスナーを設定する必要があります。

### イベント委譲を使った方法（効率的）

```html
<div id="buttonContainer">
    <button data-number="1">ボタン1</button>
    <button data-number="2">ボタン2</button>
    <button data-number="3">ボタン3</button>
</div>
```

```javascript
let buttonContainer = document.getElementById("buttonContainer");

buttonContainer.addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    let number = event.target.dataset.number;
    console.log("ボタン" + number);
  }
});
```

この方法では、親要素に1つのイベントリスナーを設定するだけで、すべてのボタンのクリックを処理できます。

### イベント委譲のメリット

1. コードが簡潔になる
2. メモリ効率が良い（イベントリスナーが1つだけ）
3. 後から追加される要素にも自動的に対応できる

## イベントフロー

イベントは実際には3つのフェーズを経て伝播します。

### 3つのフェーズ

1. **キャプチャフェーズ（Capture Phase）**
   - イベントが上から下へ伝わる（document → 親 → 子）

2. **ターゲットフェーズ（Target Phase）**
   - イベントがターゲット要素に到達する

3. **バブリングフェーズ（Bubbling Phase）**
   - イベントが下から上へ伝わる（子 → 親 → document）

### デフォルトの動作

通常、イベントリスナーはバブリングフェーズで実行されます。これが私たちがこれまで見てきた動作です。

```javascript
element.addEventListener("click", function() {
  // バブリングフェーズで実行される
});
```

### キャプチャフェーズでのリスナー

第3引数に`true`を指定すると、キャプチャフェーズでイベントリスナーが実行されます。

```javascript
element.addEventListener("click", function() {
  console.log("キャプチャフェーズ");
}, true);
```

ただし、通常の開発ではキャプチャフェーズを使うことはあまりありません。バブリングフェーズで十分です。

## 実践例：動的なリスト

イベント委譲を使って、動的に追加される要素にも対応できるリストを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>動的リスト</title>
    <style>
        #list {
            list-style: none;
            padding: 0;
        }
        .list-item {
            padding: 10px;
            margin: 5px 0;
            background-color: #f0f0f0;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
        }
        .list-item:hover {
            background-color: #e0e0e0;
        }
        .delete-button {
            background-color: #ff4444;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>Todoリスト</h1>
    <input type="text" id="itemInput" placeholder="新しいアイテム">
    <button id="addButton">追加</button>

    <ul id="list"></ul>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let list = document.getElementById("list");
let itemInput = document.getElementById("itemInput");
let addButton = document.getElementById("addButton");
let itemCount = 0;

addButton.addEventListener("click", function() {
  let itemText = itemInput.value;
  if (itemText !== "") {
    itemCount = itemCount + 1;

    let li = document.createElement("li");
    li.className = "list-item";
    li.dataset.id = itemCount;
    li.innerHTML = '<span>' + itemText + '</span><button class="delete-button">削除</button>';

    list.appendChild(li);
    itemInput.value = "";
  }
});

// イベント委譲を使用
list.addEventListener("click", function(event) {
  if (event.target.classList.contains("delete-button")) {
    let listItem = event.target.parentElement;
    list.removeChild(listItem);
  }
});
```

このプログラムでは、リストに後から追加されるアイテムの削除ボタンも、イベント委譲によって自動的に機能します。

## よくあるパターン

### パターン1：条件付きバブリング停止

```javascript
element.addEventListener("click", function(event) {
  if (someCondition) {
    event.stopPropagation();
  }
});
```

### パターン2：event.targetのチェック

```javascript
parent.addEventListener("click", function(event) {
  if (event.target.classList.contains("specific-class")) {
    // 特定のクラスを持つ要素だけ処理
  }
});
```

### パターン3：親要素の取得

```javascript
element.addEventListener("click", function(event) {
  let parent = event.target.parentElement;
  console.log(parent);
});
```

## 注意点

### 1. stopPropagation()は慎重に使う

`stopPropagation()`を多用すると、他のイベントリスナーが動作しなくなる可能性があります。本当に必要な場合だけ使いましょう。

### 2. event.targetのnullチェック

イベント委譲を使う場合、`event.target`が期待する要素でない可能性があります。必ず確認しましょう。

```javascript
parent.addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    // ボタンの場合だけ処理
  }
});
```

### 3. イベントバブリングしないイベント

すべてのイベントがバブリングするわけではありません。例えば、`focus`と`blur`はバブリングしません（代わりに`focusin`と`focusout`を使います）。

## 練習問題

次の仕様を満たすプログラムを作成してください。

### 仕様

1. HTMLに以下の要素を作成する
   - `id="outer"`のdiv要素（背景色: lightblue、幅: 400px、高さ: 300px、padding: 20px）
   - その中に`id="middle"`のdiv要素（背景色: lightgreen、幅: 300px、高さ: 200px、padding: 20px）
   - その中に`id="inner"`のdiv要素（背景色: lightcoral、幅: 200px、高さ: 100px）
   - `id="log"`のp要素

2. JavaScriptで以下の機能を実装する
   - outer、middle、innerの各要素にクリックイベントリスナーを設定する
   - 各要素がクリックされたとき、`log`要素に要素のidを追加表示する
   - innerをクリックしたときは、`log`に"inner, middle, outer"と表示される
   - middleをクリックしたときは、`log`に"middle, outer"と表示される
   - outerをクリックしたときは、`log`に"outer"と表示される

### ヒント

- イベントバブリングにより、子要素をクリックすると親要素のイベントも発生します
- `log.textContent`に文字列を追加していきます
- 最初に`log.textContent = ""`でクリアしてから追加します

## まとめ

このレッスンでは、以下のことを学びました。

1. イベントバブリングの基礎（子要素から親要素への伝播）
2. 親要素への伝播の仕組みと順序
3. `event.target`と`event.currentTarget`の違い
4. `event.stopPropagation()`でバブリングを止める方法
5. イベント委譲を使った効率的なイベント処理
6. イベントフローの3つのフェーズ

イベント伝播を理解することで、より効率的で保守性の高いコードを書けるようになりました。次のレッスンでは、さらに高度なJavaScriptの技術について学んでいきます。
