---
title: "レッスン102：タスク表示"
author: "JavaScript Online Lessons"
date: "2025-11-26"
---

# レッスン102：タスク表示

## このレッスンで学ぶこと

### 前回の復習

前回のレッスン101では、ユーザー入力を処理してタスクを追加する方法を学びました：

```javascript
// タスク追加の基本パターン
addButton.addEventListener("click", function() {
  let text = taskInput.value.trim();  // Step 1: 入力取得
  if (text === "") return;            // Step 2: バリデーション
  tasks.push(text);                   // Step 3: 配列に追加
  showTasks();                        // Step 4: 表示更新
  taskInput.value = "";               // Step 5: 入力欄クリア
});
```

しかし、追加したタスクをただリスト表示するだけでは、ユーザーにとって見づらく、使いにくいアプリケーションになってしまいます。

### よくある場面

実際のアプリケーションでは、以下のような「見やすい表示」が求められます：

1. **買い物リストアプリ**
   - 「1. りんご」「2. バナナ」のように番号付きで表示
   - 各アイテムを見やすく整列
   - 重要度に応じて色分け

2. **タスク管理アプリ**
   - タスクの番号、タイトル、優先度を構造化して表示
   - 視覚的なアイコンで直感的に理解できる
   - タスクが無い時は「まだタスクがありません」と表示

3. **学習記録アプリ**
   - 科目名と学習時間を整形して表示
   - 合計学習時間を自動計算して表示
   - 交互に背景色を変えて見やすく

### 学習目標

このレッスンでは、以下の技術を習得します：

1. **番号付き表示**: `for`ループのインデックスを活用
2. **構造化された表示**: 複数の要素を組み合わせて整理
3. **CSSスタイリング**: 見やすいデザインの適用
4. **条件付きスタイル**: データに応じた表示の変更
5. **空の状態の処理**: データが無い時の適切な表示
6. **集計表示**: 配列の統計情報の表示

---

## 1. 番号付き表示の基本

### 1.1 なぜ番号が必要なのか？

タスクに番号を付けることで、以下のメリットがあります：

```
番号なし:                     番号あり:
-----------------            -----------------
りんご                       1. りんご
バナナ                       2. バナナ
牛乳                         3. 牛乳
↑ どれが何番目か分からない   ↑ 一目で順序が分かる
```

**実用例:**
- 「2番目のタスクを削除したい」と言える
- 「全部で3個のタスクがある」と分かる
- タスクの順序が明確になる

### 1.2 forループのインデックスを使う方法

通常の`for`ループを使うと、インデックス（番号）が利用できます：

```javascript
let tasks = ["買い物", "掃除", "洗濯"];

function showTasks() {
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let li = document.createElement("li");
    li.textContent = (i + 1) + ". " + task;  // 1. 買い物
    taskList.appendChild(li);
  }
}
```

**実行フローの詳細:**

```
初期状態:
tasks = ["買い物", "掃除", "洗濯"]
taskList = <ul id="taskList"></ul>

Step 1: showTasks()が呼ばれる
  taskList.replaceChildren()
  → taskList = <ul></ul> (空になる)

Step 2: ループ開始 (i = 0)
  task = tasks[0] = "買い物"

  li = document.createElement("li")
  → li = <li></li>

  li.textContent = (0 + 1) + ". " + "買い物"
  → li.textContent = "1" + ". " + "買い物"
  → li.textContent = "1. 買い物"
  → li = <li>1. 買い物</li>

  taskList.appendChild(li)
  → taskList = <ul><li>1. 買い物</li></ul>

Step 3: ループ2回目 (i = 1)
  task = tasks[1] = "掃除"

  li = document.createElement("li")
  → li = <li></li>

  li.textContent = (1 + 1) + ". " + "掃除"
  → li.textContent = "2. 掃除"
  → li = <li>2. 掃除</li>

  taskList.appendChild(li)
  → taskList = <ul>
               <li>1. 買い物</li>
               <li>2. 掃除</li>
             </ul>

Step 4: ループ3回目 (i = 2)
  task = tasks[2] = "洗濯"

  li = document.createElement("li")
  li.textContent = (2 + 1) + ". " + "洗濯"
  → li.textContent = "3. 洗濯"

  taskList.appendChild(li)
  → taskList = <ul>
               <li>1. 買い物</li>
               <li>2. 掃除</li>
               <li>3. 洗濯</li>
             </ul>

Step 5: ループ終了 (i = 3, i < 3はfalse)

最終結果:
画面表示:
  1. 買い物
  2. 掃除
  3. 洗濯
```

**重要ポイント: `i + 1`の理由**

```javascript
// インデックスは0から始まる
// でも、人間にとって自然なのは1から始まる番号

i = 0  →  i + 1 = 1  →  "1. 買い物"  ✓ 自然
i = 1  →  i + 1 = 2  →  "2. 掃除"    ✓ 自然
i = 2  →  i + 1 = 3  →  "3. 洗濯"    ✓ 自然

// もし i + 1 をしないと...
i = 0  →  "0. 買い物"  ✗ 不自然
i = 1  →  "1. 掃除"    ✗ ズレている
i = 2  →  "2. 洗濯"    ✗ ズレている
```

### 1.3 for...ofループとの比較

`for...of`ループではインデックスが取得できません：

```javascript
// for...of では番号を付けられない ✗
for (let task of tasks) {
  let li = document.createElement("li");
  li.textContent = "?. " + task;  // 番号が分からない
  taskList.appendChild(li);
}

// 通常のforループなら番号が使える ✓
for (let i = 0; i < tasks.length; i++) {
  let task = tasks[i];
  let li = document.createElement("li");
  li.textContent = (i + 1) + ". " + task;  // 番号が分かる
  taskList.appendChild(li);
}
```

**どちらを使うべきか？**

```
┌─────────────────────────────────────┐
│ for...of を使う場合:                │
├─────────────────────────────────────┤
│ ✓ 番号が不要                        │
│ ✓ シンプルにループしたい            │
│ ✓ コードが読みやすい                │
│                                     │
│ for (let task of tasks) {           │
│   // taskだけ使う                   │
│ }                                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 通常のfor を使う場合:               │
├─────────────────────────────────────┤
│ ✓ 番号が必要                        │
│ ✓ インデックスを使いたい            │
│ ✓ 条件付きスタイルを適用            │
│                                     │
│ for (let i = 0; i < tasks.length; i++) { │
│   // iとtask両方使える              │
│ }                                   │
└─────────────────────────────────────┘
```

