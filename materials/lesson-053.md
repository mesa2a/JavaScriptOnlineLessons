# レッスン53: クイズアプリ

## なぜ重要なのか

クイズアプリは、これまで学んだ条件分岐、入力検証、DOM操作のすべてを組み合わせた実践的なアプリケーションです。実際のWebサービスでも、クイズやテストの仕組みは広く使われています。

### 実世界での活用例

1. **Duolingo（語学学習アプリ）**
   - ユーザーが答えを入力
   - 正解かどうかを即座にチェック
   - 正解なら次の問題へ、不正解ならフィードバック
   - スコアやストリークを記録

2. **Khan Academy（教育プラットフォーム）**
   - 数学の問題を出題
   - 答えをチェックして正誤を判定
   - 詳しい解説を表示
   - 理解度を追跡

3. **クイズアプリ（QuizKnock、東大王など）**
   - 問題を1問ずつ表示
   - ユーザーの答えをチェック
   - 正解/不正解を判定
   - 得点を計算

4. **Google Forms（アンケート・テスト）**
   - 質問を表示
   - 回答を収集
   - 正解を設定してクイズとして利用
   - 自動採点機能

5. **資格試験の模擬テスト**
   - 本番同様の問題を出題
   - 時間制限付きで回答
   - 即座に採点結果を表示
   - 合格/不合格を判定

## このレッスンで学ぶこと

このレッスンでは、これまで学んだ知識を統合して、実用的なクイズアプリを作成します。

- **問題の表示**: HTMLで問題文を見せる方法
- **答えのチェック**: ユーザーの入力と正解を比較する
- **正解/不正解の表示**: 判定結果をわかりやすく伝える
- **入力検証**: 空文字や不正な入力への対応
- **フィードバックの工夫**: ユーザー体験を向上させる方法
- **入力の正規化**: 大文字・小文字、前後の空白への対応

## クイズアプリの基本構造

クイズアプリは、以下の4つの基本要素で構成されます。

### 1. 問題の表示

まず、ユーザーに問題を見せる必要があります。

```html
<h2>問題: 日本の首都はどこですか？</h2>
```

HTMLで問題文を表示するだけです。シンプルですが、これがクイズの出発点です。

### 2. 答えの入力

ユーザーが答えを入力できるようにします。

```html
<input type="text" id="answer" placeholder="答えを入力してください">
<button onclick="checkAnswer()">回答する</button>
```

- `id="answer"` で入力欄を識別
- ボタンをクリックすると `checkAnswer()` 関数が実行される

### 3. 答えのチェック

ユーザーの答えと正解を比較します。

```javascript
function checkAnswer() {
  const answer = document.getElementById("answer").value;
  const correctAnswer = "東京";

  if (answer === correctAnswer) {
    // 正解の処理
  } else {
    // 不正解の処理
  }
}
```

これがクイズアプリの**核心部分**です。条件分岐を使って正解かどうかを判定します。

### 4. 結果の表示

判定結果をユーザーに伝えます。

```html
<div id="result"></div>
```

```javascript
const result = document.getElementById("result");
result.textContent = "○ 正解です！";
```

視覚的に分かりやすく表示することが重要です。

## 基本的なクイズアプリの実装

### ステップ1: 最もシンプルなクイズ

まず、最小限の機能で動くクイズを作ってみましょう。

```javascript
function checkAnswer() {
  // ステップ1: ユーザーの答えを取得
  const answer = document.getElementById("answer").value;

  // ステップ2: 結果表示エリアを取得
  const result = document.getElementById("result");

  // ステップ3: 正解を定義
  const correctAnswer = "東京";

  // ステップ4: 答えをチェック
  if (answer === correctAnswer) {
    result.textContent = "正解です！";
  } else {
    result.textContent = "不正解です";
  }
}
```

**このコードの動作**:
1. 入力欄の値を取得
2. 正解（"東京"）と比較
3. 一致すれば「正解」、異なれば「不正解」

**このコードの問題点**:
- 大文字・小文字を区別してしまう（「tokyo」は不正解）
- 前後の空白に対応していない（「 東京 」は不正解）
- 空文字のチェックがない

### ステップ2: 入力検証を追加

実用的なクイズには、入力検証が不可欠です。

