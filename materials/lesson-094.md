---
title: "Lesson 094: 配列の集計"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン94：配列の集計

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、配列の検索について詳しく学びました。

**線形探索**：配列を先頭から順番に調べる基本的な検索方法
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
```

**indexOf()メソッド**：要素を検索してインデックスを取得
```javascript
let index = fruits.indexOf("みかん");
if (index !== -1) {
  console.log("見つかりました");
}
```

**includes()メソッド**：要素の存在確認にtrue/falseを返す
```javascript
if (fruits.includes("みかん")) {
  console.log("含まれています");
}
```

### よくある場面

実際のプログラミングでは、こんな場面で配列の集計が必要になります。

**場面1：テストの点数を集計**
```
数学のテストの点数を集計したい
→ 合計点を計算
→ 平均点を求める
→ 最高点と最低点を見つける
```

**場面2：売上データの分析**
```
1週間の売上データがある
→ 合計売上を計算
→ 1日平均を求める
→ 最も売れた日を見つける
```

**場面3：気温の統計**
```
1週間の気温データから統計を取りたい
→ 平均気温を計算
→ 最高気温と最低気温を見つける
→ 気温差を求める
```

### 学習目標

このレッスンでは、配列の数値を集計する方法を学びます。

- 配列の合計を計算する方法を理解する
- 平均値を求める方法を習得する
- 最大値と最小値を見つけるアルゴリズムをマスターする
- 実用的な集計処理を実装できるようになる

配列の集計は、データ分析の基本となる重要な操作です。

## 合計の計算

配列内のすべての数値を足し合わせて合計を求めます。

### 基本的なパターン

```javascript
let scores = [85, 92, 78, 95, 88];
let total = 0;

for (let i = 0; i < scores.length; i++) {
  total = total + scores[i];
}

console.log("合計: " + total);
```

**出力**：
```
合計: 438
```

### 実行フロー

```
初期状態:
-----------------
scores = [85, 92, 78, 95, 88]
         [0] [1] [2] [3] [4]
total = 0

i = 0:
-----------------
total = total + scores[0]
      = 0 + 85
      = 85

i = 1:
-----------------
total = total + scores[1]
      = 85 + 92
      = 177

i = 2:
-----------------
total = total + scores[2]
      = 177 + 78
      = 255

i = 3:
-----------------
total = total + scores[3]
      = 255 + 95
      = 350

i = 4:
-----------------
total = total + scores[4]
      = 350 + 88
      = 438

ループ終了:
-----------------
total = 438
console.log("合計: 438")
```

### ビジュアル図解

```
配列: [85, 92, 78, 95, 88]

累積計算:
  0 (初期値)
+ 85 →  85
+ 92 → 177
+ 78 → 255
+ 95 → 350
+ 88 → 438

最終結果: 438
```

### コードの詳しい説明

**変数の初期化**：
```javascript
let total = 0;  // 合計を保存する変数を0で初期化
```
- 合計を保存する変数は**必ず0で初期化**
- 初期化しないと正しい合計が計算できない

**for文で加算**：
```javascript
for (let i = 0; i < scores.length; i++) {
  total = total + scores[i];  // 各要素を合計に加算
}
```
- `total = total + scores[i]`は累積加算
- 現在の合計に新しい値を足して更新

**重要な注意点**：
```
間違い: let total;  // undefinedになる
正しい: let total = 0;

間違い: total = scores[i];  // 上書きになる
正しい: total = total + scores[i];  // 累積加算
```

### for...ofを使った方法

```javascript
let scores = [85, 92, 78, 95, 88];
let total = 0;

for (let score of scores) {
  total = total + score;
}

console.log("合計: " + total);
```

**出力**：
```
合計: 438
```

**実行フロー**：
```
初期状態:
-----------------
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

**for vs for...of**：
```
通常のfor文:
- インデックスを管理
- scores[i]でアクセス

for...of文:
- インデックス不要
- scoreで直接アクセス
- シンプルで読みやすい

→ 合計計算にはfor...ofが適している
```

### 複合代入演算子を使う

```javascript
let scores = [85, 92, 78, 95, 88];
let total = 0;

for (let score of scores) {
  total += score;  // total = total + score の省略形
}

console.log("合計: " + total);
```

**`+=`の意味**：
```
total += score;
↓ これと同じ意味
total = total + score;

他の複合代入演算子:
total -= score;  // total = total - score
total *= score;  // total = total * score
total /= score;  // total = total / score
```

## 平均値の計算

合計を要素数で割って平均値を求めます。

### 基本的な実装

```javascript
let scores = [85, 92, 78, 95, 88];
let total = 0;

for (let score of scores) {
  total = total + score;
}

let average = total / scores.length;
console.log("平均: " + average);
```

**出力**：
```
平均: 87.6
```

### 実行フロー

```
初期状態:
-----------------
scores = [85, 92, 78, 95, 88]
scores.length = 5
total = 0

合計の計算:
-----------------
total = 0 + 85 = 85
total = 85 + 92 = 177
total = 177 + 78 = 255
total = 255 + 95 = 350
total = 350 + 88 = 438

平均の計算:
-----------------
average = total / scores.length
        = 438 / 5
        = 87.6

出力:
console.log("平均: 87.6")
```

