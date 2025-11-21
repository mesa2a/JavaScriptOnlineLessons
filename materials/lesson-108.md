---
title: "編集機能"
lesson: 108
description: "並列配列のデータを編集し、インライン編集UIを実装する方法を学びます"
objectives:
  - "並列配列のデータを更新できる"
  - "編集モードと表示モードを切り替えられる"
  - "インライン編集UIを実装できる"
duration: 30
---

# 編集機能

## 今回の学習

並列配列で管理しているデータを**編集**する機能を実装します。編集モードと表示モードを切り替え、データを更新して保存する方法を学びます。

---

## 1. データの更新

並列配列のデータを更新するには、インデックスを指定して値を変更します。

```javascript
let todoIds = [1, 2, 3];
let todoTexts = ["買い物", "掃除", "勉強"];

// インデックス1のテキストを変更
todoTexts[1] = "洗濯";

console.log(todoTexts);  // ["買い物", "洗濯", "勉強"]
```

### 全ての並列配列を更新

関連するデータがある場合、必要に応じて複数の配列を更新します。

```javascript
let studentIds = [1, 2, 3];
let studentNames = ["太郎", "花子", "次郎"];
let studentScores = [85, 92, 78];

// インデックス1の学生情報を更新
studentNames[1] = "花子（転校）";
studentScores[1] = 95;

console.log(studentNames[1]);   // "花子（転校）"
console.log(studentScores[1]);  // 95
```

---

## 2. 編集モードの管理

編集モードかどうかを変数で管理します。

```javascript
let todoIds = [1, 2, 3];
let todoTexts = ["買い物", "掃除", "勉強"];
let editingIndex = -1;  // -1は「編集中でない」を表す

// 編集モードに入る
function startEdit(index) {
  editingIndex = index;
  showTodos();
}

// 編集モードを終了
function cancelEdit() {
  editingIndex = -1;
  showTodos();
}
```

---

## 3. インライン編集UI

編集中は入力フィールドを表示し、それ以外はテキストを表示します。

```javascript
function showTodos() {
  todoList.replaceChildren();

  for (let i = 0; i < todoTexts.length; i++) {
    let item = document.createElement("div");
    item.className = "todo-item";

    // 編集中かどうかを判定
    if (editingIndex === i) {
      // 編集モード: 入力フィールドを表示
      let input = document.createElement("input");
      input.type = "text";
      input.value = todoTexts[i];
      input.className = "edit-input";

      let saveButton = document.createElement("button");
      saveButton.textContent = "保存";
      saveButton.className = "save-button";

      let index = i;
      saveButton.addEventListener("click", function() {
        todoTexts[index] = input.value.trim();
        editingIndex = -1;
        showTodos();
      });

      let cancelButton = document.createElement("button");
      cancelButton.textContent = "キャンセル";
      cancelButton.className = "cancel-button";

      cancelButton.addEventListener("click", function() {
        editingIndex = -1;
        showTodos();
      });

      item.appendChild(input);
      item.appendChild(saveButton);
      item.appendChild(cancelButton);
    } else {
      // 表示モード: テキストを表示
      let text = document.createElement("span");
      text.textContent = todoTexts[i];

      let editButton = document.createElement("button");
      editButton.textContent = "編集";
      editButton.className = "edit-button";

      let index = i;
      editButton.addEventListener("click", function() {
        editingIndex = index;
        showTodos();
      });

      item.appendChild(text);
      item.appendChild(editButton);
    }

    todoList.appendChild(item);
  }
}
```

---

## 4. 保存処理

入力フィールドの値を配列に保存します。

```javascript
function saveEdit(index, newValue) {
  // 空欄チェック
  if (newValue === "") {
    alert("テキストを入力してください");
    return;
  }

  // 配列を更新
  todoTexts[index] = newValue;

  // 編集モードを終了
  editingIndex = -1;

  // 再表示
  showTodos();
}
```

---

## 5. Enterキーで保存

入力フィールドでEnterキーを押したときに保存します。

```javascript
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    saveButton.click();
  }
});
```

---

## 6. フォーカスの自動設定

編集モードに入ったときに、入力フィールドにフォーカスを設定します。

```javascript
// 編集モード: 入力フィールドを表示
let input = document.createElement("input");
input.type = "text";
input.value = todoTexts[i];
input.className = "edit-input";

// DOMに追加してからフォーカス
item.appendChild(input);
item.appendChild(saveButton);
item.appendChild(cancelButton);
todoList.appendChild(item);

// フォーカスを設定（最後に実行）
if (editingIndex === i) {
  input.focus();
  input.select();  // テキストを全選択
}
```

---

## 7. 実践例：メモ帳アプリ

編集機能付きのメモ帳アプリを作成します。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>メモ帳</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>📝 メモ帳</h1>

    <div class="input-area">
      <input type="text" id="memoInput" placeholder="新しいメモを入力">
      <button id="addButton">追加</button>
    </div>

    <div id="memoList"></div>
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

#memoInput {
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

.memo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.memo-item span {
  flex: 1;
}

.edit-input {
  flex: 1;
  padding: 6px;
  border: 2px solid #2196F3;
  border-radius: 4px;
  font-size: 14px;
}

.edit-button, .delete-button, .save-button, .cancel-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.edit-button {
  background-color: #2196F3;
  color: white;
}

