---
title: "Lesson 058: 真偽値の活用"
author: "JavaScript学習教材"
date: "2025-11-20"
---

## 今回の学習

### 前回の復習

前回のレッスンでは、早期リターン（ガード節）について学びました。条件を満たさない場合にすぐに`return`することで、ネストを減らし、コードを平坦に保つことができました。エラーチェックを関数の上部にまとめることで、可読性の高いコードを書く方法を習得しました。

### 今回の目標

今回のレッスンでは、**真偽値（boolean）の活用**について学びます。真偽値は`true`か`false`の2つの値しか持ちませんが、この単純な値を使って、プログラムの状態を管理したり、ON/OFFの切り替えを実装したりする重要な役割を果たします。

今回のレッスンで習得する内容は以下の通りです。

- フラグ変数の使い方
- 状態管理の基礎
- トグル処理の実装方法

## 真偽値（boolean）とは

真偽値（boolean、ブーリアン）は、`true`（真）か`false`（偽）の2つの値だけを持つデータ型です。これまでのレッスンで、条件分岐の中で何度も使ってきました。

```javascript
let isAdult = true;
let isRaining = false;

if (isAdult) {
  console.log("大人です");
}

if (!isRaining) {
  console.log("雨は降っていません");
}
```

真偽値は比較演算子の結果としても得られます。

```javascript
let age = 20;
let isAdult = age >= 18; // trueが代入される
console.log(isAdult); // true

let score = 75;
let isPerfect = score === 100; // falseが代入される
console.log(isPerfect); // false
```

この真偽値を変数に保存して使うことを**フラグ変数**と呼びます。フラグ（flag）は「旗」という意味で、旗を立てたり下ろしたりするように、状態を表すための変数です。

## フラグ変数の基本

フラグ変数は、プログラムの状態を表すために使われる真偽値の変数です。例えば、以下のような状態を表現できます。

- ログインしているかどうか（`isLoggedIn`）
- データを読み込み中かどうか（`isLoading`）
- エラーが発生したかどうか（`hasError`）
- 機能が有効かどうか（`isEnabled`）

フラグ変数の命名には、一般的に`is`、`has`、`can`などの接頭辞を使います。これにより、その変数が真偽値であることが一目で分かります。

```javascript
// 良い命名例
let isVisible = true;
let hasPermission = false;
let canEdit = true;

// 悪い命名例（真偽値だと分かりにくい）
let visible = true;
let permission = false;
let edit = true;
```

フラグ変数を使うと、複雑な条件を分かりやすく表現できます。

```javascript
function checkAccess() {
  let age = 20;
  let hasMembership = true;

  let canEnter = age >= 18 && hasMembership;

  if (canEnter) {
    document.getElementById("result").textContent = "入場できます";
  } else {
    document.getElementById("result").textContent = "入場できません";
  }
}
```

この例では、`canEnter`というフラグ変数を使って、入場可能かどうかの条件をまとめています。これにより、if文の条件が分かりやすくなります。

## 状態管理の基礎

プログラムでは、さまざまな「状態」を管理する必要があります。例えば、以下のような状態です。

- メニューが開いているか閉じているか
- 通知が表示されているかどうか
- ボタンが有効か無効か
- コンテンツが表示されているか非表示か

これらの状態を管理するために、フラグ変数を使います。

```javascript
let isMenuOpen = false;

function showMenu() {
  isMenuOpen = true;
  document.getElementById("menu").style.display = "block";
  console.log("メニューを開きました");
}

function hideMenu() {
  isMenuOpen = false;
  document.getElementById("menu").style.display = "none";
  console.log("メニューを閉じました");
}
```

この例では、`isMenuOpen`という変数でメニューの開閉状態を管理しています。メニューを開く時は`true`に、閉じる時は`false`に設定します。

状態管理を行うことで、現在の状態に応じて異なる処理を実行できます。

```javascript
function checkMenuState() {
  if (isMenuOpen) {
    console.log("メニューは現在開いています");
  } else {
    console.log("メニューは現在閉じています");
  }
}
```

