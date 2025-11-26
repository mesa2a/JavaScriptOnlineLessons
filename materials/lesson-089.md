---
title: "Lesson 089: 要素の追加"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン89：要素の追加

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、配列の要素を変更する方法を学びました。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 要素を変更
fruits[0] = "メロン";
console.log(fruits);  // ["メロン", "みかん", "ぶどう"]

// すべての要素を2倍
let numbers = [1, 2, 3];
for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2;
}
console.log(numbers);  // [2, 4, 6]
```

- **要素の変更**：`配列名[インデックス] = 新しい値`の形式で、特定の要素を書き換えられます
- **配列の可変性**：JavaScriptの配列は可変で、作成後も要素を変更できます
- **複数の要素を変更**：for文を使って、複数の要素を一度に変更できます
- **constと配列**：constで宣言した配列でも要素の変更は可能です

前回は配列の既存の要素を「変更」する方法を学びました。今回は、配列に新しい要素を「追加」する方法を学びます。

### よくある場面

実際のプログラミングでは、このような場面で配列に要素を追加します。

**場面1：TODOリストに項目を追加**
```
現在のTODO = ["買い物", "掃除"]

新しいタスクを追加したい
↓
TODO.push("洗濯")
結果 = ["買い物", "掃除", "洗濯"]
```

**場面2：ユーザーの入力を蓄積**
```
記録 = []

ユーザーが名前を入力
↓
記録.push("田中")
記録.push("佐藤")
記録.push("鈴木")
結果 = ["田中", "佐藤", "鈴木"]
```

**場面3：ログの記録**
```
ログ = ["アプリ起動"]

新しいイベントを記録したい
↓
ログ.push("ログイン成功")
ログ.push("データ読み込み")
結果 = ["アプリ起動", "ログイン成功", "データ読み込み"]
```

### 学習目標

今回のレッスンでは、**配列に新しい要素を追加する方法**を学びます。

このレッスンを終えると、以下のことができるようになります。

- `push()`メソッドで末尾に要素を追加できる（`fruits.push("いちご")`）
- 複数の要素を一度に追加できる（`fruits.push("バナナ", "メロン")`）
- 空の配列から始めて要素を蓄積できる
- 配列の拡張の仕組みを理解できる
- `push()`の戻り値を理解できる

## push()メソッド

**push()メソッド**は、配列の末尾に新しい要素を追加するメソッドです。

### 基本的な構文

```javascript
配列名.push(追加する要素);
```

**構文の詳細**：
```
fruits.push("いちご");
│      │     │
│      │     └─ 追加する要素
│      └─────── pushメソッド
└────────────── 配列名
```

### 1つの要素を追加

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]

fruits.push("いちご");
console.log(fruits);  // ["りんご", "みかん", "ぶどう", "いちご"]
```

**実行の流れ**：
```
ステップ1: 配列の確認
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
          [0]      [1]      [2]
length = 3

ステップ2: fruits.push("いちご") の実行
-----------------
配列の末尾に"いちご"を追加

追加前:
["りんご", "みかん", "ぶどう"]
                             ↓ここに追加

追加後:
["りんご", "みかん", "ぶどう", "いちご"]
  [0]      [1]      [2]      [3]

ステップ3: 配列の長さが増加
-----------------
length = 4

ステップ4: コンソール出力
-----------------
["りんご", "みかん", "ぶどう", "いちご"] が表示される
```

**変更前**：
```
インデックス:  0        1        2
値:         "りんご"  "みかん"  "ぶどう"
長さ: 3
```

**変更後**：
```
インデックス:  0        1        2        3
値:         "りんご"  "みかん"  "ぶどう"  "いちご"
                                        ↑新しく追加
長さ: 4
```

**図解**：
```
push()の動き
──────────────────────────

変更前:
┌─────────┬─────────┬─────────┐
│ "りんご" │ "みかん" │ "ぶどう" │
└─────────┴─────────┴─────────┘
    [0]       [1]       [2]

fruits.push("いちご") を実行
           ↓

変更後:
┌─────────┬─────────┬─────────┬─────────┐
│ "りんご" │ "みかん" │ "ぶどう" │ "いちご" │
└─────────┴─────────┴─────────┴─────────┘
    [0]       [1]       [2]       [3]
                                  ↑
                               末尾に追加
```

