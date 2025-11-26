---
title: "Lesson 066: キーボードイベント"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン66：キーボードイベント

## このレッスンで学ぶこと

このレッスンでは、キーボード操作に反応するプログラムの作り方を学びます。キーボードイベントは、ウェブアプリケーションのユーザー体験を大きく向上させる重要な機能です。矢印キーでの移動、Enterキーでの送信、ショートカットキーなど、実用的なキーボード操作を実装できるようになります。

### 学習目標

- キーボードイベント（keydownとkeyup）の仕組みを理解する
- event.keyプロパティを使って押されたキーを判定できるようになる
- 矢印キーや特殊キーに反応するプログラムを作れるようになる
- ショートカットキーを実装できるようになる
- キーボード操作によるインタラクティブな機能を作れるようになる

---

## 実世界での活用例

キーボードイベントは、多くの有名なウェブサービスで使われています。実際の例を見てみましょう。

### 例1：Google検索

**使用されている場面**
Google検索では、検索ボックスにフォーカスがあるときにEnterキーを押すと検索が実行されます。また、検索結果画面で「/」キーを押すと、検索ボックスにフォーカスが移動します。

**実装されている機能**
```javascript
// Enterキーで検索を実行
searchInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    performSearch();
  }
});

// /キーで検索ボックスにフォーカス
document.addEventListener("keydown", function(event) {
  if (event.key === "/") {
    event.preventDefault();
    searchInput.focus();
  }
});
```

**なぜ重要なのか**
マウスを使わずにキーボードだけで素早く操作できることで、ユーザーの作業効率が大幅に向上します。特にパワーユーザーにとって、キーボードショートカットは必須の機能です。

### 例2：Gmail

**使用されている場面**
Gmailでは、様々なキーボードショートカットが用意されています。「c」キーで新規メール作成、「r」キーで返信、「/」キーで検索、矢印キーでメールの移動などができます。

**実装されている機能**
```javascript
// cキーで新規メール作成
document.addEventListener("keydown", function(event) {
  if (event.key === "c" && !isTyping) {
    composeNewEmail();
  }
});

// 矢印キーでメール選択を移動
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowDown") {
    selectNextEmail();
  } else if (event.key === "ArrowUp") {
    selectPreviousEmail();
  }
});

// Enterキーでメールを開く
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter" && selectedEmail) {
    openEmail(selectedEmail);
  }
});
```

**なぜ重要なのか**
メール処理という頻繁に行う作業で、マウス操作を最小限にできることは生産性に直結します。ユーザーは何百通ものメールを素早く処理できます。

### 例3：YouTube

**使用されている場面**
YouTube動画プレーヤーでは、スペースキーで再生/一時停止、矢印キーで早送り/巻き戻し、「f」キーでフルスクリーン切り替え、「m」キーでミュート切り替えなどができます。

**実装されている機能**
```javascript
// スペースキーで再生/一時停止
document.addEventListener("keydown", function(event) {
  if (event.key === " " && videoPlayerHasFocus) {
    event.preventDefault();
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
});

// 矢印キーで早送り/巻き戻し
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowRight") {
    video.currentTime += 5; // 5秒早送り
  } else if (event.key === "ArrowLeft") {
    video.currentTime -= 5; // 5秒巻き戻し
  }
});

// fキーでフルスクリーン
document.addEventListener("keydown", function(event) {
  if (event.key === "f") {
    toggleFullscreen();
  }
});
```

**なぜ重要なのか**
動画視聴中は両手がキーボードにあることが多く、マウスに手を伸ばさずに操作できることで、スムーズな視聴体験が実現されます。

### 例4：Trello

**使用されている場面**
Trelloでは、「n」キーで新規カード作成、矢印キーでカード間の移動、Enterキーでカードを開く、Escapeキーでダイアログを閉じるなどの操作ができます。

**実装されている機能**
```javascript
// nキーで新規カード作成
document.addEventListener("keydown", function(event) {
  if (event.key === "n" && !isEditMode) {
    createNewCard();
  }
});

// 矢印キーでカード選択を移動
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowDown") {
    selectNextCard();
  } else if (event.key === "ArrowUp") {
    selectPreviousCard();
  } else if (event.key === "ArrowRight") {
    selectRightCard();
  } else if (event.key === "ArrowLeft") {
    selectLeftCard();
  }
});

// Escapeキーでダイアログを閉じる
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeDialog();
  }
});
```

**なぜ重要なのか**
タスク管理では頻繁にカードの作成・移動・編集を行うため、キーボード操作により作業効率が大幅に向上します。

### 例5：Slack

**使用されている場面**
Slackでは、Ctrl+K（またはCmd+K）でチャンネル検索、↑キーで最後のメッセージ編集、Escapeキーでサイドバーを閉じる、Enterキーでメッセージ送信などができます。

**実装されている機能**
```javascript
// Enterキーでメッセージ送信
messageInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

// Shift+Enterで改行
messageInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter" && event.shiftKey) {
    // ブラウザのデフォルト動作（改行）を許可
  }
});

// 上矢印キーで最後のメッセージ編集
messageInput.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp" && messageInput.value === "") {
    editLastMessage();
  }
});

// Escapeキーで編集モードをキャンセル
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && isEditMode) {
    cancelEdit();
  }
});
```

**なぜ重要なのか**
チャットアプリでは素早いメッセージのやり取りが重要です。キーボード操作により、会話のテンポを維持しながら効率的にコミュニケーションできます。

---

## キーボードイベントとは

キーボードイベントは、ユーザーがキーボードのキーを押したり離したりしたときに発生するイベントです。これにより、ウェブページがキーボード操作に反応できるようになります。

### なぜキーボードイベントが重要なのか

キーボードイベントは、以下の理由で現代のウェブ開発において非常に重要です。

1. **アクセシビリティの向上**
   - マウスを使えないユーザーでもアプリケーションを操作できるようになります
   - スクリーンリーダーを使用するユーザーにとって必須の機能です

2. **操作効率の向上**
   - パワーユーザーはキーボードショートカットにより、マウス操作よりも速く作業できます
   - 頻繁に行う操作をキーボードで実行できることで、生産性が向上します

3. **ゲームやインタラクティブコンテンツ**
   - ゲームでは矢印キーやWASDキーでキャラクターを動かす必要があります
   - インタラクティブな教育コンテンツやツールでも重要です

4. **フォーム入力の改善**
   - Enterキーで送信、Tabキーでフィールド移動など、自然な入力体験を提供します
   - ユーザーがマウスに手を伸ばす必要が減ります

### キーボードイベントの種類

JavaScriptには主に2つのキーボードイベントがあります。

#### 1. keydown（キーダウン）

