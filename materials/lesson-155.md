# レッスン155：TODOアプリ（バリデーション編）

**日付**: 2025-11-26
**所要時間**: 30分

## このレッスンで学ぶこと

今回は、TODOアプリにバリデーション機能を追加します。バリデーションとは、ユーザーの入力が正しいかどうかをチェックする仕組みのことです。不正なデータを防ぐことで、アプリケーションの信頼性と品質を高めます。

### 学習目標

- 空のタスクを防ぐバリデーションを実装する
- 長すぎるタスクを防ぐバリデーションを実装する
- エラーメッセージを適切に表示する
- リアルタイムで入力チェックを行う

## 日常生活の例で理解する

バリデーションは、日常生活のあらゆる場面で使われています。

### 会員登録フォーム

オンラインショッピングで会員登録するときのことを想像してください。

```
[名前を入力してください]
→ (空のまま送信)
→ エラー: 名前を入力してください

[メールアドレスを入力してください]
→ "yamada" と入力
→ エラー: 正しいメールアドレスを入力してください

[パスワードを入力してください]
→ "123" と入力
→ エラー: パスワードは8文字以上で入力してください
```

このように、入力内容をチェックして問題があれば教えてくれます。これがバリデーションです。

### レジでの金額確認

コンビニのレジでも、バリデーションが行われています。

```
商品をスキャン
→ バーコードが読めない
→ エラー音が鳴る
→ 店員さんが手入力する

お金を入れる
→ 金額が足りない
→ 「あと100円必要です」と表示される
```

間違いを防ぐために、入力をチェックして適切にエラーを伝えています。

### ATMでの暗証番号入力

ATMで暗証番号を入力するときも、バリデーションが働いています。

```
[暗証番号を入力してください]
→ "12" と入力
→ エラー: 4桁の数字を入力してください

→ "1234" と入力
→ OK（処理が続く）

→ "あいう" と入力
→ エラー: 数字のみ入力できます
```

正しい形式の入力だけを受け付けることで、セキュリティを保っています。

## バリデーションとは

### バリデーションの目的

バリデーションには、以下の目的があります。

1. **データの品質を保つ**: 不正なデータがシステムに入らないようにする
2. **エラーを早期に発見**: 処理する前に問題を見つける
3. **ユーザー体験を向上**: 入力ミスを適切に伝えて修正を促す
4. **セキュリティを確保**: 悪意のある入力を防ぐ

### バリデーションの種類

バリデーションには、さまざまな種類があります。

```
1. 必須チェック（空チェック）
   → 値が入力されているか確認する

2. 形式チェック
   → メールアドレス、電話番号などの形式が正しいか確認する

3. 範囲チェック
   → 文字数、数値の範囲などが適切か確認する

4. 重複チェック
   → 同じ値がすでに存在しないか確認する

5. 関連チェック
   → 他の項目との関係が正しいか確認する
```

今回のTODOアプリでは、必須チェック（空チェック）と範囲チェック（文字数制限）を実装します。

## 空のタスクを防ぐ

### なぜ空のタスクを防ぐのか

空のタスクが登録されると、以下の問題が発生します。

```
問題1: 何のタスクか分からない
[  ] (空白)
[  ] 牛乳を買う
[  ] (空白)
→ 2つの空白タスクがある。何をすればいいのか分からない

問題2: 画面が見づらくなる
[  ] (空白)
[  ] (空白)
[  ] (空白)
→ 無駄なタスクが増えて、本当のタスクが見つけにくい

問題3: データの無駄
→ 意味のないデータがメモリやストレージを消費する
```

### trim()メソッドで空白を削除

ユーザーが入力した文字列には、前後に空白が含まれることがあります。

```javascript
const text1 = '牛乳を買う';        // 空白なし
const text2 = '  牛乳を買う  ';    // 前後に空白あり
const text3 = '     ';             // 空白のみ

// trim()で前後の空白を削除
const trimmed1 = text1.trim();  // '牛乳を買う'
const trimmed2 = text2.trim();  // '牛乳を買う'
const trimmed3 = text3.trim();  // '' (空文字列)
```

**実行の流れ**:

```
元の文字列: "   牛乳を買う   "
↓
trim()を実行
↓
前の空白を削除: "牛乳を買う   "
↓
後ろの空白を削除: "牛乳を買う"
↓
結果: "牛乳を買う"
```

trim()を使うことで、空白だけの入力を空文字列として検出できます。

### 空チェックの実装

```javascript
function addTask() {
  // 入力値を取得してtrim()で前後の空白を削除
  const text = taskInput.value.trim();

  // 空文字列かどうかをチェック
  if (text === '') {
    // エラーメッセージを表示
    showError('タスクを入力してください');
    // 処理を中断（タスクを追加しない）
    return;
  }

  // バリデーション通過
  // ここでタスクを追加する処理
  tasks.push({
    text: text,
    done: false
  });
}
```

**実行の流れ（空の場合）**:

