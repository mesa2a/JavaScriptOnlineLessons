---
title: "Lesson 154: TODOアプリ（編集編）"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# Lesson 154: TODOアプリ（編集編）

## 日常生活の例：ノートの書き直し

紙のノートに予定を書いた後、内容を変更したくなったことはありませんか？

- **消しゴムで消して書き直す**: 内容を修正できる
- **二重線で消して横に書く**: 元の内容も残る
- **新しいページに書き直す**: 一から書き直す必要がある

デジタルのTODOアプリでは、**編集機能**があれば簡単に内容を変更できます。「買い物」というタスクを「スーパーで牛乳を買う」と詳しく書き直したり、誤字を修正したりできます。

今回は、TODOアプリに編集機能を追加して、一度作成したタスクの内容を後から変更できるようにします。

## カリキュラム仕様

今回のレッスンでは、以下の機能を実装します：

✅ **タスクの編集機能**: 既存のタスクの内容を変更できるようにする
✅ **テキストを変更**: タスクのテキストを編集する
✅ **編集の保存とキャンセル**: 変更を保存するか、キャンセルして元に戻す
✅ **入力欄の切り替え**: 通常表示と編集モードを切り替える

## タスクの編集機能の仕組み

### 編集モードと通常モードの概念

編集機能を実装するには、各タスクに**2つの表示状態**を持たせます。

```
【2つの表示モード】

通常モード:
┌─────────────────────────┐
│ □ [仕事] 会議の資料準備  │ [編集] ボタン
└─────────────────────────┘

編集モード:
┌─────────────────────────┐
│ [仕事] [会議の資料準備]  │ [保存] [キャンセル]
│        ↑ 入力欄          │
└─────────────────────────┘
```

### 編集状態の管理

どのタスクが現在編集中なのかを記憶する変数が必要です。

```javascript
let editingIndex = -1;  // 現在編集中のタスクのインデックス

// -1: どのタスクも編集していない
// 0: 1番目のタスクを編集中
// 1: 2番目のタスクを編集中
// 2: 3番目のタスクを編集中
```

### 編集状態管理の流れ

```
【編集状態の変化】

初期状態:
editingIndex = -1 (編集していない)
tasks = [
  {id: 1, text: '会議の資料準備', done: false},
  {id: 2, text: '牛乳を買う', done: false},
  {id: 3, text: 'レポート作成', done: false}
]

---------------------------------------------------
ユーザーが1番目のタスクの編集ボタンをクリック
---------------------------------------------------
editingIndex = 0 に設定
  ↓
画面を再描画 (renderTasks() を呼ぶ)
  ↓
1番目のタスク (index = 0) を編集モードで表示
他のタスクは通常モードで表示

---------------------------------------------------
ユーザーが保存ボタンをクリック
---------------------------------------------------
入力欄の値を取得: "会議の資料を準備する"
  ↓
tasks[0].text = "会議の資料を準備する"
  ↓
editingIndex = -1 に戻す (編集終了)
  ↓
画面を再描画
  ↓
すべてのタスクが通常モードで表示

---------------------------------------------------
結果:
---------------------------------------------------
tasks = [
  {id: 1, text: '会議の資料を準備する', done: false},  ← 更新された
  {id: 2, text: '牛乳を買う', done: false},
  {id: 3, text: 'レポート作成', done: false}
]
```

## テキストを変更する仕組み

### 編集ボタンの追加

各タスクに編集ボタンを追加します。

```javascript
// 通常モードの場合
let editButton = document.createElement('button');
editButton.textContent = '編集';
editButton.className = 'edit-btn';

editButton.addEventListener('click', function(e) {
  e.stopPropagation();  // イベントの伝播を止める
  editingIndex = index;  // 編集中のインデックスを設定
  displayTasks();        // 画面を再描画
});
```

### stopPropagation() の重要性

`stopPropagation()` は**イベントの伝播を止める**メソッドです。

