---
title: "Lesson 068: eventオブジェクト"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン68：eventオブジェクト

## このレッスンで学ぶこと

このレッスンでは、イベントオブジェクト（eventオブジェクト）について学びます。イベントオブジェクトには、発生したイベントに関する詳細な情報が含まれており、これを活用することでより高度なイベント処理ができるようになります。

## 現場で使われているeventオブジェクトの例

### 例1：Googleドキュメント - リアルタイムテキスト位置追跡

Googleドキュメントでは、ユーザーがテキストをクリックしたときに、正確なカーソル位置を把握するためにイベントオブジェクトを活用しています。

```javascript
// Googleドキュメントのようなテキスト位置追跡
let textArea = document.getElementById("textArea");
let positionDisplay = document.getElementById("positionDisplay");

textArea.addEventListener("click", function(event) {
  // event.targetでクリックされた要素を取得
  console.log("クリックされた要素:", event.target);

  // event.clientX, event.clientYでマウス座標を取得
  let clickX = event.clientX;
  let clickY = event.clientY;

  // 要素の境界を取得してテキスト内の相対位置を計算
  let rect = event.target.getBoundingClientRect();
  let relativeX = clickX - rect.left;
  let relativeY = clickY - rect.top;

  positionDisplay.textContent = "クリック位置: X=" + relativeX + "px, Y=" + relativeY + "px";

  // event.typeでイベントの種類を確認
  console.log("イベントタイプ:", event.type); // "click"
});
```

**なぜevent.targetが重要か**:
- `event.target`は、実際にクリックされた要素を正確に取得します
- 複数の要素が重なっている場合でも、最前面の要素を特定できます
- イベントリスナーが親要素に設定されていても、クリックされた子要素を取得できます

**clientX/clientYの活用**:
- ブラウザウィンドウ全体を基準としたマウス座標を取得
- カーソル位置の正確な追跡が可能
- テキスト挿入位置の計算に利用

### 例2：Instagram - 画像ダブルタップでいいね

Instagramの投稿画像をダブルタップすると「いいね」がつく機能は、イベントオブジェクトのタイムスタンプを活用しています。

```javascript
// Instagramのようなダブルタップ検出
let post = document.getElementById("post");
let likeIcon = document.getElementById("likeIcon");
let lastClickTime = 0;

post.addEventListener("click", function(event) {
  // event.timeStampでイベント発生時刻を取得
  let currentTime = event.timeStamp;

  // 前回のクリックから300ミリ秒以内ならダブルタップ
  if (currentTime - lastClickTime < 300) {
    // ダブルタップ検出
    likeIcon.style.display = "block";
    likeIcon.style.opacity = "1";

    // いいねアニメーション
    setTimeout(function() {
      likeIcon.style.opacity = "0";
    }, 800);

    console.log("ダブルタップ検出！ダブルクリック位置:", event.clientX, event.clientY);
  }

  lastClickTime = currentTime;
});
```

**event.timeStampの重要性**:
- イベント発生の正確な時刻（ミリ秒単位）を取得
- 連続クリックの間隔を計測できる
- ダブルクリック、トリプルクリックなどの検出に活用

**実装のポイント**:
- 300ミリ秒以内の2回のクリックをダブルタップと判定
- `event.timeStamp`は、ページ読み込みからの経過時間を返す
- クリック位置も同時に取得して、アニメーション表示位置を決定

### 例3：Twitter/X - メンション・ハッシュタグのクリック判定

Twitter/Xでは、ツイート内の特定の文字列（メンション、ハッシュタグ）をクリックしたときに適切なアクションを実行するために`event.target`を活用しています。

```javascript
// Twitter/Xのようなツイート内リンク処理
let tweet = document.getElementById("tweet");

// 親要素にイベントリスナーを設定（イベント委譲）
tweet.addEventListener("click", function(event) {
  // event.targetで実際にクリックされた要素を取得
  let clickedElement = event.target;

  // クラス名で要素の種類を判定
  if (clickedElement.classList.contains("mention")) {
    // メンション（@username）がクリックされた
    let username = clickedElement.dataset.username;
    console.log("ユーザーページへ移動:", username);
    // event.preventDefault(); // デフォルトのリンク動作を防ぐ

  } else if (clickedElement.classList.contains("hashtag")) {
    // ハッシュタグ（#topic）がクリックされた
    let tag = clickedElement.dataset.tag;
    console.log("ハッシュタグ検索:", tag);

  } else if (clickedElement.classList.contains("link")) {
    // 外部リンクがクリックされた
    console.log("外部リンク:", clickedElement.href);
  }

  // event.currentTargetは常にtweetを指す
  console.log("イベントリスナーが設定されている要素:", event.currentTarget.id); // "tweet"
  console.log("実際にクリックされた要素:", event.target.className);
});
```

**HTML例**:
```html
<div id="tweet" class="tweet-content">
  こんにちは！<span class="mention" data-username="user123">@user123</span>さん、
  <span class="hashtag" data-tag="JavaScript">#JavaScript</span>の勉強頑張ってますね！
  参考リンク：<a href="https://example.com" class="link">example.com</a>
</div>
```

**event.targetとevent.currentTargetの違い**:
- `event.target`: 実際にクリックされた要素（span、aなど）
- `event.currentTarget`: イベントリスナーが設定されている要素（常にdiv#tweet）
- イベント委譲では、親要素にリスナーを設定し、`event.target`で子要素を判定

**イベント委譲のメリット**:
- 各要素に個別のリスナーを設定する必要がない
- 動的に追加された要素にも自動的に適用される
- メモリ効率が良い

### 例4：Amazon - 商品画像ズーム機能

Amazonの商品詳細ページでは、マウスの位置に応じて画像の一部を拡大表示する機能があります。これは`event.clientX/Y`を活用した実装です。

```javascript
// Amazonのような画像ズーム機能
let productImage = document.getElementById("productImage");
let zoomLens = document.getElementById("zoomLens");
let zoomResult = document.getElementById("zoomResult");

productImage.addEventListener("mousemove", function(event) {
  // event.clientX/Yでマウスの座標を取得
  let mouseX = event.clientX;
  let mouseY = event.clientY;

  // 画像の境界矩形を取得
  let rect = event.target.getBoundingClientRect();

  // 画像内での相対位置を計算
  let x = mouseX - rect.left;
  let y = mouseY - rect.top;

  // 画像の境界内にマウスがあるかチェック
  if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
    // ズームレンズの位置を更新
    zoomLens.style.left = (x - 50) + "px";
    zoomLens.style.top = (y - 50) + "px";
    zoomLens.style.display = "block";

    // ズーム結果の背景位置を更新（拡大率2倍）
    let bgPosX = -(x * 2 - 50);
    let bgPosY = -(y * 2 - 50);
    zoomResult.style.backgroundPosition = bgPosX + "px " + bgPosY + "px";
    zoomResult.style.display = "block";

    console.log("マウス位置:", x, y);
  }
});

productImage.addEventListener("mouseout", function(event) {
  // マウスが画像から出たらズーム表示を隠す
  zoomLens.style.display = "none";
  zoomResult.style.display = "none";
});
```

**マウス座標の種類**:
- `event.clientX/Y`: ブラウザウィンドウ左上を基準とした座標
- `event.pageX/Y`: ページ全体（スクロールを含む）を基準とした座標
- `event.offsetX/Y`: イベント対象の要素内での相対座標（ブラウザによって異なる）

**getBoundingClientRect()との組み合わせ**:
- 要素の正確な位置とサイズを取得
- `rect.left`, `rect.top`, `rect.width`, `rect.height`などのプロパティ
- マウス座標から要素の位置を引くことで、要素内の相対位置を計算

### 例5：Figma - キャンバス上でのオブジェクト作成

Figmaのようなデザインツールでは、キャンバス上でマウスをドラッグして図形を作成する際に、イベントオブジェクトの座標情報を活用しています。

