---
title: "レッスン99：createElement/appendChildで追加"
author: "JavaScript Online Lessons"
date: "2025-11-26"
---

# レッスン99：createElement/appendChildで追加

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、配列からHTMLを生成する方法を学びました：

```javascript
let fruits = ["りんご", "バナナ", "みかん"];
let html = "";
for (let fruit of fruits) {
  html += "<li>" + fruit + "</li>";
}
ul.innerHTML = html;
```

しかし、この方法には**XSS攻撃の危険性**という重大な問題がありました。

### よくある場面

実際のアプリ開発では：
- ユーザーが入力したデータを画面に表示したい
- TODOリストやコメントリストなど、動的に要素を追加したい
- 安全に、かつ細かく制御しながら要素を追加したい

このような場面で、より安全で柔軟な方法が必要になります。

### 学習目標

このレッスンでは、**DOM API**を使った要素の動的生成方法を学びます：
- `document.createElement()`で新しい要素を作成する
- `appendChild()`で要素を追加する
- `textContent`で安全にテキストを設定する
- innerHTMLとの違いを理解する
- イベントリスナーを持つ要素を動的に作成する

---

## 1. createElement()の基本

### 要素を作成する仕組み

`document.createElement()`は、**メモリ上に新しいHTML要素を作成する**メソッドです：

```javascript
let li = document.createElement("li");
```

#### 実行の流れ

```
ステップ1：createElement()を呼び出す
┌──────────────────────────────────────┐
│ document.createElement("li")         │
│ ↓                                    │
│ "li"という文字列を受け取る           │
└──────────────────────────────────────┘

ステップ2：メモリ上に要素を作成
┌──────────────────────────────────────┐
│ メモリ                               │
│ ┌────────────┐                      │
│ │ <li></li>  │ ← 新しいli要素を作成 │
│ └────────────┘                      │
└──────────────────────────────────────┘

ステップ3：変数に代入
┌──────────────────────────────────────┐
│ let li = <li></li>への参照           │
└──────────────────────────────────────┘

注意：まだ画面には表示されていません！
```

**重要なポイント**：
- 作成した要素は**メモリ上にのみ存在**する
- まだ**DOM tree（画面の構造）に追加されていない**
- 後で`appendChild()`で追加する必要がある

### textContentで内容を設定

作成した要素に文字列を設定するには、`textContent`プロパティを使います：

```javascript
let li = document.createElement("li");
li.textContent = "りんご";
```

#### 実行の流れ

```
初期状態
┌──────────────────────────┐
│ メモリ上のli要素         │
│ <li></li>                │
└──────────────────────────┘

li.textContent = "りんご"; を実行
┌──────────────────────────┐
│ <li>りんご</li>          │
└──────────────────────────┘

textContentの安全性
┌────────────────────────────────────────┐
│ 例：悪意のあるコードを設定しようとする │
│                                        │
│ li.textContent = "<script>alert()</script>"; │
│ ↓                                      │
│ 自動的にHTMLエスケープされる           │
│ ↓                                      │
│ <li>&lt;script&gt;alert()&lt;/script&gt;</li> │
│                                        │
│ 画面には：<script>alert()</script>     │
│ と表示される（実行されない）           │
└────────────────────────────────────────┘
```

**textContentが安全な理由**：
- すべての特殊文字を自動的にエスケープする
- HTMLタグとして解釈されない
- スクリプトが実行されない

### 属性を設定する

要素には、`className`、`id`、`style`などの属性も設定できます：

```javascript
let div = document.createElement("div");
div.className = "card";
div.id = "item-1";
div.style.color = "red";
```

#### 実行の流れ

```
ステップ1：要素を作成
let div = document.createElement("div");
┌──────────────────────────┐
│ <div></div>              │
└──────────────────────────┘

ステップ2：classNameを設定
div.className = "card";
┌──────────────────────────┐
│ <div class="card"></div> │
└──────────────────────────┘

ステップ3：idを設定
div.id = "item-1";
┌───────────────────────────────────┐
│ <div class="card" id="item-1"></div> │
└───────────────────────────────────┘

ステップ4：styleを設定
div.style.color = "red";
┌──────────────────────────────────────────────┐
│ <div class="card" id="item-1" style="color: red;"></div> │
└──────────────────────────────────────────────┘
```

---

## 2. appendChild()で追加

### DOMツリーに追加する

作成した要素を画面に表示するには、**親要素の`appendChild()`メソッド**を使います：

```javascript
let ul = document.getElementById("list");
let li = document.createElement("li");
li.textContent = "りんご";

ul.appendChild(li);
```

#### 実行の流れ

