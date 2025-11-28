# レッスン138：オブジェクトの配列

**日付**: 2025-11-26

## このレッスンで学ぶこと

このレッスンでは、オブジェクトを要素とする配列について学びます。複数の同じ構造を持つデータをオブジェクトの配列で管理する方法は、実際のアプリケーション開発で最もよく使われるデータ構造の一つです。

## 日常生活での例え

オブジェクトの配列は、**生徒名簿**や**商品カタログ**のようなものです。

- **配列**: 名簿全体（複数のデータをまとめたリスト）
- **各オブジェクト**: 1人1人の生徒情報カード（名前、年齢、成績などの情報セット）

例えば、クラスの生徒名簿を考えてみましょう：

```
生徒名簿（配列）
┌────────────────────────────┐
│ [0] 田中さんのカード       │ ← オブジェクト
│     名前: 田中             │
│     年齢: 18              │
│     成績: A               │
├────────────────────────────┤
│ [1] 佐藤さんのカード       │ ← オブジェクト
│     名前: 佐藤             │
│     年齢: 19              │
│     成績: B               │
├────────────────────────────┤
│ [2] 鈴木さんのカード       │ ← オブジェクト
│     名前: 鈴木             │
│     年齢: 18              │
│     成績: A               │
└────────────────────────────┘
```

それぞれのカードは同じ項目（プロパティ）を持っていますが、内容は異なります。

## オブジェクトの配列とは

**オブジェクトの配列**とは、配列の各要素がオブジェクトになっているデータ構造です。

### 基本的な書き方

```javascript
const products = [
  { name: "ノート", price: 200, stock: 50 },
  { name: "ペン", price: 100, stock: 120 },
  { name: "消しゴム", price: 80, stock: 200 }
];
```

この形式 `[{}, {}, {}]` は、複数の同じ構造を持つデータを管理するのに非常に便利です。

### データ構造の視覚化

```
products 配列
┌─────────────────────────────────────────────┐
│ [0] {                                       │
│       name: "ノート",                       │
│       price: 200,                           │
│       stock: 50                             │
│     }                                       │
├─────────────────────────────────────────────┤
│ [1] {                                       │
│       name: "ペン",                         │
│       price: 100,                           │
│       stock: 120                            │
│     }                                       │
├─────────────────────────────────────────────┤
│ [2] {                                       │
│       name: "消しゴム",                     │
│       price: 80,                            │
│       stock: 200                            │
│     }                                       │
└─────────────────────────────────────────────┘

アクセス方法:
products[0]        → { name: "ノート", price: 200, stock: 50 }
products[0].name   → "ノート"
products[1].price  → 100
products[2].stock  → 200
```

## 要素へのアクセス

配列のインデックスでオブジェクトにアクセスし、さらにドット記法でプロパティにアクセスします。

```javascript
const students = [
  { name: "田中", age: 18, grade: "A" },
  { name: "佐藤", age: 19, grade: "B" },
  { name: "鈴木", age: 18, grade: "A" }
];

// 最初の学生（オブジェクト全体）
console.log(students[0]);
// { name: "田中", age: 18, grade: "A" }

// 最初の学生の名前
console.log(students[0].name);
// "田中"

// 2番目の学生の成績
console.log(students[1].grade);
// "B"
```

### アクセスの仕組み

```
【students[0].name の実行】

ステップ1: students にアクセス
  students = [
    { name: "田中", age: 18, grade: "A" },
    { name: "佐藤", age: 19, grade: "B" },
    { name: "鈴木", age: 18, grade: "A" }
  ]

ステップ2: students[0] にアクセス（配列の0番目）
  students[0] = { name: "田中", age: 18, grade: "A" }

ステップ3: students[0].name にアクセス（オブジェクトのプロパティ）
  結果: "田中"

アクセス経路:
students → [0] → name → "田中"
   ↓       ↓      ↓
  配列   インデックス プロパティ
```

## ループで処理する

オブジェクトの配列を扱う最も一般的な方法は、forループで各オブジェクトを処理することです。

### 全ての要素を表示

```javascript
const products = [
  { name: "ノート", price: 200 },
  { name: "ペン", price: 100 },
  { name: "消しゴム", price: 80 }
];

for (let i = 0; i < products.length; i++) {
  console.log(products[i].name + "：" + products[i].price + "円");
}
// ノート：200円
// ペン：100円
// 消しゴム：80円
```