```javascript
// Figmaのようなドラッグで矩形を作成
let canvas = document.getElementById("canvas");
let isDrawing = false;
let startX, startY;
let currentRect = null;

canvas.addEventListener("mousedown", function(event) {
  // 描画開始
  isDrawing = true;

  // event.targetで確実にcanvasがクリックされたか確認
  if (event.target.id !== "canvas") {
    return; // canvas以外がクリックされた場合は何もしない
  }

  // キャンバス内の相対座標を取得
  let rect = canvas.getBoundingClientRect();
  startX = event.clientX - rect.left;
  startY = event.clientY - rect.top;

  // 新しい矩形要素を作成
  currentRect = document.createElement("div");
  currentRect.className = "rectangle";
  currentRect.style.left = startX + "px";
  currentRect.style.top = startY + "px";
  currentRect.style.width = "0px";
  currentRect.style.height = "0px";
  canvas.appendChild(currentRect);

  console.log("描画開始:", startX, startY);
});

canvas.addEventListener("mousemove", function(event) {
  if (!isDrawing) return;

  // 現在のマウス位置を取得
  let rect = canvas.getBoundingClientRect();
  let currentX = event.clientX - rect.left;
  let currentY = event.clientY - rect.top;

  // 矩形のサイズと位置を更新
  let width = currentX - startX;
  let height = currentY - startY;

  // 負のサイズの場合は位置を調整
  if (width < 0) {
    currentRect.style.left = currentX + "px";
    currentRect.style.width = Math.abs(width) + "px";
  } else {
    currentRect.style.width = width + "px";
  }

  if (height < 0) {
    currentRect.style.top = currentY + "px";
    currentRect.style.height = Math.abs(height) + "px";
  } else {
    currentRect.style.height = height + "px";
  }
});

canvas.addEventListener("mouseup", function(event) {
  if (!isDrawing) return;

  isDrawing = false;

  // 最終的なサイズを取得
  let rect = canvas.getBoundingClientRect();
  let endX = event.clientX - rect.left;
  let endY = event.clientY - rect.top;

  console.log("描画終了:", endX, endY);
  console.log("矩形サイズ:", Math.abs(endX - startX), "x", Math.abs(endY - startY));

  currentRect = null;
});
```

**複数イベントの連携**:
- `mousedown`: 描画開始位置を記録
- `mousemove`: リアルタイムでサイズを更新
- `mouseup`: 描画完了

**座標計算の重要性**:
- `getBoundingClientRect()`で要素の位置を取得
- `event.clientX - rect.left`で要素内の相対X座標を計算
- `event.clientY - rect.top`で要素内の相対Y座標を計算

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

### イベントオブジェクトの自動渡し

JavaScriptは、イベントリスナー関数を呼び出すとき、自動的にイベントオブジェクトを第1引数として渡します。

```javascript
function handleClick(event) {
  console.log("イベントタイプ:", event.type);
  console.log("クリックされた要素:", event.target);
}

// イベントオブジェクトは自動的に渡される
button.addEventListener("click", handleClick);
```

**重要なポイント**:
- イベントオブジェクトは自動的に作成され、自動的に渡される
- 引数名は何でもよいが、`event`または`e`が一般的
- 引数を宣言しなくても動作するが、イベント情報を使う場合は宣言が必要

## event.target - イベントが発生した要素

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

    <script>
        let button1 = document.getElementById("button1");
        let button2 = document.getElementById("button2");
        let button3 = document.getElementById("button3");
        let result = document.getElementById("result");

        // 各ボタンに個別のリスナーを設定する方法（非効率）
        button1.addEventListener("click", function(event) {
          result.textContent = "クリックされた要素: " + event.target.id;
        });

        button2.addEventListener("click", function(event) {
          result.textContent = "クリックされた要素: " + event.target.id;
        });

        button3.addEventListener("click", function(event) {
          result.textContent = "クリックされた要素: " + event.target.id;
        });
    </script>
</body>
</html>
```

### event.targetを使った効率的な実装

複数の要素に同じイベントリスナーを設定する場合、`event.target`を使うことでコードを簡潔にできます。

```javascript
let buttons = document.querySelectorAll("button");
let result = document.getElementById("result");

// forEachですべてのボタンに同じリスナーを設定
buttons.forEach(function(button) {
  button.addEventListener("click", function(event) {
    result.textContent = "クリックされたボタン: " + event.target.textContent;
    console.log("ボタンのID:", event.target.id);
    console.log("ボタンのクラス:", event.target.className);
  });
});
```

この方法では、すべてのボタンに同じイベントリスナーを設定し、`event.target`でどのボタンがクリックされたかを判別しています。

### イベント委譲（Event Delegation）

さらに効率的な方法として、親要素にイベントリスナーを設定し、`event.target`で子要素を判定する方法があります。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>イベント委譲</title>
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

    <script>
        let buttonContainer = document.getElementById("buttonContainer");
        let display = document.getElementById("display");

        // 親要素にイベントリスナーを1つだけ設定
        buttonContainer.addEventListener("click", function(event) {
          // event.targetでクリックされた要素を取得
          if (event.target.classList.contains("color-button")) {
            let color = event.target.dataset.color;
            display.style.backgroundColor = color;
            console.log("選択された色:", color);
          }
        });
    </script>
</body>
</html>
```

**イベント委譲のメリット**:
1. **メモリ効率**: 1つのイベントリスナーで複数の要素を処理
2. **動的要素対応**: 後から追加された要素にも自動的に適用される
3. **コードの簡潔性**: 管理するリスナーが少なくて済む

```javascript
// 動的に追加されたボタンでも動作する例
let addButton = document.getElementById("addButton");

addButton.addEventListener("click", function() {
  let newButton = document.createElement("button");
  newButton.className = "color-button";
  newButton.dataset.color = "purple";
  newButton.textContent = "紫";

  // buttonContainerに追加すれば、既存のリスナーが自動的に機能
  buttonContainer.appendChild(newButton);
});
```

## event.targetのプロパティ活用

`event.target`は、クリックされた要素のDOM要素そのものなので、すべてのDOMプロパティにアクセスできます。

### よく使われるプロパティ

```javascript
button.addEventListener("click", function(event) {
  // 要素のID
  console.log("ID:", event.target.id);

  // 要素のクラス名
  console.log("クラス:", event.target.className);
  console.log("クラスリスト:", event.target.classList);

  // 要素のテキスト内容
  console.log("テキスト:", event.target.textContent);

  // 要素のタグ名
  console.log("タグ名:", event.target.tagName); // "BUTTON", "DIV"など

  // data属性
  console.log("data-color:", event.target.dataset.color);
  console.log("data-id:", event.target.dataset.id);

  // value（input要素の場合）
  if (event.target.tagName === "INPUT") {
    console.log("値:", event.target.value);
  }
});
```

### data属性の活用

HTML要素に`data-`で始まる属性を付けると、JavaScriptから`dataset`プロパティで値を取得できます。

```html
<button data-color="red" data-id="123" data-category="primary">赤</button>
```

```javascript
button.addEventListener("click", function(event) {
  let color = event.target.dataset.color;     // "red"
  let id = event.target.dataset.id;           // "123"
  let category = event.target.dataset.category; // "primary"

  console.log(color, id, category);
});
```

**data属性の命名規則**:
- HTMLでは`data-my-value`のようにハイフン区切り
- JavaScriptでは`dataset.myValue`のようにキャメルケース
- 自動的に変換される

```html
<div data-user-name="太郎" data-user-age="25"></div>
```

```javascript
div.addEventListener("click", function(event) {
  console.log(event.target.dataset.userName); // "太郎"
  console.log(event.target.dataset.userAge);  // "25"
});
```

## イベント情報の取得

イベントオブジェクトには、さまざまな情報が含まれています。

### 主なプロパティ

#### event.type

イベントの種類を表す文字列です。

```javascript
button.addEventListener("click", function(event) {
  console.log(event.type); // "click"
});

input.addEventListener("input", function(event) {
  console.log(event.type); // "input"
});

form.addEventListener("submit", function(event) {
  console.log(event.type); // "submit"
});
```

**活用例**: 1つの関数で複数のイベントを処理する場合

```javascript
function handleEvent(event) {
  if (event.type === "mouseenter") {
    console.log("マウスが入りました");
  } else if (event.type === "mouseleave") {
    console.log("マウスが出ました");
  }
}

element.addEventListener("mouseenter", handleEvent);
element.addEventListener("mouseleave", handleEvent);
```

#### event.currentTarget

`event.currentTarget`は、イベントリスナーが設定されている要素を指します。

```javascript
let parent = document.getElementById("parent");

parent.addEventListener("click", function(event) {
  console.log("target:", event.target);           // クリックされた要素
  console.log("currentTarget:", event.currentTarget); // イベントリスナーが設定されている要素
});
```

**event.targetとevent.currentTargetの違い**:

```html
<div id="parent">
    <button id="child">ボタン</button>
</div>
```

```javascript
let parent = document.getElementById("parent");

parent.addEventListener("click", function(event) {
  console.log("target:", event.target.id);         // "child" (クリックされたボタン)
  console.log("currentTarget:", event.currentTarget.id); // "parent" (リスナーが設定されている要素)

  // thisはevent.currentTargetと同じ
  console.log("this:", this.id); // "parent"
});
```

**使い分け**:
- `event.target`: クリックされた実際の要素を知りたい場合
- `event.currentTarget`: リスナーが設定されている要素を知りたい場合
- イベント委譲では、`event.currentTarget`が親要素、`event.target`が子要素を指す

#### event.timeStamp

イベントが発生した時刻を表すタイムスタンプ（ミリ秒）です。

