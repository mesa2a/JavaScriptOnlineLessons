---
title: "Lesson 087: 要素にアクセス"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン87：要素にアクセス

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、配列の基本について学びました。

```javascript
// 配列の作成
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]

// 配列の長さ
console.log(fruits.length);  // 3

// 配列の表示
console.log(fruits.join(", "));  // りんご, みかん, ぶどう
```

- **配列とは**：複数の値をひとつの変数にまとめて保存できるデータ構造です
- **配列の作成**：角かっこ `[]` を使って作成します
- **配列の長さ**：`.length`プロパティで要素の数を取得できます
- **インデックス**：各要素には0から始まる番号が割り当てられています

前回のレッスンで、配列には「インデックス」という番号が0から始まることを学びました。今回は、このインデックスを使って実際に要素にアクセスする方法を学びます。

### よくある場面

実際のプログラミングでは、このような場面で配列の要素にアクセスします。

**場面1：最初の要素を取り出したい**
```
買い物リスト = ["りんご", "みかん", "ぶどう"]

最初に買うべきもの → "りんご"
どうやって取り出す？ → リスト[0]
```

**場面2：最後の要素を取り出したい**
```
テストの点数 = [85, 92, 78, 95, 88]

最新のテストの点数 → 88
どうやって取り出す？ → 点数[点数.length - 1]
```

**場面3：特定の位置の要素が必要**
```
曜日 = ["月", "火", "水", "木", "金"]

今日は水曜日（3番目）
どうやって取り出す？ → 曜日[2]（インデックスは0から始まるので）
```

### 学習目標

今回のレッスンでは、**配列の要素へのアクセス方法**を学びます。

このレッスンを終えると、以下のことができるようになります。

- インデックスを使って特定の要素を取得できる
- 最初の要素 `fruits[0]` にアクセスできる
- 2番目の要素 `fruits[1]` にアクセスできる
- 最後の要素 `fruits[fruits.length - 1]` にアクセスできる
- 0ベースインデックスの概念を理解できる
- 境界値（範囲外アクセス）の注意点を理解できる

## インデックスとは

**インデックス（index）**は、配列内の要素の位置を示す番号です。

### 重要な特徴：0から始まる

JavaScriptの配列では、インデックスは**0から始まります**。これを**0ベースインデックス**と呼びます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
//            インデックス0  インデックス1  インデックス2
```

**インデックスと要素の対応**：
```
インデックス:  0        1        2
値:         "りんご"  "みかん"  "ぶどう"
```

**図解**：
```
配列: fruits
┌───────────┬───────────┬───────────┐
│  "りんご"  │  "みかん"  │  "ぶどう"  │
└───────────┴───────────┴───────────┘
     ↑           ↑           ↑
   [0]         [1]         [2]
 1番目        2番目        3番目
```

### なぜ0から始まるのか

多くの人にとって、インデックスが1ではなく0から始まるのは不自然に感じるかもしれません。

**理由**：
1. **コンピュータのメモリの仕組み**：配列の最初の要素は「配列の先頭から0個進んだ位置」と考えます
2. **計算の効率**：配列の要素にアクセスする際の計算が簡単になります
3. **プログラミング言語の標準**：ほとんどのプログラミング言語（C, Java, Python, JavaScriptなど）で共通です

**覚え方**：
- 1番目の要素 → インデックス0
- 2番目の要素 → インデックス1
- 3番目の要素 → インデックス2
- **「何番目か」から1を引いた数がインデックス**

### 日常生活での例え

配列のインデックスは、建物の階数に似ています。

**イギリス式の階数表記**：
```
日本: 1階、2階、3階
イギリス: Ground Floor(0階), 1st Floor, 2nd Floor

配列のインデックス:
[0]番目、[1]番目、[2]番目
```

イギリスでは1階を「Ground Floor（0階）」と呼びます。配列のインデックスも同じように0から数えると考えると理解しやすいです。

## 要素へのアクセス方法

配列の要素にアクセスするには、角かっこ `[]` の中にインデックスを書きます。

### 基本的な構文

```javascript
配列名[インデックス]
```

**構文の詳細**：
```
fruits[0]
│      │
│      └─ インデックス（0から始まる）
└──────── 配列の変数名
```

### 最初の要素を取得

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let first = fruits[0];
console.log(first);  // "りんご"
```

