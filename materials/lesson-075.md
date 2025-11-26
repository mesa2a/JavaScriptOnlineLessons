---
title: "Lesson 075: 条件付きループ"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン75：条件付きループ

## このレッスンで学ぶこと

前回のレッスンでは、カウンタを使って「決まった回数」繰り返す方法を学びました：

```javascript
let i = 0;
while (i < 5) {  // 5回繰り返す
  console.log(i);
  i++;
}
```

このような**回数が決まっているループ**は便利ですが、実際のプログラミングではもっと柔軟なループが必要になります。

**例えば：**
- ユーザーが正しいパスワードを入力するまで繰り返す
- クイズで正解するまで質問を続ける
- ユーザーが「終了」と入力するまで処理を続ける

このように、**回数ではなく条件によって繰り返しを制御する**のが**条件付きループ**です。

### 前回の復習

前回のレッスンでは、while文の基本について学びました：

- ✅ **while文の構造**：`while (条件式) { 処理 }`の形式
- ✅ **カウンタ変数**：`let i = 0`で初期化、`i < 5`で条件、`i++`で更新
- ✅ **無限ループの危険性**：更新を忘れるとループが終わらない
- ✅ **成果物**：5回ループするプログラム

### 今回の目標

今回のレッスンでは、**条件付きループ**を学びます：

- ✅ **入力があるまで繰り返し**：ユーザーが何か入力するまでループを続ける
- ✅ **正解するまで質問**：クイズで正解するまで繰り返す
- ✅ **無限ループに注意**：必ず終了する条件を設計する
- ✅ **成果物**：繰り返し質問機を作成する

## 条件付きループとは

### 回数ループと条件ループの違い

**回数ループ（前回学んだ）：**
```javascript
// 5回繰り返す - 回数が決まっている
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```
→ **いつ終わるか事前にわかる**（5回で終わる）

**条件ループ（今回学ぶ）：**
```javascript
// 正解するまで繰り返す - 回数が決まっていない
let answer = "";
while (answer !== "JavaScript") {
  answer = prompt("このレッスンで学ぶ言語は？");
}
```
→ **いつ終わるかわからない**（1回で終わるかもしれないし、10回かかるかもしれない）

### 条件付きループの特徴

**条件付きループ**とは、**特定の条件が満たされるまで繰り返す処理**のことです。

**特徴：**
- 繰り返し回数が事前にわからない
- ユーザーの入力や状態によって終了する
- 「〜まで」「〜の間」という条件で制御する

**よくある使い道：**
- ✅ 正しいパスワードが入力されるまで繰り返す
- ✅ クイズで正解するまで質問を続ける
- ✅ ユーザーが「quit」と入力するまで処理を続ける
- ✅ データの読み込みが完了するまで待つ

### 日常生活での例え

条件付きループは、日常生活の中でもよく見られます。

**例1：クイズに挑戦する**
```
while (不正解) {
  クイズを出す
  答えを聞く
  正解かチェックする
}
```
→ 正解するまで繰り返す（1回で正解するかもしれないし、10回かかるかもしれない）

**例2：お腹がいっぱいになるまで食べる**
```
while (お腹が空いている) {
  一口食べる
  満腹度をチェックする
}
```
→ 満腹になるまで繰り返す（何口で満腹になるかは食べてみないとわからない）

**例3：目的地に着くまで歩く**
```
while (目的地に着いていない) {
  一歩進む
  現在地をチェックする
}
```
→ 目的地に着くまで繰り返す（何歩で着くかは距離による）

**プログラミングの条件付きループも、まったく同じ考え方です。**

## パターン1：入力があるまで繰り返し

条件付きループの最も基本的なパターンは、**ユーザーが何か入力するまで繰り返す**ことです。

### 基本例：空入力を許さない

```javascript
let userInput = "";

while (userInput === "") {
  userInput = prompt("何か入力してください");
}

console.log("入力されました: " + userInput);
```

