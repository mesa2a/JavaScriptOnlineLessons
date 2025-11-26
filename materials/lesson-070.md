---
title: "Lesson 070: preventDefault"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン70：preventDefault

## このレッスンで学ぶこと

このレッスンでは、`event.preventDefault()`メソッドについて詳しく学びます。このメソッドを使うことで、ブラウザのデフォルト動作をキャンセルし、独自の動作を実装できるようになります。

## 現場で使われているpreventDefault()の例

### 例1：Gmail - 添付ファイルのドラッグ&ドロップ

Gmailでは、ファイルをメール作成画面にドラッグ&ドロップすると、ブラウザがファイルを開くのではなく、添付ファイルとして追加されます。これは`preventDefault()`を使って実現されています。

```javascript
// Gmailのようなファイルドロップ機能
let dropZone = document.getElementById("dropZone");
let fileList = document.getElementById("fileList");

// ドラッグオーバー時のデフォルト動作を防ぐ
dropZone.addEventListener("dragover", function(event) {
  event.preventDefault(); // 重要：これがないとdropイベントが発火しない
  dropZone.style.backgroundColor = "#e3f2fd";
  dropZone.style.borderColor = "#2196f3";
  console.log("ファイルをドラッグ中...");
});

dropZone.addEventListener("dragleave", function(event) {
  dropZone.style.backgroundColor = "";
  dropZone.style.borderColor = "";
});

// ドロップ時のデフォルト動作（ファイルを開く）を防ぐ
dropZone.addEventListener("drop", function(event) {
  event.preventDefault(); // ブラウザがファイルを開くのを防ぐ

  dropZone.style.backgroundColor = "";
  dropZone.style.borderColor = "";

  // ドロップされたファイルを取得
  let files = event.dataTransfer.files;

  console.log("ドロップされたファイル数:", files.length);

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    console.log("ファイル名:", file.name);
    console.log("ファイルサイズ:", file.size, "バイト");
    console.log("ファイルタイプ:", file.type);

    // ファイルリストに追加
    let fileItem = document.createElement("div");
    fileItem.textContent = file.name + " (" + Math.round(file.size / 1024) + " KB)";
    fileList.appendChild(fileItem);
  }
});
```

**なぜpreventDefault()が必要か**:
- `dragover`イベントでpreventDefault()を呼ばないと、`drop`イベントが発火しない
- `drop`イベントでpreventDefault()を呼ばないと、ブラウザがファイルを開いてしまう
- 両方のイベントでpreventDefault()を呼ぶことで、独自のファイル処理が可能になる

**HTML構造の例**:
```html
<div id="dropZone" style="width: 400px; height: 200px; border: 2px dashed #ccc; padding: 20px; text-align: center;">
  ファイルをここにドロップ
</div>
<div id="fileList" style="margin-top: 20px;"></div>
```

### 例2：Slack - リンククリックの確認ダイアログ

Slackでは、外部リンクをクリックすると、本当にそのリンクを開くか確認するダイアログが表示されます。これはセキュリティのためにpreventDefault()を使って実装されています。

```javascript
// Slackのような外部リンク確認機能
let externalLinks = document.querySelectorAll("a[href^='http']");

externalLinks.forEach(function(link) {
  link.addEventListener("click", function(event) {
    event.preventDefault(); // リンクのデフォルト動作（即座の遷移）を防ぐ

    let url = this.href;
    let hostname = new URL(url).hostname;

    // 確認ダイアログを表示
    let confirmed = confirm(
      "外部サイトに移動します。\n\n" +
      "移動先: " + hostname + "\n\n" +
      "本当に移動しますか？"
    );

    if (confirmed) {
      // ユーザーがOKをクリックした場合のみ移動
      console.log("外部サイトへ移動:", url);
      window.location.href = url;
      // または新しいタブで開く
      // window.open(url, '_blank');
    } else {
      console.log("リンククリックをキャンセル");
    }
  });
});
```

**セキュリティ上の利点**:
- フィッシングサイトへの誤クリックを防ぐ
- ユーザーがリンク先を確認する機会を提供
- 意図しないページ遷移を防止

**実装のポイント**:
- `a[href^='http']`セレクタで外部リンクのみを対象
- `URL`オブジェクトでホスト名を抽出
- ユーザーの確認後に手動で遷移

### 例3：Google Docs - カスタムショートカットキー

Google Docsでは、Ctrl+SやCtrl+PなどのブラウザのデフォルトショートカットをpreventDefault()で無効化し、独自の動作を実装しています。

```javascript
// Google Docsのようなカスタムショートカット
document.addEventListener("keydown", function(event) {

  // Ctrl+S（保存）のブラウザデフォルト動作を防ぐ
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault(); // ブラウザの保存ダイアログを表示しない

    console.log("ドキュメントを自動保存中...");
    saveDocument();
  }

  // Ctrl+P（印刷）のブラウザデフォルト動作を防ぐ
  if (event.ctrlKey && event.key === "p") {
    event.preventDefault(); // ブラウザの印刷ダイアログを表示しない

    console.log("カスタム印刷ダイアログを表示");
    showCustomPrintDialog();
  }

  // Ctrl+F（検索）のブラウザデフォルト動作を防ぐ
  if (event.ctrlKey && event.key === "f") {
    event.preventDefault(); // ブラウザの検索バーを表示しない

    console.log("ドキュメント内検索を表示");
    showInDocumentSearch();
  }

  // Ctrl+B（太字）
  if (event.ctrlKey && event.key === "b") {
    event.preventDefault();
    console.log("選択テキストを太字に");
    toggleBold();
  }
});

function saveDocument() {
  // 自動保存処理（サーバーに送信など）
  console.log("ドキュメントが保存されました");
  showNotification("保存しました");
}

function showCustomPrintDialog() {
  // カスタム印刷ダイアログの表示
  console.log("カスタム印刷オプションを表示");
}

function showInDocumentSearch() {
  // ドキュメント内検索UIの表示
  console.log("検索バーを表示");
}

function toggleBold() {
  // 選択テキストの太字切り替え
  console.log("太字を切り替え");
}

function showNotification(message) {
  console.log("通知:", message);
}
```

**ブラウザのデフォルトショートカットをオーバーライド**:
- Ctrl+S: ブラウザの保存ダイアログ → アプリの自動保存
- Ctrl+P: ブラウザの印刷ダイアログ → カスタム印刷設定
- Ctrl+F: ブラウザの検索バー → ドキュメント内検索
- Ctrl+B: ブラウザのブックマーク → テキストの太字

**注意点**:
- ユーザーが期待するショートカットと異なる動作は避ける
- 代替の方法（メニューなど）も提供する
- アクセシビリティに配慮する

### 例4：Facebook - 無限スクロール

Facebookのニュースフィードでは、通常のページ遷移をpreventDefault()で防ぎ、JavaScriptで動的にコンテンツを読み込む無限スクロールを実装しています。

```javascript
// Facebookのような無限スクロール
let loadMoreLink = document.getElementById("loadMore");
let contentContainer = document.getElementById("contentContainer");
let currentPage = 1;
let isLoading = false;

loadMoreLink.addEventListener("click", function(event) {
  event.preventDefault(); // リンクのページ遷移を防ぐ

  if (isLoading) {
    console.log("既に読み込み中です");
    return;
  }

  isLoading = true;
  loadMoreLink.textContent = "読み込み中...";
  loadMoreLink.style.pointerEvents = "none";

  // 次のページを読み込む（実際にはAPIからデータを取得）
  currentPage++;
  console.log("ページ", currentPage, "を読み込み中...");

  // サーバーからデータを取得する（シミュレーション）
  setTimeout(function() {
    // 新しいコンテンツを追加
    for (let i = 1; i <= 5; i++) {
      let item = document.createElement("div");
      item.className = "content-item";
      item.textContent = "投稿 " + ((currentPage - 1) * 5 + i);
      item.style.padding = "15px";
      item.style.margin = "10px 0";
      item.style.backgroundColor = "#f0f0f0";
      item.style.borderRadius = "5px";
      contentContainer.appendChild(item);
    }

    isLoading = false;
    loadMoreLink.textContent = "さらに読み込む";
    loadMoreLink.style.pointerEvents = "auto";

    console.log("ページ", currentPage, "を読み込み完了");
  }, 1000);
});

// スクロールで自動読み込み（オプション）
window.addEventListener("scroll", function() {
  let scrollPosition = window.innerHeight + window.scrollY;
  let threshold = document.documentElement.scrollHeight - 200;

  if (scrollPosition >= threshold && !isLoading) {
    console.log("スクロール位置が閾値に達しました - 自動読み込み");
    loadMoreLink.click();
  }
});
```

