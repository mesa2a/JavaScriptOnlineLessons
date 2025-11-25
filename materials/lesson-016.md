---
title: "Lesson 016: 色を変える"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 016: 色を変える

---

## 今回の学習

### 前回の復習

前回は、複数のHTML要素を操作する方法を学びました。それぞれの要素に異なるidを付け、`getElementById()`で個別に取得することで、複数の要素の文字を個別に変更できるようになりました。id属性の一意性という重要なルールも学びました。

### 今回の目標

1. `style`プロパティの使い方を理解する
2. 要素の文字色を変更できるようになる
3. 要素の背景色を変更できるようになる

---

## styleプロパティとは

### styleプロパティの役割

`style`プロパティは、HTML要素の見た目（スタイル）を制御するためのプロパティです。これまで学んだ`textContent`が要素の「内容」を変更するのに対し、`style`は要素の「見た目」を変更します。

**身近な例えで理解しよう：**

部屋の模様替えをイメージしてください。

- `textContent`：壁に貼ってあるポスターの「文字」を書き換える
- `style`：壁の「色」を塗り替える、家具の「大きさ」を変える

つまり、`textContent`は「何が書いてあるか」を変え、`style`は「どう見えるか」を変えるのです。

**styleプロパティでできること：**

- 文字の色を変える（`color`）
- 背景色を変える（`backgroundColor`）
- 文字の大きさを変える（`fontSize`）
- 要素のサイズを変える（`width`, `height`）
- 枠線をつける（`border`）
- 表示/非表示を切り替える（`display`）

今回は、この中でも最も基本的な「色の変更」に焦点を当てます。色を自由に変えられるようになると、Webページが一気にカラフルで楽しくなります。

### CSSとの関係

Web開発では、見た目を制御するために「CSS（Cascading Style Sheets）」という技術を使います。`style`プロパティは、このCSSをJavaScriptから操作するための仕組みです。

**CSSとJavaScriptの関係：**

レストランをイメージしてください。

- **CSS**：料理の盛り付けマニュアル（最初から決まっている見た目）
- **JavaScript**：お客さんの注文に応じて盛り付けを変える（動的に見た目を変える）

CSSでは、HTMLファイルに最初から「この要素は赤色」と書いておきます。JavaScriptでは、プログラムで「ボタンを押したら青色に変わる」のように、後から動的に見た目を変えられます。

**書き方の違い：**

通常、CSSでは以下のように書きます。

```css
color: red;
background-color: yellow;
```

JavaScriptでは、これを以下のように書きます。

```javascript
elem.style.color = "red";
elem.style.backgroundColor = "yellow";
```

違いに注目してください。CSSの`background-color`（ハイフンあり）が、JavaScriptでは`backgroundColor`（キャメルケース）になっています。この変換ルールは次のセクションで詳しく説明します。

---

## CSSプロパティのJavaScript記法

### キャメルケースとは

JavaScriptでCSSプロパティを使う場合、ハイフン（`-`）を使わず、ハイフンの後の文字を大文字にする「キャメルケース」という記法を使います。

**「キャメルケース」という名前の由来：**

ラクダ（camel）の背中のこぶを思い浮かべてください。

```
backgroundColor
    ↑     ↑
  こぶ1  こぶ2
```

大文字の部分がラクダのこぶのように見えるため、「キャメルケース」と呼ばれています。

**CSS記法とJavaScript記法の対応表：**

| CSS記法 | JavaScript記法 | 変換ルール |
|---------|---------------|----------|
| `color` | `color` | ハイフンなし→そのまま |
| `background-color` | `backgroundColor` | `-c`を削除して`C`に |
| `font-size` | `fontSize` | `-s`を削除して`S`に |
| `border-radius` | `borderRadius` | `-r`を削除して`R`に |
| `text-align` | `textAlign` | `-a`を削除して`A`に |
| `line-height` | `lineHeight` | `-h`を削除して`H`に |

**変換の3ステップ：**

1. ハイフン（`-`）を見つける
2. ハイフンを削除する
3. ハイフンの後の文字を大文字にする

```
background-color
    ↓
background color （ハイフン削除）
    ↓
backgroundColor （cをCに）
```

### なぜキャメルケースを使うのか

JavaScriptでは、変数名やプロパティ名にハイフン（`-`）を使うと、引き算（マイナス）として認識されてしまいます。

**エラーになる例：**

```javascript
// これはエラーになる
elem.style.background-color = "yellow";
// JavaScriptはこれを「background引くcolor」と解釈してしまう
// つまり： elem.style.background - color = "yellow"
```

