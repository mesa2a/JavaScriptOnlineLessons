---
title: "レッスン98：配列から表示"
author: "JavaScript Online Lessons"
date: "2025-11-26"
---

# レッスン98：配列から表示

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、単語帳アプリを作成しました：

- オブジェクトの配列でデータを管理（`[{english: "apple", japanese: "りんご"}]`）
- CRUD操作（追加・検索・削除）の実装
- 配列操作の総復習

単語帳アプリでは、配列のデータをHTML文字列に変換して表示していました。

### よくある場面

日常のプログラミングでは、こんな場面に遭遇します：

「配列に入っているデータを、Webページに一覧表示したい」
「ユーザーに見やすい形で、配列の中身を表示したい」
「配列の各要素を、HTMLのリストとして表示したい」

これらを実現するには、配列をループしてHTMLを生成する技術が必要です。

### 学習目標

このレッスンでは、配列のデータをHTML要素として表示する方法を学びます：

1. **配列の各要素をHTML表示** - forループでHTMLを生成
2. **forループで生成** - 文字列連結でHTML文字列を作る
3. **innerHTML使用** - 生成したHTMLを画面に表示
4. **動的HTML生成** - データに応じて表示を変える

配列のデータを視覚的に表示する重要な技術です。

---

## 1. 配列からHTMLを生成する基本

### 3ステップの流れ

配列のデータをWebページに表示するには、次の3ステップを行います：

```
ステップ1: 配列をループで1つずつ処理
  ↓
ステップ2: 各要素をHTMLの文字列に変換
  ↓
ステップ3: innerHTMLで画面に表示
```

### 基本的なコード

```javascript
let fruits = ["りんご", "バナナ", "みかん"];

let html = "";
for (let fruit of fruits) {
  html += "<p>" + fruit + "</p>";
}

document.getElementById("result").innerHTML = html;
```

**実行の流れ：**

```
ステップ1: 初期状態
  fruits = ["りんご", "バナナ", "みかん"]
  html = ""（空の文字列）

ステップ2: forループで処理

  1回目のループ:
    fruit = "りんご"
    html += "<p>" + "りんご" + "</p>"
    html = "" + "<p>りんご</p>"
    html = "<p>りんご</p>"

  2回目のループ:
    fruit = "バナナ"
    html += "<p>" + "バナナ" + "</p>"
    html = "<p>りんご</p>" + "<p>バナナ</p>"
    html = "<p>りんご</p><p>バナナ</p>"

  3回目のループ:
    fruit = "みかん"
    html += "<p>" + "みかん" + "</p>"
    html = "<p>りんご</p><p>バナナ</p>" + "<p>みかん</p>"
    html = "<p>りんご</p><p>バナナ</p><p>みかん</p>"

ステップ3: innerHTMLで表示
  document.getElementById("result").innerHTML = html

  result要素の中身が以下のHTMLになる:
    <p>りんご</p>
    <p>バナナ</p>
    <p>みかん</p>
```

**図解：文字列の連結過程**

```
初期状態:
  html = ""

1回目:
  html = "" + "<p>りんご</p>"
       = "<p>りんご</p>"

2回目:
  html = "<p>りんご</p>" + "<p>バナナ</p>"
       = "<p>りんご</p><p>バナナ</p>"

3回目:
  html = "<p>りんご</p><p>バナナ</p>" + "<p>みかん</p>"
       = "<p>りんご</p><p>バナナ</p><p>みかん</p>"
```

### HTMLの文字列連結

`+=`演算子を使って、HTMLを少しずつつなげていきます：

```javascript
let html = "";              // 空の文字列から始める
html += "<p>りんご</p>";    // 1つ目を追加
html += "<p>バナナ</p>";    // 2つ目を追加
html += "<p>みかん</p>";    // 3つ目を追加
// html は "<p>りんご</p><p>バナナ</p><p>みかん</p>" になる
```