**発生タイミング**
キーを押した瞬間に発生します。

**特徴**
- キーを押し続けると、連続して発生します（リピート機能）
- すべてのキーで発生します（文字キー、矢印キー、修飾キーなど）
- キーを押した瞬間に反応したい場合に使用します

**使用例**
```javascript
document.addEventListener("keydown", function(event) {
  console.log("キーが押されました: " + event.key);
});
```

**リピート動作**
キーを押し続けると、keydownイベントが連続して発生します。これにより、矢印キーを押し続けて連続的に移動するような動作が実現できます。

```javascript
// 矢印キーを押し続けると連続して移動する
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowRight") {
    moveRight(); // 連続して呼ばれる
  }
});
```

#### 2. keyup（キーアップ）

**発生タイミング**
キーを離した瞬間に発生します。

**特徴**
- キーを押し続けても、離すまで発生しません
- キーを離したときに処理を実行したい場合に使用します
- リピート機能はありません

**使用例**
```javascript
document.addEventListener("keyup", function(event) {
  console.log("キーが離されました: " + event.key);
});
```

#### keydownとkeyupの組み合わせ

2つのイベントを組み合わせることで、キーが押されている間の状態を管理できます。

```javascript
let isSpacePressed = false;

document.addEventListener("keydown", function(event) {
  if (event.key === " ") {
    isSpacePressed = true;
    console.log("スペースキーが押されています");
  }
});

document.addEventListener("keyup", function(event) {
  if (event.key === " ") {
    isSpacePressed = false;
    console.log("スペースキーが離されました");
  }
});
```

---

## event.keyプロパティ

キーボードイベントが発生したとき、イベントオブジェクト（`event`）には押されたキーの情報が含まれています。`event.key`プロパティを使うと、どのキーが押されたかを文字列で取得できます。

### event.keyの値

`event.key`は、押されたキーに対応する文字列を返します。

#### 文字キー

```javascript
document.addEventListener("keydown", function(event) {
  console.log(event.key);
});

// "a"キーを押す → "a"
// Shift + "a"キーを押す → "A"
// "b"キーを押す → "b"
// "1"キーを押す → "1"
```

**重要なポイント**
- Shiftキーの状態が反映されます
- 小文字の"a"と大文字の"A"は異なる値です
- 大文字小文字を区別しない場合は、両方をチェックする必要があります

#### 特殊キー

特殊キーは、決まった文字列で識別されます。

```javascript
// Enterキー → "Enter"
// Escapeキー → "Escape"
// Tabキー → "Tab"
// Backspaceキー → "Backspace"
// Deleteキー → "Delete"
// スペースキー → " "（空白文字1つ）
```

#### 矢印キー

矢印キーは、方向を示す文字列で識別されます。

```javascript
// 上矢印 → "ArrowUp"
// 下矢印 → "ArrowDown"
// 左矢印 → "ArrowLeft"
// 右矢印 → "ArrowRight"
```

#### ファンクションキー

```javascript
// F1キー → "F1"
// F2キー → "F2"
// F12キー → "F12"
```

#### 修飾キー

修飾キー（モディファイアキー）は、他のキーと組み合わせて使われることが多いキーです。

```javascript
// Shiftキー → "Shift"
// Controlキー → "Control"
// Altキー → "Alt"
// Windows/Commandキー → "Meta"
```

### event.keyの使用例

```javascript
document.addEventListener("keydown", function(event) {
  // 押されたキーの種類に応じて処理を分ける
  if (event.key === "Enter") {
    console.log("Enterキーが押されました");
  } else if (event.key === "Escape") {
    console.log("Escapeキーが押されました");
  } else if (event.key === "ArrowUp") {
    console.log("上矢印キーが押されました");
  } else if (event.key === " ") {
    console.log("スペースキーが押されました");
  } else if (event.key === "a" || event.key === "A") {
    console.log("Aキーが押されました（大文字小文字問わず）");
  } else {
    console.log("その他のキー: " + event.key);
  }
});
```

### 修飾キーの検出

修飾キー（Shift、Control、Alt、Meta）が押されているかは、イベントオブジェクトのプロパティで確認できます。

```javascript
document.addEventListener("keydown", function(event) {
  if (event.shiftKey) {
    console.log("Shiftキーが押されています");
  }

  if (event.ctrlKey) {
    console.log("Controlキーが押されています");
  }

  if (event.altKey) {
    console.log("Altキーが押されています");
  }

  if (event.metaKey) {
    console.log("Meta（Windows/Command）キーが押されています");
  }

  // 組み合わせの検出
  if (event.ctrlKey && event.key === "s") {
    console.log("Ctrl+Sが押されました（保存のショートカット）");
  }
});
```

---

## 基本的な使い方

### documentにイベントリスナーを設定する

キーボードイベントは、通常`document`オブジェクトに対して設定します。これにより、ページ全体でキーボード操作を検出できます。

```javascript
// ページ全体でキーボード操作を検出
document.addEventListener("keydown", function(event) {
  console.log("押されたキー: " + event.key);
});
```

### なぜdocumentに設定するのか

特定の要素（例：input要素）にイベントリスナーを設定することもできますが、その要素にフォーカスがあるときだけイベントが発生します。

```javascript
let input = document.getElementById("myInput");

// この要素にフォーカスがあるときだけイベントが発生する
input.addEventListener("keydown", function(event) {
  console.log("input要素でキーが押されました");
});
```

一方、`document`に設定すると、ページのどこにフォーカスがあっても（または、フォーカスがどこにもなくても）イベントが発生します。

### 実践例：押されたキーを表示する

キーボードで押されたキーを画面に表示するプログラムを作ってみましょう。

#### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>キーボードイベント - 基本</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            text-align: center;
        }

        #keyDisplay {
            font-size: 48px;
            font-weight: bold;
            color: #2196F3;
            padding: 40px;
            border: 3px solid #2196F3;
            border-radius: 10px;
            margin: 30px 0;
            min-height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #instruction {
            color: #666;
            font-size: 18px;
        }

        #keyInfo {
            margin-top: 20px;
            padding: 15px;
            background-color: #f5f5f5;
            border-radius: 5px;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <h1>キーボードイベント - 基本</h1>
    <p id="instruction">何かキーを押してください</p>
    <div id="keyDisplay">ここにキーが表示されます</div>
    <div id="keyInfo"></div>

    <script src="script.js"></script>
</body>
</html>
```

#### JavaScript

```javascript
let keyDisplay = document.getElementById("keyDisplay");
let keyInfo = document.getElementById("keyInfo");