### ビジュアル図解

```
配列: [85, 92, 78, 95, 88]
要素数: 5

ステップ1: 合計を計算
85 + 92 + 78 + 95 + 88 = 438

ステップ2: 要素数で割る
438 ÷ 5 = 87.6

結果: 平均 = 87.6
```

### 小数点以下を丸める

```javascript
let scores = [85, 92, 78, 95, 88];
let total = 0;

for (let score of scores) {
  total = total + score;
}

let average = total / scores.length;

// 小数点第1位で四捨五入
let rounded = Math.round(average * 10) / 10;
console.log("平均: " + rounded);  // 87.6

// 整数に丸める
let integer = Math.round(average);
console.log("平均: " + integer);  // 88
```

**出力**：
```
平均: 87.6
平均: 88
```

### 実行フロー（小数点第1位に丸める）

```
average = 87.6

Math.round(average * 10) / 10を計算:
-----------------
ステップ1: average * 10
87.6 * 10 = 876

ステップ2: Math.round(876)
876（整数なのでそのまま）

ステップ3: 876 / 10
876 / 10 = 87.6

結果: 87.6
```

**別の例（87.64の場合）**：
```
average = 87.64

Math.round(average * 10) / 10を計算:
-----------------
ステップ1: 87.64 * 10 = 876.4

ステップ2: Math.round(876.4) = 876
（四捨五入して整数に）

ステップ3: 876 / 10 = 87.6

結果: 87.6（小数第1位に丸まった）
```

### Math関数の詳しい説明

```javascript
let value = 87.6;

// Math.round(): 四捨五入
console.log(Math.round(87.6));   // 88
console.log(Math.round(87.4));   // 87
console.log(Math.round(87.5));   // 88

// Math.floor(): 切り捨て
console.log(Math.floor(87.6));   // 87
console.log(Math.floor(87.4));   // 87
console.log(Math.floor(87.9));   // 87

// Math.ceil(): 切り上げ
console.log(Math.ceil(87.6));    // 88
console.log(Math.ceil(87.4));    // 88
console.log(Math.ceil(87.1));    // 88
```

**実行フロー**：
```
Math.round(87.6):
-----------------
87.6は87.5以上なので切り上げ
→ 88

Math.round(87.4):
-----------------
87.4は87.5未満なので切り捨て
→ 87

Math.floor(87.6):
-----------------
小数点以下を切り捨て
→ 87

Math.ceil(87.6):
-----------------
小数点以下を切り上げ
→ 88
```

**使い分け**：
```
四捨五入したい:
→ Math.round()

常に切り捨てたい:
→ Math.floor()

常に切り上げたい:
→ Math.ceil()

小数点第N位に丸めたい:
→ Math.round(value * 10^N) / 10^N
例: 第1位 → * 10 / 10
    第2位 → * 100 / 100
```

## 最大値の検索

配列の中で最も大きい値を見つけます。

### 基本的なアルゴリズム

```javascript
let numbers = [12, 45, 23, 67, 34, 89, 15];
let max = numbers[0];  // 最初の要素で初期化

for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > max) {
    max = numbers[i];
  }
}

console.log("最大値: " + max);
```

**出力**：
```
最大値: 89
```

### 実行フロー

```
初期状態:
-----------------
numbers = [12, 45, 23, 67, 34, 89, 15]
          [0] [1] [2] [3] [4] [5] [6]
max = numbers[0] = 12

i = 1:
-----------------
numbers[1] > max
→ 45 > 12
→ true
max = 45

i = 2:
-----------------
numbers[2] > max
→ 23 > 45
→ false
maxは変わらない（45のまま）

i = 3:
-----------------
numbers[3] > max
→ 67 > 45
→ true
max = 67

i = 4:
-----------------
numbers[4] > max
→ 34 > 67
→ false
maxは変わらない（67のまま）

i = 5:
-----------------
numbers[5] > max
→ 89 > 67
→ true
max = 89

i = 6:
-----------------
numbers[6] > max
→ 15 > 89
→ false
maxは変わらない（89のまま）

ループ終了:
-----------------
max = 89
console.log("最大値: 89")
```

### ビジュアル図解

```
配列: [12, 45, 23, 67, 34, 89, 15]

maxの変化:
初期: max = 12
      ↓
i=1: 45 > 12 → max = 45
      ↓
i=2: 23 < 45 → max = 45（変わらない）
      ↓
i=3: 67 > 45 → max = 67
      ↓
i=4: 34 < 67 → max = 67（変わらない）
      ↓
i=5: 89 > 67 → max = 89
      ↓
i=6: 15 < 89 → max = 89（変わらない）

最終: max = 89
```

### アルゴリズムの詳しい説明