**ポイント：**
- `+=`は「現在の値に追加する」という意味
- `html += "新しい部分"`は`html = html + "新しい部分"`と同じ
- ループを使うと、配列の要素数に関係なく処理できる

---

## 2. リスト表示の基本

### ul/liタグを使う

リスト表示には、`<ul>`（箇条書きリスト）と`<li>`（リスト項目）タグを使います：

```javascript
let fruits = ["りんご", "バナナ", "みかん"];

let html = "<ul>";
for (let fruit of fruits) {
  html += "<li>" + fruit + "</li>";
}
html += "</ul>";

document.getElementById("result").innerHTML = html;
```

**実行の流れ：**

```
ステップ1: 開始タグを追加
  html = "<ul>"

ステップ2: forループで各項目を追加

  1回目:
    html = "<ul>" + "<li>りんご</li>"
    html = "<ul><li>りんご</li>"

  2回目:
    html = "<ul><li>りんご</li>" + "<li>バナナ</li>"
    html = "<ul><li>りんご</li><li>バナナ</li>"

  3回目:
    html = "<ul><li>りんご</li><li>バナナ</li>" + "<li>みかん</li>"
    html = "<ul><li>りんご</li><li>バナナ</li><li>みかん</li>"

ステップ3: 終了タグを追加
  html += "</ul>"
  html = "<ul><li>りんご</li><li>バナナ</li><li>みかん</li></ul>"

ステップ4: 画面に表示
  innerHTML = html
```

**生成されるHTML：**

```html
<ul>
  <li>りんご</li>
  <li>バナナ</li>
  <li>みかん</li>
</ul>
```

**表示結果：**

```
• りんご
• バナナ
• みかん
```

### 番号付きリスト

`<ol>`（順序付きリスト）タグを使うと、自動的に番号が付きます：

```javascript
let html = "<ol>";
for (let fruit of fruits) {
  html += "<li>" + fruit + "</li>";
}
html += "</ol>";
```

**生成されるHTML：**

```html
<ol>
  <li>りんご</li>
  <li>バナナ</li>
  <li>みかん</li>
</ol>
```

**表示結果：**

```
1. りんご
2. バナナ
3. みかん
```

`<ul>`と`<ol>`の違いは、開始・終了タグだけです。

### 手動で番号を付ける

通常のforループを使うと、インデックスを利用して番号を付けられます：

```javascript
let html = "<ul>";
for (let i = 0; i < fruits.length; i++) {
  html += "<li>" + (i + 1) + ". " + fruits[i] + "</li>";
}
html += "</ul>";
```

**実行の流れ：**

```
配列: fruits = ["りんご", "バナナ", "みかん"]

ループ処理:
  i = 0:
    (i + 1) = 1
    fruits[i] = fruits[0] = "りんご"
    html += "<li>1. りんご</li>"

  i = 1:
    (i + 1) = 2
    fruits[i] = fruits[1] = "バナナ"
    html += "<li>2. バナナ</li>"

  i = 2:
    (i + 1) = 3
    fruits[i] = fruits[2] = "みかん"
    html += "<li>3. みかん</li>"
```

**生成されるHTML：**

```html
<ul>
  <li>1. りんご</li>
  <li>2. バナナ</li>
  <li>3. みかん</li>
</ul>
```

**ポイント：**
- `i`は0から始まるので、`i + 1`で1から始まる番号にする
- `fruits[i]`でi番目の要素にアクセス

---

## 3. 複雑なHTMLの生成

### 複数行のHTMLを作る

より複雑な構造のHTMLも作れます：

```javascript
let html = "";
for (let fruit of fruits) {
  html += "<div>";
  html += "  <h3>" + fruit + "</h3>";
  html += "  <p>おいしい果物です</p>";
  html += "</div>";
}
```

**実行の流れ（1回目のループ）：**

