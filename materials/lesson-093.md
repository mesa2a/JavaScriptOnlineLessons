---
title: "Lesson 093: 配列の検索"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン93：配列の検索

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、for...of文について詳しく学びました。

**for...of文の構文**：`for (let item of array)`で要素に直接アクセス
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

for (let fruit of fruits) {
  console.log(fruit);
}
```

**通常のfor文との違い**：インデックスが不要な場合はfor...ofがシンプル
```javascript
// for...of: インデックス不要
for (let fruit of fruits) {
  console.log(fruit);
}

// 通常のfor: インデックスが必要
for (let i = 0; i < fruits.length; i++) {
  console.log((i + 1) + ". " + fruits[i]);
}
```

**使い分けの基準**：要素の値だけ必要ならfor...of、インデックスが必要なら通常のfor

### よくある場面

実際のプログラミングでは、こんな場面で配列の検索が必要になります。

**場面1：特定のデータが存在するか確認**
```
ユーザー名が登録済みリストに含まれているか調べたい
→ 配列から特定の要素を検索
→ 見つかったら「既に登録済み」と表示
```

**場面2：要素の位置を特定**
```
「みかん」が配列の何番目にあるか知りたい
→ インデックスを取得
→ 「3番目にあります」と表示
```

**場面3：条件に合う要素を探す**
```
100点以上の最初のスコアを見つけたい
→ 条件を満たす要素を検索
→ 見つかったら処理を実行
```

### 学習目標

このレッスンでは、配列から特定の要素を検索する方法を学びます。

- 配列から特定の要素を探す方法を理解する
- 見つかった場合の処理を実装する
- `indexOf()`メソッドを使った効率的な検索を習得する
- インデックスを取得する方法をマスターする

配列の検索は、データ処理の基本となる重要な操作です。

## 線形探索とは

**線形探索（リニアサーチ）**は、配列の先頭から順番に要素を調べていく最も基本的な検索方法です。

### 基本的なパターン

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
let target = "ぶどう";
let found = false;

for (let i = 0; i < fruits.length; i++) {
  if (fruits[i] === target) {
    found = true;
    console.log("見つかりました！");
    break;  // 見つかったらループを抜ける
  }
}

if (!found) {
  console.log("見つかりませんでした");
}
```

**出力**：
```
見つかりました！
```

### 実行フロー

```
初期状態:
-----------------
fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
         [0]      [1]      [2]      [3]      [4]
target = "ぶどう"
found = false

i = 0:
-----------------
fruits[0] === "ぶどう"
→ "りんご" === "ぶどう"
→ false
何もしない

i = 1:
-----------------
fruits[1] === "ぶどう"
→ "みかん" === "ぶどう"
→ false
何もしない

i = 2:
-----------------
fruits[2] === "ぶどう"
→ "ぶどう" === "ぶどう"
→ true
found = true
console.log("見つかりました！")
break → ループ終了

ループ後:
-----------------
if (!found) → if (!true) → if (false)
→ この部分は実行されない

最終結果:
found = true（見つかった）
```

### ビジュアル図解

```
配列: ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
探索:   ×       ×       ○

i=0: りんご ≠ ぶどう → 次へ
i=1: みかん ≠ ぶどう → 次へ
i=2: ぶどう = ぶどう → 見つかった！

× = 不一致
○ = 一致（検索成功）
```

### コードの詳しい説明

**変数の初期化**：
```javascript
let target = "ぶどう";  // 探したい値
let found = false;      // 見つかったかどうかのフラグ
```

**for文で順番に比較**：
```javascript
for (let i = 0; i < fruits.length; i++) {
  if (fruits[i] === target) {
    found = true;
    break;
  }
}
```
- `fruits[i] === target`：現在の要素が探している値と一致するかチェック
- `found = true`：見つかったフラグを立てる
- `break`：見つかったらループを終了（効率化）

**結果の判定**：
```javascript
if (!found) {
  console.log("見つかりませんでした");
}
```
- `!found`は「foundがfalse」という意味
- 見つからなかった場合のみ実行

### 見つからない場合の実行フロー

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let target = "メロン";
let found = false;

for (let i = 0; i < fruits.length; i++) {
  if (fruits[i] === target) {
    found = true;
    break;
  }
}

if (!found) {
  console.log("見つかりませんでした");
}
```

**実行フロー**：
```
初期状態:
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
target = "メロン"
found = false

i = 0:
-----------------
fruits[0] === "メロン"
→ "りんご" === "メロン"
→ false
何もしない

i = 1:
-----------------
fruits[1] === "メロン"
→ "みかん" === "メロン"
→ false
何もしない

i = 2:
-----------------
fruits[2] === "メロン"
→ "ぶどう" === "メロン"
→ false
何もしない

i = 3:
-----------------
3 < 3 → false
ループ終了

ループ後:
-----------------
if (!found) → if (!false) → if (true)
console.log("見つかりませんでした")

