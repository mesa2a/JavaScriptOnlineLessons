---
title: "レッスン97：週のプロジェクト - 単語帳アプリ"
author: "JavaScript Online Lessons"
date: "2025-11-26"
---

# レッスン97：週のプロジェクト - 単語帳アプリ

## このレッスンで学ぶこと

### これまでの学習の振り返り

これまでのレッスンで、配列の基本操作を学びました：

- **配列の基本**（レッスン81-88）- 配列の作成、要素へのアクセス、for文での処理
- **要素の追加・削除**（レッスン89-90）- `push()`, `pop()`, `shift()`, `unshift()`, `splice()`
- **配列の情報取得**（レッスン91-94）- `length`, `indexOf()`, `includes()`, 集計処理
- **配列のコピーと結合**（レッスン95-96）- スプレッド構文, `concat()`, イミュータブル操作

これらの知識を実際のアプリケーション開発で使う準備が整いました。

### よくある場面

日常のプログラミングでは、こんな場面に遭遇します：

「学習した配列操作を、実際のアプリでどう使えばいいか分からない」
「複数の機能を組み合わせて、1つのアプリを作りたい」
「ユーザーが使いやすいアプリケーションを作りたい」

これらを実現するには、学んだ知識を統合して実践することが必要です。

### 学習目標

このレッスンでは、配列を使った実用的なアプリケーションを作成します：

1. **単語帳アプリの作成** - 英単語と日本語訳を管理するアプリ
2. **配列で管理** - オブジェクトの配列でデータを扱う
3. **追加・削除・検索** - CRUD操作の実装
4. **配列を使ったデータ管理** - これまで学んだ技術の総復習

これまでの学習内容を総動員して、実用的なアプリを完成させます。

---

## 1. プロジェクトの概要

### 作るもの

英単語と日本語訳を登録・管理できる「単語帳アプリ」を作成します。

**主な機能：**
- 英単語と日本語訳の登録
- 登録した単語の一覧表示
- 英単語での検索
- 不要な単語の削除
- 登録単語数の統計表示

### データ構造の設計

単語データは、**オブジェクトの配列**で管理します：

```javascript
let words = [
  { english: "apple", japanese: "りんご" },
  { english: "book", japanese: "本" },
  { english: "cat", japanese: "猫" }
];
```

**構造の説明：**

```
配列words:
  [
    オブジェクト0 { english: "apple", japanese: "りんご" }
    オブジェクト1 { english: "book", japanese: "本" }
    オブジェクト2 { english: "cat", japanese: "猫" }
  ]

各単語オブジェクト:
  {
    english: "英単語",    ← プロパティ1
    japanese: "日本語訳"  ← プロパティ2
  }
```

**なぜこの構造なのか：**
- 配列：複数の単語を順番に管理できる
- オブジェクト：1つの単語に関する複数の情報（英語と日本語）をまとめられる

**アクセス方法：**

```javascript
// 最初の単語全体
words[0]  // { english: "apple", japanese: "りんご" }

// 最初の単語の英語部分
words[0].english  // "apple"

// 最初の単語の日本語部分
words[0].japanese  // "りんご"

// 2番目の単語の英語部分
words[1].english  // "book"
```

### アプリケーションの流れ

```
1. ユーザーが英単語と日本語訳を入力
   ↓
2. 「追加」ボタンをクリック
   ↓
3. 入力内容をチェック（空でないか、重複していないか）
   ↓
4. 配列にオブジェクトを追加
   ↓
5. 画面に単語リストを再表示
   ↓
6. 必要に応じて検索や削除を実行
```

---

## 2. 必要な機能の実装

### 機能1: 単語の追加

新しい単語を配列に追加します。

**コード：**

```javascript
function addWord(english, japanese) {
  let word = { english: english, japanese: japanese };
  words.push(word);
}
```

**実行の流れ：**

```
ステップ1: 単語オブジェクトを作成
  let word = { english: "apple", japanese: "りんご" };

  word = {
    english: "apple",
    japanese: "りんご"
  }

ステップ2: 配列に追加
  words.push(word);

  元の配列:
    words = [
      { english: "cat", japanese: "猫" }
    ]

  push()実行後:
    words = [
      { english: "cat", japanese: "猫" },
      { english: "apple", japanese: "りんご" }  ← 追加された
    ]
```