**初期化**：
```javascript
let max = numbers[0];  // 最初の要素を仮の最大値とする
```
- なぜ`numbers[0]`で初期化？
  - 配列の中の値で初期化する必要がある
  - 0で初期化すると、全要素が負の数の場合に間違った結果になる
  - -Infinityで初期化する方法もあるが、`numbers[0]`が分かりやすい

**ループ**：
```javascript
for (let i = 1; i < numbers.length; i++) {  // 2番目から比較開始
  if (numbers[i] > max) {
    max = numbers[i];  // より大きい値が見つかったら更新
  }
}
```
- なぜ`i = 1`から開始？
  - `max = numbers[0]`で初期化済み
  - `numbers[0]`を再度比較する必要はない
  - 効率化のため

**重要な注意点**：
```
間違い: let max = 0;
→ 全要素が負の数の場合、0が最大値になってしまう
例: [-5, -3, -8] → max = 0（間違い）

正しい: let max = numbers[0];
→ 配列の値で初期化
例: [-5, -3, -8] → max = -3（正しい）
```

### for...ofを使った方法

```javascript
let numbers = [12, 45, 23, 67, 34, 89, 15];
let max = numbers[0];

for (let num of numbers) {
  if (num > max) {
    max = num;
  }
}

console.log("最大値: " + max);
```

**出力**：
```
最大値: 89
```

**実行フロー**：
```
初期状態:
max = 12

num = 12: 12 > 12 → false
num = 45: 45 > 12 → true → max = 45
num = 23: 23 > 45 → false
num = 67: 67 > 45 → true → max = 67
num = 34: 34 > 67 → false
num = 89: 89 > 67 → true → max = 89
num = 15: 15 > 89 → false

最終: max = 89
```

**注意**：
```
for...ofの場合、最初の要素も比較される
→ num = 12の時、12 > 12はfalse
→ 問題なし（maxは変わらない）

通常のfor文の場合、i=1から開始
→ 最初の要素をスキップ
→ より効率的
```

### Math.max()を使う方法

```javascript
let numbers = [12, 45, 23, 67, 34, 89, 15];
let max = Math.max(...numbers);

console.log("最大値: " + max);
```

**出力**：
```
最大値: 89
```

**スプレッド構文（`...`）の説明**：
```
...numbersは配列を展開する

Math.max(...numbers)
↓ これと同じ意味
Math.max(12, 45, 23, 67, 34, 89, 15)

内部処理:
→ すべての引数を比較
→ 最大の値を返す
```

**実行フロー**：
```
numbers = [12, 45, 23, 67, 34, 89, 15]

...numbersを展開:
-----------------
12, 45, 23, 67, 34, 89, 15

Math.max(12, 45, 23, 67, 34, 89, 15)を実行:
-----------------
内部で全ての値を比較
最大値: 89

結果: 89
```

**比較**：
```
for文を使う方法:
- 仕組みが明確
- 学習に適している
- 柔軟性が高い（途中で他の処理も可能）

Math.max()を使う方法:
- コードが短い
- 読みやすい
- スプレッド構文の理解が必要
```

## 最小値の検索

配列の中で最も小さい値を見つけます。

### 基本的なアルゴリズム

```javascript
let numbers = [12, 45, 23, 67, 34, 89, 15];
let min = numbers[0];  // 最初の要素で初期化

for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] < min) {
    min = numbers[i];
  }
}

console.log("最小値: " + min);
```

**出力**：
```
最小値: 12
```

### 実行フロー

```
初期状態:
-----------------
numbers = [12, 45, 23, 67, 34, 89, 15]
          [0] [1] [2] [3] [4] [5] [6]
min = numbers[0] = 12

i = 1:
-----------------
numbers[1] < min
→ 45 < 12
→ false
minは変わらない（12のまま）

i = 2:
-----------------
numbers[2] < min
→ 23 < 12
→ false
minは変わらない（12のまま）

i = 3:
-----------------
numbers[3] < min
→ 67 < 12
→ false
minは変わらない（12のまま）

i = 4:
-----------------
numbers[4] < min
→ 34 < 12
→ false
minは変わらない（12のまま）

i = 5:
-----------------
numbers[5] < min
→ 89 < 12
→ false
minは変わらない（12のまま）

i = 6:
-----------------
numbers[6] < min
→ 15 < 12
→ false
minは変わらない（12のまま）

ループ終了:
-----------------
min = 12（最初の値が最小値）
console.log("最小値: 12")
```

### ビジュアル図解

```
配列: [12, 45, 23, 67, 34, 89, 15]

minの変化:
初期: min = 12
      ↓
i=1: 45 > 12 → min = 12（変わらない）
      ↓
i=2: 23 > 12 → min = 12（変わらない）
      ↓
i=3: 67 > 12 → min = 12（変わらない）
      ↓
i=4: 34 > 12 → min = 12（変わらない）
      ↓
i=5: 89 > 12 → min = 12（変わらない）
      ↓
i=6: 15 > 12 → min = 12（変わらない）

最終: min = 12
```

