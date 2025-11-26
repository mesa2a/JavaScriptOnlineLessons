---
title: "Lesson 084: パフォーマンス"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン84：パフォーマンス

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、ループの選択について学びました。

```javascript
// for文：繰り返し回数が決まっている場合
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// while文：繰り返し回数が不明な場合
let password = "";
while (password !== "secret") {
  password = prompt("パスワードを入力");
}
```

- **ループの使い分け**：for文は回数が決まっている繰り返しに、while文は条件駆動の繰り返しに適しています
- **適切な選択**：決まった回数ならfor文、ユーザー入力や複雑な条件ならwhile文を選ぶことで、コードの意図を明確にできます
- **可読性の重要性**：適切なループを選ぶことで、コードが読みやすくなり、保守しやすくなります
- **成果物**：ループ比較 - for文とwhile文の両方を使って同じ処理を実装し、違いを理解しました

### よくある場面

プログラミングの現場では、こんな会話がよくあります。

**新人開発者**: 「コードは動いているんですが、表示が遅くて…」
**先輩開発者**: 「ループの中で何をしているか見せて。あ、毎回DOM要素を取得してるね。これをループの外に出すだけで速くなるよ」

**新人開発者**: 「本当だ！すごく速くなりました！でも、なぜですか？」
**先輩開発者**: 「ループは同じ処理を何度も繰り返すから、少しの違いが大きな差になるんだ。これがパフォーマンスの考え方だよ」

実際の開発では：
- **SNSアプリ**：タイムラインに1000件の投稿を表示 → 効率的なループが必須
- **検索機能**：10万件のデータから条件に合うものを探す → 不要な処理を避ける
- **ゲーム**：1秒に60回画面を更新 → 1回でも遅いと動作がカクカクする
- **地図アプリ**：数千のマーカーを表示 → 最適化しないとブラウザがフリーズ

このように、パフォーマンスを意識したコードを書くことは、ユーザー体験を大きく左右します。

### 学習目標

今回のレッスンでは、ループのパフォーマンスについて学びます。

1. **ループの効率を理解する**
2. **不要な処理を避ける方法を学ぶ**
3. **最適化の基礎を習得する**

---

## パフォーマンスとは

プログラミングにおける**パフォーマンス**とは、プログラムがどれだけ速く、効率的に動作するかを表す指標です。

### パフォーマンスが重要な理由

**1. ユーザー体験の向上**
- 表示が速いアプリは使いやすい
- 待ち時間が長いとユーザーが離れる
- スムーズな動作が快適さを生む

**2. リソースの節約**
- バッテリーの消費を抑える
- サーバーの負荷を減らす
- データ通信量を削減

**3. スケーラビリティ**
- データ量が増えても動作する
- 多くのユーザーが同時に使える
- 将来の拡張に対応できる

### 日常生活での例え

料理を作る場面を考えてみましょう。

**非効率な方法**：
```
for (各料理) {
  冷蔵庫を開ける
  材料を1つ取る
  冷蔵庫を閉める
  料理する
}
```

**実行回数**：
- 料理が3品なら → 冷蔵庫の開閉を6回（開ける3回、閉める3回）
- 料理が10品なら → 冷蔵庫の開閉を20回
- 料理が100品なら → 冷蔵庫の開閉を200回

**効率的な方法**：
```
冷蔵庫を開ける
すべての材料を取る
冷蔵庫を閉める
for (各料理) {
  料理する
}
```

**実行回数**：
- 料理が何品でも → 冷蔵庫の開閉は2回だけ（開ける1回、閉める1回）

**時間の違い**：
- 冷蔵庫の開閉に1秒かかるとすると
- 非効率な方法（10品）：20秒
- 効率的な方法（10品）：2秒
- **差：18秒（9倍速い）**

プログラミングでも、まったく同じ考え方が重要です。ループは同じ処理を何度も繰り返すため、少しの違いが大きな差を生みます。

---

## ループの効率を理解する

### ループ内で避けるべき処理

ループの中で、**毎回同じ結果になる処理**を繰り返すのは非効率です。

#### 非効率な例：DOM要素を毎回取得

```javascript
// ❌ 非効率：毎回要素を取得している
for (let i = 0; i < 100; i++) {
  let result = document.getElementById("result");  // 100回実行される
  let p = document.createElement("p");
  p.textContent = i;
  result.appendChild(p);
}
```

**何が問題か**：

```
1回目：
  - document.getElementById("result") を実行 → result要素を取得
  - p要素を作成
  - resultに追加

2回目：
  - document.getElementById("result") を実行 → result要素を取得（また取得！）
  - p要素を作成
  - resultに追加

...（繰り返し）

100回目：
  - document.getElementById("result") を実行 → result要素を取得（100回目！）
  - p要素を作成
  - resultに追加
```