### 配列の長さが増える

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits.length);  // 3

fruits.push("いちご");
console.log(fruits.length);  // 4
```

**実行の流れ**：
```
初期状態:
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
length = 3

push実行後:
-----------------
fruits = ["りんご", "みかん", "ぶどう", "いちご"]
length = 4

長さの変化:
-----------------
3 → 4（1増えた）
```

`push()`を使うと、配列の長さが1増えます。

## 複数の要素を追加

`push()`メソッドは、複数の要素を一度に追加できます。

```javascript
let fruits = ["りんご", "みかん"];
console.log(fruits);  // ["りんご", "みかん"]

fruits.push("ぶどう", "いちご", "メロン");
console.log(fruits);  // ["りんご", "みかん", "ぶどう", "いちご", "メロン"]
```

**実行の流れ**：
```
ステップ1: 初期状態
-----------------
fruits = ["りんご", "みかん"]
          [0]      [1]
length = 2

ステップ2: fruits.push("ぶどう", "いちご", "メロン") の実行
-----------------
3つの要素を順番に末尾に追加

追加1: "ぶどう"を追加
["りんご", "みかん", "ぶどう"]
                      ↑

追加2: "いちご"を追加
["りんご", "みかん", "ぶどう", "いちご"]
                                ↑

追加3: "メロン"を追加
["りんご", "みかん", "ぶどう", "いちご", "メロン"]
                                          ↑

ステップ3: 配列の長さが増加
-----------------
length = 5（2 + 3 = 5）

ステップ4: コンソール出力
-----------------
["りんご", "みかん", "ぶどう", "いちご", "メロン"] が表示される
```

**構文**：
```javascript
配列名.push(要素1, 要素2, 要素3, ...);
```

**図解**：
```
複数要素の追加
──────────────────────────

初期: ["りんご", "みかん"]
       ↓ push("ぶどう", "いちご", "メロン")

追加1: ["りんご", "みかん", "ぶどう"]
                              ↑

追加2: ["りんご", "みかん", "ぶどう", "いちご"]
                                        ↑

追加3: ["りんご", "みかん", "ぶどう", "いちご", "メロン"]
                                                  ↑
```

### 長さの変化

```javascript
let fruits = ["りんご", "みかん"];
console.log(fruits.length);  // 2

fruits.push("ぶどう", "いちご", "メロン");
console.log(fruits.length);  // 5（3つ追加されたので2+3=5）
```

**実行の流れ**：
```
初期長さ: 2
追加する要素の数: 3
最終的な長さ: 2 + 3 = 5
```

## push()の戻り値

`push()`メソッドは、追加後の配列の長さを返します。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let newLength = fruits.push("いちご");

console.log(newLength);  // 4（新しい長さ）
console.log(fruits);     // ["りんご", "みかん", "ぶどう", "いちご"]
```

**実行の流れ**：
```
ステップ1: push実行前
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
length = 3

ステップ2: push("いちご") の実行
-----------------
"いちご"を末尾に追加
fruits = ["りんご", "みかん", "ぶどう", "いちご"]
length = 4

ステップ3: 戻り値の返却
-----------------
push()は新しい長さを返す
戻り値 = 4

ステップ4: 変数への代入
-----------------
newLength = 4

結果:
-----------------
newLength → 4
fruits → ["りんご", "みかん", "ぶどう", "いちご"]
```

### 戻り値の活用

```javascript
let numbers = [1, 2, 3];
let length = numbers.push(4, 5);

console.log("要素を追加しました。現在の長さ: " + length);  // 5
console.log(numbers);  // [1, 2, 3, 4, 5]
```

**実行の流れ**：
```
push(4, 5) の実行:
-----------------
初期: [1, 2, 3]（length = 3）
4を追加: [1, 2, 3, 4]
5を追加: [1, 2, 3, 4, 5]
最終: length = 5

戻り値:
-----------------
5 が返される

出力:
-----------------
"要素を追加しました。現在の長さ: 5"
```

通常は戻り値を使わないことが多いですが、配列の長さを知りたい場合に便利です。

