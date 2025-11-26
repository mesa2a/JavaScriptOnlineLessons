---
title: "Lesson 092.5: for...of文"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン92.5：for...of文

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、for文を使った配列処理について詳しく学びました。

**配列の巡回**：`for (let i = 0; i < array.length; i++)`のパターン
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

**インデックスアクセス**：`i`をインデックスとして使い、`配列名[i]`で要素を取得
```javascript
for (let i = 0; i < fruits.length; i++) {
  console.log((i + 1) + ". " + fruits[i]);
}
```

**配列の変更**：インデックスを使って各要素を変更できる
```javascript
for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2;
}
```

### よくある場面

実際のプログラミングでは、こんな場面でfor...of文が便利です。

**場面1：要素の値だけが必要**
```
配列の全要素を表示したいけど、番号は不要
→ for...of文を使う
→ インデックスを気にせずシンプルに書ける
```

**場面2：配列を読み取るだけ**
```
配列の合計を計算したい
→ 配列を変更しない
→ for...of文でシンプルに
```

**場面3：コードをシンプルにしたい**
```
for文の構文が複雑に感じる
→ for...of文なら初期化・条件・更新が不要
→ 読みやすいコードになる
```

### 学習目標

このレッスンでは、for...of文という配列を処理するためのより簡潔な方法を学びます。

- `for (let item of array)`の構文を理解する
- 通常のfor文との違いを明確にする
- どちらを使うべきか判断できるようになる
- それぞれの適切な使い分けをマスターする

for...of文を使うことで、コードがより読みやすく、書きやすくなります。

## for...of文とは

**for...of文**は、配列の各要素を順番に処理するための構文です。ES6（ECMAScript 2015）で追加された比較的新しい機能で、従来のfor文よりもシンプルに書けます。

### 基本的な構文

```javascript
for (let 要素 of 配列名) {
  // 処理
}
```

**構文の意味**：
```
for (let 要素 of 配列名)
         │      │
         │      └─ 処理対象の配列
         └──────── 各要素を格納する変数
```

### 基本的な例

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

for (let fruit of fruits) {
  console.log(fruit);
}
```

**出力**：
```
りんご
みかん
ぶどう
```

### 実行フロー

```
配列の状態:
-----------------
fruits = ["りんご", "みかん", "ぶどう"]

ループ1回目:
-----------------
fruit = "りんご"
console.log("りんご")

ループ2回目:
-----------------
fruit = "みかん"
console.log("みかん")

ループ3回目:
-----------------
fruit = "ぶどう"
console.log("ぶどう")

ループ終了
-----------------
配列の全要素を処理し終えたので終了
```

### ビジュアル図解

```
配列: ["りんご", "みかん", "ぶどう"]
       [0]      [1]      [2]

for...of の動き:
-----------------
fruit = "りんご" → 出力
fruit = "みかん" → 出力
fruit = "ぶどう" → 出力
全要素を処理 → 終了

インデックスは不要！
値に直接アクセス！
```

## 通常のfor文との比較

同じ処理を2つの方法で書いて比較してみましょう。

### 通常のfor文

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

**実行フロー**：
```
初期化: let i = 0
条件チェック: 0 < 3 → true
処理: console.log(fruits[0]) → "りんご"
更新: i++ → i = 1

条件チェック: 1 < 3 → true
処理: console.log(fruits[1]) → "みかん"
更新: i++ → i = 2

条件チェック: 2 < 3 → true
処理: console.log(fruits[2]) → "ぶどう"
更新: i++ → i = 3

条件チェック: 3 < 3 → false
終了
```

### for...of文

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

for (let fruit of fruits) {
  console.log(fruit);
}
```

**実行フロー**：
```
fruit = "りんご"
console.log("りんご")

fruit = "みかん"
console.log("みかん")

fruit = "ぶどう"
console.log("ぶどう")

終了
```

### 比較表

```
機能          | 通常のfor文              | for...of文
-------------|-------------------------|------------------
初期化        | let i = 0               | 不要
条件          | i < array.length        | 不要
更新          | i++                     | 不要
要素アクセス   | array[i]                | 直接取得
インデックス   | 利用可能（i）            | 利用不可
コードの長さ   | 長い                    | 短い
読みやすさ     | やや複雑                | シンプル
```

**重要な違い**：
- `for...of`は初期化・条件・更新が**不要**
- `for...of`は要素に**直接アクセス**
- `for...of`は**インデックスが取得できない**

## for...of文の特徴

### 1. インデックスが不要

for...of文では、インデックス変数（`i`）を使わずに配列を処理できます。

```javascript
let colors = ["赤", "青", "黄色"];

// 通常のfor文：インデックスが必要
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}

// for...of：インデックス不要
for (let color of colors) {
  console.log(color);
}
```

**実行フローの比較**：
```
通常のfor文:
-----------------
i = 0 → colors[0] → "赤"
i = 1 → colors[1] → "青"
i = 2 → colors[2] → "黄色"

for...of:
-----------------
color = "赤"
color = "青"
color = "黄色"

→ for...ofの方がシンプル！
```

### 2. 要素に直接アクセス

`配列名[i]`のように間接的にアクセスせず、直接要素を取得できます。

