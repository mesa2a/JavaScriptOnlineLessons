---
title: "レッスン101：タスク追加"
author: "JavaScript Online Lessons"
date: "2025-11-26"
---

# レッスン101：タスク追加

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、リストの更新方法を学びました：

```javascript
function showTasks() {
  taskList.replaceChildren();  // 古い表示をクリア

  for (let task of tasks) {
    // 新しく生成
  }
}

// 配列が変わったら表示更新
tasks.push("新しいタスク");
showTasks();
```

しかし、**ユーザーの入力を受け取って配列に追加する方法**はまだ学んでいません。

### よくある場面

実際のアプリ開発では：
- ユーザーが入力欄にテキストを入力する
- 「追加」ボタンをクリックする
- 入力内容が配列に追加され、画面に即座に表示される
- 入力欄が空になり、次の入力の準備ができる

このような「入力 → 追加 → 表示」の流れを実装する必要があります。

### 学習目標

このレッスンでは、**ユーザー入力の処理とデータ追加**について学びます：
- 入力欄とボタンを用意する
- 入力値を取得する
- 配列に追加する
- 画面に即座に反映する
- 入力バリデーション（検証）
- Enterキーでの追加
- ユーザビリティの向上

---

## 1. 基本的なタスク追加

### HTMLの準備

まず、入力欄とボタンを用意します：

```html
<div>
  <input type="text" id="taskInput" placeholder="タスクを入力">
  <button id="addButton">追加</button>
</div>

<ul id="taskList"></ul>
```

**要素の役割**：
- `<input type="text">` - ユーザーがテキストを入力する欄
- `<button>` - クリックして追加を実行するボタン
- `<ul>` - タスクのリストを表示する場所

### JavaScriptでの実装

```javascript
let tasks = [];

let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let taskList = document.getElementById("taskList");

addButton.addEventListener("click", function() {
  // 1. 入力値を取得
  let text = taskInput.value;

  // 2. 配列に追加
  tasks.push(text);

  // 3. 画面を更新
  showTasks();

  // 4. 入力欄をクリア
  taskInput.value = "";
});

function showTasks() {
  taskList.replaceChildren();

  for (let task of tasks) {
    let li = document.createElement("li");
    li.textContent = task;
    taskList.appendChild(li);
  }
}

// 初期表示
showTasks();
```

#### 実行の流れ（詳細版）

```
初期状態
┌────────────────────────────────────┐
│ tasks = []                         │
│ 画面：空のリスト                   │
└────────────────────────────────────┘

ユーザーの操作
┌────────────────────────────────────┐
│ 1. 入力欄に「買い物に行く」と入力 │
│ 2. 追加ボタンをクリック            │
└────────────────────────────────────┘

クリックイベント発火
┌────────────────────────────────────┐
│ addButtonのイベントハンドラ実行    │
└────────────────────────────────────┘

ステップ1：入力値を取得
┌────────────────────────────────────┐
│ let text = taskInput.value;        │
│ ↓                                  │
│ text = "買い物に行く"              │
│                                    │
│ （taskInputのvalueプロパティから   │
│   現在の入力値を取得）             │
└────────────────────────────────────┘

ステップ2：配列に追加
┌────────────────────────────────────┐
│ tasks.push(text);                  │
│ ↓                                  │
│ tasks = ["買い物に行く"]           │
│                                    │
│ （配列の末尾に新しい要素を追加）   │
└────────────────────────────────────┘

ステップ3：画面を更新
┌────────────────────────────────────┐
│ showTasks(); を実行                │
│ ↓                                  │
│ taskList.replaceChildren();        │
│ （古い表示をクリア）               │
│ ↓                                  │
│ ループで tasks[0] を処理           │
│ ↓                                  │
│ <ul>                               │
│   <li>買い物に行く</li>            │
│ </ul>                              │
│                                    │
│ （画面に表示される！）             │
└────────────────────────────────────┘

ステップ4：入力欄をクリア
┌────────────────────────────────────┐
│ taskInput.value = "";              │
│ ↓                                  │
│ 入力欄が空になる                   │
│ （次の入力の準備）                 │
└────────────────────────────────────┘

最終状態
┌────────────────────────────────────┐
│ tasks = ["買い物に行く"]           │
│ 画面：買い物に行く                 │
│ 入力欄：空                         │
└────────────────────────────────────┘
```

### 4つのステップの重要性

**ステップ1：入力値を取得**
- `taskInput.value` でユーザーの入力を取得
- この値は**文字列**

**ステップ2：配列に追加**
- `tasks.push(text)` で配列の末尾に追加
- 配列の内容が変わる

**ステップ3：画面を更新**
- `showTasks()` で画面を再描画
- 配列と画面を同期させる

