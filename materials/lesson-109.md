---
title: "週のまとめ - 完成版TODOアプリ"
lesson: 109
description: "これまで学んだ全機能を統合し、本格的なTODOアプリを完成させます"
objectives:
  - "複数の機能を統合できる"
  - "並列配列で複雑なアプリを作成できる"
  - "ユーザー体験を向上させる工夫ができる"
duration: 30
---

# 週のまとめ - 完成版TODOアプリ

## 今回の学習

これまで学んだ全ての機能を統合して、**完成版TODOアプリ**を作成します。追加・削除・編集・状態管理・フィルタリング・ソート、すべてが揃った本格的なアプリケーションです。

---

## 1. 実装する機能一覧

### 基本機能
- ✅ タスクの追加（レッスン102）
- ✅ タスクの削除（レッスン103）
- ✅ 完了/未完了の切り替え（レッスン105）
- ✅ タスクの編集（レッスン108）

### 表示制御
- ✅ フィルタリング（全て/未完了/完了済み）（レッスン106）
- ✅ ソート（追加順/名前順）（レッスン107）

### UI改善
- ✅ 空欄チェック
- ✅ 確認ダイアログ
- ✅ フォーカス制御
- ✅ Enterキー対応

---

## 2. データ構造

並列配列でタスクを管理します。

```javascript
// 並列配列でデータを管理
let todoIds = [];        // ID
let todoTexts = [];      // テキスト
let todoCompleted = [];  // 完了状態
let nextId = 1;          // 次のID

// 表示モード管理
let filterMode = "all";     // "all", "active", "completed"
let sortMode = "addOrder";  // "addOrder", "name"
let editingIndex = -1;      // 編集中のインデックス
```

---

## 3. 機能の統合

### タスク追加

```javascript
function addTodo() {
  let text = todoInput.value.trim();

  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  // 3つの配列に追加
  todoIds.push(nextId);
  todoTexts.push(text);
  todoCompleted.push(false);

  nextId++;
  todoInput.value = "";
  todoInput.focus();
  showTodos();
}
```

### フィルタリング + ソート

```javascript
function showTodos() {
  // インデックス配列を作成
  let indices = [];
  for (let i = 0; i < todoTexts.length; i++) {
    indices.push(i);
  }

  // ソート
  if (sortMode === "name") {
    indices.sort(function(a, b) {
      return todoTexts[a].localeCompare(todoTexts[b]);
    });
  }
  // addOrderの場合は何もしない（元の順序）

  // 表示
  todoList.replaceChildren();

  for (let i = 0; i < indices.length; i++) {
    let index = indices[i];

    // フィルタリング
    let shouldShow = false;
    if (filterMode === "all") {
      shouldShow = true;
    } else if (filterMode === "active") {
      shouldShow = !todoCompleted[index];
    } else if (filterMode === "completed") {
      shouldShow = todoCompleted[index];
    }

    if (shouldShow) {
      // DOM要素を作成
      createTodoItem(index);
    }
  }

  updateButtons();
}
```

### 編集機能

```javascript
function createTodoItem(index) {
  let item = document.createElement("div");
  item.className = "todo-item";

  if (editingIndex === index) {
    // 編集モード
    createEditMode(item, index);
  } else {
    // 表示モード
    createViewMode(item, index);
  }

  todoList.appendChild(item);
}

function createEditMode(item, index) {
  let input = document.createElement("input");
  input.type = "text";
  input.value = todoTexts[index];
  input.className = "edit-input";

  let saveButton = document.createElement("button");
  saveButton.textContent = "保存";
  saveButton.addEventListener("click", function() {
    saveTodo(index, input.value.trim());
  });

  let cancelButton = document.createElement("button");
  cancelButton.textContent = "キャンセル";
  cancelButton.addEventListener("click", function() {
    editingIndex = -1;
    showTodos();
  });

  item.appendChild(input);
  item.appendChild(saveButton);
  item.appendChild(cancelButton);

  input.focus();
  input.select();
}

function createViewMode(item, index) {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todoCompleted[index];
  checkbox.addEventListener("click", function() {
    todoCompleted[index] = !todoCompleted[index];
    showTodos();
  });

  let text = document.createElement("span");
  text.textContent = todoTexts[index];
  if (todoCompleted[index]) {
    text.classList.add("completed");
  }

  let editButton = document.createElement("button");
  editButton.textContent = "編集";
  editButton.addEventListener("click", function() {
    editingIndex = index;
    showTodos();
  });

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "削除";
  deleteButton.addEventListener("click", function() {
    deleteTodo(index);
  });

  item.appendChild(checkbox);
  item.appendChild(text);
  item.appendChild(editButton);
  item.appendChild(deleteButton);
}
```

---

## 4. UI改善のポイント

### 統計情報の表示

```javascript
function updateStats() {
  let total = todoTexts.length;
  let completed = 0;
  let active = 0;

  for (let i = 0; i < todoCompleted.length; i++) {
    if (todoCompleted[i]) {
      completed++;
    } else {
      active++;
    }
  }

  statsDiv.textContent = `全体: ${total}件 | 未完了: ${active}件 | 完了: ${completed}件`;
}
```

### 一括削除機能

```javascript
function clearCompleted() {
  if (confirm("完了済みのタスクをすべて削除しますか？")) {
    // 後ろから削除（インデックスがずれないように）
    for (let i = todoTexts.length - 1; i >= 0; i--) {
      if (todoCompleted[i]) {
        todoIds.splice(i, 1);
        todoTexts.splice(i, 1);
        todoCompleted.splice(i, 1);
      }
    }
    showTodos();
  }
}
```

---

