# レッスン165：エクスポート

## このレッスンで学ぶこと
このレッスンでは、予算管理アプリのデータをCSVファイルやJSONファイルとしてエクスポート（書き出し）する機能を実装します。ユーザーがデータをバックアップしたり、他のアプリケーションで利用できるようにします。

## データエクスポートとは

### エクスポートの目的

**データエクスポート**とは、アプリケーション内のデータを外部ファイルとして保存する機能です。

**主な用途：**
- データのバックアップ
- 他のアプリケーションでの利用
- データの共有や移行
- スプレッドシートでの分析

### エクスポート形式

**CSV（Comma-Separated Values）:**
- カンマ区切りのテキストファイル
- Excelなどの表計算ソフトで開ける
- 人間が読みやすい
- シンプルな構造

**JSON（JavaScript Object Notation）:**
- JavaScriptオブジェクト形式のテキストファイル
- プログラムで読み込みやすい
- データ構造を保持できる
- 他のアプリケーションとの連携に便利

## CSV形式のエクスポート

### CSV形式とは

CSV（Comma-Separated Values）は、カンマでデータを区切ったテキストファイル形式です。

**例：**
```csv
日付,種類,カテゴリ,金額,メモ
2025-11-01,収入,給料,300000,11月分給与
2025-11-05,支出,食費,5000,スーパー
2025-11-10,支出,交通費,2000,定期券
```

### CSV文字列を生成する関数

```javascript
function generateCSV() {
  // ヘッダー行を作成
  var csv = '日付,種類,カテゴリ,金額,メモ\n';

  // データ行を追加
  transactions.forEach(function(t) {
    // 種類を日本語に変換
    var type = t.type === 'income' ? '収入' : '支出';

    // メモにカンマが含まれる場合は引用符で囲む
    var memo = t.memo || '';
    if (memo.indexOf(',') !== -1) {
      memo = '"' + memo + '"';
    }

    // 1行を作成
    var row = t.date + ',' + type + ',' + t.category + ',' + t.amount + ',' + memo;
    csv += row + '\n';
  });

  return csv;
}
```

### CSVファイルをダウンロードする関数

ブラウザでファイルをダウンロードするには、Blobオブジェクトと`<a>`要素を使います。

```javascript
function downloadCSV() {
  // CSVデータを生成
  var csvData = generateCSV();

  // BOMを追加（ExcelでUTF-8を正しく認識させるため）
  var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  var blob = new Blob([bom, csvData], { type: 'text/csv;charset=utf-8;' });

  // ダウンロード用のリンクを作成
  var link = document.createElement('a');
  var url = URL.createObjectURL(blob);

  // ファイル名を生成（日時付き）
  var today = new Date();
  var dateString = today.getFullYear() +
                   String(today.getMonth() + 1).padStart(2, '0') +
                   String(today.getDate()).padStart(2, '0');
  var filename = 'budget_data_' + dateString + '.csv';

  // ダウンロードを実行
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();

  // クリーンアップ
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  alert('CSVファイルをダウンロードしました');
}
```

### Blobオブジェクトとは

**Blob（Binary Large Object）**は、バイナリデータを扱うためのオブジェクトです。

```javascript
// Blobの作成
var blob = new Blob(['Hello World'], { type: 'text/plain' });

// Blobのサイズを取得
console.log(blob.size); // 11

// Blobのタイプを取得
console.log(blob.type); // 'text/plain'
```

### URL.createObjectURLとは

Blobからダウンロード可能なURLを生成します。

```javascript
// BlobからURLを生成
var url = URL.createObjectURL(blob);
console.log(url); // "blob:http://localhost:3000/abc123..."

// 使用後は必ずメモリを解放
URL.revokeObjectURL(url);
```

### BOM（Byte Order Mark）とは

BOMは、テキストファイルの文字エンコーディングを示す特殊なバイト列です。

**UTF-8のBOM：**
```javascript
var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
```

