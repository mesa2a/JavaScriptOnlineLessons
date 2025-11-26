---
title: "レッスン95：配列のコピー"
author: "JavaScript Online Lessons"
date: "2025-11-26"
---

# レッスン95：配列のコピー

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、配列の集計方法を学びました：

- 合計を計算する（`total += value`）
- 平均を計算する（`total / array.length`）
- 最大値・最小値を見つける（`if (value > max)`）
- 一度のループで複数の集計を行う効率的な方法

配列の各要素に対して計算を行い、結果を蓄積するパターンを学びました。

### よくある場面

日常のプログラミングでは、こんな場面に遭遇します：

「配列をソートしたいけど、元の配列も残しておきたい」
「配列を関数に渡したら、元の配列まで変更されてしまった」
「履歴機能を作りたいのに、全部同じ内容になってしまう」

これらはすべて、配列の「参照」という特性が原因です。

### 学習目標

このレッスンでは、配列のコピーについて学びます：

1. **参照の問題を理解する** - なぜ配列のコピーが必要なのか
2. **スプレッド構文でコピーする** - `[...array]`の使い方
3. **安全なコピーの実践** - いつコピーが必要か判断できる
4. **深いコピーを理解する** - `structuredClone()`の使い方

配列を安全に扱うための重要な知識です。

---

## 1. 参照の問題を理解する

### 単純な代入の落とし穴

配列を別の変数に代入しても、新しい配列は作成されません。

**コード例：**
```javascript
let fruits1 = ["りんご", "バナナ"];
let fruits2 = fruits1;

fruits2.push("みかん");

console.log(fruits1);  // ["りんご", "バナナ", "みかん"]
console.log(fruits2);  // ["りんご", "バナナ", "みかん"]
```

**実行の流れ：**

```
ステップ1: fruits1に配列を作成
  メモリ上の配列A: ["りんご", "バナナ"]
  fruits1 → 配列A を指す

ステップ2: fruits2 = fruits1
  fruits2 → 配列A を指す（同じ配列！）

  [配列A]
    ↑  ↑
    |  |
  fruits1
       fruits2

ステップ3: fruits2.push("みかん")
  配列A: ["りんご", "バナナ", "みかん"]
  ↑ fruits1もfruits2も同じ配列を指しているので両方変わる！

最終状態:
  fruits1 → ["りんご", "バナナ", "みかん"]
  fruits2 → ["りんご", "バナナ", "みかん"]
```

`fruits2`に追加したはずなのに、`fruits1`も変更されてしまいました！

### なぜこうなるのか - 参照型の仕組み

JavaScriptには「値型」と「参照型」という2種類のデータがあります。

**値型（プリミティブ型）：**
- 数値、文字列、真偽値など
- 変数には値そのものが入る
- 代入すると値がコピーされる

```javascript
let a = 10;
let b = a;  // 値10がコピーされる
b = 20;

console.log(a);  // 10（変わらない）
console.log(b);  // 20
```

**参照型（オブジェクト型）：**
- 配列、オブジェクトなど
- 変数には「場所（参照）」が入る
- 代入すると参照がコピーされる（値はコピーされない）

```javascript
let fruits1 = ["りんご", "バナナ"];  // 配列を作成
let fruits2 = fruits1;                // 参照がコピーされる
```

**図解：値型と参照型の違い**

```
【値型の場合】
let a = 10;
let b = a;

┌─────┐     ┌─────┐
│ a:10│     │ b:10│
└─────┘     └─────┘
   ↑           ↑
  値そのもの   値そのもの（別のコピー）

【参照型の場合】
let fruits1 = ["りんご"];
let fruits2 = fruits1;

         ┌──────────────────┐
         │["りんご", "バナナ"]│
         └──────────────────┘
              ↑       ↑
              │       │
        ┌─────┴──┐ ┌──┴─────┐
        │fruits1 │ │fruits2 │
        └────────┘ └────────┘
        両方とも同じ配列を指している
```

これは、同じノートを2人で共有しているようなものです。どちらが書き込んでも、同じノートが変更されます。

### 参照の確認方法

2つの変数が同じ配列を指しているかは、`===`で確認できます：

```javascript
let fruits1 = ["りんご", "バナナ"];
let fruits2 = fruits1;
let fruits3 = ["りんご", "バナナ"];

console.log(fruits1 === fruits2);  // true（同じ配列を指している）
console.log(fruits1 === fruits3);  // false（別の配列）
```

