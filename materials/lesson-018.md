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
2. 要素を非表示にできるようになる（`display = "none"`）
3. 非表示の要素を再表示できるようになる（`display = "block"`）
4. 要素を消したり現したりする動的な操作ができるようになる

**前回までの振り返り：**
- Lesson 016：要素の「色」を変える方法を学んだ
- Lesson 017：要素の「サイズ」を変える方法を学んだ
- Lesson 018：要素の「表示/非表示」を切り替える方法を学ぶ ← **今回！**

---

## displayプロパティとは

### displayプロパティの役割

`display`プロパティは、要素の表示状態を制御するプロパティです。要素を画面に表示するか、非表示にするかを決めることができます。

**身近な例で理解する：**

舞台のマジックショーをイメージしてください。

- マジシャンが箱の中に物を入れる
- 布をかぶせる → 物が見えなくなる（`display = "none"`）
- 布を取る → 物が再び現れる（`display = "block"`）

JavaScriptでも、これと同じように要素を消したり現したりできます！

**これまで学んだプロパティとの違い：**

| プロパティ | 変更できること | 例 |
|----------|--------------|---|
| `textContent` | 要素の**内容** | "Hello" → "こんにちは" |
| `style.color` | 要素の**文字色** | 黒 → 赤 |
| `style.backgroundColor` | 要素の**背景色** | 白 → 黄色 |
| `style.fontSize` | 要素の**文字サイズ** | 16px → 30px |
| `style.width`、`style.height` | 要素の**サイズ** | 100px → 200px |
| `style.display` | 要素の**表示/非表示** | 表示 ⇔ 非表示 ← **今回！** |

**display の特徴：**

- 要素の見た目を変えるのではなく、**存在自体**を隠す
- 非表示にすると、その場所も詰まる（他の要素が上に移動する）
- マジックのような効果を作れる

### なぜdisplayプロパティが必要なのか

実際のWebサイトでは、様々な場面で要素の表示/非表示を切り替えます。

**実例：**

1. **エラーメッセージ**
   - 通常は非表示
   - エラーが発生したときだけ表示

2. **ハンバーガーメニュー**
   - 最初は非表示
   - ボタンをクリックすると表示

3. **モーダルウィンドウ（ポップアップ）**
   - 通常は非表示
   - 必要なときだけ表示

4. **画像ギャラリー**
   - 一部の画像だけ表示
   - クリックで次の画像を表示

これらすべてが、`display`プロパティを使って実現されています！

---

## 要素を非表示にする

### display = "none" の使い方

要素を非表示にするには、`display`プロパティに`"none"`を設定します。

**基本の書き方：**

```javascript
// 要素を取得
const elem = document.getElementById("message");

// 要素を非表示にする
elem.style.display = "none";
```

このコードを実行すると、要素が画面から**完全に消えます**。

**処理の流れ（3ステップ）：**

```
1. document.getElementById("message")
   → id="message"の要素を探す

2. elem.style.display
   → その要素のdisplayプロパティにアクセス

3. = "none"
   → "none"（非表示）に設定する
```

**マジックの布をかけるイメージ：**

マジシャンが箱に布をかけると、中の物が見えなくなります。

- 最初：要素が表示されている
- `elem.style.display = "none"` を実行
- 結果：要素が画面から消える（マジック！）

### 非表示になるとどうなるか

`display = "none"` を設定すると、要素は完全に消え、その場所も詰まります。

**HTML:**

```html
<p id="text1">1行目</p>
<p id="text2">2行目</p>
<p id="text3">3行目</p>
```

**JavaScript:**

```javascript
const elem2 = document.getElementById("text2");
elem2.style.display = "none";  // 2行目を非表示
```

**実行前の表示：**

```
1行目
2行目
3行目
```

**実行後の表示：**

```
1行目
3行目  ← 2行目が消えて、3行目が上に詰まる
```

**ポイント：**
- 要素が完全に消える
- 要素があった場所も詰まる
- 他の要素が上に移動する

これが `display: none` の特徴です！

---

## 要素を表示する

### display = "block" の使い方

非表示になっている要素を再表示するには、`display`プロパティに`"block"`を設定します。

**基本の書き方：**

```javascript
// 要素を取得
const elem = document.getElementById("message");

// 要素を表示する
elem.style.display = "block";
```

このコードを実行すると、非表示だった要素が再び表示されます。

**処理の流れ：**

