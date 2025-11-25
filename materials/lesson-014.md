---
title: "Lesson 014: 文字を変更する"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 014: 文字を変更する

---

## 今回の学習

### 前回の復習

前回は、DOM（Document Object Model）という概念を学び、`document.getElementById()`を使ってHTML要素を取得する方法を学習しました。変数に要素を保存し、コンソールで確認することができるようになりました。

### 今回の目標

1. 取得した要素の文字を変更できるようになる
2. `textContent`プロパティの使い方を理解する
3. 画面に表示されている文字を動的に変更できるようになる

---

## プロパティとは

### プロパティの概念

プロパティとは、オブジェクト（ここでは要素）が持っている「特性」や「属性」のことです。

**身近な例で理解する：**

スマートフォンを例に考えてみましょう。

- `color`プロパティ: 本体の色（"黒"、"白"など）
- `batteryLevel`プロパティ: バッテリー残量（80%など）
- `screenBrightness`プロパティ: 画面の明るさ

これらの設定を変更すると、スマホの状態が変わります。同じように、HTML要素も様々なプロパティを持っています。

**人に例えると：**

- `name`プロパティ: 名前（"山田太郎"）
- `age`プロパティ: 年齢（25）
- `height`プロパティ: 身長（170）

**HTML要素のプロパティ：**

HTML要素も同じように、様々なプロパティを持っています。

- `textContent`プロパティ: 要素の中のテキスト ← **今回学ぶ！**
- `style`プロパティ: 要素の見た目（色、サイズなど）← 次回以降
- `id`プロパティ: 要素のID

今回学ぶ`textContent`は、要素の中に表示されているテキストを表すプロパティです。

**重要なポイント：** プロパティは**読み取る**こともできるし、**変更する**こともできます！

### プロパティへのアクセス方法

プロパティにアクセスするには、ドット（`.`）を使います。

```javascript
要素.プロパティ名
```

この形で、要素が持っているプロパティの値を取得したり、変更したりできます。

**具体例：**

```javascript
// 要素を取得
const elem = document.getElementById("text");

// プロパティを読み取る
console.log(elem.textContent);  // 現在の文字を表示

// プロパティを変更する
elem.textContent = "新しい文字";  // 文字を変更
```

**ドット記法の意味：**

`elem.textContent`は、「`elem`という要素の`textContent`プロパティ」という意味です。

これは日本語で言うと、「山田さんの年齢」「スマホのバッテリー残量」といった表現と同じです。

- `山田さん.年齢` → 山田さんの年齢
- `スマホ.バッテリー残量` → スマホのバッテリー残量
- `elem.textContent` → elemの文字内容

---

## textContentプロパティ

### textContentとは

`textContent`は、HTML要素の中に表示されているテキスト（文字）を表すプロパティです。

**イメージ：**

```html
<p id="text">Hello</p>
```

この`<p>`要素を本に例えると：
- 本そのもの = `<p>`要素
- 本の中に書かれている文字 = `textContent`プロパティ（"Hello"）

`textContent`プロパティを使うことで、以下の2つのことができます。

1. **読み取り**: 今表示されている文字を取得する（本の内容を読む）
2. **変更**: 表示されている文字を変更する（本の内容を書き換える）

**前回との違い：**
- 前回（Lesson 013）：要素を「見つける」方法を学んだ
- 今回（Lesson 014）：要素の中身を「変更する」方法を学ぶ

### textContentで文字を読み取る

まず、要素の中の文字を読み取ってみましょう。

HTMLファイルに以下の要素があるとします。

```html
<p id="text">Hello</p>
```

この要素の文字を取得するコードは以下のようになります。

```javascript
// 要素を取得
const elem = document.getElementById("text");

// textContentで文字を取得
console.log(elem.textContent);  // "Hello" と表示される
```

**動作の流れ：**

1. `document.getElementById("text")` で要素を取得
2. `elem.textContent` で、その要素の中の文字を読み取る
3. `console.log()` で、読み取った文字をコンソールに表示

**実行結果：**

コンソールに `Hello` と表示されます。

**ポイント：** `elem.textContent`は、要素の中の文字（"Hello"）を**文字列として**取得します。これを変数に保存したり、他の文字列と連結したりできます。

```javascript
const elem = document.getElementById("text");
const currentText = elem.textContent;  // "Hello"を変数に保存
console.log("現在の文字は: " + currentText);  // "現在の文字は: Hello"
```

### textContentで文字を変更する