## 空の配列に追加

空の配列から始めて、要素を追加していくこともできます。

```javascript
let fruits = [];  // 空の配列
console.log(fruits);  // []

fruits.push("りんご");
console.log(fruits);  // ["りんご"]

fruits.push("みかん");
console.log(fruits);  // ["りんご", "みかん"]

fruits.push("ぶどう");
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]
```

**実行の流れ**：
```
ステップ1: 空の配列を作成
-----------------
fruits = []
length = 0

ステップ2: 1つ目を追加
-----------------
fruits.push("りんご")
fruits = ["りんご"]
          [0]
length = 1

ステップ3: 2つ目を追加
-----------------
fruits.push("みかん")
fruits = ["りんご", "みかん"]
          [0]      [1]
length = 2

ステップ4: 3つ目を追加
-----------------
fruits.push("ぶどう")
fruits = ["りんご", "みかん", "ぶどう"]
          [0]      [1]      [2]
length = 3
```

**図解**：
```
空の配列から要素を追加
──────────────────────────

初期: []
      ↓ push("りんご")

①    ["りんご"]
      ↓ push("みかん")

②    ["りんご", "みかん"]
      ↓ push("ぶどう")

③    ["りんご", "みかん", "ぶどう"]
```

このパターンは、ユーザーの入力を配列に蓄積する際によく使われます。

## ループで複数追加

for文と組み合わせて、複数の要素を追加できます。

```javascript
let numbers = [];

// 1から5までの数字を追加
for (let i = 1; i <= 5; i++) {
  numbers.push(i);
}

console.log(numbers);  // [1, 2, 3, 4, 5]
```

**実行の流れ**：
```
初期化: i = 1
条件: i <= 5

初期状態:
-----------------
numbers = []

繰り返し1 (i = 1):
-----------------
i <= 5 → true
numbers.push(1)
numbers = [1]
i++ → i = 2

繰り返し2 (i = 2):
-----------------
i <= 5 → true
numbers.push(2)
numbers = [1, 2]
i++ → i = 3

繰り返し3 (i = 3):
-----------------
i <= 5 → true
numbers.push(3)
numbers = [1, 2, 3]
i++ → i = 4

繰り返し4 (i = 4):
-----------------
i <= 5 → true
numbers.push(4)
numbers = [1, 2, 3, 4]
i++ → i = 5

繰り返し5 (i = 5):
-----------------
i <= 5 → true
numbers.push(5)
numbers = [1, 2, 3, 4, 5]
i++ → i = 6

i = 6:
-----------------
6 <= 5 → false
ループ終了

最終結果:
-----------------
[1, 2, 3, 4, 5]
```

**詳しい説明**：
- 最初は空の配列`[]`
- ループ1回目：`numbers.push(1)` → `[1]`
- ループ2回目：`numbers.push(2)` → `[1, 2]`
- ループ3回目：`numbers.push(3)` → `[1, 2, 3]`
- ループ4回目：`numbers.push(4)` → `[1, 2, 3, 4]`
- ループ5回目：`numbers.push(5)` → `[1, 2, 3, 4, 5]`

**図解**：
```
ループでの追加
──────────────────────────

i=1: [] → [1]
i=2: [1] → [1, 2]
i=3: [1, 2] → [1, 2, 3]
i=4: [1, 2, 3] → [1, 2, 3, 4]
i=5: [1, 2, 3, 4] → [1, 2, 3, 4, 5]
```

## 条件付きで追加

条件に合う要素だけを追加することもできます。

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let evenNumbers = [];

// 偶数だけを新しい配列に追加
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    evenNumbers.push(numbers[i]);
  }
}

console.log(evenNumbers);  // [2, 4, 6, 8, 10]
```

**実行の流れ**：
```
初期状態:
-----------------
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evenNumbers = []

i = 0:
-----------------
numbers[0] = 1
1 % 2 === 0 → false
追加しない
evenNumbers = []

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
追加しない
evenNumbers = [2]

i = 3:
-----------------
numbers[3] = 4
4 % 2 === 0 → true
evenNumbers.push(4)
evenNumbers = [2, 4]

