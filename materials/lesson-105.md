---
title: "状態管理"
lesson: 105
description: "オブジェクト配列で状態（完了/未完了）を管理し、チェックボックスで切り替える方法を学びます"
objectives:
  - "オブジェクトのプロパティで状態を管理できる"
  - "チェックボックスの状態とデータを同期できる"
  - "状態の切り替え処理（トグル）を実装できる"
duration: 30
date: 2025-11-26
---

# レッスン105: 状態管理

## このレッスンで学ぶこと

### 前回の復習

前回のレッスン104では、**オブジェクト配列**を学びました：

```javascript
// オブジェクト配列での管理
let tasks = [
  { id: 1, text: "買い物" },
  { id: 2, text: "掃除" }
];

// プロパティアクセス
tasks[0].text  // "買い物"
tasks[0].id    // 1
```

今回は、オブジェクトに**状態**を表すプロパティを追加して、完了/未完了を管理する方法を学びます。

### よくある場面

TODOアプリを使っていて、こんな経験はありませんか？

**場面1：タスクを完了にしたい**
```
やることリスト：
□ 買い物に行く
□ 掃除をする
□ メールを送る

↓ 買い物が終わったので完了にする

✓ 買い物に行く  ← チェックを入れる
□ 掃除をする
□ メールを送る
```

**場面2：完了したタスクは見た目を変えたい**
```
✓ 買い物に行く  ← グレー表示、取り消し線
□ 掃除をする
□ メールを送る
```

**場面3：間違えてチェックしたら戻したい**
```
✓ 買い物に行く  ← もう一度クリックすると未完了に戻る
□ 掃除をする
```

このように、**タスクの状態を管理して切り替える**機能は、どのTODOアプリにも必要不可欠な機能です。

### 学習目標

このレッスンでは、以下のスキルを身につけます：

1. **オブジェクトに状態プロパティを追加する**方法（`completed: false`）
2. **チェックボックスを作成して状態と同期する**方法（`checkbox.checked = task.completed`）
3. **状態を切り替える（トグル処理）**方法（`task.completed = !task.completed`）
4. **状態に応じて見た目を変える**方法（取り消し線、グレー表示）

---

## 1. 状態とは何か

### 状態の概念

**状態（state）**とは、データが持つ「今の様子」を表す情報です。

```javascript
// タスクオブジェクトに状態を追加
let task = {
  id: 1,
  text: "買い物に行く",
  completed: false  // ← これが「状態」を表すプロパティ
};
```

**状態の特徴**：
- 時間とともに**変化する**情報
- `true`/`false`のboolean型で表すことが多い
- ユーザーの操作で切り替わる

### よく使われる状態の例

```javascript
// 完了/未完了
{ completed: false }  // 未完了
{ completed: true }   // 完了

// 表示/非表示
{ visible: true }     // 表示中
{ visible: false }    // 非表示

// 有効/無効
{ enabled: true }     // 有効
{ enabled: false }    // 無効

// 選択中/非選択
{ selected: false }   // 非選択
{ selected: true }    // 選択中

// お気に入り
{ favorite: false }   // 通常
{ favorite: true }    // お気に入り
```

### 状態管理の基本パターン

```
┌─────────────────────────────────────┐
│ 状態管理の3ステップ                    │
├─────────────────────────────────────┤
│ 1. データに状態を保存                  │
│    { id: 1, text: "買い物", completed: false }
│                                     │
│ 2. 画面に状態を反映                   │
│    checkbox.checked = task.completed │
│                                     │
│ 3. ユーザー操作で状態を更新            │
│    task.completed = !task.completed  │
│    ↓                                │
│    画面を再表示                       │
└─────────────────────────────────────┘
```

---

## 2. タスクオブジェクトに状態を追加

### completedプロパティの追加

タスクオブジェクトに`completed`プロパティを追加します。

```javascript
// 状態を持つタスクオブジェクト
let tasks = [
  { id: 1, text: "買い物に行く", completed: false },
  { id: 2, text: "掃除をする", completed: false },
  { id: 3, text: "メールを送る", completed: true }
];
```