**正しい書き方：**

```javascript
// これは正しい
elem.style.backgroundColor = "yellow";
// キャメルケースなら、1つのプロパティ名として認識される
```

**覚えるコツ：**

最初は「ハイフンを大文字に変える」と覚えましょう。

- CSS: `background-color` → ハイフンがある
- JavaScript: `backgroundColor` → ハイフンを大文字に変えた

慣れてくると、自然に変換できるようになります。

---

## 文字色を変える

### colorプロパティ

要素の文字色を変えるには、`style.color`プロパティを使います。

**基本の書き方：**

```javascript
// 要素を取得
const elem = document.getElementById("text");

// 文字色を赤に変更
elem.style.color = "red";
```

このコードを実行すると、要素の文字が赤色になります。

**処理の流れ（3ステップ）：**

```
1. document.getElementById("text")
   → id="text"の要素を探す

2. elem.style.color
   → その要素のcolorプロパティにアクセス

3. = "red"
   → 赤色に設定する
```

**ペンでマーカーを引くイメージ：**

紙に書いた文字に、色ペンでマーカーを引くのと同じです。

- 最初：黒い文字（デフォルト）
- `elem.style.color = "red"` を実行
- 結果：赤い文字に変わる

### 色の指定方法

色は、3つの方法で指定できます。初心者には**色の名前**が最も分かりやすいです。

**方法1：色の名前で指定（初心者におすすめ）**

英語の色名を使って指定します。直感的で分かりやすいです。

```javascript
elem.style.color = "red";      // 赤
elem.style.color = "blue";     // 青
elem.style.color = "green";    // 緑
elem.style.color = "yellow";   // 黄色
elem.style.color = "orange";   // オレンジ
elem.style.color = "purple";   // 紫
elem.style.color = "pink";     // ピンク
elem.style.color = "black";    // 黒
elem.style.color = "white";    // 白
elem.style.color = "gray";     // 灰色
```

**よく使う色の一覧：**

| 色名 | 日本語 | 使用例 |
|------|--------|--------|
| `red` | 赤 | エラーメッセージ、注意文 |
| `blue` | 青 | リンク、タイトル |
| `green` | 緑 | 成功メッセージ、承認ボタン |
| `yellow` | 黄色 | 警告、ハイライト |
| `orange` | オレンジ | 注目ポイント |
| `black` | 黒 | 通常の文字 |
| `white` | 白 | 暗い背景の上の文字 |
| `gray` | 灰色 | 無効化された要素 |

**方法2：RGB値で指定（中級者向け）**

Red（赤）、Green（緑）、Blue（青）の3色の強さを0～255で指定します。

```javascript
elem.style.color = "rgb(255, 0, 0)";      // 赤（赤255、緑0、青0）
elem.style.color = "rgb(0, 0, 255)";      // 青（赤0、緑0、青255）
elem.style.color = "rgb(0, 255, 0)";      // 緑（赤0、緑255、青0）
elem.style.color = "rgb(255, 255, 0)";    // 黄色（赤255、緑255、青0）
elem.style.color = "rgb(128, 128, 128)";  // 灰色（全て128）
```

**方法3：16進数カラーコードで指定（中級者向け）**

`#`の後に6桁の16進数で指定します。デザイナーからもらう色指定によく使われます。

```javascript
elem.style.color = "#ff0000";  // 赤
elem.style.color = "#0000ff";  // 青
elem.style.color = "#00ff00";  // 緑
elem.style.color = "#ffff00";  // 黄色
elem.style.color = "#808080";  // 灰色
```

**どれを使えばいい？**

- **初心者**：色の名前（`"red"`, `"blue"`など）
- **デザイン重視**：16進数カラーコード（デザイナーから指定される）
- **細かい調整**：RGB値（色を微調整したいとき）

今は、色の名前だけ覚えれば十分です。

---

## 背景色を変える

### backgroundColorプロパティ

要素の背景色を変えるには、`style.backgroundColor`プロパティを使います。

**基本の書き方：**

```javascript
// 要素を取得
const elem = document.getElementById("text");

// 背景色を黄色に変更
elem.style.backgroundColor = "yellow";
```

このコードを実行すると、要素の背景が黄色になります。

**蛍光ペンでマーカーを引くイメージ：**

ノートに蛍光ペンでマーカーを引くのと同じです。

- 最初：背景は透明（または白）
- `elem.style.backgroundColor = "yellow"` を実行
- 結果：黄色い背景になる

