# レッスン157：TODOアプリ（完成編）

**日付**: 2025-11-26
**所要時間**: 30分

## このレッスンで学ぶこと

今回は、TODOアプリの完成編です。これまでに実装したすべての機能を統合し、削除機能などの最終的な機能を追加して、完全に動作するTODOアプリを完成させます。

### 学習目標

- すべての機能を統合する
- コードを整理して読みやすくする
- バグを修正して安定性を高める
- すべての機能が正しく動作することを確認する

## 日常生活の例で理解する

アプリケーションの完成は、日常生活のプロジェクト完成と似ています。

### 家を建てる過程

家を建てるとき、段階的に作業を進めていきます。

```
1. 基礎工事（レッスン146-149: 基本機能）
   → タスクの追加、表示、完了、削除

2. 柱と壁（レッスン150: データ永続化）
   → localStorageで保存

3. 屋根（レッスン151: フィルター機能）
   → すべて/未完了/完了の切り替え

4. 部屋の仕切り（レッスン152: カテゴリ機能）
   → タスクをカテゴリ別に整理

5. 窓とドア（レッスン153: 検索機能）
   → タスクを素早く見つける

6. 内装（レッスン154-155: 編集とバリデーション）
   → タスクの編集と入力チェック

7. 設備（レッスン156: 統計機能）
   → 進捗を把握する

8. 最終仕上げ（レッスン157: 完成編）
   → すべてを統合して完成させる
```

各段階を確実に進めることで、安全で快適な家が完成します。

### 料理の最終仕上げ

料理も、最後の仕上げが大切です。

```
料理の準備:
- 材料を切る（各機能の実装）
- 炒める、煮る（機能の動作確認）
- 味付けをする（バリデーション）

最終仕上げ:
- 盛り付けを整える（コードの整理）
- 味見をする（バグ修正）
- 温度を確認する（動作確認）
- テーブルに出す（完成）

→ すべての工程を経て、おいしい料理が完成
```

## これまでに実装した機能の振り返り

### 機能の一覧

レッスン146からレッスン156までで実装してきた機能を振り返ります。

```
レッスン146: 基本機能
├─ タスクの追加
├─ タスクの表示
└─ 配列でデータ管理

レッスン147: 完了機能
├─ チェックボックスで完了/未完了を切り替え
└─ 完了タスクの取り消し線表示

レッスン148: 削除機能（基本）
└─ splice()でタスクを削除

レッスン149: DOM操作の理解
└─ createElement()で要素を動的に作成

レッスン150: データ永続化
├─ localStorageへの保存
├─ JSON.stringify()とJSON.parse()
└─ ページ再読み込み時のデータ復元

レッスン151: フィルター機能
├─ すべて/未完了/完了の切り替え
├─ filter()メソッドの活用
└─ ボタンのアクティブ状態管理

レッスン152: カテゴリ機能
├─ タスクにcategoryプロパティを追加
├─ カテゴリ別の表示
├─ カテゴリバッジの色分け
└─ select要素でカテゴリ選択

レッスン153: 検索機能
├─ includes()で部分一致検索
├─ toLowerCase()で大文字小文字を無視
├─ inputイベントでリアルタイム検索
└─ 検索とフィルターの組み合わせ

レッスン154: 編集機能
├─ 編集モードと通常モードの切り替え
├─ editingIndex変数で状態管理
├─ stopPropagation()でイベント伝播を防止
└─ Enter/Escapeキーで保存/キャンセル

レッスン155: バリデーション
├─ trim()で空白を削除
├─ 空のタスクを防ぐ
├─ 文字数制限（最大100文字）
├─ エラーメッセージの表示
└─ リアルタイム文字数カウンター

レッスン156: 統計機能
├─ 全タスク数の表示
├─ 未完了タスク数の表示
├─ 完了タスク数の表示
└─ 統計の自動更新
```

これらすべての機能を統合して、完全なTODOアプリを完成させます。

## 削除機能の完成

### なぜ削除機能が必要なのか

削除機能は、TODOアプリに不可欠な機能です。

```
削除機能がない場合:
[✓] 牛乳を買った（完了したけど削除できない）
[✓] 掃除をした（完了したけど削除できない）
[✓] 資料を作った（完了したけど削除できない）
...
→ 完了したタスクが溜まり続ける
→ リストが見づらくなる
→ 本当に必要なタスクが埋もれる

削除機能がある場合:
[  ] 本を読む
[  ] メールを送る
→ 完了したタスクは削除済み
→ リストがすっきり
→ 今やるべきタスクが一目で分かる
```

### 個別削除ボタンの実装

各タスクに削除ボタンを追加します。

