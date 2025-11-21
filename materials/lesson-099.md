---
title: "レッスン99：createElement/appendChildで追加"
author: "JavaScript Online Lessons"
date: "2025-01-21"
---

# レッスン99：createElement/appendChildで追加

## 今回の学習

前回のレッスンでは、配列からHTMLを生成する方法を学びました：

- forループでHTMLを生成する
- innerHTMLで表示する
- innerHTMLの危険性（XSS攻撃）

今回は、より安全な方法である`createElement`と`appendChild`を使った要素の追加方法を学びます：

- document.createElementで要素を作成する
- appendChildで要素を追加する
- textContentで安全にテキストを設定する
- innerHTMLとの違いを理解する

## 1. createElementの基本

### 要素を作成する

`document.createElement()`を使うと、新しいHTML要素を作成できます：

```javascript
let li = document.createElement("li");
```

これで、メモリ上に`<li></li>`という要素が作成されます。まだ画面には表示されません。

### テキストを設定する

`textContent`プロパティで、要素の中身を設定します：

```javascript
let li = document.createElement("li");
li.textContent = "りんご";
// <li>りんご</li> が作成される
```

`textContent`は自動的にHTMLをエスケープするため、安全です。

### 属性を設定する

`className`や`id`などの属性も設定できます：

```javascript
let div = document.createElement("div");
div.className = "card";
div.id = "item-1";
// <div class="card" id="item-1"></div>
```

## 2. appendChildで追加

### 要素をDOMに追加する

作成した要素を画面に表示するには、`appendChild()`を使います：

```javascript
let ul = document.getElementById("list");
let li = document.createElement("li");
li.textContent = "りんご";

ul.appendChild(li);
// <ul>に<li>が追加される
```

`appendChild()`は、親要素の最後に子要素を追加します。

### 複数の要素を追加

ループを使って、複数の要素を追加できます：

```javascript
let fruits = ["りんご", "バナナ", "みかん"];
let ul = document.getElementById("list");

for (let fruit of fruits) {
  let li = document.createElement("li");
  li.textContent = fruit;
  ul.appendChild(li);
}
```

結果：
```html
<ul id="list">
  <li>りんご</li>
  <li>バナナ</li>
  <li>みかん</li>
</ul>
```

## 3. innerHTMLとの違い

### innerHTMLの場合

```javascript
let html = "";
for (let fruit of fruits) {
  html += "<li>" + fruit + "</li>";
}
ul.innerHTML = html;
```

**問題点**：
- ユーザー入力が含まれるとXSS攻撃の危険性
- 既存の要素がすべて削除・再作成される
- イベントリスナーが失われる

### createElement/appendChildの場合

```javascript
for (let fruit of fruits) {
  let li = document.createElement("li");
  li.textContent = fruit;
  ul.appendChild(li);
}
```

**利点**：
- `textContent`が自動的にエスケープするため安全
- 既存の要素を保持したまま追加できる
- イベントリスナーが維持される
- より細かい制御が可能

## 4. 複雑な要素の作成

### ネストした要素

要素の中に要素を追加することもできます：

```javascript
let card = document.createElement("div");
card.className = "card";

let title = document.createElement("h3");
title.textContent = "商品名";

let price = document.createElement("p");
price.textContent = "100円";

card.appendChild(title);
card.appendChild(price);

document.getElementById("container").appendChild(card);
```

生成されるHTML：
```html
<div class="card">
  <h3>商品名</h3>
  <p>100円</p>
</div>
```

### オブジェクトの配列から生成

```javascript
let products = [
  { name: "ノート", price: 100 },
  { name: "ペン", price: 50 },
  { name: "消しゴム", price: 30 }
];

let container = document.getElementById("container");

for (let product of products) {
  // カード要素を作成
  let card = document.createElement("div");
  card.className = "card";

  // 商品名を作成
  let nameElement = document.createElement("h3");
  nameElement.textContent = product.name;

  // 価格を作成
  let priceElement = document.createElement("p");
  priceElement.textContent = product.price + "円";

  // カードに追加
  card.appendChild(nameElement);
  card.appendChild(priceElement);

  // コンテナに追加
  container.appendChild(card);
}
```

## 5. イベントリスナーの追加

### 作成した要素にイベントを設定

`createElement`で作った要素には、直接イベントリスナーを追加できます：

```javascript
let button = document.createElement("button");
button.textContent = "クリック";

button.addEventListener("click", function() {
  alert("ボタンがクリックされました");
});

document.body.appendChild(button);
```

### 削除ボタンの例

```javascript
for (let i = 0; i < fruits.length; i++) {
  let fruit = fruits[i];

  let li = document.createElement("li");
  li.textContent = fruit + " ";

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "削除";

  deleteButton.addEventListener("click", function() {
    li.remove();  // この要素を削除
  });

  li.appendChild(deleteButton);
  ul.appendChild(li);
}
```

これで、各項目に削除ボタンが付き、クリックするとその項目が削除されます。

## 6. 既存の要素をクリア

### innerHTMLでクリア

```javascript
ul.innerHTML = "";  // すべての子要素を削除
```

簡単ですが、イベントリスナーなどが正しく削除されない場合があります。

### removeChildでクリア

