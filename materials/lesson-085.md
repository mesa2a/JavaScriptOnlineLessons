---
title: "Lesson 085: 週のプロジェクト - タイピングゲーム"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン85：週のプロジェクト - タイピングゲーム

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、ループのパフォーマンスについて学びました。

```javascript
// DOM要素の事前取得
let result = document.getElementById("result");

for (let i = 1; i <= 100; i++) {
  let p = document.createElement("p");
  p.textContent = i;
  result.appendChild(p);
}

// 処理時間の計測
let startTime = Date.now();
// 処理
let endTime = Date.now();
console.log("処理時間: " + (endTime - startTime) + "ミリ秒");
```

- **計算量の概念**：ループの回数が増えると処理時間が急激に増えます。特に二重ループ（O(n²)）は注意が必要です
- **効率的なコード**：ループ内で不要な処理を避けることで、パフォーマンスを向上できます。DOM要素の取得は事前に行います
- **最適化の基本**：不要な計算をループの外に出し、シンプルな構造を心がけることが重要です
- **成果物**：効率的ループ - 処理時間を計測して、効率的なループの書き方を実践しました

### よくある場面

プログラミングの現場では、こんな会話がよくあります。

**新人開発者**: 「タイピングゲームを作りたいんですが、どこから始めればいいですか？」
**先輩開発者**: 「良い選択だね。タイピングゲームは、これまで学んだ技術を全部使える総合演習になるよ」

**新人開発者**: 「ループ、条件分岐、イベント処理… 全部使うんですね」
**先輩開発者**: 「そう。さらに時間管理やスコア計算も必要だから、実践的なスキルが身につくよ。まずは小さく作って、少しずつ機能を追加していこう」

実際の開発では：
- **学習アプリ**: タイピング練習、クイズアプリ、フラッシュカード → ゲームの仕組みを応用
- **業務アプリ**: データ入力の検証、フォームの自動チェック → 入力判定の技術を活用
- **Webゲーム**: シューティングゲーム、パズルゲーム → ゲームループの概念を応用
- **タイマー機能**: カウントダウン、リマインダー → 時間管理の技術を活用

このように、タイピングゲームで学ぶ技術は、多くの実用的なアプリケーションに応用できます。

### 学習目標

今回のレッスンは、週のプロジェクトとしてタイピングゲームを作成します。これまで学んだ知識を総合的に活用します。

1. **タイピングゲームの仕組みを理解する**
2. **時間制限のあるプログラムを作成する**
3. **スコア計算の実装方法を学ぶ**
4. **ゲームループの概念を習得する**

---

## タイピングゲームとは

**タイピングゲーム**は、画面に表示される文字を制限時間内に正確に入力するゲームです。プログラミングの基本的な要素が詰まっているため、学習に最適なプロジェクトです。

### タイピングゲームの基本要素

実際のタイピングゲームには、以下の要素が必要です。

**1. 問題の表示**
- 単語やテキストを画面に表示
- ランダムに選ぶか、順番に表示
- 見やすいフォントサイズと色

**2. ユーザー入力**
- キーボードからの入力を受け取る
- 入力フィールドを用意
- Enterキーでの送信

**3. 入力の判定**
- 正解か不正解かを判定
- 大文字・小文字の区別
- 即座にフィードバック

**4. スコア管理**
- 正解数をカウント
- ミスの回数を記録
- 画面に表示

**5. 時間管理**
- 制限時間を設定
- カウントダウン表示
- 時間切れの処理

**6. ゲームループ**
- ゲームの状態を継続的に更新
- 終了条件のチェック
- 結果の表示

### なぜタイピングゲームが学習に最適なのか

**理由1：基本技術の総合演習**
- ループ（単語の繰り返し表示）
- 条件分岐（正解・不正解の判定）
- イベント処理（キーボード入力）
- DOM操作（画面の更新）

**理由2：段階的な拡張が可能**
- 最初はシンプルに作る
- 少しずつ機能を追加できる
- 自分のアイデアで改善できる

**理由3：実用的なスキルが身につく**
- 時間管理の技術
- 状態管理の概念
- ユーザー体験の設計

---

## ゲームの設計

タイピングゲームを作る前に、どのような機能が必要か考えてみましょう。

### 必要な要素

```
【HTML要素】
1. スタートボタン
2. 単語を表示するエリア
3. ユーザーの入力欄
4. 残り時間の表示
5. スコアの表示
6. ゲーム状態のメッセージ

【変数】
1. 問題となる単語のリスト（配列）
2. 現在表示している単語
3. スコア（正解数）
4. 残り時間
5. ゲーム中かどうかのフラグ
6. タイマーのID

【関数】
1. ゲーム開始の処理
2. ゲーム終了の処理
3. ランダムな単語を選ぶ処理
4. 新しい単語を表示する処理
5. 入力をチェックする処理
6. タイマーを動かす処理
```

### ゲームの流れ

