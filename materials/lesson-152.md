---
title: "Lesson 152: TODOアプリ（カテゴリ編）"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# Lesson 152: TODOアプリ（カテゴリ編）

## 日常生活の例：図書館の本の分類

図書館に行くと、本は「小説」「実用書」「歴史」「科学」など、カテゴリ別に整理されています。もし本がすべて混在していたら、目的の本を見つけるのはとても大変です。

カテゴリ分けがあることで：
- **探しやすい**: 「料理の本が欲しい」と思ったら、料理コーナーに行けば良い
- **管理しやすい**: 返却された本を正しい場所に戻せる
- **見通しが良い**: どんな種類の本があるか一目で分かる

TODOアプリでも同じです。「仕事」「プライベート」「買い物」などのカテゴリに分けることで、タスクが整理され、効率的に管理できるようになります。

今回は、TODOアプリにカテゴリ機能を追加して、タスクを分類できるようにします。

## カリキュラム仕様

今回のレッスンでは、以下の機能を実装します：

✅ **タスクにカテゴリを追加**: 各タスクにカテゴリ情報を持たせる
✅ **カテゴリ別に表示**: 選択したカテゴリのタスクだけを表示する
✅ **カテゴリを選択できる**: ドロップダウンメニューでカテゴリを選択する
✅ **複数カテゴリの管理**: 複数のカテゴリを作成して管理する

## タスクにカテゴリを追加する仕組み

### データ構造の拡張

これまでのTODOアプリでは、各タスクは以下のような構造でした：

```javascript
{
  id: 1,
  text: '牛乳を買う',
  done: false
}
```

カテゴリ機能を追加するには、**このオブジェクトに `category` プロパティを追加**します：

```javascript
{
  id: 1,
  text: '牛乳を買う',
  done: false,
  category: '買い物'  // ← 新しく追加
}
```

### データ構造の拡張の流れ

```
ステップ1: タスクオブジェクトの設計変更
-------------------------------------------
古い設計:
{
  id: 数値,
  text: 文字列,
  done: 真偽値
}

新しい設計:
{
  id: 数値,
  text: 文字列,
  done: 真偽値,
  category: 文字列  ← 新しいプロパティ
}

ステップ2: カテゴリリストの管理
-------------------------------------------
利用可能なカテゴリのリストを配列で管理:
let categories = ['仕事', 'プライベート', '買い物'];

ステップ3: タスク追加時の処理変更
-------------------------------------------
タスク追加時に、選択されたカテゴリも一緒に保存:

function addTask() {
  let text = input.value;
  let selectedCategory = categorySelect.value;  // カテゴリを取得

  tasks.push({
    id: taskIdCounter++,
    text: text,
    done: false,
    category: selectedCategory  // カテゴリを保存
  });
}
```

### カテゴリ追加の実行フロー

```
【タスク追加の流れ】

1. ユーザーの操作
   入力欄: "レポート作成"
   カテゴリ選択: "仕事" を選択
   ボタンクリック: 「追加」ボタンをクリック

   ↓

2. JavaScript が実行される

   // 入力値を取得
   let text = 'レポート作成'
   let category = '仕事'

   ↓

3. タスクオブジェクトを作成

   let newTask = {
     id: 1,
     text: 'レポート作成',
     done: false,
     category: '仕事'  ← カテゴリ情報が含まれる
   }

   ↓

4. 配列に追加

   tasks.push(newTask)

   ↓

5. 結果

   tasks = [
     {id: 1, text: 'レポート作成', done: false, category: '仕事'}
   ]
```

## カテゴリ別に表示する仕組み

### カテゴリフィルターの基本

カテゴリで絞り込むには、**filter() メソッドを使って、選択されたカテゴリに一致するタスクだけを取り出します**。

```javascript
// 現在選択されているカテゴリを保持する変数
let currentCategory = 'すべて';

// カテゴリでフィルターする関数
function getFilteredTasks() {
  // 「すべて」が選択されている場合は、全タスクを返す
  if (currentCategory === 'すべて') {
    return tasks;
  }

  // 特定のカテゴリが選択されている場合は、そのカテゴリのタスクだけを返す
  return tasks.filter(function(task) {
    return task.category === currentCategory;
  });
}
```

### カテゴリフィルターの実行フロー