**ステップ4：入力欄をクリア**
- `taskInput.value = ""` で入力欄を空にする
- ユーザーが次の入力をしやすくする

**この4ステップは必ず順番通りに実行する必要があります！**

---

## 2. 入力バリデーション

### 問題：空の入力を追加できてしまう

現在のコードでは、何も入力せずにボタンを押すと、**空のタスク**が追加されてしまいます：

```
ユーザーの操作
┌────────────────────────────────────┐
│ 1. 何も入力しない（空欄のまま）   │
│ 2. 追加ボタンをクリック            │
└────────────────────────────────────┘

結果
┌────────────────────────────────────┐
│ tasks = [""]                       │
│ 画面：空のli要素が表示される       │
│ （何も見えない！）                 │
└────────────────────────────────────┘
```

### 解決策：空文字チェック

入力が空でないかをチェックします：

```javascript
addButton.addEventListener("click", function() {
  let text = taskInput.value.trim();  // trim()で前後の空白を削除

  // 空文字チェック
  if (text === "") {
    alert("タスクを入力してください");
    return;  // 処理を中断
  }

  tasks.push(text);
  showTasks();
  taskInput.value = "";
});
```

#### trim()メソッドの重要性

```
trim()を使わない場合
┌────────────────────────────────────┐
│ ユーザーの入力："   "（空白3つ）   │
│ ↓                                  │
│ text = "   "                       │
│ ↓                                  │
│ text === "" → false                │
│ ↓                                  │
│ 空白だけのタスクが追加される！     │
└────────────────────────────────────┘

trim()を使う場合
┌────────────────────────────────────┐
│ ユーザーの入力："   "（空白3つ）   │
│ ↓                                  │
│ text = taskInput.value.trim();     │
│ ↓                                  │
│ text = ""（空白が削除された）      │
│ ↓                                  │
│ text === "" → true                 │
│ ↓                                  │
│ アラートが表示され、追加されない   │
└────────────────────────────────────┘
```

**trim()の動作例**：

```javascript
"  こんにちは  ".trim()  // → "こんにちは"
"   ".trim()             // → ""
"タスク".trim()          // → "タスク"
```

#### 実行の流れ（バリデーション付き）

```
ユーザーが空欄でボタンをクリック
┌────────────────────────────────────┐
│ taskInput.value = ""               │
└────────────────────────────────────┘

let text = taskInput.value.trim();
┌────────────────────────────────────┐
│ text = ""                          │
└────────────────────────────────────┘

if (text === "")
┌────────────────────────────────────┐
│ "" === "" → true                   │
│ ↓                                  │
│ if ブロックに入る                  │
└────────────────────────────────────┘

alert("タスクを入力してください");
┌────────────────────────────────────┐
│ アラートダイアログが表示される     │
│ 「タスクを入力してください」       │
└────────────────────────────────────┘

return;
┌────────────────────────────────────┐
│ 関数を終了                         │
│ 以降のコードは実行されない         │
│ （tasks.push()は実行されない）     │
└────────────────────────────────────┘

結果
┌────────────────────────────────────┐
│ 配列は変更されず、画面も変わらない │
└────────────────────────────────────┘
```

### 最小文字数チェック

短すぎる入力を防ぐ：

```javascript
if (text.length < 3) {
  alert("3文字以上入力してください");
  return;
}
```

#### 実行の流れ

```
ユーザーの入力："ab"（2文字）
┌────────────────────────────────────┐
│ text = "ab"                        │
│ text.length = 2                    │
└────────────────────────────────────┘

if (text.length < 3)
┌────────────────────────────────────┐
│ 2 < 3 → true                       │
│ ↓                                  │
│ alert("3文字以上入力してください"); │
│ return;                            │
└────────────────────────────────────┘
```

### 重複チェック

同じタスクを防ぐ：

```javascript
// 既に存在するかチェック
if (tasks.includes(text)) {
  alert("このタスクは既に存在します");
  return;
}

tasks.push(text);
```

#### includes()メソッドの動作

```javascript
let tasks = ["買い物", "勉強", "掃除"];

tasks.includes("買い物")  // → true（存在する）
tasks.includes("運動")    // → false（存在しない）
```

#### 実行の流れ（重複チェック）

```
現在の配列
┌────────────────────────────────────┐
│ tasks = ["買い物", "勉強"]         │
└────────────────────────────────────┘

ユーザーの入力："買い物"（重複）
┌────────────────────────────────────┐
│ text = "買い物"                    │
└────────────────────────────────────┘

if (tasks.includes(text))
┌────────────────────────────────────┐
│ tasks.includes("買い物")           │
│ ↓                                  │
│ 配列を先頭から検索                 │
│ tasks[0] = "買い物" → 一致！       │
│ ↓                                  │
│ true を返す                        │
└────────────────────────────────────┘

if ブロック実行
┌────────────────────────────────────┐
│ alert("このタスクは既に存在します"); │
│ return;                            │
│ ↓                                  │
│ 重複したタスクは追加されない       │
└────────────────────────────────────┘
```

