# レッスン140：for...inループ

**日付**: 2025-11-26

## このレッスンで学ぶこと

このレッスンでは、for...inループを使ってオブジェクトのすべてのプロパティを反復処理する方法を学びます。オブジェクトの全プロパティを取得し、動的に処理できるようになります。

## 日常生活での例え

for...inループは、**引き出しの中身を一つずつ確認する**作業のようなものです。

- **オブジェクト**: 整理棚（複数の引き出しがある）
- **プロパティ**: 各引き出し（名前がついている）
- **for...inループ**: すべての引き出しを順番に開けて中身を確認する

例えば、整理棚を考えてみましょう：

```
整理棚（オブジェクト）
┌─────────────────────────┐
│ [name] 田中             │ ← 引き出し1
├─────────────────────────┤
│ [age] 25                │ ← 引き出し2
├─────────────────────────┤
│ [city] 東京             │ ← 引き出し3
└─────────────────────────┘

for...inループ:
引き出し1を開ける → ラベル: "name", 中身: "田中"
引き出し2を開ける → ラベル: "age", 中身: 25
引き出し3を開ける → ラベル: "city", 中身: "東京"
```

どんな引き出しがあるか事前に知らなくても、すべての引き出しを順番に確認できます。

## for...inループとは

これまで、配列のループには通常のforループを使ってきました。しかし、オブジェクトには**for...inループ**という特別な構文があります。

### 基本的な書き方

```javascript
const person = {
  name: "田中",
  age: 25,
  city: "東京"
};

for (let key in person) {
  console.log(key);
}
// "name"
// "age"
// "city"
```

for...inループは、オブジェクトの**すべてのプロパティ名**を順番に取り出します。

### 構文の解説

```
for (let key in person) {
     ↓   ↓   ↓    ↓
     │   │   │    └─ 対象のオブジェクト
     │   │   └────── in キーワード
     │   └────────── 変数名（プロパティ名が入る）
     └────────────── 変数宣言

処理の流れ:
1回目: key = "name"
2回目: key = "age"
3回目: key = "city"
```

### 実行の流れ

```
【初期状態】
person = {
  name: "田中",
  age: 25,
  city: "東京"
}

【for...inループの実行】

1回目の繰り返し:
  key = "name"
  console.log("name") を実行
  出力: "name"

2回目の繰り返し:
  key = "age"
  console.log("age") を実行
  出力: "age"

3回目の繰り返し:
  key = "city"
  console.log("city") を実行
  出力: "city"

【結果】
すべてのプロパティ名が順番に出力される
```

## プロパティ名と値の取得

### プロパティ名を取得

```javascript
const student = {
  name: "佐藤",
  grade: "A",
  score: 85
};

for (let key in student) {
  console.log("プロパティ名：" + key);
}
// プロパティ名：name
// プロパティ名：grade
// プロパティ名：score
```

`key` 変数には、各プロパティの名前（キー）が**文字列**として入ります。

### プロパティの値を取得

プロパティの値を取得するには、**ブラケット記法**を使います：

```javascript
const book = {
  title: "JavaScript入門",
  author: "山田太郎",
  price: 2800
};

for (let key in book) {
  console.log(key + "：" + book[key]);
}
// title：JavaScript入門
// author：山田太郎
// price：2800
```

### ブラケット記法が必要な理由

```javascript
const book = {
  title: "JavaScript入門",
  author: "山田太郎"
};

for (let key in book) {
  // ○ 正しい方法（ブラケット記法）
  console.log(book[key]);

  // × 間違い（ドット記法）
  // console.log(book.key);  // undefined になる
}

理由:
book.key は "key" という名前のプロパティを探す
book[key] は key 変数の値（"title" や "author"）を使う

例:
key = "title" の時
book.key    → book["key"]     → undefined（"key"プロパティは存在しない）
book[key]   → book["title"]   → "JavaScript入門" ✓
```

### 実行の流れ

```
【初期状態】
book = {
  title: "JavaScript入門",
  author: "山田太郎",
  price: 2800
}

【for...inループの実行】

1回目の繰り返し:
  key = "title"
  book[key] = book["title"] = "JavaScript入門"
  出力: "title：JavaScript入門"

2回目の繰り返し:
  key = "author"
  book[key] = book["author"] = "山田太郎"
  出力: "author：山田太郎"

3回目の繰り返し:
  key = "price"
  book[key] = book["price"] = 2800
  出力: "price：2800"
```