**実行の流れ**：
```
ステップ1: tasksという名前の変数を作る
  tasks → undefined

ステップ2: 配列を作成して代入
  tasks → [...]（配列）

ステップ3: 配列の要素を確認
  tasks[0] → { id: 1, text: "買い物に行く", completed: false }
  tasks[1] → { id: 2, text: "掃除をする", completed: false }
  tasks[2] → { id: 3, text: "メールを送る", completed: true }

ステップ4: プロパティアクセス
  tasks[0].completed → false（未完了）
  tasks[2].completed → true（完了済み）
```

### タスク追加時の処理

新しいタスクを追加するときは、`completed`を`false`に初期化します。

```javascript
let tasks = [];
let nextId = 1;

let addButton = document.getElementById("addButton");
let todoInput = document.getElementById("todoInput");

addButton.addEventListener("click", function() {
  let text = todoInput.value.trim();

  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  // 新しいタスクオブジェクトを作成
  let newTask = {
    id: nextId,
    text: text,
    completed: false  // 最初は必ず未完了
  };

  tasks.push(newTask);
  nextId++;

  todoInput.value = "";
  showTasks();
});
```

**実行の流れ（"買い物"を追加する場合）**：
```
初期状態:
  tasks = []
  nextId = 1
  text = ""

ユーザーが入力欄に「買い物」と入力してボタンをクリック
  ↓
addEventListener内の関数が実行される
  ↓
ステップ1: 入力値を取得してtrim
  text = todoInput.value.trim()
  text → "買い物"

ステップ2: 空チェック
  if (text === "")  → false（空ではない）
  通過

ステップ3: 新しいオブジェクトを作成
  newTask = {
    id: nextId,        → id: 1
    text: text,        → text: "買い物"
    completed: false   → completed: false
  }

  newTask → { id: 1, text: "買い物", completed: false }

ステップ4: 配列に追加
  tasks.push(newTask)
  tasks → [{ id: 1, text: "買い物", completed: false }]

ステップ5: IDをインクリメント
  nextId++
  nextId → 2

ステップ6: 入力欄をクリア
  todoInput.value = ""

ステップ7: 画面を更新
  showTasks()が呼ばれる
```

### データ構造の図解

```
tasks配列のメモリイメージ:

tasks → ┌──────────┐
        │ 配列     │
        ├──────────┤
        │ [0] ──→ { id: 1, text: "買い物に行く", completed: false }
        │ [1] ──→ { id: 2, text: "掃除をする", completed: false }
        │ [2] ──→ { id: 3, text: "メールを送る", completed: true }
        └──────────┘

各オブジェクトの構造:
┌─────────────────────────────────┐
│ id: 1                           │
│ text: "買い物に行く"              │
│ completed: false  ← 状態プロパティ │
└─────────────────────────────────┘
```

---

## 3. チェックボックスの作成と状態の同期

### チェックボックスの基本

HTMLのチェックボックスは、`<input type="checkbox">`で作成します。

```javascript
// チェックボックスの作成
let checkbox = document.createElement("input");
checkbox.type = "checkbox";

// チェック状態の設定
checkbox.checked = true;   // チェック済み（✓）
checkbox.checked = false;  // 未チェック（□）
```

### タスク表示時にチェックボックスを追加

タスクを表示する際に、各タスクにチェックボックスを作成します。

```javascript
function showTasks() {
  let taskList = document.getElementById("taskList");
  taskList.replaceChildren();  // 既存の要素をクリア

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    // タスク全体を囲むdiv
    let item = document.createElement("div");
    item.className = "task-item";

    // チェックボックスを作成
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;  // データの状態を反映

    // テキストを作成
    let textSpan = document.createElement("span");
    textSpan.textContent = task.text;

    // 要素を組み立て
    item.appendChild(checkbox);
    item.appendChild(textSpan);
    taskList.appendChild(item);
  }
}
```

