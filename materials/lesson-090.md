---
title: "Lesson 090: 要素の削除"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン90：要素の削除

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、配列に要素を追加する方法を学びました。

**配列への要素追加**：`push()`メソッドを使うと、配列の末尾に新しい要素を追加できます。
```javascript
let fruits = ["りんご", "みかん"];
fruits.push("ぶどう");  // ["りんご", "みかん", "ぶどう"]
```

**複数要素の追加**：`push()`には複数の引数を渡すことができます。
```javascript
fruits.push("バナナ", "メロン");  // 一度に複数追加
```

**配列の拡張**：`push()`を使うたびに配列の長さが自動的に増えていきます。

### よくある場面

実際のプログラミングでは、こんな場面で配列から要素を削除します。

**場面1：TODOリストの完了**
```
「買い物」「掃除」「洗濯」という3つのタスクがあり、
一番最後の「洗濯」が終わったので削除したい
→ pop()で末尾を削除
```

**場面2：古いログの削除**
```
システムログが「ログ1」「ログ2」「ログ3」...と増えていき、
一番古い「ログ1」から削除したい
→ shift()で先頭を削除
```

**場面3：取り消し機能**
```
ユーザーの操作履歴を記録していて、
「戻る」ボタンで最後の操作を取り消したい
→ pop()で最後の操作を削除して取得
```

### 学習目標

このレッスンでは、配列から要素を削除する方法を学びます。

- `pop()`メソッドで末尾の要素を削除する
- `shift()`メソッドで先頭の要素を削除する
- 削除した値を取得して活用する方法を理解する

配列から要素を削除できるようになると、動的にデータを管理できるプログラムを作成できます。

## pop()メソッド：末尾の削除

### 基本的な構文

**pop()メソッド**は、配列の末尾の要素を削除し、その値を返すメソッドです。

```javascript
配列名.pop();
```

### 実行の流れを詳しく見てみよう

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]

fruits.pop();
console.log(fruits);  // ["りんご", "みかん"]
```

#### 実行フロー

```
1. 実行前の配列の状態
   fruits = ["りんご", "みかん", "ぶどう"]
   インデックス: 0=りんご, 1=みかん, 2=ぶどう
   長さ: 3

2. fruits.pop() を実行
   ↓
   内部の動作:
   - 配列の末尾（インデックス2）を探す
   - その位置の値 "ぶどう" を取得
   - 配列からその要素を削除
   - 配列の長さを 3 → 2 に更新
   - 削除した値 "ぶどう" を返す（今回は使っていない）

3. 実行後の配列の状態
   fruits = ["りんご", "みかん"]
   インデックス: 0=りんご, 1=みかん
   長さ: 2
```

### ビジュアル図解

**変更前**：
```
インデックス:  0        1        2
値:         "りんご"  "みかん"  "ぶどう"  ← この要素が削除される
長さ: 3
```

**変更後**：
```
インデックス:  0        1
値:         "りんご"  "みかん"
長さ: 2
```

末尾の要素が削除され、配列の長さが1減ります。

### 配列の長さの変化

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits.length);  // 3

fruits.pop();
console.log(fruits.length);  // 2
```

#### 実行フロー

```
1. 最初の状態
   fruits = ["りんご", "みかん", "ぶどう"]
   fruits.length = 3

2. console.log(fruits.length) を実行
   ↓
   出力: 3

3. fruits.pop() を実行
   ↓
   - 末尾の "ぶどう" を削除
   - length プロパティが自動的に 3 → 2 に更新される

4. 削除後の状態
   fruits = ["りんご", "みかん"]
   fruits.length = 2

5. console.log(fruits.length) を実行
   ↓
   出力: 2
```

**重要なポイント**：
- `pop()`を使うと、配列の長さが自動的に1減ります
- 長さを手動で変更する必要はありません
- JavaScriptが自動的に長さを管理してくれます

## pop()の戻り値を活用する

`pop()`メソッドは、削除した要素を返します。この戻り値を変数に保存して活用できます。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let removed = fruits.pop();

console.log(removed);  // "ぶどう"（削除された要素）
console.log(fruits);   // ["りんご", "みかん"]（残った配列）
```

#### 実行フロー

```
1. 実行前の状態
   fruits = ["りんご", "みかん", "ぶどう"]
   removed = undefined（まだ値が入っていない）

2. fruits.pop() を実行
   ↓
   内部の動作:
   - 配列の末尾（インデックス2）の値 "ぶどう" を取得
   - 配列から "ぶどう" を削除
   - 取得した値 "ぶどう" を返す

3. let removed = ... で戻り値を保存
   ↓
   removed = "ぶどう"

4. 実行後の状態
   fruits = ["りんご", "みかん"]
   removed = "ぶどう"

