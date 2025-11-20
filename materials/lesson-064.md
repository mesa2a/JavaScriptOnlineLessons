---
title: "Lesson 064: イベントリスナー基礎"
author: "JavaScript学習教材"
date: "2025-11-20"
---

## 今回の学習

### 前回の復習

前回のレッスンでは、RPG風バトルゲームを作成しました。変数、条件分岐、関数、DOM操作、ランダム要素など、これまで学んだすべての知識を統合して、実践的なゲームを完成させました。状態管理、HP判定、ダメージ計算などを実装し、総合的なプログラミングスキルを体験しました。

### 今回の目標

今回のレッスンでは、**イベントリスナー**について学びます。これまで`onclick`属性を使ってボタンのクリックイベントを処理してきましたが、より柔軟で強力な方法として`addEventListener`があります。この方法を使うことで、より高度なイベント処理が可能になります。

今回のレッスンで習得する内容は以下の通りです。

- `addEventListener`の基本的な使い方
- `onclick`との違いと利点
- 複数のリスナーの登録

## これまでのイベント処理

これまで、ボタンのクリックイベントを処理する際、HTML側で`onclick`属性を使ってきました。

```html
<button onclick="showMessage()">クリック</button>
```

```javascript
function showMessage() {
  alert("ボタンがクリックされました");
}
```

この方法はシンプルで分かりやすいですが、いくつかの制約があります。

### onclick属性の制約

1. **1つの要素に1つのイベントのみ**: 同じ要素に複数のクリックイベントを登録できません
2. **HTMLとJavaScriptの混在**: HTML側にJavaScript関数名が書かれるため、分離が不十分です
3. **削除が難しい**: 一度設定したイベントを後から削除するのが困難です

これらの制約を解決するのが、`addEventListener`です。

## addEventListenerとは

`addEventListener`は、要素にイベントリスナーを登録するJavaScriptのメソッドです。これにより、HTML側に何も書かずに、JavaScript側だけでイベント処理を完結できます。

### 基本的な構文

```javascript
要素.addEventListener(イベント名, 関数);
```

具体的な例を見てみましょう。

```html
<button id="myButton">クリック</button>
```

```javascript
function showMessage() {
  alert("ボタンがクリックされました");
}

let button = document.getElementById("myButton");
button.addEventListener("click", showMessage);
```

このコードでは、以下の処理を行っています。

1. **要素の取得**: `getElementById`でボタン要素を取得
2. **イベントリスナーの登録**: `addEventListener`でクリックイベントを登録
3. **関数の指定**: イベント発生時に実行する関数を指定

注意点として、関数を指定する際は`showMessage()`ではなく`showMessage`と書きます。`()`を付けると、その場で関数が実行されてしまうためです。

## イベント名の種類

`addEventListener`では、さまざまなイベントを扱えます。代表的なイベント名は以下の通りです。

- **"click"**: クリックされた時
- **"dblclick"**: ダブルクリックされた時
- **"mouseover"**: マウスが要素の上に乗った時
- **"mouseout"**: マウスが要素から離れた時
- **"keydown"**: キーが押された時
- **"input"**: 入力値が変更された時

今回は基本的な`"click"`イベントから学んでいきます。

## onclick属性との違い

`onclick`属性と`addEventListener`の違いを比較してみましょう。

### onclick属性を使う場合

```html
<button onclick="showMessage()">クリック</button>
```

```javascript
function showMessage() {
  alert("メッセージ");
}
```

### addEventListenerを使う場合

```html
<button id="myButton">クリック</button>
```

```javascript
function showMessage() {
  alert("メッセージ");
}

let button = document.getElementById("myButton");
button.addEventListener("click", showMessage);
```

一見すると`addEventListener`の方が複雑に見えますが、以下のような利点があります。

### addEventListenerの利点

**1. HTMLとJavaScriptの分離**

HTML側にはJavaScriptのコードが一切含まれません。HTML構造とイベント処理が明確に分離されます。

```html
<!-- HTMLはシンプル -->
<button id="myButton">クリック</button>
```

```javascript
// JavaScript側でイベントを管理
button.addEventListener("click", showMessage);
```

**2. 複数のリスナーを登録できる**