**実行の流れ：**

```
配列の作成状態:
  配列A: ["りんご", "バナナ"]
  配列B: ["りんご", "バナナ"]

変数の参照:
  fruits1 → 配列A
  fruits2 → 配列A（同じ！）
  fruits3 → 配列B（別の配列）

比較結果:
  fruits1 === fruits2
  → 両方とも配列Aを指している → true

  fruits1 === fruits3
  → fruits1は配列A、fruits3は配列B → false
```

**重要なポイント：**
- `===`は「中身」ではなく「参照」を比較する
- 内容が同じでも、別の配列なら`false`になる
- 同じ配列を指していれば`true`になる

### よくある問題のパターン

**パターン1: 配列を関数に渡す**

```javascript
function addItem(list, item) {
  list.push(item);
}

let myList = ["りんご"];
addItem(myList, "バナナ");

console.log(myList);  // ["りんご", "バナナ"]（変更されてしまう）
```

**パターン2: 履歴を記録する**

```javascript
let history = [];
let current = ["りんご"];

history.push(current);  // 1回目の記録
current.push("バナナ");
history.push(current);  // 2回目の記録

console.log(history[0]);  // ["りんご", "バナナ"]
console.log(history[1]);  // ["りんご", "バナナ"]
// 両方とも同じになってしまう！
```

**実行の流れ：**

```
ステップ1: 初期状態
  配列A: ["りんご"]
  current → 配列A
  history: []

ステップ2: history.push(current)
  history: [配列Aへの参照]

  history[0] → 配列A

ステップ3: current.push("バナナ")
  配列A: ["りんご", "バナナ"]（変更される）

  current → 配列A
  history[0] → 配列A（同じ配列なので変更される）

ステップ4: history.push(current)（再び参照を追加）
  history: [配列Aへの参照, 配列Aへの参照]

  history[0] → 配列A
  history[1] → 配列A（どちらも同じ配列！）

最終状態:
  配列A: ["りんご", "バナナ"]
  history[0] → 配列A
  history[1] → 配列A

  両方とも ["りんご", "バナナ"] になってしまう
```

これらの問題を解決するには、配列のコピーが必要です。

---

## 2. スプレッド構文によるコピー

### 新しい配列を作る

スプレッド構文`...`を使うと、新しい配列を作成できます：

```javascript
let fruits1 = ["りんご", "バナナ"];
let fruits2 = [...fruits1];

fruits2.push("みかん");

console.log(fruits1);  // ["りんご", "バナナ"]（変わらない）
console.log(fruits2);  // ["りんご", "バナナ", "みかん"]
```

**実行の流れ：**

```
ステップ1: fruits1に配列を作成
  配列A: ["りんご", "バナナ"]
  fruits1 → 配列A

ステップ2: fruits2 = [...fruits1]
  [...fruits1] は要素を展開: "りんご", "バナナ
  新しい配列Bを作成: ["りんご", "バナナ"]
  fruits2 → 配列B

  [配列A]         [配列B]
    ↑              ↑
    |              |
  fruits1      fruits2

ステップ3: fruits2.push("みかん")
  配列B: ["りんご", "バナナ", "みかん"]
  配列A: ["りんご", "バナナ"]（変わらない）

最終状態:
  fruits1 → ["りんご", "バナナ"]
  fruits2 → ["りんご", "バナナ", "みかん"]
```

今度は、`fruits2`を変更しても`fruits1`は変わりません。

### スプレッド構文の仕組み

`...fruits1`は、配列の要素を1つずつ取り出します：

```javascript
let fruits1 = ["りんご", "バナナ"];
let fruits2 = [...fruits1];
// これは次と同じ：
let fruits2 = ["りんご", "バナナ"];
```

**ステップバイステップの展開：**

```
元の配列:
  fruits1 = ["りんご", "バナナ"]

スプレッド構文の展開:
  ...fruits1
  ↓
  "りんご", "バナナ"  (カンマ区切りの要素)

新しい配列の作成:
  [...fruits1]
  ↓
  ["りんご", "バナナ"]  (新しい配列!)
```

新しい`[]`の中に要素をコピーしているので、別の配列になります。

### 配列の結合にも使える

スプレッド構文は、複数の配列を結合する時にも便利です：

**例1: 2つの配列を結合**

