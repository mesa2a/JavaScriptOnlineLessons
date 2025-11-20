---
title: "Lesson 012.5: 外部JavaScriptファイル"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 012.5: 外部JavaScriptファイル

---

## 今回の学習

### 前回の復習

レッスン12では、第1章の総復習を行いました。console.log、alert、変数、計算など、これまで学んだすべての内容を振り返り、自己紹介ページを作成しました。

### 今回の目標

1. 外部JavaScriptファイルとは何かを理解する
2. HTMLファイルとJavaScriptファイルを分離できる
3. scriptタグのsrc属性を使ってファイルを読み込める
4. 外部ファイルを使うメリットを理解する

---

## これまでの書き方

### HTMLファイルの中にJavaScriptを書く

これまでは、HTMLファイルの中に直接JavaScriptコードを書いていました。

```html
<script>
console.log("Hello, World!");
let name = "山田太郎";
console.log(name);
</script>
```

この方法は手軽で便利ですが、コードが長くなると管理が大変になります。

### コードが長くなると起きる問題

```html
<p id="text">テキスト</p>

<script>
let name = "山田太郎";
let age = 25;
let city = "東京";
let hobby = "読書";
let message = name + "は" + age + "歳で、" + city + "に住んでいます。";
console.log(message);

let price1 = 100;
let price2 = 200;
let price3 = 300;
let total = price1 + price2 + price3;
console.log("合計：" + total + "円");

// ... さらに続く
</script>
```

JavaScriptコードが長くなると、HTMLファイルが見づらくなります。HTMLの構造とJavaScriptのロジックが混在すると、どこに何が書いてあるかわかりにくくなります。

---

## 外部JavaScriptファイルとは

### ファイルを分離する

HTMLとJavaScriptを別々のファイルに分けることができます。

**index.html（HTMLファイル）**
```html
<p id="text">テキスト</p>

<script src="script.js"></script>
```

**script.js（JavaScriptファイル）**
```javascript
let name = "山田太郎";
let age = 25;
let city = "東京";
let hobby = "読書";
let message = name + "は" + age + "歳で、" + city + "に住んでいます。";
console.log(message);
```

このように、JavaScriptコードを別のファイルに書いて、HTMLから読み込むことができます。

### src属性

`<script>` タグの `src` 属性を使って、外部のJavaScriptファイルを指定します。

```html
<script src="script.js"></script>
```

- `src` は「source（ソース）」の略です
- `script.js` は読み込むファイルの名前です
- ブラウザはこのファイルを読み込んで、中のコードを実行します

---

## 外部ファイルの作成と読み込み

### 手順1：JavaScriptファイルを作成する

まず、JavaScriptファイルを作成します。

1. VSCode（またはメモ帳）で新規ファイルを作成します
2. `script.js` という名前で保存します
3. 拡張子は `.js` です（JavaScriptの略）

### 手順2：JavaScriptコードを書く

`script.js` にコードを書きます。`<script>` タグは不要です。

**script.js**
```javascript
console.log("外部ファイルから実行されました");
let message = "これは外部JavaScriptファイルです";
console.log(message);
```

### 手順3：HTMLファイルから読み込む

HTMLファイルで、`<script>` タグを使って外部ファイルを読み込みます。

**index.html**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>外部JavaScript</title>
</head>
<body>
    <h1>外部JavaScriptファイルのテスト</h1>

    <script src="script.js"></script>
</body>
</html>
```

### 手順4：ブラウザで確認する

1. `index.html` をブラウザで開きます
2. F12キーで開発者ツールを開きます
3. Consoleタブを確認します

コンソールに以下のように表示されれば成功です。

```
外部ファイルから実行されました
これは外部JavaScriptファイルです
```

---

## 完全なHTML構造

### これまでの簡易的な書き方

これまでは、学習のために簡略化したHTMLを使っていました。

```html
<p id="text">Hello</p>

<script>
console.log("Hello");
</script>
```

### 正式なHTML構造

実際のWebページでは、完全なHTML構造を使います。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ページタイトル</title>
</head>
<body>
    <!-- ここにコンテンツを書く -->

    <script src="script.js"></script>
</body>
</html>
```

### 各部分の意味

**`<!DOCTYPE html>`**

これはHTML5の文書であることを宣言しています。必ず最初の行に書きます。

**`<html lang="ja">`**

HTML文書の開始タグです。`lang="ja"` は日本語のページであることを示します。

**`<head>`**

ページの情報（メタデータ）を書く場所です。画面には表示されません。

**`<meta charset="UTF-8">`**

文字コードをUTF-8に設定します。これにより、日本語が正しく表示されます。

**`<meta name="viewport" ...>`**

スマートフォンでの表示を最適化します。

**`<title>`**

ブラウザのタブに表示されるページタイトルです。

**`<body>`**

ページのコンテンツ（画面に表示される部分）を書く場所です。

**`<script src="script.js">`**

外部JavaScriptファイルを読み込みます。`</body>` の直前に書くのが一般的です。

---

## scriptタグの位置

### bodyの最後に書く理由

`<script>` タグは、`</body>` の直前に書くのが推奨されます。

```html
<body>
    <h1>見出し</h1>
    <p>本文</p>

    <script src="script.js"></script>
</body>
```

これには理由があります。

**理由1：HTMLの読み込みを優先する**

ブラウザは上から順番にHTMLを読み込みます。`<script>` タグを最初に書くと、JavaScriptの読み込みが終わるまでHTMLの表示が遅れます。

**理由2：DOM要素が確実に存在する**

JavaScript内でHTML要素を操作する場合、その要素が既に読み込まれている必要があります。`<script>` を最後に書けば、すべてのHTML要素が確実に存在します。

