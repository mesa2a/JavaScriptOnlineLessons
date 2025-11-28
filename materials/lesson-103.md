---
title: "レッスン103：タスク削除"
author: "JavaScript Online Lessons"
date: "2025-11-26"
---

# レッスン103：タスク削除

## このレッスンで学ぶこと

### 前回の復習

前回のレッスン102では、タスクを見やすく表示する方法を学びました：

```javascript
// 番号付き表示の基本パターン
for (let i = 0; i < tasks.length; i++) {
  let task = tasks[i];
  let li = document.createElement("li");
  li.textContent = (i + 1) + ". " + task;
  taskList.appendChild(li);
}
```

タスクの追加と表示ができるようになりましたが、間違って追加したタスクや完了したタスクを削除する機能がまだありません。

### よくある場面

実際のアプリケーションでは、以下のような「削除機能」が必要です：

1. **TODOリストアプリ**
   - 完了したタスクを削除
   - 間違って追加したタスクを削除
   - 「削除」ボタンをクリックすると即座に画面から消える

2. **ブックマーク管理アプリ**
   - 不要になったブックマークを削除
   - 削除前に確認メッセージを表示
   - 一括削除機能

3. **買い物リストアプリ**
   - 購入した商品を削除
   - 削除と同時に合計金額を再計算
   - アニメーション付きで削除

### 学習目標

このレッスンでは、以下の技術を習得します：

1. **削除ボタンの追加**: 各要素にボタンを配置
2. **splice()メソッド**: 配列から要素を削除
3. **インデックス管理**: 正確な要素を削除する方法
4. **画面の更新**: 削除後の表示更新パターン
5. **確認ダイアログ**: 誤削除を防ぐ
6. **クロージャ**: ループ内の関数が値を記憶する仕組み

---

## 1. 削除ボタンの追加

### 1.1 なぜ削除ボタンが必要なのか？

タスクを削除する方法がないと、ユーザーは困ります：

```
削除機能なし:                削除機能あり:
─────────────              ─────────────────────
1. 買い物                  1. 買い物    [削除]
2. 掃除                    2. 掃除      [削除]
3. 洗濯                    3. 洗濯      [削除]
↑ 削除できない             ↑ クリックで削除できる
```

### 1.2 各タスクにボタンを追加

表示する時に、各タスクに削除ボタンを追加します：

```javascript
function showTasks() {
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let li = document.createElement("li");
    li.textContent = task + " ";

    // 削除ボタンを作成
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }
}
```

**実行フローの詳細:**

```
初期状態:
tasks = ["買い物", "掃除"]
taskList = <ul id="taskList"></ul>

showTasks()呼び出し:
  taskList.replaceChildren()
  → taskList = <ul></ul>

ループ1回目 (i = 0):
  task = tasks[0] = "買い物"

  Step 1: <li>を作成
    li = document.createElement("li")
    → li = <li></li>

    li.textContent = "買い物 "
    → li = <li>買い物 </li>

  Step 2: 削除ボタンを作成
    deleteButton = document.createElement("button")
    → deleteButton = <button></button>

    deleteButton.textContent = "削除"
    → deleteButton = <button>削除</button>

  Step 3: ボタンをliに追加
    li.appendChild(deleteButton)
    → li = <li>
             買い物
             <button>削除</button>
           </li>

  Step 4: liをリストに追加
    taskList.appendChild(li)
    → taskList = <ul>
                   <li>
                     買い物
                     <button>削除</button>
                   </li>
                 </ul>

ループ2回目 (i = 1):
  task = "掃除"
  同様の処理...

最終結果:
<ul id="taskList">
  <li>買い物 <button>削除</button></li>
  <li>掃除 <button>削除</button></li>
</ul>

画面表示:
  買い物 [削除]
  掃除   [削除]
```

**HTML構造の視覚化:**

```
各タスクの構造:
┌──────────────────────────┐
│ <li>                     │
│   "買い物 "              │  ← テキスト
│   <button>削除</button>  │  ← 削除ボタン
│ </li>                    │
└──────────────────────────┘

全体の構造:
<ul id="taskList">
  ├─ <li>買い物 <button>削除</button></li>
  └─ <li>掃除 <button>削除</button></li>
</ul>
```

---

## 2. splice()で配列から削除

### 2.1 splice()メソッドの基本

`splice()`メソッドは、配列の指定位置から要素を削除します：

**書き方**: `array.splice(開始位置, 削除個数)`

```javascript
let fruits = ["りんご", "バナナ", "みかん"];

fruits.splice(1, 1);  // インデックス1から1個削除
console.log(fruits);  // ["りんご", "みかん"]
```

**実行フローの詳細:**

```
初期状態:
fruits = ["りんご", "バナナ", "みかん"]
           ↑         ↑        ↑
         index:0     1        2

splice(1, 1) を実行:
  開始位置: 1 (インデックス1 = "バナナ")
  削除個数: 1 (1個削除)

処理:
  Step 1: インデックス1の要素を削除
    ["りんご", "バナナ", "みかん"]
                ↑ これを削除

  Step 2: 後ろの要素を前に詰める
    ["りんご", "みかん"]
      ↑         ↑
    index:0     1

最終結果:
fruits = ["りんご", "みかん"]
```

**視覚的な説明:**

```
削除前:
┌─────┬─────┬─────┐
│  0  │  1  │  2  │
├─────┼─────┼─────┤
│りんご│バナナ│みかん│
└─────┴─────┴─────┘
        ↑
    splice(1, 1)
    ここから1個削除

削除後:
┌─────┬─────┐
│  0  │  1  │
├─────┼─────┤
│りんご│みかん│
└─────┴─────┘
        ↑
     インデックスが詰まる
```

