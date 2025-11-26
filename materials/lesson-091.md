---
title: "Lesson 091: 配列の長さ"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン91：配列の長さ

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、配列から要素を削除する方法を学びました。

**pop()メソッド**：配列の末尾の要素を削除し、その値を返します。
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
fruits.pop();  // "ぶどう"を削除
console.log(fruits);  // ["りんご", "みかん"]
```

**shift()メソッド**：配列の先頭の要素を削除し、その値を返します。
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
fruits.shift();  // "りんご"を削除
console.log(fruits);  // ["みかん", "ぶどう"]
```

**戻り値の活用**：削除した要素は戻り値として返されるため、変数に保存して活用できます。

### よくある場面

実際のプログラミングでは、こんな場面で配列の長さを使います。

**場面1：ループの制御**
```
配列のすべての要素を処理したい
→ for (let i = 0; i < array.length; i++)
→ lengthで配列の要素数を知る必要がある
```

**場面2：空の配列チェック**
```
配列に要素があるかどうか確認したい
→ if (array.length === 0) { ... }
→ lengthが0なら空、0以外なら要素がある
```

**場面3：要素数の表示**
```
ユーザーに配列の要素数を表示したい
→ "現在 " + items.length + " 個のアイテムがあります"
→ lengthで要素数を取得
```

### 学習目標

このレッスンでは、配列の長さについて詳しく学びます。

- `length`プロパティの使い方を理解する
- 要素数をカウントする方法を学ぶ
- 空配列の判定方法を習得する
- lengthを使ったループ制御を理解する

配列の長さを正しく扱えるようになると、より柔軟な配列操作ができるようになります。

## lengthプロパティとは

**lengthプロパティ**は、配列の要素数を返すプロパティです。これまでのレッスンでも何度か使ってきましたが、今回はより詳しく学びます。

### 基本的な構文

```javascript
配列名.length
```

**重要な注意点**：
- `length`はプロパティであり、メソッドではありません
- 括弧`()`は**つけません**
- `fruits.length`が正しい（`fruits.length()`は間違い）

### 実行の流れを詳しく見てみよう

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits.length);  // 3
```

#### 実行フロー

```
1. 配列の状態
   fruits = ["りんご", "みかん", "ぶどう"]
   インデックス: 0=りんご, 1=みかん, 2=ぶどう
   要素数: 3

2. fruits.length を実行
   ↓
   内部の動作:
   - 配列の要素数を数える
   - インデックス0から始まる要素の個数を返す
   - 結果: 3

3. console.log(fruits.length) を実行
   ↓
   出力: 3
```

### ビジュアル図解

```
配列: ["りんご", "みかん", "ぶどう"]
       [0]      [1]      [2]
        ↓        ↓        ↓
        1個      2個      3個
                          ↓
                    fruits.length = 3
```

**重要な関係**：
```
配列のインデックス: 0, 1, 2, ... (0から始まる)
配列の長さ:        1, 2, 3, ... (1から始まる)

最後のインデックス = length - 1
```

## lengthは常に最新

配列に要素を追加したり削除したりすると、`length`は自動的に更新されます。

```javascript
let fruits = ["りんご"];
console.log(fruits.length);  // 1

fruits.push("みかん");
console.log(fruits.length);  // 2

fruits.push("ぶどう");
console.log(fruits.length);  // 3

fruits.pop();
console.log(fruits.length);  // 2
```

### 実行フロー

```
初期状態:
-----------------
fruits = ["りんご"]
length = 1

push("みかん") 実行:
-----------------
fruits = ["りんご", "みかん"]
length = 2（自動的に更新）

push("ぶどう") 実行:
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
length = 3（自動的に更新）

pop() 実行:
-----------------
"ぶどう"が削除される
fruits = ["りんご", "みかん"]
length = 2（自動的に更新）
```

**重要なポイント**：
- `length`は手動で更新する必要がない
- JavaScriptが自動的に要素数を追跡してくれる
- 常に正確な要素数を示す

## 要素数のカウント

`length`プロパティを使って、配列の要素数を確認できます。

### 基本的なカウント

```javascript
let numbers = [1, 2, 3, 4, 5];
console.log("要素数: " + numbers.length);  // "要素数: 5"
```

#### 実行フロー

```
1. 配列の状態
   numbers = [1, 2, 3, 4, 5]
   要素数: 5

2. numbers.length を評価
   ↓
   結果: 5

3. "要素数: " + 5 を計算
   ↓
   文字列の連結:
   "要素数: " + "5" = "要素数: 5"

4. console.log(...) を実行
   ↓
   出力: "要素数: 5"
```

### 動的なカウント

```javascript
let todos = [];
console.log("タスク数: " + todos.length);  // "タスク数: 0"

