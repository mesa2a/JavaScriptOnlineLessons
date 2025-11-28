---
title: "レッスン100：リストの更新"
author: "JavaScript Online Lessons"
date: "2025-11-26"
---

# レッスン100：リストの更新

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、`createElement`と`appendChild`を使った安全な要素作成を学びました：

```javascript
let li = document.createElement("li");
li.textContent = "りんご";
ul.appendChild(li);
```

しかし、配列のデータが変わったとき、**どうやって画面を更新するのか？**という疑問が残ります。

### よくある場面

実際のアプリ開発では：
- ユーザーがボタンをクリックして、配列に新しい項目を追加した
- 項目を削除したり、並び替えたりした
- でも、**画面は自動的に更新されない！**

このような場面で、データと画面を同期させる必要があります。

### 学習目標

このレッスンでは、**配列の変更と画面の再描画**について学びます：
- 配列が変わったら表示を更新する仕組み
- 古い表示をクリアする方法
- 新しく生成し直すパターン
- データと画面の状態を同期させる考え方
- 効率的な更新方法

---

## 1. データと表示の同期

### JavaScriptの重要な原則

**JavaScriptでは、配列を変更しても画面は自動的に更新されません！**

```javascript
let fruits = ["りんご", "バナナ"];

// 最初の表示
let ul = document.getElementById("list");
for (let fruit of fruits) {
  let li = document.createElement("li");
  li.textContent = fruit;
  ul.appendChild(li);
}

// 配列に追加
fruits.push("みかん");

// 問題：画面には「りんご」と「バナナ」だけ表示されている！
// 「みかん」は表示されない！
```

#### 実行の流れ

```
初期状態
┌────────────────────────────┐
│ 配列：                     │
│ fruits = ["りんご", "バナナ"] │
└────────────────────────────┘

最初の表示
┌────────────────────────────┐
│ 画面：                     │
│ <ul>                       │
│   <li>りんご</li>          │
│   <li>バナナ</li>          │
│ </ul>                      │
└────────────────────────────┘

fruits.push("みかん"); を実行
┌────────────────────────────┐
│ 配列：                     │
│ fruits = ["りんご", "バナナ", "みかん"] │
└────────────────────────────┘

しかし画面は...
┌────────────────────────────┐
│ 画面：（変わらない！）     │
│ <ul>                       │
│   <li>りんご</li>          │
│   <li>バナナ</li>          │
│ </ul>                      │
└────────────────────────────┘

問題：配列と画面が不一致！
```

### 解決策：表示更新関数を作る

配列を変更したら、**必ず表示を更新する関数を呼ぶ**：

```javascript
let fruits = ["りんご", "バナナ"];

function showFruits() {
  let ul = document.getElementById("list");
  ul.replaceChildren();  // 古い表示をクリア

  for (let fruit of fruits) {
    let li = document.createElement("li");
    li.textContent = fruit;
    ul.appendChild(li);
  }
}

// 初期表示
showFruits();

// データを変更したら再表示
fruits.push("みかん");
showFruits();  // ← これで画面が更新される！
```

#### 実行の流れ（詳細版）

```
=== 初期表示：showFruits()を呼ぶ ===

配列の状態
┌────────────────────────────┐
│ fruits = ["りんご", "バナナ"] │
└────────────────────────────┘

ul.replaceChildren(); を実行
┌────────────────────────────┐
│ <ul></ul>  （空にする）    │
└────────────────────────────┘

ループで要素を作成・追加
┌────────────────────────────┐
│ <ul>                       │
│   <li>りんご</li>          │
│   <li>バナナ</li>          │
│ </ul>                      │
└────────────────────────────┘

配列と画面が一致！

=== データ変更：fruits.push("みかん"); ===

配列の状態
┌────────────────────────────┐
│ fruits = ["りんご", "バナナ", "みかん"] │
└────────────────────────────┘

画面の状態（まだ古い）
┌────────────────────────────┐
│ <ul>                       │
│   <li>りんご</li>          │
│   <li>バナナ</li>          │
│ </ul>                      │
└────────────────────────────┘

配列と画面が不一致！

=== 再描画：showFruits()を呼ぶ ===

ul.replaceChildren(); を実行
┌────────────────────────────┐
│ <ul></ul>  （古い表示を削除）│
└────────────────────────────┘

ループで要素を作成・追加（最新の配列から）
┌────────────────────────────┐
│ <ul>                       │
│   <li>りんご</li>          │
│   <li>バナナ</li>          │
│   <li>みかん</li> ← 追加！ │
│ </ul>                      │
└────────────────────────────┘

配列と画面が再び一致！
```

---

## 2. 基本的な更新パターン

### 3ステップの更新パターン

画面を更新する関数は、常に次の3ステップで構成します：

```javascript
function updateDisplay() {
  // ステップ1：古い表示をクリア
  container.replaceChildren();

  // ステップ2：配列をループ
  for (let item of array) {
    // ステップ3：各要素を作成して追加
    let element = document.createElement("div");
    element.textContent = item;
    container.appendChild(element);
  }
}
```

#### 3ステップの詳細図解