```
初期状態：HTML
┌────────────────────────┐
│ <ul id="list"></ul>    │
└────────────────────────┘

ステップ1：ul要素を取得
let ul = document.getElementById("list");
┌────────────────────────┐
│ ul → <ul id="list">    │
└────────────────────────┘

ステップ2：li要素を作成
let li = document.createElement("li");
┌────────────────────────┐
│ メモリ                 │
│ li → <li></li>         │
└────────────────────────┘

ステップ3：textContentを設定
li.textContent = "りんご";
┌────────────────────────┐
│ メモリ                 │
│ li → <li>りんご</li>   │
└────────────────────────┘

ステップ4：appendChildで追加
ul.appendChild(li);
┌────────────────────────────┐
│ DOMツリー                  │
│ <ul id="list">             │
│   <li>りんご</li> ← 追加！ │
│ </ul>                      │
└────────────────────────────┘

画面に表示される！
```

**appendChild()の動作**：
- 引数として渡された要素を**親要素の最後の子**として追加
- メモリ上の要素が**DOMツリーに接続**される
- 画面に表示される

### 複数の要素を追加

ループを使えば、複数の要素を連続して追加できます：

```javascript
let fruits = ["りんご", "バナナ", "みかん"];
let ul = document.getElementById("list");

for (let fruit of fruits) {
  let li = document.createElement("li");
  li.textContent = fruit;
  ul.appendChild(li);
}
```

#### 実行の流れ（詳細版）

```
初期状態
┌────────────────────────────┐
│ fruits = ["りんご", "バナナ", "みかん"] │
│ <ul id="list"></ul>        │
└────────────────────────────┘

=== 1回目のループ：fruit = "りんご" ===

let li = document.createElement("li");
┌────────────────────────┐
│ メモリ                 │
│ li → <li></li>         │
└────────────────────────┘

li.textContent = fruit;  // "りんご"
┌────────────────────────┐
│ li → <li>りんご</li>   │
└────────────────────────┘

ul.appendChild(li);
┌────────────────────────┐
│ <ul id="list">         │
│   <li>りんご</li>      │
│ </ul>                  │
└────────────────────────┘

=== 2回目のループ：fruit = "バナナ" ===

let li = document.createElement("li");
┌────────────────────────┐
│ メモリ（新しいli）     │
│ li → <li></li>         │
└────────────────────────┘

li.textContent = fruit;  // "バナナ"
┌────────────────────────┐
│ li → <li>バナナ</li>   │
└────────────────────────┘

ul.appendChild(li);
┌────────────────────────┐
│ <ul id="list">         │
│   <li>りんご</li>      │
│   <li>バナナ</li>      │
│ </ul>                  │
└────────────────────────┘

=== 3回目のループ：fruit = "みかん" ===

let li = document.createElement("li");
li.textContent = fruit;  // "みかん"
ul.appendChild(li);

最終結果
┌────────────────────────┐
│ <ul id="list">         │
│   <li>りんご</li>      │
│   <li>バナナ</li>      │
│   <li>みかん</li>      │
│ </ul>                  │
└────────────────────────┘
```

**重要なポイント**：
- 各ループで**新しい`li`変数**が作られる
- 前のループの`li`は上書きされるが、**DOMに追加済みの要素は残る**
- `appendChild()`は**参照を追加する**だけで、変数とは別

---

## 3. innerHTMLとの違い

### innerHTML方式の問題点

前回学んだ`innerHTML`を使う方法：

```javascript
let fruits = ["りんご", "バナナ", "みかん"];
let html = "";
for (let fruit of fruits) {
  html += "<li>" + fruit + "</li>";
}
ul.innerHTML = html;
```

#### innerHTMLの問題点を図解

```
問題1：XSS攻撃の危険性
┌────────────────────────────────────────┐
│ ユーザー入力：<script>alert('攻撃')</script> │
│ ↓                                      │
│ html += "<li>" + userInput + "</li>";  │
│ ↓                                      │
│ <li><script>alert('攻撃')</script></li>│
│ ↓                                      │
│ スクリプトが実行される！（危険）       │
└────────────────────────────────────────┘

問題2：既存の要素がすべて削除される
┌────────────────────────────────────────┐
│ 初期状態                               │
│ <ul>                                   │
│   <li id="special">重要な項目</li>     │
│   <li>項目2</li>                       │
│ </ul>                                  │
│ ↓                                      │
│ ul.innerHTML = "<li>新しい項目</li>";  │
│ ↓                                      │
│ <ul>                                   │
│   <li>新しい項目</li>                  │
│ </ul>                                  │
│ （"重要な項目"が消えた！）             │
└────────────────────────────────────────┘

問題3：イベントリスナーが失われる
┌────────────────────────────────────────┐
│ let button = document.createElement("button"); │
│ button.addEventListener("click", handler); │
│ ul.appendChild(button);                │
│ ↓                                      │
│ ul.innerHTML = "<li>新しい項目</li>";  │
│ ↓                                      │
│ ボタンのclickイベントが失われる！      │
└────────────────────────────────────────┘
```