```javascript
let lastClickTime = 0;

button.addEventListener("click", function(event) {
  let currentTime = event.timeStamp;
  let timeSinceLastClick = currentTime - lastClickTime;

  console.log("前回のクリックからの経過時間:", timeSinceLastClick, "ミリ秒");

  lastClickTime = currentTime;
});
```

**活用例**: ダブルクリック検出

```javascript
let lastClick = 0;
let clickCount = 0;

button.addEventListener("click", function(event) {
  let now = event.timeStamp;

  if (now - lastClick < 300) {
    clickCount++;
    console.log("連続クリック", clickCount + 1, "回目");
  } else {
    clickCount = 0;
  }

  lastClick = now;
});
```

## マウスイベントの座標情報

マウスイベントのイベントオブジェクトには、マウスの位置情報が含まれています。

### マウス座標の種類

JavaScriptでは、複数の座標系でマウス位置を取得できます。

#### event.clientX / event.clientY

ブラウザウィンドウ（ビューポート）の左上を基準とした座標です。スクロール位置は考慮されません。

```javascript
document.addEventListener("click", function(event) {
  console.log("clientX:", event.clientX);
  console.log("clientY:", event.clientY);
});
```

**特徴**:
- ブラウザウィンドウの表示領域を基準
- スクロールしても、ウィンドウ内の同じ位置なら同じ値
- 最もよく使われる座標系

#### event.pageX / event.pageY

ページ全体（ドキュメント）の左上を基準とした座標です。スクロール位置が考慮されます。

```javascript
document.addEventListener("click", function(event) {
  console.log("pageX:", event.pageX);
  console.log("pageY:", event.pageY);
});
```

**特徴**:
- ページ全体（スクロールを含む）を基準
- スクロールしても、ページ内の絶対位置が取得できる
- `pageY = clientY + window.scrollY`

#### event.screenX / event.screenY

ユーザーのモニター画面全体の左上を基準とした座標です。

```javascript
document.addEventListener("click", function(event) {
  console.log("screenX:", event.screenX);
  console.log("screenY:", event.screenY);
});
```

**特徴**:
- モニター画面全体を基準
- ブラウザウィンドウの位置も含む
- あまり使用されない

### 座標系の比較表

| 座標系 | 基準点 | スクロール考慮 | 主な用途 |
|--------|--------|--------------|---------|
| clientX/Y | ブラウザウィンドウ左上 | ✗ | 要素の相対位置計算、ドロップダウン表示位置 |
| pageX/Y | ページ全体の左上 | ✓ | ページ内の絶対位置、スクロール対応の処理 |
| screenX/Y | モニター画面左上 | - | ウィンドウ操作、マルチモニター対応 |

### 要素内の相対座標を計算する

実際の開発では、要素内での相対座標が必要になることが多いです。

```javascript
let box = document.getElementById("box");

box.addEventListener("click", function(event) {
  // 要素の境界矩形を取得
  let rect = event.target.getBoundingClientRect();

  // 要素内の相対座標を計算
  let relativeX = event.clientX - rect.left;
  let relativeY = event.clientY - rect.top;

  console.log("要素内の位置: X=" + relativeX + ", Y=" + relativeY);

  // パーセンテージで表現
  let percentX = (relativeX / rect.width) * 100;
  let percentY = (relativeY / rect.height) * 100;

  console.log("位置（%）: X=" + percentX.toFixed(1) + "%, Y=" + percentY.toFixed(1) + "%");
});
```

### マウス座標を使った実践例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>マウス座標追跡</title>
    <style>
        #box {
            width: 400px;
            height: 300px;
            background-color: lightblue;
            border: 2px solid blue;
            position: relative;
            cursor: crosshair;
        }
        #coordinates {
            font-family: monospace;
            margin-top: 10px;
        }
        .dot {
            width: 10px;
            height: 10px;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            pointer-events: none;
        }
    </style>
</head>
<body>
    <h1>マウス座標の表示</h1>
    <div id="box"></div>
    <div id="coordinates">
        <p>clientX: <span id="clientX">0</span>, clientY: <span id="clientY">0</span></p>
        <p>要素内X: <span id="relativeX">0</span>, 要素内Y: <span id="relativeY">0</span></p>
    </div>

    <script>
        let box = document.getElementById("box");
        let clientXDisplay = document.getElementById("clientX");
        let clientYDisplay = document.getElementById("clientY");
        let relativeXDisplay = document.getElementById("relativeX");
        let relativeYDisplay = document.getElementById("relativeY");

        box.addEventListener("mousemove", function(event) {
          // ウィンドウ内の座標
          clientXDisplay.textContent = event.clientX;
          clientYDisplay.textContent = event.clientY;

          // 要素内の相対座標
          let rect = box.getBoundingClientRect();
          let relativeX = event.clientX - rect.left;
          let relativeY = event.clientY - rect.top;

          relativeXDisplay.textContent = Math.round(relativeX);
          relativeYDisplay.textContent = Math.round(relativeY);
        });

        // クリックで点を描画
        box.addEventListener("click", function(event) {
          let rect = box.getBoundingClientRect();
          let x = event.clientX - rect.left;
          let y = event.clientY - rect.top;

          let dot = document.createElement("div");
          dot.className = "dot";
          dot.style.left = (x - 5) + "px";
          dot.style.top = (y - 5) + "px";
          box.appendChild(dot);
        });
    </script>
</body>
</html>
```

## キーボードイベントの情報

キーボードイベントのイベントオブジェクトには、押されたキーの情報が含まれています。

### event.key

`event.key`は、押されたキーの文字列を返します（レッスン66で学習済み）。

```javascript
document.addEventListener("keydown", function(event) {
  console.log("押されたキー:", event.key);
  console.log("イベントタイプ:", event.type);
});
```

### event.code

`event.code`は、キーボード上の物理的なキーの位置を表す文字列です。

```javascript
document.addEventListener("keydown", function(event) {
  console.log("event.key:", event.key);   // "a" または "A"
  console.log("event.code:", event.code); // "KeyA"（常に同じ）
});
```

**event.keyとevent.codeの違い**:
- `event.key`: 入力される文字（Shiftの影響を受ける）
- `event.code`: キーの物理的な位置（Shiftの影響を受けない）

```javascript
// Aキーを押した場合
// Shiftなし: event.key = "a", event.code = "KeyA"
// Shiftあり: event.key = "A", event.code = "KeyA"
```

### modifier keys（修飾キー）の検出

```javascript
document.addEventListener("keydown", function(event) {
  console.log("Ctrl:", event.ctrlKey);   // Ctrlキーが押されているか
  console.log("Shift:", event.shiftKey); // Shiftキーが押されているか
  console.log("Alt:", event.altKey);     // Altキーが押されているか
  console.log("Meta:", event.metaKey);   // Cmd(Mac)またはWin(Windows)キー

  // ショートカットキーの判定
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault();
    console.log("Ctrl+S が押されました（保存）");
  }
});
```

## イベントオブジェクトのメソッド

イベントオブジェクトには、イベントの動作を制御するメソッドがあります。

### event.preventDefault()

イベントのデフォルト動作をキャンセルします（レッスン67で学習済み）。

```javascript
// リンクのデフォルト動作（ページ遷移）を防ぐ
link.addEventListener("click", function(event) {
  event.preventDefault();
  console.log("リンクのクリックを検出しましたが、遷移しません");
});

// フォーム送信のデフォルト動作を防ぐ
form.addEventListener("submit", function(event) {
  event.preventDefault();
  console.log("フォーム送信を検出しましたが、送信しません");
});

// 右クリックメニューを防ぐ
document.addEventListener("contextmenu", function(event) {
  event.preventDefault();
  console.log("右クリックメニューを無効化しました");
});
```

### event.stopPropagation()

イベントの伝播（バブリング）を止めます。

```javascript
let parent = document.getElementById("parent");
let child = document.getElementById("child");

parent.addEventListener("click", function() {
  console.log("親要素がクリックされました");
});

child.addEventListener("click", function(event) {
  event.stopPropagation(); // 親要素へのイベント伝播を止める
  console.log("子要素がクリックされました");
});

// 子要素をクリックした場合
// 出力: "子要素がクリックされました"
// （親要素のリスナーは実行されない）
```

**使用上の注意**:
- `stopPropagation()`は慎重に使う
- イベント委譲を使っている場合、親のリスナーが実行されなくなる
- 通常は、`event.target`で条件分岐する方が柔軟

### event.stopImmediatePropagation()

同じ要素に設定された他のリスナーも含めて、すべての伝播を止めます。

```javascript
button.addEventListener("click", function(event) {
  console.log("リスナー1");
  event.stopImmediatePropagation(); // ここで完全に停止
});

button.addEventListener("click", function(event) {
  console.log("リスナー2"); // これは実行されない
});

// 出力: "リスナー1"のみ
```

## よくある間違い

### 間違い1：event.targetとthisを混同する

**問題のあるコード**:

```javascript
let buttons = document.querySelectorAll(".button");

