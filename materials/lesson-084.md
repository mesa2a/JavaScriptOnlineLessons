---
title: "Lesson 084: パフォーマンス"
author: "JavaScript学習教材"
date: "2025-01-21"
---

# レッスン84：パフォーマンス

## 今回の学習

### 前回の復習

前回のレッスンでは、ループの選択について学びました。

- **ループの使い分け**：for文は回数が決まっている繰り返しに、while文は条件駆動の繰り返しに適しています
- **適切な選択**：決まった回数ならfor文、ユーザー入力や複雑な条件ならwhile文を選ぶことで、コードの意図を明確にできます
- **可読性の重要性**：適切なループを選ぶことで、コードが読みやすくなり、保守しやすくなります
- **成果物**：ループ比較 - for文とwhile文の両方を使って同じ処理を実装し、違いを理解しました

### 今回の目標

今回のレッスンでは、ループのパフォーマンスについて学びます。

- ループの効率を理解する
- 不要な処理を避ける方法を学ぶ
- 最適化の基礎を習得する

## パフォーマンスとは

プログラミングにおける**パフォーマンス**とは、プログラムがどれだけ速く、効率的に動作するかを表す指標です。

ループは同じ処理を何度も繰り返すため、少しの違いが大きな差を生むことがあります。特に、ループの回数が多い場合、パフォーマンスの差が顕著に現れます。

### 日常生活での例え

料理を作る場面を考えてみましょう。

**非効率な方法**：
```
for (各料理) {
  冷蔵庫を開ける
  材料を1つ取る
  冷蔵庫を閉める
  料理する
}
```

**効率的な方法**：
```
冷蔵庫を開ける
すべての材料を取る
冷蔵庫を閉める
for (各料理) {
  料理する
}
```

冷蔵庫の開け閉めを何度も繰り返すのは非効率です。必要な材料をまとめて取り出す方が効率的です。

プログラミングでも、同じ考え方が重要です。

## ループ内で避けるべき処理

ループの中で、毎回同じ結果になる処理を繰り返すのは非効率です。

### 非効率な例：DOM要素の取得

```javascript
// 非効率：毎回要素を取得している
for (let i = 0; i < 100; i++) {
  let result = document.getElementById("result");  // 100回実行される
  let p = document.createElement("p");
  p.textContent = i;
  result.appendChild(p);
}
```

この例では、`document.getElementById("result")`が100回実行されますが、結果は毎回同じです。

### 効率的な例：事前に取得

```javascript
// 効率的：ループの外で取得
let result = document.getElementById("result");  // 1回だけ実行

for (let i = 0; i < 100; i++) {
  let p = document.createElement("p");
  p.textContent = i;
  result.appendChild(p);
}
```

ループの外で要素を取得することで、DOM操作が1回で済みます。

## 計算の最適化

ループ内で不要な計算を避けることも重要です。

### 非効率な例：毎回計算

```javascript
// 非効率：毎回配列の長さを計算
let numbers = [1, 2, 3, 4, 5];

for (let i = 0; i < numbers.length; i++) {  // lengthを毎回取得
  console.log(numbers[i]);
}
```

JavaScriptでは、`numbers.length`は毎回計算されるわけではありませんが、より効率的に書くこともできます。

### 効率的な例：長さを保存

```javascript
// 効率的：長さを変数に保存
let numbers = [1, 2, 3, 4, 5];
let length = numbers.length;  // 1回だけ取得

for (let i = 0; i < length; i++) {
  console.log(numbers[i]);
}
```

配列の長さを変数に保存することで、毎回のアクセスを避けられます。

**注意**：現代のJavaScriptエンジンは非常に賢いため、単純な`array.length`の最適化は自動で行われることが多いです。ただし、基本的な考え方として理解しておくことは重要です。

## 不要な処理のスキップ

continue文を使って、不要な処理をスキップすることもパフォーマンス向上につながります。

### 条件に合わないものを早めに除外

```javascript
for (let i = 1; i <= 100; i++) {
  // 偶数だけを処理したい場合
  if (i % 2 !== 0) {
    continue;  // 奇数は早めにスキップ
  }

  // ここから複雑な処理
  let result = i * i;
  console.log(result);
  // さらに処理が続く...
}
```

条件に合わないものを早めに除外することで、無駄な処理を避けられます。

## ループの回数を減らす

最も効果的な最適化は、ループの回数そのものを減らすことです。

### 非効率な例：二重ループ

```javascript
// 非効率：すべての組み合わせをチェック
let numbers = [1, 2, 3, 4, 5];

for (let i = 0; i < numbers.length; i++) {
  for (let j = 0; j < numbers.length; j++) {
    if (i !== j && numbers[i] + numbers[j] === 5) {
      console.log(numbers[i] + " + " + numbers[j] + " = 5");
    }
  }
}
```

