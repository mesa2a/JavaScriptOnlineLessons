# レッスン164：保存機能

## このレッスンで学ぶこと
このレッスンでは、これまで実装してきた収支管理機能に、データの永続化（保存）機能を本格的に組み込みます。localStorage APIの深い理解とエラーハンドリング、データバリデーションについて学びます。

## localStorage APIの基礎

### localStorageとは
localStorage（ローカルストレージ）は、ブラウザにデータを保存するためのWeb Storage APIの一部です。

**特徴：**
- データは永続的に保存される（ブラウザを閉じても残る）
- ドメインごとに独立したストレージ領域を持つ
- データは文字列として保存される
- 容量制限は約5MB（ブラウザによって異なる）
- 同期的に動作する

### 基本的な使い方

```javascript
// データを保存する
localStorage.setItem('key', 'value');

// データを取得する
var value = localStorage.getItem('key');

// データを削除する
localStorage.removeItem('key');

// すべてのデータを削除する
localStorage.clear();

// キーの数を取得する
var count = localStorage.length;

// n番目のキーを取得する
var key = localStorage.key(0);
```

### オブジェクトや配列の保存

localStorageは文字列しか保存できないため、オブジェクトや配列を保存する場合はJSON形式に変換する必要があります。

```javascript
// 配列を保存する
var users = [
  { name: '太郎', age: 25 },
  { name: '花子', age: 22 }
];

// JSON形式に変換して保存
localStorage.setItem('users', JSON.stringify(users));

// 取得して元に戻す
var savedUsers = JSON.parse(localStorage.getItem('users'));
```

## データ永続化の実装

### 保存のタイミング

データを保存する適切なタイミングは以下の通りです：

1. **データ追加時**: 新しい収入や支出を追加したとき
2. **データ削除時**: 既存のデータを削除したとき
3. **データ編集時**: データを編集したとき（今後実装予定）

```javascript
function addIncome() {
  // 入力値の取得
  var date = document.getElementById('income-date').value;
  var amount = parseInt(document.getElementById('income-amount').value);
  var category = document.getElementById('income-category').value;
  var memo = document.getElementById('income-memo').value;

  // バリデーション
  if (!date || !amount || !category) {
    alert('すべての必須項目を入力してください');
    return;
  }

  // データを追加
  var income = {
    id: Date.now(),
    type: 'income',
    date: date,
    amount: amount,
    category: category,
    memo: memo
  };

  transactions.push(income);

  // ★ データを保存
  saveData();

  // 画面を更新
  renderIncomeList();
  updateStats();

  // フォームをクリア
  clearIncomeForm();
}
```

### saveData関数の実装

データを保存する専用の関数を作成します。この関数にエラーハンドリングを含めることで、安全にデータを保存できます。

```javascript
function saveData() {
  try {
    // transactionsを配列をJSON形式に変換して保存
    localStorage.setItem('transactions', JSON.stringify(transactions));
    console.log('データを保存しました');
  } catch (error) {
    // エラーが発生した場合の処理
    console.error('データの保存に失敗しました:', error);

    // 容量オーバーの場合
    if (error.name === 'QuotaExceededError') {
      alert('ストレージの容量が不足しています。古いデータを削除してください。');
    } else {
      alert('データの保存に失敗しました。');
    }
  }
}
```

### loadData関数の実装

アプリケーション起動時に、保存されているデータを読み込みます。

```javascript
function loadData() {
  try {
    // localStorageからデータを取得
    var savedData = localStorage.getItem('transactions');

    // データが存在する場合
    if (savedData) {
      // JSON形式から配列に変換
      transactions = JSON.parse(savedData);
      console.log('データを読み込みました:', transactions.length + '件');
    } else {
      // データが存在しない場合は空配列
      transactions = [];
      console.log('保存されたデータはありません');
    }
  } catch (error) {
    // エラーが発生した場合
    console.error('データの読み込みに失敗しました:', error);
    alert('データの読み込みに失敗しました。');
    transactions = [];
  }
}
```

### 初期化処理の実装

アプリケーション起動時に、データを読み込んで画面を更新します。