```
1. document.getElementById("message")
   → id="message"の要素を探す

2. elem.style.display
   → その要素のdisplayプロパティにアクセス

3. = "block"
   → "block"（表示）に設定する
```

**マジックの布を取るイメージ：**

マジシャンが箱から布を取ると、中の物が再び現れます。

- 最初：要素が非表示（`display = "none"`）
- `elem.style.display = "block"` を実行
- 結果：要素が再び現れる（マジック！）

### blockとは

`"block"`は、要素を通常通り表示する値です。

**blockの特徴：**

- 要素が1行全体を占有する
- 縦に並ぶ
- 次の要素は下の行に表示される

**blockとして表示される要素の例：**

- `<p>`タグ：段落
- `<div>`タグ：ブロック要素
- `<h1>`～`<h6>`タグ：見出し

これらは、何も設定しなくても自動的に`block`として表示されます。

### 表示を切り替える

非表示と表示を切り替えることで、マジックのような効果を作れます。

```javascript
const elem = document.getElementById("box");

// 非表示にする
elem.style.display = "none";

// 再び表示する
elem.style.display = "block";
```

**実行結果：**

1. 要素が消える
2. 要素が現れる

この2つを繰り返すことで、要素が消えたり現れたりする動的な効果を作れます！

---

## displayの値の種類

### よく使う2つの値

`display`プロパティには、様々な値がありますが、今回は最も基本的な2つの値を学びます。

| 値 | 意味 | 効果 |
|----|------|------|
| `"none"` | 非表示 | 要素が画面から消える、場所も詰まる |
| `"block"` | ブロック表示 | 要素を通常通り表示、縦に並ぶ |

### "none"（非表示）

`"none"`は、要素を**完全に非表示**にする値です。

```javascript
elem.style.display = "none";
```

**特徴：**
- 要素が画面から消える
- 要素があった場所も詰まる
- 他の要素が上に移動する
- マジックのように消す効果

**使用例：**
```javascript
const errorMsg = document.getElementById("error");
errorMsg.style.display = "none";  // エラーメッセージを非表示
```

### "block"（ブロック表示）

`"block"`は、要素を**通常通り表示**する値です。

```javascript
elem.style.display = "block";
```

**特徴：**
- 要素が1行全体を占有する
- 縦に並ぶ
- 次の要素は下の行に表示される

**デフォルトでblockとして表示される要素：**
- `<p>`タグ：段落
- `<div>`タグ：ブロック要素
- `<h1>`～`<h6>`タグ：見出し

**使用例：**
```javascript
const successMsg = document.getElementById("success");
successMsg.style.display = "block";  // 成功メッセージを表示
```

### その他の値（参考）

`display`には他にも値がありますが、今回は`block`と`none`だけを使います。

| 値 | 意味 | 使用例 |
|----|------|--------|
| `"inline"` | インライン表示（横に並ぶ） | `<span>`、`<a>`など |
| `"inline-block"` | インラインブロック | ボタンなど |
| `"flex"` | フレックスボックス | 柔軟なレイアウト |
| `"grid"` | グリッドレイアウト | 複雑なレイアウト |

これらは後のレッスンで学びます。今は`none`と`block`だけ覚えましょう！

**覚え方：**

```
none = 「ない」 → 要素が**ない**（非表示）
block = 「ブロック」 → 1つの**ブロック**として表示
```

---

## 実践：要素を消したり現したり

### 1つの要素を非表示にする

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
const elem = document.getElementById("message");

// 要素を非表示にする
elem.style.display = "none";
```

**実行結果：**

画面から「このメッセージは消えます」という文字が消えます。まるでマジックのようです！

**コードの詳しい説明：**

1. `const elem = document.getElementById("message");`
   - id が "message" の要素を取得
   - `const` を使用（要素の参照先は変わらないため）

2. `elem.style.display = "none";`
   - 要素の display プロパティを "none" に設定
   - 要素が画面から消える

---

### 3つの要素を順番に表示する

3つの要素を用意し、最初は全て非表示にして、1つずつ表示してみましょう。これはカリキュラムの「3つの要素を順番に表示」の要件です。

**HTML:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 018 - 3つの要素</title>
</head>
<body>
    <p id="text1">1番目のメッセージ</p>
    <p id="text2">2番目のメッセージ</p>
    <p id="text3">3番目のメッセージ</p>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript:**

```javascript
// 3つの要素を取得
const elem1 = document.getElementById("text1");
const elem2 = document.getElementById("text2");
const elem3 = document.getElementById("text3");

