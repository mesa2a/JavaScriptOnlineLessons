---
title: "Lesson 092: forで配列処理"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン92：forで配列処理

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、配列の長さについて詳しく学びました。

**lengthプロパティ**：`配列名.length`で配列の要素数を取得できます。
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits.length);  // 3
```

**要素数のカウント**：`length`は配列の操作に応じて自動的に更新されます。
```javascript
fruits.push("バナナ");
console.log(fruits.length);  // 4
```

**空配列の判定**：`length === 0`で配列が空かどうかを判定できます。
```javascript
if (fruits.length === 0) {
  console.log("配列は空です");
}
```

### よくある場面

実際のプログラミングでは、こんな場面で配列をループ処理します。

**場面1：すべての要素を表示**
```
配列に入っている商品名をすべて表示したい
→ for文で配列を巡回
→ 各要素を順番に表示
```

**場面2：番号付きリストの作成**
```
TODOリストを「1. 買い物」「2. 掃除」のように番号付きで表示したい
→ for文のインデックスを使う
→ i + 1 で1から始まる番号を作る
```

**場面3：すべての要素に処理を適用**
```
配列のすべての数値を2倍にしたい
→ for文で各要素にアクセス
→ 値を変更する
```

### 学習目標

このレッスンでは、for文を使って配列のすべての要素を処理する方法を学びます。

- `for (let i = 0; i < array.length; i++)`の構文を理解する
- すべての要素を順番に表示する方法を学ぶ
- 番号付きリストを作成する方法を習得する
- インデックスを使った配列アクセスをマスターする

配列とfor文を組み合わせることで、データを効率的に処理できるようになります。

## 配列の巡回とは

**配列の巡回（ループ）**とは、配列のすべての要素に順番にアクセスすることです。

### 基本的なパターン

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
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
         [0]      [1]      [2]
length = 3

ループ i = 0:
-----------------
条件: 0 < 3 → true
fruits[0] にアクセス
→ "りんご"
console.log("りんご")
i++ → i = 1

ループ i = 1:
-----------------
条件: 1 < 3 → true
fruits[1] にアクセス
→ "みかん"
console.log("みかん")
i++ → i = 2

ループ i = 2:
-----------------
条件: 2 < 3 → true
fruits[2] にアクセス
→ "ぶどう"
console.log("ぶどう")
i++ → i = 3

ループ i = 3:
-----------------
条件: 3 < 3 → false
ループ終了
```

### ビジュアル図解

```
配列: ["りんご", "みかん", "ぶどう"]
       [0]      [1]      [2]

for文の動き:
-----------------
i=0 → fruits[0] → "りんご" → 出力
i=1 → fruits[1] → "みかん" → 出力
i=2 → fruits[2] → "ぶどう" → 出力
i=3 → 3 < 3 は false → 終了
```

## for文の構文を詳しく理解する

```javascript
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

### 各部分の意味

```
for (初期化; 条件; 更新) {
  処理
}

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
     │        │                │
     │        │                └─ 更新: iを1増やす
     │        └────────────────── 条件: i が length 未満の間
     └─────────────────────────── 初期化: i を 0 で開始
```

**詳しい説明**：

1. **`let i = 0`（初期化）**
   - カウンタ変数`i`を作成
   - 0で初期化（配列の最初のインデックス）
   - ループ開始時に1回だけ実行

2. **`i < fruits.length`（条件）**
   - ループを続けるかどうかの条件
   - `i`が配列の長さ未満の間、ループを続ける
   - `fruits.length = 3`なので、`i < 3`の間

3. **`i++`（更新）**
   - 各ループの最後に実行
   - `i`を1増やす
   - 次の要素に移動

4. **`fruits[i]`（要素へのアクセス）**
   - `i`番目の要素を取得
   - `i`の値によって取得する要素が変わる

### なぜ `i < length` なのか

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
// length = 3
// 有効なインデックス: 0, 1, 2

// 正しい: i < 3 (0, 1, 2)
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// 間違い: i <= 3 (0, 1, 2, 3)
for (let i = 0; i <= fruits.length; i++) {
  console.log(fruits[i]);  // 最後に undefined
}
```