**ポイント：**
- オブジェクトリテラル `{ ... }` で単語オブジェクトを作成
- `push()` で配列の末尾に追加
- 追加後、`words.length` が1増える

### 機能2: 単語の検索

英単語で検索し、見つかった単語を返します。

**コード：**

```javascript
function findWord(english) {
  for (let word of words) {
    if (word.english === english) {
      return word;
    }
  }
  return null;  // 見つからなかった場合
}
```

**実行の流れ：**

```
配列の状態:
  words = [
    { english: "apple", japanese: "りんご" },
    { english: "book", japanese: "本" },
    { english: "cat", japanese: "猫" }
  ]

検索: findWord("book")

ループ処理:
  1回目: word = { english: "apple", japanese: "りんご" }
    word.english === "book" ? → "apple" === "book" → false
    次へ

  2回目: word = { english: "book", japanese: "本" }
    word.english === "book" ? → "book" === "book" → true
    見つかった！
    return { english: "book", japanese: "本" }

結果:
  { english: "book", japanese: "本" }
```

**見つからない場合：**

```
検索: findWord("dog")

ループ処理:
  1回目: "apple" === "dog" → false
  2回目: "book" === "dog" → false
  3回目: "cat" === "dog" → false

  すべてのループが終了
  return null

結果:
  null（見つからなかった）
```

**ポイント：**
- `for...of` で配列をループ
- 各単語の `english` プロパティと検索語を比較
- 見つかったらすぐに `return` でループを終了
- 最後まで見つからなければ `null` を返す

### 機能3: 単語の削除

英単語を指定して、その単語を配列から削除します。

**コード：**

```javascript
function deleteWord(english) {
  for (let i = 0; i < words.length; i++) {
    if (words[i].english === english) {
      words.splice(i, 1);  // i番目の要素を1つ削除
      return true;
    }
  }
  return false;  // 見つからなかった場合
}
```

**実行の流れ：**

```
配列の状態:
  words = [
    { english: "apple", japanese: "りんご" },  // インデックス0
    { english: "book", japanese: "本" },       // インデックス1
    { english: "cat", japanese: "猫" }         // インデックス2
  ]

削除: deleteWord("book")

ループ処理:
  i = 0:
    words[0].english === "book" ? → "apple" === "book" → false
    次へ

  i = 1:
    words[1].english === "book" ? → "book" === "book" → true
    見つかった！
    words.splice(1, 1)  ← インデックス1から1つ削除

splice()の動作:
  削除前: ["apple", "book", "cat"]
            ↑       ↑      ↑
          i=0     i=1    i=2

  splice(1, 1) → インデックス1を削除

  削除後: ["apple", "cat"]
            ↑       ↑
          i=0     i=1

  return true（削除成功）

最終結果:
  words = [
    { english: "apple", japanese: "りんご" },
    { english: "cat", japanese: "猫" }
  ]
```

**ポイント：**
- インデックスが必要なので `for...of` ではなく通常の `for` を使用
- `splice(i, 1)` でインデックス `i` の位置から1つの要素を削除
- 削除後、それ以降の要素が前に詰められる
- 削除に成功したら `true`、見つからなければ `false` を返す

### 機能4: 単語数のカウント

登録されている単語の総数を返します。

**コード：**

```javascript
function getWordCount() {
  return words.length;
}
```

**実行の流れ：**

```
配列の状態:
  words = [
    { english: "apple", japanese: "りんご" },
    { english: "book", japanese: "本" },
    { english: "cat", japanese: "猫" }
  ]

getWordCount()実行:
  return words.length
  → return 3

結果: 3
```

**ポイント：**
- `length` プロパティは配列の要素数を表す
- 要素が追加されると自動的に増える
- 要素が削除されると自動的に減る

### 機能5: 重複チェック

同じ英単語が既に登録されていないかチェックします。

**コード：**

```javascript
function isDuplicate(english) {
  for (let word of words) {
    if (word.english === english) {
      return true;
    }
  }
  return false;
}
```

**実行の流れ：**