この例では、25回（5×5）のチェックが行われます。

### 効率的な例：重複をスキップ

```javascript
// 効率的：重複する組み合わせをスキップ
let numbers = [1, 2, 3, 4, 5];

for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {  // i+1から始める
    if (numbers[i] + numbers[j] === 5) {
      console.log(numbers[i] + " + " + numbers[j] + " = 5");
    }
  }
}
```

内側のループを`j = i + 1`から始めることで、重複するチェックを避けられます。

## 計算量の概念

**計算量**とは、プログラムが処理を完了するのに必要な時間やメモリの量を表す概念です。

### O(n) - 線形時間

```javascript
// O(n)：nに比例して処理時間が増える
for (let i = 0; i < n; i++) {
  console.log(i);
}
```

要素が10個なら10回、100個なら100回の処理が必要です。

### O(n²) - 二乗時間

```javascript
// O(n²)：nの二乗に比例して処理時間が増える
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    console.log(i, j);
  }
}
```

要素が10個なら100回、100個なら10,000回の処理が必要です。

**重要**：ループをネストする（入れ子にする）と、計算量が急激に増えます。できるだけシンプルなループを心がけましょう。

## 実用的な最適化例

### 例1：文字列の結合

**非効率な方法**：
```javascript
let result = "";

for (let i = 1; i <= 1000; i++) {
  result = result + i + ",";  // 毎回新しい文字列を作成
}
```

JavaScriptでは、文字列は不変（変更できない）ため、毎回新しい文字列が作成されます。

**効率的な方法**：
```javascript
let parts = [];

for (let i = 1; i <= 1000; i++) {
  parts.push(i);
}

let result = parts.join(",");  // 最後にまとめて結合
```

配列に追加してから、最後に`join()`で結合する方が効率的です。

### 例2：条件の順序

```javascript
// 条件の順序を工夫する
for (let i = 1; i <= 1000; i++) {
  // よくある条件を先にチェック
  if (i % 2 === 0) {  // 50%の確率
    continue;
  }

  if (i % 100 === 0) {  // 1%の確率
    // 処理
  }
}
```

頻繁に真になる条件を先に書くことで、不要なチェックを減らせます。

## 実践例：効率的ループ

HTMLとJavaScriptを組み合わせて、効率的なループを実装してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>効率的ループ</title>
</head>
<body>
    <h1>ループのパフォーマンス比較</h1>
    <button id="slowVersion">非効率なバージョン</button>
    <button id="fastVersion">効率的なバージョン</button>
    <div id="result"></div>
    <div id="time"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let slowVersion = document.getElementById("slowVersion");
let fastVersion = document.getElementById("fastVersion");
let result = document.getElementById("result");
let timeDisplay = document.getElementById("time");

// 非効率なバージョン
slowVersion.addEventListener("click", function() {
  result.innerHTML = "";
  let startTime = Date.now();

  // 非効率：毎回要素を取得
  for (let i = 1; i <= 100; i++) {
    let resultElement = document.getElementById("result");
    let p = document.createElement("p");
    p.textContent = i;
    resultElement.appendChild(p);
  }

  let endTime = Date.now();
  timeDisplay.textContent = "処理時間: " + (endTime - startTime) + "ミリ秒";
});

// 効率的なバージョン
fastVersion.addEventListener("click", function() {
  result.innerHTML = "";
  let startTime = Date.now();

  // 効率的：事前に要素を取得
  let resultElement = document.getElementById("result");

  for (let i = 1; i <= 100; i++) {
    let p = document.createElement("p");
    p.textContent = i;
    resultElement.appendChild(p);
  }

  let endTime = Date.now();
  timeDisplay.textContent = "処理時間: " + (endTime - startTime) + "ミリ秒";
});
```

### コードの詳しい説明

**処理時間の計測**
```javascript
let startTime = Date.now();
// 処理
let endTime = Date.now();
timeDisplay.textContent = "処理時間: " + (endTime - startTime) + "ミリ秒";
```
- `Date.now()`で現在時刻（ミリ秒）を取得
- 処理前後の時刻の差で処理時間を計算

**非効率なバージョン**
```javascript
for (let i = 1; i <= 100; i++) {
  let resultElement = document.getElementById("result");  // 100回実行
  // 処理
}
```
ループ内でDOM要素を毎回取得しています。

**効率的なバージョン**
```javascript
let resultElement = document.getElementById("result");  // 1回だけ実行

