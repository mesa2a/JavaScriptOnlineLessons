# レッスン142：JSONの基礎

**日付**: 2025-11-26

## 学習目標
このレッスンでは、JSON（JavaScript Object Notation）について学びます。データを保存したり送受信したりするための標準的な形式を理解し、実際に使えるようになります。

---

## JSONとは？

### 日常生活の例：「荷物の送り状」

JSONを理解するために、荷物の送り状を考えてみましょう：

```
荷物をそのまま送る（オブジェクト）：
┌─────────────────┐
│  複雑な荷物     │
│  ・電子機器     │ ← そのままでは送れない
│  ・書類         │
│  ・形が複雑     │
└─────────────────┘

送り状（JSON文字列）に変換：
┌─────────────────────────────┐
│ 送り状（テキスト形式）       │
│ 品名: 電子機器              │
│ 数量: 1                     │ ← テキストなので送りやすい
│ 重量: 2kg                   │
│ 宛先: 東京都                │
└─────────────────────────────┘

配送 → 相手が送り状を見て中身を理解
```

**JSONの役割:**
- オブジェクト → 文字列（送り状を書く）: `JSON.stringify()`
- 文字列 → オブジェクト（送り状を読む）: `JSON.parse()`

---

## 1. JSON形式を理解する

### JSON（JavaScript Object Notation）とは？

JSONは、データを保存したり送受信したりするための**軽量なテキスト形式**です。JavaScriptのオブジェクト記法に似ていますが、より厳格なルールがあります。

```javascript
// JavaScriptのオブジェクト
let person = {
  name: "田中",      // プロパティ名に引用符なし
  age: 25,
  city: '東京'       // シングルクォートOK
};

// JSON形式（文字列）
let jsonString = '{
  "name": "田中",    // プロパティ名は必ず二重引用符
  "age": 25,
  "city": "東京"     // 文字列も必ず二重引用符
}';
```

### JSON形式の厳格なルール

```json
{
  "name": "田中太郎",
  "age": 25,
  "city": "東京",
  "hobbies": ["読書", "映画", "旅行"]
}
```

**JSONの重要なルール:**
1. ✅ プロパティ名は**必ず二重引用符**で囲む
2. ✅ 文字列も**必ず二重引用符**（シングルクォートは不可）
3. ✅ 末尾にカンマを付けない
4. ✅ 関数、`undefined`、シンボルは含められない
5. ✅ コメントは書けない

### JavaScriptオブジェクトとJSONの比較

```javascript
// JavaScriptオブジェクト
let jsObject = {
  name: '田中',        // シングルクォートOK
  age: 25,
  greet: function() {  // 関数OK
    console.log("こんにちは");
  }
};

// JSON文字列
let jsonString = `{
  "name": "田中",      // 二重引用符必須
  "age": 25            // 関数は含められない
}`;
```

---

## 2. JSON.stringify() - オブジェクトを文字列に変換

### JSON.stringify()とは？

`JSON.stringify()` は、JavaScriptのオブジェクトをJSON形式の**文字列**に変換します。この処理を**シリアライズ**（直列化）と呼びます。

```javascript
let person = {
  name: "佐藤",
  age: 30,
  city: "大阪"
};

let jsonString = JSON.stringify(person);
console.log(jsonString);
// '{"name":"佐藤","age":30,"city":"大阪"}'

console.log(typeof jsonString);
// "string" ← 文字列に変換された！
```

**実行の流れ:**

```
ステップ1: オブジェクト
person = {
  name: "佐藤",
  age: 30,
  city: "大阪"
}
        ↓
        JSON.stringify(person)
        ↓
ステップ2: JSON文字列
'{"name":"佐藤","age":30,"city":"大阪"}'

特徴:
- プロパティ名が二重引用符で囲まれる
- 全体が1つの文字列になる
- データ型: string
```

### 配列の変換

配列もJSON文字列に変換できます：

```javascript
let numbers = [1, 2, 3, 4, 5];
let jsonArray = JSON.stringify(numbers);

console.log(jsonArray);
// '[1,2,3,4,5]'

console.log(typeof jsonArray);
// "string"
```

**実行の流れ:**

```
配列:
[1, 2, 3, 4, 5]
        ↓
        JSON.stringify(numbers)
        ↓
JSON文字列:
'[1,2,3,4,5]'
```

### ネストされたオブジェクトの変換

複雑な構造のオブジェクトも変換できます：

```javascript
let user = {
  name: "山田",
  profile: {
    age: 28,
    city: "東京"
  },
  hobbies: ["読書", "音楽"]
};

let json = JSON.stringify(user);
console.log(json);
// '{"name":"山田","profile":{"age":28,"city":"東京"},"hobbies":["読書","音楽"]}'
```