5. console.log(removed) を実行
   ↓
   出力: "ぶどう"

6. console.log(fruits) を実行
   ↓
   出力: ["りんご", "みかん"]
```

### 削除した値を活用する例

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let lastFruit = fruits.pop();

console.log("削除したフルーツ: " + lastFruit);  // "削除したフルーツ: ぶどう"
console.log("残りのフルーツ: " + fruits.join(", "));  // "残りのフルーツ: りんご, みかん"
```

#### 実行フロー

```
1. 実行前の状態
   fruits = ["りんご", "みかん", "ぶどう"]

2. fruits.pop() を実行して lastFruit に保存
   ↓
   - "ぶどう" が削除される
   - lastFruit = "ぶどう"
   - fruits = ["りんご", "みかん"]

3. "削除したフルーツ: " + lastFruit を計算
   ↓
   - "削除したフルーツ: " と "ぶどう" を連結
   - 結果: "削除したフルーツ: ぶどう"

4. console.log(...) で出力
   ↓
   出力: "削除したフルーツ: ぶどう"

5. fruits.join(", ") を実行
   ↓
   - ["りんご", "みかん"] を ", " で連結
   - 結果: "りんご, みかん"

6. "残りのフルーツ: " + ... を計算
   ↓
   結果: "残りのフルーツ: りんご, みかん"

7. console.log(...) で出力
   ↓
   出力: "残りのフルーツ: りんご, みかん"
```

**活用のポイント**：
- 削除した要素を変数に保存できる
- 削除した値を使ってメッセージを表示できる
- 削除した値を使って別の処理を行える

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

#### 実行フロー

```
1. 初期状態
   fruits = ["りんご", "みかん", "ぶどう", "いちご"]
   インデックス: 0=りんご, 1=みかん, 2=ぶどう, 3=いちご
   長さ: 4

2. 1回目の fruits.pop() を実行
   ↓
   - 末尾（インデックス3）の "いちご" を削除
   - fruits = ["りんご", "みかん", "ぶどう"]
   - 長さ: 3

3. console.log(fruits) を実行
   ↓
   出力: ["りんご", "みかん", "ぶどう"]

4. 2回目の fruits.pop() を実行
   ↓
   - 末尾（インデックス2）の "ぶどう" を削除
   - fruits = ["りんご", "みかん"]
   - 長さ: 2

5. console.log(fruits) を実行
   ↓
   出力: ["りんご", "みかん"]

6. 3回目の fruits.pop() を実行
   ↓
   - 末尾（インデックス1）の "みかん" を削除
   - fruits = ["りんご"]
   - 長さ: 1

7. console.log(fruits) を実行
   ↓
   出力: ["りんご"]
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

#### 実行フロー

```
1. 初期状態
   numbers = [1, 2, 3, 4, 5]
   length = 5

2. 1回目のループ
   - 条件チェック: numbers.length > 0 → 5 > 0 → true
   - numbers.pop() を実行 → 5 を削除して返す
   - removed = 5
   - console.log("削除: 5")
   - numbers = [1, 2, 3, 4], length = 4

3. 2回目のループ
   - 条件チェック: 4 > 0 → true
   - numbers.pop() → 4 を削除
   - removed = 4
   - console.log("削除: 4")
   - numbers = [1, 2, 3], length = 3

4. 3回目のループ
   - 条件チェック: 3 > 0 → true
   - numbers.pop() → 3 を削除
   - removed = 3
   - console.log("削除: 3")
   - numbers = [1, 2], length = 2

5. 4回目のループ
   - 条件チェック: 2 > 0 → true
   - numbers.pop() → 2 を削除
   - removed = 2
   - console.log("削除: 2")
   - numbers = [1], length = 1

6. 5回目のループ
   - 条件チェック: 1 > 0 → true
   - numbers.pop() → 1 を削除
   - removed = 1
   - console.log("削除: 1")
   - numbers = [], length = 0

7. 6回目のループ判定
   - 条件チェック: 0 > 0 → false
   - ループ終了

8. console.log(numbers) を実行
   ↓
   出力: []
```

**出力**：
```
削除: 5
削除: 4
削除: 3
削除: 2
削除: 1
```

**重要なポイント**：
- 末尾から順番に削除される（5, 4, 3, 2, 1の順）
- `length > 0`の条件で、配列が空になったら停止
- 最終的に空の配列`[]`になる

## 空の配列でpop()

空の配列で`pop()`を呼ぶと、`undefined`が返されます。

```javascript
let fruits = [];
let removed = fruits.pop();

console.log(removed);  // undefined
console.log(fruits);   // []（変わらず空）
```

#### 実行フロー

```
1. 実行前の状態
   fruits = []（空の配列）
   length = 0

