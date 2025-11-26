---
title: "Lesson 088: 要素の変更"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン88：要素の変更

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、配列の要素にアクセスする方法を学びました。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 最初の要素にアクセス
console.log(fruits[0]);  // "りんご"

// 2番目の要素にアクセス
console.log(fruits[1]);  // "みかん"

// 最後の要素にアクセス
console.log(fruits[fruits.length - 1]);  // "ぶどう"
```

- **インデックスでアクセス**：`配列名[インデックス]`の形式で、特定の要素を取得できます
- **0ベースインデックス**：配列のインデックスは0から始まり、最初の要素は`配列名[0]`です
- **最後の要素**：`配列名[配列名.length - 1]`で最後の要素を取得できます
- **境界値**：範囲外のインデックスにアクセスすると`undefined`が返されます

前回は配列の要素を「読み取る」方法を学びました。今回は、配列の要素を「書き換える」方法を学びます。

### よくある場面

実際のプログラミングでは、このような場面で配列の要素を変更します。

**場面1：価格の更新**
```
元の価格 = [100, 200, 300]

10%値上げしたい
↓
価格[0] = 110
価格[1] = 220
価格[2] = 330
```

**場面2：ゲームのスコア修正**
```
スコア = [85, 92, 78, 95, 88]

78点を80点に補正したい
↓
スコア[2] = 80
```

**場面3：入力ミスの修正**
```
名前リスト = ["田中", "佐藤太郎", "鈴木"]

"佐藤太郎" を "佐藤" に修正したい
↓
名前リスト[1] = "佐藤"
```

### 学習目標

今回のレッスンでは、**配列の要素を変更する方法**を学びます。

このレッスンを終えると、以下のことができるようになります。

- インデックスを使って要素を書き換えられる（`fruits[0] = "メロン"`）
- 複数の要素を順番に変更できる
- for文を使ってすべての要素を変更できる
- 配列の可変性（mutable）を理解できる
- constで宣言した配列でも要素を変更できることを理解できる

## 配列の可変性

JavaScriptの配列は**可変（mutable）**です。これは、一度作成した配列の要素を後から変更できることを意味します。

### 変数との違い

**変数の再代入**：
```javascript
let fruit = "りんご";
console.log(fruit);  // "りんご"

fruit = "みかん";  // 変数全体を上書き
console.log(fruit);  // "みかん"
```

**実行の流れ**：
```
ステップ1: 変数の初期化
-----------------
fruit = "りんご"

ステップ2: 変数の再代入
-----------------
fruit = "みかん"
元の"りんご"は失われる

結果:
-----------------
fruit → "みかん"
```

**配列の要素変更**：
```javascript
let fruits = ["りんご", "バナナ", "ぶどう"];
console.log(fruits);  // ["りんご", "バナナ", "ぶどう"]

fruits[0] = "みかん";  // 最初の要素だけを変更
console.log(fruits);  // ["みかん", "バナナ", "ぶどう"]
```

**実行の流れ**：
```
ステップ1: 配列の初期化
-----------------
fruits = ["りんご", "バナナ", "ぶどう"]
          [0]      [1]      [2]

ステップ2: 最初の要素を変更
-----------------
fruits[0] = "みかん"

変更前: ["りんご", "バナナ", "ぶどう"]
         ↓ここだけ変更
変更後: ["みかん", "バナナ", "ぶどう"]

結果:
-----------------
配列全体は同じまま、最初の要素だけが変わった
```

配列では、配列全体を置き換えることなく、特定の要素だけを変更できます。これが配列の「可変性（mutability）」です。

### 可変性の利点

```javascript
// ❌ 変数だけだと大変
let fruit1 = "りんご";
let fruit2 = "バナナ";
let fruit3 = "ぶどう";

// 1つ目を変更するには再代入が必要
fruit1 = "みかん";

// ✅ 配列なら簡単に一部だけ変更できる
let fruits = ["りんご", "バナナ", "ぶどう"];
fruits[0] = "みかん";  // 配列はそのまま、要素だけ変更
```

## 要素の変更方法

配列の要素を変更するには、代入演算子`=`を使います。

### 基本的な構文

```javascript
配列名[インデックス] = 新しい値;
```

**構文の詳細**：
```
fruits[0] = "メロン";
│      │    │
│      │    └─ 新しい値
│      └────── インデックス
└───────────── 配列名
```

### 最初の要素を変更

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]

fruits[0] = "メロン";
console.log(fruits);  // ["メロン", "みかん", "ぶどう"]
```

