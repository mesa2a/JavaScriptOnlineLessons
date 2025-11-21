---
title: "状態管理"
lesson: 105
description: "並列配列で状態（完了/未完了）を管理し、チェックボックスで切り替える方法を学びます"
objectives:
  - "並列配列で状態を管理できる"
  - "チェックボックスの状態とデータを同期できる"
  - "状態の切り替え処理を実装できる"
duration: 30
---

# 状態管理

## 今回の学習

並列配列に**状態**を持たせる方法を学びます。TODOアプリで完了/未完了を管理するために、完了状態用の配列を追加し、チェックボックスで切り替えます。

---

## 1. 状態とは

**状態**とは、データが持つ「今の様子」を表す情報です。

```javascript
// 並列配列で管理
let todoTexts = ["買い物に行く"];
let todoCompleted = [false];  // 状態を管理する配列

// インデックス0のタスク: "買い物に行く"、完了状態false
```

### よく使われる状態

```javascript
// 完了/未完了
false, true

// 表示/非表示
true, false

// 有効/無効
true, false

// 選択中/非選択
false, true
```

---

## 2. 完了状態の配列を追加

TODOリストに完了状態を並列配列で管理します。

```javascript
let todoIds = [];
let todoTexts = [];
let todoCompleted = [];  // 新しい配列: 完了状態
let nextId = 1;

addButton.addEventListener("click", function() {
  let text = todoInput.value.trim();

  if (text === "") {
    return;
  }

  // 3つの配列全てに追加
  todoIds.push(nextId);
  todoTexts.push(text);
  todoCompleted.push(false);  // 最初は未完了

  nextId++;
  todoInput.value = "";
  showTodos();
});
```

### 並列配列の同期

```javascript
// すべての配列の長さを揃える
todoIds.length === todoTexts.length === todoCompleted.length  // 必ずtrue
```

---

## 3. チェックボックスの作成

完了状態を切り替えるためのチェックボックスを作成します。

```javascript
function showTodos() {
  todoList.replaceChildren();

  for (let i = 0; i < todoTexts.length; i++) {
    let item = document.createElement("div");

    // チェックボックスを作成
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todoCompleted[i];  // 配列から状態を取得

    let text = document.createElement("span");
    text.textContent = todoTexts[i];

    item.appendChild(checkbox);
    item.appendChild(text);
    todoList.appendChild(item);
  }
}
```

### チェックボックスのプロパティ

```javascript
// type属性を設定
checkbox.type = "checkbox";

// チェック状態を設定
checkbox.checked = true;   // チェック済み
checkbox.checked = false;  // 未チェック
```

---

## 4. 状態の切り替え

チェックボックスがクリックされたときに、状態を切り替えます。

```javascript
function showTodos() {
  todoList.replaceChildren();

  for (let i = 0; i < todoTexts.length; i++) {
    let item = document.createElement("div");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todoCompleted[i];

    // チェックボックスがクリックされたとき
    // インデックスを保存しておく必要がある
    let index = i;
    checkbox.addEventListener("click", function() {
      // 配列の値を反転
      todoCompleted[index] = !todoCompleted[index];
      showTodos();
    });

    let text = document.createElement("span");
    text.textContent = todoTexts[i];

    item.appendChild(checkbox);
    item.appendChild(text);
    todoList.appendChild(item);
  }
}
```

### トグル処理の仕組み

```javascript
// !演算子で反転
todoCompleted[index] = !todoCompleted[index];

// falseの場合
false → !false → true

// trueの場合
true → !true → false
```

### インデックスを保存する理由

```javascript
// ❌ 間違い: iをそのまま使う
for (let i = 0; i < todoTexts.length; i++) {
  checkbox.addEventListener("click", function() {
    todoCompleted[i] = !todoCompleted[i];  // iは常に最後の値
  });
}

// ⭕ 正しい: インデックスを変数に保存
for (let i = 0; i < todoTexts.length; i++) {
  let index = i;  // この値が保存される
  checkbox.addEventListener("click", function() {
    todoCompleted[index] = !todoCompleted[index];
  });
}
```

---

## 5. 完了済みタスクの見た目を変える

CSSで完了済みタスクに取り消し線を表示します。

### JavaScript側でクラスを追加

```javascript
let text = document.createElement("span");
text.textContent = todoTexts[i];

// 完了済みの場合、クラスを追加
if (todoCompleted[i]) {
  text.classList.add("completed");
}
```

### CSS側でスタイルを設定

```css
.completed {
  text-decoration: line-through;  /* 取り消し線 */
  color: #999;                     /* 灰色にする */
}
```

---

## 6. 削除時の注意

並列配列では、**すべての配列から同じインデックスを削除**する必要があります。

```javascript
function deleteTodo(index) {
  // 3つの配列すべてから削除
  todoIds.splice(index, 1);
  todoTexts.splice(index, 1);
  todoCompleted.splice(index, 1);
  showTodos();
}
```