**注意：キャメルケースを忘れずに！**

```javascript
// ❌ 間違い：ハイフンを使っている
elem.style.background-color = "yellow";  // エラー！

// ✅ 正しい：キャメルケース
elem.style.backgroundColor = "yellow";
```

### 文字色と背景色を同時に変更

文字色と背景色は、それぞれ独立して設定できます。2つのプロパティを使うことで、様々な配色を作れます。

**基本パターン：**

```javascript
// 要素を取得
const elem = document.getElementById("text");

// 文字色を白、背景色を黒に変更
elem.style.color = "white";
elem.style.backgroundColor = "black";
```

**処理の流れ：**

```
1. const elem = document.getElementById("text");
   → 要素を取得

2. elem.style.color = "white";
   → 文字色を白に設定

3. elem.style.backgroundColor = "black";
   → 背景色を黒に設定

結果：白い文字、黒い背景の要素ができる
```

**様々な配色の例：**

```javascript
// パターン1：目立つ注意書き
elem.style.color = "red";
elem.style.backgroundColor = "yellow";

// パターン2：落ち着いた雰囲気
elem.style.color = "white";
elem.style.backgroundColor = "blue";

// パターン3：明るい雰囲気
elem.style.color = "black";
elem.style.backgroundColor = "pink";

// パターン4：自然な雰囲気
elem.style.color = "white";
elem.style.backgroundColor = "green";
```

---

## 実践：カラフルなページを作る

### 虹色の7色を表示する

7つの要素を作り、それぞれ虹色（赤、橙、黄、緑、青、藍、紫）に変更してみましょう。虹の色の順番を覚えながら、プログラミングの練習もできます。

**虹色とは：**

虹は7つの色で構成されています。

1. 赤（Red）
2. 橙（Orange）
3. 黄（Yellow）
4. 緑（Green）
5. 青（Blue）
6. 藍（Indigo）
7. 紫（Violet/Purple）

覚え方：「**せきとうおうりょくせいらんし**」（赤橙黄緑青藍紫）

**HTML:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 016</title>
</head>
<body>
    <p id="color1">虹色1：赤</p>
    <p id="color2">虹色2：橙</p>
    <p id="color3">虹色3：黄</p>
    <p id="color4">虹色4：緑</p>
    <p id="color5">虹色5：青</p>
    <p id="color6">虹色6：藍</p>
    <p id="color7">虹色7：紫</p>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript:**

```javascript
// 7つの要素を取得
const elem1 = document.getElementById("color1");
const elem2 = document.getElementById("color2");
const elem3 = document.getElementById("color3");
const elem4 = document.getElementById("color4");
const elem5 = document.getElementById("color5");
const elem6 = document.getElementById("color6");
const elem7 = document.getElementById("color7");

// 虹色に変更
elem1.style.color = "red";      // 赤
elem2.style.color = "orange";   // 橙
elem3.style.color = "yellow";   // 黄
elem4.style.color = "green";    // 緑
elem5.style.color = "blue";     // 青
elem6.style.color = "indigo";   // 藍
elem7.style.color = "purple";   // 紫
```

**コードの詳しい説明：**

```javascript
// ステップ1：7つの要素を取得
const elem1 = document.getElementById("color1");  // 1つ目の要素
const elem2 = document.getElementById("color2");  // 2つ目の要素
// ... 7つ目まで続く

// ステップ2：それぞれに色を設定
elem1.style.color = "red";  // 1つ目を赤に
elem2.style.color = "orange";  // 2つ目を橙に
// ... 7つ目まで続く
```

**実行結果：**

このコードを実行すると、ブラウザに以下のように表示されます。

```
虹色1：赤  （赤い文字で表示）
虹色2：橙  （オレンジの文字で表示）
虹色3：黄  （黄色の文字で表示）
虹色4：緑  （緑の文字で表示）
虹色5：青  （青い文字で表示）
虹色6：藍  （藍色の文字で表示）
虹色7：紫  （紫の文字で表示）
```

まるで本物の虹のようにカラフルなページになります！

---

## よくある色の組み合わせ

### 読みやすい配色（お気に入りの配色を見つけよう）

文字色と背景色の組み合わせによって、読みやすさが大きく変わります。デザインの基本は「見やすさ」です。

**読みやすい組み合わせ：**