```
ステップ1：古い表示をクリア
┌────────────────────────────────────┐
│ 実行前：                           │
│ <div id="container">               │
│   <div>古い要素1</div>             │
│   <div>古い要素2</div>             │
│   <div>古い要素3</div>             │
│ </div>                             │
└────────────────────────────────────┘
↓ container.replaceChildren();
┌────────────────────────────────────┐
│ 実行後：                           │
│ <div id="container"></div>         │
│ （空になった）                     │
└────────────────────────────────────┘

ステップ2：配列をループ
┌────────────────────────────────────┐
│ array = ["項目A", "項目B", "項目C"] │
│                                    │
│ for (let item of array) { ... }    │
│ ↓                                  │
│ 1回目：item = "項目A"              │
│ 2回目：item = "項目B"              │
│ 3回目：item = "項目C"              │
└────────────────────────────────────┘

ステップ3：各要素を作成して追加
┌────────────────────────────────────┐
│ 1回目：                            │
│ element = <div>項目A</div>         │
│ container.appendChild(element);    │
│ ↓                                  │
│ <div id="container">               │
│   <div>項目A</div>                 │
│ </div>                             │
└────────────────────────────────────┘
┌────────────────────────────────────┐
│ 2回目：                            │
│ element = <div>項目B</div>         │
│ container.appendChild(element);    │
│ ↓                                  │
│ <div id="container">               │
│   <div>項目A</div>                 │
│   <div>項目B</div>                 │
│ </div>                             │
└────────────────────────────────────┘
┌────────────────────────────────────┐
│ 3回目：                            │
│ element = <div>項目C</div>         │
│ container.appendChild(element);    │
│ ↓                                  │
│ <div id="container">               │
│   <div>項目A</div>                 │
│   <div>項目B</div>                 │
│   <div>項目C</div>                 │
│ </div>                             │
└────────────────────────────────────┘

完成！配列の内容が画面に反映された！
```

### なぜ毎回クリアして作り直すのか？

**理由1：シンプルで確実**
- 古い要素と新しい要素を比較する必要がない
- どの要素を残して、どの要素を削除するか考えなくていい
- コードが簡単で理解しやすい

**理由2：データと画面の一貫性**
- 配列の内容が100%正確に画面に反映される
- バグが起きにくい

**理由3：パフォーマンスの問題は少ない**
- 小規模なリスト（数十〜数百項目）では十分速い
- 最近のブラウザは高速

---

## 3. 追加・削除での更新

### 要素を追加する

ボタンをクリックして配列に要素を追加する例：

```javascript
let fruits = ["りんご", "バナナ"];
let addButton = document.getElementById("addButton");
let input = document.getElementById("input");

addButton.addEventListener("click", function() {
  let value = input.value.trim();

  // 空文字チェック
  if (value === "") return;

  // 配列に追加
  fruits.push(value);

  // 画面を更新
  showFruits();

  // 入力欄をクリア
  input.value = "";
});

function showFruits() {
  let ul = document.getElementById("list");
  ul.replaceChildren();

  for (let fruit of fruits) {
    let li = document.createElement("li");
    li.textContent = fruit;
    ul.appendChild(li);
  }
}

// 初期表示
showFruits();
```

#### 実行の流れ（ユーザーが「みかん」を追加）

```
初期状態
┌────────────────────────────┐
│ 配列：                     │
│ fruits = ["りんご", "バナナ"] │
│                            │
│ 画面：                     │
│ <ul>                       │
│   <li>りんご</li>          │
│   <li>バナナ</li>          │
│ </ul>                      │
└────────────────────────────┘

ユーザーの操作
┌────────────────────────────┐
│ 1. 入力欄に「みかん」と入力│
│ 2. 追加ボタンをクリック    │
└────────────────────────────┘

クリックイベント発火
┌────────────────────────────┐
│ let value = input.value.trim(); │
│ → value = "みかん"         │
│                            │
│ if (value === "") return;  │
│ → "みかん"は空ではない     │
└────────────────────────────┘

配列に追加
┌────────────────────────────┐
│ fruits.push(value);        │
│ ↓                          │
│ fruits = ["りんご", "バナナ", "みかん"] │
└────────────────────────────┘

画面を更新：showFruits()
┌────────────────────────────┐
│ ul.replaceChildren();      │
│ ↓                          │
│ <ul></ul> （クリア）       │
└────────────────────────────┘

ループで再生成
┌────────────────────────────┐
│ <ul>                       │
│   <li>りんご</li>          │
│   <li>バナナ</li>          │
│   <li>みかん</li> ← 追加！ │
│ </ul>                      │
└────────────────────────────┘

入力欄をクリア
┌────────────────────────────┐
│ input.value = "";          │
│ → 次の入力の準備完了       │
└────────────────────────────┘
```

### 要素を削除する

各項目に削除ボタンを付けて、削除できるようにする例：

```javascript
function showFruits() {
  let ul = document.getElementById("list");
  ul.replaceChildren();

  for (let i = 0; i < fruits.length; i++) {
    let li = document.createElement("li");
    li.textContent = fruits[i] + " ";

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function() {
      // 配列から削除
      fruits.splice(i, 1);

      // 画面を更新
      showFruits();
    });

    li.appendChild(deleteButton);
    ul.appendChild(li);
  }
}
```

