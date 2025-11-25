---
title: "Lesson 024: ミニプロジェクト"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 024: ミニプロジェクト

---

## 今回の学習

### 前回の復習

前回は、**イベントの基本**を復習しました。

```javascript
// onclick属性でイベントを処理
<button onclick="showMessage()">クリック</button>

// 引数を渡す
<button onclick="changeColor('red')">赤</button>
```

イベント駆動プログラミングの基本を身につけました。

### 今回の目標

今回は、**これまで学んだことを組み合わせて、実際に動くWebページを作ります**。

これは、あなたにとって**最初の本格的なプロジェクト**です！

**学習目標：**

1. **学んだことを組み合わせる** - DOM操作、イベント、変数、関数を統合します
2. **色が変わるボタンを作る** - ユーザーの操作で背景色が変化します
3. **カウンター付きにする** - クリック回数を記録・表示します
4. **実用的なアプリケーションを完成させる** - 一連の流れを体験します

---

## なぜミニプロジェクトが重要なのか

これまでのレッスンでは、**個別の技術**を学んできました。

```
レッスン13-18：DOM操作
レッスン19-20：イベント
レッスン21：変数と状態
レッスン22-23：復習
```

しかし、**実際のアプリケーションでは、これらを組み合わせて使います**。

### 例：TwitterのいいねボタンA

```javascript
// 複数の技術を組み合わせている
function toggleLike() {
  // 【変数】状態を管理
  isLiked = !isLiked;

  // 【DOM操作】要素を取得
  const button = document.getElementById("like-button");
  const count = document.getElementById("like-count");

  // 【DOM操作】色を変更
  button.style.color = isLiked ? "red" : "gray";

  // 【DOM操作】テキストを変更
  count.textContent = likeCount;
}
```

**このレッスンでは、技術を組み合わせる力を身につけます。**

### 日常生活の例え

**料理に例えると：**

```
これまで：包丁の使い方、火の使い方、調味料の使い方を学んだ
今回：これらを組み合わせて、実際に料理を作る
```

**スポーツに例えると：**

```
これまで：パス、シュート、ドリブルの練習をした
今回：実際に試合形式で練習する
```

**プログラミングも同じです。**

個別の技術を学んだら、次は組み合わせて使う練習が必要です。

---

## プロジェクトの概要

### 作るもの

**インタラクティブな色変更アプリ**

- 3つのボタンで背景色を変更できる
- クリック回数を自動的にカウントする
- リセットボタンで初期状態に戻せる

### 完成イメージ

```
┌─────────────────────────────────┐
│                                 │
│      表示エリア                  │
│   （背景色が変わる）              │
│                                 │
└─────────────────────────────────┘

クリック回数: 0

[赤] [青] [緑] [リセット]
```

### 使用する技術

このプロジェクトでは、次の技術を使います。

| 技術 | 使用箇所 |
|------|---------|
| `document.getElementById()` | 要素を取得する |
| `textContent` | カウンターの数字を更新する |
| `style.backgroundColor` | 背景色を変更する |
| `onclick` | ボタンクリックを処理する |
| `let` | クリック回数を記録する変数 |
| 関数 | 処理をまとめる |
| インクリメント(`++`) | カウントを増やす |

**これまで学んだことが、すべて使われます！**

---

## プロジェクトの仕様

### 機能1：色を変更するボタン

3つのボタンを用意し、それぞれクリックすると**表示エリアの背景色**が変わるようにします。

**要件：**

- **赤ボタン**：背景色を赤（`red`）にする
- **青ボタン**：背景色を青（`blue`）にする
- **緑ボタン**：背景色を緑（`green`）にする

**動作イメージ：**

```
【赤ボタンをクリック】
┌─────────────────────────────────┐
│                                 │
│      表示エリア（赤色）          │
│                                 │
└─────────────────────────────────┘

【青ボタンをクリック】
┌─────────────────────────────────┐
│                                 │
│      表示エリア（青色）          │
│                                 │
└─────────────────────────────────┘
```

### 機能2：カウンター

ボタンをクリックした**合計回数**を表示します。

**要件：**

- 最初は`0`回
- どのボタン（赤・青・緑）をクリックしても`1`増える
- 「リセット」ボタンで`0`に戻る

**動作イメージ：**

