---
title: "Lesson 022: DOM操作の復習"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 022: DOM操作の復習

---

## 今回の学習

### 前回の復習

前回は、変数と関数を組み合わせて**クリックカウンター**を作りました。

```javascript
let count = 0;  // グローバル変数で状態を保持

function addCount() {
  count++;  // クリックするたびに増える
  const elem = document.getElementById("counter");
  elem.textContent = count;  // 画面に表示
}
```

グローバル変数を使うことで、**ユーザーの操作に応じて値が変化するアプリケーション**を作れるようになりました。

### 今回の目標

今回は、これまで学んできた**DOM操作の基本をまとめて復習**します。

DOM操作は、これから作るすべてのアプリケーションの土台になる重要なスキルです。

**学習目標：**

1. **getElementByIdの使い方を確実にする** - 要素を取得する基本操作を完璧にします
2. **textContentの使い方を確実にする** - テキストの取得と変更を自在に使えるようにします
3. **styleの使い方を確実にする** - 見た目を変更する様々な方法を習得します
4. **DOM操作の基本パターンを理解する** - ほとんどの操作に共通するパターンを理解します

---

## これまで学んだこと

これまでのレッスンで、次のようなDOM操作を学びました。

**第2章：ブラウザを操作する**

- **レッスン13**：`document.getElementById()` で要素を取得する
- **レッスン14**：`textContent` で文字を変更する
- **レッスン15**：`style.color` で色を変更する
- **レッスン16**：`style.fontSize` でサイズを変更する
- **レッスン17**：`style.backgroundColor` で背景色を変更する
- **レッスン18**：`style.display` で表示・非表示を切り替える
- **レッスン19**：`onclick` でクリックに反応する
- **レッスン20**：関数を使ってコードを整理する
- **レッスン21**：変数を使って状態を保持する

これらは、**Webページに動きをつけるための基本的な操作**です。

### 身近な例：私たちが毎日使っているWebサイト

これらのDOM操作は、私たちが毎日使っているWebサイトで実際に使われています。

**Twitterの「いいね」ボタン**
```javascript
// ボタンをクリック
function toggleLike() {
  const button = document.getElementById("like-button");
  const count = document.getElementById("like-count");

  // ハートの色を変える（グレー ⇔ 赤）
  button.style.color = isLiked ? "gray" : "red";

  // いいね数を更新
  count.textContent = likeCount;
}
```

**Googleの検索結果の表示・非表示**
```javascript
function toggleDetails() {
  const details = document.getElementById("search-details");

  // 詳細情報の表示を切り替え
  details.style.display = isVisible ? "none" : "block";
}
```

**YouTubeの再生ボタン**
```javascript
function updatePlayButton() {
  const button = document.getElementById("play-button");

  // ボタンのテキストを変更（再生 ⇔ 一時停止）
  button.textContent = isPlaying ? "一時停止" : "再生";
}
```

### なぜ復習が重要なのか

これまで学んだ内容は、どれも**今後のレッスンで繰り返し使います**。

例えば：
- **カウンターを作るとき** → `getElementById`、`textContent`、`onclick`を使う
- **スライドショーを作るとき** → `getElementById`、`style`、`onclick`を使う
- **フォームを作るとき** → `getElementById`、`textContent`、`style`を使う
- **ゲームを作るとき** → これらすべてを組み合わせて使う

**基本をしっかり身につけることで、より複雑なアプリケーションを作れるようになります。**

例えるなら：
- **料理**で包丁の使い方を覚える → どんな料理でも作れるようになる
- **スポーツ**で基礎練習を繰り返す → 試合で活躍できるようになる
- **プログラミング**でDOM操作を身につける → どんなアプリでも作れるようになる

---

## DOM操作の基本パターン

DOM操作は、ほとんどの場合、**次のようなパターン**で行います。

```
1. 要素を取得する（どの要素を操作するか決める）
2. 要素のプロパティを変更する（何を変えるか決める）
```

この2つのステップが基本です。

### パターン全体の流れ

```javascript
// 1. 要素を取得する
const elem = document.getElementById("target");

// 2. 要素のプロパティを変更する
elem.textContent = "新しい文字";
elem.style.color = "red";
elem.style.fontSize = "20px";
```

**重要なポイント：**

- **必ず順番を守る**：まず要素を取得して、その後で変更する
- **変数に保存する**：取得した要素を変数に保存しておくと、何度でも使える
- **複数のプロパティを変更できる**：1つの要素に対して、複数のプロパティを変更できる

### なぜこのパターンなのか

**ステップ1：要素を取得する**

JavaScriptからHTMLの要素を操作するには、まず**その要素がどこにあるか**を教える必要があります。

```javascript
const elem = document.getElementById("target");
```

これは、「id="target" の要素を取得して、elem という変数に保存してください」という意味です。

**例えるなら：**
- **図書館で本を借りる** → まず本を見つける必要がある
- **リモコンでテレビを操作する** → まずリモコンを手に取る必要がある
- **JavaScriptで要素を操作する** → まず要素を取得する必要がある

**ステップ2：プロパティを変更する**

要素を取得したら、その要素の**プロパティ（属性）** を変更します。