todos.push("買い物");
todos.push("掃除");
todos.push("洗濯");
console.log("タスク数: " + todos.length);  // "タスク数: 3"
```

#### 実行フロー

```
初期状態:
-----------------
todos = []
length = 0

1回目のconsole.log:
-----------------
"タスク数: " + 0 = "タスク数: 0"
出力: "タスク数: 0"

push("買い物"):
-----------------
todos = ["買い物"]
length = 1

push("掃除"):
-----------------
todos = ["買い物", "掃除"]
length = 2

push("洗濯"):
-----------------
todos = ["買い物", "掃除", "洗濯"]
length = 3

2回目のconsole.log:
-----------------
"タスク数: " + 3 = "タスク数: 3"
出力: "タスク数: 3"
```

### 複数の配列の比較

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let vegetables = ["にんじん", "たまねぎ"];

if (fruits.length > vegetables.length) {
  console.log("フルーツの方が多いです");
} else {
  console.log("野菜の方が多いです");
}
```

#### 実行フロー

```
1. 各配列の長さを取得
   fruits.length = 3
   vegetables.length = 2

2. 条件式を評価
   fruits.length > vegetables.length
   → 3 > 2
   → true

3. if ブロックを実行
   ↓
   console.log("フルーツの方が多いです")

4. 出力
   ↓
   "フルーツの方が多いです"
```

**ビジュアル図解**：
```
fruits:     ["りんご", "みかん", "ぶどう"]
             ↓       ↓       ↓
            length = 3

vegetables: ["にんじん", "たまねぎ"]
             ↓         ↓
            length = 2

比較: 3 > 2 → true
結果: フルーツの方が多い
```

## 空配列の判定

`length`プロパティを使って、配列が空かどうかを判定できます。

### 基本的な判定方法1：厳密な比較

```javascript
let fruits = [];

if (fruits.length === 0) {
  console.log("配列は空です");
} else {
  console.log("配列には " + fruits.length + " 個の要素があります");
}
```

#### 実行フロー

```
1. 配列の状態
   fruits = []
   length = 0

2. 条件式を評価
   fruits.length === 0
   → 0 === 0
   → true

3. if ブロックを実行
   ↓
   console.log("配列は空です")

4. 出力
   ↓
   "配列は空です"
```

**要素がある場合**：
```
配列の状態:
fruits = ["りんご", "みかん"]
length = 2

条件式を評価:
2 === 0 → false

else ブロックを実行:
"配列には " + 2 + " 個の要素があります"
→ "配列には 2 個の要素があります"
```

### 基本的な判定方法2：簡潔な書き方

```javascript
let fruits = [];

if (fruits.length) {
  console.log("配列には要素があります");
} else {
  console.log("配列は空です");
}
```

#### 実行フロー

```
1. 配列の状態
   fruits = []
   length = 0

2. 条件式を評価
   fruits.length → 0
   ↓
   真偽値への変換:
   0 → false（0はfalseとして評価される）

3. else ブロックを実行
   ↓
   console.log("配列は空です")

4. 出力
   ↓
   "配列は空です"
```

**要素がある場合**：
```
配列の状態:
fruits = ["りんご"]
length = 1

条件式を評価:
fruits.length → 1
1 → true（0以外はtrueとして評価される）

if ブロックを実行:
"配列には要素があります"
```

**真偽値への変換ルール**：
```
0          → false
1以上の数値 → true

例:
if (0)  → false
if (1)  → true
if (5)  → true
if (10) → true
```

### 実用例：削除前のチェック

```javascript
let fruits = ["りんご", "みかん"];

if (fruits.length > 0) {
  let removed = fruits.pop();
  console.log(removed + " を削除しました");
} else {
  console.log("配列は既に空です");
}
```

#### 実行フロー

```
1. 配列の状態
   fruits = ["りんご", "みかん"]
   length = 2

2. 条件式を評価
   fruits.length > 0
   → 2 > 0
   → true

3. if ブロックを実行
   ↓
   fruits.pop() を実行
   - "みかん"が削除される
   - removed = "みかん"
   - fruits = ["りんご"]

4. メッセージを作成
   "みかん" + " を削除しました"
   → "みかん を削除しました"

5. 出力
   ↓
   "みかん を削除しました"
```

**配列が空の場合**：
```
配列の状態:
fruits = []
length = 0

条件式を評価:
0 > 0 → false

else ブロックを実行:
"配列は既に空です"
```

**なぜこのチェックが重要か**：
```
空の配列でpop()を実行すると:
- エラーにはならない
- undefinedが返される
- ユーザーに正しいフィードバックができない

チェックすることで:
- 空配列での無駄な操作を防げる
- わかりやすいメッセージを表示できる
- プログラムの安全性が向上する
```

## lengthとインデックスの関係

配列の長さと最後のインデックスには、重要な関係があります。