#### 実行の流れ（「バナナ」を削除）

```
初期状態
┌────────────────────────────────────┐
│ fruits = ["りんご", "バナナ", "みかん"] │
│                                    │
│ <ul>                               │
│   <li>りんご <button>削除</button></li> │
│   <li>バナナ <button>削除</button></li> │
│   <li>みかん <button>削除</button></li> │
│ </ul>                              │
└────────────────────────────────────┘

ユーザーが「バナナ」の削除ボタンをクリック
┌────────────────────────────────────┐
│ クリック！                         │
│ ↓                                  │
│ deleteButtonのイベントハンドラ実行 │
│ （i=1のループで作られた関数）      │
└────────────────────────────────────┘

配列から削除
┌────────────────────────────────────┐
│ fruits.splice(i, 1);  // i=1       │
│ ↓                                  │
│ fruits = ["りんご", "みかん"]      │
│ （"バナナ"が削除された）           │
└────────────────────────────────────┘

画面を更新：showFruits()
┌────────────────────────────────────┐
│ ul.replaceChildren();              │
│ ↓                                  │
│ <ul></ul> （古い表示をクリア）     │
└────────────────────────────────────┘

ループで再生成
┌────────────────────────────────────┐
│ i=0: fruits[0] = "りんご"          │
│ → <li>りんご <button>削除</button></li> │
│                                    │
│ i=1: fruits[1] = "みかん"          │
│ → <li>みかん <button>削除</button></li> │
└────────────────────────────────────┘

最終的な画面
┌────────────────────────────────────┐
│ <ul>                               │
│   <li>りんご <button>削除</button></li> │
│   <li>みかん <button>削除</button></li> │
│ </ul>                              │
│                                    │
│ 「バナナ」が消えた！               │
└────────────────────────────────────┘
```

---

## 4. クリア方法の比較

画面をクリアする方法は3つあります。それぞれの特徴を見てみましょう。

### 方法1：replaceChildren()（推奨）

```javascript
container.replaceChildren();
```

**利点**：
- ✅ モダンで推奨される方法
- ✅ シンプルで読みやすい
- ✅ すべての子要素を確実に削除
- ✅ イベントリスナーも正しく削除される

**欠点**：
- ❌ 非常に古いブラウザでは使えない（IE非対応）

### 方法2：innerHTML = ""

```javascript
container.innerHTML = "";
```

**利点**：
- ✅ 短くて簡単
- ✅ 古いブラウザでも動作

**欠点**：
- ❌ イベントリスナーが正しく削除されない場合がある
- ❌ メモリリークの原因になることも

### 方法3：while + removeChild

```javascript
while (container.firstChild) {
  container.removeChild(container.firstChild);
}
```

**利点**：
- ✅ 非常に古いブラウザでも動作
- ✅ 確実にすべての子要素を削除

**欠点**：
- ❌ コードが長い
- ❌ 読みにくい

### 実行の流れの比較

```
初期状態（共通）
┌────────────────────────────┐
│ <div id="container">       │
│   <p>項目1</p>             │
│   <p>項目2</p>             │
│   <p>項目3</p>             │
│ </div>                     │
└────────────────────────────┘

方法1：container.replaceChildren();
┌────────────────────────────┐
│ <div id="container"></div> │
│ （一度に全て削除）         │
└────────────────────────────┘

方法2：container.innerHTML = "";
┌────────────────────────────┐
│ <div id="container"></div> │
│ （文字列として空にする）   │
└────────────────────────────┘

方法3：while + removeChild
┌────────────────────────────┐
│ 1回目：firstChild = <p>項目1</p> を削除 │
│ <div id="container">       │
│   <p>項目2</p>             │
│   <p>項目3</p>             │
│ </div>                     │
└────────────────────────────┘
┌────────────────────────────┐
│ 2回目：firstChild = <p>項目2</p> を削除 │
│ <div id="container">       │
│   <p>項目3</p>             │
│ </div>                     │
└────────────────────────────┘
┌────────────────────────────┐
│ 3回目：firstChild = <p>項目3</p> を削除 │
│ <div id="container"></div> │
└────────────────────────────┘
┌────────────────────────────┐
│ 4回目：firstChild = null   │
│ → ループ終了               │
└────────────────────────────┘
```

**推奨**：モダンなブラウザのみをサポートするなら`replaceChildren()`を使いましょう。

---

## 5. 更新のタイミング

### いつ更新するか

**原則：配列を変更するたびに、必ず画面を更新します**

```javascript
// 追加
fruits.push("みかん");
showFruits();

// 削除
fruits.pop();
showFruits();

// 変更
fruits[0] = "メロン";
showFruits();

// ソート
fruits.sort();
showFruits();

// フィルタ（新しい配列を作る）
fruits = fruits.filter(f => f !== "バナナ");
showFruits();
```

### まとめて更新（パフォーマンス最適化）

複数の変更を行う場合は、**最後に1回だけ更新**します：