// 最初は全て非表示
elem1.style.display = "none";
elem2.style.display = "none";
elem3.style.display = "none";

// 1番目だけ表示
elem1.style.display = "block";
```

**実行結果：**

画面には「1番目のメッセージ」だけが表示されます。2番目と3番目は非表示です。

**コードの詳しい説明：**

**ステップ1：要素の取得（2行目～4行目）**

```javascript
const elem1 = document.getElementById("text1");
const elem2 = document.getElementById("text2");
const elem3 = document.getElementById("text3");
```

- 3つの要素をそれぞれ取得
- `const` で変数を宣言

**ステップ2：全て非表示にする（7行目～9行目）**

```javascript
elem1.style.display = "none";
elem2.style.display = "none";
elem3.style.display = "none";
```

- 3つの要素を全て非表示に設定
- 画面から全ての要素が消える

**ステップ3：1番目だけ表示（12行目）**

```javascript
elem1.style.display = "block";
```

- 1番目の要素だけを表示に設定
- 1番目だけが画面に現れる

**応用：2番目だけ表示したい場合**

```javascript
// 全て非表示
elem1.style.display = "none";
elem2.style.display = "none";
elem3.style.display = "none";

// 2番目だけ表示
elem2.style.display = "block";
```

**応用：順番に切り替える**

```javascript
// 最初は1番目だけ表示
elem1.style.display = "block";
elem2.style.display = "none";
elem3.style.display = "none";

// 2番目に切り替え
elem1.style.display = "none";
elem2.style.display = "block";
elem3.style.display = "none";

// 3番目に切り替え
elem1.style.display = "none";
elem2.style.display = "none";
elem3.style.display = "block";
```

このように、表示を切り替えることで、要素が順番に現れる効果を作れます！

---

## マジックショーを作る（消えたり現れたり）

### 要素が消えたり現れたり

複数の要素の表示を切り替えることで、マジックのような効果を作れます。これはカリキュラムの「消えたり現れたり」と「成果物：マジックショー」の要件に対応します。

**例：2つの要素を交互に表示**

**HTML:**

```html
<p id="card1" style="background-color: lightblue; padding: 20px;">カード1</p>
<p id="card2" style="background-color: lightcoral; padding: 20px;">カード2</p>
```

**JavaScript:**

```javascript
// 2つの要素を取得
const elem1 = document.getElementById("card1");
const elem2 = document.getElementById("card2");

// 最初は1番目だけ表示
elem1.style.display = "block";
elem2.style.display = "none";
```

**実行結果：**

画面には「カード1」（水色）だけが表示されます。

**表示を入れ替える：**

その後、表示を入れ替えると、カードが入れ替わったように見えます。

```javascript
// 表示を入れ替える
elem1.style.display = "none";  // カード1を非表示
elem2.style.display = "block"; // カード2を表示
```

**実行結果：**

画面には「カード2」（ピンク色）が表示されます。カード1は消えています。

**マジックの仕組み：**

```
初期状態:
  カード1: 表示 (block)
  カード2: 非表示 (none)
    ↓
切り替え後:
  カード1: 非表示 (none)
  カード2: 表示 (block)
```

このように、2つの要素の表示を交互に切り替えることで、カードが入れ替わるマジックのような効果を作れます！

### マジックショーの完成例

3つの箱を用意して、順番に開けていくマジックショーを作ってみましょう。

**HTML:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>マジックショー</title>
    <style>
        .box {
            background-color: gold;
            padding: 30px;
            margin: 10px;
            border: 3px solid orange;
        }
    </style>
</head>
<body>
    <h1>マジックショー</h1>
    <div id="box1" class="box">ボックス1 - 驚きの中身！</div>
    <div id="box2" class="box">ボックス2 - ミステリー！</div>
    <div id="box3" class="box">ボックス3 - サプライズ！</div>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript:**

```javascript
// 3つのボックスを取得
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");

// 最初は全て非表示（箱を閉じる）
box1.style.display = "none";
box2.style.display = "none";
box3.style.display = "none";

// マジックショー：順番に開けていく
// ボックス1を開ける
box1.style.display = "block";

// ボックス2も開ける
box2.style.display = "block";