**実行の流れ:**

```
ネストされたオブジェクト:
user = {
  name: "山田",
  profile: {           ← オブジェクト内のオブジェクト
    age: 28,
    city: "東京"
  },
  hobbies: ["読書", "音楽"]  ← 配列
}
        ↓
        JSON.stringify(user)
        ↓
すべてがフラットな文字列に:
'{"name":"山田","profile":{"age":28,"city":"東京"},"hobbies":["読書","音楽"]}'

ネスト構造もそのまま保持される！
```

### JSON.stringify()の第3引数（インデント）

見やすい形式で出力することもできます：

```javascript
let data = {
  name: "田中",
  age: 25,
  hobbies: ["読書", "映画"]
};

// 第3引数にスペースの数を指定
let prettyJson = JSON.stringify(data, null, 2);
console.log(prettyJson);
```

**出力結果:**

```json
{
  "name": "田中",
  "age": 25,
  "hobbies": [
    "読書",
    "映画"
  ]
}
```

**パラメータの説明:**
- **第1引数**: 変換するオブジェクト
- **第2引数**: フィルター関数（通常は `null`）
- **第3引数**: インデントのスペース数（2または4が一般的）

---

## 3. JSON.parse() - 文字列をオブジェクトに変換

### JSON.parse()とは？

`JSON.parse()` は、JSON形式の文字列をJavaScriptの**オブジェクト**に変換します。この処理を**デシリアライズ**（非直列化）と呼びます。

```javascript
let jsonString = '{"name":"鈴木","age":35,"city":"名古屋"}';
let person = JSON.parse(jsonString);

console.log(person.name);     // "鈴木"
console.log(person.age);      // 35
console.log(typeof person);   // "object"
```

**実行の流れ:**

```
ステップ1: JSON文字列
'{"name":"鈴木","age":35,"city":"名古屋"}'
        ↓
        JSON.parse(jsonString)
        ↓
ステップ2: JavaScriptオブジェクト
person = {
  name: "鈴木",
  age: 35,
  city: "名古屋"
}

特徴:
- 文字列 → オブジェクトに変換
- プロパティにアクセス可能: person.name
- データ型: object
```

### 配列の変換

JSON形式の配列も復元できます：

```javascript
let jsonArray = '[10,20,30,40,50]';
let numbers = JSON.parse(jsonArray);

console.log(numbers[0]);      // 10
console.log(numbers.length);  // 5
console.log(Array.isArray(numbers));  // true
```

**実行の流れ:**

```
JSON文字列:
'[10,20,30,40,50]'
        ↓
        JSON.parse(jsonArray)
        ↓
JavaScript配列:
[10, 20, 30, 40, 50]
```

### 変換の往復（ラウンドトリップ）

オブジェクト → 文字列 → オブジェクトの変換を確認：

```javascript
// オリジナルのオブジェクト
let original = {
  title: "JavaScript入門",
  price: 2800,
  available: true
};

// ステップ1: 文字列に変換
let jsonString = JSON.stringify(original);
console.log(jsonString);
// '{"title":"JavaScript入門","price":2800,"available":true}'
console.log(typeof jsonString);  // "string"

// ステップ2: オブジェクトに戻す
let restored = JSON.parse(jsonString);
console.log(restored.title);     // "JavaScript入門"
console.log(restored.price);     // 2800
console.log(typeof restored);    // "object"
```

**図解:**

```
オリジナルのオブジェクト
┌─────────────────────────┐
│ title: "JavaScript入門"  │
│ price: 2800             │
│ available: true         │
└─────────────────────────┘
         ↓
    JSON.stringify()
         ↓
JSON文字列
'{"title":"JavaScript入門","price":2800,"available":true}'
         ↓
     JSON.parse()
         ↓
復元されたオブジェクト
┌─────────────────────────┐
│ title: "JavaScript入門"  │
│ price: 2800             │
│ available: true         │
└─────────────────────────┘
```

---

## 4. localStorageでデータを保存

### localStorageとは？

**localStorage**は、ブラウザにデータを永続的に保存できる仕組みです。ページを閉じても、ブラウザを再起動してもデータが残ります。

```
localStorage の仕組み:
┌─────────────────────────────┐
│  ブラウザの保存領域          │
│  ┌───────────────────────┐  │
│  │ キー    │  値（文字列）│  │
│  ├───────────────────────┤  │
│  │ "name"  │  "田中"     │  │
│  │ "age"   │  "25"       │  │
│  │ "data"  │  "{...}"    │  │ ← JSON文字列を保存
│  └───────────────────────┘  │
└─────────────────────────────┘

重要: localStorageは文字列しか保存できない！
→ オブジェクトはJSON文字列に変換してから保存
```