**動作の流れ：**
```
1回目：
  - userInput は "" （空文字列）
  - userInput === "" は true → ループ実行
  - prompt() で入力を待つ
  - ユーザーが何も入力せずOK → userInput は ""

2回目：
  - userInput は "" （まだ空）
  - userInput === "" は true → ループ実行
  - prompt() で入力を待つ
  - ユーザーが「こんにちは」と入力 → userInput は "こんにちは"

3回目のチェック：
  - userInput は "こんにちは"
  - userInput === "" は false → ループ終了
  - console.log で "入力されました: こんにちは" を表示
```

**ポイント：**
- 初期化：`let userInput = ""`（空文字列で開始）
- 条件：`userInput === ""`（入力が空の間）
- 更新：`userInput = prompt()`（ユーザーの入力で更新）
- **入力があるまで終わらない**

### prompt()とは

`prompt()`は、ブラウザに入力ダイアログを表示する関数です。

**基本的な使い方：**
```javascript
let answer = prompt("質問文");
```

**prompt()の戻り値：**
| ユーザーの操作 | 戻り値 | 説明 |
|--------------|--------|------|
| 「こんにちは」と入力してOK | `"こんにちは"` | 入力した文字列が返される |
| 何も入力せずOK | `""` | 空文字列が返される |
| キャンセルボタンを押す | `null` | nullが返される |

**例：**
```javascript
let name = prompt("お名前は？");

// ユーザーが「太郎」と入力した場合
console.log(name);  // "太郎"

// ユーザーが何も入力せずOKを押した場合
console.log(name);  // ""

// ユーザーがキャンセルを押した場合
console.log(name);  // null
```

### prompt()の注意点

`prompt()`は学習には便利ですが、実際のWebアプリケーションではあまり使われません。

**理由：**
- ❌ ダイアログが表示されている間、ページ全体が操作できなくなる
- ❌ デザインのカスタマイズができない（見た目を変えられない）
- ❌ スマートフォンでは使いにくい
- ❌ モダンなUI/UXに合わない

**実際のアプリケーションでは：**
- ✅ HTMLの`<input>`要素を使う
- ✅ ボタンをクリックしたら処理を実行
- ✅ ページの一部だけを更新する

**このレッスンでは学習のためにprompt()を使いますが、本格的なアプリでは`<input>`を使うことを覚えておいてください。**

## パターン2：正解するまで質問

条件付きループの実践的な例として、**正解するまで質問を繰り返す**クイズを作ってみましょう。

### 基本例：シンプルなクイズ

```javascript
let answer = "";
let correctAnswer = "東京";

while (answer !== correctAnswer) {
  answer = prompt("日本の首都はどこですか？");

  if (answer === correctAnswer) {
    console.log("正解です！");
  } else {
    console.log("不正解です。もう一度挑戦してください。");
  }
}
```

**動作の流れ：**
```
1回目：
  - answer は "" （空文字列）
  - answer !== "東京" は true → ループ実行
  - prompt() で質問「日本の首都はどこですか？」
  - ユーザーが「大阪」と入力 → answer は "大阪"
  - "大阪" === "東京" は false
  - console.log("不正解です。もう一度挑戦してください。")

2回目：
  - answer は "大阪"
  - answer !== "東京" は true → ループ実行
  - prompt() で質問「日本の首都はどこですか？」
  - ユーザーが「東京」と入力 → answer は "東京"
  - "東京" === "東京" は true
  - console.log("正解です！")

3回目のチェック：
  - answer は "東京"
  - answer !== "東京" は false → ループ終了
```

**ポイント：**
- 初期化：`let answer = ""`（空文字列で開始）
- 条件：`answer !== correctAnswer`（答えが正解と異なる間）
- 更新：`answer = prompt()`（ユーザーの入力で更新）
- **正解するまで終わらない**

### 条件式の読み方

```javascript
while (answer !== correctAnswer)
```

**`!==`は「等しくない」という意味です：**
- `answer !== correctAnswer`：「答えが正解と等しくない」
- つまり、「答えが間違っている間」ループを続ける
- 答えが正解になったら（`answer === correctAnswer`）、条件が`false`になりループを抜ける

**同じ意味を別の書き方で：**
```javascript
// この2つは同じ意味
while (answer !== correctAnswer)  // 正解と等しくない間
while (answer != correctAnswer)   // 正解と等しくない間（別の書き方）
```