```javascript
let fruits = ["りんご", "バナナ"];
let vegetables = ["にんじん", "トマト"];

let foods = [...fruits, ...vegetables];
console.log(foods);
// ["りんご", "バナナ", "にんじん", "トマト"]
```

**実行の流れ：**

```
ステップ1: 配列の準備
  fruits = ["りんご", "バナナ"]
  vegetables = ["にんじん", "トマト"]

ステップ2: スプレッド構文で展開
  ...fruits → "りんご", "バナナ"
  ...vegetables → "にんじん", "トマト"

ステップ3: 新しい配列を作成
  [...fruits, ...vegetables]
  ↓
  ["りんご", "バナナ", "にんじん", "トマト"]

  foods → この新しい配列
```

**例2: 要素を追加しながらコピー**

```javascript
let numbers1 = [1, 2, 3];
let numbers2 = [...numbers1, 4, 5];

console.log(numbers2);  // [1, 2, 3, 4, 5]
```

**実行の流れ：**

```
...numbers1 → 1, 2, 3
新しい要素 → 4, 5

[...numbers1, 4, 5]
↓
[1, 2, 3, 4, 5]
```

**例3: 前後に要素を追加**

```javascript
let middle = ["b", "c"];
let all = ["a", ...middle, "d"];

console.log(all);  // ["a", "b", "c", "d"]
```

スプレッド構文は、配列のどこにでも展開できます。

---

## 3. 安全なコピーの実践

### いつコピーが必要か

配列のコピーが必要な場面を理解しましょう。

**場面1: 元の配列を保持したい時**

```javascript
let original = [1, 2, 3];
let sorted = [...original];
sorted.sort((a, b) => b - a);  // 降順ソート

console.log(original);  // [1, 2, 3]（変更されていない）
console.log(sorted);    // [3, 2, 1]
```

**実行の流れ：**

```
ステップ1: 配列の準備
  配列A: [1, 2, 3]
  original → 配列A

ステップ2: コピーを作成
  配列B: [1, 2, 3]（コピー）
  sorted → 配列B

ステップ3: sortedをソート
  配列B: [3, 2, 1]（配列Bだけが変更される）
  配列A: [1, 2, 3]（変更されない）

最終状態:
  original → [1, 2, 3]
  sorted → [3, 2, 1]
```

**重要：**
- `sort()`は配列を直接変更するメソッド
- コピーしないと元の配列も変更される
- スプレッド構文でコピーすれば安全

**場面2: 関数に渡す時**

```javascript
function addScore(scores, newScore) {
  let copy = [...scores];  // コピーを作る
  copy.push(newScore);
  return copy;
}

let scores = [80, 90];
let newScores = addScore(scores, 95);

console.log(scores);     // [80, 90]（元のまま）
console.log(newScores);  // [80, 90, 95]
```

**実行の流れ：**

```
ステップ1: 関数呼び出し前
  配列A: [80, 90]
  scores → 配列A

ステップ2: 関数内部
  scores引数 → 配列A（参照が渡される）
  copy = [...scores]
  ↓
  配列B: [80, 90]（新しいコピー）
  copy → 配列B

ステップ3: copy.push(95)
  配列B: [80, 90, 95]
  配列A: [80, 90]（変更されない）

ステップ4: return copy
  配列Bを返す
  newScores → 配列B

最終状態:
  scores → [80, 90]（元のまま）
  newScores → [80, 90, 95]
```

**ポイント：**
- 関数内で配列を変更する前にコピーを作る
- 元の配列を保護できる
- 予期しない変更を防げる

**場面3: 配列を変更するメソッドを使う前**

配列を変更するメソッド：
- `push()`, `pop()` - 要素の追加・削除
- `shift()`, `unshift()` - 先頭の追加・削除
- `sort()` - ソート
- `reverse()` - 反転
- `splice()` - 要素の挿入・削除

```javascript
let items = ["c", "a", "b"];
let sortedItems = [...items];
sortedItems.sort();

console.log(items);        // ["c", "a", "b"]（元のまま）
console.log(sortedItems);  // ["a", "b", "c"]
```

**実行の流れ：**

```
元の配列を保持:
  配列A: ["c", "a", "b"]
  items → 配列A

コピーを作成してソート:
  配列B: ["c", "a", "b"]（コピー）
  sortedItems → 配列B
  ↓ sort()
  配列B: ["a", "b", "c"]

結果:
  items → ["c", "a", "b"]（変更なし）
  sortedItems → ["a", "b", "c"]
```