i = 4:
-----------------
numbers[4] = 5
5 % 2 === 0 → false
追加しない
evenNumbers = [2, 4]

i = 5:
-----------------
numbers[5] = 6
6 % 2 === 0 → true
evenNumbers.push(6)
evenNumbers = [2, 4, 6]

i = 6:
-----------------
numbers[6] = 7
7 % 2 === 0 → false
追加しない
evenNumbers = [2, 4, 6]

i = 7:
-----------------
numbers[7] = 8
8 % 2 === 0 → true
evenNumbers.push(8)
evenNumbers = [2, 4, 6, 8]

i = 8:
-----------------
numbers[8] = 9
9 % 2 === 0 → false
追加しない
evenNumbers = [2, 4, 6, 8]

i = 9:
-----------------
numbers[9] = 10
10 % 2 === 0 → true
evenNumbers.push(10)
evenNumbers = [2, 4, 6, 8, 10]

最終結果:
-----------------
[2, 4, 6, 8, 10]
```

**詳しい説明**：
- `numbers[i] % 2 === 0`：偶数かどうかをチェック
- 偶数なら`evenNumbers.push(numbers[i])`で追加
- 奇数なら何もしない

**図解**：
```
条件付き追加
──────────────────────────

元の配列: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

1 → 奇数 → スキップ
2 → 偶数 → [2]
3 → 奇数 → スキップ
4 → 偶数 → [2, 4]
5 → 奇数 → スキップ
6 → 偶数 → [2, 4, 6]
7 → 奇数 → スキップ
8 → 偶数 → [2, 4, 6, 8]
9 → 奇数 → スキップ
10 → 偶数 → [2, 4, 6, 8, 10]
```

## 配列の拡張

`push()`を使うと、配列は自動的に拡張されます。配列のサイズを事前に決める必要はありません。

```javascript
let numbers = [1, 2, 3];
console.log(numbers.length);  // 3

// 100個追加しても問題なし
for (let i = 4; i <= 100; i++) {
  numbers.push(i);
}

console.log(numbers.length);  // 100
```

**実行の流れ**：
```
初期状態:
-----------------
numbers = [1, 2, 3]
length = 3

ループで97個追加:
-----------------
i = 4: numbers.push(4) → length = 4
i = 5: numbers.push(5) → length = 5
...
i = 100: numbers.push(100) → length = 100

最終結果:
-----------------
numbers = [1, 2, 3, 4, 5, ..., 100]
length = 100
```

JavaScriptの配列は、必要に応じて自動的に拡張されるため、非常に柔軟です。

## unshift()メソッド（補足）

`push()`は末尾に追加しますが、**unshift()メソッド**を使うと先頭に追加できます。

```javascript
let fruits = ["みかん", "ぶどう"];
fruits.unshift("りんご");
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]
```

**実行の流れ**：
```
初期状態:
-----------------
fruits = ["みかん", "ぶどう"]
          [0]      [1]

unshift("りんご") の実行:
-----------------
すべての要素を1つ後ろにずらす:
["みかん", "ぶどう"] → [?, "みかん", "ぶどう"]
  [0]      [1]         [0]  [1]      [2]

先頭に"りんご"を挿入:
["りんご", "みかん", "ぶどう"]
  [0]      [1]      [2]

最終結果:
-----------------
["りんご", "みかん", "ぶどう"]
```

### push()とunshift()の違い

```javascript
let fruits = ["みかん"];

// push(): 末尾に追加
fruits.push("ぶどう");
console.log(fruits);  // ["みかん", "ぶどう"]

// unshift(): 先頭に追加
fruits.unshift("りんご");
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]
```

**実行の流れ**：
```
初期: ["みかん"]
      [0]

push("ぶどう"):
-----------------
末尾に追加
["みかん", "ぶどう"]
  [0]      [1]
           ↑追加

unshift("りんご"):
-----------------
先頭に追加（全要素を後ろにずらす）
["りんご", "みかん", "ぶどう"]
  [0]      [1]      [2]
  ↑追加
```

**図解**：
```
push()とunshift()の違い
──────────────────────────

push():
["みかん"] → ["みかん", "ぶどう"]
                        ↑末尾に追加

