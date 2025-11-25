---
title: "Lesson 023: イベントの復習"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 023: イベントの復習

---

## 今回の学習

### 前回の復習

前回は、**DOM操作の基本パターン**を復習しました。

```javascript
// 1. 要素を取得
const elem = document.getElementById("target");

// 2. プロパティを変更
elem.textContent = "新しいテキスト";
elem.style.color = "red";
```

この2ステップのパターンで、画面の要素を自由に操作できるようになりました。

### 今回の目標

今回は、**イベントの基本を復習**します。

イベントは、ユーザーの操作に反応して処理を実行するための仕組みです。

**学習目標：**

1. **onclick属性の使い方を確実にする** - クリックイベントの基本を完璧にします
2. **関数呼び出しのパターンを理解する** - 引数の渡し方を習得します
3. **複数のイベントを扱えるようにする** - 複数のボタンを使いこなします
4. **イベント駆動プログラミングを理解する** - Webアプリケーションの基本を学びます

---

## イベントとは

**イベント**とは、Webページ上で起こる**出来事**のことです。

### イベントの種類

Webページでは、様々なイベントが発生します。

```
ユーザーの操作：
- ボタンがクリックされた
- テキストボックスに文字が入力された
- マウスが要素の上に乗った
- フォームが送信された

ページの状態変化：
- ページが読み込まれた
- 画像の読み込みが完了した
- ウィンドウのサイズが変わった
```

JavaScriptでは、こうしたイベントに反応して処理を実行できます。

### 身近な例：私たちが毎日使っているWebサイト

イベント処理は、私たちが毎日使っているWebサイトで使われています。

**YouTubeの再生ボタン**
```javascript
// クリックイベントに反応
function playVideo() {
  // 動画を再生する
  video.play();
  // ボタンのテキストを変更
  button.textContent = "一時停止";
}
```

**Amazonのカートに追加ボタン**
```javascript
// クリックイベントに反応
function addToCart() {
  // カートに商品を追加
  cart.push(product);
  // カート数を更新
  updateCartCount();
}
```

**Googleの検索ボタン**
```javascript
// クリックイベントに反応
function search() {
  // 検索ワードを取得
  const keyword = searchBox.value;
  // 検索を実行
  performSearch(keyword);
}
```

**Twitterの「いいね」ボタン**
```javascript
// クリックイベントに反応
function toggleLike() {
  // いいね状態を切り替え
  isLiked = !isLiked;
  // ハートの色を変更
  heart.style.color = isLiked ? "red" : "gray";
}
```

### 日常生活の例え

イベント処理は、日常生活の中にもあります。

**例1：ドアベル**
```
イベント：ドアベルが押される
     ↓
反応：チャイムが鳴る
```

**例2：目覚まし時計**
```
イベント：設定時刻になる
     ↓
反応：アラームが鳴る
```

**例3：自動ドア**
```
イベント：人が近づく（センサーが反応）
     ↓
反応：ドアが開く
```

JavaScriptのイベント処理も、これと同じ仕組みです。

```
イベント：ボタンがクリックされる
     ↓
反応：関数が実行される
```

---

## イベント駆動プログラミング

イベントに反応して処理を実行するプログラミングスタイルを**イベント駆動プログラミング**と呼びます。

### イベント駆動プログラミングとは

**従来のプログラミング（上から順番に実行）：**

```javascript
console.log("1番目の処理");
console.log("2番目の処理");
console.log("3番目の処理");
```

```
実行結果：
1番目の処理
2番目の処理
3番目の処理
```

コードは上から下へ、順番に実行されます。

**イベント駆動プログラミング（イベント待ち）：**

```javascript
// ボタンがクリックされるまで待機
// ↓
// クリックされたら実行
function handleClick() {
  console.log("ボタンがクリックされました");
}
```

```
実行タイミング：
- ページが読み込まれた時点では何も起こらない
- ユーザーがボタンをクリックすると、関数が実行される
- いつ実行されるかは、ユーザー次第
```

### なぜイベント駆動が重要なのか

Webページの多くは、**ユーザーの操作に反応して動作**します。

**例：ショッピングサイト**

```
ユーザーの操作                     サイトの反応
─────────────────────────────────────────────
商品画像をクリック        →        詳細ページを表示
「カートに追加」をクリック  →        カートに商品を追加
「購入する」をクリック      →        購入画面に移動
```

