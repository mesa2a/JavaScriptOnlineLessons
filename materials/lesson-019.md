---
title: "Lesson 019: クリックに反応する"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 019: クリックに反応する

---

## 今回の学習

### 前回の復習

前回は、`style.display`プロパティを使って要素の表示/非表示を切り替える方法を学びました。`display = "none"`で要素を非表示に、`display = "block"`で要素を表示できるようになりました。マジックショーのような動的な効果を作れるようになりました。

### 今回の目標

1. イベントの概念を理解する
2. `onclick`属性の使い方を学ぶ
3. ボタンをクリックしたときに反応するページを作れるようになる

---

## イベントとは

### イベントの概念

イベントとは、Webページ上で起こる「出来事」のことです。例えば、以下のような出来事がイベントです。

- ボタンをクリックした
- マウスを要素の上に乗せた
- キーボードのキーを押した
- ページの読み込みが完了した

JavaScriptを使うと、これらのイベントに反応して、何か処理を実行できます。

### なぜイベントが重要なのか

これまで学んだコードは、ページを開いた瞬間に自動的に実行されていました。

```javascript
let elem = document.getElementById("text");
elem.textContent = "変わった！";
```

このコードは、ページを開いた瞬間に実行され、文字が変わります。

しかし、実際のWebサイトでは、ユーザーの操作（クリック、入力など）に応じて動作する必要があります。これを実現するのがイベントです。

### 身近な例

- YouTube: 再生ボタンをクリックすると動画が再生される
- Amazon: カートに入れるボタンをクリックすると商品が追加される
- Twitter: いいねボタンをクリックするとハートが赤くなる

これらは全て、クリックというイベントに反応しています。

---

## onclick属性

### onclick属性とは

`onclick`属性は、要素がクリックされたときに実行するJavaScriptコードを指定する属性です。

```html
<button onclick="alert('クリックされました！')">ボタン</button>
```

このボタンをクリックすると、「クリックされました！」というアラートが表示されます。

### onclick属性の書き方

`onclick`属性は、HTML要素に直接書きます。

```html
<button onclick="JavaScriptのコード">ボタンのテキスト</button>
```

- `onclick=`: クリックされたときに実行するコードを指定
- `"JavaScriptのコード"`: ダブルクォーテーションで囲む
- `ボタンのテキスト`: ボタンに表示される文字

---

## ボタンを作る

### 基本的なボタン

まず、何も機能がない普通のボタンを作ってみましょう。

```html
<button>クリックしてね</button>
```

これだけでボタンは表示されますが、クリックしても何も起きません。

### クリックで反応するボタン

`onclick`属性を追加すると、クリックしたときに反応します。

```html
<button onclick="alert('こんにちは！')">クリックしてね</button>
```

このボタンをクリックすると、「こんにちは！」というアラートが表示されます。

---

## 実践：クリックで反応するページを作る

### 1つのボタンを作る

まず、1つのボタンを作ってみましょう。

**HTML:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 019</title>
</head>
<body>
    <button onclick="alert('ボタンがクリックされました！')">クリック</button>

    <script src="script.js"></script>
</body>
</html>
```

このボタンをクリックすると、アラートが表示されます。

### 3つのボタンを作る

次に、3つのボタンを作り、それぞれ違う反応をさせてみましょう。

```html
<button onclick="alert('1つ目のボタン')">ボタン1</button>
<button onclick="alert('2つ目のボタン')">ボタン2</button>
<button onclick="alert('3つ目のボタン')">ボタン3</button>
```

それぞれのボタンをクリックすると、違うメッセージが表示されます。

---

## onclickで要素を操作する

### 文字を変更する

`onclick`の中で、要素を操作することもできます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 019</title>
</head>
<body>
    <p id="message">最初の文字</p>
    <button onclick="document.getElementById('message').textContent = '変わった！'">変更</button>

    <script src="script.js"></script>
</body>
</html>
```

このボタンをクリックすると、`<p>`要素の文字が「変わった！」に変わります。

### 色を変える

色を変えることもできます。

```html
<p id="text">この文字の色が変わります</p>
<button onclick="document.getElementById('text').style.color = 'red'">赤にする</button>
<button onclick="document.getElementById('text').style.color = 'blue'">青にする</button>
```

1つ目のボタンをクリックすると文字が赤に、2つ目のボタンをクリックすると青になります。

---

## onclickの注意点

### 引用符の使い分け

`onclick`属性の中で文字列を使う場合、引用符の使い分けに注意が必要です。

**正しい例:**

```html
<button onclick="alert('こんにちは')">ボタン</button>
```

外側はダブルクォーテーション（`"`）、内側はシングルクォーテーション（`'`）を使います。

**間違った例:**

```html
<button onclick="alert("こんにちは")">ボタン</button>
```

同じ種類の引用符を使うと、エラーになります。

### 長いコードは避ける

`onclick`に長いコードを書くと、読みにくくなります。

```html
<!-- 読みにくい -->
<button onclick="document.getElementById('text').style.color = 'red'; document.getElementById('text').style.fontSize = '30px'; document.getElementById('text').textContent = '変わった！'">ボタン</button>
```