```
fruit = "りんご"

html += "<div>"
html = "<div>"

html += "  <h3>" + "りんご" + "</h3>"
html = "<div>  <h3>りんご</h3>"

html += "  <p>おいしい果物です</p>"
html = "<div>  <h3>りんご</h3>  <p>おいしい果物です</p>"

html += "</div>"
html = "<div>  <h3>りんご</h3>  <p>おいしい果物です</p></div>"
```

**ポイント：**
- 複数の`+=`で少しずつHTMLを組み立てる
- JavaScriptの文字列には改行が含まれないので、実際のHTMLには改行は入らない
- しかし、コードの構造がわかりやすくなる

### スタイルを追加する

CSSクラスを付けて、見た目を整えることもできます：

```javascript
let html = "";
for (let i = 0; i < fruits.length; i++) {
  let fruit = fruits[i];
  html += '<div class="fruit-item">';
  html += '  <span class="fruit-name">' + fruit + '</span>';
  html += '  <span class="fruit-number">No.' + (i + 1) + '</span>';
  html += '</div>';
}
```

**実行の流れ（1回目のループ）：**

```
i = 0
fruit = "りんご"

html += '<div class="fruit-item">'
html = '<div class="fruit-item">'

html += '  <span class="fruit-name">' + "りんご" + '</span>'
html = '<div class="fruit-item">  <span class="fruit-name">りんご</span>'

html += '  <span class="fruit-number">No.' + 1 + '</span>'
html = '<div class="fruit-item">  <span class="fruit-name">りんご</span>  <span class="fruit-number">No.1</span>'

html += '</div>'
html = '<div class="fruit-item">  <span class="fruit-name">りんご</span>  <span class="fruit-number">No.1</span></div>'
```

**ポイント：**
- HTMLの中で`"`を使いたい時は、外側を`'`（シングルクォート）で囲む
- 逆に、HTMLの中で`'`を使いたい時は、外側を`"`（ダブルクォート）で囲む

**引用符の使い分け：**

```javascript
// ケース1: 外側がダブルクォート、内側がシングルクォート
html += "<div class='fruit-item'>";

// ケース2: 外側がシングルクォート、内側がダブルクォート
html += '<div class="fruit-item">';

// どちらでも同じ結果になる
```

---

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

document.getElementById("result").innerHTML = html;
```

**実行の流れ：**

```
配列の状態:
  products = [
    { name: "ノート", price: 100 },
    { name: "ペン", price: 50 },
    { name: "消しゴム", price: 30 }
  ]

ループ処理:

  1回目:
    product = { name: "ノート", price: 100 }
    product.name = "ノート"
    product.price = 100

    html += "<li>" + "ノート" + " - " + 100 + "円</li>"
    html += "<li>ノート - 100円</li>"

  2回目:
    product = { name: "ペン", price: 50 }
    product.name = "ペン"
    product.price = 50

    html += "<li>" + "ペン" + " - " + 50 + "円</li>"
    html += "<li>ペン - 50円</li>"

  3回目:
    product = { name: "消しゴム", price: 30 }
    product.name = "消しゴム"
    product.price = 30

    html += "<li>" + "消しゴム" + " - " + 30 + "円</li>"
    html += "<li>消しゴム - 30円</li>"

最終的なHTML:
  <ul>
    <li>ノート - 100円</li>
    <li>ペン - 50円</li>
    <li>消しゴム - 30円</li>
  </ul>
```

**図解：オブジェクトの配列の構造**

```
products配列:
  [
    オブジェクト0 ──┬─ name: "ノート"
                   └─ price: 100

    オブジェクト1 ──┬─ name: "ペン"
                   └─ price: 50

    オブジェクト2 ──┬─ name: "消しゴム"
                   └─ price: 30
  ]

アクセス方法:
  products[0].name → "ノート"
  products[0].price → 100
  products[1].name → "ペン"
  ...
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

document.getElementById("result").innerHTML = html;
```

**生成されるHTML（1つ分）：**

```html
<div class="card">
  <h3>ノート</h3>
  <p class="price">100円</p>
  <button>購入</button>