```javascript
// 削除ボタンを作成
const deleteBtn = document.createElement('button');
deleteBtn.textContent = '削除';
deleteBtn.className = 'delete-btn';

// 削除ボタンのイベント
deleteBtn.addEventListener('click', function(e) {
  // イベントの伝播を防止
  e.stopPropagation();

  // 確認ダイアログを表示
  if (confirm('このタスクを削除しますか？')) {
    // 配列から削除
    tasks.splice(originalIndex, 1);

    // localStorageに保存
    saveTasks();

    // 画面を更新
    displayTasks();

    // 成功メッセージ
    showSuccess('タスクを削除しました');
  }
});

li.appendChild(deleteBtn);
```

**実行の流れ**:

```
ステップ1: ユーザーが削除ボタンをクリック

ステップ2: e.stopPropagation()を実行
→ clickイベントが親要素に伝わらないようにする
→ タスクテキストのclickイベント（完了切り替え）が発動しない

ステップ3: confirm()で確認ダイアログを表示
confirm('このタスクを削除しますか？')
→ ユーザーが「OK」を押す → true
→ ユーザーが「キャンセル」を押す → false

ステップ4: ユーザーがOKを押した場合
if (true) {
  // 削除処理を実行
}

tasks = [
  { text: '牛乳を買う', done: false },  ← index 0
  { text: '掃除する', done: true },    ← index 1 (これを削除)
  { text: '資料を作る', done: false }   ← index 2
]

tasks.splice(1, 1)  // index 1から1個削除
↓
tasks = [
  { text: '牛乳を買う', done: false },
  { text: '資料を作る', done: false }
]

ステップ5: saveTasks()でlocalStorageに保存

ステップ6: displayTasks()で画面を更新

ステップ7: showSuccess()で成功メッセージを表示
```

### splice()メソッドの詳細

```javascript
array.splice(開始位置, 削除する個数)

// 例1: index 1から1個削除
const arr = ['a', 'b', 'c', 'd'];
arr.splice(1, 1);
// 結果: ['a', 'c', 'd']  ('b'が削除された)

// 例2: index 0から2個削除
const arr2 = ['a', 'b', 'c', 'd'];
arr2.splice(0, 2);
// 結果: ['c', 'd']  ('a'と'b'が削除された)

// 例3: index 2から1個削除
const arr3 = ['a', 'b', 'c', 'd'];
arr3.splice(2, 1);
// 結果: ['a', 'b', 'd']  ('c'が削除された)
```

### 確認ダイアログの重要性

```
confirm()を使う理由:

理由1: 誤削除を防ぐ
→ ユーザーが間違ってボタンを押しても、確認できる

理由2: 取り消せない操作だから
→ 削除は一度実行すると元に戻せない

理由3: ユーザーに考える時間を与える
→ 本当に削除してよいか確認できる

良い確認メッセージ:
✅ 「このタスクを削除しますか？」
✅ 「本当に削除しますか？この操作は取り消せません。」

悪い確認メッセージ:
❌ 「削除？」（何を削除するのか不明確）
❌ 確認なしで即削除（誤操作のリスク）
```

### 完了タスクの一括削除

完了したタスクをまとめて削除する機能も追加します。

```javascript
function clearCompletedTasks() {
  // 削除前のタスク数を記録
  const beforeCount = tasks.length;

  // 未完了のタスクだけを残す
  tasks = tasks.filter(function(task) {
    return task.done === false;
  });

  // 削除されたタスクの数を計算
  const deletedCount = beforeCount - tasks.length;

  if (deletedCount > 0) {
    // 削除があった場合
    saveTasks();
    displayTasks();
    showSuccess(deletedCount + '件の完了タスクを削除しました');
  } else {
    // 削除するタスクがなかった場合
    showError('削除する完了タスクがありません');
  }
}
```

**実行の流れ**:

```
削除前の状態:
tasks = [
  { text: '牛乳を買う', done: false },
  { text: '掃除する', done: true },   ← 完了（削除対象）
  { text: '資料を作る', done: false },
  { text: 'メールを送る', done: true } ← 完了（削除対象）
]
beforeCount = 4

filter()で未完了だけを残す:
tasks.filter(function(task) {
  return task.done === false;
})

1個目: { text: '牛乳を買う', done: false }
  → done === false → true → 残す

2個目: { text: '掃除する', done: true }
  → done === false → false → 削除

3個目: { text: '資料を作る', done: false }
  → done === false → true → 残す

4個目: { text: 'メールを送る', done: true }
  → done === false → false → 削除

結果:
tasks = [
  { text: '牛乳を買う', done: false },
  { text: '資料を作る', done: false }
]

削除数の計算:
deletedCount = 4 - 2 = 2

メッセージ表示:
showSuccess('2件の完了タスクを削除しました')
```

