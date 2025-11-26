---
title: "Lesson 069: イベント伝播入門"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン69：イベント伝播入門

## このレッスンで学ぶこと

このレッスンでは、イベントの伝播（でんぱ）について学びます。イベント伝播とは、イベントが発生したときに、その要素だけでなく親要素にもイベントが伝わる仕組みです。この仕組みを理解することで、より効率的なイベント処理ができるようになります。

## 現場で使われているイベント伝播の例

### 例1：Twitter/X - ツイートカード全体のクリック処理

Twitter/Xでは、ツイートカード全体をクリックしたときに詳細ページに移動しますが、いいねボタンやリツイートボタンをクリックしたときは詳細ページには移動せず、それぞれのアクションが実行されます。これはイベント伝播の制御によって実現されています。

```javascript
// Twitter/Xのようなツイートカードの実装
let tweetCard = document.getElementById("tweetCard");
let likeButton = document.getElementById("likeButton");
let retweetButton = document.getElementById("retweetButton");
let replyButton = document.getElementById("replyButton");

// カード全体のクリック - ツイート詳細ページに移動
tweetCard.addEventListener("click", function(event) {
  console.log("ツイート詳細ページへ移動");
  // location.href = "/tweet/12345";
});

// いいねボタンのクリック - バブリングを止める
likeButton.addEventListener("click", function(event) {
  event.stopPropagation(); // カードへのイベント伝播を止める

  // いいねの処理
  let currentLikes = parseInt(this.textContent);
  this.textContent = (currentLikes + 1) + " いいね";
  this.style.color = "red";

  console.log("いいねしました（詳細ページには移動しない）");
});

// リツイートボタンのクリック - バブリングを止める
retweetButton.addEventListener("click", function(event) {
  event.stopPropagation();

  console.log("リツイートメニューを表示（詳細ページには移動しない）");
  // リツイートメニューを表示
});

// 返信ボタンのクリック - バブリングを止める
replyButton.addEventListener("click", function(event) {
  event.stopPropagation();

  console.log("返信入力欄を表示（詳細ページには移動しない）");
  // 返信入力欄を表示
});
```

**なぜstopPropagation()が重要か**:
- ボタンをクリックしたとき、イベントは「ボタン → カード」の順に伝播する
- `stopPropagation()`を呼ばないと、ボタンをクリックしたときにカードのクリックイベントも発生してしまう
- ボタンのイベントリスナーで伝播を止めることで、ボタン独自の動作だけを実行できる

**HTML構造の例**:
```html
<div id="tweetCard" class="tweet-card">
  <div class="tweet-content">
    これはツイートの本文です。カード全体をクリックすると詳細ページに移動します。
  </div>
  <div class="tweet-actions">
    <button id="replyButton">💬 返信</button>
    <button id="retweetButton">🔁 リツイート</button>
    <button id="likeButton">❤️ 42 いいね</button>
  </div>
</div>
```

### 例2：Google - ドロップダウンメニューの外側クリック検出

Googleの検索候補やドロップダウンメニューは、メニューの外側をクリックすると閉じます。これはdocument全体にイベントリスナーを設定し、イベントバブリングを利用して実装されています。

```javascript
// Googleのようなドロップダウンメニュー
let searchInput = document.getElementById("searchInput");
let suggestionBox = document.getElementById("suggestionBox");

// 検索ボックスにフォーカスしたら候補を表示
searchInput.addEventListener("focus", function() {
  suggestionBox.style.display = "block";
  console.log("検索候補を表示");
});

// 候補ボックス内のクリックは伝播を止める
suggestionBox.addEventListener("click", function(event) {
  event.stopPropagation(); // documentへのバブリングを止める

  // クリックされた候補を検索ボックスに反映
  if (event.target.classList.contains("suggestion-item")) {
    searchInput.value = event.target.textContent;
    suggestionBox.style.display = "none";
    console.log("候補を選択:", event.target.textContent);
  }
});

// document全体のクリックで候補ボックスを閉じる
document.addEventListener("click", function(event) {
  // suggestionBoxの外側がクリックされた場合のみ実行される
  // （suggestionBox内のクリックはstopPropagation()で止められている）
  suggestionBox.style.display = "none";
  console.log("検索候補を閉じる");
});
```

**イベントバブリングの流れ**:
1. 候補アイテムをクリック → suggestion-item → suggestionBox（ここでstopPropagation）
2. 候補ボックスの外をクリック → クリックされた要素 → ... → document（候補を閉じる）

**実装のポイント**:
- documentレベルでクリックを監視することで、メニューの外側クリックを検出
- メニュー内のクリックは`stopPropagation()`で止めることで、documentのリスナーが実行されない
- この手法により、メニューを閉じる処理を1箇所に集約できる

### 例3：Facebook - モーダルダイアログの背景クリック

Facebookの写真ビューアや共有ダイアログなど、モーダルウィンドウの背景（オーバーレイ）をクリックするとモーダルが閉じますが、モーダルの内容部分をクリックしても閉じません。

```javascript
// Facebookのようなモーダルダイアログ
let modal = document.getElementById("modal");
let modalOverlay = document.getElementById("modalOverlay");
let modalContent = document.getElementById("modalContent");
let openModalButton = document.getElementById("openModal");
let closeButton = document.getElementById("closeButton");

// モーダルを開く
openModalButton.addEventListener("click", function() {
  modal.style.display = "block";
  console.log("モーダルを表示");
});

// オーバーレイ（背景）をクリックしたらモーダルを閉じる
modalOverlay.addEventListener("click", function(event) {
  // event.targetで実際にクリックされた要素を確認
  if (event.target === modalOverlay) {
    // オーバーレイ自体がクリックされた場合のみ閉じる
    modal.style.display = "none";
    console.log("オーバーレイがクリックされた - モーダルを閉じる");
  }
});

// モーダルコンテンツのクリックは伝播を止める
modalContent.addEventListener("click", function(event) {
  event.stopPropagation(); // overlayへのバブリングを止める
  console.log("モーダルコンテンツがクリックされた - 閉じない");
});

// 閉じるボタン
closeButton.addEventListener("click", function() {
  modal.style.display = "none";
  console.log("閉じるボタンで閉じる");
});
```

**HTML構造**:
```html
<div id="modal" class="modal" style="display: none;">
  <div id="modalOverlay" class="modal-overlay">
    <div id="modalContent" class="modal-content">
      <h2>モーダルタイトル</h2>
      <p>モーダルの内容がここに入ります。</p>
      <button id="closeButton">閉じる</button>
    </div>
  </div>
</div>
```

**2つのアプローチ**:
1. **event.targetチェック**: オーバーレイ自体がクリックされたかチェック
2. **stopPropagation()**: コンテンツ内のクリックがオーバーレイに伝わらないようにする

両方を組み合わせることで、より確実な実装になります。

### 例4：Amazon - 商品カードのクイックビュー

Amazonの商品一覧ページでは、商品カード全体をクリックすると商品詳細ページに移動しますが、カート追加ボタンやお気に入りボタンをクリックしたときは、ページ遷移せずにその場でアクションが実行されます。

```javascript
// Amazonのような商品カードの実装
let productCards = document.querySelectorAll(".product-card");

// 各商品カードにイベント委譲を設定
productCards.forEach(function(card) {

  // カード全体のクリック
  card.addEventListener("click", function(event) {
    let productId = this.dataset.productId;
    console.log("商品詳細ページへ移動:", productId);
    // location.href = "/product/" + productId;
  });

  // カート追加ボタン
  let addToCartButton = card.querySelector(".add-to-cart");
  addToCartButton.addEventListener("click", function(event) {
    event.stopPropagation(); // カードへの伝播を止める

    let productName = card.querySelector(".product-name").textContent;
    console.log("カートに追加:", productName);

    // カート追加アニメーション
    this.textContent = "✓ カートに追加しました";
    this.style.backgroundColor = "#4CAF50";

    setTimeout(() => {
      this.textContent = "カートに追加";
      this.style.backgroundColor = "";
    }, 2000);
  });

  // お気に入りボタン
  let favoriteButton = card.querySelector(".favorite-button");
  favoriteButton.addEventListener("click", function(event) {
    event.stopPropagation();

    // お気に入りの切り替え
    this.classList.toggle("favorited");
    if (this.classList.contains("favorited")) {
      this.textContent = "❤️ お気に入り済み";
      this.style.color = "red";
      console.log("お気に入りに追加");
    } else {
      this.textContent = "♡ お気に入り";
      this.style.color = "";
      console.log("お気に入りから削除");
    }
  });

  // 比較リストボタン
  let compareButton = card.querySelector(".compare-button");
  compareButton.addEventListener("click", function(event) {
    event.stopPropagation();

    console.log("比較リストに追加");
    this.disabled = true;
    this.textContent = "比較リストに追加済み";
  });
});
```

**複数のボタンでstopPropagation()を使用**:
- それぞれのボタンが独立したアクションを持つ
- すべてのボタンで`event.stopPropagation()`を呼び出す
- カード全体のクリックイベントは、ボタン以外の部分をクリックしたときだけ発生

### 例5：YouTube - 動画プレーヤーコントロール

YouTubeの動画プレーヤーでは、プレーヤー全体をクリックすると再生/一時停止が切り替わりますが、コントロールバー（音量、設定、全画面など）のボタンをクリックしたときは再生状態が変わりません。