**実行フロー（間違った例）**：
```
i = 0: fruits[0] → "りんご"
i = 1: fruits[1] → "みかん"
i = 2: fruits[2] → "ぶどう"
i = 3: fruits[3] → undefined（存在しない！）
```

**重要な関係**：
```
配列の長さ:          3
有効なインデックス:  0, 1, 2
条件:               i < 3

0 < 3 → true  (OK)
1 < 3 → true  (OK)
2 < 3 → true  (OK)
3 < 3 → false (停止)
```

## インデックスと値の両方を使う

for文を使うと、インデックス（`i`）と値（`fruits[i]`）の両方が使えます。

### インデックスと値を表示

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

for (let i = 0; i < fruits.length; i++) {
  console.log("インデックス " + i + ": " + fruits[i]);
}
```

**出力**：
```
インデックス 0: りんご
インデックス 1: みかん
インデックス 2: ぶどう
```

### 実行フロー

```
配列の状態:
fruits = ["りんご", "みかん", "ぶどう"]
         [0]      [1]      [2]

i = 0:
-----------------
"インデックス " + 0 + ": " + fruits[0]
→ "インデックス 0: りんご"

i = 1:
-----------------
"インデックス " + 1 + ": " + fruits[1]
→ "インデックス 1: みかん"

i = 2:
-----------------
"インデックス " + 2 + ": " + fruits[2]
→ "インデックス 2: ぶどう"
```

## 番号付きリストの作成

インデックスは0から始まりますが、番号は通常1から始めたいことが多いです。

```javascript
let todos = ["買い物", "掃除", "洗濯"];

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

### 実行フロー

```
配列の状態:
todos = ["買い物", "掃除", "洗濯"]
        [0]     [1]    [2]

i = 0:
-----------------
(i + 1) → (0 + 1) → 1
(1) + ". " + todos[0]
→ "1. 買い物"

i = 1:
-----------------
(i + 1) → (1 + 1) → 2
(2) + ". " + todos[1]
→ "2. 掃除"

i = 2:
-----------------
(i + 1) → (2 + 1) → 3
(3) + ". " + todos[2]
→ "3. 洗濯"
```

### なぜ `i + 1` が必要か

```
インデックス:  0    1    2    (0から始まる)
番号:         1    2    3    (1から始まる)

変換: 番号 = インデックス + 1

i = 0 → 番号 = 1
i = 1 → 番号 = 2
i = 2 → 番号 = 3
```

**ビジュアル図解**：
```
配列のインデックス: [0]     [1]    [2]
配列の値:          買い物   掃除   洗濯
表示する番号:       1.      2.     3.
                    ↑       ↑      ↑
                  i+1=1   i+1=2  i+1=3
```

## 全要素の表示パターン

### パターン1：シンプルな表示

```javascript
let colors = ["赤", "青", "黄色", "緑"];

for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}
```

**実行フロー**：
```
i=0: console.log("赤")
i=1: console.log("青")
i=2: console.log("黄色")
i=3: console.log("緑")
```

**出力**：
```
赤
青
黄色
緑
```

### パターン2：カンマ区切り

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let result = "";

for (let i = 0; i < fruits.length; i++) {
  result = result + fruits[i];

  if (i < fruits.length - 1) {
    result = result + ", ";
  }
}

console.log(result);  // "りんご, みかん, ぶどう"
```

### 実行フロー

```
初期状態:
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
result = ""
length = 3

i = 0:
-----------------
result = "" + "りんご"
→ result = "りんご"

i < length - 1 ?
0 < 3 - 1 → 0 < 2 → true

result = "りんご" + ", "
→ result = "りんご, "

i = 1:
-----------------
result = "りんご, " + "みかん"
→ result = "りんご, みかん"

i < length - 1 ?
1 < 2 → true

result = "りんご, みかん" + ", "
→ result = "りんご, みかん, "