## コードの整理

### なぜコードの整理が重要なのか

```
コードが整理されていない場合:
- 同じ処理が複数箇所に散らばっている
- どこに何が書いてあるか分からない
- 修正したいとき、すべての箇所を探す必要がある
- バグが混入しやすい

コードが整理されている場合:
- 同じ処理は1つの関数にまとまっている
- コードの構造が明確
- 修正は1箇所だけで済む
- バグが混入しにくい
```

### 定数の整理

アプリ全体で使用する定数をファイルの先頭にまとめます。

```javascript
// ========== 定数 ==========
const MAX_TASK_LENGTH = 100;
const STORAGE_KEY_TODOS = 'todos';

const CATEGORY_COLORS = {
  '仕事': '#ff6b6b',
  'プライベート': '#4ecdc4',
  '買い物': '#ffe66d'
};

const DEFAULT_CATEGORIES = ['すべて', '仕事', 'プライベート', '買い物'];
```

**定数を大文字にする理由**:

```
慣習: 定数は大文字で書く

MAX_TASK_LENGTH  ← 変更してはいけない値であることが明確
maxTaskLength    ← 変数と区別がつきにくい

メリット:
1. 一目で定数だと分かる
2. 誤って変更するリスクが減る
3. チームで開発する際の共通ルール
```

### 関数の整理

関数を機能ごとに整理します。

```javascript
// ========== データ管理 ==========
function loadTasks() { ... }
function saveTasks() { ... }

// ========== メッセージ表示 ==========
function showError(message) { ... }
function showSuccess(message) { ... }

// ========== 統計 ==========
function updateStats() { ... }

// ========== フィルター ==========
function getSearchKeyword() { ... }
function getFilteredTasks() { ... }

// ========== 表示 ==========
function displayTasks() { ... }
function updateFilterButtons() { ... }

// ========== タスク操作 ==========
function addTask() { ... }
function clearCompletedTasks() { ... }
```

関数をグループ分けすることで、コードが読みやすくなります。

## バグ修正と安定性向上

### エッジケースへの対応

予期しない使い方によるバグを防ぎます。

**問題1: 編集中に検索を変更すると、編集中のタスクが消える**

```
状況:
1. タスク「牛乳を買う」を編集中
2. 検索欄に「掃除」と入力
3. 編集中のタスクが検索結果から消える
4. 編集内容が失われる

解決策:
検索やフィルター変更時に編集モードをキャンセルする
```

```javascript
// 検索のイベントリスナー
searchInput.addEventListener('input', function() {
  // 編集中の場合はキャンセル
  if (editingIndex !== -1) {
    editingIndex = -1;
  }
  displayTasks();
});
```

**問題2: localStorageのデータが壊れている**

```
状況:
1. localStorageに不正なデータが保存されている
2. JSON.parse()でエラーが発生
3. アプリが動かなくなる

解決策:
try-catchでエラーを捕捉する
```

```javascript
function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY_TODOS);
    if (savedTasks) {
      const parsed = JSON.parse(savedTasks);

      // 配列であることを確認
      if (Array.isArray(parsed)) {
        tasks = parsed;
      } else {
        console.error('Invalid tasks data');
        tasks = [];
      }
    }
  } catch (error) {
    // エラーが発生した場合
    console.error('Error loading tasks:', error);
    tasks = [];
  }
}
```

**実行の流れ**:

```
正常な場合:
try {
  savedTasks = localStorage.getItem('todos')
  savedTasks = '[{"text":"牛乳","done":false}]'

  parsed = JSON.parse(savedTasks)
  parsed = [{ text: '牛乳', done: false }]

  Array.isArray(parsed) → true
  tasks = parsed
}
→ タスクが正常に読み込まれる

データが壊れている場合:
try {
  savedTasks = localStorage.getItem('todos')
  savedTasks = '{this is broken}' ← 不正なJSON

  parsed = JSON.parse(savedTasks)
  → エラーが発生
}
catch (error) {
  console.error('Error loading tasks:', error)
  tasks = []
}
→ エラーを捕捉して、空の配列で初期化
→ アプリは正常に動作を続ける
```

### データの整合性チェック

```javascript
// 保存時もエラー処理を追加
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
    showError('データの保存に失敗しました');
  }
}
```

**try-catchの重要性**:

```
try-catchを使わない場合:
エラー発生 → アプリが停止 → ユーザーは何も操作できない

try-catchを使う場合:
エラー発生 → catchで捕捉 → エラーメッセージを表示 → アプリは動作を続ける

メリット:
1. アプリが突然停止しない
2. エラーの内容をログに記録できる
3. ユーザーに適切なメッセージを表示できる
```