最終結果:
found = false（見つからなかった）
```

**ビジュアル図解**：
```
配列: ["りんご", "みかん", "ぶどう"]
探索:   ×       ×       ×

i=0: りんご ≠ メロン → 次へ
i=1: みかん ≠ メロン → 次へ
i=2: ぶどう ≠ メロン → 次へ
→ 全て調べて見つからなかった

× = 不一致
```

## インデックスを取得する

要素が見つかった位置（インデックス）を取得する方法です。

### 基本的な実装

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
let target = "ぶどう";
let index = -1;  // 見つからない場合は-1

for (let i = 0; i < fruits.length; i++) {
  if (fruits[i] === target) {
    index = i;
    break;
  }
}

if (index !== -1) {
  console.log("インデックス " + index + " で見つかりました");
} else {
  console.log("見つかりませんでした");
}
```

**出力**：
```
インデックス 2 で見つかりました
```

### 実行フロー

```
初期状態:
-----------------
fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
         [0]      [1]      [2]      [3]      [4]
target = "ぶどう"
index = -1

i = 0:
-----------------
fruits[0] === "ぶどう"
→ "りんご" === "ぶどう"
→ false
何もしない
index = -1（変わらない）

i = 1:
-----------------
fruits[1] === "ぶどう"
→ "みかん" === "ぶどう"
→ false
何もしない
index = -1（変わらない）

i = 2:
-----------------
fruits[2] === "ぶどう"
→ "ぶどう" === "ぶどう"
→ true
index = 2
break → ループ終了

ループ後:
-----------------
if (index !== -1)
→ if (2 !== -1)
→ if (true)
console.log("インデックス 2 で見つかりました")

最終結果:
index = 2（2番目に見つかった）
```

### ビジュアル図解

```
配列: ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
位置:   [0]      [1]      [2]      [3]      [4]
探索:   ×       ×       ○

i=0: りんご ≠ ぶどう → index = -1
i=1: みかん ≠ ぶどう → index = -1
i=2: ぶどう = ぶどう → index = 2 → 見つかった！

最終: index = 2
```

### なぜ-1を使うのか

```javascript
let index = -1;
```

**理由**：
```
配列のインデックス: 0, 1, 2, 3, 4, ...
                   （0以上の整数）

-1の意味:
- 「存在しないインデックス」を表す慣習
- 見つからなかった場合と区別できる
- JavaScriptの多くのメソッドが-1を使用

判定方法:
index !== -1 → 見つかった（0以上）
index === -1 → 見つからなかった
```

**具体例**：
```javascript
// 見つかった場合
index = 0    // 0番目に見つかった（最初の要素）
index = 1    // 1番目に見つかった（2番目の要素）
index = 2    // 2番目に見つかった（3番目の要素）

// 見つからなかった場合
index = -1   // 見つからなかった
```

## indexOf()メソッド

JavaScriptには、配列から要素を検索するための`indexOf()`メソッドが用意されています。

### 基本的な使い方

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
let index = fruits.indexOf("ぶどう");

console.log(index);  // 2
```

**構文**：
```javascript
配列名.indexOf(検索する値)
```

### 実行フロー

```
fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
         [0]      [1]      [2]      [3]      [4]

fruits.indexOf("ぶどう")を実行:
-----------------
内部的に線形探索を実行:

[0] "りんご" === "ぶどう" → false → 次へ
[1] "みかん" === "ぶどう" → false → 次へ
[2] "ぶどう" === "ぶどう" → true  → 2を返す

戻り値: 2
```

### 戻り値の意味

```
見つかった場合:
→ 最初に見つかった要素のインデックス（0以上の整数）

見つからなかった場合:
→ -1
```

**具体例**：
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

console.log(fruits.indexOf("りんご"));  // 0（最初の要素）
console.log(fruits.indexOf("みかん"));  // 1（2番目の要素）
console.log(fruits.indexOf("ぶどう"));  // 2（3番目の要素）
console.log(fruits.indexOf("メロン"));  // -1（見つからない）
```

**実行フロー**：
```
fruits.indexOf("りんご"):
-----------------
[0] "りんご" === "りんご" → true → 0を返す

fruits.indexOf("みかん"):
-----------------
[0] "りんご" === "みかん" → false → 次へ
[1] "みかん" === "みかん" → true → 1を返す

fruits.indexOf("ぶどう"):
-----------------
[0] "りんご" === "ぶどう" → false → 次へ
[1] "みかん" === "ぶどう" → false → 次へ
[2] "ぶどう" === "ぶどう" → true → 2を返す

fruits.indexOf("メロン"):
-----------------
[0] "りんご" === "メロン" → false → 次へ
[1] "みかん" === "メロン" → false → 次へ
[2] "ぶどう" === "メロン" → false → 次へ
全て調べて見つからない → -1を返す
```

### 見つかったかどうかの判定

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let target = "ぶどう";
let index = fruits.indexOf(target);

