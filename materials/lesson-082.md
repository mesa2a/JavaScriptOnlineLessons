---
title: "Lesson 082: continue文"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン82：continue文

## このレッスンで学ぶこと

このレッスンでは、**ループの一部をスキップするcontinue文**について学びます。

前回のレッスンでは、ループとDOM操作を組み合わせて、複数のHTML要素を自動生成する方法を学びました。今回は、ループの中で**特定の条件のときだけ処理をスキップする**技術を習得します。

```javascript
// これまで学んだこと：すべての数字を表示
for (let i = 1; i <= 10; i++) {
  console.log(i);  // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
}

// 今回学ぶこと：奇数をスキップして偶数だけ表示
for (let i = 1; i <= 10; i++) {
  if (i % 2 !== 0) {
    continue;  // 奇数はスキップ
  }
  console.log(i);  // 2, 4, 6, 8, 10
}
```

**このレッスンで習得できること：**
- ループの一部をスキップする方法を理解できる
- 特定の条件に合うものだけを処理できる
- データをフィルタリングする技術を身につけられる
- 不要なデータを効率的に除外できる

### 前回の復習

前回のレッスンでは、**ループとDOM操作**について学びました：

```javascript
// ループでHTML要素を自動生成
for (let i = 1; i <= 20; i++) {
  const div = document.createElement("div");
  div.textContent = "アイテム" + i;
  result.appendChild(div);
}
```

**復習のポイント：**
- ✅ **要素を繰り返し作成**：`createElement()`をループの中で使う
- ✅ **リストの自動生成**：forループで複数の要素を作る
- ✅ **番号付け**：ループ変数`i`を使って番号を付ける
- ✅ **成果物**：1から20までの番号付きリスト

### よくある場面

continue文を使ったスキップ処理は、実際のプログラミングで非常によく使われます。

**例1：検索結果のフィルタリング**
```
商品一覧から在庫切れの商品を除外して表示する

for (各商品) {
  if (在庫切れ) {
    continue;  // この商品はスキップ
  }
  商品を表示
}
```

**例2：エラーデータの除外**
```
ログファイルから正常なデータだけを処理する

for (各ログ) {
  if (エラーログ) {
    continue;  // エラーは無視
  }
  ログを分析
}
```

**例3：出席確認**
```
クラスの名簿から欠席者を除いて点呼する

for (各生徒) {
  if (欠席) {
    continue;  // 欠席者はスキップ
  }
  名前を呼ぶ
}
```

**例4：メール配信**
```
メール配信リストから配信停止者を除外する

for (各ユーザー) {
  if (配信停止) {
    continue;  // このユーザーには送らない
  }
  メールを送信
}
```

**このレッスンで学ぶcontinue文は、これらすべての場面で使われている基本技術です。**

### 学習目標

今回のレッスンでは、以下の3つを習得します：

- ✅ **スキップ処理**：ループの一部を飛ばす方法を学ぶ
- ✅ **特定条件を除外**：条件に合わないものを除外する
- ✅ **フィルタリング**：必要なデータだけを残す技術
- ✅ **成果物**：偶数だけを表示するプログラムを作成する

## continue文とは

### 基本的な概念

**continue文**とは、**現在のループ処理だけをスキップして、次のループに進む命令**です。

```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;  // i=3のときだけスキップ
  }
  console.log(i);
}
```

**実行結果：**
```
1
2
4
5
```

**3はスキップされて表示されません。**

### 動作の流れを詳しく見る

上記のコードがどのように動作するのか、1ステップずつ見ていきましょう。

**1回目のループ（i = 1）：**
```javascript
// 1. 条件チェック
if (1 === 3) {  // false
  continue;
}
// 2. falseなのでcontinueは実行されない
console.log(1);  // 「1」が表示される
// 3. i++でi=2になる
```

**2回目のループ（i = 2）：**
```javascript
// 1. 条件チェック
if (2 === 3) {  // false
  continue;
}
// 2. falseなのでcontinueは実行されない
console.log(2);  // 「2」が表示される
// 3. i++でi=3になる
```