i = 2:
-----------------
result = "りんご, みかん, " + "ぶどう"
→ result = "りんご, みかん, ぶどう"

i < length - 1 ?
2 < 2 → false

カンマを追加しない（最後の要素）

最終結果:
-----------------
result = "りんご, みかん, ぶどう"
```

**なぜ `i < length - 1` なのか**：
```
length = 3
length - 1 = 2

i = 0: 0 < 2 → true  (カンマ追加)
i = 1: 1 < 2 → true  (カンマ追加)
i = 2: 2 < 2 → false (カンマ追加しない)

→ 最後の要素の後にはカンマを付けない
```

### パターン3：箇条書き

```javascript
let items = ["パン", "牛乳", "卵"];

for (let i = 0; i < items.length; i++) {
  console.log("・" + items[i]);
}
```

**実行フロー**：
```
i=0: "・" + "パン"   → "・パン"
i=1: "・" + "牛乳"   → "・牛乳"
i=2: "・" + "卵"     → "・卵"
```

**出力**：
```
・パン
・牛乳
・卵
```

## 配列の要素を変更する

for文を使って、配列の各要素を変更できます。

### すべての要素を2倍にする

```javascript
let numbers = [1, 2, 3, 4, 5];
console.log("元の配列: " + numbers);

for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2;
}

console.log("2倍後: " + numbers);
```

**出力**：
```
元の配列: 1,2,3,4,5
2倍後: 2,4,6,8,10
```

### 実行フロー

```
初期状態:
-----------------
numbers = [1, 2, 3, 4, 5]
          [0][1][2][3][4]

i = 0:
-----------------
numbers[0] = numbers[0] * 2
           = 1 * 2
           = 2
numbers = [2, 2, 3, 4, 5]

i = 1:
-----------------
numbers[1] = numbers[1] * 2
           = 2 * 2
           = 4
numbers = [2, 4, 3, 4, 5]

i = 2:
-----------------
numbers[2] = numbers[2] * 2
           = 3 * 2
           = 6
numbers = [2, 4, 6, 4, 5]

i = 3:
-----------------
numbers[3] = numbers[3] * 2
           = 4 * 2
           = 8
numbers = [2, 4, 6, 8, 5]

i = 4:
-----------------
numbers[4] = numbers[4] * 2
           = 5 * 2
           = 10
numbers = [2, 4, 6, 8, 10]

最終結果:
-----------------
numbers = [2, 4, 6, 8, 10]
```

## 条件に合う要素だけを処理

### 偶数だけを表示

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("偶数:");
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    console.log(numbers[i]);
  }
}
```

**出力**：
```
偶数:
2
4
6
8
10
```

### 実行フロー

```
配列: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

i = 0:
-----------------
numbers[0] = 1
1 % 2 === 0 → false
何もしない

i = 1:
-----------------
numbers[1] = 2
2 % 2 === 0 → true
console.log(2)

i = 2:
-----------------
numbers[2] = 3
3 % 2 === 0 → false
何もしない

i = 3:
-----------------
numbers[3] = 4
4 % 2 === 0 → true
console.log(4)

i = 4:
-----------------
numbers[4] = 5
5 % 2 === 0 → false
何もしない

i = 5:
-----------------
numbers[5] = 6
6 % 2 === 0 → true
console.log(6)

（以降同様に8, 10が表示される）
```

**ビジュアル図解**：
```
配列: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
       奇 偶 奇 偶 奇 偶 奇 偶 奇 偶
       ×  ○  ×  ○  ×  ○  ×  ○  ×  ○

○ = 偶数 → 表示する
× = 奇数 → スキップ

結果: 2, 4, 6, 8, 10
```

## 配列の集計

### 合計と平均を計算

```javascript
let scores = [85, 92, 78, 95, 88];
let total = 0;

for (let i = 0; i < scores.length; i++) {
  total = total + scores[i];
}

console.log("合計点: " + total);  // 438
console.log("平均点: " + (total / scores.length));  // 87.6
```

### 実行フロー