**別の例（最小値が途中にある場合）**：
```
numbers = [45, 23, 12, 67, 8, 34]

minの変化:
初期: min = 45
      ↓
i=1: 23 < 45 → min = 23
      ↓
i=2: 12 < 23 → min = 12
      ↓
i=3: 67 > 12 → min = 12（変わらない）
      ↓
i=4: 8 < 12 → min = 8
      ↓
i=5: 34 > 8 → min = 8（変わらない）

最終: min = 8
```

### for...ofを使った方法

```javascript
let numbers = [12, 45, 23, 67, 34, 89, 15];
let min = numbers[0];

for (let num of numbers) {
  if (num < min) {
    min = num;
  }
}

console.log("最小値: " + min);
```

**出力**：
```
最小値: 12
```

### Math.min()を使う方法

```javascript
let numbers = [12, 45, 23, 67, 34, 89, 15];
let min = Math.min(...numbers);

console.log("最小値: " + min);
```

**出力**：
```
最小値: 12
```

**実行フロー**：
```
numbers = [12, 45, 23, 67, 34, 89, 15]

...numbersを展開:
-----------------
12, 45, 23, 67, 34, 89, 15

Math.min(12, 45, 23, 67, 34, 89, 15)を実行:
-----------------
内部で全ての値を比較
最小値: 12

結果: 12
```

### 最大値と最小値を同時に求める

```javascript
let numbers = [12, 45, 23, 67, 34, 89, 15];
let max = numbers[0];
let min = numbers[0];

for (let num of numbers) {
  if (num > max) {
    max = num;
  }
  if (num < min) {
    min = num;
  }
}

console.log("最大値: " + max);
console.log("最小値: " + min);
console.log("範囲: " + (max - min));
```

**出力**：
```
最大値: 89
最小値: 12
範囲: 77
```

**実行フロー**：
```
初期状態:
numbers = [12, 45, 23, 67, 34, 89, 15]
max = 12
min = 12

num = 12:
-----------------
12 > 12 → false
12 < 12 → false
変化なし

num = 45:
-----------------
45 > 12 → true → max = 45
45 < 12 → false
max = 45, min = 12

num = 23:
-----------------
23 > 45 → false
23 < 12 → false
変化なし

num = 67:
-----------------
67 > 45 → true → max = 67
67 < 12 → false
max = 67, min = 12

num = 34:
-----------------
34 > 67 → false
34 < 12 → false
変化なし

num = 89:
-----------------
89 > 67 → true → max = 89
89 < 12 → false
max = 89, min = 12

num = 15:
-----------------
15 > 89 → false
15 < 12 → false
変化なし

最終結果:
max = 89
min = 12
範囲 = 89 - 12 = 77
```

**メリット**：
```
1回のループで両方を計算:
→ 効率的
→ コードがまとまる

別々に計算する場合:
→ 2回ループが必要
→ 非効率
```

## 実践例：配列集計機

HTMLとJavaScriptを組み合わせて、配列を集計するプログラムを作ってみましょう。

### HTML（index.html）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>配列集計機</title>
</head>
<body>
    <h1>テスト結果の集計</h1>
    <p>点数: 85, 92, 78, 95, 88</p>

    <button id="calcSum">合計を計算</button>
    <button id="calcAverage">平均を計算</button>
    <button id="calcMax">最大値を検索</button>
    <button id="calcMin">最小値を検索</button>
    <button id="calcAll">すべて計算</button>

    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript（script.js）

```javascript
let sumButton = document.getElementById("calcSum");
let averageButton = document.getElementById("calcAverage");
let maxButton = document.getElementById("calcMax");
let minButton = document.getElementById("calcMin");
let allButton = document.getElementById("calcAll");
let result = document.getElementById("result");

// テストの点数
let scores = [85, 92, 78, 95, 88];

// 合計を計算
sumButton.addEventListener("click", function() {
  let total = 0;

  for (let score of scores) {
    total = total + score;
  }

  result.textContent = "合計: " + total + "点";
});

// 平均を計算
averageButton.addEventListener("click", function() {
  let total = 0;

  for (let score of scores) {
    total = total + score;
  }

  let average = total / scores.length;
  let rounded = Math.round(average * 10) / 10;

  result.textContent = "平均: " + rounded + "点";
});

// 最大値を検索
maxButton.addEventListener("click", function() {
  let max = scores[0];

  for (let score of scores) {
    if (score > max) {
      max = score;
    }
  }

  result.textContent = "最高点: " + max + "点";
});

// 最小値を検索
minButton.addEventListener("click", function() {
  let min = scores[0];

  for (let score of scores) {
    if (score < min) {
      min = score;
    }
  }

  result.textContent = "最低点: " + min + "点";
});

// すべて計算
allButton.addEventListener("click", function() {
  let total = 0;
  let max = scores[0];
  let min = scores[0];

  for (let score of scores) {
    total = total + score;

    if (score > max) {
      max = score;
    }

    if (score < min) {
      min = score;
    }
  }

  let average = Math.round((total / scores.length) * 10) / 10;

  result.innerHTML = "";
  result.innerHTML += "<p>合計: " + total + "点</p>";
  result.innerHTML += "<p>平均: " + average + "点</p>";
  result.innerHTML += "<p>最高点: " + max + "点</p>";
  result.innerHTML += "<p>最低点: " + min + "点</p>";
  result.innerHTML += "<p>テスト数: " + scores.length + "回</p>";
});
```

