---
title: "Lesson 021: カウンターを作る"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 021: カウンターを作る

---

## 今回の学習

### 前回の復習

前回は、関数を使ってコードを整理する方法を学びました。

```javascript
function showMessage() {
  alert("こんにちは");
}
```

```html
<button onclick="showMessage()">ボタン</button>
```

関数を定義して、`onclick`から呼び出すことで、HTMLとJavaScriptを分離できるようになりました。

### 今回の目標

今回は、変数と関数を組み合わせて、**クリックカウンター**を作ります。

1. **状態を保持する方法を理解する** - 「今何回クリックされたか」という情報を覚えておく方法を学びます
2. **グローバル変数の概念を理解する** - 関数の外で宣言された変数について学びます
3. **count++の使い方を学ぶ** - 変数の値を1増やす便利な書き方を学びます
4. **インタラクティブなアプリケーションを作れるようになる** - ユーザーの操作に応じて値が変化するアプリを作ります

---

## これまでのレッスンとの違い

### これまでのレッスン

これまでのレッスンでは、ボタンをクリックしたときに**一度だけ**何かが起こるプログラムを作りました。

**例1：アラートを表示**

```html
<button onclick="alert('こんにちは')">ボタン</button>
```

- 1回目のクリック：「こんにちは」と表示
- 2回目のクリック：「こんにちは」と表示
- 3回目のクリック：「こんにちは」と表示

**毎回同じことが起こります**。

**例2：文字を変える**

```html
<p id="text">最初の文字</p>
<button onclick="document.getElementById('text').textContent = '変わった！'">変更</button>
```

- 1回目のクリック：「変わった！」に変わる
- 2回目のクリック：「変わった！」のまま（変化なし）
- 3回目のクリック：「変わった！」のまま（変化なし）

**一度変わったら、それ以上変化しません**。

### 今回のレッスン：状態を覚える

今回作るカウンターは、**これまでの操作を覚えています**。

```
1回目のクリック：0 → 1
2回目のクリック：1 → 2
3回目のクリック：2 → 3
```

**何回クリックされたか**という情報を覚えておく必要があります。

このように、プログラムが覚えておく情報のことを「**状態（state）**」と呼びます。

### 身近な例で理解する

**例1：歩数計**

- 1歩目：1歩
- 2歩目：2歩
- 3歩目：3歩

歩数計は、**これまで何歩歩いたか**を覚えています。

**例2：Twitterのいいね**

- 1回目のクリック：いいね数が1増える
- 2回目のクリック：さらに1増える（合計2）
- 3回目のクリック：さらに1増える（合計3）

いいね数は、**これまで何回いいねされたか**を覚えています。

カウンターも同じです。**これまで何回クリックされたか**を覚える必要があります。

---

## 状態を保持する方法

### 変数で状態を保持する

JavaScriptで状態を保持するには、**変数**を使います。

```javascript
let count = 0;
```

この変数 `count` が、「今何回クリックされたか」という情報を保持します。

### letとconstの違い

JavaScriptには、変数を宣言する方法が主に2つあります。

```javascript
let count = 0;      // 値を変更できる
const name = "太郎"; // 値を変更できない
```

**let（レット）**

- 値を**変更できる**変数を宣言します
- 後から別の値を代入できます

```javascript
let count = 0;
count = 1;  // OK：変更できる
count = 2;  // OK：変更できる
```

**const（コンスト）**

- 値を**変更できない**変数（定数）を宣言します
- 一度代入したら、変更できません

```javascript
const name = "太郎";
name = "花子";  // エラー：変更できない
```

**カウンターではletを使う**

カウンターでは、数を増やしていく必要があるため、**letを使います**。

```javascript
let count = 0;  // 最初は0
count = 1;      // クリックすると1に増える
count = 2;      // また増える
```

---

## カウンターの仕組み

### カウンターの流れ

カウンターは、次のような流れで動きます。

