---
title: "Lesson 076: break文"
author: "JavaScript学習教材"
date: "2025-01-21"
---

# レッスン76：break文

## 今回の学習

### 前回の復習

前回のレッスンでは、条件付きループについて学びました。

- **終了条件の設計**：ユーザー入力や特定の状態に基づいて、ループをいつ終了するかを設計する方法を学びました
- **ユーザー駆動のループ**：`prompt()`を使った入力取得や、複数の終了条件を組み合わせる方法を理解しました
- **無限ループの回避**：最大試行回数の設定や明確な終了条件の提供によって、無限ループを防ぐ方法を習得しました
- **成果物**：繰り返し質問機 - 正解するまで質問を繰り返すクイズアプリを実装しました

### 今回の目標

今回のレッスンでは、ループを途中で抜けるための`break`文について学びます。

- ループを途中で抜ける方法を理解する
- 条件に応じてbreakを使う仕組みを学ぶ
- 早期終了のパターンを習得する

## break文とは

これまで学んだループは、条件式が偽になるまで繰り返し続けました。しかし、実際のプログラミングでは、「特定の条件が満たされたら即座にループを抜けたい」という場面があります。

このような場合に使うのが**break文**です。break文は、ループを即座に終了させる命令です。

### break文の基本構文

```javascript
while (条件式) {
  処理1;

  if (特定の条件) {
    break;  // ループを抜ける
  }

  処理2;
}
```

`break`文が実行されると、その時点でループが終了し、ループの次の処理に進みます。

### 日常生活での例え

break文は、日常生活の中でもよく見られる考え方です。

例えば、「宝探しゲーム」を考えてみましょう。

```
while (まだ探している) {
  場所を調べる

  if (宝を見つけた) {
    break;  // 探すのをやめる
  }

  次の場所に移動する
}
```

宝を見つけたら、それ以上探す必要はありません。すぐに探索を終了します。これがbreak文の役割です。

## break文の基本的な使い方

まず、シンプルな例でbreak文の動作を見てみましょう。

### 基本例：特定の値で停止

```javascript
let i = 0;

while (i < 10) {
  console.log(i);

  if (i === 5) {
    break;  // iが5になったらループを抜ける
  }

  i++;
}

console.log("ループ終了");
```

このコードの実行結果：

```
0
1
2
3
4
5
ループ終了
```

### 動作の詳細

1. **i = 0のとき**：0を表示、`i === 5`は偽なのでbreakされず、`i++`で1になる
2. **i = 1のとき**：1を表示、`i === 5`は偽なのでbreakされず、`i++`で2になる
3. ...（同様に続く）
4. **i = 5のとき**：5を表示、`i === 5`が真になり、`break`が実行される
5. ループを抜けて「ループ終了」が表示される

注目すべき点は、`i === 5`のときに`break`が実行されるため、その後の`i++`は実行されないということです。

## 条件付きbreak

break文は、if文と組み合わせて使うことが一般的です。これにより、特定の条件が満たされたときだけループを抜けることができます。

### 目標値に到達したら終了

```javascript
let sum = 0;
let i = 1;

while (true) {  // 無限ループ
  sum += i;
  console.log(i + "まで: " + sum);

  if (sum >= 100) {
    console.log("合計が100を超えました");
    break;
  }

  i++;
}
```

実行結果（一部）：

```
1まで: 1
2まで: 3
3まで: 6
...
13まで: 91
14まで: 105
合計が100を超えました
```

この例では、`while (true)`で無限ループを作っていますが、`break`によって適切なタイミングでループを抜けています。

### 複数の終了条件

break文を複数使うこともできます。

```javascript
let count = 0;

while (count < 100) {
  count++;
  console.log("カウント: " + count);

  if (count === 10) {
    console.log("10に到達したので終了");
    break;
  }

  if (count % 7 === 0) {
    console.log("7の倍数が見つかったので終了");
    break;
  }
}
```

このコードは、以下のいずれかの条件で終了します：

1. カウントが10に到達した
2. 7の倍数が見つかった
3. カウントが100に到達した（while条件）

## ユーザー入力とbreak

ユーザーの入力に基づいてループを制御する場合、break文は非常に有用です。

### 終了コマンドでループを抜ける

```javascript
while (true) {
  let input = prompt("コマンドを入力してください（'exit'で終了）");

  if (input === "exit") {
    console.log("プログラムを終了します");
    break;
  }

  if (input === null) {
    console.log("キャンセルされました");
    break;
  }

  console.log("入力されたコマンド: " + input);
}
```

この例では：

- `"exit"`と入力するとループを抜ける
- キャンセルボタンを押してもループを抜ける
- それ以外の入力はループが続く

### 検索処理での使用