これらはすべて、**イベント駆動**で動いています。

**JavaScriptではイベント駆動プログラミングが中心**となります。

---

## onclick属性

これまでのレッスンでは、`onclick`属性を使ってクリックイベントを処理してきました。

### onclick属性の基本

**HTML:**

```html
<button onclick="showMessage()">クリック</button>
```

**JavaScript:**

```javascript
function showMessage() {
  alert("ボタンがクリックされました");
}
```

### 動作の仕組み

```
【1】ページが読み込まれる
     ↓
【2】ブラウザが待機状態になる
     ↓
【3】ユーザーがボタンをクリック
     ↓
【4】onclick属性を見る → "showMessage()" が書かれている
     ↓
【5】showMessage() 関数を実行する
     ↓
【6】alert("ボタンがクリックされました") が表示される
```

### onclick属性に書けるもの

**パターン1：関数呼び出し（最も一般的）**

```html
<button onclick="showMessage()">クリック</button>
```

**パターン2：JavaScriptのコードを直接書く（簡単な処理のみ）**

```html
<button onclick="alert('クリックされました')">クリック</button>
```

**パターン3：複数の処理を実行（セミコロンで区切る）**

```html
<button onclick="showMessage(); changeColor();">クリック</button>
```

**推奨：パターン1（関数呼び出し）**

コードが読みやすく、管理しやすいため、**関数を呼び出す形**で書くのが一般的です。

---

## 関数呼び出し

`onclick`属性で関数を呼び出すときは、関数名の後に**`()`**をつけます。

### 括弧()の重要性

```html
<!-- ✅ 正しい：()がある -->
<button onclick="showMessage()">クリック</button>

<!-- ❌ 間違い：()がない -->
<button onclick="showMessage">クリック</button>
```

**なぜ()が必要なのか：**

```javascript
showMessage    // 関数そのもの（実行されない）
showMessage()  // 関数を実行する（結果が返る）
```

**例えるなら：**

```
showMessage    = 料理のレシピ（見ているだけ）
showMessage()  = 料理を作る（実際に調理する）
```

### よくある間違い

**間違い1：()を忘れる**

```html
<button onclick="showMessage">クリック</button>
```

**何が起こるのか：**

ボタンをクリックしても、何も起こりません。

**間違い2：関数名のスペルミス**

```html
<button onclick="showMesage()">クリック</button>
```

（"s"が1つ足りない）

**エラーメッセージ：**

```
Uncaught ReferenceError: showMesage is not defined
```

**間違い3：クォーテーションの使い方が間違っている**

```html
<!-- ❌ 間違い：ダブルクォートが重複 -->
<button onclick="alert("こんにちは")">クリック</button>
```

**正しい書き方：**

```html
<!-- ✅ 正しい：シングルクォートを使う -->
<button onclick="alert('こんにちは')">クリック</button>
```

---

## 引数を渡す

関数に**引数**を渡すこともできます。

### 引数とは

**引数**とは、関数に渡す**データ**のことです。

**例えるなら：**

```
関数 = 自動販売機
引数 = お金

お金を入れる → ジュースが出てくる
引数を渡す → 結果が返ってくる
```

### 引数を使わない例

```html
<button onclick="showHello()">こんにちは</button>
<button onclick="showGoodbye()">さようなら</button>
<button onclick="showThankYou()">ありがとう</button>
```

```javascript
function showHello() {
  alert("こんにちは");
}

function showGoodbye() {
  alert("さようなら");
}

function showThankYou() {
  alert("ありがとう");
}
```

**問題点：**

似たような関数を3つも書かなければいけない。

### 引数を使う例

```html
<button onclick="showMessage('こんにちは')">こんにちは</button>
<button onclick="showMessage('さようなら')">さようなら</button>
<button onclick="showMessage('ありがとう')">ありがとう</button>
```

```javascript
function showMessage(text) {
  alert(text);
}
```

**メリット：**

1つの関数で、様々なメッセージを表示できる！

### 引数の渡し方

**HTML:**

```html
<button onclick="showMessage('こんにちは')">挨拶</button>
```

**JavaScript:**

```javascript
function showMessage(text) {
  alert(text);
}
```