### 2.2 様々な削除パターン

```javascript
let tasks = ["買い物", "掃除", "洗濯", "料理"];

// パターン1: 最初の要素を削除
tasks.splice(0, 1);
// ["掃除", "洗濯", "料理"]

// パターン2: 2番目の要素を削除
tasks.splice(1, 1);
// ["掃除", "料理"]

// パターン3: 最後の要素を削除
tasks.splice(tasks.length - 1, 1);
// ["掃除"]

// パターン4: 2個連続で削除
tasks = ["買い物", "掃除", "洗濯", "料理"];
tasks.splice(1, 2);  // インデックス1から2個削除
// ["買い物", "料理"]
```

**パターン4の詳細フロー:**

```
初期状態:
tasks = ["買い物", "掃除", "洗濯", "料理"]
          ↑       ↑      ↑      ↑
        index:0    1      2      3

splice(1, 2) を実行:
  開始位置: 1
  削除個数: 2

処理:
  ["買い物", "掃除", "洗濯", "料理"]
             ↑──────↑
          この2個を削除

  削除後に詰める:
  ["買い物", "料理"]
    ↑       ↑
  index:0   1

最終結果:
tasks = ["買い物", "料理"]
```

### 2.3 splice()の戻り値

`splice()`は削除した要素を配列で返します：

```javascript
let tasks = ["買い物", "掃除", "洗濯"];

let removed = tasks.splice(1, 1);

console.log(removed);  // ["掃除"]
console.log(tasks);    // ["買い物", "洗濯"]
```

**実行フロー:**

```
初期状態:
tasks = ["買い物", "掃除", "洗濯"]

removed = tasks.splice(1, 1)

処理:
  Step 1: インデックス1の要素を取り出す
    取り出した要素 = "掃除"

  Step 2: 削除した要素を配列で返す
    removed = ["掃除"]

  Step 3: 元の配列から削除
    tasks = ["買い物", "洗濯"]

最終状態:
removed = ["掃除"]   ← 削除された要素
tasks = ["買い物", "洗濯"]  ← 残った要素
```

---

## 3. 削除ボタンにイベントを追加

### 3.1 クリックで削除する基本パターン

削除ボタンがクリックされた時に、配列から要素を削除します：

```javascript
function showTasks() {
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let li = document.createElement("li");
    li.textContent = task + " ";

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";

    // クリックイベントを追加
    deleteButton.addEventListener("click", function() {
      tasks.splice(i, 1);  // 配列から削除
      showTasks();         // 画面を更新
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }
}
```

**重要**: 削除したら必ず`showTasks()`を呼んで画面を更新します。

**実行フローの詳細:**

```
初期状態:
tasks = ["買い物", "掃除", "洗濯"]

showTasks()呼び出し:

ループ1回目 (i = 0):
  task = "買い物"

  deleteButtonにイベントリスナーを追加:
    addEventListener("click", function() {
      tasks.splice(0, 1);  // i = 0
      showTasks();
    })

  この時点でHTML:
    <li>買い物 <button>削除</button></li>

ループ2回目 (i = 1):
  task = "掃除"

  deleteButtonにイベントリスナーを追加:
    addEventListener("click", function() {
      tasks.splice(1, 1);  // i = 1
      showTasks();
    })

  HTML:
    <li>買い物 <button>削除</button></li>
    <li>掃除 <button>削除</button></li>

ループ3回目 (i = 2):
  task = "洗濯"

  deleteButtonにイベントリスナーを追加:
    addEventListener("click", function() {
      tasks.splice(2, 1);  // i = 2
      showTasks();
    })

  最終HTML:
    <li>買い物 <button>削除</button></li>
    <li>掃除 <button>削除</button></li>
    <li>洗濯 <button>削除</button></li>


ユーザーが2番目の「削除」ボタンをクリック:

  Step 1: イベントリスナーが実行される
    tasks.splice(1, 1)
    → tasks = ["買い物", "洗濯"]

  Step 2: showTasks()が呼ばれる
    画面を再構築...

  Step 3: 新しい画面
    <li>買い物 <button>削除</button></li>
    <li>洗濯 <button>削除</button></li>

画面表示:
  買い物 [削除]
  洗濯   [削除]  ← "掃除"が消えた
```

### 3.2 なぜshowTasks()を呼ぶのか？

配列を変更しただけでは、画面は自動的に更新されません：

```javascript
// 悪い例 ✗
deleteButton.addEventListener("click", function() {
  tasks.splice(i, 1);
  // showTasks()を呼ばない
  // → 配列は変わるが、画面は変わらない
});

// 良い例 ✓
deleteButton.addEventListener("click", function() {
  tasks.splice(i, 1);
  showTasks();  // 必ず呼ぶ
  // → 配列と画面の両方が更新される
});
```

**データと表示の同期:**

```
データと表示の関係:

データ (配列):        表示 (HTML):
─────────────        ─────────────
["買い物", "掃除"]   買い物 [削除]
                     掃除   [削除]

splice()を実行:
["買い物"]           買い物 [削除]
↑ 変わった           掃除   [削除]
                     ↑ 変わってない!

showTasks()を呼ぶ:
["買い物"]           買い物 [削除]
                     ↑ 同期された!
```

### 3.3 クロージャ: なぜインデックスが使えるのか？

ループ内で作成した関数は、その時の`i`の値を覚えています（クロージャ）：

```javascript
for (let i = 0; i < tasks.length; i++) {
  deleteButton.addEventListener("click", function() {
    // この関数は、自分が作られた時の i の値を覚えている
    tasks.splice(i, 1);
  });
}
```

**クロージャの詳細:**

