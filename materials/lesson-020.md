---
title: "Lesson 020: 関数を呼ぶ"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 020: 関数を呼ぶ

---

## 今回の学習

### 前回の復習

前回は、`onclick`属性を使ってボタンをクリックしたときに反応する方法を学びました。

```html
<button onclick="alert('こんにちは')">ボタン</button>
```

このように、HTML要素に直接JavaScriptコードを書くことで、ユーザーの操作に応じた動作を実装できるようになりました。

しかし、コードが長くなると読みにくくなるという問題がありました。

```html
<!-- 読みにくい -->
<button onclick="document.getElementById('text').style.color = 'red'; document.getElementById('text').style.fontSize = '30px';">ボタン</button>
```

今回は、この問題を解決する「**関数**」という概念を学びます。

### 今回の目標

今回のレッスンでは、関数を使ってコードを整理する方法を学びます。

1. **関数の概念を理解する** - 関数とは何か、なぜ必要なのかを学びます
2. **関数を定義できるようになる** - `function`キーワードを使って関数を作れるようになります
3. **onclick から関数を呼び出せるようになる** - ボタンをクリックしたときに関数を実行できるようになります

---

## 関数とは

### 関数の概念

**関数**とは、**処理をまとめて名前を付けたもの**です。

料理のレシピに例えると分かりやすいです。

**例：カレーを作る**

カレーを作るという処理は、以下の複数のステップからなります。

1. 野菜を切る
2. 肉を炒める
3. 水を入れて煮る
4. カレールーを入れる

これらの処理を、「**カレーを作る**」という1つの名前でまとめることができます。

毎回「野菜を切って、肉を炒めて、水を入れて、カレールーを入れて...」と言う代わりに、「**カレーを作って**」と言えば、全ての手順が実行されます。

JavaScriptでも同じように、**複数の処理を1つの名前でまとめる**ことができます。これが関数です。

### 身近な例で理解する

普段の生活でも、複雑な処理を1つの名前でまとめています。

**例1：「学校に行く」**

「学校に行く」という行動には、以下の処理が含まれています。

1. 着替える
2. 朝食を食べる
3. 歯を磨く
4. カバンを持つ
5. 家を出る
6. 電車に乗る

しかし、私たちは「学校に行く」という1つの言葉でまとめて表現します。

**例2：「メールを送る」**

メールアプリで「送信ボタン」を押すと、以下の処理が実行されます。

1. メールの内容を確認
2. サーバーに接続
3. データを送信
4. 送信完了を確認
5. 送信済みフォルダに保存

しかし、ユーザーは「送信」ボタンを押すだけです。複雑な処理が1つの名前（送信）でまとめられています。

関数も同じです。**複雑な処理を1つの名前にまとめることで、簡単に使えるようにします。**

### なぜ関数が必要なのか

関数を使うと、以下のメリットがあります。

**1. コードが読みやすくなる**

長いコードを1つの名前でまとめることで、何をしているのかが分かりやすくなります。

```html
<!-- 関数を使わない場合：読みにくい -->
<button onclick="document.getElementById('text').style.color = 'red'; document.getElementById('text').style.fontSize = '30px'; document.getElementById('text').textContent = '変わった！'">ボタン</button>
```

```html
<!-- 関数を使う場合：読みやすい -->
<button onclick="changeText()">ボタン</button>
```

**2. 同じ処理を何度も書かなくて良い**

関数を1回定義すれば、何度でも呼び出すことができます。

```javascript
// 関数を1回定義
function showMessage() {
  alert("こんにちは");
}

// 何度でも呼び出せる
showMessage();
showMessage();
showMessage();
```

**3. 修正が簡単になる**

関数を使えば、1箇所を修正するだけで、全ての呼び出し箇所に反映されます。

```javascript
// 関数を修正すれば、全ての呼び出し箇所に反映される
function showMessage() {
  alert("こんばんは");  // ここを変えるだけ
}
```

関数は、プログラミングで最も重要な概念の1つです。これから繰り返し使っていきます。

---

## 関数の定義

### 基本的な書き方

関数を作ることを「**関数を定義する**」と言います。

関数を定義するには、`function`キーワードを使います。

```javascript
function 関数名() {
  // 実行する処理
}
```

それぞれの部分を詳しく見ていきましょう。

**1. `function`**
- 関数を定義するためのキーワードです
- 「これから関数を定義します」という宣言です
- 必ず小文字で書きます

