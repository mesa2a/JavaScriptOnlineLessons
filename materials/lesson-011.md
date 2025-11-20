---
title: "Lesson 011: letとconstの使い分け"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 011: letとconstの使い分け

---

## 今回の学習

### 前回の復習

前回は、定数（const）について学びました。`const` を使うと変わらない値を定義でき、再代入しようとするとエラーが発生することを確認しました。また、エラーメッセージの読み方も学びました。

### 今回の目標

1. letとconstの使い分けを理解する
2. カウンターの仕組みを理解する
3. counter = counter + 1の意味を理解する
4. 実際のプログラムで適切に使い分けられるようになる

---

## カウンターとは

### 数を数える変数

プログラムでは、何かの回数を数えたいことがよくあります。例えば、ボタンが押された回数や、ループの回数などです。

このような「数を数える変数」のことを「カウンター」と呼びます。

### カウンターの基本

カウンターは、最初は0から始まり、何かが起きるたびに1ずつ増えていきます。

```javascript
let counter = 0;
console.log(counter);  // 0

counter = counter + 1;
console.log(counter);  // 1

counter = counter + 1;
console.log(counter);  // 2

counter = counter + 1;
console.log(counter);  // 3
```

このコードでは、`counter` の値が0から始まり、1ずつ増えていく様子を確認できます。

### counter = counter + 1の意味

`counter = counter + 1` という式は、最初は不思議に見えるかもしれません。数学では `x = x + 1` は成り立ちませんが、プログラミングでは意味が異なります。

プログラミングの `=` は「等しい」ではなく「代入する」という意味です。

```javascript
counter = counter + 1;
```

この式は、以下のように読みます。

1. 右辺の `counter + 1` を計算する（現在の値に1を足す）
2. その結果を左辺の `counter` に代入する

つまり、「counterの現在の値に1を足した結果を、counterに保存する」という意味です。

### 具体的な動作

`counter` が `5` のときに `counter = counter + 1` を実行すると、以下のように動作します。

1. 右辺を計算：`5 + 1 = 6`
2. 結果を代入：`counter = 6`

結果として、`counter` の値は `6` になります。

---

## なぜカウンターにletを使うのか

### 値が変わるからlet

カウンターは値が変わっていく変数です。0から1に、1から2に、というように値が更新されます。

値が変わる変数には `let` を使います。

```javascript
let counter = 0;      // 最初は0
counter = counter + 1; // 1に変わる
counter = counter + 1; // 2に変わる
```

### constを使うとどうなるか

もし `const` を使うとどうなるでしょうか。

```javascript
const counter = 0;
counter = counter + 1;  // エラー！
```

`const` は再代入できないので、エラーが発生します。カウンターのように値が変わる変数には `let` を使う必要があります。

---

## 最大値には constを使う

### 変わらない値はconst

カウンターには上限を設けることがよくあります。例えば、「10回までカウントする」というような場合です。

この上限値は変わらない値なので、`const` を使います。

```javascript
const maxCount = 10;
let counter = 0;

counter = counter + 1;
console.log(counter + " / " + maxCount);  // "1 / 10"

counter = counter + 1;
console.log(counter + " / " + maxCount);  // "2 / 10"
```

### なぜ上限値にconstを使うのか

上限値を `const` で定義する理由はいくつかあります。

**意図を明確にする**

`const maxCount = 10` と書くことで、「この値は固定の上限値である」という意図が伝わります。

**間違いを防ぐ**

うっかり `maxCount = 5` のように変更してしまうことを防げます。

**変更が簡単**

上限を変更したいときは、`const maxCount = 10` の部分だけを変えれば済みます。

---

## 使い分けの基準

### letを使う場合

以下のような値には `let` を使います。

**カウンター**

```javascript
let counter = 0;
counter = counter + 1;
```

**合計値**

```javascript
let total = 0;
total = total + 100;
total = total + 200;
```

**状態を表す値**

```javascript
let isOpen = false;
// 何かの処理の後
isOpen = true;
```

### constを使う場合

以下のような値には `const` を使います。

**数学的な定数**

```javascript
const pi = 3.14;
const e = 2.718;
```

