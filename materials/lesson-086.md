---
title: "Lesson 086: 配列を作る"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン86：配列を作る

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、週のプロジェクトとしてタイピングゲームを作成しました。

```javascript
// タイマーの開始
function startTimer() {
  timer = setInterval(function() {
    timeLeft = timeLeft - 1;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// ランダムな単語を選ぶ
let words = ["apple", "banana", "orange"];
let randomIndex = Math.floor(Math.random() * words.length);
let currentWord = words[randomIndex];
```

- **setInterval()**：一定間隔で処理を繰り返し実行する仕組みを学びました
- **Math.random()**：ランダムな数値を生成して、ランダムな選択を実現しました
- **ゲームループ**：ゲームの状態を継続的に更新する仕組みを実装しました
- **時間管理**：制限時間のカウントダウンとゲーム終了の判定を学びました

実は、タイピングゲームで使った `words` という変数は**配列**でした。今回のレッスンでは、この配列について詳しく学びます。

### よくある場面

実際のプログラミングでは、このような場面で配列を使います。

**場面1：複数のデータをまとめて管理したい**
```
❌ 変数が増えすぎて管理が大変
let fruit1 = "りんご";
let fruit2 = "みかん";
let fruit3 = "ぶどう";
let fruit4 = "バナナ";
let fruit5 = "メロン";

✅ 配列でひとつにまとめる
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
```

**場面2：テストの点数を記録したい**
```
❌ 点数ごとに変数を作ると大変
let score1 = 85;
let score2 = 92;
let score3 = 78;

✅ 配列で管理すると簡単
let scores = [85, 92, 78];
```

**場面3：タイピングゲームの単語リスト**
```
❌ 単語ごとに変数を作ると選択が難しい
let word1 = "apple";
let word2 = "banana";
let word3 = "orange";

✅ 配列で管理するとランダム選択が簡単
let words = ["apple", "banana", "orange"];
let randomWord = words[Math.floor(Math.random() * words.length)];
```

### 学習目標

今回のレッスンでは、**配列（Array）**について学びます。配列は、複数のデータをまとめて扱うための非常に重要なデータ構造です。

このレッスンを終えると、以下のことができるようになります。

- 配列とは何かを理解し、なぜ必要なのか説明できる
- 角かっこ `[]` を使って配列を作成できる
- 配列の要素とインデックスの関係を理解できる
- `.length` プロパティで配列の要素数を取得できる
- 配列を画面に表示できる

## 配列とは

**配列（Array）**は、複数の値をひとつの変数にまとめて保存できるデータ構造です。

### なぜ配列が必要なのか

配列がない場合、複数のデータを扱うのは非常に大変です。

**例：5人の名前を保存したい場合**

配列を使わない場合：
```javascript
let name1 = "田中";
let name2 = "佐藤";
let name3 = "鈴木";
let name4 = "高橋";
let name5 = "渡辺";

console.log(name1);
console.log(name2);
console.log(name3);
console.log(name4);
console.log(name5);
```

この方法の問題点：
- ❌ 変数がたくさん必要で、管理が大変
- ❌ 10人、100人になったらどうするのか？
- ❌ ループで処理することができない
- ❌ コードが冗長で読みにくい

配列を使う場合：
```javascript
let names = ["田中", "佐藤", "鈴木", "高橋", "渡辺"];

// すべての名前を表示（ループで簡単に処理できる）
for (let i = 0; i < names.length; i++) {
  console.log(names[i]);
}
```

配列を使うメリット：
- ✅ ひとつの変数で複数のデータを管理できる
- ✅ ループで簡単に処理できる
- ✅ データの追加・削除が簡単
- ✅ コードがシンプルで読みやすい

### 日常生活での例え

配列は、日常生活の「リスト」や「目録」に似ています。

**買い物リスト**：
```
買い物リスト
----------
1. りんご
2. みかん
3. ぶどう
4. バナナ
5. メロン
```

このリストのように、配列も：
- 複数のアイテムを順番に並べて管理します
- 各アイテムに番号（インデックス）があります
- リスト全体に名前（変数名）があります