## トグル処理

**トグル**（toggle）とは、2つの状態を交互に切り替えることです。ON/OFFスイッチのように、押すたびに状態が反転する動作を指します。

トグル処理は、真偽値の否定演算子（`!`）を使って簡単に実装できます。

```javascript
let isOn = false;

function toggle() {
  isOn = !isOn; // trueとfalseを反転
  console.log("現在の状態: " + isOn);
}

// 実行例
toggle(); // 現在の状態: true
toggle(); // 現在の状態: false
toggle(); // 現在の状態: true
```

`isOn = !isOn`という式は、以下のように動作します。

- `isOn`が`false`の場合、`!false`は`true`になるので、`isOn`は`true`になります
- `isOn`が`true`の場合、`!true`は`false`になるので、`isOn`は`false`になります

この1行で、状態を反転させることができます。

### トグル処理の実践例

トグル処理を使って、表示/非表示を切り替える機能を実装してみましょう。

```javascript
let isVisible = true;

function toggleVisibility() {
  isVisible = !isVisible;

  if (isVisible) {
    document.getElementById("content").style.display = "block";
    document.getElementById("status").textContent = "表示中";
  } else {
    document.getElementById("content").style.display = "none";
    document.getElementById("status").textContent = "非表示";
  }
}
```

この関数を呼び出すたびに、コンテンツの表示/非表示が切り替わります。

## フラグ変数を使った条件分岐

フラグ変数を複数使うことで、複雑な状態を管理できます。

```javascript
let isLoggedIn = false;
let isPremiumUser = false;

function checkAccess() {
  if (isLoggedIn && isPremiumUser) {
    document.getElementById("result").textContent = "プレミアムコンテンツにアクセスできます";
  } else if (isLoggedIn && !isPremiumUser) {
    document.getElementById("result").textContent = "無料コンテンツのみアクセスできます";
  } else {
    document.getElementById("result").textContent = "ログインしてください";
  }
}
```

この例では、`isLoggedIn`と`isPremiumUser`という2つのフラグ変数を使って、ユーザーのアクセス権限を判定しています。

複数のフラグを組み合わせることで、さまざまな状態の組み合わせを表現できます。

## 状態の確認と表示

フラグ変数の値を画面に表示することで、現在の状態をユーザーに伝えることができます。

```javascript
let isActive = false;

function updateStatus() {
  let statusText = document.getElementById("status");

  if (isActive) {
    statusText.textContent = "アクティブ";
    statusText.style.color = "green";
  } else {
    statusText.textContent = "非アクティブ";
    statusText.style.color = "red";
  }
}

function activate() {
  isActive = true;
  updateStatus();
}

function deactivate() {
  isActive = false;
  updateStatus();
}
```

この例では、`isActive`の値に応じて、表示するテキストと色を変更しています。

## 実践：ON/OFFスイッチ

それでは、トグル処理を使ったON/OFFスイッチを作ってみましょう。ボタンをクリックするたびに、ライトのON/OFFが切り替わります。

**HTML部分:**

```html
<h1>ライトスイッチ</h1>
<button onclick="toggleLight()">スイッチを押す</button>
<p id="status"></p>
<div id="light" style="width: 100px; height: 100px; border-radius: 50%; margin: 20px;"></div>
```

**JavaScript部分:**

```javascript
let isLightOn = false;

function toggleLight() {
  // 状態を反転
  isLightOn = !isLightOn;

  // 状態に応じて表示を更新
  if (isLightOn) {
    document.getElementById("status").textContent = "ライトON";
    document.getElementById("light").style.backgroundColor = "yellow";
  } else {
    document.getElementById("status").textContent = "ライトOFF";
    document.getElementById("light").style.backgroundColor = "gray";
  }
}

// 初期状態を表示
toggleLight();
toggleLight();
```

このコードの動作を詳しく見ていきましょう。