```javascript
// パターン1：黒文字、白背景（最も標準的）
elem.style.color = "black";
elem.style.backgroundColor = "white";
// 用途：通常の文章、ブログ記事、説明文

// パターン2：白文字、黒背景（反転・ダークモード）
elem.style.color = "white";
elem.style.backgroundColor = "black";
// 用途：夜間モード、かっこいいデザイン

// パターン3：白文字、青背景（信頼感）
elem.style.color = "white";
elem.style.backgroundColor = "blue";
// 用途：ボタン、見出し、企業サイト

// パターン4：白文字、緑背景（成功・承認）
elem.style.color = "white";
elem.style.backgroundColor = "green";
// 用途：完了メッセージ、承認ボタン

// パターン5：黒文字、黄色背景（注目）
elem.style.color = "black";
elem.style.backgroundColor = "yellow";
// 用途：警告、重要なお知らせ、マーカー
```

**読みにくい組み合わせ（避けるべき）:**

```javascript
// ❌ 悪い例1：黄色文字、白背景（コントラストが低すぎる）
elem.style.color = "yellow";
elem.style.backgroundColor = "white";
// 問題：文字がほとんど見えない

// ❌ 悪い例2：赤文字、緑背景（色覚の問題）
elem.style.color = "red";
elem.style.backgroundColor = "green";
// 問題：色覚異常の人には区別しにくい

// ❌ 悪い例3：灰色文字、灰色背景（コントラスト不足）
elem.style.color = "gray";
elem.style.backgroundColor = "lightgray";
// 問題：文字が読みにくい
```

**配色を選ぶポイント（コントラストの重要性）：**

```
コントラスト = 明るさの差

✅ 良い：明るい背景 + 暗い文字（例：白背景 + 黒文字）
✅ 良い：暗い背景 + 明るい文字（例：黒背景 + 白文字）
❌ 悪い：明るい背景 + 明るい文字（例：白背景 + 黄文字）
❌ 悪い：暗い背景 + 暗い文字（例：黒背景 + 紫文字）
```

**お気に入りの配色を見つけよう：**

実際に様々な色の組み合わせを試して、自分のお気に入りを見つけましょう。

```javascript
// あなたのお気に入りの配色は？
const elem = document.getElementById("myElement");

// 試してみよう：ピンクと黒
elem.style.color = "black";
elem.style.backgroundColor = "pink";

// 試してみよう：オレンジと白
elem.style.color = "white";
elem.style.backgroundColor = "orange";
```

---

## よくある間違いと注意点

### 間違い1：CSSの記法をそのまま使う

```javascript
// これはエラーになる
elem.style.background-color = "yellow";  // ハイフンは使えない
```

正しくは以下のようになります。

```javascript
elem.style.backgroundColor = "yellow";  // キャメルケース
```

### 間違い2：色名のスペルミス

```javascript
elem.style.color = "yelow";  // スペルミス（正しくはyellow）
```

色名は英語のスペルを正確に書く必要があります。

### 間違い3：引用符を忘れる

```javascript
elem.style.color = red;  // 引用符がない（エラー）
```

正しくは以下のようになります。

```javascript
elem.style.color = "red";  // 引用符で囲む
```

### 間違い4：複数の値を一度に設定しようとする

```javascript
// これは動きません
elem.style = "color: red; background-color: yellow;";
```

正しくは、プロパティごとに個別に設定します。

```javascript
elem.style.color = "red";
elem.style.backgroundColor = "yellow";
```

---

## 練習問題

### 課題：カラフルなページを作る

3つの要素を作成し、それぞれに異なる色を設定してください。この課題を通して、`style.color`と`style.backgroundColor`の使い方をマスターしましょう。

### 課題の目標

**何ができるようになる？**

この課題をクリアすると、以下のことができるようになります。

✅ 要素の文字色を自由に変えられる
✅ 要素の背景色を自由に変えられる
✅ キャメルケース（`backgroundColor`）を正しく使える
✅ 複数の要素に異なる色を設定できる

### 保存場所