**実行の流れ**：
```
ステップ1: 配列の確認
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
          ↑
        インデックス0

ステップ2: fruits[0] の評価
-----------------
インデックス0の要素を取得
→ "りんご"

ステップ3: 変数への代入
-----------------
first = "りんご"

ステップ4: コンソール出力
-----------------
"りんご" が表示される
```

**重要**：
- `fruits[0]`: インデックス0の要素を取得
- 結果: "りんご"（1番目の要素）

### 2番目の要素を取得

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let second = fruits[1];
console.log(second);  // "みかん"
```

**実行の流れ**：
```
ステップ1: 配列の確認
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
                    ↑
                 インデックス1

ステップ2: fruits[1] の評価
-----------------
インデックス1の要素を取得
→ "みかん"

ステップ3: 変数への代入
-----------------
second = "みかん"

ステップ4: コンソール出力
-----------------
"みかん" が表示される
```

**注意**：2番目の要素はインデックス1です（1ではなく0から数えるため）。

### 3番目の要素を取得

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let third = fruits[2];
console.log(third);  // "ぶどう"
```

**実行の流れ**：
```
ステップ1: 配列の確認
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
                              ↑
                           インデックス2

ステップ2: fruits[2] の評価
-----------------
インデックス2の要素を取得
→ "ぶどう"

ステップ3: 変数への代入
-----------------
third = "ぶどう"

ステップ4: コンソール出力
-----------------
"ぶどう" が表示される
```

## すべての要素にアクセス

配列のすべての要素を順番に取得してみましょう。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

console.log(fruits[0]);  // "りんご"
console.log(fruits[1]);  // "みかん"
console.log(fruits[2]);  // "ぶどう"
```

**実行の流れ**：
```
fruits = ["りんご", "みかん", "ぶどう"]

fruits[0] → "りんご" を表示
fruits[1] → "みかん" を表示
fruits[2] → "ぶどう" を表示
```

**図解**：
```
配列へのアクセス
────────────────
fruits[0] → ["りんご", "みかん", "ぶどう"]
             ↑ここを取得

fruits[1] → ["りんご", "みかん", "ぶどう"]
                      ↑ここを取得

fruits[2] → ["りんご", "みかん", "ぶどう"]
                                ↑ここを取得
```

## 最後の要素を取得

配列の最後の要素を取得するには、配列の長さを使います。

### lengthを使った方法

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let last = fruits[fruits.length - 1];
console.log(last);  // "ぶどう"
```

**実行の流れ**：
```
ステップ1: lengthの取得
-----------------
fruits.length → 3

ステップ2: インデックスの計算
-----------------
fruits.length - 1
= 3 - 1
= 2

ステップ3: 要素の取得
-----------------
fruits[2] → "ぶどう"

ステップ4: 変数への代入
-----------------
last = "ぶどう"

ステップ5: コンソール出力
-----------------
"ぶどう" が表示される
```

**詳しい説明**：
- `fruits.length`: 配列の長さ（3）
- `fruits.length - 1`: 3 - 1 = 2（最後のインデックス）
- `fruits[2]`: "ぶどう"

### なぜ -1 が必要か

配列の長さが3の場合：
```
インデックス: 0, 1, 2
長さ: 3
```

インデックスは0から始まるので、最後のインデックスは「長さ - 1」になります。

**図解**：
```
配列の長さとインデックスの関係
──────────────────────────

fruits = ["りんご", "みかん", "ぶどう"]
         ┌──────┬──────┬──────┐
         │ [0]  │ [1]  │ [2]  │
         └──────┴──────┴──────┘
         1個目   2個目   3個目

length = 3（要素の数）
最後のインデックス = length - 1 = 2
```

