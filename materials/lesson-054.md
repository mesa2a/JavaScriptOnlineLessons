# レッスン54: じゃんけんゲーム

## このレッスンで学ぶこと

じゃんけんゲームを作成します。ユーザーの選択とコンピュータの選択を比較して、勝敗を判定するプログラムです。複数の条件分岐を組み合わせる良い練習になります。

## じゃんけんのルール

### 基本ルール

- グー vs チョキ → グーの勝ち
- チョキ vs パー → チョキの勝ち
- パー vs グー → パーの勝ち
- 同じ手 → あいこ

## シンプルなじゃんけん

まずは、ユーザーの手とコンピュータの手が固定されている例から始めます。

```javascript
function judge() {
  const playerHand = "グー";
  const computerHand = "チョキ";
  const result = document.getElementById("result");

  // あいこチェック
  if (playerHand === computerHand) {
    result.textContent = "あいこです";
    return;
  }

  // プレイヤーの勝ち条件
  if (playerHand === "グー" && computerHand === "チョキ") {
    result.textContent = "あなたの勝ちです！";
  } else if (playerHand === "チョキ" && computerHand === "パー") {
    result.textContent = "あなたの勝ちです！";
  } else if (playerHand === "パー" && computerHand === "グー") {
    result.textContent = "あなたの勝ちです！";
  } else {
    result.textContent = "コンピュータの勝ちです";
  }
}
```

## 勝敗判定のロジック

### パターン1: すべての組み合わせを書く

```javascript
function judge(playerHand, computerHand) {
  // あいこ
  if (playerHand === computerHand) {
    return "あいこ";
  }

  // プレイヤーの勝ち
  if (playerHand === "グー" && computerHand === "チョキ") {
    return "勝ち";
  }
  if (playerHand === "チョキ" && computerHand === "パー") {
    return "勝ち";
  }
  if (playerHand === "パー" && computerHand === "グー") {
    return "勝ち";
  }

  // それ以外は負け
  return "負け";
}
```

### パターン2: 負けの条件で判定

```javascript
function judge(playerHand, computerHand) {
  // あいこ
  if (playerHand === computerHand) {
    return "あいこ";
  }

  // プレイヤーの負け
  if (playerHand === "グー" && computerHand === "パー") {
    return "負け";
  }
  if (playerHand === "チョキ" && computerHand === "グー") {
    return "負け";
  }
  if (playerHand === "パー" && computerHand === "チョキ") {
    return "負け";
  }

  // それ以外は勝ち
  return "勝ち";
}
```

## 入力を受け取る

ユーザーから手を入力してもらいます。

```javascript
function play() {
  const playerHand = document.getElementById("playerHand").value;
  const computerHand = "グー";  // 固定
  const result = document.getElementById("result");

  // 入力検証
  if (playerHand !== "グー" && playerHand !== "チョキ" && playerHand !== "パー") {
    result.textContent = "「グー」「チョキ」「パー」のいずれかを入力してください";
    return;
  }

  // 勝敗判定
  if (playerHand === computerHand) {
    result.textContent = "あいこです";
  } else if (
    (playerHand === "グー" && computerHand === "チョキ") ||
    (playerHand === "チョキ" && computerHand === "パー") ||
    (playerHand === "パー" && computerHand === "グー")
  ) {
    result.textContent = "あなたの勝ちです！";
  } else {
    result.textContent = "コンピュータの勝ちです";
  }
}
```

## 実践問題

以下の要件を満たすじゃんけんゲームを作成してください。

### 問題: じゃんけん判定機

**仕様:**
- ユーザーが「グー」「チョキ」「パー」のいずれかを入力
- コンピュータの手は「グー」で固定
- 勝敗を判定して表示

**HTMLの構成:**
- id="playerHand" のinput要素(プレイヤーの手を入力)
- id="result" の結果表示エリア
- id="error" のエラー表示エリア

**動作:**
1. 入力が「グー」「チョキ」「パー」以外: エラーメッセージ
2. あいこ: "あいこです"
3. 勝ち: "あなたの勝ちです！"
4. 負け: "コンピュータの勝ちです"

## 結果の詳細表示

どの手を出したかも表示すると、よりわかりやすくなります。

```javascript
function play() {
  const playerHand = document.getElementById("playerHand").value;
  const computerHand = "グー";
  const result = document.getElementById("result");

  // 入力検証
  if (playerHand !== "グー" && playerHand !== "チョキ" && playerHand !== "パー") {
    result.textContent = "「グー」「チョキ」「パー」のいずれかを入力してください";
    return;
  }

  // 手を表示
  let message = "あなた: " + playerHand + "\n";
  message = message + "コンピュータ: " + computerHand + "\n\n";

  // 勝敗判定
  if (playerHand === computerHand) {
    message = message + "結果: あいこです";
  } else if (
    (playerHand === "グー" && computerHand === "チョキ") ||
    (playerHand === "チョキ" && computerHand === "パー") ||
    (playerHand === "パー" && computerHand === "グー")
  ) {
    message = message + "結果: あなたの勝ちです！";
  } else {
    message = message + "結果: コンピュータの勝ちです";
  }

  result.textContent = message;
}
```