</div>
```

**CSSと組み合わせた表示例：**

```css
.card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px;
  border-radius: 5px;
}

.price {
  color: #e74c3c;
  font-size: 18px;
  font-weight: bold;
}
```

---

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

document.getElementById("result").innerHTML = html;
```

**実行の流れ：**

```
配列: scores = [85, 92, 78, 95, 88]

ループ処理:

  1回目: score = 85
    85 >= 90 ? → false
    else側を実行
    html += '<li>85点</li>'

  2回目: score = 92
    92 >= 90 ? → true
    if側を実行
    html += '<li class="excellent">92点（優秀！）</li>'

  3回目: score = 78
    78 >= 90 ? → false
    else側を実行
    html += '<li>78点</li>'

  4回目: score = 95
    95 >= 90 ? → true
    if側を実行
    html += '<li class="excellent">95点（優秀！）</li>'

  5回目: score = 88
    88 >= 90 ? → false
    else側を実行
    html += '<li>88点</li>'

最終的なHTML:
  <ul>
    <li>85点</li>
    <li class="excellent">92点（優秀！）</li>
    <li>78点</li>
    <li class="excellent">95点（優秀！）</li>
    <li>88点</li>
  </ul>
```

**CSSで見た目を変える：**

```css
.excellent {
  color: #27ae60;
  font-weight: bold;
  background-color: #d4edda;
}
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

**実行の流れ：**

```
配列: scores = [85, 92, 78, 95, 88]

ループ処理:

  1回目: score = 85
    85 >= 90 ? → false
    何もしない（スキップ）

  2回目: score = 92
    92 >= 90 ? → true
    html += '<li>92点</li>'

  3回目: score = 78
    78 >= 90 ? → false
    何もしない（スキップ）

  4回目: score = 95
    95 >= 90 ? → true
    html += '<li>95点</li>'

  5回目: score = 88
    88 >= 90 ? → false
    何もしない（スキップ）

最終的なHTML:
  <ul>
    <li>92点</li>
    <li>95点</li>
  </ul>
```

90点以上のものだけがリストに追加されます。

### フィルタリングの別の方法

先に条件を満たすものだけを新しい配列に入れて、それを表示することもできます：

```javascript
// ステップ1: フィルタリング
let highScores = [];
for (let score of scores) {
  if (score >= 90) {
    highScores.push(score);
  }
}

// ステップ2: 表示
let html = "<ul>";
for (let score of highScores) {
  html += '<li>' + score + '点</li>';
}
html += "</ul>";
```

**実行の流れ：**

```
元の配列:
  scores = [85, 92, 78, 95, 88]

ステップ1: フィルタリング
  highScores = []

  score = 85 → 85 >= 90 ? → false → 追加しない
  score = 92 → 92 >= 90 ? → true → push(92)
  highScores = [92]

  score = 78 → 78 >= 90 ? → false → 追加しない
  score = 95 → 95 >= 90 ? → true → push(95)
  highScores = [92, 95]

  score = 88 → 88 >= 90 ? → false → 追加しない

  最終: highScores = [92, 95]

ステップ2: 表示
  highScoresをループして表示
  <ul><li>92点</li><li>95点</li></ul>
```

---

## 6. innerHTMLの危険性と対策

### XSS（クロスサイトスクリプティング）の危険性

`innerHTML`にユーザーの入力をそのまま設定すると、**XSS攻撃**という深刻なセキュリティ問題が発生する可能性があります。

**危険な例：**

```javascript
// ユーザーからの入力
let userInput = '<script>alert("攻撃！")</script>';

// そのままinnerHTMLに設定
element.innerHTML = userInput;  // スクリプトが実行されてしまう！
```

**何が起こるか：**

```
ステップ1: ユーザーが悪意のあるコードを入力
  userInput = '<script>alert("攻撃！")</script>'