**動作の流れ：**

```
【1】ボタンをクリック
     ↓
【2】onclick="showMessage('こんにちは')" が実行される
     ↓
【3】showMessage() 関数が呼ばれる
     ↓
【4】引数 'こんにちは' が text に渡される
     ↓
【5】alert(text) が実行される
     ↓
【6】「こんにちは」と表示される
```

### クォーテーションの使い分け

文字列を渡すときは、**シングルクォート`'`**で囲みます。

**なぜシングルクォートなのか：**

```html
<button onclick="showMessage('こんにちは')">挨拶</button>
                ↑           ↑         ↑
                ダブル      シングル   ダブル
```

`onclick`属性全体が**ダブルクォート`"`**で囲まれているため、中では**シングルクォート`'`**を使います。

**もし両方ダブルクォートにすると：**

```html
<!-- ❌ 間違い -->
<button onclick="showMessage("こんにちは")">挨拶</button>
                           ↑ここで閉じてしまう
```

ブラウザは、2番目の`"`で属性が終わったと判断してしまいます。

### 複数の引数を渡す

複数の引数を渡すこともできます。

**HTML:**

```html
<button onclick="changeStyle('red', '24px')">赤く大きく</button>
```

**JavaScript:**

```javascript
function changeStyle(color, size) {
  const elem = document.getElementById("text");
  elem.style.color = color;
  elem.style.fontSize = size;
}
```

**動作の流れ：**

```
引数1：'red' → color に渡される
引数2：'24px' → size に渡される
```

### 数値を渡す

数値を渡すときは、クォーテーションは不要です。

**HTML:**

```html
<button onclick="addCount(1)">+1</button>
<button onclick="addCount(5)">+5</button>
<button onclick="addCount(10)">+10</button>
```

**JavaScript:**

```javascript
let count = 0;

function addCount(num) {
  count = count + num;
  const elem = document.getElementById("counter");
  elem.textContent = count;
}
```

**ポイント：**

```
文字列：onclick="showMessage('こんにちは')"  ← クォーテーション必要
数値：  onclick="addCount(5)"               ← クォーテーション不要
```

---

## 複数のイベント

1つのページに複数のボタンがあり、それぞれ異なる処理を行う場合、複数の関数を用意します。

### パターン1：ボタンごとに異なる関数

**HTML:**

```html
<button onclick="showHello()">こんにちは</button>
<button onclick="showGoodbye()">さようなら</button>
<button onclick="showThankYou()">ありがとう</button>
```

**JavaScript:**

```javascript
function showHello() {
  alert("こんにちは");
}

function showGoodbye() {
  alert("さようなら");
}

function showThankYou() {
  alert("ありがとう");
}
```

**何が起こるのか：**

```
「こんにちは」ボタン → showHello() が実行される
「さようなら」ボタン → showGoodbye() が実行される
「ありがとう」ボタン → showThankYou() が実行される
```

それぞれのボタンが、対応する関数を呼び出します。

### パターン2：複数のボタンで同じ関数（引数で区別）

**HTML:**

```html
<button onclick="changeColor('red')">赤</button>
<button onclick="changeColor('blue')">青</button>
<button onclick="changeColor('green')">緑</button>
```

**JavaScript:**

```javascript
function changeColor(color) {
  const elem = document.getElementById("text");
  elem.style.color = color;
}
```

**何が起こるのか：**

```
「赤」ボタン → changeColor('red') が実行される
              → color = 'red'
              → 文字が赤くなる

「青」ボタン → changeColor('blue') が実行される
              → color = 'blue'
              → 文字が青くなる

「緑」ボタン → changeColor('green') が実行される
              → color = 'green'
              → 文字が緑くなる
```

**メリット：**

1つの関数で、複数のボタンに対応できる！

### どちらを使うべきか

**異なる処理をする場合 → パターン1（異なる関数）**

```html
<button onclick="save()">保存</button>
<button onclick="delete()">削除</button>
<button onclick="cancel()">キャンセル</button>
```

**似た処理で、値だけ違う場合 → パターン2（同じ関数＋引数）**

```html
<button onclick="setSize('small')">小</button>
<button onclick="setSize('medium')">中</button>
<button onclick="setSize('large')">大</button>
```

---

## イベントとDOM操作の組み合わせ