```javascript
elem.textContent = "新しい文字";  // テキストを変更
elem.style.color = "red";         // 色を変更
```

これで、画面の表示が変わります。

**例えるなら：**
- **借りた本を読む** → 本を見つけた後、読むことができる
- **リモコンでチャンネルを変える** → リモコンを手に取った後、ボタンを押す
- **要素のプロパティを変更する** → 要素を取得した後、変更できる

---

## getElementById() の復習

### getElementById() とは

`getElementById()` は、**HTMLの要素をIDで取得する**メソッドです。

```javascript
document.getElementById("要素のID")
```

**各部分の意味：**

- `document` - HTML文書全体を表すオブジェクト
- `.` - ドット（「の」という意味）
- `getElementById` - IDで要素を取得するメソッド
- `("要素のID")` - 取得したい要素のID（ダブルクォーテーションで囲む）

**読み方：**

「ドキュメント・ドット・ゲットエレメントバイアイディー」

### 基本的な使い方

**HTML:**

```html
<p id="message">こんにちは</p>
```

**JavaScript:**

```javascript
const elem = document.getElementById("message");
```

**何が起こるのか：**

1. ブラウザがHTMLの中から `id="message"` の要素を探す
2. 見つかった要素（`<p id="message">こんにちは</p>`）を取得する
3. 取得した要素を `elem` という変数に保存する
4. これで `elem` を使って、その要素を操作できるようになる

**例えるなら：**

```
あなた：「message という名前の箱を取ってきて」
ブラウザ：「はい、見つけました！」（箱を持ってくる）
あなた：「ありがとう、elem という名前を付けておこう」
```

### 複数の要素を取得する

複数の要素を取得することもできます。

**HTML:**

```html
<p id="title">タイトル</p>
<p id="content">内容</p>
<p id="footer">フッター</p>
```

**JavaScript:**

```javascript
const title = document.getElementById("title");
const content = document.getElementById("content");
const footer = document.getElementById("footer");
```

それぞれの要素を別々の変数に保存できます。

**何が起こるのか：**

```
1行目：id="title" の要素を探して、title 変数に保存
2行目：id="content" の要素を探して、content 変数に保存
3行目：id="footer" の要素を探して、footer 変数に保存
```

### getElementById() の注意点

**注意点1：IDは1つのページ内で重複してはいけない**

IDは、HTML文書内で**必ず1つだけ**でなければいけません。

```html
<!-- ❌ 間違い：同じIDが2つある -->
<p id="text">テキスト1</p>
<p id="text">テキスト2</p>
```

```html
<!-- ✅ 正しい：IDはそれぞれ違う -->
<p id="text1">テキスト1</p>
<p id="text2">テキスト2</p>
```

**なぜダメなのか：**

同じIDが複数あると、`getElementById()` はどの要素を取得すればいいか分からなくなります。

**例えるなら：**
- クラスに「田中さん」が2人いると、「田中さん」と呼んでもどちらか分からない
- IDが重複すると、ブラウザがどの要素か判断できない

**注意点2：IDが存在しない場合、nullが返される**

```javascript
const elem = document.getElementById("nothing");  // 存在しないID
console.log(elem);  // null
```

存在しないIDを指定すると、`null`（何もない）が返されます。

**これが問題になる例：**

```javascript
const elem = document.getElementById("nothing");  // null
elem.textContent = "テキスト";  // エラー！（nullに対して操作できない）
```

**エラーメッセージ：**

```
Uncaught TypeError: Cannot set property 'textContent' of null
```

**デバッグ方法：**

```javascript
const elem = document.getElementById("message");
console.log(elem);  // 何が入っているか確認する

// elemがnullかどうか確認してから操作する
if (elem !== null) {
  elem.textContent = "テキスト";
} else {
  console.log("要素が見つかりませんでした");
}
```

**注意点3：IDは大文字と小文字を区別する**

JavaScriptは、大文字と小文字を**厳密に区別**します。

```html
<p id="Message">テキスト</p>
```

```javascript
const elem1 = document.getElementById("Message");  // ✅ 見つかる
const elem2 = document.getElementById("message");  // ❌ 見つからない（mが小文字）
const elem3 = document.getElementById("MESSAGE");  // ❌ 見つからない（すべて大文字）
```

**注意点4：HTMLとJavaScriptでIDを一致させる**

スペルミスに注意しましょう。

```html
<!-- HTML -->
<p id="greeting">こんにちは</p>
```

```javascript
// JavaScript
const elem = document.getElementById("greeting");  // ✅ 一致
const elem = document.getElementById("greating");  // ❌ スペルミス（iとaが逆）
const elem = document.getElementById("greting");   // ❌ スペルミス（eが1つ足りない）
```

**よくあるスペルミス：**

| 正しいスペル | よくある間違い |
|------------|--------------|
| button | buttn, botton |
| message | mesage, messege |
| counter | conter, countre |
| description | discription |

**ヒント：** コピー＆ペーストを活用すれば、スペルミスを防げます。

---

## textContent の復習

### textContent とは

`textContent` は、要素の中の**テキストを取得したり、変更したり**できるプロパティです。