### 最後のインデックスを取得する

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

console.log("長さ: " + fruits.length);  // 3
console.log("最後のインデックス: " + (fruits.length - 1));  // 2
console.log("最後の要素: " + fruits[fruits.length - 1]);  // "ぶどう"
```

#### 実行フロー

```
1. 配列の状態
   fruits = ["りんご", "みかん", "ぶどう"]
            [0]      [1]      [2]
   length = 3

2. fruits.length を実行
   ↓
   結果: 3
   出力: "長さ: 3"

3. fruits.length - 1 を計算
   ↓
   3 - 1 = 2
   出力: "最後のインデックス: 2"

4. fruits[fruits.length - 1] を実行
   ↓
   ステップ1: fruits.length を評価 → 3
   ステップ2: 3 - 1 を計算 → 2
   ステップ3: fruits[2] を取得 → "ぶどう"
   出力: "最後の要素: ぶどう"
```

### ビジュアル図解

```
配列: ["りんご", "みかん", "ぶどう"]
       [0]      [1]      [2]
        ↑                 ↑
      最初              最後

インデックス:  0    1    2    (0から始まる)
長さ:         ←─────3─────→  (要素の総数)

重要な関係:
-----------------
最後のインデックス = length - 1
                  = 3 - 1
                  = 2
```

### なぜ -1 が必要か

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// インデックスは0, 1, 2
// 長さは3
// 最後のインデックスは2（3 - 1）

console.log(fruits[0]);  // "りんご"
console.log(fruits[1]);  // "みかん"
console.log(fruits[2]);  // "ぶどう"
console.log(fruits[3]);  // undefined（存在しない）
```

#### 実行フロー

```
配列の構造:
-----------------
インデックス:  0        1        2        3
値:         "りんご"  "みかん"  "ぶどう"  (存在しない)
             ↑                   ↑
           最初                最後

fruits[0]:
→ インデックス0にアクセス
→ "りんご"

fruits[1]:
→ インデックス1にアクセス
→ "みかん"

fruits[2]:
→ インデックス2にアクセス
→ "ぶどう"

fruits[3]:
→ インデックス3にアクセス
→ 存在しない！
→ undefined
```

**重要な公式**：
```
配列の要素数: length
有効なインデックス: 0 から (length - 1) まで

例: length = 3 の場合
-----------------
有効: 0, 1, 2
無効: 3以上

最後のインデックス = length - 1 = 3 - 1 = 2
```

**なぜこうなるのか**：
```
インデックスは0から始まるため:
-----------------
1個目 → インデックス 0
2個目 → インデックス 1
3個目 → インデックス 2

3個の要素があっても、最後は2
→ length(3) - 1 = 2
```

## lengthの活用例

### 例1：平均値の計算

```javascript
let scores = [85, 92, 78, 95, 88];
let total = 0;

for (let i = 0; i < scores.length; i++) {
  total = total + scores[i];
}

let average = total / scores.length;
console.log("平均点: " + average);  // "平均点: 87.6"
```

#### 実行フロー

```
初期状態:
-----------------
scores = [85, 92, 78, 95, 88]
total = 0
scores.length = 5

ループ i = 0:
-----------------
条件: 0 < 5 → true
total = 0 + scores[0] = 0 + 85 = 85

ループ i = 1:
-----------------
条件: 1 < 5 → true
total = 85 + scores[1] = 85 + 92 = 177

ループ i = 2:
-----------------
条件: 2 < 5 → true
total = 177 + scores[2] = 177 + 78 = 255

ループ i = 3:
-----------------
条件: 3 < 5 → true
total = 255 + scores[3] = 255 + 95 = 350

ループ i = 4:
-----------------
条件: 4 < 5 → true
total = 350 + scores[4] = 350 + 88 = 438

ループ i = 5:
-----------------
条件: 5 < 5 → false
ループ終了

平均値の計算:
-----------------
average = total / scores.length
        = 438 / 5
        = 87.6

出力:
-----------------
"平均点: 87.6"
```

**この例のポイント**：
- `scores.length`でループの回数を制御
- `scores.length`で割り算して平均を求める
- 配列の要素数が変わっても自動的に対応

### 例2：条件による処理分岐

```javascript
let items = ["りんご", "みかん", "ぶどう"];

if (items.length < 5) {
  console.log("在庫が少なくなっています");
} else if (items.length >= 10) {
  console.log("在庫は十分です");
} else {
  console.log("在庫は適正です");
}
```

#### 実行フロー

```
1. 配列の状態
   items = ["りんご", "みかん", "ぶどう"]
   length = 3

2. 1つ目の条件を評価
   items.length < 5
   → 3 < 5
   → true

3. 1つ目のif ブロックを実行
   ↓
   console.log("在庫が少なくなっています")

4. 出力
   ↓
   "在庫が少なくなっています"

5. 以降のelse if, elseはスキップ
```