**実行の流れ（3つのタスクがある場合）**：
```
前提:
  tasks = [
    { id: 1, text: "買い物に行く", completed: false },
    { id: 2, text: "掃除をする", completed: false },
    { id: 3, text: "メールを送る", completed: true }
  ]

showTasks()が呼ばれる
  ↓
ステップ1: taskListを取得
  taskList → <div id="taskList">...</div>

ステップ2: 既存の内容をクリア
  taskList.replaceChildren()
  taskList → <div id="taskList"></div>（空）

ステップ3: ループ開始（i = 0）
  task = tasks[0] → { id: 1, text: "買い物に行く", completed: false }

  item = <div class="task-item"></div>

  checkbox = <input type="checkbox">
  checkbox.checked = task.completed → checkbox.checked = false
  （チェックボックスは未チェック状態）

  textSpan = <span>買い物に行く</span>

  item.appendChild(checkbox)
  item → <div class="task-item">
           <input type="checkbox">
         </div>

  item.appendChild(textSpan)
  item → <div class="task-item">
           <input type="checkbox">
           <span>買い物に行く</span>
         </div>

  taskList.appendChild(item)
  taskList → <div id="taskList">
               <div class="task-item">
                 <input type="checkbox">
                 <span>買い物に行く</span>
               </div>
             </div>

ステップ4: ループ継続（i = 1）
  task = tasks[1] → { id: 2, text: "掃除をする", completed: false }

  （同様の処理で追加）

ステップ5: ループ継続（i = 2）
  task = tasks[2] → { id: 3, text: "メールを送る", completed: true }

  checkbox.checked = task.completed → checkbox.checked = true
  （このチェックボックスはチェック済み状態）

  （同様の処理で追加）

ステップ6: ループ終了（i = 3, i < tasks.lengthがfalse）

最終的なHTML:
  <div id="taskList">
    <div class="task-item">
      <input type="checkbox">        ← チェックなし
      <span>買い物に行く</span>
    </div>
    <div class="task-item">
      <input type="checkbox">        ← チェックなし
      <span>掃除をする</span>
    </div>
    <div class="task-item">
      <input type="checkbox" checked> ← チェックあり
      <span>メールを送る</span>
    </div>
  </div>
```

### データと画面の同期の図解

```
データ層（JavaScript）         画面層（HTML）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
tasks[0].completed = false → checkbox.checked = false → □
tasks[1].completed = false → checkbox.checked = false → □
tasks[2].completed = true  → checkbox.checked = true  → ✓

同期の流れ:
┌──────────────┐
│ データ       │
│ completed    │
└───────┬──────┘
        │
        ↓ checkbox.checked = task.completed
        │
┌───────┴──────┐
│ 画面         │
│ checkbox     │
└──────────────┘
```

---

## 4. 状態の切り替え（トグル処理）

### トグル処理とは

**トグル（toggle）**とは、状態を反転させる処理のことです。

```javascript
// トグル処理の例
false → true   // 未完了 → 完了
true  → false  // 完了 → 未完了
```

### !演算子による状態反転

JavaScriptでは、`!`演算子（論理否定演算子）を使って状態を反転できます。

```javascript
let completed = false;

completed = !completed;  // false → true
console.log(completed);  // true

completed = !completed;  // true → false
console.log(completed);  // false
```

**実行の流れ**：
```
初期状態:
  completed = false

ステップ1: !completed を評価
  !false → true

ステップ2: 代入
  completed = true
  completed → true

ステップ3: 再度トグル
  !true → false
  completed = false
  completed → false
```

### チェックボックスのクリックイベント

チェックボックスがクリックされたときに、タスクの状態を切り替えます。

```javascript
function showTasks() {
  let taskList = document.getElementById("taskList");
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let item = document.createElement("div");
    item.className = "task-item";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    // チェックボックスがクリックされたとき
    checkbox.addEventListener("click", function() {
      // 状態を反転
      task.completed = !task.completed;
      // 画面を再表示
      showTasks();
    });

    let textSpan = document.createElement("span");
    textSpan.textContent = task.text;

    item.appendChild(checkbox);
    item.appendChild(textSpan);
    taskList.appendChild(item);
  }
}
```

**実行の流れ（ユーザーが最初のチェックボックスをクリックした場合）**：
```
前提:
  tasks[0] = { id: 1, text: "買い物に行く", completed: false }

ユーザーがチェックボックスをクリック
  ↓
clickイベントが発火
  ↓
addEventListener内の関数が実行される
  ↓
ステップ1: 現在の状態を確認
  task.completed → false

ステップ2: 状態を反転
  task.completed = !task.completed
  task.completed = !false
  task.completed = true

  tasks[0] → { id: 1, text: "買い物に行く", completed: true }

ステップ3: 画面を再表示
  showTasks()が呼ばれる
  ↓
  再度ループが実行される
  ↓
  tasks[0].completed → true
  checkbox.checked = true（チェック状態になる）
```