**問題点**：
- `document.getElementById("result")`が100回実行される
- 結果は毎回同じなのに、無駄な処理を繰り返している
- DOM操作は遅いため、これが積み重なると大きな遅延になる

#### 効率的な例：事前に取得

```javascript
// ✅ 効率的：ループの外で取得
let result = document.getElementById("result");  // 1回だけ実行

for (let i = 0; i < 100; i++) {
  let p = document.createElement("p");
  p.textContent = i;
  result.appendChild(p);
}
```

**実行の流れ**：

```
ループの前：
  - document.getElementById("result") を実行 → result要素を取得（1回だけ）

1回目：
  - p要素を作成
  - resultに追加（resultは既に取得済み）

2回目：
  - p要素を作成
  - resultに追加

...（繰り返し）

100回目：
  - p要素を作成
  - resultに追加
```

**改善点**：
- `document.getElementById("result")`が1回だけ実行される
- ループ内では既に取得した要素を再利用
- DOM操作が100回から1回に減少

**パフォーマンスの違い**：
- 非効率な方法：DOM要素の取得100回 + 要素の作成100回 + 追加100回 = **合計300回の操作**
- 効率的な方法：DOM要素の取得1回 + 要素の作成100回 + 追加100回 = **合計201回の操作**
- **差：99回の無駄な操作を削減**

### DOM操作が遅い理由

**DOM（Document Object Model）**とは、HTMLをJavaScriptから操作するための仕組みです。

**DOM操作が遅い理由**：
1. **ブラウザの内部構造にアクセス**：JavaScriptからブラウザの内部に問い合わせる必要がある
2. **画面の再描画**：要素を追加・変更すると、ブラウザが画面を再計算・再描画する
3. **複雑な処理**：要素の検索、スタイルの計算、レイアウトの調整など

**イメージ**：
```
JavaScript → 「IDがresultの要素を探して」 → ブラウザ
              ← 「見つかりました」 ←
```

この往復が毎回発生すると、遅くなります。

**解決策**：
- ループの外で1回だけ取得する
- 取得した要素を変数に保存して再利用する

---

## 不要な処理を避ける

### パターン1：計算の事前実行

ループ内で毎回同じ計算をするのは無駄です。

#### 非効率な例：毎回計算

```javascript
// ❌ 非効率：毎回配列の長さを取得
let numbers = [1, 2, 3, 4, 5];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
```

**実行の流れ**：

```
1回目：
  - i < numbers.length を評価（numbers.lengthを取得 → 5）
  - i < 5? → はい（0 < 5）
  - console.log(numbers[0]) → 1

2回目：
  - i < numbers.length を評価（numbers.lengthを取得 → 5）
  - i < 5? → はい（1 < 5）
  - console.log(numbers[1]) → 2

...（繰り返し）
```

**問題点**：
- `numbers.length`が毎回評価される
- 配列の長さは変わらないのに、毎回取得している

**注意**：
- 現代のJavaScriptエンジンは賢いので、`array.length`は自動で最適化されることが多い
- ただし、基本的な考え方として理解しておくことが重要

#### 効率的な例：長さを保存

```javascript
// ✅ 効率的：長さを変数に保存
let numbers = [1, 2, 3, 4, 5];
let length = numbers.length;  // 1回だけ取得

for (let i = 0; i < length; i++) {
  console.log(numbers[i]);
}
```

**実行の流れ**：

```
ループの前：
  - numbers.length を取得 → 5
  - length = 5 に保存

1回目：
  - i < length を評価（lengthは5）
  - i < 5? → はい（0 < 5）
  - console.log(numbers[0]) → 1

2回目：
  - i < length を評価（lengthは5、既に取得済み）
  - i < 5? → はい（1 < 5）
  - console.log(numbers[1]) → 2

...（繰り返し）
```

**改善点**：
- `numbers.length`の取得が1回だけ
- ループ内では保存した値を再利用

### パターン2：複雑な計算を避ける

ループ内で複雑な計算をする場合、事前に計算できるものは外に出します。

#### 非効率な例：毎回計算

```javascript
// ❌ 非効率：毎回円周率を使った計算
for (let i = 1; i <= 100; i++) {
  let area = Math.PI * i * i;  // 円の面積
  console.log("半径" + i + "の円の面積: " + area);
}
```

**問題点**：
- `Math.PI`は定数なので、毎回参照する必要はない
- 計算自体は必要だが、定数を変数に保存できる

#### 効率的な例：定数を保存

```javascript
// ✅ 効率的：円周率を変数に保存
let pi = Math.PI;  // 1回だけ取得

for (let i = 1; i <= 100; i++) {
  let area = pi * i * i;
  console.log("半径" + i + "の円の面積: " + area);
}
```