unshift():
["みかん", "ぶどう"] → ["りんご", "みかん", "ぶどう"]
                        ↑先頭に追加
```

**注意**：`unshift()`は全要素をずらす必要があるため、`push()`より処理が遅くなります。通常は`push()`を使うことが推奨されます。

## 実践例：リスト追加機

HTMLとJavaScriptを組み合わせて、配列に要素を追加してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>リスト追加機</title>
</head>
<body>
    <h1>フルーツリストに追加</h1>
    <p>現在のリスト: <span id="display"></span></p>
    <p>要素数: <span id="count"></span></p>

    <input type="text" id="newFruit" placeholder="フルーツの名前">
    <button id="add">追加</button>
    <button id="addMultiple">3つまとめて追加</button>

    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let addButton = document.getElementById("add");
let addMultipleButton = document.getElementById("addMultiple");
let display = document.getElementById("display");
let count = document.getElementById("count");
let result = document.getElementById("result");
let newFruitInput = document.getElementById("newFruit");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう"];

// 配列を表示
function showArray() {
  display.textContent = fruits.join(", ");
  count.textContent = fruits.length;
}

// 初期表示
showArray();

// 1つ追加
addButton.addEventListener("click", function() {
  let newFruit = newFruitInput.value;

  if (newFruit) {
    fruits.push(newFruit);
    showArray();
    result.textContent = "「" + newFruit + "」を追加しました";
    newFruitInput.value = "";  // 入力欄をクリア
  } else {
    result.textContent = "フルーツの名前を入力してください";
  }
});

// 複数追加
addMultipleButton.addEventListener("click", function() {
  fruits.push("バナナ", "メロン", "いちご");
  showArray();
  result.textContent = "バナナ、メロン、いちごを追加しました";
});
```

### コードの詳しい説明

**配列の表示関数**：
```javascript
function showArray() {
  display.textContent = fruits.join(", ");
  count.textContent = fruits.length;
}
```

**実行の流れ**：
```
fruits = ["りんご", "みかん", "ぶどう"]

fruits.join(", "):
-----------------
"りんご, みかん, ぶどう"

fruits.length:
-----------------
3

DOMへの反映:
-----------------
display.textContent = "りんご, みかん, ぶどう"
count.textContent = "3"
```

- `fruits.join(", ")`: 配列を文字列に変換
- `fruits.length`: 要素数を表示

**1つ追加**：
```javascript
let newFruit = newFruitInput.value;

if (newFruit) {
  fruits.push(newFruit);
  showArray();
  newFruitInput.value = "";
}
```

**実行の流れ**：
```
例: "バナナ" を入力した場合

ステップ1: 入力値の取得
-----------------
newFruitInput.value → "バナナ"
newFruit = "バナナ"

ステップ2: 空チェック
-----------------
"バナナ" → true（空でない）

ステップ3: pushで追加
-----------------
fruits.push("バナナ")

追加前: ["りんご", "みかん", "ぶどう"]
追加後: ["りんご", "みかん", "ぶどう", "バナナ"]

ステップ4: 画面更新
-----------------
showArray()を呼び出し
→ display: "りんご, みかん, ぶどう, バナナ"
→ count: "4"

ステップ5: メッセージ表示
-----------------
result.textContent = "「バナナ」を追加しました"

ステップ6: 入力欄をクリア
-----------------
newFruitInput.value = ""
```

- `newFruitInput.value`: 入力された値を取得
- `if (newFruit)`: 空でないかチェック
- `fruits.push(newFruit)`: 配列に追加
- `showArray()`: 更新された配列を表示
- `newFruitInput.value = ""`: 入力欄をクリア

**複数追加**：
```javascript
fruits.push("バナナ", "メロン", "いちご");
```

**実行の流れ**：
```
追加前:
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
length = 3

push("バナナ", "メロン", "いちご") の実行:
-----------------
3つの要素を順番に追加

追加1: "バナナ"
["りんご", "みかん", "ぶどう", "バナナ"]

追加2: "メロン"
["りんご", "みかん", "ぶどう", "バナナ", "メロン"]

追加3: "いちご"
["りんご", "みかん", "ぶどう", "バナナ", "メロン", "いちご"]

最終結果:
-----------------
fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン", "いちご"]
length = 6
```