### 実行の流れ

```
【初期状態】
products = [
  { name: "ノート", price: 200 },
  { name: "ペン", price: 100 },
  { name: "消しゴム", price: 80 }
]

【ループの実行】

i = 0 の時:
  products[0] = { name: "ノート", price: 200 }
  products[0].name = "ノート"
  products[0].price = 200
  出力: "ノート：200円"

i = 1 の時:
  products[1] = { name: "ペン", price: 100 }
  products[1].name = "ペン"
  products[1].price = 100
  出力: "ペン：100円"

i = 2 の時:
  products[2] = { name: "消しゴム", price: 80 }
  products[2].name = "消しゴム"
  products[2].price = 80
  出力: "消しゴム：80円"
```

### 条件に合うデータを探す

```javascript
const books = [
  { title: "JavaScript入門", price: 2800, inStock: true },
  { title: "Webデザイン", price: 3200, inStock: false },
  { title: "データベース基礎", price: 2500, inStock: true }
];

// 在庫がある本を表示
for (let i = 0; i < books.length; i++) {
  if (books[i].inStock === true) {
    console.log(books[i].title + " は在庫があります");
  }
}
// JavaScript入門 は在庫があります
// データベース基礎 は在庫があります
```

### 実行の流れ

```
【ループの実行と条件判定】

i = 0 の時:
  books[0].inStock = true
  条件 true === true → 真
  出力: "JavaScript入門 は在庫があります"

i = 1 の時:
  books[1].inStock = false
  条件 false === true → 偽
  出力なし

i = 2 の時:
  books[2].inStock = true
  条件 true === true → 真
  出力: "データベース基礎 は在庫があります"
```

### 合計を計算

```javascript
const cart = [
  { item: "りんご", price: 150, quantity: 3 },
  { item: "バナナ", price: 200, quantity: 2 },
  { item: "みかん", price: 100, quantity: 5 }
];

let total = 0;
for (let i = 0; i < cart.length; i++) {
  total = total + (cart[i].price * cart[i].quantity);
}
console.log("合計金額：" + total + "円");
// 合計金額：1350円
```

### 実行の流れ

```
【初期状態】
total = 0

【ループの実行と計算】

i = 0 の時:
  cart[0].price = 150
  cart[0].quantity = 3
  計算: 150 × 3 = 450
  total = 0 + 450 = 450

i = 1 の時:
  cart[1].price = 200
  cart[1].quantity = 2
  計算: 200 × 2 = 400
  total = 450 + 400 = 850

i = 2 の時:
  cart[2].price = 100
  cart[2].quantity = 5
  計算: 100 × 5 = 500
  total = 850 + 500 = 1350

【最終結果】
total = 1350
出力: "合計金額：1350円"
```

## 配列に要素を追加

新しいオブジェクトを配列に追加することもできます。

```javascript
const tasks = [
  { title: "買い物", done: false },
  { title: "掃除", done: true }
];

// 新しいタスクを追加
tasks.push({ title: "洗濯", done: false });

console.log(tasks.length);  // 3
console.log(tasks[2].title);  // "洗濯"
```

### 実行の流れ

```
【初期状態】
tasks = [
  { title: "買い物", done: false },
  { title: "掃除", done: true }
]
tasks.length = 2

【push実行後】
tasks = [
  { title: "買い物", done: false },
  { title: "掃除", done: true },
  { title: "洗濯", done: false }  ← 新しく追加された
]
tasks.length = 3

視覚化:
tasks[0] → { title: "買い物", done: false }
tasks[1] → { title: "掃除", done: true }
tasks[2] → { title: "洗濯", done: false } ← 新規追加
```

## 実践例1：商品カタログ表示システム