**preventDefault()の役割**:
- 「もっと見る」リンクのページ遷移を防ぐ
- JavaScriptで動的にコンテンツを追加
- ページリロードなしでシームレスな体験を提供

**実装のポイント**:
- `isLoading`フラグで重複読み込みを防止
- スクロール位置で自動読み込みをトリガー
- ローディング状態の表示

### 例5：Amazon - フォームのAjax送信

Amazonの検索フォームやレビュー投稿では、フォーム送信のデフォルト動作（ページリロード）をpreventDefault()で防ぎ、Ajaxで非同期送信を行っています。

```javascript
// Amazonのような検索フォームのAjax送信
let searchForm = document.getElementById("searchForm");
let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let loadingIndicator = document.getElementById("loadingIndicator");

searchForm.addEventListener("submit", function(event) {
  event.preventDefault(); // フォーム送信によるページリロードを防ぐ

  let query = searchInput.value.trim();

  if (query === "") {
    console.log("検索キーワードを入力してください");
    return;
  }

  console.log("検索中:", query);

  // ローディング表示
  loadingIndicator.style.display = "block";
  searchResults.innerHTML = "";

  // 検索APIを呼び出す（シミュレーション）
  // 実際のコード: fetch('/api/search?q=' + encodeURIComponent(query))
  setTimeout(function() {
    // 検索結果を表示
    let results = [
      { title: "商品A - " + query, price: "¥1,980" },
      { title: "商品B - " + query, price: "¥2,480" },
      { title: "商品C - " + query, price: "¥3,980" },
      { title: "商品D - " + query, price: "¥1,280" },
      { title: "商品E - " + query, price: "¥4,980" }
    ];

    loadingIndicator.style.display = "none";

    results.forEach(function(result) {
      let resultItem = document.createElement("div");
      resultItem.className = "search-result-item";
      resultItem.style.padding = "15px";
      resultItem.style.margin = "10px 0";
      resultItem.style.border = "1px solid #ddd";
      resultItem.style.borderRadius = "5px";
      resultItem.style.cursor = "pointer";

      resultItem.innerHTML = `
        <div style="font-weight: bold;">${result.title}</div>
        <div style="color: #B12704; font-size: 18px; margin-top: 5px;">${result.price}</div>
      `;

      resultItem.addEventListener("mouseenter", function() {
        this.style.backgroundColor = "#f0f0f0";
      });

      resultItem.addEventListener("mouseleave", function() {
        this.style.backgroundColor = "";
      });

      searchResults.appendChild(resultItem);
    });

    console.log("検索完了:", results.length, "件の結果");
  }, 800);
});

// リアルタイム検索サジェスト（入力中）
searchInput.addEventListener("input", function() {
  let query = this.value.trim();

  if (query.length >= 2) {
    console.log("サジェスト表示:", query);
    // サジェストAPIを呼び出す
    // showSuggestions(query);
  }
});
```

**preventDefault()によるメリット**:
- ページリロードなしで検索結果を表示
- ユーザー体験が向上（スムーズ、高速）
- ブラウザ履歴が汚れない
- 複数の検索を連続して実行しやすい

**実装の流れ**:
1. フォーム送信でpreventDefault()を呼ぶ
2. 入力値を取得してバリデーション
3. ローディング表示
4. Ajaxでサーバーに送信（fetch APIなど）
5. 結果を動的にDOMに追加

## デフォルト動作とは

ブラウザには、特定の要素やイベントに対して、あらかじめ決められた動作があります。これをデフォルト動作と呼びます。

### 主なデフォルト動作の例

**1. リンク（a要素）のクリック**:
- クリックすると、href属性で指定されたURLに移動します
- 新しいタブで開く場合もあります（target="_blank"）

**2. フォームの送信**:
- 送信ボタンをクリックすると、フォームが送信されてページがリロードされます
- action属性で指定されたURLにデータが送信されます

**3. チェックボックス/ラジオボタンのクリック**:
- クリックすると、チェック状態が切り替わります

**4. テキスト選択**:
- ドラッグすると、テキストが選択されます
- ダブルクリックで単語を選択、トリプルクリックで行を選択

**5. 右クリック（コンテキストメニュー）**:
- 右クリックすると、コンテキストメニューが表示されます

**6. ドラッグ&ドロップ**:
- ファイルをブラウザにドロップすると、ファイルが開かれます
- 画像をドラッグすると、画像がコピーされます

**7. スペースキー/矢印キーのスクロール**:
- スペースキーでページ下にスクロール
- 矢印キーで少しずつスクロール

**8. Enterキーでのフォーム送信**:
- input要素でEnterキーを押すと、フォームが送信されます

## preventDefault()とは

`event.preventDefault()`は、イベントのデフォルト動作をキャンセルするメソッドです。

### 基本的な使い方

```javascript
element.addEventListener("click", function(event) {
  event.preventDefault(); // デフォルト動作をキャンセル
  // ここに独自の処理を書く
  console.log("デフォルト動作をキャンセルしました");
});
```

`event.preventDefault()`を呼び出すと、そのイベントのデフォルト動作が実行されなくなります。

### preventDefault()の効果

**preventDefault()を呼ぶ前**:
```
クリック → デフォルト動作実行 → イベントリスナー実行
```

**preventDefault()を呼んだ後**:
```
クリック → デフォルト動作キャンセル ⛔ → イベントリスナー実行
```

### いつ使うか

- **フォームのカスタムバリデーション**: 送信前にチェックして、エラーがあれば送信をキャンセル
- **Ajax送信**: ページリロードを防いで、JavaScriptで送信処理
- **カスタムリンク動作**: リンクをボタンのように使う
- **ショートカットキーの実装**: ブラウザのデフォルトショートカットを上書き
- **ドラッグ&ドロップ**: ブラウザがファイルを開くのを防ぐ

## デフォルト動作の阻止

さまざまなデフォルト動作をpreventDefault()で阻止する方法を見ていきましょう。

### リンククリックの阻止

```html
<a href="https://example.com" id="customLink">クリックしても移動しません</a>
<p id="message"></p>
```

```javascript
let customLink = document.getElementById("customLink");
let message = document.getElementById("message");

customLink.addEventListener("click", function(event) {
  event.preventDefault(); // ページ遷移をキャンセル

  message.textContent = "リンクがクリックされましたが、ページは移動しませんでした";
  console.log("リンククリック検出 - 遷移なし");
});
```

**動作**:
- リンクをクリックしても、`https://example.com`に移動しない
- 代わりにメッセージが表示される

### フォーム送信の阻止

```html
<form id="myForm">
  <input type="text" id="nameInput" placeholder="名前を入力">
  <button type="submit">送信</button>
</form>
<p id="result"></p>
```

```javascript
let myForm = document.getElementById("myForm");
let nameInput = document.getElementById("nameInput");
let result = document.getElementById("result");

myForm.addEventListener("submit", function(event) {
  event.preventDefault(); // フォーム送信をキャンセル

  let name = nameInput.value;
  result.textContent = name + "さん、送信されました（ページはリロードされません）";
  console.log("フォーム送信検出 - リロードなし");
});
```

**動作**:
- 送信ボタンをクリックしても、ページがリロードされない
- JavaScriptで値を取得して処理できる

### 右クリックメニューの阻止

```html
<div id="protectedArea" style="width: 300px; height: 200px; background: lightblue; padding: 20px;">
  この領域では右クリックメニューが表示されません
</div>
```

```javascript
let protectedArea = document.getElementById("protectedArea");

protectedArea.addEventListener("contextmenu", function(event) {
  event.preventDefault(); // 右クリックメニューをキャンセル

  console.log("右クリック検出 - メニューを表示しない");
  alert("この領域では右クリックメニューは無効です");
});
```

**動作**:
- 右クリックしてもコンテキストメニューが表示されない
- 独自のメニューを表示することも可能

### キーボード入力の阻止

```html
<input type="text" id="numberOnly" placeholder="数字のみ入力可能">
```

```javascript
let numberOnly = document.getElementById("numberOnly");

numberOnly.addEventListener("keydown", function(event) {
  // 数字キーと制御キー以外を阻止
  let allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                     "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

  if (!allowedKeys.includes(event.key)) {
    event.preventDefault(); // 数字以外の入力をキャンセル
    console.log("入力拒否:", event.key);
  }
});
```

