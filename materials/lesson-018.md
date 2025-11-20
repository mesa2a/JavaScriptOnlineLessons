---
title: "Lesson 018: 表示/非表示を切り替える"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 018: 表示/非表示を切り替える

---

## 今回の学習

### 前回の復習

前回は、`style`プロパティを使って要素のサイズを変更する方法を学びました。`style.fontSize`で文字の大きさ、`style.width`と`style.height`で要素の幅と高さを変更できるようになりました。単位（px）を付けることの重要性も学びました。

### 今回の目標

1. `style.display`プロパティの使い方を理解する
2. 要素を非表示にできるようになる
3. 非表示の要素を再表示できるようになる

---

## displayプロパティとは

### displayプロパティの役割

`display`プロパティは、要素の表示状態を制御するプロパティです。要素を画面に表示するか、非表示にするかを決めることができます。

これまで学んだプロパティとの違いは以下の通りです。

- `textContent`: 要素の**内容**を変更
- `color`、`backgroundColor`: 要素の**色**を変更
- `fontSize`、`width`、`height`: 要素の**サイズ**を変更
- `display`: 要素の**表示/非表示**を変更

---

## 要素の表示制御

### 要素を非表示にする

要素を非表示にするには、`display`プロパティに`"none"`を設定します。

```javascript
// 要素を取得
let elem = document.getElementById("message");

// 要素を非表示にする
elem.style.display = "none";
```

このコードを実行すると、要素が画面から消えます。完全に消えるため、その要素があった場所は詰まります。

### 要素を表示する

非表示になっている要素を再表示するには、`display`プロパティに`"block"`を設定します。

```javascript
// 要素を取得
let elem = document.getElementById("message");

// 要素を表示する
elem.style.display = "block";
```

このコードを実行すると、非表示だった要素が再び表示されます。

---

## displayの値

### block

`"block"`は、要素を通常通り表示する値です。要素は縦に並び、1つの要素が1行を占有します。

```javascript
elem.style.display = "block";
```

`<p>`、`<div>`、`<h1>`などの要素は、デフォルトで`block`として表示されます。

### none

`"none"`は、要素を完全に非表示にする値です。要素は画面から消え、その場所も詰まります。

```javascript
elem.style.display = "none";
```

マジックのように、要素を消したり現したりできます。

### その他の値

`display`には他にも値がありますが、今回は`block`と`none`だけを使います。

- `inline`: 要素を横に並べる（`<span>`など）
- `flex`: 柔軟なレイアウト
- `grid`: グリッドレイアウト

これらは後の学習で使います。

---

## 実践：要素を消したり現したり

### 1つの要素を操作する

まず、1つの要素を非表示にしてみましょう。

**HTML:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 018</title>
</head>
<body>
    <p id="message">このメッセージは消えます</p>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript:**

```javascript
// 要素を取得
let elem = document.getElementById("message");

// 要素を非表示にする
elem.style.display = "none";
```

このコードを実行すると、「このメッセージは消えます」という文字が画面から消えます。

### 3つの要素を順番に表示する

3つの要素を用意し、最初は全て非表示にして、1つずつ表示してみましょう。

**HTML:**

```html
<p id="text1">1番目</p>
<p id="text2">2番目</p>
<p id="text3">3番目</p>
```

**JavaScript:**

```javascript
// 3つの要素を取得
let elem1 = document.getElementById("text1");
let elem2 = document.getElementById("text2");
let elem3 = document.getElementById("text3");

// 最初は全て非表示
elem1.style.display = "none";
elem2.style.display = "none";
elem3.style.display = "none";

// 1番目だけ表示
elem1.style.display = "block";
```

このコードでは、最初に3つの要素を全て非表示にしてから、1番目だけを表示しています。

---

## マジックショーを作る

### 要素が消えたり現れたり

複数の要素の表示を切り替えることで、マジックのような効果を作れます。

**例：2つの要素を交互に表示**

```javascript
// 2つの要素を取得
let elem1 = document.getElementById("card1");
let elem2 = document.getElementById("card2");

// 最初は1番目だけ表示
elem1.style.display = "block";
elem2.style.display = "none";
```

その後、表示を入れ替えると、カードが入れ替わったように見えます。

```javascript
// 表示を入れ替える
elem1.style.display = "none";
elem2.style.display = "block";
```

---

## displayとvisibilityの違い

### display: none

`display: none`を設定すると、要素は完全に消え、その場所も詰まります。

```javascript
elem.style.display = "none";
```

**結果:**
- 要素が画面から消える
- 要素があった場所が詰まる
- 他の要素が上に詰まる

### visibility: hidden（参考）

`visibility: hidden`という別のプロパティもあります。これは要素を透明にしますが、場所は残ります。

```javascript
elem.style.visibility = "hidden";
```

**結果:**
- 要素が見えなくなる
- 要素があった場所は空白のまま残る

今回は`display`を使います。

---

## よくある間違いと注意点

### 間違い1：値の指定ミス

```javascript
elem.style.display = "hide";     // 間違い（正しくはnone）
elem.style.display = "show";     // 間違い（正しくはblock）
```

正しくは以下のようになります。

```javascript
elem.style.display = "none";     // 非表示
elem.style.display = "block";    // 表示
```

### 間違い2：引用符を忘れる

```javascript
elem.style.display = none;       // エラー（引用符がない）
```

正しくは以下のようになります。

```javascript
elem.style.display = "none";     // 正しい
```