### createElement/appendChild方式の利点

```javascript
let fruits = ["りんご", "バナナ", "みかん"];
let ul = document.getElementById("list");

for (let fruit of fruits) {
  let li = document.createElement("li");
  li.textContent = fruit;  // 自動エスケープ
  ul.appendChild(li);      // 既存の要素は保持
}
```

#### createElement方式の利点を図解

```
利点1：textContentが自動エスケープ
┌────────────────────────────────────────┐
│ ユーザー入力：<script>alert('攻撃')</script> │
│ ↓                                      │
│ li.textContent = userInput;            │
│ ↓                                      │
│ <li>&lt;script&gt;alert('攻撃')&lt;/script&gt;</li> │
│ ↓                                      │
│ スクリプトとして実行されない（安全）   │
└────────────────────────────────────────┘

利点2：既存の要素を保持
┌────────────────────────────────────────┐
│ <ul>                                   │
│   <li id="special">重要な項目</li>     │
│   <li>項目2</li>                       │
│ </ul>                                  │
│ ↓                                      │
│ let li = document.createElement("li"); │
│ li.textContent = "新しい項目";         │
│ ul.appendChild(li);                    │
│ ↓                                      │
│ <ul>                                   │
│   <li id="special">重要な項目</li>     │
│   <li>項目2</li>                       │
│   <li>新しい項目</li>                  │
│ </ul>                                  │
│ （既存の項目が保持される！）           │
└────────────────────────────────────────┘

利点3：イベントリスナーが維持される
┌────────────────────────────────────────┐
│ let button = document.createElement("button"); │
│ button.addEventListener("click", handler); │
│ ul.appendChild(button);                │
│ ↓                                      │
│ let li = document.createElement("li"); │
│ ul.appendChild(li);                    │
│ ↓                                      │
│ ボタンのclickイベントが維持される！    │
└────────────────────────────────────────┘
```

### 比較表

| 項目 | innerHTML | createElement/appendChild |
|------|-----------|---------------------------|
| 安全性 | ❌ XSS攻撃の危険 | ✅ textContentが自動エスケープ |
| 既存要素 | ❌ すべて削除・再作成 | ✅ 保持したまま追加可能 |
| イベント | ❌ 失われる | ✅ 維持される |
| コード量 | ✅ 短い | ❌ やや長い |
| パフォーマンス | 多数の要素を一括生成は速い | 少数の要素追加は速い |
| 細かい制御 | ❌ 難しい | ✅ 簡単 |

**推奨される使い分け**：
- **ユーザー入力を含む場合**：必ず`createElement/appendChild`
- **静的なHTMLを一括生成**：`innerHTML`も可
- **イベントリスナーが必要**：`createElement/appendChild`

---

## 4. ネストした要素の作成

### 複雑な構造を作る

要素の中に要素を追加することで、複雑な構造を作れます：

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

#### 実行の流れ（DOM tree構築プロセス）

```
ステップ1：div要素を作成
let card = document.createElement("div");
card.className = "card";
┌────────────────────────┐
│ メモリ                 │
│ card → <div class="card"></div> │
└────────────────────────┘

ステップ2：h3要素を作成
let title = document.createElement("h3");
title.textContent = "商品名";
┌────────────────────────┐
│ メモリ                 │
│ title → <h3>商品名</h3> │
└────────────────────────┘

ステップ3：p要素を作成
let price = document.createElement("p");
price.textContent = "100円";
┌────────────────────────┐
│ メモリ                 │
│ price → <p>100円</p>   │
└────────────────────────┘

ステップ4：cardにtitleを追加
card.appendChild(title);
┌────────────────────────┐
│ <div class="card">     │
│   <h3>商品名</h3>      │
│ </div>                 │
└────────────────────────┘

ステップ5：cardにpriceを追加
card.appendChild(price);
┌────────────────────────┐
│ <div class="card">     │
│   <h3>商品名</h3>      │
│   <p>100円</p>         │
│ </div>                 │
└────────────────────────┘

ステップ6：containerにcardを追加
document.getElementById("container").appendChild(card);
┌────────────────────────────┐
│ <div id="container">       │
│   <div class="card">       │
│     <h3>商品名</h3>        │
│     <p>100円</p>           │
│   </div>                   │
│ </div>                     │
└────────────────────────────┘

画面に表示される！
```

**DOM tree構築の仕組み**：

```
親子関係の構造
         container (親)
            |
          card (子、containerの)
         /    \
    title     price (子、cardの)

appendChild()の連鎖
1. title → card に追加
2. price → card に追加
3. card → container に追加

最終的なDOM tree
container
└── card
    ├── title (テキスト: "商品名")
    └── price (テキスト: "100円")
```

### オブジェクト配列から複数のカードを生成

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

