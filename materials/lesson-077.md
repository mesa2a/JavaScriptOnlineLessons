---
title: "Lesson 077: 基本のfor"
author: "JavaScript学習教材"
date: "2025-01-21"
---

# レッスン77：基本のfor

## 今回の学習

### 前回の復習

前回のレッスンでは、break文について学びました。

- **break文の役割**：`break`文は、ループを即座に終了させる命令です。条件が満たされた時点でループを抜け、ループの次の処理に進みます
- **ループの制御**：if文と組み合わせることで、特定の条件が満たされたときだけループを抜けることができます
- **早期終了のパターン**：目標達成、エラー検出、ユーザーのキャンセルなど、さまざまな理由でループを早期終了できます
- **成果物**：脱出ゲーム - 正解のアイテムを選ぶまで繰り返すゲームを実装しました

### 今回の目標

今回のレッスンでは、JavaScriptで最もよく使われるループ文である`for`文を学びます。

- for文の基本構文を理解する
- for文の3要素（初期化・条件・更新）を学ぶ
- 1から100までの数字を表示するプログラムを作る

## for文とは

これまでwhile文を使ってループを学んできました。while文は柔軟で強力ですが、「決まった回数繰り返す」という最も一般的なループには、少し冗長に感じることがあります。

```javascript
// while文での繰り返し
let i = 0;  // 初期化
while (i < 10) {  // 条件
  console.log(i);
  i++;  // 更新
}
```

このような「カウンタを使った繰り返し」をより簡潔に書けるのが**for文**です。

```javascript
// for文での繰り返し
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

for文は、while文と同じことができますが、カウンタを使った繰り返しをより読みやすく、コンパクトに書くことができます。

## for文の基本構文

for文は、以下の構文で書きます。

```javascript
for (初期化; 条件式; 更新式) {
  // 繰り返し実行される処理
}
```

### 3つの要素

for文は、括弧`()`の中に3つの要素をセミコロン`;`で区切って書きます。

1. **初期化**：ループの開始前に一度だけ実行される（例：`let i = 0`）
2. **条件式**：各ループの前に評価され、真の間ループが続く（例：`i < 10`）
3. **更新式**：各ループの最後に実行される（例：`i++`）

### 実行の流れ

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

このコードの実行フロー：

1. **初期化**：`let i = 0`が実行される（最初の1回だけ）
2. **条件チェック**：`i < 5`が真かどうかを確認する
3. **処理実行**：真なら、`console.log(i)`を実行する
4. **更新**：`i++`を実行する
5. **条件チェックに戻る**：再び`i < 5`をチェックする
6. **繰り返し**：偽になるまで3〜5を繰り返す

実行結果：

```
0
1
2
3
4
```

### 日常生活での例え

for文は、日常生活の計画に似ています。

例えば、「10ページの本を読む」という計画を考えてみましょう。

```
初期化：現在のページを1ページ目にする
条件：まだ10ページ目まで読んでいない間
更新：次のページに進む
処理：そのページを読む
```

これをfor文で表すと：

```javascript
for (let page = 1; page <= 10; page++) {
  console.log(page + "ページを読む");
}
```

## while文とfor文の比較

同じ処理をwhile文とfor文で書き比べてみましょう。

### while文の場合

```javascript
let i = 0;  // 初期化

while (i < 5) {  // 条件
  console.log(i);  // 処理
  i++;  // 更新
}
```

### for文の場合

```javascript
for (let i = 0; i < 5; i++) {  // 初期化; 条件; 更新
  console.log(i);  // 処理
}
```

### for文の利点

1. **コンパクト**：初期化、条件、更新が1行にまとまっている
2. **読みやすい**：ループの制御部分が明確に分かる
3. **間違いにくい**：更新を忘れる心配が少ない
4. **スコープが明確**：カウンタ変数`i`はループ内でのみ有効

## for文の基本的な使い方

さまざまなパターンのfor文を見ていきましょう。

### 0から9まで表示

```javascript
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

実行結果：

```
0
1
2
...
9
```

### 1から10まで表示

```javascript
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
```

開始値を1にして、条件を`<=`にすることで、1から10まで表示できます。

### 偶数だけ表示

```javascript
for (let i = 0; i < 10; i += 2) {
  console.log(i);
}
```