// ボックス3も開ける
box3.style.display = "block";
```

**実行結果：**

最終的には3つのボックスが全て表示されます。（実際には一瞬で全て表示されますが、後のレッスンで時間差をつける方法を学びます）

**ポイント：**

- 最初に全て非表示（`none`）にする
- 順番に表示（`block`）に切り替える
- マジックのように、箱が次々と開いていくイメージ

これが「マジックショー」の成果物です！

---

## displayとvisibilityの違い

要素を非表示にする方法には、`display`と`visibility`の2つがあります。どちらも要素を見えなくしますが、**動作が大きく異なります**。今回は`display`を使いますが、違いを理解しておきましょう。

### 2つのプロパティの比較

| プロパティ | 設定値 | 効果 | 場所は残る？ |
|----------|-------|------|------------|
| `display` | `"none"` | 要素が完全に消える | ❌ 詰まる |
| `visibility` | `"hidden"` | 要素が透明になる | ✅ 残る |

### display: none の動作

`display: none`を設定すると、要素は**完全に消え、その場所も詰まります**。

```javascript
const elem = document.getElementById("message");
elem.style.display = "none";
```

**結果:**
- ✅ 要素が画面から消える
- ✅ 要素があった場所が詰まる
- ✅ 他の要素が上に移動する

**イメージ：**

実行前：
```
┌─────────┐
│ 要素1   │
├─────────┤
│ 要素2   │  ← これを消す
├─────────┤
│ 要素3   │
└─────────┘
```

実行後：
```
┌─────────┐
│ 要素1   │
├─────────┤
│ 要素3   │  ← 上に詰まる
└─────────┘
```

要素2が完全に消えて、要素3が上に詰まります。

### visibility: hidden の動作（参考）

`visibility: hidden`という別のプロパティもあります。これは要素を**透明にしますが、場所は残ります**。

```javascript
const elem = document.getElementById("message");
elem.style.visibility = "hidden";
```

**結果:**
- ✅ 要素が見えなくなる
- ✅ 要素があった場所は**空白のまま残る**
- ❌ 他の要素は移動しない

**イメージ：**

実行前：
```
┌─────────┐
│ 要素1   │
├─────────┤
│ 要素2   │  ← これを透明にする
├─────────┤
│ 要素3   │
└─────────┘
```

実行後：
```
┌─────────┐
│ 要素1   │
├─────────┤
│         │  ← 空白が残る
├─────────┤
│ 要素3   │
└─────────┘
```

要素2は見えなくなりますが、場所は空白のまま残ります。

### どちらを使うべきか

**今回は `display` を使います。**

理由：
- マジックショーのように、要素を**完全に消したい**
- 他の要素を上に詰めたい
- スッキリとした見た目にしたい

`visibility`は、レイアウトを維持したまま要素を隠したいときに使います（今後のレッスンで学びます）。

**覚え方：**

```
display: none     → 消える + 詰まる（完全に消す）
visibility: hidden → 消える + 場所は残る（透明にする）
```

---

## よくある間違いと注意点

`display`プロパティを使うときに、初学者がよく間違えるポイントを紹介します。これらの間違いを避けることで、スムーズにコードを書けるようになります。

### 間違い1：値の指定ミス

**❌ 間違った書き方：**

```javascript
elem.style.display = "hide";     // ❌ "hide"という値は存在しない
elem.style.display = "show";     // ❌ "show"という値は存在しない
elem.style.display = "visible";  // ❌ これはvisibilityプロパティの値
```

**✅ 正しい書き方：**

```javascript
elem.style.display = "none";     // ✅ 非表示にする
elem.style.display = "block";    // ✅ 表示する
```

**なぜ間違えやすい？**

英語で「隠す」は "hide"、「見せる」は "show" なので、直感的にこれらを使いたくなります。しかし、`display`プロパティでは `"none"`（なし）と `"block"`（ブロック）を使います。

**覚え方：**
- 非表示 = `"none"` = 「ない」
- 表示 = `"block"` = 「ブロックとして表示」

### 間違い2：引用符を忘れる

**❌ 間違った書き方：**

```javascript
elem.style.display = none;       // ❌ 引用符がない（エラー）
elem.style.display = block;      // ❌ 引用符がない（エラー）
```

**✅ 正しい書き方：**

```javascript
elem.style.display = "none";     // ✅ 引用符で囲む
elem.style.display = "block";    // ✅ 引用符で囲む
```

**なぜエラーになる？**

JavaScriptでは、文字列は必ず引用符（`"`または`'`）で囲む必要があります。引用符がないと、JavaScriptは `none` や `block` を変数名だと勘違いし、「そんな変数は定義されていない」というエラーが出ます。

**エラーメッセージ例：**
```
Uncaught ReferenceError: none is not defined
```

### 間違い3：要素を取得していない