---

## 2. 構造化された表示

### 2.1 なぜ構造化が必要なのか？

単純な文字列結合では、柔軟なデザインができません：

```javascript
// 単純な方法 - デザインの自由度が低い
li.textContent = "1. 買い物";

// ↓ CSSで番号だけ色を変えたい... でもできない
// ↓ 番号を右寄せにしたい... でもできない
```

構造化すると、各要素を個別にスタイリングできます：

```javascript
// 構造化された方法 - デザインの自由度が高い
let number = document.createElement("span");
number.textContent = "1.";
number.className = "task-number";  // CSSで個別にスタイル可能

let text = document.createElement("span");
text.textContent = "買い物";
text.className = "task-text";  // CSSで個別にスタイル可能
```

### 2.2 番号とテキストを分離する

```javascript
function showTasks() {
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    // 1. <li>要素を作成
    let li = document.createElement("li");

    // 2. 番号用の<span>を作成
    let number = document.createElement("span");
    number.className = "task-number";
    number.textContent = (i + 1) + ".";

    // 3. テキスト用の<span>を作成
    let text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task;

    // 4. 組み立て
    li.appendChild(number);
    li.appendChild(text);

    // 5. リストに追加
    taskList.appendChild(li);
  }
}
```

**HTML構造の視覚化:**

```
tasks = ["買い物", "掃除"]

ループ1回目 (i=0):
┌─────────────────────────────────┐
│ <li>                            │
│   <span class="task-number">   │
│     1.                          │  ← (0 + 1) + "."
│   </span>                       │
│   <span class="task-text">     │
│     買い物                      │  ← tasks[0]
│   </span>                       │
│ </li>                           │
└─────────────────────────────────┘

ループ2回目 (i=1):
┌─────────────────────────────────┐
│ <li>                            │
│   <span class="task-number">   │
│     2.                          │  ← (1 + 1) + "."
│   </span>                       │
│   <span class="task-text">     │
│     掃除                        │  ← tasks[1]
│   </span>                       │
│ </li>                           │
└─────────────────────────────────┘

最終的なHTML:
<ul id="taskList">
  <li>
    <span class="task-number">1.</span>
    <span class="task-text">買い物</span>
  </li>
  <li>
    <span class="task-number">2.</span>
    <span class="task-text">掃除</span>
  </li>
</ul>
```

**CSSでスタイリング:**

```css
.task-number {
  font-weight: bold;
  color: #4CAF50;      /* 番号だけ緑色 */
  margin-right: 10px;
  min-width: 30px;     /* 幅を固定して揃える */
}

.task-text {
  flex-grow: 1;
  font-size: 16px;
  color: #333;         /* テキストは黒 */
}
```

### 2.3 divでラップする（より複雑なレイアウト）

より複雑な情報を表示する場合は、`<div>`を使います：

```javascript
function showTasks() {
  container.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    // メインコンテナ
    let div = document.createElement("div");
    div.className = "task-item";

    // 番号
    let number = document.createElement("span");
    number.className = "task-number";
    number.textContent = "#" + (i + 1);

    // テキスト
    let text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task;

    // 組み立て
    div.appendChild(number);
    div.appendChild(text);

    container.appendChild(div);
  }
}
```

**実行フロー例:**

```
初期状態:
tasks = ["買い物", "掃除"]
container = <div id="container"></div>

ループ1回目 (i=0):
  div = <div class="task-item"></div>

  number = <span class="task-number">#1</span>
  text = <span class="task-text">買い物</span>

  div.appendChild(number)
  → div = <div class="task-item">
            <span class="task-number">#1</span>
          </div>

  div.appendChild(text)
  → div = <div class="task-item">
            <span class="task-number">#1</span>
            <span class="task-text">買い物</span>
          </div>

  container.appendChild(div)
  → container = <div id="container">
                  <div class="task-item">
                    <span class="task-number">#1</span>
                    <span class="task-text">買い物</span>
                  </div>
                </div>

ループ2回目 (i=1):
  同様の処理...

最終結果:
container = <div id="container">
              <div class="task-item">
                <span class="task-number">#1</span>
                <span class="task-text">買い物</span>
              </div>
              <div class="task-item">
                <span class="task-number">#2</span>
                <span class="task-text">掃除</span>
              </div>
            </div>
```

---

## 3. CSSでスタイリング

### 3.1 基本的なスタイル

見やすいタスクリストを作るための基本的なCSSスタイル：

```css
.task-item {
  display: flex;           /* 横並びレイアウト */
  align-items: center;     /* 垂直方向の中央揃え */
  padding: 15px;           /* 内側の余白 */
  margin: 10px 0;          /* 上下の余白 */
  border: 1px solid #ddd;  /* 薄い灰色の枠線 */
  border-radius: 5px;      /* 角を丸く */
  background-color: white; /* 背景は白 */
}

.task-number {
  font-weight: bold;       /* 太字 */
  color: #4CAF50;          /* 緑色 */
  margin-right: 10px;      /* 右側に余白 */
  min-width: 30px;         /* 最小幅を固定 */
}

.task-text {
  flex-grow: 1;            /* 残りのスペースを占有 */
  font-size: 16px;
}
```

**視覚的な説明:**

```
適用前:
┌──────────────────────────┐
│ #1 買い物                │  ← 詰まっていて見づらい
│ #2 掃除                  │
└──────────────────────────┘

適用後:
┌──────────────────────────────────┐
│  #1  │ 買い物              │      │  ← 余白があって見やすい
├──────────────────────────────────┤
│  #2  │ 掃除                │      │  ← 要素が整列している
└──────────────────────────────────┘
  ↑       ↑                  ↑
  番号    テキスト            余白
  (固定)  (伸縮)
```

### 3.2 交互に色を変える（ストライプ効果）

リストが長くなると、どの行を見ているか分からなくなります。交互に色を変えると見やすくなります：

**JavaScriptで制御する方法:**

```javascript
for (let i = 0; i < tasks.length; i++) {
  let div = document.createElement("div");
  div.className = "task-item";

  // 偶数行と奇数行で色を変える
  if (i % 2 === 0) {
    div.style.backgroundColor = "#f9f9f9";  // 薄い灰色
  } else {
    div.style.backgroundColor = "white";    // 白
  }

  // ... 残りの処理
}
```