```
ステップ1: ユーザーが「   」（空白のみ）を入力
taskInput.value = "   "

ステップ2: trim()で空白を削除
text = "   ".trim()
text = ""

ステップ3: 空チェック
if ("" === '') → true

ステップ4: エラーメッセージを表示
showError('タスクを入力してください')

ステップ5: 処理を中断
return  ← ここで関数が終了、タスクは追加されない
```

**実行の流れ（正常な場合）**:

```
ステップ1: ユーザーが「牛乳を買う」を入力
taskInput.value = "牛乳を買う"

ステップ2: trim()で空白を削除（この場合は変化なし）
text = "牛乳を買う".trim()
text = "牛乳を買う"

ステップ3: 空チェック
if ("牛乳を買う" === '') → false（チェックを通過）

ステップ4: タスクを追加
tasks.push({
  text: "牛乳を買う",
  done: false
})

ステップ5: タスクが正常に追加される
```

### ASCII図で理解する

```
入力チェックの流れ:

┌─────────────────────┐
│ ユーザーが入力      │
│ "   "               │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ trim()で空白削除    │
│ "" になる           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 空文字列チェック    │
│ if (text === '')    │
└──────────┬──────────┘
           │
      YES  │  NO
    ┌──────┴──────┐
    ▼             ▼
┌─────┐      ┌─────────┐
│エラー│      │タスク追加│
│表示  │      │         │
└─────┘      └─────────┘
```

## エラーメッセージの表示

### エラーメッセージの重要性

エラーメッセージは、ユーザーに問題を伝えて修正を促す重要な役割があります。

```
悪いエラーメッセージ:
❌ エラー
❌ 入力が不正です
→ 何が問題なのか分からない

良いエラーメッセージ:
✅ タスクを入力してください
✅ タスクは100文字以内で入力してください
→ 何が問題で、どう修正すればよいかが明確
```

### エラー表示関数の実装

```javascript
function showError(message) {
  // エラーメッセージ要素を取得
  const errorDiv = document.getElementById('error-message');

  // メッセージを設定
  errorDiv.textContent = message;

  // エラーを表示
  errorDiv.style.display = 'block';

  // 3秒後に自動的に非表示にする
  setTimeout(function() {
    errorDiv.style.display = 'none';
  }, 3000);
}
```

**実行の流れ**:

```
ステップ1: showError('タスクを入力してください')を呼び出し

ステップ2: エラー要素を取得
errorDiv = <div id="error-message">要素

ステップ3: メッセージを設定
errorDiv.textContent = 'タスクを入力してください'
→ <div id="error-message">タスクを入力してください</div>

ステップ4: エラーを表示
errorDiv.style.display = 'block'
→ 画面にエラーメッセージが表示される

ステップ5: タイマーを設定
setTimeout(function() { ... }, 3000)
→ 3秒後に実行される関数を予約

--- 3秒経過 ---

ステップ6: エラーを非表示
errorDiv.style.display = 'none'
→ エラーメッセージが消える
```

### タイムラインで理解する

```
0秒: showError()を呼び出し
     ↓
     エラーメッセージ表示
     [エラー: タスクを入力してください]
     ↓
1秒: まだ表示中
     [エラー: タスクを入力してください]
     ↓
2秒: まだ表示中
     [エラー: タスクを入力してください]
     ↓
3秒: 自動的に非表示
     (エラーメッセージが消える)
```

この仕組みにより、エラーを見逃さずに、かつ画面が見やすく保たれます。

## 長すぎるタスクを防ぐ

### なぜ文字数制限が必要なのか

長すぎるタスクは、さまざまな問題を引き起こします。

```
問題1: 画面に収まらない
[  ] 今日は朝早く起きて朝ごはんを食べてから会社に行って午前中に会議に出て午後は資料を作成して...
→ 画面からはみ出して読みづらい

問題2: タスクの本質が分からない
→ 長すぎて何が重要なのか分からない

問題3: データベースのエラー
→ データベースの文字数制限を超えてエラーになる可能性がある

問題4: パフォーマンスの低下
→ 大量の文字データで処理が遅くなる
```

### 最大文字数を定数で定義

```javascript
// 最大文字数を定数で定義
const MAX_TASK_LENGTH = 100;

// なぜ定数を使うのか:
// 1. 変更が簡単（一箇所を変えるだけで全体に反映される）
// 2. 意味が明確（100という数字だけより分かりやすい）
// 3. 誤って変更されない（const宣言で再代入を防ぐ）
```

### 文字数チェックの実装

```javascript
function addTask() {
  const text = taskInput.value.trim();

  // 1. 空チェック
  if (text === '') {
    showError('タスクを入力してください');
    return;
  }

  // 2. 文字数チェック
  if (text.length > MAX_TASK_LENGTH) {
    showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください');
    return;
  }

  // 3. バリデーション通過
  tasks.push({
    text: text,
    done: false
  });
}
```

**実行の流れ（文字数オーバーの場合）**:

```
ステップ1: ユーザーが101文字を入力
text = "あいうえお..." (101文字)

ステップ2: 空チェック
if ("あいうえお..." === '') → false（通過）

ステップ3: 文字数チェック
text.length = 101
MAX_TASK_LENGTH = 100

if (101 > 100) → true（エラー）

ステップ4: エラーメッセージを表示
showError('タスクは100文字以内で入力してください')

ステップ5: 処理を中断
return  ← タスクは追加されない
```