**❌ 間違った書き方：**

```javascript
// 要素を取得せずにいきなり使おうとする
elem.style.display = "none";     // ❌ elemが未定義（エラー）
```

**✅ 正しい書き方：**

```javascript
// まず要素を取得してから使う
const elem = document.getElementById("message");
elem.style.display = "none";  // ✅ 正しい
```

**なぜエラーになる？**

変数 `elem` を宣言（定義）していないため、JavaScriptは「そんな変数は知らない」というエラーを出します。必ず `getElementById()` などで要素を取得してから使いましょう。

### 間違い4：idの指定ミス

**❌ 間違った書き方：**

```javascript
// HTMLには id="message" という要素がない
const elem = document.getElementById("message");
elem.style.display = "none";  // ❌ elemがnull（エラー）
```

**✅ 正しい書き方：**

```javascript
// HTMLに <p id="message">...</p> が存在する
const elem = document.getElementById("message");
elem.style.display = "none";  // ✅ 正しい
```

**なぜエラーになる？**

指定したidの要素がHTMLに存在しない場合、`getElementById()` は `null`（何もない）を返します。`null` には `style` プロパティがないため、エラーになります。

**エラーメッセージ例：**
```
Uncaught TypeError: Cannot read property 'style' of null
```

**解決方法：**
- HTMLファイルで、該当するidを持つ要素が存在するか確認する
- idのスペルミスがないか確認する（大文字・小文字も区別されます）

### 注意点：単位は不要

**✅ 正しい書き方：**

```javascript
elem.style.display = "none";     // ✅ 単位は不要
elem.style.display = "block";    // ✅ 単位は不要
```

**これまでのプロパティとの違い：**

```javascript
// サイズを変える場合は単位が必要だった
elem.style.fontSize = "20px";    // ← "px"が必要
elem.style.width = "100px";      // ← "px"が必要

// displayは値そのものを指定（単位は不要）
elem.style.display = "none";     // ← 単位は不要
```

`display`プロパティは、サイズや色とは異なり、**表示状態を表す値**を直接指定するため、単位は必要ありません。

---

## 実用例

`display`プロパティは、実際のWebサイトで様々な場面で使われています。実用的な例を見てみましょう。

### 例1：メッセージの表示/非表示

エラーメッセージや成功メッセージを、必要なときだけ表示する機能は、ほとんどのWebサイトで使われています。

**HTML:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>メッセージ表示</title>
    <style>
        .error { color: red; }
        .success { color: green; }
    </style>
</head>
<body>
    <p id="error-message" class="error">エラーが発生しました</p>
    <p id="success-message" class="success">成功しました！</p>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript:**

```javascript
// 2つのメッセージ要素を取得
const errorMsg = document.getElementById("error-message");
const successMsg = document.getElementById("success-message");

// 最初は両方非表示
errorMsg.style.display = "none";
successMsg.style.display = "none";

// 成功した場合、成功メッセージだけ表示
successMsg.style.display = "block";
```

**実行結果：**

画面には「成功しました！」という緑色のメッセージだけが表示されます。エラーメッセージは非表示です。

**使用場面：**
- フォーム送信時の成功/エラー表示
- ログイン時のメッセージ表示
- データ保存時の確認メッセージ

### 例2：メニューの開閉

ハンバーガーメニューなど、クリックで開閉するメニューを作るときに使います。

**HTML:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>メニュー</title>
    <style>
        #menu {
            background-color: lightgray;
            padding: 20px;
        }
        #menu p {
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <h1>マイサイト</h1>
    <div id="menu">
        <p>メニュー項目1</p>
        <p>メニュー項目2</p>
        <p>メニュー項目3</p>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript:**

```javascript
// メニュー要素を取得
const menu = document.getElementById("menu");

// メニューを非表示にする
menu.style.display = "none";

// （後のレッスンで学ぶボタンクリックで）メニューを表示する
menu.style.display = "block";
```

**使用場面：**
- スマートフォン用のハンバーガーメニュー
- ドロップダウンメニュー
- サイドバーの開閉

### 例3：モーダルウィンドウ（ポップアップ）

画面に重ねて表示するポップアップウィンドウを作るときに使います。

**HTML:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>モーダル</title>
    <style>
        #modal {
            background-color: white;
            border: 2px solid black;
            padding: 30px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    </style>
</head>
<body>
    <h1>メインコンテンツ</h1>

    <div id="modal">
        <h2>お知らせ</h2>
        <p>重要なメッセージがあります</p>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript:**

