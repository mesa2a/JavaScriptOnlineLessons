---
title: "レッスン98：配列から表示"
author: "JavaScript Online Lessons"
date: "2025-01-21"
---

# レッスン98：配列から表示

## 今回の学習

前回のレッスンでは、単語帳アプリを作成しました：

- 配列でデータを管理する
- 追加・削除・検索機能
- オブジェクトの配列の扱い方

今回は、配列のデータをHTML要素として表示する方法を学びます：

- 配列の各要素をHTMLに変換する
- forループでHTMLを生成する
- innerHTMLを使った表示更新
- innerHTMLの危険性と対策

## 1. 配列からHTMLを生成

### 基本的な流れ

配列のデータをWebページに表示するには、次の3ステップを行います：

1. 配列をループで1つずつ処理
2. 各要素をHTMLの文字列に変換
3. innerHTMLで画面に表示

```javascript
let fruits = ["りんご", "バナナ", "みかん"];

let html = "";
for (let fruit of fruits) {
  html += "<p>" + fruit + "</p>";
}

document.getElementById("result").innerHTML = html;
```

これで、次のようなHTMLが生成されます：

```html
<p>りんご</p>
<p>バナナ</p>
<p>みかん</p>
```

### HTMLの文字列連結

`+=`を使って、HTMLを少しずつつなげていきます：

```javascript
let html = "";              // 空の文字列から始める
html += "<p>りんご</p>";    // 1つ目を追加
html += "<p>バナナ</p>";    // 2つ目を追加
html += "<p>みかん</p>";    // 3つ目を追加
// html は "<p>りんご</p><p>バナナ</p><p>みかん</p>" になる
```

ループを使うと、配列の要素数に関係なく処理できます。

## 2. リスト表示

### ul/liタグを使う

リスト表示には、`<ul>`と`<li>`タグを使います：

```javascript
let fruits = ["りんご", "バナナ", "みかん"];

let html = "<ul>";
for (let fruit of fruits) {
  html += "<li>" + fruit + "</li>";
}
html += "</ul>";

document.getElementById("result").innerHTML = html;
```

生成されるHTML：

```html
<ul>
  <li>りんご</li>
  <li>バナナ</li>
  <li>みかん</li>
</ul>
```

### 番号付きリスト

`<ol>`タグを使うと、自動的に番号が付きます：

```javascript
let html = "<ol>";
for (let fruit of fruits) {
  html += "<li>" + fruit + "</li>";
}
html += "</ol>";
```

生成されるHTML：

```html
<ol>
  <li>りんご</li>    <!-- 1. りんご -->
  <li>バナナ</li>    <!-- 2. バナナ -->
  <li>みかん</li>    <!-- 3. みかん -->
</ol>
```

### 手動で番号を付ける

通常のforループを使うと、インデックスを利用できます：

```javascript
let html = "<ul>";
for (let i = 0; i < fruits.length; i++) {
  html += "<li>" + (i + 1) + ". " + fruits[i] + "</li>";
}
html += "</ul>";
```

生成されるHTML：

```html
<ul>
  <li>1. りんご</li>
  <li>2. バナナ</li>
  <li>3. みかん</li>
</ul>
```

## 3. 複雑なHTMLの生成

### 複数行のHTMLを作る

改行を使うと、見やすいHTMLが作れます：

```javascript
let html = "";
for (let fruit of fruits) {
  html += "<div>";
  html += "  <h3>" + fruit + "</h3>";
  html += "  <p>おいしい果物です</p>";
  html += "</div>";
}
```

実際は改行されませんが、構造がわかりやすくなります。

### スタイルを追加する

CSSクラスを付けることもできます：

```javascript
let html = "";
for (let i = 0; i < fruits.length; i++) {
  let fruit = fruits[i];
  html += '<div class="fruit-item">';
  html += '  <span class="fruit-name">' + fruit + '</span>';
  html += '</div>';
}
```

HTMLの中で`"`（ダブルクォート）を使いたい時は、外側を`'`（シングルクォート）で囲みます。

## 4. オブジェクトの配列を表示

### オブジェクトのプロパティにアクセス

オブジェクトの配列では、各プロパティを個別に表示できます：

```javascript
let products = [
  { name: "ノート", price: 100 },
  { name: "ペン", price: 50 },
  { name: "消しゴム", price: 30 }
];

let html = "<ul>";
for (let product of products) {
  html += "<li>" + product.name + " - " + product.price + "円</li>";
}
html += "</ul>";
```

生成されるHTML：

```html
<ul>
  <li>ノート - 100円</li>
  <li>ペン - 50円</li>
  <li>消しゴム - 30円</li>
</ul>
```