**実行フローの詳細:**

```
ループ処理:

i = 0:
  0 % 2 = 0 (偶数)
  → backgroundColor = "#f9f9f9"

i = 1:
  1 % 2 = 1 (奇数)
  → backgroundColor = "white"

i = 2:
  2 % 2 = 0 (偶数)
  → backgroundColor = "#f9f9f9"

i = 3:
  3 % 2 = 1 (奇数)
  → backgroundColor = "white"

視覚的な結果:
┌─────────────────────┐
│ 1. 買い物           │  ← 薄い灰色 (#f9f9f9)
├─────────────────────┤
│ 2. 掃除             │  ← 白 (white)
├─────────────────────┤
│ 3. 洗濯             │  ← 薄い灰色 (#f9f9f9)
├─────────────────────┤
│ 4. 料理             │  ← 白 (white)
└─────────────────────┘
```

**% (剰余演算子) の復習:**

```
偶数判定パターン:
n % 2 === 0  → nは偶数
n % 2 === 1  → nは奇数

例:
0 % 2 = 0  ✓ 偶数
1 % 2 = 1  ✓ 奇数
2 % 2 = 0  ✓ 偶数
3 % 2 = 1  ✓ 奇数
4 % 2 = 0  ✓ 偶数
```

**CSSだけで実現する方法（参考）:**

```css
/* CSS の :nth-child() 疑似クラスを使う */
.task-item:nth-child(even) {
  background-color: #f9f9f9;  /* 偶数番目 */
}

.task-item:nth-child(odd) {
  background-color: white;    /* 奇数番目 */
}
```

---

## 4. オブジェクトの配列を表示

### 4.1 複数の情報を持つデータ

実際のアプリケーションでは、タスクは単なる文字列ではなく、複数の情報を持つオブジェクトです：

```javascript
// 単純な配列（文字列のみ）
let tasks = ["買い物", "掃除", "洗濯"];

// オブジェクトの配列（複数の情報）
let tasks = [
  { title: "買い物", priority: "高" },
  { title: "掃除", priority: "中" },
  { title: "読書", priority: "低" }
];
```

### 4.2 オブジェクトの配列を表示する

```javascript
let tasks = [
  { title: "買い物", priority: "高" },
  { title: "掃除", priority: "中" },
  { title: "読書", priority: "低" }
];

function showTasks() {
  container.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let div = document.createElement("div");
    div.className = "task-item";

    // 番号
    let number = document.createElement("span");
    number.className = "task-number";
    number.textContent = (i + 1);

    // タイトル
    let title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;  // オブジェクトのプロパティにアクセス

    // 優先度
    let priority = document.createElement("span");
    priority.className = "task-priority";
    priority.textContent = task.priority;  // オブジェクトのプロパティにアクセス

    // 組み立て
    div.appendChild(number);
    div.appendChild(title);
    div.appendChild(priority);

    container.appendChild(div);
  }
}
```

**実行フローの詳細:**

```
初期状態:
tasks = [
  { title: "買い物", priority: "高" },
  { title: "掃除", priority: "中" },
  { title: "読書", priority: "低" }
]

ループ1回目 (i = 0):
  task = tasks[0]
  → task = { title: "買い物", priority: "高" }

  div作成:
  div = <div class="task-item"></div>

  番号作成:
  number.textContent = (0 + 1) = 1
  → number = <span class="task-number">1</span>

  タイトル作成:
  title.textContent = task.title = "買い物"
  → title = <span class="task-title">買い物</span>

  優先度作成:
  priority.textContent = task.priority = "高"
  → priority = <span class="task-priority">高</span>

  組み立て:
  div.appendChild(number)
  div.appendChild(title)
  div.appendChild(priority)
  → div = <div class="task-item">
            <span class="task-number">1</span>
            <span class="task-title">買い物</span>
            <span class="task-priority">高</span>
          </div>

ループ2回目 (i = 1):
  task = { title: "掃除", priority: "中" }
  同様の処理...

ループ3回目 (i = 2):
  task = { title: "読書", priority: "低" }
  同様の処理...

最終的なHTML:
<div id="container">
  <div class="task-item">
    <span class="task-number">1</span>
    <span class="task-title">買い物</span>
    <span class="task-priority">高</span>
  </div>
  <div class="task-item">
    <span class="task-number">2</span>
    <span class="task-title">掃除</span>
    <span class="task-priority">中</span>
  </div>
  <div class="task-item">
    <span class="task-number">3</span>
    <span class="task-title">読書</span>
    <span class="task-priority">低</span>
  </div>
</div>
```

### 4.3 条件付きスタイル（優先度に応じて色を変える）

```javascript
// 優先度に応じてクラスを追加
if (task.priority === "高") {
  priority.classList.add("priority-high");
} else if (task.priority === "中") {
  priority.classList.add("priority-medium");
} else {
  priority.classList.add("priority-low");
}
```

**実行フローの詳細:**

```
task = { title: "買い物", priority: "高" }

Step 1: 基本要素の作成
  priority = <span class="task-priority">高</span>

Step 2: 条件分岐
  task.priority === "高"  → true

  priority.classList.add("priority-high")
  → priority = <span class="task-priority priority-high">高</span>

Step 3: CSSが適用される
  .priority-high {
    background-color: #ffebee;  /* 薄い赤 */
    color: #c62828;             /* 濃い赤 */
  }

結果:
  <span class="task-priority priority-high">高</span>
  ↑ 赤い背景と赤い文字で「高」と表示される
```

**3つの優先度の処理:**

```
優先度 "高":
  task.priority === "高"  → true
  → priority.classList.add("priority-high")
  → <span class="task-priority priority-high">高</span>
  → 赤い背景

優先度 "中":
  task.priority === "高"  → false
  task.priority === "中"  → true
  → priority.classList.add("priority-medium")
  → <span class="task-priority priority-medium">中</span>
  → オレンジの背景

優先度 "低":
  task.priority === "高"  → false
  task.priority === "中"  → false
  → else に入る
  → priority.classList.add("priority-low")
  → <span class="task-priority priority-low">低</span>
  → 緑の背景
```

**対応するCSS:**