## 5. 完成版TODOアプリ

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>完成版TODOアプリ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>✅ TODO管理</h1>

    <!-- タスク追加 -->
    <div class="input-area">
      <input type="text" id="todoInput" placeholder="新しいタスクを入力">
      <button id="addButton">追加</button>
    </div>

    <!-- 統計情報 -->
    <div id="stats" class="stats"></div>

    <!-- コントロール -->
    <div class="controls">
      <!-- フィルタ -->
      <div class="filter-area">
        <button id="filterAll" class="filter-button">全て</button>
        <button id="filterActive" class="filter-button">未完了</button>
        <button id="filterCompleted" class="filter-button">完了済み</button>
      </div>

      <!-- ソート -->
      <div class="sort-area">
        <button id="sortAddOrder" class="sort-button">追加順</button>
        <button id="sortName" class="sort-button">名前順</button>
      </div>

      <!-- 一括削除 -->
      <button id="clearCompleted" class="clear-button">完了済みを削除</button>
    </div>

    <!-- タスクリスト -->
    <div id="todoList"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### CSS（抜粋）

```css
body {
  font-family: sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 700px;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.stats {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  margin-bottom: 15px;
  font-size: 14px;
  color: #666;
}

.controls {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.todo-item.completed-task {
  opacity: 0.6;
}
```

---

## 6. 実装のポイント

### データの整合性

並列配列では、すべての配列の長さが常に同じであることを保証する必要があります。

```javascript
// 追加時: すべての配列に追加
todoIds.push(nextId);
todoTexts.push(text);
todoCompleted.push(false);

// 削除時: すべての配列から削除
todoIds.splice(index, 1);
todoTexts.splice(index, 1);
todoCompleted.splice(index, 1);

// 更新時: 該当する配列を更新
todoTexts[index] = newText;
todoCompleted[index] = !todoCompleted[index];
```

### インデックスの管理

フィルタリングやソートをすると、表示上のインデックスと実際の配列のインデックスが異なります。

```javascript
// インデックス配列を使う
let indices = [0, 1, 2, 3, 4];

// ソート後
indices = [2, 0, 4, 1, 3];

// indices[0] = 2 → todoTexts[2]にアクセス
```

### 削除時の注意

複数削除する場合は、**後ろから削除**してインデックスがずれないようにします。

```javascript
// ✅ 正しい: 後ろから削除
for (let i = todoTexts.length - 1; i >= 0; i--) {
  if (todoCompleted[i]) {
    todoTexts.splice(i, 1);
  }
}

// ❌ 間違い: 前から削除（インデックスがずれる）
for (let i = 0; i < todoTexts.length; i++) {
  if (todoCompleted[i]) {
    todoTexts.splice(i, 1);  // 削除すると次の要素がi番目に来る
  }
}
```

---

## 7. 練習問題

完成版TODOアプリに以下の機能を追加してください。

### 追加機能

1. **優先度管理**
   - 並列配列に`todoPriority`を追加（"high", "normal", "low"）
   - 優先度順でソートできる
   - 優先度によって色分け表示

2. **期限管理**
   - 並列配列に`todoDueDate`を追加
   - 期限順でソートできる
   - 期限が近いタスクを強調表示

3. **カテゴリ管理**
   - 並列配列に`todoCategory`を追加（"仕事", "プライベート", "勉強"など）
   - カテゴリでフィルタリングできる

### ヒント

```javascript
let todoIds = [];
let todoTexts = [];
let todoCompleted = [];
let todoPriority = [];    // 追加
let todoDueDate = [];      // 追加
let todoCategory = [];     // 追加

// 追加時: すべての配列に追加
todoIds.push(nextId);
todoTexts.push(text);
todoCompleted.push(false);
todoPriority.push("normal");
todoDueDate.push(null);
todoCategory.push("プライベート");
```

---

## まとめ

### 今週学んだこと（レッスン104-109）

1. **レッスン104**: 並列配列の基礎
2. **レッスン105**: 状態管理（チェックボックス）
3. **レッスン106**: フィルタリング
4. **レッスン107**: ソート機能
5. **レッスン108**: 編集機能
6. **レッスン109**: 全機能の統合

### 並列配列で学んだこと

- ✅ 複数の配列を同期させてデータを管理
- ✅ インデックスで関連データにアクセス
- ✅ 追加・削除・更新の操作
- ✅ フィルタリングとソートの実装
- ✅ 編集モードの管理

### 並列配列の限界

並列配列でアプリを作ると、以下のような問題に直面します：

1. **配列の数が増えると管理が大変**
   - 5つの配列を同期させるのは困難
   - 追加・削除時にすべての配列を操作する必要がある

2. **コードが複雑になる**
   - インデックスの管理が煩雑
   - バグが発生しやすい

3. **可読性が低い**
   - `todoTexts[i]`より`todo.text`の方が分かりやすい

### 次のステップ

**レッスン134以降でオブジェクトを学ぶと**、これらの問題がすべて解決されます：

```javascript
// オブジェクト配列（レッスン134以降）
let todos = [
  {
    id: 1,
    text: "買い物",
    completed: false,
    priority: "high",
    dueDate: "2024-01-15",
    category: "プライベート"
  }
];

// アクセスが簡単
console.log(todos[0].text);        // "買い物"
console.log(todos[0].priority);    // "high"

// 追加も簡単
todos.push({
  id: 2,
  text: "勉強",
  completed: false,
  priority: "normal",
  dueDate: null,
  category: "勉強"
});
```

並列配列の不便さを経験することで、オブジェクトの価値を深く理解できます。次の章では、関数について学びます。関数を使うと、コードをより整理して再利用しやすくできます。

おめでとうございます！第9章「配列で複数データ管理」を完了しました！