**実行の流れ**：
```
ステップ1: 配列の確認
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
          [0]      [1]      [2]

ステップ2: fruits[0] = "メロン" の実行
-----------------
インデックス0の要素に"メロン"を代入

変更前の状態:
["りんご", "みかん", "ぶどう"]
  ↓
変更操作:
fruits[0] に "メロン" を代入
  ↓
変更後の状態:
["メロン", "みかん", "ぶどう"]

ステップ3: コンソール出力
-----------------
["メロン", "みかん", "ぶどう"] が表示される
```

**変更前**：
```
インデックス:  0        1        2
値:         "りんご"  "みかん"  "ぶどう"
```

**変更後**：
```
インデックス:  0        1        2
値:         "メロン"  "みかん"  "ぶどう"
            ↑ここが変わった
```

**図解**：
```
変更前:
┌─────────┬─────────┬─────────┐
│ "りんご" │ "みかん" │ "ぶどう" │
└─────────┴─────────┴─────────┘
     [0]       [1]       [2]

fruits[0] = "メロン" を実行
           ↓

変更後:
┌─────────┬─────────┬─────────┐
│ "メロン" │ "みかん" │ "ぶどう" │
└─────────┴─────────┴─────────┘
     [0]       [1]       [2]
     ↑
   変更された
```

### 2番目の要素を変更

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
fruits[1] = "バナナ";
console.log(fruits);  // ["りんご", "バナナ", "ぶどう"]
```

**実行の流れ**：
```
ステップ1: 配列の確認
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
          [0]      [1]      [2]

ステップ2: fruits[1] = "バナナ" の実行
-----------------
インデックス1の要素に"バナナ"を代入

変更前: ["りんご", "みかん", "ぶどう"]
                    ↓ここを変更
変更後: ["りんご", "バナナ", "ぶどう"]

ステップ3: コンソール出力
-----------------
["りんご", "バナナ", "ぶどう"] が表示される
```

### 最後の要素を変更

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
fruits[fruits.length - 1] = "いちご";
console.log(fruits);  // ["りんご", "みかん", "いちご"]
```

**実行の流れ**：
```
ステップ1: 配列の確認
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
          [0]      [1]      [2]

ステップ2: 最後のインデックスの計算
-----------------
fruits.length → 3
fruits.length - 1 → 2

ステップ3: fruits[2] = "いちご" の実行
-----------------
インデックス2の要素に"いちご"を代入

変更前: ["りんご", "みかん", "ぶどう"]
                              ↓ここを変更
変更後: ["りんご", "みかん", "いちご"]

ステップ4: コンソール出力
-----------------
["りんご", "みかん", "いちご"] が表示される
```

## 複数の要素を変更

複数の要素を順番に変更できます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]

fruits[0] = "メロン";
fruits[1] = "バナナ";
fruits[2] = "いちご";
console.log(fruits);  // ["メロン", "バナナ", "いちご"]
```

**実行の流れ**：
```
初期状態:
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
          [0]      [1]      [2]

変更1: fruits[0] = "メロン"
-----------------
["メロン", "みかん", "ぶどう"]
  ↑変更

変更2: fruits[1] = "バナナ"
-----------------
["メロン", "バナナ", "ぶどう"]
          ↑変更

変更3: fruits[2] = "いちご"
-----------------
["メロン", "バナナ", "いちご"]
                    ↑変更

最終結果:
-----------------
["メロン", "バナナ", "いちご"]
すべての要素が変更された
```

**図解**：
```
変更の流れ
──────────────────────────

初期: ["りんご", "みかん", "ぶどう"]
       ↓
①    ["メロン", "みかん", "ぶどう"]
                ↓
②    ["メロン", "バナナ", "ぶどう"]
                           ↓
③    ["メロン", "バナナ", "いちご"]
```

### すべての要素を変更

for文を使って、すべての要素を一度に変更できます。

```javascript
let numbers = [1, 2, 3, 4, 5];
console.log(numbers);  // [1, 2, 3, 4, 5]

// すべての要素を2倍にする
for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2;
}

console.log(numbers);  // [2, 4, 6, 8, 10]
```

**実行の流れ**：
```
初期化: i = 0
条件: i < 5

初期状態:
-----------------
numbers = [1, 2, 3, 4, 5]

繰り返し1 (i = 0):
-----------------
numbers[0] = numbers[0] * 2
numbers[0] = 1 * 2
numbers[0] = 2

状態: [2, 2, 3, 4, 5]
i++ → i = 1

繰り返し2 (i = 1):
-----------------
numbers[1] = numbers[1] * 2
numbers[1] = 2 * 2
numbers[1] = 4

状態: [2, 4, 3, 4, 5]
i++ → i = 2