if (index !== -1) {
  console.log("「" + target + "」はインデックス " + index + " にあります");
} else {
  console.log("「" + target + "」は見つかりませんでした");
}
```

**出力**：
```
「ぶどう」はインデックス 2 にあります
```

**実行フロー**：
```
target = "ぶどう"
index = fruits.indexOf("ぶどう")
→ index = 2

if (index !== -1)
→ if (2 !== -1)
→ if (true)
console.log("「ぶどう」はインデックス 2 にあります")
```

### より簡潔な判定方法

**方法1：`!== -1`を使う**
```javascript
if (fruits.indexOf("ぶどう") !== -1) {
  console.log("ぶどうは配列に含まれています");
}
```

**方法2：`>= 0`を使う**
```javascript
if (fruits.indexOf("ぶどう") >= 0) {
  console.log("ぶどうは配列に含まれています");
}
```

**比較**：
```
方法1: index !== -1
- -1でないことを明示的にチェック
- より意図が明確

方法2: index >= 0
- 0以上（有効なインデックス）をチェック
- 数値的な意味が明確

どちらも同じ結果になる:
index = 0  → 0 !== -1 → true, 0 >= 0 → true
index = 1  → 1 !== -1 → true, 1 >= 0 → true
index = -1 → -1 !== -1 → false, -1 >= 0 → false
```

## includes()メソッド

要素が存在するかどうかだけを知りたい場合は、`includes()`メソッドが便利です。

### 基本的な使い方

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

console.log(fruits.includes("ぶどう"));  // true
console.log(fruits.includes("メロン"));  // false
```

**構文**：
```javascript
配列名.includes(検索する値)
```

### 実行フロー

```
fruits = ["りんご", "みかん", "ぶどう"]

fruits.includes("ぶどう")を実行:
-----------------
[0] "りんご" === "ぶどう" → false → 次へ
[1] "みかん" === "ぶどう" → false → 次へ
[2] "ぶどう" === "ぶどう" → true  → trueを返す

戻り値: true

fruits.includes("メロン")を実行:
-----------------
[0] "りんご" === "メロン" → false → 次へ
[1] "みかん" === "メロン" → false → 次へ
[2] "ぶどう" === "メロン" → false → 次へ
全て調べて見つからない → falseを返す

戻り値: false
```

### indexOf()との違い

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// indexOf(): インデックスを返す
let index = fruits.indexOf("ぶどう");
console.log(index);  // 2

// includes(): true/falseを返す
let exists = fruits.includes("ぶどう");
console.log(exists);  // true
```

**比較表**：
```
メソッド      | 戻り値           | 使用場面
-------------|-----------------|------------------
indexOf()    | インデックス(-1) | 位置が必要な場合
includes()   | true/false      | 存在確認だけの場合
```

**実行フローの比較**：
```
indexOf("ぶどう"):
-----------------
内部処理: 線形探索
戻り値: 2（インデックス）

includes("ぶどう"):
-----------------
内部処理: 線形探索
戻り値: true（存在する）

indexOf("メロン"):
-----------------
内部処理: 線形探索
戻り値: -1（見つからない）

includes("メロン"):
-----------------
内部処理: 線形探索
戻り値: false（存在しない）
```

**使い分けの基準**：
```
インデックスが必要:
→ indexOf()を使う
例: 「3番目にあります」と表示したい

存在確認だけ:
→ includes()を使う
例: 「含まれています」と表示したい

要素を削除したい:
→ indexOf()を使う
例: splice(index, 1)で削除
```

## 実践例：配列検索機

HTMLとJavaScriptを組み合わせて、配列を検索するプログラムを作ってみましょう。

### HTML（index.html）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>配列検索機</title>
</head>
<body>
    <h1>フルーツ検索</h1>
    <p>配列: りんご, みかん, ぶどう, バナナ, メロン</p>

    <input type="text" id="searchInput" placeholder="検索するフルーツ">
    <button id="searchButton">検索</button>

    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript（script.js）

```javascript
let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");
let result = document.getElementById("result");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// 検索処理
searchButton.addEventListener("click", function() {
  let target = searchInput.value;

  if (!target) {
    result.textContent = "検索するフルーツを入力してください";
    return;
  }

  // indexOf()で検索
  let index = fruits.indexOf(target);

  if (index !== -1) {
    result.textContent = "「" + target + "」はインデックス " + index + " で見つかりました！";
  } else {
    result.textContent = "「" + target + "」は見つかりませんでした";
  }
});
```

### コードの詳しい説明

#### 検索対象の取得

```javascript
let target = searchInput.value;

if (!target) {
  result.textContent = "検索するフルーツを入力してください";
  return;
}
```

**実行フロー**：
```
ユーザーが入力欄に "ぶどう" と入力:
-----------------
target = searchInput.value
→ target = "ぶどう"

if (!target)
→ if (!"ぶどう")
→ if (false)
→ この部分は実行されない

ユーザーが何も入力しない場合:
-----------------
target = searchInput.value
→ target = ""（空文字列）