```
【カテゴリフィルターの動作】

初期状態のタスク配列:
tasks = [
  {id: 1, text: 'レポート作成', done: false, category: '仕事'},
  {id: 2, text: '牛乳を買う', done: false, category: '買い物'},
  {id: 3, text: '映画を見る', done: false, category: 'プライベート'},
  {id: 4, text: '会議資料準備', done: false, category: '仕事'}
]

---------------------------------------------------
ケース1: currentCategory = 'すべて'
---------------------------------------------------
getFilteredTasks() が呼ばれる
  ↓
if (currentCategory === 'すべて') が true
  ↓
return tasks; (全タスクを返す)
  ↓
結果: 4件すべて表示

---------------------------------------------------
ケース2: currentCategory = '仕事'
---------------------------------------------------
getFilteredTasks() が呼ばれる
  ↓
if (currentCategory === 'すべて') が false
  ↓
filter() メソッドを実行:

  タスク1を確認:
    task.category === currentCategory
    → '仕事' === '仕事' → true (含める)

  タスク2を確認:
    task.category === currentCategory
    → '買い物' === '仕事' → false (除外)

  タスク3を確認:
    task.category === currentCategory
    → 'プライベート' === '仕事' → false (除外)

  タスク4を確認:
    task.category === currentCategory
    → '仕事' === '仕事' → true (含める)

  ↓
結果: [
  {id: 1, text: 'レポート作成', done: false, category: '仕事'},
  {id: 4, text: '会議資料準備', done: false, category: '仕事'}
]

→ 「仕事」カテゴリの2件だけが表示される
```

### カテゴリと完了状態の複合フィルター

前回学んだ完了状態フィルターと組み合わせることで、**「仕事カテゴリの未完了タスク」**のような複雑な絞り込みができます。

```javascript
function getFilteredTasks() {
  let filtered = tasks;

  // ステップ1: カテゴリでフィルター
  if (currentCategory !== 'すべて') {
    filtered = filtered.filter(function(task) {
      return task.category === currentCategory;
    });
  }

  // ステップ2: 完了状態でフィルター
  if (currentFilter === 'active') {
    filtered = filtered.filter(function(task) {
      return task.done === false;
    });
  } else if (currentFilter === 'completed') {
    filtered = filtered.filter(function(task) {
      return task.done === true;
    });
  }

  return filtered;
}
```

### 複合フィルターの実行フロー

```
【複合フィルターの動作例】

初期状態:
tasks = [
  {id: 1, text: 'レポート作成', done: false, category: '仕事'},
  {id: 2, text: '牛乳を買う', done: true, category: '買い物'},
  {id: 3, text: '映画を見る', done: false, category: 'プライベート'},
  {id: 4, text: '会議資料準備', done: true, category: '仕事'}
]

currentCategory = '仕事'
currentFilter = 'active'

---------------------------------------------------
実行フロー:
---------------------------------------------------

1. 初期値を設定
   filtered = tasks (4件すべて)

2. カテゴリでフィルター (currentCategory = '仕事')

   filtered.filter(task => task.category === '仕事')

   結果:
   filtered = [
     {id: 1, text: 'レポート作成', done: false, category: '仕事'},
     {id: 4, text: '会議資料準備', done: true, category: '仕事'}
   ]
   (2件に絞られた)

3. 完了状態でフィルター (currentFilter = 'active')

   filtered.filter(task => task.done === false)

   タスク1を確認:
     done === false → true (含める)

   タスク4を確認:
     done === true → false (除外)

   結果:
   filtered = [
     {id: 1, text: 'レポート作成', done: false, category: '仕事'}
   ]
   (1件に絞られた)

4. 最終結果を返す

   → 「仕事カテゴリの未完了タスク」のみが表示される
```

## カテゴリを選択できる仕組み

### ドロップダウンメニュー（select要素）の使い方

カテゴリを選択するUIとして、**`<select>` 要素（ドロップダウンメニュー）**を使います。

```html
<!-- カテゴリ選択用のドロップダウン -->
<select id="categoryFilter">
  <option value="すべて">すべて</option>
  <option value="仕事">仕事</option>
  <option value="プライベート">プライベート</option>
  <option value="買い物">買い物</option>
</select>
```

### change イベントの使い方

ドロップダウンの選択が変更されたときに処理を実行するには、**`change` イベント**を使います。