**3回目のループ（i = 3）：**
```javascript
// 1. 条件チェック
if (3 === 3) {  // true
  continue;  // ← ここでスキップ！
}
// 2. この行以降は実行されない
console.log(3);  // 実行されない（3は表示されない）
// 3. i++でi=4になる（ループの更新は実行される）
```

**4回目のループ（i = 4）：**
```javascript
// 1. 条件チェック
if (4 === 3) {  // false
  continue;
}
// 2. falseなのでcontinueは実行されない
console.log(4);  // 「4」が表示される
// 3. i++でi=5になる
```

**5回目のループ（i = 5）：**
```javascript
// 1. 条件チェック
if (5 === 3) {  // false
  continue;
}
// 2. falseなのでcontinueは実行されない
console.log(5);  // 「5」が表示される
// 3. i++でi=6になる
```

**6回目のチェック（i = 6）：**
```javascript
// i = 6のとき、i <= 5 は false
// → ループ終了
```

**重要なポイント：**
- continueは「この回のループの処理をスキップ」する
- スキップしても**次のループには進む**
- ループの更新式（`i++`）は**実行される**

### 図解：continue文の流れ

```
      for (let i = 1; i <= 5; i++)
            ↓
      ┌─────────┐
   ┌→ │ i <= 5? │
   │  └─────────┘
   │       ↓ true
   │  ┌─────────┐
   │  │ i === 3?│
   │  └─────────┘
   │    ↙      ↘
   │  true    false
   │   ↓        ↓
   │ continue  console.log(i)
   │   ↓        ↓
   │  ┌─────────┐
   │  │  i++    │
   │  └─────────┘
   │       ↓
   └───────┘
         ↓ false
     ループ終了
```

**continueが実行されると：**
- その後の処理（`console.log(i)`）はスキップされる
- でも`i++`は実行される
- 次のループに進む

## break文とcontinue文の違い

前回のレッスンで学んだ`break`文と`continue`文の違いを理解しましょう。

### break文：ループを終了

```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    break;  // ループを終了
  }
  console.log(i);
}
```

**実行結果：**
```
1
2
```

**i=3になった時点でループが終了します。4と5は処理されません。**

### continue文：現在の処理をスキップ

```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;  // 現在の処理をスキップ
  }
  console.log(i);
}
```

**実行結果：**
```
1
2
4
5
```

**i=3のときだけスキップして、4と5は処理されます。**

### 比較表

| 項目 | break | continue |
|------|-------|----------|
| 意味 | ループを終了 | 現在の処理をスキップ |
| ループの継続 | ループ全体が終了 | 次のループに進む |
| 使用場面 | 条件を満たしたら終了 | 条件を満たしたらスキップ |
| 実行例 | 目的の値を見つけたら終了 | 不要な値を除外して処理 |

**図解：breakとcontinueの違い**

```
【break】
i=1 → 処理 → i=2 → 処理 → i=3 → break → 終了
                                  ↓
                              4と5は処理されない

【continue】
i=1 → 処理 → i=2 → 処理 → i=3 → continue → i=4 → 処理 → i=5 → 処理
                                  ↓
                            3だけスキップ、4と5は処理
```

### 日常生活での例え

**break：映画館で席を探す**
```
for (各座席) {
  if (空いている席を見つけた) {
    break;  // 探すのをやめる（ループ終了）
  }
}
```
→ 座席を見つけたら、それ以上探さない

**continue：出席確認**
```
for (各生徒) {
  if (欠席) {
    continue;  // この生徒はスキップ
  }
  名前を呼ぶ
}
```
→ 欠席者はスキップして、次の生徒の確認を続ける

## 偶数と奇数のフィルタリング

continue文の最も基本的な使い方は、**偶数と奇数のフィルタリング**です。

### 偶数だけを表示

```javascript
for (let i = 1; i <= 10; i++) {
  if (i % 2 !== 0) {
    continue;  // 奇数はスキップ
  }
  console.log(i);
}
```

**実行結果：**
```
2
4
6
8
10
```