イベントとDOM操作を組み合わせることで、**ユーザーの操作に応じて画面を変化させる**ことができます。

### 例1：クリックで文字を変更する

**HTML:**

```html
<p id="message">最初の文字</p>
<button onclick="changeText()">変更</button>
```

**JavaScript:**

```javascript
function changeText() {
  const elem = document.getElementById("message");
  elem.textContent = "変更後の文字";
}
```

**動作の流れ：**

```
【画面の初期状態】
最初の文字
[変更]ボタン

【ボタンをクリック】
↓
【changeText() が実行される】
1. id="message" の要素を取得
2. textContent を "変更後の文字" に変更

【画面の変化】
変更後の文字
[変更]ボタン
```

### 例2：クリックで色を変更する

**HTML:**

```html
<p id="text">カラフル</p>
<button onclick="setRed()">赤にする</button>
<button onclick="setBlue()">青にする</button>
```

**JavaScript:**

```javascript
function setRed() {
  const elem = document.getElementById("text");
  elem.style.color = "red";
}

function setBlue() {
  const elem = document.getElementById("text");
  elem.style.color = "blue";
}
```

**動作の流れ：**

```
【初期状態】
カラフル（黒色）
[赤にする] [青にする]

【「赤にする」をクリック】
↓
setRed() が実行される
↓
カラフル（赤色）
[赤にする] [青にする]

【「青にする」をクリック】
↓
setBlue() が実行される
↓
カラフル（青色）
[赤にする] [青にする]
```

### 例3：引数を使った色変更（改良版）

**HTML:**

```html
<p id="text">カラフル</p>
<button onclick="setColor('red')">赤にする</button>
<button onclick="setColor('blue')">青にする</button>
<button onclick="setColor('green')">緑にする</button>
```

**JavaScript:**

```javascript
function setColor(color) {
  const elem = document.getElementById("text");
  elem.style.color = color;
}
```

**改良点：**

- 関数が1つで済む
- ボタンを追加しやすい
- コードが短く、読みやすい

### 例4：クリックで表示/非表示を切り替える

**HTML:**

```html
<p id="content">表示される内容</p>
<button onclick="hideContent()">非表示</button>
<button onclick="showContent()">表示</button>
```

**JavaScript:**

```javascript
function hideContent() {
  const elem = document.getElementById("content");
  elem.style.display = "none";
}

function showContent() {
  const elem = document.getElementById("content");
  elem.style.display = "block";
}
```

**動作の流れ：**

```
【初期状態】
表示される内容
[非表示] [表示]

【「非表示」をクリック】
↓
hideContent() が実行される
↓
elem.style.display = "none"
↓
[非表示] [表示]
（内容が消える）

【「表示」をクリック】
↓
showContent() が実行される
↓
elem.style.display = "block"
↓
表示される内容
[非表示] [表示]
（内容が戻る）
```

### 例5：複数の要素を同時に操作

**HTML:**

```html
<p id="title">タイトル</p>
<p id="description">説明文</p>
<button onclick="changeAll()">すべて変更</button>
```

**JavaScript:**

```javascript
function changeAll() {
  const title = document.getElementById("title");
  const description = document.getElementById("description");

  title.textContent = "新しいタイトル";
  title.style.color = "blue";

  description.textContent = "新しい説明文";
  description.style.backgroundColor = "yellow";
}
```

**1つのボタンで複数の要素を変更できる！**

---

## イベントハンドラの命名規則

イベントに対応する関数（**イベントハンドラ**）には、わかりやすい名前をつけましょう。

### 良い命名の例

**動詞で始める：**

```javascript
function showMessage() { }    // メッセージを表示する
function hideContent() { }    // 内容を非表示にする
function changeColor() { }    // 色を変更する
function updateTitle() { }    // タイトルを更新する
function resetCounter() { }   // カウンターをリセットする
function addItem() { }        // アイテムを追加する
function deleteItem() { }     // アイテムを削除する
function toggleMenu() { }     // メニューを切り替える
```

**handle を付ける：**

```javascript
function handleClick() { }      // クリックを処理する
function handleSubmit() { }     // 送信を処理する
function handleInput() { }      // 入力を処理する
```

**on を付ける（React などでよく使われる）：**

