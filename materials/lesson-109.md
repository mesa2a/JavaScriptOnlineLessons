---
title: "週のまとめ - 完成版TODOアプリ"
lesson: 109
date: "2025-11-26"
description: "これまで学んだ全機能を統合し、本格的なTODOアプリを完成させます"
objectives:
  - "複数の機能を統合できる"
  - "オブジェクト配列で複雑なアプリを作成できる"
  - "ユーザー体験を向上させる工夫ができる"
  - "バグ修正とUI改善ができる"
duration: 30
---

# レッスン109: 週のまとめ - 完成版TODOアプリ

## このレッスンで学ぶこと

### これまでの復習

レッスン102-108で学んだ機能を振り返りましょう：

**レッスン102：タスク表示**
- 配列のデータをDOM要素として表示
- 番号付きリスト、見やすい整形

**レッスン103：タスク削除**
- splice()で配列から要素を削除
- findIndex()でIDから削除対象を検索

**レッスン104：オブジェクト配列**
- `{id: 1, text: "買い物", completed: false}` 形式
- 複雑なデータをまとめて管理

**レッスン105：状態管理**
- completedプロパティで完了/未完了を管理
- チェックボックスで状態を切り替え

**レッスン106：フィルタリング**
- 全て/完了のみ/未完了のみを切り替え
- filter()メソッドで条件に合うタスクを抽出

**レッスン107：ソート機能**
- sort()メソッドで並び替え
- 日付順、優先度順、名前順

**レッスン108：編集機能**
- インライン編集UI
- 編集モードと表示モードの切り替え
- 保存とキャンセル

### よくある場面

実際のアプリ開発では：

```
プロジェクトマネージャー：
「各機能は動いているけど、
統合すると動かなくなった...」

開発者：
「フィルタリングとソートを
同時に使うとバグが出る...」

ユーザー：
「操作性がバラバラで使いにくい」
```

このような問題を解決するのが**統合とUI改善**です。

### 学習目標

今回のレッスンでは、以下のことを学びます：

1. **全機能の統合**
   - 追加・削除・編集・状態管理
   - フィルタリング・ソート
   - すべてが連携して動く

2. **バグ修正**
   - 編集中にフィルタリングしたらどうなる？
   - ソート中に削除したらどうなる？
   - エッジケースの対処

3. **UI改善**
   - 統計情報の表示
   - 一括削除機能
   - アクティブボタンの視覚化
   - ユーザー体験の向上

4. **アプリケーション開発の流れ**
   - 機能ごとに開発 → 統合 → テスト → 改善
   - 実践的な開発プロセス

---

## 1. 実装する機能一覧

### 基本機能（CRUD）

**C: Create（作成）**
```javascript
// タスクの追加（レッスン102）
tasks.push({
  id: nextId,
  text: "新しいタスク",
  completed: false
});
```

**R: Read（読み取り）**
```javascript
// タスクの表示（レッスン102）
showTasks();  // 配列をDOMに表示
```

**U: Update（更新）**
```javascript
// 状態の更新（レッスン105）
task.completed = !task.completed;

// テキストの編集（レッスン108）
task.text = "新しいテキスト";
```

**D: Delete（削除）**
```javascript
// タスクの削除（レッスン103）
tasks.splice(index, 1);
```

### 表示制御機能

**フィルタリング（レッスン106）**
```javascript
// 全て / 未完了のみ / 完了のみ
let filteredTasks = tasks.filter(function(task) {
  if (filterMode === "all") return true;
  if (filterMode === "active") return !task.completed;
  if (filterMode === "completed") return task.completed;
});
```

**ソート（レッスン107）**
```javascript
// 追加順 / 名前順 / 日付順
tasks.sort(function(a, b) {
  return a.text.localeCompare(b.text);
});
```

### UI改善機能（今回追加）

**統計情報**
```javascript
// 全体: 5件 | 未完了: 3件 | 完了: 2件
```

**一括削除**
```javascript
// 完了済みタスクをまとめて削除
```

**ボタンの状態表示**
```javascript
// アクティブなフィルタ/ソートボタンをハイライト
```

---

## 2. データ構造の設計

### オブジェクト配列で管理