**2. `関数名`**
- 関数の名前です
- 自分で好きな名前を付けることができます
- わかりやすい名前を付けるのが重要です

**3. `()`**
- 括弧（かっこ）です
- 今回は空のままにします（後のレッスンで使い方を学びます）
- 必ず付ける必要があります

**4. `{}`**
- 波括弧（なみかっこ）です
- この中に実行したい処理を書きます
- 複数の処理を書くことができます

### 具体例

最もシンプルな関数を見てみましょう。

```javascript
function showMessage() {
  alert("Hello");
}
```

**この関数は何をするのか：**

- 関数名：`showMessage`（メッセージを表示する）
- 処理：`alert("Hello")`（"Hello"というアラートを表示）

この関数を定義しただけでは、まだ何も実行されません。関数は「呼び出す」ことで初めて実行されます。

### もう少し複雑な例

複数の処理をまとめることもできます。

```javascript
function greeting() {
  alert("こんにちは");
  alert("今日はいい天気ですね");
  alert("お元気ですか？");
}
```

**この関数は何をするのか：**

- 関数名：`greeting`（挨拶をする）
- 処理：3つのアラートを順番に表示

この関数を呼び出すと、3つのアラートが順番に表示されます。

---

## 関数を呼ぶ

### 関数の呼び出し方

定義した関数を実行することを「**関数を呼ぶ**」または「**関数を呼び出す**」と言います。

関数を呼ぶには、以下のように書きます。

```javascript
関数名();
```

**重要なポイント：**
- 関数名の後に括弧（`()`）を付けます
- 括弧を付けることで、関数が実行されます
- 括弧を忘れると、関数は実行されません

### 具体例

関数を定義して、呼び出してみましょう。

```javascript
// ステップ1：関数を定義
function showMessage() {
  alert("Hello");
}

// ステップ2：関数を呼ぶ
showMessage();
```

**何が起こるのか：**

1. 1〜3行目：`showMessage`という関数を定義
2. 6行目：`showMessage()`と書くことで関数を呼び出す
3. 関数の中の`alert("Hello")`が実行される
4. "Hello"というアラートが表示される

### 何度も呼び出せる

同じ関数を何度でも呼び出すことができます。

```javascript
// 関数を定義
function showMessage() {
  alert("Hello");
}

// 3回呼び出す
showMessage();  // 1回目
showMessage();  // 2回目
showMessage();  // 3回目
```

このコードを実行すると、"Hello"というアラートが3回表示されます。

### 括弧を付け忘れると？

括弧を付け忘れると、関数は実行されません。

```javascript
function showMessage() {
  alert("Hello");
}

showMessage;  // 括弧がない → 実行されない
```

**覚え方：**
- `showMessage` - 関数そのもの（実行されない）
- `showMessage()` - 関数を呼び出す（実行される）

---

## onclick から関数を呼ぶ

### HTMLとJavaScriptを分ける

前回のレッスンでは、`onclick`の中に直接コードを書きました。

```html
<button onclick="alert('こんにちは')">ボタン</button>
```

今回は、関数を使ってHTMLとJavaScriptを分離します。

**HTML (index.html):**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 020</title>
</head>
<body>
    <button onclick="showMessage()">クリック</button>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript (script.js):**

```javascript
function showMessage() {
  alert("ボタンがクリックされました！");
}
```

**何が起こるのか：**

1. ブラウザがHTMLファイルを読み込む
2. `script.js`が読み込まれる
3. `showMessage`関数が定義される
4. ユーザーがボタンをクリック
5. `onclick="showMessage()"`が実行される
6. `showMessage`関数が呼ばれる
7. `alert("ボタンがクリックされました！")`が実行される
8. アラートが表示される

### メリット

HTMLとJavaScriptを分けることで、以下のメリットがあります。

**1. HTMLが読みやすくなる**

```html
<!-- 前回：長くて読みにくい -->
<button onclick="document.getElementById('text').style.color = 'red'; document.getElementById('text').style.fontSize = '30px';">ボタン</button>

<!-- 今回：短くて読みやすい -->
<button onclick="changeStyle()">ボタン</button>
```

**2. JavaScriptコードを整理できる**

全てのJavaScript処理を`script.js`ファイルにまとめることができます。

**3. 修正が簡単**

関数の中身を変えるだけで、ボタンの動作を変更できます。

```javascript
// script.jsを修正するだけ
function showMessage() {
  alert("新しいメッセージ");  // ここを変えるだけ
}
```

---

## 複数の処理をまとめる

### 関数の利点

