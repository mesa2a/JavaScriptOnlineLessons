---
title: "Lesson 083: ループの選択"
author: "JavaScript学習教材"
date: "2025-01-21"
---

# レッスン83：ループの選択

## 今回の学習

### 前回の復習

前回のレッスンでは、continue文について学びました。

- **continue文**：現在のループ処理だけをスキップして、次のループに進む命令です。breakと異なり、ループ全体は終了しません
- **ループの部分スキップ**：特定の条件に合う場合だけ処理をスキップすることで、不要なデータを除外できます
- **フィルタリング**：偶数・奇数のフィルタリングや空の値の除外など、さまざまな場面で活用できます
- **成果物**：偶数だけ表示 - continue文を使って偶数だけをフィルタリングするプログラムを実装しました

### 今回の目標

今回のレッスンでは、while文とfor文の使い分けについて学びます。

- while文とfor文の違いを理解する
- 使い分けの基準を学ぶ
- 可読性を考慮したループの選択方法を習得する

## while文とfor文の復習

これまでのレッスンで、2つの主要なループ文を学んできました。ここで改めて、それぞれの特徴を確認しましょう。

### while文の基本

```javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

**特徴**：
- 条件だけを指定してループを作る
- 初期化と更新は別々に書く
- 柔軟性が高い

### for文の基本

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

**特徴**：
- 初期化、条件、更新を1行にまとめて書く
- カウンタを使った繰り返しに最適
- コンパクトで読みやすい

## while文が適している場面

while文は、以下のような場面で適しています。

### 1. 繰り返し回数が事前に決まっていない

ユーザーの入力や外部条件によって、ループの回数が変わる場合はwhile文が適しています。

```javascript
let password = "";

while (password !== "secret") {
  password = prompt("パスワードを入力してください");
}

console.log("ログイン成功");
```

この例では、何回ループするかは事前にわかりません。正しいパスワードが入力されるまで繰り返します。

### 2. 条件が複雑な場合

```javascript
let health = 100;
let energy = 50;

while (health > 0 && energy > 0) {
  console.log("戦闘中...");
  health -= 10;
  energy -= 5;
}

console.log("戦闘終了");
```

複数の条件を組み合わせる場合、while文の方が意図が明確になります。

### 3. 無限ループを意図的に作る

```javascript
while (true) {
  let command = prompt("コマンドを入力（'exit'で終了）");

  if (command === "exit") {
    break;
  }

  console.log("コマンド: " + command);
}
```

`while (true)`で無限ループを作り、`break`で終了する パターンは、while文でよく使われます。

## for文が適している場面

for文は、以下のような場面で適しています。

### 1. 決まった回数繰り返す

```javascript
// 10回繰り返す
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

繰り返し回数が明確な場合、for文が最も読みやすくなります。

### 2. カウンタを使った処理

```javascript
// 1から100までの合計を計算
let sum = 0;

for (let i = 1; i <= 100; i++) {
  sum += i;
}

console.log("合計: " + sum);
```

カウンタ変数を使って計算する場合、for文が適しています。

### 3. 配列やリストの要素を処理（後のレッスンで学びます）