### コードの詳しい説明

#### 合計の計算

```javascript
sumButton.addEventListener("click", function() {
  let total = 0;

  for (let score of scores) {
    total = total + score;
  }

  result.textContent = "合計: " + total + "点";
});
```

**実行フロー**：
```
ボタンクリック時:
-----------------
total = 0

for...ofループ:
score = 85: total = 0 + 85 = 85
score = 92: total = 85 + 92 = 177
score = 78: total = 177 + 78 = 255
score = 95: total = 255 + 95 = 350
score = 88: total = 350 + 88 = 438

結果表示:
result.textContent = "合計: 438点"
```

#### 平均の計算

```javascript
averageButton.addEventListener("click", function() {
  let total = 0;

  for (let score of scores) {
    total = total + score;
  }

  let average = total / scores.length;
  let rounded = Math.round(average * 10) / 10;

  result.textContent = "平均: " + rounded + "点";
});
```

**実行フロー**：
```
ボタンクリック時:
-----------------
total = 0

合計計算:
total = 438

平均計算:
average = 438 / 5 = 87.6

丸め処理:
rounded = Math.round(87.6 * 10) / 10
        = Math.round(876) / 10
        = 876 / 10
        = 87.6

結果表示:
result.textContent = "平均: 87.6点"
```

#### 最大値の検索

```javascript
maxButton.addEventListener("click", function() {
  let max = scores[0];

  for (let score of scores) {
    if (score > max) {
      max = score;
    }
  }

  result.textContent = "最高点: " + max + "点";
});
```

**実行フロー**：
```
ボタンクリック時:
-----------------
max = 85

for...ofループ:
score = 85: 85 > 85 → false
score = 92: 92 > 85 → true → max = 92
score = 78: 78 > 92 → false
score = 95: 95 > 92 → true → max = 95
score = 88: 88 > 95 → false

結果表示:
result.textContent = "最高点: 95点"
```

#### すべて同時に計算

```javascript
allButton.addEventListener("click", function() {
  let total = 0;
  let max = scores[0];
  let min = scores[0];

  for (let score of scores) {
    total = total + score;

    if (score > max) {
      max = score;
    }

    if (score < min) {
      min = score;
    }
  }

  let average = Math.round((total / scores.length) * 10) / 10;

  result.innerHTML = "";
  result.innerHTML += "<p>合計: " + total + "点</p>";
  result.innerHTML += "<p>平均: " + average + "点</p>";
  result.innerHTML += "<p>最高点: " + max + "点</p>";
  result.innerHTML += "<p>最低点: " + min + "点</p>";
  result.innerHTML += "<p>テスト数: " + scores.length + "回</p>";
});
```

**実行フロー**：
```
ボタンクリック時:
-----------------
total = 0
max = 85
min = 85

1回のループで全て計算:
-----------------
score = 85:
total = 0 + 85 = 85
85 > 85 → false
85 < 85 → false

score = 92:
total = 85 + 92 = 177
92 > 85 → true → max = 92
92 < 85 → false

score = 78:
total = 177 + 78 = 255
78 > 92 → false
78 < 85 → true → min = 78

score = 95:
total = 255 + 95 = 350
95 > 92 → true → max = 95
95 < 78 → false

score = 88:
total = 350 + 88 = 438
88 > 95 → false
88 < 78 → false

最終結果:
-----------------
total = 438
max = 95
min = 78
average = 438 / 5 = 87.6

表示:
合計: 438点
平均: 87.6点
最高点: 95点
最低点: 78点
テスト数: 5回
```

**この実装のメリット**：
```
1回のループで全ての集計を実行:
- 効率的
- パフォーマンスが良い
- コードがまとまっている

個別に実装した場合:
- 4回ループが必要（合計、最大、最小、平均の合計計算）
- 非効率
```

## 実用的な例

### 例1：成績の分析

```javascript
let scores = [85, 92, 78, 95, 88, 76, 90];

// 合計
let total = 0;
for (let score of scores) {
  total = total + score;
}

// 平均
let average = total / scores.length;

// 合格ライン（平均以上）
let passed = 0;
for (let score of scores) {
  if (score >= average) {
    passed = passed + 1;
  }
}

console.log("平均点: " + Math.round(average));
console.log("平均以上: " + passed + "人");
console.log("平均未満: " + (scores.length - passed) + "人");
```

**出力**：
```
平均点: 86
平均以上: 4人
平均未満: 3人
```

**実行フロー**：
```
scores = [85, 92, 78, 95, 88, 76, 90]

合計計算:
total = 85 + 92 + 78 + 95 + 88 + 76 + 90 = 604

平均計算:
average = 604 / 7 = 86.28...

合格者カウント:
85 >= 86.28 → false
92 >= 86.28 → true → passed = 1
78 >= 86.28 → false
95 >= 86.28 → true → passed = 2
88 >= 86.28 → true → passed = 3
76 >= 86.28 → false
90 >= 86.28 → true → passed = 4

結果:
平均点: 86
平均以上: 4人
平均未満: 7 - 4 = 3人
```