```javascript
function checkAnswer() {
  const answer = document.getElementById("answer").value;
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  // まず表示をクリア
  result.textContent = "";
  error.textContent = "";

  // 空文字チェック（最初に行う）
  if (answer === "") {
    error.textContent = "答えを入力してください";
    return;  // ここで処理を終了
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

**改善点**:
- 空文字をチェックして、エラーメッセージを表示
- 結果とエラーを最初にクリアして、前回の表示を消す
- ○×マークで視覚的にわかりやすく

### ステップ3: 入力の正規化

大文字・小文字や空白の違いで不正解にならないようにします。

```javascript
function checkAnswer() {
  // 生の入力値を取得
  const rawAnswer = document.getElementById("answer").value;
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  result.textContent = "";
  error.textContent = "";

  // 空文字チェック（正規化前に行う）
  if (rawAnswer === "") {
    error.textContent = "答えを入力してください";
    return;
  }

  // 入力を正規化（空白を削除、小文字に変換）
  const answer = rawAnswer.trim().toLowerCase();
  const correctAnswer = "tokyo";

  if (answer === correctAnswer) {
    result.textContent = "○ 正解です！";
  } else {
    result.textContent = "× 不正解です";
  }
}
```

**正規化の2つのステップ**:
1. `trim()`: 前後の空白を削除
   - 「 東京 」→「東京」
2. `toLowerCase()`: 小文字に変換
   - 「TOKYO」→「tokyo」
   - 「Tokyo」→「tokyo」

**注意**: 空文字チェックは正規化**前**に行います。なぜなら、`"   ".trim()` は `""` になるため、空白だけの入力も弾けるからです。

## 数値問題のクイズ

計算問題など、数値を答えるクイズも作れます。

### 基本的な数値クイズ

```javascript
function checkAnswer() {
  const answerValue = document.getElementById("answer").value;
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  result.textContent = "";
  error.textContent = "";

  // ステップ1: 空文字チェック
  if (answerValue === "") {
    error.textContent = "答えを入力してください";
    return;
  }

  // ステップ2: 数値に変換
  const answer = Number(answerValue);

  // ステップ3: 数値チェック
  if (isNaN(answer)) {
    error.textContent = "数値で入力してください";
    return;
  }

  // ステップ4: 答えのチェック
  const correctAnswer = 42;

  if (answer === correctAnswer) {
    result.textContent = "○ 正解です！";
  } else {
    result.textContent = "× 不正解です。正解は " + correctAnswer + " です。";
  }
}
```

**数値クイズの検証順序**:
1. 空文字チェック → エラー
2. 数値変換 → 数値チェック → エラー
3. 正解チェック → 結果表示

### 範囲を許容する数値クイズ

小数点の計算問題など、多少の誤差を許容したい場合があります。

```javascript
function checkAnswer() {
  const answerValue = document.getElementById("answer").value;
  const result = document.getElementById("result");

  // 入力検証は省略（実際には必要）

  const answer = Number(answerValue);
  const correctAnswer = 3.14;

  // 0.1の誤差を許容（3.04〜3.24を正解とする）
  if (answer >= 3.04 && answer <= 3.24) {
    result.textContent = "○ 正解です！";
  } else {
    result.textContent = "× 不正解です。正解は約 " + correctAnswer + " です。";
  }
}
```

**誤差を許容する理由**:
- 円周率（3.14159...）を3.14と答えても正解にする
- 計算の途中で四捨五入した結果も正解にする
- ユーザーにとって親切な判定

## 複数の正解を許容する

状況によっては、複数の答えを正解にしたいことがあります。

### 方法1: OR演算子を使う

```javascript
function checkAnswer() {
  const answer = document.getElementById("answer").value.trim().toLowerCase();
  const result = document.getElementById("result");

  // 「東京」「tokyo」「とうきょう」のいずれかを正解とする
  if (answer === "東京" || answer === "tokyo" || answer === "とうきょう") {
    result.textContent = "○ 正解です！";
  } else {
    result.textContent = "× 不正解です。正解は「東京」です。";
  }
}
```

**複数正解のパターン**:
- 日本語と英語の両方を受け入れる
- ひらがなとカタカナの両方を受け入れる
- 略称と正式名称の両方を受け入れる

### 方法2: 柔軟な判定

「東京都」と「東京」、どちらも正解にしたい場合:

```javascript
function checkAnswer() {
  const answer = document.getElementById("answer").value.trim();
  const result = document.getElementById("result");

  // 「東京」が含まれていれば正解
  if (answer.includes("東京")) {
    result.textContent = "○ 正解です！";
  } else {
    result.textContent = "× 不正解です";
  }
}
```

**注意**: `includes()` は部分一致なので、「東京タワー」も正解になってしまいます。問題に応じて使い分けましょう。

## フィードバックの工夫

良いクイズアプリは、わかりやすいフィードバックを提供します。

### 1. 詳しい説明を追加

正解したときに、追加情報を提供します。

```javascript
function checkAnswer() {
  const answer = document.getElementById("answer").value.trim();
  const result = document.getElementById("result");

  const correctAnswer = "富士山";

  if (answer === correctAnswer) {
    result.textContent = "○ 正解です！\n富士山は標高3,776mの日本一高い山です。";
  } else {
    result.textContent = "× 不正解です。\n正解は「富士山」でした。";
  }
}
```

**フィードバックの原則**:
- 正解のときは褒める
- 不正解のときは正解を教える
- 追加の学びを提供する

### 2. ポジティブなメッセージ

ユーザーのモチベーションを保つため、明るいメッセージを使います。

```javascript
function checkAnswer() {
  const answer = document.getElementById("answer").value.trim().toLowerCase();
  const result = document.getElementById("result");

  const correctAnswer = "tokyo";

  if (answer === correctAnswer) {
    result.textContent = "○ 正解です！素晴らしい！";
    result.style.color = "green";
  } else {
    result.textContent = "× 残念！正解は「東京」でした。次は頑張りましょう！";
    result.style.color = "red";
  }
}
```

**UXの向上**:
- 色を使って視覚的に区別
- ポジティブな言葉を使う
- 励ましのメッセージ

### 3. ヒント機能

難しい問題には、ヒントを用意します。

```javascript
function showHint() {
  const hint = document.getElementById("hint");
  hint.textContent = "ヒント: 日本の首都で、人口が最も多い都市です";
  hint.style.display = "block";
}