```javascript
elem.textContent = "新しいテキスト";
```

**プロパティとは：**

オブジェクトが持っている**属性や情報**のことです。

- `textContent` - 要素の中のテキスト
- `style.color` - 要素の色
- `style.fontSize` - 要素のフォントサイズ

### テキストを取得する

要素の中のテキストを読み取ることができます。

**HTML:**

```html
<p id="message">こんにちは</p>
```

**JavaScript:**

```javascript
const elem = document.getElementById("message");
const text = elem.textContent;
console.log(text);  // "こんにちは" と表示される
```

**何が起こるのか：**

```
1行目：id="message" の要素を取得して、elem に保存
2行目：elem.textContent で要素のテキスト（"こんにちは"）を取得
3行目：取得したテキストをコンソールに表示
```

**ステップごとの状態：**

```
実行前：
elem = <p id="message">こんにちは</p>

1行目実行後：
elem = <p id="message">こんにちは</p>

2行目実行後：
text = "こんにちは"

3行目実行後：
コンソール → "こんにちは"
```

### テキストを変更する

要素の中のテキストを変更することができます。

**HTML（最初）:**

```html
<p id="message">こんにちは</p>
```

**JavaScript:**

```javascript
const elem = document.getElementById("message");
elem.textContent = "さようなら";
```

**HTML（実行後）:**

```html
<p id="message">さようなら</p>
```

画面に表示されている文字が「こんにちは」から「さようなら」に変わります。

**何が起こるのか（ステップバイステップ）：**

```
【実行前の画面】
こんにちは

【1行目実行】
const elem = document.getElementById("message");
→ <p>要素を取得して、elem に保存

【2行目実行】
elem.textContent = "さようなら";
→ elem の中のテキストを "さようなら" に変更

【実行後の画面】
さようなら
```

### 空にする

テキストを空にすることもできます。

```javascript
elem.textContent = "";  // 空文字列を代入
```

これで、要素の中のテキストがすべて消えます。

**使用例：**

```javascript
function clearMessage() {
  const elem = document.getElementById("message");
  elem.textContent = "";  // メッセージを消す
}
```

### 数値を表示する

変数の値を表示することもできます。

```javascript
let count = 5;
const elem = document.getElementById("counter");
elem.textContent = count;  // "5" と表示される
```

数値は自動的に文字列に変換されて表示されます。

**内部で何が起こっているのか：**

```
count = 5（数値型）
↓
elem.textContent = 5
↓
自動的に "5"（文字列型）に変換される
↓
画面に "5" と表示される
```

**計算結果を表示する：**

```javascript
let a = 10;
let b = 20;
const elem = document.getElementById("result");
elem.textContent = a + b;  // "30" と表示される
```

### textContent の注意点

**注意点1：HTMLタグは解釈されない**

`textContent` にHTMLタグを代入しても、タグとして解釈されません。

```javascript
elem.textContent = "<strong>太字</strong>";
```

**表示結果：**

```
<strong>太字</strong>
```

（太字にはならず、タグがそのまま表示される）

**なぜこうなるのか：**

`textContent` は「純粋なテキスト」として扱うため、HTMLタグも普通の文字として表示します。

**もしHTMLタグを解釈させたい場合：**

```javascript
// innerHTML を使う（セキュリティリスクがあるため注意）
elem.innerHTML = "<strong>太字</strong>";
```

**注意点2：すべてのテキストが置き換えられる**

```html
<p id="message">こんにちは<span>世界</span></p>
```

```javascript
elem.textContent = "さようなら";
```

**実行後：**

```html
<p id="message">さようなら</p>
```

「こんにちは世界」がすべて「さようなら」に置き換わり、`<span>`タグも消えます。

**何が起こったのか：**

```
実行前：
<p id="message">
  こんにちは
  <span>世界</span>
</p>

実行後：
<p id="message">さようなら</p>

→ すべての内容が削除され、新しいテキストだけが入る
```

---

## style の復習

### style プロパティとは

`style` プロパティを使うと、要素の**見た目（スタイル）** を変更できます。

```javascript
elem.style.プロパティ名 = "値";
```

**例：**

```javascript
elem.style.color = "blue";           // 文字の色を青にする
elem.style.backgroundColor = "yellow";  // 背景を黄色にする
elem.style.fontSize = "20px";        // フォントサイズを20pxにする
```

### 文字の色を変える

```javascript
elem.style.color = "blue";
```

**色の指定方法：**

```javascript
// 方法1：色名で指定
elem.style.color = "red";       // 赤
elem.style.color = "blue";      // 青
elem.style.color = "green";     // 緑

// 方法2：16進数カラーコードで指定
elem.style.color = "#ff0000";   // 赤
elem.style.color = "#0000ff";   // 青
elem.style.color = "#00ff00";   // 緑

// 方法3：RGBで指定
elem.style.color = "rgb(255, 0, 0)";    // 赤
elem.style.color = "rgb(0, 0, 255)";    // 青
elem.style.color = "rgb(0, 255, 0)";    // 緑
```

**よく使う色名：**