```javascript
let numbers = [10, 20, 30, 40, 50];

// 通常のfor文
for (let i = 0; i < numbers.length; i++) {
  let num = numbers[i];  // 間接的にアクセス
  console.log(num);
}

// for...of
for (let num of numbers) {  // 直接取得
  console.log(num);
}
```

**メリット**：
```
通常のfor文:
- インデックス i を管理
- numbers[i] で要素を取得
- 2ステップ

for...of:
- 要素を直接取得
- 1ステップ
- シンプル
```

### 3. シンプルで読みやすい

コードの意図が明確になり、読みやすくなります。

```javascript
let names = ["太郎", "花子", "次郎"];

// 通常のfor文
for (let i = 0; i < names.length; i++) {
  console.log(names[i] + "さん");
}

// for...of：「配列namesの各要素nameに対して」と読める
for (let name of names) {
  console.log(name + "さん");
}
```

**可読性の比較**：
```
通常のfor文:
「iを0から始めて、namesの長さ未満の間、iを1ずつ増やしながら、
 names[i]を取得して処理する」

for...of:
「配列namesの各要素nameに対して処理する」

→ for...ofの方が意図が明確！
```

## 通常のfor文が必要な場合

for...of文は便利ですが、すべての場面で使えるわけではありません。以下の場合は通常のfor文が必要です。

### 1. インデックスが必要な場合

**番号付きリストを作成**：

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 通常のfor文を使う必要がある
for (let i = 0; i < fruits.length; i++) {
  console.log((i + 1) + ". " + fruits[i]);
}
```

**出力**：
```
1. りんご
2. みかん
3. ぶどう
```

**実行フロー**：
```
i = 0:
-----------------
(i + 1) → (0 + 1) → 1
出力: "1. りんご"

i = 1:
-----------------
(i + 1) → (1 + 1) → 2
出力: "2. みかん"

i = 2:
-----------------
(i + 1) → (2 + 1) → 3
出力: "3. ぶどう"
```

**for...ofでは実現できない理由**：
```
for (let fruit of fruits) {
  console.log(?? + ". " + fruit);
}

→ インデックスが取得できないため、番号が作れない！
```

### 2. 配列を変更する場合

**要素を2倍にする**：

```javascript
let numbers = [1, 2, 3, 4, 5];

// 通常のfor文を使う必要がある
for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2;
}

console.log(numbers);  // [2, 4, 6, 8, 10]
```

**実行フロー**：
```
初期状態:
numbers = [1, 2, 3, 4, 5]

i = 0:
-----------------
numbers[0] = numbers[0] * 2
           = 1 * 2
           = 2
numbers = [2, 2, 3, 4, 5]

i = 1:
-----------------
numbers[1] = 2 * 2 = 4
numbers = [2, 4, 3, 4, 5]

i = 2:
-----------------
numbers[2] = 3 * 2 = 6
numbers = [2, 4, 6, 4, 5]

i = 3:
-----------------
numbers[3] = 4 * 2 = 8
numbers = [2, 4, 6, 8, 5]

i = 4:
-----------------
numbers[4] = 5 * 2 = 10
numbers = [2, 4, 6, 8, 10]

最終結果:
numbers = [2, 4, 6, 8, 10]
```

**for...ofでは動作しない理由**：

```javascript
let numbers = [1, 2, 3, 4, 5];

// これは動作しない（元の配列は変更されない）
for (let num of numbers) {
  num = num * 2;  // 変数numを変更しているだけ
}

console.log(numbers);  // [1, 2, 3, 4, 5]（変わらない）
```

**実行フロー**：
```
numbers = [1, 2, 3, 4, 5]

num = 1:
-----------------
num = 1 * 2 = 2
→ ローカル変数numが2になる
→ 配列numbers[0]は変わらない

num = 2:
-----------------
num = 2 * 2 = 4
→ ローカル変数numが4になる
→ 配列numbers[1]は変わらない

（以降同様）

最終結果:
numbers = [1, 2, 3, 4, 5]
→ 配列は変更されていない！
```

**なぜ変更されないのか**：
```
for...ofの仕組み:
-----------------
for (let num of numbers) {
  // numは配列の要素のコピー
  // numを変更しても元の配列には影響しない
}

通常のfor文:
-----------------
for (let i = 0; i < numbers.length; i++) {
  // numbers[i]は配列の要素そのもの
  // 変更すると元の配列も変わる
}
```

### 3. 特定の範囲だけを処理

**最初の3つだけを処理**：

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// 通常のfor文を使う必要がある
for (let i = 0; i < 3; i++) {
  console.log(fruits[i]);
}
```

**出力**：
```
りんご
みかん
ぶどう
```

**実行フロー**：
```
fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
         [0]      [1]      [2]      [3]      [4]

条件: i < 3

i = 0:
0 < 3 → true
fruits[0] → "りんご"

i = 1:
1 < 3 → true
fruits[1] → "みかん"

i = 2:
2 < 3 → true
fruits[2] → "ぶどう"

i = 3:
3 < 3 → false
終了

→ 最初の3つだけ処理
```

**for...ofでは不自然**：
```javascript
// 途中で止める必要がある
let count = 0;
for (let fruit of fruits) {
  if (count >= 3) break;
  console.log(fruit);
  count++;
}

→ カウンタ変数が必要になり、複雑になる
```

