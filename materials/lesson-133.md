# レッスン133: 週のプロジェクト - テキストエディタを作ろう

**日付**: 2025-11-26
**所要時間**: 30分

## このレッスンで学ぶこと

1. 大規模アプリケーションの関数設計
2. 各機能の関数化と再利用
3. テキスト検索・置換機能の実装
4. これまで学んだ知識の総合活用

---

## プロジェクトの目標

これまで学んできた関数の知識を活用して、**簡易テキストエディタ**を作成します。

### 実装する機能

- ✅ テキストの入力・編集
- ✅ 文字数カウント
- ✅ 行数カウント
- ✅ テキスト検索
- ✅ テキスト置換
- ✅ 大文字・小文字変換
- ✅ テキストのクリア
- ✅ テキストのコピー

---

## なぜ関数化が重要か？

### 日常生活での例え：工具箱の整理

```
【悪い工具箱】
すべての工具が散らばっている
→ 必要な工具を見つけるのに時間がかかる
→ 同じ作業を何度も繰り返す

【良い工具箱】
各工具が目的別に整理されている
✓ 「測る」「切る」「締める」など機能ごとに分類
✓ 必要な工具をすぐに取り出せる
✓ 同じ工具を他の作業でも使える
```

**関数化**とは、プログラムの機能を工具のように整理整頓することです。

---

## 設計の考え方

### 機能を関数に分解する

大きなプログラムを作るときは、まず「どんな機能が必要か」を考えます。

```
テキストエディタに必要な機能:
├─ 文字数を数える → countCharacters()
├─ 行数を数える → countLines()
├─ テキストを検索する → searchText()
├─ テキストを置換する → replaceText()
├─ 大文字に変換する → toUpperCase()
├─ 小文字に変換する → toLowerCase()
└─ テキストをコピーする → copyText()
```

### 関数設計の3つのポイント

1. **単一責任**: 1つの関数は1つのことだけをする
2. **再利用性**: 同じコードを何度も書かない
3. **わかりやすさ**: 関数名から何をするかがわかる

---

## プロジェクト：簡易テキストエディタ