```
初期状態：         クリック回数: 0
赤ボタンクリック：   クリック回数: 1
青ボタンクリック：   クリック回数: 2
緑ボタンクリック：   クリック回数: 3
リセットクリック：   クリック回数: 0
```

### 機能3：リセットボタン

すべての状態を**初期状態**に戻します。

**要件：**

- 背景色を白（`white`）に戻す
- カウンターを`0`に戻す

---

## 実装の設計

### 必要な要素（HTML）

```html
<!-- 背景色が変わる表示エリア -->
<div id="display">表示エリア</div>

<!-- カウンターの表示 -->
<p>クリック回数: <span id="counter">0</span></p>

<!-- 4つのボタン -->
<button onclick="setRed()">赤</button>
<button onclick="setBlue()">青</button>
<button onclick="setGreen()">緑</button>
<button onclick="resetCounter()">リセット</button>
```

**重要なID：**

- `display` - 背景色が変わる表示エリア
- `counter` - カウンター数字を表示する要素

### 必要な変数（JavaScript）

```javascript
// クリック回数を記録する変数
let count = 0;
```

**なぜグローバル変数なのか：**

すべての関数から`count`にアクセスする必要があるため、グローバル変数として定義します。

```
setRed() → count を使う
setBlue() → count を使う
setGreen() → count を使う
resetCounter() → count を使う
```

### 必要な関数（JavaScript）

**1. setRed() 関数**

赤ボタンがクリックされたときに実行される関数。

```javascript
function setRed() {
  // 1. カウントを増やす
  count++;

  // 2. 背景色を赤にする
  const display = document.getElementById("display");
  display.style.backgroundColor = "red";

  // 3. カウンター表示を更新する
  const counter = document.getElementById("counter");
  counter.textContent = count;
}
```

**2. setBlue() 関数**

青ボタンがクリックされたときに実行される関数。

```javascript
function setBlue() {
  // 1. カウントを増やす
  count++;

  // 2. 背景色を青にする
  const display = document.getElementById("display");
  display.style.backgroundColor = "blue";

  // 3. カウンター表示を更新する
  const counter = document.getElementById("counter");
  counter.textContent = count;
}
```

**3. setGreen() 関数**

緑ボタンがクリックされたときに実行される関数。

```javascript
function setGreen() {
  // 1. カウントを増やす
  count++;

  // 2. 背景色を緑にする
  const display = document.getElementById("display");
  display.style.backgroundColor = "green";

  // 3. カウンター表示を更新する
  const counter = document.getElementById("counter");
  counter.textContent = count;
}
```

**4. resetCounter() 関数**

リセットボタンがクリックされたときに実行される関数。

```javascript
function resetCounter() {
  // 1. カウントを0に戻す
  count = 0;

  // 2. 背景色を白に戻す
  const display = document.getElementById("display");
  display.style.backgroundColor = "white";

  // 3. カウンター表示を0に更新する
  const counter = document.getElementById("counter");
  counter.textContent = count;
}
```

---

## ステップバイステップ実装ガイド

### ステップ1：HTMLの骨組みを作る

まず、基本的なHTML構造を作ります。

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 024</title>
</head>
<body>
    <h1>色変更アプリ</h1>

    <!-- ここに要素を追加していきます -->

    <script src="script.js"></script>
</body>
</html>
```

**確認：**

ブラウザで開いて、「色変更アプリ」というタイトルが表示されることを確認しましょう。

### ステップ2：表示エリアを追加する

背景色が変わる表示エリアを追加します。

```html
<body>
    <h1>色変更アプリ</h1>

    <!-- 表示エリア -->
    <div id="display" style="width: 300px; height: 200px; border: 1px solid black;">
        表示エリア
    </div>

    <script src="script.js"></script>
</body>
```

**確認：**

300px × 200pxの枠が表示されることを確認しましょう。

### ステップ3：カウンター表示を追加する

クリック回数を表示する部分を追加します。

```html
<div id="display" style="width: 300px; height: 200px; border: 1px solid black;">
    表示エリア
</div>

<!-- カウンター表示 -->
<p>クリック回数: <span id="counter">0</span></p>

<script src="script.js"></script>
```

**確認：**

「クリック回数: 0」と表示されることを確認しましょう。

### ステップ4：ボタンを追加する

4つのボタンを追加します。

```html
<p>クリック回数: <span id="counter">0</span></p>

<!-- ボタン -->
<button onclick="setRed()">赤</button>
<button onclick="setBlue()">青</button>
<button onclick="setGreen()">緑</button>
<button onclick="resetCounter()">リセット</button>

