---
title: "編集機能"
lesson: 108
date: "2025-11-26"
description: "タスクを編集する機能を実装し、インライン編集UIと状態遷移を学びます"
objectives:
  - "タスクのテキストを編集できる"
  - "編集モードと表示モードを切り替えられる"
  - "インライン編集UIを実装できる"
  - "UI状態遷移を理解できる"
duration: 30
---

# レッスン108: 編集機能

## このレッスンで学ぶこと

### 前回の復習

レッスン107では、**ソート機能**を学びました：

```javascript
// 優先度順にソート
tasks.sort(function(a, b) {
  return b.priority - a.priority;
});

// 日付順にソート
tasks.sort(function(a, b) {
  return b.date.localeCompare(a.date);
});
```

タスクを様々な基準で並び替えることができるようになりました。

### よくある場面

日常生活でこんな場面はありませんか？

**入力ミスを発見**
```
TODOアプリに「牛乳を買う」と入力したけど、
本当は「牛乳とパンを買う」だった...
削除して入力し直すのは面倒だな。
その場で編集できたら便利なのに。
```

**内容を更新**
```
「会議資料作成」というタスクがあるけど、
会議の時間が変更になったから
「15時の会議資料作成」に変更したい。
```

**誤字を修正**
```
「レポート提出」と入力したつもりが
「レポート体質」になってる！
すぐに直したい。
```

これらの場面で必要なのが**編集機能**です。

### 学習目標

今回のレッスンでは、以下のことを学びます：

1. **オブジェクト配列のデータ更新方法**
   - オブジェクトのプロパティを変更する
   - 配列内の特定のオブジェクトを見つけて更新する

2. **編集モードの管理**
   - 現在編集中のタスクを追跡する
   - 編集モードと表示モードを切り替える

3. **インライン編集UIの実装**
   - 編集中は入力フィールドを表示
   - 通常時はテキストを表示
   - 保存ボタンとキャンセルボタンの実装

4. **UI状態遷移の理解**
   - 表示モード → 編集モード → 保存/キャンセル → 表示モード
   - 状態に応じたUIの切り替え

---

## 1. オブジェクトのプロパティ更新

### 基本的な更新方法

オブジェクトのプロパティは、直接代入することで更新できます。

```javascript
let task = {
  id: 1,
  text: "買い物",
  completed: false
};

console.log("更新前:", task.text);  // "買い物"

// プロパティを更新
task.text = "牛乳を買う";

console.log("更新後:", task.text);  // "牛乳を買う"
```

**実行の流れ**
```
ステップ1: taskオブジェクトを作成
  task = {id: 1, text: "買い物", completed: false}

ステップ2: task.text に新しい値を代入
  task.text = "牛乳を買う"

ステップ3: taskオブジェクトの中身が変わる
  task = {id: 1, text: "牛乳を買う", completed: false}
                      ↑ ここが変わった
```

### 配列内のオブジェクトを更新

配列内の特定のオブジェクトを見つけて更新する方法を学びましょう。

```javascript
let tasks = [
  {id: 1, text: "買い物", completed: false},
  {id: 2, text: "掃除", completed: false},
  {id: 3, text: "勉強", completed: false}
];

// インデックスで更新
tasks[1].text = "洗濯";

console.log(tasks);
// [
//   {id: 1, text: "買い物", completed: false},
//   {id: 2, text: "洗濯", completed: false},  ← 変わった
//   {id: 3, text: "勉強", completed: false}
// ]
```

**視覚化：配列内のオブジェクト更新**
```
更新前の配列:
┌────────────────────────────────────┐
│ tasks配列                          │
├────────────────────────────────────┤
│ [0] {id: 1, text: "買い物"}        │
│ [1] {id: 2, text: "掃除"}   ← 更新対象
│ [2] {id: 3, text: "勉強"}          │
└────────────────────────────────────┘

tasks[1].text = "洗濯"; を実行
         ↓
更新後の配列:
┌────────────────────────────────────┐
│ tasks配列                          │
├────────────────────────────────────┤
│ [0] {id: 1, text: "買い物"}        │
│ [1] {id: 2, text: "洗濯"}   ← 変わった！
│ [2] {id: 3, text: "勉強"}          │
└────────────────────────────────────┘
```

### IDで検索して更新

実際のアプリでは、IDを使って更新するオブジェクトを見つけます。