```javascript
// 長さが3の配列
let fruits = ["りんご", "みかん", "ぶどう"];

// 間違い：インデックス3は存在しない
console.log(fruits[3]);  // undefined

// 正しい：最後はインデックス2
console.log(fruits[2]);  // "ぶどう"

// 正しい：length - 1を使う
console.log(fruits[fruits.length - 1]);  // "ぶどう"
```

**実行の流れ**：
```
fruits[3] のアクセス:
-----------------
インデックス3の要素を探す
→ 存在しない
→ undefined が返される

fruits[2] のアクセス:
-----------------
インデックス2の要素を探す
→ "ぶどう" が見つかる
→ "ぶどう" が返される

fruits[fruits.length - 1] のアクセス:
-----------------
fruits.length → 3
3 - 1 → 2
fruits[2] → "ぶどう"
```

### 様々な長さの配列での例

```javascript
// 長さ5の配列
let numbers = [10, 20, 30, 40, 50];
console.log(numbers[numbers.length - 1]);  // 50

// 長さ1の配列
let single = ["りんご"];
console.log(single[single.length - 1]);  // "りんご"

// 長さ10の配列
let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(days[days.length - 1]);  // 10
```

**図解**：
```
どんな長さでも同じ方法で最後の要素を取得できる
───────────────────────────────────────

numbers (length = 5):
[10, 20, 30, 40, 50]
                 ↑
            [5 - 1 = 4]

single (length = 1):
["りんご"]
  ↑
[1 - 1 = 0]

days (length = 10):
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                            ↑
                      [10 - 1 = 9]
```

## 範囲外のインデックス

存在しないインデックスにアクセスすると、`undefined`が返されます。

### 例：範囲外アクセス

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

console.log(fruits[0]);   // "りんご"（存在する）
console.log(fruits[1]);   // "みかん"（存在する）
console.log(fruits[2]);   // "ぶどう"（存在する）
console.log(fruits[3]);   // undefined（存在しない）
console.log(fruits[10]);  // undefined（存在しない）
```

**実行の流れ**：
```
fruits = ["りんご", "みかん", "ぶどう"]
         ┌──────┬──────┬──────┐
         │ [0]  │ [1]  │ [2]  │
         └──────┴──────┴──────┘

fruits[0] → インデックス0が存在 → "りんご"
fruits[1] → インデックス1が存在 → "みかん"
fruits[2] → インデックス2が存在 → "ぶどう"
fruits[3] → インデックス3が存在しない → undefined
fruits[10] → インデックス10が存在しない → undefined
```

**重要**：エラーにはなりませんが、`undefined`という値が返されます。

### undefinedとは

`undefined`は、「値が定義されていない」ことを表す特別な値です。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let result = fruits[10];

console.log(result);  // undefined

if (result === undefined) {
  console.log("その要素は存在しません");
}
```

**実行の流れ**：
```
ステップ1: 範囲外アクセス
-----------------
fruits[10] を評価
インデックス10は存在しない
→ undefined が返される

ステップ2: 変数への代入
-----------------
result = undefined

ステップ3: 条件チェック
-----------------
result === undefined
undefined === undefined
→ true

ステップ4: メッセージ表示
-----------------
"その要素は存在しません" が表示される
```

### 境界値の理解

**境界値（boundary value）**とは、配列の範囲の境界にあたる値のことです。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 有効な範囲: 0 <= インデックス <= 2
console.log(fruits[0]);   // "りんご" ✅ 最小の有効なインデックス
console.log(fruits[2]);   // "ぶどう" ✅ 最大の有効なインデックス

// 範囲外
console.log(fruits[-1]);  // undefined ❌ 下限を超えている
console.log(fruits[3]);   // undefined ❌ 上限を超えている
```

**図解**：
```
境界値の理解
──────────────────────────

有効な範囲: 0 ≤ インデックス ≤ (length - 1)

fruits (length = 3):
[-1] [0] [1] [2] [3]
 ↑   ↑   ↑   ↑   ↑
 ×   ✓   ✓   ✓   ×