```
1. 変数countに0を保存する
2. ボタンがクリックされる
3. countの値を1増やす
4. 増やした値を画面に表示する
5. また2に戻る（繰り返し）
```

**重要なポイント：**

変数 `count` は、関数が終わっても**値を覚えています**。だから、次にボタンをクリックしたときも、前回の値から続けて増やすことができます。

### 値を1増やす方法

変数の値を1増やすには、以下のように書きます。

```javascript
count = count + 1;
```

**これは何をしているのか？**

```
右辺：count + 1     → 今のcountに1を足す
左辺：count =       → 計算結果をcountに代入する
```

**具体例：**

```javascript
let count = 3;        // countは3
count = count + 1;    // 3 + 1 = 4 → countは4になる
```

**ステップごとに見ると：**

1. 右辺の `count + 1` を計算する → `3 + 1` = `4`
2. 計算結果の `4` を `count` に代入する
3. `count` は `4` になる

### count++という便利な書き方

`count = count + 1` は頻繁に使われるため、短く書く方法があります。

```javascript
count++;
```

**これは `count = count + 1` と全く同じ意味です。**

**比較：**

```javascript
// 長い書き方
count = count + 1;

// 短い書き方
count++;
```

**どちらも同じ動作**をしますが、`count++` の方が短くて読みやすいです。

**他の書き方：**

```javascript
count += 1;  // これもcount = count + 1と同じ
```

**覚え方：**

- `count++` - 「カウントをプラス（++）する」
- `++` は「インクリメント（増加）」と呼ばれます

---

## カウンターを作る

### ステップ1：変数を用意する

まず、カウントする数を保持する変数を用意します。

```javascript
let count = 0;
```

**解説：**

- `let` - 値を変更できる変数を宣言
- `count` - 変数名（何回クリックされたかを保存）
- `= 0` - 最初の値は0

### ステップ2：関数を作る

ボタンがクリックされたときに実行される関数を作ります。

```javascript
function addCount() {
  count++;
}
```

**解説：**

- `function addCount()` - addCount という関数を定義
- `count++` - count の値を1増やす

### ステップ3：画面に表示する

増やした数を画面に表示します。

```javascript
function addCount() {
  count++;
  const elem = document.getElementById("counter");
  elem.textContent = count;
}
```

**解説：**

- 2行目：`count++` でカウントを1増やす
- 3行目：id="counter" の要素を取得
- 4行目：要素のテキストを count の値に変更

### ステップ4：HTMLを作る

HTMLで表示とボタンを作ります。

```html
<p id="counter">0</p>
<button onclick="addCount()">+1</button>
```

**解説：**

- 1行目：カウントを表示する場所（最初は0）
- 2行目：クリックすると addCount() 関数が実行されるボタン

### 完成したコード

**HTML (index.html):**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 021</title>
</head>
<body>
    <h1>クリックカウンター</h1>
    <p id="counter">0</p>
    <button onclick="addCount()">+1</button>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript (script.js):**

```javascript
let count = 0;

function addCount() {
  count++;
  const elem = document.getElementById("counter");
  elem.textContent = count;
}
```

**動作：**

1. ページを開くと、「0」と表示されている
2. 「+1」ボタンをクリック → 「1」に変わる
3. もう一度クリック → 「2」に変わる
4. さらにクリック → 「3」に変わる
5. ...繰り返し

---

## グローバル変数とは

### グローバル変数の概念

**グローバル変数**とは、**関数の外で宣言された変数**のことです。

```javascript
let count = 0;  // ← これがグローバル変数

function addCount() {
  count++;  // グローバル変数countにアクセスできる
}
```

**特徴：**

- **どの関数からでもアクセスできる**
- プログラムが終わるまで値を保持する
- 複数の関数で同じ変数を共有できる

### ローカル変数との違い

**ローカル変数**とは、**関数の中で宣言された変数**のことです。