### トグル処理の詳細な流れ

```
クリック前のデータ:
tasks[0] = { id: 1, text: "買い物に行く", completed: false }

画面の状態:
□ 買い物に行く

ユーザーがクリック
  ↓
┌─────────────────────────────────────┐
│ イベントハンドラ内の処理              │
├─────────────────────────────────────┤
│ 1. 現在の状態を取得                   │
│    task.completed → false            │
│                                     │
│ 2. !演算子で反転                     │
│    !false → true                    │
│                                     │
│ 3. データに保存                       │
│    task.completed = true             │
│                                     │
│ 4. showTasks()を呼んで再表示         │
│    ↓                                │
│    checkbox.checked = task.completed │
│    checkbox.checked = true           │
└─────────────────────────────────────┘

クリック後のデータ:
tasks[0] = { id: 1, text: "買い物に行く", completed: true }

画面の状態:
✓ 買い物に行く
```

### クロージャでtaskを記憶

重要なポイント：`addEventListener`内の関数は、その時の`task`を**クロージャ**として記憶します。

```javascript
for (let i = 0; i < tasks.length; i++) {
  let task = tasks[i];  // ← この変数がクロージャで保存される

  checkbox.addEventListener("click", function() {
    task.completed = !task.completed;  // 正しいtaskにアクセスできる
    showTasks();
  });
}
```

**クロージャの仕組み**：
```
ループ1回目（i = 0）:
  task = tasks[0]
  ↓
  イベントリスナーが作成される
  この関数は「tasks[0]」を記憶している

ループ2回目（i = 1）:
  task = tasks[1]
  ↓
  別のイベントリスナーが作成される
  この関数は「tasks[1]」を記憶している

ループ3回目（i = 2）:
  task = tasks[2]
  ↓
  さらに別のイベントリスナーが作成される
  この関数は「tasks[2]」を記憶している

結果:
  各チェックボックスは、自分に対応するtaskを正しく操作できる
```

---

## 5. 完了済みタスクの見た目を変える

### 条件付きでクラスを追加

完了済みのタスクには、見た目を変えるためのクラスを追加します。

```javascript
function showTasks() {
  let taskList = document.getElementById("taskList");
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let item = document.createElement("div");
    item.className = "task-item";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("click", function() {
      task.completed = !task.completed;
      showTasks();
    });

    let textSpan = document.createElement("span");
    textSpan.textContent = task.text;

    // 完了済みの場合、completedクラスを追加
    if (task.completed) {
      textSpan.classList.add("completed");
    }

    item.appendChild(checkbox);
    item.appendChild(textSpan);
    taskList.appendChild(item);
  }
}
```

**実行の流れ**：
```
タスクが未完了の場合:
  task.completed → false

  if (task.completed) → if (false) → 条件がfalse
  classList.add("completed")は実行されない

  textSpan → <span>買い物に行く</span>

タスクが完了済みの場合:
  task.completed → true

  if (task.completed) → if (true) → 条件がtrue
  textSpan.classList.add("completed")が実行される

  textSpan → <span class="completed">メールを送る</span>
```

### CSSでスタイルを設定

完了済みタスクに取り消し線とグレー表示を適用します。

```css
.completed {
  text-decoration: line-through;  /* 取り消し線 */
  color: #999;                     /* 灰色 */
  opacity: 0.6;                    /* 少し透明に */
}
```

### データ → 条件分岐 → スタイルの流れ

```
データの状態
  ↓
┌──────────────────────────────────┐
│ task.completed の値で分岐         │
├──────────────────────────────────┤
│ completed = false の場合:        │
│   classなし                      │
│   → 通常表示                     │
│                                  │
│ completed = true の場合:         │
│   class="completed"を追加        │
│   → 取り消し線、グレー表示        │
└──────────────────────────────────┘
  ↓
画面の見た目

具体例:
┌─────────────────────────────────┐
│ □ 買い物に行く                   │  completed: false
│   （通常表示）                   │  クラスなし
├─────────────────────────────────┤
│ ✓ 掃除をする                     │  completed: true
│   （グレー、取り消し線）           │  class="completed"
└─────────────────────────────────┘
```

---

## 6. 削除機能とデータの整合性

### タスク削除時の注意点

オブジェクト配列では、削除は簡単です。該当するオブジェクトを配列から削除するだけです。