**動作**:
- 数字と一部の制御キーのみ入力可能
- アルファベットや記号は入力できない

## リンクのキャンセル

リンクのデフォルト動作をキャンセルして、さまざまな独自動作を実装できます。

### 確認ダイアログ付きリンク

```html
<a href="https://example.com/delete" id="deleteLink">アカウントを削除</a>
```

```javascript
let deleteLink = document.getElementById("deleteLink");

deleteLink.addEventListener("click", function(event) {
  event.preventDefault(); // リンクの即座の遷移を防ぐ

  let confirmed = confirm("本当にアカウントを削除しますか？この操作は取り消せません。");

  if (confirmed) {
    console.log("削除を実行");
    // 実際には削除APIを呼び出す
    // window.location.href = this.href; // または手動で遷移
  } else {
    console.log("削除をキャンセル");
  }
});
```

### タブ切り替えの実装

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>タブ切り替え</title>
    <style>
        .tabs {
            display: flex;
            border-bottom: 2px solid #ddd;
        }

        .tab {
            padding: 12px 24px;
            background-color: #f0f0f0;
            cursor: pointer;
            text-decoration: none;
            color: #333;
            border: 1px solid #ddd;
            border-bottom: none;
            margin-right: 5px;
            border-radius: 5px 5px 0 0;
            transition: background-color 0.3s;
        }

        .tab:hover {
            background-color: #e0e0e0;
        }

        .tab.active {
            background-color: white;
            font-weight: bold;
            color: #2196f3;
        }

        .tab-content {
            display: none;
            padding: 20px;
            border: 1px solid #ddd;
            border-top: none;
        }

        .tab-content.active {
            display: block;
        }
    </style>
</head>
<body>
    <h1>タブ切り替えインターフェース</h1>

    <div class="tabs">
        <a href="#home" class="tab active" data-tab="home">ホーム</a>
        <a href="#profile" class="tab" data-tab="profile">プロフィール</a>
        <a href="#settings" class="tab" data-tab="settings">設定</a>
        <a href="#help" class="tab" data-tab="help">ヘルプ</a>
    </div>

    <div id="home" class="tab-content active">
        <h2>ホーム</h2>
        <p>ホームタブの内容がここに表示されます。</p>
    </div>

    <div id="profile" class="tab-content">
        <h2>プロフィール</h2>
        <p>プロフィール情報がここに表示されます。</p>
    </div>

    <div id="settings" class="tab-content">
        <h2>設定</h2>
        <p>設定オプションがここに表示されます。</p>
    </div>

    <div id="help" class="tab-content">
        <h2>ヘルプ</h2>
        <p>ヘルプ情報がここに表示されます。</p>
    </div>

    <script>
        let tabs = document.querySelectorAll(".tab");
        let tabContents = document.querySelectorAll(".tab-content");

        tabs.forEach(function(tab) {
          tab.addEventListener("click", function(event) {
            event.preventDefault(); // リンクのデフォルト動作（ページ遷移）をキャンセル

            // すべてのタブとコンテンツからactiveクラスを削除
            tabs.forEach(function(t) {
              t.classList.remove("active");
            });
            tabContents.forEach(function(content) {
              content.classList.remove("active");
            });

            // クリックされたタブと対応するコンテンツにactiveクラスを追加
            this.classList.add("active");
            let targetId = this.dataset.tab;
            document.getElementById(targetId).classList.add("active");

            console.log("タブ切り替え:", targetId);
          });
        });
    </script>
</body>
</html>
```

**実装のポイント**:
- `preventDefault()`でリンクのページ遷移を防ぐ
- `data-tab`属性で対応するコンテンツを指定
- すべてのタブから`active`クラスを削除してから、選択されたタブに追加

### モーダルウィンドウを開くリンク

```html
<a href="#" id="openModal">詳細を見る</a>

<div id="modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5);">
  <div style="background: white; width: 500px; margin: 100px auto; padding: 30px; border-radius: 8px;">
    <h2>詳細情報</h2>
    <p>モーダルの内容がここに表示されます。</p>
    <button id="closeModal">閉じる</button>
  </div>
</div>
```

```javascript
let openModal = document.getElementById("openModal");
let modal = document.getElementById("modal");
let closeModal = document.getElementById("closeModal");

openModal.addEventListener("click", function(event) {
  event.preventDefault(); // リンクのデフォルト動作を防ぐ

  modal.style.display = "block";
  console.log("モーダルを表示");
});

closeModal.addEventListener("click", function() {
  modal.style.display = "none";
  console.log("モーダルを閉じる");
});

// モーダル背景クリックで閉じる
modal.addEventListener("click", function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
    console.log("背景クリックでモーダルを閉じる");
  }
});
```

## フォーム送信の制御

フォーム送信のデフォルト動作をキャンセルして、JavaScriptで独自の処理を行います。

### バリデーション付きフォーム

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>フォームバリデーション</title>
    <style>
        .form-group {
            margin: 15px 0;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        input {
            width: 300px;
            padding: 8px;
            border: 2px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }

        input.error {
            border-color: #f44336;
        }

        input.success {
            border-color: #4caf50;
        }

        .error-message {
            color: #f44336;
            font-size: 12px;
            margin-top: 5px;
            display: none;
        }

        .error-message.show {
            display: block;
        }

        button {
            padding: 10px 20px;
            background-color: #2196f3;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }

        button:hover {
            background-color: #1976d2;
        }

        button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }

        .success-message {
            padding: 15px;
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            border-radius: 4px;
            margin-top: 20px;
            display: none;
        }

        .success-message.show {
            display: block;
        }
    </style>
</head>
<body>
    <h1>ユーザー登録フォーム</h1>

    <form id="registerForm">
        <div class="form-group">
            <label for="username">ユーザー名（4文字以上）:</label>
            <input type="text" id="username" name="username">
            <div class="error-message" id="usernameError">ユーザー名は4文字以上で入力してください</div>
        </div>

        <div class="form-group">
            <label for="email">メールアドレス:</label>
            <input type="text" id="email" name="email">
            <div class="error-message" id="emailError">正しいメールアドレスを入力してください</div>
        </div>

        <div class="form-group">
            <label for="password">パスワード（8文字以上）:</label>
            <input type="password" id="password" name="password">
            <div class="error-message" id="passwordError">パスワードは8文字以上で入力してください</div>
        </div>

        <div class="form-group">
            <label for="confirmPassword">パスワード（確認）:</label>
            <input type="password" id="confirmPassword" name="confirmPassword">
            <div class="error-message" id="confirmPasswordError">パスワードが一致しません</div>
        </div>

        <button type="submit">登録</button>
    </form>

    <div class="success-message" id="successMessage">
        登録が完了しました！
    </div>

    <script>
        let registerForm = document.getElementById("registerForm");
        let usernameInput = document.getElementById("username");
        let emailInput = document.getElementById("email");
        let passwordInput = document.getElementById("password");
        let confirmPasswordInput = document.getElementById("confirmPassword");

        let usernameError = document.getElementById("usernameError");
        let emailError = document.getElementById("emailError");
        let passwordError = document.getElementById("passwordError");
        let confirmPasswordError = document.getElementById("confirmPasswordError");

        let successMessage = document.getElementById("successMessage");

        registerForm.addEventListener("submit", function(event) {
          event.preventDefault(); // フォーム送信をキャンセル

          console.log("フォーム送信を検出 - バリデーション開始");

          // エラーメッセージとクラスをクリア
          clearErrors();

          // バリデーション
          let isValid = true;

          // ユーザー名チェック
          let username = usernameInput.value.trim();
          if (username.length < 4) {
            showError(usernameInput, usernameError);
            isValid = false;
          } else {
            showSuccess(usernameInput);
          }

          // メールアドレスチェック
          let email = emailInput.value.trim();
          let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(email)) {
            showError(emailInput, emailError);
            isValid = false;
          } else {
            showSuccess(emailInput);
          }

          // パスワードチェック
          let password = passwordInput.value;
          if (password.length < 8) {
            showError(passwordInput, passwordError);
            isValid = false;
          } else {
            showSuccess(passwordInput);
          }

          // パスワード確認チェック
          let confirmPassword = confirmPasswordInput.value;
          if (password !== confirmPassword) {
            showError(confirmPasswordInput, confirmPasswordError);
            isValid = false;
          } else {
            showSuccess(confirmPasswordInput);
          }

          // バリデーション結果
          if (isValid) {
            console.log("バリデーション成功 - 登録処理を実行");
            successMessage.classList.add("show");

            // フォームをリセット
            registerForm.reset();
            clearErrors();

            // 実際のアプリケーションでは、ここでサーバーにデータを送信
            // submitToServer({ username, email, password });
          } else {
            console.log("バリデーションエラー - 送信を中止");
          }
        });

        function showError(input, errorElement) {
          input.classList.add("error");
          input.classList.remove("success");
          errorElement.classList.add("show");
        }

        function showSuccess(input) {
          input.classList.add("success");
          input.classList.remove("error");
        }

        function clearErrors() {
          let inputs = [usernameInput, emailInput, passwordInput, confirmPasswordInput];
          let errors = [usernameError, emailError, passwordError, confirmPasswordError];

          inputs.forEach(function(input) {
            input.classList.remove("error", "success");
          });

          errors.forEach(function(error) {
            error.classList.remove("show");
          });

          successMessage.classList.remove("show");
        }
    </script>
</body>
</html>
```