```css
.task-priority {
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 3px;
  display: inline-block;
}

.priority-high {
  background-color: #ffebee;  /* 薄い赤 */
  color: #c62828;             /* 濃い赤 */
}

.priority-medium {
  background-color: #fff3e0;  /* 薄いオレンジ */
  color: #e65100;             /* 濃いオレンジ */
}

.priority-low {
  background-color: #e8f5e9;  /* 薄い緑 */
  color: #2e7d32;             /* 濃い緑 */
}
```

**視覚的な結果:**

```
┌──────────────────────────────────────┐
│ 1  買い物  [ 高 ]                    │  ← 赤い背景
├──────────────────────────────────────┤
│ 2  掃除    [ 中 ]                    │  ← オレンジの背景
├──────────────────────────────────────┤
│ 3  読書    [ 低 ]                    │  ← 緑の背景
└──────────────────────────────────────┘
```

---

## 5. 空の状態の表示

### 5.1 なぜ空の状態が重要なのか？

タスクが無い時に何も表示されないと、ユーザーは混乱します：

```
タスクが無い時:

対応なし:                    対応あり:
┌─────────────┐            ┌─────────────────────┐
│             │  ← 何もない │ まだタスクが        │
│             │     混乱する │ ありません          │
│             │            │                     │
└─────────────┘            └─────────────────────┘
                               ↑ 状態が分かる
```

### 5.2 空の状態を表示する

```javascript
function showTasks() {
  taskList.replaceChildren();

  // タスクが0個の時は特別なメッセージを表示
  if (tasks.length === 0) {
    let empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "まだタスクがありません";
    taskList.appendChild(empty);
    return;  // ここで関数を終了
  }

  // タスクを表示（通常の処理）
  for (let i = 0; i < tasks.length; i++) {
    // ...
  }
}
```

**実行フローの詳細:**

```
ケース1: タスクが無い場合
  tasks = []
  tasks.length = 0

  Step 1: replaceChildren()
    taskList = <ul></ul> (空になる)

  Step 2: 条件チェック
    tasks.length === 0
    → 0 === 0
    → true

  Step 3: 空メッセージの作成
    empty = document.createElement("p")
    → empty = <p></p>

    empty.className = "empty-message"
    → empty = <p class="empty-message"></p>

    empty.textContent = "まだタスクがありません"
    → empty = <p class="empty-message">まだタスクがありません</p>

  Step 4: 追加
    taskList.appendChild(empty)
    → taskList = <ul>
                   <p class="empty-message">まだタスクがありません</p>
                 </ul>

  Step 5: return で関数終了
    ← forループは実行されない

  結果:
    画面表示: "まだタスクがありません"


ケース2: タスクがある場合
  tasks = ["買い物"]
  tasks.length = 1

  Step 1: replaceChildren()
    taskList = <ul></ul>

  Step 2: 条件チェック
    tasks.length === 0
    → 1 === 0
    → false

  Step 3: if文をスキップ

  Step 4: forループ実行
    通常のタスク表示処理...

  結果:
    画面表示: タスクリスト
```

**returnの重要性:**

```javascript
if (tasks.length === 0) {
  // 空メッセージを表示
  let empty = document.createElement("p");
  empty.textContent = "まだタスクがありません";
  taskList.appendChild(empty);
  return;  // ★ ここで関数を終了
}

// return がないと、この下のコードも実行されてしまう
for (let i = 0; i < tasks.length; i++) {
  // ...
}
```

**CSSでスタイリング:**

```css
.empty-message {
  text-align: center;      /* 中央揃え */
  color: #999;             /* 薄い灰色 */
  font-style: italic;      /* 斜体 */
  padding: 40px;           /* 余白を大きく */
}
```

---

## 6. アイコンの追加

### 6.1 絵文字を使って視覚的に分かりやすく

文字だけより、アイコンがあると直感的に理解できます：

```javascript
// 番号に絵文字を追加
let number = document.createElement("span");
number.textContent = "✓ " + (i + 1);
```

### 6.2 優先度アイコン

```javascript
// 優先度に応じてアイコンを変える
let icon = "";
if (task.priority === "高") {
  icon = "🔴";  // 赤い丸
} else if (task.priority === "中") {
  icon = "🟡";  // 黄色い丸
} else {
  icon = "🟢";  // 緑の丸
}

let priority = document.createElement("span");
priority.textContent = icon + " " + task.priority;
```

**実行フローの詳細:**

```
task = { title: "買い物", priority: "高" }

Step 1: アイコンの決定
  let icon = ""

  task.priority === "高"  → true
  icon = "🔴"

Step 2: テキストの組み立て
  priority.textContent = icon + " " + task.priority
  priority.textContent = "🔴" + " " + "高"
  priority.textContent = "🔴 高"

  → priority = <span>🔴 高</span>

結果:
  画面表示: 🔴 高
           ↑ 一目で優先度が分かる
```

**3つの優先度の処理:**

```
優先度 "高":
  task.priority === "高"  → true
  icon = "🔴"
  priority.textContent = "🔴 高"

優先度 "中":
  task.priority === "高"  → false
  task.priority === "中"  → true
  icon = "🟡"
  priority.textContent = "🟡 中"

優先度 "低":
  task.priority === "高"  → false
  task.priority === "中"  → false
  else に入る
  icon = "🟢"
  priority.textContent = "🟢 低"
```

**視覚的な結果:**

```
┌──────────────────────────────────────┐
│ 1  買い物  🔴 高                     │  ← 赤い丸で緊急性が分かる
├──────────────────────────────────────┤
│ 2  掃除    🟡 中                     │  ← 黄色い丸
├──────────────────────────────────────┤
│ 3  読書    🟢 低                     │  ← 緑の丸
└──────────────────────────────────────┘
```

---

## 7. 集計情報の表示

### 7.1 タスク数を表示する

```javascript
function showTasks() {
  taskList.replaceChildren();

  // タスク数を更新
  taskCount.textContent = tasks.length;

  // 残りの処理...
}
```

**実行例:**

```
初期状態:
tasks = ["買い物", "掃除", "洗濯"]
taskCount = <span id="taskCount">0</span>

showTasks()呼び出し:
  taskCount.textContent = tasks.length
  taskCount.textContent = 3

  → taskCount = <span id="taskCount">3</span>

HTML:
  <p>タスク数: <strong><span id="taskCount">3</span>件</strong></p>

画面表示:
  タスク数: 3件
```