```javascript
let tasks = [
  {id: 1, text: "買い物", completed: false},
  {id: 2, text: "掃除", completed: false},
  {id: 3, text: "勉強", completed: false}
];

// ID 2 のタスクを見つける
let targetTask = tasks.find(function(task) {
  return task.id === 2;
});

console.log("見つかったタスク:", targetTask);
// {id: 2, text: "掃除", completed: false}

// テキストを更新
targetTask.text = "洗濯";

console.log("更新後の配列:", tasks);
// [
//   {id: 1, text: "買い物", completed: false},
//   {id: 2, text: "洗濯", completed: false},  ← 変わった
//   {id: 3, text: "勉強", completed: false}
// ]
```

**実行の流れ（詳細）**
```
ステップ1: tasks.find()を実行
  内部で各要素をチェック:
    task = {id: 1, ...} → id === 2? → false
    task = {id: 2, ...} → id === 2? → true ← 見つかった！

  targetTask = {id: 2, text: "掃除", completed: false}

ステップ2: targetTask.text = "洗濯" を実行
  targetTaskは配列内のオブジェクトへの参照なので、
  配列内のオブジェクトが直接変更される

ステップ3: 配列内のオブジェクトが更新される
  tasks[1] = {id: 2, text: "洗濯", completed: false}
```

**重要な概念：参照**

オブジェクトは「参照」で渡されます。これは以下を意味します：

```javascript
let original = {id: 1, text: "買い物"};
let reference = original;  // 参照をコピー

reference.text = "掃除";   // 参照を通じて変更

console.log(original.text);   // "掃除" ← originalも変わる！
console.log(reference.text);  // "掃除"
```

```
メモリ上のイメージ:
┌─────────────────────────┐
│ メモリのどこか          │
│ {id: 1, text: "買い物"} │ ← 実際のオブジェクト
└─────────────────────────┘
         ↑        ↑
         │        │
      original  reference
    （参照）   （参照）

両方とも同じオブジェクトを指している！
どちらから変更しても、同じオブジェクトが変わる
```

---

## 2. 編集モードの管理

### 編集状態を追跡する

どのタスクが現在編集中なのかを追跡する必要があります。

```javascript
let tasks = [
  {id: 1, text: "買い物", completed: false},
  {id: 2, text: "掃除", completed: false},
  {id: 3, text: "勉強", completed: false}
];

let editingId = null;  // 編集中のタスクのID（nullは「編集中でない」）

// 編集モードに入る
function startEdit(id) {
  editingId = id;
  console.log("編集モード開始: ID", id);
  showTasks();
}

// 編集モードを終了
function cancelEdit() {
  editingId = null;
  console.log("編集モードキャンセル");
  showTasks();
}
```

**状態遷移図**
```
表示モード              編集モード
editingId = null       editingId = 2
┌──────────────┐       ┌──────────────┐
│ 買い物  [編集]│       │ 買い物  [編集]│
│ 掃除    [編集]│──────>│ [掃除   ] 💾 ❌│ ← 編集中
│ 勉強    [編集]│<──────│ 勉強    [編集]│
└──────────────┘       └──────────────┘
                  保存/キャンセル
```

### なぜnullを使うのか？

`-1`ではなく`null`を使う理由：

```javascript
// ❌ インデックスで管理（古い方法）
let editingIndex = -1;  // -1は「編集中でない」

// 問題点：
// - タスクを削除すると、インデックスがずれる
// - 配列の順番が変わると、間違ったタスクを編集してしまう

// ✅ IDで管理（推奨）
let editingId = null;  // nullは「編集中でない」

// 利点：
// - タスクを削除してもIDは変わらない
// - 配列の順番が変わっても、正しいタスクを編集できる
// - nullは「値がない」を明確に表現できる
```

### 編集中かどうかを判定

各タスクが編集中かどうかを判定するコード：

```javascript
function showTasks() {
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    // このタスクが編集中かどうかを判定
    if (editingId === task.id) {
      console.log("タスク", task.id, "は編集中");
      // 編集モードのUIを表示
    } else {
      console.log("タスク", task.id, "は表示モード");
      // 通常のUIを表示
    }
  }
}
```

**実行例**
```
editingId = 2 のとき:

ループ1回目: task.id = 1
  editingId === task.id?
  2 === 1? → false → 表示モード

ループ2回目: task.id = 2
  editingId === task.id?
  2 === 2? → true → 編集モード！

ループ3回目: task.id = 3
  editingId === task.id?
  2 === 3? → false → 表示モード
```

---

## 3. インライン編集UIの実装

### UIの切り替えパターン

編集モードと表示モードで、異なるUIを表示します。