`exercises/lesson-016/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順（ステップバイステップ）

**ステップ1：HTMLに3つの要素を追加する**

`index.html` のコメント部分に、3つの`<p>`要素を追加します。

```html
<p id="text1">ここに何か文字を入れる</p>
<p id="text2">ここに何か文字を入れる</p>
<p id="text3">ここに何か文字を入れる</p>
```

**ステップ2：JavaScriptで要素を取得する**

`script.js` に、3つの要素を取得するコードを書きます。

```javascript
const elem1 = document.getElementById("text1");
const elem2 = document.getElementById("text2");
const elem3 = document.getElementById("text3");
```

**ステップ3：色を設定する**

それぞれの要素に色を設定します。

- **text1**: 文字色を赤（`red`）に
- **text2**: 文字色を青（`blue`）に
- **text3**: 背景色を黄色（`yellow`）に

```javascript
elem1.style.color = "red";
elem2.style.color = "blue";
elem3.style.backgroundColor = "yellow";
```

**完成の確認：**

ブラウザで `index.html` を開いて、以下を確認してください。

- [ ] 1つ目の文字が赤色になっている
- [ ] 2つ目の文字が青色になっている
- [ ] 3つ目の背景が黄色になっている（文字色は変わらない）

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-016
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

課題に詰まったら、以下のヒントを順番に見ていきましょう。

**ヒント1：HTMLの書き方**

3つの`<p>`要素を作り、それぞれに異なるidと適当な文字を入れます。

```html
<!-- index.htmlのbody内に追加 -->
<p id="text1">赤い文字</p>
<p id="text2">青い文字</p>
<p id="text3">黄色い背景</p>
```

文字の内容は自由に変えても構いません。大事なのはidが正しく設定されていることです。

**ヒント2：要素の取得**

3つの変数を用意して、それぞれの要素を取得します。

```javascript
// script.jsに書く
const elem1 = document.getElementById("text1");
const elem2 = document.getElementById("text2");
const elem3 = document.getElementById("text3");
```

変数名は`elem1`、`elem2`、`elem3`でなくても構いませんが、分かりやすい名前にしましょう。

**ヒント3：色の変更**

`style.color`で文字色、`style.backgroundColor`で背景色を変更します。

```javascript
// 文字色を変える
elem1.style.color = "red";
elem2.style.color = "blue";

// 背景色を変える（キャメルケースに注意！）
elem3.style.backgroundColor = "yellow";
```

**注意ポイント：**

- `color`と`backgroundColor`は違うプロパティです
- `backgroundColor`はキャメルケースで書きます（`background-color`ではない）
- 色名は引用符（`""`）で囲みます

**ヒント4：確認方法**

ブラウザで`index.html`を開いて、以下のチェックリストを確認してください。

- [ ] 1つ目の文字が赤色になっている
- [ ] 2つ目の文字が青色になっている
- [ ] 3つ目の背景が黄色になっている（文字色は黒のまま）

**よくある間違い：**

```javascript
// ❌ 間違い1：ハイフンを使っている
elem3.style.background-color = "yellow";

// ✅ 正しい：キャメルケース
elem3.style.backgroundColor = "yellow";

// ❌ 間違い2：引用符がない
elem1.style.color = red;

// ✅ 正しい：引用符で囲む
elem1.style.color = "red";
```

---

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 016</title>
</head>
<body>
    <p id="text1">赤い文字</p>
    <p id="text2">青い文字</p>
    <p id="text3">黄色い背景</p>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
// 3つの要素を取得
const elem1 = document.getElementById("text1");
const elem2 = document.getElementById("text2");
const elem3 = document.getElementById("text3");

// それぞれの色を変更
elem1.style.color = "red";
elem2.style.color = "blue";
elem3.style.backgroundColor = "yellow";
```

### 詳しい解説

**HTMLファイルの解説：**

```html
<p id="text1">赤い文字</p>
<p id="text2">青い文字</p>
<p id="text3">黄色い背景</p>
```

9行目から11行目で、3つの`<p>`要素を作成しています。

- **1つ目**：`id="text1"` という目印をつけた要素
- **2つ目**：`id="text2"` という目印をつけた要素
- **3つ目**：`id="text3"` という目印をつけた要素

要素の中の文字（「赤い文字」など）は、何でも構いません。分かりやすい文字を入れておくと良いでしょう。

**JavaScriptファイルの解説：**

**ステップ1：要素を取得（2～4行目）**

```javascript
const elem1 = document.getElementById("text1");
const elem2 = document.getElementById("text2");
const elem3 = document.getElementById("text3");
```

- `elem1`：1つ目の要素（`id="text1"`）を取得
- `elem2`：2つ目の要素（`id="text2"`）を取得
- `elem3`：3つ目の要素（`id="text3"`）を取得

**ステップ2：色を変更（7～9行目）**

```javascript
elem1.style.color = "red";
```

**7行目**：`elem1`の文字色を赤に設定

- `elem1`：1つ目の要素
- `.style.color`：文字色のプロパティ
- `= "red"`：赤色に設定

```javascript
elem2.style.color = "blue";
```

**8行目**：`elem2`の文字色を青に設定

- 7行目と同じパターンで、色だけ違う