| 色名 | 表示 |
|-----|------|
| red | 赤 |
| blue | 青 |
| green | 緑 |
| yellow | 黄色 |
| orange | オレンジ |
| purple | 紫 |
| black | 黒 |
| white | 白 |
| gray | グレー |

### 背景色を変える

```javascript
elem.style.backgroundColor = "yellow";
```

**注意：** CSSでは `background-color` ですが、JavaScriptでは `backgroundColor` と書きます。

**なぜ違うのか：**

JavaScriptでは、ハイフン（`-`）を変数名に使えません。そのため、**キャメルケース**という書き方に変換します。

**変換ルール：**

1. ハイフン（`-`）を削除する
2. ハイフンの後の文字を大文字にする

**例：**

```
background-color → backgroundColor
font-size → fontSize
border-width → borderWidth
```

### フォントサイズを変える

```javascript
elem.style.fontSize = "24px";
```

**重要：** 単位（`px`、`em`、`%`など）を忘れずに付けます。

```javascript
elem.style.fontSize = "24px";   // ✅ 正しい
elem.style.fontSize = 24;       // ❌ 単位がない（動作しない）
```

**よく使う単位：**

```javascript
elem.style.fontSize = "24px";    // ピクセル（固定サイズ）
elem.style.fontSize = "1.5em";   // 親要素の1.5倍
elem.style.fontSize = "150%";    // 親要素の150%
```

### 幅と高さを変える

```javascript
elem.style.width = "300px";
elem.style.height = "100px";
```

**実用例：**

```javascript
function resizeBox() {
  const box = document.getElementById("box");
  box.style.width = "500px";
  box.style.height = "200px";
  box.style.backgroundColor = "lightblue";
}
```

### 表示・非表示を切り替える

```javascript
elem.style.display = "none";   // 非表示にする
elem.style.display = "block";  // 表示する
```

**各値の意味：**

- `"none"` - 要素を非表示にする（**場所も取らない**）
- `"block"` - 要素を表示する（ブロック要素として）
- `"inline"` - 要素を表示する（インライン要素として）

**"none"と"block"の違い：**

```html
<p>段落1</p>
<p id="target">段落2</p>
<p>段落3</p>
```

```javascript
// display: "none" にすると
elem.style.display = "none";
```

**表示結果：**

```
段落1
段落3
```

段落2が消え、段落3が上に詰まります（場所を取らない）。

### 複数のスタイルを変更する

1つの要素に対して、複数のスタイルを変更できます。

```javascript
const elem = document.getElementById("text");
elem.style.color = "white";
elem.style.backgroundColor = "black";
elem.style.fontSize = "20px";
elem.style.padding = "10px";
```

**何が起こるのか：**

```
1行目：id="text" の要素を取得
2行目：文字の色を白にする
3行目：背景色を黒にする
4行目：フォントサイズを20pxにする
5行目：内側の余白を10pxにする
```

**実行結果（イメージ）：**

```
┌─────────────────────┐
│  白い文字（20px）    │  ← 黒い背景
│  周りに10pxの余白    │
└─────────────────────┘
```

### CSSプロパティ名の変換規則

CSSのプロパティ名は、JavaScriptでは**キャメルケース**に変換します。

**変換ルール：**

1. ハイフン（`-`）を削除する
2. ハイフンの後の文字を大文字にする

**よく使うプロパティの変換表：**

| CSS | JavaScript | 例 |
|-----|-----------|-----|
| `color` | `color` | `elem.style.color = "red"` |
| `background-color` | `backgroundColor` | `elem.style.backgroundColor = "yellow"` |
| `font-size` | `fontSize` | `elem.style.fontSize = "20px"` |
| `font-weight` | `fontWeight` | `elem.style.fontWeight = "bold"` |
| `border-width` | `borderWidth` | `elem.style.borderWidth = "2px"` |
| `border-color` | `borderColor` | `elem.style.borderColor = "black"` |
| `margin-top` | `marginTop` | `elem.style.marginTop = "10px"` |
| `padding-left` | `paddingLeft` | `elem.style.paddingLeft = "20px"` |
| `text-align` | `textAlign` | `elem.style.textAlign = "center"` |

**覚え方：**

- **CSS**：単語をハイフンでつなぐ（`background-color`）
- **JavaScript**：単語の先頭を大文字にする（`backgroundColor`）

**練習：次のCSSプロパティをJavaScriptに変換してみましょう**

```
border-radius → ?
line-height → ?
text-decoration → ?
```

<details>
<summary>答えを見る</summary>

```
border-radius → borderRadius
line-height → lineHeight
text-decoration → textDecoration
```

</details>

---

## DOM操作の実践例

これまで学んだことを組み合わせて、実用的な例を見てみましょう。

### 例1：ボタンで文字を変更する

**HTML:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 022</title>
</head>
<body>
    <p id="message">最初の文字</p>
    <button onclick="changeText()">変更</button>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript (script.js):**

```javascript
function changeText() {
  const elem = document.getElementById("message");
  elem.textContent = "変更後の文字";
}
```

**動作の流れ：**