**実行の流れ（正常な場合）**:

```
ステップ1: ユーザーが50文字を入力
text = "牛乳を買って、掃除をして、..." (50文字)

ステップ2: 空チェック
if ("牛乳を..." === '') → false（通過）

ステップ3: 文字数チェック
text.length = 50
MAX_TASK_LENGTH = 100

if (50 > 100) → false（通過）

ステップ4: タスクを追加
tasks.push({
  text: "牛乳を買って、掃除をして、...",
  done: false
})

ステップ5: タスクが正常に追加される
```

### バリデーションの順序

```
バリデーションは順番が重要:

1. 空チェック
   ↓ 通過
2. 文字数チェック
   ↓ 通過
3. （他のチェックがあればここで実行）
   ↓ 通過
4. データを保存

なぜこの順番なのか:
- 基本的なチェックから順番に実行
- 早い段階でエラーを検出
- 無駄な処理を避ける（空なのに文字数をチェックしても意味がない）
```

## リアルタイム入力チェック

### なぜリアルタイムでチェックするのか

ユーザーが入力している最中にフィードバックを提供することで、ユーザー体験が向上します。

```
従来の方法（送信時のみチェック）:
1. ユーザーが長文を入力
2. 送信ボタンを押す
3. エラー: 文字数オーバーです
4. ユーザーががっかりして文字を削る
→ 時間の無駄、ストレス

リアルタイムチェック:
1. ユーザーが入力中
2. 文字数カウンター: 95/100
3. さらに入力
4. 文字数カウンター: 101/100（赤くなる）
5. ユーザーがすぐに気づいて調整
→ スムーズ、ストレスなし
```

### 文字数カウンターの実装

```javascript
// inputイベントで入力のたびに実行
taskInput.addEventListener('input', function() {
  // 現在の文字数を取得
  const length = taskInput.value.length;

  // 文字数カウンターを更新
  charCount.textContent = length;

  // 文字数オーバーの場合
  if (length > MAX_TASK_LENGTH) {
    // カウンターを赤くする
    charCount.classList.add('over');
    // 入力欄の枠も赤くする
    taskInput.classList.add('error');
  } else {
    // 正常な場合は赤を解除
    charCount.classList.remove('over');
    taskInput.classList.remove('error');
  }
});
```

**実行の流れ（ユーザーが入力する様子）**:

```
初期状態:
taskInput.value = ""
charCount.textContent = "0"

--- ユーザーが「牛」と入力 ---

inputイベント発火
↓
length = "牛".length = 1
charCount.textContent = "1"
if (1 > 100) → false
→ 赤いスタイルは適用されない

画面表示: 1 / 100

--- ユーザーがさらに入力を続ける ---

taskInput.value = "牛乳を買って掃除をして..." (98文字)
↓
length = 98
charCount.textContent = "98"
if (98 > 100) → false

画面表示: 98 / 100

--- ユーザーがさらに入力 ---

taskInput.value = "牛乳を買って掃除をして..." (101文字)
↓
length = 101
charCount.textContent = "101"
if (101 > 100) → true
charCount.classList.add('over')  ← カウンターが赤くなる
taskInput.classList.add('error')  ← 入力欄の枠が赤くなる

画面表示: 101 / 100（赤字で表示）
```

### 視覚的フィードバックの効果

```
文字数カウンター:
0/100  → 黒色（正常）
50/100 → 黒色（正常）
99/100 → 黒色（正常）
101/100 → 赤色（エラー）← ユーザーがすぐに気づく

入力欄の枠:
通常: 灰色の枠
エラー時: 赤い枠 ← 視覚的に問題を伝える
```

### CSSでスタイルを定義

```css
/* 通常の文字数カウンター */
#char-count {
  color: #666;
}

/* 文字数オーバー時 */
#char-count.over {
  color: #dc3545;  /* 赤色 */
  font-weight: bold;
}

/* 通常の入力欄 */
#task-input {
  border: 2px solid #ccc;  /* 灰色の枠 */
}

/* エラー時の入力欄 */
#task-input.error {
  border-color: #dc3545;  /* 赤い枠 */
}
```

## 実践例1: 基本的なバリデーション機能

空チェックと文字数制限を実装したシンプルなTODOアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>TODOアプリ（基本バリデーション）</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }

    #error-message {
      display: none;
      background-color: #dc3545;
      color: white;
      padding: 10px;
      margin-bottom: 20px;
      border-radius: 4px;
      text-align: center;
    }

    #input-container {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }

    #task-input {
      flex: 1;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ccc;
      border-radius: 4px;
    }

    #task-input.error {
      border-color: #dc3545;
    }

    #add-btn {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    #char-counter {
      text-align: right;
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
    }

    #char-count.over {
      color: #dc3545;
      font-weight: bold;
    }

    #task-list {
      list-style: none;
      padding: 0;
    }

    #task-list li {
      padding: 10px;
      margin-bottom: 5px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    #task-list li.completed {
      text-decoration: line-through;
      color: #999;
    }
  </style>