## ユーザビリティの向上

### キーボードショートカット

キーボード操作を追加することで、より使いやすくなります。

```javascript
// グローバルなキーボードショートカット
document.addEventListener('keydown', function(e) {
  // Escapeキーで編集モードをキャンセル
  if (e.key === 'Escape' && editingIndex !== -1) {
    editingIndex = -1;
    displayTasks();
  }
});
```

**便利なショートカット一覧**:

```
Enter: タスクを追加（入力欄でEnterを押す）
Escape: 編集をキャンセル、検索をクリア
ダブルクリック: タスクの編集を開始
クリック: タスクの完了/未完了を切り替え
```

### レスポンシブデザイン

スマートフォンでも使いやすいように、CSSでレスポンシブデザインを実装します。

```css
/* スマートフォン向けのスタイル */
@media (max-width: 600px) {
  body {
    padding: 10px;
    margin: 10px auto;
  }

  #stats-container {
    flex-direction: column;
    gap: 10px;
  }

  #input-container {
    flex-direction: column;
  }

  #filter-buttons button {
    font-size: 12px;
    padding: 6px 12px;
  }
}
```

**レスポンシブデザインの効果**:

```
PCで表示:
┌────────────────────────────────┐
│ 全タスク: 5  未完了: 3  完了: 2│ ← 横並び
└────────────────────────────────┘

スマートフォンで表示:
┌──────────┐
│全タスク: 5│
│未完了: 3  │ ← 縦並び
│完了: 2    │
└──────────┘
```

## 動作確認チェックリスト

完成したアプリが正しく動作するか、以下のチェックリストで確認します。

### 基本機能のチェック

```
□ タスクを追加できる
  → 入力欄に文字を入力して「追加」ボタンを押す
  → リストにタスクが表示される

□ タスクを表示できる
  → 追加したタスクが正しく表示される
  → カテゴリバッジが正しい色で表示される

□ タスクを完了/未完了に切り替えられる
  → タスクをクリックすると完了になる
  → もう一度クリックすると未完了に戻る
  → 完了タスクに取り消し線が表示される

□ タスクを削除できる
  → 削除ボタンを押すと確認ダイアログが表示される
  → OKを押すとタスクが削除される
  → キャンセルを押すと削除されない

□ タスクを編集できる
  → 編集ボタンまたはダブルクリックで編集モードになる
  → テキストを変更して保存できる
  → キャンセルすると変更が破棄される
```

### フィルターと検索のチェック

```
□ フィルターが動作する
  → 「すべて」「未完了」「完了」ボタンで切り替えられる
  → アクティブなボタンが青色で表示される

□ カテゴリでフィルターできる
  → カテゴリを選択すると、そのカテゴリのタスクだけ表示される

□ 検索できる
  → 検索欄に文字を入力すると、リアルタイムで絞り込まれる
  → 大文字小文字を区別しない
  → 部分一致で検索できる

□ 複数のフィルターを組み合わせられる
  → 検索 + カテゴリ + 完了状態のフィルターが同時に機能する
```

### データ永続化のチェック

```
□ ページを再読み込みしてもデータが残る
  → タスクを追加してページを更新
  → 追加したタスクが残っている

□ 編集内容が保存される
  → タスクを編集してページを更新
  → 編集内容が保存されている

□ 削除が保存される
  → タスクを削除してページを更新
  → 削除したタスクが消えている
```

### バリデーションのチェック

```
□ 空のタスクは追加できない
  → 空白のまま追加ボタンを押す
  → エラーメッセージが表示される
  → タスクは追加されない

□ 文字数制限が機能する
  → 100文字を超える文字を入力
  → 文字数カウンターが赤くなる
  → 追加しようとするとエラーメッセージが表示される

□ エラーメッセージが表示される
  → エラー発生時に赤いメッセージが表示される
  → 3秒後に自動的に消える
```

### 統計のチェック

```
□ 全タスク数が正しく表示される
  → タスクを追加すると増える
  → タスクを削除すると減る

□ 未完了タスク数が正しく表示される
  → 未完了タスクを追加すると増える
  → タスクを完了すると減る

□ 完了タスク数が正しく表示される
  → タスクを完了すると増える
  → 完了タスクを削除すると減る

□ 統計が自動更新される
  → タスクを追加/削除/変更すると即座に統計が更新される
```

## 実践例: 完成版TODOアプリ