```javascript
// 配列の各要素を処理
let fruits = ["りんご", "みかん", "ぶどう"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

配列の要素を順番に処理する場合、for文が一般的です。

## 同じ処理の比較

同じ処理を、while文とfor文で書き比べてみましょう。

### 例1：1から10まで表示

**while文**
```javascript
let i = 1;
while (i <= 10) {
  console.log(i);
  i++;
}
```

**for文**
```javascript
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
```

**どちらを選ぶ？**
→ for文の方が簡潔で読みやすい

### 例2：ユーザーが"quit"と入力するまで繰り返す

**while文**
```javascript
let input = "";
while (input !== "quit") {
  input = prompt("コマンドを入力");
  console.log(input);
}
```

**for文**
```javascript
for (let input = ""; input !== "quit"; ) {
  input = prompt("コマンドを入力");
  console.log(input);
}
```

**どちらを選ぶ？**
→ while文の方が意図が明確

## 使い分けの基準

while文とfor文を選ぶ際の基準をまとめます。

### for文を選ぶ場合

- ✅ 繰り返し回数が事前に決まっている
- ✅ カウンタ変数を使う
- ✅ 0から始めてNまで、という単純な繰り返し
- ✅ 配列の要素を順番に処理する

**例**：
- 1から100まで表示
- 10回メッセージを出す
- 配列の全要素を処理

### while文を選ぶ場合

- ✅ 繰り返し回数が事前にわからない
- ✅ 条件が複雑
- ✅ ユーザー入力に依存する
- ✅ 無限ループ + break のパターン

**例**：
- 正解するまで質問
- ユーザーが"quit"と入力するまで
- 特定の条件が満たされるまで

## 可読性の考慮

コードの読みやすさは非常に重要です。適切なループを選ぶことで、コードの意図が明確になります。

### 読みにくい例

```javascript
// for文を無理に使った例
for (let password = ""; password !== "secret"; ) {
  password = prompt("パスワードを入力");
}
```

繰り返し回数が不明な場合にfor文を使うと、読みにくくなります。

### 読みやすい例

```javascript
// while文を使った例
let password = "";
while (password !== "secret") {
  password = prompt("パスワードを入力");
}
```

while文を使うことで、「正しいパスワードが入力されるまで繰り返す」という意図が明確になります。

## 実践例：ループ比較

HTMLとJavaScriptを組み合わせて、while文とfor文の違いを実感できるプログラムを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ループ比較</title>
</head>
<body>
    <h1>ループの比較</h1>
    <h2>for文を使った場合</h2>
    <button id="useFor">1から10まで表示（for文）</button>
    <div id="forResult"></div>

    <h2>while文を使った場合</h2>
    <button id="useWhile">1から10まで表示（while文）</button>
    <div id="whileResult"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let useFor = document.getElementById("useFor");
let forResult = document.getElementById("forResult");
let useWhile = document.getElementById("useWhile");
let whileResult = document.getElementById("whileResult");

// for文を使った実装
useFor.addEventListener("click", function() {
  forResult.innerHTML = "";

  for (let i = 1; i <= 10; i++) {
    let p = document.createElement("p");
    p.textContent = i;
    forResult.appendChild(p);
  }
});

// while文を使った実装
useWhile.addEventListener("click", function() {
  whileResult.innerHTML = "";

  let i = 1;
  while (i <= 10) {
    let p = document.createElement("p");
    p.textContent = i;
    whileResult.appendChild(p);
    i++;
  }
});
```

### コードの詳しい説明

**for文バージョン**
```javascript
for (let i = 1; i <= 10; i++) {
  let p = document.createElement("p");
  p.textContent = i;
  forResult.appendChild(p);
}
```
- 初期化、条件、更新が1行にまとまっている
- ループ処理だけに集中できる
- コンパクトで読みやすい

**while文バージョン**
```javascript
let i = 1;
while (i <= 10) {
  let p = document.createElement("p");
  p.textContent = i;
  whileResult.appendChild(p);
  i++;
}
```
- 初期化、条件、更新が分散している
- より柔軟な制御が可能
- この例では、for文の方が適している

## チーム開発での考慮事項

実際の開発現場では、チーム全体でコードの一貫性を保つことが重要です。

### コーディング規約

多くのプロジェクトでは、以下のようなルールがあります。

1. **決まった回数のループにはfor文を使う**
   ```javascript
   // 推奨
   for (let i = 0; i < 10; i++) {
     console.log(i);
   }
   ```

2. **条件駆動のループにはwhile文を使う**
   ```javascript
   // 推奨
   while (userInput !== "quit") {
     userInput = prompt("入力してください");
   }
   ```

3. **無限ループはwhile(true)を使う**
   ```javascript
   // 推奨
   while (true) {
     if (condition) break;
   }
   ```

## 練習問題

### 課題：ループ比較

for文とwhile文の両方を使って、1から10までの数字を表示するプログラムを作成してください。

### 保存場所