2. fruits.pop() を実行
   ↓
   内部の動作:
   - 配列が空かどうかチェック
   - 空なので削除する要素がない
   - undefined を返す
   - 配列は変更されない

3. removed に undefined が代入される
   ↓
   removed = undefined

4. console.log(removed) を実行
   ↓
   出力: undefined

5. console.log(fruits) を実行
   ↓
   出力: []
```

### 空配列のチェック

```javascript
let fruits = ["りんご"];

if (fruits.length > 0) {
  let removed = fruits.pop();
  console.log("削除しました: " + removed);
} else {
  console.log("配列は空です");
}
```

#### 実行フロー

```
1. 実行前の状態
   fruits = ["りんご"]
   length = 1

2. fruits.length > 0 を評価
   ↓
   - fruits.length = 1
   - 1 > 0 → true

3. if ブロックが実行される
   ↓
   - fruits.pop() を実行
   - "りんご" が削除される
   - removed = "りんご"
   - fruits = []

4. "削除しました: " + removed を計算
   ↓
   結果: "削除しました: りんご"

5. console.log(...) を実行
   ↓
   出力: "削除しました: りんご"
```

**もし配列が空だった場合**：
```
1. fruits = []
   length = 0

2. fruits.length > 0 を評価
   ↓
   - fruits.length = 0
   - 0 > 0 → false

3. else ブロックが実行される
   ↓
   console.log("配列は空です")

4. 出力: "配列は空です"
```

**推奨される書き方**：
- `pop()`を実行する前に、配列が空でないかチェックする
- `if (配列.length > 0)`で空配列を判定する
- エラーを防ぎ、わかりやすいメッセージを表示できる

## shift()メソッド：先頭の削除

### 基本的な構文

**shift()メソッド**は、配列の先頭の要素を削除し、その値を返すメソッドです。

```javascript
配列名.shift();
```

### 実行の流れを詳しく見てみよう

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits);  // ["りんご", "みかん", "ぶどう"]

fruits.shift();
console.log(fruits);  // ["みかん", "ぶどう"]
```

#### 実行フロー

```
1. 実行前の配列の状態
   fruits = ["りんご", "みかん", "ぶどう"]
   インデックス: 0=りんご, 1=みかん, 2=ぶどう
   長さ: 3

2. fruits.shift() を実行
   ↓
   内部の動作:
   - 配列の先頭（インデックス0）の値 "りんご" を取得
   - 配列から "りんご" を削除
   - 残りの要素を前にずらす
     みかん: インデックス 1 → 0
     ぶどう: インデックス 2 → 1
   - 配列の長さを 3 → 2 に更新
   - 削除した値 "りんご" を返す

3. 実行後の配列の状態
   fruits = ["みかん", "ぶどう"]
   インデックス: 0=みかん, 1=ぶどう
   長さ: 2
```

### ビジュアル図解

**変更前**：
```
インデックス:  0        1        2
値:         "りんご"  "みかん"  "ぶどう"
            ↑
            この要素が削除される
```

**削除と移動**：
```
"りんご" を削除
↓
"みかん" がインデックス 1 → 0 に移動
"ぶどう" がインデックス 2 → 1 に移動
```

**変更後**：
```
インデックス:  0        1
値:         "みかん"  "ぶどう"
```

**重要なポイント**：
- 先頭の要素が削除される
- 残りの要素が全て前にずれる（インデックスが変わる）
- 配列の長さが1減る

### shift()の戻り値

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
let removed = fruits.shift();

console.log(removed);  // "りんご"（削除された要素）
console.log(fruits);   // ["みかん", "ぶどう"]（残った配列）
```

#### 実行フロー

```
1. 実行前の状態
   fruits = ["りんご", "みかん", "ぶどう"]

2. fruits.shift() を実行
   ↓
   - 先頭の "りんご" を削除
   - 残りの要素を前にずらす
   - "りんご" を返す

3. removed に "りんご" が代入される
   ↓
   removed = "りんご"
   fruits = ["みかん", "ぶどう"]

4. console.log(removed) を実行
   ↓
   出力: "りんご"

5. console.log(fruits) を実行
   ↓
   出力: ["みかん", "ぶどう"]
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

### ビジュアル比較

**pop()の場合**：
```
削除前: ["りんご", "みかん", "ぶどう"]
                              ↑
                           ここを削除
削除後: ["りんご", "みかん"]
```

**shift()の場合**：
```
削除前: ["りんご", "みかん", "ぶどう"]
         ↑
      ここを削除（残りは前にずれる）
削除後: ["みかん", "ぶどう"]
```

### 比較表

| メソッド | 削除位置 | 戻り値 | 配列の変化 | 処理速度 |
|---------|---------|--------|-----------|----------|
| `pop()` | 末尾 | 削除した要素 | 長さが1減る | 高速 |
| `shift()` | 先頭 | 削除した要素 | 長さが1減り、要素が前にずれる | 低速 |