```javascript
// タスクデータ（オブジェクト配列）
let tasks = [
  {
    id: 1,
    text: "買い物に行く",
    completed: false
  },
  {
    id: 2,
    text: "レポートを書く",
    completed: true
  },
  {
    id: 3,
    text: "部屋を掃除する",
    completed: false
  }
];

let nextId = 4;  // 次に追加するタスクのID
```

**視覚化：データ構造**
```
tasks配列:
┌─────────────────────────────────────┐
│ [0] {                               │
│       id: 1,                        │
│       text: "買い物に行く",         │
│       completed: false              │
│     }                               │
├─────────────────────────────────────┤
│ [1] {                               │
│       id: 2,                        │
│       text: "レポートを書く",       │
│       completed: true               │
│     }                               │
├─────────────────────────────────────┤
│ [2] {                               │
│       id: 3,                        │
│       text: "部屋を掃除する",       │
│       completed: false              │
│     }                               │
└─────────────────────────────────────┘
```

### 状態管理用の変数

```javascript
// 表示モード管理
let filterMode = "all";      // "all", "active", "completed"
let sortMode = "addOrder";   // "addOrder", "name"
let editingId = null;        // 編集中のタスクID（nullは「編集中でない」）
```

**状態の組み合わせ**
```
例1: 全タスクを追加順で表示、編集中なし
  filterMode = "all"
  sortMode = "addOrder"
  editingId = null

例2: 未完了タスクを名前順で表示、ID=2を編集中
  filterMode = "active"
  sortMode = "name"
  editingId = 2
```

---

## 3. 機能の統合実装

### タスク追加機能

```javascript
function addTask() {
  let text = taskInput.value.trim();

  // 空欄チェック
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

  // 配列に追加
  tasks.push(newTask);
  nextId++;

  // 入力欄をクリア
  taskInput.value = "";
  taskInput.focus();

  // 画面を更新
  showTasks();
  updateStats();  // 統計情報を更新
}
```

**実行の流れ**
```
ユーザーが「牛乳を買う」と入力して[追加]をクリック

ステップ1: text = "牛乳を買う" を取得

ステップ2: 空欄チェック
  text === ""? → false → OK

ステップ3: 新しいオブジェクトを作成
  newTask = {
    id: 4,
    text: "牛乳を買う",
    completed: false
  }

ステップ4: 配列に追加
  tasks.push(newTask)
  tasks.length: 3 → 4

ステップ5: nextIdをインクリメント
  nextId: 4 → 5

ステップ6: 画面を更新
  showTasks()  → DOM要素を再構築
  updateStats() → 統計情報を更新

結果:
  画面に新しいタスクが表示される
  「全体: 4件 | 未完了: 3件 | 完了: 1件」に更新
```

### フィルタリング + ソート + 表示

```javascript
function showTasks() {
  // 1. フィルタリング
  let filteredTasks = tasks.filter(function(task) {
    if (filterMode === "all") {
      return true;  // 全て表示
    } else if (filterMode === "active") {
      return !task.completed;  // 未完了のみ
    } else if (filterMode === "completed") {
      return task.completed;  // 完了のみ
    }
  });

  // 2. ソート（元の配列は変更せず、コピーをソート）
  let sortedTasks = filteredTasks.slice();  // 配列をコピー

  if (sortMode === "name") {
    sortedTasks.sort(function(a, b) {
      return a.text.localeCompare(b.text);
    });
  }
  // addOrderの場合は何もしない（元の順序）

  // 3. 表示
  taskList.replaceChildren();  // 既存の表示をクリア

  for (let i = 0; i < sortedTasks.length; i++) {
    let task = sortedTasks[i];

    if (editingId === task.id) {
      // 編集モード
      createEditMode(task);
    } else {
      // 表示モード
      createDisplayMode(task);
    }
  }

  // 4. ボタンの状態を更新
  updateButtonStates();
}
```