```
1. ユーザーがボタンをクリック
   ↓
2. onclick="changeText()" が実行される
   ↓
3. changeText() 関数が呼ばれる
   ↓
4. getElementById("message") で要素を取得
   ↓
5. textContent = "変更後の文字" でテキストを変更
   ↓
6. 画面の表示が「最初の文字」→「変更後の文字」に変わる
```

### 例2：ボタンで色を変更する

**HTML:**

```html
<p id="text">カラフルな文字</p>
<button onclick="changeColor()">色を変える</button>
```

**JavaScript (script.js):**

```javascript
function changeColor() {
  const elem = document.getElementById("text");
  elem.style.color = "red";
  elem.style.backgroundColor = "yellow";
}
```

**動作の流れ：**

```
クリック前：
カラフルな文字（黒文字、背景なし）

クリック後：
カラフルな文字（赤文字、黄色背景）
```

**ステップバイステップ：**

```
1. ボタンをクリック
2. changeColor() 関数が実行される
3. id="text" の要素を取得
4. color を "red" に変更 → 文字が赤くなる
5. backgroundColor を "yellow" に変更 → 背景が黄色になる
```

### 例3：複数の要素を操作する

**HTML:**

```html
<p id="title">タイトル</p>
<p id="content">内容</p>
<button onclick="changeAll()">すべて変更</button>
```

**JavaScript (script.js):**

```javascript
function changeAll() {
  const title = document.getElementById("title");
  const content = document.getElementById("content");

  title.textContent = "新しいタイトル";
  title.style.color = "blue";
  title.style.fontSize = "24px";

  content.textContent = "新しい内容";
  content.style.backgroundColor = "lightgray";
  content.style.padding = "10px";
}
```

**動作の流れ：**

```
【クリック前】
タイトル（普通の文字）
内容（普通の文字）

【クリック後】
新しいタイトル（青色、24px）
新しい内容（グレー背景、余白あり）
```

**何が起こっているのか：**

```
1. title と content の2つの要素を取得
2. title に3つの変更を適用：
   - テキストを変更
   - 色を青に変更
   - サイズを24pxに変更
3. content に3つの変更を適用：
   - テキストを変更
   - 背景色をグレーに変更
   - 内側の余白を10pxに設定
```

**重要なポイント：**

1つのボタンで複数の要素を同時に変更できる！

### 例4：表示・非表示を切り替える

**HTML:**

```html
<p id="secret">秘密のメッセージ</p>
<button onclick="toggleDisplay()">表示/非表示</button>
```

**JavaScript (script.js):**

```javascript
let isVisible = true;

function toggleDisplay() {
  const elem = document.getElementById("secret");

  if (isVisible) {
    elem.style.display = "none";  // 非表示にする
    isVisible = false;
  } else {
    elem.style.display = "block";  // 表示する
    isVisible = true;
  }
}
```

**動作の流れ：**

```
【1回目のクリック】
isVisible = true なので、if の中が実行される
→ display = "none"（非表示）
→ isVisible = false に変更

【2回目のクリック】
isVisible = false なので、else の中が実行される
→ display = "block"（表示）
→ isVisible = true に変更

【3回目のクリック】
また1回目と同じ動作（繰り返し）
```

**画面の変化：**

```
最初：秘密のメッセージ [ボタン]
↓（1回目のクリック）
       [ボタン]
↓（2回目のクリック）
秘密のメッセージ [ボタン]
↓（繰り返し）
```

**このテクニックの応用例：**

- アコーディオンメニュー（クリックで詳細を開閉）
- モーダルウィンドウ（ポップアップの表示・非表示）
- ハンバーガーメニュー（スマホサイトのメニュー開閉）

---

## よくある間違いと解決方法

### 間違い1：IDのスペルミス

**HTML:**

```html
<p id="message">テキスト</p>
```

**JavaScript:**

```javascript
const elem = document.getElementById("mesage");  // ❌ "s" が1つ足りない
```

**何が起こるのか：**

```javascript
console.log(elem);  // null
elem.textContent = "新しいテキスト";  // エラー！
```

**エラーメッセージ：**

```
Uncaught TypeError: Cannot set property 'textContent' of null
```

**解決方法：**

1. **コピー＆ペーストを活用する**
   ```javascript
   // HTMLからIDをコピーして貼り付ける
   const elem = document.getElementById("message");  // ✅ 正確
   ```

2. **console.logで確認する**
   ```javascript
   const elem = document.getElementById("message");
   console.log(elem);  // null なら ID が間違っている
   ```

3. **開発者ツールで要素を確認する**
   - ブラウザでF12キーを押す
   - Elements タブで要素のIDを確認する

### 間違い2：getElementByIdの書き方が間違っている

```javascript
// よくある間違い
const elem = document.getElementByID("message");  // ❌ "ID" が大文字
const elem = document.getelementbyid("message");  // ❌ すべて小文字
const elem = document.GetElementById("message");  // ❌ 最初が大文字
const elem = document.getElementById ("message"); // ❌ スペースが入っている
```

**正しい書き方：**

```javascript
const elem = document.getElementById("message");  // ✅ "Id" だけ大文字
```

**覚え方：**