```javascript
function onClick() { }      // クリック時
function onSubmit() { }     // 送信時
function onChange() { }     // 変更時
```

### 悪い命名の例

```javascript
// ❌ 何をするのか分からない
function func1() { }
function doIt() { }
function process() { }

// ❌ 短すぎて意味不明
function a() { }
function b() { }
function x() { }

// ❌ 日本語（一部のツールで問題が起きる可能性）
function ボタンクリック() { }
```

### 命名のコツ

**1. 関数名から、何をする関数なのかが分かるようにする**

```javascript
// ✅ 良い例
function showErrorMessage() { }   // エラーメッセージを表示する
function validateForm() { }       // フォームを検証する
function saveUserData() { }       // ユーザーデータを保存する

// ❌ 悪い例
function show() { }      // 何を表示するのか分からない
function check() { }     // 何をチェックするのか分からない
function save() { }      // 何を保存するのか分からない
```

**2. 一貫性を保つ**

```javascript
// ✅ 良い例（すべて動詞で始まる）
function showModal() { }
function hideModal() { }
function closeModal() { }

// ❌ 悪い例（命名規則がバラバラ）
function showModal() { }
function modalHide() { }
function close() { }
```

---

## よくある間違いと解決方法

### 間違い1：括弧()を忘れる

**HTML:**

```html
<button onclick="showMessage">クリック</button>
```

（`()`がない）

**何が起こるのか：**

ボタンをクリックしても、何も起こりません。

**解決方法：**

```html
<button onclick="showMessage()">クリック</button>
```

必ず`()`を付けましょう。

### 間違い2：関数名のスペルミス

**HTML:**

```html
<button onclick="showMesage()">クリック</button>
```

**JavaScript:**

```javascript
function showMessage() {
  alert("こんにちは");
}
```

HTMLとJavaScriptで関数名が一致していません（`showMesage` vs `showMessage`）。

**エラーメッセージ：**

```
Uncaught ReferenceError: showMesage is not defined
```

**解決方法：**

HTMLとJavaScriptで関数名を完全に一致させる。コピー＆ペーストを活用しましょう。

### 間違い3：クォーテーションの使い方が間違っている

**HTML:**

```html
<!-- ❌ 間違い -->
<button onclick="alert("こんにちは")">クリック</button>
```

**何が起こるのか：**

ブラウザが正しく解釈できず、エラーになります。

**解決方法：**

```html
<!-- ✅ 正しい -->
<button onclick="alert('こんにちは')">クリック</button>
```

`onclick`属性の中では、**シングルクォート`'`**を使います。

### 間違い4：引数の型が間違っている

**HTML:**

```html
<button onclick="addCount('5')">+5</button>
```

**JavaScript:**

```javascript
let count = 0;

function addCount(num) {
  count = count + num;  // count = 0 + '5' → "05" になってしまう
  const elem = document.getElementById("counter");
  elem.textContent = count;
}
```

**何が起こるのか：**

`'5'`は文字列なので、`0 + '5'`は`"05"`という文字列になってしまいます。

**解決方法：**

数値を渡すときは、クォーテーションを外します。

```html
<!-- ✅ 正しい -->
<button onclick="addCount(5)">+5</button>
```

### 間違い5：関数が定義されていない

**HTML:**

```html
<button onclick="showMessage()">クリック</button>
```

**JavaScript:**

```javascript
// 関数が定義されていない！
```

**エラーメッセージ：**

```
Uncaught ReferenceError: showMessage is not defined
```

**解決方法：**

JavaScriptファイルに関数を定義します。

```javascript
function showMessage() {
  alert("こんにちは");
}
```

### 間違い6：script.jsの読み込み位置が間違っている

**HTML:**

```html
<!DOCTYPE html>
<html>
<head>
    <script src="script.js"></script>  <!-- ここで読み込んでいる -->
</head>
<body>
    <button onclick="showMessage()">クリック</button>
</body>
</html>
```

**何が起こるのか：**

ボタンが読み込まれる前にJavaScriptが実行されるため、エラーになる可能性があります。

**解決方法：**

`<script>`タグを`</body>`の直前に移動します。

```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <button onclick="showMessage()">クリック</button>
    <script src="script.js"></script>  <!-- ✅ ここに移動 -->
</body>
</html>
```