すべての機能を統合した完成版のTODOアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TODOアプリ（完成版）</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      max-width: 700px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f5f5f5;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }

    #stats-container {
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .stat-item {
      text-align: center;
    }

    .stat-label {
      display: block;
      font-size: 14px;
      color: #666;
      margin-bottom: 5px;
    }

    .stat-value {
      display: block;
      font-size: 28px;
      font-weight: bold;
      color: #333;
    }

    #error-message, #success-message {
      display: none;
      padding: 12px;
      margin-bottom: 20px;
      border-radius: 4px;
      text-align: center;
      font-weight: bold;
    }

    #error-message {
      background-color: #dc3545;
      color: white;
    }

    #success-message {
      background-color: #28a745;
      color: white;
    }

    #search-container {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    #search-input {
      flex: 1;
      padding: 12px;
      font-size: 16px;
      border: 2px solid #007bff;
      border-radius: 4px;
    }

    #clear-search-btn {
      padding: 12px 24px;
      font-size: 16px;
      cursor: pointer;
      background-color: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
    }

    #clear-search-btn:hover {
      background-color: #5a6268;
    }

    #input-container {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }

    #task-input {
      flex: 1;
      padding: 12px;
      font-size: 16px;
      border: 2px solid #ccc;
      border-radius: 4px;
    }

    #task-input.error {
      border-color: #dc3545;
    }

    #category-select {
      padding: 12px;
      font-size: 16px;
      border: 2px solid #ccc;
      border-radius: 4px;
    }

    #add-btn {
      padding: 12px 24px;
      font-size: 16px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
    }

    #add-btn:hover {
      background-color: #0056b3;
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
      flex-wrap: wrap;
    }

    #filter-category {
      padding: 10px;
      font-size: 14px;
      border: 2px solid #ccc;
      border-radius: 4px;
    }

    #filter-buttons {
      display: flex;
      gap: 5px;
    }

    #filter-buttons button {
      padding: 10px 16px;
      cursor: pointer;
      border: 1px solid #ccc;
      background-color: white;
      border-radius: 4px;
      font-size: 14px;
    }

    #filter-buttons button.active {
      background-color: #007bff;
      color: white;
      border-color: #007bff;
    }

    #filter-buttons button:hover {
      background-color: #e7f3ff;
    }

    #filter-buttons button.active:hover {
      background-color: #0056b3;
    }

    #clear-completed-btn {
      padding: 10px 16px;
      cursor: pointer;
      background-color: #ffc107;
      color: #333;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: bold;
    }

    #clear-completed-btn:hover {
      background-color: #e0a800;
    }

    #task-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    #task-list li {
      padding: 15px;
      margin-bottom: 10px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.2s;
    }

    #task-list li:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      transform: translateY(-2px);
    }

    #task-list li.completed {
      opacity: 0.6;
    }

    #task-list li.no-results {
      cursor: default;
      justify-content: center;
      color: #999;
      font-style: italic;
    }

    .category-badge {
      display: inline-block;
      padding: 5px 14px;
      color: white;
      border-radius: 14px;
      font-size: 12px;
      font-weight: bold;
      flex-shrink: 0;
    }

    .task-text {
      flex: 1;
      cursor: pointer;
      word-break: break-word;
      font-size: 16px;
    }

    .task-text.completed {
      text-decoration: line-through;
      color: #999;
    }

    .edit-input {
      flex: 1;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #007bff;
      border-radius: 4px;
    }

    .edit-btn, .save-btn, .cancel-btn, .delete-btn {
      padding: 8px 16px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      flex-shrink: 0;
      font-weight: bold;
    }

    .edit-btn {
      background-color: #007bff;
      color: white;
    }

    .edit-btn:hover {
      background-color: #0056b3;
    }

    .save-btn {
      background-color: #28a745;
      color: white;
    }

    .save-btn:hover {
      background-color: #218838;
    }

    .cancel-btn {
      background-color: #6c757d;
      color: white;
    }

    .cancel-btn:hover {
      background-color: #5a6268;
    }

    .delete-btn {
      background-color: #dc3545;
      color: white;
    }

    .delete-btn:hover {
      background-color: #c82333;
    }

    @media (max-width: 600px) {
      body {
        padding: 10px;
        margin: 10px auto;
      }

      h1 {
        font-size: 24px;
      }

      #stats-container {
        flex-direction: column;
        gap: 15px;
      }

      #input-container {
        flex-direction: column;
      }

      #filter-container {
        flex-direction: column;
        align-items: stretch;
      }

      #filter-buttons {
        justify-content: center;
      }

      #filter-buttons button {
        font-size: 12px;
        padding: 8px 12px;
      }
    }
  </style>
