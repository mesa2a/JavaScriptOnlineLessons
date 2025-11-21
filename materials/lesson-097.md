---
title: "レッスン97：週のプロジェクト - 単語帳アプリ"
author: "JavaScript Online Lessons"
date: "2025-01-21"
---

# レッスン97：週のプロジェクト - 単語帳アプリ

## 今回の学習

これまでのレッスンで、配列の基本操作を学びました：

- 配列の作成と要素へのアクセス
- 要素の追加・削除（push, pop, shift）
- 配列の検索（indexOf, includes）
- 配列の集計（合計、平均、最大・最小）
- 配列のコピー（スプレッド構文、structuredClone）
- 配列の結合（concat）

今回は、これらの知識を総動員して、実用的な「単語帳アプリ」を作成します：

- 配列で単語データを管理する
- 単語の追加・削除機能
- 単語の検索機能
- 学習した内容を実践で使う

## 1. プロジェクトの概要

### 作るもの

英単語と日本語訳を登録・管理できる単語帳アプリを作成します。

### 主な機能

1. **単語の登録**：英単語と日本語訳を追加
2. **単語リストの表示**：登録されたすべての単語を表示
3. **単語の検索**：英単語で検索
4. **単語の削除**：不要な単語を削除
5. **統計表示**：登録されている単語数を表示

### データ構造

単語データは、オブジェクトの配列で管理します：

```javascript
let words = [
  { english: "apple", japanese: "りんご" },
  { english: "book", japanese: "本" },
  { english: "cat", japanese: "猫" }
];
```

各単語は、`english`（英単語）と`japanese`（日本語訳）のプロパティを持つオブジェクトです。

## 2. 必要な機能の実装

### 単語の追加

新しい単語を配列に追加します：

```javascript
function addWord(english, japanese) {
  let word = { english: english, japanese: japanese };
  words.push(word);
}
```

`push()`メソッドを使って、配列の末尾に追加します。

### 単語の検索

英単語で検索し、見つかった単語を返します：

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

配列をループして、一致する単語を探します。

### 単語の削除

英単語を指定して、その単語を削除します：

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

`splice()`メソッドを使って、配列から要素を削除します。

### 単語数のカウント

登録されている単語の総数を返します：

```javascript
function getWordCount() {
  return words.length;
}
```

配列の`length`プロパティを使います。

## 3. UI設計

### HTML構造

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>単語帳アプリ</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }
    .word-item {
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px 0;
      border-radius: 5px;
    }
    .delete-button {
      background-color: #ff4444;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      border-radius: 3px;
    }
  </style>
</head>
<body>
  <h1>単語帳アプリ</h1>

  <div>
    <h2>新しい単語を追加</h2>
    <input type="text" id="englishInput" placeholder="英単語">
    <input type="text" id="japaneseInput" placeholder="日本語訳">
    <button id="addButton">追加</button>
  </div>

  <div>
    <h2>単語を検索</h2>
    <input type="text" id="searchInput" placeholder="英単語で検索">
    <button id="searchButton">検索</button>
    <div id="searchResult"></div>
  </div>

  <div>
    <h2>登録されている単語（<span id="wordCount">0</span>語）</h2>
    <div id="wordList"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### UIの要素

1. **追加フォーム**：英単語と日本語訳の入力欄
2. **検索フォーム**：英単語で検索する入力欄
3. **単語リスト**：すべての単語を表示
4. **削除ボタン**：各単語に削除ボタン

## 4. 実装のポイント

### 入力バリデーション

空の入力を防ぎます：

```javascript
addButton.addEventListener("click", function() {
  let english = englishInput.value.trim();
  let japanese = japaneseInput.value.trim();

  if (english === "" || japanese === "") {
    alert("英単語と日本語訳を入力してください");
    return;
  }

  // 追加処理
});
```

`trim()`で前後の空白を削除してから、空文字チェックします。

### 重複チェック

同じ英単語が既に登録されていないかチェック：

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

### リストの再表示

単語を追加・削除したら、リストを更新します：

```javascript
function showWordList() {
  let html = "";

  if (words.length === 0) {
    html = "<p>まだ単語が登録されていません</p>";
  } else {
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      html += '<div class="word-item">';
      html += '<strong>' + word.english + '</strong> - ' + word.japanese;
      html += ' <button class="delete-button" onclick="handleDelete(\'' + word.english + '\')">削除</button>';
      html += '</div>';
    }
  }

  wordList.innerHTML = html;
  wordCount.textContent = words.length;
}
```

## 5. 発展課題

基本機能ができたら、以下の機能を追加してみましょう：

### 1. ソート機能

アルファベット順に並べ替え：

```javascript
function sortWords() {
  words.sort(function(a, b) {
    if (a.english < b.english) return -1;
    if (a.english > b.english) return 1;
    return 0;
  });
}
```

### 2. ランダム表示

ランダムに1つの単語を表示（テストモード）：

```javascript
function getRandomWord() {
  if (words.length === 0) return null;
  let index = Math.floor(Math.random() * words.length);
  return words[index];
}
```

### 3. データの保存

ブラウザのlocalStorageを使って、データを保存：

```javascript
function saveWords() {
  localStorage.setItem("words", JSON.stringify(words));
}

function loadWords() {
  let data = localStorage.getItem("words");
  if (data) {
    words = JSON.parse(data);
  }
}
```

### 4. エクスポート機能

登録されている単語をテキスト形式で出力：

```javascript
function exportWords() {
  let text = "";
  for (let word of words) {
    text += word.english + "," + word.japanese + "\n";
  }
  return text;
}
```

## 練習問題

以下の要件を満たす単語帳アプリを作成してください：

### 基本要件

1. 英単語と日本語訳を入力して追加できる
2. 追加した単語をリスト表示できる
3. 英単語で検索できる
4. 各単語に削除ボタンがある
5. 登録されている単語数を表示する

### 追加要件（余裕があれば）

6. 同じ英単語は重複して登録できないようにする
7. 入力欄が空の場合はエラーメッセージを表示
8. 単語を追加したら入力欄をクリアする
9. 検索結果を目立つように表示する

### ヒント

```javascript
// データ構造
let words = [];

// 単語オブジェクトの例
let word = {
  english: "apple",
  japanese: "りんご"
};

// 配列への追加
words.push(word);

// 配列から削除（splice）
words.splice(index, 1);

// 配列の検索
for (let word of words) {
  if (word.english === searchText) {
    // 見つかった
  }
}
```

## まとめ

今回は、配列を使った実用的なアプリケーションを作成しました：

- **配列でデータ管理**：オブジェクトの配列で複数のデータを管理
- **基本操作の応用**：push, splice, length, ループを実際のアプリで使用
- **検索機能**：配列をループして条件に合う要素を探す
- **動的なUI更新**：データの変更に応じて画面を更新
- **ユーザー入力の処理**：バリデーションとエラー処理

配列の基本操作を組み合わせることで、実用的なアプリケーションが作れます。これまで学んだ知識を活かして、自分なりの機能を追加してみましょう。

次のレッスンでは、オブジェクトについて学びます。