```javascript
let categoryFilter = document.getElementById('categoryFilter');

categoryFilter.addEventListener('change', function() {
  // ドロップダウンで選択された値を取得
  currentCategory = categoryFilter.value;

  // タスクを再表示
  displayTasks();
});
```

### カテゴリ変更の実行フロー

```
【カテゴリ選択の流れ】

初期状態:
currentCategory = 'すべて'
画面には全タスクが表示されている

---------------------------------------------------
ステップ1: ユーザーがドロップダウンを操作
---------------------------------------------------
ユーザーが「仕事」を選択
  ↓
ブラウザが change イベントを発火
  ↓
イベントリスナーの関数が実行される

---------------------------------------------------
ステップ2: 選択された値を取得
---------------------------------------------------
categoryFilter.value を読み取る
  ↓
currentCategory = '仕事'
(変数が更新される)

---------------------------------------------------
ステップ3: タスクを再表示
---------------------------------------------------
displayTasks() が呼ばれる
  ↓
getFilteredTasks() でフィルター
  ↓
「仕事」カテゴリのタスクだけを取得
  ↓
画面に表示

---------------------------------------------------
結果:
---------------------------------------------------
「仕事」カテゴリのタスクだけが表示される
```

### タスク追加時のカテゴリ選択

タスクを追加する際にも、カテゴリを選択できるようにします。

```html
<div id="inputContainer">
  <input type="text" id="taskInput" placeholder="タスクを入力">
  <select id="newTaskCategory">
    <option value="仕事">仕事</option>
    <option value="プライベート">プライベート</option>
    <option value="買い物">買い物</option>
  </select>
  <button id="addButton">追加</button>
</div>
```

```javascript
function addTask() {
  let text = taskInput.value.trim();
  let category = newTaskCategory.value;  // 選択されたカテゴリを取得

  if (text === '') {
    return;
  }

  tasks.push({
    id: taskIdCounter++,
    text: text,
    done: false,
    category: category  // カテゴリを保存
  });

  taskInput.value = '';
  saveTasks();
  displayTasks();
}
```

## 複数カテゴリの管理

### カテゴリリストの管理

利用可能なカテゴリを配列で管理します。

```javascript
let categories = ['仕事', 'プライベート', '買い物'];
```

この配列を使って、ドロップダウンメニューの選択肢を動的に生成できます。

```javascript
function updateCategorySelects() {
  let categoryFilter = document.getElementById('categoryFilter');
  let newTaskCategory = document.getElementById('newTaskCategory');

  // 既存の選択肢をクリア
  categoryFilter.innerHTML = '';
  newTaskCategory.innerHTML = '';

  // フィルター用には「すべて」を追加
  let allOption = document.createElement('option');
  allOption.value = 'すべて';
  allOption.textContent = 'すべて';
  categoryFilter.appendChild(allOption);

  // カテゴリごとに選択肢を作成
  categories.forEach(function(category) {
    // フィルター用
    let option1 = document.createElement('option');
    option1.value = category;
    option1.textContent = category;
    categoryFilter.appendChild(option1);

    // タスク追加用
    let option2 = document.createElement('option');
    option2.value = category;
    option2.textContent = category;
    newTaskCategory.appendChild(option2);
  });
}
```

### カテゴリの動的生成フロー

```
【ドロップダウンメニューの動的生成】

初期状態:
categories = ['仕事', 'プライベート', '買い物']

---------------------------------------------------
updateCategorySelects() が実行される
---------------------------------------------------

ステップ1: HTMLをクリア
  categoryFilter.innerHTML = ''
  newTaskCategory.innerHTML = ''

  → ドロップダウンが空になる

ステップ2: フィルター用に「すべて」を追加

  <option value="すべて">すべて</option>
  を categoryFilter に追加

  categoryFilter の中身:
  <option value="すべて">すべて</option>

ステップ3: categories 配列をループ

  1回目: category = '仕事'
    フィルター用:
      <option value="仕事">仕事</option> を追加
    タスク追加用:
      <option value="仕事">仕事</option> を追加

  2回目: category = 'プライベート'
    フィルター用:
      <option value="プライベート">プライベート</option> を追加
    タスク追加用:
      <option value="プライベート">プライベート</option> を追加

  3回目: category = '買い物'
    フィルター用:
      <option value="買い物">買い物</option> を追加
    タスク追加用:
      <option value="買い物">買い物</option> を追加

---------------------------------------------------
結果:
---------------------------------------------------
categoryFilter (フィルター用):
  <select id="categoryFilter">
    <option value="すべて">すべて</option>
    <option value="仕事">仕事</option>
    <option value="プライベート">プライベート</option>
    <option value="買い物">買い物</option>
  </select>

newTaskCategory (タスク追加用):
  <select id="newTaskCategory">
    <option value="仕事">仕事</option>
    <option value="プライベート">プライベート</option>
    <option value="買い物">買い物</option>
  </select>
```