- カンマで区切って複数の要素を一度に追加

## 実用的な例

### 例1：TODOリストの作成

```javascript
let todos = [];

todos.push("買い物に行く");
todos.push("掃除する");
todos.push("洗濯する");

console.log("TODOリスト:");
for (let i = 0; i < todos.length; i++) {
  console.log((i + 1) + ". " + todos[i]);
}
```

**実行の流れ**：
```
初期: todos = []

push("買い物に行く"):
todos = ["買い物に行く"]

push("掃除する"):
todos = ["買い物に行く", "掃除する"]

push("洗濯する"):
todos = ["買い物に行く", "掃除する", "洗濯する"]

出力:
-----------------
TODOリスト:
1. 買い物に行く
2. 掃除する
3. 洗濯する
```

**出力**：
```
TODOリスト:
1. 買い物に行く
2. 掃除する
3. 洗濯する
```

### 例2：得点の記録

```javascript
let scores = [];

// テストの点数を追加
scores.push(85);
scores.push(92);
scores.push(78);

console.log("テストの点数: " + scores.join(", "));
console.log("平均点: " + (scores[0] + scores[1] + scores[2]) / scores.length);
```

**実行の流れ**：
```
初期: scores = []

push(85): scores = [85]
push(92): scores = [85, 92]
push(78): scores = [85, 92, 78]

出力:
-----------------
テストの点数: 85, 92, 78
平均点: (85 + 92 + 78) / 3 = 255 / 3 = 85
```

### 例3：ログの蓄積

```javascript
let logs = [];

logs.push("アプリ起動");
logs.push("ユーザーログイン");
logs.push("データ読み込み");

console.log("ログ一覧:");
for (let i = 0; i < logs.length; i++) {
  console.log("[" + i + "] " + logs[i]);
}
```

**実行の流れ**：
```
初期: logs = []

push("アプリ起動"): logs = ["アプリ起動"]
push("ユーザーログイン"): logs = ["アプリ起動", "ユーザーログイン"]
push("データ読み込み"): logs = ["アプリ起動", "ユーザーログイン", "データ読み込み"]

出力:
-----------------
ログ一覧:
[0] アプリ起動
[1] ユーザーログイン
[2] データ読み込み
```

## 注意点

### 1. push()は元の配列を変更する

`push()`は元の配列自体を変更します（破壊的メソッド）。

```javascript
let fruits = ["りんご", "みかん"];
fruits.push("ぶどう");

console.log(fruits);  // ["りんご", "みかん", "ぶどう"]（元の配列が変更された）
```

**実行の流れ**：
```
初期状態:
-----------------
fruits → [メモリA: ["りんご", "みかん"]]

push("ぶどう") の実行:
-----------------
同じ配列に要素を追加
fruits → [メモリA: ["りんご", "みかん", "ぶどう"]]
         ↑同じメモリアドレス

新しい配列は作られない
元の配列が直接変更される
```

### 2. constで宣言した配列でも使える

```javascript
const fruits = ["りんご"];
fruits.push("みかん");  // OK
console.log(fruits);  // ["りんご", "みかん"]

// fruits = [];  // エラー！配列全体の再代入は不可
```

**実行の流れ**：
```
const fruits = ["りんご"]
fruits → [配列のメモリアドレス] ← 固定

fruits.push("みかん")
→ 成功！（配列の中身の変更はOK）
fruits → [同じメモリアドレス: ["りんご", "みかん"]]

// fruits = []
→ エラー！（配列への参照の変更はNG）
```

### 3. 空の値も追加できる

```javascript
let fruits = ["りんご"];
fruits.push("");  // 空文字列を追加
console.log(fruits);  // ["りんご", ""]
console.log(fruits.length);  // 2
```

**実行の流れ**：
```
fruits.push("") の実行:
-----------------
空文字列も有効な値として追加される

fruits = ["りんご", ""]
          [0]      [1]
length = 2
```

通常は空の値を追加しないように、事前にチェックします。

```javascript
let newFruit = "";
if (newFruit) {
  fruits.push(newFruit);  // 空なので追加されない
}
```