### 4. 逆順に処理

**末尾から先頭へ**：

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 通常のfor文を使う必要がある
for (let i = fruits.length - 1; i >= 0; i--) {
  console.log(fruits[i]);
}
```

**出力**：
```
ぶどう
みかん
りんご
```

**実行フロー**：
```
fruits = ["りんご", "みかん", "ぶどう"]
         [0]      [1]      [2]
length = 3

初期化: i = length - 1 = 2
条件: i >= 0
更新: i--

i = 2:
-----------------
2 >= 0 → true
fruits[2] → "ぶどう"
i-- → i = 1

i = 1:
-----------------
1 >= 0 → true
fruits[1] → "みかん"
i-- → i = 0

i = 0:
-----------------
0 >= 0 → true
fruits[0] → "りんご"
i-- → i = -1

i = -1:
-----------------
-1 >= 0 → false
終了
```

**ビジュアル図解**：
```
配列: ["りんご", "みかん", "ぶどう"]
       [0]      [1]      [2]

通常のfor（順方向）:
i=0 → i=1 → i=2
→ りんご → みかん → ぶどう

逆順のfor:
i=2 → i=1 → i=0
→ ぶどう → みかん → りんご
```

**for...ofでは不可能**：
```
for...ofは常に先頭から末尾への順番
逆順処理は通常のfor文でのみ可能
```

### 5. 複数の配列を同時に処理

**2つの配列を並行して処理**：

```javascript
let names = ["太郎", "花子", "次郎"];
let ages = [20, 25, 30];

// 通常のfor文を使う必要がある
for (let i = 0; i < names.length; i++) {
  console.log(names[i] + "さんは" + ages[i] + "歳です");
}
```

**出力**：
```
太郎さんは20歳です
花子さんは25歳です
次郎さんは30歳です
```

**実行フロー**：
```
names = ["太郎", "花子", "次郎"]
ages  = [20, 25, 30]

i = 0:
-----------------
names[0] → "太郎"
ages[0] → 20
出力: "太郎さんは20歳です"

i = 1:
-----------------
names[1] → "花子"
ages[1] → 25
出力: "花子さんは25歳です"

i = 2:
-----------------
names[2] → "次郎"
ages[2] → 30
出力: "次郎さんは30歳です"
```

**for...ofでは難しい**：
```
for...ofは1つの配列しか処理できない
複数配列の同時処理には通常のfor文が必要
```

## 使い分けの基準

どちらのループを使うべきか、明確な基準を持つことが重要です。

### for...of文を使うべき場合

#### ケース1：要素の値だけが必要

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// ✅ for...ofが適している
for (let fruit of fruits) {
  console.log("私は" + fruit + "が好きです");
}
```

**出力**：
```
私はりんごが好きです
私はみかんが好きです
私はぶどうが好きです
```

**実行フロー**：
```
fruit = "りんご"
→ "私はりんごが好きです"

fruit = "みかん"
→ "私はみかんが好きです"

fruit = "ぶどう"
→ "私はぶどうが好きです"

インデックス不要 → for...ofが最適
```

#### ケース2：配列を読み取るだけ（合計計算）

```javascript
let scores = [85, 92, 78, 95, 88];
let total = 0;

// ✅ for...ofが適している
for (let score of scores) {
  total = total + score;
}

console.log("合計: " + total);  // "合計: 438"
```

**実行フロー**：
```
初期状態:
scores = [85, 92, 78, 95, 88]
total = 0

score = 85:
-----------------
total = 0 + 85 = 85

score = 92:
-----------------
total = 85 + 92 = 177

score = 78:
-----------------
total = 177 + 78 = 255

score = 95:
-----------------
total = 255 + 95 = 350

score = 88:
-----------------
total = 350 + 88 = 438

最終結果: total = 438
```

**ビジュアル図解**：
```
配列: [85, 92, 78, 95, 88]

累積計算:
  0
+ 85 →  85
+ 92 → 177
+ 78 → 255
+ 95 → 350
+ 88 → 438

→ インデックス不要、読み取りのみ
→ for...ofが最適
```

#### ケース3：コードをシンプルにしたい

```javascript
let colors = ["赤", "青", "黄色"];

// ✅ for...ofが適している
for (let color of colors) {
  console.log(color);
}
```

**通常のfor文と比較**：
```
通常のfor文（7要素）:
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}

for...of（4要素）:
for (let color of colors) {
  console.log(color);
}

→ for...ofの方がシンプルで読みやすい
```

### 通常のfor文を使うべき場合

#### ケース1：インデックスが必要

```javascript
let todos = ["買い物", "掃除", "洗濯"];

// ✅ 通常のfor文が必要
for (let i = 0; i < todos.length; i++) {
  console.log((i + 1) + ". " + todos[i]);
}
```

**出力**：
```
1. 買い物
2. 掃除
3. 洗濯
```

**理由**：
```
番号付きリストにはインデックスが必要
→ i + 1 で番号を作成
→ for...ofでは不可能
```

#### ケース2：配列を変更する