```
初期状態:
-----------------
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

ループ終了後:
-----------------
total = 438

平均の計算:
-----------------
total / scores.length
= 438 / 5
= 87.6
```

**ビジュアル図解**：
```
配列: [85, 92, 78, 95, 88]

累積:
  0
+ 85 →  85
+ 92 → 177
+ 78 → 255
+ 95 → 350
+ 88 → 438

平均: 438 ÷ 5 = 87.6
```

## 実践例：配列表示機

HTMLとJavaScriptを組み合わせて、配列を様々な形式で表示するプログラムを作ってみましょう。

### HTML（index.html）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>配列表示機</title>
</head>
<body>
    <h1>フルーツリストの表示</h1>
    <button id="showSimple">シンプル表示</button>
    <button id="showNumbered">番号付き表示</button>
    <button id="showList">リスト表示</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript（script.js）

```javascript
let simpleButton = document.getElementById("showSimple");
let numberedButton = document.getElementById("showNumbered");
let listButton = document.getElementById("showList");
let result = document.getElementById("result");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// シンプル表示
simpleButton.addEventListener("click", function() {
  result.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = fruits[i];
    result.appendChild(p);
  }
});

// 番号付き表示
numberedButton.addEventListener("click", function() {
  result.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = (i + 1) + ". " + fruits[i];
    result.appendChild(p);
  }
});

// リスト表示
listButton.addEventListener("click", function() {
  result.innerHTML = "";

  let ul = document.createElement("ul");

  for (let i = 0; i < fruits.length; i++) {
    let li = document.createElement("li");
    li.textContent = fruits[i];
    ul.appendChild(li);
  }

  result.appendChild(ul);
});
```

### コードの詳しい説明

#### シンプル表示

```javascript
simpleButton.addEventListener("click", function() {
  result.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = fruits[i];
    result.appendChild(p);
  }
});
```

**実行フロー**：
```
1. ボタンがクリックされる

2. result.innerHTML = "" を実行
   結果エリアをクリア

3. for文開始（fruits.length = 5）

i = 0:
-----------------
let p = document.createElement("p")
→ <p></p> を作成

p.textContent = fruits[0]
→ p.textContent = "りんご"
→ <p>りんご</p>

result.appendChild(p)
→ 結果エリアに追加

i = 1:
-----------------
新しい <p> を作成
p.textContent = "みかん"
→ <p>みかん</p>
結果エリアに追加

（以降同様に全要素を追加）

最終的なHTML:
-----------------
<div id="result">
  <p>りんご</p>
  <p>みかん</p>
  <p>ぶどう</p>
  <p>バナナ</p>
  <p>メロン</p>
</div>
```

**この例のポイント**：
- `document.createElement("p")`で`<p>`要素を作成
- `fruits[i]`で各要素にアクセス
- `appendChild()`でDOMに追加

#### 番号付き表示

```javascript
numberedButton.addEventListener("click", function() {
  result.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = (i + 1) + ". " + fruits[i];
    result.appendChild(p);
  }
});
```

**実行フロー**：
```
i = 0:
-----------------
(i + 1) + ". " + fruits[0]
→ (0 + 1) + ". " + "りんご"
→ 1 + ". " + "りんご"
→ "1. りんご"

<p>1. りんご</p> を追加

i = 1:
-----------------
(1 + 1) + ". " + "みかん"
→ "2. みかん"

<p>2. みかん</p> を追加

（以降同様）

最終的なHTML:
-----------------
<div id="result">
  <p>1. りんご</p>
  <p>2. みかん</p>
  <p>3. ぶどう</p>
  <p>4. バナナ</p>
  <p>5. メロン</p>
</div>
```

**この例のポイント**：
- `i + 1`で1から始まる番号を作成
- インデックス0が番号1になる
- `". "`で番号と名前を区切る

#### リスト表示

```javascript
listButton.addEventListener("click", function() {
  result.innerHTML = "";

  let ul = document.createElement("ul");

  for (let i = 0; i < fruits.length; i++) {
    let li = document.createElement("li");
    li.textContent = fruits[i];
    ul.appendChild(li);
  }

  result.appendChild(ul);
});
```

