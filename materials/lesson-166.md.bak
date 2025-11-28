# レッスン166：インポート

## このレッスンで学ぶこと
このレッスンでは、エクスポートしたCSVファイルやJSONファイルをインポート（読み込み）する機能を実装します。File APIを使ってブラウザでファイルを読み込み、データの検証とマージを行います。

## データインポートとは

### インポートの目的

**データインポート**とは、外部ファイルからデータを読み込んでアプリケーションに取り込む機能です。

**主な用途：**
- バックアップからの復元
- 他のデバイスからのデータ移行
- 別のアプリケーションからのデータ取り込み
- データの一括登録

### インポートの流れ

1. ファイル選択（`<input type="file">`）
2. ファイルの読み込み（FileReader API）
3. データの解析（CSV/JSONパース）
4. データの検証（バリデーション）
5. データの統合（既存データとのマージ）
6. 保存と画面更新

## File APIの基礎

### input要素でファイルを選択

```html
<input type="file" id="file-input" accept=".json,.csv">
```

**accept属性**: 選択可能なファイル形式を制限

```javascript
var fileInput = document.getElementById('file-input');

fileInput.addEventListener('change', function(event) {
  var file = event.target.files[0];

  if (file) {
    console.log('ファイル名:', file.name);
    console.log('ファイルサイズ:', file.size);
    console.log('ファイルタイプ:', file.type);
  }
});
```

### FileReaderでファイルを読み込む

**FileReader**は、ブラウザでファイルの内容を読み込むためのAPIです。

```javascript
var reader = new FileReader();

// 読み込み完了時のイベント
reader.onload = function(event) {
  var content = event.target.result;
  console.log('ファイル内容:', content);
};

// エラー時のイベント
reader.onerror = function(event) {
  console.error('ファイル読み込みエラー:', event);
};

// テキストファイルとして読み込み
reader.readAsText(file);
```

### FileReaderの主なメソッド

```javascript
// テキストとして読み込み
reader.readAsText(file);

// Data URLとして読み込み（画像など）
reader.readAsDataURL(file);

// ArrayBufferとして読み込み（バイナリデータ）
reader.readAsArrayBuffer(file);
```

## JSONファイルのインポート

### JSON読み込み関数の実装

```javascript
function importJSON(file) {
  // FileReaderを作成
  var reader = new FileReader();

  reader.onload = function(event) {
    try {
      // ファイル内容をJSONとして解析
      var content = event.target.result;
      var importedData = JSON.parse(content);

      // データが配列かチェック
      if (!Array.isArray(importedData)) {
        alert('ファイル形式が不正です');
        return;
      }

      // データを検証
      var validData = importedData.filter(function(item) {
        return validateTransaction(item);
      });

      if (validData.length === 0) {
        alert('有効なデータが見つかりませんでした');
        return;
      }

      // データをマージ
      mergeTransactions(validData);

      alert('JSONファイルを読み込みました: ' + validData.length + '件');

    } catch (error) {
      console.error('JSONパースエラー:', error);
      alert('ファイルの読み込みに失敗しました');
    }
  };

  reader.onerror = function(event) {
    console.error('ファイル読み込みエラー:', event);
    alert('ファイルの読み込みに失敗しました');
  };

  // テキストとして読み込み
  reader.readAsText(file);
}
```

## CSVファイルのインポート

### CSV解析の基礎

CSV形式は単純そうに見えますが、以下の特殊ケースがあります：

- カンマを含むデータ（引用符で囲まれている）
- 改行を含むデータ
- ダブルクォーテーションのエスケープ（""）

### 簡易CSV解析関数

```javascript
function parseCSV(csvText) {
  var lines = csvText.split('\n');
  var result = [];

  // ヘッダー行をスキップ（1行目）
  for (var i = 1; i < lines.length; i++) {
    var line = lines[i].trim();

    // 空行をスキップ
    if (line === '') {
      continue;
    }

    // カンマで分割
    var columns = line.split(',');

    // 列数をチェック（5列：日付,種類,カテゴリ,金額,メモ）
    if (columns.length < 5) {
      continue;
    }

    // データオブジェクトを作成
    var item = {
      date: columns[0].trim(),
      type: columns[1].trim() === '収入' ? 'income' : 'expense',
      category: columns[2].trim(),
      amount: parseFloat(columns[3].trim()),
      memo: columns[4].trim()
    };

    result.push(item);
  }

  return result;
}
```

### 引用符を処理するCSV解析関数