```javascript
let numbers = [1, 2, 3, 4, 5];

// ✅ 通常のfor文が必要
for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2;
}

console.log(numbers);  // [2, 4, 6, 8, 10]
```

**理由**：
```
配列の要素を直接変更するにはインデックスが必要
→ numbers[i] = 新しい値
→ for...ofでは配列を変更できない
```

#### ケース3：特定の範囲を処理

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// ✅ 通常のfor文が必要
for (let i = 0; i < 3; i++) {
  console.log(fruits[i]);
}
```

**理由**：
```
条件で処理範囲を制御
→ i < 3 で最初の3つだけ
→ for...ofでは全要素を処理してしまう
```

#### ケース4：逆順に処理

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// ✅ 通常のfor文が必要
for (let i = fruits.length - 1; i >= 0; i--) {
  console.log(fruits[i]);
}
```

**理由**：
```
逆順処理にはインデックスの減少が必要
→ i-- で末尾から先頭へ
→ for...ofは順方向のみ
```

#### ケース5：複雑なループ制御

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// ✅ 通常のfor文が必要
for (let i = 0; i < numbers.length; i += 2) {
  console.log(numbers[i]);  // 1つおきに処理
}
```

**出力**：
```
1
3
5
7
9
```

**実行フロー**：
```
i = 0: numbers[0] → 1
i = 2: numbers[2] → 3
i = 4: numbers[4] → 5
i = 6: numbers[6] → 7
i = 8: numbers[8] → 9

i += 2 で1つおきに処理
```

**理由**：
```
カスタムな増分（i += 2）が必要
→ for...ofは1つずつしか処理できない
```

### 判断フローチャート

```
配列を処理したい
       ↓
インデックスが必要？
       ↓
    No │ Yes
       │  └→ 通常のfor文
       ↓
配列を変更する？
       ↓
    No │ Yes
       │  └→ 通常のfor文
       ↓
全要素を順番に処理？
       ↓
   Yes │ No
       │  └→ 通常のfor文
       ↓
   for...of文
```

### 使い分けまとめ表

```
状況                    | 推奨        | 理由
-----------------------|------------|------------------------
値だけ必要              | for...of   | シンプルで読みやすい
合計・平均計算          | for...of   | インデックス不要
配列の検証              | for...of   | 読み取りのみ
番号付きリスト          | 通常のfor  | インデックスが必要
配列の変更              | 通常のfor  | インデックスで変更
特定範囲の処理          | 通常のfor  | 条件で制御
逆順処理                | 通常のfor  | インデックス減少
複数配列の同時処理      | 通常のfor  | 同じインデックスで参照
1つおきに処理           | 通常のfor  | カスタム増分
```

**基本方針**：
1. **インデックスが不要** → `for...of`を使う
2. **インデックスが必要** → 通常の`for`を使う
3. **迷ったら** → よりシンプルな方（`for...of`）を選ぶ

## 実践例：ループ比較デモ

HTMLとJavaScriptを組み合わせて、両方のループの特徴を理解できるデモを作ってみましょう。

### HTML（index.html）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ループ比較デモ</title>
</head>
<body>
    <h1>for文とfor...of文の比較</h1>

    <h2>for...of文が適している例</h2>
    <button id="forOfExample">シンプルな表示</button>
    <div id="forOfResult"></div>

    <h2>通常のfor文が必要な例</h2>
    <button id="forExample">番号付き表示</button>
    <div id="forResult"></div>

    <h2>合計の計算（両方で可能）</h2>
    <button id="sumForOf">for...ofで合計</button>
    <button id="sumFor">forで合計</button>
    <div id="sumResult"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript（script.js）

```javascript
let forOfButton = document.getElementById("forOfExample");
let forButton = document.getElementById("forExample");
let sumForOfButton = document.getElementById("sumForOf");
let sumForButton = document.getElementById("sumFor");
let forOfResult = document.getElementById("forOfResult");
let forResult = document.getElementById("forResult");
let sumResult = document.getElementById("sumResult");

// データ
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
let scores = [85, 92, 78, 95, 88];

// for...ofでシンプルな表示
forOfButton.addEventListener("click", function() {
  forOfResult.innerHTML = "";

  for (let fruit of fruits) {
    let p = document.createElement("p");
    p.textContent = fruit;
    forOfResult.appendChild(p);
  }
});

// 通常のforで番号付き表示
forButton.addEventListener("click", function() {
  forResult.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = (i + 1) + ". " + fruits[i];
    forResult.appendChild(p);
  }
});

// for...ofで合計
sumForOfButton.addEventListener("click", function() {
  let total = 0;

  for (let score of scores) {
    total = total + score;
  }

  sumResult.textContent = "for...ofで計算した合計: " + total;
});

// 通常のforで合計
sumForButton.addEventListener("click", function() {
  let total = 0;

  for (let i = 0; i < scores.length; i++) {
    total = total + scores[i];
  }

  sumResult.textContent = "通常のforで計算した合計: " + total;
});
```

### コードの詳しい説明

#### for...ofでシンプルな表示

```javascript
forOfButton.addEventListener("click", function() {
  forOfResult.innerHTML = "";

  for (let fruit of fruits) {
    let p = document.createElement("p");
    p.textContent = fruit;
    forOfResult.appendChild(p);
  }
});
```

**実行フロー**：
```
1. ボタンクリック