**注意**：
- この例では効果は小さいですが、考え方を理解することが重要
- より複雑な計算（関数呼び出しなど）では大きな差が出る

### パターン3：不要な処理のスキップ

continue文を使って、不要な処理をスキップすることもパフォーマンス向上につながります。

```javascript
for (let i = 1; i <= 100; i++) {
  // 偶数だけを処理したい場合
  if (i % 2 !== 0) {
    continue;  // 奇数は早めにスキップ
  }

  // ここから複雑な処理
  let result = i * i * i;  // 3乗の計算
  let formatted = "数値: " + result;
  console.log(formatted);
  // さらに処理が続く...
}
```

**実行の流れ**：

```
1回目（i = 1）：
  - i % 2 !== 0? → はい（1は奇数）
  - continue → スキップ（以下の処理は実行されない）

2回目（i = 2）：
  - i % 2 !== 0? → いいえ（2は偶数）
  - result = 2 * 2 * 2 = 8
  - formatted = "数値: 8"
  - console.log("数値: 8")

3回目（i = 3）：
  - i % 2 !== 0? → はい（3は奇数）
  - continue → スキップ

4回目（i = 4）：
  - i % 2 !== 0? → いいえ（4は偶数）
  - result = 4 * 4 * 4 = 64
  - formatted = "数値: 64"
  - console.log("数値: 64")
```

**効果**：
- 奇数のときは複雑な処理をスキップ
- 処理が必要なもの（偶数）だけを処理
- 全体の処理時間が約半分になる

---

## 最適化の基礎

### 計算量の概念

**計算量**とは、プログラムが処理を完了するのに必要な時間やメモリの量を表す概念です。

#### O(n) - 線形時間

```javascript
// O(n)：nに比例して処理時間が増える
for (let i = 0; i < n; i++) {
  console.log(i);
}
```

**実行回数**：
- nが10なら → 10回
- nが100なら → 100回
- nが1000なら → 1000回

**グラフ**：
```
処理時間
↑
|           *
|         *
|       *
|     *
|   *
| *
+----------→ データ量（n）
```

**特徴**：
- データ量に比例して処理時間が増える
- 予測しやすく、スケールしやすい
- 多くのループがこのパターン

#### O(n²) - 二乗時間

```javascript
// O(n²)：nの二乗に比例して処理時間が増える
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    console.log(i, j);
  }
}
```

**実行回数**：
- nが10なら → 10 × 10 = **100回**
- nが100なら → 100 × 100 = **10,000回**
- nが1000なら → 1000 × 1000 = **1,000,000回**

**グラフ**：
```
処理時間
↑
|                       *
|                   *
|               *
|           *
|       *
|   *
| *
+----------→ データ量（n）
```

**特徴**：
- データ量が2倍になると、処理時間が4倍になる
- データ量が10倍になると、処理時間が100倍になる
- 大量のデータでは非常に遅くなる

**比較表**：

| データ量（n） | O(n)の処理回数 | O(n²)の処理回数 | 差 |
|------------|--------------|----------------|-----|
| 10 | 10回 | 100回 | 10倍 |
| 100 | 100回 | 10,000回 | 100倍 |
| 1000 | 1,000回 | 1,000,000回 | 1000倍 |

**重要**：ループをネストする（入れ子にする）と、計算量が急激に増えます。できるだけシンプルなループを心がけましょう。

### ループの回数を減らす

最も効果的な最適化は、**ループの回数そのものを減らす**ことです。

#### 非効率な例：二重ループ

```javascript
// ❌ 非効率：すべての組み合わせをチェック
let numbers = [1, 2, 3, 4, 5];

for (let i = 0; i < numbers.length; i++) {
  for (let j = 0; j < numbers.length; j++) {
    if (i !== j && numbers[i] + numbers[j] === 5) {
      console.log(numbers[i] + " + " + numbers[j] + " = 5");
    }
  }
}
```

**実行の流れ**：

```
i=0, j=0: 1+1=2 → 違う
i=0, j=1: 1+2=3 → 違う
i=0, j=2: 1+3=4 → 違う
i=0, j=3: 1+4=5 → 一致！"1 + 4 = 5"
i=0, j=4: 1+5=6 → 違う
i=1, j=0: 2+1=3 → 違う
i=1, j=1: スキップ（i === j）
i=1, j=2: 2+3=5 → 一致！"2 + 3 = 5"
i=1, j=3: 2+4=6 → 違う
i=1, j=4: 2+5=7 → 違う
i=2, j=0: 3+1=4 → 違う
i=2, j=1: 3+2=5 → 一致！"3 + 2 = 5"（重複）
i=2, j=2: スキップ（i === j）
i=2, j=3: 3+4=7 → 違う
i=2, j=4: 3+5=8 → 違う
i=3, j=0: 4+1=5 → 一致！"4 + 1 = 5"（重複）
i=3, j=1: 4+2=6 → 違う
i=3, j=2: 4+3=7 → 違う
i=3, j=3: スキップ（i === j）
i=3, j=4: 4+5=9 → 違う
i=4, j=0: 5+1=6 → 違う
i=4, j=1: 5+2=7 → 違う
i=4, j=2: 5+3=8 → 違う
i=4, j=3: 5+4=9 → 違う
i=4, j=4: スキップ（i === j）

合計：25回のチェック
```