1. **フラグ変数の宣言**: `isLightOn`という変数で、ライトのON/OFF状態を管理します。初期値は`false`（OFF）です

2. **トグル処理**: `isLightOn = !isLightOn`で、状態を反転させます。OFFならONに、ONならOFFになります

3. **状態に応じた表示**: `if`文で`isLightOn`の値を確認し、ONなら黄色、OFFなら灰色に設定します

4. **初期表示**: 最後に`toggleLight()`を2回呼び出すことで、初期状態（OFF）を画面に表示します

ボタンをクリックするたびに、ライトの色が黄色と灰色に切り替わり、状態のテキストも変わります。

## フラグ変数の応用

フラグ変数は、さまざまな場面で活用できます。

### 例1: 処理の実行制御

```javascript
let isProcessing = false;

function startProcess() {
  if (isProcessing) {
    console.log("既に処理中です");
    return;
  }

  isProcessing = true;
  console.log("処理を開始しました");

  // 処理が終わったらフラグをfalseに戻す
  setTimeout(function() {
    isProcessing = false;
    console.log("処理が完了しました");
  }, 3000);
}
```

この例では、`isProcessing`フラグを使って、処理の二重実行を防いでいます。

### 例2: 複数の状態管理

```javascript
let isPlaying = false;
let isPaused = false;

function play() {
  if (!isPlaying) {
    isPlaying = true;
    isPaused = false;
    console.log("再生中");
  }
}

function pause() {
  if (isPlaying && !isPaused) {
    isPaused = true;
    console.log("一時停止中");
  }
}

function stop() {
  isPlaying = false;
  isPaused = false;
  console.log("停止");
}
```

この例では、音楽プレーヤーのような機能を、複数のフラグで管理しています。

### 例3: 条件の事前チェック

```javascript
function submitForm() {
  let hasName = document.getElementById("nameInput").value !== "";
  let hasEmail = document.getElementById("emailInput").value !== "";

  let canSubmit = hasName && hasEmail;

  if (canSubmit) {
    document.getElementById("result").textContent = "送信しました";
  } else {
    document.getElementById("result").textContent = "すべての項目を入力してください";
  }
}
```

この例では、フォームの各項目が入力されているかをフラグ変数で管理し、すべて満たされている場合のみ送信を許可しています。

## 注意点

フラグ変数を使う際の注意点をいくつか紹介します。

### 1. 初期値を明確にする

フラグ変数は、必ず初期値を設定しましょう。初期値がないと、予期しない動作になることがあります。

```javascript
// 良い例
let isReady = false;

// 悪い例（初期値がない）
let isReady;
```

### 2. 名前を分かりやすくする

フラグ変数の名前は、その状態が何を表しているのか明確にします。`is`、`has`、`can`などの接頭辞を使うと良いでしょう。

```javascript
// 良い例
let isVisible = true;
let hasError = false;
let canEdit = true;

// 悪い例
let flag1 = true;
let status = false;
let check = true;
```

### 3. 否定形の使いすぎに注意

否定形の変数名（`isNotVisible`など）は、コードを読みにくくします。肯定形の変数名を使い、必要に応じて`!`演算子で否定する方が分かりやすいです。

```javascript
// 良い例
let isVisible = false;
if (!isVisible) {
  // 非表示の処理
}

// 悪い例
let isNotVisible = true;
if (isNotVisible) {
  // 非表示の処理
}
```

## 練習問題

### 課題

トグル処理を使ったON/OFFスイッチを作成しましょう。ボタンをクリックするたびにライトのON/OFFが切り替わり、状態を画面に表示します。

### 保存場所