if (!target)
→ if (!"")
→ if (true)
result.textContent = "検索するフルーツを入力してください"
return → 関数終了
```

**ポイント**：
- `!target`は「targetが空」という意味
- 空文字列`""`はfalseとして扱われる
- `return`で処理を終了（以降のコードは実行されない）

#### indexOf()で検索

```javascript
let index = fruits.indexOf(target);

if (index !== -1) {
  result.textContent = "「" + target + "」はインデックス " + index + " で見つかりました！";
} else {
  result.textContent = "「" + target + "」は見つかりませんでした";
}
```

**実行フロー（"ぶどう"を検索）**：
```
fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
target = "ぶどう"

index = fruits.indexOf(target)
-----------------
内部処理:
[0] "りんご" === "ぶどう" → false → 次へ
[1] "みかん" === "ぶどう" → false → 次へ
[2] "ぶどう" === "ぶどう" → true  → 2を返す

index = 2

if (index !== -1)
-----------------
if (2 !== -1)
→ if (true)

result.textContent = "「ぶどう」はインデックス 2 で見つかりました！"
```

**実行フロー（"メロン"を検索）**：
```
fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
target = "メロン"

index = fruits.indexOf(target)
-----------------
内部処理:
[0] "りんご" === "メロン" → false → 次へ
[1] "みかん" === "メロン" → false → 次へ
[2] "ぶどう" === "メロン" → false → 次へ
[3] "バナナ" === "メロン" → false → 次へ
[4] "メロン" === "メロン" → true  → 4を返す

index = 4

if (index !== -1)
-----------------
if (4 !== -1)
→ if (true)

result.textContent = "「メロン」はインデックス 4 で見つかりました！"
```

**実行フロー（"いちご"を検索）**：
```
fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
target = "いちご"

index = fruits.indexOf(target)
-----------------
内部処理:
[0] "りんご" === "いちご" → false → 次へ
[1] "みかん" === "いちご" → false → 次へ
[2] "ぶどう" === "いちご" → false → 次へ
[3] "バナナ" === "いちご" → false → 次へ
[4] "メロン" === "いちご" → false → 次へ
全て調べて見つからない → -1を返す

index = -1

if (index !== -1)
-----------------
if (-1 !== -1)
→ if (false)

else部分を実行:
result.textContent = "「いちご」は見つかりませんでした"
```

## for文を使った検索の実装

indexOf()を使わずに、for文で検索を実装してみましょう。

### パターン1：見つかったかどうか

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let target = "みかん";
let found = false;

for (let i = 0; i < fruits.length; i++) {
  if (fruits[i] === target) {
    found = true;
    break;
  }
}

console.log(found ? "見つかりました" : "見つかりませんでした");
```

**出力**：
```
見つかりました
```

**実行フロー**：
```
初期状態:
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
target = "みかん"
found = false

i = 0:
-----------------
fruits[0] === "みかん"
→ "りんご" === "みかん"
→ false
何もしない

i = 1:
-----------------
fruits[1] === "みかん"
→ "みかん" === "みかん"
→ true
found = true
break → ループ終了

ループ後:
-----------------
console.log(found ? "見つかりました" : "見つかりませんでした")
→ console.log(true ? "見つかりました" : "見つかりませんでした")
→ console.log("見つかりました")
```

**三項演算子の説明**：
```
条件 ? 真の場合 : 偽の場合

found ? "見つかりました" : "見つかりませんでした"

foundがtrue:
→ "見つかりました"

foundがfalse:
→ "見つかりませんでした"
```

### パターン2：インデックスを取得

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let target = "みかん";
let index = -1;

for (let i = 0; i < fruits.length; i++) {
  if (fruits[i] === target) {
    index = i;
    break;
  }
}

if (index !== -1) {
  console.log("インデックス: " + index);
} else {
  console.log("見つかりませんでした");
}
```

**出力**：
```
インデックス: 1
```

**実行フロー**：
```
初期状態:
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
         [0]      [1]      [2]
target = "みかん"
index = -1

i = 0:
-----------------
fruits[0] === "みかん"
→ "りんご" === "みかん"
→ false
index = -1（変わらない）

i = 1:
-----------------
fruits[1] === "みかん"
→ "みかん" === "みかん"
→ true
index = 1
break → ループ終了

ループ後:
-----------------
if (index !== -1)
→ if (1 !== -1)
→ if (true)
console.log("インデックス: 1")
```

### パターン3：すべての一致を検索

```javascript
let numbers = [1, 2, 3, 2, 4, 2, 5];
let target = 2;
let indices = [];

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] === target) {
    indices.push(i);
  }
}

console.log("見つかった位置: " + indices.join(", "));
```

**出力**：
```
見つかった位置: 1, 3, 5
```

**実行フロー**：
```
初期状態:
-----------------
numbers = [1, 2, 3, 2, 4, 2, 5]
          [0][1][2][3][4][5][6]
target = 2
indices = []