### カテゴリバッジの表示

各タスクにカテゴリバッジを表示すると、どのカテゴリに属しているか一目で分かります。

```javascript
function displayTasks() {
  let list = document.getElementById('taskList');
  list.innerHTML = '';

  let filtered = getFilteredTasks();

  filtered.forEach(function(task) {
    let li = document.createElement('li');

    // カテゴリバッジを作成
    let badge = document.createElement('span');
    badge.textContent = task.category;
    badge.className = 'category-badge';
    badge.style.backgroundColor = getCategoryColor(task.category);

    // タスクテキストを作成
    let text = document.createElement('span');
    text.textContent = task.text;

    // チェックボックスを作成
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;

    // 要素を組み立てる
    li.appendChild(checkbox);
    li.appendChild(badge);
    li.appendChild(text);

    list.appendChild(li);
  });
}
```

### カテゴリごとの色分け

カテゴリごとに色を変えると、視覚的に区別しやすくなります。

```javascript
function getCategoryColor(category) {
  let colors = {
    '仕事': '#ff6b6b',
    'プライベート': '#4ecdc4',
    '買い物': '#ffe66d'
  };

  return colors[category] || '#999999';
}
```

### カテゴリバッジの表示フロー

```
【カテゴリバッジの表示】

タスク:
{id: 1, text: 'レポート作成', done: false, category: '仕事'}

---------------------------------------------------
displayTasks() 内での処理:
---------------------------------------------------

1. カテゴリバッジの作成

   let badge = document.createElement('span');
   badge.textContent = '仕事';
   badge.className = 'category-badge';

   結果:
   <span class="category-badge">仕事</span>

2. 色を設定

   getCategoryColor('仕事') が呼ばれる
     ↓
   colors['仕事'] を検索
     ↓
   '#ff6b6b' が返される
     ↓
   badge.style.backgroundColor = '#ff6b6b'

   結果:
   <span class="category-badge" style="background-color: #ff6b6b;">
     仕事
   </span>

3. リストアイテムに追加

   li.appendChild(checkbox);  // チェックボックス
   li.appendChild(badge);     // カテゴリバッジ
   li.appendChild(text);      // タスクテキスト

   結果:
   <li>
     <input type="checkbox">
     <span class="category-badge" style="background-color: #ff6b6b;">
       仕事
     </span>
     <span>レポート作成</span>
   </li>
```

## 実践例1：基本的なカテゴリ機能