</head>
<body>
  <h1>TODOアプリ（基本バリデーション）</h1>

  <div id="error-message"></div>

  <div id="input-container">
    <input type="text" id="task-input" placeholder="新しいタスクを入力">
    <button id="add-btn">追加</button>
  </div>

  <div id="char-counter">
    <span id="char-count">0</span> / 50
  </div>

  <ul id="task-list"></ul>

  <script>
    // タスクの配列
    let tasks = [];

    // 最大文字数
    const MAX_TASK_LENGTH = 50;

    // DOM要素の取得
    const errorMessage = document.getElementById('error-message');
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const charCount = document.getElementById('char-count');

    // エラーメッセージを表示
    function showError(message) {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';

      setTimeout(function() {
        errorMessage.style.display = 'none';
      }, 3000);
    }

    // タスクを表示
    function displayTasks() {
      taskList.innerHTML = '';

      tasks.forEach(function(task, index) {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;

        checkbox.addEventListener('change', function() {
          tasks[index].done = checkbox.checked;
          displayTasks();
        });

        const span = document.createElement('span');
        span.textContent = task.text;

        if (task.done) {
          li.classList.add('completed');
        }

        li.appendChild(checkbox);
        li.appendChild(span);
        taskList.appendChild(li);
      });
    }

    // タスクを追加
    function addTask() {
      const text = taskInput.value.trim();

      // 空チェック
      if (text === '') {
        showError('タスクを入力してください');
        return;
      }

      // 文字数チェック
      if (text.length > MAX_TASK_LENGTH) {
        showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください（現在：' + text.length + '文字）');
        return;
      }

      // バリデーション通過
      tasks.push({
        text: text,
        done: false
      });

      taskInput.value = '';
      charCount.textContent = '0';
      charCount.classList.remove('over');
      taskInput.classList.remove('error');
      displayTasks();
    }

    // 文字数カウンターを更新
    taskInput.addEventListener('input', function() {
      const length = taskInput.value.length;
      charCount.textContent = length;

      if (length > MAX_TASK_LENGTH) {
        charCount.classList.add('over');
        taskInput.classList.add('error');
      } else {
        charCount.classList.remove('over');
        taskInput.classList.remove('error');
      }
    });

    // 追加ボタンのイベント
    addBtn.addEventListener('click', addTask);

    // Enterキーで追加
    taskInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addTask();
      }
    });

    // 初期表示
    displayTasks();
  </script>