### constでも変更される

`const`で宣言しても、配列の中身は変更できてしまいます：

```javascript
const fruits = ["りんご"];
fruits.push("バナナ");  // エラーにならない！
console.log(fruits);     // ["りんご", "バナナ"]

// これはエラー
// fruits = ["みかん"];  // TypeError: Assignment to constant variable
```

**constの仕組み：**

```
constが防ぐこと:
  fruits = ["みかん"];  ← 再代入はエラー

constが防げないこと:
  fruits.push("バナナ");  ← 配列の中身の変更はOK
  fruits[0] = "みかん";   ← 要素の変更もOK
```

**図解：constの制約**

```
const fruits = ["りんご"];

┌────────┐      ┌──────────┐
│ fruits │ ───→ │["りんご"] │
└────────┘      └──────────┘
    ↑               ↑
    |               |
  この参照は     配列の中身は
  変更不可      変更可能！
```

**重要：**
- `const`は変数の再代入を防ぐだけ
- 配列の中身の変更は防げない
- 元の配列を保護したい時は、コピーを作って操作する

### 実践例：正しいコピーの使い方

```javascript
const originalData = [10, 20, 30];

// ❌ 間違った方法
const data1 = originalData;
data1.push(40);
console.log(originalData);  // [10, 20, 30, 40]（変更されてしまう）

// ✅ 正しい方法
const data2 = [...originalData];
data2.push(40);
console.log(originalData);  // [10, 20, 30]（変更されない）
```

---

## 4. structuredClone()による深いコピー

### 浅いコピーと深いコピー

スプレッド構文は「浅いコピー（shallow copy）」を作ります。配列の中に配列やオブジェクトがある場合、その内部は参照のままです。

**浅いコピーの問題：**

```javascript
let original = [[1, 2], [3, 4]];
let copy = [...original];

copy[0].push(5);

console.log(original);  // [[1, 2, 5], [3, 4]]（変更された！）
console.log(copy);      // [[1, 2, 5], [3, 4]]
```

**実行の流れ：**

```
ステップ1: 元の配列の構造
  内部配列A: [1, 2]
  内部配列B: [3, 4]
  外側配列C: [内部配列A, 内部配列B]
  original → 外側配列C

ステップ2: スプレッド構文でコピー
  copy = [...original]
  ↓
  外側配列D: [内部配列A, 内部配列B]
  copy → 外側配列D

  【重要】外側はコピーされるが、内部は参照のまま！

  構造:
    original → [配列A, 配列B]
    copy → [配列A, 配列B]（配列AとBは同じもの）

ステップ3: copy[0].push(5)
  copy[0] → 配列A
  配列A.push(5) → [1, 2, 5]

  original[0]も配列Aを指しているので変更される！

最終状態:
  配列A: [1, 2, 5]
  配列B: [3, 4]
  original → [配列A, 配列B]
  copy → [配列A, 配列B]

  両方とも [[1, 2, 5], [3, 4]] になる
```

**図解：浅いコピーの構造**

```
【元の配列】
original → [[1, 2], [3, 4]]
             ↓       ↓
           配列A    配列B

【浅いコピー後】
original → [配列A, 配列B]
copy → [配列A, 配列B]
         ↑       ↑
      同じ配列を参照している！

copy[0].push(5) すると:
  配列A → [1, 2, 5]

originalもcopyも同じ配列Aを参照しているので
両方とも [[1, 2, 5], [3, 4]] になる
```

外側の配列はコピーされましたが、内側の配列`[1, 2]`は参照のままなので、両方が変更されます。

### structuredClone()で深いコピー

`structuredClone()`を使うと、「深いコピー（deep copy）」が作れます：

```javascript
let original = [[1, 2], [3, 4]];
let copy = structuredClone(original);

copy[0].push(5);

console.log(original);  // [[1, 2], [3, 4]]（変更されない）
console.log(copy);      // [[1, 2, 5], [3, 4]]
```

**実行の流れ：**