```
ループ中の処理:

i = 0 の時:
  function() {
    tasks.splice(0, 1);  // i = 0 を記憶
  }
  ↑ この関数は i = 0 を覚えている

i = 1 の時:
  function() {
    tasks.splice(1, 1);  // i = 1 を記憶
  }
  ↑ この関数は i = 1 を覚えている

i = 2 の時:
  function() {
    tasks.splice(2, 1);  // i = 2 を記憶
  }
  ↑ この関数は i = 2 を覚えている

各ボタンは、それぞれ異なる i の値を記憶している:
┌──────────────────────┐
│ ボタン1 → i = 0      │
│ ボタン2 → i = 1      │
│ ボタン3 → i = 2      │
└──────────────────────┘
```

**letとvarの違い（重要）:**

```javascript
// let を使う場合 (正しい) ✓
for (let i = 0; i < tasks.length; i++) {
  deleteButton.addEventListener("click", function() {
    tasks.splice(i, 1);  // 各関数は異なる i を記憶
  });
}

// var を使う場合 (間違い) ✗
for (var i = 0; i < tasks.length; i++) {
  deleteButton.addEventListener("click", function() {
    tasks.splice(i, 1);  // すべての関数が同じ i を参照
    // → すべてのボタンが最後の i の値を使ってしまう
  });
}
```

---

## 4. 確認メッセージの追加

### 4.1 confirm()で確認

削除する前に、ユーザーに確認を求めます：

```javascript
deleteButton.addEventListener("click", function() {
  let confirmed = confirm("本当に削除しますか？");

  if (confirmed) {
    tasks.splice(i, 1);
    showTasks();
  }
});
```

**confirm()の動作:**

```
confirm()が呼ばれる:
┌─────────────────────────┐
│ 本当に削除しますか？    │
│                         │
│   [OK]    [キャンセル]  │
└─────────────────────────┘

ユーザーが[OK]をクリック:
  confirmed = true
  → if文の中に入る
  → 削除実行

ユーザーが[キャンセル]をクリック:
  confirmed = false
  → if文をスキップ
  → 削除されない
```

**実行フローの詳細:**

```
初期状態:
tasks = ["買い物", "掃除", "洗濯"]
画面表示: 買い物、掃除、洗濯

ユーザーが2番目の「削除」ボタンをクリック:

Step 1: confirm()が表示される
  let confirmed = confirm("本当に削除しますか？")

  ユーザーが[OK]をクリック:
    confirmed = true

Step 2: 条件判定
  if (confirmed) {  // if (true)
    → true なので中に入る
  }

Step 3: 削除実行
  tasks.splice(1, 1)
  → tasks = ["買い物", "洗濯"]

Step 4: 画面更新
  showTasks()
  → 画面が再構築される

最終結果:
tasks = ["買い物", "洗濯"]
画面表示: 買い物、洗濯


キャンセルした場合:

ユーザーが[キャンセル]をクリック:
  confirmed = false

条件判定:
  if (confirmed) {  // if (false)
    → false なので中に入らない
  }
  → splice()も呼ばれない
  → showTasks()も呼ばれない

結果:
tasks = ["買い物", "掃除", "洗濯"]  ← 変わらない
画面表示: 買い物、掃除、洗濯    ← 変わらない
```

### 4.2 カスタムメッセージ

削除する内容を表示することもできます：

```javascript
deleteButton.addEventListener("click", function() {
  let confirmed = confirm("「" + task + "」を削除しますか？");

  if (confirmed) {
    tasks.splice(i, 1);
    showTasks();
  }
});
```

**実行例:**

```
task = "買い物" の場合:

confirm()の表示:
┌─────────────────────────────┐
│ 「買い物」を削除しますか？  │
│                             │
│   [OK]    [キャンセル]      │
└─────────────────────────────┘
  ↑ タスク名が表示される
```

**文字列の連結:**

```
"「" + task + "」を削除しますか？"

task = "買い物" の場合:
  "「" + "買い物" + "」を削除しますか？"
  → "「買い物」を削除しますか？"

task = "掃除" の場合:
  "「" + "掃除" + "」を削除しますか？"
  → "「掃除」を削除しますか？"
```

---

## 5. IDを使った削除（より安全な方法）

### 5.1 インデックスの問題

配列を削除すると、インデックスがずれる可能性があります：

```javascript
// 問題のケース
let tasks = ["買い物", "掃除", "洗濯"];

// 画面を表示した後、削除前に別の操作で配列が変わった場合
// インデックスがずれて、意図しない要素を削除してしまう
```

より確実な方法として、各要素にIDを付ける方法があります。

### 5.2 IDを使ったデータ構造

```javascript
let tasks = [
  { id: 1, title: "買い物" },
  { id: 2, title: "掃除" },
  { id: 3, title: "洗濯" }
];

let nextId = 4;  // 次に使うID
```

**データ構造の視覚化:**

```
配列の構造:
tasks = [
  {
    id: 1,       ← 一意な識別子
    title: "買い物"
  },
  {
    id: 2,
    title: "掃除"
  },
  {
    id: 3,
    title: "洗濯"
  }
]

nextId = 4  ← 次に追加する時のID
```

### 5.3 IDで要素を探して削除

```javascript
function deleteTask(id) {
  // IDで要素を探す
  let index = tasks.findIndex(task => task.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);
    showTasks();
  }
}

// ボタンのイベント
deleteButton.addEventListener("click", function() {
  deleteTask(task.id);
});
```

**findIndex()の詳細:**

