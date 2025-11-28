# レッスン130: 変換関数

**作成日**: 2025-11-26

## このレッスンで学ぶこと

- データの変換とは
- フォーマット変更の方法
- 正規化処理
- マッピング関数の活用
- 型変換とデータ整形

---

## 日常生活での例：通貨両替所

変換関数は、**通貨両替所**のようなものです。

```
通貨両替所：
┌─────────────────────────────────┐
│  入力: 1000円                    │
│    ↓                            │
│  変換処理（レート: 1円 = 0.0067$）│  ← convertCurrency()
│    ↓                            │
│  出力: 6.7ドル                   │
└─────────────────────────────────┘

変換のルール：
✓ 入力を受け取る（1000円）
✓ 決まった規則で変換（×0.0067）
✓ 新しい形式で返す（6.7ドル）
```

**両替所の特徴**：
- 一つの形式を別の形式に変える
- 変換ルールは明確
- 元のお金は使わない（新しいお金を渡す）

**変換関数の特徴**：
- あるデータ形式を別の形式に変える
- 変換ロジックは明確
- 元のデータは変更しない（新しいデータを返す）

---

## 変換関数とは

**変換関数**（Converter Functions）は、あるデータ形式を別の形式に変換する関数です。

### 変換関数の特徴

```javascript
// ❌ 元のデータを変更（危険）
const convertToUppercase = function(str) {
  str = str.toUpperCase();  // 引数を直接変更
  return str;
};

// ✅ 新しいデータを返す（安全）
const convertToUppercase = function(str) {
  return str.toUpperCase();  // 新しい値を返す
};

const original = 'hello';
const converted = convertToUppercase(original);

console.log(original);   // => 'hello'（元のまま）
console.log(converted);  // => 'HELLO'（変換後）
```

**変換関数の原則**：
1. **入力を受け取る**: 元のデータ
2. **変換する**: 決まったルールで処理
3. **新しいデータを返す**: 元のデータは変更しない
4. **予測可能**: 同じ入力には同じ出力

---

## 基本例1: 文字列の変換

最もシンプルな文字列変換の関数です。

```javascript
// 文字列を大文字に変換
const toUpperCase = function(str) {
  return str.toUpperCase();
};

// 文字列を小文字に変換
const toLowerCase = function(str) {
  return str.toLowerCase();
};

// 文字列の先頭を大文字に変換
const capitalize = function(str) {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// 使用例
console.log(toUpperCase('hello'));      // => 'HELLO'
console.log(toLowerCase('WORLD'));      // => 'world'
console.log(capitalize('javaScript'));  // => 'Javascript'
```

### 実行フローの詳細

```
capitalize('javaScript') の実行：

入力: str = 'javaScript'

ステップ1: 空文字チェック
         str.length = 10
         10 === 0 ? → false（スキップ）

ステップ2: 先頭文字を取得して大文字化
         str.charAt(0) → 'j'
         'j'.toUpperCase() → 'J'

ステップ3: 残りの文字を取得して小文字化
         str.slice(1) → 'avaScript'
         'avaScript'.toLowerCase() → 'avascript'

ステップ4: 結合
         'J' + 'avascript' → 'Javascript'

結果: 'Javascript'
```

---

## 基本例2: 数値のフォーマット変換

数値を様々な形式に変換する関数です。

```javascript
// 数値を通貨形式に変換
const toCurrency = function(amount) {
  return '¥' + amount.toLocaleString('ja-JP');
};

// 数値をパーセント形式に変換
const toPercent = function(decimal) {
  return (decimal * 100).toFixed(1) + '%';
};

// 秒を時分秒形式に変換
const toTimeFormat = function(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = function(num) {
    return String(num).padStart(2, '0');
  };

  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
};

// 使用例
console.log(toCurrency(1234567));     // => '¥1,234,567'
console.log(toPercent(0.856));        // => '85.6%'
console.log(toTimeFormat(3661));      // => '01:01:01'
```

### 実行フローの詳細

```
toTimeFormat(3661) の実行：

入力: seconds = 3661

ステップ1: 時間を計算
         hours = Math.floor(3661 / 3600)
         hours = Math.floor(1.016...)
         hours = 1

ステップ2: 分を計算
         3661 % 3600 = 61
         minutes = Math.floor(61 / 60)
         minutes = Math.floor(1.016...)
         minutes = 1

ステップ3: 秒を計算
         secs = 3661 % 60
         secs = 1

ステップ4: パディング関数で整形
         pad(1) → '01'
         pad(1) → '01'
         pad(1) → '01'

ステップ5: 結合
         '01' + ':' + '01' + ':' + '01'
         → '01:01:01'

結果: '01:01:01'
```

---

## 基本例3: データの正規化

データを統一された形式に正規化する関数です。

