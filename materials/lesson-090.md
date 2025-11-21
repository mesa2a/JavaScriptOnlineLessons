---
title: "Lesson 090: 要素の削除"
author: "JavaScript学習教材"
date: "2025-01-21"
---

# レッスン90：要素の削除

## 今回の学習

### 前回の復習

前回のレッスンでは、配列に要素を追加する方法を学びました。

- **push()メソッド**：`配列名.push(要素)`の形式で、配列の末尾に新しい要素を追加できます
- **複数追加**：`push(要素1, 要素2, ...)`のように、複数の要素を一度に追加できます
- **配列の拡張**：`push()`を使うと配列の長さが自動的に増えます
- **成果物**：リスト追加機 - ユーザー入力を配列に追加するプログラムを作成しました

### 今回の目標

今回のレッスンでは、配列から要素を削除する方法を学びます。

- `pop()`メソッドで末尾の要素を削除する
- `shift()`メソッドで先頭の要素を削除する
- 削除した値を取得する方法を理解する

## pop()メソッド

**pop()メソッド**は、配列の末尾の要素を削除し、その値を返すメソッドです。

### 基本的な構文

```javascript
配列名.pop();
```

### 末尾の要素を削除

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]

fruits.pop();
console.log(fruits);  // ["りんご", "みかん"]
```

**変更前**：
```
インデックス:  0        1        2
値:         "りんご"  "みかん"  "ぶどう"
長さ: 3
```

**変更後**：
```
インデックス:  0        1
値:         "りんご"  "みかん"
長さ: 2
```

### 配列の長さが減る

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits.length);  // 3

fruits.pop();
console.log(fruits.length);  // 2
```

`pop()`を使うと、配列の長さが1減ります。

## pop()の戻り値

`pop()`メソッドは、削除した要素を返します。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let removed = fruits.pop();

console.log(removed);  // "ぶどう"（削除された要素）
console.log(fruits);   // ["りんご", "みかん"]（残った配列）
```

**重要**：削除した値を変数に保存できるため、削除と同時に値を取得できます。

### 削除した値の活用

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let lastFruit = fruits.pop();

console.log("削除したフルーツ: " + lastFruit);  // "削除したフルーツ: ぶどう"
console.log("残りのフルーツ: " + fruits.join(", "));  // "残りのフルーツ: りんご, みかん"
```

## 複数回のpop()

`pop()`を複数回呼ぶと、末尾から順番に削除されます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "いちご"];

fruits.pop();  // "いちご"を削除
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]

fruits.pop();  // "ぶどう"を削除
console.log(fruits);  // ["りんご", "みかん"]

fruits.pop();  // "みかん"を削除
console.log(fruits);  // ["りんご"]
```

### ループで全削除

```javascript
let numbers = [1, 2, 3, 4, 5];

while (numbers.length > 0) {
  let removed = numbers.pop();
  console.log("削除: " + removed);
}

console.log(numbers);  // []（空の配列）
```

**出力**：
```
削除: 5
削除: 4
削除: 3
削除: 2
削除: 1
```

## 空の配列でpop()

空の配列で`pop()`を呼ぶと、`undefined`が返されます。

```javascript
let fruits = [];
let removed = fruits.pop();

console.log(removed);  // undefined
console.log(fruits);   // []（変わらず空）
```

**注意**：エラーにはなりませんが、`undefined`が返されるため、配列が空かどうかをチェックすることが推奨されます。

```javascript
let fruits = ["りんご"];

if (fruits.length > 0) {
  let removed = fruits.pop();
  console.log("削除しました: " + removed);
} else {
  console.log("配列は空です");
}
```

## shift()メソッド

**shift()メソッド**は、配列の先頭の要素を削除し、その値を返すメソッドです。

### 基本的な構文

```javascript
配列名.shift();
```

### 先頭の要素を削除

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]

fruits.shift();
console.log(fruits);  // ["みかん", "ぶどう"]
```

**変更前**：
```
インデックス:  0        1        2
値:         "りんご"  "みかん"  "ぶどう"
```