**問題点**：
- 5×5 = 25回のチェックが行われる
- "1 + 4 = 5"と"4 + 1 = 5"は同じペア（重複）
- "2 + 3 = 5"と"3 + 2 = 5"も同じペア（重複）

#### 効率的な例：重複をスキップ

```javascript
// ✅ 効率的：重複する組み合わせをスキップ
let numbers = [1, 2, 3, 4, 5];

for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {  // i+1から始める
    if (numbers[i] + numbers[j] === 5) {
      console.log(numbers[i] + " + " + numbers[j] + " = 5");
    }
  }
}
```

**実行の流れ**：

```
i=0, j=1: 1+2=3 → 違う
i=0, j=2: 1+3=4 → 違う
i=0, j=3: 1+4=5 → 一致！"1 + 4 = 5"
i=0, j=4: 1+5=6 → 違う
i=1, j=2: 2+3=5 → 一致！"2 + 3 = 5"
i=1, j=3: 2+4=6 → 違う
i=1, j=4: 2+5=7 → 違う
i=2, j=3: 3+4=7 → 違う
i=2, j=4: 3+5=8 → 違う
i=3, j=4: 4+5=9 → 違う

合計：10回のチェック
```

**改善点**：
- チェック回数が25回から10回に減少（60%削減）
- 重複するペアを排除
- 結果は同じだが、処理が速い

**なぜ速いのか**：
- `j = i + 1`から始めることで、既にチェックした組み合わせを避ける
- `i=0, j=3`で"1 + 4 = 5"をチェック済みなら、`i=3, j=0`で"4 + 1 = 5"をチェックする必要がない

### 実用的な最適化例

#### 例1：文字列の結合

**非効率な方法**：
```javascript
// ❌ 非効率：毎回新しい文字列を作成
let result = "";

for (let i = 1; i <= 1000; i++) {
  result = result + i + ",";  // 毎回新しい文字列を作成
}
```

**何が問題か**：

JavaScriptでは、文字列は**不変（イミュータブル）**です。つまり、一度作成した文字列は変更できません。

```
1回目：
  - result = "" + 1 + "," → 新しい文字列"1,"を作成
  - resultは"1,"になる

2回目：
  - result = "1," + 2 + "," → 新しい文字列"1,2,"を作成
  - resultは"1,2,"になる
  - 古い"1,"は捨てられる

3回目：
  - result = "1,2," + 3 + "," → 新しい文字列"1,2,3,"を作成
  - resultは"1,2,3,"になる
  - 古い"1,2,"は捨てられる

...（繰り返し）

1000回目：
  - result = "1,2,3,...,999," + 1000 + "," → 巨大な文字列を作成
  - 古い文字列は捨てられる
```

**問題点**：
- 毎回新しい文字列を作成している
- 古い文字列は捨てられる（メモリの無駄）
- 1000回の繰り返しで、1000個の文字列を作成→破棄を繰り返す

**効率的な方法**：
```javascript
// ✅ 効率的：配列に追加してから結合
let parts = [];

for (let i = 1; i <= 1000; i++) {
  parts.push(i);
}

let result = parts.join(",");  // 最後にまとめて結合
```

**実行の流れ**：

```
1回目：
  - parts.push(1) → parts = [1]

2回目：
  - parts.push(2) → parts = [1, 2]

3回目：
  - parts.push(3) → parts = [1, 2, 3]

...（繰り返し）

1000回目：
  - parts.push(1000) → parts = [1, 2, 3, ..., 1000]

ループ後：
  - parts.join(",") → "1,2,3,...,1000"を一度に作成
```

**改善点**：
- 配列への追加は高速
- 文字列の作成は最後の1回だけ
- メモリの無駄が少ない

**パフォーマンスの違い**：
- 非効率な方法：1000回の文字列作成
- 効率的な方法：1回の文字列作成
- **差：999回の無駄な文字列作成を削減**

#### 例2：条件の順序

頻繁に真になる条件を先に書くことで、不要なチェックを減らせます。

```javascript
// ✅ 条件の順序を工夫する
for (let i = 1; i <= 1000; i++) {
  // よくある条件を先にチェック
  if (i % 2 === 0) {  // 50%の確率で真
    continue;
  }

  if (i % 100 === 0) {  // 1%の確率で真
    // 処理
  }
}
```

**実行の流れ**：

