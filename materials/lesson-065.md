---
title: "Lesson 065: マウスイベント"
author: "JavaScript学習教材"
date: "2025-11-20"
---

## 今回の学習

### 前回の復習

前回のレッスンでは、`addEventListener`の基礎について学びました。`onclick`属性よりも柔軟で強力な方法として、`addEventListener`を使うことで、HTMLとJavaScriptを分離し、複数のイベントリスナーを登録できるようになりました。

### 今回の目標

今回のレッスンでは、**マウスイベント**について学びます。クリック以外にも、マウスの動きに反応するさまざまなイベントがあります。これらを使いこなすことで、より豊かなユーザーインタラクションを実現できます。

今回のレッスンで習得する内容は以下の通りです。

- mouseover/mouseoutイベントの使い方
- mousedown/mouseupイベントの使い方
- ホバーエフェクトの実装

## マウスイベントの種類

JavaScriptには、マウスの動きに反応するさまざまなイベントがあります。主なマウスイベントは以下の通りです。

### 基本的なマウスイベント

- **click**: マウスをクリックした時（押して離す）
- **dblclick**: ダブルクリックした時
- **mouseover**: マウスカーソルが要素の上に乗った時
- **mouseout**: マウスカーソルが要素から離れた時
- **mousedown**: マウスボタンを押した時
- **mouseup**: マウスボタンを離した時
- **mousemove**: マウスカーソルが移動した時

今回は、特に`mouseover`、`mouseout`、`mousedown`、`mouseup`について詳しく学びます。

## mouseover/mouseoutイベント

`mouseover`と`mouseout`は、マウスカーソルが要素の上に乗った時と離れた時に発生するイベントです。これらを使うことで、ホバーエフェクトを実装できます。

### 基本的な使い方

```javascript
let box = document.getElementById("box");

box.addEventListener("mouseover", function() {
  console.log("マウスが乗りました");
});

box.addEventListener("mouseout", function() {
  console.log("マウスが離れました");
});
```

このコードでは、マウスカーソルが`box`要素の上に乗ると「マウスが乗りました」と表示され、離れると「マウスが離れました」と表示されます。

### 実践例：色が変わるボックス

マウスが乗ると色が変わるボックスを作ってみましょう。

```html
<div id="colorBox" style="width: 200px; height: 200px; background-color: lightblue;">
  マウスを乗せてね
</div>
```

```javascript
let colorBox = document.getElementById("colorBox");

colorBox.addEventListener("mouseover", function() {
  colorBox.style.backgroundColor = "lightcoral";
});

colorBox.addEventListener("mouseout", function() {
  colorBox.style.backgroundColor = "lightblue";
});
```

このコードでは、以下の動作をします。

1. マウスが乗ると、背景色が薄い青（lightblue）から薄い赤（lightcoral）に変わります
2. マウスが離れると、背景色が元の薄い青に戻ります

これは、Webサイトでよく見るホバーエフェクトの基本です。

## ホバーエフェクトの応用

ホバーエフェクトは、色の変化だけでなく、さまざまな視覚効果に使えます。

### 例1: サイズの変更

```javascript
let box = document.getElementById("box");

box.addEventListener("mouseover", function() {
  box.style.transform = "scale(1.2)";
  box.style.transition = "transform 0.3s";
});

box.addEventListener("mouseout", function() {
  box.style.transform = "scale(1)";
});
```

マウスが乗ると要素が1.2倍に拡大され、離れると元のサイズに戻ります。

### 例2: テキストの表示

```javascript
let box = document.getElementById("box");
let message = document.getElementById("message");

box.addEventListener("mouseover", function() {
  message.textContent = "ようこそ！";
});

box.addEventListener("mouseout", function() {
  message.textContent = "";
});
```

マウスが乗るとメッセージが表示され、離れると消えます。

### 例3: 複数のスタイル変更

```javascript
let card = document.getElementById("card");

card.addEventListener("mouseover", function() {
  card.style.backgroundColor = "lightyellow";
  card.style.borderColor = "orange";
  card.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
});

card.addEventListener("mouseout", function() {
  card.style.backgroundColor = "white";
  card.style.borderColor = "gray";
  card.style.boxShadow = "none";
});
```

マウスが乗ると、背景色、枠線の色、影がすべて変化します。これにより、カードが浮き上がったような効果を作れます。

## mousedown/mouseupイベント

`mousedown`と`mouseup`は、マウスボタンの押下と離上を検出するイベントです。`click`イベントとの違いは、`click`が「押して離す」までの一連の動作であるのに対し、`mousedown`と`mouseup`はそれぞれ独立したタイミングで発生します。

### clickとmousedown/mouseupの違い