```javascript
function parseCSVLine(line) {
  var result = [];
  var current = '';
  var inQuotes = false;

  for (var i = 0; i < line.length; i++) {
    var char = line[i];

    if (char === '"') {
      // 次の文字もダブルクォーテーションの場合はエスケープ
      if (i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++; // 次の文字をスキップ
      } else {
        // 引用符の開始/終了を切り替え
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // カンマかつ引用符外の場合は列の区切り
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  // 最後の列を追加
  result.push(current);

  return result;
}

function parseCSV(csvText) {
  var lines = csvText.split('\n');
  var result = [];

  for (var i = 1; i < lines.length; i++) {
    var line = lines[i].trim();

    if (line === '') {
      continue;
    }

    var columns = parseCSVLine(line);

    if (columns.length < 5) {
      continue;
    }

    var item = {
      date: columns[0].trim(),
      type: columns[1].trim() === '収入' ? 'income' : 'expense',
      category: columns[2].trim(),
      amount: parseFloat(columns[3].trim()),
      memo: columns[4].trim().replace(/^"|"$/g, '')
    };

    result.push(item);
  }

  return result;
}
```

### CSV読み込み関数の実装

```javascript
function importCSV(file) {
  var reader = new FileReader();

  reader.onload = function(event) {
    try {
      var content = event.target.result;
      var parsedData = parseCSV(content);

      if (parsedData.length === 0) {
        alert('有効なデータが見つかりませんでした');
        return;
      }

      // データを検証
      var validData = parsedData.filter(function(item) {
        return validateImportedData(item);
      });

      if (validData.length === 0) {
        alert('有効なデータが見つかりませんでした');
        return;
      }

      // データをマージ
      mergeTransactions(validData);

      alert('CSVファイルを読み込みました: ' + validData.length + '件');

    } catch (error) {
      console.error('CSVパースエラー:', error);
      alert('ファイルの読み込みに失敗しました');
    }
  };

  reader.onerror = function(event) {
    console.error('ファイル読み込みエラー:', event);
    alert('ファイルの読み込みに失敗しました');
  };

  reader.readAsText(file);
}
```

## データの検証

### インポートデータの検証関数

```javascript
function validateImportedData(item) {
  // 必須フィールドのチェック
  if (!item.date || !item.type || !item.category || item.amount === undefined) {
    return false;
  }

  // 日付形式のチェック（YYYY-MM-DD）
  var datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(item.date)) {
    return false;
  }

  // typeのチェック
  if (item.type !== 'income' && item.type !== 'expense') {
    return false;
  }

  // 金額のチェック
  if (typeof item.amount !== 'number' || isNaN(item.amount) || item.amount < 0) {
    return false;
  }

  return true;
}
```

## データのマージ

### 既存データとの統合

新しいIDを割り当ててデータを追加します。

```javascript
function mergeTransactions(importedData) {
  // 各データに新しいIDを割り当てて追加
  importedData.forEach(function(item) {
    var newTransaction = {
      id: generateId(),
      type: item.type,
      date: item.date,
      amount: item.amount,
      category: item.category,
      memo: item.memo || ''
    };

    transactions.push(newTransaction);
  });

  // データを保存
  saveData();

  // 画面を更新
  renderIncomeList();
  renderExpenseList();
  updateIncomeTotal();
  updateExpenseTotal();
  updateStats();
}
```

### 重複チェック機能（オプション）

```javascript
function isDuplicate(newItem) {
  return transactions.some(function(existing) {
    return existing.date === newItem.date &&
           existing.type === newItem.type &&
           existing.category === newItem.category &&
           existing.amount === newItem.amount &&
           existing.memo === newItem.memo;
  });
}

function mergeTransactionsWithDuplicateCheck(importedData) {
  var added = 0;
  var skipped = 0;

  importedData.forEach(function(item) {
    if (!isDuplicate(item)) {
      var newTransaction = {
        id: generateId(),
        type: item.type,
        date: item.date,
        amount: item.amount,
        category: item.category,
        memo: item.memo || ''
      };

      transactions.push(newTransaction);
      added++;
    } else {
      skipped++;
    }
  });

  saveData();
  renderIncomeList();
  renderExpenseList();
  updateIncomeTotal();
  updateExpenseTotal();
  updateStats();

  alert('インポート完了\n追加: ' + added + '件\nスキップ: ' + skipped + '件');
}
```

## インポート機能の実装

### HTMLの更新

```html
<div class="settings-section">
    <h2>データ管理</h2>

    <div class="storage-info">
        <h3>ストレージ情報</h3>
        <div id="storage-info-content">
            <p>データ件数: <span id="data-count">0</span>件</p>
            <p>使用容量: <span id="storage-size">0</span> KB</p>
        </div>
    </div>

    <h3>エクスポート</h3>
    <div class="button-group">
        <button class="secondary-button" id="export-csv-button">CSVエクスポート</button>
        <button class="secondary-button" id="export-json-button">JSONエクスポート</button>
    </div>

    <h3>インポート</h3>
    <div class="button-group">
        <input type="file" id="import-file-input" accept=".json,.csv" style="display: none;">
        <button class="secondary-button" id="import-button">ファイルを選択</button>
    </div>
    <p class="note" id="import-file-name"></p>

    <h3>データ削除</h3>
    <div class="button-group">
        <button class="danger-button" id="clear-all-button">すべてのデータを削除</button>
    </div>
</div>
```