```javascript
function showTasks() {
  taskList.replaceChildren();  // 既存の表示をクリア

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let item = document.createElement("div");
    item.className = "task-item";

    if (editingId === task.id) {
      // 【編集モード】入力フィールドとボタンを表示
      createEditMode(item, task);
    } else {
      // 【表示モード】テキストと編集ボタンを表示
      createDisplayMode(item, task);
    }

    taskList.appendChild(item);
  }
}
```

**UI状態の視覚化**
```
表示モード（editingId = null）:
┌────────────────────────────────┐
│ □ 買い物           [編集] [削除] │
│ ☑ 掃除             [編集] [削除] │
│ □ 勉強             [編集] [削除] │
└────────────────────────────────┘

編集モード（editingId = 2）:
┌────────────────────────────────┐
│ □ 買い物           [編集] [削除] │
│ [掃除の修正    ]   [保存] [✕]   │ ← 編集中
│ □ 勉強             [編集] [削除] │
└────────────────────────────────┘
```

### 編集モードのUI作成

編集中のタスクに表示する入力フィールドと保存/キャンセルボタン：

```javascript
function createEditMode(item, task) {
  // 入力フィールドを作成
  let input = document.createElement("input");
  input.type = "text";
  input.value = task.text;  // 現在のテキストを表示
  input.className = "edit-input";

  // 保存ボタンを作成
  let saveButton = document.createElement("button");
  saveButton.textContent = "保存";
  saveButton.className = "save-button";

  // 保存ボタンがクリックされたとき
  saveButton.addEventListener("click", function() {
    let newText = input.value.trim();
    saveTask(task.id, newText);
  });

  // キャンセルボタンを作成
  let cancelButton = document.createElement("button");
  cancelButton.textContent = "キャンセル";
  cancelButton.className = "cancel-button";

  // キャンセルボタンがクリックされたとき
  cancelButton.addEventListener("click", function() {
    editingId = null;  // 編集モードを終了
    showTasks();       // 再表示
  });

  // Enterキーで保存
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      saveButton.click();
    }
  });

  // DOMに追加
  item.appendChild(input);
  item.appendChild(saveButton);
  item.appendChild(cancelButton);

  // フォーカスを設定（使いやすさ向上）
  setTimeout(function() {
    input.focus();
    input.select();  // テキストを全選択
  }, 0);
}
```

**実行の流れ（編集ボタンをクリックしたとき）**
```
ステップ1: ユーザーが「掃除」の[編集]ボタンをクリック
  startEdit(2) が呼ばれる
  editingId = 2 に設定

ステップ2: showTasks() が実行される
  全タスクをループ:
    task.id = 1 → editingId !== 1 → 表示モード
    task.id = 2 → editingId === 2 → 編集モード！
    task.id = 3 → editingId !== 3 → 表示モード

ステップ3: createEditMode() が task.id = 2 で呼ばれる
  input要素を作成
    input.value = "掃除"（現在のテキスト）

  saveButton要素を作成
    クリック時: saveTask(2, input.value.trim())

  cancelButton要素を作成
    クリック時: editingId = null; showTasks();

ステップ4: DOMに追加
  item.appendChild(input)
  item.appendChild(saveButton)
  item.appendChild(cancelButton)

ステップ5: フォーカスを設定
  input.focus()   ← カーソルが入力欄に移動
  input.select()  ← テキストが全選択される
```

**フォーカスとselect()の効果**
```
フォーカス前:
┌────────────────────────────────┐
│ [掃除        ]   [保存] [✕]    │
│                  ↑             │
│            マウスカーソル       │
└────────────────────────────────┘

input.focus() 実行後:
┌────────────────────────────────┐
│ [掃除|       ]   [保存] [✕]    │
│      ↑                         │
│   カーソルがここに             │
└────────────────────────────────┘

input.select() 実行後:
┌────────────────────────────────┐
│ [■■■■       ]   [保存] [✕]    │
│  ↑ 全選択されている            │
│  すぐに入力できる！            │
└────────────────────────────────┘
```

### 表示モードのUI作成

通常時に表示するテキストと編集ボタン：