### 複数のバリデーションを組み合わせる

```javascript
addButton.addEventListener("click", function() {
  let text = taskInput.value.trim();

  // バリデーション1：空文字チェック
  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  // バリデーション2：最小文字数チェック
  if (text.length < 3) {
    alert("3文字以上入力してください");
    return;
  }

  // バリデーション3：重複チェック
  if (tasks.includes(text)) {
    alert("このタスクは既に存在します");
    return;
  }

  // すべてのバリデーションを通過した場合のみ追加
  tasks.push(text);
  showTasks();
  taskInput.value = "";
});
```

#### バリデーションの実行順序

```
ユーザーの入力を検証（順番に）
┌────────────────────────────────────┐
│ 1. 空文字チェック                  │
│    ↓ パス                          │
│ 2. 最小文字数チェック              │
│    ↓ パス                          │
│ 3. 重複チェック                    │
│    ↓ パス                          │
│ すべて通過！                       │
│    ↓                               │
│ 配列に追加                         │
└────────────────────────────────────┘

どれか1つでも失敗したら
┌────────────────────────────────────┐
│ アラート表示                       │
│ return で処理中断                  │
│ 配列には追加されない               │
└────────────────────────────────────┘
```

---

## 3. Enterキーで追加

### 問題：ボタンをクリックするのが面倒

現在のコードでは、**マウスで追加ボタンをクリック**する必要があります。
しかし、多くのユーザーは**Enterキーを押して追加したい**と期待します。

### 解決策：keypressイベント

入力欄でEnterキーが押されたときに、追加ボタンをクリックします：

```javascript
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();  // ボタンのクリックを実行
  }
});
```

#### eventオブジェクトの仕組み

```
ユーザーがキーボードを押す
┌────────────────────────────────────┐
│ キーボード：Enterキーを押す        │
│ ↓                                  │
│ ブラウザ：keypressイベント発火     │
│ ↓                                  │
│ eventオブジェクトが作られる        │
└────────────────────────────────────┘

eventオブジェクトの中身
┌────────────────────────────────────┐
│ event = {                          │
│   key: "Enter",                    │
│   keyCode: 13,                     │
│   type: "keypress",                │
│   target: <input id="taskInput">,  │
│   ... その他の情報                 │
│ }                                  │
└────────────────────────────────────┘

event.key の値の例
┌────────────────────────────────────┐
│ Enterキー → "Enter"                │
│ Aキー → "a" または "A"             │
│ スペースキー → " "                 │
│ Escapeキー → "Escape"              │
└────────────────────────────────────┘
```

#### 実行の流れ

```
ユーザーの操作
┌────────────────────────────────────┐
│ 1. 入力欄に「買い物」と入力        │
│ 2. Enterキーを押す                 │
└────────────────────────────────────┘

keypressイベント発火
┌────────────────────────────────────┐
│ taskInputのkeypressイベントハンドラ│
│ function(event) { ... } が実行     │
└────────────────────────────────────┘

if (event.key === "Enter")
┌────────────────────────────────────┐
│ event.key = "Enter"                │
│ "Enter" === "Enter" → true         │
│ ↓                                  │
│ if ブロックに入る                  │
└────────────────────────────────────┘

addButton.click();
┌────────────────────────────────────┐
│ プログラムからボタンをクリック     │
│ ↓                                  │
│ addButtonのclickイベントハンドラが │
│ 実行される（バリデーション付き）   │
│ ↓                                  │
│ タスクが追加される                 │
└────────────────────────────────────┘
```

### なぜclick()を呼ぶのか？

**方法1：処理を2回書く（悪い例）**

```javascript
// ボタンクリック時の処理
addButton.addEventListener("click", function() {
  let text = taskInput.value.trim();
  if (text === "") return;
  tasks.push(text);
  showTasks();
  taskInput.value = "";
});

// Enterキー時の処理（同じ処理を2回書く）
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    let text = taskInput.value.trim();
    if (text === "") return;
    tasks.push(text);
    showTasks();
    taskInput.value = "";
  }
});
```

**問題点**：
- ❌ コードの重複
- ❌ バリデーションを2箇所で管理
- ❌ 修正が必要なとき、2箇所を変更しなければならない

**方法2：click()を呼ぶ（良い例）**

```javascript
// ボタンクリック時の処理
addButton.addEventListener("click", function() {
  let text = taskInput.value.trim();
  if (text === "") return;
  tasks.push(text);
  showTasks();
  taskInput.value = "";
});

// Enterキー時は、ボタンをクリックするだけ
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});
```