このような場合は、次回学ぶ「関数」を使うと読みやすくなります。

---

## よくある間違いと注意点

### 間違い1：onclick属性のスペルミス

```html
<button onlick="alert('こんにちは')">ボタン</button>  <!-- 間違い（onlick） -->
<button onClick="alert('こんにちは')">ボタン</button>  <!-- 動くが、小文字が推奨 -->
```

正しくは以下のようになります。

```html
<button onclick="alert('こんにちは')">ボタン</button>  <!-- 正しい -->
```

### 間違い2：引用符を忘れる

```html
<button onclick=alert('こんにちは')>ボタン</button>  <!-- エラー -->
```

正しくは以下のようになります。

```html
<button onclick="alert('こんにちは')">ボタン</button>
```

### 間違い3：同じ引用符を使う

```html
<button onclick="alert("こんにちは")">ボタン</button>  <!-- エラー -->
```

正しくは以下のようになります。

```html
<button onclick="alert('こんにちは')">ボタン</button>
```

外側と内側で違う引用符を使います。

---

## 練習問題

### 課題：3つのボタンを作る

3つのボタンを作成し、それぞれクリックしたときに違う反応をするようにしてください。

### 保存場所

`exercises/lesson-019/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加してください。今回は`script.js`は使用しません。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. `index.html` に3つの`<button>`要素を追加します
2. それぞれのボタンに`onclick`属性を設定します
   - 1つ目：クリックすると「ボタン1がクリックされました」とアラート表示
   - 2つ目：クリックすると「ボタン2がクリックされました」とアラート表示
   - 3つ目：クリックすると「ボタン3がクリックされました」とアラート表示

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-019
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**ヒント1：ボタンの作り方**

`<button>`タグを使ってボタンを作ります。

```html
<button>ボタンのテキスト</button>
```

**ヒント2：onclick属性の追加**

`onclick`属性を追加して、クリックしたときの動作を指定します。

```html
<button onclick="alert('メッセージ')">ボタン</button>
```

**ヒント3：引用符の使い分け**

外側はダブルクォーテーション（`"`）、内側はシングルクォーテーション（`'`）を使います。

```html
<button onclick="alert('こんにちは')">ボタン</button>
```

**ヒント4：確認方法**

ブラウザで`index.html`を開いて、それぞれのボタンをクリックしてください。

- 1つ目のボタンをクリック → 「ボタン1がクリックされました」と表示
- 2つ目のボタンをクリック → 「ボタン2がクリックされました」と表示
- 3つ目のボタンをクリック → 「ボタン3がクリックされました」と表示

---

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 019</title>
</head>
<body>
    <button onclick="alert('ボタン1がクリックされました')">ボタン1</button>
    <button onclick="alert('ボタン2がクリックされました')">ボタン2</button>
    <button onclick="alert('ボタン3がクリックされました')">ボタン3</button>

    <script src="script.js"></script>
</body>
</html>
```

### 解説

9行目から11行目で、3つの`<button>`要素を作成しています。

それぞれのボタンに`onclick`属性を設定し、クリックしたときに`alert()`関数を実行するように指定しています。

9行目のボタンは、クリックすると「ボタン1がクリックされました」というアラートを表示します。

10行目のボタンは、クリックすると「ボタン2がクリックされました」というアラートを表示します。

11行目のボタンは、クリックすると「ボタン3がクリックされました」というアラートを表示します。

`onclick`属性の値は、ダブルクォーテーション（`"`）で囲み、その中のJavaScriptコードで使う文字列は、シングルクォーテーション（`'`）で囲んでいます。これにより、引用符が正しく解釈されます。

ボタンの間にはスペースやコードが入っていますが、これは任意です。見やすくするために改行しています。

---

## まとめ

### 今回学んだこと

**キーポイント1：イベントの概念**

イベントとは、Webページ上で起こる「出来事」のことです。ボタンのクリック、マウスの移動、キーボードの入力など、様々な出来事がイベントです。JavaScriptを使うと、これらのイベントに反応して処理を実行できます。

**キーポイント2：onclick属性**

`onclick`属性は、要素がクリックされたときに実行するJavaScriptコードを指定する属性です。`<button onclick="alert('こんにちは')">ボタン</button>`のように、HTML要素に直接書きます。

**キーポイント3：引用符の使い分け**

`onclick`属性の中で文字列を使う場合、外側はダブルクォーテーション（`"`）、内側はシングルクォーテーション（`'`）を使います。同じ種類の引用符を使うとエラーになるので注意が必要です。

**キーポイント4：インタラクティブなページ**

`onclick`を使うことで、ユーザーの操作に反応するインタラクティブなページを作れます。これまでは自動的に実行されるコードでしたが、今回からユーザーの操作に応じた動作を実装できるようになりました。

---

### 次回の学習

次回は、「関数」という概念を学びます。`onclick`に長いコードを書く代わりに、関数を使ってコードを整理する方法を学びます。より複雑な処理を、読みやすく書けるようになります。楽しみにしていてください。

お疲れ様でした。