**様々な場合の実行結果**：
```
length = 2:
→ 2 < 5 → true
→ "在庫が少なくなっています"

length = 7:
→ 7 < 5 → false
→ 7 >= 10 → false
→ else ブロック実行
→ "在庫は適正です"

length = 12:
→ 12 < 5 → false
→ 12 >= 10 → true
→ "在庫は十分です"
```

### 例3：ループの制御

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// 最初の3つだけを表示
let limit = Math.min(3, fruits.length);

for (let i = 0; i < limit; i++) {
  console.log(fruits[i]);
}
```

#### 実行フロー

```
1. 配列の状態
   fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
   length = 5

2. limit を計算
   Math.min(3, fruits.length)
   → Math.min(3, 5)
   → 3（小さい方を選択）

3. ループ i = 0:
   条件: 0 < 3 → true
   console.log(fruits[0])
   → "りんご"

4. ループ i = 1:
   条件: 1 < 3 → true
   console.log(fruits[1])
   → "みかん"

5. ループ i = 2:
   条件: 2 < 3 → true
   console.log(fruits[2])
   → "ぶどう"

6. ループ i = 3:
   条件: 3 < 3 → false
   ループ終了
```

**出力**：
```
りんご
みかん
ぶどう
```

**この例のポイント**：
- `Math.min()`で最大表示数を制限
- 配列の要素数が少ない場合も安全に処理
- lengthを使って配列の境界を超えないようにする

## lengthを変更する

`length`プロパティは書き込み可能で、値を変更できます。

### 配列を短くする

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
console.log(fruits);  // ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]

fruits.length = 3;
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]
```

#### 実行フロー

```
1. 初期状態
   fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
            [0]      [1]      [2]      [3]     [4]
   length = 5

2. fruits.length = 3 を実行
   ↓
   内部の動作:
   - 長さを5から3に変更
   - インデックス3以降の要素を削除
   - "バナナ"（インデックス3）削除
   - "メロン"（インデックス4）削除

3. 実行後の状態
   fruits = ["りんご", "みかん", "ぶどう"]
            [0]      [1]      [2]
   length = 3
```

**ビジュアル図解**：
```
変更前: ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
         [0]      [1]      [2]      [3]     [4]
         ←──────────length = 5──────────→

fruits.length = 3 を実行
         ↓

変更後: ["りんご", "みかん", "ぶどう"]
         [0]      [1]      [2]
         ←──length = 3──→

削除された: "バナナ", "メロン"（復元不可）
```

**重要な注意**：
- 削除された要素は永久に失われます
- 元に戻すことはできません
- 慎重に使用してください

### 配列を空にする

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]

fruits.length = 0;
console.log(fruits);  // []
```

#### 実行フロー

```
1. 初期状態
   fruits = ["りんご", "みかん", "ぶどう"]
   length = 3

2. fruits.length = 0 を実行
   ↓
   内部の動作:
   - 長さを0に設定
   - すべての要素を削除

3. 実行後の状態
   fruits = []
   length = 0
```

**他の方法との比較**：
```javascript
// 方法1: lengthを0にする
fruits.length = 0;

// 方法2: 新しい空配列を代入
fruits = [];

// 方法3: ループでpop()
while (fruits.length > 0) {
  fruits.pop();
}
```

**推奨される方法**：
```
配列を空にする最も効率的な方法:
fruits.length = 0;

利点:
- 高速
- シンプル
- 元の配列を直接変更
```

### 配列を拡張する（推奨されません）

```javascript
let fruits = ["りんご", "みかん"];
console.log(fruits);  // ["りんご", "みかん"]

fruits.length = 5;
console.log(fruits);  // ["りんご", "みかん", undefined, undefined, undefined]
```

#### 実行フロー

```
1. 初期状態
   fruits = ["りんご", "みかん"]
            [0]      [1]
   length = 2

2. fruits.length = 5 を実行
   ↓
   内部の動作:
   - 長さを2から5に拡張
   - 新しい要素を追加
   - 値が指定されていないので undefined で埋める

3. 実行後の状態
   fruits = ["りんご", "みかん", undefined, undefined, undefined]
            [0]      [1]      [2]        [3]        [4]
   length = 5
```

**なぜ推奨されないのか**：
```
問題点:
1. undefined で埋められる（意図しない値）
2. 疎な配列になる（メモリの無駄）
3. バグの原因になりやすい

