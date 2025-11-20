# レッスン53: クイズアプリ

## このレッスンで学ぶこと

これまで学んだ条件分岐と入力検証の知識を使って、実用的なクイズアプリを作成します。問題を表示し、ユーザーの答えをチェックして、正解・不正解を判定するプログラムです。

## クイズアプリの構成

### 基本要素

1. **問題の表示**: ユーザーに問題を見せる
2. **答えの入力**: ユーザーが答えを入力する
3. **答えのチェック**: 正解と比較する
4. **結果の表示**: 正解か不正解かを伝える

## シンプルなクイズアプリ

### 例1: 基本的なクイズ

```javascript
function checkAnswer() {
  const answer = document.getElementById("answer").value;
  const result = document.getElementById("result");

  const correctAnswer = "東京";

  if (answer === correctAnswer) {
    result.textContent = "正解です！";
  } else {
    result.textContent = "不正解です";
  }
}
```

この例では:
- 正解が「東京」
- ユーザーの答えと比較
- 一致すれば「正解」、異なれば「不正解」

### 例2: 大文字・小文字を区別しない

```javascript
function checkAnswer() {
  const answer = document.getElementById("answer").value;
  const result = document.getElementById("result");

  const correctAnswer = "tokyo";

  // 小文字に変換して比較
  if (answer.toLowerCase() === correctAnswer) {
    result.textContent = "正解です！";
  } else {
    result.textContent = "不正解です";
  }
}
```

`toLowerCase()` を使うと、「Tokyo」「TOKYO」「tokyo」すべて正解になります。

### 例3: 数値のクイズ

```javascript
function checkAnswer() {
  const answerValue = document.getElementById("answer").value;
  const result = document.getElementById("result");

  const answer = Number(answerValue);
  const correctAnswer = 42;

  if (answer === correctAnswer) {
    result.textContent = "正解です！";
  } else {
    result.textContent = "不正解です";
  }
}
```

## 入力検証付きクイズ

実用的なクイズアプリには、入力検証が必要です。

```javascript
function checkAnswer() {
  const answer = document.getElementById("answer").value;
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  // 結果とエラーをクリア
  result.textContent = "";
  error.textContent = "";

  // 空文字チェック
  if (answer === "") {
    error.textContent = "答えを入力してください";
    return;
  }

  // 答えのチェック
  const correctAnswer = "東京";

  if (answer === correctAnswer) {
    result.textContent = "○ 正解です！";
  } else {
    result.textContent = "× 不正解です";
  }
}
```

## フィードバックの工夫

### 例1: 詳しい説明を追加

```javascript
function checkAnswer() {
  const answer = document.getElementById("answer").value;
  const result = document.getElementById("result");

  const correctAnswer = "富士山";

  if (answer === correctAnswer) {
    result.textContent = "○ 正解です！\n富士山は標高3,776mの日本一高い山です。";
  } else {
    result.textContent = "× 不正解です\n正解は「富士山」でした。";
  }
}
```

### 例2: ヒント機能

```javascript
function showHint() {
  const hint = document.getElementById("hint");
  hint.textContent = "ヒント: 日本の首都です";
}

function checkAnswer() {
  const answer = document.getElementById("answer").value;
  const result = document.getElementById("result");

  if (answer === "東京") {
    result.textContent = "○ 正解です！";
  } else {
    result.textContent = "× 不正解です";
  }
}
```

## 複数の正解を許容する

場合によっては、複数の答えを正解にしたいことがあります。

### 方法1: OR演算子を使う

```javascript
function checkAnswer() {
  const answer = document.getElementById("answer").value;
  const result = document.getElementById("result");

  // 「東京」または「Tokyo」または「tokyo」を正解とする
  if (answer === "東京" || answer === "Tokyo" || answer === "tokyo") {
    result.textContent = "○ 正解です！";
  } else {
    result.textContent = "× 不正解です";
  }
}
```

### 方法2: toLowerCase() を使う

```javascript
function checkAnswer() {
  const answer = document.getElementById("answer").value.toLowerCase();
  const result = document.getElementById("result");

  // 小文字に統一して比較
  if (answer === "tokyo" || answer === "東京") {
    result.textContent = "○ 正解です！";
  } else {
    result.textContent = "× 不正解です";
  }
}
```

## 実践問題

以下の要件を満たすクイズアプリを作成してください。

### 問題: 1問クイズアプリ