</head>
<body>
  <h1>TODOアプリ（完成版）</h1>

  <div id="stats-container">
    <div class="stat-item">
      <span class="stat-label">全タスク</span>
      <span id="total-count" class="stat-value">0</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">未完了</span>
      <span id="incomplete-count" class="stat-value">0</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">完了</span>
      <span id="completed-count" class="stat-value">0</span>
    </div>
  </div>

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

    <button id="clear-completed-btn">完了タスクを削除</button>
  </div>

  <ul id="task-list"></ul>

  <script>
    // ========== 定数 ==========
    const MAX_TASK_LENGTH = 100;
    const STORAGE_KEY_TODOS = 'todos';

    const CATEGORY_COLORS = {
      '仕事': '#ff6b6b',
      'プライベート': '#4ecdc4',
      '買い物': '#ffe66d'
    };

    // ========== 変数 ==========
    let tasks = [];
    let currentFilter = 'all';
    let currentCategory = 'すべて';
    let editingIndex = -1;

    // ========== DOM要素の取得 ==========
    const totalCountEl = document.getElementById('total-count');
    const incompleteCountEl = document.getElementById('incomplete-count');
    const completedCountEl = document.getElementById('completed-count');
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
    const clearCompletedBtn = document.getElementById('clear-completed-btn');

    // ========== データ管理 ==========
    function loadTasks() {
      try {
        const savedTasks = localStorage.getItem(STORAGE_KEY_TODOS);
        if (savedTasks) {
          const parsed = JSON.parse(savedTasks);
          if (Array.isArray(parsed)) {
            tasks = parsed;
          } else {
            console.error('Invalid tasks data');
            tasks = [];
          }
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
        tasks = [];
      }
    }

    function saveTasks() {
      try {
        localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks:', error);
        showError('データの保存に失敗しました');
      }
    }

    // ========== メッセージ表示 ==========
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

    // ========== 統計 ==========
    function updateStats() {
      const totalCount = tasks.length;
      const incompleteCount = tasks.filter(function(task) {
        return task.done === false;
      }).length;
      const completedCount = tasks.filter(function(task) {
        return task.done === true;
      }).length;

      totalCountEl.textContent = totalCount;
      incompleteCountEl.textContent = incompleteCount;
      completedCountEl.textContent = completedCount;
    }

    // ========== フィルター ==========
    function getSearchKeyword() {
      const keyword = searchInput.value.trim();
      return keyword.toLowerCase();
    }

    function getFilteredTasks() {
      let filtered = tasks;

      const keyword = getSearchKeyword();
      if (keyword !== '') {
        filtered = filtered.filter(function(task) {
          return task.text.toLowerCase().includes(keyword);
        });
      }

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

    // ========== 表示 ==========
    function displayTasks() {
      taskList.innerHTML = '';
      const filteredTasks = getFilteredTasks();

      if (filteredTasks.length === 0) {
        const message = document.createElement('li');
        message.textContent = 'タスクが見つかりませんでした';
        message.className = 'no-results';
        taskList.appendChild(message);
        updateStats();
        return;
      }

      filteredTasks.forEach(function(task) {
        const li = document.createElement('li');
        const originalIndex = tasks.indexOf(task);

        const categoryBadge = document.createElement('span');
        categoryBadge.textContent = task.category;
        categoryBadge.className = 'category-badge';
        categoryBadge.style.backgroundColor = CATEGORY_COLORS[task.category] || '#999';
        li.appendChild(categoryBadge);

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

            if (newText === '') {
              showError('タスクを入力してください');
              return;
            }

            if (newText.length > MAX_TASK_LENGTH) {
              showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください');
              return;
            }

            tasks[originalIndex].text = newText;
            saveTasks();
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

          setTimeout(function() {
            input.focus();
            input.select();
          }, 0);
        } else {
          const taskText = document.createElement('span');
          taskText.textContent = task.text;
          taskText.className = 'task-text';

          if (task.done) {
            taskText.classList.add('completed');
            li.classList.add('completed');
          }

          taskText.addEventListener('click', function() {
            tasks[originalIndex].done = !tasks[originalIndex].done;
            saveTasks();
            displayTasks();
          });

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

          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = '削除';
          deleteBtn.className = 'delete-btn';

          deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();

            if (confirm('このタスクを削除しますか？')) {
              tasks.splice(originalIndex, 1);
              saveTasks();
              displayTasks();
              showSuccess('タスクを削除しました');
            }
          });

          li.appendChild(taskText);
          li.appendChild(editBtn);
          li.appendChild(deleteBtn);
        }

        taskList.appendChild(li);
      });

      updateFilterButtons();
      updateStats();
    }

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

    // ========== タスク操作 ==========
    function addTask() {
      const text = taskInput.value.trim();
      const category = categorySelect.value;

      if (text === '') {
        showError('タスクを入力してください');
        return;
      }

      if (text.length > MAX_TASK_LENGTH) {
        showError('タスクは' + MAX_TASK_LENGTH + '文字以内で入力してください');
        return;
      }

      tasks.push({
        text: text,
        done: false,
        category: category
      });

      taskInput.value = '';
      charCount.textContent = '0';
      charCount.classList.remove('over');
      taskInput.classList.remove('error');
      saveTasks();
      displayTasks();
      showSuccess('タスクを追加しました');
    }

    function clearCompletedTasks() {
      const beforeCount = tasks.length;

      tasks = tasks.filter(function(task) {
        return task.done === false;
      });

      const deletedCount = beforeCount - tasks.length;

      if (deletedCount > 0) {
        saveTasks();
        displayTasks();
        showSuccess(deletedCount + '件の完了タスクを削除しました');
      } else {
        showError('削除する完了タスクがありません');
      }
    }

    // ========== イベントリスナー ==========
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

    searchInput.addEventListener('input', function() {
      if (editingIndex !== -1) {
        editingIndex = -1;
      }
      displayTasks();
    });

    clearSearchBtn.addEventListener('click', function() {
      searchInput.value = '';
      displayTasks();
    });

    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        searchInput.value = '';
        displayTasks();
      }
    });

    filterCategory.addEventListener('change', function() {
      if (editingIndex !== -1) {
        editingIndex = -1;
      }
      currentCategory = filterCategory.value;
      displayTasks();
    });

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

    clearCompletedBtn.addEventListener('click', clearCompletedTasks);

    addBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addTask();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && editingIndex !== -1) {
        editingIndex = -1;
        displayTasks();
      }
    });

    // ========== 初期化 ==========
    loadTasks();
    displayTasks();
  </script>