次に、要素の中の文字を変更してみましょう。

```javascript
// 要素を取得
const elem = document.getElementById("text");

// textContentで文字を変更
elem.textContent = "変わった！";
```

このコードを実行すると、画面上の文字が"Hello"から"変わった！"に変わります。

**動作の流れ：**

1. **変更前の状態：**
   ```html
   <p id="text">Hello</p>
   ```
   画面には「Hello」と表示されている

2. **JavaScriptが実行される：**
   ```javascript
   elem.textContent = "変わった！";
   ```

3. **変更後の状態：**
   ```html
   <p id="text">変わった！</p>
   ```
   画面には「変わった！」と表示される

**重要なポイント：**

- ✨ **ブラウザの画面がリアルタイムで変わる**
- ファイルを保存してリロードする必要はない
- JavaScriptが実行された瞬間に、画面の表示が変わる
- HTMLファイル自体は書き換わらない（メモリ上のDOMだけが変わる）

**比較：**

| 従来の方法 | JavaScriptを使った方法 |
|---------|------------------|
| HTMLファイルを編集 | JavaScriptで動的に変更 |
| ファイルを保存 | 保存不要 |
| ブラウザをリロード | リロード不要 |
| 静的な変更 | 動的な変更（実行時に変わる） |

これが「動的なWebページ」の基本です！

---

## 実践：文字を変更してみよう

### 手順1：HTMLファイルを用意する

まず、HTML要素を用意します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 014</title>
</head>
<body>
    <p id="text">Hello</p>

    <script src="script.js"></script>
</body>
</html>
```

この段階では、画面には"Hello"と表示されています。

### 手順2：要素を取得する

JavaScriptファイル（`script.js`）で、要素を取得します。

```javascript
// id="text"の要素を取得
let elem = document.getElementById("text");
```

前回学んだ`getElementById()`を使って、id属性が"text"の要素を取得し、変数`elem`に保存します。

### 手順3：文字を変更する

取得した要素の`textContent`プロパティを変更します。

```javascript
// id="text"の要素を取得
let elem = document.getElementById("text");

// 文字を変更
elem.textContent = "変わった！";
```

このコードを実行すると、画面の"Hello"が"変わった！"に変わります。

### 手順4：何度も変更する

一度変更したら、また別の文字に変更することもできます。

```javascript
// id="text"の要素を取得
const elem = document.getElementById("text");

// 1回目の変更
elem.textContent = "変わった！";

// 2回目の変更
elem.textContent = "また変わった！";

// 3回目の変更
elem.textContent = "何度でも変わる";
```

**実行結果：**

画面には「何度でも変わる」だけが表示されます。

**なぜ最後の文字だけ表示されるのか？**

JavaScriptは上から順番に、非常に高速に実行されます。

1. 「変わった！」に変更される（一瞬）
2. すぐに「また変わった！」に上書きされる（一瞬）
3. すぐに「何度でも変わる」に上書きされる（これが最終的に表示される）

人間の目には、最後の「何度でも変わる」しか見えません。

**例えるなら：**

ホワイトボードに文字を書いては消し、書いては消しを繰り返しているようなものです。最後に書いた文字だけが残ります。

**重要：** 変更の途中経過を見たい場合は、後のレッスンで学ぶ「時間差をつける」方法（setTimeout）を使います。今回は、「最後の値が表示される」ということを理解しておきましょう。

---

## 文字変更の仕組み

### なぜ画面が変わるのか

JavaScriptがHTML要素の`textContent`を変更すると、ブラウザは自動的に画面を更新します。これは、ブラウザがDOMの変更を監視しているためです。

**詳しい流れ：**

1. **JavaScriptの実行**
   ```javascript
   elem.textContent = "新しい文字";
   ```
   JavaScriptが`textContent`プロパティに新しい値を代入

2. **DOMの更新**
   メモリ上のDOM（HTML構造）が変わる
   ```
   変更前: <p id="text">Hello</p>
   変更後: <p id="text">新しい文字</p>
   ```

3. **ブラウザの検知**
   ブラウザがDOMの変更を自動的に検知

4. **画面の再描画**
   ブラウザが画面を自動的に再描画（レンダリング）

5. **結果**
   新しい文字が画面に表示される

**図解：**

```
JavaScript          DOM             ブラウザ           画面
    |                |                 |                |
    |-- 変更指示 ---->|                 |                |
    |                |-- 更新通知 ----->|                |
    |                |                 |-- 再描画 ------>|
    |                |                 |                | 新しい文字が表示！