```
【イベント伝播の問題】

HTML構造:
<li onclick="toggleTask()">            ← 親要素
  <span>タスクのテキスト</span>
  <button onclick="editTask()">編集</button>  ← 子要素
</li>

---------------------------------------------------
stopPropagation() を使わない場合:
---------------------------------------------------
1. ボタンをクリック
   ↓
2. button の click イベントが発火
   → editTask() が実行される
   ↓
3. イベントが親要素に伝播 (バブリング)
   ↓
4. li の click イベントも発火
   → toggleTask() も実行される

結果: 編集モードに入ると同時にタスクが完了/未完了切り替わる (意図しない動作)

---------------------------------------------------
stopPropagation() を使う場合:
---------------------------------------------------
1. ボタンをクリック
   ↓
2. button の click イベントが発火
   → editTask() が実行される
   ↓
3. e.stopPropagation() により伝播を停止
   ↓
4. 親要素のイベントは発火しない

結果: 編集モードに入るだけ (意図通りの動作)
```

### 編集モードの表示

`editingIndex` が設定されている場合、そのタスクを編集モードで表示します。

```javascript
function displayTasks() {
  let list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach(function(task, index) {
    let li = document.createElement('li');

    // 編集モードかどうかを判定
    if (index === editingIndex) {
      // 編集モード: 入力欄と保存・キャンセルボタンを表示
      let input = document.createElement('input');
      input.type = 'text';
      input.value = task.text;
      input.className = 'edit-input';

      let saveButton = document.createElement('button');
      saveButton.textContent = '保存';

      let cancelButton = document.createElement('button');
      cancelButton.textContent = 'キャンセル';

      li.appendChild(input);
      li.appendChild(saveButton);
      li.appendChild(cancelButton);
    } else {
      // 通常モード: テキストと編集ボタンを表示
      let text = document.createElement('span');
      text.textContent = task.text;

      let editButton = document.createElement('button');
      editButton.textContent = '編集';

      li.appendChild(text);
      li.appendChild(editButton);
    }

    list.appendChild(li);
  });
}
```

### 編集モード切り替えの実行フロー

```
【編集モードの切り替え】

初期状態:
editingIndex = -1
画面: すべてのタスクが通常モードで表示

---------------------------------------------------
displayTasks() が実行される (編集ボタンクリック後)
---------------------------------------------------
editingIndex = 0 (1番目のタスクを編集中)

tasks.forEach() でループ:

  index = 0 のタスク:
    if (index === editingIndex) → if (0 === 0) → true
    → 編集モードで表示
    → <input> と保存・キャンセルボタンを作成

  index = 1 のタスク:
    if (index === editingIndex) → if (1 === 0) → false
    → 通常モードで表示
    → <span> と編集ボタンを作成

  index = 2 のタスク:
    if (index === editingIndex) → if (2 === 0) → false
    → 通常モードで表示
    → <span> と編集ボタンを作成

---------------------------------------------------
結果の画面:
---------------------------------------------------
タスク1: [入力欄: "会議の資料準備"] [保存] [キャンセル]  ← 編集モード
タスク2: 牛乳を買う [編集]                              ← 通常モード
タスク3: レポート作成 [編集]                            ← 通常モード
```

## 編集の保存とキャンセルの仕組み

### 保存ボタンの実装

保存ボタンがクリックされたら、入力欄の値でタスクを更新します。

```javascript
saveButton.addEventListener('click', function() {
  let newText = input.value.trim();

  // 空のテキストは保存できない
  if (newText === '') {
    alert('タスクを入力してください');
    return;
  }

  // タスクのテキストを更新
  tasks[index].text = newText;

  // localStorageに保存
  saveTasks();

  // 編集モードを終了
  editingIndex = -1;

  // 画面を再描画
  displayTasks();
});
```

### 保存処理の実行フロー

```
【保存処理の流れ】

現在の状態:
editingIndex = 0
tasks[0] = {id: 1, text: '会議の資料準備', done: false}
入力欄の値: "会議の資料を準備する"

---------------------------------------------------
ステップ1: 入力値を取得
---------------------------------------------------
let newText = input.value.trim()
  ↓
newText = "会議の資料を準備する"

---------------------------------------------------
ステップ2: バリデーション
---------------------------------------------------
if (newText === '') → false
  → 処理を続行

---------------------------------------------------
ステップ3: タスクを更新
---------------------------------------------------
tasks[0].text = "会議の資料を準備する"

結果:
tasks[0] = {id: 1, text: '会議の資料を準備する', done: false}

---------------------------------------------------
ステップ4: 保存
---------------------------------------------------
saveTasks() を呼ぶ
  ↓
localStorage.setItem('todoApp', JSON.stringify(tasks))

---------------------------------------------------
ステップ5: 編集モードを終了
---------------------------------------------------
editingIndex = -1

---------------------------------------------------
ステップ6: 画面を再描画
---------------------------------------------------
displayTasks() を呼ぶ
  ↓
すべてのタスクが通常モードで表示される
```