### パフォーマンスの違い

```javascript
// pop(): 高速（末尾を削除するだけ）
fruits.pop();
// 内部の動作: 末尾の要素を削除 → 完了

// shift(): 低速（すべての要素をずらす必要がある）
fruits.shift();
// 内部の動作: 先頭を削除 → 残りの要素を全て前にずらす
```

**なぜshift()は遅いのか**：
```
例: [1, 2, 3, 4, 5] から先頭を削除

1. 先頭の 1 を削除
2. 2 をインデックス 1 → 0 に移動
3. 3 をインデックス 2 → 1 に移動
4. 4 をインデックス 3 → 2 に移動
5. 5 をインデックス 4 → 3 に移動

→ 要素が多いほど、移動回数が増えて遅くなる
```

**pop()の場合**：
```
例: [1, 2, 3, 4, 5] から末尾を削除

1. 末尾の 5 を削除
→ 完了

→ 要素数に関係なく高速
```

**推奨**：特別な理由がない限り、`pop()`の使用が推奨されます。

## 実用的な例

### 例1：TODOリストの削除

```javascript
let todos = ["買い物", "掃除", "洗濯"];

// 最後のタスクを完了
let completed = todos.pop();
console.log("完了: " + completed);  // "完了: 洗濯"
console.log("残りのタスク: " + todos.join(", "));  // "残りのタスク: 買い物, 掃除"
```

#### 実行フロー

```
1. 初期状態
   todos = ["買い物", "掃除", "洗濯"]

2. todos.pop() を実行
   ↓
   - "洗濯" が削除される
   - completed = "洗濯"
   - todos = ["買い物", "掃除"]

3. メッセージを作成して出力
   ↓
   出力: "完了: 洗濯"
   出力: "残りのタスク: 買い物, 掃除"
```

### 例2：最新の投稿を削除

```javascript
let posts = ["投稿1", "投稿2", "投稿3"];

// 最新の投稿を削除
let deleted = posts.pop();
console.log("削除しました: " + deleted);
```

#### 実行フロー

```
1. 初期状態
   posts = ["投稿1", "投稿2", "投稿3"]
   ※ 配列の末尾が最新の投稿

2. posts.pop() を実行
   ↓
   - "投稿3" が削除される
   - deleted = "投稿3"
   - posts = ["投稿1", "投稿2"]

3. メッセージを出力
   ↓
   出力: "削除しました: 投稿3"
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

#### 実行フロー

```
1. 初期状態
   logs = ["ログ1", "ログ2", "ログ3", "ログ4", "ログ5"]
   length = 5
   ※ 配列の先頭が最も古いログ

2. 1回目のループ
   - 条件: 5 > 3 → true
   - logs.shift() → "ログ1" を削除
   - console.log("削除: ログ1")
   - logs = ["ログ2", "ログ3", "ログ4", "ログ5"], length = 4

3. 2回目のループ
   - 条件: 4 > 3 → true
   - logs.shift() → "ログ2" を削除
   - console.log("削除: ログ2")
   - logs = ["ログ3", "ログ4", "ログ5"], length = 3

4. 3回目のループ判定
   - 条件: 3 > 3 → false
   - ループ終了

5. 最終出力
   ↓
   出力: "残りのログ: ログ3, ログ4, ログ5"
```

**出力**：
```
削除: ログ1
削除: ログ2
残りのログ: ログ3, ログ4, ログ5
```

**この例の特徴**：
- `shift()`で古いログから削除
- `length > 3`で最大3件までログを保持
- 自動的に古いログが削除される

## push()とpop()の組み合わせ：スタック

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

#### 実行フロー

```
1. 空の配列を作成
   stack = []

2. stack.push("A") を実行
   ↓
   stack = ["A"]

3. stack.push("B") を実行
   ↓
   stack = ["A", "B"]

4. stack.push("C") を実行
   ↓
   stack = ["A", "B", "C"]

5. console.log(stack) を実行
   ↓
   出力: ["A", "B", "C"]

6. stack.pop() を実行
   ↓
   - "C" を削除して返す（最後に入れたもの）
   - stack = ["A", "B"]
   - 出力: "C"

7. stack.pop() を実行
   ↓
   - "B" を削除して返す
   - stack = ["A"]
   - 出力: "B"

8. stack.pop() を実行
   ↓
   - "A" を削除して返す
   - stack = []
   - 出力: "A"
```

### スタックのビジュアル

```
お皿を重ねるイメージ:

push("A"):  |   |
            | A |
            -----

push("B"):  | B |
            | A |
            -----

push("C"):  | C |  ← 最後に置いた
            | B |
            | A |
            -----