**動作の流れ：**

**i = 1のとき：**
```javascript
i % 2 !== 0  // 1 % 2 = 1、1 !== 0 は true
continue;    // スキップ
// console.log(1) は実行されない
```

**i = 2のとき：**
```javascript
i % 2 !== 0  // 2 % 2 = 0、0 !== 0 は false
// continueは実行されない
console.log(2);  // 「2」が表示される
```

**i = 3のとき：**
```javascript
i % 2 !== 0  // 3 % 2 = 1、1 !== 0 は true
continue;    // スキップ
// console.log(3) は実行されない
```

**i = 4のとき：**
```javascript
i % 2 !== 0  // 4 % 2 = 0、0 !== 0 は false
// continueは実行されない
console.log(4);  // 「4」が表示される
```

**このように、奇数のときだけcontinueが実行され、偶数だけが表示されます。**

### 奇数だけを表示

```javascript
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue;  // 偶数はスキップ
  }
  console.log(i);
}
```

**実行結果：**
```
1
3
5
7
9
```

**条件を逆にすれば、奇数だけを表示できます。**

### 剰余演算子の復習

**`%`（剰余演算子）は、割り算の余りを求める演算子です：**

```javascript
5 % 2  // → 1（5÷2=2あまり1）
6 % 2  // → 0（6÷2=3あまり0）
7 % 2  // → 1（7÷2=3あまり1）
8 % 2  // → 0（8÷2=4あまり0）
```

**偶数・奇数の判定：**
- `i % 2 === 0`：偶数（2で割り切れる）
- `i % 2 !== 0`：奇数（2で割り切れない）

## 特定の倍数のフィルタリング

continue文は、偶数・奇数だけでなく、さまざまなフィルタリングに使えます。

### 3の倍数をスキップ

```javascript
for (let i = 1; i <= 15; i++) {
  if (i % 3 === 0) {
    continue;  // 3の倍数はスキップ
  }
  console.log(i);
}
```

**実行結果：**
```
1
2
4
5
7
8
10
11
13
14
```

**3、6、9、12、15がスキップされます。**

### 5の倍数だけを表示

```javascript
for (let i = 1; i <= 50; i++) {
  if (i % 5 !== 0) {
    continue;  // 5の倍数以外はスキップ
  }
  console.log(i + "は5の倍数です");
}
```

**実行結果：**
```
5は5の倍数です
10は5の倍数です
15は5の倍数です
20は5の倍数です
25は5の倍数です
30は5の倍数です
35は5の倍数です
40は5の倍数です
45は5の倍数です
50は5の倍数です
```

### 複数の値をスキップ

```javascript
for (let i = 1; i <= 10; i++) {
  if (i === 3 || i === 5 || i === 7) {
    continue;  // 3、5、7をスキップ
  }
  console.log(i);
}
```

**実行結果：**
```
1
2
4
6
8
9
10
```

**`||`（または）を使って、複数の条件を指定できます。**

## continue文とDOM操作

continue文をDOM操作と組み合わせることで、条件に合う要素だけを表示できます。

### 偶数の番号だけを表示

```javascript
const result = document.getElementById("result");

// 前回の結果をクリア
result.innerHTML = "";

// 1から20まで繰り返す
for (let i = 1; i <= 20; i++) {
  // 奇数はスキップ
  if (i % 2 !== 0) {
    continue;
  }

  // 偶数だけ表示
  const p = document.createElement("p");
  p.textContent = i + "は偶数です";
  result.appendChild(p);
}
```

**実行結果（画面に表示される）：**
```
2は偶数です
4は偶数です
6は偶数です
8は偶数です
10は偶数です
12は偶数です
14は偶数です
16は偶数です
18は偶数です
20は偶数です
```

**動作の流れ：**

**i = 1のとき：**
```javascript
if (1 % 2 !== 0) {  // true
  continue;         // スキップ
}
// 要素は作られない
```