### キャンセルボタンの実装

キャンセルボタンがクリックされたら、**変更を破棄**して編集モードを終了します。

```javascript
cancelButton.addEventListener('click', function() {
  // 編集モードを終了 (タスクは変更しない)
  editingIndex = -1;

  // 画面を再描画
  displayTasks();
});
```

### キャンセル処理の実行フロー

```
【キャンセル処理の流れ】

現在の状態:
editingIndex = 0
tasks[0] = {id: 1, text: '会議の資料準備', done: false}
入力欄の値: "会議の資料を準備する" (変更されている)

---------------------------------------------------
キャンセルボタンがクリックされる
---------------------------------------------------
editingIndex = -1
  ↓
displayTasks() を呼ぶ
  ↓
すべてのタスクが通常モードで表示される

---------------------------------------------------
結果:
---------------------------------------------------
tasks[0] = {id: 1, text: '会議の資料準備', done: false}
  ↓ 元のままで変更されていない

入力欄の値は破棄される
```

## 入力欄の切り替えとキーボード操作

### Enterキーで保存、Escapeキーでキャンセル

キーボードショートカットを追加すると、操作性が向上します。

```javascript
input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    // Enterキーで保存
    saveButton.click();
  } else if (e.key === 'Escape') {
    // Escapeキーでキャンセル
    cancelButton.click();
  }
});
```

### キーボードイベントの流れ

```
【キーボード操作の動作】

編集モードで入力欄にフォーカスがある状態

---------------------------------------------------
ユーザーがEnterキーを押す
---------------------------------------------------
keydown イベントが発火
  ↓
e.key === 'Enter' → true
  ↓
saveButton.click() が実行される
  ↓
保存処理が実行される

---------------------------------------------------
ユーザーがEscapeキーを押す
---------------------------------------------------
keydown イベントが発火
  ↓
e.key === 'Escape' → true
  ↓
cancelButton.click() が実行される
  ↓
キャンセル処理が実行される

---------------------------------------------------
ユーザーが他のキーを押す
---------------------------------------------------
keydown イベントが発火
  ↓
e.key === 'Enter' → false
e.key === 'Escape' → false
  ↓
何もしない (通常の入力として処理される)
```

### 入力欄への自動フォーカス

編集モードに切り替わったとき、自動的に入力欄にフォーカスを当てます。

```javascript
// 編集モードの入力欄を作成後
setTimeout(function() {
  input.focus();   // フォーカスを当てる
  input.select();  // テキストを全選択
}, 0);
```

### 自動フォーカスの仕組み

```
【自動フォーカスの動作】

---------------------------------------------------
なぜ setTimeout が必要か？
---------------------------------------------------
1. displayTasks() が呼ばれる
2. list.innerHTML = '' で既存の要素をすべて削除
3. 新しい要素を作成して追加
   ← この時点ではまだDOMに追加されていない
4. list.appendChild(li) でDOMに追加
   ← この後にフォーカスを当てる必要がある

setTimeout(function() { ... }, 0) を使うことで、
現在の処理がすべて完了した後に実行される

---------------------------------------------------
実行の流れ:
---------------------------------------------------
編集ボタンがクリックされる
  ↓
editingIndex = 0
displayTasks() が呼ばれる
  ↓
DOM要素を作成
setTimeout(() => { input.focus() }, 0) を設定
  ↓
displayTasks() の処理が完了
すべてのDOM要素が画面に表示される
  ↓
setTimeout の処理が実行される
  ↓
input.focus() が実行される
  ↓
入力欄にフォーカスが当たる
  ↓
input.select() が実行される
  ↓
テキストが全選択される

---------------------------------------------------
結果:
---------------------------------------------------
編集モードに切り替わったと同時に
入力欄にフォーカスが当たり
テキストが全選択された状態になる
→ すぐに入力を開始できる
```

### ダブルクリックで編集開始

タスクをダブルクリックして編集を開始できるようにします。