推奨される方法:
push() を使って明示的に要素を追加する
fruits.push("ぶどう");
fruits.push("バナナ");
fruits.push("メロン");
```

## 実践例：配列カウンター

HTMLとJavaScriptを組み合わせて、配列の長さを活用するプログラムを作ってみましょう。

### HTML（index.html）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>配列カウンター</title>
</head>
<body>
    <h1>配列の長さを確認</h1>
    <p>現在のリスト: <span id="display"></span></p>

    <input type="text" id="newItem" placeholder="アイテム名">
    <button id="add">追加</button>
    <button id="remove">削除</button>
    <button id="clear">全削除</button>

    <div id="info">
        <p>要素数: <span id="count"></span></p>
        <p>状態: <span id="status"></span></p>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript（script.js）

```javascript
let addButton = document.getElementById("add");
let removeButton = document.getElementById("remove");
let clearButton = document.getElementById("clear");
let display = document.getElementById("display");
let count = document.getElementById("count");
let status = document.getElementById("status");
let newItemInput = document.getElementById("newItem");

// アイテムの配列
let items = ["りんご", "みかん", "ぶどう"];

// 配列を表示
function showArray() {
  display.textContent = items.join(", ");
  count.textContent = items.length;

  // 状態を表示
  if (items.length === 0) {
    status.textContent = "空です";
  } else if (items.length < 3) {
    status.textContent = "少ないです";
  } else if (items.length >= 10) {
    status.textContent = "たくさんあります";
  } else {
    status.textContent = "普通です";
  }
}

// 初期表示
showArray();

// 追加
addButton.addEventListener("click", function() {
  let newItem = newItemInput.value;

  if (newItem) {
    items.push(newItem);
    showArray();
    newItemInput.value = "";
  }
});

// 削除
removeButton.addEventListener("click", function() {
  if (items.length > 0) {
    items.pop();
    showArray();
  }
});

// 全削除
clearButton.addEventListener("click", function() {
  items.length = 0;  // lengthを0にして配列を空にする
  showArray();
});
```

### コードの詳しい説明

#### 配列の表示と状態判定

```javascript
function showArray() {
  display.textContent = items.join(", ");
  count.textContent = items.length;

  if (items.length === 0) {
    status.textContent = "空です";
  } else if (items.length < 3) {
    status.textContent = "少ないです";
  } else if (items.length >= 10) {
    status.textContent = "たくさんあります";
  } else {
    status.textContent = "普通です";
  }
}
```

**実行フロー**：
```
例: items = ["りんご", "みかん", "ぶどう", "バナナ"]

1. display.textContent を更新
   items.join(", ")
   → "りんご, みかん, ぶどう, バナナ"

2. count.textContent を更新
   items.length
   → 4

3. 状態の判定
   items.length === 0 → 4 === 0 → false
   items.length < 3 → 4 < 3 → false
   items.length >= 10 → 4 >= 10 → false
   else ブロック実行
   → status.textContent = "普通です"

4. 画面に表示
   現在のリスト: りんご, みかん, ぶどう, バナナ
   要素数: 4
   状態: 普通です
```

**様々な状態の例**：
```
length = 0:
→ "空です"

length = 1:
→ "少ないです"

length = 5:
→ "普通です"

length = 12:
→ "たくさんあります"
```

#### 削除の安全性チェック

```javascript
removeButton.addEventListener("click", function() {
  if (items.length > 0) {
    items.pop();
    showArray();
  }
});
```

**実行フロー**：
```
例: items = ["りんご", "みかん"]

1. 削除ボタンがクリックされる

2. 条件チェック
   items.length > 0
   → 2 > 0
   → true

3. items.pop() を実行
   "みかん"が削除される
   items = ["りんご"]

4. showArray() を呼び出し
   画面が更新される
```

**空の配列の場合**：
```
items = []

条件チェック:
0 > 0 → false

if ブロックは実行されない
→ 何も起こらない（安全）
```

**なぜこのチェックが必要か**：
```
チェックしない場合:
- 空の配列でpop()を実行
- undefined が返される
- エラーメッセージが表示されない
- ユーザーが混乱する

チェックする場合:
- 空の配列では何もしない
- 無駄な操作を防ぐ
- プログラムの安全性が向上
```

#### 配列を空にする

```javascript
clearButton.addEventListener("click", function() {
  items.length = 0;
  showArray();
});
```

**実行フロー**：
```
例: items = ["りんご", "みかん", "ぶどう", "バナナ"]

1. 全削除ボタンがクリックされる

2. items.length = 0 を実行
   すべての要素が削除される
   items = []

3. showArray() を呼び出し
   ↓
   display: ""（空文字列）
   count: "0"
   status: "空です"

4. 画面に表示
   現在のリスト:
   要素数: 0
   状態: 空です
```

**他の方法との比較**：
```javascript
// 方法1: lengthを0にする（推奨）
items.length = 0;

// 方法2: ループでpop()（遅い）
while (items.length > 0) {
  items.pop();
}