**実行フロー**：
```
1. result.innerHTML = ""
   結果エリアをクリア

2. let ul = document.createElement("ul")
   <ul></ul> を作成

3. for文で<li>要素を追加

i = 0:
-----------------
let li = document.createElement("li")
→ <li></li> を作成

li.textContent = "りんご"
→ <li>りんご</li>

ul.appendChild(li)
→ <ul> に <li> を追加

<ul>
  <li>りんご</li>
</ul>

i = 1:
-----------------
新しい <li> を作成
li.textContent = "みかん"
<ul> に追加

<ul>
  <li>りんご</li>
  <li>みかん</li>
</ul>

（以降同様に全要素を追加）

4. result.appendChild(ul)
   完成した <ul> を結果エリアに追加

最終的なHTML:
-----------------
<div id="result">
  <ul>
    <li>りんご</li>
    <li>みかん</li>
    <li>ぶどう</li>
    <li>バナナ</li>
    <li>メロン</li>
  </ul>
</div>
```

**この例のポイント**：
- 先に`<ul>`を作成
- for文で各`<li>`を`<ul>`に追加
- 最後に完成した`<ul>`を結果エリアに追加

## よくあるパターン

### パターン1：配列のコピー

```javascript
let original = ["りんご", "みかん", "ぶどう"];
let copy = [];

for (let i = 0; i < original.length; i++) {
  copy.push(original[i]);
}

console.log(copy);  // ["りんご", "みかん", "ぶどう"]
```

**実行フロー**：
```
初期状態:
-----------------
original = ["りんご", "みかん", "ぶどう"]
copy = []

i = 0:
-----------------
copy.push(original[0])
→ copy.push("りんご")
→ copy = ["りんご"]

i = 1:
-----------------
copy.push(original[1])
→ copy.push("みかん")
→ copy = ["りんご", "みかん"]

i = 2:
-----------------
copy.push(original[2])
→ copy.push("ぶどう")
→ copy = ["りんご", "みかん", "ぶどう"]

最終結果:
-----------------
copy = ["りんご", "みかん", "ぶどう"]
```

### パターン2：逆順に処理

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 末尾から先頭へ
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
初期状態:
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
         [0]      [1]      [2]
length = 3

開始: i = length - 1 = 3 - 1 = 2
条件: i >= 0
更新: i-- (減少)

i = 2:
-----------------
条件: 2 >= 0 → true
fruits[2] → "ぶどう"
console.log("ぶどう")
i-- → i = 1

i = 1:
-----------------
条件: 1 >= 0 → true
fruits[1] → "みかん"
console.log("みかん")
i-- → i = 0

i = 0:
-----------------
条件: 0 >= 0 → true
fruits[0] → "りんご"
console.log("りんご")
i-- → i = -1

i = -1:
-----------------
条件: -1 >= 0 → false
ループ終了
```

**ビジュアル図解**：
```
通常（i++）:
i=0 → [りんご] → みかん → ぶどう

逆順（i--）:
i=2 → りんご → みかん → [ぶどう]
i=1 → りんご → [みかん] → ぶどう
i=0 → [りんご] → みかん → ぶどう
```

### パターン3：条件に合う要素を集める

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let evenNumbers = [];

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    evenNumbers.push(numbers[i]);
  }
}

console.log(evenNumbers);  // [2, 4, 6, 8, 10]
```

**実行フロー**：
```
初期状態:
-----------------
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evenNumbers = []

i = 0:
-----------------
numbers[0] = 1
1 % 2 === 0 → false
何もしない

i = 1:
-----------------
numbers[1] = 2
2 % 2 === 0 → true
evenNumbers.push(2)
evenNumbers = [2]

i = 2:
-----------------
numbers[2] = 3
3 % 2 === 0 → false
何もしない

i = 3:
-----------------
numbers[3] = 4
4 % 2 === 0 → true
evenNumbers.push(4)
evenNumbers = [2, 4]

（以降同様に6, 8, 10が追加される）

最終結果:
-----------------
evenNumbers = [2, 4, 6, 8, 10]
```

