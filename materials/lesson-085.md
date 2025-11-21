---
title: "Lesson 085: 週のプロジェクト - タイピングゲーム"
author: "JavaScript学習教材"
date: "2025-01-21"
---

# レッスン85：週のプロジェクト - タイピングゲーム

## 今回の学習

### 前回の復習

前回のレッスンでは、ループのパフォーマンスについて学びました。

- **計算量の概念**：ループの回数が増えると処理時間が急激に増えます。特に二重ループ（O(n²)）は注意が必要です
- **効率的なコード**：ループ内で不要な処理を避けることで、パフォーマンスを向上できます
- **最適化の基本**：DOM要素の取得は事前に行い、不要な計算をループの外に出すことが重要です
- **成果物**：効率的ループ - 処理時間を計測して、効率的なループの書き方を実践しました

### 今回の目標

今回のレッスンは、週のプロジェクトとしてタイピングゲームを作成します。これまで学んだループ、条件分岐、イベント処理、時間管理などの知識を総合的に活用します。

- タイピングゲームの仕組みを理解する
- 時間制限のあるプログラムを作成する
- スコア計算の実装方法を学ぶ
- ゲームループの概念を習得する

## タイピングゲームとは

**タイピングゲーム**は、画面に表示される文字を制限時間内に正確に入力するゲームです。プログラミングの基本的な要素が詰まっているため、学習に最適なプロジェクトです。

### タイピングゲームの基本要素

1. **問題の表示**：ランダムまたは順番に単語を表示
2. **ユーザー入力**：キーボードからの入力を受け取る
3. **入力の判定**：正解か不正解かを判定
4. **スコア管理**：正解数や誤入力数をカウント
5. **時間管理**：制限時間を設定し、カウントダウン
6. **ゲームループ**：ゲームの状態を継続的に更新

## ゲームの設計

タイピングゲームを作る前に、どのような機能が必要か考えてみましょう。

### 必要な要素

```
1. 問題となる単語のリスト
2. 現在表示している単語
3. ユーザーの入力欄
4. スコア表示
5. 残り時間の表示
6. スタートボタン
7. ゲーム開始/終了の状態管理
```

### ゲームの流れ

```
スタート
  ↓
制限時間を設定
  ↓
問題を表示
  ↓
ユーザー入力を待つ
  ↓
入力内容をチェック
  ↓
正解なら次の問題へ
  ↓
時間切れまで繰り返す
  ↓
結果を表示
```

## 時間管理

ゲームには制限時間があり、時間が経過するとゲームが終了します。

### setIntervalの使い方

`setInterval()`は、一定時間ごとに関数を繰り返し実行する機能です。

```javascript
// 1秒(1000ミリ秒)ごとに実行
let intervalId = setInterval(function() {
  console.log("1秒経過");
}, 1000);

// 繰り返しを止める
clearInterval(intervalId);
```

### カウントダウンタイマーの実装

```javascript
let timeLeft = 30;  // 30秒

let timer = setInterval(function() {
  timeLeft = timeLeft - 1;  // 1秒減らす
  console.log("残り時間: " + timeLeft + "秒");

  if (timeLeft <= 0) {
    clearInterval(timer);  // タイマーを停止
    console.log("ゲーム終了!");
  }
}, 1000);
```

### 重要な注意点

- `setInterval()`は繰り返し実行されるため、必ず`clearInterval()`で止める必要があります
- タイマーIDを変数に保存しておくことで、後から停止できます
- ゲーム終了時は必ずタイマーを停止しましょう

## 単語のランダム表示

問題となる単語をランダムに選んで表示します。

### 配列からランダムに選ぶ

```javascript
let words = ["apple", "banana", "orange", "grape", "melon"];

// ランダムなインデックスを生成
let randomIndex = Math.floor(Math.random() * words.length);

// ランダムな単語を取得
let randomWord = words[randomIndex];
console.log(randomWord);
```

### Math.random()の詳しい説明

```javascript
// Math.random()は0以上1未満の小数を返す
Math.random();  // 例: 0.7234567

// 配列の長さをかけると、0以上length未満になる
Math.random() * 5;  // 例: 3.6172835

// Math.floor()で小数点以下を切り捨て
Math.floor(Math.random() * 5);  // 例: 3（0〜4の整数）
```

この方法で、配列のインデックスとして使える整数が得られます。

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

### 入力フィールドの値を取得

```javascript
let input = document.getElementById("userInput");

// 入力された値を取得
let userAnswer = input.value;

// 入力欄をクリア
input.value = "";
```

## スコアの管理

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

### 画面への表示

```javascript
let scoreDisplay = document.getElementById("score");
scoreDisplay.textContent = "スコア: " + score;
```

## ゲームの状態管理

ゲームが開始されているか、終了しているかを管理します。

### フラグ変数の使用

```javascript
let isPlaying = false;  // ゲーム中かどうか

// ゲーム開始
function startGame() {
  if (isPlaying) {
    return;  // すでにプレイ中なら何もしない
  }

  isPlaying = true;
  // ゲーム開始処理
}

// ゲーム終了
function endGame() {
  isPlaying = false;
  // ゲーム終了処理
}
```

フラグ変数を使うことで、重複したゲーム開始を防げます。

## 実践例：シンプルなタイピングゲーム