</body>
</html>
```

### コードの詳しい解説

**1. 定数の定義**

```javascript
const MAX_TASK_LENGTH = 50;
```

最大文字数を定数で定義することで、後から変更しやすくなります。

**2. エラー表示関数**

```javascript
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';

  setTimeout(function() {
    errorMessage.style.display = 'none';
  }, 3000);
}
```

エラーメッセージを3秒間表示して、自動的に消えるようにしています。

**3. バリデーション処理**

```javascript
function addTask() {
  const text = taskInput.value.trim();

  // 1. 空チェック
  if (text === '') {
    showError('タスクを入力してください');
    return;
  }

  // 2. 文字数チェック
  if (text.length > MAX_TASK_LENGTH) {
    showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください（現在：' + text.length + '文字）');
    return;
  }

  // 3. バリデーション通過後にタスク追加
  tasks.push({
    text: text,
    done: false
  });

  // 4. 入力欄をクリア
  taskInput.value = '';
  charCount.textContent = '0';
  charCount.classList.remove('over');
  taskInput.classList.remove('error');
  displayTasks();
}
```

**4. リアルタイム文字数チェック**

```javascript
taskInput.addEventListener('input', function() {
  const length = taskInput.value.length;
  charCount.textContent = length;

  if (length > MAX_TASK_LENGTH) {
    charCount.classList.add('over');
    taskInput.classList.add('error');
  } else {
    charCount.classList.remove('over');
    taskInput.classList.remove('error');
  }
});
```

inputイベントで、ユーザーが入力するたびに文字数をチェックして視覚的フィードバックを提供します。

## 実践例2: 完全なバリデーション付きTODOアプリ

カテゴリ、検索、編集機能も含めた、完全なバリデーション付きTODOアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>TODOアプリ（完全版バリデーション）</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 700px;
      margin: 50px auto;
      padding: 20px;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    #error-message {
      display: none;
      background-color: #dc3545;
      color: white;
      padding: 12px;
      margin-bottom: 20px;
      border-radius: 4px;
      text-align: center;
      font-weight: bold;
    }

    #success-message {
      display: none;
      background-color: #28a745;
      color: white;
      padding: 12px;
      margin-bottom: 20px;
      border-radius: 4px;
      text-align: center;
      font-weight: bold;
    }

    #search-container {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    #search-input {
      flex: 1;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #007bff;
      border-radius: 4px;
    }

    #clear-search-btn {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      background-color: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
    }

    #input-container {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }

    #task-input {
      flex: 1;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ccc;
      border-radius: 4px;
    }

    #task-input.error {
      border-color: #dc3545;
    }

    #category-select {
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ccc;
      border-radius: 4px;
    }

    #add-btn {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
    }

    #char-counter {
      text-align: right;
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
    }

    #char-count.over {
      color: #dc3545;
      font-weight: bold;
    }

    #filter-container {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      align-items: center;
    }

    #filter-category {
      padding: 8px;
      font-size: 14px;
      border: 2px solid #ccc;
      border-radius: 4px;
    }

    #filter-buttons button {
      padding: 8px 16px;
      cursor: pointer;
      border: 1px solid #ccc;
      background-color: white;
      border-radius: 4px;
    }

    #filter-buttons button.active {
      background-color: #007bff;
      color: white;
      border-color: #007bff;
    }

    #task-list {
      list-style: none;
      padding: 0;
    }

    #task-list li {
      padding: 12px;
      margin-bottom: 8px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    #task-list li.completed .task-text {
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
      cursor: pointer;
    }

    .edit-input {
      flex: 1;
      padding: 8px;
      font-size: 16px;
      border: 2px solid #007bff;
      border-radius: 4px;
    }

    .edit-btn, .save-btn, .cancel-btn {
      padding: 6px 12px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      color: white;
      font-size: 14px;
    }

    .edit-btn {
      background-color: #007bff;
    }

    .save-btn {
      background-color: #28a745;
    }

    .cancel-btn {
      background-color: #dc3545;
    }
  </style>
</head>
<body>
  <h1>TODOアプリ（完全版バリデーション）</h1>

  <div id="error-message"></div>
  <div id="success-message"></div>

  <div id="search-container">
    <input type="text" id="search-input" placeholder="タスクを検索...">
    <button id="clear-search-btn">クリア</button>
  </div>

  <div id="input-container">
    <input type="text" id="task-input" placeholder="新しいタスクを入力" maxlength="100">
    <select id="category-select">
      <option value="仕事">仕事</option>
      <option value="プライベート">プライベート</option>
      <option value="買い物">買い物</option>
    </select>
    <button id="add-btn">追加</button>
  </div>

  <div id="char-counter">
    <span id="char-count">0</span> / 100
  </div>

  <div id="filter-container">
    <label>カテゴリ:</label>
    <select id="filter-category">
      <option value="すべて">すべて</option>
      <option value="仕事">仕事</option>
      <option value="プライベート">プライベート</option>
      <option value="買い物">買い物</option>
    </select>

    <div id="filter-buttons">
      <button id="filter-all" class="active">すべて</button>
      <button id="filter-active">未完了</button>
      <button id="filter-completed">完了</button>
    </div>
  </div>

  <ul id="task-list"></ul>

  <script>
    // タスクの配列
    let tasks = [];

    // 現在のフィルター状態
    let currentFilter = 'all';
    let currentCategory = 'すべて';

    // 編集中のタスクのインデックス
    let editingIndex = -1;

    // 最大文字数
    const MAX_TASK_LENGTH = 100;

    // DOM要素の取得
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const taskInput = document.getElementById('task-input');
    const categorySelect = document.getElementById('category-select');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const filterCategory = document.getElementById('filter-category');
    const filterAllBtn = document.getElementById('filter-all');
    const filterActiveBtn = document.getElementById('filter-active');
    const filterCompletedBtn = document.getElementById('filter-completed');
    const charCount = document.getElementById('char-count');

    // カテゴリごとの色
    const categoryColors = {
      '仕事': '#ff6b6b',
      'プライベート': '#4ecdc4',
      '買い物': '#ffe66d'
    };

    // エラーメッセージを表示
    function showError(message) {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';

      setTimeout(function() {
        errorMessage.style.display = 'none';
      }, 3000);
    }

    // 成功メッセージを表示
    function showSuccess(message) {
      successMessage.textContent = message;
      successMessage.style.display = 'block';

      setTimeout(function() {
        successMessage.style.display = 'none';
      }, 2000);
    }

    // 検索キーワードを取得
    function getSearchKeyword() {
      const keyword = searchInput.value.trim();
      return keyword.toLowerCase();
    }

    // フィルターに応じたタスクを取得
    function getFilteredTasks() {
      let filtered = tasks;

      // 検索キーワードでフィルター
      const keyword = getSearchKeyword();
      if (keyword !== '') {
        filtered = filtered.filter(function(task) {
          return task.text.toLowerCase().includes(keyword);
        });
      }

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

      const filteredTasks = getFilteredTasks();

      if (filteredTasks.length === 0) {
        const message = document.createElement('li');
        message.textContent = 'タスクが見つかりませんでした';
        message.style.textAlign = 'center';
        message.style.color = '#999';
        taskList.appendChild(message);
        return;
      }

      filteredTasks.forEach(function(task) {
        const li = document.createElement('li');

        const originalIndex = tasks.indexOf(task);

        // カテゴリバッジを作成
        const categoryBadge = document.createElement('span');
        categoryBadge.textContent = task.category;
        categoryBadge.className = 'category-badge';
        categoryBadge.style.backgroundColor = categoryColors[task.category] || '#999';
        li.appendChild(categoryBadge);

        // 編集モード
        if (originalIndex === editingIndex) {
          const input = document.createElement('input');
          input.type = 'text';
          input.value = task.text;
          input.className = 'edit-input';
          input.maxLength = MAX_TASK_LENGTH;

          const saveBtn = document.createElement('button');
          saveBtn.textContent = '保存';
          saveBtn.className = 'save-btn';

          saveBtn.addEventListener('click', function() {
            const newText = input.value.trim();

            // 空チェック
            if (newText === '') {
              showError('タスクを入力してください');
              return;
            }

            // 文字数チェック
            if (newText.length > MAX_TASK_LENGTH) {
              showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください（現在：' + newText.length + '文字）');
              return;
            }

            // バリデーション通過
            tasks[originalIndex].text = newText;
            editingIndex = -1;
            displayTasks();
            showSuccess('タスクを更新しました');
          });

          const cancelBtn = document.createElement('button');
          cancelBtn.textContent = 'キャンセル';
          cancelBtn.className = 'cancel-btn';

          cancelBtn.addEventListener('click', function() {
            editingIndex = -1;
            displayTasks();
          });

          // Enterキーで保存、Escapeキーでキャンセル
          input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
              saveBtn.click();
            } else if (e.key === 'Escape') {
              cancelBtn.click();
            }
          });

          li.appendChild(input);
          li.appendChild(saveBtn);
          li.appendChild(cancelBtn);

          // 入力欄にフォーカス
          setTimeout(function() {
            input.focus();
            input.select();
          }, 0);
        } else {
          // 通常モード
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = task.done;

          checkbox.addEventListener('change', function() {
            tasks[originalIndex].done = checkbox.checked;
            displayTasks();
          });

          const taskText = document.createElement('span');
          taskText.textContent = task.text;
          taskText.className = 'task-text';

          taskText.addEventListener('dblclick', function() {
            editingIndex = originalIndex;
            displayTasks();
          });

          const editBtn = document.createElement('button');
          editBtn.textContent = '編集';
          editBtn.className = 'edit-btn';

          editBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            editingIndex = originalIndex;
            displayTasks();
          });

          if (task.done) {
            li.classList.add('completed');
          }

          li.appendChild(checkbox);
          li.appendChild(taskText);
          li.appendChild(editBtn);
        }

        taskList.appendChild(li);
      });

      updateFilterButtons();
    }

    // フィルターボタンの状態を更新
    function updateFilterButtons() {
      filterAllBtn.classList.remove('active');
      filterActiveBtn.classList.remove('active');
      filterCompletedBtn.classList.remove('active');

      if (currentFilter === 'all') {
        filterAllBtn.classList.add('active');
      } else if (currentFilter === 'active') {
        filterActiveBtn.classList.add('active');
      } else if (currentFilter === 'completed') {
        filterCompletedBtn.classList.add('active');
      }
    }

    // タスクを追加
    function addTask() {
      const text = taskInput.value.trim();
      const category = categorySelect.value;

      // 1. 空チェック
      if (text === '') {
        showError('タスクを入力してください');
        return;
      }

      // 2. 文字数チェック
      if (text.length > MAX_TASK_LENGTH) {
        showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください（現在：' + text.length + '文字）');
        return;
      }

      // 3. バリデーション通過
      tasks.push({
        text: text,
        done: false,
        category: category
      });

      taskInput.value = '';
      charCount.textContent = '0';
      charCount.classList.remove('over');
      taskInput.classList.remove('error');
      displayTasks();
      showSuccess('タスクを追加しました');
    }

    // 文字数カウンターを更新
    taskInput.addEventListener('input', function() {
      const length = taskInput.value.length;
      charCount.textContent = length;

      if (length > MAX_TASK_LENGTH) {
        charCount.classList.add('over');
        taskInput.classList.add('error');
      } else {
        charCount.classList.remove('over');
        taskInput.classList.remove('error');
      }
    });

    // 検索のイベントリスナー
    searchInput.addEventListener('input', function() {
      displayTasks();
    });

    // 検索クリアのイベントリスナー
    clearSearchBtn.addEventListener('click', function() {
      searchInput.value = '';
      displayTasks();
    });

    // Escapeキーで検索をクリア
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        searchInput.value = '';
        displayTasks();
      }
    });

    // カテゴリ選択のイベントリスナー
    filterCategory.addEventListener('change', function() {
      currentCategory = filterCategory.value;
      displayTasks();
    });

    // フィルターボタンのイベントリスナー
    filterAllBtn.addEventListener('click', function() {
      currentFilter = 'all';
      displayTasks();
    });

    filterActiveBtn.addEventListener('click', function() {
      currentFilter = 'active';
      displayTasks();
    });

    filterCompletedBtn.addEventListener('click', function() {
      currentFilter = 'completed';
      displayTasks();
    });

    // 追加ボタンのイベント
    addBtn.addEventListener('click', addTask);

    // Enterキーで追加
    taskInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addTask();
      }
    });

    // 初期表示
    displayTasks();
  </script>
</body>
</html>
```