```javascript
function init() {
  // データを読み込む
  loadData();

  // 画面を更新
  renderIncomeList();
  renderExpenseList();
  updateStats();

  // 今日の日付を設定
  setTodayDate();

  // タブ機能を設定
  setupTabs();

  // イベントリスナーを設定
  setupEventListeners();
}

// DOMContentLoadedイベントで初期化
document.addEventListener('DOMContentLoaded', init);
```

## データバリデーション

### なぜバリデーションが必要か

保存されたデータが破損している可能性があるため、読み込み時にデータの妥当性をチェックする必要があります。

**考えられる問題：**
- JSON形式が壊れている
- 必須プロパティが欠けている
- データ型が正しくない
- 不正なデータが含まれている

### validateTransaction関数の実装

```javascript
function validateTransaction(transaction) {
  // トランザクションオブジェクトが存在するか
  if (!transaction || typeof transaction !== 'object') {
    return false;
  }

  // 必須プロパティが存在するか
  if (!transaction.id || !transaction.type || !transaction.date ||
      transaction.amount === undefined || !transaction.category) {
    return false;
  }

  // typeが正しい値か
  if (transaction.type !== 'income' && transaction.type !== 'expense') {
    return false;
  }

  // amountが数値か
  if (typeof transaction.amount !== 'number' || transaction.amount < 0) {
    return false;
  }

  // dateが正しい形式か（YYYY-MM-DD）
  var datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(transaction.date)) {
    return false;
  }

  return true;
}
```

### バリデーションを適用したloadData関数

```javascript
function loadData() {
  try {
    var savedData = localStorage.getItem('transactions');

    if (savedData) {
      var parsedData = JSON.parse(savedData);

      // 配列であることを確認
      if (!Array.isArray(parsedData)) {
        console.error('データ形式が不正です');
        transactions = [];
        return;
      }

      // 各トランザクションをバリデーション
      transactions = parsedData.filter(function(t) {
        var isValid = validateTransaction(t);
        if (!isValid) {
          console.warn('不正なデータを除外しました:', t);
        }
        return isValid;
      });

      console.log('データを読み込みました:', transactions.length + '件');

      // 不正なデータがあった場合は保存し直す
      if (transactions.length < parsedData.length) {
        saveData();
      }
    } else {
      transactions = [];
      console.log('保存されたデータはありません');
    }
  } catch (error) {
    console.error('データの読み込みに失敗しました:', error);
    alert('データの読み込みに失敗しました。データが破損している可能性があります。');
    transactions = [];
  }
}
```

## すべてのデータを削除する機能

### clearAllData関数の実装

```javascript
function clearAllData() {
  // 確認ダイアログを表示
  var confirmed = confirm('すべてのデータを削除してもよろしいですか？この操作は取り消せません。');

  if (confirmed) {
    // 再確認
    var doubleConfirmed = confirm('本当に削除しますか？');

    if (doubleConfirmed) {
      // データを削除
      transactions = [];
      localStorage.removeItem('transactions');

      // 画面を更新
      renderIncomeList();
      renderExpenseList();
      updateStats();

      alert('すべてのデータを削除しました');
    }
  }
}
```

### 設定タブのボタンを有効化

HTMLの設定タブにある「すべてのデータを削除」ボタンを有効化します。

```javascript
function setupEventListeners() {
  // 収入追加ボタン
  document.getElementById('add-income-button')
    .addEventListener('click', addIncome);

  // 支出追加ボタン
  document.getElementById('add-expense-button')
    .addEventListener('click', addExpense);

  // データ削除ボタン
  var clearButton = document.querySelector('.danger-button');
  if (clearButton) {
    clearButton.disabled = false;
    clearButton.addEventListener('click', clearAllData);
  }
}
```

## エラーハンドリングのベストプラクティス

### try-catchの使用

localStorage操作は例外を投げる可能性があるため、必ずtry-catchで囲みます。

```javascript
function saveData() {
  try {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    console.log('保存成功');
  } catch (error) {
    console.error('保存失敗:', error);
    handleSaveError(error);
  }
}
```

### エラーの種類と対処