`exercises/lesson-083/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. while vs forの違いを理解する
2. 使い分けの基準を考慮する
3. 可読性を意識して実装する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-083
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

ループを選択する際のポイントを確認しましょう。

**for文の実装**
- 初期化、条件、更新を1行にまとめます
- `for (let i = 1; i <= 10; i++)`という形式
- カウンタ変数がループ内でのみ有効

**while文の実装**
- カウンタ変数をループの前で宣言します
- 条件式だけをwhileに書きます
- ループ内で必ず更新処理を入れます

**両者の比較**
- 同じ結果になることを確認します
- どちらが読みやすいか考えます
- 状況に応じて適切な方を選びます

### 解答例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 083</title>
</head>
<body>
    <h1>ループの比較</h1>
    <h2>for文を使った場合</h2>
    <button id="useFor">1から10まで表示（for文）</button>
    <div id="forResult"></div>

    <h2>while文を使った場合</h2>
    <button id="useWhile">1から10まで表示（while文）</button>
    <div id="whileResult"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let useFor = document.getElementById("useFor");
let forResult = document.getElementById("forResult");
let useWhile = document.getElementById("useWhile");
let whileResult = document.getElementById("whileResult");

// for文を使った実装
useFor.addEventListener("click", function() {
  // 結果をクリア
  forResult.innerHTML = "";

  // for文で1から10まで表示
  for (let i = 1; i <= 10; i++) {
    let p = document.createElement("p");
    p.textContent = i;
    forResult.appendChild(p);
  }
});

// while文を使った実装
useWhile.addEventListener("click", function() {
  // 結果をクリア
  whileResult.innerHTML = "";

  // while文で1から10まで表示
  let i = 1;
  while (i <= 10) {
    let p = document.createElement("p");
    p.textContent = i;
    whileResult.appendChild(p);
    i++;
  }
});
```

### 解説

このコードでは、同じ処理をfor文とwhile文の両方で実装しています。

**for文バージョン**
```javascript
for (let i = 1; i <= 10; i++) {
  let p = document.createElement("p");
  p.textContent = i;
  forResult.appendChild(p);
}
```
- **初期化**：`let i = 1`でカウンタを1から開始
- **条件**：`i <= 10`で10以下の間ループ
- **更新**：`i++`で1ずつ増加
- すべてが1行にまとまっていて、ループの全体像が一目でわかります

**while文バージョン**
```javascript
let i = 1;
while (i <= 10) {
  let p = document.createElement("p");
  p.textContent = i;
  whileResult.appendChild(p);
  i++;
}
```
- **初期化**：ループの前で`let i = 1`を実行
- **条件**：`while (i <= 10)`で条件だけを指定
- **更新**：ループの最後で`i++`を実行
- 初期化と更新が分散していますが、より柔軟な制御が可能です

**どちらを選ぶべきか**

この例では、「1から10まで表示する」という決まった回数のループなので、**for文の方が適しています**。

- for文の方がコンパクト
- 初期化・条件・更新が1箇所にまとまっている
- カウンタ変数のスコープがループ内に限定される
- 更新処理を忘れる心配が少ない

while文は、ユーザー入力や複雑な条件によってループ回数が変わる場合に適しています。

## まとめ

お疲れ様でした。今回のレッスンでは、ループの選択について学びました。

**今回学んだキーポイント**

- **ループの使い分け**：for文は回数が決まっている繰り返しに、while文は条件駆動の繰り返しに適しています。状況に応じて適切なループを選ぶことが重要です
- **適切な選択**：決まった回数ならfor文、ユーザー入力や複雑な条件ならwhile文を選びます。コードの意図を明確にすることができます
- **可読性の重要性**：適切なループを選ぶことで、コードが読みやすくなり、保守しやすくなります。チーム開発では一貫性も重要です
- **実践的な判断基準**：カウンタの有無、繰り返し回数の明確さ、条件の複雑さなどを考慮して、最適なループを選択します

ループの選択は、プログラミングの基本的なスキルです。適切なループを選ぶことで、より読みやすく保守しやすいコードを書くことができます。

次のレッスンでは、ループのパフォーマンスについて学びます。効率的なコードの書き方を理解していきましょう。