// 方法3: 新しい配列を代入（別の配列になる）
items = [];
```

## lengthの特徴

### 1. プロパティであり、メソッドではない

```javascript
// 正しい
console.log(fruits.length);

// 間違い（メソッドではない）
console.log(fruits.length());  // エラー！
```

**実行結果**：
```
正しい例:
fruits.length → 3（正常に動作）

間違った例:
fruits.length() → TypeError: fruits.length is not a function
```

**なぜエラーになるのか**：
```
length はプロパティ:
- 値を保持している
- ()をつけて呼び出すことはできない

メソッドの例:
- push(), pop() など
- ()をつけて呼び出す関数
```

### 2. 常に整数

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(typeof fruits.length);  // "number"
console.log(fruits.length);  // 3（整数）
```

**実行フロー**：
```
typeof fruits.length:
→ データ型をチェック
→ "number"（数値型）

fruits.length:
→ 3（整数）
→ 小数にはならない
→ 常に0以上の整数
```

**lengthの値の範囲**：
```
最小値: 0（空の配列）
最大値: 2^32 - 1（約42億）

例:
[] → length = 0
["a"] → length = 1
["a", "b", "c"] → length = 3
```

### 3. 読み取りと書き込みが可能

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 読み取り
console.log(fruits.length);  // 3

// 書き込み
fruits.length = 2;
console.log(fruits);  // ["りんご", "みかん"]
```

**実行フロー**：
```
読み取り:
-----------------
fruits.length を評価
→ 3 を返す
→ 値を取得するだけ（配列は変更されない）

書き込み:
-----------------
fruits.length = 2 を実行
→ 長さを2に変更
→ インデックス2以降を削除
→ 配列が変更される
```

## 実用的な例

### 例1：最大値の検索

```javascript
let numbers = [12, 45, 23, 67, 34];
let max = numbers[0];

for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > max) {
    max = numbers[i];
  }
}

console.log("最大値: " + max);  // "最大値: 67"
```

#### 実行フロー

```
初期状態:
-----------------
numbers = [12, 45, 23, 67, 34]
max = numbers[0] = 12

ループ i = 1:
-----------------
条件: 1 < 5 → true
numbers[1] = 45
45 > 12 → true
max = 45

ループ i = 2:
-----------------
条件: 2 < 5 → true
numbers[2] = 23
23 > 45 → false
max = 45（変更なし）

ループ i = 3:
-----------------
条件: 3 < 5 → true
numbers[3] = 67
67 > 45 → true
max = 67

ループ i = 4:
-----------------
条件: 4 < 5 → true
numbers[4] = 34
34 > 67 → false
max = 67（変更なし）

ループ i = 5:
-----------------
条件: 5 < 5 → false
ループ終了

最終結果:
-----------------
max = 67
出力: "最大値: 67"
```

### 例2：配列のコピー

```javascript
let original = ["りんご", "みかん", "ぶどう"];
let copy = [];

for (let i = 0; i < original.length; i++) {
  copy.push(original[i]);
}

console.log(copy);  // ["りんご", "みかん", "ぶどう"]
```

#### 実行フロー

```
初期状態:
-----------------
original = ["りんご", "みかん", "ぶどう"]
copy = []

ループ i = 0:
-----------------
条件: 0 < 3 → true
copy.push(original[0])
→ copy.push("りんご")
→ copy = ["りんご"]

ループ i = 1:
-----------------
条件: 1 < 3 → true
copy.push(original[1])
→ copy.push("みかん")
→ copy = ["りんご", "みかん"]

ループ i = 2:
-----------------
条件: 2 < 3 → true
copy.push(original[2])
→ copy.push("ぶどう")
→ copy = ["りんご", "みかん", "ぶどう"]

ループ i = 3:
-----------------
条件: 3 < 3 → false
ループ終了

最終結果:
-----------------
copy = ["りんご", "みかん", "ぶどう"]
```

### 例3：逆順の配列を作成

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let reversed = [];

for (let i = fruits.length - 1; i >= 0; i--) {
  reversed.push(fruits[i]);
}

console.log(reversed);  // ["ぶどう", "みかん", "りんご"]
```

#### 実行フロー

```
初期状態:
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
         [0]      [1]      [2]
reversed = []

開始インデックス:
-----------------
fruits.length - 1 = 3 - 1 = 2
i = 2（最後から開始）

ループ i = 2:
-----------------
条件: 2 >= 0 → true
reversed.push(fruits[2])
→ reversed.push("ぶどう")
→ reversed = ["ぶどう"]
i-- → i = 1

ループ i = 1:
-----------------
条件: 1 >= 0 → true
reversed.push(fruits[1])
→ reversed.push("みかん")
→ reversed = ["ぶどう", "みかん"]
i-- → i = 0

ループ i = 0:
-----------------
条件: 0 >= 0 → true
reversed.push(fruits[0])
→ reversed.push("りんご")
→ reversed = ["ぶどう", "みかん", "りんご"]
i-- → i = -1

ループ i = -1:
-----------------
条件: -1 >= 0 → false
ループ終了

最終結果:
-----------------
reversed = ["ぶどう", "みかん", "りんご"]
```