</body>
</html>
```

このアプリは、これまでに学んだすべての機能を統合した完成版です。

## よくある問題と解決策

### 問題1: 削除ボタンを押すとタスクが完了してしまう

```javascript
// 問題のあるコード
deleteBtn.addEventListener('click', function() {
  // stopPropagation()を忘れている
  tasks.splice(originalIndex, 1);
  displayTasks();
});
```

**解決策**: stopPropagation()を追加する

```javascript
// 正しいコード
deleteBtn.addEventListener('click', function(e) {
  e.stopPropagation();  // イベントの伝播を防止

  if (confirm('このタスクを削除しますか？')) {
    tasks.splice(originalIndex, 1);
    saveTasks();
    displayTasks();
  }
});
```

### 問題2: 編集中に検索すると編集内容が失われる

```javascript
// 問題のあるコード
searchInput.addEventListener('input', function() {
  displayTasks();  // 編集モードをキャンセルしていない
});
```

**解決策**: 編集モードをキャンセルする

```javascript
// 正しいコード
searchInput.addEventListener('input', function() {
  if (editingIndex !== -1) {
    editingIndex = -1;  // 編集モードをキャンセル
  }
  displayTasks();
});
```

### 問題3: 完了タスクの削除ボタンが機能しない

```javascript
// 問題のあるコード
function clearCompletedTasks() {
  tasks = tasks.filter(function(task) {
    return task.done === false;
  });

  displayTasks();
  // saveTasks()を呼び出していない
}
```

**解決策**: saveTasks()を呼び出す

```javascript
// 正しいコード
function clearCompletedTasks() {
  const beforeCount = tasks.length;

  tasks = tasks.filter(function(task) {
    return task.done === false;
  });

  const deletedCount = beforeCount - tasks.length;

  if (deletedCount > 0) {
    saveTasks();  // 保存を忘れない
    displayTasks();
    showSuccess(deletedCount + '件の完了タスクを削除しました');
  }
}
```

### 問題4: localStorageのデータが壊れてアプリが動かない

```javascript
// 問題のあるコード
function loadTasks() {
  const savedTasks = localStorage.getItem(STORAGE_KEY_TODOS);
  tasks = JSON.parse(savedTasks);  // エラー処理がない
}
```

**解決策**: try-catchでエラーを捕捉する

```javascript
// 正しいコード
function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY_TODOS);
    if (savedTasks) {
      const parsed = JSON.parse(savedTasks);
      if (Array.isArray(parsed)) {
        tasks = parsed;
      } else {
        tasks = [];
      }
    }
  } catch (error) {
    console.error('Error loading tasks:', error);
    tasks = [];
  }
}
```

### 問題5: 統計が更新されない

```javascript
// 問題のあるコード
function displayTasks() {
  taskList.innerHTML = '';

  // タスクを表示
  filteredTasks.forEach(function(task) {
    // ...
  });

  // updateStats()を呼び出していない
}
```

**解決策**: displayTasks()の最後でupdateStats()を呼び出す

```javascript
// 正しいコード
function displayTasks() {
  taskList.innerHTML = '';

  // タスクを表示
  filteredTasks.forEach(function(task) {
    // ...
  });

  updateFilterButtons();
  updateStats();  // 統計を更新
}
```

## 練習問題

### 課題

完成版TODOアプリを作成してください。これまでに実装したすべての機能を統合し、削除機能を追加して、完全に動作するアプリを完成させます。

### 保存場所

`exercises/lesson-157/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 仕様