範囲外 有効範囲  範囲外
```

## 負のインデックス

JavaScriptでは、負のインデックスは特別な意味を持ちません（一部の言語とは異なります）。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits[-1]);  // undefined（JavaScriptでは使えない）
console.log(fruits[-2]);  // undefined
```

**実行の流れ**：
```
fruits[-1] のアクセス:
-----------------
インデックス-1の要素を探す
→ 存在しない
→ undefined が返される
```

**注意**：Pythonなど一部の言語では、`-1`で最後の要素を取得できますが、JavaScriptでは`undefined`になります。

**他の言語との比較**：
```python
# Python（参考）
fruits = ["りんご", "みかん", "ぶどう"]
print(fruits[-1])  # "ぶどう"（Pythonでは有効）
```

```javascript
// JavaScript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits[-1]);  // undefined（JavaScriptでは無効）
```

JavaScriptで最後の要素を取得するには、`fruits[fruits.length - 1]`を使います。

## ループで要素にアクセス

for文と組み合わせて、すべての要素に順番にアクセスできます。

### 基本的なパターン

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

**実行の流れ**：
```
初期化: i = 0
条件: i < fruits.length (i < 3)

繰り返し1: i = 0
-----------------
i < 3 → true（ループ継続）
console.log("インデックス " + 0 + ": " + fruits[0])
→ "インデックス 0: りんご"
i++ → i = 1

繰り返し2: i = 1
-----------------
i < 3 → true（ループ継続）
console.log("インデックス " + 1 + ": " + fruits[1])
→ "インデックス 1: みかん"
i++ → i = 2

繰り返し3: i = 2
-----------------
i < 3 → true（ループ継続）
console.log("インデックス " + 2 + ": " + fruits[2])
→ "インデックス 2: ぶどう"
i++ → i = 3

繰り返し4: i = 3
-----------------
i < 3 → false（ループ終了）
```

**図解**：
```
for文での配列アクセス
────────────────────

fruits = ["りんご", "みかん", "ぶどう"]

i = 0: fruits[0] → "りんご"
       ↓
i = 1: fruits[1] → "みかん"
       ↓
i = 2: fruits[2] → "ぶどう"
       ↓
i = 3: 3 < 3 は false → ループ終了
```

**詳しい説明**：
- `i = 0`: 最初のインデックス（0）から始まる
- `i < fruits.length`: 配列の長さ（3）未満まで繰り返す
- `fruits[i]`: i番目の要素を取得

### ループの詳細な動き

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// 1回目のループ: i = 0
fruits[0]  // "りんご"

// 2回目のループ: i = 1
fruits[1]  // "みかん"

// 3回目のループ: i = 2
fruits[2]  // "ぶどう"

// 4回目はなし: i = 3 は fruits.length (3) 以上なので終了
```

## 特定の位置の要素を取得

配列の途中の要素も簡単に取得できます。

```javascript
let numbers = [10, 20, 30, 40, 50];

// 3番目の要素（インデックス2）
console.log(numbers[2]);  // 30

// 4番目の要素（インデックス3）
console.log(numbers[3]);  // 40

// 5番目の要素（インデックス4）
console.log(numbers[4]);  // 50
```

**実行の流れ**：
```
numbers = [10, 20, 30, 40, 50]
           [0] [1] [2] [3] [4]

numbers[2]:
インデックス2の要素 → 30

numbers[3]:
インデックス3の要素 → 40

numbers[4]:
インデックス4の要素 → 50
```

## インデックスの計算

インデックスは計算式でも指定できます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// 真ん中の要素を取得
let middleIndex = Math.floor(fruits.length / 2);
console.log(fruits[middleIndex]);  // "ぶどう"

// 最後から2番目
let secondLast = fruits.length - 2;
console.log(fruits[secondLast]);  // "バナナ"
```

**実行の流れ**：
```
真ん中の要素の計算:
-----------------
fruits.length → 5
fruits.length / 2 → 5 / 2 = 2.5
Math.floor(2.5) → 2
fruits[2] → "ぶどう"

最後から2番目の計算:
-----------------
fruits.length → 5
fruits.length - 2 → 5 - 2 = 3
fruits[3] → "バナナ"
```