```javascript
function showTasks() {
  let taskList = document.getElementById("taskList");
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let item = document.createElement("div");
    item.className = "task-item";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("click", function() {
      task.completed = !task.completed;
      showTasks();
    });

    let textSpan = document.createElement("span");
    textSpan.textContent = task.text;

    if (task.completed) {
      textSpan.classList.add("completed");
    }

    // 削除ボタン
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function() {
      if (confirm("「" + task.text + "」を削除しますか？")) {
        // 配列からこのタスクを削除
        tasks.splice(i, 1);
        showTasks();
      }
    });

    item.appendChild(checkbox);
    item.appendChild(textSpan);
    item.appendChild(deleteButton);
    taskList.appendChild(item);
  }
}
```

**実行の流れ（2番目のタスクを削除する場合）**：
```
前提:
  tasks = [
    { id: 1, text: "買い物に行く", completed: false },
    { id: 2, text: "掃除をする", completed: true },
    { id: 3, text: "メールを送る", completed: false }
  ]

ユーザーが2番目のタスクの削除ボタンをクリック
  ↓
ステップ1: 確認ダイアログ表示
  confirm("「掃除をする」を削除しますか？")
  ユーザーが「OK」をクリック → trueが返る

ステップ2: 配列から削除（i = 1）
  tasks.splice(1, 1)

  tasks → [
    { id: 1, text: "買い物に行く", completed: false },
    { id: 3, text: "メールを送る", completed: false }
  ]

ステップ3: 画面を再表示
  showTasks()が呼ばれる
  → 残った2つのタスクだけが表示される
```

### IDベースの削除（より安全な方法）

インデックスではなくIDで削除する方が、データの整合性が保たれます。

```javascript
function deleteTaskById(id) {
  // IDに一致するタスクのインデックスを探す
  let index = tasks.findIndex(function(task) {
    return task.id === id;
  });

  if (index !== -1) {
    tasks.splice(index, 1);
    showTasks();
  }
}

// 使い方
deleteButton.addEventListener("click", function() {
  if (confirm("「" + task.text + "」を削除しますか？")) {
    deleteTaskById(task.id);
  }
});
```

**実行の流れ**：
```
deleteTaskById(2)を呼び出す
  ↓
ステップ1: findIndexでIDが2のタスクを探す
  tasks.findIndex(function(task) {
    return task.id === id;
  })

  ループ1回目: task = { id: 1, ... }
    task.id === 2 → 1 === 2 → false

  ループ2回目: task = { id: 2, ... }
    task.id === 2 → 2 === 2 → true ← ここでインデックス1を返す

  index → 1

ステップ2: 見つかったかチェック
  if (index !== -1) → if (1 !== -1) → true

ステップ3: 削除
  tasks.splice(1, 1)
  該当するタスクが削除される

ステップ4: 再表示
  showTasks()
```

---

## 7. 実践例：完全なTODOアプリ

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TODOアプリ - 状態管理</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>📝 TODOアプリ</h1>

    <div class="input-area">
      <input type="text" id="todoInput" placeholder="新しいタスクを入力">
      <button id="addButton">追加</button>
    </div>

    <div id="taskList"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### CSS

```css
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  margin: 0;
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

h1 {
  margin: 0 0 20px 0;
  color: #333;
  text-align: center;
}

.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

#todoInput {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

#todoInput:focus {
  outline: none;
  border-color: #667eea;
}

#addButton {
  padding: 12px 24px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s;
}

#addButton:hover {
  background-color: #5568d3;
}

#taskList {
  margin-top: 20px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.task-item:hover {
  background-color: #f9f9f9;
}

.task-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.task-item span {
  flex: 1;
  font-size: 14px;
  color: #333;
  transition: all 0.3s;
}

.completed {
  text-decoration: line-through;
  color: #999;
  opacity: 0.6;
}

.delete-button {
  padding: 6px 12px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #dc2626;
}
```

### JavaScript（完全版）