```javascript
function createDisplayMode(item, task) {
  // チェックボックスを作成
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  checkbox.addEventListener("change", function() {
    task.completed = checkbox.checked;
    showTasks();
  });

  // テキストを表示
  let text = document.createElement("span");
  text.textContent = task.text;
  if (task.completed) {
    text.style.textDecoration = "line-through";
    text.style.color = "#999";
  }

  // 編集ボタンを作成
  let editButton = document.createElement("button");
  editButton.textContent = "編集";
  editButton.className = "edit-button";

  editButton.addEventListener("click", function() {
    editingId = task.id;  // 編集モードに入る
    showTasks();          // 再表示
  });

  // 削除ボタンを作成
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "削除";
  deleteButton.className = "delete-button";

  deleteButton.addEventListener("click", function() {
    if (confirm("このタスクを削除しますか？")) {
      deleteTask(task.id);
    }
  });

  // DOMに追加
  item.appendChild(checkbox);
  item.appendChild(text);
  item.appendChild(editButton);
  item.appendChild(deleteButton);
}
```

---

## 4. 保存処理の実装

### 保存処理の詳細

入力された新しいテキストを配列に保存します。

```javascript
function saveTask(id, newText) {
  console.log("保存処理開始: ID", id, "新しいテキスト:", newText);

  // 空欄チェック
  if (newText === "") {
    alert("タスクを入力してください");
    return;  // 処理を中断
  }

  // IDで対象のタスクを検索
  let targetTask = tasks.find(function(task) {
    return task.id === id;
  });

  if (targetTask) {
    console.log("更新前:", targetTask.text);

    // テキストを更新
    targetTask.text = newText;

    console.log("更新後:", targetTask.text);

    // 編集モードを終了
    editingId = null;

    // 画面を再表示
    showTasks();
  } else {
    console.log("エラー: タスクが見つかりません");
  }
}
```

**実行の流れ（保存ボタンをクリック）**
```
初期状態:
tasks = [
  {id: 1, text: "買い物", completed: false},
  {id: 2, text: "掃除", completed: false},
  {id: 3, text: "勉強", completed: false}
]
editingId = 2
input.value = "掃除と洗濯"

ステップ1: [保存]ボタンをクリック
  saveButton.click()
  ↓
  saveTask(2, "掃除と洗濯") が呼ばれる

ステップ2: 空欄チェック
  newText === ""?
  "掃除と洗濯" === ""? → false
  チェックOK、処理続行

ステップ3: タスクを検索
  tasks.find(function(task) {
    return task.id === 2;
  })

  内部でループ:
    task = {id: 1, ...} → id === 2? → false
    task = {id: 2, ...} → id === 2? → true ← 見つかった！

  targetTask = {id: 2, text: "掃除", completed: false}

ステップ4: テキストを更新
  targetTask.text = "掃除と洗濯"

  配列内のオブジェクトが変わる:
  tasks[1] = {id: 2, text: "掃除と洗濯", completed: false}

ステップ5: 編集モードを終了
  editingId = null

ステップ6: 画面を再表示
  showTasks()

  全てのタスクが表示モードになる
  （editingId が null なので）

最終状態:
tasks = [
  {id: 1, text: "買い物", completed: false},
  {id: 2, text: "掃除と洗濯", completed: false},  ← 変わった！
  {id: 3, text: "勉強", completed: false}
]
editingId = null
```

**視覚化：保存処理の流れ**
```
[1] ユーザーが入力欄で編集
┌────────────────────────────────┐
│ [掃除と洗濯]   [保存] [✕]     │
│       ↑                        │
│   ユーザーが修正               │
└────────────────────────────────┘

[2] [保存]ボタンをクリック
┌────────────────────────────────┐
│ [掃除と洗濯]   [💾] [✕]       │
│                 ↑              │
│              クリック！         │
└────────────────────────────────┘

[3] saveTask() が実行される
    ↓
配列内のオブジェクトを更新
{id: 2, text: "掃除"}
    ↓
{id: 2, text: "掃除と洗濯"}

[4] editingId = null に設定
    ↓
[5] showTasks() で再表示
┌────────────────────────────────┐
│ □ 買い物           [編集] [削除] │
│ □ 掃除と洗濯       [編集] [削除] │ ← 更新された！
│ □ 勉強             [編集] [削除] │
└────────────────────────────────┘
```

### バリデーション（入力検証）

保存前に入力内容をチェックすることが重要です。

```javascript
function saveTask(id, newText) {
  // 空欄チェック
  if (newText === "") {
    alert("タスクを入力してください");
    return;
  }

  // 長すぎるテキストのチェック（オプション）
  if (newText.length > 100) {
    alert("タスクは100文字以内で入力してください");
    return;
  }

  // 重複チェック（オプション）
  let isDuplicate = tasks.some(function(task) {
    return task.text === newText && task.id !== id;
  });

  if (isDuplicate) {
    alert("同じタスクが既に存在します");
    return;
  }

  // 全てのチェックをパスしたら保存
  let targetTask = tasks.find(function(task) {
    return task.id === id;
  });

  if (targetTask) {
    targetTask.text = newText;
    editingId = null;
    showTasks();
  }
}
```