**変更後**：
```
インデックス:  0        1
値:         "みかん"  "ぶどう"
```

先頭の要素が削除され、残りの要素が前にずれます。

### shift()の戻り値

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let removed = fruits.shift();

console.log(removed);  // "りんご"（削除された要素）
console.log(fruits);   // ["みかん", "ぶどう"]（残った配列）
```

## pop()とshift()の違い

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];

// pop(): 末尾を削除
let last = fruits.pop();
console.log(last);     // "ぶどう"
console.log(fruits);   // ["りんご", "みかん"]

fruits = ["りんご", "みかん", "ぶどう"];

// shift(): 先頭を削除
let first = fruits.shift();
console.log(first);    // "りんご"
console.log(fruits);   // ["みかん", "ぶどう"]
```

### 比較表

| メソッド | 削除位置 | 戻り値 | 配列の変化 |
|---------|---------|--------|-----------|
| `pop()` | 末尾 | 削除した要素 | 長さが1減る |
| `shift()` | 先頭 | 削除した要素 | 長さが1減り、要素が前にずれる |

### パフォーマンスの違い

```javascript
// pop(): 高速（末尾を削除するだけ）
fruits.pop();

// shift(): 低速（すべての要素をずらす必要がある）
fruits.shift();
```

**推奨**：特別な理由がない限り、`pop()`の使用が推奨されます。`shift()`は全要素を移動させる必要があるため、配列が大きい場合は処理が遅くなります。

## 実践例：リスト削除機

HTMLとJavaScriptを組み合わせて、配列から要素を削除してみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>リスト削除機</title>
</head>
<body>
    <h1>フルーツリストから削除</h1>
    <p>現在のリスト: <span id="display"></span></p>
    <p>要素数: <span id="count"></span></p>

    <button id="removeLast">末尾を削除</button>
    <button id="removeFirst">先頭を削除</button>

    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let removeLastButton = document.getElementById("removeLast");
let removeFirstButton = document.getElementById("removeFirst");
let display = document.getElementById("display");
let count = document.getElementById("count");
let result = document.getElementById("result");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// 配列を表示
function showArray() {
  display.textContent = fruits.join(", ");
  count.textContent = fruits.length;
}

// 初期表示
showArray();

// 末尾を削除
removeLastButton.addEventListener("click", function() {
  if (fruits.length > 0) {
    let removed = fruits.pop();
    showArray();
    result.textContent = "「" + removed + "」を削除しました";
  } else {
    result.textContent = "配列は空です";
  }
});

// 先頭を削除
removeFirstButton.addEventListener("click", function() {
  if (fruits.length > 0) {
    let removed = fruits.shift();
    showArray();
    result.textContent = "「" + removed + "」を削除しました";
  } else {
    result.textContent = "配列は空です";
  }
});
```

### コードの詳しい説明

**配列の表示**
```javascript
function showArray() {
  display.textContent = fruits.join(", ");
  count.textContent = fruits.length;
}
```
- 配列を文字列に変換して表示
- 要素数も表示

**末尾を削除**
```javascript
if (fruits.length > 0) {
  let removed = fruits.pop();
  showArray();
  result.textContent = "「" + removed + "」を削除しました";
}
```
- `fruits.length > 0`: 配列が空でないかチェック
- `fruits.pop()`: 末尾の要素を削除して取得
- `showArray()`: 更新された配列を表示
- 削除した要素を表示

**先頭を削除**
```javascript
if (fruits.length > 0) {
  let removed = fruits.shift();
  showArray();
  result.textContent = "「" + removed + "」を削除しました";
}
```
- `shift()`で先頭の要素を削除
- 削除した要素を表示

## push()とpop()の組み合わせ

`push()`と`pop()`を組み合わせると、**スタック（Stack）**というデータ構造が実現できます。

### スタックとは

スタックは、「最後に入れたものを最初に取り出す」（LIFO: Last In First Out）構造です。

```javascript
let stack = [];