```

**重要：** このすべてが自動的に、一瞬で行われます。私たちプログラマーは、`elem.textContent = "新しい文字"`と書くだけで、残りはブラウザがやってくれます！

### リアルタイム性

重要なのは、この変更が**リアルタイム**で行われることです。

**従来の静的なWebページ：**
1. HTMLファイルを編集
2. ファイルを保存
3. ブラウザをリロード
4. 変更が反映される

**JavaScriptを使った動的なWebページ：**
1. JavaScriptのコードが実行される
2. **即座に**画面が変わる！

**リアルタイム変更の特徴：**

✅ ファイルを保存する必要はない
✅ ブラウザをリロードする必要もない
✅ JavaScriptが実行された瞬間に、画面が変わる
✅ ユーザーの操作に応じて、動的に内容を変更できる

**実例：**

- SNSで「いいね」を押すと、数字がすぐに増える
- 検索欄に文字を入力すると、候補がリアルタイムで表示される
- オンラインショッピングでカートに商品を追加すると、合計金額がすぐに更新される

これらすべてが、今回学んだ「プロパティの変更」の応用です！

これが、Webページを「動的」にする基本的な仕組みです。

---

## よくある間違いと注意点

### 間違い1：要素を取得せずに変更しようとする

```javascript
// これは動きません
textContent = "変わった！";
```

`textContent`は要素のプロパティなので、まず要素を取得してから、その要素の`textContent`を変更する必要があります。

正しくは以下のようになります。

```javascript
let elem = document.getElementById("text");
elem.textContent = "変わった！";
```

### 間違い2：idが間違っている

```javascript
// HTMLには id="text" があるのに、違うidで取得しようとする
let elem = document.getElementById("message");  // 間違い
elem.textContent = "変わった！";  // エラーになる
```

HTMLのid属性と、`getElementById()`で指定するidは完全に一致している必要があります。大文字小文字も区別されます。

### 間違い3：引用符を忘れる

```javascript
let elem = document.getElementById("text");
elem.textContent = 変わった！;  // 引用符がない（エラー）
```

文字列を代入する場合は、必ず引用符（`""`または`''`）で囲む必要があります。

正しくは以下のようになります。

```javascript
elem.textContent = "変わった！";
```

---

## 練習問題

### 課題：画面の文字を5回変更する

**目標：** `textContent`プロパティを使って、要素の文字を5回変更する操作に慣れる

HTMLファイルに表示されている文字を、JavaScriptで5回異なる文字に変更してください。

### 保存場所

`exercises/lesson-014/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

**期待される結果：** ブラウザで開いたとき、画面には5回目に設定した文字が表示されます。

### 手順

1. `index.html` に `<p id="message">最初の文字</p>` を追加します
2. `script.js` で要素を取得します
3. `textContent` を使って文字を5回変更します
4. ブラウザで開いて、最後の文字が表示されることを確認します

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-014
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**ヒント1：要素の取得**

まず`getElementById()`を使って要素を取得し、変数に保存します。id名は"message"です。

```javascript
let elem = document.getElementById("message");
```

**ヒント2：文字の変更**

`textContent`プロパティに新しい文字列を代入します。

```javascript
elem.textContent = "1回目の変更";
```

**ヒント3：5回変更する**

同じ変数`elem`に対して、5回`textContent`を変更します。最後に代入した値が画面に表示されます。

```javascript
elem.textContent = "1回目";
elem.textContent = "2回目";
elem.textContent = "3回目";
elem.textContent = "4回目";
elem.textContent = "5回目";  // これが表示される
```

**ヒント4：確認方法**

ブラウザで`index.html`を開いて、"5回目"の文字が表示されているか確認してください。

---

---

## 解答例

### 解答例の全体像

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 014</title>
</head>
<body>
    <p id="message">最初の文字</p>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
// 要素を取得
const elem = document.getElementById("message");