```
tasks = [
  { id: 1, title: "買い物" },
  { id: 2, title: "掃除" },
  { id: 3, title: "洗濯" }
]

deleteTask(2) を呼ぶ:

Step 1: findIndex()で検索
  tasks.findIndex(task => task.id === 2)

  処理:
    task = { id: 1, title: "買い物" }
    → task.id === 2  → 1 === 2 → false

    task = { id: 2, title: "掃除" }
    → task.id === 2  → 2 === 2 → true
    → このインデックスを返す: 1

  index = 1

Step 2: 条件チェック
  if (index !== -1) {  // if (1 !== -1)
    → true なので中に入る
  }

Step 3: 削除
  tasks.splice(1, 1)
  → tasks = [
       { id: 1, title: "買い物" },
       { id: 3, title: "洗濯" }
     ]

Step 4: 画面更新
  showTasks()
```

**findIndex()が見つからない場合:**

```
tasks = [
  { id: 1, title: "買い物" },
  { id: 3, title: "洗濯" }
]

deleteTask(2) を呼ぶ:  // id: 2 は存在しない

findIndex()の処理:
  task = { id: 1, title: "買い物" }
  → task.id === 2 → false

  task = { id: 3, title: "洗濯" }
  → task.id === 2 → false

  見つからない → -1 を返す

index = -1

条件チェック:
  if (index !== -1) {  // if (-1 !== -1)
    → false なので中に入らない
  }
  → 何も削除されない（安全）
```

### 5.4 完全な実装例

```javascript
let tasks = [];
let nextId = 1;

function addTask(title) {
  let task = {
    id: nextId,
    title: title
  };
  tasks.push(task);
  nextId++;  // 次のIDをインクリメント
  showTasks();
}

function deleteTask(id) {
  let index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    showTasks();
  }
}

function showTasks() {
  taskList.replaceChildren();

  for (let task of tasks) {
    let li = document.createElement("li");
    li.textContent = task.title + " ";

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", function() {
      deleteTask(task.id);  // IDを使って削除
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }
}
```

**実行フローの完全な例:**

```
初期状態:
tasks = []
nextId = 1

addTask("買い物") を呼ぶ:
  task = { id: 1, title: "買い物" }
  tasks.push(task)
  → tasks = [{ id: 1, title: "買い物" }]
  nextId++
  → nextId = 2

addTask("掃除") を呼ぶ:
  task = { id: 2, title: "掃除" }
  tasks.push(task)
  → tasks = [
       { id: 1, title: "買い物" },
       { id: 2, title: "掃除" }
     ]
  nextId++
  → nextId = 3

addTask("洗濯") を呼ぶ:
  task = { id: 3, title: "洗濯" }
  tasks.push(task)
  → tasks = [
       { id: 1, title: "買い物" },
       { id: 2, title: "掃除" },
       { id: 3, title: "洗濯" }
     ]
  nextId++
  → nextId = 4

現在の状態:
tasks = [
  { id: 1, title: "買い物" },
  { id: 2, title: "掃除" },
  { id: 3, title: "洗濯" }
]
nextId = 4

ユーザーがid: 2の削除ボタンをクリック:
  deleteTask(2)
  → インデックス1を削除
  → tasks = [
       { id: 1, title: "買い物" },
       { id: 3, title: "洗濯" }
     ]

新しいタスクを追加:
  addTask("料理")
  task = { id: 4, title: "料理" }
  → tasks = [
       { id: 1, title: "買い物" },
       { id: 3, title: "洗濯" },
       { id: 4, title: "料理" }
     ]
  nextId = 5

IDは一意のまま:
  1 → 買い物
  3 → 洗濯
  4 → 料理
  (id: 2 は永久に使われない)
```

---

## 6. すべて削除

### 6.1 配列を空にする

すべてのタスクを削除するボタンも追加できます：

```javascript
let clearAllButton = document.getElementById("clearAll");

clearAllButton.addEventListener("click", function() {
  let confirmed = confirm("すべてのタスクを削除しますか？");

  if (confirmed) {
    tasks = [];  // 配列を空にする
    showTasks();
  }
});
```

**実行フローの詳細:**

```
初期状態:
tasks = ["買い物", "掃除", "洗濯"]
画面表示:
  買い物 [削除]
  掃除   [削除]
  洗濯   [削除]

ユーザーが「すべて削除」ボタンをクリック:

Step 1: 確認ダイアログ
  confirm("すべてのタスクを削除しますか？")

  ユーザーが[OK]をクリック:
    confirmed = true

Step 2: 条件判定
  if (confirmed) {  // if (true)
    → true なので中に入る
  }

Step 3: 配列を空にする
  tasks = []
  → 新しい空の配列を代入

Step 4: 画面更新
  showTasks()

  処理:
    taskList.replaceChildren()
    → リストを空にする

    if (tasks.length === 0) {  // if (0 === 0)
      → true
      空メッセージを表示
      return
    }

最終結果:
tasks = []
画面表示:
  まだタスクがありません
```

### 6.2 配列を空にする別の方法

```javascript
// 方法1: 新しい空配列を代入
tasks = [];

// 方法2: lengthを0にする
tasks.length = 0;

// 方法3: splice()ですべて削除
tasks.splice(0, tasks.length);
```

**3つの方法の違い:**

```
初期状態:
tasks = ["買い物", "掃除", "洗濯"]

方法1: tasks = []
  新しい空の配列を作成して代入
  → tasks = []
  ✓ シンプルで分かりやすい
  ✓ 推奨

方法2: tasks.length = 0
  lengthプロパティを0にする
  → tasks = []
  ✓ 同じ配列オブジェクトを保持
  ✓ 他の変数が同じ配列を参照している場合に便利

方法3: tasks.splice(0, tasks.length)
  splice()で全要素削除
  → tasks = []
  ✓ 削除された要素が戻り値として得られる
  削除のログを取りたい場合に使う
```