### 間違い7：複数の関数を同時に呼ぶときのセミコロン忘れ

**HTML:**

```html
<!-- ❌ 間違い -->
<button onclick="changeColor() changeText()">クリック</button>
```

**解決方法：**

セミコロン`;`で区切ります。

```html
<!-- ✅ 正しい -->
<button onclick="changeColor(); changeText();">クリック</button>
```

---

## 練習問題

### 課題：複数のイベントを処理する

次の要件を満たすページを作成してください。

### 保存場所

`exercises/lesson-023/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

### 要件

**HTML (index.html):**

1. `id="display"` の要素を用意し、「初期状態」というテキストを表示する
2. 5つのボタンを作成する：
   - 1つ目：「メッセージ1」ボタン → `showMessage1()` 関数を呼び出す
   - 2つ目：「メッセージ2」ボタン → `showMessage2()` 関数を呼び出す
   - 3つ目：「メッセージ3」ボタン → `showMessage3()` 関数を呼び出す
   - 4つ目：「赤色」ボタン → `changeColor('red')` 関数を呼び出す
   - 5つ目：「リセット」ボタン → `resetDisplay()` 関数を呼び出す

**JavaScript (script.js):**

1. `showMessage1` 関数を定義し、次の処理を行う：
   - `id="display"` の要素の `textContent` を「メッセージ1」に変更する

2. `showMessage2` 関数を定義し、次の処理を行う：
   - `id="display"` の要素の `textContent` を「メッセージ2」に変更する

3. `showMessage3` 関数を定義し、次の処理を行う：
   - `id="display"` の要素の `textContent` を「メッセージ3」に変更する

4. `changeColor` 関数を定義し、次の処理を行う：
   - 引数で受け取った色を `id="display"` の要素の `style.color` に設定する

5. `resetDisplay` 関数を定義し、次の処理を行う：
   - `id="display"` の要素の `textContent` を「初期状態」に戻す
   - `id="display"` の要素の `style.color` を「black」に戻す

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-023
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**ヒント1：基本パターン**

すべての関数は、同じパターンで作れます。

```javascript
function 関数名() {
  // 1. 要素を取得
  const elem = document.getElementById("display");

  // 2. プロパティを変更
  elem.textContent = "新しいテキスト";
}
```

**ヒント2：showMessage1 関数の例**

```javascript
function showMessage1() {
  const elem = document.getElementById("display");
  elem.textContent = "メッセージ1";
}
```

**ヒント3：引数を使う関数**

```javascript
function changeColor(color) {
  const elem = document.getElementById("display");
  elem.style.color = color;
}
```

**ヒント4：複数のプロパティを変更する**

```javascript
function resetDisplay() {
  const elem = document.getElementById("display");
  elem.textContent = "初期状態";   // テキストを戻す
  elem.style.color = "black";      // 色を戻す
}
```

**ヒント5：HTMLの書き方**

```html
<!-- 引数なし -->
<button onclick="showMessage1()">メッセージ1</button>

<!-- 引数あり -->
<button onclick="changeColor('red')">赤色</button>
```

**ヒント6：動作確認の方法**

1. ブラウザで `index.html` を開く
2. 各ボタンを順番にクリック
3. テキストや色が変わることを確認
4. リセットボタンで元に戻ることを確認
5. `npm test exercises/lesson-023` でテストを実行

**ヒント7：よくある間違いをチェック**

- [ ] 関数呼び出しに`()`を付けているか
- [ ] HTMLとJavaScriptの関数名は一致しているか
- [ ] 引数を渡すときにシングルクォート`'`を使っているか
- [ ] IDのスペルミスはないか
- [ ] scriptタグは`</body>`の直前にあるか

---

## 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 023</title>
</head>
<body>
    <h1>イベントの復習</h1>

    <p id="display">初期状態</p>

    <button onclick="showMessage1()">メッセージ1</button>
    <button onclick="showMessage2()">メッセージ2</button>
    <button onclick="showMessage3()">メッセージ3</button>
    <button onclick="changeColor('red')">赤色</button>
    <button onclick="resetDisplay()">リセット</button>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
function showMessage1() {
  const elem = document.getElementById("display");
  elem.textContent = "メッセージ1";
}

function showMessage2() {
  const elem = document.getElementById("display");
  elem.textContent = "メッセージ2";
}