**実装のポイント**:
- `preventDefault()`でフォーム送信を防ぐ
- すべての入力フィールドをバリデーション
- エラーがある場合は送信を中止
- すべて正しい場合のみ送信処理を実行

### Ajax送信（fetch API）

```html
<form id="contactForm">
  <input type="text" id="name" placeholder="名前" required>
  <input type="email" id="email" placeholder="メール" required>
  <textarea id="message" placeholder="メッセージ" required></textarea>
  <button type="submit">送信</button>
</form>
<div id="status"></div>
```

```javascript
let contactForm = document.getElementById("contactForm");
let status = document.getElementById("status");

contactForm.addEventListener("submit", function(event) {
  event.preventDefault(); // フォーム送信をキャンセル

  let formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  console.log("送信データ:", formData);

  status.textContent = "送信中...";

  // fetchでサーバーに送信（実際のコード例）
  /*
  fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    status.textContent = "送信完了！";
    contactForm.reset();
  })
  .catch(function(error) {
    status.textContent = "送信エラー: " + error.message;
  });
  */

  // デモ用のシミュレーション
  setTimeout(function() {
    status.textContent = "送信完了！（デモ）";
    contactForm.reset();
  }, 1000);
});
```

## よくある間違い

### 間違い1：preventDefault()を呼ぶ位置が遅い

**問題のあるコード**:

```javascript
form.addEventListener("submit", function(event) {
  // バリデーション処理
  let username = document.getElementById("username").value;

  if (username.length < 4) {
    console.log("エラー: ユーザー名が短すぎます");
    event.preventDefault(); // ここで呼んでも遅い場合がある
    return;
  }

  // さらに処理...
});
```

**何が問題か**:
- バリデーション処理の後にpreventDefault()を呼んでいる
- 処理が遅れると、フォームが送信されてしまう可能性がある
- エラーハンドリングが複雑になる

**正しいコード**:

```javascript
form.addEventListener("submit", function(event) {
  event.preventDefault(); // 最初に呼ぶ

  // バリデーション処理
  let username = document.getElementById("username").value;

  if (username.length < 4) {
    console.log("エラー: ユーザー名が短すぎます");
    return;
  }

  // バリデーションOKなら手動で送信
  console.log("バリデーション成功");
  // form.submit(); // または手動送信
  // submitToServer();
});
```

**ベストプラクティス**:
- `event.preventDefault()`は常に最初に呼ぶ
- バリデーション成功時に手動で送信処理を行う
- エラーハンドリングがシンプルになる

### 間違い2：return falseを使う

**問題のあるコード**:

```javascript
link.addEventListener("click", function(event) {
  console.log("リンクがクリックされました");
  return false; // addEventListener では効果がない
});
```

**何が問題か**:
- `addEventListener`では`return false`は無効
- jQueryでは動作するが、素のJavaScriptでは動作しない
- デフォルト動作が実行されてしまう

**正しいコード**:

```javascript
link.addEventListener("click", function(event) {
  event.preventDefault(); // これが正しい方法
  console.log("リンクがクリックされました - 遷移なし");
});
```

**return falseが機能する場合**:
```html
<!-- HTML属性のイベントハンドラでは動作する -->
<a href="https://example.com" onclick="return false;">クリック</a>
```

しかし、これは古い方法で推奨されません。`addEventListener`と`preventDefault()`を使いましょう。

### 間違い3：すべてのイベントでpreventDefault()を呼ぶ

**問題のあるコード**:

```javascript
// すべてのリンクでデフォルト動作をキャンセル
let allLinks = document.querySelectorAll("a");

allLinks.forEach(function(link) {
  link.addEventListener("click", function(event) {
    event.preventDefault(); // すべてのリンクが機能しなくなる
    console.log("リンククリック");
  });
});
```

**何が問題か**:
- ページ内のすべてのリンクが動作しなくなる
- ユーザーが期待する動作ができなくなる
- ナビゲーションが機能しなくなる

**正しいコード**:

```javascript
// 特定の条件でのみpreventDefault()を使う
let externalLinks = document.querySelectorAll("a[href^='http']");

externalLinks.forEach(function(link) {
  // 外部リンクのみ確認ダイアログを表示
  if (!link.href.includes(window.location.hostname)) {
    link.addEventListener("click", function(event) {
      event.preventDefault();

      let confirmed = confirm("外部サイトに移動しますか？");
      if (confirmed) {
        window.location.href = this.href;
      }
    });
  }
});
```

**選択的なpreventDefault()の例**:

```javascript
document.addEventListener("click", function(event) {
  let link = event.target.closest("a");

  if (link) {
    // 特定のクラスを持つリンクのみキャンセル
    if (link.classList.contains("modal-trigger")) {
      event.preventDefault();
      openModal(link.dataset.modalId);
    }
    // それ以外のリンクは通常通り動作
  }
});
```

### 間違い4：dragoverイベントでpreventDefault()を忘れる

**問題のあるコード**:

```javascript
let dropZone = document.getElementById("dropZone");

// dragoverでpreventDefault()を呼んでいない
dropZone.addEventListener("dragover", function(event) {
  console.log("ドラッグオーバー");
  // event.preventDefault()がない！
});

dropZone.addEventListener("drop", function(event) {
  event.preventDefault();
  console.log("ドロップ"); // このイベントが発火しない
});
```

**何が問題か**:
- `dragover`イベントでpreventDefault()を呼ばないと、`drop`イベントが発火しない
- ドラッグ&ドロップが機能しない
- ブラウザがファイルを開いてしまう

**正しいコード**:

```javascript
let dropZone = document.getElementById("dropZone");

dropZone.addEventListener("dragover", function(event) {
  event.preventDefault(); // 必須！
  event.dataTransfer.dropEffect = "copy";
  console.log("ドラッグオーバー");
});

dropZone.addEventListener("drop", function(event) {
  event.preventDefault(); // これも必須
  console.log("ドロップ");

  let files = event.dataTransfer.files;
  console.log("ファイル数:", files.length);
});
```

**ドラッグ&ドロップに必要なpreventDefault()**:
- `dragover`: dropを有効にするために必須
- `drop`: ブラウザがファイルを開くのを防ぐために必須
- 両方呼ばないと正しく動作しない

### 間違い5：キャンセル不可能なイベントでpreventDefault()を呼ぶ

**問題のあるコード**:

```javascript
element.addEventListener("scroll", function(event) {
  event.preventDefault(); // scrollイベントはキャンセルできない
  console.log("スクロールをキャンセル");
});
```

**何が問題か**:
- 一部のイベントはキャンセルできない（cancelable = false）
- `preventDefault()`を呼んでも効果がない
- エラーにはならないが、意図した動作にならない

**キャンセルできないイベントの例**:
- `scroll`: スクロールイベント（既に発生した後）
- `load`: ページ/画像の読み込み完了
- `error`: エラー発生
- `focus`/`blur`: フォーカスの変更（一部の状況）

**event.cancelableで確認する**:

```javascript
element.addEventListener("scroll", function(event) {
  console.log("キャンセル可能:", event.cancelable); // false

  if (event.cancelable) {
    event.preventDefault();
  } else {
    console.log("このイベントはキャンセルできません");
  }
});
```

**正しい使用例**:

```javascript
// キャンセル可能なイベント
link.addEventListener("click", function(event) {
  console.log("キャンセル可能:", event.cancelable); // true
  event.preventDefault(); // 正しく動作
});

form.addEventListener("submit", function(event) {
  console.log("キャンセル可能:", event.cancelable); // true
  event.preventDefault(); // 正しく動作
});

document.addEventListener("keydown", function(event) {
  console.log("キャンセル可能:", event.cancelable); // true
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault(); // 正しく動作
  }
});
```

### 間違い6：フォーム送信で手動submit()を呼ぶ

**問題のあるコード**:

```javascript
let form = document.getElementById("myForm");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  console.log("バリデーション中...");

  // バリデーション成功
  if (isValid()) {
    form.submit(); // これは無限ループになる可能性がある
  }
});
```

**何が問題か**:
- `form.submit()`を呼ぶと、submitイベントが再度発火する場合がある
- 無限ループに陥る可能性
- または、submitイベントが発火しないため、バリデーションがスキップされる

**正しいコード（パターン1）- Ajaxで送信**:

```javascript
form.addEventListener("submit", function(event) {
  event.preventDefault();

  if (isValid()) {
    // Ajaxで送信（推奨）
    let formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData
    })
    .then(function(response) {
      console.log("送信完了");
    });
  }
});
```

**正しいコード（パターン2）- フラグを使う**:

```javascript
let isSubmitting = false;

form.addEventListener("submit", function(event) {
  if (!isSubmitting) {
    event.preventDefault();

    if (isValid()) {
      isSubmitting = true;
      form.submit(); // フラグがtrueなのでpreventDefault()は呼ばれない
    }
  }
});
```

**正しいコード（パターン3）- リスナーを削除**:

```javascript
form.addEventListener("submit", function handleSubmit(event) {
  event.preventDefault();

  if (isValid()) {
    // リスナーを削除してから送信
    form.removeEventListener("submit", handleSubmit);
    form.submit();
  }
});
```

## 実践アプリケーション1：カスタム右クリックメニュー

ブラウザの右クリックメニューを無効化して、独自のコンテキストメニューを表示するアプリケーションを作成します。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>カスタム右クリックメニュー</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f5f5f5;
        }

        .content-area {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            min-height: 400px;
        }

        .context-menu {
            position: fixed;
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            padding: 5px 0;
            min-width: 200px;
            display: none;
            z-index: 1000;
        }

        .context-menu-item {
            padding: 10px 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .context-menu-item:hover {
            background-color: #f0f0f0;
        }

        .context-menu-item.disabled {
            color: #ccc;
            cursor: not-allowed;
        }

        .context-menu-item.disabled:hover {
            background-color: white;
        }

        .context-menu-divider {
            height: 1px;
            background-color: #e0e0e0;
            margin: 5px 0;
        }

        .icon {
            width: 16px;
            text-align: center;
        }

        #notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4caf50;
            color: white;
            padding: 15px 20px;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            display: none;
        }
    </style>
</head>
<body>
    <h1>カスタム右クリックメニュー</h1>
    <p>この領域で右クリックしてみてください</p>

    <div class="content-area" id="contentArea">
        <h2>コンテンツエリア</h2>
        <p>ここで右クリックすると、カスタムメニューが表示されます。</p>
        <p>通常のブラウザの右クリックメニューは表示されません。</p>
    </div>

    <div class="context-menu" id="contextMenu">
        <div class="context-menu-item" data-action="copy">
            <span class="icon">📋</span>
            <span>コピー</span>
        </div>
        <div class="context-menu-item" data-action="paste">
            <span class="icon">📄</span>
            <span>貼り付け</span>
        </div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item" data-action="selectAll">
            <span class="icon">✅</span>
            <span>すべて選択</span>
        </div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item" data-action="inspect">
            <span class="icon">🔍</span>
            <span>要素を検証</span>
        </div>
        <div class="context-menu-item" data-action="reload">
            <span class="icon">🔄</span>
            <span>再読み込み</span>
        </div>
    </div>

    <div id="notification"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let contentArea = document.getElementById("contentArea");
let contextMenu = document.getElementById("contextMenu");
let notification = document.getElementById("notification");

// 右クリックメニューの表示
contentArea.addEventListener("contextmenu", function(event) {
  event.preventDefault(); // ブラウザのデフォルト右クリックメニューを無効化

  // メニューの位置を設定
  let x = event.clientX;
  let y = event.clientY;

  // 画面外に出ないように調整
  let menuWidth = 200;
  let menuHeight = 300;

  if (x + menuWidth > window.innerWidth) {
    x = window.innerWidth - menuWidth - 10;
  }

  if (y + menuHeight > window.innerHeight) {
    y = window.innerHeight - menuHeight - 10;
  }

  contextMenu.style.left = x + "px";
  contextMenu.style.top = y + "px";
  contextMenu.style.display = "block";

  console.log("カスタムメニューを表示:", x, y);
});

// メニュー項目のクリック
let menuItems = document.querySelectorAll(".context-menu-item");

menuItems.forEach(function(item) {
  item.addEventListener("click", function() {
    if (this.classList.contains("disabled")) {
      return;
    }

    let action = this.dataset.action;
    console.log("メニュー項目クリック:", action);

    // メニューを閉じる
    contextMenu.style.display = "none";

    // アクションを実行
    executeAction(action);
  });
});

// アクション実行
function executeAction(action) {
  switch (action) {
    case "copy":
      showNotification("コピーしました");
      // document.execCommand('copy'); // 実際のコピー処理
      break;

    case "paste":
      showNotification("貼り付けました");
      // document.execCommand('paste'); // 実際の貼り付け処理
      break;

    case "selectAll":
      showNotification("すべて選択しました");
      // 選択処理
      let range = document.createRange();
      range.selectNodeContents(contentArea);
      let selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      break;

    case "inspect":
      showNotification("要素の検証（開発者ツール）");
      console.log("開発者ツールを開く");
      break;

    case "reload":
      showNotification("ページを再読み込み");
      // location.reload();
      break;
  }
}

// 通知表示
function showNotification(message) {
  notification.textContent = message;
  notification.style.display = "block";

  setTimeout(function() {
    notification.style.display = "none";
  }, 2000);
}

// ドキュメント全体のクリックでメニューを閉じる
document.addEventListener("click", function(event) {
  if (!contextMenu.contains(event.target)) {
    contextMenu.style.display = "none";
  }
});