### カード形式で表示

より複雑なレイアウトも作れます：

```javascript
let html = "";
for (let product of products) {
  html += '<div class="card">';
  html += '  <h3>' + product.name + '</h3>';
  html += '  <p class="price">' + product.price + '円</p>';
  html += '  <button>購入</button>';
  html += '</div>';
}
```

## 5. 条件付き表示

### 条件で表示を変える

if文を使って、条件に応じて表示を変えられます：

```javascript
let scores = [85, 92, 78, 95, 88];

let html = "<ul>";
for (let score of scores) {
  if (score >= 90) {
    html += '<li class="excellent">' + score + '点（優秀！）</li>';
  } else {
    html += '<li>' + score + '点</li>';
  }
}
html += "</ul>";
```

### 特定の要素だけ表示

条件を満たすものだけ表示することもできます：

```javascript
let html = "<ul>";
for (let score of scores) {
  if (score >= 90) {
    html += '<li>' + score + '点</li>';
  }
}
html += "</ul>";
```

90点以上のものだけがリストに追加されます。

## 6. innerHTMLの危険性と対策

### XSS（クロスサイトスクリプティング）の危険性

`innerHTML`にユーザーの入力をそのまま設定すると、**XSS攻撃**という深刻なセキュリティ問題が発生する可能性があります：

```javascript
// 危険な例
let userInput = '<script>alert("攻撃！")</script>';
element.innerHTML = userInput;  // スクリプトが実行されてしまう
```

ユーザーが悪意のあるコードを入力すると、それが実際に実行されてしまいます。

### 実際の攻撃例

単語帳アプリで、次のような入力がされた場合：

```javascript
// ユーザーが入力
english = '<img src=x onerror="alert(\'攻撃\')">';

// そのままinnerHTMLに設定
html += '<li>' + english + '</li>';
element.innerHTML = html;  // 攻撃コードが実行される
```

画像の読み込みエラーを利用して、JavaScriptコードが実行されてしまいます。

### 対策1：textContentを使う

テキストだけを表示する場合は、`textContent`を使います：

```javascript
// 安全な方法
element.textContent = userInput;  // HTMLとして解釈されない
```

`textContent`は文字列をそのまま表示するだけで、HTMLタグを解釈しません：

```javascript
let userInput = '<script>alert("攻撃")</script>';
element.textContent = userInput;
// 画面には「<script>alert("攻撃")</script>」と表示される（実行されない）
```

### 対策2：HTMLエスケープ

HTMLの特殊文字をエスケープ（無害化）する関数を作ります：

```javascript
function escapeHTML(text) {
  let div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// 使い方
let userInput = '<script>alert("攻撃")</script>';
let safe = escapeHTML(userInput);
// safe は "&lt;script&gt;alert(&quot;攻撃&quot;)&lt;/script&gt;" になる

let html = '<li>' + safe + '</li>';
element.innerHTML = html;  // 安全
```

これにより、`<`は`&lt;`、`>`は`&gt;`などに変換され、HTMLタグとして解釈されなくなります。

### 対策3：createElement/appendChildを使う

DOM APIを使って要素を作成する方法が最も安全です：

```javascript
// 安全な方法
let li = document.createElement("li");
li.textContent = userInput;  // 自動的にエスケープされる
ul.appendChild(li);
```

この方法では、ブラウザが自動的にエスケープ処理を行うため、XSS攻撃を防げます。

### 使い分けのガイドライン

1. **ユーザー入力を含まない場合**
   - `innerHTML`を使ってもOK
   - 固定のHTMLを生成する場合

```javascript
// 安全（ユーザー入力を含まない）
let html = '<div class="card"><h3>タイトル</h3></div>';
element.innerHTML = html;
```

2. **ユーザー入力を含む場合**
   - `textContent`またはHTMLエスケープを使う
   - または`createElement`/`appendChild`を使う

```javascript
// 安全（エスケープ処理）
let html = '<li>' + escapeHTML(userInput) + '</li>';
element.innerHTML = html;

// または
let li = document.createElement("li");
li.textContent = userInput;
ul.appendChild(li);
```

### 今回の学習では

このレッスンでは、配列から表示する基本を学ぶため`innerHTML`を使っています。しかし、実際のアプリケーションでは：

- **信頼できるデータ**（自分で定義した配列など）→ `innerHTML`でOK
- **ユーザー入力**を含む場合 → 必ずエスケープ処理か`textContent`を使う

セキュリティは非常に重要です。ユーザー入力を扱う時は、必ず適切な対策を行いましょう。

## 実践例：商品リスト