function showMessage3() {
  const elem = document.getElementById("display");
  elem.textContent = "メッセージ3";
}

function changeColor(color) {
  const elem = document.getElementById("display");
  elem.style.color = color;
}

function resetDisplay() {
  const elem = document.getElementById("display");
  elem.textContent = "初期状態";
  elem.style.color = "black";
}
```

### 解説

**HTML (index.html):**

**12行目：表示要素**

```html
<p id="display">初期状態</p>
```

この要素のテキストと色が、ボタンクリックで変化します。

**14〜18行目：5つのボタン**

```html
<button onclick="showMessage1()">メッセージ1</button>
<button onclick="showMessage2()">メッセージ2</button>
<button onclick="showMessage3()">メッセージ3</button>
<button onclick="changeColor('red')">赤色</button>
<button onclick="resetDisplay()">リセット</button>
```

| ボタン | 呼び出す関数 | 引数 |
|--------|------------|------|
| メッセージ1 | showMessage1() | なし |
| メッセージ2 | showMessage2() | なし |
| メッセージ3 | showMessage3() | なし |
| 赤色 | changeColor() | 'red' |
| リセット | resetDisplay() | なし |

**ポイント：**

- 4つ目のボタンだけ引数を渡している
- 引数は**シングルクォート`'`**で囲む

**JavaScript (script.js):**

**1〜4行目：showMessage1 関数**

```javascript
function showMessage1() {
  const elem = document.getElementById("display");
  elem.textContent = "メッセージ1";
}
```

**動作の流れ：**

```
1. 「メッセージ1」ボタンをクリック
   ↓
2. showMessage1() が実行される
   ↓
3. id="display" の要素を取得
   ↓
4. textContent を "メッセージ1" に変更
   ↓
5. 画面が更新される
```

**6〜9行目：showMessage2 関数**

```javascript
function showMessage2() {
  const elem = document.getElementById("display");
  elem.textContent = "メッセージ2";
}
```

showMessage1とほぼ同じですが、表示するテキストが「メッセージ2」になります。

**11〜14行目：showMessage3 関数**

```javascript
function showMessage3() {
  const elem = document.getElementById("display");
  elem.textContent = "メッセージ3";
}
```

showMessage1とほぼ同じですが、表示するテキストが「メッセージ3」になります。

**16〜19行目：changeColor 関数**

```javascript
function changeColor(color) {
  const elem = document.getElementById("display");
  elem.style.color = color;
}
```

**ポイント：**

- **引数`color`**を受け取る
- 受け取った色を`style.color`に設定する

**動作の流れ：**

```
1. 「赤色」ボタンをクリック
   ↓
2. onclick="changeColor('red')" が実行される
   ↓
3. changeColor() が呼ばれる
   ↓
4. 引数 'red' が color に渡される
   ↓
5. elem.style.color = 'red' が実行される
   ↓
6. 文字が赤くなる
```

**21〜25行目：resetDisplay 関数**

```javascript
function resetDisplay() {
  const elem = document.getElementById("display");
  elem.textContent = "初期状態";
  elem.style.color = "black";
}
```

**ポイント：**

- 1つの関数で**2つのプロパティ**を変更している
- テキストと色の両方を初期状態に戻す

### 全体の動作の流れ

```
【初期状態】
初期状態（黒色）
[メッセージ1] [メッセージ2] [メッセージ3] [赤色] [リセット]

【「メッセージ1」をクリック】
↓
メッセージ1（黒色）
[メッセージ1] [メッセージ2] [メッセージ3] [赤色] [リセット]

【「メッセージ2」をクリック】
↓
メッセージ2（黒色）
[メッセージ1] [メッセージ2] [メッセージ3] [赤色] [リセット]

【「赤色」をクリック】
↓
メッセージ2（赤色）
[メッセージ1] [メッセージ2] [メッセージ3] [赤色] [リセット]

【「リセット」をクリック】
↓
初期状態（黒色）
[メッセージ1] [メッセージ2] [メッセージ3] [赤色] [リセット]
```

### 重要なポイント

**1. イベントとDOM操作の組み合わせ**

```javascript
// イベント：ボタンクリック
onclick="showMessage1()"

// DOM操作：要素の変更
elem.textContent = "メッセージ1"
```