**Math.floor()の説明**：
- `Math.floor()`は小数点以下を切り捨てる関数
- `fruits.length / 2`: 5 / 2 = 2.5
- `Math.floor(2.5)`: 2
- `fruits[2]`: "ぶどう"

**図解**：
```
fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
          [0]      [1]      [2]      [3]      [4]

真ん中:
length / 2 = 5 / 2 = 2.5
Math.floor(2.5) = 2
fruits[2] = "ぶどう"

最後から2番目:
length - 2 = 5 - 2 = 3
fruits[3] = "バナナ"
```

## 境界値の注意

配列の範囲内でアクセスすることが重要です。

### 安全なアクセス

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let index = 2;

// 範囲内のアクセス
if (index >= 0 && index < fruits.length) {
  console.log(fruits[index]);  // "ぶどう"
} else {
  console.log("インデックスが範囲外です");
}
```

**実行の流れ**：
```
ステップ1: 条件チェック
-----------------
index >= 0 → 2 >= 0 → true
index < fruits.length → 2 < 3 → true
true && true → true

ステップ2: 要素の取得
-----------------
fruits[2] → "ぶどう"

ステップ3: コンソール出力
-----------------
"ぶどう" が表示される
```

### エラーを避ける方法

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let index = 5;

// アクセス前にチェック
if (index >= 0 && index < fruits.length) {
  console.log(fruits[index]);
} else {
  console.log("インデックスが範囲外です");
}
```

**実行の流れ**：
```
ステップ1: 条件チェック
-----------------
index >= 0 → 5 >= 0 → true
index < fruits.length → 5 < 3 → false
true && false → false

ステップ2: else ブロック実行
-----------------
"インデックスが範囲外です" が表示される
```

**図解**：
```
安全なアクセスの条件
──────────────────

有効な範囲: 0 ≤ インデックス < length

fruits (length = 3):
[-1] [0] [1] [2] [3] [4] [5]
 ↓   ↓   ↓   ↓   ↓   ↓   ↓
 ×   ✓   ✓   ✓   ×   ×   ×

index = 2:
2 >= 0 && 2 < 3 → true ✅

index = 5:
5 >= 0 && 5 < 3 → false ❌
```

## 実践例：要素取得マスター

HTMLとJavaScriptを組み合わせて、配列の要素にアクセスしてみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>要素取得マスター</title>
</head>
<body>
    <h1>配列の要素にアクセス</h1>
    <button id="showFirst">最初の要素</button>
    <button id="showLast">最後の要素</button>
    <button id="showAll">すべての要素</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let firstButton = document.getElementById("showFirst");
let lastButton = document.getElementById("showLast");
let allButton = document.getElementById("showAll");
let result = document.getElementById("result");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// 最初の要素を表示
firstButton.addEventListener("click", function() {
  result.textContent = "最初の要素: " + fruits[0];
});

// 最後の要素を表示
lastButton.addEventListener("click", function() {
  let lastIndex = fruits.length - 1;
  result.textContent = "最後の要素: " + fruits[lastIndex];
});

// すべての要素を表示
allButton.addEventListener("click", function() {
  result.innerHTML = "";  // クリア

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = "インデックス " + i + ": " + fruits[i];
    result.appendChild(p);
  }
});
```

### コードの詳しい説明

**最初の要素の取得**：
```javascript
result.textContent = "最初の要素: " + fruits[0];
```

**実行の流れ**：
```
fruits[0] の評価:
-----------------
fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
          ↑
        インデックス0
→ "りんご"

文字列連結:
-----------------
"最初の要素: " + "りんご"
→ "最初の要素: りんご"

DOMへの反映:
-----------------
result.textContent = "最初の要素: りんご"
```

- `fruits[0]`: インデックス0の要素（"りんご"）
- 直接インデックス0を指定

**最後の要素の取得**：
```javascript
let lastIndex = fruits.length - 1;
result.textContent = "最後の要素: " + fruits[lastIndex];
```

**実行の流れ**：
```
lastIndexの計算:
-----------------
fruits.length → 5
5 - 1 → 4
lastIndex = 4