// 文字を5回変更
elem.textContent = "1回目の変更";
elem.textContent = "2回目の変更";
elem.textContent = "3回目の変更";
elem.textContent = "4回目の変更";
elem.textContent = "5回目の変更";
```

### 詳しい解説

**1行目：要素の取得**

```javascript
const elem = document.getElementById("message");
```

- `getElementById("message")` で、id属性が"message"の要素を取得
- 取得した要素を変数`elem`に保存
- `const`を使用（要素への参照は変更しないため）

**3〜7行目：文字の変更**

```javascript
elem.textContent = "1回目の変更";
elem.textContent = "2回目の変更";
elem.textContent = "3回目の変更";
elem.textContent = "4回目の変更";
elem.textContent = "5回目の変更";
```

各行で`elem.textContent`に新しい文字列を代入しています。

**実行の流れ：**

1. 3行目：「1回目の変更」に変わる（一瞬）
2. 4行目：「2回目の変更」に上書きされる（一瞬）
3. 5行目：「3回目の変更」に上書きされる（一瞬）
4. 6行目：「4回目の変更」に上書きされる（一瞬）
5. 7行目：「5回目の変更」に上書きされる（最終的にこれが表示される）

**なぜ最後の文字だけ表示されるのか？**

JavaScriptの実行速度は非常に速く、5回の変更が一瞬（ミリ秒以下）で完了します。人間の目には、最後の「5回目の変更」しか見えません。

**例え話：**

紙に文字を書いて、すぐに消しゴムで消し、また新しい文字を書く...これを5回繰り返します。最後に書いた文字だけが紙に残ります。JavaScriptも同じことをしていますが、その速度が信じられないほど速いのです。

**最終結果：**

画面には「5回目の変更」が表示されます。これは、最後に代入した値がDOMに反映されているためです。

**よくある質問：**

Q: 途中の変更も見えるようにできますか？
A: はい！後のレッスンで学ぶ`setTimeout()`を使えば、時間差をつけて変更を見せることができます。

Q: 同じ変数に何度も代入してもいいのですか？
A: はい！変数の値は何度でも上書きできます（`const`で宣言した変数自体は再代入できませんが、そのプロパティは変更できます）。

---

## まとめ

### 今回学んだこと

**キーポイント1：プロパティとは**

プロパティとは、オブジェクト（要素）が持っている特性や属性のことです。ドット（`.`）を使ってアクセスできます。

```javascript
elem.textContent  // elemの「textContent」プロパティ
```

例えば、`elem.textContent`は、要素`elem`の`textContent`プロパティにアクセスしています。これは「山田さんの年齢」「スマホのバッテリー残量」といった表現と同じ構造です。

**キーポイント2：textContentの役割**

`textContent`プロパティは、HTML要素の中に表示されているテキストを表します。

```javascript
// 読み取り
console.log(elem.textContent);  // 現在の文字を取得

// 変更
elem.textContent = "新しい文字";  // 文字を変更
```

このプロパティを読み取ることで現在の文字を取得でき、このプロパティに代入することで文字を変更できます。

**キーポイント3：動的な変更**

JavaScriptで`textContent`を変更すると、ブラウザがリアルタイムで画面を更新します。

- ✅ ファイルの保存は不要
- ✅ ブラウザのリロードも不要
- ✅ 即座に画面が変わる

これが、Webページを動的にする基本的な仕組みです。SNSの「いいね」ボタンや、オンラインショッピングのカートなど、現代のWebサイトはすべてこの仕組みを使っています。

**キーポイント4：変更の順序**

JavaScriptは上から順番に実行されます。同じプロパティに複数回代入すると、最後の値で上書きされます。

```javascript
elem.textContent = "1回目";  // 一瞬で次に進む
elem.textContent = "2回目";  // 一瞬で次に進む
elem.textContent = "3回目";  // これが最終的に表示される
```

そのため、5回変更した場合、最後の値だけが画面に表示されます。途中経過を見たい場合は、後のレッスンで学ぶ時間差のテクニックを使います。

---

### 今回の達成事項 ✅

- プロパティの概念を理解した
- `textContent`プロパティで文字を読み取れるようになった
- `textContent`プロパティで文字を変更できるようになった
- 動的なWebページの基本を理解した

### 次回予告

次回（Lesson 015）は、**複数の要素を操作する**方法を学びます！

- 3つ、4つの要素を同時に操作
- 時刻を表示する実用的なプログラム
- ページ全体を動的に変更

1つの要素を操作できるようになった今、次は複数の要素を使って、より実用的なWebページを作ります。楽しみにしていてください！

**復習のポイント：**

今回学んだ「要素の取得」→「プロパティの変更」という流れは、今後すべてのレッスンで使います。しっかり理解しておきましょう。

```javascript
// この2行のパターンが基本！
const elem = document.getElementById("id名");  // 取得
elem.textContent = "新しい文字";              // 変更
```

お疲れ様でした。

---