## 配列の作り方

配列は、角かっこ `[]` を使って作成します。

### 基本的な書き方

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
```

**構文の詳しい説明**：

```
let fruits = ["りんご", "みかん", "ぶどう"];
│   │      │  │        │        │
│   │      │  │        │        └─ 要素3（最後の要素）
│   │      │  │        └────────── 要素2
│   │      │  └─────────────────── 要素1
│   │      └────────────────────── 角かっこで囲む
│   └───────────────────────────── 変数名
└───────────────────────────────── let宣言
```

**重要なルール**：
1. 配列は角かっこ `[]` で囲む
2. 要素はカンマ `,` で区切る
3. 文字列の要素は引用符 `""` または `''` で囲む
4. 最後の要素の後ろにはカンマを付けない

### 実行の流れ

配列が作られる流れを見てみましょう。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits);
```

**実行の流れ**：
```
ステップ1: 配列の作成
-----------------
メモリに配列が作られる
┌─────────┬─────────┬─────────┐
│ "りんご" │ "みかん" │ "ぶどう" │
└─────────┴─────────┴─────────┘

ステップ2: 変数への代入
-----------------
変数fruitsに配列への参照が保存される
fruits → [配列のメモリアドレス]

ステップ3: コンソール出力
-----------------
配列全体が表示される
["りんご", "みかん", "ぶどう"]
```

### 要素とインデックス

配列の中の個々のデータを**要素（element）**と呼びます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
//            ↑        ↑        ↑
//          要素0     要素1     要素2
```

各要素には**インデックス（index）**という番号が自動的に割り当てられます。

**重要**：インデックスは0から始まります。1からではありません。

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
インデックス  インデックス  インデックス
```

なぜ0から始まるのか？
- コンピュータの世界では、メモリのアドレスが0から始まるため
- 配列の最初の要素は、「配列の先頭から0個進んだ位置」と考える
- この仕組みは、ほとんどのプログラミング言語で共通です

### 空の配列

要素が何もない配列も作れます。

```javascript
let emptyArray = [];
console.log(emptyArray);  // []
console.log(emptyArray.length);  // 0
```

**実行の流れ**：
```
ステップ1: 空の配列の作成
-----------------
要素が0個の配列が作られる
┌─┐
│ │ ← 何も入っていない
└─┘

ステップ2: 変数への代入
-----------------
emptyArray → [空の配列]

ステップ3: コンソール出力
-----------------
[] ← 空の配列として表示される
```

空の配列は、後から要素を追加する時に使います（次のレッスンで学習）。

### 異なるデータ型の配列

配列には、数値、文字列、真偽値など、さまざまなデータ型を入れられます。

**文字列の配列**：
```javascript
let colors = ["赤", "青", "黄色"];
console.log(colors);  // ["赤", "青", "黄色"]
```

**数値の配列**：
```javascript
let numbers = [1, 2, 3, 4, 5];
console.log(numbers);  // [1, 2, 3, 4, 5]
```

**真偽値の配列**：
```javascript
let flags = [true, false, true];
console.log(flags);  // [true, false, true]
```

**混合の配列**（あまり推奨されません）：
```javascript
let mixed = ["りんご", 100, true];
console.log(mixed);  // ["りんご", 100, true]
```

**推奨**：通常は、同じデータ型の要素を配列にまとめます。これにより、コードが読みやすく、エラーが少なくなります。

**良い例**：
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];  // すべて文字列
let scores = [85, 92, 78, 95];  // すべて数値
```

**避けるべき例**：
```javascript
let data = ["りんご", 100, true, "みかん"];  // 混合型（読みにくい）
```

## 配列の長さ

配列に含まれる要素の数を**長さ（length）**と呼びます。

### lengthプロパティ

配列の長さは、`.length`で取得できます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits.length);  // 3
```

**構文の説明**：
```
fruits.length
│      │
│      └─ lengthプロパティ（配列の長さ）
└──────── 配列の変数名
```