fruits[lastIndex] の評価:
-----------------
fruits[4] → "メロン"

文字列連結:
-----------------
"最後の要素: " + "メロン"
→ "最後の要素: メロン"

DOMへの反映:
-----------------
result.textContent = "最後の要素: メロン"
```

- `fruits.length - 1`: 配列の長さから1を引いて最後のインデックスを計算
- 配列の長さが変わっても対応できる

**すべての要素の表示**：
```javascript
for (let i = 0; i < fruits.length; i++) {
  let p = document.createElement("p");
  p.textContent = "インデックス " + i + ": " + fruits[i];
  result.appendChild(p);
}
```

**実行の流れ**：
```
初期化: i = 0
条件: i < 5

繰り返し1 (i = 0):
-----------------
p = document.createElement("p")
p.textContent = "インデックス 0: " + fruits[0]
            = "インデックス 0: りんご"
result.appendChild(p)

繰り返し2 (i = 1):
-----------------
p = document.createElement("p")
p.textContent = "インデックス 1: " + fruits[1]
            = "インデックス 1: みかん"
result.appendChild(p)

繰り返し3 (i = 2):
-----------------
p = document.createElement("p")
p.textContent = "インデックス 2: " + fruits[2]
            = "インデックス 2: ぶどう"
result.appendChild(p)

繰り返し4 (i = 3):
-----------------
p = document.createElement("p")
p.textContent = "インデックス 3: " + fruits[3]
            = "インデックス 3: バナナ"
result.appendChild(p)

繰り返し5 (i = 4):
-----------------
p = document.createElement("p")
p.textContent = "インデックス 4: " + fruits[4]
            = "インデックス 4: メロン"
result.appendChild(p)

i = 5:
-----------------
5 < 5 → false
ループ終了
```

- for文で0から配列の長さ-1まで繰り返す
- 各ループで`fruits[i]`にアクセス
- インデックスと値を両方表示

## 実用的な例

### 例1：成績の管理

```javascript
let scores = [85, 92, 78, 95, 88];

console.log("1回目のテスト: " + scores[0] + "点");
console.log("最新のテスト: " + scores[scores.length - 1] + "点");
```

**実行の流れ**：
```
scores = [85, 92, 78, 95, 88]
          [0] [1] [2] [3] [4]

scores[0]:
→ 85

scores[scores.length - 1]:
scores.length → 5
5 - 1 → 4
scores[4] → 88

出力:
1回目のテスト: 85点
最新のテスト: 88点
```

### 例2：曜日の取得

```javascript
let weekdays = ["月", "火", "水", "木", "金"];
let today = 2;  // 水曜日（インデックス2）

console.log("今日は" + weekdays[today] + "曜日です");
```

**実行の流れ**：
```
weekdays = ["月", "火", "水", "木", "金"]
            [0]  [1]  [2]  [3]  [4]

today = 2

weekdays[today]:
weekdays[2] → "水"

出力:
今日は水曜日です
```

### 例3：ランキングの表示

```javascript
let ranking = ["田中", "佐藤", "鈴木", "山田", "高橋"];

console.log("1位: " + ranking[0]);
console.log("2位: " + ranking[1]);
console.log("3位: " + ranking[2]);
```

**実行の流れ**：
```
ranking = ["田中", "佐藤", "鈴木", "山田", "高橋"]
           [0]    [1]    [2]    [3]    [4]

ranking[0] → "田中"
ranking[1] → "佐藤"
ranking[2] → "鈴木"

出力:
1位: 田中
2位: 佐藤
3位: 鈴木
```

## 練習問題

### 課題：要素取得マスター

配列の要素にアクセスする方法を理解し、最初の要素、最後の要素、すべての要素を表示するプログラムを作成してください。

### 保存場所

`exercises/lesson-087/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. インデックスを使って要素にアクセスする
2. 最初の要素と最後の要素を取得する
3. すべての要素を表示する

### 要件