### 例2：売上の集計

```javascript
let sales = [12000, 15000, 18000, 14000, 16000];

// 合計売上
let totalSales = 0;
for (let sale of sales) {
  totalSales = totalSales + sale;
}

// 目標達成日数（15000円以上）
let target = 15000;
let achieved = 0;
for (let sale of sales) {
  if (sale >= target) {
    achieved = achieved + 1;
  }
}

console.log("合計売上: " + totalSales + "円");
console.log("1日平均: " + Math.round(totalSales / sales.length) + "円");
console.log("目標達成: " + achieved + "日");
```

**出力**：
```
合計売上: 75000円
1日平均: 15000円
目標達成: 3日
```

**実行フロー**：
```
sales = [12000, 15000, 18000, 14000, 16000]

合計売上:
12000 + 15000 + 18000 + 14000 + 16000 = 75000

目標達成日数:
12000 >= 15000 → false
15000 >= 15000 → true → achieved = 1
18000 >= 15000 → true → achieved = 2
14000 >= 15000 → false
16000 >= 15000 → true → achieved = 3

1日平均:
75000 / 5 = 15000

結果:
合計売上: 75000円
1日平均: 15000円
目標達成: 3日
```

### 例3：温度の統計

```javascript
let temperatures = [22, 25, 28, 26, 24, 23, 27];

// 最高気温と最低気温
let max = temperatures[0];
let min = temperatures[0];
let total = 0;

for (let temp of temperatures) {
  total = total + temp;
  if (temp > max) max = temp;
  if (temp < min) min = temp;
}

let average = Math.round(total / temperatures.length * 10) / 10;

console.log("平均気温: " + average + "℃");
console.log("最高気温: " + max + "℃");
console.log("最低気温: " + min + "℃");
console.log("気温差: " + (max - min) + "℃");
```

**出力**：
```
平均気温: 25℃
最高気温: 28℃
最低気温: 22℃
気温差: 6℃
```

**実行フロー**：
```
temperatures = [22, 25, 28, 26, 24, 23, 27]

初期状態:
max = 22
min = 22
total = 0

temp = 22:
total = 0 + 22 = 22
22 > 22 → false
22 < 22 → false

temp = 25:
total = 22 + 25 = 47
25 > 22 → true → max = 25
25 < 22 → false

temp = 28:
total = 47 + 28 = 75
28 > 25 → true → max = 28
28 < 22 → false

temp = 26:
total = 75 + 26 = 101
26 > 28 → false
26 < 22 → false

temp = 24:
total = 101 + 24 = 125
24 > 28 → false
24 < 22 → false

temp = 23:
total = 125 + 23 = 148
23 > 28 → false
23 < 22 → false

temp = 27:
total = 148 + 27 = 175
27 > 28 → false
27 < 22 → false

最終結果:
total = 175
max = 28
min = 22
average = 175 / 7 = 25
気温差 = 28 - 22 = 6
```

## 応用：範囲の集計

特定の範囲の値だけを集計することもできます。

### 例：範囲内の合計

```javascript
let numbers = [5, 15, 25, 35, 45, 55, 65];
let rangeMin = 20;
let rangeMax = 50;
let total = 0;
let count = 0;

for (let num of numbers) {
  if (num >= rangeMin && num <= rangeMax) {
    total = total + num;
    count = count + 1;
  }
}

console.log(rangeMin + "〜" + rangeMax + "の範囲:");
console.log("合計: " + total);
console.log("個数: " + count);
console.log("平均: " + (total / count));
```

**出力**：
```
20〜50の範囲:
合計: 105
個数: 3
平均: 35
```

**実行フロー**：
```
numbers = [5, 15, 25, 35, 45, 55, 65]
rangeMin = 20
rangeMax = 50
total = 0
count = 0

num = 5:
-----------------
5 >= 20 && 5 <= 50
→ false && true
→ false
何もしない

num = 15:
-----------------
15 >= 20 && 15 <= 50
→ false && true
→ false
何もしない

num = 25:
-----------------
25 >= 20 && 25 <= 50
→ true && true
→ true
total = 0 + 25 = 25
count = 0 + 1 = 1

num = 35:
-----------------
35 >= 20 && 35 <= 50
→ true && true
→ true
total = 25 + 35 = 60
count = 1 + 1 = 2

num = 45:
-----------------
45 >= 20 && 45 <= 50
→ true && true
→ true
total = 60 + 45 = 105
count = 2 + 1 = 3

num = 55:
-----------------
55 >= 20 && 55 <= 50
→ true && false
→ false
何もしない

num = 65:
-----------------
65 >= 20 && 65 <= 50
→ true && false
→ false
何もしない

最終結果:
total = 105
count = 3
平均 = 105 / 3 = 35
```