ステップ2: innerHTMLに設定
  element.innerHTML = userInput

ステップ3: ブラウザがHTMLとして解釈
  <script>タグとして認識される
  ↓
  JavaScriptコードが実行される
  ↓
  alert("攻撃！")が表示される

問題:
  もっと悪質なコードなら、
  - ユーザーの個人情報を盗む
  - 別のサイトにデータを送信する
  - Webページを改ざんする
  など、深刻な被害が発生する可能性がある
```

### 実際の攻撃例

単語帳アプリで、次のような入力がされた場合：

```javascript
// ユーザーが英単語として入力
english = '<img src=x onerror="alert(\'攻撃\')">';

// そのままHTML生成
html += '<li>' + english + '</li>';
element.innerHTML = html;  // 攻撃コードが実行される
```

**実行の流れ：**

```
入力:
  english = '<img src=x onerror="alert(\'攻撃\')">'

HTML生成:
  html = '<li><img src=x onerror="alert(\'攻撃\')"></li>'

innerHTMLに設定:
  element.innerHTML = html

ブラウザの処理:
  <img src=x> → 画像を読み込もうとする
  src=x → 存在しない画像なので読み込み失敗
  onerror="..." → エラー時のイベントが発火
  alert('攻撃') → JavaScriptコードが実行される
```

画像の読み込みエラーを利用して、JavaScriptコードが実行されてしまいます。

### 対策1：textContentを使う

テキストだけを表示する場合は、`textContent`を使います：

```javascript
// 安全な方法
element.textContent = userInput;  // HTMLとして解釈されない
```

**動作の違い：**

```
【innerHTML】
let userInput = '<script>alert("攻撃")</script>';
element.innerHTML = userInput;

→ <script>タグとして解釈される
→ JavaScriptコードが実行される（危険）

【textContent】
let userInput = '<script>alert("攻撃")</script>';
element.textContent = userInput;

→ テキストとしてそのまま表示される
→ 画面には「<script>alert("攻撃")</script>」という文字列が表示される
→ JavaScriptコードは実行されない（安全）
```

**ポイント：**
- `textContent`はHTMLタグを解釈しない
- すべて「ただの文字列」として扱う
- HTMLタグを表示したい場合には使えない

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

**動作の説明：**

```
escapeHTML('<script>alert("攻撃")</script>')の処理:

ステップ1: divを作成
  let div = document.createElement("div");

ステップ2: textContentに設定
  div.textContent = '<script>alert("攻撃")</script>';

  div要素の中身（内部表現）:
    &lt;script&gt;alert(&quot;攻撃&quot;)&lt;/script&gt;

  特殊文字が自動的にエスケープされる:
    < → &lt;
    > → &gt;
    " → &quot;

ステップ3: innerHTMLで取得
  return div.innerHTML;
  → "&lt;script&gt;alert(&quot;攻撃&quot;)&lt;/script&gt;"

使用:
  html = '<li>&lt;script&gt;alert(&quot;攻撃&quot;)&lt;/script&gt;</li>'
  element.innerHTML = html;

  画面には「<script>alert("攻撃")</script>」という文字列が表示される
  HTMLタグとしては解釈されない
```

**エスケープの変換表：**

```
変換前 → 変換後
<      → &lt;
>      → &gt;
"      → &quot;
'      → &#39;
&      → &amp;
```

### 対策3：createElement/appendChildを使う

DOM APIを使って要素を作成する方法が最も安全です：

```javascript
// 安全な方法
let li = document.createElement("li");
li.textContent = userInput;  // 自動的にエスケープされる
ul.appendChild(li);
```

**動作の流れ：**

```
ステップ1: 要素を作成
  let li = document.createElement("li");
  → <li></li>という要素を作成（メモリ上）

ステップ2: テキストを設定
  li.textContent = '<script>alert("攻撃")</script>';
  → ブラウザが自動的にエスケープ
  → <li>&lt;script&gt;...</li>