buttons.forEach(function(button) {
  button.addEventListener("click", function(event) {
    // thisとevent.targetを混同
    console.log("クリックされたボタン:", this.id);
  });
});
```

**何が問題か**:
- この例では`this`と`event.target`は同じ値になるが、常に同じとは限らない
- イベント委譲を使う場合、`this`（または`event.currentTarget`）はリスナーが設定された要素を指す
- `event.target`は実際にクリックされた要素を指す

**正しいコード**:

```javascript
let container = document.getElementById("container");

container.addEventListener("click", function(event) {
  // thisはcontainerを指す
  console.log("this:", this.id); // "container"

  // event.currentTargetもcontainerを指す
  console.log("currentTarget:", event.currentTarget.id); // "container"

  // event.targetは実際にクリックされた要素を指す
  if (event.target.classList.contains("button")) {
    console.log("クリックされたボタン:", event.target.id);
  }
});
```

**使い分け**:
- イベント委譲では`event.target`を使う
- `this`は通常の関数では`event.currentTarget`と同じ（アロー関数では異なる）
- 明確性のため、`event.target`や`event.currentTarget`を使うのが推奨

### 間違い2：座標の計算ミス

**問題のあるコード**:

```javascript
let box = document.getElementById("box");

box.addEventListener("click", function(event) {
  // 要素内の相対座標を取得したいが、clientXをそのまま使用
  let x = event.clientX;
  let y = event.clientY;

  console.log("クリック位置:", x, y);
  // これは要素内の位置ではなく、ウィンドウ全体での位置
});
```

**何が問題か**:
- `event.clientX/Y`はウィンドウ全体を基準とした座標
- 要素が左上にない場合、要素内の相対位置として使えない
- スクロール位置も考慮されていない

**正しいコード**:

```javascript
let box = document.getElementById("box");

box.addEventListener("click", function(event) {
  // 要素の境界矩形を取得
  let rect = event.target.getBoundingClientRect();

  // 要素内の相対座標を計算
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  console.log("要素内のクリック位置:", x, y);

  // パーセンテージで表現する場合
  let percentX = (x / rect.width) * 100;
  let percentY = (y / rect.height) * 100;

  console.log("位置（%）:", percentX.toFixed(1), percentY.toFixed(1));
});
```

**正しい手順**:
1. `getBoundingClientRect()`で要素の位置とサイズを取得
2. `event.clientX - rect.left`で要素内のX座標を計算
3. `event.clientY - rect.top`で要素内のY座標を計算

### 間違い3：イベントオブジェクトを明示的に渡そうとする

**問題のあるコード**:

```javascript
function handleClick(event) {
  console.log(event.type);
}

// イベントオブジェクトを明示的に渡そうとする（間違い）
button.addEventListener("click", function() {
  handleClick(event); // ReferenceError: event is not defined
});
```

**何が問題か**:
- `event`は関数の引数として宣言されていないと使えない
- ラッパー関数内で`event`を参照しようとしている

**正しいコード（パターン1）**:

```javascript
function handleClick(event) {
  console.log(event.type);
}

// イベントオブジェクトは自動的に渡される
button.addEventListener("click", handleClick);
```

**正しいコード（パターン2）**:

```javascript
function handleClick(event) {
  console.log(event.type);
}

// ラッパー関数を使う場合は、引数で受け取る
button.addEventListener("click", function(event) {
  handleClick(event);
});
```

**正しいコード（パターン3）**:

```javascript
// 追加の引数を渡したい場合
function handleClick(event, message) {
  console.log(message, event.type);
}

button.addEventListener("click", function(event) {
  handleClick(event, "ボタンがクリックされました");
});
```

### 間違い4：event.targetの要素タイプを確認しない

**問題のあるコード**:

```javascript
let container = document.getElementById("container");

container.addEventListener("click", function(event) {
  // どの要素がクリックされたかチェックせずに処理
  let color = event.target.dataset.color;
  console.log("選択された色:", color); // undefinedになる可能性がある
});
```

**何が問題か**:
- コンテナ内の任意の要素がクリックされる可能性がある
- `data-color`属性がない要素がクリックされると`undefined`
- エラーは発生しないが、意図しない動作になる

**正しいコード**:

```javascript
let container = document.getElementById("container");

container.addEventListener("click", function(event) {
  // クラスやタグ名で要素の種類を確認
  if (event.target.classList.contains("color-button")) {
    let color = event.target.dataset.color;
    console.log("選択された色:", color);
  } else {
    console.log("色ボタン以外がクリックされました");
  }
});
```

**より堅牢な実装**:

```javascript
container.addEventListener("click", function(event) {
  // タグ名とクラス名の両方を確認
  if (event.target.tagName === "BUTTON" &&
      event.target.classList.contains("color-button")) {

    // data属性の存在も確認
    if (event.target.dataset.color) {
      let color = event.target.dataset.color;
      console.log("選択された色:", color);
    }
  }
});
```

### 間違い5：clientXとpageXを混同する

**問題のあるコード**:

```javascript
// ページがスクロールされている状態で
document.addEventListener("click", function(event) {
  // clientXを使って要素を配置
  let tooltip = document.createElement("div");
  tooltip.style.position = "absolute";
  tooltip.style.left = event.clientX + "px"; // スクロール位置が考慮されない
  tooltip.style.top = event.clientY + "px";
  document.body.appendChild(tooltip);
});
```

**何が問題か**:
- `position: absolute`はページ全体を基準とする
- `clientX/Y`はウィンドウ（ビューポート）を基準とする
- スクロールすると、意図した位置に表示されない

**正しいコード**:

```javascript
document.addEventListener("click", function(event) {
  let tooltip = document.createElement("div");
  tooltip.style.position = "absolute";

  // pageXを使うか、clientX + スクロール量を使う
  tooltip.style.left = event.pageX + "px";
  tooltip.style.top = event.pageY + "px";

  // または
  // tooltip.style.left = (event.clientX + window.scrollX) + "px";
  // tooltip.style.top = (event.clientY + window.scrollY) + "px";

  document.body.appendChild(tooltip);
});
```

**position: fixedを使う場合**:

```javascript
document.addEventListener("click", function(event) {
  let tooltip = document.createElement("div");
  tooltip.style.position = "fixed"; // fixedならclientXでOK
  tooltip.style.left = event.clientX + "px";
  tooltip.style.top = event.clientY + "px";
  document.body.appendChild(tooltip);
});
```

**使い分け**:
- `position: fixed` → `clientX/Y`を使う
- `position: absolute` → `pageX/Y`を使う
- 要素内の相対位置 → `clientX - rect.left`を使う

### 間違い6：アロー関数でのthisの扱い

**問題のあるコード**:

```javascript
let button = document.getElementById("button");