#### 実行の流れ（1回目のループ）

```
=== 1回目：product = { name: "ノート", price: 100 } ===

1. カード作成
let card = document.createElement("div");
card.className = "card";
┌────────────────────────┐
│ card → <div class="card"></div> │
└────────────────────────┘

2. 商品名要素作成
let nameElement = document.createElement("h3");
nameElement.textContent = product.name;  // "ノート"
┌────────────────────────┐
│ nameElement → <h3>ノート</h3> │
└────────────────────────┘

3. 価格要素作成
let priceElement = document.createElement("p");
priceElement.textContent = product.price + "円";  // "100円"
┌────────────────────────┐
│ priceElement → <p>100円</p> │
└────────────────────────┘

4. カードに子要素を追加
card.appendChild(nameElement);
card.appendChild(priceElement);
┌────────────────────────┐
│ <div class="card">     │
│   <h3>ノート</h3>      │
│   <p>100円</p>         │
│ </div>                 │
└────────────────────────┘

5. コンテナに追加
container.appendChild(card);
┌────────────────────────────┐
│ <div id="container">       │
│   <div class="card">       │
│     <h3>ノート</h3>        │
│     <p>100円</p>           │
│   </div>                   │
│ </div>                     │
└────────────────────────────┘

2回目、3回目も同様に繰り返し...

最終結果
┌────────────────────────────┐
│ <div id="container">       │
│   <div class="card">       │
│     <h3>ノート</h3>        │
│     <p>100円</p>           │
│   </div>                   │
│   <div class="card">       │
│     <h3>ペン</h3>          │
│     <p>50円</p>            │
│   </div>                   │
│   <div class="card">       │
│     <h3>消しゴム</h3>      │
│     <p>30円</p>            │
│   </div>                   │
│ </div>                     │
└────────────────────────────┘
```

---

## 5. イベントリスナーの追加

### 作成した要素にイベントを設定

`createElement`で作った要素には、**DOMに追加する前でも**イベントリスナーを追加できます：

```javascript
let button = document.createElement("button");
button.textContent = "クリック";

button.addEventListener("click", function() {
  alert("ボタンがクリックされました");
});

document.body.appendChild(button);
```

#### 実行の流れ

```
1. ボタン要素を作成
let button = document.createElement("button");
button.textContent = "クリック";
┌────────────────────────┐
│ メモリ                 │
│ button → <button>クリック</button> │
└────────────────────────┘

2. イベントリスナーを追加
button.addEventListener("click", function() {...});
┌────────────────────────────────────┐
│ <button>クリック</button>          │
│                                    │
│ イベントリスナー:                  │
│   click → function() { alert(...) }│
└────────────────────────────────────┘

3. DOMに追加
document.body.appendChild(button);
┌────────────────────────────────────┐
│ <body>                             │
│   <button>クリック</button>        │
│ </body>                            │
│                                    │
│ イベントリスナーもそのまま保持される│
└────────────────────────────────────┘

4. ユーザーがクリックすると
┌────────────────────────────────────┐
│ クリック！                         │
│ ↓                                  │
│ function() { alert(...) } が実行   │
│ ↓                                  │
│ アラートが表示される               │
└────────────────────────────────────┘
```

### 削除ボタン付きリストの実装

各項目に削除ボタンを付けた例：

```javascript
let fruits = ["りんご", "バナナ", "みかん"];
let ul = document.getElementById("list");

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

#### 実行の流れ（1回目のループ）

```
=== 1回目：i=0, fruit="りんご" ===

1. li要素を作成
let li = document.createElement("li");
li.textContent = fruit + " ";  // "りんご "
┌────────────────────────┐
│ li → <li>りんご </li>  │
└────────────────────────┘

2. 削除ボタンを作成
let deleteButton = document.createElement("button");
deleteButton.textContent = "削除";
┌────────────────────────┐
│ deleteButton → <button>削除</button> │
└────────────────────────┘

3. イベントリスナーを追加（クロージャ）
deleteButton.addEventListener("click", function() {
  li.remove();
});
┌────────────────────────────────────┐
│ <button>削除</button>              │
│                                    │
│ clickイベント:                     │
│   このループのli要素を参照する     │
│   （クロージャにより保持）         │
└────────────────────────────────────┘

4. liにbuttonを追加
li.appendChild(deleteButton);
┌────────────────────────┐
│ <li>                   │
│   りんご               │
│   <button>削除</button>│
│ </li>                  │
└────────────────────────┘

5. ulにliを追加
ul.appendChild(li);
┌────────────────────────┐
│ <ul id="list">         │
│   <li>                 │
│     りんご             │
│     <button>削除</button>│
│   </li>                │
│ </ul>                  │
└────────────────────────┘