同じ要素に複数のイベントリスナーを登録できます。

```javascript
let button = document.getElementById("myButton");

button.addEventListener("click", showMessage1);
button.addEventListener("click", showMessage2);
button.addEventListener("click", showMessage3);
```

この場合、ボタンをクリックすると、3つの関数がすべて実行されます。

**3. イベントの削除が可能**

後でイベントリスナーを削除できます（次のレッスンで学びます）。

**4. より多くのイベントに対応**

`onclick`、`onmouseover`などの属性では扱えないイベントも、`addEventListener`なら統一的に扱えます。

## 複数のリスナーを登録する

`addEventListener`の大きな利点の1つは、同じ要素に複数のイベントリスナーを登録できることです。

```javascript
let button = document.getElementById("myButton");

function changeColor() {
  button.style.backgroundColor = "blue";
}

function showMessage() {
  alert("クリックされました");
}

function updateCount() {
  let count = Number(button.textContent) || 0;
  button.textContent = count + 1;
}

// 3つのリスナーを登録
button.addEventListener("click", changeColor);
button.addEventListener("click", showMessage);
button.addEventListener("click", updateCount);
```

このコードでは、ボタンをクリックすると、以下の3つの処理がすべて実行されます。

1. ボタンの背景色が青に変わる
2. アラートが表示される
3. ボタンのテキストがカウントアップされる

`onclick`属性では、このような複数の処理を1つの要素に登録することはできません。

## 実践例：カウンターボタン

`addEventListener`を使ったカウンターボタンを作ってみましょう。

**HTML部分:**

```html
<button id="counterButton">0</button>
<button id="resetButton">リセット</button>
<p id="message"></p>
```

**JavaScript部分:**

```javascript
let counterButton = document.getElementById("counterButton");
let resetButton = document.getElementById("resetButton");
let count = 0;

function incrementCount() {
  count = count + 1;
  counterButton.textContent = count;
}

function showMessage() {
  let message = document.getElementById("message");
  message.textContent = "カウント: " + count;
}

function resetCount() {
  count = 0;
  counterButton.textContent = count;
  document.getElementById("message").textContent = "";
}

// カウンターボタンに2つのリスナーを登録
counterButton.addEventListener("click", incrementCount);
counterButton.addEventListener("click", showMessage);

// リセットボタンにリスナーを登録
resetButton.addEventListener("click", resetCount);
```

このコードでは、以下の処理を行っています。

1. **カウンターボタン**: クリックされるとカウントが増え、メッセージも更新されます（2つのリスナー）
2. **リセットボタン**: クリックされるとカウントが0にリセットされます

## 関数を直接書く方法

関数を別に定義せず、`addEventListener`の中に直接書くこともできます。

```javascript
let button = document.getElementById("myButton");

button.addEventListener("click", function() {
  alert("クリックされました");
});
```

この書き方を**無名関数**（または匿名関数）と呼びます。関数に名前を付けずに、その場で定義して使用します。

無名関数は、以下のような場合に便利です。

- その場でしか使わない処理
- 短い処理
- 1回だけ使う処理

ただし、複雑な処理や再利用する処理は、名前付き関数として定義した方が分かりやすくなります。

## イベントリスナーの基本パターン

イベントリスナーを使う基本的なパターンをまとめます。

### パターン1: 名前付き関数を使う

```javascript
function handleClick() {
  console.log("クリックされました");
}

let button = document.getElementById("myButton");
button.addEventListener("click", handleClick);
```

この方法は、以下の場合に適しています。

- 複数の要素で同じ処理を使う場合
- 複雑な処理を行う場合
- 後でイベントを削除する可能性がある場合

### パターン2: 無名関数を使う

```javascript
let button = document.getElementById("myButton");
button.addEventListener("click", function() {
  console.log("クリックされました");
});
```

この方法は、以下の場合に適しています。

- その要素でしか使わない処理
- シンプルな処理
- 一時的な処理

## 複数の要素にイベントを登録する

複数のボタンに同じイベントリスナーを登録する場合、関数を再利用できます。

```javascript
function handleClick() {
  alert("ボタンがクリックされました");
}

let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");

button1.addEventListener("click", handleClick);
button2.addEventListener("click", handleClick);
button3.addEventListener("click", handleClick);
```