// 追加（push）
stack.push("A");
stack.push("B");
stack.push("C");
console.log(stack);  // ["A", "B", "C"]

// 削除（pop）
console.log(stack.pop());  // "C"（最後に入れたものを取り出す）
console.log(stack.pop());  // "B"
console.log(stack.pop());  // "A"
```

### 実用例：履歴管理

```javascript
let history = [];

// ページ訪問を記録
history.push("ホーム");
history.push("商品一覧");
history.push("商品詳細");

console.log("現在のページ: " + history[history.length - 1]);  // "商品詳細"

// 戻るボタン
let previousPage = history.pop();
console.log("前のページ: " + history[history.length - 1]);  // "商品一覧"
```

## push()とshift()の組み合わせ

`push()`と`shift()`を組み合わせると、**キュー（Queue）**というデータ構造が実現できます。

### キューとは

キューは、「最初に入れたものを最初に取り出す」（FIFO: First In First Out）構造です。

```javascript
let queue = [];

// 追加（push）
queue.push("太郎");
queue.push("次郎");
queue.push("三郎");
console.log(queue);  // ["太郎", "次郎", "三郎"]

// 削除（shift）
console.log(queue.shift());  // "太郎"（最初に入れたものを取り出す）
console.log(queue.shift());  // "次郎"
console.log(queue.shift());  // "三郎"
```

### 実用例：待ち行列

```javascript
let waitingList = [];

// 順番待ちに追加
waitingList.push("田中さん");
waitingList.push("佐藤さん");
waitingList.push("鈴木さん");

console.log("待ち人数: " + waitingList.length);  // 3

// 順番が来た人を呼ぶ
let next = waitingList.shift();
console.log("次の方: " + next);  // "田中さん"
console.log("残り: " + waitingList.length);  // 2
```

## 実用的な例

### 例1：TODOリストの削除

```javascript
let todos = ["買い物", "掃除", "洗濯"];

// 最後のタスクを完了
let completed = todos.pop();
console.log("完了: " + completed);  // "完了: 洗濯"
console.log("残りのタスク: " + todos.join(", "));  // "残りのタスク: 買い物, 掃除"
```

### 例2：最新の投稿を削除

```javascript
let posts = ["投稿1", "投稿2", "投稿3"];

// 最新の投稿を削除
let deleted = posts.pop();
console.log("削除しました: " + deleted);
```

### 例3：古いデータを削除

```javascript
let logs = ["ログ1", "ログ2", "ログ3", "ログ4", "ログ5"];

// 古いログを削除（先頭から）
while (logs.length > 3) {
  let removed = logs.shift();
  console.log("削除: " + removed);
}

console.log("残りのログ: " + logs.join(", "));
// 出力: "残りのログ: ログ3, ログ4, ログ5"
```

## 注意点

### 1. 元の配列が変更される

`pop()`と`shift()`は、元の配列自体を変更します（破壊的メソッド）。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
fruits.pop();

console.log(fruits);  // ["りんご", "みかん"]（元の配列が変更された）
```

### 2. 空の配列に注意

空の配列で削除メソッドを呼ぶと`undefined`が返されます。

```javascript
let fruits = [];
let removed = fruits.pop();

console.log(removed);  // undefined
```

必要に応じて、長さをチェックしましょう。

```javascript
if (fruits.length > 0) {
  fruits.pop();
}
```

### 3. shift()のパフォーマンス

`shift()`は全要素を移動させるため、大きな配列では遅くなります。

```javascript
// 推奨: pop()を使う
fruits.pop();  // 高速

// 注意: shift()は遅い
fruits.shift();  // 全要素を移動させる必要がある
```

## 練習問題

### 課題：リスト削除機

配列から要素を削除するプログラムを作成してください。

### 保存場所