実行結果：

```
0
2
4
6
8
```

更新式を`i += 2`にすることで、2ずつ増やすことができます。

### メッセージを5回表示

```javascript
for (let i = 1; i <= 5; i++) {
  console.log(i + "回目のメッセージです");
}
```

実行結果：

```
1回目のメッセージです
2回目のメッセージです
3回目のメッセージです
4回目のメッセージです
5回目のメッセージです
```

## カウンタ変数の命名

for文のカウンタ変数には、慣習的に`i`、`j`、`k`という名前がよく使われます。

```javascript
for (let i = 0; i < 10; i++) {
  // iは"index"や"iterator"の略
}
```

ただし、より分かりやすい名前を使うこともできます。

```javascript
for (let count = 1; count <= 5; count++) {
  console.log("カウント: " + count);
}

for (let page = 1; page <= 10; page++) {
  console.log(page + "ページ");
}

for (let day = 1; day <= 7; day++) {
  console.log(day + "日目");
}
```

意味が明確になる場合は、分かりやすい名前を使いましょう。

## for文とDOM操作

for文を使って、複数の要素を作成することができます。

### リストアイテムを5個作成

```javascript
let list = document.getElementById("list");

for (let i = 1; i <= 5; i++) {
  let li = document.createElement("li");
  li.textContent = "アイテム " + i;
  list.appendChild(li);
}
```

このコードは、以下のようなHTML要素を作成します。

```html
<ul id="list">
  <li>アイテム 1</li>
  <li>アイテム 2</li>
  <li>アイテム 3</li>
  <li>アイテム 4</li>
  <li>アイテム 5</li>
</ul>
```

### 数字のボタンを10個作成

```javascript
let container = document.getElementById("container");

for (let i = 1; i <= 10; i++) {
  let button = document.createElement("button");
  button.textContent = i;
  button.addEventListener("click", function() {
    console.log("ボタン " + i + " がクリックされました");
  });
  container.appendChild(button);
}
```

## 実践例：1から100までの数字リスト

HTMLとJavaScriptを組み合わせて、1から100までの数字を表示するプログラムを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>数字リスト</title>
</head>
<body>
    <h1>数字リスト生成器</h1>
    <button id="generateList">1から100まで表示</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let generateList = document.getElementById("generateList");
let result = document.getElementById("result");

generateList.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  // 1から100まで繰り返す
  for (let i = 1; i <= 100; i++) {
    // 新しい段落要素を作成
    let p = document.createElement("p");
    p.textContent = i;
    result.appendChild(p);
  }
});
```

### コードの詳しい説明

**初期化**
```javascript
for (let i = 1; i <= 100; i++)
```
- `let i = 1`：カウンタを1から開始します

**条件式**
```javascript
i <= 100
```
- `i`が100以下の間、ループを続けます
- `<=`を使うことで、100も含めます

**更新式**
```javascript
i++
```
- 各ループの後に`i`を1増やします

**ループ内の処理**
```javascript
let p = document.createElement("p");
p.textContent = i;
result.appendChild(p);
```
- 新しい`<p>`要素を作成します
- `textContent`に現在の`i`の値を設定します
- `result`に要素を追加します

## for文でのbreakとcontinue

for文でも、while文と同様にbreakやcontinueを使うことができます。

### breakの使用

```javascript
for (let i = 1; i <= 100; i++) {
  console.log(i);

  if (i === 10) {
    console.log("10に到達したので終了");
    break;
  }
}
```

10に到達したらループを抜けます。

### continueの使用（次のレッスンで詳しく学びます）

```javascript
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue;  // 偶数の場合はスキップ
  }
  console.log(i);  // 奇数だけ表示
}
```

実行結果：

```
1
3
5
7
9
```

## for文の注意点

### 1. セミコロンの位置

for文の括弧内では、セミコロン`;`で区切ります。コンマ`,`ではありません。

```javascript
// 正しい
for (let i = 0; i < 10; i++) {
  console.log(i);
}

// 間違い
for (let i = 0, i < 10, i++) {  // カンマは使わない
  console.log(i);
}
```

### 2. 条件式の範囲

`<`と`<=`を間違えないように注意しましょう。

```javascript
// 0から9まで（10回）
for (let i = 0; i < 10; i++) {
  console.log(i);
}