この場合、3つのボタンすべてが同じ`handleClick`関数を実行します。

## 練習問題

### 課題

`addEventListener`を使って、複数のボタンにイベントリスナーを登録しましょう。各ボタンをクリックすると、対応するメッセージが表示されます。

### 保存場所

`exercises/lesson-064/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. `addEventListener`を使ってイベントリスナーを登録する
2. 複数のリスナーを同じ要素に登録する
3. 各ボタンに適切な処理を設定する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-064
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

- 3つのボタン要素を作成します（id: button1, button2, button3）
- 結果を表示する要素（id: result）を作成します
- `getElementById`で各ボタン要素を取得します
- 各ボタンに対して`addEventListener`を使ってクリックイベントを登録します
- クリック時に実行する関数を作成します（各ボタンごとに異なるメッセージを表示）
- `result`要素の`textContent`を更新してメッセージを表示します

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 064</title>
</head>
<body>
    <h1>イベントリスナー練習</h1>
    <button id="button1">ボタン1</button>
    <button id="button2">ボタン2</button>
    <button id="button3">ボタン3</button>
    <p id="result"></p>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
// 要素を取得
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let result = document.getElementById("result");

// ボタン1の処理
function handleButton1() {
  result.textContent = "ボタン1がクリックされました";
}

// ボタン2の処理
function handleButton2() {
  result.textContent = "ボタン2がクリックされました";
}

// ボタン3の処理
function handleButton3() {
  result.textContent = "ボタン3がクリックされました";
}

// イベントリスナーを登録
button1.addEventListener("click", handleButton1);
button2.addEventListener("click", handleButton2);
button3.addEventListener("click", handleButton3);
```

### 解説

このプログラムは、`addEventListener`を使ってイベント処理を実装しています。

1. **要素の取得**: `getElementById`で各ボタンと結果表示用の要素を取得しています

2. **関数の定義**: 各ボタンがクリックされた時に実行する関数を定義しています。それぞれ異なるメッセージを表示します

3. **イベントリスナーの登録**: `addEventListener`を使って、各ボタンに対応する関数を登録しています。`"click"`イベントを指定し、実行する関数を渡しています

4. **HTMLとの分離**: HTML側には`onclick`属性がなく、すべてのイベント処理がJavaScript側で完結しています

この方法の利点は、以下の通りです。

- **保守性**: イベント処理がすべてJavaScript側にまとまっているため、修正や追加が簡単です
- **拡張性**: 後から新しいイベントリスナーを追加することも容易です
- **テスト性**: JavaScript側でイベント処理が完結しているため、テストが書きやすくなります

もし、同じ要素に複数の処理を追加したい場合は、以下のように書けます。

```javascript
button1.addEventListener("click", handleButton1);
button1.addEventListener("click", function() {
  console.log("ボタン1がクリックされました");
});
```

この場合、ボタン1をクリックすると、2つの処理が両方実行されます。

## まとめ

お疲れ様でした。今回のレッスンでは、イベントリスナーの基礎について学びました。

**今回のキーポイント:**

- **addEventListener**: 要素にイベントリスナーを登録するメソッドです。`要素.addEventListener(イベント名, 関数)`という構文で使用します。HTMLとJavaScriptを分離でき、より柔軟なイベント処理が可能になります

- **onclickとの違い**: `onclick`属性は1つの要素に1つのイベントしか登録できませんが、`addEventListener`は同じ要素に複数のイベントリスナーを登録できます。また、HTMLとJavaScriptが分離され、コードの保守性が向上します

- **複数のリスナー**: 同じ要素に対して`addEventListener`を複数回呼び出すことで、複数の処理を登録できます。すべてのリスナーが順番に実行されるため、複雑な処理を段階的に実装できます

`addEventListener`は、モダンなJavaScript開発で標準的に使われる重要な機能です。`onclick`属性よりも柔軟で強力なため、今後はこちらを積極的に使っていくことをお勧めします。

次のレッスンでは、マウスイベントやキーボードイベントなど、クリック以外のさまざまなイベントについて学びます。より豊かなユーザーインタラクションを実現していきましょう。