```javascript
// 電話番号を正規化（ハイフンを削除）
const normalizePhoneNumber = function(phone) {
  // ハイフン、スペース、括弧を削除
  return phone.replace(/[-\s()]/g, '');
};

// 名前を正規化（余分な空白を削除、先頭を大文字に）
const normalizeName = function(name) {
  // 前後の空白を削除、連続する空白を1つに
  const trimmed = name.trim().replace(/\s+/g, ' ');

  // 各単語の先頭を大文字に
  const words = trimmed.split(' ');
  const capitalized = words.map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return capitalized.join(' ');
};

// 使用例
console.log(normalizePhoneNumber('090-1234-5678'));  // => '09012345678'
console.log(normalizePhoneNumber('(03) 1234-5678')); // => '0312345678'

console.log(normalizeName('  john   doe  '));        // => 'John Doe'
console.log(normalizeName('ALICE SMITH'));            // => 'Alice Smith'
```

### 実行フローの詳細

```
normalizePhoneNumber('090-1234-5678') の実行：

入力: phone = '090-1234-5678'

ステップ1: replace(/[-\s()]/g, '') を実行
         正規表現の意味：
         [-\s()] → ハイフン、空白、括弧のいずれか
         g → すべてマッチ

ステップ2: マッチした文字を削除
         '090-1234-5678'
         ↓ '-'を削除
         '09012345678'

結果: '09012345678'


normalizeName('  john   doe  ') の実行：

入力: name = '  john   doe  '

ステップ1: trim() で前後の空白を削除
         '  john   doe  ' → 'john   doe'

ステップ2: replace(/\s+/g, ' ') で連続空白を1つに
         'john   doe' → 'john doe'

ステップ3: split(' ') で単語に分割
         ['john', 'doe']

ステップ4: map()で各単語を先頭大文字化
         'john' → 'John'
         'doe' → 'Doe'
         結果: ['John', 'Doe']

ステップ5: join(' ') で結合
         ['John', 'Doe'] → 'John Doe'

結果: 'John Doe'
```

---

## 実践例1: ユーザーデータ変換システム

APIから受け取ったデータを表示用に変換するシステムです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ユーザーデータ変換</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }
    .section {
      margin: 30px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    h3 {
      margin-top: 0;
      color: #2c3e50;
    }
    .data-display {
      background-color: white;
      padding: 15px;
      border-radius: 4px;
      margin: 10px 0;
    }
    .label {
      font-weight: bold;
      color: #7f8c8d;
    }
    pre {
      background-color: #ecf0f1;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
    }
    button {
      padding: 10px 20px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    button:hover {
      background-color: #2980b9;
    }
  </style>
</head>
<body>
  <h1>🔄 ユーザーデータ変換システム</h1>

  <div class="section">
    <h3>元のAPIデータ</h3>
    <pre id="rawData"></pre>
  </div>

  <button onclick="convertData()">データを変換</button>

  <div class="section">
    <h3>変換後のデータ</h3>
    <div id="convertedData"></div>
  </div>

  <script>
    // ========================================
    // APIから取得した元データ（例）
    // ========================================
    const rawUserData = {
      user_name: '  yamada taro  ',
      email_address: 'YAMADA@EXAMPLE.COM',
      birth_date: '1995-03-15',
      phone: '090-1234-5678',
      salary: 5000000,
      join_date: '2020-04-01',
      is_active: 1
    };

    // ========================================
    // 変換関数群
    // ========================================

    // 名前を正規化（余分な空白削除、先頭大文字化）
    const normalizeName = function(name) {
      const trimmed = name.trim().replace(/\s+/g, ' ');
      const words = trimmed.split(' ');
      const capitalized = words.map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });
      return capitalized.join(' ');
    };

    // メールアドレスを小文字に正規化
    const normalizeEmail = function(email) {
      return email.toLowerCase();
    };

    // 電話番号を正規化（ハイフン削除）
    const normalizePhone = function(phone) {
      return phone.replace(/[-\s()]/g, '');
    };

    // 日付をフォーマット（YYYY-MM-DD → YYYY年MM月DD日）
    const formatDate = function(dateString) {
      const parts = dateString.split('-');
      return `${parts[0]}年${parts[1]}月${parts[2]}日`;
    };

    // 給与を通貨形式に変換
    const formatSalary = function(amount) {
      return '¥' + amount.toLocaleString('ja-JP');
    };

    // 数値のブール値を文字列に変換
    const formatBoolean = function(value) {
      return value === 1 ? 'アクティブ' : '非アクティブ';
    };

    // キー名を変換（スネークケース → キャメルケース）
    const toCamelCase = function(str) {
      return str.replace(/_([a-z])/g, function(match, letter) {
        return letter.toUpperCase();
      });
    };

    // ========================================
    // 総合変換関数
    // ========================================

    const convertUserData = function(rawData) {
      return {
        userName: normalizeName(rawData.user_name),
        email: normalizeEmail(rawData.email_address),
        birthDate: formatDate(rawData.birth_date),
        phone: normalizePhone(rawData.phone),
        salary: formatSalary(rawData.salary),
        joinDate: formatDate(rawData.join_date),
        status: formatBoolean(rawData.is_active)
      };
    };

    // ========================================
    // UI操作関数
    // ========================================

    // 初期表示
    document.getElementById('rawData').textContent =
      JSON.stringify(rawUserData, null, 2);

    function convertData() {
      const converted = convertUserData(rawUserData);

      const html = `
        <div class="data-display">
          <div><span class="label">ユーザー名:</span> ${converted.userName}</div>
          <div><span class="label">メール:</span> ${converted.email}</div>
          <div><span class="label">生年月日:</span> ${converted.birthDate}</div>
          <div><span class="label">電話番号:</span> ${converted.phone}</div>
          <div><span class="label">給与:</span> ${converted.salary}</div>
          <div><span class="label">入社日:</span> ${converted.joinDate}</div>
          <div><span class="label">ステータス:</span> ${converted.status}</div>
        </div>
      `;

      document.getElementById('convertedData').innerHTML = html;

      console.log('=== 変換結果 ===');
      console.log('元データ:', rawUserData);
      console.log('変換後:', converted);

      console.log('\n=== 各フィールドの変換 ===');
      console.log('名前:', rawUserData.user_name, '→', converted.userName);
      console.log('メール:', rawUserData.email_address, '→', converted.email);
      console.log('生年月日:', rawUserData.birth_date, '→', converted.birthDate);
      console.log('電話:', rawUserData.phone, '→', converted.phone);
      console.log('給与:', rawUserData.salary, '→', converted.salary);
    }
  </script>