// 0から10まで（11回）
for (let i = 0; i <= 10; i++) {
  console.log(i);
}
```

### 3. 無限ループに注意

更新式を忘れると、無限ループになります。

```javascript
// 危険：無限ループ
for (let i = 0; i < 10; ) {  // 更新式がない
  console.log(i);
  // iが変わらないので、永遠に続く
}
```

## 練習問題

### 課題：数字リスト

for文を使って、1から100までの数字を表示するプログラムを作成してください。

### 保存場所

`exercises/lesson-077/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. for (let i = 0; i < 10; i++)の構造を理解する
2. カウンタ変数を使って繰り返す
3. 1から100まで表示する処理を実装する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-077
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

for文を実装する際のポイントを確認しましょう。

**for文の3要素**
- 初期化：`let i = 1`で1から始めます
- 条件式：`i <= 100`で100まで繰り返します
- 更新式：`i++`で1ずつ増やします

**要素の作成**
- `document.createElement("p")`で段落要素を作成します
- `textContent`に数字を設定します
- `appendChild()`で結果に追加します

**ループの回数**
- `i <= 100`とすると、100も含めて表示されます
- `i < 100`とすると、99までしか表示されません
- 条件式に注意しましょう

**while文との違い**
- for文では初期化、条件、更新が1行にまとまっています
- カウンタ変数の更新を忘れる心配が少ないです
- コードがより簡潔になります

### 解答例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 077</title>
</head>
<body>
    <h1>数字リスト生成器</h1>
    <button id="generateList">1から100まで表示</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let generateList = document.getElementById("generateList");
let result = document.getElementById("result");

generateList.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  // 1から100まで繰り返す
  for (let i = 1; i <= 100; i++) {
    // 新しい段落要素を作成
    let p = document.createElement("p");
    p.textContent = i;
    result.appendChild(p);
  }
});
```

### 解説

このコードでは、for文を使って1から100までの数字を表示しています。

**for文の構造**
```javascript
for (let i = 1; i <= 100; i++)
```
- **初期化**：`let i = 1`でカウンタを1から開始します
- **条件式**：`i <= 100`で100以下の間ループを続けます
- **更新式**：`i++`で各ループの後に`i`を1増やします

**ループの実行回数**
```javascript
i <= 100
```
`<=`を使うことで、100も含めて表示します。これにより、1から100まで正確に100回のループが実行されます。

**要素の作成と追加**
```javascript
let p = document.createElement("p");
p.textContent = i;
result.appendChild(p);
```
各ループで新しい`<p>`要素を作成し、現在の`i`の値をテキストとして設定します。そして、`result`要素に追加することで、画面に表示されます。

**while文との比較**
while文で同じことを書くと：

```javascript
let i = 1;
while (i <= 100) {
  let p = document.createElement("p");
  p.textContent = i;
  result.appendChild(p);
  i++;
}
```

for文の方が、初期化・条件・更新が1行にまとまっていて、よりコンパクトで読みやすくなっています。

## まとめ

お疲れ様でした。今回のレッスンでは、for文の基本について学びました。

**今回学んだキーポイント**

- **for文の3要素**：初期化、条件式、更新式の3つの要素をセミコロンで区切って書きます。これらがfor文の括弧内に1行でまとまっているのが特徴です
- **初期化・条件・更新**：初期化は最初に1回だけ実行され、条件式は各ループ前に評価され、更新式は各ループ後に実行されます。この流れを理解することが重要です
- **while文との違い**：while文と同じことができますが、カウンタを使った繰り返しをより簡潔に書けます。初期化・条件・更新が1箇所にまとまっているため、読みやすく間違いにくいです
- **実用的なパターン**：1から100まで、偶数だけ、メッセージを複数回表示するなど、さまざまなパターンで使えます。DOM操作と組み合わせることで、複数の要素を効率的に作成できます

for文は、JavaScriptで最もよく使われるループ文の一つです。決まった回数繰り返す処理には、while文よりもfor文を使うことが一般的です。

次のレッスンでは、逆順ループについて学びます。カウントダウンや逆順表示など、数を減らしていくループの書き方を理解していきましょう。
