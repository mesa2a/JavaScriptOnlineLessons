---
title: "Lesson 012.5: 外部JavaScriptファイル"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 012.5: 外部JavaScriptファイル

---

## 今回の学習

### 前回の復習

レッスン12では、第1章の総復習を行いました。

これまで学んだ内容：
- `console.log()` でメッセージを表示
- `alert()` でアラートを表示
- 変数（`let`と`const`）でデータを保存
- 計算や文字列の連結

これらを使って、自己紹介ページを作成しました。

### 今回の目標

今回は、実践的なプログラミングに向けた重要なステップを学びます。

1. **外部JavaScriptファイルとは何かを理解する** - HTMLとJavaScriptを分離する理由を学びます
2. **HTMLファイルとJavaScriptファイルを分離できる** - 実際にファイルを分けて管理できるようになります
3. **scriptタグのsrc属性を使ってファイルを読み込める** - 外部ファイルの読み込み方を学びます
4. **外部ファイルを使うメリットを理解する** - なぜこの方法が推奨されるのかを理解します

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

この方法は手軽で便利ですが、**コードが長くなると管理が大変になります**。

### コードが長くなると起きる問題

実際のプログラムは、もっと複雑になります。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>自己紹介</title>
</head>
<body>
    <h1>自己紹介</h1>
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

    let birthYear = 2000;
    let currentYear = 2025;
    let calculatedAge = currentYear - birthYear;
    console.log("生まれた年：" + birthYear);

    // ... さらに続く
    </script>
</body>
</html>
```

**問題点：**

1. **HTMLとJavaScriptが混在している** - どこに何が書いてあるかわかりにくい
2. **ファイルが長くなる** - スクロールしないと全体が見えない
3. **修正が大変** - JavaScriptを変更するためにHTMLファイルを開く必要がある
4. **再利用できない** - 同じコードを別のページで使いたい場合、コピーする必要がある

### 身近な例で理解する

料理のレシピを考えてみましょう。

**悪い例：すべてを1つのノートに書く**

```
材料リスト
作り方
栄養情報
買い物リスト
調理時間の記録
感想
次に作る料理のメモ
...全部混ざっている
```

**良い例：目的ごとに分ける**

```
- レシピノート（作り方だけ）
- 材料リスト（材料だけ）
- 記録ノート（感想や記録）
```

プログラミングも同じです。HTMLとJavaScriptを分けることで、それぞれの役割が明確になります。

---

## 外部JavaScriptファイルとは

### ファイルを分離する

HTMLとJavaScriptを**別々のファイル**に分けることができます。

**index.html（HTMLファイル）**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>自己紹介</title>
</head>
<body>
    <h1>自己紹介</h1>
    <p id="text">テキスト</p>

    <script src="script.js"></script>
</body>
</html>
```

**script.js（JavaScriptファイル）**
```javascript
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
```

**何が変わったのか：**

- HTMLファイルは構造だけになり、シンプルで読みやすい
- JavaScriptコードは別ファイルに移動し、プログラムだけに集中できる
- それぞれのファイルが短く、管理しやすい

### src属性

`<script>` タグの `src` 属性を使って、外部のJavaScriptファイルを指定します。

```html
<script src="script.js"></script>
```

**各部分の意味：**

- `<script>` - JavaScriptを読み込むタグ
- `src` - 「source（ソース）」の略で、読み込むファイルを指定する属性
- `"script.js"` - 読み込むファイルの名前
- `</script>` - 閉じタグ（必ず必要）

**重要なポイント：**

ブラウザはこのタグを見つけると、`script.js` ファイルを読み込んで、中のコードを実行します。

---

## 外部ファイルの作成と読み込み

### 手順1：JavaScriptファイルを作成する

まず、JavaScriptファイルを作成します。

**VSCode の場合：**

1. 「ファイル」→「新しいファイル」をクリック
2. ファイル名を `script.js` と入力して保存
3. 拡張子は `.js` です（JavaScriptの略）

**メモ帳の場合：**

1. 「ファイル」→「名前を付けて保存」
2. ファイル名を `script.js` と入力
3. ファイルの種類を「すべてのファイル」に変更
4. 保存

**重要な注意点：**

- ファイル名は**必ず `.js` で終わる**必要があります
- `script.js.txt` のように `.txt` が付かないように注意
- HTMLファイルと**同じフォルダ**に保存します