document.addEventListener("keydown", function(event) {
  // 押されたキーを大きく表示
  keyDisplay.textContent = event.key;

  // 詳細情報を表示
  let info = "event.key: \"" + event.key + "\"";

  // 修飾キーの状態を表示
  let modifiers = [];
  if (event.shiftKey) modifiers.push("Shift");
  if (event.ctrlKey) modifiers.push("Ctrl");
  if (event.altKey) modifiers.push("Alt");
  if (event.metaKey) modifiers.push("Meta");

  if (modifiers.length > 0) {
    info += "<br>修飾キー: " + modifiers.join(" + ");
  }

  keyInfo.innerHTML = info;
});
```

このプログラムを実行してキーを押すと、押したキーが大きく表示され、修飾キーの状態も確認できます。

---

## 特定のキーに反応する

実際のアプリケーションでは、すべてのキーに反応するのではなく、特定のキーが押されたときだけ処理を実行することが多いです。`if`文を使って、押されたキーをチェックします。

### Enterキーの検出

```javascript
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    console.log("Enterキーが押されました");
  }
});
```

### 複数のキーに異なる処理を設定する

`if...else if`文を使うと、キーごとに異なる処理を実行できます。

```javascript
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp") {
    console.log("上矢印が押されました");
  } else if (event.key === "ArrowDown") {
    console.log("下矢印が押されました");
  } else if (event.key === "ArrowLeft") {
    console.log("左矢印が押されました");
  } else if (event.key === "ArrowRight") {
    console.log("右矢印が押されました");
  } else if (event.key === "Enter") {
    console.log("Enterキーが押されました");
  } else if (event.key === "Escape") {
    console.log("Escapeキーが押されました");
  }
});
```

### switch文を使った書き方

多くのキーを扱う場合、`switch`文を使うとコードが読みやすくなります。

```javascript
document.addEventListener("keydown", function(event) {
  switch(event.key) {
    case "ArrowUp":
      console.log("上矢印が押されました");
      break;
    case "ArrowDown":
      console.log("下矢印が押されました");
      break;
    case "ArrowLeft":
      console.log("左矢印が押されました");
      break;
    case "ArrowRight":
      console.log("右矢印が押されました");
      break;
    case "Enter":
      console.log("Enterキーが押されました");
      break;
    case "Escape":
      console.log("Escapeキーが押されました");
      break;
    default:
      console.log("その他のキー: " + event.key);
  }
});
```

---

## 実践例1：矢印キーで要素を移動する

矢印キーを押すと、画面上のボックスが移動するプログラムを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>矢印キーで移動</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }

        #gameArea {
            width: 600px;
            height: 400px;
            border: 3px solid #333;
            position: relative;
            background-color: #f0f0f0;
            margin: 20px 0;
        }

        #box {
            width: 50px;
            height: 50px;
            background-color: #2196F3;
            position: absolute;
            top: 175px;
            left: 275px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            transition: all 0.1s;
        }

        #instructions {
            background-color: #fff3cd;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #ffc107;
        }

        #position {
            margin-top: 10px;
            font-family: monospace;
            background-color: #e8f5e9;
            padding: 10px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>矢印キーでボックスを動かそう</h1>

    <div id="instructions">
        <strong>操作方法：</strong>
        矢印キー（↑↓←→）でボックスを移動できます
    </div>

    <div id="gameArea">
        <div id="box"></div>
    </div>

    <div id="position"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let box = document.getElementById("box");
let position = document.getElementById("position");

// ボックスの初期位置
let topPosition = 175;
let leftPosition = 275;

// 移動速度（ピクセル）
let speed = 10;

// ゲームエリアの制限
let gameArea = document.getElementById("gameArea");
let maxTop = gameArea.offsetHeight - box.offsetHeight;
let maxLeft = gameArea.offsetWidth - box.offsetWidth;

function updatePosition() {
  position.textContent = "位置: X=" + leftPosition + "px, Y=" + topPosition + "px";
}

document.addEventListener("keydown", function(event) {
  // 矢印キーかどうかをチェック
  if (event.key.startsWith("Arrow")) {
    event.preventDefault(); // ページのスクロールを防ぐ

    if (event.key === "ArrowUp") {
      topPosition = topPosition - speed;
      // 上端の制限
      if (topPosition < 0) {
        topPosition = 0;
      }
      box.style.top = topPosition + "px";

    } else if (event.key === "ArrowDown") {
      topPosition = topPosition + speed;
      // 下端の制限
      if (topPosition > maxTop) {
        topPosition = maxTop;
      }
      box.style.top = topPosition + "px";

    } else if (event.key === "ArrowLeft") {
      leftPosition = leftPosition - speed;
      // 左端の制限
      if (leftPosition < 0) {
        leftPosition = 0;
      }
      box.style.left = leftPosition + "px";

    } else if (event.key === "ArrowRight") {
      leftPosition = leftPosition + speed;
      // 右端の制限
      if (leftPosition > maxLeft) {
        leftPosition = maxLeft;
      }
      box.style.left = leftPosition + "px";
    }

    updatePosition();
  }
});

// 初期位置を表示
updatePosition();
```

### コードの詳細説明

#### 1. 変数の初期化

```javascript
let topPosition = 175;
let leftPosition = 275;
```

ボックスの位置を管理する変数です。CSSの`top`と`left`プロパティに対応します。

#### 2. 移動速度の設定

```javascript
let speed = 10;
```

矢印キーを1回押したときに移動するピクセル数です。この値を変更すると、移動速度が変わります。

#### 3. 境界チェック

```javascript
let maxTop = gameArea.offsetHeight - box.offsetHeight;
let maxLeft = gameArea.offsetWidth - box.offsetWidth;
```

ボックスがゲームエリアの外に出ないように、最大座標を計算します。
- `offsetHeight`: 要素の高さ
- `offsetWidth`: 要素の幅

#### 4. 位置の更新

```javascript
if (topPosition < 0) {
  topPosition = 0;
}
```

ボックスがゲームエリアの外に出ないように制限します。

#### 5. event.preventDefault()

```javascript
if (event.key.startsWith("Arrow")) {
  event.preventDefault();
}
```

矢印キーを押したとき、ページがスクロールしないようにデフォルト動作をキャンセルします。

---

## ショートカットキーの実装

ショートカットキーは、特定のキーや修飾キーとの組み合わせで機能を実行する仕組みです。例えば、Ctrl+SやEnterキーでの送信などです。

### 実践例2：メッセージ入力アプリ

Enterキーで送信、Escapeキーでクリアできるメッセージ入力アプリを作ってみましょう。

#### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>メッセージ入力アプリ</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }

        h1 {
            color: #333;
        }

        #inputArea {
            margin: 20px 0;
        }

        #messageInput {
            width: 100%;
            padding: 15px;
            font-size: 16px;
            border: 2px solid #ddd;
            border-radius: 5px;
            box-sizing: border-box;
        }

        #messageInput:focus {
            outline: none;
            border-color: #2196F3;
        }

        #buttons {
            margin-top: 10px;
            display: flex;
            gap: 10px;
        }

        button {
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        #sendButton {
            background-color: #2196F3;
            color: white;
        }

        #sendButton:hover {
            background-color: #1976D2;
        }

        #clearButton {
            background-color: #f44336;
            color: white;
        }

        #clearButton:hover {
            background-color: #d32f2f;
        }

        #messageList {
            margin-top: 30px;
        }

        .message {
            background-color: #e3f2fd;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            border-left: 4px solid #2196F3;
        }

        .message-time {
            color: #666;
            font-size: 12px;
            margin-top: 5px;
        }

        #shortcuts {
            background-color: #fff3cd;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            border-left: 4px solid #ffc107;
        }

        .shortcut {
            display: inline-block;
            background-color: #fff;
            padding: 3px 8px;
            border-radius: 3px;
            font-family: monospace;
            margin: 0 5px;
            border: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <h1>メッセージ入力アプリ</h1>

    <div id="shortcuts">
        <strong>ショートカットキー：</strong><br>
        <span class="shortcut">Enter</span> 送信
        <span class="shortcut">Escape</span> クリア
        <span class="shortcut">Ctrl + Enter</span> 送信して次の入力
    </div>

    <div id="inputArea">
        <input type="text" id="messageInput" placeholder="メッセージを入力してください">
        <div id="buttons">
            <button id="sendButton">送信</button>
            <button id="clearButton">クリア</button>
        </div>
    </div>

    <div id="messageList">
        <h2>送信したメッセージ</h2>
        <div id="messages"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

#### JavaScript

```javascript
let messageInput = document.getElementById("messageInput");
let sendButton = document.getElementById("sendButton");
let clearButton = document.getElementById("clearButton");
let messages = document.getElementById("messages");

// メッセージを送信する関数
function sendMessage() {
  let message = messageInput.value.trim();

  if (message !== "") {
    // メッセージ要素を作成
    let messageDiv = document.createElement("div");
    messageDiv.className = "message";

    // メッセージ内容
    let messageText = document.createElement("div");
    messageText.textContent = message;
    messageDiv.appendChild(messageText);

    // 時刻を追加
    let timeDiv = document.createElement("div");
    timeDiv.className = "message-time";
    let now = new Date();
    timeDiv.textContent = now.getHours() + ":" +
                          String(now.getMinutes()).padStart(2, "0") + ":" +
                          String(now.getSeconds()).padStart(2, "0");
    messageDiv.appendChild(timeDiv);

    // メッセージリストの先頭に追加
    messages.insertBefore(messageDiv, messages.firstChild);

    // 入力欄をクリア
    messageInput.value = "";
  }
}

// 入力欄をクリアする関数
function clearInput() {
  messageInput.value = "";
  messageInput.focus();
}

// 送信ボタンのクリックイベント
sendButton.addEventListener("click", sendMessage);

// クリアボタンのクリックイベント
clearButton.addEventListener("click", clearInput);

// キーボードショートカット
messageInput.addEventListener("keydown", function(event) {
  // Enterキーで送信
  if (event.key === "Enter" && !event.ctrlKey) {
    event.preventDefault();
    sendMessage();
  }

  // Ctrl + Enterで送信して次の入力
  else if (event.key === "Enter" && event.ctrlKey) {
    event.preventDefault();
    sendMessage();
    messageInput.focus();
  }

  // Escapeキーでクリア
  else if (event.key === "Escape") {
    clearInput();
  }
});

// ページ読み込み時に入力欄にフォーカス
messageInput.focus();
```

### コードの詳細説明

#### 1. メッセージ送信の実装

```javascript
function sendMessage() {
  let message = messageInput.value.trim();

  if (message !== "") {
    // メッセージ要素を作成して表示
  }
}
```

- `trim()`: 前後の空白を削除します
- 空でないメッセージだけを送信します

#### 2. 時刻の表示

```javascript
let now = new Date();
timeDiv.textContent = now.getHours() + ":" +
                      String(now.getMinutes()).padStart(2, "0") + ":" +
                      String(now.getSeconds()).padStart(2, "0");
```

- `new Date()`: 現在の日時を取得
- `padStart(2, "0")`: 1桁の数字を2桁にゼロ埋め（例：9 → 09）

#### 3. Enterキーの処理

```javascript
if (event.key === "Enter" && !event.ctrlKey) {
  event.preventDefault();
  sendMessage();
}
```

- 通常のEnterキーで送信
- `!event.ctrlKey`: Ctrlキーが押されていないことを確認

#### 4. Ctrl + Enterの処理

```javascript
else if (event.key === "Enter" && event.ctrlKey) {
  event.preventDefault();
  sendMessage();
  messageInput.focus();
}
```

- Ctrl + Enterで送信後、入力欄にフォーカスを維持
- 連続して送信しやすくなります

---

## 実践例3：キーボード操作のゲーム

WASDキーでキャラクターを動かし、スペースキーでアクションを実行するゲームの基礎を作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>キーボードゲーム</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f0f0f0;
        }

        #gameContainer {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        #gameArea {
            width: 600px;
            height: 400px;
            border: 3px solid #333;
            position: relative;
            background: linear-gradient(to bottom, #87CEEB 0%, #98D8C8 100%);
            margin: 20px auto;
            overflow: hidden;
        }

        #character {
            width: 40px;
            height: 40px;
            background-color: #ff5722;
            position: absolute;
            top: 180px;
            left: 280px;
            border-radius: 50%;
            transition: background-color 0.2s;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        }

        #character.jumping {
            background-color: #ffc107;
            transform: scale(1.2);
        }

        #controls {
            background-color: #e3f2fd;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        #status {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
            padding: 15px;
            background-color: #f5f5f5;
            border-radius: 5px;
        }

        .status-item {
            text-align: center;
        }

        .status-label {
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
        }

        .status-value {
            font-size: 24px;
            font-weight: bold;
            color: #2196F3;
        }

        .key {
            display: inline-block;
            background-color: #fff;
            padding: 5px 10px;
            border-radius: 3px;
            font-family: monospace;
            border: 1px solid #ddd;
            margin: 0 3px;
        }
    </style>