クロージャの仕組み
┌────────────────────────────────────┐
│ 1回目のループのスコープ            │
│ ┌────────────────────────────────┐ │
│ │ i = 0                          │ │
│ │ fruit = "りんご"               │ │
│ │ li = <li>りんご <button>...</button></li> │ │
│ │                                │ │
│ │ イベントハンドラはこのliを参照 │ │
│ └────────────────────────────────┘ │
└────────────────────────────────────┘

2回目のループのスコープ
┌────────────────────────────────────┐
│ 2回目のループのスコープ            │
│ ┌────────────────────────────────┐ │
│ │ i = 1                          │ │
│ │ fruit = "バナナ"               │ │
│ │ li = <li>バナナ <button>...</button></li> │ │
│ │                                │ │
│ │ イベントハンドラはこのliを参照 │ │
│ └────────────────────────────────┘ │
└────────────────────────────────────┘

各ボタンは自分の行のli要素を削除する！
```

**クロージャのポイント**：
- 各ループで作られた関数は、**そのループのスコープ**を記憶している
- `deleteButton`をクリックすると、**対応するli要素**が削除される
- 他のli要素には影響しない

---

## 6. 既存の要素をクリア

リストを再描画する前に、既存の要素をクリアする必要があることがあります。

### 方法1：innerHTML = ""

```javascript
ul.innerHTML = "";  // すべての子要素を削除
```

**利点**：シンプルで短い
**欠点**：イベントリスナーが正しく削除されない場合がある（メモリリーク）

### 方法2：removeChild()でループ

```javascript
while (ul.firstChild) {
  ul.removeChild(ul.firstChild);
}
```

#### 実行の流れ

```
初期状態
┌────────────────────────┐
│ <ul>                   │
│   <li>項目1</li>       │
│   <li>項目2</li>       │
│   <li>項目3</li>       │
│ </ul>                  │
└────────────────────────┘

1回目：ul.firstChild = <li>項目1</li>
ul.removeChild(ul.firstChild);
┌────────────────────────┐
│ <ul>                   │
│   <li>項目2</li>       │
│   <li>項目3</li>       │
│ </ul>                  │
└────────────────────────┘

2回目：ul.firstChild = <li>項目2</li>
ul.removeChild(ul.firstChild);
┌────────────────────────┐
│ <ul>                   │
│   <li>項目3</li>       │
│ </ul>                  │
└────────────────────────┘

3回目：ul.firstChild = <li>項目3</li>
ul.removeChild(ul.firstChild);
┌────────────────────────┐
│ <ul></ul>              │
└────────────────────────┘

4回目：ul.firstChild = null
whileループ終了
```

**利点**：確実にすべての子要素を削除
**欠点**：コードがやや長い

### 方法3：replaceChildren()

```javascript
ul.replaceChildren();  // すべての子要素を削除
```

**利点**：シンプルで確実
**欠点**：古いブラウザでは使えない

**推奨**：モダンなブラウザでは`replaceChildren()`、古いブラウザ対応が必要なら`removeChild()`

---

## 7. その他の便利なメソッド

### insertBefore() - 途中に挿入

`appendChild()`は最後に追加しますが、`insertBefore()`を使うと**指定した要素の前**に挿入できます：

```javascript
let newLi = document.createElement("li");
newLi.textContent = "新しい項目";

let referenceNode = ul.children[1];  // 2番目の要素
ul.insertBefore(newLi, referenceNode);  // 2番目の要素の前に挿入
```

#### 実行の流れ

```
初期状態
┌────────────────────────┐
│ <ul>                   │
│   <li>項目1</li>  ← children[0]     │
│   <li>項目2</li>  ← children[1] (referenceNode) │
│   <li>項目3</li>  ← children[2]     │
│ </ul>                  │
└────────────────────────┘

ul.insertBefore(newLi, referenceNode);
┌────────────────────────┐
│ <ul>                   │
│   <li>項目1</li>       │
│   <li>新しい項目</li>  ← ここに挿入│
│   <li>項目2</li>       │
│   <li>項目3</li>       │
│ </ul>                  │
└────────────────────────┘
```

### remove() - 要素を削除

要素自身を削除できます：

```javascript
let li = document.getElementById("item-1");
li.remove();  // この要素をDOMから削除
```

### cloneNode() - 要素を複製

既存の要素を複製できます：

```javascript
let original = document.getElementById("template");
let copy = original.cloneNode(true);  // true = 子要素も含めて複製
copy.id = "template-copy";  // IDを変更
document.body.appendChild(copy);
```

#### cloneNode()の引数

```
cloneNode(false) - シャローコピー
┌────────────────────────┐
│ 元の要素               │
│ <div id="parent">      │
│   <p>子要素</p>        │
│ </div>                 │
└────────────────────────┘
↓ cloneNode(false)
┌────────────────────────┐
│ コピー（子要素なし）   │
│ <div id="parent"></div>│
└────────────────────────┘