```javascript
// 通常モードのテキスト
text.addEventListener('dblclick', function() {
  editingIndex = index;
  displayTasks();
});
```

### dblclick イベントの動作

```
【ダブルクリックの検出】

---------------------------------------------------
シングルクリックの場合:
---------------------------------------------------
クリック → click イベントが発火
  ↓
タスクの完了/未完了を切り替え

---------------------------------------------------
ダブルクリックの場合:
---------------------------------------------------
クリック → click イベントが発火
  ↓ (短時間で再度クリック)
クリック → click イベントと dblclick イベントが発火
  ↓
dblclick イベントの処理が実行される
  ↓
編集モードに切り替わる

注意: ダブルクリックすると click イベントも発火するため、
     タスクの完了状態も切り替わってしまう可能性がある
     → これを防ぐには、クリックとダブルクリックを
        別々の要素に設定するなどの工夫が必要
```

## 実践例1：基本的な編集機能

タスクの編集、保存、キャンセルの基本機能を実装したTODOアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>TODOアプリ（編集編）</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    #inputContainer {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    #taskInput {
      flex: 1;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }

    #addButton {
      padding: 10px 20px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    #addButton:hover {
      background: #5568d3;
    }

    #taskList {
      list-style: none;
      padding: 0;
    }

    #taskList li {
      padding: 15px;
      margin-bottom: 10px;
      background: white;
      border: 2px solid #ddd;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    #taskList li.done .task-text {
      text-decoration: line-through;
      color: #999;
    }

    .task-text {
      flex: 1;
      font-size: 16px;
      cursor: pointer;
    }

    .edit-input {
      flex: 1;
      padding: 8px;
      border: 2px solid #667eea;
      border-radius: 4px;
      font-size: 16px;
    }

    .edit-input:focus {
      outline: none;
      border-color: #5568d3;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
    }

    .edit-btn {
      background: #667eea;
      color: white;
    }

    .edit-btn:hover {
      background: #5568d3;
    }

    .save-btn {
      background: #28a745;
      color: white;
    }

    .save-btn:hover {
      background: #218838;
    }

    .cancel-btn {
      background: #dc3545;
      color: white;
    }

    .cancel-btn:hover {
      background: #c82333;
    }

    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>✏️ TODOアプリ（編集編）</h1>

  <div id="inputContainer">
    <input type="text" id="taskInput" placeholder="新しいタスクを入力">
    <button id="addButton">追加</button>
  </div>

  <ul id="taskList"></ul>

  <script>
    let tasks = [];
    let taskIdCounter = 1;
    let editingIndex = -1;

    let taskInput = document.getElementById('taskInput');
    let addButton = document.getElementById('addButton');
    let taskList = document.getElementById('taskList');

    function displayTasks() {
      taskList.innerHTML = '';

      tasks.forEach(function(task, index) {
        let li = document.createElement('li');
        if (task.done) {
          li.classList.add('done');
        }

        // 編集モード
        if (index === editingIndex) {
          let input = document.createElement('input');
          input.type = 'text';
          input.value = task.text;
          input.className = 'edit-input';

          let saveButton = document.createElement('button');
          saveButton.textContent = '保存';
          saveButton.className = 'save-btn';

          saveButton.addEventListener('click', function() {
            let newText = input.value.trim();

            if (newText === '') {
              alert('タスクを入力してください');
              return;
            }

            tasks[index].text = newText;
            saveTasks();
            editingIndex = -1;
            displayTasks();
          });

          let cancelButton = document.createElement('button');
          cancelButton.textContent = 'キャンセル';
          cancelButton.className = 'cancel-btn';

          cancelButton.addEventListener('click', function() {
            editingIndex = -1;
            displayTasks();
          });

          input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
              saveButton.click();
            } else if (e.key === 'Escape') {
              cancelButton.click();
            }
          });

          li.appendChild(input);
          li.appendChild(saveButton);
          li.appendChild(cancelButton);

          setTimeout(function() {
            input.focus();
            input.select();
          }, 0);
        } else {
          // 通常モード
          let checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = task.done;
          checkbox.addEventListener('change', function() {
            toggleTask(task.id);
          });

          let text = document.createElement('span');
          text.textContent = task.text;
          text.className = 'task-text';

          text.addEventListener('dblclick', function() {
            editingIndex = index;
            displayTasks();
          });

          let editButton = document.createElement('button');
          editButton.textContent = '編集';
          editButton.className = 'edit-btn';

          editButton.addEventListener('click', function(e) {
            e.stopPropagation();
            editingIndex = index;
            displayTasks();
          });

          li.appendChild(checkbox);
          li.appendChild(text);
          li.appendChild(editButton);
        }

        taskList.appendChild(li);
      });
    }

    function addTask() {
      let text = taskInput.value.trim();

      if (text === '') {
        alert('タスクを入力してください');
        return;
      }

      tasks.push({
        id: taskIdCounter++,
        text: text,
        done: false
      });

      taskInput.value = '';
      saveTasks();
      displayTasks();
    }

    function toggleTask(id) {
      let task = tasks.find(function(t) {
        return t.id === id;
      });

      if (task) {
        task.done = !task.done;
        saveTasks();
        displayTasks();
      }
    }

    function saveTasks() {
      let data = {
        tasks: tasks,
        taskIdCounter: taskIdCounter
      };
      localStorage.setItem('todoAppEdit', JSON.stringify(data));
    }

    function loadTasks() {
      let saved = localStorage.getItem('todoAppEdit');
      if (saved) {
        try {
          let data = JSON.parse(saved);
          tasks = data.tasks || [];
          taskIdCounter = data.taskIdCounter || 1;
        } catch (error) {
          console.error('データの読み込みに失敗しました:', error);
          tasks = [];
          taskIdCounter = 1;
        }
      }
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addTask();
      }
    });

    loadTasks();
    displayTasks();
  </script>