---

## 5. 完全なコード例

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TODOアプリ - 編集機能</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>✏️ TODOアプリ - 編集機能</h1>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="新しいタスクを入力">
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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.container {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  padding: 30px;
  width: 100%;
  max-width: 600px;
}

h1 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 24px;
}

.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

#taskInput {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

#taskInput:focus {
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
  font-weight: bold;
  transition: background-color 0.3s;
}

#addButton:hover {
  background-color: #5568d3;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
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
  font-size: 16px;
  color: #333;
}

.edit-input {
  flex: 1;
  padding: 8px;
  border: 2px solid #667eea;
  border-radius: 4px;
  font-size: 14px;
  background-color: #f0f4ff;
}

.edit-input:focus {
  outline: none;
  border-color: #5568d3;
  background-color: white;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.3s;
}

.edit-button {
  background-color: #3b82f6;
  color: white;
}

.edit-button:hover {
  background-color: #2563eb;
}

.save-button {
  background-color: #10b981;
  color: white;
}

.save-button:hover {
  background-color: #059669;
}

.cancel-button {
  background-color: #6b7280;
  color: white;
}

.cancel-button:hover {
  background-color: #4b5563;
}

.delete-button {
  background-color: #ef4444;
  color: white;
}

.delete-button:hover {
  background-color: #dc2626;
}
```

### JavaScript

```javascript
// タスクデータ（オブジェクト配列）
let tasks = [];
let nextId = 1;
let editingId = null;  // 編集中のタスクID

// DOM要素を取得
let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let taskList = document.getElementById("taskList");

// タスクを追加
function addTask() {
  let text = taskInput.value.trim();

  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  // 新しいタスクを作成
  let newTask = {
    id: nextId,
    text: text,
    completed: false
  };

  tasks.push(newTask);
  nextId++;

  taskInput.value = "";
  taskInput.focus();

  showTasks();
}

// タスクを表示
function showTasks() {
  taskList.replaceChildren();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let item = document.createElement("div");
    item.className = "task-item";

    if (editingId === task.id) {
      // 編集モード
      createEditMode(item, task);
    } else {
      // 表示モード
      createDisplayMode(item, task);
    }

    taskList.appendChild(item);
  }
}

// 編集モードのUI作成
function createEditMode(item, task) {
  // 入力フィールド
  let input = document.createElement("input");
  input.type = "text";
  input.value = task.text;
  input.className = "edit-input";

  // Enterキーで保存
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      saveTask(task.id, input.value.trim());
    }
  });

  // 保存ボタン
  let saveButton = document.createElement("button");
  saveButton.textContent = "保存";
  saveButton.className = "save-button";

  saveButton.addEventListener("click", function() {
    saveTask(task.id, input.value.trim());
  });

  // キャンセルボタン
  let cancelButton = document.createElement("button");
  cancelButton.textContent = "キャンセル";
  cancelButton.className = "cancel-button";

  cancelButton.addEventListener("click", function() {
    editingId = null;
    showTasks();
  });

  // DOMに追加
  item.appendChild(input);
  item.appendChild(saveButton);
  item.appendChild(cancelButton);

  // フォーカスを設定
  setTimeout(function() {
    input.focus();
    input.select();
  }, 0);
}

// 表示モードのUI作成
function createDisplayMode(item, task) {
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
  text.textContent = task.text;
  if (task.completed) {
    text.style.textDecoration = "line-through";
    text.style.color = "#999";
  }

  // 編集ボタン
  let editButton = document.createElement("button");
  editButton.textContent = "編集";
  editButton.className = "edit-button";

  editButton.addEventListener("click", function() {
    editingId = task.id;
    showTasks();
  });

  // 削除ボタン
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "削除";
  deleteButton.className = "delete-button";

  deleteButton.addEventListener("click", function() {
    if (confirm("このタスクを削除しますか？")) {
      deleteTask(task.id);
    }
  });

  // DOMに追加
  item.appendChild(checkbox);
  item.appendChild(text);
  item.appendChild(editButton);
  item.appendChild(deleteButton);
}

// タスクを保存
function saveTask(id, newText) {
  // 空欄チェック
  if (newText === "") {
    alert("タスクを入力してください");
    return;
  }

  // タスクを検索
  let targetTask = tasks.find(function(task) {
    return task.id === id;
  });

  if (targetTask) {
    targetTask.text = newText;
    editingId = null;
    showTasks();
  }
}