</head>
<body>
    <div id="gameContainer">
        <h1>キーボードゲーム</h1>

        <div id="controls">
            <strong>操作方法：</strong><br>
            <span class="key">W</span><span class="key">A</span><span class="key">S</span><span class="key">D</span>
            または
            <span class="key">↑</span><span class="key">←</span><span class="key">↓</span><span class="key">→</span>
            で移動<br>
            <span class="key">Space</span> でジャンプ（色が変わります）
        </div>

        <div id="gameArea">
            <div id="character"></div>
        </div>

        <div id="status">
            <div class="status-item">
                <div class="status-label">X座標</div>
                <div class="status-value" id="xPosition">280</div>
            </div>
            <div class="status-item">
                <div class="status-label">Y座標</div>
                <div class="status-value" id="yPosition">180</div>
            </div>
            <div class="status-item">
                <div class="status-label">移動回数</div>
                <div class="status-value" id="moveCount">0</div>
            </div>
            <div class="status-item">
                <div class="status-label">ジャンプ回数</div>
                <div class="status-value" id="jumpCount">0</div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let character = document.getElementById("character");
let xPosition = document.getElementById("xPosition");
let yPosition = document.getElementById("yPosition");
let moveCount = document.getElementById("moveCount");
let jumpCount = document.getElementById("jumpCount");

// キャラクターの位置
let characterX = 280;
let characterY = 180;

// 統計情報
let moves = 0;
let jumps = 0;

// 移動速度
let speed = 10;

// ゲームエリアの制限
let gameArea = document.getElementById("gameArea");
let maxX = gameArea.offsetWidth - character.offsetWidth;
let maxY = gameArea.offsetHeight - character.offsetHeight;

// 押されているキーを記録するオブジェクト
let keysPressed = {};

// 位置を更新する関数
function updatePosition() {
  xPosition.textContent = characterX;
  yPosition.textContent = characterY;
  moveCount.textContent = moves;
  jumpCount.textContent = jumps;
}

// キャラクターを移動する関数
function moveCharacter(dx, dy) {
  characterX += dx;
  characterY += dy;

  // 境界チェック
  if (characterX < 0) characterX = 0;
  if (characterX > maxX) characterX = maxX;
  if (characterY < 0) characterY = 0;
  if (characterY > maxY) characterY = maxY;

  // CSSを更新
  character.style.left = characterX + "px";
  character.style.top = characterY + "px";

  // 統計を更新
  moves++;
  updatePosition();
}

// keydownイベント
document.addEventListener("keydown", function(event) {
  // すでに処理済みのキーはスキップ（連続入力を防ぐ）
  if (keysPressed[event.key]) {
    return;
  }
  keysPressed[event.key] = true;

  // WASD または 矢印キーで移動
  if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
    event.preventDefault();
    moveCharacter(0, -speed);
  }
  else if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
    event.preventDefault();
    moveCharacter(0, speed);
  }
  else if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
    event.preventDefault();
    moveCharacter(-speed, 0);
  }
  else if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
    event.preventDefault();
    moveCharacter(speed, 0);
  }

  // スペースキーでジャンプ（見た目の変化）
  else if (event.key === " ") {
    event.preventDefault();
    character.classList.add("jumping");
    jumps++;
    updatePosition();
  }
});

// keyupイベント
document.addEventListener("keyup", function(event) {
  keysPressed[event.key] = false;

  // スペースキーを離したらジャンプ状態を解除
  if (event.key === " ") {
    character.classList.remove("jumping");
  }
});

// 初期位置を表示
updatePosition();
```

### コードの詳細説明

#### 1. キーの状態管理

```javascript
let keysPressed = {};

document.addEventListener("keydown", function(event) {
  if (keysPressed[event.key]) {
    return; // すでに処理済み
  }
  keysPressed[event.key] = true;
});

document.addEventListener("keyup", function(event) {
  keysPressed[event.key] = false;
});
```

**なぜ必要なのか**
keydownイベントは、キーを押し続けると連続して発生します。この状態管理により、1回のキー押下を1回だけ処理できます。

#### 2. 移動関数の設計

```javascript
function moveCharacter(dx, dy) {
  characterX += dx;
  characterY += dy;

  // 境界チェック
  if (characterX < 0) characterX = 0;
  if (characterX > maxX) characterX = maxX;
  // ...
}
```

- `dx`: X方向の移動量（プラスで右、マイナスで左）
- `dy`: Y方向の移動量（プラスで下、マイナスで上）
- 1つの関数で全方向の移動を処理できます

#### 3. WASDと矢印キーの両方に対応

```javascript
if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
  moveCharacter(0, -speed);
}
```

大文字小文字と矢印キーの両方をチェックすることで、ユーザーの好みに合わせた操作ができます。

#### 4. CSSクラスの切り替え

```javascript
character.classList.add("jumping");
// ...
character.classList.remove("jumping");
```

JavaScriptからCSSクラスを追加・削除することで、見た目の変化を実現します。

---

## よくある間違いと解決方法

### 間違い1：大文字小文字を考慮していない

**問題のあるコード**
```javascript
document.addEventListener("keydown", function(event) {
  if (event.key === "a") {
    console.log("Aキーが押されました");
  }
});
```

**何が問題なのか**
このコードは、小文字の"a"だけに反応します。Shift + Aで大文字の"A"を入力した場合、反応しません。

**正しいコード**
```javascript
document.addEventListener("keydown", function(event) {
  if (event.key === "a" || event.key === "A") {
    console.log("Aキーが押されました");
  }
});

// または、toLowerCase()を使う
document.addEventListener("keydown", function(event) {
  if (event.key.toLowerCase() === "a") {
    console.log("Aキーが押されました");
  }
});
```

### 間違い2：スペースキーの判定を間違える

**問題のあるコード**
```javascript
document.addEventListener("keydown", function(event) {
  if (event.key === "Space") {  // ❌ 間違い
    console.log("スペースキーが押されました");
  }
});
```

**何が問題なのか**
スペースキーの`event.key`は`"Space"`ではなく、空白文字`" "`（半角スペース1つ）です。

**正しいコード**
```javascript
document.addEventListener("keydown", function(event) {
  if (event.key === " ") {  // ✅ 正しい
    console.log("スペースキーが押されました");
  }
});
```

### 間違い3：矢印キーでページがスクロールする

**問題のあるコード**
```javascript
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowDown") {
    moveDown();
  }
});
```

**何が問題なのか**
矢印キーはページをスクロールするというブラウザのデフォルト動作があります。ゲームなどで矢印キーを使う場合、意図しないスクロールが発生します。

**正しいコード**
```javascript
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowDown") {
    event.preventDefault(); // デフォルト動作をキャンセル
    moveDown();
  }
});

// または、矢印キー全般に対して
document.addEventListener("keydown", function(event) {
  if (event.key.startsWith("Arrow")) {
    event.preventDefault();
  }

  if (event.key === "ArrowDown") {
    moveDown();
  }
});
```

### 間違い4：input要素の外でキーを検出できない

**問題のあるコード**
```javascript
let input = document.getElementById("myInput");