関数を使うと、複数の処理を1つにまとめられます。

```javascript
function changeText() {
  let elem = document.getElementById("text");
  elem.textContent = "変わった！";
  elem.style.color = "red";
  elem.style.fontSize = "30px";
}
```

**この関数は何をするのか：**

1. `getElementById`で要素を取得
2. 文字を「変わった！」に変更
3. 色を赤に変更
4. 文字サイズを30pxに変更

これらの4つの処理が、`changeText()`という1つの呼び出しで実行されます。

### HTMLから呼び出す

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 020</title>
</head>
<body>
    <p id="text">最初の文字</p>
    <button onclick="changeText()">変更</button>

    <script src="script.js"></script>
</body>
</html>
```

ボタンをクリックすると、`changeText()`関数が呼ばれ、4つの処理が一度に実行されます。

---

## 実践：複数のボタンと複数の関数

### 3つのボタン、3つの関数

それぞれのボタンに対応する関数を作ってみましょう。

**HTML (index.html):**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 020</title>
</head>
<body>
    <h1>どのボタンをクリックする？</h1>
    <button onclick="showMessage1()">ボタン1</button>
    <button onclick="showMessage2()">ボタン2</button>
    <button onclick="showMessage3()">ボタン3</button>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript (script.js):**

```javascript
function showMessage1() {
  alert("1つ目のボタンがクリックされました");
}

function showMessage2() {
  alert("2つ目のボタンがクリックされました");
}

function showMessage3() {
  alert("3つ目のボタンがクリックされました");
}
```

**何が起こるのか：**

- 1つ目のボタンをクリック → `showMessage1()`が呼ばれる → 「1つ目のボタンがクリックされました」と表示
- 2つ目のボタンをクリック → `showMessage2()`が呼ばれる → 「2つ目のボタンがクリックされました」と表示
- 3つ目のボタンをクリック → `showMessage3()`が呼ばれる → 「3つ目のボタンがクリックされました」と表示

それぞれのボタンが、それぞれの関数を呼び出しています。

---

## 関数の命名規則

### わかりやすい名前を付ける

関数名は、**その関数が何をするのかがわかる名前**にします。

**良い例：**

```javascript
function showMessage() { ... }      // メッセージを表示する
function changeColor() { ... }      // 色を変える
function hideElement() { ... }      // 要素を隠す
function calculateTotal() { ... }   // 合計を計算する
```

関数名を見ただけで、何をする関数かがわかります。

**悪い例：**

```javascript
function aaa() { ... }              // 何をするのか不明
function doSomething() { ... }      // 何をするのか不明
function x() { ... }                // 何をするのか不明
function func1() { ... }            // 何をするのか不明
```

これらの名前では、何をする関数かがわかりません。

### 命名のルール

JavaScriptの関数名には、以下のルールがあります。

**1. 小文字で始める**

```javascript
showMessage  // ○ 小文字で始める
ShowMessage  // △ 動くが、推奨されない
```

**2. 複数の単語はキャメルケース**

単語の区切りを大文字にします（ラクダのコブのように見えることから「キャメルケース」と呼ばれます）。

```javascript
showMessage      // ○ show + Message
changeColor      // ○ change + Color
hideElement      // ○ hide + Element
calculateTotal   // ○ calculate + Total
```

**3. 動詞で始める**

関数は「何かをする」ものなので、動詞で始めます。

```javascript
show...    // 表示する
change...  // 変更する
hide...    // 隠す
get...     // 取得する
set...     // 設定する
calculate... // 計算する
```

**よく使われる動詞：**

- `show` - 表示する
- `hide` - 隠す
- `change` - 変更する
- `update` - 更新する
- `add` - 追加する
- `remove` - 削除する
- `get` - 取得する
- `set` - 設定する
- `create` - 作成する
- `delete` - 削除する

---

## よくある間違いと解決方法

### 間違い1：括弧を忘れる（定義）

関数を定義するときに括弧を忘れるとエラーになります。

**間違い：**

```javascript
function showMessage {  // エラー（括弧がない）
  alert("Hello");
}
```

**正しい書き方：**

```javascript
function showMessage() {  // 正しい
  alert("Hello");
}
```

### 間違い2：括弧を忘れる（呼び出し）

関数を呼び出すときに括弧を忘れると、関数は実行されません。

**間違い：**

```javascript
showMessage;  // 実行されない
```

**正しい書き方：**

```javascript
showMessage();  // 実行される
```

### 間違い3：関数名のスペルミス

関数を定義した名前と、呼び出すときの名前は完全に一致している必要があります。

**間違い：**

```javascript
// 定義
function showMessage() {
  alert("Hello");
}