### 間違い3：要素を取得していない

```javascript
// 要素を取得せずに使おうとする
elem.style.display = "none";     // エラー（elemが未定義）
```

正しくは以下のようになります。

```javascript
let elem = document.getElementById("message");
elem.style.display = "none";
```

---

## 実用例

### メッセージの表示/非表示

エラーメッセージや成功メッセージを、必要なときだけ表示できます。

```html
<p id="error-message">エラーが発生しました</p>
<p id="success-message">成功しました</p>
```

```javascript
let errorMsg = document.getElementById("error-message");
let successMsg = document.getElementById("success-message");

// 最初は両方非表示
errorMsg.style.display = "none";
successMsg.style.display = "none";

// 成功した場合、成功メッセージだけ表示
successMsg.style.display = "block";
```

### メニューの開閉

ハンバーガーメニューなど、クリックで開閉するメニューを作れます。

```html
<div id="menu">
  <p>メニュー項目1</p>
  <p>メニュー項目2</p>
  <p>メニュー項目3</p>
</div>
```

```javascript
let menu = document.getElementById("menu");

// メニューを非表示
menu.style.display = "none";

// メニューを表示
menu.style.display = "block";
```

---

## 練習問題

### 課題：3つの要素の表示を制御する

3つの要素を作成し、表示/非表示を制御してください。

### 保存場所

`exercises/lesson-018/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. `index.html` に3つの`<p>`要素を追加します
   - 1つ目：`id="item1"`
   - 2つ目：`id="item2"`
   - 3つ目：`id="item3"`
2. `script.js` で3つの要素を取得します
3. それぞれの要素の表示を制御します
   - item1: 非表示にする（`display = "none"`）
   - item2: 表示する（`display = "block"`）
   - item3: 非表示にする（`display = "none"`）

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-018
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**ヒント1：HTMLの書き方**

3つの`<p>`要素を作り、それぞれに異なるidと適当な文字を入れます。

```html
<p id="item1">アイテム1</p>
<p id="item2">アイテム2</p>
<p id="item3">アイテム3</p>
```

**ヒント2：要素の取得**

3つの変数を用意して、それぞれの要素を取得します。

```javascript
let elem1 = document.getElementById("item1");
let elem2 = document.getElementById("item2");
let elem3 = document.getElementById("item3");
```

**ヒント3：表示の制御**

`style.display`に`"none"`を設定すると非表示、`"block"`を設定すると表示になります。

```javascript
elem1.style.display = "none";   // 非表示
elem2.style.display = "block";  // 表示
elem3.style.display = "none";   // 非表示
```

**ヒント4：確認方法**

ブラウザで`index.html`を開いて、以下を確認してください。

- 1つ目の要素が表示されていない
- 2つ目の要素が表示されている
- 3つ目の要素が表示されていない

---

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 018</title>
</head>
<body>
    <p id="item1">アイテム1</p>
    <p id="item2">アイテム2</p>
    <p id="item3">アイテム3</p>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
// 3つの要素を取得
let elem1 = document.getElementById("item1");
let elem2 = document.getElementById("item2");
let elem3 = document.getElementById("item3");

// それぞれの表示を制御
elem1.style.display = "none";   // 非表示
elem2.style.display = "block";  // 表示
elem3.style.display = "none";   // 非表示
```

### 解説

**HTMLファイル:**

9行目から11行目で、3つの`<p>`要素を作成しています。それぞれに`item1`、`item2`、`item3`という異なるidを付けています。

要素の中には「アイテム1」「アイテム2」「アイテム3」という文字を入れていますが、これは任意の文字で構いません。

**JavaScriptファイル:**

2行目から4行目で、3つの要素を取得しています。`getElementById()`を3回使って、それぞれの要素を異なる変数に保存しています。

7行目では、`elem1`の表示を`"none"`に設定して非表示にしています。

8行目では、`elem2`の表示を`"block"`に設定して表示しています。デフォルトでも表示されていますが、明示的に`"block"`を設定しています。

9行目では、`elem3`の表示を`"none"`に設定して非表示にしています。

このコードを実行すると、画面には「アイテム2」だけが表示されます。「アイテム1」と「アイテム3」は非表示になり、画面から消えます。

---

## まとめ

### 今回学んだこと

**キーポイント1：displayプロパティ**

`display`プロパティは、要素の表示状態を制御するプロパティです。要素を画面に表示するか、非表示にするかを決めることができます。これまで学んだ内容、色、サイズの変更とは異なる、新しい制御方法です。

**キーポイント2：要素の非表示（none）**

`elem.style.display = "none"`を設定すると、要素が画面から完全に消えます。要素があった場所も詰まり、他の要素が上に移動します。マジックのように、要素を消すことができます。

**キーポイント3：要素の表示（block）**

`elem.style.display = "block"`を設定すると、非表示だった要素が再び表示されます。`<p>`、`<div>`などの要素は、デフォルトで`block`として表示されています。

**キーポイント4：動的な表示制御**

複数の要素の`display`プロパティを切り替えることで、マジックショーのような動的な効果を作れます。メッセージの表示/非表示、メニューの開閉など、実用的な機能を実装できるようになります。

---

### 次回の学習

次回は、ボタンをクリックしたときに反応する方法を学びます。`onclick`属性を使って、ユーザーの操作に応じた動作を実装できるようになります。いよいよインタラクティブなページ作りに入ります。楽しみにしていてください。

お疲れ様でした。