### headの中に書く場合

場合によっては、`<head>` の中に書くこともあります。

```html
<head>
    <script src="script.js"></script>
</head>
```

しかし、初心者のうちは `<body>` の最後に書く方が安全です。

---

## 外部ファイルを使うメリット

### メリット1：コードが整理される

HTMLとJavaScriptを分けることで、それぞれの役割が明確になります。

- HTML：ページの構造を定義する
- JavaScript：ページの動作を制御する

### メリット2：再利用できる

同じJavaScriptファイルを複数のHTMLファイルから読み込めます。

**page1.html**
```html
<script src="common.js"></script>
```

**page2.html**
```html
<script src="common.js"></script>
```

両方のページで同じコードが使えます。

### メリット3：メンテナンスが楽

JavaScriptのコードを修正したい場合、`script.js` だけを編集すれば、そのファイルを読み込んでいるすべてのHTMLファイルに反映されます。

### メリット4：チームで作業しやすい

HTMLを担当する人とJavaScriptを担当する人が別々に作業できます。

### メリット5：キャッシュが効く

ブラウザは一度読み込んだ外部ファイルをキャッシュ（保存）します。次回からは素早く読み込めます。

---

## 複数のファイルを読み込む

### 複数のscriptタグ

複数の外部JavaScriptファイルを読み込むこともできます。

```html
<body>
    <h1>複数ファイルのテスト</h1>

    <script src="file1.js"></script>
    <script src="file2.js"></script>
    <script src="file3.js"></script>
</body>
```

ファイルは上から順番に読み込まれ、実行されます。

### 読み込み順序に注意

ファイルの順序は重要です。

**file1.js**
```javascript
let name = "山田太郎";
```

**file2.js**
```javascript
console.log(name);  // file1.jsの変数を使える
```

この場合、`file1.js` を先に読み込む必要があります。順序を逆にすると、エラーになります。

---

## よくある間違い

### 間違い1：src属性とコードの両方を書く

```html
<script src="script.js">
console.log("これは実行されません");
</script>
```

`src` 属性を使う場合、`<script>` タグの中にコードを書いても実行されません。

正しくは、別々のタグを使います。

```html
<script src="script.js"></script>
<script>
console.log("これは実行されます");
</script>
```

### 間違い2：ファイルパスの間違い

```html
<script src="Script.js"></script>  <!-- 大文字小文字が違う -->
<script src="script.js "></script>  <!-- 余分なスペース -->
<script src="srcript.js"></script>  <!-- スペルミス -->
```

ファイル名は正確に書く必要があります。大文字小文字も区別されます。

### 間違い3：ファイルの保存場所の間違い

HTMLファイルと同じフォルダに `script.js` がない場合、読み込めません。

```
myproject/
├── index.html
└── scripts/
    └── script.js
```

この場合は、パスを指定する必要があります。

```html
<script src="scripts/script.js"></script>
```

---

## 練習問題

### 保存場所

`exercises/lesson-012.5/` フォルダに以下のファイルが用意されています。

- `index.html` - HTMLファイル
- `script.js` - JavaScriptファイル

HTMLファイルは既に完全な構造になっています。JavaScriptコードは `script.js` に記述してください。

### 課題1：基本の外部ファイル

`script.js` に以下のコードを書いて、ブラウザで確認してください。

```javascript
console.log("外部JavaScriptファイルが読み込まれました");
let message = "Hello from external file!";
console.log(message);
```

### 課題2：変数を使った自己紹介

`script.js` に変数を使った自己紹介コードを書いてください。

- 名前、年齢、趣味の3つの変数を作成
- それぞれをconsole.logで表示
- 連結した文章も表示

### 課題3：計算プログラム

`script.js` に買い物の計算プログラムを書いてください。

- 3つの商品の価格を変数に保存
- 合計を計算
- 消費税込みの金額を計算（税率10%）
- 結果を表示

---

**解答例（課題2）**

```javascript
let name = "山田太郎";
let age = 25;
let hobby = "読書";

console.log("名前：" + name);
console.log("年齢：" + age);
console.log("趣味：" + hobby);

let intro = "私は" + name + "です。" + age + "歳で、趣味は" + hobby + "です。";
console.log(intro);
```

**解答例（課題3）**

```javascript
const taxRate = 1.1;

let item1 = 300;
let item2 = 450;
let item3 = 200;

let subtotal = item1 + item2 + item3;
let total = subtotal * taxRate;

console.log("商品1：" + item1 + "円");
console.log("商品2：" + item2 + "円");
console.log("商品3：" + item3 + "円");
console.log("小計：" + subtotal + "円");
console.log("税込合計：" + total + "円");
```

---

## まとめ

### 今回学んだこと

**キーポイント1：外部JavaScriptファイル**

JavaScriptコードを別のファイル（`.js`）に書いて、HTMLから読み込むことができます。これにより、コードが整理され、管理しやすくなります。

**キーポイント2：src属性**

`<script src="ファイル名"></script>` の形式で外部ファイルを読み込みます。ファイル名は正確に、パスも正しく指定する必要があります。

**キーポイント3：完全なHTML構造**

実際のWebページでは、DOCTYPE、html、head、bodyなどの完全な構造を使います。

**キーポイント4：外部ファイルのメリット**

コードの整理、再利用、メンテナンス性の向上など、多くのメリットがあります。今後のレッスンでは、この形式を使っていきます。

---

## 次のレッスンに向けて

次のレッスンからは、外部JavaScriptファイルを使う形式になります。HTMLとJavaScriptを分離することで、より実践的なプログラミングを学んでいきます。

第2章では、DOM操作を学び、Webページの内容を動的に変更する方法を習得します。