.edit-button:hover {
  background-color: #1976D2;
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.delete-button:hover {
  background-color: #da190b;
}

.save-button {
  background-color: #4CAF50;
  color: white;
}

.save-button:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: #999;
  color: white;
}

.cancel-button:hover {
  background-color: #777;
}
```

### JavaScript

```javascript
// 並列配列でデータを管理
let memoIds = [];
let memoTexts = [];
let nextId = 1;
let editingIndex = -1;  // -1は「編集中でない」

let memoInput = document.getElementById("memoInput");
let addButton = document.getElementById("addButton");
let memoList = document.getElementById("memoList");

// メモを追加
addButton.addEventListener("click", function() {
  let text = memoInput.value.trim();

  if (text === "") {
    alert("メモを入力してください");
    return;
  }

  memoIds.push(nextId);
  memoTexts.push(text);

  nextId++;
  memoInput.value = "";
  memoInput.focus();
  showMemos();
});

// Enterキーで追加
memoInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

// メモを表示
function showMemos() {
  memoList.replaceChildren();

  for (let i = 0; i < memoTexts.length; i++) {
    let item = document.createElement("div");
    item.className = "memo-item";

    let index = i;

    // 編集中かどうかを判定
    if (editingIndex === i) {
      // 編集モード
      let input = document.createElement("input");
      input.type = "text";
      input.value = memoTexts[i];
      input.className = "edit-input";

      // Enterキーで保存
      input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          saveMemo(index, input.value.trim());
        }
      });

      let saveButton = document.createElement("button");
      saveButton.textContent = "保存";
      saveButton.className = "save-button";

      saveButton.addEventListener("click", function() {
        saveMemo(index, input.value.trim());
      });

      let cancelButton = document.createElement("button");
      cancelButton.textContent = "キャンセル";
      cancelButton.className = "cancel-button";

      cancelButton.addEventListener("click", function() {
        editingIndex = -1;
        showMemos();
      });

      item.appendChild(input);
      item.appendChild(saveButton);
      item.appendChild(cancelButton);
      memoList.appendChild(item);

      // フォーカスを設定
      input.focus();
      input.select();

    } else {
      // 表示モード
      let text = document.createElement("span");
      text.textContent = memoTexts[i];

      let editButton = document.createElement("button");
      editButton.textContent = "編集";
      editButton.className = "edit-button";

      editButton.addEventListener("click", function() {
        editingIndex = index;
        showMemos();
      });

      let deleteButton = document.createElement("button");
      deleteButton.textContent = "削除";
      deleteButton.className = "delete-button";

      deleteButton.addEventListener("click", function() {
        if (confirm("このメモを削除しますか？")) {
          memoIds.splice(index, 1);
          memoTexts.splice(index, 1);
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

// メモを保存
function saveMemo(index, newText) {
  if (newText === "") {
    alert("メモを入力してください");
    return;
  }

  memoTexts[index] = newText;
  editingIndex = -1;
  showMemos();
}

// 初期表示
showMemos();
```

---

## 8. 練習問題

連絡先管理アプリを作成してください。

### 要件

1. 名前・電話番号を入力して追加できる
2. 各連絡先に「編集」ボタンがある
3. 編集ボタンをクリックすると、入力フィールドが表示される
4. 名前と電話番号の両方を編集できる
5. 「保存」ボタンで変更を保存
6. 「キャンセル」ボタンで編集を中止
7. 削除ボタンで連絡先を削除できる

### ヒント

```javascript
let contactIds = [];
let contactNames = [];
let contactPhones = [];
let editingIndex = -1;

// 編集モード
if (editingIndex === i) {
  let nameInput = document.createElement("input");
  nameInput.value = contactNames[i];

  let phoneInput = document.createElement("input");
  phoneInput.value = contactPhones[i];

  // 保存
  saveButton.addEventListener("click", function() {
    contactNames[index] = nameInput.value.trim();
    contactPhones[index] = phoneInput.value.trim();
    editingIndex = -1;
    showContacts();
  });
}
```

---

## まとめ

### 今回学んだこと

- **データの更新**：`array[index] = newValue`で配列の要素を更新
- **編集モード管理**：`editingIndex`変数で現在編集中の要素を管理
- **インライン編集UI**：編集中は入力フィールド、それ以外はテキストを表示
- **保存とキャンセル**：変更を保存するか、編集を中止するかを選択
- **フォーカス制御**：`input.focus()`と`input.select()`で使いやすさを向上

### 重要なポイント

- 編集中のインデックスを変数で管理する
- 編集モードと表示モードで異なるUIを表示する
- 保存時は空欄チェックを行う
- キャンセル時はデータを更新せず編集モードを終了
- フォーカスを自動設定してユーザー体験を向上させる

### 並列配列での編集の難しさ

並列配列で編集機能を実装すると、以下のような問題があります：

- 複数の配列を同時に更新する必要がある
- インデックスの管理が複雑になる
- 編集中のデータと元のデータを区別しにくい

**レッスン134以降で学ぶオブジェクト配列**を使えば、より簡単に編集できます：

```javascript
// オブジェクト配列なら（レッスン134以降）
let editingTodo = null;

// 編集開始
editingTodo = todos[index];

// 保存
editingTodo.text = newText;
```

並列配列の限界を経験することで、オブジェクトの必要性を実感できます。

次のレッスンでは、これまで学んだ全機能を統合して、**完成版TODOアプリ**を作成します。
