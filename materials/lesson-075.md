---
title: "Lesson 075: 条件付きループ"
author: "JavaScript学習教材"
date: "2025-01-21"
---

# レッスン75：条件付きループ

## 今回の学習

### 前回の復習

前回のレッスンでは、while文の基本について学びました。

- **while文の構造と条件式の評価**：`while (条件式) { 処理 }`の形式で、条件が真の間、処理を繰り返す基本的な仕組みを学びました
- **カウンタ変数の使い方**：`let i = 0`で初期化し、`i < 5`で条件を設定し、`i++`で更新する基本パターンを習得しました
- **無限ループの危険性**：カウンタの更新を忘れると無限ループになることを理解しました
- **成果物**：5回ループ - カウンタを使って5回繰り返す処理を実装しました

### 今回の目標

今回のレッスンでは、ユーザーの入力や特定の条件に基づいてループを制御する方法を学びます。

- 入力があるまで繰り返す処理を理解する
- 正解するまで質問を繰り返す仕組みを作る
- 無限ループに注意しながら終了条件を設計する

## 条件付きループとは

前回のレッスンでは、カウンタ変数を使って「決まった回数」繰り返す方法を学びました。しかし、実際のプログラミングでは、「ユーザーが正解するまで」「入力があるまで」といった、回数が事前に決まっていない繰り返しもよく使われます。

このような、特定の条件が満たされるまで繰り返す処理を**条件付きループ**と呼びます。

### 日常生活での例え

条件付きループは、日常生活の中でもよく見られます。

例えば、「正解するまでクイズに挑戦する」という場面を考えてみましょう。

```
while (不正解) {
  クイズを出す
  答えを聞く
  正解かチェックする
}
```

この場合、何回チャレンジするかは事前にわかりません。1回で正解するかもしれませんし、10回かかるかもしれません。条件（正解すること）が満たされるまで、繰り返しが続きます。

## ユーザー入力を使ったループ

条件付きループの典型的な使い方は、ユーザーの入力に基づいて処理を繰り返すことです。

### 基本的な入力ループの例

```javascript
let userInput = "";

while (userInput === "") {
  userInput = prompt("何か入力してください");
}

console.log("入力されました: " + userInput);
```

このコードは以下のように動作します。

1. **初期化**：`userInput`を空文字列で初期化します
2. **条件チェック**：`userInput === ""`が真（入力が空）の間、ループします
3. **入力取得**：`prompt()`で ユーザーに入力を求めます
4. **条件再チェック**：入力があれば`userInput`が空でなくなり、ループを抜けます

### promptの動作

`prompt()`は、ブラウザに入力ダイアログを表示する関数です。

```javascript
let answer = prompt("質問文");
```

- ユーザーが入力してOKを押すと、入力した文字列が返されます
- キャンセルを押すと、`null`が返されます
- 何も入力せずOKを押すと、空文字列`""`が返されます

### 注意：promptの制限

`prompt()`は学習には便利ですが、実際のWebアプリケーションではあまり使われません。理由は以下の通りです。

- ダイアログが表示されている間、ページ全体が操作できなくなる
- デザインのカスタマイズができない
- スマートフォンでは使いにくい

実際のアプリケーションでは、HTMLの`<input>`要素を使って入力を受け取ります。

## 正解判定のループ

条件付きループの実践的な例として、正解するまで質問を繰り返すクイズを作ってみましょう。

### クイズの基本構造

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

このコードの動作フロー：

1. **初期化**：`answer`を空文字列で初期化します
2. **条件チェック**：`answer !== correctAnswer`（答えが正解と異なる）の間、ループします
3. **質問**：`prompt()`で質問を表示します
4. **判定**：答えが正解かチェックし、メッセージを表示します
5. **条件再チェック**：正解なら条件が偽になり、ループを抜けます

### より実用的な例

もう少し実用的なクイズを作ってみましょう。

```javascript
let answer = "";
let attempts = 0;  // 試行回数を記録

while (answer !== "42") {
  answer = prompt("「人生、宇宙、すべての答え」は何ですか？");
  attempts++;

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

このコードでは：

- **試行回数のカウント**：何回目で正解したかを記録します
- **キャンセル対応**：ユーザーがキャンセルした場合の処理を追加しています
- **ヒント表示**：不正解の場合にヒントを表示します

## 終了条件の設計

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

この例では、ユーザーが`"quit"`と入力すれば必ず終了します。

### 複数の終了条件

複数の条件を組み合わせることもできます。

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

この例では、以下の2つの条件のどちらかが満たされるとループが終了します。

1. 正しいパスワードが入力された
2. 試行回数が上限に達した

### 無限ループの危険性（再確認）

終了条件が適切でないと、無限ループが発生します。

```javascript
let input = "";

// 危険な例：終了条件がない
while (true) {
  input = prompt("何か入力してください");
  console.log(input);
  // inputの値に関わらずループが続く
}
```

このコードでは、`while (true)`としているため、条件が常に真のままです。ループを抜ける方法がないため、ブラウザが応答しなくなる可能性があります。

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

**今回学んだキーポイント**

- **終了条件の設計**：ユーザー入力や特定の状態に基づいて、ループをいつ終了するかを設計します。必ずループが終了する条件を設定することが重要です
- **ユーザー駆動のループ**：ユーザーの入力や選択によってループの継続を制御する方法を学びました。`prompt()`を使った入力取得や、複数の終了条件の組み合わせ方を理解しました
- **無限ループの回避**：終了条件が適切でないと無限ループが発生します。最大試行回数の設定や、明確な終了条件の提供によって、これを防ぐことができます
- **複数条件の組み合わせ**：`&&`（AND）演算子を使って、複数の条件を組み合わせることができます。すべての条件が真の間だけループが続きます

条件付きループは、ユーザーとのインタラクションを実現する重要な技術です。今回学んだパターンは、実際のWebアプリケーション開発でも頻繁に使用されます。

次のレッスンでは、break文について学びます。ループを途中で抜ける方法を理解し、より柔軟なループ制御を習得していきましょう。