```
i=1:
  - i % 2 === 0? → いいえ（奇数）
  - i % 100 === 0? → いいえ
  - 処理を続ける

i=2:
  - i % 2 === 0? → はい（偶数）
  - continue → スキップ（i % 100のチェックをしない）

i=3:
  - i % 2 === 0? → いいえ（奇数）
  - i % 100 === 0? → いいえ
  - 処理を続ける

i=4:
  - i % 2 === 0? → はい（偶数）
  - continue → スキップ

...（繰り返し）

i=100:
  - i % 2 === 0? → はい（偶数）
  - continue → スキップ（i % 100のチェックをしない）
```

**効果**：
- 偶数のときは2つ目の条件をチェックしない
- 1000回のループで、約500回の無駄なチェックを削減

---

## 実践例：効率的ループの比較

HTMLとJavaScriptを組み合わせて、効率的なループと非効率なループを比較してみましょう。

### HTML（index.html）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>効率的ループ</title>
</head>
<body>
    <h1>ループのパフォーマンス比較</h1>
    <button id="slowVersion">非効率なバージョン</button>
    <button id="fastVersion">効率的なバージョン</button>
    <div id="result"></div>
    <div id="time"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript（script.js）

```javascript
let slowVersion = document.getElementById("slowVersion");
let fastVersion = document.getElementById("fastVersion");
let result = document.getElementById("result");
let timeDisplay = document.getElementById("time");

// 非効率なバージョン
slowVersion.addEventListener("click", function() {
  result.innerHTML = "";
  let startTime = Date.now();

  // 非効率：毎回要素を取得
  for (let i = 1; i <= 100; i++) {
    let resultElement = document.getElementById("result");
    let p = document.createElement("p");
    p.textContent = i;
    resultElement.appendChild(p);
  }

  let endTime = Date.now();
  timeDisplay.textContent = "処理時間: " + (endTime - startTime) + "ミリ秒";
});

// 効率的なバージョン
fastVersion.addEventListener("click", function() {
  result.innerHTML = "";
  let startTime = Date.now();

  // 効率的：事前に要素を取得
  let resultElement = document.getElementById("result");

  for (let i = 1; i <= 100; i++) {
    let p = document.createElement("p");
    p.textContent = i;
    resultElement.appendChild(p);
  }

  let endTime = Date.now();
  timeDisplay.textContent = "処理時間: " + (endTime - startTime) + "ミリ秒";
});
```

### コードの詳しい説明

#### 処理時間の計測

```javascript
let startTime = Date.now();
// 処理
let endTime = Date.now();
timeDisplay.textContent = "処理時間: " + (endTime - startTime) + "ミリ秒";
```

**実行の流れ**：

```
1. Date.now()を実行
   → 現在時刻をミリ秒で取得（例：1700000000000）
   → startTimeに保存

2. 処理を実行
   → ループで100個の要素を作成・追加

3. Date.now()を実行
   → 処理後の時刻をミリ秒で取得（例：1700000000050）
   → endTimeに保存

4. 差分を計算
   → endTime - startTime = 1700000000050 - 1700000000000 = 50
   → "処理時間: 50ミリ秒"を表示
```

**Date.now()とは**：
- 1970年1月1日からの経過時間をミリ秒で返す関数
- 処理前後の時刻を記録して、差分で処理時間を計測できる

#### 非効率なバージョン

```javascript
for (let i = 1; i <= 100; i++) {
  let resultElement = document.getElementById("result");  // 100回実行
  let p = document.createElement("p");
  p.textContent = i;
  resultElement.appendChild(p);
}
```

**実行の詳細**：

```
1回目（i = 1）：
  - document.getElementById("result")を実行 → result要素を取得
  - document.createElement("p")を実行 → p要素を作成
  - p.textContent = 1
  - resultElement.appendChild(p) → p要素を追加

2回目（i = 2）：
  - document.getElementById("result")を実行 → result要素を取得（また！）
  - document.createElement("p")を実行 → p要素を作成
  - p.textContent = 2
  - resultElement.appendChild(p) → p要素を追加

...（繰り返し）

100回目（i = 100）：
  - document.getElementById("result")を実行 → result要素を取得（100回目！）
  - document.createElement("p")を実行 → p要素を作成
  - p.textContent = 100
  - resultElement.appendChild(p) → p要素を追加
```

**処理回数**：
- `getElementById()`：100回
- `createElement()`：100回
- `appendChild()`：100回
- **合計：300回の操作**

#### 効率的なバージョン

```javascript
let resultElement = document.getElementById("result");  // 1回だけ実行

for (let i = 1; i <= 100; i++) {
  let p = document.createElement("p");
  p.textContent = i;
  resultElement.appendChild(p);
}
```

**実行の詳細**：