```javascript
// モーダル要素を取得
const modal = document.getElementById("modal");

// 最初は非表示
modal.style.display = "none";

// 必要なときだけ表示
modal.style.display = "block";
```

**使用場面：**
- お知らせやアラートの表示
- 画像の拡大表示
- 確認ダイアログ

### 例4：画像ギャラリー

複数の画像を切り替えて表示するギャラリーを作るときに使います。

**HTML:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>画像ギャラリー</title>
</head>
<body>
    <h1>画像ギャラリー</h1>
    <div id="image1">🌄 画像1: 朝日</div>
    <div id="image2">🌅 画像2: 夕日</div>
    <div id="image3">🌃 画像3: 夜景</div>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript:**

```javascript
// 3つの画像要素を取得
const img1 = document.getElementById("image1");
const img2 = document.getElementById("image2");
const img3 = document.getElementById("image3");

// 最初は全て非表示
img1.style.display = "none";
img2.style.display = "none";
img3.style.display = "none";

// 1枚目だけ表示
img1.style.display = "block";
```

**使用場面：**
- スライドショー
- 画像ギャラリー
- 商品画像の切り替え

**共通のポイント：**

これらすべての例に共通しているのは、「必要なときだけ要素を表示する」という考え方です。`display`プロパティを使うことで、ユーザーにとって見やすく、使いやすいWebサイトを作ることができます。

---

## 練習問題

### 課題：3つの要素の表示を制御する

3つの要素を作成し、表示/非表示を制御してください。今回学んだ `display` プロパティを使って、要素の表示状態を変更する練習をします。

### 保存場所

`exercises/lesson-018/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

この課題は、以下の手順で進めます。

**ステップ1：HTMLに要素を追加**

1. `index.html` を開く
2. コメント部分（`<!-- ここにコードを追加 -->`）に3つの`<p>`要素を追加する
   - 1つ目：`id="item1"`、テキスト：「アイテム1」
   - 2つ目：`id="item2"`、テキスト：「アイテム2」
   - 3つ目：`id="item3"`、テキスト：「アイテム3」

**ステップ2：JavaScriptで要素を取得**

1. `script.js` を開く
2. `getElementById()` を使って3つの要素を取得する
3. それぞれ異なる変数名（`elem1`、`elem2`、`elem3`）に保存する

**ステップ3：表示を制御**

1. `style.display` プロパティを使って、以下のように設定する
   - `item1`: 非表示にする（`display = "none"`）
   - `item2`: 表示する（`display = "block"`）
   - `item3`: 非表示にする（`display = "none"`）

**ステップ4：動作確認**

1. ブラウザで `index.html` を開く
2. 「アイテム2」だけが表示されていることを確認する
3. 「アイテム1」と「アイテム3」が表示されていないことを確認する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-018
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

困ったときは、以下のヒントを参考にしてください。

**ヒント1：HTMLの書き方**

3つの`<p>`要素を作り、それぞれに異なるidと適当な文字を入れます。

```html
<p id="item1">アイテム1</p>
<p id="item2">アイテム2</p>
<p id="item3">アイテム3</p>
```

**ポイント：**
- `id` 属性の値は、それぞれ異なる名前にする
- タグは `<p>` と `</p>` で囲む
- 要素の間に改行を入れると見やすい

**ヒント2：要素の取得**

3つの変数を用意して、それぞれの要素を取得します。

```javascript
const elem1 = document.getElementById("item1");
const elem2 = document.getElementById("item2");
const elem3 = document.getElementById("item3");
```

**ポイント：**
- `getElementById()` の引数は、HTMLで指定した `id` の値と同じにする
- 引用符を忘れずに書く
- `const` を使う（要素の参照先は変わらないため）

**ヒント3：表示の制御**

`style.display`に`"none"`を設定すると非表示、`"block"`を設定すると表示になります。

```javascript
elem1.style.display = "none";   // 非表示
elem2.style.display = "block";  // 表示
elem3.style.display = "none";   // 非表示
```

**ポイント：**
- `"none"` と `"block"` は必ず引用符で囲む
- セミコロン（`;`）を忘れずに書く
- `elem2` だけ `"block"` にする（表示する）

**ヒント4：確認方法**

ブラウザで`index.html`を開いて、以下を確認してください。

**✅ 正しい状態：**
- 「アイテム2」だけが表示されている
- 「アイテム1」は表示されていない
- 「アイテム3」は表示されていない

**❌ よくある間違い：**
- 全ての要素が表示されている → JavaScriptコードが実行されていない可能性があります
- 何も表示されない → `item2` を `"block"` に設定していない可能性があります
- エラーが出る → `id` の指定ミスや引用符の書き忘れがないか確認しましょう

### よくある間違い

この課題でよくある間違いと解決方法を紹介します。

**間違い1：idの指定ミス**

```html
<!-- HTMLでは item1 -->
<p id="item1">アイテム1</p>
```

```javascript
// JavaScriptでは item-1（間違い！）
const elem1 = document.getElementById("item-1");
```

HTMLで指定した `id` と、JavaScriptで指定する `id` は**完全に一致**させる必要があります。

**間違い2：引用符の書き忘れ**

```javascript
elem1.style.display = none;  // ❌ 引用符がない
elem1.style.display = "none";  // ✅ 正しい
```

`"none"` や `"block"` は文字列なので、必ず引用符で囲みます。

**間違い3：値の間違い**

```javascript
elem1.style.display = "hide";  // ❌ "hide" という値は存在しない
elem1.style.display = "none";  // ✅ 正しい
```

非表示にするときは `"none"`、表示するときは `"block"` を使います。

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
const elem1 = document.getElementById("item1");
const elem2 = document.getElementById("item2");
const elem3 = document.getElementById("item3");

// それぞれの表示を制御
elem1.style.display = "none";   // 非表示
elem2.style.display = "block";  // 表示
elem3.style.display = "none";   // 非表示
```