**i = 2のとき：**
```javascript
if (2 % 2 !== 0) {  // false
  continue;
}
// continueは実行されない
const p = document.createElement("p");
p.textContent = "2は偶数です";
result.appendChild(p);  // 「2は偶数です」が表示される
```

**i = 3のとき：**
```javascript
if (3 % 2 !== 0) {  // true
  continue;         // スキップ
}
// 要素は作られない
```

**このように、奇数のときは要素が作られず、偶数のときだけ要素が作られます。**

### 5の倍数だけを表示

```javascript
const result = document.getElementById("result");
result.innerHTML = "";

for (let i = 1; i <= 50; i++) {
  // 5の倍数以外はスキップ
  if (i % 5 !== 0) {
    continue;
  }

  // 5の倍数だけ表示
  const div = document.createElement("div");
  div.textContent = i;
  result.appendChild(div);
}
```

**実行結果（画面に表示される）：**
```
5
10
15
20
25
30
35
40
45
50
```

**50個のループを回しても、表示されるのは10個だけです。**

## 実用的なフィルタリング例

continue文を使った実用的なフィルタリングの例を見てみましょう。

### 例1：空の値をスキップ

```javascript
const items = ["りんご", "", "みかん", "", "ぶどう", "バナナ", ""];
const result = document.getElementById("result");
result.innerHTML = "";

for (let i = 0; i < items.length; i++) {
  // 空の要素はスキップ
  if (items[i] === "") {
    continue;
  }

  const p = document.createElement("p");
  p.textContent = items[i];
  result.appendChild(p);
}
```

**実行結果：**
```
りんご
みかん
ぶどう
バナナ
```

**空文字列（`""`）の要素はスキップされて表示されません。**

### 例2：範囲外の値をスキップ

```javascript
for (let i = 1; i <= 100; i++) {
  // 10未満または90より大きい値はスキップ
  if (i < 10 || i > 90) {
    continue;
  }

  console.log(i);
}
```

**実行結果：**
```
10
11
12
...
88
89
90
```

**10から90までの範囲だけが表示されます。**

### 例3：特定の文字列を除外

```javascript
const colors = ["赤", "青", "緑", "黄", "青", "紫", "青"];
const result = document.getElementById("result");
result.innerHTML = "";

for (let i = 0; i < colors.length; i++) {
  // 「青」は除外
  if (colors[i] === "青") {
    continue;
  }

  const p = document.createElement("p");
  p.textContent = colors[i];
  result.appendChild(p);
}
```

**実行結果：**
```
赤
緑
黄
紫
```

**「青」だけが除外されます。**

## continueを使わない書き方との比較

continue文を使わずに、同じ結果を得ることもできます。

### パターン1：continue文を使う場合

```javascript
for (let i = 1; i <= 10; i++) {
  if (i % 2 !== 0) {
    continue;  // 奇数をスキップ
  }
  console.log(i);
}
```

**メリット：**
- ✅ 除外条件が明確
- ✅ 早期リターンのパターン（ガード節）
- ✅ ネストが浅い

### パターン2：if文だけを使う場合

```javascript
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {  // 偶数の場合
    console.log(i);
  }
}
```

**メリット：**
- ✅ シンプル
- ✅ 条件が1つだけなら読みやすい

### どちらを使うべきか？

**シンプルな場合：if文だけで十分**
```javascript
// if文だけ（わかりやすい）
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}
```

**処理が複雑な場合：continueの方が読みやすい**
```javascript
// continue文を使う（ネストが浅い）
for (let i = 1; i <= 100; i++) {
  // 除外条件を先に書く
  if (i % 3 === 0) {
    continue;
  }

  // メインの処理（ネストが浅い）
  let result = i * i;
  console.log("数値: " + i);
  console.log("2乗: " + result);
  // さらに処理が続く...
}

// if文だけを使う場合（ネストが深い）
for (let i = 1; i <= 100; i++) {
  if (i % 3 !== 0) {  // 除外条件の否定
    // メインの処理（1段ネストが深い）
    let result = i * i;
    console.log("数値: " + i);
    console.log("2乗: " + result);
    // さらに処理が続く...
  }
}
```