```
ステップ1: 元の配列の構造
  内部配列A: [1, 2]
  内部配列B: [3, 4]
  外側配列C: [内部配列A, 内部配列B]
  original → 外側配列C

ステップ2: structuredClone()でコピー
  copy = structuredClone(original)
  ↓
  内部配列A': [1, 2]（新しいコピー）
  内部配列B': [3, 4]（新しいコピー）
  外側配列D: [内部配列A', 内部配列B']（新しいコピー）
  copy → 外側配列D

  【重要】すべてが新しいコピーになる！

  構造:
    original → [配列A, 配列B]
    copy → [配列A', 配列B']（別の配列）

ステップ3: copy[0].push(5)
  copy[0] → 配列A'
  配列A'.push(5) → [1, 2, 5]

  original[0]は配列Aなので変更されない！

最終状態:
  配列A: [1, 2]
  配列B: [3, 4]
  original → [配列A, 配列B] = [[1, 2], [3, 4]]

  配列A': [1, 2, 5]
  配列B': [3, 4]
  copy → [配列A', 配列B'] = [[1, 2, 5], [3, 4]]
```

**図解：深いコピーの構造**

```
【元の配列】
original → [[1, 2], [3, 4]]
             ↓       ↓
           配列A    配列B

【深いコピー後】
original → [配列A, 配列B]
copy → [配列A', 配列B']
         ↓       ↓
    新しいコピー  新しいコピー

copy[0].push(5) すると:
  配列A' → [1, 2, 5]（配列A'だけ変更）
  配列A → [1, 2]（変更されない）

original → [[1, 2], [3, 4]]
copy → [[1, 2, 5], [3, 4]]
```

内側の配列も含めて、すべてコピーされます。

### いつ使うか

**スプレッド構文で十分な場合：**

```javascript
// 数値や文字列だけの配列 → スプレッド構文でOK
let numbers = [1, 2, 3];
let copy = [...numbers];

let fruits = ["りんご", "バナナ"];
let copy = [...fruits];
```

**理由：**
- 数値や文字列は「値型」なので自動的にコピーされる
- 配列が1階層しかない場合は問題ない

**structuredClone()が必要な場合：**

```javascript
// 配列の中に配列がある → structuredClone()
let matrix = [[1, 2], [3, 4]];
let copy = structuredClone(matrix);

// 配列の中にオブジェクトがある → structuredClone()
let users = [
  { name: "太郎", scores: [80, 90] },
  { name: "花子", scores: [85, 95] }
];
let copy = structuredClone(users);
```

**判断基準：**

```
配列の中身が:
  数値、文字列、真偽値だけ
  → スプレッド構文でOK

配列の中身に:
  配列やオブジェクトが含まれる
  → structuredClone()を使う
```

### 実践例：オブジェクトを含む配列のコピー

```javascript
let students = [
  { name: "太郎", scores: [80, 90, 85] },
  { name: "花子", scores: [75, 85, 90] }
];

// ❌ 浅いコピー（問題あり）
let copy1 = [...students];
copy1[0].scores.push(95);
console.log(students[0].scores);  // [80, 90, 85, 95]（変更される）

// ✅ 深いコピー（安全）
let copy2 = structuredClone(students);
copy2[0].scores.push(95);
console.log(students[0].scores);  // [80, 90, 85]（変更されない）
```

**実行の流れ：**

```
【浅いコピーの場合】
元の構造:
  scoresA: [80, 90, 85]
  studentA: { name: "太郎", scores: scoresA }
  students → [studentA, ...]

copy1 = [...students]:
  copy1 → [studentA, ...]（同じオブジェクトを参照）

copy1[0].scores.push(95):
  studentA.scores → scoresA
  scoresA.push(95) → [80, 90, 85, 95]
  studentsもcopy1も同じscoresAを参照 → 両方変更される

【深いコピーの場合】
copy2 = structuredClone(students):
  scoresA': [80, 90, 85]（新しいコピー）
  studentA': { name: "太郎", scores: scoresA' }（新しいコピー）
  copy2 → [studentA', ...]

copy2[0].scores.push(95):
  studentA'.scores → scoresA'
  scoresA'.push(95) → [80, 90, 85, 95]
  studentsは変更されない
```

### 制限事項

`structuredClone()`は、関数はコピーできません：

```javascript
let array = [1, 2, function() { console.log("hello"); }];
let copy = structuredClone(array);  // エラー
// DataCloneError: function() { console.log("hello"); } could not be cloned
```

**コピーできるもの：**
- 数値、文字列、真偽値
- 配列、オブジェクト
- Date、Map、Setなど

**コピーできないもの：**
- 関数
- Symbol
- DOM要素

関数を含む場合は、スプレッド構文を使うか、手動でコピーする必要があります。