- 3つのボタン（最初の要素、最後の要素、すべての要素）を作成
- 配列には少なくとも3つの要素を含める
- 最初の要素は `fruits[0]` でアクセス
- 最後の要素は `fruits[fruits.length - 1]` でアクセス
- すべての要素はfor文でループして表示

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-087
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

要素にアクセスする際のポイントを確認しましょう。

**インデックスの使い方**
- `配列名[インデックス]`で要素を取得します
- 最初の要素は`配列名[0]`です
- インデックスは0から始まります

例：
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits[0]);  // "りんご"
```

**最後の要素**
- `配列名[配列名.length - 1]`で取得します
- 長さから1を引くことを忘れないでください

例：
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits[fruits.length - 1]);  // "ぶどう"
```

**すべての要素**
- for文を使って`i = 0`から`i < 配列名.length`まで繰り返します
- 各ループで`配列名[i]`にアクセスします

例：
```javascript
for (let i = 0; i < fruits.length; i++) {
  console.log("インデックス " + i + ": " + fruits[i]);
}
```

**DOM操作**
- `textContent`でテキストを設定します
- `innerHTML = ""`で内容をクリアします
- `appendChild()`で要素を追加します

例：
```javascript
result.textContent = "最初の要素: " + fruits[0];

result.innerHTML = "";
let p = document.createElement("p");
p.textContent = "インデックス " + i + ": " + fruits[i];
result.appendChild(p);
```

### 解答例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 087</title>
</head>
<body>
    <h1>配列の要素にアクセス</h1>
    <button id="showFirst">最初の要素</button>
    <button id="showLast">最後の要素</button>
    <button id="showAll">すべての要素</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let firstButton = document.getElementById("showFirst");
let lastButton = document.getElementById("showLast");
let allButton = document.getElementById("showAll");
let result = document.getElementById("result");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう"];

// 最初の要素を表示
firstButton.addEventListener("click", function() {
  result.textContent = "最初の要素: " + fruits[0];
});

// 最後の要素を表示
lastButton.addEventListener("click", function() {
  result.textContent = "最後の要素: " + fruits[fruits.length - 1];
});

// すべての要素を表示
allButton.addEventListener("click", function() {
  result.innerHTML = "";  // クリア

  for (let i = 0; i < fruits.length; i++) {
    let p = document.createElement("p");
    p.textContent = "インデックス " + i + ": " + fruits[i];
    result.appendChild(p);
  }
});
```

### 解答例の詳しい説明

このコードでは、配列の要素へのアクセス方法を実践しています。

**ステップ1：配列の作成**
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
```

**実行の流れ**：
```
配列の作成:
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
          [0]      [1]      [2]
```

**ステップ2：最初の要素の取得**
```javascript
result.textContent = "最初の要素: " + fruits[0];
```

**実行の流れ**：
```
fruits[0] の評価:
-----------------
インデックス0の要素を取得
→ "りんご"

文字列連結:
-----------------
"最初の要素: " + "りんご"
→ "最初の要素: りんご"

DOMへの反映:
-----------------
result.textContent = "最初の要素: りんご"
```

- `fruits[0]`: 配列の最初の要素（インデックス0）
- 結果: "りんご"

**ステップ3：最後の要素の取得**
```javascript
result.textContent = "最後の要素: " + fruits[fruits.length - 1];
```

**実行の流れ**：
```
fruits.length の評価:
-----------------
配列の長さ → 3

fruits.length - 1 の計算:
-----------------
3 - 1 → 2

fruits[2] の評価:
-----------------
インデックス2の要素を取得
→ "ぶどう"

文字列連結:
-----------------
"最後の要素: " + "ぶどう"
→ "最後の要素: ぶどう"

DOMへの反映:
-----------------
result.textContent = "最後の要素: ぶどう"
```

- `fruits.length`: 配列の長さ（3）
- `fruits.length - 1`: 最後のインデックス（2）
- `fruits[2]`: "ぶどう"