**continueを使うと：**
- 除外条件を先に書ける（ガード節）
- メインの処理のネストが浅くなる
- 「この条件のときは何もしない」が明確になる

## while文でのcontinue

continue文は、while文でも使うことができます。

### while文での基本的な使い方

```javascript
let i = 0;

while (i < 10) {
  i++;  // ← 重要：continueの前に更新！

  // 偶数はスキップ
  if (i % 2 === 0) {
    continue;
  }

  console.log(i);
}
```

**実行結果：**
```
1
3
5
7
9
```

### 重要な注意点

**while文でcontinueを使う場合、カウンタの更新（`i++`）をcontinueの前に書く必要があります。**

**✓ 正しい書き方：**
```javascript
let i = 0;

while (i < 10) {
  i++;  // continueの前に更新

  if (i % 2 === 0) {
    continue;
  }

  console.log(i);
}
```

**✗ 間違った書き方（無限ループになる）：**
```javascript
let i = 0;

while (i < 10) {
  if (i % 2 === 0) {
    continue;  // iが偶数のときcontinue
  }

  console.log(i);
  i++;  // continueでスキップされると、ここに到達しない！
}
```

**何が起こるか：**
```
i = 0のとき：
  - i % 2 === 0 は true
  - continue でスキップ
  - i++ は実行されない
  - iは0のまま
  - 無限ループ！
```

**for文では問題ない理由：**
```javascript
// for文では、i++が必ず実行される
for (let i = 0; i < 10; i++) {  // ← i++はループの更新式
  if (i % 2 === 0) {
    continue;
  }
  console.log(i);
}
// continueしても、i++は実行される
```

## ネストしたループでのcontinue

continue文は、**最も内側のループにのみ影響**します。

### 例：二重ループ

```javascript
for (let i = 1; i <= 3; i++) {
  console.log("外側: " + i);

  for (let j = 1; j <= 3; j++) {
    if (j === 2) {
      continue;  // 内側のループだけスキップ
    }
    console.log("  内側: " + j);
  }
}
```

**実行結果：**
```
外側: 1
  内側: 1
  内側: 3
外側: 2
  内側: 1
  内側: 3
外側: 3
  内側: 1
  内側: 3
```

**動作の流れ：**

**i = 1のとき（外側のループ1回目）：**
```
外側: 1
  j = 1: j === 2 は false → "  内側: 1" を表示
  j = 2: j === 2 は true → continue（スキップ）
  j = 3: j === 2 は false → "  内側: 3" を表示
```

**i = 2のとき（外側のループ2回目）：**
```
外側: 2
  j = 1: j === 2 は false → "  内側: 1" を表示
  j = 2: j === 2 は true → continue（スキップ）
  j = 3: j === 2 は false → "  内側: 3" を表示
```

**外側のループは影響を受けず、内側のループだけがスキップされます。**

## 練習問題

### 課題

continue文を使って、1から20までの数字のうち、**偶数だけ**を表示するプログラムを作成してください。

**要件：**
- ボタンをクリックすると、1から20までの偶数が表示される
- 各偶数は「○は偶数です」という形式で表示される
- 奇数はスキップされて表示されない

### 保存場所

`exercises/lesson-082/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

この課題では、以下の3つの技術を使います：

1. **スキップ処理**：`continue`文を使って奇数をスキップ
2. **特定条件を除外**：`i % 2 !== 0`で奇数を判定
3. **フィルタリング**：偶数だけを残して表示

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-082
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**ヒント1：HTML要素の準備**

まず、HTMLファイルに必要な要素を追加します。

```html
<!-- 必要な要素 -->
<button id="showEven">1から20までの偶数を表示</button>
<div id="result"></div>
```

- ボタン要素には `id="showEven"` を付ける
- 結果を表示する領域には `id="result"` を付ける

**ヒント2：JavaScriptの基本構造**

JavaScriptファイルには、以下の構造でコードを書きます。

```javascript
// 1. 要素を取得
const showEven = document.getElementById("showEven");
const result = document.getElementById("result");