### このアプリの特徴

**1. 包括的なバリデーション**

```javascript
function addTask() {
  const text = taskInput.value.trim();

  // 空チェック
  if (text === '') {
    showError('タスクを入力してください');
    return;
  }

  // 文字数チェック
  if (text.length > MAX_TASK_LENGTH) {
    showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください（現在：' + text.length + '文字）');
    return;
  }

  // バリデーション通過後に追加
  tasks.push({
    text: text,
    done: false,
    category: category
  });
}
```

追加時と編集時の両方でバリデーションを実施しています。

**2. リアルタイムフィードバック**

```javascript
taskInput.addEventListener('input', function() {
  const length = taskInput.value.length;
  charCount.textContent = length;

  if (length > MAX_TASK_LENGTH) {
    charCount.classList.add('over');
    taskInput.classList.add('error');
  } else {
    charCount.classList.remove('over');
    taskInput.classList.remove('error');
  }
});
```

ユーザーが入力中にリアルタイムで文字数をチェックして視覚的フィードバックを提供します。

**3. 成功メッセージとエラーメッセージ**

```javascript
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  setTimeout(function() {
    errorMessage.style.display = 'none';
  }, 3000);
}

function showSuccess(message) {
  successMessage.textContent = message;
  successMessage.style.display = 'block';
  setTimeout(function() {
    successMessage.style.display = 'none';
  }, 2000);
}
```