### より実用的な例：試行回数を記録する

もう少し実用的なクイズを作ってみましょう。

```javascript
let answer = "";
let attempts = 0;  // 試行回数を記録

while (answer !== "42") {
  answer = prompt("「人生、宇宙、すべての答え」は何ですか？");
  attempts++;  // 試行回数を1増やす

  if (answer === "42") {
    console.log("正解です！" + attempts + "回目で成功しました。");
  } else if (answer === null) {
    console.log("キャンセルされました。");
    break;  // ループを強制終了
  } else {
    console.log("不正解です。ヒント：数字です。");
  }
}
```

**動作の流れ：**
```
1回目：
  - answer は ""
  - answer !== "42" は true → ループ実行
  - prompt() で質問を表示
  - attempts++ で attempts = 1
  - ユーザーが「わからない」と入力
  - console.log("不正解です。ヒント：数字です。")

2回目：
  - answer は "わからない"
  - answer !== "42" は true → ループ実行
  - prompt() で質問を表示
  - attempts++ で attempts = 2
  - ユーザーが「42」と入力
  - console.log("正解です！2回目で成功しました。")

3回目のチェック：
  - answer は "42"
  - answer !== "42" は false → ループ終了
```

**このコードの改善点：**

**1. 試行回数のカウント**
```javascript
let attempts = 0;  // カウンター変数
// ...
attempts++;  // ループのたびに1増やす
```
何回目で正解したかを記録します。

**2. キャンセル対応**
```javascript
if (answer === null) {
  console.log("キャンセルされました。");
  break;  // ループを強制終了
}
```
ユーザーがキャンセルボタンを押した場合の処理を追加しています。
`break`については次のレッスンで詳しく学びます。

**3. ヒント表示**
```javascript
else {
  console.log("不正解です。ヒント：数字です。");
}
```
不正解の場合にヒントを表示して、ユーザーが正解しやすくします。

## パターン3：無限ループに注意

条件付きループを使う際に最も重要なのは、**必ずループが終了する条件を設定すること**です。

### 良い終了条件の例

```javascript
let input = "";

// 良い例：明確な終了条件がある
while (input !== "quit") {
  input = prompt("'quit'と入力すると終了します");
  console.log("入力: " + input);
}
```

**ポイント：**
- ユーザーが`"quit"`と入力すれば必ず終了する
- 終了方法が明確で分かりやすい
- ユーザーがループを制御できる

### 複数の終了条件を組み合わせる

複数の条件を組み合わせることで、より安全なループを作れます。

```javascript
let password = "";
let attempts = 0;
let maxAttempts = 3;

while (password !== "secret" && attempts < maxAttempts) {
  password = prompt("パスワードを入力してください（残り" + (maxAttempts - attempts) + "回）");
  attempts++;

  if (password === "secret") {
    console.log("ログイン成功！");
  } else if (attempts >= maxAttempts) {
    console.log("試行回数の上限に達しました。");
  } else {
    console.log("パスワードが違います。");
  }
}
```

**2つの終了条件：**
1. **正解条件**：`password === "secret"`（正しいパスワードが入力された）
2. **上限条件**：`attempts >= maxAttempts`（試行回数が上限に達した）

**条件式の読み方：**
```javascript
while (password !== "secret" && attempts < maxAttempts)
```
- `password !== "secret"`：パスワードが正しくない
- `&&`：かつ
- `attempts < maxAttempts`：試行回数が上限未満
- → **両方が真の間**だけループを続ける
- → **どちらか一方でも偽になったら**ループを抜ける

**動作例：**
```
1回目：
  - password は ""
  - attempts は 0
  - password !== "secret" は true（パスワードが違う）
  - attempts < 3 は true（0 < 3）
  - 両方 true なのでループ実行
  - ユーザーが「abc」と入力
  - attempts++ で attempts = 1

2回目：
  - password は "abc"
  - attempts は 1
  - password !== "secret" は true
  - attempts < 3 は true（1 < 3）
  - 両方 true なのでループ実行
  - ユーザーが「secret」と入力
  - attempts++ で attempts = 2

3回目のチェック：
  - password は "secret"
  - attempts は 2
  - password !== "secret" は false（パスワードが正しい！）
  - 条件が false なのでループ終了
```