### 6.3 タスクがない時の処理

```javascript
clearAllButton.addEventListener("click", function() {
  // タスクが無い時は何もしない
  if (tasks.length === 0) {
    alert("削除するタスクがありません");
    return;
  }

  let confirmed = confirm("すべてのタスクを削除しますか？");

  if (confirmed) {
    tasks = [];
    showTasks();
  }
});
```

**実行フロー:**

```
ケース1: タスクがある場合
  tasks = ["買い物", "掃除"]

  if (tasks.length === 0) {  // if (2 === 0)
    → false
    → スキップ
  }

  confirm()が表示される
  → 通常の削除処理


ケース2: タスクがない場合
  tasks = []

  if (tasks.length === 0) {  // if (0 === 0)
    → true
    → if文の中に入る
  }

  alert("削除するタスクがありません")
  → アラートが表示される

  return
  → 関数を終了
  → confirm()は表示されない
```

---

## 7. 削除時のアニメーション（応用）

### 7.1 CSSトランジションを使う

削除する前に、フェードアウトさせることができます：

```javascript
deleteButton.addEventListener("click", function() {
  let confirmed = confirm("削除しますか？");

  if (confirmed) {
    // 要素を半透明にする
    li.style.opacity = "0.5";
    li.style.transition = "opacity 0.3s";

    // 0.3秒後に削除
    setTimeout(function() {
      tasks.splice(i, 1);
      showTasks();
    }, 300);
  }
});
```

**実行フローの詳細:**

```
ユーザーが削除ボタンをクリック:

Step 1: 確認
  confirmed = true

Step 2: スタイル変更
  li.style.opacity = "0.5"
  → 要素が半透明になる（即座に）

  li.style.transition = "opacity 0.3s"
  → 0.3秒かけてアニメーション

視覚的な変化:
  0.0秒: opacity = 1.0 (完全に見える)
  0.1秒: opacity = 0.83
  0.2秒: opacity = 0.66
  0.3秒: opacity = 0.5  (半透明)

Step 3: setTimeout()を設定
  300ミリ秒後に実行する関数を登録
  → 0.3秒待つ

Step 4: 0.3秒後に実行
  tasks.splice(i, 1)
  showTasks()
  → 要素が削除される

タイムライン:
  0ms:     ボタンクリック
  0ms:     opacity = 0.5 に変化開始
  300ms:   アニメーション完了
  300ms:   削除実行
  300ms+:  画面再構築
```

**setTimeout()の説明:**

```javascript
setTimeout(関数, 遅延時間（ミリ秒）)

// 例1: 1秒後に実行
setTimeout(function() {
  console.log("1秒経過");
}, 1000);

// 例2: 0.3秒後に実行
setTimeout(function() {
  tasks.splice(i, 1);
  showTasks();
}, 300);
```

### 7.2 スライドアウトアニメーション

```javascript
deleteButton.addEventListener("click", function() {
  if (confirm("削除しますか？")) {
    // 左にスライド
    li.style.transform = "translateX(-100%)";
    li.style.transition = "transform 0.3s";

    setTimeout(function() {
      tasks.splice(i, 1);
      showTasks();
    }, 300);
  }
});
```

**視覚的な動き:**

```
アニメーション前:
┌────────────────────┐
│ 買い物 [削除]      │
│ 掃除   [削除]  ←   │  クリック
│ 洗濯   [削除]      │
└────────────────────┘

アニメーション中:
┌────────────────────┐
│ 買い物 [削除]      │
│掃除   [削除]       │  ← 左にスライド
│ 洗濯   [削除]      │
└────────────────────┘

アニメーション後（削除）:
┌────────────────────┐
│ 買い物 [削除]      │
│ 洗濯   [削除]      │
└────────────────────┘
```

---

## 実践例：完全なTODOリスト（削除機能付き）

削除機能を持つ完全なTODOリストを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>TODOリスト</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    h1 {
      color: #333;
    }
    .input-section {
      margin: 20px 0;
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    input[type="text"] {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      width: 300px;
    }
    button {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      margin-left: 10px;
    }
    button:hover {
      background-color: #45a049;
    }
    .task-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      margin: 10px 0;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .task-text {
      flex-grow: 1;
      font-size: 16px;
    }
    .delete-button {
      background-color: #e74c3c;
      padding: 8px 16px;
      font-size: 14px;
      margin-left: 10px;
    }
    .delete-button:hover {
      background-color: #c0392b;
    }
    .clear-all {
      background-color: #95a5a6;
      margin-top: 20px;
      width: 100%;
    }
    .clear-all:hover {
      background-color: #7f8c8d;
    }
    .empty-message {
      text-align: center;
      color: #999;
      font-style: italic;
      padding: 40px;
      background-color: white;
      border-radius: 8px;
    }
    .summary {
      background-color: #e3f2fd;
      padding: 15px;
      margin: 20px 0;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <h1>✅ TODOリスト</h1>

  <div class="input-section">
    <input type="text" id="taskInput" placeholder="タスクを入力">
    <button id="addButton">追加</button>
  </div>

  <div class="summary">
    <p>タスク数: <strong><span id="taskCount">0</span>件</strong></p>
  </div>

  <div id="taskList"></div>

  <button id="clearAll" class="clear-all">すべて削除</button>

  <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let tasks = [];

let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let taskList = document.getElementById("taskList");
let taskCount = document.getElementById("taskCount");
let clearAllButton = document.getElementById("clearAll");

// タスクを追加
addButton.addEventListener("click", function() {
  let text = taskInput.value.trim();

  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  tasks.push(text);
  showTasks();

  taskInput.value = "";
  taskInput.focus();
});

// Enterキーで追加
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

// すべて削除
clearAllButton.addEventListener("click", function() {
  if (tasks.length === 0) {
    alert("削除するタスクがありません");
    return;
  }

  let confirmed = confirm("すべてのタスクを削除しますか？");

  if (confirmed) {
    tasks = [];
    showTasks();
  }
});

// タスクを表示
function showTasks() {
  taskList.replaceChildren();
  taskCount.textContent = tasks.length;

  if (tasks.length === 0) {
    let empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "タスクがありません";
    taskList.appendChild(empty);
    return;
  }

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let div = document.createElement("div");
    div.className = "task-item";

    let text = document.createElement("span");
    text.className = "task-text";
    text.textContent = (i + 1) + ". " + task;

    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function() {
      let confirmed = confirm("「" + task + "」を削除しますか？");

      if (confirmed) {
        tasks.splice(i, 1);
        showTasks();
      }
    });

    div.appendChild(text);
    div.appendChild(deleteButton);

    taskList.appendChild(div);
  }
}