エラー時と成功時の両方でメッセージを表示し、自動的に消えるようにしています。

**4. 編集時のバリデーション**

```javascript
saveBtn.addEventListener('click', function() {
  const newText = input.value.trim();

  // 空チェック
  if (newText === '') {
    showError('タスクを入力してください');
    return;
  }

  // 文字数チェック
  if (newText.length > MAX_TASK_LENGTH) {
    showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください（現在：' + newText.length + '文字）');
    return;
  }

  // バリデーション通過
  tasks[originalIndex].text = newText;
  editingIndex = -1;
  displayTasks();
  showSuccess('タスクを更新しました');
});
```

編集時にも同じバリデーションルールを適用しています。

## よくある問題と解決策

### 問題1: trim()を忘れて空白だけのタスクが追加される

```javascript
// 問題のあるコード
function addTask() {
  const text = taskInput.value;  // trim()を忘れている

  if (text === '') {
    showError('タスクを入力してください');
    return;
  }

  // "   "（空白のみ）でも追加されてしまう
  tasks.push({text: text, done: false});
}
```

**解決策**: 必ずtrim()を使う

```javascript
// 正しいコード
function addTask() {
  const text = taskInput.value.trim();  // trim()で前後の空白を削除

  if (text === '') {
    showError('タスクを入力してください');
    return;
  }

  // 空白だけの入力は弾かれる
  tasks.push({text: text, done: false});
}
```

### 問題2: エラーメッセージが消えない

```javascript
// 問題のあるコード
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  // 自動的に消える処理がない
}
```

**解決策**: setTimeoutで自動的に消す

```javascript
// 正しいコード
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';

  // 3秒後に自動的に消す
  setTimeout(function() {
    errorMessage.style.display = 'none';
  }, 3000);
}
```

### 問題3: バリデーションの順序が間違っている

```javascript
// 問題のあるコード
function addTask() {
  const text = taskInput.value.trim();

  // 重複チェック（重い処理）
  const isDuplicate = tasks.some(function(task) {
    return task.text === text;
  });

  if (isDuplicate) {
    showError('同じタスクがすでに存在します');
    return;
  }

  // 空チェック（軽い処理なのに最後）
  if (text === '') {
    showError('タスクを入力してください');
    return;
  }
}
```

**解決策**: 軽いチェックから順番に実行

```javascript
// 正しいコード
function addTask() {
  const text = taskInput.value.trim();

  // 1. 空チェック（軽い処理を先に）
  if (text === '') {
    showError('タスクを入力してください');
    return;
  }

  // 2. 文字数チェック（中程度の処理）
  if (text.length > MAX_TASK_LENGTH) {
    showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください');
    return;
  }

  // 3. 重複チェック（重い処理を最後に）
  const isDuplicate = tasks.some(function(task) {
    return task.text === text;
  });

  if (isDuplicate) {
    showError('同じタスクがすでに存在します');
    return;
  }

  // すべてのバリデーション通過
  tasks.push({text: text, done: false});
}
```

### 問題4: エラーメッセージが具体的でない

```javascript
// 問題のあるコード
if (text.length > MAX_TASK_LENGTH) {
  showError('タスクが長すぎます');  // 何文字オーバーか分からない
  return;
}
```

**解決策**: 具体的な情報を含める

```javascript
// 正しいコード
if (text.length > MAX_TASK_LENGTH) {
  showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください（現在：' + text.length + '文字）');
  return;
}

// 例: 「タスクは100文字以内で入力してください（現在：125文字）」
// → ユーザーは25文字削ればよいことが分かる
```