**ビジュアル図解**：
```
配列: [5, 15, 25, 35, 45, 55, 65]
範囲: [20 ≤ x ≤ 50]

判定:
5:  範囲外（小さすぎ）
15: 範囲外（小さすぎ）
25: 範囲内 ○
35: 範囲内 ○
45: 範囲内 ○
55: 範囲外（大きすぎ）
65: 範囲外（大きすぎ）

範囲内の値: [25, 35, 45]
合計: 25 + 35 + 45 = 105
個数: 3
平均: 105 / 3 = 35
```

## 空の配列への対応

配列が空の場合のエラーを防ぐ方法です。

### 安全な実装

```javascript
let scores = [];

if (scores.length === 0) {
  console.log("データがありません");
} else {
  let total = 0;
  for (let score of scores) {
    total = total + score;
  }

  let average = total / scores.length;
  console.log("平均: " + average);
}
```

**出力**：
```
データがありません
```

**実行フロー**：
```
scores = []
scores.length = 0

if (scores.length === 0)
→ if (0 === 0)
→ if (true)
console.log("データがありません")

else部分は実行されない
```

**空配列の問題**：
```
空配列で最大値・最小値を求める場合:
-----------------
let max = scores[0];  // undefined
let min = scores[0];  // undefined

→ undefinedとの比較になり、正しく動作しない

空配列で平均を求める場合:
-----------------
average = total / scores.length
        = 0 / 0
        = NaN（Not a Number）

→ 意図しない結果になる
```

### ゼロ除算の防止

```javascript
let scores = [];
let total = 0;

for (let score of scores) {
  total = total + score;
}

// 要素数が0の場合は0で割らない
let average = scores.length > 0 ? total / scores.length : 0;
console.log("平均: " + average);
```

**出力**：
```
平均: 0
```

**三項演算子の説明**：
```
scores.length > 0 ? total / scores.length : 0
      │              │                      │
      条件            真の場合              偽の場合

scores.length > 0:
→ true の場合: total / scores.length を計算
→ false の場合: 0 を返す

例:
scores.length = 5 → 5 > 0 → true → total / 5
scores.length = 0 → 0 > 0 → false → 0
```

**実行フロー**：
```
scores = []
total = 0

for...ofループ:
→ 配列が空なので1回も実行されない

average計算:
scores.length > 0 ? total / scores.length : 0
→ 0 > 0 ? 0 / 0 : 0
→ false ? 0 / 0 : 0
→ 0

結果: average = 0
```

## 練習問題

### 課題：配列集計機

配列の数値を集計して、合計、平均、最大値、最小値を表示するプログラムを作成してください。

### 保存場所

`exercises/lesson-094/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. 合計を計算する
2. 平均値を求める
3. 最大値と最小値を見つける

### 要件

- 合計計算ボタン（id="calcSum"）
- 平均計算ボタン（id="calcAverage"）
- 最大値検索ボタン（id="calcMax"）
- 最小値検索ボタン（id="calcMin"）
- すべて計算ボタン（id="calcAll"）
- 結果表示エリア（id="result"）

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-094
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

配列の集計で押さえるべきポイントを確認しましょう。

**合計の計算**
```javascript
let total = 0;
for (let score of scores) {
  total = total + score;
}
```
- 変数を0で初期化
- for文で各要素を加算
- `total += score`でも同じ

**平均の計算**
```javascript
let average = total / scores.length;
let rounded = Math.round(average * 10) / 10;
```
- 合計を要素数で割る
- `Math.round()`で丸める
- 小数第1位に丸めるには`* 10 / 10`

**最大値の検索**
```javascript
let max = scores[0];
for (let score of scores) {
  if (score > max) {
    max = score;
  }
}
```
- 最初の要素で初期化
- より大きい値が見つかるたびに更新
- `Math.max(...scores)`でも可能

**最小値の検索**
```javascript
let min = scores[0];
for (let score of scores) {
  if (score < min) {
    min = score;
  }
}
```
- 最初の要素で初期化
- より小さい値が見つかるたびに更新
- `Math.min(...scores)`でも可能

**すべて同時に計算**
```javascript
let total = 0;
let max = scores[0];
let min = scores[0];

for (let score of scores) {
  total += score;
  if (score > max) max = score;
  if (score < min) min = score;
}
```
- 1回のループで全て計算
- 効率的

### 解答例

#### HTML（index.html）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 094</title>
</head>
<body>
    <h1>テスト結果の集計</h1>
    <p>点数: 85, 92, 78, 95, 88</p>

    <button id="calcSum">合計を計算</button>
    <button id="calcAverage">平均を計算</button>
    <button id="calcMax">最大値を検索</button>
    <button id="calcMin">最小値を検索</button>
    <button id="calcAll">すべて計算</button>

    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

#### JavaScript（script.js）

```javascript
let sumButton = document.getElementById("calcSum");
let averageButton = document.getElementById("calcAverage");
let maxButton = document.getElementById("calcMax");
let minButton = document.getElementById("calcMin");
let allButton = document.getElementById("calcAll");
let result = document.getElementById("result");