それでは、完全なテキストエディタを作成しましょう！

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>簡易テキストエディタ</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px 30px;
    }

    .header h1 {
      font-size: 28px;
      margin-bottom: 5px;
    }

    .header p {
      font-size: 14px;
      opacity: 0.9;
    }

    .toolbar {
      background-color: #f8f9fa;
      padding: 15px 30px;
      border-bottom: 2px solid #e9ecef;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.3s;
    }

    .btn-primary {
      background-color: #667eea;
      color: white;
    }

    .btn-primary:hover {
      background-color: #5568d3;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(102, 126, 234, 0.4);
    }

    .btn-success {
      background-color: #28a745;
      color: white;
    }

    .btn-success:hover {
      background-color: #218838;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(40, 167, 69, 0.4);
    }

    .btn-warning {
      background-color: #ffc107;
      color: #333;
    }

    .btn-warning:hover {
      background-color: #e0a800;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(255, 193, 7, 0.4);
    }

    .btn-danger {
      background-color: #dc3545;
      color: white;
    }

    .btn-danger:hover {
      background-color: #c82333;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(220, 53, 69, 0.4);
    }

    .editor-area {
      padding: 30px;
    }

    .editor-textarea {
      width: 100%;
      min-height: 400px;
      padding: 20px;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      font-size: 16px;
      font-family: 'Courier New', monospace;
      resize: vertical;
      line-height: 1.6;
    }

    .editor-textarea:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .stats {
      display: flex;
      gap: 30px;
      margin-top: 20px;
      padding: 20px;
      background-color: #f8f9fa;
      border-radius: 8px;
    }

    .stat-item {
      flex: 1;
      text-align: center;
    }

    .stat-label {
      font-size: 12px;
      color: #6c757d;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 5px;
    }

    .stat-value {
      font-size: 32px;
      font-weight: bold;
      color: #667eea;
    }

    .search-section {
      margin-top: 20px;
      padding: 20px;
      background-color: #fff3cd;
      border-radius: 8px;
      border-left: 4px solid #ffc107;
    }

    .search-section h3 {
      margin-bottom: 15px;
      color: #856404;
    }

    .input-group {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }

    .input-group input {
      flex: 1;
      padding: 10px 15px;
      border: 2px solid #dee2e6;
      border-radius: 5px;
      font-size: 14px;
    }

    .input-group input:focus {
      outline: none;
      border-color: #667eea;
    }

    .result {
      margin-top: 15px;
      padding: 15px;
      background-color: white;
      border-radius: 5px;
      border: 1px solid #dee2e6;
      display: none;
    }

    .result.show {
      display: block;
    }

    .highlight {
      background-color: yellow;
      padding: 2px 4px;
      border-radius: 3px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- ヘッダー -->
    <div class="header">
      <h1>📝 簡易テキストエディタ</h1>
      <p>関数を活用した高機能エディタ</p>
    </div>

    <!-- ツールバー -->
    <div class="toolbar">
      <button class="btn btn-primary" onclick="convertToUpperCase()">大文字に変換</button>
      <button class="btn btn-primary" onclick="convertToLowerCase()">小文字に変換</button>
      <button class="btn btn-success" onclick="copyToClipboard()">テキストをコピー</button>
      <button class="btn btn-danger" onclick="clearText()">テキストをクリア</button>
      <button class="btn btn-warning" onclick="updateStats()">統計を更新</button>
    </div>

    <!-- エディタエリア -->
    <div class="editor-area">
      <textarea
        id="editor"
        class="editor-textarea"
        placeholder="ここにテキストを入力してください..."
        oninput="updateStats()">JavaScriptは楽しいプログラミング言語です。
関数を使うことで、コードを整理できます。
テキストエディタを作ることで、実践的なスキルが身につきます。</textarea>

      <!-- 統計表示 -->
      <div class="stats">
        <div class="stat-item">
          <div class="stat-label">文字数</div>
          <div class="stat-value" id="charCount">0</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">行数</div>
          <div class="stat-value" id="lineCount">0</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">単語数</div>
          <div class="stat-value" id="wordCount">0</div>
        </div>
      </div>

      <!-- 検索・置換セクション -->
      <div class="search-section">
        <h3>🔍 検索・置換</h3>

        <div class="input-group">
          <input type="text" id="searchInput" placeholder="検索する文字列">
          <button class="btn btn-primary" onclick="performSearch()">検索</button>
        </div>

        <div class="input-group">
          <input type="text" id="replaceInput" placeholder="置換後の文字列">
          <button class="btn btn-success" onclick="performReplace()">置換</button>
        </div>

        <div id="searchResult" class="result"></div>
      </div>
    </div>
  </div>

  <script>
    // ========================================
    // 1. テキスト取得・設定関数
    // ========================================

    /**
     * エディタからテキストを取得する
     * @returns {string} エディタの現在のテキスト
     */
    const getText = function() {
      const editor = document.getElementById('editor');
      return editor.value;
    };

    /**
     * エディタにテキストを設定する
     * @param {string} text - 設定するテキスト
     */
    const setText = function(text) {
      const editor = document.getElementById('editor');
      editor.value = text;
      updateStats(); // 統計を更新
    };

    // ========================================
    // 2. 文字数・行数カウント関数
    // ========================================

    /**
     * 文字数をカウントする
     * @param {string} text - カウントするテキスト
     * @returns {number} 文字数
     */
    const countCharacters = function(text) {
      return text.length;
    };

    /**
     * 行数をカウントする
     * @param {string} text - カウントするテキスト
     * @returns {number} 行数
     */
    const countLines = function(text) {
      if (text === '') {
        return 0;
      }
      const lines = text.split('\n');
      return lines.length;
    };

    /**
     * 単語数をカウントする（空白で区切られた単語）
     * @param {string} text - カウントするテキスト
     * @returns {number} 単語数
     */
    const countWords = function(text) {
      if (text.trim() === '') {
        return 0;
      }
      // 空白文字で分割して、空でない要素をカウント
      const words = text.trim().split(/\s+/);
      return words.length;
    };

    /**
     * 統計情報を更新する
     */
    const updateStats = function() {
      const text = getText();

      const charCount = countCharacters(text);
      const lineCount = countLines(text);
      const wordCount = countWords(text);

      document.getElementById('charCount').textContent = charCount;
      document.getElementById('lineCount').textContent = lineCount;
      document.getElementById('wordCount').textContent = wordCount;
    };

    // ========================================
    // 3. テキスト変換関数
    // ========================================

    /**
     * テキストを大文字に変換する
     */
    const convertToUpperCase = function() {
      const text = getText();
      const upperText = text.toUpperCase();
      setText(upperText);
    };

    /**
     * テキストを小文字に変換する
     */
    const convertToLowerCase = function() {
      const text = getText();
      const lowerText = text.toLowerCase();
      setText(lowerText);
    };

    // ========================================
    // 4. 検索・置換関数
    // ========================================

    /**
     * テキスト内の文字列を検索する
     * @param {string} text - 検索対象のテキスト
     * @param {string} searchWord - 検索する文字列
     * @returns {object} 検索結果（見つかった数と位置）
     */
    const searchText = function(text, searchWord) {
      // 入力チェック
      if (!searchWord || searchWord === '') {
        return { count: 0, positions: [] };
      }

      let count = 0;
      const positions = [];
      let index = 0;

      // テキスト内のすべての出現位置を探す
      while (index < text.length) {
        const foundIndex = text.indexOf(searchWord, index);

        if (foundIndex === -1) {
          break; // これ以上見つからない
        }

        count = count + 1;
        positions.push(foundIndex);
        index = foundIndex + 1; // 次の検索位置
      }

      return {
        count: count,
        positions: positions
      };
    };

    /**
     * テキスト内の文字列を置換する
     * @param {string} text - 置換対象のテキスト
     * @param {string} searchWord - 検索する文字列
     * @param {string} replaceWord - 置換後の文字列
     * @returns {object} 置換結果（新しいテキストと置換数）
     */
    const replaceText = function(text, searchWord, replaceWord) {
      // 入力チェック
      if (!searchWord || searchWord === '') {
        return {
          newText: text,
          count: 0
        };
      }

      // replaceWordが未指定の場合は空文字列に
      replaceWord = replaceWord || '';

      let newText = text;
      let count = 0;

      // すべての出現を置換
      while (newText.indexOf(searchWord) !== -1) {
        newText = newText.replace(searchWord, replaceWord);
        count = count + 1;
      }

      return {
        newText: newText,
        count: count
      };
    };

    /**
     * 検索を実行してUIに表示
     */
    const performSearch = function() {
      const text = getText();
      const searchWord = document.getElementById('searchInput').value;

      const result = searchText(text, searchWord);
      const resultDiv = document.getElementById('searchResult');

      if (result.count === 0) {
        resultDiv.innerHTML = `
          <strong>検索結果:</strong>
          「${searchWord}」は見つかりませんでした。
        `;
      } else {
        resultDiv.innerHTML = `
          <strong>検索結果:</strong>
          「${searchWord}」が ${result.count} 件見つかりました。<br>
          <small>位置: ${result.positions.join(', ')} 文字目</small>
        `;
      }

      resultDiv.className = 'result show';
    };

    /**
     * 置換を実行してUIに反映
     */
    const performReplace = function() {
      const text = getText();
      const searchWord = document.getElementById('searchInput').value;
      const replaceWord = document.getElementById('replaceInput').value;

      const result = replaceText(text, searchWord, replaceWord);
      const resultDiv = document.getElementById('searchResult');

      if (result.count === 0) {
        resultDiv.innerHTML = `
          <strong>置換結果:</strong>
          「${searchWord}」は見つかりませんでした。
        `;
      } else {
        setText(result.newText);
        resultDiv.innerHTML = `
          <strong>置換完了:</strong>
          「${searchWord}」を「${replaceWord}」に ${result.count} 件置換しました。
        `;
      }

      resultDiv.className = 'result show';
    };

    // ========================================
    // 5. その他の便利関数
    // ========================================

    /**
     * テキストをクリップボードにコピーする
     */
    const copyToClipboard = function() {
      const text = getText();
      const editor = document.getElementById('editor');

      editor.select();
      document.execCommand('copy');

      alert('テキストをコピーしました！');
    };

    /**
     * テキストをクリアする
     */
    const clearText = function() {
      const confirmed = confirm('本当にテキストをクリアしますか？');

      if (confirmed) {
        setText('');
        document.getElementById('searchResult').className = 'result';
      }
    };

    // ========================================
    // 6. 初期化
    // ========================================

    // ページ読み込み時に統計を更新
    updateStats();
  </script>
</body>
</html>
```

---

## コードの解説

### 1. 関数の構成

このプロジェクトは、以下の関数グループで構成されています：

#### **テキスト取得・設定**
```javascript
const getText = function() {
  const editor = document.getElementById('editor');
  return editor.value;
};

const setText = function(text) {
  const editor = document.getElementById('editor');
  editor.value = text;
  updateStats();
};
```
- `getText()`: エディタの内容を取得
- `setText()`: エディタに内容を設定し、統計を更新

#### **カウント機能**
```javascript
const countCharacters = function(text) {
  return text.length;
};

const countLines = function(text) {
  if (text === '') return 0;
  return text.split('\n').length;
};

const countWords = function(text) {
  if (text.trim() === '') return 0;
  return text.trim().split(/\s+/).length;
};
```
- 文字数、行数、単語数をそれぞれカウント
- 各関数は1つの責任のみを持つ

#### **検索・置換機能**
```javascript
const searchText = function(text, searchWord) {
  // 検索ロジック
  return { count: 件数, positions: [位置] };
};

const replaceText = function(text, searchWord, replaceWord) {
  // 置換ロジック
  return { newText: 新しいテキスト, count: 置換数 };
};
```

### 2. 関数設計のポイント

#### **単一責任の原則**
```javascript
// ❌ 悪い例：1つの関数が多くのことをする
const doEverything = function() {
  const text = getText();
  const charCount = text.length;
  const lineCount = text.split('\n').length;
  document.getElementById('charCount').textContent = charCount;
  document.getElementById('lineCount').textContent = lineCount;
  // ... さらに続く
};

// ✅ 良い例：各関数が1つの責任を持つ
const countCharacters = function(text) {
  return text.length;
};

const updateCharacterDisplay = function(count) {
  document.getElementById('charCount').textContent = count;
};
```

#### **再利用性**
```javascript
// countCharacters関数は、どこからでも使える
const charCount1 = countCharacters(getText());
const charCount2 = countCharacters('別のテキスト');
const charCount3 = countCharacters(userInput);
```

#### **わかりやすい命名**
```javascript
// ✅ 良い関数名：何をするかが明確
const searchText = function(text, searchWord) { ... };
const replaceText = function(text, old, new) { ... };
const countLines = function(text) { ... };

// ❌ 悪い関数名：何をするかわからない
const func1 = function(x, y) { ... };
const doIt = function(a, b, c) { ... };
```

---

## 実行の流れ

### 検索機能の実行フロー

```javascript
// ユーザーが「JavaScript」を検索した場合

// ステップ1: performSearch()が呼ばれる
performSearch()
  ↓
// ステップ2: テキストと検索語を取得
const text = "JavaScriptは楽しいプログラミング言語です。"
const searchWord = "JavaScript"
  ↓
// ステップ3: searchText()関数を呼び出す
searchText(text, searchWord)
  ↓
// ステップ4: テキスト内を検索
index = 0
text.indexOf("JavaScript", 0) → 0（見つかった！）
count = 1, positions = [0]
  ↓
index = 1
text.indexOf("JavaScript", 1) → -1（これ以上なし）
  ↓
// ステップ5: 結果を返す
return { count: 1, positions: [0] }
  ↓
// ステップ6: UIに表示
「JavaScriptが1件見つかりました」
```

**図解：検索機能の流れ**

```
ユーザー入力
    ↓
[performSearch関数]
    ↓
テキスト取得 ← getText()
検索語取得 ← input要素
    ↓
[searchText関数]
    ↓
文字列検索ループ
  ├─ indexOf()で検索
  ├─ 見つかったらカウント
  └─ 次の位置から再検索
    ↓
結果オブジェクト生成
{ count: 件数, positions: [位置] }
    ↓
[UI更新]
結果メッセージ表示
```

---

## 置換機能の詳細解説

```javascript
const replaceText = function(text, searchWord, replaceWord) {
  // 入力チェック
  if (!searchWord || searchWord === '') {
    return { newText: text, count: 0 };
  }

  // デフォルト値設定
  replaceWord = replaceWord || '';

  let newText = text;
  let count = 0;

  // すべての出現を置換
  while (newText.indexOf(searchWord) !== -1) {
    newText = newText.replace(searchWord, replaceWord);
    count = count + 1;
  }

  return { newText: newText, count: count };
};
```

### 実行例

```javascript
// 例: "JavaScriptは楽しい。JavaScriptを学ぼう。"
// "JavaScript" → "JS" に置換

// 1回目のループ:
newText = "JSは楽しい。JavaScriptを学ぼう。"
count = 1

// 2回目のループ:
newText = "JSは楽しい。JSを学ぼう。"
count = 2

// 3回目のループ:
indexOf("JavaScript") → -1（見つからない）
→ ループ終了

// 結果:
return {
  newText: "JSは楽しい。JSを学ぼう。",
  count: 2
}
```

---

## 拡張アイデア

このプロジェクトをさらに発展させることができます：

### アイデア1: 保存機能

```javascript
const saveToLocalStorage = function() {
  const text = getText();
  localStorage.setItem('editorText', text);
  alert('テキストを保存しました！');
};

const loadFromLocalStorage = function() {
  const savedText = localStorage.getItem('editorText');
  if (savedText) {
    setText(savedText);
    alert('テキストを読み込みました！');
  }
};
```

### アイデア2: 元に戻す機能

```javascript
const history = [];

const saveToHistory = function() {
  const text = getText();
  history.push(text);
};

const undo = function() {
  if (history.length > 0) {
    const previousText = history.pop();
    setText(previousText);
  }
};
```

### アイデア3: ハイライト機能

```javascript
const highlightText = function(text, searchWord) {
  if (!searchWord) return text;

  const regex = new RegExp(searchWord, 'g');
  return text.replace(regex, '<span class="highlight">' + searchWord + '</span>');
};
```

---

## まとめ

このプロジェクトで学んだこと：

### 1. **大規模アプリの設計**
- 機能を関数に分解する
- 各関数は単一の責任を持つ
- 関数を組み合わせて複雑な機能を実現

### 2. **関数設計の原則**
```javascript
// 良い関数の3つの条件:
1. 単一責任: 1つのことだけをする
2. 再利用性: 他の場所でも使える
3. わかりやすさ: 名前から機能がわかる
```

### 3. **実装した機能**
- ✅ テキスト編集
- ✅ 文字数・行数・単語数カウント
- ✅ テキスト検索
- ✅ テキスト置換
- ✅ 大文字・小文字変換
- ✅ テキストコピー・クリア

### 4. **活用した知識**
- 関数の定義と呼び出し
- 引数とデフォルト値
- 戻り値とオブジェクト
- エラーチェック
- 文字列操作メソッド
- DOM操作

---

## カリキュラムの要件チェック

### レッスン133：週のプロジェクト
- ✅ **テキストエディタ**：完全な機能を持つエディタを実装
- ✅ **各機能を関数化**：getText, setText, countCharacters, searchText, replaceTextなど、すべての機能を関数として実装
- ✅ **検索・置換**：searchText関数とreplaceText関数で実装
- ✅ **大規模アプリの関数設計**：単一責任、再利用性、わかりやすさの原則に基づいて設計

---

## 次のレッスンの予告

おめでとうございます！関数の基礎編を完了しました！

次のレッスンからは、**オブジェクトとデータ構造**について学びます。より高度なプログラミングの世界へ進みましょう！

---

## 補足：関数一覧

このプロジェクトで作成した関数の一覧：

| 関数名 | 機能 | 引数 | 戻り値 |
|--------|------|------|--------|
| `getText()` | エディタのテキスト取得 | なし | string |
| `setText(text)` | エディタにテキスト設定 | text: string | なし |
| `countCharacters(text)` | 文字数カウント | text: string | number |
| `countLines(text)` | 行数カウント | text: string | number |
| `countWords(text)` | 単語数カウント | text: string | number |
| `updateStats()` | 統計情報更新 | なし | なし |
| `convertToUpperCase()` | 大文字変換 | なし | なし |
| `convertToLowerCase()` | 小文字変換 | なし | なし |
| `searchText(text, word)` | テキスト検索 | text: string, word: string | object |
| `replaceText(text, old, new)` | テキスト置換 | text: string, old: string, new: string | object |
| `performSearch()` | 検索実行 | なし | なし |
| `performReplace()` | 置換実行 | なし | なし |
| `copyToClipboard()` | クリップボードコピー | なし | なし |
| `clearText()` | テキストクリア | なし | なし |

**合計14個の関数**で、高機能なテキストエディタを実現しました！