cloneNode(true) - ディープコピー
┌────────────────────────┐
│ 元の要素               │
│ <div id="parent">      │
│   <p>子要素</p>        │
│ </div>                 │
└────────────────────────┘
↓ cloneNode(true)
┌────────────────────────┐
│ コピー（子要素も含む） │
│ <div id="parent">      │
│   <p>子要素</p>        │
│ </div>                 │
└────────────────────────┘
```

---

## 8. 実践例：TODOリスト

`createElement`/`appendChild`を使った完全なTODOリストアプリを作ってみましょう。

### HTML

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
      background-color: #f9f9f9;
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
    .delete-button:hover {
      background-color: #c0392b;
    }
    .completed {
      text-decoration: line-through;
      color: #999;
    }
    input[type="text"] {
      width: 70%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 3px;
    }
    #addButton {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      margin-left: 10px;
    }
    #addButton:hover {
      background-color: #2980b9;
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

  <script>
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
  </script>
</body>
</html>
```

### コードの詳細解説

#### ケーススタディ1：TODOを追加する

```
ユーザーの操作
┌────────────────────────────────────┐
│ 1. 入力欄に「買い物に行く」と入力 │
│ 2. 追加ボタンをクリック            │
└────────────────────────────────────┘

addButtonのclickイベント発火
┌────────────────────────────────────┐
│ let text = todoInput.value.trim(); │
│ → text = "買い物に行く"            │
└────────────────────────────────────┘

TODOオブジェクトを作成
┌────────────────────────────────────┐
│ let todo = {                       │
│   text: "買い物に行く",            │
│   completed: false                 │
│ };                                 │
└────────────────────────────────────┘

配列に追加
┌────────────────────────────────────┐
│ todos.push(todo);                  │
│ → todos = [                        │
│     { text: "買い物に行く", completed: false } │
│   ]                                │
└────────────────────────────────────┘

showTodos()を呼び出し
┌────────────────────────────────────┐
│ 画面を再描画                       │
└────────────────────────────────────┘
```

#### ケーススタディ2：showTodos()の実行フロー

```
showTodos()が呼ばれる
┌────────────────────────────────────┐
│ todos = [                          │
│   { text: "買い物に行く", completed: false }, │
│   { text: "勉強する", completed: true }      │
│ ]                                  │
└────────────────────────────────────┘

ステップ1：既存の表示をクリア
todoList.replaceChildren();
┌────────────────────────────────────┐
│ <div id="todoList"></div>          │
│ （空になる）                       │
└────────────────────────────────────┘

ステップ2：ループ1回目（i=0）
┌────────────────────────────────────┐
│ todo = { text: "買い物に行く", completed: false } │
└────────────────────────────────────┘

コンテナを作成
let item = document.createElement("div");
item.className = "todo-item";
┌────────────────────────────────────┐
│ <div class="todo-item"></div>     │
└────────────────────────────────────┘

チェックボックスを作成
let checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = todo.completed;  // false
┌────────────────────────────────────┐
│ <input type="checkbox">            │
└────────────────────────────────────┘

イベントリスナーを追加
checkbox.addEventListener("change", function() {
  todo.completed = checkbox.checked;
  showTodos();
});

テキストを作成
let text = document.createElement("span");
text.className = "todo-text";
text.textContent = todo.text;  // "買い物に行く"
┌────────────────────────────────────┐
│ <span class="todo-text">買い物に行く</span> │
└────────────────────────────────────┘

削除ボタンを作成
let deleteButton = document.createElement("button");
deleteButton.className = "delete-button";
deleteButton.textContent = "削除";
┌────────────────────────────────────┐
│ <button class="delete-button">削除</button> │
└────────────────────────────────────┘

イベントリスナーを追加
deleteButton.addEventListener("click", function() {
  todos.splice(i, 1);  // i=0 の要素を削除
  showTodos();
});

要素を組み立てる
item.appendChild(checkbox);
item.appendChild(text);
item.appendChild(deleteButton);
┌────────────────────────────────────┐
│ <div class="todo-item">            │
│   <input type="checkbox">          │
│   <span class="todo-text">買い物に行く</span> │
│   <button class="delete-button">削除</button> │
│ </div>                             │
└────────────────────────────────────┘

todoListに追加
todoList.appendChild(item);
┌────────────────────────────────────┐
│ <div id="todoList">                │
│   <div class="todo-item">          │
│     <input type="checkbox">        │
│     <span class="todo-text">買い物に行く</span> │
│     <button class="delete-button">削除</button> │
│   </div>                           │
│ </div>                             │
└────────────────────────────────────┘

ステップ3：ループ2回目（i=1）
同様に処理...

最終結果
┌────────────────────────────────────┐
│ <div id="todoList">                │
│   <div class="todo-item">          │
│     <input type="checkbox">        │
│     <span class="todo-text">買い物に行く</span> │
│     <button class="delete-button">削除</button> │
│   </div>                           │
│   <div class="todo-item">          │
│     <input type="checkbox" checked>│
│     <span class="todo-text completed">勉強する</span> │
│     <button class="delete-button">削除</button> │
│   </div>                           │
│ </div>                             │
└────────────────────────────────────┘
```