**実行の流れ**：
```
newFruit = ""

if ("") の評価:
-----------------
空文字列はfalseとして評価される
→ ifブロックは実行されない
→ pushされない
```

## 練習問題

### 課題：リスト追加機

配列に要素を追加するプログラムを作成してください。

### 保存場所

`exercises/lesson-089/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. `push()`メソッドで要素を追加する方法を理解する
2. ユーザー入力を配列に追加する
3. 複数の要素を一度に追加する機能を実装する

### 要件

- 配列の表示（id="display"）
- 要素数の表示（id="count"）
- 入力欄（id="newFruit"）
- 追加ボタン（id="add"）
- 複数追加ボタン（id="addMultiple"）
- 結果表示エリア（id="result"）

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-089
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

要素を追加する際のポイントを確認しましょう。

**push()メソッド**
- `配列名.push(要素)`で末尾に追加します
- 複数の場合は`配列名.push(要素1, 要素2, ...)`
- 配列の長さは自動的に増えます

例：
```javascript
let fruits = ["りんご"];
fruits.push("みかん");
console.log(fruits);  // ["りんご", "みかん"]

fruits.push("ぶどう", "いちご");
console.log(fruits);  // ["りんご", "みかん", "ぶどう", "いちご"]
```

**入力値のチェック**
- `if (入力値)`で空でないかチェックします
- 空の場合はエラーメッセージを表示します

例：
```javascript
let input = newFruitInput.value;
if (input) {
  fruits.push(input);
} else {
  result.textContent = "入力してください";
}
```

**配列の表示**
- `join(", ")`で文字列に変換します
- `length`プロパティで要素数を表示します

例：
```javascript
display.textContent = fruits.join(", ");
count.textContent = fruits.length;
```

**入力欄のクリア**
- 追加後に入力欄を空にします

例：
```javascript
newFruitInput.value = "";
```

### 解答例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 089</title>
</head>
<body>
    <h1>フルーツリストに追加</h1>
    <p>現在のリスト: <span id="display"></span></p>
    <p>要素数: <span id="count"></span></p>

    <input type="text" id="newFruit" placeholder="フルーツの名前">
    <button id="add">追加</button>
    <button id="addMultiple">3つまとめて追加</button>

    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let addButton = document.getElementById("add");
let addMultipleButton = document.getElementById("addMultiple");
let display = document.getElementById("display");
let count = document.getElementById("count");
let result = document.getElementById("result");
let newFruitInput = document.getElementById("newFruit");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう"];

// 配列を表示
function showArray() {
  display.textContent = fruits.join(", ");
  count.textContent = fruits.length;
}

// 初期表示
showArray();

// 1つ追加
addButton.addEventListener("click", function() {
  let newFruit = newFruitInput.value;

  if (newFruit) {
    fruits.push(newFruit);
    showArray();
    result.textContent = "「" + newFruit + "」を追加しました";
    newFruitInput.value = "";  // 入力欄をクリア
  } else {
    result.textContent = "フルーツの名前を入力してください";
  }
});

// 複数追加
addMultipleButton.addEventListener("click", function() {
  fruits.push("バナナ", "メロン", "いちご");
  showArray();
  result.textContent = "バナナ、メロン、いちごを追加しました";
});
```

### 解答例の詳しい説明

このコードでは、`push()`メソッドを使って配列に要素を追加しています。

**ステップ1：配列の初期化**
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
```

**実行の流れ**：
```
fruits = ["りんご", "みかん", "ぶどう"]
          [0]      [1]      [2]
length = 3
```

- 初期値として3つの要素を持つ配列を作成

**ステップ2：配列の表示**
```javascript
function showArray() {
  display.textContent = fruits.join(", ");
  count.textContent = fruits.length;
}
```

**実行の流れ**：
```
fruits = ["りんご", "みかん", "ぶどう"]

fruits.join(", "):
→ "りんご, みかん, ぶどう"

fruits.length:
→ 3

画面に表示:
-----------------
現在のリスト: りんご, みかん, ぶどう
要素数: 3
```

- `join(", ")`で配列を文字列に変換
- `length`で要素数を表示
- 配列が更新されるたびに呼び出す

**ステップ3：1つの要素を追加**
```javascript
let newFruit = newFruitInput.value;