### パターン4：最大値の検索

```javascript
let numbers = [12, 45, 23, 67, 34, 89, 15];
let max = numbers[0];  // 最初の要素で初期化

for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > max) {
    max = numbers[i];
  }
}

console.log("最大値: " + max);  // "最大値: 89"
```

**実行フロー**：
```
初期状態:
-----------------
numbers = [12, 45, 23, 67, 34, 89, 15]
max = numbers[0] = 12

i = 1:
-----------------
numbers[1] = 45
45 > 12 → true
max = 45

i = 2:
-----------------
numbers[2] = 23
23 > 45 → false
max = 45（変更なし）

i = 3:
-----------------
numbers[3] = 67
67 > 45 → true
max = 67

i = 4:
-----------------
numbers[4] = 34
34 > 67 → false
max = 67（変更なし）

i = 5:
-----------------
numbers[5] = 89
89 > 67 → true
max = 89

i = 6:
-----------------
numbers[6] = 15
15 > 89 → false
max = 89（変更なし）

最終結果:
-----------------
max = 89
```

**ビジュアル図解**：
```
配列: [12, 45, 23, 67, 34, 89, 15]

maxの変化:
12 → 45 → 45 → 67 → 67 → 89 → 89
 ↑    ↑         ↑         ↑
初期  更新      更新      更新

最終: 89
```

## 実用的な例

### 例1：成績の評価

```javascript
let scores = [85, 92, 78, 95, 88];

for (let i = 0; i < scores.length; i++) {
  let grade;

  if (scores[i] >= 90) {
    grade = "A";
  } else if (scores[i] >= 80) {
    grade = "B";
  } else if (scores[i] >= 70) {
    grade = "C";
  } else {
    grade = "D";
  }

  console.log("テスト" + (i + 1) + ": " + scores[i] + "点 → " + grade);
}
```

**出力**：
```
テスト1: 85点 → B
テスト2: 92点 → A
テスト3: 78点 → C
テスト4: 95点 → A
テスト5: 88点 → B
```

**実行フロー**：
```
i = 0:
-----------------
scores[0] = 85
85 >= 90 → false
85 >= 80 → true
grade = "B"
出力: "テスト1: 85点 → B"

i = 1:
-----------------
scores[1] = 92
92 >= 90 → true
grade = "A"
出力: "テスト2: 92点 → A"

（以降同様）
```

### 例2：文字列の配列処理

```javascript
let names = ["太郎", "花子", "次郎"];

for (let i = 0; i < names.length; i++) {
  console.log(names[i] + "さん、こんにちは！");
}
```

**出力**：
```
太郎さん、こんにちは！
花子さん、こんにちは！
次郎さん、こんにちは！
```

**実行フロー**：
```
i = 0:
names[0] + "さん、こんにちは！"
→ "太郎" + "さん、こんにちは！"
→ "太郎さん、こんにちは！"

i = 1:
"花子" + "さん、こんにちは！"
→ "花子さん、こんにちは！"

i = 2:
"次郎" + "さん、こんにちは！"
→ "次郎さん、こんにちは！"
```

### 例3：配列の変換

```javascript
let celsius = [0, 10, 20, 30, 40];
let fahrenheit = [];

for (let i = 0; i < celsius.length; i++) {
  let f = celsius[i] * 9 / 5 + 32;
  fahrenheit.push(f);
}

console.log("摂氏: " + celsius);
console.log("華氏: " + fahrenheit);
```

**出力**：
```
摂氏: 0,10,20,30,40
華氏: 32,50,68,86,104
```

**実行フロー**：
```
初期状態:
celsius = [0, 10, 20, 30, 40]
fahrenheit = []

i = 0:
-----------------
f = celsius[0] * 9 / 5 + 32
  = 0 * 9 / 5 + 32
  = 0 + 32
  = 32
fahrenheit.push(32)
→ fahrenheit = [32]

i = 1:
-----------------
f = 10 * 9 / 5 + 32
  = 90 / 5 + 32
  = 18 + 32
  = 50
fahrenheit.push(50)
→ fahrenheit = [32, 50]

（以降同様）

最終結果:
-----------------
fahrenheit = [32, 50, 68, 86, 104]
```

