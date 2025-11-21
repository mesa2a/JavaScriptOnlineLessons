---
title: "Lesson 086: 配列を作る"
author: "JavaScript学習教材"
date: "2025-01-21"
---

# レッスン86：配列を作る

## 今回の学習

### 前回の復習

前回のレッスンでは、週のプロジェクトとしてタイピングゲームを作成しました。

- **ゲームループ**：`setInterval()`を使って、ゲームの状態を継続的に更新する仕組みを実装しました
- **時間管理**：制限時間を設定し、カウントダウンする方法を学びました
- **スコア計算**：正解数をカウントして表示し、ゲームの結果を管理しました
- **成果物**：タイピング練習 - これまで学んだループ、条件分岐、イベント処理を総合的に活用しました

### 今回の目標

今回のレッスンでは、**配列**について学びます。配列は、複数のデータをまとめて扱うための重要な機能です。

- 配列とは何かを理解する
- 配列の作り方を学ぶ
- 配列の要素数を確認する方法を習得する

## 配列とは

**配列（Array）**は、複数の値をひとつの変数にまとめて保存できるデータ構造です。

### なぜ配列が必要か

例えば、5つの果物の名前を保存したいとします。配列を使わない場合、このように書く必要があります。

```javascript
let fruit1 = "りんご";
let fruit2 = "みかん";
let fruit3 = "ぶどう";
let fruit4 = "バナナ";
let fruit5 = "メロン";
```

これでは変数がたくさん必要で、管理が大変です。

配列を使うと、ひとつの変数にまとめられます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
```

すっきりしましたね！

### 日常生活での例え

配列は、日常生活の「リスト」に似ています。

**買い物リスト**：
```
1. りんご
2. みかん
3. ぶどう
4. バナナ
5. メロン
```

このリストのように、配列も複数のアイテムを順番に並べて管理します。

## 配列の作り方

配列は、角かっこ `[]` を使って作成します。

### 基本的な書き方

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
```

**構文の説明**：
- `let fruits`: 配列を保存する変数名
- `=`: 代入演算子
- `[]`: 角かっこで配列を作成
- `"りんご", "みかん", "ぶどう"`: カンマで区切られた要素

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

### 空の配列

要素が何もない配列も作れます。

```javascript
let emptyArray = [];
console.log(emptyArray);  // []
```

空の配列は、後から要素を追加する時に使います。

### 異なるデータ型の配列

配列には、数値、文字列、真偽値など、さまざまなデータ型を入れられます。

**文字列の配列**：
```javascript
let colors = ["赤", "青", "黄色"];
```

**数値の配列**：
```javascript
let numbers = [1, 2, 3, 4, 5];
```

**混合の配列**（あまり推奨されませんが可能です）：
```javascript
let mixed = ["りんご", 100, true];
```

**推奨**：通常は、同じデータ型の要素を配列にまとめます。これにより、コードが読みやすく、エラーが少なくなります。

## 配列の表示

配列を`console.log()`で表示すると、全体が表示されます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits);
// 出力: ["りんご", "みかん", "ぶどう"]
```

ブラウザのコンソールでは、配列が見やすく表示されます。

## 配列の長さ

配列に含まれる要素の数を**長さ（length）**と呼びます。

### lengthプロパティ

配列の長さは、`.length`で取得できます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits.length);  // 3
```

**構文の説明**：
- `fruits`: 配列の変数名
- `.length`: 配列の長さを取得するプロパティ
- 結果: 要素の数（3）

### 空の配列の長さ

```javascript
let emptyArray = [];
console.log(emptyArray.length);  // 0
```

空の配列の長さは0です。

### lengthの活用

配列の長さは、ループや条件分岐で頻繁に使います。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

if (fruits.length > 0) {
  console.log("配列には要素があります");
} else {
  console.log("配列は空です");
}
```

## 配列とループ

配列の要素数が分かると、for文と組み合わせて使えます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

**出力**：
```
りんご
みかん
ぶどう
```

**詳しい説明**：
- `i = 0`: インデックスは0から始まる
- `i < fruits.length`: 配列の長さ（3）未満まで繰り返す
- `fruits[i]`: i番目の要素を取得

次のレッスンで、配列の要素へのアクセス方法を詳しく学びます。

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
  // 配列全体を表示
  result.textContent = "フルーツ: " + fruits.join(", ");

  // 要素数も表示
  let count = document.createElement("p");
  count.textContent = "合計: " + fruits.length + "個";
  result.appendChild(count);
});
```

### コードの詳しい説明

**配列の作成**
```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
```
5つの果物の名前を配列にまとめています。