// Escapeキーでメニューを閉じる
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    contextMenu.style.display = "none";
  }
});
```

### アプリケーションの機能説明

**preventDefault()の使用**:
- `contextmenu`イベントでpreventDefault()を呼び、ブラウザの右クリックメニューを無効化
- カスタムメニューを指定位置に表示

**画面外チェック**:
- メニューが画面外に出ないように位置を調整
- `window.innerWidth`と`window.innerHeight`で境界をチェック

**メニュー操作**:
- 各メニュー項目をクリックでアクション実行
- 外側クリックまたはEscapeキーでメニューを閉じる

## 実践アプリケーション2：ドラッグ&ドロップファイルアップローダー

ファイルをドラッグ&ドロップで追加できるアップローダーを作成します。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>ファイルアップローダー</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }

        .container {
            background-color: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        h1 {
            color: #333;
            margin-bottom: 10px;
        }

        .subtitle {
            color: #666;
            margin-bottom: 30px;
        }

        .drop-zone {
            border: 3px dashed #ccc;
            border-radius: 8px;
            padding: 60px 20px;
            text-align: center;
            background-color: #fafafa;
            cursor: pointer;
            transition: all 0.3s;
        }

        .drop-zone:hover {
            border-color: #999;
            background-color: #f0f0f0;
        }

        .drop-zone.drag-over {
            border-color: #4caf50;
            background-color: #e8f5e9;
            transform: scale(1.02);
        }

        .drop-zone-icon {
            font-size: 48px;
            margin-bottom: 10px;
        }

        .drop-zone-text {
            font-size: 18px;
            color: #666;
            margin-bottom: 10px;
        }

        .drop-zone-hint {
            font-size: 14px;
            color: #999;
        }

        .file-input {
            display: none;
        }

        .file-list {
            margin-top: 30px;
        }

        .file-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px;
            margin: 10px 0;
            background-color: #f8f9fa;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
        }

        .file-info {
            display: flex;
            align-items: center;
            gap: 15px;
            flex: 1;
        }

        .file-icon {
            font-size: 24px;
        }

        .file-details {
            flex: 1;
        }

        .file-name {
            font-weight: bold;
            color: #333;
        }

        .file-size {
            font-size: 12px;
            color: #999;
        }

        .file-actions {
            display: flex;
            gap: 10px;
        }

        .btn {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s;
        }

        .btn-remove {
            background-color: #f44336;
            color: white;
        }

        .btn-remove:hover {
            background-color: #d32f2f;
        }

        .upload-btn {
            margin-top: 20px;
            padding: 12px 24px;
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            width: 100%;
            font-weight: bold;
        }

        .upload-btn:hover {
            background-color: #45a049;
        }

        .upload-btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📁 ファイルアップローダー</h1>
        <p class="subtitle">ファイルをドラッグ&ドロップするか、クリックして選択してください</p>

        <div class="drop-zone" id="dropZone">
            <div class="drop-zone-icon">📂</div>
            <div class="drop-zone-text">ファイルをここにドロップ</div>
            <div class="drop-zone-hint">または、クリックしてファイルを選択</div>
        </div>

        <input type="file" id="fileInput" class="file-input" multiple>

        <div class="file-list" id="fileList"></div>

        <button class="upload-btn" id="uploadBtn" disabled>アップロード</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let dropZone = document.getElementById("dropZone");
let fileInput = document.getElementById("fileInput");
let fileList = document.getElementById("fileList");
let uploadBtn = document.getElementById("uploadBtn");

let files = [];

// ドロップゾーンのクリックでファイル選択ダイアログを開く
dropZone.addEventListener("click", function() {
  fileInput.click();
});

// ファイル入力の変更
fileInput.addEventListener("change", function(event) {
  handleFiles(event.target.files);
});

// ドラッグオーバー
dropZone.addEventListener("dragover", function(event) {
  event.preventDefault(); // 重要：これがないとdropが発火しない
  dropZone.classList.add("drag-over");
});

// ドラッグリーブ
dropZone.addEventListener("dragleave", function(event) {
  dropZone.classList.remove("drag-over");
});

// ドロップ
dropZone.addEventListener("drop", function(event) {
  event.preventDefault(); // ブラウザがファイルを開くのを防ぐ
  dropZone.classList.remove("drag-over");

  let droppedFiles = event.dataTransfer.files;
  console.log("ファイルがドロップされました:", droppedFiles.length, "個");

  handleFiles(droppedFiles);
});

// ファイル処理
function handleFiles(newFiles) {
  console.log("ファイルを処理中:", newFiles.length, "個");

  for (let i = 0; i < newFiles.length; i++) {
    let file = newFiles[i];

    // ファイルサイズチェック（10MB制限）
    if (file.size > 10 * 1024 * 1024) {
      alert(file.name + " は大きすぎます（最大10MB）");
      continue;
    }

    files.push(file);
    console.log("ファイル追加:", file.name);
  }

  renderFileList();
  updateUploadButton();
}

// ファイルリスト表示
function renderFileList() {
  fileList.innerHTML = "";

  files.forEach(function(file, index) {
    let fileItem = document.createElement("div");
    fileItem.className = "file-item";

    let fileIcon = getFileIcon(file.type);
    let fileSize = formatFileSize(file.size);

    fileItem.innerHTML = `
      <div class="file-info">
        <div class="file-icon">${fileIcon}</div>
        <div class="file-details">
          <div class="file-name">${file.name}</div>
          <div class="file-size">${fileSize}</div>
        </div>
      </div>
      <div class="file-actions">
        <button class="btn btn-remove" data-index="${index}">削除</button>
      </div>
    `;

    fileList.appendChild(fileItem);
  });

  // 削除ボタンのイベント
  let removeButtons = document.querySelectorAll(".btn-remove");
  removeButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      let index = parseInt(this.dataset.index);
      removeFile(index);
    });
  });
}

// ファイル削除
function removeFile(index) {
  console.log("ファイルを削除:", files[index].name);
  files.splice(index, 1);
  renderFileList();
  updateUploadButton();
}

// アップロードボタンの状態更新
function updateUploadButton() {
  uploadBtn.disabled = files.length === 0;
}

// ファイルアイコン取得
function getFileIcon(fileType) {
  if (fileType.startsWith("image/")) return "🖼️";
  if (fileType.startsWith("video/")) return "🎥";
  if (fileType.startsWith("audio/")) return "🎵";
  if (fileType.includes("pdf")) return "📕";
  if (fileType.includes("word")) return "📘";
  if (fileType.includes("excel") || fileType.includes("spreadsheet")) return "📊";
  if (fileType.includes("zip") || fileType.includes("rar")) return "🗜️";
  return "📄";
}

// ファイルサイズフォーマット
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";

  let k = 1024;
  let sizes = ["Bytes", "KB", "MB", "GB"];
  let i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
}

// アップロード処理
uploadBtn.addEventListener("click", function() {
  console.log("アップロード開始:", files.length, "個のファイル");

  // 実際のアップロード処理（FormDataを使用）
  let formData = new FormData();

  files.forEach(function(file) {
    formData.append("files[]", file);
  });

  console.log("FormData準備完了");

  // fetch APIでアップロード（例）
  /*
  fetch('/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('アップロード成功:', data);
    files = [];
    renderFileList();
    updateUploadButton();
  })
  .catch(error => {
    console.error('アップロードエラー:', error);
  });
  */

  // デモ用
  alert(files.length + "個のファイルをアップロードします（デモ）");
  files = [];
  renderFileList();
  updateUploadButton();
});

console.log("ファイルアップローダー初期化完了");
```

### アプリケーションの機能説明

**preventDefault()の重要な使用箇所**:
1. `dragover`イベント: dropイベントを有効にするために必須
2. `drop`イベント: ブラウザがファイルを開くのを防ぐために必須

**ファイル処理**:
- ドラッグ&ドロップとクリック選択の両方に対応
- ファイルサイズチェック（10MB制限）
- ファイルタイプに応じたアイコン表示

**ユーザー体験**:
- ドラッグオーバー時の視覚的フィードバック
- ファイルリストの動的表示
- 個別のファイル削除機能

## 実践アプリケーション3：マルチステップフォーム