### 手順2：JavaScriptコードを書く

`script.js` を開いて、コードを書きます。

**重要：`<script>` タグは不要です！**

`.js` ファイルには、JavaScriptコードだけを書きます。

**間違った書き方：**

```javascript
// ❌ これは書かない
<script>
console.log("Hello");
</script>
```

**正しい書き方：**

```javascript
// ✅ これが正しい
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

**11行目の解説：**

```html
<script src="script.js"></script>
```

この行が、`script.js` ファイルを読み込んで実行します。

### 手順4：ブラウザで確認する

**ステップ1：ファイルを開く**

`index.html` をダブルクリックして、ブラウザで開きます。

**ステップ2：開発者ツールを開く**

1. ブラウザで **F12キー** を押す
2. または、ページを右クリック → 「検証」をクリック

**ステップ3：コンソールを確認**

「Console」タブをクリックして、以下のように表示されれば成功です。

```
外部ファイルから実行されました
これは外部JavaScriptファイルです
```

**もし何も表示されない場合：**

1. `script.js` が `index.html` と同じフォルダにあるか確認
2. ファイル名が正確に `script.js` か確認（大文字小文字も）
3. Consoleタブにエラーメッセージがないか確認

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

これでも動きますが、**実際のWebページでは不完全**です。

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
    <h1>見出し</h1>
    <p>本文</p>

    <script src="script.js"></script>
</body>
</html>
```

### 各部分の意味

それぞれの部分を詳しく見ていきましょう。

**1行目：`<!DOCTYPE html>`**

```html
<!DOCTYPE html>
```

- これはHTML5の文書であることを宣言しています
- **必ず最初の行に書きます**
- 大文字小文字は区別されません（`<!doctype html>` でも可）

**2行目：`<html lang="ja">`**

```html
<html lang="ja">
```

- HTML文書全体を囲むタグです
- `lang="ja"` は日本語のページであることを示します
- 検索エンジンや音声読み上げソフトが言語を認識します

**3〜6行目：`<head>` セクション**

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ページタイトル</title>
</head>
```

`<head>` はページの情報（メタデータ）を書く場所です。**画面には表示されません**。

**4行目：`<meta charset="UTF-8">`**

```html
<meta charset="UTF-8">
```

- 文字コードをUTF-8に設定します
- これにより、**日本語が正しく表示**されます
- 必ず書く必要があります

**5行目：`<meta name="viewport" ...>`**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- スマートフォンでの表示を最適化します
- `width=device-width` - 画面の幅に合わせる
- `initial-scale=1.0` - 初期の拡大率を1倍にする

**6行目：`<title>`**

```html
<title>ページタイトル</title>
```

- ブラウザのタブに表示されるページタイトルです
- お気に入り（ブックマーク）にも使われます

**8〜12行目：`<body>` セクション**

```html
<body>
    <!-- ここにコンテンツを書く -->
    <h1>見出し</h1>
    <p>本文</p>

    <script src="script.js"></script>
</body>
```

`<body>` はページのコンテンツ（**画面に表示される部分**）を書く場所です。

**12行目：`<script src="script.js">`**

```html
<script src="script.js"></script>
```

- 外部JavaScriptファイルを読み込みます
- **`</body>` の直前に書くのが一般的**です（理由は後述）

---

## scriptタグの位置

### bodyの最後に書く理由

`<script>` タグは、**`</body>` の直前に書くのが推奨**されます。

```html
<body>
    <h1>見出し</h1>
    <p>本文</p>
    <button id="btn">ボタン</button>

    <script src="script.js"></script>
</body>
```

これには2つの重要な理由があります。

**理由1：HTMLの読み込みを優先する**

ブラウザは**上から順番に**HTMLを読み込みます。

**悪い例：scriptを最初に書く**

```html
<body>
    <script src="script.js"></script>  <!-- 先に読み込まれる -->

    <h1>見出し</h1>
    <p>本文</p>
</body>
```

この場合：
1. JavaScriptファイルを読み込む（時間がかかる）
2. その間、画面は真っ白
3. 読み込みが終わってから、HTMLが表示される

**良い例：scriptを最後に書く**

```html
<body>
    <h1>見出し</h1>
    <p>本文</p>

    <script src="script.js"></script>  <!-- 最後に読み込む -->