## 注意点

### 1. インデックスの範囲

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 正しい: i < fruits.length
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// 間違い1: 最後の要素が表示されない
for (let i = 0; i < fruits.length - 1; i++) {
  console.log(fruits[i]);
}

// 間違い2: 範囲外アクセス
for (let i = 0; i <= fruits.length; i++) {
  console.log(fruits[i]);  // 最後にundefinedが表示される
}
```

**実行結果の比較**：
```
正しい:
りんご
みかん
ぶどう

間違い1:
りんご
みかん
（"ぶどう" が表示されない）

間違い2:
りんご
みかん
ぶどう
undefined
（範囲外アクセス）
```

### 2. ループ内での配列変更に注意

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 危険: ループ内で配列のサイズを変更すると予期しない動作になる
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
  fruits.push("バナナ");  // 無限ループになる可能性
}
```

**なぜ危険なのか**：
```
i = 0:
fruits = ["りんご", "みかん", "ぶどう"]
length = 3
条件: 0 < 3 → true
fruits.push("バナナ")
fruits = ["りんご", "みかん", "ぶどう", "バナナ"]
length = 4

i = 1:
length = 4
条件: 1 < 4 → true
fruits.push("バナナ")
fruits = ["りんご", "みかん", "ぶどう", "バナナ", "バナナ"]
length = 5

→ lengthが増え続けて無限ループ！
```

**推奨される方法**：
```javascript
// 安全: lengthを変数に保存
let length = fruits.length;
for (let i = 0; i < length; i++) {
  console.log(fruits[i]);
}
```

### 3. lengthの最適化

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 通常の書き方（推奨）
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// 最適化版（大きな配列で有効）
let length = fruits.length;
for (let i = 0; i < length; i++) {
  console.log(fruits[i]);
}
```

**最適化の効果**：
```
通常の書き方:
- 毎回 fruits.length を評価
- 小さな配列では問題なし

最適化版:
- 最初に1回だけ length を評価
- 大きな配列（1万個以上）で高速化
```

## 練習問題

### 課題：配列表示機

for文を使って配列のすべての要素を処理し、様々な形式で表示するプログラムを作成してください。

### 保存場所

`exercises/lesson-092/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. `for (let i = 0; i < array.length; i++)`の構文を理解する
2. すべての要素をシンプルに表示する
3. 番号付きリストを作成する

### 要件

- シンプル表示ボタン（id="showSimple"）
- 番号付き表示ボタン（id="showNumbered"）
- リスト表示ボタン（id="showList"）
- 結果表示エリア（id="result"）
- for文を使って全要素を処理する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-092
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

for文で配列を処理する際のポイントを確認しましょう。

**基本パターン**
```javascript
for (let i = 0; i < 配列名.length; i++) {
  // 配列名[i] で各要素にアクセス
}
```
- `i`は0から始まる
- `i < 配列名.length`で配列の長さ未満まで
- `i++`で次の要素に移動

**要素へのアクセス**
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits[i]);  // i番目の要素
```
- `i`はインデックス（位置）
- `fruits[i]`は値（要素）

**番号付き表示**
```javascript
for (let i = 0; i < todos.length; i++) {
  console.log((i + 1) + ". " + todos[i]);
}
```
- `i + 1`で1から始まる番号
- インデックス0が番号1になる

**DOM要素の作成**
```javascript
let p = document.createElement("p");
p.textContent = fruits[i];
result.appendChild(p);
```
- `createElement()`で要素を作成
- `textContent`で内容を設定
- `appendChild()`でDOMに追加

### 解答例

#### HTML（index.html）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 092</title>
</head>
<body>
    <h1>フルーツリストの表示</h1>
    <button id="showSimple">シンプル表示</button>
    <button id="showNumbered">番号付き表示</button>
    <button id="showList">リスト表示</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

#### JavaScript（script.js）

```javascript
let simpleButton = document.getElementById("showSimple");
let numberedButton = document.getElementById("showNumbered");
let listButton = document.getElementById("showList");
let result = document.getElementById("result");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// シンプル表示
simpleButton.addEventListener("click", function() {
  result.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = fruits[i];
    result.appendChild(p);
  }
});