カテゴリの追加、表示、フィルターの基本機能を実装したTODOアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>TODOアプリ（カテゴリ編）</title>
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

    #newTaskCategory {
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

    #filterContainer {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      align-items: center;
    }

    #categoryFilter {
      padding: 8px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .filter-buttons button {
      padding: 8px 16px;
      border: 2px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .filter-buttons button.active {
      background: #667eea;
      color: white;
      border-color: #667eea;
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

    #taskList li.done {
      opacity: 0.6;
    }

    #taskList li.done .task-text {
      text-decoration: line-through;
      color: #999;
    }

    .category-badge {
      display: inline-block;
      padding: 4px 12px;
      color: white;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
    }

    .task-text {
      flex: 1;
      font-size: 16px;
    }

    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>📝 TODOアプリ（カテゴリ編）</h1>

  <div id="inputContainer">
    <input type="text" id="taskInput" placeholder="タスクを入力">
    <select id="newTaskCategory">
      <option value="仕事">仕事</option>
      <option value="プライベート">プライベート</option>
      <option value="買い物">買い物</option>
    </select>
    <button id="addButton">追加</button>
  </div>

  <div id="filterContainer">
    <label>カテゴリ:</label>
    <select id="categoryFilter">
      <option value="すべて">すべて</option>
      <option value="仕事">仕事</option>
      <option value="プライベート">プライベート</option>
      <option value="買い物">買い物</option>
    </select>

    <div class="filter-buttons">
      <button id="filterAll" class="active">すべて</button>
      <button id="filterActive">未完了</button>
      <button id="filterCompleted">完了</button>
    </div>
  </div>

  <ul id="taskList"></ul>

  <script>
    // タスクの配列
    let tasks = [];
    let taskIdCounter = 1;

    // カテゴリリスト
    let categories = ['仕事', 'プライベート', '買い物'];

    // フィルター状態
    let currentFilter = 'all';
    let currentCategory = 'すべて';

    // カテゴリごとの色
    let categoryColors = {
      '仕事': '#ff6b6b',
      'プライベート': '#4ecdc4',
      '買い物': '#ffe66d'
    };

    // DOM要素の取得
    let taskInput = document.getElementById('taskInput');
    let newTaskCategory = document.getElementById('newTaskCategory');
    let addButton = document.getElementById('addButton');
    let taskList = document.getElementById('taskList');
    let categoryFilter = document.getElementById('categoryFilter');
    let filterAll = document.getElementById('filterAll');
    let filterActive = document.getElementById('filterActive');
    let filterCompleted = document.getElementById('filterCompleted');

    // カテゴリの色を取得
    function getCategoryColor(category) {
      return categoryColors[category] || '#999999';
    }

    // フィルターされたタスクを取得
    function getFilteredTasks() {
      let filtered = tasks;

      // カテゴリでフィルター
      if (currentCategory !== 'すべて') {
        filtered = filtered.filter(function(task) {
          return task.category === currentCategory;
        });
      }

      // 完了状態でフィルター
      if (currentFilter === 'active') {
        filtered = filtered.filter(function(task) {
          return task.done === false;
        });
      } else if (currentFilter === 'completed') {
        filtered = filtered.filter(function(task) {
          return task.done === true;
        });
      }

      return filtered;
    }

    // タスクを表示
    function displayTasks() {
      taskList.innerHTML = '';

      let filtered = getFilteredTasks();

      filtered.forEach(function(task) {
        let li = document.createElement('li');
        if (task.done) {
          li.classList.add('done');
        }

        // チェックボックス
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', function() {
          toggleTask(task.id);
        });

        // カテゴリバッジ
        let badge = document.createElement('span');
        badge.textContent = task.category;
        badge.className = 'category-badge';
        badge.style.backgroundColor = getCategoryColor(task.category);

        // タスクテキスト
        let text = document.createElement('span');
        text.textContent = task.text;
        text.className = 'task-text';

        li.appendChild(checkbox);
        li.appendChild(badge);
        li.appendChild(text);

        taskList.appendChild(li);
      });

      updateFilterButtons();
    }

    // タスクを追加
    function addTask() {
      let text = taskInput.value.trim();
      let category = newTaskCategory.value;

      if (text === '') {
        alert('タスクを入力してください');
        return;
      }

      tasks.push({
        id: taskIdCounter++,
        text: text,
        done: false,
        category: category
      });

      taskInput.value = '';
      saveTasks();
      displayTasks();
    }

    // タスクの完了状態を切り替え
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

    // フィルターボタンの状態を更新
    function updateFilterButtons() {
      filterAll.classList.remove('active');
      filterActive.classList.remove('active');
      filterCompleted.classList.remove('active');

      if (currentFilter === 'all') {
        filterAll.classList.add('active');
      } else if (currentFilter === 'active') {
        filterActive.classList.add('active');
      } else if (currentFilter === 'completed') {
        filterCompleted.classList.add('active');
      }
    }

    // localStorageに保存
    function saveTasks() {
      let data = {
        tasks: tasks,
        taskIdCounter: taskIdCounter
      };
      localStorage.setItem('todoAppCategory', JSON.stringify(data));
    }

    // localStorageから読み込み
    function loadTasks() {
      let saved = localStorage.getItem('todoAppCategory');
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

    // イベントリスナーの設定
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addTask();
      }
    });

    categoryFilter.addEventListener('change', function() {
      currentCategory = categoryFilter.value;
      displayTasks();
    });

    filterAll.addEventListener('click', function() {
      currentFilter = 'all';
      displayTasks();
    });

    filterActive.addEventListener('click', function() {
      currentFilter = 'active';
      displayTasks();
    });

    filterCompleted.addEventListener('click', function() {
      currentFilter = 'completed';
      displayTasks();
    });

    // 初期化
    loadTasks();
    displayTasks();
  </script>