`exercises/lesson-090/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. `pop()`メソッドで末尾の要素を削除する
2. `shift()`メソッドで先頭の要素を削除する
3. 削除した値を表示する

### 要件

- 配列の表示（id="display"）
- 要素数の表示（id="count"）
- 末尾削除ボタン（id="removeLast"）
- 先頭削除ボタン（id="removeFirst"）
- 結果表示エリア（id="result"）
- 削除した要素を表示する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-090
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

要素を削除する際のポイントを確認しましょう。

**pop()メソッド**
- `配列名.pop()`で末尾を削除します
- 削除した要素が返されます
- 配列の長さが1減ります

**shift()メソッド**
- `配列名.shift()`で先頭を削除します
- 削除した要素が返されます
- 残りの要素が前にずれます

**空の配列チェック**
- `if (配列名.length > 0)`で空でないかチェックします
- 空の配列で削除すると`undefined`が返されます

### 解答例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 090</title>
</head>
<body>
    <h1>フルーツリストから削除</h1>
    <p>現在のリスト: <span id="display"></span></p>
    <p>要素数: <span id="count"></span></p>

    <button id="removeLast">末尾を削除</button>
    <button id="removeFirst">先頭を削除</button>

    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let removeLastButton = document.getElementById("removeLast");
let removeFirstButton = document.getElementById("removeFirst");
let display = document.getElementById("display");
let count = document.getElementById("count");
let result = document.getElementById("result");

// フルーツの配列
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];

// 配列を表示
function showArray() {
  display.textContent = fruits.join(", ");
  count.textContent = fruits.length;
}

// 初期表示
showArray();

// 末尾を削除
removeLastButton.addEventListener("click", function() {
  if (fruits.length > 0) {
    let removed = fruits.pop();
    showArray();
    result.textContent = "「" + removed + "」を削除しました";
  } else {
    result.textContent = "配列は空です";
  }
});

// 先頭を削除
removeFirstButton.addEventListener("click", function() {
  if (fruits.length > 0) {
    let removed = fruits.shift();
    showArray();
    result.textContent = "「" + removed + "」を削除しました";
  } else {
    result.textContent = "配列は空です";
  }
});
```

### 解説

このコードでは、`pop()`と`shift()`メソッドを使って配列から要素を削除しています。

**配列の初期化**
```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
```
- 5つの要素を持つ配列を作成

**配列の表示**
```javascript
function showArray() {
  display.textContent = fruits.join(", ");
  count.textContent = fruits.length;
}
```
- `join(", ")`で配列を文字列に変換
- `length`で要素数を表示

**末尾の削除**
```javascript
if (fruits.length > 0) {
  let removed = fruits.pop();
  showArray();
  result.textContent = "「" + removed + "」を削除しました";
}
```
- 配列が空でないかチェック
- `pop()`で末尾の要素を削除して取得
- 削除した要素を表示

**先頭の削除**
```javascript
if (fruits.length > 0) {
  let removed = fruits.shift();
  showArray();
  result.textContent = "「" + removed + "」を削除しました";
}
```
- `shift()`で先頭の要素を削除して取得
- 残りの要素が前にずれる

**動作の流れ**
1. ボタンをクリック
2. 配列が空でないかチェック
3. 要素を削除して値を取得
4. 更新された配列を表示
5. 削除した要素を表示

## まとめ

お疲れ様でした。今回のレッスンでは、配列から要素を削除する方法を学びました。

**今回学んだキーポイント**

- **pop()メソッド**：`配列名.pop()`の形式で、配列の末尾の要素を削除し、その値を返します
- **shift()メソッド**：`配列名.shift()`の形式で、配列の先頭の要素を削除し、その値を返します
- **戻り値の活用**：削除した要素は戻り値として返されるため、変数に保存して活用できます
- **データ構造**：`push()`と`pop()`でスタック、`push()`と`shift()`でキューを実現できます

配列から要素を削除できることで、動的なデータ管理が可能になります。TODOリストや履歴管理など、実用的なプログラムで頻繁に使われる重要な機能です。

次のレッスンでは、配列の長さについてさらに詳しく学びます。要素数のカウントや空配列の判定など、配列の長さを活用する方法を習得しましょう。