i = 0:
-----------------
numbers[0] === 2
→ 1 === 2
→ false
何もしない

i = 1:
-----------------
numbers[1] === 2
→ 2 === 2
→ true
indices.push(1)
→ indices = [1]

i = 2:
-----------------
numbers[2] === 2
→ 3 === 2
→ false
何もしない

i = 3:
-----------------
numbers[3] === 2
→ 2 === 2
→ true
indices.push(3)
→ indices = [1, 3]

i = 4:
-----------------
numbers[4] === 2
→ 4 === 2
→ false
何もしない

i = 5:
-----------------
numbers[5] === 2
→ 2 === 2
→ true
indices.push(5)
→ indices = [1, 3, 5]

i = 6:
-----------------
numbers[6] === 2
→ 5 === 2
→ false
何もしない

i = 7:
-----------------
7 < 7 → false
ループ終了

最終結果:
-----------------
indices = [1, 3, 5]
indices.join(", ") → "1, 3, 5"
console.log("見つかった位置: 1, 3, 5")
```

**ビジュアル図解**：
```
配列: [1, 2, 3, 2, 4, 2, 5]
位置:  0  1  2  3  4  5  6
探索:  ×  ○  ×  ○  ×  ○  ×

i=1: 2 = 2 → indices.push(1)
i=3: 2 = 2 → indices.push(3)
i=5: 2 = 2 → indices.push(5)

最終: indices = [1, 3, 5]
```

**重要な注意点**：
```
indexOf()の制限:
→ 最初に見つかった要素のみを返す

すべての一致を探す場合:
→ for文を使う必要がある
→ breakを使わない（全要素をチェック）
→ 見つかるたびにpush()で配列に追加
```

## 条件付き検索

より複雑な条件で検索することもできます。

### 例1：数値の範囲で検索

```javascript
let numbers = [10, 25, 30, 45, 60, 75];
let threshold = 50;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > threshold) {
    console.log("最初に50を超える値: " + numbers[i]);
    console.log("インデックス: " + i);
    break;
  }
}
```

**出力**：
```
最初に50を超える値: 60
インデックス: 4
```

**実行フロー**：
```
numbers = [10, 25, 30, 45, 60, 75]
          [0] [1] [2] [3] [4] [5]
threshold = 50

i = 0:
-----------------
numbers[0] > 50
→ 10 > 50
→ false
何もしない

i = 1:
-----------------
numbers[1] > 50
→ 25 > 50
→ false
何もしない

i = 2:
-----------------
numbers[2] > 50
→ 30 > 50
→ false
何もしない

i = 3:
-----------------
numbers[3] > 50
→ 45 > 50
→ false
何もしない

i = 4:
-----------------
numbers[4] > 50
→ 60 > 50
→ true
console.log("最初に50を超える値: 60")
console.log("インデックス: 4")
break → ループ終了
```

**ビジュアル図解**：
```
配列: [10, 25, 30, 45, 60, 75]
条件:  ×   ×   ×   ×   ○   （breakで確認せず）

10 > 50 → false
25 > 50 → false
30 > 50 → false
45 > 50 → false
60 > 50 → true → 見つかった！
```

### 例2：文字列の部分一致

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let keyword = "ん";

for (let i = 0; i < fruits.length; i++) {
  if (fruits[i].includes(keyword)) {
    console.log("「" + keyword + "」を含む: " + fruits[i]);
  }
}
```

**出力**：
```
「ん」を含む: りんご
「ん」を含む: みかん
```

**実行フロー**：
```
fruits = ["りんご", "みかん", "ぶどう"]
keyword = "ん"

i = 0:
-----------------
fruits[0].includes("ん")
→ "りんご".includes("ん")
→ true（"りんご"には"ん"が含まれる）
console.log("「ん」を含む: りんご")

i = 1:
-----------------
fruits[1].includes("ん")
→ "みかん".includes("ん")
→ true（"みかん"には"ん"が含まれる）
console.log("「ん」を含む: みかん")

i = 2:
-----------------
fruits[2].includes("ん")
→ "ぶどう".includes("ん")
→ false（"ぶどう"には"ん"が含まれない）
何もしない
```

**文字列のincludes()の動き**：
```
"りんご".includes("ん"):
→ "り" "ん" "ご" の中に "ん" がある？
→ true

"みかん".includes("ん"):
→ "み" "か" "ん" の中に "ん" がある？
→ true

"ぶどう".includes("ん"):
→ "ぶ" "ど" "う" の中に "ん" がある？
→ false
```

**ポイント**：
```
配列のincludes():
→ 要素全体が一致するかチェック

文字列のincludes():
→ 部分文字列が含まれるかチェック

breakを使わない理由:
→ 全ての一致を表示したいため
→ 最初の1つだけでよければbreakを追加
```

### 例3：オブジェクトの配列を検索

