---
title: "Lesson 008: 変数を使った計算"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 008: 変数を使った計算

---

## 今回の学習

### 前回の復習

前回は、変数について学びました。`let` キーワードを使って変数を作成し、文字列や数値を保存できることを確認しました。また、変数の命名規則やキャメルケースについても学びました。

### 今回の目標

1. 変数を使って計算ができるようになる
2. 計算結果を変数に保存できるようになる
3. 文字列と変数を組み合わせて表示できるようになる
4. 実用的な買い物計算機を作れるようになる

---

## 変数を使った計算

### 基本的な計算

変数に保存された数値を使って計算ができます。

```javascript
let price = 100;
let count = 3;
let total = price * count;
console.log(total);
```

このコードは以下のように動作します。

1. `price` という変数に `100` を保存します
2. `count` という変数に `3` を保存します
3. `price * count` を計算し、結果の `300` を `total` に保存します
4. `total` の値 `300` をコンソールに表示します

### 直接数値を書く場合との比較

変数を使わずに直接数値を書くこともできます。

```javascript
let total = 100 * 3;
console.log(total);
```

しかし、変数を使う方がいくつかの利点があります。

**意味がわかりやすい**

`100 * 3` だけでは、何を計算しているのかわかりません。`price * count` なら、「価格 × 個数」という意味が明確です。

**変更が簡単**

価格を150円に変えたい場合、変数を使っていれば `let price = 150` に変えるだけです。直接数値を書いていると、すべての `100` を探して変更しなければなりません。

**再利用できる**

同じ値を何度も使う場合、変数に保存しておけば何度でも使えます。

---

## 計算結果を変数に保存する

計算結果は、変数に保存して後で使うことができます。

### 複数の計算を組み合わせる

```javascript
let applePrice = 150;
let appleCount = 3;
let appleTotal = applePrice * appleCount;

let bananaPrice = 100;
let bananaCount = 5;
let bananaTotal = bananaPrice * bananaCount;

let grandTotal = appleTotal + bananaTotal;
console.log(grandTotal);
```

このコードは以下のように動作します。

1. りんごの価格と個数から、りんごの合計金額を計算します（450円）
2. バナナの価格と個数から、バナナの合計金額を計算します（500円）
3. りんごとバナナの合計を足して、総合計を計算します（950円）

それぞれの計算結果を変数に保存しているので、最後に足し合わせることができます。

### 四則演算すべてが使える

レッスン3で学んだ四則演算は、すべて変数と一緒に使えます。

```javascript
let a = 100;
let b = 30;

console.log(a + b);  // 130（足し算）
console.log(a - b);  // 70（引き算）
console.log(a * b);  // 3000（掛け算）
console.log(a / b);  // 3.333...（割り算）
```

### 括弧も使える

複雑な計算では、括弧を使って計算順序を制御できます。

```javascript
let price = 1000;
let discount = 200;
let taxRate = 10;

let afterDiscount = price - discount;
let tax = afterDiscount * taxRate / 100;
let finalPrice = afterDiscount + tax;

console.log(finalPrice);  // 880
```

このコードは、1000円の商品から200円引いて、消費税10%を加えた金額を計算しています。

---

## 文字列と変数を組み合わせる

### 文字列の連結

変数の値を文字列と一緒に表示したいことがよくあります。このとき、`+` 記号を使って文字列と変数を連結します。

```javascript
let total = 300;
console.log("合計：" + total + "円");
```

このコードを実行すると、コンソールに「合計：300円」と表示されます。

### 連結の仕組み

`+` 記号は、数値同士の場合は足し算をしますが、文字列が含まれる場合は連結をします。

```javascript
console.log(1 + 2);        // 3（数値の足し算）
console.log("1" + "2");    // "12"（文字列の連結）
console.log("合計：" + 3);  // "合計：3"（文字列と数値の連結）
```

3番目の例では、文字列 `"合計："` と数値 `3` を連結しています。この場合、数値 `3` は自動的に文字列 `"3"` に変換され、結果は `"合計：3"` という文字列になります。

### 変数を使った連結

変数の値も同様に連結できます。

```javascript
let name = "山田太郎";
let age = 25;

console.log(name + "さんは" + age + "歳です");
```

このコードを実行すると、「山田太郎さんは25歳です」と表示されます。

### 複数の変数を連結する

```javascript
let item = "りんご";
let price = 150;
let count = 3;
let total = price * count;

console.log(item + "を" + count + "個買いました");
console.log("合計は" + total + "円です");
```

このコードを実行すると、以下のように表示されます。

```
りんごを3個買いました
合計は450円です
```

---

## 買い物計算機を作ろう

ここまで学んだことを使って、実用的な買い物計算機を作ってみましょう。

### 基本の買い物計算

```html
<script>
let price = 100;
let count = 3;
let total = price * count;

console.log("単価：" + price + "円");
console.log("個数：" + count + "個");
console.log("合計：" + total + "円");
</script>
```

このコードを実行すると、以下のように表示されます。

```
単価：100円
個数：3個
合計：300円
```

### 複数商品の買い物計算

複数の商品を買った場合の計算をしてみましょう。