function checkAnswer() {
  const answer = document.getElementById("answer").value.trim().toLowerCase();
  const result = document.getElementById("result");

  if (answer === "東京" || answer === "tokyo") {
    result.textContent = "○ 正解です！";
  } else {
    result.textContent = "× 不正解です";
  }
}
```

**ヒントの設計**:
- 段階的にヒントを出す（最初は簡単なヒント）
- ヒントボタンは任意（見たい人だけ見る）
- ヒントを見ても正解できるようにする

## よくある間違い

### 間違い1: 空文字チェックを忘れる

```javascript
// ❌ 悪い例
function checkAnswer() {
  const answer = document.getElementById("answer").value;

  // 空文字のまま比較してしまう
  if (answer === "東京") {
    result.textContent = "正解！";
  } else {
    result.textContent = "不正解";  // 空文字も「不正解」と表示
  }
}
```

```javascript
// ✅ 良い例
function checkAnswer() {
  const answer = document.getElementById("answer").value;
  const error = document.getElementById("error");

  // まず空文字をチェック
  if (answer === "") {
    error.textContent = "答えを入力してください";
    return;
  }

  if (answer === "東京") {
    result.textContent = "正解！";
  } else {
    result.textContent = "不正解";
  }
}
```

**なぜ問題か**: 空文字も「不正解」と表示されると、ユーザーは何が間違っているか分かりません。

### 間違い2: 大文字・小文字を区別してしまう

```javascript
// ❌ 悪い例
function checkAnswer() {
  const answer = document.getElementById("answer").value;

  // "Tokyo" や "TOKYO" は不正解になる
  if (answer === "tokyo") {
    result.textContent = "正解！";
  } else {
    result.textContent = "不正解";
  }
}
```

```javascript
// ✅ 良い例
function checkAnswer() {
  const answer = document.getElementById("answer").value.toLowerCase();

  // "Tokyo" や "TOKYO" も正解になる
  if (answer === "tokyo") {
    result.textContent = "正解！";
  } else {
    result.textContent = "不正解";
  }
}
```

**なぜ問題か**: ユーザーは正しい答えを知っているのに、入力方法の違いで不正解になると不満を感じます。

### 間違い3: 前後の空白を無視しない

```javascript
// ❌ 悪い例
function checkAnswer() {
  const answer = document.getElementById("answer").value;

  // " 東京 " は不正解になる
  if (answer === "東京") {
    result.textContent = "正解！";
  } else {
    result.textContent = "不正解";
  }
}
```

```javascript
// ✅ 良い例
function checkAnswer() {
  const answer = document.getElementById("answer").value.trim();

  // " 東京 " も正解になる
  if (answer === "東京") {
    result.textContent = "正解！";
  } else {
    result.textContent = "不正解";
  }
}
```

**なぜ問題か**: ユーザーが意図せず入力した空白で不正解になるのは不親切です。

### 間違い4: 結果をクリアしない

```javascript
// ❌ 悪い例
function checkAnswer() {
  const answer = document.getElementById("answer").value;
  const result = document.getElementById("result");

  // 前回の結果が残ったまま
  if (answer === "東京") {
    result.textContent = "正解！";
  }
  // elseがないと、不正解のときに何も表示されない
}
```

```javascript
// ✅ 良い例
function checkAnswer() {
  const answer = document.getElementById("answer").value;
  const result = document.getElementById("result");

  // まず結果をクリア
  result.textContent = "";

  if (answer === "東京") {
    result.textContent = "正解！";
  } else {
    result.textContent = "不正解";
  }
}
```

**なぜ問題か**: 前回の結果が残っていると、今回の判定結果がわかりにくくなります。

### 間違い5: 数値の比較を文字列で行う

```javascript
// ❌ 悪い例
function checkAnswer() {
  const answer = document.getElementById("answer").value;

  // "42"（文字列）と 42（数値）を比較
  if (answer === 42) {
    result.textContent = "正解！";
  } else {
    result.textContent = "不正解";  // 常に不正解になる！
  }
}
```

```javascript
// ✅ 良い例
function checkAnswer() {
  const answerValue = document.getElementById("answer").value;
  const answer = Number(answerValue);

  // 数値同士で比較
  if (answer === 42) {
    result.textContent = "正解！";
  } else {
    result.textContent = "不正解";
  }
}
```

**なぜ問題か**: `value` は常に文字列なので、数値と比較すると常に `false` になります。

### 間違い6: 正解を教えない

```javascript
// ❌ 悪い例
function checkAnswer() {
  const answer = document.getElementById("answer").value;
  const result = document.getElementById("result");

  if (answer === "東京") {
    result.textContent = "正解！";
  } else {
    result.textContent = "不正解です";  // 正解が分からない
  }
}
```

```javascript
// ✅ 良い例
function checkAnswer() {
  const answer = document.getElementById("answer").value;
  const result = document.getElementById("result");

  const correctAnswer = "東京";

  if (answer === correctAnswer) {
    result.textContent = "正解！";
  } else {
    result.textContent = "不正解です。正解は「" + correctAnswer + "」でした。";
  }
}
```

**なぜ問題か**: 不正解のとき、何が正解だったか教えないと、ユーザーは学習できません。

## 実用例

### 実用例1: 地理クイズ（完全版）

県庁所在地を答えるクイズアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>地理クイズ</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .container {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      padding: 40px;
      max-width: 500px;
      width: 100%;
    }

    h1 {
      color: #667eea;
      margin-bottom: 10px;
      font-size: 28px;
    }

    .question {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 10px;
      margin: 20px 0;
      font-size: 18px;
      font-weight: bold;
    }

    .input-group {
      margin: 20px 0;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #333;
      font-weight: bold;
    }

    input[type="text"] {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.3s;
    }

    input[type="text"]:focus {
      outline: none;
      border-color: #667eea;
    }

    .button-group {
      display: flex;
      gap: 10px;
      margin: 20px 0;
    }

    button {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
    }

    .check-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .check-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .hint-btn {
      background: #f0f0f0;
      color: #333;
    }

    .hint-btn:hover {
      background: #e0e0e0;
    }

    .reset-btn {
      background: #ff6b6b;
      color: white;
    }

    .reset-btn:hover {
      background: #ff5252;
    }

    .hint {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 12px;
      border-radius: 5px;
      margin: 15px 0;
      display: none;
    }

    .result {
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
      font-weight: bold;
      font-size: 18px;
      text-align: center;
      min-height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .result.correct {
      background: #d4edda;
      color: #155724;
      border: 2px solid #c3e6cb;
    }

    .result.incorrect {
      background: #f8d7da;
      color: #721c24;
      border: 2px solid #f5c6cb;
    }

    .error {
      background: #fff3cd;
      border-left: 4px solid #ff6b6b;
      padding: 12px;
      border-radius: 5px;
      color: #856404;
      margin: 15px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🗾 地理クイズ</h1>
    <p>県庁所在地を答えよう！</p>

    <div class="question">
      問題: 北海道の県庁所在地はどこですか？
    </div>

    <div class="input-group">
      <label for="answer">答え:</label>
      <input type="text" id="answer" placeholder="ひらがな、カタカナ、漢字いずれでもOK">
    </div>

    <div class="button-group">
      <button class="check-btn" onclick="checkAnswer()">回答する</button>
      <button class="hint-btn" onclick="showHint()">ヒント</button>
      <button class="reset-btn" onclick="reset()">リセット</button>
    </div>

    <div id="hint" class="hint"></div>
    <div id="error" class="error" style="display: none;"></div>
    <div id="result" class="result"></div>
  </div>

  <script>
    function checkAnswer() {
      // 要素を取得
      const rawAnswer = document.getElementById("answer").value;
      const resultDiv = document.getElementById("result");
      const errorDiv = document.getElementById("error");

      // 表示をクリア
      resultDiv.textContent = "";
      resultDiv.className = "result";
      errorDiv.style.display = "none";
      errorDiv.textContent = "";

      // ステップ1: 空文字チェック
      if (rawAnswer === "") {
        errorDiv.textContent = "答えを入力してください";
        errorDiv.style.display = "block";
        return;
      }

      // ステップ2: 入力を正規化（前後の空白を削除、小文字に変換）
      const answer = rawAnswer.trim().toLowerCase();

      // ステップ3: 正解を定義（複数の表記を許容）
      const correctAnswers = ["札幌", "さっぽろ", "サッポロ", "sapporo"];

      // ステップ4: 答えをチェック
      let isCorrect = false;
      for (let i = 0; i < correctAnswers.length; i = i + 1) {
        if (answer === correctAnswers[i].toLowerCase()) {
          isCorrect = true;
        }
      }

      // ステップ5: 結果を表示
      if (isCorrect) {
        resultDiv.textContent = "○ 正解です！素晴らしい！\n札幌は北海道の道庁所在地で、人口約195万人の大都市です。";
        resultDiv.className = "result correct";
      } else {
        resultDiv.textContent = "× 不正解です。\n正解は「札幌（さっぽろ）」でした。次は頑張りましょう！";
        resultDiv.className = "result incorrect";
      }
    }

    function showHint() {
      const hintDiv = document.getElementById("hint");
      hintDiv.textContent = "💡 ヒント: 北海道で最も人口が多い都市で、雪まつりで有名です。";
      hintDiv.style.display = "block";
    }

    function reset() {
      document.getElementById("answer").value = "";
      document.getElementById("result").textContent = "";
      document.getElementById("result").className = "result";
      document.getElementById("error").style.display = "none";
      document.getElementById("error").textContent = "";
      document.getElementById("hint").style.display = "none";
      document.getElementById("hint").textContent = "";
    }
  </script>
</body>
</html>
```