```javascript
let targetNumber = 42;
let found = false;
let attempts = 0;

while (attempts < 10) {
  let guess = prompt("数字を当ててください（1-100）");
  attempts++;

  if (guess === null) {
    console.log("ゲームをキャンセルしました");
    break;
  }

  let number = parseInt(guess);

  if (number === targetNumber) {
    console.log("正解です！" + attempts + "回目で当たりました。");
    found = true;
    break;
  } else if (number < targetNumber) {
    console.log("もっと大きい数です");
  } else {
    console.log("もっと小さい数です");
  }
}

if (!found && attempts >= 10) {
  console.log("残念！正解は" + targetNumber + "でした。");
}
```

この数当てゲームでは、以下の場合にbreakが実行されます：

1. ユーザーがキャンセルした
2. 正解を当てた

## break文の注意点

break文を使う際には、いくつかの注意点があります。

### 1. breakは最も内側のループのみを抜ける

```javascript
let i = 0;

while (i < 5) {
  console.log("外側のループ: " + i);

  let j = 0;
  while (j < 3) {
    console.log("  内側のループ: " + j);

    if (j === 1) {
      break;  // 内側のループだけを抜ける
    }

    j++;
  }

  i++;
}
```

内側のループで`break`を実行しても、外側のループは続きます。

### 2. breakの後の処理は実行されない

```javascript
let i = 0;

while (i < 10) {
  if (i === 5) {
    break;
  }

  console.log(i);  // breakの前に実行される
  i++;
}
```

`break`が実行されると、その後のループ内の処理（この例では`console.log`と`i++`）はスキップされます。

### 3. while条件とbreakの関係

```javascript
let i = 0;

while (i < 10) {
  if (i === 3) {
    break;
  }
  i++;
}

console.log("最終的なiの値: " + i);  // 3
```

`break`で抜けた場合、while条件の評価は行われません。この例では、`i < 10`が偽になる前にループを抜けています。

## 実践例：脱出ゲーム

HTMLとJavaScriptを組み合わせて、break文を使った脱出ゲームを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>脱出ゲーム</title>
</head>
<body>
    <h1>部屋からの脱出</h1>
    <p>正しいアイテムを選んで部屋から脱出しましょう</p>
    <button id="startGame">ゲーム開始</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let startGame = document.getElementById("startGame");
let result = document.getElementById("result");

startGame.addEventListener("click", function() {
  result.innerHTML = "";

  let items = ["鍵", "本", "リンゴ", "懐中電灯", "地図"];
  let correctItem = "鍵";
  let attempts = 0;
  let maxAttempts = 5;
  let escaped = false;

  result.innerHTML = "<p>アイテム: " + items.join(", ") + "</p>";

  while (attempts < maxAttempts) {
    let choice = prompt("どのアイテムを使いますか？");
    attempts++;

    // キャンセルされた場合
    if (choice === null) {
      result.innerHTML += "<p>ゲームをキャンセルしました。</p>";
      break;
    }

    // 正解の場合
    if (choice === correctItem) {
      result.innerHTML += "<p>正解！「" + choice + "」で扉が開きました。脱出成功！</p>";
      escaped = true;
      break;  // ゲーム終了
    }

    // 不正解の場合
    let remaining = maxAttempts - attempts;
    if (remaining > 0) {
      result.innerHTML += "<p>「" + choice + "」では扉が開きません。残り" + remaining + "回</p>";
    }
  }

  // 試行回数を使い切った場合
  if (!escaped && attempts >= maxAttempts) {
    result.innerHTML += "<p>残念！チャンスを使い切りました。正解は「" + correctItem + "」でした。</p>";
  }
});
```

### コードの詳しい説明

**変数の準備**
```javascript
let items = ["鍵", "本", "リンゴ", "懐中電灯", "地図"];
let correctItem = "鍵";
let attempts = 0;
let maxAttempts = 5;
let escaped = false;
```
- `items`：選択肢のリスト
- `correctItem`：正解のアイテム
- `attempts`：試行回数
- `escaped`：脱出成功フラグ

**ループ条件**
```javascript
while (attempts < maxAttempts)
```
最大試行回数まで繰り返しますが、`break`で早期終了する可能性があります。

**キャンセル時のbreak**
```javascript
if (choice === null) {
  result.innerHTML += "<p>ゲームをキャンセルしました。</p>";
  break;
}
```
ユーザーがキャンセルした場合、即座にループを抜けます。

**正解時のbreak**
```javascript
if (choice === correctItem) {
  result.innerHTML += "<p>正解！「" + choice + "」で扉が開きました。脱出成功！</p>";
  escaped = true;
  break;
}
```
正解した場合、フラグを立ててループを抜けます。

## 練習問題

### 課題：脱出ゲーム

break文を使って、正解のアイテムを選ぶまで繰り返す脱出ゲームを作成してください。

### 保存場所

`exercises/lesson-076/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. ループを抜ける処理を実装する
2. 条件でbreakを使う仕組みを作る
3. 早期終了のパターンを組み込む

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-076
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