</body>
</html>
```

### データ変換の実行フロー

```
convertUserData(rawUserData) の実行：

入力データ:
  user_name: '  yamada taro  '
  email_address: 'YAMADA@EXAMPLE.COM'
  phone: '090-1234-5678'
  salary: 5000000

変換処理:

1. userName の変換:
   normalizeName('  yamada taro  ')
   ↓ trim()
   'yamada taro'
   ↓ split(' ')
   ['yamada', 'taro']
   ↓ map(capitalize)
   ['Yamada', 'Taro']
   ↓ join(' ')
   'Yamada Taro'

2. email の変換:
   normalizeEmail('YAMADA@EXAMPLE.COM')
   ↓ toLowerCase()
   'yamada@example.com'

3. phone の変換:
   normalizePhone('090-1234-5678')
   ↓ replace(/[-\s()]/g, '')
   '09012345678'

4. salary の変換:
   formatSalary(5000000)
   ↓ toLocaleString()
   '5,000,000'
   ↓ '¥' を追加
   '¥5,000,000'

変換結果:
  userName: 'Yamada Taro'
  email: 'yamada@example.com'
  phone: '09012345678'
  salary: '¥5,000,000'
```

---

## 実践例2: データフォーマット変換ツール

様々なデータフォーマット間で変換を行うツールです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>データフォーマット変換</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 900px;
      margin: 50px auto;
      padding: 20px;
    }
    .converter {
      display: grid;
      grid-template-columns: 1fr 100px 1fr;
      gap: 20px;
      margin: 20px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    .input-area, .output-area {
      display: flex;
      flex-direction: column;
    }
    .arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      color: #3498db;
    }
    textarea {
      width: 100%;
      height: 150px;
      padding: 10px;
      font-family: monospace;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
      resize: vertical;
    }
    button {
      margin-top: 10px;
      padding: 10px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #2980b9;
    }
    .format-label {
      font-weight: bold;
      margin-bottom: 5px;
      color: #2c3e50;
    }
    .result {
      background-color: #ecf0f1;
      padding: 10px;
      border-radius: 4px;
      min-height: 150px;
      white-space: pre-wrap;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <h1>🔄 データフォーマット変換ツール</h1>

  <div class="converter">
    <div class="input-area">
      <div class="format-label">JSON形式</div>
      <textarea id="jsonInput" placeholder='{"name": "太郎", "age": 25}'></textarea>
      <button onclick="convertJSONToCSV()">CSV形式に変換 →</button>
    </div>
    <div class="arrow">→</div>
    <div class="output-area">
      <div class="format-label">CSV形式</div>
      <div class="result" id="csvOutput"></div>
    </div>
  </div>

  <div class="converter">
    <div class="input-area">
      <div class="format-label">CSV形式</div>
      <textarea id="csvInput" placeholder="name,age&#10;太郎,25&#10;花子,30"></textarea>
      <button onclick="convertCSVToJSON()">JSON形式に変換 →</button>
    </div>
    <div class="arrow">→</div>
    <div class="output-area">
      <div class="format-label">JSON形式</div>
      <div class="result" id="jsonOutput"></div>
    </div>
  </div>

  <div class="converter">
    <div class="input-area">
      <div class="format-label">オブジェクト配列</div>
      <textarea id="objectInput" placeholder='[{"name":"太郎","score":85}]'></textarea>
      <button onclick="convertToTable()">HTMLテーブルに変換 →</button>
    </div>
    <div class="arrow">→</div>
    <div class="output-area">
      <div class="format-label">HTMLテーブル</div>
      <div class="result" id="tableOutput"></div>
    </div>
  </div>

  <script>
    // ========================================
    // 変換関数群
    // ========================================

    // JSON → CSV 変換
    const jsonToCSV = function(jsonString) {
      try {
        const data = JSON.parse(jsonString);

        // 配列でない場合は配列に変換
        const array = Array.isArray(data) ? data : [data];

        if (array.length === 0) {
          return '';
        }

        // ヘッダー行を作成
        const headers = Object.keys(array[0]);
        const headerRow = headers.join(',');

        // データ行を作成
        const dataRows = array.map(function(obj) {
          return headers.map(function(key) {
            const value = obj[key];
            // カンマや改行を含む場合はクォートで囲む
            if (String(value).includes(',') || String(value).includes('\n')) {
              return '"' + value + '"';
            }
            return value;
          }).join(',');
        });

        return headerRow + '\n' + dataRows.join('\n');
      } catch (error) {
        return 'エラー: ' + error.message;
      }
    };

    // CSV → JSON 変換
    const csvToJSON = function(csvString) {
      try {
        const lines = csvString.trim().split('\n');

        if (lines.length < 2) {
          return 'エラー: 最低2行必要です（ヘッダー + データ）';
        }

        // ヘッダー行を解析
        const headers = lines[0].split(',').map(function(header) {
          return header.trim();
        });

        // データ行を解析
        const data = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');
          const obj = {};

          for (let j = 0; j < headers.length; j++) {
            const value = values[j].trim();
            // 数値に変換可能なら数値に
            obj[headers[j]] = isNaN(value) ? value : Number(value);
          }

          data.push(obj);
        }

        return JSON.stringify(data, null, 2);
      } catch (error) {
        return 'エラー: ' + error.message;
      }
    };

    // オブジェクト配列 → HTMLテーブル 変換
    const arrayToHTMLTable = function(jsonString) {
      try {
        const data = JSON.parse(jsonString);

        if (!Array.isArray(data) || data.length === 0) {
          return '<p>配列データが必要です</p>';
        }

        const headers = Object.keys(data[0]);

        // テーブルヘッダー
        let html = '<table border="1" style="border-collapse: collapse; width: 100%;">';
        html += '<thead><tr>';
        headers.forEach(function(header) {
          html += '<th style="padding: 8px; background-color: #3498db; color: white;">' + header + '</th>';
        });
        html += '</tr></thead>';

        // テーブルボディ
        html += '<tbody>';
        data.forEach(function(row) {
          html += '<tr>';
          headers.forEach(function(header) {
            html += '<td style="padding: 8px; border: 1px solid #ddd;">' + row[header] + '</td>';
          });
          html += '</tr>';
        });
        html += '</tbody></table>';

        return html;
      } catch (error) {
        return 'エラー: ' + error.message;
      }
    };

    // ========================================
    // UI操作関数
    // ========================================

    function convertJSONToCSV() {
      const input = document.getElementById('jsonInput').value;
      const output = jsonToCSV(input);
      document.getElementById('csvOutput').textContent = output;

      console.log('=== JSON → CSV ===');
      console.log('入力:', input);
      console.log('出力:', output);
    }

    function convertCSVToJSON() {
      const input = document.getElementById('csvInput').value;
      const output = csvToJSON(input);
      document.getElementById('jsonOutput').textContent = output;

      console.log('=== CSV → JSON ===');
      console.log('入力:', input);
      console.log('出力:', output);
    }

    function convertToTable() {
      const input = document.getElementById('objectInput').value;
      const output = arrayToHTMLTable(input);
      document.getElementById('tableOutput').innerHTML = output;

      console.log('=== Array → Table ===');
      console.log('入力:', input);
      console.log('出力:', output);
    }

    // デフォルト値を設定
    document.getElementById('jsonInput').value = JSON.stringify([
      { name: '太郎', age: 25, city: '東京' },
      { name: '花子', age: 30, city: '大阪' }
    ], null, 2);

    document.getElementById('csvInput').value =
      'name,age,city\n太郎,25,東京\n花子,30,大阪';

    document.getElementById('objectInput').value = JSON.stringify([
      { 商品名: 'りんご', 価格: 100, 在庫: 50 },
      { 商品名: 'バナナ', 価格: 80, 在庫: 30 }
    ], null, 2);
  </script>
</body>
</html>
```