button.addEventListener("click", (event) => {
  // アロー関数ではthisが期待通りに動作しない
  console.log(this); // windowオブジェクトを指す（buttonではない）
  this.style.backgroundColor = "red"; // エラー
});
```

**何が問題か**:
- アロー関数は独自の`this`を持たない
- `this`は外側のスコープの`this`を参照する
- イベントリスナー内で要素自身を参照できない

**正しいコード（パターン1）**:

```javascript
button.addEventListener("click", function(event) {
  // 通常の関数ならthisは要素を指す
  console.log(this); // button要素
  this.style.backgroundColor = "red";
});
```

**正しいコード（パターン2）**:

```javascript
button.addEventListener("click", (event) => {
  // event.currentTargetを使う
  console.log(event.currentTarget); // button要素
  event.currentTarget.style.backgroundColor = "red";
});
```

**推奨される方法**:
- イベントリスナー内で要素を参照する必要がある場合は、通常の関数を使うか、`event.currentTarget`を使う
- アロー関数を使う場合は、明示的に`event.currentTarget`や`event.target`を使う

## 実践アプリケーション1：インタラクティブな画像ビューア

イベントオブジェクトを活用して、画像ビューアを作成します。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>画像ビューア</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }

        .container {
            background-color: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
        }

        #gallery {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }

        .thumbnail {
            width: 100%;
            height: 150px;
            object-fit: cover;
            cursor: pointer;
            border: 3px solid transparent;
            border-radius: 5px;
            transition: all 0.3s ease;
        }

        .thumbnail:hover {
            border-color: #667eea;
            transform: scale(1.05);
        }

        #viewer {
            position: relative;
            width: 100%;
            height: 400px;
            background-color: #f0f0f0;
            border-radius: 10px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #mainImage {
            max-width: 100%;
            max-height: 100%;
            display: none;
        }

        #mainImage.show {
            display: block;
        }

        #placeholder {
            color: #999;
            font-size: 18px;
        }

        #imageInfo {
            margin-top: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
            font-family: monospace;
        }

        .info-row {
            margin: 8px 0;
            display: flex;
            justify-content: space-between;
        }

        .info-label {
            font-weight: bold;
            color: #667eea;
        }

        #zoomInfo {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            display: none;
        }

        .zoom-lens {
            position: absolute;
            border: 2px solid #667eea;
            width: 100px;
            height: 100px;
            pointer-events: none;
            display: none;
            background-color: rgba(102, 126, 234, 0.2);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>インタラクティブ画像ビューア</h1>

        <div id="gallery">
            <!-- サンプル画像（実際の画像URLに置き換えてください） -->
            <img src="https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Image+1"
                 class="thumbnail"
                 data-title="風景写真1"
                 data-id="img-001"
                 alt="画像1">
            <img src="https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Image+2"
                 class="thumbnail"
                 data-title="風景写真2"
                 data-id="img-002"
                 alt="画像2">
            <img src="https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=Image+3"
                 class="thumbnail"
                 data-title="風景写真3"
                 data-id="img-003"
                 alt="画像3">
            <img src="https://via.placeholder.com/300x200/FFA07A/FFFFFF?text=Image+4"
                 class="thumbnail"
                 data-title="風景写真4"
                 data-id="img-004"
                 alt="画像4">
            <img src="https://via.placeholder.com/300x200/98D8C8/FFFFFF?text=Image+5"
                 class="thumbnail"
                 data-title="風景写真5"
                 data-id="img-005"
                 alt="画像5">
            <img src="https://via.placeholder.com/300x200/F7DC6F/FFFFFF?text=Image+6"
                 class="thumbnail"
                 data-title="風景写真6"
                 data-id="img-006"
                 alt="画像6">
        </div>

        <div id="viewer">
            <div id="placeholder">画像を選択してください</div>
            <img id="mainImage" src="" alt="メイン画像">
            <div class="zoom-lens"></div>
            <div id="zoomInfo">マウスを動かしてズーム</div>
        </div>

        <div id="imageInfo">
            <div class="info-row">
                <span class="info-label">イベントタイプ:</span>
                <span id="eventType">-</span>
            </div>
            <div class="info-row">
                <span class="info-label">クリックされた要素ID:</span>
                <span id="targetId">-</span>
            </div>
            <div class="info-row">
                <span class="info-label">画像タイトル:</span>
                <span id="imageTitle">-</span>
            </div>
            <div class="info-row">
                <span class="info-label">マウス座標（client）:</span>
                <span id="mouseCoords">-</span>
            </div>
            <div class="info-row">
                <span class="info-label">ビューア内座標:</span>
                <span id="relativeCoords">-</span>
            </div>
            <div class="info-row">
                <span class="info-label">タイムスタンプ:</span>
                <span id="timestamp">-</span>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
// 要素の取得
let gallery = document.getElementById("gallery");
let mainImage = document.getElementById("mainImage");
let placeholder = document.getElementById("placeholder");
let viewer = document.getElementById("viewer");
let zoomLens = document.querySelector(".zoom-lens");
let zoomInfo = document.getElementById("zoomInfo");

// 情報表示要素
let eventType = document.getElementById("eventType");
let targetId = document.getElementById("targetId");
let imageTitle = document.getElementById("imageTitle");
let mouseCoords = document.getElementById("mouseCoords");
let relativeCoords = document.getElementById("relativeCoords");
let timestamp = document.getElementById("timestamp");

// イベント委譲でギャラリー全体にリスナーを設定
gallery.addEventListener("click", function(event) {
  // event.targetでクリックされた要素を取得
  let clickedElement = event.target;

  // サムネイル画像がクリックされたか確認
  if (clickedElement.classList.contains("thumbnail")) {
    // イベント情報を表示
    eventType.textContent = event.type;
    targetId.textContent = clickedElement.dataset.id;
    imageTitle.textContent = clickedElement.dataset.title;
    timestamp.textContent = Math.round(event.timeStamp) + "ms";

    // メイン画像を表示
    mainImage.src = clickedElement.src.replace("300x200", "600x400");
    mainImage.classList.add("show");
    placeholder.style.display = "none";

    // すべてのサムネイルの枠線をリセット
    let thumbnails = document.querySelectorAll(".thumbnail");
    thumbnails.forEach(function(thumb) {
      thumb.style.borderColor = "transparent";
    });

    // クリックされたサムネイルをハイライト
    clickedElement.style.borderColor = "#667eea";

    console.log("画像選択:", clickedElement.dataset.title);
  }
});

// ビューアでのマウス移動イベント
viewer.addEventListener("mousemove", function(event) {
  // 画像が表示されていない場合は何もしない
  if (!mainImage.classList.contains("show")) {
    return;
  }

  // event.clientX/Yでマウス座標を取得
  let clientX = event.clientX;
  let clientY = event.clientY;

  // ビューア内の相対座標を計算
  let rect = viewer.getBoundingClientRect();
  let relativeX = clientX - rect.left;
  let relativeY = clientY - rect.top;

  // 座標情報を表示
  mouseCoords.textContent = "X: " + clientX + ", Y: " + clientY;
  relativeCoords.textContent = "X: " + Math.round(relativeX) + ", Y: " + Math.round(relativeY);

  // ズームレンズの位置を更新
  zoomLens.style.left = (relativeX - 50) + "px";
  zoomLens.style.top = (relativeY - 50) + "px";
  zoomLens.style.display = "block";
  zoomInfo.style.display = "block";
});

// ビューアからマウスが出たらズーム表示を隠す
viewer.addEventListener("mouseout", function(event) {
  zoomLens.style.display = "none";
  zoomInfo.style.display = "none";
  relativeCoords.textContent = "-";
});

// ダブルクリックでフルスクリーン風の表示
let lastClickTime = 0;
viewer.addEventListener("click", function(event) {
  if (!mainImage.classList.contains("show")) {
    return;
  }

  // event.timeStampでダブルクリック判定
  let currentTime = event.timeStamp;

  if (currentTime - lastClickTime < 300) {
    // ダブルクリック検出
    if (mainImage.style.maxWidth === "none") {
      // 元のサイズに戻す
      mainImage.style.maxWidth = "100%";
      mainImage.style.maxHeight = "100%";
      mainImage.style.cursor = "default";
      console.log("通常表示に戻しました");
    } else {
      // 拡大表示
      mainImage.style.maxWidth = "none";
      mainImage.style.maxHeight = "none";
      mainImage.style.cursor = "zoom-out";
      console.log("拡大表示しました");
    }
  }

  lastClickTime = currentTime;
});

// キーボードでの画像切り替え
let currentImageIndex = -1;
let thumbnails = document.querySelectorAll(".thumbnail");

document.addEventListener("keydown", function(event) {
  // 画像が選択されていない場合は何もしない
  if (currentImageIndex === -1 && !mainImage.classList.contains("show")) {
    return;
  }

  // 現在選択されている画像のインデックスを探す
  if (currentImageIndex === -1) {
    thumbnails.forEach(function(thumb, index) {
      if (thumb.style.borderColor === "rgb(102, 126, 234)") {
        currentImageIndex = index;
      }
    });
  }

  // event.keyで押されたキーを判定
  if (event.key === "ArrowRight") {
    // 次の画像
    currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
    thumbnails[currentImageIndex].click();

  } else if (event.key === "ArrowLeft") {
    // 前の画像
    currentImageIndex = (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
    thumbnails[currentImageIndex].click();
  }
});

console.log("画像ビューアが初期化されました");
console.log("- サムネイルをクリックして画像を表示");
console.log("- マウスを動かしてズーム位置を確認");
console.log("- ダブルクリックで拡大/縮小");
console.log("- 矢印キー（←→）で画像を切り替え");
```

### アプリケーションの機能説明

**event.targetの活用**:
- ギャラリー全体にイベントリスナーを1つ設定
- `event.target`でクリックされたサムネイルを判定
- イベント委譲により効率的な実装

**event.clientX/Yの活用**:
- マウスの座標をリアルタイムで表示
- `getBoundingClientRect()`と組み合わせてビューア内の相対座標を計算
- ズームレンズの位置決定に使用

**event.timeStampの活用**:
- ダブルクリック検出
- 300ミリ秒以内の2回のクリックで拡大/縮小を切り替え

**event.keyの活用**:
- 矢印キーで画像を切り替え
- キーボードナビゲーションの実装

**data属性の活用**:
- `data-title`: 画像のタイトル
- `data-id`: 画像の一意な識別子
- `event.target.dataset`で取得

## 実践アプリケーション2：ドラッグ&ドロップタスクボード