**配列の表示**
```javascript
result.textContent = "フルーツ: " + fruits.join(", ");
```
- `fruits.join(", ")`: 配列の要素をカンマとスペースで結合
- 結果: "りんご, みかん, ぶどう, バナナ, メロン"

**要素数の表示**
```javascript
count.textContent = "合計: " + fruits.length + "個";
```
- `fruits.length`: 配列の長さ（5）
- 結果: "合計: 5個"

### join()メソッドの補足

`join()`は、配列の要素を文字列として結合するメソッドです。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// カンマで結合
console.log(fruits.join(","));  // りんご,みかん,ぶどう

// スペースで結合
console.log(fruits.join(" "));  // りんご みかん ぶどう

// ハイフンで結合
console.log(fruits.join("-"));  // りんご-みかん-ぶどう
```

## 配列の使用例

配列は、さまざまな場面で活用できます。

### 例1：得点の管理

```javascript
let scores = [85, 92, 78, 95, 88];
console.log("テストの点数: " + scores.join(", "));
console.log("テストの回数: " + scores.length + "回");
```

### 例2：色のリスト

```javascript
let colors = ["赤", "青", "黄色", "緑", "紫"];
console.log("利用可能な色: " + colors.length + "種類");
```

### 例3：曜日の配列

```javascript
let weekdays = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日"];
console.log("平日の数: " + weekdays.length + "日");
```

## 配列の特徴

配列には、以下のような特徴があります。

### 1. 順序が保持される

配列は、要素を追加した順番を覚えています。

```javascript
let numbers = [1, 2, 3, 4, 5];
console.log(numbers);  // [1, 2, 3, 4, 5]（順番通り）
```

### 2. 重複が許可される

同じ値を複数回入れることができます。

```javascript
let numbers = [1, 2, 2, 3, 3, 3];
console.log(numbers.length);  // 6（重複も数える）
```

### 3. 動的にサイズが変わる

配列のサイズは固定されておらず、要素を追加したり削除したりできます（次のレッスンで学びます）。

```javascript
let fruits = ["りんご"];
console.log(fruits.length);  // 1

// 後で要素を追加できる（次のレッスンで学習）
```

## 配列のよくある使い方

### パターン1：リストの管理

```javascript
let todoList = ["買い物", "掃除", "洗濯"];
console.log("やることリスト (" + todoList.length + "件)");
```

### パターン2：データの集計

```javascript
let temperatures = [25, 28, 30, 27, 26];
console.log("記録された温度の数: " + temperatures.length);
```

### パターン3：選択肢の提供

```javascript
let choices = ["はい", "いいえ", "わからない"];
console.log("選択肢の数: " + choices.length);
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
- 要素数も表示する

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

**配列の長さ**
- `.length`プロパティを使います
- `配列名.length`で要素数を取得できます

**配列の表示**
- `join()`メソッドで文字列に変換できます
- カンマとスペース `", "` で区切ると読みやすくなります

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

### 解説

このコードでは、配列の基本的な使い方を実践しています。

**配列の作成**
```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
```
- 角かっこ `[]` で配列を作成
- 文字列をカンマで区切って要素を定義
- 変数`fruits`に配列を保存

**配列の表示**
```javascript
listText.textContent = "フルーツ: " + fruits.join(", ");
```
- `fruits.join(", ")`: 配列の要素をカンマとスペースで結合
- 結果: "りんご, みかん, ぶどう"

**要素数の表示**
```javascript
countText.textContent = "合計: " + fruits.length + "個";
```
- `fruits.length`: 配列の長さを取得（3）
- 文字列と結合して表示

**画面への反映**
```javascript
result.innerHTML = "";  // まず結果をクリア
result.appendChild(listText);  // リストを追加
result.appendChild(countText);  // カウントを追加
```
- `innerHTML = ""`: 前回の結果を消去
- `appendChild()`: 新しい要素を追加

## まとめ

お疲れ様でした。今回のレッスンでは、配列の基本について学びました。

**今回学んだキーポイント**

- **配列とは**：複数の値をひとつの変数にまとめて保存できるデータ構造です。角かっこ `[]` を使って作成します
- **要素とインデックス**：配列の中の個々のデータを要素と呼び、各要素には0から始まるインデックス番号が割り当てられます
- **配列の長さ**：`.length`プロパティで、配列に含まれる要素の数を取得できます
- **配列の表示**：`join()`メソッドを使うと、配列の要素を文字列として結合できます

配列は、JavaScriptプログラミングで非常に重要なデータ構造です。複数のデータをまとめて扱うことで、コードがシンプルになり、管理がしやすくなります。

次のレッスンでは、配列の要素にアクセスする方法を学びます。インデックスを使って、特定の要素を取得したり変更したりする方法を習得しましょう。