---

## 7. 実践例：タスク管理アプリ

完了/未完了を切り替えられるTODOアプリを作成します。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>タスク管理</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>タスク管理</h1>

    <div class="input-area">
      <input type="text" id="todoInput" placeholder="新しいタスクを入力">
      <button id="addButton">追加</button>
    </div>

    <div id="todoList"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### CSS

```css
body {
  font-family: sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
  margin-top: 0;
}

.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

#todoInput {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

#addButton {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#addButton:hover {
  background-color: #45a049;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-item input[type="checkbox"] {
  cursor: pointer;
}

.todo-item span {
  flex: 1;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

.delete-button {
  padding: 4px 8px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.delete-button:hover {
  background-color: #da190b;
}
```

### JavaScript

```javascript
// 並列配列でデータを管理
let todoIds = [];
let todoTexts = [];
let todoCompleted = [];
let nextId = 1;

let todoInput = document.getElementById("todoInput");
let addButton = document.getElementById("addButton");
let todoList = document.getElementById("todoList");

// タスクを追加
addButton.addEventListener("click", function() {
  let text = todoInput.value.trim();

  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  // 3つの配列全てに追加
  todoIds.push(nextId);
  todoTexts.push(text);
  todoCompleted.push(false);  // 最初は未完了

  nextId++;
  todoInput.value = "";
  todoInput.focus();
  showTodos();
});

// Enterキーで追加
todoInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

// タスクを表示
function showTodos() {
  todoList.replaceChildren();

  for (let i = 0; i < todoTexts.length; i++) {
    let item = document.createElement("div");
    item.className = "todo-item";

    // チェックボックス
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todoCompleted[i];

    // 状態を切り替える（インデックスを保存）
    let index = i;
    checkbox.addEventListener("click", function() {
      todoCompleted[index] = !todoCompleted[index];
      showTodos();
    });

    // テキスト
    let text = document.createElement("span");
    text.textContent = todoTexts[i];

    // 完了済みの場合、クラスを追加
    if (todoCompleted[i]) {
      text.classList.add("completed");
    }

    // 削除ボタン
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function() {
      // 3つの配列すべてから削除
      todoIds.splice(index, 1);
      todoTexts.splice(index, 1);
      todoCompleted.splice(index, 1);
      showTodos();
    });

    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(deleteButton);
    todoList.appendChild(item);
  }
}
```

---

## 8. 練習問題

読書リストアプリを作成してください。

### 要件

1. 本のタイトルを入力して追加できる
2. 各本にチェックボックスがある（読了/未読）
3. チェックボックスで読了状態を切り替えられる
4. 読了済みの本は灰色で取り消し線が表示される
5. 削除ボタンで本を削除できる

### ヒント

```javascript
// 並列配列で管理
let bookIds = [];
let bookTitles = [];
let bookCompleted = [];  // 読了状態

// 追加
bookIds.push(nextId);
bookTitles.push("ハリー・ポッター");
bookCompleted.push(false);

// 状態の切り替え
bookCompleted[index] = !bookCompleted[index];

// 削除
bookIds.splice(index, 1);
bookTitles.splice(index, 1);
bookCompleted.splice(index, 1);
```

---

## まとめ

### 今回学んだこと

- **状態の配列**：`todoCompleted = []`のように別の配列で状態を管理
- **チェックボックス**：`checkbox.type = "checkbox"`と`checkbox.checked`で作成
- **トグル処理**：`!`演算子で状態を反転（`todoCompleted[index] = !todoCompleted[index]`）
- **インデックスの保存**：イベントリスナー内で使うため`let index = i`で保存
- **条件付きスタイル**：状態に応じて`classList.add()`でクラスを追加
- **並列配列の削除**：すべての配列から同じインデックスを削除

### 重要なポイント

- 状態はboolean型（`true`/`false`）の配列で管理する
- チェックボックスの`checked`プロパティと状態を同期させる
- イベントリスナー内でインデックスを使うときは、必ず`let index = i`で保存する
- 状態が変わったら`showTodos()`を呼んで再表示する
- 削除時は必ず全ての並列配列から同時に削除する

### 並列配列での状態管理の難しさ

並列配列で状態を管理すると、以下のような問題があります：

- 配列が増えるほど管理が複雑になる（今回は3つの配列）
- インデックスの保存を忘れるとバグになりやすい
- 削除時にすべての配列を更新し忘れるとデータが壊れる

この不便さを経験することで、**レッスン134以降で学ぶオブジェクト**の便利さを実感できます。オブジェクトを使えば、関連するデータを1つにまとめて管理できるようになります。

次のレッスンでは、**フィルタリング**について学びます。並列配列を使って、完了済み・未完了・全てを切り替えて表示する方法を学習します。