```javascript
function addCount() {
  let message = "Hello";  // ← これがローカル変数
  console.log(message);
}

console.log(message);  // エラー！messageは関数の外では使えない
```

**比較：**

**グローバル変数：**

```javascript
let count = 0;  // 関数の外（グローバル）

function addCount() {
  count++;  // OK：アクセスできる
}

function showCount() {
  alert(count);  // OK：アクセスできる
}
```

**ローカル変数：**

```javascript
function addCount() {
  let message = "Hello";  // 関数の中（ローカル）
  console.log(message);    // OK：この関数の中では使える
}

function showCount() {
  console.log(message);  // エラー：他の関数からは使えない
}
```

### なぜグローバル変数を使うのか

カウンターでは、**複数のクリックで同じ変数を使う**必要があるため、グローバル変数を使います。

**もしローカル変数だったら：**

```javascript
function addCount() {
  let count = 0;  // 毎回0に戻る！
  count++;
  console.log(count);  // いつも1になる
}
```

このコードでは、関数が呼ばれるたびに `count` が0に戻ってしまいます。

**グローバル変数を使うと：**

```javascript
let count = 0;  // 最初に1回だけ宣言

function addCount() {
  count++;  // 前回の値を覚えている
  console.log(count);  // 1, 2, 3, 4...と増えていく
}
```

グローバル変数は、関数が終わっても**値を覚えています**。

---

## リセットボタンを追加する

### リセット機能

カウンターを0に戻すリセットボタンも作ってみましょう。

**HTML (index.html):**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 021</title>
</head>
<body>
    <h1>クリックカウンター</h1>
    <p id="counter">0</p>
    <button onclick="addCount()">+1</button>
    <button onclick="resetCount()">リセット</button>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript (script.js):**

```javascript
let count = 0;

function addCount() {
  count++;
  const elem = document.getElementById("counter");
  elem.textContent = count;
}

function resetCount() {
  count = 0;
  const elem = document.getElementById("counter");
  elem.textContent = count;
}
```

**解説：**

**addCount関数（4〜8行目）：**

1. `count++` でカウントを1増やす
2. `getElementById("counter")` で要素を取得
3. `textContent = count` で画面の表示を更新

**resetCount関数（10〜14行目）：**

1. `count = 0` でカウントを0に戻す
2. `getElementById("counter")` で要素を取得
3. `textContent = count` で画面の表示も0に更新

**動作：**

1. 「+1」ボタンをクリック → 1, 2, 3...と増えていく
2. 「リセット」ボタンをクリック → 0に戻る
3. また「+1」ボタンをクリック → 1, 2, 3...と増えていく

### 重要なポイント

両方の関数が**同じグローバル変数 `count` を使っています**。

```javascript
let count = 0;  // 両方の関数から使える

function addCount() {
  count++;  // ← このcountと
}

function resetCount() {
  count = 0;  // ← このcountは同じ変数
}
```

だから、リセットすると、次に増やすときも0から始まります。

---

## よくある間違いと解決方法

### 間違い1：毎回0に戻ってしまう

**間違ったコード：**

```javascript
function addCount() {
  let count = 0;  // ← 毎回ここで0になる！
  count++;
  const elem = document.getElementById("counter");
  elem.textContent = count;
}
```

**問題：**

関数の中で `let count = 0` を書くと、関数が呼ばれるたびに0に戻ります。

**正しいコード：**

```javascript
let count = 0;  // 関数の外で宣言（グローバル変数）

function addCount() {
  count++;  // ここではletを書かない
  const elem = document.getElementById("counter");
  elem.textContent = count;
}
```

### 間違い2：画面の表示が更新されない

**間違ったコード：**

```javascript
let count = 0;

function addCount() {
  count++;  // countは増えているが...
  // 画面の更新を忘れている！
}
```

**問題：**

変数 `count` は増えていますが、画面の表示を更新していません。

**正しいコード：**

```javascript
let count = 0;

function addCount() {
  count++;
  const elem = document.getElementById("counter");
  elem.textContent = count;  // 画面を更新
}
```