### インポートボタンのイベントリスナー

```javascript
function setupEventListeners() {
  var addIncomeButton = document.getElementById('add-income-button');
  var addExpenseButton = document.getElementById('add-expense-button');
  var clearButton = document.getElementById('clear-all-button');
  var exportCSVButton = document.getElementById('export-csv-button');
  var exportJSONButton = document.getElementById('export-json-button');
  var importButton = document.getElementById('import-button');
  var importFileInput = document.getElementById('import-file-input');

  if (addIncomeButton) {
    addIncomeButton.addEventListener('click', addIncome);
  }

  if (addExpenseButton) {
    addExpenseButton.addEventListener('click', addExpense);
  }

  if (clearButton) {
    clearButton.addEventListener('click', clearAllData);
  }

  if (exportCSVButton) {
    exportCSVButton.addEventListener('click', downloadCSV);
  }

  if (exportJSONButton) {
    exportJSONButton.addEventListener('click', downloadJSON);
  }

  // インポートボタン: ファイル選択ダイアログを開く
  if (importButton && importFileInput) {
    importButton.addEventListener('click', function() {
      importFileInput.click();
    });

    // ファイルが選択されたとき
    importFileInput.addEventListener('change', handleFileSelect);
  }
}
```

### ファイル選択ハンドラー

```javascript
function handleFileSelect(event) {
  var file = event.target.files[0];

  if (!file) {
    return;
  }

  // ファイル名を表示
  var fileNameElement = document.getElementById('import-file-name');
  if (fileNameElement) {
    fileNameElement.textContent = '選択中: ' + file.name;
  }

  // ファイル形式を判定
  var fileName = file.name.toLowerCase();

  if (fileName.endsWith('.json')) {
    importJSON(file);
  } else if (fileName.endsWith('.csv')) {
    importCSV(file);
  } else {
    alert('サポートされていないファイル形式です。JSON または CSV ファイルを選択してください。');
  }

  // ファイル入力をリセット（同じファイルを再度選択できるように）
  event.target.value = '';
}
```

## エラーハンドリング

### ファイルサイズのチェック

```javascript
function handleFileSelect(event) {
  var file = event.target.files[0];

  if (!file) {
    return;
  }

  // ファイルサイズをチェック（5MB制限）
  var maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    alert('ファイルサイズが大きすぎます（最大5MB）');
    event.target.value = '';
    return;
  }

  // 以下、ファイル処理...
}
```

### 文字エンコーディングの問題

```javascript
function importCSV(file) {
  var reader = new FileReader();

  reader.onload = function(event) {
    try {
      var content = event.target.result;

      // BOMを削除（あれば）
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
      }

      var parsedData = parseCSV(content);
      // 以下、データ処理...

    } catch (error) {
      console.error('CSVパースエラー:', error);
      alert('ファイルの読み込みに失敗しました');
    }
  };

  reader.onerror = function(event) {
    console.error('ファイル読み込みエラー:', event);
    alert('ファイルの読み込みに失敗しました');
  };

  // UTF-8として読み込み
  reader.readAsText(file, 'UTF-8');
}
```

## セキュリティの考慮事項

### 信頼できないファイルの扱い

1. **データの検証**: すべてのインポートデータを検証する
2. **サイズ制限**: ファイルサイズを制限する
3. **サニタイゼーション**: HTMLタグやスクリプトを除去する
4. **エラーハンドリング**: try-catchで例外を捕捉する

```javascript
function sanitizeString(str) {
  // HTMLタグを除去
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function validateImportedData(item) {
  // 基本的な検証
  if (!item.date || !item.type || !item.category || item.amount === undefined) {
    return false;
  }

  // メモをサニタイズ
  if (item.memo) {
    item.memo = sanitizeString(item.memo);
  }

  // カテゴリをサニタイズ
  item.category = sanitizeString(item.category);

  return true;
}
```

## まとめ

このレッスンで学んだこと：

1. **File API**: ブラウザでのファイル選択と読み込み
2. **FileReader**: テキストファイルの読み込み
3. **JSON解析**: `JSON.parse()` でJSONデータを読み込み
4. **CSV解析**: カンマ区切りデータの解析と特殊文字の処理
5. **データ検証**: インポートデータの妥当性チェック
6. **データマージ**: 既存データとの統合
7. **エラーハンドリング**: ファイル読み込みエラーの処理
8. **セキュリティ**: データのサニタイゼーションとサイズ制限

これで予算管理アプリの基本機能（CRUD + エクスポート/インポート）がすべて完成しました！

## 演習問題

1. JSONファイルをインポートする機能を実装してください
2. CSVファイルをインポートする機能を実装してください
3. ファイル選択ダイアログを開く機能を実装してください
4. データの検証処理を実装してください
5. 重複チェック機能を実装してください（チャレンジ）
6. ファイルサイズの制限を実装してください（チャレンジ）