```javascript
let students = [
  {name: "太郎", age: 20},
  {name: "花子", age: 22},
  {name: "次郎", age: 19}
];

let targetName = "花子";

for (let i = 0; i < students.length; i++) {
  if (students[i].name === targetName) {
    console.log("見つかりました: " + students[i].name + " (" + students[i].age + "歳)");
    break;
  }
}
```

**出力**：
```
見つかりました: 花子 (22歳)
```

**実行フロー**：
```
students = [
  {name: "太郎", age: 20},  // [0]
  {name: "花子", age: 22},  // [1]
  {name: "次郎", age: 19}   // [2]
]
targetName = "花子"

i = 0:
-----------------
students[0].name === "花子"
→ {name: "太郎", age: 20}.name === "花子"
→ "太郎" === "花子"
→ false
何もしない

i = 1:
-----------------
students[1].name === "花子"
→ {name: "花子", age: 22}.name === "花子"
→ "花子" === "花子"
→ true
console.log("見つかりました: 花子 (22歳)")
break → ループ終了
```

**ビジュアル図解**：
```
配列: [{太郎, 20}, {花子, 22}, {次郎, 19}]
       [0]         [1]         [2]

i=0: 太郎 ≠ 花子 → 次へ
i=1: 花子 = 花子 → 見つかった！

取得したデータ:
name: "花子"
age: 22
```

## 実用的な例

### 例1：重複チェック

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let newFruit = "みかん";

if (fruits.indexOf(newFruit) !== -1) {
  console.log("「" + newFruit + "」は既に存在します");
} else {
  fruits.push(newFruit);
  console.log("「" + newFruit + "」を追加しました");
}
```

**出力**：
```
「みかん」は既に存在します
```

**実行フロー**：
```
fruits = ["りんご", "みかん", "ぶどう"]
newFruit = "みかん"

fruits.indexOf("みかん")
-----------------
[0] "りんご" === "みかん" → false → 次へ
[1] "みかん" === "みかん" → true  → 1を返す

if (1 !== -1)
→ if (true)
console.log("「みかん」は既に存在します")
```

**新しい要素を追加する場合**：
```
fruits = ["りんご", "みかん", "ぶどう"]
newFruit = "バナナ"

fruits.indexOf("バナナ")
-----------------
[0] "りんご" === "バナナ" → false → 次へ
[1] "みかん" === "バナナ" → false → 次へ
[2] "ぶどう" === "バナナ" → false → 次へ
見つからない → -1を返す

if (-1 !== -1)
→ if (false)

else部分を実行:
fruits.push("バナナ")
→ fruits = ["りんご", "みかん", "ぶどう", "バナナ"]
console.log("「バナナ」を追加しました")
```

### 例2：要素の削除（検索して削除）

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ"];
let target = "みかん";
let index = fruits.indexOf(target);

if (index !== -1) {
  fruits.splice(index, 1);  // 1つの要素を削除
  console.log("「" + target + "」を削除しました");
  console.log("残り: " + fruits.join(", "));
} else {
  console.log("「" + target + "」は見つかりませんでした");
}
```

**出力**：
```
「みかん」を削除しました
残り: りんご, ぶどう, バナナ
```

**実行フロー**：
```
fruits = ["りんご", "みかん", "ぶどう", "バナナ"]
         [0]      [1]      [2]      [3]
target = "みかん"

index = fruits.indexOf("みかん")
-----------------
[0] "りんご" === "みかん" → false → 次へ
[1] "みかん" === "みかん" → true  → 1を返す
index = 1

if (index !== -1)
-----------------
if (1 !== -1)
→ if (true)

fruits.splice(1, 1)
-----------------
インデックス1から1つの要素を削除
削除される要素: "みかん"
fruits = ["りんご", "ぶどう", "バナナ"]

console.log("「みかん」を削除しました")
console.log("残り: りんご, ぶどう, バナナ")
```

**splice()の動き**：
```
fruits.splice(index, 1)
             │      │
             │      └─ 削除する要素の数
             └──────── 開始位置

削除前: ["りんご", "みかん", "ぶどう", "バナナ"]
         [0]      [1]      [2]      [3]

splice(1, 1)を実行:
→ インデックス1（"みかん"）から1つ削除

削除後: ["りんご", "ぶどう", "バナナ"]
         [0]      [1]      [2]
```

### 例3：存在確認後に処理

```javascript
let allowedUsers = ["admin", "user1", "user2"];
let currentUser = "user1";

if (allowedUsers.includes(currentUser)) {
  console.log("アクセス許可");
} else {
  console.log("アクセス拒否");
}
```

**出力**：
```
アクセス許可
```

**実行フロー**：
```
allowedUsers = ["admin", "user1", "user2"]
currentUser = "user1"

allowedUsers.includes("user1")
-----------------
[0] "admin" === "user1" → false → 次へ
[1] "user1" === "user1" → true  → trueを返す

if (true)
console.log("アクセス許可")
```