**視覚化：フィルタリング→ソート→表示の流れ**
```
[1] 元の配列
tasks = [
  {id: 1, text: "買い物", completed: false},
  {id: 2, text: "掃除", completed: true},
  {id: 3, text: "勉強", completed: false},
  {id: 4, text: "洗濯", completed: false}
]
         ↓
[2] フィルタリング（filterMode = "active"）
filteredTasks = [
  {id: 1, text: "買い物", completed: false},
  {id: 3, text: "勉強", completed: false},
  {id: 4, text: "洗濯", completed: false}
]
         ↓
[3] ソート（sortMode = "name"）
sortedTasks = [
  {id: 1, text: "買い物", completed: false},
  {id: 3, text: "勉強", completed: false},
  {id: 4, text: "洗濯", completed: false}
]
         ↓
[4] DOM表示
┌────────────────────────────┐
│ □ 買い物   [編集] [削除]   │
│ □ 勉強     [編集] [削除]   │
│ □ 洗濯     [編集] [削除]   │
└────────────────────────────┘
```

**重要：配列のコピー**
```javascript
// ❌ 元の配列を直接ソート（元の配列が変わってしまう）
let sortedTasks = filteredTasks;
sortedTasks.sort(...);  // filteredTasksも変わる

// ✅ 配列をコピーしてからソート（元の配列は変わらない）
let sortedTasks = filteredTasks.slice();
sortedTasks.sort(...);  // filteredTasksは変わらない
```

### 編集機能（統合版）

```javascript
function createEditMode(task) {
  let item = document.createElement("div");
  item.className = "task-item editing";

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
  taskList.appendChild(item);

  // フォーカスを設定
  setTimeout(function() {
    input.focus();
    input.select();
  }, 0);
}

function createDisplayMode(task) {
  let item = document.createElement("div");
  item.className = "task-item";

  // チェックボックス
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  checkbox.addEventListener("change", function() {
    task.completed = checkbox.checked;
    showTasks();
    updateStats();
  });

  // テキスト
  let text = document.createElement("span");
  text.textContent = task.text;
  text.className = "task-text";

  if (task.completed) {
    text.classList.add("completed");
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
  taskList.appendChild(item);
}

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

function deleteTask(id) {
  // インデックスを検索
  let index = tasks.findIndex(function(task) {
    return task.id === id;
  });

  if (index !== -1) {
    tasks.splice(index, 1);

    // 編集中のタスクが削除された場合
    if (editingId === id) {
      editingId = null;
    }

    showTasks();
    updateStats();
  }
}
```

---

## 4. UI改善機能の実装

### 統計情報の表示

```javascript
function updateStats() {
  // タスク数をカウント
  let total = tasks.length;
  let completed = 0;
  let active = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed) {
      completed++;
    } else {
      active++;
    }
  }

  // 統計情報を表示
  statsDiv.textContent = `全体: ${total}件 | 未完了: ${active}件 | 完了: ${completed}件`;
}
```

**実行例**
```
tasks = [
  {id: 1, text: "買い物", completed: false},
  {id: 2, text: "掃除", completed: true},
  {id: 3, text: "勉強", completed: false},
  {id: 4, text: "洗濯", completed: true}
]

updateStats() を実行:

ステップ1: 初期値を設定
  total = 4
  completed = 0
  active = 0

ステップ2: ループで各タスクをチェック
  i=0: tasks[0].completed = false → active++ → active=1
  i=1: tasks[1].completed = true  → completed++ → completed=1
  i=2: tasks[2].completed = false → active++ → active=2
  i=3: tasks[3].completed = true  → completed++ → completed=2

ステップ3: 表示を更新
  statsDiv.textContent = "全体: 4件 | 未完了: 2件 | 完了: 2件"

画面表示:
┌────────────────────────────────────┐
│ 全体: 4件 | 未完了: 2件 | 完了: 2件 │
└────────────────────────────────────┘
```

### 一括削除機能

```javascript
function clearCompleted() {
  // 完了済みタスクがあるかチェック
  let hasCompleted = tasks.some(function(task) {
    return task.completed;
  });

  if (!hasCompleted) {
    alert("完了済みのタスクがありません");
    return;
  }

  // 確認ダイアログ
  if (!confirm("完了済みのタスクをすべて削除しますか？")) {
    return;
  }

  // 完了していないタスクだけを残す
  tasks = tasks.filter(function(task) {
    return !task.completed;
  });

  // 編集中のタスクが削除された可能性があるのでリセット
  editingId = null;

  // 画面を更新
  showTasks();
  updateStats();
}
```