2. forOfResult.innerHTML = ""
   結果エリアをクリア

3. for...of開始
   fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]

fruit = "りんご":
-----------------
let p = document.createElement("p")
→ <p></p> を作成

p.textContent = "りんご"
→ <p>りんご</p>

forOfResult.appendChild(p)
→ 結果エリアに追加

fruit = "みかん":
-----------------
新しい <p> を作成
p.textContent = "みかん"
→ <p>みかん</p>
結果エリアに追加

（以降同様に全要素を追加）

最終的なHTML:
-----------------
<div id="forOfResult">
  <p>りんご</p>
  <p>みかん</p>
  <p>ぶどう</p>
  <p>バナナ</p>
  <p>メロン</p>
</div>
```

**この例のポイント**：
- インデックス不要
- 要素に直接アクセス
- コードがシンプル
- `for...of`が最適

#### 通常のforで番号付き表示

```javascript
forButton.addEventListener("click", function() {
  forResult.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = (i + 1) + ". " + fruits[i];
    forResult.appendChild(p);
  }
});
```

**実行フロー**：
```
1. ボタンクリック

2. forResult.innerHTML = ""
   結果エリアをクリア

3. for文開始（fruits.length = 5）

i = 0:
-----------------
(i + 1) + ". " + fruits[0]
→ (0 + 1) + ". " + "りんご"
→ "1. りんご"

<p>1. りんご</p> を作成して追加

i = 1:
-----------------
(1 + 1) + ". " + "みかん"
→ "2. みかん"

<p>2. みかん</p> を追加

（以降同様）

最終的なHTML:
-----------------
<div id="forResult">
  <p>1. りんご</p>
  <p>2. みかん</p>
  <p>3. ぶどう</p>
  <p>4. バナナ</p>
  <p>5. メロン</p>
</div>
```

**この例のポイント**：
- インデックス`i`を使って番号を表示
- `i + 1`で1から始まる番号
- `for...of`では実現できない
- 通常の`for`が必要

#### 合計の計算（for...of版）

```javascript
sumForOfButton.addEventListener("click", function() {
  let total = 0;

  for (let score of scores) {
    total = total + score;
  }

  sumResult.textContent = "for...ofで計算した合計: " + total;
});
```

**実行フロー**：
```
初期状態:
scores = [85, 92, 78, 95, 88]
total = 0

score = 85:
-----------------
total = 0 + 85 = 85

score = 92:
-----------------
total = 85 + 92 = 177

score = 78:
-----------------
total = 177 + 78 = 255

score = 95:
-----------------
total = 255 + 95 = 350

score = 88:
-----------------
total = 350 + 88 = 438

最終結果:
sumResult.textContent = "for...ofで計算した合計: 438"
```

#### 合計の計算（通常のfor版）

```javascript
sumForButton.addEventListener("click", function() {
  let total = 0;

  for (let i = 0; i < scores.length; i++) {
    total = total + scores[i];
  }

  sumResult.textContent = "通常のforで計算した合計: " + total;
});
```

**実行フロー**：
```
初期状態:
scores = [85, 92, 78, 95, 88]
total = 0

i = 0:
-----------------
total = 0 + scores[0]
      = 0 + 85
      = 85

i = 1:
-----------------
total = 85 + scores[1]
      = 85 + 92
      = 177

i = 2:
-----------------
total = 177 + scores[2]
      = 177 + 78
      = 255

i = 3:
-----------------
total = 255 + scores[3]
      = 255 + 95
      = 350

i = 4:
-----------------
total = 350 + scores[4]
      = 350 + 88
      = 438

最終結果:
sumResult.textContent = "通常のforで計算した合計: 438"
```

**両方の比較**：
```
for...of版:
- シンプル
- 要素に直接アクセス
- 読みやすい

通常のfor版:
- インデックスを管理
- scores[i]でアクセス
- やや複雑

→ 合計計算はfor...ofの方が適している
```

## 実用的な例

### 例1：文字列の配列処理

```javascript
let messages = ["おはよう", "こんにちは", "こんばんは"];

// for...ofが適している
for (let message of messages) {
  console.log(message + "ございます");
}
```

**出力**：
```
おはようございます
こんにちはございます
こんばんはございます
```

**実行フロー**：
```
message = "おはよう"
→ "おはよう" + "ございます"
→ "おはようございます"

message = "こんにちは"
→ "こんにちは" + "ございます"
→ "こんにちはございます"

message = "こんばんは"
→ "こんばんは" + "ございます"
→ "こんばんはございます"

インデックス不要 → for...ofが最適
```

### 例2：データの検証（全員成人か確認）

```javascript
let ages = [20, 25, 17, 30, 15];
let allAdults = true;

// for...ofが適している
for (let age of ages) {
  if (age < 18) {
    allAdults = false;
    break;
  }
}

console.log(allAdults ? "全員成人" : "未成年が含まれる");
```

**出力**：
```
未成年が含まれる
```

**実行フロー**：
```
初期状態:
ages = [20, 25, 17, 30, 15]
allAdults = true

age = 20:
-----------------
20 < 18 → false
何もしない

age = 25:
-----------------
25 < 18 → false
何もしない