**アクセス拒否の場合**：
```
allowedUsers = ["admin", "user1", "user2"]
currentUser = "guest"

allowedUsers.includes("guest")
-----------------
[0] "admin" === "guest" → false → 次へ
[1] "user1" === "guest" → false → 次へ
[2] "user2" === "guest" → false → 次へ
見つからない → falseを返す

if (false)

else部分を実行:
console.log("アクセス拒否")
```

## indexOf()の詳細な動作

### 開始位置の指定

indexOf()は、検索を開始する位置を指定できます。

```javascript
let numbers = [1, 2, 3, 2, 4, 2, 5];

// 通常の検索（先頭から）
console.log(numbers.indexOf(2));  // 1

// インデックス2から検索開始
console.log(numbers.indexOf(2, 2));  // 3

// インデックス4から検索開始
console.log(numbers.indexOf(2, 4));  // 5
```

**構文**：
```javascript
配列名.indexOf(検索する値, 開始位置)
```

**実行フロー**：
```
numbers = [1, 2, 3, 2, 4, 2, 5]
          [0][1][2][3][4][5][6]

numbers.indexOf(2):
-----------------
[0] 1 === 2 → false → 次へ
[1] 2 === 2 → true  → 1を返す

numbers.indexOf(2, 2):
-----------------
インデックス2から開始
[2] 3 === 2 → false → 次へ
[3] 2 === 2 → true  → 3を返す

numbers.indexOf(2, 4):
-----------------
インデックス4から開始
[4] 4 === 2 → false → 次へ
[5] 2 === 2 → true  → 5を返す
```

**ビジュアル図解**：
```
配列: [1, 2, 3, 2, 4, 2, 5]
位置:  0  1  2  3  4  5  6

indexOf(2):
開始→ [0, 1, 2, 3, 4, 5, 6]
      →  ○ （見つかった）
結果: 1

indexOf(2, 2):
      [0, 1] をスキップ
開始→       [2, 3, 4, 5, 6]
            →  ○ （見つかった）
結果: 3

indexOf(2, 4):
      [0, 1, 2, 3] をスキップ
開始→                [4, 5, 6]
                     →  ○
結果: 5
```

### すべての出現位置を取得

```javascript
let numbers = [1, 2, 3, 2, 4, 2, 5];
let target = 2;
let indices = [];
let startIndex = 0;

while (true) {
  let index = numbers.indexOf(target, startIndex);
  if (index === -1) break;

  indices.push(index);
  startIndex = index + 1;
}

console.log("2が見つかった位置: " + indices.join(", "));
```

**出力**：
```
2が見つかった位置: 1, 3, 5
```

**実行フロー**：
```
numbers = [1, 2, 3, 2, 4, 2, 5]
          [0][1][2][3][4][5][6]
target = 2
indices = []
startIndex = 0

ループ1回目:
-----------------
index = numbers.indexOf(2, 0)
→ インデックス0から検索
→ [1] で見つかる → 1
if (1 === -1) → false
indices.push(1)
→ indices = [1]
startIndex = 1 + 1 = 2

ループ2回目:
-----------------
index = numbers.indexOf(2, 2)
→ インデックス2から検索
→ [3] で見つかる → 3
if (3 === -1) → false
indices.push(3)
→ indices = [1, 3]
startIndex = 3 + 1 = 4

ループ3回目:
-----------------
index = numbers.indexOf(2, 4)
→ インデックス4から検索
→ [5] で見つかる → 5
if (5 === -1) → false
indices.push(5)
→ indices = [1, 3, 5]
startIndex = 5 + 1 = 6

ループ4回目:
-----------------
index = numbers.indexOf(2, 6)
→ インデックス6から検索
→ 見つからない → -1
if (-1 === -1) → true
break → ループ終了

最終結果:
-----------------
indices = [1, 3, 5]
console.log("2が見つかった位置: 1, 3, 5")
```

**ビジュアル図解**：
```
配列: [1, 2, 3, 2, 4, 2, 5]
位置:  0  1  2  3  4  5  6

1回目: indexOf(2, 0)
       → インデックス1で見つかる
       → startIndex = 2

2回目: indexOf(2, 2)
       → インデックス3で見つかる
       → startIndex = 4

3回目: indexOf(2, 4)
       → インデックス5で見つかる
       → startIndex = 6

4回目: indexOf(2, 6)
       → 見つからない（-1）
       → ループ終了

結果: [1, 3, 5]
```

## 練習問題

### 課題：配列検索機

配列から特定の要素を検索し、見つかった場合にインデックスを表示するプログラムを作成してください。

### 保存場所

`exercises/lesson-093/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. `indexOf()`メソッドで要素を検索する
2. 見つかった場合はインデックスを表示する
3. 見つからなかった場合はメッセージを表示する

### 要件

- 検索入力欄（id="searchInput"）
- 検索ボタン（id="searchButton"）
- 結果表示エリア（id="result"）
- `indexOf()`を使って検索する
- 見つかったらインデックスを表示
- 見つからなかったらメッセージを表示

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-093
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

配列の検索で押さえるべきポイントを確認しましょう。

**indexOf()の基本**
```javascript
let index = 配列名.indexOf(検索する値);
```
- 見つかった場合：インデックス（0以上）を返す
- 見つからなかった場合：-1を返す

**結果の判定方法**
```javascript
if (index !== -1) {
  // 見つかった場合の処理
} else {
  // 見つからなかった場合の処理
}
```
- `index !== -1`で見つかったかチェック
- `index >= 0`でも同じ意味

**入力値のチェック**
```javascript
let target = searchInput.value;

