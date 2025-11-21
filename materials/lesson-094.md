---
title: "Lesson 094: 配列の集計"
author: "JavaScript学習教材"
date: "2025-01-21"
---

# レッスン94：配列の集計

## 今回の学習

### 前回の復習

前回のレッスンでは、配列の検索について学びました。

- **線形探索**：配列を先頭から順番に調べる基本的な検索方法です
- **indexOf()メソッド**：要素を検索してインデックスを取得します。見つからない場合は-1を返します
- **includes()メソッド**：要素の存在確認に使います。true/falseを返します
- **成果物**：配列検索機 - 配列から特定の要素を検索するプログラムを作成しました

### 今回の目標

今回のレッスンでは、配列の数値を集計する方法を学びます。

- 配列の合計を計算する
- 平均値を求める
- 最大値と最小値を見つける

## 合計の計算

配列内のすべての数値を足し合わせて合計を求めます。

### 基本的なパターン

```javascript
let scores = [85, 92, 78, 95, 88];
let total = 0;

for (let i = 0; i < scores.length; i++) {
  total = total + scores[i];
}

console.log("合計: " + total);  // 438
```

### 詳しい説明

```javascript
let total = 0;  // 合計を保存する変数を0で初期化

for (let i = 0; i < scores.length; i++) {
  total = total + scores[i];  // 各要素を合計に加算
}
```

**ループの動き**：
```
最初: total = 0
1回目: total = 0 + 85 = 85
2回目: total = 85 + 92 = 177
3回目: total = 177 + 78 = 255
4回目: total = 255 + 95 = 350
5回目: total = 350 + 88 = 438
```

### for...ofを使った方法

```javascript
let scores = [85, 92, 78, 95, 88];
let total = 0;

for (let score of scores) {
  total = total + score;
}

console.log("合計: " + total);  // 438
```

インデックスが不要なので、`for...of`の方がシンプルです。

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
console.log("平均: " + average);  // 87.6
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

### Math関数の説明

```javascript
// Math.round(): 四捨五入
console.log(Math.round(87.6));   // 88
console.log(Math.round(87.4));   // 87

// Math.floor(): 切り捨て
console.log(Math.floor(87.6));   // 87
console.log(Math.floor(87.4));   // 87

// Math.ceil(): 切り上げ
console.log(Math.ceil(87.6));    // 88
console.log(Math.ceil(87.4));    // 88
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

console.log("最大値: " + max);  // 89
```

### 詳しい説明

```javascript
let max = numbers[0];  // 最初の要素を仮の最大値とする

for (let i = 1; i < numbers.length; i++) {  // 2番目から比較開始
  if (numbers[i] > max) {
    max = numbers[i];  // より大きい値が見つかったら更新
  }
}
```

**ループの動き**：
```
最初: max = 12
i=1: 45 > 12 → max = 45
i=2: 23 > 45? いいえ → max = 45
i=3: 67 > 45 → max = 67
i=4: 34 > 67? いいえ → max = 67
i=5: 89 > 67 → max = 89
i=6: 15 > 89? いいえ → max = 89
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

console.log("最大値: " + max);  // 89
```

### Math.max()を使う方法

```javascript
let numbers = [12, 45, 23, 67, 34, 89, 15];
let max = Math.max(...numbers);

console.log("最大値: " + max);  // 89
```

**スプレッド構文（`...`）**：
- `...numbers`は配列を展開する
- `Math.max(12, 45, 23, 67, 34, 89, 15)`と同じ意味

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

console.log("最小値: " + min);  // 12
```

### Math.min()を使う方法

```javascript
let numbers = [12, 45, 23, 67, 34, 89, 15];
let min = Math.min(...numbers);

console.log("最小値: " + min);  // 12
```

## 実践例：配列集計機

HTMLとJavaScriptを組み合わせて、配列を集計してみましょう。

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

**合計の計算**
```javascript
let total = 0;

for (let score of scores) {
  total = total + score;
}
```
- 変数`total`を0で初期化
- 各要素を順番に加算

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

**すべて同時に計算**
```javascript
for (let score of scores) {
  total = total + score;

  if (score > max) {
    max = score;
  }

  if (score < min) {
    min = score;
  }
}
```
- 1回のループで合計、最大値、最小値を同時に計算
- 効率的

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

### 例3：温度の統計

```javascript
let temperatures = [22, 25, 28, 26, 24, 23, 27];

// 最高気温と最低気温
let max = temperatures[0];
let min = temperatures[0];

for (let temp of temperatures) {
  if (temp > max) max = temp;
  if (temp < min) min = temp;
}

console.log("最高気温: " + max + "℃");
console.log("最低気温: " + min + "℃");
console.log("気温差: " + (max - min) + "℃");
```

## 応用：範囲の集計

特定の範囲の値だけを集計することもできます。

### 例：範囲内の合計

```javascript
let numbers = [5, 15, 25, 35, 45, 55, 65];
let min = 20;
let max = 50;
let total = 0;
let count = 0;

for (let num of numbers) {
  if (num >= min && num <= max) {
    total = total + num;
    count = count + 1;
  }
}

console.log(min + "〜" + max + "の範囲:");
console.log("合計: " + total);
console.log("個数: " + count);
console.log("平均: " + (total / count));
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

## 練習問題

### 課題：配列集計機

配列の数値を集計して、合計、平均、最大値、最小値を表示するプログラムを作成してください。

### 保存場所

`exercises/lesson-094/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

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

```bash
npm test exercises/lesson-094
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**合計の計算**
- 変数を0で初期化
- for文で各要素を加算
- `total = total + 要素`

**平均の計算**
- 合計を要素数で割る
- `total / 配列名.length`
- `Math.round()`で丸める

**最大値の検索**
- 最初の要素で初期化
- より大きい値が見つかるたびに更新
- `if (要素 > max) max = 要素`

**最小値の検索**
- 最初の要素で初期化
- より小さい値が見つかるたびに更新
- `if (要素 < min) min = 要素`

### 解答例

解答は上記の実践例を参照してください。

## まとめ

お疲れ様でした。今回のレッスンでは、配列の集計について学びました。

**今回学んだキーポイント**

- **合計の計算**：変数を0で初期化し、for文ですべての要素を加算します。`for...of`を使うとシンプルに書けます
- **平均値の計算**：合計を要素数で割ります。`Math.round()`などで小数点を丸めることができます
- **最大値の検索**：最初の要素を仮の最大値とし、より大きい値が見つかるたびに更新します
- **最小値の検索**：最初の要素を仮の最小値とし、より小さい値が見つかるたびに更新します

配列の集計は、データ分析の基本です。合計、平均、最大値、最小値などの統計値を求めることで、データの特徴を理解できます。

次のレッスンでは、配列のコピーについて学びます。配列の参照の問題と、安全にコピーする方法を習得しましょう。