以下の機能をすべて実装してください。

1. **すべての機能を統合**
   - レッスン146-156で実装した機能をすべて含める
   - 各機能が正しく連携して動作すること

2. **コードの整理**
   - 定数をファイルの先頭にまとめる
   - 関数を機能ごとにグループ分けする
   - コメントを追加して分かりやすくする

3. **バグ修正**
   - try-catchでエラー処理を追加
   - 編集中のフィルター変更に対応
   - stopPropagation()でイベント伝播を防止

4. **動作確認**
   - すべての機能が正しく動作することを確認
   - エッジケースをテストする
   - レスポンシブデザインを実装

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-157
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**削除機能の実装**

- 各タスクに削除ボタンを追加します
- `splice()`メソッドで配列から要素を削除します
- `confirm()`で確認ダイアログを表示して、誤削除を防ぎます
- 削除後は`saveTasks()`と`displayTasks()`を呼び出します

**完了タスクの一括削除**

- `filter()`メソッドで未完了のタスクだけを残します
- 削除件数を計算してユーザーにフィードバックします
- 削除するタスクがない場合はエラーメッセージを表示します

**コードの整理**

- 定数を大文字で定義してファイルの先頭にまとめます
- 関数を機能ごとにグループ分けしてコメントを追加します
- 重複するコードは関数にまとめます

**バグ修正**

- `try-catch`でJSON.parse()のエラーを捕捉します
- 編集中に検索やフィルターを変更したら編集モードをキャンセルします
- `e.stopPropagation()`でイベントの伝播を防ぎます

**動作確認**

- チェックリストに沿ってすべての機能を確認します
- エッジケース（タスクが0件、検索結果が0件など）をテストします
- スマートフォンでの表示も確認します

## まとめ

お疲れ様でした。今回は、TODOアプリの完成編として、これまでに実装したすべての機能を統合し、削除機能を追加して、完全に動作するTODOアプリを完成させました。

### 今回学んだキーポイント

- **統合**: 複数の機能を組み合わせて、シームレスに動作するアプリを作ることができます。各機能が正しく連携するように注意深く実装する必要があります

- **コードの整理**: 定数の整理、関数のグループ分け、コメントの追加など、コードを読みやすく保守しやすくする工夫が重要です。整理されたコードは、バグが少なく、変更も容易です

- **バグ修正**: エッジケースへの対応、エラー処理、データの整合性チェックなど、安定したアプリを作るための技術を学びました。try-catchや確認ダイアログを使って、予期しない動作を防ぎます

- **動作確認**: チェックリストに沿って、すべての機能が正しく動作することを確認しました。完成したアプリは、実際のユーザーに使ってもらえるレベルの品質を持っています

### カリキュラムの達成状況

✅ すべての機能を統合
✅ コードの整理
✅ バグ修正
✅ 動作確認

### 完成したTODOアプリの機能一覧

```
基本機能:
├─ タスクの追加
├─ タスクの表示
├─ タスクの完了/未完了切り替え
├─ タスクの編集
└─ タスクの削除

データ永続化:
├─ localStorageへの保存
└─ ページ再読み込み時のデータ復元

フィルター機能:
├─ すべて/未完了/完了の切り替え
├─ カテゴリ別の表示
└─ 複数フィルターの組み合わせ

検索機能:
├─ キーワードによる部分一致検索
└─ リアルタイム検索

カテゴリ機能:
├─ タスクへのカテゴリ設定
└─ カテゴリバッジの色分け

バリデーション:
├─ 空のタスクの防止
├─ 文字数制限（最大100文字）
├─ エラーメッセージ表示
└─ リアルタイム文字数カウンター

統計機能:
├─ 全タスク数の表示
├─ 未完了タスク数の表示
├─ 完了タスク数の表示
└─ 統計の自動更新

便利機能:
├─ 完了タスクの一括削除
├─ キーボードショートカット
└─ レスポンシブデザイン
```

レッスン146から157まで、12回のレッスンをかけて、完全なTODOアプリを段階的に作り上げました。各機能を一つずつ実装することで、複雑なアプリでも着実に完成させることができることを学びました。

この経験を活かして、さらに複雑なアプリケーションにも挑戦してみてください。JavaScriptの基礎をしっかりと身につけたあなたなら、どんなアプリでも作れるはずです。