age = 17:
-----------------
17 < 18 → true
allAdults = false
break → ループ終了

最終結果:
allAdults = false
出力: "未成年が含まれる"
```

**この例のポイント**：
- 要素の値だけが必要
- 配列を読み取るだけ
- `break`で途中終了可能
- `for...of`が適している

### 例3：データの変換（新しい配列を作成）

**方法1：通常のfor文**

```javascript
let celsius = [0, 10, 20, 30, 40];
let fahrenheit = [];

for (let i = 0; i < celsius.length; i++) {
  let f = celsius[i] * 9 / 5 + 32;
  fahrenheit.push(f);
}

console.log(fahrenheit);  // [32, 50, 68, 86, 104]
```

**方法2：for...of文（推奨）**

```javascript
let celsius = [0, 10, 20, 30, 40];
let fahrenheit = [];

for (let c of celsius) {
  let f = c * 9 / 5 + 32;
  fahrenheit.push(f);
}

console.log(fahrenheit);  // [32, 50, 68, 86, 104]
```

**実行フロー（for...of版）**：
```
初期状態:
celsius = [0, 10, 20, 30, 40]
fahrenheit = []

c = 0:
-----------------
f = 0 * 9 / 5 + 32
  = 0 + 32
  = 32
fahrenheit.push(32)
→ fahrenheit = [32]

c = 10:
-----------------
f = 10 * 9 / 5 + 32
  = 18 + 32
  = 50
fahrenheit.push(50)
→ fahrenheit = [32, 50]

c = 20:
-----------------
f = 20 * 9 / 5 + 32
  = 36 + 32
  = 68
fahrenheit.push(68)
→ fahrenheit = [32, 50, 68]

c = 30:
-----------------
f = 30 * 9 / 5 + 32
  = 54 + 32
  = 86
fahrenheit.push(86)
→ fahrenheit = [32, 50, 68, 86]

c = 40:
-----------------
f = 40 * 9 / 5 + 32
  = 72 + 32
  = 104
fahrenheit.push(104)
→ fahrenheit = [32, 50, 68, 86, 104]

最終結果:
fahrenheit = [32, 50, 68, 86, 104]
```

**比較**：
```
通常のfor文:
- celsius[i]でアクセス
- インデックスを管理

for...of:
- cで直接アクセス
- シンプル

→ この場合はfor...ofの方が適している
（元の配列を変更せず、新しい配列を作成するため）
```

### 例4：最大値の検索

```javascript
let scores = [85, 92, 78, 95, 88];
let max = scores[0];  // 最初の要素で初期化

// for...ofが適している（インデックス1から始める必要がある場合は除く）
let first = true;
for (let score of scores) {
  if (first) {
    max = score;
    first = false;
  } else if (score > max) {
    max = score;
  }
}

console.log("最大値: " + max);  // "最大値: 95"
```

**より良い方法**：
```javascript
let scores = [85, 92, 78, 95, 88];
let max = scores[0];

// for...ofで2番目以降を処理
let isFirst = true;
for (let score of scores) {
  if (isFirst) {
    isFirst = false;
    continue;
  }
  if (score > max) {
    max = score;
  }
}

console.log("最大値: " + max);
```

**最もシンプルな方法（通常のfor推奨）**：
```javascript
let scores = [85, 92, 78, 95, 88];
let max = scores[0];

// インデックス1から始める場合は通常のforが適している
for (let i = 1; i < scores.length; i++) {
  if (scores[i] > max) {
    max = scores[i];
  }
}

console.log("最大値: " + max);
```

**実行フロー（通常のfor版）**：
```
初期状態:
scores = [85, 92, 78, 95, 88]
max = scores[0] = 85

i = 1:
-----------------
scores[1] = 92
92 > 85 → true
max = 92

i = 2:
-----------------
scores[2] = 78
78 > 92 → false
max = 92（変更なし）

i = 3:
-----------------
scores[3] = 95
95 > 92 → true
max = 95

i = 4:
-----------------
scores[4] = 88
88 > 95 → false
max = 95（変更なし）

最終結果: max = 95
```

**判断**：
```
最大値検索の場合、インデックス1から始めるのが自然
→ 通常のfor文が適している
```

## for...ofの制限事項と注意点

### 1. イテラブルなオブジェクトにのみ使える

`for...of`は配列だけでなく、イテラブル（反復可能）なオブジェクトに使えます。

**文字列の反復**：

```javascript
let text = "こんにちは";

for (let char of text) {
  console.log(char);
}
```

**出力**：
```
こ
ん
に
ち
は
```

**実行フロー**：
```
text = "こんにちは"

char = "こ"
console.log("こ")

char = "ん"
console.log("ん")

char = "に"
console.log("に")

char = "ち"
console.log("ち")

char = "は"
console.log("は")
```

**Setオブジェクトの反復**：

```javascript
let uniqueNumbers = new Set([1, 2, 3, 2, 1]);

for (let num of uniqueNumbers) {
  console.log(num);
}
```

**出力**：
```
1
2
3
```

**普通のオブジェクトには使えない**：

```javascript
let person = {
  name: "太郎",
  age: 20
};