</body>
</html>
```

このアプリでは：
- タスク追加時にカテゴリを選択できる
- カテゴリごとにタスクをフィルターできる
- 完了状態とカテゴリの複合フィルターが使える
- カテゴリバッジで視覚的に区別できる

## 実践例2：カテゴリ統計表示付きTODOアプリ

カテゴリごとのタスク数を表示する機能を追加したアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>TODOアプリ（統計表示付き）</title>
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

    #inputContainer {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
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

    #newTaskCategory {
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
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

    #statsContainer {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin-bottom: 25px;
    }

    .stat-card {
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      text-align: center;
      border-left: 4px solid #667eea;
    }

    .stat-card .category-name {
      font-size: 14px;
      color: #666;
      margin-bottom: 5px;
    }

    .stat-card .count {
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }

    #filterContainer {
      display: flex;
      gap: 15px;
      margin-bottom: 25px;
      flex-wrap: wrap;
      align-items: center;
    }

    #categoryFilter {
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
    }

    .filter-buttons {
      display: flex;
      gap: 10px;
    }

    .filter-buttons button {
      padding: 10px 18px;
      border: 2px solid #ddd;
      background: white;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s;
    }

    .filter-buttons button.active {
      background: #667eea;
      color: white;
      border-color: #667eea;
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

    #taskList li.done {
      opacity: 0.6;
      border-left-color: #2ed573;
    }

    #taskList li.done .task-text {
      text-decoration: line-through;
      color: #999;
    }

    .category-badge {
      display: inline-block;
      padding: 5px 14px;
      color: white;
      border-radius: 14px;
      font-size: 12px;
      font-weight: bold;
      text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }

    .task-text {
      flex: 1;
      font-size: 16px;
      color: #333;
    }

    input[type="checkbox"] {
      width: 22px;
      height: 22px;
      cursor: pointer;
    }

    .empty-message {
      text-align: center;
      padding: 40px;
      color: #999;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <h1>📊 TODOアプリ（統計表示付き）</h1>

  <div class="container">
    <div id="inputContainer">
      <input type="text" id="taskInput" placeholder="タスクを入力">
      <select id="newTaskCategory">
        <option value="仕事">仕事</option>
        <option value="プライベート">プライベート</option>
        <option value="買い物">買い物</option>
      </select>
      <button id="addButton">追加</button>
    </div>

    <div id="statsContainer"></div>

    <div id="filterContainer">
      <label>カテゴリ:</label>
      <select id="categoryFilter">
        <option value="すべて">すべて</option>
        <option value="仕事">仕事</option>
        <option value="プライベート">プライベート</option>
        <option value="買い物">買い物</option>
      </select>

      <div class="filter-buttons">
        <button id="filterAll" class="active">すべて</button>
        <button id="filterActive">未完了</button>
        <button id="filterCompleted">完了</button>
      </div>
    </div>

    <ul id="taskList"></ul>
  </div>

  <script>
    let tasks = [];
    let taskIdCounter = 1;
    let categories = ['仕事', 'プライベート', '買い物'];
    let currentFilter = 'all';
    let currentCategory = 'すべて';

    let categoryColors = {
      '仕事': '#ff6b6b',
      'プライベート': '#4ecdc4',
      '買い物': '#ffe66d'
    };

    let taskInput = document.getElementById('taskInput');
    let newTaskCategory = document.getElementById('newTaskCategory');
    let addButton = document.getElementById('addButton');
    let taskList = document.getElementById('taskList');
    let categoryFilter = document.getElementById('categoryFilter');
    let statsContainer = document.getElementById('statsContainer');
    let filterAll = document.getElementById('filterAll');
    let filterActive = document.getElementById('filterActive');
    let filterCompleted = document.getElementById('filterCompleted');

    function getCategoryColor(category) {
      return categoryColors[category] || '#999999';
    }

    // カテゴリごとのタスク数を計算
    function getCategoryStats() {
      let stats = {};

      categories.forEach(function(category) {
        stats[category] = {
          total: 0,
          active: 0,
          completed: 0
        };
      });

      tasks.forEach(function(task) {
        if (stats[task.category]) {
          stats[task.category].total++;
          if (task.done) {
            stats[task.category].completed++;
          } else {
            stats[task.category].active++;
          }
        }
      });

      return stats;
    }

    // 統計を表示
    function displayStats() {
      statsContainer.innerHTML = '';
      let stats = getCategoryStats();

      categories.forEach(function(category) {
        let card = document.createElement('div');
        card.className = 'stat-card';
        card.style.borderLeftColor = getCategoryColor(category);

        let name = document.createElement('div');
        name.className = 'category-name';
        name.textContent = category;

        let count = document.createElement('div');
        count.className = 'count';
        count.textContent = stats[category].total + ' 件';

        let detail = document.createElement('div');
        detail.style.fontSize = '12px';
        detail.style.color = '#999';
        detail.style.marginTop = '5px';
        detail.textContent = '未完了: ' + stats[category].active + ' / 完了: ' + stats[category].completed;

        card.appendChild(name);
        card.appendChild(count);
        card.appendChild(detail);

        statsContainer.appendChild(card);
      });
    }

    function getFilteredTasks() {
      let filtered = tasks;

      if (currentCategory !== 'すべて') {
        filtered = filtered.filter(function(task) {
          return task.category === currentCategory;
        });
      }

      if (currentFilter === 'active') {
        filtered = filtered.filter(function(task) {
          return task.done === false;
        });
      } else if (currentFilter === 'completed') {
        filtered = filtered.filter(function(task) {
          return task.done === true;
        });
      }

      return filtered;
    }

    function displayTasks() {
      taskList.innerHTML = '';

      let filtered = getFilteredTasks();

      if (filtered.length === 0) {
        let emptyMsg = document.createElement('div');
        emptyMsg.className = 'empty-message';
        emptyMsg.textContent = 'タスクがありません';
        taskList.appendChild(emptyMsg);
      } else {
        filtered.forEach(function(task) {
          let li = document.createElement('li');
          if (task.done) {
            li.classList.add('done');
          }

          let checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = task.done;
          checkbox.addEventListener('change', function() {
            toggleTask(task.id);
          });

          let badge = document.createElement('span');
          badge.textContent = task.category;
          badge.className = 'category-badge';
          badge.style.backgroundColor = getCategoryColor(task.category);

          let text = document.createElement('span');
          text.textContent = task.text;
          text.className = 'task-text';

          li.appendChild(checkbox);
          li.appendChild(badge);
          li.appendChild(text);

          taskList.appendChild(li);
        });
      }

      displayStats();
      updateFilterButtons();
    }

    function addTask() {
      let text = taskInput.value.trim();
      let category = newTaskCategory.value;

      if (text === '') {
        alert('タスクを入力してください');
        return;
      }

      tasks.push({
        id: taskIdCounter++,
        text: text,
        done: false,
        category: category
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

    function updateFilterButtons() {
      filterAll.classList.remove('active');
      filterActive.classList.remove('active');
      filterCompleted.classList.remove('active');

      if (currentFilter === 'all') {
        filterAll.classList.add('active');
      } else if (currentFilter === 'active') {
        filterActive.classList.add('active');
      } else if (currentFilter === 'completed') {
        filterCompleted.classList.add('active');
      }
    }

    function saveTasks() {
      let data = {
        tasks: tasks,
        taskIdCounter: taskIdCounter
      };
      localStorage.setItem('todoAppCategoryStats', JSON.stringify(data));
    }

    function loadTasks() {
      let saved = localStorage.getItem('todoAppCategoryStats');
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

    categoryFilter.addEventListener('change', function() {
      currentCategory = categoryFilter.value;
      displayTasks();
    });

    filterAll.addEventListener('click', function() {
      currentFilter = 'all';
      displayTasks();
    });

    filterActive.addEventListener('click', function() {
      currentFilter = 'active';
      displayTasks();
    });

    filterCompleted.addEventListener('click', function() {
      currentFilter = 'completed';
      displayTasks();
    });

    loadTasks();
    displayTasks();
  </script>
</body>
</html>
```