```javascript
function handleSaveError(error) {
  if (error.name === 'QuotaExceededError') {
    // ストレージ容量オーバー
    alert('ストレージの容量が不足しています。' +
          '古いデータを削除するか、データをエクスポートしてください。');
  } else if (error.name === 'SecurityError') {
    // セキュリティエラー（プライベートモードなど）
    alert('ブラウザの設定によりデータを保存できません。' +
          'プライベートモードを解除してください。');
  } else {
    // その他のエラー
    alert('データの保存に失敗しました。');
  }
}
```

## ストレージ容量の確認

### 使用容量の推定

```javascript
function getStorageSize() {
  var total = 0;

  for (var key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      // キーと値の文字数を合計
      total += key.length + localStorage.getItem(key).length;
    }
  }

  // バイト数を計算（JavaScriptの文字列は2バイト/文字）
  return total * 2;
}

function displayStorageInfo() {
  var size = getStorageSize();
  var kb = (size / 1024).toFixed(2);
  var mb = (size / 1024 / 1024).toFixed(2);

  console.log('使用容量: ' + kb + ' KB (' + mb + ' MB)');
  console.log('トランザクション数: ' + transactions.length);
}
```

## データのバックアップ戦略

### 自動バックアップの実装

```javascript
function createBackup() {
  try {
    // 現在のデータを取得
    var currentData = localStorage.getItem('transactions');

    if (currentData) {
      // バックアップキーに保存（日時付き）
      var timestamp = new Date().toISOString();
      var backupKey = 'transactions_backup_' + timestamp;

      localStorage.setItem(backupKey, currentData);
      console.log('バックアップを作成しました:', backupKey);
    }
  } catch (error) {
    console.error('バックアップの作成に失敗しました:', error);
  }
}
```

### バックアップからの復元

```javascript
function listBackups() {
  var backups = [];

  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);

    if (key.startsWith('transactions_backup_')) {
      backups.push(key);
    }
  }

  return backups;
}

function restoreFromBackup(backupKey) {
  try {
    var backupData = localStorage.getItem(backupKey);

    if (backupData) {
      localStorage.setItem('transactions', backupData);
      loadData();
      renderIncomeList();
      renderExpenseList();
      updateStats();

      alert('バックアップから復元しました');
    }
  } catch (error) {
    console.error('復元に失敗しました:', error);
    alert('復元に失敗しました');
  }
}
```

## 完成したコード構造

### データフロー

```
起動時:
  loadData() → バリデーション → 画面更新

データ追加時:
  addIncome/addExpense() → saveData() → 画面更新

データ削除時:
  deleteIncome/deleteExpense() → saveData() → 画面更新

設定から削除:
  clearAllData() → 確認 → localStorage.clear() → 画面更新
```

### 関数一覧

**データ管理関数：**
- `saveData()` - データを保存
- `loadData()` - データを読み込み
- `validateTransaction()` - データのバリデーション
- `clearAllData()` - すべてのデータを削除

**エラーハンドリング関数：**
- `handleSaveError()` - 保存エラーの処理

**ユーティリティ関数：**
- `getStorageSize()` - 使用容量を計算
- `displayStorageInfo()` - 容量情報を表示
- `createBackup()` - バックアップを作成
- `listBackups()` - バックアップ一覧を取得
- `restoreFromBackup()` - バックアップから復元

## まとめ

このレッスンで学んだこと：

1. **localStorage API**: データの保存・読み込み・削除の基本操作
2. **JSON変換**: オブジェクトと文字列の相互変換
3. **データ永続化**: 適切なタイミングでのデータ保存
4. **バリデーション**: データの妥当性チェック
5. **エラーハンドリング**: try-catchと適切なエラー対処
6. **容量管理**: ストレージ使用量の確認
7. **バックアップ**: データのバックアップと復元

次のレッスンでは、データのエクスポート機能（CSV、JSON）を実装します。

## 演習問題

1. すべてのlocalStorage操作関数にtry-catchを実装してください
2. データのバリデーション関数を実装してください
3. すべてのデータを削除する機能を有効化してください
4. ストレージの使用容量を表示する機能を実装してください（チャレンジ）
5. バックアップ機能を実装してください（チャレンジ）