```
【開始前】
  ↓
スタートボタンをクリック
  ↓
【ゲーム開始】
  - スコアを0にする
  - 制限時間を30秒にする
  - 入力欄を有効化
  - タイマーを開始
  ↓
【ゲーム中】
  - 単語を表示
  - ユーザーの入力を待つ
  - Enterキーが押される
  - 入力内容をチェック
    → 正解なら
      - スコアを増やす
      - 入力欄をクリア
      - 次の単語を表示
    → 不正解なら
      - 何もしない（入力を続ける）
  - 1秒ごとに残り時間を減らす
  - 残り時間が0になる
  ↓
【ゲーム終了】
  - タイマーを停止
  - 入力欄を無効化
  - 最終スコアを表示
```

この流れを、JavaScriptのコードで実装していきます。

---

## 時間制限の実装

ゲームには制限時間があり、時間が経過するとゲームが終了します。

### setInterval()の使い方

`setInterval()`は、**一定時間ごとに関数を繰り返し実行する**機能です。

#### 基本的な使い方

```javascript
// 1秒(1000ミリ秒)ごとに実行
let intervalId = setInterval(function() {
  console.log("1秒経過");
}, 1000);
```

**実行の流れ**：

```
0秒：setInterval()を実行
↓
1秒後："1秒経過"を表示
↓
2秒後："1秒経過"を表示
↓
3秒後："1秒経過"を表示
↓
...（永遠に繰り返す）
```

#### タイマーを停止する

```javascript
// タイマーを停止
clearInterval(intervalId);
```

**実行の流れ**：

```
0秒：setInterval()を実行 → intervalIdに保存
↓
1秒後："1秒経過"を表示
↓
2秒後："1秒経過"を表示
↓
3秒後：clearInterval(intervalId)を実行
↓
タイマーが停止（以降は実行されない）
```

**重要なポイント**：
- `setInterval()`は自動的には停止しない
- 必ず`clearInterval()`で停止する必要がある
- タイマーIDを変数に保存しておく

### カウントダウンタイマーの実装

制限時間を30秒に設定して、カウントダウンするタイマーを作ります。

```javascript
let timeLeft = 30;  // 残り時間（秒）

let timer = setInterval(function() {
  timeLeft = timeLeft - 1;  // 1秒減らす
  console.log("残り時間: " + timeLeft + "秒");

  if (timeLeft <= 0) {
    clearInterval(timer);  // タイマーを停止
    console.log("ゲーム終了!");
  }
}, 1000);
```

**実行の詳細**：

```
開始時：
  - timeLeft = 30
  - setInterval()を実行
  - timerにIDを保存

1秒後：
  - timeLeft = timeLeft - 1 → timeLeft = 29
  - console.log("残り時間: 29秒")
  - timeLeft <= 0? → いいえ（29 > 0）
  - 処理を続ける

2秒後：
  - timeLeft = timeLeft - 1 → timeLeft = 28
  - console.log("残り時間: 28秒")
  - timeLeft <= 0? → いいえ（28 > 0）
  - 処理を続ける

...（繰り返し）

30秒後：
  - timeLeft = timeLeft - 1 → timeLeft = 0
  - console.log("残り時間: 0秒")
  - timeLeft <= 0? → はい（0 <= 0）
  - clearInterval(timer) → タイマー停止
  - console.log("ゲーム終了!")
```

### 画面に残り時間を表示する

コンソールではなく、HTMLに表示します。

```html
<p>残り時間: <span id="time">30</span>秒</p>
```

```javascript
let timeDisplay = document.getElementById("time");
let timeLeft = 30;

let timer = setInterval(function() {
  timeLeft = timeLeft - 1;
  timeDisplay.textContent = timeLeft;  // 画面を更新

  if (timeLeft <= 0) {
    clearInterval(timer);
    alert("ゲーム終了!");
  }
}, 1000);
```

**実行の流れ**：

```
開始時：
  - 画面に"30"と表示

1秒後：
  - timeLeft = 29
  - 画面を"29"に更新

2秒後：
  - timeLeft = 28
  - 画面を"28"に更新

...（繰り返し）

30秒後：
  - timeLeft = 0
  - 画面を"0"に更新
  - タイマー停止
  - "ゲーム終了!"アラート表示
```

### 重要な注意点

**1. 必ずタイマーを停止する**
```javascript
// ❌ 悪い例：停止しない
setInterval(function() {
  console.log("動き続ける");
}, 1000);
// → 永遠に動き続ける、メモリリーク

// ✅ 良い例：停止する
let timer = setInterval(function() {
  console.log("適切に停止");
}, 1000);
clearInterval(timer);  // 必ず停止
```

**2. タイマーIDを保存する**
```javascript
// ❌ 悪い例：IDを保存しない
setInterval(function() {
  console.log("停止できない");
}, 1000);
// → 停止する方法がない

// ✅ 良い例：IDを保存
let timer = setInterval(function() {
  console.log("停止できる");
}, 1000);
clearInterval(timer);  // IDを使って停止
```

**3. ゲーム終了時は必ず停止**
```javascript
function endGame() {
  clearInterval(timer);  // 必ず停止
  console.log("ゲーム終了");
}
```

---

## 単語のランダム表示

問題となる単語をランダムに選んで表示します。