// 2. イベントリスナーを設定
showEven.addEventListener("click", function() {
    // 3. 前回の結果をクリア
    result.innerHTML = "";

    // 4. ループで処理
    for (let i = 1; i <= 20; i++) {
        // ここにcontinue文を使った処理を書く
    }
});
```

**ヒント3：continue文の配置**

ループの中で、以下の順番で処理を書きます。

```javascript
for (let i = 1; i <= 20; i++) {
    // ステップ1：奇数かチェック
    if (i % 2 !== 0) {
        continue;  // 奇数ならスキップ
    }

    // ステップ2：偶数だけここに到達
    // 要素を作成して表示
}
```

**ヒント4：偶数・奇数の判定**

```javascript
// 偶数の判定
i % 2 === 0  // true：偶数、false：奇数

// 奇数の判定
i % 2 !== 0  // true：奇数、false：偶数
```

**奇数のときcontinueでスキップすれば、偶数だけが残ります。**

**ヒント5：要素の作成**

continueでスキップされなかった場合（＝偶数の場合）だけ、要素を作成します。

```javascript
// 偶数だけここに到達
const p = document.createElement("p");
p.textContent = i + "は偶数です";
result.appendChild(p);
```

**ヒント6：よくあるミス**

**ミス1：条件を逆にする**
```javascript
// ✗ 間違い：偶数をスキップしてしまう
if (i % 2 === 0) {
    continue;  // 偶数がスキップされる
}
// → 奇数が表示されてしまう

// ✓ 正しい：奇数をスキップ
if (i % 2 !== 0) {
    continue;  // 奇数がスキップされる
}
// → 偶数が表示される
```

**ミス2：continueの位置を間違える**
```javascript
// ✗ 間違い：continueの前に処理を書く
const p = document.createElement("p");
p.textContent = i + "は偶数です";
if (i % 2 !== 0) {
    continue;  // ← 遅い！すでに要素が作られている
}
result.appendChild(p);

// ✓ 正しい：continueを最初に
if (i % 2 !== 0) {
    continue;  // ← 早めにスキップ
}
const p = document.createElement("p");
p.textContent = i + "は偶数です";
result.appendChild(p);
```

**ヒント7：確認方法**

ブラウザで `index.html` を開いて、以下を確認してください：

1. ボタンをクリックすると、偶数だけが表示される
2. 「2は偶数です」から「20は偶数です」まで10個表示される
3. 奇数（1, 3, 5...）は表示されない

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 082</title>
</head>
<body>
    <h1>偶数だけ表示</h1>
    <button id="showEven">1から20までの偶数を表示</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
// ボタン要素とresult要素を取得
const showEven = document.getElementById("showEven");
const result = document.getElementById("result");

// ボタンをクリックしたときの処理
showEven.addEventListener("click", function() {
    // 結果をクリア
    result.innerHTML = "";

    // 1から20まで繰り返す
    for (let i = 1; i <= 20; i++) {
        // 奇数はスキップ
        if (i % 2 !== 0) {
            continue;
        }

        // 偶数だけ表示
        const p = document.createElement("p");
        p.textContent = i + "は偶数です";
        result.appendChild(p);
    }
});
```

### 解説

このプログラムは、continue文を使って偶数だけを表示する基本的なパターンです。

**HTMLの構造：**

```html
<button id="showEven">1から20までの偶数を表示</button>
<div id="result"></div>
```

- `button`要素：処理のトリガー
- `div`要素（id="result"）：結果の表示領域

**JavaScriptの処理の流れ：**

**1. 要素の取得**
```javascript
const showEven = document.getElementById("showEven");
const result = document.getElementById("result");
```

`getElementById()`で必要な要素を取得します。

**2. イベント設定**
```javascript
showEven.addEventListener("click", function() {
    // クリック時の処理
});
```

ボタンがクリックされたときの処理を登録します。

**3. クリア処理**
```javascript
result.innerHTML = "";
```

前回の結果を削除します。

**4. ループ処理**
```javascript
for (let i = 1; i <= 20; i++) {
    // 1から20まで繰り返す
}
```

