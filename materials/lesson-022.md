# Lesson 022: DOM操作の復習

このレッスンでは、これまで学んできたDOM操作の基本をまとめて復習します。

## これまで学んだこと

これまでのレッスンで、次のようなDOM操作を学びました。

- `document.getElementById()`で要素を取得する
- `textContent`で文字を変更する
- `style`プロパティで見た目を変更する
- `onclick`でクリックに反応する
- 変数を使って状態を保持する

これらは、Webページに動きをつけるための基本的な操作です。

## DOM操作の基本パターン

DOM操作は、ほとんどの場合、次のようなパターンで行います。

1. 要素を取得する
2. 要素のプロパティを変更する

### 1. 要素を取得する

まず、操作したい要素を取得します。

```javascript
const elem = document.getElementById("target");
```

`getElementById()`は、指定したIDを持つ要素を取得します。

取得した要素は変数に保存しておくことで、後から何度でも使えます。

### 2. 要素のプロパティを変更する

取得した要素のプロパティを変更することで、見た目や内容を変えられます。

```javascript
elem.textContent = "新しい文字";
elem.style.color = "red";
elem.style.fontSize = "20px";
```

## getElementById()の練習

`getElementById()`は、HTML要素のid属性を指定して、その要素を取得します。

HTML:

```html
<p id="message">こんにちは</p>
```

JavaScript:

```javascript
const elem = document.getElementById("message");
```

この例では、id="message"の要素を取得して、変数elemに保存しています。

### 注意点

- IDは1つのページ内で重複してはいけません
- IDが存在しない場合、`getElementById()`はnullを返します
- IDは大文字と小文字を区別します

## textContentの練習

`textContent`プロパティは、要素の中のテキストを取得したり、変更したりできます。

### テキストを取得する

```javascript
const elem = document.getElementById("message");
const text = elem.textContent;
console.log(text);  // "こんにちは"と表示される
```

### テキストを変更する

```javascript
const elem = document.getElementById("message");
elem.textContent = "さようなら";
```

この操作で、画面に表示されている文字が「こんにちは」から「さようなら」に変わります。

### 注意点

- `textContent`はHTMLタグを解釈しません
- すべてのテキストが置き換えられます

## styleの練習

`style`プロパティを使うと、要素のスタイル（見た目）を変更できます。

### 色を変える

```javascript
elem.style.color = "blue";
elem.style.backgroundColor = "yellow";
```

### サイズを変える

```javascript
elem.style.fontSize = "24px";
elem.style.width = "300px";
elem.style.height = "100px";
```

### 表示/非表示を切り替える

```javascript
elem.style.display = "none";  // 非表示にする
elem.style.display = "block";  // 表示する
```

### CSSプロパティ名の変換規則

CSSのプロパティ名は、JavaScriptでは次のように変換します。

- ハイフンを削除する
- ハイフンの後の文字を大文字にする（キャメルケース）

| CSS | JavaScript |
|-----|-----------|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `border-width` | `borderWidth` |

## DOM操作の実践例

これまで学んだことを組み合わせて、実用的な例を見てみましょう。

### 例1: ボタンで文字を変更する

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

### 例2: ボタンで色を変更する

HTML:

```html
<p id="text">カラフルな文字</p>
<button onclick="changeColor()">色を変える</button>
```

JavaScript:

```javascript
function changeColor() {
  const elem = document.getElementById("text");
  elem.style.color = "red";
  elem.style.backgroundColor = "yellow";
}
```

### 例3: 複数の要素を操作する

HTML:

```html
<p id="title">タイトル</p>
<p id="content">内容</p>
<button onclick="changeAll()">すべて変更</button>
```

JavaScript:

```javascript
function changeAll() {
  const title = document.getElementById("title");
  const content = document.getElementById("content");

  title.textContent = "新しいタイトル";
  title.style.color = "blue";

  content.textContent = "新しい内容";
  content.style.fontSize = "18px";
}
```

## 練習問題

次の要件を満たすページを作成してください。

1. id="title"の要素を用意し、「DOM操作の練習」というテキストを表示する
2. id="description"の要素を用意し、「説明文」というテキストを表示する
3. id="status"の要素を用意し、「待機中」というテキストを表示する
4. updateTitle関数を定義し、次の処理を行う
   - id="title"の要素のtextContentを変更する
   - id="title"の要素の色を青にする
   - id="title"の要素のフォントサイズを24pxにする
5. updateDescription関数を定義し、次の処理を行う
   - id="description"の要素のtextContentを変更する
   - id="description"の要素の背景色を黄色にする
6. updateStatus関数を定義し、次の処理を行う
   - id="status"の要素のtextContentを「実行中」に変更する
   - id="status"の要素の色を緑にする
7. 3つのボタンを作成し、それぞれクリックすると対応する関数が実行されるようにする

## ポイント

- `document.getElementById()`で要素を取得します
- `textContent`で文字を変更できます
- `style.color`で文字の色を変更できます
- `style.backgroundColor`で背景色を変更できます
- `style.fontSize`でフォントサイズを変更できます
- 1つの関数で複数の要素を操作できます
- 1つの要素に対して複数のプロパティを変更できます

## まとめ

このレッスンでは、DOM操作の基本パターンを復習しました。

- 要素の取得: `document.getElementById()`
- 文字の変更: `textContent`
- 見た目の変更: `style`プロパティ
- イベント処理: `onclick`属性

これらの基本操作を組み合わせることで、さまざまな動的なWebページを作ることができます。