#### ケーススタディ3：削除ボタンをクリック

```
ユーザーが1つ目のTODOの削除ボタンをクリック
┌────────────────────────────────────┐
│ クリック！                         │
└────────────────────────────────────┘

削除ボタンのイベントハンドラが実行
┌────────────────────────────────────┐
│ function() {                       │
│   todos.splice(i, 1);  // i=0      │
│   showTodos();                     │
│ }                                  │
└────────────────────────────────────┘

配列から削除
┌────────────────────────────────────┐
│ 削除前：                           │
│ todos = [                          │
│   { text: "買い物に行く", completed: false }, │
│   { text: "勉強する", completed: true }      │
│ ]                                  │
│                                    │
│ todos.splice(0, 1); を実行         │
│                                    │
│ 削除後：                           │
│ todos = [                          │
│   { text: "勉強する", completed: true }      │
│ ]                                  │
└────────────────────────────────────┘

showTodos()で再描画
┌────────────────────────────────────┐
│ 画面から「買い物に行く」が消える   │
│ 「勉強する」だけが表示される       │
└────────────────────────────────────┘
```

### このコードのポイント

1. **textContentの使用**
   - すべてのテキスト設定に`textContent`を使用
   - ユーザー入力が含まれても安全（XSS対策）

2. **クロージャの活用**
   - 各イベントハンドラは、対応する`todo`オブジェクトと`i`を参照
   - ループごとに新しいスコープが作られる

3. **再描画パターン**
   - データ（`todos`配列）を変更
   - `showTodos()`で画面を再描画
   - データと画面を常に同期

4. **DOMの効率的な操作**
   - `replaceChildren()`で一度クリア
   - ループで新しい要素を作成・追加
   - イベントリスナーも一緒に設定

---

## 9. 練習問題

### 問題：商品カードアプリ

配列のデータから商品カードを作成するアプリを作成してください。

#### 要件

1. 商品データの配列（名前、価格、在庫数）を用意
2. 各商品をカード形式で表示（`createElement`/`appendChild`を使用）
3. 「購入」ボタンで在庫数を減らす
4. 在庫がゼロになったら「売り切れ」と表示し、ボタンを無効化
5. **innerHTMLは使わない**

#### ヒント

```javascript
let products = [
  { name: "ノート", price: 100, stock: 5 },
  { name: "ペン", price: 50, stock: 10 },
  { name: "消しゴム", price: 30, stock: 0 }
];

let container = document.getElementById("container");

function showProducts() {
  container.replaceChildren();  // クリア

  for (let product of products) {
    // カードを作成
    let card = document.createElement("div");
    card.className = "product-card";

    // 商品名
    let name = document.createElement("h3");
    name.textContent = product.name;

    // 価格
    let price = document.createElement("p");
    price.textContent = product.price + "円";

    // 在庫数
    let stock = document.createElement("p");
    stock.textContent = "在庫: " + product.stock;

    // 購入ボタン
    let button = document.createElement("button");

    if (product.stock > 0) {
      button.textContent = "購入";
      button.addEventListener("click", function() {
        product.stock--;
        showProducts();  // 再描画
      });
    } else {
      button.textContent = "売り切れ";
      button.disabled = true;
    }

    // カードに追加
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(stock);
    card.appendChild(button);

    // コンテナに追加
    container.appendChild(card);
  }
}

showProducts();
```