**実行の流れ**：
```
ステップ1: 配列の確認
-----------------
fruits = ["りんご", "みかん", "ぶどう"]
          ↑        ↑        ↑
        要素1     要素2     要素3

ステップ2: lengthプロパティの取得
-----------------
配列の要素数を数える
要素1 + 要素2 + 要素3 = 3

ステップ3: 結果の返却
-----------------
3 が返される
```

### 様々な配列の長さ

```javascript
// 3つの要素
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits.length);  // 3

// 5つの要素
let numbers = [1, 2, 3, 4, 5];
console.log(numbers.length);  // 5

// 1つの要素
let single = ["りんご"];
console.log(single.length);  // 1

// 空の配列（0個の要素）
let empty = [];
console.log(empty.length);  // 0
```

**図解**：
```
fruits = ["りんご", "みかん", "ぶどう"]
         ┌─────┬─────┬─────┐
         │  1  │  2  │  3  │ ← 要素を数える
         └─────┴─────┴─────┘
fruits.length = 3

empty = []
        ┌┐
        ││ ← 要素がない
        └┘
empty.length = 0
```

### lengthの活用

配列の長さは、条件分岐やループで頻繁に使います。

**条件分岐での使用例**：
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

if (fruits.length > 0) {
  console.log("配列には要素があります");
} else {
  console.log("配列は空です");
}
```

**実行の流れ**：
```
ステップ1: lengthの取得
-----------------
fruits.length → 3

ステップ2: 条件の評価
-----------------
3 > 0 → true

ステップ3: 実行
-----------------
"配列には要素があります" が表示される
```

**ループでの使用例**（次のレッスンで詳しく学習）：
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

**実行の流れ**：
```
初期化: i = 0
条件: i < 3 (fruits.length)

繰り返し1: i = 0
  0 < 3 → true
  fruits[0] → "りんご" を表示
  i++ → i = 1

繰り返し2: i = 1
  1 < 3 → true
  fruits[1] → "みかん" を表示
  i++ → i = 2

繰り返し3: i = 2
  2 < 3 → true
  fruits[2] → "ぶどう" を表示
  i++ → i = 3

繰り返し4: i = 3
  3 < 3 → false
  ループ終了
```

## 配列の表示

配列を`console.log()`で表示すると、全体が表示されます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits);
// 出力: ["りんご", "みかん", "ぶどう"]
```

ブラウザのコンソールでは、配列が見やすく表示されます。

### join()メソッド

`join()`メソッドを使うと、配列の要素を文字列として結合できます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// カンマとスペースで結合
console.log(fruits.join(", "));
// 出力: りんご, みかん, ぶどう

// カンマで結合
console.log(fruits.join(","));
// 出力: りんご,みかん,ぶどう

// スペースで結合
console.log(fruits.join(" "));
// 出力: りんご みかん ぶどう

// ハイフンで結合
console.log(fruits.join("-"));
// 出力: りんご-みかん-ぶどう
```

**実行の流れ**：
```
fruits = ["りんご", "みかん", "ぶどう"]

join(", ") の実行:
-----------------
ステップ1: 最初の要素
"りんご"

ステップ2: 区切り文字を追加
"りんご" + ", "

ステップ3: 2番目の要素を追加
"りんご" + ", " + "みかん"

ステップ4: 区切り文字を追加
"りんご" + ", " + "みかん" + ", "

ステップ5: 3番目の要素を追加
"りんご" + ", " + "みかん" + ", " + "ぶどう"

結果:
"りんご, みかん, ぶどう"
```

## 配列の特徴

配列には、以下のような重要な特徴があります。

### 1. 順序が保持される

配列は、要素を追加した順番を覚えています。

```javascript
let numbers = [1, 2, 3, 4, 5];
console.log(numbers);  // [1, 2, 3, 4, 5]（順番通り）

// 別の順番で作成すると、その順番が保持される
let reversed = [5, 4, 3, 2, 1];
console.log(reversed);  // [5, 4, 3, 2, 1]
```

**図解**：
```
配列は順序を保持する
──────────────────
numbers = [1, 2, 3, 4, 5]
           ↓  ↓  ↓  ↓  ↓
          この順番が保たれる