```html
<script>
// りんごの計算
let applePrice = 150;
let appleCount = 3;
let appleTotal = applePrice * appleCount;

// みかんの計算
let orangePrice = 80;
let orangeCount = 5;
let orangeTotal = orangePrice * orangeCount;

// パンの計算
let breadPrice = 200;
let breadCount = 2;
let breadTotal = breadPrice * breadCount;

// 総合計
let grandTotal = appleTotal + orangeTotal + breadTotal;

// 結果を表示
console.log("--- 買い物リスト ---");
console.log("りんご：" + appleTotal + "円");
console.log("みかん：" + orangeTotal + "円");
console.log("パン：" + breadTotal + "円");
console.log("-------------------");
console.log("合計：" + grandTotal + "円");
</script>
```

このコードを実行すると、以下のように表示されます。

```
--- 買い物リスト ---
りんご：450円
みかん：400円
パン：400円
-------------------
合計：1250円
```

### コメントについて

上記のコードには `//` で始まる行があります。これは「コメント」と呼ばれ、プログラムの実行には影響しません。コードの説明を書くために使います。

```javascript
// これはコメントです
let price = 100;  // 変数の横にも書けます
```

コメントを使うと、後でコードを見返したときに何をしているかわかりやすくなります。

---

## 式と値

### 式とは

計算や操作を表すコードを「式」と言います。式は評価されると「値」になります。

```javascript
let total = 100 * 3;
```

この場合、`100 * 3` が式で、評価されると `300` という値になります。その値が `total` に代入されます。

### 値とは

値は、プログラムで扱うデータそのものです。文字列、数値、計算結果などが値です。

```javascript
100        // 数値の値
"こんにちは"  // 文字列の値
100 * 3    // 式（評価されると300という値になる）
```

### 変数は式に使える

変数は値を持っているので、式の中で使うことができます。

```javascript
let a = 10;
let b = 20;
let c = a + b;  // aとbの値を使って計算
```

`a + b` という式は、`a` の値 `10` と `b` の値 `20` を使って評価され、`30` という値になります。

---

## よくある間違い

### 変数名と文字列の混同

変数名を `"` で囲むと、文字列として扱われます。

```javascript
let price = 100;
console.log(price);    // 100（変数の値）
console.log("price");  // "price"（文字列）
```

変数の値を表示したい場合は、`"` で囲まないでください。

### 計算順序の間違い

`+` は文字列連結と数値加算の両方に使われます。意図しない結果になることがあります。

```javascript
let a = 10;
let b = 20;
console.log("合計：" + a + b);  // "合計：1020"（文字列連結）
```

この例では、`"合計："` という文字列に `a` が連結され、さらに `b` が連結されます。そのため、`10 + 20 = 30` ではなく、`"1020"` という文字列になります。

正しく計算するには、括弧を使います。

```javascript
let a = 10;
let b = 20;
console.log("合計：" + (a + b));  // "合計：30"
```

括弧の中の `a + b` が先に計算され、その結果 `30` が文字列と連結されます。

---

## 練習問題

### 保存場所

`exercises/lesson-008/index.html` を使用してください。このファイルは既に用意されています。各課題のコードを `<script>` タグの中に入力し、ブラウザで開いて動作を確認しましょう。

### 課題1：基本の計算

単価200円の商品を4個買った場合の合計金額を計算し、以下の形式で表示してください。

```
単価：200円
個数：4個
合計：800円
```

### 課題2：割引計算

1000円の商品に20%の割引を適用した金額を計算し、表示してください。

ヒント：20%は `20 / 100` または `0.2` です。割引額は `1000 * 20 / 100` で計算できます。

### 課題3：買い物リスト

以下の買い物リストの合計を計算してください。

- ノート：150円 × 2冊
- ペン：100円 × 3本
- 消しゴム：80円 × 1個

各商品の小計と、全体の合計を表示してください。

### 課題4：お釣り計算

1000円札を出して680円の買い物をした場合のお釣りを計算し、表示してください。

---

**解答例（課題1）**

```html
<script>
let price = 200;
let count = 4;
let total = price * count;

console.log("単価：" + price + "円");
console.log("個数：" + count + "個");
console.log("合計：" + total + "円");
</script>
```

**解答例（課題2）**

```html
<script>
let price = 1000;
let discountRate = 20;
let discount = price * discountRate / 100;
let finalPrice = price - discount;

console.log("元の価格：" + price + "円");
console.log("割引率：" + discountRate + "%");
console.log("割引額：" + discount + "円");
console.log("支払い額：" + finalPrice + "円");
</script>
```

**解答例（課題3）**

```html
<script>
let notebookPrice = 150;
let notebookCount = 2;
let notebookTotal = notebookPrice * notebookCount;

let penPrice = 100;
let penCount = 3;
let penTotal = penPrice * penCount;

let eraserPrice = 80;
let eraserCount = 1;
let eraserTotal = eraserPrice * eraserCount;

let grandTotal = notebookTotal + penTotal + eraserTotal;

console.log("ノート：" + notebookTotal + "円");
console.log("ペン：" + penTotal + "円");
console.log("消しゴム：" + eraserTotal + "円");
console.log("合計：" + grandTotal + "円");
</script>
```

---

## まとめ

### 今回学んだこと

**キーポイント1：変数を使った計算**

変数に保存された数値を使って、四則演算ができます。計算結果も変数に保存できます。

**キーポイント2：文字列と変数の連結**

`+` 記号を使って、文字列と変数を連結できます。「合計：" + total + "円"」のように書くと、わかりやすい出力ができます。

**キーポイント3：式と値**

計算や操作を表すコードを「式」、その結果を「値」と言います。変数は式の中で使うことができます。

**キーポイント4：コメント**

`//` で始まる行はコメントです。プログラムの説明を書くために使い、実行には影響しません。

---