if (newFruit) {
  fruits.push(newFruit);
  showArray();
  newFruitInput.value = "";
}
```

**実行の流れ**：
```
例: "バナナ" を入力

入力値の取得:
-----------------
newFruit = "バナナ"

空チェック:
-----------------
"バナナ" → true

pushで追加:
-----------------
fruits.push("バナナ")
["りんご", "みかん", "ぶどう"] → ["りんご", "みかん", "ぶどう", "バナナ"]

画面更新:
-----------------
showArray()を呼び出し
→ "りんご, みかん, ぶどう, バナナ"
→ "4"

入力欄クリア:
-----------------
newFruitInput.value = ""
```

- 入力値を取得
- 空でないかチェック
- `push()`で配列に追加
- 表示を更新
- 入力欄をクリア

**ステップ4：複数の要素を追加**
```javascript
fruits.push("バナナ", "メロン", "いちご");
```

**実行の流れ**：
```
push("バナナ", "メロン", "いちご") の実行:
-----------------
3つの要素を順番に追加

追加前:
["りんご", "みかん", "ぶどう"]

追加後:
["りんご", "みかん", "ぶどう", "バナナ", "メロン", "いちご"]

length: 3 → 6
```

- カンマで区切って3つの要素を一度に追加
- 配列の長さは3増える

**動作の流れ**：
1. ユーザーがフルーツ名を入力
2. 「追加」ボタンをクリック
3. 入力値が空でないかチェック
4. `push()`で配列に追加
5. 更新された配列を表示
6. 入力欄をクリア

## まとめ

お疲れ様でした。今回のレッスンでは、配列に要素を追加する方法を学びました。

**今回学んだキーポイント**

1. **push()メソッド**：`配列名.push(要素)`の形式で、配列の末尾に新しい要素を追加できます
   ```javascript
   let fruits = ["りんご"];
   fruits.push("みかん");  // ["りんご", "みかん"]
   ```

2. **複数追加**：`push(要素1, 要素2, ...)`のように、複数の要素を一度に追加できます
   ```javascript
   fruits.push("ぶどう", "いちご");
   // ["りんご", "みかん", "ぶどう", "いちご"]
   ```

3. **配列の拡張**：`push()`を使うと配列の長さが自動的に増え、必要に応じて配列が拡張されます
   ```javascript
   let arr = [1, 2, 3];  // length = 3
   arr.push(4);          // length = 4
   ```

4. **戻り値**：`push()`は追加後の配列の長さを返します
   ```javascript
   let length = fruits.push("メロン");
   console.log(length);  // 5
   ```

5. **空の配列から開始**：空の配列から始めて要素を蓄積できます
   ```javascript
   let todos = [];
   todos.push("買い物");
   todos.push("掃除");
   ```

6. **unshift()との違い**：`push()`は末尾に、`unshift()`は先頭に追加します
   ```javascript
   arr.push("末尾");      // 末尾に追加
   arr.unshift("先頭");   // 先頭に追加
   ```

`push()`メソッドは、配列操作の中で最もよく使われるメソッドの1つです。ユーザーの入力を蓄積したり、データを動的に収集する際に非常に便利です。

次のレッスンでは、配列から要素を削除する方法を学びます。`pop()`と`shift()`メソッドを使って、末尾や先頭の要素を削除する方法を習得しましょう。

---

## カリキュラムの要件チェック

このレッスンは、以下のカリキュラムの要件を満たしています。

```
レッスン89：要素の追加（30分）
✅ fruits.push("いちご")
✅ 末尾に追加
✅ 複数追加
【知識】push()メソッド、配列の拡張
✅ 成果物：リスト追加機
```

**確認項目**：
- ✅ `fruits.push("いちご")` で要素を追加
- ✅ 末尾に要素を追加する仕組みの説明
- ✅ 複数の要素を一度に追加する方法（`push(要素1, 要素2, ...)`）
- ✅ push()メソッドの詳細な説明
- ✅ 配列の拡張の仕組みの説明
- ✅ 成果物：リスト追加機の実装

すべての要件を満たしています。