// タスクを削除
function deleteTask(id) {
  // findIndexでインデックスを検索
  let index = tasks.findIndex(function(task) {
    return task.id === id;
  });

  if (index !== -1) {
    tasks.splice(index, 1);
    showTasks();
  }
}

// 追加ボタンのイベント
addButton.addEventListener("click", addTask);

// Enterキーで追加
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// 初期表示
showTasks();
```

---

## 6. 実践：UI状態遷移を理解する

### 状態遷移図

アプリケーションの状態がどのように変化するかを理解しましょう。

```
状態遷移図:

    [初期状態]
    editingId = null
    全てのタスクが表示モード
         │
         │ ユーザーが[編集]ボタンをクリック
         ↓
    [編集状態]
    editingId = 2
    ID 2 のタスクだけ編集モード
         │
         ├─────────────────┬─────────────┐
         │                 │             │
    [保存]クリック    [キャンセル]   [削除]クリック
         │            クリック         │
         │                 │            │
         ↓                 ↓            ↓
    データ更新        データ維持      タスク削除
    editingId=null   editingId=null  editingId=null
         │                 │            │
         └─────────────────┴────────────┘
                      │
                      ↓
                 [初期状態]に戻る
```

### イベントフロー

編集から保存までのイベントの流れ：

```
[1] ユーザーが[編集]ボタンをクリック
    ↓
    editButton.addEventListener("click") が反応
    ↓
    editingId = task.id; を実行
    ↓
    showTasks(); を実行
    ↓
    画面を再構築
    ↓
    編集モードのUIを表示

[2] ユーザーがテキストを修正
    ↓
    input.value が変更される
    （JavaScriptは何もしない）

[3] ユーザーが[保存]ボタンをクリック
    ↓
    saveButton.addEventListener("click") が反応
    ↓
    saveTask(task.id, input.value.trim()); を実行
    ↓
    配列内のオブジェクトを更新
    ↓
    editingId = null; を実行
    ↓
    showTasks(); を実行
    ↓
    画面を再構築
    ↓
    表示モードのUIを表示
```

### なぜ毎回showTasks()を呼ぶのか？

```javascript
// ❌ 部分的に更新しようとする（難しい）
function startEdit(id) {
  editingId = id;

  // どの要素を変更すればいいか探す必要がある
  let elements = document.querySelectorAll(".task-item");
  for (let i = 0; i < elements.length; i++) {
    // このtask-itemのIDは？
    // 編集モードに切り替える...?
    // 複雑で間違いやすい！
  }
}

// ✅ 全体を再構築する（シンプル）
function startEdit(id) {
  editingId = id;
  showTasks();  // 全体を作り直す
  // シンプルで正確！
}
```

**データ駆動の考え方**
```
従来の方法:
DOM要素を1つずつ手動で更新
→ 複雑で間違いやすい

データ駆動:
データ（tasks配列、editingId）を更新
→ showTasks()で画面全体を再構築
→ データと画面が常に一致
→ シンプルで間違いが少ない
```

---

## 7. 実践問題

### 問題1：基本的な編集機能

メモ帳アプリを作成してください。

**要件**
- メモを追加できる
- 各メモに「編集」ボタンがある
- 編集ボタンをクリックすると入力フィールドが表示される
- 「保存」ボタンで変更を保存
- 「キャンセル」ボタンで編集を中止
- Enterキーで保存できる

**ヒント**
```javascript
let memos = [];
let nextId = 1;
let editingId = null;

function createEditMode(item, memo) {
  let input = document.createElement("input");
  input.value = memo.text;

  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      saveMemo(memo.id, input.value.trim());
    }
  });

  // 保存ボタンとキャンセルボタンを追加...
}
```

**解答例**

```javascript
let memos = [];
let nextId = 1;
let editingId = null;

let memoInput = document.getElementById("memoInput");
let addButton = document.getElementById("addButton");
let memoList = document.getElementById("memoList");

function addMemo() {
  let text = memoInput.value.trim();

  if (text === "") {
    alert("メモを入力してください");
    return;
  }

  memos.push({
    id: nextId,
    text: text
  });

  nextId++;
  memoInput.value = "";
  showMemos();
}