</body>
</html>
```

このアプリでは：
- 編集ボタンをクリックして編集モードに切り替え
- テキストを変更して保存またはキャンセル
- Enterキーで保存、Escapeキーでキャンセル
- ダブルクリックでも編集開始

## 実践例2：インライン編集付きTODOアプリ

より洗練されたデザインと編集体験を提供するアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>TODOアプリ（インライン編集）</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 700px;
      margin: 50px auto;
      padding: 20px;
      background: #f5f5f5;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .container {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .edit-hint {
      text-align: center;
      color: #666;
      font-size: 14px;
      margin-bottom: 20px;
      padding: 10px;
      background: #e7f3ff;
      border-radius: 4px;
    }

    #inputContainer {
      display: flex;
      gap: 10px;
      margin-bottom: 25px;
    }

    #taskInput {
      flex: 1;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
    }

    #taskInput:focus {
      outline: none;
      border-color: #667eea;
    }

    #addButton {
      padding: 12px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
    }

    #addButton:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    #taskList {
      list-style: none;
      padding: 0;
    }

    #taskList li {
      padding: 18px;
      margin-bottom: 12px;
      background: white;
      border: 2px solid #e9ecef;
      border-left: 4px solid #667eea;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.3s;
    }

    #taskList li:hover {
      transform: translateX(5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    #taskList li.editing {
      border-left-color: #28a745;
      background: #f8fff9;
    }

    #taskList li.done {
      opacity: 0.6;
      border-left-color: #2ed573;
    }

    #taskList li.done .task-text {
      text-decoration: line-through;
      color: #999;
    }

    .task-text {
      flex: 1;
      font-size: 16px;
      color: #333;
      cursor: pointer;
      padding: 5px;
      border-radius: 4px;
    }

    .task-text:hover {
      background: #f8f9fa;
    }

    .edit-input {
      flex: 1;
      padding: 10px;
      border: 2px solid #28a745;
      border-radius: 4px;
      font-size: 16px;
      animation: highlight 0.3s;
    }

    @keyframes highlight {
      0% {
        background: #ffffcc;
      }
      100% {
        background: white;
      }
    }

    .edit-input:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
    }

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      transition: all 0.3s;
    }

    .edit-btn {
      background: #667eea;
      color: white;
    }

    .edit-btn:hover {
      background: #5568d3;
      transform: scale(1.05);
    }

    .save-btn {
      background: #28a745;
      color: white;
    }

    .save-btn:hover {
      background: #218838;
      transform: scale(1.05);
    }

    .cancel-btn {
      background: #6c757d;
      color: white;
    }

    .cancel-btn:hover {
      background: #5a6268;
      transform: scale(1.05);
    }

    input[type="checkbox"] {
      width: 22px;
      height: 22px;
      cursor: pointer;
    }

    .keyboard-hint {
      font-size: 11px;
      color: #999;
      margin-top: 5px;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>✏️ TODOアプリ（インライン編集）</h1>

  <div class="container">
    <div class="edit-hint">
      💡 タスクをダブルクリックまたは編集ボタンをクリックして編集できます
    </div>

    <div id="inputContainer">
      <input type="text" id="taskInput" placeholder="新しいタスクを入力">
      <button id="addButton">追加</button>
    </div>

    <ul id="taskList"></ul>
  </div>

  <script>
    let tasks = [];
    let taskIdCounter = 1;
    let editingIndex = -1;

    let taskInput = document.getElementById('taskInput');
    let addButton = document.getElementById('addButton');
    let taskList = document.getElementById('taskList');

    function displayTasks() {
      taskList.innerHTML = '';

      if (tasks.length === 0) {
        let emptyMsg = document.createElement('div');
        emptyMsg.textContent = 'タスクがありません。上の入力欄から追加してください。';
        emptyMsg.style.textAlign = 'center';
        emptyMsg.style.color = '#999';
        emptyMsg.style.padding = '40px';
        taskList.appendChild(emptyMsg);
        return;
      }

      tasks.forEach(function(task, index) {
        let li = document.createElement('li');
        if (task.done) {
          li.classList.add('done');
        }

        if (index === editingIndex) {
          li.classList.add('editing');

          let input = document.createElement('input');
          input.type = 'text';
          input.value = task.text;
          input.className = 'edit-input';

          let saveButton = document.createElement('button');
          saveButton.textContent = '✓ 保存';
          saveButton.className = 'save-btn';

          saveButton.addEventListener('click', function() {
            let newText = input.value.trim();

            if (newText === '') {
              alert('タスクを入力してください');
              input.focus();
              return;
            }

            tasks[index].text = newText;
            saveTasks();
            editingIndex = -1;
            displayTasks();
          });

          let cancelButton = document.createElement('button');
          cancelButton.textContent = '✕ キャンセル';
          cancelButton.className = 'cancel-btn';

          cancelButton.addEventListener('click', function() {
            editingIndex = -1;
            displayTasks();
          });

          input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
              saveButton.click();
            } else if (e.key === 'Escape') {
              cancelButton.click();
            }
          });

          let buttonContainer = document.createElement('div');
          let hint = document.createElement('div');
          hint.className = 'keyboard-hint';
          hint.textContent = 'Enter: 保存 / Esc: キャンセル';

          li.appendChild(input);
          li.appendChild(saveButton);
          li.appendChild(cancelButton);

          setTimeout(function() {
            input.focus();
            input.select();
          }, 0);
        } else {
          let checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = task.done;
          checkbox.addEventListener('change', function() {
            toggleTask(task.id);
          });

          let text = document.createElement('span');
          text.textContent = task.text;
          text.className = 'task-text';
          text.title = 'ダブルクリックで編集';

          text.addEventListener('dblclick', function() {
            editingIndex = index;
            displayTasks();
          });

          let editButton = document.createElement('button');
          editButton.textContent = '✎ 編集';
          editButton.className = 'edit-btn';

          editButton.addEventListener('click', function(e) {
            e.stopPropagation();
            editingIndex = index;
            displayTasks();
          });

          li.appendChild(checkbox);
          li.appendChild(text);
          li.appendChild(editButton);
        }

        taskList.appendChild(li);
      });
    }

    function addTask() {
      let text = taskInput.value.trim();

      if (text === '') {
        alert('タスクを入力してください');
        return;
      }

      tasks.push({
        id: taskIdCounter++,
        text: text,
        done: false
      });

      taskInput.value = '';
      saveTasks();
      displayTasks();
    }

    function toggleTask(id) {
      let task = tasks.find(function(t) {
        return t.id === id;
      });

      if (task) {
        task.done = !task.done;
        saveTasks();
        displayTasks();
      }
    }

    function saveTasks() {
      let data = {
        tasks: tasks,
        taskIdCounter: taskIdCounter
      };
      localStorage.setItem('todoAppEditAdvanced', JSON.stringify(data));
    }

    function loadTasks() {
      let saved = localStorage.getItem('todoAppEditAdvanced');
      if (saved) {
        try {
          let data = JSON.parse(saved);
          tasks = data.tasks || [];
          taskIdCounter = data.taskIdCounter || 1;
        } catch (error) {
          console.error('データの読み込みに失敗しました:', error);
          tasks = [];
          taskIdCounter = 1;
        }
      }
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addTask();
      }
    });

    loadTasks();
    displayTasks();
  </script>
</body>
</html>
```