`exercises/lesson-058/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. フラグ変数を使って状態を管理する
2. トグル処理で状態を反転させる
3. 状態に応じて画面の表示を変更する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-058
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

- `isLightOn`という名前の変数を宣言し、初期値を`false`にします
- `toggleLight`関数の中で、`isLightOn = !isLightOn`を使って状態を反転させます
- `if (isLightOn)`で状態を確認し、ONの場合は以下を設定します
  - ステータステキストを「ライトON」に
  - ライトの背景色を「yellow」に
- OFFの場合（else）は以下を設定します
  - ステータステキストを「ライトOFF」に
  - ライトの背景色を「gray」に
- ライトは`<div>`要素で、円形（`border-radius: 50%`）に表示します
- 初期状態を表示するため、最後に`toggleLight()`を2回呼び出します（最初の呼び出しでONになり、2回目でOFFに戻る）

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 058</title>
</head>
<body>
    <h1>ライトスイッチ</h1>
    <button onclick="toggleLight()">スイッチを押す</button>
    <p id="status"></p>
    <div id="light" style="width: 100px; height: 100px; border-radius: 50%; margin: 20px;"></div>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
let isLightOn = false;

function toggleLight() {
  // 状態を反転
  isLightOn = !isLightOn;

  // 状態に応じて表示を更新
  if (isLightOn) {
    document.getElementById("status").textContent = "ライトON";
    document.getElementById("light").style.backgroundColor = "yellow";
  } else {
    document.getElementById("status").textContent = "ライトOFF";
    document.getElementById("light").style.backgroundColor = "gray";
  }
}

// 初期状態を表示
toggleLight();
toggleLight();
```

### 解説

このプログラムは、トグル処理を使ってライトのON/OFF状態を切り替えます。

1. **フラグ変数の宣言**: `isLightOn`という変数で、ライトの状態を管理します。初期値は`false`（OFF）です

2. **トグル処理**: `isLightOn = !isLightOn`で、現在の状態を反転させます。この1行で、`true`と`false`が交互に切り替わります

3. **状態に応じた表示更新**: `if (isLightOn)`で現在の状態を確認し、ONの場合は黄色（yellow）、OFFの場合は灰色（gray）に設定します。同時に、ステータステキストも更新します

4. **初期表示の設定**: 関数の最後で`toggleLight()`を2回呼び出しています。1回目の呼び出しで`false`が`true`になり（ON）、2回目の呼び出しで`true`が`false`に戻ります（OFF）。これにより、初期状態（OFF）が画面に正しく表示されます

ボタンをクリックするたびに、`toggleLight()`関数が呼ばれ、状態が反転し、画面の表示が更新されます。この仕組みにより、シンプルなコードでON/OFFスイッチの機能を実装できます。

トグル処理（`変数 = !変数`）は、2つの状態を交互に切り替える際に非常に便利なテクニックです。メニューの開閉、通知の表示/非表示、機能の有効/無効など、さまざまな場面で活用できます。

## まとめ

お疲れ様でした。今回のレッスンでは、真偽値の活用について学びました。

**今回のキーポイント:**

- **フラグ変数**: 真偽値（`true`/`false`）を使って、プログラムの状態を管理する変数です。`is`、`has`、`can`などの接頭辞を付けることで、真偽値であることが明確になり、コードの可読性が向上します。フラグ変数を使うことで、複雑な条件を分かりやすく表現できます

- **状態管理**: フラグ変数を使って、メニューの開閉、コンテンツの表示/非表示、機能の有効/無効など、さまざまな状態を管理できます。状態を変数で管理することで、現在の状態を確認したり、状態に応じて異なる処理を実行したりできます

- **トグル処理**: `変数 = !変数`という記述で、真偽値を反転させることができます。この1行のコードで、ON/OFFの切り替えを簡単に実装できます。ボタンのクリックで表示を切り替えるような、ユーザーインターフェースの実装に頻繁に使われる重要なテクニックです

真偽値は非常にシンプルなデータ型ですが、状態管理やトグル処理など、実践的なプログラミングで重要な役割を果たします。今回学んだフラグ変数の使い方は、より複雑なアプリケーションを作る際の基礎となります。

次のレッスンでは、TruthyとFalsyについて学びます。JavaScriptの暗黙的な真偽判定の仕組みを理解し、より柔軟なコードを書けるようになっていきましょう。
