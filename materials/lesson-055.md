# レッスン55: おみくじアプリ

## このレッスンで学ぶこと

乱数を生成して、ランダムな結果を表示するおみくじアプリを作成します。`Math.random()`という新しい関数を使って、毎回異なる結果を得る方法を学びます。

## Math.random()とは

`Math.random()`は、0以上1未満のランダムな数値を返す関数です。

```javascript
let random = Math.random();
console.log(random);  // 0.3456789... のような数値
```

実行するたびに異なる値が返されます。

## 乱数の範囲を調整する

### 0から9までの整数を生成

```javascript
let random = Math.random();  // 0以上1未満
let scaled = random * 10;     // 0以上10未満
let result = Math.floor(scaled);  // 小数点以下を切り捨て

console.log(result);  // 0〜9のいずれか
```

`Math.floor()`は小数点以下を切り捨てる関数です。

### 1から6までの整数(サイコロ)

```javascript
let random = Math.random();
let scaled = random * 6;      // 0以上6未満
let floored = Math.floor(scaled);  // 0〜5
let result = floored + 1;     // 1〜6

console.log(result);
```

短く書くと:

```javascript
let result = Math.floor(Math.random() * 6) + 1;
```

## 基本的なおみくじ

### 例1: 3種類の運勢

```javascript
function drawOmikuji() {
  const result = document.getElementById("result");

  // 0, 1, 2 のいずれかを生成
  const random = Math.floor(Math.random() * 3);

  if (random === 0) {
    result.textContent = "大吉";
  } else if (random === 1) {
    result.textContent = "中吉";
  } else {
    result.textContent = "凶";
  }
}
```

### 例2: 5種類の運勢

```javascript
function drawOmikuji() {
  const result = document.getElementById("result");

  // 0〜4 のいずれかを生成
  const random = Math.floor(Math.random() * 5);

  if (random === 0) {
    result.textContent = "大吉";
  } else if (random === 1) {
    result.textContent = "中吉";
  } else if (random === 2) {
    result.textContent = "小吉";
  } else if (random === 3) {
    result.textContent = "末吉";
  } else {
    result.textContent = "凶";
  }
}
```

## 範囲による判定

数値の範囲で判定することもできます。

```javascript
function drawOmikuji() {
  const result = document.getElementById("result");

  // 0以上1未満の小数
  const random = Math.random();

  if (random < 0.2) {
    result.textContent = "大吉";  // 20%
  } else if (random < 0.5) {
    result.textContent = "中吉";  // 30%
  } else if (random < 0.8) {
    result.textContent = "小吉";  // 30%
  } else {
    result.textContent = "凶";    // 20%
  }
}
```

この方法だと、確率を調整しやすくなります。

## 実践問題

以下の要件を満たすおみくじアプリを作成してください。

### 問題: おみくじアプリ

**仕様:**
- ボタンを押すとランダムに運勢が表示される
- 運勢の種類: 「大吉」「中吉」「小吉」「凶」の4種類
- 各運勢は等しい確率で出る

**HTMLの構成:**
- id="result" の結果表示エリア
- onclick="drawOmikuji()" のボタン

**動作:**
1. Math.random()で乱数を生成
2. 0〜3の整数に変換
3. 数値に応じて運勢を表示

## メッセージを追加する

運勢だけでなく、メッセージも表示すると楽しくなります。

```javascript
function drawOmikuji() {
  const result = document.getElementById("result");

  const random = Math.floor(Math.random() * 4);

  let fortune = "";
  let message = "";

  if (random === 0) {
    fortune = "大吉";
    message = "素晴らしい一日になるでしょう";
  } else if (random === 1) {
    fortune = "中吉";
    message = "良いことがありそうです";
  } else if (random === 2) {
    fortune = "小吉";
    message = "穏やかな一日になりそうです";
  } else {
    fortune = "凶";
    message = "注意して過ごしましょう";
  }

  result.textContent = fortune + "\n" + message;
}
```

## 色を変える

運勢によって表示色を変えることもできます。

```javascript
function drawOmikuji() {
  const result = document.getElementById("result");

  const random = Math.floor(Math.random() * 4);

  if (random === 0) {
    result.textContent = "大吉";
    result.style.color = "gold";
  } else if (random === 1) {
    result.textContent = "中吉";
    result.style.color = "orange";
  } else if (random === 2) {
    result.textContent = "小吉";
    result.style.color = "green";
  } else {
    result.textContent = "凶";
    result.style.color = "gray";
  }
}
```