**設定値**

```javascript
const maxCount = 10;
const taxRate = 1.1;
const siteName = "My Website";
```

**一度計算したら変わらない値**

```javascript
const price = 100;
const count = 3;
const total = price * count;  // 計算後は変わらない
```

### 迷ったらconst

前回も説明しましたが、迷ったら `const` を使いましょう。

1. まず `const` で宣言する
2. 再代入が必要になったら `let` に変える

この順番で考えると、適切に使い分けられます。

---

## カウンターを作ろう

### 基本のカウンター

```html
<script>
let counter = 0;

console.log("カウント開始");

counter = counter + 1;
console.log("現在のカウント：" + counter);

counter = counter + 1;
console.log("現在のカウント：" + counter);

counter = counter + 1;
console.log("現在のカウント：" + counter);

console.log("最終カウント：" + counter);
</script>
```

このコードを実行すると、以下のように表示されます。

```
カウント開始
現在のカウント：1
現在のカウント：2
現在のカウント：3
最終カウント：3
```

### 上限付きカウンター

```html
<script>
const maxCount = 5;
let counter = 0;

console.log("目標：" + maxCount + "回");

counter = counter + 1;
console.log(counter + " / " + maxCount);

counter = counter + 1;
console.log(counter + " / " + maxCount);

counter = counter + 1;
console.log(counter + " / " + maxCount);

counter = counter + 1;
console.log(counter + " / " + maxCount);

counter = counter + 1;
console.log(counter + " / " + maxCount);

console.log("目標達成！");
</script>
```

このコードを実行すると、以下のように表示されます。

```
目標：5回
1 / 5
2 / 5
3 / 5
4 / 5
5 / 5
目標達成！
```

### 減算カウンター

カウンターは増えるだけでなく、減らすこともできます。

```html
<script>
const initialCount = 10;
let counter = initialCount;

console.log("カウントダウン開始");

counter = counter - 1;
console.log(counter);

counter = counter - 1;
console.log(counter);

counter = counter - 1;
console.log(counter);

console.log("残り：" + counter);
</script>
```

このコードを実行すると、以下のように表示されます。

```
カウントダウン開始
9
8
7
残り：7
```

---

## 実践的な使い分け例

### 買い物カート

```html
<script>
// 設定値はconst
const taxRate = 1.1;
const shippingFee = 500;

// 変わる値はlet
let itemCount = 0;
let subtotal = 0;

// 商品を追加
itemCount = itemCount + 1;
subtotal = subtotal + 300;
console.log("商品追加：300円");

// 商品を追加
itemCount = itemCount + 1;
subtotal = subtotal + 500;
console.log("商品追加：500円");

// 商品を追加
itemCount = itemCount + 1;
subtotal = subtotal + 200;
console.log("商品追加：200円");

// 計算結果はconst（この後変わらない）
const totalWithTax = subtotal * taxRate;
const grandTotal = totalWithTax + shippingFee;

console.log("---");
console.log("商品数：" + itemCount + "点");
console.log("小計：" + subtotal + "円");
console.log("税込：" + totalWithTax + "円");
console.log("送料：" + shippingFee + "円");
console.log("合計：" + grandTotal + "円");
</script>
```

このコードを実行すると、以下のように表示されます。

```
商品追加：300円
商品追加：500円
商品追加：200円
---
商品数：3点
小計：1000円
税込：1100円
送料：500円
合計：1600円
```

### スコアカウンター

```html
<script>
// 設定値はconst
const maxScore = 100;
const bonusPoints = 10;

// 変わる値はlet
let score = 0;

console.log("ゲーム開始");
console.log("目標スコア：" + maxScore);

// ポイント獲得
score = score + 20;
console.log("20ポイント獲得！ 現在：" + score);

score = score + 15;
console.log("15ポイント獲得！ 現在：" + score);

score = score + bonusPoints;
console.log("ボーナス" + bonusPoints + "ポイント！ 現在：" + score);

score = score + 30;
console.log("30ポイント獲得！ 現在：" + score);

console.log("最終スコア：" + score + " / " + maxScore);
</script>
```