### 詳しい解説

**HTMLファイルの解説：**

```html
<p id="item1">アイテム1</p>
<p id="item2">アイテム2</p>
<p id="item3">アイテム3</p>
```

**9行目～11行目：** 3つの`<p>`要素を作成しています。

- それぞれに異なる `id` 属性を付けています（`item1`、`item2`、`item3`）
- 要素の中には「アイテム1」「アイテム2」「アイテム3」というテキストを入れています
- テキストの内容は任意です（「メッセージ1」「テキスト1」など、どんな文字でも構いません）

**なぜ異なるidが必要？**

JavaScriptで個別に要素を操作するため、それぞれに異なる識別子（id）が必要です。同じidを複数の要素に付けると、`getElementById()` は最初の1つしか取得できません。

---

**JavaScriptファイルの解説：**

**ステップ1：要素の取得（2行目～4行目）**

```javascript
const elem1 = document.getElementById("item1");
const elem2 = document.getElementById("item2");
const elem3 = document.getElementById("item3");
```

- `getElementById()` を3回使って、3つの要素を取得
- それぞれ異なる変数（`elem1`、`elem2`、`elem3`）に保存
- `const` を使用（要素の参照先は変わらないため）

**処理の流れ：**

```
1. document.getElementById("item1")
   → HTMLから id="item1" の要素を探す
   → <p id="item1">アイテム1</p> が見つかる

2. elem1 に保存
   → 変数 elem1 で要素を操作できるようになる
```

**ステップ2：表示の制御（7行目～9行目）**

```javascript
elem1.style.display = "none";   // 非表示
elem2.style.display = "block";  // 表示
elem3.style.display = "none";   // 非表示
```

**7行目：** `elem1` を非表示に設定

- `elem1.style.display = "none"` を実行
- 「アイテム1」が画面から消える

**8行目：** `elem2` を表示に設定

- `elem2.style.display = "block"` を実行
- 「アイテム2」が画面に表示される
- デフォルトでも表示されていますが、明示的に `"block"` を設定しています

**9行目：** `elem3` を非表示に設定

- `elem3.style.display = "none"` を実行
- 「アイテム3」が画面から消える

---

**実行結果のイメージ：**

**実行前（JavaScriptが動作する前）：**

```
アイテム1
アイテム2
アイテム3
```

**実行後（JavaScriptが動作した後）：**

```
アイテム2
```

「アイテム1」と「アイテム3」は完全に消え、「アイテム2」だけが表示されます。

---

**FAQ：よくある質問**

**Q1: elem2 は何も設定しなくても表示されているのに、なぜ `"block"` を設定するのですか？**

A: `<p>`要素はデフォルトで表示されていますが、課題の要件として「表示を制御する」ことが求められているため、明示的に `"block"` を設定しています。また、後で非表示にしたい場合にも、対応する表示の設定として `"block"` を使います。

**Q2: `let` ではなく `const` を使うのはなぜですか？**