**利点**：
- ✅ コードの重複がない
- ✅ バリデーションは1箇所だけ
- ✅ 修正が簡単
- ✅ 保守性が高い

---

## 4. オブジェクトとして追加

### 問題：追加の情報を保存できない

現在のコードでは、タスクを**文字列**として保存しています：

```javascript
tasks = ["買い物", "勉強", "掃除"];
```

しかし、実際のアプリでは：
- タスクの完了状態（completed: true/false）
- 作成日時（createdAt）
- 優先度（priority）

など、複数の情報を保存したい場合が多いです。

### 解決策：オブジェクトとして保存

```javascript
addButton.addEventListener("click", function() {
  let text = taskInput.value.trim();
  if (text === "") return;

  // オブジェクトを作成
  let task = {
    text: text,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(task);
  showTasks();
  taskInput.value = "";
});

function showTasks() {
  taskList.replaceChildren();

  for (let task of tasks) {
    let li = document.createElement("li");
    li.textContent = task.text;  // オブジェクトのtextプロパティを表示
    taskList.appendChild(li);
  }
}
```

#### 実行の流れ（オブジェクト版）

```
ユーザーの入力："買い物"
┌────────────────────────────────────┐
│ text = "買い物"                    │
└────────────────────────────────────┘

オブジェクトを作成
┌────────────────────────────────────┐
│ let task = {                       │
│   text: "買い物",                  │
│   completed: false,                │
│   createdAt: new Date()            │
│ };                                 │
│ ↓                                  │
│ task = {                           │
│   text: "買い物",                  │
│   completed: false,                │
│   createdAt: 2025-11-26T10:30:00   │
│ }                                  │
└────────────────────────────────────┘

配列に追加
┌────────────────────────────────────┐
│ tasks.push(task);                  │
│ ↓                                  │
│ tasks = [                          │
│   {                                │
│     text: "買い物",                │
│     completed: false,              │
│     createdAt: 2025-11-26T10:30:00 │
│   }                                │
│ ]                                  │
└────────────────────────────────────┘

画面更新：showTasks()
┌────────────────────────────────────┐
│ for (let task of tasks) {          │
│   // task = tasks[0]               │
│   // task.text = "買い物"          │
│   li.textContent = task.text;      │
│ }                                  │
│ ↓                                  │
│ <li>買い物</li>                    │
└────────────────────────────────────┘
```

#### オブジェクトの利点

```
文字列の場合（単純）
┌────────────────────────────────────┐
│ tasks = [                          │
│   "買い物",                        │
│   "勉強"                           │
│ ]                                  │
│                                    │
│ 保存できる情報：テキストのみ       │
└────────────────────────────────────┘

オブジェクトの場合（柔軟）
┌────────────────────────────────────┐
│ tasks = [                          │
│   {                                │
│     text: "買い物",                │
│     completed: false,              │
│     createdAt: 2025-11-26T10:30:00,│
│     priority: "high"               │
│   },                               │
│   {                                │
│     text: "勉強",                  │
│     completed: true,               │
│     createdAt: 2025-11-26T09:00:00,│
│     priority: "low"                │
│   }                                │
│ ]                                  │
│                                    │
│ 保存できる情報：複数のプロパティ   │
└────────────────────────────────────┘
```

---

## 5. IDを付ける

### なぜIDが必要か？

配列のインデックスだけでタスクを管理すると、問題が起きます：

```
配列の状態
┌────────────────────────────────────┐
│ tasks = [                          │
│   { text: "買い物" },    // index 0│
│   { text: "勉強" },      // index 1│
│   { text: "掃除" }       // index 2│
│ ]                                  │
└────────────────────────────────────┘

tasks[0]を削除すると...
┌────────────────────────────────────┐
│ tasks.splice(0, 1);                │
│ ↓                                  │
│ tasks = [                          │
│   { text: "勉強" },      // index 0（変わった！）│
│   { text: "掃除" }       // index 1（変わった！）│
│ ]                                  │
│                                    │
│ インデックスが変わってしまう！     │
└────────────────────────────────────┘
```

**ユニークなID**があれば、削除や更新が簡単になります。

### 実装：連番IDを付ける

```javascript
let tasks = [];
let nextId = 1;  // 次に使うID

addButton.addEventListener("click", function() {
  let text = taskInput.value.trim();
  if (text === "") return;

  let task = {
    id: nextId,  // 現在のIDを設定
    text: text,
    completed: false
  };

  nextId++;  // 次のIDに進める

  tasks.push(task);
  showTasks();
  taskInput.value = "";
});
```

#### 実行の流れ（ID付き）