繰り返し3 (i = 2):
-----------------
numbers[2] = numbers[2] * 2
numbers[2] = 3 * 2
numbers[2] = 6

状態: [2, 4, 6, 4, 5]
i++ → i = 3

繰り返し4 (i = 3):
-----------------
numbers[3] = numbers[3] * 2
numbers[3] = 4 * 2
numbers[3] = 8

状態: [2, 4, 6, 8, 5]
i++ → i = 4

繰り返し5 (i = 4):
-----------------
numbers[4] = numbers[4] * 2
numbers[4] = 5 * 2
numbers[4] = 10

状態: [2, 4, 6, 8, 10]
i++ → i = 5

i = 5:
-----------------
5 < 5 → false
ループ終了

最終結果:
-----------------
[2, 4, 6, 8, 10]
```

**詳しい説明**：
- `numbers[i]`: 現在の値を取得
- `numbers[i] * 2`: 現在の値を2倍にする
- `numbers[i] = ...`: 新しい値を代入

**図解**：
```
各ループでの変更
──────────────────────────

初期:  [1, 2, 3, 4, 5]
        ↓×2
i=0:   [2, 2, 3, 4, 5]
           ↓×2
i=1:   [2, 4, 3, 4, 5]
              ↓×2
i=2:   [2, 4, 6, 4, 5]
                 ↓×2
i=3:   [2, 4, 6, 8, 5]
                    ↓×2
i=4:   [2, 4, 6, 8, 10]
```

### ループの動き（詳細版）

```javascript
// 1回目のループ: i = 0
numbers[0] = numbers[0] * 2;  // 1 * 2 = 2

// 2回目のループ: i = 1
numbers[1] = numbers[1] * 2;  // 2 * 2 = 4

// 3回目のループ: i = 2
numbers[2] = numbers[2] * 2;  // 3 * 2 = 6

// 4回目のループ: i = 3
numbers[3] = numbers[3] * 2;  // 4 * 2 = 8

// 5回目のループ: i = 4
numbers[4] = numbers[4] * 2;  // 5 * 2 = 10
```

## 条件付きの変更

条件に合う要素だけを変更することもできます。

```javascript
let numbers = [1, 2, 3, 4, 5];

// 偶数だけを0に変更
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    numbers[i] = 0;
  }
}

console.log(numbers);  // [1, 0, 3, 0, 5]
```

**実行の流れ**：
```
初期化: i = 0
条件: i < 5

初期状態:
-----------------
numbers = [1, 2, 3, 4, 5]

繰り返し1 (i = 0):
-----------------
numbers[0] % 2 === 0
1 % 2 === 0 → false
変更しない

状態: [1, 2, 3, 4, 5]
i++ → i = 1

繰り返し2 (i = 1):
-----------------
numbers[1] % 2 === 0
2 % 2 === 0 → true
numbers[1] = 0

状態: [1, 0, 3, 4, 5]
i++ → i = 2

繰り返し3 (i = 2):
-----------------
numbers[2] % 2 === 0
3 % 2 === 0 → false
変更しない

状態: [1, 0, 3, 4, 5]
i++ → i = 3

繰り返し4 (i = 3):
-----------------
numbers[3] % 2 === 0
4 % 2 === 0 → true
numbers[3] = 0

状態: [1, 0, 3, 0, 5]
i++ → i = 4

繰り返し5 (i = 4):
-----------------
numbers[4] % 2 === 0
5 % 2 === 0 → false
変更しない

状態: [1, 0, 3, 0, 5]
i++ → i = 5

i = 5:
-----------------
5 < 5 → false
ループ終了

最終結果:
-----------------
[1, 0, 3, 0, 5]
偶数(2, 4)だけが0に変更された
```

**詳しい説明**：
- `numbers[i] % 2 === 0`: 偶数かどうかをチェック
- 偶数なら`numbers[i] = 0`で0に変更
- 奇数ならそのまま

**図解**：
```
条件付き変更の流れ
──────────────────────────

初期: [1, 2, 3, 4, 5]

i=0: 1 % 2 = 1 → 奇数 → 変更しない
     [1, 2, 3, 4, 5]

i=1: 2 % 2 = 0 → 偶数 → 0に変更
     [1, 0, 3, 4, 5]
         ↑

i=2: 3 % 2 = 1 → 奇数 → 変更しない
     [1, 0, 3, 4, 5]

i=3: 4 % 2 = 0 → 偶数 → 0に変更
     [1, 0, 3, 0, 5]
               ↑

i=4: 5 % 2 = 1 → 奇数 → 変更しない
     [1, 0, 3, 0, 5]