### 7.2 合計を計算する（学習時間の例）

```javascript
let records = [
  { subject: "数学", minutes: 60 },
  { subject: "英語", minutes: 45 },
  { subject: "国語", minutes: 30 }
];

function showRecords() {
  container.replaceChildren();

  let totalMinutes = 0;  // 合計を格納する変数

  for (let i = 0; i < records.length; i++) {
    let record = records[i];

    // 合計に加算
    totalMinutes += record.minutes;

    // 表示処理...
  }

  // 合計を表示
  totalElement.textContent = totalMinutes + "分";
}
```

**実行フローの詳細:**

```
初期状態:
records = [
  { subject: "数学", minutes: 60 },
  { subject: "英語", minutes: 45 },
  { subject: "国語", minutes: 30 }
]

showRecords()呼び出し:
  totalMinutes = 0

ループ1回目 (i = 0):
  record = { subject: "数学", minutes: 60 }

  totalMinutes += record.minutes
  totalMinutes = totalMinutes + 60
  totalMinutes = 0 + 60
  totalMinutes = 60

  表示処理: "1. 数学 60分"

ループ2回目 (i = 1):
  record = { subject: "英語", minutes: 45 }

  totalMinutes += record.minutes
  totalMinutes = 60 + 45
  totalMinutes = 105

  表示処理: "2. 英語 45分"

ループ3回目 (i = 2):
  record = { subject: "国語", minutes: 30 }

  totalMinutes += record.minutes
  totalMinutes = 105 + 30
  totalMinutes = 135

  表示処理: "3. 国語 30分"

ループ終了後:
  totalElement.textContent = totalMinutes + "分"
  totalElement.textContent = "135分"

最終結果:
  画面表示:
    1. 数学 60分
    2. 英語 45分
    3. 国語 30分
    ─────────────
    合計: 135分
```

**視覚的な計算プロセス:**

```
totalMinutes の変化:

  初期値:   0
           ↓ +60 (数学)
  1回目後:  60
           ↓ +45 (英語)
  2回目後:  105
           ↓ +30 (国語)
  最終値:   135

┌─────────────────────────┐
│ 数学    60分            │
├─────────────────────────┤
│ 英語    45分            │
├─────────────────────────┤
│ 国語    30分            │
├─────────────────────────┤
│ 合計:   135分           │  ← totalMinutes
└─────────────────────────┘
```

---

## 実践例：完全なタスク管理アプリ