A: 要素の参照先（どの要素を指しているか）は変わらないため、`const` を使います。`const` は再代入ができない変数を宣言するときに使います。`elem1` が別の要素を指すことはないため、`const` が適切です。

**Q3: 3つの要素を全て非表示にするとどうなりますか？**

A: 画面には何も表示されなくなります。

```javascript
elem1.style.display = "none";
elem2.style.display = "none";
elem3.style.display = "none";
```

このコードでは、3つの要素すべてが非表示になるため、画面は空白になります。

**Q4: 3つの要素を全て表示するとどうなりますか？**

A: 3つの要素が縦に並んで表示されます。

```javascript
elem1.style.display = "block";
elem2.style.display = "block";
elem3.style.display = "block";
```

このコードでは、「アイテム1」「アイテム2」「アイテム3」が縦に並んで表示されます。

**Q5: idの名前は自由に決めていいですか？**

A: はい、自由に決められます。ただし、HTMLで指定したidと、JavaScriptで指定するidは完全に一致させる必要があります。

```html
<p id="myMessage">こんにちは</p>
```

```javascript
const elem = document.getElementById("myMessage");
```

このように、HTMLとJavaScriptで同じid名を使えば、どんな名前でも構いません。

---

## まとめ

### 今回学んだこと

今回のレッスンで学んだ重要なポイントを振り返りましょう。

**1. displayプロパティとは**

`display`プロパティは、要素の**表示状態**を制御するプロパティです。要素を画面に表示するか、非表示にするかを決めることができます。

- これまで学んだ色（`color`、`backgroundColor`）やサイズ（`fontSize`、`width`、`height`）の変更とは異なり、要素の**存在自体**を制御します
- マジックショーのように、要素を消したり現したりできます
- 実際のWebサイトで頻繁に使われる重要な機能です

**2. 要素の非表示（none）**

`elem.style.display = "none"` を設定すると、要素が画面から**完全に消えます**。

- 要素が画面から消える
- 要素があった場所も詰まる
- 他の要素が上に移動する
- マジックのように、要素を消すことができます

**覚え方：** `"none"` = 「ない」 → 要素が**ない**（非表示）

**3. 要素の表示（block）**

`elem.style.display = "block"` を設定すると、非表示だった要素が**再び表示されます**。

- 要素が1行全体を占有する
- 縦に並ぶ
- `<p>`、`<div>`、`<h1>`～`<h6>`などの要素は、デフォルトで `block` として表示されています

**覚え方：** `"block"` = 「ブロック」 → 1つの**ブロック**として表示

**4. 要素を消したり現したり（マジックショー）**

複数の要素の `display` プロパティを切り替えることで、マジックショーのような動的な効果を作れます。

- 3つの要素を順番に表示する
- カードを入れ替える
- メニューを開閉する
- メッセージを表示/非表示する

これらはすべて、`display: "none"` と `display: "block"` を切り替えることで実現できます。

**5. 実用的な機能の実装**

`display` プロパティは、実際のWebサイトで様々な場面で使われています。

- エラーメッセージや成功メッセージの表示/非表示
- ハンバーガーメニューの開閉
- モーダルウィンドウ（ポップアップ）の表示
- 画像ギャラリーの切り替え

今回学んだ知識を使えば、これらの機能を実装できるようになります！

---

### 達成チェックリスト

今回のレッスンで学んだ内容を確認しましょう。以下の項目ができるようになっていればOKです。

- [ ] `style.display` プロパティの意味を説明できる
- [ ] `display = "none"` で要素を非表示にできる
- [ ] `display = "block"` で要素を表示できる
- [ ] `display` と `visibility` の違いを説明できる
- [ ] 3つの要素の表示/非表示を制御できる
- [ ] 要素が消えたり現れたりする効果を作れる
- [ ] マジックショーの成果物を作れる
- [ ] 実用的な場面で `display` プロパティを使える

すべてチェックできましたか？もし不安な項目があれば、該当する箇所を復習しましょう。

---

### 次回の学習

次回は、**ボタンをクリックしたときに反応する方法**を学びます。

**Lesson 019：onclickの基本**

- `onclick` 属性の使い方
- クリックイベントの処理
- ボタンをクリックしたときに文字を変更する
- インタラクティブな操作の実装

今回学んだ `display` プロパティと組み合わせれば、「ボタンをクリックすると要素が消える」「クリックするたびに表示/非表示が切り替わる」といった、より実用的な機能を作れるようになります。

いよいよインタラクティブなページ作りに入ります。楽しみにしていてください！

お疲れ様でした。