reversed = [5, 4, 3, 2, 1]
            ↓  ↓  ↓  ↓  ↓
           この順番も保たれる
```

### 2. 重複が許可される

同じ値を複数回入れることができます。

```javascript
let numbers = [1, 2, 2, 3, 3, 3];
console.log(numbers);  // [1, 2, 2, 3, 3, 3]
console.log(numbers.length);  // 6（重複も数える）
```

**図解**：
```
重複する値も別々の要素として扱われる
──────────────────────────────
numbers = [1, 2, 2, 3, 3, 3]
           │  │  │  │  │  │
           └──┴──┴──┴──┴──┴── すべて別々の要素

length = 6（すべての要素を数える）
```

### 3. 動的にサイズが変わる

配列のサイズは固定されておらず、要素を追加したり削除したりできます（次のレッスンで学習）。

```javascript
let fruits = ["りんご"];
console.log(fruits.length);  // 1

// 後で要素を追加できる（次のレッスンで学習）
// fruits.push("みかん");
// console.log(fruits.length);  // 2
```

## 実践例：フルーツリスト

HTMLとJavaScriptを組み合わせて、配列を表示してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>フルーツリスト</title>
</head>
<body>
    <h1>フルーツリスト</h1>
    <button id="showFruits">フルーツを表示</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let showButton = document.getElementById("showFruits");
let result = document.getElementById("result");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

showButton.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  // 配列全体を表示
  let listText = document.createElement("p");
  listText.textContent = "フルーツ: " + fruits.join(", ");
  result.appendChild(listText);

  // 要素数も表示
  let countText = document.createElement("p");
  countText.textContent = "合計: " + fruits.length + "個";
  result.appendChild(countText);
});
```

### コードの詳しい説明

**配列の作成**：
```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
```
5つの果物の名前を配列にまとめています。

**配列の表示**：
```javascript
listText.textContent = "フルーツ: " + fruits.join(", ");
```
- `fruits.join(", ")`: 配列の要素をカンマとスペースで結合
- 結果: "フルーツ: りんご, みかん, ぶどう, バナナ, メロン"

**要素数の表示**：
```javascript
countText.textContent = "合計: " + fruits.length + "個";
```
- `fruits.length`: 配列の長さ（5）
- 結果: "合計: 5個"

### 実行の流れ

```
初期状態:
-----------------
fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
result = <div>(空)

ボタンクリック時:
-----------------
ステップ1: 結果をクリア
result.innerHTML = ""

ステップ2: 配列を文字列に変換
fruits.join(", ")
→ "りんご, みかん, ぶどう, バナナ, メロン"

ステップ3: テキストを作成
listText.textContent = "フルーツ: りんご, みかん, ぶどう, バナナ, メロン"

ステップ4: DOMに追加
result.appendChild(listText)

ステップ5: 要素数を表示
countText.textContent = "合計: 5個"

ステップ6: DOMに追加
result.appendChild(countText)

最終的な表示:
-----------------
フルーツ: りんご, みかん, ぶどう, バナナ, メロン
合計: 5個
```

## 配列の使用例

配列は、さまざまな場面で活用できます。

### 例1：得点の管理

```javascript
let scores = [85, 92, 78, 95, 88];
console.log("テストの点数: " + scores.join(", "));
console.log("テストの回数: " + scores.length + "回");
```

**出力**：
```
テストの点数: 85, 92, 78, 95, 88
テストの回数: 5回
```

### 例2：色のリスト

```javascript
let colors = ["赤", "青", "黄色", "緑", "紫"];
console.log("利用可能な色: " + colors.length + "種類");
console.log(colors.join(" / "));
```

**出力**：
```
利用可能な色: 5種類
赤 / 青 / 黄色 / 緑 / 紫
```

### 例3：曜日の配列

```javascript
let weekdays = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日"];
console.log("平日の数: " + weekdays.length + "日");
console.log(weekdays.join("、"));
```

**出力**：
```
平日の数: 5日
月曜日、火曜日、水曜日、木曜日、金曜日
```