// 番号付き表示
numberedButton.addEventListener("click", function() {
  result.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = (i + 1) + ". " + fruits[i];
    result.appendChild(p);
  }
});

// リスト表示
listButton.addEventListener("click", function() {
  result.innerHTML = "";

  let ul = document.createElement("ul");

  for (let i = 0; i < fruits.length; i++) {
    let li = document.createElement("li");
    li.textContent = fruits[i];
    ul.appendChild(li);
  }

  result.appendChild(ul);
});
```

### 解説

このコードでは、for文を使って配列の全要素を処理しています。

**シンプル表示**
```javascript
for (let i = 0; i < fruits.length; i++) {
  let p = document.createElement("p");
  p.textContent = fruits[i];
  result.appendChild(p);
}
```
- 各要素を`<p>`タグで表示
- `fruits[i]`で各要素にアクセス
- ループで全要素を処理

**番号付き表示**
```javascript
for (let i = 0; i < fruits.length; i++) {
  let p = document.createElement("p");
  p.textContent = (i + 1) + ". " + fruits[i];
  result.appendChild(p);
}
```
- `i + 1`で1から始まる番号を作成
- インデックス0が番号1になる
- 番号と要素を連結して表示

**リスト表示**
```javascript
let ul = document.createElement("ul");

for (let i = 0; i < fruits.length; i++) {
  let li = document.createElement("li");
  li.textContent = fruits[i];
  ul.appendChild(li);
}

result.appendChild(ul);
```
- 先に`<ul>`を作成
- for文で各`<li>`を作成して追加
- 最後に完成した`<ul>`を結果エリアに追加

## まとめ

お疲れ様でした。今回のレッスンでは、for文を使った配列処理について学びました。

### 今回学んだキーポイント

**配列の巡回**：
- `for (let i = 0; i < 配列名.length; i++)`のパターンで配列のすべての要素に順番にアクセスできます
- `i`は0から始まり、配列の長さ未満まで繰り返します
- `i++`で次の要素に移動します

**インデックスアクセス**：
- ループ変数`i`をインデックスとして使います
- `配列名[i]`で各要素を取得できます
- インデックスと値の両方が使えます

**全要素の表示**：
- for文を使って配列のすべての要素を順番に表示できます
- console.logやDOM操作で表示します
- 様々な形式（シンプル、番号付き、リスト）で表示可能

**番号付きリスト**：
- `i + 1`を使うことで、0から始まるインデックスを1から始まる番号に変換できます
- TODOリストや順序付きリストで使われます

**配列の処理**：
- for文を使って各要素を変更できます
- 条件に合う要素だけを処理できます
- 合計や平均などの集計ができます

for文と配列の組み合わせは、プログラミングで最も基本的で重要なパターンです。配列の全要素を処理する、条件に合う要素を探す、集計するなど、さまざまな処理で使われます。

## カリキュラムの要件チェック

このレッスンは、カリキュラムの以下の要件を満たしています。

✅ **for (let i = 0; i < array.length; i++)**：for文を使って配列を巡回する基本構文を学びました

✅ **全要素を表示**：for文を使って配列のすべての要素を順番に表示する方法を学びました

✅ **番号付きリスト**：`i + 1`を使って番号付きリストを作成する方法を学びました

✅ **成果物：配列表示機**：HTMLとJavaScriptを組み合わせて、配列を様々な形式で表示するプログラムを実装しました

## 次回予告

次のレッスンでは、for...of文について学びます。

- `for (let item of array)`の構文
- 通常のfor文との違い
- 使い分けの基準

より簡潔に配列を処理できる方法を習得しましょう。楽しみにしていてください。