```javascript
// ❌ 悪い例：何度も更新
fruits.push("みかん");
showFruits();  // 1回目の再描画
fruits.push("ぶどう");
showFruits();  // 2回目の再描画
fruits.push("いちご");
showFruits();  // 3回目の再描画
// → 3回も画面を再描画している（無駄）

// ✅ 良い例：まとめて更新
fruits.push("みかん");
fruits.push("ぶどう");
fruits.push("いちご");
showFruits();  // 1回だけ再描画
// → パフォーマンスが3倍良い
```

#### 実行の流れの比較

```
悪い例：何度も更新
┌────────────────────────────────────┐
│ 初期状態：["りんご", "バナナ"]     │
└────────────────────────────────────┘
↓ fruits.push("みかん"); + showFruits();
┌────────────────────────────────────┐
│ 配列：["りんご", "バナナ", "みかん"] │
│ 画面を再描画（1回目）              │
│ ↓                                  │
│ <ul>をクリア → ループで3つ生成    │
└────────────────────────────────────┘
↓ fruits.push("ぶどう"); + showFruits();
┌────────────────────────────────────┐
│ 配列：["りんご", "バナナ", "みかん", "ぶどう"] │
│ 画面を再描画（2回目）              │
│ ↓                                  │
│ <ul>をクリア → ループで4つ生成    │
└────────────────────────────────────┘
↓ fruits.push("いちご"); + showFruits();
┌────────────────────────────────────┐
│ 配列：["りんご", "バナナ", "みかん", "ぶどう", "いちご"] │
│ 画面を再描画（3回目）              │
│ ↓                                  │
│ <ul>をクリア → ループで5つ生成    │
└────────────────────────────────────┘
合計：再描画3回、要素作成12個

良い例：まとめて更新
┌────────────────────────────────────┐
│ 初期状態：["りんご", "バナナ"]     │
└────────────────────────────────────┘
↓ fruits.push("みかん");
↓ fruits.push("ぶどう");
↓ fruits.push("いちご");
┌────────────────────────────────────┐
│ 配列：["りんご", "バナナ", "みかん", "ぶどう", "いちご"] │
└────────────────────────────────────┘
↓ showFruits();
┌────────────────────────────────────┐
│ 画面を再描画（1回だけ）            │
│ ↓                                  │
│ <ul>をクリア → ループで5つ生成    │
└────────────────────────────────────┘
合計：再描画1回、要素作成5個

パフォーマンス：良い例は3倍速い！
```

---

## 6. フィルタリングと更新

### 表示する要素を絞り込む

元の配列は変更せず、**表示だけを変える**方法：

```javascript
let allProducts = [
  { name: "ノート", price: 100, category: "文房具" },
  { name: "ペン", price: 50, category: "文房具" },
  { name: "消しゴム", price: 30, category: "文房具" },
  { name: "りんご", price: 120, category: "食品" },
  { name: "バナナ", price: 80, category: "食品" }
];

function showProducts(filter) {
  let container = document.getElementById("container");
  container.replaceChildren();

  for (let product of allProducts) {
    // フィルタリング
    if (filter && product.category !== filter) {
      continue;  // この商品はスキップ
    }

    // 要素を作成
    let card = document.createElement("div");
    card.textContent = product.name + " - " + product.price + "円";
    container.appendChild(card);
  }
}

// すべて表示
showProducts();

// 文房具だけ表示
showProducts("文房具");

// 食品だけ表示
showProducts("食品");
```

#### 実行の流れ（「文房具」でフィルタ）

```
配列の状態（変更されない）
┌────────────────────────────────────┐
│ allProducts = [                    │
│   { name: "ノート", category: "文房具" }, │
│   { name: "ペン", category: "文房具" },   │
│   { name: "消しゴム", category: "文房具" }, │
│   { name: "りんご", category: "食品" },   │
│   { name: "バナナ", category: "食品" }    │
│ ]                                  │
└────────────────────────────────────┘

showProducts("文房具"); を実行
┌────────────────────────────────────┐
│ filter = "文房具"                  │
└────────────────────────────────────┘

container.replaceChildren();
┌────────────────────────────────────┐
│ <div id="container"></div>         │
│ （空にする）                       │
└────────────────────────────────────┘

ループ開始
┌────────────────────────────────────┐
│ 1回目：product = { name: "ノート", category: "文房具" } │
│ ↓                                  │
│ if (filter && product.category !== filter) │
│ → "文房具" !== "文房具" は false   │
│ → continue しない                  │
│ ↓                                  │
│ card = <div>ノート - 100円</div>   │
│ container.appendChild(card);       │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ 2回目：product = { name: "ペン", category: "文房具" } │
│ → continue しない                  │
│ → card = <div>ペン - 50円</div>    │
│ → 追加                             │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ 3回目：product = { name: "消しゴム", category: "文房具" } │
│ → continue しない                  │
│ → card = <div>消しゴム - 30円</div> │
│ → 追加                             │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ 4回目：product = { name: "りんご", category: "食品" } │
│ ↓                                  │
│ if (filter && product.category !== filter) │
│ → "食品" !== "文房具" は true      │
│ → continue する！                  │
│ → この商品はスキップ               │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ 5回目：product = { name: "バナナ", category: "食品" } │
│ → "食品" !== "文房具" は true      │
│ → continue する（スキップ）        │
└────────────────────────────────────┘

最終的な画面
┌────────────────────────────────────┐
│ <div id="container">               │
│   <div>ノート - 100円</div>        │
│   <div>ペン - 50円</div>           │
│   <div>消しゴム - 30円</div>       │
│ </div>                             │
│                                    │
│ 文房具3つだけ表示された！          │
│ allProducts配列は変更されていない  │
└────────────────────────────────────┘
```