input.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeDialog(); // input以外にフォーカスがあると動かない
  }
});
```

**何が問題なのか**
特定の要素にイベントリスナーを設定すると、その要素にフォーカスがあるときだけイベントが発生します。

**正しいコード**
```javascript
// ページ全体で検出する場合はdocumentに設定
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeDialog();
  }
});
```

### 間違い5：キーを押し続けたときの連続発動を考慮していない

**問題のあるコード**
```javascript
let count = 0;

document.addEventListener("keydown", function(event) {
  if (event.key === " ") {
    count++;
    console.log("カウント: " + count);
  }
});
```

**何が問題なのか**
keydownイベントは、キーを押し続けると連続して発生します。スペースキーを1回押したつもりでも、countが複数回増えてしまいます。

**正しいコード - 方法1: keyupを使う**
```javascript
let count = 0;

document.addEventListener("keyup", function(event) {
  if (event.key === " ") {
    count++;
    console.log("カウント: " + count);
  }
});
```

**正しいコード - 方法2: キーの状態を管理する**
```javascript
let count = 0;
let spacePressed = false;

document.addEventListener("keydown", function(event) {
  if (event.key === " " && !spacePressed) {
    spacePressed = true;
    count++;
    console.log("カウント: " + count);
  }
});

document.addEventListener("keyup", function(event) {
  if (event.key === " ") {
    spacePressed = false;
  }
});
```

### 間違い6：修飾キーの組み合わせを正しく検出していない

**問題のあるコード**
```javascript
document.addEventListener("keydown", function(event) {
  if (event.key === "s") {
    saveDocument(); // Ctrl+Sで保存したいが、sだけでも発動してしまう
  }
});
```

**何が問題なのか**
修飾キー（Ctrl、Shift、Altなど）の状態をチェックしていないため、意図しないタイミングで発動します。

**正しいコード**
```javascript
document.addEventListener("keydown", function(event) {
  // Ctrl+S（Macでは Cmd+S）
  if ((event.ctrlKey || event.metaKey) && event.key === "s") {
    event.preventDefault(); // ブラウザの保存ダイアログを防ぐ
    saveDocument();
  }
});

// Shift+Enterの例
document.addEventListener("keydown", function(event) {
  if (event.shiftKey && event.key === "Enter") {
    insertLineBreak();
  } else if (event.key === "Enter") {
    submitForm();
  }
});
```

---

## 高度なパターン

### パターン1：複数のキーの同時押しを検出する

ゲームなどで、複数のキーが同時に押されているかを判定する必要があることがあります。

```javascript
let keys = {};

document.addEventListener("keydown", function(event) {
  keys[event.key] = true;

  // Shift + Enterが同時に押されている
  if (keys["Shift"] && keys["Enter"]) {
    console.log("Shift+Enterが押されています");
  }

  // WとDが同時に押されている（斜め移動）
  if (keys["w"] && keys["d"]) {
    console.log("右上に移動");
  }
});

document.addEventListener("keyup", function(event) {
  keys[event.key] = false;
});
```

### パターン2：数字キーだけを受け付ける

入力欄で数字以外の入力を防ぐパターンです。

```javascript
let numberInput = document.getElementById("numberInput");

numberInput.addEventListener("keydown", function(event) {
  // 許可するキーのリスト
  let allowedKeys = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"
  ];

  // 許可されていないキーの入力を防ぐ
  if (!allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
});
```

### パターン3：特定のキーを無効化する

ゲームやアプリで、特定のキーの動作を無効にしたい場合があります。

```javascript
document.addEventListener("keydown", function(event) {
  // F5キー（ページ更新）を無効化
  if (event.key === "F5") {
    event.preventDefault();
    console.log("ページ更新は無効です");
  }

  // Ctrl+Wキー（タブを閉じる）を無効化しようとする
  // 注意：ブラウザのセキュリティ上、完全には無効化できない場合があります
  if (event.ctrlKey && event.key === "w") {
    event.preventDefault();
    console.log("タブを閉じることはできません");
  }
});
```

**注意点**
ブラウザのセキュリティ設定により、一部のキーボードショートカット（特にタブやウィンドウの操作）は無効化できない場合があります。

### パターン4：キーボードショートカットのヘルプ表示

ユーザーに利用可能なショートカットを表示するパターンです。

```javascript
let helpDialog = document.getElementById("helpDialog");

// ?キーでヘルプを表示
document.addEventListener("keydown", function(event) {
  if (event.key === "?" && !isTyping()) {
    showHelp();
  }

  // Escapeキーでヘルプを閉じる
  if (event.key === "Escape") {
    hideHelp();
  }
});

function isTyping() {
  // input、textareaなどで入力中かをチェック
  let activeElement = document.activeElement;
  return activeElement.tagName === "INPUT" ||
         activeElement.tagName === "TEXTAREA";
}

function showHelp() {
  helpDialog.style.display = "block";
}