pop():      | B |  ← "C" を取り出した
            | A |
            -----

pop():      | A |  ← "B" を取り出した
            -----

pop():      |   |  ← "A" を取り出した
            -----
```

**LIFO（後入れ先出し）の原則**：
- 最後に入れたものが最初に出る
- 下にあるものを取り出すには、上のものを全て取り出す必要がある

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

#### 実行フロー

```
1. 空の履歴配列を作成
   history = []

2. ページ訪問を記録
   ↓
   history.push("ホーム")
   → history = ["ホーム"]

   history.push("商品一覧")
   → history = ["ホーム", "商品一覧"]

   history.push("商品詳細")
   → history = ["ホーム", "商品一覧", "商品詳細"]

3. 現在のページを表示
   ↓
   history[history.length - 1]
   = history[3 - 1]
   = history[2]
   = "商品詳細"

   出力: "現在のページ: 商品詳細"

4. 戻るボタンをクリック（pop）
   ↓
   previousPage = history.pop()
   → "商品詳細" が削除される
   → previousPage = "商品詳細"
   → history = ["ホーム", "商品一覧"]

5. 前のページを表示
   ↓
   history[history.length - 1]
   = history[2 - 1]
   = history[1]
   = "商品一覧"

   出力: "前のページ: 商品一覧"
```

**この仕組みの利点**：
- ブラウザの「戻る」ボタンと同じ動作
- 最後に訪問したページから順に戻れる
- 訪問履歴を簡単に管理できる

## push()とshift()の組み合わせ：キュー

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

#### 実行フロー

```
1. 空の配列を作成
   queue = []

2. queue.push("太郎") を実行
   ↓
   queue = ["太郎"]

3. queue.push("次郎") を実行
   ↓
   queue = ["太郎", "次郎"]

4. queue.push("三郎") を実行
   ↓
   queue = ["太郎", "次郎", "三郎"]

5. console.log(queue) を実行
   ↓
   出力: ["太郎", "次郎", "三郎"]

6. queue.shift() を実行
   ↓
   - "太郎" を削除して返す（最初に入れたもの）
   - 残りの要素を前にずらす
   - queue = ["次郎", "三郎"]
   - 出力: "太郎"

7. queue.shift() を実行
   ↓
   - "次郎" を削除して返す
   - queue = ["三郎"]
   - 出力: "次郎"

8. queue.shift() を実行
   ↓
   - "三郎" を削除して返す
   - queue = []
   - 出力: "三郎"
```

### キューのビジュアル

```
行列に並ぶイメージ:

push("太郎"):  [太郎]
               ↑先頭（最初に入った）

push("次郎"):  [太郎][次郎]
               ↑先頭

push("三郎"):  [太郎][次郎][三郎]
               ↑先頭          ↑末尾（最後に入った）

shift():       [次郎][三郎]  ← "太郎" が先に出る
               ↑先頭

shift():       [三郎]  ← "次郎" が次に出る
               ↑先頭

shift():       []  ← "三郎" が最後に出る
```

**FIFO（先入れ先出し）の原則**：
- 最初に入れたものが最初に出る
- 行列や待ち行列と同じ仕組み

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

#### 実行フロー

```
1. 空の待ち行列を作成
   waitingList = []

2. 順番待ちに追加
   ↓
   waitingList.push("田中さん")
   → waitingList = ["田中さん"]

   waitingList.push("佐藤さん")
   → waitingList = ["田中さん", "佐藤さん"]

   waitingList.push("鈴木さん")
   → waitingList = ["田中さん", "佐藤さん", "鈴木さん"]

3. 待ち人数を表示
   ↓
   waitingList.length = 3
   出力: "待ち人数: 3"

4. 順番が来た人を呼ぶ（shift）
   ↓
   next = waitingList.shift()
   → "田中さん" が削除される（最初に並んだ人）
   → next = "田中さん"
   → waitingList = ["佐藤さん", "鈴木さん"]

5. 呼ばれた人を表示
   ↓
   出力: "次の方: 田中さん"

6. 残りの人数を表示
   ↓
   waitingList.length = 2
   出力: "残り: 2"