HTMLとJavaScriptを組み合わせて、タイピングゲームを実装してみましょう。

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
        }
        #word {
            font-size: 48px;
            font-weight: bold;
            margin: 30px 0;
            color: #333;
        }
        #userInput {
            font-size: 24px;
            padding: 10px;
            width: 300px;
        }
        #info {
            margin-top: 20px;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <h1>タイピングゲーム</h1>
    <button id="start">スタート</button>

    <div id="word"></div>
    <input type="text" id="userInput" placeholder="ここに入力" disabled>

    <div id="info">
        <p>残り時間: <span id="time">30</span>秒</p>
        <p>スコア: <span id="score">0</span></p>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

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

**ゲームの状態管理**
```javascript
let isPlaying = false;
let score = 0;
let timeLeft = 30;
let currentWord = "";
let timer = null;
```
- `isPlaying`: ゲーム中かどうかを示すフラグ
- `score`: 現在のスコア
- `timeLeft`: 残り時間（秒）
- `currentWord`: 現在表示している単語
- `timer`: タイマーのID（停止時に使用）

**ランダムな単語の取得**
```javascript
function getRandomWord() {
  let randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}
```
配列からランダムに単語を選んで返します。

**タイマーの実装**
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
1秒ごとに`timeLeft`を減らし、0以下になったらゲームを終了します。

**入力判定**
```javascript
function checkInput() {
  let answer = userInput.value;

  if (answer === currentWord) {
    score = score + 1;
    scoreDisplay.textContent = score;
    userInput.value = "";
    showNewWord();
  }
}
```
ユーザーの入力が正解なら、スコアを増やして次の単語を表示します。

**Enterキーでの判定**
```javascript
userInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    checkInput();
  }
});
```
Enterキーが押されたら、入力をチェックします。

## 改善のアイデア

基本的なタイピングゲームができたら、以下のような改善を加えることができます。

### 1. 難易度の追加

```javascript
// 難易度別の単語リスト
let easyWords = ["cat", "dog", "sun", "moon"];
let hardWords = ["javascript", "programming", "algorithm"];
```

### 2. ミスのカウント

```javascript
let mistakes = 0;

// 不正解の時
if (answer !== currentWord) {
  mistakes = mistakes + 1;
}
```

### 3. 制限時間の変更

```javascript
// 難易度に応じて時間を変える
let timeLeft = difficulty === "easy" ? 60 : 30;
```

### 4. ハイスコアの保存

```javascript
let highScore = 0;

if (score > highScore) {
  highScore = score;
  console.log("新記録!");
}
```

### 5. 効果音の追加

```javascript
// 正解時の効果音
let correctSound = new Audio("correct.mp3");
correctSound.play();
```

## ゲームループの概念

**ゲームループ**とは、ゲームの状態を継続的に更新し続ける仕組みです。

### ゲームループの基本パターン

```
while (ゲーム中) {
  1. ユーザー入力を処理
  2. ゲームの状態を更新
  3. 画面を更新
  4. 終了条件をチェック
}
```

### JavaScriptでの実装

```javascript
function gameLoop() {
  if (!isPlaying) {
    return;  // ゲーム終了
  }

  // 状態を更新
  updateGame();

  // 画面を更新
  renderGame();

  // 次のフレームで再度実行
  requestAnimationFrame(gameLoop);
}
```

今回のタイピングゲームでは、`setInterval()`がゲームループの役割を果たしています。

## 練習問題

### 課題：タイピングゲームの作成

これまで学んだ知識を活用して、タイピングゲームを作成してください。

### 保存場所

`exercises/lesson-085/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. タイピングゲームの仕組みを理解する
2. 時間制限のある処理を実装する
3. スコア計算を組み込む

### 必須機能

- スタートボタン
- 単語の表示
- 入力欄
- 残り時間の表示
- スコアの表示
- 30秒の制限時間
- Enterキーでの判定

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-085
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

タイピングゲームを実装する際のポイントを確認しましょう。

**時間管理**
- `setInterval()`で1秒ごとに時間を減らします
- タイマーIDを保存して、後で`clearInterval()`で停止します
- 時間が0になったらゲームを終了します

**単語の表示**
- 配列に単語リストを用意します
- `Math.random()`と`Math.floor()`でランダムなインデックスを生成します
- 選ばれた単語を画面に表示します

**入力判定**
- `input.value`でユーザーの入力を取得します
- 表示されている単語と比較します
- 正解なら、スコアを増やして次の単語を表示します

**Enterキーの処理**
- `keypress`イベントを使います
- `event.key === "Enter"`で判定します
- 正解なら入力欄をクリアします

### 発展課題

基本機能ができたら、以下の機能を追加してみましょう。

1. ミスカウントの追加
2. 難易度選択（単語の長さを変える）
3. ハイスコアの表示
4. 正解/不正解の視覚的フィードバック

## まとめ

お疲れ様でした。今回のレッスンでは、週のプロジェクトとしてタイピングゲームを作成しました。

**今回学んだキーポイント**

- **ゲームループ**：`setInterval()`を使って、ゲームの状態を継続的に更新する仕組みを学びました
- **時間管理**：制限時間を設定し、カウントダウンする方法を理解しました。必ず`clearInterval()`で停止することが重要です
- **スコア計算**：正解数をカウントして表示する方法を実践しました
- **状態管理**：`isPlaying`フラグを使って、ゲームの開始/終了を管理する方法を学びました

タイピングゲームは、プログラミングの基本的な要素が多く含まれており、実践的な学習に最適です。これまで学んだループ、条件分岐、イベント処理の知識を総合的に活用できました。

次のレッスンでは、新しいトピックに進んでいきます。引き続き頑張りましょう！