## プロパティの数を数える

for...inループを使って、オブジェクトのプロパティ数を数えることができます：

```javascript
const product = {
  name: "ノート",
  price: 200,
  stock: 50,
  category: "文具"
};

let count = 0;
for (let key in product) {
  count++;
}

console.log("プロパティの数：" + count);
// プロパティの数：4
```

### 実行の流れ

```
【初期状態】
product = { name: "ノート", price: 200, stock: 50, category: "文具" }
count = 0

【ループの実行】

1回目: key = "name"
  count = 0 + 1 = 1

2回目: key = "price"
  count = 1 + 1 = 2

3回目: key = "stock"
  count = 2 + 1 = 3

4回目: key = "category"
  count = 3 + 1 = 4

【最終結果】
count = 4
```

## 条件付き処理

特定のプロパティだけを処理することもできます：

```javascript
const scores = {
  math: 85,
  english: 92,
  science: 78,
  history: 88
};

// 80点以上の科目を表示
for (let subject in scores) {
  if (scores[subject] >= 80) {
    console.log(subject + "：" + scores[subject] + "点");
  }
}
// math：85点
// english：92点
// history：88点
```

### 実行の流れ

```
【初期状態】
scores = { math: 85, english: 92, science: 78, history: 88 }

【ループの実行と条件判定】

1回目: subject = "math"
  scores["math"] = 85
  条件: 85 >= 80 → 真
  出力: "math：85点"

2回目: subject = "english"
  scores["english"] = 92
  条件: 92 >= 80 → 真
  出力: "english：92点"

3回目: subject = "science"
  scores["science"] = 78
  条件: 78 >= 80 → 偽
  出力なし

4回目: subject = "history"
  scores["history"] = 88
  条件: 88 >= 80 → 真
  出力: "history：88点"
```

## hasOwnPropertyメソッド

`hasOwnProperty()` メソッドを使うと、オブジェクトが特定のプロパティを持っているかを確認できます：

```javascript
const person = {
  name: "山田",
  age: 30
};

console.log(person.hasOwnProperty("name"));    // true
console.log(person.hasOwnProperty("email"));   // false
```

### for...inと組み合わせて使う

より安全なコードを書くために、for...inループと組み合わせて使うことがあります：

```javascript
const data = {
  id: 1,
  name: "商品A",
  price: 1000
};

for (let key in data) {
  if (data.hasOwnProperty(key)) {
    console.log(key + "：" + data[key]);
  }
}
```

これは、継承されたプロパティを除外するために使われますが、基本的な使い方では通常は必要ありません。

## 実践例1：オブジェクト情報表示システム