**ビジュアル図解**：
```
元の配列（順方向）:
["りんご", "みかん", "ぶどう"]
  [0]      [1]      [2]
   ↓        ↓        ↓
  最初     中央     最後

逆順のループ:
  i=2 → "ぶどう"
  i=1 → "みかん"
  i=0 → "りんご"

結果の配列（逆順）:
["ぶどう", "みかん", "りんご"]
  [0]      [1]      [2]
```

## 注意点

### 1. 疎な配列に注意

```javascript
let arr = [];
arr[0] = "A";
arr[5] = "B";

console.log(arr.length);  // 6（実際の要素は2つだけ）
console.log(arr);  // ["A", undefined, undefined, undefined, undefined, "B"]
```

#### 実行フロー

```
1. 空の配列を作成
   arr = []
   length = 0

2. arr[0] = "A" を実行
   arr = ["A"]
   length = 1

3. arr[5] = "B" を実行
   内部の動作:
   - インデックス5に値を設定
   - インデックス1〜4は自動的にundefinedで埋められる
   - 長さが6に拡張される

   arr = ["A", undefined, undefined, undefined, undefined, "B"]
         [0]   [1]       [2]       [3]       [4]       [5]
   length = 6

4. console.log(arr.length)
   → 6（最大インデックス + 1）
```

**ビジュアル図解**：
```
インデックス:  0    1    2    3    4    5
値:          "A"  空   空   空   空   "B"
              ↑                       ↑
            設定済               設定済

length = 最大インデックス + 1
       = 5 + 1
       = 6
```

**疎な配列の問題**：
```
問題点:
1. メモリの無駄（未使用の要素がある）
2. ループで予期しない undefined に遭遇
3. バグの原因になりやすい

推奨される方法:
連続して要素を追加する
arr.push("A");
arr.push("B");
```

### 2. lengthを小さくすると要素が失われる

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
fruits.length = 2;

console.log(fruits);  // ["りんご", "みかん"]
// "ぶどう", "バナナ", "メロン"は永久に失われた
```

#### 実行フロー

```
1. 初期状態
   fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
   length = 5

2. fruits.length = 2 を実行
   ↓
   内部の動作:
   - 長さを5から2に変更
   - インデックス2以降を削除
   - 削除された要素は完全に消滅

3. 実行後
   fruits = ["りんご", "みかん"]
   length = 2

4. 失われたデータ
   "ぶどう", "バナナ", "メロン"
   → 復元不可能
```

**重要な警告**：
```
一度削除された要素は戻せない:
-----------------
fruits.length = 2 を実行後:
→ ["りんご", "みかん"]

fruits.length = 5 を再度実行:
→ ["りんご", "みかん", undefined, undefined, undefined]
→ 削除された要素は戻らない！
```

## 練習問題

### 課題：配列カウンター

配列の長さを活用して、要素数を表示し、状態を判定するプログラムを作成してください。

### 保存場所

`exercises/lesson-091/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. `length`プロパティで要素数を表示する
2. 要素数に応じて状態を判定する
3. 空配列の判定を実装する

### 要件

- 配列の表示（id="display"）
- 要素数の表示（id="count"）
- 状態の表示（id="status"）
- 追加ボタン（id="add"）
- 削除ボタン（id="remove"）
- 全削除ボタン（id="clear"）
- 入力欄（id="newItem"）

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-091
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

lengthプロパティを活用する際のポイントを確認しましょう。

**lengthの基本**
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits.length);  // 3
```
- `配列名.length`で要素数を取得
- 括弧`()`はつけない（プロパティ）
- 常に最新の要素数を返す

**空配列の判定**
```javascript
if (items.length === 0) {
  // 配列は空
}

if (items.length > 0) {
  // 配列に要素がある
}
```
- `length === 0`で空かどうかを判定
- `length > 0`で要素があるかどうかを判定

**状態の判定**
```javascript
if (items.length === 0) {
  status.textContent = "空です";
} else if (items.length < 3) {
  status.textContent = "少ないです";
} else if (items.length >= 10) {
  status.textContent = "たくさんあります";
} else {
  status.textContent = "普通です";
}
```
- if文で`length`の値を比較
- 複数の条件で状態を判定

**配列を空にする**
```javascript
items.length = 0;
```
- `length`を0にするとすべての要素が削除される
- 最も効率的な方法

### 解答例

#### HTML（index.html）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 091</title>
</head>
<body>
    <h1>配列の長さを確認</h1>
    <p>現在のリスト: <span id="display"></span></p>

    <input type="text" id="newItem" placeholder="アイテム名">
    <button id="add">追加</button>
    <button id="remove">削除</button>
    <button id="clear">全削除</button>

    <div id="info">
        <p>要素数: <span id="count"></span></p>
        <p>状態: <span id="status"></span></p>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

#### JavaScript（script.js）

```javascript
let addButton = document.getElementById("add");
let removeButton = document.getElementById("remove");
let clearButton = document.getElementById("clear");
let display = document.getElementById("display");
let count = document.getElementById("count");
let status = document.getElementById("status");
let newItemInput = document.getElementById("newItem");

