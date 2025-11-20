---
title: "Lesson 010: 変わらない値"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 010: 変わらない値

---

## 今回の学習

### 前回の復習

前回は、文字列の連結を学びました。`+` 演算子を使って文字列をつなげ、名前合成マシンを作成しました。また、`+` 演算子には数値の足し算と文字列の連結という2つの役割があることを確認しました。

### 今回の目標

1. 定数（const）とは何かを理解する
2. constを使って変わらない値を定義できる
3. letとconstの違いを理解する
4. エラーメッセージを読めるようになる

---

## 定数とは

### 変わらない値

プログラムの中には、一度決めたら変更してはいけない値があります。例えば、円周率の3.14や消費税率の10%などです。

このような「変わらない値」を保存するために、JavaScriptには `const` というキーワードがあります。

### constの使い方

`const` は `let` と同じように使いますが、一度値を設定したら変更できません。

```javascript
const pi = 3.14;
console.log(pi);  // 3.14
```

このコードでは、`pi` という定数に `3.14` を設定しています。`pi` の値は、プログラムの実行中ずっと `3.14` のままです。

### なぜ定数が必要なのか

定数を使う理由はいくつかあります。

**意図を明確にする**

`const` を使うことで、「この値は変更しない」という意図を明確にできます。コードを読む人（将来の自分を含む）に、この値は固定であることが伝わります。

**間違いを防ぐ**

変更してはいけない値を `let` で宣言すると、うっかり変更してしまう可能性があります。`const` を使えば、変更しようとしたときにエラーが出るので、間違いを防げます。

**コードの品質を上げる**

多くのプログラマーは、「変更しない値は `const` で宣言する」というルールを守っています。これにより、コードの品質と可読性が上がります。

---

## constを使ってみよう

### 円周率を定義する

円周率は数学で決まっている値なので、変更することはありません。

```html
<script>
const pi = 3.14;
let radius = 5;
let circumference = 2 * pi * radius;

console.log("半径：" + radius);
console.log("円周：" + circumference);
</script>
```

このコードを実行すると、以下のように表示されます。

```
半径：5
円周：31.400000000000002
```

`pi` は定数なので変更できませんが、`radius` は変数なので後で変更できます。

### 消費税率を定義する

消費税率も、プログラムの中で変更することは通常ありません。

```html
<script>
const taxRate = 1.1;
let price = 100;
let priceWithTax = price * taxRate;

console.log("税抜価格：" + price + "円");
console.log("税込価格：" + priceWithTax + "円");
</script>
```

このコードを実行すると、以下のように表示されます。

```
税抜価格：100円
税込価格：110円
```

`taxRate` を `1.1` と定義することで、税抜価格に掛けるだけで税込価格が計算できます。

### 複数の商品の税込価格を計算する

定数を使うと、複数の計算で同じ値を使い回せます。

```html
<script>
const taxRate = 1.1;

let applePrice = 150;
let applePriceWithTax = applePrice * taxRate;

let breadPrice = 200;
let breadPriceWithTax = breadPrice * taxRate;

let milkPrice = 180;
let milkPriceWithTax = milkPrice * taxRate;

console.log("りんご（税込）：" + applePriceWithTax + "円");
console.log("パン（税込）：" + breadPriceWithTax + "円");
console.log("牛乳（税込）：" + milkPriceWithTax + "円");
</script>
```

このコードを実行すると、以下のように表示されます。

```
りんご（税込）：165円
パン（税込）：220円
牛乳（税込）：198円
```

すべての計算で同じ `taxRate` を使っているので、もし消費税率が変わったら、`const taxRate = 1.1` の部分を変えるだけで済みます。

---

## constは変更できない

### 再代入しようとするとエラーになる

`const` で宣言した値を変更しようとすると、エラーが発生します。実際に試してみましょう。

```html
<script>
const pi = 3.14;
pi = 3.14159;  // エラー！
console.log(pi);
</script>
```

このコードを実行すると、コンソールに赤いエラーメッセージが表示されます。

### エラーメッセージを読む

エラーメッセージは英語ですが、重要な情報が含まれています。

```
Uncaught TypeError: Assignment to constant variable.
```

このエラーメッセージの意味を分解してみましょう。

- **Uncaught**：捕捉されなかった（処理されなかったエラー）
- **TypeError**：型に関するエラー
- **Assignment to constant variable**：定数への代入

つまり、「定数に値を代入しようとした」というエラーです。

### エラーが出る場所を特定する

エラーメッセージには、エラーが発生した場所も表示されます。

```
at first.html:3
```

これは、`first.html` の3行目でエラーが発生したことを示しています。この情報を使って、問題のあるコードを見つけることができます。

### letなら変更できる

比較のために、`let` で宣言した変数を変更してみましょう。

```html
<script>
let count = 1;
console.log(count);  // 1

count = 2;
console.log(count);  // 2

count = 3;
console.log(count);  // 3
</script>
```

`let` で宣言した変数は、何度でも値を変更できます。これがエラーになることはありません。

---

## letとconstの違い

### 基本的な違い

| 項目 | let | const |
|------|-----|-------|
| 再代入 | できる | できない |
| 用途 | 変わる値 | 変わらない値 |

### どちらを使うべきか

基本的なルールは以下の通りです。

**constを使う場合**

- 円周率、消費税率など、数学的・社会的に決まっている値
- 設定値（例：最大文字数、表示色）
- 一度計算したら変更しない値

**letを使う場合**

- カウンター（数を数える変数）
- ユーザーからの入力値
- 計算の途中結果で、後で更新される値