オブジェクトの配列を使って、商品カタログを表示するシステムを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品カタログ</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            max-width: 1000px;
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

        .catalog {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
        }

        .product-card {
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
            transition: transform 0.3s;
        }

        .product-card:hover {
            transform: translateY(-5px);
        }

        .product-name {
            font-size: 20px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
        }

        .product-price {
            font-size: 28px;
            font-weight: bold;
            color: #764ba2;
            margin: 15px 0;
        }

        .product-category {
            background: #f0f0f0;
            padding: 5px 10px;
            border-radius: 15px;
            display: inline-block;
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
        }

        .product-stock {
            color: #28a745;
            font-weight: bold;
        }

        .out-of-stock {
            color: #dc3545;
            font-weight: bold;
        }

        .summary {
            background: white;
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }

        .summary-title {
            font-size: 20px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 15px;
        }

        .summary-item {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
    </style>
</head>
<body>
    <h1>🛍️ 商品カタログ</h1>
    <div id="summary"></div>
    <div id="catalog" class="catalog"></div>

    <script>
        // オブジェクトの配列
        const products = [
            { name: "ワイヤレスマウス", price: 2500, category: "PC周辺機器", stock: 15 },
            { name: "キーボード", price: 5000, category: "PC周辺機器", stock: 8 },
            { name: "モニター", price: 25000, category: "ディスプレイ", stock: 3 },
            { name: "Webカメラ", price: 7000, category: "PC周辺機器", stock: 12 },
            { name: "ヘッドセット", price: 4500, category: "オーディオ", stock: 0 },
            { name: "USBハブ", price: 1800, category: "PC周辺機器", stock: 20 }
        ];

        const catalogDiv = document.getElementById("catalog");
        const summaryDiv = document.getElementById("summary");

        // 商品カードを表示する関数
        function displayProducts() {
            // 各商品のカードを作成
            for (let i = 0; i < products.length; i++) {
                const product = products[i];

                const card = document.createElement("div");
                card.className = "product-card";

                // 商品名
                const nameDiv = document.createElement("div");
                nameDiv.className = "product-name";
                nameDiv.textContent = product.name;
                card.appendChild(nameDiv);

                // カテゴリ
                const categoryDiv = document.createElement("div");
                categoryDiv.className = "product-category";
                categoryDiv.textContent = product.category;
                card.appendChild(categoryDiv);

                // 価格
                const priceDiv = document.createElement("div");
                priceDiv.className = "product-price";
                priceDiv.textContent = "¥" + product.price.toLocaleString();
                card.appendChild(priceDiv);

                // 在庫状況
                const stockDiv = document.createElement("div");
                if (product.stock > 0) {
                    stockDiv.className = "product-stock";
                    stockDiv.textContent = `在庫: ${product.stock}個`;
                } else {
                    stockDiv.className = "out-of-stock";
                    stockDiv.textContent = "在庫切れ";
                }
                card.appendChild(stockDiv);

                catalogDiv.appendChild(card);
            }
        }

        // 統計情報を表示する関数
        function displaySummary() {
            // 商品総数
            const totalProducts = products.length;

            // 在庫がある商品の数
            let inStockCount = 0;
            for (let i = 0; i < products.length; i++) {
                if (products[i].stock > 0) {
                    inStockCount++;
                }
            }

            // 平均価格
            let totalPrice = 0;
            for (let i = 0; i < products.length; i++) {
                totalPrice = totalPrice + products[i].price;
            }
            const averagePrice = Math.round(totalPrice / products.length);

            // 最も高い商品
            let maxPrice = 0;
            let maxPriceProduct = "";
            for (let i = 0; i < products.length; i++) {
                if (products[i].price > maxPrice) {
                    maxPrice = products[i].price;
                    maxPriceProduct = products[i].name;
                }
            }

            // サマリーを表示
            const summary = document.createElement("div");
            summary.className = "summary";

            summary.innerHTML = `
                <div class="summary-title">📊 カタログ統計</div>
                <div class="summary-item">総商品数: ${totalProducts}点</div>
                <div class="summary-item">在庫あり: ${inStockCount}点</div>
                <div class="summary-item">平均価格: ¥${averagePrice.toLocaleString()}</div>
                <div class="summary-item">最高価格商品: ${maxPriceProduct} (¥${maxPrice.toLocaleString()})</div>
            `;

            summaryDiv.appendChild(summary);
        }

        // 実行
        displaySummary();
        displayProducts();

        // コンソールに詳細な情報を出力
        console.log("=== 商品カタログシステム ===");
        console.log(`総商品数: ${products.length}点`);
        console.log("\n全商品リスト:");
        for (let i = 0; i < products.length; i++) {
            console.log(`${i + 1}. ${products[i].name} - ¥${products[i].price} (在庫: ${products[i].stock}個)`);
        }
    </script>
</body>
</html>
```

### このアプリケーションのポイント

1. **オブジェクトの配列**
   - 6つの商品データを配列で管理
   - 各商品は name, price, category, stock プロパティを持つ

2. **ループ処理**
   - for ループで全商品を表示
   - 条件分岐で在庫状況を判定

3. **統計計算**
   - 在庫がある商品の数をカウント
   - 平均価格を計算
   - 最も高い商品を検索

## 実践例2：タスク管理アプリ

オブジェクトの配列を使って、タスクを管理するアプリを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>タスク管理アプリ</title>
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
            padding: 25px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }

        .stats {
            display: flex;
            justify-content: space-around;
            margin-bottom: 25px;
            padding: 15px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border-radius: 10px;
            color: white;
        }

        .stat-item {
            text-align: center;
        }

        .stat-number {
            font-size: 32px;
            font-weight: bold;
        }

        .stat-label {
            font-size: 14px;
            margin-top: 5px;
        }

        .section {
            margin-bottom: 25px;
        }

        .section-title {
            font-size: 20px;
            font-weight: bold;
            color: #f5576c;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #f5576c;
        }

        .task-list {
            list-style: none;
            padding: 0;
        }

        .task-item {
            padding: 12px;
            margin: 8px 0;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .task-pending {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
        }

        .task-completed {
            background: #d4edda;
            border-left: 4px solid #28a745;
        }

        .task-info {
            flex: 1;
        }

        .task-title {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .task-priority {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 12px;
            font-size: 12px;
            color: white;
        }

        .priority-high {
            background: #dc3545;
        }

        .priority-medium {
            background: #ffc107;
        }

        .priority-low {
            background: #28a745;
        }

        .task-status {
            font-weight: bold;
        }

        .status-pending {
            color: #856404;
        }

        .status-completed {
            color: #155724;
        }
    </style>
</head>
<body>
    <h1>✅ タスク管理アプリ</h1>
    <div class="container">
        <div id="stats" class="stats"></div>
        <div id="taskDisplay"></div>
    </div>

    <script>
        // タスクのオブジェクト配列
        const tasks = [
            { id: 1, title: "プロジェクト企画書作成", priority: "high", done: false },
            { id: 2, title: "メール返信", priority: "medium", done: true },
            { id: 3, title: "週次報告書提出", priority: "high", done: false },
            { id: 4, title: "会議資料準備", priority: "medium", done: false },
            { id: 5, title: "データベース更新", priority: "low", done: true },
            { id: 6, title: "コードレビュー", priority: "high", done: false },
            { id: 7, title: "ドキュメント更新", priority: "low", done: true }
        ];

        const statsDiv = document.getElementById("stats");
        const taskDisplay = document.getElementById("taskDisplay");

        // 統計情報を計算して表示
        function displayStats() {
            // 総タスク数
            const totalTasks = tasks.length;

            // 完了したタスク数
            let completedCount = 0;
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].done === true) {
                    completedCount++;
                }
            }

            // 未完了タスク数
            const pendingCount = totalTasks - completedCount;

            // 高優先度の未完了タスク数
            let highPriorityPending = 0;
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].priority === "high" && tasks[i].done === false) {
                    highPriorityPending++;
                }
            }

            // 統計表示
            statsDiv.innerHTML = `
                <div class="stat-item">
                    <div class="stat-number">${totalTasks}</div>
                    <div class="stat-label">総タスク数</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${completedCount}</div>
                    <div class="stat-label">完了</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${pendingCount}</div>
                    <div class="stat-label">未完了</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${highPriorityPending}</div>
                    <div class="stat-label">高優先度(未完了)</div>
                </div>
            `;
        }

        // タスクを表示
        function displayTasks() {
            // 未完了タスクセクション
            const pendingSection = document.createElement("div");
            pendingSection.className = "section";
            pendingSection.innerHTML = '<div class="section-title">📋 未完了タスク</div>';
            const pendingList = document.createElement("ul");
            pendingList.className = "task-list";

            // 完了タスクセクション
            const completedSection = document.createElement("div");
            completedSection.className = "section";
            completedSection.innerHTML = '<div class="section-title">✔️ 完了タスク</div>';
            const completedList = document.createElement("ul");
            completedList.className = "task-list";

            // タスクを分類して表示
            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i];
                const taskItem = document.createElement("li");

                // 優先度の日本語表記
                let priorityText = "";
                if (task.priority === "high") priorityText = "高";
                else if (task.priority === "medium") priorityText = "中";
                else priorityText = "低";

                // タスクアイテムの作成
                if (task.done === false) {
                    taskItem.className = "task-item task-pending";
                    taskItem.innerHTML = `
                        <div class="task-info">
                            <div class="task-title">${task.title}</div>
                            <span class="task-priority priority-${task.priority}">${priorityText}優先度</span>
                        </div>
                        <div class="task-status status-pending">未完了</div>
                    `;
                    pendingList.appendChild(taskItem);
                } else {
                    taskItem.className = "task-item task-completed";
                    taskItem.innerHTML = `
                        <div class="task-info">
                            <div class="task-title">${task.title}</div>
                            <span class="task-priority priority-${task.priority}">${priorityText}優先度</span>
                        </div>
                        <div class="task-status status-completed">完了</div>
                    `;
                    completedList.appendChild(taskItem);
                }
            }

            pendingSection.appendChild(pendingList);
            completedSection.appendChild(completedList);

            taskDisplay.appendChild(pendingSection);
            taskDisplay.appendChild(completedSection);
        }

        // 実行
        displayStats();
        displayTasks();

        // コンソールに詳細な情報を出力
        console.log("=== タスク管理システム ===");
        console.log(`総タスク数: ${tasks.length}`);
        console.log("\n全タスク:");
        for (let i = 0; i < tasks.length; i++) {
            const status = tasks[i].done ? "✓完了" : "○未完了";
            console.log(`${i + 1}. [${status}] ${tasks[i].title} (優先度: ${tasks[i].priority})`);
        }
    </script>
</body>
</html>
```

### このアプリケーションのポイント

1. **複雑なフィルタリング**
   - done プロパティで完了/未完了を分類
   - priority プロパティで優先度を表示

2. **統計情報の計算**
   - 完了タスク数のカウント
   - 高優先度の未完了タスク数の計算

3. **条件分岐での表示制御**
   - タスクの状態に応じて異なるスタイル
   - 優先度に応じて色分け

## 実践例3：生徒成績一覧システム

オブジェクトの配列を使って、複数の生徒の成績を管理するシステムを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>生徒成績一覧</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            max-width: 1100px;
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
            padding: 25px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }

        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 25px;
        }

        .summary-card {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }

        .summary-number {
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .summary-label {
            font-size: 14px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: bold;
        }

        td {
            padding: 12px;
            border-bottom: 1px solid #e0e0e0;
        }

        tr:hover {
            background: #f0f8ff;
        }

        .grade-A {
            background: #28a745;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: bold;
        }

        .grade-B {
            background: #17a2b8;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: bold;
        }

        .grade-C {
            background: #ffc107;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: bold;
        }

        .rank {
            font-weight: bold;
            color: #4facfe;
        }

        .top-students {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
        }

        .top-title {
            font-weight: bold;
            color: #856404;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <h1>📚 生徒成績一覧システム</h1>
    <div class="container">
        <div id="summary" class="summary-grid"></div>
        <div id="studentTable"></div>
        <div id="topStudents"></div>
    </div>

    <script>
        // 生徒のオブジェクト配列
        const students = [
            { id: 1, name: "田中太郎", math: 85, english: 78, science: 92 },
            { id: 2, name: "佐藤花子", math: 92, english: 88, science: 85 },
            { id: 3, name: "鈴木次郎", math: 78, english: 82, science: 80 },
            { id: 4, name: "高橋美咲", math: 95, english: 90, science: 88 },
            { id: 5, name: "伊藤健太", math: 70, english: 75, science: 72 },
            { id: 6, name: "渡辺愛", math: 88, english: 85, science: 90 },
            { id: 7, name: "山本大輔", math: 82, english: 79, science: 84 },
            { id: 8, name: "中村さくら", math: 90, english: 92, science: 89 }
        ];

        const summaryDiv = document.getElementById("summary");
        const tableDiv = document.getElementById("studentTable");
        const topDiv = document.getElementById("topStudents");

        // 各生徒の平均点を計算して追加
        for (let i = 0; i < students.length; i++) {
            const avg = (students[i].math + students[i].english + students[i].science) / 3;
            students[i].average = Math.round(avg);

            // 成績判定
            if (avg >= 85) {
                students[i].grade = "A";
            } else if (avg >= 75) {
                students[i].grade = "B";
            } else {
                students[i].grade = "C";
            }
        }

        // サマリー情報を表示
        function displaySummary() {
            // 総生徒数
            const totalStudents = students.length;

            // 全体の平均点
            let totalAvg = 0;
            for (let i = 0; i < students.length; i++) {
                totalAvg = totalAvg + students[i].average;
            }
            const classAverage = Math.round(totalAvg / students.length);

            // A評価の生徒数
            let gradeACount = 0;
            for (let i = 0; i < students.length; i++) {
                if (students[i].grade === "A") {
                    gradeACount++;
                }
            }

            // 最高平均点
            let maxAvg = 0;
            for (let i = 0; i < students.length; i++) {
                if (students[i].average > maxAvg) {
                    maxAvg = students[i].average;
                }
            }

            summaryDiv.innerHTML = `
                <div class="summary-card">
                    <div class="summary-number">${totalStudents}</div>
                    <div class="summary-label">総生徒数</div>
                </div>
                <div class="summary-card">
                    <div class="summary-number">${classAverage}</div>
                    <div class="summary-label">クラス平均点</div>
                </div>
                <div class="summary-card">
                    <div class="summary-number">${gradeACount}</div>
                    <div class="summary-label">A評価の生徒</div>
                </div>
                <div class="summary-card">
                    <div class="summary-number">${maxAvg}</div>
                    <div class="summary-label">最高平均点</div>
                </div>
            `;
        }

        // 成績テーブルを表示
        function displayTable() {
            let tableHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>順位</th>
                            <th>氏名</th>
                            <th>数学</th>
                            <th>英語</th>
                            <th>理科</th>
                            <th>平均点</th>
                            <th>評価</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            // 平均点で並び替え（高い順）
            // 簡易的なバブルソート
            for (let i = 0; i < students.length - 1; i++) {
                for (let j = 0; j < students.length - 1 - i; j++) {
                    if (students[j].average < students[j + 1].average) {
                        const temp = students[j];
                        students[j] = students[j + 1];
                        students[j + 1] = temp;
                    }
                }
            }

            // 各生徒を表示
            for (let i = 0; i < students.length; i++) {
                const student = students[i];
                tableHTML += `
                    <tr>
                        <td class="rank">${i + 1}位</td>
                        <td>${student.name}</td>
                        <td>${student.math}点</td>
                        <td>${student.english}点</td>
                        <td>${student.science}点</td>
                        <td><strong>${student.average}点</strong></td>
                        <td><span class="grade-${student.grade}">${student.grade}</span></td>
                    </tr>
                `;
            }

            tableHTML += `
                    </tbody>
                </table>
            `;

            tableDiv.innerHTML = tableHTML;
        }

        // トップ3を表示
        function displayTopStudents() {
            let topHTML = '<div class="top-title">🏆 成績優秀者（トップ3）</div>';

            for (let i = 0; i < 3 && i < students.length; i++) {
                topHTML += `<div>${i + 1}位: ${students[i].name} - 平均${students[i].average}点</div>`;
            }

            topDiv.innerHTML = topHTML;
        }

        // 実行
        displaySummary();
        displayTable();
        displayTopStudents();

        // コンソールに詳細な情報を出力
        console.log("=== 生徒成績一覧システム ===");
        console.log(`総生徒数: ${students.length}名`);
        console.log("\n成績順:");
        for (let i = 0; i < students.length; i++) {
            console.log(`${i + 1}位: ${students[i].name} - 平均${students[i].average}点 (評価: ${students[i].grade})`);
        }
    </script>
</body>
</html>
```

### このアプリケーションのポイント

1. **動的なプロパティ追加**
   - 各生徒に average と grade プロパティを計算して追加
   - ループ内で計算処理を実行

2. **複雑な統計計算**
   - クラス平均点の計算
   - A評価の生徒数のカウント
   - 最高平均点の検索

3. **データの並び替え**
   - 平均点で生徒を順位付け
   - バブルソートを使用

4. **テーブル表示**
   - HTMLテーブルで見やすく表示
   - 順位、各科目の点数、平均点、評価を表示

## よくある処理パターン

### パターン1: 特定の条件でフィルタリング

```javascript
const products = [
  { name: "商品A", price: 1000, inStock: true },
  { name: "商品B", price: 2000, inStock: false },
  { name: "商品C", price: 1500, inStock: true }
];

// 在庫がある商品だけを表示
for (let i = 0; i < products.length; i++) {
  if (products[i].inStock === true) {
    console.log(products[i].name);
  }
}
```

### パターン2: 最大値・最小値の検索

```javascript
const scores = [
  { name: "田中", score: 85 },
  { name: "佐藤", score: 92 },
  { name: "鈴木", score: 78 }
];

// 最高得点を見つける
let maxScore = 0;
let topStudent = "";
for (let i = 0; i < scores.length; i++) {
  if (scores[i].score > maxScore) {
    maxScore = scores[i].score;
    topStudent = scores[i].name;
  }
}
console.log(`最高得点: ${topStudent} - ${maxScore}点`);
```

### パターン3: 集計処理

```javascript
const sales = [
  { product: "りんご", quantity: 10, price: 100 },
  { product: "バナナ", quantity: 5, price: 150 },
  { product: "みかん", quantity: 8, price: 80 }
];

// 売上合計を計算
let totalSales = 0;
for (let i = 0; i < sales.length; i++) {
  totalSales = totalSales + (sales[i].quantity * sales[i].price);
}
console.log(`総売上: ${totalSales}円`);
```

## カリキュラムの仕様チェック

このレッスンで実装した内容が、カリキュラムの仕様を満たしているか確認します。

### カリキュラムの要件

curriculum.md の レッスン138 (行1087-1092):

```
レッスン138:オブジェクトの配列(30分)
□ [{}, {}, {}]の形
□ 複数のデータ管理
□ 商品リスト
【知識】配列とオブジェクトの組み合わせ
✅ 成果物:商品カタログ
```

### 仕様の確認

| 要件 | 実装内容 | 確認 |
|-----|---------|-----|
| [{}, {}, {}]の形 | `const products = [{ name: "ノート", price: 200 }, ...]` の形式を詳しく解説 | ✅ |
| 複数のデータ管理 | 商品、タスク、生徒などの複数データをオブジェクト配列で管理 | ✅ |
| 商品リスト | 実践例1で商品カタログシステムを実装 | ✅ |
| 配列とオブジェクトの組み合わせ | 配列のインデックスとオブジェクトのプロパティアクセスを組み合わせた方法を解説 | ✅ |
| 成果物：商品カタログ | 実践例1で完全な商品カタログ表示システムを実装 | ✅ |

### 詳細な確認

**✅ [{}, {}, {}]の形**
- 基本的な書き方を詳しく解説
- データ構造をASCII図で視覚化
- アクセス方法を実行フローで説明

**✅ 複数のデータ管理**
- 商品データ（6個の商品）
- タスクデータ（7個のタスク）
- 生徒データ（8人の生徒）
- ループでの一括処理方法

**✅ 商品リスト**
- 実践例1: 商品カタログ表示システム
- 商品の名前、価格、カテゴリ、在庫を表示
- 統計情報（総商品数、在庫あり商品数、平均価格、最高価格商品）

**✅ 配列とオブジェクトの組み合わせ**
- `array[i].property` の詳細な説明
- アクセス経路の視覚化
- ループ処理での活用方法

**✅ 成果物：商品カタログ**
- 実践例1: グリッドレイアウトの商品カタログ
- 実践例2: タスク管理アプリ
- 実践例3: 生徒成績一覧システム

すべての要件を満たしています。

## まとめ

このレッスンでは、以下のことを学びました。

### 学んだこと

1. **オブジェクトの配列の基本**
   - `[{}, {}, {}]` の形式
   - 複数の同じ構造のデータを管理
   - `array[i].property` でのアクセス

2. **ループ処理**
   - for ループで全要素を処理
   - 条件分岐で特定のデータを抽出
   - 計算処理で集計や統計

3. **実用的なパターン**
   - フィルタリング（条件に合うデータの抽出）
   - 最大値・最小値の検索
   - 集計処理（合計、平均など）

4. **実践的なアプリケーション**
   - 商品カタログ表示システム
   - タスク管理アプリ
   - 生徒成績一覧システム

### 重要なポイント

- **データ構造**: オブジェクトの配列は実際のアプリケーションで最もよく使われる
- **アクセス方法**: `array[i].property` で配列とオブジェクトを組み合わせる
- **ループ処理**: for ループで効率的に全データを処理
- **統計計算**: カウント、合計、平均、最大値などを計算できる

オブジェクトの配列を扱えるようになることで、実用的なデータ管理システムを作れるようになりました。次のレッスンでは、オブジェクトのメソッドについて学んでいきます。