for...inループを使って、オブジェクトの全情報を表示するシステムを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>オブジェクト情報表示</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }

        h1 {
            text-align: center;
            color: white;
            margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .container {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }

        .object-card {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .object-title {
            font-size: 20px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #667eea;
        }

        .property-list {
            list-style: none;
            padding: 0;
        }

        .property-item {
            padding: 12px;
            margin: 8px 0;
            background: white;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .property-key {
            font-weight: bold;
            color: #764ba2;
            flex: 0 0 150px;
        }

        .property-value {
            color: #333;
            flex: 1;
            text-align: right;
        }

        .property-type {
            font-size: 12px;
            color: #999;
            margin-left: 10px;
            padding: 3px 8px;
            background: #f0f0f0;
            border-radius: 4px;
        }

        .stats {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
        }

        .stat-item {
            padding: 8px 0;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h1>🔍 オブジェクト情報表示システム</h1>
    <div class="container">
        <div id="objectDisplay"></div>
        <div id="stats" class="stats"></div>
    </div>

    <script>
        // サンプルオブジェクト
        const user = {
            username: "taro123",
            email: "taro@example.com",
            age: 28,
            city: "東京",
            premium: true,
            points: 1250
        };

        const product = {
            id: 101,
            name: "ワイヤレスマウス",
            price: 2500,
            brand: "LogiTech",
            inStock: true,
            rating: 4.5
        };

        const displayDiv = document.getElementById("objectDisplay");
        const statsDiv = document.getElementById("stats");

        // オブジェクト情報を表示する関数
        function displayObject(obj, title) {
            const card = document.createElement("div");
            card.className = "object-card";

            // タイトル
            const titleDiv = document.createElement("div");
            titleDiv.className = "object-title";
            titleDiv.textContent = title;
            card.appendChild(titleDiv);

            // プロパティリスト
            const list = document.createElement("ul");
            list.className = "property-list";

            // for...inループですべてのプロパティを処理
            for (let key in obj) {
                const item = document.createElement("li");
                item.className = "property-item";

                const keySpan = document.createElement("span");
                keySpan.className = "property-key";
                keySpan.textContent = key;

                const valueSpan = document.createElement("span");
                valueSpan.className = "property-value";
                valueSpan.textContent = obj[key];

                // データ型を表示
                const typeSpan = document.createElement("span");
                typeSpan.className = "property-type";
                typeSpan.textContent = typeof obj[key];

                item.appendChild(keySpan);
                item.appendChild(valueSpan);
                item.appendChild(typeSpan);

                list.appendChild(item);
            }

            card.appendChild(list);
            displayDiv.appendChild(card);
        }

        // 統計情報を表示する関数
        function displayStats() {
            // userオブジェクトのプロパティ数
            let userPropCount = 0;
            for (let key in user) {
                userPropCount++;
            }

            // productオブジェクトのプロパティ数
            let productPropCount = 0;
            for (let key in product) {
                productPropCount++;
            }

            // 数値型プロパティの数（userから）
            let numericCount = 0;
            for (let key in user) {
                if (typeof user[key] === "number") {
                    numericCount++;
                }
            }

            statsDiv.innerHTML = `
                <div class="stat-item">📊 統計情報</div>
                <div class="stat-item">• ユーザーオブジェクトのプロパティ数: ${userPropCount}</div>
                <div class="stat-item">• 商品オブジェクトのプロパティ数: ${productPropCount}</div>
                <div class="stat-item">• ユーザーの数値型プロパティ数: ${numericCount}</div>
            `;
        }

        // 実行
        displayObject(user, "👤 ユーザー情報");
        displayObject(product, "📦 商品情報");
        displayStats();

        // コンソールに情報を出力
        console.log("=== オブジェクト情報表示システム ===");
        console.log("\nユーザーオブジェクト:");
        for (let key in user) {
            console.log(`  ${key}: ${user[key]} (${typeof user[key]})`);
        }
        console.log("\n商品オブジェクト:");
        for (let key in product) {
            console.log(`  ${key}: ${product[key]} (${typeof product[key]})`);
        }
    </script>
</body>
</html>
```

### このアプリケーションのポイント

1. **for...inループの活用**
   - すべてのプロパティを動的に取得
   - プロパティ名と値を表示

2. **データ型の判定**
   - `typeof` 演算子でデータ型を取得
   - データ型ごとに異なる処理

3. **統計情報の計算**
   - プロパティ数のカウント
   - 特定の型のプロパティ数を集計

## 実践例2：設定管理システム

ユーザー設定を管理し、すべての設定を表示するシステムを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>設定管理システム</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 30px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            min-height: 100vh;
        }

        h1 {
            text-align: center;
            color: white;
            margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .container {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }

        .settings-list {
            list-style: none;
            padding: 0;
        }

        .setting-item {
            padding: 15px;
            margin: 10px 0;
            background: #f8f9fa;
            border-radius: 10px;
            border-left: 4px solid #f093fb;
        }

        .setting-name {
            font-weight: bold;
            color: #f5576c;
            margin-bottom: 5px;
            font-size: 16px;
        }

        .setting-value {
            color: #333;
            font-size: 18px;
        }

        .search-box {
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
        }

        input[type="text"] {
            width: 100%;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }

        .info-box {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>⚙️ 設定管理システム</h1>
    <div class="container">
        <div class="search-box">
            <input type="text" id="searchInput" placeholder="設定名を検索..." onkeyup="searchSettings()">
        </div>

        <ul id="settingsList" class="settings-list"></ul>

        <div id="infoBox" class="info-box"></div>
    </div>

    <script>
        // 設定オブジェクト
        const settings = {
            theme: "ダークモード",
            language: "日本語",
            notifications: true,
            autoSave: true,
            fontSize: 14,
            volume: 75,
            privacy: "高",
            newsletter: false
        };

        const listDiv = document.getElementById("settingsList");
        const infoDiv = document.getElementById("infoBox");

        // すべての設定を表示する関数
        function displaySettings(filter = "") {
            listDiv.innerHTML = "";

            let displayCount = 0;

            // for...inループですべての設定を処理
            for (let key in settings) {
                // フィルタ処理
                if (filter && !key.toLowerCase().includes(filter.toLowerCase())) {
                    continue;
                }

                displayCount++;

                const item = document.createElement("li");
                item.className = "setting-item";

                const nameDiv = document.createElement("div");
                nameDiv.className = "setting-name";
                nameDiv.textContent = key;

                const valueDiv = document.createElement("div");
                valueDiv.className = "setting-value";

                // 値の型に応じて表示を変える
                let displayValue;
                if (typeof settings[key] === "boolean") {
                    displayValue = settings[key] ? "✓ ON" : "✗ OFF";
                } else {
                    displayValue = settings[key];
                }
                valueDiv.textContent = displayValue;

                item.appendChild(nameDiv);
                item.appendChild(valueDiv);
                listDiv.appendChild(item);
            }

            // 統計情報を更新
            updateInfo(displayCount);
        }

        // 検索機能
        function searchSettings() {
            const input = document.getElementById("searchInput");
            const filter = input.value;
            displaySettings(filter);
        }

        // 統計情報を更新する関数
        function updateInfo(displayCount) {
            // プロパティの総数
            let totalCount = 0;
            for (let key in settings) {
                totalCount++;
            }

            // boolean型の設定数
            let boolCount = 0;
            for (let key in settings) {
                if (typeof settings[key] === "boolean") {
                    boolCount++;
                }
            }

            // ONになっている設定数
            let enabledCount = 0;
            for (let key in settings) {
                if (settings[key] === true) {
                    enabledCount++;
                }
            }

            infoDiv.innerHTML = `
                <div>総設定数: ${totalCount} | 表示中: ${displayCount}</div>
                <div>ON/OFF設定: ${boolCount}個 | 有効: ${enabledCount}個</div>
            `;
        }

        // 初期表示
        displaySettings();

        // コンソールに情報を出力
        console.log("=== 設定管理システム ===");
        console.log("全設定:");
        for (let key in settings) {
            console.log(`  ${key}: ${settings[key]}`);
        }
    </script>
</body>
</html>
```

### このアプリケーションのポイント

1. **動的な表示**
   - for...inループで全設定を自動表示
   - 設定が追加されても自動的に対応

2. **検索機能**
   - プロパティ名でフィルタリング
   - 一致するものだけを表示

3. **型に応じた処理**
   - boolean型は ON/OFF で表示
   - その他の型はそのまま表示

## 実践例3：データ比較システム

複数のオブジェクトを比較し、違いを表示するシステムを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>データ比較システム</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            max-width: 1000px;
            margin: 0 auto;
            padding: 30px;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            min-height: 100vh;
        }

        h1 {
            text-align: center;
            color: white;
            margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .container {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }

        .comparison-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 20px;
        }

        .object-panel {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
        }

        .panel-title {
            font-size: 18px;
            font-weight: bold;
            color: #4facfe;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #4facfe;
        }

        .prop-item {
            padding: 8px;
            margin: 5px 0;
            background: white;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
        }

        .prop-key {
            font-weight: bold;
            color: #666;
        }

        .prop-val {
            color: #333;
        }

        .differences {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
        }

        .diff-title {
            font-size: 18px;
            font-weight: bold;
            color: #856404;
            margin-bottom: 15px;
        }

        .diff-item {
            padding: 10px;
            margin: 8px 0;
            background: white;
            border-radius: 5px;
        }

        .diff-key {
            font-weight: bold;
            color: #856404;
        }

        .common-props {
            background: #d4edda;
            border-left: 4px solid #28a745;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
        }

        .common-title {
            font-size: 18px;
            font-weight: bold;
            color: #155724;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <h1>🔄 データ比較システム</h1>
    <div class="container">
        <div class="comparison-grid">
            <div class="object-panel">
                <div class="panel-title">商品A</div>
                <div id="productA"></div>
            </div>
            <div class="object-panel">
                <div class="panel-title">商品B</div>
                <div id="productB"></div>
            </div>
        </div>

        <div id="differences" class="differences"></div>
        <div id="common" class="common-props"></div>
    </div>

    <script>
        // 比較する2つのオブジェクト
        const productA = {
            name: "ノートパソコン",
            price: 80000,
            brand: "Dell",
            weight: 1.5,
            color: "シルバー"
        };

        const productB = {
            name: "ノートパソコン",
            price: 95000,
            brand: "Apple",
            weight: 1.3,
            screen: 13
        };

        // オブジェクトを表示する関数
        function displayObject(obj, elementId) {
            const element = document.getElementById(elementId);
            element.innerHTML = "";

            for (let key in obj) {
                const item = document.createElement("div");
                item.className = "prop-item";
                item.innerHTML = `
                    <span class="prop-key">${key}:</span>
                    <span class="prop-val">${obj[key]}</span>
                `;
                element.appendChild(item);
            }
        }

        // 違いを検出する関数
        function findDifferences() {
            const diffDiv = document.getElementById("differences");
            diffDiv.innerHTML = '<div class="diff-title">⚠️ 違いがあるプロパティ</div>';

            let diffCount = 0;

            // productAのすべてのプロパティをチェック
            for (let key in productA) {
                // productBにも同じプロパティがあるか
                if (productB.hasOwnProperty(key)) {
                    // 値が異なるか
                    if (productA[key] !== productB[key]) {
                        diffCount++;
                        const item = document.createElement("div");
                        item.className = "diff-item";
                        item.innerHTML = `
                            <div class="diff-key">${key}:</div>
                            <div>商品A: ${productA[key]}</div>
                            <div>商品B: ${productB[key]}</div>
                        `;
                        diffDiv.appendChild(item);
                    }
                } else {
                    // productBにはないプロパティ
                    diffCount++;
                    const item = document.createElement("div");
                    item.className = "diff-item";
                    item.innerHTML = `
                        <div class="diff-key">${key}:</div>
                        <div>商品A: ${productA[key]}</div>
                        <div>商品B: なし</div>
                    `;
                    diffDiv.appendChild(item);
                }
            }

            // productBにしかないプロパティをチェック
            for (let key in productB) {
                if (!productA.hasOwnProperty(key)) {
                    diffCount++;
                    const item = document.createElement("div");
                    item.className = "diff-item";
                    item.innerHTML = `
                        <div class="diff-key">${key}:</div>
                        <div>商品A: なし</div>
                        <div>商品B: ${productB[key]}</div>
                    `;
                    diffDiv.appendChild(item);
                }
            }

            if (diffCount === 0) {
                diffDiv.innerHTML += '<div>違いはありません</div>';
            }
        }

        // 共通のプロパティを検出する関数
        function findCommon() {
            const commonDiv = document.getElementById("common");
            commonDiv.innerHTML = '<div class="common-title">✅ 共通のプロパティ（同じ値）</div>';

            let commonCount = 0;

            for (let key in productA) {
                if (productB.hasOwnProperty(key)) {
                    if (productA[key] === productB[key]) {
                        commonCount++;
                        const item = document.createElement("div");
                        item.style.padding = "5px 0";
                        item.textContent = `${key}: ${productA[key]}`;
                        commonDiv.appendChild(item);
                    }
                }
            }

            if (commonCount === 0) {
                commonDiv.innerHTML += '<div>同じ値を持つプロパティはありません</div>';
            }
        }

        // 実行
        displayObject(productA, "productA");
        displayObject(productB, "productB");
        findDifferences();
        findCommon();

        // コンソールに情報を出力
        console.log("=== データ比較システム ===");
        console.log("\n商品A:");
        for (let key in productA) {
            console.log(`  ${key}: ${productA[key]}`);
        }
        console.log("\n商品B:");
        for (let key in productB) {
            console.log(`  ${key}: ${productB[key]}`);
        }
    </script>
</body>
</html>
```

### このアプリケーションのポイント

1. **複数オブジェクトの比較**
   - for...inループで両方のオブジェクトを走査
   - プロパティの存在を `hasOwnProperty()` で確認

2. **違いの検出**
   - 同じプロパティ名で値が異なる場合
   - 一方にしか存在しないプロパティ

3. **共通点の検出**
   - 両方に存在し、値も同じプロパティを抽出

## Object.keysメソッド（参考）

for...inループ以外に、`Object.keys()` メソッドでプロパティ名の配列を取得することもできます：

```javascript
const person = {
  name: "田中",
  age: 25,
  city: "東京"
};

const keys = Object.keys(person);
console.log(keys);
// ["name", "age", "city"]

// 通常のforループで処理
for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  console.log(key + "：" + person[key]);
}
```

### Object.keysの利点

```javascript
const product = {
  name: "マウス",
  price: 2500,
  stock: 10
};

// Object.keysを使うと配列として扱える
const keys = Object.keys(product);

// 配列のメソッドが使える
console.log(keys.length);        // 3
console.log(keys.includes("name")); // true
console.log(keys[0]);            // "name"
```

## 注意点

### 1. 順序は保証されない

オブジェクトのプロパティの順序は保証されません。現代のJavaScriptでは多くの場合、追加した順序で取得されますが、依存すべきではありません。

### 2. 配列にはfor...inを使わない

配列には通常のforループを使いましょう：

```javascript
// ✗ 悪い例
const numbers = [10, 20, 30];
for (let i in numbers) {
  console.log(numbers[i]);
}

// ✓ 良い例
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
```

## カリキュラムの仕様チェック

このレッスンで実装した内容が、カリキュラムの仕様を満たしているか確認します。

### カリキュラムの要件

curriculum.md の レッスン140 (行1101-1106):

```
レッスン140:for...inループ(30分)
□ オブジェクトのループ
□ 全プロパティ処理
□ hasOwnProperty
【知識】オブジェクトの反復処理
✅ 成果物:プロパティ一覧
```

### 仕様の確認

| 要件 | 実装内容 | 確認 |
|-----|---------|-----|
| オブジェクトのループ | for...inループの基本構文と使い方を詳しく解説 | ✅ |
| 全プロパティ処理 | すべてのプロパティを取得・表示する方法を実装 | ✅ |
| hasOwnProperty | hasOwnPropertyメソッドの使い方を解説 | ✅ |
| オブジェクトの反復処理 | for...inループでプロパティを順番に処理 | ✅ |
| 成果物：プロパティ一覧 | 3つの実用的なプロパティ一覧システムを実装 | ✅ |

### 詳細な確認

**✅ オブジェクトのループ**
- for...inループの基本構文を解説
- プロパティ名の取得方法
- プロパティ値へのアクセス（ブラケット記法）
- 詳細な実行フローの説明

**✅ 全プロパティ処理**
- すべてのプロパティ名と値を取得
- プロパティ数のカウント
- 条件付きフィルタリング
- データ型に応じた処理

**✅ hasOwnProperty**
- hasOwnPropertyメソッドの基本的な使い方
- for...inループとの組み合わせ
- プロパティの存在確認

**✅ オブジェクトの反復処理**
- for...inループでの反復処理パターン
- プロパティの動的な処理
- 複数オブジェクトの比較

**✅ 成果物：プロパティ一覧**
- 実践例1: オブジェクト情報表示システム（全プロパティを一覧表示）
- 実践例2: 設定管理システム（設定一覧と検索機能）
- 実践例3: データ比較システム（複数オブジェクトの比較）

すべての要件を満たしています。

## まとめ

このレッスンでは、以下のことを学びました。

### 学んだこと

1. **for...inループの基本**
   - `for (let key in object)` の構文
   - プロパティ名を順番に取得
   - `object[key]` で値にアクセス

2. **全プロパティの処理**
   - すべてのプロパティを列挙
   - プロパティ数のカウント
   - 条件付きフィルタリング

3. **hasOwnPropertyメソッド**
   - プロパティの存在確認
   - for...inループとの組み合わせ

4. **実践的なアプリケーション**
   - オブジェクト情報表示システム
   - 設定管理システム
   - データ比較システム

### 重要なポイント

- **ブラケット記法**: `object[key]` を使う（ドット記法は使えない）
- **動的処理**: プロパティ名を事前に知らなくても処理できる
- **型の判定**: `typeof` で型を確認して処理を分岐
- **オブジェクト専用**: 配列にはfor...inループを使わない

for...inループを使えるようになることで、オブジェクトの全プロパティを動的に処理できるようになりました。次のレッスンでは、オブジェクトのコピーについて学んでいきます。