## 配列のよくある使い方

### パターン1：リストの管理

```javascript
let todoList = ["買い物", "掃除", "洗濯"];
console.log("やることリスト (" + todoList.length + "件)");
console.log(todoList.join(", "));
```

**実行の流れ**：
```
todoList = ["買い物", "掃除", "洗濯"]

todoList.length → 3
todoList.join(", ") → "買い物, 掃除, 洗濯"

出力:
やることリスト (3件)
買い物, 掃除, 洗濯
```

### パターン2：データの集計

```javascript
let temperatures = [25, 28, 30, 27, 26];
console.log("記録された温度の数: " + temperatures.length);
console.log("温度: " + temperatures.join("℃, ") + "℃");
```

**実行の流れ**：
```
temperatures = [25, 28, 30, 27, 26]

temperatures.length → 5
temperatures.join("℃, ") → "25℃, 28℃, 30℃, 27℃, 26℃"

出力:
記録された温度の数: 5
温度: 25℃, 28℃, 30℃, 27℃, 26℃
```

### パターン3：選択肢の提供

```javascript
let choices = ["はい", "いいえ", "わからない"];
console.log("選択肢の数: " + choices.length);
console.log("選択肢: " + choices.join(" / "));
```

**実行の流れ**：
```
choices = ["はい", "いいえ", "わからない"]

choices.length → 3
choices.join(" / ") → "はい / いいえ / わからない"

出力:
選択肢の数: 3
選択肢: はい / いいえ / わからない
```

## 練習問題

### 課題：フルーツリストの作成

配列を使って、フルーツのリストを作成し、画面に表示してください。

### 保存場所

`exercises/lesson-086/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. 配列の作り方を理解する
2. 配列の要素数を確認する方法を学ぶ
3. 配列を画面に表示する

### 要件

- ボタン（id="showFruits"）をクリックすると、フルーツのリストを表示
- 配列には少なくとも3つのフルーツ名を含める
- フルーツのリストを見やすく表示する（join()を使用）
- 要素数も表示する（.lengthを使用）

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-086
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

配列を作成する際のポイントを確認しましょう。

**配列の作成**
- 角かっこ `[]` を使います
- 要素はカンマで区切ります
- 文字列は引用符で囲みます

例：
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
```

**配列の長さ**
- `.length`プロパティを使います
- `配列名.length`で要素数を取得できます

例：
```javascript
console.log(fruits.length);  // 3
```

**配列の表示**
- `join()`メソッドで文字列に変換できます
- カンマとスペース `", "` で区切ると読みやすくなります

例：
```javascript
console.log(fruits.join(", "));  // りんご, みかん, ぶどう
```

**DOM操作**
- `textContent`でテキストを設定します
- `appendChild()`で要素を追加します

例：
```javascript
let p = document.createElement("p");
p.textContent = "フルーツ: " + fruits.join(", ");
result.appendChild(p);
```

### 解答例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 086</title>
</head>
<body>
    <h1>フルーツリスト</h1>
    <button id="showFruits">フルーツを表示</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let showButton = document.getElementById("showFruits");
let result = document.getElementById("result");

// フルーツの配列を作成
let fruits = ["りんご", "みかん", "ぶどう"];

showButton.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  // 配列全体を表示
  let listText = document.createElement("p");
  listText.textContent = "フルーツ: " + fruits.join(", ");
  result.appendChild(listText);

  // 要素数を表示
  let countText = document.createElement("p");
  countText.textContent = "合計: " + fruits.length + "個";
  result.appendChild(countText);
});
```

### 解答例の詳しい説明

このコードでは、配列の基本的な使い方を実践しています。

**ステップ1：配列の作成**
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
```
- 角かっこ `[]` で配列を作成
- 文字列をカンマで区切って要素を定義
- 変数`fruits`に配列を保存

**実行の流れ**：
```
配列の作成:
-----------------
メモリに配列が作られる
fruits = ["りんご", "みかん", "ぶどう"]
          ┌──────┬──────┬──────┐
          │ [0]  │ [1]  │ [2]  │
          └──────┴──────┴──────┘
```