```
get Element By Id
↑   ↑      ↑  ↑
小   大     大  大（最後のdは小文字）
```

### 間違い3：styleプロパティにハイフンを使う

```javascript
elem.style.background-color = "yellow";  // ❌ ハイフンがある
```

**エラーメッセージ：**

```
Uncaught SyntaxError: Unexpected token '-'
```

**正しい書き方：**

```javascript
elem.style.backgroundColor = "yellow";  // ✅ キャメルケース
```

**よくある間違い：**

| 間違い | 正しい |
|--------|--------|
| `style.font-size` | `style.fontSize` |
| `style.background-color` | `style.backgroundColor` |
| `style.border-width` | `style.borderWidth` |
| `style.margin-top` | `style.marginTop` |

### 間違い4：単位を付け忘れる

```javascript
elem.style.fontSize = 24;  // ❌ 単位がない
```

**何が起こるのか：**

フォントサイズが変わらない（エラーは出ないが、動作しない）

**正しい書き方：**

```javascript
elem.style.fontSize = "24px";  // ✅ 単位を付ける
```

**単位が必要なプロパティ：**

```javascript
// サイズ関連（必ず単位が必要）
elem.style.fontSize = "20px";      // ✅
elem.style.width = "300px";        // ✅
elem.style.height = "100px";       // ✅
elem.style.padding = "10px";       // ✅
elem.style.margin = "20px";        // ✅

// 色関連（単位は不要）
elem.style.color = "red";          // ✅
elem.style.backgroundColor = "blue";  // ✅
```

### 間違い5：要素を取得する前に操作しようとする

```javascript
elem.textContent = "テキスト";  // ❌ elemが定義されていない
const elem = document.getElementById("message");
```

**エラーメッセージ：**

```
Uncaught ReferenceError: elem is not defined
```

**正しい書き方：**

```javascript
const elem = document.getElementById("message");  // 先に取得
elem.textContent = "テキスト";  // その後で操作
```

**順番が重要な理由：**

```
1. まず変数を定義する
2. その変数を使って操作する

これが逆だと、まだ存在しない変数を使おうとしてエラーになる
```

### 間違い6：ダブルクォーテーションを忘れる

```javascript
const elem = document.getElementById(message);  // ❌ クォーテーションがない
```

**何が起こるのか：**

```
Uncaught ReferenceError: message is not defined
```

JavaScriptは `message` を変数名だと解釈してしまいます。

**正しい書き方：**

```javascript
const elem = document.getElementById("message");  // ✅ クォーテーションで囲む
```

### 間違い7：関数名のスペルミス

```html
<button onclick="changeText()">変更</button>
```

```javascript
function changeTxt() {  // ❌ 関数名が違う（changeText ではない）
  const elem = document.getElementById("message");
  elem.textContent = "新しいテキスト";
}
```

**何が起こるのか：**

ボタンをクリックしてもエラーになります。

**エラーメッセージ：**

```
Uncaught ReferenceError: changeText is not defined
```

**解決方法：**

HTMLとJavaScriptで関数名を一致させる。

```html
<button onclick="changeText()">変更</button>
```

```javascript
function changeText() {  // ✅ 一致
  const elem = document.getElementById("message");
  elem.textContent = "新しいテキスト";
}
```

---

## 練習問題

### 課題：複数の要素を操作する

次の要件を満たすページを作成してください。

### 保存場所

`exercises/lesson-022/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

### 要件

**HTML (index.html):**

1. `id="title"` の要素を用意し、「DOM操作の練習」というテキストを表示する
2. `id="description"` の要素を用意し、「説明文」というテキストを表示する
3. `id="status"` の要素を用意し、「待機中」というテキストを表示する
4. 3つのボタンを作成する：
   - 「タイトル更新」ボタン → `updateTitle()` 関数を呼び出す
   - 「説明更新」ボタン → `updateDescription()` 関数を呼び出す
   - 「ステータス更新」ボタン → `updateStatus()` 関数を呼び出す

**JavaScript (script.js):**

1. `updateTitle` 関数を定義し、次の処理を行う：
   - `id="title"` の要素の `textContent` を任意のテキストに変更する
   - 色を青にする
   - フォントサイズを24pxにする

2. `updateDescription` 関数を定義し、次の処理を行う：
   - `id="description"` の要素の `textContent` を任意のテキストに変更する
   - 背景色を黄色にする

3. `updateStatus` 関数を定義し、次の処理を行う：
   - `id="status"` の要素の `textContent` を「実行中」に変更する
   - 色を緑にする

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-022
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**ヒント1：基本パターンを使う**

すべての関数は、同じパターンで作れます。

```javascript
function 関数名() {
  // 1. 要素を取得
  const elem = document.getElementById("要素のID");

  // 2. プロパティを変更
  elem.textContent = "新しいテキスト";
  elem.style.color = "色";
}
```

**ヒント2：updateTitle 関数の例**

```javascript
function updateTitle() {
  // 1. 要素を取得
  const elem = document.getElementById("title");

  // 2. プロパティを変更
  elem.textContent = "新しいタイトル";
  elem.style.color = "blue";
  elem.style.fontSize = "24px";
}
```

**ヒント3：色の指定**

```javascript
elem.style.color = "blue";              // 青
elem.style.backgroundColor = "yellow";  // 黄色（背景）
elem.style.color = "green";             // 緑
```

**ヒント4：フォントサイズの指定**

```javascript
elem.style.fontSize = "24px";  // 単位（px）を忘れずに
```

**ヒント5：HTMLの書き方**

```html
<!-- 要素の例 -->
<p id="title">DOM操作の練習</p>