<script src="script.js"></script>
```

**確認：**

4つのボタンが表示されることを確認しましょう。

**この時点でのHTML全体：**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 024</title>
</head>
<body>
    <h1>色変更アプリ</h1>

    <div id="display" style="width: 300px; height: 200px; border: 1px solid black;">
        表示エリア
    </div>

    <p>クリック回数: <span id="counter">0</span></p>

    <button onclick="setRed()">赤</button>
    <button onclick="setBlue()">青</button>
    <button onclick="setGreen()">緑</button>
    <button onclick="resetCounter()">リセット</button>

    <script src="script.js"></script>
</body>
</html>
```

### ステップ5：JavaScriptの変数を定義する

`script.js` に変数を定義します。

**script.js:**

```javascript
// クリック回数を記録する変数
let count = 0;
```

**確認：**

この時点でボタンをクリックすると、エラーが出ます。（関数がまだ定義されていないため）

```
Uncaught ReferenceError: setRed is not defined
```

これは正常です。次のステップで関数を定義します。

### ステップ6：setRed() 関数を実装する

赤ボタンの機能を実装します。

**script.js:**

```javascript
let count = 0;

// 赤ボタンの関数
function setRed() {
  // 1. カウントを増やす
  count++;

  // 2. 背景色を赤にする
  const display = document.getElementById("display");
  display.style.backgroundColor = "red";

  // 3. カウンター表示を更新する
  const counter = document.getElementById("counter");
  counter.textContent = count;
}
```

**確認：**

赤ボタンをクリックして：
- 背景色が赤になる
- カウンターが1になる

ことを確認しましょう。

### ステップ7：setBlue() と setGreen() 関数を実装する

青ボタンと緑ボタンの機能を実装します。

**script.js:**

```javascript
let count = 0;

function setRed() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "red";
  const counter = document.getElementById("counter");
  counter.textContent = count;
}

// 青ボタンの関数
function setBlue() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "blue";
  const counter = document.getElementById("counter");
  counter.textContent = count;
}

// 緑ボタンの関数
function setGreen() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "green";
  const counter = document.getElementById("counter");
  counter.textContent = count;
}
```

**確認：**

各ボタンをクリックして：
- 背景色が変わる
- カウンターが増える

ことを確認しましょう。

### ステップ8：resetCounter() 関数を実装する

リセットボタンの機能を実装します。

**script.js:**

```javascript
let count = 0;

function setRed() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "red";
  const counter = document.getElementById("counter");
  counter.textContent = count;
}

function setBlue() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "blue";
  const counter = document.getElementById("counter");
  counter.textContent = count;
}

function setGreen() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "green";
  const counter = document.getElementById("counter");
  counter.textContent = count;
}

// リセットボタンの関数
function resetCounter() {
  // カウントを0に戻す
  count = 0;

  // 背景色を白に戻す
  const display = document.getElementById("display");
  display.style.backgroundColor = "white";

  // カウンター表示を0に更新する
  const counter = document.getElementById("counter");
  counter.textContent = count;
}
```

**確認：**

1. 色ボタンを何回かクリック
2. リセットボタンをクリック
3. 背景色が白に戻り、カウンターが0になる

ことを確認しましょう。

**完成です！おめでとうございます！**

---

## 動作の流れ

### シナリオ：赤→青→緑→リセット

**初期状態：**

```
表示エリア: 白（背景色なし）
カウンター: 0
```

**【1】赤ボタンをクリック**

```javascript
// setRed() が実行される
count++;              // count = 1
backgroundColor = "red"
counter.textContent = 1
```

**結果：**

```
表示エリア: 赤
カウンター: 1
```

**【2】青ボタンをクリック**

```javascript
// setBlue() が実行される
count++;               // count = 2
backgroundColor = "blue"
counter.textContent = 2
```

**結果：**

```
表示エリア: 青
カウンター: 2
```

**【3】緑ボタンをクリック**

```javascript
// setGreen() が実行される
count++;                // count = 3
backgroundColor = "green"
counter.textContent = 3
```

**結果：**

```
表示エリア: 緑
カウンター: 3
```

**【4】リセットボタンをクリック**

```javascript
// resetCounter() が実行される
count = 0;               // count = 0
backgroundColor = "white"
counter.textContent = 0
```

**結果：**