### 問題5: リアルタイムチェックがない

```javascript
// 問題のあるコード
// 追加ボタンを押すまで文字数オーバーに気づかない
addBtn.addEventListener('click', function() {
  const text = taskInput.value.trim();

  if (text.length > MAX_TASK_LENGTH) {
    showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください');
    return;
  }

  // タスクを追加
});
```

**解決策**: inputイベントでリアルタイムチェック

```javascript
// 正しいコード
// 入力中にリアルタイムでチェック
taskInput.addEventListener('input', function() {
  const length = taskInput.value.length;
  charCount.textContent = length;

  if (length > MAX_TASK_LENGTH) {
    charCount.classList.add('over');  // カウンターを赤くする
    taskInput.classList.add('error');  // 入力欄の枠を赤くする
  } else {
    charCount.classList.remove('over');
    taskInput.classList.remove('error');
  }
});

// 追加時のバリデーション
addBtn.addEventListener('click', function() {
  const text = taskInput.value.trim();

  if (text.length > MAX_TASK_LENGTH) {
    showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください');
    return;
  }

  // タスクを追加
});
```

## 練習問題

### 課題

堅牢なTODOアプリを作成してください。バリデーション機能を追加して、不正な入力を防ぎ、適切なエラーメッセージを表示します。

### 保存場所

`exercises/lesson-155/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 仕様

以下の機能を実装してください。

1. **空のタスクを防ぐ**
   - trim()メソッドで前後の空白を削除
   - 空文字列の場合はエラーメッセージを表示
   - タスクを追加する関数と編集保存の関数の両方で実装

2. **長すぎるタスクを防ぐ**
   - 最大文字数を100文字に設定
   - text.lengthで文字数を取得し、最大値と比較
   - エラーメッセージには、制限文字数と現在の文字数を表示

3. **エラーメッセージを表示**
   - エラーメッセージを表示するための要素をHTMLに追加
   - showError()関数を作成して、エラーメッセージを表示
   - setTimeoutを使って、3秒後に自動で非表示にする

4. **入力チェック**
   - 入力欄のinputイベントで、入力のたびに文字数をチェック
   - 文字数カウンターを表示して、残りの文字数を表示
   - 制限を超えたら、視覚的なフィードバック（赤文字、赤枠など）を表示

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-155
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**空のタスクを防ぐ**

- `trim()` メソッドで前後の空白を削除します
- 空文字列の場合は、エラーメッセージを表示して `return` します
- タスクを追加する関数と編集保存の関数の両方で実装します

**長さチェック**

- 最大文字数を定数で定義します（例: `MAX_TASK_LENGTH = 100`）
- `text.length` で文字数を取得し、最大値と比較します
- エラーメッセージには、制限文字数と現在の文字数を表示すると親切です

**エラーメッセージの表示**

- エラーメッセージを表示するための要素をHTMLに追加します
- `showError()` 関数を作成して、エラーメッセージを表示します
- `setTimeout()` を使って、一定時間後に自動で非表示にします

**リアルタイム入力チェック**

- 入力欄の `input` イベントで、入力のたびに文字数をチェックします
- 文字数カウンターを表示して、残りの文字数を表示します
- 制限を超えたら、視覚的なフィードバック（赤文字、赤枠など）を表示します

## まとめ

お疲れ様でした。今回は、TODOアプリにバリデーション機能を追加しました。ユーザーの入力をチェックして不正なデータを防ぐことで、より堅牢なアプリになりました。

### 今回学んだキーポイント

- **バリデーション**: ユーザーの入力をチェックして、不正なデータを防ぐことで、データの品質を保ちます。空チェック、長さチェックなど、適切なバリデーションを実装することが重要です

- **trim()メソッド**: 文字列の前後の空白を削除するメソッドです。空白だけの入力を空文字列として検出できます

- **エラー処理**: エラーが発生したときに、分かりやすいメッセージをユーザーに伝えます。エラーメッセージは具体的で、どう修正すればよいかが分かる内容にします

- **リアルタイムフィードバック**: ユーザーが入力しながらエラーに気づけるように、リアルタイムでチェックします。文字数カウンターや視覚的なフィードバックにより、ユーザーエクスペリエンスが向上します

- **バリデーションの順序**: 基本的なチェックから順番に実行することで、効率的にエラーを検出できます。軽い処理から重い処理へと順番に実行します

### カリキュラムの達成状況

✅ 空のタスクを防ぐ
✅ 長すぎるタスクを防ぐ
✅ エラーメッセージを表示
✅ 入力チェック

バリデーションは、あらゆるWebアプリケーションで必要な機能です。フォーム入力、ユーザー登録、コメント投稿など、ユーザーがデータを入力するすべての場面でバリデーションが使われています。

適切なバリデーションを実装することで、ユーザーに快適な入力体験を提供し、システムの信頼性を高めることができます。

## 次のレッスンの予告

次回は、TODOアプリにカウンター機能を追加します。全タスク数、未完了タスク数などの統計情報を表示することで、タスクの進捗状況を把握しやすくします。お楽しみに。