### JSON→CSV変換の実行フロー

```
jsonToCSV('[{"name":"太郎","age":25},{"name":"花子","age":30}]') の実行：

入力: '[{"name":"太郎","age":25},{"name":"花子","age":30}]'

ステップ1: JSON.parse()でパース
         [
           { name: '太郎', age: 25 },
           { name: '花子', age: 30 }
         ]

ステップ2: ヘッダー行を作成
         Object.keys(array[0])
         → ['name', 'age']
         → 'name,age'

ステップ3: データ行を作成（1行目）
         obj = { name: '太郎', age: 25 }
         headers = ['name', 'age']
         ↓
         obj['name'] = '太郎'
         obj['age'] = 25
         ↓
         ['太郎', 25].join(',')
         → '太郎,25'

ステップ4: データ行を作成（2行目）
         obj = { name: '花子', age: 30 }
         ↓
         ['花子', 30].join(',')
         → '花子,30'

ステップ5: 全行を結合
         'name,age'
         + '\n'
         + '太郎,25'
         + '\n'
         + '花子,30'

結果:
name,age
太郎,25
花子,30
```

---

## 実践例3: 単位変換システム

様々な単位を変換するシステムです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>単位変換システム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 700px;
      margin: 50px auto;
      padding: 20px;
    }
    .converter-section {
      margin: 30px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    h3 {
      margin-top: 0;
      color: #2c3e50;
    }
    .input-group {
      display: flex;
      gap: 10px;
      align-items: center;
      margin: 15px 0;
    }
    input {
      flex: 1;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      padding: 10px 20px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    .result {
      background-color: #27ae60;
      color: white;
      padding: 15px;
      border-radius: 4px;
      font-size: 18px;
      font-weight: bold;
      display: none;
    }
    .result.show {
      display: block;
    }
  </style>
</head>
<body>
  <h1>📐 単位変換システム</h1>

  <div class="converter-section">
    <h3>温度変換</h3>
    <div class="input-group">
      <input type="number" id="celsius" placeholder="摂氏（℃）">
      <button onclick="convertTemperature()">変換</button>
    </div>
    <div class="result" id="tempResult"></div>
  </div>

  <div class="converter-section">
    <h3>長さ変換</h3>
    <div class="input-group">
      <input type="number" id="meters" placeholder="メートル（m）">
      <button onclick="convertLength()">変換</button>
    </div>
    <div class="result" id="lengthResult"></div>
  </div>

  <div class="converter-section">
    <h3>重さ変換</h3>
    <div class="input-group">
      <input type="number" id="kilograms" placeholder="キログラム（kg）">
      <button onclick="convertWeight()">変換</button>
    </div>
    <div class="result" id="weightResult"></div>
  </div>

  <div class="converter-section">
    <h3>通貨変換（参考レート）</h3>
    <div class="input-group">
      <input type="number" id="yen" placeholder="日本円（¥）">
      <button onclick="convertCurrency()">変換</button>
    </div>
    <div class="result" id="currencyResult"></div>
  </div>

  <script>
    // ========================================
    // 変換関数群
    // ========================================

    // 摂氏 → 華氏
    const celsiusToFahrenheit = function(celsius) {
      return (celsius * 9 / 5) + 32;
    };

    // 摂氏 → ケルビン
    const celsiusToKelvin = function(celsius) {
      return celsius + 273.15;
    };

    // メートル → フィート
    const metersToFeet = function(meters) {
      return meters * 3.28084;
    };

    // メートル → インチ
    const metersToInches = function(meters) {
      return meters * 39.3701;
    };

    // キログラム → ポンド
    const kilogramsToPounds = function(kg) {
      return kg * 2.20462;
    };

    // 円 → ドル（参考レート: 1ドル=150円）
    const yenToDollar = function(yen) {
      return yen / 150;
    };

    // 円 → ユーロ（参考レート: 1ユーロ=165円）
    const yenToEuro = function(yen) {
      return yen / 165;
    };

    // 数値を小数点2桁でフォーマット
    const formatNumber = function(num) {
      return num.toFixed(2);
    };

    // ========================================
    // UI操作関数
    // ========================================

    function convertTemperature() {
      const celsius = parseFloat(document.getElementById('celsius').value);

      if (isNaN(celsius)) {
        alert('数値を入力してください');
        return;
      }

      const fahrenheit = celsiusToFahrenheit(celsius);
      const kelvin = celsiusToKelvin(celsius);

      const result = `
        ${celsius}℃ =
        ${formatNumber(fahrenheit)}°F /
        ${formatNumber(kelvin)}K
      `;

      const resultElement = document.getElementById('tempResult');
      resultElement.textContent = result;
      resultElement.classList.add('show');

      console.log('=== 温度変換 ===');
      console.log(`${celsius}℃ → ${fahrenheit}°F`);
      console.log(`${celsius}℃ → ${kelvin}K`);
    }

    function convertLength() {
      const meters = parseFloat(document.getElementById('meters').value);

      if (isNaN(meters)) {
        alert('数値を入力してください');
        return;
      }

      const feet = metersToFeet(meters);
      const inches = metersToInches(meters);

      const result = `
        ${meters}m =
        ${formatNumber(feet)}フィート /
        ${formatNumber(inches)}インチ
      `;

      const resultElement = document.getElementById('lengthResult');
      resultElement.textContent = result;
      resultElement.classList.add('show');

      console.log('=== 長さ変換 ===');
      console.log(`${meters}m → ${feet}フィート`);
      console.log(`${meters}m → ${inches}インチ`);
    }

    function convertWeight() {
      const kg = parseFloat(document.getElementById('kilograms').value);

      if (isNaN(kg)) {
        alert('数値を入力してください');
        return;
      }

      const pounds = kilogramsToPounds(kg);

      const result = `${kg}kg = ${formatNumber(pounds)}ポンド`;

      const resultElement = document.getElementById('weightResult');
      resultElement.textContent = result;
      resultElement.classList.add('show');

      console.log('=== 重さ変換 ===');
      console.log(`${kg}kg → ${pounds}ポンド`);
    }

    function convertCurrency() {
      const yen = parseFloat(document.getElementById('yen').value);

      if (isNaN(yen)) {
        alert('数値を入力してください');
        return;
      }

      const dollar = yenToDollar(yen);
      const euro = yenToEuro(yen);

      const result = `
        ¥${yen.toLocaleString()} =
        $${formatNumber(dollar)} /
        €${formatNumber(euro)}
      `;

      const resultElement = document.getElementById('currencyResult');
      resultElement.textContent = result;
      resultElement.classList.add('show');

      console.log('=== 通貨変換 ===');
      console.log(`¥${yen} → $${dollar}`);
      console.log(`¥${yen} → €${euro}`);
    }
  </script>
</body>
</html>
```

### 温度変換の実行フロー

```
convertTemperature() で celsius = 100 の場合：

入力: celsius = 100

ステップ1: 華氏に変換
         celsiusToFahrenheit(100)
         ↓
         (100 * 9 / 5) + 32
         = (100 * 1.8) + 32
         = 180 + 32
         = 212
         fahrenheit = 212

ステップ2: ケルビンに変換
         celsiusToKelvin(100)
         ↓
         100 + 273.15
         = 373.15
         kelvin = 373.15

ステップ3: フォーマット
         formatNumber(212) → '212.00'
         formatNumber(373.15) → '373.15'

ステップ4: 結果を組み立て
         '100℃ = 212.00°F / 373.15K'

結果表示: 100℃ = 212.00°F / 373.15K
```

---

## 練習問題

### 練習問題1: URLスラッグ変換（基本）

記事のタイトルをURL用のスラッグに変換する関数を作成してください。

**要件**：
- すべて小文字に変換
- 空白をハイフンに変換
- 特殊文字を削除

```javascript
// 関数を作成してください
const titleToSlug = function(title) {
  // ここにコードを書く
};

// テスト
console.log(titleToSlug('Hello World'));
// => 'hello-world'

console.log(titleToSlug('JavaScript Tips & Tricks'));
// => 'javascript-tips-tricks'

console.log(titleToSlug('  Learn   HTML  '));
// => 'learn-html'
```

<details>
<summary>💡 ヒント</summary>

変換手順：
1. 小文字に変換（`toLowerCase()`）
2. 前後の空白を削除（`trim()`）
3. 特殊文字を削除（`replace(/[^a-z0-9\s-]/g, '')`）
4. 空白をハイフンに変換（`replace(/\s+/g, '-')`）

</details>

<details>
<summary>✅ 解答例</summary>

```javascript
const titleToSlug = function(title) {
  return title
    .toLowerCase()              // 小文字に変換
    .trim()                     // 前後の空白を削除
    .replace(/[^a-z0-9\s-]/g, '') // 特殊文字を削除
    .replace(/\s+/g, '-');      // 空白をハイフンに変換
};

// テスト
console.log(titleToSlug('Hello World'));
// => 'hello-world'

console.log(titleToSlug('JavaScript Tips & Tricks'));
// => 'javascript-tips-tricks'

console.log(titleToSlug('  Learn   HTML  '));
// => 'learn-html'

// 実行フロー例: titleToSlug('JavaScript Tips & Tricks')
//
// 入力: 'JavaScript Tips & Tricks'
//
// ステップ1: toLowerCase()
//          'javascript tips & tricks'
//
// ステップ2: trim()
//          'javascript tips & tricks'（変化なし）
//
// ステップ3: replace(/[^a-z0-9\s-]/g, '')
//          '&'を削除
//          'javascript tips  tricks'
//
// ステップ4: replace(/\s+/g, '-')
//          連続する空白をハイフンに
//          'javascript-tips-tricks'
//
// 結果: 'javascript-tips-tricks'
```
</details>

---

### 練習問題2: データオブジェクト変換（応用）

スネークケースのキーをキャメルケースに変換する関数を作成してください。

**要件**：
- オブジェクトのすべてのキーを変換
- ネストしたオブジェクトには対応不要
- 値はそのまま

```javascript
// 関数を作成してください
const keysToHCamelCase = function(obj) {
  // ここにコードを書く
};

// テスト
const input = {
  user_name: '太郎',
  email_address: 'taro@example.com',
  phone_number: '090-1234-5678'
};

console.log(keysToCamelCase(input));
// => {
//      userName: '太郎',
//      emailAddress: 'taro@example.com',
//      phoneNumber: '090-1234-5678'
//    }
```

<details>
<summary>💡 ヒント</summary>

キャメルケース変換の関数：
```javascript
const toCamelCase = function(str) {
  return str.replace(/_([a-z])/g, function(match, letter) {
    return letter.toUpperCase();
  });
};
```

オブジェクトのキーを変換：
```javascript
const newObj = {};
Object.keys(obj).forEach(function(key) {
  const newKey = toCamelCase(key);
  newObj[newKey] = obj[key];
});
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
const keysToCamelCase = function(obj) {
  // スネークケース → キャメルケース変換
  const toCamelCase = function(str) {
    return str.replace(/_([a-z])/g, function(match, letter) {
      return letter.toUpperCase();
    });
  };

  const newObj = {};

  Object.keys(obj).forEach(function(key) {
    const camelKey = toCamelCase(key);
    newObj[camelKey] = obj[key];
  });

  return newObj;
};

// テスト
const input = {
  user_name: '太郎',
  email_address: 'taro@example.com',
  phone_number: '090-1234-5678'
};

const output = keysToCamelCase(input);
console.log(output);
// => {
//      userName: '太郎',
//      emailAddress: 'taro@example.com',
//      phoneNumber: '090-1234-5678'
//    }

// 実行フロー例: keysToCamelCase(input)
//
// 入力: { user_name: '太郎', email_address: 'taro@example.com', ... }
//
// ステップ1: Object.keys()でキーを取得
//          ['user_name', 'email_address', 'phone_number']
//
// ステップ2: forEach()で各キーを処理
//
//   処理1: key = 'user_name'
//          toCamelCase('user_name')
//          ↓ replace(/_([a-z])/g, ...)
//          '_n'をマッチ → 'N'に変換
//          ↓
//          'userName'
//          newObj['userName'] = '太郎'
//
//   処理2: key = 'email_address'
//          toCamelCase('email_address')
//          ↓
//          '_a'をマッチ → 'A'に変換
//          ↓
//          'emailAddress'
//          newObj['emailAddress'] = 'taro@example.com'
//
//   処理3: key = 'phone_number'
//          toCamelCase('phone_number')
//          ↓
//          '_n'をマッチ → 'N'に変換
//          ↓
//          'phoneNumber'
//          newObj['phoneNumber'] = '090-1234-5678'
//
// 結果: {
//   userName: '太郎',
//   emailAddress: 'taro@example.com',
//   phoneNumber: '090-1234-5678'
// }
```
</details>

---

### 練習問題3: マルチフォーマット変換システム（発展）

配列のデータを複数のフォーマットに変換できるシステムを作成してください。

**要件**：
1. 配列 → CSV文字列
2. 配列 → HTMLテーブル
3. 配列 → テキストリスト

```javascript
// 関数を作成してください
const DataConverter = {
  toCSV: function(array) {
    // ここにコードを書く
  },

  toHTMLTable: function(array) {
    // ここにコードを書く
  },

  toTextList: function(array) {
    // ここにコードを書く
  }
};

// テスト
const students = [
  { name: '太郎', score: 85 },
  { name: '花子', score: 92 }
];

console.log(DataConverter.toCSV(students));
// => 'name,score\n太郎,85\n花子,92'

console.log(DataConverter.toHTMLTable(students));
// => '<table>...</table>'

console.log(DataConverter.toTextList(students));
// => '- 太郎: 85点\n- 花子: 92点'
```

<details>
<summary>💡 ヒント</summary>

**toCSV**:
```javascript
const headers = Object.keys(array[0]);
const rows = array.map(obj => headers.map(h => obj[h]).join(','));
return headers.join(',') + '\n' + rows.join('\n');
```

**toHTMLTable**:
```javascript
let html = '<table>';
// ヘッダー行
html += '<tr>' + headers.map(h => '<th>' + h + '</th>').join('') + '</tr>';
// データ行
array.forEach(obj => {
  html += '<tr>' + headers.map(h => '<td>' + obj[h] + '</td>').join('') + '</tr>';
});
html += '</table>';
```

**toTextList**:
```javascript
return array.map(obj => '- ' + obj.name + ': ' + obj.score + '点').join('\n');
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
const DataConverter = {
  // 配列 → CSV
  toCSV: function(array) {
    if (array.length === 0) return '';

    const headers = Object.keys(array[0]);
    const headerRow = headers.join(',');

    const dataRows = array.map(function(obj) {
      return headers.map(function(key) {
        return obj[key];
      }).join(',');
    });

    return headerRow + '\n' + dataRows.join('\n');
  },

  // 配列 → HTMLテーブル
  toHTMLTable: function(array) {
    if (array.length === 0) return '<table></table>';

    const headers = Object.keys(array[0]);

    let html = '<table border="1">';

    // ヘッダー行
    html += '<thead><tr>';
    headers.forEach(function(header) {
      html += '<th>' + header + '</th>';
    });
    html += '</tr></thead>';

    // データ行
    html += '<tbody>';
    array.forEach(function(obj) {
      html += '<tr>';
      headers.forEach(function(key) {
        html += '<td>' + obj[key] + '</td>';
      });
      html += '</tr>';
    });
    html += '</tbody></table>';

    return html;
  },

  // 配列 → テキストリスト
  toTextList: function(array) {
    return array.map(function(obj) {
      return '- ' + obj.name + ': ' + obj.score + '点';
    }).join('\n');
  }
};

// テスト
const students = [
  { name: '太郎', score: 85 },
  { name: '花子', score: 92 },
  { name: '一郎', score: 78 }
];

console.log('=== CSV形式 ===');
console.log(DataConverter.toCSV(students));

console.log('\n=== HTMLテーブル形式 ===');
console.log(DataConverter.toHTMLTable(students));

console.log('\n=== テキストリスト形式 ===');
console.log(DataConverter.toTextList(students));

// 実行フロー例: DataConverter.toCSV(students)
//
// 入力: [{ name: '太郎', score: 85 }, { name: '花子', score: 92 }]
//
// ステップ1: ヘッダーを取得
//          Object.keys(array[0])
//          → ['name', 'score']
//
// ステップ2: ヘッダー行を作成
//          ['name', 'score'].join(',')
//          → 'name,score'
//
// ステップ3: データ行を作成（1行目）
//          obj = { name: '太郎', score: 85 }
//          headers.map(key => obj[key])
//          → ['太郎', 85]
//          → '太郎,85'
//
// ステップ4: データ行を作成（2行目）
//          obj = { name: '花子', score: 92 }
//          → ['花子', 92]
//          → '花子,92'
//
// ステップ5: すべてを結合
//          'name,score'
//          + '\n'
//          + '太郎,85'
//          + '\n'
//          + '花子,92'
//
// 結果:
// name,score
// 太郎,85
// 花子,92
```
</details>

---

## まとめ

このレッスンで学んだこと：

### 1. 変換関数の概念
- あるデータ形式を別の形式に変換
- 元のデータは変更しない
- 予測可能な動作

### 2. フォーマット変更
- 文字列の大文字小文字変換
- 数値の通貨・パーセント形式化
- 日付の表示形式変換

### 3. 正規化
- 電話番号の正規化（ハイフン削除）
- 名前の正規化（空白整理、大文字化）
- データの統一形式化

### 4. データ変換パターン
- JSON ⇄ CSV
- オブジェクト → HTMLテーブル
- スネークケース → キャメルケース
- 単位変換（温度、長さ、重さ、通貨）

### 5. マッピング
- 配列の各要素を変換（`map`）
- オブジェクトのキーを変換
- データ構造の変換

**変換関数の流れ**：
```
入力データ
  ↓
変換ルール適用
  ↓
新しいデータを返す
  ↓
元のデータは変更されない
```

---

## カリキュラム要求事項の確認

レッスン130の要求事項：

- ✅ **データの変換**: あるデータ形式を別の形式に変換する関数
- ✅ **フォーマット変更**: 文字列、数値、日付のフォーマット変換
- ✅ **正規化**: データを統一された形式に整える処理
- ✅ **知識**: データ変換、マッピング、フォーマット処理
- ✅ **成果物**: コンバーター（ユーザーデータ変換、フォーマット変換、単位変換システム）

すべての要求事項を満たしています！

---

## 次のステップ

次のレッスンでは、**関数の組み合わせ**（パイプライン、処理の連鎖）について学びます。

**予告**：
- 関数のパイプライン処理
- 処理の連鎖（チェーン）
- 関数合成
- 関数型プログラミングの基礎

**なぜ重要か**：
変換関数を作れるようになったら、次は複数の変換関数を組み合わせて複雑な処理を作る技術が必要です。関数の組み合わせは、読みやすく保守しやすいコードを書くための重要なスキルです！