```
ループの前：
  - document.getElementById("result")を実行 → result要素を取得
  - resultElementに保存

1回目（i = 1）：
  - document.createElement("p")を実行 → p要素を作成
  - p.textContent = 1
  - resultElement.appendChild(p) → p要素を追加（既に取得済み）

2回目（i = 2）：
  - document.createElement("p")を実行 → p要素を作成
  - p.textContent = 2
  - resultElement.appendChild(p) → p要素を追加

...（繰り返し）

100回目（i = 100）：
  - document.createElement("p")を実行 → p要素を作成
  - p.textContent = 100
  - resultElement.appendChild(p) → p要素を追加
```

**処理回数**：
- `getElementById()`：1回
- `createElement()`：100回
- `appendChild()`：100回
- **合計：201回の操作**

**比較**：
- 非効率なバージョン：300回の操作
- 効率的なバージョン：201回の操作
- **差：99回の無駄な操作を削減（33%の削減）**

---

## 最適化の注意点

### 1. 可読性とのバランス

過度な最適化は、コードを読みにくくする可能性があります。

#### 読みやすいが少し遅いコード

```javascript
// ✅ 読みやすい
for (let i = 0; i < array.length; i++) {
  processItem(array[i]);
}
```

**特徴**：
- シンプルで理解しやすい
- 初心者でも読める
- メンテナンスしやすい

#### 速いが読みにくいコード

```javascript
// ❌ 速いが読みにくい
for (let i = 0, len = array.length, item; i < len; item = array[i++]) {
  processItem(item);
}
```

**特徴**：
- 複数の変数を同時に宣言
- 更新処理を条件式に含める
- 何をしているのか理解しにくい

**推奨**：
- まずは読みやすいコードを書く
- 本当に遅い場合だけ最適化する
- チームメンバーが理解できることが重要

### 2. 早すぎる最適化は避ける

> 早すぎる最適化は諸悪の根源である - Donald Knuth（コンピュータサイエンスの権威）

**意味**：
- 最初から最適化を考えすぎない
- まずは動くコードを書く
- 本当に遅い部分だけを最適化する

**理由**：
1. **開発時間の無駄**：最適化に時間をかけすぎる
2. **複雑性の増加**：コードが読みにくくなる
3. **誤った最適化**：実際には遅くない部分を最適化してしまう

**正しい手順**：
```
1. 動くコードを書く
   ↓
2. テストする
   ↓
3. 遅い部分を特定する（計測）
   ↓
4. その部分だけを最適化する
   ↓
5. 再度テストする
```

### 3. 実測する

推測ではなく、**実際に計測して確認**しましょう。

#### console.time()とconsole.timeEnd()

```javascript
console.time("処理A");
// 処理A
for (let i = 0; i < 10000; i++) {
  // 処理
}
console.timeEnd("処理A");

console.time("処理B");
// 処理B
for (let i = 0; i < 10000; i++) {
  // 処理
}
console.timeEnd("処理B");
```

**出力例**：
```
処理A: 45.123ms
処理B: 23.456ms
```

**使い方**：
- `console.time("ラベル")`：計測開始
- `console.timeEnd("ラベル")`：計測終了・結果表示
- 同じラベルを使う必要がある

**活用例**：
```javascript
// パターンAの計測
console.time("パターンA");
let result = "";
for (let i = 1; i <= 1000; i++) {
  result = result + i + ",";
}
console.timeEnd("パターンA");

// パターンBの計測
console.time("パターンB");
let parts = [];
for (let i = 1; i <= 1000; i++) {
  parts.push(i);
}
let result2 = parts.join(",");
console.timeEnd("パターンB");
```

**出力例**：
```
パターンA: 12.345ms
パターンB: 1.234ms
```

→ パターンBの方が約10倍速いことがわかる

---

## よくある間違いとその対策

### 間違い1：過度な最適化

```javascript
// ❌ 間違い：読みにくすぎる
for(let i=0,l=a.length;i<l;){p(a[i++]);}
```

**何が問題か**：
- 変数名が短すぎて意味不明（`i`, `l`, `a`, `p`）
- 改行がなく、詰め込みすぎ
- チームメンバーが理解できない

**✅ 対策**：

```javascript
// ✅ 正しい：読みやすさを優先
for (let i = 0; i < array.length; i++) {
  processItem(array[i]);
}
```

### 間違い2：無意味な最適化

```javascript
// ❌ 間違い：効果がない最適化
let two = 2;  // 定数を変数に保存
for (let i = 0; i < 100; i++) {
  let result = i * two;  // twoを使う
}
```

**何が問題か**：
- `2`は定数なので、変数に保存する必要はない
- JavaScriptエンジンが自動で最適化する
- コードが冗長になるだけ

**✅ 対策**：