**実行の流れ**
```
初期状態:
tasks = [
  {id: 1, text: "買い物", completed: false},
  {id: 2, text: "掃除", completed: true},
  {id: 3, text: "勉強", completed: false},
  {id: 4, text: "洗濯", completed: true}
]

clearCompleted() を実行:

ステップ1: 完了済みタスクをチェック
  some()で確認 → completed=true のタスクがある → OK

ステップ2: 確認ダイアログ
  「完了済みのタスクをすべて削除しますか？」
  → ユーザーが[OK]をクリック

ステップ3: フィルタリング
  tasks.filter(function(task) {
    return !task.completed;
  })

  内部処理:
    task={id:1, completed:false} → !false=true → 残す
    task={id:2, completed:true}  → !true=false → 削除
    task={id:3, completed:false} → !false=true → 残す
    task={id:4, completed:true}  → !true=false → 削除

  結果:
    tasks = [
      {id: 1, text: "買い物", completed: false},
      {id: 3, text: "勉強", completed: false}
    ]

ステップ4: 画面を更新
  showTasks()   → 残ったタスクだけ表示
  updateStats() → 「全体: 2件 | 未完了: 2件 | 完了: 0件」
```

### ボタンの状態表示

```javascript
function updateButtonStates() {
  // フィルタボタンの状態
  let filterButtons = {
    all: document.getElementById("filterAll"),
    active: document.getElementById("filterActive"),
    completed: document.getElementById("filterCompleted")
  };

  // すべてのフィルタボタンから active クラスを削除
  for (let key in filterButtons) {
    filterButtons[key].classList.remove("active");
  }

  // 現在のフィルタモードのボタンに active クラスを追加
  filterButtons[filterMode].classList.add("active");

  // ソートボタンの状態
  let sortButtons = {
    addOrder: document.getElementById("sortAddOrder"),
    name: document.getElementById("sortName")
  };

  // すべてのソートボタンから active クラスを削除
  for (let key in sortButtons) {
    sortButtons[key].classList.remove("active");
  }

  // 現在のソートモードのボタンに active クラスを追加
  sortButtons[sortMode].classList.add("active");
}
```

**視覚化：ボタンの状態変化**
```
filterMode = "active" のとき:

┌────────────────────────────────────┐
│ [全て] [未完了] [完了済み]         │
│         ↑                          │
│      ハイライト                    │
└────────────────────────────────────┘

CSS:
.filter-button.active {
  background-color: #667eea;
  color: white;
  font-weight: bold;
}
```

---

## 5. バグ修正とエッジケース

### エッジケース1：編集中にフィルタリング

```javascript
// 問題：
// 1. ID=2のタスクを編集中（editingId = 2）
// 2. フィルタを「完了のみ」に変更
// 3. ID=2のタスクが未完了なので表示から消える
// 4. でもeditingId=2のまま
// 5. フィルタを「全て」に戻すと、ID=2が編集モードのまま表示される

// 解決策：フィルタ変更時に編集モードを終了
function setFilter(mode) {
  filterMode = mode;
  editingId = null;  // 編集モードをリセット
  showTasks();
  updateButtonStates();
}
```

### エッジケース2：編集中に削除

```javascript
// 問題：
// 1. ID=2のタスクを編集中（editingId = 2）
// 2. 別のタブやウィンドウでID=2のタスクを削除
// 3. editingId=2のままだが、該当するタスクがない

// 解決策：削除時にeditingIdをチェック
function deleteTask(id) {
  let index = tasks.findIndex(function(task) {
    return task.id === id;
  });

  if (index !== -1) {
    tasks.splice(index, 1);

    // 編集中のタスクが削除された場合
    if (editingId === id) {
      editingId = null;
    }

    showTasks();
    updateStats();
  }
}
```

### エッジケース3：ソート中に編集

```javascript
// 問題：
// 1. 名前順でソート
// 2. タスクを編集して名前を変更
// 3. 保存すると順序が変わるべき

// 解決策：保存後に自動的にshowTasks()を呼ぶ
function saveTask(id, newText) {
  if (newText === "") {
    alert("タスクを入力してください");
    return;
  }

  let targetTask = tasks.find(function(task) {
    return task.id === id;
  });

  if (targetTask) {
    targetTask.text = newText;
    editingId = null;
    showTasks();  // ソートが再適用される
  }
}
```