function showMemos() {
  memoList.replaceChildren();

  for (let i = 0; i < memos.length; i++) {
    let memo = memos[i];
    let item = document.createElement("div");
    item.className = "memo-item";

    if (editingId === memo.id) {
      // 編集モード
      let input = document.createElement("input");
      input.value = memo.text;
      input.className = "edit-input";

      input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          saveMemo(memo.id, input.value.trim());
        }
      });

      let saveButton = document.createElement("button");
      saveButton.textContent = "保存";
      saveButton.addEventListener("click", function() {
        saveMemo(memo.id, input.value.trim());
      });

      let cancelButton = document.createElement("button");
      cancelButton.textContent = "キャンセル";
      cancelButton.addEventListener("click", function() {
        editingId = null;
        showMemos();
      });

      item.appendChild(input);
      item.appendChild(saveButton);
      item.appendChild(cancelButton);

      memoList.appendChild(item);

      setTimeout(function() {
        input.focus();
        input.select();
      }, 0);

    } else {
      // 表示モード
      let text = document.createElement("span");
      text.textContent = memo.text;

      let editButton = document.createElement("button");
      editButton.textContent = "編集";
      editButton.addEventListener("click", function() {
        editingId = memo.id;
        showMemos();
      });

      let deleteButton = document.createElement("button");
      deleteButton.textContent = "削除";
      deleteButton.addEventListener("click", function() {
        let index = memos.findIndex(function(m) {
          return m.id === memo.id;
        });
        if (index !== -1) {
          memos.splice(index, 1);
          showMemos();
        }
      });

      item.appendChild(text);
      item.appendChild(editButton);
      item.appendChild(deleteButton);
      memoList.appendChild(item);
    }
  }
}

function saveMemo(id, newText) {
  if (newText === "") {
    alert("メモを入力してください");
    return;
  }

  let targetMemo = memos.find(function(memo) {
    return memo.id === id;
  });

  if (targetMemo) {
    targetMemo.text = newText;
    editingId = null;
    showMemos();
  }
}

addButton.addEventListener("click", addMemo);

memoInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addMemo();
  }
});

showMemos();
```

---

### 問題2：複数フィールドの編集

連絡先管理アプリを作成してください。

**要件**
- 名前と電話番号を追加できる
- 編集モードでは、名前と電話番号の両方を編集できる
- 保存時に両方のフィールドが空でないことを確認
- 電話番号は数字のみ入力できるようにする

**ヒント**
```javascript
let contacts = [
  {id: 1, name: "太郎", phone: "090-1234-5678"},
  {id: 2, name: "花子", phone: "080-9876-5432"}
];

function createEditMode(item, contact) {
  let nameInput = document.createElement("input");
  nameInput.value = contact.name;
  nameInput.placeholder = "名前";

  let phoneInput = document.createElement("input");
  phoneInput.value = contact.phone;
  phoneInput.placeholder = "電話番号";
  phoneInput.type = "tel";

  // 保存時に両方をチェック
  function save() {
    let newName = nameInput.value.trim();
    let newPhone = phoneInput.value.trim();

    if (newName === "" || newPhone === "") {
      alert("名前と電話番号を入力してください");
      return;
    }

    contact.name = newName;
    contact.phone = newPhone;
    editingId = null;
    showContacts();
  }

  // 保存ボタンとキャンセルボタンを追加...
}
```

**解答例**

```javascript
let contacts = [];
let nextId = 1;
let editingId = null;

let nameInput = document.getElementById("nameInput");
let phoneInput = document.getElementById("phoneInput");
let addButton = document.getElementById("addButton");
let contactList = document.getElementById("contactList");

function addContact() {
  let name = nameInput.value.trim();
  let phone = phoneInput.value.trim();

  if (name === "" || phone === "") {
    alert("名前と電話番号を入力してください");
    return;
  }

  contacts.push({
    id: nextId,
    name: name,
    phone: phone
  });

  nextId++;
  nameInput.value = "";
  phoneInput.value = "";
  nameInput.focus();

  showContacts();
}

