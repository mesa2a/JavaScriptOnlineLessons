# Lesson 023: イベントの復習

このレッスンでは、イベントの基本を復習します。

## イベントとは

イベントとは、Webページ上で起こる出来事のことです。

例えば、次のようなものがイベントです。

- ボタンがクリックされた
- テキストボックスに文字が入力された
- マウスが要素の上に乗った
- ページが読み込まれた

JavaScriptでは、こうしたイベントに反応して処理を実行できます。

## イベント駆動プログラミング

イベントに反応して処理を実行するプログラミングスタイルを「イベント駆動プログラミング」と呼びます。

Webページの多くは、ユーザーの操作に反応して動作します。そのため、JavaScriptではイベント駆動プログラミングが中心となります。

## onclick属性

これまでのレッスンでは、`onclick`属性を使ってクリックイベントを処理してきました。

HTML:

```html
<button onclick="showMessage()">クリック</button>
```

JavaScript:

```javascript
function showMessage() {
  alert("ボタンがクリックされました");
}
```

`onclick`属性には、クリックされたときに実行したいJavaScriptのコードを書きます。

通常は、関数を呼び出す形で書きます。

## 関数呼び出し

`onclick`属性で関数を呼び出すときは、関数名の後に`()`をつけます。

```html
<button onclick="showMessage()">クリック</button>
```

`()`を忘れると、関数が実行されません。

### 引数を渡す

関数に引数を渡すこともできます。

HTML:

```html
<button onclick="showMessage('こんにちは')">挨拶</button>
```

JavaScript:

```javascript
function showMessage(text) {
  alert(text);
}
```

文字列を渡すときは、シングルクォート`'`で囲みます。これは、`onclick`属性全体がダブルクォート`"`で囲まれているためです。

## 複数のイベント

1つのページに複数のボタンがあり、それぞれ異なる処理を行う場合、複数の関数を用意します。

HTML:

```html
<button onclick="showHello()">こんにちは</button>
<button onclick="showGoodbye()">さようなら</button>
<button onclick="showThankYou()">ありがとう</button>
```

JavaScript:

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

それぞれのボタンが、対応する関数を呼び出します。

## 同じ関数を複数のボタンで使う

逆に、複数のボタンで同じ関数を使うこともできます。

HTML:

```html
<button onclick="changeColor('red')">赤</button>
<button onclick="changeColor('blue')">青</button>
<button onclick="changeColor('green')">緑</button>
```

JavaScript:

```javascript
function changeColor(color) {
  const elem = document.getElementById("text");
  elem.style.color = color;
}
```

この例では、3つのボタンが同じ`changeColor`関数を呼び出しますが、それぞれ異なる引数を渡しています。

## イベントとDOM操作の組み合わせ

イベントとDOM操作を組み合わせることで、ユーザーの操作に応じて画面を変化させることができます。

### 例1: クリックで文字を変更する

HTML:

```html
<p id="message">最初の文字</p>
<button onclick="changeText()">変更</button>
```

JavaScript:

```javascript
function changeText() {
  const elem = document.getElementById("message");
  elem.textContent = "変更後の文字";
}
```

### 例2: クリックで色を変更する

HTML:

```html
<p id="text">カラフル</p>
<button onclick="setRed()">赤にする</button>
<button onclick="setBlue()">青にする</button>
```

JavaScript:

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

### 例3: クリックで表示/非表示を切り替える

HTML:

```html
<p id="content">表示される内容</p>
<button onclick="hideContent()">非表示</button>
<button onclick="showContent()">表示</button>
```

JavaScript:

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

## イベントハンドラの命名規則

イベントに対応する関数（イベントハンドラ）には、わかりやすい名前をつけましょう。

よい命名の例:

- `showMessage()` - メッセージを表示する
- `changeColor()` - 色を変更する
- `resetCounter()` - カウンターをリセットする
- `addItem()` - アイテムを追加する
- `deleteItem()` - アイテムを削除する

関数名から、何をする関数なのかがわかるようにします。

## 練習問題

次の要件を満たすページを作成してください。

1. id="display"の要素を用意し、「初期状態」というテキストを表示する
2. showMessage1関数を定義し、次の処理を行う
   - id="display"の要素のtextContentを「メッセージ1」に変更する
3. showMessage2関数を定義し、次の処理を行う
   - id="display"の要素のtextContentを「メッセージ2」に変更する
4. showMessage3関数を定義し、次の処理を行う
   - id="display"の要素のtextContentを「メッセージ3」に変更する
5. changeColor関数を定義し、引数で受け取った色をid="display"の要素のstyle.colorに設定する
6. resetDisplay関数を定義し、次の処理を行う
   - id="display"の要素のtextContentを「初期状態」に戻す
   - id="display"の要素のstyle.colorを「black」に戻す
7. 5つのボタンを作成する
   - 1つ目: クリックするとshowMessage1が実行される
   - 2つ目: クリックするとshowMessage2が実行される
   - 3つ目: クリックするとshowMessage3が実行される
   - 4つ目: クリックするとchangeColor('red')が実行される
   - 5つ目: クリックするとresetDisplayが実行される

## ポイント

- `onclick`属性でイベントを処理します
- 関数を呼び出すときは`()`が必要です
- 引数を渡すことができます
- 文字列は`'`で囲みます（`onclick`属性内では）
- 複数のボタンで同じ関数を使えます
- イベントとDOM操作を組み合わせて画面を変化させます

## まとめ

このレッスンでは、イベントの基本を復習しました。

- イベントはWebページ上で起こる出来事です
- `onclick`属性でクリックイベントを処理します
- 関数呼び出しには`()`が必要です
- 引数を渡すことができます
- イベントとDOM操作を組み合わせることで、ユーザーの操作に応じて画面を変化させることができます

イベント駆動プログラミングは、Webアプリケーション開発の基本です。