```
表示エリア: 白
カウンター: 0
```

---

## よくある問題とデバッグ

### 問題1：ボタンをクリックしても何も起こらない

**症状：**

ボタンをクリックしても、背景色が変わらない。

**原因1：関数名のスペルミス**

```html
<!-- HTML -->
<button onclick="setRed()">赤</button>
```

```javascript
// JavaScript
function setRead() {  // ❌ "setRead" になっている
  // ...
}
```

**解決方法：**

HTMLとJavaScriptの関数名を一致させる。

```javascript
function setRed() {  // ✅ "setRed" に修正
  // ...
}
```

**原因2：script.jsが読み込まれていない**

```html
<script src="scrpt.js"></script>  <!-- ❌ "scrpt" になっている -->
```

**解決方法：**

ファイル名を正しく書く。

```html
<script src="script.js"></script>  <!-- ✅ "script" に修正 -->
```

**原因3：括弧()を忘れている**

```html
<button onclick="setRed">赤</button>  <!-- ❌ ()がない -->
```

**解決方法：**

括弧を付ける。

```html
<button onclick="setRed()">赤</button>  <!-- ✅ ()を追加 -->
```

### 問題2：背景色は変わるが、カウンターが増えない

**症状：**

背景色は変わるが、カウンター表示が「0」のまま。

**原因：textContent の更新を忘れている**

```javascript
function setRed() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "red";
  // ❌ カウンターの更新を忘れている
}
```

**解決方法：**

カウンターの更新処理を追加する。

```javascript
function setRed() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "red";

  // ✅ カウンターを更新
  const counter = document.getElementById("counter");
  counter.textContent = count;
}
```

### 問題3：カウンターは増えるが、背景色が変わらない

**症状：**

カウンターは増えるが、背景色が変わらない。

**原因：IDが間違っている**

```javascript
const display = document.getElementById("dispaly");  // ❌ "dispaly" になっている
```

**解決方法：**

IDを正しく書く。

```javascript
const display = document.getElementById("display");  // ✅ "display" に修正
```

### 問題4：リセットボタンが動かない

**症状：**

リセットボタンをクリックしても、何も起こらない。

**原因：count = 0 ではなく count == 0 と書いている**

```javascript
function resetCounter() {
  count == 0;  // ❌ 比較演算子になっている
  // ...
}
```

**解決方法：**

代入演算子`=`を使う。

```javascript
function resetCounter() {
  count = 0;  // ✅ 代入演算子に修正
  // ...
}
```

### デバッグのコツ

**1. console.log() で確認する**

```javascript
function setRed() {
  count++;
  console.log("count:", count);  // カウントを確認

  const display = document.getElementById("display");
  console.log("display:", display);  // 要素が取得できているか確認

  display.style.backgroundColor = "red";
}
```

**2. 開発者ツールでエラーを確認する**

```
F12キーを押す → Consoleタブを見る
```

エラーメッセージが表示されていれば、それを読んで原因を特定します。

**3. 一つずつ確認する**

```javascript
function setRed() {
  // ステップ1：カウントを増やす
  count++;
  console.log("ステップ1完了:", count);

  // ステップ2：背景色を変える
  const display = document.getElementById("display");
  display.style.backgroundColor = "red";
  console.log("ステップ2完了");

  // ステップ3：カウンターを更新する
  const counter = document.getElementById("counter");
  counter.textContent = count;
  console.log("ステップ3完了");
}
```

どのステップまで実行されているか確認できます。

---

## コードの改善

### 現在のコード

```javascript
function setRed() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "red";
  const counter = document.getElementById("counter");
  counter.textContent = count;
}

function setBlue() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "blue";
  const counter = document.getElementById("counter");
  counter.textContent = count;
}

function setGreen() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "green";
  const counter = document.getElementById("counter");
  counter.textContent = count;
}
```

**問題点：**

- 同じコードが3回繰り返されている
- 色の部分だけが違う

### 改善版：引数を使う

```javascript
// 色を変更する汎用関数
function setColor(color) {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = color;
  const counter = document.getElementById("counter");
  counter.textContent = count;
}
```

**HTML:**

```html
<button onclick="setColor('red')">赤</button>
<button onclick="setColor('blue')">青</button>
<button onclick="setColor('green')">緑</button>
<button onclick="resetCounter()">リセット</button>
```

**メリット：**