// これはエラー
for (let value of person) {
  console.log(value);
}
// TypeError: person is not iterable
```

### 2. 古いブラウザでは動作しない

`for...of`はES6（ECMAScript 2015）の機能です。

**サポート状況**：
```
✅ Chrome 38以降
✅ Firefox 13以降
✅ Safari 7以降
✅ Edge（全バージョン）
❌ Internet Explorer 11以前

古いブラウザをサポートする必要がある場合は、
通常のfor文を使うか、トランスパイラ（Babel）を使用
```

### 3. breakとcontinueは使える

通常のfor文と同じく、`break`と`continue`が使えます。

**break（途中終了）**：

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let num of numbers) {
  if (num > 5) {
    break;  // 5より大きくなったら終了
  }
  console.log(num);
}
```

**出力**：
```
1
2
3
4
5
```

**実行フロー**：
```
num = 1: 1 > 5 → false → 出力
num = 2: 2 > 5 → false → 出力
num = 3: 3 > 5 → false → 出力
num = 4: 4 > 5 → false → 出力
num = 5: 5 > 5 → false → 出力
num = 6: 6 > 5 → true → break → 終了
```

**continue（スキップ）**：

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let num of numbers) {
  if (num % 2 === 0) {
    continue;  // 偶数はスキップ
  }
  console.log(num);
}
```

**出力**：
```
1
3
5
7
9
```

**実行フロー**：
```
num = 1: 1 % 2 === 0 → false → 出力
num = 2: 2 % 2 === 0 → true → continue → スキップ
num = 3: 3 % 2 === 0 → false → 出力
num = 4: 4 % 2 === 0 → true → continue → スキップ
num = 5: 5 % 2 === 0 → false → 出力
num = 6: 6 % 2 === 0 → true → continue → スキップ
num = 7: 7 % 2 === 0 → false → 出力
num = 8: 8 % 2 === 0 → true → continue → スキップ
num = 9: 9 % 2 === 0 → false → 出力
num = 10: 10 % 2 === 0 → true → continue → スキップ
```

### 4. インデックスが本当に必要か考える

インデックスが必要だと思っても、実は不要な場合があります。

**悪い例（不要なインデックス）**：

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// インデックスを使っているが、値しか使っていない
for (let i = 0; i < fruits.length; i++) {
  console.log("私は" + fruits[i] + "が好きです");
}
```

**良い例（for...of）**：

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// インデックス不要なのでfor...ofを使う
for (let fruit of fruits) {
  console.log("私は" + fruit + "が好きです");
}
```

**判断基準**：
```
インデックス i を使っている箇所を確認

✅ i + 1 で番号を作成 → インデックス必要
✅ array[i] = 新しい値 → インデックス必要
✅ array1[i] と array2[i] → インデックス必要
❌ array[i] を取得するだけ → インデックス不要（for...of）
```

## 練習問題

### 課題：ループ比較デモ

`for`文と`for...of`文の両方を使って、それぞれの特徴を理解するプログラムを作成してください。

### 保存場所

`exercises/lesson-092.5/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. `for...of`文の基本構文を理解する
2. 通常のfor文との違いを比較する
3. それぞれの適切な使い分けを実装する

### 要件

- for...of文でシンプルな表示（id="forOfExample"）
- 通常のfor文で番号付き表示（id="forExample"）
- for...ofで合計計算（id="sumForOf"）
- 通常のforで合計計算（id="sumFor"）
- 各結果の表示エリア

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-092.5
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

for...of文と通常のfor文の使い分けのポイントを確認しましょう。

**for...of文の基本パターン**
```javascript
for (let 要素 of 配列名) {
  // 要素に直接アクセスできる
}
```
- インデックス不要
- 要素に直接アクセス
- シンプルで読みやすい

**通常のfor文の基本パターン**
```javascript
for (let i = 0; i < 配列名.length; i++) {
  // 配列名[i] で要素にアクセス
  // i を使って番号付けなどが可能
}
```
- インデックスが使える
- 配列の変更が可能
- 番号付きリストを作れる

**シンプルな表示（for...of推奨）**
```javascript
for (let fruit of fruits) {
  let p = document.createElement("p");
  p.textContent = fruit;
  result.appendChild(p);
}
```
- 要素の値だけが必要
- インデックス不要
- for...ofが最適

**番号付き表示（通常のfor必須）**
```javascript
for (let i = 0; i < fruits.length; i++) {
  let p = document.createElement("p");
  p.textContent = (i + 1) + ". " + fruits[i];
  result.appendChild(p);
}
```
- インデックスが必要
- i + 1 で番号を作成
- for...ofでは不可能

**合計計算（両方可能、for...of推奨）**
```javascript
// for...of版（推奨）
for (let score of scores) {
  total = total + score;
}

// 通常のfor版
for (let i = 0; i < scores.length; i++) {
  total = total + scores[i];
}
```
- どちらでも実装可能
- インデックス不要なのでfor...ofの方がシンプル

### 解答例