// アイテムの配列
let items = ["りんご", "みかん", "ぶどう"];

// 配列を表示
function showArray() {
  display.textContent = items.join(", ");
  count.textContent = items.length;

  // 状態を表示
  if (items.length === 0) {
    status.textContent = "空です";
  } else if (items.length < 3) {
    status.textContent = "少ないです";
  } else if (items.length >= 10) {
    status.textContent = "たくさんあります";
  } else {
    status.textContent = "普通です";
  }
}

// 初期表示
showArray();

// 追加
addButton.addEventListener("click", function() {
  let newItem = newItemInput.value;

  if (newItem) {
    items.push(newItem);
    showArray();
    newItemInput.value = "";
  }
});

// 削除
removeButton.addEventListener("click", function() {
  if (items.length > 0) {
    items.pop();
    showArray();
  }
});

// 全削除
clearButton.addEventListener("click", function() {
  items.length = 0;
  showArray();
});
```

### 解説

このコードでは、`length`プロパティを使って配列の要素数を管理しています。

**配列の表示と状態判定**
```javascript
function showArray() {
  display.textContent = items.join(", ");
  count.textContent = items.length;

  if (items.length === 0) {
    status.textContent = "空です";
  } else if (items.length < 3) {
    status.textContent = "少ないです";
  } else if (items.length >= 10) {
    status.textContent = "たくさんあります";
  } else {
    status.textContent = "普通です";
  }
}
```
- `items.length`で要素数を取得
- 要素数に応じて状態メッセージを変更
- 4段階の状態判定（空、少ない、普通、たくさん）

**削除の安全性チェック**
```javascript
if (items.length > 0) {
  items.pop();
  showArray();
}
```
- `items.length > 0`で空でないかチェック
- 空の配列で`pop()`を呼ばないようにする
- エラーを防ぎ、安全に削除

**配列を空にする**
```javascript
items.length = 0;
```
- `length`を0にして全削除
- ループより効率的
- 最もシンプルな方法

## まとめ

お疲れ様でした。今回のレッスンでは、配列の長さについて詳しく学びました。

### 今回学んだキーポイント

**lengthプロパティ**：
- `配列名.length`で配列の要素数を取得できます
- プロパティなので括弧`()`はつけません
- 常に最新の要素数を示します

**要素数のカウント**：
- `length`は配列の操作に応じて自動的に更新されます
- push()やpop()を実行すると自動的に変化します
- 手動で更新する必要はありません

**空配列の判定**：
- `length === 0`で配列が空かどうかを判定できます
- `length > 0`で要素があるかどうかを判定できます
- ループや削除前のチェックに活用できます

**lengthとインデックスの関係**：
- 最後のインデックス = `length - 1`
- インデックスは0から始まるため、-1が必要です
- `fruits[fruits.length - 1]`で最後の要素にアクセス

**lengthの書き込み**：
- `length`プロパティは書き込み可能です
- 小さくすると配列が短くなります
- 0にすると配列が空になります
- 大きくすると`undefined`で埋められます（非推奨）

`length`プロパティは、配列操作において最も頻繁に使用されるプロパティの1つです。ループの制御、条件分岐、配列の状態確認など、さまざまな場面で活用されます。

## カリキュラムの要件チェック

このレッスンは、カリキュラムの以下の要件を満たしています。

✅ **fruits.length**：`length`プロパティを使って配列の要素数を取得する方法を学びました

✅ **要素数をカウント**：`length`を使って配列の要素数をカウントし、表示する方法を学びました

✅ **空配列の判定**：`length === 0`や`length > 0`を使って配列が空かどうかを判定する方法を学びました

✅ **成果物：配列カウンター**：HTMLとJavaScriptを組み合わせて、配列の長さを活用したカウンタープログラムを実装しました

## 次回予告

次のレッスンでは、for文を使った配列処理について学びます。

- `for (let i = 0; i < array.length; i++)`の構文
- すべての要素を順番に処理する方法
- 番号付きリストの作成
- インデックスを使った配列の巡回

配列のすべての要素を効率的に処理できるようになります。楽しみにしていてください。