</body>
```

この場合：
1. すぐにHTMLが表示される（ユーザーは内容を見られる）
2. その後、JavaScriptを読み込む

**理由2：DOM要素が確実に存在する**

JavaScript内でHTML要素を操作する場合、**その要素が既に読み込まれている必要があります**。

**悪い例：要素より前にscriptを書く**

```html
<body>
    <script src="script.js"></script>  <!-- この時点ではbtnがまだない -->

    <button id="btn">ボタン</button>
</body>
```

**script.js の中身：**

```javascript
let btn = document.getElementById("btn");  // エラー！btnがまだない
```

**良い例：要素の後にscriptを書く**

```html
<body>
    <button id="btn">ボタン</button>  <!-- 先にボタンを作る -->

    <script src="script.js"></script>  <!-- この時点でbtnは存在する -->
</body>
```

**script.js の中身：**

```javascript
let btn = document.getElementById("btn");  // 成功！btnは存在する
```

### headの中に書く場合

場合によっては、`<head>` の中に書くこともあります。

```html
<head>
    <meta charset="UTF-8">
    <title>ページタイトル</title>
    <script src="script.js"></script>
</head>
```

しかし、**初心者のうちは `<body>` の最後に書く方が安全**です。

---

## 外部ファイルを使うメリット

外部JavaScriptファイルを使うと、多くのメリットがあります。

### メリット1：コードが整理される

HTMLとJavaScriptを分けることで、**それぞれの役割が明確**になります。

**役割の分離：**

- **HTML** → ページの構造を定義する（見出し、段落、ボタンなど）
- **JavaScript** → ページの動作を制御する（計算、表示切り替えなど）

**例：料理に例えると**

- レシピ（HTML）：材料と手順が書いてある
- 調理道具（JavaScript）：実際に料理を作るための道具

それぞれが分かれているから、管理しやすい！

### メリット2：再利用できる

同じJavaScriptファイルを**複数のHTMLファイルから読み込めます**。

```
myproject/
├── page1.html  → script.jsを使う
├── page2.html  → script.jsを使う
├── page3.html  → script.jsを使う
└── script.js   → 1つのファイルを共有
```

**page1.html**
```html
<script src="script.js"></script>
```

**page2.html**
```html
<script src="script.js"></script>
```

**page3.html**
```html
<script src="script.js"></script>
```

**メリット：**

- 同じコードを3回書く必要がない
- 1回書けば、どこからでも使える

### メリット3：メンテナンスが楽

JavaScriptのコードを修正したい場合、**`script.js` だけを編集すれば、すべてのページに反映**されます。

**修正前：**

```javascript
// script.js
let taxRate = 1.08;  // 消費税8%
```

**修正後：**

```javascript
// script.js
let taxRate = 1.10;  // 消費税10%
```

この1箇所を変えるだけで、`script.js` を読み込んでいる**すべてのHTMLファイルに自動的に反映**されます。

**もしHTMLに直接書いていたら：**

- page1.html を開いて修正
- page2.html を開いて修正
- page3.html を開いて修正
- ...全部修正する必要がある（大変！）

### メリット4：チームで作業しやすい

複数人で開発する場合、**担当を分けられます**。

- **デザイナー** → HTMLとCSSを編集（見た目を作る）
- **プログラマー** → JavaScriptを編集（動作を作る）

お互いのファイルを壊さずに、並行して作業できます。

### メリット5：キャッシュが効く

ブラウザは一度読み込んだ外部ファイルを**キャッシュ（保存）**します。

**初回：**
1. `index.html` を読み込む
2. `script.js` をダウンロード（少し時間がかかる）

**2回目以降：**
1. `index.html` を読み込む
2. `script.js` はキャッシュから読み込む（**すぐに表示**）

これにより、Webページの表示が高速になります。

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

**読み込み順序：**

ファイルは**上から順番に**読み込まれ、実行されます。

1. `file1.js` を読み込んで実行
2. `file2.js` を読み込んで実行
3. `file3.js` を読み込んで実行

### 読み込み順序に注意

ファイルの順序は**非常に重要**です。

**file1.js**
```javascript
let name = "山田太郎";
console.log("変数を定義しました");
```

**file2.js**
```javascript
console.log(name);  // file1.jsの変数を使える
```

**正しい順序：**

```html
<script src="file1.js"></script>  <!-- 先に変数を定義 -->
<script src="file2.js"></script>  <!-- 後で変数を使う -->
```

**間違った順序：**

```html
<script src="file2.js"></script>  <!-- nameがまだない！ -->
<script src="file1.js"></script>  <!-- 後から定義しても遅い -->
```

この場合、`file2.js` でエラーが発生します。

**覚え方：**

料理と同じです。
- 先に野菜を切る（file1.js）
- 後で炒める（file2.js）

順序を間違えると、料理は失敗します！

---

## よくある間違いと解決方法

### 間違い1：src属性とコードの両方を書く

**間違った書き方：**

```html
<script src="script.js">
console.log("これは実行されません");
</script>
```

`src` 属性を使う場合、`<script>` タグの中にコードを書いても**実行されません**。

**正しい書き方：**

別々のタグを使います。

```html
<script src="script.js"></script>
<script>
console.log("これは実行されます");
</script>
```

### 間違い2：ファイルパスの間違い

**よくある間違い：**

```html
<script src="Script.js"></script>  <!-- ❌ 大文字小文字が違う -->
<script src="script.js "></script>  <!-- ❌ 余分なスペース -->
<script src="srcript.js"></script>  <!-- ❌ スペルミス -->
<script src="script"></script>      <!-- ❌ .jsがない -->
```

**正しい書き方：**

```html
<script src="script.js"></script>  <!-- ✅ 正確に書く -->
```

**重要なポイント：**

- ファイル名は**大文字小文字を区別**します
- `script.js` と `Script.js` は**別のファイル**です
- 余分なスペースがあると読み込めません
- 拡張子 `.js` は必ず付けます

### 間違い3：ファイルの保存場所の間違い

HTMLファイルと同じフォルダに `script.js` がない場合、読み込めません。

**フォルダ構造の例：**

```
myproject/
├── index.html
└── scripts/
    └── script.js