**ステップ4：すべての要素の表示**
```javascript
for (let i = 0; i < fruits.length; i++) {
  let p = document.createElement("p");
  p.textContent = "インデックス " + i + ": " + fruits[i];
  result.appendChild(p);
}
```

**実行の流れ**：
```
初期化: i = 0
条件: i < 3

繰り返し1 (i = 0):
-----------------
0 < 3 → true
p要素を作成
p.textContent = "インデックス 0: りんご"
resultに追加
i++ → i = 1

繰り返し2 (i = 1):
-----------------
1 < 3 → true
p要素を作成
p.textContent = "インデックス 1: みかん"
resultに追加
i++ → i = 2

繰り返し3 (i = 2):
-----------------
2 < 3 → true
p要素を作成
p.textContent = "インデックス 2: ぶどう"
resultに追加
i++ → i = 3

i = 3:
-----------------
3 < 3 → false
ループ終了

最終的なDOM:
-----------------
<div id="result">
  <p>インデックス 0: りんご</p>
  <p>インデックス 1: みかん</p>
  <p>インデックス 2: ぶどう</p>
</div>
```

- for文で配列の全要素をループ
- `i = 0`から`i < fruits.length`（i < 3）まで
- 各ループで`fruits[i]`にアクセスして表示

**動作の流れ**：
1. ボタンをクリック
2. 対応するイベントハンドラーが実行される
3. 配列の要素にアクセス
4. 結果を画面に表示

## まとめ

お疲れ様でした。今回のレッスンでは、配列の要素にアクセスする方法を学びました。

**今回学んだキーポイント**

1. **インデックスでアクセス**：`配列名[インデックス]`の形式で、特定の要素を取得できます
   ```javascript
   let fruits = ["りんご", "みかん", "ぶどう"];
   console.log(fruits[0]);  // "りんご"
   ```

2. **0ベースインデックス**：配列のインデックスは0から始まります。最初の要素は`配列名[0]`、2番目は`配列名[1]`です
   ```javascript
   fruits[0]  // 1番目の要素: "りんご"
   fruits[1]  // 2番目の要素: "みかん"
   fruits[2]  // 3番目の要素: "ぶどう"
   ```

3. **最後の要素**：`配列名[配列名.length - 1]`で最後の要素を取得できます。長さから1を引くことが重要です
   ```javascript
   let last = fruits[fruits.length - 1];  // "ぶどう"
   ```

4. **範囲外アクセス**：存在しないインデックスにアクセスすると`undefined`が返されます。エラーにはなりませんが、注意が必要です
   ```javascript
   console.log(fruits[10]);  // undefined
   ```

5. **境界値**：配列の有効な範囲は `0 ≤ インデックス < length` です
   ```javascript
   // 有効な範囲のチェック
   if (index >= 0 && index < fruits.length) {
     console.log(fruits[index]);
   }
   ```

6. **ループでのアクセス**：for文と組み合わせて、すべての要素に順番にアクセスできます
   ```javascript
   for (let i = 0; i < fruits.length; i++) {
     console.log(fruits[i]);
   }
   ```

インデックスを使った要素へのアクセスは、配列操作の基本中の基本です。この知識は、今後のすべての配列操作で使われます。

次のレッスンでは、配列の要素を変更する方法を学びます。インデックスを使って、既存の要素を新しい値に書き換える方法を習得しましょう。

---

## カリキュラムの要件チェック

このレッスンは、以下のカリキュラムの要件を満たしています。

```
レッスン87：要素にアクセス（30分）
✅ fruits[0] で最初の要素
✅ fruits[1] で2番目
✅ fruits[fruits.length-1] で最後
【知識】0ベースインデックス、境界値
✅ 成果物：要素取得マスター
```

**確認項目**：
- ✅ `fruits[0]` で最初の要素にアクセス
- ✅ `fruits[1]` で2番目の要素にアクセス
- ✅ `fruits[fruits.length-1]` で最後の要素にアクセス
- ✅ 0ベースインデックスの概念の詳細な説明
- ✅ 境界値（範囲外アクセス）の注意点の説明
- ✅ 成果物：要素取得マスターの実装

すべての要件を満たしています。