見やすい表示機能を持つ完全なタスク管理アプリを作ってみましょう。

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
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    h1 {
      color: #333;
    }
    .input-section {
      background-color: white;
      padding: 20px;
      margin: 20px 0;
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
    select {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      margin-left: 10px;
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
      padding: 15px;
      margin: 10px 0;
      border-radius: 8px;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .task-number {
      font-weight: bold;
      color: #666;
      margin-right: 15px;
      min-width: 30px;
      font-size: 18px;
    }
    .task-content {
      flex-grow: 1;
    }
    .task-title {
      font-size: 16px;
      color: #333;
      display: block;
      margin-bottom: 5px;
    }
    .task-priority {
      font-size: 12px;
      padding: 3px 8px;
      border-radius: 3px;
      display: inline-block;
    }
    .priority-high {
      background-color: #ffebee;
      color: #c62828;
    }
    .priority-medium {
      background-color: #fff3e0;
      color: #e65100;
    }
    .priority-low {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    .empty-message {
      text-align: center;
      color: #999;
      font-style: italic;
      padding: 40px;
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
  <h1>📋 タスク管理</h1>

  <div class="input-section">
    <input type="text" id="taskInput" placeholder="タスクを入力">
    <select id="prioritySelect">
      <option value="高">高</option>
      <option value="中" selected>中</option>
      <option value="低">低</option>
    </select>
    <button id="addButton">追加</button>
  </div>

  <div class="summary">
    <p>タスク数: <strong><span id="taskCount">0</span>件</strong></p>
  </div>

  <div id="taskList"></div>

  <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let tasks = [];

let taskInput = document.getElementById("taskInput");
let prioritySelect = document.getElementById("prioritySelect");
let addButton = document.getElementById("addButton");
let taskCount = document.getElementById("taskCount");
let taskList = document.getElementById("taskList");

addButton.addEventListener("click", function() {
  let title = taskInput.value.trim();
  let priority = prioritySelect.value;

  if (title === "") {
    alert("タスクを入力してください");
    return;
  }

  let task = {
    title: title,
    priority: priority
  };

  tasks.push(task);
  showTasks();

  taskInput.value = "";
  taskInput.focus();
});

taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

function showTasks() {
  taskList.replaceChildren();
  taskCount.textContent = tasks.length;

  if (tasks.length === 0) {
    let empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "まだタスクがありません";
    taskList.appendChild(empty);
    return;
  }

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let item = document.createElement("div");
    item.className = "task-item";

    // 番号
    let number = document.createElement("div");
    number.className = "task-number";
    number.textContent = "#" + (i + 1);

    // コンテンツ
    let content = document.createElement("div");
    content.className = "task-content";

    let title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    let priority = document.createElement("span");
    priority.className = "task-priority";

    // アイコンを追加
    let icon = "";
    if (task.priority === "高") {
      icon = "🔴 ";
      priority.classList.add("priority-high");
    } else if (task.priority === "中") {
      icon = "🟡 ";
      priority.classList.add("priority-medium");
    } else {
      icon = "🟢 ";
      priority.classList.add("priority-low");
    }

    priority.textContent = icon + task.priority;

    content.appendChild(title);
    content.appendChild(priority);

    item.appendChild(number);
    item.appendChild(content);

    taskList.appendChild(item);
  }
}

showTasks();
taskInput.focus();
```

### アプリケーションの動作フロー

```
初期表示:
┌─────────────────────────────────┐
│ 📋 タスク管理                   │
├─────────────────────────────────┤
│ [タスクを入力] [中 ▼] [追加]   │
├─────────────────────────────────┤
│ タスク数: 0件                   │
├─────────────────────────────────┤
│ まだタスクがありません          │
└─────────────────────────────────┘

ユーザー操作1:
  入力: "買い物"
  優先度: "高"
  [追加]ボタンクリック

処理:
  1. title = "買い物"
  2. priority = "高"
  3. task = { title: "買い物", priority: "高" }
  4. tasks.push(task)
     → tasks = [{ title: "買い物", priority: "高" }]
  5. showTasks()呼び出し

showTasks()の処理:
  taskList.replaceChildren()  // 表示をクリア
  taskCount.textContent = 1   // タスク数更新

  tasks.length === 0?
  → 1 === 0 → false
  → forループ実行

  i = 0:
    task = { title: "買い物", priority: "高" }

    number.textContent = "#1"
    title.textContent = "買い物"

    task.priority === "高" → true
    icon = "🔴 "
    priority.classList.add("priority-high")
    priority.textContent = "🔴 高"

    HTML構築して追加...

表示更新後:
┌─────────────────────────────────┐
│ 📋 タスク管理                   │
├─────────────────────────────────┤
│ [タスクを入力] [中 ▼] [追加]   │
├─────────────────────────────────┤
│ タスク数: 1件                   │
├─────────────────────────────────┤
│ #1  買い物                      │
│     🔴 高                       │
└─────────────────────────────────┘

ユーザー操作2:
  入力: "掃除"
  優先度: "中"
  [追加]ボタンクリック

処理:
  tasks = [
    { title: "買い物", priority: "高" },
    { title: "掃除", priority: "中" }
  ]
  showTasks()呼び出し

showTasks()の処理:
  taskCount.textContent = 2

  forループ:
    i = 0: #1 買い物 🔴 高
    i = 1: #2 掃除 🟡 中

最終表示:
┌─────────────────────────────────┐
│ 📋 タスク管理                   │
├─────────────────────────────────┤
│ [タスクを入力] [中 ▼] [追加]   │
├─────────────────────────────────┤
│ タスク数: 2件                   │
├─────────────────────────────────┤
│ #1  買い物                      │
│     🔴 高                       │
├─────────────────────────────────┤
│ #2  掃除                        │
│     🟡 中                       │
└─────────────────────────────────┘
```

### このコードのポイント

```
1. 構造化された表示
   ┌──────────────────────────┐
   │ task-item (div)          │
   │  ├─ task-number (div)    │  ← 番号
   │  └─ task-content (div)   │
   │      ├─ task-title       │  ← タイトル
   │      └─ task-priority    │  ← 優先度
   └──────────────────────────┘

2. CSSスタイリング
   - Flexboxで横並びレイアウト
   - box-shadowで立体感
   - border-radiusで角を丸く

3. 条件付きスタイル
   優先度に応じて:
   - アイコン変更 (🔴/🟡/🟢)
   - クラス追加 (priority-high/medium/low)
   - 色変更 (赤/オレンジ/緑)

4. アイコン使用
   - 絵文字で視覚的にわかりやすく
   - テキストより直感的

5. 空の状態
   - tasks.length === 0 で判定
   - "まだタスクがありません"と表示
   - returnで早期終了

6. 集計表示
   - taskCount.textContent = tasks.length
   - 常に最新のタスク数を表示
```

---

## 練習問題

「学習記録アプリ」を作成してください。

### 要件

1. 科目名と学習時間（分）を入力できる
2. 追加した記録を番号付きで表示
3. 科目名と学習時間を見やすく整形
4. 合計学習時間を表示
5. CSSで見やすくスタイリング

### ヒント

```javascript
let records = [];

let subjectInput = document.getElementById("subjectInput");
let minutesInput = document.getElementById("minutesInput");
let addButton = document.getElementById("addButton");
let totalElement = document.getElementById("total");
let container = document.getElementById("container");

addButton.addEventListener("click", function() {
  let subject = subjectInput.value.trim();
  let minutes = parseInt(minutesInput.value);

  // バリデーション
  if (subject === "" || isNaN(minutes) || minutes <= 0) {
    alert("正しく入力してください");
    return;
  }

  let record = {
    subject: subject,
    minutes: minutes
  };

  records.push(record);
  showRecords();

  subjectInput.value = "";
  minutesInput.value = "";
  subjectInput.focus();
});

function showRecords() {
  container.replaceChildren();

  let totalMinutes = 0;

  for (let i = 0; i < records.length; i++) {
    let record = records[i];
    totalMinutes += record.minutes;

    let div = document.createElement("div");
    div.className = "record-item";

    let number = document.createElement("span");
    number.className = "record-number";
    number.textContent = (i + 1) + ".";

    let subject = document.createElement("span");
    subject.className = "record-subject";
    subject.textContent = record.subject;

    let time = document.createElement("span");
    time.className = "record-time";
    time.textContent = record.minutes + "分";

    div.appendChild(number);
    div.appendChild(subject);
    div.appendChild(time);

    container.appendChild(div);
  }

  totalElement.textContent = totalMinutes + "分";
}
```

### 解答例の実行フロー

```
ユーザー操作1:
  科目: "数学"
  時間: "60"
  [追加]クリック

処理:
  subject = "数学"
  minutes = 60

  record = { subject: "数学", minutes: 60 }
  records.push(record)
  → records = [{ subject: "数学", minutes: 60 }]

  showRecords()呼び出し

showRecords()の処理:
  container.replaceChildren()
  totalMinutes = 0

  ループ1回目 (i = 0):
    record = { subject: "数学", minutes: 60 }
    totalMinutes += 60
    → totalMinutes = 60

    number.textContent = "1."
    subject.textContent = "数学"
    time.textContent = "60分"

  totalElement.textContent = "60分"

画面表示:
  1. 数学 60分
  ─────────────
  合計: 60分

ユーザー操作2:
  科目: "英語"
  時間: "45"
  [追加]クリック

処理:
  records = [
    { subject: "数学", minutes: 60 },
    { subject: "英語", minutes: 45 }
  ]

  showRecords()呼び出し

showRecords()の処理:
  totalMinutes = 0

  ループ1回目 (i = 0):
    totalMinutes = 0 + 60 = 60
    "1. 数学 60分"

  ループ2回目 (i = 1):
    totalMinutes = 60 + 45 = 105
    "2. 英語 45分"

  totalElement.textContent = "105分"

最終表示:
  1. 数学 60分
  2. 英語 45分
  ─────────────
  合計: 105分
```

### 追加課題

1. **長時間の記録を強調する**
   ```javascript
   if (record.minutes >= 60) {
     time.classList.add("long-study");
   }
   ```

2. **科目ごとに色を変える**
   ```javascript
   let colors = {
     "数学": "#e3f2fd",
     "英語": "#f3e5f5",
     "国語": "#e8f5e9"
   };

   if (colors[record.subject]) {
     div.style.backgroundColor = colors[record.subject];
   }
   ```

3. **時間を時間と分に変換**
   ```javascript
   let hours = Math.floor(totalMinutes / 60);
   let minutes = totalMinutes % 60;
   totalElement.textContent = hours + "時間" + minutes + "分";
   ```

---

## ケーススタディ1: ショッピングリストアプリ

商品を番号付きで表示し、合計金額を計算するアプリを作りましょう。

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

    let number = document.createElement("span");
    number.textContent = (i + 1) + ".";

    let name = document.createElement("span");
    name.textContent = item.name;

    let price = document.createElement("span");
    price.textContent = "¥" + item.price;

    div.appendChild(number);
    div.appendChild(name);
    div.appendChild(price);

    itemList.appendChild(div);
  }

  totalElement.textContent = "¥" + totalPrice;
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

ループ1回目 (i = 0):
  item = { name: "りんご", price: 150 }
  totalPrice += 150
  → totalPrice = 150

  表示: "1. りんご ¥150"

ループ2回目 (i = 1):
  item = { name: "バナナ", price: 100 }
  totalPrice += 100
  → totalPrice = 250

  表示: "2. バナナ ¥100"

ループ3回目 (i = 2):
  item = { name: "牛乳", price: 200 }
  totalPrice += 200
  → totalPrice = 450

  表示: "3. 牛乳 ¥200"

ループ終了後:
  totalElement.textContent = "¥450"

最終表示:
┌──────────────────────┐
│ 1. りんご   ¥150     │
│ 2. バナナ   ¥100     │
│ 3. 牛乳     ¥200     │
├──────────────────────┤
│ 合計:       ¥450     │
└──────────────────────┘
```

---

## ケーススタディ2: 出席管理アプリ

生徒の出席状況を色分けして表示するアプリを作りましょう。

```javascript
let students = [
  { name: "田中", status: "出席" },
  { name: "鈴木", status: "欠席" },
  { name: "佐藤", status: "遅刻" },
  { name: "高橋", status: "出席" }
];

function showStudents() {
  studentList.replaceChildren();

  let presentCount = 0;
  let absentCount = 0;
  let lateCount = 0;

  for (let i = 0; i < students.length; i++) {
    let student = students[i];

    // カウント
    if (student.status === "出席") {
      presentCount++;
    } else if (student.status === "欠席") {
      absentCount++;
    } else if (student.status === "遅刻") {
      lateCount++;
    }

    let div = document.createElement("div");
    div.className = "student-item";

    let number = document.createElement("span");
    number.textContent = (i + 1) + ".";

    let name = document.createElement("span");
    name.textContent = student.name;

    let status = document.createElement("span");
    status.className = "status";
    status.textContent = student.status;

    // 状態に応じてクラスを追加
    if (student.status === "出席") {
      status.classList.add("status-present");
    } else if (student.status === "欠席") {
      status.classList.add("status-absent");
    } else if (student.status === "遅刻") {
      status.classList.add("status-late");
    }

    div.appendChild(number);
    div.appendChild(name);
    div.appendChild(status);

    studentList.appendChild(div);
  }

  // 集計結果を表示
  summaryElement.textContent =
    `出席: ${presentCount}人 / 欠席: ${absentCount}人 / 遅刻: ${lateCount}人`;
}
```

**実行フロー:**

```
初期状態:
students = [
  { name: "田中", status: "出席" },
  { name: "鈴木", status: "欠席" },
  { name: "佐藤", status: "遅刻" },
  { name: "高橋", status: "出席" }
]

showStudents()呼び出し:
  presentCount = 0
  absentCount = 0
  lateCount = 0

ループ1回目 (i = 0):
  student = { name: "田中", status: "出席" }

  student.status === "出席" → true
  presentCount++
  → presentCount = 1

  status.textContent = "出席"
  status.classList.add("status-present")

  表示: "1. 田中 [出席]" (緑の背景)

ループ2回目 (i = 1):
  student = { name: "鈴木", status: "欠席" }

  student.status === "出席" → false
  student.status === "欠席" → true
  absentCount++
  → absentCount = 1

  status.classList.add("status-absent")

  表示: "2. 鈴木 [欠席]" (赤の背景)

ループ3回目 (i = 2):
  student = { name: "佐藤", status: "遅刻" }

  student.status === "出席" → false
  student.status === "欠席" → false
  student.status === "遅刻" → true
  lateCount++
  → lateCount = 1

  status.classList.add("status-late")

  表示: "3. 佐藤 [遅刻]" (オレンジの背景)

ループ4回目 (i = 3):
  student = { name: "高橋", status: "出席" }

  presentCount++
  → presentCount = 2

  表示: "4. 高橋 [出席]" (緑の背景)

ループ終了後:
  summaryElement.textContent = "出席: 2人 / 欠席: 1人 / 遅刻: 1人"

最終表示:
┌──────────────────────────┐
│ 1. 田中 [ 出席 ]         │  ← 緑
│ 2. 鈴木 [ 欠席 ]         │  ← 赤
│ 3. 佐藤 [ 遅刻 ]         │  ← オレンジ
│ 4. 高橋 [ 出席 ]         │  ← 緑
├──────────────────────────┤
│ 出席: 2人 / 欠席: 1人 /  │
│ 遅刻: 1人                │
└──────────────────────────┘
```

**対応するCSS:**

```css
.status {
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 12px;
}

.status-present {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-absent {
  background-color: #ffebee;
  color: #c62828;
}

.status-late {
  background-color: #fff3e0;
  color: #e65100;
}
```

---

## ケーススタディ3: レビュー評価アプリ

星評価と件数を表示するアプリを作りましょう。

```javascript
let reviews = [
  { product: "商品A", rating: 5 },
  { product: "商品B", rating: 4 },
  { product: "商品C", rating: 3 },
  { product: "商品D", rating: 5 },
  { product: "商品E", rating: 4 }
];

function showReviews() {
  reviewList.replaceChildren();

  let totalRating = 0;

  for (let i = 0; i < reviews.length; i++) {
    let review = reviews[i];
    totalRating += review.rating;

    let div = document.createElement("div");
    div.className = "review-item";

    let number = document.createElement("span");
    number.textContent = (i + 1) + ".";

    let product = document.createElement("span");
    product.textContent = review.product;

    let stars = document.createElement("span");
    stars.className = "stars";

    // 星を作成
    let starText = "";
    for (let j = 0; j < review.rating; j++) {
      starText += "★";
    }
    for (let j = review.rating; j < 5; j++) {
      starText += "☆";
    }
    stars.textContent = starText;

    div.appendChild(number);
    div.appendChild(product);
    div.appendChild(stars);

    reviewList.appendChild(div);
  }

  // 平均評価を計算
  let average = totalRating / reviews.length;
  averageElement.textContent = average.toFixed(1) + " / 5.0";
}
```

**実行フロー:**

```
初期状態:
reviews = [
  { product: "商品A", rating: 5 },
  { product: "商品B", rating: 4 }
]

showReviews()呼び出し:
  totalRating = 0

ループ1回目 (i = 0):
  review = { product: "商品A", rating: 5 }
  totalRating += 5
  → totalRating = 5

  星の作成:
    j = 0: starText = "★"
    j = 1: starText = "★★"
    j = 2: starText = "★★★"
    j = 3: starText = "★★★★"
    j = 4: starText = "★★★★★"
    (5 < 5 は false なので☆は追加されない)

  stars.textContent = "★★★★★"

  表示: "1. 商品A ★★★★★"

ループ2回目 (i = 1):
  review = { product: "商品B", rating: 4 }
  totalRating += 4
  → totalRating = 9

  星の作成:
    j = 0~3: starText = "★★★★"
    j = 4: starText = "★★★★☆"

  stars.textContent = "★★★★☆"

  表示: "2. 商品B ★★★★☆"

ループ終了後:
  average = 9 / 2 = 4.5
  averageElement.textContent = "4.5 / 5.0"

最終表示:
┌────────────────────────────┐
│ 1. 商品A ★★★★★          │
│ 2. 商品B ★★★★☆          │
├────────────────────────────┤
│ 平均評価: 4.5 / 5.0        │
└────────────────────────────┘
```

**星の生成ロジック:**

```
rating = 3 の場合:

filled stars (★):
  j = 0: starText = "★"
  j = 1: starText = "★★"
  j = 2: starText = "★★★"
  j = 3: 3 < 3 は false → ループ終了

empty stars (☆):
  j = 3: starText = "★★★☆"
  j = 4: starText = "★★★☆☆"
  j = 5: 5 < 5 は false → ループ終了

結果: "★★★☆☆"
```

---

## まとめ

今回は、タスクを見やすく表示する方法を学びました：

### 重要なポイント

```
1. 番号付き表示
   ┌────────────────────────┐
   │ forループのインデックス │
   │ (i + 1) で1から開始    │
   │ for...ofでは不可       │
   └────────────────────────┘

2. 構造化された表示
   ┌────────────────────────┐
   │ 複数の要素に分割       │
   │ CSSで個別スタイル可能  │
   │ 柔軟なレイアウト       │
   └────────────────────────┘

3. CSSスタイリング
   ┌────────────────────────┐
   │ Flexboxでレイアウト    │
   │ border-radiusで角丸    │
   │ box-shadowで立体感     │
   └────────────────────────┘

4. 条件付きスタイル
   ┌────────────────────────┐
   │ データに応じてクラス追加│
   │ if文で条件分岐         │
   │ 色やアイコンを変更     │
   └────────────────────────┘

5. 空の状態
   ┌────────────────────────┐
   │ length === 0 で判定    │
   │ 適切なメッセージ表示   │
   │ returnで早期終了       │
   └────────────────────────┘

6. 集計表示
   ┌────────────────────────┐
   │ ループ内で累積         │
   │ totalMinutes += n      │
   │ length, 平均, 合計     │
   └────────────────────────┘
```

### 実用的なパターン

```javascript
// パターン1: 基本的な番号付き表示
for (let i = 0; i < items.length; i++) {
  let item = items[i];
  li.textContent = (i + 1) + ". " + item;
}

// パターン2: 構造化された表示
let number = document.createElement("span");
number.className = "number";
number.textContent = (i + 1);

let text = document.createElement("span");
text.className = "text";
text.textContent = item.title;

div.appendChild(number);
div.appendChild(text);

// パターン3: 条件付きスタイル
if (item.priority === "高") {
  div.classList.add("priority-high");
}

// パターン4: 空の状態
if (items.length === 0) {
  let empty = document.createElement("p");
  empty.textContent = "まだアイテムがありません";
  container.appendChild(empty);
  return;
}

// パターン5: 集計
let total = 0;
for (let item of items) {
  total += item.value;
}
totalElement.textContent = total;
```

### UIデザインの原則

```
見やすい表示の要素:

1. 適切な余白
   - padding で内側の余白
   - margin で外側の余白

2. 視覚的な階層
   - font-size で重要度を表現
   - font-weight で強調

3. 色の使い分け
   - 重要度に応じた色
   - 交互に背景色を変える

4. アイコンの活用
   - 絵文字で直感的に
   - 文字より理解しやすい

5. 整列とグリッド
   - Flexbox で整列
   - min-width で幅を固定
```

見やすい表示は、ユーザー体験を大きく向上させます。情報を適切に整理し、CSSでスタイリングすることで、使いやすいアプリケーションが作れます。

次のレッスンでは、タスクの削除機能について学びます。

---

## カリキュラム要件チェック

このレッスンで以下の要件を満たしています：

✅ **番号付きで表示**: forループのインデックスを使った番号表示を詳しく解説
✅ **見やすく整形**: 構造化された表示方法とFlexboxレイアウトを学習
✅ **CSSでスタイル**: 実践的なCSSスタイリング技法を習得
✅ **【知識】リスト表示、UIデザイン**: 番号付きリスト、構造化、条件付きスタイル、空の状態、集計表示、アイコン活用など包括的に学習
✅ **成果物：TODO表示機能**: 完全なタスク管理アプリで実装を完成

---

## 次回予告

次回のレッスン103では、**タスクの削除機能**を学びます：

- 削除ボタンの追加方法
- 配列から要素を削除する`splice()`メソッド
- インデックス管理の重要性
- 削除後の表示更新

タスクの追加と表示ができるようになったので、次は削除機能を実装して、完全なCRUD操作を習得しましょう！