```

**間違った書き方：**

```html
<!-- index.htmlから見て、同じフォルダにはない -->
<script src="script.js"></script>  <!-- ❌ 見つからない -->
```

**正しい書き方：**

```html
<!-- scriptsフォルダの中にあることを指定 -->
<script src="scripts/script.js"></script>  <!-- ✅ 見つかる -->
```

**パスの書き方：**

- `script.js` - 同じフォルダ
- `scripts/script.js` - scriptsフォルダの中
- `../script.js` - 1つ上のフォルダ

### 間違い4：.jsファイルに<script>タグを書く

**間違った書き方（script.js）：**

```javascript
<script>
console.log("Hello");
</script>
```

`.js` ファイルには、`<script>` タグは**不要**です。

**正しい書き方（script.js）：**

```javascript
console.log("Hello");
```

**覚え方：**

- HTMLファイル → `<script>` タグが必要
- JavaScriptファイル → JavaScript コードだけ

### 間違い5：閉じタグを忘れる

**間違った書き方：**

```html
<script src="script.js">  <!-- ❌ 閉じタグがない -->
```

**正しい書き方：**

```html
<script src="script.js"></script>  <!-- ✅ 閉じタグがある -->
```

`<script>` タグは、`src` 属性を使う場合でも**必ず閉じタグが必要**です。

---

## 練習問題

### 保存場所

`exercises/lesson-012.5/` フォルダに以下のファイルが用意されています。

- `index.html` - HTMLファイル
- `script.js` - JavaScriptファイル

HTMLファイルは既に完全な構造になっています。JavaScriptコードは `script.js` に記述してください。

### 課題1：基本の外部ファイル

`script.js` に以下のコードを書いて、ブラウザで確認してください。

**やること：**

1. `script.js` をエディタで開く
2. 以下のコードを書く
3. ファイルを保存
4. `index.html` をブラウザで開く
5. F12キーでコンソールを開いて確認

**コード：**

```javascript
console.log("外部JavaScriptファイルが読み込まれました");
let message = "Hello from external file!";
console.log(message);
```

**期待される結果：**

コンソールに以下のように表示される：

```
外部JavaScriptファイルが読み込まれました
Hello from external file!
```

### 課題2：変数を使った自己紹介

`script.js` に変数を使った自己紹介コードを書いてください。

**やること：**

1. 名前、年齢、趣味の3つの変数を作成
2. それぞれを `console.log()` で表示
3. 文字列を連結して、自己紹介文も表示

**ヒント：**

```javascript
let name = "あなたの名前";
let age = 25;
let hobby = "あなたの趣味";