break文を実装する際のポイントを確認しましょう。

**breakの配置**
- `break`は条件分岐（if文）の中に書きます
- 条件が満たされたときだけbreakが実行されます
- breakの後の処理は実行されないことに注意しましょう

**複数のbreak条件**
- キャンセル時のbreak
- 正解時のbreak
- それぞれ適切なメッセージを表示してからbreakします

**フラグ変数の活用**
- `escaped`のようなフラグ変数で状態を管理します
- ループを抜けた後、なぜ抜けたのかを判定できます
- `if (!escaped && attempts >= maxAttempts)`のように使います

**ループ後の処理**
- breakで抜けた場合と、条件で抜けた場合を区別します
- フラグ変数を使って、適切なメッセージを表示します

### 解答例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 076</title>
</head>
<body>
    <h1>部屋からの脱出</h1>
    <p>正しいアイテムを選んで部屋から脱出しましょう</p>
    <button id="startGame">ゲーム開始</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let startGame = document.getElementById("startGame");
let result = document.getElementById("result");

startGame.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  let items = ["鍵", "本", "リンゴ", "懐中電灯", "地図"];
  let correctItem = "鍵";
  let attempts = 0;
  let maxAttempts = 5;
  let escaped = false;

  // アイテムリストを表示
  result.innerHTML = "<p>アイテム: " + items.join(", ") + "</p>";

  // ゲームループ
  while (attempts < maxAttempts) {
    let choice = prompt("どのアイテムを使いますか？");
    attempts++;

    // キャンセルされた場合
    if (choice === null) {
      result.innerHTML += "<p>ゲームをキャンセルしました。</p>";
      break;
    }

    // 正解の場合
    if (choice === correctItem) {
      result.innerHTML += "<p>正解！「" + choice + "」で扉が開きました。脱出成功！</p>";
      escaped = true;
      break;  // ループを抜ける
    }

    // 不正解の場合
    let remaining = maxAttempts - attempts;
    if (remaining > 0) {
      result.innerHTML += "<p>「" + choice + "」では扉が開きません。残り" + remaining + "回</p>";
    }
  }

  // 試行回数を使い切った場合
  if (!escaped && attempts >= maxAttempts) {
    result.innerHTML += "<p>残念！チャンスを使い切りました。正解は「" + correctItem + "」でした。</p>";
  }
});
```

### 解説

このコードでは、break文を使って脱出ゲームを実装しています。

**ゲームの初期設定**
```javascript
let items = ["鍵", "本", "リンゴ", "懐中電灯", "地図"];
let correctItem = "鍵";
let attempts = 0;
let maxAttempts = 5;
let escaped = false;
```
アイテムリスト、正解、試行回数、脱出フラグを準備します。

**while文のループ条件**
```javascript
while (attempts < maxAttempts)
```
最大5回まで繰り返しますが、正解やキャンセルでbreakする可能性があります。

**キャンセル時の処理**
```javascript
if (choice === null) {
  result.innerHTML += "<p>ゲームをキャンセルしました。</p>";
  break;
}
```
`prompt()`がキャンセルされると`null`が返されるので、その場合はメッセージを表示してbreakでループを抜けます。

**正解時の処理**
```javascript
if (choice === correctItem) {
  result.innerHTML += "<p>正解！「" + choice + "」で扉が開きました。脱出成功！</p>";
  escaped = true;
  break;
}
```
正解の場合、`escaped`フラグを`true`にしてからbreakでループを抜けます。このフラグにより、ループを抜けた理由を判定できます。

**ループ終了後の処理**
```javascript
if (!escaped && attempts >= maxAttempts) {
  result.innerHTML += "<p>残念！チャンスを使い切りました。正解は「" + correctItem + "」でした。</p>";
}
```
`escaped`が`false`で、試行回数が上限に達した場合は、失敗メッセージを表示します。breakで抜けた場合（escapedがtrue）は、この処理は実行されません。

## まとめ

お疲れ様でした。今回のレッスンでは、break文について学びました。

**今回学んだキーポイント**

- **break文の役割**：`break`文は、ループを即座に終了させる命令です。条件が満たされた時点でループを抜け、ループの次の処理に進みます
- **ループの制御**：if文と組み合わせることで、特定の条件が満たされたときだけループを抜けることができます。これにより、より柔軟なループ制御が可能になります
- **早期終了のパターン**：目標達成、エラー検出、ユーザーのキャンセルなど、さまざまな理由でループを早期終了できます。フラグ変数を使うことで、終了理由を判定できます
- **breakの動作**：breakは最も内側のループのみを抜けます。また、breakの後の処理は実行されないため、配置には注意が必要です

break文は、ループ制御の重要な手段です。適切に使うことで、より読みやすく効率的なコードを書くことができます。

次のレッスンでは、for文について学びます。while文とは異なる、より簡潔なループの書き方を理解していきましょう。