このアプリでは：
- カテゴリごとのタスク数を統計表示
- 未完了/完了の内訳も表示
- より洗練されたデザイン
- 空の状態のメッセージ表示

## よくある問題と解決策

### 問題1: カテゴリフィルターが動かない

**症状**:
カテゴリのドロップダウンを変更しても、表示が変わらない。

**原因**:
`change` イベントリスナーが正しく設定されていない、または `displayTasks()` が呼ばれていない。

**解決策**:
```javascript
// ❌ 間違い
categoryFilter.addEventListener('click', function() {
  currentCategory = categoryFilter.value;
  // displayTasks() を呼び忘れている
});

// ✅ 正しい
categoryFilter.addEventListener('change', function() {
  currentCategory = categoryFilter.value;
  displayTasks();  // 必ず呼ぶ
});
```

### 問題2: タスクにカテゴリが保存されない

**症状**:
タスクを追加しても、カテゴリ情報が保存されない。

**原因**:
タスク追加時に `category` プロパティを設定していない。

**解決策**:
```javascript
// ❌ 間違い
function addTask() {
  tasks.push({
    id: taskIdCounter++,
    text: taskInput.value,
    done: false
    // category プロパティがない
  });
}

// ✅ 正しい
function addTask() {
  let category = newTaskCategory.value;

  tasks.push({
    id: taskIdCounter++,
    text: taskInput.value,
    done: false,
    category: category  // カテゴリを追加
  });
}
```