- コードが短くなる
- 新しい色を追加しやすい
- バグが減る（同じコードを1箇所にまとめるため）

**ただし、今回は学習のため、あえて同じコードを繰り返し書いています。**

繰り返し書くことで、パターンを身につけることができます。

---

## 練習問題

### 課題：色変更アプリを作る

次の要件を満たすページを作成してください。

### 保存場所

`exercises/lesson-024/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

### 要件

**HTML (index.html):**

1. `id="display"` の要素を用意する（表示エリア）
2. `id="counter"` の要素を用意し、初期値として「0」を表示する
3. 赤ボタンを用意し、クリックすると`setRed()`関数が実行されるようにする
4. 青ボタンを用意し、クリックすると`setBlue()`関数が実行されるようにする
5. 緑ボタンを用意し、クリックすると`setGreen()`関数が実行されるようにする
6. リセットボタンを用意し、クリックすると`resetCounter()`関数が実行されるようにする

**JavaScript (script.js):**

1. `count`変数を定義し、初期値を`0`にする

2. `setRed`関数を定義し、次の処理を行う：
   - `count`を1増やす
   - `id="display"`の要素の背景色を赤にする
   - `id="counter"`の要素の`textContent`を`count`の値に更新する

3. `setBlue`関数を定義し、次の処理を行う：
   - `count`を1増やす
   - `id="display"`の要素の背景色を青にする
   - `id="counter"`の要素の`textContent`を`count`の値に更新する

4. `setGreen`関数を定義し、次の処理を行う：
   - `count`を1増やす
   - `id="display"`の要素の背景色を緑にする
   - `id="counter"`の要素の`textContent`を`count`の値に更新する

5. `resetCounter`関数を定義し、次の処理を行う：
   - `count`を`0`に戻す
   - `id="display"`の要素の背景色を白にする
   - `id="counter"`の要素の`textContent`を`0`に更新する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-024
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**ヒント1：表示エリアのスタイル**

```html
<div id="display" style="width: 300px; height: 200px; border: 1px solid black;">
    表示エリア
</div>
```

**ヒント2：カウンターの表示**

```html
<p>クリック回数: <span id="counter">0</span></p>
```

**ヒント3：count++ の使い方**

```javascript
count++;  // count = count + 1 と同じ
```

**ヒント4：backgroundColor の設定**

```javascript
display.style.backgroundColor = "red";    // 赤
display.style.backgroundColor = "blue";   // 青
display.style.backgroundColor = "green";  // 緑
display.style.backgroundColor = "white";  // 白
```

**ヒント5：動作確認の方法**

1. ブラウザで`index.html`を開く
2. 赤ボタンをクリック → 背景が赤、カウンター1
3. 青ボタンをクリック → 背景が青、カウンター2
4. 緑ボタンをクリック → 背景が緑、カウンター3
5. リセットをクリック → 背景が白、カウンター0
6. `npm test exercises/lesson-024`でテストを実行

**ヒント6：よくある間違いをチェック**

- [ ] `count`変数は関数の外で定義しているか
- [ ] `count++`でカウントを増やしているか
- [ ] `getElementById()`でIDを正しく指定しているか
- [ ] `textContent`でカウンター表示を更新しているか
- [ ] `resetCounter()`で`count = 0`にしているか

---

## 発展課題

基本機能が完成したら、次のような機能を追加してみましょう。

### 発展1：色の種類を増やす

黄色やピンク、オレンジなどのボタンを追加してみましょう。

**追加するHTML:**

```html
<button onclick="setYellow()">黄</button>
<button onclick="setPink()">ピンク</button>
<button onclick="setOrange()">オレンジ</button>
```

**追加するJavaScript:**

```javascript
function setYellow() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "yellow";
  const counter = document.getElementById("counter");
  counter.textContent = count;
}

function setPink() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "pink";
  const counter = document.getElementById("counter");
  counter.textContent = count;
}

function setOrange() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "orange";
  const counter = document.getElementById("counter");
  counter.textContent = count;
}
```

### 発展2：表示エリアに色の名前を表示する

背景色が変わったときに、色の名前も表示してみましょう。

**HTML（表示エリアを修正）:**

```html
<div id="display" style="width: 300px; height: 200px; border: 1px solid black; display: flex; align-items: center; justify-content: center; font-size: 24px;">
    <span id="colorName">選択してください</span>