```
初期状態
┌────────────────────────────────────┐
│ tasks = []                         │
│ nextId = 1                         │
└────────────────────────────────────┘

1つ目のタスク追加："買い物"
┌────────────────────────────────────┐
│ let task = {                       │
│   id: nextId,     // id: 1         │
│   text: "買い物",                  │
│   completed: false                 │
│ };                                 │
│ ↓                                  │
│ nextId++;  // nextId = 2           │
│ ↓                                  │
│ tasks = [                          │
│   { id: 1, text: "買い物", completed: false } │
│ ]                                  │
└────────────────────────────────────┘

2つ目のタスク追加："勉強"
┌────────────────────────────────────┐
│ let task = {                       │
│   id: nextId,     // id: 2         │
│   text: "勉強",                    │
│   completed: false                 │
│ };                                 │
│ ↓                                  │
│ nextId++;  // nextId = 3           │
│ ↓                                  │
│ tasks = [                          │
│   { id: 1, text: "買い物", completed: false }, │
│   { id: 2, text: "勉強", completed: false }    │
│ ]                                  │
└────────────────────────────────────┘

3つ目のタスク追加："掃除"
┌────────────────────────────────────┐
│ tasks = [                          │
│   { id: 1, text: "買い物", completed: false }, │
│   { id: 2, text: "勉強", completed: false },   │
│   { id: 3, text: "掃除", completed: false }    │
│ ]                                  │
│ nextId = 4                         │
└────────────────────────────────────┘

IDの利点
┌────────────────────────────────────┐
│ id: 1のタスクを削除しても、        │
│ 他のタスクのIDは変わらない         │
│                                    │
│ id: 2 → 常にid: 2                  │
│ id: 3 → 常にid: 3                  │
│                                    │
│ （インデックスは変わるが、IDは不変）│
└────────────────────────────────────┘
```

### タイムスタンプをIDに使う

より確実にユニークなIDが欲しい場合：

```javascript
let task = {
  id: Date.now(),  // 現在時刻（ミリ秒）をIDにする
  text: text,
  completed: false
};
```

#### Date.now()の仕組み

```javascript
Date.now()  // → 1732612345678（例：ミリ秒単位の数値）
```

```
Date.now()の値
┌────────────────────────────────────┐
│ 1970年1月1日 00:00:00 UTC からの   │
│ 経過ミリ秒数                       │
│                                    │
│ 例：                               │
│ 2025-11-26 10:30:00 →              │
│   1732612200000                    │
│                                    │
│ 1ミリ秒後に実行すると →            │
│   1732612200001                    │
│                                    │
│ 常に異なる値になる                 │
│ （ユニークなIDとして使える）       │
└────────────────────────────────────┘
```

---

## 6. フォーカス管理

### 問題：追加後にマウス操作が必要

現在のコードでは、タスクを追加した後：
1. 入力欄をクリックする
2. 次のタスクを入力する

という手順が必要で、**マウス操作が面倒**です。

### 解決策：追加後に自動フォーカス

```javascript
addButton.addEventListener("click", function() {
  let text = taskInput.value.trim();
  if (text === "") return;

  tasks.push(text);
  showTasks();
  taskInput.value = "";

  // 入力欄にフォーカスを戻す
  taskInput.focus();
});
```

#### focus()メソッドの動作

```
追加前
┌────────────────────────────────────┐
│ 入力欄：フォーカスあり（カーソル点滅）│
│ ボタン：フォーカスなし             │
└────────────────────────────────────┘

ボタンをクリック
┌────────────────────────────────────┐
│ タスク追加処理実行                 │
│ taskInput.value = "";              │
│ ↓                                  │
│ 入力欄：フォーカスなし（カーソルなし）│
└────────────────────────────────────┘

taskInput.focus(); を実行
┌────────────────────────────────────┐
│ 入力欄：フォーカスあり（カーソル点滅）│
│ ↓                                  │
│ すぐに次のタスクを入力できる       │
│ （マウス操作不要！）               │
└────────────────────────────────────┘
```

### ページ読み込み時にフォーカス

ページを開いた瞬間から入力できるように：

```javascript
// ページ読み込み時に入力欄にフォーカス
taskInput.focus();
```

#### 実行の流れ

```
ページ読み込み
┌────────────────────────────────────┐
│ HTMLの読み込み完了                 │
│ JavaScriptの実行開始               │
└────────────────────────────────────┘

taskInput.focus(); を実行
┌────────────────────────────────────┐
│ 入力欄にフォーカスが当たる         │
│ ↓                                  │
│ ユーザーはすぐに入力できる         │
│ （マウスでクリックする必要なし）   │
└────────────────────────────────────┘
```

---

## 7. 件数の表示

### 追加した件数を表示

ユーザーに「何個のタスクがあるか」を知らせます：

```html
<p>タスク数: <span id="taskCount">0</span></p>
```

```javascript
function showTasks() {
  taskList.replaceChildren();

  // 件数を更新
  document.getElementById("taskCount").textContent = tasks.length;

  for (let task of tasks) {
    let li = document.createElement("li");
    li.textContent = task.text;
    taskList.appendChild(li);
  }
}
```