1から20まで繰り返します。

**5. 奇数のスキップ**
```javascript
if (i % 2 !== 0) {
    continue;
}
```

**これが最も重要な部分です！**

- `i % 2`：iを2で割った余り
- `i % 2 !== 0`：余りが0でない＝奇数
- 奇数のとき、`continue`で以降の処理をスキップ

**動作例：**
```
i = 1: 1 % 2 = 1、1 !== 0 は true → continue（スキップ）
i = 2: 2 % 2 = 0、0 !== 0 は false → continue実行されず
i = 3: 3 % 2 = 1、1 !== 0 は true → continue（スキップ）
i = 4: 4 % 2 = 0、0 !== 0 は false → continue実行されず
...
```

**6. 偶数の表示**
```javascript
const p = document.createElement("p");
p.textContent = i + "は偶数です";
result.appendChild(p);
```

continueでスキップされなかった数字（＝偶数）だけが、ここに到達します。

**全体の実行の流れ：**

```
ボタンクリック
  ↓
resultをクリア
  ↓
ループ開始（i = 1）
  ↓
i % 2 !== 0 は true
  ↓
continue（スキップ）
  ↓
ループ継続（i = 2）
  ↓
i % 2 !== 0 は false
  ↓
p要素を作成
  ↓
textContentに"2は偶数です"を設定
  ↓
resultに追加
  ↓
ループ継続（i = 3）
  ↓
i % 2 !== 0 は true
  ↓
continue（スキップ）
  ↓
... （20回繰り返す）
  ↓
ループ終了
```

**ポイント：**

**ポイント1：continueは早めに**

```javascript
// continueを最初に書く
if (i % 2 !== 0) {
    continue;  // 早期リターン
}

// メインの処理（ネストが浅い）
const p = document.createElement("p");
p.textContent = i + "は偶数です";
result.appendChild(p);
```

不要な処理を早めにスキップすることで、メインの処理がネストせずに書けます。

**ポイント2：条件式の読み方**

```javascript
i % 2 !== 0  // "iを2で割った余りが0でない"
             // = "iは奇数"
             // = "奇数ならスキップ"
```

**ポイント3：breakとの違い**

```javascript
// breakを使った場合
for (let i = 1; i <= 20; i++) {
    if (i % 2 !== 0) {
        break;  // 最初の奇数（1）でループ終了
    }
    // 何も表示されない
}

// continueを使った場合
for (let i = 1; i <= 20; i++) {
    if (i % 2 !== 0) {
        continue;  // 奇数をスキップ、次に進む
    }
    // 偶数が10個表示される
}
```

breakはループを終了、continueは現在の処理をスキップして次に進みます。

## まとめ

お疲れ様でした。今回のレッスンでは、continue文について学びました。

### 学んだこと

**1. continue文の基本**

```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;  // i=3のときスキップ
  }
  console.log(i);  // 1, 2, 4, 5
}
```

- ✅ カリキュラム要件：スキップ処理
- continueは現在のループ処理だけをスキップ
- 次のループには進む
- ループの更新式（`i++`）は実行される

**2. breakとの違い**

| 項目 | break | continue |
|------|-------|----------|
| 意味 | ループを終了 | 現在の処理をスキップ |
| ループの継続 | ループ全体が終了 | 次のループに進む |

```javascript
// break：ループ終了
for (let i = 1; i <= 5; i++) {
  if (i === 3) break;
  console.log(i);  // 1, 2
}

// continue：スキップして続行
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  console.log(i);  // 1, 2, 4, 5
}
```

**3. 偶数・奇数のフィルタリング**

```javascript
// 偶数だけ表示
for (let i = 1; i <= 10; i++) {
  if (i % 2 !== 0) {
    continue;  // 奇数はスキップ
  }
  console.log(i);  // 2, 4, 6, 8, 10
}
```

- ✅ カリキュラム要件：特定条件を除外
- ✅ カリキュラム要件：フィルタリング
- 奇数をスキップすれば偶数だけ残る
- 条件を逆にすれば奇数だけ表示