<!-- ボタンの例 -->
<button onclick="updateTitle()">タイトル更新</button>
```

**ヒント6：動作確認の方法**

1. ブラウザで `index.html` を開く
2. 各ボタンをクリック
3. テキストやスタイルが変わることを確認
4. `npm test exercises/lesson-022` でテストを実行

**ヒント7：よくある間違いをチェック**

- [ ] IDのスペルミスはないか
- [ ] getElementByIdの書き方は正しいか（"Id"だけ大文字）
- [ ] styleプロパティはキャメルケースになっているか
- [ ] 単位（px）を付けているか
- [ ] HTMLとJavaScriptの関数名は一致しているか

---

## 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 022</title>
</head>
<body>
    <h1>DOM操作の復習</h1>

    <p id="title">DOM操作の練習</p>
    <p id="description">説明文</p>
    <p id="status">待機中</p>

    <button onclick="updateTitle()">タイトル更新</button>
    <button onclick="updateDescription()">説明更新</button>
    <button onclick="updateStatus()">ステータス更新</button>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
function updateTitle() {
  const elem = document.getElementById("title");
  elem.textContent = "更新されたタイトル";
  elem.style.color = "blue";
  elem.style.fontSize = "24px";
}

function updateDescription() {
  const elem = document.getElementById("description");
  elem.textContent = "更新された説明文";
  elem.style.backgroundColor = "yellow";
}

function updateStatus() {
  const elem = document.getElementById("status");
  elem.textContent = "実行中";
  elem.style.color = "green";
}
```

### 解説

**HTML (index.html):**

**1〜7行目：HTML文書の基本構造**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 022</title>
</head>
```

すべてのHTML文書に必要な基本的な構造です。

**10行目：タイトル要素**

```html
<h1>DOM操作の復習</h1>
```

ページの見出しです（JavaScriptでは操作しません）。

**12〜14行目：3つの要素**

```html
<p id="title">DOM操作の練習</p>
<p id="description">説明文</p>
<p id="status">待機中</p>
```

それぞれにユニークなIDを設定し、初期テキストを表示しています。

| ID | 初期テキスト |
|----|------------|
| title | DOM操作の練習 |
| description | 説明文 |
| status | 待機中 |

**16〜18行目：3つのボタン**

```html
<button onclick="updateTitle()">タイトル更新</button>
<button onclick="updateDescription()">説明更新</button>
<button onclick="updateStatus()">ステータス更新</button>
```

各ボタンが対応する関数を呼び出します。

| ボタン | 呼び出す関数 |
|--------|------------|
| タイトル更新 | updateTitle() |
| 説明更新 | updateDescription() |
| ステータス更新 | updateStatus() |

**20行目：JavaScriptファイルの読み込み**

```html
<script src="script.js"></script>
```

外部JavaScriptファイルを読み込みます。

**JavaScript (script.js):**

**1〜6行目：updateTitle 関数**

```javascript
function updateTitle() {
  const elem = document.getElementById("title");
  elem.textContent = "更新されたタイトル";
  elem.style.color = "blue";
  elem.style.fontSize = "24px";
}
```

**ステップバイステップ：**

```
1行目：updateTitle 関数を定義
2行目：id="title" の要素を取得して、elem に保存
3行目：elem のテキストを「更新されたタイトル」に変更
4行目：elem の色を青に変更
5行目：elem のフォントサイズを24pxに変更
6行目：関数の終わり
```

**動作の流れ：**

```
【クリック前】
DOM操作の練習（普通の文字）

【「タイトル更新」ボタンをクリック】
↓
updateTitle() 関数が実行される
↓
【クリック後】
更新されたタイトル（青色、24px）
```

**8〜12行目：updateDescription 関数**

```javascript
function updateDescription() {
  const elem = document.getElementById("description");
  elem.textContent = "更新された説明文";
  elem.style.backgroundColor = "yellow";
}
```

**ステップバイステップ：**

```
8行目：updateDescription 関数を定義
9行目：id="description" の要素を取得
10行目：テキストを「更新された説明文」に変更
11行目：背景色を黄色に変更
12行目：関数の終わり
```

**14〜18行目：updateStatus 関数**

```javascript
function updateStatus() {
  const elem = document.getElementById("status");
  elem.textContent = "実行中";
  elem.style.color = "green";
}
```

**ステップバイステップ：**

```
14行目：updateStatus 関数を定義
15行目：id="status" の要素を取得
16行目：テキストを「実行中」に変更
17行目：色を緑に変更
18行目：関数の終わり
```

### 全体の動作の流れ

```
【初期状態】
DOM操作の練習（普通の文字）
説明文（普通の文字）
待機中（普通の文字）
[タイトル更新] [説明更新] [ステータス更新]