### 迷ったらconstを使う

多くのプログラマーは、「迷ったらconstを使う」というルールを守っています。理由は以下の通りです。

- 意図しない変更を防げる
- コードの意図が明確になる
- 後でletに変えるのは簡単

最初は `const` で宣言し、変更が必要になったら `let` に変える、という方針がおすすめです。

---

## 消費税計算機を作ろう

ここまで学んだことを使って、消費税計算機を作ってみましょう。

### 基本の消費税計算

```html
<script>
const taxRate = 1.1;

let price1 = 100;
let price2 = 250;
let price3 = 480;

let total = price1 + price2 + price3;
let totalWithTax = total * taxRate;

console.log("--- 消費税計算 ---");
console.log("商品1：" + price1 + "円");
console.log("商品2：" + price2 + "円");
console.log("商品3：" + price3 + "円");
console.log("小計：" + total + "円");
console.log("税込合計：" + totalWithTax + "円");
</script>
```

このコードを実行すると、以下のように表示されます。

```
--- 消費税計算 ---
商品1：100円
商品2：250円
商品3：480円
小計：830円
税込合計：913円
```

### 軽減税率にも対応する

食品には軽減税率（8%）が適用される場合があります。

```html
<script>
const standardTaxRate = 1.1;   // 標準税率10%
const reducedTaxRate = 1.08;   // 軽減税率8%

// 標準税率の商品
let penPrice = 150;
let penWithTax = penPrice * standardTaxRate;

// 軽減税率の商品（食品）
let breadPrice = 200;
let breadWithTax = breadPrice * reducedTaxRate;

console.log("ペン（税込）：" + penWithTax + "円");
console.log("パン（税込）：" + breadWithTax + "円");
</script>
```

このコードを実行すると、以下のように表示されます。

```
ペン（税込）：165円
パン（税込）：216円
```

このように、定数を使い分けることで、異なる税率を簡単に適用できます。

---

## よくあるエラーと対処法

### エラー1：constに再代入

```javascript
const price = 100;
price = 200;  // エラー
```

**対処法**：値を変更したい場合は `let` を使います。

### エラー2：constの初期化忘れ

```javascript
const price;  // エラー
price = 100;
```

`const` は宣言と同時に値を設定する必要があります。

**対処法**：宣言と代入を同時に行います。

```javascript
const price = 100;
```

### エラー3：同じ名前の変数を2回宣言

```javascript
const pi = 3.14;
const pi = 3.14159;  // エラー
```

同じ名前の変数を2回宣言することはできません。

**対処法**：変数名を変えるか、最初の宣言だけを残します。

---

## 練習問題

### 保存場所

`exercises/lesson-010/index.html` を使用してください。このファイルは既に用意されています。各課題のコードを `<script>` タグの中に入力し、ブラウザで開いて動作を確認しましょう。

### 課題1：円の面積を計算

円周率を定数として定義し、半径5の円の面積を計算してください。

円の面積の公式：面積 = 半径 × 半径 × 円周率

### 課題2：消費税計算

消費税率を定数として定義し、以下の商品の税込価格を計算してください。

- ノート：120円
- ペン：80円
- 消しゴム：60円

各商品の税込価格と、合計の税込価格を表示してください。

### 課題3：割引計算

割引率20%を定数として定義し、1000円の商品の割引後価格を計算してください。

ヒント：割引後価格 = 元の価格 × (1 - 割引率)

### 課題4：エラーを体験する

以下のコードを実行して、エラーメッセージを確認してください。

```javascript
const message = "Hello";
message = "World";
```

エラーメッセージの内容と、エラーが発生した行を確認してください。

---

**解答例（課題1）**

```html
<script>
const pi = 3.14;
let radius = 5;
let area = radius * radius * pi;

console.log("半径：" + radius);
console.log("面積：" + area);
</script>
```

**解答例（課題2）**

```html
<script>
const taxRate = 1.1;

let notebookPrice = 120;
let penPrice = 80;
let eraserPrice = 60;

let notebookWithTax = notebookPrice * taxRate;
let penWithTax = penPrice * taxRate;
let eraserWithTax = eraserPrice * taxRate;

let total = notebookPrice + penPrice + eraserPrice;
let totalWithTax = total * taxRate;

console.log("ノート（税込）：" + notebookWithTax + "円");
console.log("ペン（税込）：" + penWithTax + "円");
console.log("消しゴム（税込）：" + eraserWithTax + "円");
console.log("合計（税込）：" + totalWithTax + "円");
</script>
```

**解答例（課題3）**

```html
<script>
const discountRate = 0.2;
let originalPrice = 1000;
let discountedPrice = originalPrice * (1 - discountRate);

console.log("元の価格：" + originalPrice + "円");
console.log("割引率：" + (discountRate * 100) + "%");
console.log("割引後価格：" + discountedPrice + "円");
</script>
```

---

## まとめ

### 今回学んだこと

**キーポイント1：定数（const）とは**

`const` は変わらない値を保存するためのキーワードです。一度設定した値は変更できません。

**キーポイント2：constとletの違い**

`const` は再代入できませんが、`let` は再代入できます。変わらない値には `const`、変わる値には `let` を使います。

**キーポイント3：エラーメッセージの読み方**

`const` に再代入しようとすると、「Assignment to constant variable」というエラーが出ます。エラーメッセージには、エラーの種類と発生場所が含まれています。

**キーポイント4：constを使うメリット**

意図しない変更を防ぎ、コードの意図を明確にできます。迷ったらconstを使うのがおすすめです。

---