### 無限ループの危険性（重要）

終了条件が適切でないと、**無限ループ**が発生します。

**危険な例1：終了条件がない**
```javascript
let input = "";

// ✗ 危険：終了条件がない
while (true) {
  input = prompt("何か入力してください");
  console.log(input);
  // inputの値に関わらずループが続く
}
```

**何が起こるか：**
- `while (true)`：条件が常に`true`
- ループを抜ける方法がない
- ブラウザが応答しなくなる（フリーズ）

**危険な例2：条件が変化しない**
```javascript
let answer = "";

// ✗ 危険：answerが更新されない
while (answer !== "quit") {
  prompt("何か入力してください");  // answerに代入していない！
  // answerは常に""のまま
}
```

**何が起こるか：**
- `answer`が更新されない
- `answer !== "quit"`が永遠に`true`
- 無限ループ

**正しい書き方：**
```javascript
let answer = "";

// ✓ 正しい：answerを更新する
while (answer !== "quit") {
  answer = prompt("'quit'と入力すると終了します");  // answerに代入！
}
```

### 無限ループを防ぐチェックリスト

条件付きループを書く前に、以下を確認しましょう：

- [ ] **終了条件が明確か？**（いつループが終わるかわかるか？）
- [ ] **ループの中で条件が変化するか？**（ユーザーの入力など）
- [ ] **必ず終了する保証があるか？**（上限回数など）
- [ ] **ユーザーにループの終了方法を伝えているか？**（メッセージなど）

**安全なループのパターン：**
```javascript
// パターン1：ユーザーの入力で終了
while (input !== "終了キーワード") {
  input = prompt("メッセージ");
}

// パターン2：上限回数で終了
while (condition && attempts < maxAttempts) {
  // 処理
  attempts++;
}

// パターン3：複数の終了条件
while (condition1 && condition2) {
  // 少なくとも1つの条件が変化する処理
}
```

## ユーザー駆動のループ

ユーザーの操作によってループの継続を決定する場合、明確な終了方法を提供することが重要です。

### 継続確認のパターン

```javascript
let continueLoop = true;

while (continueLoop) {
  let name = prompt("名前を入力してください");
  console.log("こんにちは、" + name + "さん！");

  let response = prompt("続けますか？（yes/no）");

  if (response === "no") {
    continueLoop = false;
  }
}

console.log("終了しました。");
```

このパターンでは：

- **フラグ変数**：`continueLoop`という変数でループの継続を管理します
- **明確な終了方法**：ユーザーに「続けるか」を尋ねます
- **ユーザーの選択**：ユーザーが"no"と答えるとループが終了します

## 実践例：繰り返し質問機

HTMLとJavaScriptを組み合わせて、より実用的な繰り返し質問機を作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>繰り返し質問機</title>
</head>
<body>
    <h1>クイズアプリ</h1>
    <button id="startQuiz">クイズ開始</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let startQuiz = document.getElementById("startQuiz");
let result = document.getElementById("result");

startQuiz.addEventListener("click", function() {
  result.innerHTML = "";

  let answer = "";
  let correctAnswer = "JavaScript";
  let attempts = 0;
  let maxAttempts = 5;

  while (answer !== correctAnswer && attempts < maxAttempts) {
    answer = prompt("このレッスンで学んでいるプログラミング言語は何ですか？");
    attempts++;

    if (answer === null) {
      // キャンセルされた場合
      result.innerHTML = "<p>クイズをキャンセルしました。</p>";
      break;
    } else if (answer === correctAnswer) {
      result.innerHTML = "<p>正解です！" + attempts + "回目で成功しました。</p>";
    } else if (attempts >= maxAttempts) {
      result.innerHTML = "<p>残念！試行回数の上限に達しました。正解は「" + correctAnswer + "」でした。</p>";
    } else {
      result.innerHTML = "<p>不正解です。残り" + (maxAttempts - attempts) + "回挑戦できます。</p>";
    }
  }
});
```

### コードの詳しい説明

**変数の準備**
```javascript
let answer = "";
let correctAnswer = "JavaScript";
let attempts = 0;
let maxAttempts = 5;
```
- `answer`：ユーザーの入力を保存します
- `correctAnswer`：正解を設定します
- `attempts`：試行回数を記録します
- `maxAttempts`：最大試行回数を設定します

**ループ条件**
```javascript
while (answer !== correctAnswer && attempts < maxAttempts)
```
- `answer !== correctAnswer`：答えが正解と異なる間
- `attempts < maxAttempts`：試行回数が上限未満の間
- 両方の条件が真の間、ループが続きます

**キャンセル処理**
```javascript
if (answer === null) {
  result.innerHTML = "<p>クイズをキャンセルしました。</p>";
  break;
}
```
- `prompt()`でキャンセルすると`null`が返されます
- `break`でループを強制終了します

## 練習問題

### 課題：繰り返し質問機

条件付きループを使って、正解するまで質問を繰り返すクイズアプリを作成してください。

### 保存場所

`exercises/lesson-075/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. 入力があるまで繰り返す処理を実装する
2. 正解するまで質問を繰り返す仕組みを作る
3. 無限ループに注意して終了条件を設計する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-075
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