</div>
```

**JavaScript（各関数を修正）:**

```javascript
function setRed() {
  count++;
  const display = document.getElementById("display");
  display.style.backgroundColor = "red";

  const colorName = document.getElementById("colorName");
  colorName.textContent = "赤";

  const counter = document.getElementById("counter");
  counter.textContent = count;
}
```

### 発展3：スタイルを整える

CSSを使って、見た目をきれいにしてみましょう。

**HTMLに追加（headタグ内）:**

```html
<style>
    body {
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
    }

    #display {
        width: 400px;
        height: 300px;
        margin: 20px auto;
        border: 3px solid #333;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        font-weight: bold;
    }

    button {
        margin: 5px;
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        opacity: 0.8;
    }

    .color-button-red {
        background-color: red;
        color: white;
    }

    .color-button-blue {
        background-color: blue;
        color: white;
    }

    .color-button-green {
        background-color: green;
        color: white;
    }

    .reset-button {
        background-color: #ccc;
    }
</style>
```

**ボタンにクラスを追加：**

```html
<button class="color-button-red" onclick="setRed()">赤</button>
<button class="color-button-blue" onclick="setBlue()">青</button>
<button class="color-button-green" onclick="setGreen()">緑</button>
<button class="reset-button" onclick="resetCounter()">リセット</button>
```

### 発展4：最も多くクリックされた色を表示する

どの色が一番多くクリックされたか表示してみましょう。

**JavaScript（変数を追加）:**

```javascript
let count = 0;
let redCount = 0;
let blueCount = 0;
let greenCount = 0;
```

**JavaScript（各関数を修正）:**

```javascript
function setRed() {
  count++;
  redCount++;  // 赤のカウントを増やす

  // 残りの処理...
}

function setBlue() {
  count++;
  blueCount++;  // 青のカウントを増やす

  // 残りの処理...
}

function setGreen() {
  count++;
  greenCount++;  // 緑のカウントを増やす

  // 残りの処理...
}
```

**統計表示を追加する関数：**

```javascript
function showStats() {
  alert(`赤: ${redCount}回\n青: ${blueCount}回\n緑: ${greenCount}回`);
}
```

**HTMLにボタンを追加：**

```html
<button onclick="showStats()">統計を表示</button>
```

---

## まとめ

### 今回学んだこと

**1. 技術の統合**

これまで学んだ個別の技術を組み合わせて、1つのアプリケーションを作りました。

```
DOM操作 + イベント + 変数 + 関数 = アプリケーション
```

**2. プロジェクトの進め方**

実際のプロジェクトの進め方を体験しました。

```
仕様の確認 → 設計 → 実装 → テスト → デバッグ
```

**3. グローバル変数の使い方**

複数の関数から同じ変数にアクセスする方法を学びました。

```javascript
let count = 0;  // グローバル変数

function setRed() {
  count++;  // どの関数からでもアクセスできる
}

function setBlue() {
  count++;  // 同じ変数を使える
}
```

**4. インクリメント演算子**

カウントを増やす簡潔な書き方を使いました。

```javascript
count++;  // count = count + 1 と同じ
```

**5. 同じパターンの繰り返し**

同じような処理を繰り返し書くことで、パターンを身につけました。

```javascript
// すべての関数が同じパターン
function setRed() {
  count++;           // 1. カウントを増やす
  // 背景色を変える    2. 色を変える
  // カウンターを更新   3. 表示を更新
}
```

### できるようになったこと

✅ 複数の技術を組み合わせてアプリケーションを作れるようになった

✅ プロジェクトを段階的に進められるようになった

✅ グローバル変数を使って状態を管理できるようになった

✅ 同じパターンのコードを書けるようになった

✅ デバッグの基本的な方法が分かるようになった

✅ 実際に動くアプリケーションを完成させることができた

### 次回の学習

次回からは、**第3章：データを扱う**に入ります。

- 配列の基本
- データの集まりを扱う
- より複雑なデータ構造

これまで学んだ基礎の上に、新しい知識を積み重ねていきます。

### あなたへのメッセージ

**おめでとうございます！**

あなたは、最初の本格的なプロジェクトを完成させました。

これは大きな一歩です。

```
レッスン1：alert()を表示する
     ↓
レッスン24：インタラクティブなアプリを作る
```

この成長を実感してください。

**これからも、一歩ずつ前に進んでいきましょう。**

次のレッスンも楽しみにしていてください！

お疲れ様でした！