---

## 6. 完全なコード例

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>完成版TODOアプリ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>✅ TODO管理アプリ</h1>

    <!-- タスク追加エリア -->
    <div class="input-area">
      <input type="text" id="taskInput" placeholder="新しいタスクを入力してください">
      <button id="addButton">追加</button>
    </div>

    <!-- 統計情報 -->
    <div id="stats" class="stats"></div>

    <!-- コントロールエリア -->
    <div class="controls">
      <!-- フィルタボタン -->
      <div class="control-group">
        <label>表示:</label>
        <button id="filterAll" class="filter-button">全て</button>
        <button id="filterActive" class="filter-button">未完了</button>
        <button id="filterCompleted" class="filter-button">完了済み</button>
      </div>

      <!-- ソートボタン -->
      <div class="control-group">
        <label>並び順:</label>
        <button id="sortAddOrder" class="sort-button">追加順</button>
        <button id="sortName" class="sort-button">名前順</button>
      </div>

      <!-- 一括削除ボタン -->
      <button id="clearCompleted" class="clear-button">完了済みを削除</button>
    </div>

    <!-- タスクリスト -->
    <div id="taskList"></div>

    <!-- 空の状態メッセージ -->
    <div id="emptyMessage" class="empty-message" style="display: none;">
      タスクがありません。上の入力欄から追加してください。
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### CSS

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  padding: 40px;
  width: 100%;
  max-width: 800px;
}

h1 {
  color: #333;
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
}

/* 入力エリア */
.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

#taskInput {
  flex: 1;
  padding: 14px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

#taskInput:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

#addButton {
  padding: 14px 30px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

#addButton:hover {
  background-color: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* 統計情報 */
.stats {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: bold;
  color: #555;
}

/* コントロールエリア */
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 25px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-group label {
  font-size: 14px;
  font-weight: bold;
  color: #666;
}

button {
  padding: 8px 16px;
  border: 2px solid #ddd;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s;
}

button:hover {
  background-color: #f5f5f5;
  transform: translateY(-1px);
}

.filter-button.active,
.sort-button.active {
  background-color: #667eea;
  color: white;
  border-color: #667eea;
}

.clear-button {
  margin-left: auto;
  background-color: #ef4444;
  color: white;
  border-color: #ef4444;
}

.clear-button:hover {
  background-color: #dc2626;
  border-color: #dc2626;
}

/* タスクリスト */
#taskList {
  margin-top: 20px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #eee;
  transition: all 0.2s;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.task-item:hover {
  background-color: #f9f9f9;
}

.task-item.editing {
  background-color: #f0f4ff;
  border-left: 4px solid #667eea;
}