このコードを実行すると、以下のように表示されます。

```
ゲーム開始
目標スコア：100
20ポイント獲得！ 現在：20
15ポイント獲得！ 現在：35
ボーナス10ポイント！ 現在：45
30ポイント獲得！ 現在：75
最終スコア：75 / 100
```

---

## コードの可読性

### 可読性とは

「可読性」とは、コードの読みやすさのことです。可読性が高いコードは、何をしているかがすぐにわかります。

### letとconstの使い分けが可読性を上げる

適切に `let` と `const` を使い分けることで、コードの可読性が上がります。

```javascript
const maxRetries = 3;   // 「これは設定値で変わらない」とわかる
let retryCount = 0;     // 「これは変わる値だ」とわかる
```

このコードを見ると、`maxRetries` は固定の設定値で、`retryCount` は処理の中で変わる値だとすぐにわかります。

### すべてをletで書いた場合

もしすべてを `let` で書くとどうなるでしょうか。

```javascript
let maxRetries = 3;
let retryCount = 0;
```

このコードでは、どちらが固定値でどちらが変わる値かわかりません。コードを読む人は、すべての行を確認して、値が変更されているかどうかを調べなければなりません。

---

## 練習問題

### 保存場所

`exercises/lesson-011/index.html` を使用してください。このファイルは既に用意されています。各課題のコードを `<script>` タグの中に入力し、ブラウザで開いて動作を確認しましょう。

### 課題1：基本のカウンター

0から始めて、5回カウントアップするプログラムを作成してください。各回のカウント値を表示してください。

### 課題2：上限付きカウンター

上限を10とし、3回カウントアップするプログラムを作成してください。「現在のカウント / 上限」の形式で表示してください。

### 課題3：合計計算

以下の金額を順番に加算し、合計を計算してください。

- 最初：0円
- 1回目：500円追加
- 2回目：300円追加
- 3回目：700円追加

各回の合計と、最終合計を表示してください。

### 課題4：カウントダウン

10から始めて、3回カウントダウンするプログラムを作成してください。

### 課題5：適切な使い分け

以下のプログラムで、どの変数に `let` を使い、どの変数に `const` を使うべきか考えて、プログラムを完成させてください。

- 消費税率：1.1
- 商品価格1：200円
- 商品価格2：350円
- 合計：0円から始めて、商品を追加
- 税込合計：計算後は変わらない

---

**解答例（課題1）**

```html
<script>
let counter = 0;

counter = counter + 1;
console.log("カウント：" + counter);

counter = counter + 1;
console.log("カウント：" + counter);

counter = counter + 1;
console.log("カウント：" + counter);

counter = counter + 1;
console.log("カウント：" + counter);

counter = counter + 1;
console.log("カウント：" + counter);
</script>
```

**解答例（課題3）**

```html
<script>
let total = 0;

total = total + 500;
console.log("追加後の合計：" + total + "円");

total = total + 300;
console.log("追加後の合計：" + total + "円");

total = total + 700;
console.log("追加後の合計：" + total + "円");

console.log("最終合計：" + total + "円");
</script>
```

**解答例（課題5）**

```html
<script>
const taxRate = 1.1;
const price1 = 200;
const price2 = 350;

let total = 0;

total = total + price1;
console.log("商品1追加：" + total + "円");

total = total + price2;
console.log("商品2追加：" + total + "円");

const totalWithTax = total * taxRate;
console.log("税込合計：" + totalWithTax + "円");
</script>
```

---

## まとめ

### 今回学んだこと

**キーポイント1：カウンターの仕組み**

`counter = counter + 1` は、現在の値に1を足した結果を同じ変数に保存します。これにより、値を1ずつ増やすことができます。

**キーポイント2：使い分けの基準**

変わる値（カウンター、合計など）には `let`、変わらない値（設定値、定数）には `const` を使います。

**キーポイント3：可読性の向上**

適切に `let` と `const` を使い分けることで、コードを読む人が値の性質をすぐに理解できます。

**キーポイント4：迷ったらconst**

最初は `const` で宣言し、再代入が必要になったら `let` に変えるのがおすすめです。

---