**重要なポイント**：
- `allProducts`配列は**変更されない**
- `filter`パラメータで**表示だけを変える**
- 元のデータを保持したまま、様々な表示ができる

---

## 7. ソートと更新

### ソートボタンの実装

```javascript
let fruits = ["バナナ", "りんご", "みかん"];
let sortButton = document.getElementById("sortButton");

sortButton.addEventListener("click", function() {
  // 配列をソート
  fruits.sort();

  // 画面を更新
  showFruits();
});

function showFruits() {
  let ul = document.getElementById("list");
  ul.replaceChildren();

  for (let fruit of fruits) {
    let li = document.createElement("li");
    li.textContent = fruit;
    ul.appendChild(li);
  }
}

// 初期表示
showFruits();
```

#### 実行の流れ

```
初期状態
┌────────────────────────────────────┐
│ fruits = ["バナナ", "りんご", "みかん"] │
│                                    │
│ <ul>                               │
│   <li>バナナ</li>                  │
│   <li>りんご</li>                  │
│   <li>みかん</li>                  │
│ </ul>                              │
└────────────────────────────────────┘

ソートボタンをクリック
┌────────────────────────────────────┐
│ fruits.sort(); を実行              │
│ ↓                                  │
│ fruits = ["みかん", "バナナ", "りんご"] │
│ （50音順にソートされた）           │
└────────────────────────────────────┘

showFruits(); を実行
┌────────────────────────────────────┐
│ ul.replaceChildren();              │
│ ↓                                  │
│ <ul></ul> （クリア）               │
└────────────────────────────────────┘

ループで再生成（ソート後の順序）
┌────────────────────────────────────┐
│ <ul>                               │
│   <li>みかん</li> ← 順序が変わった │
│   <li>バナナ</li>                  │
│   <li>りんご</li>                  │
│ </ul>                              │
└────────────────────────────────────┘
```

### 昇順・降順の切り替え

```javascript
let ascending = true;
let sortButton = document.getElementById("sortButton");

sortButton.addEventListener("click", function() {
  if (ascending) {
    // 昇順
    fruits.sort();
    sortButton.textContent = "降順で表示";
  } else {
    // 降順
    fruits.sort();
    fruits.reverse();
    sortButton.textContent = "昇順で表示";
  }

  ascending = !ascending;  // 切り替え
  showFruits();
});
```

#### 実行の流れ（昇順 → 降順）

```
初期状態（昇順）
┌────────────────────────────────────┐
│ ascending = true                   │
│ fruits = ["みかん", "バナナ", "りんご"] │
└────────────────────────────────────┘

1回目のクリック
┌────────────────────────────────────┐
│ if (ascending) → true              │
│ ↓                                  │
│ fruits.sort();                     │
│ → fruits = ["みかん", "バナナ", "りんご"] │
│ （既にソート済みなので変化なし）   │
│                                    │
│ ascending = !ascending;            │
│ → ascending = false                │
└────────────────────────────────────┘

2回目のクリック
┌────────────────────────────────────┐
│ if (ascending) → false             │
│ ↓                                  │
│ else ブロック実行                  │
│                                    │
│ fruits.sort();                     │
│ → fruits = ["みかん", "バナナ", "りんご"] │
│                                    │
│ fruits.reverse();                  │
│ → fruits = ["りんご", "バナナ", "みかん"] │
│ （逆順になった！）                 │
│                                    │
│ ascending = !ascending;            │
│ → ascending = true                 │
└────────────────────────────────────┘

画面更新
┌────────────────────────────────────┐
│ <ul>                               │
│   <li>りんご</li>                  │
│   <li>バナナ</li>                  │
│   <li>みかん</li>                  │
│ </ul>                              │
└────────────────────────────────────┘
```

---

## 8. 実践例：タスク管理アプリ