#### 実行の流れ

```
初期状態
┌────────────────────────────────────┐
│ tasks = []                         │
│ 画面：タスク数: 0                  │
└────────────────────────────────────┘

1つ目のタスク追加
┌────────────────────────────────────┐
│ tasks = [{ text: "買い物" }]       │
│ ↓                                  │
│ showTasks()実行                    │
│ ↓                                  │
│ document.getElementById("taskCount")│
│   .textContent = tasks.length;     │
│ ↓                                  │
│ tasks.length = 1                   │
│ ↓                                  │
│ 画面：タスク数: 1                  │
└────────────────────────────────────┘

2つ目のタスク追加
┌────────────────────────────────────┐
│ tasks = [                          │
│   { text: "買い物" },              │
│   { text: "勉強" }                 │
│ ]                                  │
│ ↓                                  │
│ tasks.length = 2                   │
│ ↓                                  │
│ 画面：タスク数: 2                  │
└────────────────────────────────────┘
```

---

## 8. 実践例：買い物リストアプリ

タスク追加の知識を使って、**買い物リストアプリ**を作ってみましょう。

### 機能

- 商品名と数量を入力
- バリデーション（空文字、数値、重複）
- Enterキーで追加
- フォーカス管理
- 件数表示

### HTML

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>買い物リスト</title>
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
    .input-group {
      display: flex;
      gap: 10px;
      margin: 20px 0;
    }
    input[type="text"] {
      flex-grow: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    input[type="number"] {
      width: 80px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    button {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background-color: #45a049;
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .item-name {
      font-size: 18px;
      font-weight: bold;
    }
    .item-quantity {
      color: #666;
      margin-left: 10px;
    }
    .delete-button {
      background-color: #e74c3c;
      padding: 5px 10px;
      font-size: 14px;
    }
    .delete-button:hover {
      background-color: #c0392b;
    }
    .summary {
      margin-top: 20px;
      padding: 15px;
      background-color: #e3f2fd;
      border-radius: 5px;
      text-align: center;
    }
    .empty-message {
      text-align: center;
      color: #999;
      padding: 30px;
      font-style: italic;
    }
  </style>
</head>
<body>
  <h1>🛒 買い物リスト</h1>

  <div class="input-group">
    <input type="text" id="itemInput" placeholder="商品名を入力">
    <input type="number" id="quantityInput" value="1" min="1" placeholder="数量">
    <button id="addButton">追加</button>
  </div>

  <div class="summary">
    <p>商品数: <span id="itemCount">0</span>個</p>
  </div>

  <div id="itemList"></div>

  <script>
    let items = [];
    let nextId = 1;

    let itemInput = document.getElementById("itemInput");
    let quantityInput = document.getElementById("quantityInput");
    let addButton = document.getElementById("addButton");
    let itemList = document.getElementById("itemList");
    let itemCount = document.getElementById("itemCount");

    addButton.addEventListener("click", function() {
      let name = itemInput.value.trim();
      let quantity = parseInt(quantityInput.value);

      // バリデーション1：空文字チェック
      if (name === "") {
        alert("商品名を入力してください");
        itemInput.focus();
        return;
      }

      // バリデーション2：数値チェック
      if (isNaN(quantity) || quantity < 1) {
        alert("数量は1以上の数値を入力してください");
        quantityInput.focus();
        return;
      }

      // バリデーション3：重複チェック
      let existing = items.find(item => item.name === name);
      if (existing) {
        alert("「" + name + "」は既に追加されています");
        itemInput.focus();
        return;
      }

      // アイテムを作成
      let item = {
        id: nextId,
        name: name,
        quantity: quantity
      };

      nextId++;

      // 配列に追加
      items.push(item);

      // 画面を更新
      showItems();

      // 入力欄をクリア
      itemInput.value = "";
      quantityInput.value = "1";

      // 商品名入力欄にフォーカス
      itemInput.focus();
    });

    // Enterキーで追加（商品名入力欄）
    itemInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        addButton.click();
      }
    });

    // Enterキーで追加（数量入力欄）
    quantityInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        addButton.click();
      }
    });

    function showItems() {
      itemList.replaceChildren();

      // 件数を更新
      itemCount.textContent = items.length;

      // アイテムが空の場合
      if (items.length === 0) {
        let empty = document.createElement("p");
        empty.className = "empty-message";
        empty.textContent = "まだ商品が追加されていません";
        itemList.appendChild(empty);
        return;
      }

      // 各アイテムを表示
      for (let i = 0; i < items.length; i++) {
        let item = items[i];

        let div = document.createElement("div");
        div.className = "item";

        let info = document.createElement("div");

        let nameSpan = document.createElement("span");
        nameSpan.className = "item-name";
        nameSpan.textContent = item.name;

        let quantitySpan = document.createElement("span");
        quantitySpan.className = "item-quantity";
        quantitySpan.textContent = "×" + item.quantity;

        info.appendChild(nameSpan);
        info.appendChild(quantitySpan);

        let deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "削除";

        deleteButton.addEventListener("click", function() {
          items.splice(i, 1);
          showItems();
        });

        div.appendChild(info);
        div.appendChild(deleteButton);

        itemList.appendChild(div);
      }
    }

    // 初期表示
    showItems();
    itemInput.focus();
  </script>