```

**この仕組みの利点**：
- 公平な順番管理（先に並んだ人が先に呼ばれる）
- 待ち行列の管理が簡単
- レストラン、銀行、チケット販売などで使われる

## スタックとキューの違い

### スタック（LIFO）
```javascript
let stack = [];
stack.push("A");  // 追加
stack.push("B");  // 追加
stack.push("C");  // 追加
stack.pop();      // "C" が出る（最後に入れたもの）
stack.pop();      // "B" が出る
stack.pop();      // "A" が出る
```

**イメージ**：お皿の重ね、本の積み重ね、履歴管理

### キュー（FIFO）
```javascript
let queue = [];
queue.push("A");  // 追加
queue.push("B");  // 追加
queue.push("C");  // 追加
queue.shift();    // "A" が出る（最初に入れたもの）
queue.shift();    // "B" が出る
queue.shift();    // "C" が出る
```

**イメージ**：行列、待ち行列、印刷ジョブ

## 実践例：リスト削除機

HTMLとJavaScriptを組み合わせて、配列から要素を削除するプログラムを作ってみましょう。

### HTML（index.html）

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

### JavaScript（script.js）

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

#### 初期化部分

```javascript
let removeLastButton = document.getElementById("removeLast");
let removeFirstButton = document.getElementById("removeFirst");
let display = document.getElementById("display");
let count = document.getElementById("count");
let result = document.getElementById("result");
```

**実行フロー**：
```
1. document.getElementById("removeLast") を実行
   ↓
   - HTMLから id="removeLast" の要素を探す
   - <button id="removeLast">末尾を削除</button> を取得
   - removeLastButton 変数に保存

2. 同様に他の要素も取得
   ↓
   - removeFirstButton: 先頭削除ボタン
   - display: リスト表示エリア
   - count: 要素数表示エリア
   - result: 結果表示エリア
```

#### 配列の準備

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
```

**初期状態**：
```
fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
インデックス: 0=りんご, 1=みかん, 2=ぶどう, 3=バナナ, 4=メロン
長さ: 5
```

#### 表示関数

```javascript
function showArray() {
  display.textContent = fruits.join(", ");
  count.textContent = fruits.length;
}
```

**実行フロー**：
```
1. fruits.join(", ") を実行
   ↓
   - 配列を ", " で連結
   - ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]
     → "りんご, みかん, ぶどう, バナナ, メロン"

2. display.textContent に代入
   ↓
   - <span id="display"> の中身が更新される
   - 画面に "りんご, みかん, ぶどう, バナナ, メロン" が表示される

3. count.textContent に fruits.length を代入
   ↓
   - fruits.length = 5
   - <span id="count"> の中身が "5" に更新される
   - 画面に "要素数: 5" が表示される
```

#### 初期表示

```javascript
showArray();
```

**実行フロー**：
```
1. ページ読み込み時に showArray() を実行
   ↓
   - 配列の初期状態を画面に表示
   - "りんご, みかん, ぶどう, バナナ, メロン"
   - "要素数: 5"
```

#### 末尾削除ボタン

```javascript
removeLastButton.addEventListener("click", function() {
  if (fruits.length > 0) {
    let removed = fruits.pop();
    showArray();
    result.textContent = "「" + removed + "」を削除しました";
  } else {
    result.textContent = "配列は空です";
  }
});
```

**クリック時の実行フロー**：
```
例: fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"] の状態で
    「末尾を削除」ボタンをクリック

1. fruits.length > 0 をチェック
   ↓
   - fruits.length = 5
   - 5 > 0 → true（配列は空でない）

2. fruits.pop() を実行
   ↓
   - 末尾の "メロン" を削除
   - removed = "メロン"
   - fruits = ["りんご", "みかん", "ぶどう", "バナナ"]

3. showArray() を実行
   ↓
   - display: "りんご, みかん, ぶどう, バナナ"
   - count: "4"

4. result.textContent に削除メッセージを設定
   ↓
   - "「" + "メロン" + "」を削除しました"
   - result: "「メロン」を削除しました"

5. 画面に表示される内容
   ↓
   現在のリスト: りんご, みかん, ぶどう, バナナ
   要素数: 4
   「メロン」を削除しました
```

**配列が空の場合の実行フロー**：
```
例: fruits = [] の状態で「末尾を削除」ボタンをクリック

1. fruits.length > 0 をチェック
   ↓
   - fruits.length = 0
   - 0 > 0 → false（配列は空）

2. else ブロックが実行される
   ↓
   result.textContent = "配列は空です"

3. 画面に表示される内容
   ↓
   現在のリスト:
   要素数: 0
   配列は空です
```

#### 先頭削除ボタン

```javascript
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

**クリック時の実行フロー**：
```
例: fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"] の状態で
    「先頭を削除」ボタンをクリック

1. fruits.length > 0 をチェック
   ↓
   - fruits.length = 5
   - 5 > 0 → true

2. fruits.shift() を実行
   ↓
   - 先頭の "りんご" を削除
   - 残りの要素を前にずらす
   - removed = "りんご"
   - fruits = ["みかん", "ぶどう", "バナナ", "メロン"]

3. showArray() を実行
   ↓
   - display: "みかん, ぶどう, バナナ, メロン"
   - count: "4"

4. result.textContent に削除メッセージを設定
   ↓
   result: "「りんご」を削除しました"