// 初期表示
showTasks();
taskInput.focus();
```

### アプリケーションの動作フロー

```
初期表示:
┌─────────────────────────────────┐
│ ✅ TODOリスト                   │
├─────────────────────────────────┤
│ [タスクを入力]      [追加]     │
├─────────────────────────────────┤
│ タスク数: 0件                   │
├─────────────────────────────────┤
│ タスクがありません              │
├─────────────────────────────────┤
│ [すべて削除]                    │
└─────────────────────────────────┘

ユーザー操作1: タスク追加
  入力: "買い物"
  [追加]クリック

処理:
  tasks.push("買い物")
  → tasks = ["買い物"]
  showTasks()

表示:
┌─────────────────────────────────┐
│ タスク数: 1件                   │
├─────────────────────────────────┤
│ 1. 買い物          [削除]       │
└─────────────────────────────────┘

ユーザー操作2: さらに追加
  入力: "掃除"
  [追加]クリック

  入力: "洗濯"
  [追加]クリック

結果:
  tasks = ["買い物", "掃除", "洗濯"]

表示:
┌─────────────────────────────────┐
│ タスク数: 3件                   │
├─────────────────────────────────┤
│ 1. 買い物          [削除]       │
│ 2. 掃除            [削除]       │
│ 3. 洗濯            [削除]       │
└─────────────────────────────────┘

ユーザー操作3: 個別削除
  2番目の[削除]ボタンをクリック

確認ダイアログ:
┌─────────────────────────────────┐
│ 「掃除」を削除しますか？        │
│                                 │
│   [OK]    [キャンセル]          │
└─────────────────────────────────┘

[OK]をクリック:
  tasks.splice(1, 1)
  → tasks = ["買い物", "洗濯"]
  showTasks()

表示:
┌─────────────────────────────────┐
│ タスク数: 2件                   │
├─────────────────────────────────┤
│ 1. 買い物          [削除]       │
│ 2. 洗濯            [削除]       │
└─────────────────────────────────┘

ユーザー操作4: すべて削除
  [すべて削除]ボタンをクリック

確認ダイアログ:
┌─────────────────────────────────┐
│ すべてのタスクを削除しますか？  │
│                                 │
│   [OK]    [キャンセル]          │
└─────────────────────────────────┘

[OK]をクリック:
  tasks = []
  showTasks()

最終表示:
┌─────────────────────────────────┐
│ タスク数: 0件                   │
├─────────────────────────────────┤
│ タスクがありません              │
└─────────────────────────────────┘
```

### このコードのポイント

```
1. 個別削除
   ┌──────────────────────────┐
   │ 各タスクに削除ボタン     │
   │ splice(i, 1) で削除      │
   │ 削除後にshowTasks()      │
   └──────────────────────────┘

2. 確認ダイアログ
   ┌──────────────────────────┐
   │ confirm()で確認          │
   │ タスク名を表示           │
   │ キャンセル可能           │
   └──────────────────────────┘

3. すべて削除
   ┌──────────────────────────┐
   │ tasks = [] で空にする    │
   │ 事前にタスク数チェック   │
   │ 確認ダイアログ表示       │
   └──────────────────────────┘

4. 画面更新
   ┌──────────────────────────┐
   │ 削除後は必ずshowTasks()  │
   │ タスク数も同時に更新     │
   │ 空の状態も適切に表示     │
   └──────────────────────────┘

5. クロージャ
   ┌──────────────────────────┐
   │ letでループ変数を宣言    │
   │ 各関数が i を記憶        │
   │ 正しい要素を削除         │
   └──────────────────────────┘
```

---

## 練習問題

「ブックマーク管理アプリ」を作成してください。

### 要件

1. URLとタイトルを入力して追加
2. 追加したブックマークをリスト表示
3. 各ブックマークに削除ボタン
4. 削除前に確認メッセージ
5. 「すべて削除」ボタン

### ヒント

```javascript
let bookmarks = [];

let urlInput = document.getElementById("urlInput");
let titleInput = document.getElementById("titleInput");
let addButton = document.getElementById("addButton");
let bookmarkList = document.getElementById("bookmarkList");
let clearAllButton = document.getElementById("clearAll");

addButton.addEventListener("click", function() {
  let url = urlInput.value.trim();
  let title = titleInput.value.trim();

  if (url === "" || title === "") {
    alert("URLとタイトルを入力してください");
    return;
  }

  let bookmark = {
    url: url,
    title: title
  };

  bookmarks.push(bookmark);
  showBookmarks();

  urlInput.value = "";
  titleInput.value = "";
  urlInput.focus();
});

function deleteBookmark(index) {
  let bookmark = bookmarks[index];
  let confirmed = confirm("「" + bookmark.title + "」を削除しますか？");

  if (confirmed) {
    bookmarks.splice(index, 1);
    showBookmarks();
  }
}