```javascript
// YouTubeのような動画プレーヤーコントロール
let videoPlayer = document.getElementById("videoPlayer");
let video = document.getElementById("video");
let controlBar = document.getElementById("controlBar");
let playPauseButton = document.getElementById("playPauseButton");
let volumeButton = document.getElementById("volumeButton");
let fullscreenButton = document.getElementById("fullscreenButton");
let settingsButton = document.getElementById("settingsButton");

let isPlaying = false;

// プレーヤー全体のクリック - 再生/一時停止の切り替え
videoPlayer.addEventListener("click", function(event) {
  // event.targetで実際にクリックされた要素を確認
  // video要素自体がクリックされた場合のみ再生を切り替え
  if (event.target === video || event.target === videoPlayer) {
    if (isPlaying) {
      console.log("一時停止");
      isPlaying = false;
      playPauseButton.textContent = "▶️";
    } else {
      console.log("再生");
      isPlaying = true;
      playPauseButton.textContent = "⏸️";
    }
  }
});

// コントロールバー全体の伝播を止める
controlBar.addEventListener("click", function(event) {
  event.stopPropagation(); // videoPlayerへの伝播を止める
  console.log("コントロールバーがクリックされた");
});

// 再生/一時停止ボタン
playPauseButton.addEventListener("click", function(event) {
  // controlBarですでにstopPropagation()されているが、念のため
  if (isPlaying) {
    console.log("ボタンから一時停止");
    isPlaying = false;
    this.textContent = "▶️";
  } else {
    console.log("ボタンから再生");
    isPlaying = true;
    this.textContent = "⏸️";
  }
});

// 音量ボタン
volumeButton.addEventListener("click", function(event) {
  console.log("音量メニューを表示");
  // 音量スライダーの表示/非表示
});

// 全画面ボタン
fullscreenButton.addEventListener("click", function(event) {
  console.log("全画面モードに切り替え");
  // if (videoPlayer.requestFullscreen) {
  //   videoPlayer.requestFullscreen();
  // }
});

// 設定ボタン
settingsButton.addEventListener("click", function(event) {
  console.log("設定メニューを表示");
  // 設定メニューの表示/非表示
});
```

**階層的なstopPropagation()**:
- コントロールバー全体で`stopPropagation()`を呼ぶことで、バー内のどのボタンをクリックしても再生状態が変わらない
- 個別のボタンでさらに細かい制御も可能

**event.targetの活用**:
- プレーヤー全体のクリックイベントで、`event.target`が動画またはプレーヤー自体であるかチェック
- コントロールバーや他のUI要素をクリックしたときは何もしない

## イベント伝播とは

HTML要素は親子関係を持っています。例えば、ボタンがdiv要素の中にある場合、ボタンはdivの子要素です。

```html
<div id="parent">
    <button id="child">ボタン</button>
</div>
```

この構造で、ボタンをクリックすると、実はボタンだけでなく、親のdiv要素もクリックされたことになります。これをイベント伝播と呼びます。

### イベントバブリング

イベントバブリングは、イベントが子要素から親要素へと伝わっていく仕組みです。水の中の泡が下から上に浮かんでいくようなイメージです。

```
ボタン（子） → div（親） → body → html → document
```

イベントは、発生した要素から始まって、親要素、さらにその親要素へと順番に伝わっていきます。

### イベントの伝播の流れ

```
クリック！
   ↓
1. button要素のクリックイベント発生
   ↓
2. div要素にバブリング
   ↓
3. div要素のクリックイベント発生
   ↓
4. body要素にバブリング
   ↓
5. body要素のクリックイベント発生
   ↓
（以降、html、documentまで続く）
```

## バブリングの基礎

実際にバブリングを確認してみましょう。

### 基本的な例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>イベントバブリング</title>
    <style>
        #parent {
            width: 300px;
            height: 200px;
            background-color: lightblue;
            padding: 20px;
        }
        #child {
            width: 150px;
            height: 100px;
            background-color: lightcoral;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>イベントバブリングの確認</h1>
    <div id="parent">
        親要素（青い部分）
        <div id="child">子要素（赤い部分）</div>
    </div>
    <p id="log"></p>

    <script>
        let parent = document.getElementById("parent");
        let child = document.getElementById("child");
        let log = document.getElementById("log");

        child.addEventListener("click", function() {
          log.textContent = "子要素がクリックされました → ";
          console.log("1. 子要素のイベント発生");
        });

        parent.addEventListener("click", function() {
          log.textContent = log.textContent + "親要素がクリックされました";
          console.log("2. 親要素のイベント発生（バブリング）");
        });
    </script>
</body>
</html>
```

**実行結果**:
- 子要素（赤い部分）をクリック: 「子要素がクリックされました → 親要素がクリックされました」
- 親要素（青い部分）をクリック: 「親要素がクリックされました」

### なぜ両方のイベントが発生するのか

子要素をクリックしたとき、以下の順番でイベントが発生します。

1. **子要素のクリックイベントが発生**
   - 子要素に設定されたイベントリスナーが実行される

2. **イベントが親要素に伝播（バブリング）**
   - クリックイベントは子要素で終わらず、親要素に伝わる

3. **親要素のクリックイベントが発生**
   - 親要素に設定されたイベントリスナーが実行される

つまり、子要素をクリックすると、自動的に親要素のクリックイベントも発生するのです。

### バブリングの視覚化

```
クリック位置: 子要素（赤い部分）

イベントの流れ:
┌─────────────────┐
│  親要素 (青)    │  ← 3. 親のリスナー実行
│  ┌───────────┐  │
│  │ 子要素 (赤)│  │  ← 1. 子のリスナー実行
│  │           │  │     2. 親にバブリング ↑
│  └───────────┘  │
└─────────────────┘
```

## 親要素への伝播

イベントは、何段階も上の親要素まで伝播します。

### 3階層の伝播

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>3階層の伝播</title>
    <style>
        #grandparent {
            width: 400px;
            height: 300px;
            background-color: lightyellow;
            padding: 20px;
            border: 3px solid gold;
        }
        #parent {
            width: 300px;
            height: 200px;
            background-color: lightblue;
            padding: 20px;
            border: 3px solid blue;
        }
        #child {
            width: 150px;
            height: 100px;
            background-color: lightcoral;
            cursor: pointer;
            border: 3px solid red;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
</head>
<body>
    <h1>3階層の伝播確認</h1>
    <div id="grandparent">
        祖父母要素（黄色）
        <div id="parent">
            親要素（青）
            <div id="child">子要素（赤）<br>クリック！</div>
        </div>
    </div>
    <div id="log" style="margin-top: 20px; padding: 10px; background: #f0f0f0;"></div>

    <script>
        let grandparent = document.getElementById("grandparent");
        let parent = document.getElementById("parent");
        let child = document.getElementById("child");
        let log = document.getElementById("log");

        child.addEventListener("click", function(event) {
          log.innerHTML = "<strong>イベントの順序:</strong><br>";
          log.innerHTML += "1. 子要素 (target: " + event.target.id + ")<br>";
          console.log("1. 子要素のイベント");
        });

        parent.addEventListener("click", function(event) {
          log.innerHTML += "2. 親要素 (target: " + event.target.id + ")<br>";
          console.log("2. 親要素のイベント");
        });

        grandparent.addEventListener("click", function(event) {
          log.innerHTML += "3. 祖父母要素 (target: " + event.target.id + ")";
          console.log("3. 祖父母要素のイベント");
        });
    </script>
</body>
</html>
```

**実行結果**:
子要素をクリックすると、「子 → 親 → 祖父母」の順番でイベントが発生します。

### 伝播の順序

```
クリック: 子要素

1. 子要素のイベントリスナー実行
   ↓ バブリング
2. 親要素のイベントリスナー実行
   ↓ バブリング
3. 祖父母要素のイベントリスナー実行
   ↓ バブリング
4. body要素のイベントリスナー実行（設定されていれば）
   ↓ バブリング
5. document要素のイベントリスナー実行（設定されていれば）
```

## event.targetとevent.currentTarget

イベントバブリングを理解するために、`event.target`と`event.currentTarget`の違いを知る必要があります。

### 2つのプロパティの違い

**event.target**:
- 実際にクリックされた要素（イベントが最初に発生した要素）
- バブリング中も常に同じ要素を指す

**event.currentTarget**:
- イベントリスナーが設定されている要素（現在イベントを処理している要素）
- バブリングの各段階で異なる要素を指す

### 実例で理解する

```html
<div id="parent" style="width: 300px; height: 200px; background: lightblue; padding: 20px;">
    親要素
    <button id="child">子要素（ボタン）</button>
</div>
```

```javascript
let parent = document.getElementById("parent");
let child = document.getElementById("child");

parent.addEventListener("click", function(event) {
  console.log("=== 親要素のリスナー実行 ===");
  console.log("target:", event.target.id); // 実際にクリックされた要素
  console.log("currentTarget:", event.currentTarget.id); // リスナーが設定されている要素
  console.log("this:", this.id); // currentTargetと同じ
});

child.addEventListener("click", function(event) {
  console.log("=== 子要素のリスナー実行 ===");
  console.log("target:", event.target.id);
  console.log("currentTarget:", event.currentTarget.id);
  console.log("this:", this.id);
});
```

**子要素（ボタン）をクリックしたときの出力**:
```
=== 子要素のリスナー実行 ===
target: child           （実際にクリックされた要素）
currentTarget: child    （このリスナーが設定されている要素）
this: child

=== 親要素のリスナー実行 ===
target: child           （実際にクリックされた要素 - 変わらない）
currentTarget: parent   （このリスナーが設定されている要素）
this: parent
```

### 使い分けのポイント

```javascript
parent.addEventListener("click", function(event) {
  // 実際にクリックされた要素を知りたい場合
  if (event.target.tagName === "BUTTON") {
    console.log("ボタンがクリックされました:", event.target.textContent);
  }

  // リスナーが設定されている要素（親要素自体）にアクセスしたい場合
  console.log("親要素のID:", event.currentTarget.id);
  // またはthisを使う
  console.log("親要素のID:", this.id);
});
```

**重要な違い**:
- `event.target`: イベント委譲で子要素を判定するときに使う
- `event.currentTarget`（または`this`）: リスナーが設定されている要素にアクセスするときに使う

## 実例確認

バブリングの動作を視覚的に確認できるツールを作ってみましょう。