for (let i = 1; i <= 100; i++) {
  // 処理
}
```
ループの外で要素を取得しています。

## 最適化の注意点

### 1. 可読性とのバランス

過度な最適化は、コードを読みにくくする可能性があります。

```javascript
// 読みやすいが少し遅い
for (let i = 0; i < array.length; i++) {
  processItem(array[i]);
}

// 速いが読みにくい
for (let i = 0, len = array.length, item; i < len; item = array[i++]) {
  processItem(item);
}
```

多くの場合、読みやすさを優先すべきです。

### 2. 早すぎる最適化は避ける

> 早すぎる最適化は諸悪の根源である - Donald Knuth

まずは動くコードを書き、本当に遅い部分だけを最適化しましょう。

### 3. 実測する

推測ではなく、実際に計測して確認しましょう。

```javascript
console.time("処理A");
// 処理A
console.timeEnd("処理A");

console.time("処理B");
// 処理B
console.timeEnd("処理B");
```

## 練習問題

### 課題：効率的ループ

ループの効率を意識して、1から100までの数字を表示するプログラムを作成してください。

### 保存場所

`exercises/lesson-084/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. ループの効率を理解する
2. 不要な処理を避ける実装をする
3. 最適化の基礎を組み込む

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-084
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

効率的なループを実装する際のポイントを確認しましょう。

**DOM要素の取得**
- `getElementById()`はループの外で実行します
- 1回だけ取得して、変数に保存します
- ループ内で何度も取得するのは非効率です

**ループの構造**
- 不要な計算をループ外に出します
- 毎回同じ結果になる処理は事前に実行します
- シンプルなループを心がけます

**処理時間の計測**
- `Date.now()`で開始時刻を記録します
- 処理後に終了時刻を記録します
- 差分を計算して表示します

### 解答例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 084</title>
</head>
<body>
    <h1>効率的なループ</h1>
    <button id="generate">1から100まで表示</button>
    <div id="result"></div>
    <div id="time"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let generate = document.getElementById("generate");
let result = document.getElementById("result");
let timeDisplay = document.getElementById("time");

generate.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  // 処理時間の計測開始
  let startTime = Date.now();

  // 効率的な実装：DOM要素を事前に取得
  let resultElement = document.getElementById("result");

  // 1から100まで繰り返す
  for (let i = 1; i <= 100; i++) {
    let p = document.createElement("p");
    p.textContent = i;
    resultElement.appendChild(p);
  }

  // 処理時間の計測終了
  let endTime = Date.now();
  timeDisplay.textContent = "処理時間: " + (endTime - startTime) + "ミリ秒";
});
```

### 解説

このコードでは、効率的なループを実装しています。

**DOM要素の事前取得**
```javascript
let resultElement = document.getElementById("result");
```
ループの外で要素を取得することで、100回の余分なDOM操作を避けています。

**処理時間の計測**
```javascript
let startTime = Date.now();
// 処理
let endTime = Date.now();
timeDisplay.textContent = "処理時間: " + (endTime - startTime) + "ミリ秒";
```
- `Date.now()`で現在のタイムスタンプ（ミリ秒）を取得
- 処理前後の差分で処理時間を計算
- 結果を画面に表示

**効率化のポイント**

非効率な実装との比較：
```javascript
// 非効率（避けるべき）
for (let i = 1; i <= 100; i++) {
  let resultElement = document.getElementById("result");  // 100回実行
  let p = document.createElement("p");
  p.textContent = i;
  resultElement.appendChild(p);
}

// 効率的（推奨）
let resultElement = document.getElementById("result");  // 1回だけ実行
for (let i = 1; i <= 100; i++) {
  let p = document.createElement("p");
  p.textContent = i;
  resultElement.appendChild(p);
}
```

ループが100回の場合、差は小さいかもしれませんが、1000回、10000回となると大きな違いが生まれます。

## まとめ

お疲れ様でした。今回のレッスンでは、ループのパフォーマンスについて学びました。

**今回学んだキーポイント**

- **計算量の概念**：ループの回数が増えると処理時間が急激に増えます。特に二重ループ（O(n²)）は注意が必要です
- **効率的なコード**：ループ内で不要な処理を避けることで、パフォーマンスを向上できます。DOM要素の取得や計算は、可能な限りループの外で行いましょう
- **最適化の基本**：不要な処理の削除、計算の事前実行、ループ回数の削減などが基本的な最適化手法です
- **バランスの重要性**：パフォーマンスと可読性のバランスを考えることが重要です。早すぎる最適化は避け、必要な箇所だけを最適化しましょう

パフォーマンスを意識したコードを書くことは重要ですが、まずは正しく動くコードを書き、その後で必要に応じて最適化することが推奨されます。

次のレッスンでは、週のプロジェクトとしてタイピングゲームを作成します。これまで学んだループの知識を総合的に活用していきましょう。