5. 画面に表示される内容
   ↓
   現在のリスト: みかん, ぶどう, バナナ, メロン
   要素数: 4
   「りんご」を削除しました
```

### 使用例シナリオ

**シナリオ1：末尾を複数回削除**
```
初期状態:
  現在のリスト: りんご, みかん, ぶどう, バナナ, メロン
  要素数: 5

「末尾を削除」をクリック:
  現在のリスト: りんご, みかん, ぶどう, バナナ
  要素数: 4
  「メロン」を削除しました

「末尾を削除」をクリック:
  現在のリスト: りんご, みかん, ぶどう
  要素数: 3
  「バナナ」を削除しました
```

**シナリオ2：先頭と末尾を交互に削除**
```
初期状態:
  現在のリスト: りんご, みかん, ぶどう, バナナ, メロン
  要素数: 5

「先頭を削除」をクリック:
  現在のリスト: みかん, ぶどう, バナナ, メロン
  要素数: 4
  「りんご」を削除しました

「末尾を削除」をクリック:
  現在のリスト: みかん, ぶどう, バナナ
  要素数: 3
  「メロン」を削除しました
```

## 注意点

### 1. 元の配列が変更される

`pop()`と`shift()`は、元の配列自体を変更します（破壊的メソッド）。

```javascript
let fruits = ["りんご", "みかん", "ぶどう"];
fruits.pop();

console.log(fruits);  // ["りんご", "みかん"]（元の配列が変更された）
```

**実行フロー**：
```
1. 元の配列
   fruits = ["りんご", "みかん", "ぶどう"]

2. fruits.pop() を実行
   ↓
   - 配列自体が変更される
   - 新しい配列を作るのではなく、既存の配列から要素を削除

3. 実行後
   fruits = ["りんご", "みかん"]
   ※ 同じ配列が変更された
```

**重要なポイント**：
- 元の配列を保持したい場合は、コピーを作ってから操作する
- 配列のコピー方法：`let copy = [...fruits]` または `let copy = fruits.slice()`

### 2. 空の配列に注意

空の配列で削除メソッドを呼ぶと`undefined`が返されます。

```javascript
let fruits = [];
let removed = fruits.pop();

console.log(removed);  // undefined
```

**推奨される書き方**：
```javascript
if (fruits.length > 0) {
  fruits.pop();
}
```

**なぜチェックが必要か**：
```
空の配列で削除すると:
- エラーにはならない
- undefined が返される
- 意図しない動作の原因になる

チェックすることで:
- 空配列での削除を防げる
- わかりやすいメッセージを表示できる
- プログラムの安全性が向上する
```

### 3. shift()のパフォーマンス

`shift()`は全要素を移動させるため、大きな配列では遅くなります。

```javascript
// 推奨: pop()を使う
fruits.pop();  // 高速

// 注意: shift()は遅い
fruits.shift();  // 全要素を移動させる必要がある
```

**パフォーマンス比較**：
```
10,000個の要素を持つ配列の場合:

pop():
- 末尾の1個を削除するだけ
- 処理時間: 0.001秒

shift():
- 先頭を削除
- 残り9,999個を全て前にずらす
- 処理時間: 0.1秒（100倍遅い）
```

**推奨される使い分け**：
- 末尾の削除が可能なら`pop()`を使う
- どうしても先頭から削除する必要がある場合のみ`shift()`を使う

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
```javascript
let removed = 配列名.pop();
```
- 配列の末尾を削除します
- 削除した要素が返されます
- 配列の長さが1減ります

**shift()メソッド**
```javascript
let removed = 配列名.shift();
```
- 配列の先頭を削除します
- 削除した要素が返されます
- 残りの要素が前にずれます

**空の配列チェック**
```javascript
if (配列名.length > 0) {
  // 削除処理
} else {
  // 空配列の場合の処理
}
```
- `length > 0`で空でないかチェックします
- 空の配列で削除すると`undefined`が返されます

**配列の表示**
```javascript
function showArray() {
  display.textContent = fruits.join(", ");
  count.textContent = fruits.length;
}
```
- `join(", ")`で配列を文字列に変換
- `length`で要素数を表示
- 削除後に必ず呼び出して画面を更新

### 解答例

#### HTML（index.html）

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

#### JavaScript（script.js）

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

#### 配列の初期化

```javascript
let fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"];
```

**解説**：
```
1. 5つの要素を持つ配列を作成
   ↓
   fruits = ["りんご", "みかん", "ぶどう", "バナナ", "メロン"]

2. この配列が削除操作の対象になる
```

#### 表示関数

```javascript
function showArray() {
  display.textContent = fruits.join(", ");
  count.textContent = fruits.length;
}
```

**解説**：
```
この関数の役割:
1. 配列を文字列に変換して表示
   - join(", ") で "りんご, みかん, ..." という形式に