```javascript
elem3.style.backgroundColor = "yellow";
```

**9行目**：`elem3`の背景色を黄色に設定

- `elem3`：3つ目の要素
- `.style.backgroundColor`：背景色のプロパティ（キャメルケース）
- `= "yellow"`：黄色に設定

**重要なポイント：**

- 文字色：`style.color`
- 背景色：`style.backgroundColor`（キャメルケース！）

**実行結果：**

このコードを実行すると、ブラウザに以下のように表示されます。

```
赤い文字  （赤色で表示）
青い文字  （青色で表示）
黄色い背景  （黄色い背景で表示、文字は黒のまま）
```

**よくある質問：**

**Q1：文字の内容を変えても大丈夫？**

A：はい、大丈夫です。「赤い文字」という文字を「Hello」に変えても、同じように動きます。大事なのはidが正しく設定されていることです。

**Q2：なぜ3つ目だけ背景色？**

A：`style.color`と`style.backgroundColor`の違いを理解するためです。同じ要素でも、文字色と背景色を別々に変更できることを学びます。

**Q3：色を他の色に変えても良い？**

A：はい、自由に変更できます。ただし、テストを通過するには、指定された色（赤、青、黄色）を使う必要があります。

---

## まとめ

### 今回学んだこと

**キーポイント1：styleプロパティ**

`style`プロパティは、HTML要素の見た目を制御するためのプロパティです。

- `textContent`：要素の「内容」を変更
- `style`：要素の「見た目」を変更

部屋の模様替えに例えると、`textContent`は壁のポスターの文字を書き換えること、`style`は壁の色を塗り替えることです。

**キーポイント2：CSSプロパティのJavaScript記法（キャメルケース）**

CSSのプロパティ名をJavaScriptで使う場合、「キャメルケース」記法を使います。

**変換ルール：**
1. ハイフン（`-`）を見つける
2. ハイフンを削除する
3. ハイフンの後の文字を大文字にする

**例：**
- CSS: `background-color` → JavaScript: `backgroundColor`
- CSS: `font-size` → JavaScript: `fontSize`

**理由：** JavaScriptでは、ハイフン（`-`）を引き算と認識してしまうため、キャメルケースを使います。

**キーポイント3：色の変更**

**文字色：** `style.color`
**背景色：** `style.backgroundColor`

```javascript
// 基本パターン
const elem = document.getElementById("text");
elem.style.color = "red";              // 文字色を赤に
elem.style.backgroundColor = "yellow";  // 背景色を黄色に
```

**色の指定方法：**
- 色の名前（`"red"`, `"blue"`など）← 初心者におすすめ
- RGB値（`"rgb(255, 0, 0)"`）
- 16進数カラーコード（`"#ff0000"`）

**キーポイント4：複数のプロパティを同時に設定**

1つの要素に対して、複数のスタイルプロパティを設定できます。

```javascript
// 文字色と背景色を同時に設定
elem.style.color = "white";
elem.style.backgroundColor = "black";
```

**配色のポイント：**
- 読みやすさを考慮する
- コントラスト（明るさの差）を意識する
- 明るい背景 + 暗い文字、または暗い背景 + 明るい文字が読みやすい

**キーポイント5：虹色の7色**

虹は7つの色で構成されています：赤、橙、黄、緑、青、藍、紫（せきとうおうりょくせいらんし）

複数の要素に異なる色を設定することで、カラフルなページを作れます。

---

### できるようになったこと（達成チェックリスト）

今回の学習で、以下のことができるようになりました。チェックしてみましょう。

- [ ] `style`プロパティの役割を説明できる
- [ ] `textContent`と`style`の違いを説明できる
- [ ] CSSプロパティをキャメルケースに変換できる
- [ ] `style.color`で文字色を変更できる
- [ ] `style.backgroundColor`で背景色を変更できる
- [ ] 複数の要素に異なる色を設定できる
- [ ] 読みやすい配色を選べる
- [ ] 虹の7色を覚えている

すべてチェックがついたら、次のレッスンに進みましょう！

---

### 次回の学習

次回は、**要素のサイズを変える方法**を学びます。

**次回学ぶこと：**
- `style.fontSize`で文字の大きさを変える
- `style.width`で要素の幅を変える
- `style.height`で要素の高さを変える
- 単位（`px`）の意味と使い方

文字を大きくしたり小さくしたり、要素のサイズを自由に変更できるようになります。Webページをより自由にデザインできるようになるので、楽しみにしていてください。

お疲れ様でした。