function showContacts() {
  contactList.replaceChildren();

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let item = document.createElement("div");
    item.className = "contact-item";

    if (editingId === contact.id) {
      // 編集モード
      let nameField = document.createElement("input");
      nameField.value = contact.name;
      nameField.placeholder = "名前";
      nameField.className = "edit-input";

      let phoneField = document.createElement("input");
      phoneField.value = contact.phone;
      phoneField.placeholder = "電話番号";
      phoneField.type = "tel";
      phoneField.className = "edit-input";

      let saveButton = document.createElement("button");
      saveButton.textContent = "保存";
      saveButton.className = "save-button";

      saveButton.addEventListener("click", function() {
        saveContact(contact.id, nameField.value.trim(), phoneField.value.trim());
      });

      let cancelButton = document.createElement("button");
      cancelButton.textContent = "キャンセル";
      cancelButton.className = "cancel-button";

      cancelButton.addEventListener("click", function() {
        editingId = null;
        showContacts();
      });

      item.appendChild(nameField);
      item.appendChild(phoneField);
      item.appendChild(saveButton);
      item.appendChild(cancelButton);

      contactList.appendChild(item);

      setTimeout(function() {
        nameField.focus();
      }, 0);

    } else {
      // 表示モード
      let info = document.createElement("div");
      info.className = "contact-info";

      let nameText = document.createElement("div");
      nameText.textContent = "名前: " + contact.name;
      nameText.className = "contact-name";

      let phoneText = document.createElement("div");
      phoneText.textContent = "電話: " + contact.phone;
      phoneText.className = "contact-phone";

      info.appendChild(nameText);
      info.appendChild(phoneText);

      let editButton = document.createElement("button");
      editButton.textContent = "編集";
      editButton.className = "edit-button";

      editButton.addEventListener("click", function() {
        editingId = contact.id;
        showContacts();
      });

      let deleteButton = document.createElement("button");
      deleteButton.textContent = "削除";
      deleteButton.className = "delete-button";

      deleteButton.addEventListener("click", function() {
        if (confirm("この連絡先を削除しますか？")) {
          let index = contacts.findIndex(function(c) {
            return c.id === contact.id;
          });
          if (index !== -1) {
            contacts.splice(index, 1);
            showContacts();
          }
        }
      });

      item.appendChild(info);
      item.appendChild(editButton);
      item.appendChild(deleteButton);

      contactList.appendChild(item);
    }
  }
}

function saveContact(id, newName, newPhone) {
  if (newName === "" || newPhone === "") {
    alert("名前と電話番号を入力してください");
    return;
  }

  let targetContact = contacts.find(function(contact) {
    return contact.id === id;
  });

  if (targetContact) {
    targetContact.name = newName;
    targetContact.phone = newPhone;
    editingId = null;
    showContacts();
  }
}

addButton.addEventListener("click", addContact);

nameInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    phoneInput.focus();
  }
});

phoneInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addContact();
  }
});

showContacts();
```

---

## まとめ

### 今回学んだこと

1. **オブジェクトのプロパティ更新**
   ```javascript
   task.text = "新しいテキスト";
   ```

2. **配列内のオブジェクトを検索して更新**
   ```javascript
   let task = tasks.find(function(t) {
     return t.id === id;
   });
   task.text = newText;
   ```

3. **編集モードの管理**
   ```javascript
   let editingId = null;  // nullは「編集中でない」

   if (editingId === task.id) {
     // 編集モード
   } else {
     // 表示モード
   }
   ```

4. **インライン編集UI**
   - 編集中: 入力フィールド + 保存/キャンセルボタン
   - 通常時: テキスト + 編集ボタン

5. **保存処理**
   ```javascript
   function saveTask(id, newText) {
     if (newText === "") return;  // バリデーション

     let task = tasks.find(t => t.id === id);
     task.text = newText;

     editingId = null;  // 編集モード終了
     showTasks();       // 再表示
   }
   ```

### 重要なパターン

**データ駆動UI更新**
```
データを変更 → showTasks()で画面全体を再構築
```

このパターンにより：
- データと画面が常に一致
- コードがシンプルになる
- バグが減る

**状態管理**
```
editingId で現在の状態を管理
→ UIはeditingIdに応じて切り替わる
```

### カリキュラム要件チェック

レッスン108の要件：

✅ **タスクの編集**
   - オブジェクトのプロパティを更新
   - find()で対象のタスクを検索
   - テキストを保存

✅ **インライン編集**
   - 編集モードと表示モードのUI切り替え
   - 入力フィールドの動的表示
   - フォーカスとselect()で使いやすさ向上

✅ **保存とキャンセル**
   - 保存ボタンで変更を確定
   - キャンセルボタンで変更を破棄
   - 空欄チェックなどのバリデーション

✅ **【知識】編集モード、UIの状態遷移**
   - editingIdによる状態管理
   - 状態に応じたUI切り替え
   - データ駆動のUI更新パターン

### 次のレッスンの予告

次のレッスンでは、**週のまとめ**として、これまで学んだ全機能を統合します：

- タスクの追加・削除
- 完了/未完了の管理（チェックボックス）
- フィルタリング（全て/完了のみ/未完了のみ）
- ソート（日付順、優先度順、名前順）
- **編集機能（今回学んだこと）**

これらを組み合わせた**完全なTODOアプリ**を作成します！