function showBookmarks() {
  bookmarkList.replaceChildren();

  if (bookmarks.length === 0) {
    let empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "ブックマークがありません";
    bookmarkList.appendChild(empty);
    return;
  }

  for (let i = 0; i < bookmarks.length; i++) {
    let bookmark = bookmarks[i];

    let div = document.createElement("div");
    div.className = "bookmark-item";

    let link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.title;
    link.target = "_blank";

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function() {
      deleteBookmark(i);
    });

    div.appendChild(link);
    div.appendChild(deleteButton);

    bookmarkList.appendChild(div);
  }
}

clearAllButton.addEventListener("click", function() {
  if (bookmarks.length === 0) {
    alert("削除するブックマークがありません");
    return;
  }

  let confirmed = confirm("すべてのブックマークを削除しますか？");

  if (confirmed) {
    bookmarks = [];
    showBookmarks();
  }
});

showBookmarks();
```

### 解答例の実行フロー

```
初期状態:
bookmarks = []

ユーザー操作1: ブックマーク追加
  URL: "https://example.com"
  タイトル: "例のサイト"
  [追加]クリック

処理:
  bookmark = {
    url: "https://example.com",
    title: "例のサイト"
  }

  bookmarks.push(bookmark)
  → bookmarks = [
       { url: "https://example.com", title: "例のサイト" }
     ]

  showBookmarks()

表示:
  例のサイト [削除]
  ↑ リンク

ユーザー操作2: さらに追加
  URL: "https://google.com"
  タイトル: "Google"

結果:
  bookmarks = [
    { url: "https://example.com", title: "例のサイト" },
    { url: "https://google.com", title: "Google" }
  ]

表示:
  例のサイト [削除]
  Google     [削除]

ユーザー操作3: 削除
  1番目の[削除]をクリック

確認:
  confirm("「例のサイト」を削除しますか？")
  → OK

処理:
  bookmarks.splice(0, 1)
  → bookmarks = [
       { url: "https://google.com", title: "Google" }
     ]

  showBookmarks()

最終表示:
  Google [削除]
```

### 追加課題

1. **編集機能を追加**
   - 各ブックマークに「編集」ボタン
   - クリックすると入力欄に値をセット
   - 更新ボタンで保存

2. **IDを使った削除**
   - 各ブックマークにIDを付与
   - findIndex()で検索して削除

3. **カテゴリ分け**
   - カテゴリプロパティを追加
   - カテゴリごとに表示

---

## ケーススタディ1: 買い物リストアプリ

購入した商品を削除すると、合計金額が自動更新されるアプリを作りましょう。

```javascript
let items = [
  { name: "りんご", price: 150 },
  { name: "バナナ", price: 100 },
  { name: "牛乳", price: 200 }
];

function showItems() {
  itemList.replaceChildren();

  let totalPrice = 0;

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    totalPrice += item.price;

    let div = document.createElement("div");
    div.className = "item";

    let text = document.createElement("span");
    text.textContent = (i + 1) + ". " + item.name + " - ¥" + item.price;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", function() {
      if (confirm("「" + item.name + "」を削除しますか？")) {
        items.splice(i, 1);
        showItems();  // 削除後、合計も自動更新される
      }
    });

    div.appendChild(text);
    div.appendChild(deleteButton);
    itemList.appendChild(div);
  }

  totalElement.textContent = "合計: ¥" + totalPrice;
}
```

**実行フロー:**

```
初期状態:
items = [
  { name: "りんご", price: 150 },
  { name: "バナナ", price: 100 },
  { name: "牛乳", price: 200 }
]

showItems()呼び出し:
  totalPrice = 0

  ループで各商品を表示:
    totalPrice = 0 + 150 + 100 + 200 = 450

  totalElement.textContent = "合計: ¥450"

画面表示:
  1. りんご - ¥150 [削除]
  2. バナナ - ¥100 [削除]
  3. 牛乳   - ¥200 [削除]
  ─────────────────────
  合計: ¥450

ユーザーがバナナを削除:
  confirm("「バナナ」を削除しますか？")
  → OK

  items.splice(1, 1)
  → items = [
       { name: "りんご", price: 150 },
       { name: "牛乳", price: 200 }
     ]

  showItems()呼び出し:
    totalPrice = 0
    totalPrice = 0 + 150 + 200 = 350
    totalElement.textContent = "合計: ¥350"

新しい画面:
  1. りんご - ¥150 [削除]
  2. 牛乳   - ¥200 [削除]
  ─────────────────────
  合計: ¥350  ← 自動的に再計算された
```

---

## ケーススタディ2: メモアプリ

日時付きのメモを削除できるアプリを作りましょう。

```javascript
let memos = [];
let nextId = 1;

function addMemo(content) {
  let now = new Date();
  let dateString = now.toLocaleString("ja-JP");

  let memo = {
    id: nextId,
    content: content,
    date: dateString
  };

  memos.push(memo);
  nextId++;
  showMemos();
}

function deleteMemo(id) {
  let index = memos.findIndex(memo => memo.id === id);

  if (index !== -1) {
    let memo = memos[index];
    let confirmed = confirm("このメモを削除しますか？\n\n" + memo.content);

    if (confirmed) {
      memos.splice(index, 1);
      showMemos();
    }
  }
}