```javascript
// ✅ 正しい：シンプルに書く
for (let i = 0; i < 100; i++) {
  let result = i * 2;
}
```

### 間違い3：計測せずに最適化

```javascript
// ❌ 間違い：推測で最適化
// 「この部分が遅そうだから最適化しよう」
```

**何が問題か**：
- 実際には遅くない部分を最適化している可能性
- 本当に遅い部分を見逃している可能性
- 時間の無駄

**✅ 対策**：

```javascript
// ✅ 正しい：計測してから最適化
console.time("処理");
// 処理
console.timeEnd("処理");

// 結果を見て、本当に遅い部分だけを最適化
```

---

## 練習問題

### 課題：効率的ループ

ループの効率を意識して、1から100までの数字を表示するプログラムを作成してください。

### 保存場所

`exercises/lesson-084/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 要件

1. **ボタン**をクリックすると、1から100までの数字を表示する
2. **DOM要素の取得はループの外**で行う（効率的な実装）
3. **処理時間を計測**して表示する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-084
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

効率的なループを実装する際のポイントを確認しましょう。

#### DOM要素の取得

```javascript
// ❌ 非効率：ループ内で取得
for (let i = 1; i <= 100; i++) {
  let result = document.getElementById("result");  // 100回
  // 処理
}

// ✅ 効率的：ループの外で取得
let result = document.getElementById("result");  // 1回
for (let i = 1; i <= 100; i++) {
  // 処理
}
```

**ポイント**：
- `getElementById()`はループの外で実行
- 1回だけ取得して、変数に保存
- ループ内では保存した変数を使う

#### 処理時間の計測

```javascript
// 開始時刻を記録
let startTime = Date.now();

// ループ処理
for (let i = 1; i <= 100; i++) {
  // 処理
}

// 終了時刻を記録
let endTime = Date.now();

// 差分を計算して表示
let elapsedTime = endTime - startTime;
timeDisplay.textContent = "処理時間: " + elapsedTime + "ミリ秒";
```

**ポイント**：
- `Date.now()`で現在時刻（ミリ秒）を取得
- 処理前後の時刻を記録
- 差分で処理時間を計算

#### ループの構造

```javascript
// シンプルなループ
for (let i = 1; i <= 100; i++) {
  let p = document.createElement("p");
  p.textContent = i;
  result.appendChild(p);
}
```

**ポイント**：
- 不要な処理をループの外に出す
- シンプルで読みやすいコードを心がける
- 必要な処理だけをループ内に書く

### 解答例

**HTML（index.html）**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 084</title>
</head>
<body>
    <h1>効率的なループ</h1>
    <button id="generate">1から100まで表示</button>
    <div id="result"></div>
    <div id="time"></div>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript（script.js）**

```javascript
let generate = document.getElementById("generate");
let result = document.getElementById("result");
let timeDisplay = document.getElementById("time");

generate.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  // 処理時間の計測開始
  let startTime = Date.now();

  // 効率的な実装：DOM要素を事前に取得
  let resultElement = document.getElementById("result");

  // 1から100まで繰り返す
  for (let i = 1; i <= 100; i++) {
    let p = document.createElement("p");
    p.textContent = i;
    resultElement.appendChild(p);
  }

  // 処理時間の計測終了
  let endTime = Date.now();
  timeDisplay.textContent = "処理時間: " + (endTime - startTime) + "ミリ秒";
});
```

### 解説

このコードでは、効率的なループを実装しています。

#### DOM要素の事前取得

```javascript
let resultElement = document.getElementById("result");
```

**実行の流れ**：

```
ループの前：
  - document.getElementById("result")を実行
  - 結果をresultElementに保存

ループ中：
  - resultElement（既に取得済み）を使って要素を追加
  - DOM要素の取得は行わない
```

**効果**：
- `getElementById()`の実行回数：100回 → 1回
- 99回の無駄なDOM操作を削減
- 処理が高速化

#### 処理時間の計測

```javascript
let startTime = Date.now();
// 処理
let endTime = Date.now();
timeDisplay.textContent = "処理時間: " + (endTime - startTime) + "ミリ秒";
```

**実行の詳細**：

```
1. Date.now()を実行
   → 現在時刻をミリ秒で取得
   → 例：1700000000000（2023年11月15日のある時刻）
   → startTimeに保存

2. ループ処理を実行
   → 100個のp要素を作成・追加

3. Date.now()を実行
   → 処理後の時刻をミリ秒で取得
   → 例：1700000000050（50ミリ秒後）
   → endTimeに保存

4. 差分を計算
   → endTime - startTime
   → 1700000000050 - 1700000000000
   → 50ミリ秒

5. 結果を表示
   → "処理時間: 50ミリ秒"