### データの保存（setItem）

```javascript
let settings = {
  theme: "dark",
  fontSize: 16,
  language: "ja"
};

// ステップ1: オブジェクトをJSON文字列に変換
let jsonString = JSON.stringify(settings);
console.log(jsonString);
// '{"theme":"dark","fontSize":16,"language":"ja"}'

// ステップ2: localStorageに保存
localStorage.setItem("userSettings", jsonString);
console.log("設定を保存しました");
```

**実行の流れ:**

```
ステップ1: オブジェクト
settings = {
  theme: "dark",
  fontSize: 16,
  language: "ja"
}
        ↓
        JSON.stringify(settings)
        ↓
ステップ2: JSON文字列
'{"theme":"dark","fontSize":16,"language":"ja"}'
        ↓
        localStorage.setItem("userSettings", jsonString)
        ↓
ステップ3: ブラウザに保存
localStorage
┌────────────────┬──────────────────────────────────────────┐
│ userSettings   │ '{"theme":"dark","fontSize":16,...}'    │
└────────────────┴──────────────────────────────────────────┘
```

### データの読み込み（getItem）

```javascript
// ステップ1: localStorageから文字列を取得
let jsonString = localStorage.getItem("userSettings");
console.log(jsonString);
// '{"theme":"dark","fontSize":16,"language":"ja"}'

// ステップ2: JSON文字列をオブジェクトに変換
let settings = JSON.parse(jsonString);
console.log(settings.theme);     // "dark"
console.log(settings.fontSize);  // 16
console.log(settings.language);  // "ja"
```

**実行の流れ:**

```
ステップ1: ブラウザから読み込み
localStorage
┌────────────────┬──────────────────────────────────────────┐
│ userSettings   │ '{"theme":"dark","fontSize":16,...}'    │
└────────────────┴──────────────────────────────────────────┘
        ↓
        localStorage.getItem("userSettings")
        ↓
ステップ2: JSON文字列を取得
'{"theme":"dark","fontSize":16,"language":"ja"}'
        ↓
        JSON.parse(jsonString)
        ↓
ステップ3: オブジェクトに変換
settings = {
  theme: "dark",
  fontSize: 16,
  language: "ja"
}
```

### データの削除（removeItem）

```javascript
// 特定のデータを削除
localStorage.removeItem("userSettings");

// すべてのデータを削除
localStorage.clear();
```

### 実用例：設定の保存と読み込み

```javascript
// 設定を保存する関数
function saveSettings(settings) {
  let json = JSON.stringify(settings);
  localStorage.setItem("appSettings", json);
  console.log("設定を保存しました");
}

// 設定を読み込む関数
function loadSettings() {
  let json = localStorage.getItem("appSettings");

  if (json) {
    // データがあればオブジェクトに変換して返す
    return JSON.parse(json);
  } else {
    // データがなければデフォルト設定を返す
    return {
      volume: 50,
      notifications: true,
      autoSave: true
    };
  }
}

// 使用例
let mySettings = {
  volume: 70,
  notifications: false,
  autoSave: true
};

saveSettings(mySettings);

// ページを再読み込みしても設定が残る
let loadedSettings = loadSettings();
console.log(loadedSettings.volume);  // 70
```

**データの流れ:**

```
保存:
mySettings → JSON.stringify() → localStorage
{ volume: 70, ... } → '{"volume":70,...}' → 保存

読み込み:
localStorage → getItem() → JSON.parse() → loadedSettings
保存 → '{"volume":70,...}' → { volume: 70, ... }
```

---

## 5. JSONで扱えないデータ

### 変換できないもの

以下のものはJSONに変換できません：

```javascript
let obj = {
  name: "田中",
  greet: function() {          // ❌ 関数は変換されない
    console.log("こんにちは");
  },
  value: undefined,            // ❌ undefinedは変換されない
  symbol: Symbol("test"),      // ❌ シンボルは変換されない
  date: new Date()             // ⚠️ Dateは文字列になる
};

let json = JSON.stringify(obj);
console.log(json);
// '{"name":"田中","date":"2024-01-01T00:00:00.000Z"}'
// greet, value, symbolは含まれない！
```

**図解:**

```
変換前のオブジェクト:
{
  name: "田中",           ✅ 変換される
  greet: function() {},   ❌ 削除される
  value: undefined,       ❌ 削除される
  symbol: Symbol("test"), ❌ 削除される
  date: new Date()        ⚠️ 文字列に変換される
}
        ↓
        JSON.stringify(obj)
        ↓
変換後のJSON文字列:
'{"name":"田中","date":"2024-01-01T00:00:00.000Z"}'
```