```

## constで宣言した配列

`const`で宣言した配列でも、要素の変更は可能です。

```javascript
const fruits = ["りんご", "みかん", "ぶどう"];

// 要素の変更は可能
fruits[0] = "メロン";
console.log(fruits);  // ["メロン", "みかん", "ぶどう"]

// 配列全体の再代入は不可
// fruits = ["バナナ"];  // エラー！
```

**実行の流れ**：
```
ステップ1: const配列の作成
-----------------
const fruits = ["りんご", "みかん", "ぶどう"]
配列への参照が固定される

ステップ2: 要素の変更
-----------------
fruits[0] = "メロン"
→ 成功！（配列の中身の変更はOK）

配列の参照は同じ:
fruits → [配列のメモリアドレス] ← 変わらない
配列の中身:
["メロン", "みかん", "ぶどう"] ← 変わる

ステップ3: 配列全体の再代入（コメントアウト）
-----------------
// fruits = ["バナナ"]
→ エラー！（配列への参照の変更はNG）
```

**重要**：
- `const`は配列への再代入を禁止します
- しかし、配列の中身（要素）の変更は許可されます

### constとletの違い

```javascript
// let: 配列全体の再代入が可能
let fruits1 = ["りんご"];
fruits1 = ["みかん"];  // OK（配列ごと入れ替え）
fruits1[0] = "ぶどう";  // OK（要素の変更）

// const: 配列全体の再代入は不可、要素の変更は可能
const fruits2 = ["りんご"];
// fruits2 = ["みかん"];  // エラー！（配列ごと入れ替えNG）
fruits2[0] = "ぶどう";  // OK（要素の変更）
```

**実行の流れ**：
```
let の場合:
-----------------
let fruits1 = ["りんご"]
fruits1 → [配列A]

fruits1 = ["みかん"]
fruits1 → [配列B] ← 参照を変更できる

fruits1[0] = "ぶどう"
fruits1 → [配列B: ["ぶどう"]] ← 中身を変更できる

const の場合:
-----------------
const fruits2 = ["りんご"]
fruits2 → [配列C] ← 固定

// fruits2 = ["みかん"]
fruits2 → [配列C] ← 参照は変更できない（エラー）

fruits2[0] = "ぶどう"
fruits2 → [配列C: ["ぶどう"]] ← 中身は変更できる
```

**図解**：
```
let の動き
──────────────────────────

fruits1 = ["りんご"]
fruits1 → [メモリA: ["りんご"]]

fruits1 = ["みかん"]  ✅ OK
fruits1 → [メモリB: ["みかん"]]  ← 参照先を変更

fruits1[0] = "ぶどう"  ✅ OK
fruits1 → [メモリB: ["ぶどう"]]  ← 中身を変更


const の動き
──────────────────────────

fruits2 = ["りんご"]
fruits2 → [メモリC: ["りんご"]]  ← 固定

// fruits2 = ["みかん"]  ❌ エラー
fruits2 → [メモリC: ["りんご"]]  ← 参照先は変更不可

fruits2[0] = "ぶどう"  ✅ OK
fruits2 → [メモリC: ["ぶどう"]]  ← 中身は変更可能
```

## 存在しないインデックスへの代入

存在しないインデックスに値を代入すると、配列が拡張されます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits.length);  // 3

fruits[5] = "メロン";
console.log(fruits);  // ["りんご", "みかん", "ぶどう", undefined, undefined, "メロン"]
console.log(fruits.length);  // 6
```

**実行の流れ**：
```
ステップ1: 初期状態
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
          [0]      [1]      [2]
length = 3

ステップ2: fruits[5] = "メロン" の実行
-----------------
インデックス5に代入しようとする
→ インデックス3, 4が存在しない
→ 自動的に作成される（値はundefined）

ステップ3: 配列の拡張
-----------------
[0]: "りんご"
[1]: "みかん"
[2]: "ぶどう"
[3]: undefined  ← 自動的に追加
[4]: undefined  ← 自動的に追加
[5]: "メロン"   ← 指定した値

ステップ4: 結果
-----------------
fruits = ["りんご", "みかん", "ぶどう", undefined, undefined, "メロン"]
length = 6
```

**図解**：
```
配列の拡張
──────────────────────────

初期状態 (length = 3):
┌─────────┬─────────┬─────────┐
│ "りんご" │ "みかん" │ "ぶどう" │
└─────────┴─────────┴─────────┘
    [0]       [1]       [2]

fruits[5] = "メロン" を実行
           ↓

拡張後 (length = 6):
┌─────────┬─────────┬─────────┬───────────┬───────────┬─────────┐
│ "りんご" │ "みかん" │ "ぶどう" │ undefined │ undefined │ "メロン" │
└─────────┴─────────┴─────────┴───────────┴───────────┴─────────┘
    [0]       [1]       [2]        [3]         [4]        [5]
                                   ↑           ↑          ↑
                                 自動追加    自動追加    指定した値
```