配列の更新と画面の同期を使った**タスク管理アプリ**を作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>タスク管理</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    .input-area {
      display: flex;
      margin-bottom: 20px;
    }
    input[type="text"] {
      flex-grow: 1;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px 0 0 4px;
    }
    #addButton {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
    }
    #addButton:hover {
      background-color: #45a049;
    }
    .controls {
      margin: 20px 0;
      display: flex;
      gap: 10px;
    }
    .controls button {
      padding: 8px 16px;
      background-color: #2196F3;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    .controls button:hover {
      background-color: #0b7dda;
    }
    #clearCompleted {
      background-color: #e74c3c;
    }
    #clearCompleted:hover {
      background-color: #c0392b;
    }
    .task-item {
      display: flex;
      align-items: center;
      padding: 12px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .task-text {
      flex-grow: 1;
      margin-left: 10px;
      font-size: 16px;
    }
    .completed {
      text-decoration: line-through;
      color: #999;
    }
    .delete-button {
      padding: 5px 10px;
      background-color: #e74c3c;
      color: white;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }
    .delete-button:hover {
      background-color: #c0392b;
    }
  </style>
</head>
<body>
  <h1>タスク管理</h1>

  <div class="input-area">
    <input type="text" id="taskInput" placeholder="タスクを入力">
    <button id="addButton">追加</button>
  </div>

  <div class="controls">
    <button id="showAll">すべて表示</button>
    <button id="showActive">未完了のみ</button>
    <button id="showCompleted">完了済みのみ</button>
    <button id="clearCompleted">完了済みを削除</button>
  </div>

  <div id="taskList"></div>

  <script>
    let tasks = [];
    let filter = "all";  // all, active, completed

    let taskInput = document.getElementById("taskInput");
    let addButton = document.getElementById("addButton");
    let taskList = document.getElementById("taskList");

    let showAllButton = document.getElementById("showAll");
    let showActiveButton = document.getElementById("showActive");
    let showCompletedButton = document.getElementById("showCompleted");
    let clearCompletedButton = document.getElementById("clearCompleted");

    // タスクを追加
    addButton.addEventListener("click", function() {
      let text = taskInput.value.trim();
      if (text === "") return;

      tasks.push({
        text: text,
        completed: false
      });

      taskInput.value = "";
      showTasks();
    });

    // フィルタ切り替え
    showAllButton.addEventListener("click", function() {
      filter = "all";
      showTasks();
    });

    showActiveButton.addEventListener("click", function() {
      filter = "active";
      showTasks();
    });

    showCompletedButton.addEventListener("click", function() {
      filter = "completed";
      showTasks();
    });

    // 完了済みを削除
    clearCompletedButton.addEventListener("click", function() {
      tasks = tasks.filter(task => !task.completed);
      showTasks();
    });

    // タスクを表示
    function showTasks() {
      taskList.replaceChildren();

      for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        // フィルタリング
        if (filter === "active" && task.completed) continue;
        if (filter === "completed" && !task.completed) continue;

        // タスクアイテムを作成
        let item = document.createElement("div");
        item.className = "task-item";

        // チェックボックス
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
          task.completed = checkbox.checked;
          showTasks();
        });

        // テキスト
        let text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        if (task.completed) {
          text.classList.add("completed");
        }

        // 削除ボタン
        let deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "削除";

        deleteButton.addEventListener("click", function() {
          tasks.splice(i, 1);
          showTasks();
        });

        // 組み立て
        item.appendChild(checkbox);
        item.appendChild(text);
        item.appendChild(deleteButton);

        taskList.appendChild(item);
      }
    }

    // Enterキーで追加
    taskInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        addButton.click();
      }
    });

    // 初期表示
    showTasks();
  </script>
</body>
</html>
```

### コードの詳細解説

#### ケーススタディ1：タスクを追加する

```
初期状態
┌────────────────────────────────────┐
│ tasks = []                         │
│ filter = "all"                     │
└────────────────────────────────────┘

ユーザーが「買い物に行く」と入力して追加ボタンをクリック
┌────────────────────────────────────┐
│ let text = taskInput.value.trim(); │
│ → text = "買い物に行く"            │
│                                    │
│ if (text === "") return;           │
│ → 空ではないので続行               │
└────────────────────────────────────┘

配列に追加
┌────────────────────────────────────┐
│ tasks.push({                       │
│   text: "買い物に行く",            │
│   completed: false                 │
│ });                                │
│ ↓                                  │
│ tasks = [                          │
│   { text: "買い物に行く", completed: false } │
│ ]                                  │
└────────────────────────────────────┘

入力欄をクリア
┌────────────────────────────────────┐
│ taskInput.value = "";              │
└────────────────────────────────────┘

画面を更新：showTasks()
┌────────────────────────────────────┐
│ taskList.replaceChildren();        │
│ ↓                                  │
│ ループで tasks[0] を処理           │
│ ↓                                  │
│ <div class="task-item">            │
│   <input type="checkbox">          │
│   <span>買い物に行く</span>        │
│   <button>削除</button>            │
│ </div>                             │
│ を作成して追加                     │
└────────────────────────────────────┘
```

#### ケーススタディ2：フィルタリング

```
現在の状態
┌────────────────────────────────────┐
│ tasks = [                          │
│   { text: "買い物に行く", completed: false }, │
│   { text: "勉強する", completed: true },      │
│   { text: "運動する", completed: false }      │
│ ]                                  │
│ filter = "all"                     │
└────────────────────────────────────┘

「未完了のみ」ボタンをクリック
┌────────────────────────────────────┐
│ filter = "active";                 │
│ showTasks();                       │
└────────────────────────────────────┘

showTasks()の実行
┌────────────────────────────────────┐
│ taskList.replaceChildren();        │
│ （画面をクリア）                   │
└────────────────────────────────────┘