// 呼び出し
showMesage();  // エラー（sが1つ足りない）
```

**正しい書き方：**

```javascript
// 定義
function showMessage() {
  alert("Hello");
}

// 呼び出し
showMessage();  // 正しい
```

大文字・小文字も区別されます。

```javascript
// 定義
function showMessage() { ... }

// 呼び出し
ShowMessage();  // エラー（最初が大文字）
showmessage();  // エラー（全て小文字）
```

### 間違い4：波括弧を忘れる

関数の処理を囲む波括弧を忘れるとエラーになります。

**間違い：**

```javascript
function showMessage()
  alert("Hello");  // エラー（波括弧がない）
```

**正しい書き方：**

```javascript
function showMessage() {
  alert("Hello");
}
```

### 間違い5：HTMLとJavaScriptの関数名が違う

HTMLの`onclick`で呼び出す関数名と、JavaScriptで定義する関数名は一致している必要があります。

**間違い：**

```html
<!-- HTML -->
<button onclick="showMessage()">ボタン</button>
```

```javascript
// JavaScript
function displayMessage() {  // 違う名前
  alert("Hello");
}
```

**正しい書き方：**

```html
<!-- HTML -->
<button onclick="showMessage()">ボタン</button>
```

```javascript
// JavaScript
function showMessage() {  // 同じ名前
  alert("Hello");
}
```

---

## 練習問題

### 課題：3つのボタンと3つの関数を作る

3つのボタンを作成し、それぞれに対応する関数を定義してください。

### 保存場所

`exercises/lesson-020/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。

### 手順

**ステップ1：index.htmlを開く**

`exercises/lesson-020/index.html` をエディタで開きます。

**ステップ2：3つのボタンを追加する**

コメントが書かれている部分に、3つの`<button>`要素を追加します。

- 1つ目のボタン：`onclick="showMessage1()"`
- 2つ目のボタン：`onclick="showMessage2()"`
- 3つ目のボタン：`onclick="showMessage3()"`

**ステップ3：script.jsを開く**

`exercises/lesson-020/script.js` をエディタで開きます。

**ステップ4：3つの関数を定義する**

3つの関数を定義します。

- `showMessage1()`：「メッセージ1」とアラート表示
- `showMessage2()`：「メッセージ2」とアラート表示
- `showMessage3()`：「メッセージ3」とアラート表示

**ステップ5：ブラウザで確認する**

`index.html` をブラウザで開いて、それぞれのボタンをクリックしてみましょう。

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-020
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**ヒント1：HTMLの書き方**

ボタンに`onclick`属性を付けて、関数名を指定します。括弧を忘れずに！

```html
<button onclick="showMessage1()">ボタン1</button>
```

**ヒント2：関数の定義の基本形**

`script.js`に関数を定義します。

```javascript
function 関数名() {
  // 実行する処理
}
```

**ヒント3：alert の使い方**

`alert()`を使ってメッセージを表示します。

```javascript
function showMessage1() {
  alert("メッセージ1");
}
```

**ヒント4：3つの関数を作る**

同じパターンで3つの関数を作ります。

```javascript
function showMessage1() {
  alert("メッセージ1");
}

function showMessage2() {
  alert("メッセージ2");
}

function showMessage3() {
  alert("メッセージ3");
}
```

**ヒント5：確認方法**

ブラウザで`index.html`を開いて、それぞれのボタンをクリックしてください。

- 1つ目のボタンをクリック → 「メッセージ1」と表示
- 2つ目のボタンをクリック → 「メッセージ2」と表示
- 3つ目のボタンをクリック → 「メッセージ3」と表示

もし動かない場合は、以下を確認してください。

- HTMLの関数名とJavaScriptの関数名が一致しているか
- 括弧（`()`）を付けているか
- スペルミスがないか

---

## 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 020</title>
</head>
<body>
    <button onclick="showMessage1()">ボタン1</button>
    <button onclick="showMessage2()">ボタン2</button>
    <button onclick="showMessage3()">ボタン3</button>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
function showMessage1() {
  alert("メッセージ1");
}

function showMessage2() {
  alert("メッセージ2");
}