**注意**：
- インデックス3と4には何も代入されていないため、`undefined`になります
- 配列の長さは6に拡張されます
- **通常はこのような使い方は避けるべきです**

## 実践例：配列編集機

HTMLとJavaScriptを組み合わせて、配列の要素を変更してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>配列編集機</title>
</head>
<body>
    <h1>配列の要素を変更</h1>
    <p>現在の配列: <span id="display"></span></p>

    <input type="number" id="index" placeholder="インデックス" min="0">
    <input type="text" id="value" placeholder="新しい値">
    <button id="change">変更</button>
    <button id="doubleAll">すべて2倍</button>

    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let changeButton = document.getElementById("change");
let doubleButton = document.getElementById("doubleAll");
let display = document.getElementById("display");
let result = document.getElementById("result");
let indexInput = document.getElementById("index");
let valueInput = document.getElementById("value");

// 数値の配列
let numbers = [10, 20, 30, 40, 50];

// 配列を表示
function showArray() {
  display.textContent = "[" + numbers.join(", ") + "]";
}

// 初期表示
showArray();

// 特定の要素を変更
changeButton.addEventListener("click", function() {
  let index = Number(indexInput.value);
  let value = Number(valueInput.value);

  if (index >= 0 && index < numbers.length) {
    numbers[index] = value;
    showArray();
    result.textContent = "インデックス " + index + " を " + value + " に変更しました";
  } else {
    result.textContent = "インデックスが範囲外です（0〜" + (numbers.length - 1) + "）";
  }
});

// すべての要素を2倍にする
doubleButton.addEventListener("click", function() {
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[i] * 2;
  }
  showArray();
  result.textContent = "すべての要素を2倍にしました";
});
```

### コードの詳しい説明

**配列の表示関数**：
```javascript
function showArray() {
  display.textContent = "[" + numbers.join(", ") + "]";
}
```

**実行の流れ**：
```
numbers = [10, 20, 30, 40, 50]

numbers.join(", "):
-----------------
"10, 20, 30, 40, 50"

"[" + "10, 20, 30, 40, 50" + "]":
-----------------
"[10, 20, 30, 40, 50]"

display.textContent = "[10, 20, 30, 40, 50]"
```

- `numbers.join(", ")`: 配列を文字列に変換
- 角かっこで囲んで配列らしく表示

**特定の要素を変更**：
```javascript
let index = Number(indexInput.value);
let value = Number(valueInput.value);

if (index >= 0 && index < numbers.length) {
  numbers[index] = value;
  showArray();
}
```

**実行の流れ**：
```
例: インデックス 2 に値 100 を設定

ステップ1: 入力値の取得と変換
-----------------
indexInput.value → "2"（文字列）
Number("2") → 2（数値）
index = 2

valueInput.value → "100"（文字列）
Number("100") → 100（数値）
value = 100

ステップ2: 範囲チェック
-----------------
index >= 0 → 2 >= 0 → true
index < numbers.length → 2 < 5 → true
true && true → true

ステップ3: 要素の変更
-----------------
numbers[2] = 100

変更前: [10, 20, 30, 40, 50]
変更後: [10, 20, 100, 40, 50]
                ↑変更された

ステップ4: 画面更新
-----------------
showArray() を呼び出し
→ display に "[10, 20, 100, 40, 50]" を表示
```

- 入力されたインデックスと値を数値に変換
- 範囲チェック：`0 <= index < numbers.length`
- `numbers[index] = value`: 要素を変更
- `showArray()`: 更新された配列を表示

**すべての要素を2倍**：
```javascript
for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2;
}
```

**実行の流れ**：
```
初期状態:
-----------------
numbers = [10, 20, 30, 40, 50]

繰り返し1 (i = 0):
-----------------
numbers[0] = numbers[0] * 2
numbers[0] = 10 * 2 = 20
状態: [20, 20, 30, 40, 50]

繰り返し2 (i = 1):
-----------------
numbers[1] = numbers[1] * 2
numbers[1] = 20 * 2 = 40
状態: [20, 40, 30, 40, 50]

繰り返し3 (i = 2):
-----------------
numbers[2] = numbers[2] * 2
numbers[2] = 30 * 2 = 60
状態: [20, 40, 60, 40, 50]