### 解答例（完全版）

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>商品カードアプリ</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    #container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }
    .product-card {
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .product-card h3 {
      margin-top: 0;
      color: #2c3e50;
    }
    .product-card p {
      color: #555;
      margin: 10px 0;
    }
    .product-card button {
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 10px;
    }
    .product-card button:not(:disabled) {
      background-color: #3498db;
      color: white;
    }
    .product-card button:not(:disabled):hover {
      background-color: #2980b9;
    }
    .product-card button:disabled {
      background-color: #95a5a6;
      color: white;
      cursor: not-allowed;
    }
    .stock-low {
      color: #e74c3c;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>商品一覧</h1>
  <div id="container"></div>

  <script>
    let products = [
      { name: "ノート", price: 100, stock: 5 },
      { name: "ペン", price: 50, stock: 10 },
      { name: "消しゴム", price: 30, stock: 2 },
      { name: "定規", price: 80, stock: 0 },
      { name: "鉛筆", price: 40, stock: 15 }
    ];

    let container = document.getElementById("container");

    function showProducts() {
      // 既存の表示をクリア
      container.replaceChildren();

      // 各商品のカードを作成
      for (let product of products) {
        // カード要素
        let card = document.createElement("div");
        card.className = "product-card";

        // 商品名
        let name = document.createElement("h3");
        name.textContent = product.name;

        // 価格
        let price = document.createElement("p");
        price.textContent = "価格: " + product.price + "円";

        // 在庫数
        let stock = document.createElement("p");
        stock.textContent = "在庫: " + product.stock + "個";

        // 在庫が少ない場合は赤字
        if (product.stock > 0 && product.stock < 3) {
          stock.className = "stock-low";
        }

        // 購入ボタン
        let button = document.createElement("button");

        if (product.stock > 0) {
          button.textContent = "購入する";
          button.addEventListener("click", function() {
            product.stock--;
            showProducts();  // 再描画
          });
        } else {
          button.textContent = "売り切れ";
          button.disabled = true;
        }

        // カードに要素を追加
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(stock);
        card.appendChild(button);

        // コンテナに追加
        container.appendChild(card);
      }
    }

    // 初期表示
    showProducts();
  </script>
</body>
</html>
```

#### 解答の実行フロー

```
初期表示：showProducts()が呼ばれる
┌────────────────────────────────────┐
│ products = [                       │
│   { name: "ノート", price: 100, stock: 5 }, │
│   { name: "ペン", price: 50, stock: 10 },   │
│   ...                              │
│ ]                                  │
└────────────────────────────────────┘

container.replaceChildren();
┌────────────────────────────────────┐
│ <div id="container"></div>         │
│ （空）                             │
└────────────────────────────────────┘

1回目のループ：product = { name: "ノート", ... }
┌────────────────────────────────────┐
│ card = <div class="product-card">  │
│   <h3>ノート</h3>                  │
│   <p>価格: 100円</p>               │
│   <p>在庫: 5個</p>                 │
│   <button>購入する</button>        │
│ </div>                             │
└────────────────────────────────────┘

container.appendChild(card);
┌────────────────────────────────────┐
│ <div id="container">               │
│   <div class="product-card">       │
│     <h3>ノート</h3>                │
│     ...                            │
│   </div>                           │
│ </div>                             │
└────────────────────────────────────┘

ユーザーが「ノート」の購入ボタンをクリック
┌────────────────────────────────────┐
│ イベントハンドラ実行               │
│ product.stock--;  // 5 → 4         │
│ showProducts();   // 再描画        │
└────────────────────────────────────┘

再描画後
┌────────────────────────────────────┐
│ <div class="product-card">         │
│   <h3>ノート</h3>                  │
│   <p>価格: 100円</p>               │
│   <p>在庫: 4個</p> ← 更新！        │
│   <button>購入する</button>        │
│ </div>                             │
└────────────────────────────────────┘
```

---

## まとめ

今回は、**createElement**と**appendChild**を使った安全で柔軟な要素の作成方法を学びました：

### 学んだこと

1. **createElement()**：新しいHTML要素をメモリ上に作成する
2. **appendChild()**：要素をDOMツリーに追加する
3. **textContent**：安全にテキストを設定する（自動エスケープ）
4. **innerHTMLとの違い**：
   - セキュリティ：textContentは安全
   - 既存要素：appendChildは保持
   - イベント：appendChildは維持
5. **イベントリスナー**：作成した要素に直接イベントを追加できる
6. **要素の削除**：`remove()`や`replaceChildren()`
7. **その他のメソッド**：`insertBefore`、`cloneNode`など

### createElement/appendChildを使うべき場面

✅ ユーザー入力を含む場合（XSS対策）
✅ イベントリスナーが必要な場合
✅ 既存の要素を保持したい場合
✅ 細かい制御が必要な場合

### innerHTMLを使っても良い場面

✅ 完全に静的なHTMLを一括生成する場合
✅ ユーザー入力が一切含まれない場合

**重要**：迷ったら`createElement/appendChild`を使いましょう。より安全で柔軟です。

---

## カリキュラムの要件をチェック

このレッスンで扱った内容：

✅ `document.createElement("li")` - 要素の動的作成
✅ 要素を動的作成 - メモリ上に新しいHTML要素を作成
✅ `appendChild()`で追加 - DOMツリーに要素を追加
✅ 【知識】DOM API - `createElement`, `appendChild`, `textContent`などのメソッド
✅ 【知識】要素の動的生成 - JavaScriptでHTMLを生成する仕組み
✅ 成果物：動的リスト生成 - TODOリスト、商品カードアプリ

すべての要件を満たしています！

---

次のレッスンでは、**リストの更新**について学びます。配列が変わったときに、画面をどのように更新するか、効率的な再描画の方法を学びましょう！