複数ページにわたるフォームを、preventDefault()を使ってシングルページで実装します。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>マルチステップフォーム</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            margin: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        h1 {
            color: #333;
            margin-bottom: 10px;
        }

        .progress-bar {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            position: relative;
        }

        .progress-bar::before {
            content: "";
            position: absolute;
            top: 20px;
            left: 0;
            right: 0;
            height: 2px;
            background-color: #e0e0e0;
            z-index: 0;
        }

        .progress-step {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #e0e0e0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #999;
            position: relative;
            z-index: 1;
        }

        .progress-step.active {
            background-color: #667eea;
            color: white;
        }

        .progress-step.completed {
            background-color: #4caf50;
            color: white;
        }

        .form-step {
            display: none;
        }

        .form-step.active {
            display: block;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #333;
        }

        input, select, textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            font-size: 14px;
            box-sizing: border-box;
        }

        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #667eea;
        }

        .error-message {
            color: #f44336;
            font-size: 12px;
            margin-top: 5px;
            display: none;
        }

        .error-message.show {
            display: block;
        }

        .button-group {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
        }

        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s;
        }

        .btn-prev {
            background-color: #e0e0e0;
            color: #333;
        }

        .btn-prev:hover {
            background-color: #d0d0d0;
        }

        .btn-next, .btn-submit {
            background-color: #667eea;
            color: white;
        }

        .btn-next:hover, .btn-submit:hover {
            background-color: #5568d3;
        }

        .btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }

        .summary {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 20px;
        }

        .summary-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
        }

        .summary-item:last-child {
            border-bottom: none;
        }

        .summary-label {
            font-weight: bold;
            color: #666;
        }

        .summary-value {
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>ユーザー登録フォーム</h1>

        <div class="progress-bar">
            <div class="progress-step active" id="step1Indicator">1</div>
            <div class="progress-step" id="step2Indicator">2</div>
            <div class="progress-step" id="step3Indicator">3</div>
        </div>

        <form id="multiStepForm">
            <!-- ステップ1: 基本情報 -->
            <div class="form-step active" id="step1">
                <h2>基本情報</h2>

                <div class="form-group">
                    <label for="fullName">氏名:</label>
                    <input type="text" id="fullName" name="fullName" required>
                    <div class="error-message" id="fullNameError">氏名を入力してください</div>
                </div>

                <div class="form-group">
                    <label for="email">メールアドレス:</label>
                    <input type="email" id="email" name="email" required>
                    <div class="error-message" id="emailError">正しいメールアドレスを入力してください</div>
                </div>

                <div class="form-group">
                    <label for="phone">電話番号:</label>
                    <input type="tel" id="phone" name="phone" required>
                    <div class="error-message" id="phoneError">電話番号を入力してください</div>
                </div>
            </div>

            <!-- ステップ2: 住所情報 -->
            <div class="form-step" id="step2">
                <h2>住所情報</h2>

                <div class="form-group">
                    <label for="zipCode">郵便番号:</label>
                    <input type="text" id="zipCode" name="zipCode" placeholder="123-4567" required>
                    <div class="error-message" id="zipCodeError">郵便番号を入力してください</div>
                </div>

                <div class="form-group">
                    <label for="prefecture">都道府県:</label>
                    <select id="prefecture" name="prefecture" required>
                        <option value="">選択してください</option>
                        <option value="東京都">東京都</option>
                        <option value="神奈川県">神奈川県</option>
                        <option value="大阪府">大阪府</option>
                    </select>
                    <div class="error-message" id="prefectureError">都道府県を選択してください</div>
                </div>

                <div class="form-group">
                    <label for="address">市区町村・番地:</label>
                    <input type="text" id="address" name="address" required>
                    <div class="error-message" id="addressError">住所を入力してください</div>
                </div>
            </div>

            <!-- ステップ3: 確認 -->
            <div class="form-step" id="step3">
                <h2>入力内容の確認</h2>

                <div class="summary" id="summary"></div>
            </div>

            <div class="button-group">
                <button type="button" class="btn btn-prev" id="prevBtn" style="display: none;">戻る</button>
                <button type="button" class="btn btn-next" id="nextBtn">次へ</button>
                <button type="submit" class="btn btn-submit" id="submitBtn" style="display: none;">送信</button>
            </div>
        </form>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let form = document.getElementById("multiStepForm");
let currentStep = 1;
let totalSteps = 3;

let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let submitBtn = document.getElementById("submitBtn");

// 次へボタン
nextBtn.addEventListener("click", function(event) {
  event.preventDefault(); // フォーム送信を防ぐ

  if (validateStep(currentStep)) {
    currentStep++;
    showStep(currentStep);
  }
});

// 戻るボタン
prevBtn.addEventListener("click", function(event) {
  event.preventDefault(); // フォーム送信を防ぐ

  currentStep--;
  showStep(currentStep);
});

// フォーム送信
form.addEventListener("submit", function(event) {
  event.preventDefault(); // フォーム送信を防ぐ

  console.log("フォーム送信");

  // 実際のアプリケーションでは、ここでサーバーに送信
  let formData = new FormData(form);
  let data = {};

  formData.forEach(function(value, key) {
    data[key] = value;
  });

  console.log("送信データ:", data);

  alert("登録が完了しました！");
  form.reset();
  currentStep = 1;
  showStep(currentStep);
});

// ステップ表示
function showStep(step) {
  // すべてのステップを非表示
  let steps = document.querySelectorAll(".form-step");
  steps.forEach(function(s) {
    s.classList.remove("active");
  });

  // 現在のステップを表示
  document.getElementById("step" + step).classList.add("active");

  // プログレスバー更新
  updateProgressBar(step);

  // ボタン表示制御
  if (step === 1) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
  }

  if (step === totalSteps) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "block";

    // 確認画面にサマリー表示
    showSummary();
  } else {
    nextBtn.style.display = "block";
    submitBtn.style.display = "none";
  }

  console.log("ステップ", step, "を表示");
}

// プログレスバー更新
function updateProgressBar(step) {
  for (let i = 1; i <= totalSteps; i++) {
    let indicator = document.getElementById("step" + i + "Indicator");

    if (i < step) {
      indicator.classList.add("completed");
      indicator.classList.remove("active");
    } else if (i === step) {
      indicator.classList.add("active");
      indicator.classList.remove("completed");
    } else {
      indicator.classList.remove("active", "completed");
    }
  }
}

// ステップバリデーション
function validateStep(step) {
  let isValid = true;

  if (step === 1) {
    // 基本情報のバリデーション
    isValid = validateField("fullName", "fullNameError", "氏名を入力してください") && isValid;
    isValid = validateEmail("email", "emailError") && isValid;
    isValid = validateField("phone", "phoneError", "電話番号を入力してください") && isValid;
  }

  if (step === 2) {
    // 住所情報のバリデーション
    isValid = validateField("zipCode", "zipCodeError", "郵便番号を入力してください") && isValid;
    isValid = validateField("prefecture", "prefectureError", "都道府県を選択してください") && isValid;
    isValid = validateField("address", "addressError", "住所を入力してください") && isValid;
  }

  return isValid;
}

// フィールドバリデーション
function validateField(fieldId, errorId, errorMessage) {
  let field = document.getElementById(fieldId);
  let error = document.getElementById(errorId);

  if (field.value.trim() === "") {
    error.textContent = errorMessage;
    error.classList.add("show");
    return false;
  } else {
    error.classList.remove("show");
    return true;
  }
}

// メールバリデーション
function validateEmail(fieldId, errorId) {
  let field = document.getElementById(fieldId);
  let error = document.getElementById(errorId);
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(field.value)) {
    error.textContent = "正しいメールアドレスを入力してください";
    error.classList.add("show");
    return false;
  } else {
    error.classList.remove("show");
    return true;
  }
}

// サマリー表示
function showSummary() {
  let summary = document.getElementById("summary");

  let data = {
    "氏名": document.getElementById("fullName").value,
    "メールアドレス": document.getElementById("email").value,
    "電話番号": document.getElementById("phone").value,
    "郵便番号": document.getElementById("zipCode").value,
    "都道府県": document.getElementById("prefecture").value,
    "市区町村・番地": document.getElementById("address").value
  };

  summary.innerHTML = "";

  for (let key in data) {
    let item = document.createElement("div");
    item.className = "summary-item";
    item.innerHTML = `
      <span class="summary-label">${key}:</span>
      <span class="summary-value">${data[key]}</span>
    `;
    summary.appendChild(item);
  }
}

console.log("マルチステップフォーム初期化完了");
```

### アプリケーションの機能説明

**preventDefault()の使用箇所**:
1. 次へボタン: ボタンのtype="button"だが、念のためpreventDefault()
2. 戻るボタン: 同上
3. フォーム送信: デフォルトの送信（ページリロード）を防ぐ

**マルチステップの実装**:
- 各ステップを個別のdivで管理
- 現在のステップのみを表示
- プログレスバーで進捗を可視化

**バリデーション**:
- 各ステップで入力をチェック
- エラーがあれば次に進めない
- 最終ステップで全入力内容を確認

## 練習問題

### 問題1：URLバリデーション付きフォーム

次の仕様を満たすプログラムを作成してください。

**仕様**:
1. HTMLに以下の要素を作成する
   - `id="myForm"`のform要素
   - その中に`id="urlInput"`のinput要素（type="text"、placeholder="URLを入力"）
   - その中に`type="submit"`のbutton要素（テキスト: "送信"）
   - `id="result"`のp要素

2. JavaScriptで以下の機能を実装する
   - フォーム送信時、デフォルト動作（ページリロード）をキャンセルする
   - 入力されたURLが"http://"または"https://"で始まっているかチェックする
   - 正しい形式の場合、`result`に「正しいURLです: 〇〇」と表示する（緑色）
   - 正しくない場合、`result`に「URLはhttpまたはhttpsで始まる必要があります」と表示する（赤色）

**ヒント（レベル1）**:
<details>
<summary>クリックして表示</summary>

- `event.preventDefault()`でフォーム送信をキャンセルします
- `value.startsWith("http://")`または`value.startsWith("https://")`でURLの開始文字列をチェックできます
- `||`（OR演算子）で複数の条件をチェックできます
- `result.style.color`で文字色を変更できます

</details>

**ヒント（レベル2）**:
<details>
<summary>クリックして表示</summary>

```javascript
let myForm = document.getElementById("myForm");
let urlInput = document.getElementById("urlInput");
let result = document.getElementById("result");