**なぜBOMが必要？**
- ExcelがCSVファイルをUTF-8として正しく認識する
- 日本語の文字化けを防ぐ

## JSON形式のエクスポート

### JSON形式とは

JSON（JavaScript Object Notation）は、JavaScriptオブジェクトの表記法を使ったデータ形式です。

**例：**
```json
[
  {
    "id": 1,
    "type": "income",
    "date": "2025-11-01",
    "amount": 300000,
    "category": "給料",
    "memo": "11月分給与"
  },
  {
    "id": 2,
    "type": "expense",
    "date": "2025-11-05",
    "amount": 5000,
    "category": "食費",
    "memo": "スーパー"
  }
]
```

### JSON文字列を生成する関数

```javascript
function generateJSON() {
  // 整形されたJSON文字列を生成
  var jsonData = JSON.stringify(transactions, null, 2);
  return jsonData;
}
```

**JSON.stringifyの引数：**
- 第1引数: 変換するオブジェクト
- 第2引数: replacer関数（nullの場合はすべてのプロパティを含む）
- 第3引数: インデント（2 = 2スペース）

### JSONファイルをダウンロードする関数

```javascript
function downloadJSON() {
  // JSONデータを生成
  var jsonData = generateJSON();

  // Blobを作成
  var blob = new Blob([jsonData], { type: 'application/json;charset=utf-8;' });

  // ダウンロード用のリンクを作成
  var link = document.createElement('a');
  var url = URL.createObjectURL(blob);

  // ファイル名を生成
  var today = new Date();
  var dateString = today.getFullYear() +
                   String(today.getMonth() + 1).padStart(2, '0') +
                   String(today.getDate()).padStart(2, '0');
  var filename = 'budget_data_' + dateString + '.json';

  // ダウンロードを実行
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();

  // クリーンアップ
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  alert('JSONファイルをダウンロードしました');
}
```

## エクスポート機能の実装

### HTMLの更新

設定タブのボタンを有効化します。

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

    <h3>データ削除</h3>
    <div class="button-group">
        <button class="danger-button" id="clear-all-button">すべてのデータを削除</button>
    </div>

    <p class="note">インポート機能はレッスン166で実装します</p>

    <div class="button-group">
        <button class="secondary-button" disabled>データインポート</button>
    </div>