### 配列からランダムに選ぶ

```javascript
let words = ["apple", "banana", "orange", "grape", "melon"];

// ランダムなインデックスを生成
let randomIndex = Math.floor(Math.random() * words.length);

// ランダムな単語を取得
let randomWord = words[randomIndex];
console.log(randomWord);  // 例："banana"
```

**実行の詳細**：

```
1. Math.random()を実行
   → 0以上1未満の小数を返す
   → 例：0.7234567

2. words.lengthを取得
   → 5（配列の要素数）

3. Math.random() * words.lengthを計算
   → 0.7234567 * 5 = 3.6172835

4. Math.floor()で小数点以下を切り捨て
   → Math.floor(3.6172835) = 3

5. words[3]を取得
   → "grape"
```

### Math.random()の詳しい説明

**Math.random()の範囲**：

```javascript
Math.random();  // 0 ≦ 結果 < 1
```

**例**：
- `0.0` → 可能
- `0.5` → 可能
- `0.9999...` → 可能
- `1.0` → **不可能**（1未満なので）

**配列の長さをかける**：

```javascript
// 配列の長さが5の場合
Math.random() * 5;  // 0 ≦ 結果 < 5
```

**例**：
- `0 * 5 = 0.0`
- `0.5 * 5 = 2.5`
- `0.999... * 5 = 4.999...`

**Math.floor()で整数にする**：

```javascript
Math.floor(Math.random() * 5);  // 0, 1, 2, 3, 4 のいずれか
```

**可能な値**：

| Math.random() | × 5 | Math.floor() | インデックス | 取得できる単語 |
|--------------|-----|-------------|-------------|--------------|
| 0.0 〜 0.2 | 0.0 〜 1.0 | 0 | words[0] | "apple" |
| 0.2 〜 0.4 | 1.0 〜 2.0 | 1 | words[1] | "banana" |
| 0.4 〜 0.6 | 2.0 〜 3.0 | 2 | words[2] | "orange" |
| 0.6 〜 0.8 | 3.0 〜 4.0 | 3 | words[3] | "grape" |
| 0.8 〜 1.0 | 4.0 〜 5.0 | 4 | words[4] | "melon" |

### 関数にまとめる

毎回同じコードを書くのは面倒なので、関数にまとめます。

```javascript
let words = ["apple", "banana", "orange", "grape", "melon"];

function getRandomWord() {
  let randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// 使い方
let word1 = getRandomWord();  // 例："orange"
let word2 = getRandomWord();  // 例："apple"
let word3 = getRandomWord();  // 例："orange"（同じ単語も出る）
```

**実行の流れ**：

```
getRandomWord()を呼び出す
  ↓
Math.random()を実行 → 例：0.6543
  ↓
0.6543 * 5 = 3.2715
  ↓
Math.floor(3.2715) = 3
  ↓
words[3] = "grape"を返す
  ↓
word1 = "grape"
```

---

## スコア計算の実装

正解数や不正解数をカウントして、スコアを表示します。

### スコアのカウント

```javascript
let score = 0;      // 正解数
let mistakes = 0;   // 不正解数

// 正解した時
score = score + 1;
console.log("スコア: " + score);

// 不正解の時
mistakes = mistakes + 1;
console.log("ミス: " + mistakes);
```

**実行の流れ**：

```
初期状態：
  - score = 0
  - mistakes = 0

1回目の入力（正解）：
  - score = score + 1 → score = 1
  - console.log("スコア: 1")

2回目の入力（正解）：
  - score = score + 1 → score = 2
  - console.log("スコア: 2")

3回目の入力（不正解）：
  - mistakes = mistakes + 1 → mistakes = 1
  - console.log("ミス: 1")

4回目の入力（正解）：
  - score = score + 1 → score = 3
  - console.log("スコア: 3")
```

### 画面への表示

HTMLに用意した要素に、スコアを表示します。

```html
<p>スコア: <span id="score">0</span></p>
<p>ミス: <span id="mistakes">0</span></p>
```

```javascript
let scoreDisplay = document.getElementById("score");
let mistakesDisplay = document.getElementById("mistakes");

let score = 0;
let mistakes = 0;

// 正解した時
function onCorrect() {
  score = score + 1;
  scoreDisplay.textContent = score;  // 画面を更新
}

// 不正解の時
function onIncorrect() {
  mistakes = mistakes + 1;
  mistakesDisplay.textContent = mistakes;  // 画面を更新
}
```

**実行の流れ**：

```
初期状態：
  - 画面："スコア: 0"
  - 画面："ミス: 0"

onCorrect()を呼び出す：
  - score = 1
  - scoreDisplay.textContent = 1
  - 画面："スコア: 1"に更新

onCorrect()を再度呼び出す：
  - score = 2
  - scoreDisplay.textContent = 2
  - 画面："スコア: 2"に更新

onIncorrect()を呼び出す：
  - mistakes = 1
  - mistakesDisplay.textContent = 1
  - 画面："ミス: 1"に更新
```

---

## 入力の判定

ユーザーが入力した文字列が、表示されている単語と一致するかを判定します。

### 文字列の比較