</body>
</html>
```

### コードの詳細解説

#### ケーススタディ1：商品を追加する

```
ユーザーの操作
┌────────────────────────────────────┐
│ 1. 商品名に「りんご」と入力        │
│ 2. 数量に「3」と入力               │
│ 3. 追加ボタンをクリック            │
└────────────────────────────────────┘

バリデーション実行
┌────────────────────────────────────┐
│ name = "りんご"                    │
│ quantity = 3                       │
│                                    │
│ チェック1：name === "" → false     │
│ チェック2：quantity < 1 → false    │
│ チェック3：重複 → false            │
│ ↓                                  │
│ すべてのバリデーション通過         │
└────────────────────────────────────┘

アイテムオブジェクト作成
┌────────────────────────────────────┐
│ let item = {                       │
│   id: 1,                           │
│   name: "りんご",                  │
│   quantity: 3                      │
│ };                                 │
└────────────────────────────────────┘

配列に追加
┌────────────────────────────────────┐
│ items.push(item);                  │
│ ↓                                  │
│ items = [                          │
│   { id: 1, name: "りんご", quantity: 3 } │
│ ]                                  │
│ nextId = 2                         │
└────────────────────────────────────┘

画面更新
┌────────────────────────────────────┐
│ showItems()実行                    │
│ ↓                                  │
│ 商品数: 1個                        │
│ りんご ×3 [削除]                   │
└────────────────────────────────────┘

入力欄クリア&フォーカス
┌────────────────────────────────────┐
│ itemInput.value = ""               │
│ quantityInput.value = "1"          │
│ itemInput.focus()                  │
│ ↓                                  │
│ 次の商品をすぐに入力できる         │
└────────────────────────────────────┘
```

#### ケーススタディ2：重複チェック

```
現在の配列
┌────────────────────────────────────┐
│ items = [                          │
│   { id: 1, name: "りんご", quantity: 3 } │
│ ]                                  │
└────────────────────────────────────┘

ユーザーが「りんご」を再度追加しようとする
┌────────────────────────────────────┐
│ name = "りんご"                    │
│ quantity = 2                       │
└────────────────────────────────────┘

重複チェック実行
┌────────────────────────────────────┐
│ let existing = items.find(item => item.name === name); │
└────────────────────────────────────┘

find()メソッドの動作
┌────────────────────────────────────┐
│ 配列の各要素をチェック             │
│                                    │
│ item = { id: 1, name: "りんご", quantity: 3 } │
│ ↓                                  │
│ item.name === name                 │
│ "りんご" === "りんご" → true       │
│ ↓                                  │
│ このitemを返す                     │
└────────────────────────────────────┘

if (existing)
┌────────────────────────────────────┐
│ existing = { id: 1, name: "りんご", quantity: 3 } │
│ ↓                                  │
│ オブジェクトは真値 → true          │
│ ↓                                  │
│ alert("「りんご」は既に追加されています"); │
│ return;                            │
│ ↓                                  │
│ 追加されない                       │
└────────────────────────────────────┘
```

#### ケーススタディ3：空のリスト表示

```
初期状態（itemsが空）
┌────────────────────────────────────┐
│ items = []                         │
└────────────────────────────────────┘

showItems()実行
┌────────────────────────────────────┐
│ itemList.replaceChildren();        │
│ itemCount.textContent = items.length; │
│ ↓                                  │
│ 商品数: 0個                        │
└────────────────────────────────────┘

if (items.length === 0)
┌────────────────────────────────────┐
│ 0 === 0 → true                     │
│ ↓                                  │
│ let empty = document.createElement("p"); │
│ empty.className = "empty-message"; │
│ empty.textContent = "まだ商品が追加されていません"; │
│ itemList.appendChild(empty);       │
│ return;                            │
└────────────────────────────────────┘