このアプリでは：
- 編集中のタスクがハイライト表示される
- キーボードヒントが表示される
- アニメーション効果で編集がスムーズ
- 空の状態のメッセージ表示

## よくある問題と解決策

### 問題1: 編集ボタンをクリックするとタスクも完了/未完了が切り替わる

**症状**:
編集ボタンをクリックすると、編集モードになると同時にタスクの完了状態も切り替わってしまう。

**原因**:
イベントが親要素に伝播（バブリング）している。

**解決策**:
```javascript
// ❌ 間違い
editButton.addEventListener('click', function() {
  editingIndex = index;
  displayTasks();
});

// ✅ 正しい
editButton.addEventListener('click', function(e) {
  e.stopPropagation();  // イベントの伝播を止める
  editingIndex = index;
  displayTasks();
});
```

### 問題2: 編集モードで入力欄にフォーカスが当たらない

**症状**:
編集モードに切り替わっても、入力欄が自動的にフォーカスされない。

**原因**:
DOM要素が作成された直後に `focus()` を呼んでいるが、まだDOMに追加されていない。

**解決策**:
```javascript
// ❌ 間違い
li.appendChild(input);
input.focus();  // この時点ではまだDOMツリーに追加されていない可能性

// ✅ 正しい
li.appendChild(input);
setTimeout(function() {
  input.focus();
  input.select();
}, 0);  // 次のイベントループで実行
```