if (!target) {
  result.textContent = "検索するフルーツを入力してください";
  return;
}
```
- `!target`で空かどうかをチェック
- 空の場合はエラーメッセージを表示して終了

**メッセージの表示**
```javascript
if (index !== -1) {
  result.textContent = "「" + target + "」はインデックス " + index + " で見つかりました！";
} else {
  result.textContent = "「" + target + "」は見つかりませんでした";
}
```
- 見つかった場合：インデックスを含めて表示
- 見つからなかった場合：その旨を表示

### 解答例

#### HTML（index.html）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 093</title>
</head>
<body>
    <h1>フルーツ検索</h1>
    <p>配列: りんご, みかん, ぶどう, バナナ, メロン</p>

    <input type="text" id="searchInput" placeholder="検索するフルーツ">
    <button id="searchButton">検索</button>

    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

#### JavaScript（script.js）

```javascript
let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");
let result = document.getElementById("result");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// 検索処理
searchButton.addEventListener("click", function() {
  let target = searchInput.value;

  if (!target) {
    result.textContent = "検索するフルーツを入力してください";
    return;
  }

  // indexOf()で検索
  let index = fruits.indexOf(target);

  if (index !== -1) {
    result.textContent = "「" + target + "」はインデックス " + index + " で見つかりました！";
  } else {
    result.textContent = "「" + target + "」は見つかりませんでした";
  }
});
```

### 解説

このコードでは、indexOf()メソッドを使って配列から特定の要素を検索しています。

**入力値のチェック**
```javascript
let target = searchInput.value;

if (!target) {
  result.textContent = "検索するフルーツを入力してください";
  return;
}
```
- 入力欄の値を取得
- 空の場合はエラーメッセージを表示
- `return`で処理を終了

**indexOf()で検索**
```javascript
let index = fruits.indexOf(target);
```
- 配列から要素を検索
- 見つかったらインデックスを返す
- 見つからなければ-1を返す

**結果の表示**
```javascript
if (index !== -1) {
  result.textContent = "「" + target + "」はインデックス " + index + " で見つかりました！";
} else {
  result.textContent = "「" + target + "」は見つかりませんでした";
}
```
- `index !== -1`で見つかったかチェック
- 見つかった場合：インデックスを表示
- 見つからなかった場合：メッセージを表示

## まとめ

お疲れ様でした。今回のレッスンでは、配列の検索について詳しく学びました。

### 今回学んだキーポイント

**線形探索**：
- 配列を先頭から順番に調べる基本的な検索方法です
- for文とif文を組み合わせて実装できます
- `break`を使って見つかったらループを終了できます

**indexOf()メソッド**：
- `配列名.indexOf(検索する値)`で要素を検索できます
- 見つかった位置（インデックス）を返します（0以上の整数）
- 見つからない場合は-1を返します
- 最初に見つかった要素のみを返します

**インデックスの取得**：
- `let index = fruits.indexOf("ぶどう")`でインデックスを取得
- `index !== -1`で見つかったかチェック
- `index >= 0`でも同じ意味になります

**includes()メソッド**：
- 要素の存在確認だけならば`includes()`が便利です
- true/falseを返します
- インデックスが不要な場合に使います

**実用的な応用**：
- 重複チェック：追加前に存在確認
- 要素の削除：検索してからsplice()で削除
- 存在確認：アクセス権限のチェックなど
- 条件付き検索：範囲、部分一致、オブジェクトのプロパティなど

配列の検索は、データ処理において非常に重要な操作です。indexOf()やincludes()を使うことで、効率的に要素を探すことができます。

## カリキュラムの要件チェック

このレッスンは、カリキュラムの以下の要件を満たしています。

✅ **特定の要素を探す**：線形探索とindexOf()メソッドを使って、配列から特定の要素を探す方法を詳しく学びました

✅ **見つかったらメッセージ**：見つかった場合と見つからなかった場合の処理を実装し、適切なメッセージを表示する方法を習得しました

✅ **インデックスを取得**：indexOf()メソッドを使ってインデックスを取得する方法と、-1の意味、判定方法を理解しました

✅ **成果物：配列検索機**：HTMLとJavaScriptを組み合わせて、配列を検索してインデックスを表示するプログラムを実装しました

## 次回予告

次のレッスンでは、配列の集計について学びます。

- 数値配列の合計を計算
- 平均値を計算
- 最大値・最小値を見つける

配列の数値を集計する方法を習得しましょう。楽しみにしていてください。