【「タイトル更新」をクリック】
更新されたタイトル（青色、24px）
説明文（普通の文字）
待機中（普通の文字）
[タイトル更新] [説明更新] [ステータス更新]

【「説明更新」をクリック】
更新されたタイトル（青色、24px）
更新された説明文（黄色背景）
待機中（普通の文字）
[タイトル更新] [説明更新] [ステータス更新]

【「ステータス更新」をクリック】
更新されたタイトル（青色、24px）
更新された説明文（黄色背景）
実行中（緑色）
[タイトル更新] [説明更新] [ステータス更新]
```

### 重要なポイント

**1. 基本パターンの繰り返し**

すべての関数が同じパターンで作られています。

```javascript
function 関数名() {
  const elem = document.getElementById("ID");  // 1. 取得
  elem.textContent = "テキスト";               // 2. 変更
  elem.style.プロパティ = "値";               // 3. スタイル変更
}
```

**2. 複数のプロパティを変更**

1つの要素に対して、複数のプロパティを変更できます。

```javascript
elem.textContent = "新しいテキスト";  // テキスト
elem.style.color = "blue";            // 色
elem.style.fontSize = "24px";         // サイズ
```

**3. 関数の独立性**

各関数は独立して動作します。

```
updateTitle() → id="title" だけを変更
updateDescription() → id="description" だけを変更
updateStatus() → id="status" だけを変更
```

**4. DOM操作の基本が身についた**

この練習問題を通じて、DOM操作の基本パターンが身につきました。

```
✅ 要素を取得できる（getElementById）
✅ テキストを変更できる（textContent）
✅ 色を変更できる（style.color）
✅ サイズを変更できる（style.fontSize）
✅ 背景色を変更できる（style.backgroundColor）
```

---

## まとめ

### 今回学んだこと

**1. DOM操作の基本パターン**

ほとんどのDOM操作は、次の2ステップで行います。

```javascript
// 1. 要素を取得
const elem = document.getElementById("要素のID");

// 2. プロパティを変更
elem.textContent = "新しいテキスト";
elem.style.color = "red";
```

このパターンを覚えれば、どんなDOM操作でもできるようになります。

**2. getElementById() の使い方**

```javascript
document.getElementById("要素のID")
```

**覚えておくこと：**

- HTMLの要素をIDで取得する
- IDは大文字・小文字を区別する
- IDは1ページ内で重複してはいけない
- 存在しないIDを指定すると `null` が返される

**3. textContent の使い方**

```javascript
elem.textContent = "新しいテキスト";  // テキストを変更
const text = elem.textContent;        // テキストを取得
```

**覚えておくこと：**

- 要素の中のテキストを取得・変更できる
- HTMLタグは解釈されない（そのまま表示される）
- すべての内容が置き換えられる

**4. style の使い方**

```javascript
elem.style.color = "blue";              // 文字色
elem.style.backgroundColor = "yellow";  // 背景色
elem.style.fontSize = "24px";           // フォントサイズ
elem.style.display = "none";            // 非表示
```

**覚えておくこと：**

- 要素の見た目を変更できる
- CSSのプロパティ名をキャメルケースに変換する（`background-color` → `backgroundColor`）
- 単位（px、em、%など）を忘れずに付ける

**5. 複数の要素・プロパティを操作**

- 1つの関数で複数の要素を操作できる
- 1つの要素に対して複数のプロパティを変更できる

```javascript
function changeAll() {
  const elem1 = document.getElementById("first");
  const elem2 = document.getElementById("second");

  elem1.textContent = "新しいテキスト";
  elem1.style.color = "red";
  elem1.style.fontSize = "20px";

  elem2.textContent = "別のテキスト";
  elem2.style.backgroundColor = "yellow";
}
```

### できるようになったこと

✅ `getElementById` を確実に使えるようになった

✅ `textContent` でテキストを自在に操作できるようになった

✅ `style` で見た目を様々に変更できるようになった

✅ DOM操作の基本パターンを理解できた

✅ 複数の要素を組み合わせて操作できるようになった

✅ よくある間違いとその解決方法が分かるようになった

### 次回の学習

次回は、**イベントの復習**を行います。

- `onclick` 属性の使い方
- 関数呼び出しのパターン
- 複数のイベントの扱い方

イベント駆動プログラミングの基礎を固めて、よりインタラクティブなアプリケーションを作れるようになります。

### 復習のポイント

**毎日少しずつ練習しましょう：**

1. **基本パターンを繰り返し書く**
   ```javascript
   const elem = document.getElementById("要素のID");
   elem.textContent = "新しいテキスト";
   elem.style.color = "red";
   ```

2. **よくある間違いを確認する**
   - IDのスペルミス
   - getElementByIdの書き方
   - styleプロパティのハイフン
   - 単位の付け忘れ

3. **実際に手を動かす**
   - 練習問題を何度も解く
   - 自分でアレンジを加えてみる
   - エラーが出たら、エラーメッセージを読む

**練習は裏切りません。**

何度も繰り返すことで、自然と身につきます。

お疲れ様でした！