ステップ3: DOMに追加
  ul.appendChild(li);
  → 画面に反映される
  → 安全
```

この方法では、ブラウザが自動的にエスケープ処理を行うため、XSS攻撃を防げます。

### 使い分けのガイドライン

**1. ユーザー入力を含まない場合**

```javascript
// 安全（ユーザー入力を含まない）
let html = '<div class="card"><h3>タイトル</h3></div>';
element.innerHTML = html;  // OK
```

**2. ユーザー入力を含む場合**

```javascript
// 方法1: textContentを使う
element.textContent = userInput;

// 方法2: HTMLエスケープを使う
let html = '<li>' + escapeHTML(userInput) + '</li>';
element.innerHTML = html;

// 方法3: createElementを使う
let li = document.createElement("li");
li.textContent = userInput;
ul.appendChild(li);
```

**判断基準：**

```
データの種類:
  信頼できる（自分で定義した配列など）
    → innerHTMLでOK

  ユーザー入力を含む
    → 必ずエスケープ処理 or textContent or createElement
```

### 今回の学習では

このレッスンでは、配列から表示する基本を学ぶため`innerHTML`を使っています。

しかし、実際のアプリケーションでは：

- **信頼できるデータ**（自分で定義した配列など）→ `innerHTML`でOK
- **ユーザー入力**を含む場合 → 必ずエスケープ処理か`textContent`を使う

**セキュリティは非常に重要**です。ユーザー入力を扱う時は、必ず適切な対策を行いましょう。

---

## 7. 実践例：商品リスト

配列から商品リストを表示するアプリを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>商品リスト</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    h1 {
      color: #333;
      text-align: center;
    }
    .buttons {
      text-align: center;
      margin: 20px 0;
    }
    button {
      padding: 10px 20px;
      margin: 0 5px;
      font-size: 16px;
      cursor: pointer;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:hover {
      background-color: #45a049;
    }
    .product-card {
      background: white;
      border: 1px solid #ddd;
      padding: 20px;
      margin: 15px 0;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .product-name {
      font-size: 20px;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }
    .product-price {
      font-size: 18px;
      color: #e74c3c;
      margin: 10px 0;
    }
    .product-stock {
      font-size: 16px;
      color: #27ae60;
    }
    .out-of-stock {
      color: #e74c3c;
    }
    .empty-message {
      text-align: center;
      color: #999;
      font-style: italic;
      padding: 40px;
    }
  </style>
</head>
<body>
  <h1>商品リスト</h1>

  <div class="buttons">
    <button id="showAll">すべて表示</button>
    <button id="showInStock">在庫ありのみ</button>
    <button id="showCheap">500円以下のみ</button>
  </div>

  <div id="productList"></div>

  <script src="script.js"></script>
</body>
</html>
```

### JavaScript

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
    productList.innerHTML = '<div class="empty-message">該当する商品がありません</div>';
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

### 動作の説明

**「在庫ありのみ」ボタンをクリックした場合：**

```
ステップ1: ボタンクリック
  showInStockButton.addEventListener("click", ...)

ステップ2: 在庫ありの商品を抽出
  inStock = []

  ループ処理:
    product = { name: "ノート", price: 100, stock: 50 }
      stock > 0 ? → 50 > 0 → true → push
      inStock = [{ name: "ノート", price: 100, stock: 50 }]

    product = { name: "ペン", price: 50, stock: 0 }
      stock > 0 ? → 0 > 0 → false → 追加しない

    product = { name: "消しゴム", price: 30, stock: 20 }
      stock > 0 ? → 20 > 0 → true → push
      inStock = [...ノート, { name: "消しゴム", ... }]

    ...（続く）

  最終: inStock = [ノート, 消しゴム, 定規, クリップ]

ステップ3: 表示
  showProducts(inStock)
  → inStockの商品だけをHTML化して表示
```