```

**活用**：
- 処理時間を可視化できる
- 最適化の効果を確認できる
- パフォーマンスの問題を発見できる

#### 非効率な実装との比較

```javascript
// ❌ 非効率な実装（比較用）
for (let i = 1; i <= 100; i++) {
  let resultElement = document.getElementById("result");  // 100回
  let p = document.createElement("p");
  p.textContent = i;
  resultElement.appendChild(p);
}

// ✅ 効率的な実装（推奨）
let resultElement = document.getElementById("result");  // 1回
for (let i = 1; i <= 100; i++) {
  let p = document.createElement("p");
  p.textContent = i;
  resultElement.appendChild(p);
}
```

**処理回数の比較**：

| 操作 | 非効率な実装 | 効率的な実装 | 削減 |
|------|------------|------------|------|
| getElementById() | 100回 | 1回 | 99回 |
| createElement() | 100回 | 100回 | 0回 |
| appendChild() | 100回 | 100回 | 0回 |
| **合計** | **300回** | **201回** | **99回（33%削減）** |

**スケールの影響**：

| ループ回数 | 非効率な実装の処理回数 | 効率的な実装の処理回数 | 削減回数 |
|-----------|---------------------|---------------------|---------|
| 100 | 300回 | 201回 | 99回 |
| 1,000 | 3,000回 | 2,001回 | 999回 |
| 10,000 | 30,000回 | 20,001回 | 9,999回 |

→ ループ回数が増えるほど、最適化の効果が大きくなる

---

## まとめ

お疲れ様でした。今回のレッスンでは、ループのパフォーマンスについて学びました。

### 今回学んだキーポイント

1. **ループの効率**
   - ループ内で毎回同じ処理を繰り返すのは非効率
   - DOM要素の取得や計算は、可能な限りループの外で行う
   - 少しの違いが、ループ回数が多い場合に大きな差を生む

2. **不要な処理を避ける**
   - **事前取得**：DOM要素や配列の長さを事前に取得して変数に保存
   - **早期スキップ**：continue文で不要な処理を早めにスキップ
   - **条件の順序**：頻繁に真になる条件を先にチェック

3. **最適化の基礎**
   - **計算量の概念**：O(n)とO(n²)の違いを理解
   - **ループ回数の削減**：二重ループの重複を避ける
   - **文字列の結合**：配列とjoin()を使う

4. **バランスの重要性**
   - **可読性優先**：まずは読みやすいコードを書く
   - **早すぎる最適化は避ける**：動くコードを書いてから最適化
   - **実測する**：推測ではなく、console.time()で計測

5. **実践的なテクニック**
   - **Date.now()**で処理時間を計測
   - **console.time()/timeEnd()**でパフォーマンスを測定
   - 本当に遅い部分だけを最適化

### カリキュラム項目の確認

- ✅ **ループの効率**：DOM要素の取得回数を減らす、計算の事前実行など、ループを効率化する方法を学びました
- ✅ **不要な処理を避ける**：continue文でのスキップ、条件の順序、事前計算など、無駄な処理を削減する技術を習得しました
- ✅ **最適化の基礎**：計算量の概念（O(n)、O(n²)）、ループ回数の削減、文字列結合の最適化を理解しました
- ✅ **知識：計算量の概念**：線形時間と二乗時間の違い、ネストしたループの危険性を学びました
- ✅ **知識：効率的なコード**：パフォーマンスと可読性のバランス、実測の重要性を理解しました
- ✅ **成果物：効率的ループ**：DOM要素の事前取得と処理時間の計測を実装しました

### 重要なポイント

**効率的なループを書くための手順**：

1. **まず動くコードを書く**
   - 正確に動作することが最優先
   - 可読性を重視する

2. **計測する**
   - `Date.now()`や`console.time()`で処理時間を測定
   - 本当に遅い部分を特定

3. **最適化する**
   - ループの外に出せる処理を探す
   - 不要な処理を削除
   - シンプルな構造にする

4. **再度計測する**
   - 最適化の効果を確認
   - 可読性が損なわれていないかチェック

**よくある最適化パターン**：

```javascript
// パターン1：DOM要素の事前取得
let element = document.getElementById("target");
for (let i = 0; i < 100; i++) {
  element.appendChild(/* ... */);
}

// パターン2：配列の長さを保存
let length = array.length;
for (let i = 0; i < length; i++) {
  // 処理
}

// パターン3：文字列はjoin()で結合
let parts = [];
for (let i = 0; i < 1000; i++) {
  parts.push(i);
}
let result = parts.join(",");
```

### 次のステップ

次のレッスンでは、**週のプロジェクト：タイピングゲーム**を作成します。

- タイピングゲームの実装
- 時間制限の管理
- スコア計算

これまで学んだループの知識を総合的に活用していきましょう。パフォーマンスを意識しながら、実用的なゲームを作成します。

**練習問題を解いて、効率的なコードの書き方をマスターしましょう！**