.task-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-text {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.task-text.completed {
  text-decoration: line-through;
  color: #999;
}

.edit-input {
  flex: 1;
  padding: 10px;
  border: 2px solid #667eea;
  border-radius: 6px;
  font-size: 16px;
  background-color: white;
}

.edit-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.edit-button {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.edit-button:hover {
  background-color: #2563eb;
}

.save-button {
  background-color: #10b981;
  color: white;
  border-color: #10b981;
}

.save-button:hover {
  background-color: #059669;
}

.cancel-button {
  background-color: #6b7280;
  color: white;
  border-color: #6b7280;
}

.cancel-button:hover {
  background-color: #4b5563;
}

.delete-button {
  background-color: #ef4444;
  color: white;
  border-color: #ef4444;
}

.delete-button:hover {
  background-color: #dc2626;
}

/* 空の状態メッセージ */
.empty-message {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 16px;
}

/* レスポンシブ対応 */
@media (max-width: 600px) {
  .container {
    padding: 20px;
  }

  .controls {
    flex-direction: column;
  }

  .control-group {
    width: 100%;
    flex-wrap: wrap;
  }

  .clear-button {
    margin-left: 0;
    width: 100%;
  }
}
```

### JavaScript

```javascript
// タスクデータ（オブジェクト配列）
let tasks = [];
let nextId = 1;

// 表示モード管理
let filterMode = "all";      // "all", "active", "completed"
let sortMode = "addOrder";   // "addOrder", "name"
let editingId = null;        // 編集中のタスクID

// DOM要素を取得
let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let taskList = document.getElementById("taskList");
let statsDiv = document.getElementById("stats");
let emptyMessage = document.getElementById("emptyMessage");

// フィルタボタン
let filterAllBtn = document.getElementById("filterAll");
let filterActiveBtn = document.getElementById("filterActive");
let filterCompletedBtn = document.getElementById("filterCompleted");

// ソートボタン
let sortAddOrderBtn = document.getElementById("sortAddOrder");
let sortNameBtn = document.getElementById("sortName");

// 一括削除ボタン
let clearCompletedBtn = document.getElementById("clearCompleted");

// タスク追加
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
  updateStats();
}

// タスク表示（フィルタ + ソート + 表示）
function showTasks() {
  // 1. フィルタリング
  let filteredTasks = tasks.filter(function(task) {
    if (filterMode === "all") return true;
    if (filterMode === "active") return !task.completed;
    if (filterMode === "completed") return task.completed;
  });

  // 2. ソート（コピーをソート）
  let sortedTasks = filteredTasks.slice();

  if (sortMode === "name") {
    sortedTasks.sort(function(a, b) {
      return a.text.localeCompare(b.text);
    });
  }

  // 3. 表示
  taskList.replaceChildren();

  if (sortedTasks.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";

    for (let i = 0; i < sortedTasks.length; i++) {
      let task = sortedTasks[i];

      if (editingId === task.id) {
        createEditMode(task);
      } else {
        createDisplayMode(task);
      }
    }
  }

  updateButtonStates();
}

// 編集モードのUI
function createEditMode(task) {
  let item = document.createElement("div");
  item.className = "task-item editing";

  let input = document.createElement("input");
  input.type = "text";
  input.value = task.text;
  input.className = "edit-input";

  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      saveTask(task.id, input.value.trim());
    }
  });

  let saveButton = document.createElement("button");
  saveButton.textContent = "保存";
  saveButton.className = "save-button";

  saveButton.addEventListener("click", function() {
    saveTask(task.id, input.value.trim());
  });

  let cancelButton = document.createElement("button");
  cancelButton.textContent = "キャンセル";
  cancelButton.className = "cancel-button";

  cancelButton.addEventListener("click", function() {
    editingId = null;
    showTasks();
  });

  item.appendChild(input);
  item.appendChild(saveButton);
  item.appendChild(cancelButton);
  taskList.appendChild(item);

  setTimeout(function() {
    input.focus();
    input.select();
  }, 0);
}

// 表示モードのUI
function createDisplayMode(task) {
  let item = document.createElement("div");
  item.className = "task-item";

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  checkbox.addEventListener("change", function() {
    task.completed = checkbox.checked;
    showTasks();
    updateStats();
  });

  let text = document.createElement("span");
  text.textContent = task.text;
  text.className = "task-text";

  if (task.completed) {
    text.classList.add("completed");
  }

  let editButton = document.createElement("button");
  editButton.textContent = "編集";
  editButton.className = "edit-button";

  editButton.addEventListener("click", function() {
    editingId = task.id;
    showTasks();
  });

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "削除";
  deleteButton.className = "delete-button";

  deleteButton.addEventListener("click", function() {
    if (confirm("このタスクを削除しますか？")) {
      deleteTask(task.id);
    }
  });

  item.appendChild(checkbox);
  item.appendChild(text);
  item.appendChild(editButton);
  item.appendChild(deleteButton);
  taskList.appendChild(item);
}

// タスク保存
function saveTask(id, newText) {
  if (newText === "") {
    alert("タスクを入力してください");
    return;
  }

  let targetTask = tasks.find(function(task) {
    return task.id === id;
  });

  if (targetTask) {
    targetTask.text = newText;
    editingId = null;
    showTasks();
  }
}

// タスク削除
function deleteTask(id) {
  let index = tasks.findIndex(function(task) {
    return task.id === id;
  });

  if (index !== -1) {
    tasks.splice(index, 1);

    if (editingId === id) {
      editingId = null;
    }

    showTasks();
    updateStats();
  }
}