## 条件の整理

複雑な条件は、変数に分けると読みやすくなります。

```javascript
function play() {
  const playerHand = document.getElementById("playerHand").value;
  const computerHand = "グー";
  const result = document.getElementById("result");

  // あいこかどうか
  const isDraw = playerHand === computerHand;

  // プレイヤーの勝ち条件
  const playerWinsWithRock = playerHand === "グー" && computerHand === "チョキ";
  const playerWinsWithScissors = playerHand === "チョキ" && computerHand === "パー";
  const playerWinsWithPaper = playerHand === "パー" && computerHand === "グー";
  const playerWins = playerWinsWithRock || playerWinsWithScissors || playerWinsWithPaper;

  if (isDraw) {
    result.textContent = "あいこです";
  } else if (playerWins) {
    result.textContent = "あなたの勝ちです！";
  } else {
    result.textContent = "コンピュータの勝ちです";
  }
}
```

## ボタンで選択する

input要素の代わりに、ボタンで手を選択することもできます。

```html
<button onclick="play('グー')">グー</button>
<button onclick="play('チョキ')">チョキ</button>
<button onclick="play('パー')">パー</button>
```

```javascript
function play(playerHand) {
  const computerHand = "グー";
  const result = document.getElementById("result");

  let message = "あなた: " + playerHand + "\n";
  message = message + "コンピュータ: " + computerHand + "\n\n";

  if (playerHand === computerHand) {
    message = message + "あいこです";
  } else if (
    (playerHand === "グー" && computerHand === "チョキ") ||
    (playerHand === "チョキ" && computerHand === "パー") ||
    (playerHand === "パー" && computerHand === "グー")
  ) {
    message = message + "あなたの勝ちです！";
  } else {
    message = message + "コンピュータの勝ちです";
  }

  result.textContent = message;
}
```

## 発展課題

基本的なじゃんけんゲームができたら、以下の機能を追加してみましょう:

### 1. 勝敗カウント

```javascript
let wins = 0;
let losses = 0;
let draws = 0;

function play(playerHand) {
  const computerHand = "グー";
  const result = document.getElementById("result");

  if (playerHand === computerHand) {
    draws = draws + 1;
    result.textContent = "あいこです";
  } else if (
    (playerHand === "グー" && computerHand === "チョキ") ||
    (playerHand === "チョキ" && computerHand === "パー") ||
    (playerHand === "パー" && computerHand === "グー")
  ) {
    wins = wins + 1;
    result.textContent = "あなたの勝ちです！";
  } else {
    losses = losses + 1;
    result.textContent = "コンピュータの勝ちです";
  }

  const stats = document.getElementById("stats");
  stats.textContent = "勝ち: " + wins + " / 負け: " + losses + " / あいこ: " + draws;
}
```

### 2. リセット機能

```javascript
function reset() {
  wins = 0;
  losses = 0;
  draws = 0;
  document.getElementById("result").textContent = "";
  document.getElementById("stats").textContent = "";
}
```

### 3. ランダムな手(次のレッスンで)

コンピュータの手をランダムにする方法は、次のレッスン(おみくじアプリ)で学びます。

## じゃんけんゲームのポイント

### 1. すべてのパターンを考える

じゃんけんには9つのパターンがあります:
- グー vs グー (あいこ)
- グー vs チョキ (勝ち)
- グー vs パー (負け)
- チョキ vs グー (負け)
- チョキ vs チョキ (あいこ)
- チョキ vs パー (勝ち)
- パー vs グー (勝ち)
- パー vs チョキ (負け)
- パー vs パー (あいこ)

### 2. あいこを先にチェック

あいこは簡単に判定できるので、最初にチェックすると良いです。

```javascript
if (playerHand === computerHand) {
  return "あいこ";
}
```

### 3. 勝ちまたは負けのどちらかを判定

勝ちの条件をすべて書いて、それ以外を負けにする方法が一般的です。

## まとめ

- じゃんけんゲームは複数の条件分岐の良い練習です
- あいこ、勝ち、負けの3つの結果があります
- 入力検証で正しい手かをチェックしましょう
- 条件を変数に分けると読みやすくなります
- ボタンで手を選択すると使いやすくなります

次のレッスンでは、ランダムな値を生成するおみくじアプリを作成します。