**4. DOM操作との組み合わせ**

```javascript
for (let i = 1; i <= 20; i++) {
  if (i % 2 !== 0) {
    continue;  // 奇数はスキップ
  }

  const p = document.createElement("p");
  p.textContent = i + "は偶数です";
  result.appendChild(p);
}
```

- ✅ カリキュラム要件：成果物：偶数だけ表示
- continueでスキップされた値は要素が作られない
- 条件に合う値だけが表示される

**5. 実用的なフィルタリング**

```javascript
// 空の値をスキップ
for (let i = 0; i < items.length; i++) {
  if (items[i] === "") {
    continue;
  }
  console.log(items[i]);
}

// 範囲外をスキップ
for (let i = 1; i <= 100; i++) {
  if (i < 10 || i > 90) {
    continue;
  }
  console.log(i);  // 10〜90
}
```

**6. while文での注意点**

```javascript
// ✓ 正しい：continueの前にi++
let i = 0;
while (i < 10) {
  i++;  // continueの前に更新
  if (i % 2 === 0) {
    continue;
  }
  console.log(i);
}

// ✗ 間違い：無限ループになる
let i = 0;
while (i < 10) {
  if (i % 2 === 0) {
    continue;
  }
  console.log(i);
  i++;  // continueでスキップされる
}
```

### カリキュラム要件の達成

- ✅ **スキップ処理**：continueで現在のループをスキップ
- ✅ **特定条件を除外**：`i % 2 !== 0`で奇数を除外
- ✅ **フィルタリング**：条件に合うデータだけを残す
- ✅ **知識：continue文**：ループの一部をスキップする方法を理解
- ✅ **知識：ループの部分スキップ**：必要なデータだけを処理する技術
- ✅ **成果物：偶数だけ表示**：1から20までの偶数を表示するプログラム

### 重要なポイント

**ポイント1：continueとbreakの使い分け**

```javascript
// break：条件を満たしたら終了
for (let i = 1; i <= 100; i++) {
  if (i === 50) {
    break;  // 50で終了
  }
}

// continue：条件を満たしたらスキップ
for (let i = 1; i <= 100; i++) {
  if (i % 5 === 0) {
    continue;  // 5の倍数をスキップ
  }
}
```

**ポイント2：早期リターン（ガード節）**

```javascript
// continueで早期リターン
for (let i = 1; i <= 100; i++) {
  // 除外条件を先に書く
  if (i % 3 === 0) {
    continue;
  }

  // メインの処理（ネストが浅い）
  console.log(i);
}
```

**ポイント3：while文での注意**

```javascript
// while文では、continueの前にi++
while (i < 10) {
  i++;  // ← continueの前に！
  if (条件) {
    continue;
  }
}
```

**ポイント4：ネストしたループ**

```javascript
// continueは内側のループにのみ影響
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    if (j === 2) {
      continue;  // 内側だけスキップ
    }
  }
}
```

### continue文の使い方パターン

**基本パターン：**
```javascript
for (let i = 1; i <= count; i++) {
    // 除外条件を先に書く（ガード節）
    if (除外条件) {
        continue;
    }

    // メインの処理（ネストが浅い）
    処理を実行();
}
```

**このパターンは、実際のプログラミングで非常によく使います。**

### 実際の活用例

今回学んだcontinue文は、以下のような場面で使われています：

- **検索結果のフィルタリング**：条件に合わないデータを除外
- **データ検証**：不正なデータをスキップ
- **リスト処理**：特定の項目を除外して処理
- **エラー処理**：エラーデータを飛ばして続行

**プログラムで不要なデータを効率的に除外するための基本技術です。**

### 次のステップ

次のレッスンでは、**ループの選択**について学びます。while文とfor文の使い分けや、可読性を考慮したループの書き方を理解していきましょう。

continue文は、データをフィルタリングする際に非常に便利な技術です。breakと組み合わせることで、より柔軟なループ制御が可能になります。

**練習問題を解いて、しっかりマスターしましょう！**