---

## 5. 実践例：買い物リストの履歴管理

配列のコピーを使って、買い物リストの履歴を記録するアプリを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>買い物リスト履歴</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    input {
      padding: 8px;
      font-size: 16px;
      width: 200px;
    }
    button {
      padding: 8px 16px;
      font-size: 16px;
      margin-left: 10px;
      cursor: pointer;
    }
    #currentList, #history {
      margin-top: 20px;
    }
    ul {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
    }
    li {
      margin: 5px 0;
    }
    h2 {
      color: #333;
      border-bottom: 2px solid #4CAF50;
      padding-bottom: 5px;
    }
  </style>
</head>
<body>
  <h1>買い物リスト履歴</h1>

  <div>
    <input type="text" id="itemInput" placeholder="商品名">
    <button id="addButton">追加</button>
    <button id="saveButton">保存</button>
  </div>

  <h2>現在のリスト</h2>
  <div id="currentList"></div>

  <h2>保存した履歴</h2>
  <div id="history"></div>

  <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let currentList = [];
let savedLists = [];

let itemInput = document.getElementById("itemInput");
let addButton = document.getElementById("addButton");
let saveButton = document.getElementById("saveButton");
let currentListDiv = document.getElementById("currentList");
let historyDiv = document.getElementById("history");

addButton.addEventListener("click", function() {
  let item = itemInput.value;
  if (item === "") return;

  currentList.push(item);
  itemInput.value = "";
  showCurrentList();
});

saveButton.addEventListener("click", function() {
  if (currentList.length === 0) return;

  // コピーを保存（重要！）
  let copy = [...currentList];
  savedLists.push(copy);

  currentList = [];  // 現在のリストをクリア
  showCurrentList();
  showHistory();
});

function showCurrentList() {
  if (currentList.length === 0) {
    currentListDiv.innerHTML = "<p>（空）</p>";
    return;
  }

  let html = "<ul>";
  for (let item of currentList) {
    html += "<li>" + item + "</li>";
  }
  html += "</ul>";
  currentListDiv.innerHTML = html;
}

function showHistory() {
  if (savedLists.length === 0) {
    historyDiv.innerHTML = "<p>（履歴なし）</p>";
    return;
  }

  let html = "";
  for (let i = 0; i < savedLists.length; i++) {
    html += "<h3>リスト " + (i + 1) + "</h3>";
    html += "<ul>";
    for (let item of savedLists[i]) {
      html += "<li>" + item + "</li>";
    }
    html += "</ul>";
  }
  historyDiv.innerHTML = html;
}

showCurrentList();
showHistory();
```

### 重要なポイント

**正しいコピーの使用：**

```javascript
// ✅ 正しい方法
let copy = [...currentList];
savedLists.push(copy);
```

**もし間違えたら：**

```javascript
// ❌ 間違った方法
savedLists.push(currentList);
```

**実行の流れ（間違った方法の場合）：**

```
1回目の保存:
  currentList → ["りんご"]
  savedLists.push(currentList)
  savedLists → [["りんご"]]（参照を保存）

商品を追加:
  currentList.push("バナナ")
  currentList → ["りんご", "バナナ"]

2回目の保存:
  savedLists.push(currentList)
  savedLists → [["りんご", "バナナ"], ["りんご", "バナナ"]]

すべての履歴が同じ配列を指しているため、
全部同じ内容になってしまう！
```

**実行の流れ（正しい方法の場合）：**

```
1回目の保存:
  currentList → ["りんご"]
  copy = [...currentList] → ["りんご"]（新しい配列）
  savedLists.push(copy)
  savedLists → [["りんご"]]

商品を追加:
  currentList.push("バナナ")
  currentList → ["りんご", "バナナ"]

2回目の保存:
  copy = [...currentList] → ["りんご", "バナナ"]（新しい配列）
  savedLists.push(copy)
  savedLists → [["りんご"], ["りんご", "バナナ"]]