画面
┌────────────────────────────────────┐
│ まだ商品が追加されていません       │
│ （グレーの斜体で表示）             │
└────────────────────────────────────┘
```

### このコードのポイント

1. **複数の入力欄**
   - 商品名（テキスト）と数量（数値）を入力
   - 両方の入力欄でEnterキー対応

2. **充実したバリデーション**
   - 空文字チェック
   - 数値チェック（`parseInt()`と`isNaN()`）
   - 重複チェック（`find()`メソッド）

3. **ユーザビリティ**
   - 追加後に商品名入力欄にフォーカス
   - ページ読み込み時に自動フォーカス
   - 空のリストに説明メッセージ

4. **データ管理**
   - ユニークなID（連番）
   - オブジェクトで複数の情報を保存

---

## 9. 練習問題

### 問題：本の管理アプリ

本の管理アプリを作成してください。

#### 要件

1. 本のタイトルと著者名を入力できる（2つの入力欄）
2. 「追加」ボタンで配列に追加
3. 追加した本をリスト表示（タイトルと著者名を表示）
4. 空文字チェックを実装（両方とも入力必須）
5. 重複チェック（同じタイトルは追加不可）
6. 追加した本の冊数を表示
7. Enterキーでも追加できる（どちらの入力欄からでも）
8. 追加後にタイトル入力欄にフォーカス

#### ヒント

```javascript
let books = [];
let nextId = 1;

let titleInput = document.getElementById("titleInput");
let authorInput = document.getElementById("authorInput");
let addButton = document.getElementById("addButton");

addButton.addEventListener("click", function() {
  let title = titleInput.value.trim();
  let author = authorInput.value.trim();

  // バリデーション
  if (title === "" || author === "") {
    alert("タイトルと著者名を入力してください");
    return;
  }

  // 重複チェック
  let existing = books.find(book => book.title === title);
  if (existing) {
    alert("この本は既に追加されています");
    return;
  }

  // 本オブジェクトを作成
  let book = {
    id: nextId,
    title: title,
    author: author
  };

  nextId++;

  books.push(book);
  showBooks();

  // 入力欄をクリア
  titleInput.value = "";
  authorInput.value = "";
  titleInput.focus();
});

// Enterキー対応
titleInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

authorInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

function showBooks() {
  let bookList = document.getElementById("bookList");
  bookList.replaceChildren();

  // 件数表示
  document.getElementById("bookCount").textContent = books.length;

  // 各本を表示
  for (let i = 0; i < books.length; i++) {
    let book = books[i];

    let div = document.createElement("div");
    div.className = "book-item";

    let titleSpan = document.createElement("span");
    titleSpan.textContent = "『" + book.title + "』";

    let authorSpan = document.createElement("span");
    authorSpan.textContent = " - " + book.author;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", function() {
      books.splice(i, 1);
      showBooks();
    });

    div.appendChild(titleSpan);
    div.appendChild(authorSpan);
    div.appendChild(deleteButton);

    bookList.appendChild(div);
  }
}

// 初期表示
showBooks();
titleInput.focus();
```

---

## まとめ

今回は、**ユーザー入力をもとに配列に要素を追加する方法**を学びました：

### 基本パターン（4ステップ）

1. **入力値を取得**：`input.value` または `input.value.trim()`
2. **配列に追加**：`array.push(newItem)`
3. **画面を更新**：`showItems()`
4. **入力欄をクリア**：`input.value = ""`

### 入力バリデーション

- **空文字チェック**：`if (text === "") return;`
- **trim()の使用**：前後の空白を削除
- **最小文字数チェック**：`if (text.length < 3) return;`
- **重複チェック**：`if (array.includes(text)) return;`

### ユーザビリティの向上

- **Enterキー対応**：`keypress`イベントで`button.click()`を呼ぶ
- **フォーカス管理**：`input.focus()`で次の入力をスムーズに
- **件数表示**：`array.length`で配列の要素数を表示

### オブジェクトとして保存

```javascript
let item = {
  id: nextId,
  text: text,
  completed: false,
  createdAt: new Date()
};
```

複数の情報をまとめて管理できる

### ID管理

- **連番ID**：`nextId++`でユニークなIDを生成
- **タイムスタンプID**：`Date.now()`で確実にユニーク

これらの技術を組み合わせることで、**ユーザーフレンドリーで堅牢なアプリケーション**が作れます。

---

## カリキュラムの要件をチェック

このレッスンで扱った内容：

✅ 入力欄とボタン - `<input>`と`<button>`でユーザー入力を受け取る
✅ 配列に追加 - `array.push()`で新しい要素を追加
✅ 画面に反映 - `showTasks()`で画面を更新し、追加した要素を即座に表示
✅ 【知識】ユーザー入力の処理 - `value`プロパティ、バリデーション、`trim()`
✅ 【知識】データの永続化 - オブジェクト形式での保存、ID管理
✅ 成果物：TODO追加機能 - 買い物リストアプリ、本の管理アプリ

すべての要件を満たしています！

---

次のレッスンでは、**タスク表示**をより詳しく学びます。番号付きリスト、見やすい整形、CSSでのスタイリングなどについて学びましょう！