</div>
```

### イベントリスナーの追加

```javascript
function setupEventListeners() {
  var addIncomeButton = document.getElementById('add-income-button');
  var addExpenseButton = document.getElementById('add-expense-button');
  var clearButton = document.getElementById('clear-all-button');
  var exportCSVButton = document.getElementById('export-csv-button');
  var exportJSONButton = document.getElementById('export-json-button');

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
}
```

## CSVの特殊文字の扱い

### カンマを含むデータ

データにカンマが含まれる場合は、ダブルクォーテーションで囲みます。

```javascript
var memo = 'ランチ, コーヒー';
// CSVでは: "ランチ, コーヒー"
```

### 改行を含むデータ

データに改行が含まれる場合も、ダブルクォーテーションで囲みます。

```javascript
var memo = '食費\n合計5000円';
// CSVでは: "食費\n合計5000円"
```

### ダブルクォーテーションを含むデータ

データにダブルクォーテーションが含まれる場合は、2つ重ねます。

```javascript
var memo = '彼は「こんにちは」と言った';
// CSVでは: "彼は""こんにちは""と言った"
```

### エスケープ処理関数

```javascript
function escapeCSVValue(value) {
  // 値を文字列に変換
  var str = String(value);

  // カンマ、改行、ダブルクォーテーションが含まれるか確認
  if (str.indexOf(',') !== -1 ||
      str.indexOf('\n') !== -1 ||
      str.indexOf('"') !== -1) {
    // ダブルクォーテーションをエスケープ
    str = str.replace(/"/g, '""');
    // 全体を引用符で囲む
    str = '"' + str + '"';
  }

  return str;
}
```

### 改善されたCSV生成関数

```javascript
function generateCSV() {
  var csv = '日付,種類,カテゴリ,金額,メモ\n';

  transactions.forEach(function(t) {
    var type = t.type === 'income' ? '収入' : '支出';
    var memo = t.memo || '';

    // 各値をエスケープ
    var row = t.date + ',' +
              type + ',' +
              escapeCSVValue(t.category) + ',' +
              t.amount + ',' +
              escapeCSVValue(memo);

    csv += row + '\n';
  });

  return csv;
}
```

## データのフィルタリング

### 期間を指定してエクスポート

特定の期間のデータのみをエクスポートする機能を追加できます。

```javascript
function filterByDateRange(startDate, endDate) {
  return transactions.filter(function(t) {
    return t.date >= startDate && t.date <= endDate;
  });
}

function generateCSVWithFilter(startDate, endDate) {
  var csv = '日付,種類,カテゴリ,金額,メモ\n';

  var filteredData = filterByDateRange(startDate, endDate);

  filteredData.forEach(function(t) {
    var type = t.type === 'income' ? '収入' : '支出';
    var memo = t.memo || '';

    var row = t.date + ',' +
              type + ',' +
              escapeCSVValue(t.category) + ',' +
              t.amount + ',' +
              escapeCSVValue(memo);

    csv += row + '\n';
  });

  return csv;
}
```

## エクスポート機能のテスト

### ブラウザでのテスト

1. データを追加する
2. 設定タブを開く
3. 「CSVエクスポート」ボタンをクリック
4. ダウンロードされたファイルを確認
5. Excelで開いて日本語が正しく表示されるか確認

### JSONファイルの確認

1. 「JSONエクスポート」ボタンをクリック
2. ダウンロードされたファイルをテキストエディタで開く
3. JSON形式が正しいか確認
4. すべてのデータが含まれているか確認

## エラーハンドリング

### データがない場合

```javascript
function downloadCSV() {
  if (transactions.length === 0) {
    alert('エクスポートするデータがありません');
    return;
  }

  // CSV生成とダウンロード処理
  var csvData = generateCSV();
  // ... 続く
}
```

### ブラウザの互換性

```javascript
function downloadCSV() {
  if (transactions.length === 0) {
    alert('エクスポートするデータがありません');
    return;
  }

  try {
    var csvData = generateCSV();
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    var blob = new Blob([bom, csvData], { type: 'text/csv;charset=utf-8;' });

    // Blob APIがサポートされているか確認
    if (typeof Blob === 'undefined') {
      alert('お使いのブラウザはファイルダウンロードに対応していません');
      return;
    }

    // ダウンロード処理
    var link = document.createElement('a');
    var url = URL.createObjectURL(blob);

    var today = new Date();
    var dateString = today.getFullYear() +
                     String(today.getMonth() + 1).padStart(2, '0') +
                     String(today.getDate()).padStart(2, '0');
    var filename = 'budget_data_' + dateString + '.csv';

    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('CSVファイルをダウンロードしました');
  } catch (error) {
    console.error('エクスポートエラー:', error);
    alert('ファイルのダウンロードに失敗しました');
  }
}
```

## まとめ

このレッスンで学んだこと：

1. **CSV形式**: カンマ区切りテキストファイルの生成
2. **JSON形式**: JavaScriptオブジェクト形式のファイル生成
3. **Blob API**: バイナリデータの扱い方
4. **ファイルダウンロード**: ブラウザでファイルを生成してダウンロード
5. **BOM**: UTF-8のBOMとExcel対応
6. **CSVエスケープ**: 特殊文字の適切な処理
7. **エラーハンドリング**: データチェックと例外処理

次のレッスンでは、エクスポートしたファイルをインポート（読み込み）する機能を実装します。

## 演習問題

1. CSV形式でデータをエクスポートする機能を実装してください
2. JSON形式でデータをエクスポートする機能を実装してください
3. データがない場合のエラー処理を追加してください
4. CSVのエスケープ処理を実装してください（チャレンジ）
5. 期間を指定してエクスポートする機能を実装してください（チャレンジ）