各履歴が独立した配列なので、
それぞれ異なる内容を保持できる
```

---

## 6. 配列コピー機の作成

カリキュラムの成果物として、配列のコピーを体験できる「配列コピー機」を作りましょう。

### HTML

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>配列コピー機</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }
    .demo-section {
      background: #f9f9f9;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
      border-left: 4px solid #4CAF50;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      margin: 5px;
      cursor: pointer;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:hover {
      background: #45a049;
    }
    .result {
      background: white;
      padding: 15px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: monospace;
      min-height: 30px;
    }
    h2 {
      color: #333;
      border-bottom: 2px solid #4CAF50;
      padding-bottom: 5px;
    }
    h3 {
      color: #555;
    }
    .warning {
      background: #fff3cd;
      border-left-color: #ffc107;
    }
    .success {
      background: #d4edda;
      border-left-color: #28a745;
    }
  </style>
</head>
<body>
  <h1>配列コピー機</h1>

  <div class="demo-section warning">
    <h3>❌ 参照の問題デモ</h3>
    <button id="referenceDemo">参照の問題を見る</button>
    <div class="result" id="referenceResult"></div>
  </div>

  <div class="demo-section success">
    <h3>✅ スプレッド構文でコピー</h3>
    <button id="spreadDemo">スプレッド構文を見る</button>
    <div class="result" id="spreadResult"></div>
  </div>

  <div class="demo-section success">
    <h3>✅ structuredClone()で深いコピー</h3>
    <button id="deepDemo">深いコピーを見る</button>
    <div class="result" id="deepResult"></div>
  </div>

  <div class="demo-section">
    <h3>実践：履歴管理</h3>
    <input type="text" id="input" placeholder="値を入力" style="padding: 8px; font-size: 16px;">
    <button id="addHistory">履歴に追加</button>
    <div class="result" id="historyResult"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
// デモ1: 参照の問題
document.getElementById("referenceDemo").addEventListener("click", function() {
  let result = "";

  // 配列を作成
  let fruits1 = ["りんご", "バナナ"];
  result += "fruits1 = [\"りんご\", \"バナナ\"]\n";

  // 代入
  let fruits2 = fruits1;
  result += "fruits2 = fruits1（参照をコピー）\n\n";

  // fruits2に要素を追加
  fruits2.push("みかん");
  result += "fruits2.push(\"みかん\")\n\n";

  // 結果を表示
  result += "fruits1: " + JSON.stringify(fruits1) + "\n";
  result += "fruits2: " + JSON.stringify(fruits2) + "\n\n";
  result += "❌ fruits1も変更されてしまった！\n";
  result += "理由: fruits1とfruits2は同じ配列を指している";

  document.getElementById("referenceResult").innerText = result;
});

// デモ2: スプレッド構文
document.getElementById("spreadDemo").addEventListener("click", function() {
  let result = "";

  // 配列を作成
  let fruits1 = ["りんご", "バナナ"];
  result += "fruits1 = [\"りんご\", \"バナナ\"]\n";

  // スプレッド構文でコピー
  let fruits2 = [...fruits1];
  result += "fruits2 = [...fruits1]（新しい配列を作成）\n\n";

  // fruits2に要素を追加
  fruits2.push("みかん");
  result += "fruits2.push(\"みかん\")\n\n";

  // 結果を表示
  result += "fruits1: " + JSON.stringify(fruits1) + "\n";
  result += "fruits2: " + JSON.stringify(fruits2) + "\n\n";
  result += "✅ fruits1は変更されていない！\n";
  result += "理由: fruits2は新しい配列なので独立している";

  document.getElementById("spreadResult").innerText = result;
});

// デモ3: 深いコピー
document.getElementById("deepDemo").addEventListener("click", function() {
  let result = "";

  result += "【浅いコピーの問題】\n";
  let original1 = [[1, 2], [3, 4]];
  result += "original1 = [[1, 2], [3, 4]]\n";

  let copy1 = [...original1];
  result += "copy1 = [...original1]（浅いコピー）\n";

  copy1[0].push(5);
  result += "copy1[0].push(5)\n\n";

  result += "original1: " + JSON.stringify(original1) + "\n";
  result += "copy1: " + JSON.stringify(copy1) + "\n";
  result += "❌ 内部の配列は変更される\n\n";

  result += "【深いコピーで解決】\n";
  let original2 = [[1, 2], [3, 4]];
  result += "original2 = [[1, 2], [3, 4]]\n";

  let copy2 = structuredClone(original2);
  result += "copy2 = structuredClone(original2)（深いコピー）\n";

  copy2[0].push(5);
  result += "copy2[0].push(5)\n\n";

  result += "original2: " + JSON.stringify(original2) + "\n";
  result += "copy2: " + JSON.stringify(copy2) + "\n";
  result += "✅ 内部の配列も独立している";

  document.getElementById("deepResult").innerText = result;
});

// デモ4: 履歴管理
let history = [];

document.getElementById("addHistory").addEventListener("click", function() {
  let input = document.getElementById("input");
  let value = input.value;

  if (value === "") return;

  // 履歴に追加（配列のコピーを使用）
  history.push(value);
  input.value = "";

  // 表示
  let result = "履歴:\n";
  for (let i = 0; i < history.length; i++) {
    result += (i + 1) + ". " + history[i] + "\n";
  }

  document.getElementById("historyResult").innerText = result;
});
```