ループ処理
┌────────────────────────────────────┐
│ i=0: task = { text: "買い物に行く", completed: false } │
│ ↓                                  │
│ if (filter === "active" && task.completed) │
│ → "active" === "active" は true    │
│ → task.completed は false          │
│ → false && false = false           │
│ → continue しない                  │
│ ↓                                  │
│ タスクアイテムを作成して追加       │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ i=1: task = { text: "勉強する", completed: true } │
│ ↓                                  │
│ if (filter === "active" && task.completed) │
│ → true && true = true              │
│ → continue する（スキップ）        │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ i=2: task = { text: "運動する", completed: false } │
│ ↓                                  │
│ if (filter === "active" && task.completed) │
│ → true && false = false            │
│ → continue しない                  │
│ ↓                                  │
│ タスクアイテムを作成して追加       │
└────────────────────────────────────┘

最終的な画面
┌────────────────────────────────────┐
│ 「買い物に行く」（未完了）         │
│ 「運動する」（未完了）             │
│                                    │
│ 「勉強する」は表示されない         │
│ （tasks配列自体は変更されていない）│
└────────────────────────────────────┘
```

#### ケーススタディ3：完了済みを削除

```
現在の状態
┌────────────────────────────────────┐
│ tasks = [                          │
│   { text: "買い物に行く", completed: false }, │
│   { text: "勉強する", completed: true },      │
│   { text: "運動する", completed: false },     │
│   { text: "掃除する", completed: true }       │
│ ]                                  │
└────────────────────────────────────┘

「完了済みを削除」ボタンをクリック
┌────────────────────────────────────┐
│ tasks = tasks.filter(task => !task.completed); │
└────────────────────────────────────┘

filter()の処理
┌────────────────────────────────────┐
│ 各タスクに対して !task.completed をチェック │
│                                    │
│ task[0]: completed = false         │
│ → !false = true → 残す             │
│                                    │
│ task[1]: completed = true          │
│ → !true = false → 削除             │
│                                    │
│ task[2]: completed = false         │
│ → !false = true → 残す             │
│                                    │
│ task[3]: completed = true          │
│ → !true = false → 削除             │
└────────────────────────────────────┘

新しい配列
┌────────────────────────────────────┐
│ tasks = [                          │
│   { text: "買い物に行く", completed: false }, │
│   { text: "運動する", completed: false }      │
│ ]                                  │
│                                    │
│ 完了済みの2つが削除された！        │
└────────────────────────────────────┘

showTasks()で画面更新
┌────────────────────────────────────┐
│ 画面に2つのタスクだけが表示される  │
└────────────────────────────────────┘
```

### このコードのポイント

1. **データと表示の分離**
   - `tasks`配列がデータ（状態）
   - `showTasks()`が表示（UI）
   - データを変更したら必ず`showTasks()`を呼ぶ

2. **更新の一貫性**
   - すべての操作で`showTasks()`を呼ぶ
   - 配列と画面が常に一致

3. **フィルタリング**
   - `filter`変数で表示モードを管理
   - 元の`tasks`配列は変更しない
   - `showTasks()`内でフィルタリング

4. **効率的な更新**
   - `replaceChildren()`で古い表示をクリア
   - ループで新しい表示を生成
   - シンプルで確実

---

## 9. 練習問題

### 問題：メモ帳アプリ

メモ帳アプリを作成してください。

#### 要件

1. メモの配列を管理（テキストと作成日時を含む）
2. メモを追加できる（入力欄とボタン）
3. メモを削除できる（各メモに削除ボタン）
4. 「新しい順」「古い順」でソート可能
5. 配列を変更したら必ず画面を更新
6. `replaceChildren()`を使って表示をクリア

#### ヒント

```javascript
let memos = [];

// メモを追加
function addMemo(text) {
  memos.push({
    text: text,
    date: new Date()
  });
  showMemos();
}

// メモを削除
function deleteMemo(index) {
  memos.splice(index, 1);
  showMemos();
}

// 新しい順にソート
function sortByNewest() {
  memos.sort((a, b) => b.date - a.date);
  showMemos();
}

// 古い順にソート
function sortByOldest() {
  memos.sort((a, b) => a.date - b.date);
  showMemos();
}