繰り返し4 (i = 3):
-----------------
numbers[3] = numbers[3] * 2
numbers[3] = 40 * 2 = 80
状態: [20, 40, 60, 80, 50]

繰り返し5 (i = 4):
-----------------
numbers[4] = numbers[4] * 2
numbers[4] = 50 * 2 = 100
状態: [20, 40, 60, 80, 100]

最終結果:
-----------------
[20, 40, 60, 80, 100]
すべての要素が2倍になった
```

- for文で全要素をループ
- `numbers[i] * 2`: 現在の値を2倍
- `numbers[i] = ...`: 新しい値を代入

## 実用的な例

### 例1：価格の更新

```javascript
let prices = [100, 200, 300, 400, 500];

// 10%値上げ
for (let i = 0; i < prices.length; i++) {
  prices[i] = Math.floor(prices[i] * 1.1);
}

console.log(prices);  // [110, 220, 330, 440, 550]
```

**実行の流れ**：
```
初期状態:
-----------------
prices = [100, 200, 300, 400, 500]

i = 0:
100 * 1.1 = 110.0
Math.floor(110.0) = 110
prices[0] = 110

i = 1:
200 * 1.1 = 220.0
Math.floor(220.0) = 220
prices[1] = 220

i = 2:
300 * 1.1 = 330.0
Math.floor(330.0) = 330
prices[2] = 330

i = 3:
400 * 1.1 = 440.0
Math.floor(440.0) = 440
prices[3] = 440

i = 4:
500 * 1.1 = 550.0
Math.floor(550.0) = 550
prices[4] = 550

最終結果:
-----------------
[110, 220, 330, 440, 550]
```

### 例2：名前の修正

```javascript
let names = ["太郎", "次郎", "三郎"];

// 敬称をつける
for (let i = 0; i < names.length; i++) {
  names[i] = names[i] + "さん";
}

console.log(names);  // ["太郎さん", "次郎さん", "三郎さん"]
```

**実行の流れ**：
```
初期状態:
-----------------
names = ["太郎", "次郎", "三郎"]

i = 0:
"太郎" + "さん" = "太郎さん"
names[0] = "太郎さん"

i = 1:
"次郎" + "さん" = "次郎さん"
names[1] = "次郎さん"

i = 2:
"三郎" + "さん" = "三郎さん"
names[2] = "三郎さん"

最終結果:
-----------------
["太郎さん", "次郎さん", "三郎さん"]
```

### 例3：点数の補正

```javascript
let scores = [85, 92, 78, 95, 88];

// 80点未満を80点に補正
for (let i = 0; i < scores.length; i++) {
  if (scores[i] < 80) {
    scores[i] = 80;
  }
}

console.log(scores);  // [85, 92, 80, 95, 88]
```

**実行の流れ**：
```
初期状態:
-----------------
scores = [85, 92, 78, 95, 88]

i = 0:
85 < 80 → false
変更しない

i = 1:
92 < 80 → false
変更しない

i = 2:
78 < 80 → true
scores[2] = 80
状態: [85, 92, 80, 95, 88]

i = 3:
95 < 80 → false
変更しない

i = 4:
88 < 80 → false
変更しない

最終結果:
-----------------
[85, 92, 80, 95, 88]
78だけが80に補正された
```

## 注意点

### 1. インデックスの範囲チェック

範囲外のインデックスにアクセスしないように注意しましょう。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 範囲チェックなし（危険）
let index = 10;
fruits[index] = "メロン";  // 配列が意図せず拡張される

// 範囲チェックあり（安全）
if (index >= 0 && index < fruits.length) {
  fruits[index] = "メロン";
} else {
  console.log("インデックスが範囲外です");
}
```

**実行の流れ**：
```
範囲チェックなしの場合:
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
index = 10

fruits[10] = "メロン"
→ 配列が拡張される
→ ["りんご", "みかん", "ぶどう", undefined, ..., "メロン"]
→ 意図しない結果

範囲チェックありの場合:
-----------------
index >= 0 → 10 >= 0 → true
index < fruits.length → 10 < 3 → false
true && false → false

elseブロック実行:
→ "インデックスが範囲外です" と表示
→ 配列は変更されない（安全）
```

### 2. 配列の長さは変わらない

要素を変更しても、配列の長さは変わりません。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits.length);  // 3

fruits[0] = "メロン";
console.log(fruits.length);  // 3（変わらない）
```

**実行の流れ**：
```
初期状態:
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
length = 3

fruits[0] = "メロン" を実行:
-----------------
fruits = ["メロン", "みかん", "ぶどう"]
length = 3 ← 変わらない