この2つを組み合わせることで、ユーザーの操作に応じて画面が変化します。

**2. 引数を使った汎用的な関数**

```javascript
function changeColor(color) {
  elem.style.color = color;
}
```

引数を使うことで、1つの関数で様々な色に対応できます。

**3. 複数のプロパティを変更**

```javascript
function resetDisplay() {
  elem.textContent = "初期状態";   // テキスト
  elem.style.color = "black";      // 色
}
```

1つの関数で複数のプロパティを変更できます。

**4. イベント駆動プログラミングの基本**

```
ユーザーの操作（クリック）
     ↓
イベント発生
     ↓
関数実行
     ↓
画面更新
```

この流れが、Webアプリケーションの基本です。

---

## まとめ

### 今回学んだこと

**1. イベントとは**

Webページ上で起こる**出来事**のこと。

```
- ボタンがクリックされた
- テキストが入力された
- マウスが要素の上に乗った
```

**2. イベント駆動プログラミング**

イベントに反応して処理を実行するプログラミングスタイル。

```
イベント発生 → 関数実行 → 画面更新
```

**3. onclick属性**

クリックイベントを処理する属性。

```html
<button onclick="showMessage()">クリック</button>
```

**覚えておくこと：**

- 関数呼び出しには`()`が必要
- HTMLとJavaScriptの関数名を一致させる
- 属性内ではシングルクォート`'`を使う

**4. 関数呼び出し**

```javascript
showMessage    // 関数そのもの
showMessage()  // 関数を実行する
```

`()`を忘れると、関数は実行されません。

**5. 引数を渡す**

関数に**データ**を渡すことができます。

```html
<!-- 文字列を渡す -->
<button onclick="showMessage('こんにちは')">挨拶</button>

<!-- 数値を渡す -->
<button onclick="addCount(5)">+5</button>
```

**覚えておくこと：**

- 文字列は`'`で囲む
- 数値はそのまま書く
- 複数の引数をカンマ`,`で区切る

**6. 複数のイベント**

複数のボタンで、異なる関数または同じ関数を使える。

```html
<!-- 異なる関数 -->
<button onclick="save()">保存</button>
<button onclick="delete()">削除</button>

<!-- 同じ関数＋引数 -->
<button onclick="setColor('red')">赤</button>
<button onclick="setColor('blue')">青</button>
```

**7. イベントとDOM操作の組み合わせ**

```javascript
function changeText() {
  // 1. イベント：ボタンがクリックされる
  // 2. DOM操作：要素を取得
  const elem = document.getElementById("message");
  // 3. DOM操作：プロパティを変更
  elem.textContent = "新しいテキスト";
  // 4. 結果：画面が更新される
}
```

### できるようになったこと

✅ `onclick`属性を使ってクリックイベントを処理できるようになった

✅ 関数を正しく呼び出せるようになった

✅ 引数を渡して、汎用的な関数を作れるようになった

✅ 複数のイベントを処理できるようになった

✅ イベントとDOM操作を組み合わせて、インタラクティブなページを作れるようになった

✅ イベント駆動プログラミングの基本を理解できた

### 次回の学習

次回は、**ミニプロジェクト**を作成します。

- これまで学んだことを組み合わせる
- 色が変わるボタン
- カウンター付き
- 実用的なアプリケーション

学んだ知識を総動員して、実際に動くアプリケーションを作ります。

### 復習のポイント

**毎日少しずつ練習しましょう：**

1. **基本パターンを繰り返し書く**
   ```html
   <button onclick="関数名()">ボタン</button>
   ```
   ```javascript
   function 関数名() {
     const elem = document.getElementById("id");
     elem.textContent = "テキスト";
   }
   ```

2. **引数を使った関数を書く**
   ```html
   <button onclick="関数名('引数')">ボタン</button>
   ```
   ```javascript
   function 関数名(引数) {
     // 引数を使った処理
   }
   ```

3. **実際に手を動かす**
   - 練習問題を何度も解く
   - 自分でボタンを追加してみる
   - エラーが出たら、エラーメッセージを読む
   - 開発者ツールで動作を確認する

**イベント駆動プログラミングは、Webアプリケーション開発の基本です。**

しっかり身につけて、次のステップに進みましょう！

お疲れ様でした！