### 問題3: 複数のタスクが同時に編集モードになる

**症状**:
複数のタスクの編集ボタンをクリックすると、すべてが編集モードになってしまう。

**原因**:
`editingIndex` が配列になっている、または正しく管理されていない。

**解決策**:
```javascript
// ❌ 間違い
let editingIndexes = [];  // 配列で管理すると複数編集可能になる

// ✅ 正しい
let editingIndex = -1;  // 単一の値で管理

// 新しい編集を開始するときは、前の編集を自動的に終了
editButton.addEventListener('click', function(e) {
  e.stopPropagation();
  editingIndex = index;  // 新しいインデックスに上書き
  displayTasks();
});
```

## まとめ

お疲れ様でした！今回は、TODOアプリに編集機能を追加しました。

### 今回学んだこと

1. **動的な画面更新**
   - 状態に応じて画面の表示を切り替える
   - 同じタスクでも編集モードと通常モードで異なる表示

2. **状態管理**
   - `editingIndex` 変数でアプリケーションの状態を管理
   - 状態が変わると画面表示も変わる

3. **イベント制御**
   - `stopPropagation()` でイベント伝播を止める
   - キーボードショートカット（Enter/Escape）の実装

4. **ユーザビリティ**
   - 自動フォーカスとテキスト選択
   - ダブルクリックでの編集開始
   - 複数の操作方法を提供

### カリキュラム達成確認

✅ **タスクの編集機能**: 編集ボタンとダブルクリックでタスクを編集モードに切り替え
✅ **テキストを変更**: 入力欄でタスクのテキストを自由に変更
✅ **編集の保存とキャンセル**: 保存ボタンで変更を確定、キャンセルボタンで破棄
✅ **入力欄の切り替え**: `editingIndex` を使って通常モードと編集モードを切り替え

### 実際の開発での応用

編集機能は、あらゆるCRUD（Create, Read, Update, Delete）アプリケーションで必要な機能です：

- **ノートアプリ**: メモの内容を編集
- **SNS**: 投稿を編集
- **設定画面**: ユーザー情報を編集
- **ECサイト**: 商品情報を編集

編集機能の実装パターンは、**多くのWebアプリケーションで共通**しています。

### 次回予告

次回は、TODOアプリに**バリデーション機能**を追加します。

空のタスクや重複したタスクを防ぐことで、データの品質を保ちます。エラーメッセージの表示や入力チェックの方法について学びます。

---

**日付**: 2025-11-26