// テストの点数
let scores = [85, 92, 78, 95, 88];

// 合計を計算
sumButton.addEventListener("click", function() {
  let total = 0;

  for (let score of scores) {
    total = total + score;
  }

  result.textContent = "合計: " + total + "点";
});

// 平均を計算
averageButton.addEventListener("click", function() {
  let total = 0;

  for (let score of scores) {
    total = total + score;
  }

  let average = total / scores.length;
  let rounded = Math.round(average * 10) / 10;

  result.textContent = "平均: " + rounded + "点";
});

// 最大値を検索
maxButton.addEventListener("click", function() {
  let max = scores[0];

  for (let score of scores) {
    if (score > max) {
      max = score;
    }
  }

  result.textContent = "最高点: " + max + "点";
});

// 最小値を検索
minButton.addEventListener("click", function() {
  let min = scores[0];

  for (let score of scores) {
    if (score < min) {
      min = score;
    }
  }

  result.textContent = "最低点: " + min + "点";
});

// すべて計算
allButton.addEventListener("click", function() {
  let total = 0;
  let max = scores[0];
  let min = scores[0];

  for (let score of scores) {
    total = total + score;

    if (score > max) {
      max = score;
    }

    if (score < min) {
      min = score;
    }
  }

  let average = Math.round((total / scores.length) * 10) / 10;

  result.innerHTML = "";
  result.innerHTML += "<p>合計: " + total + "点</p>";
  result.innerHTML += "<p>平均: " + average + "点</p>";
  result.innerHTML += "<p>最高点: " + max + "点</p>";
  result.innerHTML += "<p>最低点: " + min + "点</p>";
  result.innerHTML += "<p>テスト数: " + scores.length + "回</p>";
});
```

### 解説

このコードでは、配列の数値を様々な方法で集計しています。

**合計の計算**
```javascript
let total = 0;
for (let score of scores) {
  total = total + score;
}
```
- 変数`total`を0で初期化
- 各要素を順番に加算
- for...ofを使ってシンプルに実装

**平均の計算**
```javascript
let average = total / scores.length;
let rounded = Math.round(average * 10) / 10;
```
- 合計を要素数で割る
- `Math.round(average * 10) / 10`で小数第1位に丸める

**最大値の検索**
```javascript
let max = scores[0];
for (let score of scores) {
  if (score > max) {
    max = score;
  }
}
```
- 最初の要素を仮の最大値とする
- より大きい値が見つかるたびに更新

**最小値の検索**
```javascript
let min = scores[0];
for (let score of scores) {
  if (score < min) {
    min = score;
  }
}
```
- 最初の要素を仮の最小値とする
- より小さい値が見つかるたびに更新

**すべて同時に計算**
```javascript
for (let score of scores) {
  total = total + score;
  if (score > max) max = score;
  if (score < min) min = score;
}
```
- 1回のループで合計、最大値、最小値を同時に計算
- 効率的な実装

## まとめ

お疲れ様でした。今回のレッスンでは、配列の集計について詳しく学びました。

### 今回学んだキーポイント

**合計の計算**：
- 変数を0で初期化し、for文ですべての要素を加算します
- `total = total + score`または`total += score`で累積加算
- for...ofを使うとシンプルに書けます

**平均値の計算**：
- 合計を要素数で割ります（`total / scores.length`）
- `Math.round()`、`Math.floor()`、`Math.ceil()`で丸められます
- 小数第N位に丸めるには`Math.round(value * 10^N) / 10^N`

**最大値の検索**：
- 最初の要素を仮の最大値とします（`let max = numbers[0]`）
- より大きい値が見つかるたびに更新します
- `Math.max(...numbers)`でも求められます

**最小値の検索**：
- 最初の要素を仮の最小値とします（`let min = numbers[0]`）
- より小さい値が見つかるたびに更新します
- `Math.min(...numbers)`でも求められます

**効率的な実装**：
- 1回のループで複数の集計を同時に計算できます
- 空配列のチェックでエラーを防げます
- 範囲を指定した集計も可能です

配列の集計は、データ分析の基本です。合計、平均、最大値、最小値などの統計値を求めることで、データの特徴を理解できます。

## カリキュラムの要件チェック

このレッスンは、カリキュラムの以下の要件を満たしています。

✅ **数値配列の合計**：for文を使って配列の全要素を加算し、合計を計算する方法を詳しく学びました

✅ **平均値を計算**：合計を要素数で割って平均を求める方法と、Math関数を使った丸め処理を習得しました

✅ **最大値・最小値**：配列から最大値と最小値を見つけるアルゴリズムを理解し、実装できるようになりました

✅ **成果物：配列集計機**：HTMLとJavaScriptを組み合わせて、配列を様々な方法で集計するプログラムを実装しました

## 次回予告

次のレッスンでは、配列のコピーについて学びます。

- 参照の問題を理解する
- スプレッド構文`[...array]`を使う
- 安全に配列をコピーする方法

配列の参照とコピーの違いを理解し、正しくコピーする方法を習得しましょう。楽しみにしていてください。