#### HTML（index.html）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 092.5</title>
</head>
<body>
    <h1>for文とfor...of文の比較</h1>

    <h2>for...of文が適している例</h2>
    <button id="forOfExample">シンプルな表示</button>
    <div id="forOfResult"></div>

    <h2>通常のfor文が必要な例</h2>
    <button id="forExample">番号付き表示</button>
    <div id="forResult"></div>

    <h2>合計の計算（両方で可能）</h2>
    <button id="sumForOf">for...ofで合計</button>
    <button id="sumFor">forで合計</button>
    <div id="sumResult"></div>

    <script src="script.js"></script>
</body>
</html>
```

#### JavaScript（script.js）

```javascript
let forOfButton = document.getElementById("forOfExample");
let forButton = document.getElementById("forExample");
let sumForOfButton = document.getElementById("sumForOf");
let sumForButton = document.getElementById("sumFor");
let forOfResult = document.getElementById("forOfResult");
let forResult = document.getElementById("forResult");
let sumResult = document.getElementById("sumResult");

// データ
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
let scores = [85, 92, 78, 95, 88];

// for...ofでシンプルな表示
forOfButton.addEventListener("click", function() {
  forOfResult.innerHTML = "";

  for (let fruit of fruits) {
    let p = document.createElement("p");
    p.textContent = fruit;
    forOfResult.appendChild(p);
  }
});

// 通常のforで番号付き表示
forButton.addEventListener("click", function() {
  forResult.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = (i + 1) + ". " + fruits[i];
    forResult.appendChild(p);
  }
});

// for...ofで合計
sumForOfButton.addEventListener("click", function() {
  let total = 0;

  for (let score of scores) {
    total = total + score;
  }

  sumResult.textContent = "for...ofで計算した合計: " + total;
});

// 通常のforで合計
sumForButton.addEventListener("click", function() {
  let total = 0;

  for (let i = 0; i < scores.length; i++) {
    total = total + scores[i];
  }

  sumResult.textContent = "通常のforで計算した合計: " + total;
});
```

### 解説

このコードでは、for文とfor...of文の両方を使って、それぞれの特徴を比較しています。

**for...ofでシンプルな表示**
```javascript
for (let fruit of fruits) {
  let p = document.createElement("p");
  p.textContent = fruit;
  forOfResult.appendChild(p);
}
```
- 要素に直接アクセス
- インデックス不要
- コードがシンプル
- 読み取り専用の処理に最適

**通常のforで番号付き表示**
```javascript
for (let i = 0; i < fruits.length; i++) {
  let p = document.createElement("p");
  p.textContent = (i + 1) + ". " + fruits[i];
  forResult.appendChild(p);
}
```
- インデックス i を使って番号を作成
- i + 1 で1から始まる番号
- for...ofでは実現できない
- インデックスが必要な処理に最適

**合計の計算（両方で可能）**

for...of版：
```javascript
for (let score of scores) {
  total = total + score;
}
```
- シンプルで読みやすい
- 要素に直接アクセス
- 推奨される方法

通常のfor版：
```javascript
for (let i = 0; i < scores.length; i++) {
  total = total + scores[i];
}
```
- インデックスを管理する必要がある
- やや複雑

どちらでも実装可能ですが、インデックスが不要な場合はfor...ofを使う方がシンプルで読みやすくなります。

## まとめ

お疲れ様でした。今回のレッスンでは、for...of文について詳しく学びました。

### 今回学んだキーポイント

**for...of文の構文**：
- `for (let 要素 of 配列名)`の形式で配列の各要素に直接アクセスできます
- 初期化・条件・更新が不要でシンプルに書けます
- インデックスは取得できませんが、要素の値に直接アクセスできます

**通常のfor文との違い**：
- for...ofはインデックスが不要な場合にシンプルに書けます
- 通常のforはインデックスが必要な場合や配列を変更する場合に使います
- どちらも配列を処理できますが、適した用途が異なります

**使い分けの基準**：
- 要素の値だけが必要 → `for...of`を使う
- インデックスが必要 → 通常の`for`を使う
- 配列を変更する → 通常の`for`を使う
- 迷ったらシンプルな方を選ぶ

**for...ofの特徴**：
- コードがシンプルで読みやすい
- 配列の読み取り専用処理に最適
- break、continueが使える
- イテラブルなオブジェクトに使える

for...of文は、配列を読み取るだけの処理において非常に便利です。しかし、インデックスが必要な場合や配列を変更する場合には通常のfor文が必要です。状況に応じて適切なループを選択することで、読みやすく保守しやすいコードを書くことができます。

## カリキュラムの要件チェック

このレッスンは、カリキュラムの以下の要件を満たしています。

✅ **for (let item of array)**：for...of文の基本構文を学び、配列の各要素に直接アクセスする方法を理解しました

✅ **通常のfor文との違い**：インデックスの有無、コードのシンプルさ、適用場面など、両者の違いを詳しく学びました

✅ **使い分けの基準**：どちらを使うべきか判断できるように、具体的な基準と判断フローチャートを学びました

✅ **成果物：ループ比較デモ**：HTMLとJavaScriptを組み合わせて、両方のループの特徴を比較できるプログラムを実装しました

## 次回予告

次のレッスンでは、配列の検索について学びます。

- 特定の要素を探す方法
- 見つかったらメッセージを表示
- 配列の中から目的のデータを見つけ出す

配列の中から必要なデータを効率的に探し出す方法を習得しましょう。楽しみにしていてください。