条件付きループを実装する際のポイントを確認しましょう。

**終了条件の設定**
- while文の条件式には、いつかは偽になる条件を設定します
- 例：`answer !== correctAnswer`（正解すれば偽になる）
- 例：`attempts < maxAttempts`（上限に達すれば偽になる）

**promptの使い方**
- `let answer = prompt("質問文")`で入力を取得します
- ユーザーがキャンセルすると`null`が返されます
- キャンセル時の処理も考慮しましょう

**試行回数の管理**
- ループのたびに`attempts++`で回数を増やします
- 最大試行回数を設定して無限ループを防ぎます
- 残り回数をユーザーに表示すると親切です

**複数条件の組み合わせ**
- `&&`（AND）で複数の条件を組み合わせられます
- `while (answer !== correctAnswer && attempts < maxAttempts)`
- 両方の条件が真の間、ループが続きます

### 解答例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 075</title>
</head>
<body>
    <h1>繰り返し質問機</h1>
    <button id="startQuiz">クイズ開始</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let startQuiz = document.getElementById("startQuiz");
let result = document.getElementById("result");

startQuiz.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  let answer = "";
  let correctAnswer = "JavaScript";
  let attempts = 0;
  let maxAttempts = 5;

  // 正解するか、試行回数が上限に達するまで繰り返す
  while (answer !== correctAnswer && attempts < maxAttempts) {
    answer = prompt("このレッスンで学んでいるプログラミング言語は何ですか？");
    attempts++;

    // キャンセルされた場合
    if (answer === null) {
      result.innerHTML = "<p>クイズをキャンセルしました。</p>";
      break;
    }
    // 正解の場合
    else if (answer === correctAnswer) {
      result.innerHTML = "<p>正解です！" + attempts + "回目で成功しました。</p>";
    }
    // 試行回数上限に達した場合
    else if (attempts >= maxAttempts) {
      result.innerHTML = "<p>残念！試行回数の上限に達しました。正解は「" + correctAnswer + "」でした。</p>";
    }
    // 不正解の場合
    else {
      result.innerHTML = "<p>不正解です。残り" + (maxAttempts - attempts) + "回挑戦できます。</p>";
    }
  }
});
```

### 解説

このコードでは、条件付きループを使ってクイズアプリを実装しています。

**変数の初期化**
```javascript
let answer = "";
let correctAnswer = "JavaScript";
let attempts = 0;
let maxAttempts = 5;
```
クイズに必要な変数を準備します。`answer`は空文字列で初期化し、`correctAnswer`に正解を設定します。

**while文の条件式**
```javascript
while (answer !== correctAnswer && attempts < maxAttempts)
```
2つの条件を`&&`で結合しています。
- `answer !== correctAnswer`：答えが正解と異なる
- `attempts < maxAttempts`：試行回数が上限未満

両方が真の間、ループが続きます。どちらか一方でも偽になるとループを抜けます。

**promptでの入力取得**
```javascript
answer = prompt("このレッスンで学んでいるプログラミング言語は何ですか？");
attempts++;
```
各ループで質問を表示し、試行回数を1増やします。

**キャンセル処理**
```javascript
if (answer === null) {
  result.innerHTML = "<p>クイズをキャンセルしました。</p>";
  break;
}
```
ユーザーがキャンセルボタンを押すと`null`が返されるので、その場合はメッセージを表示して`break`でループを終了します。

**条件分岐**
```javascript
else if (answer === correctAnswer) {
  // 正解時の処理
} else if (attempts >= maxAttempts) {
  // 試行回数上限時の処理
} else {
  // 不正解時の処理
}
```
答えの状態に応じて、適切なメッセージを表示します。

## まとめ

お疲れ様でした。今回のレッスンでは、条件付きループについて学びました。

### 学んだこと

**1. 条件付きループの基本**
- **回数ループ vs 条件ループ**：回数が決まっているループと、条件で終了するループの違い
- **特徴**：繰り返し回数が事前にわからない、ユーザーの入力や状態で終了する
- **使い道**：ログイン処理、クイズアプリ、ユーザー入力の検証など

**2. 3つの基本パターン**

**パターン1：入力があるまで繰り返し**
```javascript
let userInput = "";
while (userInput === "") {
  userInput = prompt("何か入力してください");
}
```
- ✅ カリキュラム要件：入力があるまで繰り返し

**パターン2：正解するまで質問**
```javascript
let answer = "";
while (answer !== correctAnswer) {
  answer = prompt("質問");
  // 正解判定
}
```
- ✅ カリキュラム要件：正解するまで質問

**パターン3：無限ループに注意**
```javascript
// 複数の終了条件で安全に
while (answer !== correctAnswer && attempts < maxAttempts) {
  answer = prompt("質問");
  attempts++;
}
```
- ✅ カリキュラム要件：無限ループに注意

**3. 終了条件の設計**
- **明確な終了条件**：いつループが終わるかわかるようにする
- **複数の終了条件**：`&&`で組み合わせて安全性を高める
- **上限回数の設定**：無限ループを防ぐ安全装置
- **ユーザーへの案内**：終了方法を明確に伝える

**4. 無限ループの回避**
- 終了条件が変化しないと無限ループになる
- ループの中で条件を更新する処理が必要
- 上限回数を設定して安全性を確保
- チェックリストで確認してから実装

**5. prompt()の使い方**
- `prompt("質問")`でユーザーに入力を求める
- 戻り値：入力した文字列、`""`（空）、`null`（キャンセル）
- 学習用には便利だが、実際のアプリでは`<input>`を使う

### カリキュラム要件の達成

- ✅ **入力があるまで繰り返し**：空入力を許さないループを実装
- ✅ **正解するまで質問**：クイズアプリで正解するまで繰り返す
- ✅ **無限ループに注意**：終了条件の設計と安全装置の実装
- ✅ **知識：終了条件の設計**：明確な終了条件と複数条件の組み合わせ
- ✅ **知識：ユーザー駆動のループ**：ユーザーの入力で制御するループ
- ✅ **成果物：繰り返し質問機**：実践例で完全なクイズアプリを作成

### 重要なポイント

**条件付きループを書くときの手順：**
1. **終了条件を決める**：どうなったらループを終了するか
2. **変数を初期化する**：ループ前に必要な変数を準備
3. **while文を書く**：終了条件を条件式に書く
4. **ループ内で更新**：条件が変化する処理を入れる
5. **安全装置を追加**：上限回数などで無限ループを防ぐ
6. **テストする**：実際に動かして確認

**安全なループのチェックリスト：**
- [ ] 終了条件が明確か？
- [ ] ループの中で条件が変化するか？
- [ ] 必ず終了する保証があるか？
- [ ] ユーザーに終了方法を伝えているか？

### 次のステップ

次のレッスンでは、**break文**について学びます。ループを途中で抜ける方法を理解し、より柔軟なループ制御を習得していきましょう。

条件付きループは、ユーザーとのインタラクションを実現する重要な技術です。今回学んだパターン（入力チェック、正解判定、安全な終了条件）は、実際のWebアプリケーション開発でも頻繁に使用されます。

**練習問題を解いて、しっかりマスターしましょう！**