配列から商品リストを表示するアプリを作ってみましょう：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>商品リスト</title>
  <style>
    .product-card {
      border: 1px solid #ddd;
      padding: 15px;
      margin: 10px 0;
      border-radius: 5px;
    }
    .product-name {
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }
    .product-price {
      font-size: 16px;
      color: #e74c3c;
      margin: 10px 0;
    }
    .product-stock {
      font-size: 14px;
      color: #27ae60;
    }
    .out-of-stock {
      color: #e74c3c;
    }
  </style>
</head>
<body>
  <h1>商品リスト</h1>

  <div>
    <button id="showAll">すべて表示</button>
    <button id="showInStock">在庫ありのみ</button>
    <button id="showCheap">500円以下のみ</button>
  </div>

  <div id="productList"></div>

  <script src="script.js"></script>
</body>
</html>
```

```javascript
let products = [
  { name: "ノート", price: 100, stock: 50 },
  { name: "ペン", price: 50, stock: 0 },
  { name: "消しゴム", price: 30, stock: 20 },
  { name: "定規", price: 150, stock: 15 },
  { name: "ファイル", price: 800, stock: 0 },
  { name: "クリップ", price: 20, stock: 100 }
];

let showAllButton = document.getElementById("showAll");
let showInStockButton = document.getElementById("showInStock");
let showCheapButton = document.getElementById("showCheap");
let productList = document.getElementById("productList");

showAllButton.addEventListener("click", function() {
  showProducts(products);
});

showInStockButton.addEventListener("click", function() {
  let inStock = [];
  for (let product of products) {
    if (product.stock > 0) {
      inStock.push(product);
    }
  }
  showProducts(inStock);
});

showCheapButton.addEventListener("click", function() {
  let cheap = [];
  for (let product of products) {
    if (product.price <= 500) {
      cheap.push(product);
    }
  }
  showProducts(cheap);
});

function showProducts(list) {
  if (list.length === 0) {
    productList.innerHTML = "<p>該当する商品がありません</p>";
    return;
  }

  let html = "";
  for (let product of list) {
    html += '<div class="product-card">';
    html += '  <div class="product-name">' + product.name + '</div>';
    html += '  <div class="product-price">価格: ' + product.price + '円</div>';

    if (product.stock > 0) {
      html += '  <div class="product-stock">在庫: ' + product.stock + '個</div>';
    } else {
      html += '  <div class="product-stock out-of-stock">在庫切れ</div>';
    }

    html += '</div>';
  }

  productList.innerHTML = html;
}

// 初期表示
showProducts(products);
```

このコードのポイント：

1. **配列のフィルタリング**：条件に合うものだけを新しい配列に入れる
2. **関数で表示処理**：`showProducts()`関数で表示をまとめる
3. **条件付き表示**：在庫の有無で表示を変える

## 練習問題

学生の成績リストを表示するアプリを作成してください：

### 要件

1. 学生データの配列を用意（名前とテスト点数）
2. 「すべて表示」ボタンですべての学生を表示
3. 「合格者のみ」ボタンで60点以上の学生のみ表示
4. 各学生をカード形式で表示
5. 合格・不合格の表示も付ける

### ヒント

```javascript
let students = [
  { name: "太郎", score: 85 },
  { name: "花子", score: 55 },
  { name: "次郎", score: 92 }
];

let html = "";
for (let student of students) {
  html += '<div class="student-card">';
  html += '  <h3>' + student.name + '</h3>';
  html += '  <p>' + student.score + '点</p>';

  if (student.score >= 60) {
    html += '  <p class="pass">合格</p>';
  } else {
    html += '  <p class="fail">不合格</p>';
  }

  html += '</div>';
}
```

## まとめ

今回は、配列のデータをHTMLとして表示する方法を学びました：

- **forループでHTML生成**：配列の各要素をHTMLに変換
- **文字列連結**：`+=`でHTMLを少しずつつなげる
- **リスト表示**：`<ul>`/`<li>`や`<ol>`/`<li>`を使う
- **オブジェクトの表示**：プロパティにアクセスして表示
- **条件付き表示**：if文で表示内容を変える
- **フィルタリング**：条件に合うものだけを新しい配列に入れて表示
- **innerHTMLの危険性**：ユーザー入力を含む場合はXSS攻撃に注意
- **セキュリティ対策**：textContent、HTMLエスケープ、またはcreateElement/appendChildを使う

配列のデータをループで処理してHTMLを生成することで、動的なWebページが作れます。ただし、ユーザー入力を扱う際は、必ずセキュリティ対策を行うことが重要です。

次のレッスンでは、配列とDOMの連携をさらに深めていきます。