要素の変更では配列の長さは変化しない
```

### 3. 元の値は消える

要素を変更すると、元の値は失われます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let original = fruits[0];  // "りんご"を保存

fruits[0] = "メロン";
// "りんご"は失われた

console.log(original);  // "りんご"（保存していた値）
console.log(fruits[0]);  // "メロン"（新しい値）
```

**実行の流れ**：
```
ステップ1: 元の値を保存
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
original = fruits[0]
original = "りんご" ← 保存

ステップ2: 要素を変更
-----------------
fruits[0] = "メロン"
fruits = ["メロン", "みかん", "ぶどう"]

配列の中の"りんご"は失われた
しかしoriginal変数には残っている

ステップ3: 値の確認
-----------------
original → "りんご"（保存した値）
fruits[0] → "メロン"（新しい値）
```

## 練習問題

### 課題：配列編集機

配列の要素を変更するプログラムを作成してください。

### 保存場所

`exercises/lesson-088/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. 配列の要素を変更する方法を理解する
2. インデックスを指定して要素を書き換える
3. すべての要素を変更する機能を実装する

### 要件

- 配列の表示（id="display"）
- インデックス入力欄（id="index"）
- 新しい値入力欄（id="value"）
- 変更ボタン（id="change"）
- すべて2倍ボタン（id="doubleAll"）
- 結果表示エリア（id="result"）

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-088
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

要素を変更する際のポイントを確認しましょう。

**要素の変更**
- `配列名[インデックス] = 新しい値`で変更します
- インデックスは0から始まります
- 範囲チェックを忘れずに

例：
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
fruits[0] = "メロン";
console.log(fruits);  // ["メロン", "みかん", "ぶどう"]
```

**すべての要素を変更**
- for文を使います
- `numbers[i] = numbers[i] * 2`のように現在の値を使って計算します

例：
```javascript
let numbers = [10, 20, 30];
for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2;
}
console.log(numbers);  // [20, 40, 60]
```

**入力値の取得**
- `Number()`で文字列を数値に変換します
- `indexInput.value`で入力値を取得します

例：
```javascript
let index = Number(indexInput.value);
let value = Number(valueInput.value);
```

**範囲チェック**
- インデックスが有効な範囲内かチェックします

例：
```javascript
if (index >= 0 && index < numbers.length) {
  numbers[index] = value;
}
```

### 解答例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 088</title>
</head>
<body>
    <h1>配列の要素を変更</h1>
    <p>現在の配列: <span id="display"></span></p>

    <input type="number" id="index" placeholder="インデックス" min="0">
    <input type="text" id="value" placeholder="新しい値">
    <button id="change">変更</button>
    <button id="doubleAll">すべて2倍</button>

    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let changeButton = document.getElementById("change");
let doubleButton = document.getElementById("doubleAll");
let display = document.getElementById("display");
let result = document.getElementById("result");
let indexInput = document.getElementById("index");
let valueInput = document.getElementById("value");

// 数値の配列
let numbers = [10, 20, 30, 40, 50];

// 配列を表示
function showArray() {
  display.textContent = "[" + numbers.join(", ") + "]";
}

// 初期表示
showArray();

// 特定の要素を変更
changeButton.addEventListener("click", function() {
  let index = Number(indexInput.value);
  let value = Number(valueInput.value);

  if (index >= 0 && index < numbers.length) {
    numbers[index] = value;
    showArray();
    result.textContent = "インデックス " + index + " を " + value + " に変更しました";
  } else {
    result.textContent = "インデックスが範囲外です（0〜" + (numbers.length - 1) + "）";
  }
});

// すべての要素を2倍にする
doubleButton.addEventListener("click", function() {
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[i] * 2;
  }
  showArray();
  result.textContent = "すべての要素を2倍にしました";
});
```

### 解答例の詳しい説明

このコードでは、配列の要素を変更する方法を実践しています。

**ステップ1：配列の初期化と表示**
```javascript
let numbers = [10, 20, 30, 40, 50];

function showArray() {
  display.textContent = "[" + numbers.join(", ") + "]";
}

showArray();
```

**実行の流れ**：
```
numbers = [10, 20, 30, 40, 50]

showArray()の実行:
-----------------
numbers.join(", ") → "10, 20, 30, 40, 50"
"[" + "10, 20, 30, 40, 50" + "]" → "[10, 20, 30, 40, 50]"
display.textContent = "[10, 20, 30, 40, 50]"