### 問題3: 複合フィルターが正しく動作しない

**症状**:
カテゴリと完了状態のフィルターを組み合わせると、期待通りに絞り込まれない。

**原因**:
フィルターの順序が間違っている、または条件が正しくない。

**解決策**:
```javascript
// ❌ 間違い
function getFilteredTasks() {
  let filtered = tasks;

  // 完了状態を先にフィルター
  if (currentFilter === 'active') {
    filtered = tasks.filter(t => t.done === false);
  }

  // カテゴリを後にフィルター（元の配列を使ってしまう）
  if (currentCategory !== 'すべて') {
    filtered = tasks.filter(t => t.category === currentCategory);
  }

  return filtered;
}

// ✅ 正しい
function getFilteredTasks() {
  let filtered = tasks;

  // 1. カテゴリでフィルター
  if (currentCategory !== 'すべて') {
    filtered = filtered.filter(function(task) {
      return task.category === currentCategory;
    });
  }

  // 2. その結果をさらに完了状態でフィルター
  if (currentFilter === 'active') {
    filtered = filtered.filter(function(task) {
      return task.done === false;
    });
  } else if (currentFilter === 'completed') {
    filtered = filtered.filter(function(task) {
      return task.done === true;
    });
  }

  return filtered;
}
```

ポイントは、**`filtered` 変数を段階的に絞り込んでいく**ことです。

## まとめ

お疲れ様でした！今回は、TODOアプリにカテゴリ機能を追加しました。

### 今回学んだこと

1. **データ構造の拡張**
   - オブジェクトに新しいプロパティを追加する方法
   - `category` プロパティでタスクを分類

2. **カテゴリでのフィルター**
   - `filter()` メソッドでカテゴリごとにタスクを絞り込む
   - 複数の条件を組み合わせた複合フィルター

3. **UIの実装**
   - `<select>` 要素（ドロップダウンメニュー）の使い方
   - `change` イベントで選択変更を検知
   - カテゴリバッジの表示と色分け

4. **複数カテゴリの管理**
   - カテゴリリストを配列で管理
   - 動的にドロップダウンの選択肢を生成

### カリキュラム達成確認

✅ **タスクにカテゴリを追加**: オブジェクトに `category` プロパティを追加することで実現
✅ **カテゴリ別に表示**: `filter()` メソッドで特定カテゴリのタスクのみを抽出
✅ **カテゴリを選択できる**: `<select>` 要素と `change` イベントで実装
✅ **複数カテゴリの管理**: カテゴリリストを配列で管理し、動的に選択肢を生成

### 実際の開発での応用

カテゴリ機能は、様々なアプリケーションで使われています：

- **メールアプリ**: フォルダーやラベルで分類
- **ノートアプリ**: タグやノートブックで整理
- **ECサイト**: 商品カテゴリで分類
- **ファイル管理**: ディレクトリ構造で分類

カテゴリによる分類は、**情報を整理する基本的な仕組み**です。

### 次回予告

次回は、TODOアプリに**検索機能**を追加します。

キーワードでタスクを検索できるようにすることで、大量のタスクの中から目的のものを素早く見つけられるようになります。`includes()` メソッドや文字列操作について学びます。

---

**日付**: 2025-11-26