function hideHelp() {
  helpDialog.style.display = "none";
}
```

### パターン5：キーのリピート速度を制御する

キーを押し続けたときの処理速度を調整するパターンです。

```javascript
let lastMoveTime = 0;
let moveInterval = 100; // ミリ秒

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowRight") {
    let currentTime = Date.now();

    // 前回の移動から一定時間経過している場合のみ移動
    if (currentTime - lastMoveTime >= moveInterval) {
      moveRight();
      lastMoveTime = currentTime;
    }
  }
});
```

---

## event.preventDefault()の詳細

`event.preventDefault()`は、ブラウザのデフォルト動作をキャンセルするメソッドです。キーボードイベントでよく使われます。

### デフォルト動作の例

多くのキーには、ブラウザが標準で持っている動作があります。

| キー | デフォルト動作 |
|------|---------------|
| スペース | ページを下にスクロール |
| 矢印キー↑↓ | ページをスクロール |
| Tab | 次の入力欄にフォーカス移動 |
| Backspace | 前のページに戻る（input以外） |
| F5 | ページを更新 |
| Ctrl+S | ページを保存 |
| Ctrl+F | 検索ダイアログを開く |

### preventDefault()の使用例

```javascript
document.addEventListener("keydown", function(event) {
  // スペースキーでページをスクロールさせない
  if (event.key === " ") {
    event.preventDefault();
    jump(); // 独自の処理
  }

  // 矢印キーでページをスクロールさせない
  if (event.key.startsWith("Arrow")) {
    event.preventDefault();
    moveCharacter(event.key);
  }

  // Ctrl+Sでブラウザの保存ダイアログを開かない
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault();
    saveDocument(); // 独自の保存処理
  }
});
```

### いつpreventDefault()を使うべきか

1. **ゲームやインタラクティブアプリ**
   - 矢印キーやスペースキーを使う場合、ページがスクロールしないようにします

2. **カスタムショートカット**
   - Ctrl+S、Ctrl+Pなど、ブラウザのショートカットと競合する場合

3. **特殊な入力制御**
   - 数字だけを受け付ける入力欄など

4. **フォームの独自送信処理**
   - Enterキーでのフォーム送信をキャンセルして、独自の処理を実行

### preventDefault()を使ってはいけない場合

1. **アクセシビリティが損なわれる場合**
   - Tabキーでのフォーカス移動を無効にすると、キーボードだけで操作できなくなります

2. **ブラウザの基本機能を壊す場合**
   - Backspaceやページスクロールなど、ユーザーが期待する動作を無効にするのは避けるべきです

---

## 実践的なアプリケーション例

### アプリケーション1：タスク管理ツール

キーボードショートカットを持つタスク管理ツールを作成します。

#### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>タスク管理ツール</title>
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
        }

        #shortcuts {
            background-color: #fff3cd;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            border-left: 4px solid #ffc107;
        }

        .shortcut-item {
            margin: 5px 0;
        }

        .key {
            display: inline-block;
            background-color: #fff;
            padding: 3px 8px;
            border-radius: 3px;
            font-family: monospace;
            border: 1px solid #ddd;
            margin-right: 10px;
        }

        #inputArea {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }

        #taskInput {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            border: 2px solid #ddd;
            border-radius: 5px;
            box-sizing: border-box;
        }

        #taskInput:focus {
            outline: none;
            border-color: #2196F3;
        }

        #taskList {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .task {
            padding: 15px;
            margin: 10px 0;
            background-color: #f9f9f9;
            border-left: 4px solid #2196F3;
            border-radius: 3px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .task:hover {
            background-color: #e3f2fd;
        }

        .task.completed {
            background-color: #e8f5e9;
            border-left-color: #4CAF50;
            text-decoration: line-through;
            color: #666;
        }

        .task.selected {
            background-color: #fff3cd;
            border-left-color: #ffc107;
        }

        .task-number {
            display: inline-block;
            width: 30px;
            height: 30px;
            background-color: #2196F3;
            color: white;
            text-align: center;
            line-height: 30px;
            border-radius: 50%;
            margin-right: 10px;
            font-size: 14px;
        }

        .empty-message {
            text-align: center;
            color: #999;
            padding: 40px;
        }
    </style>
</head>
<body>
    <h1>タスク管理ツール</h1>

    <div id="shortcuts">
        <strong>キーボードショートカット：</strong>
        <div class="shortcut-item">
            <span class="key">n</span> 新規タスク追加にフォーカス
        </div>
        <div class="shortcut-item">
            <span class="key">Enter</span> タスクを追加
        </div>
        <div class="shortcut-item">
            <span class="key">↑</span><span class="key">↓</span> タスク選択を移動
        </div>
        <div class="shortcut-item">
            <span class="key">Space</span> 選択中のタスクを完了/未完了切り替え
        </div>
        <div class="shortcut-item">
            <span class="key">Delete</span> 選択中のタスクを削除
        </div>
        <div class="shortcut-item">
            <span class="key">Escape</span> 選択を解除
        </div>
    </div>

    <div id="inputArea">
        <input type="text" id="taskInput" placeholder="新しいタスクを入力...">
    </div>

    <div id="taskList">
        <h2>タスク一覧</h2>
        <div id="tasks">
            <div class="empty-message">タスクはまだありません。<br>「n」キーを押して新しいタスクを追加しましょう！</div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

#### JavaScript

```javascript
let taskInput = document.getElementById("taskInput");
let tasks = document.getElementById("tasks");
let taskList = [];
let selectedIndex = -1;

// タスクを追加する関数
function addTask() {
  let taskText = taskInput.value.trim();

  if (taskText !== "") {
    taskList.push({
      text: taskText,
      completed: false
    });

    taskInput.value = "";
    renderTasks();
  }
}

// タスクを完了/未完了切り替え
function toggleTask(index) {
  if (index >= 0 && index < taskList.length) {
    taskList[index].completed = !taskList[index].completed;
    renderTasks();
  }
}

// タスクを削除
function deleteTask(index) {
  if (index >= 0 && index < taskList.length) {
    taskList.splice(index, 1);
    if (selectedIndex >= taskList.length) {
      selectedIndex = taskList.length - 1;
    }
    renderTasks();
  }
}

// タスクの選択を移動
function selectTask(direction) {
  if (taskList.length === 0) return;

  if (selectedIndex === -1) {
    selectedIndex = 0;
  } else {
    selectedIndex += direction;
    if (selectedIndex < 0) selectedIndex = 0;
    if (selectedIndex >= taskList.length) selectedIndex = taskList.length - 1;
  }

  renderTasks();
}

// タスクを画面に表示
function renderTasks() {
  if (taskList.length === 0) {
    tasks.innerHTML = '<div class="empty-message">タスクはまだありません。<br>「n」キーを押して新しいタスクを追加しましょう！</div>';
    selectedIndex = -1;
    return;
  }

  tasks.innerHTML = "";

  taskList.forEach(function(task, index) {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";

    if (task.completed) {
      taskDiv.classList.add("completed");
    }

    if (index === selectedIndex) {
      taskDiv.classList.add("selected");
    }

    let numberSpan = document.createElement("span");
    numberSpan.className = "task-number";
    numberSpan.textContent = index + 1;

    let textSpan = document.createElement("span");
    textSpan.textContent = task.text;

    taskDiv.appendChild(numberSpan);
    taskDiv.appendChild(textSpan);

    // クリックで完了切り替え
    taskDiv.addEventListener("click", function() {
      toggleTask(index);
    });

    tasks.appendChild(taskDiv);
  });
}

// 入力欄でのキーボード操作
taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  } else if (event.key === "Escape") {
    taskInput.blur();
    selectedIndex = -1;
    renderTasks();
  }
});

// ページ全体でのキーボード操作
document.addEventListener("keydown", function(event) {
  // 入力欄にフォーカスがある場合は処理しない
  if (document.activeElement === taskInput) {
    return;
  }

  // nキーで入力欄にフォーカス
  if (event.key === "n" || event.key === "N") {
    event.preventDefault();
    taskInput.focus();
  }

  // 上矢印で選択を上に移動
  else if (event.key === "ArrowUp") {
    event.preventDefault();
    selectTask(-1);
  }

  // 下矢印で選択を下に移動
  else if (event.key === "ArrowDown") {
    event.preventDefault();
    selectTask(1);
  }

  // スペースキーで完了切り替え
  else if (event.key === " ") {
    event.preventDefault();
    if (selectedIndex !== -1) {
      toggleTask(selectedIndex);
    }
  }

  // Deleteキーで削除
  else if (event.key === "Delete") {
    if (selectedIndex !== -1) {
      deleteTask(selectedIndex);
    }
  }

  // Escapeキーで選択解除
  else if (event.key === "Escape") {
    selectedIndex = -1;
    renderTasks();
  }
});