```
配列の状態:
  words = [
    { english: "apple", japanese: "りんご" },
    { english: "book", japanese: "本" }
  ]

チェック: isDuplicate("book")

ループ処理:
  1回目: word.english === "book" ? → "apple" === "book" → false
  2回目: word.english === "book" ? → "book" === "book" → true
    重複している！
    return true

結果: true（重複あり）

---

チェック: isDuplicate("cat")

ループ処理:
  1回目: "apple" === "cat" → false
  2回目: "book" === "cat" → false

  すべてループが終了
  return false

結果: false（重複なし）
```

---

## 3. HTMLとUIの設計

### HTML構造

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>単語帳アプリ</title>
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
      border-bottom: 3px solid #4CAF50;
      padding-bottom: 10px;
    }
    .section {
      background: white;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .section h2 {
      color: #555;
      margin-top: 0;
    }
    input {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 200px;
      margin-right: 10px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #45a049;
    }
    .word-item {
      border: 1px solid #ddd;
      padding: 15px;
      margin: 10px 0;
      border-radius: 5px;
      background-color: #fafafa;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .word-content {
      flex: 1;
    }
    .english {
      font-weight: bold;
      color: #2196F3;
      font-size: 18px;
    }
    .japanese {
      color: #666;
      margin-left: 15px;
    }
    .delete-button {
      background-color: #f44336;
      padding: 8px 15px;
    }
    .delete-button:hover {
      background-color: #da190b;
    }
    .empty-message {
      color: #999;
      text-align: center;
      padding: 20px;
      font-style: italic;
    }
    .search-result {
      margin-top: 15px;
      padding: 15px;
      background-color: #e3f2fd;
      border-left: 4px solid #2196F3;
      border-radius: 4px;
    }
    .not-found {
      background-color: #ffebee;
      border-left-color: #f44336;
      color: #c62828;
    }
    .word-count {
      color: #4CAF50;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>📚 単語帳アプリ</h1>

  <!-- 追加セクション -->
  <div class="section">
    <h2>新しい単語を追加</h2>
    <input type="text" id="englishInput" placeholder="英単語（例: apple）">
    <input type="text" id="japaneseInput" placeholder="日本語訳（例: りんご）">
    <button id="addButton">追加</button>
  </div>

  <!-- 検索セクション -->
  <div class="section">
    <h2>単語を検索</h2>
    <input type="text" id="searchInput" placeholder="英単語で検索">
    <button id="searchButton">検索</button>
    <div id="searchResult"></div>
  </div>

  <!-- 単語リストセクション -->
  <div class="section">
    <h2>登録されている単語（<span class="word-count" id="wordCount">0</span>語）</h2>
    <div id="wordList"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### UIの構成要素

**1. 追加フォーム**
```
┌─────────────────────────────────┐
│ 新しい単語を追加                │
│ [英単語入力] [日本語訳] [追加]  │
└─────────────────────────────────┘
```

**2. 検索フォーム**
```
┌─────────────────────────────────┐
│ 単語を検索                      │
│ [検索ワード] [検索]             │
│ （検索結果がここに表示される）   │
└─────────────────────────────────┘
```

**3. 単語リスト**
```
┌─────────────────────────────────┐
│ 登録されている単語（3語）        │
│ ┌─────────────────────────────┐ │
│ │ apple - りんご      [削除]  │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ book - 本          [削除]   │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ cat - 猫           [削除]   │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

---

## 4. JavaScriptの実装

### 完全なコード

```javascript
// データを管理する配列
let words = [];

// DOM要素の取得
let englishInput = document.getElementById("englishInput");
let japaneseInput = document.getElementById("japaneseInput");
let addButton = document.getElementById("addButton");

let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");
let searchResult = document.getElementById("searchResult");

let wordList = document.getElementById("wordList");
let wordCount = document.getElementById("wordCount");

// 追加ボタンのイベントリスナー
addButton.addEventListener("click", function() {
  // 入力値を取得（前後の空白を削除）
  let english = englishInput.value.trim();
  let japanese = japaneseInput.value.trim();

  // バリデーション：空チェック
  if (english === "" || japanese === "") {
    alert("英単語と日本語訳の両方を入力してください");
    return;
  }

  // バリデーション：重複チェック
  if (isDuplicate(english)) {
    alert("この英単語は既に登録されています");
    return;
  }

  // 単語を追加
  addWord(english, japanese);

  // 入力欄をクリア
  englishInput.value = "";
  japaneseInput.value = "";

  // リストを更新
  showWordList();

  // 成功メッセージ（オプション）
  alert("単語を追加しました！");
});

// 検索ボタンのイベントリスナー
searchButton.addEventListener("click", function() {
  let english = searchInput.value.trim();

  if (english === "") {
    searchResult.innerHTML = "";
    return;
  }

  // 単語を検索
  let word = findWord(english);

  if (word !== null) {
    // 見つかった
    searchResult.className = "search-result";
    searchResult.innerHTML =
      '<strong>' + word.english + '</strong> - ' + word.japanese;
  } else {
    // 見つからなかった
    searchResult.className = "search-result not-found";
    searchResult.innerHTML = '「' + english + '」は登録されていません';
  }
});

// 単語を追加する関数
function addWord(english, japanese) {
  let word = { english: english, japanese: japanese };
  words.push(word);
}

// 単語を検索する関数
function findWord(english) {
  for (let word of words) {
    if (word.english === english) {
      return word;
    }
  }
  return null;
}

// 単語を削除する関数
function deleteWord(english) {
  for (let i = 0; i < words.length; i++) {
    if (words[i].english === english) {
      words.splice(i, 1);
      return true;
    }
  }
  return false;
}

// 重複チェック関数
function isDuplicate(english) {
  for (let word of words) {
    if (word.english === english) {
      return true;
    }
  }
  return false;
}

// 削除ボタンのハンドラー（グローバルスコープに配置）
function handleDelete(english) {
  if (confirm('「' + english + '」を削除しますか？')) {
    deleteWord(english);
    showWordList();
  }
}

// 単語リストを表示する関数
function showWordList() {
  let html = "";

  if (words.length === 0) {
    html = '<div class="empty-message">まだ単語が登録されていません</div>';
  } else {
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      html += '<div class="word-item">';
      html += '  <div class="word-content">';
      html += '    <span class="english">' + word.english + '</span>';
      html += '    <span class="japanese">- ' + word.japanese + '</span>';
      html += '  </div>';
      html += '  <button class="delete-button" onclick="handleDelete(\'' + word.english + '\')">削除</button>';
      html += '</div>';
    }
  }

  wordList.innerHTML = html;
  wordCount.textContent = words.length;
}

// 初期表示
showWordList();
```

### 実装のポイント

**1. 入力バリデーション**

```javascript
// 空チェック
if (english === "" || japanese === "") {
  alert("英単語と日本語訳の両方を入力してください");
  return;
}
```

**実行の流れ：**
```
入力: english = "", japanese = "りんご"

チェック:
  english === "" → true
  japanese === "" → false

  true || false → true

結果: アラート表示して終了（追加しない）

---

入力: english = "apple", japanese = "りんご"

チェック:
  english === "" → false
  japanese === "" → false

  false || false → false

結果: チェック通過（処理を続ける）
```

**2. 重複チェック**

```javascript
if (isDuplicate(english)) {
  alert("この英単語は既に登録されています");
  return;
}
```

**実行の流れ：**
```
配列: ["apple", "book"]
入力: "apple"

isDuplicate("apple"):
  → true（既に存在する）

結果: アラート表示して終了

---

配列: ["apple", "book"]
入力: "cat"

isDuplicate("cat"):
  → false（存在しない）

結果: チェック通過（追加できる）
```

**3. 入力欄のクリア**

```javascript
englishInput.value = "";
japaneseInput.value = "";
```

追加後、次の入力のために入力欄を空にします。

**4. 動的なHTML生成**

```javascript
for (let i = 0; i < words.length; i++) {
  let word = words[i];
  html += '<div class="word-item">';
  html += '  <span class="english">' + word.english + '</span>';
  html += '  <span class="japanese">- ' + word.japanese + '</span>';
  html += '  <button onclick="handleDelete(\'' + word.english + '\')">削除</button>';
  html += '</div>';
}
```

**実行の流れ：**

```
配列の状態:
  words = [
    { english: "apple", japanese: "りんご" },
    { english: "book", japanese: "本" }
  ]

ループ処理:
  i = 0:
    word = { english: "apple", japanese: "りんご" }
    html += '<div class="word-item">...'

    生成されるHTML:
      <div class="word-item">
        <span class="english">apple</span>
        <span class="japanese">- りんご</span>
        <button onclick="handleDelete('apple')">削除</button>
      </div>

  i = 1:
    word = { english: "book", japanese: "本" }
    html += '<div class="word-item">...'

    追加されるHTML:
      <div class="word-item">
        <span class="english">book</span>
        <span class="japanese">- 本</span>
        <button onclick="handleDelete('book')">削除</button>
      </div>

最終的なHTML:
  2つの単語項目が連結された文字列
```

**5. 削除の確認**

```javascript
function handleDelete(english) {
  if (confirm('「' + english + '」を削除しますか？')) {
    deleteWord(english);
    showWordList();
  }
}
```

**実行の流れ：**

```
ユーザーが「apple」の削除ボタンをクリック
  ↓
handleDelete('apple')実行
  ↓
confirm()で確認ダイアログ表示
  「apple」を削除しますか？
  [OK] [キャンセル]
  ↓
ユーザーが[OK]をクリック
  ↓
confirm()がtrueを返す
  ↓
deleteWord('apple')実行
  配列から"apple"を削除
  ↓
showWordList()実行
  画面を更新
```

---

## 5. 動作の流れ（完全版）

### ケース1: 単語を追加する

```
【初期状態】
  words = []

【ユーザー操作】
  1. 英単語入力欄に "apple" と入力
  2. 日本語訳入力欄に "りんご" と入力
  3. 「追加」ボタンをクリック

【処理の流れ】
  ステップ1: イベントリスナー実行
    addButton.addEventListener("click", function() { ... })

  ステップ2: 入力値取得
    english = "apple"
    japanese = "りんご"

  ステップ3: 空チェック
    "apple" === "" ? → false
    "りんご" === "" ? → false
    → チェック通過

  ステップ4: 重複チェック
    isDuplicate("apple")
    → words = [] なのでfalse
    → チェック通過

  ステップ5: 単語追加
    addWord("apple", "りんご")
    ↓
    word = { english: "apple", japanese: "りんご" }
    words.push(word)
    ↓
    words = [{ english: "apple", japanese: "りんご" }]

  ステップ6: 入力欄クリア
    englishInput.value = ""
    japaneseInput.value = ""

  ステップ7: リスト更新
    showWordList()
    ↓
    HTML生成
    ↓
    画面に表示

【結果】
  words = [{ english: "apple", japanese: "りんご" }]
  画面に "apple - りんご [削除]" が表示される
```

### ケース2: 単語を検索する

```
【状態】
  words = [
    { english: "apple", japanese: "りんご" },
    { english: "book", japanese: "本" },
    { english: "cat", japanese: "猫" }
  ]

【ユーザー操作】
  1. 検索入力欄に "book" と入力
  2. 「検索」ボタンをクリック

【処理の流れ】
  ステップ1: イベントリスナー実行

  ステップ2: 入力値取得
    english = "book"

  ステップ3: 検索実行
    findWord("book")
    ↓
    ループ処理:
      1回目: "apple" === "book" ? → false
      2回目: "book" === "book" ? → true
        return { english: "book", japanese: "本" }

  ステップ4: 結果表示
    word !== null なので見つかった
    ↓
    searchResult.innerHTML =
      '<strong>book</strong> - 本'

【結果】
  検索結果エリアに "book - 本" が表示される
```

### ケース3: 単語を削除する

```
【状態】
  words = [
    { english: "apple", japanese: "りんご" },
    { english: "book", japanese: "本" },
    { english: "cat", japanese: "猫" }
  ]

【ユーザー操作】
  1. "book" の削除ボタンをクリック
  2. 確認ダイアログで[OK]をクリック

【処理の流れ】
  ステップ1: handleDelete('book')実行

  ステップ2: 確認ダイアログ
    confirm('「book」を削除しますか？')
    → ユーザーが[OK] → true

  ステップ3: 削除実行
    deleteWord('book')
    ↓
    ループ処理:
      i = 0: "apple" === "book" ? → false
      i = 1: "book" === "book" ? → true
        words.splice(1, 1)

    配列の変化:
      削除前: [apple, book, cat]
              i=0    i=1   i=2

      splice(1, 1)

      削除後: [apple, cat]
              i=0    i=1

  ステップ4: リスト更新
    showWordList()
    ↓
    新しいHTMLを生成
    ↓
    画面更新

【結果】
  words = [
    { english: "apple", japanese: "りんご" },
    { english: "cat", japanese: "猫" }
  ]
  画面から "book" が消える
  単語数が "2語" に更新される
```

---

## 6. 発展課題

基本機能ができたら、以下の機能を追加してみましょう。

### 発展1: ソート機能

アルファベット順に並べ替え：

```javascript
function sortWords() {
  words.sort(function(a, b) {
    if (a.english < b.english) return -1;
    if (a.english > b.english) return 1;
    return 0;
  });
  showWordList();
}
```

**使い方：**

```html
<button onclick="sortWords()">アルファベット順に並べ替え</button>
```

**実行の流れ：**

```
ソート前:
  words = [
    { english: "cat", japanese: "猫" },
    { english: "apple", japanese: "りんご" },
    { english: "book", japanese: "本" }
  ]

sort()実行:
  比較処理:
    "cat" < "apple" ? → false → 1を返す → catは後ろ
    "apple" < "book" ? → true → -1を返す → appleは前
    "book" < "cat" ? → true → -1を返す → bookは前

ソート後:
  words = [
    { english: "apple", japanese: "りんご" },
    { english: "book", japanese: "本" },
    { english: "cat", japanese: "猫" }
  ]
```

### 発展2: ランダム表示（テストモード）

ランダムに1つの単語を表示：

```javascript
function getRandomWord() {
  if (words.length === 0) {
    return null;
  }
  let index = Math.floor(Math.random() * words.length);
  return words[index];
}

function showRandomTest() {
  let word = getRandomWord();
  if (word === null) {
    alert("単語が登録されていません");
    return;
  }

  // 日本語を隠して表示
  let answer = prompt("「" + word.japanese + "」を英語で？");

  if (answer === word.english) {
    alert("正解！");
  } else {
    alert("不正解。正解は「" + word.english + "」でした。");
  }
}
```

**使い方：**

```html
<button onclick="showRandomTest()">ランダムテスト</button>
```

**実行の流れ：**

```
配列:
  words = [
    { english: "apple", japanese: "りんご" },
    { english: "book", japanese: "本" },
    { english: "cat", japanese: "猫" }
  ]

getRandomWord()実行:
  Math.random() → 0.6 (例)
  0.6 * 3 → 1.8
  Math.floor(1.8) → 1

  return words[1]
  → { english: "book", japanese: "本" }

prompt表示:
  「本」を英語で？

ユーザー入力: "book"

判定:
  "book" === "book" → true
  alert("正解！")
```

### 発展3: データの保存（localStorage）

ブラウザにデータを保存：

```javascript
// 保存
function saveWords() {
  localStorage.setItem("words", JSON.stringify(words));
}

// 読み込み
function loadWords() {
  let data = localStorage.getItem("words");
  if (data) {
    words = JSON.parse(data);
    showWordList();
  }
}

// 追加時に自動保存
function addWord(english, japanese) {
  let word = { english: english, japanese: japanese };
  words.push(word);
  saveWords();  // 追加
}

// 削除時に自動保存
function deleteWord(english) {
  for (let i = 0; i < words.length; i++) {
    if (words[i].english === english) {
      words.splice(i, 1);
      saveWords();  // 追加
      return true;
    }
  }
  return false;
}

// ページ読み込み時に復元
window.addEventListener("load", function() {
  loadWords();
});
```

**動作の説明：**

```
【保存時】
  words配列 → JSON文字列に変換 → localStorageに保存

  例:
    words = [{ english: "apple", japanese: "りんご" }]
    ↓ JSON.stringify()
    '[{"english":"apple","japanese":"りんご"}]'
    ↓ localStorage.setItem()
    ブラウザに保存

【読み込み時】
  localStorageから取得 → JSON文字列を配列に変換 → words配列に代入

  例:
    localStorage.getItem("words")
    ↓
    '[{"english":"apple","japanese":"りんご"}]'
    ↓ JSON.parse()
    [{ english: "apple", japanese: "りんご" }]
    ↓
    words = ...
```

### 発展4: エクスポート機能

CSV形式で出力：

```javascript
function exportWords() {
  if (words.length === 0) {
    alert("単語が登録されていません");
    return;
  }

  let text = "英単語,日本語訳\n";
  for (let word of words) {
    text += word.english + "," + word.japanese + "\n";
  }

  // ダウンロードリンクを作成
  let blob = new Blob([text], { type: "text/csv" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "words.csv";
  a.click();
}
```

**使い方：**

```html
<button onclick="exportWords()">CSVでエクスポート</button>
```

**出力例：**

```
英単語,日本語訳
apple,りんご
book,本
cat,猫
```

---

## 7. 練習問題

以下の要件を満たす単語帳アプリを作成してください。

### 基本要件

1. ✅ 英単語と日本語訳を入力して追加できる
2. ✅ 追加した単語をリスト表示できる
3. ✅ 英単語で検索できる
4. ✅ 各単語に削除ボタンがある
5. ✅ 登録されている単語数を表示する

### 追加要件（余裕があれば）

6. ✅ 同じ英単語は重複して登録できないようにする
7. ✅ 入力欄が空の場合はエラーメッセージを表示
8. ✅ 単語を追加したら入力欄をクリアする
9. ✅ 検索結果を目立つように表示する

### 発展要件（チャレンジ）

10. アルファベット順にソートできる
11. ランダムテスト機能を追加
12. localStorageでデータを保存
13. CSV形式でエクスポート

---

## まとめ

今回は、配列を使った実用的なアプリケーションを作成しました。

### 学んだこと

**1. 配列でデータ管理**
- オブジェクトの配列で複数のデータを管理
- `{ english: "apple", japanese: "りんご" }` の構造

**2. 基本操作の応用**
- `push()` - 追加
- `splice()` - 削除
- `length` - 要素数
- `for` / `for...of` - ループ処理

**3. 検索機能**
- 配列をループして条件に合う要素を探す
- 見つかったら `return` でループ終了
- 見つからなければ `null` を返す

**4. 動的なUI更新**
- データの変更に応じて画面を更新
- HTMLを文字列で生成
- `innerHTML` で表示

**5. ユーザー入力の処理**
- バリデーション（空チェック、重複チェック）
- エラー処理（`alert`, `confirm`）
- 入力欄のクリア

### 重要なポイント

```javascript
// データ構造
let words = [
  { english: "apple", japanese: "りんご" }
];

// 追加
words.push({ english: "book", japanese: "本" });

// 検索
for (let word of words) {
  if (word.english === "book") {
    return word;
  }
}

// 削除
words.splice(index, 1);

// 表示更新
showWordList();
```

### カリキュラムの要件チェック

- ✅ **単語帳アプリ** - 完全な機能を実装
- ✅ **配列で管理** - オブジェクトの配列でデータ管理
- ✅ **追加・削除・検索** - CRUD操作の実装
- ✅ **【知識】配列を使ったデータ管理** - 実践的なアプリケーション開発
- ✅ **成果物：単語帳** - 実用的な単語帳アプリの完成

### これまでの学習の統合

このプロジェクトでは、以下のレッスンの内容を使いました：

- レッスン81-88: 配列の基本、for文
- レッスン89: `push()` で要素追加
- レッスン90: `splice()` で要素削除
- レッスン91: `length` で要素数取得
- レッスン93: 配列の検索（ループで探す）
- レッスン95: 配列のコピー（重複チェック）

配列の基本操作を組み合わせることで、実用的なアプリケーションが作れます！

### 次のレッスンの予告

次の章では、配列とDOMの連携について学びます：

- より高度なDOM操作
- イベント処理の詳細
- 動的なコンテンツ生成
- ユーザーインタラクションの改善

さらに実践的なアプリケーション開発に進んでいきましょう。