イベントオブジェクトを使って、タスクをドラッグ&ドロップで移動できるボードを作成します。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>タスクボード</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        h1 {
            text-align: center;
            color: #333;
        }

        .board {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 30px;
        }

        .column {
            background-color: #e9ecef;
            border-radius: 8px;
            padding: 15px;
            min-height: 400px;
        }

        .column-header {
            font-weight: bold;
            margin-bottom: 15px;
            padding: 10px;
            background-color: white;
            border-radius: 5px;
            text-align: center;
        }

        .todo-header {
            background-color: #ffc107;
        }

        .inprogress-header {
            background-color: #17a2b8;
            color: white;
        }

        .done-header {
            background-color: #28a745;
            color: white;
        }

        .task {
            background-color: white;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 5px;
            cursor: move;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease;
        }

        .task:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transform: translateY(-2px);
        }

        .task.dragging {
            opacity: 0.5;
        }

        .task-title {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .task-desc {
            font-size: 14px;
            color: #666;
        }

        .event-log {
            margin-top: 30px;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            max-height: 200px;
            overflow-y: auto;
        }

        .log-entry {
            font-family: monospace;
            font-size: 12px;
            padding: 5px;
            border-bottom: 1px solid #eee;
        }

        .log-entry:last-child {
            border-bottom: none;
        }

        .column.drag-over {
            background-color: #d1d8dd;
            border: 2px dashed #667eea;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>タスク管理ボード</h1>

        <div class="board">
            <div class="column" id="todo" data-status="todo">
                <div class="column-header todo-header">TODO</div>
                <div class="task" draggable="true" data-task-id="task-1">
                    <div class="task-title">デザインレビュー</div>
                    <div class="task-desc">新しいUIデザインのレビューを実施</div>
                </div>
                <div class="task" draggable="true" data-task-id="task-2">
                    <div class="task-title">API仕様書作成</div>
                    <div class="task-desc">RESTful APIの仕様書を作成</div>
                </div>
            </div>

            <div class="column" id="inprogress" data-status="inprogress">
                <div class="column-header inprogress-header">進行中</div>
                <div class="task" draggable="true" data-task-id="task-3">
                    <div class="task-title">ログイン機能実装</div>
                    <div class="task-desc">ユーザー認証機能の実装</div>
                </div>
            </div>

            <div class="column" id="done" data-status="done">
                <div class="column-header done-header">完了</div>
                <div class="task" draggable="true" data-task-id="task-4">
                    <div class="task-title">環境構築</div>
                    <div class="task-desc">開発環境のセットアップ</div>
                </div>
            </div>
        </div>

        <div class="event-log">
            <h3>イベントログ</h3>
            <div id="logContainer"></div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
// ログ表示用
let logContainer = document.getElementById("logContainer");

function addLog(message) {
  let logEntry = document.createElement("div");
  logEntry.className = "log-entry";
  logEntry.textContent = new Date().toLocaleTimeString() + " - " + message;
  logContainer.insertBefore(logEntry, logContainer.firstChild);
}

// ドラッグ中のタスク要素を保持
let draggedTask = null;

// すべてのタスク要素を取得
let tasks = document.querySelectorAll(".task");

// 各タスクにドラッグイベントを設定
tasks.forEach(function(task) {

  // ドラッグ開始
  task.addEventListener("dragstart", function(event) {
    draggedTask = event.target; // event.targetでドラッグされた要素を取得
    event.target.classList.add("dragging");

    // ドラッグするデータを設定
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target.innerHTML);

    let taskId = event.target.dataset.taskId;
    let taskTitle = event.target.querySelector(".task-title").textContent;

    addLog("ドラッグ開始: " + taskTitle + " (ID: " + taskId + ")");

    console.log("dragstart - target:", event.target);
    console.log("dragstart - clientX:", event.clientX, "clientY:", event.clientY);
  });

  // ドラッグ終了
  task.addEventListener("dragend", function(event) {
    event.target.classList.remove("dragging");

    // すべてのカラムからdrag-overクラスを削除
    let columns = document.querySelectorAll(".column");
    columns.forEach(function(col) {
      col.classList.remove("drag-over");
    });

    addLog("ドラッグ終了");
    console.log("dragend - target:", event.target);
  });
});

// すべてのカラム（列）を取得
let columns = document.querySelectorAll(".column");

columns.forEach(function(column) {

  // ドラッグオーバー（要素の上にドラッグされている）
  column.addEventListener("dragover", function(event) {
    event.preventDefault(); // デフォルトの動作を防ぐ（重要）

    // event.currentTargetでイベントリスナーが設定されている要素を取得
    event.currentTarget.classList.add("drag-over");

    event.dataTransfer.dropEffect = "move";
  });

  // ドラッグがカラムから出た
  column.addEventListener("dragleave", function(event) {
    // event.targetが子要素の場合もあるので注意
    if (event.target === event.currentTarget) {
      event.currentTarget.classList.remove("drag-over");
    }
  });

  // ドロップ（要素が落とされた）
  column.addEventListener("drop", function(event) {
    event.preventDefault();

    // event.currentTargetでドロップ先のカラムを取得
    let dropZone = event.currentTarget;
    dropZone.classList.remove("drag-over");

    // ドラッグされたタスクをドロップ先に追加
    if (draggedTask) {
      dropZone.appendChild(draggedTask);

      let taskTitle = draggedTask.querySelector(".task-title").textContent;
      let columnStatus = dropZone.dataset.status;
      let columnName = dropZone.querySelector(".column-header").textContent;

      addLog("ドロップ: " + taskTitle + " → " + columnName);

      // ドロップ位置の座標を取得
      let rect = dropZone.getBoundingClientRect();
      let dropX = event.clientX - rect.left;
      let dropY = event.clientY - rect.top;

      console.log("drop - ドロップ先:", columnName);
      console.log("drop - ドロップ位置:", "X:" + dropX, "Y:" + dropY);
      console.log("drop - event.target:", event.target);
      console.log("drop - event.currentTarget:", event.currentTarget);
    }
  });
});

// クリックでタスク情報を表示
document.addEventListener("click", function(event) {
  // event.targetでクリックされた要素を取得
  let clickedElement = event.target;

  // タスク要素またはその子要素がクリックされたか確認
  let taskElement = clickedElement.closest(".task");

  if (taskElement) {
    let taskId = taskElement.dataset.taskId;
    let taskTitle = taskElement.querySelector(".task-title").textContent;
    let taskDesc = taskElement.querySelector(".task-desc").textContent;

    // 親カラムを探す
    let parentColumn = taskElement.closest(".column");
    let status = parentColumn ? parentColumn.dataset.status : "不明";

    addLog("クリック: " + taskTitle + " (ステータス: " + status + ")");

    console.log("クリックされたタスク:");
    console.log("- ID:", taskId);
    console.log("- タイトル:", taskTitle);
    console.log("- 説明:", taskDesc);
    console.log("- ステータス:", status);
    console.log("- event.target:", event.target);
    console.log("- event.currentTarget:", event.currentTarget);
  }
});

addLog("タスクボードが初期化されました");
console.log("タスクをドラッグ&ドロップして移動できます");
```

### アプリケーションの機能説明

**event.targetとevent.currentTargetの使い分け**:
- `dragstart`: `event.target`でドラッグされたタスク要素を取得
- `drop`: `event.currentTarget`でドロップ先のカラムを取得
- クリック: `event.target`からタスク要素を探す（`closest()`メソッド使用）

**event.preventDefault()の重要性**:
- `dragover`イベントで`preventDefault()`を呼ばないと、ドロップができない
- ブラウザのデフォルトのドラッグ&ドロップ動作を無効化

**座標情報の活用**:
- `event.clientX/Y`でドロップ位置を取得
- `getBoundingClientRect()`と組み合わせてカラム内の相対位置を計算
- ログに座標情報を表示

**data属性の活用**:
- `data-task-id`: タスクの一意な識別子
- `data-status`: カラムのステータス（todo/inprogress/done）
- `event.target.dataset`で取得

## 実践アプリケーション3：イベント情報ダッシュボード

イベントオブジェクトのすべての主要プロパティを表示するダッシュボードを作成します。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>イベント情報ダッシュボード</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            background-color: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 10px;
        }

        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
        }

        .test-area {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }

        .test-box {
            border: 2px solid #667eea;
            border-radius: 8px;
            padding: 20px;
            min-height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }

        .test-box:hover {
            background-color: #f0f4ff;
            transform: translateY(-2px);
        }

        #clickBox {
            background-color: #ffe6e6;
            border-color: #ff6b6b;
        }

        #mouseBox {
            background-color: #e6f7ff;
            border-color: #4ecdc4;
        }

        #dragBox {
            background-color: #fff3e6;
            border-color: #ffa07a;
        }

        #keyBox {
            background-color: #f0e6ff;
            border-color: #9b59b6;
        }

        .dashboard {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }

        .info-panel {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
        }

        .panel-title {
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 5px;
        }

        .info-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e0e0e0;
            font-family: monospace;
            font-size: 13px;
        }

        .info-item:last-child {
            border-bottom: none;
        }

        .info-label {
            color: #666;
            font-weight: bold;
        }

        .info-value {
            color: #333;
            text-align: right;
        }

        .highlight {
            background-color: #fff3cd;
            padding: 2px 6px;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>イベント情報ダッシュボード</h1>
        <p class="subtitle">各エリアをクリック・操作して、イベントオブジェクトの情報を確認してください</p>

        <div class="test-area">
            <div class="test-box" id="clickBox">
                <strong>クリックしてください</strong>
            </div>
            <div class="test-box" id="mouseBox">
                <strong>マウスを動かしてください</strong>
            </div>
            <div class="test-box" id="dragBox" draggable="true">
                <strong>ドラッグしてください</strong>
            </div>
            <div class="test-box" id="keyBox" tabindex="0">
                <strong>キーを押してください</strong>
            </div>
        </div>

        <div class="dashboard">
            <div class="info-panel">
                <div class="panel-title">基本情報</div>
                <div class="info-item">
                    <span class="info-label">event.type:</span>
                    <span class="info-value" id="eventType">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">event.timeStamp:</span>
                    <span class="info-value" id="timeStamp">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">event.isTrusted:</span>
                    <span class="info-value" id="isTrusted">-</span>
                </div>
            </div>

            <div class="info-panel">
                <div class="panel-title">ターゲット情報</div>
                <div class="info-item">
                    <span class="info-label">target.id:</span>
                    <span class="info-value" id="targetId">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">target.tagName:</span>
                    <span class="info-value" id="targetTag">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">currentTarget.id:</span>
                    <span class="info-value" id="currentTargetId">-</span>
                </div>
            </div>

            <div class="info-panel">
                <div class="panel-title">マウス座標</div>
                <div class="info-item">
                    <span class="info-label">clientX / clientY:</span>
                    <span class="info-value" id="clientCoords">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">pageX / pageY:</span>
                    <span class="info-value" id="pageCoords">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">screenX / screenY:</span>
                    <span class="info-value" id="screenCoords">-</span>
                </div>
            </div>

            <div class="info-panel">
                <div class="panel-title">修飾キー</div>
                <div class="info-item">
                    <span class="info-label">ctrlKey:</span>
                    <span class="info-value" id="ctrlKey">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">shiftKey:</span>
                    <span class="info-value" id="shiftKey">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">altKey:</span>
                    <span class="info-value" id="altKey">-</span>
                </div>
            </div>

            <div class="info-panel">
                <div class="panel-title">キーボード情報</div>
                <div class="info-item">
                    <span class="info-label">key:</span>
                    <span class="info-value" id="key">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">code:</span>
                    <span class="info-value" id="code">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">keyCode:</span>
                    <span class="info-value" id="keyCode">-</span>
                </div>
            </div>

            <div class="info-panel">
                <div class="panel-title">マウスボタン</div>
                <div class="info-item">
                    <span class="info-label">button:</span>
                    <span class="info-value" id="button">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">buttons:</span>
                    <span class="info-value" id="buttons">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">detail:</span>
                    <span class="info-value" id="detail">-</span>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
// 情報表示要素の取得
let eventType = document.getElementById("eventType");
let timeStamp = document.getElementById("timeStamp");
let isTrusted = document.getElementById("isTrusted");
let targetId = document.getElementById("targetId");
let targetTag = document.getElementById("targetTag");
let currentTargetId = document.getElementById("currentTargetId");
let clientCoords = document.getElementById("clientCoords");
let pageCoords = document.getElementById("pageCoords");
let screenCoords = document.getElementById("screenCoords");
let ctrlKey = document.getElementById("ctrlKey");
let shiftKey = document.getElementById("shiftKey");
let altKey = document.getElementById("altKey");
let key = document.getElementById("key");
let code = document.getElementById("code");
let keyCode = document.getElementById("keyCode");
let button = document.getElementById("button");
let buttons = document.getElementById("buttons");
let detail = document.getElementById("detail");

// イベント情報を表示する共通関数
function displayEventInfo(event) {
  // 基本情報
  eventType.textContent = event.type;
  timeStamp.textContent = Math.round(event.timeStamp) + "ms";
  isTrusted.textContent = event.isTrusted;

  // ターゲット情報
  targetId.textContent = event.target.id || "(なし)";
  targetTag.textContent = event.target.tagName;
  currentTargetId.textContent = event.currentTarget.id || "(なし)";

  // マウス座標（マウスイベントの場合のみ）
  if (event.clientX !== undefined) {
    clientCoords.textContent = event.clientX + " / " + event.clientY;
    pageCoords.textContent = event.pageX + " / " + event.pageY;
    screenCoords.textContent = event.screenX + " / " + event.screenY;
  }

  // 修飾キー
  ctrlKey.textContent = event.ctrlKey ? "✓" : "✗";
  shiftKey.textContent = event.shiftKey ? "✓" : "✗";
  altKey.textContent = event.altKey ? "✓" : "✗";

  // キーボード情報（キーボードイベントの場合のみ）
  if (event.key !== undefined) {
    key.textContent = event.key;
    code.textContent = event.code || "-";
    keyCode.textContent = event.keyCode || "-";
  }

  // マウスボタン情報（マウスイベントの場合のみ）
  if (event.button !== undefined) {
    button.textContent = event.button;
    buttons.textContent = event.buttons;
    detail.textContent = event.detail || "-";
  }

  console.log("イベント情報を更新しました:", event.type);
}

// クリックボックス
let clickBox = document.getElementById("clickBox");

clickBox.addEventListener("click", function(event) {
  console.log("--- click イベント ---");
  console.log("event.target:", event.target);
  console.log("event.currentTarget:", event.currentTarget);
  console.log("event.type:", event.type);
  console.log("event.clientX:", event.clientX);
  console.log("event.clientY:", event.clientY);

  displayEventInfo(event);
});

clickBox.addEventListener("dblclick", function(event) {
  console.log("--- dblclick イベント ---");
  displayEventInfo(event);
});

// マウスボックス
let mouseBox = document.getElementById("mouseBox");

mouseBox.addEventListener("mousemove", function(event) {
  displayEventInfo(event);

  // マウス位置に応じて背景色を変化
  let rect = event.currentTarget.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  let percentX = (x / rect.width) * 100;
  let hue = Math.round(percentX * 3.6); // 0-360度

  event.currentTarget.style.backgroundColor = "hsl(" + hue + ", 70%, 90%)";
});

mouseBox.addEventListener("mouseenter", function(event) {
  console.log("--- mouseenter イベント ---");
  displayEventInfo(event);
});

mouseBox.addEventListener("mouseleave", function(event) {
  console.log("--- mouseleave イベント ---");
  event.currentTarget.style.backgroundColor = "#e6f7ff";
});

// ドラッグボックス
let dragBox = document.getElementById("dragBox");

dragBox.addEventListener("dragstart", function(event) {
  console.log("--- dragstart イベント ---");
  console.log("event.target:", event.target);
  displayEventInfo(event);
});

dragBox.addEventListener("drag", function(event) {
  // dragイベントは頻繁に発生するのでログは出さない
  displayEventInfo(event);
});

dragBox.addEventListener("dragend", function(event) {
  console.log("--- dragend イベント ---");
  displayEventInfo(event);
});

// キーボックス
let keyBox = document.getElementById("keyBox");

keyBox.addEventListener("keydown", function(event) {
  console.log("--- keydown イベント ---");
  console.log("event.key:", event.key);
  console.log("event.code:", event.code);
  console.log("event.ctrlKey:", event.ctrlKey);
  console.log("event.shiftKey:", event.shiftKey);
  console.log("event.altKey:", event.altKey);

  displayEventInfo(event);

  // キーに応じて背景色を変化
  if (event.key === "r") {
    event.currentTarget.style.backgroundColor = "#ffe6e6";
  } else if (event.key === "g") {
    event.currentTarget.style.backgroundColor = "#e6ffe6";
  } else if (event.key === "b") {
    event.currentTarget.style.backgroundColor = "#e6e6ff";
  }
});

keyBox.addEventListener("focus", function(event) {
  event.currentTarget.style.outline = "3px solid #667eea";
});

keyBox.addEventListener("blur", function(event) {
  event.currentTarget.style.outline = "none";
});

// ページ全体のキーボードイベント
document.addEventListener("keydown", function(event) {
  // Ctrl+Shift+Iなどのショートカットキーの検出
  if (event.ctrlKey && event.shiftKey && event.key === "I") {
    console.log("開発者ツールのショートカットキーが押されました");
  }

  // Escキーで情報をリセット
  if (event.key === "Escape") {
    console.log("Escキーが押されました - 情報をリセット");
    eventType.textContent = "-";
    targetId.textContent = "-";
    // 他のフィールドもリセット...
  }
});

console.log("イベント情報ダッシュボードが初期化されました");
console.log("各エリアを操作して、イベントオブジェクトの情報を確認してください");
```

### アプリケーションの機能説明

**すべての主要イベントプロパティを表示**:
- `event.type`: イベントの種類
- `event.timeStamp`: イベント発生時刻
- `event.isTrusted`: ユーザー操作によるイベントか
- `event.target`: イベントが発生した要素
- `event.currentTarget`: リスナーが設定されている要素
- マウス座標（clientX/Y, pageX/Y, screenX/Y）
- 修飾キー（ctrlKey, shiftKey, altKey）
- キーボード情報（key, code, keyCode）
- マウスボタン情報（button, buttons, detail）

**イベントタイプごとの情報表示**:
- クリックイベント: マウス座標、ボタン情報
- マウス移動イベント: リアルタイムの座標更新
- ドラッグイベント: ドラッグ中の座標
- キーボードイベント: キー情報、修飾キー

**インタラクティブなフィードバック**:
- マウス位置に応じて背景色を変化（hsl色空間の活用）
- キー入力に応じて背景色を変化
- フォーカス時のアウトライン表示

## 練習問題

### 問題1：クリック位置表示プログラム

次の仕様を満たすプログラムを作成してください。

**仕様**:
1. 300px × 300pxの正方形のボックスを作成
2. ボックスをクリックしたとき、以下の情報を表示する
   - クリックされた座標（ウィンドウ全体での座標）
   - ボックス内での相対座標
   - クリック位置に小さな点（10px × 10px）を描画

**ヒント（レベル1）**:
<details>
<summary>クリックして表示</summary>

- `event.clientX`と`event.clientY`でウィンドウ全体での座標を取得できます
- `getBoundingClientRect()`で要素の位置を取得できます
- 相対座標は `event.clientX - rect.left` で計算できます

</details>

**ヒント（レベル2）**:
<details>
<summary>クリックして表示</summary>

```javascript
box.addEventListener("click", function(event) {
  // ウィンドウ全体での座標
  let clientX = event.clientX;
  let clientY = event.clientY;

  // ボックスの境界矩形を取得
  let rect = event.target.getBoundingClientRect();

  // ボックス内の相対座標
  let relativeX = clientX - rect.left;
  let relativeY = clientY - rect.top;

  // 情報を表示
  console.log("ウィンドウ座標:", clientX, clientY);
  console.log("ボックス内座標:", relativeX, relativeY);
});
```

</details>

**ヒント（レベル3）**:
<details>
<summary>クリックして表示</summary>

```javascript
box.addEventListener("click", function(event) {
  let rect = event.target.getBoundingClientRect();
  let relativeX = event.clientX - rect.left;
  let relativeY = event.clientY - rect.top;

  // 点を作成
  let dot = document.createElement("div");
  dot.style.width = "10px";
  dot.style.height = "10px";
  dot.style.backgroundColor = "red";
  dot.style.borderRadius = "50%";
  dot.style.position = "absolute";
  dot.style.left = (relativeX - 5) + "px"; // 中心を合わせる
  dot.style.top = (relativeY - 5) + "px";

  // ボックスに追加（ボックスはposition: relativeにする）
  event.target.appendChild(dot);
});
```

</details>

### 問題2：カラーパレット選択プログラム

次の仕様を満たすプログラムを作成してください。

**仕様**:
1. 6つの色ボタンを作成（赤、青、緑、黄、紫、オレンジ）
2. イベント委譲を使って、親要素に1つだけイベントリスナーを設定
3. ボタンがクリックされたとき、`event.target`で判定し、以下を実行
   - 選択された色を表示エリアに表示
   - どのボタンがクリックされたかをコンソールに出力
   - data属性から色情報を取得

**ヒント（レベル1）**:
<details>
<summary>クリックして表示</summary>

- `data-color`属性に色の名前を設定します
- `event.target.dataset.color`で色を取得できます
- `classList.contains()`でボタンかどうかを判定します

</details>

**ヒント（レベル2）**:
<details>
<summary>クリックして表示</summary>

```html
<div id="palette">
  <button class="color-btn" data-color="red">赤</button>
  <button class="color-btn" data-color="blue">青</button>
  <!-- 他のボタン -->
</div>
<div id="display"></div>
```

```javascript
let palette = document.getElementById("palette");
let display = document.getElementById("display");

palette.addEventListener("click", function(event) {
  if (event.target.classList.contains("color-btn")) {
    // ここで処理
  }
});
```

</details>

**ヒント（レベル3）**:
<details>
<summary>クリックして表示</summary>

```javascript
palette.addEventListener("click", function(event) {
  if (event.target.classList.contains("color-btn")) {
    let color = event.target.dataset.color;

    display.style.backgroundColor = color;

    console.log("選択された色:", color);
    console.log("クリックされた要素:", event.target);
    console.log("イベントリスナーが設定されている要素:", event.currentTarget);
  }
});
```

</details>

### 問題3：マウス追跡プログラム

次の仕様を満たすプログラムを作成してください。

**仕様**:
1. 400px × 300pxのボックスを作成
2. ボックス内でマウスを動かすと、以下の情報をリアルタイムで表示
   - マウスのX座標とY座標（ウィンドウ基準）
   - ボックス内の相対X座標とY座標
   - ボックス内での位置（パーセンテージ）
3. マウスがボックスから出たら、座標情報をリセット

**ヒント（レベル1）**:
<details>
<summary>クリックして表示</summary>

- `mousemove`イベントを使います
- `event.clientX`と`event.clientY`で座標を取得
- `mouseout`イベントで情報をリセット

</details>

**ヒント（レベル2）**:
<details>
<summary>クリックして表示</summary>

```javascript
box.addEventListener("mousemove", function(event) {
  let rect = event.target.getBoundingClientRect();
  let relativeX = event.clientX - rect.left;
  let relativeY = event.clientY - rect.top;

  // パーセンテージ計算
  let percentX = (relativeX / rect.width) * 100;
  let percentY = (relativeY / rect.height) * 100;

  // 表示更新
});

box.addEventListener("mouseout", function(event) {
  // 情報をリセット
});
```

</details>

**ヒント（レベル3）**:
<details>
<summary>クリックして表示</summary>

```javascript
let coordsDisplay = document.getElementById("coords");
let relativeDisplay = document.getElementById("relative");
let percentDisplay = document.getElementById("percent");

box.addEventListener("mousemove", function(event) {
  let rect = event.target.getBoundingClientRect();
  let relativeX = event.clientX - rect.left;
  let relativeY = event.clientY - rect.top;
  let percentX = (relativeX / rect.width) * 100;
  let percentY = (relativeY / rect.height) * 100;

  coordsDisplay.textContent = "X: " + event.clientX + ", Y: " + event.clientY;
  relativeDisplay.textContent = "X: " + Math.round(relativeX) + ", Y: " + Math.round(relativeY);
  percentDisplay.textContent = "X: " + percentX.toFixed(1) + "%, Y: " + percentY.toFixed(1) + "%";
});

box.addEventListener("mouseout", function(event) {
  coordsDisplay.textContent = "-";
  relativeDisplay.textContent = "-";
  percentDisplay.textContent = "-";
});
```

</details>

## まとめ

このレッスンでは、以下のことを学びました。

### 学習した内容

1. **イベントオブジェクトの基本**
   - `function(event) { }`の使い方
   - イベントオブジェクトは自動的に渡される
   - 引数名は何でもよいが、`event`や`e`が慣例

2. **event.target - イベントが発生した要素**
   - 実際にクリックされた要素を取得
   - イベント委譲での活用
   - data属性との組み合わせ

3. **event.currentTarget - リスナーが設定された要素**
   - `event.target`との違い
   - イベント委譲での使い分け
   - `this`との関係

4. **マウス座標情報**
   - `clientX/Y`: ウィンドウ基準の座標
   - `pageX/Y`: ページ全体の座標
   - `screenX/Y`: モニター画面の座標
   - `getBoundingClientRect()`との組み合わせで相対座標を計算

5. **その他のイベント情報**
   - `event.type`: イベントの種類
   - `event.timeStamp`: イベント発生時刻
   - `event.key/code`: キーボード情報
   - `event.ctrlKey/shiftKey/altKey`: 修飾キー

6. **イベントオブジェクトのメソッド**
   - `event.preventDefault()`: デフォルト動作を防ぐ
   - `event.stopPropagation()`: イベント伝播を止める

### 重要なポイント

- **event.targetの活用**: イベント委譲により効率的なコード
- **座標の計算**: `clientX - rect.left`で要素内の相対座標
- **event.currentTargetとの違い**: イベント委譲では使い分けが重要
- **data属性**: `dataset`プロパティで簡単にアクセス
- **座標系の理解**: clientX, pageX, screenXの違いを把握

イベントオブジェクトを活用することで、より柔軟で高度なイベント処理ができるようになりました。次のレッスンでは、イベントの伝播（バブリング）について学んでいきます。