// それぞれを表示
console.log("名前：" + name);
// ... 続きを書く

// 連結して表示
let intro = "私は" + name + "です。";
// ... 続きを書く
```

### 課題3：計算プログラム

`script.js` に買い物の計算プログラムを書いてください。

**やること：**

1. 3つの商品の価格を変数に保存
2. 合計（小計）を計算
3. 消費税込みの金額を計算（税率10% = 1.1倍）
4. 結果をすべて表示

**ヒント：**

```javascript
const taxRate = 1.1;

let item1 = 300;
let item2 = 450;
let item3 = 200;

let subtotal = item1 + item2 + item3;
let total = subtotal * taxRate;

console.log("商品1：" + item1 + "円");
// ... 続きを書く
```

---

## 解答例

### 課題1の解答

**script.js:**

```javascript
console.log("外部JavaScriptファイルが読み込まれました");
let message = "Hello from external file!";
console.log(message);
```

**解説：**

- 1行目：メッセージをコンソールに表示
- 2行目：変数 `message` に文字列を保存
- 3行目：変数の内容をコンソールに表示

### 課題2の解答

**script.js:**

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

**解説：**

- 1〜3行目：3つの変数を定義
- 5〜7行目：それぞれの変数を表示
- 9行目：文字列を連結して自己紹介文を作成
- 10行目：自己紹介文を表示

**コンソールの出力：**

```
名前：山田太郎
年齢：25
趣味：読書
私は山田太郎です。25歳で、趣味は読書です。
```

### 課題3の解答

**script.js:**

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

**解説：**

- 1行目：消費税率を定数で定義（変更しない値なので `const`）
- 3〜5行目：3つの商品の価格を定義
- 7行目：小計を計算（3つの価格を足す）
- 8行目：税込合計を計算（小計 × 1.1）
- 10〜14行目：すべての結果を表示

**コンソールの出力：**

```
商品1：300円
商品2：450円
商品3：200円
小計：950円
税込合計：1045円
```

---

## まとめ

### 今回学んだこと

**1. 外部JavaScriptファイル**

JavaScriptコードを別のファイル（`.js`）に書いて、HTMLから読み込むことができます。

- HTMLはページの構造
- JavaScriptは動作の制御

役割を分けることで、コードが整理され、管理しやすくなります。

**2. src属性の使い方**

`<script src="ファイル名"></script>` の形式で外部ファイルを読み込みます。

```html
<script src="script.js"></script>
```

- ファイル名は正確に（大文字小文字も区別）
- パスも正しく指定する
- 閉じタグを忘れずに

**3. 完全なHTML構造**

実際のWebページでは、以下の完全な構造を使います。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ページタイトル</title>
</head>
<body>
    <!-- コンテンツ -->

    <script src="script.js"></script>
</body>
</html>
```

**4. scriptタグの位置**

`<script>` タグは、`</body>` の直前に書くのが推奨されます。

理由：
- HTMLの表示を優先できる
- DOM要素が確実に存在する

**5. 外部ファイルのメリット**

- コードが整理される
- 再利用できる
- メンテナンスが楽
- チームで作業しやすい
- キャッシュが効く

### できるようになったこと

✅ 外部JavaScriptファイルの作り方を理解できた

✅ HTMLとJavaScriptを分離して管理できるようになった

✅ `src` 属性を使ってファイルを読み込めるようになった

✅ 完全なHTML構造を理解できた

✅ 外部ファイルを使うメリットを理解できた

---

## 次のレッスンに向けて

次のレッスン（第2章）からは、**外部JavaScriptファイルを使う形式**になります。

HTMLとJavaScriptを分離することで、より実践的なプログラミングを学んでいきます。

**第2章の内容：**

- DOM操作を学ぶ
- Webページの内容を動的に変更する
- ボタンをクリックしたときの処理を作る

より本格的なWebアプリケーション開発に進んでいきます。楽しみにしていてください！

お疲れ様でした！