```javascript
// タスクデータをオブジェクト配列で管理
let tasks = [];
let nextId = 1;

// 要素を取得
let todoInput = document.getElementById("todoInput");
let addButton = document.getElementById("addButton");
let taskList = document.getElementById("taskList");

// タスクを追加
addButton.addEventListener("click", function() {
  addTask();
});

// Enterキーでも追加
todoInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// タスク追加の処理
function addTask() {
  let text = todoInput.value.trim();

  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  // 新しいタスクオブジェクトを作成
  let newTask = {
    id: nextId,
    text: text,
    completed: false  // 最初は必ず未完了
  };

  tasks.push(newTask);
  nextId++;

  todoInput.value = "";
  todoInput.focus();
  showTasks();
}

// タスクを表示
function showTasks() {
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    // タスク全体のコンテナ
    let item = document.createElement("div");
    item.className = "task-item";

    // チェックボックス
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    // チェックボックスがクリックされたら状態をトグル
    checkbox.addEventListener("click", function() {
      task.completed = !task.completed;
      showTasks();
    });

    // タスクのテキスト
    let textSpan = document.createElement("span");
    textSpan.textContent = task.text;

    // 完了済みの場合はクラスを追加
    if (task.completed) {
      textSpan.classList.add("completed");
    }

    // 削除ボタン
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function() {
      if (confirm("「" + task.text + "」を削除しますか？")) {
        tasks.splice(i, 1);
        showTasks();
      }
    });

    // 要素を組み立て
    item.appendChild(checkbox);
    item.appendChild(textSpan);
    item.appendChild(deleteButton);
    taskList.appendChild(item);
  }
}

// 初期表示
showTasks();
```

---

## 8. よくある場面での応用

### 応用例1：お気に入り機能

```javascript
// タスクにfavoriteプロパティを追加
let task = {
  id: 1,
  text: "買い物に行く",
  completed: false,
  favorite: false  // お気に入り状態
};

// お気に入りボタン
let favoriteButton = document.createElement("button");
favoriteButton.textContent = task.favorite ? "★" : "☆";

favoriteButton.addEventListener("click", function() {
  task.favorite = !task.favorite;  // トグル
  showTasks();
});
```

### 応用例2：優先度の切り替え

```javascript
// 優先度を3段階で管理
let task = {
  id: 1,
  text: "買い物に行く",
  priority: 0  // 0:低, 1:中, 2:高
};

// 優先度ボタン
let priorityButton = document.createElement("button");
let priorityLabels = ["低", "中", "高"];
priorityButton.textContent = priorityLabels[task.priority];

priorityButton.addEventListener("click", function() {
  task.priority = (task.priority + 1) % 3;  // 0→1→2→0と循環
  showTasks();
});
```

**実行の流れ**：
```
初期状態: task.priority = 0（低）
クリック1回目:
  (0 + 1) % 3 = 1 % 3 = 1  → 中

クリック2回目:
  (1 + 1) % 3 = 2 % 3 = 2  → 高

クリック3回目:
  (2 + 1) % 3 = 3 % 3 = 0  → 低（循環）
```

### 応用例3：編集モードの切り替え

```javascript
let task = {
  id: 1,
  text: "買い物に行く",
  editing: false  // 編集モード状態
};

// 編集ボタン
let editButton = document.createElement("button");
editButton.textContent = "編集";

editButton.addEventListener("click", function() {
  task.editing = !task.editing;
  showTasks();
});

// 表示時に編集モードかどうかで分岐
if (task.editing) {
  // 編集モード: 入力欄を表示
  let editInput = document.createElement("input");
  editInput.value = task.text;
  item.appendChild(editInput);
} else {
  // 通常モード: テキストを表示
  let textSpan = document.createElement("span");
  textSpan.textContent = task.text;
  item.appendChild(textSpan);
}
```

---

## 9. 練習問題

### 練習問題1：読書リストアプリ

読書リストアプリを作成してください。

**要件**：
1. 本のタイトルを入力して追加できる
2. 各本にチェックボックスがある（読了/未読）
3. チェックボックスで読了状態を切り替えられる
4. 読了済みの本はグレー表示＋取り消し線
5. 削除ボタンで本を削除できる

**データ構造のヒント**：
```javascript
let books = [
  { id: 1, title: "ハリー・ポッター", completed: false },
  { id: 2, title: "星の王子さま", completed: true }
];
```

**実装のヒント**：
```javascript
// チェックボックスのトグル
checkbox.addEventListener("click", function() {
  book.completed = !book.completed;
  showBooks();
});

// 完了済みの見た目
if (book.completed) {
  textSpan.classList.add("completed");
}
```