2. 要素数を表示
   - length プロパティで現在の要素数を取得

3. 削除後に呼び出すことで、画面を最新の状態に更新
```

#### 末尾の削除処理

```javascript
if (fruits.length > 0) {
  let removed = fruits.pop();
  showArray();
  result.textContent = "「" + removed + "」を削除しました";
}
```

**解説**：
```
1. 配列が空でないかチェック
   - length > 0 で確認

2. pop()で末尾の要素を削除して取得
   - 削除した値を removed 変数に保存

3. showArray()で画面を更新
   - 新しい配列の状態を表示

4. 削除した要素を表示
   - ユーザーに何が削除されたか知らせる
```

#### 先頭の削除処理

```javascript
if (fruits.length > 0) {
  let removed = fruits.shift();
  showArray();
  result.textContent = "「" + removed + "」を削除しました";
}
```

**解説**：
```
1. 配列が空でないかチェック
   - pop()の場合と同じ

2. shift()で先頭の要素を削除して取得
   - 残りの要素が前にずれる

3. showArray()で画面を更新

4. 削除した要素を表示
```

#### 動作の流れ

```
【初期表示】
showArray() が実行される
↓
画面に表示:
  現在のリスト: りんご, みかん, ぶどう, バナナ, メロン
  要素数: 5

【「末尾を削除」ボタンをクリック】
1. fruits.length > 0 をチェック → true
2. fruits.pop() を実行 → "メロン" を削除
3. showArray() を実行
4. result に "「メロン」を削除しました" を表示

画面に表示:
  現在のリスト: りんご, みかん, ぶどう, バナナ
  要素数: 4
  「メロン」を削除しました

【「先頭を削除」ボタンをクリック】
1. fruits.length > 0 をチェック → true
2. fruits.shift() を実行 → "りんご" を削除
3. showArray() を実行
4. result に "「りんご」を削除しました" を表示

画面に表示:
  現在のリスト: みかん, ぶどう, バナナ
  要素数: 3
  「りんご」を削除しました

【全て削除して、さらにクリック】
配列が空の状態で「末尾を削除」をクリック:
1. fruits.length > 0 をチェック → false
2. else ブロックが実行される
3. result に "配列は空です" を表示

画面に表示:
  現在のリスト:
  要素数: 0
  配列は空です
```

## まとめ

お疲れ様でした。今回のレッスンでは、配列から要素を削除する方法を学びました。

### 今回学んだキーポイント

**pop()メソッド**：
- `配列名.pop()`の形式で、配列の末尾の要素を削除します
- 削除した要素を戻り値として返します
- 配列の長さが1減ります
- 処理が高速です

**shift()メソッド**：
- `配列名.shift()`の形式で、配列の先頭の要素を削除します
- 削除した要素を戻り値として返します
- 残りの要素が前にずれます
- 処理が低速なので、可能な限りpop()を使いましょう

**戻り値の活用**：
- 削除した要素は戻り値として取得できます
- 変数に保存して、削除した値を使った処理ができます
- 削除と同時に値を取得できるので便利です

**データ構造**：
- `push()`と`pop()`でスタック（LIFO: 後入れ先出し）を実現
- `push()`と`shift()`でキュー（FIFO: 先入れ先出し）を実現
- 履歴管理や待ち行列など、実用的な場面で使えます

**注意点**：
- 元の配列が変更される（破壊的メソッド）
- 空の配列で削除すると`undefined`が返される
- `shift()`は全要素を移動させるため、大きな配列では遅い

配列から要素を削除できることで、動的なデータ管理が可能になります。TODOリストの完了、ログの削除、履歴管理など、実用的なプログラムで頻繁に使われる重要な機能です。

## カリキュラムの要件チェック

このレッスンは、カリキュラムの以下の要件を満たしています。

✅ **fruits.pop()で末尾削除**：`pop()`メソッドを使って配列の末尾から要素を削除する方法を学びました

✅ **fruits.shift()で先頭削除**：`shift()`メソッドを使って配列の先頭から要素を削除する方法を学びました

✅ **削除した値を確認**：`pop()`と`shift()`の戻り値を変数に保存して、削除した値を取得・表示する方法を学びました

✅ **成果物：リスト削除機**：HTMLとJavaScriptを組み合わせて、末尾削除ボタンと先頭削除ボタンを持つリスト削除機を実装しました

## 次回予告

次のレッスンでは、配列の長さについてさらに詳しく学びます。

- `length`プロパティの活用
- 要素数のカウント
- 空配列の判定
- 配列のサイズに応じた処理

配列の長さを正しく扱えるようになると、より柔軟な配列操作ができるようになります。楽しみにしていてください。