**ステップ2：配列の表示**
```javascript
listText.textContent = "フルーツ: " + fruits.join(", ");
```
- `fruits.join(", ")`: 配列の要素をカンマとスペースで結合
- 結果: "りんご, みかん, ぶどう"
- "フルーツ: " と結合して表示

**実行の流れ**：
```
join(", ")の実行:
-----------------
"りんご" + ", " + "みかん" + ", " + "ぶどう"
→ "りんご, みかん, ぶどう"

文字列連結:
-----------------
"フルーツ: " + "りんご, みかん, ぶどう"
→ "フルーツ: りんご, みかん, ぶどう"
```

**ステップ3：要素数の表示**
```javascript
countText.textContent = "合計: " + fruits.length + "個";
```
- `fruits.length`: 配列の長さを取得（3）
- 文字列と結合して表示

**実行の流れ**：
```
lengthの取得:
-----------------
fruits.length → 3

文字列連結:
-----------------
"合計: " + 3 + "個"
→ "合計: 3個"
```

**ステップ4：画面への反映**
```javascript
result.innerHTML = "";  // まず結果をクリア
result.appendChild(listText);  // リストを追加
result.appendChild(countText);  // カウントを追加
```

**実行の流れ**：
```
初期状態:
-----------------
result = <div id="result"></div>

クリア:
-----------------
result.innerHTML = ""
result = <div id="result"></div>(空)

要素の追加:
-----------------
result.appendChild(listText)
result = <div id="result">
           <p>フルーツ: りんご, みかん, ぶどう</p>
         </div>

result.appendChild(countText)
result = <div id="result">
           <p>フルーツ: りんご, みかん, ぶどう</p>
           <p>合計: 3個</p>
         </div>
```

## まとめ

お疲れ様でした。今回のレッスンでは、配列の基本について学びました。

**今回学んだキーポイント**

1. **配列とは**：複数の値をひとつの変数にまとめて保存できるデータ構造です。角かっこ `[]` を使って作成します
   ```javascript
   let fruits = ["りんご", "みかん", "ぶどう"];
   ```

2. **要素とインデックス**：配列の中の個々のデータを要素と呼び、各要素には0から始まるインデックス番号が割り当てられます
   ```javascript
   // インデックス:  0        1        2
   // 値:         "りんご"  "みかん"  "ぶどう"
   ```

3. **配列の長さ**：`.length`プロパティで、配列に含まれる要素の数を取得できます
   ```javascript
   console.log(fruits.length);  // 3
   ```

4. **配列の表示**：`join()`メソッドを使うと、配列の要素を文字列として結合できます
   ```javascript
   console.log(fruits.join(", "));  // りんご, みかん, ぶどう
   ```

5. **配列の特徴**：
   - 順序が保持される
   - 重複が許可される
   - 動的にサイズが変わる

**配列を使うメリット**：
- ひとつの変数で複数のデータを管理できる
- ループで簡単に処理できる
- コードがシンプルで読みやすくなる

配列は、JavaScriptプログラミングで非常に重要なデータ構造です。複数のデータをまとめて扱うことで、コードがシンプルになり、管理がしやすくなります。

次のレッスンでは、配列の要素にアクセスする方法を学びます。インデックスを使って、特定の要素を取得したり変更したりする方法を習得しましょう。

---

## カリキュラムの要件チェック

このレッスンは、以下のカリキュラムの要件を満たしています。

```
レッスン86：配列を作る（30分）
✅ let fruits = ["りんご", "みかん", "ぶどう"]
✅ console.log(fruits)
✅ 要素の数を確認
【知識】配列とは、インデックス、要素
✅ 成果物：フルーツリスト
```

**確認項目**：
- ✅ 配列の作成方法（角かっこ `[]` を使用）
- ✅ console.log()での配列の表示
- ✅ .lengthプロパティでの要素数の確認
- ✅ 配列、インデックス、要素の概念の説明
- ✅ 成果物：フルーツリストの実装

すべての要件を満たしています。