**このアプリの特徴**:
1. **美しいデザイン**: グラデーション背景、影、アニメーション
2. **入力検証**: 空文字チェック、エラー表示
3. **入力の正規化**: `trim()` と `toLowerCase()` で柔軟な判定
4. **複数の正解**: 「札幌」「さっぽろ」「サッポロ」「sapporo」すべて正解
5. **ヒント機能**: ユーザーが必要なときだけ見られる
6. **リセット機能**: すべての入力と表示をクリア
7. **視覚的フィードバック**: 正解は緑、不正解は赤で表示

### 実用例2: 計算クイズ（完全版）

簡単な算数の問題を出すクイズアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>計算クイズ</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .container {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      padding: 40px;
      max-width: 500px;
      width: 100%;
    }

    h1 {
      color: #f5576c;
      margin-bottom: 10px;
      font-size: 28px;
    }

    .question-box {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      padding: 30px;
      border-radius: 10px;
      margin: 20px 0;
      text-align: center;
    }

    .question-label {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .question {
      font-size: 32px;
      font-weight: bold;
      margin: 10px 0;
    }

    .input-group {
      margin: 20px 0;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #333;
      font-weight: bold;
    }

    input[type="text"] {
      width: 100%;
      padding: 15px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 20px;
      text-align: center;
      transition: border-color 0.3s;
    }

    input[type="text"]:focus {
      outline: none;
      border-color: #f5576c;
    }

    .button-group {
      display: flex;
      gap: 10px;
      margin: 20px 0;
    }

    button {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
    }

    .check-btn {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }

    .check-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(245, 87, 108, 0.4);
    }

    .reset-btn {
      background: #6c757d;
      color: white;
    }

    .reset-btn:hover {
      background: #5a6268;
    }

    .result {
      padding: 20px;
      border-radius: 8px;
      margin: 15px 0;
      font-weight: bold;
      font-size: 18px;
      text-align: center;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .result.correct {
      background: #d4edda;
      color: #155724;
      border: 2px solid #c3e6cb;
    }

    .result.incorrect {
      background: #f8d7da;
      color: #721c24;
      border: 2px solid #f5c6cb;
    }

    .error {
      background: #fff3cd;
      border-left: 4px solid #ff6b6b;
      padding: 12px;
      border-radius: 5px;
      color: #856404;
      margin: 15px 0;
    }

    .stats {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .stat {
      text-align: center;
    }

    .stat-number {
      font-size: 24px;
      font-weight: bold;
      color: #f5576c;
    }

    .stat-label {
      font-size: 12px;
      color: #6c757d;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🧮 計算クイズ</h1>
    <p>正しい答えを入力しよう！</p>

    <div class="question-box">
      <div class="question-label">問題</div>
      <div class="question">15 × 3 = ?</div>
    </div>

    <div class="input-group">
      <label for="answer">答え（半角数字）:</label>
      <input type="text" id="answer" placeholder="数字を入力">
    </div>

    <div class="button-group">
      <button class="check-btn" onclick="checkAnswer()">回答する</button>
      <button class="reset-btn" onclick="reset()">リセット</button>
    </div>

    <div id="error" class="error" style="display: none;"></div>
    <div id="result" class="result"></div>

    <div class="stats">
      <div class="stat">
        <div class="stat-number" id="correct-count">0</div>
        <div class="stat-label">正解数</div>
      </div>
      <div class="stat">
        <div class="stat-number" id="total-count">0</div>
        <div class="stat-label">回答数</div>
      </div>
    </div>
  </div>

  <script>
    // 統計情報を保持する変数
    let correctCount = 0;
    let totalCount = 0;

    function checkAnswer() {
      // 要素を取得
      const answerValue = document.getElementById("answer").value;
      const resultDiv = document.getElementById("result");
      const errorDiv = document.getElementById("error");

      // 表示をクリア
      resultDiv.textContent = "";
      resultDiv.className = "result";
      errorDiv.style.display = "none";
      errorDiv.textContent = "";

      // ステップ1: 空文字チェック
      if (answerValue === "") {
        errorDiv.textContent = "⚠️ 答えを入力してください";
        errorDiv.style.display = "block";
        return;
      }

      // ステップ2: 数値に変換
      const answer = Number(answerValue);

      // ステップ3: 数値チェック
      if (isNaN(answer)) {
        errorDiv.textContent = "⚠️ 数値で入力してください（例: 45）";
        errorDiv.style.display = "block";
        return;
      }

      // ステップ4: 正解を定義
      const correctAnswer = 45;

      // ステップ5: 答えをチェック
      totalCount = totalCount + 1;

      if (answer === correctAnswer) {
        correctCount = correctCount + 1;
        resultDiv.textContent = "○ 正解です！素晴らしい！\n15 × 3 = 45";
        resultDiv.className = "result correct";
      } else {
        resultDiv.textContent = "× 不正解です。\n正解は " + correctAnswer + " でした。\n15 × 3 = 45";
        resultDiv.className = "result incorrect";
      }

      // ステップ6: 統計を更新
      updateStats();
    }

    function updateStats() {
      document.getElementById("correct-count").textContent = correctCount;
      document.getElementById("total-count").textContent = totalCount;
    }

    function reset() {
      document.getElementById("answer").value = "";
      document.getElementById("result").textContent = "";
      document.getElementById("result").className = "result";
      document.getElementById("error").style.display = "none";
      document.getElementById("error").textContent = "";
    }
  </script>
</body>
</html>
```

**このアプリの特徴**:
1. **数値専用**: 数値の入力と検証
2. **統計機能**: 正解数と回答数を記録
3. **詳細なフィードバック**: 計算式を見せて理解を助ける
4. **入力検証**: 空文字チェック、数値チェック
5. **親切なエラーメッセージ**: 具体的な例を示す

### 実用例3: 英単語クイズ（完全版）

英単語の意味を答えるクイズアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>英単語クイズ</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .container {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      padding: 40px;
      max-width: 500px;
      width: 100%;
    }

    h1 {
      color: #38f9d7;
      margin-bottom: 10px;
      font-size: 28px;
    }

    .word-box {
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      color: white;
      padding: 40px;
      border-radius: 10px;
      margin: 20px 0;
      text-align: center;
    }

    .word-label {
      font-size: 14px;
      opacity: 0.9;
      margin-bottom: 10px;
    }

    .word {
      font-size: 48px;
      font-weight: bold;
      margin: 10px 0;
    }

    .input-group {
      margin: 20px 0;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #333;
      font-weight: bold;
    }

    input[type="text"] {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.3s;
    }

    input[type="text"]:focus {
      outline: none;
      border-color: #38f9d7;
    }

    .button-group {
      display: flex;
      gap: 10px;
      margin: 20px 0;
    }

    button {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
    }

    .check-btn {
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      color: white;
    }

    .check-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(56, 249, 215, 0.4);
    }

    .hint-btn {
      background: #ffc107;
      color: white;
    }

    .hint-btn:hover {
      background: #ffb300;
    }

    .reset-btn {
      background: #6c757d;
      color: white;
    }

    .reset-btn:hover {
      background: #5a6268;
    }

    .hint {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 12px;
      border-radius: 5px;
      margin: 15px 0;
      display: none;
    }

    .result {
      padding: 20px;
      border-radius: 8px;
      margin: 15px 0;
      font-weight: bold;
      font-size: 18px;
      text-align: center;
      min-height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .result.correct {
      background: #d4edda;
      color: #155724;
      border: 2px solid #c3e6cb;
    }

    .result.incorrect {
      background: #f8d7da;
      color: #721c24;
      border: 2px solid #f5c6cb;
    }

    .error {
      background: #fff3cd;
      border-left: 4px solid #ff6b6b;
      padding: 12px;
      border-radius: 5px;
      color: #856404;
      margin: 15px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📚 英単語クイズ</h1>
    <p>英単語の意味を答えよう！</p>

    <div class="word-box">
      <div class="word-label">この英単語の意味は？</div>
      <div class="word">APPLE</div>
    </div>

    <div class="input-group">
      <label for="answer">日本語の意味:</label>
      <input type="text" id="answer" placeholder="ひらがな、カタカナ、漢字OK">
    </div>

    <div class="button-group">
      <button class="check-btn" onclick="checkAnswer()">回答する</button>
      <button class="hint-btn" onclick="showHint()">ヒント</button>
      <button class="reset-btn" onclick="reset()">リセット</button>
    </div>

    <div id="hint" class="hint"></div>
    <div id="error" class="error" style="display: none;"></div>
    <div id="result" class="result"></div>
  </div>

  <script>
    function checkAnswer() {
      // 要素を取得
      const rawAnswer = document.getElementById("answer").value;
      const resultDiv = document.getElementById("result");
      const errorDiv = document.getElementById("error");

      // 表示をクリア
      resultDiv.textContent = "";
      resultDiv.className = "result";
      errorDiv.style.display = "none";
      errorDiv.textContent = "";

      // ステップ1: 空文字チェック
      if (rawAnswer === "") {
        errorDiv.textContent = "⚠️ 答えを入力してください";
        errorDiv.style.display = "block";
        return;
      }

      // ステップ2: 入力を正規化（前後の空白を削除）
      const answer = rawAnswer.trim();

      // ステップ3: 正解を定義（複数の表記を許容）
      const correctAnswers = ["りんご", "リンゴ", "林檎"];

      // ステップ4: 答えをチェック
      let isCorrect = false;
      for (let i = 0; i < correctAnswers.length; i = i + 1) {
        if (answer === correctAnswers[i]) {
          isCorrect = true;
        }
      }

      // ステップ5: 結果を表示
      if (isCorrect) {
        resultDiv.innerHTML = "○ 正解です！<br>APPLE = りんご（林檎）<br>赤くて甘い果物です。";
        resultDiv.className = "result correct";
      } else {
        resultDiv.innerHTML = "× 不正解です。<br>正解は「りんご」でした。<br>次は頑張りましょう！";
        resultDiv.className = "result incorrect";
      }
    }

    function showHint() {
      const hintDiv = document.getElementById("hint");
      hintDiv.textContent = "💡 ヒント: 赤くて丸い果物です。スティーブ・ジョブズが作った会社の名前にもなっています。";
      hintDiv.style.display = "block";
    }

    function reset() {
      document.getElementById("answer").value = "";
      document.getElementById("result").textContent = "";
      document.getElementById("result").className = "result";
      document.getElementById("error").style.display = "none";
      document.getElementById("error").textContent = "";
      document.getElementById("hint").style.display = "none";
      document.getElementById("hint").textContent = "";
    }
  </script>
</body>
</html>
```

**このアプリの特徴**:
1. **英単語学習**: 実用的な語学学習アプリ
2. **複数表記対応**: ひらがな、カタカナ、漢字すべて正解
3. **ヒント機能**: 難しいときのサポート
4. **詳しい説明**: 正解時に追加情報を提供
5. **視覚的デザイン**: 大きな文字で見やすい

## 練習問題

### 練習問題1: 日本の首都クイズ

以下の要件を満たすクイズアプリを作成してください。

**要件**:
- 問題: 「日本の首都はどこですか？」
- 正解: 「東京」（大文字・小文字、ひらがな・カタカナ・漢字・英語すべて受け入れる）
- 空文字チェック
- 入力の正規化（trim と toLowerCase）
- 正解時: 「○ 正解です！」と緑色で表示
- 不正解時: 「× 不正解です。正解は「東京」でした。」と赤色で表示

<details>
<summary>💡 ヒント1: HTMLの構造</summary>

```html
<div class="container">
  <h1>首都クイズ</h1>
  <p>問題: 日本の首都はどこですか？</p>
  <input type="text" id="answer">
  <button onclick="checkAnswer()">回答する</button>
  <div id="error"></div>
  <div id="result"></div>
</div>
```

必要な要素は4つです:
- 入力欄（id="answer"）
- ボタン（onclick="checkAnswer()"）
- エラー表示（id="error"）
- 結果表示（id="result"）

</details>

<details>
<summary>💡 ヒント2: 検証の順序</summary>

```javascript
function checkAnswer() {
  // 1. 要素を取得
  const rawAnswer = document.getElementById("answer").value;

  // 2. 空文字チェック
  if (rawAnswer === "") {
    // エラー表示
    return;
  }

  // 3. 入力を正規化
  const answer = rawAnswer.trim().toLowerCase();

  // 4. 正解と比較
  // 5. 結果を表示
}
```

検証は常にこの順序で行います。

</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>首都クイズ</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }

    input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      font-size: 16px;
    }

    button {
      width: 100%;
      padding: 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
    }

    .error {
      color: #d32f2f;
      margin: 10px 0;
      padding: 10px;
      background: #ffebee;
      border-radius: 5px;
    }

    .result {
      padding: 15px;
      margin: 10px 0;
      border-radius: 5px;
      font-weight: bold;
    }

    .correct {
      background: #c8e6c9;
      color: #2e7d32;
    }

    .incorrect {
      background: #ffcdd2;
      color: #c62828;
    }
  </style>
</head>
<body>
  <h1>首都クイズ</h1>
  <p>問題: 日本の首都はどこですか？</p>
  <input type="text" id="answer" placeholder="答えを入力">
  <button onclick="checkAnswer()">回答する</button>
  <div id="error"></div>
  <div id="result"></div>

  <script>
    function checkAnswer() {
      const rawAnswer = document.getElementById("answer").value;
      const errorDiv = document.getElementById("error");
      const resultDiv = document.getElementById("result");

      // 表示をクリア
      errorDiv.textContent = "";
      resultDiv.textContent = "";
      resultDiv.className = "result";

      // 空文字チェック
      if (rawAnswer === "") {
        errorDiv.textContent = "答えを入力してください";
        errorDiv.className = "error";
        return;
      }

      // 入力を正規化
      const answer = rawAnswer.trim().toLowerCase();

      // 正解を定義（複数の表記）
      const correctAnswers = ["東京", "とうきょう", "トウキョウ", "tokyo"];

      // 答えをチェック
      let isCorrect = false;
      for (let i = 0; i < correctAnswers.length; i = i + 1) {
        if (answer === correctAnswers[i].toLowerCase()) {
          isCorrect = true;
        }
      }

      // 結果を表示
      if (isCorrect) {
        resultDiv.textContent = "○ 正解です！";
        resultDiv.className = "result correct";
      } else {
        resultDiv.textContent = "× 不正解です。正解は「東京」でした。";
        resultDiv.className = "result incorrect";
      }
    }
  </script>
</body>
</html>
```

</details>

### 練習問題2: かけ算クイズ

以下の要件を満たす計算クイズアプリを作成してください。

**要件**:
- 問題: 「7 × 8 = ?」
- 正解: 56
- 空文字チェック
- 数値チェック（isNaN()を使用）
- 正解時: 「○ 正解です！7 × 8 = 56」
- 不正解時: 「× 不正解です。正解は 56 です。」
- リセットボタンで入力と結果をクリア

<details>
<summary>💡 ヒント1: 数値の検証</summary>

```javascript
// 数値クイズの検証順序
function checkAnswer() {
  const answerValue = document.getElementById("answer").value;

  // 1. 空文字チェック
  if (answerValue === "") {
    // エラー
    return;
  }

  // 2. 数値に変換
  const answer = Number(answerValue);

  // 3. 数値チェック
  if (isNaN(answer)) {
    // エラー
    return;
  }

  // 4. 正解チェック
}
```

数値は必ず `Number()` で変換してから比較します。

</details>

<details>
<summary>💡 ヒント2: リセット機能</summary>

```javascript
function reset() {
  document.getElementById("answer").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("error").textContent = "";
}
```

すべての表示をクリアします。

</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>かけ算クイズ</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background: #f5f5f5;
    }

    .container {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .question {
      font-size: 32px;
      font-weight: bold;
      text-align: center;
      margin: 20px 0;
      color: #333;
    }

    input {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      font-size: 18px;
      text-align: center;
      border: 2px solid #ddd;
      border-radius: 5px;
    }

    .button-group {
      display: flex;
      gap: 10px;
      margin: 15px 0;
    }

    button {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      font-weight: bold;
    }

    .check-btn {
      background: #4CAF50;
      color: white;
    }

    .reset-btn {
      background: #757575;
      color: white;
    }

    .error {
      color: #d32f2f;
      margin: 10px 0;
      padding: 10px;
      background: #ffebee;
      border-radius: 5px;
      text-align: center;
    }

    .result {
      padding: 15px;
      margin: 10px 0;
      border-radius: 5px;
      font-weight: bold;
      text-align: center;
    }

    .correct {
      background: #c8e6c9;
      color: #2e7d32;
    }

    .incorrect {
      background: #ffcdd2;
      color: #c62828;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>かけ算クイズ</h1>
    <div class="question">7 × 8 = ?</div>
    <input type="text" id="answer" placeholder="答えを入力（半角数字）">

    <div class="button-group">
      <button class="check-btn" onclick="checkAnswer()">回答する</button>
      <button class="reset-btn" onclick="reset()">リセット</button>
    </div>

    <div id="error"></div>
    <div id="result"></div>
  </div>

  <script>
    function checkAnswer() {
      const answerValue = document.getElementById("answer").value;
      const errorDiv = document.getElementById("error");
      const resultDiv = document.getElementById("result");

      // 表示をクリア
      errorDiv.textContent = "";
      resultDiv.textContent = "";
      resultDiv.className = "result";

      // ステップ1: 空文字チェック
      if (answerValue === "") {
        errorDiv.textContent = "答えを入力してください";
        errorDiv.className = "error";
        return;
      }

      // ステップ2: 数値に変換
      const answer = Number(answerValue);

      // ステップ3: 数値チェック
      if (isNaN(answer)) {
        errorDiv.textContent = "数値で入力してください（例: 56）";
        errorDiv.className = "error";
        return;
      }

      // ステップ4: 正解チェック
      const correctAnswer = 56;

      if (answer === correctAnswer) {
        resultDiv.textContent = "○ 正解です！7 × 8 = 56";
        resultDiv.className = "result correct";
      } else {
        resultDiv.textContent = "× 不正解です。正解は " + correctAnswer + " です。";
        resultDiv.className = "result incorrect";
      }
    }

    function reset() {
      document.getElementById("answer").value = "";
      document.getElementById("result").textContent = "";
      document.getElementById("result").className = "result";
      document.getElementById("error").textContent = "";
      document.getElementById("error").className = "";
    }
  </script>
</body>
</html>
```

</details>

### 練習問題3: 歴史クイズ（発展）

以下の要件を満たす歴史クイズアプリを作成してください。

**要件**:
- 問題: 「織田信長が天下統一を目指した時代は？」
- 正解: 「安土桃山時代」「戦国時代」のいずれかを正解とする
- ヒント機能: 「16世紀の日本です」
- 空文字チェック、入力の正規化
- リセット機能

<details>
<summary>💡 ヒント: 複数の正解</summary>

```javascript
const correctAnswers = ["安土桃山時代", "戦国時代"];

let isCorrect = false;
for (let i = 0; i < correctAnswers.length; i = i + 1) {
  if (answer === correctAnswers[i]) {
    isCorrect = true;
  }
}
```

配列に正解を入れて、ループでチェックします。

</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>歴史クイズ</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }

    .container {
      background: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }

    h1 {
      color: #667eea;
    }

    .question {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      font-size: 18px;
      border-left: 4px solid #667eea;
    }

    input {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 5px;
    }

    .button-group {
      display: flex;
      gap: 10px;
      margin: 15px 0;
    }

    button {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      font-weight: bold;
    }

    .check-btn {
      background: #667eea;
      color: white;
    }

    .hint-btn {
      background: #ffc107;
      color: white;
    }

    .reset-btn {
      background: #757575;
      color: white;
    }

    .hint {
      background: #fff3cd;
      padding: 12px;
      border-radius: 5px;
      margin: 10px 0;
      border-left: 4px solid #ffc107;
      display: none;
    }

    .error {
      color: #d32f2f;
      margin: 10px 0;
      padding: 10px;
      background: #ffebee;
      border-radius: 5px;
    }

    .result {
      padding: 15px;
      margin: 10px 0;
      border-radius: 5px;
      font-weight: bold;
    }

    .correct {
      background: #c8e6c9;
      color: #2e7d32;
    }

    .incorrect {
      background: #ffcdd2;
      color: #c62828;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📚 歴史クイズ</h1>
    <div class="question">
      問題: 織田信長が天下統一を目指した時代は？
    </div>

    <input type="text" id="answer" placeholder="時代名を入力">

    <div class="button-group">
      <button class="check-btn" onclick="checkAnswer()">回答する</button>
      <button class="hint-btn" onclick="showHint()">ヒント</button>
      <button class="reset-btn" onclick="reset()">リセット</button>
    </div>

    <div id="hint" class="hint"></div>
    <div id="error"></div>
    <div id="result"></div>
  </div>

  <script>
    function checkAnswer() {
      const rawAnswer = document.getElementById("answer").value;
      const errorDiv = document.getElementById("error");
      const resultDiv = document.getElementById("result");

      // 表示をクリア
      errorDiv.textContent = "";
      resultDiv.textContent = "";
      resultDiv.className = "result";

      // 空文字チェック
      if (rawAnswer === "") {
        errorDiv.textContent = "答えを入力してください";
        errorDiv.className = "error";
        return;
      }

      // 入力を正規化
      const answer = rawAnswer.trim();

      // 正解を定義（2つの正解を許容）
      const correctAnswers = ["安土桃山時代", "戦国時代"];

      // 答えをチェック
      let isCorrect = false;
      for (let i = 0; i < correctAnswers.length; i = i + 1) {
        if (answer === correctAnswers[i]) {
          isCorrect = true;
        }
      }

      // 結果を表示
      if (isCorrect) {
        resultDiv.textContent = "○ 正解です！織田信長は戦国時代（安土桃山時代）に天下統一を目指しました。";
        resultDiv.className = "result correct";
      } else {
        resultDiv.textContent = "× 不正解です。正解は「戦国時代」または「安土桃山時代」でした。";
        resultDiv.className = "result incorrect";
      }
    }

    function showHint() {
      const hintDiv = document.getElementById("hint");
      hintDiv.textContent = "💡 ヒント: 16世紀の日本です。武将たちが争っていた時代です。";
      hintDiv.style.display = "block";
    }

    function reset() {
      document.getElementById("answer").value = "";
      document.getElementById("result").textContent = "";
      document.getElementById("result").className = "result";
      document.getElementById("error").textContent = "";
      document.getElementById("error").className = "";
      document.getElementById("hint").style.display = "none";
      document.getElementById("hint").textContent = "";
    }
  </script>
</body>
</html>
```

</details>

## デバッグのヒント

### 1. 答えが常に不正解になる

**原因**: 型の不一致や正規化の忘れ

```javascript
// ❌ 問題のあるコード
const answer = document.getElementById("answer").value;  // 文字列 "42"
if (answer === 42) {  // 数値と比較 → 常に false
  result.textContent = "正解！";
}
```

**解決方法**: 数値は `Number()` で変換する

```javascript
// ✅ 修正版
const answerValue = document.getElementById("answer").value;
const answer = Number(answerValue);
if (answer === 42) {
  result.textContent = "正解！";
}
```

### 2. 空白付きの答えが不正解になる

**原因**: 入力の正規化を忘れている

```javascript
// ❌ 問題のあるコード
const answer = document.getElementById("answer").value;  // " 東京 "
if (answer === "東京") {  // 前後に空白があるので false
  result.textContent = "正解！";
}
```

**解決方法**: `trim()` で空白を削除

```javascript
// ✅ 修正版
const answer = document.getElementById("answer").value.trim();  // "東京"
if (answer === "東京") {
  result.textContent = "正解！";
}
```

### 3. 前回の結果が残る

**原因**: 結果をクリアしていない

```javascript
// ❌ 問題のあるコード
function checkAnswer() {
  const answer = document.getElementById("answer").value;
  // クリアしていない！
  if (answer === "東京") {
    result.textContent = "正解！";
  }
}
```

**解決方法**: 最初に結果をクリア

```javascript
// ✅ 修正版
function checkAnswer() {
  const result = document.getElementById("result");
  result.textContent = "";  // まずクリア

  const answer = document.getElementById("answer").value;
  if (answer === "東京") {
    result.textContent = "正解！";
  } else {
    result.textContent = "不正解";
  }
}
```

### 4. コンソールを使ったデバッグ

入力値と正解を確認しましょう。

```javascript
function checkAnswer() {
  const answer = document.getElementById("answer").value;
  const correctAnswer = "東京";

  // デバッグ用に値を出力
  console.log("ユーザーの答え:", answer);
  console.log("正解:", correctAnswer);
  console.log("一致するか:", answer === correctAnswer);

  if (answer === correctAnswer) {
    result.textContent = "正解！";
  } else {
    result.textContent = "不正解";
  }
}
```

ブラウザの開発者ツール（F12）のコンソールタブで確認できます。

### 5. エラーメッセージが表示されない

**原因**: `return` を忘れている

```javascript
// ❌ 問題のあるコード
function checkAnswer() {
  const answer = document.getElementById("answer").value;

  if (answer === "") {
    error.textContent = "入力してください";
    // return がないので、このまま処理が続く！
  }

  // 空文字でも正解チェックが実行されてしまう
  if (answer === "東京") {
    result.textContent = "正解！";
  }
}
```

**解決方法**: エラー表示後に `return` で処理を終了

```javascript
// ✅ 修正版
function checkAnswer() {
  const answer = document.getElementById("answer").value;

  if (answer === "") {
    error.textContent = "入力してください";
    return;  // ここで処理を終了
  }

  if (answer === "東京") {
    result.textContent = "正解！";
  }
}
```

## チェックリスト

クイズアプリを作成する際の確認項目です。

- [ ] **問題文が明確に表示されている**
  - ユーザーが何を答えればいいか分かる

- [ ] **入力欄がある**
  - `id` で識別できる
  - `placeholder` でヒントを表示

- [ ] **空文字チェックを実装している**
  - 何も入力せずに回答できないようにする

- [ ] **入力を正規化している**
  - 文字列の場合: `trim()` で前後の空白を削除
  - 大文字・小文字を区別しない場合: `toLowerCase()` を使用

- [ ] **数値問題では数値チェックをしている**
  - `Number()` で変換
  - `isNaN()` でチェック

- [ ] **正解と不正解で異なるメッセージを表示**
  - 正解: 褒める、追加情報を提供
  - 不正解: 正解を教える

- [ ] **視覚的に分かりやすい**
  - 色や記号（○×）を使う
  - 正解は緑系、不正解は赤系

- [ ] **結果をクリアしている**
  - 新しく回答する前に前回の結果を消す

- [ ] **エラーメッセージが親切**
  - 何が問題か具体的に伝える
  - 解決方法を示す

- [ ] **リセット機能がある（推奨）**
  - 入力と結果をすべてクリア

## ポイント

### 1. クイズアプリは条件分岐の実践

クイズアプリは、これまで学んだ条件分岐、入力検証、DOM操作のすべてを使います。

```javascript
// 条件分岐の総合的な活用
function checkAnswer() {
  // DOM操作: 要素を取得
  const answer = document.getElementById("answer").value;

  // 入力検証: 空文字チェック
  if (answer === "") {
    error.textContent = "入力してください";
    return;
  }

  // 条件分岐: 正解判定
  if (answer === correctAnswer) {
    result.textContent = "正解！";
  } else {
    result.textContent = "不正解";
  }
}
```

### 2. 入力検証は必須

実用的なアプリには、必ず入力検証が必要です。

**検証の順序**:
1. 空文字チェック
2. 型チェック（数値の場合）
3. 正解チェック

### 3. 入力の正規化で親切に

ユーザーの入力方法の違いで不正解にならないようにします。

**正規化の方法**:
- `trim()`: 前後の空白を削除
- `toLowerCase()`: 小文字に変換
- 複数の表記を正解として認める

### 4. フィードバックは明確に

ユーザーに結果を分かりやすく伝えます。

**良いフィードバック**:
- 正解/不正解が一目で分かる
- 正解のときは褒める
- 不正解のときは正解を教える
- 色や記号で視覚的に区別

### 5. エラーメッセージは親切に

何が問題で、どうすればいいか伝えます。

```javascript
// ❌ 悪い例
error.textContent = "エラー";

// ✅ 良い例
error.textContent = "答えを入力してください";
error.textContent = "数値で入力してください（例: 42）";
```

### 6. 結果は毎回クリアする

前回の結果が残らないようにします。

```javascript
function checkAnswer() {
  // まず表示をクリア
  result.textContent = "";
  error.textContent = "";

  // 検証と判定
  // ...
}
```

### 7. 複数の正解を許容する

状況に応じて、柔軟な判定をします。

```javascript
// OR演算子で複数の正解
if (answer === "東京" || answer === "とうきょう" || answer === "Tokyo") {
  result.textContent = "正解！";
}
```

### 8. ヒント機能でユーザーをサポート

難しい問題には、ヒントを用意します。

```javascript
function showHint() {
  const hint = document.getElementById("hint");
  hint.textContent = "ヒント: 日本の首都です";
  hint.style.display = "block";
}
```

## できるようになったこと

このレッスンを完了すると、以下のことができるようになります。

1. **問題を表示する**
   - HTMLで問題文を見せる
   - 入力欄とボタンを配置する

2. **答えをチェックする**
   - ユーザーの入力と正解を比較する
   - 条件分岐で正誤を判定する

3. **正解/不正解を表示する**
   - 判定結果を分かりやすく伝える
   - 色や記号で視覚的に区別する

4. **入力検証を実装する**
   - 空文字チェック
   - 数値チェック
   - エラーメッセージの表示

5. **入力を正規化する**
   - `trim()` で前後の空白を削除
   - `toLowerCase()` で大文字・小文字を統一
   - 複数の表記を受け入れる

6. **ユーザー体験を向上させる**
   - 詳しいフィードバックを提供
   - ヒント機能を追加
   - リセット機能を実装

7. **文字列クイズを作る**
   - 地理、歴史、英単語などのクイズ
   - 複数の正解を許容

8. **数値クイズを作る**
   - 計算問題
   - 範囲を許容する判定

## まとめ

### クイズアプリの基本構造

クイズアプリは4つの要素で構成されます:
1. 問題の表示（HTML）
2. 答えの入力（input要素）
3. 答えのチェック（条件分岐）
4. 結果の表示（DOM操作）

### 入力検証の重要性

実用的なクイズアプリには、入力検証が不可欠です:
- 空文字チェック
- 数値チェック（数値問題の場合）
- エラーメッセージの表示

### 入力の正規化

ユーザーの入力方法の違いで不正解にならないようにします:
- `trim()`: 前後の空白を削除
- `toLowerCase()`: 大文字・小文字を統一
- 複数の表記を正解として認める

### フィードバックの工夫

良いクイズアプリは、わかりやすいフィードバックを提供します:
- 正解/不正解が一目で分かる
- 色や記号で視覚的に区別
- 正解のときは褒める、不正解のときは教える
- 追加情報を提供して学びを深める

### 実装のポイント

```javascript
function checkAnswer() {
  // 1. 要素を取得
  const answer = document.getElementById("answer").value;

  // 2. 表示をクリア
  result.textContent = "";
  error.textContent = "";

  // 3. 空文字チェック
  if (answer === "") {
    error.textContent = "答えを入力してください";
    return;
  }

  // 4. 入力を正規化
  const normalizedAnswer = answer.trim().toLowerCase();

  // 5. 正解チェック
  const correctAnswer = "tokyo";

  if (normalizedAnswer === correctAnswer) {
    result.textContent = "○ 正解です！";
  } else {
    result.textContent = "× 不正解です。正解は " + correctAnswer + " でした。";
  }
}
```

### このレッスンで学んだこと

- クイズアプリの基本的な作り方
- 入力検証の実装方法
- 入力の正規化テクニック
- フィードバックの工夫
- 複数の正解を許容する方法
- ヒント機能とリセット機能
- 文字列クイズと数値クイズの違い

クイズアプリは、これまで学んだ知識を統合する実践的なプロジェクトです。しっかりと理解して、自分だけのクイズアプリを作ってみましょう！

## 次のステップ

次のレッスンでは、**じゃんけんゲーム**を作成します。

じゃんけんゲームでは:
- 3つの選択肢（グー、チョキ、パー）
- 勝敗判定のロジック
- より複雑な条件分岐

クイズアプリの知識を活かして、インタラクティブなゲームを作りましょう！
