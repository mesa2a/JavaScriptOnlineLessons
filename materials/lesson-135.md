# レッスン135: プロパティアクセス

**日付**: 2025-11-26
**所要時間**: 30分

## このレッスンで学ぶこと

1. ドット記法でのプロパティアクセス
2. ブラケット記法でのプロパティアクセス
3. 値の取得と表示
4. 2つの記法の使い分け

---

## プロパティアクセスとは？

### 日常生活での例え：ロッカーから荷物を取り出す

```
【ドット記法】
ロッカー.番号3
→ 「番号3」と直接指定して取り出す

【ブラケット記法】
ロッカー["番号3"]
→ メモに書いた番号を見て取り出す
メモの内容を変えれば、別のロッカーから取り出せる
```

**プロパティアクセス**とは、オブジェクトから特定のデータ（プロパティ）を取り出すことです。

---

## 1. ドット記法 (person.name)

### 基本的な使い方

```javascript
const person = {
  name: "太郎",
  age: 20,
  city: "東京"
};

console.log(person.name); // => "太郎"
console.log(person.age);  // => 20
console.log(person.city); // => "東京"
```

**構文**：
```
オブジェクト名.プロパティ名
```

### 実行の流れ

```javascript
const person = {
  name: "太郎",
  age: 20
};

console.log(person.name);

// 実行の流れ:
// ステップ1: personオブジェクトにアクセス
// person = { name: "太郎", age: 20 }

// ステップ2: nameプロパティを探す
// person.name を検索

// ステップ3: 値を取得
// "太郎" を返す

// ステップ4: console.logで出力
// "太郎" が表示される
```

**図解：ドット記法のアクセス**

```
person オブジェクト
┌─────────────────┐
│  name: "太郎"   │ ← person.name でアクセス
│  age: 20        │
│  city: "東京"   │
└─────────────────┘
      ↓
   "太郎"
```

### 複数のプロパティにアクセス

```javascript
const book = {
  title: "JavaScript入門",
  author: "山田太郎",
  price: 2800,
  pages: 350
};

console.log(book.title);  // => "JavaScript入門"
console.log(book.author); // => "山田太郎"
console.log(book.price);  // => 2800
console.log(book.pages);  // => 350
```

---

## 2. ブラケット記法 (person["age"])

### 基本的な使い方

```javascript
const person = {
  name: "太郎",
  age: 20,
  city: "東京"
};

console.log(person["name"]); // => "太郎"
console.log(person["age"]);  // => 20
console.log(person["city"]); // => "東京"
```

**構文**：
```
オブジェクト名["プロパティ名"]
```

**重要**：プロパティ名を**文字列**（引用符で囲む）として指定します。

### 実行の流れ

```javascript
const person = {
  name: "太郎",
  age: 20
};

console.log(person["name"]);

// 実行の流れ:
// ステップ1: personオブジェクトにアクセス
// person = { name: "太郎", age: 20 }

// ステップ2: "name"という文字列を取得
// "name"

// ステップ3: その文字列に対応するプロパティを探す
// person の中の name プロパティを検索

// ステップ4: 値を取得
// "太郎" を返す

// ステップ5: console.logで出力
// "太郎" が表示される
```

**図解：ブラケット記法のアクセス**

```
person オブジェクト
┌─────────────────┐
│  name: "太郎"   │ ← person["name"] でアクセス
│  age: 20        │
│  city: "東京"   │
└─────────────────┘
      ↑
   "name" という文字列で検索
      ↓
   "太郎"
```

---

## 3. 2つの記法の比較

### 同じ結果を返す

```javascript
const person = {
  name: "太郎",
  age: 20
};

// どちらも同じ結果
console.log(person.name);    // => "太郎"
console.log(person["name"]); // => "太郎"

console.log(person.age);     // => 20
console.log(person["age"]);  // => 20
```

### 書き方の違い

```javascript
// ドット記法：シンプル
person.name

// ブラケット記法：文字列で指定
person["name"]
```

---

## ブラケット記法の特別な利点

### 利点1：変数を使える

ブラケット記法の最大の利点は、**変数**を使ってプロパティ名を指定できることです。

```javascript
const person = {
  name: "太郎",
  age: 20,
  city: "東京"
};

// 変数にプロパティ名を格納
const propertyName = "name";

// 変数を使ってアクセス
console.log(person[propertyName]); // => "太郎"

// 変数の値を変更すれば、別のプロパティにアクセスできる
const prop = "age";
console.log(person[prop]); // => 20
```

**実行の流れ**：

```javascript
const propertyName = "name";
console.log(person[propertyName]);

// ステップ1: 変数propertyNameの値を取得
// propertyName = "name"

// ステップ2: その値をプロパティ名として使用
// person["name"] と同じ

// ステップ3: 値を取得
// "太郎"
```