// メモを表示
function showMemos() {
  let container = document.getElementById("memoList");
  container.replaceChildren();  // クリア

  for (let i = 0; i < memos.length; i++) {
    let memo = memos[i];

    // メモ要素を作成
    let item = document.createElement("div");
    item.className = "memo-item";

    // テキスト
    let text = document.createElement("p");
    text.textContent = memo.text;

    // 日時
    let date = document.createElement("small");
    date.textContent = memo.date.toLocaleString();

    // 削除ボタン
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", function() {
      deleteMemo(i);
    });

    // 組み立て
    item.appendChild(text);
    item.appendChild(date);
    item.appendChild(deleteButton);

    container.appendChild(item);
  }
}
```

### 解答例

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>メモ帳アプリ</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    .input-area {
      margin-bottom: 20px;
    }
    textarea {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: vertical;
      font-family: sans-serif;
    }
    .button-group {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    #addButton {
      background-color: #4CAF50;
      color: white;
      flex-grow: 1;
    }
    #addButton:hover {
      background-color: #45a049;
    }
    .sort-controls {
      margin: 20px 0;
      display: flex;
      gap: 10px;
    }
    .sort-controls button {
      background-color: #2196F3;
      color: white;
    }
    .sort-controls button:hover {
      background-color: #0b7dda;
    }
    .memo-item {
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 15px;
      margin: 10px 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .memo-item p {
      margin: 0 0 10px 0;
      font-size: 16px;
      line-height: 1.5;
    }
    .memo-item small {
      color: #666;
      font-size: 12px;
      margin-right: 10px;
    }
    .delete-button {
      background-color: #e74c3c;
      color: white;
      padding: 5px 10px;
      font-size: 14px;
    }
    .delete-button:hover {
      background-color: #c0392b;
    }
  </style>
</head>
<body>
  <h1>メモ帳</h1>

  <div class="input-area">
    <textarea id="memoInput" rows="4" placeholder="メモを入力してください"></textarea>
    <div class="button-group">
      <button id="addButton">メモを追加</button>
    </div>
  </div>

  <div class="sort-controls">
    <button id="sortNewest">新しい順</button>
    <button id="sortOldest">古い順</button>
  </div>

  <div id="memoList"></div>

  <script>
    let memos = [];

    let memoInput = document.getElementById("memoInput");
    let addButton = document.getElementById("addButton");
    let sortNewestButton = document.getElementById("sortNewest");
    let sortOldestButton = document.getElementById("sortOldest");
    let memoList = document.getElementById("memoList");

    // メモを追加
    addButton.addEventListener("click", function() {
      let text = memoInput.value.trim();
      if (text === "") return;

      memos.push({
        text: text,
        date: new Date()
      });

      memoInput.value = "";
      showMemos();
    });

    // 新しい順にソート
    sortNewestButton.addEventListener("click", function() {
      memos.sort((a, b) => b.date - a.date);
      showMemos();
    });

    // 古い順にソート
    sortOldestButton.addEventListener("click", function() {
      memos.sort((a, b) => a.date - b.date);
      showMemos();
    });

    // メモを表示
    function showMemos() {
      memoList.replaceChildren();  // 古い表示をクリア

      for (let i = 0; i < memos.length; i++) {
        let memo = memos[i];

        // メモアイテムを作成
        let item = document.createElement("div");
        item.className = "memo-item";

        // テキスト
        let text = document.createElement("p");
        text.textContent = memo.text;

        // 日時
        let date = document.createElement("small");
        date.textContent = memo.date.toLocaleString("ja-JP");

        // 削除ボタン
        let deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "削除";

        deleteButton.addEventListener("click", function() {
          memos.splice(i, 1);
          showMemos();
        });

        // 組み立て
        item.appendChild(text);
        item.appendChild(date);
        item.appendChild(deleteButton);

        memoList.appendChild(item);
      }
    }

    // 初期表示
    showMemos();
  </script>
</body>
</html>
```

---

## まとめ

今回は、**配列の更新と画面表示の同期**について学びました：

### 重要な原則

**JavaScriptでは、配列を変更しても画面は自動的に更新されません**
- 配列を変更したら、**必ず表示更新関数を呼ぶ**
- これで配列と画面を常に同期させる

### 3ステップの更新パターン

1. **古い表示をクリア**：`container.replaceChildren()`
2. **配列をループ**：`for (let item of array) { ... }`
3. **各要素を作成して追加**：`createElement` + `appendChild`

### 学んだテクニック

- **クリア方法**：`replaceChildren()`が推奨（モダン、シンプル、確実）
- **更新のタイミング**：配列を変更するたびに、必ず表示を更新
- **まとめて更新**：複数の変更後に1回だけ更新（パフォーマンス向上）
- **フィルタリング**：元の配列を変更せず、表示だけを変える
- **ソート**：配列をソートしてから表示を更新

### データと表示の分離

```javascript
// データ（状態）
let tasks = [...]

// 表示（UI）
function showTasks() {
  // データから画面を生成
}

// データを変更したら必ず表示を更新
tasks.push(newTask);
showTasks();
```

この「データを変更したら表示を更新する」パターンは、多くのアプリケーションで使われる**基本的な考え方**です。React、Vue、Angularなどのモダンなフレームワークも、この原則に基づいています。

---

## カリキュラムの要件をチェック

このレッスンで扱った内容：

✅ 配列が変わったら表示更新 - `showFruits()`などの表示更新関数を呼ぶ
✅ 古い表示をクリア - `replaceChildren()`で既存の要素を削除
✅ 新しく生成 - ループで配列の内容から要素を作成・追加
✅ 【知識】画面の再描画 - クリア → ループ → 生成の3ステップパターン
✅ 【知識】状態の同期 - データ（配列）と表示（DOM）を常に一致させる
✅ 成果物：リアルタイムリスト - タスク管理アプリ、メモ帳アプリ

すべての要件を満たしています！

---

次のレッスンでは、**タスク追加機能**をより詳しく学びます。ユーザー入力の処理、バリデーション、データの永続化などについて学びましょう！