// 統計情報更新
function updateStats() {
  let total = tasks.length;
  let completed = 0;
  let active = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed) {
      completed++;
    } else {
      active++;
    }
  }

  statsDiv.textContent = `全体: ${total}件 | 未完了: ${active}件 | 完了: ${completed}件`;
}

// ボタンの状態更新
function updateButtonStates() {
  // フィルタボタン
  filterAllBtn.classList.remove("active");
  filterActiveBtn.classList.remove("active");
  filterCompletedBtn.classList.remove("active");

  if (filterMode === "all") filterAllBtn.classList.add("active");
  if (filterMode === "active") filterActiveBtn.classList.add("active");
  if (filterMode === "completed") filterCompletedBtn.classList.add("active");

  // ソートボタン
  sortAddOrderBtn.classList.remove("active");
  sortNameBtn.classList.remove("active");

  if (sortMode === "addOrder") sortAddOrderBtn.classList.add("active");
  if (sortMode === "name") sortNameBtn.classList.add("active");
}

// フィルタ変更
function setFilter(mode) {
  filterMode = mode;
  editingId = null;  // 編集モードをリセット
  showTasks();
}

// ソート変更
function setSort(mode) {
  sortMode = mode;
  showTasks();
}

// 完了済みタスク一括削除
function clearCompleted() {
  let hasCompleted = tasks.some(function(task) {
    return task.completed;
  });

  if (!hasCompleted) {
    alert("完了済みのタスクがありません");
    return;
  }

  if (!confirm("完了済みのタスクをすべて削除しますか？")) {
    return;
  }

  tasks = tasks.filter(function(task) {
    return !task.completed;
  });

  editingId = null;
  showTasks();
  updateStats();
}

// イベントリスナー設定
addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

filterAllBtn.addEventListener("click", function() {
  setFilter("all");
});

filterActiveBtn.addEventListener("click", function() {
  setFilter("active");
});

filterCompletedBtn.addEventListener("click", function() {
  setFilter("completed");
});

sortAddOrderBtn.addEventListener("click", function() {
  setSort("addOrder");
});

sortNameBtn.addEventListener("click", function() {
  setSort("name");
});

clearCompletedBtn.addEventListener("click", clearCompleted);

// 初期表示
showTasks();
updateStats();
```

---

## 7. 実践問題

### 問題1：ローカルストレージ対応

タスクをブラウザのローカルストレージに保存し、ページを再読み込みしてもデータが残るようにしてください。

**ヒント**
```javascript
// 保存
function saveTasks() {
  let json = JSON.stringify(tasks);
  localStorage.setItem("tasks", json);
}

// 読み込み
function loadTasks() {
  let json = localStorage.getItem("tasks");
  if (json) {
    tasks = JSON.parse(json);

    // nextIdを更新
    if (tasks.length > 0) {
      let maxId = Math.max(...tasks.map(t => t.id));
      nextId = maxId + 1;
    }
  }
}

// 初期化時に読み込み
loadTasks();
showTasks();
updateStats();

// タスク追加・削除・編集後に保存
function addTask() {
  // ... タスク追加処理 ...
  saveTasks();  // 追加
}
```

---

### 問題2：優先度機能の追加

各タスクに優先度（高・中・低）を追加してください。

**要件**
- タスク追加時に優先度を選択できる
- 優先度順でソートできる
- 優先度に応じて色分け表示（高=赤、中=黄、低=緑）

**ヒント**
```javascript
// データ構造を拡張
let newTask = {
  id: nextId,
  text: text,
  completed: false,
  priority: "medium"  // "high", "medium", "low"
};

// HTMLに優先度選択を追加
<select id="prioritySelect">
  <option value="high">高</option>
  <option value="medium">中</option>
  <option value="low">低</option>
</select>