```javascript
let correctWord = "apple";
let userInput = "apple";

if (userInput === correctWord) {
  console.log("正解!");
} else {
  console.log("不正解...");
}
```

**実行の流れ**：

```
ケース1：正解の場合
  - correctWord = "apple"
  - userInput = "apple"
  - userInput === correctWord? → はい（"apple" === "apple"）
  - console.log("正解!")

ケース2：不正解の場合
  - correctWord = "apple"
  - userInput = "aple"（スペルミス）
  - userInput === correctWord? → いいえ（"aple" !== "apple"）
  - console.log("不正解...")

ケース3：大文字・小文字が違う場合
  - correctWord = "apple"
  - userInput = "Apple"（大文字）
  - userInput === correctWord? → いいえ（"Apple" !== "apple"）
  - console.log("不正解...")
```

**注意点**：
- JavaScriptの文字列比較は**大文字・小文字を区別**します
- "apple"と"Apple"は異なる文字列として扱われます

### 入力フィールドの値を取得

HTMLの入力フィールドから、ユーザーの入力を取得します。

```html
<input type="text" id="userInput" placeholder="ここに入力">
```

```javascript
let input = document.getElementById("userInput");

// 入力された値を取得
let userAnswer = input.value;
console.log("入力: " + userAnswer);

// 入力欄をクリア
input.value = "";
```

**実行の流れ**：

```
ユーザーが"banana"と入力してEnter
  ↓
input.valueを取得
  → "banana"
  ↓
userAnswer = "banana"
  ↓
console.log("入力: banana")
  ↓
input.value = ""
  → 入力欄が空になる
```

### Enterキーでの判定

Enterキーが押されたときに、入力をチェックします。

```javascript
let input = document.getElementById("userInput");
let currentWord = "apple";

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    let userAnswer = input.value;

    if (userAnswer === currentWord) {
      console.log("正解!");
      input.value = "";  // 入力欄をクリア
    } else {
      console.log("不正解...");
    }
  }
});
```

**実行の流れ**：

```
currentWord = "apple"が表示されている
  ↓
ユーザーが"apple"と入力
  ↓
Enterキーを押す
  ↓
keypressイベントが発生
  ↓
event.key === "Enter"? → はい
  ↓
userAnswer = input.value → "apple"
  ↓
userAnswer === currentWord? → はい（"apple" === "apple"）
  ↓
console.log("正解!")
  ↓
input.value = "" → 入力欄をクリア
```

---

## ゲームの状態管理

ゲームが開始されているか、終了しているかを管理します。

### フラグ変数の使用

**フラグ変数**とは、真（true）か偽（false）を保存する変数です。

```javascript
let isPlaying = false;  // ゲーム中かどうか
```

**使い方**：

```javascript
// ゲーム開始
function startGame() {
  if (isPlaying) {
    return;  // すでにプレイ中なら何もしない
  }

  isPlaying = true;
  console.log("ゲーム開始!");
  // ゲーム開始処理
}

// ゲーム終了
function endGame() {
  isPlaying = false;
  console.log("ゲーム終了!");
  // ゲーム終了処理
}
```

**実行の流れ**：

```
初期状態：
  - isPlaying = false

startGame()を呼び出す：
  - isPlaying? → false（プレイ中ではない）
  - returnしない（処理を続ける）
  - isPlaying = true
  - console.log("ゲーム開始!")

startGame()を再度呼び出す：
  - isPlaying? → true（プレイ中）
  - return → 処理を終了（重複起動を防ぐ）

endGame()を呼び出す：
  - isPlaying = false
  - console.log("ゲーム終了!")
```

### なぜフラグ変数が必要なのか

**理由1：重複起動を防ぐ**
```javascript
// ❌ フラグなし：何度でも起動できてしまう
function startGame() {
  let timer = setInterval(/* ... */, 1000);
  // タイマーが複数動いてしまう
}

// ✅ フラグあり：1回しか起動できない
function startGame() {
  if (isPlaying) return;  // 既にプレイ中なら何もしない
  isPlaying = true;
  let timer = setInterval(/* ... */, 1000);
}
```

**理由2：条件分岐で使える**
```javascript
function checkInput() {
  if (!isPlaying) {
    return;  // ゲーム中でなければ何もしない
  }

  // ゲーム中だけ実行される処理
  // ...
}
```

**理由3：ゲームの状態を明確にする**
```javascript
if (isPlaying) {
  console.log("ゲーム中です");
} else {
  console.log("ゲームは終了しています");
}
```

---

## ゲームループの概念

**ゲームループ**とは、ゲームの状態を継続的に更新し続ける仕組みです。

### ゲームループの基本パターン

一般的なゲームは、以下のパターンで動作します。

```
while (ゲーム中) {
  1. ユーザー入力を処理
  2. ゲームの状態を更新
  3. 画面を更新
  4. 終了条件をチェック
}
```

**具体例：シューティングゲーム**

```
while (ゲーム中) {
  1. キーボード入力を処理（矢印キーで移動、スペースで発射）
  2. 敵の位置を更新、弾の位置を更新、当たり判定
  3. 画面を再描画（自機、敵、弾を表示）
  4. HPが0なら終了
}
```