**問題:**
「日本の首都はどこですか？」

**正解:**
「東京」(大文字・小文字は区別しない)

**HTMLの構成:**
- 問題文を表示
- id="answer" のinput要素(答え入力用)
- id="result" の結果表示エリア
- id="error" のエラー表示エリア

**動作:**
1. 答えが空の場合: エラーメッセージ
2. 答えが「東京」の場合: 「○ 正解です！」
3. それ以外: 「× 不正解です。正解は「東京」です。」

## 数値問題のクイズ

### 例1: 計算問題

```javascript
function checkAnswer() {
  const answerValue = document.getElementById("answer").value;
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  error.textContent = "";
  result.textContent = "";

  // 空文字チェック
  if (answerValue === "") {
    error.textContent = "答えを入力してください";
    return;
  }

  // 数値チェック
  const answer = Number(answerValue);
  if (isNaN(answer)) {
    error.textContent = "数値で入力してください";
    return;
  }

  // 答えのチェック
  const correctAnswer = 12;

  if (answer === correctAnswer) {
    result.textContent = "○ 正解です！";
  } else {
    result.textContent = "× 不正解です。正解は " + correctAnswer + " です。";
  }
}
```

### 例2: 範囲を許容する

計算問題では、誤差を許容することもあります。

```javascript
function checkAnswer() {
  const answer = Number(document.getElementById("answer").value);
  const result = document.getElementById("result");

  const correctAnswer = 3.14;

  // 0.1の誤差を許容
  if (answer >= 3.04 && answer <= 3.24) {
    result.textContent = "○ 正解です！";
  } else {
    result.textContent = "× 不正解です";
  }
}
```

## 選択式クイズ

ラジオボタンやチェックボックスを使った選択式のクイズも作れます。

### 例: ラジオボタンのクイズ

```html
<p>日本の首都はどこですか？</p>
<label><input type="radio" name="city" value="大阪"> 大阪</label>
<label><input type="radio" name="city" value="東京"> 東京</label>
<label><input type="radio" name="city" value="京都"> 京都</label>
```

```javascript
function checkAnswer() {
  const result = document.getElementById("result");

  // 選択されたラジオボタンを取得
  const radios = document.getElementsByName("city");
  let selectedValue = "";

  for (let i = 0; i < radios.length; i = i + 1) {
    if (radios[i].checked) {
      selectedValue = radios[i].value;
    }
  }

  if (selectedValue === "") {
    result.textContent = "選択してください";
    return;
  }

  if (selectedValue === "東京") {
    result.textContent = "○ 正解です！";
  } else {
    result.textContent = "× 不正解です";
  }
}
```

注: この例ではループを使っていますが、ループはまだ学習していません。選択式クイズは後のレッスンで詳しく学びます。

## クイズアプリのポイント

### 1. わかりやすいフィードバック

```javascript
// 良い例
if (answer === correctAnswer) {
  result.textContent = "○ 正解です！素晴らしい！";
} else {
  result.textContent = "× 不正解です。正解は「" + correctAnswer + "」でした。";
}
```

### 2. 入力の正規化

```javascript
// 前後の空白を削除
const answer = document.getElementById("answer").value.trim();

// 小文字に変換
const answer = document.getElementById("answer").value.toLowerCase();
```

### 3. リセット機能

```javascript
function reset() {
  document.getElementById("answer").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("error").textContent = "";
}
```

## 発展課題

基本的なクイズアプリができたら、以下の機能を追加してみましょう:

### 1. もう一度チャレンジボタン

```javascript
function retry() {
  document.getElementById("answer").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("error").textContent = "";
}
```

### 2. 正解数のカウント(変数を使用)

```javascript
let correctCount = 0;

function checkAnswer() {
  // ... 答えのチェック ...

  if (answer === correctAnswer) {
    correctCount = correctCount + 1;
    result.textContent = "○ 正解です！正解数: " + correctCount;
  }
}
```

### 3. 複数の問題(後のレッスンで)

複数の問題を扱うには、配列やループが必要です。これは後のレッスンで学びます。

## まとめ

- クイズアプリは条件分岐の実践的な応用例です
- 入力検証で空文字や不正な入力をチェックしましょう
- わかりやすいフィードバックでユーザー体験を向上させます
- toLowerCase() や trim() で入力を正規化できます
- 複数の正解を許容することもできます

次のレッスンでは、じゃんけんゲームを作成します。