### 間違い3：HTMLのidが一致していない

**間違ったコード：**

```html
<p id="counter">0</p>
```

```javascript
const elem = document.getElementById("display");  // ← idが違う！
```

**問題：**

HTMLでは `id="counter"` なのに、JavaScriptでは `"display"` を探しています。

**正しいコード：**

```html
<p id="counter">0</p>
```

```javascript
const elem = document.getElementById("counter");  // idを一致させる
```

### 間違い4：count++の位置が間違っている

**間違ったコード：**

```javascript
function addCount() {
  const elem = document.getElementById("counter");
  elem.textContent = count;
  count++;  // ← 表示の後に増やしている
}
```

**問題：**

表示してから増やすと、1クリック遅れて表示されます。

- 1回目のクリック：0と表示（その後countが1になる）
- 2回目のクリック：1と表示（その後countが2になる）

**正しいコード：**

```javascript
function addCount() {
  count++;  // 先に増やす
  const elem = document.getElementById("counter");
  elem.textContent = count;  // 増やした後に表示
}
```

---

## 発展：減らすボタンも追加する

カウンターに「-1」ボタンも追加してみましょう。

**HTML (index.html):**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 021</title>
</head>
<body>
    <h1>クリックカウンター</h1>
    <p id="counter">0</p>
    <button onclick="subtractCount()">-1</button>
    <button onclick="addCount()">+1</button>
    <button onclick="resetCount()">リセット</button>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript (script.js):**

```javascript
let count = 0;

function addCount() {
  count++;
  updateDisplay();
}

function subtractCount() {
  count--;
  updateDisplay();
}

function resetCount() {
  count = 0;
  updateDisplay();
}

function updateDisplay() {
  const elem = document.getElementById("counter");
  elem.textContent = count;
}
```

**新しいポイント：**

1. **subtractCount関数** - `count--` で1減らす
2. **updateDisplay関数** - 画面の更新を1つの関数にまとめた（同じコードを3回書かなくて済む）
3. `count--` は `count = count - 1` と同じ意味

**動作：**

- 「+1」ボタン → 増える
- 「-1」ボタン → 減る
- 「リセット」ボタン → 0に戻る

---

## 練習問題

### 課題：カウンターアプリケーションを作る

次の要件を満たすカウンターアプリケーションを作成してください。

### 保存場所

`exercises/lesson-021/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

### 要件

**HTML (index.html):**

1. `id="counter"` の要素を用意し、初期値として「0」を表示する
2. 「+1」というテキストのボタンを作り、クリックすると `addCount` 関数が実行されるようにする
3. 「リセット」というテキストのボタンを作り、クリックすると `resetCount` 関数が実行されるようにする

**JavaScript (script.js):**

1. `let count = 0` という変数を定義する
2. `addCount` 関数を定義し、次の処理を行う：
   - `count` を1増やす
   - `id="counter"` の要素の `textContent` を `count` の値に更新する
3. `resetCount` 関数を定義し、次の処理を行う：
   - `count` を0に戻す
   - `id="counter"` の要素の `textContent` を0に更新する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-021
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**ヒント1：グローバル変数の宣言**

script.jsの最初に、関数の外で変数を宣言します。

```javascript
let count = 0;  // グローバル変数

function addCount() {
  // ...
}
```

**ヒント2：count++の使い方**

変数を1増やすには `count++` を使います。

```javascript
function addCount() {
  count++;  // countを1増やす
  // ...
}
```

**ヒント3：画面の更新**

```javascript
const elem = document.getElementById("counter");
elem.textContent = count;
```

**ヒント4：リセット**

```javascript
function resetCount() {
  count = 0;  // 0に戻す
  // 画面も更新する
}
```

**ヒント5：動作確認**

1. ブラウザで `index.html` を開く
2. 「+1」ボタンをクリック → 1, 2, 3...と増える
3. 「リセット」ボタンをクリック → 0に戻る

---

## 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 021</title>
</head>
<body>
    <h1>クリックカウンター</h1>
    <p id="counter">0</p>
    <button onclick="addCount()">+1</button>
    <button onclick="resetCount()">リセット</button>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
let count = 0;

function addCount() {
  count++;
  const elem = document.getElementById("counter");
  elem.textContent = count;
}

function resetCount() {
  count = 0;
  const elem = document.getElementById("counter");
  elem.textContent = count;
}
```