function showMemos() {
  memoList.replaceChildren();

  if (memos.length === 0) {
    let empty = document.createElement("p");
    empty.textContent = "メモがありません";
    memoList.appendChild(empty);
    return;
  }

  for (let memo of memos) {
    let div = document.createElement("div");
    div.className = "memo-item";

    let content = document.createElement("p");
    content.className = "memo-content";
    content.textContent = memo.content;

    let date = document.createElement("p");
    date.className = "memo-date";
    date.textContent = memo.date;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", function() {
      deleteMemo(memo.id);
    });

    div.appendChild(content);
    div.appendChild(date);
    div.appendChild(deleteButton);

    memoList.appendChild(div);
  }
}
```

**実行フロー:**

```
初期状態:
memos = []
nextId = 1

addMemo("今日の予定を確認する"):
  memo = {
    id: 1,
    content: "今日の予定を確認する",
    date: "2025/11/26 14:30:00"
  }
  memos = [memo]
  nextId = 2

addMemo("買い物リストを作る"):
  memo = {
    id: 2,
    content: "買い物リストを作る",
    date: "2025/11/26 14:31:00"
  }
  memos = [memo1, memo2]
  nextId = 3

表示:
┌────────────────────────────────┐
│ 今日の予定を確認する           │
│ 2025/11/26 14:30:00            │
│ [削除]                         │
├────────────────────────────────┤
│ 買い物リストを作る             │
│ 2025/11/26 14:31:00            │
│ [削除]                         │
└────────────────────────────────┘

deleteMemo(1) を呼ぶ:
  index = 0 (id: 1 が見つかった)

  confirm()表示:
    「このメモを削除しますか？

    今日の予定を確認する」

  OK → splice(0, 1)

  memos = [
    { id: 2, content: "買い物リストを作る", ... }
  ]

更新後の表示:
┌────────────────────────────────┐
│ 買い物リストを作る             │
│ 2025/11/26 14:31:00            │
│ [削除]                         │
└────────────────────────────────┘
```

---

## まとめ

今回は、配列から要素を削除する方法を学びました：

### 重要なポイント

```
1. 削除ボタン
   ┌────────────────────────┐
   │ createElement("button")│
   │ 各要素に追加           │
   │ textContent = "削除"   │
   └────────────────────────┘

2. splice()メソッド
   ┌────────────────────────┐
   │ splice(index, 1)       │
   │ 指定位置から削除       │
   │ 後ろの要素が詰まる     │
   └────────────────────────┘

3. 画面更新
   ┌────────────────────────┐
   │ 削除後は必ずshowTasks()│
   │ データと表示を同期     │
   │ パターンを守る         │
   └────────────────────────┘

4. 確認ダイアログ
   ┌────────────────────────┐
   │ confirm()で確認        │
   │ 誤削除を防ぐ           │
   │ trueで削除実行         │
   └────────────────────────┘

5. クロージャ
   ┌────────────────────────┐
   │ ループ内の関数         │
   │ 変数の値を記憶         │
   │ let で宣言する         │
   └────────────────────────┘

6. ID管理
   ┌────────────────────────┐
   │ より確実な削除         │
   │ findIndex()で検索      │
   │ 一意な識別子           │
   └────────────────────────┘

7. すべて削除
   ┌────────────────────────┐
   │ tasks = []             │
   │ 配列を空にする         │
   │ 事前チェック           │
   └────────────────────────┘
```

### 実用的なパターン

```javascript
// パターン1: 基本的な削除
deleteButton.addEventListener("click", function() {
  tasks.splice(i, 1);
  showTasks();
});

// パターン2: 確認付き削除
deleteButton.addEventListener("click", function() {
  if (confirm("削除しますか？")) {
    tasks.splice(i, 1);
    showTasks();
  }
});

// パターン3: IDを使った削除
function deleteTask(id) {
  let index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    showTasks();
  }
}

// パターン4: すべて削除
function clearAll() {
  if (confirm("すべて削除しますか？")) {
    tasks = [];
    showTasks();
  }
}

// パターン5: アニメーション付き削除
deleteButton.addEventListener("click", function() {
  li.style.opacity = "0.5";
  li.style.transition = "opacity 0.3s";
  setTimeout(function() {
    tasks.splice(i, 1);
    showTasks();
  }, 300);
});
```

### splice()の使い方まとめ

```javascript
let arr = ["a", "b", "c", "d", "e"];

// 1個削除
arr.splice(2, 1);  // インデックス2から1個
// ["a", "b", "d", "e"]

// 2個削除
arr.splice(1, 2);  // インデックス1から2個
// ["a", "d", "e"]

// 最初を削除
arr.splice(0, 1);
// ["d", "e"]

// 最後を削除
arr.splice(arr.length - 1, 1);
// ["d"]

// すべて削除
arr.splice(0, arr.length);
// []
```

削除機能は、CRUD（作成・読み取り・更新・削除）操作の重要な部分です。`splice()`メソッドと画面更新のパターンをしっかり理解しましょう。

次のレッスンでは、オブジェクトの配列を使った、より複雑なデータ構造について学びます。

---

## カリキュラム要件チェック

このレッスンで以下の要件を満たしています：

✅ **削除ボタン追加**: 各タスクに削除ボタンを配置する方法を詳しく解説
✅ **配列から削除**: splice()メソッドの使い方を完全に理解
✅ **表示を更新**: 削除後の画面更新パターンを習得
✅ **【知識】要素の削除、インデックス管理**: splice()、クロージャ、findIndex()、ID管理など包括的に学習
✅ **成果物：TODO削除機能**: 完全なTODOリストアプリで削除機能を実装

---

## 次回予告

次回のレッスン104では、**オブジェクトの配列**を学びます：

- `[{id: 1, text: "買い物"}]` の形式
- 複雑なデータ構造の扱い方
- プロパティアクセスと操作
- より実用的なアプリケーション開発

タスクの削除ができるようになったので、次はより構造化されたデータの扱い方を学びましょう！