**ドット記法では変数は使えない**：

```javascript
const propertyName = "name";

// ❌ これは動作しない
console.log(person.propertyName);
// => undefined
// （"propertyName"という名前のプロパティを探してしまう）

// ✅ ブラケット記法を使う
console.log(person[propertyName]);
// => "太郎"
```

### 利点2：スペースや特殊文字を含むプロパティ名

```javascript
const data = {
  "first name": "太郎",
  "last-name": "山田",
  "email address": "taro@example.com"
};

// ブラケット記法でアクセス
console.log(data["first name"]);     // => "太郎"
console.log(data["last-name"]);      // => "山田"
console.log(data["email address"]);  // => "taro@example.com"

// ❌ ドット記法では動作しない
// console.log(data.first name); // エラー
```

---

## 実践例1：値の取得と表示

基本的なデータ取得と表示を行うアプリを作りましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>プロパティアクセスの比較</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f5f5f5;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 30px;
    }

    .card {
      background-color: white;
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .card h2 {
      margin-top: 0;
      padding-bottom: 10px;
      border-bottom: 3px solid #667eea;
      color: #667eea;
    }

    .info-row {
      padding: 12px;
      margin: 10px 0;
      background-color: #f8f9fa;
      border-radius: 5px;
      border-left: 4px solid #667eea;
    }

    .label {
      font-weight: bold;
      color: #555;
    }

    .value {
      color: #333;
      margin-left: 10px;
    }

    .method {
      font-size: 12px;
      color: #999;
      font-style: italic;
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <h1>🔍 プロパティアクセスの比較</h1>

  <div class="container">
    <!-- ドット記法 -->
    <div class="card">
      <h2>ドット記法</h2>
      <div class="info-row">
        <div class="label">名前:</div>
        <div class="value" id="dotName"></div>
        <div class="method">person.name</div>
      </div>
      <div class="info-row">
        <div class="label">年齢:</div>
        <div class="value" id="dotAge"></div>
        <div class="method">person.age</div>
      </div>
      <div class="info-row">
        <div class="label">都市:</div>
        <div class="value" id="dotCity"></div>
        <div class="method">person.city</div>
      </div>
      <div class="info-row">
        <div class="label">職業:</div>
        <div class="value" id="dotJob"></div>
        <div class="method">person.job</div>
      </div>
    </div>

    <!-- ブラケット記法 -->
    <div class="card">
      <h2>ブラケット記法</h2>
      <div class="info-row">
        <div class="label">名前:</div>
        <div class="value" id="bracketName"></div>
        <div class="method">person["name"]</div>
      </div>
      <div class="info-row">
        <div class="label">年齢:</div>
        <div class="value" id="bracketAge"></div>
        <div class="method">person["age"]</div>
      </div>
      <div class="info-row">
        <div class="label">都市:</div>
        <div class="value" id="bracketCity"></div>
        <div class="method">person["city"]</div>
      </div>
      <div class="info-row">
        <div class="label">職業:</div>
        <div class="value" id="bracketJob"></div>
        <div class="method">person["job"]</div>
      </div>
    </div>
  </div>

  <script>
    // 人物データ
    const person = {
      name: "山田太郎",
      age: 28,
      city: "東京都",
      job: "Webエンジニア"
    };

    // ドット記法で取得・表示
    document.getElementById('dotName').textContent = person.name;
    document.getElementById('dotAge').textContent = person.age + "歳";
    document.getElementById('dotCity').textContent = person.city;
    document.getElementById('dotJob').textContent = person.job;

    // ブラケット記法で取得・表示
    document.getElementById('bracketName').textContent = person["name"];
    document.getElementById('bracketAge').textContent = person["age"] + "歳";
    document.getElementById('bracketCity').textContent = person["city"];
    document.getElementById('bracketJob').textContent = person["job"];
  </script>
</body>
</html>
```

**このアプリの特徴**：
- ✅ 2つの記法を並べて比較
- ✅ 同じ結果が得られることを視覚的に確認
- ✅ 使用した記法をコードとして表示

---

## 実践例2：動的なプロパティアクセス

変数を使って、ユーザーの選択に応じて異なるプロパティにアクセスします。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>動的データ取得</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }

    .container {
      background-color: white;
      border-radius: 15px;
      padding: 40px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    }

    h1 {
      text-align: center;
      color: #667eea;
      margin-top: 0;
    }

    .select-group {
      margin: 30px 0;
    }

    label {
      display: block;
      font-weight: bold;
      margin-bottom: 10px;
      color: #555;
    }

    select {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 8px;
      cursor: pointer;
    }

    select:focus {
      outline: none;
      border-color: #667eea;
    }

    button {
      width: 100%;
      padding: 15px;
      font-size: 18px;
      font-weight: bold;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 20px;
    }

    button:hover {
      opacity: 0.9;
    }

    .result {
      margin-top: 30px;
      padding: 25px;
      background-color: #f8f9fa;
      border-radius: 8px;
      border-left: 5px solid #667eea;
      display: none;
    }

    .result.show {
      display: block;
    }

    .result-label {
      font-size: 14px;
      color: #666;
      margin-bottom: 5px;
    }

    .result-value {
      font-size: 28px;
      font-weight: bold;
      color: #667eea;
    }

    .code-hint {
      margin-top: 15px;
      padding: 10px;
      background-color: #fff;
      border-radius: 5px;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      color: #333;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 動的データ取得システム</h1>

    <div class="select-group">
      <label>取得する情報を選択してください:</label>
      <select id="propertySelect">
        <option value="">-- 選択してください --</option>
        <option value="name">名前</option>
        <option value="age">年齢</option>
        <option value="city">都市</option>
        <option value="job">職業</option>
        <option value="email">メールアドレス</option>
      </select>
    </div>

    <button onclick="getData()">データを取得</button>

    <div id="result" class="result">
      <div class="result-label">取得結果:</div>
      <div class="result-value" id="resultValue"></div>
      <div class="code-hint" id="codeHint"></div>
    </div>
  </div>

  <script>
    // ユーザーデータ
    const user = {
      name: "佐藤花子",
      age: 25,
      city: "大阪府",
      job: "グラフィックデザイナー",
      email: "hanako@example.com"
    };

    const getData = function() {
      // 選択されたプロパティ名を取得
      const propertyName = document.getElementById('propertySelect').value;

      // 選択されていない場合
      if (propertyName === '') {
        alert('情報を選択してください');
        return;
      }

      // ブラケット記法で動的にアクセス
      const value = user[propertyName];

      // 結果を表示
      document.getElementById('resultValue').textContent = value;
      document.getElementById('codeHint').textContent =
        `使用したコード: user["${propertyName}"]`;
      document.getElementById('result').className = 'result show';
    };
  </script>
</body>
</html>
```

**このアプリの特徴**：
- ✅ ユーザーの選択に応じて動的にプロパティアクセス
- ✅ 変数を使ったブラケット記法の実践
- ✅ 使用したコードを表示して学習効果を高める

---

## 実践例3：複数プロパティの一括表示

配列とブラケット記法を組み合わせて、複数のプロパティを効率的に表示します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>プロパティ一括表示</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 900px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f0f2f5;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .button-group {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin: 30px 0;
    }

    button {
      padding: 12px 24px;
      font-size: 16px;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-all {
      background-color: #667eea;
      color: white;
    }

    .btn-all:hover {
      background-color: #5568d3;
    }

    .btn-basic {
      background-color: #28a745;
      color: white;
    }

    .btn-basic:hover {
      background-color: #218838;
    }

    .btn-contact {
      background-color: #ffc107;
      color: #333;
    }

    .btn-contact:hover {
      background-color: #e0a800;
    }

    .data-card {
      background-color: white;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      margin-top: 20px;
    }

    .data-card h2 {
      margin-top: 0;
      color: #667eea;
      border-bottom: 2px solid #667eea;
      padding-bottom: 10px;
    }

    .property-list {
      list-style: none;
      padding: 0;
    }

    .property-item {
      padding: 15px;
      margin: 10px 0;
      background-color: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .property-key {
      font-weight: bold;
      color: #555;
      font-size: 14px;
    }

    .property-value {
      color: #333;
      font-size: 16px;
    }

    .empty-message {
      text-align: center;
      color: #999;
      padding: 40px;
      font-style: italic;
    }
  </style>
</head>
<body>
  <h1>📋 プロパティ一括表示システム</h1>

  <div class="button-group">
    <button class="btn-all" onclick="showAllProperties()">すべて表示</button>
    <button class="btn-basic" onclick="showBasicInfo()">基本情報のみ</button>
    <button class="btn-contact" onclick="showContactInfo()">連絡先のみ</button>
  </div>

  <div class="data-card">
    <h2 id="cardTitle">データを選択してください</h2>
    <ul id="propertyList" class="property-list">
      <li class="empty-message">上のボタンをクリックしてデータを表示</li>
    </ul>
  </div>

  <script>
    // ユーザーデータ
    const user = {
      name: "鈴木一郎",
      age: 32,
      city: "福岡県",
      job: "プロジェクトマネージャー",
      email: "suzuki@example.com",
      phone: "090-1234-5678",
      department: "開発部",
      experience: "8年"
    };

    // プロパティを表示する関数
    const displayProperties = function(propertyNames, title) {
      const list = document.getElementById('propertyList');
      const cardTitle = document.getElementById('cardTitle');

      // タイトルを更新
      cardTitle.textContent = title;

      // リストをクリア
      list.innerHTML = '';

      // 各プロパティを表示
      propertyNames.forEach(function(propName) {
        // リスト項目を作成
        const li = document.createElement('li');
        li.className = 'property-item';

        // プロパティ名（キー）を表示
        const keySpan = document.createElement('span');
        keySpan.className = 'property-key';
        keySpan.textContent = propName;

        // プロパティ値を表示（ブラケット記法で取得）
        const valueSpan = document.createElement('span');
        valueSpan.className = 'property-value';
        valueSpan.textContent = user[propName];

        li.appendChild(keySpan);
        li.appendChild(valueSpan);
        list.appendChild(li);
      });
    };

    // すべて表示
    const showAllProperties = function() {
      const allProps = ["name", "age", "city", "job", "email", "phone", "department", "experience"];
      displayProperties(allProps, "📊 すべての情報");
    };

    // 基本情報のみ
    const showBasicInfo = function() {
      const basicProps = ["name", "age", "city"];
      displayProperties(basicProps, "👤 基本情報");
    };

    // 連絡先のみ
    const showContactInfo = function() {
      const contactProps = ["email", "phone"];
      displayProperties(contactProps, "📞 連絡先情報");
    };
  </script>
</body>
</html>
```

**このアプリの特徴**：
- ✅ 配列とブラケット記法を組み合わせた効率的な表示
- ✅ 表示するプロパティを動的に切り替え
- ✅ 関数を使った再利用可能なコード設計

---

## 2つの記法の使い分け

### ドット記法を使う場面

**条件**：
- プロパティ名が事前に分かっている
- プロパティ名が有効な変数名（スペースや特殊文字なし）
- コードを読みやすくしたい

```javascript
// ✅ ドット記法が適している
console.log(person.name);
console.log(person.age);
console.log(person.city);
```

### ブラケット記法を使う場面

**条件**：
- プロパティ名が変数に格納されている
- プロパティ名にスペースや特殊文字が含まれる
- プロパティ名が動的に決まる

```javascript
// ✅ ブラケット記法が必要
const prop = "name";
console.log(person[prop]);

console.log(data["first name"]);

const properties = ["name", "age", "city"];
properties.forEach(function(p) {
  console.log(person[p]);
});
```

---

## よくある間違い

### 間違い1：ブラケット記法で引用符を忘れる

```javascript
const person = { name: "太郎" };

// ❌ 間違い（nameという変数を探してしまう）
console.log(person[name]);
// => エラー: name is not defined

// ✅ 正しい
console.log(person["name"]);
// => "太郎"
```

### 間違い2：変数に引用符をつける

```javascript
const propertyName = "name";

// ❌ 間違い（"propertyName"というプロパティを探す）
console.log(person["propertyName"]);
// => undefined

// ✅ 正しい（変数の値を使う）
console.log(person[propertyName]);
// => "太郎"
```

### 間違い3：ドット記法で変数を使う

```javascript
const prop = "name";

// ❌ 間違い（propというプロパティを探す）
console.log(person.prop);
// => undefined

// ✅ 正しい（ブラケット記法を使う）
console.log(person[prop]);
// => "太郎"
```

---

## 存在しないプロパティへのアクセス

どちらの記法でも、存在しないプロパティにアクセスすると`undefined`が返されます。

```javascript
const person = {
  name: "太郎",
  age: 20
};

console.log(person.email);     // => undefined
console.log(person["phone"]);  // => undefined
```

---

## まとめ

このレッスンで学んだこと：

### 1. **ドット記法 (person.name)**
```javascript
console.log(person.name);
```
- シンプルで読みやすい
- プロパティ名が固定の場合に使用

### 2. **ブラケット記法 (person["age"])**
```javascript
console.log(person["age"]);
```
- プロパティ名を文字列で指定
- 変数を使える
- 特殊文字を含むプロパティ名に対応

### 3. **値の取得と表示**
```javascript
// 取得
const value = person.name;

// 表示
document.getElementById('output').textContent = value;
```

### 4. **使い分けのポイント**
- **固定のプロパティ名** → ドット記法
- **変数のプロパティ名** → ブラケット記法
- **特殊文字を含む** → ブラケット記法

---

## カリキュラムの要件チェック

### レッスン135：プロパティアクセス
- ✅ **person.name でアクセス**: ドット記法の詳細な解説と実例
- ✅ **person["age"] でもOK**: ブラケット記法の詳細な解説と実例
- ✅ **値の取得と表示**: 3つの実践例で値の取得と表示を実装
- ✅ **成果物：データ取得**: 動的データ取得システム、プロパティ一括表示システム

---

## 次のレッスンの予告

次のレッスンでは、**プロパティの変更**について学びます。

オブジェクトのプロパティの値を変更したり、新しいプロパティを追加する方法を学んでいきましょう！