function showMessage3() {
  alert("メッセージ3");
}
```

### 解説

**HTMLファイル (index.html):**

**9行目：1つ目のボタン**

```html
<button onclick="showMessage1()">ボタン1</button>
```

- `<button>` - ボタン要素を作成
- `onclick="showMessage1()"` - クリックされたときに`showMessage1()`関数を呼び出す
- `ボタン1` - ボタンに表示される文字

**10行目：2つ目のボタン**

```html
<button onclick="showMessage2()">ボタン2</button>
```

2つ目のボタンは、`showMessage2()`関数を呼び出します。

**11行目：3つ目のボタン**

```html
<button onclick="showMessage3()">ボタン3</button>
```

3つ目のボタンは、`showMessage3()`関数を呼び出します。

**13行目：JavaScriptファイルの読み込み**

```html
<script src="script.js"></script>
```

`script.js`ファイルを読み込みます。このファイルの中に関数が定義されています。

**JavaScriptファイル (script.js):**

**1〜3行目：showMessage1 関数**

```javascript
function showMessage1() {
  alert("メッセージ1");
}
```

- `function` - 関数を定義するキーワード
- `showMessage1` - 関数名
- `()` - 括弧（今回は空）
- `{}` - 波括弧で処理を囲む
- `alert("メッセージ1")` - 実行される処理

この関数が呼ばれると、「メッセージ1」というアラートが表示されます。

**5〜7行目：showMessage2 関数**

```javascript
function showMessage2() {
  alert("メッセージ2");
}
```

2つ目の関数は、「メッセージ2」を表示します。

**9〜11行目：showMessage3 関数**

```javascript
function showMessage3() {
  alert("メッセージ3");
}
```

3つ目の関数は、「メッセージ3」を表示します。

**重要なポイント：**

1. **HTMLとJavaScriptの関数名が一致**
   - HTMLで`showMessage1()`を呼んでいる
   - JavaScriptで`showMessage1`を定義している
   - 名前が完全に一致している必要がある

2. **括弧を忘れずに**
   - 定義するとき：`function showMessage1()` - 括弧が必要
   - 呼び出すとき：`showMessage1()` - 括弧が必要

3. **それぞれ独立した関数**
   - 3つの関数は独立している
   - 1つのボタンをクリックしても、他の関数には影響しない

---

## まとめ

### 今回学んだこと

**1. 関数の概念**

関数とは、**処理をまとめて名前を付けたもの**です。

- 料理のレシピのように、複数のステップを1つの名前でまとめる
- 複雑な処理を簡単に呼び出せるようにする
- コードを読みやすく、整理しやすくする

**2. 関数の定義**

関数を定義するには、`function`キーワードを使います。

```javascript
function 関数名() {
  // 実行する処理
}
```

- `function` - 関数を定義するキーワード
- `関数名` - わかりやすい名前を付ける
- `()` - 括弧（今回は空）
- `{}` - 処理を波括弧で囲む

**3. 関数の呼び出し**

定義した関数を実行するには、関数名に括弧を付けます。

```javascript
関数名();
```

- 括弧を付けることで関数が実行される
- 括弧を忘れると実行されない
- 何度でも呼び出すことができる

**4. onclick から関数を呼ぶ**

`onclick`属性から関数を呼び出すことで、コードを整理できます。

```html
<!-- HTML -->
<button onclick="showMessage()">ボタン</button>
```

```javascript
// JavaScript
function showMessage() {
  alert("こんにちは");
}
```

- HTMLとJavaScriptを分離できる
- HTMLが読みやすくなる
- JavaScriptコードを整理できる

**5. 複数の処理をまとめる**

関数を使うと、複数の処理を1つにまとめられます。

```javascript
function changeText() {
  let elem = document.getElementById("text");
  elem.textContent = "変わった！";
  elem.style.color = "red";
  elem.style.fontSize = "30px";
}
```

1回の関数呼び出しで、複数の処理を実行できます。

### できるようになったこと

✅ 関数の概念を理解できた

✅ `function`キーワードを使って関数を定義できるようになった

✅ 定義した関数を呼び出せるようになった

✅ `onclick`から関数を呼び出せるようになった

✅ 複数の処理を1つの関数にまとめられるようになった

### 次回の学習

次回は、関数と変数を組み合わせて、**クリックカウンター**を作ります。

ボタンをクリックするたびに数字が増えていく、インタラクティブなページを作れるようになります。

```javascript
let count = 0;  // 変数で数を記憶

function increment() {
  count = count + 1;  // クリックするたびに+1
  // 画面に表示
}
```

変数と関数を組み合わせることで、より動的なWebページを作れるようになります。楽しみにしていてください。

お疲れ様でした！