### エラー処理

JSON.parse()で不正な文字列を解析するとエラーになります：

```javascript
// 不正なJSON文字列
let invalidJson = "これは不正なJSON";

try {
  let obj = JSON.parse(invalidJson);
} catch (error) {
  console.log("JSONの解析に失敗しました");
  console.log(error.message);
}
```

**安全な読み込みパターン:**

```javascript
function safeLoadData(key) {
  try {
    let json = localStorage.getItem(key);
    if (json) {
      return JSON.parse(json);
    }
    return null;
  } catch (error) {
    console.error("データの読み込みに失敗:", error);
    return null;
  }
}
```

---

## 実践アプリケーション

### アプリ1: JSON変換デモシステム

JSON.stringify()とJSON.parse()の動作を視覚的に確認します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JSON変換デモ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1000px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
    }
    .conversion-area {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 20px;
      margin: 30px 0;
      align-items: center;
    }
    .box {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      min-height: 200px;
    }
    .box h3 {
      color: #667eea;
      margin-top: 0;
      border-bottom: 2px solid #667eea;
      padding-bottom: 10px;
    }
    .arrow {
      font-size: 40px;
      color: #667eea;
      text-align: center;
    }
    textarea {
      width: 100%;
      min-height: 150px;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      resize: vertical;
      box-sizing: border-box;
    }
    button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      margin: 5px;
      transition: transform 0.2s;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    .output {
      background: #2d3436;
      color: #dfe6e9;
      padding: 15px;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
      white-space: pre-wrap;
      margin-top: 15px;
      min-height: 100px;
    }
    .sample-buttons {
      margin: 20px 0;
      text-align: center;
    }
    .info-box {
      background: #fff3cd;
      padding: 15px;
      border-radius: 8px;
      border-left: 5px solid #ffc107;
      margin: 20px 0;
    }
    .type-badge {
      display: inline-block;
      padding: 5px 15px;
      border-radius: 15px;
      font-size: 12px;
      font-weight: bold;
      margin: 5px;
    }
    .type-object {
      background: #74b9ff;
      color: white;
    }
    .type-string {
      background: #55efc4;
      color: #2d3436;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔄 JSON変換デモシステム</h1>

    <div class="sample-buttons">
      <h3>サンプルデータ:</h3>
      <button onclick="loadSample1()">📝 シンプルなオブジェクト</button>
      <button onclick="loadSample2()">👤 ユーザー情報</button>
      <button onclick="loadSample3()">📚 配列データ</button>
      <button onclick="loadSample4()">🏢 ネストされたデータ</button>
    </div>

    <div class="conversion-area">
      <div class="box">
        <h3>JavaScriptオブジェクト</h3>
        <span class="type-badge type-object">型: object</span>
        <textarea id="objectInput" placeholder="オブジェクトを入力してください"></textarea>
        <button onclick="convertToJson()">→ JSON文字列に変換</button>
      </div>

      <div class="arrow">⇄</div>

      <div class="box">
        <h3>JSON文字列</h3>
        <span class="type-badge type-string">型: string</span>
        <textarea id="jsonInput" placeholder="JSON文字列を入力してください"></textarea>
        <button onclick="convertToObject()">← オブジェクトに変換</button>
      </div>
    </div>

    <div class="info-box">
      <h3>📊 変換結果の詳細:</h3>
      <div id="detailsOutput" class="output">ここに変換の詳細が表示されます</div>
    </div>
  </div>

  <script>
    // サンプル1: シンプルなオブジェクト
    function loadSample1() {
      let obj = {
        name: "田中",
        age: 25,
        city: "東京"
      };
      document.getElementById('objectInput').value = JSON.stringify(obj, null, 2);
    }

    // サンプル2: ユーザー情報
    function loadSample2() {
      let obj = {
        username: "taro123",
        email: "taro@example.com",
        age: 28,
        premium: true
      };
      document.getElementById('objectInput').value = JSON.stringify(obj, null, 2);
    }

    // サンプル3: 配列データ
    function loadSample3() {
      let arr = [
        { id: 1, name: "商品A", price: 1000 },
        { id: 2, name: "商品B", price: 2000 },
        { id: 3, name: "商品C", price: 3000 }
      ];
      document.getElementById('objectInput').value = JSON.stringify(arr, null, 2);
    }

    // サンプル4: ネストされたデータ
    function loadSample4() {
      let obj = {
        user: {
          name: "山田太郎",
          profile: {
            age: 30,
            city: "大阪",
            hobbies: ["読書", "映画", "旅行"]
          }
        },
        loginCount: 42
      };
      document.getElementById('objectInput').value = JSON.stringify(obj, null, 2);
    }

    // オブジェクト → JSON文字列
    function convertToJson() {
      let input = document.getElementById('objectInput').value;
      let details = "";

      try {
        // 入力されたテキストをオブジェクトとして評価
        let obj = JSON.parse(input);

        // JSON文字列に変換
        let jsonString = JSON.stringify(obj);
        let prettyJson = JSON.stringify(obj, null, 2);

        // 結果を表示
        document.getElementById('jsonInput').value = prettyJson;

        // 詳細情報
        details += "✅ 変換成功!\n\n";
        details += "--- 元のオブジェクト ---\n";
        details += input + "\n\n";
        details += "--- 変換後のJSON文字列（コンパクト版） ---\n";
        details += jsonString + "\n\n";
        details += "--- データ型 ---\n";
        details += "変換前: " + typeof obj + "\n";
        details += "変換後: " + typeof jsonString + "\n\n";
        details += "--- 文字列の長さ ---\n";
        details += jsonString.length + " 文字\n\n";
        details += "--- プロパティ数 ---\n";
        if (Array.isArray(obj)) {
          details += "配列の要素数: " + obj.length;
        } else {
          details += "オブジェクトのプロパティ数: " + Object.keys(obj).length;
        }

      } catch (error) {
        details = "❌ エラー: " + error.message + "\n\n";
        details += "正しいJSON形式で入力してください。";
      }

      document.getElementById('detailsOutput').textContent = details;
    }

    // JSON文字列 → オブジェクト
    function convertToObject() {
      let input = document.getElementById('jsonInput').value;
      let details = "";

      try {
        // JSON文字列をオブジェクトに変換
        let obj = JSON.parse(input);
        let prettyObject = JSON.stringify(obj, null, 2);

        // 結果を表示
        document.getElementById('objectInput').value = prettyObject;

        // 詳細情報
        details += "✅ 変換成功!\n\n";
        details += "--- 元のJSON文字列 ---\n";
        details += input + "\n\n";
        details += "--- 変換後のオブジェクト ---\n";
        details += prettyObject + "\n\n";
        details += "--- データ型 ---\n";
        details += "変換前: " + typeof input + "\n";
        details += "変換後: " + typeof obj + "\n\n";
        details += "--- アクセス可能なプロパティ ---\n";
        if (Array.isArray(obj)) {
          details += "これは配列です。要素数: " + obj.length + "\n";
          details += "最初の要素: " + JSON.stringify(obj[0]);
        } else {
          let keys = Object.keys(obj);
          details += "プロパティ一覧: " + keys.join(", ") + "\n\n";
          keys.forEach(key => {
            details += key + ": " + JSON.stringify(obj[key]) + "\n";
          });
        }

      } catch (error) {
        details = "❌ エラー: " + error.message + "\n\n";
        details += "正しいJSON形式で入力してください。\n\n";
        details += "よくあるエラー:\n";
        details += "- プロパティ名に二重引用符がない\n";
        details += "- 文字列にシングルクォートを使用\n";
        details += "- 末尾にカンマがある";
      }

      document.getElementById('detailsOutput').textContent = details;
    }

    // 初期サンプルを読み込み
    loadSample1();
  </script>
</body>
</html>
```

---

### アプリ2: ユーザー設定保存システム

localStorageを使って、ユーザー設定を保存・読み込みします。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>設定保存システム</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
    }
    .settings-panel {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 10px;
      margin: 20px 0;
    }
    .setting-item {
      margin: 20px 0;
      padding: 15px;
      background: white;
      border-radius: 8px;
    }
    label {
      display: block;
      font-weight: bold;
      color: #555;
      margin-bottom: 8px;
    }
    input[type="text"],
    input[type="number"],
    select {
      width: 100%;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 14px;
      box-sizing: border-box;
    }
    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    button {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      margin: 10px 5px;
      transition: transform 0.2s;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(240, 147, 251, 0.4);
    }
    .button-group {
      text-align: center;
      margin: 30px 0;
    }
    .status {
      background: #d4edda;
      color: #155724;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      text-align: center;
      display: none;
    }
    .status.error {
      background: #f8d7da;
      color: #721c24;
    }
    .json-display {
      background: #2d3436;
      color: #dfe6e9;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      font-family: 'Courier New', monospace;
      white-space: pre-wrap;
      overflow-x: auto;
    }
    h3 {
      color: #f5576c;
      border-bottom: 2px solid #f093fb;
      padding-bottom: 10px;
    }
    .info-badge {
      background: #74b9ff;
      color: white;
      padding: 5px 15px;
      border-radius: 15px;
      font-size: 12px;
      margin-left: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>💾 ユーザー設定保存システム</h1>

    <div id="status" class="status"></div>

    <div class="settings-panel">
      <h3>⚙️ ユーザー設定 <span class="info-badge">localStorageに保存されます</span></h3>

      <div class="setting-item">
        <label>ユーザー名:</label>
        <input type="text" id="username" placeholder="例: taro123">
      </div>

      <div class="setting-item">
        <label>メールアドレス:</label>
        <input type="text" id="email" placeholder="例: taro@example.com">
      </div>

      <div class="setting-item">
        <label>テーマ:</label>
        <select id="theme">
          <option value="light">ライト</option>
          <option value="dark">ダーク</option>
          <option value="auto">自動</option>
        </select>
      </div>

      <div class="setting-item">
        <label>フォントサイズ:</label>
        <input type="number" id="fontSize" min="10" max="24" value="14">
      </div>

      <div class="setting-item">
        <label>
          <input type="checkbox" id="notifications">
          通知を有効にする
        </label>
      </div>

      <div class="setting-item">
        <label>
          <input type="checkbox" id="autoSave">
          自動保存を有効にする
        </label>
      </div>
    </div>

    <div class="button-group">
      <button onclick="saveSettings()">💾 設定を保存</button>
      <button onclick="loadSettings()">📂 設定を読み込み</button>
      <button onclick="clearSettings()">🗑️ 設定をクリア</button>
      <button onclick="showJson()">📄 JSONを表示</button>
    </div>

    <div id="jsonDisplay" class="json-display" style="display: none;"></div>
  </div>

  <script>
    // ページ読み込み時に設定を読み込み
    window.addEventListener('load', function() {
      loadSettings();
    });

    // 設定を保存
    function saveSettings() {
      // 入力値を取得
      let settings = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        theme: document.getElementById('theme').value,
        fontSize: parseInt(document.getElementById('fontSize').value),
        notifications: document.getElementById('notifications').checked,
        autoSave: document.getElementById('autoSave').checked,
        savedAt: new Date().toLocaleString('ja-JP')
      };

      // JSON文字列に変換
      let jsonString = JSON.stringify(settings);

      // localStorageに保存
      localStorage.setItem('userSettings', jsonString);

      // ステータス表示
      showStatus('✅ 設定を保存しました！');

      console.log('保存したJSON:', jsonString);
    }

    // 設定を読み込み
    function loadSettings() {
      // localStorageから読み込み
      let jsonString = localStorage.getItem('userSettings');

      if (jsonString) {
        try {
          // JSON文字列をオブジェクトに変換
          let settings = JSON.parse(jsonString);

          // フォームに値を設定
          document.getElementById('username').value = settings.username || '';
          document.getElementById('email').value = settings.email || '';
          document.getElementById('theme').value = settings.theme || 'light';
          document.getElementById('fontSize').value = settings.fontSize || 14;
          document.getElementById('notifications').checked = settings.notifications || false;
          document.getElementById('autoSave').checked = settings.autoSave || false;

          // ステータス表示
          if (settings.savedAt) {
            showStatus('📂 設定を読み込みました（保存日時: ' + settings.savedAt + '）');
          } else {
            showStatus('📂 設定を読み込みました');
          }

          console.log('読み込んだ設定:', settings);
        } catch (error) {
          showStatus('❌ 設定の読み込みに失敗しました', true);
          console.error('エラー:', error);
        }
      } else {
        showStatus('ℹ️ 保存された設定がありません');
      }
    }

    // 設定をクリア
    function clearSettings() {
      if (confirm('本当に設定をクリアしますか？')) {
        localStorage.removeItem('userSettings');

        // フォームをリセット
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('theme').value = 'light';
        document.getElementById('fontSize').value = '14';
        document.getElementById('notifications').checked = false;
        document.getElementById('autoSave').checked = false;

        showStatus('🗑️ 設定をクリアしました');
      }
    }

    // JSONを表示
    function showJson() {
      let jsonString = localStorage.getItem('userSettings');
      let display = document.getElementById('jsonDisplay');

      if (jsonString) {
        // 見やすく整形
        let obj = JSON.parse(jsonString);
        let prettyJson = JSON.stringify(obj, null, 2);

        let output = "--- localStorageに保存されているJSON文字列 ---\n\n";
        output += "キー: 'userSettings'\n\n";
        output += "値（整形版）:\n";
        output += prettyJson + "\n\n";
        output += "--- 実際に保存されている文字列（コンパクト版） ---\n";
        output += jsonString + "\n\n";
        output += "--- 詳細情報 ---\n";
        output += "文字列の長さ: " + jsonString.length + " 文字\n";
        output += "データ型: " + typeof jsonString;

        display.textContent = output;
        display.style.display = 'block';
      } else {
        display.textContent = "保存されたデータがありません";
        display.style.display = 'block';
      }
    }

    // ステータスメッセージを表示
    function showStatus(message, isError = false) {
      let status = document.getElementById('status');
      status.textContent = message;
      status.className = isError ? 'status error' : 'status';
      status.style.display = 'block';

      setTimeout(() => {
        status.style.display = 'none';
      }, 3000);
    }
  </script>
</body>
</html>
```

---

### アプリ3: ToDoリスト（永続化対応）

localStorageを使って、ToDoリストを保存します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ToDoリスト（永続化）</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 700px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
    }
    .input-area {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
    }
    input[type="text"] {
      flex: 1;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
    }
    button {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
      border: none;
      padding: 12px 25px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      transition: transform 0.2s;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(79, 172, 254, 0.4);
    }
    .todo-list {
      list-style: none;
      padding: 0;
    }
    .todo-item {
      background: #f8f9fa;
      padding: 15px;
      margin: 10px 0;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.3s;
    }
    .todo-item:hover {
      background: #e9ecef;
    }
    .todo-item.completed {
      opacity: 0.6;
    }
    .todo-item.completed .todo-text {
      text-decoration: line-through;
      color: #999;
    }
    .todo-text {
      flex: 1;
      font-size: 16px;
    }
    .todo-actions {
      display: flex;
      gap: 10px;
    }
    .btn-small {
      padding: 8px 15px;
      font-size: 14px;
    }
    .btn-complete {
      background: #28a745;
    }
    .btn-delete {
      background: #dc3545;
    }
    .storage-info {
      background: #fff3cd;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      text-align: center;
      border-left: 5px solid #ffc107;
    }
    .json-preview {
      background: #2d3436;
      color: #dfe6e9;
      padding: 15px;
      border-radius: 8px;
      margin-top: 20px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      white-space: pre-wrap;
      overflow-x: auto;
      max-height: 300px;
    }
    .stats {
      display: flex;
      justify-content: space-around;
      margin: 20px 0;
      padding: 15px;
      background: #e3f2fd;
      border-radius: 8px;
    }
    .stat-item {
      text-align: center;
    }
    .stat-number {
      font-size: 24px;
      font-weight: bold;
      color: #4facfe;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📝 ToDoリスト（永続化対応）</h1>

    <div class="storage-info">
      💾 このToDoリストはlocalStorageに自動保存されます（ブラウザを閉じてもデータが残ります）
    </div>

    <div class="stats">
      <div class="stat-item">
        <div class="stat-number" id="totalCount">0</div>
        <div>全タスク</div>
      </div>
      <div class="stat-item">
        <div class="stat-number" id="activeCount">0</div>
        <div>未完了</div>
      </div>
      <div class="stat-item">
        <div class="stat-number" id="completedCount">0</div>
        <div>完了</div>
      </div>
    </div>

    <div class="input-area">
      <input type="text" id="todoInput" placeholder="新しいタスクを入力..." onkeypress="handleEnter(event)">
      <button onclick="addTodo()">追加</button>
    </div>

    <ul class="todo-list" id="todoList"></ul>

    <div style="text-align: center; margin-top: 30px;">
      <button onclick="toggleJsonPreview()">📄 保存されているJSONを表示</button>
      <button onclick="clearAll()" class="btn-delete">🗑️ すべてクリア</button>
    </div>

    <div id="jsonPreview" class="json-preview" style="display: none;"></div>
  </div>

  <script>
    let todos = [];

    // ページ読み込み時にデータを読み込み
    window.addEventListener('load', function() {
      loadTodos();
      renderTodos();
    });

    // ToDoを追加
    function addTodo() {
      let input = document.getElementById('todoInput');
      let text = input.value.trim();

      if (text === '') {
        alert('タスクを入力してください');
        return;
      }

      let todo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString('ja-JP')
      };

      todos.push(todo);
      saveTodos();
      renderTodos();

      input.value = '';
      input.focus();
    }

    // Enterキーで追加
    function handleEnter(event) {
      if (event.key === 'Enter') {
        addTodo();
      }
    }

    // ToDoを完了/未完了に切り替え
    function toggleTodo(id) {
      let todo = todos.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
      }
    }

    // ToDoを削除
    function deleteTodo(id) {
      todos = todos.filter(t => t.id !== id);
      saveTodos();
      renderTodos();
    }

    // すべてクリア
    function clearAll() {
      if (confirm('本当にすべてのタスクを削除しますか？')) {
        todos = [];
        saveTodos();
        renderTodos();
      }
    }

    // ToDoをlocalStorageに保存
    function saveTodos() {
      let jsonString = JSON.stringify(todos);
      localStorage.setItem('todos', jsonString);
      console.log('保存しました:', jsonString);
    }

    // ToDoをlocalStorageから読み込み
    function loadTodos() {
      let jsonString = localStorage.getItem('todos');

      if (jsonString) {
        try {
          todos = JSON.parse(jsonString);
          console.log('読み込みました:', todos);
        } catch (error) {
          console.error('データの読み込みに失敗:', error);
          todos = [];
        }
      }
    }

    // ToDoを画面に表示
    function renderTodos() {
      let list = document.getElementById('todoList');
      list.innerHTML = '';

      todos.forEach(todo => {
        let li = document.createElement('li');
        li.className = 'todo-item' + (todo.completed ? ' completed' : '');

        li.innerHTML = `
          <span class="todo-text">${escapeHtml(todo.text)}</span>
          <div class="todo-actions">
            <button onclick="toggleTodo(${todo.id})" class="btn-small btn-complete">
              ${todo.completed ? '✓ 完了' : '未完了'}
            </button>
            <button onclick="deleteTodo(${todo.id})" class="btn-small btn-delete">
              削除
            </button>
          </div>
        `;

        list.appendChild(li);
      });

      updateStats();
    }

    // 統計を更新
    function updateStats() {
      let total = todos.length;
      let completed = todos.filter(t => t.completed).length;
      let active = total - completed;

      document.getElementById('totalCount').textContent = total;
      document.getElementById('activeCount').textContent = active;
      document.getElementById('completedCount').textContent = completed;
    }

    // JSONプレビューを表示/非表示
    function toggleJsonPreview() {
      let preview = document.getElementById('jsonPreview');

      if (preview.style.display === 'none') {
        let jsonString = localStorage.getItem('todos');

        if (jsonString) {
          let prettyJson = JSON.stringify(JSON.parse(jsonString), null, 2);
          preview.textContent = "--- localStorageに保存されているJSON ---\n\n" + prettyJson;
        } else {
          preview.textContent = "保存されたデータがありません";
        }

        preview.style.display = 'block';
      } else {
        preview.style.display = 'none';
      }
    }

    // HTMLエスケープ
    function escapeHtml(text) {
      let div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  </script>
</body>
</html>
```

---

## カリキュラムの要件チェック

curriculum.md（行1115-1120）の要件を確認します：

### ✅ JSON.stringify()
- オブジェクトをJSON文字列に変換する方法を詳しく解説
- 基本的な使い方から、配列、ネストされたオブジェクトまで網羅
- 第3引数（インデント）の使い方を説明
- シリアライズの概念を説明

### ✅ JSON.parse()
- JSON文字列をオブジェクトに変換する方法を詳しく解説
- デシリアライズの概念を説明
- 往復変換（ラウンドトリップ）の例を提示
- エラー処理の方法を説明

### ✅ データの保存
- localStorageの仕組みを詳しく解説
- `setItem()`, `getItem()`, `removeItem()` の使い方を説明
- 実用的な保存・読み込みパターンを提示
- 安全なデータ読み込み方法を解説

### ✅ 【知識】JSON形式、シリアライズ
- JSON形式の厳格なルールを詳しく解説
- JavaScriptオブジェクトとの違いを明確に説明
- シリアライズ/デシリアライズの概念を説明
- 変換できないデータ（関数、undefined等）について解説

### ✅ 成果物：JSON変換
- **アプリ1**: JSON変換デモシステム（stringify/parseの視覚的な理解）
- **アプリ2**: ユーザー設定保存システム（localStorageへの保存と読み込み）
- **アプリ3**: ToDoリスト（永続化対応）（実用的なデータ保存の例）

すべての要件を満たしています！

---

## まとめ

このレッスンで学んだこと：

1. **JSON形式**: データ交換のための標準的なテキスト形式
2. **JSON.stringify()**: オブジェクト → JSON文字列（シリアライズ）
3. **JSON.parse()**: JSON文字列 → オブジェクト（デシリアライズ）
4. **localStorage**: ブラウザにデータを永続的に保存
5. **データの往復**: オブジェクト ⇄ JSON文字列 ⇄ 保存

次のレッスンでは、データモデリングについて学びます。