## 乱数の範囲指定の公式

n以上m未満の整数を生成する公式:

```javascript
Math.floor(Math.random() * (m - n)) + n
```

例:
- 1〜6: `Math.floor(Math.random() * 6) + 1`
- 10〜20: `Math.floor(Math.random() * 11) + 10`
- 50〜100: `Math.floor(Math.random() * 51) + 50`

## 発展課題

基本的なおみくじアプリができたら、以下の機能を追加してみましょう:

### 1. 今日の運勢の詳細

```javascript
function drawOmikuji() {
  const result = document.getElementById("result");

  const random = Math.floor(Math.random() * 4);

  let fortune = "";
  let love = "";
  let money = "";
  let health = "";

  if (random === 0) {
    fortune = "大吉";
    love = "恋愛運: 最高";
    money = "金運: 良好";
    health = "健康運: 絶好調";
  } else if (random === 1) {
    fortune = "中吉";
    love = "恋愛運: 良い";
    money = "金運: 普通";
    health = "健康運: 良好";
  } else if (random === 2) {
    fortune = "小吉";
    love = "恋愛運: 普通";
    money = "金運: やや良い";
    health = "健康運: 普通";
  } else {
    fortune = "凶";
    love = "恋愛運: 注意";
    money = "金運: 控えめに";
    health = "健康運: 休息を";
  }

  result.textContent = fortune + "\n\n" + love + "\n" + money + "\n" + health;
}
```

### 2. ラッキーナンバー

```javascript
function drawOmikuji() {
  const result = document.getElementById("result");

  const fortuneRandom = Math.floor(Math.random() * 4);
  const luckyNumber = Math.floor(Math.random() * 100) + 1;

  let fortune = "";

  if (fortuneRandom === 0) {
    fortune = "大吉";
  } else if (fortuneRandom === 1) {
    fortune = "中吉";
  } else if (fortuneRandom === 2) {
    fortune = "小吉";
  } else {
    fortune = "凶";
  }

  result.textContent = fortune + "\nラッキーナンバー: " + luckyNumber;
}
```

### 3. もう一度引くボタン

HTMLに追加:
```html
<button onclick="reset()">リセット</button>
```

JavaScriptに追加:
```javascript
function reset() {
  document.getElementById("result").textContent = "";
}
```

## じゃんけんゲームへの応用

前回のじゃんけんゲームに乱数を使って、コンピュータの手をランダムにできます。

```javascript
function play(playerHand) {
  const result = document.getElementById("result");

  // コンピュータの手をランダムに決める
  const random = Math.floor(Math.random() * 3);
  let computerHand = "";

  if (random === 0) {
    computerHand = "グー";
  } else if (random === 1) {
    computerHand = "チョキ";
  } else {
    computerHand = "パー";
  }

  // 勝敗判定
  if (playerHand === computerHand) {
    result.textContent = "あいこです\nコンピュータ: " + computerHand;
  } else if (
    (playerHand === "グー" && computerHand === "チョキ") ||
    (playerHand === "チョキ" && computerHand === "パー") ||
    (playerHand === "パー" && computerHand === "グー")
  ) {
    result.textContent = "あなたの勝ちです！\nコンピュータ: " + computerHand;
  } else {
    result.textContent = "コンピュータの勝ちです\nコンピュータ: " + computerHand;
  }
}
```

## Math.random()のポイント

### 1. 0以上1未満

```javascript
let random = Math.random();
// 0 <= random < 1
// 0は含む、1は含まない
```

### 2. Math.floor()で整数に

```javascript
let random = Math.random();    // 0.7654...
let floored = Math.floor(random * 10);  // 7
```

### 3. 範囲の調整

```javascript
// 0〜9
Math.floor(Math.random() * 10)

// 1〜10
Math.floor(Math.random() * 10) + 1

// 5〜15
Math.floor(Math.random() * 11) + 5
```

## まとめ

- `Math.random()`は0以上1未満のランダムな数値を返します
- `Math.floor()`で小数点以下を切り捨てて整数にできます
- `Math.floor(Math.random() * n)`で0〜n-1の整数が得られます
- 範囲指定の公式: `Math.floor(Math.random() * (m - n)) + n`
- おみくじやゲームなど、ランダム性が必要なアプリに使えます

次のレッスンでは、switch文について学びます。