### 動作の説明

**参照の問題デモ：**
```
ボタンをクリック
↓
fruits1 = ["りんご", "バナナ"]を作成
↓
fruits2 = fruits1（参照をコピー）
↓
fruits2.push("みかん")
↓
fruits1も変更される（同じ配列を指している）
↓
結果を表示
```

**スプレッド構文デモ：**
```
ボタンをクリック
↓
fruits1 = ["りんご", "バナナ"]を作成
↓
fruits2 = [...fruits1]（新しい配列を作成）
↓
fruits2.push("みかん")
↓
fruits1は変更されない（別の配列）
↓
結果を表示
```

**深いコピーデモ：**
```
【浅いコピー】
original1 = [[1, 2], [3, 4]]
copy1 = [...original1]
copy1[0].push(5)
→ 内部配列は参照なので両方変更される

【深いコピー】
original2 = [[1, 2], [3, 4]]
copy2 = structuredClone(original2)
copy2[0].push(5)
→ 完全に独立しているので変更されない
```

---

## 7. 練習問題

配列のコピーを使った「履歴機能付きカウンター」を作成してください。

### 要件

1. 「+1」ボタンでカウントを増やす
2. 「保存」ボタンで現在の値を履歴に記録する
3. 履歴は配列で管理する
4. 履歴の平均値を表示する
5. 履歴をリスト表示する

### ヒント

```javascript
let history = [];
let current = 0;

// +1ボタン
current = current + 1;

// 保存する時
history.push(current);  // 数値は自動的にコピーされる

// 平均を計算
let total = 0;
for (let value of history) {
  total += value;
}
let average = total / history.length;
```

**重要な注意：**
- 数値は「値型」なので、変数に代入すると自動的にコピーされる
- 配列やオブジェクトなどの「参照型」だけ、スプレッド構文が必要
- `history.push(current)`で問題ない（currentは数値なので）

### 発展課題

1. 「クリア」ボタンで履歴を空にする
2. 履歴の最大値・最小値も表示する
3. 履歴が空の時は平均を「-」と表示する

---

## まとめ

今回は、配列のコピーについて学びました。

### 学んだこと

**1. 参照の問題**
- `let array2 = array1`では同じ配列を指す
- 片方を変更すると両方が変更される
- 配列は「参照型」のデータ

**2. スプレッド構文**
- `let array2 = [...array1]`で新しい配列を作る
- 「浅いコピー（shallow copy）」を作成
- 1階層の配列には十分

**3. structuredClone()**
- `structuredClone(array)`で深いコピーを作る
- ネストした配列やオブジェクトも完全にコピー
- 関数は含められない

**4. 使い分け**
- 通常の配列：スプレッド構文
- ネストした配列：structuredClone()
- 履歴管理、ソート前、関数に渡す前などで使用

### 重要なポイント

```javascript
// ❌ 参照をコピー（同じ配列）
let array2 = array1;

// ✅ 浅いコピー（新しい配列）
let array2 = [...array1];

// ✅ 深いコピー（完全に独立）
let array2 = structuredClone(array1);
```

### カリキュラムの要件チェック

- ✅ 参照の問題 - 配列の代入では参照がコピーされることを理解
- ✅ スプレッド構文[...array] - 新しい配列を作成する方法を習得
- ✅ 安全なコピー - いつコピーが必要か判断できるようになった
- ✅ structuredClone() - 深いコピーの方法を学んだ
- ✅ 成果物：配列コピー機 - 参照、浅いコピー、深いコピーを実践

### 次のレッスンの予告

次のレッスンでは、配列の結合について学びます：

- `concat()`メソッドの使い方
- 複数の配列を1つにまとめる
- 元の配列を変更しない安全な結合
- スプレッド構文との比較

配列を安全に操作する技術をさらに深めていきましょう。