**このコードのポイント：**

1. **配列のフィルタリング**：条件に合うものだけを新しい配列に入れる
2. **関数で表示処理**：`showProducts()`関数で表示をまとめる
3. **条件付き表示**：在庫の有無で表示を変える
4. **空配列の処理**：該当商品がない場合のメッセージ表示

---

## 8. 練習問題

学生の成績リストを表示するアプリを作成してください。

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
  { name: "次郎", score: 92 },
  { name: "美咲", score: 48 },
  { name: "健太", score: 75 }
];

// すべて表示
function showAll() {
  showStudents(students);
}

// 合格者のみ表示
function showPassed() {
  let passed = [];
  for (let student of students) {
    if (student.score >= 60) {
      passed.push(student);
    }
  }
  showStudents(passed);
}

// 表示関数
function showStudents(list) {
  let html = "";
  for (let student of list) {
    html += '<div class="student-card">';
    html += '  <h3>' + student.name + '</h3>';
    html += '  <p class="score">' + student.score + '点</p>';

    if (student.score >= 60) {
      html += '  <p class="pass">合格</p>';
    } else {
      html += '  <p class="fail">不合格</p>';
    }

    html += '</div>';
  }

  document.getElementById("result").innerHTML = html;
}
```

### 発展課題

1. 「優秀者のみ」ボタンを追加（80点以上）
2. 平均点を計算して表示
3. 点数順にソートして表示

---

## まとめ

今回は、配列のデータをHTMLとして表示する方法を学びました。

### 学んだこと

**1. 配列の各要素をHTML表示**
- forループで配列を1つずつ処理
- HTML文字列に変換
- innerHTMLで画面に表示

**2. forループで生成**
- `+=`で文字列を連結
- `<ul>`/`<li>`や`<ol>`/`<li>`を使ったリスト表示
- 複雑なHTMLの組み立て

**3. innerHTML使用**
- 生成したHTML文字列を画面に反映
- 危険性（XSS攻撃）の理解
- 安全な使い方（エスケープ、textContent、createElement）

**4. 動的HTML生成**
- オブジェクトの配列の表示
- 条件付き表示（if文で分岐）
- フィルタリング（条件に合うものだけ抽出）

### 重要なポイント

```javascript
// 基本パターン
let html = "<ul>";
for (let item of array) {
  html += "<li>" + item + "</li>";
}
html += "</ul>";
element.innerHTML = html;

// オブジェクトの配列
for (let obj of objects) {
  html += "<div>" + obj.name + " - " + obj.value + "</div>";
}

// 条件付き表示
for (let item of array) {
  if (item > 50) {
    html += "<li>" + item + "</li>";
  }
}
```

### セキュリティの重要性

```javascript
// ❌ 危険（ユーザー入力をそのまま使う）
element.innerHTML = userInput;

// ✅ 安全（エスケープ処理）
element.innerHTML = escapeHTML(userInput);

// ✅ 安全（textContent）
element.textContent = userInput;

// ✅ 安全（createElement）
let div = document.createElement("div");
div.textContent = userInput;
element.appendChild(div);
```

### カリキュラムの要件チェック

- ✅ **配列の各要素をHTML表示** - forループでHTML文字列を生成
- ✅ **forループで生成** - `+=`による文字列連結の習得
- ✅ **innerHTML使用** - 生成したHTMLを画面に表示
- ✅ **【知識】動的HTML生成** - データに応じた表示の作成
- ✅ **【知識】innerHTML** - 使い方と危険性の理解
- ✅ **成果物：配列→HTML変換** - 商品リストアプリの完成

### 次のレッスンの予告

次のレッスンでは、`createElement`を使った、より安全で柔軟な要素作成方法を学びます：

- `document.createElement()`で要素を作成
- 要素を動的に生成
- `appendChild()`でDOMに追加
- innerHTMLとの違いと使い分け

より実践的なDOM操作の技術を習得していきましょう。