---

### 練習問題2：買い物リストアプリ

買い物リストアプリに「購入済み」機能を追加してください。

**要件**：
1. 商品名を入力して追加できる
2. 各商品にチェックボックス（購入済み/未購入）
3. チェックで購入済みに変更
4. 購入済みの商品は薄く表示
5. 削除機能

**追加課題**：
- 購入済みの商品数を表示する
- 全商品数と購入済み数を「3/5 購入済み」のように表示

**ヒント**：
```javascript
// 購入済み数を数える
let purchasedCount = 0;
for (let i = 0; i < items.length; i++) {
  if (items[i].completed) {
    purchasedCount++;
  }
}

// 表示
let status = document.createElement("div");
status.textContent = purchasedCount + "/" + items.length + " 購入済み";
```

---

### 練習問題3：お気に入り機能付きTODO

TODOアプリに「お気に入り」機能を追加してください。

**要件**：
1. 各タスクに星ボタンを追加
2. クリックでお気に入りのオン/オフを切り替え
3. お気に入りのタスクは星が塗りつぶされる（★）
4. お気に入りでないタスクは星が白抜き（☆）

**データ構造**：
```javascript
let task = {
  id: 1,
  text: "買い物に行く",
  completed: false,
  favorite: false  // お気に入り状態
};
```

**実装のヒント**：
```javascript
let favoriteButton = document.createElement("button");
favoriteButton.textContent = task.favorite ? "★" : "☆";

favoriteButton.addEventListener("click", function() {
  task.favorite = !task.favorite;
  showTasks();
});
```

---

## まとめ

### このレッスンで学んだこと

1. **状態プロパティの追加**
   ```javascript
   { id: 1, text: "買い物", completed: false }
   ```
   オブジェクトに`completed`プロパティを追加して状態を管理

2. **チェックボックスの作成と同期**
   ```javascript
   checkbox.type = "checkbox";
   checkbox.checked = task.completed;  // データと同期
   ```

3. **トグル処理**
   ```javascript
   task.completed = !task.completed;  // 状態を反転
   showTasks();  // 画面を再表示
   ```

4. **条件付きスタイル**
   ```javascript
   if (task.completed) {
     textSpan.classList.add("completed");
   }
   ```

5. **データと画面の同期パターン**
   ```
   データ変更 → showTasks()呼び出し → 画面再表示
   ```

### 重要なポイント

1. **状態はboolean型で管理する**
   - `true`/`false`で明確に表現
   - `completed: false`が最初の値

2. **!演算子でトグル**
   - `!false → true`
   - `!true → false`

3. **クロージャでオブジェクトを記憶**
   - イベントリスナー内で正しいタスクにアクセスできる

4. **状態変更後は必ず再表示**
   - `task.completed = !task.completed;`
   - `showTasks();`（必ずセット）

5. **オブジェクト配列のメリット**
   - 関連するデータが1つにまとまる
   - プロパティ追加が簡単（`favorite`など）
   - 削除も1回のsplice()だけ

### 状態管理の基本パターン

```javascript
// 1. データに状態を持たせる
let task = { id: 1, text: "買い物", completed: false };

// 2. 画面に状態を反映
checkbox.checked = task.completed;

// 3. ユーザー操作で状態を更新
checkbox.addEventListener("click", function() {
  task.completed = !task.completed;  // トグル
  showTasks();  // 再表示
});

// 4. 状態に応じてスタイルを変更
if (task.completed) {
  textSpan.classList.add("completed");
}
```

### 次のレッスンの予告

次のレッスンでは、**フィルタリング**について学びます。

- 「全て」「未完了のみ」「完了済みのみ」を切り替える
- フィルタボタンの実装
- 配列のフィルタリング処理

状態管理ができるようになったので、次はその状態を使って表示内容を絞り込む方法を学びます！

---

## カリキュラム要件チェック

このレッスンは以下のカリキュラム要件を満たしています：

✅ **完了/未完了**：`completed`プロパティで管理
✅ **チェックボックス**：`<input type="checkbox">`で実装
✅ **状態の切り替え**：`task.completed = !task.completed`でトグル処理
✅ **【知識】状態管理、トグル処理**：詳細に解説
✅ **成果物：完了機能**：チェックボックスで完了/未完了を切り替えられるTODOアプリを実装