### JavaScriptでのゲームループ

JavaScriptでは、`setInterval()`や`requestAnimationFrame()`を使ってゲームループを実現します。

#### setInterval()を使った実装

```javascript
function gameLoop() {
  if (!isPlaying) {
    return;  // ゲーム終了
  }

  // 1. 状態を更新
  updateGame();

  // 2. 画面を更新
  renderGame();

  // 3. 終了条件をチェック
  if (timeLeft <= 0) {
    endGame();
  }
}

// 60FPS（1秒間に60回実行）
let loopTimer = setInterval(gameLoop, 1000 / 60);
```

**実行の流れ**：

```
0秒：
  - setInterval()を開始
  - 16.67ミリ秒（1000÷60）ごとに実行

0.017秒後：
  - gameLoop()を実行
  - isPlaying? → はい
  - updateGame()
  - renderGame()
  - timeLeft <= 0? → いいえ
  - 処理を続ける

0.033秒後：
  - gameLoop()を実行
  - （繰り返し）

...（60回/秒の頻度で繰り返す）

30秒後：
  - gameLoop()を実行
  - timeLeft <= 0? → はい
  - endGame()
  - isPlaying = false

30.017秒後：
  - gameLoop()を実行
  - isPlaying? → いいえ
  - return（処理を終了）
```

### タイピングゲームのゲームループ

今回のタイピングゲームでは、`setInterval()`が2つの役割を果たします。

**1. タイマーの更新（1秒ごと）**
```javascript
let timer = setInterval(function() {
  timeLeft = timeLeft - 1;
  timeDisplay.textContent = timeLeft;

  if (timeLeft <= 0) {
    endGame();
  }
}, 1000);
```

**2. ユーザー入力の処理（イベント駆動）**
```javascript
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    checkInput();
  }
});
```

タイピングゲームは**イベント駆動型**なので、ユーザーが入力したときだけ処理が実行されます。

---

## 実践例：シンプルなタイピングゲーム

HTMLとJavaScriptを組み合わせて、完全なタイピングゲームを実装してみましょう。