```javascript
while (ul.firstChild) {
  ul.removeChild(ul.firstChild);
}
```

すべての子要素を1つずつ削除します。より確実な方法です。

### replaceChildrenでクリア（新しい方法）

```javascript
ul.replaceChildren();  // すべての子要素を削除
```

モダンなブラウザで使える、シンプルな方法です。

## 7. その他の便利なメソッド

### insertBefore - 途中に挿入

`appendChild()`は最後に追加しますが、`insertBefore()`を使うと途中に挿入できます：

```javascript
let newLi = document.createElement("li");
newLi.textContent = "新しい項目";

let referenceNode = ul.children[1];  // 2番目の要素
ul.insertBefore(newLi, referenceNode);  // 2番目の要素の前に挿入
```

### remove - 要素を削除

要素自身を削除できます：

```javascript
let li = document.getElementById("item-1");
li.remove();  // この要素を削除
```

### cloneNode - 要素を複製

既存の要素を複製できます：

```javascript
let original = document.getElementById("template");
let copy = original.cloneNode(true);  // true = 子要素も含めて複製
document.body.appendChild(copy);
```

## 実践例：TODOリスト

`createElement`/`appendChild`を使ったTODOリストを作ってみましょう：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>TODOリスト</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .todo-item {
      display: flex;
      align-items: center;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .todo-text {
      flex-grow: 1;
      margin-left: 10px;
    }
    .delete-button {
      background-color: #e74c3c;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
    }
    .completed {
      text-decoration: line-through;
      color: #999;
    }
  </style>
</head>
<body>
  <h1>TODOリスト</h1>

  <div>
    <input type="text" id="todoInput" placeholder="TODOを入力">
    <button id="addButton">追加</button>
  </div>

  <div id="todoList"></div>

  <script src="script.js"></script>
</body>
</html>
```

```javascript
let todos = [];
let todoInput = document.getElementById("todoInput");
let addButton = document.getElementById("addButton");
let todoList = document.getElementById("todoList");

addButton.addEventListener("click", function() {
  let text = todoInput.value.trim();
  if (text === "") return;

  // TODOオブジェクトを作成
  let todo = {
    text: text,
    completed: false
  };
  todos.push(todo);

  todoInput.value = "";
  showTodos();
});

function showTodos() {
  // リストをクリア
  todoList.replaceChildren();

  // 各TODOを表示
  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];

    // TODOアイテムのコンテナを作成
    let item = document.createElement("div");
    item.className = "todo-item";

    // チェックボックスを作成
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", function() {
      todo.completed = checkbox.checked;
      showTodos();
    });

    // テキストを作成
    let text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    if (todo.completed) {
      text.classList.add("completed");
    }

    // 削除ボタンを作成
    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function() {
      todos.splice(i, 1);  // 配列から削除
      showTodos();
    });

    // 要素を組み立てる
    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(deleteButton);

    // リストに追加
    todoList.appendChild(item);
  }
}

// Enterキーで追加
todoInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

// 初期表示
showTodos();
```

このコードのポイント：

1. **要素の動的作成**：`createElement`で各TODO項目を作成
2. **イベントリスナーの追加**：チェックボックスと削除ボタンにイベントを設定
3. **クロージャの活用**：各要素が独自の`i`や`todo`を参照
4. **安全性**：`textContent`を使うためXSS攻撃を防げる

## 練習問題

配列のデータから商品カードを作成するアプリを作成してください：

### 要件

1. 商品データの配列（名前、価格、在庫数）
2. 各商品をカード形式で表示（`createElement`/`appendChild`を使用）
3. 「購入」ボタンで在庫数を減らす
4. 在庫がゼロになったら「売り切れ」と表示
5. innerHTMLは使わない

### ヒント

```javascript
let products = [
  { name: "ノート", price: 100, stock: 5 },
  { name: "ペン", price: 50, stock: 10 }
];

function showProducts() {
  container.replaceChildren();  // クリア

  for (let product of products) {
    let card = document.createElement("div");
    card.className = "product-card";

    let name = document.createElement("h3");
    name.textContent = product.name;

    let price = document.createElement("p");
    price.textContent = product.price + "円";

    let button = document.createElement("button");
    button.textContent = "購入";

    button.addEventListener("click", function() {
      if (product.stock > 0) {
        product.stock--;
        showProducts();  // 再表示
      }
    });

    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(button);

    container.appendChild(card);
  }
}
```

## まとめ

今回は、`createElement`と`appendChild`を使った安全な要素の作成方法を学びました：

- **createElement**：新しいHTML要素を作成する
- **appendChild**：要素をDOMに追加する
- **textContent**：安全にテキストを設定する（自動エスケープ）
- **innerHTMLとの違い**：セキュリティ、パフォーマンス、柔軟性
- **イベントリスナー**：作成した要素に直接イベントを追加できる
- **要素の削除**：`remove()`や`replaceChildren()`
- **その他のメソッド**：`insertBefore`、`cloneNode`など

`createElement`/`appendChild`は`innerHTML`より少し複雑ですが、より安全で柔軟な方法です。特にユーザー入力を扱う場合は、この方法を使いましょう。

次のレッスンでは、さらに高度なDOM操作について学びます。