### 伝播確認ツール

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>伝播確認ツール</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }

        .container {
            width: 500px;
            height: 400px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px;
            border: 3px solid #5a67d8;
            border-radius: 10px;
            margin-bottom: 20px;
        }

        .box {
            width: 350px;
            height: 250px;
            background-color: #4fd1c5;
            padding: 30px;
            border: 3px solid #38b2ac;
            border-radius: 8px;
        }

        .button-area {
            width: 200px;
            height: 100px;
            background-color: #f56565;
            padding: 20px;
            border: 3px solid #e53e3e;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: white;
            font-weight: bold;
            font-size: 16px;
        }

        #log {
            background-color: #f7fafc;
            border: 2px solid #cbd5e0;
            border-radius: 8px;
            padding: 15px;
            min-height: 200px;
            max-height: 400px;
            overflow-y: auto;
        }

        .log-entry {
            margin: 8px 0;
            padding: 8px 12px;
            border-left: 4px solid #4299e1;
            background-color: white;
            border-radius: 4px;
            font-family: monospace;
            font-size: 14px;
        }

        .log-entry.level-1 { border-left-color: #f56565; }
        .log-entry.level-2 { border-left-color: #4fd1c5; }
        .log-entry.level-3 { border-left-color: #667eea; }

        .control-buttons {
            margin: 20px 0;
        }

        .control-buttons button {
            padding: 10px 20px;
            margin-right: 10px;
            background-color: #4299e1;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        }

        .control-buttons button:hover {
            background-color: #3182ce;
        }

        .info-box {
            background-color: #fef5e7;
            border: 2px solid #f39c12;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <h1>イベント伝播確認ツール</h1>

    <div class="info-box">
        <strong>使い方:</strong> 各エリアをクリックして、イベントがどのように伝播するか確認してください。
        <br>赤い部分 → 水色の部分 → 紫の部分 の順にイベントが伝播します。
    </div>

    <div class="container" id="container">
        <strong style="color: white;">Container (紫)</strong>
        <div class="box" id="box">
            <strong>Box (水色)</strong>
            <div class="button-area" id="buttonArea">
                Button Area (赤)<br>クリック！
            </div>
        </div>
    </div>

    <div class="control-buttons">
        <button id="clearButton">ログをクリア</button>
        <button id="toggleStopButton">バブリング停止: OFF</button>
    </div>

    <div id="log">
        <strong style="font-size: 16px;">📋 イベントログ</strong>
    </div>

    <script>
        let container = document.getElementById("container");
        let box = document.getElementById("box");
        let buttonArea = document.getElementById("buttonArea");
        let log = document.getElementById("log");
        let clearButton = document.getElementById("clearButton");
        let toggleStopButton = document.getElementById("toggleStopButton");
        let eventCount = 0;
        let stopBubbling = false;

        function addLog(elementName, level, targetId, currentTargetId) {
          eventCount = eventCount + 1;
          let entry = document.createElement("div");
          entry.className = "log-entry level-" + level;

          let time = new Date().toLocaleTimeString();
          entry.innerHTML = "<strong>" + eventCount + ".</strong> [" + time + "] " +
                           "<strong style='color: #2d3748;'>" + elementName + "</strong> がクリックされました<br>" +
                           "└─ target: <code>" + targetId + "</code>, " +
                           "currentTarget: <code>" + currentTargetId + "</code>";

          log.appendChild(entry);
          log.scrollTop = log.scrollHeight;
        }

        // Button Area（最も内側）
        buttonArea.addEventListener("click", function(event) {
          addLog("Button Area", 1, event.target.id, event.currentTarget.id);
          console.log("1. Button Area clicked");

          if (stopBubbling) {
            event.stopPropagation();
            let stopEntry = document.createElement("div");
            stopEntry.className = "log-entry";
            stopEntry.style.borderLeftColor = "#e53e3e";
            stopEntry.style.backgroundColor = "#fff5f5";
            stopEntry.innerHTML = "⛔ <strong>バブリング停止！</strong> これより上の要素にはイベントが伝わりません";
            log.appendChild(stopEntry);
          }
        });

        // Box（中間）
        box.addEventListener("click", function(event) {
          addLog("Box", 2, event.target.id, event.currentTarget.id);
          console.log("2. Box clicked (bubbled)");
        });

        // Container（最も外側）
        container.addEventListener("click", function(event) {
          addLog("Container", 3, event.target.id, event.currentTarget.id);
          console.log("3. Container clicked (bubbled)");
        });

        // ログクリア
        clearButton.addEventListener("click", function() {
          log.innerHTML = "<strong style='font-size: 16px;'>📋 イベントログ</strong>";
          eventCount = 0;
        });

        // バブリング停止の切り替え
        toggleStopButton.addEventListener("click", function() {
          stopBubbling = !stopBubbling;
          if (stopBubbling) {
            this.textContent = "バブリング停止: ON";
            this.style.backgroundColor = "#e53e3e";
          } else {
            this.textContent = "バブリング停止: OFF";
            this.style.backgroundColor = "#4299e1";
          }
        });
    </script>
</body>
</html>
```

### 確認できること

このツールで以下のことが確認できます：

1. **Button Areaをクリック**:
   - Button Area → Box → Container の順にイベントが発生
   - `target`は常に"buttonArea"
   - `currentTarget`は各段階で変わる

2. **Boxをクリック**:
   - Box → Container の順にイベントが発生
   - Button Areaは含まれない

3. **Containerをクリック**:
   - Container のみイベントが発生

4. **バブリング停止をON**:
   - Button Areaでバブリングが止まる
   - BoxとContainerのイベントは発生しない

## イベントバブリングを止める - stopPropagation()

`event.stopPropagation()`を使うと、イベントの伝播を止めることができます。

### 基本的な使い方

```javascript
child.addEventListener("click", function(event) {
  event.stopPropagation(); // ここでバブリングを止める
  console.log("子要素がクリックされました");
});

parent.addEventListener("click", function() {
  console.log("親要素がクリックされました"); // これは実行されない
});
```

**動作**:
- 子要素をクリックしたとき、子要素のイベントリスナーは実行される
- `stopPropagation()`により、親要素へのバブリングが止まる
- 親要素のイベントリスナーは実行されない

### stopPropagation()の実例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>stopPropagation</title>
    <style>
        #parent {
            width: 400px;
            padding: 30px;
            background-color: #e3f2fd;
            border: 3px solid #2196f3;
            border-radius: 8px;
        }

        .button-group {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }

        button {
            padding: 12px 24px;
            font-size: 14px;
            border: 2px solid #fff;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
        }

        .normal-button {
            background-color: #4caf50;
            color: white;
        }

        .stop-button {
            background-color: #f44336;
            color: white;
        }

        #message {
            margin-top: 20px;
            padding: 15px;
            background-color: #fff;
            border-radius: 5px;
            min-height: 60px;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <h1>stopPropagationの動作確認</h1>

    <div id="parent">
        <p><strong>親要素</strong>（青い背景）- クリックするとメッセージが表示されます</p>

        <div class="button-group">
            <button id="normalButton" class="normal-button">
                通常のボタン<br>
                <small>(バブリングする)</small>
            </button>

            <button id="stopButton" class="stop-button">
                stopPropagation<br>
                <small>(バブリングしない)</small>
            </button>
        </div>
    </div>

    <div id="message"></div>

    <script>
        let parent = document.getElementById("parent");
        let normalButton = document.getElementById("normalButton");
        let stopButton = document.getElementById("stopButton");
        let message = document.getElementById("message");

        // 親要素のクリックイベント
        parent.addEventListener("click", function(event) {
          message.innerHTML += "🔵 <strong>親要素</strong>がクリックされました<br>";
          message.innerHTML += "└─ target: " + event.target.id + "<br>";
          console.log("親要素のイベント発生");
        });

        // 通常のボタン（バブリングする）
        normalButton.addEventListener("click", function(event) {
          message.innerHTML = ""; // クリア
          message.innerHTML += "🟢 <strong>通常のボタン</strong>がクリックされました<br>";
          console.log("通常のボタン - バブリングします");
          // stopPropagation()を呼ばないので、親要素のイベントも発生する
        });

        // stopPropagationボタン（バブリングしない）
        stopButton.addEventListener("click", function(event) {
          message.innerHTML = ""; // クリア
          message.innerHTML += "🔴 <strong>stopPropagationボタン</strong>がクリックされました<br>";
          message.innerHTML += "⛔ バブリング停止 - 親要素のイベントは発生しません<br>";

          event.stopPropagation(); // バブリングを止める
          console.log("stopPropagationボタン - バブリング停止");
        });
    </script>
</body>
</html>
```

### stopPropagation()の効果

**通常のボタンをクリック**:
```
1. 通常のボタンのイベント発生
2. 親要素にバブリング ↑
3. 親要素のイベント発生
```

**stopPropagationボタンをクリック**:
```
1. stopPropagationボタンのイベント発生
2. event.stopPropagation()が呼ばれる
3. バブリング停止 ⛔
（親要素のイベントは発生しない）
```

## イベント委譲（Event Delegation）

イベントバブリングを活用した便利なパターンが、イベント委譲です。これは親要素にイベントリスナーを1つだけ設定し、`event.target`で実際にクリックされた要素を判別する方法です。

### 従来の方法（非効率）

```javascript
// すべてのボタンに個別にイベントリスナーを設定
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");

button1.addEventListener("click", function() {
  console.log("ボタン1がクリックされました");
});

button2.addEventListener("click", function() {
  console.log("ボタン2がクリックされました");
});

button3.addEventListener("click", function() {
  console.log("ボタン3がクリックされました");
});
```

**問題点**:
- ボタンごとにリスナーを設定する必要がある
- ボタンが増えるとコードも増える
- 後から追加されたボタンには対応できない
- メモリ効率が悪い

### イベント委譲を使った方法（効率的）

```html
<div id="buttonContainer">
    <button class="action-button" data-action="save">保存</button>
    <button class="action-button" data-action="delete">削除</button>
    <button class="action-button" data-action="cancel">キャンセル</button>
</div>
```

```javascript
let buttonContainer = document.getElementById("buttonContainer");

// 親要素に1つだけイベントリスナーを設定
buttonContainer.addEventListener("click", function(event) {
  // event.targetで実際にクリックされた要素を確認
  if (event.target.classList.contains("action-button")) {
    let action = event.target.dataset.action;

    if (action === "save") {
      console.log("保存処理を実行");
    } else if (action === "delete") {
      console.log("削除処理を実行");
    } else if (action === "cancel") {
      console.log("キャンセル処理を実行");
    }
  }
});
```

### イベント委譲のメリット

**1. コードが簡潔**:
- 親要素に1つのリスナーだけで、複数の子要素を処理できる

**2. メモリ効率が良い**:
- イベントリスナーが1つだけなので、メモリ使用量が少ない

**3. 動的要素に対応**:
- 後から追加される要素にも自動的に対応できる

```javascript
// 新しいボタンを追加
let newButton = document.createElement("button");
newButton.className = "action-button";
newButton.dataset.action = "export";
newButton.textContent = "エクスポート";
buttonContainer.appendChild(newButton);

// 既存のイベントリスナーが自動的に機能する！
```

### イベント委譲の実践例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>イベント委譲</title>
    <style>
        .todo-list {
            max-width: 500px;
            margin: 20px auto;
        }

        .todo-item {
            display: flex;
            align-items: center;
            padding: 12px;
            margin: 8px 0;
            background-color: #f8f9fa;
            border-radius: 5px;
            border: 2px solid #e9ecef;
        }

        .todo-text {
            flex: 1;
            margin: 0 15px;
        }

        .todo-item.completed .todo-text {
            text-decoration: line-through;
            color: #6c757d;
        }

        .checkbox {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }

        .delete-btn {
            background-color: #dc3545;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
        }

        .delete-btn:hover {
            background-color: #c82333;
        }

        .add-form {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        .add-form input {
            flex: 1;
            padding: 10px;
            border: 2px solid #ced4da;
            border-radius: 4px;
        }

        .add-form button {
            padding: 10px 20px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="todo-list">
        <h1>Todoリスト（イベント委譲）</h1>

        <div class="add-form">
            <input type="text" id="newTodoInput" placeholder="新しいタスクを入力">
            <button id="addButton">追加</button>
        </div>

        <div id="todoContainer">
            <!-- ここにTodoアイテムが追加される -->
        </div>
    </div>

    <script>
        let todoContainer = document.getElementById("todoContainer");
        let newTodoInput = document.getElementById("newTodoInput");
        let addButton = document.getElementById("addButton");
        let todoId = 0;

        // イベント委譲：親要素に1つだけリスナーを設定
        todoContainer.addEventListener("click", function(event) {
          let target = event.target;

          // チェックボックスがクリックされた
          if (target.classList.contains("checkbox")) {
            let todoItem = target.closest(".todo-item");
            todoItem.classList.toggle("completed");
            console.log("完了状態を切り替え");
          }

          // 削除ボタンがクリックされた
          if (target.classList.contains("delete-btn")) {
            let todoItem = target.closest(".todo-item");
            todoContainer.removeChild(todoItem);
            console.log("タスクを削除");
          }
        });

        // Todo追加
        addButton.addEventListener("click", function() {
          let text = newTodoInput.value.trim();
          if (text === "") return;

          todoId++;
          let todoItem = document.createElement("div");
          todoItem.className = "todo-item";
          todoItem.dataset.id = todoId;
          todoItem.innerHTML = `
            <input type="checkbox" class="checkbox">
            <div class="todo-text">${text}</div>
            <button class="delete-btn">削除</button>
          `;

          todoContainer.appendChild(todoItem);
          newTodoInput.value = "";
          console.log("タスクを追加:", text);
        });

        // Enterキーでも追加
        newTodoInput.addEventListener("keypress", function(event) {
          if (event.key === "Enter") {
            addButton.click();
          }
        });
    </script>
</body>
</html>
```

**このコードのポイント**:
- `todoContainer`に1つのリスナーだけで、すべてのチェックボックスと削除ボタンを処理
- 新しく追加されたTodoアイテムにも自動的に対応
- `event.target`で実際にクリックされた要素を判定
- `closest()`メソッドで親要素のTodoアイテムを取得

## イベントフロー

イベントは実際には3つのフェーズを経て伝播します。

### 3つのフェーズ

```
document
   ↓ 1. キャプチャフェーズ（下向き）
  html
   ↓
  body
   ↓
親要素
   ↓
   ⬇️ 2. ターゲットフェーズ
子要素（クリックされた要素）
   ⬆️
   ↑ 3. バブリングフェーズ（上向き）
親要素
   ↑
  body
   ↑
  html
   ↑
document
```

**1. キャプチャフェーズ（Capture Phase）**:
- イベントが上から下へ伝わる（document → html → body → 親 → 子）
- ほとんど使われない

**2. ターゲットフェーズ（Target Phase）**:
- イベントがターゲット要素（実際にクリックされた要素）に到達する

**3. バブリングフェーズ（Bubbling Phase）**:
- イベントが下から上へ伝わる（子 → 親 → body → html → document）
- 通常使われるフェーズ

### デフォルトの動作

通常、イベントリスナーはバブリングフェーズで実行されます。

```javascript
element.addEventListener("click", function() {
  // バブリングフェーズで実行される（デフォルト）
});

// 第3引数がfalseまたは省略された場合はバブリングフェーズ
element.addEventListener("click", function() {
  // バブリングフェーズ
}, false);
```

### キャプチャフェーズでのリスナー

第3引数に`true`を指定すると、キャプチャフェーズでイベントリスナーが実行されます。

```javascript
element.addEventListener("click", function() {
  console.log("キャプチャフェーズで実行");
}, true);
```

### キャプチャとバブリングの比較

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>キャプチャとバブリング</title>
    <style>
        #outer {
            width: 300px;
            padding: 30px;
            background-color: #e3f2fd;
            border: 3px solid #2196f3;
        }
        #inner {
            width: 150px;
            padding: 20px;
            background-color: #ffccbc;
            border: 3px solid #ff5722;
            cursor: pointer;
        }
        #log {
            margin-top: 20px;
            padding: 15px;
            background-color: #f5f5f5;
            font-family: monospace;
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <h1>キャプチャフェーズとバブリングフェーズ</h1>

    <div id="outer">
        外側の要素（青）
        <div id="inner">
            内側の要素（赤）<br>クリック！
        </div>
    </div>

    <button id="clearButton">ログをクリア</button>
    <div id="log"></div>

    <script>
        let outer = document.getElementById("outer");
        let inner = document.getElementById("inner");
        let log = document.getElementById("log");
        let clearButton = document.getElementById("clearButton");
        let count = 0;

        function addLog(message) {
          count++;
          log.textContent += count + ". " + message + "\n";
        }

        // キャプチャフェーズ（第3引数をtrue）
        outer.addEventListener("click", function() {
          addLog("外側の要素 - キャプチャフェーズ");
        }, true);

        inner.addEventListener("click", function() {
          addLog("内側の要素 - キャプチャフェーズ");
        }, true);

        // バブリングフェーズ（第3引数をfalseまたは省略）
        inner.addEventListener("click", function() {
          addLog("内側の要素 - バブリングフェーズ");
        }, false);

        outer.addEventListener("click", function() {
          addLog("外側の要素 - バブリングフェーズ");
        }, false);

        clearButton.addEventListener("click", function() {
          log.textContent = "";
          count = 0;
        });
    </script>
</body>
</html>
```

**内側の要素をクリックしたときの実行順序**:
```
1. 外側の要素 - キャプチャフェーズ（上から下へ）
2. 内側の要素 - キャプチャフェーズ（ターゲット到達）
3. 内側の要素 - バブリングフェーズ（ターゲットから）
4. 外側の要素 - バブリングフェーズ（下から上へ）
```

**通常の開発では**:
- キャプチャフェーズはほとんど使わない
- バブリングフェーズで十分
- 特別な理由がない限り、第3引数は省略する

## よくある間違い

### 間違い1：stopPropagation()の過剰使用

**問題のあるコード**:

```javascript
// すべてのボタンでstopPropagation()を呼んでいる
let buttons = document.querySelectorAll("button");

buttons.forEach(function(button) {
  button.addEventListener("click", function(event) {
    event.stopPropagation(); // 常にバブリングを止めている
    console.log("ボタンがクリックされました");
  });
});

// 親要素のリスナーが動作しない
document.body.addEventListener("click", function() {
  console.log("bodyがクリックされました"); // ボタンをクリックしても実行されない
});
```

**何が問題か**:
- `stopPropagation()`を多用すると、他のイベントリスナーが動作しなくなる
- ページ全体のクリック追跡やアナリティクスが機能しなくなる
- デバッグが困難になる

**正しいコード**:

```javascript
// 必要な場合だけstopPropagation()を使う
let specialButton = document.getElementById("specialButton");

specialButton.addEventListener("click", function(event) {
  // このボタンだけ特別な理由でバブリングを止める
  event.stopPropagation();
  console.log("特別な処理");
});

// 他のボタンは通常通りバブリングさせる
let normalButtons = document.querySelectorAll(".normal-button");

normalButtons.forEach(function(button) {
  button.addEventListener("click", function(event) {
    // stopPropagation()を呼ばない
    console.log("通常の処理");
  });
});
```

**推奨されるアプローチ**:
- `stopPropagation()`は本当に必要な場合だけ使う
- イベント委譲で`event.target`をチェックする方法を優先
- どうしても必要な場合は、コメントで理由を明記

### 間違い2：event.targetのチェック不足

**問題のあるコード**:

```javascript
let container = document.getElementById("container");

container.addEventListener("click", function(event) {
  // どの要素がクリックされたかチェックせずに処理
  let itemId = event.target.dataset.itemId;
  console.log("アイテムID:", itemId); // undefinedになる可能性

  // data属性がない要素をクリックするとエラー
  deleteItem(itemId); // undefinedが渡される
});
```

**何が問題か**:
- コンテナ内のどの要素でも同じ処理を実行しようとする
- `data-item-id`属性がない要素をクリックすると`undefined`
- 意図しない動作やエラーが発生する

**正しいコード**:

```javascript
let container = document.getElementById("container");

container.addEventListener("click", function(event) {
  // クリックされた要素が削除ボタンかチェック
  if (event.target.classList.contains("delete-button")) {
    // 親要素のアイテムを取得
    let item = event.target.closest(".item");

    // アイテムが存在し、IDがあるかチェック
    if (item && item.dataset.itemId) {
      let itemId = item.dataset.itemId;
      console.log("アイテムを削除:", itemId);
      deleteItem(itemId);
    }
  }

  // 編集ボタンの場合
  if (event.target.classList.contains("edit-button")) {
    let item = event.target.closest(".item");
    if (item && item.dataset.itemId) {
      let itemId = item.dataset.itemId;
      console.log("アイテムを編集:", itemId);
      editItem(itemId);
    }
  }
});
```

**より堅牢な実装**:

```javascript
container.addEventListener("click", function(event) {
  let target = event.target;

  // ボタン要素またはその子要素がクリックされた場合
  let button = target.closest("button");
  if (!button) return; // ボタンでない場合は何もしない

  // ボタンの種類に応じて処理を分岐
  if (button.classList.contains("delete-button")) {
    handleDelete(button);
  } else if (button.classList.contains("edit-button")) {
    handleEdit(button);
  }
});

function handleDelete(button) {
  let item = button.closest(".item");
  if (item && item.dataset.itemId) {
    deleteItem(item.dataset.itemId);
  }
}

function handleEdit(button) {
  let item = button.closest(".item");
  if (item && item.dataset.itemId) {
    editItem(item.dataset.itemId);
  }
}
```

### 間違い3：event.targetとevent.currentTargetの混同

**問題のあるコード**:

```javascript
let parent = document.getElementById("parent");

parent.addEventListener("click", function(event) {
  // event.targetをリスナーが設定された要素だと勘違い
  console.log("親要素がクリックされました");
  event.target.style.backgroundColor = "yellow"; // 子要素が黄色くなってしまう
});
```

**何が問題か**:
- `event.target`は実際にクリックされた要素（子要素の可能性がある）
- リスナーが設定された親要素自体にアクセスしたい場合は`event.currentTarget`を使う
- 意図しない要素のスタイルが変更される

**正しいコード**:

```javascript
let parent = document.getElementById("parent");

parent.addEventListener("click", function(event) {
  console.log("実際にクリックされた要素:", event.target.id);
  console.log("リスナーが設定された要素:", event.currentTarget.id);

  // 親要素自体にアクセスしたい場合
  event.currentTarget.style.backgroundColor = "yellow";
  // またはthisを使う
  this.style.backgroundColor = "yellow";

  // クリックされた子要素にアクセスしたい場合
  if (event.target.classList.contains("child-item")) {
    event.target.style.color = "red";
  }
});
```

**使い分けの明確化**:

```javascript
parent.addEventListener("click", function(event) {
  // event.target - 実際にクリックされた要素（子要素を判定）
  if (event.target.tagName === "BUTTON") {
    console.log("ボタンがクリックされた");
  }

  // event.currentTarget - このリスナーが設定されている要素（親要素）
  console.log("親要素のID:", event.currentTarget.id);

  // this - event.currentTargetと同じ（通常の関数の場合）
  console.log("親要素のクラス:", this.className);
});
```

### 間違い4：バブリングしないイベントへの誤った期待

**問題のあるコード**:

```javascript
let container = document.getElementById("container");

// focusイベントはバブリングしない
container.addEventListener("focus", function(event) {
  console.log("入力欄にフォーカス"); // 実行されない！
});
```

**何が問題か**:
- `focus`と`blur`イベントはバブリングしない
- 親要素にリスナーを設定しても、子要素のfocus/blurイベントを捕捉できない
- イベント委譲が機能しない

**バブリングしないイベントの例**:
- `focus` / `blur`
- `load` / `unload`
- `mouseenter` / `mouseleave`
- `scroll`（要素によっては）

**正しいコード（パターン1）- focusinを使う**:

```javascript
let container = document.getElementById("container");

// focusinはバブリングする（focus のバブリング版）
container.addEventListener("focusin", function(event) {
  console.log("入力欄にフォーカス:", event.target.id);
  // 正しく動作する
});

// focusoutはバブリングする（blur のバブリング版）
container.addEventListener("focusout", function(event) {
  console.log("入力欄からフォーカスが外れた:", event.target.id);
});
```

**正しいコード（パターン2）- キャプチャフェーズを使う**:

```javascript
let container = document.getElementById("container");

// キャプチャフェーズでリスナーを設定（第3引数をtrue）
container.addEventListener("focus", function(event) {
  console.log("入力欄にフォーカス:", event.target.id);
}, true); // キャプチャフェーズで実行

container.addEventListener("blur", function(event) {
  console.log("入力欄からフォーカスが外れた:", event.target.id);
}, true);
```

**イベントのバブリング対応表**:

| イベント | バブリング | バブリング版の代替 |
|---------|-----------|------------------|
| focus | ✗ | focusin (✓) |
| blur | ✗ | focusout (✓) |
| mouseenter | ✗ | mouseover (✓) |
| mouseleave | ✗ | mouseout (✓) |
| load | ✗ | - |
| scroll | 要素による | - |
| click | ✓ | - |
| input | ✓ | - |
| change | ✓ | - |

### 間違い5：closest()の誤用

**問題のあるコード**:

```javascript
container.addEventListener("click", function(event) {
  // closest()の引数が間違っている
  let item = event.target.closest("item"); // クラス名の"."が抜けている

  if (item) {
    console.log(item.dataset.id); // itemはnullなのでエラー
  }
});
```

**何が問題か**:
- `closest()`の引数はCSSセレクタである必要がある
- クラス名なら`.item`、IDなら`#item`のように指定
- セレクタが間違っていると常に`null`が返る

**正しいコード**:

```javascript
container.addEventListener("click", function(event) {
  // クラス名の場合は"."をつける
  let item = event.target.closest(".item");

  if (item) {
    console.log("アイテムID:", item.dataset.id);
  }

  // タグ名の場合
  let button = event.target.closest("button");

  // IDの場合は"#"をつける
  let specificItem = event.target.closest("#item-123");

  // 複雑なセレクタも使える
  let deleteButton = event.target.closest("button.delete-button");
});
```

**closest()の動作理解**:

```javascript
// closest()は自分自身から始めて親要素に向かって検索する
let element = document.getElementById("child");

/*
<div class="grandparent">
  <div class="parent">
    <button id="child" class="btn">クリック</button>
  </div>
</div>
*/

// 自分自身がマッチする場合は自分自身を返す
console.log(element.closest(".btn")); // button#child（自分自身）

// 親要素を検索
console.log(element.closest(".parent")); // div.parent

// 祖父母要素を検索
console.log(element.closest(".grandparent")); // div.grandparent

// マッチしない場合はnull
console.log(element.closest(".not-exist")); // null
```

**安全な使い方**:

```javascript
container.addEventListener("click", function(event) {
  let button = event.target.closest("button");

  // nullチェックは必須
  if (button) {
    let item = button.closest(".item");

    if (item && item.dataset.id) {
      processItem(item.dataset.id);
    } else {
      console.warn("アイテムが見つからない、またはIDがありません");
    }
  }
});
```

### 間違い6：動的に追加された要素へのリスナー設定

**問題のあるコード**:

```javascript
// ページ読み込み時に存在する要素にだけリスナーを設定
let deleteButtons = document.querySelectorAll(".delete-button");

deleteButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    console.log("削除");
  });
});

// 後から追加されたボタンは動作しない
let newButton = document.createElement("button");
newButton.className = "delete-button";
newButton.textContent = "削除";
document.body.appendChild(newButton);
// このボタンをクリックしても何も起こらない！
```

**何が問題か**:
- `querySelectorAll()`は実行時点で存在する要素のみを取得
- 後から追加された要素にはイベントリスナーが設定されない
- 動的なUIでは機能しない

**正しいコード - イベント委譲を使う**:

```javascript
// 親要素（常に存在する要素）にイベントリスナーを設定
document.body.addEventListener("click", function(event) {
  // クリックされた要素が削除ボタンかチェック
  if (event.target.classList.contains("delete-button")) {
    console.log("削除");
    // 削除処理
  }
});

// 後から追加されたボタンでも動作する
let newButton = document.createElement("button");
newButton.className = "delete-button";
newButton.textContent = "削除";
document.body.appendChild(newButton);
// このボタンも正しく動作する！
```

**より具体的な実装例**:

```javascript
let listContainer = document.getElementById("listContainer");

// イベント委譲でリスト全体を管理
listContainer.addEventListener("click", function(event) {
  let target = event.target;

  // 削除ボタン
  if (target.classList.contains("delete-btn")) {
    let item = target.closest(".list-item");
    if (item) {
      item.remove();
      console.log("アイテムを削除");
    }
  }

  // 編集ボタン
  if (target.classList.contains("edit-btn")) {
    let item = target.closest(".list-item");
    if (item) {
      editItem(item);
      console.log("アイテムを編集");
    }
  }
});

// アイテムを動的に追加する関数
function addItem(text) {
  let item = document.createElement("div");
  item.className = "list-item";
  item.innerHTML = `
    <span class="item-text">${text}</span>
    <button class="edit-btn">編集</button>
    <button class="delete-btn">削除</button>
  `;
  listContainer.appendChild(item);
  // イベント委譲により、新しいボタンも自動的に機能する
}
```

**動的要素の処理パターン**:

```javascript
// ❌ 悪い例：個別にリスナーを設定
function addButtonBad(text) {
  let button = document.createElement("button");
  button.textContent = text;

  // 追加のたびにリスナーを設定する必要がある
  button.addEventListener("click", function() {
    console.log("クリック");
  });

  container.appendChild(button);
}

// ✓ 良い例：イベント委譲を使う
container.addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    console.log("クリック");
  }
});

function addButtonGood(text) {
  let button = document.createElement("button");
  button.textContent = text;
  container.appendChild(button);
  // リスナーの設定は不要！親要素のリスナーが機能する
}
```

## 実践アプリケーション1：マルチレベルメニュー

イベント伝播を活用した、ドロップダウンメニューを作成します。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>マルチレベルメニュー</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }

        .menu-container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }

        h1 {
            color: #333;
            margin-bottom: 20px;
        }

        .navbar {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
            padding: 0;
            margin: 0;
            list-style: none;
            display: flex;
        }

        .navbar > li {
            position: relative;
        }

        .navbar a {
            display: block;
            padding: 15px 25px;
            color: white;
            text-decoration: none;
            font-weight: bold;
            transition: background-color 0.3s;
        }

        .navbar > li > a:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }

        .submenu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background-color: white;
            min-width: 200px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            list-style: none;
            padding: 0;
            margin: 0;
            border-radius: 4px;
            z-index: 1000;
        }

        .submenu.show {
            display: block;
        }

        .submenu a {
            color: #333;
            padding: 12px 20px;
            border-bottom: 1px solid #f0f0f0;
        }

        .submenu a:hover {
            background-color: #f8f9fa;
        }

        .submenu li:last-child a {
            border-bottom: none;
        }

        .arrow {
            margin-left: 8px;
            font-size: 12px;
        }

        #log {
            margin-top: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 8px;
            max-height: 300px;
            overflow-y: auto;
        }

        .log-entry {
            margin: 5px 0;
            padding: 8px;
            background-color: white;
            border-left: 4px solid #667eea;
            border-radius: 4px;
            font-family: monospace;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="menu-container">
        <h1>マルチレベルメニュー</h1>

        <ul class="navbar" id="navbar">
            <li>
                <a href="#" data-menu="home">
                    ホーム
                </a>
            </li>
            <li>
                <a href="#" data-menu="products">
                    製品 <span class="arrow">▼</span>
                </a>
                <ul class="submenu">
                    <li><a href="#" data-item="laptop">ノートパソコン</a></li>
                    <li><a href="#" data-item="desktop">デスクトップ</a></li>
                    <li><a href="#" data-item="tablet">タブレット</a></li>
                    <li><a href="#" data-item="smartphone">スマートフォン</a></li>
                </ul>
            </li>
            <li>
                <a href="#" data-menu="services">
                    サービス <span class="arrow">▼</span>
                </a>
                <ul class="submenu">
                    <li><a href="#" data-item="support">サポート</a></li>
                    <li><a href="#" data-item="training">トレーニング</a></li>
                    <li><a href="#" data-item="consulting">コンサルティング</a></li>
                </ul>
            </li>
            <li>
                <a href="#" data-menu="about">
                    会社情報 <span class="arrow">▼</span>
                </a>
                <ul class="submenu">
                    <li><a href="#" data-item="company">会社概要</a></li>
                    <li><a href="#" data-item="team">チーム</a></li>
                    <li><a href="#" data-item="careers">採用情報</a></li>
                </ul>
            </li>
            <li>
                <a href="#" data-menu="contact">
                    お問い合わせ
                </a>
            </li>
        </ul>

        <div id="log">
            <strong>イベントログ</strong>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let navbar = document.getElementById("navbar");
let log = document.getElementById("log");
let currentOpenSubmenu = null;

function addLog(message) {
  let entry = document.createElement("div");
  entry.className = "log-entry";
  let time = new Date().toLocaleTimeString();
  entry.textContent = "[" + time + "] " + message;
  log.appendChild(entry);
  log.scrollTop = log.scrollHeight;
}

// イベント委譲：navbar全体に1つのリスナー
navbar.addEventListener("click", function(event) {
  event.preventDefault(); // リンクのデフォルト動作を防ぐ

  let target = event.target;

  // クリックされた要素がリンク（a要素）か、その親を探す
  let link = target.closest("a");
  if (!link) return;

  // メニュー項目のクリック
  if (link.dataset.menu) {
    let menuName = link.dataset.menu;
    addLog("メニュークリック: " + menuName);

    // サブメニューを持つメニュー項目の場合
    let parentLi = link.parentElement;
    let submenu = parentLi.querySelector(".submenu");

    if (submenu) {
      // 他のサブメニューを閉じる
      if (currentOpenSubmenu && currentOpenSubmenu !== submenu) {
        currentOpenSubmenu.classList.remove("show");
      }

      // サブメニューの表示/非表示を切り替え
      submenu.classList.toggle("show");

      if (submenu.classList.contains("show")) {
        currentOpenSubmenu = submenu;
        addLog("→ サブメニューを表示");
      } else {
        currentOpenSubmenu = null;
        addLog("→ サブメニューを閉じる");
      }

      // バブリングを止めて、documentのリスナーが実行されないようにする
      event.stopPropagation();
    }
  }

  // サブメニュー項目のクリック
  if (link.dataset.item) {
    let itemName = link.dataset.item;
    addLog("サブメニュー選択: " + itemName);

    // サブメニューを閉じる
    if (currentOpenSubmenu) {
      currentOpenSubmenu.classList.remove("show");
      currentOpenSubmenu = null;
      addLog("→ サブメニューを閉じる");
    }
  }
});

// サブメニュー内のクリックはバブリングを止める
let submenus = document.querySelectorAll(".submenu");
submenus.forEach(function(submenu) {
  submenu.addEventListener("click", function(event) {
    event.stopPropagation(); // navbarへのバブリングを止める
  });
});

// document全体のクリックで開いているサブメニューを閉じる
document.addEventListener("click", function(event) {
  if (currentOpenSubmenu) {
    currentOpenSubmenu.classList.remove("show");
    addLog("外側クリック: サブメニューを閉じる");
    currentOpenSubmenu = null;
  }
});

addLog("メニューシステム初期化完了");
```

### アプリケーションの機能説明

**イベント委譲の活用**:
- navbar全体に1つのリスナーで、すべてのメニュー項目を処理
- `event.target.closest("a")`でクリックされたリンクを取得
- `data-menu`と`data-item`属性で項目の種類を判定

**stopPropagation()の戦略的使用**:
- メニュー項目をクリックしたとき、documentのリスナーが実行されないようにする
- サブメニュー内のクリックがnavbarに伝わらないようにする

**外側クリック検出**:
- documentにリスナーを設定
- メニュー内のクリックは`stopPropagation()`で止められているため、documentのリスナーは実行されない
- メニューの外側をクリックしたときだけdocumentのリスナーが実行され、サブメニューが閉じる

## 実践アプリケーション2：ドラッグ可能なTodoリスト

イベント伝播を考慮した、ドラッグ&ドロップ機能付きのTodoリストを作成します。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>ドラッグ可能なTodoリスト</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            margin: 0;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            padding: 30px;
        }

        h1 {
            color: #333;
            margin-bottom: 10px;
        }

        .subtitle {
            color: #666;
            margin-bottom: 30px;
        }

        .add-form {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
        }

        .add-form input {
            flex: 1;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            font-size: 14px;
        }

        .add-form input:focus {
            outline: none;
            border-color: #667eea;
        }

        .add-form button {
            padding: 12px 24px;
            background-color: #667eea;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s;
        }

        .add-form button:hover {
            background-color: #5568d3;
        }

        .columns {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }

        .column {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
            min-height: 400px;
        }

        .column-header {
            font-weight: bold;
            margin-bottom: 15px;
            padding: 10px;
            border-radius: 6px;
            text-align: center;
            color: white;
        }

        .todo-header {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .doing-header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .done-header {
            background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }

        .todo-item {
            background-color: white;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 6px;
            cursor: move;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: all 0.3s;
        }

        .todo-item:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            transform: translateY(-2px);
        }

        .todo-item.dragging {
            opacity: 0.5;
        }

        .todo-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .todo-text {
            flex: 1;
            margin-right: 10px;
        }

        .todo-actions {
            display: flex;
            gap: 5px;
        }

        .todo-actions button {
            padding: 6px 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: opacity 0.3s;
        }

        .todo-actions button:hover {
            opacity: 0.8;
        }

        .delete-btn {
            background-color: #e74c3c;
            color: white;
        }

        .column.drag-over {
            background-color: #e3f2fd;
            border: 2px dashed #2196f3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📝 ドラッグ可能なTodoリスト</h1>
        <p class="subtitle">タスクをドラッグ&ドロップで移動できます</p>

        <div class="add-form">
            <input type="text" id="taskInput" placeholder="新しいタスクを入力">
            <button id="addButton">タスクを追加</button>
        </div>

        <div class="columns">
            <div class="column" id="todoColumn" data-status="todo">
                <div class="column-header todo-header">📋 TODO</div>
                <div class="task-list"></div>
            </div>

            <div class="column" id="doingColumn" data-status="doing">
                <div class="column-header doing-header">⚙️ 進行中</div>
                <div class="task-list"></div>
            </div>

            <div class="column" id="doneColumn" data-status="done">
                <div class="column-header done-header">✅ 完了</div>
                <div class="task-list"></div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let columns = document.querySelectorAll(".column");
let taskId = 0;
let draggedTask = null;

// タスク追加
addButton.addEventListener("click", function() {
  let taskText = taskInput.value.trim();
  if (taskText === "") return;

  taskId++;
  createTask(taskText, "todo");
  taskInput.value = "";
});

// Enterキーでタスク追加
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

// タスク作成関数
function createTask(text, status) {
  let column = document.querySelector(`[data-status="${status}"] .task-list`);

  let task = document.createElement("div");
  task.className = "todo-item";
  task.draggable = true;
  task.dataset.taskId = taskId;
  task.innerHTML = `
    <div class="todo-content">
      <div class="todo-text">${text}</div>
      <div class="todo-actions">
        <button class="delete-btn">削除</button>
      </div>
    </div>
  `;

  column.appendChild(task);
  setupTaskEvents(task);
}

// タスクにイベントを設定
function setupTaskEvents(task) {
  // ドラッグ開始
  task.addEventListener("dragstart", function(event) {
    draggedTask = this;
    this.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    console.log("ドラッグ開始:", this.dataset.taskId);
  });

  // ドラッグ終了
  task.addEventListener("dragend", function(event) {
    this.classList.remove("dragging");
    console.log("ドラッグ終了");

    // すべてのカラムからdrag-overクラスを削除
    columns.forEach(function(col) {
      col.classList.remove("drag-over");
    });
  });
}

// 各カラムにドロップイベントを設定
columns.forEach(function(column) {
  // ドラッグオーバー
  column.addEventListener("dragover", function(event) {
    event.preventDefault(); // ドロップを許可
    this.classList.add("drag-over");
    event.dataTransfer.dropEffect = "move";
  });

  // ドラッグが外れた
  column.addEventListener("dragleave", function(event) {
    // event.targetがカラム自体の場合のみクラスを削除
    if (event.target === this) {
      this.classList.remove("drag-over");
    }
  });

  // ドロップ
  column.addEventListener("drop", function(event) {
    event.preventDefault();
    this.classList.remove("drag-over");

    if (draggedTask) {
      let taskList = this.querySelector(".task-list");
      taskList.appendChild(draggedTask);

      let newStatus = this.dataset.status;
      console.log("タスクを移動:", newStatus);
    }
  });
});

// イベント委譲で削除ボタンを処理
document.addEventListener("click", function(event) {
  // 削除ボタンがクリックされたか確認
  if (event.target.classList.contains("delete-btn")) {
    // stopPropagation()を呼んで、親要素のイベントが発生しないようにする
    event.stopPropagation();

    let task = event.target.closest(".todo-item");
    if (task) {
      // 削除確認
      if (confirm("このタスクを削除しますか？")) {
        task.remove();
        console.log("タスクを削除:", task.dataset.taskId);
      }
    }
  }
});

// 初期タスク
createTask("レッスン69を完了する", "todo");
createTask("イベント伝播を理解する", "doing");
createTask("基本的なイベント処理を学ぶ", "done");

console.log("Todoリストアプリケーション初期化完了");
```

### アプリケーションの機能説明

**イベント委譲の活用**:
- document全体に1つのリスナーで、すべての削除ボタンを処理
- `event.target.classList.contains("delete-btn")`で削除ボタンを判定
- `event.target.closest(".todo-item")`で親タスク要素を取得

**stopPropagation()の使用**:
- 削除ボタンのクリックで`stopPropagation()`を呼ぶ
- タスク要素自体のクリックイベント（もしあれば）が発生しないようにする

**ドラッグ&ドロップとイベント伝播**:
- ドラッグイベント（dragstart, dragend）は各タスクに設定
- ドロップイベント（dragover, drop）は各カラムに設定
- `event.preventDefault()`でドロップを許可

**動的要素への対応**:
- 新しく追加されたタスクにも`setupTaskEvents()`でイベントを設定
- 削除ボタンはイベント委譲により自動的に機能

## 実践アプリケーション3：イベント伝播ビジュアライザー

イベントの伝播過程を視覚的に表示するツールを作成します。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>イベント伝播ビジュアライザー</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f0f0f0;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
            margin-bottom: 10px;
        }

        .controls {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 8px;
        }

        .controls button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
        }

        .controls button.active {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        #normalMode {
            background-color: #4caf50;
            color: white;
        }

        #stopMode {
            background-color: #f44336;
            color: white;
        }

        #clearLog {
            background-color: #2196f3;
            color: white;
        }

        .main-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        .demo-area {
            padding: 20px;
            background-color: #fafafa;
            border-radius: 8px;
        }

        .level-1 {
            background-color: #e3f2fd;
            padding: 30px;
            border: 3px solid #2196f3;
            border-radius: 8px;
            cursor: pointer;
        }

        .level-2 {
            background-color: #fff3e0;
            padding: 30px;
            border: 3px solid #ff9800;
            border-radius: 8px;
            margin-top: 20px;
            cursor: pointer;
        }

        .level-3 {
            background-color: #f3e5f5;
            padding: 20px;
            border: 3px solid #9c27b0;
            border-radius: 8px;
            margin-top: 20px;
            cursor: pointer;
            text-align: center;
            font-weight: bold;
        }

        .log-area {
            background-color: #263238;
            color: #aed581;
            padding: 20px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            max-height: 600px;
            overflow-y: auto;
        }

        .log-entry {
            margin: 8px 0;
            padding: 8px;
            border-left: 4px solid;
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
        }

        .log-capture {
            border-left-color: #64b5f6;
            color: #64b5f6;
        }

        .log-target {
            border-left-color: #81c784;
            color: #81c784;
        }

        .log-bubble {
            border-left-color: #ffb74d;
            color: #ffb74d;
        }

        .log-stop {
            border-left-color: #e57373;
            color: #e57373;
        }

        .phase-indicator {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: bold;
            margin-right: 8px;
        }

        .phase-capture {
            background-color: #1976d2;
            color: white;
        }

        .phase-target {
            background-color: #388e3c;
            color: white;
        }

        .phase-bubble {
            background-color: #f57c00;
            color: white;
        }

        .info-box {
            margin-top: 20px;
            padding: 15px;
            background-color: #fff9c4;
            border-left: 4px solid #fbc02d;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 イベント伝播ビジュアライザー</h1>

        <div class="controls">
            <button id="normalMode" class="active">通常モード</button>
            <button id="stopMode">stopPropagation()モード</button>
            <button id="clearLog">ログをクリア</button>
        </div>

        <div class="main-content">
            <div class="demo-area">
                <h3>クリック可能エリア</h3>
                <div class="level-1" id="level1">
                    Level 1（青）- 外側
                    <div class="level-2" id="level2">
                        Level 2（オレンジ）- 中間
                        <div class="level-3" id="level3">
                            Level 3（紫）- 内側<br>ここをクリック！
                        </div>
                    </div>
                </div>

                <div class="info-box">
                    <strong>💡 ヒント:</strong>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>内側をクリックすると3つのイベントが発生します</li>
                        <li>stopPropagation()モードでは伝播が止まります</li>
                        <li>ログで実行順序を確認してください</li>
                    </ul>
                </div>
            </div>

            <div class="log-area" id="logArea">
                <div style="color: #aed581; font-weight: bold; margin-bottom: 10px;">
                    📋 イベントログ
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let level1 = document.getElementById("level1");
let level2 = document.getElementById("level2");
let level3 = document.getElementById("level3");
let logArea = document.getElementById("logArea");
let normalModeBtn = document.getElementById("normalMode");
let stopModeBtn = document.getElementById("stopMode");
let clearLogBtn = document.getElementById("clearLog");

let stopPropagationEnabled = false;
let eventCount = 0;

function addLog(message, phase, level) {
  eventCount++;
  let entry = document.createElement("div");
  entry.className = "log-entry log-" + phase;

  let phaseLabel = "";
  let phaseClass = "";

  if (phase === "capture") {
    phaseLabel = "CAPTURE";
    phaseClass = "phase-capture";
  } else if (phase === "target") {
    phaseLabel = "TARGET";
    phaseClass = "phase-target";
  } else if (phase === "bubble") {
    phaseLabel = "BUBBLE";
    phaseClass = "phase-bubble";
  }

  let time = new Date().toLocaleTimeString();

  entry.innerHTML = `
    <span style="color: #78909c;">[${time}]</span>
    <span class="phase-indicator ${phaseClass}">${phaseLabel}</span>
    <strong>${message}</strong>
    ${level ? `<span style="color: #90a4ae;"> (Level ${level})</span>` : ""}
  `;

  logArea.appendChild(entry);
  logArea.scrollTop = logArea.scrollHeight;
}

// キャプチャフェーズのリスナー
level1.addEventListener("click", function(event) {
  addLog("Level 1 キャプチャフェーズ", "capture", 1);
}, true);

level2.addEventListener("click", function(event) {
  addLog("Level 2 キャプチャフェーズ", "capture", 2);
}, true);

level3.addEventListener("click", function(event) {
  addLog("Level 3 キャプチャフェーズ", "capture", 3);
}, true);

// バブリングフェーズのリスナー
level3.addEventListener("click", function(event) {
  addLog("Level 3 ターゲット（クリック）", "target", 3);

  if (stopPropagationEnabled) {
    event.stopPropagation();
    let stopEntry = document.createElement("div");
    stopEntry.className = "log-entry log-stop";
    stopEntry.innerHTML = `
      <span class="phase-indicator" style="background-color: #c62828;">STOP</span>
      <strong>⛔ stopPropagation() 実行 - バブリング停止</strong>
    `;
    logArea.appendChild(stopEntry);
    logArea.scrollTop = logArea.scrollHeight;
  }
});

level2.addEventListener("click", function(event) {
  addLog("Level 2 バブリングフェーズ", "bubble", 2);
});

level1.addEventListener("click", function(event) {
  addLog("Level 1 バブリングフェーズ", "bubble", 1);
});

// モード切り替え
normalModeBtn.addEventListener("click", function() {
  stopPropagationEnabled = false;
  this.classList.add("active");
  stopModeBtn.classList.remove("active");
  addLog("通常モードに切り替え", "target", null);
});

stopModeBtn.addEventListener("click", function() {
  stopPropagationEnabled = true;
  this.classList.add("active");
  normalModeBtn.classList.remove("active");
  addLog("stopPropagation()モードに切り替え", "target", null);
});

// ログクリア
clearLogBtn.addEventListener("click", function() {
  logArea.innerHTML = `
    <div style="color: #aed581; font-weight: bold; margin-bottom: 10px;">
      📋 イベントログ
    </div>
  `;
  eventCount = 0;
});

// 初期ログ
addLog("アプリケーション初期化完了", "target", null);
addLog("内側の要素をクリックしてイベント伝播を観察してください", "target", null);
```

### アプリケーションの機能説明

**3つのフェーズを可視化**:
- キャプチャフェーズ（上から下）のリスナーは第3引数を`true`に設定
- ターゲットフェーズで実際のクリックイベントを処理
- バブリングフェーズ（下から上）のリスナーは通常通り設定

**stopPropagation()の効果を視覚化**:
- 通常モード: すべてのフェーズが実行される
- stopPropagation()モード: Level 3でバブリングが停止し、Level 2とLevel 1のバブリングフェーズは実行されない
- ログに明確に表示される

**色分けとフェーズ表示**:
- キャプチャフェーズ: 青色
- ターゲットフェーズ: 緑色
- バブリングフェーズ: オレンジ色
- 停止: 赤色

**実行順序の確認**:
```
通常モード:
1. Level 1 CAPTURE
2. Level 2 CAPTURE
3. Level 3 CAPTURE
4. Level 3 TARGET
5. Level 2 BUBBLE
6. Level 1 BUBBLE

stopPropagation()モード:
1. Level 1 CAPTURE
2. Level 2 CAPTURE
3. Level 3 CAPTURE
4. Level 3 TARGET
⛔ STOP（Level 2とLevel 1のBUBBLEは実行されない）
```

## 練習問題

### 問題1：3階層バブリング確認プログラム

次の仕様を満たすプログラムを作成してください。

**仕様**:
1. HTMLに以下の要素を作成する
   - `id="outer"`のdiv要素（背景色: lightblue、幅: 400px、高さ: 300px、padding: 20px）
   - その中に`id="middle"`のdiv要素（背景色: lightgreen、幅: 300px、高さ: 200px、padding: 20px）
   - その中に`id="inner"`のdiv要素（背景色: lightcoral、幅: 200px、高さ: 100px）
   - `id="log"`のp要素

2. JavaScriptで以下の機能を実装する
   - outer、middle、innerの各要素にクリックイベントリスナーを設定する
   - 各要素がクリックされたとき、`log`要素に要素のidを追加表示する
   - innerをクリックしたときは、`log`に"inner, middle, outer"と表示される
   - middleをクリックしたときは、`log`に"middle, outer"と表示される
   - outerをクリックしたときは、`log`に"outer"と表示される

**ヒント（レベル1）**:
<details>
<summary>クリックして表示</summary>

- イベントバブリングにより、子要素をクリックすると親要素のイベントも発生します
- `log.textContent`に文字列を追加していきます
- 最初に`log.textContent = ""`でクリアしてから追加します

</details>

**ヒント（レベル2）**:
<details>
<summary>クリックして表示</summary>

```javascript
let outer = document.getElementById("outer");
let middle = document.getElementById("middle");
let inner = document.getElementById("inner");
let log = document.getElementById("log");

inner.addEventListener("click", function() {
  log.textContent = "";
  log.textContent += "inner";
});

middle.addEventListener("click", function() {
  if (log.textContent === "") {
    log.textContent = "middle";
  } else {
    log.textContent += ", middle";
  }
});

// outerも同様に実装
```

</details>

**ヒント（レベル3）**:
<details>
<summary>クリックして表示</summary>

```javascript
let outer = document.getElementById("outer");
let middle = document.getElementById("middle");
let inner = document.getElementById("inner");
let log = document.getElementById("log");

inner.addEventListener("click", function() {
  log.textContent = "inner";
});

middle.addEventListener("click", function() {
  if (log.textContent === "inner") {
    log.textContent += ", middle";
  } else {
    log.textContent = "middle";
  }
});

outer.addEventListener("click", function() {
  if (log.textContent.includes("middle") || log.textContent.includes("inner")) {
    log.textContent += ", outer";
  } else {
    log.textContent = "outer";
  }
});
```

</details>

### 問題2：イベント委譲でボタン処理

次の仕様を満たすプログラムを作成してください。

**仕様**:
1. HTMLに以下の要素を作成する
   - `id="buttonContainer"`のdiv要素
   - その中に5つのbutton要素（`data-number="1"`〜`data-number="5"`）
   - `id="result"`のp要素

2. JavaScriptで以下の機能を実装する
   - イベント委譲を使って、buttonContainerに1つだけイベントリスナーを設定する
   - ボタンがクリックされたとき、`result`要素に"ボタン[番号]がクリックされました"と表示する
   - `event.target`を使ってどのボタンがクリックされたか判定する

**ヒント（レベル1）**:
<details>
<summary>クリックして表示</summary>

- 親要素（buttonContainer）にイベントリスナーを設定します
- `event.target`でクリックされた要素を取得します
- `event.target.dataset.number`でボタンの番号を取得します

</details>

**ヒント（レベル2）**:
<details>
<summary>クリックして表示</summary>

```javascript
let buttonContainer = document.getElementById("buttonContainer");
let result = document.getElementById("result");

buttonContainer.addEventListener("click", function(event) {
  // クリックされた要素がボタンかチェック
  if (event.target.tagName === "BUTTON") {
    let number = event.target.dataset.number;
    result.textContent = "ボタン" + number + "がクリックされました";
  }
});
```

</details>

**ヒント（レベル3）**:
<details>
<summary>クリックして表示</summary>

```javascript
let buttonContainer = document.getElementById("buttonContainer");
let result = document.getElementById("result");

buttonContainer.addEventListener("click", function(event) {
  // event.targetでクリックされた要素を取得
  let clickedElement = event.target;

  // ボタンかどうか確認
  if (clickedElement.tagName === "BUTTON") {
    // data-number属性から番号を取得
    let number = clickedElement.dataset.number;

    // 結果を表示
    result.textContent = "ボタン" + number + "がクリックされました";

    console.log("クリックされたボタン:", number);
    console.log("target:", event.target);
    console.log("currentTarget:", event.currentTarget);
  }
});
```

</details>

### 問題3：stopPropagation()の実践

次の仕様を満たすプログラムを作成してください。

**仕様**:
1. HTMLに以下の要素を作成する
   - `id="parent"`のdiv要素（背景色: lightblue、幅: 300px、高さ: 200px、padding: 20px）
   - その中に2つのbutton要素
     - `id="normalButton"` テキスト: "通常のボタン"
     - `id="stopButton"` テキスト: "stopボタン"
   - `id="message"`のp要素

2. JavaScriptで以下の機能を実装する
   - parent要素にクリックイベントリスナーを設定し、クリックされたら`message`に"親要素がクリックされました"と表示
   - normalButtonにクリックイベントリスナーを設定し、クリックされたら`message`に"通常のボタンがクリックされました"と表示
   - stopButtonにクリックイベントリスナーを設定し、クリックされたら`message`に"stopボタンがクリックされました"と表示し、`event.stopPropagation()`を呼ぶ
   - normalButtonをクリックすると、ボタンと親要素の両方のメッセージが表示される
   - stopButtonをクリックすると、ボタンのメッセージのみが表示される（親要素のメッセージは表示されない）

**ヒント（レベル1）**:
<details>
<summary>クリックして表示</summary>

- `event.stopPropagation()`を呼ぶと、親要素へのイベント伝播が止まります
- stopButtonのイベントリスナー内で`event.stopPropagation()`を呼びます
- normalButtonでは`stopPropagation()`を呼ばないので、親要素のイベントも発生します

</details>

**ヒント（レベル2）**:
<details>
<summary>クリックして表示</summary>

```javascript
let parent = document.getElementById("parent");
let normalButton = document.getElementById("normalButton");
let stopButton = document.getElementById("stopButton");
let message = document.getElementById("message");

parent.addEventListener("click", function() {
  message.textContent += " 親要素がクリックされました";
});

normalButton.addEventListener("click", function() {
  message.textContent = "通常のボタンがクリックされました";
  // stopPropagation()を呼ばない
});

stopButton.addEventListener("click", function(event) {
  message.textContent = "stopボタンがクリックされました";
  event.stopPropagation(); // バブリングを止める
});
```

</details>

**ヒント（レベル3）**:
<details>
<summary>クリックして表示</summary>

```javascript
let parent = document.getElementById("parent");
let normalButton = document.getElementById("normalButton");
let stopButton = document.getElementById("stopButton");
let message = document.getElementById("message");

// 親要素のイベントリスナー
parent.addEventListener("click", function(event) {
  message.textContent += " 親要素がクリックされました";
  console.log("親要素のイベント発生");
  console.log("実際にクリックされた要素:", event.target.id);
});

// 通常のボタン（バブリングする）
normalButton.addEventListener("click", function(event) {
  message.textContent = "通常のボタンがクリックされました →";
  console.log("通常のボタン - バブリングします");
  // event.stopPropagation()を呼ばないので親要素のイベントも発生
});

// stopボタン（バブリングしない）
stopButton.addEventListener("click", function(event) {
  message.textContent = "stopボタンがクリックされました（親要素のイベントは発生しません）";
  event.stopPropagation(); // ここでバブリングを止める
  console.log("stopボタン - バブリング停止");
});
```

</details>

## まとめ

このレッスンでは、以下のことを学びました。

### 学習した内容

1. **イベント伝播の基礎**
   - イベントバブリング：子要素から親要素への伝播
   - イベントは子 → 親 → 祖父母... の順に伝わる

2. **event.targetとevent.currentTarget**
   - `event.target`：実際にクリックされた要素
   - `event.currentTarget`：イベントリスナーが設定されている要素
   - イベント委譲での使い分けが重要

3. **stopPropagation()の使い方**
   - `event.stopPropagation()`でバブリングを止める
   - 親要素へのイベント伝播を防ぐ
   - モーダルやメニューなどで戦略的に使用

4. **イベント委譲（Event Delegation）**
   - 親要素に1つのリスナーで複数の子要素を処理
   - メモリ効率が良い
   - 動的に追加される要素にも対応

5. **イベントフローの3つのフェーズ**
   - キャプチャフェーズ（上から下）
   - ターゲットフェーズ（ターゲット到達）
   - バブリングフェーズ（下から上）

6. **実践的なパターン**
   - メニューの外側クリック検出
   - モーダルの背景クリック
   - カード内のボタンとカード全体のクリック処理
   - ドラッグ&ドロップとイベント伝播

### 重要なポイント

- **イベントバブリングは自動的に発生する**：特別な設定なしに、子要素のイベントは親要素に伝わる
- **event.targetで子要素を判定**：イベント委譲の基本パターン
- **stopPropagation()は慎重に使う**：本当に必要な場合だけ使用する
- **バブリングしないイベントがある**：focus/blur → focusin/focusoutを使う
- **イベント委譲で効率化**：動的要素にも対応できる強力なパターン

イベント伝播を理解することで、より効率的で保守性の高いコードを書けるようになりました。次のレッスンでは、`preventDefault()`などのさらに高度なイベント制御について学んでいきます。