// 初期表示
renderTasks();
```

このアプリケーションでは、以下のキーボード操作が実装されています：

1. **nキー**: 新規タスク追加にフォーカス
2. **Enterキー**: タスクを追加
3. **↑↓キー**: タスク選択を移動
4. **スペースキー**: 選択中のタスクを完了/未完了切り替え
5. **Deleteキー**: 選択中のタスクを削除
6. **Escapeキー**: 選択を解除

---

## 練習問題

次の仕様を満たすプログラムを作成してください。

### 問題1：キーボード楽器

**仕様**
1. キーボードの「A」「S」「D」「F」「G」「H」「J」キーをピアノの鍵盤に見立てる
2. 各キーを押すと、対応する音階（ド・レ・ミ・ファ・ソ・ラ・シ）を画面に表示する
3. 押されたキーに対応する要素の色を変える
4. キーを離すと元の色に戻る
5. 押された回数をカウントして表示する

**ヒント - レベル1（大きなヒント）**
- HTMLで7つのdiv要素を作り、それぞれにA, S, D, F, G, H, Jのラベルを付けます
- JavaScriptでkeydownイベントとkeyupイベントの両方を使います
- event.keyで押されたキーを判定し、対応する要素の背景色を変更します
- カウンターは変数で管理し、キーが押されるたびに増やします

**ヒント - レベル2（中くらいのヒント）**
```javascript
let keys = {
  "a": { note: "ド", element: null },
  "s": { note: "レ", element: null },
  // ... 他のキー
};

document.addEventListener("keydown", function(event) {
  let key = event.key.toLowerCase();
  if (keys[key]) {
    // 色を変更
    // 音階を表示
    // カウントを増やす
  }
});
```

**ヒント - レベル3（小さなヒント）**
- `element.style.backgroundColor`で色を変更できます
- keyupイベントで元の色に戻します
- `let count = 0;`でカウンターを初期化し、`count++;`で増やします

### 問題2：文字入力ゲーム

**仕様**
1. ランダムな文字（A〜Z）を画面に表示する
2. ユーザーが正しいキーを押すと「正解！」と表示し、次の文字を出す
3. 間違ったキーを押すと「不正解」と表示する
4. 正解数と不正解数をカウントして表示する
5. Escapeキーでゲームをリセットする

**ヒント - レベル1（大きなヒント）**
- アルファベットの配列を作ります：`let letters = ["A", "B", "C", ..., "Z"];`
- `Math.random()`を使ってランダムな文字を選びます
- keydownイベントで押されたキーと現在の文字を比較します
- 正解・不正解のカウンターを別々に管理します

**ヒント - レベル2（中くらいのヒント）**
```javascript
let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let currentLetter = "";
let correctCount = 0;
let incorrectCount = 0;

function getRandomLetter() {
  let index = Math.floor(Math.random() * letters.length);
  return letters[index];
}

function startNewRound() {
  currentLetter = getRandomLetter();
  // 画面に表示
}
```

**ヒント - レベル3（小さなヒント）**
- `event.key.toUpperCase()`で大文字に統一できます
- `===`で文字列を比較できます
- `startNewRound()`関数を作って、正解時に呼び出します

### 問題3：スネークゲーム風の移動

**仕様**
1. 矢印キーでキャラクターが連続的に移動する
2. 一度矢印キーを押すと、別の矢印キーを押すまで同じ方向に移動し続ける
3. スペースキーで移動を一時停止/再開する
4. ゲームエリアの端に到達したら反対側から出現する（ラップアラウンド）
5. 移動距離を記録して表示する

**ヒント - レベル1（大きなヒント）**
- `setInterval()`を使って定期的に移動処理を実行します
- 現在の移動方向を変数で管理します（例：`let direction = "right";`）
- 矢印キーが押されたら、directionを変更します
- スペースキーでsetIntervalを停止/再開します

**ヒント - レベル2（中くらいのヒント）**
```javascript
let direction = null; // "up", "down", "left", "right", null
let isMoving = false;
let moveInterval = null;

function startMoving() {
  if (moveInterval) return;

  moveInterval = setInterval(function() {
    if (direction === "right") {
      x += speed;
    } else if (direction === "left") {
      x -= speed;
    }
    // ... 他の方向

    // ラップアラウンド
    if (x > maxX) x = 0;
    if (x < 0) x = maxX;

    updatePosition();
  }, 100);
}

function stopMoving() {
  clearInterval(moveInterval);
  moveInterval = null;
}
```

**ヒント - レベル3（小さなヒント）**
- `clearInterval(moveInterval)`でsetIntervalを停止できます
- ラップアラウンドは、端を超えたら反対側の座標にセットします
- 移動距離は、x座標とy座標の変化を累積します

---

## まとめ

このレッスンでは、キーボードイベントについて学びました。

### 学んだこと

1. **キーボードイベントの基本**
   - `keydown`: キーを押した瞬間に発生
   - `keyup`: キーを離した瞬間に発生

2. **event.keyプロパティ**
   - 押されたキーを文字列で取得できる
   - 文字キー、矢印キー、特殊キーなど様々なキーに対応

3. **特定のキーへの反応**
   - `if`文や`switch`文で押されたキーをチェック
   - 矢印キー、Enterキー、Escapeキーなどに異なる処理を設定

4. **ショートカットキーの実装**
   - Enterキーで送信
   - Escapeキーでキャンセル
   - 修飾キー（Ctrl、Shift、Alt、Meta）との組み合わせ

5. **event.preventDefault()**
   - ブラウザのデフォルト動作をキャンセル
   - 矢印キーでのスクロール防止など

6. **実用的なパターン**
   - 複数のキーの同時押し検出
   - 数字キーだけを受け付ける
   - キーの状態管理

### キーボードイベントが重要な理由

1. **アクセシビリティ**: マウスを使えないユーザーでも操作できる
2. **操作効率**: パワーユーザーは素早く作業できる
3. **ゲーム開発**: インタラクティブな体験を提供できる
4. **ユーザー体験**: 自然で快適な操作感を実現できる

### 次のステップ

キーボードイベントを習得したことで、より高度なインタラクティブ機能を作れるようになりました。次のレッスンでは、フォームイベントについて学び、入力フィールドのフォーカスや値の変更に反応するプログラムを作っていきます。

キーボードイベントは、ウェブアプリケーションのユーザー体験を大きく向上させる重要な技術です。様々なアプリケーションで活用して、使いやすいプログラムを作成しましょう！