```javascript
let button = document.getElementById("button");

// clickイベント（押して離した時）
button.addEventListener("click", function() {
  console.log("クリックされました");
});

// mousedownイベント（押した時）
button.addEventListener("mousedown", function() {
  console.log("マウスボタンが押されました");
});

// mouseupイベント（離した時）
button.addEventListener("mouseup", function() {
  console.log("マウスボタンが離されました");
});
```

実行順序は以下の通りです。

1. マウスボタンを押す → "マウスボタンが押されました"
2. マウスボタンを離す → "マウスボタンが離されました" → "クリックされました"

### 実践例：押している間だけ効果を適用

`mousedown`と`mouseup`を使うと、押している間だけ特定の効果を適用できます。

```javascript
let button = document.getElementById("button");

button.addEventListener("mousedown", function() {
  button.style.backgroundColor = "darkblue";
  button.style.color = "white";
});

button.addEventListener("mouseup", function() {
  button.style.backgroundColor = "lightblue";
  button.style.color = "black";
});
```

このコードでは、マウスボタンを押している間だけボタンが暗い色になり、離すと元に戻ります。これは、ボタンが押されていることを視覚的にフィードバックする良い方法です。

### 実践例：ドラッグ可能な要素の基礎

`mousedown`と`mouseup`は、ドラッグ＆ドロップの実装にも使われます（完全な実装は後のレッスンで学びます）。

```javascript
let box = document.getElementById("box");
let isDragging = false;

box.addEventListener("mousedown", function() {
  isDragging = true;
  box.style.cursor = "grabbing";
  console.log("ドラッグ開始");
});

box.addEventListener("mouseup", function() {
  isDragging = false;
  box.style.cursor = "grab";
  console.log("ドラッグ終了");
});
```

このコードでは、マウスボタンを押すとドラッグ状態になり、カーソルの形が変わります。

## 複数のマウスイベントを組み合わせる

実際のアプリケーションでは、複数のマウスイベントを組み合わせて使うことが多いです。

### 例：インタラクティブなカード

```html
<div id="interactiveCard" style="width: 200px; height: 150px; background-color: lightgray; border: 2px solid gray; padding: 20px;">
  カードの内容
</div>
<p id="status"></p>
```

```javascript
let card = document.getElementById("interactiveCard");
let status = document.getElementById("status");

// マウスが乗った時
card.addEventListener("mouseover", function() {
  card.style.backgroundColor = "lightblue";
  status.textContent = "カードの上にマウスがあります";
});

// マウスが離れた時
card.addEventListener("mouseout", function() {
  card.style.backgroundColor = "lightgray";
  status.textContent = "";
});

// マウスボタンを押した時
card.addEventListener("mousedown", function() {
  card.style.transform = "scale(0.95)";
  status.textContent = "カードが押されています";
});

// マウスボタンを離した時
card.addEventListener("mouseup", function() {
  card.style.transform = "scale(1)";
  status.textContent = "カードの上にマウスがあります";
});

// クリックした時
card.addEventListener("click", function() {
  status.textContent = "カードがクリックされました！";
});
```

このコードでは、カードに対するさまざまなマウス操作に反応します。

1. **ホバー**: マウスが乗ると色が変わる
2. **押下**: マウスボタンを押すと少し縮む
3. **離上**: マウスボタンを離すと元のサイズに戻る
4. **クリック**: クリックするとメッセージが表示される

これにより、ユーザーはカードが反応していることを明確に感じられます。

## イベントの発生順序

マウスでクリックする際、複数のイベントが順番に発生します。

```javascript
let box = document.getElementById("box");

box.addEventListener("mousedown", function() {
  console.log("1. mousedown");
});

box.addEventListener("mouseup", function() {
  console.log("2. mouseup");
});

box.addEventListener("click", function() {
  console.log("3. click");
});

box.addEventListener("mouseover", function() {
  console.log("4. mouseover（最初にマウスが乗った時）");
});

box.addEventListener("mouseout", function() {
  console.log("5. mouseout（マウスが離れた時）");
});
```

実際の動作順序は以下の通りです。

1. マウスを要素の上に移動 → `mouseover`
2. マウスボタンを押す → `mousedown`
3. マウスボタンを離す → `mouseup` → `click`
4. マウスを要素から離す → `mouseout`

この順序を理解しておくと、複雑なインタラクションを実装する際に役立ちます。

## 実用的なパターン

### パターン1: ツールチップの表示

マウスを乗せると説明が表示されるツールチップを実装できます。

```javascript
let helpIcon = document.getElementById("helpIcon");
let tooltip = document.getElementById("tooltip");

helpIcon.addEventListener("mouseover", function() {
  tooltip.style.display = "block";
});

helpIcon.addEventListener("mouseout", function() {
  tooltip.style.display = "none";
});
```