### 解説

**HTML (index.html):**

**10行目：カウンター表示**

```html
<p id="counter">0</p>
```

- `id="counter"` - JavaScriptから操作するためのid
- `0` - 初期表示は0

**11行目：+1ボタン**

```html
<button onclick="addCount()">+1</button>
```

- `onclick="addCount()"` - クリックすると `addCount` 関数を実行
- `+1` - ボタンに表示される文字

**12行目：リセットボタン**

```html
<button onclick="resetCount()">リセット</button>
```

- `onclick="resetCount()"` - クリックすると `resetCount` 関数を実行
- `リセット` - ボタンに表示される文字

**JavaScript (script.js):**

**1行目：グローバル変数の宣言**

```javascript
let count = 0;
```

- 関数の外で宣言（グローバル変数）
- 初期値は0
- すべての関数からアクセスできる

**3〜7行目：addCount関数**

```javascript
function addCount() {
  count++;
  const elem = document.getElementById("counter");
  elem.textContent = count;
}
```

- 4行目：`count++` でカウントを1増やす
- 5行目：id="counter" の要素を取得
- 6行目：要素のテキストを `count` の値に変更

**9〜13行目：resetCount関数**

```javascript
function resetCount() {
  count = 0;
  const elem = document.getElementById("counter");
  elem.textContent = count;
}
```

- 10行目：`count = 0` でカウントを0に戻す
- 11行目：id="counter" の要素を取得
- 12行目：要素のテキストを0に変更

**重要なポイント：**

1. **グローバル変数** - `let count = 0` は関数の外で宣言
2. **count++** - 変数を1増やす便利な書き方
3. **両方の関数が同じcount変数を使う** - だからリセットすると次も0から始まる

---

## まとめ

### 今回学んだこと

**1. 状態を保持する**

プログラムが「今何回クリックされたか」という情報を覚えておくことを「状態を保持する」と言います。

```javascript
let count = 0;  // この変数が状態を保持
```

**2. グローバル変数**

関数の外で宣言された変数を「グローバル変数」と呼びます。

- **どの関数からでもアクセスできる**
- プログラムが終わるまで値を保持する
- 複数の関数で同じ変数を共有できる

```javascript
let count = 0;  // グローバル変数

function addCount() {
  count++;  // アクセスできる
}

function resetCount() {
  count = 0;  // アクセスできる
}
```

**3. count++の使い方**

変数の値を1増やすには `count++` を使います。

```javascript
count++;  // count = count + 1 と同じ
```

同様に、1減らすには `count--` を使います。

```javascript
count--;  // count = count - 1 と同じ
```

**4. インタラクティブなアプリケーション**

変数と関数を組み合わせることで、ユーザーの操作に応じて値が変化していくアプリケーションを作れます。

```
ボタンをクリック → 変数が変わる → 画面が更新される
```

### できるようになったこと

✅ 変数を使って状態を保持できるようになった

✅ グローバル変数の概念を理解できた

✅ `count++` を使って変数を増やせるようになった

✅ 複数のボタンで同じ変数を操作できるようになった

✅ ユーザーの操作に応じて値が変化するアプリケーションを作れるようになった

### 次回の学習

次回は、DOM操作の復習を行います。

- `getElementById` の使い方
- `textContent` の使い方
- `style` の使い方

これまで学んだDOM操作の基本パターンを整理して、より確実に使えるようになります。

お疲れ様でした！