### HTML（index.html）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>タイピングゲーム</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
            background-color: #f0f0f0;
        }
        h1 {
            color: #333;
        }
        #word {
            font-size: 48px;
            font-weight: bold;
            margin: 30px 0;
            color: #2196F3;
            min-height: 60px;
        }
        #userInput {
            font-size: 24px;
            padding: 10px;
            width: 300px;
            border: 2px solid #2196F3;
            border-radius: 5px;
        }
        #userInput:disabled {
            background-color: #e0e0e0;
        }
        #info {
            margin-top: 20px;
            font-size: 18px;
        }
        #start {
            font-size: 20px;
            padding: 10px 30px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 20px;
        }
        #start:hover {
            background-color: #45a049;
        }
        .stat {
            display: inline-block;
            margin: 0 20px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>タイピングゲーム</h1>
    <button id="start">スタート</button>

    <div id="word"></div>
    <input type="text" id="userInput" placeholder="ここに入力" disabled>

    <div id="info">
        <span class="stat">残り時間: <span id="time">30</span>秒</span>
        <span class="stat">スコア: <span id="score">0</span></span>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript（script.js）

```javascript
// 要素の取得
let startButton = document.getElementById("start");
let wordDisplay = document.getElementById("word");
let userInput = document.getElementById("userInput");
let timeDisplay = document.getElementById("time");
let scoreDisplay = document.getElementById("score");

// ゲームの状態
let isPlaying = false;
let score = 0;
let timeLeft = 30;
let currentWord = "";
let timer = null;

// 単語リスト
let words = ["apple", "banana", "orange", "grape", "melon",
             "peach", "lemon", "mango", "cherry", "berry"];

// ランダムな単語を選ぶ
function getRandomWord() {
  let randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// 新しい単語を表示
function showNewWord() {
  currentWord = getRandomWord();
  wordDisplay.textContent = currentWord;
}

// タイマー開始
function startTimer() {
  timer = setInterval(function() {
    timeLeft = timeLeft - 1;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// ゲーム開始
function startGame() {
  if (isPlaying) {
    return;  // すでにプレイ中なら何もしない
  }

  // 初期化
  isPlaying = true;
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;

  // 入力欄を有効化
  userInput.disabled = false;
  userInput.value = "";
  userInput.focus();

  // 最初の単語を表示
  showNewWord();

  // タイマー開始
  startTimer();
}

// ゲーム終了
function endGame() {
  isPlaying = false;
  clearInterval(timer);

  // 入力欄を無効化
  userInput.disabled = true;

  // 結果表示
  wordDisplay.textContent = "ゲーム終了! スコア: " + score;
}

// 入力チェック
function checkInput() {
  if (!isPlaying) {
    return;
  }

  let answer = userInput.value;

  if (answer === currentWord) {
    // 正解
    score = score + 1;
    scoreDisplay.textContent = score;

    // 入力欄をクリア
    userInput.value = "";

    // 次の単語を表示
    showNewWord();
  }
}

// イベントリスナー
startButton.addEventListener("click", startGame);

// Enterキーで判定
userInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    checkInput();
  }
});
```

### コードの詳しい説明

#### 変数の宣言と初期化

```javascript
let isPlaying = false;
let score = 0;
let timeLeft = 30;
let currentWord = "";
let timer = null;
```

**各変数の役割**：

| 変数名 | 型 | 初期値 | 説明 |
|--------|-----|-------|------|
| isPlaying | boolean | false | ゲーム中かどうかのフラグ |
| score | number | 0 | 現在のスコア（正解数） |
| timeLeft | number | 30 | 残り時間（秒） |
| currentWord | string | "" | 現在表示している単語 |
| timer | null/number | null | タイマーのID（停止時に使用） |

#### ランダムな単語の取得

```javascript
function getRandomWord() {
  let randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}
```

**実行の詳細**：

```
words = ["apple", "banana", "orange", "grape", "melon",
         "peach", "lemon", "mango", "cherry", "berry"]
words.length = 10

Math.random()を実行
  → 例：0.7234

Math.random() * 10
  → 0.7234 * 10 = 7.234

Math.floor(7.234)
  → 7

words[7]を返す
  → "mango"
```

#### タイマーの実装

```javascript
function startTimer() {
  timer = setInterval(function() {
    timeLeft = timeLeft - 1;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}
```

**実行の流れ**：

```
startTimer()を呼び出す
  ↓
setInterval()を開始
  - 1000ミリ秒（1秒）ごとに実行
  - timerにIDを保存
  ↓
1秒後：
  - timeLeft = 30 - 1 = 29
  - timeDisplay.textContent = 29
  - timeLeft <= 0? → いいえ
  ↓
2秒後：
  - timeLeft = 29 - 1 = 28
  - timeDisplay.textContent = 28
  - timeLeft <= 0? → いいえ
  ↓
...（繰り返し）
  ↓
30秒後：
  - timeLeft = 1 - 1 = 0
  - timeDisplay.textContent = 0
  - timeLeft <= 0? → はい
  - endGame()を呼び出す
```

#### ゲーム開始処理

```javascript
function startGame() {
  if (isPlaying) {
    return;
  }

  isPlaying = true;
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;

  userInput.disabled = false;
  userInput.value = "";
  userInput.focus();

  showNewWord();
  startTimer();
}
```

**実行の詳細**：

```
startGame()を呼び出す
  ↓
isPlaying? → false（ゲーム中ではない）
  - returnしない（処理を続ける）
  ↓
isPlaying = true
  - ゲーム中フラグをON
  ↓
score = 0, timeLeft = 30
  - スコアと時間をリセット
  ↓
scoreDisplay.textContent = 0
timeDisplay.textContent = 30
  - 画面を初期状態に更新
  ↓
userInput.disabled = false
  - 入力欄を有効化
  ↓
userInput.value = ""
  - 入力欄をクリア
  ↓
userInput.focus()
  - 入力欄にフォーカス（カーソルを移動）
  ↓
showNewWord()
  - ランダムな単語を表示
  ↓
startTimer()
  - タイマーを開始
```

#### 入力チェック処理

```javascript
function checkInput() {
  if (!isPlaying) {
    return;
  }

  let answer = userInput.value;

  if (answer === currentWord) {
    score = score + 1;
    scoreDisplay.textContent = score;
    userInput.value = "";
    showNewWord();
  }
}
```

**実行の詳細**：

```
checkInput()を呼び出す
  ↓
isPlaying? → true（ゲーム中）
  - returnしない（処理を続ける）
  ↓
answer = userInput.value
  - 例："apple"
  ↓
answer === currentWord?
  - 例："apple" === "apple" → はい（正解）
  ↓
score = score + 1
  - 例：0 + 1 = 1
  ↓
scoreDisplay.textContent = 1
  - 画面のスコアを更新
  ↓
userInput.value = ""
  - 入力欄をクリア
  ↓
showNewWord()
  - 次の単語を表示
```

#### Enterキーの処理

```javascript
userInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    checkInput();
  }
});
```

**実行の流れ**：

```
ユーザーが"apple"と入力
  ↓
Enterキーを押す
  ↓
keypressイベントが発生
  ↓
event.key === "Enter"? → はい
  ↓
checkInput()を呼び出す
  ↓
（入力チェック処理が実行される）
```

---

## 改善のアイデア

基本的なタイピングゲームができたら、以下のような改善を加えることができます。

### 1. ミスカウントの追加

不正解の回数をカウントして表示します。

```javascript
let mistakes = 0;
let mistakesDisplay = document.getElementById("mistakes");

function checkInput() {
  if (!isPlaying) return;

  let answer = userInput.value;

  if (answer === currentWord) {
    // 正解
    score = score + 1;
    scoreDisplay.textContent = score;
    userInput.value = "";
    showNewWord();
  } else {
    // 不正解
    mistakes = mistakes + 1;
    mistakesDisplay.textContent = mistakes;
  }
}
```

### 2. 難易度の追加

単語の長さや種類で難易度を変えます。

```javascript
// 難易度別の単語リスト
let easyWords = ["cat", "dog", "sun", "moon", "tree"];
let mediumWords = ["apple", "banana", "orange", "grape"];
let hardWords = ["javascript", "programming", "algorithm"];

let currentDifficulty = "easy";
let words = easyWords;

// 難易度を変更
function setDifficulty(level) {
  if (level === "easy") {
    words = easyWords;
  } else if (level === "medium") {
    words = mediumWords;
  } else if (level === "hard") {
    words = hardWords;
  }
}
```

### 3. 制限時間の変更

難易度に応じて時間を変えます。

```javascript
function startGame() {
  // ...

  if (currentDifficulty === "easy") {
    timeLeft = 60;  // 簡単なら60秒
  } else if (currentDifficulty === "medium") {
    timeLeft = 45;  // 普通なら45秒
  } else {
    timeLeft = 30;  // 難しいなら30秒
  }

  // ...
}
```

### 4. ハイスコアの保存

最高記録を保存して表示します。

```javascript
let highScore = 0;
let highScoreDisplay = document.getElementById("highScore");

function endGame() {
  isPlaying = false;
  clearInterval(timer);
  userInput.disabled = true;

  // ハイスコアの更新
  if (score > highScore) {
    highScore = score;
    highScoreDisplay.textContent = highScore;
    wordDisplay.textContent = "新記録! スコア: " + score;
  } else {
    wordDisplay.textContent = "ゲーム終了! スコア: " + score;
  }
}
```

### 5. 視覚的フィードバック

正解・不正解を色で表現します。

```javascript
function checkInput() {
  if (!isPlaying) return;

  let answer = userInput.value;

  if (answer === currentWord) {
    // 正解：緑色に変更
    userInput.style.backgroundColor = "#C8E6C9";

    score = score + 1;
    scoreDisplay.textContent = score;

    setTimeout(function() {
      userInput.style.backgroundColor = "";
      userInput.value = "";
      showNewWord();
    }, 200);
  } else {
    // 不正解：赤色に変更
    userInput.style.backgroundColor = "#FFCDD2";

    setTimeout(function() {
      userInput.style.backgroundColor = "";
    }, 200);
  }
}
```

### 6. 効果音の追加

正解時に音を鳴らします。

```javascript
// 正解時の効果音
let correctSound = new Audio("correct.mp3");

function checkInput() {
  if (!isPlaying) return;

  let answer = userInput.value;

  if (answer === currentWord) {
    correctSound.play();  // 音を鳴らす

    score = score + 1;
    scoreDisplay.textContent = score;
    userInput.value = "";
    showNewWord();
  }
}
```

---

## 練習問題

### 課題：タイピングゲームの作成

これまで学んだ知識を活用して、タイピングゲームを作成してください。

### 保存場所

`exercises/lesson-085/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 必須機能

実装する機能は以下の通りです。

**1. スタートボタン**
- クリックするとゲームが開始
- ゲーム中はクリックしても何も起こらない

**2. 単語の表示**
- ランダムに選んだ単語を表示
- 見やすいフォントサイズと色

**3. 入力欄**
- ゲーム開始前は無効化（disabled）
- ゲーム中は有効化
- ゲーム終了後は無効化

**4. 残り時間の表示**
- 30秒からカウントダウン
- 1秒ごとに更新
- 0秒になったらゲーム終了

**5. スコアの表示**
- 正解するたびに1増える
- 画面にリアルタイムで表示

**6. Enterキーでの判定**
- Enterキーを押すと入力をチェック
- 正解なら次の単語を表示
- 不正解なら何もしない

**7. ゲーム終了**
- 時間切れで終了
- 最終スコアを表示
- タイマーを停止

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-085
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

タイピングゲームを実装する際のポイントを確認しましょう。

#### 時間管理のヒント

```javascript
// タイマーの開始
function startTimer() {
  timer = setInterval(function() {
    timeLeft = timeLeft - 1;
    // 画面を更新

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// タイマーの停止
function endGame() {
  clearInterval(timer);  // 必ず停止
  // ...
}
```

**ポイント**：
- `setInterval()`で1秒ごとに時間を減らす
- タイマーIDを保存して、後で`clearInterval()`で停止
- 時間が0になったらゲームを終了
- 必ずタイマーを停止する

#### 単語の表示のヒント

```javascript
// 単語リストを用意
let words = ["apple", "banana", "orange", "grape", "melon"];

// ランダムな単語を選ぶ
function getRandomWord() {
  let randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// 新しい単語を表示
function showNewWord() {
  currentWord = getRandomWord();
  wordDisplay.textContent = currentWord;
}
```

**ポイント**：
- 配列に単語リストを用意
- `Math.random()`と`Math.floor()`でランダムなインデックスを生成
- 選ばれた単語を`currentWord`に保存
- 画面に表示

#### 入力判定のヒント

```javascript
function checkInput() {
  if (!isPlaying) {
    return;  // ゲーム中でなければ何もしない
  }

  let answer = userInput.value;

  if (answer === currentWord) {
    // 正解
    score = score + 1;
    scoreDisplay.textContent = score;
    userInput.value = "";  // 入力欄をクリア
    showNewWord();  // 次の単語を表示
  }
}
```

**ポイント**：
- `input.value`でユーザーの入力を取得
- 表示されている単語（`currentWord`）と比較
- 正解なら、スコアを増やして次の単語を表示
- 入力欄をクリアする

#### Enterキーの処理のヒント

```javascript
userInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    checkInput();
  }
});
```

**ポイント**：
- `keypress`イベントを使う
- `event.key === "Enter"`で判定
- Enterキーが押されたら`checkInput()`を呼び出す

#### ゲーム開始のヒント

```javascript
function startGame() {
  if (isPlaying) {
    return;  // 重複起動を防ぐ
  }

  // 初期化
  isPlaying = true;
  score = 0;
  timeLeft = 30;

  // 画面を更新
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;

  // 入力欄を有効化
  userInput.disabled = false;
  userInput.value = "";
  userInput.focus();

  // ゲームを開始
  showNewWord();
  startTimer();
}
```

**ポイント**：
- `isPlaying`フラグで重複起動を防ぐ
- スコアと時間をリセット
- 入力欄を有効化してフォーカス
- 単語を表示してタイマーを開始

### 発展課題

基本機能ができたら、以下の機能を追加してみましょう。

**1. ミスカウント**
- 不正解の回数を表示
- 正解率を計算

**2. 難易度選択**
- 簡単・普通・難しいの3段階
- 単語の長さや制限時間を変える

**3. ハイスコア**
- 最高記録を保存
- 新記録達成時にメッセージを表示

**4. 視覚的フィードバック**
- 正解時に入力欄を緑色に
- 不正解時に入力欄を赤色に
- アニメーション効果

**5. 連続正解ボーナス**
- 連続で正解するとボーナスポイント
- コンボカウンターを表示

---

## まとめ

お疲れ様でした。今回のレッスンでは、週のプロジェクトとしてタイピングゲームを作成しました。

### 今回学んだキーポイント

1. **タイピングゲームの実装**
   - 単語のランダム表示
   - ユーザー入力の判定
   - スコアの管理
   - これまで学んだ技術を総合的に活用

2. **時間制限の実装**
   - `setInterval()`で1秒ごとに処理を実行
   - カウントダウンタイマーの実装
   - 必ず`clearInterval()`で停止する
   - タイマーIDを変数に保存

3. **スコア計算**
   - 正解数をカウント
   - 画面にリアルタイムで表示
   - ゲーム終了時に最終スコアを表示

4. **ゲームループの概念**
   - ゲームの状態を継続的に更新
   - イベント駆動型の処理
   - フラグ変数での状態管理
   - 終了条件のチェック

5. **実践的なスキル**
   - `Math.random()`でランダムな選択
   - `input.value`で入力値を取得
   - `disabled`で入力欄の有効/無効を切り替え
   - `focus()`でフォーカスを移動

### カリキュラム項目の確認

- ✅ **タイピングゲーム**：単語のランダム表示、入力判定、スコア管理を実装しました
- ✅ **時間制限**：setInterval()を使ったカウントダウンタイマーを実装しました
- ✅ **スコア計算**：正解数をカウントして画面に表示する機能を実装しました
- ✅ **知識：ゲームループ**：ゲームの状態を継続的に更新する仕組みを理解しました
- ✅ **知識：時間管理**：setInterval()とclearInterval()の使い方を習得しました
- ✅ **成果物：タイピング練習**：完全に動作するタイピングゲームを作成しました

### 重要なポイント

**タイピングゲームを作る手順**：

1. **設計する**
   - 必要な要素をリストアップ
   - ゲームの流れを考える
   - 変数と関数を設計

2. **HTMLを作る**
   - スタートボタン
   - 単語表示エリア
   - 入力欄
   - スコア・時間の表示

3. **JavaScriptを実装**
   - 変数の宣言
   - ランダムな単語の選択
   - タイマーの実装
   - 入力判定の処理
   - ゲーム開始・終了の処理

4. **テストする**
   - 各機能が正しく動くか確認
   - バグを修正
   - 改善点を見つける

**よくある実装パターン**：

```javascript
// パターン1：タイマーの実装
let timer = setInterval(function() {
  timeLeft = timeLeft - 1;
  if (timeLeft <= 0) {
    clearInterval(timer);
    endGame();
  }
}, 1000);

// パターン2：ランダムな選択
let randomIndex = Math.floor(Math.random() * array.length);
let randomItem = array[randomIndex];

// パターン3：フラグ変数での状態管理
let isPlaying = false;
if (isPlaying) return;  // 重複起動を防ぐ
isPlaying = true;
```

### 次のステップ

次のレッスンでは、**配列**について学びます。

- 配列の作成と操作
- 複数のデータをまとめて管理
- ループと配列の組み合わせ

タイピングゲームで使った単語リストも配列の一種です。配列を理解することで、より高度なプログラムを作成できるようになります。

**練習問題を解いて、タイピングゲームを完成させましょう！**