// ソート関数
if (sortMode === "priority") {
  let priorityOrder = {high: 3, medium: 2, low: 1};
  sortedTasks.sort(function(a, b) {
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}

// 表示時の色分け
if (task.priority === "high") {
  item.style.borderLeft = "4px solid #ef4444";
} else if (task.priority === "medium") {
  item.style.borderLeft = "4px solid #f59e0b";
} else {
  item.style.borderLeft = "4px solid #10b981";
}
```

---

### 問題3：検索機能の追加

タスクのテキストで検索できる機能を追加してください。

**要件**
- 検索欄に入力すると、該当するタスクのみ表示
- 部分一致で検索
- 大文字小文字を区別しない

**ヒント**
```javascript
let searchText = "";

// 検索欄のイベント
let searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function() {
  searchText = searchInput.value.toLowerCase();
  showTasks();
});

// フィルタリング処理に検索条件を追加
let filteredTasks = tasks.filter(function(task) {
  // フィルタ条件
  let matchFilter = false;
  if (filterMode === "all") matchFilter = true;
  if (filterMode === "active") matchFilter = !task.completed;
  if (filterMode === "completed") matchFilter = task.completed;

  // 検索条件
  let matchSearch = true;
  if (searchText !== "") {
    matchSearch = task.text.toLowerCase().includes(searchText);
  }

  return matchFilter && matchSearch;
});
```

---

## まとめ

### 今週学んだこと（レッスン102-109）

**レッスン102：タスク表示**
- 配列データのDOM表示
- replaceChildren()で表示をクリア

**レッスン103：タスク削除**
- splice()で配列から削除
- findIndex()でIDから検索

**レッスン104：オブジェクト配列**
- `{id, text, completed}` 形式
- 関連データをまとめて管理

**レッスン105：状態管理**
- completedプロパティ
- チェックボックスで状態切り替え

**レッスン106：フィルタリング**
- filter()メソッド
- 条件に合うタスクを抽出

**レッスン107：ソート機能**
- sort()メソッド
- localeCompare()で文字列比較

**レッスン108：編集機能**
- インライン編集UI
- 編集モード/表示モードの切り替え

**レッスン109：全機能統合**
- CRUD操作の完成
- UI改善（統計、一括削除）
- バグ修正とエッジケース対応

### 重要なパターン

**1. データ駆動UI**
```javascript
データを変更 → showTasks()で画面全体を再構築
```

**2. filter + sort + display のパイプライン**
```javascript
tasks → filter() → slice() → sort() → 表示
```

**3. 状態管理**
```javascript
filterMode, sortMode, editingId で状態を管理
→ UIは状態に応じて変化
```

### カリキュラム要件チェック

レッスン109の要件：

✅ **全機能統合**
   - 追加・削除・編集・状態管理を統合
   - フィルタリング・ソート機能の統合
   - すべての機能が連携して動作

✅ **バグ修正**
   - 編集中にフィルタリングするケース
   - 編集中に削除するケース
   - ソート中に編集するケース
   - エッジケースを網羅的に対処

✅ **UI改善**
   - 統計情報の表示（全体・未完了・完了）
   - 一括削除機能（完了済みタスク）
   - アクティブボタンのハイライト
   - 空の状態メッセージ

✅ **【知識】アプリケーション開発、統合テスト**
   - 機能ごとに開発→統合→テスト→改善のサイクル
   - エッジケースの洗い出しと対処
   - ユーザー体験を考慮したUI設計

### 完成版アプリの特徴

1. **完全なCRUD操作**
   - Create: タスク追加
   - Read: タスク表示（フィルタ・ソート対応）
   - Update: 状態変更・テキスト編集
   - Delete: タスク削除・一括削除

2. **柔軟な表示制御**
   - フィルタリング（全て/未完了/完了）
   - ソート（追加順/名前順）
   - 組み合わせ可能

3. **優れたUX**
   - 統計情報でタスク状況を把握
   - アクティブボタンで現在の設定が分かる
   - 確認ダイアログで誤操作を防止
   - フォーカス制御で入力がスムーズ

### 次のステップへ

おめでとうございます！第9章「配列で複数データ管理」を完了しました！

オブジェクト配列を使って本格的なアプリケーションを作成できるようになりました。

次の章では、**関数**について学びます：
- 関数の定義と呼び出し
- 引数と戻り値
- スコープとクロージャ
- コールバック関数

関数を使うと、コードを整理して再利用しやすくできます！