### パターン2: ボタンのフィードバック

ボタンが押されていることを視覚的にフィードバックします。

```javascript
let button = document.getElementById("button");

button.addEventListener("mousedown", function() {
  button.style.transform = "translateY(2px)";
  button.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
});

button.addEventListener("mouseup", function() {
  button.style.transform = "translateY(0)";
  button.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
});
```

### パターン3: 画像のプレビュー

マウスを乗せると画像が拡大表示されます。

```javascript
let thumbnail = document.getElementById("thumbnail");

thumbnail.addEventListener("mouseover", function() {
  thumbnail.style.transform = "scale(1.5)";
  thumbnail.style.zIndex = "10";
});

thumbnail.addEventListener("mouseout", function() {
  thumbnail.style.transform = "scale(1)";
  thumbnail.style.zIndex = "1";
});
```

## 練習問題

### 課題

マウスイベントを使って、インタラクティブなボックスを作成しましょう。マウスの動きに応じて、ボックスの色やサイズが変化します。

### 保存場所

`exercises/lesson-065/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. mouseover/mouseoutイベントでホバーエフェクトを実装する
2. mousedown/mouseupイベントで押下効果を実装する
3. 状態メッセージを表示する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-065
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

- `box`という id の要素を作成します（200x200pxのボックス）
- `status`という id の要素を作成します（状態表示用）
- `mouseover`イベントで、背景色を変更し、状態メッセージを表示します
- `mouseout`イベントで、背景色を元に戻し、状態メッセージをクリアします
- `mousedown`イベントで、ボックスを少し縮小します
- `mouseup`イベントで、ボックスのサイズを元に戻します

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 065</title>
    <style>
        #box {
            width: 200px;
            height: 200px;
            background-color: lightblue;
            border: 2px solid blue;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
        }
    </style>
</head>
<body>
    <h1>マウスイベント練習</h1>
    <div id="box">マウスを動かしてね</div>
    <p id="status"></p>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
let box = document.getElementById("box");
let status = document.getElementById("status");

// マウスが乗った時
box.addEventListener("mouseover", function() {
  box.style.backgroundColor = "lightcoral";
  status.textContent = "マウスがボックスの上にあります";
});

// マウスが離れた時
box.addEventListener("mouseout", function() {
  box.style.backgroundColor = "lightblue";
  status.textContent = "";
});

// マウスボタンを押した時
box.addEventListener("mousedown", function() {
  box.style.transform = "scale(0.9)";
  status.textContent = "ボックスが押されています";
});

// マウスボタンを離した時
box.addEventListener("mouseup", function() {
  box.style.transform = "scale(1)";
  status.textContent = "マウスがボックスの上にあります";
});
```

### 解説

このプログラムは、マウスイベントを使ってインタラクティブなボックスを実装しています。

1. **mouseover**: マウスカーソルがボックスの上に乗ると、背景色が薄い青から薄い赤に変わり、状態メッセージが表示されます

2. **mouseout**: マウスカーソルがボックスから離れると、背景色が元の薄い青に戻り、状態メッセージがクリアされます

3. **mousedown**: マウスボタンを押すと、ボックスが90%のサイズに縮小され、押されている感覚を表現します

4. **mouseup**: マウスボタンを離すと、ボックスが元のサイズに戻ります

CSSの`transition: all 0.3s;`により、色やサイズの変化がスムーズになります。

このようなマウスイベントを組み合わせることで、ユーザーにとって直感的で分かりやすいインターフェースを作ることができます。

## まとめ

お疲れ様でした。今回のレッスンでは、マウスイベントについて学びました。

**今回のキーポイント:**

- **mouseover/mouseout**: マウスカーソルが要素の上に乗った時と離れた時に発生するイベントです。ホバーエフェクトの実装に使われ、色やサイズの変更、ツールチップの表示など、さまざまな視覚効果を実現できます。Webサイトのインタラクティブな要素を作る基本的な技術です

- **mousedown/mouseup**: マウスボタンを押した時と離した時に発生するイベントです。`click`イベントとは異なり、押下と離上を個別に検出できます。ボタンの押下フィードバックやドラッグ操作の開始/終了の検出に使われます

- **ホバーエフェクト**: マウスイベントを組み合わせることで、ユーザーにとって直感的なインターフェースを作れます。色の変化、サイズの変更、影の追加など、複数のスタイル変更を組み合わせることで、要素がクリック可能であることや、現在の状態を視覚的に伝えられます

マウスイベントは、ユーザーとアプリケーションの間のコミュニケーションを豊かにする重要な要素です。適切に使うことで、ユーザー体験が大きく向上します。

次のレッスンでは、キーボードイベントについて学びます。キーボード入力に反応する処理を実装し、さらに多様なインタラクションを実現していきましょう。