myForm.addEventListener("submit", function(event) {
  event.preventDefault(); // フォーム送信をキャンセル

  let url = urlInput.value;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    result.textContent = "正しいURLです: " + url;
    result.style.color = "green";
  } else {
    result.textContent = "URLはhttpまたはhttpsで始まる必要があります";
    result.style.color = "red";
  }
});
```

</details>

**ヒント（レベル3）**:
<details>
<summary>クリックして表示</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>URLバリデーション</title>
    <style>
        #result {
            margin-top: 10px;
            padding: 10px;
            border-radius: 4px;
        }
        .success {
            background-color: #d4edda;
            color: #155724;
        }
        .error {
            background-color: #f8d7da;
            color: #721c24;
        }
    </style>
</head>
<body>
    <h1>URLバリデーション</h1>

    <form id="myForm">
        <input type="text" id="urlInput" placeholder="URLを入力" style="padding: 8px; width: 300px;">
        <button type="submit">送信</button>
    </form>

    <p id="result"></p>

    <script>
        let myForm = document.getElementById("myForm");
        let urlInput = document.getElementById("urlInput");
        let result = document.getElementById("result");

        myForm.addEventListener("submit", function(event) {
          event.preventDefault();

          let url = urlInput.value.trim();

          if (url === "") {
            result.textContent = "URLを入力してください";
            result.className = "error";
            return;
          }

          if (url.startsWith("http://") || url.startsWith("https://")) {
            result.textContent = "✓ 正しいURLです: " + url;
            result.className = "success";
          } else {
            result.textContent = "✗ URLはhttpまたはhttpsで始まる必要があります";
            result.className = "error";
          }
        });
    </script>
</body>
</html>
```

</details>

### 問題2：確認ダイアログ付きリンク

次の仕様を満たすプログラムを作成してください。

**仕様**:
1. HTMLに以下の要素を作成する
   - `href="https://example.com"`、`id="dangerLink"`のa要素（テキスト: "危険なサイトへ移動"）

2. JavaScriptで以下の機能を実装する
   - リンクをクリックしたとき、デフォルト動作（即座のページ遷移）をキャンセルする
   - `confirm()`で「本当に移動しますか？」と確認ダイアログを表示する
   - ユーザーがOKをクリックした場合のみ、`window.location.href`で手動でページ遷移する
   - キャンセルをクリックした場合は何もしない

**ヒント（レベル1）**:
<details>
<summary>クリックして表示</summary>

- `event.preventDefault()`でリンクのデフォルト動作をキャンセルします
- `confirm("メッセージ")`で確認ダイアログを表示し、結果（trueまたはfalse）を取得できます
- `window.location.href = url`でページ遷移できます

</details>

**ヒント（レベル2）**:
<details>
<summary>クリックして表示</summary>

```javascript
let dangerLink = document.getElementById("dangerLink");

dangerLink.addEventListener("click", function(event) {
  event.preventDefault();

  let confirmed = confirm("本当に移動しますか？");

  if (confirmed) {
    window.location.href = this.href;
  }
});
```

</details>

**ヒント（レベル3）**:
<details>
<summary>クリックして表示</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>確認ダイアログ</title>
    <style>
        .warning-link {
            color: red;
            text-decoration: underline;
            cursor: pointer;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>確認ダイアログ付きリンク</h1>

    <a href="https://example.com" id="dangerLink" class="warning-link">
        ⚠️ 危険なサイトへ移動
    </a>

    <script>
        let dangerLink = document.getElementById("dangerLink");

        dangerLink.addEventListener("click", function(event) {
          event.preventDefault();

          let url = this.href;
          let confirmed = confirm(
            "本当にこのサイトに移動しますか？\n\n" +
            "移動先: " + url
          );

          if (confirmed) {
            console.log("ユーザーが移動を確認しました");
            window.location.href = url;
          } else {
            console.log("ユーザーが移動をキャンセルしました");
          }
        });
    </script>
</body>
</html>
```

</details>

### 問題3：数字のみ入力可能なテキストボックス

次の仕様を満たすプログラムを作成してください。

**仕様**:
1. HTMLに以下の要素を作成する
   - `id="numberOnly"`のinput要素（type="text"、placeholder="数字のみ入力可能"）

2. JavaScriptで以下の機能を実装する
   - `keydown`イベントを使用
   - 数字キー（0-9）とBackspace、Delete、矢印キー、Tabキーのみを許可
   - それ以外のキーの入力をpreventDefault()でキャンセルする

**ヒント（レベル1）**:
<details>
<summary>クリックして表示</summary>

- `keydown`イベントで`event.key`を取得できます
- 許可するキーの配列を作成し、`includes()`で判定します
- 許可されないキーの場合、`event.preventDefault()`を呼びます

</details>

**ヒント（レベル2）**:
<details>
<summary>クリックして表示</summary>

```javascript
let numberOnly = document.getElementById("numberOnly");

let allowedKeys = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"
];

numberOnly.addEventListener("keydown", function(event) {
  if (!allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
});
```

</details>

**ヒント（レベル3）**:
<details>
<summary>クリックして表示</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>数字のみ入力</title>
    <style>
        input {
            padding: 10px;
            font-size: 16px;
            border: 2px solid #ddd;
            border-radius: 4px;
            width: 300px;
        }

        input:focus {
            border-color: #4caf50;
            outline: none;
        }

        .hint {
            color: #666;
            font-size: 14px;
            margin-top: 5px;
        }

        .blocked-key {
            color: red;
            font-size: 12px;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <h1>数字のみ入力可能</h1>

    <input type="text" id="numberOnly" placeholder="数字のみ入力可能">
    <div class="hint">数字とBackspace、Delete、矢印キー、Tabのみ入力できます</div>
    <div class="blocked-key" id="blockedKey"></div>

    <script>
        let numberOnly = document.getElementById("numberOnly");
        let blockedKey = document.getElementById("blockedKey");

        let allowedKeys = [
          "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
          "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab",
          "Home", "End" // 追加で便利なキー
        ];

        numberOnly.addEventListener("keydown", function(event) {
          if (!allowedKeys.includes(event.key)) {
            event.preventDefault();

            // ブロックされたキーを表示
            blockedKey.textContent = "⚠️ 「" + event.key + "」は入力できません";

            setTimeout(function() {
              blockedKey.textContent = "";
            }, 1500);

            console.log("入力拒否:", event.key);
          } else {
            console.log("入力許可:", event.key);
          }
        });
    </script>
</body>
</html>
```

</details>

## まとめ

このレッスンでは、以下のことを学びました。

### 学習した内容

1. **デフォルト動作の理解**
   - ブラウザに組み込まれた標準的な動作（リンク、フォーム、右クリックなど）
   - さまざまな要素とイベントのデフォルト動作

2. **preventDefault()メソッド**
   - デフォルト動作をキャンセルする方法
   - `event.preventDefault()`の基本的な使い方
   - いつどこで使うべきか

3. **デフォルト動作の阻止**
   - リンククリックの阻止とカスタム動作
   - フォーム送信の阻止とバリデーション
   - 右クリックメニュー、キーボード入力などの制御

4. **リンクのキャンセル**
   - 確認ダイアログ付きリンク
   - タブ切り替えインターフェース
   - モーダルウィンドウの実装

5. **フォーム送信の制御**
   - バリデーション付きフォーム
   - Ajax送信（fetch API）
   - マルチステップフォーム

6. **よくある間違い**
   - preventDefault()を呼ぶ位置が遅い
   - return falseを使う
   - すべてのイベントでpreventDefault()を呼ぶ
   - dragoverイベントでpreventDefault()を忘れる
   - キャンセル不可能なイベントでpreventDefault()を呼ぐ
   - フォーム送信で手動submit()を呼ぶ

7. **実践的なアプリケーション**
   - カスタム右クリックメニュー
   - ドラッグ&ドロップファイルアップローダー
   - マルチステップフォーム

### 重要なポイント

- **常に最初にpreventDefault()を呼ぶ**: イベントリスナー関数の最初の行で呼ぶのがベストプラクティス
- **必要な場所でのみ使う**: すべてのイベントで呼ぶのではなく、必要な場所でのみ使用
- **event.cancelableで確認**: キャンセル可能なイベントかどうかを確認できる
- **ユーザビリティに配慮**: デフォルト動作をキャンセルする場合は、代替の動作を提供
- **ドラッグ&ドロップではdragoverとdropの両方で呼ぶ**: 両方必須

`preventDefault()`を正しく使うことで、ブラウザのデフォルト動作を制御し、より高度でインタラクティブなWebアプリケーションを作成できるようになりました。