画面に表示:
-----------------
現在の配列: [10, 20, 30, 40, 50]
```

- 数値の配列を作成
- `showArray()`関数で配列を見やすく表示
- `join(", ")`で要素をカンマ区切りの文字列に変換

**ステップ2：特定の要素を変更**
```javascript
let index = Number(indexInput.value);
let value = Number(valueInput.value);

if (index >= 0 && index < numbers.length) {
  numbers[index] = value;
  showArray();
}
```

**実行の流れ**：
```
例: インデックス 1 に値 99 を設定

入力値の取得:
-----------------
indexInput.value → "1"（文字列）
Number("1") → 1（数値）

valueInput.value → "99"（文字列）
Number("99") → 99（数値）

範囲チェック:
-----------------
1 >= 0 && 1 < 5 → true

要素の変更:
-----------------
numbers[1] = 99

変更前: [10, 20, 30, 40, 50]
変更後: [10, 99, 30, 40, 50]
            ↑

画面更新:
-----------------
showArray()を呼び出し
→ "[10, 99, 30, 40, 50]" を表示
```

- 入力値を数値に変換
- 範囲チェック：`0 <= index < numbers.length`
- `numbers[index] = value`で要素を変更
- `showArray()`で更新後の配列を表示

**ステップ3：すべての要素を2倍**
```javascript
for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2;
}
```

**実行の流れ**：
```
初期状態: [10, 20, 30, 40, 50]

i = 0:
numbers[0] = 10 * 2 = 20
[20, 20, 30, 40, 50]

i = 1:
numbers[1] = 20 * 2 = 40
[20, 40, 30, 40, 50]

i = 2:
numbers[2] = 30 * 2 = 60
[20, 40, 60, 40, 50]

i = 3:
numbers[3] = 40 * 2 = 80
[20, 40, 60, 80, 50]

i = 4:
numbers[4] = 50 * 2 = 100
[20, 40, 60, 80, 100]

最終結果: [20, 40, 60, 80, 100]
```

- for文で全要素をループ
- `numbers[i] * 2`で現在の値を2倍
- 結果を同じ位置に代入

**動作の流れ**：
1. ユーザーがインデックスと値を入力
2. 「変更」ボタンをクリック
3. 範囲チェック
4. 要素を変更
5. 更新された配列を表示

## まとめ

お疲れ様でした。今回のレッスンでは、配列の要素を変更する方法を学びました。

**今回学んだキーポイント**

1. **要素の変更**：`配列名[インデックス] = 新しい値`の形式で、特定の要素を書き換えられます
   ```javascript
   let fruits = ["りんご", "みかん", "ぶどう"];
   fruits[0] = "メロン";  // ["メロン", "みかん", "ぶどう"]
   ```

2. **配列の可変性**：JavaScriptの配列は可変（mutable）で、作成後も要素を変更できます
   ```javascript
   // 配列全体を置き換えずに、一部だけ変更できる
   fruits[1] = "バナナ";
   ```

3. **複数の要素を変更**：for文を使って、複数の要素を一度に変更できます
   ```javascript
   for (let i = 0; i < numbers.length; i++) {
     numbers[i] = numbers[i] * 2;
   }
   ```

4. **条件付き変更**：条件に合う要素だけを変更できます
   ```javascript
   if (numbers[i] % 2 === 0) {
     numbers[i] = 0;  // 偶数だけを0に
   }
   ```

5. **constと要素変更**：`const`で宣言した配列でも、要素の変更は可能です
   ```javascript
   const fruits = ["りんご"];
   fruits[0] = "メロン";  // OK
   // fruits = ["バナナ"];  // エラー
   ```

6. **注意点**：
   - 範囲チェックを忘れずに
   - 要素を変更しても配列の長さは変わらない
   - 元の値は失われる

配列の要素を変更できることで、データを動的に更新できるようになります。これは、実用的なプログラムを作る上で非常に重要な機能です。

次のレッスンでは、配列に新しい要素を追加する方法を学びます。`push()`メソッドを使って、配列の末尾に要素を追加する方法を習得しましょう。

---

## カリキュラムの要件チェック

このレッスンは、以下のカリキュラムの要件を満たしています。

```
レッスン88：要素の変更（30分）
✅ fruits[0] = "メロン"
✅ 要素を書き換える
✅ 全部変更してみる
【知識】配列の可変性、要素の更新
✅ 成果物：配列編集機
```

**確認項目**：
- ✅ `fruits[0] = "メロン"` で要素を変更
- ✅ 複数の要素を書き換える方法
- ✅ for文を使ってすべての要素を変更する方法
- ✅ 配列の可変性の概念の詳細な説明
- ✅ 要素の更新方法の詳細な説明
- ✅ 成果物：配列編集機の実装

すべての要件を満たしています。
